/**
 * Categories, accents, and label→category inference for Glass Icon Bento
 * "What changes" cards on style detail pages.
 */

export const STYLE_CHANGE_CATEGORY_IDS = [
  "BACKDROP",
  "LIGHTING",
  "ATMOSPHERE",
  "TONE & COLOR",
  "OUTFIT",
  "JEWELLERY & ACCESSORIES",
  "POSE & FRAMING",
  "LAYOUT",
  "PROPS & DECOR",
  "ART STYLE",
  "HAIR & MAKEUP",
  "PEOPLE",
] as const;

export type StyleChangeCategoryId = (typeof STYLE_CHANGE_CATEGORY_IDS)[number];

export type StyleChangeAccent = {
  /** Tailwind color stem used in class names, e.g. violet, indigo */
  name:
    | "violet"
    | "indigo"
    | "amber"
    | "teal"
    | "rose"
    | "emerald"
    | "sky"
    | "fuchsia"
    | "orange";
  glow: string;
  iconBorder: string;
  iconBg: string;
  iconText: string;
  chipBorder: string;
  chipText: string;
};

export type StyleChangeCategoryDef = {
  id: StyleChangeCategoryId;
  accent: StyleChangeAccent;
  /** Default mono chip when a style entry omits chip */
  defaultChip: string;
};

export const STYLE_CHANGE_CATEGORIES: Record<
  StyleChangeCategoryId,
  StyleChangeCategoryDef
