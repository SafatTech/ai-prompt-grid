import type { CatalogStyle } from "./types";

/**
 * Public catalog WebPs. A configured Supabase URL wins. Preview builds that
 * omit it still use the published project, because source-75b.png and the
 * other merge files are not in this repo.
 */
const PUBLISHED_SUPABASE_URL = "https://rbmirzmppbytorbhncxj.supabase.co";

function asset(name: string): string {
  const base = (
    process.env.NEXT_PUBLIC_SUPABASE_URL || PUBLISHED_SUPABASE_URL
  ).replace(/\/$/, "");
  const stem = name.replace(/\.[^.]+$/, "");
  return `${base}/storage/v1/object/public/catalog-public/seed/catalog/editorial/${stem}.webp`;
}

type MergeSeed = {
  n: string;
  id: string;
  title: string;
  note: string;
  description: string;
  category: string;
  subject: CatalogStyle["subject"];
  intent: CatalogStyle["intent"];
  mood: string;
  background: string;
  ratio: "1:1 Square" | "4:5 Portrait";
  template: string;
  changes: string[];
  stays: string[];
  height: number;
  keepClothing: boolean;
  keepPose: boolean;
  targetSourcePhoto: string;
  bestSourcePhoto: string[];
  altSource: string;
  altSecond: string;
  altResult: string;
};

const aiGeneratedLimit =
  "Example people and animals in the before photos are AI-generated, not real.";

/** Guide social image and result-75. The crop is 1200x630; the style result is 4:5. */
export const mergeOgAlt =
  "Couple on a riverside promenade at golden hour, his arm around her shoulder.";

