/** Code-level SEO + on-page copy for styles whose catalog fields live in Supabase. */
export type StyleGuideLink = {
  readonly href: string;
  readonly label: string;
};

export type StyleSeoOverride = {
  /** Document `<title>` (and default H1 when `h1` is omitted). Prefer ≤60 chars. */
  readonly title: string;
  /** Meta description; replaces the catalog summary + boilerplate sentence. */
  readonly description: string;
  /** Visible H1 when it should differ from `title`. */
  readonly h1?: string;
  /**
   * Unique on-page intro (plain text; paragraphs separated by blank lines).
   * Target ≥150 words so thin sibling pages can index separately.
   */
  readonly intro?: string;
  /** Short practical tips rendered under the intro. */
  readonly tips?: readonly string[];
  /** In-page links to related guides. */
  readonly guideLinks?: readonly StyleGuideLink[];
  /** Preferred related-style ids for the Related styles block (slugs unchanged). */
  readonly relatedStyleIds?: readonly string[];
};
