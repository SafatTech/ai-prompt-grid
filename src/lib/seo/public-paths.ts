import { explorePageCount } from "@/lib/catalog/explore-pages";

/** Unique `/styles/:slug` paths, first-seen order, skipping blanks. */
export function dedupedStylePaths(slugs: string[]): string[] {
  const seen = new Set<string>();
  const paths: string[] = [];
  for (const slug of slugs) {
    const trimmed = slug.trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    paths.push(`/styles/${trimmed}`);
  }
  return paths;
}

/** Paginated explore URLs after page 1. Page 1 is the static `/explore` entry. */
export function explorePaginationPaths(styleCount: number): string[] {
  const pages = explorePageCount(styleCount);
  const paths: string[] = [];
  for (let page = 2; page <= pages; page += 1) {
    paths.push(`/explore?page=${page}`);
  }
  return paths;
}
