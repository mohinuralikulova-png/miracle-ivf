# CLAUDE.md — Miracle IVF Landing Page

> This document governs all development on the Miracle IVF landing page. Every contributor (human or AI) must follow these rules. When in doubt, prefer accessibility, performance, and clarity over cleverness.

---

## 1. Project Overview

Miracle IVF is a premium, conversion-focused landing page for an international IVF/fertility clinic in Uzbekistan (Tashkent + regional cities). Its single goal is to convert hopeful, anxious visitors into **booked consultations** through medical credibility and emotional warmth.

- **Type:** Single-page marketing landing page (route `/`).
- **Primary KPI:** Consultation booking conversion rate.
- **Design feeling:** Premium healthcare with emotional warmth — trustworthy, hopeful, calm.
- **See also:** `PRD.md` (requirements), `PLAN.md` (roadmap).

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, RSC) |
| Language | TypeScript (strict mode) |
| UI Library | React |
| Styling | TailwindCSS |
| Components | shadcn/ui (themed) |
| Icons | lucide-react |
| i18n | **next-intl** (UZ default, RU, EN — locale routing) |
| Forms | Next.js Server Actions |
| Validation | Zod (shared client/server, localized messages) |
| Analytics | Google Analytics 4 + Meta Pixel |
| Deployment | Vercel |
| Fonts | `next/font` (self-hosted, no layout shift) |

**Do not** introduce new heavy dependencies without justification. Prefer the platform and existing stack.

---

## 3. Folder Structure

```
/
├── src/
│   ├── app/
│   │   ├── [locale]/               # Locale-segment routing (uz | ru | en)
│   │   │   ├── layout.tsx          # Per-locale layout: <html lang>, metadata, providers
│   │   │   ├── page.tsx            # Landing page (composes sections)
│   │   │   └── ...                 # Localized section routes/slugs as needed
│   │   ├── globals.css             # Tailwind layers + CSS variables
│   │   ├── sitemap.ts              # Locale-aware sitemap (all locales + alternates)
│   │   ├── robots.ts
│   │   └── actions/
│   │       └── booking.ts          # Server Action(s) for the form
│   ├── i18n/                       # next-intl config
│   │   ├── routing.ts              # locales, defaultLocale='uz', localized pathnames
│   │   ├── request.ts              # server-side message loading
│   │   └── navigation.ts           # typed Link/redirect/usePathname helpers
│   ├── middleware.ts               # next-intl locale detection + redirect
│   ├── messages/                   # Translation dictionaries (source of ALL copy)
│   │   ├── uz.json                 # Uzbek — DEFAULT / canonical key set (source language)
│   │   ├── ru.json                 # Russian — translation
│   │   └── en.json                 # English — translation
│   ├── components/
│   │   ├── ui/                     # shadcn/ui primitives (themed)
│   │   ├── layout/                 # Header, Footer, StickyCTA, LanguageSwitcher, Container, Section
│   │   └── common/                 # Reusable shared components (CTAButton, StatCounter…)
│   ├── sections/                   # One component per landing section
│   │   ├── Hero.tsx
│   │   ├── TrustStats.tsx
│   │   ├── ProblemSolution.tsx
│   │   ├── Services.tsx
│   │   ├── Doctors.tsx
│   │   ├── Process.tsx
│   │   ├── SuccessStories.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Faq.tsx
│   │   ├── ContactCta.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── analytics.ts            # Typed event helpers (GA4 + Pixel)
│   │   ├── schema.ts               # JSON-LD generators (localized)
│   │   ├── validation.ts           # Zod schemas (localized messages)
│   │   ├── supabase.ts             # Supabase server-only client (service-role)
│   │   ├── leads/                  # Lead pipeline (provider-agnostic)
│   │   │   ├── types.ts            # Lead interface + Result type
│   │   │   ├── service.ts          # LeadService — orchestrates storage then notification
│   │   │   ├── providers/
│   │   │   │   ├── storage/
│   │   │   │   │   └── supabase.ts # LeadStorageProvider — Supabase adapter (MVP)
│   │   │   │   └── notification/
│   │   │   │       └── telegram.ts # LeadNotificationProvider — Telegram adapter (MVP)
│   │   │   └── index.ts            # Exports LeadService instance (configured)
│   │   └── utils.ts
├── supabase/
│   └── migrations/
│       └── 0001_create_leads.sql   # leads table + indexes + RLS policy
│   └── types/                      # Shared TS types/interfaces (incl. translation-key types)
├── public/                         # Static assets, OG image
├── .env.example
├── PRD.md
├── PLAN.md
└── CLAUDE.md
```

