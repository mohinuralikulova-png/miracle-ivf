# CONTENT_ARCHITECTURE.md — Miracle IVF Landing Page

> Copy architecture for every section across all three locales (UZ / RU / EN).
> All strings are keyed for `src/messages/`. UZ is the source/canonical language.
> Keys follow the pattern `section.element` matching the dictionary namespace structure.

---

## Dictionary Namespace Map

```
messages/
├── uz.json  ← canonical source
├── ru.json  ← translation (mirrors UZ keys exactly)
└── en.json  ← translation (mirrors UZ keys exactly)

Namespaces:
  common.*         Shared strings (clinic name, phone, CTA fallbacks)
  meta.*           Page metadata (title, description, OG)
  nav.*            Navigation labels
  hero.*           Hero section
  stats.*          Trust Statistics section
  problem.*        Problem & Solution section
  services.*       Services section + service item keys
  doctors.*        Doctors section
  process.*        IVF Process section + step keys
  stories.*        Success Stories section
  testimonials.*   Testimonials section
  faq.*            FAQ section + Q&A item keys
  contact.*        Contact CTA section + form fields
  form.*           Form fields, labels, placeholders, errors
  validation.*     Zod validation messages
  footer.*         Footer content
  a11y.*           Screen-reader-only labels and announcements
```

---

## 00 — Common Strings

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `common.clinicName` | Miracle IVF | Miracle IVF | Miracle IVF |
| `common.phone` | +998 XX XXX-XX-XX | +998 XX XXX-XX-XX | +998 XX XXX-XX-XX |
| `common.address` | Toshkent, [Manzil] | Ташкент, [Адрес] | Tashkent, [Address] |
| `common.ctaPrimary` | Maslahat olish | Записаться | Book Consultation |
| `common.ctaCall` | Qo'ng'iroq qiling | Позвоните нам | Call Us |
| `common.ctaWhatsapp` | WhatsApp | WhatsApp | WhatsApp |
| `common.ctaTelegram` | Telegram | Telegram | Telegram |
| `common.learnMore` | Batafsil | Подробнее | Learn More |
| `common.loading` | Yuklanmoqda... | Загрузка... | Loading... |
| `common.close` | Yopish | Закрыть | Close |

---

## 01 — Page Metadata

### meta.*

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `meta.title` | Miracle IVF — Toshkentdagi EKO klinikasi | Miracle IVF — Клиника ЭКО в Ташкенте | Miracle IVF — IVF Clinic in Tashkent |
| `meta.description` | Xalqaro mutaxassislar bilan zamonaviy EKO davolash. 65% muvaffaqiyat darajasi. Bepul maslahat olish uchun hozir bog'laning. | Современное ЭКО-лечение с международными специалистами. Успешность 65%. Запишитесь на бесплатную консультацию. | Advanced IVF treatment with international specialists. 65% success rate. Book a free consultation today. |
| `meta.ogTitle` | Miracle IVF — Umid, ilm va mehr | Miracle IVF — Надежда, наука и забота | Miracle IVF — Hope, Science & Care |
| `meta.ogDescription` | Farzandli bo'lish orzuingizni amalga oshiring. Toshkentda xalqaro darajadagi EKO klinikasi. | Осуществите мечту о ребёнке. Клиника ЭКО международного уровня в Ташкенте. | Make your dream of parenthood a reality. International-standard IVF clinic in Tashkent. |
| `meta.twitterTitle` | Miracle IVF — Toshkentdagi EKO klinikasi | Miracle IVF — Клиника ЭКО в Ташкенте | Miracle IVF — IVF Clinic in Tashkent |

---

## 02 — Navigation

### nav.*

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `nav.services` | Xizmatlar | Услуги | Services |
| `nav.doctors` | Shifokorlar | Врачи | Doctors |
| `nav.process` | Jarayon | Процесс | Process |
| `nav.success` | Muvaffaqiyatlar | Истории успеха | Success Stories |
| `nav.contact` | Bog'lanish | Контакты | Contact |
| `nav.openMenu` | Menyuni ochish | Открыть меню | Open menu |
| `nav.closeMenu` | Menyuni yopish | Закрыть меню | Close menu |
| `nav.langLabel` | Tilni tanlang | Выберите язык | Select language |
| `nav.currentLang` | O'zbek | Русский | English |
| `nav.switchToUz` | O'zbekchaga o'tish | Переключить на узбекский | Switch to Uzbek |
| `nav.switchToRu` | Ruscha | Русский | Switch to Russian |
| `nav.switchToEn` | Inglizcha | На английский | Switch to English |

---

## 03 — Hero Section

