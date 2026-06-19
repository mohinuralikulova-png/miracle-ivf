'use client'

import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'

interface Props {
  label: string
  /** Scroll to this element ID on click. Mutually exclusive with href. */
  targetId?: string
  /** Navigate to this URL. Use for tel:, mailto:, or external links. */
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  /** Sent with the `cta_click` analytics event. */
  analyticsLocation: string
  className?: string
}

const VARIANT = {
  primary:
    'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/80',
  secondary:
    'bg-accent text-accent-foreground hover:bg-accent/80 active:bg-accent/70',
  outline:
    'border-2 border-primary text-primary hover:bg-primary/5 active:bg-primary/10',
}

const SIZE = {
  sm: 'min-h-[36px] rounded-lg px-4 py-1.5 text-sm',
  md: 'min-h-[40px] rounded-xl px-5 py-2 text-sm',
  lg: 'min-h-[48px] rounded-xl px-7 py-3 text-base',
}

export function CTAButton({
  label,
  targetId,
  href,
  variant = 'primary',
  size = 'lg',
  analyticsLocation,
  className,
}: Props) {
  const baseClasses = cn(
    'inline-flex items-center justify-center font-semibold transition-all',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    VARIANT[variant],
    SIZE[size],
    className,
  )

  function handleClick() {
    trackEvent('cta_click', { location: analyticsLocation })
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (href) {
    return (
      <a href={href} onClick={handleClick} className={baseClasses}>
        {label}
      </a>
    )
  }

  return (
    <button type="button" onClick={handleClick} className={baseClasses}>
      {label}
    </button>
  )
}
