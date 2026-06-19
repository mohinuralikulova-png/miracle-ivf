import { getTranslations } from 'next-intl/server'
import { Route, UserCheck, FileCheck, Globe } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { CTAButton } from '@/components/common/CTAButton'
import { ProcessStepCard } from '@/components/common/ProcessStepCard'
import { cn } from '@/lib/utils'
import type { ProcessStepData } from '@/types'

export async function IVFProcessSection() {
  const t = await getTranslations('process')

  const steps: ProcessStepData[] = [
    { id: 'step1', stepNumber: t('step1.number'), title: t('step1.title'), description: t('step1.description'), isLast: false },
    { id: 'step2', stepNumber: t('step2.number'), title: t('step2.title'), description: t('step2.description'), isLast: false },
    { id: 'step3', stepNumber: t('step3.number'), title: t('step3.title'), description: t('step3.description'), isLast: false },
    { id: 'step4', stepNumber: t('step4.number'), title: t('step4.title'), description: t('step4.description'), isLast: false },
    { id: 'step5', stepNumber: t('step5.number'), title: t('step5.title'), description: t('step5.description'), isLast: false },
    { id: 'step6', stepNumber: t('step6.number'), title: t('step6.title'), description: t('step6.description'), isLast: false },
    { id: 'step7', stepNumber: t('step7.number'), title: t('step7.title'), description: t('step7.description'), isLast: false },
    { id: 'step8', stepNumber: t('step8.number'), title: t('step8.title'), description: t('step8.description'), isLast: true  },
  ]

  return (
    <Section id="process">
      <Container>
        {/* Section badge */}
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary ring-1 ring-primary/20">
            <Route className="h-4 w-4" aria-hidden="true" />
            {t('sectionBadge')}
          </span>
        </div>

        <SectionHeading heading={t('heading')} subheading={t('subheading')} align="center" />

        {/* Trust pills */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary shadow-sm ring-1 ring-border/50">
            <UserCheck className="h-3.5 w-3.5 text-primary/60" aria-hidden="true" />
            {t('trust1')}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary shadow-sm ring-1 ring-border/50">
            <FileCheck className="h-3.5 w-3.5 text-primary/60" aria-hidden="true" />
            {t('trust2')}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary shadow-sm ring-1 ring-border/50">
            <Globe className="h-3.5 w-3.5 text-primary/60" aria-hidden="true" />
            {t('trust3')}
          </span>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto mt-14 max-w-5xl">
          {/* Vertical connecting line — desktop only */}
          <div
            className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-primary/40 via-primary/20 to-accent/50 lg:block"
            aria-hidden="true"
          />

          <ol aria-label={t('heading')}>
            {steps.map((step, i) => {
              const isEven = i % 2 === 0

              const stepCircle = (
                <div
                  className={cn(
                    'relative z-10 flex h-11 w-11 flex-none items-center justify-center rounded-full font-bold text-sm ring-4 ring-background shadow-md lg:h-12 lg:w-12',
                    step.isLast
                      ? 'bg-accent text-primary'
                      : 'bg-primary text-white',
                  )}
                  aria-hidden="true"
                >
                  {step.stepNumber}
                </div>
              )

              return (
                <li key={step.id} className="relative">
                  {/* ── Mobile layout ─────────────────────────────────── */}
                  <div className="flex items-start gap-4 pb-5 lg:hidden">
                    {stepCircle}
                    <div className="flex-1 pt-0.5">
                      <ProcessStepCard {...step} />
                    </div>
                  </div>

                  {/* ── Desktop layout (alternating sides) ────────────── */}
                  <div className="hidden lg:grid lg:grid-cols-[1fr_5rem_1fr] lg:items-start lg:py-4">
                    {/* Left card — even steps */}
                    <div className="flex justify-end pr-10">
                      {isEven ? <ProcessStepCard {...step} /> : null}
                    </div>

                    {/* Center: step circle */}
                    <div className="flex justify-center pt-4">
                      {stepCircle}
                    </div>

                    {/* Right card — odd steps */}
                    <div className="pl-10 pt-0">
                      {!isEven ? <ProcessStepCard {...step} /> : null}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <CTAButton
            label={t('cta')}
            targetId="contact"
            analyticsLocation="process_section"
            size="lg"
          />
        </div>
      </Container>
    </Section>
  )
}
