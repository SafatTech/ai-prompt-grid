import type { CatalogStyle } from "./types";

/**
 * Prefer Supabase catalog-public WebPs (uploaded by publish-christmas-standalone).
 * Falls back to the published project URL when the env is unset, because the
 * Christmas WebPs are not checked into this repo.
 */
const PUBLISHED_SUPABASE_URL = "https://rbmirzmppbytorbhncxj.supabase.co";

function asset(name: string): string {
  const base = (
    process.env.NEXT_PUBLIC_SUPABASE_URL || PUBLISHED_SUPABASE_URL
  ).replace(/\/$/, "");
  const stem = name.replace(/\.[^.]+$/, "");
  return `${base}/storage/v1/object/public/catalog-public/seed/catalog/editorial/${stem}.webp`;
}

type ChristmasSeed = {
  n: string;
  id: string;
  title: string;
  note: string;
  description: string;
  category: "Cinematic" | "Pets";
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
  /** Pixel size of the uploaded after WebP. */
  resultWidth: number;
  resultHeight: number;
};

const aiGeneratedLimit =
  "Example people and pets in the before photo are AI-generated, not real.";

const faceOcclusionLimit = "Heavy face occlusion can weaken identity fidelity";

const christmas: ChristmasSeed[] = [
  {
    n: "135",
    id: "christmas-couple-photo-ai-prompt-decorating-the-tree",
    title: "Christmas Couple Photo AI Prompt (Decorating the Tree)",
    note: "Couple hanging ornaments on a tall Christmas tree together",
    description:
      "A Christmas couple photo AI prompt: two photos become one cozy shot of you both hanging red and gold ornaments on a tall tree. Free to copy-paste.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    requirement: "Two photos",
    mood: "Warm festive red and gold",
    background:
      "Cozy living room with a tall green Christmas tree, red and gold ornaments, and a wooden floor",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 2,
    changes: ["Decorating a Christmas tree", "Red and gold ornaments", "Coordinated festive outfits", "Candid together pose"],
    stays: ["Both faces and identities", "Each skin tone and age", "Hairstyles, beards, head coverings", "Realistic relative heights"],
    height: 340,
    targetSourcePhoto: "Two clear photos (one per person) or one photo of you both",
    bestSourcePhoto: ["One clear photo per person, or one photo of you both", "Faces large and sharp", "Similar light in both photos", "Original images should not be blurry"],
    altSource:
      "South Asian man with short black hair and a short beard in a grey t-shirt, taking a selfie in a living room with a sofa and bookshelf.",
    altResult:
      "Realistic photo of the same couple decorating a Christmas tree in a living room, he in a green kurta holding a gold star ornament, she in a deep red kurti and dupatta hanging a red bauble, with red and gold ornaments and wrapped gifts under the tree.",
    altSecond:
      "South Asian woman with long dark hair in a lavender cotton kurti, smiling in a home living room with a sofa and bookshelves.",
    beforeFile: "christmas-couple-photo-ai-prompt-decorating-the-tree-before.webp",
    afterFile: "christmas-couple-photo-ai-prompt-decorating-the-tree-after.webp",
    beforeBFile: "christmas-couple-photo-ai-prompt-decorating-the-tree-before-b.webp",
    resultWidth: 1200,
    resultHeight: 1500,
    template:
      "Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a couple decorating a Christmas tree together. The first uploaded photo shows person A and the second uploaded photo shows person B; if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Dress them in modest coordinated festive outfits: a deep green knit polo or kurta for him and a deep red long-sleeve dress or kurti with a dupatta for her; keep any head covering. If group arrangement and pose are not preserved, show them standing side by side at the tree, one hanging a red bauble while the other holds a gold star ornament, both smiling at each other. Keep realistic relative heights and natural, modest, family-friendly body language. Light both with warm glow from the tree and soft window light so they look photographed together. Apply {{mood}} color grading. Use {{background}} as the backdrop. Do not add extra people or animals, text, lettering, watermarks, brand names, logos, characters, mascots, or licensed decorations; ornaments, gift wrap and clothing must be plain and unbranded, and any Santa hat is a plain generic red hat with white trim. Keep clothing modest and family-friendly. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "136",
    id: "christmas-baby-photoshoot-ai-prompt-gift-boxes",
    title: "Christmas Baby Photoshoot AI Prompt (Gift Boxes)",
    note: "Baby sitting among wrapped gift boxes beside a small tree",
    description:
      "A Christmas baby photoshoot AI prompt: your little one among red, green and gold gift boxes with ribbons beside a small decorated tree, same sweet face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Soft festive cream and red",
    background:
      "Bright cream studio set with a small decorated Christmas tree, stacked wrapped gift boxes with satin ribbons, and a soft white rug",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Wrapped gift boxes", "Small decorated tree", "Festive baby outfit", "Cozy studio set"],
    stays: ["Child's face and identity", "Skin tone", "Hair", "Apparent age"],
    height: 340,
    targetSourcePhoto: "One clear photo of a baby or toddler, face visible",
    bestSourcePhoto: ["One child, face clearly visible and sharp", "Taken at the child's eye level", "Soft daylight, no filters or stickers", "Original image should not be blurry"],
    altSource:
      "South Asian baby with wispy black hair in a white onesie, sitting on a bed with cream sheets.",
    altResult:
      "Realistic photo of the same baby in a red knit romper with white cuffs and white socks, sitting on a white fluffy rug with one hand on a gift box with a big red satin bow, among red, cream and gingham gift boxes beside a small decorated tree.",
    beforeFile: "christmas-baby-photoshoot-ai-prompt-gift-boxes-before.webp",
    afterFile: "christmas-baby-photoshoot-ai-prompt-gift-boxes-after.webp",
    resultWidth: 1200,
    resultHeight: 1500,
    template:
      "Edit the uploaded portrait into a sweet Christmas baby photoshoot. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a fully covered cozy red knit romper with white cuffs and soft socks. If pose is not preserved, seat the baby on a white rug between wrapped gift boxes, one hand resting on a big satin bow, smiling at the camera. Light the baby with soft, bright, even studio light with no harsh shadows. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people or animals, text, lettering, watermarks, brand names, logos, characters, mascots, or licensed decorations; ornaments, gift wrap and clothing must be plain and unbranded, and any Santa hat is a plain generic red hat with white trim. Keep clothing modest and family-friendly. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "137",
    id: "christmas-ai-photo-prompts-for-men-fireside-gifts",
    title: "Christmas AI Photo Prompts for Men (Fireside Gifts)",
    note: "Man by a fireplace with stockings and wrapped gifts",
    description:
      "A Christmas AI photo prompt for men: a smart, warm portrait by a stone fireplace with plain stockings, a decorated mantel and wrapped gifts.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Warm fireside amber",
    background:
      "Stone fireplace with a crackling fire, a garland mantel with plain red stockings, and wrapped gifts on the floor",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Fireplace and mantel", "Wrapped gifts", "Burgundy blazer outfit", "Relaxed seated pose"],
    stays: ["Face and identity", "Skin tone", "Hairstyle, beard or head covering", "Glasses if worn"],
    height: 340,
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "South Asian man with short hair greying at the temples and a salt-and-pepper beard in a navy button shirt, on a home balcony with plants.",
    altResult:
      "Realistic photo of the same man in a burgundy blazer over a cream top, seated in a brown leather armchair holding a small gift with a gold ribbon, beside a stone fireplace with a lit fire, red stockings and a garland mantel.",
    beforeFile: "christmas-ai-photo-prompts-for-men-fireside-gifts-before.webp",
    afterFile: "christmas-ai-photo-prompts-for-men-fireside-gifts-after.webp",
    resultWidth: 1200,
    resultHeight: 1500,
    template:
      "Edit the uploaded portrait into a warm, classy Christmas portrait by the fireplace. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a burgundy blazer over a plain cream crew-neck top and dark trousers, or a burgundy kurta with a dark waistcoat. If pose is not preserved, seat him in a leather armchair beside the fire holding a wrapped gift with a gold ribbon on his knee, smiling at the camera. Light him with warm firelight from one side and a soft fill light so his skin tone stays true. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people or animals, text, lettering, watermarks, brand names, logos, characters, mascots, or licensed decorations; ornaments, gift wrap and clothing must be plain and unbranded, and any Santa hat is a plain generic red hat with white trim. Keep clothing modest and family-friendly. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "138",
    id: "christmas-ai-photo-prompt-for-girls-ornament-tree",
    title: "Christmas AI Photo Prompt for Girls (Ornament Tree)",
    note: "Girl in red velvet beside a big ornament-covered tree",
    description:
      "A cute Christmas AI photo prompt for girls: a red velvet look beside a big tree covered in glass ornaments, holding one shiny bauble. Free to copy-paste.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Rich festive jewel tones",
    background:
      "Grand hallway with a huge Christmas tree covered in red, gold and silver glass ornaments and ribbon bows",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Huge ornament-covered tree", "Red velvet outfit", "Glass bauble in hand", "Elegant standing pose"],
    stays: ["Face and identity", "Skin tone", "Hairstyle, beard or head covering", "Glasses if worn"],
    height: 340,
    targetSourcePhoto: "One clear waist-up photo of a girl or woman",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "Young South Asian woman with long wavy dark hair in a cream t-shirt, standing by a bedroom window.",
    altResult:
      "Realistic photo of the same young woman in a red velvet long-sleeve dress, holding up a shiny gold bauble beside a huge tree covered in red, gold and silver ornaments and ribbon bows in a grand hallway with a staircase.",
    beforeFile: "christmas-ai-photo-prompt-for-girls-ornament-tree-before.webp",
    afterFile: "christmas-ai-photo-prompt-for-girls-ornament-tree-after.webp",
    resultWidth: 1200,
    resultHeight: 1490,
    template:
      "Edit the uploaded portrait into an elegant Christmas portrait beside an ornament-covered tree. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a modest red velvet long-sleeve midi dress, or a red velvet kurta with a gold-edged dupatta; keep any existing head covering. If pose is not preserved, show her standing next to the tree holding a shiny gold glass ornament up near her face, smiling softly at the camera. Light her with soft warm key light and sparkling reflections from the glass ornaments; do not use fairy lights as the main light. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people or animals, text, lettering, watermarks, brand names, logos, characters, mascots, or licensed decorations; ornaments, gift wrap and clothing must be plain and unbranded, and any Santa hat is a plain generic red hat with white trim. Keep clothing modest and family-friendly. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "139",
    id: "christmas-family-photoshoot-ai-prompt-tree-and-gifts",
    title: "Christmas Family Photoshoot AI Prompt (Tree and Gifts)",
    note: "Whole family gathered around the tree and a pile of gifts",
    description:
      "A Christmas family photoshoot AI prompt: turn one family photo into a warm portrait around a decorated tree with a pile of wrapped gifts.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    requirement: "One photo",
    mood: "Warm classic Christmas",
    background:
      "Warm living room with a large decorated Christmas tree, a pile of wrapped gifts and a red-and-green plaid throw on the sofa",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Decorated tree and gifts", "Festive living room", "Family grouped together", "Warm Christmas glow"],
    stays: ["Every face and identity", "Each skin tone and age", "Hairstyles, beards, head coverings", "Relative heights"],
    height: 340,
    targetSourcePhoto: "One family photo of 2–6 people with every face visible",
    bestSourcePhoto: ["Every face clearly visible in one photo", "Everyone facing the camera, not hidden behind others", "Even light on all faces", "Original image should not be blurry"],
    altSource:
      "South Asian family of four in a living room: a bearded father with glasses in a blue shirt, a mother in a teal kurti with a dupatta, a girl in a yellow t-shirt and a young boy in a green t-shirt.",
    altResult:
      "Realistic photo of the same family by a decorated Christmas tree: the father in a green sweater, the mother in a red kurti with a cream dupatta, the girl in a cream sweater and the boy in a red sweater, the children seated behind wrapped gifts, with a plaid throw on the sofa.",
    beforeFile: "christmas-family-photoshoot-ai-prompt-tree-and-gifts-before.webp",
    afterFile: "christmas-family-photoshoot-ai-prompt-tree-and-gifts-after.webp",
    resultWidth: 1200,
    resultHeight: 1490,
    template:
      "Edit the uploaded group photo into a warm Christmas family portrait. Use every person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep every person exactly recognizable as the matching person in the source: same face shape, features, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress everyone in modest coordinated red, green and cream festive outfits, keeping any head covering or dupatta. If group arrangement and pose are not preserved, arrange the family around the tree, adults standing behind, children sitting in front among the gifts, everyone smiling at the camera. Light everyone evenly with warm tree glow and soft room light. Apply {{mood}} color grading. Replace the background with {{background}}. Do not add extra people or animals, text, lettering, watermarks, brand names, logos, characters, mascots, or licensed decorations; ornaments, gift wrap and clothing must be plain and unbranded, and any Santa hat is a plain generic red hat with white trim. Keep clothing modest and family-friendly. Compose for {{ratio}} without cropping any face.",
  },
  {
    n: "140",
    id: "ai-christmas-photo-prompt-for-boys-with-candy-cane",
    title: "AI Christmas Photo Prompt for Boys with Candy Cane",
    note: "Playful boy portrait with giant candy canes and peppermint stripes",
    description:
      "An AI Christmas photo prompt for boys with candy cane: a fun, bright portrait leaning on a giant red-and-white candy cane, keeping your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Bright peppermint red and white",
    background:
      "Bright red-and-white peppermint-striped studio backdrop with giant candy canes and scattered wrapped candies",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Giant candy canes", "Peppermint-stripe backdrop", "Red and white outfit", "Playful pose"],
    stays: ["Face and identity", "Skin tone", "Hairstyle, beard or head covering", "Glasses if worn"],
    height: 340,
    targetSourcePhoto: "One clear waist-up photo of a boy or young man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "South Asian teenage boy with short straight black hair in a white t-shirt, grinning in a school courtyard.",
    altResult:
      "Studio photo of the same smiling teenage boy with short black hair in a red quarter-zip knit sweater and blue jeans, holding a small candy cane and leaning on a giant red-and-white candy cane, in front of a diagonal peppermint-striped backdrop with giant swirl lollipops and wrapped candies on fluffy white fake snow.",
    beforeFile: "ai-christmas-photo-prompt-for-boys-with-candy-cane-before.webp",
    afterFile: "ai-christmas-photo-prompt-for-boys-with-candy-cane-after.webp",
    resultWidth: 1200,
    resultHeight: 1500,
    template:
      "Edit the uploaded portrait into a fun, bright Christmas candy cane portrait. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a plain red knit polo or quarter-zip with white trim and dark jeans. If pose is not preserved, show him leaning on a giant candy cane taller than his shoulder, holding a small candy cane in his other hand, grinning at the camera. Light him with bright, even studio light and soft shine on the candy canes. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people or animals, text, lettering, watermarks, brand names, logos, characters, mascots, or licensed decorations; ornaments, gift wrap and clothing must be plain and unbranded, and any Santa hat is a plain generic red hat with white trim. Keep clothing modest and family-friendly. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "141",
    id: "ai-christmas-photo-prompt-for-couples-gift-exchange",
    title: "AI Christmas Photo Prompt for Couples (Gift Exchange)",
    note: "Couple exchanging wrapped gifts in front of the tree",
    description:
      "An AI Christmas photo prompt for couples, free to copy: two photos become a sweet gift-exchange moment by the tree, with both your faces kept.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    requirement: "Two photos",
    mood: "Soft romantic Christmas",
    background:
      "Cozy room with a decorated Christmas tree, wrapped gifts underneath, and warm candle lanterns on a side table",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 2,
    changes: ["Gift-exchange moment", "Decorated tree backdrop", "Cozy festive outfits", "Seated together"],
    stays: ["Both faces and identities", "Each skin tone and age", "Hairstyles, beards, head coverings", "Realistic relative heights"],
    height: 340,
    targetSourcePhoto: "Two clear photos (one per person) or one photo of you both",
    bestSourcePhoto: ["One clear photo per person, or one photo of you both", "Faces large and sharp", "Similar light in both photos", "Original images should not be blurry"],
    altSource:
      "Black man with short curly hair and a neat beard in an olive sweatshirt, smiling in a café.",
    altResult:
      "Realistic photo of the same couple sitting on a rug by a decorated tree, laughing as they pass a small gift with a red ribbon between them, he in a cream cable-knit cardigan, she in a burgundy dress and navy hijab, with candle lanterns and wrapped gifts behind.",
    altSecond:
      "South Asian woman in a navy hijab and beige long-sleeve top, smiling in a café.",
    beforeFile: "ai-christmas-photo-prompt-for-couples-gift-exchange-before.webp",
    afterFile: "ai-christmas-photo-prompt-for-couples-gift-exchange-after.webp",
    beforeBFile: "ai-christmas-photo-prompt-for-couples-gift-exchange-before-b.webp",
    resultWidth: 1200,
    resultHeight: 1500,
    template:
      "Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a couple exchanging Christmas gifts by the tree. The first uploaded photo shows person A and the second uploaded photo shows person B; if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Dress them in modest cozy outfits: a cream cable-knit cardigan over a shirt for him and a soft burgundy long-sleeve dress or kurti with a dupatta for her; keep any head covering. If group arrangement and pose are not preserved, seat them on a rug in front of the tree, one handing the other a small wrapped box with a red ribbon, both laughing. Keep realistic relative heights and natural, modest, family-friendly body language. Light both with warm lantern and tree glow so they look photographed together. Apply {{mood}} color grading. Use {{background}} as the backdrop. Do not add extra people or animals, text, lettering, watermarks, brand names, logos, characters, mascots, or licensed decorations; ornaments, gift wrap and clothing must be plain and unbranded, and any Santa hat is a plain generic red hat with white trim. Keep clothing modest and family-friendly. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "142",
    id: "fun-ai-christmas-photo-prompt-for-kids-santa-hat-cookies",
    title: "Fun AI Christmas Photo Prompt for Kids (Santa Hat Cookies)",
    note: "Kid in a Santa hat decorating gingerbread cookies",
    description:
      "A fun AI Christmas photo prompt for kids: your child in a plain Santa hat decorating gingerbread cookies in a festive kitchen, same happy face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Cheerful warm kitchen",
    background:
      "Festive home kitchen with a small tree on the counter, trays of gingerbread cookies, red-and-white candy canes in a jar and a window",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Plain Santa hat", "Gingerbread cookies", "Festive kitchen", "Playful messy pose"],
    stays: ["Child's face and identity", "Skin tone", "Hair", "Apparent age"],
    height: 340,
    targetSourcePhoto: "One clear photo of a young child, face visible",
    bestSourcePhoto: ["One child, face clearly visible and sharp", "Taken at the child's eye level", "Soft daylight, no filters or stickers", "Original image should not be blurry"],
    altSource:
      "South Asian girl, about six, with black hair in pigtails and a pink t-shirt, smiling at a kitchen table.",
    altResult:
      "Realistic photo of the same girl in a plain red Santa hat, green sweater and red apron, laughing with flour on her face as she pipes icing onto gingerbread cookies, with a jar of candy canes and a small tree on the kitchen counter.",
    beforeFile: "fun-ai-christmas-photo-prompt-for-kids-santa-hat-cookies-before.webp",
    afterFile: "fun-ai-christmas-photo-prompt-for-kids-santa-hat-cookies-after.webp",
    resultWidth: 1200,
    resultHeight: 1490,
    template:
      "Edit the uploaded portrait into a fun Christmas baking photo of a young child. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a fully covered cozy green top with a small plain apron and a plain red Santa hat with white trim. If pose is not preserved, show the child at the counter piping white icing onto a gingerbread cookie, a little flour on one cheek, laughing at the camera. Light the scene with warm, soft kitchen light and daylight from the window. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people or animals, text, lettering, watermarks, brand names, logos, characters, mascots, or licensed decorations; ornaments, gift wrap and clothing must be plain and unbranded, and any Santa hat is a plain generic red hat with white trim. Keep clothing modest and family-friendly. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "143",
    id: "viral-christmas-ai-photo-trend-prompt-giant-ornament",
    title: "Viral Christmas AI Photo Trend Prompt (Giant Ornament)",
    note: "Sitting inside a giant clear glass Christmas ornament",
    description:
      "The viral Christmas AI photo trend prompt: you sitting inside a giant clear glass ornament hanging from a tree branch, with your real face kept.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Magical gold and emerald",
    background:
      "Close-up of a huge pine branch with red and gold baubles and a soft blurred Christmas tree glow",
    ratio: "9:16 Story",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Inside a giant glass ornament", "Huge pine branch", "Festive outfit", "Miniature fantasy scale"],
    stays: ["Face and identity", "Skin tone", "Hairstyle, beard or head covering", "Glasses if worn"],
    height: 360,
    targetSourcePhoto: "One clear photo of a girl or woman, face fully visible",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "South Asian woman with a mustard dupatta over her hair and a white kurti, smiling on a city rooftop at dusk.",
    altResult:
      "Realistic miniature-style photo of the same woman in a green velvet outfit and mustard dupatta, sitting cross-legged inside a giant clear glass ornament hanging by a gold ribbon from a pine branch among red and gold baubles.",
    beforeFile: "viral-christmas-ai-photo-trend-prompt-giant-ornament-before.webp",
    afterFile: "viral-christmas-ai-photo-trend-prompt-giant-ornament-after.webp",
    resultWidth: 1200,
    resultHeight: 2150,
    template:
      "Edit the uploaded portrait into a magical miniature scene inside a giant clear glass Christmas ornament. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a modest emerald-green velvet long-sleeve dress or kurta with a gold dupatta; keep any existing head covering. If pose is not preserved, show her sitting inside the clear bauble with her knees tucked and hands resting on them, smiling at the camera through the glass, the ornament hanging from a pine branch by a gold cap and ribbon. Light her with warm golden glow and gentle reflections on the curved glass, keeping her face clear and undistorted. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people or animals, text, lettering, watermarks, brand names, logos, characters, mascots, or licensed decorations; ornaments, gift wrap and clothing must be plain and unbranded, and any Santa hat is a plain generic red hat with white trim. Keep clothing modest and family-friendly. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "144",
    id: "vintage-christmas-photo-ai-prompt-for-men-retro-film",
    title: "Vintage Christmas Photo AI Prompt for Men (Retro Film)",
    note: "1970s-style film snapshot by a tinsel tree and vintage gifts",
    description:
      "A vintage Christmas photo AI prompt for men: a warm 1970s film snapshot beside a tinsel tree with retro wrapped gifts and soft grain.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    requirement: "One photo",
    mood: "Faded 70s film",
    background:
      "Retro 1970s living room with wood paneling, a tinsel Christmas tree with big colored bulbs, and gifts in patterned paper",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: ["1970s film look", "Tinsel tree and big bulbs", "Retro outfit", "Vintage gifts"],
    stays: ["Face and identity", "Skin tone", "Hairstyle, beard or head covering", "Glasses if worn"],
    height: 340,
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: ["One person, face clearly visible and sharp", "Front or slight three-quarter angle works best", "Even daylight, no beauty filters", "Original image should not be blurry"],
    altSource:
      "White man with short brown hair and a greying beard in a charcoal sweater over a collared shirt, in a home study with bookshelves.",
    altResult:
      "Retro-style photo of the same man in a brown corduroy jacket and dark turtleneck, seated on a patterned 1970s sofa holding a gift in retro orange paper, beside a silver tinsel tree with big coloured bulbs and wood-panelled walls.",
    beforeFile: "vintage-christmas-photo-ai-prompt-for-men-retro-film-before.webp",
    afterFile: "vintage-christmas-photo-ai-prompt-for-men-retro-film-after.webp",
    resultWidth: 1200,
    resultHeight: 1500,
    template:
      "Edit the uploaded portrait into a vintage 1970s Christmas film snapshot. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a brown turtleneck with a plain corduroy jacket, or a mustard knit vest over a collared shirt. If pose is not preserved, show him sitting on a patterned sofa beside the tree holding a gift wrapped in retro patterned paper, smiling at the camera. Light him with on-camera flash and warm lamp light, then add a 1970s film look: soft grain, warm faded colors and slight vignette. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people or animals, text, lettering, watermarks, brand names, logos, characters, mascots, or licensed decorations; ornaments, gift wrap and clothing must be plain and unbranded, and any Santa hat is a plain generic red hat with white trim. Keep clothing modest and family-friendly. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "145",
    id: "ai-christmas-pet-photo-prompt-gift-box-surprise",
    title: "AI Christmas Pet Photo Prompt (Gift Box Surprise)",
    note: "Pet popping out of a wrapped gift box under the tree",
    description:
      "An AI Christmas pet photo prompt: your dog or cat peeking out of a big wrapped gift box under the tree, wearing a tiny plain red bow.",
    category: "Pets",
    subject: "Pet",
    intent: "Full scene transformation",
    requirement: "One photo",
    mood: "Cozy festive warm",
    background:
      "Under a decorated Christmas tree with wrapped gifts, red and gold ornaments and a soft plaid blanket",
    ratio: "1:1 Square",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 1,
    changes: ["Gift box surprise", "Under the tree", "Tiny red bow", "Festive warm light"],
    stays: ["Pet's breed and identity", "Fur color and markings", "Eye color", "Face shape"],
    height: 320,
    targetSourcePhoto: "One clear photo of your dog or cat with its face visible",
    bestSourcePhoto: ["One pet, face and eyes clearly visible", "Taken at the pet's eye level", "Even daylight, no filters", "Original image should not be blurry"],
    altSource:
      "Golden-brown mixed-breed dog with floppy ears and a white chest patch lying on a grey sofa.",
    altResult:
      "Realistic photo of the same dog with a red bow on its collar, paws resting on the edge of an open red gift box with a gold ribbon, under a decorated tree with wrapped gifts on a plaid blanket.",
    beforeFile: "ai-christmas-pet-photo-prompt-gift-box-surprise-before.webp",
    afterFile: "ai-christmas-pet-photo-prompt-gift-box-surprise-after.webp",
    resultWidth: 1200,
    resultHeight: 1200,
    template:
      "Edit the uploaded pet photo into a cute Christmas photo of a pet peeking out of a gift box. Use the main animal in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep it clearly the same animal: same breed, size, fur color and pattern, markings, eye color and face shape; do not turn it into a different pet or a cartoon. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If the original pose and composition are not preserved, show the pet popping its head and front paws out of an open red gift box with a gold ribbon, ears up and looking at the camera, wearing a tiny plain red bow on its collar. Light it with warm tree glow and soft fill light that shows fur texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around the fur. Do not add extra people or animals, text, lettering, watermarks, brand names, logos, characters, mascots, or licensed decorations; ornaments, gift wrap and clothing must be plain and unbranded, and any Santa hat is a plain generic red hat with white trim. Keep clothing modest and family-friendly. Compose for {{ratio}} without cropping the face or ears.",
  },
  {
    n: "146",
    id: "christmas-couple-photoshoot-ai-prompt-candy-cane-lane",
    title: "Christmas Couple Photoshoot AI Prompt (Candy Cane Lane)",
    note: "Couple walking past giant candy canes and wrapped gift displays",
    description:
      "A Christmas couple photoshoot AI prompt: two photos become a joyful walk down a festive lane lined with giant candy canes and gift-box displays.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    requirement: "Two photos",
    mood: "Festive red and green evening",
    background:
      "Festive outdoor lane at dusk lined with giant candy canes, oversized wrapped gift-box displays and decorated pine trees",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    inputImageCount: 2,
    changes: ["Candy cane lane", "Giant gift-box displays", "Coats and scarves", "Walking together"],
    stays: ["Both faces and identities", "Each skin tone and age", "Hairstyles, beards, head coverings", "Realistic relative heights"],
    height: 340,
    targetSourcePhoto: "Two clear photos (one per person) or one photo of you both",
    bestSourcePhoto: ["One clear photo per person, or one photo of you both", "Faces large and sharp", "Similar light in both photos", "Original images should not be blurry"],
    altSource:
      "South Asian man with wavy black hair, thin rimless glasses and light stubble in a maroon polo, smiling in a park.",
    altResult:
      "The same couple laughing as they walk hand in hand down a dry paved lane at dusk: the man with glasses in a camel coat and red scarf, the woman with straight black hair in a dark green coat and red scarf, between giant candy-cane arches, lit Christmas trees and wrapped gift displays.",
    altSecond:
      "East Asian woman with shoulder-length straight black hair in a grey long-sleeve top, smiling in a park.",
    beforeFile: "christmas-couple-photoshoot-ai-prompt-candy-cane-lane-before.webp",
    afterFile: "christmas-couple-photoshoot-ai-prompt-candy-cane-lane-after.webp",
    beforeBFile: "christmas-couple-photoshoot-ai-prompt-candy-cane-lane-before-b.webp",
    resultWidth: 1200,
    resultHeight: 1500,
    template:
      "Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a couple walking down a festive candy cane lane at dusk. The first uploaded photo shows person A and the second uploaded photo shows person B; if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Dress them in modest warm outing outfits: a camel coat with a red scarf for him and a long green coat with a red scarf or dupatta for her; keep any head covering. If group arrangement and pose are not preserved, show them walking hand in hand toward the camera, laughing, with a giant candy cane arch behind them. Keep realistic relative heights and natural, modest, family-friendly body language. Light both with warm display lights and soft dusk sky light; no snowfall. Apply {{mood}} color grading. Use {{background}} as the backdrop. Do not add extra people or animals, text, lettering, watermarks, brand names, logos, characters, mascots, or licensed decorations; ornaments, gift wrap and clothing must be plain and unbranded, and any Santa hat is a plain generic red hat with white trim. Keep clothing modest and family-friendly. Compose for {{ratio}} without cropping either face.",
  },
];

