/**
 * Upload 1980s source/result masters to catalog-public as editorial 48–59 WebPs.
 *
 *   npx tsx --env-file=.env.local scripts/upload-80s-assets.ts [directory]
 *
 * Directory layout: before/<slug>-before.webp and after/<slug>-after.webp.
 * combine-two-photos-80s-couple uses before/<slug>-before-a.webp as the one source.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { processUploadImage } from "../src/lib/creations/image";

const CATALOG_BUCKET = "catalog-public";
const ROOT = path.resolve(import.meta.dirname, "..");

const pairs = [
  { n: "48", slug: "1985-studio-portrait" },
  { n: "49", slug: "80s-film-poster-lead" },
  { n: "50", slug: "1986-school-yearbook" },
  { n: "51", slug: "cassette-player-street-snapshot" },
  { n: "52", slug: "80s-aerobics-studio" },
  { n: "53", slug: "80s-bedroom-cassette" },
  { n: "54", slug: "1985-studio-couple" },
  { n: "55", slug: "80s-film-poster-couple" },
  { n: "56", slug: "disposable-camera-date-night" },
  { n: "57", slug: "mall-laser-backdrop-couple" },
  {
    n: "58",
    slug: "combine-two-photos-80s-couple",
    beforeName: "combine-two-photos-80s-couple-before-a.webp",
  },
  { n: "59", slug: "80s-wedding-album" },
] as const;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

async function main() {
  const dir = path.resolve(
    process.argv[2] ?? path.join(ROOT, "80s-ai-photo-prompts-solo-couple"),
  );
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const client = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  async function uploadOne(localPath: string, keyStem: string): Promise<string> {
    const input = fs.readFileSync(localPath);
    const processed = await processUploadImage(input, "image/webp");
    if (!processed.ok) throw new Error(`${localPath}: ${processed.error}`);
    const key = `seed/catalog/editorial/${keyStem}.${processed.image.ext}`;
    const { error } = await client.storage
      .from(CATALOG_BUCKET)
      .upload(key, processed.image.buffer, {
        contentType: processed.image.contentType,
        upsert: true,
      });
    if (error) throw new Error(`${key}: ${error.message}`);
    return client.storage.from(CATALOG_BUCKET).getPublicUrl(key).data.publicUrl;
  }

  for (const pair of pairs) {
    const beforeName =
      "beforeName" in pair ? pair.beforeName : `${pair.slug}-before.webp`;
    const sPath = path.join(dir, "before", beforeName);
    const rPath = path.join(dir, "after", `${pair.slug}-after.webp`);
    if (!fs.existsSync(sPath)) throw new Error(`Missing ${sPath}`);
    if (!fs.existsSync(rPath)) throw new Error(`Missing ${rPath}`);
    const sUrl = await uploadOne(sPath, `source-${pair.n}`);
    const rUrl = await uploadOne(rPath, `result-${pair.n}`);
    console.log(`${pair.n} ${pair.slug} OK`);
    console.log(`  ${sUrl}`);
    console.log(`  ${rUrl}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
