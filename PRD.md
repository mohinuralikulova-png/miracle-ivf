# Product Requirements Document (PRD)
## Miracle IVF — Conversion-Focused Landing Page

| | |
|---|---|
| **Product** | Miracle IVF Landing Page |
| **Owner** | Marketing / Growth |
| **Industry** | IVF / Fertility Clinic |
| **Region** | Tashkent & regional cities, Uzbekistan |
| **Document Version** | 1.0 |
| **Status** | Planning (pre-implementation) |
| **Last Updated** | 2026-06-16 |

---

## 1. Product Vision

Miracle IVF is an international IVF and fertility clinic operating in Uzbekistan. The landing page is the clinic's primary digital front door: a single, high-performance, emotionally resonant page whose sole job is to convert anxious, hopeful visitors into **booked consultations**.

The experience must feel like a **premium medical institution** — clinically trustworthy yet emotionally warm — so that a couple facing one of the hardest seasons of their life feels *understood, safe, and hopeful enough to take the next step*.

> **One-line vision:** Turn hope into a booked consultation by pairing world-class medical credibility with genuine emotional warmth.

---

## 2. Business Goal

**Primary business goal:** Increase qualified consultation bookings.

| Goal | Type | Measure |
|---|---|---|
| Increase consultation bookings | Primary | Form submissions / qualified leads per month |
| Build brand trust | Secondary | Bounce rate, scroll depth, time on page |
| Showcase international doctors | Secondary | Engagement with Doctors section |
| Explain the IVF process | Secondary | Engagement with Process section, FAQ opens |
| Display social proof | Secondary | Engagement with Success Stories & Testimonials |
| Improve conversion rate | Secondary | Visit → lead conversion % |

**Commercial rationale:** A fertility consultation is a high-consideration, high-value, emotionally-loaded decision. A small lift in conversion rate (e.g. 2% → 4%) can double lead volume without increasing ad spend, dramatically lowering cost-per-acquisition.

---

## 3. User Personas

> **Language note:** This product is **Uzbekistan-first**. Each persona has a preferred language; the page must serve **Uzbek (default), Russian, and English** equally. Persona language preference drives the default locale they should land on and the SEO we target.

### Persona A — "Hopeful Dilnoza" (Primary)
- **Age:** 29–38, woman, married
- **Location:** Tashkent or a regional city (Samarkand, Bukhara, Fergana)
- **Primary language:** **Uzbek** (may also read Russian). Lands on `/uz`.
- **Context:** Trying to conceive for 1–3+ years without success. Has seen local doctors, possibly tried other treatments.
- **Emotional state:** Anxious, hopeful, exhausted by uncertainty, sensitive to judgment, fears more disappointment.
- **Needs:** Reassurance in her own language, clarity about IVF, evidence it works, a low-pressure way to talk to an expert.
- **Decision drivers:** Doctor credibility, success rates, real stories, privacy, cost transparency.
- **Device:** Mostly mobile (Instagram / Google referral).

### Persona B — "Supportive Sardor" (Primary)
- **Age:** 32–45, man, husband/partner
- **Primary language:** **Uzbek or Russian.** Lands on `/uz` or `/ru`.
- **Context:** Researching on behalf of or alongside his wife; may need male-factor diagnosis himself.
- **Emotional state:** Practical, protective, wants facts, cost, and a clear plan.
- **Needs:** Process clarity, credentials, pricing signals, ease of booking.
- **Device:** Mobile and desktop.

### Persona C — "Russian-Speaking Couple" (Primary)
- **Primary language:** **Russian.** Lands on `/ru`.
- Urban (often Tashkent), comparing clinics, highly information-seeking; reads FAQ and process in detail before acting. Russian-language search and content are essential to reach them.

### Persona D — "International / Diaspora Patient" (Secondary)
- **Primary language:** **English** (expats, medical tourists, Uzbek diaspora abroad). Lands on `/en`.
- Evaluates "international standards" credibility; needs English content, clear process, and remote-friendly contact (WhatsApp/Telegram).

