/**
 * Pre-build check: verifies that ru.json and en.json have exactly the same keys
 * as uz.json (the canonical source). Exits with code 1 on any mismatch so the
 * build fails visibly rather than shipping pages with raw translation keys.
 *
 * Run via: tsx scripts/validate-translations.ts
 * Hooked into: package.json "prebuild"
 */

import { readFileSync } from 'fs'
import { join } from 'path'

const MESSAGES_DIR = join(process.cwd(), 'src', 'messages')

function loadJson(filename: string): Record<string, unknown> {
  const raw = readFileSync(join(MESSAGES_DIR, filename), 'utf-8')
  return JSON.parse(raw) as Record<string, unknown>
}

/** Recursively collect all dot-separated key paths from a nested object. */
function collectKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) => {
    const path = prefix ? `${prefix}.${k}` : k
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      return collectKeys(v as Record<string, unknown>, path)
    }
    return [path]
  })
}

function validateLocale(source: string[], target: string[], locale: string): boolean {
  const sourceSet = new Set(source)
  const targetSet = new Set(target)

  const missing = source.filter((k) => !targetSet.has(k))
  const extra = target.filter((k) => !sourceSet.has(k))

  let ok = true

  if (missing.length > 0) {
    console.error(`\n[validate-translations] ${locale}.json — MISSING keys (${missing.length}):`)
    missing.forEach((k) => console.error(`  - ${k}`))
    ok = false
  }

  if (extra.length > 0) {
    console.error(`\n[validate-translations] ${locale}.json — EXTRA keys not in uz.json (${extra.length}):`)
    extra.forEach((k) => console.error(`  + ${k}`))
    ok = false
  }

  return ok
}

const uz = loadJson('uz.json')
const ru = loadJson('ru.json')
const en = loadJson('en.json')

const uzKeys = collectKeys(uz)
const ruKeys = collectKeys(ru)
const enKeys = collectKeys(en)

let allOk = true
allOk = validateLocale(uzKeys, ruKeys, 'ru') && allOk
allOk = validateLocale(uzKeys, enKeys, 'en') && allOk

if (allOk) {
  console.log(`[validate-translations] ✓ All ${uzKeys.length} keys present in ru.json and en.json`)
} else {
  console.error('\n[validate-translations] Build aborted — fix translation key mismatches above.')
  process.exit(1)
}
