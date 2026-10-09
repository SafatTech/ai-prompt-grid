import type { CatalogStyle } from "./types";

/**
 * Prefer Supabase catalog-public WebPs (uploaded by upload-80s-assets / db:seed).
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

type EightiesSeed = {
  n: string;
  id: string;
  title: string;
  note: string;
  description: string;
  subject: CatalogStyle["subject"];
  intent: CatalogStyle["intent"];
  mood: string;
  background: string;
  template: string;
  changes: string[];
  stays: string[];
  height: number;
  keepClothing: boolean;
  keepPose: boolean;
  targetSourcePhoto: string;
  bestSourcePhoto: string[];
  altSource: string;
  altResult: string;
  limitations?: string[];
};

const aiGeneratedLimit =
  "Example people in the before photo are AI-generated, not real people.";

const eighties: EightiesSeed[] = [
  {
    n: "48",
    id: "1985-studio-portrait",
    title: "1985 Studio Portrait",
    note: "Mottled backdrop, soft flash, warm faded film",
    description:
      "Turn a portrait into a 1985 studio photo with feathered hair, period clothes, a mottled backdrop, and warm faded film.",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Soft sunlit analog warmth with a slightly faded film look",
    background: "Classic mottled studio backdrop",
    keepClothing: false,
    keepPose: false,
    changes: [
      "1980s hair and clothing",
      "Studio backdrop",
      "Soft flash and faded film color",
    ],
    stays: ["Face and identity", "Age", "Skin tone", "Expression"],
    height: 340,
    targetSourcePhoto:
      "One clear head-and-shoulders portrait with the face large and sharp",
    bestSourcePhoto: [
      "Face visible, no sunglasses",
      "Even lighting, no heavy shadows",
      "Face reasonably large in the frame",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated portrait of a young woman with long dark hair, wearing a cream sweater, against a light indoor background.",
    altResult:
      "AI edit of that portrait as a 1985 studio photo, with feathered hair, a dusty-rose sweater, and a mottled backdrop.",
    template:
      "Edit the uploaded {{subject}} into a 1985 professional studio portrait with voluminous feathered hair and light film grain. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in 1980s period clothing. If pose is not preserved, use a simple frontal studio pose. Do not beautify or change their features. Apply {{mood}} color grading with soft frontal flash. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "49",
    id: "80s-film-poster-lead",
    title: "80s Film Poster Lead",
    note: "Hand-painted South Asian poster, one lead",
    description:
      "Recreate a portrait as the lead on a hand-painted 1980s South Asian film poster, with period styling and no title text.",
    subject: "Person",
    intent: "Full scene transformation",
    mood: "Rich saturated sunset colors with painted-poster warmth and slight print wear",
    background: "Hand-painted sunset sky with empty space at the top",
    keepClothing: false,
    keepPose: false,
    changes: [
      "Poster styling and outfit",
      "Painted sunset backdrop",
      "Saturated print-wear color",
    ],
    stays: ["Face and identity", "Facial structure", "Skin tone", "Age"],
    height: 360,
    targetSourcePhoto:
      "One clear portrait, face large enough to stay recognizable on a poster",
    bestSourcePhoto: [
      "Face fully visible",
      "Similar angle to a three-quarter pose",
      "No heavy filters already applied",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated portrait of a young man with dark hair, a mustache, and a cream sweater against a light wall.",
    altResult:
      "AI edit of that portrait as a hand-painted 1980s film-poster lead, in a maroon blazer against a sunset sky.",
    template:
      "Edit the uploaded {{subject}} into the lead star on a hand-painted 1980s South Asian film poster, with painted poster texture and slight print wear. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, choose the outfit that matches the person: either a wide-collar printed shirt, open blazer, thick side-parted hair, and aviator sunglasses pushed up on the head, or a deep magenta chiffon saree with a gold border, big soft curls, bold eyeliner, and gold jhumkas. If pose is not preserved, use a dramatic three-quarter pose. Do not beautify or slim the face. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Leave empty space at the top but do not write any text, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "50",
    id: "1986-school-yearbook",
    title: "1986 School Yearbook",
    note: "Laser backdrop yearbook headshot",
    description:
      "Turn a portrait into a 1986 school yearbook photo with big hair, a period sweater or shirt, and a blue laser backdrop.",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Soft nostalgic",
    background: "Soft blue 1980s laser-style studio backdrop",
    keepClothing: false,
    keepPose: false,
    changes: [
      "1980s hair and school clothes",
      "Laser backdrop",
      "Soft-focus yearbook print",
    ],
    stays: ["Face and identity", "Skin tone", "Expression", "Apparent age"],
    height: 340,
    targetSourcePhoto: "One clear head-and-shoulders photo",
    bestSourcePhoto: [
      "Face centered and sharp",
      "Neutral or slight smile",
      "No sunglasses",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated headshot of a smiling young woman with dark hair pulled back, wearing a white collared shirt.",
    altResult:
      "AI edit of that headshot as a 1986 yearbook photo, with feathered hair, a cream sweater, and a blue laser backdrop.",
    template:
      "Edit the uploaded {{subject}} into a 1986 school yearbook portrait with a voluminous 1980s hairstyle, slightly soft focus, and fine grain like a printed yearbook photo. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a period sweater or collared shirt. If pose is not preserved, use a straight head-and-shoulders yearbook pose. Keep them the same age as in the photo. Apply {{mood}} color grading with even studio flash and faded colors. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "51",
    id: "walkman-street-snapshot",
    title: "Walkman Street Snapshot",
    note: "Candid market walk with a Walkman",
    description:
      "Recreate a photo as a candid 1980s street snapshot, walking a city market in denim with a Walkman and film grain.",
    subject: "Person",
    intent: "Full scene transformation",
    mood: "Warm nostalgic",
    background: "Busy 1980s city market street in bright afternoon sun",
    keepClothing: false,
    keepPose: false,
    changes: [
      "Casual 1980s outfit and Walkman",
      "Market street",
      "Point-and-shoot film look",
    ],
    stays: ["Face and identity", "Age", "Skin tone", "Likeness"],
    height: 350,
    targetSourcePhoto: "One clear photo of a person standing or walking, face visible",
    bestSourcePhoto: [
      "Face visible and reasonably large",
      "Full or three-quarter body if possible",
      "No sunglasses covering the eyes",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated photo of a young man in a white t-shirt and jeans standing on a sunny street.",
    altResult:
      "AI edit of that photo as a 1980s market snapshot, with a denim jacket, a Walkman, and a busy street behind him.",
    template:
      "Edit the uploaded {{subject}} into a candid 1980s street snapshot walking through a city market, shot like a 35mm point-and-shoot photo with visible film grain and slightly off-center framing. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a denim jacket, high-waisted jeans, and white sneakers, with a Walkman and foam headphones around the neck. If pose is not preserved, show them mid-walk. Apply {{mood}} color grading in bright afternoon sun with warm faded colors. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "52",
    id: "80s-aerobics-studio",
    title: "80s Aerobics Studio",
    note: "Neon workout look in a mirrored studio",
    description:
      "Turn a photo into a bright 1980s aerobics studio portrait with neon workout clothes, a headband, and a pastel mirrored wall.",
    subject: "Person",
    intent: "Full scene transformation",
    mood: "Flashy nostalgic",
    background: "Mirrored aerobics studio wall with a pastel gradient backdrop",
    keepClothing: false,
    keepPose: false,
    changes: [
      "Neon workout outfit and big hair",
      "Mirrored studio",
      "Bright flash and saturated color",
    ],
    stays: ["Face and identity", "Body shape", "Age", "Skin tone"],
    height: 360,
    targetSourcePhoto: "One clear photo of a person standing or smiling, face visible",
    bestSourcePhoto: [
      "Face visible",
      "Standing or three-quarter body works best",
      "Do not use a photo that is only a tight face crop if you want the outfit",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated photo of a smiling young woman with dark hair in a bun, wearing a black tank top.",
    altResult:
      "AI edit of that photo as a 1980s aerobics portrait, with a neon leotard, leg warmers, and a mirrored studio.",
    template:
      "Edit the uploaded {{subject}} into a 1980s aerobics studio portrait with big hair, a soft glow, and light film grain. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a neon leotard or tracksuit with a headband and leg warmers. If pose is not preserved, pose them mid-stretch. Do not slim or reshape the body. Apply {{mood}} color grading with bright studio flash and saturated colors. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "53",
    id: "80s-bedroom-cassette",
    title: "80s Bedroom Cassette",
    note: "Flash snapshot on a teenager's bed",
    description:
      "Recreate a photo as a casual 1980s bedroom snapshot on the bed, with posters, tapes, and direct flash.",
    subject: "Person",
    intent: "Full scene transformation",
    mood: "Warm nostalgic",
    background:
      "1980s teenager bedroom with a cassette player, a stack of tapes, and a patterned bedspread",
    keepClothing: false,
    keepPose: false,
    changes: ["Bedroom setting and props", "Direct flash", "Faded album-print color"],
    stays: ["Face and identity", "Age", "Skin tone", "Likeness"],
    height: 340,
    targetSourcePhoto:
      "One clear photo with the face visible, ideally sitting or a relaxed pose",
    bestSourcePhoto: [
      "Face visible and not turned away",
      "Enough of the body to sit them on a bed",
      "No sunglasses",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated photo of a young man in a black t-shirt sitting on a bed in a plain room.",
    altResult:
      "AI edit of that photo as a flash snapshot in a 1980s bedroom, with posters, a cassette player, and a patterned bedspread.",
    template:
      "Edit the uploaded {{subject}} into a casual 1980s snapshot sitting on a bed, like a print from an old photo album with visible grain. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, keep a simple 1980s casual outfit. If pose is not preserved, seat them on the bed facing the camera. Apply {{mood}} color grading with direct flash, slightly harsh highlights, warm indoor tones, and faded colors. Replace the background with {{background}}, and add posters of film stars and bands with no readable text or real logos. Do not add extra people, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "54",
    id: "1985-studio-couple",
    title: "1985 Studio Couple",
    note: "Mottled-backdrop couple studio portrait",
    description:
      "Turn a couple photo into a 1985 studio portrait with feathered hair, period clothes, and warm faded film, keeping both faces separate.",
    subject: "Group",
    intent: "New outfit or theme",
    mood: "Soft sunlit analog warmth with a slightly faded film look",
    background: "Classic mottled studio backdrop",
    keepClothing: false,
    keepPose: false,
    changes: [
      "1980s hair and clothing for both",
      "Studio backdrop",
      "Soft flash and faded film color",
    ],
    stays: [
      "Each face separately",
      "Each person's age",
      "Each skin tone",
      "Each expression",
    ],
    height: 350,
    targetSourcePhoto:
      "One photo of two people, both faces clear and at a similar distance from the camera",
    bestSourcePhoto: [
      "Both faces visible and sharp",
      "Similar distance from the camera",
      "No sunglasses",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated photo of a young couple, a man in a white t-shirt and a woman in a cream sweater, against a light wall.",
    altResult:
      "AI edit of that couple as a 1985 studio portrait, with feathered hair, period clothes, and a mottled backdrop.",
    template:
      "Edit the uploaded {{subject}} into a 1985 professional studio couple portrait with voluminous feathered hair and light film grain. Preserve each person's face separately and do not blend, swap, or beautify features. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress both people in 1980s period clothing. If pose is not preserved, pose them together in a simple frontal studio pose. Apply {{mood}} color grading with soft frontal flash. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "55",
    id: "80s-film-poster-couple",
    title: "80s Film Poster Couple",
    note: "Hand-painted poster of a lead pair",
    description:
      "Recreate a couple as the lead pair on a hand-painted 1980s South Asian film poster, with no title text.",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Rich saturated sunset colors with painted-poster warmth and slight print wear",
    background: "Hand-painted sunset sky with empty space at the top",
    keepClothing: false,
    keepPose: false,
    changes: [
      "Poster outfits for each person",
      "Painted sunset backdrop",
      "Saturated print-wear color",
    ],
    stays: [
      "Each face separately",
      "Each facial structure",
      "Each skin tone",
      "Each person's age",
    ],
    height: 360,
    targetSourcePhoto: "One couple photo with both faces clear",
    bestSourcePhoto: [
      "Both faces fully visible",
      "The two people distinguishable left and right",
      "No heavy beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated photo of a young couple standing together, a man in a white t-shirt and a woman in a black top.",
    altResult:
      "AI edit of that couple as a hand-painted 1980s film poster, with a blazer, a magenta saree, and a sunset sky.",
    template:
      "Edit the uploaded {{subject}} into the lead pair on a hand-painted 1980s South Asian film poster, with painted poster texture and slight print wear. Keep both faces fully recognizable and do not merge or swap features. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress the person on the left in a wide-collar printed shirt, open blazer, thick side-parted hair, and aviator sunglasses pushed up on the head, and dress the person on the right in a deep magenta chiffon saree with a gold border, big soft curls, bold eyeliner, and gold jhumkas. If pose is not preserved, pose the couple close together. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Leave empty space at the top but do not write any text, lettering, or logos. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "56",
    id: "disposable-camera-date-night",
    title: "Disposable-Camera Date Night",
    note: "Harsh-flash roller-rink snapshot",
    description:
      "Recreate a couple photo as a candid 1980s disposable-camera snapshot at a roller rink, with harsh flash and neon.",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Flashy nostalgic",
    background: "Dark roller rink with neon lights",
    keepClothing: false,
    keepPose: false,
    changes: ["1980s date outfits", "Roller rink", "Harsh flash and film grain"],
    stays: ["Each face separately", "Each person's age", "Each skin tone", "Likeness"],
    height: 350,
    targetSourcePhoto: "One photo of two people, both faces clear",
    bestSourcePhoto: [
      "Both faces visible",
      "Candid or standing pose works",
      "Similar lighting on both faces",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated photo of a young couple standing together, a man in a white t-shirt and a woman in a cream sweater.",
    altResult:
      "AI edit of that couple as a harsh-flash disposable-camera snapshot at a neon roller rink.",
    template:
      "Edit the uploaded {{subject}} into a candid 1980s disposable-camera snapshot of a date night, with slightly off-center framing and visible film grain. Preserve each person's face separately and do not blend or swap features. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in 1980s casual outfits such as a denim jacket, a windbreaker, high-waisted jeans, and a scrunchie. If pose is not preserved, keep them close together as if caught mid-date. Apply {{mood}} color grading with harsh direct on-camera flash, slightly overexposed skin, and a warm color shift. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "57",
    id: "mall-laser-backdrop-couple",
    title: "Mall Laser Backdrop Couple",
    note: "Cheek-to-cheek mall studio portrait",
    description:
      "Turn a couple photo into a 1980s mall studio portrait with perms, pastels, and a purple-and-blue laser backdrop.",
    subject: "Group",
    intent: "New outfit or theme",
    mood: "Soft nostalgic",
    background: "Purple and blue laser-beam mall photo-studio backdrop",
    keepClothing: false,
    keepPose: false,
    changes: [
      "Perms, shoulder pads, pastel and satin",
      "Laser backdrop",
      "Soft-focus glossy print",
    ],
    stays: ["Each face separately", "Each expression", "Each skin tone", "Likeness"],
    height: 340,
    targetSourcePhoto:
      "One couple photo, both faces clear and close enough for a cheek-to-cheek crop",
    bestSourcePhoto: [
      "Both faces visible and sharp",
      "Heads at a similar height",
      "No sunglasses",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated photo of a smiling young couple, a man in a white t-shirt and a woman in a cream sweater.",
    altResult:
      "AI edit of that couple as a 1980s mall portrait, cheek to cheek, with big hair and a purple-and-blue laser backdrop.",
    template:
      "Edit the uploaded {{subject}} into a 1980s mall photo-studio couple portrait with a soft-focus glow around the edges and a slightly glossy print look. Treat each person as a separate identity and do not blend features. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, give them big permed hair, shoulder pads, a pastel sweater, and a satin shirt. If pose is not preserved, pose them cheek to cheek. Apply {{mood}} color grading with faded 1980s colors. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "58",
    id: "combine-two-photos-80s-couple",
    title: "Two Photos, One 80s Couple",
    note: "One portrait restyled as a 1980s outdoor couple",
    description:
      "Restyle one portrait into a 1980s outdoor couple photo at golden hour, keeping the face matched to the source.",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Warm nostalgic cinematic sunlight with soft vintage tones, gentle film grain, creamy highlights, and cozy shadow depth",
    background: "Park at golden hour with soft trees",
    keepClothing: false,
    keepPose: false,
    changes: ["Combined couple scene", "Period outfits", "Matched golden-hour light"],
    stays: [
      "Person A's face from photo 1",
      "Person B's face from photo 2",
      "Each hair texture",
      "Each skin tone",
    ],
    height: 350,
    targetSourcePhoto: "One clear portrait with the face large and sharp",
    bestSourcePhoto: [
      "Face large and sharp",
      "Even lighting on the face",
      "A straightforward head angle",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated portrait of a young man with short dark hair and a mustache, wearing a white t-shirt.",
    altResult:
      "AI edit of that portrait into a 1980s outdoor couple photo in a park at golden hour.",
    limitations: [
      aiGeneratedLimit,
      "This page shows one source photo. A second upload is not collected here.",
      "Heavy face occlusion can weaken identity fidelity",
    ],
    template:
      "The upload is two photos of the {{subject}}: the first is person A and the second is person B. Create one new 1980s outdoor couple photograph of them standing side by side, matching lighting and camera angle so they look photographed together, with warm faded film colors, soft grain, and 35mm snapshot framing. Keep person A's face, hair texture, and skin tone exactly as in photo 1, and person B's exactly as in photo 2. Do not mix their features. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress both in 1980s period outfits. If pose is not preserved, stand them side by side. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, lettering, or logos. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "59",
    id: "80s-wedding-album",
    title: "80s Wedding Album",
    note: "Formal flash portrait, yellowed print",
    description:
      "Recreate a couple photo as a page from a 1980s wedding album, with formal outfits, a floral stage, and a slightly yellowed print.",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Warm nostalgic",
    background: "Floral wedding-stage backdrop",
    keepClothing: false,
    keepPose: false,
    changes: ["Formal wedding outfits", "Floral stage", "Yellowed album print and flash"],
    stays: ["Each face separately", "Each person's age", "Each skin tone", "Likeness"],
    height: 360,
    targetSourcePhoto: "One couple photo with both faces clear",
    bestSourcePhoto: [
      "Both faces visible",
      "Enough of the body to show formal outfits",
      "Similar distance from the camera",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated photo of a young couple standing together, a man in a white t-shirt and a woman in a cream sweater.",
    altResult:
      "AI edit of that couple as a 1980s wedding-album portrait, in a sherwani and lehenga against a floral stage.",
    template:
      "Edit the uploaded {{subject}} into a page from a 1980s wedding album, with slightly yellowed print, rounded photo corners, and mild film grain. Preserve each person's face separately and do not blend or beautify features. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a red bridal lehenga and a cream sherwani. If pose is not preserved, use a formal posed portrait. Apply {{mood}} color grading with on-camera flash and soft shadows behind them. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping either face.",
  },
];

/**
 * 1980s person and couple templates 48–59.
 * Images render from Supabase catalog-public (seed/catalog/editorial/*.webp).
 */
