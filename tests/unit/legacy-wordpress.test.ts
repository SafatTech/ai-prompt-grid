import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { classifyLegacyRequest } from "../../src/lib/http/legacy-wordpress";

function classify(path: string, search = "") {
  return classifyLegacyRequest(path, new URLSearchParams(search));
}

describe("legacy WordPress requests", () => {
  it("leaves the current site and /terms-of-service alone", () => {
    assert.deepEqual(classify("/"), { kind: "ignore" });
    assert.deepEqual(classify("/explore"), { kind: "ignore" });
    assert.deepEqual(classify("/styles/meadow-reverie"), { kind: "ignore" });
    assert.deepEqual(classify("/about"), { kind: "ignore" });
    assert.deepEqual(classify("/about/"), { kind: "ignore" });
    assert.deepEqual(classify("/contact/"), { kind: "ignore" });
    assert.deepEqual(classify("/privacy"), { kind: "ignore" });
    assert.deepEqual(classify("/terms"), { kind: "ignore" });
    assert.deepEqual(classify("/terms-of-service"), { kind: "ignore" });
    assert.deepEqual(classify("/terms-of-service/"), { kind: "ignore" });
    assert.deepEqual(classify("/terms-of-service/", "p=1"), { kind: "ignore" });
  });

  it("sends old content slugs to the matching current page", () => {
    assert.deepEqual(classify("/privacy-policy"), {
      kind: "redirect",
      pathname: "/privacy",
    });
    assert.deepEqual(classify("/privacy-policy/"), {
      kind: "redirect",
      pathname: "/privacy",
    });
    assert.deepEqual(classify("/Privacy-Policy/"), {
      kind: "redirect",
      pathname: "/privacy",
    });
    assert.deepEqual(classify("/about-us"), {
      kind: "redirect",
      pathname: "/about",
    });
    assert.deepEqual(classify("/contact-us/"), {
      kind: "redirect",
      pathname: "/contact",
    });
  });

  it("retires WordPress system, feed, archive, and dated paths", () => {
    for (const path of [
      "/wp-admin",
      "/wp-admin/",
      "/wp-content/themes/twentytwentyfive/style.css",
      "/wp-includes/js/jquery.js",
      "/wp-login.php",
      "/wp-login.php/",
      "/wp-json/",
      "/xmlrpc.php",
      "/feed",
      "/feed/",
      "/comments/feed/",
      "/category/uncategorized/",
      "/tag/news",
      "/author/admin/",
      "/2025/01/01/hello-world/",
      "/2025/06/hello-world/",
      "/2025/01/15/sample-post/feed",
    ]) {
      assert.deepEqual(classify(path), { kind: "gone" }, path);
    }
  });

  it("retires WordPress ?p= permalinks without touching other queries", () => {
    assert.deepEqual(classify("/", "p=1"), { kind: "gone" });
    assert.deepEqual(classify("/", "p="), { kind: "gone" });
    assert.deepEqual(classify("/explore", "p=42"), { kind: "gone" });
    assert.deepEqual(classify("/explore", "q=portrait"), { kind: "ignore" });
    assert.deepEqual(classify("/", "page=2"), { kind: "ignore" });
  });
});
