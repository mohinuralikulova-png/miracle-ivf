import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

// Placeholder — full implementation in Phase 4 with Intersection Observer visibility control.
// The bar hides when the contact form is visible on screen (client-side behaviour).
export async function StickyCTABar() {
  const t = await getTranslations('common')

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card/95 pb-safe shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/80 md:hidden">
      <div className="flex items-center gap-3 p-3">
        <Link
          href={{ pathname: '/', hash: 'contact' }}
          className="flex-1 rounded-xl bg-primary py-3 text-center text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t('ctaPrimary')}
        </Link>
        <a
          href={`tel:${t('phone').replace(/[^\d+]/g, '')}`}
          className="flex-1 rounded-xl border border-primary py-3 text-center text-sm font-semibold text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t('ctaCall')}
        </a>
      </div>
    </div>
  )
}
