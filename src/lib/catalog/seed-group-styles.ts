import type { CatalogStyle } from "./types";

const asset = (name: string) => `/catalog/group/${name}`;

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

/** Group preserve: identities ON; arrangement ON unless noted. */
const bothOn = { keepClothing: true, keepPose: true } as const;
const identitiesOnly = { keepClothing: true, keepPose: false } as const;

type GroupSeed = {
  n: string;
  id: string;
  title: string;
  category: string;
  note: string;
  description: string;
  intent: CatalogStyle["intent"];
  mood: string;
  background: string;
  template: string;
  changes: string[];
  height: number;
  preserve: { keepClothing: boolean; keepPose: boolean };
};

const groups: GroupSeed[] = [
  {
    n: "01",
    id: "after-hours-polaroid",
    title: "After Hours Polaroid",
    category: "Vintage",
    note: "Candid instant-film evening friends photo",
    description:
      "Turn a group photo into a candid after-hours instant-film look with warm nostalgia, soft grain, and city-light bokeh.",
    intent: "Artistic restyle",
    mood: "Warm nostalgic",
    background: "Evening city lights with soft distant bokeh",
    changes: ["Film texture", "Lighting", "Background", "Color mood"],
    height: 350,
    preserve: bothOn,
    template: `Transform the uploaded {{subject}} into a candid after-hours instant-film photograph while preserving {{preserve}}.
Keep every person recognizable and natural, with realistic facial proportions, consistent skin tone, authentic hair details, and believable interaction between group members. Maintain the spontaneous feeling of a real friends photo rather than making the scene look like a formal studio portrait.
Apply a {{mood}} color treatment inspired by vintage instant-film photography, using gently warm skin tones, slightly muted colors, subtle highlight blooming, soft contrast, delicate film grain, faint analog noise, and minor imperfections associated with older consumer cameras. Avoid excessive filters, artificial skin smoothing, plastic-looking faces, or exaggerated vintage damage.
Rebuild the surrounding environment according to {{background}}, keeping the scene believable and naturally integrated around the group. Use a softly blurred background with small practical light sources or distant environmental lights where appropriate, creating subtle circular bokeh and atmospheric depth without distracting from the people.
Use the visual character of a compact analog camera with a slightly imperfect candid exposure, gentle edge softness, fine grain, subtle lens falloff, and restrained direct-flash influence. Faces should remain clear and well exposed while the environment can fall naturally into softer focus.
Preserve believable body anatomy, hands, fingers, eyewear, hairstyles, clothing structure, facial expressions, and the exact number of people. Do not merge faces, duplicate people, remove group members, create additional people, or significantly alter anyone's apparent identity.
Compose the final image for {{ratio}}, keeping the entire group balanced in the frame and avoiding awkward cropping of important faces or hands. The result should resemble a genuine scanned instant-film photograph captured during a relaxed evening with friends, but without adding a physical Polaroid frame or white border.
Do not add text, dates, captions, logos, watermarks, UI elements, decorative frames, or artificial borders.`,
  },
  {
    n: "02",
    id: "90s-yearbook-crew",
    title: "90s Yearbook Crew",
    category: "Vintage",
    note: "Coordinated 1990s school yearbook portrait",
    description:
      "Restyle a group into a classic 1990s yearbook portrait with coordinated retro casual clothing and soft flash lighting.",
    intent: "New outfit or theme",
    mood: "Soft nostalgic",
    background: "Classic mottled studio backdrop",
    changes: ["Outfit styling", "Background", "Lighting", "Print texture"],
    height: 345,
    preserve: bothOn,
    template: `Transform the uploaded {{subject}} into a coordinated 1990s school yearbook-style group portrait while preserving {{preserve}}.
Keep every person clearly recognizable, with natural facial proportions, authentic expressions, consistent skin tone, realistic hair texture, and the exact same number of people. Maintain a believable group connection and a friendly posed portrait feeling rather than an action scene.
Restyle the group with a classic 1990s yearbook aesthetic: coordinated retro casual clothing, knit sweaters, denim, striped layers, collared shirts, simple school-picture styling, softly groomed hair, and a clean, wholesome academic portrait vibe. The wardrobe should feel era-appropriate and visually coordinated without looking like costumes.
Apply {{mood}} color grading with soft flash lighting, gentle contrast, slightly muted tones, subtle warmth, light print fading, and a nostalgic analog-photo character. Add delicate film grain, mild texture, and a faint printed-photo softness so the result feels like a real scanned yearbook portrait from the 1990s.
Build the scene from {{background}}, interpreted as a traditional school-photo or yearbook portrait setup with a simple mottled or softly blended studio backdrop. Keep the background clean, understated, and non-distracting so the group remains the focus.
Preserve believable anatomy, hands, fingers, eyewear, hairstyles, facial structure, and spacing between group members. Do not merge faces, duplicate people, remove anyone, add extra people, or distort limbs. Keep the composition balanced and portrait-like.
Compose for {{ratio}}, making sure all faces are comfortably framed and the group feels centered, neat, and naturally arranged. The result should look like an authentic 1990s yearbook group photo with subtle retro styling, soft studio lighting, and genuine printed-photo texture.
Do not add text, school names, dates, logos, watermarks, decorative borders, or page layout elements.`,
  },
  {
    n: "03",
    id: "cinematic-ensemble",
    title: "Cinematic Ensemble",
    category: "Cinematic",
    note: "Dramatic movie-cast ensemble portrait",
    description:
      "Elevate a group into a polished cinematic ensemble portrait with atmospheric lighting and film-style color grading.",
    intent: "Full scene transformation",
    mood: "Moody cinematic",
    background: "Luxury rooftop at sunset with city lights",
    changes: ["Wardrobe styling", "Lighting", "Background", "Color mood"],
    height: 360,
    preserve: bothOn,
    template: `Transform the uploaded {{subject}} into a dramatic cinematic ensemble portrait while preserving {{preserve}}.
Keep every person clearly recognizable, with realistic facial proportions, authentic expressions, natural skin texture, consistent hair details, and the exact same number of people. Maintain a polished group presence with a composed, movie-cast feeling rather than a casual snapshot.
Style the group like the cast of a premium film or prestige series, with refined wardrobe styling, controlled body language, confident presence, and a visually unified ensemble look. The people should feel intentionally arranged, elegant, and camera-aware, as if captured for an official promotional still.
Apply {{mood}} cinematic color grading with rich tonal contrast, atmospheric lighting, softly sculpted faces, subtle highlight glow, deeper shadows, and a polished film-like finish. Use realistic depth of field, gentle background blur, and a premium editorial-cinema look without making the image appear overly artificial or fantasy-like.
Build the setting from {{background}}, interpreting it as an elevated and atmospheric environment that supports a film-poster or cast-portrait aesthetic. The background should feel immersive and dramatic, with subtle practical lights, environmental glow, or distant city detail when appropriate, while keeping the group as the main focal point.
Use cinematic lighting and composition with balanced framing, elegant spacing between people, and a sense of visual storytelling. Preserve believable anatomy, hands, fingers, facial structure, eyewear, and pose coherence. Do not merge faces, add extra people, remove group members, or distort limbs.
Compose the final result for {{ratio}}, ensuring the group feels centered, premium, and visually cohesive, with no awkward cropping of faces, shoulders, or hands. The final image should resemble a high-end movie ensemble promotional portrait with stylish realism, atmospheric depth, and film-style polish.
Do not add text, title treatments, credits, logos, watermarks, poster typography, or decorative borders.`,
  },
  {
    n: "04",
    id: "friendship-scrapbook",
    title: "Friendship Scrapbook",
    category: "Vintage",
    note: "Handmade scrapbook memory-page collage",
    description:
      "Reimagine a group as a premium handmade friendship scrapbook page with layered paper, tape, and warm nostalgic tones.",
    intent: "Artistic restyle",
    mood: "Warm nostalgic",
    background:
      "Layered handmade scrapbook page with torn paper, tape, mini photos, and doodles",
    changes: ["Collage layout", "Paper textures", "Decorations", "Color mood"],
    height: 370,
    preserve: bothOn,
    template: `Transform the uploaded {{subject}} into a premium handmade friendship scrapbook composition while preserving {{preserve}}.
Keep every person clearly recognizable, with natural facial proportions, authentic expressions, realistic skin texture, and the exact same number of people. Maintain the feeling of genuine friendship and warmth, making the group feel emotionally connected and naturally joyful.
Reimagine the image as a carefully designed scrapbook page built around the group, featuring layered paper textures, torn-paper edges, taped photo pieces, mini printed snapshots, soft grain, and handcrafted decorative details. Include visual scrapbook elements such as doodled hearts, little hand-drawn marks, handwritten-style notes, floral cutouts, textured paper scraps, and taped memory fragments, while keeping the people themselves clear and attractive.
Apply {{mood}} color treatment with warm nostalgic tones, soft contrast, subtle print fading, gentle grain, and a tactile memory-book feel. The result should feel cozy, personal, sentimental, and visually rich without becoming cluttered or messy.
Build the scene from {{background}}, interpreting it as a scrapbook or memory-book setting made from layered materials, paper textures, keepsake pieces, and decorative collage elements. Arrange the main group image as the primary focal point, and optionally support it with smaller secondary snapshots or cropped mini-photo moments of the same group for a realistic scrapbook effect.
Preserve believable anatomy, hands, fingers, facial structure, hairstyles, eyewear, and group consistency. Do not merge faces, remove people, add extra people, or distort important details. The scrapbook decorations should enhance the composition, not cover faces or damage the readability of the group.
Compose the final image for {{ratio}}, ensuring the overall scrapbook design feels balanced, premium, and visually charming. The final result should resemble a beautifully assembled friendship memory page with handcrafted detail, layered nostalgia, and a warm emotional tone.
Do not add brand logos, watermarks, unrelated objects, or large blocks of readable text. Handwritten-style scribbles or short decorative note-like marks are fine, but they should remain subtle and aesthetic rather than informational.`,
  },
  {
    n: "05",
    id: "anime-squad",
    title: "Anime Squad",
    category: "Anime",
    note: "Polished contemporary anime group portrait",
    description:
      "Transform a group into a premium contemporary anime ensemble while keeping every member individually recognizable.",
    intent: "Artistic restyle",
    mood: "Vibrant cinematic",
    background: "Detailed scenic outdoor adventure setting",
    changes: ["Art style", "Background", "Lighting", "Color mood"],
    height: 355,
    preserve: bothOn,
    template: `Transform the uploaded {{subject}} into a polished contemporary anime-style group portrait while preserving {{preserve}}.
Keep every person clearly recognizable, with distinct facial identity, consistent hairstyle, natural expression, and the exact same number of people. Retain the core identity of each group member so the final image feels like an anime version of the same real friends, not different characters.
Reimagine the group as a stylish anime ensemble with clean linework, expressive eyes, refined facial shading, polished character rendering, and visually appealing illustrated detail. Use a modern premium anime look rather than a childish cartoon style. The characters should feel lively, attractive, and cohesive as a group, with expressive but believable poses and strong visual harmony.
Apply {{mood}} color treatment using anime-inspired lighting, rich color separation, soft glow where appropriate, crisp highlights, clean shadows, and vibrant yet balanced tones. The final image should feel cinematic and polished, with attractive illustrated depth and a premium digital-anime finish.
Build the environment from {{background}}, interpreting it as a detailed illustrated setting that supports the group naturally. Include scenic depth, clean environmental storytelling, and a visually rich background, while keeping the group as the clear focal point. The setting should feel immersive and polished rather than flat or minimal.
Preserve believable anatomy, hand structure, eyewear, hair silhouettes, clothing cues, accessories, and group consistency. Do not merge faces, remove people, add extra people, or distort limbs. The anime transformation should stylize the group while keeping everyone individually readable and attractive.
Compose the final result for {{ratio}}, making sure the group feels balanced, energetic, and visually unified. Avoid awkward cropping of faces, shoulders, hands, or key accessories. The final image should look like a high-quality contemporary anime promotional illustration of the same group.
Do not add text, logos, watermarks, speech bubbles, manga panels, subtitles, or decorative borders.`,
  },
  {
    n: "06",
    id: "y2k-digicam-party",
    title: "Y2K Digicam Party",
    category: "Vintage",
    note: "Early-2000s direct-flash digicam snapshot",
    description:
      "Restyle a group as an early-2000s digicam party photo with hard flash, punchy contrast, and nostalgic social energy.",
    intent: "Artistic restyle",
    mood: "Flashy nostalgic",
    background: "Sunset beach hangout with casual party vibe",
    changes: ["Flash lighting", "Background", "Fashion attitude", "Color mood"],
    height: 350,
    preserve: bothOn,
    template: `Transform the uploaded {{subject}} into an early-2000s digicam party-style group photo while preserving {{preserve}}.
Keep every person clearly recognizable, with realistic facial identity, natural expressions, authentic skin tone, and the exact same number of people. Maintain the friendly group energy and casual closeness so the result still feels like the same people captured in the same shared moment.
Restyle the image with a strong Y2K point-and-shoot aesthetic: hard direct flash, spontaneous party-photo energy, slightly imperfect candid posing, casual early-2000s fashion attitude, glossy highlights on skin, subtle overexposure on bright areas, and the unmistakable feel of a compact digital camera from the early 2000s. The result should feel fun, social, youthful, and effortlessly nostalgic.
Apply {{mood}} color treatment using warm party-like tones, punchy contrast, slight flash glare, gentle digital noise, minor compression feel, and lightly blown highlights in a believable way. Keep the image visually attractive while preserving the imperfect charm of an old consumer digicam shot.
Build the scene from {{background}}, interpreting it as a lively casual setting suited to a Y2K social snapshot. The environment should feel real and relaxed, with a natural backdrop and enough atmosphere to support the nostalgic party-photo look without distracting from the group.
Preserve believable anatomy, hand structure, facial proportions, eyewear, hairstyles, clothing cues, and group consistency. Do not merge faces, remove people, add extra people, or distort limbs. Keep the group visually cohesive while allowing the image to feel a little more candid and spontaneous than a formal portrait.
Compose the final result for {{ratio}}, ensuring the group remains comfortably framed and visually balanced. The final image should resemble a genuine early-2000s digital-camera group snapshot with direct flash, casual fun, and nostalgic social-photo energy.
Do not add text, timestamps, camera UI, logos, watermarks, stickers, or decorative borders.`,
  },
  {
    n: "07",
    id: "luxury-editorial-crew",
    title: "Luxury Editorial Crew",
    category: "Professional portraits",
    note: "High-fashion magazine campaign group look",
    description:
      "Elevate a group into a luxury editorial campaign portrait with coordinated styling and golden-hour garden light.",
    intent: "New outfit or theme",
    mood: "Elegant warm editorial",
    background: "Luxury garden picnic with soft golden-hour light",
    changes: ["Outfit styling", "Background", "Lighting", "Color mood"],
    height: 365,
    preserve: bothOn,
    template: `Transform the uploaded {{subject}} into a luxury editorial-style group portrait while preserving {{preserve}}.
Keep every person clearly recognizable, with realistic facial proportions, natural skin texture, authentic expressions, and the exact same number of people. Maintain a refined group presence so the final result feels like the same people elevated into a premium magazine campaign.
Restyle the group with a high-fashion editorial aesthetic, using coordinated wardrobe, elegant styling, polished grooming, and a visually cohesive group look. The people should appear sophisticated, confident, and intentionally arranged, as if photographed for a premium fashion or lifestyle magazine. Clothing, accessories, and overall styling should feel elevated and harmonious rather than costume-like.
Apply {{mood}} color grading with sophisticated tones, soft but premium contrast, flattering skin rendering, elegant highlight control, and polished editorial lighting. Use a luxurious visual finish with subtle depth, refined texture, and a clean upscale feel. The result should look premium, stylish, and camera-ready without becoming overly dramatic or artificial.
Build the setting from {{background}}, interpreting it as a high-end editorial environment that supports the fashion-campaign look. The background can be an elegant indoor or outdoor lifestyle setting, but it should always feel aspirational, tasteful, and visually polished. Keep the environment supportive and attractive while ensuring the group remains the clear focal point.
Use deliberate composition with balanced spacing, graceful posture, and a cohesive visual rhythm across the group. Preserve believable anatomy, hands, fingers, facial structure, eyewear, and group consistency. Do not merge faces, remove people, add extra people, or distort limbs. Keep the number of people exact and the group arrangement visually coherent.
Compose the final result for {{ratio}}, ensuring the group feels centered, premium, and magazine-worthy, with no awkward cropping of faces, shoulders, or hands. The final image should resemble a high-end editorial campaign image featuring the same group in a luxury lifestyle setting.
Do not add text, magazine mastheads, cover lines, logos, watermarks, or decorative borders.`,
  },
  {
    n: "08",
    id: "retro-sitcom-cast",
    title: "Retro Sitcom Cast",
    category: "Vintage",
    note: "Cozy 80s/90s sitcom cast promo still",
    description:
      "Reimagine a group as a cheerful retro sitcom cast portrait with warm analog softness and lived-in set lighting.",
    intent: "Artistic restyle",
    mood: "Warm nostalgic",
    background: "Cozy retro living-room set with warm ambient lights",
    changes: ["Outfit styling", "Background", "Lighting", "Analog texture"],
    height: 350,
    preserve: bothOn,
    template: `Transform the uploaded {{subject}} into a cheerful retro sitcom-style group portrait while preserving {{preserve}}.
Keep every person clearly recognizable, with realistic facial identity, natural expressions, consistent skin tone, authentic hairstyle cues, and the exact same number of people. Maintain a warm group chemistry so the result feels like the same friends reimagined as the cast of a nostalgic television show.
Restyle the group as if they are appearing in a promotional still or opening-title frame from a 1980s or 1990s sitcom. Give the image a cozy ensemble-cast feeling with approachable smiles, friendly chemistry, relaxed body language, and coordinated era-inspired styling. Clothing should feel casually retro, comfortable, colorful, and character-driven without becoming costume-like or exaggerated.
Apply {{mood}} color treatment with nostalgic warmth, soft analog contrast, gentle highlight bloom, slightly faded tones, mild film grain, and subtle vintage softness. The final look should feel inviting, upbeat, and familiar, like a classic sitcom publicity image or title-sequence still captured on analog film or early television cameras.
Build the setting from {{background}}, interpreting it as a cozy sitcom-style environment with warm ambient lighting, lived-in decor, homelike details, and a welcoming nostalgic atmosphere. The background should support the retro cast-photo look while staying secondary to the group.
Use soft studio-style or set-style lighting with balanced framing and ensemble composition. Preserve believable anatomy, hands, fingers, eyewear, facial structure, pose clarity, and group consistency. Do not merge faces, remove people, add extra people, or distort limbs. Keep the number of people exact and maintain a clear sense of group connection.
Compose the final result for {{ratio}}, ensuring the group feels centered, well-balanced, and naturally framed, with no awkward cropping of faces, shoulders, or hands. The final image should resemble a polished retro sitcom cast photo with cozy charm, nostalgic styling, and analog softness.
Do not add text, show titles, logos, credits, watermarks, decorative borders, or TV screen overlays.`,
  },
  {
    n: "09",
    id: "clay-crew",
    title: "Clay Crew",
    category: "3D avatars",
    note: "Handcrafted 3D clay group portrait",
    description:
      "Turn a group into charming handcrafted clay figures in a miniature diorama scene while keeping identities clear.",
    intent: "Artistic restyle",
    mood: "Cozy playful",
    background: "Miniature snowy village scene with handcrafted depth",
    changes: ["Art medium", "Background", "Lighting", "Surface texture"],
    height: 355,
    preserve: bothOn,
    template: `Transform the uploaded {{subject}} into a handcrafted 3D clay-style group portrait while preserving {{preserve}}.
Keep every person clearly recognizable, with distinct facial identity, matching hairstyle cues, natural expressions, and the exact same number of people. The result should feel like the same group reimagined as charming handcrafted clay characters rather than different people.
Restyle the entire group as detailed clay figures with rounded forms, tactile handmade texture, sculpted facial features, soft surface imperfections, and carefully modeled clothing details. Preserve recognizable hairstyle shapes, facial characteristics, eyewear, winterwear or clothing cues, and overall group arrangement so the clay transformation still feels faithful to the original image.
Apply {{mood}} color treatment using soft miniature-set lighting, gentle highlight rolloff, pleasing shadows, and a cozy handcrafted visual tone. Use clean, appealing colors and subtle depth so the clay rendering feels premium, polished, and tactile rather than rough or messy.
Build the environment from {{background}}, interpreting it as a miniature handcrafted scene that complements the group naturally. The background should feel like a stylized clay set or diorama with depth, texture, and visual charm, while keeping the group as the clear focal point.
Preserve believable anatomy, hand gestures, facial structure, group spacing, pose clarity, and accessories. Do not merge faces, remove people, add extra people, or distort limbs. The final clay styling should be playful and stylized, but each character should remain individually readable and visually appealing.
Compose the final image for {{ratio}}, ensuring the group feels centered, balanced, and clearly framed, with no awkward cropping of faces, hands, or key accessories. The final result should resemble a premium handcrafted clay ensemble portrait with tactile surfaces, miniature-scene lighting, and a warm stylized finish.
Do not add text, logos, watermarks, decorative borders, toy packaging, or unrelated props that distract from the group.`,
  },
  {
    n: "10",
    id: "photo-booth-chaos",
    title: "Photo Booth Chaos",
    category: "Vintage",
    note: "Playful multi-frame photo-booth strip",
    description:
      "Create a playful multi-frame photo-booth print of the group with candid expressions, direct flash, and print texture.",
    intent: "Artistic restyle",
    mood: "Playful nostalgic",
    background: "Cozy indoor celebration setting with subtle booth-style atmosphere",
    changes: ["Multi-frame layout", "Expressions", "Flash lighting", "Print texture"],
    height: 375,
    preserve: identitiesOnly,
    template: `Transform the uploaded {{subject}} into playful multi-frame photo-booth imagery while preserving {{preserve}}.
Keep every person clearly recognizable, with natural facial identity, consistent hairstyle, realistic skin tone, and the exact same number of people. Maintain the energy of close friendship and a fun, spontaneous group dynamic.
Reimagine the image as a classic photo-booth strip or grid with multiple frames showing the same group in slightly different expressions and micro-poses. Include squeezed-together composition, playful facial expressions, cheerful chaos, direct camera engagement, and a candid party-photo feeling. Let each frame feel a little different, with smiles, laughter, funny faces, winked eyes, puckered lips, peace signs, or other small playful changes, while keeping the same people clearly identifiable throughout.
Apply {{mood}} color treatment with direct flash, nostalgic booth-style contrast, slightly imperfect exposure, soft analog grain, subtle print wear, and authentic booth-photo texture. The result should feel energetic, warm, imperfect, and charming, like a real printed photo-booth keepsake.
Build the setting from {{background}}, interpreting it as a close, party-friendly environment that supports a casual celebratory booth aesthetic. The background should remain secondary and softly simplified so the focus stays on the group and the multi-frame presentation.
Use a multi-frame layout designed for {{ratio}}, with believable booth-photo spacing, printed-photo texture, subtle edge wear, and naturally imperfect framing. Keep the group close to the camera with slightly tight crops to enhance the authentic photo-booth feeling.
Preserve believable anatomy, facial structure, hand gestures, pose clarity, accessories, and group consistency. Do not merge faces, remove people, add extra people, or distort limbs. The expressions can vary from frame to frame, but the group should remain visually consistent across the full photo-booth composition.
The final result should resemble a real playful photo-booth print featuring the same group across several frames, with candid energy, nostalgic flash photography, and authentic print character.
Do not add logos, watermarks, unrelated text, decorative stickers, or modern app UI elements.`,
  },
];