> **Note:** Structured non-string data (e.g. doctor list, service list, FAQ items) is modeled in typed config but its **display strings live in `messages/`**. Nothing renders literal text that isn't keyed in the dictionaries.
>
> **Env vars required** (server-only, Vercel encrypted secrets — never committed with real values):
> `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`

---

## 4. Coding Standards

- **TypeScript strict mode** is mandatory. No `any`, no non-null `!` unless provably safe and commented.
- Prefer **named exports**; one component per file; filename matches component (PascalCase).
- **Server Components by default**; add `"use client"` only when interactivity requires it (state, effects, event handlers).
- Keep components small and focused; extract logic into `lib/` and types into `types/`.
- No dead code, no commented-out blocks, no `console.log` in committed code.
- Pure functions for data transforms; side effects isolated.
- Use path aliases (`@/components`, `@/content`, `@/lib`).
- Handle all async errors; never swallow rejections silently.
- Match surrounding code style; let ESLint + Prettier be the source of truth.

---

## 5. Component Standards

- **Reusable & content-driven:** components receive data via typed props; they never hardcode copy.
- Every component has an explicit `Props` interface in the same file (or `types/`).
- Composition over configuration; avoid boolean-prop explosions.
- Co-locate only what's truly local; share anything reused.
- Primitives (Button, Card, Input…) live in `components/ui` and are themed once.
- Section components live in `sections/` and orchestrate primitives + content.
- No business/data-fetch logic inside presentational components.
- Forward refs and spread `...props` on primitives where appropriate for flexibility.

---

## 6. Design System Rules

**Brand tokens (semantic, defined once as CSS variables + Tailwind theme):**

| Token | Value | Use |
|---|---|---|
| `primary` | `#163C8C` | Brand, heading accents, primary buttons |
| `secondary` | `#FFFFFF` | Surfaces, text on primary |
| `accent` | `#F4B6C2` | Highlights, emotional CTAs, accents |
| `background` | `#F5F7FA` | Page background |

Rules:
- **Never** use raw hex in components — use semantic tokens / Tailwind classes only.
- Visual language: **soft gradients, rounded corners, elegant whitespace, premium feel**.
- Consistent radius scale (e.g. `rounded-xl`/`rounded-2xl` for cards).
- Consistent elevation (soft, low-contrast shadows — no harsh drop shadows).
- Generous spacing; let sections breathe.
- Typography: modern, clean, highly readable; clear hierarchy; fluid scale. Fonts must support **Latin + Cyrillic** glyphs (UZ Latin + RU).
- All color pairings must pass **WCAG AA** contrast.

**Brand aesthetic (Miracle IVF) — required feeling:**
- Convey **Trust · Hope · Family · International expertise · Emotional warmth**.
- Premium medical look built on the deep brand blue `#163C8C` over a light `#F5F7FA` canvas, warmed by the soft pink accent `#F4B6C2`.

**Explicitly avoid:**
- ❌ Generic hospital / clinical-stock look.
- ❌ Dark medical interfaces (no dark, cold UI).
- ❌ Corporate, cold, impersonal feeling.

---

## 7. Internationalization (i18n) — Core Requirement

> **This is a trilingual product from day one.** i18n is not optional and not deferred. Build every component localized.

**Library & routing**
- Use **`next-intl`**, App Router compatible.
- **Locale-based routing** under `/[locale]`: `/uz`, `/ru`, `/en`. Localized section slugs per locale (e.g. `/uz/xizmatlar`, `/ru/uslugi`, `/en/services`) via the routing config.
- Root `/` redirects to the resolved locale (Accept-Language → fallback default).

