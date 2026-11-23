import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import {
  PUBLISHED_SUPABASE_URL,
  resolveCatalogMediaUrl,
  rewriteCatalogStorageUrl,
  seedCatalogAssetUrl,
} from "../../src/lib/catalog/seed-asset-url";

const BLOB_BASE = "https://apbirgkz72rte2i7.public.blob.vercel-storage.com";
const SUPABASE_OBJECT =
  `${PUBLISHED_SUPABASE_URL}/storage/v1/object/public/catalog-public/seed/catalog/editorial/result-01.webp`;

const originalMedia = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
const originalSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL;

afterEach(() => {
  if (originalMedia === undefined) delete process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
  else process.env.NEXT_PUBLIC_MEDIA_BASE_URL = originalMedia;
  if (originalSupabase === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  else process.env.NEXT_PUBLIC_SUPABASE_URL = originalSupabase;
});

describe("catalog media URL rewrite", () => {
  it("leaves Supabase catalog URLs unchanged when NEXT_PUBLIC_MEDIA_BASE_URL is unset", () => {
    delete process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
    assert.equal(rewriteCatalogStorageUrl(SUPABASE_OBJECT), SUPABASE_OBJECT);
    assert.equal(resolveCatalogMediaUrl(SUPABASE_OBJECT), SUPABASE_OBJECT);
    assert.match(
      seedCatalogAssetUrl("editorial", "result-01.png"),
      /^https:\/\/rbmirzmppbytorbhncxj\.supabase\.co\/storage\/v1\/object\/public\/catalog-public\/seed\/catalog\/editorial\/result-01\.webp$/,
    );
  });

  it("rewrites known Supabase catalog-public URLs onto the Blob base", () => {
    process.env.NEXT_PUBLIC_MEDIA_BASE_URL = BLOB_BASE;
    assert.equal(
      rewriteCatalogStorageUrl(SUPABASE_OBJECT),
      `${BLOB_BASE}/seed/catalog/editorial/result-01.webp`,
    );
    assert.equal(
      resolveCatalogMediaUrl(SUPABASE_OBJECT),
      `${BLOB_BASE}/seed/catalog/editorial/result-01.webp`,
    );
  });

  it("rewrites legacy /catalog paths and bare keys when the Blob base is set", () => {
    process.env.NEXT_PUBLIC_MEDIA_BASE_URL = BLOB_BASE;
    assert.equal(
      resolveCatalogMediaUrl("/catalog/editorial/result-54.png"),
      `${BLOB_BASE}/seed/catalog/editorial/result-54.webp`,
    );
    assert.equal(
      resolveCatalogMediaUrl("seed/catalog/editorial/result-01.webp"),
      `${BLOB_BASE}/seed/catalog/editorial/result-01.webp`,
    );
    assert.equal(
      seedCatalogAssetUrl("product", "result-01.png"),
      `${BLOB_BASE}/seed/catalog/product/result-01.webp`,
    );
  });

  it("does not rewrite unrelated absolute URLs", () => {
    process.env.NEXT_PUBLIC_MEDIA_BASE_URL = BLOB_BASE;
    const other = "https://example.com/photo.webp";
    assert.equal(resolveCatalogMediaUrl(other), other);
  });

  it("strips a trailing slash from NEXT_PUBLIC_MEDIA_BASE_URL", () => {
    process.env.NEXT_PUBLIC_MEDIA_BASE_URL = `${BLOB_BASE}/`;
    assert.equal(
      resolveCatalogMediaUrl(SUPABASE_OBJECT),
      `${BLOB_BASE}/seed/catalog/editorial/result-01.webp`,
    );
  });
});
