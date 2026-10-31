import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  compareNewestDesc,
  compareSavedDesc,
  createEmptyFilters,
  filterStyles,
} from "../../src/lib/catalog/filters";
import {
  listNewestStyles,
  selectNewestStyles,
} from "../../src/lib/catalog/repository";
import { getPublishedStyles } from "../../src/lib/catalog/styles";
import type { CatalogStyle } from "../../src/lib/catalog/types";
import { NEW_STYLES_RAIL } from "../../src/lib/home/rails";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

function readSrc(rel: string) {
  return readFileSync(join(root, rel), "utf8");
}

function withSaved(style: CatalogStyle, saved: number, publishedAt?: string): CatalogStyle {
  return { ...style, saved, publishedAt: publishedAt ?? style.publishedAt ?? null };
}

function fixtureStyle(
  id: string,
  overrides: Partial<CatalogStyle> = {},
): CatalogStyle {
  const base = getPublishedStyles()[0]!;
  return {
    ...base,
    id,
    title: id,
    publishedAt: "2026-01-01T00:00:00.000Z",
    pinNewRank: null,
    hideFromNew: false,
    showOnHome: true,
    ...overrides,
  };
}

describe("New styles rail", () => {
  it("defines a 10–12 item newest rail wired on the homepage", () => {
    assert.equal(NEW_STYLES_RAIL.id, "new-styles");
    assert.ok(NEW_STYLES_RAIL.limit >= 10 && NEW_STYLES_RAIL.limit <= 12);
    assert.equal(NEW_STYLES_RAIL.href, "/explore?sort=Newest");

    const page = readSrc("src/app/page.tsx");
    assert.ok(page.includes("listNewestStyles"));
    assert.ok(page.includes("NEW_STYLES_RAIL"));
    assert.ok(page.includes("newestCards"));
  });

  it("returns newest styles in reverse seed order when publishedAt is absent", async () => {
    const newest = await listNewestStyles(12);
    const seedNewest = [...getPublishedStyles()].reverse().slice(0, 12);
    assert.deepEqual(
      newest.map((s) => s.id),
      seedNewest.map((s) => s.id),
    );
  });

  it("keeps a hideFromNew pin in its pinNewRank slot", () => {
    const organic = Array.from({ length: 8 }, (_, index) =>
      fixtureStyle(`organic-${index}`, {
        publishedAt: `2026-06-${String(index + 1).padStart(2, "0")}T00:00:00.000Z`,
      }),
    );
    const pins = [1, 2, 3, 4, 5].map((rank) =>
      fixtureStyle(`pin-${rank}`, {
        pinNewRank: rank,
        hideFromNew: rank === 4,
        publishedAt: "2025-01-01T00:00:00.000Z",
      }),
    );
    const newest = selectNewestStyles([...organic, ...pins], 12);
    assert.deepEqual(
      newest.slice(0, 5).map((style) => style.id),
      ["pin-1", "pin-2", "pin-3", "pin-4", "pin-5"],
    );
    assert.equal(newest[3]?.id, "pin-4");
    assert.equal(newest[3]?.hideFromNew, true);
    assert.equal(newest[3]?.pinNewRank, 4);
    assert.ok(!newest.slice(5).some((style) => style.hideFromNew));
  });

  it("keeps StyleRail free of priority/eager loading", () => {
    const rail = readSrc("src/components/home/style-rail.tsx");
    // Comment documents the rule; props must not enable LCP loading on rails.
    assert.ok(rail.includes("No priority/eager on rails"));
    assert.ok(!/\bpriority=\{/.test(rail));
    assert.ok(!/\bloading=["']eager["']/.test(rail));
  });
});

describe("save_count + published_at sort", () => {
  it("uses published_at as the Most saved tie-breaker", () => {
    const base = getPublishedStyles()[0]!;
    const older = withSaved(base, 50, "2026-01-01T00:00:00.000Z");
    const newer = withSaved(
      { ...base, id: `${base.id}-newer` },
      50,
      "2026-06-01T00:00:00.000Z",
    );
    assert.ok(compareSavedDesc(newer, older) < 0);
    assert.ok(compareSavedDesc(older, newer) > 0);

    const sorted = filterStyles(
      [older, newer],
      createEmptyFilters(),
      "",
      "Most saved",
    );
    assert.equal(sorted[0]?.id, newer.id);
  });

  it("sorts Newest by published_at desc", () => {
    const base = getPublishedStyles()[0]!;
    const older = withSaved(base, 1, "2026-01-01T00:00:00.000Z");
    const newer = withSaved(
      { ...base, id: `${base.id}-newer` },
      99,
      "2026-09-01T00:00:00.000Z",
    );
    assert.ok(compareNewestDesc(newer, older) < 0);
    const sorted = filterStyles(
      [older, newer],
      createEmptyFilters(),
      "",
      "Newest",
    );
    assert.equal(sorted[0]?.id, newer.id);
  });
});
