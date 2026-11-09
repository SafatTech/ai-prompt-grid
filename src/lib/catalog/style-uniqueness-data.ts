import type { StyleSeoOverride } from "./style-seo-override-types";

/**
 * AdSense uniqueness copy for style pages (intro / tips / optional add-on / FAQs).
 * Merged over STYLE_SEO_OVERRIDE_ENTRIES in style-meta.ts. Does not change
 * main prompts or mood/background/outfit defaults.
 */
export const STYLE_UNIQUENESS_ENTRIES: Readonly<
  Record<string, StyleSeoOverride>
> = {
  "diya-lit-balcony": {
    intro: `Quiet Diwali balcony portrait for couples: diyas along the railing, warm evening light, both faces kept. Best with a clear couple photo where neither face is cut off.`,
    tips: [
      `Use a waist-up or three-quarter couple photo with both faces sharp and similarly lit.`,
      `If one partner drifts, name who is on the left and right and ask to keep each exact skin tone and age.`,
      `When diyas melt into a yellow blur, ask for a neat row of distinct clay diyas along the balcony railing only.`,
      `Keep pose off if you want the balcony arrangement; turn clothing on only if you must keep what you wore.`,
    ],
    faqs: [
      {
        question: `Do we need a photo already taken on a balcony?`,
        answer: `No. A clear indoor or outdoor couple portrait works; the prompt builds the diya-lined balcony when pose is not preserved.`,
      },
      {
        question: `Will outfits stay the same?`,
        answer: `Only if you preserve clothing. Otherwise the look dresses you in coordinated festive wear while locking faces.`,
      },
      {
        question: `Can I use two separate photos?`,
        answer: `This page expects one couple frame. For two separate uploads, use a merge couple style such as the sparkler rooftop or diya doorway.`,
      },
      {
        question: `Why do diyas look fake?`,
        answer: `Ask for realistic clay diyas with soft flame glow and no floating lights stuck to clothing or hair.`,
      },
    ],
    addonLine: `Want a calmer balcony glow? Add: keep both exact faces and the diya railing, but soften the city bokeh behind and warm the skin highlights slightly—no fireworks, no extra people.`,
  },
  "finishing-the-rangoli-together": {
    intro: `Candid Diwali doorway moment: you and your partner finishing a rangoli together, festive but unposed. Upload a clear couple photo with both faces readable.`,
    tips: [
      `Prefer a photo where both people are roughly the same distance from the camera so heights stay honest.`,
      `If hands near the rangoli look extra-fingered, ask for five natural fingers and a simple chalk or powder pattern on the floor.`,
      `Keep the doorway and rangoli as the story—ask to remove rooftop fireworks if they appear.`,
      `Rerun once with sharper faces if either smile softens into a different person.`,
    ],
    faqs: [
      {
        question: `Must we already be kneeling at a rangoli?`,
        answer: `No. Everyday couple photos work; the prompt builds the rangoli-finishing pose when pose is not preserved.`,
      },
      {
        question: `What if we only have selfies?`,
        answer: `A single clear couple frame is ideal. Separate selfies belong on a merge style instead.`,
      },
      {
        question: `Will kids or extras appear?`,
        answer: `Ask for only the two of you. This look is a couple candid, not a full family courtyard.`,
      },
      {
        question: `Rangoli colours look neon—fix?`,
        answer: `Ask for traditional powder colours, soft daylight or warm doorway light, and no glowing UI overlays.`,
      },
    ],
    addonLine: `Want a softer doorway story? Add: keep both faces and the rangoli at your feet, but add a thin marigold string on the door frame and quieter smiles—no sparklers in hand.`,
  },
  "first-diwali-as-a-married-couple": {
    intro: `Newlywed Diwali portrait: bridal-inspired festive styling for your first Diwali together, faces locked. Use a three-quarter or full couple photo with both faces sharp.`,
    tips: [
      `Upload a clear couple portrait; heavy filters make bridal jewellery and skin tones drift.`,
      `If lehenga or sherwani detail smears, ask for realistic fabric texture and modest jewellery only.`,
      `Keep relative heights honest—say who is taller if the model equalises you.`,
      `Ask to keep wedding rings or sindoor only if they are already in the source and you want them preserved.`,
    ],
    faqs: [
      {
        question: `Is this only for just-married couples?`,
        answer: `It is styled for a first-Diwali newlywed mood, but any couple wanting bridal-inspired festive wear can use it.`,
      },
      {
        question: `Can we keep our real wedding outfits?`,
        answer: `Turn clothing preservation on. Otherwise the prompt restyles into festive newlywed looks while keeping faces.`,
      },
      {
        question: `Two separate photos?`,
        answer: `Prefer one couple frame here. Use a Diwali merge style when you only have separate uploads.`,
      },
      {
        question: `Jewellery looks oversized—what helps?`,
        answer: `Ask for delicate, realistic jewellery and exact face proportions with no beautify pass.`,
      },
    ],
    addonLine: `Want a quieter newlywed glow? Add: keep both exact faces and festive outfits, but soften the background lights and use a calm shared glance—no stage fireworks behind you.`,
  },
  "separate-photos-couple": {
    intro: `Merge two people onto a lamp-lit Diwali rooftop with sparklers when you cannot stand together. Prefer two clear portraits from a similar height.`,
    tips: [
      `Match framing: similar distance and eye level so shoulders and sparkler hands do not float.`,
      `If one face goes cold and the other warm, ask to match warm rooftop lamp light across both people.`,
      `Remind the model that person A and person B are separate identity references—never average or swap faces.`,
      `Ask for individual hand-held sparklers with five natural fingers, not a melted light blob.`,
    ],
    faqs: [
      {
        question: `Do both photos need to be from Diwali night?`,
        answer: `No. Ordinary clear portraits work; rooftop lamps, diyas, distant fireworks, and sparklers come from the prompt.`,
      },
      {
        question: `What if we already have one photo together?`,
        answer: `You can still restyle it, but separate portraits are ideal when you were never photographed side by side.`,
      },
      {
        question: `Can we keep our own clothes?`,
        answer: `Turn clothing preservation on. Off replaces outfits with coordinated festive wear while locking faces.`,
      },
      {
        question: `Why does one person look taller?`,
        answer: `Mismatched camera heights in the sources—re-upload portraits shot from a similar eye level.`,
      },
    ],
    addonLine: `Want a softer rooftop romance? Add: keep both exact faces and the hand-held sparklers, but add gentle string lights along the terrace railing and a calm shared glance—no extra people and no oversized props.`,
  },
  "diwali-couple-poses-diya-doorway": {
    intro: `Quiet Diwali doorway portrait: back-to-back in a marigold-framed entrance with clay diyas on the threshold. Upload two clear face photos or one of you both.`,
    tips: [
      `Prefer two portraits from a similar camera height so neither partner looks oddly taller in the doorway.`,
      `If faces blend or swap, name person A and person B and keep each exact skin tone, hairstyle, and age.`,
      `When diyas smear underfoot, ask for a neat row of distinct clay diyas and warm light from inside the doorway only.`,
      `Keep clothing modest—ask to remove sparklers if the model adds rooftop fireworks cues.`,
    ],
    faqs: [
      {
        question: `Do we need a photo that already shows us back-to-back?`,
        answer: `No. Separate clear portraits work; the prompt builds the doorway pose when pose is not preserved.`,
      },
      {
        question: `How is this different from a sparkler couple look?`,
        answer: `This page is a still doorway with marigolds and floor-level diyas. Sparklers and rooftop fireworks belong to other couple styles.`,
      },
      {
        question: `One photo of both of us—OK?`,
        answer: `Yes, if both faces are sharp. Two separate uploads often hold identity better when lighting differs.`,
      },
      {
        question: `Outfits look too flashy—fix?`,
        answer: `Ask for modest festive wear with full sleeves or a full blouse, and no branded logos.`,
      },
    ],
    addonLine: `Want a richer doorway glow? Add: keep the back-to-back pose and modest festive outfits, but add one more neat row of clay diyas along the threshold and a soft marigold shadow on the wooden frame—no sparklers.`,
  },
  "diwali-couple-instagram-fireworks": {
    intro: `Instagram-ready Diwali rooftop couple under soft fireworks bokeh—faces locked, festive outfits. Upload two clear photos or one of you both with readable faces.`,
    tips: [
      `Use sharp face photos; tiny distant faces lose identity against fireworks bokeh.`,
      `If fireworks turn into harsh streaks, ask for soft out-of-focus fireworks in the evening sky only—not overlapping faces.`,
      `Name person A and person B when using two uploads so features do not blend.`,
      `Ask for realistic relative heights and five natural fingers if hands look odd near the railing.`,
    ],
    faqs: [
      {
        question: `Is this the same as the sparkler merge?`,
        answer: `No. This page is a rooftop fireworks sky look. The sparkler merge focuses on hand-held sparklers on a lamp-lit terrace.`,
      },
      {
        question: `Can we keep street clothes?`,
        answer: `Preserve clothing if you want them. Otherwise festive coordinated outfits replace what you wore.`,
      },
      {
        question: `Why is one face brighter?`,
        answer: `Ask to match warm rooftop light across both people so it reads as one photograph.`,
      },
      {
        question: `Will logos or watermarks appear?`,
        answer: `Ask for no text, logos, or watermarks; keep the sky and couple clean.`,
      },
    ],
    addonLine: `Want a cleaner reel-cover sky? Add: keep both exact faces and the rooftop pose, but use softer, more distant fireworks bokeh and warmer skin light—no text, stickers, or extra guests.`,
  },
  "fairy-light-portrait": {
    intro: `Graceful solo Diwali night portrait with soft fairy-light glow behind you—face kept exact. Use one clear frontal or three-quarter photo.`,
    tips: [
      `Shoot a sharp chest-up or waist-up portrait in even light before you upload.`,
      `If fairy lights smear across the face, ask for lights only in the background bokeh, not on skin.`,
      `Say keep exact skin tone, hairline, and eye shape if beautify softens you.`,
      `Ask for modest festive wear only when clothing is not preserved—no heavy stage jewellery stacks.`,
    ],
    faqs: [
      {
        question: `Is this for couples?`,
        answer: `No—this is a solo portrait. Couple Diwali looks live on the balcony, doorway, and rooftop pages.`,
      },
      {
        question: `Do I need fairy lights in my room already?`,
        answer: `No. The prompt adds soft fairy-light bokeh behind you.`,
      },
      {
        question: `Can men use this?`,
        answer: `It is written as a girls’ Diwali portrait look. Try the boy Instagram or men kurta pages for male festive portraits.`,
      },
      {
        question: `Outfit too shiny?`,
        answer: `Ask for soft fabric with gentle highlights and exact face lighting.`,
      },
    ],
    addonLine: `Want a quieter fairy-light mood? Add: keep the exact face and soft bokeh lights, but lower overall contrast and use a calmer expression—no sparklers in hand and no text overlays.`,
  },
  "golden-hour-sparkler-shot": {
    intro: `Festive dusk portrait holding a lit sparkler—warm golden hour, face locked. Upload a clear waist-up or full portrait with a sharp face.`,
    tips: [
      `Use a daytime-sharp face photo; blurry sources make sparkler smoke eat facial detail.`,
      `If the sparkler becomes a white blob, ask for a single lit phuljhadi with visible sparks and five natural fingers.`,
      `Keep hair and skin tone locked—say do not lighten or slim the face when the sparkler updates.`,
      `Ask to keep the sparkler away from the eyes if sparks overlay the face.`,
    ],
    faqs: [
      {
        question: `Couple or solo?`,
        answer: `Solo. For two people with sparklers, use the separate-photos couple merge.`,
      },
      {
        question: `Safe for kids?`,
        answer: `This page is a young-woman dusk portrait look. For babies, use Baby’s First Diwali instead.`,
      },
      {
        question: `Must I hold a sparkler in the source?`,
        answer: `No. The prompt adds the sparkler when pose is not preserved.`,
      },
      {
        question: `Background too dark?`,
        answer: `Ask for golden-hour ambient light with soft dusk sky, not a black void.`,
      },
    ],
    addonLine: `Want a softer dusk sparkler? Add: keep the exact face and one hand-held sparkler, but warm the sky slightly and reduce smoke near the cheeks—no extra people and no rooftop fireworks wall.`,
  },
  "kurta-and-nehru-jacket-with-lanterns": {
    intro: `Rooftop Diwali portrait for boys and young men: kurta with Nehru jacket and paper lanterns, face kept. Use a clear standing or three-quarter photo.`,
    tips: [
      `Upload a sharp chest-up or waist-up portrait; busy corridors fight clean jacket edges.`,
      `If lanterns smear, ask for a few distinct paper lanterns with warm glow, not a neon blob.`,
      `Keep beard or clean shave exact—say do not de-age or lighten skin.`,
      `Ask for five natural fingers if hands rest near the railing.`,
    ],
    faqs: [
      {
        question: `Suit instead of kurta?`,
        answer: `This page is kurta and Nehru jacket. For black-and-gold suit energy, use a birthday black-gold style instead.`,
      },
      {
        question: `Can women use this?`,
        answer: `It is written for boys/men festive wear. Try fairy-light or marigold women portraits for female Diwali looks.`,
      },
      {
        question: `Do I need a rooftop photo already?`,
        answer: `No. A clear portrait is enough; the prompt builds lantern rooftop depth.`,
      },
      {
        question: `Jacket embroidery looks fake?`,
        answer: `Ask for subtle realistic embroidery and natural fabric folds.`,
      },
    ],
    addonLine: `Want a quieter lantern rooftop? Add: keep the exact face, kurta, and Nehru jacket, but use fewer paper lanterns and softer evening haze—no fireworks text or extra friends in frame.`,
  },
  "candid-phuljhadi-moment": {
    intro: `Spontaneous street-night Diwali laugh with a phuljhadi—candid energy, real face kept. Upload a clear candid or portrait photo.`,
    tips: [
      `A natural smile photo works better than a stiff passport crop for this candid laugh.`,
      `If the sparkler burns the face out, ask for the phuljhadi held away from the cheeks with soft street light on skin.`,
      `Keep identity lines: exact eyes, skin tone, and hair—no beautify.`,
      `Ask for a real street-night backdrop, not a studio grey sweep.`,
    ],
    faqs: [
      {
        question: `Is this a couple look?`,
        answer: `Solo candid. Couple sparklers belong on the merge sparkler rooftop page.`,
      },
      {
        question: `Will it look posed?`,
        answer: `Ask for candid body language and a natural laugh, not a fashion-editorial stare.`,
      },
      {
        question: `Sparks look CGI?`,
        answer: `Ask for realistic spark trails and natural hand anatomy.`,
      },
      {
        question: `Can I keep my hoodie?`,
        answer: `Preserve clothing if you want streetwear; otherwise festive casual wear may replace it.`,
      },
    ],
    addonLine: `Want a softer street laugh? Add: keep the exact face and one phuljhadi, but reduce motion blur and warm the street lamps slightly—no crowd of strangers closing in.`,
  },
  "diwali-girl-aesthetic-diya": {
    intro: `Dreamy window-side Diwali portrait of a girl holding a brass diya tray—soft aesthetic light, face locked. Use one clear chest-up or waist-up photo.`,
    tips: [
      `Prefer soft daylight on the face in the source so the diya glow does not crush shadows.`,
      `If the tray melts, ask for a clear brass thali with a few distinct diyas and five natural fingers.`,
      `Say keep exact face shape and skin tone if the aesthetic grade lightens you.`,
      `Ask for modest festive wear and soft window depth, not a crowded mandir collage.`,
    ],
    faqs: [
      {
        question: `Is this for women too?`,
        answer: `Yes—girl or young woman chest-up portraits work.`,
      },
      {
        question: `Must I hold a tray already?`,
        answer: `No. The prompt adds the brass diya tray when pose is not preserved.`,
      },
      {
        question: `Different from marigold women portrait?`,
        answer: `Yes. This is window-side diya-tray aesthetic; marigold is hanging-garland editorial half-body.`,
      },
      {
        question: `Background too busy?`,
        answer: `Ask for a simple warm interior with soft window light only.`,
      },
    ],
    addonLine: `Want a calmer diya-tray mood? Add: keep the exact face and brass tray, but soften window highlights and use a quieter expression—no floating glitter text.`,
  },
  "diwali-women-marigold-portrait": {
    intro: `Editorial half-body Diwali portrait for women against hanging marigold strings—face kept exact. Upload one clear waist-up photo.`,
    tips: [
      `Use a sharp waist-up source; heavy beauty filters fight marigold colour against skin.`,
      `If garlands smear, ask for distinct hanging marigold strings behind you, not orange fog on the face.`,
      `Keep jewellery modest unless you ask for more—say exact face and natural skin texture.`,
      `Ask for clean edges around hair so marigold petals do not stick to the forehead.`,
    ],
    faqs: [
      {
        question: `Girl vs women page?`,
        answer: `This page is adult-woman editorial half-body. The diya-tray page is a softer girl aesthetic crop.`,
      },
      {
        question: `Can I keep my saree?`,
        answer: `Preserve clothing to keep it. Off may restyle into festive wear while locking the face.`,
      },
      {
        question: `Marigolds look plastic?`,
        answer: `Ask for realistic fresh marigold texture and natural shadow under the garlands.`,
      },
      {
        question: `Couple version?`,
        answer: `Use doorway, balcony, or fireworks couple styles for two people.`,
      },
    ],
    addonLine: `Want a softer marigold editorial? Add: keep the exact face and hanging marigolds, but lower saturation slightly and use gentler side light—no sparklers and no text banners.`,
  },
  "diwali-men-kurta-portrait": {
    intro: `Seated Diwali portrait for men: ivory kurta and shawl on a carved jhoola with brass lamps—face locked. Use one clear waist-up photo.`,
    tips: [
      `Upload a sharp waist-up portrait; side light in the source helps the jhoola look dimensional.`,
      `If the swing geometry breaks, ask for a simple carved wooden jhoola and stable seated posture.`,
      `Keep beard, glasses, and skin tone exact—no de-age.`,
      `Ask for brass lamps as warm props, not neon streaks across the kurta.`,
    ],
    faqs: [
      {
        question: `Standing portrait instead?`,
        answer: `This page is seated jhoola. For standing festive men looks, try courtyard sparkler or boy Instagram fairy-light.`,
      },
      {
        question: `Can I keep a black kurta?`,
        answer: `Preserve clothing, or ask specifically for black instead of ivory when clothing is off.`,
      },
      {
        question: `Jhoola looks modern metal?`,
        answer: `Ask for carved wood with traditional detail and warm lamp light only.`,
      },
      {
        question: `Is this for boys too?`,
        answer: `Aimed at adult men. Younger looks fit the boy Instagram Diwali page better.`,
      },
    ],
    addonLine: `Want a quieter jhoola portrait? Add: keep the exact face, ivory kurta, and shawl, but use fewer brass lamps and softer shadow under the swing—no fireworks behind the seat.`,
  },
  "diwali-boy-instagram-portrait": {
    intro: `Vertical black-kurta Diwali reel-cover look for boys: fairy-light curtain bokeh, face kept. Use one clear chest-up or waist-up photo.`,
    tips: [
      `Shoot a sharp vertical-friendly portrait; cropped foreheads break reel covers.`,
      `If fairy lights crawl onto the face, ask for bokeh only behind the shoulders.`,
      `Keep hairline, skin tone, and any beard exact—no beautify.`,
      `Ask for a plain black kurta with clean edges when clothing is not preserved.`,
    ],
    faqs: [
      {
        question: `Different from men jhoola?`,
        answer: `Yes—this is a vertical Instagram/reel cover with fairy lights; jhoola is a seated lamp portrait.`,
      },
      {
        question: `Can girls use it?`,
        answer: `Written for boys/young men. Try fairy-light or diya-tray pages for girls.`,
      },
      {
        question: `Do I need fairy lights at home?`,
        answer: `No. The prompt builds the bokeh curtain.`,
      },
      {
        question: `Kurta too shiny?`,
        answer: `Ask for matte black fabric with soft highlights only.`,
      },
    ],
    addonLine: `Want a cleaner reel cover? Add: keep the exact face and black kurta, but use a tighter fairy-light curtain and slightly cooler night grade—no text stickers or sparkler in hand.`,
  },
  "diwali-men-crackers-celebration": {
    intro: `Safe courtyard Diwali celebration for men: phuljhari held at arm’s length, festive kurta, face locked. Use one clear waist-up photo.`,
    tips: [
      `Prefer a sharp face with room around the hands so the sparkler arm reads clearly.`,
      `Ask for the phuljhari held away from the body—no sparks overlapping eyes.`,
      `Keep exact skin tone and age; celebration grades often lighten faces.`,
      `If courtyard walls vanish, ask for a simple residential courtyard with warm ambient light.`,
    ],
    faqs: [
      {
        question: `Is this safe-looking on purpose?`,
        answer: `Yes—the prompt keeps the sparkler at arm’s length for a controlled celebration frame.`,
      },
      {
        question: `Couple sparkler instead?`,
        answer: `Use the separate-photos couple merge for two people with sparklers.`,
      },
      {
        question: `Can I keep jeans and shirt?`,
        answer: `Preserve clothing if you want them; otherwise festive kurta styling may apply.`,
      },
      {
        question: `Background crowds appearing?`,
        answer: `Ask for only you in frame with a quiet courtyard, no crowd.`,
      },
    ],
    addonLine: `Want a calmer courtyard spark? Add: keep the exact face and arm’s-length phuljhari, but reduce spark density and warm the courtyard lamps—no loud cracker bursts near the face.`,
  },
  "babys-first-diwali": {
    intro: `Soft baby’s-first-Diwali portrait with safe festive styling—gentle light, real baby face kept. Upload a clear baby photo with face and body visible.`,
    tips: [
      `Use a sharp, well-lit baby photo; motion blur is the fastest way to lose likeness.`,
      `Ask for soft props only—no sparklers, matches, or sharp décor near the baby.`,
      `Keep exact skin tone and eye shape; festive grades should not lighten the baby.`,
      `If outfits look adult-festive, ask for soft infant festive wear with safe, simple jewellery or none.`,
    ],
    faqs: [
      {
        question: `Boy and girl?`,
        answer: `Yes—works for baby boy or baby girl photos.`,
      },
      {
        question: `Can I add parents in frame?`,
        answer: `This page is baby-forward. For family groups, use courtyard or dinner-table Diwali styles.`,
      },
      {
        question: `Diya too close to the baby?`,
        answer: `Ask for diyas only in the far background, never in the child’s hands.`,
      },
      {
        question: `Age looks older?`,
        answer: `Say keep exact infant proportions and apparent age with no beautify.`,
      },
    ],
    addonLine: `Want an even softer first-Diwali frame? Add: keep the exact baby face and gentle festive styling, but use cream-warm light and fewer background diyas—no sparklers and no crowded adults overlapping the baby.`,
  },
  "family-diwali-in-karachi-or-sindh": {
    intro: `Joyful family Diwali in a historic Karachi or Sindh courtyard setting—every face kept. Upload a clear group photo with all faces visible.`,
    tips: [
      `Crop so every face is large and sharp before upload; tiny faces merge in group edits.`,
      `If someone is missing after the edit, insist on the exact headcount and distinct faces.`,
      `Ask for courtyard architecture with warm festive light, not a generic palace collage.`,
      `Keep relative heights and ages honest across elders and younger members.`,
    ],
    faqs: [
      {
        question: `Must the photo be from Karachi?`,
        answer: `No. Any clear family group works; the prompt builds the regional courtyard atmosphere.`,
      },
      {
        question: `How many people?`,
        answer: `Match your real group with every face readable. Very large crowds often merge people.`,
      },
      {
        question: `Different from courtyard steps adults?`,
        answer: `This page is a joyful regional family courtyard story; courtyard steps is a formal tiered adult pose.`,
      },
      {
        question: `Outfits clash?`,
        answer: `Preserve clothing to keep real wear, or ask for coordinated modest festive colours.`,
      },
    ],
    addonLine: `Want a calmer courtyard family frame? Add: keep every exact face and the Sindh/Karachi courtyard mood, but soften string lights and reduce background clutter—no extra strangers in the group.`,
  },
  "diaspora-diwali-in-a-cold-city": {
    intro: `Diwali abroad in a cold city: festive wear under wool coats, warm lights against winter air—faces locked. Use a clear couple or small-group photo.`,
    tips: [
      `Upload sharp faces; winter grades often desaturate skin—ask to keep exact skin tones.`,
      `If coats swallow festive wear, ask for visible festive layers under open wool coats.`,
      `Keep city winter cues subtle—ask for soft cold breath or bare trees, not a snowstorm over faces.`,
      `For two uploads, name person A and B so features stay separate.`,
    ],
    faqs: [
      {
        question: `Only for people living abroad?`,
        answer: `It is styled for cold-city Diwali, but anyone wanting festive wear under winter coats can use it.`,
      },
      {
        question: `Indoor version?`,
        answer: `This look leans outdoor cold-city. For indoor family warmth, try the dinner-table Diwali page.`,
      },
      {
        question: `Kids included?`,
        answer: `Small groups work if every face is sharp; very young babies fit Baby’s First Diwali better as a solo.`,
      },
      {
        question: `Coats look sportswear?`,
        answer: `Ask for classic wool or wool-blend coats in muted winter colours.`,
      },
    ],
    addonLine: `Want a cozier abroad-Diwali mood? Add: keep exact faces and wool coats over festive wear, but add warmer window light behind and quieter expressions—no heavy snow dumping on hair.`,
  },
  "diwali-family-courtyard-group": {
    intro: `Formal grown-family Diwali portrait on haveli courtyard steps—4 to 6 adults in tiers, every face kept. Upload one clear adult group photo.`,
    tips: [
      `Use a group photo where every adult face is sharp and not heavily overlapped.`,
      `If the model adds children, ask for adults only on the courtyard steps.`,
      `Keep exact headcount—rerun if someone merges or disappears.`,
      `Ask for neat step tiers and warm courtyard diya light without fireworks walls.`,
    ],
    faqs: [
      {
        question: `Can we include kids?`,
        answer: `This page is adults on steps. For mixed families, use Karachi/Sindh family or dinner-table styles.`,
      },
      {
        question: `Two photos to merge?`,
        answer: `Prefer one group frame. Merge styles are for combining separate uploads.`,
      },
      {
        question: `How many people ideal?`,
        answer: `About 4–6 adults with readable faces holds identity better than a distant crowd.`,
      },
      {
        question: `Architecture looks wrong?`,
        answer: `Ask for a simple haveli-style courtyard with stone or plaster steps, not a European staircase.`,
      },
    ],
    addonLine: `Want a softer formal courtyard? Add: keep every exact adult face and the stepped pose, but lower diya intensity and use calmer expressions—no sparklers in hand.`,
  },
  "diwali-family-dinner-table": {
    intro: `Candid laughing family around a festive thali-laden dinner table under string lights—every face kept. Upload one clear family group photo.`,
    tips: [
      `Every face should be sharp and forward enough to read; profile-only faces drift more.`,
      `If thalis smear, ask for neat plates and simple festive dishes without unreadable food mush.`,
      `Insist on exact headcount and no extra relatives invented at the table.`,
      `Ask for warm string lights above, not neon text saying Diwali.`,
    ],
    faqs: [
      {
        question: `Formal posed family instead?`,
        answer: `Use courtyard steps for a formal tiered adult group; this page is a candid table laugh.`,
      },
      {
        question: `Must food be vegetarian?`,
        answer: `Keep dishes simple and generic; ask to avoid branded packaging.`,
      },
      {
        question: `Small apartment OK as source?`,
        answer: `Yes—faces matter more than the real dining room.`,
      },
      {
        question: `Someone missing after edit?`,
        answer: `Rerun and demand the same number of people with distinct faces.`,
      },
    ],
    addonLine: `Want a cozier table candid? Add: keep every exact face and the thali table, but soften string lights and keep laughter natural—no sparklers on the dining table.`,
  },
  "south-asian-fashion-editorial": {
    intro: `Elegant saree fashion editorial with traditional jewellery cues—magazine polish, real face kept. Use one clear frontal or three-quarter portrait.`,
    tips: [
      `Upload a sharp portrait with visible eyes; soft beauty filters fight embroidery detail.`,
      `If jewellery multiplies, ask for a refined set only—earrings, bangles, maybe a necklace—not a heavy stage load.`,
      `Keep exact skin tone and face shape when the editorial grade warms the frame.`,
      `Ask for clean fashion lighting and a simple backdrop so the saree stays readable.`,
    ],
    faqs: [
      {
        question: `Is this a Diwali set?`,
        answer: `It is traditional fashion editorial often linked from Diwali guides, but not a courtyard fireworks scene.`,
      },
      {
        question: `Lehenga instead of saree?`,
        answer: `Ask specifically for lehenga if clothing is not preserved; the default leans saree editorial.`,
      },
      {
        question: `Couple version?`,
        answer: `This is solo. Use Diwali couple pages for two people.`,
      },
      {
        question: `Black-and-white instead?`,
        answer: `Use the shadowed saree noir page for monochrome leaf-shadow saree.`,
      },
    ],
    addonLine: `Want a softer editorial finish? Add: keep the exact face and saree drape, but lower contrast slightly and keep jewellery delicate—no festival props like diyas unless you ask.`,
  },
  "south-asian-editorial-collage": {
    intro: `Three-panel traditional saree editorial collage from one selfie—consistent identity across panels. Use a clear portrait with visible eyes.`,
    tips: [
      `Start with a sharp face photo; soft sources make panel-to-panel identity drift.`,
      `If panels disagree on jewellery, ask to keep the same outfit and jewellery set across all three.`,
      `Say keep exact face shape and skin tone in every panel.`,
      `Ask for thin clean dividers and no extra text between panels.`,
    ],
    faqs: [
      {
        question: `Same as crimson bangle triptych?`,
        answer: `No. Crimson is a jewellery-led window triptych with red bangles; this is a broader traditional editorial collage.`,
      },
      {
        question: `Can I change only one panel?`,
        answer: `Better to rerun the full collage with a clearer note on identity consistency.`,
      },
      {
        question: `Outfit preserved?`,
        answer: `Turn clothing on to keep yours; off restyles traditionally while locking the face.`,
      },
      {
        question: `Panels crop my chin?`,
        answer: `Ask to keep full face and key jewellery visible in every panel for the output ratio.`,
      },
    ],
    addonLine: `Want a quieter triptych? Add: keep the same face and traditional outfit across all three panels, but soften the colour grade and reduce ornate jewellery density—no festival sparklers in any panel.`,
  },
  "golden-bouquet-glow": {
    intro: `Warm amber portrait with a lush rose bouquet—glowing, romantic, face kept exact. Use one clear portrait with a visible face.`,
    tips: [
      `Chest-up photos hold face detail better when bouquet blooms fill the frame.`,
      `If roses smear, ask for distinct blooms with natural petals—not a pink colour wash on skin.`,
      `Keep exact skin tone under amber grade—say do not lighten.`,
      `Ask for bouquet held naturally with five fingers if hands show.`,
    ],
    faqs: [
      {
        question: `Diwali-specific?`,
        answer: `Warm festive-adjacent portrait; for explicit Diwali props use diya-tray or marigold pages.`,
      },
      {
        question: `Mixed bouquet instead of roses?`,
        answer: `Ask for mixed blooms if you prefer; default leans lush roses.`,
      },
      {
        question: `Men’s version?`,
        answer: `Written as a glowing bouquet portrait typically for women; men festive looks sit on kurta/jhoola pages.`,
      },
      {
        question: `Background too orange?`,
        answer: `Ask for controlled amber key light with a calmer backdrop.`,
      },
    ],
    addonLine: `Want a softer amber bouquet? Add: keep the exact face and rose bouquet, but reduce glow intensity and keep petals slightly farther from the cheeks—no sparklers or fairy-text overlays.`,
  },
  "crimson-bangle-reverie": {
    intro: `Jewellery-led traditional triptych from one selfie: ivory embroidery, crimson glass bangles, and warm window light—best with a sharp daytime face photo and clear wrists.`,
    tips: [
      `Upload a clear daytime portrait with wrists visible and free of thick watch straps or bulky bracelets, so the red glass stacks and oxidized kadas can sit cleanly on both hands.`,
      `If a panel softens your face or changes your hairline, rerun once with a sharper source and ask to keep the same face shape, eyes, and natural skin tone across all three panels.`,
      `When bangles look melted or rings multiply, ask for fewer, sharper glass bangles with realistic metal reflections and five natural fingers on each hand.`,
    ],
    faqs: [
      {
        question: `Why is this a three-panel image instead of one portrait?`,
        answer: `The style is a vertical triptych by design: hand-and-bangle close-ups frame a soft window portrait so jewellery and embroidery stay the story, not a single full-length pose.`,
      },
      {
        question: `What should I wear in the source photo?`,
        answer: `Everyday clothes are fine. The prompt replaces the outfit with an ivory embroidered traditional dress when clothing is not preserved; a clear face and natural wrists matter more than festive wear in the upload.`,
      },
      {
        question: `Can I keep my own bangles?`,
        answer: `Preserve clothing/accessories if your tool respects that; otherwise the look builds crimson glass stacks as part of the restyle.`,
      },
      {
        question: `One panel looks unlike me—fix?`,
        answer: `Rerun with a sharper source and insist on the same face shape, eyes, and skin tone across all three panels.`,
      },
    ],
    addonLine: `Want a softer evening mood in the same triptych? Add: keep the ivory embroidery and crimson glass bangles, but shift the window light slightly warmer and lower, with gentler shadows on the hands and a quieter, more intimate expression.`,
  },
  "golden-twirl-storyboard": {
    intro: `Golden-hour twirl storyboard for girls: skirt in motion, warm low sun, joyful spin—real face kept. Use one clear portrait with room for a walking crop.`,
    tips: [
      `Choose a source with a sharp face; motion in the edit should not invent a new person.`,
      `If the twirl blurs the face, ask to keep facial features crisp while fabric moves.`,
      `Keep skin tone exact under golden hour—no lightening.`,
      `Ask for natural arm positions and five fingers if hands lift the skirt.`,
    ],
    faqs: [
      {
        question: `Is this Diwali?`,
        answer: `No—golden-hour fashion motion. Diwali guides sometimes link it as a related festive-adjacent look.`,
      },
      {
        question: `Short hair OK?`,
        answer: `Yes; keep exact hairstyle and hairline locked.`,
      },
      {
        question: `Boys’ twirl?`,
        answer: `This page is written for girls’ twirl fashion storyboard.`,
      },
      {
        question: `Dress stays mine?`,
        answer: `Preserve clothing to keep it; off restyles into a motion-friendly outfit.`,
      },
    ],
    addonLine: `Want a softer golden twirl? Add: keep the exact face and spinning skirt motion, but ease the shutter-blur on the hem and warm the sunlight gently—no confetti storm unless you ask.`,
  },
  "travel-fashion-bouquet": {
    intro: `Golden-hour travel fashion with a wildflower bouquet and flowing summer clothes—vacation energy, face locked. Use a clear portrait with room for a walking crop.`,
    tips: [
      `Sharp face + some body room helps the walking crop read as travel fashion, not a tight selfie.`,
      `If flowers smear, ask for a readable wildflower bundle with natural stems.`,
      `Keep exact skin tone and hair in warm sunlight.`,
      `Ask for old-city or open-street depth without unreadable store logos.`,
    ],
    faqs: [
      {
        question: `Same as golden bouquet glow?`,
        answer: `No. This is a walking travel fashion frame; golden bouquet glow is a closer amber portrait with roses.`,
      },
      {
        question: `Winter coat version?`,
        answer: `Use winter or diaspora cold-city looks; this page is warm-season travel fashion.`,
      },
      {
        question: `Couple travel?`,
        answer: `Solo. Merge couple travel pages cover two-photo trips.`,
      },
      {
        question: `City looks European?`,
        answer: `Ask for a warm old-city street that fits your story, without branded signage.`,
      },
    ],
    addonLine: `Want a calmer travel bouquet walk? Add: keep the exact face and wildflower bundle, but soften backlight and keep the walk pace gentle—no festival diyas or sparklers in frame.`,
  },
  "shadowed-saree-noir": {
    intro: `Black-and-white saree portrait with leaf shadows across a recognizable face—graphic, quiet, exact likeness. Use one clear portrait.`,
    tips: [
      `A sharp face with visible bone structure holds up better in monochrome.`,
      `If leaf shadows dirty the eyes, ask for shadows across cheek or shoulder, not over both eyes.`,
      `Say keep exact features—monochrome should not reshape the nose or jaw.`,
      `Ask for realistic saree drape folds, not a flat grey sheet.`,
    ],
    faqs: [
      {
        question: `Colour version?`,
        answer: `Use south Asian fashion editorial or crimson triptych for colour traditional looks.`,
      },
      {
        question: `Must I wear a saree already?`,
        answer: `No if clothing is off; the prompt can restyle into a saree while locking the face.`,
      },
      {
        question: `Why is skin blotchy in B&W?`,
        answer: `Ask for smooth natural monochrome tonality with preserved skin texture, not harsh posterization.`,
      },
      {
        question: `Couple noir?`,
        answer: `This is solo.`,
      },
    ],
    addonLine: `Want softer noir shadows? Add: keep the exact face and monochrome saree, but lighten leaf-shadow contrast slightly and keep grain subtle—no colour props sneaking back in.`,
  },
  "warm-home-editorial": {
    intro: `Sunlit home editorial product scene: calm lifestyle staging for a single product photo—shape and label kept honest. Upload one clear product shot with clean edges.`,
    tips: [
      `Fill the frame with the product; tiny items on messy tables invent extra props.`,
      `Ask to keep exact packaging, label text readability, and product colour.`,
      `If the room gets cluttered, ask for only a few soft home details in the far background.`,
      `Avoid hands unless you want them—say product-only on the surface.`,
    ],
    faqs: [
      {
        question: `Is this a people Diwali look?`,
        answer: `No—it is product lifestyle photography sometimes linked near festive guides.`,
      },
      {
        question: `White background packshot instead?`,
        answer: `Use a pure white packshot style for marketplace cutouts.`,
      },
      {
        question: `Multiple products?`,
        answer: `One hero product per run holds detail better.`,
      },
      {
        question: `Label text warped?`,
        answer: `Ask to keep typography readable and packaging undistorted.`,
      },
    ],
    addonLine: `Want a calmer home editorial? Add: keep the exact product shape and label, but simplify the background to a sunlit table edge with one soft textile—no festival décor unless it fits the product story.`,
  },
  "varanasi-sunset-voyage": {
    intro: `Varanasi sunset lehenga portrait on a riverside boat—warm voyage mood, face kept. Use one clear portrait with a visible face.`,
    tips: [
      `Sharp face photos survive sunset grade better than filtered selfies.`,
      `If the boat geometry breaks, ask for a simple wooden boat on calm water with believable horizon.`,
      `Keep exact skin tone in golden sunset—no lightening.`,
      `Ask for modest lehenga detail that does not melt into the sky colour.`,
    ],
    faqs: [
      {
        question: `Must I be in Varanasi?`,
        answer: `No. A clear portrait is enough; the prompt builds the riverside sunset voyage.`,
      },
      {
        question: `Kurta version for men?`,
        answer: `This page leans lehenga voyage; men festive looks are on kurta Diwali pages.`,
      },
      {
        question: `Couple on a boat?`,
        answer: `Solo. Use couple merge or Diwali couple styles for two people.`,
      },
      {
        question: `Water looks fake?`,
        answer: `Ask for calm reflective water and a natural sunset colour roll-off.`,
      },
    ],
    addonLine: `Want a quieter Ganga sunset? Add: keep the exact face and riverside boat setting, but soften the sun disk and reduce haze on the face—no crowded ghats overlapping the subject.`,
  },
  "cinematic-ensemble": {
    intro: `Dramatic movie-cast ensemble portrait from a group photo—cinematic lighting, every face kept. Upload a clear group photo with even lighting.`,
    tips: [
      `All faces should be sharp and similarly sized; distant tiny faces lose identity.`,
      `If someone disappears, demand the exact same number of people and distinct faces.`,
      `Ask for cinematic key light without melting skin detail.`,
      `Keep clothing cues if you want real outfits; otherwise note a cohesive costume grade carefully.`,
    ],
    faqs: [
      {
        question: `Anime group instead?`,
        answer: `Use anime squad or rooftop anime friends for illustrated group looks.`,
      },
      {
        question: `Family Diwali group?`,
        answer: `Prefer courtyard or dinner-table Diwali pages for festive family stories.`,
      },
      {
        question: `How many people?`,
        answer: `Small-to-medium groups with readable faces work best.`,
      },
      {
        question: `Background too sci-fi?`,
        answer: `Ask for a simple cinematic backdrop that supports a cast portrait, not a spaceship bay.`,
      },
    ],
    addonLine: `Want a softer ensemble grade? Add: keep every exact face and group arrangement, but ease the dramatic contrast and keep wardrobe modest—no horror makeup unless you ask.`,
  },
  "birthday-ai-photo-prompt-girl-pastel-cake": {
    intro: `Pastel birthday portrait for girls: balloon wall, seated beside a tiered cake, real face kept. Use one clear waist-up or full-length photo.`,
    tips: [
      `Even daylight sources keep pastel colours from crushing skin tone.`,
      `If the cake collapses, ask for a simple tiered pastel cake with clean edges and five natural fingers near it.`,
      `Keep exact face shape and skin tone—pastel grades often lighten faces.`,
      `Ask for a balloon wall behind, not random floating orbs over the hair.`,
    ],
    faqs: [
      {
        question: `Black-and-gold boy look instead?`,
        answer: `Use the birthday black-gold boy page for suit/kurta cake-cutting.`,
      },
      {
        question: `Kids garden party?`,
        answer: `Use the kids garden birthday page for toddlers; this is a girl pastel cake wall look.`,
      },
      {
        question: `Must I sit in the source?`,
        answer: `No. The prompt can build the seated cake pose when pose is not preserved.`,
      },
      {
        question: `Outfit stays mine?`,
        answer: `Preserve clothing to keep it; off restyles into party wear while locking the face.`,
      },
    ],
    addonLine: `Want a softer pastel party? Add: keep the exact face, balloon wall, and tiered cake, but mute the pastel saturation slightly and use a calmer smile—no neon signs or extra guests.`,
  },
  "birthday-ai-photo-prompt-boy-black-gold": {
    intro: `Luxe black-and-gold birthday cake-cutting for boys and young men: suit or gold-detail kurta, balloon arch, face locked. Use a sharp waist-up daytime portrait.`,
    tips: [
      `Shoot waist-up in even daylight; busy corridors fray black suit edges against balloons.`,
      `If the cake knife warps, ask for one clean mid-cut pose with a gold-drip black cake and five natural fingers.`,
      `Say keep exact face shape, beard or clean shave, hairline, and skin tone—do not lighten or slim.`,
      `Ask for a black-and-metallic-gold balloon arch, not pastel balloons.`,
    ],
    faqs: [
      {
        question: `Suit or kurta—which one?`,
        answer: `Either is allowed when clothing is off: black suit with plain white shirt (no tie) or black sherwani-style kurta with subtle gold detail. Ask for one if you prefer.`,
      },
      {
        question: `Child birthday?`,
        answer: `Aimed at older boys and young men. For little kids use baby/kids birthday styles.`,
      },
      {
        question: `Can I keep my hoodie?`,
        answer: `Preserve clothing; otherwise the look restyles into suit or kurta.`,
      },
      {
        question: `Candles look melted?`,
        answer: `Ask for lit candles with clean flames and a simple gold-drip cake.`,
      },
    ],
    addonLine: `Want a sharper party finish? Add: keep the black cake with gold drip and the balloon arch, but add a thin gold wristwatch and a confident mid-cut smile—no pastel balloons or extra guests.`,
  },
  "baby-boy-birthday-photo-ai-prompt-number-balloon": {
    intro: `Baby boy birthday frame with a big gold number balloon and confetti—soft, safe, real baby likeness kept. Upload a clear baby/toddler photo with face visible.`,
    tips: [
      `Use a sharp, well-lit baby photo; blur invents a different child.`,
      `Ask for one clear number balloon (say the age) and soft confetti—not hard décor near eyes.`,
      `Keep exact infant proportions and skin tone.`,
      `If hands look odd holding ribbons, ask for natural baby hands or keep hands resting safely.`,
    ],
    faqs: [
      {
        question: `Girl baby?`,
        answer: `This page is written for baby boy styling; for girls prefer pastel cake or kids garden looks.`,
      },
      {
        question: `Which number appears?`,
        answer: `Specify the age digit you want on the balloon if the model guesses wrong.`,
      },
      {
        question: `Parents in frame?`,
        answer: `Baby-forward solo look. Family birthday groups need a friends/party or collage style.`,
      },
      {
        question: `Balloon looks like foil mush?`,
        answer: `Ask for a distinct metallic number balloon with clean edges.`,
      },
    ],
    addonLine: `Want a gentler baby birthday? Add: keep the exact baby face and gold number balloon, but reduce confetti density and use soft cream light—no sparklers or loud party crowds.`,
  },
  "happy-birthday-ai-photo-editing-prompt-girl-neon": {
    intro: `Girl birthday photoshoot with a glowing pink Happy Birthday neon sign—face kept exact. Use one clear waist-up photo.`,
    tips: [
      `Sharp face photos hold up when neon pink hits the skin.`,
      `If neon text warps, ask for a simple readable Happy Birthday neon sign behind—not over the face.`,
      `Keep exact skin tone; neon often over-pinks cheeks—say do not change complexion.`,
      `Ask for clean hair edges so neon glow does not melt into strands.`,
    ],
    faqs: [
      {
        question: `Pastel cake instead?`,
        answer: `Use the pastel cake girl page for balloon-wall cake seating; this is neon-sign energy.`,
      },
      {
        question: `Boy neon?`,
        answer: `This page is girl-focused; boys have black-gold, moody candle, or 3D poster looks.`,
      },
      {
        question: `Must the sign say Happy Birthday in English?`,
        answer: `You can ask for a short bilingual line, but keep lettering simple and behind you.`,
      },
      {
        question: `Outfit too clubby?`,
        answer: `Ask for modest party wear with soft fabric, not extreme fashion.`,
      },
    ],
    addonLine: `Want softer neon birthday light? Add: keep the exact face and pink neon sign, but lower the glow intensity and keep wardrobe simple—no extra party guests or cake knife unless you ask.`,
  },
  "birthday-ai-photo-prompt-men-rooftop-night": {
    intro: `Men’s birthday rooftop at night: candles, cake, city lights—polished adult celebration, face locked. Use one clear waist-up photo of an adult man.`,
    tips: [
      `Even-lit face sources survive night grades better than harsh under-chin selfies.`,
      `If candles smear, ask for a small set of real candle flames and a simple cake on the table.`,
      `Keep beard, hairline, and skin tone exact—no de-age.`,
      `Ask for city-light bokeh in the distance, not neon text across the chest.`,
    ],
    faqs: [
      {
        question: `Friends around the cake?`,
        answer: `Use the friends party birthday page for a group laugh with confetti.`,
      },
      {
        question: `Black-gold balloon arch instead?`,
        answer: `That is the boy black-gold page; this one is night rooftop candles and city lights.`,
      },
      {
        question: `Can I keep a blazer?`,
        answer: `Preserve clothing, or ask for smart-casual rooftop wear when clothing is off.`,
      },
      {
        question: `City looks wrong?`,
        answer: `Ask for generic distant city bokeh without readable brand billboards.`,
      },
    ],
    addonLine: `Want a quieter rooftop birthday? Add: keep the exact face, cake, and city bokeh, but reduce candle count and use a calmer smile—no sparklers and no crowd of friends unless you switch to the friends party style.`,
  },
  "birthday-photo-shoot-ai-prompt-friends-party": {
    intro: `Friends birthday party shoot: laughing group around a cake with a confetti burst—every face kept. Upload one group photo of 2–6 friends with visible faces.`,
    tips: [
      `Every face must be sharp; overlapping cheeks are the usual merge failure.`,
      `Insist on exact headcount if someone vanishes into confetti.`,
      `Ask for a simple cake as the center and confetti in the air—not covering eyes.`,
      `Keep relative heights honest across the friend group.`,
    ],
    faqs: [
      {
        question: `Solo birthday?`,
        answer: `Use girl pastel, boy black-gold, men rooftop, or neon girl pages.`,
      },
      {
        question: `Partner collage instead?`,
        answer: `Use the friends-or-partner birthday collage page for four-frame memory grids.`,
      },
      {
        question: `How many friends max?`,
        answer: `About 2–6 with readable faces holds identity better than a packed hall.`,
      },
      {
        question: `Confetti looks like noise?`,
        answer: `Ask for distinct paper confetti pieces with motion, not colour static.`,
      },
    ],
    addonLine: `Want a cleaner party candid? Add: keep every exact face and the cake-centered laugh, but thin out confetti so eyes stay clear—no strangers added to the group.`,
  },
  "birthday-photo-ai-prompt-instagram-mirror-selfie": {
    intro: `Instagram mirror-selfie birthday look: aesthetic room full of balloons, face kept. Use one clear photo with the face fully visible.`,
    tips: [
      `Face must be unobstructed—hair or phone hiding eyes breaks likeness.`,
      `If balloons crush the room, ask for a tidy balloon fill behind the mirror, not covering the reflection face.`,
      `Keep exact skin tone and body proportions; mirror edits often slim people—say do not slim.`,
      `Ask for clean mirror reflection without warped phone UI text.`,
    ],
    faqs: [
      {
        question: `No phone in hand?`,
        answer: `Ask for a mirror portrait without a phone if you prefer a clean reflection.`,
      },
      {
        question: `Boy mirror selfie?`,
        answer: `This page leans girl/woman aesthetic; boys can still try it or use black-gold/moody candle instead.`,
      },
      {
        question: `Outfit preserved?`,
        answer: `Turn clothing on to keep your real look.`,
      },
      {
        question: `Mirror warps my face?`,
        answer: `Ask for accurate mirror geometry and exact facial proportions.`,
      },
    ],
    addonLine: `Want a calmer mirror birthday? Add: keep the exact face and balloon-filled room, but simplify balloon colours and keep the mirror clean—no floating Happy Birthday stickers on the glass.`,
  },
  "trending-birthday-boy-ai-photo-prompt-moody-candle": {
    intro: `Moody cinematic birthday portrait for boys: single candle light, dark grade, real face kept. Use one clear chest-up photo.`,
    tips: [
      `A sharp chest-up source in normal light works; the prompt builds the candle key.`,
      `If the candle burns out facial detail, ask for soft candle key with visible eyes and natural skin texture.`,
      `Keep beard/hairline exact—no beautify.`,
      `Ask for minimal props—one candle mood, not a full cake table unless you want it.`,
    ],
    faqs: [
      {
        question: `Party balloons instead?`,
        answer: `Use black-gold boy or friends party pages for balloon energy.`,
      },
      {
        question: `Men rooftop night?`,
        answer: `Rooftop night is candles plus city skyline cake table; this is a tighter moody candle portrait.`,
      },
      {
        question: `Can I smile big?`,
        answer: `Ask for a subtle expression if the dark grade makes a wide smile look forced.`,
      },
      {
        question: `Background pure black?`,
        answer: `Ask for gentle falloff into dark space, not a cut-out silhouette.`,
      },
    ],
    addonLine: `Want a softer candle mood? Add: keep the exact face and single-candle key light, but lift shadow detail slightly on the eyes—no balloon arch and no neon birthday text.`,
  },
  "kids-birthday-photo-ai-prompt-garden-party": {
    intro: `Toddler first-birthday garden picnic setup—sunny, soft, child likeness kept. Upload a clear toddler/young child photo with face visible.`,
    tips: [
      `Sharp daylight on the child’s face beats indoor murk for garden grades.`,
      `Ask for soft picnic props and safe décor—no sparklers or hard edges near the child.`,
      `Keep exact age proportions; do not age up a toddler into a school kid.`,
      `If balloons dominate, ask for a simple garden picnic with restrained balloon accents.`,
    ],
    faqs: [
      {
        question: `Baby number balloon instead?`,
        answer: `Use the baby boy number-balloon page for foil number focus.`,
      },
      {
        question: `Girl pastel cake wall?`,
        answer: `That is an older-girl pastel cake look; this is toddler garden picnic.`,
      },
      {
        question: `Parents beside the child?`,
        answer: `This page is child-forward; ask explicitly if you need one parent partially in frame.`,
      },
      {
        question: `Grass looks fake?`,
        answer: `Ask for natural sunlit garden ground with soft shadows.`,
      },
    ],
    addonLine: `Want a gentler garden first birthday? Add: keep the exact child face and sunny picnic setup, but reduce prop clutter and keep flowers soft in the background—no crowded adult party behind the toddler.`,
  },
  "birthday-photo-frame-design-ai-prompt-floral-card": {
    intro: `Your portrait inside a floral watercolor birthday card frame—keepsake layout, face locked. Use one clear chest-up photo.`,
    tips: [
      `Centered face photos fit card frames better than extreme side profiles.`,
      `If flowers cover the chin, ask for floral border only around the edges with a clear face window.`,
      `Keep exact skin tone and features inside the frame.`,
      `Ask for watercolor card texture without unreadable greeting text unless you specify a short wish.`,
    ],
    faqs: [
      {
        question: `3D text poster instead?`,
        answer: `Use the birthday wishes 3D text poster page for big lettering heroes.`,
      },
      {
        question: `Couple frame?`,
        answer: `This is solo card design; use collage for two people.`,
      },
      {
        question: `Must text say Happy Birthday?`,
        answer: `Optional—ask for no text, or one short wish outside the face area.`,
      },
      {
        question: `Frame too thick?`,
        answer: `Ask for a balanced border that keeps the face large and readable.`,
      },
    ],
    addonLine: `Want a cleaner floral card? Add: keep the exact face in the center window, but simplify the floral border and leave negative space—no crowded typography over the portrait.`,
  },
  "birthday-wishes-ai-photo-prompt-3d-text-poster": {
    intro: `Bold birthday wishes poster with big 3D lettering and your real face as the hero. Use one clear waist-up photo.`,
    tips: [
      `Sharp face needed—3D type will fight soft selfies.`,
      `If letters cover eyes, ask for large 3D birthday wishes arranged around—not over—the face.`,
      `Keep exact likeness; poster grades should not reshape the jaw.`,
      `Ask for clean poster composition without random logos.`,
    ],
    faqs: [
      {
        question: `Floral card instead?`,
        answer: `Floral card is a soft watercolor frame; this is a bold 3D type poster.`,
      },
      {
        question: `Girl neon sign?`,
        answer: `Neon girl page is a photoshoot with a pink neon sign backdrop, not 3D poster type.`,
      },
      {
        question: `Custom name in text?`,
        answer: `You can ask for a short name wish, but keep spelling simple and off the face.`,
      },
      {
        question: `Background busy?`,
        answer: `Ask for a simple poster backdrop that supports the 3D type.`,
      },
    ],
    addonLine: `Want a cleaner poster hierarchy? Add: keep the exact face and bold 3D birthday wishes, but move lettering further from the eyes and simplify the colour stack—no neon sign duplicates behind.`,
  },
  "ai-birthday-photo-collage-prompt-friends-or-partner": {
    intro: `Four-frame birthday memory collage of two people—each face locked to its source. Upload two clear photos or one of you both.`,
    tips: [
      `Label person A and person B when using two uploads so frames do not swap identities.`,
      `Ask for four coherent frames with consistent lighting mood across the collage.`,
      `Keep both exact faces—no blend between partners/friends.`,
      `If gutters look messy, ask for clean thin dividers and balanced crops.`,
    ],
    faqs: [
      {
        question: `Friends party group photo instead?`,
        answer: `Friends party is one candid group around a cake; this is a four-frame collage from two identities.`,
      },
      {
        question: `Solo collage?`,
        answer: `This page is built for two people. Solo card/poster pages fit one face better.`,
      },
      {
        question: `Order of photos?`,
        answer: `Upload person A first, then person B, and mention that order if faces swap.`,
      },
      {
        question: `Frames look like random AI scenes?`,
        answer: `Ask for birthday-memory moments that still keep both real faces recognizable.`,
      },
    ],
    addonLine: `Want a softer memory collage? Add: keep both exact faces across four frames, but unify a warm birthday grade and reduce prop clutter in each tile—no sparklers unless one frame needs them.`,
  },
  "joyful-outdoor-lifestyle": {
    intro: `Bright outdoor candid with light clothes, soft trees, and sparse colourful confetti—celebration energy, real smile kept. Use an outdoor-friendly portrait with a visible face.`,
    tips: [
      `Outdoor daylight sources match this look better than dark indoor selfies.`,
      `If confetti smears, ask for sparse colourful pieces—not a storm over the eyes.`,
      `Keep exact face and skin tone in bright grade.`,
      `Ask for soft park-side trees without unreadable signage.`,
    ],
    faqs: [
      {
        question: `Is this a birthday set?`,
        answer: `Birthday-adjacent outdoor celebration; cake-wall birthday pages are more explicit party sets.`,
      },
      {
        question: `Group version?`,
        answer: `Solo candid. Use friends party for a group cake laugh.`,
      },
      {
        question: `Rainy day source OK?`,
        answer: `Possible, but even daylight sources grade more cleanly.`,
      },
      {
        question: `Outfit too formal?`,
        answer: `Ask for light casual clothes if clothing is not preserved.`,
      },
    ],
    addonLine: `Want a calmer outdoor candid? Add: keep the exact face and light outdoor setting, but thin confetti to a few pieces and keep the smile natural—no birthday cake table unless you ask.`,
  },
  "ai-action-figure-prompt-premium-collectible": {
    intro: `You as a premium 1/7-scale collectible figure in a window box on a desk—plastic sheen, real face kept. Use one clear chest-up photo.`,
    tips: [
      `Face must be sharp; toy grades amplify soft selfies into stranger faces.`,
      `Ask for clear window-box plastic and a desk display setting.`,
      `Keep exact likeness on the figure head—no beautify into a generic doll.`,
      `Say no readable brand logos on the box.`,
    ],
    faqs: [
      {
        question: `Couple two-pack instead?`,
        answer: `Use the couple action-figure two-pack page for two people in one box.`,
      },
      {
        question: `Clay stop-motion?`,
        answer: `Different medium—clay puppets, not plastic collectibles.`,
      },
      {
        question: `Game menu UI?`,
        answer: `That is the main-character game menu page, not a physical figure.`,
      },
      {
        question: `Box text gibberish?`,
        answer: `Ask for minimal or blank collector box graphics with no logos.`,
      },
    ],
    addonLine: `Want a cleaner shelf collectible? Add: keep the exact face on the figure and the window box, but simplify box graphics and use soft desk daylight—no couple two-pack accessories.`,
  },
  "anime-girl-ai-photo-prompt-gemini-meadow": {
    intro: `Soft hand-painted anime girl in a windy meadow—film-style polish, real face cues kept. Use one clear chest-up or waist-up photo.`,
    tips: [
      `Sharp eyes in the source help the anime pass keep your likeness.`,
      `If the meadow eats the figure, ask for the girl as clear focal point with scenic depth behind.`,
      `Keep hairstyle identity while allowing anime styling—say keep recognizable face structure.`,
      `Ask for modern premium anime—not chibi proportions.`,
    ],
    faqs: [
      {
        question: `Chibi sticker instead?`,
        answer: `Use cute chibi girl sticker or viral chibi friends sheet for big-head stickers.`,
      },
      {
        question: `Boy power aura?`,
        answer: `That is the anime boy power-aura page.`,
      },
      {
        question: `Saree anime heroine?`,
        answer: `Use the saree/lehenga anime character page for traditional dress.`,
      },
      {
        question: `Couple under blossoms?`,
        answer: `Use cherry-blossom anime couple for two-photo merges.`,
      },
    ],
    addonLine: `Want a calmer meadow anime? Add: keep the recognizable face and hand-painted anime finish, but soften wind in the hair and use gentle late-afternoon light—no sparklers or heavy effects.`,
  },
  "anime-boy-ai-photo-prompt-gemini-power-aura": {
    intro: `Action-genre anime boy/man with a glowing energy aura—hero presence, recognizable face. Use one clear chest-up or waist-up photo.`,
    tips: [
      `Sharp face sources keep identity when aura effects get bright.`,
      `If aura covers the face, ask for glow around the body/shoulders, not over the eyes.`,
      `Keep exact hair cues and face structure in the anime restyle.`,
      `Ask for premium action anime—not toddler chibi.`,
    ],
    faqs: [
      {
        question: `Rainy neon street instead?`,
        answer: `Use rainy-night street anime boy for umbrella neon mood.`,
      },
      {
        question: `Hoodie bike trend?`,
        answer: `That is the trending hoodie-and-bike anime boy page.`,
      },
      {
        question: `Cricket hero?`,
        answer: `Use anime cricket hero for bat-and-pitch action.`,
      },
      {
        question: `Group squad?`,
        answer: `Use anime squad or rooftop sunset friends.`,
      },
    ],
    addonLine: `Want a cleaner power aura? Add: keep the recognizable face and action anime finish, but tame the aura brightness and keep the stance stable—no extra villains in frame.`,
  },
  "anime-squad": {
    intro: `Premium contemporary anime portrait of your friend squad—everyone recognizable, exact headcount. Best with an evenly lit group photo where faces are sharp and not heavily overlapping.`,
    tips: [
      `Crop tight so every face is large before upload; tiny distant faces lose identity.`,
      `If two friends merge, insist on the exact same number of people and distinct faces.`,
      `Keep clothing/arrangement toggles on for real outfits and poses; turn off only for a restyled adventure wardrobe.`,
      `Ask for modern premium anime linework—not chibi stickers.`,
    ],
    faqs: [
      {
        question: `Will this turn us into chibi?`,
        answer: `No. Default is polished contemporary anime with adult proportions—not a chibi scrapbook.`,
      },
      {
        question: `How many friends?`,
        answer: `Match a real group with clear faces; about three to six usually holds identity better than a distant crowd.`,
      },
      {
        question: `Rooftop sunset friends instead?`,
        answer: `Rooftop sunset is a specific cel-shaded rooftop hangout; this squad page is a broader polished ensemble.`,
      },
      {
        question: `Pet in the group?`,
        answer: `Faces of people first; pets may drift—use anime companion for a pet hero shot.`,
      },
    ],
    addonLine: `Want a stronger adventure backdrop? Add: keep every real face and the contemporary anime finish, but set them on a windy cliff path at golden hour with deep scenic depth—no text, speech bubbles, or extra characters.`,
  },
  "rooftop-sunset-anime-friends-ai-photo-prompt": {
    intro: `Friend group as warm cel-shaded anime on a sunset rooftop hangout—every face kept. Upload one group photo of 2–5 friends with clear faces.`,
    tips: [
      `2–5 friends with large faces works better than a packed party crop.`,
      `Ask for sunset rooftop depth and warm sky without melting faces into orange.`,
      `Insist on exact headcount if someone vanishes.`,
      `Keep premium anime styling—not sticker chibi.`,
    ],
    faqs: [
      {
        question: `Anime squad vs this?`,
        answer: `Squad is a polished general ensemble; this page locks a sunset rooftop hangout story.`,
      },
      {
        question: `Chibi friends sheet?`,
        answer: `Viral chibi friends makes sticker sheets; this stays proportional anime.`,
      },
      {
        question: `Two people only?`,
        answer: `Works. Cherry-blossom couple is better when you want a romantic two-photo merge.`,
      },
      {
        question: `Night rooftop instead?`,
        answer: `Ask carefully for dusk; true night neon fits rainy-street boy more than this sunset hangout.`,
      },
    ],
    addonLine: `Want a quieter rooftop sunset? Add: keep every exact face and cel-shaded anime finish, but soften the sun disk and keep hanging-out poses relaxed—no sparklers or speech bubbles.`,
  },
  "cute-chibi-ai-photo-prompt-girls-sticker": {
    intro: `Big-head cute chibi sticker of a girl with a white die-cut border—playful, still tied to your face cues. Use one clear chest-up photo.`,
    tips: [
      `Chest-up face-forward photos convert to stickers more cleanly than full-body party shots.`,
      `Ask for a clean white die-cut border and simple sticker shading.`,
      `Keep recognizable face cues even in chibi proportions—eyes/hair identity matters.`,
      `Say no tiny unreadable text on the sticker.`,
    ],
    faqs: [
      {
        question: `Friends sticker sheet?`,
        answer: `Use viral chibi friends for multi-friend sticker sheets.`,
      },
      {
        question: `Daydream scrapbook collage?`,
        answer: `Chibi daydream collage is a multi-element scrapbook page, not a single die-cut sticker.`,
      },
      {
        question: `Premium anime meadow instead?`,
        answer: `Anime girl meadow stays non-chibi film-style anime.`,
      },
      {
        question: `Boy chibi?`,
        answer: `This page is girls-focused; boys can still try or use other anime boy pages in non-chibi style.`,
      },
    ],
    addonLine: `Want a cleaner chibi sticker? Add: keep the recognizable face cues and die-cut border, but simplify accessories and keep colours soft—no crowded scrapbook collage behind the sticker.`,
  },
  "rainy-night-street-anime-boy-ai-photo-prompt": {
    intro: `Moody anime boy under an umbrella on a neon-wet street—rain reflections, recognizable face. Use one clear waist-up photo.`,
    tips: [
      `Sharp face helps when neon reflections get busy.`,
      `If rain streaks cover eyes, ask for rain in the environment with a clear face under the umbrella.`,
      `Keep hair and face structure recognizable in the anime pass.`,
      `Ask for wet street reflections without unreadable store logos.`,
    ],
    faqs: [
      {
        question: `Power aura hero instead?`,
        answer: `Power aura is energy-action anime; this is rainy neon street mood.`,
      },
      {
        question: `Hoodie bike sunset?`,
        answer: `That is a different trending bike aesthetic at sunset.`,
      },
      {
        question: `Girl rainy street?`,
        answer: `Written for boy/man; girls may prefer meadow or pastel college anime pages.`,
      },
      {
        question: `Umbrella required in source?`,
        answer: `No—the prompt can add it when pose is not preserved.`,
      },
    ],
    addonLine: `Want a calmer rainy neon mood? Add: keep the recognizable face, umbrella, and wet street, but reduce neon saturation slightly—no action aura blasts unless you switch to power-aura boy.`,
  },
  "cherry-blossom-anime-couple-prompt-gemini": {
    intro: `Two photos into one anime couple under cherry blossoms—both faces distinct. Upload person A then person B with clear faces.`,
    tips: [
      `Similar camera height in both sources prevents floating shoulders.`,
      `Name person A and person B if faces swap or blend.`,
      `Ask for blossom petals in the air without covering eyes.`,
      `Keep premium anime couple styling—not chibi dual stickers.`,
    ],
    faqs: [
      {
        question: `Hand-painted picnic couple?`,
        answer: `Picnic couple is a meadow picnic story; this is blossom-tree romance.`,
      },
      {
        question: `Real-photo merge instead?`,
        answer: `Use merge guide couple styles for photoreal merges.`,
      },
      {
        question: `Solo blossom?`,
        answer: `This page needs two identities; solo anime girl meadow fits one person.`,
      },
      {
        question: `Outfit preserved?`,
        answer: `Keep toggles on for real clothes; off restyles into anime-friendly spring wear.`,
      },
    ],
    addonLine: `Want a softer blossom couple? Add: keep both exact faces and the anime finish, but ease petal density and use gentle spring light—no festival sparklers in the grove.`,
  },
  "pastel-anime-college-girl-ai-photo-prompt": {
    intro: `Aesthetic pastel anime college-campus portrait with drifting blossom petals—recognizable face. Use one clear chest-up or waist-up photo.`,
    tips: [
      `Clean face photos keep likeness when pastel grades push brightness.`,
      `If campus background flattens, ask for simple building/path depth behind the subject.`,
      `Keep hairstyle identity and skin tone cues in the anime restyle.`,
      `Ask for soft petals—not a pink fog on the face.`,
    ],
    faqs: [
      {
        question: `Meadow film anime instead?`,
        answer: `Meadow is windy field film-style; this is campus pastel aesthetic.`,
      },
      {
        question: `Saree anime?`,
        answer: `Use saree/lehenga anime character for traditional dress.`,
      },
      {
        question: `Chibi sticker?`,
        answer: `Different proportions—use the cute chibi sticker page.`,
      },
      {
        question: `Boy campus look?`,
        answer: `Written for college-girl aesthetic; boys have hoodie-bike or rainy street options.`,
      },
    ],
    addonLine: `Want a calmer campus pastel? Add: keep the recognizable face and pastel anime grade, but reduce petal count and keep the expression soft—no chibi head proportions.`,
  },
  "anime-cricket-hero-boy-ai-photo-prompt": {
    intro: `Action anime cricketer mid-shot on a sunny ground—hero sports energy, face recognizable. Use one clear chest-up or waist-up photo.`,
    tips: [
      `Sharp face needed when motion and bat swing lines appear.`,
      `If the bat warps hands, ask for a clear bat grip with five natural fingers.`,
      `Keep face likeness under bright ground light.`,
      `Ask for a cricket ground backdrop without branded stadium ads.`,
    ],
    faqs: [
      {
        question: `Power aura instead?`,
        answer: `Power aura is generic energy hero; this is cricket-specific.`,
      },
      {
        question: `Group sports photo?`,
        answer: `Solo hero shot. Squad pages cover friend groups.`,
      },
      {
        question: `Must I wear whites in source?`,
        answer: `No. Clothing off can restyle into cricket kit while locking the face.`,
      },
      {
        question: `Ball looks glued?`,
        answer: `Ask for believable ball position and natural hand anatomy.`,
      },
    ],
    addonLine: `Want a cleaner cricket hero frame? Add: keep the recognizable face and mid-shot cricket action, but reduce motion streaks near the eyes—no crowd of invented teammates unless you ask.`,
  },
  "viral-chibi-friends-ai-prompt-sticker-sheet": {
    intro: `One friends photo turned into a chibi sticker sheet—each friend readable, playful borders. Upload one group photo of 2–4 friends with clear faces.`,
    tips: [
      `2–4 large faces convert better than a distant party crowd.`,
      `Insist on exact friend count if stickers merge people.`,
      `Ask for separate sticker cutouts or a clean sheet layout without muddy overlaps.`,
      `Keep each face recognizable even with chibi heads.`,
    ],
    faqs: [
      {
        question: `Single girl chibi sticker?`,
        answer: `Use cute chibi girls sticker for one die-cut character.`,
      },
      {
        question: `Non-chibi squad anime?`,
        answer: `Use anime squad or rooftop sunset friends.`,
      },
      {
        question: `Family countryside anime?`,
        answer: `That page keeps proportional anime for family groups.`,
      },
      {
        question: `Pets as stickers?`,
        answer: `People faces first; use anime companion for a pet hero.`,
      },
    ],
    addonLine: `Want a tidier sticker sheet? Add: keep every friend’s recognizable face cues, but simplify sticker accessories and use a clean white sheet background—no tiny unreadable captions.`,
  },
  "anime-character-ai-photo-prompt-in-saree-or-lehenga": {
    intro: `Cel-shaded anime heroine in saree or lehenga—traditional dress, modern anime finish, face cues kept. Use one clear waist-up photo, ideally with hair visible.`,
    tips: [
      `Waist-up helps saree/lehenga drape read while keeping the face large.`,
      `If fabric patterns melt, ask for clearer textile detail without changing the face.`,
      `Keep recognizable facial structure in the anime pass.`,
      `Ask for tasteful traditional wear—not over-ornate costume armour.`,
    ],
    faqs: [
      {
        question: `Fashion editorial photo instead?`,
        answer: `South Asian fashion editorial stays photoreal; this is anime cel-shade.`,
      },
      {
        question: `Meadow anime dress?`,
        answer: `Meadow is soft film anime in non-traditional windy attire; this is saree/lehenga focused.`,
      },
      {
        question: `Couple traditional anime?`,
        answer: `Use cherry-blossom couple or picnic couple merges.`,
      },
      {
        question: `Lehenga vs saree?`,
        answer: `Ask for the one you want when clothing is not preserved.`,
      },
    ],
    addonLine: `Want a softer traditional anime heroine? Add: keep the recognizable face and saree/lehenga drape, but ease jewellery density and use gentle key light—no battle aura effects.`,
  },
  "trending-anime-boy-ai-photo-prompt-hoodie-bike": {
    intro: `Trending anime boy look: hoodie, bicycle, sunset street aesthetic—recognizable face. Use one clear waist-up photo.`,
    tips: [
      `Sharp face + visible shoulders help hoodie silhouette stay clean.`,
      `If the bike geometry breaks, ask for a simple bicycle as supporting prop, not tangled metal.`,
      `Keep hair and face likeness under sunset grade.`,
      `Ask for street depth without readable brand shop signs.`,
    ],
    faqs: [
      {
        question: `Rainy neon umbrella instead?`,
        answer: `Different mood page—rainy night street anime boy.`,
      },
      {
        question: `Power aura?`,
        answer: `Action energy page, not bike-street trend.`,
      },
      {
        question: `Group bike ride?`,
        answer: `Solo. Use squad/friends pages for groups.`,
      },
      {
        question: `Must the bike be in my photo?`,
        answer: `No—the prompt can add it when pose/props are free.`,
      },
    ],
    addonLine: `Want a calmer hoodie-bike sunset? Add: keep the recognizable face, hoodie, and bicycle, but soften sunset flare—no rainy neon umbrella unless you switch to rainy-street boy.`,
  },
  "turn-photo-into-anime-countryside-family-ai-prompt": {
    intro: `Whole family/friends photo as a hand-painted countryside anime film scene—every face kept. Upload one group photo of 2–6 people with every face clear.`,
    tips: [
      `All faces sharp and not tiny; countryside depth should not erase people.`,
      `Insist on exact headcount and distinct identities.`,
      `Ask for soft painted landscape that stays behind the group.`,
      `Keep proportional anime—not chibi family stickers.`,
    ],
    faqs: [
      {
        question: `Anime squad adventure?`,
        answer: `Squad is contemporary polished ensemble; this is countryside film-scene storytelling.`,
      },
      {
        question: `Clay stop-motion group?`,
        answer: `Different medium—clay puppets, not painted anime.`,
      },
      {
        question: `Two-person picnic couple?`,
        answer: `Use hand-painted anime picnic couple for a two-photo romantic picnic.`,
      },
      {
        question: `Pets included?`,
        answer: `People first; pets may need a separate anime companion pass.`,
      },
    ],
    addonLine: `Want a quieter countryside film still? Add: keep every exact face and hand-painted anime finish, but soften wind and keep the family clustered naturally—no fantasy creatures in the field.`,
  },
  "chibi-daydream-collage": {
    intro: `Chibi daydream scrapbook collage from one portrait—playful stickers and paper layers, face cues kept. Use one clear portrait.`,
    tips: [
      `Chest-up face photos give the collage a strong hero sticker.`,
      `If layers cover the face, ask for the chibi face clear in the focal sticker.`,
      `Keep recognizable features despite chibi proportions.`,
      `Ask for scrapbook paper textures without unreadable junk text.`,
    ],
    faqs: [
      {
        question: `Single die-cut sticker?`,
        answer: `Use cute chibi girls sticker for one clean sticker.`,
      },
      {
        question: `Friends sticker sheet?`,
        answer: `Viral chibi friends covers multi-friend sheets.`,
      },
      {
        question: `Non-chibi anime?`,
        answer: `Meadow/squad pages stay proportional anime.`,
      },
      {
        question: `Photo realistic scrapbook?`,
        answer: `This page is chibi collage by design.`,
      },
    ],
    addonLine: `Want a cleaner daydream collage? Add: keep the recognizable chibi face as the hero element, but reduce overlapping stickers and leave calmer negative space—no sparkler props.`,
  },
  "anime-companion": {
    intro: `Polished anime companion portrait of your pet—species and markings kept, anime finish. Upload a clear pet photo with eyes visible.`,
    tips: [
      `Eyes and markings should be sharp; blurry pets become generic anime animals.`,
      `Ask to preserve breed cues, coat pattern, and eye colour.`,
      `Keep one pet only unless you intentionally upload a multi-pet frame.`,
      `Ask for a simple scenic anime backdrop that does not warp anatomy.`,
    ],
    faqs: [
      {
        question: `Cartoon film pet instead?`,
        answer: `Cartoon animation pet is a different polished film-cartoon look.`,
      },
      {
        question: `3D toon pet?`,
        answer: `Cute 3D toon pet is dimensional toon, not 2D anime.`,
      },
      {
        question: `Owner + pet?`,
        answer: `This page is pet hero; people may drift—run separately if needed.`,
      },
      {
        question: `Two pets?`,
        answer: `Better one hero pet per run for markings accuracy.`,
      },
    ],
    addonLine: `Want a gentler anime pet portrait? Add: keep exact markings and eye colour, but soften the anime glow and keep the pet centered—no outfit clothes on animals unless you ask.`,
  },
  "cartoon-animation-pet": {
    intro: `Polished animated-film pet character from your photo—expressive cartoon finish with real markings cues. Use a clear pet photo with eyes visible.`,
    tips: [
      `Sharp eyes and coat pattern matter more than fancy backgrounds in the source.`,
      `Ask to keep species, breed cues, and colour markings.`,
      `Avoid heavy filters that invent a different animal.`,
      `Ask for film-cartoon shading—not photoreal fur, not chibi sticker.`,
    ],
    faqs: [
      {
        question: `Anime companion vs this?`,
        answer: `Anime companion is anime styling; this is animated-film cartoon styling.`,
      },
      {
        question: `3D toon pet?`,
        answer: `3D toon is cute dimensional CGI-like character.`,
      },
      {
        question: `Group of pets?`,
        answer: `One clear pet per pass holds identity better.`,
      },
      {
        question: `Owner in frame?`,
        answer: `Pet-focused; crop to the animal when possible.`,
      },
    ],
    addonLine: `Want a softer animated-film pet? Add: keep markings and eye colour, but ease outline hardness and keep a simple cozy backdrop—no human clothes on the pet.`,
  },
  "cute-3d-toon-pet": {
    intro: `Cute polished 3D toon pet character—soft rounded form, real coat pattern cues kept. Upload a clear pet photo with eyes visible.`,
    tips: [
      `Distinctive markings and eye colour should be obvious in the source.`,
      `Ask for soft 3D toon materials—not flat sticker chibi.`,
      `Keep species-correct features (ears, snout, body) while stylizing.`,
      `Say no extra floating toys unless you want them.`,
    ],
    faqs: [
      {
        question: `Anime or cartoon film instead?`,
        answer: `Those are 2D stylizations; this is cute 3D toon.`,
      },
      {
        question: `Action figure person?`,
        answer: `Human collectible pages are separate from pet toon.`,
      },
      {
        question: `Two pets?`,
        answer: `Run one pet at a time for cleaner markings.`,
      },
      {
        question: `Background messy?`,
        answer: `Ask for a simple display-friendly backdrop.`,
      },
    ],
    addonLine: `Want a calmer 3D toon pet? Add: keep coat pattern and eye colour, but reduce specular shine and use cozy indoor light—no party confetti around the pet.`,
  },
  "hand-painted-anime-picnic-couple-ai-photo-prompt": {
    intro: `Two people as a soft hand-painted anime meadow picnic—wind, petals, both faces distinct. Upload two photos or one couple frame.`,
    tips: [
      `Person A then person B with similar eye level reduces floating limbs.`,
      `If faces blend, insist on separate identities and exact skin tones.`,
      `Ask for picnic props that stay secondary to the faces.`,
      `Keep hand-painted anime look—not plastic action figures.`,
    ],
    faqs: [
      {
        question: `Cherry blossom couple instead?`,
        answer: `Blossom couple is tree-romance; this is picnic meadow storytelling.`,
      },
      {
        question: `Photoreal merge picnic?`,
        answer: `Use merge couple styles for real-photo merges.`,
      },
      {
        question: `Chibi picnic?`,
        answer: `This stays soft painted proportional anime.`,
      },
      {
        question: `Solo picnic?`,
        answer: `Needs two identities; solo meadow anime girl fits one person.`,
      },
    ],
    addonLine: `Want a calmer painted picnic? Add: keep both exact faces and the meadow picnic, but soften wind and petal density—no speech bubbles or extra characters on the blanket.`,
  },
  "couple-action-figure-two-pack-ai-prompt": {
    intro: `Couple as two action figures in one premium window box with shared accessories—both faces distinct. Upload two photos or one of you both.`,
    tips: [
      `Upload person A then person B; mismatched crops cause scale issues in-box.`,
      `Ask for two separate figures side by side—never a blended face.`,
      `Keep plastic collectible materials and a clear window box.`,
      `Say no brand logos on the packaging.`,
    ],
    faqs: [
      {
        question: `Solo collectible figure?`,
        answer: `Use premium collectible action figure for one person.`,
      },
      {
        question: `Clay group?`,
        answer: `Clay stop-motion is handmade clay, not blister plastic.`,
      },
      {
        question: `Anime picnic couple?`,
        answer: `Illustrated couple scene, not toy packaging.`,
      },
      {
        question: `Kids toy look too childish?`,
        answer: `Ask for premium collector finish with adult proportions on the heads.`,
      },
    ],
    addonLine: `Want a cleaner two-pack display? Add: keep both exact faces on the figures and the shared window box, but simplify accessories and use soft studio light—no meadow picnic props in the blister.`,
  },
  "clay-stop-motion-group-ai-photo-prompt": {
    intro: `Group rebuilt as modeling-clay stop-motion puppets in a tiny handmade set—fingerprint charm, every face cue kept. Upload one clear group photo.`,
    tips: [
      `All faces visible and sharp; clay passes punish tiny faces.`,
      `Insist on exact headcount—no merged clay heads.`,
      `Ask for visible clay texture and a miniature set that stays behind the group.`,
      `Keep identities readable despite stylized clay features.`,
    ],
    faqs: [
      {
        question: `Action figure plastic instead?`,
        answer: `Use solo or couple collectible figure pages.`,
      },
      {
        question: `Anime group?`,
        answer: `Anime squad stays drawn anime, not clay.`,
      },
      {
        question: `How many people?`,
        answer: `Small groups with large faces work best.`,
      },
      {
        question: `Hands look like blobs?`,
        answer: `Ask for simple clay hands with clear separation, not melted fingers.`,
      },
    ],
    addonLine: `Want a cozier clay set? Add: keep every recognizable face cue in clay form, but simplify the miniature set props and use soft workshop light—no plastic blister-box packaging.`,
  },
  "main-character-game-menu-ai-photo-prompt": {
    intro: `You as the playable hero on a glowing character-select game menu—UI panels, recognizable face. Use one clear chest-up photo.`,
    tips: [
      `Sharp face needed; UI glow can wash soft selfies.`,
      `If panels cover the face, ask for menu UI around the character, not over eyes.`,
      `Keep exact likeness in the hero render.`,
      `Ask for clean game-UI shapes without unreadable fake text walls.`,
    ],
    faqs: [
      {
        question: `Collectible figure on a desk?`,
        answer: `That is the premium action-figure page.`,
      },
      {
        question: `Couple select screen?`,
        answer: `This is solo hero UI.`,
      },
      {
        question: `Anime meadow instead?`,
        answer: `Different genre—painted anime scene, not game menu.`,
      },
      {
        question: `Text gibberish on UI?`,
        answer: `Ask for minimal abstract UI without readable logos.`,
      },
    ],
    addonLine: `Want a cleaner character select? Add: keep the exact face and game-menu framing, but simplify side panels and keep a stable hero stance—no physical toy box on a desk.`,
  },
  "riverside-merge-two-photos-prompt-gemini-couple": {
    intro: `Two selfies into one riverside walk couple photo—both faces locked. Upload person A then person B with clear faces.`,
    tips: [
      `Match eye level and distance in both sources to avoid floating shoulders.`,
      `Name person A and person B if faces swap.`,
      `Ask for coherent riverside light across both people.`,
      `Keep natural walking poses with five-finger hands if arms show.`,
    ],
    faqs: [
      {
        question: `Cafe window sit instead?`,
        answer: `Use cafe-window merge for a seated table scene.`,
      },
      {
        question: `Beach sunset walk?`,
        answer: `Use long-distance sunset beach merge.`,
      },
      {
        question: `Diwali sparkler rooftop?`,
        answer: `That is the separate-photos couple Diwali page.`,
      },
      {
        question: `One photo already together?`,
        answer: `Works for restyle, but separate portraits shine when you were never side by side.`,
      },
    ],
    addonLine: `Want a calmer riverside walk? Add: keep both exact faces and the riverside path, but soften water glare and use a gentle shared pace—no festival sparklers on the bank.`,
  },
  "cafe-window-merge-two-photos-prompt-gemini-couple": {
    intro: `Two photos into one cafe-window couple seated at a table—both faces distinct. Upload person A then person B.`,
    tips: [
      `Seated crops from similar heights merge more cleanly than standing-vs-selfie mixes.`,
      `Ask to match warm cafe window light on both faces.`,
      `Keep identities separate—no averaged features.`,
      `Ask for simple cups/table props that do not hide mouths.`,
    ],
    faqs: [
      {
        question: `Riverside walk instead?`,
        answer: `Different scene—outdoor walk vs seated cafe.`,
      },
      {
        question: `Luxury evening walk?`,
        answer: `Quiet luxury evening walk is waterfront fashion evening mood.`,
      },
      {
        question: `Family cafe?`,
        answer: `This is couple two-person. Family merges have their own pages.`,
      },
      {
        question: `Laptop branding appearing?`,
        answer: `Ask for unbranded cups and no logos on the table.`,
      },
    ],
    addonLine: `Want a quieter cafe window? Add: keep both exact faces and the window-table seating, but reduce street bokeh outside and keep hands relaxed on the table—no party confetti indoors.`,
  },
  "long-distance-sunset-beach-merge-two-photos-prompt-gemini-couple": {
    intro: `Long-distance couple reunited: two photos into one sunset beach walk, hand in hand—both faces kept. Upload person A then person B.`,
    tips: [
      `Similar framing prevents one person looking giant on the sand.`,
      `Ask for consistent warm sunset light on both faces.`,
      `Keep exact identities—never blend.`,
      `Ask for a clean shoreline without readable resort logos.`,
    ],
    faqs: [
      {
        question: `Riverside instead of beach?`,
        answer: `Use riverside merge for river path walks.`,
      },
      {
        question: `Mountain jackets viewpoint?`,
        answer: `Use mountain viewpoint trip merge.`,
      },
      {
        question: `Diwali night?`,
        answer: `Use Diwali couple merge/sparkler pages.`,
      },
      {
        question: `Waves covering legs oddly?`,
        answer: `Ask for believable sand stance and matched scale.`,
      },
    ],
    addonLine: `Want a softer beach sunset? Add: keep both exact faces and hand-in-hand walk, but ease lens flare and keep the horizon calm—no crowded tourist groups beside you.`,
  },
  "add-missing-person-to-group-photo-merge-two-photos-prompt-gemini-family": {
    intro: `Add one missing person into an existing group photo—group stays intact, new face locked from its own upload. Upload the group first, then the person to add.`,
    tips: [
      `Group photo first, missing person second—order matters.`,
      `Ask to match the group’s light direction on the added person.`,
      `Keep every original group face unchanged while inserting the new person.`,
      `Say exact final headcount so nobody else is invented.`,
    ],
    faqs: [
      {
        question: `Create a couple from two solos instead?`,
        answer: `Use couple merge pages; this page is specifically add-to-group.`,
      },
      {
        question: `Eid family combine parents+kids?`,
        answer: `Use Eid family frame merge for that two-photo family combine.`,
      },
      {
        question: `Person looks pasted?`,
        answer: `Ask to match perspective, scale, and light so it reads as one photograph.`,
      },
      {
        question: `Wrong place in the group?`,
        answer: `Describe where they should stand relative to named people.`,
      },
    ],
    addonLine: `Want a cleaner insert? Add: keep every original group face and the added person’s exact face, but match colour grade and shadow direction carefully—no party props that were not in the group scene.`,
  },
  "eid-family-frame-merge-two-photos-prompt-gemini-family": {
    intro: `Parents’ photo and kids’ photo combined into one Eid family frame—each face locked to its source. Upload parents first, then kids.`,
    tips: [
      `Parents photo first, kids second; say that order if faces land wrong.`,
      `Ask for matched festive lighting across both source groups.`,
      `Keep every identity distinct—no blended faces.`,
      `Ask for a simple festive family backdrop without logos.`,
    ],
    faqs: [
      {
        question: `Add one missing aunt to a group?`,
        answer: `Use add-missing-person-to-group for single inserts.`,
      },
      {
        question: `Diwali family courtyard?`,
        answer: `Diwali courtyard pages are usually one group photo restyles; this is an Eid two-photo combine.`,
      },
      {
        question: `Only one child?`,
        answer: `Still works—upload parents, then the child photo.`,
      },
      {
        question: `Outfits clash badly?`,
        answer: `Preserve clothing or ask for coordinated festive colours without changing faces.`,
      },
    ],
    addonLine: `Want a calmer Eid family frame? Add: keep every exact face from both uploads, but soften backdrop lights and keep spacing natural—no sparklers in kids’ hands.`,
  },
  "rooftop-friends-reunion-merge-two-photos-prompt-gemini-group": {
    intro: `Two friends reunited at a rooftop dinner—two selfies into one night gathering frame, both faces kept. Upload friend A then friend B.`,
    tips: [
      `Similar selfie distance helps body scale at the table.`,
      `Match warm rooftop night light across both faces.`,
      `Keep identities separate.`,
      `Ask for simple dinner-table cues without branded bottles in focus.`,
    ],
    faqs: [
      {
        question: `Full friends party birthday?`,
        answer: `Birthday friends party is one group photo; this merges two people into a rooftop dinner.`,
      },
      {
        question: `Couple cafe window?`,
        answer: `Cafe window is seated cafe mood; this is night rooftop reunion.`,
      },
      {
        question: `More than two friends?`,
        answer: `This page is two uploads. Use group restyle pages when you already have everyone in one shot.`,
      },
      {
        question: `Food looks messy?`,
        answer: `Ask for simple plates and unbranded glasses.`,
      },
    ],
    addonLine: `Want a quieter rooftop reunion? Add: keep both exact faces and the dinner-table rooftop, but reduce string-light glare—no large party crowd behind the two of you.`,
  },
  "grandparent-and-grandchild-courtyard-merge-two-photos-prompt-gemini-family": {
    intro: `Grandparent reading to a grandchild on a courtyard charpai—two photos merged, both faces locked. Upload grandparent first, then grandchild.`,
    tips: [
      `Grandparent first, child second; keep ages honest—no de-aging elders.`,
      `Ask to match soft courtyard daylight on both faces.`,
      `Keep hands gentle and natural around a book prop.`,
      `Say exact two people only unless you intentionally add more.`,
    ],
    faqs: [
      {
        question: `Adult family courtyard Diwali?`,
        answer: `Diwali courtyard group is a festive adult group restyle; this is grandparent–grandchild merge storytelling.`,
      },
      {
        question: `Graduation with parent?`,
        answer: `Use graduation-day merge for graduate + parent.`,
      },
      {
        question: `Ages look wrong?`,
        answer: `Insist on exact apparent ages from each source photo.`,
      },
      {
        question: `Charpai looks modern sofa?`,
        answer: `Ask for a traditional woven charpai in a simple courtyard.`,
      },
    ],
    addonLine: `Want a softer courtyard reading moment? Add: keep both exact faces and the charpai reading pose, but simplify props to one book and warm daylight—no festival sparklers near the child.`,
  },
  "wedding-stage-merge-two-photos-prompt-gemini-couple": {
    intro: `Bride and groom seated together on a decorated wedding stage—two photos into one stage portrait, faces distinct. Upload person A then person B.`,
    tips: [
      `Upload in a consistent order and name bride/groom roles if outfits swap.`,
      `Ask for matched stage lighting on both faces.`,
      `Keep jewellery and outfits realistic—no melted metal.`,
      `Ask for stage décor without brand logos or unreadable signage.`,
    ],
    faqs: [
      {
        question: `First Diwali newlywed instead?`,
        answer: `That is a Diwali newlywed restyle; this is a wedding-stage merge from two photos.`,
      },
      {
        question: `Quiet luxury evening walk?`,
        answer: `Different mood—evening waterfront fashion, not stage seating.`,
      },
      {
        question: `Guest photobombing?`,
        answer: `Ask for only the couple on stage.`,
      },
      {
        question: `Outfits already wedding wear?`,
        answer: `Preserve clothing to keep real wedding attire.`,
      },
    ],
    addonLine: `Want a calmer wedding stage? Add: keep both exact faces and the seated stage pose, but soften backdrop lights and keep décor elegant—no sparklers on the stage floor.`,
  },
  "graduation-day-merge-two-photos-prompt-gemini-family": {
    intro: `Graduate with a parent who could not attend—two photos into one graduation-day portrait, both faces kept. Upload graduate first, then parent.`,
    tips: [
      `Graduate first, parent second; say roles if positions swap.`,
      `Match campus or studio light across both faces.`,
      `Keep ages and identities exact.`,
      `Ask for simple graduation cues without fake university logos.`,
    ],
    faqs: [
      {
        question: `Add missing person to a group grad photo?`,
        answer: `Use add-missing-person-to-group if the base is already a group frame.`,
      },
      {
        question: `Couple travel merge?`,
        answer: `Different stories—beach/mountain merges are trips, not graduation.`,
      },
      {
        question: `Cap not in source?`,
        answer: `Prompt can add cap/gown when clothing is not preserved; preserve if already correct.`,
      },
      {
        question: `Parent looks too young/old?`,
        answer: `Insist on exact apparent age from the parent source.`,
      },
    ],
    addonLine: `Want a cleaner graduation frame? Add: keep both exact faces and a simple graduation setting, but reduce background crowd blur people—no party confetti unless you want celebration energy.`,
  },
  "mountain-viewpoint-trip-merge-two-photos-prompt-gemini-couple": {
    intro: `Couple together at a mountain viewpoint in warm jackets—two photos merged, both faces locked. Upload person A then person B.`,
    tips: [
      `Similar framing avoids one partner towering on the ridge.`,
      `Ask for matched cool mountain light on both faces.`,
      `Keep exact identities—no blend.`,
      `Ask for a clean viewpoint landscape without tourist-sign logos.`,
    ],
    faqs: [
      {
        question: `Beach sunset walk instead?`,
        answer: `Use long-distance beach merge for sand and sunset.`,
      },
      {
        question: `Foggy winter couple?`,
        answer: `Winter guide merges cover fog/shawl looks; this is mountain viewpoint trip.`,
      },
      {
        question: `One photo already at the mountain?`,
        answer: `You can restyle, but two separate uploads help when only one person traveled.`,
      },
      {
        question: `Jackets too bulky on hands?`,
        answer: `Ask for natural hand visibility and realistic sleeve ends.`,
      },
    ],
    addonLine: `Want a calmer mountain viewpoint? Add: keep both exact faces and warm jackets, but soften wind and haze—no heavy snowfall covering hair unless you want winter drama.`,
  },
  "combine-two-photos-80s-couple": {
    intro: `Two portraits into one outdoor 1980s couple photo—retro colour, both faces kept. Upload two clear portraits, one of each person.`,
    tips: [
      `Attach both portraits with similar eye level for believable 80s pairing.`,
      `Ask for period colour grade without changing facial identity.`,
      `Keep outfits either preserved or restyled consistently into 80s cues—not modern logos.`,
      `Say no modern phones or cars in frame if they break the era.`,
    ],
    faqs: [
      {
        question: `Modern cafe merge instead?`,
        answer: `Use cafe-window merge for present-day seating.`,
      },
      {
        question: `Diwali sparkler merge?`,
        answer: `Different festival story; this is 1980s outdoor couple.`,
      },
      {
        question: `Family 80s?`,
        answer: `This page is couple two-person.`,
      },
      {
        question: `Hair changed to 80s volume?`,
        answer: `Ask to keep recognizable hair identity with only light period styling if you dislike big hair.`,
      },
    ],
    addonLine: `Want a softer 80s couple grade? Add: keep both exact faces and outdoor 80s styling, but ease film grain slightly and keep poses natural—no disco text overlays.`,
  },
  "quiet-luxury-couple-evening-walk-ai-photo-prompt": {
    intro: `Quiet-luxury couple evening waterfront walk from two photos—refined fashion mood, both faces locked. Upload two clear photos or one couple frame.`,
    tips: [
      `Person A then person B with similar height framing.`,
      `Match elegant evening light across both faces.`,
      `Keep identities separate; ask for refined coats/outfits without logos.`,
      `Ask for waterfront depth that stays secondary to the couple.`,
    ],
    faqs: [
      {
        question: `Cafe window sit?`,
        answer: `Cafe is seated indoor/window; this is evening walk fashion.`,
      },
      {
        question: `Mountain jackets trip?`,
        answer: `Mountain viewpoint is travel ridge; this is quiet-luxury waterfront.`,
      },
      {
        question: `Wedding stage?`,
        answer: `Wedding stage is ceremonial seating, not evening walk.`,
      },
      {
        question: `Preserve our clothes?`,
        answer: `Turn clothing on for real outfits; off restyles into quiet-luxury evening wear.`,
      },
    ],
    addonLine: `Want a quieter luxury walk? Add: keep both exact faces and the evening waterfront path, but soften rim light and keep conversation poses calm—no festival props or balloons.`,
  },
};

