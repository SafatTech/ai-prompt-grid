import Script from "next/script";
import { buildGaBootstrap, getGaMeasurementId } from "@/lib/analytics/ga4";

/**
 * GA4 with Consent Mode v2 defaults queued before gtag.js.
 *
 * Loaded with `lazyOnload` so gtag does not compete with LCP/TBT on first paint.
 * Search Console / AdSense verification meta tags stay in the document head
 * and are unaffected by this deferral.
 *
 * Renders nothing when NEXT_PUBLIC_GA_MEASUREMENT_ID is unset.
 */
export function GoogleAnalytics() {
  const measurementId = getGaMeasurementId();
  if (!measurementId) return null;

  return (
    <Script id="ga4-consent" strategy="lazyOnload">
      {buildGaBootstrap(measurementId)}
    </Script>
  );
}
