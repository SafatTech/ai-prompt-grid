/**
 * Upload Diwali source/result masters to catalog-public as editorial 36–47 WebPs.
 *
 *   npx tsx --env-file=.env.local scripts/upload-diwali-assets.ts
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { processUploadImage } from "../src/lib/creations/image";

const CATALOG_BUCKET = "catalog-public";
const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "diwali photo edit prompts");

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

function find(dir: string, matcher: (name: string) => boolean): string {
  const hit = fs.readdirSync(dir).find((name) => matcher(name));
  if (!hit) throw new Error(`Missing match in ${dir}`);
  return path.join(dir, hit);
}

const pairs = [
  {
    n: "36",
    s: (n: string) => /diya-lit balcony-source/i.test(n),
    r: (n: string) => /Diya-Lit Balcony-result/i.test(n),
  },
  {
    n: "37",
    s: (n: string) => /Finishing the rangoli together-source/i.test(n),
    r: (n: string) => /Finishing the Rangoli Together-result/i.test(n),
  },
  {
    n: "38",
    s: (n: string) => /First Diwali as a married couple-source/i.test(n),
    r: (n: string) => /First Diwali as a Married Couple-result/i.test(n),
  },
  {
    n: "39",
    s: (n: string) => /Only have separate photos Combine them-source/i.test(n),
    r: (n: string) => /Separate Photos Couple-result/i.test(n),
  },
  {
    n: "40",
    s: (n: string) => /Fairy-light portrait-source/i.test(n),
    r: (n: string) => /Fairy-Light Portrait-result/i.test(n),
  },
  {
    n: "41",
    s: (n: string) => /Golden-hour sparkler shot/i.test(n),
    r: (n: string) => /Golden-Hour Sparkler Shot-result/i.test(n),
  },
  {
    n: "42",
    s: (n: string) => /Kurta and Nehru jacket with lanterns-SOURCE/i.test(n),
    r: (n: string) => /Kurta and Nehru Jacket with Lanterns-result/i.test(n),
  },
  {
    n: "43",
    s: (n: string) => /Candid phuljhadi moment-source/i.test(n),
    r: (n: string) => /Candid Phuljhadi Moment-result/i.test(n),
  },
  {
    n: "44",
    s: (n: string) => /Family Lakshmi Puja photo-source/i.test(n),
    r: (n: string) => /Family Lakshmi Puja Photo-result/i.test(n),
  },
  {
    n: "45",
    s: (n: string) => /Baby.s first Diwali-source/i.test(n),
    r: (n: string) => /Baby.s First Diwali-result/i.test(n),
  },
  {
    n: "46",
    s: (n: string) => /Family Diwali in Karachi-source/i.test(n),
    r: (n: string) => /Family Diwali in Karachi or Sindh-result/i.test(n),
  },
  {
    n: "47",
    s: (n: string) => /Diaspora Diwali in a cold city-source/i.test(n),
    r: (n: string) => /Diaspora Diwali in a Cold City-result/i.test(n),
  },
] as const;

async function main() {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const client = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const srcDir = path.join(DIR, "source-images");
  const resDir = path.join(DIR, "result-images");

  async function uploadOne(localPath: string, keyStem: string): Promise<string> {
    const input = fs.readFileSync(localPath);
    const processed = await processUploadImage(input, "image/png");
    if (!processed.ok) throw new Error(`${localPath}: ${processed.error}`);
    const key = `seed/catalog/editorial/${keyStem}.${processed.image.ext}`;
    const { error } = await client.storage.from(CATALOG_BUCKET).upload(key, processed.image.buffer, {
      contentType: processed.image.contentType,
      upsert: true,
    });
    if (error) throw new Error(`${key}: ${error.message}`);
    return client.storage.from(CATALOG_BUCKET).getPublicUrl(key).data.publicUrl;
  }

  for (const pair of pairs) {
    const sPath = find(srcDir, pair.s);
    const rPath = find(resDir, pair.r);
    const sUrl = await uploadOne(sPath, `source-${pair.n}`);
    const rUrl = await uploadOne(rPath, `result-${pair.n}`);
    console.log(`${pair.n} OK`);
    console.log(`  ${sUrl}`);
    console.log(`  ${rUrl}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