### hero.*

#### Heading

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `hero.heading` | Farzandli bo'lish orzuingiz — bizning vazifamiz | Стать родителями — наша общая цель | Your Dream of Parenthood — Our Mission |

#### Subheading

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `hero.subheading` | Xalqaro mutaxassislar bilan zamonaviy EKO davolash. Toshkentda. Siz uchun. | Современное ЭКО-лечение с международными специалистами. В Ташкенте. Для вас. | Modern IVF treatment with international specialists. In Tashkent. For you. |

#### Trust Micro-strip

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `hero.trust1` | 65% muvaffaqiyat darajasi | 65% успешных процедур | 65% success rate |
| `hero.trust2` | 10 000+ xursand oila | 10 000+ счастливых семей | 10,000+ happy families |
| `hero.trust3` | Xalqaro shifokorlar | Международные специалисты | International doctors |

#### CTAs

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `hero.ctaPrimary` | Bepul maslahat olish | Записаться на консультацию | Book a Free Consultation |
| `hero.ctaSecondary` | Qo'ng'iroq qiling | Позвоните нам | Call Us |

#### Image Alt Text

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `hero.imageAlt` | Xursand oila — Miracle IVF klinikasi | Счастливая семья — Клиника Miracle IVF | Happy family — Miracle IVF Clinic |

---

## 04 — Trust Statistics Section

### stats.*

#### Section Label (optional, small)

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `stats.sectionLabel` | Bizning natijalarimiz | Наши результаты | Our Results |

#### Stat Items

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `stats.successRate.value` | 65% | 65% | 65% |
| `stats.successRate.label` | Muvaffaqiyat darajasi | Успешность ЭКО | IVF Success Rate |
| `stats.babiesBorn.value` | 10 000+ | 10 000+ | 10,000+ |
| `stats.babiesBorn.label` | Tug'ilgan bolalar | Рождённых детей | Babies Born |
| `stats.yearsExp.value` | 15+ | 15+ | 15+ |
| `stats.yearsExp.label` | Yillik tajriba | Лет опыта | Years of Experience |
| `stats.doctors.value` | 20+ | 20+ | 20+ |
| `stats.doctors.label` | Xalqaro shifokorlar | Международных врачей | International Doctors |

#### Accessibility

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `stats.ariaLabel` | Klinika statistikasi | Статистика клиники | Clinic statistics |

---

## 05 — Problem & Solution Section

### problem.*

#### Heading

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `problem.heading` | Farzand kutish og'ir... | Ждать ребёнка тяжело... | Waiting is hard... |
| `problem.subheading` | Ammo siz yolg'iz emassiz. Biz tushundik. | Но вы не одни. Мы понимаем. | But you're not alone. We understand. |

#### Problem Side — Heading + Items

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `problem.leftHeading` | Ko'p juftliklar duch keladigan qiyinchiliklar | С чем сталкиваются пары | What many couples face |
| `problem.item1` | Yillar davomida kutish va umidsizliklar | Годы ожиданий и разочарований | Years of waiting and disappointment |
| `problem.item2` | Aniq javob va yo'nalish yo'qligi | Отсутствие чётких ответов | Lack of clear answers or direction |
| `problem.item3` | Noaniqlik va kelajak haqida qo'rquv | Неопределённость и страх будущего | Uncertainty and fear about the future |
| `problem.item4` | Mahalliy klinikalarda cheklangan imkoniyatlar | Ограниченные возможности местных клиник | Limited options at local clinics |

#### Solution Side — Heading + Items

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `problem.rightHeading` | Miracle IVF — boshqacha yondashuv | Miracle IVF — другой подход | Miracle IVF — a different approach |
| `problem.solution1` | Zamonaviy EKO texnologiyalari va sertifikatlangan laboratoriyalar | Современные технологии ЭКО и сертифицированные лаборатории | Advanced IVF technology and certified laboratories |
| `problem.solution2` | Xalqaro mutaxassislar jamoasi — 15+ yillik tajriba | Команда международных специалистов — 15+ лет опыта | International specialist team — 15+ years experience |
| `problem.solution3` | Har bir bemorga individual va hurmatli yondashuv | Индивидуальный и уважительный подход к каждому пациенту | Individual, respectful care for every patient |
| `problem.solution4` | Sizning tillingizda — o'zbek, rus, ingliz | На вашем языке — узбекский, русский, английский | In your language — Uzbek, Russian, English |

#### CTA

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `problem.cta` | Bepul maslahat olish | Записаться на консультацию | Book a Free Consultation |

---

## 06 — Services Section

### services.*

