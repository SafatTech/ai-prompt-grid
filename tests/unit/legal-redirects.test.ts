import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { legalCanonicalPath } from "../../src/lib/http/legal-redirects";

describe("legal canonical redirects", () => {
  it("sends the old legal paths to the canonical pages", () => {
    assert.equal(legalCanonicalPath("/privacy"), "/privacy-policy");
    assert.equal(legalCanonicalPath("/privacy/"), "/privacy-policy");
    assert.equal(legalCanonicalPath("/Privacy/"), "/privacy-policy");
    assert.equal(legalCanonicalPath("/terms"), "/terms-of-service");
    assert.equal(legalCanonicalPath("/terms/"), "/terms-of-service");
  });

  it("leaves the canonical legal pages alone", () => {
    for (const path of [
      "/privacy-policy",
      "/privacy-policy/",
      "/terms-of-service",
      "/terms-of-service/",
      "/cookie-policy",
      "/disclaimer",
      "/about",
      "/contact",
      "/",
    ]) {
      assert.equal(legalCanonicalPath(path), null, path);
    }
  });
});