### Persona E — "Referred Patient" (Secondary)
- Arrives via word-of-mouth or doctor referral in any language. High intent — needs a fast, frictionless, localized booking path.

---

## 4. User Pain Points

| # | Pain Point | Design / Content Response |
|---|---|---|
| P1 | Fear of yet another failure/disappointment | Honest, warm tone; real success stories; transparent success rates |
| P2 | Confusion about what IVF actually involves | Clear step-by-step IVF Process section |
| P3 | Distrust of clinics / fear of being "sold to" | International doctor credentials, certifications, social proof |
| P4 | Embarrassment & privacy concerns (esp. male factor) | Discreet, respectful copy; privacy reassurance near forms |
| P5 | Cost uncertainty | Consultation-first CTA (low commitment); cost transparency in V2 |
| P6 | Language / accessibility (RU/UZ speakers) | Multi-language readiness; plain language; accessibility-first |
| P7 | "Will this work for *my* situation?" | Services mapped to specific conditions; FAQ addressing edge cases |
| P8 | Hard to reach / book | Sticky CTA, click-to-call, WhatsApp/Telegram, short form |

---

## 5. User Journey

```
Awareness → Interest → Consideration → Trust → Action → Post-Action
```

| Stage | User State | Page Element | Goal |
|---|---|---|---|
| **Awareness** | Lands from ad/search/social | Hero (headline + emotional image + primary CTA) | Communicate value in 3 seconds |
| **Interest** | "Can they help me?" | Trust Statistics, Problem & Solution | Establish relevance & credibility |
| **Consideration** | "What do they offer?" | Services, IVF Process | Educate, reduce uncertainty |
| **Trust** | "Can I believe them?" | Doctors, Success Stories, Testimonials | Build authority & emotional proof |
| **Action** | "I'm ready to ask" | Contact CTA / Booking form, sticky CTA | Capture the lead |
| **Post-Action** | "What happens next?" | Confirmation + reassurance message | Set expectations, reduce anxiety |

**Language entry & continuity:**
- Locale is resolved on entry from the URL (`/uz`, `/ru`, `/en`); a visible **header language switcher** lets users change at any point.
- Default locale is **Uzbek (`/uz`)**; the root `/` redirects to the best locale (Accept-Language → fallback `uz`).
- Switching language preserves the current section/path (e.g. `/ru/uslugi` ↔ `/uz/xizmatlar`) and the user's scroll intent.
- Every journey stage — including form, validation messages, confirmation, and reassurance microcopy — is fully localized in the active language.

**Micro-conversions along the way:** click-to-call, WhatsApp/Telegram tap, FAQ open, scroll to Doctors, video play, **language switch**.

---

## 6. Conversion Strategy

**Core principle:** Reduce *commitment cost* and *emotional risk* at every step.

1. **Low-friction primary CTA** — "Book a Free Consultation" (not "Buy", not "Start IVF").
2. **Repeated CTAs** — Hero, after Doctors, after Success Stories, Contact section, plus a **sticky mobile CTA bar**.
3. **Trust before ask** — Never request the form before establishing credibility (stats, doctors, stories).
4. **Social proof density** — Numbers (success rate, babies born, years), faces (doctors), and voices (testimonials).
5. **Emotional resonance** — Warmth in imagery and copy to convert *feeling* into *action*.
6. **Multiple contact modalities** — Form + phone + WhatsApp/Telegram to match local behavior.
7. **Short form** — Minimum viable fields (Name, Phone, optional message/service). Every extra field costs conversions.
8. **Reassurance microcopy** — "100% confidential", "No obligation", "We'll call within 24 hours".
9. **Urgency without pressure** — "Limited consultation slots this week" used ethically, only if true.
10. **Speed** — Fast load (Lighthouse 95+) directly protects conversion on mobile.

---

## 7. Information Architecture

**Localized routing (MVP):** the page is served under a locale segment. The root `/` redirects to a resolved locale; default is **Uzbek**.