> = {
  BACKDROP: {
    id: "BACKDROP",
    accent: {
      name: "indigo",
      glow: "bg-indigo-500/15",
      iconBorder: "border-indigo-400/30",
      iconBg: "bg-indigo-500/15",
      iconText: "text-indigo-300",
      chipBorder: "border-white/15",
      chipText: "text-zinc-300",
    },
    defaultChip: "Studio Isolation · Zero Clutter",
  },
  LIGHTING: {
    id: "LIGHTING",
    accent: {
      name: "amber",
      glow: "bg-amber-500/15",
      iconBorder: "border-amber-400/30",
      iconBg: "bg-amber-500/15",
      iconText: "text-amber-300",
      chipBorder: "border-amber-400/25",
      chipText: "text-amber-200",
    },
    defaultChip: "Dual Edge Key · Soft Falloff",
  },
  ATMOSPHERE: {
    id: "ATMOSPHERE",
    accent: {
      name: "violet",
      glow: "bg-violet-500/15",
      iconBorder: "border-violet-500/30",
      iconBg: "bg-violet-500/15",
      iconText: "text-violet-400",
      chipBorder: "border-violet-400/30",
      chipText: "text-violet-200",
    },
    defaultChip: "Foreground Layer · Opacity 65%",
  },
  "TONE & COLOR": {
    id: "TONE & COLOR",
    accent: {
      name: "teal",
      glow: "bg-teal-500/15",
      iconBorder: "border-teal-400/30",
      iconBg: "bg-teal-400/15",
      iconText: "text-teal-400",
      chipBorder: "border-teal-400/25",
      chipText: "text-teal-300",
    },
    defaultChip: "Chiaroscuro Curve · Skin Protected",
  },
  OUTFIT: {
    id: "OUTFIT",
    accent: {
      name: "rose",
      glow: "bg-rose-500/15",
      iconBorder: "border-rose-400/30",
      iconBg: "bg-rose-500/15",
      iconText: "text-rose-300",
      chipBorder: "border-rose-400/25",
      chipText: "text-rose-200",
    },
    defaultChip: "Wardrobe Swap · Fabric Detail",
  },
  "JEWELLERY & ACCESSORIES": {
    id: "JEWELLERY & ACCESSORIES",
    accent: {
      name: "fuchsia",
      glow: "bg-fuchsia-500/15",
      iconBorder: "border-fuchsia-400/30",
      iconBg: "bg-fuchsia-500/15",
      iconText: "text-fuchsia-300",
      chipBorder: "border-fuchsia-400/25",
      chipText: "text-fuchsia-200",
    },
    defaultChip: "Accent Layer · Metal & Shine",
  },
  "POSE & FRAMING": {
    id: "POSE & FRAMING",
    accent: {
      name: "sky",
      glow: "bg-sky-500/15",
      iconBorder: "border-sky-400/30",
      iconBg: "bg-sky-500/15",
      iconText: "text-sky-300",
      chipBorder: "border-sky-400/25",
      chipText: "text-sky-200",
    },
    defaultChip: "Body Language · Camera Lock",
  },
  LAYOUT: {
    id: "LAYOUT",
    accent: {
      name: "emerald",
      glow: "bg-emerald-500/15",
      iconBorder: "border-emerald-400/30",
      iconBg: "bg-emerald-500/15",
      iconText: "text-emerald-300",
      chipBorder: "border-emerald-400/25",
      chipText: "text-emerald-200",
    },
    defaultChip: "Panel Grid · Story Format",
  },
  "PROPS & DECOR": {
    id: "PROPS & DECOR",
    accent: {
      name: "orange",
      glow: "bg-orange-500/15",
      iconBorder: "border-orange-400/30",
      iconBg: "bg-orange-500/15",
      iconText: "text-orange-300",
      chipBorder: "border-orange-400/25",
      chipText: "text-orange-200",
    },
    defaultChip: "Scene Dressing · Practical Props",
  },
  "ART STYLE": {
    id: "ART STYLE",
    accent: {
      name: "violet",
      glow: "bg-violet-500/15",
      iconBorder: "border-violet-400/30",
      iconBg: "bg-violet-500/15",
      iconText: "text-violet-300",
      chipBorder: "border-violet-400/25",
      chipText: "text-violet-200",
    },
    defaultChip: "Medium Shift · Line & Texture",
  },
  "HAIR & MAKEUP": {
    id: "HAIR & MAKEUP",
    accent: {
      name: "rose",
      glow: "bg-rose-500/15",
      iconBorder: "border-rose-400/30",
      iconBg: "bg-rose-400/15",
      iconText: "text-rose-200",
      chipBorder: "border-rose-300/25",
      chipText: "text-rose-100",
    },
    defaultChip: "Grooming Pass · Soft Finish",
  },
  PEOPLE: {
    id: "PEOPLE",
    accent: {
      name: "sky",
      glow: "bg-sky-500/15",
      iconBorder: "border-sky-400/30",
      iconBg: "bg-sky-500/15",
      iconText: "text-sky-200",
      chipBorder: "border-sky-300/25",
      chipText: "text-sky-100",
    },
    defaultChip: "Subject Cast · Identity Locked",
  },
};

type Rule = { category: StyleChangeCategoryId; test: RegExp };

