# WIREFRAMES.md — Miracle IVF Landing Page

> Text wireframes for every section. Each section documents Purpose, Headline, Content, CTA, and both Mobile and Desktop layouts.
> Notation: `[ ]` = box/container, `( )` = button, `{ }` = image/media, `< >` = icon, `///` = visual divider.

---

## 00 — Sticky Header

**Purpose:** Global navigation, brand presence, primary conversion entry point, language access — visible at all times.

**Desktop Layout (≥1024px)**

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│  {Logo}    Xizmatlar  Shifokorlar  Jarayon  Muvaffaqiyat  Bog'lanish              │
│                                                    +998 XX XXX-XX-XX  [UZ|RU|EN]  │
│                                                              ( Maslahat olish )    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

**Mobile Layout (<1024px)**

```
┌────────────────────────────────┐
│  {Logo}            [≡] [UZ▾]  │
└────────────────────────────────┘

[Hamburger open]:
┌────────────────────────────────┐
│  Xizmatlar                     │
│  Shifokorlar                   │
│  Jarayon                       │
│  Muvaffaqiyat                  │
│  Bog'lanish                    │
│  ─────────────────────────     │
│  +998 XX XXX-XX-XX             │
│  ( Maslahat olish )            │
│  [UZ]  [RU]  [EN]              │
└────────────────────────────────┘
```

**States:** Default (transparent on scroll top) → Scrolled (white/blur background + shadow).

---

## 01 — Hero

**Purpose:** Hook visitors emotionally within 3 seconds, communicate the core value proposition, and drive the first CTA click.

**Headline:** H1 — Emotional, hopeful, parent-focused. (see CONTENT_ARCHITECTURE.md)

**Content:**
- H1 headline (large, primary blue)
- Subheadline (supporting copy, muted)
- Trust micro-strip: 3 inline stats (success rate, babies born, doctors)
- Primary CTA button
- Secondary CTA (phone link)
- Hero image: warm, premium lifestyle photography (couple or family)

**CTA:** Primary → scroll to #contact | Secondary → tel: link

**Desktop Layout (≥1024px)**

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  [Left column — 55%]                   [Right column — 45%]           │
│                                                                        │
│  H1: Farzandli bo'lish orzuingiz —     { Hero image:                 │
│      bizning vazifamiz                   warm couple / family         │
│                                          rounded corners              │
│  Subheadline:                            soft gradient overlay }      │
│  Xalqaro mutaxassislar bilan zamonaviy                                │
│  EKO davolash. Toshkentda. Siz uchun.                                │
│                                                                        │
│  ┌──────────────────────────────────┐                                 │
│  │ <check> 65% muvaffaqiyat        │                                 │
│  │ <heart> 10 000+ xursand oila    │                                 │
│  │ <star>  Xalqaro shifokorlar     │                                 │
│  └──────────────────────────────────┘                                 │
│                                                                        │
│  ( Bepul maslahat olish )   [ Qo'ng'iroq qiling → ]                  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Mobile Layout (<768px)**

```
┌────────────────────────────────┐
│                                │
│  { Hero image                  │
│    full width, rounded-xl      │
│    aspect-ratio 16/9 }         │
│                                │
│  H1: Farzandli bo'lish         │
│      orzuingiz —               │
│      bizning vazifamiz         │
│                                │
│  Xalqaro mutaxassislar bilan   │
│  zamonaviy EKO davolash.       │
│                                │
│  <check> 65% muvaffaqiyat      │
│  <heart> 10 000+ oila          │
│  <star>  Xalqaro shifokorlar   │
│                                │
│  ( Bepul maslahat olish )      │
│  [ Qo'ng'iroq qiling → ]       │
│                                │
└────────────────────────────────┘
```

---

## 02 — Trust Statistics

**Purpose:** Instant credibility through concrete numbers. Animated counters on scroll entrance.

**Headline:** Optional — light section label ("Bizning natijalarimiz")

