import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  children: ReactNode
  id?: string
  className?: string
  /** Alternate background — use for visual rhythm between sections */
  alternate?: boolean
  as?: 'section' | 'div' | 'article'
}

// Semantic section wrapper with vertical rhythm and optional alternating background.
export function Section({ children, id, className, alternate = false, as: Tag = 'section' }: Props) {
  return (
    <Tag
      id={id}
      className={cn(
        'py-16 sm:py-20 lg:py-24',
        alternate ? 'bg-secondary/40' : 'bg-background',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
