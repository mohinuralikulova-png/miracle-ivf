# IMPLEMENTATION_READY_CHECKLIST.md — Miracle IVF Landing Page

> Go / No-Go assessment for implementation start. Each item must be checked before the corresponding phase begins.
> Date: 2026-06-16 · Status: **NOT READY — 12 blockers open**

---

## How to Use This Checklist

- Mark each item `[x]` when resolved.
- Phase gates: do not begin a phase until all items in its **Prerequisites** section are checked.
- Items marked `[!]` are blockers that must be resolved before any implementation begins.
- Items marked `[ ]` are unresolved.

---

## GATE 0 — Pre-Implementation (Resolve Before Writing Any Code)

These items block all phases. They must be resolved first.

| # | Item | Status | Owner |
|---|---|---|---|
| G0-01 | Color token contradiction resolved: canonical primary (`#163C8C` per CLAUDE.md) and accent (`#F4B6C2`) confirmed in writing and PLAN.md updated | `[ ]` **BLOCKER** | Architect |
| G0-02 | Font family chosen: must support Latin + Cyrillic, self-hostable via `next/font`, confirmed in DESIGN_TOKENS.md | `[ ]` **BLOCKER** | Designer |
| G0-03 | DESIGN_TOKENS.md created: all color tokens, spacing scale, radius scale, shadow scale, motion tokens, type scale with verified WCAG AA contrast ratios | `[ ]` **BLOCKER** | Designer |
| G0-04 | DESIGN_SYSTEM.md created: visual language rules, component anatomy, brand aesthetic guidelines | `[ ]` | Designer |
| G0-05 | UI_KIT.md created: all component variants with visual specs, interactive states, spacing | `[ ]` | Designer |
| G0-06 | Logo provided (SVG + PNG) — required on Day 1 for Header/Footer scaffolding | `[ ]` **BLOCKER** | Client |
| G0-07 | Domain confirmed (`miracleivf.uz` or alternative) — all hardcoded URLs in SITEMAP, hreflang, canonical depend on this | `[ ]` **BLOCKER** | Client |
| G0-08 | Carousel library decided (Embla Carousel recommended) and added to approved stack | `[ ]` | Architect |
| G0-09 | Rate limiting strategy decided (Upstash Redis recommended) and added to Phase 5 scope with env vars documented in `.env.example` | `[ ]` | Architect |
| G0-10 | Error tracking service decided (e.g., Sentry) and added to Phase 5 scope | `[ ]` | Architect |
| G0-11 | Privacy Policy and Terms pages added to SITEMAP.md with localized routes defined | `[ ]` | Architect |
| G0-12 | 404 and 500 error page specs added to component inventory or noted as standard Next.js `not-found.tsx` / `error.tsx` | `[ ]` | Architect |

**Gate 0 result: 0 / 12 items checked. BLOCKED.**

---

## PHASE 1 GATE — Research & Architecture

_Can begin when: Gate 0 is complete._

### Documentation Prerequisites

| # | Item | Status |
|---|---|---|
| P1-01 | CLAUDE.md read and understood by all contributors | `[ ]` |
| P1-02 | PRD.md read and understood | `[ ]` |
| P1-03 | PLAN.md read and understood | `[ ]` |
| P1-04 | All Gate 0 items resolved | `[ ]` |

### Technical Prerequisites

| # | Item | Status |
|---|---|---|
| P1-05 | Git repository initialized; branch strategy documented (per CLAUDE.md §17) | `[ ]` |
| P1-06 | Node.js LTS and pnpm/npm version pinned in `.nvmrc` / `package.json` | `[ ]` |
| P1-07 | Next.js 15 (App Router) + TypeScript strict project bootstrapped | `[ ]` |
| P1-08 | TailwindCSS configured; Tailwind theme extends with canonical color tokens from DESIGN_TOKENS.md | `[ ]` |
| P1-09 | shadcn/ui initialized; theme variables set from DESIGN_TOKENS.md | `[ ]` |
| P1-10 | ESLint + Prettier configured; no warnings on empty project | `[ ]` |
| P1-11 | `tsconfig.json` strict mode confirmed (`"strict": true`, `"noImplicitAny": true`) | `[ ]` |
| P1-12 | Path aliases configured: `@/components`, `@/sections`, `@/lib`, `@/types`, `@/messages` | `[ ]` |
| P1-13 | `.env.example` complete: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, rate limiting vars | `[ ]` |
| P1-14 | Folder structure created per CLAUDE.md §3 | `[ ]` |
| P1-15 | GitHub Actions CI workflow created: on PR → `tsc --noEmit`, `eslint`, `next build` | `[ ]` |

