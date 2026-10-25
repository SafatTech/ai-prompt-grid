/**
 * Upload the approved Stylish and Luxury Lifestyle WebPs to catalog-public.
 *
 *   npx tsx --env-file=.env.local scripts/upload-stylish-luxury-assets.ts <extracted-archive-root>
 *
 * The root must contain style-pages/stylish and style-pages/luxury-lifestyle.
 * Assets are uploaded only; they are never copied into this repository.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { processUploadImage } from "../src/lib/creations/image";

const CATALOG_BUCKET = "catalog-public";

type Pair = {
  n: string;
  batch: "stylish" | "luxury-lifestyle";
  slug: string;
  secondSource?: boolean;
};

const stylishSlugs = [
  "stylish-ai-photo-prompt-for-boys-daylight-street",
  "stylish-ai-photo-prompt-for-men-rooftop-blazer",
  "aesthetic-soft-light-ai-photo-prompt-for-boys",
  "black-suit-city-night-ai-photo-prompt-for-men",
  "handsome-boy-close-up-dp-ai-photo-prompt",
  "cool-editorial-low-angle-ai-photo-prompt-for-men",
  "modern-cafe-mirror-selfie-ai-photo-prompt-for-boys",
  "stylish-boy-outdoor-stairs-ai-photo-prompt",
  "men-suit-photoshoot-fashion-ai-photo-prompt",
  "free-stylish-editor-portrait-ai-photo-prompt",
  "stylish-girl-daylight-street",
  "cool-women-outdoor-editorial",
  "modern-girl-cafe-balcony",
  "stylish-girl-instagram-dp",
] as const;

const luxurySlugs = [
  "luxury-lifestyle-balcony-ai-photo-prompt",
  "black-suit-lobby-luxury-ai-photo-prompt-for-men",
  "dubai-skyline-balcony-luxury-ai-photo-prompt",
  "businessman-lifestyle-lounge-ai-photo-prompt",
  "luxury-life-cinematic-night-ai-photo-prompt",
  "old-money-aesthetic-portrait-ai-photo-prompt",
  "men-black-suit-three-quarter-ai-photo-prompt",
  "luxury-house-terrace-solo-ai-photo-prompt",
  "luxury-editorial-magazine-ai-photo-prompt",
  "quiet-luxury-couple-evening-walk-ai-photo-prompt",
  "quiet-luxury-terrace-women",
  "dubai-balcony-women-lifestyle",
  "old-money-garden-women",
] as const;

const pairs: Pair[] = [
  ...stylishSlugs.map((slug, index) => ({
    n: String(223 + index),
    batch: "stylish" as const,
    slug,
  })),
  ...luxurySlugs.map((slug, index) => ({
    n: String(237 + index),
    batch: "luxury-lifestyle" as const,
    slug,
    secondSource: index === 9,
  })),
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
    const base = path.resolve(archiveRoot, "style-pages", pair.batch, "webp");
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