#### Section Heading

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `services.heading` | Bizning xizmatlarimiz | Наши услуги | Our Services |
| `services.subheading` | Har bir holat uchun zamonaviy davolash usullari | Современные методы лечения для каждой ситуации | Advanced treatment methods for every situation |

#### Service: IVF (EKO)

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `services.ivf.title` | EKO (IVF) | ЭКО (IVF) | IVF (In Vitro Fertilisation) |
| `services.ivf.description` | Sun'iy urug'lantirish — eng keng qo'llaniladigan bepushtlik davolash usuli | Экстракорпоральное оплодотворение — наиболее распространённый метод лечения бесплодия | In vitro fertilisation — the most widely used fertility treatment |
| `services.ivf.iconAlt` | EKO xizmati belgisi | Иконка ЭКО | IVF service icon |

#### Service: ICSI (IKSI)

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `services.icsi.title` | IKSI (ICSI) | ИКСИ (ICSI) | ICSI |
| `services.icsi.description` | Bitta spermatozoidni tuxum hujayraga to'g'ridan-to'g'ri kiritish — erkak bepushtligida samarali | Введение одного сперматозоида непосредственно в яйцеклетку — эффективно при мужском бесплодии | Injection of a single sperm directly into the egg — effective for male infertility |
| `services.icsi.iconAlt` | IKSI xizmati belgisi | Иконка ИКСИ | ICSI service icon |

#### Service: IUI

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `services.iui.title` | IUI (Intrauterin inseminatsiya) | ВМИ (Внутриматочная инсеминация) | IUI (Intrauterine Insemination) |
| `services.iui.description` | Tanlangan spermatozoidi bachadonga kiritish — kamroq invaziv, bemorlar uchun qulay usul | Введение подготовленной спермы в полость матки — менее инвазивный метод | Placement of prepared sperm into the uterus — a less invasive option |
| `services.iui.iconAlt` | IUI xizmati belgisi | Иконка ВМИ | IUI service icon |

#### Service: Egg/Embryo Freezing

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `services.freezing.title` | Tuxum va embrion muzlatish | Криоконсервация яйцеклеток и эмбрионов | Egg & Embryo Freezing |
| `services.freezing.description` | Kelajakka sifatli biologik material saqlash — vitrifikatsiya usuli bilan | Сохранение биологического материала высокого качества на будущее методом витрификации | Preserving high-quality biological material for the future using vitrification |
| `services.freezing.iconAlt` | Kriobiologiya xizmati belgisi | Иконка криоконсервации | Freezing service icon |

#### Service: Male Infertility

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `services.male.title` | Erkak bepushtligini davolash | Лечение мужского бесплодия | Male Infertility Treatment |
| `services.male.description` | Sperma tahlili, androlog maslahati va zamonaviy davolash usullari | Анализ спермы, консультация андролога и современные методы лечения | Sperm analysis, andrologist consultation and advanced treatment options |
| `services.male.iconAlt` | Erkak bepushtligi xizmati belgisi | Иконка мужского бесплодия | Male infertility service icon |

#### Service: Genetic Testing (PGT)

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `services.pgt.title` | Genetik tekshirish (PGT) | Генетическое тестирование (ПГТ) | Genetic Testing (PGT) |
| `services.pgt.description` | Embrionlarning ko'chirishdan oldin genetik sog'lig'ini tekshirish | Проверка генетического здоровья эмбрионов перед переносом | Genetic health screening of embryos before transfer |
| `services.pgt.iconAlt` | Genetik tekshirish belgisi | Иконка генетического тестирования | Genetic testing service icon |

#### Section CTA

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `services.cta` | Qaysi xizmat sizga mos? — Maslahat olish | Какая услуга подходит вам? — Записаться | Which service is right for you? — Book Consultation |
| `services.learnMore` | Batafsil | Подробнее | Learn More |

---

## 07 — Doctors Section

### doctors.*

#### Section Heading

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `doctors.heading` | Bizning mutaxassislarimiz | Наши специалисты | Our Specialists |
| `doctors.subheading` | Xalqaro tajriba va mahalliy tushunish bir joyda | Международный опыт и местное понимание в одном месте | International expertise with local understanding |

#### Doctor Card Labels

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `doctors.yearsLabel` | yillik tajriba | лет опыта | years of experience |
| `doctors.trainedIn` | Ixtisoslashuv mamlakatı | Страна специализации | Country of training |
| `doctors.certBadge` | Sertifikatlangan | Сертифицирован | Certified |
| `doctors.photoAlt` | Dr. {name} — Miracle IVF mutaxassisi | Д-р {name} — специалист Miracle IVF | Dr. {name} — Miracle IVF specialist |

