/**
 * Replace wedding (84) and mountain (86) before photos in catalog-public.
 *
 *   npx tsx --env-file=.env.local scripts/upload-merge-guide-inputs.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BUCKET = "catalog-public";
const DIR = path.join(ROOT, "public/guides/how-to-merge-two-photos-in-gemini");

const files = [
  { local: "wedding-stage-input-man.webp", key: "seed/catalog/editorial/source-84.webp" },
  { local: "wedding-stage-input-woman.webp", key: "seed/catalog/editorial/source-84b.webp" },
  { local: "mountain-viewpoint-input-man.webp", key: "seed/catalog/editorial/source-86.webp" },
  {
    local: "mountain-viewpoint-input-woman.webp",
    key: "seed/catalog/editorial/source-86b.webp",
  },
];

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

async function main() {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const client = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  for (const file of files) {
    const localPath = path.join(DIR, file.local);
    if (!fs.existsSync(localPath)) throw new Error(`Missing ${localPath}`);
    const body = fs.readFileSync(localPath);
    const { error } = await client.storage.from(BUCKET).upload(file.key, body, {
      contentType: "image/webp",
      upsert: true,
    });
    if (error) throw new Error(`${file.key}: ${error.message}`);
    const publicUrl = client.storage.from(BUCKET).getPublicUrl(file.key).data.publicUrl;
    console.log(`OK ${file.key}`);
    console.log(`   ${publicUrl}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
