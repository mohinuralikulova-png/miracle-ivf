'use server'

import { getLocale, getTranslations } from 'next-intl/server'
import { headers } from 'next/headers'
import { after } from 'next/server'
import { leadService } from '@/lib/leads'
import { createBookingSchema } from '@/lib/validation'
import { checkRateLimit, extractIp } from '@/lib/rate-limit'
import type { ValidationMessages } from '@/lib/validation'
import type { BookingFormState, Locale } from '@/types'

export async function submitBooking(
  _prevState: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  // Honeypot check — silent success to avoid revealing the mechanism to bots
  const honeypot = formData.get('honeypot') as string
  if (honeypot) {
    return { status: 'success' }
  }

  const headersList = await headers()
  const locale = (await getLocale()) as Locale
  const tValidation = await getTranslations({ locale, namespace: 'validation' })

  // Rate limit check — must run before touching LeadService or Supabase.
  const ip = extractIp(headersList)
  const rl = await checkRateLimit(ip)
  if (!rl.allowed) {
    return { status: 'error', error: tValidation('rateLimit') }
  }

  const validationMessages: ValidationMessages = {
    fullNameRequired: tValidation('fullName.required'),
    fullNameMin: tValidation('fullName.minLength'),
    fullNameMax: tValidation('fullName.maxLength'),
    phoneRequired: tValidation('phone.required'),
    phoneInvalid: tValidation('phone.invalid'),
    messageMax: tValidation('message.maxLength'),
  }

  const schema = createBookingSchema(validationMessages)

  const raw = {
    fullName: formData.get('fullName') ?? '',
    phone: formData.get('phone') ?? '',
    city: formData.get('city') ?? '',
    serviceInterest: formData.get('serviceInterest') ?? '',
    message: formData.get('message') ?? '',
    honeypot: '',
  }

  const parsed = schema.safeParse(raw)

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const [field, errors] of Object.entries(parsed.error.flatten().fieldErrors)) {
      if (errors && errors.length > 0) {
        fieldErrors[field] = errors[0]
      }
    }
    return { status: 'validation_error', fieldErrors }
  }

  const sourcePage = headersList.get('referer') ?? `/${locale}`

  const lead = {
    fullName: parsed.data.fullName,
    phone: parsed.data.phone,
    city: parsed.data.city || undefined,
    serviceInterest: parsed.data.serviceInterest || undefined,
    message: parsed.data.message || undefined,
    language: locale,
    sourcePage,
    createdAt: new Date(),
  }

  const saveResult = await leadService.save(lead)

  if (!saveResult.success) {
    return { status: 'error', error: saveResult.error }
  }

  // after() keeps the Vercel function alive after the response is sent,
  // so the Telegram notification is guaranteed to fire even on serverless.
  after(() => leadService.notify(lead))

  return { status: 'success' }
}
