import type { ReactNode } from 'react'

interface Props {
  /** Accessible label for the gallery region — use the section heading. */
  ariaLabel: string
  children: ReactNode
}

// Semantic region wrapper + responsive grid for result cards.
// Centralises the grid layout so it can be adjusted in one place.
export function ResultGallery({ ariaLabel, children }: Props) {
  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
    >
      {children}
    </div>
  )
}
