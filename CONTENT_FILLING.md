# Miracle IVF — Content & Credentials Handoff

**Document purpose:** Every placeholder, missing asset, and unconfigured credential
that must be supplied before the website can go live. Send this document to Miracle
IVF management and collect all items before deploying to production.

**How to use this document**

1. Work through each section top to bottom.
2. Items marked **Required** will cause broken links, wrong data, or a non-functional
   form on the live site. They block launch.
3. Items marked **Recommended** degrade gracefully (placeholder UI renders instead)
   but should be resolved shortly after launch for a complete experience.
4. Return completed values to the development team with the exact file and key
   references shown in each row.

---

## 1. Clinic Information

These values appear in the page `<title>`, Open Graph tags, structured data (Google
rich results), and footer copyright. They are already correct — verify and confirm.

| # | Category | File | Key | Current value | Real value required | Priority |
|---|---|---|---|---|---|---|
| 1.1 | Clinic name | `src/messages/uz.json` | `common.clinicName` | `Miracle IVF` | Confirm legal trading name | Confirm |
| 1.2 | Clinic name | `src/messages/ru.json` | `common.clinicName` | `Miracle IVF` | Same | Confirm |
| 1.3 | Clinic name | `src/messages/en.json` | `common.clinicName` | `Miracle IVF` | Same | Confirm |

---

## 2. Contact Information

These values appear in every CTA button, the Contact section, the sticky mobile bar,
the page header, and the Google `MedicalClinic` structured data block that powers
Google Search rich results.

### 2a. Phone Number

| # | File | Key | Current value | Real value required | Priority |
|---|---|---|---|---|---|
| 2.1 | `src/messages/uz.json` | `common.phone` | `+998 XX XXX-XX-XX` | Real clinic phone number, e.g. `+998 71 234-56-78` | **Required** |
| 2.2 | `src/messages/ru.json` | `common.phone` | `+998 XX XXX-XX-XX` | Same number | **Required** |
| 2.3 | `src/messages/en.json` | `common.phone` | `+998 XX XXX-XX-XX` | Same number | **Required** |

**Format rules:** Include country code `+998`. Spaces and hyphens are allowed.
The app strips non-digit characters when generating `tel:` links automatically.

### 2b. Physical Address

Appears in the Contact section address block and in Google structured data.
Each locale should contain the address in the appropriate language/script.

| # | File | Key | Current value | Real value required | Priority |
|---|---|---|---|---|---|
| 2.4 | `src/messages/uz.json` | `common.address` | `Toshkent, [Manzil]` | Full street address in Uzbek, e.g. `Toshkent sh., Chilonzor tumani, Bunyodkor ko'chasi 1` | **Required** |
| 2.5 | `src/messages/ru.json` | `common.address` | `Ташкент, [Адрес]` | Same address in Russian, e.g. `г. Ташкент, Чиланзарский район, ул. Бунёдкор, 1` | **Required** |
| 2.6 | `src/messages/en.json` | `common.address` | `Tashkent, [Address]` | Same address in English, e.g. `1 Bunyodkor Street, Chilanzar District, Tashkent` | **Required** |

### 2c. WhatsApp

The button opens a WhatsApp chat. The current number `998000000000` is a dummy —
the chat window opens but no recipient exists.

| # | File | Key | Current value | Real value required | Priority |
|---|---|---|---|---|---|
| 2.7 | `src/messages/uz.json` | `common.whatsappUrl` | `https://wa.me/998000000000` | `https://wa.me/998XXXXXXXXX` — real number, no spaces or hyphens, e.g. `https://wa.me/998712345678` | **Required** |
| 2.8 | `src/messages/ru.json` | `common.whatsappUrl` | `https://wa.me/998000000000` | Same URL | **Required** |
| 2.9 | `src/messages/en.json` | `common.whatsappUrl` | `https://wa.me/998000000000` | Same URL | **Required** |

### 2d. Telegram

The `@miracleivf` handle may or may not be the clinic's real channel. Verify it is
active and controlled by the clinic.

