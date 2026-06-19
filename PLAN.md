# Implementation Plan & Roadmap
## Miracle IVF — Landing Page

| | |
|---|---|
| **Project** | Miracle IVF Conversion Landing Page |
| **Stack** | Next.js 15 · React · TypeScript · TailwindCSS · shadcn/ui · Vercel |
| **Document Version** | 1.1 |
| **Status** | In Progress — Phases 1–3 complete; 4–5 substantially built |
| **Last Updated** | 2026-06-17 |

> This plan is sequenced but iterative. Phases may overlap where dependencies allow. Complexity is rated **Low / Medium / High** and reflects effort + risk, not a time commitment.

---

## Phase Overview

| Phase | Name | Primary Outcome | Complexity | Status |
|---|---|---|---|---|
| 1 | Research & Architecture | Foundations, scaffold, content model | Medium | ✅ Complete |
| 2 | Content Architecture & Localization | next-intl, locale routing, dictionaries, hreflang | High | ✅ Complete (language switcher pending) |
| 3 | Design System | Tokens, theme, primitives, shadcn setup | Medium | ✅ Complete (native primitives, not shadcn/ui) |
| 4 | Landing Page Development | All 11 sections built, responsive & localized | High | 🟡 In progress (10 sections done; Header/Footer/StickyCTA placeholders) |
| 5 | Forms & Tracking | Localized booking form + analytics + events | Medium | 🟡 In progress (pipeline live; rate-limit + GA4/Pixel pending) |
| 6 | SEO | Per-locale metadata, schema, sitemap, local SEO | Medium | 🟡 Partial (metadata/hreflang/sitemap done; JSON-LD pending) |
| 7 | Testing | A11y, performance, cross-device, multilingual QA | Medium | ⬜ Not started |
| 8 | Deployment | Vercel production launch + monitoring | Low | ⬜ Not started |

---

## Build Progress — as of 2026-06-17

**Legend:** ✅ Complete · 🟡 Partial / in progress · ⬜ Not started

### Phase 1 — Research & Architecture ✅
- Next.js 15 (App Router, RSC) + TypeScript strict scaffold; path aliases; typed domain model (`src/types`, `src/lib/config/*`).
- Folder structure per CLAUDE.md; `.env.example` with all server-only + public vars; `robots.ts` + `sitemap.ts` scaffolds.
- **Deviation:** UI primitives are hand-built and themed with Tailwind tokens — **shadcn/ui was not installed**. Native components meet the same spec.

### Phase 2 — Content Architecture & Localization ✅ (1 item pending)
- `next-intl` middleware + `[locale]` routing (`uz` default, `ru`, `en`) + localized `[slug]` mapping; root redirect.
- Dictionaries `messages/{uz,ru,en}.json` (UZ canonical); type-safe keys via `src/types/messages.d.ts` (missing keys fail the build).
- Server-side translations; per-locale `generateMetadata`, hreflang + `x-default`, `<html lang>` per locale.
- 🟡 **Pending:** `LanguageSwitcher` component — Header nav is still a placeholder.

### Phase 3 — Design System ✅
- Brand tokens as CSS variables + Tailwind theme (`globals.css`): primary `#163C8C`, accent `#F4B6C2`, background `#F5F7FA`, plus destructive/muted/border/ring/input.
- `next/font` Inter (Latin + Cyrillic), `prefers-reduced-motion` handling, always-visible focus rings.
- Primitives built: `Section`, `Container`, `SectionHeading`, `CTAButton`.

### Phase 4 — Landing Page Development 🟡
- ✅ Sections (10): Hero, TrustStats (+ `StatCounter`), ProblemSolution, Services, Doctors, IVF Process, SuccessResults, Testimonials, FAQ, Contact.
- ✅ `SkipLink`, smooth-scroll helper, locale layout shell.
- 🟡 `Header`, `Footer`, `StickyCTABar` are minimal placeholders (full nav / 4-column footer / scroll-aware bar pending).
- ⬜ Real imagery (hero LCP image, doctor photos, OG image) — placeholders in place.

