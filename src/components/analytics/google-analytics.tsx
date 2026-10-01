import Script from "next/script";
import { buildGaBootstrap, getGaMeasurementId } from "@/lib/analytics/ga4";

/**
 * GA4 with Consent Mode v2 defaults queued before gtag.js.
 *
 * `@next/third-parties/google` `GoogleAnalytics` only accepts a measurement ID
 * and calls `gtag('config')` in its own snippet, so it cannot set regional
 * consent defaults first. The inline script is synchronous in the initial HTML.
 * `next/script` then loads gtag.js after hydration.
 *
 * Renders nothing when NEXT_PUBLIC_GA_MEASUREMENT_ID is unset.
 */
export function GoogleAnalytics() {
  const measurementId = getGaMeasurementId();
  if (!measurementId) return null;

  const bootstrap = buildGaBootstrap(measurementId);

  return (
    <>
      <script id="ga4-consent" dangerouslySetInnerHTML={{ __html: bootstrap }} />
      <Script
        id="ga4-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
    </>
  );
}
