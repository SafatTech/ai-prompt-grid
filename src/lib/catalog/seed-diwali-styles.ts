import type { CatalogStyle } from "./types";

const PUBLISHED_SUPABASE_URL = "https://rbmirzmppbytorbhncxj.supabase.co";

/**
 * Prefer Supabase catalog-public WebPs (uploaded by upload-diwali-assets / db:seed).
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

function evidence(
  n: string,
  altSource: string,
  altResult: string,
): CatalogStyle["examplePairs"] {
  const source = asset(`source-${n}.png`);
  const result = asset(`result-${n}.png`);
  return [
    { source, result, altSource, altResult },
    {
      source,
      result,
      altSource: `${altSource} (detail)`,
      altResult: `${altResult} (detail)`,
    },
  ];
}

type DiwaliSeed = {
  n: string;
  id: string;
  title: string;
  note: string;
  description: string;
  subject: CatalogStyle["subject"];
  intent: CatalogStyle["intent"];
  mood: string;
  background: string;
  template: string;
  changes: string[];
  stays: string[];
  height: number;
  keepClothing: boolean;
  keepPose: boolean;
  targetSourcePhoto: string;
  bestSourcePhoto: string[];
};

const diwali: DiwaliSeed[] = [
  {
    n: "36",
    id: "diya-lit-balcony",
    title: "Diya Balcony Couple AI Photo Prompt (Diwali)",
    note: "Elegant Diwali evening couple on a diya-lined balcony",
    description:
      "Gemini AI Diwali couple photo prompt: an elegant evening portrait on a diya-lined balcony, keeping both your faces. Copy-paste and create it free.",
    subject: "Group",
    intent: "New outfit or theme",
    mood: "Warm golden festive",
    background:
      "An elegant apartment balcony at Diwali night with rows of glowing clay diyas along the railing, warm string lights, and subtle distant fireworks",
    keepClothing: false,
    keepPose: true,
    changes: ["Outfit", "Background", "Lighting", "Festive decor"],
    stays: ["Both faces and identities", "Pose", "Natural skin texture", "Hairstyles"],
    height: 340,
    targetSourcePhoto: "Clear couple photo with both faces visible",
    bestSourcePhoto: [
      "Both faces clearly visible",
      "Standing or three-quarter framing",
      "Even facial lighting",
      "Original image should not be blurry",
    ],
    template: `Edit the uploaded {{subject}} into an elegant Diwali evening couple portrait. Use the people in the source image as the subjects and preserve each person's exact facial identity, face shape, eyes, nose, lips, natural skin tone, hairstyle, body proportions, and recognizable features. Do not blend, swap, beautify, lighten, or significantly alter either person's face.

Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress the woman in a deep maroon silk saree with a refined gold border and dress the man in an ivory kurta, keeping the styling realistic, elegant, and culturally appropriate. If pose is not preserved, arrange them standing naturally close together with relaxed affectionate body language.

Place the couple in {{background}}, integrating them naturally into the environment with realistic scale, perspective, depth, and believable interaction between the subjects and surrounding details.

Apply {{mood}} color grading and lighting while keeping both faces clearly visible, natural skin texture intact, realistic fabric detail, balanced highlights, and a polished photographic finish.

Do not add extra people, distorted hands, duplicated facial features, text, logos, or watermarks. Compose the final image for {{ratio}}, keeping both subjects clearly framed without awkwardly cropping faces, hands, or important outfit details.`,
  },
  {
    n: "37",
    id: "finishing-the-rangoli-together",
    title: "Rangoli Couple Diwali AI Photo Editing Prompt (Candid)",
    note: "Candid couple finishing a rangoli at the doorway",
    description:
      "Diwali couple AI photo editing prompt: a candid shot of you both finishing a rangoli at the doorway, made from your photos. Free for Gemini and ChatGPT.",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Warm candid festive",
    background:
      "The front entrance of a welcoming home during Diwali, with a vivid rangoli on the floor, small glowing diyas surrounding it, and warm light spilling naturally from the doorway",
    keepClothing: false,
    keepPose: false,
    changes: ["Outfit", "Pose", "Background", "Rangoli", "Lighting"],
    stays: ["Both faces and identities", "Age and body proportions", "Natural skin tone"],
    height: 335,
    targetSourcePhoto: "Clear couple photo with both faces readable",
    bestSourcePhoto: [
      "Both faces clearly visible",
      "Enough body visible for kneeling pose",
      "Natural expressions preferred",
      "Original image should not be blurry",
    ],
    template: `Edit the uploaded {{subject}} into a candid Diwali moment centered on the couple finishing a rangoli together. Preserve each person's exact facial identity, face shape, natural skin tone, hairstyle, age, body proportions, and recognizable features separately. Do not blend their features or make either person look different from the source.

Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, style the couple in coordinated festive clothing using marigold-yellow and teal accents with realistic South Asian fabrics and understated traditional detailing. If pose is not preserved, position them kneeling or crouching naturally together as they add the final colors to a rangoli, smiling or looking warmly toward each other rather than posing rigidly for the camera.

Place the couple in {{background}}, ensuring the rangoli, doorway, floor, diyas, and environmental details feel physically believable and naturally integrated around them.

Apply {{mood}} color grading and lighting. Keep the scene candid and photographic, with realistic skin texture, natural expressions, believable shadows, and enough sharpness on both faces while allowing gentle environmental depth.

Avoid an overly polished or artificial studio look. Do not add extra people, duplicated limbs, malformed hands, text, logos, or watermarks. Compose for {{ratio}} while keeping the couple, their interaction, and the rangoli clearly visible.`,
  },
  {
    n: "38",
    id: "first-diwali-as-a-married-couple",
    title: "First Diwali Married Couple AI Photo Prompt",
    note: "Newlywed Diwali portrait with bridal-inspired festive styling",
    description:
      "Diwali couple AI photo prompt for newlyweds: your first Diwali portrait with bridal-inspired festive styling, both faces kept real. Copy-paste free.",
    subject: "Group",
    intent: "New outfit or theme",
    mood: "Rich warm celebratory",
    background:
      "The entrance of an elegant home decorated for Diwali with marigold torans, a large colorful rangoli, dozens of glowing diyas, and delicate fairy lights above the doorway",
    keepClothing: false,
    keepPose: true,
    changes: ["Outfit", "Jewellery", "Background", "Lighting", "Decor"],
    stays: ["Both faces and identities", "Pose", "Natural skin texture", "Age"],
    height: 350,
    targetSourcePhoto: "Full-length or three-quarter couple portrait",
    bestSourcePhoto: [
      "Both faces clearly visible",
      "Enough body visible for outfit framing",
      "Even lighting on both people",
      "Original image should not be blurry",
    ],
    template: `Transform the uploaded {{subject}} into an elegant first-Diwali-as-a-married-couple portrait. Preserve both people's exact facial identities individually, including face shape, eyes, nose, lips, jawline, natural skin tone, skin texture, hairstyle, age, and body proportions. Do not beautify, lighten, smooth, merge, or replace either face.

Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, style the man in a cream-and-gold sherwani-inspired kurta with a light embroidered stole. Style the woman in a refined red bridal-inspired lehenga with delicate gold zari work, tasteful mehndi on both hands, a light maang tikka, and coordinated glass bangles. Keep the styling celebratory and newlywed-inspired without making it look like a wedding ceremony.

If pose is not preserved, arrange the couple standing close together in a natural full-length portrait with warm, relaxed newlywed chemistry and both bodies clearly visible.

Place them in {{background}}, integrating all decorations naturally with correct perspective, realistic depth, and believable interaction between the subjects and the environment.

Apply {{mood}} color grading and lighting while preserving true-to-source skin tones, realistic facial texture, detailed fabrics, natural shadows, and clear facial visibility.

Do not add extra people, excessive jewellery, distorted hands, text, logos, or watermarks. Compose the image for {{ratio}}, keeping both people sharp and avoiding awkward cropping of their heads, hands, footwear, or major outfit details.`,
  },
  {
    n: "39",
    id: "separate-photos-couple",
    title: "Merge Two Photos Diwali Couple AI Prompt (Sparkler)",
    note: "Merge two people into one cohesive Diwali sparkler portrait",
    description:
      "Diwali couple AI photo prompt that merges two separate photos into one sparkler portrait, so you can be together even when apart. Copy-paste for Gemini.",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Warm romantic festive",
    background:
      "A lamp-lit rooftop terrace at Diwali night with subtle diya illumination, warm ambient lights, and soft distant fireworks in the evening sky",
    keepClothing: false,
    keepPose: false,
    changes: ["Composite merge", "Outfit", "Pose", "Background", "Lighting"],
    stays: ["Each person's exact face from their source", "Skin tone", "Age", "Hairstyle"],
    height: 345,
    targetSourcePhoto: "Two clear individual portraits (or a couple photo) with readable faces",
    bestSourcePhoto: [
      "Each face clearly visible",
      "Similar camera height when possible",
      "Good lighting on skin",
      "Original images should not be blurry",
    ],
    template: `Use the uploaded source images to create one cohesive Diwali portrait of the {{subject}} together. Treat each uploaded person as a separate identity reference. Preserve Person A's exact face, hairstyle, skin tone, age, and recognizable features from their source image, and preserve Person B's exact face, hairstyle, skin tone, age, and recognizable features from their source image. Never blend, swap, average, or mix facial characteristics between them.

Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress both people in coordinated festive South Asian outfits that complement each other without looking identical. If pose is not preserved, place them naturally side by side holding individual sparklers with relaxed, affectionate body language, as though they were genuinely photographed together.

Place the couple in {{background}}. Match perspective, body scale, camera angle, depth of field, environmental reflections, and especially the direction and intensity of light across both people so the final image looks like one authentic photograph rather than two composited portraits.

Apply {{mood}} color grading and lighting consistently across both subjects. Maintain natural skin texture and true-to-source skin tones, and ensure neither person's face becomes more dominant, stylized, or altered than the other.

Do not create mismatched lighting, floating limbs, duplicated hands, extra people, facial blending, text, logos, or watermarks. Compose the merged portrait for {{ratio}}, keeping both people clearly visible and naturally balanced within the frame.`,
  },
  {
    n: "40",
    id: "fairy-light-portrait",
    title: "Fairy Light Diwali AI Photo Prompt for Girls",
    note: "Graceful Diwali night portrait with soft fairy-light glow",
    description:
      "Diwali AI photo prompt for girls: a graceful night portrait in soft fairy-light glow, turning one selfie into a festive picture. Free to copy-paste.",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Soft warm festive",
    background:
      "A dark Diwali-night setting filled with soft golden bokeh and subtle glowing fairy lights",
    keepClothing: false,
    keepPose: true,
    changes: ["Outfit", "Jewellery", "Background", "Lighting", "Props"],
    stays: ["Face and identity", "Pose", "Natural skin texture", "Hairstyle"],
    height: 330,
    targetSourcePhoto: "One clear frontal or three-quarter portrait",
    bestSourcePhoto: [
      "One visible face",
      "Good lighting on skin",
      "Hands visible if possible",
      "Original image should not be blurry",
    ],
    template: `Edit the uploaded {{subject}} into a graceful Diwali night portrait. Use the main person in the source image as the subject and preserve their exact facial identity, face shape, eyes, nose, lips, natural skin tone, hairstyle, age, body proportions, and recognizable features. Do not beautify, lighten, smooth, or replace the person's face.

Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress the subject in a pastel pink anarkali with refined silver embroidery and small elegant jhumkas. If pose is not preserved, place the subject in a soft portrait pose holding a strand of glowing fairy lights near the face with a calm, gentle expression.

Place the subject in {{background}}, integrating the lighting and surroundings naturally while keeping the person clearly separated from the background with realistic depth and clean edges around hair and clothing.

Apply {{mood}} color grading and lighting, with soft golden highlights, flattering facial illumination, realistic skin texture, delicate fabric detail, and a polished photographic finish.

Do not add extra people, distorted hands, duplicated features, text, logos, or watermarks. Compose the final image for {{ratio}} without awkwardly cropping the face, hands, fairy lights, or important outfit details.`,
  },
  {
    n: "41",
    id: "golden-hour-sparkler-shot",
    title: "Sparkler Diwali AI Photo Editing Prompt for Girls",
    note: "Festive dusk portrait holding a lit sparkler",
    description:
      "Diwali AI photo editing prompt for girls: a festive golden-hour portrait in an emerald lehenga holding a lit sparkler, keeping your real face. Copy-paste into Gemini free.",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm golden festive",
    background:
      "A Diwali courtyard at dusk lined with glowing diyas, marigold garlands, and a deepening evening sky",
    keepClothing: false,
    keepPose: false,
    changes: ["Outfit", "Pose", "Background", "Sparkler", "Lighting"],
    stays: ["Face and identity", "Natural skin tone", "Hairstyle", "Age"],
    height: 340,
    targetSourcePhoto: "Clear waist-up or full portrait",
    bestSourcePhoto: [
      "One visible face",
      "Hands visible for sparkler pose",
      "Good lighting on skin",
      "Original image should not be blurry",
    ],
    template: `Edit the uploaded {{subject}} into a festive Diwali portrait with a sparkler at dusk. Use the main person in the source image as the subject and preserve their exact face, natural skin tone, hairstyle, age, body proportions, and recognizable features. Do not lighten, smooth, or alter their identity.

Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress the subject in an emerald green silk lehenga with fine gold work, a sheer dupatta over one shoulder, and elegant gold bangles. If pose is not preserved, arrange the subject in a natural waist-up portrait holding a lit sparkler at arm's length with a soft confident smile.

Place the subject in {{background}}, ensuring the sparkler, festive decor, and environment feel naturally integrated with realistic perspective and believable depth.

Apply {{mood}} color grading and lighting, balancing warm sparkler glow and diya light on the face with realistic skin texture, crisp eyes, gentle background depth, and a polished photographic result.

Do not add extra people, text, logos, or watermarks. Avoid distorted hands, malformed sparklers, or artificial-looking flame effects. Compose for {{ratio}} while keeping the face, sparkler, and upper-body styling clearly visible.`,
  },
  {
    n: "42",
    id: "kurta-and-nehru-jacket-with-lanterns",
    title: "Kurta & Nehru Jacket Diwali AI Photo Prompt for Boys",
    note: "Stylish rooftop Diwali portrait with paper lanterns",
    description:
      "Diwali AI photo prompt for boys: a stylish rooftop portrait in kurta and Nehru jacket under paper lanterns, made from your selfie. Copy-paste, free.",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm evening festive",
    background:
      "A rooftop at Diwali evening with paper lanterns overhead, string lights, distant city lights, and faint fireworks in the background",
    keepClothing: false,
    keepPose: true,
    changes: ["Outfit", "Background", "Lighting", "Festive decor"],
    stays: ["Face and identity", "Pose", "Beard or stubble if present", "Hairstyle"],
    height: 335,
    targetSourcePhoto: "Clear standing or three-quarter portrait",
    bestSourcePhoto: [
      "One visible face",
      "Upper body visible for jacket framing",
      "Good lighting on skin",
      "Original image should not be blurry",
    ],
    template: `Edit the uploaded {{subject}} into a stylish Diwali portrait. Use the main person in the source image as the subject and preserve their exact face, beard or stubble if present, hairstyle, natural skin tone, age, body proportions, and recognizable features. Do not beautify, lighten, or significantly alter the face.

Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress the subject in a navy kurta with a mustard Nehru jacket, styled neatly and realistically. If pose is not preserved, place the subject in a relaxed confident standing pose with calm body language suitable for a festive portrait.

Place the subject in {{background}}, making sure the rooftop setting, lanterns, and distant city elements feel naturally connected to the person with believable perspective and depth.

Apply {{mood}} color grading and lighting, using warm evening illumination, realistic skin texture, refined clothing detail, and a polished photographic finish.

Do not add extra people, text, logos, or watermarks. Avoid awkward cropping, distorted hands, or unrealistic fabric rendering. Compose the final image for {{ratio}} while keeping the subject and festive styling clearly framed.`,
  },
  {
    n: "43",
    id: "candid-phuljhadi-moment",
    title: "Phuljhadi Diwali AI Photo Prompt (Candid Street Laugh)",
    note: "Spontaneous street-night sparkler laugh",
    description:
      "Diwali AI photo prompt free to copy: a spontaneous phuljhadi sparkler laugh on a festive street at night, made from your selfie in Gemini or ChatGPT.",
    subject: "Person",
    intent: "Full scene transformation",
    mood: "Warm candid festive",
    background:
      "A decorated residential lane at Diwali night with glowing diyas, string lights, soft smoke, and a lively festive atmosphere",
    keepClothing: false,
    keepPose: false,
    changes: ["Outfit", "Pose", "Background", "Sparkler action", "Atmosphere"],
    stays: ["Face and identity", "Natural skin tone", "Hairstyle", "Age"],
    height: 330,
    targetSourcePhoto: "Clear candid or portrait photo",
    bestSourcePhoto: [
      "One visible face",
      "Natural expression preferred",
      "Hands visible if possible",
      "Original image should not be blurry",
    ],
    template: `Edit the uploaded {{subject}} into a candid Diwali street-night portrait. Use the main person in the source image as the subject and preserve their exact facial identity, natural skin tone, hairstyle, age, body proportions, and recognizable features. Do not beautify, lighten, or replace the face.

Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress the subject in a white chikankari kurta with rolled sleeves, keeping the styling realistic and natural. If pose is not preserved, show the subject in a candid laughing moment while lighting or holding a phuljhadi, with natural movement and an unposed feel.

Place the subject in {{background}}, integrating the decorated lane, festive lights, and sparkler action naturally so the image feels like a real spontaneous photo.

Apply {{mood}} color grading and lighting, keeping realistic spark trails, gentle ambient glow, believable smoke drift, natural skin texture, and a subtle phone-camera candid feel rather than a studio look.

Do not add extra people, text, logos, or watermarks. Avoid distorted hands, broken sparkler shapes, or artificial-looking fire. Compose the final image for {{ratio}} while keeping the subject and phuljhadi clearly visible.`,
  },
  {
    n: "44",
    id: "family-lakshmi-puja-photo",
    title: "Family Puja Diwali AI Photo Prompt (Doorway)",
    note: "Warm family portrait at a decorated Lakshmi Puja entrance",
    description:
      "Diwali AI image prompt for the whole family: a warm portrait at a decorated puja entrance with diyas and rangoli, faces kept accurate. Free in Gemini.",
    subject: "Group",
    intent: "New outfit or theme",
    mood: "Warm joyful festive",
    background:
      "A home entrance decorated for Lakshmi Puja with marigold torans, a large rangoli, and glowing diyas placed at the family's feet",
    keepClothing: false,
    keepPose: true,
    changes: ["Outfits", "Background", "Decor", "Lighting"],
    stays: [
      "Every person's face and identity",
      "Age differences",
      "Height differences",
      "Pose",
      "Family resemblance",
    ],
    height: 355,
    targetSourcePhoto: "Clear family group photo with all faces visible",
    bestSourcePhoto: [
      "All faces clearly visible",
      "Group framed together",
      "Even lighting across people",
      "Original image should not be blurry",
    ],
    template: `Edit the uploaded {{subject}} into a warm Diwali family portrait. Use the people in the source image as the subjects and preserve every person's exact face, age, natural skin tone, height difference, body proportions, and family resemblance. Do not make anyone look older, younger, more alike, or different from the source.

Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress the family in coordinated festive outfits with tasteful red, gold, and cream tones while keeping the styling varied and natural for each person. If pose is not preserved, arrange the family in a relaxed group portrait pose with everyone standing or gathered naturally together and all faces clearly visible.

Place the group in {{background}}, integrating the rangoli, diyas, doorway decorations, and home setting in a realistic and respectful way while keeping the family as the clear focal point.

Apply {{mood}} color grading and lighting, with warm festive illumination, realistic skin texture, natural facial detail, believable shadows, and enough depth to keep all faces sharp and readable.

Do not add extra people, text, logos, or watermarks. Avoid distorted hands, duplicated faces, or merged facial features. Compose the final image for {{ratio}}, ensuring all family members are fully and clearly framed without awkward cropping.`,
  },
  {
    n: "45",
    id: "babys-first-diwali",
    title: "Baby's First Diwali AI Photo Prompt (Baby Boy & Girl)",
    note: "Soft baby's-first-Diwali portrait with safe festive styling",
    description:
      "Diwali AI photo editing prompt for a baby boy or girl: a soft first-Diwali portrait with safe, gentle festive styling from one photo. Free to copy.",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Soft warm dreamy",
    background:
      "A cozy Diwali portrait setting with marigold petals, soft cushions, and distant glowing diyas safely positioned far behind the baby",
    keepClothing: false,
    keepPose: true,
    changes: ["Outfit", "Background", "Props", "Lighting"],
    stays: ["Baby's face and identity", "Age", "Pose", "Natural skin tone"],
    height: 320,
    targetSourcePhoto: "Clear baby photo with face and body visible",
    bestSourcePhoto: [
      "Baby's face clearly visible",
      "Safe seated or supported pose",
      "Good soft lighting",
      "Original image should not be blurry",
    ],
    template: `Edit the uploaded {{subject}} into a soft and heartwarming baby's-first-Diwali portrait. Use the baby in the source image as the subject and preserve the baby's exact face, eyes, nose, lips, natural skin tone, hair, age, body proportions, and recognizable features. Do not beautify, lighten, smooth, age up, or alter the baby's identity.

Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress the baby in a tiny festive outfit suitable for the child's presentation, such as a yellow silk frock or a little cream kurta, keeping the styling simple, comfortable, and age-appropriate. If pose is not preserved, place the baby sitting naturally and safely on a soft cushion with a relaxed, cheerful expression.

Place the baby in {{background}}, keeping all festive objects safely away from the child and integrating flowers, lights, and decorative elements naturally without making the scene feel crowded.

Apply {{mood}} color grading and lighting with soft warm illumination, realistic skin texture, gentle highlights, delicate fabric detail, and dreamy but believable background depth.

Do not place open flames, sparklers, or unsafe objects within the baby's reach. Do not add extra people, text, logos, watermarks, distorted hands, or unrealistic facial features. Compose the final image for {{ratio}} while keeping the baby's face, hands, feet, and outfit comfortably within the frame.`,
  },
  {
    n: "46",
    id: "family-diwali-in-karachi-or-sindh",
    title: "Karachi Family Diwali AI Photo Prompt",
    note: "Joyful family portrait in a historic Karachi or Sindh courtyard",
    description:
      "Diwali AI photo editing prompt for families: a joyful group portrait in a historic Karachi or Sindh courtyard, with every face kept true. Copy-paste.",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Warm joyful festive",
    background:
      "The courtyard of a historic stone temple in Karachi or Sindh decorated with diyas, string lights, a rangoli at the family's feet, a box of mithai, and children's sparklers glowing safely nearby",
    keepClothing: false,
    keepPose: true,
    changes: ["Outfits", "Background", "Decor", "Lighting", "Atmosphere"],
    stays: [
      "Every person's face and identity",
      "Age differences",
      "Height differences",
      "Pose",
    ],
    height: 360,
    targetSourcePhoto: "Clear family group photo with all faces visible",
    bestSourcePhoto: [
      "All faces clearly visible",
      "Group framed together",
      "Even lighting across people",
      "Original image should not be blurry",
    ],
    template: `Edit the uploaded {{subject}} into a joyful Diwali family portrait set in Karachi or Sindh. Use all people in the source image as the subjects and preserve every person's exact face, age, natural skin tone, height difference, body proportions, and recognizable features. Keep each identity distinct and do not make family members look more alike than they do in the source.

Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress the family in bright festive shalwar kameez, kurtas, and saris with tasteful coordinated colors while keeping each person's outfit distinct and culturally appropriate. If pose is not preserved, arrange the family naturally together in a joyful candid group portrait with all faces clearly visible.

Place the family in {{background}}, integrating the historic stone architecture, rangoli, diyas, mithai, and festive surroundings naturally and respectfully.

Apply {{mood}} color grading and lighting with a warm evening glow, realistic skin tones, natural facial texture, balanced festive highlights, and enough depth to keep all family members readable.

Do not add extra people, alter ages, merge faces, distort hands, or create unsafe sparkler placement near children. Do not add text, logos, or watermarks. Compose the final image for {{ratio}} while keeping the entire family comfortably framed.`,
  },
  {
    n: "47",
    id: "diaspora-diwali-in-a-cold-city",
    title: "Diwali Abroad AI Photo Prompt (Winter Coats)",
    note: "Cozy Diwali abroad with festive wear under wool coats",
    description:
      "Diwali AI photo prompt for celebrating abroad: festive wear under wool coats on a cold city street, built from your own photo. Free for Gemini.",
    subject: "Group",
    intent: "New outfit or theme",
    mood: "Cozy warm winter festive",
    background:
      "A cold-city residential street at Diwali night with terraced houses, fairy lights glowing in the windows, diyas on the front steps, warm light from an open doorway, and subtle fireworks over the rooftops",
    keepClothing: false,
    keepPose: true,
    changes: ["Outfit layering", "Background", "Lighting", "Cold-weather atmosphere"],
    stays: ["Both faces and identities", "Pose", "Expressions", "Natural skin tone"],
    height: 345,
    targetSourcePhoto: "Clear couple or small-group photo with faces visible",
    bestSourcePhoto: [
      "All faces clearly visible",
      "Standing pose preferred",
      "Even facial lighting",
      "Original image should not be blurry",
    ],
    template: `Edit the uploaded {{subject}} into a cozy Diwali-night portrait celebrating abroad in a cold city. Use the people in the source image as the subjects and preserve each person's exact face, natural skin tone, expression, hairstyle, age, body proportions, and recognizable features. Do not beautify, lighten, smooth, or replace either person's identity.

Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress the subjects in festive kurtas and a saree layered naturally under warm wool coats, scarves, or other cold-weather outerwear. If pose is not preserved, arrange them standing close together in a relaxed, affectionate pose suitable for a chilly evening portrait.

Place the subjects in {{background}}, integrating the terraced houses, doorway lighting, cold-weather atmosphere, and festive decorations naturally so the scene feels like a real Diwali celebration abroad.

Apply {{mood}} color grading and lighting, balancing cool outdoor evening tones with warm light from nearby windows and the open doorway. Keep realistic skin texture, believable cold-weather clothing, subtle misty breath if appropriate, and natural depth.

Do not add extra people, text, logos, or watermarks. Avoid artificial snow unless implied by the selected background, exaggerated breath effects, or unrealistic fireworks placement. Compose the final image for {{ratio}} without awkwardly cropping faces, coats, hands, or important festive details.`,
  },
];

/**
 * Diwali person/group templates 36–47 from diwali photo edit prompts/Diwali Templates.md
 * Images render from Supabase catalog-public (seed/catalog/editorial/*.webp).
 */
