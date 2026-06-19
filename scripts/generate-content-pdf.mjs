// Miracle IVF — Kontent to'ldirish varaqasi PDF generatori
// Ishlatish: node scripts/generate-content-pdf.mjs
// Chiqish: public/KONTENT_VARAQASI.pdf

import PDFDocument from 'pdfkit'
import { createWriteStream } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT  = join(ROOT, 'public', 'KONTENT_VARAQASI.pdf')

// ─── Ranglar ──────────────────────────────────────────────────────────────────
const BLUE       = '#163C8C'
const PINK       = '#F4B6C2'
const DARK       = '#1A1A2E'
const MUTED      = '#64748B'
const ROW_ALT    = '#F5F7FA'
const WHITE      = '#FFFFFF'
const RED_SOFT   = '#FEF2F2'
const RED_TEXT   = '#991B1B'
const AMBER_SOFT = '#FFFBEB'
const AMBER_TEXT = '#92400E'

// ─── Hujjat sozlamalari ───────────────────────────────────────────────────────
const doc = new PDFDocument({
  margin: 0,
  size: 'A4',
  bufferPages: true,
  info: {
    Title:    'Miracle IVF — Kontent To\'ldirish Varaqasi',
    Author:   'Miracle IVF',
    Subject:  'Sayt uchun kontent va ma\'lumotlar ro\'yxati',
    Keywords: 'miracle ivf kontent launch checklist',
  },
})

const stream = createWriteStream(OUT)
doc.pipe(stream)

const PW = doc.page.width   // 595.28
const PH = doc.page.height  // 841.89
const ML = 48               // chap chegara
const MR = PW - 48          // o'ng chegara
const CW = MR - ML          // ustun kengligi

let y = 0  // joriy vertikal pozitsiya

// ─── Yordamchi funksiyalar ────────────────────────────────────────────────────

function newPage() {
  doc.addPage({ margin: 0, size: 'A4' })
  y = 48
}

function ensureSpace(needed) {
  if (y + needed > PH - 60) newPage()
}

function hLine(yPos, color = '#E2E8F0', lx = ML, rx = MR) {
  doc.save().strokeColor(color).lineWidth(0.5)
     .moveTo(lx, yPos).lineTo(rx, yPos).stroke().restore()
}

function sectionTitle(text, icon = '') {
  ensureSpace(52)
  // Fon paneli
  doc.save().fillColor(BLUE).roundedRect(ML, y, CW, 36, 6).fill().restore()
  doc.save().fillColor(WHITE).fontSize(13).font('Helvetica-Bold')
     .text(`${icon}  ${text}`, ML + 14, y + 11, { width: CW - 28, lineBreak: false })
     .restore()
  y += 48
}

// Jadval headerı
function tableHeader(cols) {
  ensureSpace(28)
  doc.save().fillColor('#E8EEF7').rect(ML, y, CW, 24).fill().restore()
  let x = ML
  cols.forEach(({ label, w }) => {
    doc.save().fillColor(BLUE).fontSize(8.5).font('Helvetica-Bold')
       .text(label, x + 5, y + 8, { width: w - 10, lineBreak: false }).restore()
    x += w
  })
  y += 24
}

// Jadval qatori
function tableRow(cols, values, rowIndex, priority) {
  const lineH = 18
  // Eng uzun qiymat bo'yicha balandlikni hisoblash
  let maxLines = 1
  cols.forEach(({ w }, i) => {
    const val = values[i] || ''
    const chars = val.length
    const approxLines = Math.ceil(chars / Math.max(1, (w - 12) / 5.5))
    if (approxLines > maxLines) maxLines = approxLines
  })
  const rowH = Math.max(lineH, maxLines * 12 + 10)

  ensureSpace(rowH + 2)

  // Fon rangi
  let bg = rowIndex % 2 === 0 ? WHITE : ROW_ALT
  if (priority === 'Majburiy')    bg = RED_SOFT
  if (priority === 'Tavsiya etiladi') bg = AMBER_SOFT

  doc.save().fillColor(bg).rect(ML, y, CW, rowH).fill().restore()

  let x = ML
  cols.forEach(({ w }, i) => {
    const val = values[i] || ''
    let color = DARK
    if (i === cols.length - 1) {
      if (priority === 'Majburiy')         color = RED_TEXT
      else if (priority === 'Tavsiya etiladi') color = AMBER_TEXT
      else                                  color = MUTED
    }
    doc.save().fillColor(color).fontSize(8).font('Helvetica')
       .text(val, x + 5, y + 6, { width: w - 10, lineBreak: true }).restore()
    x += w
  })

  // Pastki chiziq
  hLine(y + rowH, '#E2E8F0')
  y += rowH
}

