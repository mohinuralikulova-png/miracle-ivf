import { getTranslations } from 'next-intl/server'
import { Sparkles } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { CTAButton } from '@/components/common/CTAButton'
import { ResultCard } from '@/components/common/ResultCard'
import { ResultGallery } from '@/components/common/ResultGallery'
import { RESULTS } from '@/lib/config/results'
import type { ResultCardData } from '@/types'

export async function SuccessResults() {
  const t = await getTranslations('stories')

  // Shared strings passed to every card.
  const successLabel = t('successLabel')
  const blurNotice = t('blurNotice')

  // Media config is driven by RESULTS; display strings come from translations.
  // Explicit t() calls keep translation keys type-checked against uz.json.
  const cards: ResultCardData[] = [
    {
      id: 'result1',
      type: RESULTS[0].type,
      typeLabel: t('typeHcg'),
      identifier: t('result1.identifier'),
      outcome: t('result1.outcome'),
      date: t('result1.date'),
      mediaAlt: t('result1.mediaAlt'),
      mediaSrc: RESULTS[0].mediaSrc,
      mediaBlur: RESULTS[0].mediaBlur ?? false,
      successLabel,
      blurNotice,
    },
    {
      id: 'result2',
      type: RESULTS[1].type,
      typeLabel: t('typeHcg'),
      identifier: t('result2.identifier'),
      outcome: t('result2.outcome'),
      date: t('result2.date'),
      mediaAlt: t('result2.mediaAlt'),
      mediaSrc: RESULTS[1].mediaSrc,
      mediaBlur: RESULTS[1].mediaBlur ?? false,
      successLabel,
      blurNotice,
    },
    {
      id: 'result3',
      type: RESULTS[2].type,
      typeLabel: t('typeIvf'),
      identifier: t('result3.identifier'),
      outcome: t('result3.outcome'),
      date: t('result3.date'),
      mediaAlt: t('result3.mediaAlt'),
      mediaSrc: RESULTS[2].mediaSrc,
      mediaBlur: RESULTS[2].mediaBlur ?? false,
      successLabel,
      blurNotice,
    },
    {
      id: 'result4',
      type: RESULTS[3].type,
      typeLabel: t('typeIvf'),
      identifier: t('result4.identifier'),
      outcome: t('result4.outcome'),
      date: t('result4.date'),
      mediaAlt: t('result4.mediaAlt'),
      mediaSrc: RESULTS[3].mediaSrc,
      mediaBlur: RESULTS[3].mediaBlur ?? false,
      successLabel,
      blurNotice,
    },
    {
      id: 'result5',
      type: RESULTS[4].type,
      typeLabel: t('typeFamily'),
      identifier: t('result5.identifier'),
      outcome: t('result5.outcome'),
      date: t('result5.date'),
      mediaAlt: t('result5.mediaAlt'),
      mediaSrc: RESULTS[4].mediaSrc,
      mediaBlur: RESULTS[4].mediaBlur ?? false,
      successLabel,
      blurNotice,
    },
    {
      id: 'result6',
      type: RESULTS[5].type,
      typeLabel: t('typeGratitude'),
      identifier: t('result6.identifier'),
      outcome: t('result6.outcome'),
      date: t('result6.date'),
      mediaAlt: t('result6.mediaAlt'),
      mediaSrc: RESULTS[5].mediaSrc,
      mediaBlur: RESULTS[5].mediaBlur ?? false,
      quote: t('result6.quote'),
      successLabel,
      blurNotice,
    },
  ]

  return (
    <Section id="stories" alternate>
      <Container>
        {/* Trust badge */}
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary ring-1 ring-primary/20">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {t('sectionBadge')}
          </span>
        </div>

        <SectionHeading
          heading={t('heading')}
          subheading={t('subheading')}
          align="center"
        />

        {/* Patient privacy notice */}
        <p className="mt-4 text-center text-xs text-muted-foreground/70">
          {t('privacyNote')}
        </p>

        {/* Result gallery — 6 cards: 2 HCG, 2 IVF, 1 Family, 1 Gratitude */}
        <ResultGallery ariaLabel={t('heading')}>
          {cards.map((card) => (
            <ResultCard key={card.id} {...card} />
          ))}
        </ResultGallery>

        {/* Section CTA */}
        <div className="mt-14 flex justify-center">
          <CTAButton
            label={t('cta')}
            targetId="contact"
            analyticsLocation="success_results"
            size="lg"
          />
        </div>
      </Container>
    </Section>
  )
}
