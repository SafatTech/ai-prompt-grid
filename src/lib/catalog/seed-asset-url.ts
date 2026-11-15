/**
 * Canonical public catalog CDN. Seed modules fall back here when
 * NEXT_PUBLIC_SUPABASE_URL is unset so local/ISR builds still render images.
 */
export const PUBLISHED_SUPABASE_URL =
  "https://rbmirzmppbytorbhncxj.supabase.co";

export function catalogPublicBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  return fromEnv || PUBLISHED_SUPABASE_URL;
}

/**
 * Build a CDN URL for a seed asset filename in a catalog folder.
 * Always prefers `.webp` on catalog-public (upload scripts publish WebP).
 */
export function seedCatalogAssetUrl(
  folder: "editorial" | "product" | "group" | "place" | "pet",
  name: string,
): string {
  const stem = name.replace(/\.[^.]+$/, "");
  const base = catalogPublicBaseUrl();
  return `${base}/storage/v1/object/public/catalog-public/seed/catalog/${folder}/${stem}.webp`;
}

/**
 * Normalize any catalog image URL so wall cards and heroes always hit a
 * reachable asset. Site-relative `/catalog/{folder}/{file}` paths are rewritten
 * to the public catalog-public WebP. Absolute http(s) URLs are left alone.
 */
export function resolveCatalogMediaUrl(url: string): string {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  const match = url.match(
    /^\/catalog\/(editorial|product|group|place|pet)\/([^/?#]+)$/i,
  );
  if (!match) return url;
  const folder = match[1].toLowerCase() as
    | "editorial"
    | "product"
    | "group"
    | "place"
    | "pet";
  return seedCatalogAssetUrl(folder, match[2]);
}
