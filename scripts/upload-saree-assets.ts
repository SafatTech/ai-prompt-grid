/**
 * Upload the approved Saree / Sari guide WebPs (316-332) to catalog-public.
 *
 *   npx tsx --env-file=.env.local scripts/upload-saree-assets.ts <package-root>
 *
 * The root must contain webp/<slug>-before.webp and webp/<slug>-after.webp.
 * Assets for this guide are already uploaded; do not run this in CI.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { processUploadImage } from "../src/lib/creations/image";

const CATALOG_BUCKET = "catalog-public";

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

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

async function main() {
  const archiveRoot = process.argv[2];
  if (!archiveRoot) {
    throw new Error("Pass the package root as the first argument");
  }

  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const client = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  async function upload(localPath: string, keyStem: string): Promise<void> {
    if (!fs.existsSync(localPath)) throw new Error(`Missing ${localPath}`);
    const processed = await processUploadImage(fs.readFileSync(localPath), "image/webp");
    if (!processed.ok) throw new Error(`${localPath}: ${processed.error}`);

    const key = `seed/catalog/editorial/${keyStem}.webp`;
    const { error } = await client.storage
      .from(CATALOG_BUCKET)
      .upload(key, processed.image.buffer, {
        contentType: "image/webp",
        cacheControl: "31536000",
        upsert: true,
      });
    if (error) throw new Error(`${key}: ${error.message}`);
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
