import type { Lead, LeadStorageProvider, LeadNotificationProvider, Result } from './types'

const MAX_NOTIFICATION_ATTEMPTS = 3

export class LeadService {
  constructor(
    private readonly storage: LeadStorageProvider,
    private readonly notification: LeadNotificationProvider,
  ) {}

  // Saves the lead to storage. Returns success/failure.
  // Call this before returning the server action response.
  async save(lead: Lead): Promise<Result> {
    const ctx = { language: lead.language, sourcePage: lead.sourcePage }
    const result = await this.storage.save(lead)
    if (!result.success) {
      console.error('[LeadService] Storage failed:', result.error, ctx)
      return { success: false, error: result.error }
    }
    console.warn('[LeadService] Lead stored', ctx)
    return { success: true }
  }

  // Sends the notification with retries. Awaited directly in the server action.
  async notify(lead: Lead): Promise<void> {
    await this.notifyWithRetry(lead)
  }

  // submit() is kept for non-Vercel environments and direct usage.
  async submit(lead: Lead): Promise<Result> {
    const saveResult = await this.save(lead)
    if (!saveResult.success) return saveResult
    await this.notify(lead)
    return { success: true }
  }

  async notifyWithRetry(lead: Lead, attempt = 1): Promise<void> {
    const ctx = { language: lead.language, sourcePage: lead.sourcePage }
    const result = await this.notification.notify(lead)

    if (result.success) {
      console.warn('[LeadService] Notification sent', { ...ctx, attempt })
      return
    }

    if (attempt < MAX_NOTIFICATION_ATTEMPTS) {
      console.warn(`[LeadService] Notification attempt ${attempt} failed, retrying:`, result.error)
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
