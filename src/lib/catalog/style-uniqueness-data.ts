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
  "navy-blazer-linkedin-profile-picture-prompt-gemini": {
    intro: `Clean LinkedIn headshot in a navy blazer over a white shirt on a light-grey studio backdrop—bright neutral light, face locked from one selfie. Works for men and women who need a sharp professional crop.`,
    tips: [
      `Upload a recent front-facing head-and-shoulders shot in even daylight; sunglasses and group photos confuse the framing.`,
      `If the blazer looks wrinkled or oversized, ask for a well-fitted navy blazer over a plain white shirt with clean lapels.`,
      `Keep clothing and pose off unless you must retain what you wore—defaults restyle into the studio navy look while locking your face.`,
      `When eyes go soft, ask for sharp focus on the eyes and soft even studio light with no harsh cheek shadows.`,
    ],
    faqs: [
      {
        question: `Will my own clothes stay in the LinkedIn photo?`,
        answer: `Only if you turn clothing preservation on. By default the look dresses you in a navy blazer and white shirt while keeping your face.`,
      },
      {
        question: `Does this work for both men and women?`,
        answer: `Yes. The navy-blazer studio treatment is gender-neutral; your face, hair, and skin tone stay as in the source.`,
      },
      {
        question: `Can I use a casual selfie?`,
        answer: `A clear head-and-shoulders selfie with even light works. Blurry or heavily filtered shots make the blazer edges and eyes drift.`,
      },
      {
        question: `Why does the grey backdrop look mottled?`,
        answer: `Ask for a soft evenly lit light-grey studio backdrop with clean edges around hair and shoulders—no texture patches.`,
      },
    ],
    addonLine: `Want a slightly softer LinkedIn crop? Add: keep the navy blazer, white shirt, and light-grey studio, but ease the smile a touch—no colourful ties, no busy office props.`,
  },
  "charcoal-suit-corporate-linkedin-profile-picture-prompt-gemini-men": {
    intro: `Corporate LinkedIn headshot for men: charcoal coat pant, light blue shirt and dark plain tie on a soft out-of-focus grey studio. Soft front-left light keeps the face sharp and boardroom-ready.`,
    tips: [
      `Use one clear head-and-shoulders photo with the face large and sharp; keep beard and hair as you wear them day to day.`,
      `If the tie prints weird patterns, ask for a dark plain tie with a light blue shirt under a charcoal two-piece suit.`,
      `Prefer a slight angle to the camera when pose is off—straight-on can look passport-stiff for this corporate crop.`,
      `Ask for soft studio light from the front left and no harsh shadows under the eyes or jaw.`,
    ],
    faqs: [
      {
        question: `Is this only for men?`,
        answer: `Yes—this style is written for a charcoal suit with blue shirt and dark tie. Women can use the navy or black blazer LinkedIn styles instead.`,
      },
      {
        question: `Will my beard change?`,
        answer: `No. Beard, moustache, hairline, and skin texture stay as in your upload when the face is locked.`,
      },
      {
        question: `Can I keep my own suit?`,
        answer: `Turn clothing preservation on. Off replaces outfits with the charcoal suit, light blue shirt, and dark tie defaults.`,
      },
      {
        question: `Why does the grey background look busy?`,
        answer: `Ask for a soft out-of-focus neutral grey studio backdrop—no office furniture or window reflections behind you.`,
      },
    ],
    addonLine: `Want a quieter boardroom feel? Add: keep the charcoal suit, light blue shirt, dark tie and blurred grey backdrop, but soften the side highlight—no pocket square logos, no trophy shelves.`,
  },
  "black-blazer-linkedin-profile-picture-prompt-gemini-women": {
    intro: `Crisp women's LinkedIn headshot: tailored black blazer over a cream high-neck top on a soft beige studio. Warm-neutral light and light natural makeup only, face kept true from one selfie.`,
    tips: [
      `Upload a front-facing head-and-shoulders photo with hair styled as you usually wear it; window light beats phone flash.`,
      `If the cream top turns shiny or sheer, ask for a matte cream high-neck top under a tailored black blazer.`,
      `Keep makeup light and natural—ask to avoid heavy contour or lipstick changes that alter your likeness.`,
      `When the beige wall goes orange, ask for a soft beige studio backdrop with gentle even light.`,
    ],
    faqs: [
      {
        question: `Is this style meant for women?`,
        answer: `Yes. It restyles into a black blazer and cream high-neck top while locking your face, hairstyle, and skin tone.`,
      },
      {
        question: `Will heavy makeup be added?`,
        answer: `No. The look aims for light, natural makeup only. Ask explicitly if the result starts looking overdone.`,
      },
      {
        question: `Can I wear a hijab or keep my own top?`,
        answer: `For hijab, use the dedicated hijab office LinkedIn style. To keep your own clothes here, turn clothing preservation on.`,
      },
      {
        question: `Why does my hair volume change?`,
        answer: `Ask to keep the exact hairstyle and hairline from the source with no beautify or restyle pass.`,
      },
    ],
    addonLine: `Want a slightly warmer LinkedIn polish? Add: keep the black blazer, cream high-neck top and beige studio, but nudge the eye catchlight softer—no statement jewellery piles, no colourful scarves.`,
  },
  "hijab-office-linkedin-profile-picture-prompt-gemini-women": {
    intro: `Office-ready LinkedIn headshot for women in hijab: dusty-rose hijab with a navy blazer on a plain soft grey studio. Full face and chin stay visible; hijab stays on, neatly wrapped.`,
    tips: [
      `Upload a clear head-and-shoulders photo already wearing a hijab, with full face and chin visible—no sunglasses.`,
      `If the hijab colour drifts, ask for a solid dusty-rose hijab neatly wrapped with the navy blazer over a plain top.`,
      `Ask to keep the hijab on and never remove or replace it with open hair.`,
      `When light pools only on one cheek, ask for even flattering studio light across the whole face.`,
    ],
    faqs: [
      {
        question: `Must my source photo already show a hijab?`,
        answer: `Yes—use a clear photo where you are wearing a hijab with full face and chin visible so wrapping and identity stay honest.`,
      },
      {
        question: `Will the hijab colour change?`,
        answer: `By default the look uses a solid dusty-rose hijab with a navy blazer. Turn clothing preservation on only if you must keep your exact fabric and colour.`,
      },
      {
        question: `Can the model remove my hijab?`,
        answer: `It should not. Remind it to keep the hijab on, neatly wrapped, with face and chin fully visible.`,
      },
      {
        question: `Is this suitable for LinkedIn?`,
        answer: `Yes—plain grey studio, navy blazer, and even light are built for a professional profile crop.`,
      },
    ],
    addonLine: `Want a calmer office LinkedIn crop? Add: keep the dusty-rose hijab, navy blazer and soft grey studio, but soften the smile slightly—no bold patterned hijab prints, no jewellery clutter.`,
  },
  "dupatta-office-linkedin-profile-picture-prompt-gemini-women": {
    intro: `Office LinkedIn headshot in an off-white kurta, fitted beige blazer and light solid-color dupatta draped over both shoulders—or over the head if your source already covers the head. Fresh daylight feel on light-grey studio.`,
    tips: [
      `Use a clear head-and-shoulders photo; dupatta over the head in the source is fine—the look respects that covering.`,
      `If the dupatta floats oddly, ask for a light solid-color dupatta neatly draped over both shoulders against the off-white kurta and beige blazer.`,
      `Prefer even daylight-style light; ask to remove harsh phone-flash hotspots on the forehead.`,
      `Keep clothing off unless you want your real kurta kept—defaults build the kurta-blazer-dupatta set.`,
    ],
    faqs: [
      {
        question: `Do I need to wear a dupatta in my source photo?`,
        answer: `No. Upload with or without a dupatta; the prompt drapes a light solid-color dupatta, or over the head if your source already covers the head.`,
      },
      {
        question: `Will my hairstyle stay?`,
        answer: `Yes—hairstyle or head covering stays locked with your face and skin tone.`,
      },
      {
        question: `Is a kurta professional enough for LinkedIn?`,
        answer: `This look pairs the kurta with a beige blazer for an office-ready South Asian professional crop.`,
      },
      {
        question: `Why does the dupatta look transparent?`,
        answer: `Ask for opaque, neatly draped fabric with clean edges—no see-through gauze or floating layers.`,
      },
    ],
    addonLine: `Want a quieter office kurta look? Add: keep the off-white kurta, beige blazer, draped dupatta and light-grey studio, but ease fabric sheen—no heavy embroidery, no festive jewellery stacks.`,
  },
  "shalwar-kameez-linkedin-profile-picture-prompt-gemini-men": {
    intro: `Formal LinkedIn headshot for men in a crisp white shalwar kameez with a well-fitted navy waistcoat on a plain light-grey studio. Soft even light, confident relaxed expression, beard and hairline kept.`,
    tips: [
      `Upload one clear head-and-shoulders photo with the face large and sharp; keep beard as you wear it day to day.`,
      `If the waistcoat looks loose, ask for a well-fitted navy waistcoat over a crisp white kameez with clean collar edges.`,
      `Ask for soft even studio light—no dramatic side shadows that darken one half of the face.`,
      `Clothing off builds the white kameez and navy waistcoat; turn it on only to keep your own outfit.`,
    ],
    faqs: [
      {
        question: `Is this only for men?`,
        answer: `Yes—this style is written for white shalwar kameez with a navy waistcoat. Women can use the kurta-dupatta or blazer LinkedIn styles.`,
      },
      {
        question: `Will my beard stay the same?`,
        answer: `Yes. Face, beard, hairline, and skin tone stay as in your upload.`,
      },
      {
        question: `Can I keep my own waistcoat colour?`,
        answer: `Turn clothing preservation on. Off defaults to white kameez and navy waistcoat.`,
      },
      {
        question: `Why does the kameez look wrinkled?`,
        answer: `Ask for crisp white fabric with a neat collar and a fitted navy waistcoat—no crumpled texture.`,
      },
    ],
    addonLine: `Want a slightly more formal kameez crop? Add: keep the white kameez, navy waistcoat and light-grey studio, but tidy the collar line—no sherwani embroidery, no wedding stage props.`,
  },
  "cv-photo-ai-prompt-plain-background-resume-headshot": {
    intro: `CV and resume headshot on a minimal cream wall: your own clothes kept, slight friendly smile, shadow-free even light. Ideal when forms want a clean plain-background photo without changing your outfit.`,
    tips: [
      `Upload a recent front-facing head-and-shoulders photo; facing the camera with no shadows across the face works best.`,
      `Clothing stays by default—wear what you want on the CV before you shoot or upload.`,
      `If shadows stick under the eyes, ask for soft even lighting and a plain cream wall with no texture patches.`,
      `Keep a slight natural smile; ask for neutral if your target form forbids smiling.`,
    ],
    faqs: [
      {
        question: `Will my clothes change?`,
        answer: `No by default—clothing is preserved. The prompt mainly swaps in a plain cream wall and even light.`,
      },
      {
        question: `Is this the same as a passport photo?`,
        answer: `Similar idea, but this CV look allows a slight friendly smile and a cream wall rather than pure white.`,
      },
      {
        question: `Can I use a group photo?`,
        answer: `No—use one person, front-facing, head and shoulders only so identity stays clear.`,
      },
      {
        question: `Why does the cream wall look yellow?`,
        answer: `Ask for a minimal cream wall with bright neutral light and no warm colour cast on the face.`,
      },
    ],
    addonLine: `Want a stricter CV crop? Add: keep your own clothes and the plain cream wall, but use a smaller smile and tighter head-to-shoulders framing—no studio props, no coloured backdrops.`,
  },
  "passport-size-photo-ai-prompt-gemini-white-background": {
    intro: `Passport-size style photo on a pure white seamless background: front-facing, centered head and upper shoulders, neutral expression, your own clothes kept. Built for CVs and forms—still check your country’s rules.`,
    tips: [
      `Look straight at the camera with both sides of the face evenly lit; recent glasses-on photos only if you wear them day to day.`,
      `Ask for a pure white seamless infinity background with even shadow-free front lighting—no grey gradients.`,
      `Keep a neutral expression, mouth closed, eyes open; pose off recentres you for form crops.`,
      `Clothing stays by default; if a dark contrast shirt is needed for a specific form, say so without changing the white backdrop.`,
    ],
    faqs: [
      {
        question: `Is this an official passport photo?`,
        answer: `It is passport-size style for CVs and forms. Always check your embassy or portal rules before submitting.`,
      },
      {
        question: `Will my outfit change?`,
        answer: `Clothing is preserved by default. Head covering stays if you wear one in the source.`,
      },
      {
        question: `Can I smile?`,
        answer: `Defaults aim for a neutral expression with mouth closed. Many forms reject broad smiles.`,
      },
      {
        question: `Why is there a shadow behind my head?`,
        answer: `Ask for even shadow-free front lighting on a pure white seamless background with no wall corner visible.`,
      },
    ],
    addonLine: `Want a stricter form crop? Add: keep your own clothes and the pure white background, but tighten centering and keep mouth closed—no smiles, no studio colour gels.`,
  },
  "modern-office-linkedin-profile-picture-prompt-gemini": {
    intro: `LinkedIn office headshot with a softly blurred bright modern office—glass walls and plants behind you, natural window light on the face. Your own clothes stay; face stays sharp and corporate.`,
    tips: [
      `Upload a clear head-and-shoulders daylight photo; front or side window light on the face helps the office glow feel real.`,
      `Clothing is preserved—wear a plain smart top you are happy to show on LinkedIn.`,
      `If glass walls go mushy, ask for a softly blurred modern office with glass and plants, shallow depth of field, face sharp.`,
      `Pose off turns you slightly toward the camera; keep other people out of the source frame.`,
    ],
    faqs: [
      {
        question: `Do I need a photo taken in an office?`,
        answer: `No. A clear daylight headshot works; the prompt builds the blurred glass office when pose is not preserved.`,
      },
      {
        question: `Will my clothes stay?`,
        answer: `Yes by default. Turn clothing off only if you want plain smart business clothing instead.`,
      },
      {
        question: `Why does the background look like a living room?`,
        answer: `Ask specifically for a softly blurred bright modern office with glass walls and plants—not home furniture.`,
      },
      {
        question: `Can I use an outdoor selfie?`,
        answer: `Yes if the face is clear and well lit; the office backdrop and window light come from the prompt.`,
      },
    ],
    addonLine: `Want a calmer glass-office LinkedIn crop? Add: keep your own clothes, natural window light and blurred glass office, but reduce plant clutter in the bokeh—no neon signs, no busy desks in focus.`,
  },
  "outdoor-natural-light-linkedin-profile-picture-prompt-gemini": {
    intro: `Approachable LinkedIn headshot outdoors: softly blurred green trees, late-afternoon glow, warm natural smile. Your own clothes stay; soft warm natural light keeps the face friendly and sharp.`,
    tips: [
      `Upload a clear head-and-shoulders photo with a natural expression; soft daylight on the face beats harsh noon sun.`,
      `Clothing is preserved—plain smart-casual colours photograph cleaner against green bokeh.`,
      `If trees turn neon, ask for softly blurred green trees in late-afternoon light with shallow depth of field.`,
      `Keep sunglasses off the source; ask for a warm natural smile without changing your mouth shape.`,
    ],
    faqs: [
      {
        question: `Must my photo already be outdoors?`,
        answer: `No. An indoor portrait can work; the prompt adds blurred trees and late-afternoon light when pose is not preserved.`,
      },
      {
        question: `Will my outfit change?`,
        answer: `Not by default—clothing stays. Off may restyle into a plain smart-casual shirt or kurta while locking your face.`,
      },
      {
        question: `Is outdoor light professional enough for LinkedIn?`,
        answer: `Yes for approachable roles—soft late-afternoon light and a clean tree bokeh still read as polished.`,
      },
      {
        question: `Why does my skin look too orange?`,
        answer: `Ask to keep exact skin tone under soft late-afternoon light with no heavy warm filter.`,
      },
    ],
    addonLine: `Want a quieter park LinkedIn crop? Add: keep your own clothes, late-afternoon light and blurred green trees, but soften the smile a little—no city skylines, no festival crowds behind you.`,
  },
  "home-office-linkedin-profile-picture-prompt-gemini": {
    intro: `Remote-work LinkedIn headshot with a cozy home-office desk blurred behind you—laptop, coffee mug, notebook, warm lamp and soft greenery. Soft window light on the face; your own clothes stay.`,
    tips: [
      `Upload a clear front-facing head-and-shoulders photo with even light on the face.`,
      `Clothing stays by default—a plain smart-casual shirt, sweater, or kurta photographs cleanest.`,
      `If the desk goes sharp and distracting, ask to keep the home office well out of focus with soft window and lamp light.`,
      `Ask for a warm natural smile without adding props in front of your face or shoulders.`,
    ],
    faqs: [
      {
        question: `Do I need a photo taken at my desk?`,
        answer: `No. Any clear headshot works; the blurred home-office desk and lamp light come from the prompt.`,
      },
      {
        question: `Will my clothes stay?`,
        answer: `Yes by default. Turn clothing off only if you want a plain smart-casual restyle.`,
      },
      {
        question: `Why does the background look like a café?`,
        answer: `Ask for a cozy home office desk with laptop, mug, notebook, warm lamp and soft greenery—kept out of focus.`,
      },
      {
        question: `Is this good for remote-job LinkedIn profiles?`,
        answer: `Yes—it signals remote-friendly work without looking like a stiff studio passport crop.`,
      },
    ],
    addonLine: `Want a tidier remote-work LinkedIn crop? Add: keep your own clothes, soft window light and blurred home-office desk, but simplify mug and notebook clutter in the bokeh—no neon RGB lights, no brand logos on screens.`,
  },
  "linkedin-photo-clean-up-ai-prompt-gemini-keep-outfit": {
    intro: `Minimal LinkedIn clean-up: plain soft grey studio, evened lighting, stray hairs and lint removed—your clothes and pose stay. Use a photo you already like; this tidies without a full restyle.`,
    tips: [
      `Upload a head-and-shoulders photo you already like, facing the camera, in an outfit you are happy with.`,
      `Clothing and pose stay on by default—expect backdrop, light, and tidy-up only, not a new wardrobe.`,
      `If skin gets plastic, ask for no skin smoothing, slimming, or makeup changes—only even light and lint removal.`,
      `Simple source backgrounds replace more cleanly into the plain soft grey studio.`,
    ],
    faqs: [
      {
        question: `Will my outfit change?`,
        answer: `No by default—clothes and pose are preserved. The look mainly swaps to a plain soft grey backdrop and cleans small distractions.`,
      },
      {
        question: `Is this different from the navy blazer LinkedIn style?`,
        answer: `Yes. Clean-up keeps what you wore and how you stood; blazer styles restyle clothing into a studio suit look.`,
      },
      {
        question: `Can it fix a blurry photo?`,
        answer: `No. Start with a sharp original; this pass tidies light and backdrop, it does not invent missing detail.`,
      },
      {
        question: `Why did my pose change?`,
        answer: `Pose should stay. Remind the model to preserve pose and only even lighting, grey backdrop, and stray-hair cleanup.`,
      },
    ],
    addonLine: `Want an even lighter tidy-up? Add: keep your exact clothes, pose and face, but only even the light and clear stray hairs—no new blazer, no beauty filter, no colourful backdrop swap.`,
  },
  "matching-team-headshot-ai-prompt-gemini-company-page": {
    intro: `Matching company-page headshots: every teammate gets the same soft light-grey studio, even front light, and consistent eye-line framing. Own outfits stay; collars neatened so the About page looks unified.`,
    tips: [
      `Run the same settings for each person—one head-and-shoulders photo per teammate, similar distance from the camera.`,
      `Clothing stays; ask only to neaten collars so brands and personal style remain honest.`,
      `If eye height jumps between people, ask for eyes about one-third from the top of the frame every time.`,
      `One person per photo—group shots make matching crops inconsistent.`,
    ],
    faqs: [
      {
        question: `Can I process the whole team in one photo?`,
        answer: `No—use one head-and-shoulders photo per person and repeat the same settings so framing matches.`,
      },
      {
        question: `Will everyone get the same blazer?`,
        answer: `No. Outfits stay; the match comes from the shared light-grey studio, lighting, and eye-line crop.`,
      },
      {
        question: `What if some photos are outdoor and some indoor?`,
        answer: `That is fine. The prompt rebuilds the same studio backdrop; just keep faces sharp and similarly framed.`,
      },
      {
        question: `Why do some teammates look taller in the crop?`,
        answer: `Source camera distance differed—re-upload shots taken from a similar distance or ask for consistent headroom.`,
      },
    ],
    addonLine: `Want tighter company-page matching? Add: keep each person’s own outfit, face and light-grey studio, but match crop height and soft front light across the set—no mismatched coloured backdrops, no logo overlays.`,
  },
  "executive-corporate-linkedin-profile-picture-prompt-gemini": {
    intro: `Executive LinkedIn headshot on a dark charcoal studio with soft low-key side light and a gentle rim on the hair. Dark navy or black suit with a plain light shirt; confident, not loud.`,
    tips: [
      `Upload a clear head-and-shoulders photo with the face large and sharp; a neutral or confident expression fits this low-key look.`,
      `If the suit goes shiny, ask for a well-fitted dark navy or black suit with a plain light shirt—no loud patterns.`,
      `Ask for soft low-key side light plus a gentle rim separating hair from the charcoal gradient backdrop.`,
      `Pose off uses a slight angle with the face turned to camera; avoid sunglasses in the source.`,
    ],
    faqs: [
      {
        question: `Is this only for C-suite roles?`,
        answer: `It is styled for an executive presence, but any professional wanting a dark studio LinkedIn crop can use it.`,
      },
      {
        question: `Will my clothes stay?`,
        answer: `Not by default—the look dresses you in a dark navy or black formal outfit. Turn clothing on to keep what you wore.`,
      },
      {
        question: `Why is half my face too dark?`,
        answer: `Ask for soft low-key side light that still keeps both eyes readable—not a hard single spotlight.`,
      },
      {
        question: `Can women use this?`,
        answer: `Yes—the dark formal outfit and charcoal studio work across genders while locking face and skin tone.`,
      },
    ],
    addonLine: `Want a quieter executive LinkedIn crop? Add: keep the dark suit, charcoal studio and soft side light, but ease the rim highlight—no colourful pocket squares, no office skyline plates.`,
  },
  "photographer-red-t-shirt-studio-portrait-ai-prompt": {
    intro: `Studio portrait of you as a photographer mid-shot: plain red tee, unbranded camera in hand, seamless mid-grey backdrop with soft vignette. Clean neutral studio mood; face, skin tone and hairstyle stay yours.`,
    tips: [
      `Upload one clear chest-up photo with the face fully visible; front or slight three-quarter angle works best.`,
      `If the camera grows logos, ask for a plain unbranded camera and a solid red t-shirt with no prints.`,
      `Ask for a seamless mid-grey studio backdrop with soft vignette—keep the shot mid-body, not a tiny full-length figure.`,
      `When fingers melt on the camera body, ask for five natural fingers and a believable grip.`,
    ],
    faqs: [
      {
        question: `Do I need to own a camera in the source photo?`,
        answer: `No. A clear chest-up portrait is enough; the prompt adds the unbranded camera and red tee when clothing and pose are not preserved.`,
      },
      {
        question: `Will my face stay recognizable?`,
        answer: `Yes—face shape, skin tone, hairstyle, beard or head covering, and apparent age stay locked.`,
      },
      {
        question: `Can I keep my own shirt?`,
        answer: `Turn clothing preservation on. Off defaults to the plain red t-shirt photographer look.`,
      },
      {
        question: `Why does the camera look fake?`,
        answer: `Ask for a realistic unbranded camera body with natural hand grip and no floating straps across the face.`,
      },
    ],
    addonLine: `Want a cleaner photographer studio crop? Add: keep the plain red tee, unbranded camera and mid-grey seamless, but simplify the vignette—no flower props, no brand logos on the lens.`,
  },
  "1985-studio-portrait": {
    intro: `1985 professional studio portrait: mottled backdrop, soft frontal flash, warm faded film, voluminous feathered hair and period clothing. Light grain, your face and age kept honest.`,
    tips: [
      `Upload a clear head-and-shoulders portrait with the face large and sharp; even lighting beats heavy shadows.`,
      `If hair goes extreme, ask for voluminous feathered 1980s hair that still matches your hairline and age.`,
      `Ask for soft frontal flash, light film grain, and a classic mottled studio backdrop with clean edges.`,
      `Clothing off brings 1980s period clothes; turn it on only if you must keep today’s outfit under the retro grade.`,
    ],
    faqs: [
      {
        question: `Will I look older or younger?`,
        answer: `Age stays as in the source. The 1985 look is styling, flash, and film colour—not an age filter.`,
      },
      {
        question: `Do I need an old scanned photo?`,
        answer: `No. A clear modern portrait works; mottled backdrop, soft flash, and faded film come from the prompt.`,
      },
      {
        question: `Can I keep my current clothes?`,
        answer: `Turn clothing preservation on. Off restyles into 1980s period clothing while locking your face.`,
      },
      {
        question: `Why does the backdrop look flat grey?`,
        answer: `Ask for a classic mottled studio backdrop with soft sunlit analog warmth and slight fade—not a plain seamless.`,
      },
    ],
    addonLine: `Want a softer 1985 studio print? Add: keep the mottled backdrop, soft flash and faded film warmth, but ease hair volume slightly—no neon gels, no modern phone-in-hand props.`,
  },
  "80s-film-poster-lead": {
    intro: `Hand-painted 1980s South Asian film poster with you as the solo lead: painted sunset sky, rich saturated print-wear colour, and period poster styling. Face stays recognizable on the painted texture.`,
    tips: [
      `Upload a clear portrait with the face large enough to stay readable on a poster; three-quarter angles suit painted leads.`,
      `If paint smears your features, ask to keep exact facial structure under painted-poster texture and slight print wear.`,
      `Ask for a hand-painted sunset sky with empty space at the top for a title area—no real photo sky.`,
      `Outfit follows the lead-star poster kit when clothing is off; avoid heavy beauty filters on the source.`,
    ],
    faqs: [
      {
        question: `Is this only for boys?`,
        answer: `The page leans solo-lead poster energy; the prompt picks period outfit cues that match the person while locking your face.`,
      },
      {
        question: `Will my face look painted-over?`,
        answer: `Features should stay recognizable. Ask for painted texture and print wear without blurring or swapping identity.`,
      },
      {
        question: `Can I add a film title?`,
        answer: `The backdrop leaves empty sky at the top; you can optionally request simple painted title space without changing the sunset mood.`,
      },
      {
        question: `Why do I look like someone else?`,
        answer: `Rerun with a sharper face crop and ask to preserve exact facial structure, skin tone, and age under the poster grade.`,
      },
    ],
    addonLine: `Want a calmer solo poster lead? Add: keep the hand-painted sunset, saturated print-wear colour and your exact face, but soften poster wear slightly—no extra villain faces, no modern logos in the sky.`,
  },
  "1986-school-yearbook": {
    intro: `1986 school yearbook headshot on a soft blue laser-style studio backdrop: voluminous period hair, sweater or collared shirt, soft-focus print and fine grain. Soft nostalgic flash, same age as your photo.`,
    tips: [
      `Upload a clear head-and-shoulders photo, face centered and sharp, neutral or slight smile.`,
      `If lasers go neon-purple chaos, ask for a soft blue 1980s laser-style studio backdrop with faded yearbook colours.`,
      `Ask for slightly soft focus and fine grain like a printed yearbook—not a sharp modern studio file.`,
      `Keep apparent age locked; clothing off brings a period sweater or collared shirt.`,
    ],
    faqs: [
      {
        question: `Will this make me look like a teenager if I am older?`,
        answer: `No—keep the same age as in the photo. The yearbook look is backdrop, hair styling, and print texture.`,
      },
      {
        question: `Do I need an old school uniform photo?`,
        answer: `No. A clear modern headshot works; laser backdrop and period school clothes come from the prompt.`,
      },
      {
        question: `Can I keep my own clothes?`,
        answer: `Turn clothing preservation on. Off restyles into a period sweater or collared shirt.`,
      },
      {
        question: `Why is the laser backdrop too dark?`,
        answer: `Ask for a soft blue 1980s laser-style studio backdrop with even studio flash and faded colours.`,
      },
    ],
    addonLine: `Want a gentler 1986 yearbook print? Add: keep the soft blue laser backdrop, soft flash and faded colours, but ease hair height a little—no modern hoodies, no emoji stickers on the print.`,
  },
  "cassette-player-street-snapshot": {
    intro: `Candid 1980s market-street snapshot: denim jacket, high-waisted jeans, white sneakers, portable cassette player with foam headphones around the neck. Busy afternoon city market, warm nostalgic point-and-shoot grain.`,
    tips: [
      `Upload a clear standing or walking photo with the face visible; full or three-quarter body helps the mid-walk pose.`,
      `If headphones vanish, ask for a portable cassette player with foam headphones around the neck—not earbuds.`,
      `Ask for 35mm point-and-shoot grain, slightly off-center framing, and a busy 1980s city market in bright afternoon sun.`,
      `When the denim looks modern skinny-fit, ask for period denim jacket, high-waisted jeans, and white sneakers.`,
    ],
    faqs: [
      {
        question: `Must my photo already be on a street?`,
        answer: `No. A clear standing portrait works; the market street and mid-walk pose build when pose is not preserved.`,
      },
      {
        question: `Will my clothes stay?`,
        answer: `Not by default—the look uses denim jacket, high-waisted jeans, white sneakers and the cassette player. Turn clothing on to keep today’s outfit.`,
      },
      {
        question: `Why do the headphones look like AirPods?`,
        answer: `Ask specifically for foam on-ear headphones on a portable cassette player around the neck.`,
      },
      {
        question: `Can I use a tight face crop?`,
        answer: `A wider standing or three-quarter shot is better so the cassette player and walk read clearly.`,
      },
    ],
    addonLine: `Want a quieter market walk? Add: keep the denim, cassette player with foam headphones and busy afternoon market street, but soften crowd blur behind you—no flowers in hand, no modern smartphones.`,
  },
  "80s-bedroom-cassette": {
    intro: `Casual 1980s bedroom flash snapshot: sitting on a patterned bedspread with cassette player and tape stack nearby, direct flash, warm indoor fade like an old album print. Face and age stay yours.`,
    tips: [
      `Upload a clear photo with the face visible; a sitting or relaxed pose makes seating on the bed easier.`,
      `If posters turn into readable modern brands, ask for abstract 1980s poster shapes only—no real logos.`,
      `Ask for direct flash, slightly harsh highlights, warm indoor tones, faded album-print colour, and visible grain.`,
      `Clothing off keeps a simple 1980s casual outfit; sunglasses in the source hide the eyes under flash.`,
    ],
    faqs: [
      {
        question: `Do I need a photo taken in a bedroom?`,
        answer: `No. A clear portrait with enough of the body to seat you on a bed works; the 1980s bedroom builds from the prompt.`,
      },
      {
        question: `Is this only for girls?`,
        answer: `The page is framed that way, but any clear portrait can take the bedroom cassette flash treatment while locking identity.`,
      },
      {
        question: `Will my age change?`,
        answer: `No—age, face, and skin tone stay as in the source.`,
      },
      {
        question: `Why do cassettes look like phones?`,
        answer: `Ask for a period cassette player and a stack of tapes on the bedspread—no modern devices.`,
      },
    ],
    addonLine: `Want a softer bedroom album print? Add: keep the cassette player, tape stack, patterned bedspread and direct-flash fade, but ease highlight harshness a little—no fairy-light overlays, no modern laptops on the bed.`,
  },
  "1985-studio-couple": {
    intro: `1985 professional studio couple portrait on a classic mottled backdrop: soft frontal flash, warm faded film, voluminous feathered hair and period clothes for both. Each face preserved separately—no blending.`,
    tips: [
      `Upload one photo of two people with both faces clear and at a similar distance from the camera.`,
      `If faces merge, name who is on the left and right and ask to preserve each face, age, and skin tone separately.`,
      `Ask for soft frontal flash, light film grain, and a mottled studio backdrop with clean edges around both people.`,
      `Clothing off dresses both in 1980s period clothing; keep sunglasses out of the source.`,
    ],
    faqs: [
      {
        question: `Can I merge two separate photos?`,
        answer: `This style expects one couple frame with both faces clear. Separate uploads need a merge-oriented couple style instead.`,
      },
      {
        question: `Will one face overwrite the other?`,
        answer: `It should not. Remind the model to treat each person as a separate identity with no feature blending.`,
      },
      {
        question: `Do we both get 1980s clothes?`,
        answer: `Yes when clothing is not preserved—period outfits for both under the same soft flash and mottled backdrop.`,
      },
      {
        question: `Why does one person look younger?`,
        answer: `Ask to keep each person’s exact age and skin tone from the source with no beautify pass.`,
      },
    ],
    addonLine: `Want a softer 1985 couple studio print? Add: keep both exact faces, mottled backdrop, soft flash and faded film warmth, but ease hair volume slightly—no bouquet props, no modern watermarks.`,
  },
  "80s-film-poster-couple": {
    intro: `Hand-painted 1980s South Asian film poster of you both as the lead pair: painted sunset sky, saturated print-wear colour, wide-collar hero styling and magenta chiffon saree cues. Both faces stay distinct.`,
    tips: [
      `Upload one couple photo with both faces fully visible and clearly distinguishable—no heavy beauty filters.`,
      `If outfits swap genders oddly, ask for the man’s wide-collar printed shirt and open blazer, and the woman’s deep magenta chiffon saree with gold border.`,
      `Ask for painted poster texture, slight print wear, and a hand-painted sunset with empty sky at the top.`,
      `Remind the model not to merge or swap facial features between the two leads.`,
    ],
    faqs: [
      {
        question: `Do we need a photo already styled like a poster?`,
        answer: `No. A clear couple portrait works; painted sunset, print wear, and period poster outfits come from the prompt.`,
      },
      {
        question: `Will our faces stay recognizable under paint?`,
        answer: `Yes—ask for painted texture without blurring, swapping, or averaging either face.`,
      },
      {
        question: `Can we keep our own clothes?`,
        answer: `Turn clothing preservation on. Off applies the classic 80s lead-pair poster outfits.`,
      },
      {
        question: `Why does one saree colour go neon?`,
        answer: `Ask for deep magenta chiffon with a gold border under rich saturated sunset poster colour—not fluorescent pink.`,
      },
    ],
    addonLine: `Want a calmer lead-pair poster? Add: keep both exact faces, painted sunset and print-wear colour, but soften poster distress slightly—no extra chorus faces, no modern brand marks in the sky.`,
  },
  "disposable-camera-date-night": {
    intro: `Candid 1980s disposable-camera date night at a dark roller rink with neon lights: harsh flash, film grain, denim jacket or windbreaker, high-waisted jeans, scrunchie energy. Both faces kept separate.`,
    tips: [
      `Upload one photo of two people with both faces clear; candid or standing poses both work.`,
      `If neon melts into blobs, ask for a dark roller rink with readable neon lights and harsh on-camera flash.`,
      `Ask for slightly off-center disposable-camera framing, visible grain, and 1980s casual date outfits.`,
      `When faces blend, insist each person’s face, age, and skin tone stay separate with no feature swap.`,
    ],
    faqs: [
      {
        question: `Must we already be at a roller rink?`,
        answer: `No. A clear couple photo works; the dark rink, neon, and disposable-camera flash build from the prompt.`,
      },
      {
        question: `Will outfits change?`,
        answer: `Yes by default into 1980s casual date wear such as denim, windbreaker, high-waisted jeans, and a scrunchie. Preserve clothing to keep yours.`,
      },
      {
        question: `Why is one face white from flash?`,
        answer: `Ask for harsh flash that still keeps both skin tones accurate—no clipped white faces.`,
      },
      {
        question: `Can we use separate selfies?`,
        answer: `This page expects one couple frame. Merge styles are better when you only have separate photos.`,
      },
    ],
    addonLine: `Want a softer rink snapshot? Add: keep both exact faces, harsh-flash roller-rink neon and 1980s date outfits, but ease flash blowout on foreheads—no bouquets, no modern LED stick lights.`,
  },
  "mall-laser-backdrop-couple": {
    intro: `1980s mall photo-studio couple portrait: cheek-to-cheek on a purple-and-blue laser-beam backdrop, perms, shoulder pads, pastel sweater and satin shirt, soft-focus glossy print. Both faces stay true.`,
    tips: [
      `Upload a couple photo with both faces clear and close enough for a cheek-to-cheek crop; heads at similar height help.`,
      `If lasers overpower faces, ask for purple and blue laser beams that stay behind you with soft-focus glow at the edges.`,
      `Ask for big permed hair, shoulder pads, pastel sweater and satin shirt when clothing is off—period mall-studio glam.`,
      `Treat each person as a separate identity; no blending smiles or eyes.`,
    ],
    faqs: [
      {
        question: `Do we need an old mall studio photo?`,
        answer: `No. A clear couple portrait works; laser backdrop, soft-focus glossy print, and 80s mall outfits come from the prompt.`,
      },
      {
        question: `Will we be posed cheek to cheek?`,
        answer: `Yes when pose is not preserved—that is the classic mall-studio couple crop for this look.`,
      },
      {
        question: `Can we keep our clothes?`,
        answer: `Turn clothing preservation on. Off brings perms, shoulder pads, pastel and satin period styling.`,
      },
      {
        question: `Why do the lasers look like stripes on our faces?`,
        answer: `Ask for laser beams only on the backdrop behind you, with clean edges around hair and cheeks.`,
      },
    ],
    addonLine: `Want a softer mall-studio couple print? Add: keep both exact faces, cheek-to-cheek pose and purple-blue laser backdrop, but ease glossy glow—no heart overlays, no modern filters on the print.`,
  },
  "80s-wedding-album": {
    intro: `Page from a 1980s wedding album: formal flash portrait on a floral wedding-stage backdrop, red bridal lehenga and cream sherwani, slightly yellowed print with rounded corners and mild grain. Both faces preserved.`,
    tips: [
      `Upload a couple photo with both faces clear and enough body visible to show formal outfits.`,
      `If outfits go modern reception-wear, ask for a red bridal lehenga and cream sherwani under on-camera flash.`,
      `Ask for slightly yellowed album print, rounded photo corners, mild film grain, and a floral wedding-stage backdrop.`,
      `Preserve each face separately—no beautify, no blended features—and keep similar camera distance in the source.`,
    ],
    faqs: [
      {
        question: `Must we already be in wedding clothes?`,
        answer: `No. A clear couple photo works; red lehenga, cream sherwani, floral stage, and yellowed album print come from the prompt.`,
      },
      {
        question: `Will our real wedding outfits stay?`,
        answer: `Only if you preserve clothing. Off restyles into the classic 80s formal wedding pair look.`,
      },
      {
        question: `Can we use separate photos?`,
        answer: `This style expects one couple frame. Use a merge couple style when you only have separate uploads.`,
      },
      {
        question: `Why does the print look too orange?`,
        answer: `Ask for slightly yellowed album warmth with accurate skin tones—not a heavy orange filter.`,
      },
    ],
    addonLine: `Want a quieter album-page wedding portrait? Add: keep both exact faces, floral stage, yellowed flash print and formal wedding outfits, but soften flash hotspots—no sparklers, no modern drone lights.`,
  },
  "90s-yearbook-crew": {
    intro: `Coordinated 1990s school yearbook group portrait on a classic mottled studio backdrop: soft nostalgic print texture, retro casual clothes, every friend still recognizable. Friendly posed crew energy—not an action scene.`,
    tips: [
      `Upload a clear group photo with all faces visible and evenly lit; keep the same number of people in every rerun.`,
      `If outfits clash wildly, ask for coordinated 1990s yearbook casual clothing without erasing anyone’s identity.`,
      `Ask for mottled studio backdrop, soft nostalgic colour, and print texture like a real yearbook page.`,
      `When faces warp, name positions left-to-right and ask for natural facial proportions and consistent skin tones.`,
    ],
    faqs: [
      {
        question: `How many friends can be in the photo?`,
        answer: `Match your upload—the result should keep the exact same number of people, each still recognizable.`,
      },
      {
        question: `Will we all get the same haircut?`,
        answer: `No. Expect coordinated 90s casual styling with realistic hair texture cues kept per person.`,
      },
      {
        question: `Do we need an old school photo?`,
        answer: `No. A clear modern group portrait works; mottled backdrop and yearbook print come from the prompt.`,
      },
      {
        question: `Why did someone disappear?`,
        answer: `Crowded overlaps confuse models—re-upload with all faces visible and ask to keep the same headcount.`,
      },
    ],
    addonLine: `Want a calmer yearbook crew page? Add: keep every exact face, mottled studio backdrop and soft nostalgic print, but simplify outfit coordination—no sports trophies in hand, no modern phone props.`,
  },
  "retro-sitcom-cast": {
    intro: `Cozy 80s/90s sitcom cast promo still of your family or friends on a warm living-room set: analog texture, soft ambient lamps, cheerful group chemistry. Everyone stays recognizable as the same people.`,
    tips: [
      `Upload a clear group photo where every face reads; warm indoor sources adapt cleanly to the living-room set.`,
      `If the sofa era looks modern, ask for a cozy retro living-room set with warm ambient lights and analog texture.`,
      `Ask to keep exact headcount, natural expressions, and authentic hairstyle cues per person.`,
      `Prefer a posed promo-still feeling—friendly cast lineup, not a running action gag.`,
    ],
    faqs: [
      {
        question: `Is this only for families?`,
        answer: `Families or friends both work—the look is a nostalgic sitcom cast promo still with warm group chemistry.`,
      },
      {
        question: `Will our living room be copied?`,
        answer: `Not required. The prompt builds a cozy retro living-room set; your faces and headcount stay locked.`,
      },
      {
        question: `Can kids and adults mix?`,
        answer: `Yes if all faces are clear. Ask to keep each person’s apparent age honest.`,
      },
      {
        question: `Why do we look like different actors?`,
        answer: `Rerun with sharper faces and ask to preserve realistic facial identity and skin tone for every person.`,
      },
    ],
    addonLine: `Want a quieter sitcom-cast still? Add: keep every exact face, warm living-room set and analog texture, but soften lamp glow—no laugh-track text overlays, no modern flat-screen TVs in focus.`,
  },
  "y2k-digicam-party": {
    intro: `Early-2000s digicam party snapshot: hard direct flash, grainy fun, fashion attitude, sunset beach hangout vibe. Your group stays the same people—spontaneous closeness, flashy nostalgic colour.`,
    tips: [
      `Upload a clear group photo with friendly closeness; hard flash looks more believable when faces are already evenly lit.`,
      `If the beach goes tropical-stock, ask for a sunset beach hangout with casual party vibe—not a luxury resort plate.`,
      `Ask for hard direct flash, spontaneous digicam framing, and early-2000s colour mood without beautifying faces.`,
      `Keep the exact number of people; name who stands where if someone drifts.`,
    ],
    faqs: [
      {
        question: `Must our photo be at the beach?`,
        answer: `No. A clear group snapshot works; the sunset beach hangout and digicam flash come from the prompt.`,
      },
      {
        question: `Will outfits turn full Y2K?`,
        answer: `Expect early-2000s fashion attitude in the restyle while faces and headcount stay locked.`,
      },
      {
        question: `Why do faces look chalky?`,
        answer: `Ask for hard direct flash that still keeps accurate skin tones—no clipped white faces.`,
      },
      {
        question: `Can two people use this?`,
        answer: `Yes—any small group works as long as every face is clear and the count stays exact.`,
      },
    ],
    addonLine: `Want a calmer Y2K digicam frame? Add: keep every exact face, hard direct flash and sunset beach hangout vibe, but ease flash blowout—no sparkler sticks, no modern ring-light circles.`,
  },
  "after-hours-polaroid": {
    intro: `Candid after-hours Polaroid of friends: warm nostalgic instant-film flash, white-border feel, evening city lights in soft distant bokeh. Spontaneous friends energy—not a formal studio lineup.`,
    tips: [
      `Upload a clear friends photo with natural interaction; evening or indoor sources adapt well to instant-film flash.`,
      `If city lights sharpen too much, ask for soft distant bokeh and instant-film texture with a white-border Polaroid feel.`,
      `Ask to keep realistic facial proportions, consistent skin tone, and believable spacing between people.`,
      `Avoid formal posed studio instructions—this look should stay candid and after-hours.`,
    ],
    faqs: [
      {
        question: `Do we need a real Polaroid scan?`,
        answer: `No. A normal group photo works; instant-film texture, flash, and evening bokeh come from the prompt.`,
      },
      {
        question: `Will the white border always appear?`,
        answer: `The look aims for instant-film Polaroid character including border feel—ask explicitly if it is missing.`,
      },
      {
        question: `Can this be just two friends?`,
        answer: `Yes. Keep both faces clear and ask for candid closeness rather than a stiff pose.`,
      },
      {
        question: `Why do we look oversmoothed?`,
        answer: `Ask for authentic instant-film grain and natural skin—no beauty filter on top of the Polaroid grade.`,
      },
    ],
    addonLine: `Want a quieter night Polaroid? Add: keep every exact face, instant-film flash and evening city bokeh, but soften flash intensity—no bouquet props, no studio seamless backdrop swap.`,
  },
  "friendship-scrapbook": {
    intro: `Handmade friendship scrapbook memory page: your group collaged with torn paper, tape, mini photos and doodles on a warm nostalgic paper craft layout. Faces stay clear; the page feels crafted, not like a flat filter.`,
    tips: [
      `Upload a clear group photo where every face is sharp; collage layouts need readable expressions.`,
      `If paper layers bury faces, ask for the main group photo to stay large and unobscured under torn-paper accents.`,
      `Ask for layered handmade scrapbook textures—tape, mini photos, doodles—without covering eyes or mouths.`,
      `Keep exact headcount and natural friendship warmth; avoid turning it into a single sticker-covered blur.`,
    ],
    faqs: [
      {
        question: `Is this one photo or many photos merged?`,
        answer: `Start from your group photo; the prompt builds a scrapbook page around that group with paper layers and accents.`,
      },
      {
        question: `Will our faces stay photo-real?`,
        answer: `Yes—faces should stay recognizable with natural proportions while the page around them looks handmade.`,
      },
      {
        question: `Can I ask for handwritten names?`,
        answer: `Optionally request simple doodle notes away from faces; keep them from covering anyone’s features.`,
      },
      {
        question: `Why do people look cut out badly?`,
        answer: `Ask for clean paper edges around the group and no jagged halo or missing shoulders.`,
      },
    ],
    addonLine: `Want a cleaner scrapbook page? Add: keep every exact face, torn-paper collage and warm nostalgic paper craft, but reduce sticker clutter around faces—no glitter explosions, no unrelated celebrity cutouts.`,
  },
  "photo-booth-chaos": {
    intro: `Playful multi-frame photo-booth strip of your friends: silly micro-poses, booth flash, cozy indoor celebration atmosphere, print texture. Same people, same headcount, friendship energy across the frames.`,
    tips: [
      `Upload a clear group photo with all faces visible and evenly lit; avoid heavy overlap so frames do not merge people.`,
      `If frames collapse into one image, ask for a classic multi-frame booth strip with slightly different expressions per frame.`,
      `Ask for booth-style flash, print texture, and a cozy indoor celebration setting without changing who is in the group.`,
      `Tiny distant faces lose identity—prefer a source where everyone is close enough to read.`,
    ],
    faqs: [
      {
        question: `How many frames will we get?`,
        answer: `Expect a classic multi-frame booth strip or grid of the same group in slightly different micro-poses.`,
      },
      {
        question: `Will someone be dropped from a frame?`,
        answer: `Ask to keep the exact same number of people in every frame with all faces recognizable.`,
      },
      {
        question: `Do we need a real booth photo?`,
        answer: `No. A clear group picture works; booth flash, strip layout, and playful expressions come from the prompt.`,
      },
      {
        question: `Why do faces blur in later frames?`,
        answer: `Rerun with a sharper source and ask for consistent identity and print texture across the whole strip.`,
      },
    ],
    addonLine: `Want a tidier booth strip? Add: keep every exact face, multi-frame booth flash and cozy celebration vibe, but calm the silliest pose in one frame—no prop mustaches drawn on faces, no extra strangers in the strip.`,
  },
  "cozy-pumpkin-patch-portrait": {
    intro: `Warm pumpkin-patch Halloween portrait: cream knit sweater, hay bale seat, golden autumn light. Upload one clear selfie; face, hair and skin tone stay yours while the patch scene is built around you.`,
    tips: [
      `Use a well-lit selfie with an unobscured face; the prompt keeps identity while adding the chunky cream sweater and hay-bale pose.`,
      `If pumpkins look sparse, ask for a fuller patch of orange pumpkins and hay around the bale without crowding the face.`,
      `Leave clothing and pose off so the autumn outfit and seated hay-bale framing can apply; turn them on only to lock your own clothes or pose.`,
      `When light goes flat, ask for warm golden hour glow across the sweater and pumpkins, not harsh midday flash.`,
    ],
    faqs: [
      {
        question: `Do I need a photo already taken in a pumpkin patch?`,
        answer: `No. A clear indoor or outdoor selfie works; the prompt builds the festive pumpkin-patch backdrop when pose is not preserved.`,
      },
      {
        question: `Will my clothes stay the same?`,
        answer: `Only if you preserve clothing. Otherwise you get a chunky cream knit sweater while your face stays locked.`,
      },
      {
        question: `Is this meant to look scary?`,
        answer: `No—this look is warm and inviting autumn Halloween, not horror. Keep the golden mood and skip zombie or gore add-ons.`,
      },
      {
        question: `Why does the hay look fake?`,
        answer: `Ask for natural hay-bale texture under you and real pumpkin shapes nearby, with soft depth so props do not stick to the sweater.`,
      },
    ],
    addonLine: `Want a cozier patch vibe? Add: keep the cream knit, hay bale and warm golden light, but tuck one small carved pumpkin beside the bale—no fog machines, no scary makeup.`,
  },
  "recognizable-zombie-portrait": {
    intro: `Spooky zombie selfie that still looks like you: pale grey skin, dark under-eyes and torn clothes on an abandoned night street, with face shape, eyes and hairline locked.`,
    tips: [
      `Upload a sharp frontal or three-quarter selfie; the look keeps your pose by default and layers zombie skin and atmosphere over it.`,
      `If the face drifts into a different person, restate exact face shape, eyes and hairline, and keep zombie details light—scratches, not full gore masks.`,
      `Preserve clothing only if you want your real outfit under the zombie mood; otherwise torn costume pieces can apply.`,
      `When the street looks too bright, ask for cool night light and an abandoned street backdrop without neon billboards.`,
    ],
    faqs: [
      {
        question: `Will I still be recognisable as a zombie?`,
        answer: `Yes—that is the point. Pale skin and under-eye circles stay spooky while face shape, eyes and hairline stay yours.`,
      },
      {
        question: `Does my pose change?`,
        answer: `Pose is preserved by default here. Outfit and background can still shift unless you lock clothing.`,
      },
      {
        question: `How do I stop extreme gore?`,
        answer: `Ask for light scratches and weathered skin only—spooky, not extreme—and avoid requests for missing limbs or heavy blood.`,
      },
      {
        question: `Can men and women both use this?`,
        answer: `Yes. Use any clear selfie; the zombie treatment follows your face without swapping gender or age.`,
      },
    ],
    addonLine: `Want a slightly grittier night walk? Add: keep the greyish skin, torn look and abandoned night street, but add faint mist near the ground—no blood spray, no full skull replacement.`,
  },
  "friendly-glowing-witch-portrait": {
    intro: `Charming Halloween witch in a cozy cottage kitchen: tall black hat, dark green velvet dress and a magical glowing hand, with your real face and hair kept.`,
    tips: [
      `Start with a clear chest-up or waist-up photo so the pointed hat and velvet dress can frame cleanly without cropping your face.`,
      `Leave pose off so the friendly raised-hand glow can appear; preserve pose only if you must keep your exact stance.`,
      `If the hand glow looks like a phone torch, ask for a soft magical aura around the open palm that matches warm kitchen light.`,
      `When the kitchen feels empty, ask for cozy cottage shelves and warm practical light behind you—still friendly, not haunted-house horror.`,
    ],
    faqs: [
      {
        question: `Is this a scary witch look?`,
        answer: `No. It is a warm, charming Halloween witch with a magical hand glow in a cozy cottage kitchen.`,
      },
      {
        question: `Will my hairstyle stay?`,
        answer: `Yes—face, features, hairstyle and skin tone stay. The tall black hat sits on top rather than replacing your hair identity.`,
      },
      {
        question: `Do I need a costume photo already?`,
        answer: `No. A normal selfie works; the prompt adds the hat, velvet dress and glow when clothing and pose are not preserved.`,
      },
      {
        question: `Why does the glow look painted on?`,
        answer: `Ask for soft light spilling from the palm onto nearby skin and kitchen surfaces, not a flat neon circle stuck on the hand.`,
      },
    ],
    addonLine: `Want a touch more kitchen magic? Add: keep the black hat, green velvet dress and glowing hand, but set a small potion bottle on the counter behind—no flying broom chase, no scary scars.`,
  },
  "elegant-gothic-vampire-portrait": {
    intro: `Refined gothic vampire in a candlelit library: black velvet high-collar coat with crimson silk, moody makeup and candle glow, while face shape, eyes, nose, lips and skin stay yours.`,
    tips: [
      `Use a sharp portrait with even face light so the candlelit library and velvet collar can read without washing out your features.`,
      `Leave clothing and pose off for the high-collar black velvet coat and crimson silk details; lock clothing only to keep your real outfit.`,
      `If fangs or contacts appear too cartoonish, ask for subtle gothic makeup and soft candle atmosphere without heavy costume contacts.`,
      `When bookshelves melt into blur blobs, ask for readable carved shelves and warm candle pools behind you, still soft and moody.`,
    ],
    faqs: [
      {
        question: `Will this change my skin tone?`,
        answer: `No. Skin tone and natural texture stay; the mood comes from candle light, makeup and wardrobe, not bleaching the face.`,
      },
      {
        question: `Do I need a library photo?`,
        answer: `No. Any clear selfie works; the candlelit gothic library is built as the backdrop when pose is not preserved.`,
      },
      {
        question: `Is the look more elegant or horror?`,
        answer: `Elegant and moody—refined vampire styling rather than jump-scare horror.`,
      },
      {
        question: `Can I keep my own clothes?`,
        answer: `Yes—turn clothing preservation on. Otherwise the black velvet high-collar coat with crimson silk applies.`,
      },
    ],
    addonLine: `Want a richer library night mood? Add: keep the velvet high collar, crimson silk and candlelit shelves, but add one antique candleholder on a side table—no bat swarms, no dripping blood.`,
  },
  "skeleton-face-paint-portrait": {
    intro: `Realistic skeleton face-paint Halloween look on your own photo: white base, dark eye sockets and bone detail on a plain dark backdrop, while pose, clothes, eyes and expression stay.`,
    tips: [
      `Upload one clear frontal or three-quarter portrait with good skin light; heavy sunglasses or hands on the face weaken the paint map.`,
      `Clothing and pose stay by design—this is makeup only, not a full costume swap—so pick a photo whose outfit you are happy to keep.`,
      `If paint looks like a sticker, ask for white face-paint base with dark sockets that follow real bone landmarks and blend at the hairline.`,
      `Avoid extreme crops; leave room around the face so the plain dark background and lighting can frame the makeup cleanly.`,
    ],
    faqs: [
      {
        question: `Does my outfit change?`,
        answer: `No. Clothing and pose are preserved; only skeleton face paint, lighting and a plain dark background are added.`,
      },
      {
        question: `What photo works best?`,
        answer: `One clear frontal or three-quarter portrait with a visible face, good skin light, and no heavy occlusion or blur.`,
      },
      {
        question: `Will my expression stay?`,
        answer: `Yes. Eyes and expression stay; the paint follows your face rather than replacing it with a different skull character.`,
      },
      {
        question: `Why does makeup break near the hair?`,
        answer: `Ask for paint that stops cleanly at the hairline and ears, matching real face-paint edges instead of covering hair as white paint.`,
      },
    ],
    addonLine: `Want slightly stronger bone contrast? Add: keep your exact clothes, pose and expression, but deepen the black eye sockets a touch while keeping the white base soft—no full skull 3D mask, no costume change.`,
  },
  "midnight-glove-noir": {
    intro: `Luxurious black-and-white evening portrait with long sheer mesh gloves, soft circular bokeh and deep elegant blacks. One clear face photo is enough; likeness and skin texture stay.`,
    tips: [
      `Use one sharp portrait with a visible face; soft indoor light helps the monochrome grade keep luminous skin instead of chalky whites.`,
      `Leave clothing off so the sleeveless black evening top and long sheer glove can appear; preserve clothing only if gloves alone are not enough reason to change the outfit.`,
      `If gloves look solid or rubbery, ask for sheer black mesh evening gloves with realistic fabric stretch at the fingers.`,
      `When bokeh turns into disco blobs, ask for soft circular evening lights on a dark elegant indoor set with shallow depth.`,
    ],
    faqs: [
      {
        question: `Is the final image in colour?`,
        answer: `No. This style is luxurious cinematic monochrome with silver highlights and deep blacks.`,
      },
      {
        question: `Do I need to wear gloves in the source photo?`,
        answer: `No. The prompt adds the long sheer black mesh glove when clothing is not preserved.`,
      },
      {
        question: `Will my face stay the same?`,
        answer: `Yes. Identity, facial features and natural skin texture stay; only outfit, gloves, light and backdrop shift.`,
      },
      {
        question: `Why does skin look plastic in black and white?`,
        answer: `Ask for luminous skin with subtle film grain and soft gray midtones, not over-smoothed beauty-filter skin.`,
      },
    ],
    addonLine: `Want a quieter glove close-up? Add: keep the monochrome evening look and long sheer glove, but soften silver highlights on the skin slightly—no colour props, no busy jewellery stacks.`,
  },
  "silver-rim-noir": {
    intro: `High-contrast black-and-white beauty portrait for men: glossy satin blouse, glowing silver rim light around the hair and deep soft blacks on a dark minimal studio backdrop.`,
    tips: [
      `Upload one clear portrait with a visible face; shorter hair still works—the silver rim reads best when the head outline is sharp.`,
      `Leave clothing off for the light reflective satin or silk blouse with an open collar; lock clothing only to keep your real shirt.`,
      `If the rim light disappears, ask for strong backlight that traces a silver edge along the hair without blowing out the face.`,
      `When blacks crush detail, ask for deep soft blacks with retained facial structure and faint atmospheric particles behind you.`,
    ],
    faqs: [
      {
        question: `Is this only for men?`,
        answer: `It is written as a men’s monochrome beauty look, but any clear portrait can use the silver-rim lighting and satin styling.`,
      },
      {
        question: `Do I need a studio photo already?`,
        answer: `No. A normal portrait works; the dark minimal studio and backlight rim are created in the edit.`,
      },
      {
        question: `Will beard or hair change?`,
        answer: `Facial structure and likeness stay. Ask explicitly to keep beard shape and hairline if those start drifting.`,
      },
      {
        question: `Why is everything flat grey?`,
        answer: `Ask for high-contrast cinematic monochrome with luminous silver highlights and deep soft blacks, not a mid-grey wash.`,
      },
    ],
    addonLine: `Want a sharper silver edge? Add: keep the monochrome satin look and dark studio, but strengthen the glowing silver rim on the hair slightly—no coloured gels, no busy props in front of the face.`,
  },
  "velvet-rose-noir": {
    intro: `Moody low-light portrait holding a single red rose: black knit layers, amber chiaroscuro and deep brown-black shadows so the crimson rose is the only strong colour accent.`,
    tips: [
      `Use one clear portrait; a face that can crop to chest-up helps the rose sit naturally near the jaw without covering both eyes.`,
      `Leave pose off if you want the rose-holding arrangement; preserve pose only when you already hold something similar.`,
      `If the rose turns pink or orange, ask for one rich crimson rose with sharp petal detail against muted skin tones.`,
      `When the room vanishes into noise, ask for a dark softly blurred interior with faint warm window-light patches only.`,
    ],
    faqs: [
      {
        question: `Is the whole photo meant to be black and white?`,
        answer: `No. The grade is warm cinematic chiaroscuro with muted skin; the single rose stays a rich crimson accent.`,
      },
      {
        question: `Do I need a rose in my source photo?`,
        answer: `No. The prompt adds the single red rose when props and pose are allowed to change.`,
      },
      {
        question: `What should I wear in the upload?`,
        answer: `Anything clear on the face works. If clothing is not preserved, a simple fitted black long-sleeve or knit replaces the outfit.`,
      },
      {
        question: `Why does the rose cover my face?`,
        answer: `Ask to hold the rose beside the cheek or just below the chin so eyes and likeness stay fully visible.`,
      },
    ],
    addonLine: `Want a softer rose moment? Add: keep the single crimson rose, black knit and amber low light, but lower overall contrast slightly—no bouquet, no floating petals across the face.`,
  },
  "vintage-pulp-comic-hero": {
    intro: `Retro pulp comic-book hero treatment of your selfie: leather jacket, bold ink and halftone colour, set at a roadside diner sunset with a classic red car behind you.`,
    tips: [
      `Choose a clear portrait with a strong facial silhouette; soft or blurry edges weaken the ink contours.`,
      `Expect illustration softening of photo-real skin—that is by design; restate likeness if the face becomes a generic hero.`,
      `If the diner sign becomes readable text, ask for unreadable background signage and keep focus on you and the red car.`,
      `When colours feel neon-modern, ask for vintage teal, burnt orange, cream and faded sepia print colour only.`,
    ],
    faqs: [
      {
        question: `Will this still look like a photo?`,
        answer: `It becomes a vintage pulp illustration with bold ink, halftone and weathered paper—not a straight photo edit.`,
      },
      {
        question: `Do I need a leather jacket already?`,
        answer: `No. The prompt dresses you in a classic leather jacket over a simple shirt when clothing is not preserved.`,
      },
      {
        question: `Can the diner text stay readable?`,
        answer: `Background signage should stay unreadable so the piece does not invent logos or words.`,
      },
      {
        question: `Why did my face change?`,
        answer: `Ask again to preserve recognisable identity, facial features and natural complexion under the ink and halftone shading.`,
      },
    ],
    addonLine: `Want a tougher pulp cover energy? Add: keep the leather jacket, diner sunset and classic red car, but add a light wind in the jacket lapel—no modern superhero cape, no speech bubbles.`,
  },
  "storybook-adventure-pet": {
    intro: `Whimsical storybook adventure portrait of your dog or pet: illustrated explorer energy on an enchanted forest path with flowers, a stone bridge and a distant castle, markings kept true.`,
    tips: [
      `Upload a sharp pet photo that shows face, eye colour and markings clearly; side profiles work if the eyes are still readable.`,
      `Ask to preserve species, breed type, fur pattern and eye colour if the illustration starts drifting toward a generic cartoon dog.`,
      `Keep accessories light—a scarf or tiny satchel—so the pet stays the hero rather than disappearing under props.`,
      `When the castle overpowers the pet, ask for a distant castle with the animal large in the foreground on the forest path.`,
    ],
    faqs: [
      {
        question: `Will my pet still look like itself?`,
        answer: `Yes—species, markings, eye colour and facial structure should stay recognisable inside the storybook illustration.`,
      },
      {
        question: `Does this work for cats too?`,
        answer: `Yes, any clear pet photo can be cast as the adventure companion; keep the request focused on that animal’s real features.`,
      },
      {
        question: `Is the result photo-real?`,
        answer: `No. It is a warm magical illustrated adventure scene, not a realistic outdoor photo.`,
      },
      {
        question: `Why do accessories hide the face?`,
        answer: `Ask for tasteful small accessories only, placed away from the eyes and muzzle so the pet stays clearly readable.`,
      },
    ],
    addonLine: `Want a gentler adventure page? Add: keep the pet’s exact markings and the enchanted forest path, but soften the castle in the far distance—no human rider, no scary dragons.`,
  },
  "funny-everyday-pet": {
    intro: `Humorous everyday lifestyle portrait of your pet at a cozy home-office desk: laptop, coffee mug and warm lamp light, with the animal still looking like itself—not turned into a human.`,
    tips: [
      `Use a clear pet photo with readable face and body markings; funny staging works best when the animal remains intact and recognisable.`,
      `If the pet becomes a person in clothes, restate that the animal stays an animal in a playful human-like desk situation.`,
      `Ask for the cozy desk set—laptop, mug, notebook, lamp and soft greenery—without clutter covering the pet’s face.`,
      `When the joke feels mean, keep the humour warm and cozy: curious paws near the keyboard, not distressed expressions.`,
    ],
    faqs: [
      {
        question: `Will my pet be turned into a human?`,
        answer: `No. The animal stays visually intact; only the everyday desk scene and props create the joke.`,
      },
      {
        question: `Do I need a photo at a desk already?`,
        answer: `No. A normal pet portrait works; the home-office desk and warm lamp light are staged in the edit.`,
      },
      {
        question: `Can I choose a different everyday gag?`,
        answer: `The default scene is the cozy desk. Optional add-ons should stay small; do not replace the whole lifestyle setting unless you accept a different look.`,
      },
      {
        question: `Why did markings change?`,
        answer: `Ask again to preserve breed or type, colours, markings and eye colour exactly as in the upload.`,
      },
    ],
    addonLine: `Want a softer office gag? Add: keep the real pet look and the cozy desk with laptop and coffee mug, but place one paw gently near the keyboard—no human body swap, no messy food spill on fur.`,
  },
  "crimson-bloom-shadows": {
    intro: `Close floral beauty portrait with crimson rose shadows across your face: ivory lace blouse, warm sunlit contrast and a dark cool outdoor blur behind the roses.`,
    tips: [
      `Upload one clear face portrait; close crops work if both eyes stay visible under the rose shadow pattern.`,
      `Leave clothing off for the soft ivory or white romantic blouse with light lace at the neckline.`,
      `If rose shadows look like red paint, ask for natural crimson petal shadows cast across the face from real roses in frame.`,
      `When the background fights the face, ask for a dark cool softly blurred outdoor backdrop with strong depth separation.`,
    ],
    faqs: [
      {
        question: `Do the roses replace my face?`,
        answer: `No. Crimson rose shadows fall across your face while identity and skin texture stay readable.`,
      },
      {
        question: `Must I hold flowers in the source photo?`,
        answer: `No. Props and flowers are added in the edit when those changes are allowed.`,
      },
      {
        question: `What outfit appears by default?`,
        answer: `If clothing is not preserved, a soft ivory or white romantic blouse with delicate lace or light texture near the neckline.`,
      },
      {
        question: `Why is everything tinted red?`,
        answer: `Ask for natural skin tones with deep crimson only in the roses and their shadows, plus crisp whites and rich dark shadows.`,
      },
    ],
    addonLine: `Want a softer rose shadow? Add: keep the ivory blouse and crimson rose shadows on the face, but lighten the darkest petal shade slightly—no full face cover, no extra flower crowns.`,
  },
  "purple-smoke-portrait-ai-photo-prompt": {
    intro: `Dramatic purple-smoke artwork portrait: swirling violet smoke on a pure black studio field with rim light, while your face, skin tone, hairstyle and apparent age stay exact.`,
    tips: [
      `Use one clear chest-up photo with the face fully visible; beauty filters make smoke edges look fake against the skin.`,
      `Leave clothing and pose off so the high-contrast smoke wrap and rim light can rebuild the frame cleanly.`,
      `If smoke turns pink or blue, ask for deep violet smoke only against pure black, with rim light separating hair from the void.`,
      `When skin lightens, restate exact skin tone and ethnicity lock—drama comes from smoke and contrast, not bleaching.`,
    ],
    faqs: [
      {
        question: `Will my skin tone change in the purple light?`,
        answer: `It should not. Keep exact skin tone; violet belongs in the smoke and rim, not as a full-face colour cast that lightens you.`,
      },
      {
        question: `What photo angle works best?`,
        answer: `Front or slight three-quarter, chest-up, sharp, with even daylight and no heavy beauty filter.`,
      },
      {
        question: `Does clothing stay?`,
        answer: `Not by default. Preserve clothing only if you need your real outfit inside the smoke wrap.`,
      },
      {
        question: `Why does the smoke cover my eyes?`,
        answer: `Ask for smoke wrapping the shoulders and edges while keeping eyes, brows and mouth fully clear.`,
      },
    ],
    addonLine: `Want thicker violet drama? Add: keep the exact face, black studio and swirling violet smoke, but thicken the smoke curl on one shoulder—no neon text, no second coloured smoke.`,
  },
  "red-bridal-lehenga": {
    intro: `Classic red bridal lehenga with heavy zardozi, head dupatta and gold kundan in a Mughal-style palace hall—marble arches, hanging lanterns and rose petals—while your real face stays.`,
    tips: [
      `Upload one clear waist-up photo of an adult woman; front or slight three-quarter with even light gives the cleanest jewellery and dupatta drape.`,
      `Leave clothing and pose off so the red zardozi lehenga, head dupatta and kundan set can apply fully.`,
      `If zardozi turns into random glitter, ask for structured gold zardozi on the lehenga and a clear kundan necklace and earrings set.`,
      `When the hall looks empty, ask for carved marble arches, warm hanging lanterns and deep red rose petals on the floor without crowding the face.`,
    ],
    faqs: [
      {
        question: `Do I need a bridal lehenga photo already?`,
        answer: `No. A clear waist-up everyday photo works; the red zardozi lehenga and palace hall are added in the edit.`,
      },
      {
        question: `Will my skin tone stay the same?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses if worn stay locked.`,
      },
      {
        question: `Is the dupatta on the head by default?`,
        answer: `Yes. This look uses a dupatta over the head with the classic red bridal styling.`,
      },
      {
        question: `Can I keep my own jewellery?`,
        answer: `Only if you preserve clothing/accessories behaviour your tool allows; otherwise gold kundan is part of the default bridal change.`,
      },
    ],
    addonLine: `Want a richer baraat-ready glow? Add: keep the red zardozi lehenga, head dupatta and kundan set, but warm the hanging lanterns slightly—no white gown swap, no outdoor mehndi props.`,
  },
  "pastel-bridal-lehenga": {
    intro: `Soft blush or mint pastel bridal lehenga with pearl jewellery and a sheer dupatta in a flower-filled garden pavilion—white marble pillars, pink-white blooms and a blurred fountain.`,
    tips: [
      `Use a clear waist-up photo with even light so pearl jewellery and sheer dupatta edges stay delicate, not muddy.`,
      `Leave clothing off for the pastel lehenga and pearls; locking clothes will block the blush or mint bridal change.`,
      `If colours go neon, ask for soft blush or mint only with dreamy pastel light—no heavy red zardozi takeover.`,
      `When the fountain fights the subject, keep it softly blurred behind marble pillars and cascading white-pink flowers.`,
    ],
    faqs: [
      {
        question: `Is this the same as a classic red bridal look?`,
        answer: `No. This is a soft dreamy pastel lehenga with pearls in a daylight garden pavilion, not a crimson palace bridal.`,
      },
      {
        question: `Blush or mint—which one appears?`,
        answer: `Either soft blush or mint can read as the pastel bridal; if you need one, name it in an optional line without changing the pavilion default.`,
      },
      {
        question: `Will glasses stay?`,
        answer: `Yes if you wear them in the source; face, skin tone and head covering stay as well.`,
      },
      {
        question: `Why does the dupatta look opaque?`,
        answer: `Ask for a sheer dupatta with light transparency at the edges so hair and shoulders still show softly.`,
      },
    ],
    addonLine: `Want a dreamier garden finish? Add: keep the pastel lehenga, pearls and sheer dupatta, but add a few loose petals on the pavilion floor—no red bridal swap, no night haveli lamps.`,
  },
  "bridal-sharara": {
    intro: `Maroon gota-work bridal sharara with a long embroidered kameez and matha patti, seated on a haveli takht mood—jharokha windows, brass lamps and marigold-rose petals at night.`,
    tips: [
      `Upload a clear waist-up photo; if you want the seated haveli framing, leave pose off so the takht arrangement can appear.`,
      `Leave clothing off for the maroon gota sharara, long kameez and matha patti; preserving clothes blocks that bridal change.`,
      `If gota work turns into noise, ask for clear gota embroidery on the sharara and a defined matha patti on the hair parting.`,
      `When night light goes flat, ask for brass lamps, carved jharokha windows and deep red drapes with scattered marigold and rose petals.`,
    ],
    faqs: [
      {
        question: `How is a sharara different from a lehenga here?`,
        answer: `This look uses a maroon gota sharara with a long embroidered kameez and matha patti, not a circular lehenga skirt.`,
      },
      {
        question: `Do I need a haveli photo?`,
        answer: `No. A normal waist-up portrait works; the lamp-lit haveli courtyard is built as the backdrop.`,
      },
      {
        question: `Will the matha patti change my hair identity?`,
        answer: `Hair identity stays; the matha patti is added along the parting without replacing your hair colour or length story.`,
      },
      {
        question: `Can I use this for mehndi night instead?`,
        answer: `This page is the maroon haveli sharara bridal. For mustard-green mehndi styling, use the dedicated mehndi outfit look.`,
      },
    ],
    addonLine: `Want a deeper haveli night mood? Add: keep the maroon gota sharara, long kameez and matha patti, but warm one brass lamp beside the takht—no pastel garden pavilion, no white maxi gown.`,
  },
  "ivory-sherwani": {
    intro: `Regal dulha portrait in an ivory zardozi sherwani with kulla or safa, pearl mala and khussa energy in a sandstone palace corridor lit by warm lanterns.`,
    tips: [
      `Upload one clear waist-up photo of an adult man; keep beard and glasses visible if you wear them so they stay locked.`,
      `Leave clothing and pose off for the ivory zardozi sherwani, kulla/safa and pearl mala to apply.`,
      `If embroidery looks cheap, ask for refined ivory zardozi on the sherwani with a neat pearl mala—not random gold speckles.`,
      `When the corridor feels generic, ask for carved sandstone arches, warm lanterns and soft deep red-and-gold drapes behind you.`,
    ],
    faqs: [
      {
        question: `Will my beard stay?`,
        answer: `Yes. Face, skin tone, hair and beard stay; only sherwani, headwear and setting change by default.`,
      },
      {
        question: `Kulla or safa—what appears?`,
        answer: `Either a kulla or safa can complete the dulha look; name your preference in an optional line if you need one specifically.`,
      },
      {
        question: `Do I need a sherwani photo already?`,
        answer: `No. A clear everyday waist-up photo is enough for the ivory zardozi sherwani edit.`,
      },
      {
        question: `Is this for reception or baraat?`,
        answer: `It reads as a regal palace-corridor dulha look—classic ivory sherwani rather than a black reception tuxedo.`,
      },
    ],
    addonLine: `Want a slightly richer baraat corridor glow? Add: keep the ivory sherwani, kulla or safa and pearl mala, but warm the lantern light along the sandstone arches—no black velvet reception swap, no fairy-lawn prince coat.`,
  },
  "black-sherwani": {
    intro: `Moody black velvet sherwani with antique gold buttons under gold reception uplighting—deep velvet drapes, candles and soft gold bokeh—while your face and beard stay exact.`,
    tips: [
      `Use a clear waist-up photo of an adult man; even light helps velvet and gold buttons read without crushing into a black blob.`,
      `Leave clothing off so the black velvet sherwani and gold buttons can replace the outfit; preserve clothes only to keep your real look.`,
      `If the frame goes full noir with no face detail, ask for moody gold uplighting that still keeps skin tone accurate.`,
      `When khussa or lower outfit vanishes oddly, stay waist-up focused or ask for embroidered khussa hints only if the crop allows.`,
    ],
    faqs: [
      {
        question: `How is this different from the ivory sherwani look?`,
        answer: `This is a black velvet reception sherwani with antique gold buttons and moody gold light, not an ivory palace-corridor dulha set.`,
      },
      {
        question: `Will glasses stay on?`,
        answer: `Yes if they are in the source photo; face, skin tone, hair and beard stay as well.`,
      },
      {
        question: `Do I need a reception hall photo?`,
        answer: `No. The dark luxurious hall with gold uplighting and velvet drapes is created in the edit.`,
      },
      {
        question: `Why do gold buttons look like stickers?`,
        answer: `Ask for antique gold buttons stitched into the black velvet placket with realistic metal sheen and soft reception light.`,
      },
    ],
    addonLine: `Want a deeper reception noir? Add: keep the black velvet sherwani, gold buttons and candlelit hall, but add one soft gold bokeh cluster behind the shoulder—no ivory baraat sherwani, no marigold mehndi swing.`,
  },
  "groom-prince-coat": {
    intro: `Warm evening groom look: navy prince coat or brocade waistcoat over a kurta and churidar on a fairy-lit wedding lawn with floral pillars and soft bokeh.`,
    tips: [
      `Upload a clear waist-up photo of an adult man; outdoor evening source light is fine but not required.`,
      `Leave clothing off for the prince coat or brocade waistcoat over kurta; add a pocket square detail if it goes missing.`,
      `If fairy lights turn into white noise, ask for fairy-light canopies and warm bokeh behind white floral pillars.`,
      `When the coat colour drifts, ask for navy prince coat or clear brocade waistcoat—not a black tuxedo swap.`,
    ],
    faqs: [
      {
        question: `Prince coat or waistcoat—which one?`,
        answer: `Either a navy prince coat or a brocade waistcoat over a kurta fits this page; name one if you need a single clear option.`,
      },
      {
        question: `Is this a daytime baraat look?`,
        answer: `No. The default mood is warm evening elegance on a fairy-lit wedding lawn.`,
      },
      {
        question: `Will my hair and beard stay?`,
        answer: `Yes. Face, skin tone, hair and beard stay; outfit and lawn setting change by default.`,
      },
      {
        question: `Can I keep my own kurta?`,
        answer: `Turn clothing preservation on. Otherwise the prompt builds the prince-coat or waistcoat layering for you.`,
      },
    ],
    addonLine: `Want a softer lawn evening finish? Add: keep the prince coat or waistcoat over the kurta and the fairy-lit lawn, but lower the bokeh intensity slightly—no crystal walima stage, no marigold mehndi cushions.`,
  },
  "couple-wedding-outfits": {
    intro: `Coordinated couple wedding portrait: maroon lehenga with ivory sherwani in a marble palace hall of arches, lanterns and rose petals. Upload two photos or one frame of you both; both faces stay.`,
    tips: [
      `Prefer one clear photo per person, or one sharp couple frame; similar lighting across both uploads helps skin tones stay honest.`,
      `Leave clothing and pose off so maroon lehenga and ivory sherwani coordination can apply to both people.`,
      `If heights look wrong, ask to keep realistic relative heights and each person’s exact face, age and skin tone.`,
      `When outfits mismatch themes, restate maroon bridal lehenga with ivory groom sherwani—not two identical suits.`,
    ],
    faqs: [
      {
        question: `Do we need one photo of us together already?`,
        answer: `No. Two separate clear photos work, or one photo of you both; the style merges you into one palace-hall couple frame.`,
      },
      {
        question: `Will both faces stay recognisable?`,
        answer: `Yes. Both identities, skin tones, ages, hairstyles, beards and head coverings stay locked.`,
      },
      {
        question: `Who wears maroon and who wears ivory?`,
        answer: `The coordinated default is maroon lehenga with ivory sherwani. Say which upload is the bride and which is the groom if roles swap in the result.`,
      },
      {
        question: `Why did one person change age?`,
        answer: `Restate each exact apparent age and skin tone from the source photos and ask for no beautifying age shift.`,
      },
    ],
    addonLine: `Want a calmer palace couple frame? Add: keep both exact faces, the maroon lehenga and ivory sherwani, but soften the hanging lantern glow—no mehndi swing props, no tuxedo swap for the groom.`,
  },
  "dulha-dulhan-outfits": {
    intro: `Classic dulha-dulhan stage portrait: red lehenga with gold sherwani and safa on a lavish wedding stage of carved gold sofa, rose-marigold walls and hanging floral strings.`,
    tips: [
      `Upload two clear photos or one couple frame; both faces should be front or three-quarter and sharp.`,
      `Leave clothing off so red bridal lehenga and gold sherwani with safa can dress both of you for the stage.`,
      `If the sofa swallows your legs oddly, stay focused on a clean waist-up or seated stage crop and ask for realistic posture on the carved gold sofa.`,
      `When flowers overpower faces, ask for rose and marigold stage walls behind you with hanging strings that do not cover eyes.`,
    ],
    faqs: [
      {
        question: `How is this different from the maroon-and-ivory couple look?`,
        answer: `This is a festive stage dulha-dulhan set: red lehenga with gold sherwani and safa on a floral wedding stage, not maroon-ivory palace corridor styling.`,
      },
      {
        question: `Can we upload two selfies?`,
        answer: `Yes. One clear photo per person works; a single photo of both of you also works.`,
      },
      {
        question: `Will head coverings and beards stay?`,
        answer: `Yes. Hairstyles, beards, head coverings and each skin tone stay while outfits change.`,
      },
      {
        question: `Why do we look the same height when we are not?`,
        answer: `Ask to keep realistic relative heights from your source photos so neither person is stretched or shrunk.`,
      },
    ],
    addonLine: `Want a richer stage baraat energy? Add: keep both exact faces, the red lehenga and gold sherwani with safa, but warm the golden bokeh behind the floral wall—no pastel garden outfits, no charcoal tuxedo.`,
  },
  "nikkah-dress": {
    intro: `Modest ivory-and-gold nikah bridal look with a sheer head dupatta and minimal jewellery under white rose-and-jasmine floral arches and soft fairy-light bokeh.`,
    tips: [
      `Use one clear waist-up photo of an adult woman; hijab or head covering in the source is preserved when present.`,
      `Leave clothing off for the ivory-and-gold nikah outfit and sheer head dupatta; lock clothes only if you must keep a real outfit.`,
      `If jewellery gets heavy, ask for minimal jewellery only—this look stays soft and modest, not full bridal kundan overload.`,
      `When arches look artificial, ask for ivory floral arches of white roses and jasmine with soft sheer drapes behind you.`,
    ],
    faqs: [
      {
        question: `Is this suitable if I wear a hijab?`,
        answer: `Yes. Hair, hijab or head covering from the source stays; the sheer dupatta styling respects that identity.`,
      },
      {
        question: `How is this different from a walima maxi?`,
        answer: `Nikah here is soft ivory-and-gold with minimal jewellery under white floral arches, not a silver-champagne chandelier reception gown.`,
      },
      {
        question: `Will my face be lightened?`,
        answer: `It should not. Exact skin tone stays; ask again if the ivory mood starts bleaching the face.`,
      },
      {
        question: `Do I need a nikah venue photo?`,
        answer: `No. A clear everyday waist-up portrait is enough; the floral arch setting is built in the edit.`,
      },
    ],
    addonLine: `Want a quieter nikah softness? Add: keep the ivory-and-gold outfit, sheer head dupatta and white floral arches, but reduce jewellery further to simple earrings—no red lehenga swap, no crystal walima stage.`,
  },
  "walima-maxi": {
    intro: `Glamorous walima reception bride in a silver or champagne embellished maxi with net dupatta on a crystal-chandelier stage—white-silver florals, mirrored floor and soft glow.`,
    tips: [
      `Upload a clear waist-up photo; shiny source makeup is fine, but avoid heavy beauty filters that flatten skin before embellishment.`,
      `Leave clothing off so the embellished maxi, net dupatta and statement jewellery can apply.`,
      `If silver goes grey and dull, ask for glamorous champagne-silver embellishment with soft chandelier reflections on the fabric.`,
      `When the mirrored floor distorts feet or hem, prefer a stable waist-up crop and keep the mirror as soft stage gloss behind you.`,
    ],
    faqs: [
      {
        question: `Silver or champagne—which gown appears?`,
        answer: `Either silver or champagne embellishment fits this walima maxi; name one if you need a single clear finish.`,
      },
      {
        question: `Is this the same as a white western gown?`,
        answer: `No. This is an embellished walima maxi with net dupatta on a crystal reception stage, not a modest lace church-hall gown.`,
      },
      {
        question: `Will statement jewellery change my face shape?`,
        answer: `It should not. Face and skin tone stay; if earrings get oversized, ask for elegant statement pieces that do not cover the jawline.`,
      },
      {
        question: `Do I need a stage photo already?`,
        answer: `No. The chandelier walima stage with white-silver florals is created around your portrait.`,
      },
    ],
    addonLine: `Want a softer reception sparkle? Add: keep the champagne-silver maxi, net dupatta and chandelier stage, but lower crystal flare near the face—no mustard mehndi gharara, no ivory nikah arch swap.`,
  },
  "mehndi-outfit": {
    intro: `Vibrant mehndi-night bride in mustard-and-green gota gharara with floral jewellery and a leheriya dupatta, set among marigold garlands, string lights and a floral swing.`,
    tips: [
      `Use a clear waist-up photo with even light so mustard-green colour and fresh floral jewellery stay vivid without muddying skin.`,
      `Leave clothing and pose off for the gharara, floral jewellery and marigold mehndi setting to appear.`,
      `If marigolds look plastic, ask for fresh marigold garlands, brass lanterns and colourful floor cushions around a floral swing.`,
      `When the look turns red-bridal, restate mustard and green gota gharara with leheriya dupatta—not a crimson lehenga.`,
    ],
    faqs: [
      {
        question: `Is this for the wedding day or mehndi?`,
        answer: `Mehndi night—mustard and green gharara, floral jewellery and a marigold string-light setting.`,
      },
      {
        question: `Will my real mehndi stains show?`,
        answer: `Only if they are visible in the source and not covered by sleeves or crop. The prompt focuses on outfit and scene; it does not invent full fresh mehndi by default.`,
      },
      {
        question: `Can I keep my own jewellery?`,
        answer: `Preserve clothing/accessories if your tool allows; otherwise fresh floral jewellery is part of this mehndi change.`,
      },
      {
        question: `Why do colours look neon?`,
        answer: `Ask for vibrant but natural mustard and green fabrics under warm string lights, not oversaturated party filters.`,
      },
    ],
    addonLine: `Want a livelier mehndi swing moment? Add: keep the mustard-green gharara, floral jewellery and marigold setting, but seat you lightly on the floral swing—no red zardozi palace bridal, no silver walima maxi.`,
  },
  "mehndi-groom-kurta": {
    intro: `Festive mehndi groom in a mustard or green silk kurta with printed waistcoat and fresh floral mala, on the same marigold, lantern and floral-swing night setting as the bride’s mehndi look.`,
    tips: [
      `Upload one clear waist-up photo of an adult man; beard and glasses stay if present in the source.`,
      `Leave clothing off for the silk mehndi kurta, printed waistcoat and floral mala to replace the everyday outfit.`,
      `If the mala looks like plastic beads, ask for a fresh floral mala that sits naturally on the chest.`,
      `When the backdrop mismatches a bride’s mehndi edit, keep marigold garlands, string lights, brass lanterns and the floral swing for a coordinated pair.`,
    ],
    faqs: [
      {
        question: `Mustard or green kurta—which one?`,
        answer: `Either mustard or green silk works for this mehndi groom page; pick one to match your partner’s outfit if you are coordinating.`,
      },
      {
        question: `Is this the same as the walima suit look?`,
        answer: `No. This is a festive mehndi kurta with waistcoat and floral mala under marigold lights, not a three-piece reception tuxedo.`,
      },
      {
        question: `Will my beard stay?`,
        answer: `Yes. Face, skin tone, hair and beard stay while kurta and setting change.`,
      },
      {
        question: `Do I need a mehndi venue photo?`,
        answer: `No. A normal portrait works; the colourful mehndi night set is built in the edit.`,
      },
    ],
    addonLine: `Want a coordinated mehndi-night groom frame? Add: keep the silk kurta, printed waistcoat and floral mala, but lean mustard or green to match your partner’s gharara—no ivory sherwani, no charcoal tuxedo.`,
  },
  "walima-groom-suit": {
    intro: `Polished walima groom in a charcoal or midnight-blue three-piece suit or tuxedo with pocket square and tie, on a crystal-chandelier reception stage with white-silver florals.`,
    tips: [
      `Use a clear waist-up photo of an adult man; a tidy collar area in the source helps the suit lapels map cleanly.`,
      `Leave clothing off so the three-piece suit or tuxedo, pocket square and bow tie or silk tie can apply.`,
      `If the suit goes pure black and flat, ask for charcoal or midnight-blue fabric with soft chandelier light on the lapels.`,
      `When pairing with a walima maxi bride, keep the same crystal stage language so both frames feel like one reception.`,
    ],
    faqs: [
      {
        question: `Charcoal or midnight blue—which suit?`,
        answer: `Either charcoal or midnight-blue three-piece or tuxedo styling fits; name one if you need a single clear colour.`,
      },
      {
        question: `Bow tie or silk tie?`,
        answer: `Both are valid on this page; specify one in an optional line if the result mixes them.`,
      },
      {
        question: `Is this for baraat?`,
        answer: `No. This is a glamorous walima reception suit on a crystal stage, not a traditional sherwani baraat look.`,
      },
      {
        question: `Will glasses stay?`,
        answer: `Yes if worn in the source; face, skin tone, hair and beard stay as well.`,
      },
    ],
    addonLine: `Want a sharper reception finish? Add: keep the three-piece suit or tuxedo, pocket square and chandelier stage, but add a crisp white pocket-square fold—no marigold mehndi mala, no ivory baraat sherwani.`,
  },
  "white-wedding-gown": {
    intro: `Modest long-sleeve lace white wedding gown with a tulle veil and rose bouquet in a sunlit arched hall—sheer drapes, white florals and polished marble, no religious symbols.`,
    tips: [
      `Upload a clear waist-up photo of an adult woman; even light helps lace sleeves and veil edges stay detailed.`,
      `Leave clothing and pose off for the long-sleeve lace gown, tulle veil and rose bouquet to appear.`,
      `If the gown becomes strapless, restate a modest long-sleeve lace gown and tulle veil explicitly.`,
      `When symbols appear in the hall, ask for a neutral grand hall with arched windows only—no religious iconography.`,
    ],
    faqs: [
      {
        question: `Is the gown modest by default?`,
        answer: `Yes. The default is a long-sleeve lace gown with a tulle veil, not a strapless fashion gown.`,
      },
      {
        question: `Will a head covering stay?`,
        answer: `Hair and head covering from the source stay; the veil layers with that identity rather than erasing it.`,
      },
      {
        question: `Do I need a hall photo?`,
        answer: `No. A normal waist-up portrait works; the sunlit arched hall is created in the edit.`,
      },
      {
        question: `Why did a church cross appear?`,
        answer: `Ask again for a neutral grand hall with arched windows and white florals only, with no religious symbols.`,
      },
    ],
    addonLine: `Want a softer aisle-light glow? Add: keep the long-sleeve lace gown, tulle veil and rose bouquet, but warm the sunlit arches slightly—no red lehenga swap, no crystal walima maxi stage.`,
  },
  "royal-blue-rose-storyboard": {
    intro: `Four-panel royal blue saree storyboard in a heritage sandstone courtyard: carved arches, deep crimson roses and warm golden skin tones across a clean two-by-two editorial grid.`,
    tips: [
      `Use one clear portrait with a visible face; every panel must keep the same identity, so start with a sharp, unfiltered source.`,
      `Leave clothing off so the royal blue saree can appear consistently across all four panels.`,
      `If panels show different people, restate identical face, hairstyle and skin tone in every tile of the two-by-two grid.`,
      `When roses overpower the saree, ask for deep crimson roses as accents against rich royal blue and soft sandstone neutrals.`,
    ],
    faqs: [
      {
        question: `Is this one photo or four?`,
        answer: `One cohesive four-image collage in a two-by-two grid, all from your single upload, with thin divider lines.`,
      },
      {
        question: `Do I need a saree photo already?`,
        answer: `No. A clear portrait works; the royal blue saree and heritage courtyard are built across the panels.`,
      },
      {
        question: `Why did my face change between panels?`,
        answer: `Ask for consistent identity, hairstyle and facial features in every panel with no beautifying drift.`,
      },
      {
        question: `Can I make it a single portrait instead?`,
        answer: `This page is the multi-panel courtyard storyboard. For a single frame, use a different saree or portrait style.`,
      },
    ],
    addonLine: `Want a cleaner courtyard storyboard? Add: keep the royal blue saree, crimson roses and four-panel grid, but thin the divider lines slightly—no single-frame crop, no modern city backdrop.`,
  },
  "golden-flora-triptych": {
    intro: `Three-panel floral fashion collage from one selfie: golden-hour skin, garden greenery bokeh and elegant warm tones split by thin light separator lines across diagonal crops.`,
    tips: [
      `Upload one clear portrait; the triptych reuses your face in three photographic crops, so blur or filters hurt every panel.`,
      `Leave clothing off if you want the floral fashion outfit and jewellery changes across the collage.`,
      `If separator lines look thick or dark, ask for very thin, clean light-coloured lines between the three wide diagonal sections.`,
      `When flowers differ wildly between panels, ask for cohesive garden florals and the same warm golden-hour grade throughout.`,
    ],
    faqs: [
      {
        question: `How many panels does this create?`,
        answer: `Three wide diagonal panels of the same subject in one editorial collage.`,
      },
      {
        question: `Do I need multiple photos?`,
        answer: `No. One clear portrait is enough; the triptych crops and restyles that single source.`,
      },
      {
        question: `Will jewellery stay consistent?`,
        answer: `Fine jewellery can vary between runs; ask for the same delicate pieces across all three panels if matching matters.`,
      },
      {
        question: `Why does one panel look cooler in colour?`,
        answer: `Ask for one warm golden-hour romantic grade across every panel with creamy highlights and elegant warm tones.`,
      },
    ],
    addonLine: `Want a softer golden triptych? Add: keep the three-panel floral collage and warm garden bokeh, but lower contrast slightly on the side panels—no four-panel grid, no heritage blue saree storyboard swap.`,
  },
  "intimate-cinematic-portrait": {
    intro: `Quiet indie-film seated portrait: muted espresso, charcoal and warm amber grade beside a textured window in a dim studio, with relaxed dark layers over a light shirt and your real face.`,
    tips: [
      `Use a clear portrait that can crop to a seated three-quarter; faces hidden by hands in the source can confuse the reflective hand-near-face pose.`,
      `Leave clothing off for relaxed dark layers over a simple light shirt; preserve clothes only to keep your real wardrobe.`,
      `If window light feels flashy, ask for filtered side light, gentle film grain and a quiet indie-film atmosphere.`,
      `When skin goes orange, ask for muted espresso-charcoal-amber grading that keeps natural skin texture.`,
    ],
    faqs: [
      {
        question: `Is this a brightly lit studio beauty shot?`,
        answer: `No. It is a dim artist-studio or reading-room portrait with soft window side light and muted cinematic colour.`,
      },
      {
        question: `Will my pose stay exactly the same?`,
        answer: `Not necessarily. The look favours a calm seated frame with a reflective hand near the face when pose is not preserved.`,
      },
      {
        question: `Do I need a window photo already?`,
        answer: `No. A clear portrait works; the textured window and quiet room are built in the edit.`,
      },
      {
        question: `Why do hands look wrong?`,
        answer: `Ask for realistic hands resting near the face without covering both eyes, and keep face and hands crisp.`,
      },
    ],
    addonLine: `Want an even quieter reading-room mood? Add: keep the seated indie-film pose, dark layers and textured window light, but soften the amber grade slightly—no fantasy props, no multi-panel collage.`,
  },
  "stylish-ai-photo-prompt-for-boys-daylight-street": {
    intro: `Daylight street portrait for boys: fitted casual-smart shirt, clean sneakers, soft sun on a bright sidewalk with cream shopfronts. Upload one clear waist-up or full-length photo.`,
    tips: [
      `Use a sharp waist-up or full-length shot so the fitted shirt and sneakers can read clearly once clothing is restyled.`,
      `Ask to keep exact skin tone under soft sun—daylight grades often lighten faces.`,
      `If the sidewalk looks empty or fake, ask for cream shopfronts, trees, and gentle background blur only.`,
      `Turn clothing on only if you must keep what you wore; otherwise let the casual-smart street outfit build.`,
    ],
    faqs: [
      {
        question: `Do I need a photo already taken on a street?`,
        answer: `No. A clear indoor or outdoor portrait works; the prompt builds the bright sidewalk and soft sun when pose is not preserved.`,
      },
      {
        question: `Will my sneakers stay the same?`,
        answer: `Only if you preserve clothing. Otherwise it restyles into clean plain sneakers with a fitted casual-smart shirt.`,
      },
      {
        question: `Is this a night city look?`,
        answer: `No—this is soft daylight with cream shopfronts. Use the black-suit night street style for lit evening fashion.`,
      },
      {
        question: `Can girls use this page?`,
        answer: `This page is tuned for boys. Prefer the stylish girl daylight street page for a modest plaza look.`,
      },
    ],
    addonLine: `Want a quieter sidewalk stroll? Add: keep the fitted shirt, clean sneakers, and soft-sun street backdrop, but ease the brightness on the pavement and use a calmer walk pose—no neon signs or night filters.`,
  },
  "aesthetic-soft-light-ai-photo-prompt-for-boys": {
    intro: `Muted-colour balcony portrait for boys: sheer curtain, beige walls, soft window light, calm Instagram-ready pose. Use one clear chest-up or waist-up photo.`,
    tips: [
      `Chest-up or waist-up frames hold the soft window light better than tiny distant faces.`,
      `Ask for muted beige walls and a soft sheer curtain—avoid neon café props creeping in.`,
      `If skin goes orange, request warm aesthetic grade that keeps exact skin tone.`,
      `Keep pose off for the calm balcony stance; turn clothing on only to keep your real outfit.`,
    ],
    faqs: [
      {
        question: `Must my photo already show a balcony?`,
        answer: `No. A clear portrait is enough; the prompt adds the quiet balcony and sheer curtain when pose is not locked.`,
      },
      {
        question: `Is this a cafe mirror selfie?`,
        answer: `No—this is soft balcony window light. Use the modern cafe mirror selfie page for arched-mirror interiors.`,
      },
      {
        question: `Will my hair change?`,
        answer: `Hairstyle and beard stay; only light, backdrop, and styling shift unless you change preservation settings.`,
      },
      {
        question: `Why does the curtain look plastic?`,
        answer: `Ask for a soft sheer curtain with natural folds and gentle window light, not a hard white sheet.`,
      },
    ],
    addonLine: `Want a quieter balcony mood? Add: keep the sheer curtain, muted beige walls, and soft window light, but lower contrast slightly and use a softer glance—no fairy lights or café furniture.`,
  },
  "modern-cafe-mirror-selfie-ai-photo-prompt-for-boys": {
    intro: `Modern cafe mirror selfie for boys: arched mirror, warm wood, plants, soft window daylight, natural colour. Upload one clear photo with the face fully visible.`,
    tips: [
      `Face must be fully visible and sharp—mirror selfies fail when eyes or jaw are cut off.`,
      `Ask for an arched mirror with warm wood and plants, not a gym locker wall.`,
      `Phone in frame is optional; say so if you want hands empty and no device reflection.`,
      `Keep exact skin tone under the natural colour grade—cafe warmth can orange the face.`,
    ],
    faqs: [
      {
        question: `Do I need a real cafe photo?`,
        answer: `No. Any clear face-forward portrait works; the modern cafe interior builds when pose is not preserved.`,
      },
      {
        question: `Must the phone stay in the shot?`,
        answer: `Optional. Ask for phone-in-frame or a clean mirror pose with empty hands.`,
      },
      {
        question: `Is this the balcony soft-light look?`,
        answer: `No—balcony soft-light uses sheer curtains; this is a cafe arched-mirror selfie.`,
      },
      {
        question: `Outfit too dressy?`,
        answer: `Ask for casual-smart cafe styling while locking face, skin tone, and hairstyle.`,
      },
    ],
    addonLine: `Want a cleaner cafe mirror frame? Add: keep the arched mirror, warm wood, and soft daylight, but hide the phone and keep hands relaxed—no neon menus or crowded tables behind you.`,
  },
  "stylish-boy-outdoor-stairs-ai-photo-prompt": {
    intro: `Outfit-forward outdoor stairs portrait for boys beside a colourful mural wall in late-afternoon light—DP-ready crop. Use one clear full-length or waist-up standing photo.`,
    tips: [
      `Standing full-length or waist-up sources show the outfit-forward stairs pose better than tight selfies.`,
      `Ask for concrete stairs beside a colourful abstract mural with soft late-afternoon light.`,
      `If the mural turns into logos, request abstract colour blocks with no readable brand text.`,
      `Keep exact face and skin tone—golden evening grades often lighten complexions.`,
    ],
    faqs: [
      {
        question: `Do I need stairs in my original photo?`,
        answer: `No. A clear standing portrait is enough; the stairs and mural build when pose is not preserved.`,
      },
      {
        question: `Is this a rooftop blazer look?`,
        answer: `No—rooftop blazer is golden-hour terrace fashion. This is outdoor stairs with a mural wall.`,
      },
      {
        question: `Will clothing stay mine?`,
        answer: `Only if clothing preservation is on. Otherwise it restyles into an outfit-forward casual look.`,
      },
      {
        question: `Crop too wide for a DP?`,
        answer: `Ask for an Instagram-ready crop that keeps face sharp and stairs readable.`,
      },
    ],
    addonLine: `Want a quieter mural stairs frame? Add: keep the outdoor stairs, colourful mural, and outfit-forward stance, but soften late-afternoon contrast and calm the pose—no skateboard props or night neon.`,
  },
  "free-stylish-editor-portrait-ai-photo-prompt": {
    intro: `Simple polished editor portrait for boys: smart casual shirt, soft beige studio backdrop, warm natural neutral light. Upload one clear chest-up photo.`,
    tips: [
      `Chest-up sharpness matters more than background—studio looks amplify soft faces.`,
      `Ask for a soft beige studio backdrop and soft studio light, not a busy room.`,
      `Keep exact skin tone and beard; polished grades often smooth faces too far.`,
      `Turn clothing on only to keep your real shirt; otherwise accept the smart casual restyle.`,
    ],
    faqs: [
      {
        question: `Is this a LinkedIn headshot?`,
        answer: `It is a polished stylish portrait, not a CV crop. For fashion suit studio looks, use the men suit photoshoot page.`,
      },
      {
        question: `Street or cafe instead?`,
        answer: `This stays on a soft beige studio backdrop. Use daylight street or cafe mirror pages for location looks.`,
      },
      {
        question: `Must I wear a shirt already?`,
        answer: `No if clothing is off; the prompt can restyle into a smart casual shirt while locking your face.`,
      },
      {
        question: `Why does skin look plastic?`,
        answer: `Ask for natural skin texture with soft studio light—no heavy beauty smoothing.`,
      },
    ],
    addonLine: `Want an even cleaner editor finish? Add: keep the smart casual shirt and soft beige studio backdrop, but lower contrast slightly and keep natural skin texture—no glitter overlays or dramatic rim light.`,
  },
  "stylish-ai-photo-prompt-for-men-rooftop-blazer": {
    intro: `Golden-hour rooftop lifestyle for men: open blazer on a city terrace with soft skyline bokeh—fashion framing, not a LinkedIn headshot. Use one clear waist-up photo.`,
    tips: [
      `Waist-up sharpness lets the open blazer and terrace ledge read without looking like a CV crop.`,
      `Ask for golden-hour skyline bokeh and a low concrete ledge, not indoor office blinds.`,
      `Keep exact skin tone under luminous warmth—golden hour often lightens faces.`,
      `Say relaxed fashion pose, not stiff passport stance.`,
    ],
    faqs: [
      {
        question: `Is this for a CV photo?`,
        answer: `No—this is lifestyle fashion on a rooftop. Use a plain studio or editor portrait if you need a formal headshot crop.`,
      },
      {
        question: `Night black-suit street instead?`,
        answer: `That page is full-body black suit on a lit night street. This is open blazer at golden hour on a rooftop.`,
      },
      {
        question: `Do I need a rooftop selfie already?`,
        answer: `No. A clear waist-up portrait works; the terrace and skyline bokeh build when pose is not locked.`,
      },
      {
        question: `Blazer too tight or shiny?`,
        answer: `Ask for a natural open blazer drape with realistic fabric texture and exact face lock.`,
      },
    ],
    addonLine: `Want a quieter rooftop glow? Add: keep the open blazer, terrace ledge, and golden-hour skyline bokeh, but soften the sun rim and use a calmer stance—no sunglasses stack or champagne props.`,
  },
  "black-suit-city-night-ai-photo-prompt-for-men": {
    intro: `Full-body tailored black suit on a lit city street at night—shop-window glow, wet pavement reflections, fashion framing. Upload one clear full-length or waist-up standing photo.`,
    tips: [
      `Standing full-length sources show the tailored black suit better than tight selfies.`,
      `Ask for wet pavement reflections and soft bokeh lights, not dry daytime sidewalks.`,
      `Keep exact skin tone under warm cinematic night—street lamps often orange the face.`,
      `Say fashion full-length pose, not a LinkedIn head-and-shoulders crop.`,
    ],
    faqs: [
      {
        question: `Hotel lobby black suit instead?`,
        answer: `Lobby luxury uses marble floors and chandelier glow. This is a lit night street with wet pavement.`,
      },
      {
        question: `Must my photo be taken at night?`,
        answer: `No. Even daylight source photos work; the prompt builds night street light when pose is not preserved.`,
      },
      {
        question: `Can I keep my own suit?`,
        answer: `Turn clothing preservation on. Otherwise it restyles into a tailored black suit look.`,
      },
      {
        question: `Why do lights look like stickers?`,
        answer: `Ask for soft shop-window glow and wet pavement reflections with natural bokeh, not floating orbs on the jacket.`,
      },
    ],
    addonLine: `Want a quieter night-street suit? Add: keep the tailored black suit, lit street, and wet pavement bokeh, but soften shop-window glare and calm the stance—no umbrella props or rainstorm overlays.`,
  },
  "cool-editorial-low-angle-ai-photo-prompt-for-men": {
    intro: `Cool fashion editorial for men: slight low-angle stance against a tall textured concrete wall, layered outfit, no sunglasses. Use one clear waist-up photo.`,
    tips: [
      `Waist-up sharpness helps the low-angle editorial stance read against the concrete wall.`,
      `Ask for soft afternoon light and subtle shadow falloff—avoid harsh noon clip.`,
      `Say no sunglasses and no tough-guy attitude; keep a composed fashion expression.`,
      `Keep exact face shape—low angles can stretch the jaw if identity slips.`,
    ],
    faqs: [
      {
        question: `Is this the women’s outdoor editorial?`,
        answer: `No—this page is for men against a concrete wall. Women should use the cool women outdoor editorial page.`,
      },
      {
        question: `Sunglasses allowed?`,
        answer: `No. The look keeps eyes visible and skips attitude sunglasses.`,
      },
      {
        question: `Suit studio instead?`,
        answer: `Use the men suit photoshoot page for charcoal studio fashion lighting.`,
      },
      {
        question: `Wall looks too busy?`,
        answer: `Ask for a tall textured concrete wall with soft afternoon light and gentle shadow only.`,
      },
    ],
    addonLine: `Want a quieter concrete editorial? Add: keep the low-angle stance, layered outfit, and textured wall, but soften afternoon contrast and ease the camera height slightly—no sunglasses, bikes, or attitude props.`,
  },
  "men-suit-photoshoot-fashion-ai-photo-prompt": {
    intro: `Three-quarter suit photoshoot for men: tailored suit, soft charcoal fashion studio backdrop, gentle gradient and rim light—not a plain office crop. Upload one clear waist-up photo.`,
    tips: [
      `Waist-up three-quarter framing suits fashion studio light better than extreme close-ups.`,
      `Ask for a soft charcoal gradient backdrop with subtle rim light, not beige office walls.`,
      `Keep exact skin tone and beard under elegant warm editorial grade.`,
      `Say fashion photoshoot pose, not stiff LinkedIn shoulders-square.`,
    ],
    faqs: [
      {
        question: `Is this a black-suit night street look?`,
        answer: `No—this is fashion studio lighting on a charcoal backdrop. Night street is full-body on a lit city road.`,
      },
      {
        question: `Warm brown studio black suit?`,
        answer: `That is the men black suit three-quarter luxury page. This one uses a soft charcoal fashion studio.`,
      },
      {
        question: `Must I already wear a suit?`,
        answer: `No if clothing is off; the prompt restyles into a tailored suit while locking your face.`,
      },
      {
        question: `Background too flat?`,
        answer: `Ask for a gentle charcoal gradient with subtle rim light and clean negative space.`,
      },
    ],
    addonLine: `Want a softer studio suit finish? Add: keep the tailored suit, charcoal gradient backdrop, and three-quarter pose, but ease rim light and keep fabric matte—no lobby chandelier or night street reflections.`,
  },
  "stylish-girl-daylight-street": {
    intro: `Daylight plaza portrait for girls: modest casual-smart blouse or kurti with jeans, soft sun, cream shopfronts, family-safe neckline. Use one clear waist-up or full-length photo.`,
    tips: [
      `Waist-up or full-length sharpness helps the modest blouse or kurti read on the bright plaza.`,
      `Ask for soft sun and cream shopfront blur—avoid night neon or beach props.`,
      `Keep exact skin tone and any head covering under the soft warm natural grade.`,
      `If neckline drifts, ask for a family-safe modest neckline and sleeves.`,
    ],
    faqs: [
      {
        question: `Boys daylight street instead?`,
        answer: `Use the boys daylight street page for fitted shirt and sneakers. This page is modest styling for girls.`,
      },
      {
        question: `Do I need a street photo already?`,
        answer: `No. A clear portrait works; the bright plaza and soft sun build when pose is not preserved.`,
      },
      {
        question: `Can I keep my kurti?`,
        answer: `Turn clothing preservation on. Otherwise it restyles into a modest casual-smart blouse or kurti look.`,
      },
      {
        question: `Is this a cafe balcony?`,
        answer: `No—cafe balcony is railing and city blur. This is a daylight plaza sidewalk.`,
      },
    ],
    addonLine: `Want a quieter plaza stroll? Add: keep the modest blouse or kurti, soft sun, and cream shopfront sidewalk, but ease brightness and use a calmer walk—no crop tops, sunglasses stacks, or night filters.`,
  },
  "cool-women-outdoor-editorial": {
    intro: `Muted outdoor fashion editorial for women: calm composed stance against a plain concrete wall, modest layered outfit, no sunglasses or attitude props. Upload one clear waist-up photo.`,
    tips: [
      `Waist-up sharpness holds the muted editorial stance against the concrete wall.`,
      `Ask for muted daylight and gentle shadow—avoid neon streetwear grades.`,
      `Say no sunglasses, no car, bike, or rose props; keep a calm composed expression.`,
      `Keep exact skin tone and any head covering under the cool muted editorial mood.`,
    ],
    faqs: [
      {
        question: `Is this the men’s low-angle editorial?`,
        answer: `No—that page is for men. This is a muted outdoor editorial for women with a modest layered outfit.`,
      },
      {
        question: `Attitude or tough-girl pose?`,
        answer: `No. The look stays calm and composed without sunglasses or attitude props.`,
      },
      {
        question: `Daylight street plaza instead?`,
        answer: `Stylish girl daylight street uses a bright plaza. This is a plain concrete wall editorial.`,
      },
      {
        question: `Outfit too revealing?`,
        answer: `Ask for a modest layered outfit with family-safe neckline while locking your exact face.`,
      },
    ],
    addonLine: `Want a quieter wall editorial? Add: keep the plain concrete wall, modest layered outfit, and composed stance, but soften muted contrast slightly—no sunglasses, cars, bikes, or rose props.`,
  },
  "modern-girl-cafe-balcony": {
    intro: `Modern cafe or home balcony portrait for girls: soft daylight, railing, gentle city blur, modest contemporary outfit and calm pose. Use one clear waist-up photo.`,
    tips: [
      `Waist-up frames show the balcony railing and soft daylight without cutting the face.`,
      `Ask for modest neckline and sleeves with a calm modern pose—not mirror-phone clutter.`,
      `Keep exact skin tone and any head covering under soft warm natural light.`,
      `If the city blur gets busy, request gentle distant blur and a clean railing edge.`,
    ],
    faqs: [
      {
        question: `Is this a boys cafe mirror selfie?`,
        answer: `No—that is an arched-mirror cafe interior. This is a cafe or home balcony with railing and city blur.`,
      },
      {
        question: `Must my photo show a balcony already?`,
        answer: `No. A clear waist-up portrait works; the balcony and soft daylight build when pose is not locked.`,
      },
      {
        question: `Instagram DP crop instead?`,
        answer: `Use the stylish girl Instagram DP page for a square soft-window portrait.`,
      },
      {
        question: `Sleeves too short?`,
        answer: `Ask for modest contemporary sleeves and neckline while keeping your exact face and skin tone.`,
      },
    ],
    addonLine: `Want a quieter cafe balcony? Add: keep the railing, soft daylight, and modest contemporary outfit, but simplify city blur and use a calmer glance—no latte props covering the face or neon signs.`,
  },
  "stylish-girl-instagram-dp": {
    intro: `Polished Instagram DP for girls: soft window light, warm cream out-of-focus backdrop, modest blouse, square solo crop. Upload one clear chest-up photo—no second person.`,
    tips: [
      `Chest-up sharpness with the face large in frame works best for a square DP crop.`,
      `Ask for soft window light and warm cream blur—avoid busy rooms behind the head.`,
      `Solo only: say do not add a couple or second person if extras appear.`,
      `Keep exact skin tone and any head covering; polished DP grades often lighten faces.`,
    ],
    faqs: [
      {
        question: `Can I upload a couple photo?`,
        answer: `No—this is a solo DP. Use couple styles if you need two faces.`,
      },
      {
        question: `Close-up handsome boy DP?`,
        answer: `That is a separate boys close-up DP page. This one is a polished girl Instagram DP.`,
      },
      {
        question: `Must lighting already be window light?`,
        answer: `No. Even daylight sources work; the prompt builds soft window light when pose is not preserved.`,
      },
      {
        question: `Why is the crop too wide?`,
        answer: `Ask for a square Instagram DP crop with the face centred and chest-up framing.`,
      },
    ],
    addonLine: `Want a softer DP glow? Add: keep the modest blouse, soft window light, and warm cream backdrop, but lower contrast and keep natural skin texture—no stickers, text, or second person in frame.`,
  },
  "handsome-boy-close-up-dp-ai-photo-prompt": {
    intro: `Tight handsome close-up DP for boys: clean natural skin texture, simple polished collar, warm cream studio blur, square crop. Use one clear close-up or chest-up photo with a large sharp face.`,
    tips: [
      `Face should fill much of the frame; tiny distant faces lose identity in tight DP crops.`,
      `Ask for clean natural skin texture—not plastic beauty smoothing.`,
      `Keep exact hairstyle, beard, and skin tone under the warm natural neutral grade.`,
      `Request a simple polished collar and soft cream backdrop, not busy street props.`,
    ],
    faqs: [
      {
        question: `Girl Instagram DP instead?`,
        answer: `Use the stylish girl Instagram DP page. This page is a tight handsome close-up for boys.`,
      },
      {
        question: `Full-body street look?`,
        answer: `No—this is a square close-up DP. Use daylight street or stairs pages for outfit-forward full frames.`,
      },
      {
        question: `Will acne or texture disappear?`,
        answer: `Ask for clean natural skin texture that keeps likeness—avoid heavy beauty blur that changes the face.`,
      },
      {
        question: `Glasses removed?`,
        answer: `Glasses stay if worn in the source, unless you ask otherwise in preservation settings.`,
      },
    ],
    addonLine: `Want a quieter close-up DP? Add: keep the tight face crop, natural skin texture, and soft cream backdrop, but ease contrast and keep pores realistic—no glitter filters or oversized jewellery.`,
  },
  "urban-street-fashion-editorial": {
    intro: `High-fashion urban editorial for men: refined dark streetwear, subtle sunglasses, sharp subject with a moving blurred crowd in a dark luxury interior. Use a clear three-quarter portrait.`,
    tips: [
      `Three-quarter portraits with even facial light hold up better when crowd motion blur surrounds you.`,
      `Ask to keep exact face and natural skin texture—editorial contrast can crush detail.`,
      `If the crowd overtakes the frame, request a sharply focused subject with anonymous passersby only in soft lateral blur.`,
      `Sunglasses may hide eyes; say keep eye visibility if likeness slips.`,
    ],
    faqs: [
      {
        question: `Is this neon wet-street fashion?`,
        answer: `No—neon street fashion is pink-cyan rain pavement. This is deep charcoal urban interior with crowd motion blur.`,
      },
      {
        question: `Night crowd editorial instead?`,
        answer: `Dark crowd editorial uses a hooded jacket at blue hour outdoors. This is luxury urban interior streetwear.`,
      },
      {
        question: `Will my outfit stay?`,
        answer: `Follow clothing preservation. Off restyles into refined dark streetwear while locking your face.`,
      },
      {
        question: `Crowd blur looks fake?`,
        answer: `Ask for natural lateral motion blur on anonymous passersby with you kept sharp and centred.`,
      },
    ],
    addonLine: `Want a quieter urban editorial? Add: keep the dark streetwear, sharp subject, and blurred crowd mood, but soften amber highlights and ease crowd density—no logo-heavy jackets or flashy dance poses.`,
  },
  "neon-street-fashion-ai-photo-prompt": {
    intro: `Editorial streetwear stride on a rain-soaked night street: pink and cyan neon glow, wet pavement reflections, drifting steam. Upload one clear chest-up photo with the face fully visible.`,
    tips: [
      `Chest-up sharpness survives neon colour spill better than dim filtered selfies.`,
      `Ask for wet reflective pavement with pink-cyan glow—not dry daytime sidewalks.`,
      `Keep exact skin tone under neon; pink/cyan grades often tint faces unrealistically.`,
      `If steam swallows the jaw, ask for drifting steam in the background only.`,
    ],
    faqs: [
      {
        question: `Is this the Tokyo action kick scene?`,
        answer: `No—that freezes a mid-kick heroine. This is an editorial streetwear stride through neon rain.`,
      },
      {
        question: `Cyberpunk night market instead?`,
        answer: `Cyberpunk street market adds techwear and holographic stalls. This stays classic neon street fashion.`,
      },
      {
        question: `Must my photo be at night?`,
        answer: `No. Even daylight sources work; the prompt builds the rain-soaked neon street when pose is not locked.`,
      },
      {
        question: `Face too pink?`,
        answer: `Ask to keep exact skin tone with neon limited to signs and wet reflections, not heavy face cast.`,
      },
    ],
    addonLine: `Want a softer neon stride? Add: keep the layered streetwear, wet pavement, and pink-cyan neon street, but ease colour intensity on the face and calm the walk—no umbrella fights or billboard text.`,
  },
  "iceberg-runway-fashion-ai-photo-prompt": {
    intro: `Couture coat walk on a glossy white iceberg runway over still arctic water under an overcast sky. Use one clear chest-up photo with the face fully visible.`,
    tips: [
      `Sharp chest-up faces hold identity against icy silver-blue grades that can wash features out.`,
      `Ask for a glossy iceberg runway on still water with distant ice cliffs—not a snowy city street.`,
      `Keep exact skin tone in cold light; arctic grades often bleach complexions.`,
      `If the coat melts into white ice, request clear couture coat edges and realistic fabric weight.`,
    ],
    faqs: [
      {
        question: `Is this a normal city fashion walk?`,
        answer: `No—this is a floating iceberg runway on still arctic water with a couture coat.`,
      },
      {
        question: `Will I look pale or recolored?`,
        answer: `Ask to keep exact skin tone under icy silver-blue mood; cold grades should not bleach the face.`,
      },
      {
        question: `Must I wear a coat already?`,
        answer: `No if clothing is off; the prompt restyles into a couture coat while locking your face.`,
      },
      {
        question: `Water looks fake?`,
        answer: `Ask for still reflective arctic water and a believable overcast sky with distant ice cliffs.`,
      },
    ],
    addonLine: `Want a quieter arctic runway? Add: keep the couture coat, iceberg runway, and still arctic water, but soften wind in the hair and ease mist near the face—no polar animals or cruise-ship props.`,
  },
  "dark-crowd-editorial": {
    intro: `Night crowd editorial: you sharp in a distinctive hooded jacket while a dense city crowd blurs at blue hour—deep teal shadows, burnt-orange highlights. Use a clear three-quarter portrait facing the camera.`,
    tips: [
      `Face toward the camera with even exposure; crowd blur fails when the source face is dim.`,
      `Ask for strong motion blur on anonymous people while you stay sharply focused.`,
      `Keep exact facial features under teal-and-orange grade—no skin lightening.`,
      `If the hood shape drifts, request a realistic hooded jacket texture that still shows the face.`,
    ],
    faqs: [
      {
        question: `Urban luxury interior crowd?`,
        answer: `Urban street fashion editorial uses a dark luxury interior. This is outdoor blue-hour crowd with a hooded jacket.`,
      },
      {
        question: `Action heroine kick instead?`,
        answer: `That page freezes a mid-kick on rainy neon. This is a calm three-quarter crowd editorial.`,
      },
      {
        question: `Sunglasses required?`,
        answer: `No. Face stays readable toward the camera; hooded jacket is the fashion cue.`,
      },
      {
        question: `Crowd looks pasted on?`,
        answer: `Ask for natural motion blur on anonymous passersby with believable blue-hour depth.`,
      },
    ],
    addonLine: `Want a quieter blue-hour crowd? Add: keep the hooded jacket, sharp subject, and blurred night crowd, but soften burnt-orange highlights and ease crowd density—no neon fight action or logo walls.`,
  },
  "action-heroine-neon-street-fight-ai-photo-prompt": {
    intro: `Action-movie heroine frozen mid-kick on a rainy neon street—glowing abstract signs, puddles, steam, motion blur, movie-frame grade. Upload one clear chest-up photo with the face fully visible.`,
    tips: [
      `Sharp face sources survive motion blur and neon spill better than filtered selfies.`,
      `Ask for mid-kick action with rainy neon street puddles—not a standing fashion pose.`,
      `Keep exact skin tone and hairstyle; action grades often reshape faces.`,
      `Request abstract glowing signs only—no readable brand text on storefronts.`,
    ],
    faqs: [
      {
        question: `Is this neon streetwear fashion?`,
        answer: `Neon street fashion is an editorial stride. This freezes a heroine mid-kick like an action-movie frame.`,
      },
      {
        question: `Cyberpunk market dash?`,
        answer: `Cyberpunk street market is a rainy techwear run through stalls. This is a fight-action kick still.`,
      },
      {
        question: `Must I be athletic in the source?`,
        answer: `No. A clear chest-up portrait is enough; the mid-kick pose builds when pose is not preserved.`,
      },
      {
        question: `Face warped by motion?`,
        answer: `Ask to keep the face sharp and recognizable with blur limited to limbs, rain, and background.`,
      },
    ],
    addonLine: `Want a cleaner action still? Add: keep the mid-kick pose, rainy neon street, and movie-frame grade, but ease motion blur near the face and soften steam—no weapons close-ups or readable billboard text.`,
  },
  "cybernetic-warrior-gothic-cathedral-ai-photo-prompt": {
    intro: `Half-chrome cyborg warrior knee-deep in a flooded gothic cathedral—stained glass, broken pillars, cold steel mood with gold god rays. Use one clear chest-up photo with the face fully visible.`,
    tips: [
      `Face must stay fully visible; chrome armour should not cover eyes or reshape the jaw.`,
      `Ask for flooded cathedral water around the knees with stained-glass god rays through mist.`,
      `Keep exact skin tone on human face areas—cold steel grades often grey the complexion.`,
      `If armour swallows identity, request half-chrome plating that leaves the real face readable.`,
    ],
    faqs: [
      {
        question: `Is this a normal portrait style?`,
        answer: `No—this is cinematic sci-fi: half-chrome cyborg armour in a flooded gothic cathedral.`,
      },
      {
        question: `Cyberpunk hacker room instead?`,
        answer: `Hacker style uses monitor walls and code glow. This is cathedral armour with god rays.`,
      },
      {
        question: `Will my whole face become metal?`,
        answer: `Ask for half-chrome armour that preserves your exact face, skin tone, and hairstyle.`,
      },
      {
        question: `Water looks like fog only?`,
        answer: `Ask for knee-deep flood water with splashing stride and visible reflections under the stained glass.`,
      },
    ],
    addonLine: `Want a quieter cathedral sci-fi frame? Add: keep the half-chrome armour, flooded gothic hall, and gold god rays, but ease splash height and soften mist on the face—no extra creatures or floating UI text.`,
  },
  "pure-white-packshot": {
    intro: `Marketplace-ready white studio packshot: pure seamless infinity background, soft even light, honest product shape and colour. Upload one clear product photo with clean edges.`,
    tips: [
      `Fill the frame with the product; tiny items on busy tables invent extra props.`,
      `Ask to keep exact shape, materials, label text, and original colour—no recolouring.`,
      `Request a pure white seamless backdrop with a subtle contact shadow only.`,
      `Avoid hands or lifestyle props unless you specifically want them.`,
    ],
    faqs: [
      {
        question: `Is this a lifestyle desk scene?`,
        answer: `No—soft daylight lifestyle stages a sunlit desk. This is a pure white marketplace packshot.`,
      },
      {
        question: `Flat-lay overhead instead?`,
        answer: `Use the editorial flat-lay page for top-down compositions with paper-surface props.`,
      },
      {
        question: `Will packaging text stay readable?`,
        answer: `Ask to preserve exact labels and typography; packshots should not warp text.`,
      },
      {
        question: `Shadow too heavy?`,
        answer: `Ask for a subtle natural contact shadow directly beneath the product on white infinity.`,
      },
    ],
    addonLine: `Want a cleaner packshot finish? Add: keep the exact product shape, labels, and pure white seamless backdrop, but soften reflections slightly and keep a tiny natural contact shadow—no props, no textured table, no colour gels.`,
  },
  "soft-daylight-lifestyle": {
    intro: `Natural window-lit lifestyle product scene on a sunlit pale-oak desk with a softly blurred notebook, ceramic cup, and minimal greenery. Upload one clear product photo.`,
    tips: [
      `Keep the product large and sharp in the foreground; tiny heroes get lost among desk props.`,
      `Ask to preserve exact product colour, materials, and packaging details.`,
      `If the desk gets cluttered, request only a notebook, ceramic cup, and minimal greenery softly blurred.`,
      `Say product-only if hands start appearing.`,
    ],
    faqs: [
      {
        question: `White background packshot?`,
        answer: `Use the pure white packshot page for seamless marketplace cutouts. This is a window-lit desk lifestyle.`,
      },
      {
        question: `Overhead flat lay?`,
        answer: `Editorial flat-lay is top-down on textured paper. This is an angled daylight lifestyle desk.`,
      },
      {
        question: `Multiple products in one frame?`,
        answer: `One hero product per run holds shape and label detail better.`,
      },
      {
        question: `Label warped by soft light?`,
        answer: `Ask to keep packaging typography readable while using soft diffused window daylight.`,
      },
    ],
    addonLine: `Want a calmer window lifestyle? Add: keep the exact product and sunlit pale-oak desk mood, but simplify to one ceramic cup and soft greenery in the far blur—no festival décor or crowded stationery piles.`,
  },
  "editorial-flat-lay": {
    intro: `Premium overhead flat-lay of your product on warm light-beige textured paper with a closed cream notebook and graphite pencil at the edges. Upload one clear product photo.`,
    tips: [
      `Shoot or crop so the product is fully visible from above; side angles invent wrong silhouettes.`,
      `Ask to keep exact shape, materials, and colour as the largest central element.`,
      `Request restrained edge props only—cream notebook and pencil—not a crowded desk.`,
      `If props cover the product, demand generous negative space and asymmetrical spacing.`,
    ],
    faqs: [
      {
        question: `Is this a white packshot?`,
        answer: `No—packshot is seamless white infinity. This is an overhead editorial flat-lay on textured paper.`,
      },
      {
        question: `Window desk lifestyle instead?`,
        answer: `Soft daylight lifestyle stages a sunlit oak desk at an angle. Flat-lay is top-down.`,
      },
      {
        question: `Can I add many props?`,
        answer: `Keep props few and at the edges so the product stays the hero.`,
      },
      {
        question: `Product looks skewed?`,
        answer: `Ask for a true overhead camera view with undistorted proportions and readable labels.`,
      },
    ],
    addonLine: `Want a quieter flat-lay? Add: keep the exact product centred on the warm beige paper, but use only the cream notebook and pencil at the edges with more negative space—no coffee spills, flowers, or festival props.`,
  },
  "cyberpunk-hacker-ai-photo-prompt": {
    intro: `Cyberpunk hacker in a dark room lit by a curved wall of glowing monitors, tangled cables, and floating hologram code—green and cyan glow. Use one clear chest-up photo with the face fully visible.`,
    tips: [
      `Face must stay readable under monitor glow; dim selfies lose identity in green-cyan light.`,
      `Ask for abstract glowing code patterns—not readable passwords or real UI brands.`,
      `Keep exact skin tone; code glow often tints faces unnaturally green.`,
      `If LED visor glasses hide eyes too much, ask to keep eyes visible through the visor.`,
    ],
    faqs: [
      {
        question: `Is this the rainy cyberpunk market?`,
        answer: `No—street market is an outdoor neon alley run. This is an indoor monitor-wall hacker scene.`,
      },
      {
        question: `Cathedral cyborg warrior?`,
        answer: `That is flooded gothic armour. This is a dark room with glowing monitors and holograms.`,
      },
      {
        question: `Must I wear a visor already?`,
        answer: `No. The look can add LED visor glasses while locking your exact face and skin tone.`,
      },
      {
        question: `Text on screens looks like real brands?`,
        answer: `Ask for abstract glowing code patterns only—no readable logos or real app interfaces.`,
      },
    ],
    addonLine: `Want a quieter hacker den? Add: keep the monitor wall, dark room, and green-cyan code glow, but ease hologram density near the face and soften glare—no readable passwords or crowded server racks overlapping the subject.`,
  },
  "cyberpunk-street-market-ai-photo-prompt": {
    intro: `Rainy cyberpunk night market dash in techwear: holographic stall canopies, steam vents, teal-magenta neon, abstract signs. Upload one clear chest-up photo with the face fully visible.`,
    tips: [
      `Chest-up sharpness survives rain, steam, and neon better than beauty-filtered selfies.`,
      `Ask for running action through the market alley—not a static studio pose.`,
      `Keep exact skin tone under teal-magenta neon; dual neon often recolors faces.`,
      `Request abstract stall signs only—no readable shop names or real brands.`,
    ],
    faqs: [
      {
        question: `Indoor hacker monitors instead?`,
        answer: `Hacker style is a dark monitor room. This is an outdoor rainy neon night market run.`,
      },
      {
        question: `Classic neon street fashion?`,
        answer: `Neon street fashion is editorial streetwear stride. This adds techwear and holographic market stalls.`,
      },
      {
        question: `Action mid-kick fight?`,
        answer: `Woman Fighting in Tokyo freezes a kick. This is a dashing market run in techwear.`,
      },
      {
        question: `Face lost in rain?`,
        answer: `Ask to keep the face sharp and recognizable with rain and steam mostly in the background.`,
      },
    ],
    addonLine: `Want a softer market dash? Add: keep the techwear, rainy neon stalls, and steam vents, but ease rain streaks on the face and calm the sprint slightly—no readable billboards or crowded faces overlapping yours.`,
  },
  "black-suit-lobby-luxury-ai-photo-prompt-for-men": {
    intro: `Full-body tailored black suit in a warm lit hotel lobby—marble floors, soft chandelier glow, deep hallway perspective. Fashion lifestyle, not a LinkedIn crop. Use one clear full-length or waist-up standing photo.`,
    tips: [
      `Standing full-length sources show the lobby depth and tailored black suit better than tight selfies.`,
      `Ask for marble floors and chandelier warmth—not wet night pavement or charcoal studio paper.`,
      `Keep exact skin tone under warm cinematic night lobby light.`,
      `Say elevated lifestyle fashion pose, not a CV head-and-shoulders crop.`,
    ],
    faqs: [
      {
        question: `Night street black suit instead?`,
        answer: `Night street uses shop-window glow and wet pavement. This is a hotel lobby with marble and chandelier light.`,
      },
      {
        question: `Studio three-quarter black suit?`,
        answer: `That luxury page uses a warm soft-brown studio backdrop. This is full-body lobby architecture.`,
      },
      {
        question: `Must my photo be inside a hotel?`,
        answer: `No. A clear standing portrait works; the lobby builds when pose is not preserved.`,
      },
      {
        question: `Chandelier looks fake?`,
        answer: `Ask for soft chandelier glow with believable marble reflections and deep hallway perspective.`,
      },
    ],
    addonLine: `Want a quieter lobby luxury frame? Add: keep the tailored black suit, marble lobby, and chandelier glow, but soften hallway glare and calm the stance—no luggage piles, reception desks with logos, or night-street rain.`,
  },
  "men-black-suit-three-quarter-ai-photo-prompt": {
    intro: `Classic black suit three-quarter studio portrait for men: warm key fashion light on a soft-brown gradient backdrop—distinct from lobby or night-street suits. Upload one clear waist-up photo.`,
    tips: [
      `Waist-up three-quarter framing suits warm key light better than extreme close-ups.`,
      `Ask for a warm soft-brown studio gradient with clean negative space—not marble lobby halls.`,
      `Keep exact skin tone and beard under elegant warm editorial grade.`,
      `Say editorial expression, not stiff passport shoulders.`,
    ],
    faqs: [
      {
        question: `Charcoal fashion suit photoshoot?`,
        answer: `Men suit photoshoot uses a soft charcoal studio. This luxury page uses a warm soft-brown gradient.`,
      },
      {
        question: `Hotel lobby full-body?`,
        answer: `Lobby luxury is marble and chandelier full-body. This is a three-quarter studio portrait.`,
      },
      {
        question: `Do I need to wear a black suit already?`,
        answer: `No if clothing is off; the prompt restyles into a classic black suit while locking your face.`,
      },
      {
        question: `Background too orange?`,
        answer: `Ask for a warm soft-brown gradient with gentle falloff and clean negative space.`,
      },
    ],
    addonLine: `Want a softer brown-studio suit? Add: keep the classic black suit, warm key light, and soft-brown gradient backdrop, but ease rim intensity and keep fabric matte—no chandelier lobby or wet night street.`,
  },
  "luxury-lifestyle-balcony-ai-photo-prompt": {
    intro: `Solo evening balcony luxury lifestyle: elevated casual-luxury outfit, soft city bokeh lights, dark blue dusk sky, relaxed pose. Use one clear waist-up photo of one person.`,
    tips: [
      `Waist-up sharpness lets city bokeh stay secondary to your face and outfit.`,
      `Ask for evening balcony railing with soft city bokeh—not a hotel lobby interior.`,
      `Keep exact skin tone under warm golden evening light.`,
      `Solo only: say one person if extras appear in the bokeh.`,
    ],
    faqs: [
      {
        question: `Glass skyline balcony at dusk?`,
        answer: `Dubai-style skyline balcony emphasises modern glass towers at dusk. This is a general evening balcony with soft city bokeh.`,
      },
      {
        question: `Couple luxury walk?`,
        answer: `This page is solo. Use couple luxury styles if you need two faces.`,
      },
      {
        question: `Must I already be on a balcony?`,
        answer: `No. A clear waist-up portrait works; the evening balcony builds when pose is not locked.`,
      },
      {
        question: `Outfit too formal?`,
        answer: `Ask for elevated casual-luxury styling while keeping your exact face and skin tone.`,
      },
    ],
    addonLine: `Want a quieter dusk balcony? Add: keep the elevated casual-luxury outfit, evening balcony, and soft city bokeh, but ease light intensity and use a calmer lean on the railing—no champagne trays or named skyline landmarks.`,
  },
  "dubai-skyline-balcony-luxury-ai-photo-prompt": {
    intro: `High balcony overlooking a modern glass skyline at dusk—soft amber and blue city lights, elevated evening outfit, no named landmarks. Upload one clear waist-up photo of one person.`,
    tips: [
      `Waist-up framing keeps the glass skyline as ambience behind a sharp face.`,
      `Ask for a generic modern glass skyline only—no named towers, hotels, or brands.`,
      `Keep exact skin tone under warm golden dusk; city lights often orange the face.`,
      `If the skyline dominates, request softer distant lights and stronger subject focus.`,
    ],
    faqs: [
      {
        question: `General evening balcony lifestyle?`,
        answer: `Luxury lifestyle balcony is soft city bokeh at dusk. This one emphasises a modern glass skyline from a high balcony.`,
      },
      {
        question: `Will famous towers appear?`,
        answer: `No. The prompt uses a generic glass skyline only—do not name or depict specific landmarks.`,
      },
      {
        question: `Hotel lobby suit instead?`,
        answer: `Lobby luxury is indoor marble and chandelier. This is an outdoor high balcony at dusk.`,
      },
      {
        question: `Do I need a skyline photo already?`,
        answer: `No. A clear waist-up portrait works; the dusk glass skyline builds when pose is not preserved.`,
      },
    ],
    addonLine: `Want a quieter glass-skyline dusk? Add: keep the high balcony, modern glass skyline ambience, and elevated evening outfit, but soften amber city lights and calm the pose—no named landmarks, logos, or champagne props.`,
  },
};

