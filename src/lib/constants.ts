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
