import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

const root = process.cwd();

function read(rel: string) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

describe("perf LCP/TBT follow-up", () => {
  it("inlines home critical CSS and tunes Geist for LCP text", () => {
    const page = read("src/app/page.tsx");
    assert.ok(page.includes("homeCriticalCss"));
    assert.ok(fs.existsSync(path.join(root, "src/app/home-critical.css")));
    const critical = read("src/app/home-critical.css");
    assert.ok(critical.includes(".hero-wall-title"));
    // Mobile overrides after base rules (same contract as home.css).
    assert.ok(critical.indexOf(".hero-wall-title") < critical.indexOf("@media (max-width: 699px)"));
    assert.ok(critical.includes("font-size: 44px"));

    const layout = read("src/app/layout.tsx");
    assert.ok(layout.includes('display: "swap"'));
    assert.ok(layout.includes("adjustFontFallback: true"));
    assert.ok(layout.includes("preload: false"));
  });

  it("passes slim related-guide cards (no Guide.body) into the client island", () => {
    const page = read("src/app/guides/[slug]/page.tsx");
    assert.ok(page.includes("toRelatedGuideCard"));
    const lazy = read("src/components/guides/guide-related-lazy.tsx");
    assert.ok(lazy.includes("RelatedGuideCard"));
    assert.ok(!lazy.includes('from "@/lib/guides/load"'));
    const rail = read("src/components/style-card-rail.tsx");
    assert.ok(rail.includes("style={{ id: style.id, title: style.title }}"));
  });

  it("reads explore ?offset= on the faceted (rewritten) server path", () => {
    // Bare /explore stays ISR; document ?offset= rewrites to /explore/faceted.
    const bare = read("src/app/explore/page.tsx");
    assert.ok(!bare.includes("searchParams"));
    const faceted = read("src/app/explore/faceted/page.tsx");
    assert.ok(faceted.includes("offsetParam"));
    const view = read("src/components/explore/explore-page-view.tsx");
    assert.ok(view.includes("parseExploreOffset"));
    assert.ok(view.includes("offset > 0"));
  });
});
