/**
 * Offline authoring for unique per-style Best for data.
 * Output: src/lib/catalog/style-best-for-data.ts
 *
 * Run: npx tsx scripts/author-unique-best-for.mts
 */
import fs from "node:fs";
import path from "node:path";
import { worksWithForStyle } from "../src/lib/catalog/style-best-for";
import { getPublishedStyles } from "../src/lib/catalog/styles";
import { STYLE_SEO_OVERRIDES } from "../src/lib/catalog/style-meta";
import type { CatalogStyle } from "../src/lib/catalog/types";

const OUT = path.join(process.cwd(), "src/lib/catalog/style-best-for-data.ts");

const STOP = new Set(
  [
    "the", "a", "an", "and", "or", "of", "on", "in", "into", "with", "for", "from",
    "your", "you", "to", "as", "at", "by", "is", "are", "be", "this", "that", "one",
    "two", "photo", "photos", "portrait", "portraits", "ai", "prompt", "prompts",
    "free", "gemini", "chatgpt", "copy", "paste", "edit", "editing", "style",
    "look", "looks", "image", "images", "using", "keep", "keeps", "made", "create",
    "creating", "upload", "uploaded", "clear", "both", "each", "their", "them",
  ],
);

function words(s: string): string[] {
  return s.split(/\s+/).filter(Boolean);
}
function wc(s: string): number {
  return words(s).length;
}
function clamp(s: string, max: number): string {
  const w = words(s);
  return w.length <= max ? w.join(" ") : w.slice(0, max).join(" ").replace(/[,:;]+$/, "");
}
function lowerFirst(s: string): string {
  return s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}
