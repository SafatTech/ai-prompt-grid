import type { CatalogStyle } from "./types";

const PUBLISHED_SUPABASE_URL = "https://rbmirzmppbytorbhncxj.supabase.co";

/**
 * Prefer Supabase catalog-public WebPs (uploaded by upload-wedding-dresses-assets).
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

type WeddingDressSeed = {
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

/** 14 Wedding Dress guide styles numbered 259–272 (images already in catalog-public). */
const weddingDressAddon: WeddingDressSeed[] = [
  {
    n: "259",
    id: "red-bridal-lehenga",
    title: "Red Bridal Lehenga AI Prompt (Zardozi & Kundan)",
    note: "Classic red zardozi lehenga, head dupatta and kundan set in a palace hall",
    description: "A red lehenga AI prompt for brides: heavy zardozi lehenga, dupatta over the head and gold kundan jewellery in a marble palace hall. Copy-paste free, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Rich royal crimson",
    background: "A grand Mughal-style palace hall with carved marble arches, warm hanging lanterns and deep red rose petals scattered on the floor",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Red zardozi bridal lehenga", "Dupatta over the head", "Gold kundan jewellery", "Palace hall backdrop"],
    stays: ["Face and identity", "Skin tone", "Hair and head covering", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult woman",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a red bridal lehenga AI edit with zardozi embroidery and gold kundan jewellery.",
    altResult: "Bride in a deep-red zardozi bridal lehenga with dupatta and kundan set after a wedding dress AI prompt.",
    template: "Edit the uploaded portrait into a dramatic red bridal lehenga portrait of a bride. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. The focus is the outfit change: render embroidery, fabric sheen and jewellery in rich detail. If clothing is not preserved, dress her in a classic deep-red bridal lehenga with heavy gold zardozi and dabka embroidery, a full-sleeve or elbow-sleeve modest blouse, a heavy embroidered red dupatta draped over her head and shoulders, a gold kundan necklace set, jhumkas, maang tikka and red-and-gold bangles; keep any existing head covering. If pose is not preserved, show her standing in a three-quarter turn, one hand lightly holding the edge of the dupatta, the lehenga flare visible, looking at the camera with a soft confident smile, three-quarter body in frame. Light her with warm chandelier glow and a soft key light on the face so the gold embroidery sparkles. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, elegant, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "260",
    id: "pastel-bridal-lehenga",
    title: "Pastel Bridal Lehenga AI Prompt (Blush & Pearls)",
    note: "Blush or mint lehenga with pearls in a flower-filled garden pavilion",
    description: "A lehenga AI prompt for girls: blush or mint bridal lehenga with pearl jewellery in a flower-filled garden pavilion. Copy-paste free, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Soft dreamy pastel",
    background: "A lush garden pavilion in soft daylight with white marble pillars, cascading white and pink flowers and a blurred fountain behind",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Pastel bridal lehenga", "Pearl jewellery", "Sheer dupatta", "Garden pavilion"],
    stays: ["Face and identity", "Skin tone", "Hair and head covering", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult woman",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a pastel bridal lehenga AI edit with pearl jewellery.",
    altResult: "Bride in a blush pastel bridal lehenga with pearl choker after a lehenga AI prompt for girls.",
    template: "Edit the uploaded portrait into an elegant pastel bridal lehenga portrait of a bride. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. The focus is the outfit change: render embroidery, fabric sheen and jewellery in rich detail. If clothing is not preserved, dress her in a blush-pink or mint-green bridal lehenga with tonal resham and pearl embroidery, a modest full-sleeve blouse, a sheer scalloped dupatta over one shoulder and lightly over her head, delicate pearl choker, pearl jhumkas and a small maang tikka; keep any existing head covering. If pose is not preserved, show her standing in a soft three-quarter turn in a garden, both hands lightly holding the lehenga, looking at the camera with a gentle smile, three-quarter body in frame. Light her with soft diffused daylight and a gentle backlight that glows through the dupatta. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, elegant, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "261",
    id: "bridal-sharara",
    title: "Bridal Sharara AI Prompt (Maroon Gota Work)",
    note: "Maroon gota sharara, long kameez and matha patti on a haveli takht",
    description: "A bridal AI prompt for a sharara look: maroon gota-work sharara, long kameez and matha patti, seated in a lamp-lit haveli. Copy-paste free, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Deep jewel-tone dramatic",
    background: "A traditional haveli courtyard at night with carved jharokha windows, brass lamps, deep red drapes and scattered marigold and rose petals",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Maroon gota sharara", "Long embroidered kameez", "Matha patti", "Haveli courtyard"],
    stays: ["Face and identity", "Skin tone", "Hair and head covering", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult woman",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a maroon bridal sharara AI edit with gota work.",
    altResult: "Bride in a maroon gota-work bridal sharara seated in a haveli after a bridal AI prompt.",
    template: "Edit the uploaded portrait into a dramatic bridal sharara portrait of a bride. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. The focus is the outfit change: render embroidery, fabric sheen and jewellery in rich detail. If clothing is not preserved, dress her in a deep-maroon bridal sharara with wide flared legs and gold gota-patti work, a long knee-length embroidered kameez with full sleeves, a heavy gota-bordered dupatta over her head, a gold matha patti, nath-free jhumkas and stacked gold bangles; keep any existing head covering. If pose is not preserved, show her seated gracefully on a low carved wooden takht, the sharara spread around her, one hand resting on her knee, looking at the camera with a calm regal expression, full body in frame. Light her with warm candle and brass-lamp glow and a soft key light on the face. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, elegant, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "262",
    id: "nikkah-dress",
    title: "Nikah Dress AI Prompt (Ivory & Gold)",
    note: "Modest ivory and gold nikah outfit with a sheer head dupatta",
    description: "A bridal look AI prompt for nikah: a modest ivory-and-gold outfit with a sheer dupatta under white floral arches. Copy-paste free, keeps your real face.",
    category: "Professional portraits",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Soft ivory luminous",
    background: "An elegant nikah setting with ivory floral arches of white roses and jasmine, soft sheer drapes and warm fairy-light bokeh",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Ivory and gold nikah outfit", "Sheer head dupatta", "Minimal jewellery", "White floral arch"],
    stays: ["Face and identity", "Skin tone", "Hair, hijab or head covering", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult woman",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before an ivory-and-gold nikah dress AI edit.",
    altResult: "Bride in a modest ivory-and-gold nikah outfit with sheer dupatta after a bridal look AI prompt.",
    template: "Edit the uploaded portrait into a graceful nikah bridal portrait in ivory and gold. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. The focus is the outfit change: render embroidery, fabric sheen and jewellery in rich detail. If clothing is not preserved, dress her in a modest ivory-and-gold nikah outfit: a long ivory kameez or angrakha with fine gold tilla and pearl work, full sleeves, a matching lehenga or straight pants, a sheer ivory dupatta with gold border draped softly over her head, minimal jewellery of small gold jhumkas and a delicate tikka; keep any existing head covering or hijab. If pose is not preserved, show her seated or standing calmly, hands softly folded holding the dupatta edge, eyes toward the camera with a serene soft smile, waist-up to three-quarter body in frame. Light her with soft window light and warm fairy-light bokeh behind. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, elegant, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "263",
    id: "walima-maxi",
    title: "Walima Maxi AI Prompt (Silver Champagne Gown)",
    note: "Silver or champagne embellished maxi on a crystal-chandelier walima stage",
    description: "A dulhan AI prompt for walima: a silver-champagne embellished maxi with a net dupatta on a crystal-lit reception stage. Copy-paste free, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Glamorous champagne silver",
    background: "A luxurious walima reception stage with crystal chandeliers, white and silver floral walls, mirrored floor and soft glowing bokeh",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Embellished walima maxi", "Net dupatta", "Statement jewellery", "Chandelier reception stage"],
    stays: ["Face and identity", "Skin tone", "Hair and head covering", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult woman",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a silver champagne walima maxi AI edit.",
    altResult: "Bride in a silver champagne embellished walima maxi after a dulhan AI photo prompt.",
    template: "Edit the uploaded portrait into a glamorous walima reception portrait of a bride in an embellished maxi. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. The focus is the outfit change: render embroidery, fabric sheen and jewellery in rich detail. If clothing is not preserved, dress her in a floor-length silver or champagne walima maxi with full sleeves, a modest neckline, heavy crystal, sequin and pearl embellishment, a long trailing hem, a matching embellished net dupatta over one shoulder or lightly on her head, a diamond-style choker and statement earrings; keep any existing head covering. If pose is not preserved, show her standing with the maxi train swept to one side, one hand lightly on the dupatta, looking at the camera with an elegant confident smile, full body in frame. Light her with sparkling crystal-chandelier glow and a soft cool rim light so the embellishment shimmers. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, elegant, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "264",
    id: "mehndi-outfit",
    title: "Mehndi Outfit AI Prompt (Mustard & Green Gharara)",
    note: "Mustard and green gharara with floral jewellery at a mehndi night",
    description: "A mehndi outfit prompt: mustard and green gota gharara, floral jewellery and a marigold swing under string lights. Copy-paste free, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Vibrant warm festive",
    background: "A colourful mehndi night setting with marigold garlands, hanging string lights, brass lanterns, colourful floor cushions and a floral swing",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Mustard and green gharara", "Fresh floral jewellery", "Leheriya dupatta", "Marigold mehndi setting"],
    stays: ["Face and identity", "Skin tone", "Hair and head covering", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult woman",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a mustard and green mehndi gharara AI edit.",
    altResult: "Bride in a mustard-green mehndi gharara with floral jewellery after a wedding outfit AI prompt.",
    template: "Edit the uploaded portrait into a vibrant mehndi-night portrait of a bride. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. The focus is the outfit change: render embroidery, fabric sheen and jewellery in rich detail. If clothing is not preserved, dress her in a mustard-yellow and parrot-green mehndi gharara with mirror and gota work, a short full-sleeve kurti, a multicolour leheriya or gota dupatta over her head, fresh floral jewellery of marigold and jasmine (tikka, earrings, bracelets), and green glass bangles; keep any existing head covering. If pose is not preserved, show her seated on a swing or floor cushions, one hand raised slightly showing simple henna, looking at the camera with a joyful smile, three-quarter body in frame. Light her with warm string lights and glowing lanterns. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, elegant, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "265",
    id: "white-wedding-gown",
    title: "White Wedding Dress AI Prompt (Modest Lace Gown)",
    note: "Long-sleeve lace gown and veil in a sunlit arched hall",
    description: "A white wedding dress prompt: a modest long-sleeve lace gown and tulle veil in a sunlit arched hall. Copy-paste free, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Soft cinematic ivory",
    background: "A neutral grand hall with tall arched windows, white floral arrangements, soft sheer drapes and a polished marble floor, no religious symbols",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Long-sleeve lace gown", "Tulle veil", "Rose bouquet", "Sunlit arched hall"],
    stays: ["Face and identity", "Skin tone", "Hair and head covering", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult woman",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a modest white wedding gown AI edit.",
    altResult: "Bride in a modest long-sleeve lace white wedding gown and veil after a wedding gown AI prompt.",
    template: "Edit the uploaded portrait into an elegant modest white wedding gown portrait of a bride. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. The focus is the outfit change: render embroidery, fabric sheen and jewellery in rich detail. If clothing is not preserved, dress her in a modest long-sleeve white wedding gown with a high or bateau neckline, fine floral lace, a full flowing skirt and a soft chapel-length tulle veil over her hair, small pearl earrings; no bare shoulders or low neckline; keep any existing head covering. If pose is not preserved, show her standing in a three-quarter turn holding a white rose bouquet at waist height, veil flowing behind, looking at the camera with a soft smile, full body in frame. Light her with soft golden window light and a gentle glow through the veil. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, elegant, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "266",
    id: "ivory-sherwani",
    title: "Ivory Sherwani AI Prompt for Grooms (Dulha Look)",
    note: "Ivory zardozi sherwani with kulla and khussa in a palace corridor",
    description: "A wedding sherwani prompt for grooms: ivory zardozi sherwani, kulla turban, pearl mala and khussa in a palace corridor. Copy-paste free, keeps your real face.",
    category: "Professional portraits",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Rich regal gold",
    background: "A royal palace corridor with carved sandstone arches, warm lanterns and soft drapes in deep red and gold",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Ivory zardozi sherwani", "Kulla or safa", "Pearl mala", "Palace corridor"],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before an ivory dulha sherwani AI edit.",
    altResult: "Groom in an ivory zardozi sherwani with kulla after a sherwani AI prompt.",
    template: "Edit the uploaded portrait into a regal groom portrait in an ivory sherwani. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. The focus is the outfit change: render embroidery, fabric sheen and jewellery in rich detail. If clothing is not preserved, dress him in an ivory or off-white silk sherwani with fine gold zardozi on the collar and front, matching churidar, a gold-and-ivory kulla or safa turban, a light embroidered shawl over one shoulder, a pearl mala and gold khussa shoes; keep any existing head covering instead of the turban. If pose is not preserved, show him standing tall in a three-quarter turn, one hand on the sherwani button line, looking at the camera with a confident warm smile, three-quarter body in frame. Light him with warm golden palace light and a soft key light on the face. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, elegant, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "267",
    id: "black-sherwani",
    title: "Black Sherwani AI Prompt (Velvet Reception Look)",
    note: "Black velvet sherwani with gold buttons under moody reception lights",
    description: "A black sherwani prompt: black velvet sherwani with antique gold buttons under moody gold reception lights. Copy-paste free, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Moody cinematic noir gold",
    background: "A dark luxurious reception hall with warm gold uplighting, deep velvet drapes, scattered candles and soft gold bokeh",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Black velvet sherwani", "Gold buttons", "Moody reception lighting", "Embroidered khussa"],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a black velvet sherwani AI edit.",
    altResult: "Groom in a black velvet sherwani with gold buttons after a sherwani AI prompt.",
    template: "Edit the uploaded portrait into a dramatic groom reception portrait in a black velvet sherwani. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. The focus is the outfit change: render embroidery, fabric sheen and jewellery in rich detail. If clothing is not preserved, dress him in a black velvet sherwani with antique gold buttons and fine gold embroidery on the collar and cuffs, a black or ivory churidar, a deep-maroon or gold pocket shawl, black embroidered khussa shoes; no turban; keep any existing head covering. If pose is not preserved, show him standing with hands lightly clasped in front, slight three-quarter turn, looking at the camera with a calm confident expression, three-quarter body in frame. Light him with moody low-key warm spotlight and soft gold rim light. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, elegant, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "268",
    id: "groom-prince-coat",
    title: "Wedding Dress Prompt for Men (Prince Coat & Waistcoat)",
    note: "Navy prince coat or brocade waistcoat over a kurta on a fairy-lit lawn",
    description: "A wedding dress prompt for men: a navy prince coat or brocade waistcoat over a kurta on a fairy-lit wedding lawn. Copy-paste free, keeps your real face.",
    category: "Professional portraits",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm evening elegant",
    background: "A softly lit garden lawn at a wedding evening with fairy-light canopies, white floral pillars and warm bokeh",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Prince coat or waistcoat", "Kurta and churidar", "Pocket square", "Fairy-lit wedding lawn"],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a navy prince coat wedding outfit AI edit.",
    altResult: "Groom in a navy prince coat over a kurta after a wedding dress prompt for men.",
    template: "Edit the uploaded portrait into a sharp groom portrait in a prince coat over a kurta. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. The focus is the outfit change: render embroidery, fabric sheen and jewellery in rich detail. If clothing is not preserved, dress him in a tailored navy or emerald prince coat (or a rich brocade waistcoat) over a white or ivory kurta with churidar or straight trousers, a silk pocket square, polished black or tan juttis; no turban; keep any existing head covering. If pose is not preserved, show him standing with one hand in the trouser pocket and the other adjusting a cuff, slight three-quarter turn, looking at the camera with a confident smile, three-quarter body in frame. Light him with warm evening string-light glow and a soft key light on the face. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, elegant, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "269",
    id: "couple-wedding-outfits",
    title: "Couple Wedding Dress AI Prompt (Maroon & Ivory)",
    note: "Coordinated maroon lehenga and ivory sherwani couple in a palace hall",
    description: "A couple wedding dress AI prompt: coordinated maroon lehenga and ivory sherwani in a marble palace hall. Upload two photos, keeps both real faces.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Rich royal maroon gold",
    background: "A grand palace hall with carved marble arches, deep maroon drapes, warm hanging lanterns and rose petals on the floor",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 2,
    changes: ["Coordinated wedding outfits", "Maroon lehenga", "Ivory sherwani", "Palace hall"],
    stays: ["Both faces and identities", "Each skin tone and age", "Hairstyles, beards, head coverings", "Realistic relative heights"],
    targetSourcePhoto: "Two clear photos (one per person) or one photo of you both",
    bestSourcePhoto: ["One clear photo per person, or one photo of you both", "Both faces front or three-quarter, sharp", "Similar lighting in both photos helps", "Original images should not be blurry"],
    altSource: "First source portrait before a couple wedding dress AI edit in maroon and ivory.",
    altResult: "Couple in coordinated maroon lehenga and ivory sherwani after a couple wedding dress AI prompt.",
    altSecond: "Second source portrait before a couple wedding dress AI edit in maroon and ivory.",
    template: "Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a coordinated couple wedding outfit portrait. The first uploaded photo shows person A and the second uploaded photo shows person B; if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. The focus is the outfit change: render embroidery, fabric sheen and jewellery in rich detail. If clothing is not preserved, dress person A in a deep-maroon bridal lehenga with gold zardozi, a modest full-sleeve blouse, an embroidered dupatta over her head and gold kundan jewellery, and person B in an ivory sherwani with maroon-and-gold embroidery, a maroon shawl and a matching kulla or safa; keep any head covering or dupatta. If group arrangement and pose are not preserved, show them standing side by side in a slight inward turn, person A's hand resting on person B's arm, both looking at the camera with warm smiles, three-quarter bodies visible at realistic relative heights. Keep natural, modest, family-friendly body language. Light both with the same warm chandelier glow and soft key light so they look photographed together. Apply {{mood}} color grading. Use {{background}} as the backdrop. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, elegant, and unbranded. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "270",
    id: "dulha-dulhan-outfits",
    title: "Dulha Dulhan AI Prompt (Bride & Groom Outfits)",
    note: "Bride and groom outfits on a red-and-gold wedding stage",
    description: "A dulha dulhan AI prompt: dress both of you as bride and groom, red lehenga and gold sherwani on a floral wedding stage. Upload two photos, keeps both faces.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Dramatic festive crimson",
    background: "A lavish wedding stage with a carved gold sofa, walls of red roses and marigolds, hanging floral strings and warm golden bokeh",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 2,
    changes: ["Bridal and groom outfits", "Red lehenga", "Gold sherwani and safa", "Floral wedding stage"],
    stays: ["Both faces and identities", "Each skin tone and age", "Hairstyles, beards, head coverings", "Realistic relative heights"],
    targetSourcePhoto: "Two clear photos (one per person) or one photo of you both",
    bestSourcePhoto: ["One clear photo per person, or one photo of you both", "Both faces front or three-quarter, sharp", "Similar lighting in both photos helps", "Original images should not be blurry"],
    altSource: "First source portrait before a dulha dulhan outfit AI edit.",
    altResult: "Dulha and dulhan in red lehenga and gold sherwani after a dulha dulhan AI prompt.",
    altSecond: "Second source portrait before a dulha dulhan outfit AI edit.",
    template: "Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a traditional dulha and dulhan portrait. The first uploaded photo shows person A and the second uploaded photo shows person B; if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. The focus is the outfit change: render embroidery, fabric sheen and jewellery in rich detail. If clothing is not preserved, dress person A as a dulhan in a rich red and gold bridal lehenga or sharara with heavy embroidery, a modest full-sleeve blouse, a red dupatta over her head, a gold matha patti and kundan set, and person B as a dulha in a gold-and-cream sherwani with a red-and-gold safa turban, a pearl mala and khussa shoes; keep any head covering or dupatta. If group arrangement and pose are not preserved, show them seated together on an ornate carved wedding sofa, person A slightly angled toward person B, both looking at the camera with warm smiles, full upper bodies visible at realistic relative heights. Keep natural, modest, family-friendly body language. Light both with the same warm stage lights and soft key light so they look photographed together. Apply {{mood}} color grading. Use {{background}} as the backdrop. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, elegant, and unbranded. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "271",
    id: "mehndi-groom-kurta",
    title: "Mehndi Groom Kurta AI Prompt (Mustard & Green)",
    note: "Mustard or green silk kurta, printed waistcoat and floral mala at mehndi",
    description: "A mehndi groom look: mustard or green silk kurta, printed waistcoat and a fresh floral mala on a marigold swing. Copy-paste free, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Vibrant warm festive",
    background: "A colourful mehndi night setting with marigold garlands, hanging string lights, brass lanterns, colourful floor cushions and a floral swing",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Silk mehndi kurta", "Printed waistcoat", "Floral mala", "Marigold mehndi setting"],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a mustard-green mehndi groom kurta AI edit.",
    altResult: "Groom in a mustard-green mehndi kurta with floral mala after a wedding outfit AI prompt.",
    template: "Edit the uploaded portrait into a vibrant mehndi-night groom portrait. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. The focus is the outfit change: render embroidery, fabric sheen and jewellery in rich detail. If clothing is not preserved, dress him in a mustard-yellow or deep-green raw-silk kurta with straight pajama, a hand-block printed or ajrak-style waistcoat in green, mustard and rust, a fresh marigold and rose floral mala around his neck, and tan khussa shoes; keep any existing head covering. If pose is not preserved, show him seated relaxed on a floral swing or low cushions, one hand on his knee, laughing warmly toward the camera, three-quarter body in frame. Light him with warm string lights and glowing lanterns. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, elegant, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "272",
    id: "walima-groom-suit",
    title: "Walima Groom Suit AI Prompt (Three-Piece Tuxedo)",
    note: "Charcoal or midnight-blue three-piece suit on a chandelier walima stage",
    description: "A walima groom suit look: charcoal or midnight-blue three-piece suit or tuxedo with a pocket square on a crystal-lit stage. Copy-paste free, keeps your real face.",
    category: "Professional portraits",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Glamorous midnight cinematic",
    background: "A luxurious walima reception stage with crystal chandeliers, white and silver floral walls, mirrored floor and soft glowing bokeh",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Three-piece suit or tuxedo", "Pocket square", "Bow tie or silk tie", "Chandelier reception stage"],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even light, no beauty filters", "Original image should not be blurry"],
    altSource: "Casual portrait before a charcoal walima groom suit AI edit.",
    altResult: "Groom in a midnight-blue three-piece walima suit after a wedding dress AI prompt for men.",
    template: "Edit the uploaded portrait into a polished walima reception groom portrait in a three-piece suit. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. The focus is the outfit change: render embroidery, fabric sheen and jewellery in rich detail. If clothing is not preserved, dress him in a tailored charcoal or midnight-blue three-piece suit or tuxedo with a matching waistcoat, a crisp white shirt, a dark silk tie or bow tie, a folded silk pocket square, and polished black oxford shoes; keep any existing head covering. If pose is not preserved, show him standing with one hand buttoning the jacket, slight three-quarter turn, looking at the camera with a confident smile, three-quarter body in frame. Light him with sparkling crystal-chandelier glow and a soft cool rim light. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, elegant, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
];

export const seedWeddingDressStyles: CatalogStyle[] = weddingDressAddon.map(
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
        lastVerified: "2026-10-31",
        limitations: [aiGeneratedLimit, faceOcclusionLimit],
      },
    };
  },
);

export const weddingDressStyleIds = new Set(
  seedWeddingDressStyles.map((style) => style.id),
);
