# COMPONENT_INVENTORY.md — Miracle IVF Landing Page

> Complete inventory of all reusable components. Covers purpose, typed props interface, states, and responsive behavior.
> Components follow the folder structure defined in CLAUDE.md: `components/ui/`, `components/layout/`, `components/common/`, `sections/`.
>
> **This document is the design spec (intended props/states/behavior).** For what is actually built, see *Implementation Status* immediately below.

---

## Implementation Status — as of 2026-06-17

**Legend:** ✅ Built · 🟡 Placeholder / minimal · ⬜ Not yet built

> Some spec names were realized under clearer file names during the build (noted in the "Actual file" column). The provider/architecture names follow CLAUDE.md §14.

### UI primitives (`components/ui/`)
⬜ **shadcn/ui primitives were not installed.** Button/Card/Input/Textarea/Select/Label/Badge/Accordion styling is hand-built and themed directly inside the feature components using Tailwind tokens. Same visual + a11y spec, no Radix/shadcn dependency.

### Layout (`components/layout/`)
| Spec | Actual file | Status |
|---|---|---|
| Container | `Container.tsx` | ✅ Built |
| Section | `Section.tsx` | ✅ Built |
| SkipLink | `SkipLink.tsx` | ✅ Built |
| Header | `Header.tsx` | 🟡 Placeholder (no nav links / language switcher yet) |
| Footer | `Footer.tsx` | 🟡 Placeholder (clinic name + copyright only; 4-column pending) |
| StickyCTABar | `StickyCTABar.tsx` | 🟡 Placeholder (basic; scroll-aware hide pending) |

### Common (`components/common/`)
| Spec | Actual file | Status |
|---|---|---|
| CTAButton | `CTAButton.tsx` | ✅ Built |
| SectionHeading | `SectionHeading.tsx` | ✅ Built |
| StatCounter | `StatCounter.tsx` | ✅ Built |
| ServiceCard | `ServiceCard.tsx` | ✅ Built |
| DoctorCard | `DoctorCard.tsx` | ✅ Built |
| ProcessStep | `ProcessStepCard.tsx` | ✅ Built (renamed) |
| StoryCard | `ResultCard.tsx` (+ `ResultGallery.tsx`) | ✅ Built (renamed) |
| TestimonialCard | `TestimonialCard.tsx` (+ `ReviewGallery.tsx`) | ✅ Built |
| FaqAccordion | `FAQItem.tsx` | ✅ Built (accordion item pattern) |
| ContactForm | `BookingForm.tsx` | ✅ Built (renamed) |
| FormField | `FormField.tsx` | ✅ Built (render-prop) |
| — | `FormSuccessState.tsx`, `FormErrorState.tsx` | ✅ Built (new; form states) |
| — | `SectionScroll.tsx` | ✅ Built (new; smooth-scroll helper) |
| PhoneLink | inline `tel:` link in `ContactSection` | ⬜ Not extracted |
| MessagingLink | inline links in `ContactSection` | ⬜ Not extracted |
| LanguageSwitcher | — | ⬜ Not built |
| MapEmbed | static placeholder in `ContactSection` | ⬜ Not built (placeholder only) |

### Sections (`sections/`)
| Spec | Actual file | Status |
|---|---|---|
| Hero | `Hero.tsx` | ✅ Built |
| TrustStats | `TrustStats.tsx` | ✅ Built |
| ProblemSolution | `ProblemSolution.tsx` | ✅ Built |
| Services | `ServicesSection.tsx` | ✅ Built |
| Doctors | `Doctors.tsx` | ✅ Built |
| Process | `IVFProcessSection.tsx` | ✅ Built |
| SuccessStories | `SuccessResults.tsx` | ✅ Built |
| Testimonials | `TestimonialsSection.tsx` | ✅ Built |
| Faq | `FAQSection.tsx` | ✅ Built |
| ContactCta | `ContactSection.tsx` | ✅ Built |
| Footer | `components/layout/Footer.tsx` | 🟡 Placeholder |

### Lead pipeline (`lib/leads/`, not in original spec)
✅ `LeadService` → `SupabaseLeadStorageProvider` → `TelegramLeadNotificationProvider`, plus server-only `lib/supabase.ts` and the `leads` migration. Operational; see PLAN.md Phase 5 and CLAUDE.md §14.