```
/                       → redirect to resolved locale (default /uz)
/uz                     → Uzbek landing page (DEFAULT / source language)
/ru                     → Russian landing page
/en                     → English landing page

Localized section/anchor paths (slugs translated per locale), e.g.:
/uz/xizmatlar           /ru/uslugi            /en/services
/uz/shifokorlar         /ru/vrachi            /en/doctors
/uz/jarayon             /ru/protsess          /en/process
/uz/aloqa               /ru/kontakty          /en/contact
```

```
Landing Page (per locale: /[locale])
│
├── Sticky Header (logo, nav anchors, phone, LANGUAGE SWITCHER, primary CTA)
├── 1. Hero                  → Value prop + primary CTA + trust hint
├── 2. Trust Statistics      → Key numbers (success rate, babies, years, doctors)
├── 3. Problem & Solution    → Empathy + how Miracle solves it
├── 4. Services              → IVF, ICSI, IUI, egg freezing, male-factor, genetic testing
├── 5. Doctors               → International specialists, credentials
├── 6. IVF Process           → Step-by-step journey (1→6)
├── 7. Success Stories       → Outcome-focused narratives + numbers
├── 8. Testimonials          → Patient voices (quotes, optional photos)
├── 9. FAQ                   → Objection handling (accordion)
├── 10. Contact CTA          → Booking form + phone + messaging
├── 11. Footer               → NAP, hours, socials, legal, map
│
└── Sticky Mobile CTA Bar (Call / Book)
```

**Navigation:** Single-page anchored navigation (smooth scroll) **within each locale**. Locale is a route segment (`/[locale]`); the language switcher is in the header. No additional multi-page routing in MVP beyond locale segments.

---

## 8. Landing Page Structure (Section Specs)

### 8.1 Hero
- **Purpose:** Hook + value prop + first CTA.
- **Content:** Emotional headline, supportive subheadline, primary CTA ("Book a Free Consultation"), secondary CTA ("Call us"), trust micro-strip (e.g. "10,000+ families • 65% success rate • International doctors").
- **Visual:** Warm, premium imagery (family/parent-child or hopeful couple), soft gradient, rounded corners.

### 8.2 Trust Statistics
- **Purpose:** Instant credibility.
- **Content:** 3–4 animated counters: Success Rate %, Babies Born, Years of Experience, International Doctors. Each with a short label.

### 8.3 Problem & Solution
- **Purpose:** Empathy + positioning.
- **Content:** Left = the struggle (validated, non-judgmental). Right = Miracle's approach (international standards, personalized care, advanced tech).

### 8.4 Services
- **Purpose:** Show breadth & relevance.
- **Content:** Card grid: IVF, ICSI, IUI, Egg/Embryo Freezing, Male Infertility Diagnosis, Genetic Testing (PGT). Each card: icon, title, 1-line description, optional "Learn more".

### 8.5 Doctors
- **Purpose:** Human credibility.
- **Content:** Doctor cards: photo, name, specialty, credentials, years, optional country/training. "International" emphasized.

### 8.6 IVF Process
- **Purpose:** Demystify, reduce fear.
- **Content:** 5–6 numbered steps: Consultation → Diagnosis & Testing → Stimulation → Egg Retrieval & Fertilization → Embryo Transfer → Pregnancy Support. Each step: icon, title, short description.

### 8.7 Success Stories
- **Purpose:** Emotional + statistical proof.
- **Content:** 2–4 stories: short narrative, outcome, optional photo (consent required), supporting stat.

### 8.8 Testimonials
- **Purpose:** Peer trust.
- **Content:** Quote cards, patient name (or initials for privacy), optional photo, optional rating. Carousel on mobile.

### 8.9 FAQ
- **Purpose:** Objection handling.
- **Content:** Accordion: cost, success rates, timeline, pain, privacy, eligibility, male factor, regional patients. Each answer ends pointing softly toward consultation.

