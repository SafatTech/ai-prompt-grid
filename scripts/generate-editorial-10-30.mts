/**
 * Generates src/lib/catalog/seed-editorial-styles-10-30.ts
 * from scripts/_parsed-templates-10-30.json
 */
import fs from "node:fs";
import path from "node:path";

type Parsed = {
  num: string;
  name: string;
  mood: string;
  background: string;
  ratio: string;
  preserve: string;
  prompt: string;
};

type Meta = {
  category: string;
  intent: string;
  note: string;
  description: string;
  changes: string[];
  height: number;
};

const metaByNum: Record<string, Meta> = {
  "10": {
    category: "Professional portraits",
    intent: "New outfit or theme",
    note: "Champagne-gold saree with golden motion blur",
    description:
      "Transform a portrait into an elegant festive-fashion look with champagne-gold traditional attire and glowing horizontal motion light.",
    changes: ["Outfit and jewellery", "Pose", "Background motion", "Color mood"],
    height: 360,
  },
  "11": {
    category: "Cinematic",
    intent: "Change lighting",
    note: "Monochrome beauty with silver rim light",
    description:
      "Restyle a portrait into an elegant black-and-white beauty image with luminous silver rim light and soft satin styling.",
    changes: ["Lighting", "Color mood", "Outfit", "Background"],
    height: 340,
  },
  "12": {
    category: "Cinematic",
    intent: "Artistic restyle",
    note: "Close floral beauty with crimson rose shadows",
    description:
      "Create an intimate sunlit floral beauty portrait with a crimson rose, baby’s-breath, and dramatic flower-cast shadows.",
    changes: ["Props and flowers", "Lighting", "Outfit", "Color mood"],
    height: 350,
  },
  "13": {
    category: "Professional portraits",
    intent: "Artistic restyle",
    note: "Three-panel floral fashion collage",
    description:
      "Build a romantic three-panel editorial collage with traditional ivory styling, jasmine flowers, and gold jewellery details.",
    changes: ["Multi-panel layout", "Outfit and jewellery", "Flowers", "Color mood"],
    height: 380,
  },
  "14": {
    category: "Cinematic",
    intent: "Artistic restyle",
    note: "Warm amber portrait with a lush bouquet",
    description:
      "Create a warm romantic cinematic portrait with a large rose bouquet, golden rim light, and intimate dark surroundings.",
    changes: ["Props and bouquet", "Lighting", "Outfit", "Color mood"],
    height: 355,
  },
  "15": {
    category: "Vintage",
    intent: "Artistic restyle",
    note: "Pastel scrapbook photo collage",
    description:
      "Arrange a playful scrapbook-style portrait collage with multiple lifestyle crops, torn notes, and soft pastel accents.",
    changes: ["Collage layout", "Outfit", "Paper decorations", "Color mood"],
    height: 390,
  },
  "16": {
    category: "Fantasy",
    intent: "Full scene transformation",
    note: "Dreamy floral selfie with liquid warp",
    description:
      "Turn a portrait into a joyful wide-angle floral selfie surrounded by pink blossoms and flowing environmental warp.",
    changes: ["Pose", "Environment", "Outfit", "Surreal warp"],
    height: 360,
  },
  "17": {
    category: "Cinematic",
    intent: "Change lighting",
    note: "Low-light portrait with a single red rose",
    description:
      "Create an intimate low-light cinematic portrait with warm chiaroscuro lighting and a single crimson rose accent.",
    changes: ["Lighting", "Pose", "Props", "Color mood"],
    height: 345,
  },
  "18": {
    category: "Cinematic",
    intent: "Artistic restyle",
    note: "Sunlit bouquet three-panel story",
    description:
      "Compose a warm nostalgic three-panel portrait story with a bouquet, window shadows, and soft vintage sunlight.",
    changes: ["Multi-panel layout", "Props", "Lighting", "Color mood"],
    height: 375,
  },
  "19": {
    category: "Cinematic",
    intent: "Artistic restyle",
    note: "Monochrome three-panel beauty echo",
    description:
      "Create a timeless high-contrast monochrome three-panel beauty collage with soft studio atmosphere.",
    changes: ["Multi-panel layout", "Lighting", "Color mood", "Styling"],
    height: 375,
  },
  "20": {
    category: "Professional portraits",
    intent: "New outfit or theme",
    note: "Monochrome saree with leaf shadows",
    description:
      "Restyle a portrait into a soft monochrome saree editorial with dramatic natural leaf shadows on a textured wall.",
    changes: ["Outfit", "Lighting and shadows", "Background", "Color mood"],
    height: 350,
  },
  "21": {
    category: "Travel",
    intent: "Full scene transformation",
    note: "Bright outdoor daisy portrait against blue sky",
    description:
      "Create a bright sunlit outdoor editorial with daisy accents, vivid sky, and an airy cinematic color grade.",
    changes: ["Background", "Props", "Outfit", "Color mood"],
    height: 350,
  },
  "22": {
    category: "Professional portraits",
    intent: "Artistic restyle",
    note: "Amber wall-light fashion triptych",
    description:
      "Build a warm amber-brown editorial triptych with strong directional wall light and refined fashion styling.",
    changes: ["Multi-panel layout", "Lighting", "Outfit", "Color mood"],
    height: 375,
  },
  "23": {
    category: "Vintage",
    intent: "Artistic restyle",
    note: "Chibi daydream scrapbook collage",
    description:
      "Arrange a soft lifestyle scrapbook collage with cream paper layers, tilted Polaroids, and warm daylight portraits.",
    changes: ["Collage layout", "Paper layers", "Outfit", "Color mood"],
    height: 390,
  },
  "24": {
    category: "Travel",
    intent: "Full scene transformation",
    note: "Golden-hour boho street storyboard",
    description:
      "Create a warm nostalgic golden-hour lifestyle storyboard on a peaceful tree-lined residential street.",
    changes: ["Multi-panel layout", "Outfit", "Background", "Color mood"],
    height: 385,
  },
  "25": {
    category: "Professional portraits",
    intent: "New outfit or theme",
    note: "Royal blue heritage courtyard storyboard",
    description:
      "Compose a heritage cinematic storyboard with rich royal blue styling in a historic sandstone courtyard.",
    changes: ["Multi-panel layout", "Outfit", "Background", "Color mood"],
    height: 385,
  },
  "26": {
    category: "Cinematic",
    intent: "New outfit or theme",
    note: "Luxurious monochrome evening gloves",
    description:
      "Restyle a portrait into a luxurious monochrome evening look with elegant gloves and soft circular bokeh.",
    changes: ["Outfit and gloves", "Lighting", "Background", "Color mood"],
    height: 350,
  },
  "27": {
    category: "Travel",
    intent: "Full scene transformation",
    note: "Golden-hour twirl street storyboard",
    description:
      "Create a warm golden-hour street storyboard with flowing fabric motion and honey-amber sunlight.",
    changes: ["Multi-panel layout", "Pose and motion", "Outfit", "Color mood"],
    height: 385,
  },
  "28": {
    category: "Travel",
    intent: "Full scene transformation",
    note: "Varanasi sunset riverside voyage",
    description:
      "Transform a portrait into a golden sunset travel-poster scene beside Varanasi-inspired riverside ghats.",
    changes: ["Background", "Lighting", "Outfit", "Color mood"],
    height: 360,
  },
  "29": {
    category: "Professional portraits",
    intent: "Artistic restyle",
    note: "Window-lit triptych with crimson bangles",
    description:
      "Build an intimate three-panel jewellery editorial with white embroidery, crimson bangles, and warm window light.",
    changes: ["Multi-panel layout", "Jewellery", "Outfit", "Lighting"],
    height: 380,
  },
  "30": {
    category: "Cinematic",
    intent: "Full scene transformation",
    note: "Moody meadow portrait in tall grass",
    description:
      "Place a portrait in a moody outdoor meadow with tall wild grass, a bare tree, and muted earthy grading.",
    changes: ["Background", "Outfit", "Pose", "Color mood"],
    height: 350,
  },
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function displayValue(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function cleanPrompt(raw: string) {
  let prompt = raw.trim();
  prompt = prompt.replace(/^```(?:text)?\r?\n?/, "").replace(/\r?\n?```$/, "");
  prompt = prompt.replace(/\r\n/g, "\n").trim();
  return prompt;
}

function tsString(value: string) {
  return JSON.stringify(value);
}

const parsed = JSON.parse(
  fs.readFileSync("scripts/_parsed-templates-10-30.json", "utf8"),
) as Parsed[];

const moods = new Set<string>();
const backgrounds = new Set<string>();

const styleBlocks: string[] = [];

for (const item of parsed) {
  const meta = metaByNum[item.num];
  if (!meta) throw new Error(`Missing meta for ${item.num}`);
  const slug = slugify(item.name);
  const mood = displayValue(item.mood);
  const background = displayValue(item.background);
  moods.add(mood);
  backgrounds.add(background);
  const n = item.num.padStart(2, "0");
  const prompt = cleanPrompt(item.prompt);
  if (!prompt.includes("{{mood}}") || !prompt.includes("{{background}}") || !prompt.includes("{{ratio}}")) {
    throw new Error(`Template ${item.num} missing required placeholders`);
  }

  styleBlocks.push(`  {
    id: ${tsString(slug)},
    title: ${tsString(item.name)},
    category: ${tsString(meta.category)},
    subject: "Person",
    intent: ${tsString(meta.intent)},
    requirement: "One photo",
    tool: "ChatGPT Image",
    note: ${tsString(meta.note)},
    height: ${meta.height},
    saved: ${100 - Number(item.num)},
    source: asset(${tsString(`source-${n}.png`)}),
    result: asset(${tsString(`result-${n}.png`)}),
    status: "published",
    targetSourcePhoto: "One clear portrait with a visible face",
    description: ${tsString(meta.description)},
    bestSourcePhoto: [
      "One visible face",
      "Good lighting on skin",
      "Face not heavily obscured",
      "Original image should not be blurry",
    ],
    changes: ${JSON.stringify(meta.changes)},
    stays: ["Face and identity", "Facial features", "Natural skin texture", "Likeness"],
    examplePairs: evidence(
      ${tsString(n)},
      ${tsString(`Source portrait for ${item.name}`)},
      ${tsString(`${item.name} result`)},
    ),
    promptVariant: {
      id: ${tsString(`${slug}-v1`)},
      version: "1.0.0",
      tool: "ChatGPT Image",
      mode: "Image edit / transform with uploaded photo",
      inputImageCount: 1,
      inputImageRoles: ["source photo"],
      template: ${tsString(prompt)},
      defaults: {
        mood: ${tsString(mood)},
        background: ${tsString(background)},
        ratio: "4:5 Portrait",
        ...nonePreserve,
      },
      lastVerified: "2026-09-23",
      limitations: [
        "Outfit and pose change by design when toggles are off",
        "Fine jewellery or collage detail may vary between runs",
      ],
    },
  }`);
}

const out = `import type { CatalogStyle } from "./types";

const asset = (name: string) => \`/catalog/editorial/\${name}\`;

function evidence(
  n: string,
  altSource: string,
  altResult: string,
): CatalogStyle["examplePairs"] {
  const source = asset(\`source-\${n}.png\`);
  const result = asset(\`result-\${n}.png\`);
  return [
    { source, result, altSource, altResult },
    {
      source,
      result,
      altSource: \`\${altSource} (detail)\`,
      altResult: \`\${altResult} (detail)\`,
    },
  ];
}

const nonePreserve = {
  keepClothing: false,
  keepPose: false,
} as const;

/**
 * Templates 10–30 from prompts/template(10-30).txt
 * Mapped: source-NN → template N → result-NN
 * Shared sources: 10/28, 12/29, 13/26, 14/25, 08/27
 */
export const seedEditorialStyles10to30: CatalogStyle[] = [
${styleBlocks.join(",\n")}
];
`;

fs.writeFileSync(
  path.join("src/lib/catalog/seed-editorial-styles-10-30.ts"),
  out,
);

fs.writeFileSync(
  "scripts/_moods-backgrounds-10-30.json",
  JSON.stringify(
    {
      moods: [...moods].sort(),
      backgrounds: [...backgrounds].sort(),
    },
    null,
    2,
  ),
);

console.log(`Wrote ${parsed.length} styles`);
console.log(`Moods: ${moods.size}, Backgrounds: ${backgrounds.size}`);
