/**
 * Date-driven festival seasons for the homepage banner and hero chips.
 * Dates use Asia/Karachi calendar days (ISO YYYY-MM-DD).
 * Movable festival dates must be checked each year.
 * Note: Eid dates below are approximate.
 *
 * When windows overlap, `activeSeason` prefers the shortest (most specific) match.
 */

export type SeasonTheme = "amber" | "rose" | "emerald" | "indigo";

export type SeasonChip = {
  label: string;
  /** Explore search query for this chip. */
  q: string;
  icon: "couple" | "family" | "sparkle";
};

export type Season = {
  id: string;
  start: string;
  end: string;
  /** Festival day used for the countdown line (Asia/Karachi). */
  festivalDate: string;
  eyebrow: string;
  heroEyebrow: string;
  title: string;
  body: string;
  ctaGuide?: string;
  ctaCategoryQuery: string;
  styleSlugs: string[];
  /** Short labels for featured style links (slug → label). */
  styleLabels?: Record<string, string>;
  chips?: SeasonChip[];
  heroChip: string;
  popularQueries: string[];
  next?: string;
  theme: SeasonTheme;
};

export const SEASONS: Season[] = [
  {
    id: "diwali-2026",
    start: "2026-10-05",
    end: "2026-11-09",
    festivalDate: "2026-11-08",
    theme: "amber",
    eyebrow: "FESTIVAL COLLECTION · DIWALI 2026",
    heroEyebrow: "Diwali 2026 prompts are live",
    title: "Diwali looks, ready before Nov 8",
    body: "Diya-lit balconies, rangoli with family, and sparkler couple shots. Tested prompts that keep your real face.",
    ctaGuide: "/guides/diwali-couple-ai-photo-editing-prompts",
    ctaCategoryQuery: "Diwali",
    styleSlugs: [
      "diya-lit-balcony",
      "finishing-the-rangoli-together",
      "first-diwali-as-a-married-couple",
      "golden-hour-sparkler-shot",
      "babys-first-diwali",
    ],
    styleLabels: {
      "diya-lit-balcony": "Diya-lit balcony",
      "finishing-the-rangoli-together": "Rangoli together",
      "first-diwali-as-a-married-couple": "First Diwali, married",
      "golden-hour-sparkler-shot": "Golden-hour sparkler",
      "babys-first-diwali": "Baby's first Diwali",
    },
    chips: [
      { label: "Couple", q: "Diwali couple", icon: "couple" },
      { label: "Family", q: "Diwali family", icon: "family" },
      { label: "Rangoli", q: "Diwali rangoli", icon: "sparkle" },
    ],
    heroChip: "Diwali",
    popularQueries: [
      "Diwali couple",
      "Shaadi",
      "Eid family",
      "LinkedIn",
      "Ghibli",
      "80s retro",
    ],
    next: "Wedding season",
  },
  {
    id: "halloween-2026",
    // Short window inside Diwali — activeSeason prefers the shortest match.
    start: "2026-10-24",
    end: "2026-10-31",
    festivalDate: "2026-10-31",
    theme: "indigo",
    eyebrow: "SEASONAL · HALLOWEEN 2026",
    heroEyebrow: "Halloween looks are live",
    title: "Halloween portraits, ready for the night",
    body: "Pumpkin-patch warmth, witch glow, and costume looks that still keep your real face.",
    ctaGuide: "/guides/halloween-ai-prompts-for-selfies",
    ctaCategoryQuery: "Halloween",
    styleSlugs: [
      "cozy-pumpkin-patch-portrait",
      "recognizable-zombie-portrait",
      "friendly-glowing-witch-portrait",
      "elegant-gothic-vampire-portrait",
      "skeleton-face-paint-portrait",
    ],
    styleLabels: {
      "cozy-pumpkin-patch-portrait": "Pumpkin patch",
      "recognizable-zombie-portrait": "Zombie portrait",
      "friendly-glowing-witch-portrait": "Glowing witch",
      "elegant-gothic-vampire-portrait": "Gothic vampire",
      "skeleton-face-paint-portrait": "Skeleton face paint",
    },
    chips: [
      { label: "Pumpkin", q: "Halloween pumpkin", icon: "sparkle" },
      { label: "Costume", q: "Halloween", icon: "sparkle" },
      { label: "Couple", q: "Couple", icon: "couple" },
    ],
    heroChip: "Halloween",
    popularQueries: [
      "Halloween",
      "Couple",
      "Family",
      "LinkedIn",
      "Ghibli",
      "80s retro",
    ],
    next: "Diwali",
  },
  {
    id: "wedding-2026-a",
    start: "2026-11-10",
    end: "2026-12-14",
    festivalDate: "2026-12-01",
    theme: "rose",
    eyebrow: "WEDDING SEASON · 2026–27",
    heroEyebrow: "Shaadi season prompts are live",
    title: "Shaadi season: mehndi, baraat, walima",
    body: "Couple and family looks for mehndi nights, baraat mornings, and walima portraits — keep every face recognizable.",
    ctaGuide: "/guides/wedding-dress-ai-photo-prompts",
    ctaCategoryQuery: "wedding",
    styleSlugs: [
      "red-bridal-lehenga",
      "couple-wedding-outfits",
      "ivory-sherwani",
    ],
    heroChip: "Shaadi",
    popularQueries: [
      "Shaadi",
      "Couple",
      "Walima",
      "LinkedIn",
      "Ghibli",
      "80s retro",
    ],
    next: "Christmas",
  },
  {
    id: "christmas-2026",
    start: "2026-12-15",
    end: "2026-12-26",
    festivalDate: "2026-12-25",
    theme: "rose",
    eyebrow: "FESTIVAL COLLECTION · CHRISTMAS 2026",
    heroEyebrow: "Christmas prompts are live",
    title: "Christmas looks for couples, kids, and family",
    body: "Tree nights, gift exchanges, and fireside portraits — tested prompts that keep every face true.",
    ctaGuide: "/guides/christmas-ai-photo-prompts",
    ctaCategoryQuery: "Christmas",
    styleSlugs: [
      "christmas-couple-photo-ai-prompt-decorating-the-tree",
      "ai-christmas-photo-prompt-for-couples-gift-exchange",
      "christmas-family-photoshoot-ai-prompt-tree-and-gifts",
      "christmas-baby-photoshoot-ai-prompt-gift-boxes",
      "viral-christmas-ai-photo-trend-prompt-giant-ornament",
    ],
    styleLabels: {
      "christmas-couple-photo-ai-prompt-decorating-the-tree": "Decorating the tree",
      "ai-christmas-photo-prompt-for-couples-gift-exchange": "Gift exchange",
      "christmas-family-photoshoot-ai-prompt-tree-and-gifts": "Family by the tree",
      "christmas-baby-photoshoot-ai-prompt-gift-boxes": "Baby & gift boxes",
      "viral-christmas-ai-photo-trend-prompt-giant-ornament": "Giant ornament",
    },
    chips: [
      { label: "Couple", q: "Christmas couple", icon: "couple" },
      { label: "Family", q: "Christmas family", icon: "family" },
      { label: "Kids", q: "Christmas kids", icon: "sparkle" },
    ],
    heroChip: "Christmas",
    popularQueries: [
      "Christmas",
      "Couple",
      "Family",
      "LinkedIn",
      "Ghibli",
      "80s retro",
    ],
    next: "New Year",
  },
  {
    id: "new-year-2027",
    start: "2026-12-27",
    end: "2027-01-03",
    festivalDate: "2027-01-01",
    theme: "indigo",
    eyebrow: "SEASONAL · NEW YEAR 2027",
    heroEyebrow: "New Year looks are live",
    title: "New Year portraits for the first toast",
    body: "Festive couple and family frames for the turn of the year — keep every face recognizable.",
    ctaCategoryQuery: "festive",
    styleSlugs: [
      "christmas-couple-photo-ai-prompt-decorating-the-tree",
      "christmas-family-photoshoot-ai-prompt-tree-and-gifts",
      "ai-christmas-photo-prompt-for-couples-gift-exchange",
    ],
    styleLabels: {
      "christmas-couple-photo-ai-prompt-decorating-the-tree": "Festive couple",
      "christmas-family-photoshoot-ai-prompt-tree-and-gifts": "Festive family",
      "ai-christmas-photo-prompt-for-couples-gift-exchange": "Gift moment",
    },
    chips: [
      { label: "Couple", q: "Couple", icon: "couple" },
      { label: "Family", q: "Family", icon: "family" },
      { label: "Festive", q: "festive", icon: "sparkle" },
    ],
    heroChip: "Festive",
    popularQueries: [
      "Couple",
      "Family",
      "Shaadi",
      "LinkedIn",
      "Ghibli",
      "80s retro",
    ],
    next: "Wedding season",
  },
  {
    id: "wedding-2026-b",
    start: "2027-01-04",
    end: "2027-01-31",
    festivalDate: "2027-01-15",
    theme: "rose",
    eyebrow: "WEDDING SEASON · 2026–27",
    heroEyebrow: "Shaadi season prompts are live",
    title: "Shaadi season: mehndi, baraat, walima",
    body: "Couple and family looks for mehndi nights, baraat mornings, and walima portraits — keep every face recognizable.",
    ctaGuide: "/guides/wedding-dress-ai-photo-prompts",
    ctaCategoryQuery: "wedding",
    styleSlugs: [
      "red-bridal-lehenga",
      "couple-wedding-outfits",
      "ivory-sherwani",
    ],
    heroChip: "Shaadi",
    popularQueries: [
      "Shaadi",
      "Couple",
      "Walima",
      "LinkedIn",
      "Ghibli",
      "80s retro",
    ],
    next: "Ramadan & Eid",
  },
  {
    id: "ramadan-eid-2027",
    // Ends before Holi so Eid never hides the Holi window.
    start: "2027-02-01",
    end: "2027-03-09",
    festivalDate: "2027-03-10",
    theme: "emerald",
    eyebrow: "FESTIVAL COLLECTION · EID UL-FITR 2027",
    heroEyebrow: "Eid family prompts are live",
    title: "Eid ul-Fitr family portraits",
    body: "Family frames, festive outfits, and merge looks for the people who could not stand in one photo.",
    ctaGuide: "/guides/how-to-merge-two-photos-in-gemini",
    ctaCategoryQuery: "Eid",
    styleSlugs: [
      "eid-family-frame-merge-two-photos-prompt-gemini-family",
      "grandparent-and-grandchild-courtyard-merge-two-photos-prompt-gemini-family",
      "add-missing-person-to-group-photo-merge-two-photos-prompt-gemini-family",
    ],
    heroChip: "Eid",
    popularQueries: [
      "Eid family",
      "Family",
      "Shaadi",
      "LinkedIn",
      "Ghibli",
      "80s retro",
    ],
    next: "Holi",
  },
  {
    id: "holi-2027",
    start: "2027-03-10",
    end: "2027-03-23",
    festivalDate: "2027-03-22",
    theme: "rose",
    eyebrow: "FESTIVAL COLLECTION · HOLI 2027",
    heroEyebrow: "Holi 2027 prompts are live",
    title: "Holi colour looks, ready for the day",
    body: "Bright powder, joyful couples, and candid family shots that keep skin tone and faces true.",
    ctaCategoryQuery: "Holi",
    styleSlugs: [],
    heroChip: "Holi",
    popularQueries: [
      "Holi",
      "Couple",
      "Family",
      "LinkedIn",
      "Ghibli",
      "80s retro",
    ],
    next: "Eid ul-Adha",
  },
  {
    id: "eid-adha-2027",
    start: "2027-05-05",
    end: "2027-05-19",
    festivalDate: "2027-05-17",
    theme: "emerald",
    eyebrow: "FESTIVAL COLLECTION · EID UL-ADHA 2027",
    heroEyebrow: "Eid ul-Adha prompts are live",
    title: "Eid ul-Adha family portraits",
    body: "Gathering looks and merge frames for the family photos you want to keep.",
    ctaCategoryQuery: "Eid",
    styleSlugs: ["eid-family-frame-merge-two-photos-prompt-gemini-family"],
    heroChip: "Eid",
    popularQueries: [
      "Eid family",
      "Family",
      "Couple",
      "LinkedIn",
      "Ghibli",
      "80s retro",
    ],
    next: "Independence season",
  },
  {
    id: "independence-2027",
    start: "2027-08-01",
    end: "2027-08-16",
    festivalDate: "2027-08-14",
    theme: "indigo",
    eyebrow: "SEASONAL · 14 & 15 AUGUST",
    heroEyebrow: "14 & 15 August portraits are live",
    title: "14 & 15 August portraits",
    body: "Flag-day and green looks for solo and family photos, with faces kept recognizable.",
    ctaCategoryQuery: "August",
    styleSlugs: [],
    heroChip: "August",
    popularQueries: [
      "August",
      "Family",
      "Couple",
      "LinkedIn",
      "Ghibli",
      "80s retro",
    ],
    next: "Diwali",
  },
  {
    id: "diwali-2027",
    // Diwali night ~29 Oct 2027; ~4-week prep window.
    start: "2027-10-01",
    end: "2027-11-05",
    festivalDate: "2027-10-29",
    theme: "amber",
    eyebrow: "FESTIVAL COLLECTION · DIWALI 2027",
    heroEyebrow: "Diwali 2027 prompts are live",
    title: "Diwali looks, ready before Oct 29",
    body: "Diya-lit balconies, rangoli with family, and sparkler couple shots. Tested prompts that keep your real face.",
    ctaGuide: "/guides/diwali-couple-ai-photo-editing-prompts",
    ctaCategoryQuery: "Diwali",
    styleSlugs: [
      "diya-lit-balcony",
      "finishing-the-rangoli-together",
      "first-diwali-as-a-married-couple",
      "golden-hour-sparkler-shot",
      "babys-first-diwali",
    ],
    styleLabels: {
      "diya-lit-balcony": "Diya-lit balcony",
      "finishing-the-rangoli-together": "Rangoli together",
      "first-diwali-as-a-married-couple": "First Diwali, married",
      "golden-hour-sparkler-shot": "Golden-hour sparkler",
      "babys-first-diwali": "Baby's first Diwali",
    },
    chips: [
      { label: "Couple", q: "Diwali couple", icon: "couple" },
      { label: "Family", q: "Diwali family", icon: "family" },
      { label: "Rangoli", q: "Diwali rangoli", icon: "sparkle" },
    ],
    heroChip: "Diwali",
    popularQueries: [
      "Diwali couple",
      "Shaadi",
      "Eid family",
      "LinkedIn",
      "Ghibli",
      "80s retro",
    ],
    next: "Wedding season",
  },
];