### 8.10 Contact CTA
- **Purpose:** Convert.
- **Content:** Booking form (Full Name, Phone — required; City, Service Interest, Message — optional), submit via Server Action, reassurance microcopy, alternative contacts (phone, WhatsApp/Telegram), clinic address + map.
- **On submit:** lead is delivered **instantly to a private Telegram group** via the Telegram Bot API (see §13 Lead Management, Notifications & Telegram Integration). Preferred language, submission timestamp, and page URL are captured automatically.

### 8.11 Footer
- **Purpose:** Trust + utility + Local SEO.
- **Content:** Logo, NAP (Name, Address, Phone), hours, social links, **language switcher (UZ/RU/EN — also present in header)**, privacy/terms, copyright, embedded map link.

---

## 9. SEO Strategy

> **Multilingual SEO is a core MVP concern.** The site ships three fully indexed locales (UZ, RU, EN) with localized URLs, per-locale metadata, and a complete hreflang map.

### 9.1 Technical SEO
- Server-rendered Next.js 15 (App Router), semantic HTML5 landmarks.
- Fast Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1).
- **Localized canonical URLs per locale** (`/uz`, `/ru`, `/en`); each locale self-canonical.
- Locale-aware `sitemap.xml` listing all three locales with `xhtml:link` alternates; `robots.txt`.
- Image optimization (`next/image`, AVIF/WebP), lazy loading below the fold.
- Mobile-first responsive, no layout shift.

### 9.2 On-Page SEO
- One H1 per locale page (Hero). Logical H2/H3 hierarchy per section.
- **Localized, keyword-aware copy authored per language** (translations, not machine-literal) — no keyword stuffing.
- Localized alt text on all meaningful images.
- Internal anchor links with descriptive, localized labels and **localized slugs** (`/uz/xizmatlar`, `/ru/uslugi`, `/en/services`).

### 9.3 Localized URLs & Hreflang (MVP)
- **URL strategy:** locale as the first path segment (`/uz`, `/ru`, `/en`); localized section slugs per locale.
- **Default locale:** Uzbek; root `/` redirects to resolved locale (Accept-Language → fallback `uz`).
- **Hreflang:** every page emits `rel="alternate" hreflang="uz"`, `"ru"`, `"en"`, plus `hreflang="x-default"` → `/uz`. Bidirectional, self-referencing alternates on all three.
- **Per-locale metadata:** separate title, description, OG, and canonical for UZ, RU, EN (see §9.5).
- **Locale signals:** `<html lang>` set per locale; `og:locale` + `og:locale:alternate` for the other two.

### 9.4 Schema Markup (JSON-LD)
- `MedicalClinic` / `MedicalBusiness`
- `Physician` for each doctor
- `FAQPage` for the FAQ section
- `LocalBusiness` (NAP, geo, opening hours)
- `BreadcrumbList` (where relevant)
- `Review` / `AggregateRating` (only if genuine & permitted)
- Schema text fields (e.g. `description`, FAQ Q&A) are localized per locale.

### 9.5 Per-Locale Metadata & Open Graph (MVP)
- **Separate metadata generated per locale** (UZ, RU, EN): localized title, description, canonical.
- OG title, description, image (1200×630), `og:locale` = `uz_UZ` / `ru_RU` / `en_US` with `og:locale:alternate` for the others.
- Twitter card metadata per locale.
- Localized OG image text where feasible (or a neutral brand OG shared across locales).

### 9.6 Local SEO
- Consistent NAP across all locales + footer + schema.
- Geo-targeted keywords per language (Tashkent / Toshkent / Ташкент, Uzbekistan, regional cities).
- Embedded Google Map; Google Business Profile alignment.
- Submit all three locales to Google Search Console; verify hreflang coverage.

### 9.7 Target Keyword Themes (per language)
- **Uzbek:** sun'iy urug'lantirish, EKO Toshkent, bepushtlik davolash, IVF klinika Toshkent, homiladorlik.
- **Russian:** ЭКО Ташкент, лечение бесплодия, ЭКО Узбекистан, ИКСИ клиника, криоконсервация.
- **English:** IVF clinic Tashkent, IVF Uzbekistan, fertility treatment, ICSI clinic, egg freezing, infertility treatment.

