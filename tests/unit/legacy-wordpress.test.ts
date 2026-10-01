import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { classifyLegacyRequest } from "../../src/lib/http/legacy-wordpress";

function classify(path: string, search = "") {
  return classifyLegacyRequest(path, new URLSearchParams(search));
}

describe("legacy WordPress requests", () => {
  it("leaves legal, about, and contact pages alone", () => {
    assert.deepEqual(classify("/"), { kind: "ignore" });
    assert.deepEqual(classify("/explore"), { kind: "ignore" });
    assert.deepEqual(classify("/styles/meadow-reverie"), { kind: "ignore" });
    assert.deepEqual(classify("/privacy"), { kind: "ignore" });
    assert.deepEqual(classify("/terms"), { kind: "ignore" });
    for (const path of [
      "/about",
      "/about/",
      "/contact",
      "/contact/",
      "/privacy-policy",
      "/privacy-policy/",
      "/Privacy-Policy/",
      "/cookie-policy",
      "/cookie-policy/",
      "/disclaimer",
      "/disclaimer/",
      "/terms-of-service",
      "/terms-of-service/",
    ]) {
      assert.deepEqual(classify(path), { kind: "ignore" }, path);
      assert.deepEqual(classify(path, "p=1"), { kind: "ignore" }, `${path}?p=1`);
    }
  });

  it("sends old about and contact slugs to the current pages", () => {
    assert.deepEqual(classify("/about-us"), {
      kind: "redirect",
      pathname: "/about",
    });
    assert.deepEqual(classify("/about-us/"), {
      kind: "redirect",
      pathname: "/about",
    });
    assert.deepEqual(classify("/contact-us"), {
      kind: "redirect",
      pathname: "/contact",
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

  it("retires WordPress ?p= permalinks only on the old homepage paths", () => {
    assert.deepEqual(classify("/", "p=123"), { kind: "gone" });
    assert.deepEqual(classify("/", "p=1"), { kind: "gone" });
    assert.deepEqual(classify("/index.php", "p=123"), { kind: "gone" });
    assert.deepEqual(classify("/", "p="), { kind: "ignore" });
    assert.deepEqual(classify("/explore", "p=2"), { kind: "ignore" });
    assert.deepEqual(classify("/styles/x", "p=1"), { kind: "ignore" });
    assert.deepEqual(classify("/explore", "q=portrait"), { kind: "ignore" });
    assert.deepEqual(classify("/", "page=2"), { kind: "ignore" });
  });

  it("leaves guide pages alone, including trailing slashes and ?p=", () => {
    for (const path of [
      "/guides",
      "/guides/",
      "/guides/halloween-ai-prompts-for-selfies",
      "/guides/halloween-ai-prompts-for-selfies/",
      "/Guides/Halloween-AI-Prompts-For-Selfies/",
    ]) {
      assert.deepEqual(classify(path), { kind: "ignore" }, path);
      assert.deepEqual(classify(path, "p=1"), { kind: "ignore" }, `${path}?p=1`);
    }
  });

  it("skips API and Next.js internals entirely", () => {
    assert.deepEqual(classify("/api/creations", "p=1"), { kind: "ignore" });
    assert.deepEqual(classify("/api/search/suggest", "p=1"), { kind: "ignore" });
    assert.deepEqual(classify("/_next/static/chunks/app.js", "p=1"), { kind: "ignore" });
    assert.deepEqual(classify("/_next/image"), { kind: "ignore" });
  });
});
