import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isVercelImageOptEnabled } from "../../src/lib/images/vercel-image-opt";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

function readSrc(rel: string) {
  return readFileSync(join(root, rel), "utf8");
}

describe("Vercel image optimization toggle", () => {
  it("defaults off and turns on only when NEXT_PUBLIC_VERCEL_IMAGE_OPT=1", () => {
    const prev = process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT;
    try {
      delete process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT;
      assert.equal(isVercelImageOptEnabled(), false);
      process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT = "0";
      assert.equal(isVercelImageOptEnabled(), false);
      process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT = "1";
      assert.equal(isVercelImageOptEnabled(), true);
    } finally {
      if (prev === undefined) delete process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT;
      else process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT = prev;
    }
  });

  it("wires the custom loader to the env toggle in next.config", () => {
    const config = readSrc("next.config.ts");
    assert.ok(config.includes("isVercelImageOptEnabled"));
    assert.ok(config.includes('loader: "custom"'));
    assert.ok(config.includes("supabase-image-loader.ts"));
    assert.ok(config.includes("NEXT_PUBLIC_VERCEL_IMAGE_OPT"));
  });


  it("documents the Pro re-enable switch in .env.example", () => {
    const env = readSrc(".env.example");
    assert.ok(env.includes("NEXT_PUBLIC_VERCEL_IMAGE_OPT"));
  });

  it("prefetches home gallery batches early and keeps blur inside skeletons", () => {
    const home = readSrc("src/components/home/explore-load-more.tsx");
    assert.ok(home.includes('rootMargin: "1400px 0px"'));

    const feed = readSrc("src/components/home/explore-feed.tsx");
    assert.ok(feed.includes("priority={index === 0}"));
    assert.ok(feed.includes("eager={index > 0 && index < 2}"));

    const skeleton = readSrc("src/components/style-card-skeleton.tsx");
    assert.ok(skeleton.includes("SHARED_STYLE_BLUR"));
    assert.ok(skeleton.includes("backgroundImage"));
  });
});