**Content:** 3–4 animated stat counters with icons and labels.

**CTA:** None (trust-building only)

**Desktop Layout (≥768px)**

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐     │
│  │            │  │            │  │            │  │            │     │
│  │  <trophy>  │  │  <heart>   │  │  <clock>   │  │  <globe>   │     │
│  │    65%     │  │  10 000+   │  │   15+      │  │   20+      │     │
│  │            │  │            │  │            │  │            │     │
│  │ Muvaffaqiyat│  │Tug'ilgan   │  │  Yillik    │  │Xalqaro     │     │
│  │ darajasi  │  │  bolalar   │  │ tajriba    │  │shifokorlar │     │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘     │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Mobile Layout (<768px)**

```
┌────────────────────────────────┐
│                                │
│  ┌─────────────┐ ┌───────────┐│
│  │  <trophy>   │ │  <heart>  ││
│  │    65%      │ │  10 000+  ││
│  │ Muvaffaqiyat│ │  Bolalar  ││
│  └─────────────┘ └───────────┘│
│                                │
│  ┌─────────────┐ ┌───────────┐│
│  │  <clock>    │ │  <globe>  ││
│  │    15+      │ │    20+    ││
│  │   Yillik    │ │Shifokorlar││
│  └─────────────┘ └───────────┘│
│                                │
└────────────────────────────────┘
```

---

## 03 — Problem & Solution

**Purpose:** Acknowledge the visitor's emotional struggle (empathy) then pivot to Miracle's approach (possibility). Bridges emotional landing to rational evaluation.

**Headline:** Section heading — empathetic, non-judgmental

**Content:**
- Left panel: The struggle — validated emotions, common pain points
- Right panel: Miracle's answer — international standards, personalized care, advanced tech

**CTA:** Soft inline link → scroll to #contact

**Desktop Layout (≥1024px)**

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│   Section heading (centered)                                           │
│   "Farzand kutish og'ir... Ammo siz yolg'iz emassiz"                 │
│                                                                        │
│   ┌──────────────────────────┐  ┌──────────────────────────┐         │
│   │   THE STRUGGLE           │  │   OUR APPROACH           │         │
│   │   (soft pink bg)         │  │   (soft blue bg)         │         │
│   │                          │  │                          │         │
│   │   <alert-circle>         │  │   <check-circle>         │         │
│   │   Yillar davomida kutish │  │   Zamonaviy EKO texno-   │         │
│   │   va umidsizliklar       │  │   logiyalari             │         │
│   │                          │  │                          │         │
│   │   <alert-circle>         │  │   <check-circle>         │         │
│   │   Javob topa olmagan     │  │   Xalqaro mutaxassislar  │         │
│   │   savollar               │  │   jamoasi                │         │
│   │                          │  │                          │         │
│   │   <alert-circle>         │  │   <check-circle>         │         │
│   │   Noaniqlik va qo'rquv   │  │   Har bir bemorga        │         │
│   │                          │  │   individual yondashuv   │         │
│   │   <alert-circle>         │  │   <check-circle>         │         │
│   │   Mahalliy klinikada     │  │   Sertifikatlangan       │         │
│   │   cheklangan imkoniyat   │  │   laboratoriyalar        │         │
│   │                          │  │                          │         │
│   └──────────────────────────┘  └──────────────────────────┘         │
│                                                                        │
│               [ Bepul maslahat olish → ]                              │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Mobile Layout (<768px)**

```
┌────────────────────────────────┐
│                                │
│  Farzand kutish og'ir...       │
│  Ammo siz yolg'iz emassiz      │
│                                │
│  ┌──────────────────────────┐  │
│  │  THE STRUGGLE (pink bg)  │  │
│  │  <x> Yillar davomida     │  │
│  │      kutish              │  │
│  │  <x> Javob yo'q          │  │
│  │  <x> Noaniqlik           │  │
│  │  <x> Cheklangan imkon    │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │  OUR APPROACH (blue bg)  │  │
│  │  <✓> Zamonaviy texno.    │  │
│  │  <✓> Xalqaro jamoa       │  │
│  │  <✓> Individual yondashuv│  │
│  │  <✓> Sertifikatlangan lab│  │
│  └──────────────────────────┘  │
│                                │
│  ( Bepul maslahat olish )      │
│                                │
└────────────────────────────────┘
```

