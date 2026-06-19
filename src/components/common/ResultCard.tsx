import Image from 'next/image'
import { CheckCircle2, Heart, MessageCircle, Lock, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ResultCardData, ResultType } from '@/types'

interface TypeStyle {
  badgeClass: string
  gradientClass: string
  Icon: LucideIcon
  iconClass: string
}

// Complete Tailwind class strings — no dynamic construction so JIT picks them up correctly.
const TYPE_STYLES: Record<ResultType, TypeStyle> = {
  hcg: {
    badgeClass: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    gradientClass: 'from-emerald-50 to-emerald-100/40',
    Icon: CheckCircle2,
    iconClass: 'h-14 w-14 text-emerald-300',
  },
  ivf: {
    badgeClass: 'bg-primary/10 text-primary ring-1 ring-primary/20',
    gradientClass: 'from-primary/[.07] to-primary/[.03]',
    Icon: Heart,
    iconClass: 'h-14 w-14 text-primary/25',
  },
  family: {
    badgeClass: 'bg-pink-50 text-pink-700 ring-1 ring-pink-200',
    gradientClass: 'from-rose-50 to-accent/15',
    Icon: Heart,
    iconClass: 'h-14 w-14 text-rose-300',
  },
  gratitude: {
    badgeClass: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    gradientClass: '',
    Icon: MessageCircle,
    iconClass: '',
  },
}

export function ResultCard({
  type,
  typeLabel,
  identifier,
  outcome,
  date,
  mediaAlt,
  mediaSrc,
  mediaBlur,
  quote,
  successLabel,
  blurNotice,
}: ResultCardData) {
  const { badgeClass, gradientClass, Icon, iconClass } = TYPE_STYLES[type]
  const isGratitude = type === 'gratitude'

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border/60 transition-shadow duration-300 hover:shadow-md hover:ring-primary/20">
      {/* Header: type badge + success indicator */}
      <div className="flex items-center justify-between gap-2 px-5 pt-5">
        <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', badgeClass)}>
          {typeLabel}
        </span>
        {!isGratitude && (
          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
            {successLabel}
          </span>
        )}
      </div>

      {/* Gratitude: decorative quote + blockquote text */}
      {isGratitude ? (
        <div className="flex flex-1 flex-col justify-center px-6 py-5">
          <span
            className="mb-3 block font-serif text-6xl leading-none text-primary/15"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <blockquote className="text-sm italic leading-relaxed text-foreground/80">
            {quote}
          </blockquote>
        </div>
      ) : (
        /* Media: image or type-specific placeholder */
        <div className="relative mx-5 mt-4 aspect-[4/3] overflow-hidden rounded-xl">
          {mediaSrc ? (
            <>
              <Image
                src={mediaSrc}
                alt={mediaAlt}
                fill
                className={cn('object-cover', mediaBlur && 'scale-110 blur-md')}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Extra frosted overlay when blurred — reinforces privacy without being opaque */}
              {mediaBlur && (
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
              )}
            </>
          ) : (
            <div
              className={cn(
                'flex h-full w-full items-center justify-center bg-gradient-to-br',
                gradientClass,
              )}
              aria-hidden="true"
            >
              <Icon className={iconClass} />
            </div>
          )}
        </div>
      )}

      {/* Footer: identifier, outcome, date, optional blur notice */}
      <div className="p-5 pt-4">
        <p className="text-sm font-semibold text-foreground">{identifier}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{outcome}</p>
        <p className="mt-2 text-xs font-medium text-primary/50">{date}</p>
        {/* Privacy notice — only shown when an actual image is blurred */}
        {mediaBlur && mediaSrc && (
          <p className="mt-2.5 flex items-center gap-1 text-xs text-muted-foreground/60">
            <Lock className="h-3 w-3 shrink-0" aria-hidden="true" />
            {blurNotice}
          </p>
        )}
      </div>
    </article>
  )
}
