/**
 * Upload the approved Wedding Dresses WebPs (n 259-272) to catalog-public.
 *
 *   npx tsx --env-file=.env.local scripts/upload-wedding-dresses-assets.ts <extracted-archive-root>
 *
 * The root must contain style-pages/wedding-dresses.
 * Assets are uploaded only; they are never copied into this repository.
 */
import path from "node:path";
import {
  createCatalogUploadClient,
  uploadEditorialAsset,
} from "./lib/catalog-upload";

type Pair = { n: string; slug: string; secondSource?: boolean };

const pairs: Pair[] = [
  { n: "259", slug: "red-bridal-lehenga" },
  { n: "260", slug: "pastel-bridal-lehenga" },
  { n: "261", slug: "bridal-sharara" },
  { n: "262", slug: "nikkah-dress" },
  { n: "263", slug: "walima-maxi" },
  { n: "264", slug: "mehndi-outfit" },
  { n: "265", slug: "white-wedding-gown" },
  { n: "266", slug: "ivory-sherwani" },
  { n: "267", slug: "black-sherwani" },
  { n: "268", slug: "groom-prince-coat" },
  { n: "269", slug: "couple-wedding-outfits", secondSource: true },
  { n: "270", slug: "dulha-dulhan-outfits", secondSource: true },
  { n: "271", slug: "mehndi-groom-kurta" },
  { n: "272", slug: "walima-groom-suit" },
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
    const base = path.resolve(archiveRoot, "style-pages", "wedding-dresses", "webp");
    await upload(
      path.join(base, "before", `${pair.slug}-before.webp`),
      `source-${pair.n}`,
    );
    if (pair.secondSource) {
      await upload(
        path.join(base, "before", `${pair.slug}-before-b.webp`),
        `source-${pair.n}b`,
      );
    }
    await upload(path.join(base, "after", `${pair.slug}-after.webp`), `result-${pair.n}`);
    console.log(`${pair.n} ${pair.slug} OK`);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