function badge(text, type) {
  const w = doc.widthOfString(text, { fontSize: 8 }) + 16
  const bg = type === 'req' ? '#FEE2E2' : type === 'rec' ? '#FEF3C7' : '#E0E7FF'
  const tc = type === 'req' ? '#991B1B' : type === 'rec' ? '#92400E' : BLUE
  doc.save().fillColor(bg).roundedRect(ML, y, w, 18, 4).fill().restore()
  doc.save().fillColor(tc).fontSize(8).font('Helvetica-Bold')
     .text(text, ML + 8, y + 5, { lineBreak: false }).restore()
  y += 26
}

function note(text) {
  const h = doc.heightOfString(`* ${text}`, { fontSize: 8, width: CW - 8 })
  ensureSpace(h + 12)
  doc.save().fillColor('#EFF6FF').rect(ML, y, CW, h + 8).fill().restore()
  doc.save().fillColor(MUTED).fontSize(8).font('Helvetica-Oblique')
     .text(`* ${text}`, ML + 4, y + 4, { width: CW - 8, lineBreak: true }).restore()
  y += h + 14
}

// ─── MUQOVA ───────────────────────────────────────────────────────────────────
// Yuqori band
doc.save().fillColor(BLUE).rect(0, 0, PW, 200).fill().restore()

// Yuqori o'ng dekoratsiya
doc.save().fillColor('#1B4596').opacity(0.6)
   .circle(PW - 60, 30, 120).fill().restore()
doc.save().fillColor(PINK).opacity(0.3)
   .circle(PW - 20, 180, 80).fill().restore()

// Logotip maydoni
doc.save().fillColor(WHITE).circle(ML + 28, 60, 24).fill().restore()
doc.save().fillColor(PINK).fontSize(22).font('Helvetica-Bold')
   .text('♥', ML + 17, 49, { lineBreak: false }).restore()

doc.save().fillColor(WHITE).fontSize(22).font('Helvetica-Bold')
   .text('Miracle IVF', ML + 64, 50, { lineBreak: false }).restore()
doc.save().fillColor(PINK).fontSize(11).font('Helvetica')
   .text('Umid, ilm va mehr bilan', ML + 64, 76, { lineBreak: false }).restore()

// Sarlavha
doc.save().fillColor(WHITE).fontSize(28).font('Helvetica-Bold')
   .text("KONTENT TO'LDIRISH", ML, 115, { width: CW, lineBreak: false }).restore()
doc.save().fillColor(PINK).fontSize(28).font('Helvetica-Bold')
   .text("VARAQASI", ML, 148, { width: CW, lineBreak: false }).restore()

// Pastki muqova band
doc.save().fillColor('#F5F7FA').rect(0, 200, PW, PH - 200).fill().restore()

y = 228

// Tanishtirish bloki
doc.save().fillColor(WHITE)
   .roundedRect(ML, y, CW, 110, 8).fill()
   .strokeColor('#E2E8F0').lineWidth(1).roundedRect(ML, y, CW, 110, 8).stroke()
   .restore()

doc.save().fillColor(BLUE).fontSize(12).font('Helvetica-Bold')
   .text("Hujjat maqsadi", ML + 18, y + 16).restore()

const introText =
  "Ushbu varaqada Miracle IVF sayti ishga tushirilishidan oldin to'ldirilishi zarur bo'lgan " +
  "barcha maydonlar, rasmlar va ma'lumotlar ro'yxatlangan. Har bir bo'limni to'ldiring va " +
  "to'liq varaqani dasturchi jamoaga qaytaring.\n\n" +
  "Muhim belgichalar:\n" +
  "   MAJBURIY  —  sayt ishlamaydi, zudlik bilan to'ldirilsin\n" +
  "   TAVSIYA ETILADI  —  sayt ishlaydi, lekin to'liq ko'rinish uchun kerak"

