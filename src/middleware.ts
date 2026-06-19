import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// Handles:
// - Locale detection from Accept-Language header
// - Root / redirect to resolved locale (default: /uz)
// - Locale prefix enforcement on all routes
export default createMiddleware(routing)

export const config = {
  // Match all paths except static assets, API routes, and Next.js internals
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
