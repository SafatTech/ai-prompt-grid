import type { CatalogStyle } from "./types";

/**
 * Prefer Supabase catalog-public WebPs (uploaded by db:seed).
 * Falls back to local /catalog only when the public Supabase URL is unset.
 */
function asset(name: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const stem = name.replace(/\.[^.]+$/, "");
  if (base) {
    return `${base}/storage/v1/object/public/catalog-public/seed/catalog/editorial/${stem}.webp`;
  }
  return `/catalog/editorial/${name}`;
}

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

type HalloweenSeed = {
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
  stays: string[];
  height: number;
  keepClothing: boolean;
  keepPose: boolean;
};

const halloween: HalloweenSeed[] = [
  {
    n: "31",
    id: "cozy-pumpkin-patch-portrait",
    title: "Cozy Pumpkin Patch Portrait",
    note: "Warm autumn portrait among pumpkins",
    description:
      "Turn a portrait into a cozy autumn pumpkin-patch scene with a chunky cream knit sweater, golden-hour light, and a warm Halloween feel.",
    intent: "New outfit or theme",
    mood: "Warm golden",
    background: "Pumpkin patch",
    keepClothing: false,
    keepPose: false,
    changes: ["Outfit", "Pose", "Background", "Seasonal props", "Lighting"],
    stays: ["Face and identity", "Facial features", "Hairstyle", "Skin tone"],
    height: 340,
    template: `Transform the uploaded {{subject}} into a cozy autumn portrait set in a festive Halloween scene that feels warm and inviting rather than scary. Use the person from the source image as the main subject, and preserve their identity, facial features, hairstyle, and skin tone. Preserve their {{preserve}} when provided.

If clothing is not being preserved, dress the subject in a chunky cream knit sweater. If pose is not being preserved, place the subject sitting naturally on a hay bale with a relaxed posture and a gentle natural smile. Surround the subject with pumpkins in a charming seasonal setting.

Apply {{mood}} color grading with warm low sunlight coming from behind the subject, soft golden-hour glow, flattering skin tones, and soft background blur for a polished portrait look. Build the environment from {{background}}, interpreted as a pumpkin patch scene with clean composition, autumn atmosphere, and softly blurred depth behind the subject. Do not add horror elements, gore, monsters, text, logos, or extra people. Compose for {{ratio}} without awkwardly cropping the face, hair, hands, sweater, or pumpkins.`,
  },
  {
    n: "32",
    id: "recognizable-zombie-portrait",
    title: "Recognizable Zombie Portrait",
    note: "Spooky zombie styling that keeps your face",
    description:
      "Restyle a portrait into a spooky but recognizable zombie look with pale skin, torn clothing, and a foggy abandoned street at night.",
    intent: "Artistic restyle",
    mood: "Eerie cool",
    background: "Abandoned street at night",
    keepClothing: false,
    keepPose: true,
    changes: ["Skin treatment", "Outfit", "Background", "Atmosphere"],
    stays: ["Face and identity", "Face shape", "Eyes", "Hairline", "Pose"],
    height: 335,
    template: `Transform the uploaded {{subject}} into a spooky Halloween zombie portrait while keeping the subject clearly recognizable. Preserve their identity, same face shape, eyes, hairline, facial structure, and key features. Preserve their {{preserve}} when provided.

Apply realistic zombie styling with pale greyish skin, dark under-eye circles, subtly desaturated tones, and a few light scratches or weathered details on the skin while keeping the look spooky rather than extreme. If clothing is not being preserved, replace the outfit with torn, dirty, aged clothing that feels eerie and abandoned but not overly dramatic. If pose is not being preserved, use a still, slightly tense, cinematic portrait pose that suits a Halloween photo.

Build the setting from {{background}}, interpreted as a foggy abandoned street at night with a flickering streetlight, moody atmosphere, soft mist, and cinematic depth. Apply {{mood}} color grading to enhance the unsettling nighttime feel while keeping the subject’s face readable and detailed. Do not add blood, open wounds, gore, dismemberment, extra people, text, logos, or comedy elements. Compose for {{ratio}} without awkwardly cropping the face, hair, hands, or key costume details.`,
  },
  {
    n: "33",
    id: "friendly-glowing-witch-portrait",
    title: "Friendly Glowing Witch Portrait",
    note: "Charming witch with a magical glowing hand",
    description:
      "Transform a portrait into a friendly Halloween witch with a tall black hat, dark green velvet dress, and a soft magical glow from one hand.",
    intent: "New outfit or theme",
    mood: "Warm magical",
    background: "Cozy cottage kitchen",
    keepClothing: false,
    keepPose: false,
    changes: ["Outfit", "Pose", "Magical glow", "Background", "Lighting"],
    stays: ["Face and identity", "Facial features", "Hairstyle", "Skin tone"],
    height: 345,
    template: `Transform the uploaded {{subject}} into a charming Halloween witch portrait with a magical but friendly feel. Use the person from the source image as the main subject, and preserve their identity, facial features, hairstyle, and skin tone. Preserve their {{preserve}} when provided.

If clothing is not being preserved, dress the subject in a tall black pointed witch hat and a dark green velvet dress with elegant seasonal styling. If pose is not being preserved, give the subject a poised, friendly witch pose with one hand raised and a soft green magical glow coming from that hand, while maintaining a natural and appealing portrait look.

Build the environment from {{background}}, interpreted as a cozy cottage kitchen filled with hanging herbs, glass jars, rustic details, and a bubbling cauldron. Apply {{mood}} color grading with warm firelight, soft magical atmosphere, flattering light on the face, and a gentle fantasy glow that enhances the Halloween mood without becoming dark or scary. Do not add horror gore, monsters, extra people, text, logos, or distorted hands. Compose for {{ratio}} without awkwardly cropping the face, hat, glowing hand, dress, or key background details.`,
  },
  {
    n: "34",
    id: "elegant-gothic-vampire-portrait",
    title: "Elegant Gothic Vampire Portrait",
    note: "Refined vampire look in a candlelit library",
    description:
      "Restyle a portrait into an elegant gothic vampire with a black velvet high-collar coat, subtle pale complexion, and a candlelit library setting.",
    intent: "New outfit or theme",
    mood: "Moody gothic",
    background: "Candlelit gothic library",
    keepClothing: false,
    keepPose: false,
    changes: ["Outfit", "Makeup", "Background", "Lighting", "Atmosphere"],
    stays: [
      "Face and identity",
      "Face shape",
      "Eyes, nose, and lips",
      "Skin tone",
      "Natural skin texture",
    ],
    height: 350,
    template: `Transform the uploaded {{subject}} into an elegant gothic vampire portrait while keeping the subject clearly recognizable. Use the person from the source image as the main subject, and preserve their identity, exact face shape, eyes, nose, lips, skin tone, and natural skin texture. Preserve their {{preserve}} when provided. Do not make the subject look like a different person.

If clothing is not being preserved, dress the subject in a refined black velvet high-collar coat with deep crimson silk lining and a vintage cameo brooch fastened at the throat. If pose is not being preserved, compose the subject as a poised chest-up portrait with a calm, elegant, slightly mysterious expression and sharp focus on the eyes.

Apply a polished vampire treatment with a softly pale complexion, subtle dark under-eye shadow, and dark red lips while keeping the result sophisticated rather than monstrous. Only show a faint glint of fangs if the mouth is slightly open; otherwise keep the lips closed and natural. Build the environment from {{background}}, interpreted as a candlelit gothic library with old books, rich shadowy atmosphere, and warm candlelight falling from the side. Apply {{mood}} color grading to create deep shadows, dramatic contrast, and a luxurious gothic mood without adding gore, blood, extra people, text, or logos. Compose for {{ratio}} as a chest-up portrait without awkwardly cropping the hair, collar, brooch, or face.`,
  },
  {
    n: "35",
    id: "skeleton-face-paint-portrait",
    title: "Skeleton Face Paint Portrait",
    note: "Realistic skeleton makeup on your face",
    description:
      "Add detailed skeleton face paint to a portrait while keeping identity, pose, and clothing intact against a plain dark studio background.",
    intent: "Artistic restyle",
    mood: "Soft dramatic",
    background: "Plain dark background",
    keepClothing: true,
    keepPose: true,
    changes: ["Face paint", "Lighting", "Background"],
    stays: [
      "Face and identity",
      "Face shape",
      "Eyes and expression",
      "Hairstyle",
      "Pose",
      "Clothing",
    ],
    height: 330,
    template: `Transform the uploaded {{subject}} into a realistic Halloween makeup portrait by adding detailed skeleton face paint while keeping the subject clearly recognizable. Use the person from the source image as the main subject, and preserve their identity, exact face shape, eyes, hair, expression, and natural facial proportions. Preserve their {{preserve}} when provided.

Apply only a makeup transformation rather than a costume or character replacement. Add a white face-paint base, dark black eye sockets, a black nose outline, stitched skeletal teeth drawn carefully across the lips, and fine crack details at the temples. Keep the subject’s real skin texture visible beneath the makeup so the result feels like authentic applied face paint instead of a mask or full CGI effect.

Build the setting from {{background}}, interpreted as a plain dark studio background with a clean minimal look. Apply {{mood}} color grading with soft studio lighting, controlled shadows, and clear facial detail so the makeup remains the focus. Do not change the hairstyle, facial expression, or identity. Do not add hats, costumes, extra props, horror gore, blood, text, or logos. Compose for {{ratio}} without awkwardly cropping the face, hair, or painted details.`,
  },
];

/**
 * Halloween person templates 31–35 from halloween-templates/halloween Instructions.md
 */
export const seedHalloweenStyles: CatalogStyle[] = halloween.map(
  (item, index) => ({
    id: item.id,
    title: item.title,
    category: "Fantasy",
    subject: "Person",
    intent: item.intent,
    requirement: "One photo",
    tool: "ChatGPT Image",
    note: item.note,
    height: item.height,
    saved: 55 - index,
    source: asset(`source-${item.n}.png`),
    result: asset(`result-${item.n}.png`),
    status: "published",
    targetSourcePhoto: "One clear frontal or three-quarter portrait",
    description: item.description,
    bestSourcePhoto: [
      "One visible face",
      "Good lighting on skin",
      "Face not heavily obscured",
      "Original image should not be blurry",
    ],
    changes: item.changes,
    stays: item.stays,
    examplePairs: evidence(
      item.n,
      `Source portrait for ${item.title}`,
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
        keepClothing: item.keepClothing,
        keepPose: item.keepPose,
      },
      lastVerified: "2026-10-03",
      limitations: [
        "Heavy face occlusion can weaken makeup or costume fidelity",
        "Extreme crops leave little room for costume or prop framing",
      ],
    },
  }),
);
