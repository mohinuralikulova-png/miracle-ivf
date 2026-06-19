import type { Lead, LeadStorageProvider, LeadNotificationProvider, Result } from './types'

const MAX_NOTIFICATION_ATTEMPTS = 3
const RETRY_BASE_DELAY_MS = 1000

export class LeadService {
  constructor(
    private readonly storage: LeadStorageProvider,
    private readonly notification: LeadNotificationProvider,
  ) {}

  // Main pipeline entry point.
  // Sequence: storage.save() first → only on success, notification.notify().
  // A storage failure is fatal; a notification failure is non-fatal.
  async submit(lead: Lead): Promise<Result> {
    // Logged context never includes name/phone — minimal PII, no secrets.
    const ctx = { language: lead.language, sourcePage: lead.sourcePage }

    const storageResult = await this.storage.save(lead)

    // Storage failure is FATAL: abort, never notify, surface the error.
    if (!storageResult.success) {
      console.error('[LeadService] Storage failed — aborting, no notification sent:', storageResult.error, ctx)
      return { success: false, error: storageResult.error }
    }

    console.warn('[LeadService] Lead stored', ctx)

    // Storage succeeded → the lead is durable. Notification is non-fatal and
    // runs in the background with retries so it never blocks the user response.
    void this.notifyWithRetry(lead)

    return { success: true }
  }

  private async notifyWithRetry(lead: Lead, attempt = 1): Promise<void> {
    const ctx = { language: lead.language, sourcePage: lead.sourcePage }
    const result = await this.notification.notify(lead)

    if (result.success) {
      console.warn('[LeadService] Notification sent', { ...ctx, attempt })
      return
    }

    if (attempt < MAX_NOTIFICATION_ATTEMPTS) {
      const delay = Math.pow(2, attempt) * RETRY_BASE_DELAY_MS
      console.warn(
        `[LeadService] Notification attempt ${attempt} failed, retrying in ${delay}ms:`,
        result.error,
      )
      await new Promise((resolve) => setTimeout(resolve, delay))
      return this.notifyWithRetry(lead, attempt + 1)
    }

    // Final failure — lead is SAFE in DB. Log for manual recovery/follow-up.
    console.error(
      `[LeadService] Notification failed after ${MAX_NOTIFICATION_ATTEMPTS} attempts — lead is stored, manual follow-up needed:`,
      result.error,
      ctx,
    )
  }
}
