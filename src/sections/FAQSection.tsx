import { getTranslations } from 'next-intl/server'
import { HelpCircle, Stethoscope, Heart, MessageCircle } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { CTAButton } from '@/components/common/CTAButton'
import { FAQItem } from '@/components/common/FAQItem'
import type { FAQItemData } from '@/types'

export async function FAQSection() {
  const t = await getTranslations('faq')

  const items: FAQItemData[] = [
    { id: 'whatIsIvf',      question: t('whatIsIvf.question'),      answer: t('whatIsIvf.answer') },
    { id: 'whoIsItFor',     question: t('whoIsItFor.question'),     answer: t('whoIsItFor.answer') },
    { id: 'howLong',        question: t('howLong.question'),        answer: t('howLong.answer') },
    { id: 'isPainful',      question: t('isPainful.question'),      answer: t('isPainful.answer') },
    { id: 'tests',          question: t('tests.question'),          answer: t('tests.answer') },
    { id: 'successFactors', question: t('successFactors.question'), answer: t('successFactors.answer') },
    { id: 'regional',       question: t('regional.question'),       answer: t('regional.answer') },
    { id: 'howToBook',      question: t('howToBook.question'),      answer: t('howToBook.answer') },
  ]

  return (
    <Section id="faq" alternate>
      <Container>
        {/* Section badge */}
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary ring-1 ring-primary/20">
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
            {t('sectionBadge')}
          </span>
        </div>

        <SectionHeading heading={t('heading')} subheading={t('subheading')} align="center" />

        {/* Trust pills */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary shadow-sm ring-1 ring-border/50">
            <Stethoscope className="h-3.5 w-3.5 text-primary/60" aria-hidden="true" />
            {t('trust1')}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary shadow-sm ring-1 ring-border/50">
            <Heart className="h-3.5 w-3.5 text-primary/60" aria-hidden="true" />
            {t('trust2')}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary shadow-sm ring-1 ring-border/50">
            <MessageCircle className="h-3.5 w-3.5 text-primary/60" aria-hidden="true" />
            {t('trust3')}
          </span>
        </div>

        {/* Accordion */}
        <div className="mx-auto mt-14 max-w-3xl">
          <div
            className="rounded-2xl bg-white px-6 shadow-sm ring-1 ring-border/60 lg:px-8"
            role="list"
            aria-label={t('heading')}
          >
            {items.map((item) => (
              <FAQItem key={item.id} {...item} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <CTAButton
            label={t('cta')}
            targetId="contact"
            analyticsLocation="faq_section"
            size="lg"
          />
        </div>
      </Container>
    </Section>
  )
}
