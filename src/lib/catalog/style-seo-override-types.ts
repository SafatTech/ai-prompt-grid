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
   * Shown after the catalog description when FAQs/addon enrichment is present;
   * otherwise replaces the catalog description (legacy GSC thin-page pattern).
   */
  readonly intro?: string;
  /** Short practical tips rendered on the style detail page. */
  readonly tips?: readonly string[];
  /** FAQ pairs for an on-page accordion + FAQPage JSON-LD. */
  readonly faqs?: readonly StyleFaq[];
  /**
   * Optional extra prompt line shown in an “Optional add-on” card with its own
   * copy control. Does not change the main prompt or its defaults.
   */
  readonly addonLine?: string;
  /** In-page links to related guides. */
  readonly guideLinks?: readonly StyleGuideLink[];
  /** Preferred related-style ids for the Related styles block (slugs unchanged). */
  readonly relatedStyleIds?: readonly string[];
};