#### Section CTA

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `doctors.cta` | Mutaxassisimiz bilan maslahat olish | Записаться к специалисту | Book with a Specialist |

---

## 08 — IVF Process Section

### process.*

#### Section Heading

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `process.heading` | EKO jarayoni: qadamma-qadam | Процесс ЭКО: шаг за шагом | The IVF Process: Step by Step |
| `process.subheading` | Sizning yo'lingiz aniq va biz har qadamda yoningdamiz | Ваш путь ясен, и мы рядом на каждом шаге | Your path is clear, and we're with you at every step |

#### Step 1 — Consultation

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `process.step1.number` | 01 | 01 | 01 |
| `process.step1.title` | Konsultatsiya | Консультация | Consultation |
| `process.step1.description` | Holatingizni batafsil o'rganamiz va individual davolash rejasi tuzamiz. Savollaringizga javob beramiz. | Мы подробно изучим вашу ситуацию и составим индивидуальный план лечения. Ответим на все вопросы. | We study your situation in detail and build a personalised treatment plan. All your questions answered. |

#### Step 2 — Diagnosis & Testing

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `process.step2.number` | 02 | 02 | 02 |
| `process.step2.title` | Tashxis va tekshiruvlar | Диагностика и анализы | Diagnosis & Testing |
| `process.step2.description` | Qon tahlillari, ultratovush tekshiruvi, sperma tahlili va boshqa zaruriy tekshiruvlar. | Анализы крови, УЗИ, спермограмма и другие необходимые исследования. | Blood tests, ultrasound, sperm analysis and all required diagnostics. |

#### Step 3 — Stimulation

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `process.step3.number` | 03 | 03 | 03 |
| `process.step3.title` | Stimulyatsiya | Стимуляция | Stimulation |
| `process.step3.description` | Tuxumdonni rivojlantirish uchun gormonal davolash. Shifokorlar tomonidan doimiy nazorat ostida. | Гормональная терапия для стимуляции яичников под постоянным наблюдением врачей. | Hormonal therapy to stimulate the ovaries, under continuous medical supervision. |

#### Step 4 — Egg Retrieval & Fertilisation

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `process.step4.number` | 04 | 04 | 04 |
| `process.step4.title` | Tuxum olish va urug'lantirish | Забор яйцеклеток и оплодотворение | Egg Retrieval & Fertilisation |
| `process.step4.description` | Tuxum hujayralari olinib, laboratoriyada spermatozoid bilan urug'lantiriladi. | Яйцеклетки извлекаются и оплодотворяются спермой в лаборатории. | Eggs are collected and fertilised with sperm in the laboratory. |

#### Step 5 — Embryo Transfer

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `process.step5.number` | 05 | 05 | 05 |
| `process.step5.title` | Embrion ko'chirish | Перенос эмбриона | Embryo Transfer |
| `process.step5.description` | Sifatli embrion bachadonga joylashtiriladi. Bu jarayon og'riqsiz va qisqa vaqt oladi. | Качественный эмбрион переносится в матку. Процедура безболезненна и занимает немного времени. | A quality embryo is placed into the uterus. The procedure is painless and takes a short time. |

#### Step 6 — Pregnancy Support

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `process.step6.number` | 06 | 06 | 06 |
| `process.step6.title` | Homiladorlik qo'llab-quvvatlash | Поддержка беременности | Pregnancy Support |
| `process.step6.description` | Muvaffaqiyatli ko'chirishdan so'ng siz bilan birga bo'lamiz — dori-darmon, tekshiruvlar va hissiy qo'llab-quvvatlash. | После успешного переноса мы рядом — лекарства, обследования и эмоциональная поддержка. | After a successful transfer we stay with you — medication, check-ups and emotional support. |

#### Section CTA

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `process.cta` | Jarayonni boshlash — Bepul maslahat | Начать путь — Бесплатная консультация | Start Your Journey — Free Consultation |

---

## 09 — Success Stories Section

### stories.*

#### Section Heading

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `stories.heading` | Muvaffaqiyat tarihlari | Истории успеха | Success Stories |
| `stories.subheading` | 10 000 dan ortiq oilaga baxt in'om etildi | Более 10 000 семей обрели счастье | Over 10,000 families found happiness |

#### Story Card Labels

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `stories.outcomeLabel` | Natija | Результат | Outcome |
| `stories.locationLabel` | Shahar | Город | City |
| `stories.yearLabel` | Yil | Год | Year |
| `stories.photoAlt` | Xursand oila — Miracle IVF muvaffaqiyat tarihi | Счастливая семья — история успеха Miracle IVF | Happy family — Miracle IVF success story |
| `stories.privacyNote` | (Bemorning roziligi bilan chop etildi) | (Опубликовано с согласия пациента) | (Published with patient consent) |

