// Generates branded static social/icon assets from SVG sources via sharp.
//
//   public/og-image.jpg        1200x630  Open Graph / Twitter sharing image
//   public/apple-touch-icon.png 180x180  iOS home-screen icon
//   public/favicon.ico          16/32/48  multi-size favicon (PNG-encoded ICO)
//
// Run:  node scripts/generate-og-assets.mjs
// Re-run whenever the brand mark or headline copy below changes.

import sharp from 'sharp'
import { writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = join(ROOT, 'public')

// Brand tokens (mirrors design system in CLAUDE.md §6).
const BLUE = '#163C8C'
const BLUE_DEEP = '#0F2A66'
const BLUE_BRIGHT = '#1B4596'
const PINK = '#F4B6C2'
const WHITE = '#FFFFFF'

// Heart mark — 24x24 viewBox path, used across all assets.
const HEART =
  'M12 21s-7.5-4.9-10-9.2C.6 9.1 1.4 5.5 4.3 4.2c2-.9 4.2-.2 5.3 1.5l.4.6.4-.6c1.1-1.7 3.3-2.4 5.3-1.5 2.9 1.3 3.7 4.9 1.7 7.6C19.5 16.1 12 21 12 21z'

/** Heart path placed at (cx,cy) with a given pixel width, in `fill`. */
function heart(cx, cy, width, fill, extra = '') {
  const s = width / 24
  const tx = cx - 12 * s
  const ty = cy - 11.5 * s
  return `<path d="${HEART}" transform="translate(${tx} ${ty}) scale(${s})" fill="${fill}" ${extra}/>`
}

// ─── Open Graph image (1200x630) ──────────────────────────────────────────────

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${BLUE_DEEP}"/>
      <stop offset="0.55" stop-color="${BLUE}"/>
      <stop offset="1" stop-color="${BLUE_BRIGHT}"/>
    </linearGradient>
    <radialGradient id="pinkGlow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${PINK}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${PINK}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="whiteGlow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${WHITE}" stop-opacity="0.10"/>
      <stop offset="1" stop-color="${WHITE}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Soft brand accents -->
  <circle cx="1080" cy="90" r="340" fill="url(#pinkGlow)"/>
  <circle cx="120" cy="600" r="300" fill="url(#whiteGlow)"/>
  <circle cx="980" cy="560" r="220" fill="url(#pinkGlow)" opacity="0.5"/>

  <!-- Subtle ring motif -->
  <circle cx="1010" cy="150" r="150" fill="none" stroke="${WHITE}" stroke-opacity="0.10" stroke-width="2"/>
  <circle cx="1010" cy="150" r="210" fill="none" stroke="${WHITE}" stroke-opacity="0.06" stroke-width="2"/>

  <!-- Logo lockup -->
  <circle cx="92" cy="86" r="34" fill="${WHITE}"/>
  ${heart(92, 86, 36, PINK)}
  <text x="146" y="98" font-family="'Segoe UI', Arial, sans-serif" font-size="40" font-weight="700" fill="${WHITE}">Miracle IVF</text>

  <!-- Headline -->
  <text x="80" y="312" font-family="'Segoe UI', Arial, sans-serif" font-size="72" font-weight="700" fill="${WHITE}">Your Dream of Parenthood</text>
  <text x="80" y="396" font-family="'Segoe UI', Arial, sans-serif" font-size="72" font-weight="700" fill="${PINK}">— Our Mission</text>

  <!-- Accent underline -->
  <rect x="82" y="430" width="132" height="9" rx="4.5" fill="${PINK}"/>

  <!-- Subline -->
  <text x="82" y="492" font-family="'Segoe UI', Arial, sans-serif" font-size="32" font-weight="400" fill="${WHITE}" fill-opacity="0.88">International IVF Clinic · Tashkent, Uzbekistan</text>

  <!-- Trust pills -->
  <g font-family="'Segoe UI', Arial, sans-serif" font-size="26" font-weight="600" fill="${WHITE}">
    <rect x="80"  y="540" width="270" height="58" rx="29" fill="${WHITE}" fill-opacity="0.12" stroke="${WHITE}" stroke-opacity="0.28"/>
    <text x="215" y="577" text-anchor="middle">65% Success Rate</text>

    <rect x="370" y="540" width="265" height="58" rx="29" fill="${WHITE}" fill-opacity="0.12" stroke="${WHITE}" stroke-opacity="0.28"/>
    <text x="502" y="577" text-anchor="middle">10,000+ Families</text>

    <rect x="655" y="540" width="320" height="58" rx="29" fill="${WHITE}" fill-opacity="0.12" stroke="${WHITE}" stroke-opacity="0.28"/>
    <text x="815" y="577" text-anchor="middle">International Doctors</text>
  </g>
</svg>`

// ─── Apple touch icon (180x180) ───────────────────────────────────────────────

const appleSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${BLUE}"/>
      <stop offset="1" stop-color="${BLUE_DEEP}"/>
    </linearGradient>
  </defs>
  <rect width="180" height="180" fill="url(#bg)"/>
  <circle cx="90" cy="78" r="46" fill="${WHITE}"/>
  ${heart(90, 78, 50, PINK)}
  <text x="90" y="150" font-family="'Segoe UI', Arial, sans-serif" font-size="26" font-weight="700" fill="${WHITE}" text-anchor="middle">Miracle</text>
</svg>`

// ─── Favicon source (square emblem, high contrast for tiny sizes) ─────────────

const faviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${BLUE_BRIGHT}"/>
      <stop offset="1" stop-color="${BLUE_DEEP}"/>
    </linearGradient>
  </defs>
  <rect width="256" height="256" rx="56" fill="url(#bg)"/>
  ${heart(128, 132, 150, WHITE)}
  <circle cx="128" cy="132" r="14" fill="${PINK}" opacity="0.0"/>
</svg>`

// ─── ICO packing (PNG-encoded entries; supported by all modern browsers) ──────

function packIco(pngs) {
  const count = pngs.length
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(count, 4)

  const entries = Buffer.alloc(16 * count)
  let offset = 6 + 16 * count
  pngs.forEach(({ size, data }, i) => {
    const e = i * 16
    entries.writeUInt8(size >= 256 ? 0 : size, e + 0) // width
    entries.writeUInt8(size >= 256 ? 0 : size, e + 1) // height
    entries.writeUInt8(0, e + 2) // palette
    entries.writeUInt8(0, e + 3) // reserved
    entries.writeUInt16LE(1, e + 4) // color planes
    entries.writeUInt16LE(32, e + 6) // bits per pixel
    entries.writeUInt32LE(data.length, e + 8)
    entries.writeUInt32LE(offset, e + 12)
    offset += data.length
  })

  return Buffer.concat([header, entries, ...pngs.map((p) => p.data)])
}

// ─── Build ────────────────────────────────────────────────────────────────────

async function main() {
  await mkdir(PUBLIC, { recursive: true })

  // OG image → JPEG
  await sharp(Buffer.from(ogSvg))
    .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
    .toFile(join(PUBLIC, 'og-image.jpg'))

  // Apple touch icon → PNG
  await sharp(Buffer.from(appleSvg)).png().toFile(join(PUBLIC, 'apple-touch-icon.png'))

  // Favicon → multi-size ICO
  const sizes = [16, 32, 48]
  const pngs = await Promise.all(
    sizes.map(async (size) => ({
      size,
      data: await sharp(Buffer.from(faviconSvg)).resize(size, size).png().toBuffer(),
    })),
  )
  await writeFile(join(PUBLIC, 'favicon.ico'), packIco(pngs))

  console.log('Generated: og-image.jpg, apple-touch-icon.png, favicon.ico')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