### Content Prerequisites

| # | Item | Status |
|---|---|---|
| P1-16 | Doctor names and specialties (text only, no photos needed yet) confirmed in writing | `[ ]` |
| P1-17 | Clinic name in UZ/RU/EN confirmed (is "Miracle IVF" spelled identically in all languages?) | `[ ]` |

**Phase 1 can begin when:** Gate 0 complete AND P1-05 through P1-17 all checked.

---

## PHASE 2 GATE — Content Architecture & Localization

_Can begin when: Phase 1 is complete._

### Prerequisites

| # | Item | Status |
|---|---|---|
| P2-01 | Phase 1 scaffold complete and CI passing | `[ ]` |
| P2-02 | All three languages confirmed: UZ (default source), RU, EN | `[ ]` |
| P2-03 | Uzbek source copy reviewed by a native UZ speaker with medical context | `[ ]` |
| P2-04 | Russian translation of all keys reviewed by a native RU speaker | `[ ]` |
| P2-05 | English translation of all keys reviewed | `[ ]` |

### Deliverables Check (before Phase 3 begins)

| # | Item | Status |
|---|---|---|
| P2-06 | `next-intl` middleware configured; `/`, `/uz`, `/ru`, `/en` routes all resolve | `[ ]` |
| P2-07 | `src/messages/uz.json` complete (all keys from CONTENT_ARCHITECTURE.md populated) | `[ ]` |
| P2-08 | `src/messages/ru.json` mirrors all UZ keys exactly | `[ ]` |
| P2-09 | `src/messages/en.json` mirrors all UZ keys exactly | `[ ]` |
| P2-10 | Translation key parity validation script (`scripts/validate-translations.ts`) implemented and added to `prebuild` | `[ ]` |
| P2-11 | Type-safe `IntlMessages` augmentation implemented; `t('bad.key')` produces TypeScript error | `[ ]` |
| P2-12 | `LanguageSwitcher` built and path preservation tested for all 6 section slug pairs | `[ ]` |
| P2-13 | Localized slug routing proven working (proof-of-concept for `/uz/xizmatlar` → scroll to `#xizmatlar`) | `[ ]` |
| P2-14 | `generateMetadata` with hreflang / canonical / `x-default` implemented and verified with Ahrefs or Google Rich Results Test | `[ ]` |
| P2-15 | Locale-aware `sitemap.ts` generating correct XML with alternates for all three locales | `[ ]` |

---

## PHASE 3 GATE — Design System

_Can begin when: Phase 2 is complete. Requires DESIGN_TOKENS.md and DESIGN_SYSTEM.md (Gate 0)._

### Prerequisites

| # | Item | Status |
|---|---|---|
| P3-01 | DESIGN_TOKENS.md complete with all color tokens, verified contrast ratios, spacing, radius, motion values | `[ ]` |
| P3-02 | Font files self-hosted or CDN URL confirmed; Cyrillic glyph coverage verified | `[ ]` |
| P3-03 | All shadcn/ui primitive variants themed and matching DESIGN_TOKENS.md | `[ ]` |
| P3-04 | `#F4B6C2` (accent pink) confirmed NOT used as background for text anywhere | `[ ]` |
| P3-05 | Primary CTA button contrast verified: `#163C8C` background + white text = ≥7:1 (confirmed AA+) | `[ ]` |
| P3-06 | `prefers-reduced-motion` utility class / hook created and tested | `[ ]` |
| P3-07 | Responsive typography scale implemented (fluid, no CLS, Latin + Cyrillic verified side-by-side) | `[ ]` |

---

## PHASE 4 GATE — Landing Page Development

_Can begin when: Phases 1–3 are complete._

### Content Required for Phase 4

| # | Item | Status |
|---|---|---|
| P4-01 | Hero image provided (min 1200×800px, premium lifestyle, warm) | `[ ]` |
| P4-02 | Doctor photos provided (min 3 portraits, professional, 400×400px+) | `[ ]` |
| P4-03 | Doctor data confirmed: names, specialties, credentials, years, training country | `[ ]` |
| P4-04 | Stats verified and confirmed: success rate %, babies born, years of experience, doctor count | `[ ]` |
| P4-05 | At least 2 consented patient success stories available | `[ ]` |
| P4-06 | At least 4 consented patient testimonials (quotes + initials) available | `[ ]` |