---

## 10. Content Strategy

- **Source language:** **Uzbek is the source language.** All copy is authored in Uzbek first; **Russian and English are translations** of the Uzbek source (human/professional translation, culturally adapted — not literal).
- **Language priority:** 1) Uzbek (default) · 2) Russian · 3) English. All three ship in MVP.
- **Tone:** Warm, respectful, hopeful, expert — never clinical-cold or sales-pushy — consistent across all three languages.
- **Reading level:** Plain language; avoid jargon, or explain it inline; idiomatic in each language.
- **Emotional arc:** Empathy → Possibility → Proof → Invitation.
- **No hardcoded content:** All copy lives in localized translation dictionaries (`uz.json`, `ru.json`, `en.json`) — never inline in components. **Uzbek is the canonical key set**; RU/EN mirror its keys.
- **Translation completeness:** Every UI string — CTAs, form fields & placeholders, validation messages, success/error states, reassurance microcopy, metadata, alt text — exists in all three languages. No missing keys at build.
- **Imagery:** Authentic, diverse, hopeful; respect privacy & consent; avoid clichéd stock when possible.
- **Compliance:** No false medical claims, no guarantees of pregnancy; success rates must be truthful and sourced — verified per language.

---

## 11. CTA Strategy

| Location | CTA Label | Type | Action |
|---|---|---|---|
| Header | Book Consultation | Primary | Scroll to form / open form |
| Hero | Book a Free Consultation | Primary | Scroll to form |
| Hero | Call Us | Secondary | `tel:` link |
| After Doctors | Meet Our Specialists → Book | Primary | Scroll to form |
| After Success Stories | Start Your Journey | Primary | Scroll to form |
| Contact section | Book My Consultation | Primary (submit) | Server Action submit |
| Sticky mobile bar | Call / Book | Primary | `tel:` + scroll to form |
| Footer | WhatsApp / Telegram | Secondary | Deep link |

- **Primary CTA color:** Accent `#F4B6C2` or Primary `#163C8C` with strong contrast (decided in Design System; must pass AA).
- **One dominant action per viewport.** Secondary actions visually subordinate.

---

## 12. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-1 | Single responsive landing page with all 11 sections | Must |
| FR-2 | Consultation booking form submitting via Next.js Server Action | Must |
| FR-3 | Form validation (client + server), required: Name, Phone | Must |
| FR-4 | Success & error states with reassuring confirmation | Must |
| FR-5 | Click-to-call (`tel:`) and WhatsApp/Telegram deep links | Must |
| FR-6 | Sticky header + sticky mobile CTA bar | Must |
| FR-7 | Smooth-scroll anchored navigation | Must |
| FR-8 | Animated trust statistics counters | Should |
| FR-9 | FAQ accordion (accessible) | Must |
| FR-10 | Testimonials carousel (accessible, keyboard-navigable) | Should |
| FR-11 | Analytics events (GA4) + Meta Pixel on key actions | Must |
| FR-12 | JSON-LD structured data injected | Must |
| FR-13 | OG/Twitter metadata + sitemap + robots | Must |
| FR-14 | Spam protection on form (honeypot + rate limit) | Must |
| FR-15 | Content sourced from localized dictionaries (no hardcoded copy in JSX) | Must |
| FR-16 | **Full multilingual support: UZ (default), RU, EN — all in MVP** | Must |
| FR-17 | **Locale-based routing: `/uz`, `/ru`, `/en` with localized section slugs** | Must |
| FR-18 | **Visible language switcher in header (and footer) preserving current path** | Must |
| FR-19 | **Root `/` redirects to resolved locale (Accept-Language → default `uz`)** | Must |
| FR-20 | **All CTAs, form fields, validation & confirmation messages localized in all 3 languages** | Must |
| FR-21 | **Per-locale metadata (title/description/OG/canonical) + complete hreflang map** | Must |
| FR-22 | **Type-safe translation keys; build fails on missing keys** | Must |
| FR-23 | **On form submit, INSERT the lead into Supabase (`leads` table) before any notification is sent** | Must |
| FR-24 | **If the DB write fails, abort — do not send Telegram, log the error, return failure to user** | Must |
| FR-25 | **After successful DB write, send an instant emoji-formatted notification to a private Telegram group** | Must |
| FR-26 | **If Telegram fails, the DB row remains; retry notification with backoff; log and track final failure** | Must |
| FR-27 | **Capture all lead fields: Full Name, Phone, City, Service Interest, Message, Language, Source Page, Timestamp** | Must |
| FR-28 | **RLS enabled on `leads` table; service-role key server-only; anon access disabled** | Must |
| FR-29 | **`LeadService` abstraction: storage + notification providers pluggable without changing form components** | Must |
| FR-30 | Embedded clinic map | Should |

