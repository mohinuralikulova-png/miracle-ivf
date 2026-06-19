import 'server-only'
import { supabase } from '@/lib/supabase'
import type { Lead, LeadStorageProvider, Result } from '../../types'

export class SupabaseLeadStorageProvider implements LeadStorageProvider {
  async save(lead: Lead): Promise<Result> {
    try {
      const { error } = await supabase.from('leads').insert({
        full_name: lead.fullName,
        phone: lead.phone,
        city: lead.city ?? null,
        service_interest: lead.serviceInterest ?? null,
        message: lead.message ?? null,
        language: lead.language,
        source_page: lead.sourcePage,
        created_at: lead.createdAt.toISOString(),
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown storage error'
      return { success: false, error: message }
    }
  }
}