### Phase 5 — Forms, Lead Pipeline & Tracking 🟡
- ✅ `BookingForm` (+ `FormField`, `FormSuccessState`, `FormErrorState`), localized; server-side Zod with localized messages; honeypot; full a11y (focus management, aria wiring).
- ✅ Lead pipeline **operational**: `LeadService` → `SupabaseLeadStorageProvider` (RLS, service-role, server-only) → `TelegramLeadNotificationProvider` (Uzbek emoji format, MarkdownV2 escaping, Asia/Tashkent time, retry + backoff). Storage-first; DB failure aborts; Telegram failure non-fatal; attempt+outcome logging.
- ✅ Typed analytics helpers + event hooks wired (`cta_click`, `form_start/submit/success/error`, `generate_lead`).
- 🟡 **Pending:** GA4 + Meta Pixel script loading (helpers no-op until added); server-side rate limiting (Upstash env present, no code yet).

### Phase 6 — SEO 🟡 (deferred by request)
- ✅ Per-locale metadata, canonical, hreflang + `x-default`, OG/Twitter tags; basic locale-aware `sitemap.ts` + `robots.ts`.
- ⬜ JSON-LD (`MedicalClinic` / `Physician` / `FAQPage`), OG image asset, NAP finalization.

### Phases 7–8 — Testing & Deployment ⬜
- Not started.

---

## Phase 1 — Research & Architecture

**Objective:** Establish technical foundation, content model, and project conventions before any UI is built.

### Deliverables
- Next.js 15 (App Router) + TypeScript (strict) project scaffold.
- TailwindCSS + shadcn/ui configured.
- Folder structure per CLAUDE.md.
- Content/config architecture (typed content model, i18n-ready) — **no hardcoded copy**.
- Environment variable schema (`.env.example`).
- Baseline `metadata`, `robots.txt`, `sitemap.ts` placeholders.
- Linting/formatting (ESLint, Prettier) + Git hooks.

### Tasks
1. Initialize Next.js 15 App Router project, TypeScript strict.
2. Install & configure Tailwind, shadcn/ui, fonts (`next/font`).
3. Define folder structure (`/components`, `/sections`, `/content`, `/lib`, `/types`, `/app`).
4. Create typed content schema for every section (TypeScript interfaces).
5. Author baseline EN/RU content files (placeholder but realistic).
6. Set up ESLint/Prettier, `tsconfig` strict, path aliases.
7. Define all env vars in `.env.example` with placeholder values: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, GA4 + Pixel IDs.
8. Set up Git repo, branch strategy, commit convention.

### Dependencies
- Brand assets (logo, color tokens — provided in brief), draft content from clinic.

### Complexity: **Medium**

---

## Phase 2 — Content Architecture & Localization

**Objective:** Stand up the full trilingual foundation (**Uzbek default, Russian, English**) so every later phase is localized by construction — not retrofitted. Uzbek is the source language; RU/EN are translations.

### Deliverables
- **`next-intl`** installed and wired into the App Router (locale-segment routing).
- **Locale routing:** `/[locale]` with `uz` (default), `ru`, `en`; root `/` redirects to resolved locale (Accept-Language → fallback `uz`).
- **Localized section slugs** (path-name mapping), e.g. `/uz/xizmatlar`, `/ru/uslugi`, `/en/services`.
- **Translation dictionaries:** `src/messages/uz.json` (canonical key set), `ru.json`, `en.json`.
- **Type-safe translation keys** (typed augmentation; build fails on missing/mismatched keys).
- **Server-side translations** (RSC-first), with client access only where needed.
- **Language switcher** component (header + footer) preserving current path/section across locales.
- **SEO localization scaffolding:** per-locale `generateMetadata`, hreflang alternates, `x-default`, localized canonical, `<html lang>` per locale.
- **Locale-aware sitemap** generator emitting all three locales with alternates.
- Typed content model (from Phase 1) bound to the dictionary structure so sections consume `t()` keys, never literals.

### Tasks
1. Install & configure `next-intl` middleware + `[locale]` segment + default-locale redirect.
2. Define supported locales, default (`uz`), and locale detection strategy.
3. Design the **dictionary structure** (namespaced by section: `hero`, `stats`, `services`, `form`, `validation`, `meta`, `common`…).
4. Author **Uzbek source** strings; create RU & EN translation files mirroring keys.
5. Implement type-safe key typing + a missing-key check in CI/build.
6. Build the localized pathname/slug map and routing helpers.
7. Build the accessible language switcher (preserves path, sets `lang`, fires `language_switch` event).
8. Implement per-locale metadata + hreflang + `x-default` helpers.
9. Implement locale-aware sitemap & robots.
10. Document the "add a string" and "add a locale" workflow for contributors.

