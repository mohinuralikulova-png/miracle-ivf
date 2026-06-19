import { getTranslations } from 'next-intl/server'
import { LayoutGrid, Globe, Heart, ShieldCheck } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { CTAButton } from '@/components/common/CTAButton'
import { ServiceCard } from '@/components/common/ServiceCard'
import { SERVICE_ICON_BY_ID } from '@/lib/config/services'
import { cn } from '@/lib/utils'
import type { ServiceCardData } from '@/types'

// 10 cards in 3-col grid → last row has 1 card → center it at lg
const TOTAL = 10
const LAST_ALONE = TOTAL % 3 === 1

export async function ServicesSection() {
  const t = await getTranslations('services')

  const cards: ServiceCardData[] = [
    {
      id: 'ivf',
      title: t('ivf.title'),
      description: t('ivf.description'),
      benefit: t('ivf.benefit'),
      iconName: SERVICE_ICON_BY_ID['ivf'],
      iconAlt: t('ivf.iconAlt'),
    },
    {
      id: 'diagnostics',
      title: t('diagnostics.title'),
      description: t('diagnostics.description'),
      benefit: t('diagnostics.benefit'),
      iconName: SERVICE_ICON_BY_ID['diagnostics'],
      iconAlt: t('diagnostics.iconAlt'),
    },
    {
      id: 'female',
      title: t('female.title'),
      description: t('female.description'),
      benefit: t('female.benefit'),
      iconName: SERVICE_ICON_BY_ID['female'],
      iconAlt: t('female.iconAlt'),
    },
    {
      id: 'male',
      title: t('male.title'),
      description: t('male.description'),
      benefit: t('male.benefit'),
      iconName: SERVICE_ICON_BY_ID['male'],
      iconAlt: t('male.iconAlt'),
    },
    {
      id: 'preparation',
      title: t('preparation.title'),
      description: t('preparation.description'),
      benefit: t('preparation.benefit'),
      iconName: SERVICE_ICON_BY_ID['preparation'],
      iconAlt: t('preparation.iconAlt'),
    },
    {
      id: 'pgt',
      title: t('pgt.title'),
      description: t('pgt.description'),
      benefit: t('pgt.benefit'),
      iconName: SERVICE_ICON_BY_ID['pgt'],
      iconAlt: t('pgt.iconAlt'),
    },
    {
      id: 'hysteroscopy',
      title: t('hysteroscopy.title'),
      description: t('hysteroscopy.description'),
      benefit: t('hysteroscopy.benefit'),
      iconName: SERVICE_ICON_BY_ID['hysteroscopy'],
      iconAlt: t('hysteroscopy.iconAlt'),
    },
    {
      id: 'hormones',
      title: t('hormones.title'),
      description: t('hormones.description'),
      benefit: t('hormones.benefit'),
      iconName: SERVICE_ICON_BY_ID['hormones'],
      iconAlt: t('hormones.iconAlt'),
    },
    {
      id: 'gynConsult',
      title: t('gynConsult.title'),
      description: t('gynConsult.description'),
      benefit: t('gynConsult.benefit'),
      iconName: SERVICE_ICON_BY_ID['gynConsult'],
      iconAlt: t('gynConsult.iconAlt'),
    },
    {
      id: 'androConsult',
      title: t('androConsult.title'),
      description: t('androConsult.description'),
      benefit: t('androConsult.benefit'),
      iconName: SERVICE_ICON_BY_ID['androConsult'],
      iconAlt: t('androConsult.iconAlt'),
    },
  ]

  return (
    <Section id="services" alternate>
      <Container>
        {/* Section badge */}
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary ring-1 ring-primary/20">
            <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            {t('sectionBadge')}
          </span>
        </div>

        <SectionHeading heading={t('heading')} subheading={t('subheading')} align="center" />

        {/* Trust pills */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-primary shadow-sm ring-1 ring-border/50">
            <Globe className="h-3.5 w-3.5 text-primary/60" aria-hidden="true" />
            {t('trust1')}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-primary shadow-sm ring-1 ring-border/50">
            <Heart className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {t('trust2')}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-primary shadow-sm ring-1 ring-border/50">
            <ShieldCheck className="h-3.5 w-3.5 text-primary/60" aria-hidden="true" />
            {t('trust3')}
          </span>
        </div>

        {/* Cards grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {cards.map((card, i) => (
            <div
              key={card.id}
              className={cn(
                i === cards.length - 1 && LAST_ALONE
                  ? 'sm:col-span-2 sm:mx-auto sm:w-1/2 lg:col-span-1 lg:col-start-2 lg:mx-0 lg:w-auto'
                  : undefined,
              )}
            >
              <ServiceCard {...card} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <CTAButton
            label={t('cta')}
            targetId="contact"
            analyticsLocation="services_section"
            size="lg"
          />
        </div>
      </Container>
    </Section>
  )
}
