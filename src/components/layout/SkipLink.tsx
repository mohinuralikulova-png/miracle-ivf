import { getTranslations } from 'next-intl/server'

export async function SkipLink() {
  const t = await getTranslations('a11y')

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-md"
    >
      {t('skipToContent')}
    </a>
  )
}