doc.save().fillColor(DARK).fontSize(9).font('Helvetica')
   .text(introText, ML + 18, y + 34, { width: CW - 36, lineBreak: true }).restore()

y += 128

// Sana
doc.save().fillColor(MUTED).fontSize(8).font('Helvetica')
   .text("Tuzilgan sana: 2026-yil 17-iyun", ML, y).restore()
y += 28

// ─── 1. KLINIKA MA'LUMOTLARI ─────────────────────────────────────────────────
sectionTitle("1. Klinika Ma'lumotlari", '#')

const cols1 = [
  { label: '#',              w: 28  },
  { label: 'Maydon',         w: 110 },
  { label: 'Joriy qiymat',   w: 130 },
  { label: 'Talab',          w: 170 },
  { label: 'Muhim',          w: 59  },
]
tableHeader(cols1)

const clinicRows = [
  ['1.1', 'Klinika nomi (UZ)', 'Miracle IVF', 'Rasmiy tijorat nomini tasdiqlang', 'Tasdiqlash'],
  ['1.2', 'Klinika nomi (RU)', 'Miracle IVF', 'Bir xil nom',                      'Tasdiqlash'],
  ['1.3', 'Klinika nomi (EN)', 'Miracle IVF', 'Bir xil nom',                      'Tasdiqlash'],
]
clinicRows.forEach((r, i) => tableRow(cols1, r, i, 'Tasdiqlash'))

// ─── 2. ALOQA MA'LUMOTLARI ───────────────────────────────────────────────────
newPage()
sectionTitle("2. Aloqa Ma'lumotlari", '#')

// 2a. Telefon
doc.save().fillColor(BLUE).fontSize(10).font('Helvetica-Bold')
   .text("2a. Telefon raqam", ML, y).restore()
y += 16

note("Telefon raqami kalit CTA tugmasi, aloqa bo'limi va Google strukturaviy ma'lumotlarida ko'rsatiladi.")

const cols2 = [
  { label: '#',             w: 28  },
  { label: 'Fayl / Til',   w: 130 },
  { label: 'Kalit',        w: 110 },
  { label: 'Joriy qiymat', w: 110 },
  { label: 'Haqiqiy qiymat', w: 115 },
  { label: 'Muhim',        w: 4   },
]
// Simplify cols for phone (fewer cols)
const colsPhone = [
  { label: '#',              w: 28  },
  { label: 'Til',            w: 60  },
  { label: 'Kalit',          w: 130 },
  { label: 'Joriy qiymat',   w: 140 },
  { label: 'Talab / Format', w: 175 },
  { label: 'Muhim',          w: 64  },
]
tableHeader(colsPhone)

const phoneRows = [
  ['2.1', "O'zbek", 'common.phone', '+998 XX XXX-XX-XX', "+998 71 234-56-78 ko'rinishida", 'Majburiy'],
  ['2.2', 'Rus',    'common.phone', '+998 XX XXX-XX-XX', 'Bir xil raqam',                   'Majburiy'],
  ['2.3', 'Ingliz', 'common.phone', '+998 XX XXX-XX-XX', 'Bir xil raqam',                   'Majburiy'],
]
phoneRows.forEach((r, i) => tableRow(colsPhone, r, i, 'Majburiy'))

y += 16

// 2b. Manzil
doc.save().fillColor(BLUE).fontSize(10).font('Helvetica-Bold')
   .text("2b. Jismoniy manzil", ML, y).restore()
y += 16
note("Har bir tilda to'liq ko'cha manzilin yozing. Aloqa bo'limi va Google rich results uchun zarur.")

tableHeader(colsPhone)
const addrRows = [
  ['2.4', "O'zbek", 'common.address', "Toshkent, [Manzil]",   "Toshkent sh., Chilonzor t., Ko'cha 1",  'Majburiy'],
  ['2.5', 'Rus',    'common.address', "Ташкент, [Адрес]",     "г. Ташкент, район, ул. Название, 1",    'Majburiy'],
  ['2.6', 'Ingliz', 'common.address', "Tashkent, [Address]",  "1 Street Name, District, Tashkent",     'Majburiy'],
]
addrRows.forEach((r, i) => tableRow(colsPhone, r, i, 'Majburiy'))

