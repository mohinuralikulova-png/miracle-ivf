'use client'

import { useEffect } from 'react'

interface Props {
  sectionId: string
}

// Scrolls to the section with the given ID after initial page paint.
// Used by [locale]/[slug]/page.tsx to honour localized URL slugs (e.g. /uz/xizmatlar → #services).
export function SectionScroll({ sectionId }: Props) {
  useEffect(() => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [sectionId])

  return null
}
