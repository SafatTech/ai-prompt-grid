/**
 * Shared helpers for catalog asset upload scripts.
 * Prefer Vercel Blob when BLOB_READ_WRITE_TOKEN is set; otherwise Supabase.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { putCatalogObject } from "../../src/lib/catalog/put-catalog-object";
import { processUploadImage } from "../../src/lib/creations/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CatalogUploadClient = SupabaseClient<any>;

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

/** Supabase service client, or null when Blob token alone is enough for uploads. */
export function createCatalogUploadClient(): CatalogUploadClient | null {
  if (process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    // DB-updating scripts still need Supabase; upload-only scripts can skip it.
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    ) {
      return null;
    }
  }
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/**
 * Process a local image and put it at seed/catalog/editorial/{keyStem}.webp
 * (or the processed extension) via Blob or Supabase.
 */
export async function uploadEditorialAsset(input: {
  localPath: string;
  keyStem: string;
  mimeHint?: string;
  supabase?: CatalogUploadClient | null;
  /** Force .webp in the object key (guide WebP packages). */
  forceWebpKey?: boolean;
}): Promise<{ url: string; pathname: string; backend: "blob" | "supabase" }> {
  const mime = input.mimeHint ?? "image/webp";
  const fs = await import("node:fs");
  if (!fs.existsSync(input.localPath)) {
    throw new Error(`Missing ${input.localPath}`);
  }
  const processed = await processUploadImage(
    fs.readFileSync(input.localPath),
    mime,
  );
  if (!processed.ok) {
    throw new Error(`${input.localPath}: ${processed.error}`);
  }
  const ext = input.forceWebpKey ? "webp" : processed.image.ext;
  const pathname = `seed/catalog/editorial/${input.keyStem}.${ext}`;
  return putCatalogObject({
    pathname,
    body: processed.image.buffer,
    contentType: input.forceWebpKey ? "image/webp" : processed.image.contentType,
    supabase: input.supabase,
  });
}