y += 16

// 2c. WhatsApp
doc.save().fillColor(BLUE).fontSize(10).font('Helvetica-Bold')
   .text("2c. WhatsApp", ML, y).restore()
y += 16
note("URL formati: https://wa.me/998XXXXXXXXX (bo'sh joy va chiziqsiz, masalan: https://wa.me/998712345678)")

tableHeader(colsPhone)
const waRows = [
  ['2.7', "O'zbek", 'common.whatsappUrl', 'https://wa.me/998000000000', 'Haqiqiy raqam bilan URL', 'Majburiy'],
  ['2.8', 'Rus',    'common.whatsappUrl', 'https://wa.me/998000000000', 'Bir xil URL',             'Majburiy'],
  ['2.9', 'Ingliz', 'common.whatsappUrl', 'https://wa.me/998000000000', 'Bir xil URL',             'Majburiy'],
]
waRows.forEach((r, i) => tableRow(colsPhone, r, i, 'Majburiy'))

y += 16

// 2d. Telegram
doc.save().fillColor(BLUE).fontSize(10).font('Helvetica-Bold')
   .text("2d. Telegram kanali", ML, y).restore()
y += 16
note("@miracleivf handlei haqiqiy va faol kanalga tegishli ekanligini tasdiqlang.")

tableHeader(colsPhone)
const tgRows = [
  ['2.10', "O'zbek", 'common.telegramUrl', 'https://t.me/miracleivf', 'Handle to\'g\'riligini tasdiqlang', 'Majburiy'],
  ['2.11', 'Rus',    'common.telegramUrl', 'https://t.me/miracleivf', 'Bir xil URL',                     'Majburiy'],
  ['2.12', 'Ingliz', 'common.telegramUrl', 'https://t.me/miracleivf', 'Bir xil URL',                     'Majburiy'],
]
tgRows.forEach((r, i) => tableRow(colsPhone, r, i, 'Majburiy'))

y += 16

// 2e. Ish vaqti
doc.save().fillColor(BLUE).fontSize(10).font('Helvetica-Bold')
   .text("2e. Ish vaqti", ML, y).restore()
y += 16

tableHeader(colsPhone)
const hoursRows = [
  ['2.13', "O'zbek", 'contact.hours', 'Du-Ju: 9:00-18:00, Sha: 9:00-14:00', 'Tasdiqlang yoki to\'g\'rilang', 'Tasdiqlash'],
  ['2.14', 'Rus',    'contact.hours', 'Pn-Pt: 9:00-18:00, Sb: 9:00-14:00',  'Tasdiqlang',                   'Tasdiqlash'],
  ['2.15', 'Ingliz', 'contact.hours', 'Mon-Fri: 9:00-18:00, Sat: 9:00-14:00','Tasdiqlang',                   'Tasdiqlash'],
]
hoursRows.forEach((r, i) => tableRow(colsPhone, r, i, 'Tasdiqlash'))

// ─── 3. IJTIMOIY TARMOQLAR ────────────────────────────────────────────────────
newPage()
sectionTitle("3. Ijtimoiy Tarmoqlar", '#')

note("Agar biron platforma bo'yicha hisob mavjud bo'lmasa, dasturchi jamoasiga xabar bering — havola olib tashlanadi.")

const colsSocial = [
  { label: '#',            w: 28  },
  { label: 'Platforma',    w: 80  },
  { label: 'Haqiqiy URL',  w: 300 },
  { label: 'Muhim',        w: 89  },
]
tableHeader(colsSocial)

const socialRows = [
  ['3.1', 'Instagram', 'https://www.instagram.com/SIZNING_HANDLE', 'Tavsiya etiladi'],
  ['3.2', 'Facebook',  'https://www.facebook.com/SIZNING_SAHIFA',  'Tavsiya etiladi'],
  ['3.3', 'YouTube',   'https://www.youtube.com/@SIZNING_KANAL',   'Tavsiya etiladi'],
]
socialRows.forEach((r, i) => tableRow(colsSocial, r, i, 'Tavsiya etiladi'))