/**
 * Group templates 1–10 from group_images/groump-templates.md
 * Preserve toggles: keepClothing → Identities & facial features;
 * keepPose → Group arrangement & pose.
 */
export const seedGroupStyles: CatalogStyle[] = groups.map((item, index) => ({
  id: item.id,
  title: item.title,
  category: item.category,
  subject: "Group",
  intent: item.intent,
  requirement: "One photo",
  tool: "ChatGPT Image",
  note: item.note,
  height: item.height,
  saved: 80 - index,
  source: asset(`source-${item.n}.png`),
  result: asset(`result-${item.n}.png`),
  status: "published",
  targetSourcePhoto: "Clear group photo with all faces visible and evenly lit",
  description: item.description,
  bestSourcePhoto: [
    "All faces visible",
    "Even group lighting",
    "People not heavily overlapping",
    "Original image should not be blurry",
  ],
  changes: item.changes,
  stays: [
    "Faces and identities",
    "Number of people",
    "Facial features",
    "Hairstyle cues",
    "Group chemistry",
  ],
  examplePairs: evidence(
    item.n,
    `Source group for ${item.title}`,
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
      ...item.preserve,
    },
    lastVerified: "2026-09-27",
    limitations: [
      "Crowded scenes may merge people",
      "Tiny distant faces can lose identity",
    ],
  },
}));
