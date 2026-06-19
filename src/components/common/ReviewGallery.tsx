import type { ReactNode } from 'react'

interface Props {
  ariaLabel: string
  children: ReactNode
}

export function ReviewGallery({ ariaLabel, children }: Props) {
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
