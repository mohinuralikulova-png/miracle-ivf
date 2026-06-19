import { getTranslations } from 'next-intl/server'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { CTAButton } from '@/components/common/CTAButton'

interface PanelItemProps {
  text: string
  variant: 'problem' | 'solution'
}

function PanelItem({ text, variant }: PanelItemProps) {
  const Icon = variant === 'problem' ? AlertCircle : CheckCircle2
  const iconClass =
    variant === 'problem'
      ? 'mt-0.5 h-5 w-5 shrink-0 text-rose-400'
      : 'mt-0.5 h-5 w-5 shrink-0 text-primary'

  return (
    <li className="flex items-start gap-3">
      <Icon className={iconClass} aria-hidden="true" />
      <span className="text-sm leading-relaxed sm:text-base">{text}</span>
    </li>
  )
}

export async function ProblemSolution() {
  const t = await getTranslations('problem')

  const problemItems = [t('item1'), t('item2'), t('item3'), t('item4')] as const
  const solutionItems = [t('solution1'), t('solution2'), t('solution3'), t('solution4')] as const

  return (
    <Section id="problem" alternate>
      <Container>
        {/* Section heading */}
        <SectionHeading
          heading={t('heading')}
          subheading={t('subheading')}
          align="center"
        />

        {/* Two panels */}
        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8">
          {/* ── Problem panel ───────────────────────────────────── */}
          <div className="rounded-2xl border border-accent/40 bg-accent/[.12] p-7 sm:p-8">
            <h3 className="mb-6 text-lg font-semibold text-foreground">{t('leftHeading')}</h3>
            <ul className="space-y-4">
              {problemItems.map((item, i) => (
                <PanelItem key={`p-${i}`} text={item} variant="problem" />
              ))}
            </ul>
          </div>

          {/* ── Solution panel ──────────────────────────────────── */}
          <div className="rounded-2xl border border-primary/20 bg-primary/[.05] p-7 sm:p-8">
            <h3 className="mb-6 text-lg font-semibold text-primary">{t('rightHeading')}</h3>
            <ul className="space-y-4">
              {solutionItems.map((item, i) => (
                <PanelItem key={`s-${i}`} text={item} variant="solution" />
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <CTAButton
            label={t('cta')}
            targetId="contact"
            analyticsLocation="problem_solution"
          />
        </div>
      </Container>
    </Section>
  )
}