// ─── 4. XARITA ────────────────────────────────────────────────────────────────
sectionTitle("4. Xarita", '#')

note("Google Maps havolasi — Qanday olish: Google Maps'da klinikani toping → Ulashish → Havolani nusxalash. Natija: https://maps.app.goo.gl/XXXXXXX")

const colsMap = [
  { label: '#',               w: 28  },
  { label: 'Element',         w: 130 },
  { label: 'Joriy holat',     w: 150 },
  { label: 'Talab',           w: 190 },
  { label: 'Muhim',           w: 49  },
]
tableHeader(colsMap)

const mapRows = [
  ['4.1', "URL (O'zbek)", 'maps.google.com/?q=Miracle+IVF', "Doimiy Google Maps havolasi (cid= yoki goo.gl)", 'Majburiy'],
  ['4.2', 'URL (Rus)',     'maps.google.com/?q=Miracle+IVF', 'Bir xil havola',                                 'Majburiy'],
  ['4.3', 'URL (Ingliz)',  'maps.google.com/?q=Miracle+IVF', 'Bir xil havola',                                 'Majburiy'],
  ['4.4', 'Embed iframe', "Mavjud emas — placeholder ko'rsatilmoqda", "Google Maps > Ulashish > Xaritani joylashtirish — HTML kodini bering", 'Tavsiya etiladi'],
]
mapRows.forEach((r, i) => tableRow(colsMap, r, i, i < 3 ? 'Majburiy' : 'Tavsiya etiladi'))

note("Embed kodi: Google Maps'da klinikani toping → Ulashish (Share) → Xaritani joylashtirish (Embed a map) → HTMLni nusxalash.")

// ─── 5. SHIFOKORLAR ────────────────────────────────────────────────────────────
sectionTitle("5. Shifokorlar Rasmlari", '#')

note("Rasm talablari: JPEG yoki WebP format. Minimum 600x800 px (portrait). Professional, yorqin, neytral fon.")

const colsDoc = [
  { label: '#',             w: 28  },
  { label: 'Shifokor',      w: 150 },
  { label: 'Joriy holat',   w: 120 },
  { label: 'Fayl nomi',     w: 140 },
  { label: 'Muhim',         w: 59  },
]
tableHeader(colsDoc)

const docRows = [
  ['5.1', 'Dr. Inamdar',         "Rasm yo'q — placeholder", 'inamdar.jpg / .webp',  'Tavsiya etiladi'],
  ['5.2', 'Dr. Meruert Beysenbi',"Rasm yo'q — placeholder", 'beysenbi.jpg / .webp', 'Tavsiya etiladi'],
  ['5.3', 'Dr. V.V. Benko',      "Rasm yo'q — placeholder", 'benko.jpg / .webp',    'Tavsiya etiladi'],
]
docRows.forEach((r, i) => tableRow(colsDoc, r, i, 'Tavsiya etiladi'))

note("Rasmlarni public/images/doctors/ papkasiga joylashtirilishi uchun dasturchi jamoasiga yuboring.")

// ─── 6. ASOSIY VIZUAL (HERO) ──────────────────────────────────────────────────
sectionTitle("6. Asosiy Vizual (Hero Rasmi)", '#')

note("Bu sahifadagi eng muhim rasm. Google Lighthouse LCP (Largest Contentful Paint) ko'rsatkichiga to'g'ridan-to'g'ri ta'sir qiladi.")

const colsHero = [
  { label: '#',           w: 28  },
  { label: 'Element',     w: 120 },
  { label: 'Joriy holat', w: 150 },
  { label: 'Talab',       w: 200 },
  { label: 'Muhim',       w: 49  },
]
tableHeader(colsHero)

const heroRows = [
  ['6.1', 'Asosiy rasm fayli', "Mavjud emas — gradient placeholder", "public/images/hero.jpg — min 1200x900 px, JPEG, oila/klinika", 'Majburiy'],
  ['6.2', 'Kod bayrog\'i',      'HAS_HERO_IMAGE = false',             "Fayl joylanganidan keyin dasturchi true qiladi — harakatlanish shart emas", 'Majburiy'],
]
heroRows.forEach((r, i) => tableRow(colsHero, r, i, 'Majburiy'))

