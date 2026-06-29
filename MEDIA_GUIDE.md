# MEDIA_GUIDE — Miracle IVF

> Production media specification for the landing page.
> Read this before sourcing, exporting, or naming any asset.
> **Do not connect images to config files until all assets pass quality checks.**

---

## Directory Structure

All new image assets live under `public/images/`. The hero image is the only
exception — it is currently hardcoded at `public/hero.png` (see Hero section).

```
public/
├── hero.png                        ← active hero (hardcoded path in Hero.tsx)
├── og-image.jpg                    ← Open Graph / Twitter card
├── favicon.ico
├── apple-touch-icon.png
└── images/
    ├── doctors/
    │   ├── inamdar.webp
    │   ├── beysenbi.webp
    │   └── benko.webp
    ├── results/
    │   ├── result1.webp            ← HCG test photo (privacy-blurred)
    │   ├── result2.webp            ← HCG test photo (privacy-blurred)
    │   ├── result3.webp            ← IVF result / ultrasound scan
    │   ├── result4.webp            ← IVF result / ultrasound scan
    │   └── result5.webp            ← Family photo
    └── testimonials/
        ├── t4.webp                 ← Review screenshot (privacy-blurred)
        └── t6.webp                 ← Video testimonial thumbnail
```

**Total new files required: 10**
(result6 and testimonials t1, t2, t3, t5 need no image — they are text/quote cards)

---

## Naming Convention

| Pattern | Example | Rule |
|---------|---------|------|
| Folder per section | `doctors/` | Matches config file and section ID |
| Lowercase, hyphen-free | `inamdar.webp` | Matches the `id` field in config |
| Sequential for lists | `result1.webp` | Matches the `id` in `RESULTS[]` array |
| Testimonials sequential | `t4.webp` | Matches the `id` in `TESTIMONIALS[]` array |

Prefer WebP for all assets. JPG is acceptable only for the hero if the source
delivery format prevents re-export.

---

## Hero Image

**Current hardcoded path in `src/sections/Hero.tsx`:**
```ts
const HERO_IMAGE_SRC = '/hero.png'
const HAS_HERO_IMAGE = true
```

Do not rename or relocate this file without also updating `Hero.tsx`. The path
`/hero.png` maps to `public/hero.png`.

| Property | Value |
|----------|-------|
| **File name** | `hero.png` (current) — replace with `hero.webp` if re-exporting |
| **Target folder** | `public/` (root — not under `images/`) |
| **Purpose** | LCP hero image — the most important performance asset on the page |
| **Mobile container** | `aspect-[4/3]` (landscape) |
| **Desktop container** | `aspect-[3/4]` (portrait) at 45 vw |
| **Recommended source dimensions** | 1 200 × 1 600 px (3:4 portrait covers both breakpoints) |
| **Recommended aspect ratio** | 3:4 |
| **Recommended format** | WebP (next/image serves WebP from any source format) |
| **Maximum file size** | 300 KB — this is the LCP image; every extra KB delays FCP |
| **next/image used** | Yes — `<Image fill priority fetchPriority="high">` |
| **`priority` prop** | Yes — preloaded in `<head>`; do not lazy-load |
| **blur placeholder** | Optional — add `blurDataURL` prop if available |
| **privacy blur** | No |
| **`sizes` hint in code** | `"(max-width: 1024px) 100vw, 45vw"` |
| **Object fit** | `object-cover` |

**Subject guidance:** Premium, warm, aspirational — a couple or mother with
newborn. Soft, natural light. No sterile clinical backgrounds.
Focal point should be centered or upper-center so `object-cover` works at
both 4:3 and 3:4 crops.

---

## Doctors

Each doctor card uses `aspect-[3/4]` with `object-cover object-top`.
next/image renders it with `fill` and the following sizes hint:
`"(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"`.

At 1 440 px viewport that is ~480 px wide. Supply 2× retina source (960 px wide).

### Dr. Inamdar