**Supported languages**
| Code | Language | Role |
|---|---|---|
| `uz` | Uzbek | **Default locale + source language (canonical keys)** |
| `ru` | Russian | Translation |
| `en` | English | Translation |

**Default locale:** `uz`.

**Translations**
- **Server-side translations** (RSC-first): load messages on the server; use client translation only where interactivity needs it.
- **Translation dictionaries** live in `src/messages/uz.json`, `ru.json`, `en.json`, namespaced by section (`hero`, `services`, `form`, `validation`, `meta`, `common`, …).
- **`uz.json` is the canonical key set.** `ru.json` and `en.json` must mirror its keys exactly.
- **Type-safe translation keys:** augment next-intl's message types so `t('...')` keys are checked. **Missing/extra keys fail the build.**

**Hard rules**
- **No hardcoded text** anywhere in components — every user-visible string comes from `t()` / the dictionaries. This includes CTAs, labels, placeholders, **validation messages**, success/error states, reassurance microcopy, `alt` text, and metadata.
- All content must be **translation-ready** (keyed) the moment it is written — never add a literal "to translate later".
- `<html lang>` is set per locale; metadata, OG, and JSON-LD are generated **per locale**.
- Per-locale metadata + full **hreflang** map (`uz`, `ru`, `en`, `x-default` → `/uz`); self-referencing and bidirectional alternates.
- The **language switcher** (header + footer) preserves the current path/section and fires the `language_switch` analytics event.
- Account for **text expansion** (RU/UZ strings are often longer) — layouts must not overflow or truncate.
- Fonts must include **Latin + Cyrillic** coverage.

**Adding a string (workflow)**
1. Add the key to `uz.json` (source) under the right namespace.
2. Add the same key with translations to `ru.json` and `en.json`.
3. Consume via `t('namespace.key')` — never inline literal text.

---

## 8. Accessibility Rules (WCAG 2.1 AA — non-negotiable)

- Semantic HTML & landmarks (`header`, `nav`, `main`, `section`, `footer`); one `H1`, ordered headings.
- Contrast ≥ 4.5:1 text / ≥ 3:1 large text & UI.
- Fully keyboard operable; visible, non-suppressed focus rings.
- All interactive elements are real buttons/links with accessible names.
- Images: meaningful `alt`, or `alt=""` for decorative.
- Forms: `<label>` for every field, errors linked via `aria-describedby`, `aria-invalid`.
- Accordion/carousel: correct ARIA roles/states + keyboard support.
- Respect `prefers-reduced-motion`.
- Tap targets ≥ 44×44px on mobile.
- Provide a skip-to-content link.
- Test critical path with keyboard + screen reader before "done".

---

## 9. Performance Rules (Lighthouse 95+ target)

- Server Components by default; minimize client JS.
- Images via `next/image` (AVIF/WebP, sized, lazy below fold, `priority` on LCP hero image).
- Fonts via `next/font`, self-hosted, `display: swap`, preloaded; no FOIT/CLS.
- No layout shift: reserve dimensions for media/embeds (CLS < 0.1).
- Defer/lazy-load non-critical client components (carousel, map) — dynamic import.
- Keep third-party scripts minimal & deferred (analytics via `next/script` strategy `afterInteractive`/`lazyOnload`).
- Avoid large client-side libraries; tree-shake; check bundle size.
- Targets: **LCP < 2.5s, INP < 200ms, CLS < 0.1**; Lighthouse ≥ 95 in all four categories.

---

## 10. SEO Rules

- **Per-locale** metadata via `generateMetadata` (localized title, description, canonical) for UZ/RU/EN.
- One `H1` per locale page; logical `H2`/`H3` structure mirroring information architecture.
- Open Graph + Twitter card + OG image (1200×630); `og:locale` + `og:locale:alternate` per locale.
- JSON-LD structured data (**localized text**): `MedicalClinic`/`LocalBusiness`, `Physician` per doctor, `FAQPage`, `Review`/`AggregateRating` (only if genuine).
- **Localized canonical URLs** (`/uz`, `/ru`, `/en`) + complete **hreflang** map incl. `x-default` → `/uz`.
- Locale-aware `sitemap.ts` (all locales + alternates) + `robots.ts`.
- Local SEO: consistent **NAP**, per-language geo keywords (Toshkent / Ташкент / Tashkent, Uzbekistan), embedded map.
- Localized, descriptive alt text & link text; localized slugs; no keyword stuffing; truthful medical claims only.