### Technical Prerequisites

| # | Item | Status |
|---|---|---|
| P4-07 | Carousel library (e.g., Embla) installed and accessible carousel wrapper implemented | `[ ]` |
| P4-08 | `StickyBarController` client boundary pattern designed and implemented | `[ ]` |
| P4-09 | Intersection Observer hook created (for StatCounter animation and sticky bar) | `[ ]` |
| P4-10 | Stats config file (`src/config/stats.ts`) created with numeric values + suffix + label keys | `[ ]` |

### Section Completion Criteria (per section — mark when done)

Each section must meet ALL of CLAUDE.md §18 Definition of Done before being marked complete.

| # | Section | Status |
|---|---|---|
| P4-S01 | Hero | `[ ]` |
| P4-S02 | TrustStats (with animated counters) | `[ ]` |
| P4-S03 | ProblemSolution | `[ ]` |
| P4-S04 | Services | `[ ]` |
| P4-S05 | Doctors (with carousel on mobile) | `[ ]` |
| P4-S06 | IVF Process | `[ ]` |
| P4-S07 | SuccessStories | `[ ]` |
| P4-S08 | Testimonials (with carousel) | `[ ]` |
| P4-S09 | FAQ (accessible accordion) | `[ ]` |
| P4-S10 | ContactCta (form placeholder — form wired in Phase 5) | `[ ]` |
| P4-S11 | Header (sticky, mobile drawer, language switcher) | `[ ]` |
| P4-S12 | Footer | `[ ]` |
| P4-S13 | StickyCTABar (mobile only, hides when contact visible) | `[ ]` |
| P4-S14 | SkipLink (focus-visible, links to `#main-content`) | `[ ]` |

---

## PHASE 5 GATE — Forms, Lead Pipeline & Tracking

_Can begin when: Phase 4 complete, Contact section exists as shell._

### Infrastructure Prerequisites (all CRITICAL — no form ships without these)

| # | Item | Status |
|---|---|---|
| P5-01 | Supabase project created | `[ ]` |
| P5-02 | `leads` table migration applied and verified (schema + indexes + RLS per PRD §13.2) | `[ ]` |
| P5-03 | RLS policy confirmed: anon insert disabled; service-role only | `[ ]` |
| P5-04 | `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` stored in `.env.local` (dev) and Vercel encrypted secrets (prod) | `[ ]` |
| P5-05 | Telegram bot created via @BotFather; token obtained | `[ ]` |
| P5-06 | Private Telegram group created; bot added; `TELEGRAM_CHAT_ID` obtained | `[ ]` |
| P5-07 | `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` stored in `.env.local` and Vercel encrypted secrets | `[ ]` |
| P5-08 | Rate limiting configured (Upstash Redis or equivalent) and env vars added | `[ ]` |
| P5-09 | Error tracking service (e.g., Sentry) configured | `[ ]` |
| P5-10 | `import 'server-only'` added to `src/lib/supabase.ts` and lead service adapter files | `[ ]` |

### Form & Lead Pipeline Deliverables

| # | Item | Status |
|---|---|---|
| P5-11 | Zod schema (`lib/validation.ts`) shared client/server with localized error messages sourced from dictionaries | `[ ]` |
| P5-12 | `LeadService` abstraction implemented with `LeadStorageProvider` and `LeadNotificationProvider` interfaces | `[ ]` |
| P5-13 | Supabase storage adapter implemented; DB write confirmed before any notification | `[ ]` |
| P5-14 | Telegram notification adapter implemented with emoji template, Asia/Tashkent timestamp, retry with backoff | `[ ]` |
| P5-15 | Server Action: validates → sanitizes → calls `LeadService.submit()` → returns typed result | `[ ]` |
| P5-16 | Honeypot field implemented (hidden, `aria-hidden`, `tabIndex=-1`) | `[ ]` |
| P5-17 | `ContactForm` wired to Server Action with all states: idle, submitting, success, error, validation_error | `[ ]` |
| P5-18 | GA4 + Meta Pixel integrated with `next/script` strategy `afterInteractive` | `[ ]` |
| P5-19 | Analytics typed event helpers implemented for all events in PRD §16.2 | `[ ]` |

### End-to-End Verification (required before Phase 6)

