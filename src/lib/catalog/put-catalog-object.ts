import { put } from "@vercel/blob";
import type { SupabaseClient } from "@supabase/supabase-js";

export const CATALOG_PUBLIC_BUCKET = "catalog-public";

const BLOB_CACHE_CONTROL_MAX_AGE = 31_536_000;

export type PutCatalogObjectResult = {
  pathname: string;
  url: string;
  backend: "blob" | "supabase";
};

/**
 * Upload a catalog object. When BLOB_READ_WRITE_TOKEN is set, writes to the
 * public Vercel Blob store with the same pathname scheme as catalog-public
 * (no bucket prefix). Otherwise uploads to the Supabase catalog-public bucket.
 */
export async function putCatalogObject(input: {
  pathname: string;
  body: Buffer;
  contentType: string;
  /** Required when BLOB_READ_WRITE_TOKEN is unset. */
  supabase?: SupabaseClient | null;
}): Promise<PutCatalogObjectResult> {
  const pathname = input.pathname.replace(/^\//, "");
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();

  if (token) {
    const blob = await put(pathname, input.body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: input.contentType,
      cacheControlMaxAge: BLOB_CACHE_CONTROL_MAX_AGE,
      token,
    });
    return { pathname, url: blob.url, backend: "blob" };
  }

  if (!input.supabase) {
    throw new Error(
      "Supabase client is required when BLOB_READ_WRITE_TOKEN is unset.",
    );
  }

  const { error: uploadError } = await input.supabase.storage
    .from(CATALOG_PUBLIC_BUCKET)
    .upload(pathname, input.body, {
      contentType: input.contentType,
      upsert: true,
      cacheControl: String(BLOB_CACHE_CONTROL_MAX_AGE),
    });
  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = input.supabase.storage
    .from(CATALOG_PUBLIC_BUCKET)
    .getPublicUrl(pathname);
  return {
    pathname,
    url: data.publicUrl,
    backend: "supabase",
  };
}

export function prefersBlobCatalogUpload(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}