---

## 11. Responsive Design Rules

- **Mobile-first**: base styles target the smallest viewport; scale up with `sm/md/lg/xl/2xl`.
- Support **320px → 1920px** with no horizontal scroll, no overflow.
- Fluid typography & spacing; avoid fixed pixel widths for layout.
- Touch-friendly targets and spacing on mobile.
- Sticky mobile CTA bar; sticky header.
- Test every section at: 320, 375, 768, 1024, 1440, 1920.

---

## 12. Animation Rules

- Purposeful, subtle, premium — never gratuitous.
- Use CSS/transform-based animations (GPU-friendly: `transform`, `opacity`).
- Centralized motion tokens (duration, easing).
- **Always** honor `prefers-reduced-motion: reduce` (disable/limit motion).
- No animation that blocks LCP or causes CLS.
- Counters, fade/slide-in on scroll allowed; keep durations short (≤ 400ms typical).

---

## 13. Form Rules

- Submission via **Next.js Server Action**.
- Shared **Zod** schema validates on client and server, with **localized error messages** (UZ/RU/EN) sourced from the dictionaries — no hardcoded validation text.
- Labels, placeholders, confirmation, and reassurance microcopy are localized in the active locale; capture the lead's locale on submit.
- Minimum fields: **Name, Phone** (required); optional Service, Message.
- Server-side sanitization; never trust client input.
- **Spam protection:** honeypot field + rate limiting.
- Accessible: labels, inline errors, `aria-invalid`, focus management to first error.
- Clear states: idle, submitting (disabled), success (reassuring confirmation), error (recoverable).
- Reassurance microcopy near submit (confidential, no obligation, response time).
- Fire `generate_lead` (GA4) + `Lead` (Pixel) **once** on confirmed success.
- No PII sent to analytics. Lead delivery via env-configured provider (email/webhook), abstracted in `lib`.
- Progressive enhancement: form works with JS where feasible; graceful errors.

---

## 14. Lead Pipeline Architecture

> **Every form submission must be durably stored AND trigger an instant notification. Both are required.** Supabase is the persistent store and source of truth. Telegram is the real-time notification channel. The pipeline runs through a `LeadService` abstraction so future providers (Google Sheets, Airtable, CRM, email, WhatsApp) can be added without touching form components.

**Flow & failure semantics**
```
Form → Server Action (validate + sanitize)
  → LeadService
      → storage.save(lead)        [Supabase INSERT — must succeed first]
          ✓ success → notification.notify(lead)  [Telegram sendMessage]
                          ✓ success → done
                          ✗ failure → lead safe in DB; retry with backoff; log + track
          ✗ failure → abort; do NOT notify; log + track; return error to user
```

**Sequencing rules (never violate)**
- `storage.save()` always runs first. Telegram is never called before the DB row is confirmed.
- A DB failure is fatal for the request — the user sees an error, no notification goes out.
- A Telegram failure is non-fatal — the lead exists in Supabase; the user sees success; notification is retried in the background.

**`LeadService` abstraction**
- `LeadService` orchestrates the pipeline using two provider interfaces:
  - `LeadStorageProvider`: `save(lead): Promise<Result>` — Supabase adapter in MVP.
  - `LeadNotificationProvider`: `notify(lead): Promise<Result>` — Telegram adapter in MVP.
- **Adding Google Sheets, Airtable, CRM, email, or WhatsApp** = write a new adapter, register it in `LeadService`. Zero changes to form components or the Server Action's public contract.
- The Server Action depends only on the typed `Lead` and `LeadService.submit()`.

**Lead type**
```ts
interface Lead {
  fullName:        string          // required
  phone:           string          // required
  city?:           string
  serviceInterest?: string
  message?:        string
  language:        'uz' | 'ru' | 'en'  // auto from locale
  sourcePage:      string          // auto from request URL
  createdAt:       Date            // auto, server time
}
```