---

## 04 — Services

**Purpose:** Show breadth of clinical offerings, create relevance for different conditions, link each service to a consultation.

**Headline:** "Bizning xizmatlarimiz" / "Наши услуги" / "Our Services"

**Content:** 6 service cards in a grid. Each card: icon, title, 1-line description.

**CTA:** Card-level "Batafsil" link (optional) + section-level CTA button

**Desktop Layout (≥1024px) — 3×2 grid**

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│              Bizning xizmatlarimiz                                     │
│     Har bir holat uchun zamonaviy davolash usullari                   │
│                                                                        │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│   │  <dna>       │  │  <microscope>│  │  <syringe>   │              │
│   │  EKO (IVF)   │  │  IKSI (ICSI) │  │  IUI         │              │
│   │              │  │              │  │              │              │
│   │  Sun'iy      │  │  Spermatozoid│  │  Bachadon    │              │
│   │  urug'lantir.│  │  kiritish    │  │  ichiga      │              │
│   │              │  │              │  │              │              │
│   │  Batafsil →  │  │  Batafsil →  │  │  Batafsil →  │              │
│   └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                        │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│   │  <snowflake> │  │  <user>      │  │  <flask>     │              │
│   │  Muzlatish   │  │  Erkak       │  │  Genetik     │              │
│   │              │  │  bepushtligi │  │  tekshirish  │              │
│   │  Tuxum/embri-│  │              │  │  (PGT)       │              │
│   │  on saqlash  │  │  Tashxis va  │  │              │              │
│   │              │  │  davolash    │  │              │              │
│   │  Batafsil →  │  │  Batafsil →  │  │  Batafsil →  │              │
│   └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                        │
│              ( Maslahat olish )                                        │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Mobile Layout (<768px) — 1 column (or 2 column at ≥480px)**

```
┌────────────────────────────────┐
│                                │
│  Bizning xizmatlarimiz         │
│  Har bir holat uchun...        │
│                                │
│  ┌──────────────────────────┐  │
│  │ <dna>  EKO (IVF)         │  │
│  │ Sun'iy urug'lantirish    │  │
│  │                Batafsil →│  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │ <mic>  IKSI (ICSI)       │  │
│  │ Spermatozoid kiritish    │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │ <syringe> IUI            │  │
│  │ Bachadon ichiga          │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │ <snowflake> Muzlatish    │  │
│  │ Tuxum/embrion saqlash    │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │ <user> Erkak bepushtligi │  │
│  │ Tashxis va davolash      │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │ <flask> Genetik tekshir. │  │
│  │ PGT tahlillari           │  │
│  └──────────────────────────┘  │
│                                │
│  ( Maslahat olish )            │
│                                │
└────────────────────────────────┘
```

---

## 05 — Doctors

**Purpose:** Human face of the clinic. Build credibility and trust through international specialist credentials.

**Headline:** "Bizning mutaxassislarimiz" / "Наши специалисты" / "Our Specialists"

**Content:** Doctor cards. Each card: photo, name, specialty, credentials/training, country flag (optional), years of experience.

**CTA:** Section-level "Meet our team → Book a consultation"

