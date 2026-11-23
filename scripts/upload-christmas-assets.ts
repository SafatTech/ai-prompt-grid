/**
 * Upload the approved Christmas WebPs (n 273-284) to catalog-public.
 *
 *   npx tsx --env-file=.env.local scripts/upload-christmas-assets.ts <extracted-archive-root>
 *
 * The root must contain style-pages/christmas.
 * Assets are uploaded only; they are never copied into this repository.
 */
import path from "node:path";
import {
  createCatalogUploadClient,
  uploadEditorialAsset,
} from "./lib/catalog-upload";

type Pair = { n: string; slug: string; secondSource?: boolean };

const pairs: Pair[] = [
  { n: "273", slug: "cozy-fireplace-sweater-christmas-portrait-women" },
  { n: "274", slug: "mens-christmas-knit-sweater-portrait" },
  { n: "275", slug: "christmas-tree-lights-bokeh-selfie" },
  { n: "276", slug: "red-velvet-holiday-glam-portrait" },
  { n: "277", slug: "couple-matching-christmas-pajamas-by-tree", secondSource: true },
  { n: "278", slug: "couple-string-lights-doorway-christmas", secondSource: true },
  { n: "279", slug: "couple-christmas-market-night-stroll", secondSource: true },
  { n: "280", slug: "mens-christmas-photoshoot-dark-suit-gift-boxes" },
  { n: "281", slug: "80s-retro-christmas-portrait" },
  { n: "282", slug: "womens-studio-christmas-photoshoot-red-backdrop" },
  { n: "283", slug: "christmas-snowfall-winter-coat-portrait" },
  { n: "284", slug: "couple-snowy-cabin-window-christmas", secondSource: true },
];

async function main() {
  const archiveRoot = process.argv[2];
  if (!archiveRoot) {
    throw new Error("Pass the extracted archive root as the first argument");
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
    const base = path.resolve(archiveRoot, "style-pages", "christmas", "webp");
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