| # | Item | Status |
|---|---|---|
| P5-20 | Submit form → row appears in Supabase `leads` table ✓ | `[ ]` |
| P5-21 | Submit form → Telegram group receives correctly formatted message with all fields ✓ | `[ ]` |
| P5-22 | DB failure path: no Telegram sent, user sees error, lead logged ✓ | `[ ]` |
| P5-23 | Telegram failure path: DB row intact, retry fires, user sees success confirmation ✓ | `[ ]` |
| P5-24 | `SUPABASE_SERVICE_ROLE_KEY` does NOT appear in client bundle (verified with build analysis) ✓ | `[ ]` |
| P5-25 | `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` do NOT appear in client bundle ✓ | `[ ]` |
| P5-26 | `generate_lead` GA4 event fires exactly once on confirmed submission (verified in DebugView) ✓ | `[ ]` |

---

## PHASE 6 GATE — SEO

_Can begin when: Phase 4 complete. Best finalized after Phase 5 (real content available)._

| # | Item | Status |
|---|---|---|
| P6-01 | Per-locale `generateMetadata` returns localized title, description, canonical, OG, Twitter for all three locales | `[ ]` |
| P6-02 | Hreflang map complete: uz/ru/en + x-default on all three locale pages; validated with hreflang checker tool | `[ ]` |
| P6-03 | OG image created and placed at `/public/og-image.jpg` (1200×630px) | `[ ]` |
| P6-04 | JSON-LD generated per locale: `MedicalClinic`, `LocalBusiness`, `Physician` (per doctor), `FAQPage` | `[ ]` |
| P6-05 | JSON-LD validated with Google Rich Results Test for each locale | `[ ]` |
| P6-06 | `sitemap.xml` reachable at `/sitemap.xml`; all 3 locales + alternates present | `[ ]` |
| P6-07 | `robots.txt` correct (Allow all, Sitemap pointer) | `[ ]` |
| P6-08 | Single H1 per locale page confirmed; H2/H3 hierarchy audited | `[ ]` |
| P6-09 | All meaningful images have localized `alt` text via `t()` keys | `[ ]` |
| P6-10 | NAP (Name, Address, Phone) identical across Footer, JSON-LD, and Contact section in each locale | `[ ]` |

---

## PHASE 7 GATE — Testing

_Can begin when: Phases 4–6 complete._

### Accessibility

| # | Item | Status |
|---|---|---|
| P7-01 | axe-core audit run on `/uz`, `/ru`, `/en` — zero critical/serious violations | `[ ]` |
| P7-02 | Full keyboard navigation tested on critical path (read → scroll → open FAQ → fill form → submit) | `[ ]` |
| P7-03 | Screen reader test (NVDA + Chrome or VoiceOver + Safari) on booking flow per locale | `[ ]` |
| P7-04 | All focus rings visible (not suppressed) at every interactive element | `[ ]` |
| P7-05 | `prefers-reduced-motion` tested: counters show final value immediately; carousel no auto-play; no CSS transitions | `[ ]` |
| P7-06 | Tap targets ≥ 44×44px on all mobile interactive elements (verified with Chrome DevTools) | `[ ]` |

### Performance

| # | Item | Status |
|---|---|---|
| P7-07 | Lighthouse Mobile ≥ 95 in all 4 categories on `/uz` | `[ ]` |
| P7-08 | Lighthouse Mobile ≥ 95 in all 4 categories on `/ru` | `[ ]` |
| P7-09 | Lighthouse Mobile ≥ 95 in all 4 categories on `/en` | `[ ]` |
| P7-10 | LCP < 2.5s (Hero image loads as LCP; `priority` prop confirmed) | `[ ]` |
| P7-11 | CLS < 0.1 (no layout shift from images, fonts, map embed, or counters) | `[ ]` |
| P7-12 | INP < 200ms (form interactions, accordion, carousel) | `[ ]` |

### Multilingual QA

| # | Item | Status |
|---|---|---|
| P7-13 | No raw translation key visible in any locale (e.g., `hero.heading` never rendered as text) | `[ ]` |
| P7-14 | No missing keys: `validate-translations.ts` script passes with zero errors | `[ ]` |
| P7-15 | RU locale tested for text overflow at all breakpoints (RU strings 20–40% longer than UZ) | `[ ]` |
| P7-16 | Language switcher preserves section on all 6 slug → slug locale pairs | `[ ]` |
| P7-17 | Root `/` redirects correctly to `/uz` (or matched Accept-Language locale) | `[ ]` |
| P7-18 | Form validation messages display in the active locale in all three languages | `[ ]` |
| P7-19 | Form success and error states display in the active locale | `[ ]` |
| P7-20 | `<html lang>` attribute correct on all three locale pages | `[ ]` |