---

## Component Map

```
components/
├── ui/                         shadcn/ui primitives (themed)
│   ├── Button
│   ├── Card / CardHeader / CardContent / CardFooter
│   ├── Input
│   ├── Textarea
│   ├── Select / SelectItem
│   ├── Label
│   ├── Badge
│   └── Accordion / AccordionItem / AccordionTrigger / AccordionContent
│
├── layout/                     Structural layout components
│   ├── Header
│   ├── Footer
│   ├── Container
│   ├── Section
│   ├── StickyCTABar
│   └── SkipLink
│
└── common/                     Reusable feature components
    ├── CTAButton
    ├── StatCounter
    ├── SectionHeading
    ├── ServiceCard
    ├── DoctorCard
    ├── ProcessStep
    ├── StoryCard
    ├── TestimonialCard
    ├── FaqAccordion
    ├── ContactForm
    ├── FormField
    ├── PhoneLink
    ├── MessagingLink
    ├── LanguageSwitcher
    └── MapEmbed

sections/                       Full page sections (orchestrate primitives + common)
    ├── Hero
    ├── TrustStats
    ├── ProblemSolution
    ├── Services
    ├── Doctors
    ├── Process
    ├── SuccessStories
    ├── Testimonials
    ├── Faq
    ├── ContactCta
    └── (Footer is in components/layout/)
```

---

## Part 1 — UI Primitives (shadcn/ui, themed)

### 1.1 Button

**Purpose:** Themed, accessible button primitive. Supports all CTA variants across the page.

**Props:**
```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost' | 'outline' | 'link'
  size: 'sm' | 'md' | 'lg' | 'icon'
  isLoading?: boolean
  loadingText?: string
  asChild?: boolean          // renders as child element (Radix slot)
}
```

**States:**
- `default` — brand colors per variant
- `hover` — subtle lift/darken
- `focus-visible` — 2px ring, offset, WCAG AA visible
- `disabled` — reduced opacity, `cursor-not-allowed`, aria-disabled
- `loading` — spinner + `loadingText`, pointer-events disabled

**Responsive Behavior:**
- Min tap target 44×44px on mobile (padding enforced)
- Full-width option via `w-full` utility on mobile CTAs
- `lg` size used for hero and section CTAs; `sm` for inline links

**Variants:**
- `primary` — bg-primary, text-white (deep brand blue `#163C8C`)
- `secondary` — bg-accent, text-primary (soft pink `#F4B6C2`)
- `outline` — border-primary, text-primary, transparent bg
- `ghost` — transparent, text-primary, hover bg-primary/10
- `link` — no bg/border, text-primary with underline

---

### 1.2 Card / CardHeader / CardContent / CardFooter

**Purpose:** Rounded, elevated container used by ServiceCard, DoctorCard, StoryCard, TestimonialCard.

**Props:**
```ts
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'flat'
}
```

**States:**
- `default` — white bg, `shadow-sm`, `rounded-2xl`
- `elevated` — `shadow-md` on hover, smooth transition
- `flat` — no shadow, border only

**Responsive Behavior:**
- Full-width on mobile, fixed width in grid on tablet+
- `rounded-2xl` maintained at all breakpoints

---

### 1.3 Input

**Purpose:** Themed form input, used inside ContactForm / FormField.

**Props:**
```ts
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}
```

**States:**
- `default` — border-muted, bg-white
- `focus` — border-primary, ring-2 ring-primary/20
- `error` — border-destructive, ring-2 ring-destructive/20, aria-invalid="true"
- `disabled` — bg-muted, cursor-not-allowed

---

### 1.4 Textarea

**Purpose:** Multi-line message field in ContactForm.

**Props:**
```ts
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
  rows?: number             // default: 4
}
```

**States:** Same as Input.

**Responsive Behavior:** Resizable vertically only (`resize-y`), max-height capped to prevent layout break.

---

### 1.5 Select / SelectItem

**Purpose:** Service interest dropdown in ContactForm.

**Props:**
```ts
interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  hasError?: boolean
  children: React.ReactNode
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
}
```