**Desktop Layout (≥1024px) — 3–4 column card grid**

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│              Bizning mutaxassislarimiz                                 │
│       Xalqaro tajriba va mahalliy tushunish                           │
│                                                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐│
│  │ { photo }   │  │ { photo }   │  │ { photo }   │  │ { photo }   ││
│  │ circle crop │  │ circle crop │  │ circle crop │  │ circle crop ││
│  │             │  │             │  │             │  │             ││
│  │ Dr. [Name]  │  │ Dr. [Name]  │  │ Dr. [Name]  │  │ Dr. [Name]  ││
│  │ Reprodukto- │  │ Embriolog   │  │ Urolog-     │  │ Genetik     ││
│  │ log         │  │             │  │ androlog    │  │             ││
│  │             │  │             │  │             │  │             ││
│  │ 🇩🇪 Germaniya│  │ 🇷🇺 Rossiya  │  │ 🇮🇱 Isroil   │  │ 🇺🇿 O'zbekiston│
│  │ 12 yil tajr.│  │ 8 yil tajr. │  │ 15 yil tajr.│  │ 10 yil tajr││
│  │             │  │             │  │             │  │             ││
│  │ [Sertifikat]│  │ [Sertifikat]│  │ [Sertifikat]│  │ [Sertifikat]││
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘│
│                                                                        │
│         ( Mutaxassislar bilan tanishing → Maslahat oling )           │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Mobile Layout (<768px) — horizontal scroll carousel**

```
┌────────────────────────────────┐
│                                │
│  Bizning mutaxassislarimiz     │
│  Xalqaro tajriba...            │
│                                │
│  ← [ Dr. Card 1 ] [ Dr. Card 2 ] →
│                                │
│  ┌──────────────────────────┐  │
│  │  { photo — circle }      │  │
│  │  Dr. [Name]              │  │
│  │  Reproduktolog           │  │
│  │  🇩🇪 Germaniya · 12 yil  │  │
│  │  [Sertifikat badge]      │  │
│  └──────────────────────────┘  │
│                                │
│  [○ ○ ● ○]  ← dots indicator  │
│                                │
│  ( Maslahat olish )            │
│                                │
└────────────────────────────────┘
```

---

## 06 — IVF Process

**Purpose:** Demystify IVF. Reduce fear and uncertainty by showing a clear, manageable step-by-step path.

**Headline:** "EKO jarayoni: qadamma-qadam" / "Процесс ЭКО: шаг за шагом" / "The IVF Process: Step by Step"

**Content:** 6 numbered steps. Each step: number badge, icon, title, short description.

**CTA:** Inline after last step → scroll to contact

**Desktop Layout (≥1024px) — horizontal timeline or alternating vertical**

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│         EKO jarayoni: qadamma-qadam                                    │
│         Sizning yo'lingiz aniq va biz har qadamda yoningdamiz         │
│                                                                        │
│                                                                        │
│  01 ─────────────────────────────────── 02 ────────────────────────  │
│  <stethoscope>                            <clipboard>                  │
│  Konsultatsiya                            Tashxis va Tekshiruvlar     │
│  Holatingizni o'rganamiz va              Qon tahlillari, UZI,         │
│  individual reja tuzamiz                 sperma tahlili               │
│                                                                        │
│  03 ─────────────────────────────────── 04 ────────────────────────  │
│  <activity>                               <flask>                      │
│  Stimulyatsiya                            Tuxum olish va              │
│  Tuxumdonni rivojlantirish               urug'lantirish               │
│  uchun gormonal davolash                 Laboratoriyada               │
│                                          urug'lantirish               │
│                                                                        │
│  05 ─────────────────────────────────── 06 ────────────────────────  │
│  <move>                                   <heart>                      │
│  Embrion ko'chirish                       Homiladorlik                │
│  Sifatli embrion                         Qo'llab-quvvatlash           │
│  bachadonga joylashtiriladi              Siz bilan birga              │
│                                                                        │
│              ( Jarayonni boshlash — Bepul maslahat olish )           │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Mobile Layout (<768px) — vertical stacked steps**

