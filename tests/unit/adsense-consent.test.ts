import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  DEFAULT_ADSENSE_CLIENT,
  getAdSenseClient,
  getAdSensePublisherId,
} from "../../src/lib/adsense/client";
import {
  CONSENT_STORAGE_KEY,
  buildConsentBootstrap,
  consentState,
  isConsentChoice,
} from "../../src/lib/analytics/consent";
import { GET as adsTxtGet } from "../../src/app/ads.txt/route";

const root = join(process.cwd());

function readSrc(rel: string): string {
  return readFileSync(join(root, rel), "utf8");
}

describe("AdSense client helper", () => {
  it("falls back to the known publisher client when unset", () => {
    assert.equal(getAdSenseClient(undefined), DEFAULT_ADSENSE_CLIENT);
    assert.equal(getAdSenseClient(""), DEFAULT_ADSENSE_CLIENT);
    assert.equal(getAdSenseClient("   "), DEFAULT_ADSENSE_CLIENT);
    assert.equal(getAdSensePublisherId(undefined), "pub-4446032458804047");
  });

  it("normalizes pub- and ca-pub- values", () => {
    assert.equal(getAdSenseClient("ca-pub-123"), "ca-pub-123");
    assert.equal(getAdSenseClient("pub-123"), "ca-pub-123");
    assert.equal(getAdSensePublisherId("ca-pub-999"), "pub-999");
    assert.equal(getAdSensePublisherId("pub-999"), "pub-999");
  });
});

describe("ads.txt fallback", () => {
  it("serves the known publisher line without an env var", async () => {
    const prev = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
    delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
    try {
      const res = adsTxtGet();
      assert.equal(res.status, 200);
      assert.equal(
        await res.text(),
        "google.com, pub-4446032458804047, DIRECT, f08c47fec0942fa0\n",
      );
    } finally {
      if (prev === undefined) delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
      else process.env.NEXT_PUBLIC_ADSENSE_CLIENT = prev;
    }
  });
});

describe("Consent Mode v2 bootstrap", () => {
  it("defaults all storage types to denied and restores localStorage", () => {
    const script = buildConsentBootstrap();
    assert.match(script, /gtag\('consent', 'default'/);
    assert.match(script, /ad_storage: 'denied'/);
    assert.match(script, /ad_user_data: 'denied'/);
    assert.match(script, /ad_personalization: 'denied'/);
    assert.match(script, /analytics_storage: 'denied'/);
    assert.match(script, /wait_for_update: 500/);
    assert.match(script, new RegExp(CONSENT_STORAGE_KEY.replace(":", "\\:")));
    assert.match(script, /gtag\('consent', 'update'/);
    assert.equal(isConsentChoice("granted"), true);
    assert.equal(isConsentChoice("denied"), true);
    assert.equal(isConsentChoice("maybe"), false);
    assert.deepEqual(consentState("granted").ad_storage, "granted");
  });
});

describe("AdSense site wiring", () => {
  it("loads the async site tag and early consent defaults in the root layout", () => {
    const layout = readSrc("src/app/layout.tsx");
    assert.match(layout, /ConsentDefaults/);
    assert.match(layout, /AdSenseScript/);
    assert.match(layout, /CookieConsentBanner/);

    const adsense = readSrc("src/components/analytics/adsense-script.tsx");
    assert.match(adsense, /\basync\b/);
    assert.match(adsense, /adsbygoogle\.js\?client=/);
    assert.doesNotMatch(adsense, /from ["']next\/script["']/);

    const consent = readSrc("src/components/analytics/consent-defaults.tsx");
    assert.match(consent, /dangerouslySetInnerHTML/);
    assert.match(consent, /buildConsentBootstrap/);

    const banner = readSrc("src/components/analytics/cookie-consent-banner.tsx");
    assert.match(banner, /privacy-policy/);
    assert.match(banner, /Accept/);
    assert.match(banner, /Reject/);
  });

  it("privacy policy documents AdSense cookies and opt-out", () => {
    const privacy = readSrc("src/app/privacy-policy/page.tsx");
    assert.match(privacy, /Google AdSense/);
    assert.match(privacy, /cookie banner/);
    assert.match(privacy, /My Ad Center/);
    assert.match(privacy, /aboutads\.info/);
  });
});