**States:** Default, open (dropdown visible), selected, error, disabled.

**Responsive Behavior:** Full-width on mobile, max-width on desktop.

---

### 1.6 Label

**Purpose:** Accessible field label, always paired with an input.

**Props:**
```ts
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean          // appends visually hidden "(required)" + asterisk
}
```

---

### 1.7 Badge

**Purpose:** Small metadata chips on DoctorCard (specialty, certification, country).

**Props:**
```ts
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: 'default' | 'primary' | 'accent' | 'muted' | 'success'
}
```

---

### 1.8 Accordion / AccordionItem / AccordionTrigger / AccordionContent

**Purpose:** FAQ accordion. Accessible keyboard navigation, correct ARIA expanded state.

**Props:**
```ts
interface AccordionProps {
  type: 'single' | 'multiple'
  collapsible?: boolean
  defaultValue?: string
  children: React.ReactNode
}

interface AccordionItemProps {
  value: string
  children: React.ReactNode
}

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}
```

**States:**
- `closed` — content hidden, chevron points down, aria-expanded="false"
- `open` — content visible, chevron points up, aria-expanded="true"

**Keyboard:** `Enter`/`Space` to toggle, `Tab` to move between triggers.

---

## Part 2 — Layout Components

### 2.1 Header

**Purpose:** Site-wide sticky header containing logo, primary navigation, language switcher, phone number, and primary CTA button.

**Props:**
```ts
interface HeaderProps {
  locale: 'uz' | 'ru' | 'en'
}
```

**States:**
- `transparent` — at scroll top (y === 0), no background
- `solid` — on scroll (y > 0), white/blur bg + border-b shadow
- `mobileOpen` — mobile menu drawer open
- `mobileClosed` — default on mobile

**Responsive Behavior:**
- **Desktop (≥1024px):** Full horizontal nav bar — logo, nav links, phone, language switcher, CTA button
- **Tablet (768–1023px):** Logo + hamburger; nav in drawer
- **Mobile (<768px):** Logo + hamburger + language switcher badge; nav in full-screen drawer

**Sticky:** `position: sticky; top: 0; z-index: 50`

**Accessibility:**
- `<header>` landmark
- `role="navigation"` on `<nav>`, `aria-label="Main navigation"`
- Mobile menu: `aria-expanded`, `aria-controls`, `aria-label="Menu"` on hamburger button
- Focus trapped in mobile drawer when open; `Escape` closes

---

### 2.2 Footer

**Purpose:** Site-wide footer with NAP, navigation, hours, social links, language switcher, and legal links.

**Props:**
```ts
interface FooterProps {
  locale: 'uz' | 'ru' | 'en'
}
```

**States:** Static (no interactive states beyond link hover).

**Responsive Behavior:**
- **Desktop (≥1024px):** 4-column grid — logo+NAP, nav links, hours, social/contact
- **Tablet (768–1023px):** 2-column grid
- **Mobile (<768px):** Single column, stacked; collapse-friendly

---

### 2.3 Container

**Purpose:** Max-width wrapper with horizontal padding. Ensures consistent content width across all sections.

**Props:**
```ts
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'  // default: 'xl'
  as?: React.ElementType                         // default: 'div'
}
```

**Size map:**
- `sm` — max-w-2xl
- `md` — max-w-4xl
- `lg` — max-w-5xl
- `xl` — max-w-7xl (default)
- `full` — max-w-none

**Responsive Behavior:** `px-4 sm:px-6 lg:px-8`, centered with `mx-auto`.

---

### 2.4 Section

**Purpose:** Semantic `<section>` wrapper with consistent vertical padding and optional background variant.

**Props:**
```ts
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string                  // anchor ID for smooth-scroll nav
  background?: 'white' | 'muted' | 'primary' | 'accent-soft'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  as?: React.ElementType       // default: 'section'
}
```

**Responsive Behavior:** `py-16 md:py-24 lg:py-32` for standard sections; reduced on mobile.

---

### 2.5 StickyCTABar

**Purpose:** Fixed bottom bar on mobile only, providing persistent access to Call and Book CTAs without scrolling.

