// JSON-LD structured-data generators (localized).
//
// Every visible string is sourced from the next-intl dictionaries via
// getTranslations — no copy is duplicated here. Only structural data
// (schema.org @types, geo coordinates, opening hours, cross-reference @ids)
// lives in this module, because that data is language-neutral metadata
// rather than rendered page copy.
//
// All generators are server-only (they await getTranslations) and produce
// plain objects that are serialised into <script type="application/ld+json">.

import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import { DOCTORS } from '@/lib/config/doctors'
import { SERVICES } from '@/lib/config/services'

/** A plain JSON-LD node. Loose by design — schema.org shapes are open. */
type JsonLd = Record<string, unknown>

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://miracleivf.uz'
const LOGO_URL = `${BASE_URL}/og-image.jpg`

// Stable @ids so nodes can reference each other inside the @graph.
const ORG_ID = `${BASE_URL}/#organization`
const CLINIC_ID = `${BASE_URL}/#clinic`
const WEBSITE_ID = `${BASE_URL}/#website`
const physicianId = (id: string) => `${BASE_URL}/#physician-${id}`

// FAQ keys, in render order — mirrors src/sections/FAQSection.tsx. Only the
// key list lives here; the question/answer copy is read from the dictionary.
const FAQ_KEYS = [
  'whatIsIvf',
  'whoIsItFor',
  'howLong',
  'isPainful',
  'tests',
  'successFactors',
  'regional',
  'howToBook',
] as const

// schema.org language tags per locale.
const SCHEMA_LANG: Record<Locale, string> = {
  uz: 'uz-UZ',
  ru: 'ru-RU',
  en: 'en-US',
}

// Localized city name for NAP consistency (no dictionary key exists for this).
const LOCALITY: Record<Locale, string> = {
  uz: 'Toshkent',
  ru: 'Ташкент',
  en: 'Tashkent',
}

// Tashkent, Uzbekistan — city-level coordinates for local SEO.
const GEO = { latitude: 41.2995, longitude: 69.2401 } as const

// ─── Organization ─────────────────────────────────────────────────────────────

export async function generateOrganizationSchema(locale: Locale): Promise<JsonLd> {
  const tCommon = await getTranslations({ locale, namespace: 'common' })

  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: tCommon('clinicName'),
    url: `${BASE_URL}/${locale}`,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
    },
    telephone: tCommon('phone'),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: tCommon('phone'),
      contactType: 'customer service',
      availableLanguage: ['uz', 'ru', 'en'],
    },
    sameAs: [tCommon('telegramUrl'), tCommon('whatsappUrl')],
  }
}

// ─── WebSite ──────────────────────────────────────────────────────────────────

export async function generateWebSiteSchema(locale: Locale): Promise<JsonLd> {
  const tCommon = await getTranslations({ locale, namespace: 'common' })
  const tMeta = await getTranslations({ locale, namespace: 'meta' })

  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${BASE_URL}/${locale}`,
    name: tCommon('clinicName'),
    description: tMeta('description'),
    inLanguage: SCHEMA_LANG[locale],
    publisher: { '@id': ORG_ID },
  }
}

// ─── Physician (one per doctor) ───────────────────────────────────────────────

export async function generatePhysicianSchemas(locale: Locale): Promise<JsonLd[]> {
  const t = await getTranslations({ locale, namespace: 'doctors' })

  return DOCTORS.map(({ id }) => ({
    '@type': 'Physician',
    '@id': physicianId(id),
    name: t(`${id}.name`),
    jobTitle: t(`${id}.specialty`),
    description: t(`${id}.bio`),
    knowsAbout: [t(`${id}.tag1`), t(`${id}.tag2`), t(`${id}.tag3`)],
    worksFor: { '@id': CLINIC_ID },
    memberOf: { '@id': CLINIC_ID },
  }))
}

// ─── MedicalClinic ────────────────────────────────────────────────────────────

export async function generateMedicalClinicSchema(locale: Locale): Promise<JsonLd> {
  const tCommon = await getTranslations({ locale, namespace: 'common' })
  const tMeta = await getTranslations({ locale, namespace: 'meta' })
  const tServices = await getTranslations({ locale, namespace: 'services' })
  const tTestimonials = await getTranslations({ locale, namespace: 'testimonials' })

  const availableService = SERVICES.map(({ id }) => ({
    '@type': 'MedicalProcedure',
    name: tServices(`${id}.title`),
    description: tServices(`${id}.description`),
  }))

  return {
    '@type': ['MedicalClinic', 'LocalBusiness'],
    '@id': CLINIC_ID,
    name: tCommon('clinicName'),
    description: tMeta('description'),
    url: `${BASE_URL}/${locale}`,
    telephone: tCommon('phone'),
    image: LOGO_URL,
    logo: LOGO_URL,
    inLanguage: SCHEMA_LANG[locale],
    address: {
      '@type': 'PostalAddress',
      streetAddress: tCommon('address'),
      addressLocality: LOCALITY[locale],
      addressCountry: 'UZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    hasMap: tCommon('mapsUrl'),
    areaServed: {
      '@type': 'Country',
      name: 'Uzbekistan',
    },
    medicalSpecialty: 'Gynecologic',
    // Mon–Fri 09:00–16:00, Sat 09:00–12:00 (matches contact.hours copy).
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '16:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '12:00',
      },
    ],
    availableService,
    employee: DOCTORS.map(({ id }) => ({ '@id': physicianId(id) })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tTestimonials('overallRating'),
      bestRating: '5',
      reviewCount: 200,
    },
    sameAs: [tCommon('telegramUrl'), tCommon('whatsappUrl')],
  }
}

// ─── FAQPage ──────────────────────────────────────────────────────────────────

export async function generateFAQSchema(locale: Locale): Promise<JsonLd> {
  const t = await getTranslations({ locale, namespace: 'faq' })

  return {
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/${locale}/#faq`,
    inLanguage: SCHEMA_LANG[locale],
    mainEntity: FAQ_KEYS.map((key) => ({
      '@type': 'Question',
      name: t(`${key}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`${key}.answer`),
      },
    })),
  }
}

// ─── Combined @graph ──────────────────────────────────────────────────────────

/**
 * Builds the full localized JSON-LD graph for a page: Organization, WebSite,
 * MedicalClinic, every Physician, and the FAQPage — linked via @id references.
 */
export async function generateStructuredData(locale: Locale): Promise<JsonLd> {
  const [organization, website, clinic, physicians, faq] = await Promise.all([
    generateOrganizationSchema(locale),
    generateWebSiteSchema(locale),
    generateMedicalClinicSchema(locale),
    generatePhysicianSchemas(locale),
    generateFAQSchema(locale),
  ])

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, website, clinic, ...physicians, faq],
  }
}
