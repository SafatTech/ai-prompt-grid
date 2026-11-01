import type { CatalogStyle } from "./types";

const PUBLISHED_SUPABASE_URL = "https://rbmirzmppbytorbhncxj.supabase.co";

/**
 * Prefer Supabase catalog-public WebPs (uploaded by upload-christmas-assets).
 * Falls back to the published project URL, then local /catalog.
 */
function asset(name: string): string {
  const base = (process.env.NEXT_PUBLIC_SUPABASE_URL || PUBLISHED_SUPABASE_URL).replace(
    /\/$/,
    "",
  );
  const stem = name.replace(/\.[^.]+$/, "");
  if (base) {
    return `${base}/storage/v1/object/public/catalog-public/seed/catalog/editorial/${stem}.webp`;
  }
  return `/catalog/editorial/${name}`;
}

type Christmas2026Seed = {
  n: string;
  id: string;
  title: string;
  note: string;
  description: string;
  category: CatalogStyle["category"];
  subject: CatalogStyle["subject"];
  intent: CatalogStyle["intent"];
  mood: string;
  background: string;
  ratio: "4:5 Portrait";
  keepClothing: boolean;
  keepPose: boolean;
  inputImageCount: 1 | 2;
  changes: string[];
  stays: string[];
  targetSourcePhoto: string;
  bestSourcePhoto: string[];
  altSource: string;
  altResult: string;
  altSecond?: string;
  template: string;
};

const aiGeneratedLimit =
  "Example people in the before photo are AI-generated, not real people.";
const faceOcclusionLimit = "Heavy face occlusion can weaken identity fidelity";

function resultDims(): { resultWidth: number; resultHeight: number } {
  return { resultWidth: 1200, resultHeight: 1489 };
}

