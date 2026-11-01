/**
 * Upload the approved Christmas WebPs (n 273-284) to catalog-public.
 *
 *   npx tsx --env-file=.env.local scripts/upload-christmas-assets.ts <extracted-archive-root>
 *
 * The root must contain style-pages/christmas.
 * Assets are uploaded only; they are never copied into this repository.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { processUploadImage } from "../src/lib/creations/image";

const CATALOG_BUCKET = "catalog-public";

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

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

async function main() {
  const archiveRoot = process.argv[2];
  if (!archiveRoot) {
    throw new Error("Pass the extracted archive root as the first argument");
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
