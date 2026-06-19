import Image from 'next/image'
import { BadgeCheck, MessageCircle, Camera, Play, Quote, Star } from 'lucide-react'
import type { TestimonialCardData, TestimonialType } from '@/types'

// Complete class strings — Tailwind JIT requires static strings
const BADGE_STYLES: Record<TestimonialType, { wrapper: string; dot: string; label: string }> = {
  written: {
    wrapper: 'bg-primary/[.07] ring-primary/15',
    dot: 'bg-primary',
    label: 'text-primary',
  },
  telegram: {
    wrapper: 'bg-sky-50 ring-sky-200',
    dot: 'bg-sky-500',
    label: 'text-sky-700',
  },
  screenshot: {
    wrapper: 'bg-violet-50 ring-violet-200',
    dot: 'bg-violet-500',
    label: 'text-violet-700',
  },
  video: {
    wrapper: 'bg-rose-50 ring-rose-200',
    dot: 'bg-rose-500',
    label: 'text-rose-700',
  },
}

interface StarRatingProps {
  rating: number
  ariaLabel: string
}

function StarRating({ rating, ariaLabel }: StarRatingProps) {
  return (
    <div role="img" aria-label={ariaLabel} className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted'}`}
        />
      ))}
    </div>
  )
}

type Props = TestimonialCardData

export function TestimonialCard({
  type,
  typeLabel,
  rating,
  quote,
  name,
  city,
  ageRange,
  treatment,
  mediaSrc,
  mediaBlur,
  mediaAlt,
  verifiedLabel,
  telegramSentLabel,
  ratingAriaLabel,
}: Props) {
  const badge = BADGE_STYLES[type]
  const showStars = type === 'written' || type === 'screenshot'
  const hasMediaArea = type === 'screenshot' || type === 'video'
  const isTelegram = type === 'telegram'

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border/60 transition-shadow duration-300 hover:shadow-md hover:ring-primary/20">
      {/* Type badge */}
      <div className="flex items-center gap-3 border-b border-border/40 px-5 py-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${badge.wrapper}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} aria-hidden="true" />
          <span className={badge.label}>{typeLabel}</span>
        </span>
        {showStars && (
          <div className="ml-auto">
            <StarRating rating={rating} ariaLabel={ratingAriaLabel} />
          </div>
        )}
      </div>

      {/* Media area — screenshot / video */}
      {hasMediaArea && (
        <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 px-5 py-8">
          {mediaSrc ? (
            <>
              <div className="relative h-48 w-full overflow-hidden rounded-lg shadow-sm">
                <Image
                  src={mediaSrc}
                  alt={mediaAlt}
                  fill
                  className={`object-cover ${mediaBlur ? 'blur-sm' : ''}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {mediaBlur && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm ring-1 ring-border/50">
                    {mediaAlt}
                  </span>
                </div>
              )}
            </>
          ) : type === 'video' ? (
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg ring-4 ring-white">
                <Play className="h-7 w-7 translate-x-0.5 fill-white text-white" aria-hidden="true" />
              </div>
              <span className="text-xs text-muted-foreground">{mediaAlt}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Camera className="h-10 w-10 text-slate-300" aria-hidden="true" />
              <span className="text-xs text-muted-foreground">{mediaAlt}</span>
            </div>
          )}
        </div>
      )}

      {/* Quote — Telegram bubble style */}
      {isTelegram ? (
        <div className="flex-1 px-5 py-5">
          <div className="relative rounded-2xl rounded-tl-sm bg-primary/[.06] px-4 py-3.5 ring-1 ring-primary/10">
            <MessageCircle
              className="absolute -left-1 -top-1 h-4 w-4 text-primary/30"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-foreground/80">{quote}</p>
          </div>
          <p className="mt-2 text-right text-[11px] text-muted-foreground">{telegramSentLabel}</p>
        </div>
      ) : (
        <div className="relative flex-1 px-5 py-5">
          <Quote
            className="absolute left-4 top-4 h-6 w-6 text-primary/10"
            aria-hidden="true"
          />
          <blockquote className="pl-4 text-sm leading-relaxed text-foreground/80">
            <p>{quote}</p>
          </blockquote>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-border/40 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
              {name}
              <BadgeCheck className="h-3.5 w-3.5 text-primary/60" aria-hidden="true" />
            </span>
            <span className="text-xs text-muted-foreground">
              {city}
              {ageRange ? ` · ${ageRange}` : ''}
            </span>
          </div>
          <span className="rounded-full bg-accent/30 px-2.5 py-1 text-[11px] font-medium text-primary ring-1 ring-accent/50">
            {treatment}
          </span>
        </div>
        {(type === 'written' || isTelegram) && (
          <p className="mt-2 text-[11px] text-muted-foreground/70">{verifiedLabel}</p>
        )}
      </div>
    </article>
  )
}
