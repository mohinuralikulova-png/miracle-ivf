import Image from 'next/image'
import { MapPin, Clock, User2 } from 'lucide-react'
import { CTAButton } from '@/components/common/CTAButton'
import type { DoctorCardData } from '@/types'

export function DoctorCard({
  name,
  specialty,
  country,
  experience,
  bio,
  tags,
  consultationCta,
  photoSrc,
  photoAlt,
  analyticsLocation,
}: DoctorCardData) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border/60 transition-shadow duration-300 hover:shadow-md hover:ring-primary/20">
      {/* Photo / placeholder */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-primary/[.07] to-accent/[.12]">
        {photoSrc ? (
          <Image
            src={photoSrc}
            alt={photoAlt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
            <User2 className="h-28 w-28 text-primary/20" />
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Name + specialty */}
        <div>
          <h3 className="text-xl font-bold text-primary">{name}</h3>
          <p className="mt-0.5 text-sm font-medium text-muted-foreground">{specialty}</p>
        </div>

        {/* Country + experience */}
        <div className="flex flex-wrap gap-x-5 gap-y-1.5">
          <span className="flex items-center gap-1.5 text-sm text-foreground/70">
            <MapPin className="h-4 w-4 shrink-0 text-primary/50" aria-hidden="true" />
            {country}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-foreground/70">
            <Clock className="h-4 w-4 shrink-0 text-primary/50" aria-hidden="true" />
            {experience}
          </span>
        </div>

        {/* Bio */}
        <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">{bio}</p>

        {/* Expertise tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/[.07] px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/15"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Per-card CTA — outline to keep visual hierarchy below the section CTA */}
        <div className="mt-auto pt-2">
          <CTAButton
            label={consultationCta}
            targetId="contact"
            analyticsLocation={analyticsLocation}
            variant="outline"
            size="md"
            className="w-full"
          />
        </div>
      </div>
    </article>
  )
}