### Cross-Device

| # | Item | Status |
|---|---|---|
| P7-21 | Tested at 320px, 375px, 768px, 1024px, 1440px, 1920px — no horizontal overflow at any breakpoint | `[ ]` |
| P7-22 | Tested on real mobile device (iOS Safari + Android Chrome) | `[ ]` |
| P7-23 | Tested on latest Chrome, Firefox, Safari (desktop) | `[ ]` |
| P7-24 | Sticky header and sticky mobile CTA bar tested on all breakpoints | `[ ]` |

### Lead Pipeline QA

| # | Item | Status |
|---|---|---|
| P7-25 | Submitted test leads confirmed in Supabase `leads` table with all required fields | `[ ]` |
| P7-26 | Telegram notification received for each test submission with correct format | `[ ]` |
| P7-27 | Honeypot field confirmed hidden from users and tab order | `[ ]` |
| P7-28 | Rate limit confirmed to fire on rapid repeated submissions | `[ ]` |

---

## PHASE 8 GATE — Deployment

_Can begin when: All Phase 7 items checked and signed off._

| # | Item | Status |
|---|---|---|
| P8-01 | Vercel project created and linked to repository | `[ ]` |
| P8-02 | Custom domain configured and DNS propagated | `[ ]` |
| P8-03 | All env vars set as Vercel encrypted secrets: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_META_PIXEL_ID, rate limiting vars | `[ ]` |
| P8-04 | Production build passes; zero TypeScript errors; zero ESLint errors | `[ ]` |
| P8-05 | Post-deploy: submit test lead → confirm Supabase row + Telegram notification in production | `[ ]` |
| P8-06 | Post-deploy: GA4 `page_view` and `generate_lead` events confirmed in production DebugView | `[ ]` |
| P8-07 | Sitemap submitted to Google Search Console for all 3 locales | `[ ]` |
| P8-08 | Hreflang coverage verified in Google Search Console | `[ ]` |
| P8-09 | Vercel Analytics / Speed Insights enabled | `[ ]` |
| P8-10 | Definition of Done (CLAUDE.md §18) self-review checklist complete and signed off | `[ ]` |

---

## Current Status — Overall Assessment

| Gate | Items | Checked | Blocked? |
|---|---|---|---|
| Gate 0 (Pre-implementation) | 12 | 0 | **YES — 12 blockers** |
| Phase 1 | 13 | 0 | Yes |
| Phase 2 | 10 | 0 | Yes |
| Phase 3 | 7 | 0 | Yes |
| Phase 4 | 18 (prereqs) + 14 (sections) | 0 | Yes |
| Phase 5 | 16 | 0 | Yes |
| Phase 6 | 10 | 0 | Yes |
| Phase 7 | 28 | 0 | Yes |
| Phase 8 | 10 | 0 | Yes |

### Verdict: NO-GO

**Implementation cannot begin safely until:**

1. **Color token contradiction resolved** (G0-01) — the design system is built on this
2. **DESIGN_TOKENS.md created** (G0-03) — the component system depends on it
3. **Font family selected** (G0-02) — affects typography, Cyrillic support, and performance
4. **Logo provided** (G0-06) — needed on day 1 of any UI work
5. **Domain confirmed** (G0-07) — all canonical/hreflang/sitemap URLs depend on it
6. **Real phone number provided** (C-01) — every section has a `tel:` link
7. **Stats verified** (C-03, C-04, C-05) — cannot build trust section on fabricated numbers
8. **WhatsApp / Telegram deep links** (C-09, C-10) — Contact section cannot function
9. **Carousel library decided** (G0-08) — blocks Doctor and Testimonial section architecture
10. **Rate limiting strategy decided** (G0-09) — form cannot launch without it
11. **Privacy Policy / Terms routes defined** (G0-11) — footer links are currently dead
12. **Error page specs added** (G0-12) — production requirement

**Unblocked work that CAN start now:**
- Creating DESIGN_TOKENS.md, DESIGN_SYSTEM.md, UI_KIT.md (requires color decision first)
- Translation review and copy approval
- Procuring and preparing clinic assets (photos, logo)
- Setting up Supabase project and Telegram bot
- Verifying and sourcing statistics
