// Root-level not-found — only reached if middleware fails to resolve a locale.
// The locale-scoped [locale]/not-found.tsx handles the normal 404 path.
export default function RootNotFound() {
  return (
    <html lang="uz">
      <body>
        <div
          style={{
            display: 'flex',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>404</h1>
            <p>Sahifa topilmadi / Страница не найдена / Page not found</p>
          </div>
        </div>
      </body>
    </html>
  )
}
