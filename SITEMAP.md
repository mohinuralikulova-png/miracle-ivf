# SITEMAP.md — Miracle IVF Landing Page

> Complete page architecture, route hierarchy, and navigation structure for all three locales.

---

## 1. Route Architecture

### Root Redirect

```
/  →  302 redirect → resolved locale (Accept-Language header → fallback /uz)
```

### Locale Routes (MVP)

```
/uz          Uzbek landing page       DEFAULT locale / source language
/ru          Russian landing page
/en          English landing page
```

### Localized Section Slugs

Section slugs are translated per locale. The slug maps to an `id` anchor on the single-page layout.

| Section           | /uz slug           | /ru slug          | /en slug          |
|-------------------|--------------------|-------------------|-------------------|
| Hero              | (root /uz)         | (root /ru)        | (root /en)        |
| Trust Statistics  | #statistika        | #statistika       | #statistics       |
| Problem/Solution  | #muammo-yechim     | #problema-reshenie| #problem-solution |
| Services          | /uz/xizmatlar      | /ru/uslugi        | /en/services      |
| Doctors           | /uz/shifokorlar    | /ru/vrachi        | /en/doctors       |
| IVF Process       | /uz/jarayon        | /ru/protsess      | /en/process       |
| Success Stories   | /uz/muvaffaqiyat   | /ru/istorii       | /en/success       |
| Testimonials      | #fikrlar           | #otzyvy           | #testimonials     |
| FAQ               | /uz/savol-javob    | /ru/voprosy       | /en/faq           |
| Contact / Booking | /uz/aloqa          | /ru/kontakty      | /en/contact       |

> **Implementation note:** Sections with named slugs resolve as anchor scrolls (`#`) within the single locale page. The localized pathname variants (`/uz/xizmatlar`, etc.) are registered in the `next-intl` routing config and resolve to the same page with the viewport scrolled to the relevant section. This supports deep linking and SEO-crawlable section URLs.

---

## 2. Full URL Map

```
/                               → redirect to /uz (or Accept-Language match)

── UZBEK (/uz) ─────────────────────────────────────────────────────────────
/uz                             Landing page (all sections, UZ locale)
/uz/xizmatlar                   → /uz#xizmatlar  (Services section anchor)
/uz/shifokorlar                 → /uz#shifokorlar (Doctors section anchor)
/uz/jarayon                     → /uz#jarayon    (IVF Process anchor)
/uz/muvaffaqiyat                → /uz#muvaffaqiyat (Success Stories anchor)
/uz/savol-javob                 → /uz#savol-javob (FAQ anchor)
/uz/aloqa                       → /uz#aloqa      (Contact CTA anchor)

── RUSSIAN (/ru) ────────────────────────────────────────────────────────────
/ru                             Landing page (all sections, RU locale)
/ru/uslugi                      → /ru#uslugi     (Services section anchor)
/ru/vrachi                      → /ru#vrachi     (Doctors section anchor)
/ru/protsess                    → /ru#protsess   (IVF Process anchor)
/ru/istorii                     → /ru#istorii    (Success Stories anchor)
/ru/voprosy                     → /ru#voprosy    (FAQ anchor)
/ru/kontakty                    → /ru#kontakty   (Contact CTA anchor)

── ENGLISH (/en) ────────────────────────────────────────────────────────────
/en                             Landing page (all sections, EN locale)
/en/services                    → /en#services   (Services section anchor)
/en/doctors                     → /en#doctors    (Doctors section anchor)
/en/process                     → /en#process    (IVF Process anchor)
/en/success                     → /en#success    (Success Stories anchor)
/en/faq                         → /en#faq        (FAQ anchor)
/en/contact                     → /en#contact    (Contact CTA anchor)

── SYSTEM ───────────────────────────────────────────────────────────────────
/sitemap.xml                    Locale-aware sitemap (all 3 locales + alternates)
/robots.txt                     Robots file (allow all, sitemap pointer)
```

---

## 3. Page Structure — Section Hierarchy

Each locale page (`/uz`, `/ru`, `/en`) renders the following sections in order:

