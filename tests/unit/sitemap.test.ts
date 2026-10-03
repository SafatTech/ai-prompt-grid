import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import sitemap from "../../src/app/sitemap";
import { guideSitemapEntries } from "../../src/lib/seo/guide-sitemap";
import { absoluteUrl } from "../../src/lib/site-url";

function lastModifiedIso(value: Date | string | undefined): string {
  assert.ok(value instanceof Date);
  return value.toISOString();
}

describe("sitemap guide entries", () => {
  it("leaves draft-only sites without a /guides URL", () => {
    assert.deepEqual(guideSitemapEntries([], new Date("2026-10-03T00:00:00.000Z")), []);
  });

  it("lists the index and each published guide, ignoring a blank slug", () => {
    const now = new Date("2026-10-03T00:00:00.000Z");
    const entries = guideSitemapEntries(
      [
        { slug: "published-one", updated: "2026-10-01" },
        { slug: "  ", updated: "2026-10-01" },
      ],
      now,
    );
    assert.deepEqual(
      entries.map((entry) => entry.url),
      [absoluteUrl("/guides"), absoluteUrl("/guides/published-one")],
    );
    assert.equal(lastModifiedIso(entries[1]?.lastModified), "2026-10-01T00:00:00.000Z");
  });

  it("replaces an unusable guide date instead of throwing", () => {
    const now = new Date("2026-10-03T00:00:00.000Z");
    const entries = guideSitemapEntries(
      [{ slug: "published-one", updated: "soon" }],
      now,
    );
    assert.equal(lastModifiedIso(entries[1]?.lastModified), now.toISOString());
  });
});

describe("sitemap handler", () => {
  it("does not parse guide bodies while building the public URL list", () => {
    const source = fs.readFileSync(
      path.join(process.cwd(), "src/app/sitemap.ts"),
      "utf8",
    );
    assert.equal(source.includes("listIndexableGuides"), false);
    assert.equal(source.includes("guides/load"), false);
    assert.match(source, /publishedGuides/);
    assert.match(source, /guideSitemapEntries/);
  });

  it("returns the static public pages and omits draft guides", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);
    for (const path of ["/", "/explore", "/about", "/contact", "/privacy-policy"]) {
      assert.ok(urls.includes(absoluteUrl(path)), path);
    }
    assert.equal(
      urls.some((url) => url.includes("/guides")),
      false,
    );
    for (const entry of entries) {
      if (entry.lastModified instanceof Date) {
        assert.equal(Number.isNaN(entry.lastModified.getTime()), false);
      }
    }
  });
});
