/**
 * GA4 loader. Consent Mode v2 defaults are set by `buildConsentBootstrap`
 * (inline, early in the root layout) before this script runs — do not
 * re-declare defaults here.
 */

const MEASUREMENT_ID = /^G-[A-Z0-9]+$/;

/**
 * Local opt-out for internal/test browsers (no UI).
 * `?apg_internal=1` sets localStorage `apg:internal=1`; `?apg_internal=0` clears it.
 * When set, this bootstrap returns before gtag so GA never loads.
 */
export const GA_INTERNAL_STORAGE_KEY = "apg:internal";

/**
 * Regions historically used for Consent Mode denied defaults (EEA + UK + CH).
 * Kept for documentation/tests; runtime defaults are global denied + banner.
 */
export const CONSENT_DENIED_REGIONS = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "IS",
  "LI",
  "NO",
  "GB",
  "CH",
] as const;

/** gtag config + loader. Assumes consent defaults were already queued. */
export function buildGaBootstrap(measurementId: string): string {
  return `
(function(){
  try {
    var q = new URLSearchParams(location.search).get('apg_internal');
    if (q === '1') localStorage.setItem(${JSON.stringify(GA_INTERNAL_STORAGE_KEY)}, '1');
    if (q === '0') localStorage.removeItem(${JSON.stringify(GA_INTERNAL_STORAGE_KEY)});
    if (localStorage.getItem(${JSON.stringify(GA_INTERNAL_STORAGE_KEY)}) === '1') return;
  } catch (e) {}
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = window.gtag || gtag;
  gtag('js', new Date());
  gtag('config', ${JSON.stringify(measurementId)});
  var s = document.createElement('script');
  s.async = true;
  s.src = ${JSON.stringify(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`)};
  var first = document.getElementsByTagName('script')[0];
  first.parentNode.insertBefore(s, first);
})();
`.trim();
}

/** Public GA4 measurement ID, or null when unset or not a G- ID. */
export function getGaMeasurementId(
  value: string | undefined = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
): string | null {
  const id = value?.trim() ?? "";
  return MEASUREMENT_ID.test(id) ? id : null;
}