/** First matching rule wins — order matters. */
const LABEL_RULES: Rule[] = [
  {
    category: "LAYOUT",
    test: /\b(layout|panel|collage|grid|triptych|split|story format|square format|multi[- ]?panel|comic|montage)\b/i,
  },
  {
    category: "POSE & FRAMING",
    // Pose wins over hair/outfit when the label is clearly a pose (e.g. "Wind-swept hair pose").
    test: /\b(pose|framing|angle|camera|composition|selfie|walking|standing|sitting|kneeling|gesture|motion blur|action shot|candid|laugh|embrace|hug|dance|jump|mid-kick|battle-cry|arm-around|back-to-back)\b/i,
  },
  {
    category: "ART STYLE",
    test: /\b(anime|cel[- ]?shad|pixel|sprite|illustration|paint|watercolor|oil paint|sketch|cartoon|manga|chibi|3d|cgi|render|art (style|medium)|print texture|film (look|grain|texture|still)|grain|medium|styliz|retro|vintage grade|80s film|90s|16-bit|hand[- ]?paint|soft-focus yearbook)\b/i,
  },
  {
    category: "JEWELLERY & ACCESSORIES",
    test: /\b(jewell?ery|kundan|matha|mala|necklace|earring|bracelet|ring|tiara|veil|dupatta|hat|glasses|sunglasses|watch|bag|purse|bouquet|button|pocket square|bow tie|tie|khussa|safa|kulla|accessories?|glove)\b/i,
  },
  {
    category: "HAIR & MAKEUP",
    test: /\b(hair|makeup|make[- ]?up|lipstick|kohl|mehndi stain|grooming|beard style|brows|lash)\b/i,
  },
  {
    category: "OUTFIT",
    test: /\b(outfit|wardrobe|clothing|clothes|dress|gown|lehenga|saree|sari|kurta|sherwani|suit|tuxedo|blazer|jacket|coat|hoodie|jeans|skirt|top|shirt|blouse|uniform|costume|wear|styling|fabric|maxi|sharara|gharara|waistcoat|prince coat)\b/i,
  },
  {
    category: "LIGHTING",
    test: /\b(light|lighting|rim|flash|lamp|neon|glow|sun|golden[- ]?hour|backlight|key light|shadow|spotlight|candlelight|fairy light|warm lamp)\b/i,
  },
  {
    category: "TONE & COLOR",
    test: /\b(color|colour|mood|grade|grading|contrast|tone|tint|saturation|lut|palette|warm|cool|teal|orange grade|black and gold)\b/i,
  },
  {
    category: "ATMOSPHERE",
    test: /\b(atmosphere|smoke|fog|mist|vapor|snow|snowfall|rain|sparkle|bokeh|aura|magic|dust|haze|steam|particle|ability glow|magical glow)\b/i,
  },
  {
    category: "BACKDROP",
    test: /\b(background|backdrop|studio|void|environment|setting|scene|street|room|hall|garden|beach|rooftop|balcony|courtyard|palace|alley|city|forest|meadow|planet|interior|exterior|wall|sky|pavilion|corridor|lawn|stage)\b/i,
  },
  {
    category: "PEOPLE",
    test: /\b(people|person|couple|family|group|crowd|subject|cast|both people|extra|companion|friend|partner|child|baby|hand and scale|party lineup)\b/i,
  },
  {
    category: "PROPS & DECOR",
    test: /\b(prop|decor|decoration|furniture|fixture|plant|flower|rangoli|diya|lantern|candle|cake|balloon|gift|cup|chai|table|chair|pedestal|surface|staging|string light|chandelier|sign|caption|text|neon sign|baseplate|acrylic|window box|scrapbook|hp bars|materials|planting|surfaces|fixtures)\b/i,
  },
]

export function inferStyleChangeCategory(label: string): StyleChangeCategoryId {
  const trimmed = label.trim();
  for (const rule of LABEL_RULES) {
    if (rule.test.test(trimmed)) return rule.category;
  }
  // Fallback heuristics by word fragments
  const key = trimmed.toLowerCase();
  if (key.includes("light")) return "LIGHTING";
  if (key.includes("color") || key.includes("mood")) return "TONE & COLOR";
  if (key.includes("outfit") || key.includes("dress")) return "OUTFIT";
  if (key.includes("pose") || key.includes("frame")) return "POSE & FRAMING";
  if (key.includes("back") || key.includes("studio")) return "BACKDROP";
  if (key.includes("prop") || key.includes("decor")) return "PROPS & DECOR";
  if (key.includes("anime") || key.includes("style")) return "ART STYLE";
  if (key.includes("hair") || key.includes("makeup")) return "HAIR & MAKEUP";
  return "PROPS & DECOR";
}

export function getStyleChangeCategory(
  category: StyleChangeCategoryId | string,
): StyleChangeCategoryDef {
  if (category in STYLE_CHANGE_CATEGORIES) {
    return STYLE_CHANGE_CATEGORIES[category as StyleChangeCategoryId];
  }
  return STYLE_CHANGE_CATEGORIES["PROPS & DECOR"];
}
