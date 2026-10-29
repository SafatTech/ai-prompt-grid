import { buildConsentBootstrap } from "@/lib/analytics/consent";

/**
 * Consent Mode v2 defaults (all denied) + restore saved choice from
 * localStorage. Inline script so it runs during HTML parse, before AdSense /
 * GA tags (avoids next/script beforeInteractive lint outside _document).
 */
export function ConsentDefaults() {
  return (
    <script
      id="consent-mode-defaults"
      dangerouslySetInnerHTML={{ __html: buildConsentBootstrap() }}
    />
  );
}
