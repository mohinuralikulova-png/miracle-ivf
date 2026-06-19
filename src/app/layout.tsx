import type { ReactNode } from 'react'
import './globals.css'

// Root layout — intentionally minimal.
// The [locale]/layout.tsx renders <html> and <body> with the correct lang attribute.
// This pattern is required by next-intl for per-locale HTML lang support.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