```
┌────────────────────────────────┐
│                                │
│  EKO jarayoni: qadamma-qadam   │
│                                │
│  ┌──┐                          │
│  │01│ <stethoscope>            │
│  └──┘ Konsultatsiya            │
│   │   Holatingizni o'rganamiz  │
│   │                            │
│  ┌──┐                          │
│  │02│ <clipboard>              │
│  └──┘ Tashxis va Tekshiruvlar  │
│   │   Qon tahlillari, UZI      │
│   │                            │
│  ┌──┐                          │
│  │03│ <activity>               │
│  └──┘ Stimulyatsiya            │
│   │   Gormonal davolash        │
│   │                            │
│  ┌──┐                          │
│  │04│ <flask>                  │
│  └──┘ Tuxum olish              │
│   │   Laboratoriyada urug'.    │
│   │                            │
│  ┌──┐                          │
│  │05│ <move>                   │
│  └──┘ Embrion ko'chirish       │
│   │   Bachadonga joylash.      │
│   │                            │
│  ┌──┐                          │
│  │06│ <heart>                  │
│  └──┘ Homiladorlik qo'llab.    │
│       Siz bilan birga          │
│                                │
│  ( Bepul maslahat olish )      │
│                                │
└────────────────────────────────┘
```

---

## 07 — Success Stories

**Purpose:** Emotional proof. Real outcomes build hope and overcome the fear of disappointment.

**Headline:** "Muvaffaqiyat tarihlari" / "Истории успеха" / "Success Stories"

**Content:** 2–4 story cards. Each: short narrative (2–3 sentences), patient initials, outcome highlight, optional photo (consent). Supporting aggregate stat.

**CTA:** "Siz ham boshlay olasiz → Maslahat oling"

**Desktop Layout (≥1024px) — 2-column card grid**

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│              Muvaffaqiyat tarihlari                                    │
│       10 000 dan ortiq oilaga baxt in'om etildi                      │
│                                                                        │
│   ┌─────────────────────────────┐  ┌─────────────────────────────┐   │
│   │  { optional photo }         │  │  { optional photo }         │   │
│   │                             │  │                             │   │
│   │  "Uch yil harakat qildik.   │  │  "Birinchi urinishda        │   │
│   │  Miracle klinigida hammasiga│  │  muvaffaqiyatga erishdik.   │   │
│   │  nuqta qo'yildi. Bugun      │  │  Doktorlar kasbiy va        │   │
│   │  qo'shaloq farzandimiz bor."│  │  insoniy yondashuvi bilan   │   │
│   │                             │  │  boshqacha edi."            │   │
│   │  — D.R., Toshkent           │  │  — M.K., Samarqand          │   │
│   │                             │  │                             │   │
│   │  <baby>  Egizaklar, 2024    │  │  <baby>  O'g'il farzand, 2025│  │
│   └─────────────────────────────┘  └─────────────────────────────┘   │
│                                                                        │
│   ┌─────────────────────────────┐  ┌─────────────────────────────┐   │
│   │  "..."                      │  │  "..."                      │   │
│   │  — N.A., Farg'ona           │  │  — S.T., Buxoro             │   │
│   │  <baby>  Qiz farzand, 2025  │  │  <baby>  O'g'il, 2024       │   │
│   └─────────────────────────────┘  └─────────────────────────────┘   │
│                                                                        │
│         ( Siz ham boshlay olasiz — Bepul maslahat olish )            │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Mobile Layout (<768px) — vertical stack**

```
┌────────────────────────────────┐
│                                │
│  Muvaffaqiyat tarihlari        │
│  10 000 dan ortiq oila...      │
│                                │
│  ┌──────────────────────────┐  │
│  │ { photo (optional) }     │  │
│  │                          │  │
│  │ "Uch yil harakat qildik. │  │
│  │  Miracle klinigida       │  │
│  │  hammasi hal bo'ldi."    │  │
│  │                          │  │
│  │ — D.R., Toshkent         │  │
│  │ <baby> Egizaklar, 2024   │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │ "Birinchi urinishda..."  │  │
│  │ — M.K., Samarqand        │  │
│  │ <baby> O'g'il, 2025      │  │
│  └──────────────────────────┘  │
│                                │
│  ( Bepul maslahat olish )      │
│                                │
└────────────────────────────────┘
```