**Props:**
```ts
interface StickyCTABarProps {
  phone: string
  onBookClick: () => void
  locale: 'uz' | 'ru' | 'en'
  isContactVisible: boolean   // hides bar when #contact section is in viewport
}
```

**States:**
- `visible` — shown on mobile when contact form is not in viewport
- `hidden` — when `isContactVisible === true` or on desktop

**Responsive Behavior:**
- `block md:hidden` — invisible on tablet and desktop
- `fixed bottom-0 inset-x-0 z-50`
- Safe area inset respected (`pb-safe`) for iOS notched devices

---

### 2.6 SkipLink

**Purpose:** Accessibility skip navigation link — appears on first Tab keypress, jumps to `#main-content`.

**Props:**
```ts
interface SkipLinkProps {
  targetId?: string    // default: 'main-content'
  label: string        // translated via a11y.skipToContent
}
```

**States:** Visually hidden by default (`sr-only`); visible on `:focus` (absolute, top-0, left-0, styled).

---

## Part 3 — Common Components

### 3.1 CTAButton

**Purpose:** Standardised CTA button wrapper that automatically fires the `cta_click` analytics event and handles scroll-to-section.

**Props:**
```ts
interface CTAButtonProps {
  label: string
  targetId?: string            // section ID to scroll to (e.g. 'contact')
  href?: string                // external/tel: link
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  analyticsLocation: string    // e.g. 'hero', 'doctors', 'sticky_bar'
  className?: string
}
```

**States:** Inherits Button states (default, hover, focus, disabled).

**Behavior:** `onClick` fires `cta_click` event with `{ location: analyticsLocation }` then smooth-scrolls to `targetId` or navigates to `href`.

---

### 3.2 StatCounter

**Purpose:** Animated counter that counts up from 0 to `value` when the element enters the viewport (Intersection Observer). Used in TrustStats.

**Props:**
```ts
interface StatCounterProps {
  value: number
  suffix?: string        // e.g. '%', '+'
  label: string
  icon: LucideIcon
  duration?: number      // animation duration ms, default 1500
  ariaLabel?: string     // full text for screen readers
}
```

**States:**
- `idle` — shows 0 before viewport entry
- `animating` — counting up
- `done` — shows final value

**Accessibility:** `aria-label` provides the full static value for screen readers so animation is decorative. Respects `prefers-reduced-motion` (skips animation, shows final value immediately).

**Responsive Behavior:** Grid cell in parent — 2×2 on mobile, 4×1 on tablet+.

---

### 3.3 SectionHeading

**Purpose:** Consistent H2 (and optional subheading) pattern shared across all sections.

**Props:**
```ts
interface SectionHeadingProps {
  heading: string
  subheading?: string
  align?: 'left' | 'center'    // default: 'center'
  size?: 'sm' | 'md' | 'lg'   // default: 'md'
  className?: string
}
```

**Responsive Behavior:** Fluid font scale. Alignment may shift left on mobile for readability.

---

### 3.4 ServiceCard

**Purpose:** Card displaying a single service offering (IVF, ICSI, IUI, etc.).

**Props:**
```ts
interface ServiceCardProps {
  icon: LucideIcon
  iconAlt: string
  title: string
  description: string
  learnMoreLabel?: string
  learnMoreHref?: string
  className?: string
}
```

**States:**
- `default` — white card, soft shadow
- `hover` — elevated shadow, icon color shift, subtle scale (respects `prefers-reduced-motion`)

**Responsive Behavior:**
- Mobile: full-width single column card
- Tablet (≥640px): 2-column grid
- Desktop (≥1024px): 3-column grid

---

### 3.5 DoctorCard

**Purpose:** Card presenting an individual doctor's photo, name, specialty, credentials, training country, and years of experience.

**Props:**
```ts
interface DoctorCardProps {
  photo: string               // src path for next/image
  photoAlt: string
  name: string
  specialty: string
  credentials: string[]       // e.g. ['PhD', 'Certified Reproductive Endocrinologist']
  trainingCountry?: string    // e.g. 'Germany'
  trainingFlag?: string       // emoji or image
  yearsOfExperience: number
  yearsLabel: string          // translated 'years of experience'
  certBadgeLabel: string
  className?: string
}
```

