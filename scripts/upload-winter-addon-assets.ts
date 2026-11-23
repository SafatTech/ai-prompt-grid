/**
 * Upload the approved Winter add-on WebPs (297-303) to catalog-public.
 *
 *   npx tsx --env-file=.env.local scripts/upload-winter-addon-assets.ts <package-root>
 *
 * The root must contain webp/<slug>-before.webp and webp/<slug>-after.webp.
 * Couple style 302 also needs webp/<slug>-before-b.webp (secondSource).
 *
 * Do not run this from CI; images are expected to already live in catalog-public.
 */
import path from "node:path";
import {
  createCatalogUploadClient,
  uploadEditorialAsset,
} from "./lib/catalog-upload";

type Pair = { n: string; slug: string; secondSource?: boolean };

const pairs: Pair[] = [
  { n: "297", slug: "foggy-road-hoodie-muffler-winter-ai-photo-prompt-boys" },
  { n: "298", slug: "chai-dhaba-fog-leather-jacket-winter-ai-photo-prompt-men" },
  {
    n: "299",
    slug: "kurta-pashmina-shawl-snowy-pine-forest-winter-ai-photo-prompt-men",
  },
  { n: "300", slug: "pastel-coat-beanie-snowfall-winter-ai-photo-prompt-girls" },
  {
    n: "301",
    slug: "cinematic-foggy-street-portrait-winter-ai-photo-prompt-women",
  },
  {
    n: "302",
    slug: "couple-foggy-road-walk-one-shawl-winter-ai-photo-prompt",
    secondSource: true,
  },
  { n: "303", slug: "viral-snowflake-close-up-portrait-winter-ai-photo-prompt" },
];

async function main() {
  const archiveRoot = process.argv[2];
  if (!archiveRoot) {
    throw new Error("Pass the package root as the first argument");
  }

  const client = createCatalogUploadClient();

  async function upload(localPath: string, keyStem: string): Promise<void> {
    await uploadEditorialAsset({
      localPath,
      keyStem,
      mimeHint: "image/webp",
      supabase: client,
      forceWebpKey: true,
    });
  }

  for (const pair of pairs) {
    const base = path.resolve(archiveRoot, "webp");
    await upload(
      path.join(base, `${pair.slug}-before.webp`),
      `source-${pair.n}`,
    );
    if (pair.secondSource) {
      await upload(
        path.join(base, `${pair.slug}-before-b.webp`),
        `source-${pair.n}b`,
      );
    }
    await upload(path.join(base, `${pair.slug}-after.webp`), `result-${pair.n}`);
    console.log(`${pair.n} ${pair.slug} OK`);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