| # | File | Key | Current value | Real value required | Priority |
|---|---|---|---|---|---|
| 2.10 | `src/messages/uz.json` | `common.telegramUrl` | `https://t.me/miracleivf` | Confirm handle is correct; update if different, e.g. `https://t.me/miracle_ivf_uz` | **Required** |
| 2.11 | `src/messages/ru.json` | `common.telegramUrl` | `https://t.me/miracleivf` | Same | **Required** |
| 2.12 | `src/messages/en.json` | `common.telegramUrl` | `https://t.me/miracleivf` | Same | **Required** |

### 2e. Opening Hours

Currently shown in the Contact section and footer. Verify the times are correct.

| # | File | Key | Current value | Real value required | Priority |
|---|---|---|---|---|---|
| 2.13 | `src/messages/uz.json` | `contact.hours` | `Du–Ju: 9:00–18:00, Sha: 9:00–14:00` | Confirm or correct | Confirm |
| 2.14 | `src/messages/ru.json` | `contact.hours` | `Пн–Пт: 9:00–18:00, Сб: 9:00–14:00` | Confirm or correct | Confirm |
| 2.15 | `src/messages/en.json` | `contact.hours` | `Mon–Fri: 9:00–18:00, Sat: 9:00–14:00` | Confirm or correct | Confirm |

---

## 3. Social Links

The footer contains label keys for Instagram, Facebook, and YouTube. URL keys do not
yet exist in the dictionaries — the development team will add them once the real URLs
are provided. Supply whichever platforms the clinic actively uses; unused platforms
can be omitted.

| # | Platform | Real URL required | Priority |
|---|---|---|---|
| 3.1 | Instagram | Full profile URL, e.g. `https://www.instagram.com/miracle.ivf.uz` | Recommended |
| 3.2 | Facebook | Full page URL, e.g. `https://www.facebook.com/miracleivf` | Recommended |
| 3.3 | YouTube | Full channel URL, e.g. `https://www.youtube.com/@miracleivf` | Recommended |

**Note:** If any platform has no active account, inform the development team so the
link is removed rather than left as a dead placeholder.

---

## 4. Maps

Two separate items: the link used for the "View on map" button, and the embedded map
that appears inside the Contact section.

### 4a. Google Maps Link

| # | File | Key | Current value | Real value required | Priority |
|---|---|---|---|---|---|
| 4.1 | `src/messages/uz.json` | `common.mapsUrl` | `https://maps.google.com/?q=Miracle+IVF+Tashkent` | Permanent Google Maps link pinned to the exact clinic location. **How to get it:** open the clinic pin in Google Maps → click Share → Copy link. Result looks like `https://maps.app.goo.gl/XXXXXXXXXX` or contains a `cid=` parameter. | **Required** |
| 4.2 | `src/messages/ru.json` | `common.mapsUrl` | `https://maps.google.com/?q=Miracle+IVF+Tashkent` | Same link (all locales share one physical location) | **Required** |
| 4.3 | `src/messages/en.json` | `common.mapsUrl` | `https://maps.google.com/?q=Miracle+IVF+Tashkent` | Same link | **Required** |

### 4b. Embedded Map iframe

The Contact section currently shows a styled placeholder box. The development team
will replace it with a real embedded map once the embed code is provided.

| # | What to provide | How to get it | Priority |
|---|---|---|---|
| 4.4 | Google Maps embed `<iframe>` code or Embed API URL for the clinic location | Open Google Maps → find the clinic pin → Share → Embed a map → Copy HTML. The `src` URL will look like `https://www.google.com/maps/embed?pb=!1m18!...` | Recommended |

---

## 5. Doctors

Photos are managed in a TypeScript config file — no translation keys involved.
Each photo must be provided as a high-quality image file. The development team will
place the file in `public/images/doctors/` and update the config.

**Photo specifications:**
- Format: JPEG or WebP
- Minimum size: 600 × 800 px (portrait orientation preferred)
- Style: professional headshot, neutral or clinic background, good lighting
- One file per doctor