---

## 08 — Testimonials

**Purpose:** Peer trust through patient voices. Complements success stories with a wider range of brief, authentic quotes.

**Headline:** "Bemorlarimiz fikri" / "Отзывы пациентов" / "Patient Testimonials"

**Content:** 4–8 quote cards. Each: quote text, patient name/initials, optional avatar, optional star rating. Carousel on mobile, multi-column grid on desktop.

**CTA:** None (trust-building; CTAs appear in adjacent sections)

**Desktop Layout (≥1024px) — 3-column masonry / grid**

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│              Bemorlarimiz fikri                                        │
│        ★★★★★  4.9 / 5.0  ·  200+ sharh                              │
│                                                                        │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐   │
│  │ ★★★★★            │  │ ★★★★★            │  │ ★★★★★            │   │
│  │                  │  │                  │  │                  │   │
│  │ "Miracle klinika-│  │ "Doktorlar bilan │  │ "Toshkentdagi    │   │
│  │ si mening umidim │  │ muloqot qilish   │  │ eng yaxshi EKO   │   │
│  │ edi va ular uni  │  │ juda qulay edi.  │  │ klinikasi. Hamma-│   │
│  │ amalga oshirdi." │  │ Professional va  │  │ si professional  │   │
│  │                  │  │ mehr bilan..."   │  │ darajada."       │   │
│  │ { avatar }       │  │ { avatar }       │  │ { avatar }       │   │
│  │ — Z.A.           │  │ — F.B.           │  │ — R.M.           │   │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘   │
│                                                                        │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐   │
│  │ ★★★★★            │  │ ★★★★★            │  │ ★★★★★            │   │
│  │ "..."            │  │ "..."            │  │ "..."            │   │
│  │ — G.T.           │  │ — N.U.           │  │ — B.K.           │   │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Mobile Layout (<768px) — horizontal swipe carousel**

```
┌────────────────────────────────┐
│                                │
│  Bemorlarimiz fikri            │
│  ★★★★★ 4.9 / 5.0              │
│                                │
│  ← ┌──────────────────────┐ → │
│     │ ★★★★★               │   │
│     │ "Miracle klinikasi  │   │
│     │  mening umidim edi  │   │
│     │  va ular uni amalga │   │
│     │  oshirdi."          │   │
│     │ { avatar }          │   │
│     │ — Z.A.              │   │
│     └──────────────────────┘   │
│                                │
│  [ ● ○ ○ ○ ○ ]               │
│  prev / next arrows            │
│                                │
└────────────────────────────────┘
```

---

## 09 — FAQ

**Purpose:** Objection handling. Remove the remaining barriers to booking a consultation.

**Headline:** "Ko'p so'raladigan savollar" / "Часто задаваемые вопросы" / "Frequently Asked Questions"

**Content:** 8–10 accordion items covering cost, success rates, timeline, pain, privacy, eligibility, male factor, regional patients. Each answer ends with a soft CTA to consult.

**CTA:** Bottom section CTA after accordion