### Dependencies
- Phase 1 scaffold + typed content model.
- Uzbek source copy (draft acceptable); RU/EN translations (can be staged but keys must exist).

### Complexity: **High**

---

## Phase 3 — Design System

**Objective:** Codify the premium-medical visual language into reusable tokens and primitives.

### Deliverables
- Tailwind theme extension: colors, spacing, radii, shadows, typography scale.
- Design tokens for brand palette:
  - Primary `#1B3A8B`, Secondary `#FFFFFF`, Accent `#F5A3B7`, Background `#F5F7FA`.
- Typography system (modern, clean, readable; fluid type scale).
- Core UI primitives (Button, Card, Section, Container, Heading, Badge, Input, Accordion, etc.) via shadcn/ui, themed.
- Motion/animation tokens (durations, easings) respecting `prefers-reduced-motion`.
- Iconography set chosen (e.g. lucide-react).
- Documented spacing/radius/elevation rules (soft gradients, rounded corners, elegant whitespace).

### Tasks
1. Map brand colors to semantic tokens (primary, accent, surface, muted, foreground) with AA-verified contrast pairs.
2. Configure Tailwind theme + CSS variables for theming.
3. Build themed shadcn/ui primitives.
4. Define typography scale & responsive fluid sizing.
5. Establish gradient, shadow, and radius utilities.
6. Set up animation utilities + reduced-motion strategy.
7. Create a `/design` reference (Storybook-lite or a hidden preview route) — optional.

### Dependencies
- Phase 1 scaffold complete; Phase 2 locale foundation available (so tokens/typography account for all scripts).

### Complexity: **Medium**

---

## Phase 4 — Landing Page Development

**Objective:** Build all 11 sections as reusable, content-driven, **localized** responsive components.

### Deliverables
- Section components (each consuming typed content, mobile-first):
  1. Hero
  2. Trust Statistics
  3. Problem & Solution
  4. Services
  5. Doctors
  6. IVF Process
  7. Success Stories
  8. Testimonials
  9. FAQ
  10. Contact CTA
  11. Footer
- Sticky header + sticky mobile CTA bar.
- Smooth-scroll anchored navigation.
- Responsive layouts validated 320px → 1920px.
- Image optimization via `next/image`.

### Tasks
1. Build layout shell (header, main, footer, sticky CTA).
2. Implement each section component, wired to content config.
3. Add animated counters (Trust Statistics).
4. Build accessible FAQ accordion.
5. Build accessible testimonials carousel.
6. Implement smooth-scroll nav + active-section handling.
7. Responsive QA pass per section.
8. Optimize and place imagery (LCP image priority on Hero).

### Dependencies
- Phase 3 design system + Phase 2 localization/content model.

### Complexity: **High**

---

## Phase 5 — Forms, Lead Pipeline & Tracking

**Objective:** Capture every lead durably in Supabase, notify the clinic team instantly via Telegram, and instrument all conversion signals. Both storage and notification are required MVP features; the pipeline is built on a provider-agnostic `LeadService` abstraction.

### Deliverables
- Consultation booking form (Server Action), **fully localized (labels, placeholders, validation, confirmation) in UZ/RU/EN**.
- Client + server validation (Zod) with **localized error messages**.
- Success/error UI states + reassuring localized confirmation.
- Spam protection (honeypot + rate limiting).
- **`LeadService` abstraction** with typed `LeadStorageProvider` and `LeadNotificationProvider` interfaces — Google Sheets / Airtable / CRM / email / WhatsApp addable without touching form components.
- **Supabase lead storage (MVP):** `leads` table, RLS enabled, service-role key server-only; DB write is gated — no notification sent until INSERT succeeds; DB failure aborts the flow.
- **Telegram lead notification (MVP):** emoji-formatted `sendMessage` after confirmed DB write; retry with backoff if notification fails; lead is safe in DB regardless.
- **Secure env config:** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — all server-only.
- Structured logging + error tracking for both DB and Telegram failure paths.
- GA4 + Meta Pixel integration (consent-aware) with typed event helpers.

### Tasks

**Form**
1. Define form schema (Zod) shared client/server.
2. Implement Server Action with validation + sanitization.
3. Build form UI with accessible localized errors and states.
4. Add honeypot + basic rate limiting.

