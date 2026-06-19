// Rate-limit module — server-only. Never import from client components.
//
// Wraps @upstash/ratelimit with a sliding-window policy:
//   5 submissions per IP per 60 minutes.
//
// If UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN are absent or contain
// placeholder values, the limiter is disabled and every call returns allowed.
// This means the app works correctly in local dev / CI without Redis configured.

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export interface RateLimitResult {
  /** true → request is allowed; false → limit exceeded */
  allowed: boolean
  /** Seconds until the window resets. Present only when allowed is false. */
  retryAfter?: number
}

const LIMIT = 5
const WINDOW = '60 m'
const KEY_PREFIX = 'miracle:booking'

// A value is usable only when set and not one of the documented placeholders.
function isConfigured(value: string | undefined): value is string {
  return Boolean(value) && !value!.includes('placeholder') && !value!.includes('your-redis')
}

const redisUrl = process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN
const enabled = isConfigured(redisUrl) && isConfigured(redisToken)

// Instantiate once at module level (Next.js caches the module between requests).
const limiter = enabled
  ? new Ratelimit({
      redis: new Redis({ url: redisUrl!, token: redisToken! }),
      limiter: Ratelimit.slidingWindow(LIMIT, WINDOW),
      prefix: KEY_PREFIX,
      analytics: false,
    })
  : null

/**
 * Checks whether the given IP has exceeded the submission limit.
 *
 * Always resolves — never throws. A Redis error is treated as allowed so a
 * transient outage never blocks legitimate users. The error is logged (no PII).
 */
export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  if (!limiter) {
    return { allowed: true }
  }

  try {
    const { success, reset } = await limiter.limit(ip)
    if (success) return { allowed: true }

    const retryAfter = Math.ceil((reset - Date.now()) / 1000)
    return { allowed: false, retryAfter: Math.max(retryAfter, 0) }
  } catch {
    // Redis outage — fail open so real users are never blocked by infra issues.
    console.error('[rate-limit] Redis error — failing open')
    return { allowed: true }
  }
}

/**
 * Extracts the best-available client IP from Next.js request headers.
 *
 * Order of preference:
 *   1. x-forwarded-for (set by Vercel edge and most reverse proxies)
 *   2. x-real-ip
 *   3. Falls back to the constant "unknown" so limiting still applies
 *      (groups all unknown-IP requests under one key, which is acceptable
 *      since real deployments on Vercel always populate x-forwarded-for).
 */
export function extractIp(headersList: Headers): string {
  const forwarded = headersList.get('x-forwarded-for')
  if (forwarded) {
    // x-forwarded-for may be a comma-separated list; leftmost is the client.
    return forwarded.split(',')[0].trim()
  }

  const realIp = headersList.get('x-real-ip')
  if (realIp) return realIp.trim()

  return 'unknown'
}