**Supabase storage (MVP)**
- Client: `@supabase/supabase-js` with the service-role key — **server-only import, never in client code**.
- Table: `leads` (see DB schema below).
- RLS enabled; anon access to `leads` is disabled; only the service role can insert.
- Environment variables (server-only, Vercel encrypted secrets):
  - ⚠️ `SUPABASE_URL` — **never hardcoded or committed**
  - ⚠️ `SUPABASE_SERVICE_ROLE_KEY` — **never hardcoded, never logged, never in client bundle**
- `.env.example` declares both with placeholder values.

**`leads` table schema**
```sql
CREATE TABLE leads (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name        text        NOT NULL,
  phone            text        NOT NULL,
  city             text,
  service_interest text,
  message          text,
  language         text        NOT NULL,   -- 'uz' | 'ru' | 'en'
  source_page      text        NOT NULL,
  created_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX idx_leads_language   ON leads (language);
```

**Telegram notification (MVP)**
- Server-only calls to `sendMessage`; called only after DB row is confirmed.
- Environment variables (server-only, Vercel encrypted secrets):
  - ⚠️ `TELEGRAM_BOT_TOKEN` — **never hardcoded, committed, logged, or in client bundle**
  - ⚠️ `TELEGRAM_CHAT_ID` — **never hardcoded or committed**
- Retry with exponential backoff; cap attempts; report final failure to error tracking.
- Escape all user content for Telegram's parse mode; respect message-length limits.
- Empty optional fields render as "—".

**Telegram message format**
```
🔔 NEW LEAD

👤 Name:
{fullName}

📞 Phone:
{phone}

📍 City:
{city}

🧬 Service:
{serviceInterest}

💬 Message:
{message}

🌐 Language:
{preferredLanguage}

📅 Time:
{createdAt}

🔗 Page:
{sourcePage}
```

**Resilience rules**
- **Validation:** Zod schema runs before any provider is called; sanitize inputs before storage.
- **Logging:** log attempt + outcome for every provider call (no secrets, minimal PII in logs).
- **Error tracking:** final failures (both DB and Telegram) must surface to error tracking for manual recovery.
- **No silent data loss** — if a lead cannot be stored, the failure must be observable.

**Future-ready (do not break this)**
- New storage destinations → implement `LeadStorageProvider`, register in `LeadService`.
- New notification channels → implement `LeadNotificationProvider`, register in `LeadService`.
- Fan-out to multiple providers (e.g. Supabase + Sheets) → `LeadService` can call both sequentially or in parallel.
- **Form components never change** when providers are added or swapped.

---

## 15. Content Rules

- **No hardcoded content in components.** All copy lives in `src/messages/` dictionaries (keyed, typed).
- **Uzbek is the source language**; RU and EN are translations mirroring the same keys. All three ship in MVP.
- Tone: warm, hopeful, respectful, expert — never cold or pushy — consistent across all three languages.
- Plain language; explain medical jargon inline.
- Truthful claims only — no guarantees of pregnancy; success stats must be real & sourced.
- Patient stories/testimonials require consent; allow initials/no-photo.
- Alt text and labels are content too — keep them keyed in the dictionaries (all three locales).

---

## 16. Development Workflow

1. Read `PRD.md` + `PLAN.md` for context before building.
2. Work phase-by-phase per `PLAN.md`; keep PRs small and focused.
3. Branch per feature/section: `feat/<section>`, `fix/<issue>`, `chore/<task>`.
4. Lint, type-check, and self-review before commit.
5. Validate accessibility & responsiveness for any UI change.
6. Keep all copy keyed in `src/messages/` (UZ source + RU/EN); keep tokens in the design system.
7. Update docs when conventions change.
8. No direct commits to `main`; PR + review (even self-review checklist).

---

## 17. Git Commit Convention (Conventional Commits)

```
<type>(<scope>): <short summary>
```

**Types:** `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`.

