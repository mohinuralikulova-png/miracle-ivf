import { getTranslations } from 'next-intl/server'
import { Instagram, Facebook, Youtube, Send, Phone, Clock } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Container } from './Container'

type SocialLink = { href: string; label: string; Icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }> }
type NavLink = { href: { pathname: '/'; hash: string }; label: string }

export async function Footer() {
  const tCommon = await getTranslations('common')
  const tFooter = await getTranslations('footer')
  const tNav = await getTranslations('nav')
  const tA11y = await getTranslations('a11y')

  const year = new Date().getFullYear()
  const phone = tCommon('phone')
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, '')}`

  const navLinks: NavLink[] = [
    { href: { pathname: '/', hash: 'services' }, label: tNav('services') },
    { href: { pathname: '/', hash: 'doctors' },  label: tNav('doctors') },
    { href: { pathname: '/', hash: 'process' },  label: tNav('process') },
    { href: { pathname: '/', hash: 'success' },  label: tNav('success') },
    { href: { pathname: '/', hash: 'contact' },  label: tNav('contact') },
  ]

  const socialLinks: SocialLink[] = [
    { href: tCommon('instagramUrl'), label: tFooter('social.instagram'), Icon: Instagram },
    { href: tCommon('facebookUrl'),  label: tFooter('social.facebook'),  Icon: Facebook },
    { href: tCommon('youtubeUrl'),   label: tFooter('social.youtube'),   Icon: Youtube },
    { href: tCommon('telegramUrl'),  label: tCommon('ctaTelegram'),       Icon: Send },
  ]

  return (
    <footer className="border-t border-border bg-card">
      <Container>
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block text-xl font-bold text-primary">
              {tCommon('clinicName')}
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {tFooter('tagline')}
            </p>
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4 text-primary/60" aria-hidden="true" />
              {phone}
            </a>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {tFooter('nav.heading')}
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-foreground/75 transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working hours column */}
          <div>
            <h3 className="mb-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {tFooter('hours.heading')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-foreground/75">{tFooter('hours.weekdays')}</li>
              <li className="text-foreground/75">{tFooter('hours.saturday')}</li>
              <li className="text-muted-foreground">{tFooter('hours.sunday')}</li>
            </ul>
          </div>

          {/* Social column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {tFooter('social.heading')}
            </h3>
            <ul className="space-y-2.5">
              {socialLinks.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-foreground/75 transition-colors hover:text-primary"
                  >
                    <Icon className="h-4 w-4 text-primary/60" aria-hidden="true" />
                    {label}
                    <span className="sr-only">{tA11y('externalLink')}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar — copyright + legal links */}
        <div className="flex flex-col items-center gap-3 border-t border-border py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-muted-foreground">
            {tFooter('copyright', { year })}
          </p>
          <nav aria-label="Legal" className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {tFooter('privacy')}
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {tFooter('terms')}
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
