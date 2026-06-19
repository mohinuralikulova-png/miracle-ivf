'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

// Inline trilingual fallback text — i18n cannot be relied on in error boundaries.
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center bg-background p-6"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Xato yuz berdi / Произошла ошибка / Something went wrong
        </h1>
        <p className="mt-2 text-muted-foreground">
          Iltimos, qayta urinib ko&apos;ring / Попробуйте ещё раз / Please try again
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Qayta urinish / Попробовать снова / Try Again
        </button>
      </div>
    </main>
  )
}
