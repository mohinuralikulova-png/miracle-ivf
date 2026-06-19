import { getTranslations } from 'next-intl/server'
import { Globe } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { CTAButton } from '@/components/common/CTAButton'
import { DoctorCard } from '@/components/common/DoctorCard'
import { DOCTORS } from '@/lib/config/doctors'
import { cn } from '@/lib/utils'
import type { DoctorCardData } from '@/types'

export async function Doctors() {
  const t = await getTranslations('doctors')

  // Photo paths come from the config; all display strings come from translations.
  // Explicit t() calls keep key references type-checked against uz.json.
  const photoLookup = new Map(DOCTORS.map((d) => [d.id, d.photoSrc]))

  const doctorCards: DoctorCardData[] = [
    {
      id: 'inamdar',
      name: t('inamdar.name'),
      specialty: t('inamdar.specialty'),
      country: t('inamdar.country'),
      experience: t('inamdar.experience'),
      bio: t('inamdar.bio'),
      tags: [t('inamdar.tag1'), t('inamdar.tag2'), t('inamdar.tag3')],
      consultationCta: t('consultationCta'),
      photoSrc: photoLookup.get('inamdar'),
      photoAlt: t('photoAlt', { name: t('inamdar.name') }),
      analyticsLocation: 'doctors_inamdar',
    },
    {
      id: 'beysenbi',
      name: t('beysenbi.name'),
      specialty: t('beysenbi.specialty'),
      country: t('beysenbi.country'),
      experience: t('beysenbi.experience'),
      bio: t('beysenbi.bio'),
      tags: [t('beysenbi.tag1'), t('beysenbi.tag2'), t('beysenbi.tag3')],
      consultationCta: t('consultationCta'),
      photoSrc: photoLookup.get('beysenbi'),
      photoAlt: t('photoAlt', { name: t('beysenbi.name') }),
      analyticsLocation: 'doctors_beysenbi',
    },
    {
      id: 'benko',
      name: t('benko.name'),
      specialty: t('benko.specialty'),
      country: t('benko.country'),
      experience: t('benko.experience'),
      bio: t('benko.bio'),
      tags: [t('benko.tag1'), t('benko.tag2'), t('benko.tag3')],
      consultationCta: t('consultationCta'),
      photoSrc: photoLookup.get('benko'),
      photoAlt: t('photoAlt', { name: t('benko.name') }),
      analyticsLocation: 'doctors_benko',
    },
  ]

  const isLastCardOdd = doctorCards.length % 2 !== 0

  return (
    <Section id="doctors">
      <Container>
        {/* International team badge */}
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary ring-1 ring-primary/20">
            <Globe className="h-4 w-4" aria-hidden="true" />
            {t('teamBadge')}
          </span>
        </div>

        <SectionHeading
          heading={t('heading')}
          subheading={t('subheading')}
          align="center"
        />

        {/* Combined experience trust line */}
        <p className="mt-3 text-center text-sm font-medium text-primary/60">
          {t('combinedExp')}
        </p>

        {/* Doctor cards — 1 col mobile, 2 col md, 3 col lg.
            When the last card is odd at 2-col, center it so the layout doesn't feel lopsided. */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {doctorCards.map((doc, i) => (
            <div
              key={doc.id}
              className={cn(
                i === doctorCards.length - 1 && isLastCardOdd
                  ? 'md:col-span-2 md:mx-auto md:w-1/2 lg:col-span-1 lg:mx-0 lg:w-auto'
                  : undefined,
              )}
            >
              <DoctorCard {...doc} />
            </div>
          ))}
        </div>

        {/* Section-level CTA */}
        <div className="mt-14 flex justify-center">
          <CTAButton
            label={t('cta')}
            targetId="contact"
            analyticsLocation="doctors_section"
            size="lg"
          />
        </div>
      </Container>
    </Section>
  )
}
