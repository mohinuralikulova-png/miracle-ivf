// ─── Locale ───────────────────────────────────────────────────────────────────

export type Locale = 'uz' | 'ru' | 'en'

// ─── Lead ─────────────────────────────────────────────────────────────────────

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

// ─── Result ───────────────────────────────────────────────────────────────────

export type Result<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string }

// ─── Service interest options ─────────────────────────────────────────────────

export type ServiceInterest =
  | 'ivf'
  | 'icsi'
  | 'iui'
  | 'freezing'
  | 'male'
  | 'pgt'
  | 'general'

// ─── Testimonials ─────────────────────────────────────────────────────────────

export type TestimonialType = 'written' | 'telegram' | 'screenshot' | 'video'

export interface TestimonialConfig {
  id: string
  type: TestimonialType
  /** 1–5 stars. 0 for types that don't display a rating (e.g. video). */
  rating: number
  /** Absolute path from /public. Undefined = show type-specific placeholder. */
  mediaSrc?: string
  /** Blur actual image for privacy. Only applies when mediaSrc is set. */
  mediaBlur?: boolean
}

export interface TestimonialCardData {
  id: string
  type: TestimonialType
  typeLabel: string
  rating: number
  quote: string
  name: string
  city: string
  ageRange?: string
  treatment: string
  mediaSrc?: string
  mediaBlur: boolean
  mediaAlt: string
  verifiedLabel: string
  telegramSentLabel: string
  ratingAriaLabel: string
}

// ─── Results (SuccessResults section) ─────────────────────────────────────────

export type ResultType = 'hcg' | 'ivf' | 'family' | 'gratitude'

export interface ResultConfig {
  id: string
  type: ResultType
  /** Absolute path from /public. Undefined = show type-specific placeholder. */
  mediaSrc?: string
  /** True = apply CSS blur to actual image for privacy. Only applies when mediaSrc is set. */
  mediaBlur?: boolean
}

export interface ResultCardData {
  id: string
  type: ResultType
  typeLabel: string
  identifier: string
  outcome: string
  date: string
  mediaAlt: string
  mediaSrc?: string
  mediaBlur: boolean
  quote?: string
  successLabel: string
  blurNotice: string
}

// ─── Doctors ──────────────────────────────────────────────────────────────────

export type DoctorId = 'inamdar' | 'beysenbi' | 'benko'

export interface DoctorConfig {
  id: DoctorId
  /** Absolute path from /public, e.g. '/images/doctors/inamdar.jpg'. Undefined = show placeholder. */
  photoSrc?: string
}

export interface DoctorCardData {
  id: string
  name: string
  specialty: string
  country: string
  experience: string
  bio: string
  tags: string[]
  consultationCta: string
  photoSrc?: string
  photoAlt: string
  analyticsLocation: string
}

// ─── Services ─────────────────────────────────────────────────────────────────

export type ServiceId =
  | 'ivf'
  | 'diagnostics'
  | 'female'
  | 'male'
  | 'preparation'
  | 'pgt'
  | 'hysteroscopy'
  | 'hormones'
  | 'gynConsult'
  | 'androConsult'

export type ServiceIconName =
  | 'Microscope'
  | 'SearchCheck'
  | 'HeartPulse'
  | 'Activity'
  | 'ClipboardList'
  | 'Dna'
  | 'Scan'
  | 'FlaskConical'
  | 'Stethoscope'
  | 'UserCheck'

export interface ServiceConfig {
  id: ServiceId
  icon: ServiceIconName
}

export interface ServiceCardData {
  id: ServiceId
  title: string
  description: string
  benefit: string
  iconName: ServiceIconName
  iconAlt: string
}

// ─── IVF Process ──────────────────────────────────────────────────────────────

export interface ProcessStepData {
  id: string
  stepNumber: string
  title: string
  description: string
  isLast: boolean
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export interface FAQItemData {
  id: string
  question: string
  answer: string
}

// ─── Booking form ─────────────────────────────────────────────────────────────

export interface BookingFormState {
  status: 'idle' | 'submitting' | 'success' | 'error' | 'validation_error'
  error?: string
  fieldErrors?: Record<string, string>
}