**States:**
- `default` — card with soft shadow, circular photo
- `hover` — slight shadow lift (animation respects `prefers-reduced-motion`)

**Responsive Behavior:**
- Mobile: horizontal scroll carousel (1 card visible, snap)
- Tablet (≥768px): 2-column grid
- Desktop (≥1024px): 3–4 column grid

**Image:** `next/image`, `object-cover`, `rounded-full`, fixed dimensions.

---

### 3.6 ProcessStep

**Purpose:** A single step in the IVF Process timeline — numbered badge, icon, title, description.

**Props:**
```ts
interface ProcessStepProps {
  stepNumber: string          // '01', '02', etc.
  icon: LucideIcon
  title: string
  description: string
  isLast?: boolean            // hides connector line after last step
  className?: string
}
```

**States:** Static; no interactive states.

**Responsive Behavior:**
- Mobile: vertical stack, left-aligned number + icon, connector line
- Desktop (≥1024px): 2-column alternating layout or horizontal timeline

---

### 3.7 StoryCard

**Purpose:** A patient success story card — narrative quote, patient identifier, outcome, optional photo.

**Props:**
```ts
interface StoryCardProps {
  quote: string
  patientId: string           // initials or first name only (privacy)
  city?: string
  outcome: string             // e.g. 'Egizaklar, 2024'
  photo?: string              // optional, requires consent
  photoAlt?: string
  outcomeLabel: string
  privacyNote: string
  className?: string
}
```

**States:** Static.

**Responsive Behavior:**
- Mobile: full-width stacked
- Desktop (≥1024px): 2-column grid

---

### 3.8 TestimonialCard

**Purpose:** A short patient quote with optional avatar, name, and star rating.

**Props:**
```ts
interface TestimonialCardProps {
  quote: string
  patientId: string            // initials or anonymised name
  rating?: 1 | 2 | 3 | 4 | 5  // default: 5
  avatar?: string              // optional photo
  avatarAlt?: string
  verified?: boolean
  verifiedLabel?: string
  starsLabel: string           // translated '{count} stars out of 5'
  className?: string
}
```

**States:** Static (no hover interaction on quote cards).

**Responsive Behavior:**
- Mobile: single-card carousel (horizontal swipe, touch-friendly)
- Tablet (≥768px): 2-column grid
- Desktop (≥1024px): 3-column grid

---

### 3.9 FaqAccordion

**Purpose:** Accessible accordion wrapping all FAQ Q&A pairs. Orchestrates the `Accordion` primitive with translated items.

**Props:**
```ts
interface FaqItem {
  id: string
  question: string
  answer: string
}

interface FaqAccordionProps {
  items: FaqItem[]
  defaultOpen?: string         // id of item open by default
  openLabel: string            // sr-only: 'Expand'
  closeLabel: string           // sr-only: 'Collapse'
}
```

**States:**
- Any item: `open` (content visible, chevron up) / `closed` (content hidden, chevron down)
- One item open at a time (`type="single"`)

**Keyboard:** `Tab` between triggers, `Enter`/`Space` to toggle, `Home`/`End` to jump.

**Responsive Behavior:** Full-width single column at all breakpoints.

---

### 3.10 ContactForm

**Purpose:** The primary conversion form. Submits via Next.js Server Action, validates with Zod (client + server), handles all states.

**Props:**
```ts
interface ContactFormProps {
  locale: 'uz' | 'ru' | 'en'
  sourcePage: string           // auto-injected: current URL
  serviceOptions: { value: string; label: string }[]
}
```

**States:**
- `idle` — default form, all fields enabled
- `submitting` — all fields + button disabled, spinner visible, button shows `form.submitting`
- `success` — form replaced with success message (heading + body + reassurance)
- `error` — error banner shown above form, fields re-enabled, retry possible
- `validation_error` — inline field errors, first error field receives focus

**Accessibility:**
- All fields have `<Label>` via `htmlFor`
- Error messages linked via `aria-describedby`
- `aria-invalid="true"` on fields with errors
- On validation error, focus moves to first invalid field
- Honeypot field: `aria-hidden="true"`, `tabIndex={-1}`, visually hidden
- Success heading receives focus after successful submission

