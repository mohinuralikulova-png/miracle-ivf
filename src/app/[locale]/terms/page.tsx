import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/layout/Container'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terms' })
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://miracleivf.uz'

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `${BASE_URL}/${locale}/terms` },
  }
}

export default async function TermsPage() {
  const t = await getTranslations('terms')
  const tCommon = await getTranslations('common')
  const tFooter = await getTranslations('footer')

  const sections = [
    { heading: t('s1Heading'), body: t('s1Body') },
    { heading: t('s2Heading'), body: t('s2Body') },
    { heading: t('s3Heading'), body: t('s3Body') },
    { heading: t('s4Heading'), body: t('s4Body') },
    { heading: t('s5Heading'), body: t('s5Body') },
    { heading: t('s6Heading'), body: t('s6Body') },
    { heading: t('contactHeading'), body: t('contactBody') },
  ]

  return (
    <main id="main-content">
      <section className="bg-background py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              ← {tCommon('clinicName')}
            </Link>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {t('heading')}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{t('updated')}</p>
            <p className="mt-6 text-base leading-relaxed text-foreground/80">{t('intro')}</p>

            <div className="mt-10 space-y-8 divide-y divide-border">
              {sections.map(({ heading, body }) => (
                <div key={heading} className="pt-8 first:pt-0">
                  <h2 className="text-lg font-semibold text-primary">{heading}</h2>
                  <p className="mt-3 text-sm leading-7 text-foreground/75">{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl bg-primary/5 p-6 ring-1 ring-primary/10">
              <p className="text-sm text-muted-foreground">
                <Link href="/privacy" className="font-medium text-primary hover:underline">
                  {tFooter('privacy')}
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
