import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/layout/Container'
import { StatCounter } from '@/components/common/StatCounter'

export async function TrustStats() {
  const t = await getTranslations('stats')

  // Numeric values are animation targets only — translated display strings
  // (with locale-specific number formatting) are shown once animation completes.
  const stats = [
    {
      numericValue: 65,
      suffix: '%',
      displayValue: t('successRate.value'),
      label: t('successRate.label'),
      iconKey: 'trophy' as const,
      ariaLabel: `${t('successRate.value')} — ${t('successRate.label')}`,
    },
    {
      numericValue: 10000,
      suffix: '+',
      displayValue: t('babiesBorn.value'),
      label: t('babiesBorn.label'),
      iconKey: 'heart' as const,
      ariaLabel: `${t('babiesBorn.value')} — ${t('babiesBorn.label')}`,
    },
    {
      numericValue: 15,
      suffix: '+',
      displayValue: t('yearsExp.value'),
      label: t('yearsExp.label'),
      iconKey: 'clock' as const,
      ariaLabel: `${t('yearsExp.value')} — ${t('yearsExp.label')}`,
    },
    {
      numericValue: 20,
      suffix: '+',
      displayValue: t('doctors.value'),
      label: t('doctors.label'),
      iconKey: 'globe' as const,
      ariaLabel: `${t('doctors.value')} — ${t('doctors.label')}`,
    },
  ]

  return (
    <section
      id="stats"
      aria-label={t('ariaLabel')}
      className="border-y border-border/60 bg-gradient-to-b from-primary/[.05] to-background py-14 sm:py-16"
    >
      <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-primary/60">
        {t('sectionLabel')}
      </p>

      <Container>
        <div className="grid grid-cols-2 divide-x divide-y divide-border/40 md:grid-cols-4 md:divide-y-0">
          {stats.map((stat) => (
            <StatCounter key={stat.iconKey} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  )
}