const seedDiwaliLegacyStyles: CatalogStyle[] = diwali.map((item, index) => ({
  id: item.id,
  title: item.title,
  category: "Fantasy",
  subject: item.subject,
  intent: item.intent,
  requirement: "One photo",
  tool: "ChatGPT Image",
  note: item.note,
  height: item.height,
  saved: 50 - index,
  source: asset(`source-${item.n}.png`),
  result: asset(`result-${item.n}.png`),
  status: "published",
  targetSourcePhoto: item.targetSourcePhoto,
  description: item.description,
  bestSourcePhoto: item.bestSourcePhoto,
  changes: item.changes,
  stays: item.stays,
  examplePairs: evidence(
    item.n,
    `Source for ${item.title}`,
    `${item.title} result`,
  ),
  promptVariant: {
    id: `${item.id}-v1`,
    version: "1.0.0",
    tool: "ChatGPT Image",
    mode: "Image edit / transform with uploaded photo",
    inputImageCount: 1,
    inputImageRoles: ["source photo"],
    template: item.template,
    defaults: {
      mood: item.mood,
      background: item.background,
      ratio: "4:5 Portrait",
      keepClothing: item.keepClothing,
      keepPose: item.keepPose,
    },
    lastVerified: "2026-10-05",
    limitations: [
      "Heavy face occlusion can weaken identity fidelity",
      "Very tight crops leave little room for festive outfit and decor framing",
    ],
  },
}));