---

## 13. Lead Management, Storage & Notifications (MVP)

> **Every consultation form submission must be durably stored AND trigger an instant notification.** Supabase is the persistent store; Telegram is the real-time notification channel. **Both are required.** The architecture is built on a `LeadService` abstraction so future destinations (Google Sheets, Airtable, CRM, email, WhatsApp) can be added without touching form components.

**Delivery flow (ordered, with failure semantics):**
```
Form Submission
  → Server Action (validate + sanitize)
    → Supabase INSERT (leads table)   ← MUST succeed first
      → Telegram sendMessage           ← fires only after DB success
        → Private Telegram Group

If DB write fails  → abort; do NOT send Telegram; log error; return error to user
If Telegram fails  → lead is safe in DB; retry notification; log; do not block user
```

### 13.1 Lead Management Requirements
| ID | Requirement |
|---|---|
| LM-1 | Every successful submission is **durably stored in Supabase** before any notification is sent. |
| LM-2 | Required lead fields: **Full Name, Phone Number**. |
| LM-3 | Optional/auto fields: **City, Service Interest, Message, Preferred Language (auto), Submission Timestamp (auto, server time, Asia/Tashkent), Page URL (auto)**. |
| LM-4 | Leads are validated & sanitized server-side before storage. |
| LM-5 | DB failure aborts the flow — no Telegram notification is sent; error is logged and returned to the user. |
| LM-6 | Telegram failure does NOT lose the lead — the DB row is the source of truth; notification is retried. |
| LM-7 | No lead is lost silently — all failures (DB or Telegram) are logged and surfaced to error tracking. |
| LM-8 | The `LeadService` abstraction decouples all storage and notification logic from form components. |

### 13.2 Database Storage Requirements

**Table: `leads`**
```sql
CREATE TABLE leads (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name        text        NOT NULL,
  phone            text        NOT NULL,
  city             text,
  service_interest text,
  message          text,
  language         text        NOT NULL,          -- uz | ru | en
  source_page      text        NOT NULL,          -- page URL at submission
  created_at       timestamptz NOT NULL DEFAULT now()
);
```

**Indexes:**
```sql
CREATE INDEX idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX idx_leads_language   ON leads (language);
```

**Access rules:**
- Writes use the **service-role key** (server-only, never client-exposed).
- Anon/public access to the `leads` table is disabled via Supabase RLS.
- Row Level Security is **enabled** on the table; only the service role can insert.

**Env vars (server-only):**
- `SUPABASE_URL` — project URL
- `SUPABASE_SERVICE_ROLE_KEY` — service-role key; **never in client bundle**

### 13.3 Notification Requirements
| ID | Requirement |
|---|---|
| NT-1 | Telegram notification is sent **after** the DB row is confirmed. |
| NT-2 | Message is **human-readable, clean, emoji-formatted** (template below). |
| NT-3 | All lead fields appear; empty optional fields render gracefully (e.g. "—"). |
| NT-4 | Timestamp is shown in Asia/Tashkent time in a readable format. |
| NT-5 | The user's confirmation UI is not blocked by Telegram latency — the DB write gates the user response; Telegram is fire-and-retry. |

**Telegram message template:**
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
{submissionTimestamp}

