import type { CatalogStyle } from "./types";

const asset = (name: string) => `/catalog/pet/${name}`;

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

/** Pet preserve: identity + pose both ON. */
const petPreserve = {
  keepClothing: true,
  keepPose: true,
} as const;

type PetSeed = {
  n: string;
  id: string;
  title: string;
  category: string;
  note: string;
  description: string;
  intent: CatalogStyle["intent"];
  mood: string;
  background: string;
  template: string;
  changes: string[];
  height: number;
};

const pets: PetSeed[] = [
  {
    n: "01",
    id: "cute-3d-toon-pet",
    title: "Cute 3D Toon Pet",
    category: "3D avatars",
    note: "Polished expressive 3D animated pet character",
    description:
      "Transform the pet into a polished, expressive 3D animated character with soft detailed fur and cinematic family-animation lighting while retaining recognizable identity.",
    intent: "Artistic restyle",
    mood: "Warm cheerful",
    background: "Cozy softly lit home interior",
    changes: ["Art style", "Fur rendering", "Lighting", "Background"],
    height: 330,
    template: `Transform the uploaded {{subject}} into a polished, expressive 3D animated pet character while preserving {{preserve}} so the animal remains immediately recognizable from the original image.

Recreate the pet with beautifully groomed dimensional fur, clean stylized shapes, softly rounded features, subtly enlarged expressive eyes, refined whiskers, and appealing animated-character proportions. Keep the transformation cute and premium rather than excessively exaggerated, maintaining the pet’s natural species, breed characteristics, fur colors, patterns, facial structure, eye color, ears, nose, and other recognizable features.

Use {{mood}} to control the overall color treatment and emotional atmosphere. Render the character with cinematic soft lighting, gentle rim light, realistic global illumination, rich but natural color, soft highlights in the eyes, subtle depth of field, and high-quality 3D animated-film rendering.

Build the scene using {{background}}, adapting the environment into a softly stylized 3D setting that complements the pet without distracting from it. Keep background objects simplified and softly defocused so the pet remains the clear visual focus.

Maintain a friendly, charming, family-animation feel with expressive but believable facial features. Avoid changing the animal into a different breed or species, replacing distinctive markings, excessively enlarging the head or eyes, creating plastic-looking fur, adding human anatomy, clothing unless naturally required by the input, extra limbs, malformed paws, text, logos, or watermarks.

Compose the final image for {{ratio}}, keeping the pet comfortably framed and ensuring important features such as the ears, face, paws, and tail are not awkwardly cropped.`,
  },
  {
    n: "02",
    id: "hand-painted-watercolor-pet",
    title: "Hand-Painted Watercolor Pet",
    category: "Painting",
    note: "Soft watercolor pet portrait on paper",
    description:
      "Transform the pet into a soft handcrafted watercolor portrait with translucent brushwork, textured paper, and a light botanical backdrop.",
    intent: "Artistic restyle",
    mood: "Soft warm natural",
    background:
      "Minimal white watercolor paper with delicate green botanical foliage and soft pigment splashes",
    changes: ["Art medium", "Brush texture", "Background", "Color mood"],
    height: 335,
    template: `Transform the uploaded {{subject}} into a delicate hand-painted watercolor portrait while preserving {{preserve}} so the pet remains immediately recognizable.

Render the pet using translucent watercolor washes, layered pigment, soft dry-brush details, subtle edge bleeding, natural tonal variation, and visible watercolor-paper texture. Preserve the pet’s species, breed characteristics, facial structure, fur colors, markings, eye color, ear shape, nose, and other distinctive features while translating the coat into expressive painted brushwork rather than photorealistic fur.

Use {{mood}} to control the overall palette and emotional tone of the artwork. Keep the colors soft, elegant, and naturally blended, with gentle highlights, painterly shadows, and subtle pigment granulation.

Build the scene using {{background}}, interpreted as a minimal watercolor setting with plenty of negative space. Add restrained botanical elements, soft foliage, light pigment blooms, and subtle paint splashes only where they complement the pet without competing with the subject.

Keep the composition refined and suitable for a premium custom pet portrait. Avoid hard digital edges, plastic-looking textures, heavy outlines, excessive saturation, cluttered scenery, extra animals, distorted anatomy, text, logos, or watermarks.

Compose the final artwork for {{ratio}}, keeping the pet’s face, ears, body, paws, and other important features comfortably framed without awkward cropping.`,
  },
  {
    n: "03",
    id: "cozy-plushie-pet",
    title: "Cozy Plushie Pet",
    category: "3D avatars",
    note: "Handcrafted plush-toy pet makeover",
    description:
      "Reimagine the pet as an adorable handcrafted plush toy with soft fuzzy fabric, rounded proportions, and a warm cozy-room setting.",
    intent: "Artistic restyle",
    mood: "Warm cozy pastel",
    background:
      "Cozy softly lit bedroom with blankets, cushions, warm lamps, natural wood and subtle greenery",
    changes: ["Art medium", "Fabric texture", "Background", "Lighting"],
    height: 330,
    template: `Transform the uploaded {{subject}} into an adorable handcrafted plush-toy version while preserving {{preserve}} so the result still clearly resembles the original pet.

Recreate the animal using soft fuzzy fabric, velvety plush fibers, rounded toy-like proportions, gently simplified anatomy, subtle stitched seams, soft padded paws, fabric ears, embroidered or glossy toy-like eyes, and carefully constructed handcrafted details. Preserve the pet’s species, breed characteristics, coat colors, markings, facial pattern, ear shape, and other distinctive identifying features.

Use {{mood}} to define the overall color treatment and emotional atmosphere. Keep the image warm, soft, comforting, and premium, with gentle highlights, diffuse shadows, cozy ambient illumination, and a tactile handcrafted feel.

Build the scene using {{background}}, interpreted as a charming cozy interior with soft blankets, cushions, warm lamps, natural wood accents, subtle greenery, and shallow depth of field. Keep the setting softly blurred so the plush pet remains the visual focus.

Keep the transformation cute and believable as a physical plush toy rather than a cartoon character. Avoid hard plastic surfaces, excessive head enlargement, unrealistic anatomy, extra limbs, distorted paws, overly glossy fur, text, logos, watermarks, or distracting background clutter.

Compose the final image for {{ratio}}, keeping the plush pet comfortably framed with important features such as the ears, face, paws, and body visible without awkward cropping.`,
  },
  {
    n: "04",
    id: "cartoon-animation-pet",
    title: "Cartoon & Animation Pet",
    category: "Anime",
    note: "Polished animated-film pet character",
    description:
      "Transform the pet into a polished animated character with expressive features, clean stylized shapes, and cinematic color.",
    intent: "Artistic restyle",
    mood: "Bright cheerful cinematic",
    background:
      "Lush sunlit animated natural environment with soft foliage and atmospheric depth",
    changes: ["Art style", "Shading", "Background", "Color mood"],
    height: 335,
    template: `Transform the uploaded {{subject}} into a polished cartoon-and-animation character while preserving {{preserve}} so the pet remains immediately recognizable.

Reinterpret the pet with clean stylized shapes, expressive eyes, simplified but accurate anatomy, smooth hand-painted shading, crisp silhouette definition, and richly rendered fur, feathers, scales, or other natural surface details appropriate to the animal. Preserve the pet’s species, breed or type, facial structure, natural colors, markings, eye color, ear or feather shape, and other recognizable traits.

Use {{mood}} to define the overall palette, lighting, and emotional tone. Create a vibrant animated-film look with soft cinematic illumination, gentle highlights, appealing contrast, smooth gradients, subtle depth, and a charming storybook quality.

Build the scene using {{background}}, translating the environment into a colorful animated setting with simplified forms, painterly foliage or scenery, atmospheric depth, and soft background blur so the pet remains the main focus.

Keep the result expressive and premium, balancing hand-drawn animation charm with polished 3D-inspired depth. Avoid extreme caricature, excessive eye enlargement, changing the animal into another species, inaccurate markings, malformed anatomy, extra limbs, text, logos, or watermarks.

Compose the final image for {{ratio}}, keeping important features such as the face, ears, wings, paws, tail, or full silhouette comfortably visible without awkward cropping.`,
  },
  {
    n: "05",
    id: "anime-companion",
    title: "Anime Companion",
    category: "Anime",
    note: "Polished anime companion pet portrait",
    description:
      "Transform the pet into a polished anime companion with expressive features, clean cel shading, and a whimsical storybook environment.",
    intent: "Artistic restyle",
    mood: "Warm adventurous",
    background:
      "Sunlit anime countryside with green fields, trees, distant hills, soft clouds, wildflowers and gentle atmospheric depth",
    changes: ["Art style", "Cel shading", "Background", "Color mood"],
    height: 340,
    template: `Transform the uploaded {{subject}} into a polished anime companion while preserving {{preserve}} so the pet remains clearly recognizable.

Reinterpret the animal with expressive anime-style eyes, clean linework, simplified but accurate anatomy, softly stylized fur, feathers, mane, scales, or other natural surface details, and refined cel shading. Preserve the pet’s species, breed or type, facial structure, natural colors, markings, eye color, ear shape, mane pattern, muzzle shape, and other distinctive identifying features.

Use {{mood}} to control the palette, lighting, and emotional tone. Apply soft cinematic anime lighting, gentle highlights, warm atmospheric glow, smooth cel-shaded transitions, subtle rim light, and a polished illustrated finish.

Build the scene using {{background}}, transforming it into a whimsical anime environment with natural depth, painterly scenery, soft atmospheric perspective, and subtle storytelling details. Keep the environment visually rich but secondary to the pet.

Give the result a charming companion-character feeling, as though the animal belongs in a beautifully animated adventure story. Avoid turning the pet into a human, changing its species, over-exaggerating the eyes, removing distinctive markings, creating malformed anatomy, extra limbs, text, logos, or watermarks.

Compose the final image for {{ratio}}, keeping the face, ears, paws, wings, mane, tail, or other important features comfortably framed without awkward cropping.`,
  },
  {
    n: "06",
    id: "mini-collectible-figure",
    title: "Mini Collectible Figure",
    category: "Product and objects",
    note: "Premium collectible figurine presentation",
    description:
      "Turn the pet into a premium collectible figurine with molded details, miniature proportions, and product-style presentation.",
    intent: "Artistic restyle",
    mood: "Warm premium display",
    background:
      "Clean softly lit collector display setting with a premium wooden base and subtle studio blur",
    changes: ["Figurine form", "Display staging", "Lighting", "Finish"],
    height: 325,
    template: `Transform the uploaded {{subject}} into a premium mini collectible figure while preserving {{preserve}} so the pet remains clearly recognizable.

Reimagine the animal as a high-quality figurine or action-figure-style collectible with miniature proportions, molded surface details, refined sculpted features, a premium painted finish, and a display-worthy toy aesthetic. Preserve the pet’s species, breed or type, facial structure, natural colors, markings, ear shape, eye color, body proportions, and other distinctive identifying features while adapting them into a stylized collectible form.

Use {{mood}} to control the overall palette, lighting, and presentation atmosphere. Render the figure with clean product-style lighting, soft highlights, subtle reflections, gentle shadows, and a premium collector-item feel.

Build the scene using {{background}}, interpreted as a product-display environment or collector showcase. This can include a clean tabletop setup, studio backdrop, display base, or tasteful collector presentation, while keeping the figure as the clear focal point.

Keep the result elegant, polished, and believable as a premium physical collectible. Avoid cheap plastic appearance, distorted anatomy, inaccurate markings, extra limbs, overly exaggerated proportions, cluttered packaging, text, logos, or watermarks.

Compose the final image for {{ratio}}, ensuring the figure, base, and important features such as the face, ears, paws, wings, or tail are comfortably framed without awkward cropping.`,
  },
  {
    n: "07",
    id: "storybook-adventure-pet",
    title: "Storybook Adventure Pet",
    category: "Fantasy",
    note: "Whimsical illustrated adventure companion",
    description:
      "Place the recognizable pet into a whimsical illustrated adventure scene as a charming explorer or fantasy companion.",
    intent: "Full scene transformation",
    mood: "Warm magical adventurous",
    background:
      "Enchanted forest path with flowers, sunlight, a stone bridge, distant castle, and whimsical storybook scenery",
    changes: ["Story styling", "Accessories", "Background", "Atmosphere"],
    height: 345,
    template: `Transform the uploaded {{subject}} into a whimsical storybook adventure character while preserving {{preserve}} so the pet remains clearly recognizable.

Reimagine the pet as the hero of an illustrated adventure scene, such as an explorer, forest traveler, gentle wizard, pirate, astronaut, or fantasy companion. Add tasteful character styling or accessories that support the story while preserving the pet’s species, breed or type, facial structure, natural colors, markings, eye color, fur pattern, and other distinctive identifying features.

Use {{mood}} to define the palette, lighting, and emotional atmosphere. Apply cinematic storybook lighting, warm highlights, atmospheric depth, painterly detail, and a magical sense of adventure.

Build the scene using {{background}}, translating it into an immersive fantasy or adventure environment with scenic storytelling elements such as paths, bridges, forests, castles, stars, rivers, mountains, ruins, or whimsical natural details. Keep the environment visually rich but make sure the pet remains the clear focal point.

Give the result the feeling of a premium illustrated children’s book or fantasy adventure poster, with charm, wonder, and narrative depth. Avoid removing the pet’s recognizable identity, changing it into a different species, creating malformed anatomy, excessive clutter, extra limbs, text, logos, or watermarks.

Compose the final image for {{ratio}}, keeping the pet’s face, body, and any key story accessories comfortably framed without awkward cropping.`,
  },
  {
    n: "08",
    id: "funny-everyday-pet",
    title: "Funny Everyday Pet",
    category: "Pets",
    note: "Humorous everyday lifestyle pet portrait",
    description:
      "Place the recognizable pet into a humorous everyday lifestyle scenario while keeping the animal clearly recognizable and charming.",
    intent: "Full scene transformation",
    mood: "Warm cozy humorous",
    background:
      "Cozy home office desk with a laptop, coffee mug, notebook, warm lamp light, books, and soft greenery",
    changes: ["Scene and props", "Lifestyle staging", "Lighting", "Color mood"],
    height: 335,
    template: `Transform the uploaded {{subject}} into a funny everyday lifestyle portrait while preserving {{preserve}} so the pet remains clearly recognizable.

Place the pet into a playful human-like daily-life situation such as working at a desk, reading a newspaper, drinking coffee, cooking, relaxing in a bath, lounging at a spa, or enjoying another relatable everyday activity. Keep the animal itself visually intact and recognizable rather than turning it into a human. Preserve the pet’s species, breed or type, facial structure, natural colors, markings, shell or fur pattern, eye shape, and other distinctive features.

Use {{mood}} to control the overall palette, lighting, and emotional feel. Keep the result warm, appealing, humorous, and polished, with natural-looking light, clean detail, and a premium lifestyle-portrait finish.

Build the scene using {{background}}, interpreted as a believable everyday environment that supports the joke or character moment. Add fitting props and surroundings—such as a desk, laptop, mug, books, kitchen items, spa elements, newspaper, or home décor—while keeping the pet as the clear focal point.

Make the image feel clever and heartwarming rather than chaotic. The humor should come from the situation and props, not from distorting the animal. Avoid changing the pet into another species, creating malformed anatomy, adding extra limbs, replacing distinctive markings, cluttering the scene excessively, or adding text, logos, or watermarks.

Compose the final image for {{ratio}}, keeping the pet’s face, body, and important scene props comfortably framed without awkward cropping.`,
  },
  {
    n: "09",
    id: "dreamy-memorial-portrait",
    title: "Dreamy Memorial Portrait",
    category: "Pets",
    note: "Soft emotional remembrance pet portrait",
    description:
      "Create a soft, emotional remembrance portrait with peaceful scenery, delicate flowers, and warm natural light while preserving the pet’s likeness.",
    intent: "Artistic restyle",
    mood: "Soft warm peaceful",
    background:
      "Peaceful flower-filled garden with soft golden sunset light, distant misty hills, delicate blossoms, and a faint rainbow",
    changes: ["Atmosphere", "Background", "Lighting", "Memorial styling"],
    height: 340,
    template: `Transform the uploaded {{subject}} into an elegant dreamy memorial portrait while preserving {{preserve}} so the pet remains immediately recognizable.

Keep the pet’s species, breed or type, facial structure, natural colors, markings, eye shape, fur or feather pattern, body proportions, and other distinctive identifying features faithful to the original image. The transformation should enhance the emotional presentation rather than significantly redesign the animal.

Use {{mood}} to define the overall palette, lighting, and emotional atmosphere. Apply soft natural illumination, gentle golden highlights, delicate bloom, subtle haze, shallow depth of field, and a calm luminous finish that feels peaceful, affectionate, and uplifting rather than overly dramatic.

Build the scene using {{background}}, interpreted as a serene remembrance setting with flowers, soft greenery, peaceful scenery, distant landscape, gentle sky light, and subtle ethereal details. Decorative elements such as petals, soft clouds, lantern glow, faint light rays, or a restrained rainbow may be included when they complement the composition without overwhelming the pet.

Keep the memorial treatment tasteful and understated. Avoid heavy fantasy effects, excessive halos, wings unless explicitly requested, dramatic supernatural imagery, gloomy darkness, distorted anatomy, changed markings, extra animals, text, dates, logos, or watermarks.

Compose the final image for {{ratio}}, keeping the pet’s face, body, paws, ears, tail, or other important identifying features comfortably framed without awkward cropping.`,
  },
];

