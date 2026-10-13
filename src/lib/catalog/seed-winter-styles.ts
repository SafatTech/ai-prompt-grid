import type { CatalogStyle } from "./types";

/**
 * Prefer Supabase catalog-public WebPs (uploaded by publish-winter-standalone).
 * Falls back to the published project URL when the env is unset, because the
 * winter WebPs are not checked into this repo.
 */
const PUBLISHED_SUPABASE_URL = "https://rbmirzmppbytorbhncxj.supabase.co";

function asset(name: string): string {
  const base = (
    process.env.NEXT_PUBLIC_SUPABASE_URL || PUBLISHED_SUPABASE_URL
  ).replace(/\/$/, "");
  const stem = name.replace(/\.[^.]+$/, "");
  return `${base}/storage/v1/object/public/catalog-public/seed/catalog/editorial/${stem}.webp`;
}

type WinterSeed = {
  n: string;
  id: string;
  title: string;
  note: string;
  description: string;
  category: "Travel" | "Cinematic";
  subject: CatalogStyle["subject"];
  intent: CatalogStyle["intent"];
  requirement: CatalogStyle["requirement"];
  mood: string;
  background: string;
  ratio: "4:5 Portrait" | "9:16 Story";
  template: string;
  changes: string[];
  stays: string[];
  height: number;
  keepClothing: boolean;
  keepPose: boolean;
  inputImageCount: 1 | 2;
  targetSourcePhoto: string;
  bestSourcePhoto: string[];
  altSource: string;
  altResult: string;
  altSecond?: string;
  beforeFile: string;
  afterFile: string;
  beforeBFile?: string;
};

const aiGeneratedLimit =
  "Example people in the before photo are AI-generated, not real people.";

const faceOcclusionLimit = "Heavy face occlusion can weaken identity fidelity";

