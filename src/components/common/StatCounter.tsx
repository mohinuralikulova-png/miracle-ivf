'use client'

import { useEffect, useRef, useState } from 'react'
import { Trophy, Heart, Clock, Globe, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type StatIconKey = 'trophy' | 'heart' | 'clock' | 'globe'

const ICONS: Record<StatIconKey, LucideIcon> = {
  trophy: Trophy,
  heart: Heart,
  clock: Clock,
  globe: Globe,
}

interface Props {
  /** Raw number to count up to (e.g. 65, 10000). */
  numericValue: number
  /** Appended during animation (e.g. '%', '+'). */
  suffix: string
  /** Pre-formatted translation string shown once animation completes (e.g. '10 000+'). */
  displayValue: string
  label: string
  iconKey: StatIconKey
  /** Full static text read by screen readers — animation is decorative. */
  ariaLabel: string
  /** Total animation duration in ms. */
  duration?: number
  className?: string
}

/** Formats a raw number with a space as thousands separator (matches UZ/RU locale style). */
function formatCount(n: number): string {
  if (n >= 1000) {
    const thousands = Math.floor(n / 1000)
    const remainder = n % 1000
    return `${thousands} ${String(remainder).padStart(3, '0')}`
  }
  return String(n)
}

export function StatCounter({
  numericValue,
  suffix,
  displayValue,
  label,
  iconKey,
  ariaLabel,
  duration = 1600,
  className,
}: Props) {
  const [count, setCount] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        observer.disconnect()

        if (prefersReducedMotion) {
          setCount(numericValue)
          setIsDone(true)
          return
        }

        const startTime = performance.now()

        function animate(now: number) {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          // Cubic ease-out — fast start, smooth finish
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(eased * numericValue))
          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            setIsDone(true)
          }
        }

        requestAnimationFrame(animate)
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [numericValue, duration])

  const Icon = ICONS[iconKey]
  const visualValue = isDone ? displayValue : `${formatCount(count)}${suffix}`

  return (
    <div
      ref={ref}
      className={cn('flex flex-col items-center gap-4 p-6 text-center', className)}
    >
      {/* Screen-reader text — static, no animation */}
      <span className="sr-only">{ariaLabel}</span>

      {/* Visual content — hidden from AT because sr-only span covers it */}
      <div aria-hidden="true" className="flex flex-col items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        <div>
          <p className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{visualValue}</p>
          <p className="mt-1.5 text-sm font-medium leading-snug text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  )
}