const categorySlug: Record<string, string> = {
  Cinematic: "cinematic",
  Pets: "pets",
};

function inputRoles(count: 1 | 2): string[] {
  return count === 2 ? ["first photo", "second photo"] : ["source photo"];
}

/**
 * Christmas AI photo prompts 135–146 (couples, kids, girls, boys, family, pet).
 * Couple styles (#1, #7, #12) store Photo 2 as source-<n>b.webp on a second
 * example pair that shares result-<n>.webp.
 */
export const seedChristmasStyles: CatalogStyle[] = christmas.map((item, index) => {
  const source = asset(`source-${item.n}.png`);
  const result = asset(`result-${item.n}.png`);
  const pixels = { resultWidth: item.resultWidth, resultHeight: item.resultHeight };
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
      inputImageRoles: inputRoles(item.inputImageCount),
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

export const christmasStyleIds = new Set(seedChristmasStyles.map((style) => style.id));

export const christmasCategorySlug = categorySlug;

/** Publish payload fields kept beside the seed so the standalone script stays in sync. */
export const christmasPublishRows = christmas.map((item, index) => ({
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
  resultWidth: item.resultWidth,
  resultHeight: item.resultHeight,
  variant: {
    id: `${item.id}-v1`,
    tool: "ChatGPT Image",
    mode: "Image edit / transform with uploaded photo",
    inputImageCount: item.inputImageCount,
    inputImageRoles: inputRoles(item.inputImageCount),
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

export const christmasOgAlt =
  "Realistic photo of a couple decorating a Christmas tree in a living room, he in a green kurta holding a gold star ornament, she in a deep red kurti and dupatta, with red and gold baubles on the tree.";

/** Stored on catalog-public assets. Before photos are AI-generated. */
export const christmasAssetProvenance = {
  source: "seed",
  licence: "catalog",
  modelRelease: false,
  notes:
    "Before photos are AI-generated, not real people or pets. The after image is an AI edit of those sources.",
} as const;