```
[locale] Page
│
├── 0.  Sticky Header
│       ├── Logo
│       ├── Navigation Links (smooth scroll anchors)
│       │   ├── Services  (/[locale]/xizmatlar | uslugi | services)
│       │   ├── Doctors   (/[locale]/shifokorlar | vrachi | doctors)
│       │   ├── Process   (/[locale]/jarayon | protsess | process)
│       │   ├── Success   (/[locale]/muvaffaqiyat | istorii | success)
│       │   └── Contact   (/[locale]/aloqa | kontakty | contact)
│       ├── Phone Number (click-to-call)
│       ├── Language Switcher (UZ | RU | EN)
│       └── Primary CTA Button → scroll to #contact
│
├── 1.  Hero
│       ├── Emotional headline (H1)
│       ├── Supporting subheadline
│       ├── Trust micro-strip (3 key stats inline)
│       ├── Primary CTA → scroll to #contact
│       └── Secondary CTA → tel: link
│
├── 2.  Trust Statistics
│       ├── Stat: Success Rate %
│       ├── Stat: Babies Born
│       ├── Stat: Years of Experience
│       └── Stat: International Doctors
│
├── 3.  Problem & Solution
│       ├── Left — The Struggle (empathy block)
│       └── Right — Miracle's Approach (solution block)
│
├── 4.  Services            [id: xizmatlar | uslugi | services]
│       ├── Section heading + subheading
│       ├── ServiceCard: IVF (EKO)
│       ├── ServiceCard: ICSI (IKSI)
│       ├── ServiceCard: IUI
│       ├── ServiceCard: Egg/Embryo Freezing
│       ├── ServiceCard: Male Infertility
│       └── ServiceCard: Genetic Testing (PGT)
│
├── 5.  Doctors             [id: shifokorlar | vrachi | doctors]
│       ├── Section heading + subheading
│       ├── DoctorCard × N (international specialists)
│       └── Inline CTA → scroll to #contact
│
├── 6.  IVF Process         [id: jarayon | protsess | process]
│       ├── Section heading + subheading
│       ├── Step 1: Consultation
│       ├── Step 2: Diagnosis & Testing
│       ├── Step 3: Stimulation
│       ├── Step 4: Egg Retrieval & Fertilization
│       ├── Step 5: Embryo Transfer
│       └── Step 6: Pregnancy Support
│
├── 7.  Success Stories     [id: muvaffaqiyat | istorii | success]
│       ├── Section heading + subheading
│       ├── StoryCard × 2–4
│       └── Inline CTA → scroll to #contact
│
├── 8.  Testimonials
│       ├── Section heading
│       └── TestimonialCard × N (carousel on mobile, grid on desktop)
│
├── 9.  FAQ                 [id: savol-javob | voprosy | faq]
│       ├── Section heading + subheading
│       └── FaqAccordion (8–10 items)
│
├── 10. Contact CTA         [id: aloqa | kontakty | contact]
│       ├── Section heading + subheading
│       ├── Reassurance microcopy
│       ├── Booking Form
│       │   ├── Full Name (required)
│       │   ├── Phone Number (required)
│       │   ├── City (optional)
│       │   ├── Service Interest (optional select)
│       │   ├── Message (optional textarea)
│       │   ├── Honeypot (hidden, anti-spam)
│       │   └── Submit button
│       ├── Alternative contacts
│       │   ├── Phone link (click-to-call)
│       │   ├── WhatsApp deep link
│       │   └── Telegram deep link
│       └── Clinic address + map embed
│
├── 11. Footer
│       ├── Logo
│       ├── NAP (Name, Address, Phone)
│       ├── Opening Hours
│       ├── Navigation links (mirrors header)
│       ├── Social media links
│       ├── Language Switcher (UZ | RU | EN)
│       ├── Privacy Policy link
│       ├── Terms link
│       └── Copyright
│
└── Sticky Mobile CTA Bar  (fixed bottom, mobile only)
        ├── Call button → tel:
        └── Book button → scroll to #contact
```

---

## 4. Navigation Hierarchy

### Primary Navigation (Header)

| Label (UZ)        | Label (RU)        | Label (EN)         | Target                      |
|-------------------|-------------------|--------------------|-----------------------------|
| Xizmatlar         | Услуги            | Services           | #xizmatlar / #uslugi / #services |
| Shifokorlar       | Врачи             | Doctors            | #shifokorlar / #vrachi / #doctors |
| Jarayon           | Процесс           | Process            | #jarayon / #protsess / #process |
| Muvaffaqiyatlar   | Истории успеха    | Success Stories    | #muvaffaqiyat / #istorii / #success |
| Bog'lanish        | Контакты          | Contact            | #aloqa / #kontakty / #contact |