🔗 Page:
{pageUrl}
```

### 13.4 Telegram Integration Requirements
| ID | Requirement |
|---|---|
| TG-1 | Use the **Telegram Bot API** (`sendMessage`) from the server only; called after DB commit. |
| TG-2 | `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` come from env — **never hardcoded, never client-exposed**. |
| TG-3 | A dedicated bot posts into a **private Telegram group** that the clinic team is a member of. |
| TG-4 | **Retry with backoff** on transient failures; cap attempts; final failure is logged + tracked. |
| TG-5 | Escape user content for Telegram's parse mode; respect message-length limits. |
| TG-6 | No PII in analytics. PII goes only to Supabase (server) and Telegram (private group). |

### 13.5 Future-Ready Lead Architecture (`LeadService`)
- A single **`LeadService`** class (or module) owns the entire lead pipeline: validate → store → notify.
- Internally it uses a typed `LeadStorageProvider` (Supabase adapter in MVP) and one or more `LeadNotificationProvider`s (Telegram adapter in MVP).
- **Adding a new destination** — Google Sheets, Airtable, CRM, email, WhatsApp — means writing a new adapter and registering it in `LeadService`. **Zero changes to form components or the Server Action's public contract.**
- Form/UI code depends only on the typed `Lead` shape and the Server Action return type.

---

## 14. Non-Functional Requirements

| ID | Requirement | Target |
|---|---|---|
| NFR-1 | Performance | Lighthouse 95+ (Perf, A11y, Best Practices, SEO) |
| NFR-2 | Core Web Vitals | LCP < 2.5s, INP < 200ms, CLS < 0.1 |
| NFR-3 | TypeScript | Strict mode, no `any` |
| NFR-4 | Browser support | Latest 2 versions of major browsers + mobile Safari/Chrome |
| NFR-5 | Responsiveness | Mobile-first, 320px → 1920px |
| NFR-6 | Security | Input sanitization, no secrets in client, HTTPS, CSP-ready |
| NFR-7 | Privacy | Consent for analytics, privacy policy, data handling for leads |
| NFR-8 | Maintainability | Reusable components, clean architecture |
| NFR-9 | Reliability | Form submission resilient; graceful degradation if JS off (progressive enhancement) |
| NFR-10 | Hosting | Vercel, edge-optimized assets |

---

## 15. Accessibility Requirements (WCAG 2.1 AA)

- Color contrast ≥ 4.5:1 (text), ≥ 3:1 (large text / UI).
- Full keyboard operability; visible focus states.
- Semantic landmarks (`header`, `main`, `nav`, `section`, `footer`).
- All images have meaningful `alt` (or empty alt if decorative).
- Form fields with associated `<label>`, error messages tied via `aria-describedby`.
- Accordion & carousel built with proper ARIA roles/states, keyboard support.
- Respect `prefers-reduced-motion` for all animations.
- Logical heading order; skip-to-content link.
- Sufficient tap target size (≥ 44×44px) on mobile.
- Screen-reader-tested critical flow (read → book).

---

## 16. Analytics Requirements

### 16.1 Tools
- **Google Analytics 4** — traffic, engagement, conversions.
- **Meta Pixel** — ad attribution & retargeting.

### 16.2 Key Events
| Event | Trigger |
|---|---|
| `page_view` | Page load |
| `cta_click` | Any primary CTA click (with location param) |
| `call_click` | `tel:` link tap |
| `messaging_click` | WhatsApp/Telegram tap |
| `form_start` | First focus on form field |
| `generate_lead` / `Lead` | Successful form submission (GA4 + Pixel) |
| `faq_open` | FAQ item expanded |
| `scroll_depth` | 25/50/75/100% |
| `language_switch` | User changes locale (with from/to language params) |
| `video_play` | Story/testimonial video (if any) |

### 16.3 Requirements
- Consent-aware loading (no tracking before consent where required).
- No PII sent to analytics.
- Conversion (`generate_lead`) is the north-star event.

---

## 17. MVP Scope

**In scope:**
- All 11 sections, fully responsive, mobile-first.
- **Full multilingual UI & content in three languages — Uzbek (default), Russian, English** (`next-intl`, locale routing, dictionaries).
- **Locale-based routing (`/uz`, `/ru`, `/en`) with localized slugs, header/footer language switcher, root redirect to default locale.**
- **Per-locale metadata, hreflang map, localized canonical URLs, locale-aware sitemap.**
- **Localized CTAs, form, validation messages, confirmation, and reassurance microcopy in all 3 languages.**
- Booking form via Server Action (Full Name, Phone required; City, Service, Message optional) + validation + confirmation.
- **Lead storage in Supabase** (`leads` table, RLS enabled, service-role key server-only).
- **Instant Telegram notification** (emoji-formatted, all lead fields) sent after confirmed DB write; retry + logging on failure; DB row is the source of truth if Telegram fails.
- Both built behind a **`LeadService` abstraction** (storage provider + notification provider) so Google Sheets, Airtable, CRM, email, WhatsApp can be added without touching form components.
- Phone + WhatsApp/Telegram links, sticky CTAs.
- GA4 + Meta Pixel with core events (incl. `language_switch`).
- Full technical + on-page SEO, JSON-LD (localized), OG, sitemap, robots.
- Accessibility AA.
- Uzbek source content with professional RU/EN translations.
- Lighthouse 95+.
- Deploy on Vercel.

**Out of scope (MVP):** online payments, patient portal, appointment-time calendar booking, blog, additional languages beyond UZ/RU/EN, CRM/Sheets/Airtable/Supabase delivery providers (architecture is ready for them, but only the Telegram provider ships in MVP).

---

## 18. V2 Scope

- Additional languages beyond UZ/RU/EN (e.g. Kazakh) and per-locale blog content.
- Calendar-based appointment scheduling.
- Additional lead-delivery providers via the existing abstraction: **Google Sheets, Airtable, Supabase CRM**, WhatsApp Business API (fan-out alongside Telegram).
- Cost & financing transparency section / calculator.
- Blog / educational content hub for SEO.
- Live chat.
- A/B testing framework on hero & CTAs.
- Verified review integration (Google reviews).
- Video success stories.

---

## 19. Success Metrics (KPIs)

| KPI | Definition | Target (initial) |
|---|---|---|
| **Primary: Conversion Rate** | Sessions → lead submissions | ≥ 4% |
| Lead Volume | Qualified consultation requests / month | Establish baseline, then +20% MoM |
| Cost per Lead | Ad spend / leads | Decrease over time |
| Bounce Rate | Single-interaction sessions | < 45% |
| Avg. Engagement Time | GA4 engagement | > 60s |
| Scroll Depth to Form | % reaching Contact section | > 40% |
| Lighthouse Scores | All four categories | ≥ 95 |
| Core Web Vitals | LCP/INP/CLS | All "Good" |
| Call/Message Clicks | Alternative conversions | Tracked & growing |

---

## 20. Risks & Assumptions

| Risk | Mitigation |
|---|---|
| Medical claims compliance | Truthful, sourced stats; legal review of copy |
| Privacy of patient stories | Explicit consent; allow initials/no-photo |
| Spam form submissions | Honeypot + rate limiting + server validation |
| Supabase write failure / lead loss | DB is the source of truth; failure aborts the full flow; logged + error tracking; user sees error |
| Telegram delivery failure | Lead is safe in DB; retry with backoff; logged + tracked; does not block user confirmation |
| Supabase service-role key leakage | Server-only env var; RLS enforced; never in client bundle or repo |
| Bot token / chat ID leakage | Env vars only; server-only; never in client bundle or repo |
| Local payment/contact habits | Prioritize phone + WhatsApp/Telegram |
| Multilingual need underestimated | i18n-ready architecture from day one |
| Real content not ready at build | Structured placeholder content, easily swapped |

**Assumptions:** Clinic provides real stats, doctor info, and testimonials with consent; brand assets (logo, photos) available; domain & Vercel access provided; analytics IDs supplied before launch.
