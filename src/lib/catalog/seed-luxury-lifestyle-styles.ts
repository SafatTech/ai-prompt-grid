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
    n: "237",
    id: "luxury-lifestyle-balcony-ai-photo-prompt",
    title: "Solo Luxury Lifestyle Balcony AI Photo Prompt",
    note: "Evening balcony luxury lifestyle portrait with soft city bokeh",
    description:
      "A luxury lifestyle AI prompt: evening balcony portrait with soft city bokeh and elevated casual-luxury outfit, real face kept.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm golden evening",
    background:
      "Evening balcony overlooking soft city bokeh lights with a dark blue dusk sky",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Evening balcony setting",
      "Elevated casual-luxury outfit",
      "City bokeh lights",
      "Relaxed lifestyle pose",
    ],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of one person",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Solo Luxury Lifestyle Balcony AI Photo Prompt.",
    altResult: "AI edit created with Solo Luxury Lifestyle Balcony AI Photo Prompt.",
    beforeFile: "luxury-lifestyle-balcony-ai-photo-prompt-before.webp",
    afterFile: "luxury-lifestyle-balcony-ai-photo-prompt-after.webp",
    template:
      "Edit the uploaded portrait into a luxury lifestyle evening balcony portrait. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in elevated casual-luxury clothes: a fine knit polo or open-collar linen shirt under a light unstructured blazer, tailored trousers, unbranded; keep any existing head covering. If pose is not preserved, show them leaning lightly on a balcony railing, three-quarter body visible, looking toward the camera with a calm, composed expression. Light them with soft dusk ambient light and warm interior spill from behind so the face stays clear. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "238",
    id: "black-suit-lobby-luxury-ai-photo-prompt-for-men",
    title: "Black Suit Lobby Luxury AI Photo Prompt for Men",
    note: "Tailored black suit in a lit hotel lobby or lounge, fashion full-body",
    description:
      "A black suit AI photo prompt for men: tailored black suit in a lit hotel lobby or lounge, full-body luxury fashion, not a LinkedIn crop.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm cinematic night",
    background:
      "Warm lit hotel lobby with marble floors, soft chandelier glow and deep hallway perspective",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Hotel lobby setting",
      "Tailored black suit",
      "Full-body fashion pose",
      "Chandelier warm light",
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
      "AI-generated source portrait for Black Suit Lobby Luxury AI Photo Prompt for Men.",
    altResult: "AI edit created with Black Suit Lobby Luxury AI Photo Prompt for Men.",
    beforeFile: "black-suit-lobby-luxury-ai-photo-prompt-for-men-before.webp",
    afterFile: "black-suit-lobby-luxury-ai-photo-prompt-for-men-after.webp",
    template:
      "Edit the uploaded portrait into a full-body black-suit luxury portrait in a hotel lobby (elevated lifestyle fashion, not a LinkedIn or CV headshot, and distinct from a street-fashion night suit). Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a perfectly tailored plain black suit, crisp white shirt, thin plain black tie optional, polished black shoes with no logos; keep any existing head covering. If pose is not preserved, show him standing full-body in the lobby, one hand in a pocket, calm upright posture, head to toe in frame, looking at the camera. Light him with warm chandelier glow and soft lobby fill so suit fabric and face stay detailed. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "239",
    id: "dubai-skyline-balcony-luxury-ai-photo-prompt",
    title: "Dubai Skyline Balcony Lifestyle AI Photo Prompt",
    note: "Modern glass skyline balcony at dusk; no landmark or brand names",
    description:
      "A Dubai AI photo prompt style: modern glass skyline balcony at dusk with soft city lights, no landmark names, real face kept.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm golden dusk",
    background:
      "High balcony overlooking a modern glass skyline city at dusk with soft amber and blue city lights (no named landmarks)",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Modern glass skyline at dusk",
      "High balcony framing",
      "Elevated evening outfit",
      "City-light ambience",
    ],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of one person",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Dubai Skyline Balcony Lifestyle AI Photo Prompt.",
    altResult: "AI edit created with Dubai Skyline Balcony Lifestyle AI Photo Prompt.",
    beforeFile: "dubai-skyline-balcony-luxury-ai-photo-prompt-before.webp",
    afterFile: "dubai-skyline-balcony-luxury-ai-photo-prompt-after.webp",
    template:
      "Edit the uploaded portrait into a luxury balcony portrait overlooking a modern glass skyline city at dusk (generic skyline only — do not depict or name any specific landmark, tower, hotel or brand). Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a light evening shirt with rolled sleeves or a soft open blazer over a plain tee, tailored trousers; keep any existing head covering. If pose is not preserved, show them standing on a high balcony facing the camera, city lights soft behind them, relaxed confident posture. Light them with warm dusk sky light and cool city-glow rim; keep the skyline abstract and unnamed. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "240",
    id: "businessman-lifestyle-lounge-ai-photo-prompt",
    title: "Businessman Lifestyle Lounge Luxury AI Photo Prompt",
    note: "Open-collar blazer businessman in a glass lounge, success vibe not CV",
    description:
      "A businessman AI photo prompt: open-collar shirt and blazer in a glass lounge, lifestyle success vibe without LinkedIn headshot framing.",
    category: "Professional portraits",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm elegant neutral",
    background:
      "Modern glass lounge with soft leather seating, warm lamps and a softly blurred city view through floor-to-ceiling windows",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Glass lounge setting",
      "Open-collar blazer look",
      "Lifestyle businessman pose",
      "Warm lamp light",
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
      "AI-generated source portrait for Businessman Lifestyle Lounge Luxury AI Photo Prompt.",
    altResult:
      "AI edit created with Businessman Lifestyle Lounge Luxury AI Photo Prompt.",
    beforeFile: "businessman-lifestyle-lounge-ai-photo-prompt-before.webp",
    afterFile: "businessman-lifestyle-lounge-ai-photo-prompt-after.webp",
    template:
      "Edit the uploaded portrait into a businessman lifestyle portrait in a modern lounge (success lifestyle, not a LinkedIn, CV or passport headshot). Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in an open-collar white or light-blue shirt under a navy or charcoal blazer, no tie, tailored trousers; keep any existing head covering. If pose is not preserved, show him seated casually on a lounge chair or perched on the arm, three-quarter body, looking at the camera with a calm confident smile. Light him with warm lounge lamps and soft window light so the face stays true and unretouched. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "241",
    id: "luxury-life-cinematic-night-ai-photo-prompt",
    title: "Cinematic Night Luxury Lifestyle AI Photo Prompt",
    note: "Cinematic night luxury-life terrace with premium fabric textures",
    description:
      "A luxury life AI prompt: cinematic night colour grade on a city terrace with premium fabric textures and your real face kept.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Moody cinematic",
    background:
      "Night city terrace with string lights, dark railing and glowing skyline bokeh",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Cinematic night grade",
      "City terrace",
      "Premium fabric textures",
      "Moody lifestyle pose",
    ],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of one person",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Cinematic Night Luxury Lifestyle AI Photo Prompt.",
    altResult: "AI edit created with Cinematic Night Luxury Lifestyle AI Photo Prompt.",
    beforeFile: "luxury-life-cinematic-night-ai-photo-prompt-before.webp",
    afterFile: "luxury-life-cinematic-night-ai-photo-prompt-after.webp",
    template:
      "Edit the uploaded portrait into a cinematic night luxury-life portrait on a city terrace. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in premium fabrics: a dark cashmere sweater or silk open-collar shirt under a long overcoat, tailored dark trousers; keep any existing head covering. If pose is not preserved, show them standing near a terrace railing at night, looking toward the camera with a quiet, composed expression, fabric texture clearly visible. Light them with cool night ambient and a warm practical light from one side for cinematic contrast. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "242",
    id: "old-money-aesthetic-portrait-ai-photo-prompt",
    title: "Old-Money Aesthetic Luxury Portrait AI Photo Prompt",
    note: "Quiet old-money knit/wool portrait on soft estate garden steps",
    description:
      "An old money aesthetic prompt: quiet neutral knit or wool portrait on soft estate garden stone steps, no logos, real face kept.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm heritage neutral",
    background:
      "Soft estate garden with stone steps, trimmed hedges and muted greenery in gentle daylight",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Old-money aesthetic wardrobe",
      "Estate garden stone steps",
      "Quiet neutral palette",
      "Soft daylight portrait",
    ],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of one person",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Old-Money Aesthetic Luxury Portrait AI Photo Prompt.",
    altResult:
      "AI edit created with Old-Money Aesthetic Luxury Portrait AI Photo Prompt.",
    beforeFile: "old-money-aesthetic-portrait-ai-photo-prompt-before.webp",
    afterFile: "old-money-aesthetic-portrait-ai-photo-prompt-after.webp",
    template:
      "Edit the uploaded portrait into a quiet old-money aesthetic portrait. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in understated heritage clothes: a cream or camel knit sweater, soft wool trousers or chinos, optional classic trench or cardigan, all plain and unbranded; keep any existing head covering. If pose is not preserved, show them seated or standing on stone garden steps, relaxed posture, soft closed-mouth smile, looking gently at the camera. Light them with soft natural daylight and gentle shade; keep the palette muted and logo-free. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "243",
    id: "men-black-suit-three-quarter-ai-photo-prompt",
    title: "Men Black Suit Three-Quarter Luxury AI Photo Prompt",
    note: "Classic black suit three-quarter with warm key light, studio fashion",
    description:
      "A men in black suit AI prompt: classic black suit three-quarter portrait with warm key light, studio fashion, distinct from lobby luxury.",
    category: "Professional portraits",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Elegant warm editorial",
    background:
      "Warm soft-brown fashion studio backdrop with gentle gradient and clean negative space",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Three-quarter black suit",
      "Warm key fashion light",
      "Studio gradient backdrop",
      "Editorial expression",
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
      "AI-generated source portrait for Men Black Suit Three-Quarter Luxury AI Photo Prompt.",
    altResult:
      "AI edit created with Men Black Suit Three-Quarter Luxury AI Photo Prompt.",
    beforeFile: "men-black-suit-three-quarter-ai-photo-prompt-before.webp",
    afterFile: "men-black-suit-three-quarter-ai-photo-prompt-after.webp",
    template:
      "Edit the uploaded portrait into a classic black-suit three-quarter fashion studio portrait of a man (warm key light; distinct from a hotel-lobby or night-street suit look; not a LinkedIn crop). Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a classic tailored black suit, crisp white shirt, optional thin plain black tie, unbranded; keep any existing head covering. If pose is not preserved, show him from mid-thigh up in a three-quarter turn, one hand lightly resting at the jacket button, calm editorial expression. Light him with a warm soft key light from camera-left, gentle fill and a subtle rim — fashion studio, not office fluorescent. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "244",
    id: "luxury-house-terrace-solo-ai-photo-prompt",
    title: "Luxury House Terrace Lifestyle AI Photo Prompt",
    note: "Person-forward on a modern house terrace; not a room redesign",
    description:
      "A luxury house prompt: person on a modern terrace, person-forward lifestyle portrait — not an interior redesign look.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Soft warm natural",
    background:
      "Modern house terrace with light stone flooring, slim railing, soft greenery and bright daylight sky",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Modern house terrace",
      "Person-forward framing",
      "Elevated casual outfit",
      "Bright daylight",
    ],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up or full-length photo of one person",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Standing pose works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Luxury House Terrace Lifestyle AI Photo Prompt.",
    altResult: "AI edit created with Luxury House Terrace Lifestyle AI Photo Prompt.",
    beforeFile: "luxury-house-terrace-solo-ai-photo-prompt-before.webp",
    afterFile: "luxury-house-terrace-solo-ai-photo-prompt-after.webp",
    template:
      "Edit the uploaded portrait into a person-forward luxury house terrace portrait (the person is the subject — do not redesign or restyle an interior room). Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in elevated casual clothes: a linen shirt, light trousers or a soft knit set, plain and unbranded; keep any existing head covering. If pose is not preserved, show them standing on the terrace facing the camera, mid-shot to three-quarter, relaxed smile, house architecture softly secondary behind them. Light them with bright natural daylight and soft open shade on the face. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "245",
    id: "luxury-editorial-magazine-ai-photo-prompt",
    title: "Solo Luxury Editorial Magazine AI Photo Prompt",
    note: "Magazine-style single editorial portrait, clean backdrop, premium wardrobe",
    description:
      "A luxury AI photo prompt: magazine-style single editorial portrait with a clean backdrop and premium wardrobe, real face kept.",
    category: "Professional portraits",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Elegant warm editorial",
    background: "Clean pale stone editorial backdrop with soft shadow falloff",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Magazine editorial framing",
      "Premium wardrobe",
      "Clean pale backdrop",
      "Soft fashion light",
    ],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear chest-up or waist-up photo of one person",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even daylight, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Solo Luxury Editorial Magazine AI Photo Prompt.",
    altResult: "AI edit created with Solo Luxury Editorial Magazine AI Photo Prompt.",
    beforeFile: "luxury-editorial-magazine-ai-photo-prompt-before.webp",
    afterFile: "luxury-editorial-magazine-ai-photo-prompt-after.webp",
    template:
      "Edit the uploaded portrait into a magazine-style luxury editorial portrait. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in premium editorial wardrobe: a structured blazer over a fine knit, or a tailored coat with a soft scarf, all plain and unbranded; keep any existing head covering. If pose is not preserved, show a clean chest-up to waist-up editorial pose facing the camera with a composed look, ample negative space around the subject like a magazine cover without lettering. Light them with soft fashion key light and gentle falloff; keep skin texture natural. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "246",
    id: "quiet-luxury-couple-evening-walk-ai-photo-prompt",
    title: "Quiet Luxury Couple Evening Walk AI Photo Prompt",
    note: "Couple quiet-luxury evening waterfront walk; merge two photos",
    description:
      "A luxury lifestyle AI prompt for a couple: quiet evening waterfront walk in muted outfits, merge two photos, both real faces kept.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Warm golden dusk",
    background:
      "Quiet waterfront promenade at dusk with soft city lights across the water and a warm sky",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 2,
    changes: [
      "Quiet luxury evening walk",
      "Waterfront promenade",
      "Muted couple outfits",
      "Two-photo face merge",
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
      "Faces large and sharp",
      "Similar light in both photos",
      "Original images should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Quiet Luxury Couple Evening Walk AI Photo Prompt.",
    altResult: "AI edit created with Quiet Luxury Couple Evening Walk AI Photo Prompt.",
    altSecond:
      "Second AI-generated source portrait for Quiet Luxury Couple Evening Walk AI Photo Prompt.",
    beforeFile: "quiet-luxury-couple-evening-walk-ai-photo-prompt-before.webp",
    afterFile: "quiet-luxury-couple-evening-walk-ai-photo-prompt-after.webp",
    beforeBFile: "quiet-luxury-couple-evening-walk-ai-photo-prompt-before-b.webp",
    template:
      "Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a quiet luxury evening walk of a couple. The first uploaded photo shows person A and the second uploaded photo shows person B; if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in muted quiet-luxury evening outfits: a soft knit and tailored trousers or open blazer for him, and a modest long-sleeve midi dress or elegant kurta set with a light dupatta for her; keep any head covering or dupatta. If group arrangement and pose are not preserved, show them walking side by side along a quiet waterfront promenade at dusk, her hand lightly on his arm, both looking toward the camera with soft smiles, at realistic relative heights. Keep natural, modest, family-friendly body language. Light both with the same warm dusk glow and soft city-light bokeh so they look photographed together. Apply {{mood}} color grading. Use {{background}} as the backdrop. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "247",
    id: "quiet-luxury-terrace-women",
    title: "Quiet Luxury Terrace Women AI Photo Prompt",
    note: "Quiet-luxury muted knit/silk evening terrace portrait for women; city bokeh",
    description:
      "A luxury lifestyle AI prompt for women: muted knit or silk evening terrace portrait with soft city bokeh, modest quiet-luxury outfit, real face kept.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm golden evening",
    background: "Evening terrace overlooking soft city bokeh with dark blue dusk sky",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Evening terrace setting",
      "Muted knit or silk outfit",
      "City bokeh lights",
      "Quiet composed pose",
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
      "AI-generated source portrait for Quiet Luxury Terrace Women AI Photo Prompt.",
    altResult: "AI edit created with Quiet Luxury Terrace Women AI Photo Prompt.",
    beforeFile: "quiet-luxury-terrace-women-before.webp",
    afterFile: "quiet-luxury-terrace-women-after.webp",
    template:
      "Edit the uploaded portrait into a quiet-luxury evening terrace portrait of a woman. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any glasses or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in muted quiet-luxury evening clothes: a fine knit sweater or soft silk blouse with a modest neckline and long or three-quarter sleeves, tailored trousers or a midi skirt, plain and unbranded; no saree; keep any existing head covering. If pose is not preserved, show them standing on an evening terrace, three-quarter body visible, looking toward the camera with a calm, composed expression. Light them with soft dusk ambient light and warm city glow so the face stays clear. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Do not depict or name any landmark, tower, hotel, private jet, yacht, mansion, watch or luxury car. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "248",
    id: "dubai-balcony-women-lifestyle",
    title: "Dubai Balcony Women Lifestyle AI Photo Prompt",
    note: "Generic Dubai-skyline balcony at dusk for women; no landmark or brand names",
    description:
      "A Dubai AI photo prompt for women: elevated balcony overlooking a soft generic Middle-Eastern city skyline at dusk, modest casual-luxury outfit, real face kept.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm golden evening",
    background:
      "Elevated balcony overlooking a soft generic Middle-Eastern city skyline at dusk with warm lights (no landmark names)",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Elevated balcony at dusk",
      "Generic Middle-Eastern skyline",
      "Modest casual-luxury outfit",
      "Warm city-light ambience",
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
      "AI-generated source portrait for Dubai Balcony Women Lifestyle AI Photo Prompt.",
    altResult: "AI edit created with Dubai Balcony Women Lifestyle AI Photo Prompt.",
    beforeFile: "dubai-balcony-women-lifestyle-before.webp",
    afterFile: "dubai-balcony-women-lifestyle-after.webp",
    template:
      "Edit the uploaded portrait into a luxury balcony lifestyle portrait of a woman overlooking a soft generic Middle-Eastern city skyline at dusk (generic skyline only — do not depict or name any specific landmark, tower, hotel or brand). Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any glasses or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in elevated casual-luxury clothes: a soft open-collar blouse or fine knit under a light unstructured blazer, tailored trousers, modest neckline and sleeves, plain and unbranded; no saree; keep any existing head covering. If pose is not preserved, show them standing on an elevated balcony facing the camera, city lights soft behind them, relaxed confident posture. Light them with warm dusk sky light and cool city-glow rim; keep the skyline abstract and unnamed. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "249",
    id: "old-money-garden-women",
    title: "Old-Money Garden Women AI Photo Prompt",
    note: "Cream/neutral wool or linen old-money garden editorial for women; no saree or logos",
    description:
      "An old money aesthetic prompt for women: cream or neutral wool or linen garden portrait on stone steps, quiet heritage look, real face kept.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Soft warm natural",
    background: "Quiet estate garden with stone steps, soft trees and cream daylight",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Estate garden setting",
      "Cream or neutral wool/linen",
      "Stone steps pose",
      "Quiet heritage palette",
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
    altSource: "AI-generated source portrait for Old-Money Garden Women AI Photo Prompt.",
    altResult: "AI edit created with Old-Money Garden Women AI Photo Prompt.",
    beforeFile: "old-money-garden-women-before.webp",
    afterFile: "old-money-garden-women-after.webp",
    template:
      "Edit the uploaded portrait into a quiet old-money aesthetic garden portrait of a woman. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any glasses or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in understated heritage clothes: a cream or neutral wool sweater or linen blouse with a modest neckline and long sleeves, soft wool trousers or a midi skirt, optional classic cardigan, all plain and unbranded; no saree and no logos; keep any existing head covering. If pose is not preserved, show them seated or standing on stone garden steps, relaxed posture, soft closed-mouth smile, looking gently at the camera. Light them with soft cream daylight and gentle shade; keep the palette muted and logo-free. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
];

/** 13 approved luxury lifestyle styles numbered 237–249. */
export const seedLuxuryLifestyleStyles: CatalogStyle[] = styles.map((item, index) => {
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
    saved: 13 - index,
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

export const luxuryLifestyleStyleIds = new Set(
  seedLuxuryLifestyleStyles.map((style) => style.id),
);

export const luxuryLifestyleAssetProvenance = {
  source: "seed",
  licence: "catalog",
  modelRelease: false,
  notes:
    "Before photos are AI-generated, not real people. The after images are AI edits of those sources.",
} as const;