#### Section CTA

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `stories.cta` | Siz ham boshlay olasiz — Bepul maslahat olish | Вы тоже можете начать — Бесплатная консультация | You Can Start Too — Book a Free Consultation |

---

## 10 — Testimonials Section

### testimonials.*

#### Section Heading

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `testimonials.heading` | Bemorlarimiz fikri | Отзывы пациентов | Patient Testimonials |
| `testimonials.ratingLabel` | umumiy reyting | общий рейтинг | overall rating |
| `testimonials.reviewCountLabel` | {count}+ sharh | {count}+ отзывов | {count}+ reviews |

#### Carousel Controls

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `testimonials.prevLabel` | Oldingi | Предыдущий | Previous |
| `testimonials.nextLabel` | Keyingi | Следующий | Next |
| `testimonials.slideLabel` | {current}/{total} sharh | Отзыв {current} из {total} | Testimonial {current} of {total} |

#### Testimonial Card Labels

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `testimonials.stars` | {count} yulduz (5 dan) | {count} звезды из 5 | {count} stars out of 5 |
| `testimonials.verifiedLabel` | Tasdiqlangan bemor | Верифицированный пациент | Verified patient |

---

## 11 — FAQ Section

### faq.*

#### Section Heading

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `faq.heading` | Ko'p so'raladigan savollar | Часто задаваемые вопросы | Frequently Asked Questions |
| `faq.subheading` | Javob topa olmagan savolingiz bo'lsa, biz bilan bog'laning | Если у вас остались вопросы — свяжитесь с нами | If you have more questions, reach out to us |

#### FAQ Item: Cost

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `faq.cost.question` | EKO qancha turadi? | Сколько стоит ЭКО? | How much does IVF cost? |
| `faq.cost.answer` | EKO narxi individual holat, tanlangan protokol va zarur tekshiruvlarga bog'liq. Aniq narxni bilish uchun bepul konsultatsiyaga yozing — mutaxassisimiz sizning holatni ko'rib, to'liq ma'lumot beradi. | Стоимость ЭКО зависит от индивидуальной ситуации, выбранного протокола и необходимых анализов. Запишитесь на бесплатную консультацию — специалист изучит вашу ситуацию и предоставит полную информацию. | IVF cost depends on your individual situation, the chosen protocol and required tests. Book a free consultation — our specialist will review your case and give you full details. |

#### FAQ Item: Success Rate

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `faq.successRate.question` | EKO muvaffaqiyat darajasi qancha? | Какова успешность ЭКО? | What is the IVF success rate? |
| `faq.successRate.answer` | Miracle IVF da o'rtacha muvaffaqiyat darajasi 65% ni tashkil etadi. Bu ko'rsatkich yosh, sog'liq holati va tanlangan protokolga qarab farq qilishi mumkin. Konsultatsiyada sizning individual prognozingizni muhokama qilamiz. | В Miracle IVF средний уровень успешности составляет 65%. Этот показатель может варьироваться в зависимости от возраста, состояния здоровья и выбранного протокола. На консультации мы обсудим ваш индивидуальный прогноз. | At Miracle IVF the average success rate is 65%. This figure may vary depending on age, health status and the protocol chosen. At your consultation we will discuss your individual prognosis. |

#### FAQ Item: Timeline

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `faq.timeline.question` | EKO jarayoni qancha vaqt davom etadi? | Сколько длится процесс ЭКО? | How long does the IVF process take? |
| `faq.timeline.answer` | Standart EKO protokoli 4–6 hafta davom etadi. To'liq jarayon (birinchi konsultatsiyadan homiladorlik testiga qadar) 2–3 oyga cho'zilishi mumkin. Har bir bemor uchun aniq vaqt jadvalini konsultatsiyada tuzamiz. | Стандартный протокол ЭКО занимает 4–6 недель. Полный процесс (от первой консультации до теста на беременность) может занять 2–3 месяца. Точный график составляется индивидуально на консультации. | A standard IVF protocol takes 4–6 weeks. The full process (first consultation to pregnancy test) may take 2–3 months. We create an individual schedule at your consultation. |

