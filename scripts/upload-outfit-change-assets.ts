/**
 * Upload the approved Outfit Change WebPs (285-296) to catalog-public.
 *
 *   npx tsx --env-file=.env.local scripts/upload-outfit-change-assets.ts <package-root>
 *
 * The root must contain webp/<slug>-before.webp and webp/<slug>-after.webp.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { processUploadImage } from "../src/lib/creations/image";

const CATALOG_BUCKET = "catalog-public";

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
