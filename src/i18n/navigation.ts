import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Typed navigation helpers that understand localized pathnames.
// Import these instead of Next.js's built-in Link/redirect/useRouter
// whenever navigating between locale-aware routes.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