**Lead pipeline architecture**
5. Define the typed `Lead` shape (`fullName`, `phone`, `city`, `serviceInterest`, `message`, `language`, `sourcePage`, `createdAt`).
6. Define `LeadStorageProvider` interface (`save(lead): Promise<Result>`).
7. Define `LeadNotificationProvider` interface (`notify(lead): Promise<Result>`).
8. Implement `LeadService` that calls `storage.save()` first; only on success calls `notification.notify()`; handles each failure path independently.

**Supabase storage**
9. Create the Supabase project; obtain `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`.
10. Write and run the `leads` table migration (schema + indexes + RLS policy).
11. Implement the Supabase storage adapter using the service-role client (server-only import).
12. Store `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` in `.env.example` (placeholders) + Vercel (encrypted secrets).

**Telegram notification**
13. Create the Telegram bot via @BotFather; obtain the bot token.
14. Create the private Telegram group; add the bot; obtain `TELEGRAM_CHAT_ID`.
15. Implement the Telegram notification adapter — emoji template formatter with safe escaping, Asia/Tashkent timestamp, graceful "—" for empty optionals.
16. Store `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` in `.env.example` + Vercel (encrypted secrets).
17. Implement retry with backoff on `sendMessage` failures; cap attempts; log + track final failure.

**Analytics & testing**
18. Integrate GA4 + Meta Pixel with consent gating; fire `generate_lead`/`Lead` on Server Action confirmation.
19. Implement typed analytics event helpers; attach to CTAs, links, form.
20. **End-to-end test:** submit form → DB row confirmed → Telegram message received with correct emoji format and all fields.
21. **Failure path tests:** DB failure → no Telegram sent, error returned; Telegram failure → DB row intact, retry fires, user confirmation shown.
22. Verify `SUPABASE_SERVICE_ROLE_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` never appear in client bundle, logs, or error messages.

### Dependencies
- Phase 4 Contact section; Phase 2 localized validation strings; Supabase project created; Telegram bot created; analytics IDs supplied.

### Complexity: **High**

---

## Phase 6 — SEO

**Objective:** Maximize discoverability and rich-result eligibility **across all three locales**, with strong local signals. Builds on the hreflang/metadata scaffolding from Phase 2 and finalizes it against real content.

### Deliverables
- **Per-locale `metadata`** (localized title, description, canonical) for UZ/RU/EN.
- **Complete hreflang map** (`uz`, `ru`, `en`, `x-default` → `/uz`), self-referencing & bidirectional.
- Open Graph + Twitter card + OG image, with `og:locale` + alternates per locale.
- JSON-LD (localized text): `MedicalClinic`/`LocalBusiness`, `Physician` (per doctor), `FAQPage`, optionally `Review`/`AggregateRating`.
- **Locale-aware `sitemap.xml`** (all locales + `xhtml:link` alternates), `robots.txt`.
- Semantic heading audit per locale (single H1, ordered H2/H3).
- Local SEO: consistent NAP, per-language geo keywords, embedded map.

### Tasks
1. Finalize per-locale `generateMetadata` against real translated content.
2. Verify hreflang/`x-default` correctness across all pages and locales.
3. Create OG image(s) (1200×630); set per-locale OG fields.
4. Build JSON-LD generators from typed, localized content.
5. Finalize locale-aware sitemap + robots.
6. Audit semantic structure & localized alt text per locale.
7. Add LocalBusiness schema + NAP consistency check across locales.

### Dependencies
- Phase 4 content & structure finalized; Phase 2 localization foundation.

### Complexity: **Medium**

---

## Phase 7 — Testing

**Objective:** Verify quality bar: accessibility AA, Lighthouse 95+, cross-device correctness, **and multilingual integrity**.

### Deliverables
- Accessibility audit (axe / manual keyboard + screen reader) — AA pass **per locale**.
- Lighthouse reports ≥ 95 in all four categories (spot-checked per locale).
- Core Web Vitals validated (LCP/INP/CLS).
- Cross-browser & cross-device QA matrix.
- Form end-to-end tests (success, validation, spam, error) **in each language**.
- **Lead pipeline tests:** submit → DB row inserted in Supabase → Telegram group receives correctly emoji-formatted message with all fields.
- **Failure path tests:** DB failure → no Telegram sent, error logged; Telegram failure → DB row intact, retry fires, user confirmation shown.
- Verify `SUPABASE_SERVICE_ROLE_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` never appear in client bundle, logs, or error messages.
- Analytics event verification (GA4 DebugView + Pixel Helper), incl. `language_switch`.
- Content/SEO validation (Rich Results Test, OG debugger) per locale.
- **Multilingual QA suite** (see below).

