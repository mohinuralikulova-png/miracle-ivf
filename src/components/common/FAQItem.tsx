'use client'

import { useState, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FAQItemData } from '@/types'

type Props = FAQItemData

export function FAQItem({ question, answer }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const headingId = useId()
  const panelId = useId()

  return (
    <div className="border-b border-border/50 last:border-0">
      <h3>
        <button
          id={headingId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors duration-150 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1 focus-visible:rounded"
        >
          <span className="text-base font-semibold leading-snug text-primary">
            {question}
          </span>
          <ChevronDown
            className={cn(
              'mt-0.5 h-5 w-5 shrink-0 text-primary/50 transition-transform duration-300 motion-reduce:transition-none',
              isOpen && 'rotate-180',
            )}
            aria-hidden="true"
          />
        </button>
      </h3>

      {/* CSS grid trick for smooth height animation without fixed max-height */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pr-9 text-sm leading-relaxed text-muted-foreground">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}