note("Rasm mazmuni: issiq, premium, umidli hissiyot — klinika interieri, shifokor va bemor (rozilik bilan), yoki litsenziyalangan stock rasm. Sovuq yoki klinik ko'rinishdan qoching.")

// ─── 7. MUVAFFAQIYAT NATIJALARI ───────────────────────────────────────────────
newPage()
sectionTitle("7. Muvaffaqiyat Natijalari (Success Results)", '#')

note("MUHIM: Barcha rasmlar uchun bemorning YOZMA ROZILIGI talab qilinadi. Rozilik hujjati klinikada saqlansin.")

const colsRes = [
  { label: '#',              w: 28  },
  { label: 'Karta',          w: 60  },
  { label: 'Tur',            w: 60  },
  { label: 'Joriy holat',    w: 100 },
  { label: 'Talab',          w: 190 },
  { label: 'Xiralash',       w: 48  },
  { label: 'Muhim',          w: 11  },
]
tableHeader(colsRes)

const resultRows = [
  ['7.1', 'result1', 'HCG test',   "Rasm yo'q", "Musbat HCG test rasmi (rozilik), blur qilinadi",    'Ha',  'Tavsiya etiladi'],
  ['7.2', 'result2', 'HCG test',   "Rasm yo'q", "Musbat HCG test rasmi (rozilik), blur qilinadi",    'Ha',  'Tavsiya etiladi'],
  ['7.3', 'result3', 'IVF natija', "Rasm yo'q", "Baxtli oila/juftlik rasmi (rozilik)",               'Yo\'q','Tavsiya etiladi'],
  ['7.4', 'result4', 'IVF natija', "Rasm yo'q", "Baxtli oila/juftlik rasmi (rozilik)",               'Yo\'q','Tavsiya etiladi'],
  ['7.5', 'result5', 'Oila',       "Rasm yo'q", "Oila rasmi (rozilik)",                              'Yo\'q','Tavsiya etiladi'],
  ['7.6', 'result6', 'Minnatdor',  "Rasm yo'q", "Bemor xabarining skrinshooti (rozilik)",            'Yo\'q','Tavsiya etiladi'],
]
resultRows.forEach((r, i) => tableRow(colsRes, r, i, 'Tavsiya etiladi'))

note("Rasmlar mavjud bo'lmasa — komponent avtomatik placeholder ko'rsatadi. Launch bloklanmaydi.")

// ─── 8. TESTIMONIALLAR ────────────────────────────────────────────────────────
sectionTitle("8. Testimoniallar (Fikrlar)", '#')

note("Faqat 3 ta testmonial media talab qiladi (telegram, screenshot, video). Qolgan 3 tasi faqat matn — rasm kerak emas.")

const colsTest = [
  { label: '#',              w: 28  },
  { label: 'ID',             w: 40  },
  { label: 'Tur',            w: 70  },
  { label: 'Bemor',          w: 90  },
  { label: 'Talab',          w: 215 },
  { label: 'Xiralash',       w: 50  },
  { label: 'Muhim',          w: 4   },
]
tableHeader(colsTest)

const testRows = [
  ['8.1', 't3', 'Telegram', 'F.A. — Andijon',  "Telegram xabar skrinshooti: 'Test musbat chiqdi!' (rozilik)",          'Ha',  'Tavsiya etiladi'],
  ['8.2', 't4', 'Skrinshot','N.T. — Buxoro',   "Ijobiy sharh skrinshooti (rozilik)",                                    'Ha',  'Tavsiya etiladi'],
  ['8.3', 't6', 'Video',    'M.H. — Toshkent', "Video testimonial thumbnail/kadri (rozilik); mavjud bo'lmasa xabar bering", "Yo'q", 'Tavsiya etiladi'],
]
testRows.forEach((r, i) => tableRow(colsTest, r, i, 'Tavsiya etiladi'))

doc.save().fillColor('#EFF6FF').roundedRect(ML, y + 8, CW, 36, 6).fill().restore()
doc.save().fillColor(BLUE).fontSize(9).font('Helvetica-Bold')
   .text("Rasm kerak bo'lmagan testimoniallar (faqat matn):", ML + 10, y + 16).restore()
