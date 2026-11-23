/**
 * Upload the approved Saree / Sari guide WebPs (316-332) to catalog-public.
 *
 *   npx tsx --env-file=.env.local scripts/upload-saree-assets.ts <package-root>
 *
 * The root must contain webp/<slug>-before.webp and webp/<slug>-after.webp.
 * Assets for this guide are already uploaded; do not run this in CI.
 */
import path from "node:path";
import {
  createCatalogUploadClient,
  uploadEditorialAsset,
} from "./lib/catalog-upload";

type Pair = { n: string; slug: string };

const pairs: Pair[] = [
  { n: "316", slug: "mint-sequin-stripe-saree-marble-hallway" },
  { n: "317", slug: "blush-organza-potli-saree-garden-patio" },
  { n: "318", slug: "ivory-lace-reception-saree-boutique-mirror" },
  { n: "319", slug: "leopard-print-belted-saree-old-city-street" },
  { n: "320", slug: "teal-sequin-glam-saree-velvet-curtain" },
  { n: "321", slug: "sage-organza-saree-ivy-terrace" },
  { n: "322", slug: "red-ruffle-gown-saree-red-carpet" },
  { n: "323", slug: "rose-gold-tissue-silk-saree-marble-studio" },
  { n: "324", slug: "champagne-pallu-flare-saree-palace-hall" },
  { n: "325", slug: "black-gold-border-saree-flower-steps" },
  { n: "326", slug: "ombre-saree-over-shoulder-dressing-room" },
  { n: "327", slug: "black-banarasi-pallu-saree-vintage-living-room" },
  { n: "328", slug: "lavender-zari-saree-mirror-selfie" },
  { n: "329", slug: "blush-floral-sequin-saree-luxury-lounge" },
  { n: "330", slug: "golden-hour-chiffon-saree-rooftop-pallu-wind" },
  { n: "331", slug: "kanjivaram-silk-saree-carved-stone-colonnade" },
  { n: "332", slug: "monsoon-chiffon-saree-rainy-balcony" },
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
    await upload(path.join(base, `${pair.slug}-after.webp`), `result-${pair.n}`);
    console.log(`${pair.n} ${pair.slug} OK`);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
