import Script from 'next/script'

// Loads the GA4 and Meta Pixel base snippets using next/script's
// `afterInteractive` strategy (deferred until after hydration — keeps them out
// of the critical path for LCP/INP). These scripts only bootstrap `window.gtag`
// and `window.fbq`; all event dispatch stays in lib/analytics.ts.
//
// IDs come from NEXT_PUBLIC_* env vars (inlined at build). Each vendor is
// rendered only when a real ID is configured, so local/preview builds with
// placeholder values load no third-party scripts.

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

// A value is usable only if set and not one of the documented placeholders
// (e.g. `G-XXXXXXXXXX`, `G-PLACEHOLDER`, `0000000000000000`).
function isConfigured(value: string | undefined): value is string {
  return Boolean(value) && !/placeholder|x{4,}/i.test(value!) && !/^0+$/.test(value!)
}

const gaEnabled = isConfigured(GA_ID)
const pixelEnabled = isConfigured(PIXEL_ID)

export function AnalyticsScripts() {
  if (!gaEnabled && !pixelEnabled) return null

  return (
    <>
      {gaEnabled && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}

      {pixelEnabled && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  )
}
