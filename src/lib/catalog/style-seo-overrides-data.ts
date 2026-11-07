import type { StyleSeoOverride } from "./style-seo-override-types";

/**
 * Per-style SEO and on-page copy overrides for GSC “Crawled – currently not
 * indexed” thin/similar pages. Slugs are unchanged; values replace catalog
 * title/meta and enrich the detail page when present.
 */
export const STYLE_SEO_OVERRIDE_ENTRIES: Readonly<
  Record<string, StyleSeoOverride>
> = {
  // Existing passport / CV / outfit overrides (meta + title only).
  "passport-size-photo-ai-prompt-gemini-white-background": {
    title: "Passport Size Photo Prompt: Gemini & ChatGPT, White BG",
    description:
      "Copy-paste passport size photo prompt for Gemini and ChatGPT. Turn one selfie into a white or blue background ID, 2x2 or visa photo with your real face kept.",
  },
  "cv-photo-ai-prompt-plain-background-resume-headshot": {
    title: "CV Photo AI Prompt for Resume Pictures (Gemini/ChatGPT)",
    description:
      "Free AI prompt for a CV or resume photo: turn a selfie into a clean, professional headshot on a plain background in Gemini or ChatGPT. Copy and paste.",
  },
  "black-suit-outfit-change-men": {
    title: "Black Suit Outfit Change AI Prompt for Men",
    description:
      "Outfit-swap black suit AI prompt for men: slim black two-piece in a bright industrial loft. Change your clothes in any photo and keep your real face — distinct from night-city or lobby suit shoots.",
  },

  // ── Group A: generic-named / thin sibling pages ──────────────────────────
  "soft-daylight-lifestyle": {
    title: "Window Light Lifestyle Product AI Prompt",
    h1: "Window Light Lifestyle Product AI Prompt",
    description:
      "Daylight lifestyle product AI prompt: place your item on a sunlit desk with soft window light. Works in Gemini and ChatGPT. Free copy-paste.",
    intro: `This window-light lifestyle product prompt is for makers, small shops, and creators who need a calm, lived-in product shot without booking a studio. Upload one clear photo of your item—packaging, bottle, candle, gadget, or boxed good—and paste the prompt into Gemini or ChatGPT with the image attached. Soft daylight wraps the product; a pale desk, notebook, and quiet greenery stay secondary so the item stays readable for listings, landing pages, and social carousels.

Unlike a pure white packshot, this look sells atmosphere: believable window light, gentle shadows, and a shallow depth of field that still keeps labels sharp. It is not a flat-lay overhead or a coral pedestal campaign; the camera stays near eye level in a real-feeling room. Keep the source photo sharp, fully in frame, and free of busy clutter so the model does not invent extra props.

Use it when your storefront needs warmer lifestyle context than a marketplace white background, but you still want the product honest—same shape, colour, and finish. Pair it with the white packshot for Amazon-style galleries and this lifestyle frame for homepage or Instagram storytelling. One edit at a time works best: lock the product, then nudge only the desk props or warmth if needed.`,
    tips: [
      "Shoot or crop so the product fills most of the frame before you upload.",
      "Ask Gemini or ChatGPT to keep labels readable if type starts to smear.",
      "Prefer this look for lifestyle galleries; use the white packshot for marketplace grids.",
    ],
    guideLinks: [
      {
        href: "/guides/stylish-ai-photo-prompts",
        label: "Stylish AI Photo Prompts",
      },
      {
        href: "/guides/how-to-keep-face-same-in-gemini-ai",
        label: "How to Keep Your Face the Same in Gemini",
      },
    ],
    relatedStyleIds: ["pure-white-packshot", "editorial-flat-lay", "color-pop-pedestal"],
  },
  "pure-white-packshot": {
    title: "White Background Product Packshot AI Prompt",
    h1: "White Background E-commerce Product Photography AI Prompt",
    description:
      "White background e-commerce packshot AI prompt: turn a phone photo into a clean marketplace studio shot. Free for Gemini and ChatGPT.",
    intro: `The pure white packshot prompt is built for sellers who need a marketplace-ready product image: seamless white infinity, even studio light, and a subtle contact shadow under the item. Paste it into Gemini or ChatGPT with one product photo when you are listing on a storefront, refreshing an Amazon-style gallery, or cleaning up a phone snap that has a messy kitchen or desk behind it.

This page is deliberately different from lifestyle window light and editorial flat-lay siblings. There is no oak desk, no notebook props, and no overhead styling board—only the product, white seamless space, and controlled highlights so edges stay crisp. Preserve packaging, colour, and material finish; do not ask the model to redesign the label or invent a second product.

It works well as the first frame in a set: white packshot for search grids, then soft daylight lifestyle or flat-lay for brand storytelling. Keep the source image sharp, product fully visible, and avoid heavy compression. If glass or metal goes dull, ask for a single follow-up that restores realistic reflections without changing the shape.`,
    tips: [
      "Center the product with a little empty space so the seamless white can expand.",
      "Say “keep original label text and colours” if packaging drifts.",
      "Use this for catalog grids; switch to lifestyle or flat-lay for mood boards.",
    ],
    guideLinks: [
      {
        href: "/guides/stylish-ai-photo-prompts",
        label: "Stylish AI Photo Prompts",
      },
      {
        href: "/guides/how-to-keep-face-same-in-gemini-ai",
        label: "How to Keep Your Face the Same in Gemini",
      },
    ],
    relatedStyleIds: ["soft-daylight-lifestyle", "editorial-flat-lay", "color-pop-pedestal"],
  },
  "editorial-flat-lay": {
    title: "Flat Lay Product Photography AI Prompt",
    h1: "Flat Lay Product Photography AI Prompt (Overhead)",
    description:
      "Overhead flat-lay product AI prompt with soft props and shadow. Distinct from white packshot and window lifestyle. Free in Gemini and ChatGPT.",
    intro: `This editorial flat-lay prompt turns a single product photo into a top-down composition: warm paper or linen surface, restrained props at the edges, and soft directional daylight. It is aimed at brand kits, lookbooks, and social posts where an overhead story reads clearer than a straight-on packshot. Copy the prompt into Gemini or ChatGPT with your item attached.

The angle is the differentiator. White packshot keeps a frontal studio view; soft daylight lifestyle keeps a desk-level scene; this look forces a bird’s-eye crop so the product sits as the largest central shape with intentional negative space. Props stay secondary—notebook, pencil, fabric—never competing with the hero object.

Use it when you sell goods that photograph well from above: skincare, stationery, accessories, small electronics, or gift sets. Keep labels facing up in the source when possible. If the model adds clutter, ask it to remove props until only two or three quiet supporting pieces remain.`,
    tips: [
      "Upload a photo where the product face (label or design) is already readable from above.",
      "Ask for asymmetrical spacing if the layout feels too centered or crowded.",
      "Keep this separate from packshot and lifestyle looks so galleries do not feel duplicated.",
    ],
    guideLinks: [
      {
        href: "/guides/stylish-ai-photo-prompts",
        label: "Stylish AI Photo Prompts",
      },
      {
        href: "/guides/how-to-keep-face-same-in-gemini-ai",
        label: "How to Keep Your Face the Same in Gemini",
      },
    ],
    relatedStyleIds: ["pure-white-packshot", "soft-daylight-lifestyle", "botanical-wellness-still-life"],
  },
  "cute-3d-toon-pet": {
    title: "Cute 3D Toon Pet AI Photo Prompt",
    h1: "Cute 3D Toon Pet AI Photo Prompt",
    description:
      "Turn your pet into a polished 3D toon character with real markings kept. Free copy-paste prompt for Gemini and ChatGPT.",
    intro: `The cute 3D toon pet prompt is for pet parents who want a polished animated character—not a photoreal restyle and not a flat sticker chibi. Upload a clear photo of your dog, cat, or other companion, then paste the prompt into Gemini or ChatGPT. The edit keeps coat pattern, ear shape, and eye colour while rebuilding the body as a soft, expressive 3D toon with cozy home lighting.

This look sits between cartoon animation pet and anime companion: more sculpted volume and studio-like shading than a 2D cel, but warmer and cuter than a hard game-asset render. It is a strong match for profile pictures, birthday cards, and Halloween pet posts when you want charm without losing the animal you recognize.

Use a sharp photo with the face unobscured and fur detail visible. If the model smooths away unique markings, name them in a short follow-up. Pair with storybook or funny everyday pet styles when you want a different mood, but keep this page focused on the 3D toon character finish.`,
    tips: [
      "Prefer a well-lit face crop; side profiles can lose eye detail in 3D restyles.",
      "Name breed markings or collar colours if they disappear after the first pass.",
      "Works in Gemini and ChatGPT; keep one pet per upload for cleaner results.",
    ],
    guideLinks: [
      {
        href: "/guides/halloween-ai-prompts-for-selfies",
        label: "Halloween AI Prompts for Selfies",
      },
      {
        href: "/guides/anime-ai-photo-prompts",
        label: "Anime AI Photo Prompts",
      },
    ],
    relatedStyleIds: ["cartoon-animation-pet", "anime-companion", "storybook-adventure-pet"],
  },
  "golden-twirl-storyboard": {
    title: "Golden Hour Twirl AI Photo Prompt",
    h1: "Golden Hour Twirl AI Photo Prompt for Girls",
    description:
      "Golden-hour twirl street storyboard AI prompt for girls: flowing dress, warm sun, motion. Free for Gemini and ChatGPT.",
    intro: `This golden-hour twirl prompt is for anyone who wants a cinematic street storyboard—skirt or dress in motion, warm low sun, and a joyful spin—while keeping a real face. Paste it into Gemini or ChatGPT with a clear portrait. It is a travel-adjacent movement frame, not a static wildflower bouquet walk and not a crowded night editorial.

The storyboard angle matters: the edit sells motion and golden light more than outfit branding. Fabric flare, rim light, and a soft old-city or open-street backdrop stay supportive. Use it for Diwali-adjacent festive reels, vacation edits, or portrait posts when you want energy without confetti or night crowds.

Start with a photo that has room for a three-quarter or full-body crop. If the face softens during the spin, ask the model to freeze a recognizable expression and preserve skin tone. Cross-link to travel fashion bouquet when you want flowers and a walk instead of a twirl.`,
    tips: [
      "Leave space below the waist in the source so the twirl fabric has room to render.",
      "Ask for “sharp face, soft skirt motion” if identity blurs with movement.",
      "Try Gemini for quick light locks; ChatGPT often handles longer wardrobe notes well.",
    ],
    guideLinks: [
      {
        href: "/guides/diwali-couple-ai-photo-editing-prompts",
        label: "Diwali Couple AI Photo Editing Prompts",
      },
      {
        href: "/guides/stylish-ai-photo-prompts",
        label: "Stylish AI Photo Prompts",
      },
    ],
    relatedStyleIds: ["travel-fashion-bouquet", "joyful-outdoor-lifestyle", "crimson-bloom-shadows"],
  },
  "dark-crowd-editorial": {
    title: "Night Crowd Editorial AI Photo Prompt",
    h1: "Night Crowd Editorial Cinematic AI Photo Prompt",
    description:
      "Sharp subject in a blurred night crowd: cinematic editorial AI photo prompt. Distinct from urban street fashion. Free in Gemini and ChatGPT.",
    intro: `The dark crowd editorial prompt isolates one sharp subject inside a soft night crowd—think after-hours street energy without losing facial identity. It is for creators who want cinematic depth: you stay crisp; passersby melt into motion blur. Use Gemini or ChatGPT with a three-quarter portrait that already has decent face light.

Unlike urban street fashion editorial, this page leans into night contrast and anonymous crowd texture rather than daylight motion-blur fashion polish. It is also not neon cyberpunk techwear; wardrobe stays refined and contemporary so the face and silhouette lead. Good for album covers, mood posts, and fashion tests that need city atmosphere without readable signage.

Keep sunglasses optional—if eyes matter, say so. If the crowd becomes a second focal person, ask the model to keep only anonymous silhouettes. Pair with urban street fashion when you want a cleaner daylight strut instead.

Who it is for: nightlife creators, musicians, and fashion testers who want city density without turning the frame into a neon techwear poster. Works with Gemini and ChatGPT the same way—attach one photo, paste the prompt, then correct only crowd density or face light if needed. Keep this page bookmarked separately from urban street fashion so Google (and readers) see night isolation as its own job, not a duplicate of the daylight strut.`,
    tips: [
      "Upload a portrait with even face light; night scenes amplify underexposure.",
      "Request “anonymous crowd only” if extra faces start competing.",
      "Works in both Gemini and ChatGPT; keep logos and readable text out of the ask.",
    ],
    guideLinks: [
      {
        href: "/guides/stylish-ai-photo-prompts",
        label: "Stylish AI Photo Prompts",
      },
      {
        href: "/guides/how-to-keep-face-same-in-gemini-ai",
        label: "How to Keep Your Face the Same in Gemini",
      },
    ],
    relatedStyleIds: [
      "urban-street-fashion-editorial",
      "neon-street-fashion-ai-photo-prompt",
      "joyful-outdoor-lifestyle",
    ],
  },
  "crimson-bloom-shadows": {
    title: "Rose Shadow Close-Up AI Photo Prompt",
    h1: "Rose Shadow Close-Up AI Photo Prompt",
    description:
      "Close floral beauty AI prompt with crimson rose shadows on the face. Soft, intimate, not a full travel scene. Free for Gemini and ChatGPT.",
    intro: `Crimson bloom shadows is a close beauty frame: rose petals and soft crimson shadow play across a recognizable face. It is for portrait lovers who want floral intimacy—not a full travel street, not a purple-smoke drama wrap, and not a confetti outdoor candid. Paste into Gemini or ChatGPT with a clear close or chest-up photo.

The crop stays tight so petal edges and skin texture share the frame. Wardrobe stays minimal so the face and flowers lead. Use it for seasonal beauty posts, Valentine-adjacent edits, or cinematic stills when you want botanical mood without rebuilding an entire street set.

If petals obscure the eyes, ask for a small reposition. Keep skin tone exact; floral colour grading should not bleach or oversmooth. When you want motion and golden streets instead, switch to golden twirl or travel fashion bouquet.

Who it is for: beauty and portrait fans who want botanical intimacy on a phone upload. Paste into Gemini or ChatGPT; both keep face-lock lines when you leave them intact. Tips that stay unique to this rose-shadow crop: name the petal colour, keep shoulders simple, and avoid asking for a full travel street rebuild. That keeps the page clearly different from wildflower travel walks and purple smoke artwork wraps.`,
    tips: [
      "Prefer a close portrait with soft existing light so shadow play stays natural.",
      "Name lipstick or jewellery to keep if beauty details drift.",
      "Gemini and ChatGPT both work; shorter follow-ups beat full regenerations.",
    ],
    guideLinks: [
      {
        href: "/guides/stylish-ai-photo-prompts",
        label: "Stylish AI Photo Prompts",
      },
      {
        href: "/guides/halloween-ai-prompts-for-selfies",
        label: "Halloween AI Prompts for Selfies",
      },
    ],
    relatedStyleIds: [
      "purple-smoke-portrait-ai-photo-prompt",
      "golden-twirl-storyboard",
      "intimate-cinematic-portrait",
    ],
  },
  "joyful-outdoor-lifestyle": {
    title: "Confetti Outdoor Candid AI Photo Prompt",
    h1: "Confetti Outdoor Candid AI Photo Prompt",
    description:
      "Bright outdoor candid with floating confetti: joyful lifestyle AI photo prompt. Free copy-paste for Gemini and ChatGPT.",
    intro: `This joyful outdoor lifestyle prompt builds a bright park-side candid—light clothes, soft trees, and sparse colourful confetti—while locking a real smile and face. It is for birthday-adjacent posts, graduation energy, and friend-group solos that need celebration without a formal studio. Use Gemini or ChatGPT with an outdoor-friendly portrait.

It is deliberately different from dark crowd night editorials and golden-hour twirls: daylight, optimism, and confetti, not noir streets or spinning skirts. A simple notebook or book prop can appear, but the face stays primary. Keep the scene uncluttered so confetti reads as accent, not noise.

Choose a source with a natural expression and hands clear of the face. If confetti densifies into mush, ask for fewer, sharper pieces. Cross-link birthday or stylish guides when you need outfit-first looks instead of celebration atmosphere.

Who it is for: birthday-adjacent posts, graduation energy, and bright social portraits that still need a real smile. Gemini and ChatGPT both accept the same copy-paste block with one clear photo. Practical tip: ask for sparse confetti and exact skin tone in the same follow-up if warmth creeps too orange. That advice is specific to this candid daylight celebration look, not to night crowds or golden-hour twirls.`,
    tips: [
      "Start with daylight source photos; night uploads fight the sunny grade.",
      "Ask for “sparse confetti” if the frame gets busy.",
      "Works in Gemini and ChatGPT; preserve skin tone when warmth increases.",
    ],
    guideLinks: [
      {
        href: "/guides/birthday-ai-photo-prompts",
        label: "Birthday AI Photo Prompts",
      },
      {
        href: "/guides/stylish-ai-photo-prompts",
        label: "Stylish AI Photo Prompts",
      },
    ],
    relatedStyleIds: ["golden-twirl-storyboard", "travel-fashion-bouquet", "dark-crowd-editorial"],
  },
  "travel-fashion-bouquet": {
    title: "Wildflower Travel Fashion AI Photo Prompt",
    h1: "Wildflower Travel Fashion AI Photo Prompt",
    description:
      "Golden-hour travel fashion with a wildflower bouquet: cinematic AI photo prompt. Free for Gemini and ChatGPT.",
    intro: `Travel fashion bouquet is a walking golden-hour portrait with flowing summer clothes and a wildflower bundle in an old-city street—vacation energy with fashion polish. Paste into Gemini or ChatGPT when you want travel storytelling, not a close rose beauty crop and not a confetti park candid.

The bouquet and stroll set the angle: flowers as a carried prop, soft rim light, romantic street depth. Face identity stays locked while wardrobe and background rebuild. Ideal for trip recaps, soft editorial posts, and Diwali-adjacent festive walks when lanterns are not required.

Give the model room for a walking crop—avoid ultra-tight headshots as the only source. If flowers overtake the face, ask to lower the bouquet. Pair with golden twirl when you want spin motion instead of a bouquet walk.

Who it is for: travellers and fashion posters who want a walking golden-hour story with flowers as a carried prop. It works in Gemini and ChatGPT—attach a torso-visible portrait so the bouquet and stride can render. Tip unique to this page: if petals hide the chin, lower the bouquet rather than regenerating the whole street. That keeps the wildflower travel angle distinct from close rose-shadow beauty and from confetti park candids.`,
    tips: [
      "Upload a portrait with torso visible so the bouquet and stride can read.",
      "Name dress colour preferences in a follow-up if the first outfit misses.",
      "Gemini and ChatGPT both handle this; keep text and logos out of the scene.",
    ],
    guideLinks: [
      {
        href: "/guides/stylish-ai-photo-prompts",
        label: "Stylish AI Photo Prompts",
      },
      {
        href: "/guides/diwali-couple-ai-photo-editing-prompts",
        label: "Diwali Couple AI Photo Editing Prompts",
      },
    ],
    relatedStyleIds: ["golden-twirl-storyboard", "joyful-outdoor-lifestyle", "crimson-bloom-shadows"],
  },
  "urban-street-fashion-editorial": {
    title: "Urban Street Fashion AI Prompt for Men",
    h1: "Urban Street Fashion AI Photo Prompt for Men",
    description:
      "High-fashion city street AI photo prompt for men with motion-blur crowd. Daylight editorial, not neon cyberpunk. Free in Gemini and ChatGPT.",
    intro: `Urban street fashion editorial is a daylight-to-dusk city fashion frame for men: refined dark streetwear, confident three-quarter pose, and a sharply focused subject against a softly moving crowd. Copy into Gemini or ChatGPT when you want magazine street style—not neon wet asphalt cyber fashion and not a night anonymous-crowd noir plate.

The sibling difference is lighting and wardrobe intent. Neon street fashion pushes pink-cyan nightlife; dark crowd editorial pushes night isolation; this page keeps polished fashion photography contrast with readable outfit detail. Sunglasses can stay subtle so the face still reads.

Use a clear portrait suitable for a three-quarter crop. If the crowd creates a second hero face, request anonymous motion only. Strong for boys’ attitude-adjacent posts and stylish guide cross-links when the goal is city fashion rather than car or bike props.

Who it is for: men and boys who want magazine street style with a real face, not a car or bike prop shot. Copy into Gemini or ChatGPT; keep sunglasses optional so eyes can stay visible. Tip: say “anonymous motion-blur crowd only” when extra faces appear. That instruction belongs to this daylight editorial strut and helps separate it from neon wet-street fashion and dark night-crowd plates.`,
    tips: [
      "Prefer even facial light in the source; heavy shadows fight editorial polish.",
      "Say whether to keep or remove sunglasses so eyes stay intentional.",
      "Works in Gemini and ChatGPT; avoid asking for brand logos on clothes.",
    ],
    guideLinks: [
      {
        href: "/guides/stylish-ai-photo-prompts",
        label: "Stylish AI Photo Prompts",
      },
      {
        href: "/guides/trending-ai-photo-prompts-for-boys",
        label: "Trending AI Photo Prompts for Boys",
      },
    ],
    relatedStyleIds: [
      "neon-street-fashion-ai-photo-prompt",
      "dark-crowd-editorial",
      "iceberg-runway-fashion-ai-photo-prompt",
    ],
  },

  // ── Group B: keyword-overlap siblings needing distinct angles ────────────
  "neon-street-fashion-ai-photo-prompt": {
    title: "Neon Wet-Street Fashion AI Photo Prompt",
    h1: "Neon-Lit Wet Street Fashion AI Photo Prompt",
    description:
      "Editorial streetwear on a wet neon street at night—pink and cyan glow, not daylight urban editorial. Free for Gemini and ChatGPT.",
    intro: `This neon street fashion prompt is nightlife editorial: reflective wet asphalt, pink-cyan signage glow, and a confident streetwear stride with your real face kept. It is not the charcoal daylight urban street fashion editorial, and it is not an action fight freeze or cyberpunk market dash. Paste into Gemini or ChatGPT with a clear standing portrait.

The angle is fashion-first under neon—outfit silhouette, posture, and colour contrast—rather than combat motion or arctic couture. Keep logos off clothing. Use it for night-out portfolios and stylish cyber-adjacent looks when you still want wearable street clothes, not full techwear lore.

If neon blooms crush facial detail, ask for softer rim light on the face. Pair related styles toward iceberg runway for a cold couture contrast, or urban street fashion for a daylight sibling.

Who it is for: creators building night-out lookbooks who still want wearable street clothes under pink-cyan glow. Paste into Gemini or ChatGPT with a standing portrait. Tip unique here: protect skin tone under magenta light before you push stronger neon. That keeps the wet-street fashion editorial different from cyberpunk market clutter and from action fight freeze-frames on the same rainy asphalt idea.`,
    tips: [
      "Upload a full or three-quarter body photo so the stride can read on wet pavement.",
      "Ask to keep skin tone accurate under strong magenta/cyan light.",
      "Distinct from cyberpunk market: this page stays fashion editorial, not vendor-alley chaos.",
    ],
    guideLinks: [
      {
        href: "/guides/stylish-ai-photo-prompts",
        label: "Stylish AI Photo Prompts",
      },
    ],
    relatedStyleIds: [
      "urban-street-fashion-editorial",
      "iceberg-runway-fashion-ai-photo-prompt",
      "cyberpunk-street-market-ai-photo-prompt",
      "dark-crowd-editorial",
    ],
  },
  "iceberg-runway-fashion-ai-photo-prompt": {
    title: "Iceberg Runway Fashion AI Photo Prompt",
    h1: "Floating Iceberg Runway Fashion AI Photo Prompt",
    description:
      "Couture coat on a floating iceberg runway over still arctic water—cold silver-blue fashion, not neon streetwear. Free in Gemini and ChatGPT.",
    intro: `Iceberg runway fashion stages a couture walk on a floating ice platform over calm arctic water—silver-blue grade, sculpted coat, editorial posture. It answers a different brief than neon wet-street fashion: cold, minimal, and high-fashion rather than nightlife streetwear. Use Gemini or ChatGPT with a portrait that can support a full-length coat crop.

Keep the face recognizable against the icy rim light. Avoid turning the scene into a survival documentary; the runway metaphor should stay fashion-clean. No neon signs, no rain market stalls, no fight choreography.

This page is ideal when you want extreme location fashion without city grit. If ice texture overwhelms the figure, ask for a simpler platform and stronger subject separation. Related neon and urban looks help readers jump back to city editorials when they want warmth and asphalt instead.

Who it is for: high-fashion experiments that need an extreme cold location without city grit. Works in Gemini and ChatGPT—prefer a source that shows coat-friendly shoulders. Tip: ask for “couture platform, not survival trek” if ice and wind start to dominate. That single correction protects the iceberg runway angle so it does not collapse into generic winter coats or neon streetwear siblings.`,
    tips: [
      "Prefer a source with visible torso and shoulders for coat draping.",
      "Request “couture runway, not wilderness trek” if the scene goes too documentary.",
      "Gemini and ChatGPT both work; lock hair colour before pushing colder grades.",
    ],
    guideLinks: [
      {
        href: "/guides/stylish-ai-photo-prompts",
        label: "Stylish AI Photo Prompts",
      },
      {
        href: "/guides/winter-ai-photo-prompts",
        label: "Winter AI Photo Prompts",
      },
    ],
    relatedStyleIds: [
      "neon-street-fashion-ai-photo-prompt",
      "urban-street-fashion-editorial",
      "purple-smoke-portrait-ai-photo-prompt",
    ],
  },
  "purple-smoke-portrait-ai-photo-prompt": {
    title: "Purple Smoke Portrait AI Photo Prompt",
    h1: "Purple Smoke Artwork Portrait AI Photo Prompt",
    description:
      "Dramatic portrait wrapped in violet smoke and rim light—beauty/atmosphere art, not rose-petal close-ups. Free for Gemini and ChatGPT.",
    intro: `Purple smoke portrait wraps a recognizable face in swirling violet haze with hard rim light—artwork energy for album covers and dramatic profile posts. It is not crimson rose petal beauty and not a photographer-with-camera studio prop shot. Paste into Gemini or ChatGPT with a clear head-and-shoulders photo.

The distinct angle is colour and atmosphere: smoke as the set, not flowers, not neon streets. Keep skin texture real so the edit does not turn into a plastic beauty filter. Wardrobe can stay simple; the smoke does the storytelling.

If smoke covers the eyes, ask for a clear facial window. Related styles point to rose shadow for floral intimacy and photographer red tee for a clean studio craft portrait instead of vapour drama.

Who it is for: album-cover and dramatic profile edits that want violet atmosphere without floral props. Gemini and ChatGPT both handle the smoke wrap when the face crop is sharp. Tip unique to this artwork portrait: keep a clear window around the eyes, then thicken smoke only at the edges. That workflow separates purple smoke from rose-shadow close-ups and from clean photographer studio craft shots.`,
    tips: [
      "Use a sharp face crop; heavy smoke needs strong identity anchors.",
      "Say “keep iris colour and eyebrows” if features soften.",
      "Works in Gemini and ChatGPT; one lighting follow-up beats regenerating the whole cloud.",
    ],
    guideLinks: [
      {
        href: "/guides/stylish-ai-photo-prompts",
        label: "Stylish AI Photo Prompts",
      },
      {
        href: "/guides/gemini-headshot-cv-photo-prompts",
        label: "Gemini Headshot & CV Photo Prompts",
      },
    ],
    relatedStyleIds: [
      "crimson-bloom-shadows",
      "photographer-red-t-shirt-studio-portrait-ai-prompt",
      "iceberg-runway-fashion-ai-photo-prompt",
    ],
  },
  "photographer-red-t-shirt-studio-portrait-ai-prompt": {
    title: "Photographer Red Tee Studio AI Prompt",
    h1: "Photographer in Red T-Shirt Studio Portrait AI Prompt",
    description:
      "Studio portrait of you as a photographer in a plain red tee with an unbranded camera—creator craft shot, not a CV headshot. Free in Gemini and ChatGPT.",
    intro: `This photographer red-tee studio prompt casts you as the creator: plain red shirt, unbranded camera body, clean neutral backdrop, mid-shot craft portrait. It is for personal branding that shows “I make pictures,” not a passport crop and not a purple-smoke beauty plate. Use Gemini or ChatGPT with a clear chest-up photo.

The angle is occupational storytelling inside a calm studio—hands and camera readable, face locked, no brand logos on the gear. Keep it distinct from LinkedIn navy-blazer headshots; this page allows a more casual creator vibe while still looking intentional.

If the camera becomes a named brand, ask for a generic body. Related purple smoke and headshot guide links help readers choose atmosphere art versus professional CV crops.

Who it is for: creators and photographers who want a casual studio craft portrait holding an unbranded camera. Paste into Gemini or ChatGPT; keep the backdrop plain so the red tee leads. Tip: force generic camera text if a brand logo appears. That occupational storytelling angle stays distinct from CV headshots and from purple-smoke beauty drama on nearby style pages.`,
    tips: [
      "Upload a portrait with both shoulders visible so the camera hold can compose.",
      "Request unbranded camera text if logos appear.",
      "Gemini and ChatGPT both fine; keep the backdrop simple so the red tee leads.",
    ],
    guideLinks: [
      {
        href: "/guides/gemini-headshot-cv-photo-prompts",
        label: "Gemini Headshot & CV Photo Prompts",
      },
      {
        href: "/guides/stylish-ai-photo-prompts",
        label: "Stylish AI Photo Prompts",
      },
    ],
    relatedStyleIds: [
      "purple-smoke-portrait-ai-photo-prompt",
      "crimson-bloom-shadows",
      "navy-blazer-linkedin-profile-picture-prompt-gemini",
    ],
  },
  "cyberpunk-hacker-ai-photo-prompt": {
    title: "Cyberpunk Hacker Desk AI Photo Prompt",
    h1: "Cyberpunk Hacker Monitor-Wall AI Photo Prompt",
    description:
      "Indoor cyberpunk hacker desk with monitor glow and holograms—not the rainy street market sibling. Free for Gemini and ChatGPT.",
    intro: `Cyberpunk hacker is an indoor terminal scene: dark room, wall of monitors, green-cyan code glow, optional floating holograms, and you at the desk with a recognizable face. It is intentionally separate from cyberpunk street market, which is an outdoor rainy vendor alley dash in techwear. Do not merge the two looks—desk lore versus night-market motion.

Paste into Gemini or ChatGPT when you want character-select energy for a hacker persona, stream overlays, or story art. Keep readable UI nonsense minimal so the face stays primary. Wardrobe can be simple dark layers; the screens supply the cyber signal.

If monitor text becomes real trademarks, ask for abstract glyphs only. Related street market and neon fashion pages cover outdoor nightlife when you leave the desk.

Who it is for: character boards and stream personas that need an indoor terminal fantasy with real facial identity. Use Gemini or ChatGPT; ask for abstract glyphs on screens so no real UI brands appear. Tip: lock face light before adding more holograms. Keeping this desk scene separate from the rainy street-market sibling is the whole point—indoor monitors versus outdoor vendor alleys, never merged.`,
    tips: [
      "Use a clear face photo; screen glare can wash identity if unchecked.",
      "Ask for “abstract code only, no real brand UI.”",
      "Keep this indoor; use street market for outdoor neon rain instead.",
    ],
    guideLinks: [
      {
        href: "/guides/stylish-ai-photo-prompts",
        label: "Stylish AI Photo Prompts",
      },
      {
        href: "/guides/trending-ai-photo-prompts-for-boys",
        label: "Trending AI Photo Prompts for Boys",
      },
    ],
    relatedStyleIds: [
      "cyberpunk-street-market-ai-photo-prompt",
      "neon-street-fashion-ai-photo-prompt",
      "main-character-game-menu-ai-photo-prompt",
      "cybernetic-warrior-gothic-cathedral-ai-photo-prompt",
    ],
  },
  "cyberpunk-street-market-ai-photo-prompt": {
    title: "Cyberpunk Street Market AI Photo Prompt",
    h1: "Cyberpunk Rainy Street Market AI Photo Prompt",
    description:
      "Dash through a rainy cyberpunk night market in techwear—outdoor alley energy, not the indoor hacker desk. Free in Gemini and ChatGPT.",
    intro: `Cyberpunk street market drops you into a rainy night vendor alley: teal-magenta neon, techwear layers, motion through stalls, wet reflections. The angle is outdoor kinetic nightlife—not the indoor hacker monitor wall. Keep these pages distinct so searchers get the right scene.

Use Gemini or ChatGPT with a standing portrait. Face identity stays locked while the market rebuilds around you. Avoid readable shop brands. Compared with neon street fashion, this look pushes denser market clutter and techwear function over pure editorial streetwear.

If stalls crowd the face, ask for a clearer foreground subject. Cross-link hacker for desk lore and neon fashion for cleaner wet-street fashion without vendor density.

Who it is for: outdoor cyber nightlife edits—techwear, wet reflections, dense stalls—without sitting at a hacker desk. Paste into Gemini or ChatGPT with a stride-friendly portrait. Tip: thin the stall crowd if the face loses priority, and keep shop signs fictional. That rainy market dash stays a different job from neon fashion strides and from indoor monitor-wall hacker portraits.`,
    tips: [
      "Prefer a full-body friendly source so stride and coat silhouette read.",
      "Request anonymous signage if text becomes real store names.",
      "Outdoor rain market only—switch to hacker for indoor screens.",
    ],
    guideLinks: [
      {
        href: "/guides/stylish-ai-photo-prompts",
        label: "Stylish AI Photo Prompts",
      },
      {
        href: "/guides/trending-ai-photo-prompts-for-boys",
        label: "Trending AI Photo Prompts for Boys",
      },
    ],
    relatedStyleIds: [
      "cyberpunk-hacker-ai-photo-prompt",
      "neon-street-fashion-ai-photo-prompt",
      "action-heroine-neon-street-fight-ai-photo-prompt",
      "dark-crowd-editorial",
    ],
  },
  "action-heroine-neon-street-fight-ai-photo-prompt": {
    title: "Action Heroine Neon Fight AI Prompt",
    h1: "Action Heroine Neon Street Fight AI Photo Prompt",
    description:
      "Action-movie heroine mid-kick on a rainy neon street—combat freeze-frame, not fashion stride. Free for Gemini and ChatGPT.",
    intro: `Action heroine neon street fight freezes a mid-kick combat beat on rainy neon asphalt—movie poster energy with your face. It is not neon street fashion’s calm strut and not the cybernetic warrior’s flooded cathedral. Paste into Gemini or ChatGPT when you want choreography and impact, not couture posing.

Keep the face sharp even if limbs blur slightly from motion. Wardrobe can read as practical action layers. Avoid real city trademarks on signs. Related cybernetic warrior offers armored gothic fantasy; neon fashion offers non-combat nightlife styling.

If the kick pose distorts hands or face, ask to stabilize identity first, then restore the kick. Works for cinematic character boards and stylish-adjacent action posts.

Who it is for: cinematic character posters that need a mid-kick freeze with a recognizable face. Works in Gemini and ChatGPT; stabilize likeness before restoring limb motion if features smear. Tip unique to this fight frame: ask for poster composition, not documentary violence. That keeps the heroine combat angle clear of neon fashion walks and of the slower cybernetic cathedral warrior mood.`,
    tips: [
      "Use a clear face source; action poses stress likeness more than standing portraits.",
      "Ask “poster freeze-frame, recognizable face” if motion softens features.",
      "Gemini and ChatGPT both work; keep combat fantasy, not real-world violence branding.",
    ],
    guideLinks: [
      {
        href: "/guides/stylish-ai-photo-prompts",
        label: "Stylish AI Photo Prompts",
      },
      {
        href: "/guides/anime-ai-photo-prompts",
        label: "Anime AI Photo Prompts",
      },
    ],
    relatedStyleIds: [
      "cybernetic-warrior-gothic-cathedral-ai-photo-prompt",
      "neon-street-fashion-ai-photo-prompt",
      "cyberpunk-street-market-ai-photo-prompt",
    ],
  },
  "cybernetic-warrior-gothic-cathedral-ai-photo-prompt": {
    title: "Cybernetic Warrior Cathedral AI Prompt",
    h1: "Cybernetic Warrior in Gothic Cathedral AI Prompt",
    description:
      "Half-chrome cyborg warrior in a flooded gothic cathedral—armored fantasy, not neon street fight. Free for Gemini and ChatGPT.",
    intro: `Cybernetic warrior gothic cathedral places a half-chrome armored figure knee-deep in a flooded nave with cold steel and gold light shafts. The angle is sacred-ruin sci-fi—not a neon street kick and not a hacker desk. Use Gemini or ChatGPT with a portrait that can support armor plating while keeping the human face recognizable.

Let cathedral architecture and water reflections carry atmosphere; avoid turning it into a street market. Compared with action heroine, this page sells stillness and armor lore over martial freeze-frames.

If chrome overwrites facial features, ask to keep skin on the human half exact. Related action heroine and cyberpunk hacker cover combat neon and terminal scenes when you leave the cathedral.

Who it is for: sci-fi fantasy portraits that mix chrome armor with sacred architecture and flood water. Paste into Gemini or ChatGPT; name which facial half stays human if plating creeps. Tip: keep the nave interior free of modern street signs. That flooded cathedral stillness is a different brief from neon street fights and from cyberpunk desk or market scenes.`,
    tips: [
      "Name which side of the face stays human if chrome creeps too far.",
      "Request “flooded gothic interior, no modern street signs.”",
      "Works in Gemini and ChatGPT; armor detail follow-ups beat full regen.",
    ],
    guideLinks: [
      {
        href: "/guides/stylish-ai-photo-prompts",
        label: "Stylish AI Photo Prompts",
      },
      {
        href: "/guides/anime-ai-photo-prompts",
        label: "Anime AI Photo Prompts",
      },
    ],
    relatedStyleIds: [
      "action-heroine-neon-street-fight-ai-photo-prompt",
      "cyberpunk-hacker-ai-photo-prompt",
      "main-character-game-menu-ai-photo-prompt",
    ],
  },
  "couple-action-figure-two-pack-ai-prompt": {
    title: "Couple Action Figure Two-Pack AI Prompt",
    h1: "Couple Two-Pack Action Figure AI Prompt",
    description:
      "Couple as two action figures in one premium window box—pair collectible, not a solo desk figure. Free for Gemini and ChatGPT.",
    intro: `Couple action figure two-pack turns two people into blister-box collectibles sharing one premium window package with accessories. Upload two photos (or one of you both) into Gemini or ChatGPT. Faces stay distinct—no blend—while plastic sheen and box graphics sell the toy metaphor.

This is not the solo premium collectible on a desk, not clay stop-motion, and not a game-menu character select. The angle is “shared SKU two-pack” romance/friend merch energy. Keep box text generic.

If faces swap, restate person A and person B order. Related solo collectible and clay group pages offer other 3D toy treatments without the dual-window-box story.

Who it is for: couples and friends who want a shared blister-box toy mockup with two distinct faces. Use Gemini or ChatGPT with person A then person B attached. Tip: restate face order if features average together, and keep box art generic. That two-pack merch story stays separate from the solo desk collectible, clay stop-motion groups, and game-menu UI heroes.`,
    tips: [
      "Attach person A then person B in one message for cleaner pairing.",
      "Ask for separate face locks if features start to average.",
      "See the merge guide when you need broader two-photo technique tips.",
    ],
    guideLinks: [
      {
        href: "/guides/how-to-merge-two-photos-in-gemini",
        label: "How to Merge Two Photos in Gemini",
      },
      {
        href: "/guides/anime-ai-photo-prompts",
        label: "Anime AI Photo Prompts",
      },
    ],
    relatedStyleIds: [
      "ai-action-figure-prompt-premium-collectible",
      "clay-stop-motion-group-ai-photo-prompt",
      "main-character-game-menu-ai-photo-prompt",
    ],
  },
  "ai-action-figure-prompt-premium-collectible": {
    title: "Premium Collectible Action Figure AI Prompt",
    h1: "Premium Collectible Action Figure AI Prompt",
    description:
      "You as a 1/7-scale collectible figure with a premium window box on a desk—solo shelf toy, not a couple two-pack. Free in Gemini and ChatGPT.",
    intro: `Premium collectible action figure renders you as a 1/7-scale shelf toy with a window box on a desk—clean studio daylight, plastic materials, collector presentation. One photo in Gemini or ChatGPT. It is the solo counterpart to the couple two-pack and distinct from clay stop-motion handmade texture or a glowing game-menu UI.

The angle is merch mockup: figure plus packaging on a real desk plane. Keep face sculpt faithful. Avoid branded box logos. Use it for creator merch concepts, birthday gifts jokes, and 3D avatar fun without anime cel shading.

If the figure face drifts, ask to match the upload’s hairline and skin tone exactly. Related couple two-pack and game menu pages cover dual packaging and UI hero treatments.

Who it is for: solo merch concepts—1/7-scale figure plus window box on a real desk. Paste one photo into Gemini or ChatGPT; demand exact hairline and skin tone on the sculpt. Tip: strip brand logos from the box if they appear. This shelf-toy angle is not a couple two-pack, not claymation, and not a glowing character-select screen.`,
    tips: [
      "Use a sharp front-facing portrait for cleaner face sculpts on the figure.",
      "Request generic box art if real logos appear.",
      "Solo desk collectible only—use the two-pack style for couples.",
    ],
    guideLinks: [
      {
        href: "/guides/anime-ai-photo-prompts",
        label: "Anime AI Photo Prompts",
      },
      {
        href: "/guides/birthday-ai-photo-prompts",
        label: "Birthday AI Photo Prompts",
      },
    ],
    relatedStyleIds: [
      "couple-action-figure-two-pack-ai-prompt",
      "main-character-game-menu-ai-photo-prompt",
      "clay-stop-motion-group-ai-photo-prompt",
    ],
  },
  "clay-stop-motion-group-ai-photo-prompt": {
    title: "Clay Stop-Motion Group AI Photo Prompt",
    h1: "Clay Stop-Motion Group Character AI Photo Prompt",
    description:
      "Group as modeling-clay stop-motion characters in a miniature set—handmade clay, not plastic action-figure packaging. Free for Gemini and ChatGPT.",
    intro: `Clay stop-motion group rebuilds people as fingerprint-friendly modeling-clay puppets inside a tiny handmade set—warm clay colour, soft studio light, stop-motion charm. It is not blister-box plastic collectibles and not a neon game-menu UI. Paste into Gemini or ChatGPT with a group photo (or a clear multi-person frame).

The angle is tactile craft: visible clay material, miniature props, cozy lighting. Keep each face recognizable even in simplified clay form. Great for family fun posts and handmade-animation vibes.

If faces merge, ask to treat each person separately. Related action-figure pages cover plastic packaging instead of clay.

Who it is for: families and friend groups who want handmade clay puppet charm instead of plastic packaging. Works in Gemini and ChatGPT from a clear group photo. Tip: ask for visible fingerprints and clay seams so the material reads as stop-motion, not smooth ABS plastic. That tactile craft angle keeps the page distinct from action-figure box arts and game-menu HUD portraits.`,
    tips: [
      "Prefer evenly lit group photos so every face gets clay detail.",
      "Ask for “visible clay texture, not smooth plastic.”",
      "Gemini and ChatGPT both work; simplify backgrounds if the miniature set gets busy.",
    ],
    guideLinks: [
      {
        href: "/guides/anime-ai-photo-prompts",
        label: "Anime AI Photo Prompts",
      },
      {
        href: "/guides/how-to-merge-two-photos-in-gemini",
        label: "How to Merge Two Photos in Gemini",
      },
    ],
    relatedStyleIds: [
      "couple-action-figure-two-pack-ai-prompt",
      "ai-action-figure-prompt-premium-collectible",
      "main-character-game-menu-ai-photo-prompt",
    ],
  },
  "main-character-game-menu-ai-photo-prompt": {
    title: "Main Character Game Menu AI Prompt",
    h1: "Main Character Game Menu AI Photo Prompt",
    description:
      "You as the playable hero on a glowing character-select screen—UI menu art, not a desk action figure. Free for Gemini and ChatGPT.",
    intro: `Main character game menu places you on a glowing character-select interface—gamer-blue UI panels, playable-hero stance, menu art framing. It is interface fantasy, not a physical collectible on a desk and not claymation. Use Gemini or ChatGPT with a clear portrait.

Keep face identity strong while allowing stylized outfit and HUD chrome. Avoid real game trademarks in the UI. Compared with cyberpunk hacker, this page is character-select presentation, not a narrative desk scene.

If UI text becomes a real title, ask for abstract menu labels. Related action-figure and clay styles cover toy and handmade treatments when you leave the HUD.

Who it is for: gamers and creators who want character-select menu art with a real face in the hero slot. Paste into Gemini or ChatGPT; keep UI labels fictional. Tip: reduce bloom if skin blows out under gamer-blue glow. This interface fantasy is a different product from desk collectibles, clay groups, and cyberpunk hacker desks even when neon colours overlap.`,
    tips: [
      "Upload a confident portrait; menu heroes need a clear face anchor.",
      "Request original fictional UI only—no real game logos.",
      "Works in Gemini and ChatGPT; tone down glow if skin blows out.",
    ],
    guideLinks: [
      {
        href: "/guides/anime-ai-photo-prompts",
        label: "Anime AI Photo Prompts",
      },
      {
        href: "/guides/trending-ai-photo-prompts-for-boys",
        label: "Trending AI Photo Prompts for Boys",
      },
    ],
    relatedStyleIds: [
      "ai-action-figure-prompt-premium-collectible",
      "cyberpunk-hacker-ai-photo-prompt",
      "clay-stop-motion-group-ai-photo-prompt",
    ],
  },
  "hand-painted-anime-picnic-couple-ai-photo-prompt": {
    title: "Hand-Painted Anime Picnic Couple Prompt",
    h1: "Hand-Painted Anime Picnic Couple AI Photo Prompt",
    description:
      "Couple picnic in a hand-painted anime meadow with wind and petals—soft painted film look. Free for Gemini and ChatGPT.",
    intro: `Hand-painted anime picnic couple restyles two people as a soft hand-painted anime meadow picnic—wind, petals, watercolor-like trees, warm storybook light—while keeping both faces distinct. Upload two photos into Gemini or ChatGPT (or one couple frame). It belongs with the Anime guide’s painted looks, not plastic action figures or cyberpunk streets.

The angle is gentle pastoral anime, not power-aura action or chibi stickers. Outfits simplify into painted clothing; identity lines still lock skin tone and hair. Ideal for anniversary edits and soft couple posts.

If faces blend, restate person A / person B. Related anime guide prompts cover meadow solos and countryside family frames when you need other painted scenes.

Who it is for: couples who want a soft hand-painted anime meadow picnic rather than photoreal travel or plastic toy styles. Use Gemini or ChatGPT with two inputs; keep person A and person B separate. Tip: ask for watercolor-like trees and painted clothing simplification while locking skin tone. Linked from the Anime guide so this pastoral picnic stays discoverable beside other anime couple looks.`,
    tips: [
      "Attach person A then person B for cleaner couple merges.",
      "Ask for hand-painted film background, not photoreal grass.",
      "See the Anime guide for more cel and chibi alternatives.",
    ],
    guideLinks: [
      {
        href: "/guides/anime-ai-photo-prompts",
        label: "Anime AI Photo Prompts",
      },
      {
        href: "/guides/how-to-merge-two-photos-in-gemini",
        label: "How to Merge Two Photos in Gemini",
      },
    ],
    relatedStyleIds: [
      "cherry-blossom-anime-couple-prompt-gemini",
      "anime-couple-cherry-blossoms-ai-photo-prompt",
      "turn-photo-into-anime-countryside-family-ai-prompt",
    ],
  },

  // ── Winter add-on 297–303 (fog / cozy aesthetic siblings) ────────────────
  "foggy-road-hoodie-muffler-winter-ai-photo-prompt-boys": {
    title: "Foggy Road Hoodie Muffler Winter Prompt for Boys",
    h1: "Foggy Road Hoodie Muffler Winter AI Photo Prompt for Boys",
    description:
      "Foggy-road winter AI photo prompt for boys: grey hoodie, olive jacket and knit muffler on a misty asphalt road. Keeps your real face.",
    intro: `This foggy-road hoodie and muffler prompt is for boys and young men who want a moody winter walk edit—not a bright snowy valley travel shot and not a night city street with heavy bokeh. Upload one clear chest-up photo, paste the prompt, and keep the face-lock lines so skin tone, hair, and beard stay yours while the outfit and road scene change.

The look centres on a light-grey hoodie under an olive utility jacket with a dark ribbed muffler, walking the middle of a foggy two-lane road lined with bare trees. Soft overcast light and distant headlight glow do the atmosphere work; there is no steaming chai cup and no pine-valley blue sky. That separation keeps this page distinct from the snowfall-chai and snowy-valley winter siblings.

Use a sharp source with even light and no heavy beauty filters. If the muffler hides too much of the jaw, ask for a looser wrap. Pair it with the Winter guide’s foggy street and couple road looks when you want a set, but keep this page focused on the solo boy foggy-road hero.

Who it is for: boys and men who want a viral foggy-road winter edit with hoodie and muffler rather than a puffer-valley travel frame. Tip: ask for soft mist and distant headlights only—heavy fog overlays can wash out the face.`,
    tips: [
      "Prefer a waist-up source so the jacket and muffler read clearly.",
      "Ask to thin the fog if the face starts to fade.",
      "See the Winter guide for chai dhaba and couple foggy-road siblings.",
    ],
    guideLinks: [
      {
        href: "/guides/winter-ai-photo-prompts",
        label: "Winter AI Photo Prompts",
      },
      {
        href: "/guides/how-to-keep-face-same-in-gemini-ai",
        label: "How to Keep Your Face the Same in Gemini",
      },
    ],
    relatedStyleIds: [
      "snowfall-chai-winter-ai-photo-prompt-boys",
      "night-snow-street-winter-ai-photo-prompt-men",
      "chai-dhaba-fog-leather-jacket-winter-ai-photo-prompt-men",
    ],
  },
  "chai-dhaba-fog-leather-jacket-winter-ai-photo-prompt-men": {
    title: "Chai Dhaba Fog Leather Jacket Winter Prompt for Men",
    h1: "Chai Dhaba Fog Leather Jacket Winter AI Photo Prompt for Men",
    description:
      "Foggy chai-dhaba winter AI prompt for men: black leather jacket, cream turtleneck and steaming chai under warm bulbs. Real face kept.",
    intro: `The chai-dhaba fog leather-jacket prompt is built for men who want a warm roadside tea-stall edit with cool winter mist—not the snowy hill-station chai-and-shawl boy look and not a leather street outfit-change with no fog. Attach one clear portrait, keep the identity lines, and let the prompt swap in the black leather jacket, cream turtleneck, and steaming glass of chai.

Warm hanging bulbs and a steaming kettle sit against blue-grey fog so the amber glow stays local to the stall. That contrast is the point: cozy tea light, not crisp mountain daylight. The jacket stays plain and unbranded so the edit stays family-safe and logo-free.

Use this when you already like the Winter guide’s snowfall-chai mood but want leather and fog instead of a wool shawl in a pine valley. If steam covers the face, ask for a thinner steam trail. Related pages cover foggy roads and kurta-pashmina forest looks when you need a different winter wardrobe.

Who it is for: men who want a foggy roadside chai dhaba portrait in a leather jacket rather than a snowy valley puffer shot. Tip: keep “exact skin tone” in every follow-up so warm bulbs do not lighten the face.`,
    tips: [
      "Chest-up sources keep the chai glass and jacket collar sharp.",
      "Ask for cooler fog behind if the whole frame goes amber.",
      "Open the Winter guide for more chai and fog siblings.",
    ],
    guideLinks: [
      {
        href: "/guides/winter-ai-photo-prompts",
        label: "Winter AI Photo Prompts",
      },
      {
        href: "/guides/how-to-keep-face-same-in-gemini-ai",
        label: "How to Keep Your Face the Same in Gemini",
      },
    ],
    relatedStyleIds: [
      "snowfall-chai-winter-ai-photo-prompt-boys",
      "foggy-road-hoodie-muffler-winter-ai-photo-prompt-boys",
      "leather-jacket-street-outfit-change-men",
    ],
  },
  "kurta-pashmina-shawl-snowy-pine-forest-winter-ai-photo-prompt-men": {
    title: "Kurta Pashmina Pine Forest Winter Prompt for Men",
    h1: "Kurta Pashmina Pine Forest Winter AI Photo Prompt for Men",
    description:
      "Snowy pine-forest winter AI prompt for men: charcoal kurta and tan pashmina shawl under soft falling snow. Keeps your real face.",
    intro: `This kurta and pashmina pine-forest prompt is for men who want a traditional winter travel frame—charcoal kurta pajama, tan shawl, snow-laden pines—without turning the edit into a Western puffer-jacket valley shot or a pheran garden look for girls. Upload one clear photo and keep the face-preservation lines so beard, hairline, and skin tone stay locked.

The scene is a quiet snowy pine path with soft mist and falling snow, not a tea stall and not a foggy city street. Holding the shawl at the chest gives a calm, posed travel portrait rather than a walking muffler shot. Footwear stays simple and unbranded.

Use it when you want South Asian winter clothing in a photoreal snow forest. If the shawl hides the jaw, ask for a lower drape. Pair with the Winter guide’s Hunza-style merge when you need two people in a northern valley, but keep this page as the solo kurta hero.

Who it is for: men who want a kurta-and-pashmina snowy pine portrait rather than a hoodie foggy-road or leather chai-dhaba edit. Tip: say “keep exact skin tone against bright snow” if the model lightens the face.`,
    tips: [
      "Waist-up or full-body sources show the shawl drape best.",
      "Ask for softer snowfall if flakes streak across the eyes.",
      "See the Winter guide for couple and merge valley options.",
    ],
    guideLinks: [
      {
        href: "/guides/winter-ai-photo-prompts",
        label: "Winter AI Photo Prompts",
      },
      {
        href: "/guides/how-to-keep-face-same-in-gemini-ai",
        label: "How to Keep Your Face the Same in Gemini",
      },
    ],
    relatedStyleIds: [
      "snowy-valley-winter-ai-photo-prompt-boys",
      "hunza-style-valley-merge-two-photos-winter-prompt",
      "foggy-road-hoodie-muffler-winter-ai-photo-prompt-boys",
    ],
  },
  "pastel-coat-beanie-snowfall-winter-ai-photo-prompt-girls": {
    title: "Pastel Coat Beanie Snowfall Winter Prompt for Girls",
    h1: "Pastel Coat Beanie Snowfall Winter AI Photo Prompt for Girls",
    description:
      "Cozy aesthetic winter AI prompt for girls: pastel pink coat, cream beanie and mittens catching soft snowfall. Real face kept.",
    intro: `The pastel coat and beanie snowfall prompt is a cozy aesthetic winter look for girls—soft pink wool coat, cream knit beanie, mittens catching flakes—distinct from the camel long-coat avenue walk and from the fairy-lights sweater indoor crop. Paste it with one clear photo and keep the identity lines so hair, skin tone, and any head covering stay yours.

The pose looks slightly upward with one mitten raised, which sells the snowfall moment without needing a chai cup or balcony railing. Soft overcast light and a snowy tree path keep the palette creamy and rose-tinted rather than moody fog grey.

Use this when you want a bright, playful winter feed frame. If the beanie changes hair length, restate the original hairstyle. Related Winter guide pages cover pheran gardens and shawl-and-chai balconies when you want warmer South Asian styling instead of pastel outerwear.

Who it is for: girls who want a pastel snowfall aesthetic edit rather than a dark foggy street or fairy-lights night selfie. Tip: ask for soft flakes only—heavy overlays can look fake on mittens and hair.`,
    tips: [
      "Chest-up sources keep the beanie and smile sharp.",
      "Ask to restore hair length if the beanie crops it oddly.",
      "Browse the Winter guide for more girls’ snowfall looks.",
    ],
    guideLinks: [
      {
        href: "/guides/winter-ai-photo-prompts",
        label: "Winter AI Photo Prompts",
      },
      {
        href: "/guides/how-to-keep-face-same-in-gemini-ai",
        label: "How to Keep Your Face the Same in Gemini",
      },
    ],
    relatedStyleIds: [
      "long-coat-snowfall-winter-ai-photo-prompt-girls",
      "shawl-chai-winter-ai-photo-prompt-girls",
      "viral-snowflake-close-up-portrait-winter-ai-photo-prompt",
    ],
  },
  "cinematic-foggy-street-portrait-winter-ai-photo-prompt-women": {
    title: "Cinematic Foggy Street Winter Prompt for Women",
    h1: "Cinematic Foggy Street Winter AI Photo Prompt for Women",
    description:
      "Cinematic foggy-street winter AI prompt for women: grey wool wrap coat and scarf at dusk with warm streetlight bokeh. Face kept.",
    intro: `This cinematic foggy-street portrait is for women who want a dusk city edit—dark grey wrap coat, soft scarf, wet pavement, warm streetlights in fog—not a pastel snowfall park walk and not the night-snow street look written for men. Upload one waist-up photo, keep the face-lock lines, and let the prompt rebuild the foggy urban depth behind you.

The three-quarter stance with the head turned to camera is the differentiator: editorial street portrait energy, not a mid-stride walk down a snowy avenue. Cool fog against amber lamps keeps the grade cinematic without tipping into pure monochrome.

Use it for moody winter feed covers when you already have a clear face and want atmosphere more than props. If streetlights blow out the skin, ask for softer lamp glow. Pair with the Winter guide’s foggy-road boy look or couple shared-shawl road merge when building a fog set.

Who it is for: women who want a foggy dusk street coat portrait rather than a pastel beanie snowfall or fairy-lights indoor crop. Tip: say “keep exact skin tone under streetlights” if warmth pushes the face lighter.`,
    tips: [
      "Waist-up sources show the wrap coat belt and scarf cleanly.",
      "Ask to reduce bokeh if the face softens too much.",
      "See the Winter guide for more fog and coat siblings.",
    ],
    guideLinks: [
      {
        href: "/guides/winter-ai-photo-prompts",
        label: "Winter AI Photo Prompts",
      },
      {
        href: "/guides/how-to-keep-face-same-in-gemini-ai",
        label: "How to Keep Your Face the Same in Gemini",
      },
    ],
    relatedStyleIds: [
      "long-coat-snowfall-winter-ai-photo-prompt-girls",
      "night-snow-street-winter-ai-photo-prompt-men",
      "foggy-road-hoodie-muffler-winter-ai-photo-prompt-boys",
    ],
  },
  "couple-foggy-road-walk-one-shawl-winter-ai-photo-prompt": {
    title: "Couple Foggy Road Walk One Shawl Winter Prompt",
    h1: "Couple Foggy Road Walk One Shawl Winter AI Photo Prompt",
    description:
      "Two-photo couple winter AI prompt: share one shawl on a foggy road walk. Keeps both real faces from separate uploads.",
    intro: `The couple foggy-road one-shawl prompt merges two separate photos into one cozy walk: camel and navy coats under a single beige shawl on a misty road lined with bare trees. It is not the snowy mountain viewpoint couple, not the shared-shawl chai porch, and not the snowfall pine-path merge—those siblings keep different wardrobes and backdrops. Attach person A first and person B second, then keep the dual identity lines.

Both faces stay locked to their source photos while the shared shawl ties the frame together. Soft overcast fog replaces bright snow peaks so the mood stays intimate and cool rather than crisp travel blue. Relative heights stay realistic; do not let the model blend features.

Use this when you only have separate selfies and want a foggy-road couple story. If faces swap, restate person A and person B. Related Winter guide merges cover pine paths and Hunza-style valleys when you want snow instead of fog.

Who it is for: couples who want a two-photo foggy-road shared-shawl edit rather than a snowy mountain railing pose. Tip: match lighting in both sources (both daylight) before you merge.`,
    tips: [
      "Upload person A then person B in the same message.",
      "Ask to restore each face separately if either drifts.",
      "Read the merge guide for more two-photo setups.",
    ],
    guideLinks: [
      {
        href: "/guides/winter-ai-photo-prompts",
        label: "Winter AI Photo Prompts",
      },
      {
        href: "/guides/how-to-merge-two-photos-in-gemini",
        label: "How to Merge Two Photos in Gemini",
      },
    ],
    relatedStyleIds: [
      "shared-shawl-couple-winter-ai-photo-prompt-chai",
      "snowfall-merge-two-photos-winter-ai-prompt-couple",
      "foggy-road-hoodie-muffler-winter-ai-photo-prompt-boys",
    ],
  },
  "viral-snowflake-close-up-portrait-winter-ai-photo-prompt": {
    title: "Viral Snowflake Close-Up Winter Portrait Prompt",
    h1: "Viral Snowflake Close-Up Portrait Winter AI Photo Prompt",
    description:
      "Viral snowflake close-up winter AI prompt: cream turtleneck, sharp flakes in hair, foreground bokeh. Keeps your real face.",
    intro: `This viral snowflake close-up is a tight cozy portrait—cream turtleneck, sharp flakes in the hair, large foreground snowflake bokeh—not a full-body pastel coat walk and not an indoor fairy-lights sweater story crop. Upload a clear chest-up selfie, keep the face-lock lines, and let the prompt add winter atmosphere without changing who you are.

Shallow depth of field and soft overcast light sell the “viral” feed look while skin texture stays natural. The backdrop is a soft snowy blur; there is no road, stall, or forest path competing with the face. That makes this page a portrait-first sibling inside the Winter guide.

Use it for profile pictures and close winter posts. If flakes smear across the eyes, ask for fewer foreground flakes. Pair with the pastel coat snowfall look when you want a matching wider shot after the close-up.

Who it is for: anyone who wants a viral snowflake close-up winter portrait rather than a full scene with coats and roads. Tip: keep “exact skin tone” and “natural skin texture” so bright snow bokeh does not flatten the face.`,
    tips: [
      "Use a sharp close source; heavy filters fight the snowflake detail.",
      "Ask to clear flakes from the eyes if they smear.",
      "See the Winter guide for matching pastel snowfall looks.",
    ],
    guideLinks: [
      {
        href: "/guides/winter-ai-photo-prompts",
        label: "Winter AI Photo Prompts",
      },
      {
        href: "/guides/how-to-keep-face-same-in-gemini-ai",
        label: "How to Keep Your Face the Same in Gemini",
      },
    ],
    relatedStyleIds: [
      "pastel-coat-beanie-snowfall-winter-ai-photo-prompt-girls",
      "fairy-lights-sweater-winter-ai-photo-prompt-girls",
      "shawl-chai-winter-ai-photo-prompt-girls",
    ],
  },

  // ── AdSense uniqueness pilot (intro / tips / FAQs / addon; meta unchanged) ─
  "crimson-bangle-reverie": {
    intro:
      "Built for women who want a jewellery-led traditional look without a studio booking: one selfie becomes a three-panel story of ivory embroidery, stacks of deep red glass bangles, and warm window light. The middle frame is a calm waist-up portrait by a wooden window; the top and bottom panels linger on hands, rings, and bangle texture. Best source: a sharp daytime face photo with bare or lightly dressed wrists so the crimson stacks read clearly.",
    tips: [
      "Upload a clear daytime portrait with wrists visible and free of thick watch straps or bulky bracelets, so the red glass stacks and oxidized kadas can sit cleanly on both hands.",
      "If a panel softens your face or changes your hairline, rerun once with a sharper source and ask to keep the same face shape, eyes, and natural skin tone across all three panels.",
      "When bangles look melted or rings multiply, ask for fewer, sharper glass bangles with realistic metal reflections and five natural fingers on each hand.",
    ],
    faqs: [
      {
        question: "Why is this a three-panel image instead of one portrait?",
        answer:
          "The style is a vertical triptych by design: hand-and-bangle close-ups frame a soft window portrait so jewellery and embroidery stay the story, not a single full-length pose.",
      },
      {
        question: "What should I wear in the source photo?",
        answer:
          "Everyday clothes are fine. The prompt replaces the outfit with an ivory embroidered traditional dress when clothing is not preserved; a clear face and natural wrists matter more than festive wear in the upload.",
      },
    ],
    addonLine:
      "Want a softer evening mood in the same triptych? Add: keep the ivory embroidery and crimson glass bangles, but shift the window light slightly warmer and lower, with gentler shadows on the hands and a quieter, more intimate expression.",
  },
  "diwali-couple-poses-diya-doorway": {
    intro:
      "Made for couples who want a quiet Diwali doorway portrait rather than a rooftop fireworks frame: you stand back-to-back in a marigold-framed wooden entrance, clay diyas glowing along the threshold, both faces turned toward the camera. Outfits stay modest—festive lehenga or silk saree with a full blouse for one partner, ivory or deep-blue kurta for the other. Upload two clear face photos, or one shot of you both, with similar lighting so heights and skin tones stay honest.",
    tips: [
      "Prefer two separate portraits taken from a similar camera height; mismatched angles are the usual reason one partner looks taller or farther away in the doorway.",
      "If faces blend or swap, name which upload is person A and person B, and ask to keep each exact skin tone, hairstyle, and age with no beautify pass.",
      "When diyas smear into a yellow smear underfoot, ask for a neat row of distinct clay diyas on the threshold and warm light from inside the doorway only.",
    ],
    faqs: [
      {
        question: "Do we need a photo that already shows us back-to-back?",
        answer:
          "No. Separate clear portraits work. The prompt builds the back-to-back doorway pose when pose is not preserved; you only need readable faces.",
      },
      {
        question: "How is this different from a sparkler or fireworks couple look?",
        answer:
          "This page is a still doorway scene with marigolds and floor-level diyas. Sparklers in hand and rooftop fireworks belong to other couple styles, so keep those cues out of this run.",
      },
    ],
    addonLine:
      "Want a slightly richer doorway glow? Add: keep the back-to-back pose and modest festive outfits, but add one more neat row of clay diyas along the threshold and a soft marigold shadow on the wooden frame—no sparklers.",
  },
  "birthday-ai-photo-prompt-boy-black-gold": {
    intro:
      "For young men celebrating a birthday who want a luxe black-and-gold cake-cutting frame: a fitted black suit or subtle gold-detail kurta, a black cake with gold drip and lit candles, and a metallic balloon arch behind. The look is polished party photography—not pastel cake walls and not baby number-balloon setups. Use a sharp waist-up daytime portrait with a clear face and natural skin tone so the suit edit keeps your real features.",
    tips: [
      "Shoot a waist-up or chest-up photo in even daylight with no beauty filter; busy corridors and heavy shadows make the black suit edges fray against the balloon arch.",
      "If the cake knife or candles warp, ask for one clean cake-cutting pose with a simple gold-drip black cake, lit candles, and five natural fingers on the knife hand.",
      "To keep the face the same, say keep exact face shape, beard or clean shave, hairline, and skin tone—do not lighten, slim, or replace the face when the balloons update.",
    ],
    faqs: [
      {
        question: "Suit or kurta—which one will I get?",
        answer:
          "Either is allowed when clothing is not preserved: a fitted black suit with a plain white shirt (no tie) or a black sherwani-style kurta with subtle gold detail. Ask for one if you prefer it.",
      },
      {
        question: "Can I use this for a child’s birthday?",
        answer:
          "This page is aimed at older boys and young men in a suit or kurta cake-cutting look. For little kids, use a baby or kids birthday style instead so proportions stay age-honest.",
      },
    ],
    addonLine:
      "Want a sharper party finish in the same black-and-gold set? Add: keep the black cake with gold drip and the balloon arch, but add a thin gold wristwatch and a confident mid-cut smile—no pastel balloons or extra guests.",
  },
  "anime-squad": {
    intro:
      "For friend groups who want a premium contemporary anime portrait of the same squad—not chibi stickers and not a single-hero close-up. Everyone stays recognizable: hairstyles, expressions, and the exact headcount carry into clean linework and vibrant outdoor adventure lighting. Best source: one evenly lit group photo where every face is sharp and people are not heavily overlapping, so the restyle can polish each person instead of inventing strangers.",
    tips: [
      "Crop tight enough that every face is large and readable before you upload; tiny distant faces are the fastest way to lose identity in an anime pass.",
      "If two friends merge into one character, rerun and insist on the exact same number of people, distinct faces, and no added or removed members.",
      "Keep clothing and arrangement toggles on when you want your real outfits and poses; only turn them off if you deliberately want a restyled adventure wardrobe.",
    ],
    faqs: [
      {
        question: "Will this turn us into cute chibi characters?",
        answer:
          "No. The default is a polished contemporary anime look with clean linework and expressive but adult proportions—not a chibi scrapbook or sticker sheet.",
      },
      {
        question: "How many friends can I include?",
        answer:
          "Match a real group photo where every face is clear. Very crowded frames often merge people; three to six evenly lit faces usually holds identity better than a distant party crowd.",
      },
    ],
    addonLine:
      "Want a stronger adventure backdrop for the same squad? Add: keep every real face and the contemporary anime finish, but set them on a windy cliff path at golden hour with deep scenic depth behind the group—no text, speech bubbles, or extra characters.",
  },
  "separate-photos-couple": {
    intro:
      "When two people cannot stand in the same room for Diwali, this merge places both of you on a lamp-lit rooftop holding sparklers, with soft distant fireworks and coordinated festive outfits. Each face stays locked to its own upload—no blended features. Prefer two clear individual portraits shot from a similar height and distance so body scale, light direction, and eye line match in the final terrace frame.",
    tips: [
      "Upload two similarly framed portraits (same approximate distance and eye level); large selfie-versus-full-body mismatches are the usual cause of floating shoulders or uneven sparkler hands.",
      "If lighting disagrees—one face cold, one warm—ask to match warm rooftop lamp light and sparkler glow across both people so it reads as one photograph.",
      "To keep faces distinct, remind the model that person A and person B are separate identity references: never average, swap, or beautify either face.",
    ],
    faqs: [
      {
        question: "Do both photos need to be taken on Diwali night?",
        answer:
          "No. Ordinary clear portraits work. The rooftop lamps, diya glow, distant fireworks, and sparklers come from the prompt once both faces are readable.",
      },
      {
        question: "What if we already have one photo together?",
        answer:
          "You can still use this merge when you want a sparkler rooftop restyle, but separate portraits are ideal when you were never photographed side by side.",
      },
    ],
    addonLine:
      "Want a softer rooftop romance in the same sparkler merge? Add: keep both exact faces and the hand-held sparklers, but add gentle string lights along the terrace railing and a calm shared glance—no extra people and no oversized props.",
  },
};