export const seedEightiesStyles: CatalogStyle[] = eighties.map((item, index) => ({
  id: item.id,
  title: item.title,
  category: "Vintage",
  subject: item.subject,
  intent: item.intent,
  requirement: "One photo",
  tool: "ChatGPT Image",
  note: item.note,
  height: item.height,
  saved: 42 - index,
  source: asset(`source-${item.n}.png`),
  result: asset(`result-${item.n}.png`),
  status: "published",
  targetSourcePhoto: item.targetSourcePhoto,
  description: item.description,
  bestSourcePhoto: item.bestSourcePhoto,
  changes: item.changes,
  stays: item.stays,
  examplePairs: evidence(item.n, item.altSource, item.altResult),
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
    lastVerified: "2026-10-09",
    limitations: item.limitations ?? [
      aiGeneratedLimit,
      "Heavy face occlusion can weaken identity fidelity",
    ],
  },
}));

export const eightiesStyleIds = new Set(seedEightiesStyles.map((style) => style.id));

/** Stored on catalog-public assets. Before photos are AI-generated people. */
export const eightiesAssetProvenance = {
  source: "seed",
  licence: "catalog",
  modelRelease: false,
  notes:
    "Before photo is an AI-generated person, not a real person. After image is an AI edit of that source.",
} as const;
