# ARCHITECTURE_REVIEW.md — Miracle IVF Landing Page

> Final architecture and product audit. Reviewed against: PRD.md, PLAN.md, CLAUDE.md, SITEMAP.md, WIREFRAMES.md, CONTENT_ARCHITECTURE.md, COMPONENT_INVENTORY.md.
> Date: 2026-06-16

---

## Executive Summary

Documentation is comprehensive and internally coherent in most areas. The PRD, content architecture, component inventory, and wireframes are production-quality planning artifacts. However, **three critical blockers exist before implementation can begin safely:**

1. A color token contradiction between CLAUDE.md and PLAN.md has not been resolved.
2. Three design system documents (DESIGN_SYSTEM.md, UI_KIT.md, DESIGN_TOKENS.md) are referenced but do not exist.
3. Essential real content (phone, address, doctors, photos, verified stats) is absent.

Additionally, twelve architectural risks require decisions before or during Phase 1–3 work.

---

## 1. Missing Requirements

### 1.1 Missing Documents

| Document | Referenced In | Status |
|---|---|---|
| `DESIGN_SYSTEM.md` | User request, implied by PLAN.md Phase 3 | **MISSING** |
| `UI_KIT.md` | User request | **MISSING** |
| `DESIGN_TOKENS.md` | User request | **MISSING** |

These three documents are Phase 3 deliverables and are required before any section component work begins. Their absence means no authoritative source of truth for tokens, spacing, type scale, or component variants exists.

### 1.2 Missing Component Requirements

| Gap | Location | Impact |
|---|---|---|
| Consent Management (cookie banner) | Not in COMPONENT_INVENTORY, not in IA, no copy in CONTENT_ARCHITECTURE | Analytics cannot load without consent; legal risk |
| Privacy Policy page | Linked in Footer but absent from SITEMAP routes | Dead link at launch |
| Terms of Use page | Linked in Footer but absent from SITEMAP routes | Dead link at launch |
| 404 / 500 error pages | Not mentioned anywhere | Poor UX; required for production |
| Loading UI (`loading.tsx`) | Not mentioned in PLAN or component inventory | App Router requires it for good UX |
| Global layout (`layout.tsx`) | Described in folder structure but not spec'd | Required before any section work |

### 1.3 Missing Functional Specs

| Requirement | Gap |
|---|---|
| Rate limiting implementation | FR-14 requires it; no library, strategy, or Redis/Upstash/edge middleware spec exists |
| Error tracking service | CLAUDE.md and PRD reference "error tracking" for lead pipeline failures but no service (Sentry, etc.) is chosen |
| Scroll-to-section on localized slug | SITEMAP.md describes `/uz/xizmatlar` → `/uz#xizmatlar` but the Next.js App Router implementation (redirect vs. server component rendering) is unspecified |
| Carousel library decision | Testimonials and Doctors sections require a carousel; no library (Embla, Swiper, etc.) is specified; building accessible touch carousels from scratch is high-risk |
| Auto-played testimonial carousel | COMPONENT_INVENTORY mentions "auto-play optional" but no on/off config, timing, or pause-on-hover spec exists |
| StickyCTABar visibility detection | Requires Intersection Observer; parent page must be `"use client"` or a shared client boundary must be defined — architectural decision not made |

---

## 2. Contradictions

### 2.1 Color Token Conflict — CRITICAL

**CLAUDE.md (Section 6):**
```
primary:    #163C8C
accent:     #F4B6C2
background: #F5F7FA
```

**PLAN.md (Phase 3):**
```
primary:    #1B3A8B
accent:     #F5A3B7
background: #F5F7FA
```

These are different colors. `#163C8C` (deeper, more saturated blue) vs `#1B3A8B` (slightly lighter). `#F4B6C2` vs `#F5A3B7` (different pink tones). **The canonical token source is unresolved.** CLAUDE.md is the governance document and should take precedence, but this must be explicitly confirmed and PLAN.md corrected before the design system is built. Building on the wrong token will cascade across all components.

**Recommendation:** Confirm `#163C8C` (CLAUDE.md value) as canonical. Update PLAN.md. Add to DESIGN_TOKENS.md.

### 2.2 Phase 1 / i18n Language Order