const winter: WinterSeed[] = [
  {
    n: "87",
    id: "snowy-valley-winter-ai-photo-prompt-boys",
    title: "Snowy Valley Winter AI Photo Prompt for Boys",
    note: "Puffer jacket hero shot in a snowy mountain valley",
    description:
      "Turn a casual photo into a viral winter AI photo of a boy in a plain puffer jacket and wool beanie standing in a snowy pine valley under crisp blue sky.",
    category: "Travel",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Crisp icy blue with warm natural skin tones and bright snow highlights",
    background:
      "Snowy northern mountain valley with tall snow-covered pine trees, distant white peaks, and a clear blue sky",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Plain puffer jacket and beanie",
      "Snowy pine valley",
      "Light falling snow",
      "Confident hands-in-pockets pose",
    ],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Body proportions"],
    height: 340,
    targetSourcePhoto: "One clear chest-up or waist-up photo of a boy or man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Chest-up or waist-up framing works best",
      "Even daylight, no strong filters",
      "Original image should not be blurry",
    ],
    altSource:
      "Young man with dark wavy hair and a light beard in a white tee and jeans, on a sunny residential street.",
    altResult:
      "Young man in a black puffer jacket, grey beanie and scarf, in a snowy pine valley under a clear blue sky.",
    beforeFile: "snowy-valley-winter-ai-photo-prompt-boys-before.webp",
    afterFile: "snowy-valley-winter-ai-photo-prompt-boys-after.webp",
    template:
      "Edit the uploaded portrait into a realistic, viral snowy winter travel portrait. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Always keep the person's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone exactly as in the uploaded photo; do not beautify, slim, de-age, or lighten the face, and keep natural skin texture. If clothing is not preserved, dress them in a plain dark puffer jacket with no logos, a knitted wool beanie, and a plain scarf. If pose is not preserved, stand him in fresh snow facing the camera, hands in jacket pockets, with a relaxed, confident half smile. Light him with bright, crisp winter daylight reflecting softly off the snow. Add soft, realistic falling snow and visible cold-air breath only where natural, with frost and snow lit consistently with the scene. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair, wool, and fabric. Do not add extra people, text, lettering, brand names, or logos; all clothing and props are plain and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "88",
    id: "snowfall-chai-winter-ai-photo-prompt-boys",
    title: "Snowfall Chai Winter AI Photo Prompt for Boys",
    note: "Steaming chai cup and wool shawl at a snowy hill-station roadside",
    description:
      "A cozy trending winter AI photo prompt: a boy in a sweater and wool shawl holding a steaming cup of chai at a snowy hill-station roadside stall at dusk.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Warm amber tea-stall glow against cool blue snowy dusk",
    background:
      "Snowy hill-station roadside with a small wooden tea stall, warm bulb lights, and pine trees at dusk",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Cable-knit sweater and wool shawl",
      "Steaming cup of chai",
      "Snowy roadside tea stall",
      "Warm stall-light glow",
    ],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Body proportions"],
    height: 350,
    targetSourcePhoto: "One clear chest-up photo of a boy or man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Chest-up or waist-up framing works best",
      "Even daylight, no strong filters",
      "Original image should not be blurry",
    ],
    altSource:
      "Young man with a mustache in an olive shirt, leaning on a street-food stall counter.",
    altResult:
      "Young man in a cream cable-knit sweater and brown wool shawl, holding a steaming clay chai cup at a snowy tea stall.",
    beforeFile: "snowfall-chai-winter-ai-photo-prompt-boys-before.webp",
    afterFile: "snowfall-chai-winter-ai-photo-prompt-boys-after.webp",
    template:
      "Edit the uploaded portrait into a cozy, cinematic snowfall chai portrait. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Always keep the person's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone exactly as in the uploaded photo; do not beautify, slim, de-age, or lighten the face, and keep natural skin texture. If clothing is not preserved, dress them in a plain cream cable-knit sweater with a brown wool shawl draped over one shoulder. If pose is not preserved, have him hold a steaming plain clay or glass cup of chai in both hands near his chest, looking slightly off camera with a calm smile. Light his face with warm amber light from the tea stall on one side and cool blue dusk light on the other, with visible steam rising from the cup. Add soft, realistic falling snow and visible cold-air breath only where natural, with frost and snow lit consistently with the scene. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair, wool, and fabric. Do not add extra people, text, lettering, brand names, or logos; all clothing and props are plain and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "89",
    id: "night-snow-street-winter-ai-photo-prompt-men",
    title: "Night Snow Street Winter AI Photo Prompt for Men",
    note: "Moody night-time snowfall on a city street",
    description:
      "A cinematic winter AI photo prompt for men: dark jacket, turtleneck and scarf on a snowy city street at night with soft streetlight bokeh.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Moody cinematic",
    background:
      "Snowy city street at night with warm streetlights, soft bokeh, and snow-covered parked cars",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Dark jacket over turtleneck",
      "Night snowfall street",
      "Streetlight bokeh",
      "Walking-toward-camera pose",
    ],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Body proportions"],
    height: 340,
    targetSourcePhoto: "One clear waist-up photo of a boy or man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Chest-up or waist-up framing works best",
      "Even daylight, no strong filters",
      "Original image should not be blurry",
    ],
    altSource: "Young man with a neat beard in a charcoal polo, in a beige hallway.",
    altResult:
      "Young man in a black coat, charcoal turtleneck and grey scarf, on a snowy city street at night.",
    beforeFile: "night-snow-street-winter-ai-photo-prompt-men-before.webp",
    afterFile: "night-snow-street-winter-ai-photo-prompt-men-after.webp",
    template:
      "Edit the uploaded portrait into a moody, cinematic winter night street portrait with gentle snowfall. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Always keep the person's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone exactly as in the uploaded photo; do not beautify, slim, de-age, or lighten the face, and keep natural skin texture. If clothing is not preserved, dress them in a plain black jacket over a charcoal turtleneck sweater and a plain grey wool scarf. If pose is not preserved, show him walking slowly toward the camera with one hand in his pocket, looking just past the lens. Light him with warm streetlight from above and a soft cool rim light, with snowflakes caught in the light. Add soft, realistic falling snow and visible cold-air breath only where natural, with frost and snow lit consistently with the scene. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair, wool, and fabric. Do not add extra people, text, lettering, brand names, or logos; all clothing and props are plain and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "90",
    id: "wooden-cabin-window-winter-ai-photo-prompt-boys",
    title: "Wooden Cabin Window Winter AI Photo Prompt for Boys",
    note: "Indoor winter mood: hoodie, blanket and snowy window",
    description:
      "Turn a selfie into a calm winter AI photo of a boy in a hoodie and knit cardigan sitting by a frosty cabin window with snow falling outside.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Warm cozy pastel",
    background:
      "Cozy wooden cabin interior beside a frosted window with snow falling outside and warm fairy lights",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Knit cardigan over hoodie",
      "Wooden cabin interior",
      "Frosted window with snowfall",
      "Seated by the window",
    ],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Body proportions"],
    height: 350,
    targetSourcePhoto: "One clear chest-up photo of a boy or man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Chest-up or waist-up framing works best",
      "Even daylight, no strong filters",
      "Original image should not be blurry",
    ],
    altSource:
      "Young man with voluminous dark hair in a light-blue shirt, seated by a window indoors.",
    altResult:
      "Young man in a brown knit cardigan over a grey hoodie, by a frosted cabin window with fairy lights.",
    beforeFile: "wooden-cabin-window-winter-ai-photo-prompt-boys-before.webp",
    afterFile: "wooden-cabin-window-winter-ai-photo-prompt-boys-after.webp",
    template:
      "Edit the uploaded portrait into a calm, cozy winter cabin portrait beside a snowy window. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Always keep the person's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone exactly as in the uploaded photo; do not beautify, slim, de-age, or lighten the face, and keep natural skin texture. If clothing is not preserved, dress them in a plain grey hoodie under a chunky brown knit cardigan, with a plaid wool blanket over his lap. If pose is not preserved, seat him on a wooden window seat, knees slightly raised, looking out of the window with a soft smile. Light him with soft cool daylight from the window and a gentle warm glow from fairy lights inside. Add soft, realistic falling snow and visible cold-air breath only where natural, with frost and snow lit consistently with the scene. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair, wool, and fabric. Do not add extra people, text, lettering, brand names, or logos; all clothing and props are plain and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "91",
    id: "pheran-snow-garden-winter-ai-photo-prompt-girls",
    title: "Pheran Snow Garden Winter AI Photo Prompt for Girls",
    note: "Embroidered pheran in a snowy Kashmir-style garden",
    description:
      "A trending winter AI photo prompt for girls: an embroidered woolen pheran and soft scarf in a snowy Kashmir-style valley garden with chinar-style trees.",
    category: "Travel",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Soft winter pastel with rose-pink accents, creamy whites, and natural warm skin tones",
    background:
      "Snowy Kashmir-style valley garden with bare chinar-style trees, a wooden fence, and soft misty mountains",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Embroidered woolen pheran",
      "Soft scarf or head covering kept",
      "Snowy valley garden",
      "Gentle snowfall",
    ],
    stays: ["Face and identity", "Skin tone", "Hair or head covering", "Body proportions"],
    height: 340,
    targetSourcePhoto: "One clear chest-up or waist-up photo of a girl or woman",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Chest-up or waist-up framing works best",
      "Even daylight, no strong filters",
      "Original image should not be blurry",
    ],
    altSource:
      "Young woman with a side braid in a mustard-yellow shalwar kameez and dupatta, in a campus corridor.",
    altResult:
      "Young woman in a maroon embroidered pheran and cream scarf, in a snowy valley garden with bare trees.",
    beforeFile: "pheran-snow-garden-winter-ai-photo-prompt-girls-before.webp",
    afterFile: "pheran-snow-garden-winter-ai-photo-prompt-girls-after.webp",
    template:
      "Edit the uploaded portrait into a graceful, realistic snowy valley winter portrait. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Always keep the person's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone exactly as in the uploaded photo; do not beautify, slim, de-age, or lighten the face, and keep natural skin texture. If clothing is not preserved, dress them in a long maroon woolen pheran with delicate cream thread embroidery at the neckline and cuffs and a soft matching scarf; keep any existing head covering or dupatta. If pose is not preserved, stand her in fresh snow, turned slightly to the side, looking back toward the camera with a gentle smile, one hand lightly holding her scarf. Light her with soft, diffused winter daylight and a faint glow from the snow. Add soft, realistic falling snow and visible cold-air breath only where natural, with frost and snow lit consistently with the scene. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair, wool, and fabric. Do not add extra people, text, lettering, brand names, or logos; all clothing and props are plain and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "92",
    id: "shawl-chai-winter-ai-photo-prompt-girls",
    title: "Shawl and Chai Winter AI Photo Prompt for Girls",
    note: "Wrapped in a wool shawl with chai on a snowy balcony",
    description:
      "Copy-paste winter AI photo prompt: a girl wrapped in a soft wool shawl holding a steaming cup of chai on a wooden balcony overlooking snowy pine hills.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Warm cozy winter glow with soft amber highlights and cool snowy shadows",
    background:
      "Wooden hill-station balcony overlooking snowy pine-covered hills under a soft grey winter sky",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Soft woolen shawl over a sweater",
      "Steaming cup of chai",
      "Snowy balcony view",
      "Gentle snowfall",
    ],
    stays: ["Face and identity", "Skin tone", "Hair or head covering", "Body proportions"],
    height: 350,
    targetSourcePhoto: "One clear chest-up photo of a girl or woman",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Chest-up or waist-up framing works best",
      "Even daylight, no strong filters",
      "Original image should not be blurry",
    ],
    altSource:
      "Young woman with shoulder-length dark hair in a white tee and jeans, on a balcony at sunset.",
    altResult:
      "Young woman in a cream sweater and striped wool shawl, holding steaming chai on a snowy wooden balcony.",
    beforeFile: "shawl-chai-winter-ai-photo-prompt-girls-before.webp",
    afterFile: "shawl-chai-winter-ai-photo-prompt-girls-after.webp",
    template:
      "Edit the uploaded portrait into a cozy, cinematic winter balcony portrait with light snowfall. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Always keep the person's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone exactly as in the uploaded photo; do not beautify, slim, de-age, or lighten the face, and keep natural skin texture. If clothing is not preserved, dress them in a plain knit sweater with a large soft beige or rust wool shawl wrapped around her shoulders; keep any existing head covering or dupatta. If pose is not preserved, have her lean on the wooden railing holding a steaming plain cup of chai in both hands, smiling softly toward the camera. Light her with soft overcast daylight and a warm glow on her face, with visible steam from the cup. Add soft, realistic falling snow and visible cold-air breath only where natural, with frost and snow lit consistently with the scene. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair, wool, and fabric. Do not add extra people, text, lettering, brand names, or logos; all clothing and props are plain and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "93",
    id: "long-coat-snowfall-winter-ai-photo-prompt-girls",
    title: "Long Coat Snowfall Winter AI Photo Prompt for Girls",
    note: "Elegant long coat and muffler on a snowy avenue",
    description:
      "A viral worldwide winter look: a girl in an elegant long wool coat and knit muffler walking down a snowy tree-lined avenue with soft falling snow.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Soft cinematic monochrome with silver-gray midtones, gentle film grain, luminous highlights, and deep romantic shadows",
    background:
      "Snowy tree-lined avenue with frosted bare branches, old lamp posts, and soft distant bokeh",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Long camel wool coat",
      "Knit muffler and gloves",
      "Snowy tree-lined avenue",
      "Walking pose with snowfall",
    ],
    stays: ["Face and identity", "Skin tone", "Hair or head covering", "Body proportions"],
    height: 340,
    targetSourcePhoto: "One clear waist-up or full-body photo of a girl or woman",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Chest-up or waist-up framing works best",
      "Even daylight, no strong filters",
      "Original image should not be blurry",
    ],
    altSource: "Young woman with long dark hair in a peach kurta, seated on a sofa indoors.",
    altResult:
      "Young woman in a camel wool coat, cream muffler and knit gloves, on a snowy tree-lined avenue.",
    beforeFile: "long-coat-snowfall-winter-ai-photo-prompt-girls-before.webp",
    afterFile: "long-coat-snowfall-winter-ai-photo-prompt-girls-after.webp",
    template:
      "Edit the uploaded portrait into an elegant, cinematic winter street portrait with soft falling snow. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Always keep the person's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone exactly as in the uploaded photo; do not beautify, slim, de-age, or lighten the face, and keep natural skin texture. If clothing is not preserved, dress them in a long camel wool coat, a chunky cream knit muffler, and plain knit gloves; keep any existing head covering. If pose is not preserved, show her walking toward the camera mid-step, one hand holding the muffler, with a natural, confident smile. Light her with soft overcast winter light and gentle highlights on the snow. Add soft, realistic falling snow and visible cold-air breath only where natural, with frost and snow lit consistently with the scene. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair, wool, and fabric. Do not add extra people, text, lettering, brand names, or logos; all clothing and props are plain and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "94",
    id: "fairy-lights-sweater-winter-ai-photo-prompt-girls",
    title: "Fairy Lights Sweater Winter AI Photo Prompt for Girls",
    note: "Oversized sweater, fairy lights and a frosty window at night",
    description:
      "A free trending winter AI photo prompt for girls: an oversized knit sweater, warm fairy lights and a frosted window with snow outside at night.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Warm cozy winter glow with soft amber highlights and cool snowy shadows",
    background:
      "Cozy bedroom corner at night beside a frosted window with snow outside and warm fairy lights",
    ratio: "9:16 Story",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Oversized knit sweater",
      "Warm fairy lights",
      "Frosted window with night snow",
      "Close, dreamy framing",
    ],
    stays: ["Face and identity", "Skin tone", "Hair or head covering", "Body proportions"],
    height: 360,
    targetSourcePhoto: "One clear chest-up selfie or portrait of a girl or woman",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Chest-up or waist-up framing works best",
      "Even daylight, no strong filters",
      "Original image should not be blurry",
    ],
    altSource:
      "Young woman with long wavy hair in a cream knit sweater, holding a mug on a bed by a window.",
    altResult:
      "Young woman in an oversized cream sweater with fairy lights, by a frosted window with night snow outside.",
    beforeFile: "fairy-lights-sweater-winter-ai-photo-prompt-girls-before.webp",
    afterFile: "fairy-lights-sweater-winter-ai-photo-prompt-girls-after.webp",
    template:
      "Edit the uploaded portrait into a dreamy, cozy winter night portrait by a frosty window. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Always keep the person's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone exactly as in the uploaded photo; do not beautify, slim, de-age, or lighten the face, and keep natural skin texture. If clothing is not preserved, dress them in a soft oversized cream knit sweater with long sleeves pulled over her hands; keep any existing head covering. If pose is not preserved, seat her close to the window holding a plain mug, chin slightly lowered, looking into the camera with a soft smile. Light her face with the warm glow of fairy lights in soft bokeh and cool blue light from the snowy window. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair, wool, and fabric. Do not add extra people, text, lettering, brand names, or logos; all clothing and props are plain and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "95",
    id: "snowy-mountain-couple-winter-ai-photo-prompt",
    title: "Snowy Mountain Couple Winter AI Photo Prompt",
    note: "Matching winter jackets on a snowy mountain viewpoint",
    description:
      "A viral couple winter AI photo prompt: both partners in matching plain jackets and scarves, side by side at a snowy hill-station viewpoint with white peaks.",
    category: "Travel",
    subject: "Group",
    intent: "Full scene transformation",
    requirement: "One photo",
    mood: "Crisp icy blue with warm natural skin tones and bright snow highlights",
    background:
      "Snowy hill-station viewpoint with a wooden railing, snow-covered pine slopes, and distant white peaks",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Matching plain winter jackets and scarves",
      "Snowy mountain viewpoint",
      "Light falling snow",
      "Close side-by-side pose",
    ],
    stays: [
      "Both faces and identities",
      "Each skin tone",
      "Hair, beard or head covering",
      "Relative heights",
    ],
    height: 340,
    targetSourcePhoto: "One photo of a couple with both faces clearly visible",
    bestSourcePhoto: [
      "Both faces clearly visible in one photo",
      "Standing or sitting close together",
      "Even light on both faces",
      "Original image should not be blurry",
    ],
    altSource:
      "Young couple on a rooftop at sunset, him in a grey tee and her in a rust tee.",
    altResult:
      "Couple in matching winter jackets and scarves at a snowy mountain viewpoint with white peaks.",
    beforeFile: "snowy-mountain-couple-winter-ai-photo-prompt-before.webp",
    afterFile: "snowy-mountain-couple-winter-ai-photo-prompt-after.webp",
    template:
      "Edit the uploaded photo of a couple into a realistic, romantic snowy mountain couple portrait. Use both people in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Always keep each person's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone exactly as in the uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Dress them in coordinated plain winter jackets in complementary colors with knitted scarves and gloves, modest and family-friendly; keep any head covering or dupatta. If group arrangement and pose are not preserved, stand them close together at the wooden railing, one arm around the other, both smiling at the camera, at realistic relative heights. Light both with the same crisp winter daylight from one direction, with matching shadows. Add soft, realistic falling snow and visible cold-air breath only where natural, with frost and snow lit consistently with the scene. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair, wool, and fabric. Do not add extra people, text, lettering, brand names, or logos; all clothing and props are plain and unbranded. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "96",
    id: "shared-shawl-couple-winter-ai-photo-prompt-chai",
    title: "Shared Shawl Couple Winter AI Photo Prompt (Chai)",
    note: "One big wool shawl, two cups of chai, gentle snow",
    description:
      "A cozy couple winter AI photo prompt for Gemini: both partners sharing one large wool shawl with steaming chai on a snowy wooden cottage porch.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    requirement: "One photo",
    mood: "Warm amber tea-stall glow against cool blue snowy dusk",
    background:
      "Snow-covered wooden cottage porch at dusk with a warm lantern, pine trees, and soft snowfall",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "One large shared wool shawl over sweaters",
      "Two cups of steaming chai",
      "Snowy cottage porch",
      "Lantern glow",
    ],
    stays: [
      "Both faces and identities",
      "Each skin tone",
      "Hair, beard or head covering",
      "Relative heights",
    ],
    height: 350,
    targetSourcePhoto: "One photo of a couple with both faces clearly visible",
    bestSourcePhoto: [
      "Both faces clearly visible in one photo",
      "Standing or sitting close together",
      "Even light on both faces",
      "Original image should not be blurry",
    ],
    altSource:
      "Couple on a park bench, him in a navy shirt and her in an olive embroidered kurta.",
    altResult:
      "Couple sharing a plaid wool shawl with steaming chai on a snowy cottage porch at dusk.",
    beforeFile: "shared-shawl-couple-winter-ai-photo-prompt-chai-before.webp",
    afterFile: "shared-shawl-couple-winter-ai-photo-prompt-chai-after.webp",
    template:
      "Edit the uploaded photo of a couple into a warm, cozy winter couple portrait on a snowy porch. Use both people in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Always keep each person's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone exactly as in the uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Dress them in plain knit sweaters with one large soft wool shawl wrapped around both of their shoulders, modest and family-friendly; keep any head covering or dupatta. If group arrangement and pose are not preserved, seat them side by side on a wooden porch bench under the shawl, each holding a steaming plain cup of chai, smiling at each other. Light both with the same warm lantern glow from one side and cool blue dusk light from the snowy yard. Add soft, realistic falling snow and visible cold-air breath only where natural, with frost and snow lit consistently with the scene. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair, wool, and fabric. Do not add extra people, text, lettering, brand names, or logos; all clothing and props are plain and unbranded. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "97",
    id: "snowfall-merge-two-photos-winter-ai-prompt-couple",
    title: "Snowfall Merge Two Photos Winter AI Prompt (Couple)",
    note: "Two separate selfies, one snowy couple photo",
    description:
      "Merge two separate photos into one winter AI couple photo walking hand in hand on a snowy pine path in matching jackets, both faces kept exactly.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    requirement: "Two photos",
    mood: "Crisp icy blue with warm natural skin tones and bright snow highlights",
    background:
      "Quiet snowy pine forest path with fresh snow, frosted branches, and soft winter mist",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 2,
    changes: [
      "Both people in one photo",
      "Plain winter jackets and scarves",
      "Snowy pine path",
      "Walking hand in hand",
    ],
    stays: [
      "Person A's face from photo 1",
      "Person B's face from photo 2",
      "Each skin tone",
      "Any head covering",
    ],
    height: 340,
    targetSourcePhoto:
      "Two separate photos uploaded together in one message: person A first, person B second",
    bestSourcePhoto: [
      "One person per photo, face large and sharp",
      "Similar light in both photos (both daylight or both indoors)",
      "Similar head angle and framing, ideally chest-up",
      "Original images should not be blurry",
    ],
    altSource: "Woman in a light-grey tee holding a produce basket in a grocery aisle.",
    altSecond: "Man in a maroon polo and khaki trousers in a parking lot.",
    altResult:
      "Couple walking hand in hand on a snowy pine forest path in winter jackets and scarves.",
    beforeFile: "snowfall-merge-two-photos-winter-ai-prompt-couple-before.webp",
    beforeBFile: "snowfall-merge-two-photos-winter-ai-prompt-couple-before-b.webp",
    afterFile: "snowfall-merge-two-photos-winter-ai-prompt-couple-after.webp",
    template:
      "Merge the first uploaded photo and the second uploaded photo into one natural {{subject}} photo of a couple walking together through falling snow. The first uploaded photo shows person A and the second uploaded photo shows person B. Follow the selected source-preservation settings: {{preserve}}. Always keep person A's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and person B's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Dress both in plain, unbranded winter jackets with knitted scarves over their own clothes, modest and family-friendly, keeping any head covering or dupatta. If group arrangement and pose are not preserved, show them walking hand in hand toward the camera on the snowy path, smiling, at realistic relative heights. Light both with the same soft winter daylight from one direction and matching shadows so they look photographed together. Add soft, realistic falling snow and visible cold-air breath only where natural, with frost and snow lit consistently with the scene. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair, wool, and fabric. Do not add extra people, text, lettering, brand names, or logos; all clothing and props are plain and unbranded. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "98",
    id: "hunza-style-valley-merge-two-photos-winter-prompt",
    title: "Hunza-Style Valley Merge Two Photos Winter Prompt",
    note: "Two people, two photos, one snowy northern-valley trip photo",
    description:
      "Merge two separate photos of friends or siblings into one winter trip photo in a snowy Hunza-style valley with frozen river and stone houses.",
    category: "Travel",
    subject: "Group",
    intent: "Full scene transformation",
    requirement: "Two photos",
    mood: "Bright sunlit cinematic outdoor color with vivid sky blue, warm golden skin highlights, deep navy tones, creamy whites, and fresh natural greens",
    background:
      "Snowy northern mountain valley with a frozen river, small stone houses, bare poplar trees, and towering white peaks",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 2,
    changes: [
      "Both people in one trip photo",
      "Plain puffer jackets and wool caps",
      "Snowy northern valley",
      "Side-by-side travel pose",
    ],
    stays: [
      "Person A's face from photo 1",
      "Person B's face from photo 2",
      "Each skin tone",
      "Any head covering",
    ],
    height: 350,
    targetSourcePhoto:
      "Two separate photos uploaded together in one message: person A first, person B second",
    bestSourcePhoto: [
      "One person per photo, face large and sharp",
      "Similar light in both photos (both daylight or both indoors)",
      "Similar head angle and framing, ideally chest-up",
      "Original images should not be blurry",
    ],
    altSource:
      "Bearded man in a beige henley leaning on a black-and-yellow auto-rickshaw.",
    altSecond: "Woman in a light-blue embroidered kurta in a kitchen doorway.",
    altResult:
      "Two friends in puffer jackets and wool caps on a snowy northern valley with a frozen river.",
    beforeFile: "hunza-style-valley-merge-two-photos-winter-prompt-before.webp",
    beforeBFile: "hunza-style-valley-merge-two-photos-winter-prompt-before-b.webp",
    afterFile: "hunza-style-valley-merge-two-photos-winter-prompt-after.webp",
    template:
      "Merge the first uploaded photo and the second uploaded photo into one natural {{subject}} photo of two friends or siblings on a winter trip in a snowy mountain valley. The first uploaded photo shows person A and the second uploaded photo shows person B. Follow the selected source-preservation settings: {{preserve}}. Always keep person A's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and person B's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Dress both in plain, unbranded puffer jackets and knitted wool caps over their own clothes, modest and family-friendly, keeping any head covering or dupatta. If group arrangement and pose are not preserved, stand them side by side on a snowy slope overlooking the valley, one arm over the other's shoulder, smiling at the camera, at realistic relative heights. Light both with the same bright, crisp mountain sunlight from one direction and matching shadows so they look photographed together. Add soft, realistic falling snow and visible cold-air breath only where natural, with frost and snow lit consistently with the scene. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair, wool, and fabric. Do not add extra people, text, lettering, brand names, or logos; all clothing and props are plain and unbranded. Compose for {{ratio}} without cropping either face.",
  },
];

