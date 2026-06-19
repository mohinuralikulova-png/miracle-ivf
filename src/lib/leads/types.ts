import type { Locale, Result } from '@/types'

export interface Lead {
  fullName: string
  phone: string
  city?: string
  serviceInterest?: string
  message?: string
  language: Locale
  sourcePage: string
  createdAt: Date
}

// Provider interfaces — implement these to add new destinations.
// See CLAUDE.md §14 for the full architecture spec.

export interface LeadStorageProvider {
  save(lead: Lead): Promise<Result>
}

export interface LeadNotificationProvider {
  notify(lead: Lead): Promise<Result>
}

export type { Result }