CLAUDE.md Section 7 is explicit: **Uzbek is the source language; author UZ first.** PLAN.md Phase 1 Task 5 says "Author baseline EN/RU content files." This reverses the language priority. 

**Recommendation:** Update PLAN.md Phase 1 Task 5 to specify Uzbek source first.

### 2.3 StatCounter Value Type

CONTENT_ARCHITECTURE.md defines `stats.successRate.value` as the string `"65%"`. COMPONENT_INVENTORY.md `StatCounter` requires a numeric `value: number` prop plus a `suffix` string for animation. The dictionary cannot drive the animation value directly.

**Recommendation:** Create a typed stats config file (`src/config/stats.ts`) with `{ value: 65, suffix: '%', labelKey: 'stats.successRate.label' }`. The string in the dictionary becomes display-only if JavaScript is disabled; the config drives the animation.

### 2.4 StickyCTABar Requires Client State in Page

COMPONENT_INVENTORY.md Section 2.5 defines `isContactVisible: boolean` as a prop. This requires Intersection Observer in the page component. CLAUDE.md mandates Server Components by default. The page is an RSC; a client wrapper boundary must be explicitly designed around the sticky bar.

**Recommendation:** Create a `StickyBarController` client component that wraps only the `StickyCTABar` and owns the Intersection Observer, keeping the page itself as an RSC.

### 2.5 Testimonials Aggregate Rating — Hardcoded vs Dynamic

WIREFRAMES.md and CONTENT_ARCHITECTURE.md embed `4.9 / 5.0 · 200+ sharh` directly in the section heading copy. These numbers are hardcoded in the content dictionary, not driven by a real review system. If these are real numbers, they must be kept current manually; if they are aspirational, they violate the PRD's truthfulness requirement.

**Recommendation:** Classify this as critical content (see CONTENT_GAPS.md). Source the real aggregate rating. If unverifiable, remove or replace with a softer claim.

---

## 3. Technical Risks

### 3.1 Localized Section Slug Routing — HIGH RISK

SITEMAP.md defines URLs like `/uz/xizmatlar` that map to `/uz#xizmatlar`. In Next.js App Router with `next-intl`, these sub-paths require either:
- (a) Separate `page.tsx` files under `[locale]/xizmatlar/page.tsx` that redirect/rerender with scroll
- (b) Middleware rewriting or redirecting to the parent locale page with a hash fragment

Hash fragments are not handled by Next.js server-side routing. Option (b) risks missing the fragment on initial load. This is a known complexity in the `next-intl` + anchor scroll pattern.

**Recommendation:** In Phase 2, build a proof-of-concept for locale slug → anchor resolution before committing to this routing shape across all 6 slugs per locale (18 routes total). Consider whether deep-linking to sections actually requires separate URL paths or whether anchor links suffice for the MVP.

### 3.2 Rate Limiting on Vercel Serverless — HIGH RISK

FR-14 requires rate limiting on the booking form. Vercel serverless functions are stateless; in-memory rate limiting does not work across invocations. Effective rate limiting on Vercel requires:
- Vercel KV (Redis-based)
- Upstash Redis
- Or IP-based limiting via Vercel Edge Middleware

None of these are in the current tech stack or environment variable schema.