const merge: MergeSeed[] = [
  {
    n: "75",
    id: "riverside-merge-two-photos-prompt-gemini-couple",
    title: "Riverside Merge Two Photos Prompt for Gemini (Couple)",
    note: "Two selfies, one riverside walk photo",
    description:
      "Merge two separate photos into one natural couple photo standing side by side on a riverside promenade in late-afternoon light, one arm around the other's shoulder, both faces kept exactly as in their own photos.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Luminous golden-hour warmth",
    background:
      "Riverside promenade with a calm river, trees along the bank, and warm late-afternoon light",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    changes: [
      "Both people in one photo",
      "Riverside setting",
      "One shared warm light from the left",
      "Arm-around-shoulder pose",
    ],
    stays: [
      "Person A's face from photo 1",
      "Person B's face from photo 2",
      "Each skin tone",
      "Each person's own outfit",
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
    altSource:
      "Woman in her late 20s in a sage-green jacket over a black top, on a riverside walkway.",
    altSecond:
      "Man with stubble in a dark-green jacket over a black tee, on a rocky riverbank.",
    altResult: mergeOgAlt,
    template:
      "Merge the first uploaded photo and the second uploaded photo into one natural {{subject}} photo of a couple standing side by side. The first uploaded photo shows person A and the second uploaded photo shows person B. Follow the selected source-preservation settings: {{preserve}}. Always keep person A's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and person B's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Keep the outfit each person wears in their own photo. If group arrangement and pose are not preserved, stand them close together, one arm around the other's shoulder, both smiling at the camera, with realistic relative heights. Light both people with one warm, low sun from the left so they look photographed together, with matching shadows and color temperature. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "76",
    id: "cafe-window-merge-two-photos-prompt-gemini-couple",
    title: "Cafe Window Merge Two Photos Prompt for Gemini (Couple)",
    note: "Seated together at a cafe window table",
    description:
      "Combine two separate portraits into one waist-up couple photo seated at a cafe table by a window, with soft window light matched on both faces.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Warm natural neutral",
    background: "Cozy café table beside a large window with softly blurred interior",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    changes: [
      "Both people seated at one table",
      "Cafe window setting",
      "Soft window light from the right",
      "Waist-up framing",
    ],
    stays: [
      "Person A's face from photo 1",
      "Person B's face from photo 2",
      "Each skin tone",
      "Each person's own outfit",
    ],
    height: 350,
    targetSourcePhoto:
      "Two separate photos uploaded together: person A first, person B second",
    bestSourcePhoto: [
      "One person per photo, face large and sharp",
      "Similar light in both photos (both daylight or both indoors)",
      "Similar head angle and framing, ideally chest-up",
      "Original images should not be blurry",
    ],
    altSource: "Bearded man in a grey button-up at a cafe table by a window.",
    altSecond: "Woman in a lilac embroidered kurti, hand at her chin, at a cafe table.",
    altResult: "Couple at a cafe window table with plain cups, warm interior.",
    template:
      "Use the first uploaded photo and the second uploaded photo as identity references and create one new waist-up {{subject}} photo of a couple seated together at a cafe table by a window. The first uploaded photo shows person A and the second uploaded photo shows person B. Follow the selected source-preservation settings: {{preserve}}. Always keep person A's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and person B's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Keep the outfit each person wears in their own photo. If group arrangement and pose are not preserved, seat them side by side at the table, both smiling at the camera, at realistic matching sizes. Light both faces with soft window light from the right, with matching shadows and color temperature. Keep the table clean, with only plain unbranded cups. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "77",
    id: "side-by-side-keepsake-frame-merge-two-photos-prompt-gemini-couple",
    title: "Keepsake Frame Merge Two Photos Prompt for Gemini (Couple)",
    note: "Both photos kept as-is in one framed keepsake",
    description:
      "Combine two photos in one frame: both original photos placed side by side, unchanged, in an elegant cream keepsake layout with a thin gold divider.",
    category: "Vintage",
    subject: "Group",
    intent: "Artistic restyle",
    mood: "Warm elegant neutral",
    background: "Soft cream paper border with a thin gold divider line",
    ratio: "1:1 Square",
    keepClothing: true,
    keepPose: true,
    changes: ["Two photos in one frame", "Cream border and gold divider", "Gentle matching color grade"],
    stays: ["Both photos' content", "Both faces", "Each pose and outfit", "Each original background"],
    height: 360,
    targetSourcePhoto: "Two separate photos uploaded together, the one for the left side first",
    bestSourcePhoto: [
      "Two photos with a similar crop (both portrait, chest-up)",
      "Similar brightness",
      "Faces clearly visible",
      "Original images should not be blurry",
    ],
    altSource: "Woman with wavy hair in a brown scoop-neck top, indoors.",
    altSecond: "Young man with tousled dark hair and a light moustache in an olive-green tee, indoors.",
    altResult:
      "The two original photos of the couple side by side on cream paper with a thin gold divider.",
    template:
      "Place the first uploaded photo on the left and the second uploaded photo on the right, side by side in one elegant framed layout as a single couple keepsake of the {{subject}}. Follow the selected source-preservation settings: {{preserve}}. Do not change the content of either photo: keep every face, skin tone, outfit, pose, and original photo background exactly as uploaded, and do not merge the people into one scene. If group arrangement and pose are not preserved, you may crop each photo slightly so both share the same size and eye level. Apply a gentle {{mood}} color grade to both photos so they match. Set both photos on {{background}}, with even margins around them. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "78",
    id: "long-distance-sunset-beach-merge-two-photos-prompt-gemini-couple",
    title: "Long Distance Couple: Merge 2 Photos AI Prompt (Gemini)",
    note: "Walking hand in hand on a beach at sunset",
    description:
      "For long-distance couples: merge two photos into one photo walking hand in hand on a sunset beach in casual summer clothes, with matching warm backlight on both.",
    category: "Travel",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Warm sunset backlight with soft golden haze",
    background: "Wide sandy beach at sunset with gentle waves and a glowing horizon",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    changes: [
      "Both people together on a beach",
      "Casual summer clothes",
      "Warm sunset backlight",
      "Sea breeze in hair and fabric",
    ],
    stays: [
      "Person A's face from photo 1",
      "Person B's face from photo 2",
      "Each skin tone",
      "Any head covering",
    ],
    height: 340,
    targetSourcePhoto: "Two separate photos uploaded together: person A first, person B second",
    bestSourcePhoto: [
      "One person per photo, face large and sharp",
      "Similar light in both photos (both daylight or both indoors)",
      "Similar head angle and framing, ideally chest-up",
      "Original images should not be blurry",
    ],
    altSource: "Bearded man in a white palm-print shirt, beach selfie at sunset.",
    altSecond: "Woman in a pink dupatta and floral kurti, selfie against a sunset sky.",
    altResult: "Couple walking hand in hand on a beach at sunset, her dupatta in the breeze.",
    template:
      "Merge the first uploaded photo and the second uploaded photo into one natural {{subject}} photo of a long-distance couple finally together on a beach at sunset. The first uploaded photo shows person A and the second uploaded photo shows person B. Follow the selected source-preservation settings: {{preserve}}. Always keep person A's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and person B's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Dress both in modest, casual summer clothes; if either wears a dupatta, scarf, or head covering, keep it and let the sea breeze move it gently. If group arrangement and pose are not preserved, show them walking hand in hand toward the camera, smiling, at realistic relative heights. Give both the same warm sunset backlight and matching shadows so they look photographed together. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "79",
    id: "add-missing-person-to-group-photo-merge-two-photos-prompt-gemini-family",
    title: "Add Missing Person to Group Photo AI Prompt (Gemini)",
    note: "Add one person to an existing group photo",
    description:
      "Add a missing person to a family group photo: the person from the second photo joins the group at the right end, matched in size, light, and shadow, with everyone else unchanged.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Match the original photo's colors",
    background: "Keep original background",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: true,
    changes: ["One person added at the right end", "Size, light, and shadows matched to the group"],
    stays: [
      "Everyone already in the group photo",
      "Group arrangement",
      "Original background",
      "Added person's face from photo 2",
    ],
    height: 350,
    targetSourcePhoto: "The group photo first, then a clear photo of the person to add",
    bestSourcePhoto: [
      "Group photo where the right end has some free space",
      "Added person photographed in similar light",
      "Added person's face large and sharp",
      "Original images should not be blurry",
    ],
    altSource:
      "Family of four at an outdoor viewpoint: father in a dark-green polo, mother in pink floral, son in a navy tee, daughter in white and blue floral.",
    altSecond: "Young man in a navy sweatshirt and light jeans, with greenery and water behind.",
    altResult: "Young man added at the right end of the family of four at the viewpoint.",
    template:
      "The first uploaded photo is a {{subject}} photo of a family. The second uploaded photo shows one more person who was missing from it. Add the person from the second uploaded photo into the first uploaded photo, standing at the right end of the group. Follow the selected source-preservation settings: {{preserve}}. Keep everyone already in the first uploaded photo exactly as they are: faces, skin tones, clothing, and positions. Keep the added person's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, exact skin tone, and outfit exactly as in the second uploaded photo; do not blend them with anyone else, beautify, slim, de-age, or lighten them. If group arrangement and pose are not preserved, you may shift people slightly so the added person fits naturally. Match the added person's size, focus, lighting, shadows, and grain to the rest of the group so they look like they were there. Apply {{mood}} color grading. Background setting: {{background}}; if a new background is chosen, replace it, otherwise keep the first uploaded photo's background and extend it naturally behind the added person. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "80",
    id: "eid-family-frame-merge-two-photos-prompt-gemini-family",
    title: "Eid Family Frame Merge Two Photos Prompt for Gemini (Family)",
    note: "Parents' photo and kids' photo combined for Eid",
    description:
      "Combine two photos, one of the parents and one of the children, into one Eid family portrait in a festively decorated living room, every face kept as in its own photo.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Warm golden neutral",
    background:
      "Living room decorated for Eid with warm string lights, crescent lanterns, and soft floral accents",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    changes: [
      "Both photos' people in one portrait",
      "Formal festive clothes",
      "Eid-decorated living room",
      "Soft warm light on everyone",
    ],
    stays: [
      "Each face from its own photo",
      "Each age and height",
      "Each skin tone",
      "Any beard, glasses, or hijab",
    ],
    height: 360,
    targetSourcePhoto:
      "Two photos uploaded together: the parents' photo first, the children's photo second",
    bestSourcePhoto: [
      "Faces large and sharp in both photos",
      "Similar light in both photos",
      "Five people or fewer in total",
      "Original images should not be blurry",
    ],
    altSource:
      "Couple in their 40s in a living room, him in a sage-green shirt and her in a cream and blue floral kurti.",
    altSecond: "Two children, a girl in a lavender knit and a boy in a navy top.",
    altResult:
      "Family of four in festive clothes, parents seated with the children standing behind them, string lights and crescent lanterns.",
    template:
      "Merge the first uploaded photo and the second uploaded photo into one formal {{subject}} family portrait for Eid. The first uploaded photo shows the parents and the second uploaded photo shows their children; include every person from both photos and no one else. Follow the selected source-preservation settings: {{preserve}}. Always keep each person's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, height, and exact skin tone exactly as in their own photo. Treat everyone as separate people; do not blend, swap, beautify, slim, de-age, or lighten any face, and keep natural skin texture. Dress everyone in modest, formal festive clothes such as kurtas, shalwar kameez, or embroidered suits in coordinated soft colors. If group arrangement and pose are not preserved, seat the parents on a sofa in the center with the children standing behind or beside them, everyone smiling at the camera, at realistic relative heights. Light everyone with the same soft, warm light. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping any face.",
  },
  {
    n: "81",
    id: "rooftop-friends-reunion-merge-two-photos-prompt-gemini-group",
    title: "Rooftop Reunion Merge Two Photos Prompt for Gemini (Group)",
    note: "Two friends reunited at a rooftop dinner",
    description:
      "Merge two separate selfies into one candid photo of two friends reunited at a rooftop dinner under warm fairy lights, both faces kept exactly as in their own photos.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Warm golden evening",
    background:
      "Rooftop dinner table at dusk with warm fairy lights and a softly blurred city skyline",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    changes: ["Both friends in one photo", "Rooftop dinner setting", "Fairy lights", "Same evening light on both"],
    stays: [
      "Friend A's face from photo 1",
      "Friend B's face from photo 2",
      "Hairstyle, glasses, beard, or hijab",
      "Each person's own outfit",
    ],
    height: 340,
    targetSourcePhoto: "Two separate selfies uploaded together: friend A first, friend B second",
    bestSourcePhoto: [
      "One person per photo, face large and sharp",
      "Similar light in both photos (both daylight or both indoors)",
      "Similar head angle and framing, ideally chest-up",
      "Original images should not be blurry",
    ],
    altSource: "Woman in a purple top, rooftop selfie at sunset.",
    altSecond: "Woman in a dusty-rose hijab and floral dress, rooftop selfie at dusk.",
    altResult: "Two friends at a rooftop dinner table at dusk with fairy lights and a blurred skyline.",
    template:
      "Merge the first uploaded photo and the second uploaded photo into one candid {{subject}} photo of two friends reunited at a rooftop dinner. The first uploaded photo shows friend A and the second uploaded photo shows friend B. Follow the selected source-preservation settings: {{preserve}}. Always keep friend A's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and friend B's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Keep the outfit each friend wears in their own photo. If group arrangement and pose are not preserved, seat them side by side at the table, laughing naturally toward the camera, at realistic relative heights. Light both with the same warm evening light. Keep plain unbranded tableware only. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "82",
    id: "grandparent-and-grandchild-courtyard-merge-two-photos-prompt-gemini-family",
    title: "Grandparent Merge Two Photos Prompt for Gemini (Family)",
    note: "Grandparent reading to a grandchild on a charpai",
    description:
      "Merge a grandparent's photo and a grandchild's photo into one warm family photo sitting together on a charpai in a sunny courtyard, the grandparent sharing a book with their older grandchild or teen.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Soft warm natural",
    background:
      "Sunny traditional courtyard with a woven charpai, potted plants, and soft morning light",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    changes: ["Both together on a charpai", "Sunny courtyard setting", "Sharing-a-book pose", "Soft morning light"],
    stays: [
      "Grandparent's face and age from photo 1",
      "Grandchild's face and age from photo 2",
      "Each skin tone",
      "Each person's own outfit",
    ],
    height: 350,
    targetSourcePhoto:
      "Two photos uploaded together: the grandparent first, the grandchild (older kid or teen) second",
    bestSourcePhoto: [
      "One person per photo, face clearly visible",
      "Similar daylight in both photos",
      "A recent photo of the grandchild",
      "Original images should not be blurry",
    ],
    altSource:
      "Grandmother about 70 with grey hair in a pink floral sari, in a courtyard garden.",
    altSecond: "Teen girl in a white and blue floral kurti and navy dupatta, on a garden path.",
    altResult:
      "Grandmother and teen granddaughter seated on a charpai in a sunny courtyard, the grandmother holding a plain book.",
    template:
      "Merge the first uploaded photo and the second uploaded photo into one warm {{subject}} photo. The first uploaded photo shows a grandparent and the second uploaded photo shows their older grandchild, a preteen or teenager. Follow the selected source-preservation settings: {{preserve}}. Always keep the grandparent's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and the grandchild's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Keep both ages exactly as they are, with realistic relative sizes. Keep the modest outfit each person wears in their own photo. If group arrangement and pose are not preserved, seat them together on a charpai, the grandparent showing a plain book to the grandchild, both relaxed and smiling. Light both with the same soft morning sunlight. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "83",
    id: "sofa-cuddle-with-your-pet-merge-two-photos-prompt-gemini-person-and-pet",
    title: "Sofa Pet Merge Two Photos Prompt for Gemini (Person & Pet)",
    note: "You and your dog together on the sofa",
    description:
      "Merge your photo and your dog's photo into one cozy picture on a living room sofa, the dog leaning on your shoulder, with breed, coat, and markings kept exact.",
    category: "Pets",
    subject: "Pet",
    intent: "Full scene transformation",
    mood: "Soft warm natural",
    background:
      "Modern staged living room with cream upholstery, warm natural wood, textured neutral rug, soft curtains, indoor greenery and refined minimal decor",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    changes: ["Person and pet in one photo", "Living room sofa setting", "Dog leaning on shoulder", "Same soft daylight on both"],
    stays: [
      "Your face and skin tone from photo 1",
      "Pet's breed, coat, and markings from photo 2",
      "Pet's eye color",
      "Your own outfit",
    ],
    height: 360,
    targetSourcePhoto: "Two photos uploaded together: you first, your pet second",
    bestSourcePhoto: [
      "Your face large and sharp",
      "Pet photographed clearly, eyes visible",
      "Both in daylight if possible",
      "Original images should not be blurry",
    ],
    altSource: "Woman in a white and blue floral kurti on a beige sofa.",
    altSecond: "Brown-and-white dog with a white face stripe, on a tiled floor.",
    altResult: "Woman on a sofa with a brown-and-white dog leaning on her shoulder.",
    template:
      "Merge the first uploaded photo and the second uploaded photo into one cozy, natural photo. The first uploaded photo shows a person and the second uploaded photo shows their {{subject}}. Follow the selected source-preservation settings: {{preserve}}. Always keep the person's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, exact skin tone, and outfit as in the first uploaded photo; do not beautify, slim, de-age, or lighten them. Always keep the animal's breed, size, coat color, markings, and eye color exactly as in the second uploaded photo. If original pose and composition are not preserved, seat the person on a sofa with the pet leaning against their shoulder, at a realistic size next to an adult. Light both with the same soft daylight. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and fur. Do not add extra people or animals, text, lettering, or logos. Compose for {{ratio}} without cropping the face or the pet.",
  },
  {
    n: "84",
    id: "wedding-stage-merge-two-photos-prompt-gemini-couple",
    title: "Wedding Stage Merge Two Photos Prompt for Gemini (Couple)",
    note: "Bride and groom seated together on a decorated stage",
    description:
      "Merge two separate photos into one wedding stage photo of a couple seated together on a floral stage, each face kept exactly as in their own photo.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Warm golden-hour cinematic glow with honey-amber highlights, rich mustard tones, natural skin color, soft earthy neutrals, and elegant contrast",
    background:
      "Wedding stage with a floral backdrop of white and blush flowers, warm fairy lights, and a cream sofa",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    changes: ["Both seated on one stage", "Floral wedding backdrop", "Warm stage lighting"],
    stays: [
      "Person A's face from photo 1",
      "Person B's face from photo 2",
      "Each skin tone",
      "Each person's own outfit",
    ],
    height: 340,
    targetSourcePhoto:
      "Two separate photos uploaded together: person A first, person B second; formal outfits work best",
    bestSourcePhoto: [
      "Each person in formal or wedding clothes",
      "Face large and sharp in each photo",
      "Similar indoor light",
      "Original images should not be blurry",
    ],
    altSource: "Bearded man in a cream patterned sherwani.",
    altSecond:
      "Woman in a red bridal lehenga with gold jewellery, a maang tikka and hennaed hands.",
    altResult: "Couple on a cream sofa before white and blush flowers with fairy lights.",
    template:
      "Merge the first uploaded photo and the second uploaded photo into one elegant {{subject}} photo of a couple seated together on a wedding stage. The first uploaded photo shows person A and the second uploaded photo shows person B. Follow the selected source-preservation settings: {{preserve}}. Always keep person A's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and person B's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Keep the outfit and jewelry each person wears in their own photo. If group arrangement and pose are not preserved, seat them side by side on a cream sofa, close together, smiling at the camera, at realistic relative heights. Light both with the same warm, soft stage light. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "85",
    id: "graduation-day-merge-two-photos-prompt-gemini-family",
    title: "Graduation Day Merge Two Photos Prompt for Gemini (Family)",
    note: "Graduate with a parent who could not attend",
    description:
      "Merge a graduate's photo with a parent's photo into one proud graduation day picture on a sunny campus lawn, both faces kept exactly as in their own photos.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Bright neutral",
    background: "Sunny campus lawn with trees and softly blurred academic buildings",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    changes: ["Graduate and parent together", "Campus lawn setting", "Plain black gown and cap", "Shared daylight"],
    stays: ["Graduate's face from photo 1", "Parent's face from photo 2", "Each skin tone", "Parent's own outfit"],
    height: 350,
    targetSourcePhoto: "Two photos uploaded together: the graduate first, the parent second",
    bestSourcePhoto: [
      "Graduate photo in a gown if you have one",
      "Parent's face large and sharp",
      "Both in daylight",
      "Original images should not be blurry",
    ],
    altSource: "Graduate in a black gown and cap on a campus lawn.",
    altSecond:
      "Parent in their 50s with glasses and a grey beard, in a charcoal blazer and light-blue shirt.",
    altResult: "Graduate beside her parent on a sunny campus lawn, his arm at her shoulder.",
    template:
      "Merge the first uploaded photo and the second uploaded photo into one proud graduation day {{subject}} photo. The first uploaded photo shows the graduate and the second uploaded photo shows their parent. Follow the selected source-preservation settings: {{preserve}}. Always keep the graduate's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and the parent's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Dress the graduate in a plain black graduation gown and cap with no crest or insignia, and keep the parent's own outfit. If group arrangement and pose are not preserved, stand them side by side, the parent's arm around the graduate, both smiling at the camera, at realistic relative heights. Light both with the same bright daylight and matching shadows. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "86",
    id: "mountain-viewpoint-trip-merge-two-photos-prompt-gemini-couple",
    title: "Mountain Trip Merge Two Photos Prompt for Gemini (Couple)",
    note: "Together at a mountain viewpoint in warm jackets",
    description:
      "Merge two separate photos into one travel photo of a couple at a mountain viewpoint, in warm jackets, with crisp daylight matched on both faces.",
    category: "Travel",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Bright sunlit cinematic outdoor color with vivid sky blue, warm golden skin highlights, deep navy tones, creamy whites, and fresh natural greens",
    background: "Mountain viewpoint with pine trees, a green valley, and distant snowy peaks",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    changes: ["Both at one mountain viewpoint", "Plain warm jackets", "Crisp shared daylight"],
    stays: [
      "Person A's face from photo 1",
      "Person B's face from photo 2",
      "Each skin tone",
      "Any head covering",
    ],
    height: 360,
    targetSourcePhoto: "Two separate photos uploaded together: person A first, person B second",
    bestSourcePhoto: [
      "One person per photo, face large and sharp",
      "Similar light in both photos (both daylight or both indoors)",
      "Similar head angle and framing, ideally chest-up",
      "Original images should not be blurry",
    ],
    altSource: "Bearded man in a black puffer at a railing with mountains.",
    altSecond: "Woman in a maroon puffer with a fur-trimmed hood and cream scarf.",
    altResult: "Couple in warm jackets at a railing with pines, a green valley and snowy peaks.",
    template:
      "Merge the first uploaded photo and the second uploaded photo into one natural travel {{subject}} photo of a couple at a mountain viewpoint. The first uploaded photo shows person A and the second uploaded photo shows person B. Follow the selected source-preservation settings: {{preserve}}. Always keep person A's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and person B's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Dress both in plain, unbranded warm jackets over their own clothes, keeping any head covering. If group arrangement and pose are not preserved, stand them side by side at a railing, smiling at the camera, at realistic relative heights. Light both with the same crisp daylight from one direction and matching shadows. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.",
  },
];

const categorySlug: Record<string, string> = {
  Cinematic: "cinematic",
  Vintage: "vintage",
  Travel: "travel",
  Pets: "pets",
};

/**
 * Two-photo merge templates 75–86.
 * Each style stores Photo 2 as source-<n>b.webp on a second example pair
 * that shares result-<n>.webp. The layout reads that pair. No extra columns.
 */
export const seedMergeStyles: CatalogStyle[] = merge.map((item, index) => {
  const source = asset(`source-${item.n}.png`);
  const second = asset(`source-${item.n}b.png`);
  const result = asset(`result-${item.n}.png`);
  const resultSize = item.ratio.startsWith("1:1")
    ? { resultWidth: 1200, resultHeight: 1200 }
    : { resultWidth: 1122, resultHeight: 1402 };
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    subject: item.subject,
    intent: item.intent,
    requirement: "Two photos",
    tool: "ChatGPT Image",
    note: item.note,
    height: item.height,
    saved: 15 - index,
    source,
    result,
    status: "published",
    targetSourcePhoto: item.targetSourcePhoto,
    description: item.description,
    bestSourcePhoto: item.bestSourcePhoto,
    changes: item.changes,
    stays: item.stays,
    examplePairs: [
      { source, result, altSource: item.altSource, altResult: item.altResult, ...resultSize },
      {
        source: second,
        result,
        altSource: item.altSecond,
        altResult: item.altResult,
        ...resultSize,
      },
    ],
    promptVariant: {
      id: `${item.id}-v1`,
      version: "1.0.0",
      tool: "ChatGPT Image",
      mode: "Image edit / transform with uploaded photo",
      inputImageCount: 2,
      inputImageRoles: ["first photo", "second photo"],
      template: item.template,
      defaults: {
        mood: item.mood,
        background: item.background,
        ratio: item.ratio,
        keepClothing: item.keepClothing,
        keepPose: item.keepPose,
      },
      lastVerified: "",
      limitations: [aiGeneratedLimit],
    },
  };
});

export const mergeStyleIds = new Set(seedMergeStyles.map((style) => style.id));

export const mergeCategorySlug = categorySlug;

/** Stored on catalog-public assets. Before photos are AI-generated. */
export const mergeAssetProvenance = {
  source: "seed",
  licence: "catalog",
  modelRelease: false,
  notes:
    "Before photos are AI-generated, not real people or animals. The after image is an AI edit of those sources.",
} as const;
