import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

const root = process.cwd();

function read(rel: string) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

describe("perf LCP/TBT follow-up", () => {
  it("bundles home.css through globals (no page/critical double sheet)", () => {
    const page = read("src/app/page.tsx");
    assert.ok(!page.includes('import "./home.css"'));
    assert.ok(!page.includes("homeCriticalCss"));
    assert.ok(!page.includes("home-critical.css"));
    // Tiny inline h1 metrics only — not a third stylesheet link.
    assert.ok(page.includes("hero-wall-title"));
    const globals = read("src/app/globals.css");
    assert.ok(globals.includes('@import "./home.css"'));
    const layout = read("src/app/layout.tsx");
    assert.ok(layout.includes('import "./globals.css"'));
    assert.ok(!layout.includes('import "./home.css"'));
    assert.ok(layout.includes('display: "swap"'));
    assert.ok(layout.includes("adjustFontFallback: true"));
    assert.ok(layout.includes("preload: false"));
    // Geist sans must not preload (competes with home h1 LCP).
    assert.match(layout, /geistSans[\s\S]*?preload:\s*false/);
  });

  it("keeps server StyleCardRail out of client ExploreLoadMore", () => {
    const loadMore = read("src/components/home/explore-load-more.tsx");
    assert.ok(loadMore.includes("StyleCardRailClient"));
    assert.ok(!loadMore.includes('from "@/components/style-card-rail"'));
    assert.ok(!loadMore.includes("StyleCardRail "));

    const rail = read("src/components/style-card-rail.tsx");
    assert.ok(!rail.includes('"use client"'));
    assert.ok(rail.includes("StyleCardSaveButton"));
    assert.ok(rail.includes("CopyPromptButton"));
    assert.ok(rail.includes("styleId={style.id}"));
    assert.ok(!rail.includes("style={{ id:"));

    const media = read("src/components/style-card-masonry-media.tsx");
    assert.ok(media.includes("styleId: string"));
    assert.ok(!media.includes("style: StyleCardData"));

    const copy = read("src/components/home/copy-prompt-button.tsx");
    assert.ok(copy.includes("styleId: string"));
    assert.ok(!copy.includes("Pick<StyleCardData"));
  });

  it("passes slim related-guide cards (no Guide.body) into the client island", () => {
    const page = read("src/app/guides/[slug]/page.tsx");
    assert.ok(page.includes("toRelatedGuideCard"));
    const lazy = read("src/components/guides/guide-related-lazy.tsx");
    assert.ok(lazy.includes("RelatedGuideCard"));
    assert.ok(!lazy.includes('from "@/lib/guides/load"'));
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

  it("N-29: ClipboardItem sync copy with prefetch + Copying state", () => {
    const copy = read("src/components/home/copy-prompt-button.tsx");
    assert.ok(copy.includes("ClipboardItem"));
    assert.ok(copy.includes("navigator.clipboard.write"));
    assert.ok(copy.includes("writeText"));
    assert.ok(copy.includes("onPointerEnter"));
    assert.ok(copy.includes("onTouchStart"));
    assert.ok(copy.includes("Copying…"));
    assert.ok(copy.includes("styleId: string"));
  });

  it("N-30: seeds explore appliedQuery from server offset cards", () => {
    const client = read("src/components/explore/explore-client.tsx");
    assert.ok(client.includes("useRef<string | null>(initialQueryString)"));
    assert.ok(client.includes("listingLoading && visible.length === 0"));
  });

  it("style hero sizes target ~364px at 390 viewport", () => {
    const preload = read("src/lib/images/next-image-preload.ts");
    assert.ok(preload.includes("364px"));
    assert.ok(!preload.includes("(max-width:640px) 320px"));
  });

  it("keeps home rail/media payload slim (no prompt previews / inline blur URIs)", () => {
    const rail = read("src/components/style-card-rail.tsx");
    assert.ok(!rail.includes("promptPreview"));
    assert.ok(rail.includes("Before → After"));
    const media = read("src/components/style-card-masonry-media.tsx");
    assert.ok(media.includes("is-pending"));
    assert.ok(!media.includes("backgroundImage"));
    assert.ok(media.includes('variant === "masonry"'));
    const page = read("src/app/page.tsx");
    assert.ok(page.includes("listHeroWallImages(36"));
    assert.ok(page.includes("slice(0, 24)"));
    const hero = read("src/components/home/hero-wall-tracks.tsx");
    assert.ok(!hero.includes("blurDataURL"));
    const dto = read("src/lib/catalog/style-card-data.ts");
    assert.ok(dto.includes("includePromptPreview"));
  });
});