/** Fallback Popular chips when no season is active (also used by chip search tests). */
export const DEFAULT_POPULAR_QUERIES = [
  "Diwali couple",
  "Shaadi",
  "Eid family",
  "LinkedIn",
  "Ghibli",
  "80s retro",
] as const;

const DEFAULT_POPULAR: string[] = [...DEFAULT_POPULAR_QUERIES];

/** Calendar date string in Asia/Karachi for comparison with season ISO dates. */
export function karachiDateString(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Inclusive calendar-day length of a season window (Asia/Karachi ISO dates). */
export function seasonWindowDays(season: Season): number {
  const start = Date.parse(`${season.start}T00:00:00+05:00`);
  const end = Date.parse(`${season.end}T00:00:00+05:00`);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return Number.POSITIVE_INFINITY;
  return Math.round((end - start) / 86_400_000) + 1;
}

/**
 * Active season for a Karachi calendar day.
 * When several windows match, pick the shortest (most specific) one —
 * e.g. Halloween inside the wider Diwali window.
 */
export function activeSeason(now = new Date()): Season | null {
  const today = karachiDateString(now);
  const matching = SEASONS.filter(
    (season) => season.start <= today && today <= season.end,
  );
  if (matching.length === 0) return null;
  if (matching.length === 1) return matching[0]!;
  return matching.reduce((best, season) =>
    seasonWindowDays(season) < seasonWindowDays(best) ? season : best,
  );
}

export function popularQueriesForSeason(season: Season | null): string[] {
  return season?.popularQueries?.length ? season.popularQueries : DEFAULT_POPULAR;
}

/** Whole days from today (Karachi) until festivalDate; 0 on the day, null if past. */
export function daysUntilFestival(season: Season, now = new Date()): number | null {
  const today = karachiDateString(now);
  if (today > season.festivalDate) return null;
  const start = Date.parse(`${today}T00:00:00+05:00`);
  const end = Date.parse(`${season.festivalDate}T00:00:00+05:00`);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
  return Math.max(0, Math.round((end - start) / 86_400_000));
}

/** Short weekday + month day in Asia/Karachi, e.g. "Sun, Nov 8". */
export function formatFestivalDay(festivalDate: string): string {
  const date = new Date(`${festivalDate}T12:00:00+05:00`);
  if (!Number.isFinite(date.getTime())) return festivalDate;
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Karachi",
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function styleLabelForSeason(season: Season, styleId: string, fallbackTitle: string): string {
  return season.styleLabels?.[styleId] ?? fallbackTitle;
}
