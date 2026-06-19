import type { Lead, LeadStorageProvider, LeadNotificationProvider, Result } from './types'

const MAX_NOTIFICATION_ATTEMPTS = 3
const RETRY_BASE_DELAY_MS = 1000

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

  // Sends the notification with retries. Call this via next/server `after()`
  // so Vercel keeps the function alive after the response is sent.
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