/**
 * Pet templates 1–9 from pets_images/pets-templates.md
 * Preserve toggles: keepClothing → Pet identity and distinctive markings;
 * keepPose → Original pose and composition.
 */
export const seedPetStyles: CatalogStyle[] = pets.map((item, index) => ({
  id: item.id,
  title: item.title,
  category: item.category,
  subject: "Pet",
  intent: item.intent,
  requirement: "One photo",
  tool: "ChatGPT Image",
  note: item.note,
  height: item.height,
  saved: 60 - index,
  source: asset(`source-${item.n}.png`),
  result: asset(`result-${item.n}.png`),
  status: "published",
  targetSourcePhoto: "Clear pet photo with eyes visible and distinctive markings readable",
  description: item.description,
  bestSourcePhoto: [
    "Eyes clearly visible",
    "Full head or body in frame",
    "Distinctive markings readable",
    "Original image should not be blurry",
  ],
  changes: item.changes,
  stays: [
    "Species and breed cues",
    "Facial structure",
    "Fur or feather colors",
    "Distinctive markings",
    "Eye color",
  ],
  examplePairs: evidence(
    item.n,
    `Source pet for ${item.title}`,
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
      ...petPreserve,
    },
    lastVerified: "2026-09-27",
    limitations: [
      "Multi-pet photos are unsupported in this variant",
      "Very dark fur can lose pattern contrast",
    ],
  },
}));
