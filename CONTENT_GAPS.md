# CONTENT_GAPS.md — Miracle IVF Landing Page

> All content that must be supplied before or during implementation. Every item is classified by urgency.
> Date: 2026-06-16

---

## Classification

| Class | Meaning |
|---|---|
| **Critical** | Blocks launch. Page cannot go live without this content. |
| **Recommended** | Significantly impacts conversion, credibility, or SEO. Ship with MVP if at all possible. |
| **Optional** | Enhances quality but can be deferred to V2 without blocking launch. |

---

## Critical — Blocks Launch

These items are referenced directly in components, dictionaries, or schemas. Without them, the page will show placeholder text, broken links, or fail validation.

---

### C-01 · Real Phone Number

**Where needed:** `common.phone` (CONTENT_ARCHITECTURE.md), Header, Footer, Contact CTA, Sticky CTA bar, `tel:` link in Hero, PhoneLink component.

**Current state:** `+998 XX XXX-XX-XX` is a placeholder across all dictionaries and wireframes.

**Action:** Provide the clinic's main contact number. Format: `+998 XX XXX-XX-XX`. This single value populates all three locales and all instances.

---

### C-02 · Real Clinic Address

**Where needed:** `common.address` (CONTENT_ARCHITECTURE.md), Footer, Contact CTA, JSON-LD `LocalBusiness` / `MedicalClinic` schemas, Google Maps embed.

**Current state:** `Toshkent, [Manzil]` / `Ташкент, [Адрес]` / `Tashkent, [Address]` across all three locales.

**Action:** Provide the full street address in all three languages (street, district, city, postcode if applicable).

---

### C-03 · Verified Success Rate (65%)

**Where needed:** Hero trust micro-strip, TrustStats section, FAQ `faq.successRate.answer`, meta description, JSON-LD `AggregateRating`.

**Current state:** `65%` is used throughout as a placeholder figure.

**Risk:** PRD §10 and §20 require stats to be "truthful and sourced." Launching with an unverified number violates the PRD, creates legal liability, and risks Google's medical content quality standards.

**Action:** Obtain written documentation of this figure from the clinic's own records (IVF cycles per year, live births, or clinical pregnancy rate). Confirm whether the 65% is a clinical pregnancy rate, live birth rate, or per-transfer rate — and specify in copy. If the real figure is different, update all occurrences.

---

### C-04 · Verified Babies Born Statistic (10,000+)

**Where needed:** Hero trust micro-strip, TrustStats (`stats.babiesBorn`), Success Stories subheading.

**Current state:** `10,000+` / `10 000+` used as a placeholder.

**Risk:** Same as C-03. A reproductive medicine clinic claiming 10,000+ babies born is a major credibility claim. If inaccurate, it is misleading and potentially illegal under Uzbekistan consumer protection law.

**Action:** Confirm the real number from clinic records. If the figure is lower, use an honest number. If higher, update accordingly.

---

### C-05 · Verified Years of Experience (15+) and Doctor Count (20+)

**Where needed:** TrustStats section, Problem & Solution section.

**Current state:** `15+` years and `20+` international doctors are placeholders.

**Action:** Confirm founding year → calculate years. Confirm current count of qualified international-standard doctors. "International" must have a clear definition (trained abroad, certified by international bodies, or dual-licensed).

---

### C-06 · Doctor Names, Specialties, and Credentials

**Where needed:** Doctors section (`DoctorCard`), JSON-LD `Physician` schema.

**Current state:** All doctor cards show `Dr. [Name]` with placeholder specialties (Reproduktolog, Embriolog, Urolog-androlog, Genetik) and placeholder countries/years.

**Action:** Provide for each doctor (minimum 3, ideally 4–6):
- Full name (in UZ, RU, and EN spellings if applicable)
- Specialty / role title (in UZ / RU / EN)
- Medical credentials (degrees, certifications, board memberships)
- Years of experience (number)
- Country of training or international certification
- Optional: institution name

---

### C-07 · Doctor Photos

**Where needed:** `DoctorCard` (photo prop, `next/image` src).

**Current state:** No photos provided. Wireframes show `{ photo — circle crop }` placeholders.

**Action:** Provide professional portrait photos for each doctor. Requirements:
- Minimum resolution: 400×400px (displayed as circular crop)
- Preferred format: AVIF/WebP or high-quality JPEG
- Background: clean, professional (white or neutral preferred)
- Expression: warm, approachable — not clinical-cold
- One photo per doctor matching the names provided in C-06

---

### C-08 · Hero Image

**Where needed:** Hero section (`next/image` with `priority` for LCP).

**Current state:** `{ Hero image: warm couple / family, rounded corners }` is a wireframe placeholder.

**Action:** Provide 1 premium lifestyle photograph. Requirements:
- Subject: warm, hopeful imagery — couple, family with baby, or similar; diverse and representative of the target audience
- Resolution: minimum 1200×800px, ideally 2400×1600px or larger
- Format: high-quality JPEG or PNG (will be converted to AVIF/WebP)
- Tone: warm, soft, premium medical — NOT clinical stock imagery
- Consent: if real patients, written media consent required; licensed stock is acceptable