#### FAQ Item: Pain

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `faq.pain.question` | EKO og'riqli bo'ladimi? | ЭКО болезненно? | Is IVF painful? |
| `faq.pain.answer` | Ko'pgina bemorlar EKO jarayonini yaxshi ko'taradilar. Tuxum olish jarayoni mahalliy yoki umumiy anesteziya ostida amalga oshiriladi, embrion ko'chirish esa og'riqsiz. Ba'zi bezovtalik bo'lishi mumkin, lekin shifokorlarimiz doim yoningizda. | Большинство пациентов хорошо переносят ЭКО. Забор яйцеклеток проводится под местной или общей анестезией, перенос эмбриона безболезнен. Возможен небольшой дискомфорт, но наши врачи всегда рядом. | Most patients tolerate IVF well. Egg retrieval is performed under local or general anaesthesia; embryo transfer is painless. Some discomfort is possible, but our doctors are always with you. |

#### FAQ Item: Privacy

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `faq.privacy.question` | Ma'lumotlarim maxfiy saqlanadimi? | Мои данные будут конфиденциальными? | Will my information be kept confidential? |
| `faq.privacy.answer` | Ha, mutlaqo. Barcha tibbiy ma'lumotlar maxfiy saqlanadi va faqat davolash jarayonida ishlatiladi. Biz maxfiylikni ustuvor deb bilamiz — ayniqsa bu kabi shaxsiy masalada. | Да, абсолютно. Вся медицинская информация строго конфиденциальна и используется исключительно в целях лечения. Конфиденциальность — наш приоритет, особенно в столь личном вопросе. | Yes, absolutely. All medical information is kept strictly confidential and used only for treatment purposes. Confidentiality is our priority — especially on such a personal matter. |

#### FAQ Item: Male Infertility

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `faq.male.question` | Erkak bepushtligi bilan ham davolanish mumkinmi? | Лечится ли мужское бесплодие? | Can male infertility be treated? |
| `faq.male.answer` | Ha. Erkak bepushtligi — muolaja qilinishi mumkin bo'lgan holat. Bizning urolog-androlog mutaxassislarimiz sperma tahlilidan davolash va IKSI texnikasiga qadar to'liq yordam beradi. | Да. Мужское бесплодие — это состояние, поддающееся лечению. Наши урологи-андрологи оказывают полную поддержку: от спермограммы до лечения и применения технологии ИКСИ. | Yes. Male infertility is a treatable condition. Our urologist-andrologists provide full support, from sperm analysis through to treatment and ICSI technology. |

#### FAQ Item: Regional Patients

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `faq.regional.question` | Viloyatdan kelgan bemorlarga qanday yordam berasiz? | Как вы помогаете пациентам из регионов? | How do you support patients from outside Tashkent? |
| `faq.regional.answer` | Biz viloyatlardan kelgan bemorlarni alohida e'tibor bilan kutib olamiz. Kelishdan oldin masofaviy maslahat olish, tura joylash bo'yicha tavsiyalar va moslashuvchan jadval bilan yordam beramiz. | Мы особенно рады пациентам из регионов. Предлагаем дистанционную консультацию перед приездом, рекомендации по проживанию и гибкий график. | We warmly welcome patients from outside Tashkent. We offer remote consultations before you travel, accommodation recommendations and a flexible schedule. |

#### FAQ Item: Age

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `faq.age.question` | Nechi yoshgacha EKO qilish mumkin? | До какого возраста можно делать ЭКО? | Up to what age can IVF be performed? |
| `faq.age.answer` | Yoshga cheklash mavjud bo'lsa-da, har bir holat individual ko'rib chiqiladi. Muvaffaqiyat darajasi yoshga bog'liq bo'lgani uchun, imkon qadar ertaroq maslahat olishni tavsiya etamiz. | Ограничения по возрасту существуют, однако каждый случай рассматривается индивидуально. Поскольку успешность зависит от возраста, рекомендуем обратиться как можно раньше. | Age limits apply, though every case is assessed individually. Since success rates are age-related, we recommend seeking advice as early as possible. |

#### Section CTA

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `faq.cta` | Boshqa savollaringiz bormi? — Biz bilan bog'laning | Остались вопросы? — Свяжитесь с нами | More Questions? — Contact Us |

---

## 12 — Contact CTA Section

### contact.*

#### Section Heading

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `contact.heading` | Bugun maslahat oling | Запишитесь на консультацию сегодня | Book Your Consultation Today |
| `contact.subheading` | Birinchi qadam — bepul, majburiyatsiz va maxfiy | Первый шаг — бесплатно, без обязательств и конфиденциально | The first step is free, no obligation, and completely confidential |

#### Reassurance Microcopy

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `contact.reassurance1` | 100% maxfiy | 100% конфиденциально | 100% confidential |
| `contact.reassurance2` | Hech qanday majburiyat yo'q | Никаких обязательств | No obligation |
| `contact.reassurance3` | 24 soat ichida javob | Ответ в течение 24 часов | Response within 24 hours |
| `contact.reassurance4` | Bepul maslahat | Бесплатная консультация | Free consultation |

