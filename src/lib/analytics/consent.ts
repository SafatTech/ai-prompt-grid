/**
 * Google Consent Mode v2 helpers for the lightweight cookie banner.
 * Defaults are denied before any Google tag; Accept / Reject persist here.
 */

export const CONSENT_STORAGE_KEY = "apg:consent";

export type ConsentChoice = "granted" | "denied";

export const CONSENT_TYPES = [
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
  "analytics_storage",
] as const;

export type ConsentType = (typeof CONSENT_TYPES)[number];

export function isConsentChoice(value: unknown): value is ConsentChoice {
  return value === "granted" || value === "denied";
}

/** Consent state object for gtag('consent', …). */
export function consentState(choice: ConsentChoice): Record<ConsentType, ConsentChoice> {
  return {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  };
}

/**
 * Inline bootstrap: stub gtag, set Consent Mode defaults to denied, then
 * restore a saved Accept/Reject choice from localStorage before any Google tag.
 * Safe to place as an inline script early in the root layout (before Google tags).
 */
export function buildConsentBootstrap(): string {
  return `
(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });
  try {
    var saved = localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)});
    if (saved === 'granted' || saved === 'denied') {
      gtag('consent', 'update', {
        ad_storage: saved,
        ad_user_data: saved,
        ad_personalization: saved,
        analytics_storage: saved
      });
    }
  } catch (e) {}
})();
`.trim();
}

/** Apply a consent update in the browser (banner Accept / Reject). */
export function updateStoredConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* private mode / quota — still update gtag if present */
  }
  const gtag = (
    window as Window & {
      gtag?: (...args: unknown[]) => void;
    }
  ).gtag;
  if (typeof gtag === "function") {
    gtag("consent", "update", consentState(choice));
  }
}

/** Read a previously saved choice, or null when unset / unreadable. */
export function readStoredConsent(): ConsentChoice | null {
  try {
    const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
    return isConsentChoice(saved) ? saved : null;
  } catch {
    return null;
  }
}
