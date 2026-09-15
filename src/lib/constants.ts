export const SITE = {
  name: "AIPromptGrid",
  handle: "aipromptgrid",
  tagline: "Ready-to-copy prompts for stunning AI photo styles.",
  description:
    "Browse curated AI photo styles, see before-and-after proof, and copy prompts tested on real models.",
} as const;

export const NAV = {
  explore: [
    { href: "/styles", label: "Styles" },
    { href: "/categories", label: "Categories" },
  ],
  create: [
    { href: "/coming-soon/video", label: "Video prompts" },
    { href: "/coming-soon/generator", label: "Image generator" },
  ],
} as const;

/** Controlled model slugs — mirrors docs/content-model.md §5 */
export const MODEL_LABELS: Record<string, string> = {
  gemini: "Gemini",
  chatgpt: "ChatGPT",
  midjourney: "Midjourney",
  flux: "Flux",
  "stable-diffusion": "Stable Diffusion",
  other: "Other",
};

export function modelLabel(slug: string): string {
  return MODEL_LABELS[slug] ?? slug;
}

/** Launch taxonomy — mirrors docs/content-model.md */
export const CATEGORY_SEEDS = [
  { name: "Vintage Film", slug: "vintage-film" },
  { name: "Cinematic", slug: "cinematic" },
  { name: "Portrait", slug: "portrait" },
  { name: "Fashion", slug: "fashion" },
  { name: "Street & Documentary", slug: "street-documentary" },
  { name: "Selfie Transformation", slug: "selfie-transformation" },
  { name: "Retro & Nostalgia", slug: "retro-nostalgia" },
  { name: "Fantasy & Surreal", slug: "fantasy-surreal" },
  { name: "Product & Commercial", slug: "product-commercial" },
] as const;

/** Cinematic cover art for category cards — keyed by slug. */
export const CATEGORY_COVERS: Record<string, { src: string; alt: string }> = {
  "vintage-film": {
    src: "/images/categories/vintage-film.png",
    alt: "Vintage film style category cover",
  },
  cinematic: {
    src: "/images/categories/cinematic.png",
    alt: "Cinematic style category cover",
  },
  portrait: {
    src: "/images/categories/portrait.png",
    alt: "Portrait style category cover",
  },
  fashion: {
    src: "/images/categories/fashion.png",
    alt: "Fashion style category cover",
  },
  "street-documentary": {
    src: "/images/categories/street-documentary.png",
    alt: "Street and documentary style category cover",
  },
  "selfie-transformation": {
    src: "/images/categories/selfie-transformation.png",
    alt: "Selfie transformation style category cover",
  },
  "retro-nostalgia": {
    src: "/images/categories/retro-nostalgia.png",
    alt: "Retro and nostalgia style category cover",
  },
  "fantasy-surreal": {
    src: "/images/categories/fantasy-surreal.png",
    alt: "Fantasy and surreal style category cover",
  },
  "product-commercial": {
    src: "/images/categories/product-commercial.png",
    alt: "Product and commercial style category cover",
  },
};
