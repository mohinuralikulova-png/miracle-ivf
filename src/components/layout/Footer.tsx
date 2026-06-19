import { getTranslations } from 'next-intl/server'
import { Container } from './Container'

// Placeholder — full implementation in Phase 4.
export async function Footer() {
  const tCommon = await getTranslations('common')
  const tFooter = await getTranslations('footer')

  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card py-12">
      <Container>
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-lg font-bold text-primary">{tCommon('clinicName')}</p>
            <p className="mt-1 text-sm text-muted-foreground">{tFooter('tagline')}</p>
          </div>

          <p className="text-xs text-muted-foreground">
            {tFooter('copyright', { year })}
          </p>
        </div>
      </Container>
    </footer>
  )
}