### Language Switcher

```
UZ ← (active on /uz)
RU ← (active on /ru)
EN ← (active on /en)
```

Preserves current scroll section across locale switches via localized pathname mapping.

### CTA Buttons (Header)

| Locale | CTA Label                  |
|--------|---------------------------|
| UZ     | Maslahat olish             |
| RU     | Записаться                 |
| EN     | Book Consultation          |

---

## 5. Hreflang Map

Every locale page emits the following alternates in `<head>`:

```html
<!-- On /uz -->
<link rel="alternate" hreflang="uz"        href="https://miracleivf.uz/uz" />
<link rel="alternate" hreflang="ru"        href="https://miracleivf.uz/ru" />
<link rel="alternate" hreflang="en"        href="https://miracleivf.uz/en" />
<link rel="alternate" hreflang="x-default" href="https://miracleivf.uz/uz" />

<!-- On /ru (same links, self-reference on ru) -->
<!-- On /en (same links, self-reference on en) -->
```

---

## 6. Sitemap Structure (sitemap.xml)

```xml
<urlset>
  <!-- /uz -->
  <url>
    <loc>https://miracleivf.uz/uz</loc>
    <xhtml:link rel="alternate" hreflang="uz" href=".../uz" />
    <xhtml:link rel="alternate" hreflang="ru" href=".../ru" />
    <xhtml:link rel="alternate" hreflang="en" href=".../en" />
    <xhtml:link rel="alternate" hreflang="x-default" href=".../uz" />
    <priority>1.0</priority>
  </url>

  <!-- /ru -->
  <url>
    <loc>https://miracleivf.uz/ru</loc>
    ...alternates...
    <priority>0.9</priority>
  </url>

  <!-- /en -->
  <url>
    <loc>https://miracleivf.uz/en</loc>
    ...alternates...
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## 7. robots.txt

```
User-agent: *
Allow: /

Sitemap: https://miracleivf.uz/sitemap.xml
```

---

## 8. Redirects & Middleware Logic

```
Request: /
  → Read Accept-Language header
  → Match against [uz, ru, en]
  → Redirect to /uz (fallback) or matched locale

Request: /uz/xizmatlar
  → Serve /uz page, client scrolls to #xizmatlar

Request: /ru/uslugi
  → Serve /ru page, client scrolls to #uslugi

Language Switcher click on /uz/xizmatlar → switch to RU
  → Navigate to /ru/uslugi (same section, Russian slug)
  → Fire analytics event: language_switch { from: 'uz', to: 'ru' }
```

---

## 9. JSON-LD Schema Coverage (per locale)

| Schema Type            | Location              | Notes                                       |
|------------------------|-----------------------|---------------------------------------------|
| `MedicalClinic`        | `<head>` every locale | Localized name, description, address, phone |
| `LocalBusiness`        | `<head>` every locale | NAP, hours, geo coordinates                 |
| `Physician`            | Doctors section       | One schema per doctor card, localized        |
| `FAQPage`              | FAQ section           | All Q&A pairs, localized per locale          |
| `AggregateRating`      | Hero / TrustStats     | Only if genuine; sourced ratings             |
| `BreadcrumbList`       | Optional              | For section deep-link URLs                  |

---

## 10. OG / Social Metadata (per locale)

| Meta tag               | UZ value                         | RU value                         | EN value                         |
|------------------------|----------------------------------|----------------------------------|----------------------------------|
| `og:locale`            | `uz_UZ`                          | `ru_RU`                          | `en_US`                          |
| `og:locale:alternate`  | `ru_RU`, `en_US`                 | `uz_UZ`, `en_US`                 | `uz_UZ`, `ru_RU`                 |
| `og:type`              | `website`                        | `website`                        | `website`                        |
| `og:image`             | `/og-image.jpg` (1200×630)       | `/og-image.jpg` (1200×630)       | `/og-image.jpg` (1200×630)       |
| `twitter:card`         | `summary_large_image`            | `summary_large_image`            | `summary_large_image`            |
