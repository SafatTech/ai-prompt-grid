import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  compareSavedDesc,
  createEmptyFilters,
  filterStyles,
} from "../../src/lib/catalog/filters";
import {
  homeExploreContinueHref,
  parseExploreExclude,
  parseExploreOffset,
} from "../../src/lib/catalog/explore-paging";
import { getPublishedStyles } from "../../src/lib/catalog/styles";
import type { CatalogStyle } from "../../src/lib/catalog/types";

describe("N-26 explore Load more exclude + stable order", () => {
  it("parses exclude ids and tops up a full batch without duplicates", () => {
    const styles = filterStyles(
      getPublishedStyles(),
      createEmptyFilters(),
      "",
      "Trending",
    );
    assert.ok(styles.length > 40);
    const shown = styles.slice(0, 18);
    const exclude = parseExploreExclude(
      new URLSearchParams(`exclude=${shown.map((s) => s.id).join(",")}`),
    );
    assert.equal(exclude.length, 18);
    const excluded = new Set(exclude);
    const batch = styles.filter((s) => !excluded.has(s.id)).slice(0, 18);
    assert.equal(batch.length, 18);
    for (const style of batch) {
      assert.equal(excluded.has(style.id), false);
    }
  });

  it("keeps save_count ties stable via id ascending", () => {
    const a = { id: "aaa", saved: 10 } as CatalogStyle;
    const b = { id: "bbb", saved: 10 } as CatalogStyle;
    assert.ok(compareSavedDesc(a, b) < 0);
    assert.ok(compareSavedDesc(b, a) > 0);
    const tied = [
      { id: "m", saved: 5 } as CatalogStyle,
      { id: "a", saved: 5 } as CatalogStyle,
      { id: "z", saved: 9 } as CatalogStyle,
    ];
    const sorted = [...tied].sort(compareSavedDesc);
    assert.deepEqual(
      sorted.map((s) => s.id),
      ["z", "a", "m"],
    );
  });
});

describe("N-27 home Load more styles offset", () => {
  it("continues explore from the next unseen index", () => {
    assert.equal(homeExploreContinueHref(100), "/explore?offset=100");
    assert.equal(parseExploreOffset(new URLSearchParams("offset=100")), 100);
    assert.equal(parseExploreOffset(new URLSearchParams("offset=-1")), null);
  });
});
