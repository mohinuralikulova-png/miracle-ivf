import { cn } from '@/lib/utils'
import type { ProcessStepData } from '@/types'

type Props = ProcessStepData

export function ProcessStepCard({ title, description, isLast }: Props) {
  return (
    <article
      className={cn(
        'rounded-2xl bg-white p-5 shadow-sm ring-1 transition-shadow duration-300 hover:shadow-md lg:p-6',
        isLast
          ? 'bg-gradient-to-br from-accent/10 to-white ring-accent/40'
          : 'ring-border/60 hover:ring-primary/20',
      )}
    >
      <h3
        className={cn(
          'text-base font-bold leading-snug',
          isLast ? 'text-primary' : 'text-primary',
        )}
      >
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </article>
  )
}
