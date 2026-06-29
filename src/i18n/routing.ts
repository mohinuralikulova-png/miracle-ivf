import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['uz', 'ru', 'en'] as const,
  defaultLocale: 'uz',

  // Localized section slug pathnames.
  // Each canonical key maps to the locale-specific URL segment.
  // These resolve to the same single-page layout, scrolling to the
  // corresponding section anchor. See SITEMAP.md §2.
  pathnames: {
    '/': '/',
    '/services': {
      uz: '/xizmatlar',
      ru: '/uslugi',
      en: '/services',
    },
    '/doctors': {
      uz: '/shifokorlar',
      ru: '/vrachi',
      en: '/doctors',
    },
    '/process': {
      uz: '/jarayon',
      ru: '/protsess',
      en: '/process',
    },
    '/success': {
      uz: '/muvaffaqiyat',
      ru: '/istorii',
      en: '/success',
    },
    '/faq': {
      uz: '/savol-javob',
      ru: '/voprosy',
      en: '/faq',
    },
    '/contact': {
      uz: '/aloqa',
      ru: '/kontakty',
      en: '/contact',
    },
    '/privacy': '/privacy',
    '/terms': '/terms',
  },
})

export type AppLocale = (typeof routing.locales)[number]
export type AppPathname = keyof typeof routing.pathnames
