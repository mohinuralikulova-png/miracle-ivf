import { getTranslations } from 'next-intl/server'
import { CheckCircle2, Phone } from 'lucide-react'
import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { CTAButton } from '@/components/common/CTAButton'

// Hero image is a Phase 2 content gap — see CONTENT_GAPS.md.
// When /public/images/hero.jpg is available, the gradient placeholder is replaced automatically.
const HERO_IMAGE_SRC = '/images/hero.jpg'
const HAS_HERO_IMAGE = false // flip to true once the image file is committed

export async function Hero() {
  const t = await getTranslations('hero')
  const tCommon = await getTranslations('common')

  const trustItems = [t('trust1'), t('trust2'), t('trust3')]

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-primary/[.06] via-background to-accent/[.09]"
      aria-label={t('heading')}
    >
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/[.04] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-accent/[.06] blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-[55%_45%] lg:gap-16 lg:py-24 xl:py-28">
          {/* ── Text column ──────────────────────────────────────── */}
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-primary sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
              {t('heading')}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {t('subheading')}
            </p>

            {/* Trust micro-strip */}
            <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              {trustItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA row */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <CTAButton
                label={t('ctaPrimary')}
                targetId="contact"
                analyticsLocation="hero_primary"
                size="lg"
              />
              {/* Secondary CTA — phone link. PhoneLink component + call_click analytics added in Phase 4. */}
              <a
                href={`tel:${tCommon('phone').replace(/\s/g, '')}`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-primary px-7 py-3 text-base font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:bg-primary/10"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {t('ctaSecondary')}
              </a>
            </div>
          </div>

          {/* ── Image column ─────────────────────────────────────── */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl lg:aspect-[3/4] lg:rounded-[2rem] lg:shadow-2xl">
              {HAS_HERO_IMAGE ? (
                <Image
                  src={HERO_IMAGE_SRC}
                  alt={t('imageAlt')}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              ) : (
                // Gradient placeholder — replace with next/image once hero.jpg is committed
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-accent/30 to-primary/20" />
                  <div
                    aria-hidden="true"
                    className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-accent/25 blur-3xl"
                  />
                  {/* Soft decorative ring */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="h-48 w-48 rounded-full border-4 border-white/20 bg-white/10 backdrop-blur-sm" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
