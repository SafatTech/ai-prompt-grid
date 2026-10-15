import type { CatalogStyle } from "./types";

/**
 * Prefer Supabase catalog-public WebPs (uploaded by publish-boys-standalone).
 * Falls back to the published project URL when the env is unset, because the
 * boys WebPs are not checked into this repo.
 */
const PUBLISHED_SUPABASE_URL = "https://rbmirzmppbytorbhncxj.supabase.co";

function asset(name: string): string {
  const base = (
    process.env.NEXT_PUBLIC_SUPABASE_URL || PUBLISHED_SUPABASE_URL
  ).replace(/\/$/, "");
  const stem = name.replace(/\.[^.]+$/, "");
  return `${base}/storage/v1/object/public/catalog-public/seed/catalog/editorial/${stem}.webp`;
}

type BoysSeed = {
  n: string;
  id: string;
  title: string;
  note: string;
  description: string;
  category: "Cinematic";
  subject: CatalogStyle["subject"];
  intent: CatalogStyle["intent"];
  requirement: CatalogStyle["requirement"];
  mood: string;
  background: string;
  ratio: "4:5 Portrait" | "1:1 Square" | "9:16 Story";
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

const boys: BoysSeed[] = [
  {
    n: "123",
    id: "trending-ai-photo-prompt-for-boys-with-car-night",
    title: "Trending AI Photo Prompt for Boys with Car (Night)",
    note: "Leaning on a generic black sports car on a wet night road",
    description:
      "A trending AI photo prompt for boys with a car: lean on a sleek unbadged black sports car on a rain-wet city road at night, with your real face kept.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Cool cinematic night",
    background:
      "Wet city road at night with neon and streetlight reflections on the asphalt and soft bokeh",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Generic black sports car", "Wet night road reflections", "Dark jacket outfit", "Leaning pose"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    height: 340,
    targetSourcePhoto: "One clear chest-up or waist-up photo of a boy or young man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "Young South Asian man with short side-parted black hair, clean shaven, in a plain white t-shirt, taking a selfie outside an older apartment building with balconies and overhead wires.",
    altResult:
      "Realistic night photo of the same young man in a black bomber jacket, dark tee and dark jeans, arms crossed, leaning on a glossy unbadged black sports car on a rain-wet city street with blurred neon signs and streetlights.",
    beforeFile: "trending-ai-photo-prompt-for-boys-with-car-night-before.webp",
    afterFile: "trending-ai-photo-prompt-for-boys-with-car-night-after.webp",
    template:
      `Edit the uploaded portrait into a cinematic night portrait with a sports car. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a plain black bomber jacket over a dark crew-neck tee and dark jeans. If pose is not preserved, show him leaning back against the front of a sleek, unbadged, generic black sports car with no logos or number plate, arms crossed, looking at the camera with a calm, confident expression. Light him with cool streetlight from the side and warm reflections bouncing off the wet road. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.`,
  },
  {
    n: "124",
    id: "trending-ai-photo-prompt-for-boys-with-rose-red-shirt",
    title: "Trending AI Photo Prompt for Boys with Rose (Red Shirt)",
    note: "Daylight street portrait in a red shirt with a red rose bouquet",
    description:
      "A trending AI photo prompt for boys with rose: a bright daylight street portrait in a red shirt holding a bouquet of red roses. Free to copy and paste.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Warm romantic daylight",
    background:
      "Sunny old-town street with cream walls, green plants and soft background blur",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Red shirt", "Red rose bouquet", "Sunny street", "Relaxed smiling pose"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    height: 340,
    targetSourcePhoto: "One clear chest-up or waist-up photo of a boy or young man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "Young South Asian man with curly black hair and light stubble in a grey polo shirt, smiling in a brick university courtyard with students walking behind.",
    altResult:
      "Realistic daylight photo of the same young man in a red shirt with rolled sleeves and beige trousers, holding a bouquet of red roses wrapped in kraft paper on a sunny cream-walled street with green plants.",
    beforeFile: "trending-ai-photo-prompt-for-boys-with-rose-red-shirt-before.webp",
    afterFile: "trending-ai-photo-prompt-for-boys-with-rose-red-shirt-after.webp",
    template:
      `Edit the uploaded portrait into a bright romantic daylight street portrait with red roses. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a plain red button-up shirt with sleeves rolled to the forearm and light beige trousers. If pose is not preserved, show him standing on the street holding a bouquet of fresh red roses wrapped in plain kraft paper at chest height, smiling slightly at the camera. Light him with soft, warm natural daylight and gentle shade on the face; avoid low-light or noir lighting. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.`,
  },
  {
    n: "125",
    id: "ai-photo-prompt-for-boy-and-girl-standing-together-rooftop",
    title: "AI Photo Prompt for Boy and Girl Standing Together (Rooftop)",
    note: "Standing together under string lights on a city rooftop, matching outfits",
    description:
      "An AI photo prompt for boy and girl standing together: a city rooftop at dusk under string lights, in matching outfits, made from two photos.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    requirement: "Two photos",
    mood: "Warm golden dusk",
    background:
      "City rooftop terrace at dusk with warm string lights overhead and a softly blurred skyline",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 2,
    changes: ["Rooftop at dusk", "String lights", "Matching outfits", "Standing side by side"],
    stays: ["Both faces and identities", "Each skin tone and age", "Hairstyles, beards, head coverings", "Realistic relative heights"],
    height: 340,
    targetSourcePhoto: "Two clear photos (boy, then girl) or one photo of you both",
    bestSourcePhoto: ["One clear photo per person, or one photo of you both", "Faces large and sharp, no sunglasses", "Similar light in both photos", "Original images should not be blurry"],
    altSource:
      "Young South Asian man with short wavy hair and a short beard in a navy t-shirt, smiling in a residential lane with brick houses and overhead wires.",
    altResult:
      "Realistic dusk photo of the same couple standing close on a city rooftop under string lights, he in an off-white shirt and dark trousers, she in an off-white kurta and dupatta with her hand on his chest, potted plants and a city skyline behind.",
    altSecond:
      "Young South Asian woman with long dark hair in a peach cotton kurti with a dupatta over one shoulder, smiling in a residential lane.",
    beforeFile: "ai-photo-prompt-for-boy-and-girl-standing-together-rooftop-before.webp",
    afterFile: "ai-photo-prompt-for-boy-and-girl-standing-together-rooftop-after.webp",
    beforeBFile: "ai-photo-prompt-for-boy-and-girl-standing-together-rooftop-before-b.webp",
    template:
      `Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a boy and girl standing together on a city rooftop at dusk. The first uploaded photo shows person A (the boy) and the second uploaded photo shows person B (the girl); if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Dress them in modest matching outfits in the same color: an off-white shirt and dark trousers for him, and an off-white long kurta or long-sleeve dress for her; keep any head covering or dupatta. If group arrangement and pose are not preserved, show them standing side by side close together, her hand on his arm, both smiling toward the camera. Keep realistic relative heights and natural, modest, family-friendly body language. Light both with the same warm string-light glow and soft dusk sky light so they look photographed together. Apply {{mood}} color grading. Use {{background}} as the backdrop. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping either face.`,
  },
  {
    n: "126",
    id: "sad-ai-photo-prompt-for-boys-rainy-window",
    title: "Sad AI Photo Prompt for Boys (Rainy Window)",
    note: "Sad boy by a rain-streaked window at night, warm lamp light, in colour",
    description:
      "A sad AI photo prompt for boys: sitting by a rain-streaked window at night with a warm lamp glow, an emotional colour portrait, real face kept.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Moody blue and amber",
    background:
      "Dim room at night with a rain-streaked window, blurred city lights outside and a small warm table lamp",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Rainy night window", "Warm lamp light", "Hoodie outfit", "Thoughtful sad pose"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    height: 340,
    targetSourcePhoto: "One clear chest-up or waist-up photo of a boy or young man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "South Asian teenage boy with messy black hair and a fringe in a maroon t-shirt, sitting at a cluttered desk with a laptop in a bedroom.",
    altResult:
      "Moody colour night photo of the same boy in a dark grey hoodie, chin resting on his hand by a rain-streaked window, a warm table lamp reflected on one side and blurred blue city lights outside.",
    beforeFile: "sad-ai-photo-prompt-for-boys-rainy-window-before.webp",
    afterFile: "sad-ai-photo-prompt-for-boys-rainy-window-after.webp",
    template:
      `Edit the uploaded portrait into an emotional, cinematic sad portrait by a rainy window. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a plain dark grey hoodie. If pose is not preserved, show him sitting by the window with his chin resting on one hand, looking out at the rain with a quiet, sad expression, his face turned three-quarters toward the camera. Light his face with warm lamp light from one side and cool blue window light from the other; keep it in color, not black and white. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.`,
  },
  {
    n: "127",
    id: "bike-ai-photo-prompt-for-boys-mountain-highway",
    title: "Bike AI Photo Prompt for Boys (Mountain Highway)",
    note: "Generic cafe-racer motorcycle on a mountain highway at sunset",
    description:
      "A bike AI photo prompt for boys: sit on a generic cafe-racer motorcycle on a winding mountain highway at sunset, with your real face kept.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Golden sunset",
    background:
      "Winding mountain highway at sunset with layered peaks and a glowing orange sky",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Generic cafe-racer motorcycle", "Mountain highway", "Riding jacket", "Sunset glow"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    height: 340,
    targetSourcePhoto: "One clear chest-up or waist-up photo of a boy or young man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "South Asian man with a short crew cut and full black beard in an olive henley, smiling in a tree-lined park.",
    altResult:
      "Realistic sunset photo of the same man in a brown jacket and dark jeans, sitting on an unbadged cafe-racer style motorcycle with a round headlight, holding an open-face helmet, on a winding mountain highway with hazy peaks.",
    beforeFile: "bike-ai-photo-prompt-for-boys-mountain-highway-before.webp",
    afterFile: "bike-ai-photo-prompt-for-boys-mountain-highway-after.webp",
    template:
      `Edit the uploaded portrait into a cinematic motorcycle portrait on a mountain road at sunset. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a plain brown leather-look riding jacket, dark jeans and boots, with no patches or logos. If pose is not preserved, show him seated sideways on a parked, generic, unbadged cafe-racer style motorcycle with a round headlight and no logos or number plate, holding an open-face helmet on his knee, looking at the camera. Light him with warm low sunset light from the side and a soft golden rim on his hair. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.`,
  },
  {
    n: "128",
    id: "retro-ai-photo-prompt-for-boys-90s-vintage-jeep",
    title: "Retro AI Photo Prompt for Boys (90s Vintage Jeep)",
    note: "90s denim-jacket look beside a vintage jeep, film grain",
    description:
      "A retro AI photo prompt for boys: a 90s film look in a denim jacket beside a vintage open-top jeep, with warm grain and faded colour.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Faded 90s film",
    background:
      "Dusty countryside road with dry grass, a lone tree and a pale afternoon sky",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["90s film grain", "Denim jacket", "Vintage open-top jeep", "Dusty country road"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    height: 340,
    targetSourcePhoto: "One clear chest-up or waist-up photo of a boy or young man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "Young South Asian man with swept-back medium-length black hair and a thin moustache in a black t-shirt, smiling by an iron gate and brick pillar.",
    altResult:
      "Faded 90s-film-style photo of the same young man in a light-wash denim jacket, white tee and jeans, one hand in his pocket, leaning on a weathered olive open-top vintage jeep on a dusty country road.",
    beforeFile: "retro-ai-photo-prompt-for-boys-90s-vintage-jeep-before.webp",
    afterFile: "retro-ai-photo-prompt-for-boys-90s-vintage-jeep-after.webp",
    template:
      `Edit the uploaded portrait into a 1990s-style retro film photograph beside a vintage jeep. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a light-wash denim jacket over a plain white tee with loose straight-leg jeans. If pose is not preserved, show him leaning on the side of a generic, unbadged vintage open-top jeep in faded olive with no logos or number plate, one hand in his pocket, looking at the camera with a relaxed smile. Light him with warm afternoon sun and add a 90s point-and-shoot film look: soft grain, slightly faded colors and gentle warm tint; do not make it an 80s poster. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.`,
  },
  {
    n: "129",
    id: "aesthetic-ai-photo-editing-prompt-for-boy-and-girl-beach",
    title: "Aesthetic AI Photo Editing Prompt for Boy and Girl (Beach)",
    note: "Sunset beach walk with golden haze, faces still visible",
    description:
      "An aesthetic AI photo editing prompt for boy and girl: a dreamy sunset beach walk in golden haze, made from two photos, with both faces kept.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    requirement: "Two photos",
    mood: "Golden hazy sunset",
    background:
      "Calm sandy beach at sunset with soft waves, a low glowing sun and golden haze",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 2,
    changes: ["Sunset beach", "Golden haze and backlight", "Light linen outfits", "Walking together"],
    stays: ["Both faces and identities", "Each skin tone and age", "Hairstyles, beards, head coverings", "Realistic relative heights"],
    height: 340,
    targetSourcePhoto: "Two clear photos (boy, then girl) or one photo of you both",
    bestSourcePhoto: ["One clear photo per person, or one photo of you both", "Faces large and sharp, no sunglasses", "Similar light in both photos", "Original images should not be blurry"],
    altSource:
      "Young South Asian man with short black hair and round thin-framed glasses in a light-blue shirt, smiling in an office corridor.",
    altResult:
      "Realistic sunset beach photo of the same couple walking hand in hand along the shoreline, smiling at each other, he in glasses, a white linen shirt and beige trousers, she in a long pastel-pink dress and dusty-rose hijab, the sun low over the waves.",
    altSecond:
      "Young South Asian woman in a dusty-rose hijab and cream long-sleeve top, smiling softly in an office corridor with plants.",
    beforeFile: "aesthetic-ai-photo-editing-prompt-for-boy-and-girl-beach-before.webp",
    afterFile: "aesthetic-ai-photo-editing-prompt-for-boy-and-girl-beach-after.webp",
    beforeBFile: "aesthetic-ai-photo-editing-prompt-for-boy-and-girl-beach-before-b.webp",
    template:
      `Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: an aesthetic boy and girl walking on the beach at sunset. The first uploaded photo shows person A (the boy) and the second uploaded photo shows person B (the girl); if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Dress them in modest light linen outfits: a white linen shirt and beige trousers for him and a long flowing pastel dress with sleeves for her; keep any head covering or dupatta. If group arrangement and pose are not preserved, show them walking slowly along the shoreline holding hands, turning to smile at each other with their faces visible in three-quarter view. Keep realistic relative heights and natural, modest, family-friendly body language. Backlight both with the low sun for a warm golden glow and soft rim light, but keep enough front fill light that both faces stay clear and recognizable, not silhouettes. Apply {{mood}} color grading. Use {{background}} as the backdrop. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping either face.`,
  },
  {
    n: "130",
    id: "attitude-ai-photo-prompt-for-boys-black-outfit",
    title: "Attitude AI Photo Prompt for Boys (Black Outfit)",
    note: "Stylish all-black outfit, sunglasses in hand, low-angle city wall shot",
    description:
      "An attitude AI photo prompt for boys: a stylish all-black outfit and sunglasses, shot from a low angle against a concrete city wall.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "High-contrast urban",
    background:
      "Raw grey concrete city wall with hard afternoon shadows",
    ratio: "9:16 Story",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["All-black outfit", "Low-angle shot", "Concrete city wall", "Attitude pose"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    height: 360,
    targetSourcePhoto: "One clear chest-up or waist-up photo of a boy or young man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "South Asian young man with a short faded haircut and stubble beard in a grey hoodie, serious expression, on a city sidewalk with pedestrians.",
    altResult:
      "Low-angle story-format photo of the same man with a short fade and stubble beard in an all-black overshirt, tee and trousers with a thin silver chain, lowering dark round sunglasses with one hand so his eyes show above the frames, standing against a weathered grey concrete wall in hard sunlight.",
    beforeFile: "attitude-ai-photo-prompt-for-boys-black-outfit-before.webp",
    afterFile: "attitude-ai-photo-prompt-for-boys-black-outfit-after.webp",
    template:
      `Edit the uploaded portrait into a stylish attitude street portrait shot from a low angle. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in an all-black outfit: a plain black overshirt, black tee, black trousers and a simple silver chain. If pose is not preserved, show him from a slightly low camera angle, one hand adjusting a pair of plain dark sunglasses pulled down so his eyes stay visible, chin slightly raised with a confident, serious expression. Light him with hard directional afternoon sun and crisp shadows on the wall. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.`,
  },
  {
    n: "131",
    id: "kurta-pajama-ai-photo-prompt-for-boys-old-city-haveli",
    title: "Kurta Pajama AI Photo Prompt for Boys (Old City Haveli)",
    note: "White kurta pajama and waistcoat on old-city haveli steps, everyday (non-festive)",
    description:
      "A kurta pajama AI photo prompt for boys: a white kurta pajama and waistcoat on old-city haveli steps, a classic desi everyday look, real face kept.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Warm heritage sunlight",
    background:
      "Old-city haveli courtyard with carved wooden doors, arched sandstone walls and worn stone steps",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["White kurta pajama", "Waistcoat", "Haveli steps", "Heritage daylight"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    height: 340,
    targetSourcePhoto: "One clear chest-up or waist-up photo of a boy or young man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "South Asian man with neat short hair, a thick moustache and short beard in a beige t-shirt, standing in a home living room.",
    altResult:
      "Realistic photo of the same man in a white kurta pajama, dark grey waistcoat and brown leather sandals, sitting on worn stone steps in a sunlit old haveli courtyard with carved wooden doors and arches.",
    beforeFile: "kurta-pajama-ai-photo-prompt-for-boys-old-city-haveli-before.webp",
    afterFile: "kurta-pajama-ai-photo-prompt-for-boys-old-city-haveli-after.webp",
    template:
      `Edit the uploaded portrait into a classic desi portrait on old-city haveli steps. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a crisp plain white kurta pajama with a solid dark waistcoat and simple leather sandals. If pose is not preserved, show him sitting casually on the stone steps, one arm resting on his knee, smiling softly at the camera. Light him with warm, soft daylight falling into the courtyard; keep it an everyday look with no festive lamps, lanterns or decorations. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.`,
  },
  {
    n: "132",
    id: "dp-ai-photo-prompt-for-boys-neon-rim-light",
    title: "DP AI Photo Prompt for Boys (Neon Rim Light)",
    note: "Instagram DP close-up in a dual-colour shirt with neon rim light",
    description:
      "A DP AI photo prompt for boys: a sharp square close-up for your Instagram profile, in a two-tone shirt with pink and blue neon rim light.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Neon pink and blue",
    background:
      "Plain dark studio backdrop with a soft gradient glow",
    ratio: "1:1 Square",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Square DP close-up", "Dual-colour shirt", "Neon rim light", "Dark studio backdrop"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    height: 320,
    targetSourcePhoto: "One clear chest-up or waist-up photo of a boy or young man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "Young South Asian man with spiky black hair and rectangular black glasses in a dark green t-shirt, slight smile, indoors by a plain wall.",
    altResult:
      "Square close-up of the same young man with his glasses, in a half-black, half-maroon tee, with pink and blue neon rim light against a dark studio backdrop.",
    beforeFile: "dp-ai-photo-prompt-for-boys-neon-rim-light-before.webp",
    afterFile: "dp-ai-photo-prompt-for-boys-neon-rim-light-after.webp",
    template:
      `Edit the uploaded portrait into a sharp profile-picture close-up with neon rim lighting. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a plain two-tone color-block shirt, half black and half maroon, with no print. If pose is not preserved, frame him from the chest up, head turned slightly, looking straight into the camera with a confident half-smile. Light him with a soft frontal key light so skin tone stays true, plus a pink neon rim light on one side and a blue neon rim light on the other. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.`,
  },
  {
    n: "133",
    id: "ai-photo-prompt-for-boy-and-girl-together-monsoon-umbrella",
    title: "AI Photo Prompt for Boy and Girl Together (Monsoon Umbrella)",
    note: "Monsoon street under one umbrella, candid laughing moment",
    description:
      "An AI photo prompt for boy and girl together: sharing one umbrella on a rainy monsoon street, laughing candidly, made from two photos.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    requirement: "Two photos",
    mood: "Fresh monsoon",
    background:
      "Rainy monsoon street with wet road reflections, green trees, and small shops with plain signboards",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 2,
    changes: ["Monsoon street", "One shared umbrella", "Rain-ready outfits", "Candid laughing pose"],
    stays: ["Both faces and identities", "Each skin tone and age", "Hairstyles, beards, head coverings", "Realistic relative heights"],
    height: 340,
    targetSourcePhoto: "Two clear photos (boy, then girl) or one photo of you both",
    bestSourcePhoto: ["One clear photo per person, or one photo of you both", "Faces large and sharp, no sunglasses", "Similar light in both photos", "Original images should not be blurry"],
    altSource:
      "South Asian man with short wavy hair and stubble in a white shirt, smiling on a busy shop-lined street.",
    altResult:
      "Realistic monsoon photo of the same couple laughing under one black umbrella he holds, he in a denim shirt, she in a sage-green kurti and white dupatta, on a rain-soaked street with trees and blurred shop signs.",
    altSecond:
      "South Asian woman with a side braid and a white dupatta over her head in a mint-green kurti, smiling on a shop-lined street.",
    beforeFile: "ai-photo-prompt-for-boy-and-girl-together-monsoon-umbrella-before.webp",
    afterFile: "ai-photo-prompt-for-boy-and-girl-together-monsoon-umbrella-after.webp",
    beforeBFile: "ai-photo-prompt-for-boy-and-girl-together-monsoon-umbrella-before-b.webp",
    template:
      `Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a boy and girl together under one umbrella on a monsoon street. The first uploaded photo shows person A (the boy) and the second uploaded photo shows person B (the girl); if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Dress them in modest casual rain-day outfits: a light denim shirt for him and a plain cotton kurti with a light dupatta for her; keep any head covering. If group arrangement and pose are not preserved, show them walking close together under one plain black umbrella that he holds, both laughing candidly as raindrops fall around them. Keep realistic relative heights and natural, modest, family-friendly body language. Light both with the same soft overcast daylight and glistening rain reflections. Apply {{mood}} color grading. Use {{background}} as the backdrop. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping either face.`,
  },
  {
    n: "134",
    id: "realistic-ai-photo-prompt-for-boys-golden-hour-field",
    title: "Realistic AI Photo Prompt for Boys (Golden Hour Field)",
    note: "Natural golden-hour field portrait that keeps your real face and hairstyle",
    description:
      "A realistic AI photo prompt for boys: a natural golden-hour portrait in an open field with true skin texture, keeping your real face and hairstyle.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Natural golden hour",
    background:
      "Open wheat field at golden hour with tall grass and a soft warm sky",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Golden-hour light", "Open field", "Simple linen shirt", "Natural relaxed pose"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    height: 340,
    targetSourcePhoto: "One clear chest-up or waist-up photo of a boy or young man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "South Asian teenage boy with thick straight black hair and a fringe in a sky-blue t-shirt, smiling in a backyard.",
    altResult:
      "Realistic golden-hour photo of the same boy in an off-white linen shirt with rolled sleeves and khaki trousers, smiling in a field of tall golden grass.",
    beforeFile: "realistic-ai-photo-prompt-for-boys-golden-hour-field-before.webp",
    afterFile: "realistic-ai-photo-prompt-for-boys-golden-hour-field-after.webp",
    template:
      `Edit the uploaded portrait into a natural, realistic golden-hour portrait in an open field. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a plain off-white linen shirt with the sleeves rolled up and khaki trousers. If pose is not preserved, show him standing in the tall grass, hands relaxed, looking at the camera with a natural smile. Light him with low warm golden-hour sun from the side and gentle fill; keep real skin texture, pores and his exact hairstyle with no smoothing or beautifying. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.`,
  },
];

function resultSize(ratio: BoysSeed["ratio"]): {
  resultWidth: number;
  resultHeight: number;
} {
  if (ratio === "9:16 Story") return { resultWidth: 941, resultHeight: 1672 };
  if (ratio === "1:1 Square") return { resultWidth: 1200, resultHeight: 1200 };
  return { resultWidth: 1122, resultHeight: 1402 };
}

const categorySlug: Record<string, string> = {
  Cinematic: "cinematic",
};

/**
 * Trending AI photo prompts for boys 123–134 (solo and three two-photo couples).
 * Couple styles store Photo 2 as source-<n>b.webp on a second example pair
 * that shares result-<n>.webp.
 */
export const seedBoysStyles: CatalogStyle[] = boys.map((item, index) => {
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

export const boysStyleIds = new Set(seedBoysStyles.map((style) => style.id));

export const boysCategorySlug = categorySlug;

/** Publish payload fields kept beside the seed so the standalone script stays in sync. */
export const boysPublishRows = boys.map((item, index) => ({
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

export const boysOgAlt =
  "Realistic night photo of the same young man in a black bomber jacket, dark tee and dark jeans, arms crossed, leaning on a glossy unbadged black sports car on a rain-wet city street with blurred neon signs and streetlights.";

/** Stored on catalog-public assets. Before photos are AI-generated. */
export const boysAssetProvenance = {
  source: "seed",
  licence: "catalog",
  modelRelease: false,
  notes:
    "Before photos are AI-generated, not real people. The after image is an AI edit of those sources.",
} as const;
