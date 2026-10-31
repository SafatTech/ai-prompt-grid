/**
 * Upload the approved Wedding Dresses WebPs (n 259-272) to catalog-public.
 *
 *   npx tsx --env-file=.env.local scripts/upload-wedding-dresses-assets.ts <extracted-archive-root>
 *
 * The root must contain style-pages/wedding-dresses.
 * Assets are uploaded only; they are never copied into this repository.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { processUploadImage } from "../src/lib/creations/image";

const CATALOG_BUCKET = "catalog-public";

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