---

### C-09 · WhatsApp Number / Deep Link URL

**Where needed:** `MessagingLink` component (`href` prop), Footer, Contact CTA.

**Current state:** No WhatsApp number or URL exists in any document. `common.ctaWhatsapp` keys exist in the dictionary but no link target is defined.

**Action:** Provide the WhatsApp Business number for the clinic. The implementation will generate: `https://wa.me/998XXXXXXXXX?text=...`

---

### C-10 · Telegram Handle / Deep Link URL

**Where needed:** `MessagingLink` component (`href` prop), Footer, Contact CTA.

**Current state:** Same as C-09 — no Telegram handle or URL is defined.

**Action:** Provide the clinic's Telegram username or phone number. The implementation will generate: `https://t.me/USERNAME` or `https://t.me/+998XXXXXXXXX`

---

### C-11 · Google Maps Embed URL

**Where needed:** `MapEmbed` component (`src` prop). Contact CTA section.

**Current state:** `MapEmbed` component spec requires a `src` (Google Maps embed URL). No URL exists in any document.

**Action:** Generate a Google Maps embed URL for the clinic address. Go to Google Maps → find clinic → Share → Embed a map → copy the `src` URL from the iframe code. Add to environment config or a constants file.

---

### C-12 · Logo (SVG + PNG)

**Where needed:** Header, Footer, OG image, potentially JSON-LD.

**Current state:** `{Logo}` appears as a placeholder in all wireframes.

**Action:** Provide:
- SVG file (scalable, clean, vector-format logo)
- PNG fallback at minimum 200×60px, ideally 400×120px
- If color variants exist (dark/light), provide both

---

### C-13 · Supabase Project Credentials

**Where needed:** `.env.example` → production env vars: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.

**Current state:** PLAN.md Phase 5 Task 9 says "Create the Supabase project" — not done.

**Action:** Create a Supabase project, run the `leads` table migration from `supabase/migrations/0001_create_leads.sql`, and obtain the project URL and service-role key. Store in Vercel encrypted secrets.

---

### C-14 · Telegram Bot Credentials

**Where needed:** `.env.example` → production env vars: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.

**Current state:** PLAN.md Phase 5 Tasks 13–14 say "Create the Telegram bot" and "Create the private Telegram group" — not done.

**Action:** Create a bot via @BotFather, get the token. Create a private Telegram group, add the bot, get the chat ID. Store in Vercel encrypted secrets.

---

## Recommended — Significant Impact if Missing

These items are not technically blocking but will meaningfully hurt conversion, SEO, or legal compliance at launch.

---

### R-01 · Patient Testimonials (4–8 quotes)

**Where needed:** Testimonials section (`TestimonialCard`), optionally `AggregateRating` schema.

**Current state:** CONTENT_ARCHITECTURE.md has testimonial structure keys but no actual quotes. WIREFRAMES.md shows placeholder initials (Z.A., F.B., R.M., G.T., N.U., B.K.).

**Action:** Collect minimum 4 real patient quotes with:
- Written patient consent
- Patient initials only (for privacy)
- Optional: photo (requires explicit photo consent)
- Optional: star rating (1–5)
- Language of origin (will be translated for other locales if needed)

---

### R-02 · Patient Success Stories (2–4 narratives)

**Where needed:** Success Stories section (`StoryCard`).

**Current state:** WIREFRAMES.md shows example stories (`D.R. Toshkent`, `M.K. Samarqand`, etc.) as placeholders with invented outcomes.

**Action:** Collect 2–4 real patient success stories with:
- 2–3 sentence narrative
- Patient initials + city only
- Outcome (e.g., "Twin girls, 2024")
- Written informed consent
- Optional: family photo (with explicit photo consent)

**Note:** Stories without consent must not be published. If insufficient consented stories are available at launch, reduce to 2 stories rather than use fabricated content.

---

### R-03 · OG Image (1200×630px)

**Where needed:** Open Graph metadata, Twitter card. All three locale pages share this image.

**Current state:** `/og-image.jpg` is referenced in SITEMAP.md but does not exist.

**Action:** Create a branded 1200×630px image. Recommended content: Miracle IVF logo, brand blue background, warm imagery, no locale-specific text (shared across UZ/RU/EN). Must be placed at `/public/og-image.jpg`.

---

### R-04 · Google Analytics 4 Measurement ID

**Where needed:** `NEXT_PUBLIC_GA_ID` env var. Analytics script (GA4).

**Current state:** Placeholder in `.env.example`.

**Action:** Provide the GA4 Measurement ID (format: `G-XXXXXXXXXX`) from the clinic's or agency's Google Analytics account.

---

### R-05 · Meta Pixel ID