**Responsive Behavior:**
- Single column at all breakpoints
- Full-width inputs/button on mobile
- Max-width container on desktop

**Security:**
- Honeypot field (hidden, auto-filled by bots)
- Rate limiting enforced server-side in Server Action
- All inputs sanitized before `LeadService.submit()`

---

### 3.11 FormField

**Purpose:** Reusable compound component — `<Label>` + `<Input>`/`<Textarea>`/`<Select>` + inline error message. Eliminates repetition in ContactForm.

**Props:**
```ts
interface FormFieldProps {
  id: string
  name: string
  label: string
  required?: boolean
  error?: string              // translated error message (from Zod)
  hint?: string               // optional helper text below field
  children: React.ReactElement // the Input/Textarea/Select
}
```

**States:**
- `default` — label above, field, optional hint
- `error` — error message below field in destructive color, `aria-describedby` wired

---

### 3.12 PhoneLink

**Purpose:** Accessible, analytics-instrumented `tel:` link that fires `call_click` event.

**Props:**
```ts
interface PhoneLinkProps {
  phone: string                // e.g. '+998901234567'
  displayPhone?: string        // formatted display, e.g. '+998 90 123-45-67'
  label?: string               // optional text beside number
  showIcon?: boolean           // default: true
  className?: string
}
```

**States:** Default, hover, focus-visible.

**Behavior:** `onClick` fires `call_click` analytics event before following `tel:` link.

---

### 3.13 MessagingLink

**Purpose:** WhatsApp or Telegram deep-link with analytics event. Used in ContactCta and Footer.

**Props:**
```ts
interface MessagingLinkProps {
  platform: 'whatsapp' | 'telegram'
  href: string                 // pre-built deep-link URL
  label: string                // translated label
  showIcon?: boolean
  className?: string
}
```

**States:** Default, hover, focus-visible.

**Behavior:** Opens in new tab (`target="_blank" rel="noopener noreferrer"`), fires `messaging_click` with `{ platform }`.

---

### 3.14 LanguageSwitcher

**Purpose:** Locale switching control, used in both Header and Footer. Preserves current section path across locales.

**Props:**
```ts
interface LanguageSwitcherProps {
  currentLocale: 'uz' | 'ru' | 'en'
  currentPathname: string      // e.g. '/uz/xizmatlar' → switches to '/ru/uslugi'
  compact?: boolean            // 'UZ' badge vs full label
}
```

**States:**
- `default` — shows current locale as active, others as links
- `hover` (each link) — underline / bg highlight

**Behavior:**
- Uses `next-intl` locale-aware `Link` to switch locale while preserving section
- Fires `language_switch` analytics event with `{ from: currentLocale, to: targetLocale }`
- Updates `<html lang>` (handled by layout)

**Responsive Behavior:**
- Header desktop: `[UZ | RU | EN]` inline pills
- Header mobile: shown inside drawer as full labels
- Footer: always full labels

**Accessibility:** `aria-label="Language selector"` on wrapper; current locale has `aria-current="true"`.

---

### 3.15 MapEmbed

**Purpose:** Embedded Google Map iframe showing clinic location. Deferred/lazy-loaded (dynamic import) to avoid blocking LCP.

**Props:**
```ts
interface MapEmbedProps {
  src: string                  // Google Maps embed URL from env config
  title: string                // translated: 'Miracle IVF klinikasi xaritasi'
  height?: number              // default: 300
  className?: string
}
```

**States:** `loading` (skeleton placeholder) → `loaded` (iframe visible).

**Responsive Behavior:** Full-width, fixed height. Height may increase on desktop.

**Performance:** Dynamically imported (`next/dynamic`, `ssr: false`, `loading` skeleton). Only renders after ContactCta section is near viewport.

---

## Part 4 — Section Components

### 4.1 Hero

**Purpose:** Above-the-fold hook. H1 headline, subheadline, trust micro-strip, primary CTA, secondary CTA, hero image.

**Props:**
```ts
interface HeroProps {
  locale: 'uz' | 'ru' | 'en'
}
```

