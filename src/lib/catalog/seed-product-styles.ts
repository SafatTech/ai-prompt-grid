import type { CatalogStyle } from "./types";

const asset = (name: string) => `/catalog/product/${name}`;

function evidence(
  n: string,
  altSource: string,
  altResult: string,
): CatalogStyle["examplePairs"] {
  const source = asset(`source-${n}.png`);
  const result = asset(`result-${n}.png`);
  return [
    { source, result, altSource, altResult },
    {
      source,
      result,
      altSource: `${altSource} (detail)`,
      altResult: `${altResult} (detail)`,
    },
  ];
}

/** Product preserve defaults: packaging details ON, camera angle OFF. */
const productPreserve = {
  keepClothing: true,
  keepPose: false,
} as const;

type ProductSeed = {
  n: string;
  id: string;
  title: string;
  note: string;
  description: string;
  intent: CatalogStyle["intent"];
  mood: string;
  background: string;
  template: string;
  changes: string[];
  height: number;
};

const products: ProductSeed[] = [
  {
    n: "01",
    id: "pure-white-packshot",
    title: "White Background E-commerce Product Photography AI Prompt",
    note: "Clean marketplace-ready studio packshot",
    description:
      "E commerce product photography AI prompt: a clean, marketplace-ready white studio packshot from any phone photo. Copy-paste free in Gemini.",
    intent: "Change background",
    mood: "Bright neutral",
    background: "Pure white seamless infinity studio background",
    changes: ["Background", "Lighting", "Studio finish", "Color mood"],
    height: 320,
    template: `Transform {{subject}} into a clean, marketplace-ready product packshot. Preserve the product’s exact shape, proportions, materials, original colour, transparency, packaging, labels, and {{preserve}}.

Place the product against {{background}}, interpreted as a seamless, distraction-free studio setting with no visible horizon line. Use bright, soft, even studio lighting, realistic glass and material reflections, a subtle natural contact shadow directly beneath the product, and {{mood}} colour grading.

Keep the product fully visible, centrally composed with generous clean space around it. Render in {{ratio}} as premium photorealistic e-commerce product photography.

Do not add props, hands, extra products, decorative objects, text, logos, watermarks, altered labels, distorted edges, or changed product details.`,
  },
  {
    n: "02",
    id: "color-pop-pedestal",
    title: "Color Pop Pedestal Product Photography AI Prompt",
    note: "Bold monochrome pedestal campaign look",
    description:
      "Product photography AI prompts for campaigns: a bold monochrome pedestal set that makes your item pop. Free to copy for Gemini and ChatGPT.",
    intent: "Full scene transformation",
    mood: "Warm neutral",
    background: "Monochrome coral seamless studio backdrop with a circular coral pedestal",
    changes: ["Background", "Pedestal staging", "Lighting", "Color mood"],
    height: 330,
    template: `Transform {{subject}} into a bold, modern product campaign image while preserving the exact product shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Place the product on a simple geometric pedestal built from {{background}}. Keep the scene monochromatic and minimal, using one dominant backdrop colour with a slightly deeper or lighter pedestal tone. Add no unrelated props.

Use premium photorealistic studio photography, clean controlled highlights, soft sculpted shadows, and {{mood}} colour grading. Keep the product as the obvious focal point, fully visible and centrally framed with balanced negative space.

Compose for {{ratio}}. Do not add text, logos, watermarks, hands, extra products, clutter, distorted edges, or changed product details.`,
  },
  {
    n: "03",
    id: "soft-daylight-lifestyle",
    title: "Window Light Lifestyle Product AI Prompt (Gemini)",
    note: "Natural window-lit lifestyle product scene",
    description:
      "Product shoot AI prompt with daylight: a natural window-lit lifestyle scene for your item, from one plain photo. Copy-paste free for Gemini.",
    intent: "Change background",
    mood: "Warm neutral",
    background:
      "Sunlit pale-oak desk with a softly blurred open notebook, ceramic cup, and minimal greenery near a window",
    changes: ["Background", "Lifestyle staging", "Lighting", "Color mood"],
    height: 340,
    template: `Transform {{subject}} into a refined, natural lifestyle product photograph while preserving its exact shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Stage the product in {{background}}, interpreted as a believable, use-appropriate everyday environment. Keep the product fully visible in sharp foreground focus, with only subtle supporting objects in the distant background and a shallow, realistic depth of field.

Use soft diffused window daylight, authentic material texture, gentle natural shadows, and {{mood}} colour grading. The scene should feel premium, calm, and lived-in while keeping the product as the clear focal point.

Compose for {{ratio}}. Do not add text, logos, watermarks, hands, extra copies of the product, clutter, distorted edges, or changed product details.`,
  },
  {
    n: "04",
    id: "editorial-flat-lay",
    title: "Flat Lay Product Photography AI Prompts (Reddit Fave)",
    note: "Premium overhead flat-lay composition",
    description:
      "Flat lay product photography AI prompts: a premium overhead composition of your item with props and soft shadow. Free for Gemini and ChatGPT.",
    intent: "Artistic restyle",
    mood: "Warm neutral",
    background:
      "Warm light-beige textured paper surface with a closed cream notebook and graphite pencil at the edges",
    changes: ["Camera angle", "Surface and props", "Lighting", "Color mood"],
    height: 335,
    template: `Transform {{subject}} into a premium top-down editorial flat-lay photograph while preserving its exact shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Arrange the product naturally from an overhead camera view on {{background}}. Keep the product as the largest, central element and add only a few restrained, product-appropriate supporting props near the frame edges. Use intentional asymmetrical spacing and generous negative space; never let props compete with the product.

Apply soft directional daylight, crisp tactile surface detail, gentle realistic shadows, and {{mood}} colour grading. Keep the overall composition minimal, refined, and photorealistic.

Compose for {{ratio}}. Do not add text, logos, watermarks, hands, duplicate products, clutter, distorted geometry, or altered product details.`,
  },
  {
    n: "05",
    id: "botanical-wellness-still-life",
    title: "Botanical Still Life Professional Product AI Prompt",
    note: "Calm botanical still-life product set",
    description:
      "Professional product photography AI prompt: a calm botanical still-life set for skincare and wellness items. Copy-paste free for Gemini.",
    intent: "Artistic restyle",
    mood: "Warm neutral",
    background:
      "Warm limestone pedestal with soft green leaves, natural stone, folded unbleached linen, and a pale beige backdrop",
    changes: ["Background", "Natural props", "Lighting", "Color mood"],
    height: 340,
    template: `Transform {{subject}} into a calm, premium botanical still-life product photograph while preserving its exact shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Place the product within {{background}}, using only a few restrained natural elements such as foliage, stone, linen, or organic textures. Keep the setting refined and uncluttered, with the product fully visible and clearly dominant over every supporting element.

Use soft natural daylight, realistic tactile materials, gentle environmental shadows, and {{mood}} colour grading. Create a quiet, high-end editorial feeling without making the scene look artificial or changing the product itself.

Compose for {{ratio}}. Do not add text, logos, watermarks, hands, people, duplicate products, clutter, distorted geometry, or changed product details.`,
  },
  {
    n: "06",
    id: "midnight-luxury-spotlight",
    title: "Luxury Jewellery Product Photography AI Prompt",
    note: "Dark cinematic luxury product spotlight",
    description:
      "Jewellery product photography AI prompt: a dark cinematic spotlight that makes rings, watches or perfume look premium. Free to copy-paste.",
    intent: "Change lighting",
    mood: "Dark cool neutral",
    background: "Deep charcoal-black seamless studio with a low black reflective plinth",
    changes: ["Background", "Lighting", "Reflection", "Color mood"],
    height: 330,
    template: `Transform {{subject}} into a dramatic luxury product campaign image while preserving its exact shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Place the product against {{background}}, interpreted as a dark, minimalist studio scene with a restrained reflective surface beneath it. Keep the product fully visible and isolated, with no props or visual distractions.

Use controlled rim lighting to trace the product silhouette, a narrow soft highlight to reveal its material texture, deep readable shadows, subtle realistic reflection, and {{mood}} colour grading. The result should feel cinematic, premium, and photorealistic.

Compose for {{ratio}}. Do not add text, logos, watermarks, hands, duplicate products, smoke, splashes, clutter, distorted geometry, or changed product details.`,
  },
  {
    n: "07",
    id: "floating-motion-hero",
    title: "Floating Product Photography AI Prompt (Free)",
    note: "Dynamic floating product with light trails",
    description:
      "Product photography AI prompts free: a dynamic floating hero shot with light trails for ads and banners. Copy-paste into Gemini or ChatGPT.",
    intent: "Full scene transformation",
    mood: "Warm neutral",
    background: "Pale sage-to-cream gradient studio background with subtle curved light trails",
    changes: ["Background", "Floating staging", "Motion accents", "Color mood"],
    height: 335,
    template: `Transform {{subject}} into a dynamic floating product campaign image while preserving its exact shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Place the product against {{background}} and make it appear realistically suspended, with a subtle, soft shadow beneath it to establish scale. Keep the product perfectly sharp and fully visible; suggest motion only through restrained background light trails, soft graphic flow, or a gentle environmental effect.

Use clean premium studio lighting, precise material highlights, controlled depth, and {{mood}} colour grading. The composition should feel energetic and modern without becoming cluttered or unrealistic.

Compose for {{ratio}}. Do not add text, logos, watermarks, hands, cords, duplicate products, clutter, motion blur on the product, distorted geometry, or changed product details.`,
  },
  {
    n: "08",
    id: "tactile-macro-detail",
    title: "Macro Product Shoot AI Prompt (Texture Close-Up)",
    note: "Close-up macro texture product shot",
    description:
      "Product shoot AI prompt for macro detail: close-up texture shots that show materials and finish. Free to copy for Gemini and ChatGPT sellers.",
    intent: "Artistic restyle",
    mood: "Warm golden neutral",
    background: "Warm ivory microsuede surface with a subtle fine matte-stone texture",
    changes: ["Framing", "Surface", "Macro lighting", "Color mood"],
    height: 325,
    template: `Transform {{subject}} into a high-detail macro product photograph while preserving its exact shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Frame the product’s most tactile, valuable details prominently against {{background}}. Keep the main product feature tack sharp while allowing only distant areas to fall into a realistic, soft shallow depth of field.

Use controlled close-up studio lighting to reveal authentic material texture, refined highlights, subtle contact shadows, and {{mood}} colour grading. Keep the composition minimal, premium, and photorealistic.

Compose for {{ratio}}. Do not add text, logos, watermarks, hands, people, duplicate products, unrelated props, clutter, distorted geometry, or changed product details.`,
  },
  {
    n: "09",
    id: "everyday-in-hand-scale",
    title: "In-Hand Product Picture AI Prompt (Scale Shot)",
    note: "Natural in-hand scale reference photo",
    description:
      "Product picture AI prompt for scale: show your item naturally held in a hand so buyers see its true size. Copy-paste free for Gemini and ChatGPT.",
    intent: "Full scene transformation",
    mood: "Warm neutral",
    background: "A softly blurred neutral bathroom vanity beside a sunlit window",
    changes: ["Hand and scale", "Background", "Lighting", "Color mood"],
    height: 340,
    template: `Transform {{subject}} into a natural, premium in-hand product photograph while preserving its exact shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Show one adult hand holding the product naturally so its everyday size and scale are immediately clear. Place the scene within {{background}}, keeping the product fully visible, sharply focused, and unobstructed by the hand.

Use realistic skin texture, believable hand anatomy, soft diffused light, authentic material reflections, subtle environmental shadows, and {{mood}} colour grading. Keep the background softly out of focus and let the product remain the clear focal point.

Compose for {{ratio}}. Do not add text, logos, watermarks, duplicate products, extra hands, jewellery, clutter, distorted fingers, changed packaging, or altered product details.`,
  },
  {
    n: "10",
    id: "warm-home-editorial",
    title: "Home Lifestyle Product Photography AI Prompt",
    note: "Sunlit home editorial product scene",
    description:
      "Product photography AI prompts for a sunlit home scene: place your product in a warm editorial interior from one photo. Free to copy for Gemini.",
    intent: "Change background",
    mood: "Warm golden neutral",
    background:
      "Sunlit pale-oak table with soft cream linen curtains and a small blurred dried-flower arrangement",
    changes: ["Background", "Home staging", "Lighting", "Color mood"],
    height: 340,
    template: `Transform {{subject}} into a warm, elevated home editorial product photograph while preserving its exact shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Stage the product naturally within {{background}}. Keep it fully visible as the clear focal point, with only a few soft, restrained home details placed in the distant background for atmosphere.

Use natural window light, gentle environmental shadows, realistic tactile materials, a refined shallow depth of field, and {{mood}} colour grading. The result should feel inviting, premium, and photorealistic rather than overly staged.

Compose for {{ratio}}. Do not add text, logos, watermarks, hands, people, duplicate products, unrelated clutter, distorted geometry, or changed product details.`,
  },
];

