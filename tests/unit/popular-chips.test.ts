import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createEmptyFilters,
  filterStyles,
} from "../../src/lib/catalog/filters";
import { getPublishedStyles } from "../../src/lib/catalog/styles";
import {
  DEFAULT_POPULAR_QUERIES,
  popularQueriesForSeason,
  SEASONS,
} from "../../src/lib/home/seasons";

describe("homepage popular chips", () => {
  const styles = getPublishedStyles();
  const empty = createEmptyFilters();

  const chipQueries = new Set<string>([
    ...DEFAULT_POPULAR_QUERIES,
    ...SEASONS.flatMap((season) => season.popularQueries),
    ...SEASONS.map((season) => popularQueriesForSeason(season)).flat(),
  ]);

  it("returns at least one result for every homepage popular chip", () => {
    assert.ok(chipQueries.size >= 6);
    for (const q of chipQueries) {
      const results = filterStyles(styles, empty, q, "Trending");
      assert.ok(
        results.length >= 1,
        `chip "${q}" returned 0 results; expected ≥1`,
      );
    }
  });

  it("matches the failing baseline chips Shaadi, Ghibli, and 80s retro", () => {
    for (const q of ["Shaadi", "Ghibli", "80s retro"] as const) {
      const results = filterStyles(styles, empty, q, "Trending");
      assert.ok(results.length >= 1, `${q} → ${results.length}`);
    }
  });
});
