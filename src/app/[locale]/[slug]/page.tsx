import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import type { AppLocale } from '@/i18n/routing'
import { SectionScroll } from '@/components/common/SectionScroll'

// Maps each locale's localized slug to the canonical section ID (HTML anchor).
const SLUG_TO_SECTION: Readonly<Record<string, Record<string, string>>> = {
  uz: {
    xizmatlar: 'services',
    shifokorlar: 'doctors',
    jarayon: 'process',
    muvaffaqiyat: 'success',
    'savol-javob': 'faq',
    aloqa: 'contact',
  },
  ru: {
    uslugi: 'services',
    vrachi: 'doctors',
    protsess: 'process',
    istorii: 'success',
    voprosy: 'faq',
    kontakty: 'contact',
  },
  en: {
    services: 'services',
    doctors: 'doctors',
    process: 'process',
    success: 'success',
    faq: 'faq',
    contact: 'contact',
  },
}

interface SlugPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { locale } = await params
  const tMeta = await getTranslations({ locale, namespace: 'meta' })
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://miracleivf.uz'

  return {
    alternates: {
      // Canonical points to the main locale page — slug pages are section anchors
      canonical: `${BASE_URL}/${locale}`,
    },
    robots: { index: false },
    title: tMeta('title'),
  }
}

export function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = []
  for (const locale of routing.locales) {
    for (const slug of Object.keys(SLUG_TO_SECTION[locale] ?? {})) {
      params.push({ locale, slug })
    }
  }
  return params
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { locale, slug } = await params

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound()
  }

  const sectionId = SLUG_TO_SECTION[locale]?.[slug]
  if (!sectionId) {
    notFound()
  }

  return (
    <main id="main-content">
      {/* Renders the same landing-page sections as /[locale] — populated in Phase 2–4 */}
      <SectionScroll sectionId={sectionId} />
    </main>
  )
}
