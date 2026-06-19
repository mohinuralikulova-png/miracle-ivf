import { z } from 'zod'

export interface ValidationMessages {
  fullNameRequired: string
  fullNameMin: string
  fullNameMax: string
  phoneRequired: string
  phoneInvalid: string
  messageMax: string
}

// Returns a Zod schema with localized error messages.
// Call this inside a Server Action after resolving getTranslations('validation').
export function createBookingSchema(messages: ValidationMessages) {
  return z.object({
    fullName: z
      .string()
      .min(1, messages.fullNameRequired)
      .min(2, messages.fullNameMin)
      .max(100, messages.fullNameMax),
    phone: z
      .string()
      .min(1, messages.phoneRequired)
      .regex(/^\+?[0-9\s\-().]{7,20}$/, messages.phoneInvalid),
    city: z.string().max(100).optional(),
    serviceInterest: z.string().optional(),
    message: z.string().max(1000, messages.messageMax).optional(),
    // Honeypot — must be empty; bots fill it automatically
    honeypot: z.string().max(0),
  })
}

export type BookingFormData = ReturnType<typeof createBookingSchema>['_output']
