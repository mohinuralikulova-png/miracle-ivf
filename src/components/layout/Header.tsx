import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Container } from './Container'

// Placeholder — full implementation in Phase 2 (nav links, language switcher, mobile menu).
export async function Header() {
  const tCommon = await getTranslations('common')
  const tA11y = await getTranslations('a11y')

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" aria-label={tA11y('logoAlt')} className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">{tCommon('clinicName')}</span>
          </Link>

          {/* Nav + language switcher — Phase 2 */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
            {/* Populated in Phase 2 */}
          </nav>

          <Link
            href="/contact"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {tCommon('ctaPrimary')}
          </Link>
        </div>
      </Container>
    </header>
  )
}
