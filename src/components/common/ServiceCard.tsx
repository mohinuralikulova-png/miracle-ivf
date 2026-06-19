import {
  Microscope,
  SearchCheck,
  HeartPulse,
  Activity,
  ClipboardList,
  Dna,
  Scan,
  FlaskConical,
  Stethoscope,
  UserCheck,
  CheckCircle2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ServiceCardData, ServiceIconName } from '@/types'

// Complete map — no dynamic key lookup so TypeScript and Tailwind JIT are both happy
const ICON_MAP: Record<ServiceIconName, LucideIcon> = {
  Microscope,
  SearchCheck,
  HeartPulse,
  Activity,
  ClipboardList,
  Dna,
  Scan,
  FlaskConical,
  Stethoscope,
  UserCheck,
}

type Props = ServiceCardData

export function ServiceCard({ title, description, benefit, iconName, iconAlt }: Props) {
  const Icon = ICON_MAP[iconName]

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border/60 transition-all duration-300 hover:shadow-md hover:ring-primary/20">
      {/* Icon */}
      <div
        className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/[.07] ring-1 ring-primary/[.12] transition-colors duration-300 group-hover:bg-primary/[.12]"
        aria-hidden="true"
      >
        <Icon className="h-6 w-6 text-primary" aria-label={iconAlt} />
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col gap-3">
        <h3 className="text-base font-bold leading-snug text-primary">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>

      {/* Benefit strip */}
      <div className="mt-5 rounded-xl bg-primary/[.04] px-3.5 py-2.5 ring-1 ring-primary/[.08]">
        <span className="flex items-start gap-2 text-sm font-medium text-primary/80">
          <CheckCircle2
            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
            aria-hidden="true"
          />
          {benefit}
        </span>
      </div>
    </article>
  )
}
