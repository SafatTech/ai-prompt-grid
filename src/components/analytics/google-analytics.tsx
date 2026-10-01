import { buildGaBootstrap, getGaMeasurementId } from "@/lib/analytics/ga4";

/**
 * GA4 with Consent Mode v2 defaults queued before gtag.js.
 *
 * `@next/third-parties/google` `GoogleAnalytics` only accepts a measurement ID
 * and calls `gtag('config')` in its own snippet, so it cannot set regional
 * consent defaults first. A separate loader tag is hoisted into `<head>` and
 * can run before this block, so the snippet inserts gtag.js only after the
 * consent commands are queued.
 *
 * Renders nothing when NEXT_PUBLIC_GA_MEASUREMENT_ID is unset.
 */
export function GoogleAnalytics() {
  const measurementId = getGaMeasurementId();
  if (!measurementId) return null;

  return (
    <script
      id="ga4-consent"
      dangerouslySetInnerHTML={{ __html: buildGaBootstrap(measurementId) }}
    />
  );
}
