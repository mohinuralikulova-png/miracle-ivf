import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import type { AppLocale } from '@/i18n/routing'
import { generateStructuredData } from '@/lib/schema'
import { SkipLink } from '@/components/layout/SkipLink'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyCTABar } from '@/components/layout/StickyCTABar'
import { AnalyticsScripts } from '@/components/layout/AnalyticsScripts'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://miracleivf.uz'

const OG_LOCALE: Record<string, string> = {
  uz: 'uz_UZ',
  ru: 'ru_RU',
  en: 'en_US',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const tMeta = await getTranslations({ locale, namespace: 'meta' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })

  const languageAlternates = Object.fromEntries(
    routing.locales.map((l) => [l, `${BASE_URL}/${l}`]),
  )

  return {
    title: tMeta('title'),
    description: tMeta('description'),
    metadataBase: new URL(BASE_URL),
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: { ...languageAlternates, 'x-default': `${BASE_URL}/uz` },
    },
    openGraph: {
      title: tMeta('ogTitle'),
      description: tMeta('ogDescription'),
      url: `${BASE_URL}/${locale}`,
      siteName: tCommon('clinicName'),
      locale: OG_LOCALE[locale] ?? 'uz_UZ',
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: tMeta('ogTitle') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: tMeta('twitterTitle'),
      description: tMeta('description'),
      images: ['/og-image.jpg'],
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound()
  }

  const messages = await getMessages()
  const structuredData = await generateStructuredData(locale as AppLocale)

  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <AnalyticsScripts />
        <NextIntlClientProvider messages={messages}>
          <SkipLink />
          <Header />
          {children}
          <Footer />
          <StickyCTABar />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
