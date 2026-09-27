import { filterGroups } from "./styles";
import type { CatalogStyle } from "./types";

export type StyleSuggestionIndex = {
  id: string;
  title: string;
  category: string;
  subject: string;
};

export type SearchSuggestion =
  | {
      kind: "style";
      id: string;
      title: string;
      category: string;
      subject: string;
      href: string;
    }
  | {
      kind: "category";
      value: string;
      href: string;
    }
  | {
      kind: "subject";
      value: string;
      href: string;
    }
  | {
      kind: "search";
      value: string;
      href: string;
    };

const MAX_STYLES = 5;
const MAX_FACETS = 3;

function scoreMatch(haystack: string, query: string): number {
  const h = haystack.toLowerCase();
  const q = query.toLowerCase();
  if (!q) return 0;
  if (h === q) return 100;
  if (h.startsWith(q)) return 80;
  const idx = h.indexOf(q);
  if (idx === 0) return 80;
  if (idx > 0) return 50 - Math.min(idx, 30);
  return 0;
}

export function toSuggestionIndex(styles: CatalogStyle[]): StyleSuggestionIndex[] {
  return styles
    .filter((style) => style.status === "published")
    .map((style) => ({
      id: style.id,
      title: style.title,
      category: style.category,
      subject: style.subject,
    }));
}

export function buildSearchSuggestions(
  query: string,
  styles: StyleSuggestionIndex[],
): SearchSuggestion[] {
  const q = query.trim();
  const suggestions: SearchSuggestion[] = [];

  if (!q) {
    for (const value of filterGroups.category.slice(0, 6)) {
      suggestions.push({
        kind: "category",
        value,
        href: `/explore?category=${encodeURIComponent(value)}`,
      });
    }
    return suggestions;
  }

  const categoryHits = filterGroups.category
    .map((value) => ({ value, score: scoreMatch(value, q) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_FACETS);

  for (const hit of categoryHits) {
    suggestions.push({
      kind: "category",
      value: hit.value,
      href: `/explore?category=${encodeURIComponent(hit.value)}`,
    });
  }

  const subjectHits = filterGroups.subject
    .map((value) => ({ value, score: scoreMatch(value, q) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_FACETS);

  for (const hit of subjectHits) {
    suggestions.push({
      kind: "subject",
      value: hit.value,
      href: `/explore?subject=${encodeURIComponent(hit.value)}`,
    });
  }

  const styleHits = styles
    .map((style) => {
      const titleScore = scoreMatch(style.title, q) * 2;
      const categoryScore = scoreMatch(style.category, q);
      const subjectScore = scoreMatch(style.subject, q);
      return {
        style,
        score: Math.max(titleScore, categoryScore, subjectScore),
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.style.title.localeCompare(b.style.title))
    .slice(0, MAX_STYLES);

  for (const hit of styleHits) {
    suggestions.push({
      kind: "style",
      id: hit.style.id,
      title: hit.style.title,
      category: hit.style.category,
      subject: hit.style.subject,
      href: `/styles/${hit.style.id}`,
    });
  }

  const exactCategory = filterGroups.category.some(
    (value) => value.toLowerCase() === q.toLowerCase(),
  );
  if (!exactCategory) {
    suggestions.push({
      kind: "search",
      value: q,
      href: `/explore?q=${encodeURIComponent(q)}`,
    });
  }

  return suggestions;
}