| # | Doctor | Config entry | Photo file to provide | Priority |
|---|---|---|---|---|
| 5.1 | Dr. Inamdar | `src/lib/config/doctors.ts` — `{ id: 'inamdar' }` | `inamdar.jpg` (or `.webp`) | Recommended |
| 5.2 | Dr. Meruert Beysenbi | `src/lib/config/doctors.ts` — `{ id: 'beysenbi' }` | `beysenbi.jpg` (or `.webp`) | Recommended |
| 5.3 | Dr. V.V. Benko | `src/lib/config/doctors.ts` — `{ id: 'benko' }` | `benko.jpg` (or `.webp`) | Recommended |

---

## 6. Hero Assets

The main hero image is the most important visual on the page and the primary
performance metric (LCP — Largest Contentful Paint). Currently a CSS gradient
placeholder renders instead.

| # | File | Field | Current value | Real value required | Priority |
|---|---|---|---|---|---|
| 6.1 | `src/sections/Hero.tsx` | `HAS_HERO_IMAGE` (line 10) | `false` | Set to `true` by the development team once the image file is in place — **no action needed from content team beyond providing the file** | **Required** |
| 6.2 | `public/images/hero.jpg` | (file does not exist) | (gradient placeholder) | A warm, high-quality image conveying hope and family. Options: clinic reception/consultation room, doctor with patient (with consent), or a professionally licensed stock image matching the brand. See specifications below. | **Required** |

**Hero image specifications:**
- Format: JPEG (`.jpg`) — the code references this exact filename
- Minimum size: 1200 × 900 px
- Aspect ratio: renders as 4:3 on mobile, 3:4 on desktop — provide a portrait-friendly
  crop or a square image that works both ways
- Content: warm, premium, aspirational — no clinical/cold imagery

---

## 7. Success Results

The Success Stories section shows six patient result cards. All six currently show
type-specific icon placeholders. Real images require **written patient consent** before
use. The `mediaBlur: true` flag is already set on privacy-sensitive items — the
development team will apply CSS blur automatically.

**Image specifications:**
- Format: JPEG or WebP
- Minimum size: 800 × 600 px
- Privacy: images marked "blur" will be blurred in the UI — only general shape visible

| # | Card ID | Type | Config file | Current state | Media to provide | Blur? | Priority |
|---|---|---|---|---|---|---|---|
| 7.1 | `result1` | HCG test result | `src/lib/config/results.ts` | No image — icon placeholder | Photo of a positive HCG test strip or lab result (patient consent required) | Yes — blurred | Recommended |
| 7.2 | `result2` | HCG test result | `src/lib/config/results.ts` | No image — icon placeholder | Photo of a positive HCG test result (patient consent required) | Yes — blurred | Recommended |
| 7.3 | `result3` | IVF success | `src/lib/config/results.ts` | No image — icon placeholder | Happy family/couple photo (patient consent required) | No | Recommended |
| 7.4 | `result4` | IVF success | `src/lib/config/results.ts` | No image — icon placeholder | Happy family/couple photo (patient consent required) | No | Recommended |
| 7.5 | `result5` | Happy family | `src/lib/config/results.ts` | No image — icon placeholder | Family photo (patient consent required) | No | Recommended |
| 7.6 | `result6` | Patient message | `src/lib/config/results.ts` | No image — icon placeholder | Screenshot of a gratitude message from the patient (patient consent required) | No | Recommended |

**Patient consent requirement:** All images must be accompanied by signed consent.
The consent record must be kept on file by the clinic.

---

## 8. Testimonials

Six testimonial cards. Three are `written` type (text only — no image needed). Three
expect a real media asset: a Telegram message screenshot, a review screenshot, and a
video thumbnail. All are currently showing icon placeholders.

| # | Card | Type | What is needed | Blur? | Priority |
|---|---|---|---|---|---|
| 8.1 | `t3` — F.A., Andijan | Telegram message | Screenshot of the actual Telegram message: `"Assalomu alaykum! Xabar bermoqchi edim — test musbat chiqdi!..."` (patient consent required) | Yes — blurred | Recommended |
| 8.2 | `t4` — N.T., Bukhara | Review screenshot | Screenshot of the positive review: `"Klinikaning yondashuvi va laboratoriya sifati ajoyib..."` (patient consent required) | Yes — blurred | Recommended |
| 8.3 | `t6` — M.H., Tashkent | Video thumbnail | A still frame or thumbnail from the patient's video testimonial (patient consent required); if no video exists, the development team will remove this card | No | Recommended |