**Examples:**
- `feat(hero): add hero section with primary CTA`
- `feat(form): implement booking server action with zod validation`
- `feat(leads): deliver submissions to telegram via provider abstraction`
- `perf(images): add next/image optimization to doctors section`
- `docs(prd): clarify analytics events`
- `feat(i18n): add next-intl locale routing for uz/ru/en`
- `chore(i18n): sync ru/en keys with uz source dictionary`
- `a11y(faq): add keyboard support to accordion` *(use `fix`/`feat` + `a11y` scope)*

Rules: imperative mood, lowercase summary, no trailing period, scope = section/area.

---

## 18. Definition of Done (DoD)

A task/section is **Done** only when ALL of the following are true:

- [ ] Matches PRD spec & design system; premium, warm, on-brand.
- [ ] Mobile-first; verified 320px → 1920px, no overflow.
- [ ] TypeScript strict passes; no `any`; no type errors.
- [ ] ESLint + Prettier clean.
- [ ] **No hardcoded content** — all copy from `src/messages/` via `t()`.
- [ ] **Localized in all 3 languages** (UZ/RU/EN): keys present in every dictionary, no missing/raw keys, no text overflow; renders correctly per locale.
- [ ] Reusable, well-typed components.
- [ ] Accessibility AA: keyboard, focus, labels, contrast, ARIA, reduced-motion verified.
- [ ] Performance budget respected; contributes to Lighthouse 95+.
- [ ] SEO: correct headings, **per-locale** metadata/schema where applicable, hreflang, localized alt text.
- [ ] Analytics events wired where relevant (and fire correctly).
- [ ] Form (if touched): validation, spam protection, states, **lead delivered to Telegram (emoji-formatted, all fields), retry + logging, secrets in env only**, conversion event.
- [ ] Tested on real/emulated mobile + desktop; cross-browser sanity.
- [ ] Conventional commit(s); PR self-review checklist complete.

---

## 19. Strict Requirements (Summary — always enforced)

| Requirement | Rule |
|---|---|
| **Mobile First** | Base styles = smallest viewport; scale up |
| **Trilingual (UZ/RU/EN)** | next-intl, UZ default + source, all locales in MVP |
| **TypeScript Strict** | Strict mode, no `any`; type-safe translation keys |
| **Reusable Components** | Typed, composable, content-driven |
| **No Hardcoded Content** | All copy in `src/messages/` via `t()` |
| **Durable Lead Storage** | Supabase INSERT before any notification; DB failure aborts flow |
| **Instant Lead Notification** | Telegram after confirmed DB write; retry on failure; DB is source of truth |
| **Provider-Agnostic Pipeline** | `LeadService` abstraction; form components never change when providers are added |
| **Secrets in Env Only** | `SUPABASE_SERVICE_ROLE_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — never hardcoded |
| **SEO Optimized** | Metadata, schema, OG, sitemap, local SEO |
| **Accessibility AA** | WCAG 2.1 AA, no exceptions |
| **Lighthouse 95+** | All four categories |
| **Clean Architecture** | Clear separation: content / UI / logic / config |

---

## 20. Do / Don't Quick Reference

**Do**
- Use semantic tokens & Tailwind theme classes (`#163C8C` primary, `#F4B6C2` accent — via tokens).
- Keep components server-first; opt into client only when needed.
- Source every string from `src/messages/` via `t()`; add the key to `uz.json` first, then `ru.json` + `en.json`.
- Respect `prefers-reduced-motion`.
- Optimize the Hero LCP image with `priority`.

**Don't**
- Hardcode hex colors or copy in JSX.
- Leave a string untranslated or render a raw translation key.
- Ship `any`, dead code, or `console.log`.
- Add heavy deps without justification.
- Make false/guaranteed medical claims.
- Send a Telegram notification before the Supabase INSERT is confirmed — DB always goes first.
- Hardcode, commit, log, or client-expose `SUPABASE_SERVICE_ROLE_KEY`, `TELEGRAM_BOT_TOKEN`, or `TELEGRAM_CHAT_ID`.
- Import the Supabase service-role client anywhere outside `src/lib/supabase.ts` server-only boundary.
- Couple form components to any delivery channel — always go through `LeadService`.
- Build a dark/cold/generic-hospital UI — keep it warm, premium, hopeful.
- Block LCP or cause CLS with animations or embeds.
