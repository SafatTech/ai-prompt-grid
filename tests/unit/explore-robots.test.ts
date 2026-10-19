import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { exploreHasSearchParams, exploreRobots } from "../../src/lib/seo/explore-robots";

describe("explore robots from searchParams (N-23)", () => {
  it("indexes the bare listing", () => {
    assert.equal(exploreHasSearchParams({}), false);
    assert.deepEqual(exploreRobots({}), { index: true, follow: true });
  });

  it("noindexes faceted and paginated URLs", () => {
    for (const params of [
      { q: "christmas" },
      { category: "Anime" },
      { subject: "Person" },
      { page: "2" },
      { q: "x", category: "Anime" },
    ]) {
      assert.equal(exploreHasSearchParams(params), true, JSON.stringify(params));
      assert.deepEqual(exploreRobots(params), { index: false, follow: true });
    }
  });
});
