import type { CatalogStyle } from "./types";

/**
 * Prefer Supabase catalog-public WebPs (uploaded by publish-anime-standalone).
 * Falls back to the published project URL when the env is unset, because the
 * anime WebPs are not checked into this repo.
 */
const PUBLISHED_SUPABASE_URL = "https://rbmirzmppbytorbhncxj.supabase.co";

function asset(name: string): string {
  const base = (
    process.env.NEXT_PUBLIC_SUPABASE_URL || PUBLISHED_SUPABASE_URL
  ).replace(/\/$/, "");
  const stem = name.replace(/\.[^.]+$/, "");
  return `${base}/storage/v1/object/public/catalog-public/seed/catalog/editorial/${stem}.webp`;
}

type AnimeSeed = {
  n: string;
  id: string;
  title: string;
  note: string;
  description: string;
  category: "Anime";
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

const anime: AnimeSeed[] = [
  {
    n: "99",
    id: "anime-girl-ai-photo-prompt-gemini-meadow",
    title: "Anime Girl AI Photo Prompt (Meadow)",
    note: "Soft hand-painted film-style girl in a windy meadow",
    description:
      "Turn your photo into an anime girl in a soft hand-painted film style, standing in a breezy summer meadow with fluffy clouds, keeping your real face.",
    category: "Anime",
    subject: "Person",
    intent: "Full scene transformation",
    requirement: "One photo",
    mood: "Soft warm peaceful",
    background:
      "Grassy hillside meadow with tall wild grass, a bare tree, and a cloudy sky",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Hand-painted anime film style", "Light summer dress and cardigan", "Breezy meadow and clouds", "Wind-swept hair pose"],
    stays: ["Face and identity", "Skin tone", "Hairstyle or head covering", "Glasses if worn"],
    height: 340,
    targetSourcePhoto: "One clear chest-up or waist-up photo of a girl or woman",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "Young woman with long dark wavy hair in a blue-and-white floral midi dress, blue cardigan and white sneakers on a grassy hillside with a bare tree.",
    altResult:
      "Painted anime-style illustration of the same woman in a blue floral dress and blue cardigan, hair blowing, on a sunlit golden meadow with a bare tree and hills.",
    beforeFile: "anime-girl-ai-photo-prompt-gemini-meadow-before.webp",
    afterFile: "anime-girl-ai-photo-prompt-gemini-meadow-after.webp",
    template:
      `Transform the uploaded portrait into a gentle anime film still of a girl in a summer meadow. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. The anime version must stay clearly recognizable as the uploaded person: keep their face shape, eye shape, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style; do not lighten the skin, change ethnicity, de-age, slim, or replace the face with a generic anime face. Render it as a soft hand-painted animated film frame with watercolor-like backgrounds, gentle linework, and warm painterly shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. If clothing is not preserved, dress them in a modest light cotton sundress with a soft knit cardigan; keep any existing head covering. If pose is not preserved, show her standing in the grass with a soft breeze lifting her hair and clothes, one hand holding her hair, smiling toward the camera. Light her with warm afternoon sunlight and soft cloud shadows. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style with clean line edges around hair and clothing. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.`,
  },
  {
    n: "100",
    id: "anime-boy-ai-photo-prompt-gemini-power-aura",
    title: "Anime Boy AI Photo Prompt (Power Aura)",
    note: "Action-genre anime hero with a glowing energy aura",
    description:
      "A prompt for a Gemini AI boy anime look: you as an action anime hero with a glowing energy aura, wind-blown hair and speed lines.",
    category: "Anime",
    subject: "Person",
    intent: "Full scene transformation",
    requirement: "One photo",
    mood: "Vibrant cinematic",
    background:
      "Dramatic anime rooftop at sunset with swirling clouds, glowing energy sparks, and a distant city skyline",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Action anime style", "Plain jacket over a training tee", "Glowing energy aura", "Power-up stance"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    height: 340,
    targetSourcePhoto: "One clear chest-up or waist-up photo of a boy or man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "Young man with dark wavy hair and light stubble in a black jacket, grey tee and olive cargo pants on a city rooftop at orange sunset.",
    altResult:
      "Action anime illustration of the same man, low angle, fists clenched, in black jacket, grey tee, cargo pants and wrist wraps, blue energy aura and flying debris at sunset.",
    beforeFile: "anime-boy-ai-photo-prompt-gemini-power-aura-before.webp",
    afterFile: "anime-boy-ai-photo-prompt-gemini-power-aura-after.webp",
    template:
      `Transform the uploaded portrait into an epic action anime hero portrait. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. The anime version must stay clearly recognizable as the uploaded person: keep their face shape, eye shape, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style; do not lighten the skin, change ethnicity, de-age, slim, or replace the face with a generic anime face. Render it in a bold action-genre anime style with dynamic linework, sharp cel shading, and speed lines. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. If clothing is not preserved, dress them in a plain open jacket over a training t-shirt and cargo pants, with simple wrist wraps. If pose is not preserved, show him in a confident power-up stance, fists clenched at his sides, hair and jacket blown by the energy, looking determined at the camera. Surround him with a glowing blue-white energy aura and rim light, with small sparks and speed lines in the air. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style with clean line edges around hair and clothing. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.`,
  },
  {
    n: "101",
    id: "rooftop-sunset-anime-friends-ai-photo-prompt",
    title: "Rooftop Sunset Anime Friends AI Photo Prompt",
    note: "Your friend group hanging out on a sunset rooftop, anime style",
    description:
      "A copy-paste anime friends prompt for Gemini: turn one group photo into a warm anime scene of friends on a city rooftop at sunset.",
    category: "Anime",
    subject: "Group",
    intent: "Full scene transformation",
    requirement: "One photo",
    mood: "Luminous golden-hour warmth",
    background:
      "Anime city rooftop at sunset with a low railing, warm string lights, and an orange sky over distant buildings",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Cel-shaded anime style", "Rooftop at sunset", "String lights", "Relaxed hangout pose"],
    stays: ["Every face and identity", "Each skin tone", "Hairstyles, beards, head coverings", "Relative heights"],
    height: 340,
    targetSourcePhoto: "One group photo of 2–5 friends with every face clearly visible",
    bestSourcePhoto: ["Every face clearly visible in one photo", "Everyone facing the camera, not hidden behind others", "Even light on all faces", "Original image should not be blurry"],
    altSource:
      "Four young friends, two men and two women, in jeans, hoodie, black shirt and embroidered white top, sitting on a rooftop ledge with string lights at orange sunset.",
    altResult:
      "Anime-style illustration of the same four friends in the same outfits seated on a rooftop ledge with fairy lights, city skyline and a vivid orange sunset.",
    beforeFile: "rooftop-sunset-anime-friends-ai-photo-prompt-before.webp",
    afterFile: "rooftop-sunset-anime-friends-ai-photo-prompt-after.webp",
    template:
      `Transform the uploaded group photo into a warm anime scene of friends on a rooftop at sunset. Use every person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve the {{preserve}}. Each anime character must stay clearly recognizable as the matching person in the source: keep each face shape, eye shape, nose, lips, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face with a generic anime face. Render it in clean cel-shaded anime style with crisp linework, flat color fills, and simple two-tone shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. Keep everyone's own outfits, simplified into clean anime clothing, keeping any head covering or dupatta. If group arrangement and pose are not preserved, arrange them leaning on the railing and sitting on its ledge side by side, laughing together and looking toward the camera. Light everyone with the same warm low sunset light from one side, soft string-light glow, and matching cel shadows. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping any face.`,
  },
  {
    n: "102",
    id: "cute-chibi-ai-photo-prompt-girls-sticker",
    title: "Cute Chibi AI Photo Prompt for Girls (Sticker)",
    note: "Big-head chibi sticker with a white die-cut border",
    description:
      "A viral cute chibi AI photo prompt for girls: turn your photo into a big-eyed chibi sticker with a white die-cut outline and pastel sparkles.",
    category: "Anime",
    subject: "Person",
    intent: "Full scene transformation",
    requirement: "One photo",
    mood: "Soft pastel",
    background:
      "Plain soft pastel backdrop with tiny sparkles and hearts around a white die-cut sticker border",
    ratio: "1:1 Square",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Chibi proportions", "White die-cut sticker outline", "Pastel sparkles", "Cheerful waving pose"],
    stays: ["Face features and identity", "Skin tone", "Hairstyle or head covering", "Outfit colors (if kept)"],
    height: 320,
    targetSourcePhoto: "One clear chest-up photo of a girl or woman",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "Smiling young woman with long dark hair in a pink hoodie and floral ruffled mini skirt, holding a phone with a black shoulder bag on a sunny sidewalk.",
    altResult:
      "Chibi sticker of the same woman waving in a pink hoodie, floral skirt and white sneakers with a black bag, white die-cut border, hearts and sparkles on pink.",
    beforeFile: "cute-chibi-ai-photo-prompt-girls-sticker-before.webp",
    afterFile: "cute-chibi-ai-photo-prompt-girls-sticker-after.webp",
    template:
      `Transform the uploaded portrait into a cute chibi sticker portrait. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. The anime version must stay clearly recognizable as the uploaded person: keep their face shape, eye shape, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style; do not lighten the skin, change ethnicity, de-age, slim, or replace the face with a generic anime face. Render it as a cute chibi character with a big head, small body, large expressive eyes that keep the person's real eye shape, thick clean outlines, and soft glossy shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. If clothing is not preserved, dress them in a cute simplified version of a pastel hoodie and skirt; keep any existing head covering. If pose is not preserved, show the full chibi body standing and waving with a big happy smile and a small head tilt. Use soft even light with small glossy highlights on the hair and eyes, and add a thick white die-cut sticker outline around the character. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style with clean line edges around hair and clothing. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.`,
  },
  {
    n: "103",
    id: "rainy-night-street-anime-boy-ai-photo-prompt",
    title: "Rainy Night Street Anime Boy AI Photo Prompt",
    note: "Moody anime boy under an umbrella on a neon-wet street",
    description:
      "A moody anime style AI photo prompt: turn your photo into an anime boy holding a clear umbrella on a rainy city street with neon reflections.",
    category: "Anime",
    subject: "Person",
    intent: "Full scene transformation",
    requirement: "One photo",
    mood: "Moody cinematic",
    background:
      "Rainy anime city street at night with glowing signs without readable text, wet pavement reflections, and falling rain",
    ratio: "9:16 Story",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Moody cel-shaded anime style", "Dark coat and hoodie", "Rainy neon street", "Clear umbrella pose"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    height: 360,
    targetSourcePhoto: "One clear waist-up photo of a boy or man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "Young man with dark hair in a grey hoodie and long black coat holding a clear umbrella on a wet city street at night with pink and blue neon reflections.",
    altResult:
      "Neon anime illustration of the same man in grey hoodie and black coat under a clear umbrella on a rainy night street glowing with pink and blue city lights.",
    beforeFile: "rainy-night-street-anime-boy-ai-photo-prompt-before.webp",
    afterFile: "rainy-night-street-anime-boy-ai-photo-prompt-after.webp",
    template:
      `Transform the uploaded portrait into a moody anime night scene of a boy in the rain. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. The anime version must stay clearly recognizable as the uploaded person: keep their face shape, eye shape, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style; do not lighten the skin, change ethnicity, de-age, slim, or replace the face with a generic anime face. Render it in clean cel-shaded anime style with crisp linework, flat color fills, and simple two-tone shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. If clothing is not preserved, dress them in a plain dark long coat over a grey hoodie, with the hood down. If pose is not preserved, show him standing under a clear umbrella, looking slightly off to the side with a calm, thoughtful expression. Light him with cool blue and magenta reflected glow from the street, with rain streaks and puddle reflections. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style with clean line edges around hair and clothing. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.`,
  },
  {
    n: "104",
    id: "cherry-blossom-anime-couple-prompt-gemini",
    title: "Cherry Blossom Anime Couple Prompt",
    note: "Two separate photos, one anime couple under blossom trees",
    description:
      "A couple anime prompt for Gemini AI: merge two photos into one soft anime scene of a couple walking under pink blossom trees.",
    category: "Anime",
    subject: "Group",
    intent: "Full scene transformation",
    requirement: "Two photos",
    mood: "Bright dreamy pastel spring with soft blush pinks, creamy whites, fresh botanical greens, warm natural skin tones, and airy luminous highlights",
    background:
      "Anime park path lined with pink cherry blossom trees, falling petals, and a soft blue sky",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 2,
    changes: ["Both people in one anime scene", "Soft painted anime style", "Blossom-lined path", "Walking side by side"],
    stays: ["Person A's face from photo 1", "Person B's face from photo 2", "Each skin tone", "Any head covering"],
    height: 340,
    targetSourcePhoto: "Two separate photos uploaded together: person A first, person B second",
    bestSourcePhoto: ["One person per photo, face large and sharp", "Similar light in all photos", "Similar head angle and framing, ideally chest-up", "Original images should not be blurry"],
    altSource:
      "Young man with dark hair in an open sage-green shirt over a white tee and beige trousers on a cherry-blossom park path by a lake.",
    altResult:
      "Soft anime-style illustration of the man and woman arm in arm, sage shirt and cream kurta with pink dupatta, under cherry blossoms by a lake with falling petals.",
    altSecond:
      "Young woman with long dark hair in a cream floral-embroidered kurta and pink dupatta on a cherry-blossom path with a lamppost.",
    beforeFile: "cherry-blossom-anime-couple-prompt-gemini-before.webp",
    afterFile: "cherry-blossom-anime-couple-prompt-gemini-after.webp",
    beforeBFile: "cherry-blossom-anime-couple-prompt-gemini-before-b.webp",
    template:
      `Merge the first uploaded photo and the second uploaded photo into one {{subject}} anime illustration of a couple under cherry blossom trees. The first uploaded photo shows person A and the second uploaded photo shows person B. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: preserve each face shape, eye shape, nose, lips, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face with a generic anime face. Render it as a soft hand-painted animated film frame with watercolor-like backgrounds, gentle linework, and warm painterly shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. Draw both in modest, plain spring outfits based on their own clothes, keeping any head covering or dupatta. If group arrangement and pose are not preserved, show them walking side by side on the path, holding hands and smiling at each other, at realistic relative heights. Light both with the same soft spring sunlight and drifting petals so they look drawn in one scene. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping any face.`,
  },
  {
    n: "105",
    id: "pastel-anime-college-girl-ai-photo-prompt",
    title: "Pastel Anime College Girl AI Photo Prompt",
    note: "Aesthetic pastel college-campus portrait with drifting blossom petals",
    description:
      "An aesthetic anime AI photo prompt for ChatGPT or Gemini: you as a pastel anime college student on a sunny campus with drifting petals.",
    category: "Anime",
    subject: "Person",
    intent: "Full scene transformation",
    requirement: "One photo",
    mood: "Bright dreamy pastel spring with soft blush pinks, creamy whites, fresh botanical greens, warm natural skin tones, and airy luminous highlights",
    background:
      "Sunlit anime college campus with brick buildings, blossom trees, a wide path, and pink petals drifting in the air",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Pastel anime style", "Casual college outfit with tote bag", "Sunny college campus", "Drifting petals"],
    stays: ["Face and identity", "Skin tone", "Hairstyle or head covering", "Glasses if worn"],
    height: 340,
    targetSourcePhoto: "One clear chest-up or waist-up photo of an adult woman",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "Young woman with long dark hair in a beige cardigan, white top and sage floral skirt, holding books with a canvas tote on a brick college campus path.",
    altResult:
      "Soft pastel anime-style illustration of the same woman with books and tote in a beige cardigan and sage skirt on a campus path under pink blossoms.",
    beforeFile: "pastel-anime-college-girl-ai-photo-prompt-before.webp",
    afterFile: "pastel-anime-college-girl-ai-photo-prompt-after.webp",
    template:
      `Transform the uploaded portrait into an aesthetic pastel anime portrait of an adult college student on campus. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. The anime version must stay clearly recognizable as the uploaded person: keep their face shape, eye shape, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style; do not lighten the skin, change ethnicity, de-age, slim, or replace the face with a generic anime face. Render it in clean cel-shaded anime style with crisp linework, flat color fills, and simple two-tone shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. If clothing is not preserved, dress them in a modest casual college outfit: a soft beige cardigan over a plain blouse, a long skirt or loose trousers, and a plain canvas tote bag with no text; keep any existing head covering. If pose is not preserved, show her walking along the campus path holding a few books against her chest, smiling softly at the camera. Light her with bright spring sunlight, soft rim light on her hair, and a few blossom petals floating past. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style with clean line edges around hair and clothing. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.`,
  },
  {
    n: "106",
    id: "anime-cricket-hero-boy-ai-photo-prompt",
    title: "Anime Cricket Hero Boy AI Photo Prompt",
    note: "Action anime cricketer mid-shot on a sunny ground",
    description:
      "A boy anime AI photo prompt for cricket fans: you as an action anime cricket hero in plain whites, swinging a bat on a sunlit ground.",
    category: "Anime",
    subject: "Person",
    intent: "Full scene transformation",
    requirement: "One photo",
    mood: "Vibrant cinematic",
    background:
      "Sunlit anime cricket ground with a green outfield, white boundary rope, and a softly blurred empty stand",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Action anime style", "Plain generic cricket kit", "Sunlit cricket ground", "Big batting shot pose"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    height: 340,
    targetSourcePhoto: "One clear chest-up or waist-up photo of a boy or man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "Smiling young man with dark hair in white cricket kit, pads and gloves, holding a bat and dark helmet on a sunny cricket ground by the boundary rope.",
    altResult:
      "Dynamic anime illustration of the same man in white cricket kit and pads swinging a bat at a red ball, speed lines, green field and stands under blue sky.",
    beforeFile: "anime-cricket-hero-boy-ai-photo-prompt-before.webp",
    afterFile: "anime-cricket-hero-boy-ai-photo-prompt-after.webp",
    template:
      `Transform the uploaded portrait into an action anime cricket hero portrait. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. The anime version must stay clearly recognizable as the uploaded person: keep their face shape, eye shape, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style; do not lighten the skin, change ethnicity, de-age, slim, or replace the face with a generic anime face. Render it in a bold action-genre anime style with dynamic linework, sharp cel shading, and speed lines. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. If clothing is not preserved, dress them in a plain generic cricket kit: plain white or single-color shirt and trousers, plain pads and gloves, and a plain helmet held or worn with the face fully visible, with no team logos, crests, sponsor marks, names, or numbers. If pose is not preserved, show him mid-swing playing a powerful batting shot with a plain unbranded bat, eyes on the ball, with a determined expression. Light him with bright midday sun, sharp cel shadows, speed lines behind the bat, and a small motion trail on the ball. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style with clean line edges around hair and clothing. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.`,
  },
  {
    n: "107",
    id: "viral-chibi-friends-ai-prompt-sticker-sheet",
    title: "Viral Chibi Friends AI Prompt (Sticker Sheet)",
    note: "One friends photo turned into a chibi sticker sheet",
    description:
      "A viral chibi AI prompt: turn one friends group photo into a cute chibi sticker sheet, each friend in their own die-cut sticker pose.",
    category: "Anime",
    subject: "Group",
    intent: "Full scene transformation",
    requirement: "One photo",
    mood: "Cozy playful",
    background:
      "Plain soft pastel backdrop with tiny sparkles and hearts around a white die-cut sticker border",
    ratio: "1:1 Square",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Every friend as a chibi", "Die-cut sticker sheet layout", "Different fun poses", "Pastel sparkles"],
    stays: ["Every face and identity", "Each skin tone", "Hairstyles, beards, head coverings", "Outfit colors"],
    height: 320,
    targetSourcePhoto: "One group photo of 2–4 friends with every face clearly visible",
    bestSourcePhoto: ["Every face clearly visible in one photo", "Everyone facing the camera, not hidden behind others", "Even light on all faces", "Original image should not be blurry"],
    altSource:
      "Selfie of a young man in a black shirt over a white tee and two young women in white-and-blue and black embroidered kurtas against a peach wall with bougainvillea.",
    altResult:
      "Chibi sticker sheet of the same three friends: thumbs-up, chin-in-hands, heart hands and a group hug, white die-cut borders with hearts and sparkles on pink.",
    beforeFile: "viral-chibi-friends-ai-prompt-sticker-sheet-before.webp",
    afterFile: "viral-chibi-friends-ai-prompt-sticker-sheet-after.webp",
    template:
      `Transform the uploaded group photo into a cute chibi sticker sheet of a friend group. Use every person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve the {{preserve}}. Each anime character must stay clearly recognizable as the matching person in the source: keep each face shape, eye shape, nose, lips, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face with a generic anime face. Render it as a cute chibi character with a big head, small body, large expressive eyes that keep the person's real eye shape, thick clean outlines, and soft glossy shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. Draw each friend in a cute simplified version of their own outfit, keeping any head covering or dupatta. If group arrangement and pose are not preserved, lay them out as one sticker sheet with one sticker per friend in a different fun pose (waving, heart hands, thumbs-up), plus one small sticker of everyone hugging, each with a thick white die-cut outline. Use the same soft even light and glossy highlights on every sticker. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping any face.`,
  },
  {
    n: "108",
    id: "anime-character-ai-photo-prompt-in-saree-or-lehenga",
    title: "Anime Character AI Photo Prompt in Saree or Lehenga",
    note: "Cel-shaded anime heroine in traditional South Asian dress",
    description:
      "A Gemini AI photo prompt for an anime character: turn your photo into a cel-shaded anime girl in a saree or lehenga with soft festive lights.",
    category: "Anime",
    subject: "Person",
    intent: "Full scene transformation",
    requirement: "One photo",
    mood: "Warm festive cel-shaded glow with saffron, magenta, and gold accents and soft evening highlights",
    background:
      "Anime courtyard at dusk with carved arches, hanging marigold garlands, and glowing lanterns",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Cel-shaded anime style", "Saree or lehenga drawn in anime style", "Lantern-lit courtyard", "Graceful standing pose"],
    stays: ["Face and identity", "Skin tone", "Hairstyle, dupatta or head covering", "Jewelry style"],
    height: 340,
    targetSourcePhoto: "One clear waist-up photo of a girl or woman, ideally in traditional dress",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "Young woman with long dark hair in a cream saree with gold sequin border and gold bangles, in a lantern-lit palace courtyard with marigold garlands.",
    altResult:
      "Warm painted anime-style illustration of the same woman in a gold-embroidered cream saree in a glowing courtyard with marigolds, lanterns and pink petals.",
    beforeFile: "anime-character-ai-photo-prompt-in-saree-or-lehenga-before.webp",
    afterFile: "anime-character-ai-photo-prompt-in-saree-or-lehenga-after.webp",
    template:
      `Transform the uploaded portrait into a cel-shaded anime heroine portrait in traditional South Asian dress. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. The anime version must stay clearly recognizable as the uploaded person: keep their face shape, eye shape, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style; do not lighten the skin, change ethnicity, de-age, slim, or replace the face with a generic anime face. Render it in clean cel-shaded anime style with crisp linework, flat color fills, and simple two-tone shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. If clothing is not preserved, dress them in an elegant, modest silk saree or lehenga with a dupatta, delicate gold borders, and simple bangles; keep any existing head covering. If pose is not preserved, show her standing in three-quarter view, one hand holding the edge of the dupatta, smiling warmly at the camera. Light her with warm lantern glow from one side and soft dusk sky light from behind. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style with clean line edges around hair and clothing. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.`,
  },
  {
    n: "109",
    id: "trending-anime-boy-ai-photo-prompt-hoodie-bike",
    title: "Trending Anime Boy AI Photo Prompt (Hoodie & Bike)",
    note: "Hoodie, bicycle and a sunset street, trending anime aesthetic",
    description:
      "A trending AI photo prompt for anime: you as an anime boy in an oversized hoodie leaning on a bicycle on a quiet sunset street.",
    category: "Anime",
    subject: "Person",
    intent: "Full scene transformation",
    requirement: "One photo",
    mood: "Luminous golden-hour warmth",
    background:
      "Quiet anime neighborhood street at golden hour with power lines, small houses, and a glowing sunset sky",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Cel-shaded anime style", "Oversized hoodie and headphones", "Plain bicycle", "Golden-hour street"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    height: 340,
    targetSourcePhoto: "One clear waist-up photo of a boy or man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "Young man with curly dark hair in a dark brown hoodie, headphones around neck, olive pants and white sneakers leaning on a black bicycle in a street at sunset.",
    altResult:
      "Painted anime-style illustration of the same man in brown hoodie and headphones leaning on a black bicycle on a sunset street with flowering trees and power lines.",
    beforeFile: "trending-anime-boy-ai-photo-prompt-hoodie-bike-before.webp",
    afterFile: "trending-anime-boy-ai-photo-prompt-hoodie-bike-after.webp",
    template:
      `Transform the uploaded portrait into a trending aesthetic anime portrait of a boy with a bicycle. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. The anime version must stay clearly recognizable as the uploaded person: keep their face shape, eye shape, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style; do not lighten the skin, change ethnicity, de-age, slim, or replace the face with a generic anime face. Render it in clean cel-shaded anime style with crisp linework, flat color fills, and simple two-tone shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. If clothing is not preserved, dress them in an oversized plain hoodie, loose trousers, sneakers, and plain headphones around his neck, all without logos. If pose is not preserved, show him leaning on a plain unbranded bicycle with one foot on the ground, smiling slightly at the camera. Light him with warm low sunset light from behind, a soft rim glow on his hair, and long gentle shadows. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style with clean line edges around hair and clothing. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.`,
  },
  {
    n: "110",
    id: "turn-photo-into-anime-countryside-family-ai-prompt",
    title: "Turn Photo into Anime: Countryside Family AI Prompt",
    note: "Whole group photo turned into a hand-painted countryside film scene",
    description:
      "Turn one family or friends photo into anime with this AI prompt: a hand-painted film scene on a green countryside hill with soft summer clouds.",
    category: "Anime",
    subject: "Group",
    intent: "Full scene transformation",
    requirement: "One photo",
    mood: "Fresh natural green",
    background:
      "Sunlit anime countryside with green fields, trees, distant hills, soft clouds, wildflowers and gentle atmospheric depth",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Hand-painted anime film style", "Green countryside hill", "Picnic blanket scene", "Relaxed group pose"],
    stays: ["Every face and identity", "Each skin tone and age", "Hairstyles, beards, head coverings", "Relative heights"],
    height: 340,
    targetSourcePhoto: "One family or friends photo of 2–6 people with every face visible",
    bestSourcePhoto: ["Every face clearly visible in one photo", "Everyone facing the camera, not hidden behind others", "Even light on all faces", "Original image should not be blurry"],
    altSource:
      "Family of four on a blanket in a green hillside meadow: grey-haired grandmother and woman in floral outfits, teen girl in green tee and jeans, man in navy polo.",
    altResult:
      "Cel-shaded anime illustration of a family of four on a white picnic blanket in a sunny meadow: a dark-haired woman in a pink floral dress with a coral dupatta, a silver-haired grandmother in a cream floral outfit, a long-haired teen girl in an olive tee and light-blue jeans, and a bearded man in a navy polo and beige shorts, under a leafy tree with rolling green hills, distant blue mountains and a bright cloud-dotted sky.",
    beforeFile: "turn-photo-into-anime-countryside-family-ai-prompt-before.webp",
    afterFile: "turn-photo-into-anime-countryside-family-ai-prompt-after.webp",
    template:
      `Transform the uploaded group photo into a peaceful hand-painted anime countryside scene of a family or friends. Use every person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve the {{preserve}}. Each anime character must stay clearly recognizable as the matching person in the source: keep each face shape, eye shape, nose, lips, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face with a generic anime face. Render it as a soft hand-painted animated film frame with watercolor-like backgrounds, gentle linework, and warm painterly shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. Keep everyone's own outfits, simplified into soft painted anime clothing, keeping any head covering or dupatta. If group arrangement and pose are not preserved, seat them together on a plain picnic blanket on a grassy hill, the eldest in the middle, everyone smiling and looking toward the camera. Light everyone with the same warm summer sunlight and soft drifting cloud shadows. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping any face.`,
  },
];

function resultSize(ratio: AnimeSeed["ratio"]): {
  resultWidth: number;
  resultHeight: number;
} {
  if (ratio === "9:16 Story") return { resultWidth: 941, resultHeight: 1672 };
  if (ratio === "1:1 Square") return { resultWidth: 1200, resultHeight: 1200 };
  return { resultWidth: 1122, resultHeight: 1402 };
}

const categorySlug: Record<string, string> = {
  Anime: "anime",
};

/**
 * Anime AI photo prompts 99–110 (solo, friends, and one two-photo merge).
 * Merge style stores Photo 2 as source-<n>b.webp on a second example pair
 * that shares result-<n>.webp.
 */
export const seedAnimeStyles: CatalogStyle[] = anime.map((item, index) => {
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

export const animeStyleIds = new Set(seedAnimeStyles.map((style) => style.id));

export const animeCategorySlug = categorySlug;

/** Publish payload fields kept beside the seed so the standalone script stays in sync. */
export const animePublishRows = anime.map((item, index) => ({
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

export const animeOgAlt =
  "Anime-style illustration of four friends seated on a rooftop ledge with fairy lights, city skyline and a vivid orange sunset.";

/** Stored on catalog-public assets. Before photos are AI-generated. */
export const animeAssetProvenance = {
  source: "seed",
  licence: "catalog",
  modelRelease: false,
  notes:
    "Before photos are AI-generated, not real people. The after image is an AI edit of those sources.",
} as const;
