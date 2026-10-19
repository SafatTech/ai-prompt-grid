import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildVariantSrc,
  parseCatalogImageSrc,
  pickVariantWidth,
  resolveCatalogImageSrc,
  variantObjectKey,
  type VariantManifest,
} from "../../src/lib/images/variant-config";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

describe("image variant width mapping", () => {
  it("picks the nearest width at or above the request", () => {
    assert.equal(pickVariantWidth(200, [360, 540, 720, 1080]), 360);
    assert.equal(pickVariantWidth(360, [360, 540, 720, 1080]), 360);
    assert.equal(pickVariantWidth(361, [360, 540, 720, 1080]), 540);
    assert.equal(pickVariantWidth(900, [360, 540, 720, 1080]), 1080);
  });

  it("returns null only above the 1080 ladder when a 1080 variant exists", () => {
    assert.equal(pickVariantWidth(1200, [360, 540, 720, 1080]), null);
    // Source too narrow for 1080 — still serve the largest generated width.
    assert.equal(pickVariantWidth(1080, [360, 540, 720]), 720);
    assert.equal(pickVariantWidth(1081, [360, 540, 720]), 720);
  });


  it("builds deterministic .w{n}.webp object keys beside the original", () => {
    assert.equal(
      variantObjectKey("seed/catalog/editorial/result-01.webp", 360),
      "seed/catalog/editorial/result-01.w360.webp",
    );
    assert.equal(
      variantObjectKey("/catalog/editorial/source-01.png", 720),
      "/catalog/editorial/source-01.w720.webp",
    );
  });
});

describe("image variant loader mapping", () => {
  const manifest: VariantManifest = {
    version: 1,
    widths: [360, 540, 720, 1080],
    keys: {
      "seed/catalog/editorial/result-01.webp": [360, 540, 720, 1080],
      "/catalog/editorial/result-01.png": [360, 540, 720],
    },
  };

  it("parses Supabase catalog-public and local catalog paths", () => {
    const remote = parseCatalogImageSrc(
      "https://rbmirzmppbytorbhncxj.supabase.co/storage/v1/object/public/catalog-public/seed/catalog/editorial/result-01.webp",
    );
    assert.deepEqual(remote, {
      kind: "supabase",
      origin: "https://rbmirzmppbytorbhncxj.supabase.co",
      objectKey: "seed/catalog/editorial/result-01.webp",
      src: "https://rbmirzmppbytorbhncxj.supabase.co/storage/v1/object/public/catalog-public/seed/catalog/editorial/result-01.webp",
    });

    const local = parseCatalogImageSrc("/catalog/editorial/result-01.png");
    assert.equal(local?.kind, "local");
    assert.equal(local?.objectKey, "/catalog/editorial/result-01.png");
    assert.equal(parseCatalogImageSrc("/brand/hero/x.webp"), null);
  });

  it("rewrites known keys to the matching variant URL", () => {
    const remoteSrc =
      "https://rbmirzmppbytorbhncxj.supabase.co/storage/v1/object/public/catalog-public/seed/catalog/editorial/result-01.webp";
    assert.equal(
      resolveCatalogImageSrc(remoteSrc, 390, manifest),
      "https://rbmirzmppbytorbhncxj.supabase.co/storage/v1/object/public/catalog-public/seed/catalog/editorial/result-01.w540.webp",
    );
    assert.equal(
      resolveCatalogImageSrc("/catalog/editorial/result-01.png", 200, manifest),
      "/catalog/editorial/result-01.w360.webp",
    );
  });

  it("falls back to the original when the key is missing or width exceeds the ladder", () => {
    const remoteSrc =
      "https://rbmirzmppbytorbhncxj.supabase.co/storage/v1/object/public/catalog-public/seed/catalog/editorial/missing.webp";
    assert.equal(
      resolveCatalogImageSrc(remoteSrc, 360, manifest),
      `${remoteSrc}?w=360`,
    );
    // Local entry maxes at 720 — still prefer 720 over the multi‑MB PNG.
    assert.equal(
      resolveCatalogImageSrc("/catalog/editorial/result-01.png", 2000, manifest),
      "/catalog/editorial/result-01.w720.webp",
    );
    // Full ladder present → original above 1080 (width stamped for next/image).
    assert.equal(
      resolveCatalogImageSrc(
        "https://rbmirzmppbytorbhncxj.supabase.co/storage/v1/object/public/catalog-public/seed/catalog/editorial/result-01.webp",
        2000,
        manifest,
      ),
      "https://rbmirzmppbytorbhncxj.supabase.co/storage/v1/object/public/catalog-public/seed/catalog/editorial/result-01.webp?w=2000",
    );
  });



  it("builds supabase variant URLs from a parsed ref", () => {
    const ref = parseCatalogImageSrc(
      "https://example.supabase.co/storage/v1/object/public/catalog-public/seed/a.webp",
    );
    assert.ok(ref);
    assert.equal(
      buildVariantSrc(ref, 720),
      "https://example.supabase.co/storage/v1/object/public/catalog-public/seed/a.w720.webp",
    );
  });
});

describe("image variant wiring", () => {
  it("uses the custom loader when Vercel opt is off", () => {
    const config = readFileSync(join(root, "next.config.ts"), "utf8");
    assert.ok(config.includes('loader: "custom"'));
    assert.ok(config.includes("supabase-image-loader.ts"));
    assert.ok(config.includes("deviceSizes: [360, 540, 720, 1080]"));
    assert.ok(!config.includes("unoptimized: !isVercelImageOptEnabled()"));
  });

  it("documents the generator script", () => {
    const pkg = readFileSync(join(root, "package.json"), "utf8");
    assert.ok(pkg.includes("db:generate-image-variants"));
    const script = readFileSync(join(root, "scripts/generate-image-variants.ts"), "utf8");
    assert.ok(script.includes("LONG_CACHE"));
    assert.ok(script.includes("31536000"));
    assert.ok(script.includes("--dry-run"));
    assert.ok(script.includes("--force"));
    assert.ok(script.includes("--fix-cache"));
    assert.ok(script.includes("fixOriginalCacheControl"));
  });
});