type DiwaliAddonSeed = {
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
  /** Schema ratios only: "3:2 Landscape" from draft maps to "4:5 Portrait". */
  ratio: "4:5 Portrait" | "9:16 Story";
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

function resultDims(ratio: DiwaliAddonSeed["ratio"]): {
  resultWidth: number;
  resultHeight: number;
} {
  if (ratio === "9:16 Story") return { resultWidth: 941, resultHeight: 1672 };
  return { resultWidth: 1200, resultHeight: 1489 };
}

const diwaliAddon: DiwaliAddonSeed[] = [
  {
    n: "250",
    id: "diwali-couple-poses-diya-doorway",
    title: "Diwali Couple Poses Prompt at a Diya Doorway",
    note: "Back-to-back couple pose in a garlanded doorway with diyas at their feet",
    description:
      "A Diwali couple poses prompt: stand back-to-back in a marigold-garlanded doorway with rows of diyas at your feet. Copy-paste free, keeps both real faces.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Warm golden festive",
    background:
      "A carved wooden doorway framed by hanging marigold garlands, with a neat row of glowing clay diyas along the threshold at the couple's feet and soft warm light from inside",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 2,
    changes: [
      "Back-to-back couple pose",
      "Garlanded doorway",
      "Diyas at their feet",
      "Festive outfits",
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
    altSource:
      "AI-generated source portrait for Diwali Couple Poses Prompt at a Diya Doorway.",
    altResult: "AI edit created with Diwali Couple Poses Prompt at a Diya Doorway.",
    altSecond:
      "Second AI-generated source portrait for Diwali Couple Poses Prompt at a Diya Doorway.",
    template:
      "Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a Diwali couple pose at a diya-lit doorway. The first uploaded photo shows person A and the second uploaded photo shows person B; if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress person A in a modest festive lehenga choli or silk saree with full blouse, or an embroidered kurta set with a dupatta, in maroon, gold or emerald, and person B in an ivory or deep-blue kurta with churidar or straight trousers; keep any head covering or dupatta. If group arrangement and pose are not preserved, show them standing back-to-back in the doorway, shoulders lightly touching, both turning their heads toward the camera with warm smiles, full upper bodies visible at realistic relative heights, the row of diyas glowing at their feet. Keep natural, modest, family-friendly body language. Light both with the same warm diya glow from below and soft interior light from the doorway so they look photographed together. Apply {{mood}} color grading. Use {{background}} as the backdrop. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, festive, and unbranded. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "251",
    id: "diwali-couple-instagram-fireworks",
    title: "Diwali Couple Instagram Prompt (Rooftop Fireworks)",
    note: "Instagram-ready rooftop couple under a soft bokeh fireworks sky",
    description:
      "A Diwali prompt for couple Instagram posts: a rooftop night portrait under soft bokeh fireworks in a 4:5 feed crop. Copy-paste free, keeps both faces.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Warm romantic festive",
    background:
      "An open city rooftop at Diwali night with a soft out-of-focus fireworks sky in gold and pink, warm string lights along the parapet and distant lit homes",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 2,
    changes: [
      "Rooftop night scene",
      "Bokeh fireworks sky",
      "Instagram 4:5 framing",
      "Festive outfits",
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
    altSource:
      "AI-generated source portrait for Diwali Couple Instagram Prompt (Rooftop Fireworks).",
    altResult: "AI edit created with Diwali Couple Instagram Prompt (Rooftop Fireworks).",
    altSecond:
      "Second AI-generated source portrait for Diwali Couple Instagram Prompt (Rooftop Fireworks).",
    template:
      "Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: an Instagram-ready Diwali night portrait of a couple on a rooftop. The first uploaded photo shows person A and the second uploaded photo shows person B; if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress person A in a modest festive anarkali or silk saree with full blouse and a light dupatta in rose, wine or gold, and person B in a black, navy or maroon kurta with a plain shawl; keep any head covering or dupatta. If group arrangement and pose are not preserved, show them standing side by side at the parapet, person A's hand lightly on person B's arm, both looking up toward the fireworks with joyful smiles while their faces stay clearly visible, waist-up framing, at realistic relative heights; no sparklers in hand. Keep natural, modest, family-friendly body language. Light both with warm string-light glow on the faces and soft colourful fireworks bokeh behind so they look photographed together. Apply {{mood}} color grading. Use {{background}} as the backdrop. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, festive, and unbranded. Compose for {{ratio}} without cropping either face.",
  },
  {
    n: "252",
    id: "diwali-girl-aesthetic-diya",
    title: "Aesthetic Diwali Girl Prompt with Diya Tray",
    note: "Dreamy window-side portrait of a girl holding a brass diya tray",
    description:
      "A Diwali prompt for a girl aesthetic look: seated by a window with a glowing diya tray, pastel anarkali and dreamy warm tones. Copy-paste free, keeps your face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Soft warm festive",
    background:
      "A softly lit window nook at Diwali dusk with sheer curtains, a few diyas on the sill and blurred warm lights outside",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Pastel anarkali look",
      "Holding a diya tray",
      "Window-side seated pose",
      "Dreamy warm tones",
    ],
    stays: ["Face and identity", "Skin tone", "Hairstyle and head covering", "Glasses if worn"],
    targetSourcePhoto: "One clear chest-up or waist-up photo of a girl or young woman",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even light, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource: "AI-generated source portrait for Aesthetic Diwali Girl Prompt with Diya Tray.",
    altResult: "AI edit created with Aesthetic Diwali Girl Prompt with Diya Tray.",
    template:
      "Edit the uploaded portrait into a dreamy aesthetic Diwali portrait of a girl by a window. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress her in a modest pastel anarkali (peach, blush or mint) with full sleeves and a sheer dupatta draped over one shoulder, simple jhumka earrings; keep any existing head covering. If pose is not preserved, show her seated by the window, holding a small brass tray of three glowing diyas at chest height in both hands, head slightly tilted, soft closed-mouth smile toward the camera. Light her face with the warm glow of the diyas and soft diffused window light; keep tones dreamy, gentle and slightly hazy. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, festive, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "253",
    id: "diwali-women-marigold-portrait",
    title: "Diwali AI Photo Editing Prompt for Women (Marigold)",
    note: "Editorial half-body portrait against hanging marigold strings",
    description:
      "A Diwali AI photo editing prompt for women: an editorial half-body portrait against strings of marigolds in soft studio light. Copy-paste free, keeps your face.",
    category: "Professional portraits",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm festive red and gold",
    background:
      "A studio backdrop of hanging marigold flower strings in orange and yellow, softly out of focus, with a warm cream wall behind",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Editorial half-body crop",
      "Marigold-string backdrop",
      "Festive saree or shalwar suit",
      "Soft studio light",
    ],
    stays: ["Face and identity", "Skin tone", "Hairstyle and head covering", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult woman",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even light, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Diwali AI Photo Editing Prompt for Women (Marigold).",
    altResult: "AI edit created with Diwali AI Photo Editing Prompt for Women (Marigold).",
    template:
      "Edit the uploaded portrait into an editorial Diwali portrait of a woman against hanging marigold strings. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress her in a modest silk saree with a full-sleeve or elbow-sleeve blouse, or an embroidered shalwar kameez with dupatta, in red, mustard or gold, with small gold earrings; keep any existing head covering. If pose is not preserved, show her half-body, shoulders angled slightly, one hand lightly holding the edge of her dupatta or pallu, calm confident smile toward the camera. Light her with soft studio key light and gentle warm fill so the skin tone stays true and the fabric shows texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, festive, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "254",
    id: "diwali-men-kurta-portrait",
    title: "Diwali Kurta Photo Prompt for Men (Jhoola Portrait)",
    note: "Seated ivory kurta and shawl on a carved jhoola with brass lamps",
    description:
      "A Diwali kurta prompt for men: ivory kurta and shawl, seated on a carved wooden jhoola with glowing brass lamps behind. Copy-paste free, keeps your real face.",
    category: "Professional portraits",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm evening festive",
    background:
      "A traditional home interior at Diwali evening with a carved wooden jhoola, tall glowing brass oil lamps behind and soft marigold accents",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Ivory kurta and shawl",
      "Seated on a carved jhoola",
      "Brass lamp glow",
      "Classic festive portrait",
    ],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even light, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Diwali Kurta Photo Prompt for Men (Jhoola Portrait).",
    altResult: "AI edit created with Diwali Kurta Photo Prompt for Men (Jhoola Portrait).",
    template:
      "Edit the uploaded portrait into a classic Diwali kurta portrait of a man seated on a carved jhoola. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress him in a plain ivory or cream kurta with churidar, a woven shawl draped over one shoulder, simple leather juttis; no jacket; keep any existing head covering. If pose is not preserved, show him seated on the jhoola, one hand resting on the chain or armrest, upright relaxed posture, looking at the camera with a warm calm smile, three-quarter body in frame. Light him with warm brass-lamp glow from behind and a soft key light on the face. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, festive, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "255",
    id: "diwali-boy-instagram-portrait",
    title: "Diwali Boy Instagram Prompt (Fairy-Light Reel Cover)",
    note: "Vertical black-kurta reel cover with fairy-light curtain bokeh",
    description:
      "A Diwali prompt for boy Instagram reels: black kurta, fairy-light curtain bokeh and a confident half-smile in a vertical 9:16 cover. Copy-paste free.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm golden festive",
    background:
      "A curtain of warm fairy lights hanging behind, melting into large golden bokeh, with a dark festive night backdrop",
    ratio: "9:16 Story",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Black kurta look",
      "Fairy-light curtain bokeh",
      "Vertical reel framing",
      "Confident half-smile",
    ],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear chest-up or waist-up photo of a boy or young man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even light, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Diwali Boy Instagram Prompt (Fairy-Light Reel Cover).",
    altResult: "AI edit created with Diwali Boy Instagram Prompt (Fairy-Light Reel Cover).",
    template:
      "Edit the uploaded portrait into a vertical Instagram reel-cover Diwali portrait of a boy. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress him in a plain black kurta with subtle self-thread embroidery at the collar and white churidar or trousers; no jacket; keep any existing head covering. If pose is not preserved, show him standing waist-up in the centre of the frame, slight three-quarter turn, one hand adjusting his sleeve cuff, confident half-smile toward the camera, leaving clear space above the head for a vertical crop. Light him with warm fairy-light glow and a soft rim light on hair and shoulders. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, festive, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "256",
    id: "diwali-men-crackers-celebration",
    title: "Diwali Celebration Prompt for Men (Courtyard Sparkler)",
    note: "Safe courtyard celebration with a phuljhari held at arm's length",
    description:
      "A Diwali celebration prompt for men: a lit courtyard, a phuljhari held safely at arm's length and soft motion-blur sparks. Copy-paste free, keeps your real face.",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    mood: "Warm joyful festive",
    background:
      "A lit home courtyard at Diwali night with diyas along the walls, string lights overhead and a ground chakri spinning safely far in the background",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Safe sparkler moment",
      "Courtyard celebration",
      "Motion-blur sparks",
      "Festive kurta",
    ],
    stays: ["Face and identity", "Skin tone", "Hair and beard", "Glasses if worn"],
    targetSourcePhoto: "One clear waist-up photo of an adult man",
    bestSourcePhoto: [
      "One person, face clearly visible and sharp",
      "Front or slight three-quarter angle works best",
      "Even light, no beauty filters",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Diwali Celebration Prompt for Men (Courtyard Sparkler).",
    altResult: "AI edit created with Diwali Celebration Prompt for Men (Courtyard Sparkler).",
    template:
      "Edit the uploaded portrait into a joyful, family-safe Diwali celebration portrait of a man in a home courtyard. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, bindi, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress him in a modest festive kurta in maroon, mustard or bottle green with churidar and a light shawl; keep any existing head covering. If pose is not preserved, show him standing in the courtyard holding one lit phuljhari (hand sparkler) at full arm's length away from his face and clothes, sparks drifting down and away, laughing toward the camera; no other fireworks in his hands and nothing lit near his body. Light him with the sparkler's warm glow and soft diya light, with gentle motion-blur trails on the sparks only while his face stays sharp. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, festive, and unbranded. Compose for {{ratio}} without cropping important facial features.",
  },
  {
    n: "257",
    id: "diwali-family-courtyard-group",
    title: "Diwali Family Photo Prompt (Courtyard Steps, Adults)",
    note: "Grown family posed in tiers on haveli courtyard steps",
    description:
      "A Diwali family photo prompt for 4 to 6 adults: parents and grown children posed on haveli courtyard steps with diyas and a rangoli border. Copy-paste free.",
    category: "Professional portraits",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Warm joyful festive",
    background:
      "Wide stone steps of an old haveli courtyard at Diwali evening, diyas on every step edge, a simple rangoli border at the base and carved arches behind",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Tiered step arrangement",
      "Haveli courtyard steps",
      "Coordinated festive wear",
      "Diya-lit evening",
    ],
    stays: [
      "Every face and identity",
      "Ages and height differences",
      "Skin tones",
      "Head coverings and glasses",
    ],
    targetSourcePhoto: "One clear group photo of 4 to 6 adults with every face visible",
    bestSourcePhoto: [
      "All faces clearly visible and sharp",
      "Everyone framed together, 4 to 6 adults",
      "Even light across all faces",
      "Original image should not be blurry",
    ],
    altSource:
      "AI-generated source portrait for Diwali Family Photo Prompt (Courtyard Steps, Adults).",
    altResult: "AI edit created with Diwali Family Photo Prompt (Courtyard Steps, Adults).",
    template:
      "Edit the uploaded {{subject}} photo into a formal Diwali family portrait of grown-up family members on courtyard steps. Use every person in the source image as part of the group. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep every person exactly recognizable: same face shape, features, hairstyle, hair color, any beard, glasses, bindi, or head covering, apparent age, height difference, and exact skin tone; do not blend, swap, lighten, de-age, age up, or make anyone look more alike. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and enough depth of field to keep every face sharp. If clothing is not preserved, dress everyone in coordinated but varied modest festive wear in cream, maroon and gold: kurtas with churidar or shawls for the men, sarees with full blouses or salwar kameez with dupattas for the women; keep every head covering. If group arrangement and pose are not preserved, arrange the parents seated on the middle step and the grown children standing or seated on the steps beside and behind them in tiers, everyone facing the camera with warm smiles, no faces hidden. Light everyone evenly with warm diya glow and soft evening fill so all faces stay sharp and readable. Apply {{mood}} color grading. Use {{background}} as the setting, keeping the family as the clear focal point. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, festive, and unbranded. Compose for {{ratio}} with every face fully in frame.",
  },
  {
    n: "258",
    id: "diwali-family-dinner-table",
    title: "Diwali Family Dinner Table AI Photo Prompt",
    note: "Candid laughing family around a festive thali dinner table",
    description:
      "A Diwali family dinner photo prompt: a candid, laughing group around a table of thalis and mithai under string lights. Copy-paste free, keeps every real face.",
    category: "Cinematic",
    subject: "Group",
    intent: "Full scene transformation",
    mood: "Cozy festive warm",
    background:
      "A family dining room at Diwali night with a long table of brass thalis, mithai and diyas, warm string lights overhead and marigold garlands on the wall",
    // Draft used "3:2 Landscape"; schema only allows 4:5 / 1:1 / 9:16.
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    inputImageCount: 1,
    changes: [
      "Candid dinner moment",
      "Thali-laden table",
      "String lights overhead",
      "Festive outfits",
    ],
    stays: [
      "Every face and identity",
      "Ages and height differences",
      "Skin tones",
      "Head coverings and glasses",
    ],
    targetSourcePhoto: "One clear group photo of the family with every face visible",
    bestSourcePhoto: [
      "All faces clearly visible and sharp",
      "Everyone framed together, 4 to 6 adults",
      "Even light across all faces",
      "Original image should not be blurry",
    ],
    altSource: "AI-generated source portrait for Diwali Family Dinner Table AI Photo Prompt.",
    altResult: "AI edit created with Diwali Family Dinner Table AI Photo Prompt.",
    template:
      "Edit the uploaded {{subject}} photo into a candid Diwali family dinner scene. Use every person in the source image as part of the group. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep every person exactly recognizable: same face shape, features, hairstyle, hair color, any beard, glasses, bindi, or head covering, apparent age, height difference, and exact skin tone; do not blend, swap, lighten, de-age, age up, or make anyone look more alike. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and enough depth of field to keep every face sharp. If clothing is not preserved, dress everyone in modest, comfortable festive wear: kurtas for the men and salwar kameez, kurta sets or sarees with full blouses for the women, in warm jewel tones; keep every head covering. If group arrangement and pose are not preserved, seat everyone around the dinner table, passing dishes and laughing naturally, all faces turned at least three-quarter toward the camera and none hidden behind others or food. Light the scene with warm string lights and diya glow on the table, soft and even across all faces. Apply {{mood}} color grading. Use {{background}} as the setting, keeping the family as the clear focal point. Show natural hands with five fingers each. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, deities, or licensed decorations; keep clothing modest, festive, and unbranded. Compose for {{ratio}} with every face fully in frame.",
  },
];

/** 9 Diwali guide add-on styles numbered 250–258 (images already in catalog-public). */
const seedDiwaliAddonStyles: CatalogStyle[] = diwaliAddon.map((item, index) => {
  const source = asset(`source-${item.n}.webp`);
  const result = asset(`result-${item.n}.webp`);
  const dims = resultDims(item.ratio);
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
    saved: 21 - index,
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
      lastVerified: "2026-10-30",
      limitations: [aiGeneratedLimit, faceOcclusionLimit],
    },
  };
});

export const seedDiwaliStyles: CatalogStyle[] = [
  ...seedDiwaliLegacyStyles,
  ...seedDiwaliAddonStyles,
];

export const diwaliAddonStyleIds = new Set(seedDiwaliAddonStyles.map((style) => style.id));