**Implementation notes:**
- H1 with `text-4xl md:text-5xl lg:text-6xl`, font-bold, text-primary
- Hero image: `next/image` with `priority` (LCP critical)
- Trust micro-strip: inline flex row of 3 stat pills
- RSC — no `"use client"` needed

**Responsive Behavior:**
- Mobile (<768px): stacked — image → text → trust strip → CTAs
- Desktop (≥1024px): 55% text / 45% image side-by-side

---

### 4.2 TrustStats

**Purpose:** Animated statistics counter grid. Communicates credibility at a glance.

**Props:**
```ts
interface TrustStatsProps {
  locale: 'uz' | 'ru' | 'en'
}
```

**Client component** (`"use client"`) — uses Intersection Observer for animation trigger.

**Contains:** 4× `StatCounter`

**Responsive Behavior:**
- Mobile: 2×2 grid
- Desktop (≥768px): 4×1 row

---

### 4.3 ProblemSolution

**Purpose:** Two-panel empathy + solution section.

**Props:**
```ts
interface ProblemSolutionProps {
  locale: 'uz' | 'ru' | 'en'
}
```

**RSC.** Contains `SectionHeading`, two content panels, inline `CTAButton`.

**Responsive Behavior:**
- Mobile: stacked (problem first, solution second)
- Desktop (≥1024px): side-by-side 50/50 columns

---

### 4.4 Services

**Purpose:** 6-card service grid.

**Props:**
```ts
interface ServicesProps {
  locale: 'uz' | 'ru' | 'en'
}
```

**RSC.** Renders `SectionHeading` + grid of 6× `ServiceCard` + `CTAButton`.

**Responsive Behavior:**
- Mobile: 1-column stack
- Tablet (≥640px): 2-column grid
- Desktop (≥1024px): 3-column grid

---

### 4.5 Doctors

**Purpose:** Doctor card showcase, horizontal carousel on mobile.

**Props:**
```ts
interface DoctorsProps {
  locale: 'uz' | 'ru' | 'en'
}
```

**Client component** (carousel interaction). Renders `SectionHeading` + N× `DoctorCard` + `CTAButton`.

**Carousel:** Keyboard accessible (`left`/`right` arrow keys), dot indicators, swipe support on touch.

**Responsive Behavior:**
- Mobile (<768px): carousel, 1 card visible, snap scroll
- Tablet (≥768px): 2-column grid
- Desktop (≥1024px): 3–4 column grid (grid replaces carousel)

---

### 4.6 Process

**Purpose:** IVF 6-step journey visualization.

**Props:**
```ts
interface ProcessProps {
  locale: 'uz' | 'ru' | 'en'
}
```

**RSC.** Renders `SectionHeading` + 6× `ProcessStep` + `CTAButton`.

**Responsive Behavior:**
- Mobile: vertical stacked steps with connector line
- Desktop (≥1024px): 2-column alternating layout

---

### 4.7 SuccessStories

**Purpose:** 2–4 patient success story cards with aggregate stat.

**Props:**
```ts
interface SuccessStoriesProps {
  locale: 'uz' | 'ru' | 'en'
}
```

**RSC.** Renders `SectionHeading` + 2–4× `StoryCard` + `CTAButton`.

**Responsive Behavior:**
- Mobile: single column
- Desktop (≥1024px): 2-column grid

---

### 4.8 Testimonials

**Purpose:** Patient quote carousel/grid.

**Props:**
```ts
interface TestimonialsProps {
  locale: 'uz' | 'ru' | 'en'
}
```

**Client component** (carousel on mobile). Renders `SectionHeading` + N× `TestimonialCard`.

**Carousel:** Single-card swipe on mobile; auto-play optional (only if `prefers-reduced-motion: no-preference`); keyboard navigable; dot indicators; prev/next buttons.

**Responsive Behavior:**
- Mobile (<768px): single-card swipe carousel
- Tablet (≥768px): 2-column grid
- Desktop (≥1024px): 3-column grid

---

### 4.9 Faq

**Purpose:** FAQ section wrapping `FaqAccordion`.

**Props:**
```ts
interface FaqProps {
  locale: 'uz' | 'ru' | 'en'
}
```

**RSC** (accordion built on Radix, works without client state). Renders `SectionHeading` + `FaqAccordion` + `CTAButton`.