doc.save().fillColor(DARK).fontSize(9).font('Helvetica')
   .text("t1 — D.M. (Toshkent)  |  t2 — G.K. (Samarqand)  |  t5 — S.R. (Namangan)", ML + 10, y + 29).restore()
y += 58

// ─── 9. MUHIT O'ZGARUVCHILARI ─────────────────────────────────────────────────
newPage()
sectionTitle("9. Muhit O'zgaruvchilari (Vercel)", '#')

doc.save().fillColor('#FEF2F2').roundedRect(ML, y, CW, 44, 6).fill().restore()
doc.save().fillColor(RED_TEXT).fontSize(9).font('Helvetica-Bold')
   .text("XAVFSIZLIK OGOHLANTIRISHI", ML + 12, y + 8).restore()
doc.save().fillColor(RED_TEXT).fontSize(8.5).font('Helvetica')
   .text(
     "Maxfiy kalitlarni (KEY, TOKEN) elektron pochta, Telegram yoki WhatsApp orqali yubormang. " +
     "Faqat Vercel paneli yoki shifrlangan parol menejeri orqali kiriting.",
     ML + 12, y + 22, { width: CW - 24 }
   ).restore()
y += 56

const colsEnv = [
  { label: '#',                w: 28  },
  { label: "O'zgaruvchi nomi", w: 210 },
  { label: 'Maqsad',           w: 175 },
  { label: 'Kim beradi',       w: 100 },
  { label: 'Muhim',            w: 34  },
]
tableHeader(colsEnv)

const envRows = [
  ['9.1', 'SUPABASE_URL',               "Baza ulanish URL'i",                   'Dasturchi',  'Majburiy'],
  ['9.2', 'SUPABASE_SERVICE_ROLE_KEY',  'Baza yozish kaliti (maxfiy)',           'Dasturchi',  'Majburiy'],
  ['9.3', 'TELEGRAM_BOT_TOKEN',         'Bot tokeni — lead xabarlari',          'Dasturchi',  'Majburiy'],
  ['9.4', 'TELEGRAM_CHAT_ID',           "Xabarlar keladigan guruh/kanal ID'si", 'Klinika',    'Majburiy'],
  ['9.5', 'NEXT_PUBLIC_GA_ID',          'Google Analytics 4 ID',                'Klinika',    'Tavsiya etiladi'],
  ['9.6', 'NEXT_PUBLIC_META_PIXEL_ID',  'Meta (Facebook) Pixel ID',             'Klinika',    'Tavsiya etiladi'],
  ['9.7', 'NEXT_PUBLIC_SITE_URL',       "Ishlab chiqarish domenı",              'Dasturchi',  'Majburiy'],
  ['9.8', 'UPSTASH_REDIS_REST_URL',     'Spam himoya Redis URL',                'Dasturchi',  'Tavsiya etiladi'],
  ['9.9', 'UPSTASH_REDIS_REST_TOKEN',   'Redis autentifikatsiya tokeni',         'Dasturchi',  'Tavsiya etiladi'],
]
envRows.forEach((r, i) => tableRow(colsEnv, r, i, i < 4 || i === 6 ? 'Majburiy' : 'Tavsiya etiladi'))

note("TELEGRAM_CHAT_ID — bu klinika jamoasi o'z guruhidan oladi: guruhda @userinfobot ga /start yuboring va ID raqamini bizga bering.")
note("GA4 ID — Google Analytics > Admin > Data Streams > Measurement ID (G-XXXXXXXX ko'rinishida).")
note("Meta Pixel ID — Meta Business Manager > Events Manager > Pixel ID.")

// ─── YAKUNIY CHEKLAMA ─────────────────────────────────────────────────────────
newPage()
sectionTitle("Imzolash va Tasdiqlash", '#')