function resultSize(ratio: WinterSeed["ratio"]): {
  resultWidth: number;
  resultHeight: number;
} {
  if (ratio === "9:16 Story") return { resultWidth: 941, resultHeight: 1672 };
  return { resultWidth: 1122, resultHeight: 1402 };
}

const categorySlug: Record<string, string> = {
  Cinematic: "cinematic",
  Travel: "travel",
};

/**
 * Winter AI photo prompts 87–98 (solo, couple, and two-photo merges).
 * Merge styles store Photo 2 as source-<n>b.webp on a second example pair
 * that shares result-<n>.webp.
 */
export const seedWinterStyles: CatalogStyle[] = winter.map((item, index) => {
  const source = asset(`source-${item.n}.png`);
  const result = asset(`result-${item.n}.png`);
  const pixels = resultSize(item.ratio);
  const examplePairs: CatalogStyle["examplePairs"] = [
    {
      source,
      result,
      altSource: item.altSource,
      altResult: item.altResult,
      ...pixels,
    },
  ];
  if (item.inputImageCount === 2 && item.altSecond) {
    examplePairs.push({
      source: asset(`source-${item.n}b.png`),
      result,
      altSource: item.altSecond,
      altResult: item.altResult,
      ...pixels,
    });
  }
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    subject: item.subject,
    intent: item.intent,
    requirement: item.requirement,
    tool: "ChatGPT Image",
    note: item.note,
    height: item.height,
    saved: 14 - index,
    source,
    result,
    status: "published",
    targetSourcePhoto: item.targetSourcePhoto,
    description: item.description,
    bestSourcePhoto: item.bestSourcePhoto,
    changes: item.changes,
    stays: item.stays,
    examplePairs,
    promptVariant: {
      id: `${item.id}-v1`,
      version: "1.0.0",
      tool: "ChatGPT Image",
      mode: "Image edit / transform with uploaded photo",
      inputImageCount: item.inputImageCount,
      inputImageRoles:
        item.inputImageCount === 2 ? ["first photo", "second photo"] : ["source photo"],
      template: item.template,
      defaults: {
        mood: item.mood,
        background: item.background,
        ratio: item.ratio,
        keepClothing: item.keepClothing,
        keepPose: item.keepPose,
      },
      lastVerified: "",
      limitations: [aiGeneratedLimit, faceOcclusionLimit],
    },
  };
});

