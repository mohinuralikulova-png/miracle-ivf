'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown, Loader2, Send, ShieldCheck } from 'lucide-react'
import { submitBooking } from '@/app/actions/booking'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import { FormField } from './FormField'
import { FormErrorState } from './FormErrorState'
import { FormSuccessState } from './FormSuccessState'
import type { BookingFormState } from '@/types'

interface Props {
  /** Localized reassurance line shown beneath the submit button. */
  reassurance: string
}

const INITIAL_STATE: BookingFormState = { status: 'idle' }

const fieldClass = cn(
  'w-full rounded-xl border border-input bg-white px-4 py-2.5 text-sm text-foreground shadow-sm transition-colors',
  'placeholder:text-muted-foreground',
  'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30',
  'disabled:cursor-not-allowed disabled:opacity-60',
  'aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-destructive/30',
)

// Lead capture form. Submits via the `submitBooking` Server Action, which runs
// the shared Zod schema then LeadService.submit() (Supabase → Telegram).
// This component never touches a delivery channel directly.
//
// Validation is server-driven (noValidate): the action returns localized field
// errors, keeping a single source of truth. Uncontrolled inputs retain their
// values across the action round-trip, so a validation error never wipes input.
export function BookingForm({ reassurance }: Props) {
  const t = useTranslations('form')
  const tA11y = useTranslations('a11y')
  const [state, formAction, isPending] = useActionState(submitBooking, INITIAL_STATE)
  const formRef = useRef<HTMLFormElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (state.status === 'validation_error') {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
    } else if (state.status === 'success') {
      trackEvent('form_success')
      trackEvent('generate_lead')
    } else if (state.status === 'error') {
      trackEvent('form_error')
    }
  }, [state])

  function handleFirstInteraction() {
    if (!startedRef.current) {
      startedRef.current = true
      trackEvent('form_start')
    }
  }

  if (state.status === 'success') {
    return (
      <FormSuccessState
        heading={t('success.heading')}
        body={t('success.body')}
        reassurance={t('success.reassurance')}
      />
    )
  }

  const fieldErrors = state.fieldErrors ?? {}

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={() => trackEvent('form_submit')}
      onFocusCapture={handleFirstInteraction}
      noValidate
      aria-busy={isPending}
      className="relative flex flex-col gap-5"
    >
      {state.status === 'error' && (
        <FormErrorState heading={t('error.heading')} body={t('error.body')} />
      )}

      <p className="text-xs text-muted-foreground">{t('required')}</p>

      <FormField
        name="fullName"
        label={t('fullName.label')}
        error={fieldErrors.fullName}
        required
        requiredLabel={tA11y('required')}
      >
        {({ id, invalid, describedBy }) => (
          <input
            id={id}
            name="fullName"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            placeholder={t('fullName.placeholder')}
            className={fieldClass}
          />
        )}
      </FormField>

      <FormField
        name="phone"
        label={t('phone.label')}
        error={fieldErrors.phone}
        required
        requiredLabel={tA11y('required')}
      >
        {({ id, invalid, describedBy }) => (
          <input
            id={id}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-required="true"
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            placeholder={t('phone.placeholder')}
            className={fieldClass}
          />
        )}
      </FormField>

      <FormField name="city" label={t('city.label')} error={fieldErrors.city}>
        {({ id, invalid, describedBy }) => (
          <input
            id={id}
            name="city"
            type="text"
            autoComplete="address-level2"
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            placeholder={t('city.placeholder')}
            className={fieldClass}
          />
        )}
      </FormField>

      <FormField
        name="serviceInterest"
        label={t('service.label')}
        error={fieldErrors.serviceInterest}
      >
        {({ id, invalid, describedBy }) => (
          <div className="relative">
            <select
              id={id}
              name="serviceInterest"
              defaultValue=""
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              className={cn(fieldClass, 'appearance-none pr-10')}
            >
              <option value="" disabled>
                {t('service.placeholder')}
              </option>
              <option value="ivf">{t('service.options.ivf')}</option>
              <option value="icsi">{t('service.options.icsi')}</option>
              <option value="iui">{t('service.options.iui')}</option>
              <option value="freezing">{t('service.options.freezing')}</option>
              <option value="male">{t('service.options.male')}</option>
              <option value="pgt">{t('service.options.pgt')}</option>
              <option value="general">{t('service.options.general')}</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        )}
      </FormField>

      <FormField name="message" label={t('message.label')} error={fieldErrors.message}>
        {({ id, invalid, describedBy }) => (
          <textarea
            id={id}
            name="message"
            rows={4}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            placeholder={t('message.placeholder')}
            className={cn(fieldClass, 'resize-y')}
          />
        )}
      </FormField>

      {/* Honeypot — off-screen spam trap; real users never see or tab to it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden">
        <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-1 flex flex-col gap-3">
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-all',
            'hover:bg-primary/90 active:bg-primary/80',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-70',
          )}
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              {t('submitting')}
            </>
          ) : (
            <>
              <Send className="h-5 w-5" aria-hidden="true" />
              {t('submit')}
            </>
          )}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {reassurance}
        </p>
      </div>
    </form>
  )
}
