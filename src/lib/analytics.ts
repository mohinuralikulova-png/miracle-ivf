// Analytics helper — safe to import anywhere; only runs in the browser.
// All events are listed in PRD §16.2.

type EventName =
  | 'page_view'
  | 'cta_click'
  | 'call_click'
  | 'messaging_click'
  | 'form_start'
  | 'form_submit'
  | 'form_success'
  | 'form_error'
  | 'generate_lead'
  | 'faq_open'
  | 'scroll_depth'
  | 'language_switch'
  | 'video_play'

interface EventParamsMap {
  page_view: Record<string, never>
  cta_click: { location: string }
  call_click: Record<string, never>
  messaging_click: { platform: 'whatsapp' | 'telegram' }
  form_start: Record<string, never>
  form_submit: Record<string, never>
  form_success: Record<string, never>
  form_error: Record<string, never>
  generate_lead: Record<string, never>
  faq_open: { question_id: string }
  scroll_depth: { percent: 25 | 50 | 75 | 100 }
  language_switch: { from: string; to: string }
  video_play: { video_id: string }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

// Maps internal events to Meta Pixel standard events. Only events with a
// meaningful Pixel equivalent are forwarded; everything else is GA4-only.
// (Pixel `PageView` fires once from the base snippet in AnalyticsScripts.)
const PIXEL_STANDARD_EVENT: Partial<Record<EventName, 'Lead' | 'Contact'>> = {
  generate_lead: 'Lead', // confirmed booking submission
  call_click: 'Contact', // tapped a phone link
  messaging_click: 'Contact', // opened WhatsApp/Telegram
}

export function trackEvent<T extends EventName>(
  event: T,
  params?: EventParamsMap[T],
): void {
  if (typeof window === 'undefined') return

  // GA4 — every event is forwarded as a custom event.
  if (window.gtag) {
    window.gtag('event', event, params ?? {})
  }

  // Meta Pixel — only mapped standard events are forwarded.
  const pixelEvent = PIXEL_STANDARD_EVENT[event]
  if (pixelEvent && window.fbq) {
    window.fbq('track', pixelEvent)
  }
}