**Cards needing no image:** `t1` (D.M., Tashkent), `t2` (G.K., Samarkand),
`t5` (S.R., Namangan) — these are written reviews with no media area.

---

## 9. Production Environment Variables

These are technical credentials. They must be entered into the **Vercel project
settings** (Settings → Environment Variables → Production) — they are never stored
in any file or shared over email. The development team configures these directly.

This section is included so management can supply the values to the responsible
developer in a secure channel (1Password, encrypted message, etc.).

| # | Variable | Purpose | Who provides it | Required for |
|---|---|---|---|---|
| 9.1 | `SUPABASE_URL` | Database connection URL | Developer (from Supabase project dashboard) | Form submissions to be stored |
| 9.2 | `SUPABASE_SERVICE_ROLE_KEY` | Database write access key | Developer (from Supabase project dashboard → API settings) | Form submissions to be stored |
| 9.3 | `TELEGRAM_BOT_TOKEN` | Bot token for lead notifications | Developer (from @BotFather on Telegram) | Instant Telegram notification on each booking |
| 9.4 | `TELEGRAM_CHAT_ID` | ID of the Telegram group or channel to receive leads | Clinic (the private group/channel where leads should arrive) | Instant Telegram notification on each booking |
| 9.5 | `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID | Clinic (from GA4 → Admin → Data Streams → Measurement ID) | Traffic analytics and conversion tracking |
| 9.6 | `NEXT_PUBLIC_META_PIXEL_ID` | Meta (Facebook) Pixel ID | Clinic (from Meta Business Manager → Events Manager) | Facebook/Instagram ad conversion tracking |
| 9.7 | `NEXT_PUBLIC_SITE_URL` | Production domain | Developer | Canonical URLs, sitemap, structured data |
| 9.8 | `UPSTASH_REDIS_REST_URL` | Redis connection for rate limiting | Developer (from Upstash dashboard) | Spam protection on the booking form |
| 9.9 | `UPSTASH_REDIS_REST_TOKEN` | Redis auth token | Developer (from Upstash dashboard) | Spam protection on the booking form |

**Security note:** `SUPABASE_SERVICE_ROLE_KEY`, `TELEGRAM_BOT_TOKEN`, and
`UPSTASH_REDIS_REST_TOKEN` are secret credentials. Never share them in plaintext
email, Telegram, or WhatsApp. Use an encrypted password manager or Vercel's secure
environment variable UI.

---

## Completion Checklist

Use this as a sign-off checklist before going live.

### Required — must be complete before launch

- [ ] 2.1–2.3 Real phone number in all three languages
- [ ] 2.4–2.6 Real address in all three languages
- [ ] 2.7–2.9 Real WhatsApp link
- [ ] 2.10–2.12 Telegram channel verified (or corrected)
- [ ] 4.1–4.3 Real Google Maps permanent link
- [ ] 6.2 Hero image file provided and placed
- [ ] 9.1–9.2 Supabase credentials in Vercel
- [ ] 9.3–9.4 Telegram bot credentials in Vercel
- [ ] 9.7 Production site URL in Vercel

### Recommended — complete shortly after or at launch

- [ ] 3.1–3.3 Social media profile URLs (or platforms removed)
- [ ] 4.4 Embedded map iframe code provided
- [ ] 5.1–5.3 Doctor photos (3 files)
- [ ] 6.1 Hero image flag flipped to `true` by development team after image is placed
- [ ] 7.1–7.6 Success result images with patient consent documentation
- [ ] 8.1–8.3 Testimonial media screenshots/thumbnail with patient consent documentation
- [ ] 9.5–9.6 GA4 and Meta Pixel IDs in Vercel
- [ ] 9.8–9.9 Upstash Redis credentials in Vercel

### Confirm (already correct — just verify)

- [ ] 1.1–1.3 Clinic name spelling confirmed
- [ ] 2.13–2.15 Opening hours confirmed correct

---

*Document generated: 2026-06-17. Update this file if any real values change
before or after launch.*
