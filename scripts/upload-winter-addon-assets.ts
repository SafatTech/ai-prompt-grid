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
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { processUploadImage } from "../src/lib/creations/image";

const CATALOG_BUCKET = "catalog-public";

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