/** 12 Christmas 2026 guide styles numbered 273–284 (images already in catalog-public). */
const christmas2026Addon: Christmas2026Seed[] = [
  {
    n: "273",
    id: "cozy-fireplace-sweater-christmas-portrait-women",
    title: "Cozy Fireplace Christmas Sweater AI Photo Prompt for Women",
    note: "Cozy cream cable-knit sweater by a modern stone fireplace",
    description: "A Christmas AI photo editing prompt for women: oversized cream cable-knit turtleneck by a modern fireplace with warm fairy lights. Free copy-paste for Gemini, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm amber glow",
    background: "A minimalist modern living room with a sleek stone fireplace, a slim decorated Christmas tree with warm white lights and soft candles on the mantel",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Cream cable-knit turtleneck",
      "Fireplace armchair pose",
      "Warm amber glow",
      "Modern living room Christmas tree",
    ],
    stays: [
      "Face and identity",
      "Skin tone",
      "Hair and head covering",
      "Glasses if worn",
    ],
    targetSourcePhoto: "One clear waist-up photo of an adult woman",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even light, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource: "Casual portrait before a cozy fireplace Christmas sweater AI photo edit for women.",
    altResult: "Woman in a cream cable-knit turtleneck seated by a stone fireplace after a Christmas AI photo editing prompt.",
    template: "Edit the uploaded portrait into a modern, cozy Christmas fireplace portrait of a stylish woman. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, festive lights and styling in rich, polished detail. If clothing is not preserved, dress her in an oversized cream cable-knit turtleneck sweater with tailored wide-leg camel trousers, small gold hoop earrings and a delicate gold chain; keep any existing head covering. If pose is not preserved, show her seated on a plush boucle armchair beside the fireplace, holding a ceramic mug with both hands, head slightly tilted, warm relaxed smile at the camera, framed from mid-thigh up with the face large and sharp. Light her with a warm firelight glow from the side and soft fairy-light bokeh behind. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed decorations; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "274",
    id: "mens-christmas-knit-sweater-portrait",
    title: "Men's Christmas Knit Sweater AI Photo Prompt",
    note: "Forest-green merino knit sweater with a Scandinavian Christmas tree",
    description: "A Christmas AI photo editing prompt for men: fitted forest-green merino knit with a subtle snowflake pattern beside a tall pine tree. Free for Gemini, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Rich forest green and gold",
    background: "A modern Scandinavian-style living room with a tall pine Christmas tree in warm white lights, wrapped gifts in kraft paper and soft candlelight",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Forest-green merino knit",
      "Scandinavian living room",
      "Tree-light bokeh",
      "Confident waist-up pose",
    ],
    stays: [
      "Face and identity",
      "Skin tone",
      "Hair and beard",
      "Glasses if worn",
    ],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even light, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource: "Casual portrait before a men's Christmas knit sweater AI photo edit.",
    altResult: "Man in a deep forest-green merino knit sweater beside a pine Christmas tree after a Christmas AI photo prompt for men.",
    template: "Edit the uploaded portrait into a sharp, modern Christmas sweater portrait of a stylish man. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, festive lights and styling in rich, polished detail. If clothing is not preserved, dress him in a fitted deep forest-green merino knit sweater with a subtle tonal snowflake pattern over a crisp white collar, dark tailored chinos and a minimal steel watch. If pose is not preserved, show him leaning casually against a wooden beam, arms loosely crossed, confident half-smile at the camera, framed from the waist up with the face large and sharp. Light him with a soft warm key light and golden tree-light bokeh behind. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed decorations; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "275",
    id: "christmas-tree-lights-bokeh-selfie",
    title: "Christmas Tree Lights Bokeh Selfie AI Prompt",
    note: "Close Christmas selfie with creamy golden tree-light bokeh",
    description: "A Christmas selfie AI prompt: soft blush-pink fuzzy cardigan and large golden tree-light bokeh behind your face. Free copy-paste for Gemini, keeps your real face.",
    category: "Selfie",
    subject: "Person",
    intent: "Change lighting",
    mood: "Dreamy golden bokeh",
    background: "A softly blurred Christmas tree covered in warm white fairy lights and glass baubles, turned into large round golden bokeh",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Blush-pink fuzzy cardigan",
      "Arm's-length selfie angle",
      "Golden tree-light bokeh",
      "Dreamy warm grading",
    ],
    stays: [
      "Face and identity",
      "Skin tone",
      "Hair and head covering",
      "Glasses if worn",
    ],
    targetSourcePhoto: "One clear close-up photo of an adult woman",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even light, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource: "Casual portrait before a Christmas tree lights bokeh selfie AI edit.",
    altResult: "Woman in a blush-pink fuzzy cardigan with creamy golden Christmas tree bokeh after a Christmas selfie AI prompt.",
    template: "Edit the uploaded portrait into a glowing, modern Christmas tree-lights bokeh selfie. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, festive lights and styling in rich, polished detail. If clothing is not preserved, dress her in a soft blush-pink fuzzy knit cardigan buttoned over a cream top, small pearl studs and a thin gold necklace; keep any existing head covering. If pose is not preserved, show a close arm's-length selfie angle slightly above eye level, face turned three-quarter toward the camera, bright natural smile, chest-up framing with the face large and sharp; do not show a phone. Light her face with soft warm glow from the tree lights and a gentle front fill, with large creamy golden bokeh circles filling the background. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed decorations; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "276",
    id: "red-velvet-holiday-glam-portrait",
    title: "Red Velvet Holiday Glam AI Photo Prompt (Modest)",
    note: "Modest deep-red velvet gown with gold drop earrings and holiday lounge glam",
    description: "A Christmas portrait AI prompt: modest deep-red velvet gown, gold drop earrings, and sparkling gold bokeh in a holiday lounge. Free for Gemini, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Luxe crimson and gold",
    background: "An elegant modern holiday lounge with a gold-ornament Christmas tree, warm brass candle holders and soft gold sparkle bokeh",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Deep-red velvet gown",
      "Gold drop earrings",
      "Holiday lounge backdrop",
      "Luxe crimson grading",
    ],
    stays: [
      "Face and identity",
      "Skin tone",
      "Hair and head covering",
      "Glasses if worn",
    ],
    targetSourcePhoto: "One clear waist-up photo of an adult woman",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even light, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource: "Casual portrait before a modest red velvet holiday glam AI photo edit.",
    altResult: "Woman in a modest deep-red velvet gown with gold drop earrings after a Christmas portrait AI prompt.",
    template: "Edit the uploaded portrait into a dramatic red velvet holiday glam portrait of an elegant woman. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, festive lights and styling in rich, polished detail. If clothing is not preserved, dress her in a modest floor-length deep-red velvet gown with long sleeves and a high or modest neckline, statement gold drop earrings, polished glam makeup with winged liner and bold red lips, sleek styled hair; keep any existing head covering. If pose is not preserved, show her standing in a confident three-quarter turn, one hand resting lightly at her waist, chin slightly raised, poised editorial gaze at the camera, framed from mid-thigh up with the face large and sharp. Light her with a soft beauty-dish key light, gentle rim light and sparkling gold bokeh. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed decorations; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "277",
    id: "couple-matching-christmas-pajamas-by-tree",
    title: "Couple Matching Christmas Pajamas AI Photo Prompt",
    note: "Matching emerald satin pajamas on a rug in front of the tree",
    description: "A Christmas couple photo AI prompt: matching emerald satin pajamas by the tree. Upload two photos; both faces stay true. Free for Gemini.",
    category: "Couple",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Warm cozy emerald",
    background: "A modern living room with a tall decorated Christmas tree in warm white lights, neatly wrapped gifts and a knit throw blanket",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 2,
    changes: [
      "Matching emerald pajamas",
      "Tree rug pose",
      "Warm tree-light glow",
      "Cozy living room",
    ],
    stays: [
      "Both faces and identities",
      "Each skin tone and age",
      "Hairstyles, beards, head coverings",
      "Realistic relative heights",
    ],
    targetSourcePhoto: "Two clear photos (one per person) or one photo of you both",
    bestSourcePhoto: [
      "One clear photo per person, or one photo of you both",
      "Both faces front or three-quarter, sharp",
      "Similar lighting in both photos helps",
      "Original images should not be blurry",
    ],
    altSource: "First source portrait before a couple matching Christmas pajamas AI edit.",
    altResult: "Couple in matching emerald satin pajamas by a Christmas tree after a Christmas couple photo AI prompt.",
    altSecond: "Second source portrait before a couple matching Christmas pajamas AI edit.",
    template: "Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a cozy modern Christmas couple portrait in matching pajamas by the tree. The first uploaded photo shows person A and the second uploaded photo shows person B; if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, festive lights and styling in rich, polished detail. If clothing is not preserved, dress both in matching modest long-sleeve satin pajama sets in deep emerald with thin cream piping, with full-length trousers. If group arrangement and pose are not preserved, show them sitting close together on a soft rug in front of the tree, person B's head resting lightly near person A's shoulder, both smiling warmly at the camera, faces large and sharp. Keep natural, modest, family-friendly body language. Light them with warm tree-light glow and a soft front fill. Apply {{mood}} color grading. Use {{background}} as the backdrop. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed decorations; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "278",
    id: "couple-string-lights-doorway-christmas",
    title: "Couple String Lights Doorway Christmas AI Prompt",
    note: "Couple in coats framed by a doorway of warm string lights",
    description: "A Christmas couple photoshoot AI prompt: coats and scarves in a doorway framed by evergreen garland and warm string lights. Upload two photos; both faces stay true.",
    category: "Couple",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Warm lights, cool dusk",
    background: "A modern front doorway with a lush evergreen garland, warm white string lights, a simple wreath with no text and a lantern on the step",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 2,
    changes: [
      "Camel and charcoal coats",
      "String-lit doorway",
      "Evening ambient light",
      "Warm/cool dusk grading",
    ],
    stays: [
      "Both faces and identities",
      "Each skin tone and age",
      "Hairstyles, beards, head coverings",
      "Realistic relative heights",
    ],
    targetSourcePhoto: "Two clear photos (one per person) or one photo of you both",
    bestSourcePhoto: [
      "One clear photo per person, or one photo of you both",
      "Both faces front or three-quarter, sharp",
      "Similar lighting in both photos helps",
      "Original images should not be blurry",
    ],
    altSource: "First source portrait before a couple string lights doorway Christmas AI edit.",
    altResult: "Couple in coats framed by a Christmas doorway with string lights after a Christmas couple photoshoot AI prompt.",
    altSecond: "Second source portrait before a couple string lights doorway Christmas AI edit.",
    template: "Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a stylish modern Christmas couple portrait in a doorway framed by string lights. The first uploaded photo shows person A and the second uploaded photo shows person B; if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, festive lights and styling in rich, polished detail. If clothing is not preserved, dress person A in a long camel wool coat over a cream turtleneck and dark trousers, and person B in a charcoal overcoat, knit scarf and dark trousers; keep any existing head covering. If group arrangement and pose are not preserved, show them standing side by side in the doorway, person B's arm around person A's shoulders, both smiling at the camera, framed from the waist up with faces large and sharp. Keep natural, modest, family-friendly body language. Light them with warm string-light glow framing the doorway and soft blue evening ambient light. Apply {{mood}} color grading. Use {{background}} as the backdrop. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed decorations; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "279",
    id: "couple-christmas-market-night-stroll",
    title: "Couple Christmas Market Night Stroll AI Photo Prompt",
    note: "Couple arm-in-arm through a generic Christmas market at night",
    description: "A Christmas couple photo AI prompt: ivory wool coat and navy peacoat on a night stroll through a generic Christmas market. Upload two photos; both faces stay true.",
    category: "Couple",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Cinematic warm night",
    background: "A generic festive outdoor Christmas market at night with wooden stalls, warm string lights and a softly blurred lit tree, with no signs, text, brands or landmarks",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 2,
    changes: [
      "Ivory coat and navy peacoat",
      "Market night stroll",
      "Warm stall glow",
      "Cinematic night grading",
    ],
    stays: [
      "Both faces and identities",
      "Each skin tone and age",
      "Hairstyles, beards, head coverings",
      "Realistic relative heights",
    ],
    targetSourcePhoto: "Two clear photos (one per person) or one photo of you both",
    bestSourcePhoto: [
      "One clear photo per person, or one photo of you both",
      "Both faces front or three-quarter, sharp",
      "Similar lighting in both photos helps",
      "Original images should not be blurry",
    ],
    altSource: "First source portrait before a couple Christmas market night stroll AI edit.",
    altResult: "Couple walking arm in arm through a Christmas market at night after a Christmas couple photo AI prompt.",
    altSecond: "Second source portrait before a couple Christmas market night stroll AI edit.",
    template: "Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a cinematic modern couple night stroll through a generic Christmas market. The first uploaded photo shows person A and the second uploaded photo shows person B; if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, festive lights and styling in rich, polished detail. If clothing is not preserved, dress person A in a long ivory wool coat with a soft knit scarf and person B in a navy peacoat with a grey scarf, both in dark trousers; keep any existing head covering. If group arrangement and pose are not preserved, show them walking arm in arm toward the camera, person A laughing and looking at person B, person B smiling at the camera, framed from the waist up with faces large and sharp. Keep natural, modest, family-friendly body language. Light them with warm glow from market stalls and string lights, with soft bokeh. Apply {{mood}} color grading. Use {{background}} as the backdrop. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed decorations; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "280",
    id: "mens-christmas-photoshoot-dark-suit-gift-boxes",
    title: "Men's Christmas Photoshoot AI Prompt (Dark Suit & Gifts)",
    note: "Midnight-black suit seated on black and gold gift boxes",
    description: "An AI Christmas photo prompt for men: tailored midnight-black suit on stacked black and gold gift boxes with moody studio light. Free for Gemini, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Moody black and gold",
    background: "A dark studio set with a tall Christmas tree in warm gold lights, stacked black and gold gift boxes and soft haze",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Midnight-black suit",
      "Gift-box seating pose",
      "Moody studio light",
      "Black and gold grading",
    ],
    stays: [
      "Face and identity",
      "Skin tone",
      "Hair and beard",
      "Glasses if worn",
    ],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even light, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource: "Casual portrait before a men's Christmas photoshoot dark suit AI edit.",
    altResult: "Man in a midnight-black suit seated on black and gold gift boxes after an AI Christmas photo prompt for men.",
    template: "Edit the uploaded portrait into a dramatic modern men's Christmas photoshoot. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, festive lights and styling in rich, polished detail. If clothing is not preserved, dress him in a tailored midnight-black suit with a black turtleneck, polished dark shoes and a minimal watch. If pose is not preserved, show him seated on a stack of large wrapped gift boxes in matte black and gold paper, leaning forward with forearms on his knees, confident gaze at the camera, framed from mid-thigh up with the face large and sharp. Light him with a moody low-key studio light, gentle rim light and warm tree-light bokeh behind. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed decorations; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "281",
    id: "80s-retro-christmas-portrait",
    title: "80s Retro Christmas Portrait AI Photo Prompt",
    note: "80s fashion-editorial Christmas portrait with silver-red tinsel",
    description: "An 80s Christmas photo AI prompt: metallic puff-shoulder blouse, glossy berry lip, and shimmering silver-red tinsel curtain. Free for Gemini, keeps your real face.",
    category: "Retro",
    subject: "Person",
    intent: "Artistic restyle",
    mood: "Glossy retro film",
    background: "A shimmering silver and red tinsel curtain studio backdrop with a small retro-style Christmas tree and soft colored lights",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Puff-shoulder blouse",
      "Tinsel curtain backdrop",
      "Soft film grain",
      "Glossy retro grading",
    ],
    stays: [
      "Face and identity",
      "Skin tone",
      "Hair and head covering",
      "Glasses if worn",
    ],
    targetSourcePhoto: "One clear chest-up photo of an adult",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even light, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource: "Casual portrait before an 80s retro Christmas studio AI photo edit.",
    altResult: "Person in a puff-shoulder blouse against silver-red tinsel after an 80s Christmas photo AI prompt.",
    template: "Edit the uploaded portrait into a stylish 80s retro Christmas studio portrait with a fashion-editorial feel. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, festive lights and styling in rich, polished detail. If clothing is not preserved, dress her in a modest oversized metallic-silver or ruby-red puff-shoulder blouse with high-waisted trousers, bold statement earrings, softly voluminous styled hair and a glossy berry lip; keep any existing head covering. If pose is not preserved, show her posed in a playful three-quarter turn, chin resting lightly on one hand, bright confident smile at the camera, framed chest-up with the face large and sharp. Light her with soft glamour studio lighting, a gentle haze, subtle film grain and sparkly tinsel reflections. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed decorations; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "282",
    id: "womens-studio-christmas-photoshoot-red-backdrop",
    title: "Women's Studio Christmas Photoshoot AI Prompt (Red & Gold)",
    note: "Red satin dress against a deep-red studio backdrop with gold bokeh",
    description: "A Christmas photoshoot AI prompt template for women: modest red satin dress, gold-wrapped gift, and deep-red studio backdrop. Free for Gemini, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Rich red and gold",
    background: "A seamless deep-red studio backdrop with golden bokeh lights, gold ornaments and a few elegant wrapped gifts",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Red satin dress",
      "Gold-wrapped gift",
      "Deep-red studio backdrop",
      "Rich red and gold grading",
    ],
    stays: [
      "Face and identity",
      "Skin tone",
      "Hair and head covering",
      "Glasses if worn",
    ],
    targetSourcePhoto: "One clear waist-up photo of an adult woman",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even light, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource: "Casual portrait before a women's studio Christmas photoshoot red backdrop AI edit.",
    altResult: "Woman in a modest red satin dress holding a gold gift against a red studio backdrop after a Christmas photoshoot AI prompt.",
    template: "Edit the uploaded portrait into a polished modern women's studio Christmas photoshoot. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, festive lights and styling in rich, polished detail. If clothing is not preserved, dress her in a modest long-sleeve red satin or crepe dress with a high neckline and elegant draping, small gold earrings and soft glam makeup; keep any existing head covering. If pose is not preserved, show her standing in a graceful three-quarter turn holding a small gold-wrapped gift, warm confident smile at the camera, framed from the waist up with the face large and sharp. Light her with clean soft studio key light and a warm gold rim light. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed decorations; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "283",
    id: "christmas-snowfall-winter-coat-portrait",
    title: "Christmas Snowfall Winter Coat AI Photo Prompt",
    note: "Charcoal wool overcoat on a quiet snowy evening street",
    description: "A snowfall AI photo prompt for Christmas: tailored charcoal overcoat, knit scarf, and gently falling snow on a quiet lit street. Free for Gemini, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "Full scene transformation",
    mood: "Cool blue with warm lights",
    background: "A quiet snowy evening street with softly blurred trees wrapped in warm white lights and gently falling snow, with no signs, text or landmarks",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Charcoal wool overcoat",
      "Falling snowflakes",
      "Snowy evening street",
      "Cool blue warm lights",
    ],
    stays: [
      "Face and identity",
      "Skin tone",
      "Hair and beard",
      "Glasses if worn",
    ],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even light, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource: "Casual portrait before a Christmas snowfall winter coat AI photo edit.",
    altResult: "Man in a charcoal wool overcoat on a snowy lit street after a snowfall AI photo prompt.",
    template: "Edit the uploaded portrait into a cinematic modern Christmas snowfall portrait. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, festive lights and styling in rich, polished detail. If clothing is not preserved, dress him in a long tailored charcoal wool overcoat over a black turtleneck, a soft grey knit scarf and leather gloves. If pose is not preserved, show him standing on a snowy street, hands in coat pockets, looking at the camera with a calm confident expression, framed from the waist up with the face large and sharp. Light him with soft overcast light, warm lit-window glow and gentle falling snowflakes in the foreground. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed decorations; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "284",
    id: "couple-snowy-cabin-window-christmas",
    title: "Couple Snowy Cabin Window Christmas AI Photo Prompt",
    note: "Couple sharing a blanket on a snowy cabin window seat",
    description: "A Christmas couple photo AI prompt: chunky knit sweaters on a cabin window seat with snow falling outside. Upload two photos; both faces stay true.",
    category: "Couple",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Warm cabin glow",
    background: "A modern wooden cabin window seat with snow falling outside on pine trees, warm string lights along the window frame and a small lit tree",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 2,
    changes: [
      "Chunky knit sweaters",
      "Cabin window seat",
      "Snow outside",
      "Warm cabin glow",
    ],
    stays: [
      "Both faces and identities",
      "Each skin tone and age",
      "Hairstyles, beards, head coverings",
      "Realistic relative heights",
    ],
    targetSourcePhoto: "Two clear photos (one per person) or one photo of you both",
    bestSourcePhoto: [
      "One clear photo per person, or one photo of you both",
      "Both faces front or three-quarter, sharp",
      "Similar lighting in both photos helps",
      "Original images should not be blurry",
    ],
    altSource: "First source portrait before a couple snowy cabin window Christmas AI edit.",
    altResult: "Couple in knit sweaters on a snowy cabin window seat after a Christmas couple photo AI prompt.",
    altSecond: "Second source portrait before a couple snowy cabin window Christmas AI edit.",
    template: "Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a cozy modern couple portrait at a snowy cabin window at Christmas. The first uploaded photo shows person A and the second uploaded photo shows person B; if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, festive lights and styling in rich, polished detail. If clothing is not preserved, dress person A in a chunky ivory knit sweater and person B in a charcoal knit sweater, both with full-length trousers; keep any existing head covering. If group arrangement and pose are not preserved, show them sitting close together on a cushioned window seat, sharing a blanket and holding mugs, both smiling at the camera, framed chest-up with faces large and sharp. Keep natural, modest, family-friendly body language. Light them with warm interior lamp and candle glow contrasting with cool blue snow light from the window. Apply {{mood}} color grading. Use {{background}} as the backdrop. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed decorations; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping either face.",
  }
];