**Where needed:** `NEXT_PUBLIC_META_PIXEL_ID` env var. Meta Pixel script.

**Current state:** Placeholder in `.env.example`.

**Action:** Provide the Meta Pixel ID (format: 16-digit number) from the clinic's Facebook Ads account.

---

### R-06 · Social Media Profile URLs

**Where needed:** Footer social links (`MessagingLink` / anchor tags for Instagram, Facebook, YouTube).

**Current state:** `footer.social.instagram`, `footer.social.facebook`, `footer.social.youtube` keys exist in CONTENT_ARCHITECTURE.md but no URLs are provided.

**Action:** Provide verified public URLs for each active social profile. If a platform is not active, remove it from the footer rather than linking a dead or placeholder profile.

---

### R-07 · Privacy Policy Content

**Where needed:** Footer link (`footer.privacy`), consent management, analytics disclaimer.

**Current state:** Privacy Policy is linked in the footer but no page exists in the sitemap and no content is provided.

**Action:** Provide a privacy policy covering: what data is collected (form submissions), how it is stored (Supabase), how it is used (consultation follow-up), whether analytics cookies are used (GA4, Pixel), contact information for data requests. This page must be in all three languages (UZ/RU/EN) and reachable at a defined URL (e.g., `/uz/maxfiylik`, `/ru/konfidentsialnost`, `/en/privacy`).

---

### R-08 · Terms of Use Content

**Where needed:** Footer link (`footer.terms`).

**Current state:** Same as R-07 — linked but non-existent.

**Action:** Provide terms of use (or terms of service) for the website. These can be brief for a landing page but must be real and legally reviewed.

---

### R-09 · Real Aggregate Rating Data

**Where needed:** Testimonials section header (`4.9 / 5.0 · 200+ sharh`), potential JSON-LD `AggregateRating`.

**Current state:** `4.9 / 5.0` and `200+` reviews are presented in WIREFRAMES.md as part of the section heading. These are unverified numbers.

**Action:** Source from actual verified review platforms (Google Reviews, Yandex Maps, etc.). If no verified aggregate exists, remove the rating display from the section heading. Do not publish a fabricated rating.

---

### R-10 · Domain Confirmation

**Where needed:** Hreflang URLs in SITEMAP.md (`https://miracleivf.uz/...`), sitemap.xml, canonical URLs, Google Search Console.

**Current state:** `miracleivf.uz` is used throughout SITEMAP.md but is not confirmed as available or purchased.

**Action:** Confirm domain ownership. If the domain is different (or not yet purchased), all hardcoded URLs in hreflang, sitemap, and canonical implementations will be incorrect.

---

### R-11 · Vercel Project + Custom Domain Setup

**Where needed:** Phase 8 deployment.

**Current state:** PLAN.md Phase 8 assumes Vercel access but no project exists.

**Action:** Create a Vercel project linked to the repository, configure the custom domain, and set all environment variables as encrypted secrets before any production testing begins.

---

## Optional — V2 or Enhancement

These items improve quality but can be deferred without blocking a functional, credible launch.

---

### O-01 · Doctor Credential Badge Images / Certificate Scans

Scanned images or badge graphics for doctors' international certifications. Adds visual credibility to DoctorCard's `certBadge` display.

---

### O-02 · Country Flag Icons for Doctor Training Countries

Flag emoji or SVG icons for each doctor's country of training. Already referenced in WIREFRAMES.md Doctor section (🇩🇪 🇷🇺 🇮🇱 🇺🇿).

---

### O-03 · Clinic Interior / Facility Photos

Professional photos of the clinic interior, lab, or waiting room. Currently not referenced in any section but would support the premium medical aesthetic in the Hero or Problem/Solution section background.

---

### O-04 · Video Testimonials

Short (60–90 second) patient testimonial videos. PRD §18 (V2 scope) lists "Video success stories." GA4 event `video_play` is already defined. Can be added without code changes if testimonials carousel supports `<video>`.

---

### O-05 · Google Business Profile URL

Link from footer map embed or address block to the clinic's Google Business Profile. Supports local SEO and review collection.

---

### O-06 · YouTube Channel

If the clinic has educational or testimonial content on YouTube. Footer already has a YouTube icon placeholder in CONTENT_ARCHITECTURE.md.

---

### O-07 · Urgency Messaging (Limited Slots)

PRD §6 mentions "Limited consultation slots this week" used ethically only if true. This requires real availability data. Not possible to implement without a booking system integration. Omit for MVP.

---

## Content Gap Summary

| Class | Count | Blocks Launch |
|---|---|---|
| Critical | 14 items | Yes — all required before go-live |
| Recommended | 11 items | No — but impact is high |
| Optional | 7 items | No — V2 or enhancement |

**Minimum content required to begin implementation safely:**
- C-12 (Logo) — needed on Day 1 for Header/Footer dev
- C-06 (Doctor names/specialties in text) — needed for Doctors section
- All other Critical items — needed before QA and launch