| Property | Value |
|----------|-------|
| **File name** | `inamdar.webp` |
| **Target folder** | `public/images/doctors/` |
| **Config key** | `{ id: 'inamdar', photoSrc: '/images/doctors/inamdar.webp' }` |
| **Purpose** | Professional headshot for doctor card |
| **Recommended dimensions** | 800 × 1 067 px (3:4, 2× retina at 33 vw) |
| **Aspect ratio** | 3:4 (portrait) |
| **Format** | WebP |
| **Maximum file size** | 150 KB |
| **next/image** | Yes — `fill`, `object-cover object-top` |
| **blur placeholder** | No |
| **privacy blur** | No |

**Subject guidance:** Professional headshot, direct eye contact, white coat or
formal attire. Neutral or soft-blur background. Face clearly visible in upper
two-thirds of frame (object-top crops the bottom).

---

### Dr. Meruert Beysenbi

| Property | Value |
|----------|-------|
| **File name** | `beysenbi.webp` |
| **Target folder** | `public/images/doctors/` |
| **Config key** | `{ id: 'beysenbi', photoSrc: '/images/doctors/beysenbi.webp' }` |
| **Purpose** | Professional headshot for doctor card |
| **Recommended dimensions** | 800 × 1 067 px (3:4) |
| **Aspect ratio** | 3:4 (portrait) |
| **Format** | WebP |
| **Maximum file size** | 150 KB |
| **next/image** | Yes — `fill`, `object-cover object-top` |
| **blur placeholder** | No |
| **privacy blur** | No |

**Subject guidance:** Same as above. Consistent lighting and background tone
across all three doctor photos is strongly recommended.

---

### Dr. V.V. Benko

| Property | Value |
|----------|-------|
| **File name** | `benko.webp` |
| **Target folder** | `public/images/doctors/` |
| **Config key** | `{ id: 'benko', photoSrc: '/images/doctors/benko.webp' }` |
| **Purpose** | Professional headshot for doctor card |
| **Recommended dimensions** | 800 × 1 067 px (3:4) |
| **Aspect ratio** | 3:4 (portrait) |
| **Format** | WebP |
| **Maximum file size** | 150 KB |
| **next/image** | Yes — `fill`, `object-cover object-top` |
| **blur placeholder** | No |
| **privacy blur** | No |

---

## Success Results

Six result cards are rendered. Card six (`result6`) is a **gratitude quote card**
— it displays a blockquote with no image slot. Five image files are required.

Result cards render `aspect-[4/3]` with `object-cover`.
Sizes hint: `"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`.

**Privacy blur behaviour:** when `mediaBlur: true` is set in `RESULTS[]`, the
component applies `scale-110 blur-md` CSS + a frosted overlay. The image is
visible but unidentifiable. Source a full-quality image — the blur is applied
in CSS, not baked into the file.

---

### result1 — HCG Test Photo (blurred)

| Property | Value |
|----------|-------|
| **File name** | `result1.webp` |
| **Target folder** | `public/images/results/` |
| **Config key** | `mediaSrc: '/images/results/result1.webp'` |
| **Purpose** | Positive HCG / pregnancy test result — G.M., Tashkent, March 2024 |
| **Recommended dimensions** | 800 × 600 px (4:3) |
| **Aspect ratio** | 4:3 |
| **Format** | WebP |
| **Maximum file size** | 200 KB |
| **next/image** | Yes — `fill`, `object-cover` |
| **blur placeholder** | No |
| **privacy blur** | **Yes** — CSS blur applied by component (`mediaBlur: true`) |
| **Patient consent** | Required before publishing |

**Accepted media types:**
- Positive home pregnancy test (two lines visible)
- Positive digital pregnancy test readout
- HCG blood test result printout (numbers redacted or blurred naturally)

---

### result2 — HCG Test Photo (blurred)

| Property | Value |
|----------|-------|
| **File name** | `result2.webp` |
| **Target folder** | `public/images/results/` |
| **Config key** | `mediaSrc: '/images/results/result2.webp'` |
| **Purpose** | Positive HCG test — N.R., Samarkand, January 2024 |
| **Recommended dimensions** | 800 × 600 px (4:3) |
| **Aspect ratio** | 4:3 |
| **Format** | WebP |
| **Maximum file size** | 200 KB |
| **next/image** | Yes — `fill`, `object-cover` |
| **blur placeholder** | No |
| **privacy blur** | **Yes** — CSS blur (`mediaBlur: true`) |
| **Patient consent** | Required |