### Multilingual QA (dedicated)
- **No missing/empty translation keys** in any locale (build + runtime check); no key leakage (raw keys never rendered).
- **No untranslated fallback text** leaking the wrong language.
- Locale routing correct: `/`, `/uz`, `/ru`, `/en`, root redirect, and localized slugs all resolve.
- Language switcher preserves the current section/path and updates `<html lang>`.
- **Hreflang & canonical** validated per page (no missing/orphaned alternates; `x-default` present).
- Per-locale metadata, OG, and JSON-LD render in the correct language.
- Layout integrity with longer strings (RU/UZ text expansion) — no overflow/truncation.
- Form validation & confirmation messages display in the active locale.
- Date/number/phone formatting correct per locale.

### Tasks
1. Run axe + manual keyboard/screen-reader pass per locale; fix issues.
2. Run Lighthouse (mobile + desktop) per locale; optimize until ≥ 95.
3. Validate CWV; address LCP/CLS/INP regressions.
4. Test responsive breakpoints on real/emulated devices across locales.
5. E2E test booking flow in UZ/RU/EN including full lead pipeline (DB storage + Telegram notification) and both failure paths.
6. Execute the multilingual QA checklist above.
7. Verify analytics events (incl. `language_switch`) in DebugView / Pixel Helper.
8. Validate schema (Rich Results) & hreflang/OG (sharing debuggers) per locale.

### Dependencies
- Phases 4–6 complete.

### Complexity: **Medium**

---

## Phase 8 — Deployment

**Objective:** Launch to production on Vercel with monitoring and rollback safety.

### Deliverables
- Production deployment on Vercel (custom domain, HTTPS).
- Environment variables configured in Vercel.
- Analytics live & verified in production.
- `robots`/locale-aware `sitemap` reachable; all three locales + hreflang verified in Search Console + Business Profile.
- Monitoring (Vercel Analytics / Speed Insights) enabled.
- Launch checklist signed off (Definition of Done in CLAUDE.md).

### Tasks
1. Configure Vercel project, domain, env vars (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` as encrypted secrets); verify production DB writes and Telegram delivery.
2. Set up preview → production promotion flow.
3. Verify production analytics, schema, OG, performance.
4. Submit locale-aware sitemap to Google Search Console; confirm hreflang coverage for UZ/RU/EN.
5. Enable Speed Insights / monitoring; set up uptime check.
6. Final DoD checklist sign-off; tag release.

### Dependencies
- Phase 7 passed; domain & credentials available.

### Complexity: **Low**

---

## Dependency Graph (Summary)

```
P1 Architecture
   └──> P2 Content Architecture & Localization (next-intl, locales, dictionaries, hreflang)
            └──> P3 Design System
                     └──> P4 Sections (localized) ──┬──> P5 Forms & Tracking ──┐
                                                     └──> P6 SEO (per-locale) ──┤
                                                                                └──> P7 Testing (+ multilingual QA) ──> P8 Deploy
```

## Cross-Cutting Concerns (every phase)
- **Trilingual by construction** — UZ (default), RU, EN; Uzbek is the source language. Localization is established in Phase 2 so all later work is localized from the start, never retrofitted.
- Mobile-first & accessibility considered from the first line of markup.
- No hardcoded content — everything flows from typed, localized dictionaries.
- Performance budget respected continuously (not just in Phase 7).
- TypeScript strict, reusable components, clean architecture maintained throughout.

## Milestones
- ✅ **M1:** Scaffold + localization foundation (next-intl, routing, dictionaries, hreflang) ready (end P2).
- ✅ **M2:** Design system ready (end P3).
- 🟡 **M3:** Full page built, responsive & localized (end P4) — sections done; Header/Footer/StickyCTA + imagery pending.
- 🟡 **M4:** Localized form + analytics + per-locale SEO complete (end P6) — form + lead pipeline live; GA4/Pixel + JSON-LD pending.
- ⬜ **M5:** Quality bar met — A11y AA, Lighthouse 95+, multilingual QA passed (end P7).
- ⬜ **M6:** Production launch (end P8).
