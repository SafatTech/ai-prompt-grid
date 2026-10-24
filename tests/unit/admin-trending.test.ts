import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { adminTrendingSchema, MAX_TRENDING } from "../../src/lib/admin/trending";

describe("admin trending schema", () => {
  it("accepts up to twelve unique uuid style ids", () => {
    const ids = Array.from(
      { length: MAX_TRENDING },
      (_, i) => `00000000-0000-4000-8000-${String(i).padStart(12, "0")}`,
    );
    assert.equal(adminTrendingSchema.safeParse({ styleIds: ids }).success, true);
  });

  it("rejects more than twelve ids", () => {
    const ids = Array.from(
      { length: MAX_TRENDING + 1 },
      (_, i) => `10000000-0000-4000-8000-${String(i).padStart(12, "0")}`,
    );
    assert.equal(adminTrendingSchema.safeParse({ styleIds: ids }).success, false);
  });

  it("rejects duplicates", () => {
    const id = "00000000-0000-4000-8000-000000000099";
    assert.equal(adminTrendingSchema.safeParse({ styleIds: [id, id] }).success, false);
  });
});