**Responsive Behavior:** Single column at all breakpoints.

---

### 4.10 ContactCta

**Purpose:** Primary conversion section — form, reassurance microcopy, alternative contacts, address, map.

**Props:**
```ts
interface ContactCtaProps {
  locale: 'uz' | 'ru' | 'en'
}
```

**Client component** (form state, map lazy load).

**Contains:**
- `SectionHeading`
- Reassurance microcopy block
- `ContactForm`
- `PhoneLink`
- 2× `MessagingLink` (WhatsApp, Telegram)
- Address block
- `MapEmbed` (lazy, dynamic import)

**Responsive Behavior:**
- Mobile: single column, stacked
- Desktop (≥1024px): 2-column — form (60%) / contact info + map (40%)

---

## Part 5 — Naming & Export Conventions

| Rule | Detail |
|------|--------|
| One component per file | Filename === PascalCase component name |
| Named exports | `export function Hero(...)` — no default exports except in `app/` |
| Props interface in same file | `interface HeroProps { ... }` declared above the component |
| Path aliases | `@/components`, `@/sections`, `@/lib`, `@/types` |
| Server by default | No `"use client"` unless state/effects/events required |
| No dead exports | Remove unused components rather than exporting unused |

---

## Part 6 — Analytics Event Wiring Summary

| Component | Event | Trigger |
|-----------|-------|---------|
| `CTAButton` | `cta_click` | Any CTA button click |
| `PhoneLink` | `call_click` | Tel: link click |
| `MessagingLink` | `messaging_click` | WhatsApp/Telegram click |
| `ContactForm` | `form_start` | First focus on any field |
| `ContactForm` | `generate_lead` + `Lead` (Pixel) | Server Action success confirmation |
| `FaqAccordion` | `faq_open` | Individual FAQ item expanded |
| `LanguageSwitcher` | `language_switch` | Locale changed |
| `Testimonials` (carousel) | `video_play` | If video testimonials added |
| Page level | `page_view` | On route render |
| Page level | `scroll_depth` | 25/50/75/100% scroll milestones |

---

## Part 7 — Accessibility Checklist per Component

| Component | Key A11y Requirements |
|-----------|----------------------|
| `Header` | `<header>`, `<nav>` landmark, aria-label, mobile menu aria-expanded, Escape to close |
| `Footer` | `<footer>` landmark |
| `SkipLink` | Visible on focus, links to `#main-content` |
| `Button` | Minimum 44×44px, visible focus ring, aria-disabled, aria-label if icon-only |
| `CTAButton` | Inherits Button requirements |
| `Input` | Paired `<label>`, aria-describedby on error, aria-invalid |
| `Select` | Accessible select, keyboard operable, labelled |
| `Accordion` | aria-expanded, aria-controls, role="button" on trigger, keyboard toggle |
| `StatCounter` | aria-label with static final value, animation skipped on prefers-reduced-motion |
| `DoctorCard` | Meaningful image alt text, badge text accessible |
| `Testimonials` | carousel: aria-live="polite", prev/next buttons labelled, dot indicators labelled |
| `ContactForm` | All fields labelled, errors linked, focus management on success/error |
| `LanguageSwitcher` | aria-label on group, aria-current="true" on active locale |
| `MapEmbed` | title on iframe, loading skeleton announced |
| `StickyCTABar` | Buttons 44×44px, hidden from AT when not shown |

---

## Part 8 — Performance Notes per Component

| Component | Optimization |
|-----------|-------------|
| `Hero` | `next/image priority` on hero photo (LCP), `fetchpriority="high"` |
| `DoctorCard` | `next/image` lazy, sized, AVIF/WebP |
| `StoryCard` | `next/image` lazy (below fold) |
| `MapEmbed` | `next/dynamic` — SSR false, lazy load, placeholder skeleton |
| `Testimonials` | `next/dynamic` carousel — loaded lazily (below fold) |
| `StatCounter` | `"use client"`, Intersection Observer — no JS runs until in viewport |
| `ContactForm` | `"use client"` isolated; form submit via Server Action (no client fetch) |
| Analytics | `next/script` with `strategy="afterInteractive"` — never blocks render |
