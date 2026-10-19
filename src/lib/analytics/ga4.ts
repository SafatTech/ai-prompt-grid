/**
 * ISO 3166-1 alpha-2 regions where Consent Mode defaults to denied:
 * the EEA (EU 27 plus Iceland, Liechtenstein, and Norway), the UK, and Switzerland.
 * Everyone else, including Pakistan, India, and the rest of South Asia, uses the
 * granted default. Google's region list uses GB for the United Kingdom.
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

const MEASUREMENT_ID = /^G-[A-Z0-9]+$/;

/**
 * Local opt-out for internal/test browsers (no UI).
 * `?apg_internal=1` sets localStorage `apg:internal=1`; `?apg_internal=0` clears it.
 * When set, this bootstrap returns before consent/gtag so GA never loads.
 */
export const GA_INTERNAL_STORAGE_KEY = "apg:internal";

/** Consent defaults, then gtag config. Safe to interpolate only a validated G- id. */
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
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    region: ${JSON.stringify(CONSENT_DENIED_REGIONS)},
    wait_for_update: 500
  });
  gtag('consent', 'default', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted'
  });
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
