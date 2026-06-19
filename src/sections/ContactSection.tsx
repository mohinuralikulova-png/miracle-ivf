import { getTranslations } from 'next-intl/server'
import {
  CalendarHeart,
  ShieldCheck,
  BadgeCheck,
  Clock,
  HandHeart,
  Phone,
  Send,
  MessageCircle,
  MapPin,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { BookingForm } from '@/components/common/BookingForm'

function ContactIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-primary/[.07] ring-1 ring-primary/10">
      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
    </span>
  )
}

// Primary conversion section: booking form (left) + clinic contact details and
// a Google Maps placeholder (right). The form drives the LeadService pipeline;
// this section only supplies localized copy and NAP-consistent contact links.
export async function ContactSection() {
  const t = await getTranslations('contact')
  const tCommon = await getTranslations('common')
  const tA11y = await getTranslations('a11y')

  const phone = tCommon('phone')
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, '')}`
  const telegramUrl = tCommon('telegramUrl')
  const whatsappUrl = tCommon('whatsappUrl')
  const mapsUrl = tCommon('mapsUrl')

  const reassurances: { icon: LucideIcon; label: string }[] = [
    { icon: ShieldCheck, label: t('reassurance1') },
    { icon: BadgeCheck, label: t('reassurance2') },
    { icon: Clock, label: t('reassurance3') },
    { icon: HandHeart, label: t('reassurance4') },
  ]

  return (
    <Section id="contact">
      <Container>
        {/* Section badge */}
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary ring-1 ring-primary/20">
            <CalendarHeart className="h-4 w-4" aria-hidden="true" />
            {t('sectionBadge')}
          </span>
        </div>

        <SectionHeading heading={t('heading')} subheading={t('subheading')} align="center" />

        {/* Reassurance pills */}
        <ul className="mt-6 flex flex-wrap justify-center gap-3">
          {reassurances.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary shadow-sm ring-1 ring-border/50"
            >
              <Icon className="h-3.5 w-3.5 text-primary/60" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Booking form */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border/60 sm:p-8 lg:col-span-7">
            <BookingForm reassurance={t('reassurance1')} />
          </div>

          {/* Contact details + map */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border/60 sm:p-7">
              <h3 className="text-base font-bold text-primary">{t('orContact')}</h3>

              <ul className="mt-5 flex flex-col gap-4">
                <li>
                  <a href={phoneHref} className="group flex items-start gap-3.5">
                    <ContactIcon icon={Phone} />
                    <span className="flex flex-col">
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {t('phoneLabel')}
                      </span>
                      <span className="text-sm font-semibold text-primary group-hover:underline">
                        {phone}
                      </span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3.5"
                  >
                    <ContactIcon icon={Send} />
                    <span className="flex flex-col">
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {t('telegramLabel')}
                      </span>
                      <span className="text-sm font-semibold text-primary group-hover:underline">
                        {tCommon('ctaTelegram')}
                        <span className="sr-only"> {tA11y('externalLink')}</span>
                      </span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3.5"
                  >
                    <ContactIcon icon={MessageCircle} />
                    <span className="flex flex-col">
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {t('whatsappLabel')}
                      </span>
                      <span className="text-sm font-semibold text-primary group-hover:underline">
                        {tCommon('ctaWhatsapp')}
                        <span className="sr-only"> {tA11y('externalLink')}</span>
                      </span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3.5"
                  >
                    <ContactIcon icon={MapPin} />
                    <span className="flex flex-col">
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {t('addressLabel')}
                      </span>
                      <span className="text-sm font-semibold text-primary group-hover:underline">
                        {tCommon('address')}
                        <span className="sr-only"> {tA11y('externalLink')}</span>
                      </span>
                    </span>
                  </a>
                </li>

                <li className="flex items-start gap-3.5">
                  <ContactIcon icon={Clock} />
                  <span className="flex flex-col">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {t('hoursLabel')}
                    </span>
                    <span className="text-sm font-semibold text-primary">{t('hours')}</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Google Maps placeholder — swap for an embedded iframe when coords are final */}
            <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-border/60">
              <div
                role="img"
                aria-label={t('mapEmbedTitle')}
                className="flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-secondary/60"
              >
                <MapPin className="h-8 w-8 text-primary/40" aria-hidden="true" />
                <span className="px-6 text-center text-sm font-medium text-muted-foreground">
                  {t('mapEmbedTitle')}
                </span>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-primary shadow-sm ring-1 ring-border/60 transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  {t('mapLabel')}
                  <span className="sr-only"> {tA11y('externalLink')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
