import 'server-only'
import { LeadService } from './service'
import { SupabaseLeadStorageProvider } from './providers/storage/supabase'
import { TelegramLeadNotificationProvider } from './providers/notification/telegram'

// Singleton LeadService configured with MVP providers.
// To add Google Sheets, Airtable, CRM, email, or WhatsApp:
//   1. Implement LeadStorageProvider or LeadNotificationProvider
//   2. Register the new adapter here
// Form components and the Server Action never change.
export const leadService = new LeadService(
  new SupabaseLeadStorageProvider(),
  new TelegramLeadNotificationProvider(),
)

export type { Lead, Result, LeadStorageProvider, LeadNotificationProvider } from './types'
