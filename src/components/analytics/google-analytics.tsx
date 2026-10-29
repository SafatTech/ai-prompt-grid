import Script from "next/script";
import { buildGaBootstrap, getGaMeasurementId } from "@/lib/analytics/ga4";

/**
 * GA4 loader. Consent Mode v2 defaults are set earlier by ConsentDefaults
 * (inline script); this script only configs GA after that.
 *
 * Loaded with `lazyOnload` so gtag does not compete with LCP/TBT on first paint.
 * The AdSense site tag uses afterInteractive separately.
 *
 * Internal opt-out (client-only, no UI): `?apg_internal=1` sets
 * localStorage `apg:internal=1` and skips loading/firing GA; `?apg_internal=0`
 * clears it. Normal visitors are unchanged.
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