#### Alternative Contact Labels

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `contact.orContact` | Yoki to'g'ridan-to'g'ri bog'laning | Или свяжитесь напрямую | Or contact us directly |
| `contact.phoneLabel` | Telefon | Телефон | Phone |
| `contact.whatsappLabel` | WhatsApp orqali yozing | Написать в WhatsApp | Message via WhatsApp |
| `contact.telegramLabel` | Telegram orqali yozing | Написать в Telegram | Message via Telegram |
| `contact.addressLabel` | Manzil | Адрес | Address |
| `contact.hoursLabel` | Ish vaqti | Режим работы | Opening Hours |
| `contact.hours` | Du–Ju: 9:00–18:00, Sha: 9:00–14:00 | Пн–Пт: 9:00–18:00, Сб: 9:00–14:00 | Mon–Fri: 9:00–18:00, Sat: 9:00–14:00 |
| `contact.mapLabel` | Xaritada ko'rish | Смотреть на карте | View on map |
| `contact.mapEmbedTitle` | Miracle IVF klinikasi xaritasi | Карта клиники Miracle IVF | Miracle IVF clinic map |

---

## 13 — Form Fields & Validation

### form.*

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `form.fullName.label` | To'liq ism | Полное имя | Full Name |
| `form.fullName.placeholder` | Ismingiz va familiyangiz | Ваше имя и фамилия | Your first and last name |
| `form.phone.label` | Telefon raqam | Номер телефона | Phone Number |
| `form.phone.placeholder` | +998 XX XXX-XX-XX | +998 XX XXX-XX-XX | +998 XX XXX-XX-XX |
| `form.city.label` | Shahar (ixtiyoriy) | Город (необязательно) | City (optional) |
| `form.city.placeholder` | Toshkent, Samarqand... | Ташкент, Самарканд... | Tashkent, Samarkand... |
| `form.service.label` | Qiziquvchi xizmat (ixtiyoriy) | Интересующая услуга (необязательно) | Service of Interest (optional) |
| `form.service.placeholder` | Xizmatni tanlang | Выберите услугу | Select a service |
| `form.service.options.ivf` | EKO (IVF) | ЭКО (IVF) | IVF |
| `form.service.options.icsi` | IKSI (ICSI) | ИКСИ (ICSI) | ICSI |
| `form.service.options.iui` | IUI | ВМИ (IUI) | IUI |
| `form.service.options.freezing` | Muzlatish | Криоконсервация | Egg/Embryo Freezing |
| `form.service.options.male` | Erkak bepushtligi | Мужское бесплодие | Male Infertility |
| `form.service.options.pgt` | Genetik tekshirish (PGT) | Генетическое тестирование | Genetic Testing (PGT) |
| `form.service.options.general` | Umumiy maslahat | Общая консультация | General Consultation |
| `form.message.label` | Xabar (ixtiyoriy) | Сообщение (необязательно) | Message (optional) |
| `form.message.placeholder` | Savollaringiz yoki holatingiz haqida qisqacha yozing... | Кратко опишите ваши вопросы или ситуацию... | Briefly describe your questions or situation... |
| `form.submit` | Maslahat olish | Записаться | Book My Consultation |
| `form.submitting` | Yuborilmoqda... | Отправка... | Sending... |
| `form.required` | * majburiy | * обязательно | * required |

### validation.*

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `validation.fullName.required` | Ism majburiy | Имя обязательно | Name is required |
| `validation.fullName.minLength` | Ism kamida 2 ta belgidan iborat bo'lishi kerak | Имя должно содержать не менее 2 символов | Name must be at least 2 characters |
| `validation.fullName.maxLength` | Ism 100 ta belgidan oshmasligi kerak | Имя должно содержать не более 100 символов | Name must not exceed 100 characters |
| `validation.phone.required` | Telefon raqam majburiy | Номер телефона обязателен | Phone number is required |
| `validation.phone.invalid` | Noto'g'ri telefon raqam formati | Неверный формат номера телефона | Invalid phone number format |
| `validation.message.maxLength` | Xabar 1000 ta belgidan oshmasligi kerak | Сообщение не должно превышать 1000 символов | Message must not exceed 1000 characters |
| `validation.generic` | Iltimos, ushbu maydonni to'ldiring | Пожалуйста, заполните это поле | Please fill in this field |