export const winterStyleIds = new Set(seedWinterStyles.map((style) => style.id));

export const winterCategorySlug = categorySlug;

/** Publish payload fields kept beside the seed so the standalone script stays in sync. */
export const winterPublishRows = winter.map((item, index) => ({
  n: item.n,
  id: item.id,
  title: item.title,
  note: item.note,
  description: item.description,
  categorySlug: categorySlug[item.category],
  subject: item.subject,
  intent: item.intent,
  requirement: item.requirement,
  tool: "ChatGPT Image",
  height: item.height,
  saved: 14 - index,
  status: "published" as const,
  targetSourcePhoto: item.targetSourcePhoto,
  bestSourcePhoto: item.bestSourcePhoto,
  changes: item.changes,
  stays: item.stays,
  beforeFile: item.beforeFile,
  afterFile: item.afterFile,
  beforeBFile: item.beforeBFile,
  altSource: item.altSource,
  altResult: item.altResult,
  altSecond: item.altSecond,
  variant: {
    id: `${item.id}-v1`,
    tool: "ChatGPT Image",
    mode: "Image edit / transform with uploaded photo",
    inputImageCount: item.inputImageCount,
    inputImageRoles:
      item.inputImageCount === 2 ? ["first photo", "second photo"] : ["source photo"],
    version: "1.0.0",
    template: item.template,
    defaults: {
      mood: item.mood,
      background: item.background,
      ratio: item.ratio,
      keepClothing: item.keepClothing,
      keepPose: item.keepPose,
    },
    limitations: [aiGeneratedLimit, faceOcclusionLimit],
  },
}));

export const winterOgAlt =
  "Couple in matching winter jackets and scarves at a snowy mountain viewpoint with white peaks.";

/** Stored on catalog-public assets. Before photos are AI-generated. */
export const winterAssetProvenance = {
  source: "seed",
  licence: "catalog",
  modelRelease: false,
  notes:
    "Before photos are AI-generated, not real people. The after image is an AI edit of those sources.",
} as const;
