import type { CatalogStyle } from "./types";

const asset = (name: string) => `/catalog/editorial/${name}`;

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

const nonePreserve = {
  keepClothing: false,
  keepPose: false,
} as const;

/**
 * Templates 1–9 from prompts/template(1-9).md
 * Mapped: source-NN → template N → result-NN
 * (source-01 and source-06 share the same person photo.)
 */
export const seedEditorialStyles: CatalogStyle[] = [
  {
    id: "south-asian-fashion-editorial",
    title: "South Asian Fashion Editorial",
    category: "Professional portraits",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    tool: "ChatGPT Image",
    note: "Elegant traditional attire and jewellery",
    height: 360,
    saved: 120,
    source: asset("source-01.png"),
    result: asset("result-01.png"),
    status: "published",
    targetSourcePhoto: "One clear frontal or three-quarter portrait",
    description:
      "Transform a portrait into an elegant South Asian fashion editorial with refined traditional attire, jewellery, and luminous cinematic grading.",
    bestSourcePhoto: [
      "One visible face",
      "Good lighting on skin",
      "Face not heavily obscured",
      "Original image should not be blurry",
    ],
    changes: ["Outfit and jewellery", "Background", "Color mood", "Hair and styling"],
    stays: ["Face and identity", "Facial features", "Natural skin texture", "Likeness"],
    examplePairs: evidence(
      "01",
      "Source portrait for South Asian editorial",
      "South Asian fashion editorial result",
    ),
    promptVariant: {
      id: "south-asian-fashion-editorial-v1",
      version: "1.0.0",
      tool: "ChatGPT Image",
      mode: "Image edit / transform with uploaded photo",
      inputImageCount: 1,
      inputImageRoles: ["source photo"],
      template: `Transform the uploaded {{subject}} into an elegant South Asian fashion editorial portrait, preserving their identity, facial features, natural skin texture, and {{preserve}}.

Style the subject in refined traditional attire with delicate embroidery, statement jewellery, fresh jasmine flowers, softly styled hair, and a graceful posed expression. Use {{mood}} color grading, luminous cinematic highlights, realistic fabric texture, and a nostalgic film finish. Create gentle lateral motion in the surroundings while keeping the face, hair, outfit, jewellery, and hands crisp.

Place the scene in {{background}} with a soft, premium editorial atmosphere. Do not add extra people, text, logos, watermarks, artificial skin, altered identity, or distorted fingers. Compose for {{ratio}} without awkwardly cropping the face, hairstyle, outfit details, or hands.`,
      defaults: {
        mood: "Warm neutral with luminous gold highlights",
        background: "Upscale softly blurred interior with lateral motion blur",
        ratio: "4:5 Portrait",
        ...nonePreserve,
      },
      lastVerified: "2026-09-23",
      limitations: [
        "Jewellery and embroidery detail may vary",
        "Very tight head crops leave little room for outfit framing",
      ],
    },
  },
  {
    id: "urban-street-fashion-editorial",
    title: "Urban Street Fashion Editorial",
    category: "Cinematic",
    subject: "Person",
    intent: "Full scene transformation",
    requirement: "One photo",
    tool: "ChatGPT Image",
    note: "High-fashion city look with motion blur",
    height: 350,
    saved: 118,
    source: asset("source-02.png"),
    result: asset("result-02.png"),
    status: "published",
    targetSourcePhoto: "Clear portrait suitable for a three-quarter fashion crop",
    description:
      "Restyle a portrait into a high-fashion urban editorial with dark streetwear, cinematic contrast, and a moving blurred crowd.",
    bestSourcePhoto: [
      "One visible face",
      "Subject facing camera or three-quarter",
      "Even facial lighting",
      "Original image should not be blurry",
    ],
    changes: ["Outfit", "Background crowd", "Color mood", "Atmosphere"],
    stays: ["Face and identity", "Facial features", "Natural skin texture", "Likeness"],
    examplePairs: evidence(
      "02",
      "Source portrait for urban editorial",
      "Urban street fashion editorial result",
    ),
    promptVariant: {
      id: "urban-street-fashion-editorial-v1",
      version: "1.0.0",
      tool: "ChatGPT Image",
      mode: "Image edit / transform with uploaded photo",
      inputImageCount: 1,
      inputImageRoles: ["source photo"],
      template: `Transform the uploaded {{subject}} into a high-fashion urban editorial portrait, preserving their identity, facial features, natural skin texture, and {{preserve}}.

Dress the subject in refined dark streetwear with subtle sunglasses and a confident three-quarter pose. Create a cinematic scene with a sharply focused subject surrounded by anonymous passersby moving in natural lateral motion blur. Use {{mood}} color grading, deep editorial contrast, subtle film grain, and premium fashion-photography detail.

Interpret {{background}} as a sophisticated city or street-style setting while keeping the subject clear and central. Do not add readable text, logos, watermarks, extra focal people, artificial skin, or distorted hands. Compose for {{ratio}} with the face and outfit comfortably framed.`,
      defaults: {
        mood: "Deep charcoal, black, and warm amber",
        background: "Dark luxury urban interior with a moving blurred crowd",
        ratio: "4:5 Portrait",
        ...nonePreserve,
      },
      lastVerified: "2026-09-23",
      limitations: [
        "Sunglasses may partially hide eye detail",
        "Crowd motion blur can vary between generations",
      ],
    },
  },
  {
    id: "joyful-outdoor-lifestyle",
    title: "Joyful Outdoor Lifestyle",
    category: "Cinematic",
    subject: "Person",
    intent: "Artistic restyle",
    requirement: "One photo",
    tool: "ChatGPT Image",
    note: "Bright candid outdoor portrait with confetti",
    height: 340,
    saved: 115,
    source: asset("source-03.png"),
    result: asset("result-03.png"),
    status: "published",
    targetSourcePhoto: "Clear outdoor-friendly portrait with visible face",
    description:
      "Turn a portrait into a joyful outdoor lifestyle editorial with light clothing, a notebook prop, and soft celebratory confetti.",
    bestSourcePhoto: [
      "One visible face",
      "Natural expression preferred",
      "Hands not covering the face",
      "Original image should not be blurry",
    ],
    changes: ["Outfit", "Background", "Props", "Color mood"],
    stays: ["Face and identity", "Facial features", "Natural skin texture", "Likeness"],
    examplePairs: evidence(
      "03",
      "Source portrait for outdoor lifestyle",
      "Joyful outdoor lifestyle result",
    ),
    promptVariant: {
      id: "joyful-outdoor-lifestyle-v1",
      version: "1.0.0",
      tool: "ChatGPT Image",
      mode: "Image edit / transform with uploaded photo",
      inputImageCount: 1,
      inputImageRoles: ["source photo"],
      template: `Transform the uploaded {{subject}} into a joyful outdoor lifestyle editorial portrait, preserving their identity, facial features, natural skin texture, and {{preserve}}.

Style the subject in relaxed light-toned clothing, holding a simple hardbound notebook or book, with sparse colorful confetti floating naturally around them. Give the portrait an optimistic, candid expression, soft background depth, realistic clothing texture, and cinematic editorial polish. Use {{mood}} color grading with natural highlights and a gentle film-like finish.

Build the setting from {{background}} while retaining a fresh celebratory atmosphere. Do not add text, logos, watermarks, extra focal people, artificial skin, or distorted hands. Compose for {{ratio}} without cropping the face, book, or hands awkwardly.`,
      defaults: {
        mood: "Sunlit warm gold with fresh natural greens",
        background:
          "Bright outdoor park with mature trees and colorful floating confetti",
        ratio: "4:5 Portrait",
        ...nonePreserve,
      },
      lastVerified: "2026-09-23",
      limitations: [
        "Book and hand placement may shift slightly",
        "Confetti density can vary",
      ],
    },
  },
  {
    id: "vintage-pulp-comic-hero",
    title: "Vintage Pulp Comic Hero",
    category: "Vintage",
    subject: "Person",
    intent: "Artistic restyle",
    requirement: "One photo",
    tool: "ChatGPT Image",
    note: "Retro comic-book illustration treatment",
    height: 370,
    saved: 112,
    source: asset("source-04.png"),
    result: asset("result-04.png"),
    status: "published",
    targetSourcePhoto: "Clear portrait with a strong facial silhouette",
    description:
      "Illustrate a portrait as an original vintage pulp-comic hero with bold ink, halftone shading, and a retro roadside scene.",
    bestSourcePhoto: [
      "One visible face",
      "Clear facial contours",
      "Subject not heavily cropped",
      "Original image should not be blurry",
    ],
    changes: ["Art medium", "Outfit", "Background", "Print color treatment"],
    stays: ["Recognisable identity", "Facial features", "Natural complexion", "Likeness"],
    examplePairs: evidence(
      "04",
      "Source portrait for pulp comic hero",
      "Vintage pulp comic hero result",
    ),
    promptVariant: {
      id: "vintage-pulp-comic-hero-v1",
      version: "1.0.0",
      tool: "ChatGPT Image",
      mode: "Image edit / transform with uploaded photo",
      inputImageCount: 1,
      inputImageRoles: ["source photo"],
      template: `Transform the uploaded {{subject}} into an original vintage pulp-comic hero illustration, preserving their recognisable identity, facial features, natural complexion, and {{preserve}}.

Illustrate the subject in a classic leather jacket over a simple shirt, posed confidently in a retro roadside setting with a vintage car and diner-inspired architecture. Use bold ink contours, halftone shading, crosshatching, weathered-paper texture, and {{mood}} print-color treatment. Keep the artwork polished, dramatic, and clearly illustrated rather than photorealistic.

Adapt the scene around {{background}} while keeping the subject as the central comic-book hero. Do not add any titles, captions, speech bubbles, logos, barcodes, watermark, or readable signage. Compose for {{ratio}} with clean framing and natural-looking hands.`,
      defaults: {
        mood: "Vintage teal, burnt orange, cream, and faded sepia",
        background: "Retro roadside diner at sunset with a classic red car",
        ratio: "4:5 Portrait",
        ...nonePreserve,
      },
      lastVerified: "2026-09-23",
      limitations: [
        "Illustration style softens photo-real skin detail by design",
        "Background signage must stay unreadable",
      ],
    },
  },
  {
    id: "intimate-cinematic-portrait",
    title: "Intimate Cinematic Portrait",
    category: "Cinematic",
    subject: "Person",
    intent: "Change lighting",
    requirement: "One photo",
    tool: "ChatGPT Image",
    note: "Quiet indie-film seated portrait",
    height: 345,
    saved: 110,
    source: asset("source-05.png"),
    result: asset("result-05.png"),
    status: "published",
    targetSourcePhoto: "Clear portrait that can crop to a seated three-quarter",
    description:
      "Restyle a portrait into an intimate cinematic editorial with filtered side light, reflective mood, and a quiet studio atmosphere.",
    bestSourcePhoto: [
      "One visible face",
      "Soft or even lighting preferred",
      "Face not hidden by hands",
      "Original image should not be blurry",
    ],
    changes: ["Lighting", "Background", "Color mood", "Wardrobe layers"],
    stays: ["Face and identity", "Facial features", "Natural skin texture", "Likeness"],
    examplePairs: evidence(
      "05",
      "Source portrait for intimate cinematic",
      "Intimate cinematic portrait result",
    ),
    promptVariant: {
      id: "intimate-cinematic-portrait-v1",
      version: "1.0.0",
      tool: "ChatGPT Image",
      mode: "Image edit / transform with uploaded photo",
      inputImageCount: 1,
      inputImageRoles: ["source photo"],
      template: `Transform the uploaded {{subject}} into an intimate, thoughtful cinematic editorial portrait, preserving their identity, facial features, natural skin texture, and {{preserve}}.

Style the subject in relaxed dark layers over a simple light shirt, seated calmly with a reflective expression and one hand resting near the face. Use {{mood}} color grading, filtered side lighting, gentle film grain, realistic clothing texture, and a quiet indie-film atmosphere. Keep the face and hands crisp with soft depth in the surrounding details.

Use {{background}} as a creative studio or reading-room-inspired setting with subtle framed art and books. Do not add text, logos, watermarks, extra people, artificial skin, or distorted fingers. Compose for {{ratio}} with a balanced seated portrait crop.`,
      defaults: {
        mood: "Muted espresso, charcoal, and warm amber",
        background: "Dim artist studio or reading room beside a textured window",
        ratio: "4:5 Portrait",
        ...nonePreserve,
      },
      lastVerified: "2026-09-23",
      limitations: [
        "Hand-near-face pose may differ slightly from the source pose",
        "Window light direction can vary",
      ],
    },
  },
  {
    id: "travel-fashion-bouquet",
    title: "Travel Fashion Bouquet",
    category: "Travel",
    subject: "Person",
    intent: "Full scene transformation",
    requirement: "One photo",
    tool: "ChatGPT Image",
    note: "Golden-hour travel fashion with wildflowers",
    height: 355,
    saved: 108,
    source: asset("source-06.png"),
    result: asset("result-06.png"),
    status: "published",
    targetSourcePhoto: "Clear portrait with room for a walking crop",
    description:
      "Create a joyful cinematic travel-fashion portrait with flowing summer clothing, a wildflower bouquet, and a romantic old-city street.",
    bestSourcePhoto: [
      "One visible face",
      "Good daylight or window light",
      "Subject not tightly head-cropped",
      "Original image should not be blurry",
    ],
    changes: ["Outfit", "Background", "Props", "Color mood"],
    stays: ["Face and identity", "Facial features", "Natural skin texture", "Likeness"],
    examplePairs: evidence(
      "06",
      "Source portrait for travel fashion",
      "Travel fashion bouquet result",
    ),
    promptVariant: {
      id: "travel-fashion-bouquet-v1",
      version: "1.0.0",
      tool: "ChatGPT Image",
      mode: "Image edit / transform with uploaded photo",
      inputImageCount: 1,
      inputImageRoles: ["source photo"],
      template: `Transform the uploaded {{subject}} into a joyful cinematic travel-fashion portrait, preserving their identity, facial features, natural skin texture, and {{preserve}}.

Style the subject in a softly flowing light summer outfit, holding a loose bouquet of delicate wildflowers with natural green stems. Give them a genuine happy expression, naturally windblown hair, and a walking or lightly running pose. Use {{mood}} color grading, realistic fabric movement, soft background depth, and elegant editorial-film detail.

Build the scene around {{background}} with a romantic old-city-street feeling and softly blurred anonymous pedestrians where appropriate. Do not add text, logos, watermarks, extra focal people, artificial skin, or distorted fingers. Compose for {{ratio}} without awkwardly cropping the face, bouquet, hair, or hands.`,
      defaults: {
        mood: "Luminous golden-hour warmth",
        background:
          "Historic European-style cobblestone city street with soft café details",
        ratio: "4:5 Portrait",
        ...nonePreserve,
      },
      lastVerified: "2026-09-23",
      limitations: [
        "Bouquet and hand detail may vary",
        "Hair motion can differ from the source photo",
      ],
    },
  },
  {
    id: "dark-crowd-editorial",
    title: "Dark Crowd Editorial",
    category: "Cinematic",
    subject: "Person",
    intent: "Full scene transformation",
    requirement: "One photo",
    tool: "ChatGPT Image",
    note: "Sharp subject in a blurred night crowd",
    height: 350,
    saved: 106,
    source: asset("source-07.png"),
    result: asset("result-07.png"),
    status: "published",
    targetSourcePhoto: "Clear three-quarter portrait with visible face",
    description:
      "Place a portrait in a dark cinematic crowd scene with a hooded jacket, dramatic contrast, and heavy motion blur around anonymous passersby.",
    bestSourcePhoto: [
      "One visible face",
      "Face turned toward camera",
      "Even exposure on features",
      "Original image should not be blurry",
    ],
    changes: ["Outfit", "Background crowd", "Color mood", "Atmosphere"],
    stays: ["Face and identity", "Facial features", "Natural skin texture", "Likeness"],
    examplePairs: evidence(
      "07",
      "Source portrait for dark crowd editorial",
      "Dark crowd editorial result",
    ),
    promptVariant: {
      id: "dark-crowd-editorial-v1",
      version: "1.0.0",
      tool: "ChatGPT Image",
      mode: "Image edit / transform with uploaded photo",
      inputImageCount: 1,
      inputImageRoles: ["source photo"],
      template: `Transform the uploaded {{subject}} into a dark cinematic crowd portrait, preserving their identity, facial features, natural skin texture, and {{preserve}}.

Dress the subject in a distinctive hooded jacket with a calm three-quarter pose, turning their face toward the camera. Keep the subject sharply focused while anonymous people move around them in strong natural motion blur. Use {{mood}} color grading, dramatic editorial contrast, subtle film grain, and rich realistic jacket texture.

Interpret {{background}} as a dense urban crowd environment while keeping the subject visually separate and central. Do not add text, logos, watermarks, readable signs, extra focal people, artificial skin, or distorted hands. Compose for {{ratio}} with the face and jacket clearly visible.`,
      defaults: {
        mood: "Deep teal shadows with burnt-orange highlights",
        background: "Dense dark city crowd at blue hour with heavy motion blur",
        ratio: "4:5 Portrait",
        ...nonePreserve,
      },
      lastVerified: "2026-09-23",
      limitations: [
        "Hood shape and jacket texture may vary",
        "Crowd blur intensity can differ between runs",
      ],
    },
  },
  {
    id: "south-asian-editorial-collage",
    title: "South Asian Editorial Collage",
    category: "Professional portraits",
    subject: "Person",
    intent: "Artistic restyle",
    requirement: "One photo",
    tool: "ChatGPT Image",
    note: "Three-panel traditional editorial collage",
    height: 380,
    saved: 104,
    source: asset("source-08.png"),
    result: asset("result-08.png"),
    status: "published",
    targetSourcePhoto: "Clear portrait with visible eyes and face",
    description:
      "Create a vertical three-panel South Asian editorial collage with consistent identity, traditional styling, and cinematic window light.",
    bestSourcePhoto: [
      "One visible face",
      "Eyes clearly visible",
      "Even lighting preferred",
      "Original image should not be blurry",
    ],
    changes: ["Outfit and jewellery", "Multi-panel layout", "Background", "Color mood"],
    stays: ["Face and identity", "Facial features", "Natural skin texture", "Likeness"],
    examplePairs: evidence(
      "08",
      "Source portrait for editorial collage",
      "South Asian editorial collage result",
    ),
    promptVariant: {
      id: "south-asian-editorial-collage-v1",
      version: "1.0.0",
      tool: "ChatGPT Image",
      mode: "Image edit / transform with uploaded photo",
      inputImageCount: 1,
      inputImageRoles: ["source photo"],
      template: `Transform the uploaded {{subject}} into one vertical three-panel South Asian editorial collage, preserving their identity, facial features, natural skin texture, and {{preserve}} consistently across every panel.

Create exactly three horizontal panels: a close portrait resting the cheek on one hand, an extreme close-up of the same eyes and brows, and a wider portrait showing traditional clothing and jewellery. Style the subject with an embroidered light-toned outfit, patterned drape, small bindi, ornate earrings, and stacked bangles. Use {{mood}} color grading, cinematic side light, realistic pores, detailed fabric, and thin dark dividers between panels.

Use {{background}} consistently behind all three panels with a soft window-lit editorial atmosphere. Do not add text, logos, watermarks, carousel dots, a fourth panel, artificial skin, altered identity, or distorted fingers. Compose the full collage for {{ratio}}.`,
      defaults: {
        mood: "Rich amber-gold with deep brown shadows",
        background: "Dark indoor room with strong late-afternoon window shadows",
        ratio: "4:5 Portrait",
        ...nonePreserve,
      },
      lastVerified: "2026-09-23",
      limitations: [
        "Panel crop ratios can vary slightly",
        "Jewellery detail may differ across panels",
      ],
    },
  },
  {
    id: "analog-street-fashion",
    title: "Analog Street Fashion",
    category: "Vintage",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    tool: "ChatGPT Image",
    note: "Candid film-look street fashion walk",
    height: 360,
    saved: 102,
    source: asset("source-09.png"),
    result: asset("result-09.png"),
    status: "published",
    targetSourcePhoto: "Clear portrait with space for a walking full/half-body crop",
    description:
      "Restyle a portrait into a candid analog street-fashion walk with roses, soft daylight flare, and gentle film grain.",
    bestSourcePhoto: [
      "One visible face",
      "Subject not tightly head-cropped",
      "Natural daylight preferred",
      "Original image should not be blurry",
    ],
    changes: ["Outfit and accessories", "Background", "Props", "Film texture"],
    stays: ["Face and identity", "Facial features", "Natural skin texture", "Likeness"],
    examplePairs: evidence(
      "09",
      "Source portrait for analog street fashion",
      "Analog street fashion result",
    ),
    promptVariant: {
      id: "analog-street-fashion-v1",
      version: "1.0.0",
      tool: "ChatGPT Image",
      mode: "Image edit / transform with uploaded photo",
      inputImageCount: 1,
      inputImageRoles: ["source photo"],
      template: `Transform the uploaded {{subject}} into a candid analog street-fashion portrait, preserving their identity, facial features, natural skin texture, and {{preserve}}.

If clothing is not preserved, style the subject in a simple elegant black outfit with a delicate pearl necklace, a rich red shoulder bag, and a bouquet of deep red roses wrapped in natural brown paper. Create a carefree walking pose with eyes gently closed or lifted toward the light, a relaxed happy expression, and naturally moving hair.

Apply {{mood}} color grading, soft daylight flare, realistic film grain, subtle vintage-camera texture, and gentle directional motion blur around the surroundings while keeping the subject’s face, bouquet, and outfit crisp. Build the scene from {{background}}, interpreted as a lively urban street with soft anonymous movement and natural depth.

Do not add phone lock-screen elements, time, date, text, logos, watermarks, UI icons, or distorted hands. Compose for {{ratio}} without awkwardly cropping the face, bag, bouquet, or hands.`,
      defaults: {
        mood: "Soft sunlit analog warmth with a slightly faded film look",
        background:
          "Tree-lined city street with parked cars and subtle street motion blur",
        ratio: "4:5 Portrait",
        ...nonePreserve,
      },
      lastVerified: "2026-09-23",
      limitations: [
        "Bouquet and bag placement may vary",
        "Walking pose will differ from a static source pose",
      ],
    },
  },
];