export const seedChristmas2026Styles: CatalogStyle[] = christmas2026Addon.map(
  (item, index) => {
    const source = asset(`source-${item.n}.webp`);
    const result = asset(`result-${item.n}.webp`);
    const dims = resultDims();
    const examplePairs: CatalogStyle["examplePairs"] = [
      {
        source,
        result,
        altSource: item.altSource,
        altResult: item.altResult,
        ...dims,
      },
    ];
    if (item.inputImageCount === 2 && item.altSecond) {
      examplePairs.push({
        source: asset(`source-${item.n}b.webp`),
        result,
        altSource: item.altSecond,
        altResult: item.altResult,
        ...dims,
      });
    }
    return {
      id: item.id,
      title: item.title,
      category: item.category,
      subject: item.subject,
      intent: item.intent,
      requirement: item.inputImageCount === 2 ? "Two photos" : "One photo",
      tool: "Gemini",
      note: item.note,
      height: 340,
      saved: 20 - index,
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
        tool: "Gemini",
        mode: "Image edit / transform with uploaded photo",
        inputImageCount: item.inputImageCount,
        inputImageRoles:
          item.inputImageCount === 2 ? ["person A", "person B"] : ["source photo"],
        template: item.template,
        defaults: {
          mood: item.mood,
          background: item.background,
          ratio: item.ratio,
          keepClothing: item.keepClothing,
          keepPose: item.keepPose,
        },
        lastVerified: "2026-11-01",
        limitations: [aiGeneratedLimit, faceOcclusionLimit],
      },
    };
  },
);

export const christmas2026StyleIds = new Set(
  seedChristmas2026Styles.map((style) => style.id),
);