/**
 * Product templates 1–10 from products_images/product_image_templates.md
 * Preserve toggles: keepClothing → Product details & genuine packaging;
 * keepPose → Camera angle & framing.
 */
export const seedProductStyles: CatalogStyle[] = products.map((item, index) => ({
  id: item.id,
  title: item.title,
  category: "Product and objects",
  subject: "Product or object",
  intent: item.intent,
  requirement: "One photo",
  tool: "ChatGPT Image",
  note: item.note,
  height: item.height,
  saved: 90 - index,
  source: asset(`source-${item.n}.png`),
  result: asset(`result-${item.n}.png`),
  status: "published",
  targetSourcePhoto: "One clear product photo with clean edges and visible packaging",
  description: item.description,
  bestSourcePhoto: [
    "Product fully in frame",
    "Clean visible edges",
    "Labels readable when present",
    "Original image should not be blurry",
  ],
  changes: item.changes,
  stays: [
    "Product shape",
    "Proportions",
    "Materials and finish",
    "Original colour",
    "Packaging and labels",
  ],
  examplePairs: evidence(
    item.n,
    `Source product for ${item.title}`,
    `${item.title} result`,
  ),
  promptVariant: {
    id: `${item.id}-v1`,
    version: "1.0.0",
    tool: "ChatGPT Image",
    mode: "Image edit / transform with uploaded photo",
    inputImageCount: 1,
    inputImageRoles: ["source photo"],
    template: item.template,
    defaults: {
      mood: item.mood,
      background: item.background,
      ratio: "4:5 Portrait",
      ...productPreserve,
    },
    lastVerified: "2026-09-26",
    limitations: [
      "Transparent packaging can confuse edges",
      "Busy multi-object source photos are unsupported in this variant",
    ],
  },
}));