const checkItems = [
  // Required
  { label: "2.1–2.3  Haqiqiy telefon raqam (3 tilda)",                      req: true  },
  { label: "2.4–2.6  To'liq manzil (3 tilda)",                               req: true  },
  { label: "2.7–2.9  Haqiqiy WhatsApp havolasi",                             req: true  },
  { label: "2.10–2.12  Telegram kanali tasdiqlangan (yoki to'g'irlangan)",   req: true  },
  { label: "4.1–4.3  Doimiy Google Maps havolasi",                           req: true  },
  { label: "6.1  Hero rasmi fayli tayyorlangan va yetkazilgan",              req: true  },
  { label: "9.1–9.2  Supabase kredensialları Vercel'ga kiritilgan",          req: true  },
  { label: "9.3–9.4  Telegram bot ma'lumotları Vercel'ga kiritilgan",        req: true  },
  { label: "9.7  Ishlab chiqarish domen URL'i kiritilgan",                   req: true  },
  // Recommended
  { label: "3.1–3.3  Ijtimoiy tarmoq profil havolalari",                     req: false },
  { label: "4.4  Google Maps embed iframe kodi",                             req: false },
  { label: "5.1–5.3  Shifokorlar rasmlari (3 fayl)",                        req: false },
  { label: "7.1–7.6  Muvaffaqiyat natijalari rasmlari + bemorlar roziligi", req: false },
  { label: "8.1–8.3  Testimonial media + bemorlar roziligi",                req: false },
  { label: "9.5–9.6  GA4 va Meta Pixel ID'lari",                            req: false },
  { label: "9.8–9.9  Upstash Redis kredensialları",                         req: false },
]

// Legend
doc.save().fillColor(RED_SOFT).roundedRect(ML, y, 12, 12, 2).fill().restore()
doc.save().fillColor(DARK).fontSize(8.5).font('Helvetica')
   .text("Majburiy", ML + 18, y + 2, { lineBreak: false }).restore()
doc.save().fillColor(AMBER_SOFT).roundedRect(ML + 90, y, 12, 12, 2).fill().restore()
doc.save().fillColor(DARK).fontSize(8.5).font('Helvetica')
   .text("Tavsiya etiladi", ML + 108, y + 2, { lineBreak: false }).restore()
y += 24

checkItems.forEach((item, i) => {
  ensureSpace(24)
  const bg = item.req ? RED_SOFT : AMBER_SOFT
  doc.save().fillColor(bg).roundedRect(ML, y, CW, 20, 3).fill().restore()
  // Checkbox box
  doc.save().fillColor(WHITE).strokeColor('#94A3B8').lineWidth(1)
     .rect(ML + 8, y + 5, 11, 11).fill().stroke().restore()
  doc.save().fillColor(DARK).fontSize(9).font('Helvetica')
     .text(item.label, ML + 26, y + 6, { width: CW - 36, lineBreak: false }).restore()
  hLine(y + 20, '#E2E8F0')
  y += 22
})

y += 20
hLine(y, BLUE, ML, MR)
y += 16

// Imzo satrlari
const signCols = [
  { x: ML,       label: "Klinika vakili ismi:" },
  { x: ML + 160, label: "Imzo:" },
  { x: ML + 300, label: "Sana:" },
]
signCols.forEach(({ x, label }) => {
  doc.save().fillColor(MUTED).fontSize(9).font('Helvetica')
     .text(label, x, y).restore()
  hLine(y + 24, MUTED, x, x + 130)
})
y += 40

doc.save().fillColor(MUTED).fontSize(9).font('Helvetica')
   .text("Dasturchi jamoaga topshirilgan sana: ___________________", ML, y).restore()

// ─── PASTKI KOLONTITL — har sahifada ──────────────────────────────────────────
const totalPages = doc.bufferedPageRange().count

for (let i = 0; i < totalPages; i++) {
  doc.switchToPage(i)
  // Pastki band
  doc.save().fillColor(BLUE).rect(0, PH - 28, PW, 28).fill().restore()
  doc.save().fillColor(WHITE).fontSize(8).font('Helvetica')
     .text("Miracle IVF — Kontent To'ldirish Varaqasi", ML, PH - 18,
           { width: CW * 0.6, lineBreak: false }).restore()
  doc.save().fillColor(PINK).fontSize(8).font('Helvetica')
     .text(`Sahifa ${i + 1} / ${totalPages}`, 0, PH - 18,
           { width: PW - ML, align: 'right', lineBreak: false }).restore()
}

doc.flushPages()
doc.end()
stream.on('finish', () => console.log('PDF yaratildi:', OUT))
stream.on('error',  (e) => { console.error('Xato:', e); process.exit(1) })
