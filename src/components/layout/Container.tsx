import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ContainerTag = 'div' | 'section' | 'article' | 'aside' | 'main' | 'header' | 'footer' | 'nav'

interface Props {
  children: ReactNode
  className?: string
  as?: ContainerTag
}

// Max-width content wrapper with horizontal padding.
export function Container({ children, className, as: Tag = 'div' }: Props) {
  return (
    <Tag className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </Tag>
  )
}
