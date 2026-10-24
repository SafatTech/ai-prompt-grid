import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const readSrc = (path: string) => readFileSync(join(root, path), "utf8");

describe("public catalog cache", () => {
  it("shares the joined catalog for one hour without wildcard variant columns", () => {
    const source = readSrc("src/lib/catalog/repository.ts");
    assert.match(source, /unstable_cache/);
    assert.match(source, /PUBLIC_CATALOG_CACHE_TAG/);
    assert.match(source, /PUBLIC_DATA_REVALIDATE_SECONDS/);
    assert.doesNotMatch(source, /prompt_variants\s*\(\s*\*\s*\)/);
    assert.match(source, /listPublishedStyles\(\)\)\.find/);
  });

  it("expires shared data after successful admin writes", () => {
    for (const path of [
      "src/app/api/admin/homepage/route.ts",
      "src/app/api/admin/styles/[id]/assets/route.ts",
      "src/app/api/admin/styles/[id]/route.ts",
      "src/app/api/admin/trending/route.ts",
    ]) {
      assert.match(
        readSrc(path),
        /expirePublicCatalogCache\(\)/,
        `${path} must expire the public catalog`,
      );
    }
  });

  it("uses hourly ISR safety nets on database-backed public pages", () => {
    for (const path of [
      "src/app/page.tsx",
      "src/app/explore/page.tsx",
      "src/app/explore/faceted/page.tsx",
      "src/app/styles/[slug]/page.tsx",
      "src/app/sitemap.ts",
    ]) {
      assert.match(readSrc(path), /export const revalidate = 3600/);
    }
  });
});