**Desktop Layout (≥768px) — single column full-width accordion**

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│              Ko'p so'raladigan savollar                                │
│              Javob topa olmagan savolingiz bo'lsa,                    │
│              biz bilan bog'laning                                      │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │  EKO qancha turadi?                                         [+]  │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │  EKO muvaffaqiyat darajasi qancha?                          [+]  │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │  EKO jarayoni qancha vaqt davom etadi?                      [−]  │ │
│  │                                                                  │ │
│  │  EKO protokoli odatda 4–6 hafta davom etadi. Dastlab           │ │
│  │  tayyorgarlik davridan so'ng stimulyatsiya, tuxum olish        │ │
│  │  va embrion ko'chirish amalga oshiriladi. To'liq jarayon       │ │
│  │  3 oyga qadar cho'zilishi mumkin. Mutaxassisimiz sizning        │ │
│  │  holatga qarab aniq jadval tuzadi.                             │ │
│  │                                                                  │ │
│  │  → Bepul maslahatda vaqtni bilib oling                         │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │  EKO og'riqli bo'ladimi?                                    [+]  │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │  Ma'lumotlarim maxfiy saqlanadimi?                          [+]  │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │  Erkak bepushtligi bilan ham davolanish mumkinmi?           [+]  │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │  Viloyatdan kelgan bemorlarga qanday yordam berasiz?        [+]  │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │  Nechi yoshgacha EKO qilish mumkin?                         [+]  │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│           ( Batafsil savol — Biz bilan bog'laning )                   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Mobile Layout (<768px) — same, full-width accordion**

```
┌────────────────────────────────┐
│                                │
│  Ko'p so'raladigan savollar    │
│  Javob topa olmagan savolingiz │
│  bo'lsa, biz bilan bog'laning  │
│                                │
│  ┌──────────────────────────┐  │
│  │ EKO qancha turadi?  [+]  │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │ Muvaffaqiyat darajasi[+] │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │ Jarayon qancha vaqt? [−] │  │
│  │                          │  │
│  │ EKO protokoli odatda     │  │
│  │ 4–6 hafta davom etadi... │  │
│  │                          │  │
│  │ → Bepul maslahat olish   │  │
│  └──────────────────────────┘  │
│  ...                           │
│                                │
│  ( Biz bilan bog'laning )      │
│                                │
└────────────────────────────────┘
```

---

## 10 — Contact CTA

**Purpose:** Primary conversion section. Capture the lead with minimal friction. Multiple contact modalities.

**Headline:** "Bugun maslahat oling" / "Запишитесь на консультацию сегодня" / "Book Your Consultation Today"

**Content:**
- Emotional subheadline
- Reassurance microcopy (confidential, no obligation, 24h response)
- Booking form (Name, Phone required; City, Service, Message optional)
- Alternative contacts: Phone, WhatsApp, Telegram
- Clinic address + map embed

**CTA:** "Maslahat olish" (form submit)

**Desktop Layout (≥1024px) — 2 column: form left, contact info right**

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│              Bugun maslahat oling                                      │
│     Birinchi qadam — bepul va hech qanday majburiyatsiz               │
│                                                                        │
│  ┌─────────────────────────────────────┐  ┌────────────────────────┐ │
│  │  BOOKING FORM                       │  │  CONTACT INFO          │ │
│  │                                     │  │                        │ │
│  │  [Full Name *              ]        │  │  <phone>               │ │
│  │  [Phone Number *           ]        │  │  +998 XX XXX-XX-XX     │ │
│  │  [City (optional)          ]        │  │  (click to call)       │ │
│  │  [Service Interest    ▾    ]        │  │                        │ │
│  │  [Message (optional)       ]        │  │  <message-circle>      │ │
│  │  [                         ]        │  │  WhatsApp              │ │
│  │  [                         ]        │  │  (tap to message)      │ │
│  │                                     │  │                        │ │
│  │  <lock> 100% maxfiy                 │  │  <send>                │ │
│  │  <check> Hech qanday majburiyat yo'q│  │  Telegram              │ │
│  │  <clock> 24 soat ichida javob       │  │  (tap to message)      │ │
│  │                                     │  │                        │ │
│  │  [honeypot field — hidden]          │  │  ─────────────────     │ │
│  │                                     │  │                        │ │
│  │  ( Maslahat olish )                 │  │  <map-pin>             │ │
│  │                                     │  │  Toshkent, [Address]   │ │
│  └─────────────────────────────────────┘  │                        │ │
│                                           │  { Map embed }         │ │
│                                           │                        │ │
│                                           └────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

