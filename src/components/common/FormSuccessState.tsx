'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle2, ShieldCheck } from 'lucide-react'

interface Props {
  heading: string
  body: string
  reassurance: string
}

// Confirmation shown after a lead is successfully captured. Replaces the form.
// role="status" + aria-live announces it; focus moves to the heading so
// keyboard and screen-reader users land on the confirmation.
export function FormSuccessState({ heading, body, reassurance }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-border/60 lg:p-12"
    >
      <span className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-100">
        <CheckCircle2 className="h-8 w-8 text-emerald-500" aria-hidden="true" />
      </span>

      <h3
        ref={headingRef}
        tabIndex={-1}
        className="text-xl font-bold text-primary focus-visible:outline-none"
      >
        {heading}
      </h3>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{body}</p>

      <p className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary/[.06] px-4 py-1.5 text-sm font-medium text-primary">
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        {reassurance}
      </p>
    </div>
  )
}
