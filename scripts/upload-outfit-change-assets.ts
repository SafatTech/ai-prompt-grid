/**
 * Upload the approved Outfit Change WebPs (285-296) to catalog-public.
 *
 *   npx tsx --env-file=.env.local scripts/upload-outfit-change-assets.ts <package-root>
 *
 * The root must contain webp/<slug>-before.webp and webp/<slug>-after.webp.
 */
import path from "node:path";
import {
  createCatalogUploadClient,
  uploadEditorialAsset,
} from "./lib/catalog-upload";

type Pair = { n: string; slug: string; secondSource?: boolean };

const pairs: Pair[] = [
  { n: "285", slug: "modern-saree-drape-outfit-change" },
  { n: "286", slug: "black-shalwar-kameez-outfit-change-men" },
  { n: "287", slug: "pastel-shalwar-kameez-outfit-change-women" },
  { n: "288", slug: "party-lehenga-outfit-change" },
  { n: "289", slug: "black-suit-outfit-change-men" },
  { n: "290", slug: "blazer-power-suit-outfit-change-women" },
  { n: "291", slug: "oversized-hoodie-cargo-streetwear-outfit-change" },
  { n: "292", slug: "kurta-waistcoat-eid-outfit-change-men" },
  { n: "293", slug: "modest-maxi-abaya-chic-outfit-change" },
  { n: "294", slug: "couple-matching-black-outfits-change", secondSource: true },
  { n: "295", slug: "couple-eastern-twinning-outfit-change", secondSource: true },
  { n: "296", slug: "leather-jacket-street-outfit-change-men" },
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
