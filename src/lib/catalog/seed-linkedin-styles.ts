import type { CatalogStyle } from "./types";

/**
 * Prefer Supabase catalog-public WebPs (uploaded by publish-linkedin-standalone).
 * Falls back to local /catalog only when the public Supabase URL is unset.
 */
function asset(name: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
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
  return [{ source, result, altSource, altResult }];
}

type LinkedinSeed = {
  n: string;
  id: string;
  title: string;
  note: string;
  description: string;
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
  altResult: string;
  /** Second catalog pair, stored as source-<n>b / result-<n>b. */
  second?: { altSource: string; altResult: string };
  limitations?: string[];
};

const aiGeneratedLimit =
  "Example people in the before photo are AI-generated, not real people.";

const faceOcclusionLimit = "Heavy face occlusion can weaken identity fidelity";

const passportLimit =
  "Official passport, visa and ID photos have strict rules, and many authorities reject AI-edited or digitally altered photos. Check your issuing authority's requirements; this prompt does not produce a compliant ID photo.";

const linkedin: LinkedinSeed[] = [
  {
    n: "60",
    id: "navy-blazer-linkedin-profile-picture-prompt-gemini",
    title: "Navy Blazer LinkedIn Photo Prompt for Gemini (Men & Women)",
    note: "Navy blazer, white shirt, light-grey studio",
    description:
      "Turn a casual selfie into a classic LinkedIn profile picture with a navy blazer, white shirt, and a soft light-grey studio backdrop, keeping your face unchanged.",
    intent: "New outfit or theme",
    mood: "Bright neutral",
    background: "Soft evenly lit light-grey studio backdrop",
    ratio: "1:1 Square",
    keepClothing: false,
    keepPose: false,
    changes: ["Navy blazer and white shirt", "Light-grey studio backdrop", "Soft even studio light"],
    stays: ["Face and identity", "Skin tone", "Hairstyle", "Expression"],
    height: 340,
    targetSourcePhoto: "One recent, front-facing head-and-shoulders photo in even light",
    bestSourcePhoto: [
      "Face the camera, eyes visible",
      "Even daylight, no harsh shadows",
      "No sunglasses or other people",
      "Original image should not be blurry",
    ],
    altSource:
      "Man with wavy hair and a short beard in an untucked white shirt and navy trousers, in a living room with a TV, sofa and plants.",
    altResult: "Man in a navy blazer over a white shirt, light-grey studio.",
    template:
      "Edit the uploaded {{subject}} into a professional LinkedIn headshot with flattering soft studio light and sharp focus on the eyes. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a well-fitted navy blazer over a plain white shirt. If pose is not preserved, use straight head-and-shoulders framing facing the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading with soft, even light. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "61",
    id: "charcoal-suit-corporate-linkedin-profile-picture-prompt-gemini-men",
    title: "Charcoal Suit LinkedIn Photo Prompt for Gemini (Men)",
    note: "Coat pant, light blue shirt, dark tie",
    description:
      "Turn a portrait into a corporate headshot for men in a charcoal two-piece suit (coat pant), light blue shirt, and dark tie, with soft front-left studio light.",
    intent: "New outfit or theme",
    mood: "Bright neutral",
    background: "Soft out-of-focus neutral grey studio backdrop",
    ratio: "1:1 Square",
    keepClothing: false,
    keepPose: false,
    changes: ["Charcoal suit, blue shirt, and tie", "Blurred neutral grey backdrop", "Soft front-left studio light"],
    stays: ["Face and identity", "Beard or moustache", "Hairline", "Skin tone and texture"],
    height: 350,
    targetSourcePhoto: "One clear head-and-shoulders photo with the face large and sharp",
    bestSourcePhoto: [
      "Face fully visible",
      "Neutral or slight smile",
      "Beard and hair as you wear them day to day",
      "Original image should not be blurry",
    ],
    altSource:
      "Man with curly hair and a salt-and-pepper beard in an olive polo, at an office desk with a monitor.",
    altResult:
      "Man in a charcoal suit, light-blue shirt and dark plain tie, blurred grey backdrop.",
    template:
      "Edit the uploaded {{subject}} into a corporate headshot with soft studio light from the front left, no harsh shadows, and sharp eyes. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a well-fitted charcoal grey two-piece suit with a light blue shirt and a dark plain tie. If pose is not preserved, use head-and-shoulders framing at a slight angle to the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "62",
    id: "black-blazer-linkedin-profile-picture-prompt-gemini-women",
    title: "Black Blazer LinkedIn Photo Prompt for Gemini (Women)",
    note: "Black blazer, cream high-neck top, beige studio",
    description:
      "Turn a portrait into a polished LinkedIn profile picture for women with a tailored black blazer, cream high-neck top, light natural makeup, and a soft beige backdrop.",
    intent: "New outfit or theme",
    mood: "Warm neutral",
    background: "Soft beige studio backdrop",
    ratio: "1:1 Square",
    keepClothing: false,
    keepPose: false,
    changes: ["Black blazer and cream top", "Soft beige backdrop", "Gentle even light"],
    stays: ["Face and identity", "Skin tone", "Hairstyle", "Expression"],
    height: 340,
    targetSourcePhoto: "One recent, front-facing head-and-shoulders photo",
    bestSourcePhoto: [
      "Face visible, no sunglasses",
      "Even window light",
      "Hair styled as you usually wear it",
      "Original image should not be blurry",
    ],
    altSource: "Woman with long wavy hair in a pink and white floral kurta, in a kitchen.",
    altResult: "Woman in a black blazer over a cream high-neck top, beige backdrop.",
    template:
      "Edit the uploaded {{subject}} into a professional LinkedIn headshot with gentle even light and light, natural makeup only. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a tailored black blazer over a cream high-neck top. If pose is not preserved, use straight head-and-shoulders framing facing the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "63",
    id: "hijab-office-linkedin-profile-picture-prompt-gemini-women",
    title: "Hijab Office LinkedIn Photo Prompt for Gemini (Women)",
    note: "Dusty-rose hijab, navy blazer, grey studio",
    description:
      "Turn a hijab portrait into a professional LinkedIn headshot with a neatly wrapped dusty-rose hijab, navy blazer, and a soft grey studio backdrop.",
    intent: "New outfit or theme",
    mood: "Bright neutral",
    background: "Plain soft grey studio backdrop",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    changes: ["Dusty-rose hijab and navy blazer", "Soft grey studio backdrop", "Even flattering light"],
    stays: ["Face and identity", "Hijab kept on", "Skin tone", "Expression"],
    height: 360,
    targetSourcePhoto: "One clear head-and-shoulders photo wearing a hijab, full face and chin visible",
    bestSourcePhoto: [
      "Full face and chin visible",
      "Even lighting on the face",
      "No sunglasses or other people",
      "Original image should not be blurry",
    ],
    altSource:
      "Woman in a dusty-mauve hijab and a cream floral shalwar kameez, in a hallway with curtains.",
    altResult: "Woman in a neatly wrapped dusty-rose hijab and navy blazer, grey backdrop.",
    template:
      "Edit the uploaded {{subject}} into a professional headshot with even, flattering light. Follow the selected source-preservation settings: {{preserve}}. Keep the hijab on, neatly wrapped, with the full face and chin visible. If clothing is not preserved, make the hijab a solid dusty-rose color and pair it with a well-fitted navy blazer over a plain top. If pose is not preserved, use straight head-and-shoulders framing facing the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "64",
    id: "dupatta-office-linkedin-profile-picture-prompt-gemini-women",
    title: "Dupatta Office LinkedIn Photo Prompt for Gemini (Women)",
    note: "Off-white kurta, beige blazer, draped dupatta",
    description:
      "Turn a portrait into an office headshot for women with an off-white kurta, fitted beige blazer, and a neatly draped solid dupatta on a light-grey backdrop.",
    intent: "New outfit or theme",
    mood: "Fresh clean daylight",
    background: "Plain light-grey studio backdrop",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    changes: ["Kurta, beige blazer, and dupatta", "Light-grey backdrop", "Even daylight-style light"],
    stays: ["Face and identity", "Skin tone", "Hairstyle or head covering", "Expression"],
    height: 350,
    targetSourcePhoto: "One clear head-and-shoulders photo, with or without a dupatta over the head",
    bestSourcePhoto: [
      "Face fully visible",
      "Daylight from a window",
      "Head and shoulders in frame",
      "Original image should not be blurry",
    ],
    altSource:
      "Woman with long hair in a pink printed drape and a gold necklace, on a balcony with plants.",
    altResult:
      "Woman in an off-white kurta, beige blazer and a plain light dupatta, light-grey backdrop.",
    template:
      "Edit the uploaded {{subject}} into a professional office headshot with even daylight-style lighting. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a plain off-white kurta with a fitted beige blazer and a light, solid-color dupatta neatly draped over both shoulders, or over the head if the head is covered in the original photo. If pose is not preserved, use straight head-and-shoulders framing facing the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "65",
    id: "shalwar-kameez-linkedin-profile-picture-prompt-gemini-men",
    title: "Shalwar Kameez LinkedIn Photo Prompt for Gemini (Men)",
    note: "White kameez, navy waistcoat, grey studio",
    description:
      "Turn a portrait into a formal LinkedIn headshot for men in a crisp white shalwar kameez and navy waistcoat, with soft even light on a light-grey backdrop.",
    intent: "New outfit or theme",
    mood: "Bright neutral",
    background: "Plain light-grey studio backdrop",
    ratio: "1:1 Square",
    keepClothing: false,
    keepPose: false,
    changes: ["White kameez and navy waistcoat", "Light-grey studio backdrop", "Soft even light"],
    stays: ["Face and identity", "Beard and hairline", "Skin tone", "Expression"],
    height: 340,
    targetSourcePhoto: "One clear head-and-shoulders photo with the face large and sharp",
    bestSourcePhoto: [
      "Face fully visible",
      "Beard as you wear it day to day",
      "Even lighting, no heavy shadows",
      "Original image should not be blurry",
    ],
    altSource:
      "Bearded man in a light-grey shalwar kameez, in a courtyard with plants, a cot and a gate.",
    altResult:
      "Bearded man in a crisp white shalwar kameez and navy waistcoat, light-grey backdrop.",
    template:
      "Edit the uploaded {{subject}} into a formal professional headshot with soft, even studio lighting and a confident, relaxed look. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a crisp white shalwar kameez with a well-fitted navy waistcoat. If pose is not preserved, use straight head-and-shoulders framing facing the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "66",
    id: "cv-photo-ai-prompt-plain-background-resume-headshot",
    title: "CV Photo AI Prompt: Plain Background Resume Headshot",
    note: "Plain cream wall, own clothes, slight smile",
    description:
      "Gives a clean, plain-background CV or resume photo, keeping their own clothes.",
    intent: "Change background",
    mood: "Bright neutral",
    background: "Minimal cream wall",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    changes: ["Plain cream wall", "Shadow-free even light"],
    stays: ["Face and identity", "Own clothing", "Skin tone", "Glasses"],
    height: 360,
    targetSourcePhoto: "One recent, front-facing head-and-shoulders photo",
    bestSourcePhoto: [
      "Facing the camera",
      "No shadows across the face",
      "Slight natural smile",
      "Original image should not be blurry",
    ],
    altSource: "Woman with glasses in a lavender knit sweater, in a bedroom.",
    altResult: "Woman with glasses in the same lavender knit sweater, plain cream wall.",
    template:
      "Edit the uploaded {{subject}} into a clean CV photo with soft, even lighting, no shadows on the face, and sharp focus. Follow the selected source-preservation settings: {{preserve}}. If clothing is preserved, keep their own clothes. If pose is not preserved, have them face the camera with a slight friendly smile, framed from head to upper shoulders. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "67",
    id: "modern-office-linkedin-profile-picture-prompt-gemini",
    title: "Modern Office LinkedIn Photo Prompt for Gemini",
    note: "Blurred glass office, window light",
    description:
      "Place a portrait in a bright modern office with glass walls and plants softly blurred behind, keeping their own clothes, with natural window light.",
    intent: "Full scene transformation",
    mood: "Fresh clean daylight",
    background: "Softly blurred bright modern office with glass walls and plants",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    changes: ["Blurred modern office", "Natural window light"],
    stays: ["Face and identity", "Own clothing", "Skin tone", "Expression"],
    height: 350,
    targetSourcePhoto: "One clear head-and-shoulders photo in daylight",
    bestSourcePhoto: [
      "Face lit from the front or side window",
      "Head and shoulders in frame",
      "No other people in the photo",
      "Original image should not be blurry",
    ],
    altSource:
      "Man with wavy dark hair and a short full beard in a light-blue shirt, on a city street.",
    altResult: "Man in a smart blue shirt, blurred bright office with glass and plants.",
    template:
      "Edit the uploaded {{subject}} into an office headshot with natural window light on the face and a shallow depth of field. Follow the selected source-preservation settings: {{preserve}}. If clothing is preserved, keep their own clothes. If clothing is not preserved, dress them in smart business clothing in plain colors. If pose is not preserved, use head-and-shoulders framing turned slightly toward the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "68",
    id: "outdoor-natural-light-linkedin-profile-picture-prompt-gemini",
    title: "Outdoor Natural Light LinkedIn Photo Prompt for Gemini",
    note: "Blurred trees, late-afternoon light, warm smile",
    description:
      "Turn a portrait into an approachable outdoor headshot for freelancers, teachers, and creatives, keeping their own clothes, with blurred green trees and late-afternoon light.",
    intent: "Full scene transformation",
    mood: "Soft warm natural",
    background: "Softly blurred green trees in late-afternoon light",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    changes: ["Blurred green trees", "Late-afternoon light"],
    stays: ["Face and identity", "Own clothing", "Skin tone", "Hairstyle"],
    height: 340,
    targetSourcePhoto: "One clear head-and-shoulders photo with a natural expression",
    bestSourcePhoto: [
      "Face visible, no sunglasses",
      "Soft daylight on the face",
      "Natural smile if you have one",
      "Original image should not be blurry",
    ],
    altSource:
      "Woman with her hair pulled back in a blue and white printed kurta, in a park with trees and a bench.",
    altResult: "Woman in her blue printed kurta, blurred green trees in warm light.",
    template:
      "Edit the uploaded {{subject}} into an approachable outdoor headshot with soft late-afternoon light and a shallow depth of field. Follow the selected source-preservation settings: {{preserve}}. If clothing is preserved, keep their own clothes. If clothing is not preserved, dress them in a smart-casual plain shirt or kurta in a solid color. If pose is not preserved, use relaxed head-and-shoulders framing with a natural, warm smile. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "69",
    id: "linkedin-photo-clean-up-ai-prompt-gemini-keep-outfit",
    title: "LinkedIn Photo Clean-Up AI Prompt for Gemini (Keep Outfit)",
    note: "Minimal edit: plain grey, tidy, even light",
    description:
      "Keep your own photo and outfit, and only swap in a plain soft grey backdrop, even out the light, and tidy stray hairs and lint.",
    intent: "Change background",
    mood: "Warm natural neutral",
    background: "Plain soft grey studio backdrop",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: true,
    changes: ["Plain soft grey backdrop", "Evened-out lighting", "Stray hairs and lint removed"],
    stays: ["Face and identity", "Clothes", "Pose", "Skin tone and texture"],
    height: 350,
    targetSourcePhoto: "A photo you already like, head and shoulders, facing the camera",
    bestSourcePhoto: [
      "Outfit you are happy with",
      "Face fully visible",
      "Simple background is easier to replace",
      "Original image should not be blurry",
    ],
    altSource:
      "Man with messy dark hair and a dark beard in a rumpled, open light-blue shirt, in front of cluttered shelves.",
    altResult: "Man in the same light-blue shirt tidied, plain soft-grey backdrop.",
    template:
      "Edit the uploaded {{subject}} with minimal changes into a tidy professional headshot. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, neaten the outfit into a similar plain smart version without changing its style. If pose is not preserved, straighten into a simple head-and-shoulders pose facing the camera. Even out the lighting and remove small stray hairs and lint. No skin smoothing, slimming, or makeup changes. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "70",
    id: "matching-team-headshot-ai-prompt-gemini-company-page",
    title: "Matching Team Headshot AI Prompt for Gemini (Company Page)",
    note: "Consistent grey studio look for team pages",
    description:
      "Make consistent company team-page headshots: same light-grey backdrop, even front light, and eye-line framing, keeping each person's own outfit.",
    intent: "Change background",
    mood: "Bright neutral",
    background: "Soft evenly lit light-grey studio backdrop",
    ratio: "1:1 Square",
    keepClothing: true,
    keepPose: false,
    changes: [
      "Light-grey studio backdrop",
      "Even front lighting",
      "Consistent eye-line framing",
      "Neatened collar",
    ],
    stays: ["Face and identity", "Own outfit", "Skin tone", "Hairstyle"],
    height: 340,
    targetSourcePhoto:
      "One head-and-shoulders photo per team member; run the same settings for each person",
    bestSourcePhoto: [
      "One person per photo",
      "Face the camera in even light",
      "Similar distance from camera for everyone",
      "Original image should not be blurry",
    ],
    altSource: "Woman with long hair in a maroon henley, in a hallway.",
    altResult: "Woman in the same maroon henley, light-grey studio.",
    second: {
      altSource: "Bearded man in a brown and navy plaid shirt, on a street.",
      altResult: "Bearded man in a plaid shirt with a neat collar, light-grey studio.",
    },
    template:
      "Edit the uploaded {{subject}} into a company team headshot with even front lighting and the eyes about one-third from the top of the frame. Follow the selected source-preservation settings: {{preserve}}. If clothing is preserved, keep their own outfit but neaten the collar. If clothing is not preserved, dress them in a plain smart top or shirt in a neutral color. If pose is not preserved, use straight head-and-shoulders framing facing the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "71",
    id: "saree-office-linkedin-profile-picture-prompt-gemini-women",
    title: "Saree Office LinkedIn Photo Prompt for Gemini (Women)",
    note: "Plain silk-cotton saree, fitted blouse, grey studio",
    description:
      "Turn a portrait into an elegant office headshot for women in a plain solid-color saree with a neatly pinned pallu, on a soft light-grey backdrop.",
    intent: "New outfit or theme",
    mood: "Warm natural neutral",
    background: "Plain light-grey studio backdrop",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    changes: ["Plain office saree and blouse", "Light-grey studio backdrop", "Soft even light"],
    stays: ["Face and identity", "Skin tone", "Hairstyle or head covering", "Expression"],
    height: 360,
    targetSourcePhoto: "One clear head-and-shoulders photo, front-facing",
    bestSourcePhoto: [
      "Face fully visible",
      "Even lighting, no heavy shadows",
      "Hair as you wear it to work",
      "Original image should not be blurry",
    ],
    altSource:
      "Woman with long hair in a pink sleeveless top with a printed drape, in a living room.",
    altResult:
      "Woman in a deep-teal saree with a thin border and matching blouse, light-grey backdrop.",
    template:
      "Edit the uploaded {{subject}} into a professional office headshot with soft, even studio light and a modest, polished look. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a plain solid deep-teal silk-cotton saree with a thin understated border, a matching elbow-sleeve blouse, and the pallu neatly pinned over the left shoulder, with small simple stud earrings only. If pose is not preserved, use straight head-and-shoulders framing facing the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "72",
    id: "passport-size-photo-ai-prompt-gemini-white-background",
    title: "Passport Size Photo AI Prompt for Gemini (White Background)",
    note: "Plain white, front-facing, for CVs and forms",
    description: passportLimit,
    intent: "Change background",
    mood: "Bright neutral",
    background: "Pure white seamless infinity studio background",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    changes: ["Plain white background", "Front-facing centered framing", "Even shadow-free light"],
    stays: ["Face and identity", "Own clothing", "Skin tone", "Head covering if worn"],
    height: 350,
    targetSourcePhoto: "One front-facing photo, face straight to camera, head and upper shoulders",
    bestSourcePhoto: [
      "Look straight at the camera",
      "Both sides of the face evenly lit",
      "A recent photo, with glasses only if you wear them day to day",
      "Original image should not be blurry",
    ],
    altSource:
      "Man with curly hair and a salt-and-pepper beard in a black shirt, against a plain light wall.",
    altResult: "Man in a plain dark shirt, pure white background, neutral expression.",
    limitations: [aiGeneratedLimit, passportLimit],
    template:
      "Edit the uploaded {{subject}} into a passport-size style photo on a plain background for a CV or application form, with even, shadow-free front lighting. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in plain dark smart clothing that contrasts with the background. If pose is not preserved, center the head and upper shoulders, facing straight to the camera, with a neutral expression, mouth closed, and eyes open. Keep any head covering worn for religious reasons, with the full face visible from chin to forehead. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "73",
    id: "executive-corporate-linkedin-profile-picture-prompt-gemini",
    title: "Executive Dark Studio LinkedIn Photo Prompt for Gemini",
    note: "Low-key charcoal backdrop, soft side light",
    description:
      "Turn a portrait into a confident executive headshot with a dark charcoal studio backdrop, dark formal outfit, and soft low-key side light.",
    intent: "New outfit or theme",
    mood: "Dark cool neutral",
    background: "Dark charcoal studio backdrop with a soft gradient",
    ratio: "4:5 Portrait",
    keepClothing: false,
    keepPose: false,
    changes: ["Dark suit or formal outfit", "Charcoal studio backdrop", "Low-key side light"],
    stays: ["Face and identity", "Skin tone", "Hairstyle", "Expression"],
    height: 360,
    targetSourcePhoto: "One clear head-and-shoulders photo with the face large and sharp",
    bestSourcePhoto: [
      "Face fully visible",
      "Neutral or confident expression",
      "No sunglasses",
      "Original image should not be blurry",
    ],
    altSource:
      "Man in his 50s with grey hair, glasses and a grey mustache in a checked shirt, in a bedroom.",
    altResult: "Man in a dark suit and light shirt, dark charcoal backdrop with rim light.",
    template:
      "Edit the uploaded {{subject}} into a confident executive headshot with soft low-key studio light from one side and a gentle rim light separating the hair from the background. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a well-fitted dark navy or black suit or formal outfit with a plain light shirt or top. If pose is not preserved, use head-and-shoulders framing at a slight angle with the face turned to the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading with deep but soft shadows. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
  {
    n: "74",
    id: "home-office-linkedin-profile-picture-prompt-gemini",
    title: "Home Office LinkedIn Photo Prompt for Gemini (Remote Work)",
    note: "Blurred home-office desk, warm lamp light",
    description:
      "Place a portrait in a softly blurred home office for remote-work profiles, freelancer pages, and video-call avatars, keeping their own clothes.",
    intent: "Full scene transformation",
    mood: "Soft warm natural",
    background:
      "Cozy home office desk with a laptop, coffee mug, notebook, warm lamp light, books, and soft greenery",
    ratio: "4:5 Portrait",
    keepClothing: true,
    keepPose: false,
    changes: ["Blurred home office", "Soft window and lamp light"],
    stays: ["Face and identity", "Own clothing", "Skin tone", "Hairstyle"],
    height: 340,
    targetSourcePhoto: "One clear head-and-shoulders photo, front-facing",
    bestSourcePhoto: [
      "Face visible, no sunglasses",
      "Even light on the face",
      "Head and shoulders in frame",
      "Original image should not be blurry",
    ],
    altSource:
      "Woman in a lilac sweater with her hand on her cheek, at a cluttered desk with a laptop, mug and plants.",
    altResult:
      "Woman in a purple sweater, blurred cozy home office with a laptop, mug, lamp, books and plants.",
    template:
      "Edit the uploaded {{subject}} into a friendly remote-work headshot with soft window light on the face and the background kept well out of focus. Follow the selected source-preservation settings: {{preserve}}. If clothing is preserved, keep their own clothes. If clothing is not preserved, dress them in a smart-casual plain shirt, sweater, or kurta in a solid color. If pose is not preserved, use head-and-shoulders framing facing the camera with a warm, natural smile. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.",
  },
];

/**
 * Professional portrait templates 60–74.
 * Matching team stores a second example pair as source-70b / result-70b.
 * Each run still takes one photo.
 */
export const seedLinkedinStyles: CatalogStyle[] = linkedin.map((item, index) => ({
  id: item.id,
  title: item.title,
  category: "Professional portraits",
  subject: "Person",
  intent: item.intent,
  requirement: "One photo",
  tool: "ChatGPT Image",
  note: item.note,
  height: item.height,
  saved: 30 - index,
  source: asset(`source-${item.n}.png`),
  result: asset(`result-${item.n}.png`),
  status: "published",
  targetSourcePhoto: item.targetSourcePhoto,
  description: item.description,
  bestSourcePhoto: item.bestSourcePhoto,
  changes: item.changes,
  stays: item.stays,
  examplePairs: item.second
    ? [
        ...evidence(item.n, item.altSource, item.altResult),
        ...evidence(`${item.n}b`, item.second.altSource, item.second.altResult),
      ]
    : evidence(item.n, item.altSource, item.altResult),
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
      ratio: item.ratio,
      keepClothing: item.keepClothing,
      keepPose: item.keepPose,
    },
    lastVerified: "",
    limitations: item.limitations ?? [aiGeneratedLimit, faceOcclusionLimit],
  },
}));

export const linkedinStyleIds = new Set(seedLinkedinStyles.map((style) => style.id));

/** Stored on catalog-public assets. Before photos are AI-generated people. */
export const linkedinAssetProvenance = {
  source: "seed",
  licence: "catalog",
  modelRelease: false,
  notes:
    "Before photo is an AI-generated person, not a real person. After image is an AI edit of that source.",
} as const;
