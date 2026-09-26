/**
 * Upload local /catalog/... style images into Supabase Storage (catalog-public)
 * and rewrite style_assets to public URLs (same pipeline as admin upload).
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/upload-catalog-assets.ts
 */
import fs from "node:fs";
import path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { processUploadImage } from "../src/lib/creations/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SeedClient = SupabaseClient<any>;

const CATALOG_BUCKET = "catalog-public";
const ROOT = path.resolve(import.meta.dirname, "..");

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

function isAlreadyRemote(url: string): boolean {
  if (!url) return false;
  if (/^https?:\/\//i.test(url) && url.includes("/storage/v1/object/public/catalog-public/")) {
    return true;
  }
  return false;
}

function localPathFromAssetUrl(url: string): string | null {
  if (!url) return null;
  if (url.startsWith("/catalog/")) {
    return path.join(ROOT, "public", url.replace(/^\//, ""));
  }
  // Allow already-absolute filesystem paths during debugging
  if (path.isAbsolute(url) && fs.existsSync(url)) return url;
  return null;
}

/** Stable storage key from public path, e.g. catalog/editorial/source-01.png → seed/catalog/editorial/source-01.webp */
function storageKeyFromLocalUrl(assetUrl: string, ext: string): string {
  const cleaned = assetUrl.replace(/^\//, "").replace(/\.[^.]+$/, "");
  return `seed/${cleaned}.${ext}`;
}

async function uploadLocalAsset(
  client: SeedClient,
  assetUrl: string,
  cache: Map<string, string>,
): Promise<string> {
  if (isAlreadyRemote(assetUrl)) return assetUrl;
  if (cache.has(assetUrl)) return cache.get(assetUrl)!;

  const localPath = localPathFromAssetUrl(assetUrl);
  if (!localPath) {
    throw new Error(`Cannot resolve local file for asset URL: ${assetUrl}`);
  }
  if (!fs.existsSync(localPath)) {
    throw new Error(`Missing local file: ${localPath}`);
  }

  const input = fs.readFileSync(localPath);
  const processed = await processUploadImage(input, "image/png");
  if (!processed.ok) {
    throw new Error(`${localPath}: ${processed.error}`);
  }

  const key = storageKeyFromLocalUrl(assetUrl, processed.image.ext);
  const { error: uploadError } = await client.storage
    .from(CATALOG_BUCKET)
    .upload(key, processed.image.buffer, {
      contentType: processed.image.contentType,
      upsert: true,
    });
  if (uploadError) {
    throw new Error(`Upload failed for ${key}: ${uploadError.message}`);
  }

  const { data } = client.storage.from(CATALOG_BUCKET).getPublicUrl(key);
  const publicUrl = data.publicUrl;
  cache.set(assetUrl, publicUrl);
  console.log(`Uploaded ${assetUrl} → ${key}`);
  return publicUrl;
}

async function ensureCatalogBucket(client: SeedClient) {
  const { data: buckets, error: listError } = await client.storage.listBuckets();
  if (listError) throw listError;
  const exists = (buckets ?? []).some((b) => b.name === CATALOG_BUCKET);
  if (exists) return;

  const { error: createError } = await client.storage.createBucket(CATALOG_BUCKET, {
    public: true,
    fileSizeLimit: "10MB",
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  });
  if (createError && !/already exists/i.test(createError.message)) {
    throw createError;
  }
  console.log(`Created storage bucket ${CATALOG_BUCKET}`);
}

async function main() {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const client: SeedClient = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  await ensureCatalogBucket(client);

  const { data: assets, error } = await client
    .from("style_assets")
    .select("id, style_id, kind, source_storage_key, result_storage_key");
  if (error) throw error;

  const cache = new Map<string, string>();
  let updatedRows = 0;
  let skippedRows = 0;

  for (const row of assets ?? []) {
    const sourceKey = String(row.source_storage_key || "");
    const resultKey = String(row.result_storage_key || "");
    const sourceNeeds = sourceKey && !isAlreadyRemote(sourceKey);
    const resultNeeds = resultKey && !isAlreadyRemote(resultKey);

    if (!sourceNeeds && !resultNeeds) {
      skippedRows += 1;
      continue;
    }

    const nextSource = sourceNeeds
      ? await uploadLocalAsset(client, sourceKey, cache)
      : sourceKey;
    const nextResult = resultNeeds
      ? await uploadLocalAsset(client, resultKey, cache)
      : resultKey;

    const { error: updateError } = await client
      .from("style_assets")
      .update({
        source_storage_key: nextSource,
        result_storage_key: nextResult,
      })
      .eq("id", row.id);
    if (updateError) throw updateError;
    updatedRows += 1;
  }

  console.log(
    `Done. Updated ${updatedRows} asset rows; skipped ${skippedRows} already remote; unique uploads ${cache.size}.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
