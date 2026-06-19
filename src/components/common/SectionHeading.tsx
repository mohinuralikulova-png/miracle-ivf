import { cn } from '@/lib/utils'

interface Props {
  heading: string
  subheading?: string
  align?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const ALIGN = {
  left: 'text-left',
  center: 'text-center mx-auto',
}

const SIZE = {
  sm: 'text-2xl sm:text-3xl',
  md: 'text-3xl sm:text-4xl',
  lg: 'text-4xl sm:text-5xl',
}

export function SectionHeading({
  heading,
  subheading,
  align = 'center',
  size = 'md',
  className,
}: Props) {
  return (
    <div className={cn('max-w-3xl', ALIGN[align], className)}>
      <h2 className={cn('font-bold tracking-tight text-foreground', SIZE[size])}>{heading}</h2>
      {subheading && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{subheading}</p>}
    </div>
  )
}