### Form States

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `form.success.heading` | Rahmat! Arizangiz qabul qilindi | Спасибо! Ваша заявка принята | Thank you! Your request has been received |
| `form.success.body` | Tez orada mutaxassisimiz siz bilan bog'lanadi. Odatda 24 soat ichida javob beramiz. | В ближайшее время наш специалист свяжется с вами. Обычно мы отвечаем в течение 24 часов. | Our specialist will contact you shortly. We usually respond within 24 hours. |
| `form.success.reassurance` | Sizning ma'lumotlaringiz 100% maxfiy saqlanadi. | Ваши данные хранятся в полной конфиденциальности. | Your information is kept 100% confidential. |
| `form.error.heading` | Xato yuz berdi | Произошла ошибка | Something went wrong |
| `form.error.body` | Iltimos, qayta urinib ko'ring yoki to'g'ridan-to'g'ri telefon yoki WhatsApp orqali bog'laning. | Пожалуйста, попробуйте ещё раз или свяжитесь с нами по телефону или через WhatsApp. | Please try again or contact us directly by phone or WhatsApp. |
| `form.error.retry` | Qayta urinish | Попробовать снова | Try Again |

---

## 14 — Footer Section

### footer.*

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `footer.tagline` | Umid, ilm va mehr bilan | С надеждой, наукой и заботой | With Hope, Science & Care |
| `footer.nav.heading` | Sahifalar | Страницы | Pages |
| `footer.hours.heading` | Ish vaqti | Режим работы | Opening Hours |
| `footer.hours.weekdays` | Dushanba–Juma: 9:00–18:00 | Понедельник–Пятница: 9:00–18:00 | Monday–Friday: 9:00–18:00 |
| `footer.hours.saturday` | Shanba: 9:00–14:00 | Суббота: 9:00–14:00 | Saturday: 9:00–14:00 |
| `footer.hours.sunday` | Yakshanba: Dam olish kuni | Воскресенье: выходной | Sunday: Closed |
| `footer.social.instagram` | Instagram | Instagram | Instagram |
| `footer.social.facebook` | Facebook | Facebook | Facebook |
| `footer.social.youtube` | YouTube | YouTube | YouTube |
| `footer.privacy` | Maxfiylik siyosati | Политика конфиденциальности | Privacy Policy |
| `footer.terms` | Foydalanish shartlari | Условия использования | Terms of Use |
| `footer.copyright` | © {year} Miracle IVF. Barcha huquqlar himoyalangan. | © {year} Miracle IVF. Все права защищены. | © {year} Miracle IVF. All rights reserved. |

---

## 15 — Accessibility (Screen Reader) Strings

### a11y.*

| Key | UZ | RU | EN |
|-----|----|----|-----|
| `a11y.skipToContent` | Asosiy kontentga o'tish | Перейти к основному содержимому | Skip to main content |
| `a11y.externalLink` | (yangi oynada ochiladi) | (открывается в новом окне) | (opens in new window) |
| `a11y.required` | majburiy maydon | обязательное поле | required field |
| `a11y.formError` | Xato: | Ошибка: | Error: |
| `a11y.carouselRegion` | Bemorlar sharhlari karuseli | Карусель отзывов пациентов | Patient testimonials carousel |
| `a11y.faqRegion` | Ko'p so'raladigan savollar | Часто задаваемые вопросы | Frequently asked questions |
| `a11y.counterAnimating` | Hisoblagich animatsiyasi | Анимация счётчика | Counter animation |
| `a11y.logoAlt` | Miracle IVF — Bosh sahifaga | Miracle IVF — На главную | Miracle IVF — Home |
| `a11y.languageSwitcher` | Til tanlash | Выбор языка | Language selector |

---

## 16 — Content Notes for Translators

1. **Medical accuracy first.** All translations must be medically accurate and culturally appropriate for Uzbekistan. Do not use machine-translation directly for any medical copy.
2. **Uzbek tone:** Warm, respectful, slightly formal. Avoid overly colloquial or overly clinical register.
3. **Russian tone:** Professional but warm. Match the tone of premium medical communication in CIS countries.
4. **English tone:** Clear, confident, internationally accessible. Suitable for expats, diaspora, and medical tourists.
5. **No success guarantees.** Never translate "guarantee pregnancy" or "certain to work." Always use hedged language about success rates.
6. **Stat values** (`stats.*.value`) are data, not translations — keep identical across all three locales.
7. **Text expansion:** Russian strings are typically 20–40% longer than Uzbek. English is similar length to Uzbek. Design must not clip either.
8. **Phone numbers and addresses** are not translated — they are locale-shared (`common.*`).
9. **Validation messages** (`validation.*`) must be Zod-compatible — they are passed as string values to the schema, not rendered as JSX.
