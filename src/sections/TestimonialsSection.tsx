import { getTranslations } from 'next-intl/server'
import { MessageCircle, Star } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { CTAButton } from '@/components/common/CTAButton'
import { TestimonialCard } from '@/components/common/TestimonialCard'
import { ReviewGallery } from '@/components/common/ReviewGallery'
import type { TestimonialCardData } from '@/types'

export async function TestimonialsSection() {
  const t = await getTranslations('testimonials')

  const cards: TestimonialCardData[] = [
    {
      id: 't1',
      type: 'written',
      typeLabel: t('typeWritten'),
      rating: 5,
      quote: t('t1.quote'),
      name: t('t1.name'),
      city: t('t1.city'),
      treatment: t('t1.treatment'),
      mediaSrc: undefined,
      mediaBlur: false,
      mediaAlt: t('t1.mediaAlt'),
      verifiedLabel: t('verifiedLabel'),
      telegramSentLabel: t('telegramSentLabel'),
      ratingAriaLabel: t('stars', { count: 5 }),
    },
    {
      id: 't2',
      type: 'written',
      typeLabel: t('typeWritten'),
      rating: 5,
      quote: t('t2.quote'),
      name: t('t2.name'),
      city: t('t2.city'),
      treatment: t('t2.treatment'),
      mediaSrc: undefined,
      mediaBlur: false,
      mediaAlt: t('t2.mediaAlt'),
      verifiedLabel: t('verifiedLabel'),
      telegramSentLabel: t('telegramSentLabel'),
      ratingAriaLabel: t('stars', { count: 5 }),
    },
    {
      id: 't3',
      type: 'telegram',
      typeLabel: t('typeTelegram'),
      rating: 5,
      quote: t('t3.quote'),
      name: t('t3.name'),
      city: t('t3.city'),
      ageRange: t('t3.ageRange'),
      treatment: t('t3.treatment'),
      mediaSrc: undefined,
      mediaBlur: true,
      mediaAlt: t('t3.mediaAlt'),
      verifiedLabel: t('verifiedLabel'),
      telegramSentLabel: t('telegramSentLabel'),
      ratingAriaLabel: t('stars', { count: 5 }),
    },
    {
      id: 't4',
      type: 'screenshot',
      typeLabel: t('typeScreenshot'),
      rating: 5,
      quote: t('t4.quote'),
      name: t('t4.name'),
      city: t('t4.city'),
      treatment: t('t4.treatment'),
      mediaSrc: undefined,
      mediaBlur: true,
      mediaAlt: t('t4.mediaAlt'),
      verifiedLabel: t('verifiedLabel'),
      telegramSentLabel: t('telegramSentLabel'),
      ratingAriaLabel: t('stars', { count: 5 }),
    },
    {
      id: 't5',
      type: 'written',
      typeLabel: t('typeWritten'),
      rating: 5,
      quote: t('t5.quote'),
      name: t('t5.name'),
      city: t('t5.city'),
      ageRange: t('t5.ageRange'),
      treatment: t('t5.treatment'),
      mediaSrc: undefined,
      mediaBlur: false,
      mediaAlt: t('t5.mediaAlt'),
      verifiedLabel: t('verifiedLabel'),
      telegramSentLabel: t('telegramSentLabel'),
      ratingAriaLabel: t('stars', { count: 5 }),
    },
    {
      id: 't6',
      type: 'video',
      typeLabel: t('typeVideo'),
      rating: 5,
      quote: t('t6.quote'),
      name: t('t6.name'),
      city: t('t6.city'),
      treatment: t('t6.treatment'),
      mediaSrc: undefined,
      mediaBlur: false,
      mediaAlt: t('t6.mediaAlt'),
      verifiedLabel: t('verifiedLabel'),
      telegramSentLabel: t('telegramSentLabel'),
      ratingAriaLabel: t('stars', { count: 5 }),
    },
  ]

  return (
    <Section id="testimonials">
      <Container>
        {/* Trust badge */}
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary ring-1 ring-primary/20">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {t('trustBadge')}
          </span>
        </div>

        <SectionHeading heading={t('heading')} subheading={t('subheading')} align="center" />

        {/* Social proof bar */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <div role="img" aria-label={t('stars', { count: 5 })} className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} aria-hidden="true" className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-2xl font-bold text-foreground">{t('overallRating')}</span>
          <span className="text-sm text-muted-foreground">{t('ratingLabel')}</span>
          <span className="text-border" aria-hidden="true">·</span>
          <span className="text-sm text-muted-foreground">{t('socialProofStats')}</span>
        </div>

        {/* Gallery */}
        <div className="mt-14">
          <ReviewGallery ariaLabel={t('heading')}>
            {cards.map((card) => (
              <TestimonialCard key={card.id} {...card} />
            ))}
          </ReviewGallery>
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <CTAButton
            label={t('cta')}
            targetId="contact"
            analyticsLocation="testimonials_section"
            size="lg"
          />
        </div>
      </Container>
    </Section>
  )
}