**Recommendation:** Add a rate limiting decision to Phase 5 scope. Specify the library and add required env vars (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` or equivalent) to `.env.example`. Upstash is the lowest-friction Vercel-compatible option.

### 3.3 Translation Key Type Safety — MEDIUM RISK

FR-22 requires "build fails on missing/extra translation keys." `next-intl` supports TypeScript augmentation via `IntlMessages` typing, but this only catches incorrect key references in code, not missing keys in JSON files. A full key parity check (UZ → RU, UZ → EN) requires a custom CI script or build-time validation.

**Recommendation:** Add a `scripts/validate-translations.ts` script to Phase 2 that reads all three JSON files and asserts key parity. Run it as part of `next build` via a `prebuild` npm script.

### 3.4 Carousel Implementation — MEDIUM RISK

Two sections (Doctors, Testimonials) require accessible, touch-friendly carousels with keyboard support, dot indicators, and `prefers-reduced-motion` compliance. Building this from scratch is high risk for both accessibility and CLS. No library is specified.

**Recommendation:** Add Embla Carousel to the approved stack. It is lightweight (~3KB gzipped), headless, touch/keyboard accessible, and has no layout shift issues. Decide before Phase 4 begins.

### 3.5 Supabase Client Boundary — MEDIUM RISK

CLAUDE.md forbids importing the Supabase service-role client outside `src/lib/supabase.ts`. Next.js 15 RSC bundling is mostly correct about this boundary, but tree-shaking failures or accidental re-exports can leak server-only code. The `server-only` npm package should be used to enforce this at build time.

**Recommendation:** Add `import 'server-only'` at the top of `src/lib/supabase.ts` and `src/lib/leads/providers/storage/supabase.ts`. This causes a build error if these modules are ever imported on the client side.

### 3.6 OG Image Strategy — LOW RISK

SITEMAP.md specifies a single `/og-image.jpg` shared across all three locales. This is acceptable for MVP but means social sharing shows the same image regardless of language. If the OG image contains text, it will be in one language only.

**Recommendation:** Use a text-free brand image for the shared OG image. Localized OG images with text are a V2 enhancement.

### 3.7 Progressive Enhancement on Form — LOW RISK

PRD NFR-9 requires "Form works with JS where feasible; graceful degradation if JS off." Next.js Server Actions require JavaScript to function. Without JS, the form's `action` attribute would need to point to a raw POST endpoint. This is not specified.

**Recommendation:** Downgrade this requirement to "Server Action is the primary path; a visible fallback (phone/WhatsApp links) provides the no-JS alternative" — which the Contact section already provides. Document this decision.

---

## 4. SEO Risks

### 4.1 Section Sub-paths as Potential Duplicate Content

If `/uz/xizmatlar`, `/uz/shifokorlar`, etc. all render the full landing page (every section), Google may index them as near-duplicate pages. Canonical tags are critical here. Each localized sub-path must declare a self-referencing canonical pointing to the root locale URL (`/uz`).

**Recommendation:** Sub-path pages should: (a) render with `<link rel="canonical" href="/uz" />`, and (b) redirect to `/uz#section-anchor` via a client-side scroll after render — not as separate indexable pages. Or simpler: only generate hreflang and sitemap entries for `/uz`, `/ru`, `/en` root URLs, not for the section sub-paths.

### 4.2 Verified Statistics Requirement

PRD Section 10 and Section 20 require success stats to be "truthful and sourced." The `65%` success rate and `10,000+ families` are currently unverified placeholders. If these go live without verification, the clinic faces both legal liability and Google's medical content quality standards.

**Recommendation:** Obtain written verification of these stats from the clinic before launch. Document the source. If stats can't be verified, replace with conservative or relative claims.

### 4.3 Missing JSON-LD for Sub-path URLs

SITEMAP.md defines JSON-LD schemas per locale but does not address whether the section sub-path URLs get their own schema. `BreadcrumbList` is listed as optional.

**Recommendation:** Implement `BreadcrumbList` only for the three root locale pages. Do not add separate schema for section sub-paths.

---

## 5. Conversion Risks

### 5.1 Form Depth — Deep Page Position

The booking form (section 10 of 11) is at the bottom of a very long page. High-intent visitors arriving from ads may not scroll this far on mobile. The sticky mobile CTA bar addresses this, but the bar depends on the Intersection Observer implementation working correctly.

**Recommendation:** Ensure the sticky CTA bar is the first client component tested end-to-end. A broken sticky bar significantly damages conversion on mobile.

### 5.2 No Inline Pricing Signal

FAQ deliberately avoids pricing (redirecting to consultation). While this is the right strategy for a high-consideration medical product, some visitors will bounce without any cost signal. 

**Recommendation:** Add "prices vary by treatment and individual plan — book a free consultation for a personalized quote" to the FAQ cost answer. This is already present in `faq.cost.answer` — confirm it reads as a soft signal, not an evasion.

### 5.3 WhatsApp / Telegram Links Require Real URLs

`MessagingLink` requires a pre-built `href` prop. These URLs depend on real phone numbers and Telegram handles that are not yet provided. If these links are `#` placeholders at launch, they will silently fail.

**Recommendation:** These are critical launch-blocking content items. Add to CONTENT_GAPS.md as Critical.

---

## 6. Accessibility Risks

### 6.1 Accent Color Contrast on CTAs

The accent color `#F4B6C2` (soft pink) on a white background has an estimated contrast ratio of approximately 1.8:1 — far below WCAG AA 4.5:1 for normal text and 3:1 for large text / UI components. If primary CTA buttons use this as a background with white text, they will fail accessibility requirements.

**Recommendation:** Never use `#F4B6C2` as a background for text. Use it as a decorative accent only. CTA buttons must use `#163C8C` (primary) with white text (contrast ≥ 7:1) or another compliant combination. This must be codified in DESIGN_TOKENS.md with verified contrast ratios for every color pair.

### 6.2 Mobile Drawer Focus Trap

Header mobile menu requires a focus trap (keyboard users must not escape the open drawer). This is non-trivial to implement correctly. Radix UI's `Dialog` primitive includes a built-in focus trap.

**Recommendation:** Use Radix `Dialog` or `Sheet` (shadcn/ui) to implement the mobile navigation drawer. Do not implement a custom focus trap from scratch.

### 6.3 Auto-play Carousel Risk

COMPONENT_INVENTORY.md allows auto-play for testimonials "if prefers-reduced-motion: no-preference." Auto-play can still cause issues for users with vestibular disorders who do not have reduced-motion enabled in their OS.

**Recommendation:** Default to no auto-play. If auto-play is added, require a visible pause button and honor the WCAG 2.1 SC 2.2.2 criterion (user can pause, stop, or hide).

---

## 7. Technical Debt Risks

### 7.1 No Test Infrastructure Specified

Neither PLAN.md nor CLAUDE.md specifies a testing framework (Jest, Vitest, Playwright, Cypress). Phase 7 references "E2E tests" and "multilingual QA" but with no established test infrastructure, these will be manual or rushed.

**Recommendation:** Add Playwright to the stack for E2E testing. Define a minimal test suite in Phase 7 scope: form submission flow, locale routing, lead pipeline.

### 7.2 No CI/CD Pipeline Defined

PLAN.md Phase 8 covers Vercel deployment but no CI pipeline (GitHub Actions) is specified for automated lint, type-check, build validation, and translation key parity checks on every PR.

**Recommendation:** Add a GitHub Actions workflow to Phase 1 deliverables: on PR — run `tsc`, `eslint`, `next build`, and the translation validation script.

### 7.3 Doctor Data as Config vs CMS

Doctor data (names, credentials, photos) is treated as static typed config. This means every doctor update requires a code deploy. For a medical practice, doctor rosters change.

**Recommendation:** Accept this for MVP. Note in PLAN.md V2 scope that a headless CMS (or even Notion/Airtable adapter via the existing LeadService-style abstraction) should be added to manage doctor and testimonial data without code deploys.

---

## 8. Recommendations Summary

| Priority | Action | Owner |
|---|---|---|
| P0 | Resolve color token contradiction (#163C8C vs #1B3A8B, #F4B6C2 vs #F5A3B7) | Architect |
| P0 | Create DESIGN_TOKENS.md, DESIGN_SYSTEM.md, UI_KIT.md | Architect |
| P0 | Confirm all critical content is ready (phone, address, doctors, stats) | Client / Clinic |
| P0 | Verify and source the 65% success rate and all stats | Clinic + Legal |
| P1 | Add Privacy Policy and Terms routes to SITEMAP.md | Architect |
| P1 | Add 404/500 error page specs | Architect |
| P1 | Add consent management spec (cookie banner component + copy) | Architect |
| P1 | Specify rate limiting strategy (Upstash Redis recommended) | Architect |
| P1 | Specify carousel library (Embla Carousel recommended) | Architect |
| P1 | Add CI/CD pipeline spec (GitHub Actions) to Phase 1 | Architect |
| P1 | Add `server-only` guard to Supabase and lead service modules | Developer |
| P2 | Prototype localized slug → anchor scroll routing before committing | Developer |
| P2 | Add translation parity validation script to Phase 2 | Developer |
| P2 | Design `StickyBarController` client boundary pattern | Developer |
| P3 | Verify accent color contrast ratios for every usage pattern | Designer |
| P3 | Implement mobile drawer using Radix `Sheet` / shadcn `Sheet` | Developer |
