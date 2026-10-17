import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import {
  isPublishedGuideHref,
  publishedFooterFestivalLinks,
  publishedFooterGuideLinks,
} from "../../src/lib/guides/footer-links";
import { publishedGuideSlugs } from "../../src/lib/guides/published-slugs.generated";

describe("footer and published guide links", () => {
  it("only emits published guide slugs in the footer Guides column", () => {
    const published = new Set(publishedGuideSlugs);
    const links = publishedFooterGuideLinks();
    assert.ok(links.length >= 1);
    for (const link of links) {
      assert.ok(published.has(link.slug), `draft or unknown footer guide: ${link.slug}`);
    }
    assert.equal(
      links.some((link) => link.slug === "how-to-keep-face-same-in-gemini-ai"),
      false,
      "draft face-lock guide must not appear in the footer",
    );
  });

  it("only emits published guide hrefs in the footer Festivals column", () => {
    for (const link of publishedFooterFestivalLinks()) {
      if (link.href.startsWith("/guides/")) {
        assert.equal(isPublishedGuideHref(link.href), true, link.href);
      }
    }
  });

  it("does not hardcode the draft face-lock guide in site-footer.tsx", () => {
    const source = fs.readFileSync(
      path.join(process.cwd(), "src/components/site-footer.tsx"),
      "utf8",
    );
    assert.doesNotMatch(source, /how-to-keep-face-same-in-gemini-ai/);
  });
});
