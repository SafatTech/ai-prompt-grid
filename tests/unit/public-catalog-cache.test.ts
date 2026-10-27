import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  PUBLIC_CATALOG_CACHE_ENTRY_BUDGET_BYTES,
  PUBLIC_CATALOG_PAGE_SIZE,
} from "../../src/lib/catalog/public-cache";
import {
  SHARED_STYLE_BLUR,
  toStyleCardData,
} from "../../src/lib/catalog/style-card-data";
import { getPublishedStyles } from "../../src/lib/catalog/styles";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const readSrc = (path: string) => readFileSync(join(root, path), "utf8");

describe("public catalog cache", () => {
  it("caches bounded catalog pages for one hour with a slim explicit select", () => {
    const source = readSrc("src/lib/catalog/repository.ts");
    const selectConstants = source.match(
      /const STYLE_ASSET_SELECT[\s\S]+?function publicBaseUrl/,
    )?.[0];
    assert.ok(selectConstants, "public select constants must remain inspectable");

    assert.match(source, /unstable_cache/);
    assert.match(source, /PUBLIC_CATALOG_CACHE_TAG/);
    assert.match(source, /PUBLIC_DATA_REVALIDATE_SECONDS/);
    assert.match(source, /published-catalog-page-v3/);
    assert.match(source, /\.range\(from, to\)/);
    assert.doesNotMatch(selectConstants, /prompt_variants\s*\(\s*\*\s*\)/);
    assert.doesNotMatch(selectConstants, /result_blur_data_url/);
    assert.match(source, /listPublishedStyles\(\)\)\.find/);
    // Merge detail heroes load blur one-style-at-a-time, not via the shared select.
    assert.match(source, /getPublishedStyleAmbientBlur/);
  });

  it("wires merge style detail pages to the one-style ambient blur fetch", () => {
    const source = readSrc("src/app/styles/[slug]/page.tsx");
    assert.match(source, /usesMergeHero/);
    assert.match(source, /getPublishedStyleAmbientBlur/);
    assert.match(source, /withStyleAmbientBlur/);
  });

  it("keeps representative serialized cache pages below the safety budget", () => {
    const styles = getPublishedStyles();
    const pageSizes: number[] = [];
    for (let start = 0; start < styles.length; start += PUBLIC_CATALOG_PAGE_SIZE) {
      const page = {
        styles: styles.slice(start, start + PUBLIC_CATALOG_PAGE_SIZE),
        sourceRowCount: Math.min(PUBLIC_CATALOG_PAGE_SIZE, styles.length - start),
      };
      pageSizes.push(Buffer.byteLength(JSON.stringify(page)));
    }

    assert.ok(pageSizes.length > 1, "fixture must exercise catalog pagination");
    assert.ok(
      Math.max(...pageSizes) < PUBLIC_CATALOG_CACHE_ENTRY_BUDGET_BYTES,
      `largest representative cache page is ${Math.max(...pageSizes)} bytes`,
    );
  });

  it("keeps card placeholders when unique database blurs are omitted", () => {
    const style = getPublishedStyles()[0]!;
    const withoutUniqueBlurs = {
      ...style,
      resultBlur: undefined,
    };
    const card = toStyleCardData(withoutUniqueBlurs, {
      includeBlur: true,
      sharedBlur: true,
    });
    assert.equal(card.resultBlur, SHARED_STYLE_BLUR);
  });

  it("batches public invalidation at completed admin write boundaries", () => {
    for (const path of [
      "src/app/api/admin/styles/[id]/route.ts",
      "src/app/api/admin/trending/route.ts",
    ]) {
      assert.match(
        readSrc(path),
        /expirePublicCatalogCache\(\)/,
        `${path} must expire the public catalog`,
      );
    }

    for (const path of [
      "src/app/api/admin/homepage/route.ts",
      "src/app/api/admin/styles/[id]/assets/route.ts",
    ]) {
      assert.doesNotMatch(
        readSrc(path),
        /expirePublicCatalogCache\(\)/,
        `${path} must not thrash the public catalog cache`,
      );
    }
  });

  it("generates style pages on demand instead of fanning out catalog reads at build", () => {
    const source = readSrc("src/app/styles/[slug]/page.tsx");
    assert.match(source, /generateStaticParams[\s\S]+return \[\]/);
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