**Mobile Layout (<768px) — stacked: form → contacts → map**

```
┌────────────────────────────────┐
│                                │
│  Bugun maslahat oling          │
│  Birinchi qadam — bepul        │
│                                │
│  [Full Name *            ]     │
│  [Phone Number *         ]     │
│  [City (optional)        ]     │
│  [Service Interest  ▾    ]     │
│  [Message (optional)     ]     │
│  [                       ]     │
│                                │
│  <lock> 100% maxfiy            │
│  <check> Majburiyat yo'q       │
│  <clock> 24 soat ichida javob  │
│                                │
│  ( Maslahat olish )            │
│                                │
│  ─────────────────────────     │
│                                │
│  <phone> +998 XX XXX-XX-XX     │
│  <wa>   WhatsApp               │
│  <tg>   Telegram               │
│                                │
│  <map-pin> Toshkent, [Address] │
│                                │
│  { Map embed }                 │
│                                │
└────────────────────────────────┘
```

**Form States:**
- `idle` — Default, all fields enabled
- `submitting` — Fields disabled, submit shows spinner, button text changes
- `success` — Form hidden, success message shown with reassurance ("Biz tez orada siz bilan bog'lanamiz!")
- `error` — Inline error banner, fields re-enabled, retry possible

---

## 11 — Footer

**Purpose:** Trust, utility, local SEO signals, and final conversion opportunity.

**Headline:** N/A (logo-led)

**Content:** Logo, NAP, hours, nav links, socials, language switcher, legal links, copyright.

**CTA:** WhatsApp / Telegram deep links

**Desktop Layout (≥1024px) — 4 column**

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  {Logo}                  Sahifalar      Ish vaqti      Biz bilan      │
│  Miracle IVF Klinikasi                                                 │
│                          Xizmatlar      Du–Ju: 9–18    <phone>        │
│  <map-pin>               Shifokorlar    Sha:   9–14    +998 XX XX XX  │
│  Toshkent, [address]     Jarayon        Yak:   Dam.                   │
│                          Muvaffaqiyat                  <instagram>    │
│  <phone>                 FAQ            [UZ|RU|EN]     <facebook>     │
│  +998 XX XXX-XX-XX       Bog'lanish                    <whatsapp>     │
│                                                        <telegram>     │
│                                                                        │
│  ────────────────────────────────────────────────────────────────────  │
│  © 2025 Miracle IVF        Maxfiylik siyosati    Foydalanish shartlari│
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Mobile Layout (<768px) — stacked accordion-style columns**

```
┌────────────────────────────────┐
│  {Logo}  Miracle IVF           │
│                                │
│  <map-pin> Toshkent [address]  │
│  <phone>  +998 XX XXX-XX-XX   │
│                                │
│  [UZ]  [RU]  [EN]             │
│                                │
│  Xizmatlar · Shifokorlar       │
│  Jarayon · FAQ · Bog'lanish    │
│                                │
│  Du–Ju: 9:00–18:00             │
│  Shanba: 9:00–14:00            │
│                                │
│  <instagram> <facebook>        │
│  <whatsapp> <telegram>         │
│                                │
│  ──────────────────────────    │
│  © 2025 Miracle IVF            │
│  Maxfiylik · Shartlar          │
└────────────────────────────────┘
```

---

## 12 — Sticky Mobile CTA Bar

**Purpose:** Always-visible conversion anchor on mobile. Prevents needing to scroll back to find a CTA.

**Visible:** Mobile only (<768px), fixed bottom, above page fold.

**Desktop:** Hidden (hidden via `md:hidden`)

```
┌────────────────────────────────┐
│  ( <phone> Qo'ng'iroq )  ( <calendar> Maslahat olish ) │
└────────────────────────────────┘
```

**States:**
- Hidden when the Contact form section (#contact) is in viewport (to avoid double CTA noise)
- Shown at all other scroll positions on mobile
