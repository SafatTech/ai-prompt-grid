import type { CatalogStyle } from "./types";

const PUBLISHED_SUPABASE_URL = "https://rbmirzmppbytorbhncxj.supabase.co";

function asset(name: string): string {
  const base = (process.env.NEXT_PUBLIC_SUPABASE_URL || PUBLISHED_SUPABASE_URL).replace(
    /\/$/,
    "",
  );
  const stem = name.replace(/\.[^.]+$/, "");
  return `${base}/storage/v1/object/public/catalog-public/seed/catalog/editorial/${stem}.webp`;
}

type LifestyleSeed = {
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
  ratio: "4:5 Portrait" | "1:1 Square";
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
  beforeFile: string;
  afterFile: string;
  beforeBFile?: string;
  template: string;
};

const aiGeneratedLimit =
  "Example people in the before photo are AI-generated, not real people.";
const faceOcclusionLimit = "Heavy face occlusion can weaken identity fidelity";

const styles: LifestyleSeed[] = [
  {
    n: "223",
    id: "stylish-ai-photo-prompt-for-boys-daylight-street",
    title: "Stylish AI Photo Prompt for Boys (Daylight Street)",
    note: "Daylight street stylish portrait, clean sneakers, fitted shirt, soft sun",
    description:
      "A stylish AI photo prompt for boys: daylight street portrait in a fitted shirt and clean sneakers, soft sun, real face kept. Free to copy and paste.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Soft warm natural",
    background:
      "Bright city sidewalk in soft daylight with cream shopfronts, trees and gentle background blur",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Daylight street setting",
      "Fitted casual-smart shirt",
      "Clean plain sneakers",
      "Soft sun portrait",
    ],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up or full-length photo of a boy or young man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Stylish AI Photo Prompt for Boys (Daylight Street).",
    altResult: "AI edit created with Stylish AI Photo Prompt for Boys (Daylight Street).",
    beforeFile: "stylish-ai-photo-prompt-for-boys-daylight-street-before.webp",
    afterFile: "stylish-ai-photo-prompt-for-boys-daylight-street-after.webp",
    template:
      "Edit the uploaded portrait into a bright daylight stylish street portrait of a boy. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a fitted plain button-up shirt or a neat short kurta in a solid muted color, slim dark jeans or chinos, and clean plain white sneakers with no logos; keep any existing head covering. If pose is not preserved, show him standing on the sidewalk facing the camera with a relaxed, friendly expression, one hand in a pocket, weight on one leg, full face visible. Light him with soft natural sunlight and gentle open shade on the face so skin tone stays true. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "224",
    id: "stylish-ai-photo-prompt-for-men-rooftop-blazer",
    title: "Stylish AI Photo Prompt for Men (Rooftop Blazer)",
    note: "Rooftop golden-hour open blazer lifestyle, not LinkedIn or CV",
    description:
      "An AI stylish photo prompt for men: open blazer on a city rooftop at golden hour, lifestyle fashion framing, not a LinkedIn headshot.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Luminous golden-hour warmth",
    background:
      "City rooftop terrace at golden hour with soft skyline bokeh, warm sky and a low concrete ledge",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Rooftop golden hour",
      "Open blazer lifestyle look",
      "Relaxed fashion pose",
      "City skyline bokeh",
    ],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Stylish AI Photo Prompt for Men (Rooftop Blazer).",
    altResult: "AI edit created with Stylish AI Photo Prompt for Men (Rooftop Blazer).",
    beforeFile: "stylish-ai-photo-prompt-for-men-rooftop-blazer-before.webp",
    afterFile: "stylish-ai-photo-prompt-for-men-rooftop-blazer-after.webp",
    template:
      "Edit the uploaded portrait into a stylish golden-hour rooftop lifestyle portrait of a man (fashion, not a CV or LinkedIn headshot). Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a tailored open blazer over a plain crew-neck tee or open-collar shirt, slim trousers, no tie; keep any existing head covering. If pose is not preserved, show him leaning casually against a low rooftop ledge, three-quarter body visible, looking toward the camera with a calm confident smile, never a tight passport crop. Light him with warm golden-hour sun from the side and a soft rim light on hair and shoulders. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "225",
    id: "aesthetic-soft-light-ai-photo-prompt-for-boys",
    title: "Aesthetic Soft-Light AI Photo Prompt for Boys",
    note: "Muted-colour aesthetic balcony with soft window light",
    description:
      "An aesthetic AI photo prompt for boys: muted colours, soft balcony window light and a calm Instagram-ready pose that keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm aesthetic",
    background:
      "Quiet apartment balcony with a soft sheer curtain, muted beige walls and gentle window light",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Soft balcony window light",
      "Muted aesthetic palette",
      "Calm Instagram pose",
      "Sheer curtain backdrop",
    ],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear chest-up or waist-up photo of a boy or young man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Aesthetic Soft-Light AI Photo Prompt for Boys.",
    altResult: "AI edit created with Aesthetic Soft-Light AI Photo Prompt for Boys.",
    beforeFile: "aesthetic-soft-light-ai-photo-prompt-for-boys-before.webp",
    afterFile: "aesthetic-soft-light-ai-photo-prompt-for-boys-after.webp",
    template:
      "Edit the uploaded portrait into an aesthetic soft-light balcony portrait of a boy. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a soft oversized plain knit sweater or a muted linen shirt over a simple tee, in beige, sage or dusty blue; keep any existing head covering. If pose is not preserved, show him standing by the balcony window, one hand resting on the railing, looking gently toward the camera with a soft closed-mouth smile. Light him with soft diffused window light and muted shadows; keep colours desaturated and calm. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "226",
    id: "black-suit-city-night-ai-photo-prompt-for-men",
    title: "Black Suit City Night AI Photo Prompt for Men",
    note: "Full-body black suit on a lit city street at night, fashion not headshot",
    description:
      "A black suit AI photo prompt for men: full-body tailored black suit on a lit city street at night, fashion framing, not a LinkedIn crop.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm cinematic night",
    background:
      "Lit city street at night with shop-window glow, wet pavement reflections and soft bokeh lights",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Full-body black suit",
      "Lit night street",
      "Fashion full-length pose",
      "Wet pavement bokeh",
    ],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear full-length or waist-up photo of an adult man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Standing pose works best",
      "Even daylight source photo, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Black Suit City Night AI Photo Prompt for Men.",
    altResult: "AI edit created with Black Suit City Night AI Photo Prompt for Men.",
    beforeFile: "black-suit-city-night-ai-photo-prompt-for-men-before.webp",
    afterFile: "black-suit-city-night-ai-photo-prompt-for-men-after.webp",
    template:
      "Edit the uploaded portrait into a full-body black-suit fashion portrait on a city street at night (lifestyle fashion, not a LinkedIn or CV headshot). Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a tailored plain black suit, crisp white shirt, no tie or a thin plain black tie, polished black shoes with no logos; keep any existing head covering. If pose is not preserved, show him standing full-body on the sidewalk, facing the camera, one hand adjusting a cuff or in a pocket, confident upright posture, head to toe in frame. Light him with cool streetlight and warm shop-window fill so the face stays clear and the suit fabric shows texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "227",
    id: "handsome-boy-close-up-dp-ai-photo-prompt",
    title: "Handsome Boy Close-Up DP Stylish AI Photo Prompt",
    note: "Tight handsome close-up DP portrait with clean natural skin texture",
    description:
      "A handsome boy AI photo prompt for a DP: tight close-up portrait with clean natural skin texture that keeps your real face.",
    category: "Professional portraits",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm natural neutral",
    background: "Soft out-of-focus warm cream studio backdrop",
    ratio: "1:1 Square",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Tight close-up DP crop",
      "Clean skin texture",
      "Simple polished collar",
      "Square format",
    ],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear close-up or chest-up photo of a boy or young man",
    bestSourcePhoto: [
      "Face large and sharp in frame",
      "Front-facing or slight three-quarter",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Handsome Boy Close-Up DP Stylish AI Photo Prompt.",
    altResult: "AI edit created with Handsome Boy Close-Up DP Stylish AI Photo Prompt.",
    beforeFile: "handsome-boy-close-up-dp-ai-photo-prompt-before.webp",
    afterFile: "handsome-boy-close-up-dp-ai-photo-prompt-after.webp",
    template:
      "Edit the uploaded portrait into a handsome close-up DP portrait of a boy. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a plain dark crew-neck tee or a simple collared shirt in a solid colour; keep any existing head covering. If pose is not preserved, show a tight head-and-shoulders close-up looking straight at the camera with a calm, confident expression, eyes sharp and face centred for a profile picture. Light him with soft even frontal light that keeps natural skin texture visible — no heavy beauty filter, no skin lightening. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "228",
    id: "cool-editorial-low-angle-ai-photo-prompt-for-men",
    title: "Cool Editorial Low-Angle AI Photo Prompt for Men",
    note: "Cool fashion editorial low-angle against a concrete wall, no sunglasses",
    description:
      "Cool AI photo prompts for men: low-angle fashion editorial against a concrete wall, no sunglasses, not an attitude pose.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Elegant warm editorial",
    background:
      "Tall textured concrete wall in soft afternoon light with subtle shadow falloff",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Low-angle editorial stance",
      "Concrete wall backdrop",
      "Layered fashion outfit",
      "No sunglasses",
    ],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Cool Editorial Low-Angle AI Photo Prompt for Men.",
    altResult: "AI edit created with Cool Editorial Low-Angle AI Photo Prompt for Men.",
    beforeFile: "cool-editorial-low-angle-ai-photo-prompt-for-men-before.webp",
    afterFile: "cool-editorial-low-angle-ai-photo-prompt-for-men-after.webp",
    template:
      "Edit the uploaded portrait into a cool fashion-editorial portrait of a man shot from a slight low angle against a wall (no sunglasses, not an attitude or tough-guy look). Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a layered fashion look: a plain structured jacket over a turtleneck or oxford shirt and dark tailored trousers, all unbranded; keep any existing head covering. Do not add sunglasses, shades, or eyewear that hides the eyes (keep only glasses already in the source). If pose is not preserved, show him standing against the wall, camera slightly below eye level, one shoulder angled forward, hands relaxed at his sides or one hand in a pocket, calm composed expression — never crossed arms in a tough stance, never sneering. Light him with soft directional afternoon light and a gentle rim, keeping the face fully visible. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "229",
    id: "modern-cafe-mirror-selfie-ai-photo-prompt-for-boys",
    title: "Modern Cafe Mirror Selfie AI Photo Prompt for Boys",
    note: "Modern cafe mirror selfie, phone in frame optional, natural colour",
    description:
      "A modern AI photo prompt for boys: contemporary cafe mirror selfie with natural colour, phone in frame optional, real face kept.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Soft warm natural",
    background:
      "Modern cafe interior with an arched mirror, warm wood, plants and soft daylight through a window",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Cafe mirror selfie",
      "Modern interior",
      "Casual smart outfit",
      "Natural colour grade",
    ],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear photo of a boy or young man, face fully visible",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Modern Cafe Mirror Selfie AI Photo Prompt for Boys.",
    altResult: "AI edit created with Modern Cafe Mirror Selfie AI Photo Prompt for Boys.",
    beforeFile: "modern-cafe-mirror-selfie-ai-photo-prompt-for-boys-before.webp",
    afterFile: "modern-cafe-mirror-selfie-ai-photo-prompt-for-boys-after.webp",
    template:
      "Edit the uploaded portrait into a modern cafe mirror selfie of a boy. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a neat casual-smart look: a plain oversized shirt or light sweater over a tee, straight jeans, unbranded; keep any existing head covering. If pose is not preserved, show his reflection in a full-length cafe mirror, holding a plain phone case with no logo at chest height so the face stays fully visible, the other hand relaxed, soft natural smile. Light him with soft cafe daylight from a side window; keep colours natural and modern, not oversaturated. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "230",
    id: "stylish-boy-outdoor-stairs-ai-photo-prompt",
    title: "Stylish Boy Outdoor Stairs Mural AI Photo Prompt",
    note: "Outfit-forward outdoor stairs or mural portrait, DP-ready crop",
    description:
      "A stylish boy AI photo prompt: outfit-forward outdoor stairs or mural portrait, ready for Instagram, with your real face kept.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm golden evening",
    background:
      "Outdoor concrete stairs beside a colourful abstract mural wall with soft late-afternoon light",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Outdoor stairs or mural",
      "Outfit-forward styling",
      "Late-afternoon light",
      "Instagram-ready crop",
    ],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear full-length or waist-up photo of a boy or young man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Standing pose works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Stylish Boy Outdoor Stairs Mural AI Photo Prompt.",
    altResult: "AI edit created with Stylish Boy Outdoor Stairs Mural AI Photo Prompt.",
    beforeFile: "stylish-boy-outdoor-stairs-ai-photo-prompt-before.webp",
    afterFile: "stylish-boy-outdoor-stairs-ai-photo-prompt-after.webp",
    template:
      "Edit the uploaded portrait into a stylish outdoor stairs portrait of a boy, outfit-forward. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a coordinated casual look: a fitted solid shirt or light bomber over a tee, clean chinos or jeans, plain sneakers with no logos; optionally a neat short kurta with jeans; keep any existing head covering. If pose is not preserved, show him sitting on outdoor stairs or standing mid-step beside a mural, body angled three-quarter, looking at the camera with a relaxed smile, outfit clearly visible from head to mid-calf. Light him with soft late-afternoon sun and gentle shadow falloff on the stairs. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "231",
    id: "men-suit-photoshoot-fashion-ai-photo-prompt",
    title: "Men Suit Photoshoot AI Photo Prompt (Fashion)",
    note: "Three-quarter suit photoshoot with fashion lighting, not plain office",
    description:
      "An AI photo prompt for men in a suit: three-quarter fashion photoshoot with studio-style light, not a plain office backdrop or LinkedIn crop.",
    category: "Professional portraits",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Elegant warm editorial",
    background:
      "Soft charcoal fashion studio backdrop with a gentle gradient and subtle rim light",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Three-quarter suit pose",
      "Fashion studio lighting",
      "Tailored suit styling",
      "Gradient studio backdrop",
    ],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Men Suit Photoshoot AI Photo Prompt (Fashion).",
    altResult: "AI edit created with Men Suit Photoshoot AI Photo Prompt (Fashion).",
    beforeFile: "men-suit-photoshoot-fashion-ai-photo-prompt-before.webp",
    afterFile: "men-suit-photoshoot-fashion-ai-photo-prompt-after.webp",
    template:
      "Edit the uploaded portrait into a three-quarter fashion photoshoot of a man in a suit (fashion lighting, not a plain office or LinkedIn headshot). Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a tailored navy or charcoal suit with a plain white or soft-blue shirt, optional thin plain tie, pocket square optional and unbranded; keep any existing head covering. If pose is not preserved, show him from mid-thigh up in a three-quarter turn toward the camera, one hand lightly adjusting the jacket lapel, composed editorial expression. Light him with a soft fashion key light, gentle fill and a subtle rim — never flat office fluorescent light. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "232",
    id: "free-stylish-editor-portrait-ai-photo-prompt",
    title: "Free Stylish Editor Portrait AI Photo Prompt for Boys",
    note: "Simple polished free stylish editor portrait that keeps your real face",
    description:
      "A free stylish AI photo editor prompt: a simple polished portrait look that answers the free stylish editor query and keeps your real face.",
    category: "Professional portraits",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm natural neutral",
    background: "Soft beige studio backdrop",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Simple polished portrait",
      "Clean neutral backdrop",
      "Smart casual shirt",
      "Soft studio light",
    ],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear chest-up photo of a boy or young man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Free Stylish Editor Portrait AI Photo Prompt for Boys.",
    altResult:
      "AI edit created with Free Stylish Editor Portrait AI Photo Prompt for Boys.",
    beforeFile: "free-stylish-editor-portrait-ai-photo-prompt-before.webp",
    afterFile: "free-stylish-editor-portrait-ai-photo-prompt-after.webp",
    template:
      "Edit the uploaded portrait into a simple polished stylish editor portrait of a boy. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a clean plain button-up shirt in white, light blue or soft grey, sleeves neat; keep any existing head covering. If pose is not preserved, show a calm chest-up portrait facing the camera with a natural slight smile, shoulders relaxed, face centred and sharp. Light him with soft even studio light and gentle catchlights in the eyes; keep skin texture natural. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "233",
    id: "stylish-girl-daylight-street",
    title: "Stylish Girl Daylight Street AI Photo Prompt",
    note: "Daylight stylish street portrait for girls, modest casual-smart, soft sun",
    description:
      "A stylish girl AI photo prompt: daylight street or plaza portrait in a fitted blouse or modest kurti and jeans, soft sun, real face kept. Free to copy and paste.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Soft warm natural",
    background:
      "Bright city plaza sidewalk in soft daylight with cream shopfronts and gentle blur",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Daylight plaza street setting",
      "Modest casual-smart blouse or kurti",
      "Soft sun portrait",
      "Family-safe modest neckline",
    ],
    stays: [
      "Face and identity",
      "Skin tone",
      "Hairstyle or head covering",
      "Glasses if worn",
    ],
    targetSourcePhoto: "One clear waist-up or full-length photo of a girl or young woman",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Stylish Girl Daylight Street AI Photo Prompt.",
    altResult: "AI edit created with Stylish Girl Daylight Street AI Photo Prompt.",
    beforeFile: "stylish-girl-daylight-street-before.webp",
    afterFile: "stylish-girl-daylight-street-after.webp",
    template:
      "Edit the uploaded portrait into a bright daylight stylish street portrait of a young woman. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any glasses or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a fitted plain blouse or a modest long-sleeve kurti in a solid muted color with slim jeans or chinos, optional light dupatta draped modestly; covered neckline and sleeves or three-quarter sleeves, no sheer fabric; keep any existing head covering. If pose is not preserved, show them standing on a bright city plaza sidewalk facing the camera with a relaxed, friendly expression, one hand lightly at their side, weight on one leg, full face visible. Light them with soft natural sunlight and gentle open shade on the face so skin tone stays true. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "234",
    id: "cool-women-outdoor-editorial",
    title: "Cool Women Outdoor Editorial AI Photo Prompt",
    note: "Muted outdoor fashion editorial for women; no sunglasses, attitude, car, bike or rose",
    description:
      "A cool AI photo prompt for women: muted outdoor fashion-editorial stance against a plain concrete wall, modest outfit, real face kept.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Cool muted editorial",
    background: "Soft outdoor concrete wall with muted daylight and gentle shadow",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Muted outdoor editorial",
      "Plain concrete wall",
      "Modest layered outfit",
      "Calm composed stance",
    ],
    stays: [
      "Face and identity",
      "Skin tone",
      "Hairstyle or head covering",
      "Glasses if worn",
    ],
    targetSourcePhoto: "One clear waist-up photo of an adult woman",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Cool Women Outdoor Editorial AI Photo Prompt.",
    altResult: "AI edit created with Cool Women Outdoor Editorial AI Photo Prompt.",
    beforeFile: "cool-women-outdoor-editorial-before.webp",
    afterFile: "cool-women-outdoor-editorial-after.webp",
    template:
      "Edit the uploaded portrait into a cool outdoor fashion-editorial portrait of a woman against a plain wall (no sunglasses, not an attitude or tough-girl look, no car, bike or rose props). Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any glasses or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a muted outdoor fashion look: a plain structured jacket or long-sleeve blouse over tailored trousers or dark jeans, all unbranded; covered neckline and sleeves, no sheer fabric; keep any existing head covering. Do not add sunglasses, shades, or eyewear that hides the eyes (keep only glasses already in the source). If pose is not preserved, show them standing against a soft outdoor concrete wall, one shoulder angled slightly forward, hands relaxed at their sides or one hand lightly resting, calm composed expression — never crossed arms in a tough stance, never sneering, never attitude posing. Light them with soft muted daylight and a gentle shadow falloff, keeping the face fully visible. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "235",
    id: "modern-girl-cafe-balcony",
    title: "Modern Girl Cafe Balcony AI Photo Prompt",
    note: "Contemporary cafe or home balcony portrait, modest neckline and sleeves",
    description:
      "A modern girl AI photo prompt: contemporary cafe or home balcony portrait with soft natural light, modest outfit and a calm modern pose.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Soft warm natural",
    background: "Modern cafe balcony with soft daylight, railing and gentle city blur",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Cafe or home balcony",
      "Modest contemporary outfit",
      "Soft natural daylight",
      "Calm modern pose",
    ],
    stays: [
      "Face and identity",
      "Skin tone",
      "Hairstyle or head covering",
      "Glasses if worn",
    ],
    targetSourcePhoto: "One clear waist-up photo of a girl or young woman",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Modern Girl Cafe Balcony AI Photo Prompt.",
    altResult: "AI edit created with Modern Girl Cafe Balcony AI Photo Prompt.",
    beforeFile: "modern-girl-cafe-balcony-before.webp",
    afterFile: "modern-girl-cafe-balcony-after.webp",
    template:
      "Edit the uploaded portrait into a modern cafe or home balcony portrait of a young woman. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any glasses or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a contemporary casual-smart look: a neat long-sleeve blouse or soft knit sweater with modest neckline, tailored trousers or jeans, unbranded; sleeves covering the arms or three-quarter length, no sheer fabric; keep any existing head covering. If pose is not preserved, show them standing on a modern cafe or home balcony, one hand resting lightly on the railing, looking gently toward the camera with a calm soft smile, three-quarter body visible. Light them with soft natural daylight and gentle open shade on the face. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "236",
    id: "stylish-girl-instagram-dp",
    title: "Stylish Girl Instagram DP AI Photo Prompt",
    note: "Polished Instagram DP portrait with soft window light; solo only, no couple",
    description:
      "A stylish photo prompt for girls: polished Instagram DP portrait with soft window light that keeps your real face. Square crop, free to copy and paste.",
    category: "Professional portraits",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm natural neutral",
    background: "Soft out-of-focus warm cream window-lit backdrop",
    ratio: "1:1 Square",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Instagram DP crop",
      "Soft window light",
      "Polished modest blouse",
      "Square format",
    ],
    stays: [
      "Face and identity",
      "Skin tone",
      "Hairstyle or head covering",
      "Glasses if worn",
    ],
    targetSourcePhoto: "One clear chest-up photo of a girl or young woman",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Stylish Girl Instagram DP AI Photo Prompt.",
    altResult: "AI edit created with Stylish Girl Instagram DP AI Photo Prompt.",
    beforeFile: "stylish-girl-instagram-dp-before.webp",
    afterFile: "stylish-girl-instagram-dp-after.webp",
    template:
      "Edit the uploaded portrait into a polished stylish Instagram DP portrait of a young woman (solo portrait only — do not add a couple or second person). Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any glasses or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a simple polished look: a plain crew-neck or modest collared blouse in a soft solid colour with covered neckline; keep any existing head covering. If pose is not preserved, show a tight head-and-shoulders close-up looking straight at the camera with a calm, confident expression, eyes sharp and face centred for a profile picture. Light them with soft warm window light that keeps natural skin texture visible — no heavy beauty filter, no skin lightening. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
];

/** 14 approved stylish styles numbered 223–236. */
export const seedStylishStyles: CatalogStyle[] = styles.map((item, index) => {
  const source = asset(`source-${item.n}.webp`);
  const result = asset(`result-${item.n}.webp`);
  const examplePairs: CatalogStyle["examplePairs"] = [
    {
      source,
      result,
      altSource: item.altSource,
      altResult: item.altResult,
      resultWidth: 1200,
      resultHeight: item.ratio === "1:1 Square" ? 1500 : 1489,
    },
  ];
  if (item.inputImageCount === 2 && item.altSecond) {
    examplePairs.push({
      source: asset(`source-${item.n}b.webp`),
      result,
      altSource: item.altSecond,
      altResult: item.altResult,
      resultWidth: 1200,
      resultHeight: 1489,
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
      lastVerified: "2026-10-25",
      limitations: [aiGeneratedLimit, faceOcclusionLimit],
    },
  };
});

export const stylishStyleIds = new Set(seedStylishStyles.map((style) => style.id));

export const stylishAssetProvenance = {
  source: "seed",
  licence: "catalog",
  modelRelease: false,
  notes:
    "Before photos are AI-generated, not real people. The after images are AI edits of those sources.",
} as const;