**Accepted media types:** Same as result1. Can be a different test style for visual variety.

---

### result3 — IVF Result (no blur)

| Property | Value |
|----------|-------|
| **File name** | `result3.webp` |
| **Target folder** | `public/images/results/` |
| **Config key** | `mediaSrc: '/images/results/result3.webp'` |
| **Purpose** | IVF success evidence — D.Yu., Andijan, November 2023 (twins) |
| **Recommended dimensions** | 800 × 600 px (4:3) |
| **Aspect ratio** | 4:3 |
| **Format** | WebP |
| **Maximum file size** | 150 KB |
| **next/image** | Yes — `fill`, `object-cover` |
| **blur placeholder** | No |
| **privacy blur** | No (`mediaBlur: false`) |
| **Patient consent** | Required |

**Accepted media types:**
- Ultrasound scan showing two gestational sacs (twins outcome)
- Embryo culture photo (laboratory setting, non-identifiable)
- Positive scan printout
- Do NOT use identifiable patient photos without explicit written consent

---

### result4 — IVF Result (no blur)

| Property | Value |
|----------|-------|
| **File name** | `result4.webp` |
| **Target folder** | `public/images/results/` |
| **Config key** | `mediaSrc: '/images/results/result4.webp'` |
| **Purpose** | IVF success — M.B., Bukhara, February 2024 |
| **Recommended dimensions** | 800 × 600 px (4:3) |
| **Aspect ratio** | 4:3 |
| **Format** | WebP |
| **Maximum file size** | 150 KB |
| **next/image** | Yes — `fill`, `object-cover` |
| **blur placeholder** | No |
| **privacy blur** | No |
| **Patient consent** | Required |

**Accepted media types:**
- Ultrasound scan (positive, gestational sac visible)
- Embryo photo (Day 3 or Day 5 blastocyst, laboratory setting)
- HCG blood panel printout (values highlighted, name redacted)

---

### result5 — Family Photo (no blur)

| Property | Value |
|----------|-------|
| **File name** | `result5.webp` |
| **Target folder** | `public/images/results/` |
| **Config key** | `mediaSrc: '/images/results/result5.webp'` |
| **Purpose** | Happy family outcome — S.I., Namangan, September 2023 |
| **Recommended dimensions** | 800 × 600 px (4:3) |
| **Aspect ratio** | 4:3 |
| **Format** | WebP |
| **Maximum file size** | 150 KB |
| **next/image** | Yes — `fill`, `object-cover` |
| **blur placeholder** | No |
| **privacy blur** | No |
| **Patient consent** | Required — identifiable faces visible |

**Accepted media types:**
- Parents with newborn (hospital or home setting, warm light)
- Close-up of newborn hands / feet (non-identifiable but emotionally resonant)
- Family of three or more — warm, candid, not staged

---

### result6 — Gratitude Quote Card (no image)

| Property | Value |
|----------|-------|
| **File name** | — |
| **Target folder** | — |
| **Purpose** | Text-only blockquote card — Z.K., Tashkent, April 2024 |
| **next/image** | No — component renders a blockquote, no `<Image>` |
| **Image required** | **No.** This card slot has no image area. |

The `gratitude` type in `ResultCard.tsx` renders a styled blockquote with a
decorative `"` mark. Do not supply an image file for result6.

---

## Testimonials

Six testimonial cards exist. Only two have image rendering slots.

| ID | Type | Image slot | Image blurred |
|----|------|-----------|---------------|
| t1 | written | No | — |
| t2 | written | No | — |
| t3 | telegram | No | — |
| t4 | screenshot | **Yes** | **Yes** |
| t5 | written | No | — |
| t6 | video | **Yes** | No |

