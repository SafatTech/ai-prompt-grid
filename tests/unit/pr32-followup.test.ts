import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { GET as adsTxtGet } from "../../src/app/ads.txt/route";
import { GUIDES_PAGE_SIZE } from "../../src/components/guides/guides-index";
import {
  EXPLORE_PAGE_SIZE,
  homeExploreFallbackPage,
} from "../../src/lib/catalog/explore-pages";
import { listIndexableGuides } from "../../src/lib/guides/load";

describe("PR32 follow-up: home → explore page math (N-10 / N-27)", () => {
  it("maps shown counts to the explore page that starts at or before offset", async () => {
    const { homeExploreContinueHref } = await import(
      "../../src/lib/catalog/explore-paging"
    );
    assert.equal(EXPLORE_PAGE_SIZE, 18);
    // Legacy page helper: floor(shown/18)+1 (no +1 skip).
    assert.equal(homeExploreFallbackPage(72), 5);
    assert.equal(homeExploreFallbackPage(24), 2);
    assert.equal(homeExploreFallbackPage(54), 4);
    assert.equal(homeExploreFallbackPage(18), 2);
    // N-27: continue via offset so no cards are skipped.
    assert.equal(homeExploreContinueHref(100), "/explore?offset=100");
    assert.equal(homeExploreContinueHref(0), "/explore");
  });
});

describe("PR32 follow-up: guides pagination skips featured (N-11)", () => {
  it("pages through guides.slice(1) so page 2 does not repeat the last page-1 card", () => {
    const guides = listIndexableGuides();
    assert.ok(guides.length > GUIDES_PAGE_SIZE + 1);

    const remaining = guides.slice(1);
    const page1 = remaining.slice(0, GUIDES_PAGE_SIZE);
    const page2 = remaining.slice(GUIDES_PAGE_SIZE, GUIDES_PAGE_SIZE * 2);

    assert.equal(page1.length, GUIDES_PAGE_SIZE);
    assert.ok(page2.length > 0);
    const page1Ids = new Set(page1.map((g) => g.slug));
    for (const guide of page2) {
      assert.equal(page1Ids.has(guide.slug), false, guide.slug);
    }
    // Featured (guides[0]) must not appear in the page-2 grid either.
    assert.equal(
      page2.some((g) => g.slug === guides[0]!.slug),
      false,
    );
  });
});

describe("PR32 follow-up: ads.txt (AdSense prep)", () => {
  it("returns 404 when NEXT_PUBLIC_ADSENSE_CLIENT is unset", async () => {
    const prev = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
    delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
    try {
      const res = adsTxtGet();
      assert.equal(res.status, 404);
    } finally {
      if (prev === undefined) delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
      else process.env.NEXT_PUBLIC_ADSENSE_CLIENT = prev;
    }
  });

  it("emits the Google ads.txt line from ca-pub ids", async () => {
    const prev = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT = "ca-pub-1234567890123456";
    try {
      const res = adsTxtGet();
      assert.equal(res.status, 200);
      assert.equal(
        await res.text(),
        "google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n",
      );
    } finally {
      if (prev === undefined) delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
      else process.env.NEXT_PUBLIC_ADSENSE_CLIENT = prev;
    }
  });
});
