"use client";

import {
  resolveCatalogImageSrc,
  type VariantManifest,
} from "@/lib/images/variant-config";
import manifestJson from "@/lib/images/variant-manifest.json";

const manifest = manifestJson as VariantManifest;

/**
 * Custom next/image loader used when NEXT_PUBLIC_VERCEL_IMAGE_OPT is not "1".
 * Rewrites catalog-public (and local /catalog|/guides) srcs to pre-generated
 * `.w{width}.webp` variants from the committed manifest. Other URLs pass through.
 * Does not use Vercel /_next/image or Supabase /render/image.
 */
export default function supabaseImageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  return resolveCatalogImageSrc(src, width, manifest);
}