The `telegram` type (t3) renders a chat-bubble blockquote without any image
area — `hasMediaArea` is false for telegram in `TestimonialCard.tsx`.

The testimonial image container is `h-48 w-full` (192 px tall, full card width)
inside a card that is at most ~33 vw wide.
Sizes hint: `"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`.

---

### t4 — Review Screenshot (blurred)

| Property | Value |
|----------|-------|
| **File name** | `t4.webp` |
| **Target folder** | `public/images/testimonials/` |
| **Config key** | `mediaSrc: '/images/testimonials/t4.webp'` |
| **Purpose** | Review screenshot — N.T., Bukhara, embryo freezing treatment |
| **Recommended dimensions** | 960 × 540 px (16:9 or wider) |
| **Aspect ratio** | 16:9 or 4:3 — either works in the `h-48` container |
| **Format** | WebP |
| **Maximum file size** | 150 KB |
| **next/image** | Yes — `fill`, `object-cover`, inside `h-48` container |
| **blur placeholder** | No |
| **privacy blur** | **Yes** — `blur-sm` CSS applied (`mediaBlur: true`) |
| **Patient consent** | Required |

**Accepted media types:**
- Screenshot of a Google review (5 stars, Clinic Miracle IVF listing)
- Screenshot of a social media comment (Instagram, Facebook)
- Screenshot of a WhatsApp or Telegram message (name and avatar obscured by blur)

**Note:** The component also shows a text label overlay when blurred. The source
image should be legible at full quality so the blur effect reads authentically.

---

### t6 — Video Testimonial Thumbnail

| Property | Value |
|----------|-------|
| **File name** | `t6.webp` |
| **Target folder** | `public/images/testimonials/` |
| **Config key** | `mediaSrc: '/images/testimonials/t6.webp'` |
| **Purpose** | Video thumbnail — M.H., Tashkent, ICSI treatment |
| **Recommended dimensions** | 960 × 540 px (16:9) |
| **Aspect ratio** | 16:9 |
| **Format** | WebP |
| **Maximum file size** | 200 KB |
| **next/image** | Yes — `fill`, `object-cover`, inside `h-48` container |
| **blur placeholder** | No |
| **privacy blur** | No (`mediaBlur` not set) |
| **Patient consent** | Required — face will be visible |

**Accepted media types:**
- Still frame from the patient video (warm, smiling expression)
- Branded video thumbnail (clinic logo + patient first name)
- If no real video exists: a posed portrait photo with a Play overlay
  (the component renders its own Play button on top; you supply the background)

---

## Open Graph Image

| Property | Value |
|----------|-------|
| **File name** | `og-image.jpg` |
| **Target folder** | `public/` (root) |
| **Purpose** | Social share card for all three locales (UZ / RU / EN) |
| **Required dimensions** | 1 200 × 630 px (exact — Facebook/Twitter minimum) |
| **Aspect ratio** | 1.91:1 |
| **Format** | JPG (OG images must be JPG/PNG — WebP not universally supported by scrapers) |
| **Maximum file size** | 300 KB |
| **next/image** | No — referenced directly in `generateMetadata()` |
| **Referenced in** | `src/app/[locale]/layout.tsx` line 63 |

**Content guidance:** Clinic name + tagline in UZ/RU/EN, brand blue background
(`#163C8C`), soft pink accent (`#F4B6C2`), logo. Avoid text that is locale-
specific since one image serves all three locales.

---

## Optimization

### WebP Quality Settings

| Asset type | Recommended quality | Rationale |
|------------|-------------------|-----------|
| Doctor portraits | 82–85 | Fine facial detail; visible at full quality |
| Hero image | 80–84 | LCP — balance quality with file size |
| Result photos (blurred) | 70–75 | Final render is blurred; quality loss invisible |
| Result photos (sharp) | 80–85 | Full quality required |
| Testimonial screenshots | 85–90 | Text must be legible at source |
| Video thumbnail | 80–84 | Standard quality |
| OG image (JPG) | 85–90 | Social scrapers cache at source quality |

### Compression Tools

