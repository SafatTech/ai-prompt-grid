import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  CONSENT_DENIED_REGIONS,
  buildGaBootstrap,
  getGaMeasurementId,
} from "../../src/lib/analytics/ga4";

describe("GA4 measurement id", () => {
  it("loads nothing when the id is missing or not a G- id", () => {
    assert.equal(getGaMeasurementId(undefined), null);
    assert.equal(getGaMeasurementId(""), null);
    assert.equal(getGaMeasurementId("   "), null);
    assert.equal(getGaMeasurementId("UA-123"), null);
    assert.equal(getGaMeasurementId("G-"), null);
    assert.equal(getGaMeasurementId("G-abc"), null);
  });

  it("accepts a public G- measurement id", () => {
    assert.equal(getGaMeasurementId(" G-TEST1234 "), "G-TEST1234");
  });
});

describe("GA4 bootstrap", () => {
  it("sets denied defaults for the region list before the granted default and config", () => {
    const script = buildGaBootstrap("G-TEST1234");
    const denied = script.indexOf("ad_storage: 'denied'");
    const granted = script.indexOf("ad_storage: 'granted'");
    const config = script.indexOf("gtag('config', \"G-TEST1234\")");
    assert.ok(denied !== -1 && granted !== -1 && config !== -1);
    assert.ok(denied < granted && granted < config);
    assert.match(script, /ad_user_data: 'denied'/);
    assert.match(script, /ad_personalization: 'denied'/);
    assert.match(script, /analytics_storage: 'denied'/);
    assert.match(script, /"GB"/);
    assert.match(script, /"CH"/);
    assert.doesNotMatch(script, /"PK"/);
    const loader = script.indexOf(
      "https://www.googletagmanager.com/gtag/js?id=G-TEST1234",
    );
    assert.ok(loader > config);
  });
});

describe("Consent Mode denied regions", () => {
  it("covers the EEA, the UK, and Switzerland, and not South Asia", () => {
    const regions = new Set<string>(CONSENT_DENIED_REGIONS);
    for (const code of ["DE", "FR", "IE", "IS", "LI", "NO", "GB", "CH"]) {
      assert.equal(regions.has(code), true, code);
    }
    for (const code of ["PK", "IN", "BD", "LK", "NP", "US"]) {
      assert.equal(regions.has(code), false, code);
    }
    assert.equal(regions.has("UK"), false);
  });
});
