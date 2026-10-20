/**
 * Pre-generated WebP width ladder for Hobby (no Vercel /_next/image, no
 * Supabase /render/image). Variants live next to the original:
 *
 *   seed/catalog/editorial/result-01.webp
 *   seed/catalog/editorial/result-01.w360.webp
 *   seed/catalog/editorial/result-01.w540.webp
 *   …
 *
 * Local seed fallbacks use the same suffix under public/:
 *   /catalog/editorial/result-01.png → /catalog/editorial/result-01.w360.webp
 */

export const VARIANT_WIDTHS = [360, 540, 720, 1080] as const;
export type VariantWidth = (typeof VARIANT_WIDTHS)[number];

export const VARIANT_QUALITY = 70;

/** Matches a generated variant object key / URL path. */
export const VARIANT_SUFFIX_RE = /\.w(360|540|720|1080)\.webp$/;

export type VariantManifest = {
  version: 1;
  /** Widths the generator produces. */
  widths: number[];
  /**
   * Original object key (Supabase) or site-relative path (/catalog/…) →
   * widths that exist. Loader only rewrites when the key is present.
   */
  keys: Record<string, number[]>;
};

export function isVariantObjectKey(key: string): boolean {
  return VARIANT_SUFFIX_RE.test(key);
}

/** `seed/…/result-01.webp` + 360 → `seed/…/result-01.w360.webp` */
export function variantObjectKey(originalKey: string, width: number): string {
  const withoutExt = originalKey.replace(/\.[^.]+$/, "");
  return `${withoutExt}.w${width}.webp`;
}

/**
 * Nearest generated width at or above `requested`.
 * Falls back to the original (`null`) only when the request is larger than the
 * ladder max (1080) and a 1080 variant exists. If the source was too narrow to
 * produce every rung, use the largest available variant instead of the original
 * (originals are often multi‑MB PNGs).
 */
export function pickVariantWidth(
  requested: number,
  available: readonly number[],
): number | null {
  if (!Number.isFinite(requested) || requested <= 0 || available.length === 0) {
    return null;
  }
  const sorted = [...available].sort((a, b) => a - b);
  for (const width of sorted) {
    if (width >= requested) return width;
  }
  const largest = sorted[sorted.length - 1]!;
  const ladderMax = VARIANT_WIDTHS[VARIANT_WIDTHS.length - 1];
  if (requested > ladderMax && largest >= ladderMax) return null;
  return largest;
}

const CATALOG_PUBLIC_MARKER = "/storage/v1/object/public/catalog-public/";

export type CatalogImageRef =
  | { kind: "supabase"; origin: string; objectKey: string; src: string }
  | { kind: "local"; objectKey: string; src: string };

/** Parse a next/image `src` into a catalog-public or local /catalog|/guides ref. */
export function parseCatalogImageSrc(src: string): CatalogImageRef | null {
  if (!src) return null;

  // Absolute same-origin URLs (loader / currentSrc) → path only.
  let path = src;
  if (/^https?:\/\//i.test(src)) {
    try {
      const url = new URL(src);
      const idx = url.pathname.indexOf(CATALOG_PUBLIC_MARKER);
      if (idx !== -1) {
        const objectKey = decodeURIComponent(
          url.pathname.slice(idx + CATALOG_PUBLIC_MARKER.length),
        );
        if (!objectKey || isVariantObjectKey(objectKey)) return null;
        return {
          kind: "supabase",
          origin: url.origin,
          objectKey,
          src,
        };
      }
      path = url.pathname;
    } catch {
      return null;
    }
  }

  if (path.startsWith("/catalog/") || path.startsWith("/guides/")) {
    if (isVariantObjectKey(path)) return null;
    return { kind: "local", objectKey: path, src };
  }

  return null;
}

export function buildVariantSrc(ref: CatalogImageRef, width: number): string {
  const variantKey = variantObjectKey(ref.objectKey, width);
  if (ref.kind === "local") return variantKey;
  return `${ref.origin}${CATALOG_PUBLIC_MARKER}${variantKey}`;
}

/**
 * next/image custom loaders must encode `width` in the returned URL.
 * Stamp a harmless `w` query on pass-through originals (Supabase ignores it).
 */
export function stampLoaderWidth(src: string, width: number): string {
  if (VARIANT_SUFFIX_RE.test(src)) return src;
  try {
    if (/^https?:\/\//i.test(src)) {
      const url = new URL(src);
      url.searchParams.set("w", String(width));
      return url.href;
    }
  } catch {
    /* fall through */
  }
  const join = src.includes("?") ? "&" : "?";
  return `${src}${join}w=${width}`;
}

/**
 * Map a requested width to a CDN/public URL using the committed manifest.
 * Unknown / missing keys → original `src` (never 404 via the loader).
 */
export function resolveCatalogImageSrc(
  src: string,
  width: number,
  manifest: VariantManifest,
): string {
  const ref = parseCatalogImageSrc(src);
  if (!ref) return stampLoaderWidth(src, width);

  const available = manifest.keys[ref.objectKey];
  if (!available || available.length === 0) {
    return stampLoaderWidth(src, width);
  }

  const picked = pickVariantWidth(width, available);
  if (picked === null) return stampLoaderWidth(src, width);

  return buildVariantSrc(ref, picked);
}
