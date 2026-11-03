import type { CatalogStyle } from "./types";

const PUBLISHED_SUPABASE_URL = "https://rbmirzmppbytorbhncxj.supabase.co";

/**
 * Prefer Supabase catalog-public WebPs (uploaded by upload-outfit-change-assets).
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

type OutfitChangeSeed = {
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

/** 12 Outfit Change guide styles numbered 285–296 (images already in catalog-public). */
const outfitChangeAddon: OutfitChangeSeed[] = [
  {
    n: "285",
    id: "modern-saree-drape-outfit-change",
    title: "Modern Saree Drape Outfit Change AI Prompt",
    note: "Sage georgette saree with a sleek modern drape in soft daylight",
    description: "A modern saree AI prompt to change your outfit: sleek sage-green georgette drape in a bright apartment. Copy-paste free, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Soft modern pastel",
    background: "A bright minimalist modern apartment with a large window, sheer curtains and a few green plants",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Sage-green georgette saree", "Sleek modern drape", "Bright apartment", "Soft daylight"],
    stays: ["Face and identity", "Skin tone", "Hair and head covering", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult woman",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a modern sage-green saree outfit-change AI edit.",
    altResult: "Woman in a sage-green georgette saree with a sleek modern drape in a bright apartment after an outfit change AI prompt.",
    template: "Edit the uploaded portrait into a modern, elegant saree outfit-change portrait of a stylish woman. Keep the exact same face; change only the outfit. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, outfit tailoring and styling in rich, polished detail. If clothing is not preserved, dress her in a modern sage-green georgette saree with a sleek pre-pleated drape, a thin gold border, the pallu neatly over one shoulder and a matching elbow-sleeve blouse with a modest neckline, small gold studs and a slim bangle; keep any existing head covering. If pose is not preserved, show her standing at a relaxed three-quarter angle, one hand lightly holding the pallu, confident soft smile at the camera, framed from the knees up with the face large and sharp. Light her with soft diffused window daylight and a gentle warm fill. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed designs; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "286",
    id: "black-shalwar-kameez-outfit-change-men",
    title: "Black Shalwar Kameez Outfit Change AI Prompt for Men",
    note: "Tailored jet-black shalwar kameez in warm golden-hour light",
    description: "A black shalwar kameez AI prompt for men: crisp tailored black suit in a modern courtyard. Copy-paste free, change your outfit and keep your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm cinematic contrast",
    background: "A modern courtyard with a clean cream stone wall, wooden door and soft greenery",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Jet-black shalwar kameez", "Band collar", "Modern courtyard", "Golden-hour light"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a black shalwar kameez outfit-change AI edit for men.",
    altResult: "Man in a crisp jet-black shalwar kameez in a modern courtyard after a shalwar kameez AI prompt for men.",
    template: "Edit the uploaded portrait into a sharp, modern black shalwar kameez portrait of a stylish man. Keep the exact same face; change only the outfit. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, outfit tailoring and styling in rich, polished detail. If clothing is not preserved, dress him in a crisp tailored jet-black cotton shalwar kameez with a band collar, subtle tonal placket stitching and rolled-free full sleeves, black leather peshawari-style sandals and a minimal steel watch. If pose is not preserved, show him standing tall with one hand in his kameez side pocket, confident calm look at the camera, framed from the knees up with the face large and sharp. Light him with soft warm golden-hour side light. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed designs; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "287",
    id: "pastel-shalwar-kameez-outfit-change-women",
    title: "Pastel Shalwar Kameez Outfit Change AI Prompt for Women",
    note: "Powder-pink lawn suit with white thread work in a fresh garden",
    description: "A pastel shalwar kameez AI prompt for women: powder-pink lawn suit with a chiffon dupatta in a modern garden. Copy-paste free, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Soft pastel spring",
    background: "A modern landscaped garden with trimmed hedges, white flowers and a pale stone path",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Powder-pink lawn kameez", "Chiffon dupatta", "Modern garden", "Morning daylight"],
    stays: ["Face and identity", "Skin tone", "Hair and head covering", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult woman",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a pastel powder-pink shalwar kameez outfit-change AI edit for women.",
    altResult: "Woman in a powder-pink lawn kameez with chiffon dupatta in a modern garden after a shalwar kameez AI prompt.",
    template: "Edit the uploaded portrait into a fresh, modern pastel shalwar kameez portrait of a stylish woman. Keep the exact same face; change only the outfit. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, outfit tailoring and styling in rich, polished detail. If clothing is not preserved, dress her in a powder-pink lawn kameez with delicate white thread embroidery at the neckline and sleeves, straight cigarette trousers and a light chiffon dupatta draped over one shoulder, small pearl earrings; keep any existing head covering. If pose is not preserved, show her standing by a garden pathway, dupatta held lightly in one hand, soft natural smile at the camera, framed from the knees up with the face large and sharp. Light her with bright soft morning daylight. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed designs; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "288",
    id: "party-lehenga-outfit-change",
    title: "Party Lehenga Outfit Change AI Prompt (Non-Bridal)",
    note: "Mint-and-silver party lehenga under warm string lights",
    description: "A party lehenga AI prompt (not bridal): mint-and-silver sequin lehenga at an evening event. Change your dress in any photo and keep your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm evening glow",
    background: "A chic modern evening event lawn with warm string lights, soft florals and softly blurred empty tables",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Mint-and-silver lehenga", "Sequin and mirror work", "Evening event lawn", "String-light glow"],
    stays: ["Face and identity", "Skin tone", "Hair and head covering", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult woman",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a mint-and-silver party lehenga outfit-change AI edit.",
    altResult: "Woman in a mint-and-silver sequin party lehenga under string lights after a dress change AI prompt.",
    template: "Edit the uploaded portrait into a glamorous but non-bridal party lehenga portrait of a stylish woman. Keep the exact same face; change only the outfit. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, outfit tailoring and styling in rich, polished detail. If clothing is not preserved, dress her in a modern mint-and-silver party lehenga with a light flared skirt, fine sequin and mirror work, a modest elbow-sleeve blouse and a sheer net dupatta over one shoulder, statement silver earrings, no bridal jewellery; keep any existing head covering. If pose is not preserved, show her mid-twirl with the skirt gently flaring, one hand on the dupatta, bright confident smile at the camera, framed from the knees up with the face large and sharp. Light her with warm fairy-light glow and a soft front key light. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed designs; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "289",
    id: "black-suit-outfit-change-men",
    title: "Black Suit Outfit Change AI Prompt for Men",
    note: "Slim jet-black suit in a bright industrial loft — outfit swap, not a fashion shoot",
    description: "A black suit AI prompt for men framed as an outfit swap: slim-fit black two-piece with a white shirt in a bright industrial loft. Copy-paste free, change your outfit and keep your real face. Distinct from night-city, lobby, and studio fashion suit looks.",
    category: "Professional portraits",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Clean neutral contrast",
    background: "A modern industrial studio loft with large windows, concrete walls and soft daylight",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Slim black two-piece suit", "White shirt and tie", "Industrial loft", "Studio light"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a black suit outfit-change AI edit for men in a daylight loft.",
    altResult: "Man in a slim jet-black suit with white shirt in a bright industrial loft after a black suit men AI outfit-change prompt.",
    template: "Edit the uploaded portrait into a sharp, modern black suit portrait of a stylish man. Keep the exact same face; change only the outfit. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, outfit tailoring and styling in rich, polished detail. If clothing is not preserved, dress him in a slim-fit jet-black two-piece suit with notch lapels, a crisp white shirt, a slim black tie and a pocket square, polished black oxfords. If pose is not preserved, show him standing with one hand buttoning his jacket, chin slightly up, confident look at the camera, framed from the thighs up with the face large and sharp. Light him with clean soft studio key light and subtle rim light. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed designs; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "290",
    id: "blazer-power-suit-outfit-change-women",
    title: "Blazer Power Suit Outfit Change AI Prompt for Women",
    note: "Ivory double-breasted power suit in a bright glass office",
    description: "A blazer power suit AI prompt for women: ivory double-breasted suit in a modern office. Copy-paste free, change your outfit and keep your real face.",
    category: "Professional portraits",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Clean corporate neutral",
    background: "A bright modern office with glass walls, light oak desks and soft city-view bokeh, no readable signage",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Ivory power suit", "Wide-leg trousers", "Modern glass office", "Soft daylight"],
    stays: ["Face and identity", "Skin tone", "Hair and head covering", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult woman",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before an ivory blazer power-suit outfit-change AI edit for women.",
    altResult: "Woman in an ivory double-breasted power suit in a bright glass office after a change outfit in photo AI prompt.",
    template: "Edit the uploaded portrait into a confident, modern power-suit portrait of a stylish professional woman. Keep the exact same face; change only the outfit. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, outfit tailoring and styling in rich, polished detail. If clothing is not preserved, dress her in a tailored ivory double-breasted blazer with matching wide-leg trousers, a high-neck black silk shell top, small gold earrings and a minimal watch; keep any existing head covering. If pose is not preserved, show her standing with arms loosely crossed, poised confident smile at the camera, framed from the thighs up with the face large and sharp. Light her with soft daylight from tall windows and a gentle fill. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed designs; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "291",
    id: "oversized-hoodie-cargo-streetwear-outfit-change",
    title: "Oversized Hoodie & Cargo Streetwear Outfit Change AI Prompt",
    note: "Oversized grey hoodie and olive cargos on a clean city street",
    description: "A streetwear AI outfit swap prompt: oversized hoodie and cargo pants on a modern city street. Works for anyone; copy-paste free and keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Muted urban tones",
    background: "A clean modern city side street with a plain concrete wall, steel railings and soft background bokeh, no signage or graffiti text",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Oversized grey hoodie", "Olive cargo trousers", "Modern city street", "Overcast daylight"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before an oversized hoodie and cargo streetwear outfit-change AI edit.",
    altResult: "Person in an oversized grey hoodie and olive cargos on a clean city street after an AI outfit swap prompt.",
    template: "Edit the uploaded portrait into a cool, modern streetwear outfit-change portrait of a stylish person. Keep the exact same face; change only the outfit. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, outfit tailoring and styling in rich, polished detail. If clothing is not preserved, dress them in a plain unbranded oversized heather-grey hoodie, relaxed olive cargo trousers, chunky white unbranded sneakers and a simple black cap held in one hand. If pose is not preserved, show them leaning against a wall with hands in the hoodie pocket, relaxed confident half-smile at the camera, framed from the knees up with the face large and sharp. Light them with soft overcast city daylight. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed designs; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "292",
    id: "kurta-waistcoat-eid-outfit-change-men",
    title: "Kurta Waistcoat Eid Outfit Change AI Prompt for Men",
    note: "Off-white kurta with an emerald waistcoat for Eid",
    description: "A kurta waistcoat Eid AI prompt for men: off-white kurta and emerald waistcoat in a warm modern home. Copy-paste free, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm festive gold",
    background: "A modern home entrance with cream walls, brass lanterns, fresh white flowers and soft fairy lights",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Off-white kurta pajama", "Emerald waistcoat", "Modern festive entrance", "Warm light"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a kurta and emerald waistcoat Eid outfit-change AI edit for men.",
    altResult: "Man in an off-white kurta with emerald waistcoat at a modern festive entrance after an Eid kurta AI prompt for men.",
    template: "Edit the uploaded portrait into a polished, modern Eid kurta and waistcoat portrait of a stylish man. Keep the exact same face; change only the outfit. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, outfit tailoring and styling in rich, polished detail. If clothing is not preserved, dress him in a crisp off-white cotton kurta with matching straight pajama and a fitted deep-emerald textured waistcoat with tonal buttons, black leather khussa-style shoes. If pose is not preserved, show him standing relaxed with one hand lightly adjusting the waistcoat, warm festive smile at the camera, framed from the knees up with the face large and sharp. Light him with soft warm late-afternoon light. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed designs; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "293",
    id: "modest-maxi-abaya-chic-outfit-change",
    title: "Modest Maxi & Abaya-Chic Outfit Change AI Prompt",
    note: "Flowing taupe abaya-chic maxi on a sunlit terrace",
    description: "A modest maxi and abaya-chic AI prompt: flowing taupe crepe dress on a modern terrace. Copy-paste free, change your dress and keep your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm neutral beige",
    background: "A modern minimalist terrace with cream stone walls, clean lines and potted olive trees",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Taupe abaya-style maxi", "Flowing crepe", "Modern terrace", "Golden-hour light"],
    stays: ["Face and identity", "Skin tone", "Hair and head covering", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult woman",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a taupe abaya-chic maxi outfit-change AI edit.",
    altResult: "Woman in a flowing taupe crepe abaya-style maxi on a modern terrace after a dress change AI prompt.",
    template: "Edit the uploaded portrait into an elegant, modern modest-fashion portrait of a stylish woman. Keep the exact same face; change only the outfit. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, outfit tailoring and styling in rich, polished detail. If clothing is not preserved, dress her in a flowing full-length taupe crepe abaya-style maxi dress with an open front over a cream inner layer, wide sleeves, a thin tie belt and simple gold studs; keep any existing head covering or, if hair is uncovered, keep it as it is. If pose is not preserved, show her walking slowly toward the camera, fabric flowing, soft confident smile, framed from the knees up with the face large and sharp. Light her with warm soft golden-hour light. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed designs; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "294",
    id: "couple-matching-black-outfits-change",
    title: "Couple Matching Black Outfits AI Prompt",
    note: "Matching all-black looks on a blue-hour rooftop",
    description: "A couple clothes change AI prompt: matching all-black outfits on a modern rooftop at blue hour. Upload two photos or one of you both. Keeps both real faces.",
    category: "Couple",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Moody modern noir-lite",
    background: "A modern rooftop terrace at blue hour with soft city-light bokeh and glass railings, no readable signs",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 2,
    changes: ["Matching black outfits", "Blazer and suit", "Blue-hour rooftop", "City bokeh"],
    stays: ["Both faces and identities", "Skin tones", "Hair, beard and head coverings", "Glasses if worn"],
    targetSourcePhoto: "Two clear photos (one per person) or one photo of you both",
    bestSourcePhoto: ["One clear photo per person, or one photo of you both", "Both faces front or three-quarter, sharp", "Similar lighting in both photos helps", "Original images should not be blurry"],
    altSource: "First source portrait before a couple matching black outfits AI edit.",
    altResult: "Couple in matching all-black outfits on a blue-hour rooftop after a couple clothes change AI prompt.",
    altSecond: "Second source portrait before a couple matching black outfits AI edit.",
    template: "Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a sleek, modern couple portrait in matching all-black outfits; keep both faces exactly the same and change only the outfits. The first uploaded photo shows person A and the second uploaded photo shows person B; if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, outfit tailoring and styling in rich, polished detail. If clothing is not preserved, dress person A (woman) in a modest long-sleeve black satin midi-to-ankle dress with a black tailored blazer over the shoulders and small silver earrings, keeping any head covering; dress person B (man) in a black turtleneck and a black slim-fit suit. If group arrangement and pose are not preserved, show them standing side by side, his arm lightly around her shoulder, both smiling confidently at the camera, framed from the waist up with faces large and sharp. Keep natural, modest, family-friendly body language. Light them with soft cool evening city light and warm bokeh. Apply {{mood}} color grading. Use {{background}} as the backdrop. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed designs; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "295",
    id: "couple-eastern-twinning-outfit-change",
    title: "Couple Eastern Twinning Outfit Change AI Prompt",
    note: "Coordinated dusty-rose kurta and suit twinning",
    description: "A couple Eastern twinning AI prompt: matching dusty-rose kurta and embroidered suit in a modern lounge. Upload two photos or one of you both. Keeps both real faces.",
    category: "Couple",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Soft warm rose",
    background: "A modern home lounge with cream walls, a low sofa, brass accents and soft indoor plants",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 2,
    changes: ["Matching dusty-rose outfits", "Embroidered suit and kurta", "Modern lounge", "Soft daylight"],
    stays: ["Both faces and identities", "Skin tones", "Hair, beard and head coverings", "Glasses if worn"],
    targetSourcePhoto: "Two clear photos (one per person) or one photo of you both",
    bestSourcePhoto: ["One clear photo per person, or one photo of you both", "Both faces front or three-quarter, sharp", "Similar lighting in both photos helps", "Original images should not be blurry"],
    altSource: "First source portrait before a couple Eastern twinning outfit-change AI edit.",
    altResult: "Couple in coordinated dusty-rose kurta and embroidered suit after a couple dress change AI prompt.",
    altSecond: "Second source portrait before a couple Eastern twinning outfit-change AI edit.",
    template: "Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a stylish, modern couple portrait in coordinated Eastern outfits; keep both faces exactly the same and change only the outfits. The first uploaded photo shows person A and the second uploaded photo shows person B; if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, outfit tailoring and styling in rich, polished detail. If clothing is not preserved, dress person A (woman) in a dusty-rose straight kameez suit with fine ivory embroidery, straight trousers and a light dupatta, keeping any head covering; dress person B (man) in a matching dusty-rose cotton kurta with ivory pajama. If group arrangement and pose are not preserved, show them standing close together, she holds his arm lightly, both laughing naturally at the camera, framed from the knees up with faces large and sharp. Keep natural, modest, family-friendly body language. Light them with soft warm daylight. Apply {{mood}} color grading. Use {{background}} as the backdrop. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed designs; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "296",
    id: "leather-jacket-street-outfit-change-men",
    title: "Leather Jacket Street Look Outfit Change AI Prompt for Men",
    note: "Black leather biker jacket on a modern city street",
    description: "A leather jacket AI prompt for men: black biker jacket and white tee on a modern street. Copy-paste free, change your outfit and keep your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Cool cinematic teal",
    background: "A clean modern city street with glass storefronts blurred into soft bokeh, no readable signs or logos",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Black leather biker jacket", "White tee and jeans", "Modern city street", "Late-afternoon light"],
    stays: ["Face and identity", "Skin tone", "Hairstyle and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a black leather jacket street outfit-change AI edit for men.",
    altResult: "Man in a black leather biker jacket and white tee on a modern city street after an outfit change AI prompt.",
    template: "Edit the uploaded portrait into a cool, modern leather-jacket street portrait of a stylish man. Keep the exact same face; change only the outfit. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Render fabric texture, outfit tailoring and styling in rich, polished detail. If clothing is not preserved, dress him in a plain unbranded black leather biker jacket over a white crew-neck tee, slim dark-wash jeans and black chelsea boots. If pose is not preserved, show him walking toward the camera with one hand adjusting the jacket collar, confident half-smile, framed from the knees up with the face large and sharp. Light him with soft late-afternoon side light and gentle rim light. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, landmarks, or licensed designs; keep clothing modest, stylish, and unbranded. Modern, stylish and polished, not old-fashioned. Compose for {{ratio}} without cropping important facial features.",
  }
];

export const seedOutfitChangeStyles: CatalogStyle[] = outfitChangeAddon.map(
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
        lastVerified: "2026-11-02",
        limitations: [aiGeneratedLimit, faceOcclusionLimit],
      },
    };
  },
);

export const outfitChangeStyleIds = new Set(
  seedOutfitChangeStyles.map((style) => style.id),
);
