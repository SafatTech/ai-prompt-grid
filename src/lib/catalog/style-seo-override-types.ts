/** Code-level SEO + on-page copy for styles whose catalog fields live in Supabase. */
export type StyleGuideLink = {
  readonly href: string;
  readonly label: string;
};

export type StyleFaq = {
  readonly question: string;
  readonly answer: string;
};

export type StyleSeoOverride = {
  /** Document `<title>` (and default H1 when `h1` is omitted). Prefer ≤60 chars. */
  readonly title?: string;
  /** Meta description; replaces the catalog summary + boilerplate sentence. */
  readonly description?: string;
  /** Visible H1 when it should differ from `title`. */
  readonly h1?: string;
  /**
   * Unique on-page intro (plain text; paragraphs separated by blank lines).
   * Legacy GSC thin pages: replaces the catalog description near the H1.
   * Uniqueness enrichment pages: short line below the how-to block (not above
   * the main prompt).
   */
  readonly intro?: string;
  /** Short practical tips rendered on the style detail page. */
  readonly tips?: readonly string[];
  /** FAQ pairs for an on-page accordion + FAQPage JSON-LD. */
  readonly faqs?: readonly StyleFaq[];
  /**
   * Optional extra prompt line rendered in the left column (not in the prompt
   * box) with a small copy control. Does not change the main prompt or its
   * defaults.
   */
  readonly addonLine?: string;
  /** In-page links to related guides. */
  readonly guideLinks?: readonly StyleGuideLink[];
  /** Preferred related-style ids for the Related styles block (slugs unchanged). */
  readonly relatedStyleIds?: readonly string[];
};