function upperFirst(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
function dedupeAdj(s: string): string {
  const out: string[] = [];
  for (const w of words(s)) {
    if (out.length && out[out.length - 1]!.toLowerCase() === w.toLowerCase()) continue;
    out.push(w);
  }
  return out.join(" ");
}
function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function stemNear(s: string): string {
  // Avoid near-duplicates that differ by only a trailing word.
  return words(norm(s)).slice(0, 4).join(" ");
}

function softCase(s: string): string {
  const proper = new Set([
    "diwali",
    "christmas",
    "halloween",
    "eid",
    "linkedin",
    "instagram",
    "cv",
    "id",
    "3d",
  ]);
  return words(s)
    .map((w, i) => {
      const lower = w.toLowerCase();
      if (proper.has(lower)) {
        if (lower === "3d") return "3D";
        if (lower === "cv") return "CV";
        if (lower === "id") return "ID";
        if (lower === "linkedin") return "LinkedIn";
        if (lower === "instagram") return "Instagram";
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      }
      if (i === 0) return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
      // keep leading "80s"
      if (/^\d/.test(w)) return w;
      return lower;
    })
    .join(" ");
}

function keywords(text: string, max = 5): string {
  const raw = text
    .replace(/[()[\]|:·]/g, " ")
    .replace(/[-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const picked: string[] = [];
  for (const w of words(raw)) {
    const clean = w.replace(/[^a-zA-Z0-9']/g, "");
    if (!clean || clean.length < 3) continue;
    if (STOP.has(clean.toLowerCase())) continue;
    if (picked.some((p) => p.toLowerCase() === clean.toLowerCase())) continue;
    picked.push(clean);
    if (picked.length >= max) break;
  }
  return picked.join(" ");
}

function lookFromTitle(title: string): string {
  const paren = /\(([^)]+)\)/.exec(title);
  if (
    paren?.[1] &&
    paren[1].trim().length >= 5 &&
    !/copy-?paste|free|gemini|chatgpt|trending/i.test(paren[1])
  ) {
    return keywords(paren[1], 5) || paren[1].trim();
  }
  const cleaned = title
    .replace(/\([^)]*\)/g, " ")
    .replace(/\bAI\s+Photo\s+Prompt\b/gi, " ")
    .replace(/\bAI\s+Prompt\b/gi, " ")
    .replace(/\bPhoto\s+Prompt\b/gi, " ")
    .replace(/\bPhoto\s+Editing\s+Prompt\b/gi, " ")
    .replace(/\bPrompt\b/gi, " ")
    .replace(/\b(Copy-?Paste|Free|Gemini|ChatGPT|Trending|Viral)\b/gi, " ")
    .replace(/\bfor\s+(Boys?|Girls?|Men|Women|Couples?)\b/gi, " ");
  return keywords(cleaned, 5) || cleaned.replace(/\s+/g, " ").trim();
}

function hayOf(style: CatalogStyle): string {
  return [style.id, style.title, style.note, style.description, style.targetSourcePhoto]
    .join("\n")
    .toLowerCase();
}

type Theme =
  | "diwali"
  | "christmas"
  | "halloween"
  | "eid"
  | "birthday"
  | "wedding"
  | "winter"
  | "linkedin"
  | "anime"
  | "retro80s"
  | "boys"
  | "luxury"
  | "outfit"
  | "product"
  | "pet"
  | "travel"
  | "couple"
  | "family"
  | "fantasy"
  | "vintage"
  | "painting"
  | "avatar"
  | "cinematic"
  | "professional"
  | "stylish"
  | "general";

function themeOf(style: CatalogStyle, hay: string): Theme {
  if (/\bdiwali\b|\bdiya\b|\brangoli\b|\bphuljhadi\b/.test(hay)) return "diwali";
  if (/\bchristmas\b|\bxmas\b|\bornament\b|\bholiday glam\b/.test(hay)) return "christmas";
  if (/\bhalloween\b|\bzombie\b|\bvampire\b/.test(hay)) return "halloween";
  if (/\beid\b/.test(hay)) return "eid";
  if (/\bbirthday\b|\bcake smash\b/.test(hay)) return "birthday";
  if (/\bwedding\b|\bbridal\b|\bwali?ma\b|\bmehndi\b|\blehenga\b|\bgroom\b/.test(hay))
    return "wedding";
  if (/\bwinter\b|\bsnow\b|\bsnowfall\b/.test(hay)) return "winter";
  if (/\blinkedin\b|\bcv\b|\bresume\b|\bpassport\b|\bheadshot\b|\bprofile picture\b/.test(hay))
    return "linkedin";
  if (style.category === "Anime" || /\banime\b|\bchibi\b/.test(hay)) return "anime";
  if (/\b80s\b|\b1980s\b|\b1985\b|\b1986\b/.test(hay)) return "retro80s";
  if (/\boutfit change\b|\boutfit swap\b/.test(hay)) return "outfit";
  if (style.category === "Product and objects" || style.subject === "Product or object")
    return "product";
  if (style.subject === "Pet" || style.category === "Pets") return "pet";
  if (/\bluxury\b/.test(hay)) return "luxury";
  if (/\bfor boys\b|prompt-for-boys|ai-photo-prompt-for-boys|boy ai\b/.test(hay)) return "boys";
  if (style.category === "Travel" || /\btravel\b|\bvacation\b/.test(hay)) return "travel";
  if (style.category === "Couple" || (/\bcouple\b/.test(hay) && style.subject === "Group"))
    return "couple";
  if (/\bfamily\b/.test(hay) && style.subject === "Group") return "family";
  if (style.category === "Fantasy") return "fantasy";
  if (style.category === "Vintage" || style.category === "Retro") return "vintage";
  if (style.category === "Painting") return "painting";
  if (style.category === "3D avatars") return "avatar";
  if (style.category === "Professional portraits") return "professional";
  if (/\bstylish\b|\bfashion editorial\b|\bstreet fashion\b/.test(hay)) return "stylish";
  if (style.category === "Cinematic") return "cinematic";
  return "general";
}

const STRIP: Partial<Record<Theme, RegExp>> = {
  diwali: /\bdiwali\b/gi,
  christmas: /\bchristmas\b|\bxmas\b/gi,
  halloween: /\bhalloween\b/gi,
  eid: /\beid\b/gi,
  birthday: /\bbirthday\b/gi,
  wedding: /\bwedding\b|\bbridal\b/gi,
  winter: /\bwinter\b/gi,
  linkedin: /\blinkedin\b|\bcv\b|\bpassport\b|\bheadshot\b/gi,
  anime: /\banime\b/gi,
  retro80s: /\b80s\b|\b1980s\b/gi,
  luxury: /\bluxury\b/gi,
  outfit: /\boutfit\b/gi,
  boys: /\bboys?\b/gi,
  couple: /\bcouple\b/gi,
  family: /\bfamily\b/gi,
  fantasy: /\bfantasy\b/gi,
  vintage: /\bvintage\b|\bretro\b/gi,
  cinematic: /\bcinematic\b/gi,
  professional: /\bprofessional\b/gi,
  stylish: /\bstylish\b/gi,
  pet: /\bpet\b/gi,
  travel: /\btravel\b/gi,
  product: /\bproduct\b|\bpackshot\b/gi,
  avatar: /\b3d\b|\bavatar\b/gi,
  painting: /\bpaint\w*/gi,
};

function stripTheme(look: string, theme: Theme): string {
  const re = STRIP[theme];
  let s = look;
  if (re) s = s.replace(re, " ");
  return s.replace(/\s+/g, " ").trim();
}

function pickLook(style: CatalogStyle, theme: Theme): string {
  let look = stripTheme(lookFromTitle(style.title), theme);
  if (wc(look) < 2) {
    look = stripTheme(keywords(style.note, 5), theme);
  }
  if (wc(look) < 2) {
    look = stripTheme(
      keywords(
        style.id
          .split("-")
          .filter((p) => !STOP.has(p))
          .join(" "),
        5,
      ),
      theme,
    );
  }
  return clamp(dedupeAdj(look), 5);
}

/** Look-first natural phrases — reads as a specific use, not a mad-lib. */
function craft(theme: Theme, look: string): string {
  const L = lowerFirst(look);
  switch (theme) {
    case "diwali":
      return `${upperFirst(L)} Diwali festive posts`;
    case "christmas":
      return `${upperFirst(L)} Christmas holiday cards`;
    case "halloween":
      return `${upperFirst(L)} Halloween costume posts`;
    case "eid":
      return `${upperFirst(L)} Eid family photos`;
    case "birthday":
      return `${upperFirst(L)} birthday party photos`;
    case "wedding":
      return `${upperFirst(L)} wedding album shots`;
    case "winter":
      return `${upperFirst(L)} winter snow-day posts`;
    case "linkedin":
      return `A polished ${L} for LinkedIn or CV`;
    case "anime":
      return `Anime-style ${L} social posts`;
    case "retro80s":
      return `80s retro ${L} throwback posts`;
    case "boys":
      return `Trending ${L} boy feed posts`;
    case "luxury":
      return `Quiet-luxury ${L} lifestyle posts`;
    case "outfit":
      return `${upperFirst(L)} outfit-change try-on`;
    case "product":
      return `${upperFirst(L)} product shots for your shop`;
    case "pet":
      return `Adorable ${L} pet profile posts`;
    case "travel":
      return `${upperFirst(L)} travel vacation posts`;
    case "couple":
      return `${upperFirst(L)} couple anniversary posts`;
    case "family":
      return `${upperFirst(L)} family reunion posts`;
    case "fantasy":
      return `${upperFirst(L)} fantasy creative edits`;
    case "vintage":
      return `${upperFirst(L)} vintage nostalgia posts`;
    case "painting":
      return `${upperFirst(L)} painterly art posts`;
    case "avatar":
      return `3D ${L} avatar profile looks`;
    case "cinematic":
      return `${upperFirst(L)} cinematic portfolio frames`;
    case "professional":
      return `${upperFirst(L)} professional profile photos`;
    case "stylish":
      return `${upperFirst(L)} stylish Instagram portraits`;
    default:
      return `${upperFirst(L)} social portrait posts`;
  }
}

function authorOccasions(style: CatalogStyle): string {
  const hay = hayOf(style);
  const theme = themeOf(style, hay);

  // LinkedIn / ID looks: prefer concrete nouns from the title.
  if (theme === "linkedin") {
    if (/\bpassport\b/.test(hay)) {
      return softCase("A polished passport-size ID photo for applications");
    }
    if (/\bcv\b|\bresume\b/.test(hay)) {
      return softCase("A clean CV resume headshot on a plain background");
    }
    if (/\bhome.?office\b|\bremote\b/.test(hay)) {
      return softCase("A polished remote-work LinkedIn profile photo");
    }
  }

  // Couple merge sparkler Diwali — keep short and specific.
  // A few high-traffic looks get fully hand-tuned phrases.
  const HAND: Record<string, string> = {
    "separate-photos-couple": "Sparkler rooftop Diwali couple merge posts",
    "diya-lit-balcony": "Diya-lined balcony Diwali couple evening posts",
    "intimate-cinematic-portrait": "Indie-film seated portrait portfolio frames",
    "combine-two-photos-80s-couple": "80s couple merge throwback portraits",
    "cute-3d-toon-pet": "Cute 3D toon pet profile stickers",
    "white-wedding-gown": "Modest lace wedding gown album shots",
    "trending-ai-photo-prompt-for-boys-with-car-night":
      "Night car lean boy Instagram feed posts",
    "south-asian-fashion-editorial": "Traditional saree editorial profile photos",
    "pure-white-packshot": "Clean white-background product packshots for shops",
    "crimson-bangle-reverie": "Crimson bangle window-lit triptych portraits",
    "cafe-window-merge-two-photos-prompt-gemini-couple":
      "Cafe window couple merge anniversary posts",
    "soft-daylight-lifestyle": "Soft window-light lifestyle product shots",
    "viral-chibi-friends-ai-prompt-sticker-sheet":
      "Chibi friends sticker-sheet social posts",
  };
  if (HAND[style.id]) return HAND[style.id];

  const look = pickLook(style, theme);
  return softCase(clamp(dedupeAdj(craft(theme, look)), 12));
}

function authorWorksWith(style: CatalogStyle): string {
  const target = style.targetSourcePhoto.replace(/\s+/g, " ").trim().replace(/\.$/, "");
  if (target && wc(target) <= 12) return lowerFirst(target);
  if (target && wc(target) <= 16) return clamp(lowerFirst(target), 12);
  return worksWithForStyle(style);
}

function altLook(style: CatalogStyle, n: number): string {
  const pools = [
    keywords(style.note, 5),
    keywords(style.description, 5),
    keywords(STYLE_SEO_OVERRIDES[style.id]?.intro ?? "", 5),
    keywords(
      style.id
        .split("-")
        .filter((p) => !STOP.has(p) && p.length > 2)
        .join(" "),
      5,
    ),
  ].filter((p) => wc(p) >= 2);
  return pools[n % Math.max(pools.length, 1)] ?? style.id.split("-").slice(0, 4).join(" ");
}

function uniquify(
  rows: Array<{ id: string; occasions: string; worksWith: string; style: CatalogStyle }>,
): void {
  const exact = new Map<string, string>();
  const near = new Map<string, string>();

  for (const row of rows) {
    let occ = softCase(row.occasions);
    for (let attempt = 0; attempt < 30; attempt++) {
      const key = norm(occ);
      const stem = stemNear(occ);
      const eOwner = exact.get(key);
      const nOwner = near.get(stem);
      if ((!eOwner || eOwner === row.id) && (!nOwner || nOwner === row.id)) {
        exact.set(key, row.id);
        near.set(stem, row.id);
        row.occasions = occ;
        break;
      }
      const theme = themeOf(row.style, hayOf(row.style));
      const look = stripTheme(altLook(row.style, attempt), theme) || altLook(row.style, attempt);
      occ = softCase(clamp(dedupeAdj(craft(theme, look)), 12));
      if (attempt === 29) {
        const frag = row.id.split("-").filter((p) => p.length > 3).slice(-2).join(" ");
        occ = softCase(clamp(`${occ} (${frag})`, 12));
        row.occasions = occ;
        exact.set(norm(occ), row.id);
        near.set(stemNear(occ), row.id);
      }
    }
  }
}

function render(rows: Array<{ id: string; occasions: string; worksWith: string }>): string {
  const body = rows
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id))
    .map(
      (e) => `  ${JSON.stringify(e.id)}: {
    occasions: ${JSON.stringify(e.occasions)},
    worksWith: ${JSON.stringify(e.worksWith)},
  },`,
    )
    .join("\n");

  return `import type { StyleBestForEntry } from "./style-best-for";

/**
 * Per-style Best for / Works with lines for every published style page.
 * Each \`occasions\` string is unique across the catalog (AdSense uniqueness).
 * Authored offline from each style’s title, note, and theme — stored as data,
 * not computed with fragile runtime regex. Re-run
 * \`npx tsx scripts/author-unique-best-for.mts\` and review when styles change.
 */
export const STYLE_BEST_FOR_DATA: Readonly<Record<string, StyleBestForEntry>> = {
${body}
};
`;
}

const styles = getPublishedStyles();
const rows = styles.map((style) => ({
  id: style.id,
  occasions: authorOccasions(style),
  worksWith: authorWorksWith(style),
  style,
}));
uniquify(rows);

// Festive leak repair (label only if style text supports it)
const occFest = /\b(diwali|christmas|halloween|eid)\b/i;
const styleFest =
  /\b(diwali|christmas|xmas|halloween|eid|diya|rangoli|phuljhadi|zombie|vampire|ornament|holiday glam)\b/i;
for (const row of rows) {
  const hay = hayOf(row.style);
  if (occFest.test(row.occasions) && !styleFest.test(hay)) {
    const theme = themeOf(row.style, hay);
    const safe =
      theme === "diwali" || theme === "christmas" || theme === "halloween" || theme === "eid"
        ? "general"
        : theme;
    row.occasions = clamp(craft(safe, pickLook(row.style, safe)), 12);
  }
}

// Final exact + near uniqueness
{
  const exact = new Map<string, string>();
  const near = new Map<string, string>();
  for (const row of rows) {
    let occ = softCase(row.occasions);
    for (let attempt = 0; attempt < 40; attempt++) {
      const key = norm(occ);
      const stem = stemNear(occ);
      if (
        (!exact.has(key) || exact.get(key) === row.id) &&
        (!near.has(stem) || near.get(stem) === row.id)
      ) {
        exact.set(key, row.id);
        near.set(stem, row.id);
        row.occasions = occ;
        break;
      }
      const theme = themeOf(row.style, hayOf(row.style));
      occ = softCase(clamp(craft(theme, altLook(row.style, attempt + 3)), 12));
      if (attempt === 39) {
        occ = softCase(clamp(`${occ} (${row.id.split("-").slice(-2).join(" ")})`, 12));
        row.occasions = occ;
        exact.set(norm(occ), row.id);
        near.set(stemNear(occ), row.id);
      }
    }
  }
}

const unique = new Set(rows.map((r) => norm(r.occasions)));
if (unique.size !== rows.length) {
  console.error("unique fail", unique.size, rows.length);
  process.exit(1);
}

let leaks = 0;
for (const row of rows) {
  if (occFest.test(row.occasions) && !styleFest.test(hayOf(row.style))) {
    leaks += 1;
    console.log("LEAK", row.id, row.occasions);
  }
}

fs.writeFileSync(OUT, render(rows));
console.log({
  entries: rows.length,
  uniqueOccasions: unique.size,
  festiveLeaks: leaks,
  parenFallbacks: rows.filter((r) => r.occasions.includes("(")).length,
});

const sampleIds = [
  "separate-photos-couple",
  "diya-lit-balcony",
  "intimate-cinematic-portrait",
  "pure-white-packshot",
  "combine-two-photos-80s-couple",
  "passport-size-photo-ai-prompt-gemini-white-background",
  "cute-3d-toon-pet",
  "white-wedding-gown",
  "trending-ai-photo-prompt-for-boys-with-car-night",
  "south-asian-fashion-editorial",
];
for (const id of sampleIds) {
  const r = rows.find((x) => x.id === id)!;
  console.log(`- Best for: ${r.occasions} · Works with: ${r.worksWith}`);
}

// Print a few more random quality checks
for (const id of ["crimson-bangle-reverie", "home-office-linkedin-profile-picture-prompt-gemini", "viral-chibi-friends-ai-prompt-sticker-sheet", "cafe-window-merge-two-photos-prompt-gemini-couple", "soft-daylight-lifestyle"]) {
  const r = rows.find((x) => x.id === id);
  if (r) console.log(`* ${id}: ${r.occasions}`);
}