| Tool | Use case |
|------|----------|
| **Squoosh** (squoosh.app) | Manual export and preview for individual files |
| **sharp** (Node.js) | Batch conversion and resize pipeline |
| **cwebp** (CLI) | Command-line WebP encoding with full quality control |
| **ImageOptim** (macOS) | Final lossless pass after WebP conversion |
| **TinyPNG / TinyJPG** | Emergency fallback for JPG/PNG only |

### Retina Guidance

next/image generates multiple sizes automatically via its image optimization
pipeline. Provide **2× retina source dimensions** — next/image will downscale
for 1× display; you never need to supply `@1x` variants separately.

| Section | 1× display width | Source width to supply |
|---------|-----------------|----------------------|
| Hero (mobile) | 375 px | 800 px+ |
| Hero (desktop) | ~648 px | 1 200 px |
| Doctor cards (desktop) | ~400 px | 800 px |
| Result cards (desktop) | ~400 px | 800 px |
| Testimonial media | ~400 px | 960 px |

### File Size Budget

Total budget across all 10 new images: **< 1.8 MB uncompressed in the browser**.
With next/image serving WebP at the correct size, actual bytes transferred will
be far lower. Respect individual per-file limits to avoid jank on 3G connections
common in regional Uzbekistan markets.

---

## Connecting Assets (when ready)

When an asset is approved and placed at the correct path, activate it by editing
the relevant config file. **Do not modify component code.**

### Doctors

Edit `src/lib/config/doctors.ts`:
```ts
export const DOCTORS: DoctorConfig[] = [
  { id: 'inamdar',  photoSrc: '/images/doctors/inamdar.webp' },
  { id: 'beysenbi', photoSrc: '/images/doctors/beysenbi.webp' },
  { id: 'benko',    photoSrc: '/images/doctors/benko.webp' },
]
```

### Results

Edit `src/lib/config/results.ts`:
```ts
export const RESULTS: ResultConfig[] = [
  { id: 'result1', type: 'hcg',       mediaSrc: '/images/results/result1.webp', mediaBlur: true },
  { id: 'result2', type: 'hcg',       mediaSrc: '/images/results/result2.webp', mediaBlur: true },
  { id: 'result3', type: 'ivf',       mediaSrc: '/images/results/result3.webp' },
  { id: 'result4', type: 'ivf',       mediaSrc: '/images/results/result4.webp' },
  { id: 'result5', type: 'family',    mediaSrc: '/images/results/result5.webp' },
  { id: 'result6', type: 'gratitude' },   // no image — leave as-is
]
```

### Testimonials

Edit `src/lib/config/testimonials.ts`:
```ts
export const TESTIMONIALS: TestimonialConfig[] = [
  { id: 't1', type: 'written',    rating: 5 },
  { id: 't2', type: 'written',    rating: 5 },
  { id: 't3', type: 'telegram',   rating: 5, mediaBlur: true },   // no image area
  { id: 't4', type: 'screenshot', rating: 5, mediaSrc: '/images/testimonials/t4.webp', mediaBlur: true },
  { id: 't5', type: 'written',    rating: 5 },
  { id: 't6', type: 'video',      rating: 5, mediaSrc: '/images/testimonials/t6.webp' },
]
```

### Hero

The hero path is hardcoded in `src/sections/Hero.tsx`:
```ts
const HERO_IMAGE_SRC = '/hero.png'
```
Replace the file at `public/hero.png`. If changing the filename or format,
also update `HERO_IMAGE_SRC` in that file.

---

## Checklist Before Going Live

- [ ] Every required file placed at the exact path listed above
- [ ] All files are WebP (or JPG for OG image)
- [ ] Individual file size within budget
- [ ] Doctor photos: consistent lighting, all portrait orientation
- [ ] Privacy-blurred assets (result1, result2, t4): source image is high quality
- [ ] Patient consent obtained for every identifiable photo
- [ ] Hero renders correctly at 320 px, 375 px, 768 px, 1 440 px
- [ ] OG image previewed via og:image debugger before launch
- [ ] Lighthouse Performance score ≥ 95 after images are connected
