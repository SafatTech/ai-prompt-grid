import { resolveCatalogMediaUrl } from "@/lib/catalog/seed-asset-url";
import type { Guide } from "@/lib/guides/load";
import { resolveGuideSocialImage } from "@/lib/guides/prepare";

/** Slim related-guide card — never ship markdown `body` to the client. */
export type RelatedGuideCard = {
  slug: string;
  heading: string;
  description: string;
  date: string;
  imageUrl: string;
  imageAlt: string;
  hasRealImage: boolean;
};

export function toRelatedGuideCard(guide: Guide): RelatedGuideCard {
  const image = resolveGuideSocialImage(guide);
  const imageUrl = resolveCatalogMediaUrl(image.url);
  return {
    slug: guide.slug,
    heading: guide.heading,
    description: guide.description,
    date: guide.date,
    imageUrl,
    imageAlt: image.alt,
    hasRealImage: Boolean(guide.ogImage) || imageUrl !== "/opengraph-image",
  };
}
