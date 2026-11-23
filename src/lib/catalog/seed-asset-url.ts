/**
 * Canonical public catalog CDN. Seed modules fall back here when
 * NEXT_PUBLIC_SUPABASE_URL is unset so local/ISR builds still render images.
 *
 * When NEXT_PUBLIC_MEDIA_BASE_URL is set (Vercel Blob public base, no trailing
 * slash), catalog-public object paths are served from that host instead. DB
 * rows keep their stored Supabase URLs; this layer rewrites at read time.
 * Unset the env and redeploy to roll back to Supabase Storage.
 */
export const PUBLISHED_SUPABASE_URL =
  "https://rbmirzmppbytorbhncxj.supabase.co";

const CATALOG_PUBLIC_PATH = "/storage/v1/object/public/catalog-public/";

/** Published project prefix baked into many seed/DB rows. */
const PUBLISHED_CATALOG_PREFIX = `${PUBLISHED_SUPABASE_URL}${CATALOG_PUBLIC_PATH}`;

export function catalogPublicBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  return fromEnv || PUBLISHED_SUPABASE_URL;
}

/**
 * Optional Vercel Blob (or other) public media origin. Empty/unset = serve
 * from Supabase catalog-public exactly as before.
 */
export function catalogMediaBaseUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/$/, "");
}

function supabaseCatalogPrefixes(): string[] {
  const prefixes = [PUBLISHED_CATALOG_PREFIX];
  const fromEnv = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (fromEnv) {
    const envPrefix = `${fromEnv}${CATALOG_PUBLIC_PATH}`;
    if (envPrefix !== PUBLISHED_CATALOG_PREFIX) prefixes.push(envPrefix);
  }
  return prefixes;
}

/**
 * Rewrite a known Supabase catalog-public URL (or leave non-matching URLs alone).
 * Blob stores the object pathname only: .../catalog-public/seed/x.webp → {base}/seed/x.webp
 */
export function rewriteCatalogStorageUrl(url: string): string {
  if (!url) return url;
  const media = catalogMediaBaseUrl();
  if (!media) return url;

  for (const prefix of supabaseCatalogPrefixes()) {
    if (url.startsWith(prefix)) {
      return `${media}/${url.slice(prefix.length)}`;
    }
  }

  // Catch other supabase project hosts that still use the catalog-public bucket.
  const match = url.match(
    /^https?:\/\/[^/]+\.supabase\.co\/storage\/v1\/object\/public\/catalog-public\/(.+)$/i,
  );
  if (match?.[1]) return `${media}/${match[1]}`;

  return url;
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
  const objectPath = `seed/catalog/${folder}/${stem}.webp`;
  const media = catalogMediaBaseUrl();
  if (media) return `${media}/${objectPath}`;
  const base = catalogPublicBaseUrl();
  return `${base}${CATALOG_PUBLIC_PATH}${objectPath}`;
}

/**
 * Normalize any catalog image URL so wall cards and heroes always hit a
 * reachable asset. Site-relative `/catalog/{folder}/{file}` paths are rewritten
 * to the public catalog WebP. Absolute Supabase catalog-public URLs rewrite to
 * NEXT_PUBLIC_MEDIA_BASE_URL when set; other absolute URLs are left alone.
 */
export function resolveCatalogMediaUrl(url: string): string {
  if (!url) return url;

  if (/^https?:\/\//i.test(url)) {
    return rewriteCatalogStorageUrl(url);
  }

  const match = url.match(
    /^\/catalog\/(editorial|product|group|place|pet)\/([^/?#]+)$/i,
  );
  if (match) {
    const folder = match[1].toLowerCase() as
      | "editorial"
      | "product"
      | "group"
      | "place"
      | "pet";
    return seedCatalogAssetUrl(folder, match[2]);
  }

  const media = catalogMediaBaseUrl();
  if (media && !url.startsWith("/")) {
    return `${media}/${url.replace(/^\//, "")}`;
  }

  return url;
}
