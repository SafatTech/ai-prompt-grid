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
  "snowy-valley-winter-ai-photo-prompt-boys": {
    intro: `Boy’s winter travel portrait in a plain puffer and wool beanie amid snow-covered pines and distant white peaks. Light falling snow, crisp blue sky, and a confident hands-in-pockets stance from one clear chest-up photo.`,
    tips: [
      `Use a sharp chest-up or waist-up photo in even daylight—group shots and heavy filters make the puffer edges smear.`,
      `If the jacket looks shiny or logo-heavy, ask for a plain matte puffer with a simple wool beanie and no brand marks.`,
      `When snow looks pasted on, ask for light natural snowfall and bright snow highlights that do not stick to eyelashes in clumps.`,
      `Keep clothing and pose off so the look can place you in the pine valley with hands in pockets while locking your face.`,
    ],
    faqs: [
      {
        question: `Do I need a photo already taken in the mountains?`,
        answer: `No. A clear indoor or outdoor portrait works; the prompt builds the snowy pine valley when pose is not preserved.`,
      },
      {
        question: `Will my own jacket stay?`,
        answer: `Only if you turn clothing preservation on. By default you get a plain puffer and beanie while your face stays exact.`,
      },
      {
        question: `Why does the snow look fake?`,
        answer: `Ask for light falling snow with soft depth, bright snow on the ground, and no glitter stuck to the face or jacket.`,
      },
      {
        question: `Can I use a full-body selfie?`,
        answer: `Chest-up or waist-up is safer. Very distant full-body shots make the face shrink against the peaks.`,
      },
    ],
    addonLine: `Want a slightly softer travel stare? Add: keep the plain puffer, beanie, and snowy pine valley, but ease the smile and keep hands lightly in the pockets—no ski gear, no crowded trek group.`,
  },
  "snowfall-chai-winter-ai-photo-prompt-boys": {
    intro: `Cozy hill-station roadside look: cable-knit sweater, wool shawl, and a steaming chai cup under warm stall bulbs at snowy dusk. Upload one clear chest-up photo of a boy or man.`,
    tips: [
      `Prefer a chest-up portrait with a readable face; sunglasses hide the warm chai-stall glow on the eyes.`,
      `If the chai cup melts into a blur, ask for a clear glass or kulhad with visible steam rising naturally.`,
      `Ask for cable-knit sweater texture and a draped wool shawl—avoid random parkas if the knit looks wrong.`,
      `Keep pose off so the stall-side hold can appear; turn clothing on only if you must keep your own layers.`,
    ],
    faqs: [
      {
        question: `Must I already be holding chai in the photo?`,
        answer: `No. A plain portrait is enough; the prompt adds the steaming cup and shawl when clothing and pose are not preserved.`,
      },
      {
        question: `Will the tea stall look like a café indoor?`,
        answer: `Ask for a small wooden hill-station roadside stall with warm hanging bulbs, pine trees, and cool snowy dusk behind.`,
      },
      {
        question: `Why is my face orange from the lights?`,
        answer: `Ask for warm amber stall glow balanced with cool blue snow so skin tone stays natural, not neon.`,
      },
      {
        question: `Can girls use this boy’s chai look?`,
        answer: `It is written for boys’ styling. For a balcony shawl-and-chai frame, use the girls’ shawl chai winter style instead.`,
      },
    ],
    addonLine: `Want a quieter dusk sip? Add: keep the sweater, shawl, steaming chai, and snowy roadside stall, but soften the bulb glow a little—no second cup, no crowded queue of strangers.`,
  },
  "night-snow-street-winter-ai-photo-prompt-men": {
    intro: `Moody night snowfall on a city street: dark jacket over turtleneck and scarf, soft streetlight bokeh, walking toward camera. Best from one clear waist-up photo of a man.`,
    tips: [
      `Upload a waist-up portrait with a sharp face; night selfies with neon filters fight the cinematic street grade.`,
      `If bokeh turns into coloured blobs on clothing, ask for soft warm streetlight circles only in the background.`,
      `Ask for a dark jacket over a turtleneck with a simple scarf—avoid bright sports logos.`,
      `Keep pose off for the walking-toward-camera stance; rerun if the face morphs under snowfall.`,
    ],
    faqs: [
      {
        question: `Do I need a night photo as the source?`,
        answer: `No. A clear daylight portrait works; the look builds the snowy night street and streetlight bokeh for you.`,
      },
      {
        question: `Will parked cars appear behind me?`,
        answer: `Often yes as soft snow-covered shapes. Ask to keep them softly blurred if they look sharp or branded.`,
      },
      {
        question: `Why does snowfall hide my eyes?`,
        answer: `Ask for gentle snowfall that stays mostly in the mid-ground, with sharp focus on the eyes and face.`,
      },
      {
        question: `Can I keep my own coat?`,
        answer: `Turn clothing preservation on. Otherwise the default restsyles into the dark jacket and turtleneck set.`,
      },
    ],
    addonLine: `Want a quieter night walk? Add: keep the dark jacket, turtleneck, scarf, and snowy night street, but reduce snow density near the face—no umbrellas, no busy crowd closing in.`,
  },
  "wooden-cabin-window-winter-ai-photo-prompt-boys": {
    intro: `Indoor winter calm: knit cardigan over a hoodie beside a frosted cabin window with snow falling outside and warm fairy lights. One clear chest-up photo is enough.`,
    tips: [
      `Use a chest-up selfie with even light; harsh bathroom flash fights the cozy pastel cabin mood.`,
      `If the window frost looks plastic, ask for a realistic frosted pane with soft snowfall visible outside.`,
      `Ask for a knit cardigan layered over a hoodie—avoid puffer jackets that break the indoor look.`,
      `Keep pose off so you can be seated by the window; preserve clothing only if you need your own layers.`,
    ],
    faqs: [
      {
        question: `Must my photo already show a cabin?`,
        answer: `No. Any clear portrait works; the prompt builds the wooden cabin interior and snowy window.`,
      },
      {
        question: `Will I look like I’m outside in the snow?`,
        answer: `This is an indoor look. You stay by the window with snow falling outside, not standing in a valley.`,
      },
      {
        question: `Why do fairy lights stick to my hair?`,
        answer: `Ask for warm fairy lights in the cabin background only, not wrapped around the head or face.`,
      },
      {
        question: `Is a blurry bedroom selfie okay?`,
        answer: `Avoid blur. Soft indoor light is fine, but the face must stay sharp for identity lock.`,
      },
    ],
    addonLine: `Want a quieter cabin corner? Add: keep the cardigan-over-hoodie, frosted window, and wooden cabin interior, but dim the fairy lights slightly—no outdoor trek gear, no second person in frame.`,
  },
  "pheran-snow-garden-winter-ai-photo-prompt-girls": {
    intro: `Graceful winter valley frame for girls: embroidered woolen pheran and soft scarf in a snowy Kashmir-style garden with bare chinar trees and misty peaks. Use one clear chest-up or waist-up photo.`,
    tips: [
      `Upload a sharp chest-up or waist-up photo; beauty filters flatten embroidery and skin texture.`,
      `If the pheran looks like a plain coat, ask for an embroidered woolen pheran with visible Kashmiri-style stitch detail.`,
      `Keep any head covering from your source—ask to preserve scarf or dupatta draping if it drifts.`,
      `When snow turns glittery, ask for gentle natural snowfall and soft misty mountains behind the wooden fence.`,
    ],
    faqs: [
      {
        question: `Do I need a photo from Kashmir already?`,
        answer: `No. A clear everyday portrait works; the look builds the snowy garden, chinar-style trees, and misty peaks.`,
      },
      {
        question: `Will my hijab or scarf stay?`,
        answer: `Head covering is meant to stay. If it changes, ask to keep your exact scarf or covering from the source.`,
      },
      {
        question: `Can I wear my own pheran?`,
        answer: `Turn clothing preservation on. By default the prompt dresses you in an embroidered woolen pheran while locking your face.`,
      },
      {
        question: `Why does embroidery look painted on?`,
        answer: `Ask for realistic wool fabric with fine embroidered motifs and soft winter pastel light—no flat stickers.`,
      },
    ],
    addonLine: `Want a softer garden glance? Add: keep the embroidered pheran, soft scarf, and snowy valley garden, but quiet the smile and ease snowfall near the lashes—no heavy jewellery sets, no tourist crowd.`,
  },
  "shawl-chai-winter-ai-photo-prompt-girls": {
    intro: `Wrapped in a soft wool shawl over a sweater, holding steaming chai on a wooden balcony above snowy pine hills. Gentle snowfall and warm cozy glow from one clear chest-up photo.`,
    tips: [
      `Use a chest-up portrait with a clear face; side profiles hide how the shawl frames the cheeks.`,
      `If steam vanishes, ask for a visible steaming cup of chai held naturally near the chest.`,
      `Ask for a soft woolen shawl draped over a sweater—avoid long camel coats that belong to the avenue look.`,
      `Keep pose off for the balcony hold; preserve clothing only when you must keep your own wrap.`,
    ],
    faqs: [
      {
        question: `Must I already be on a balcony?`,
        answer: `No. Indoor or outdoor portraits work; the prompt builds the wooden hill-station balcony and snowy pine view.`,
      },
      {
        question: `Will my hair colour change in the cold light?`,
        answer: `Ask to keep exact hair colour and skin tone with warm cozy glow balanced against cool snowy shadows.`,
      },
      {
        question: `Why does the chai cup look empty?`,
        answer: `Ask for a filled cup with gentle steam rising, held naturally—no oversized prop mugs covering the face.`,
      },
      {
        question: `Is this the same as the boys’ snowfall chai stall?`,
        answer: `No. This is a balcony shawl-and-chai frame for girls; the boys’ version uses a roadside tea stall and cable-knit sweater.`,
      },
    ],
    addonLine: `Want a calmer balcony sip? Add: keep the wool shawl, sweater, steaming chai, and snowy pine balcony, but soften amber highlights on the cheeks—no second mug, no crowded café tables.`,
  },
  "long-coat-snowfall-winter-ai-photo-prompt-girls": {
    intro: `Elegant long camel wool coat with knit muffler and gloves on a snowy tree-lined avenue—soft falling snow, silver-gray cinematic grade. Best from a waist-up or full-body photo of a girl or woman.`,
    tips: [
      `Prefer waist-up or full-body framing so the long coat length reads; tight selfies crop the hem awkwardly.`,
      `If the coat turns black or navy, ask for a camel wool long coat with a knit muffler and simple gloves.`,
      `When film grain gets muddy, ask for gentle grain with luminous highlights and deep romantic shadows—not heavy noise.`,
      `Keep pose off for the walking snowfall stance; turn clothing on only to keep your own coat.`,
    ],
    faqs: [
      {
        question: `Do I need a full-body photo?`,
        answer: `Waist-up works; full-body shows the coat length better. Very cropped headshots hide the muffler and gloves.`,
      },
      {
        question: `Will the look stay black-and-white?`,
        answer: `It leans soft cinematic monochrome with silver-gray midtones. Ask to keep natural warm skin if the face goes fully grey.`,
      },
      {
        question: `Why do gloves fuse with the coat sleeves?`,
        answer: `Ask for distinct knit gloves and clean coat cuffs with soft snowfall around the hands—not melted into fabric.`,
      },
      {
        question: `Can I keep trainers visible?`,
        answer: `Defaults focus on coat and muffler. If shoes appear oddly, ask for simple winter boots that match the avenue mood.`,
      },
    ],
    addonLine: `Want a quieter avenue walk? Add: keep the camel long coat, muffler, gloves, and snowy tree-lined avenue, but ease the walking pace and soften distant lamp bokeh—no umbrellas, no shopping bags.`,
  },
  "fairy-lights-sweater-winter-ai-photo-prompt-girls": {
    intro: `Dreamy night indoor winter close-up: oversized knit sweater, warm fairy lights, and a frosted window with snow outside. One clear chest-up selfie or portrait of a girl or woman works best.`,
    tips: [
      `Use a sharp chest-up selfie; heavy beauty filters fight natural skin texture under fairy-light glow.`,
      `If lights wrap around the neck, ask for warm fairy lights in the bedroom background only, not as a body garland.`,
      `Ask for an oversized knit sweater with visible ribbing—avoid formal coats that break the cozy night mood.`,
      `Keep pose off for the dreamy close framing; preserve clothing only if you want your own sweater.`,
    ],
    faqs: [
      {
        question: `Must my room already have fairy lights?`,
        answer: `No. A plain selfie works; the prompt builds the cozy bedroom corner, frosted window, and warm lights.`,
      },
      {
        question: `Will snow appear inside the room?`,
        answer: `Snow stays outside the frosted window. Ask to keep flakes outdoors if they start drifting indoors.`,
      },
      {
        question: `Why does my face look over-smoothed?`,
        answer: `Ask to keep natural skin texture with soft amber highlights and cool snowy window light—no beauty-filter skin.`,
      },
      {
        question: `Is a group selfie okay?`,
        answer: `Use one person only. Extra faces confuse the close dreamy crop.`,
      },
    ],
    addonLine: `Want a softer night glow? Add: keep the oversized knit sweater, frosted window, and fairy lights, but dim the amber highlights slightly—no string lights on the face, no outdoor street props.`,
  },
  "snowy-mountain-couple-winter-ai-photo-prompt": {
    intro: `Couple winter viewpoint: matching plain jackets and scarves side by side at a snowy hill-station railing with pine slopes and white peaks. Upload one photo where both faces are clear.`,
    tips: [
      `Use one couple photo with both faces sharp and similarly lit—uneven shade makes one partner drift.`,
      `If jackets mismatch wildly, ask for matching plain winter jackets and simple scarves with no loud logos.`,
      `Say who stands on the left and right if positions swap; keep relative heights honest.`,
      `Clothing preservation defaults on for this look—turn it off only if you want the matching jackets applied.`,
    ],
    faqs: [
      {
        question: `Can we upload two separate photos?`,
        answer: `This page expects one couple frame. For two selfies, use a merge winter couple style such as the snowfall pine-path look.`,
      },
      {
        question: `Will our own clothes stay?`,
        answer: `Clothing is preserved by default here. Turn preservation off if you want matching plain jackets and scarves.`,
      },
      {
        question: `Why does one face look younger?`,
        answer: `Ask to keep each exact age and skin tone, treat you as two separate people, and avoid beautify or de-age.`,
      },
      {
        question: `Do we need a railing already in the photo?`,
        answer: `No. The prompt builds the wooden viewpoint railing, pine slopes, and distant peaks when pose is not preserved.`,
      },
    ],
    addonLine: `Want a softer shared glance? Add: keep both exact faces, matching jackets, and the snowy mountain viewpoint, but quiet the smiles and lighten falling snow near the eyes—no ski poles, no third person in frame.`,
  },
  "shared-shawl-couple-winter-ai-photo-prompt-chai": {
    intro: `Cozy couple porch frame: one large wool shawl over sweaters, two steaming chai cups, lantern glow on a snow-covered cottage porch at dusk. Needs one couple photo with both faces clear.`,
    tips: [
      `Upload a couple photo standing or sitting close; large gaps make the shared shawl look stretched.`,
      `If cups multiply or vanish, ask for exactly two steaming chai cups held naturally.`,
      `Ask for one continuous large wool shawl wrapping both of you—not two separate throws.`,
      `Clothing stays on by default; turn it off only when you want the shared-shawl restyle.`,
    ],
    faqs: [
      {
        question: `Must we already share a shawl in the source?`,
        answer: `No. A normal couple portrait works; the prompt drapes one large shawl when clothing is not forced to stay.`,
      },
      {
        question: `Will chai splash on our clothes?`,
        answer: `Ask for steady cups with gentle steam only—no spilled tea or oversized props covering faces.`,
      },
      {
        question: `Why does the porch look like a city street?`,
        answer: `Ask for a snow-covered wooden cottage porch with pine trees, soft snowfall, and warm lantern light at dusk.`,
      },
      {
        question: `Can friends use this instead of a couple?`,
        answer: `It is styled as a couple chai porch. For friends or siblings on a trip, try the Hunza-style valley merge instead.`,
      },
    ],
    addonLine: `Want a quieter porch dusk? Add: keep both exact faces, the shared wool shawl, two chai cups, and snowy cottage porch, but soften the lantern glow—no third cup, no crowded dhaba benches.`,
  },
  "snowfall-merge-two-photos-winter-ai-prompt-couple": {
    intro: `Merge two separate photos into one couple walking hand in hand on a quiet snowy pine path in plain winter jackets. Upload person A first and person B second in one message.`,
    tips: [
      `Use two sharp single-person photos with similar daylight or similar indoor light—mixed neon vs daylight merges poorly.`,
      `Match chest-up framing and head angle when you can; extreme profile plus front face is harder to blend.`,
      `Name who is person A and person B if positions swap; ask to keep each exact skin tone and any head covering.`,
      `If hands look wrong while walking, ask for a natural hand-in-hand hold with five fingers each.`,
    ],
    faqs: [
      {
        question: `What order should I upload the photos?`,
        answer: `Put person A first and person B second in the same message so each face maps correctly.`,
      },
      {
        question: `Can I use one couple photo instead?`,
        answer: `This style is built for two separate uploads. For one couple frame, use the snowy mountain viewpoint couple look.`,
      },
      {
        question: `Why do our faces blend into one person?`,
        answer: `Ask to treat A and B as two separate people, keep each face exact, and avoid beauty morphing.`,
      },
      {
        question: `Will our original clothes stay?`,
        answer: `Clothing preservation is on by default. Turn it off if you want matching plain jackets and scarves on the pine path.`,
      },
    ],
    addonLine: `Want a calmer pine-path walk? Add: keep both exact faces from their source photos, plain jackets, and the snowy pine path, but ease snowfall near the eyes—no third walker, no busy ski resort signs.`,
  },
  "hunza-style-valley-merge-two-photos-winter-prompt": {
    intro: `Two friends or siblings merged into one winter trip photo in a snowy northern valley—frozen river, stone houses, bare poplars, towering peaks. Upload two separate photos: person A first, person B second.`,
    tips: [
      `Choose two clear single-person shots with similar light and similar head size in frame.`,
      `Ask for plain puffer jackets and wool caps if the travel layers look mismatched or logo-heavy.`,
      `If the river looks like a road, ask for a frozen river with stone houses and bare poplar trees under white peaks.`,
      `Keep each head covering and skin tone exact—say so if either drifts toward the other person.`,
    ],
    faqs: [
      {
        question: `Is this only for couples?`,
        answer: `No. It is written for friends or siblings on a winter trip, though any two people can merge.`,
      },
      {
        question: `Do we need real Hunza photos already?`,
        answer: `No. Everyday portraits work; the prompt builds the snowy valley, frozen river, and stone houses.`,
      },
      {
        question: `Why does one person look taller than in real life?`,
        answer: `Ask to keep relative heights honest and place both side by side at a natural travel distance.`,
      },
      {
        question: `Can we keep our own trip jackets?`,
        answer: `Clothing is preserved by default. Turn it off only if you want plain puffers and wool caps applied.`,
      },
    ],
    addonLine: `Want a softer valley travel pose? Add: keep both exact faces from their photos, puffers, wool caps, and the snowy northern valley, but quiet the smiles and soften peak haze—no crowded tourist group, no ski lift gear.`,
  },
  "foggy-road-hoodie-muffler-winter-ai-photo-prompt-boys": {
    intro: `Moody foggy-road winter walk for boys: light-grey hoodie under an olive jacket, dark knit muffler, misty asphalt lined with bare trees. One clear chest-up or waist-up photo is ideal.`,
    tips: [
      `Use a sharp waist-up portrait; heavy contrast filters clash with soft mist and distant headlights.`,
      `If the muffler covers the mouth oddly, ask for a dark knit muffler that leaves the face clear and natural.`,
      `Ask for a grey hoodie under an olive jacket—avoid black leather that belongs to the dhaba look.`,
      `Keep pose off for the walking-toward-camera stance; rerun if fog flattens facial detail.`,
    ],
    faqs: [
      {
        question: `Do I need a photo already on a foggy road?`,
        answer: `No. A clear everyday portrait works; the look builds the misty road, bare trees, and frost along the verges.`,
      },
      {
        question: `Will cars appear behind me?`,
        answer: `Distant headlights may show softly. Ask to keep them as soft bokeh if number plates or sharp vehicles appear.`,
      },
      {
        question: `Why does fog wash out my beard?`,
        answer: `Ask for soft mist in the background with sharp focus on the face, beard, and eyes.`,
      },
      {
        question: `Can I keep my own hoodie?`,
        answer: `Turn clothing preservation on. Otherwise the default restsyles into the grey hoodie, olive jacket, and muffler.`,
      },
    ],
    addonLine: `Want a quieter mist walk? Add: keep the grey hoodie, olive jacket, dark muffler, and foggy winter road, but reduce headlight glare behind—no umbrella, no busy traffic beside you.`,
  },
  "chai-dhaba-fog-leather-jacket-winter-ai-photo-prompt-men": {
    intro: `Foggy roadside dhaba mood for men: black leather jacket over a cream turtleneck, steaming glass of chai under warm hanging bulbs and cool winter mist. Upload one clear chest-up photo.`,
    tips: [
      `Prefer a chest-up shot with a readable face; sunglasses hide the warm bulb glow in the eyes.`,
      `If leather looks plastic, ask for realistic black leather texture over a cream turtleneck with natural folds.`,
      `Ask for a steaming glass of chai and a kettle or wooden bench cues—avoid snowy pine valleys that break the dhaba story.`,
      `Keep pose off so the stall-side hold can appear; preserve clothing only to keep your own jacket.`,
    ],
    faqs: [
      {
        question: `Must I already be at a dhaba?`,
        answer: `No. Any clear portrait works; the prompt builds the foggy roadside stall, hanging bulbs, and mist.`,
      },
      {
        question: `Will the jacket stay black?`,
        answer: `Ask for a black leather jacket over a cream turtleneck if the model drifts to brown or navy.`,
      },
      {
        question: `Why does chai look like coffee?`,
        answer: `Ask for a classic steaming glass of milky chai with visible steam—not a latte art cup.`,
      },
      {
        question: `Is this the same as snowfall chai for boys?`,
        answer: `No. That look uses a sweater, wool shawl, and snowy hill-station stall; this one is leather jacket and foggy dhaba.`,
      },
    ],
    addonLine: `Want a calmer dhaba sip? Add: keep the black leather jacket, cream turtleneck, steaming chai, and foggy roadside dhaba, but soften hanging-bulb intensity—no second glass, no crowded truck-stop queue.`,
  },
  "kurta-pashmina-shawl-snowy-pine-forest-winter-ai-photo-prompt-men": {
    intro: `Graceful snowy pine-forest portrait for men: charcoal kurta pajama with a tan pashmina shawl under soft falling snow. Best from a waist-up or full-body photo of a boy or man.`,
    tips: [
      `Use waist-up or full-body framing so the kurta length and shawl drape read clearly.`,
      `If the shawl turns into a Western scarf, ask for a tan pashmina draped over a charcoal kurta pajama.`,
      `When snow clumps on embroidery or fabric, ask for soft falling snow with sharp fabric texture still visible.`,
      `Keep clothing off for the kurta-pashmina restyle; turn it on only to keep your own outfit.`,
    ],
    faqs: [
      {
        question: `Do I need a forest photo already?`,
        answer: `No. A clear portrait works; the look builds the quiet snowy pine path with frosted branches and soft mist.`,
      },
      {
        question: `Will my beard style stay?`,
        answer: `Yes—face, beard, and skin tone are meant to stay. Ask again if the beard thins or reshapes.`,
      },
      {
        question: `Why does the kurta look like a shirt?`,
        answer: `Ask for a full charcoal kurta pajama with natural folds and a tan pashmina shawl draped across the shoulders.`,
      },
      {
        question: `Can I wear a coloured kurta instead?`,
        answer: `Defaults are charcoal with tan pashmina. A colour swap would change the outfit default, so keep charcoal unless you intentionally override.`,
      },
    ],
    addonLine: `Want a quieter forest pause? Add: keep the charcoal kurta, tan pashmina, and snowy pine path, but ease snowfall near the face and soften mist—no trek backpacks, no bright puffer jackets.`,
  },
  "pastel-coat-beanie-snowfall-winter-ai-photo-prompt-girls": {
    intro: `Cozy pastel snowfall look for girls: pastel pink wool coat, cream beanie and mittens catching soft flakes on a snowy tree path. Upload one clear chest-up or waist-up photo.`,
    tips: [
      `Use a sharp chest-up or waist-up portrait; heavy pink filters can oversaturate the coat colour.`,
      `If mittens vanish, ask for cream mittens catching snowfall with fingers natural and visible.`,
      `Ask for a pastel pink wool coat and cream beanie—avoid camel long coats that belong to the avenue elegance look.`,
      `Keep pose off for the catching-snowfall gesture; preserve clothing only to keep your own coat.`,
    ],
    faqs: [
      {
        question: `Must I already wear a pink coat?`,
        answer: `No. A plain portrait works; the prompt adds the pastel pink coat, cream beanie, and mittens.`,
      },
      {
        question: `Will my hijab stay under the beanie?`,
        answer: `Ask to keep your exact head covering. If a beanie appears over a hijab oddly, say to preserve the covering and skip the beanie.`,
      },
      {
        question: `Why does pink look neon?`,
        answer: `Ask for soft pastel pink wool with creamy whites and natural warm skin—no candy neon saturation.`,
      },
      {
        question: `Is this the same as the long camel coat avenue?`,
        answer: `No. That look is an elegant camel long coat with muffler; this one is pastel pink coat, beanie, and mittens.`,
      },
    ],
    addonLine: `Want a softer flake catch? Add: keep the pastel pink coat, cream beanie, mittens, and snowy tree path, but quiet the smile and lighten flake density near the eyes—no umbrellas, no busy shopping street props.`,
  },
  "cinematic-foggy-street-portrait-winter-ai-photo-prompt-women": {
    intro: `Cinematic foggy dusk street for women: dark grey wool wrap coat and light scarf, wet pavement, warm streetlights and soft red taillight bokeh. One clear waist-up photo works best.`,
    tips: [
      `Prefer a waist-up portrait with a sharp face; night club filters clash with cool cinematic dusk grade.`,
      `If taillights smear onto the coat, ask for soft red bokeh only in the distant background.`,
      `Ask for a dark grey wool wrap coat with a light scarf—avoid pastel pink coats from the snowfall path look.`,
      `Keep pose off for the three-quarter street portrait; preserve clothing only to keep your own wrap.`,
    ],
    faqs: [
      {
        question: `Do I need a night-time source photo?`,
        answer: `No. Daylight portraits work; the prompt builds foggy dusk, wet pavement, and warm streetlights.`,
      },
      {
        question: `Will the coat stay wrap-style?`,
        answer: `Ask for a dark grey wool wrap coat with a clean belt or fold if it turns into a plain blazer.`,
      },
      {
        question: `Why does fog hide my jawline?`,
        answer: `Ask for soft street fog behind you with sharp focus on the face and scarf edges.`,
      },
      {
        question: `Can men use this women’s street look?`,
        answer: `It is styled for women. For a men’s night snowfall street, use the night snow street winter prompt instead.`,
      },
    ],
    addonLine: `Want a quieter dusk stare? Add: keep the dark grey wrap coat, light scarf, and foggy city street at dusk, but soften taillight bokeh and ease wet-road reflections—no umbrella props, no crowded sidewalk extras.`,
  },
  "couple-foggy-road-walk-one-shawl-winter-ai-photo-prompt": {
    intro: `Merge two photos into one cozy couple walk: sharing one large shawl with coordinated winter coats on a foggy road lined with bare trees. Upload person A first, person B second.`,
    tips: [
      `Use two sharp single-person photos with similar light and similar chest-up framing.`,
      `Ask for one shared wool shawl wrapping both of you plus coordinated winter coats—not two unrelated jackets only.`,
      `If positions swap, name left and right; keep each exact face, skin tone, and head covering.`,
      `When hands look fused under the shawl, ask for a natural walking hold with clear shoulders.`,
    ],
    faqs: [
      {
        question: `What upload order should we use?`,
        answer: `Person A first, person B second in one message so each face maps to the correct partner.`,
      },
      {
        question: `Can we start from one couple photo?`,
        answer: `This style expects two separate uploads. For one couple frame with a shared shawl and chai, use the cottage-porch couple look.`,
      },
      {
        question: `Will our faces blend?`,
        answer: `Ask to keep person A’s face from photo 1 and person B’s from photo 2 as two separate people—no morphing.`,
      },
      {
        question: `Why does the road look snowy instead of foggy?`,
        answer: `Ask for foggy winter mist, bare trees, light frost on the verges, and soft distant headlights—not a full snow valley.`,
      },
    ],
    addonLine: `Want a softer foggy walk? Add: keep both exact faces from their photos, the shared shawl, coordinated coats, and foggy bare-tree road, but reduce distant headlight glare—no third walker, no beach or summer props.`,
  },
  "viral-snowflake-close-up-portrait-winter-ai-photo-prompt": {
    intro: `Viral winter close-up: cream ribbed turtleneck, sharp snowflakes in the hair, and large foreground snowflake bokeh on a soft snowy backdrop. One clear chest-up selfie or portrait is enough.`,
    tips: [
      `Use a sharp close chest-up selfie; wide full-body shots waste the snowflake bokeh crop.`,
      `If flakes look like white noise, ask for a few sharp snowflakes in the hair plus large soft foreground bokeh flakes.`,
      `Ask for a cream ribbed turtleneck—avoid heavy coats that hide the close neckline.`,
      `Keep pose off for the tight portrait crop; preserve clothing only to keep your own top.`,
    ],
    faqs: [
      {
        question: `Must snow already be in my photo?`,
        answer: `No. A clear indoor selfie works; the prompt adds snowflakes in the hair and soft snowy bokeh.`,
      },
      {
        question: `Will my skin tone stay natural?`,
        answer: `Ask for natural warm skin with soft winter pastel light—no bleaching or heavy pink filters on the face.`,
      },
      {
        question: `Why do snowflakes stick to my eyes?`,
        answer: `Ask for sharp flakes in the hair and large bokeh flakes in the foreground, not resting on eyelids.`,
      },
      {
        question: `Does this work for men and women?`,
        answer: `Yes. The cream turtleneck close-up is unisex; your face, hair or beard, and skin tone stay from the source.`,
      },
    ],
    addonLine: `Want a softer snowflake close-up? Add: keep the cream turtleneck, sharp hair snowflakes, and foreground bokeh, but ease flake density near the eyes—no full snowstorm wall, no outdoor trek backdrop.`,
  },
  "modern-saree-drape-outfit-change": {
    intro: `Outfit swap into a sleek sage-green georgette saree with a modern drape in a bright apartment and soft daylight. Upload one clear waist-up photo of an adult woman; face stays yours.`,
    tips: [
      `Use a sharp waist-up portrait facing front or slight three-quarter—blurry selfies smear the georgette pleats.`,
      `If the drape looks bridal-heavy, ask for a sleek modern sage georgette saree with a clean contemporary fall.`,
      `Keep jewellery light; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the outfit change can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face change with the saree?`,
        answer: `No. This is an outfit change—your face, skin tone, hair or head covering stay while only clothing updates.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the sage modern drape.`,
      },
      {
        question: `Why does the saree look stiff?`,
        answer: `Ask for soft georgette fabric with natural pleats and a sleek modern drape—not rigid costume folds.`,
      },
      {
        question: `Can I keep my glasses?`,
        answer: `Yes. Glasses are meant to stay if you wear them in the source photo.`,
      },
    ],
    addonLine: `Want a quieter modern drape? Add: keep the sage georgette saree, modern drape, and bright apartment daylight, but soften sheer-curtain glow and ease the smile—no heavy bridal jewellery, no stage backdrop.`,
  },
  "pastel-shalwar-kameez-outfit-change-women": {
    intro: `Outfit change into a powder-pink lawn shalwar kameez with chiffon dupatta in a modern garden under morning light. One clear waist-up photo of an adult woman keeps your real face.`,
    tips: [
      `Upload a sharp waist-up photo in even light; beauty filters flatten lawn embroidery and thread work.`,
      `If the dupatta vanishes, ask for a light chiffon dupatta draped naturally over the powder-pink kameez.`,
      `Ask for soft pastel pink lawn—not neon magenta or heavy bridal zari.`,
      `Keep clothing off for the outfit swap; preserve pose only if you must keep your exact stance.`,
    ],
    faqs: [
      {
        question: `Must I already wear shalwar kameez?`,
        answer: `No. Any clear waist-up photo works; the prompt changes only the outfit into the pastel suit.`,
      },
      {
        question: `Will my hijab stay?`,
        answer: `Hair and head covering are meant to stay. If the dupatta replaces a hijab wrongly, ask to keep your exact covering.`,
      },
      {
        question: `Why does pink look too bright?`,
        answer: `Ask for powder-pink lawn with soft pastel spring colour and natural skin—no candy saturation.`,
      },
      {
        question: `Is this a bridal look?`,
        answer: `No. It is a fresh everyday pastel shalwar kameez outfit change, not bridal wear.`,
      },
    ],
    addonLine: `Want a fresher garden finish? Add: keep the powder-pink lawn suit, chiffon dupatta, and modern garden path, but soften morning highlights on the fabric—no heavy bridal jewellery, no indoor studio sweep.`,
  },
  "party-lehenga-outfit-change": {
    intro: `Non-bridal party outfit swap: mint-and-silver sequin lehenga under warm string lights on an evening event lawn. Upload one clear waist-up photo of an adult woman; keep your real face.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo so lehenga detail can read without cropping oddly at the chest.`,
      `If it turns into a red bridal lehenga, ask for mint-and-silver sequin and mirror work—explicitly non-bridal.`,
      `Ask to keep jewellery elegant but light; remove heavy matha patti if a wedding set appears.`,
      `Leave clothing preservation off so the party lehenga can replace your current dress.`,
    ],
    faqs: [
      {
        question: `Is this a bridal lehenga prompt?`,
        answer: `No. It is a non-bridal party lehenga in mint and silver for evening events.`,
      },
      {
        question: `Will my face stay the same?`,
        answer: `Yes. Only the outfit changes; face, skin tone, and hair or head covering stay from your photo.`,
      },
      {
        question: `Do I need an event photo already?`,
        answer: `No. A plain indoor portrait works; the look builds the evening lawn and warm string lights.`,
      },
      {
        question: `Why do sequins look like white noise?`,
        answer: `Ask for realistic sequin and mirror work with soft string-light glow—not glitter sprayed on skin.`,
      },
    ],
    addonLine: `Want a softer evening glam? Add: keep the mint-and-silver party lehenga, sequin work, and string-lit event lawn, but ease sparkle intensity near the face—no bridal red, no stage smoke.`,
  },
  "blazer-power-suit-outfit-change-women": {
    intro: `Professional outfit change into an ivory double-breasted power suit with wide-leg trousers in a bright glass office. One clear waist-up photo of an adult woman locks your real face.`,
    tips: [
      `Use a sharp front or three-quarter waist-up photo; slumped casual crops make the blazer shoulders sag.`,
      `If the suit turns black or navy, ask for an ivory double-breasted power suit with clean wide-leg trousers.`,
      `Ask for a modern glass office with soft city-view bokeh and no readable signage.`,
      `Keep clothing preservation off for the outfit swap; turn it on only to keep your own clothes.`,
    ],
    faqs: [
      {
        question: `Will this change my face for LinkedIn?`,
        answer: `Your face stays exact. Only the outfit becomes the ivory power suit while identity is locked.`,
      },
      {
        question: `Must I already wear formal clothes?`,
        answer: `No. Casual source photos work; the prompt handles the outfit change into the suit.`,
      },
      {
        question: `Why does ivory look yellow?`,
        answer: `Ask for clean ivory fabric under soft daylight with natural skin highlights—not warm orange cast on the suit.`,
      },
      {
        question: `Can I keep my glasses?`,
        answer: `Yes. Glasses stay if they are in your source photo.`,
      },
    ],
    addonLine: `Want a calmer office polish? Add: keep the ivory power suit, wide-leg trousers, and bright glass office, but soften daylight on the lapels and ease the smile—no loud logos, no party sequins.`,
  },
  "modest-maxi-abaya-chic-outfit-change": {
    intro: `Modest outfit swap into a flowing taupe abaya-chic crepe maxi on a sunlit modern terrace with cream stone and olive pots. Upload one clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up portrait; extreme crops hide how the maxi falls from the shoulders.`,
      `If the dress looks tight or bodycon, ask for a flowing taupe crepe abaya-style maxi with modest coverage.`,
      `Keep your exact head covering—ask to preserve hijab or scarf if the model restyles hair.`,
      `Leave clothing off so the modest maxi can apply; avoid adding flashy party embellishment.`,
    ],
    faqs: [
      {
        question: `Is this only for abaya wearers?`,
        answer: `It is a modest abaya-chic maxi outfit change. Anyone wanting that flowing taupe look can use it.`,
      },
      {
        question: `Will my hijab stay?`,
        answer: `Head covering is meant to stay. If it changes, ask to keep your exact covering from the source.`,
      },
      {
        question: `Do I need a terrace photo already?`,
        answer: `No. A clear indoor portrait works; the prompt builds the modern terrace and soft golden-hour light.`,
      },
      {
        question: `Why does taupe look grey or brown wrong?`,
        answer: `Ask for warm taupe crepe with natural fabric folds under gentle sun—not cold grey or muddy brown.`,
      },
    ],
    addonLine: `Want a softer terrace breeze? Add: keep the taupe abaya-chic maxi, flowing crepe, and modern terrace light, but ease golden-hour intensity on the fabric—no heavy embroidery panels, no crowded café tables.`,
  },
  "black-shalwar-kameez-outfit-change-men": {
    intro: `Men’s outfit change into a tailored jet-black shalwar kameez with band collar in a modern courtyard under golden-hour light. One clear waist-up photo of an adult man keeps your real face.`,
    tips: [
      `Upload a sharp waist-up photo; side selfies with deep shadow make black fabric lose shape.`,
      `If it turns into a Western suit, ask for a jet-black shalwar kameez with a clean band collar.`,
      `Ask for warm cinematic contrast on cream stone and soft greenery—no beach or snow backdrops.`,
      `Keep clothing preservation off for the outfit swap; preserve beard and hairstyle explicitly if either drifts.`,
    ],
    faqs: [
      {
        question: `Must I already wear shalwar kameez?`,
        answer: `No. Casual clothes are fine; the prompt changes only the outfit into tailored black.`,
      },
      {
        question: `Will my beard stay the same?`,
        answer: `Yes—hairstyle and beard are meant to stay. Ask again if length or shape changes.`,
      },
      {
        question: `Why does black look grey or shiny?`,
        answer: `Ask for deep matte jet-black fabric with natural folds and warm golden-hour light—not plastic gloss.`,
      },
      {
        question: `Is this an Eid waistcoat look?`,
        answer: `No. This is a clean black shalwar kameez. For kurta plus emerald waistcoat, use the Eid outfit-change style.`,
      },
    ],
    addonLine: `Want a quieter courtyard finish? Add: keep the jet-black shalwar kameez, band collar, and modern courtyard, but soften golden-hour rim light—no bright waistcoat colours, no heavy bridal garlands.`,
  },
  "kurta-waistcoat-eid-outfit-change-men": {
    intro: `Eid outfit swap for men: off-white kurta pajama with an emerald waistcoat at a warm modern home entrance with brass lanterns and soft fairy lights. One clear waist-up photo locks your face.`,
    tips: [
      `Use a sharp waist-up portrait in even light; heavy filters wash out off-white kurta texture.`,
      `If the waistcoat turns black or gold-heavy, ask for an emerald waistcoat over an off-white kurta pajama.`,
      `Ask for a modern festive entrance with brass lanterns and fresh white flowers—not a wedding stage.`,
      `Leave clothing off so the Eid outfit can apply; keep glasses if you wear them.`,
    ],
    faqs: [
      {
        question: `Do I need an Eid photo already?`,
        answer: `No. Any clear portrait works; the prompt handles the kurta-waistcoat outfit change and warm entrance.`,
      },
      {
        question: `Will my face look fairer for the festive edit?`,
        answer: `It should not. Ask to keep exact skin tone and natural texture—no lightening.`,
      },
      {
        question: `Why does emerald look neon green?`,
        answer: `Ask for rich emerald fabric with soft festive gold light—not fluorescent green.`,
      },
      {
        question: `Can I keep a black kurta instead?`,
        answer: `Defaults are off-white kurta with emerald waistcoat. Keeping black would change the outfit default; use the black shalwar kameez style for that.`,
      },
    ],
    addonLine: `Want a calmer Eid doorway? Add: keep the off-white kurta, emerald waistcoat, and modern festive entrance, but soften fairy lights and ease the smile—no heavy sherwani embroidery, no crowded baithak extras.`,
  },
  "black-suit-outfit-change-men": {
    intro: `Outfit swap into a slim jet-black two-piece suit with white shirt and tie in a bright industrial loft—change clothes, not a fashion campaign. One clear waist-up photo of an adult man.`,
    tips: [
      `Use a sharp waist-up photo; crumpled casual crops make the suit jacket look oversized.`,
      `If the look becomes a night-city fashion shoot, ask for a clean industrial loft with large windows and soft daylight only.`,
      `Ask for a slim black two-piece with white shirt and simple tie—no velvet tuxedo details.`,
      `Keep clothing preservation off so the suit outfit change applies while face and beard stay locked.`,
    ],
    faqs: [
      {
        question: `Is this a studio fashion shoot prompt?`,
        answer: `No. It is framed as an outfit swap into a slim black suit in a bright loft while your face stays exact.`,
      },
      {
        question: `Will my own shirt stay?`,
        answer: `Only if you preserve clothing. By default you get the black suit, white shirt, and tie.`,
      },
      {
        question: `Why does the suit look baggy?`,
        answer: `Ask for a slim-fit black two-piece with clean shoulders and natural sleeve length.`,
      },
      {
        question: `Can I skip the tie?`,
        answer: `Defaults include a tie. Skipping it changes the outfit default, so keep the tie unless you intentionally override.`,
      },
    ],
    addonLine: `Want a cleaner loft suit swap? Add: keep the slim black suit, white shirt and tie, and industrial loft daylight, but ease contrast on the lapels—no night skyline, no runway posing props.`,
  },
  "leather-jacket-street-outfit-change-men": {
    intro: `Street outfit change for men: black leather biker jacket over a white tee with jeans on a clean modern city street in late-afternoon light. Upload one clear waist-up photo.`,
    tips: [
      `Use a sharp waist-up portrait; neon night filters fight the cool cinematic teal street grade.`,
      `If leather looks plastic, ask for realistic black biker leather over a plain white tee with natural creases.`,
      `Ask for a modern street with soft storefront bokeh and no readable signs or logos.`,
      `Leave clothing off for the outfit swap; preserve hairstyle and beard if either softens.`,
    ],
    faqs: [
      {
        question: `Must I already own a leather jacket photo?`,
        answer: `No. Everyday clothes are fine; the prompt changes the outfit into the biker jacket look.`,
      },
      {
        question: `Will shop signs appear behind me?`,
        answer: `Ask for blurred glass storefronts with no readable text or logos.`,
      },
      {
        question: `Why does the jacket look brown?`,
        answer: `Ask for a black leather biker jacket with a plain white tee underneath.`,
      },
      {
        question: `Is this the foggy chai dhaba leather look?`,
        answer: `No. That winter style adds fog and chai at a dhaba; this is a daylight street outfit change with tee and jeans.`,
      },
    ],
    addonLine: `Want a quieter street edge? Add: keep the black biker jacket, white tee, jeans, and modern city street, but soften late-afternoon contrast—no motorcycle propped beside you, no heavy logo patches.`,
  },
  "oversized-hoodie-cargo-streetwear-outfit-change": {
    intro: `Streetwear outfit swap: oversized grey hoodie and olive cargo trousers on a clean city side street with concrete wall and soft bokeh. One clear waist-up photo keeps your real face.`,
    tips: [
      `Upload a sharp waist-up photo; tight crops hide the oversized hoodie volume.`,
      `If cargos look like formal trousers, ask for olive cargo trousers with visible pockets and an oversized grey hoodie.`,
      `Ask for muted urban tones and a plain concrete wall—no graffiti text or brand signs.`,
      `Keep clothing preservation off so the streetwear outfit change can apply.`,
    ],
    faqs: [
      {
        question: `Does this work only for men?`,
        answer: `The page targets a men’s waist-up source, but the streetwear swap can still lock any adult face from a clear photo.`,
      },
      {
        question: `Must I already wear a hoodie?`,
        answer: `No. Any clear portrait works; the prompt changes only the outfit.`,
      },
      {
        question: `Why does grey look purple?`,
        answer: `Ask for muted grey hoodie fabric under overcast daylight—no colour cast on the fleece.`,
      },
      {
        question: `Will graffiti text appear on the wall?`,
        answer: `Ask for a plain concrete wall with soft bokeh and no signage or graffiti text.`,
      },
    ],
    addonLine: `Want a calmer streetwear finish? Add: keep the oversized grey hoodie, olive cargos, and clean city side street, but soften overcast daylight slightly—no loud brand prints, no skate-park props.`,
  },
  "couple-matching-black-outfits-change": {
    intro: `Couple clothes change into matching all-black looks—blazer and suit energy—on a modern rooftop at blue hour with soft city bokeh. Upload two clear photos or one of you both; both faces stay real.`,
    tips: [
      `Prefer two sharp photos with similar light, or one couple frame where both faces are clear.`,
      `If outfits mismatch, ask for coordinated all-black looks with clean blazer or suit lines—no random colours.`,
      `Name who is on the left and right if positions swap; keep each skin tone and head covering exact.`,
      `Leave clothing off so the matching black outfit change applies to both people.`,
    ],
    faqs: [
      {
        question: `Can we upload two separate photos?`,
        answer: `Yes. One photo per person works, or one photo of you both. Faces stay locked while outfits match in black.`,
      },
      {
        question: `Will our faces blend together?`,
        answer: `Ask to keep both identities separate with each exact face, skin tone, and any beard or head covering.`,
      },
      {
        question: `Do we need a rooftop photo already?`,
        answer: `No. Everyday portraits work; the prompt builds the modern rooftop terrace at blue hour.`,
      },
      {
        question: `Is this Eastern twinning?`,
        answer: `No. This is matching all-black modern wear. For dusty-rose kurta and embroidered suit twinning, use the Eastern twinning outfit change.`,
      },
    ],
    addonLine: `Want a quieter blue-hour twinning? Add: keep both exact faces, matching all-black outfits, and the rooftop city bokeh, but soften blue-hour contrast—no party neon signs, no third person in frame.`,
  },
  "couple-eastern-twinning-outfit-change": {
    intro: `Couple Eastern twinning outfit change: coordinated dusty-rose embroidered suit and kurta in a modern lounge with cream walls and brass accents. Upload two clear photos or one of you both.`,
    tips: [
      `Use two sharp photos with similar lighting, or one couple frame with both faces readable.`,
      `If colours drift apart, ask for matching dusty-rose tones across the embroidered suit and kurta.`,
      `Keep jewellery and buttons modest; ask to remove heavy bridal sets if they appear.`,
      `Leave clothing off so both outfits update together while faces stay exact.`,
    ],
    faqs: [
      {
        question: `Must we already wear matching clothes?`,
        answer: `No. Everyday photos work; the prompt changes both outfits into coordinated dusty-rose Eastern wear.`,
      },
      {
        question: `Can we start from two selfies?`,
        answer: `Yes. Upload one clear photo per person, or one photo of you both, and keep both faces locked.`,
      },
      {
        question: `Why does dusty-rose look hot pink?`,
        answer: `Ask for soft dusty-rose fabric with warm lounge daylight—not neon pink.`,
      },
      {
        question: `Is this the matching black rooftop look?`,
        answer: `No. That style uses all-black modern outfits on a blue-hour rooftop; this one is Eastern dusty-rose twinning indoors.`,
      },
    ],
    addonLine: `Want a softer lounge twinning? Add: keep both exact faces, dusty-rose coordinated outfits, and the modern lounge, but ease embroidery shine and quiet the smiles—no bridal red leap, no crowded hall extras.`,
  },
  "christmas-couple-photo-ai-prompt-decorating-the-tree": {
    intro: `Warm festive couple tree-decorating shot: red and gold ornaments on a tall living-room tree. Upload two clear photos (or one of you both); both faces, skin tones and heights stay true.`,
    tips: [
      `Use one sharp photo per person with similar light, or one clear shot of you both with both faces large and unobscured.`,
      `Clothing stays by default—wear what you want in the source, or turn clothing off only if you want coordinated festive outfits applied.`,
      `Leave pose unlocked so the candid hanging-ornaments moment can form; lock pose only to keep your exact stance.`,
      `If ornaments look sparse, ask for fuller red and gold baubles on a tall green tree without covering either face.`,
    ],
    faqs: [
      {
        question: `Do I need two separate photos?`,
        answer: `One clear photo per person works best, but a single photo of you both is fine if both faces are sharp and visible.`,
      },
      {
        question: `Will our clothes change?`,
        answer: `No by default—clothing is preserved. Turn clothing preservation off only if you want matching festive outfits instead.`,
      },
      {
        question: `Can heights look wrong between us?`,
        answer: `The look keeps realistic relative heights. Use full or three-quarter sources so neither person is cropped oddly.`,
      },
      {
        question: `Why do the ornaments look painted on?`,
        answer: `Ask for real glass red and gold baubles catching room light, with hands naturally reaching toward the tree—not flat stickers.`,
      },
    ],
    addonLine: `Want a cosier living-room glow? Add: keep both faces, the tall tree and red-gold ornaments, but add soft warm fairy lights in the branches—no snow indoors, no Santa costume swap.`,
  },
  "ai-christmas-photo-prompt-for-couples-gift-exchange": {
    intro: `Soft romantic gift-exchange couple portrait by a decorated tree with wrapped presents and candle lanterns. Two photos become one seated moment; both faces and identities stay locked.`,
    tips: [
      `Upload two clear face-forward photos with similar lighting, or one sharp photo of you both already together.`,
      `Clothing is preserved by default so your real outfits stay; unlock clothing only for cosy festive wardrobe swaps.`,
      `Leave pose off for the seated gift-pass moment; preserve pose only if you must keep your exact body stance.`,
      `If gifts look empty under the tree, ask for a few neatly wrapped presents and warm lantern glow without crowding faces.`,
    ],
    faqs: [
      {
        question: `Must we already be sitting in the source photo?`,
        answer: `No. With pose unlocked, the prompt seats you together for the gift exchange while keeping both faces recognisable.`,
      },
      {
        question: `Will our skin tones stay accurate?`,
        answer: `Yes—each person's skin tone, age and identity stay. Avoid heavy beauty filters on the uploads.`,
      },
      {
        question: `Do clothes stay the same?`,
        answer: `Yes by default. Turn clothing preservation off only if you want cosy festive outfits instead of your real clothes.`,
      },
      {
        question: `Why do the gifts look blurry?`,
        answer: `Ask for sharp wrapped presents under the tree and soft candle-lantern light that does not wash out either face.`,
      },
    ],
    addonLine: `Want a sweeter exchange moment? Add: keep both faces, the tree and wrapped gifts, but tuck one small ribbon bow on the gift being passed—no giant props, no costume hats.`,
  },
  "christmas-couple-photoshoot-ai-prompt-candy-cane-lane": {
    intro: `Festive evening couple walk down a candy cane lane: giant candy canes, oversized gift-box displays and decorated pines at dusk. Both faces stay yours; coats and scarves can apply when clothing is unlocked.`,
    tips: [
      `Start with two sharp portraits (or one of you both) with faces large; matching light between uploads helps blend cleanly.`,
      `Clothing stays by default—unlock it only if you want coats and scarves for the outdoor evening stroll.`,
      `Leave pose unlocked so the walking-together frame can form along the festive lane.`,
      `If the lane looks empty, ask for giant candy canes and gift-box displays lining both sides without covering your faces.`,
    ],
    faqs: [
      {
        question: `Do we need an outdoor photo already?`,
        answer: `No. Clear indoor selfies work; the dusk candy cane lane is built when pose is not preserved.`,
      },
      {
        question: `Will our coats change?`,
        answer: `Only if you turn clothing preservation off. By default your real clothes stay while the festive lane appears behind you.`,
      },
      {
        question: `Is this daytime or evening?`,
        answer: `Evening dusk with festive red and green light—ask for soft dusk glow if the scene comes out too bright.`,
      },
      {
        question: `Why do the candy canes look fake?`,
        answer: `Ask for large real-looking red-and-white candy canes with depth along the lane, not flat stickers stuck beside you.`,
      },
    ],
    addonLine: `Want a richer dusk lane? Add: keep both faces, giant candy canes and gift displays, but add soft warm string lights on the pines—no snowstorm whiteout, no cartoon mascots.`,
  },
  "christmas-baby-photoshoot-ai-prompt-gift-boxes": {
    intro: `Sweet Christmas baby studio look: little one among red, green and gold ribboned gift boxes beside a small decorated tree on a soft cream set, with the same face and age kept.`,
    tips: [
      `Use one clear eye-level photo of the baby or toddler with the face sharp, no filters or stickers on the skin.`,
      `Leave clothing and pose unlocked so a festive baby outfit and cosy seated gift-box framing can apply.`,
      `If boxes look sparse, ask for stacked wrapped gifts with satin ribbons around a small tree without hiding the face.`,
      `When skin tone shifts, restate exact skin tone and apparent age—no beautify, lighten or age-up.`,
    ],
    faqs: [
      {
        question: `What photo works best for a baby?`,
        answer: `One sharp eye-level shot with the face fully visible in soft daylight. Blurry or filtered photos struggle to keep identity.`,
      },
      {
        question: `Will the baby's age change?`,
        answer: `No—apparent age, face and hair stay. Avoid add-ons that ask to make the child look older or younger.`,
      },
      {
        question: `Do clothes stay the same?`,
        answer: `Not by default. Clothing is unlocked so a festive baby outfit can apply; turn clothing on only to keep the real outfit.`,
      },
      {
        question: `Why do the gift boxes look empty?`,
        answer: `Ask for stacked red, green and gold wrapped boxes with satin ribbons beside the small tree, still clear of the face.`,
      },
    ],
    addonLine: `Want a softer studio Christmas feel? Add: keep the baby's face, gift boxes and small tree, but add a tiny plush toy peeking beside one box—no oversized props, no adult costumes.`,
  },
  "fun-ai-christmas-photo-prompt-for-kids-santa-hat-cookies": {
    intro: `Cheerful kids' Christmas baking scene: plain Santa hat, gingerbread cookies and candy canes in a warm festive kitchen. Your child's real face, hair and age stay locked.`,
    tips: [
      `Upload one clear eye-level photo of the child with a sharp, unobscured face and soft daylight.`,
      `Leave clothing and pose off so the Santa hat, festive kitchen and playful cookie-decorating pose can apply.`,
      `If cookies look plastic, ask for real gingerbread trays and red-and-white candy canes in a jar without covering the face.`,
      `When the hat swallows the head, ask for a plain snug Santa hat that sits above the hairline without changing the hairstyle.`,
    ],
    faqs: [
      {
        question: `Must my child already be wearing a Santa hat?`,
        answer: `No. A normal clear photo works; the prompt adds a plain Santa hat when clothing is not preserved.`,
      },
      {
        question: `Will my child's face stay the same?`,
        answer: `Yes—face, skin tone, hair and apparent age stay. Skip filters or stickers on the source photo.`,
      },
      {
        question: `Is this for toddlers only?`,
        answer: `It works for young children with a clear face in frame. Use an eye-level photo so the kitchen scene frames naturally.`,
      },
      {
        question: `Why does the kitchen look empty?`,
        answer: `Ask for a small counter tree, gingerbread trays and candy canes in a jar with warm kitchen light behind the child.`,
      },
    ],
    addonLine: `Want a messier baking moment? Add: keep the Santa hat, kitchen and gingerbread trays, but add a light dusting of flour on the counter—no full chef costume, no face paint.`,
  },
  "christmas-ai-photo-prompt-for-girls-ornament-tree": {
    intro: `Elegant Christmas portrait for girls: red velvet look beside a huge ornament-covered tree, holding one shiny glass bauble. Face, skin tone and hairstyle stay yours.`,
    tips: [
      `Use a clear waist-up photo with even daylight and a front or slight three-quarter angle.`,
      `Leave clothing and pose unlocked for the red velvet outfit, standing pose and bauble-in-hand detail.`,
      `If ornaments look sparse, ask for dense red, gold and silver glass baubles with ribbon bows on a grand hallway tree.`,
      `When the bauble hides the face, ask for the ornament held at chest height with soft reflection, not covering eyes.`,
    ],
    faqs: [
      {
        question: `Do I need a red dress in my photo?`,
        answer: `No. A normal waist-up selfie works; red velvet styling applies when clothing is not preserved.`,
      },
      {
        question: `Will my hairstyle stay?`,
        answer: `Yes—face, hairstyle, glasses and skin tone stay. The look changes outfit and backdrop, not your identity.`,
      },
      {
        question: `Is this only for kids?`,
        answer: `No. It suits a girl or woman with a clear waist-up photo; keep the elegant standing tree pose, not a toddler set.`,
      },
      {
        question: `Why do the ornaments look flat?`,
        answer: `Ask for real glass baubles catching hallway light with depth on the tree, and one shiny ornament held naturally in hand.`,
      },
    ],
    addonLine: `Want richer jewel-tone sparkle? Add: keep the red velvet, ornament tree and glass bauble, but add soft warm tree-light glow in the branches—no heavy crown, no costume mask.`,
  },
  "christmas-ai-photo-prompts-for-men-fireside-gifts": {
    intro: `Warm fireside Christmas portrait for men: stone fireplace, plain red stockings, garland mantel and wrapped gifts, with a relaxed seated burgundy-blazer look while your face stays locked.`,
    tips: [
      `Upload a sharp waist-up photo of an adult man with even face light and no beauty filters.`,
      `Leave clothing and pose unlocked so the burgundy blazer outfit and relaxed fireside seat can apply.`,
      `If the fire looks fake, ask for a crackling stone fireplace with soft amber light on the face—not neon orange glow.`,
      `When gifts crowd the frame, ask for a few wrapped presents on the floor and plain red stockings on the mantel only.`,
    ],
    faqs: [
      {
        question: `Do I need a fireplace photo already?`,
        answer: `No. Any clear waist-up selfie works; the stone fireplace and gifts are built when pose is not preserved.`,
      },
      {
        question: `Will my beard stay?`,
        answer: `Yes—face, beard, hairstyle, glasses and skin tone stay. Only wardrobe and backdrop shift by default.`,
      },
      {
        question: `Can I keep my own clothes?`,
        answer: `Yes—turn clothing preservation on. Otherwise a smart burgundy blazer look applies for the fireside scene.`,
      },
      {
        question: `Why do the stockings look busy?`,
        answer: `Ask for plain red stockings on a garland mantel with no text or logos, plus soft firelight on your face.`,
      },
    ],
    addonLine: `Want a cosier mantel moment? Add: keep the fireplace, stockings and burgundy look, but add soft candle light on the mantel—no Santa hat, no cartoon props.`,
  },
  "ai-christmas-photo-prompt-for-boys-with-candy-cane": {
    intro: `Bright peppermint Christmas portrait for boys: giant red-and-white candy canes, striped studio backdrop and a playful lean, while your real face and skin tone stay.`,
    tips: [
      `Use one clear waist-up photo of a boy or young man with a sharp front or three-quarter face.`,
      `Leave clothing and pose unlocked for the red-and-white outfit and playful candy-cane lean.`,
      `If stripes look muddy, ask for clean peppermint red-and-white backdrop stripes with giant candy canes as props.`,
      `When the cane hides the face, ask for the giant candy cane as a lean support at the side, not across the eyes.`,
    ],
    faqs: [
      {
        question: `Is this only for little kids?`,
        answer: `It works for a boy or young man with a clear waist-up photo. Keep the playful candy-cane lean and bright studio mood.`,
      },
      {
        question: `Will my face change?`,
        answer: `No—face, hair, glasses and skin tone stay. The peppermint set and outfit build around your identity.`,
      },
      {
        question: `Do I need candy cane props already?`,
        answer: `No. A normal selfie is enough; giant candy canes and the striped backdrop are added in the edit.`,
      },
      {
        question: `Why does the outfit look wrong?`,
        answer: `Ask for a simple red-and-white festive outfit that matches the peppermint set, without logos or busy prints on the chest.`,
      },
    ],
    addonLine: `Want a sweeter peppermint studio vibe? Add: keep the giant candy canes, striped backdrop and playful pose, but scatter a few wrapped candies near the feet—no face stickers, no full clown makeup.`,
  },
  "vintage-christmas-photo-ai-prompt-for-men-retro-film": {
    intro: `Faded 1970s Christmas film snapshot for men: wood-panelled room, tinsel tree with big coloured bulbs and patterned gift wrap, with soft grain while your face stays recognisable.`,
    tips: [
      `Upload a clear waist-up photo with even light; avoid heavy modern filters so the retro film grade can sit cleanly.`,
      `Leave clothing and pose unlocked for the retro outfit and vintage living-room framing.`,
      `If it looks too sharp and digital, ask for soft 1970s film grain and slightly faded warm colour without blurring the face.`,
      `When the tree looks modern, ask for a tinsel tree with big coloured bulbs and patterned-paper gifts, not today's minimal lights.`,
    ],
    faqs: [
      {
        question: `Will I look older or younger?`,
        answer: `No. Apparent age and face stay the same; only the 1970s room, outfit and film grade change.`,
      },
      {
        question: `Do I need a vintage photo already?`,
        answer: `No. A normal clear portrait works; the retro film Christmas scene is built when clothing and pose are unlocked.`,
      },
      {
        question: `Can I keep my own clothes?`,
        answer: `Yes—preserve clothing. Otherwise a retro festive outfit matches the wood-panelled tinsel-tree set.`,
      },
      {
        question: `Why does the film look too noisy?`,
        answer: `Ask for gentle 1970s grain and faded warmth, not heavy noise that softens eyes or skin detail.`,
      },
    ],
    addonLine: `Want a stronger retro snapshot feel? Add: keep the tinsel tree, wood panelling and film grain, but add a slight soft vignette at the corners—no neon cyber look, no modern LED walls.`,
  },
  "christmas-family-photoshoot-ai-prompt-tree-and-gifts": {
    intro: `Warm classic Christmas family portrait: everyone gathered by a large decorated tree with wrapped gifts and a plaid throw. Every face, skin tone and relative height stays true from your group photo.`,
    tips: [
      `Upload one family photo of 2–6 people with every face visible, facing the camera, and even light on all faces.`,
      `Clothing stays by default so real outfits remain; unlock clothing only if you want coordinated festive looks.`,
      `Leave pose unlocked so the group can gather naturally around the tree and gift pile.`,
      `If someone blends into another person, restate separate identities and realistic heights—no face swaps or merges.`,
    ],
    faqs: [
      {
        question: `How many people can be in the photo?`,
        answer: `Best with 2–6 people in one shot where every face is clear. Hidden or side-turned faces are harder to keep accurate.`,
      },
      {
        question: `Will our clothes change?`,
        answer: `No by default—clothing is preserved. Turn it off only if you want matching festive outfits for everyone.`,
      },
      {
        question: `Can kids and adults stay the right age?`,
        answer: `Yes. Each person's age, skin tone and identity stay. Avoid blurry crops where a child's face is tiny.`,
      },
      {
        question: `Why does one face look swapped?`,
        answer: `Use a source where nobody is blocked, then ask to keep every person separate with matching features from the upload.`,
      },
    ],
    addonLine: `Want a warmer classic living-room Christmas? Add: keep every face, the decorated tree and gift pile, but add soft warm tree lights in the branches—no snow indoors, no costume mascots.`,
  },
  "viral-christmas-ai-photo-trend-prompt-giant-ornament": {
    intro: `Viral miniature Christmas trend: you sitting inside a giant clear glass ornament on a huge pine branch with red and gold baubles, while your real face stays locked.`,
    tips: [
      `Use one clear photo of a girl or woman with the face fully visible and sharp in even light.`,
      `Leave clothing and pose unlocked so the festive outfit and inside-the-ornament seated pose can apply.`,
      `If scale looks wrong, ask for a miniature figure clearly inside a huge glass bauble hanging from an oversized pine branch.`,
      `When glass reflections hide the face, ask for clear glass with soft gold-emerald glow and the face readable through the orb.`,
    ],
    faqs: [
      {
        question: `Do I need a tiny prop photo already?`,
        answer: `No. A normal clear portrait works; the giant ornament miniature scene is created in the edit.`,
      },
      {
        question: `Will my face stay recognisable inside the glass?`,
        answer: `Yes—that is the point. Face, skin tone and hair stay yours while the fantasy scale and ornament are built around you.`,
      },
      {
        question: `Is clothing preserved?`,
        answer: `Not by default. Unlock clothing stays off so a festive outfit can match the ornament scene; turn clothing on to keep your real clothes.`,
      },
      {
        question: `Why do I look pasted onto the bauble?`,
        answer: `Ask to sit fully inside the clear glass ornament with natural contact shadows and soft reflection on the glass.`,
      },
    ],
    addonLine: `Want a more magical ornament glow? Add: keep the giant clear glass bauble, pine branch and your face, but add soft gold sparkle outside the glass—no cracked glass shards, no face distortion.`,
  },
  "ai-christmas-pet-photo-prompt-gift-box-surprise": {
    intro: `Cute Christmas pet surprise: your dog or cat peeking from a wrapped gift box under the tree with a tiny plain red bow, while breed, fur, eyes and face stay true.`,
    tips: [
      `Upload one clear pet photo at eye level with face and eyes sharp—no filters that change fur colour.`,
      `Clothing/accessory preservation stays on by default for the pet look; the tiny red bow is the festive accent.`,
      `Leave pose unlocked so the peeking-from-the-box moment can form under the decorated tree.`,
      `If the pet turns into a different breed, restate exact fur colour, markings, eye colour and face shape.`,
    ],
    faqs: [
      {
        question: `Does this work for dogs and cats?`,
        answer: `Yes. Use any clear photo of your dog or cat with the face visible; breed and markings stay the same.`,
      },
      {
        question: `Will my pet become a cartoon?`,
        answer: `No. The look stays a realistic photo—same animal, just peeking from a gift box under the tree.`,
      },
      {
        question: `Do I need a Christmas photo of my pet already?`,
        answer: `No. A normal daylight pet photo is enough; the tree, wrapped box and tiny red bow are added.`,
      },
      {
        question: `Why does the fur colour change?`,
        answer: `Restate exact fur colour and markings, and avoid filtered source photos that already shift the coat.`,
      },
    ],
    addonLine: `Want a cosier under-tree surprise? Add: keep the same pet, gift box and tiny red bow, but add a soft plaid blanket under the box—no human clothes on the pet, no cartoon eyes.`,
  },
  "cozy-fireplace-sweater-christmas-portrait-women": {
    intro: `Modern cosy Christmas portrait for women: oversized cream cable-knit turtleneck by a sleek stone fireplace with warm fairy lights and a slim tree, while your face stays yours.`,
    tips: [
      `Use a clear waist-up photo of an adult woman with even light and a front or three-quarter angle.`,
      `Leave clothing and pose unlocked for the cream cable-knit turtleneck and armchair fireside framing.`,
      `If the knit looks flat, ask for visible cable texture on the oversized turtleneck with soft amber fireplace glow.`,
      `When the room feels empty, ask for a slim decorated tree with warm white lights and soft mantel candles behind you.`,
    ],
    faqs: [
      {
        question: `Do I need a fireplace in my photo?`,
        answer: `No. A normal waist-up selfie works; the modern stone fireplace and slim tree are built around you.`,
      },
      {
        question: `Will my skin tone stay the same?`,
        answer: `Yes—face, skin tone, hair and glasses stay. Warm amber light should not bleach or darken your skin.`,
      },
      {
        question: `Can I keep my own sweater?`,
        answer: `Yes—turn clothing preservation on. Otherwise the cream cable-knit turtleneck applies for this cosy look.`,
      },
      {
        question: `Why does the sweater look plastic?`,
        answer: `Ask for real cable-knit fabric texture and soft shadows in the knit, not a smooth painted surface.`,
      },
    ],
    addonLine: `Want a softer modern fireside mood? Add: keep the cream cable-knit, stone fireplace and warm amber glow, but add one soft throw on the armchair—no heavy fur coats, no costume jewellery overload.`,
  },
  "christmas-tree-lights-bokeh-selfie": {
    intro: `Dreamy Christmas tree-lights selfie: blush-pink fuzzy cardigan and large golden fairy-light bokeh behind your face. Close-up identity stays locked while the glow builds around you.`,
    tips: [
      `Upload a clear close-up of an adult woman with a sharp face; arm's-length selfie framing works especially well.`,
      `Leave clothing and pose unlocked so the fuzzy cardigan and selfie angle with big golden bokeh can apply.`,
      `If lights look like hard dots, ask for large round creamy golden bokeh from warm white fairy lights behind the face.`,
      `When the face softens too much, ask to keep eyes and skin sharp while only the tree lights blur into bokeh.`,
    ],
    faqs: [
      {
        question: `Do I need a Christmas tree behind me already?`,
        answer: `No. A clear close-up selfie works; large golden tree-light bokeh is created as the backdrop.`,
      },
      {
        question: `Will my face stay sharp?`,
        answer: `Yes—identity stays locked. Ask for creamy bokeh only in the background so eyes and skin stay clear.`,
      },
      {
        question: `Is clothing changed?`,
        answer: `By default yes—the blush-pink fuzzy cardigan applies. Preserve clothing if you want your real top to stay.`,
      },
      {
        question: `Why do the lights look harsh?`,
        answer: `Ask for large soft golden circular bokeh from warm fairy lights, not tiny bright speckles or colourful disco bulbs.`,
      },
    ],
    addonLine: `Want dreamier golden bokeh? Add: keep the blush-pink cardigan, close selfie angle and golden lights, but deepen the soft warm grade slightly—no neon pink cast, no heavy beauty blur on the face.`,
  },
  "red-velvet-holiday-glam-portrait": {
    intro: `Luxe modest holiday glam: deep-red velvet gown, gold drop earrings and sparkling gold bokeh in an elegant lounge with a gold-ornament tree, while your real face stays.`,
    tips: [
      `Use a sharp waist-up photo with even light so velvet texture and gold earrings can read cleanly.`,
      `Leave clothing and pose unlocked for the modest deep-red velvet gown and glam lounge framing.`,
      `If velvet looks shiny like plastic, ask for soft deep-red velvet fabric with natural folds under warm lounge light.`,
      `When earrings overpower the face, ask for simple gold drop earrings that catch light without covering hair or cheeks.`,
    ],
    faqs: [
      {
        question: `Is the gown modest by default?`,
        answer: `Yes—this look uses a modest deep-red velvet gown. Avoid add-ons that ask for revealing cuts.`,
      },
      {
        question: `Will my jewellery from the photo stay?`,
        answer: `Only if you preserve clothing/accessories. Otherwise gold drop earrings match the holiday lounge glam.`,
      },
      {
        question: `Do I need a party venue photo?`,
        answer: `No. A clear waist-up selfie is enough; the elegant holiday lounge and gold bokeh are added.`,
      },
      {
        question: `Why does the red look orange?`,
        answer: `Ask for deep crimson velvet under warm gold light, not a bright orange cast on the dress or skin.`,
      },
    ],
    addonLine: `Want richer crimson-and-gold glam? Add: keep the deep-red velvet gown, gold earrings and lounge tree, but soften the gold sparkle bokeh behind—no heavy crown, no plunging neckline changes.`,
  },
  "womens-studio-christmas-photoshoot-red-backdrop": {
    intro: `Polished women's studio Christmas shoot: modest red satin dress, gold-wrapped gift and deep-red seamless backdrop with gold bokeh. Face, hair and skin tone stay yours.`,
    tips: [
      `Upload one clear waist-up photo with a front or slight three-quarter angle and even light.`,
      `Leave clothing and pose unlocked so the red satin dress and gold-gift studio pose can apply.`,
      `If the backdrop looks wrinkled, ask for a seamless deep-red studio sweep with soft golden bokeh lights.`,
      `When the gift hides the torso oddly, ask for one elegant gold-wrapped gift held naturally at the side.`,
    ],
    faqs: [
      {
        question: `Do I need a studio photo already?`,
        answer: `No. A normal clear portrait works; the deep-red seamless backdrop and gold bokeh are created for you.`,
      },
      {
        question: `Will my face stay the same?`,
        answer: `Yes—face, skin tone, hair and glasses stay. Only outfit and studio Christmas set change by default.`,
      },
      {
        question: `Can I keep my own dress?`,
        answer: `Yes—preserve clothing. Otherwise a modest red satin dress with a gold-wrapped gift applies.`,
      },
      {
        question: `Why does the satin look flat?`,
        answer: `Ask for soft satin highlights and natural folds on the red dress under studio light, not a matte painted shape.`,
      },
    ],
    addonLine: `Want richer red-and-gold studio polish? Add: keep the red satin dress, gold gift and deep-red backdrop, but add a few soft gold ornaments in the distance—no busy props in front of the face.`,
  },
  "mens-christmas-knit-sweater-portrait": {
    intro: `Sharp men's Christmas knit portrait: forest-green merino sweater with a subtle snowflake pattern beside a tall Scandinavian pine in warm white lights, while your face and beard stay locked.`,
    tips: [
      `Use a clear waist-up photo of an adult man with even light and no heavy filters.`,
      `Leave clothing and pose unlocked for the forest-green merino knit and confident waist-up tree framing.`,
      `If the knit pattern looks loud, ask for a subtle snowflake pattern on fitted forest-green merino—not a busy cartoon print.`,
      `When the room feels empty, ask for kraft-paper gifts and soft candlelight near a tall pine with warm white lights.`,
    ],
    faqs: [
      {
        question: `Will my beard stay?`,
        answer: `Yes—face, hair, beard, glasses and skin tone stay. The green knit and living-room tree are what change.`,
      },
      {
        question: `Do I need a Christmas sweater already?`,
        answer: `No. A normal photo works; the forest-green merino knit applies when clothing is not preserved.`,
      },
      {
        question: `Is this a funny novelty sweater look?`,
        answer: `No—it is a sharp modern knit with a subtle pattern beside a tall pine, not a joke slogan sweater.`,
      },
      {
        question: `Why does the green look neon?`,
        answer: `Ask for rich forest-green merino under warm white tree light, not bright neon green on the fabric or skin.`,
      },
    ],
    addonLine: `Want a richer forest-green Christmas mood? Add: keep the merino knit, Scandinavian tree and warm lights, but soften tree-light bokeh behind the shoulder—no Santa hat, no novelty sweater slogans.`,
  },
  "mens-christmas-photoshoot-dark-suit-gift-boxes": {
    intro: `Moody men's Christmas studio look: tailored midnight-black suit seated on stacked black and gold gift boxes beside a tall tree in warm gold lights, with your real face kept.`,
    tips: [
      `Upload a sharp waist-up photo of an adult man; clean even light helps the dark suit read without crushing shadows.`,
      `Leave clothing and pose unlocked for the midnight-black suit and gift-box seating pose.`,
      `If the set looks flat, ask for stacked black and gold gift boxes, soft haze and a tall tree in warm gold lights.`,
      `When the suit loses shape, ask for tailored black fabric with natural lapel structure under moody studio light.`,
    ],
    faqs: [
      {
        question: `Do I need to wear a suit in my photo?`,
        answer: `No. A clear everyday portrait works; the tailored midnight-black suit applies when clothing is unlocked.`,
      },
      {
        question: `Will my skin tone stay accurate in dark light?`,
        answer: `Yes. Ask for moody studio light that still shows true skin tone—not crushed black shadows on the face.`,
      },
      {
        question: `Is this a bright cheerful Christmas look?`,
        answer: `No—it is moody black and gold with warm tree lights, more dramatic than bright living-room cheer.`,
      },
      {
        question: `Why do the gift boxes look cheap?`,
        answer: `Ask for elegant stacked black and gold wrapped boxes with clean edges and soft studio depth.`,
      },
    ],
    addonLine: `Want a deeper black-and-gold studio mood? Add: keep the midnight suit, gift-box seat and gold tree lights, but soften a light haze behind—no colourful neon, no flashy logos on the boxes.`,
  },
  "80s-retro-christmas-portrait": {
    intro: `Glossy 80s fashion-editorial Christmas portrait: metallic puff-shoulder blouse, berry lip and shimmering silver-red tinsel curtain with soft film grain, while your face stays recognisable.`,
    tips: [
      `Use a clear chest-up photo with even light so the puff-shoulder blouse and tinsel backdrop can frame cleanly.`,
      `Leave clothing and pose unlocked for the metallic blouse and retro studio pose.`,
      `If it looks too modern and sharp, ask for soft film grain and glossy retro colour without blurring eyes.`,
      `When tinsel turns into noise, ask for a shimmering silver-and-red tinsel curtain with a small retro tree and soft coloured lights.`,
    ],
    faqs: [
      {
        question: `Will my hairstyle become an 80s wig?`,
        answer: `No. Your real hair and face stay; the look adds outfit, makeup mood and tinsel-studio backdrop around you.`,
      },
      {
        question: `Do I need vintage clothes already?`,
        answer: `No. A normal chest-up photo works; the metallic puff-shoulder blouse applies when clothing is not preserved.`,
      },
      {
        question: `Is this for men and women?`,
        answer: `It suits any adult with a clear chest-up photo. Keep the fashion-editorial tinsel studio mood rather than a kids' costume set.`,
      },
      {
        question: `Why does the makeup look heavy?`,
        answer: `Ask for soft glossy berry lip and light retro glam only—editorial, not costume face paint.`,
      },
    ],
    addonLine: `Want a stronger 80s editorial Christmas vibe? Add: keep the puff-shoulder blouse, tinsel curtain and soft film grain, but add a slight glossy catchlight—no modern streetwear, no neon cyber grid.`,
  },
  "couple-matching-christmas-pajamas-by-tree": {
    intro: `Cosy couple Christmas pajama portrait: matching emerald satin pajamas on a rug in front of a tall tree with warm white lights. Upload two photos; both faces and heights stay true.`,
    tips: [
      `Use one clear photo per person (or one of you both) with sharp faces and similar lighting between uploads.`,
      `Leave clothing unlocked so matching emerald satin pajamas can apply to both of you.`,
      `Leave pose unlocked for the relaxed rug pose in front of the decorated tree and wrapped gifts.`,
      `If pajamas mismatch, ask for the same emerald satin set on both people with soft tree-light glow.`,
    ],
    faqs: [
      {
        question: `Do we need matching pajamas in the source photos?`,
        answer: `No. Everyday photos work; matching emerald satin pajamas are applied when clothing is not preserved.`,
      },
      {
        question: `Will both faces stay accurate?`,
        answer: `Yes—both identities, skin tones and relative heights stay. Similar light in both uploads helps a lot.`,
      },
      {
        question: `Can we keep our own clothes?`,
        answer: `Yes—turn clothing preservation on. Otherwise the matching emerald pajama look is the default for this style.`,
      },
      {
        question: `Why do we look different heights wrongly?`,
        answer: `Ask to keep realistic relative heights and seat both of you naturally on the rug in front of the tree.`,
      },
    ],
    addonLine: `Want a cosier matching-pajama night? Add: keep both faces, emerald satin pajamas and the tree rug pose, but add a knit throw beside you—no Santa hats, no busy slogan prints on the pajamas.`,
  },
  "couple-string-lights-doorway-christmas": {
    intro: `Stylish doorway Christmas couple portrait: camel and charcoal coats framed by evergreen garland, warm string lights, a simple wreath and a lantern at dusk. Both faces stay yours.`,
    tips: [
      `Upload two clear photos or one of you both with front or three-quarter faces and similar light.`,
      `Leave clothing unlocked for camel and charcoal coats with scarves in the doorway frame.`,
      `Leave pose unlocked so you stand together in the string-lit doorway at evening ambient light.`,
      `If lights look sparse, ask for warm white string lights in a lush evergreen garland with a simple text-free wreath.`,
    ],
    faqs: [
      {
        question: `Do we need a doorway photo already?`,
        answer: `No. Clear portraits work; the modern doorway with garland and string lights is built when pose is unlocked.`,
      },
      {
        question: `Will our coats match automatically?`,
        answer: `The look aims for camel and charcoal coats together. Preserve clothing if you want your real outfits instead.`,
      },
      {
        question: `Is this daytime?`,
        answer: `It is evening dusk with warm string lights and cooler ambient light—ask for dusk if the scene comes out too bright.`,
      },
      {
        question: `Why does the wreath show random text?`,
        answer: `Ask for a simple wreath with no text or brands, plus clean warm string lights on the evergreen garland.`,
      },
    ],
    addonLine: `Want a warmer dusk doorway glow? Add: keep both faces, coats and string-lit garland, but soften the lantern glow on the step—no snow blizzard, no logo wreath text.`,
  },
  "couple-christmas-market-night-stroll": {
    intro: `Cinematic Christmas market night stroll for couples: ivory wool coat and navy peacoat arm-in-arm past wooden stalls and warm string lights, with both faces kept true.`,
    tips: [
      `Use two sharp photos (or one of you both) with similar lighting so both faces blend cleanly at night.`,
      `Leave clothing unlocked for the ivory coat and navy peacoat pairing on the night stroll.`,
      `Leave pose unlocked so the arm-in-arm market walk can form under warm stall glow.`,
      `If signs or brands appear, ask for a generic market with no text, logos or landmarks in the background.`,
    ],
    faqs: [
      {
        question: `Do we need photos from a real Christmas market?`,
        answer: `No. Everyday clear portraits work; a generic night market with wooden stalls is created for you.`,
      },
      {
        question: `Will both faces stay recognisable at night?`,
        answer: `Yes. Ask for cinematic warm night light that still shows true skin tone on both faces.`,
      },
      {
        question: `Can we keep our own coats?`,
        answer: `Yes—preserve clothing. Otherwise ivory wool and navy peacoat styling applies for the stroll.`,
      },
      {
        question: `Why do random shop signs appear?`,
        answer: `Ask for a generic festive market with no signs, text, brands or landmarks—only stalls, lights and soft tree blur.`,
      },
    ],
    addonLine: `Want a richer night-market stroll? Add: keep both faces, ivory and navy coats and warm stall lights, but soften a lit tree blur behind—no brand signs, no crowded face-blocking props.`,
  },
  "christmas-snowfall-winter-coat-portrait": {
    intro: `Cinematic Christmas snowfall portrait: tailored charcoal wool overcoat and knit scarf on a quiet lit street with gently falling snow, while your face and beard stay locked.`,
    tips: [
      `Upload a clear waist-up photo of an adult man with even light and a sharp front or three-quarter face.`,
      `Leave clothing and pose unlocked for the charcoal overcoat, knit scarf and snowy evening street framing.`,
      `If snow looks like noise, ask for gentle falling snowflakes with depth—not white speckles stuck on the face.`,
      `When street signs appear, ask for a quiet snowy evening street with no text, signs or landmarks.`,
    ],
    faqs: [
      {
        question: `Do I need a photo taken in snow?`,
        answer: `No. A clear indoor or outdoor portrait works; gentle snowfall and the quiet lit street are added.`,
      },
      {
        question: `Will my face stay clear with snow?`,
        answer: `Yes—ask for snow falling around you without covering eyes or sticking as white dots on skin.`,
      },
      {
        question: `Can I keep my own coat?`,
        answer: `Yes—preserve clothing. Otherwise a tailored charcoal wool overcoat and knit scarf apply.`,
      },
      {
        question: `Why does the scene look blue and cold on my skin?`,
        answer: `Ask for cool blue evening air with warm street lights that still keep your true skin tone.`,
      },
    ],
    addonLine: `Want a softer snowfall evening mood? Add: keep the charcoal overcoat, knit scarf and falling snow, but soften warm lights on distant trees—no heavy blizzard whiteout, no logo scarves.`,
  },
  "couple-snowy-cabin-window-christmas": {
    intro: `Warm cabin Christmas couple portrait: chunky knit sweaters on a window seat while snow falls on pines outside, with string lights on the frame. Upload two photos; both faces stay true.`,
    tips: [
      `Use one clear photo per person or one of you both, with sharp faces and similar lighting.`,
      `Leave clothing unlocked so chunky knit sweaters can apply for the cosy cabin seat.`,
      `Leave pose unlocked for the shared window-seat blanket moment with snow visible outside.`,
      `If the window looks fake, ask for real falling snow on pine trees outside and warm string lights along the frame.`,
    ],
    faqs: [
      {
        question: `Do we need a cabin photo already?`,
        answer: `No. Clear everyday portraits work; the wooden cabin window seat and snowy pines are built for you.`,
      },
      {
        question: `Will both of us stay recognisable?`,
        answer: `Yes—both faces, skin tones, ages and relative heights stay when you upload clear photos of each person.`,
      },
      {
        question: `Can we keep our own sweaters?`,
        answer: `Yes—turn clothing preservation on. Otherwise chunky knit sweaters match the warm cabin Christmas look.`,
      },
      {
        question: `Why does the snow outside look painted?`,
        answer: `Ask for soft real snowfall on pine trees outside the glass, with warm interior light on both faces.`,
      },
    ],
    addonLine: `Want a cosier snowy cabin window mood? Add: keep both faces, chunky knits and the window seat, but add a soft shared blanket across your laps—no heavy costumes, no text on the glass.`,
  },
  "trending-ai-photo-prompt-for-boys-with-car-night": {
    intro: `Cool cinematic night for boys: lean on a sleek unbadged black sports car on a rain-wet city road, neon and streetlight reflections on asphalt. Upload one clear chest-up or waist-up photo.`,
    tips: [
      `Chest-up or waist-up sharpness lets the dark jacket and car lines read once pose is rebuilt.`,
      `Ask for a generic unbadged black sports car and wet-road neon reflections—no brand logos on the bodywork.`,
      `Keep exact skin tone under night neon; blue-pink grades often lighten faces.`,
      `Turn clothing on only to keep your real outfit; otherwise accept the dark jacket restyle.`,
    ],
    faqs: [
      {
        question: `Do I need a photo already taken with a car?`,
        answer: `No. A clear indoor or outdoor portrait works; the wet night road and sports car build when pose is not preserved.`,
      },
      {
        question: `Will a branded supercar appear?`,
        answer: `No—the look uses a generic unbadged black sports car. Ask again if logos creep in.`,
      },
      {
        question: `Is this a daylight street pose?`,
        answer: `No—this is cool cinematic night with wet asphalt reflections. Use daylight street styles for soft sun sidewalks.`,
      },
      {
        question: `Will my face stay the same?`,
        answer: `Yes. Face, skin tone, hairstyle, and beard stay locked; only scene, outfit, and lean change unless you alter preservation.`,
      },
    ],
    addonLine: `Want a quieter night lean? Add: keep the black sports car, wet city road, and dark jacket, but soften neon intensity and use a calmer lean—no brand badges, smoke machines, or extra friends.`,
  },
  "bike-ai-photo-prompt-for-boys-mountain-highway": {
    intro: `Golden sunset bike portrait for boys: sit on a generic cafe-racer motorcycle on a winding mountain highway with layered peaks and an orange sky. Use one clear chest-up or waist-up photo.`,
    tips: [
      `Chest-up or waist-up frames keep the riding jacket and bike readable against the peaks.`,
      `Ask for a generic cafe-racer only—no brand badges or racing numbers on the tank.`,
      `Keep exact skin tone under sunset glow; orange skies often warm faces too far.`,
      `If the road looks flat or fake, request winding highway curves with layered mountain peaks.`,
    ],
    faqs: [
      {
        question: `Must my photo already show a motorcycle?`,
        answer: `No. A clear portrait is enough; the cafe-racer and mountain highway build when pose is not locked.`,
      },
      {
        question: `Will a famous bike brand appear?`,
        answer: `No. The prompt uses a generic cafe-racer without badges. Re-ask if logos show up.`,
      },
      {
        question: `Is this a night city car look?`,
        answer: `No—this is golden sunset on a mountain highway. Night sports-car leans are a different style.`,
      },
      {
        question: `Helmet on or off?`,
        answer: `Face stays fully visible by default. Ask only if you specifically want a helmet in hand, not covering your face.`,
      },
    ],
    addonLine: `Want a softer mountain ride? Add: keep the cafe-racer, winding highway, and riding jacket, but ease the sunset rim and use a calmer seated pose—no helmet covering the face or brand logos on the bike.`,
  },
  "retro-ai-photo-prompt-for-boys-90s-vintage-jeep": {
    intro: `Faded 90s film look for boys: denim jacket beside a vintage open-top jeep on a dusty countryside road with dry grass and warm grain. Upload one clear chest-up or waist-up photo.`,
    tips: [
      `Sharp chest-up or waist-up sources hold film grain better than tiny distant faces.`,
      `Ask for a vintage open-top jeep and dusty country road—not a modern SUV showroom.`,
      `Request warm faded colour and light grain; heavy vintage filters can muddy the face.`,
      `Keep exact skin tone and beard—90s grades sometimes bleach complexions.`,
    ],
    faqs: [
      {
        question: `Do I need a jeep in my original photo?`,
        answer: `No. A clear portrait works; the vintage jeep and dusty road build when pose is not preserved.`,
      },
      {
        question: `Is this black-and-white?`,
        answer: `No—it is faded colour with warm 90s film grain, not full monochrome.`,
      },
      {
        question: `Will clothing stay mine?`,
        answer: `Only if clothing preservation is on. Otherwise it restyles into a denim jacket look.`,
      },
      {
        question: `Why does the jeep look like a new SUV?`,
        answer: `Ask again for a vintage open-top jeep with dusty bodywork and no modern badges.`,
      },
    ],
    addonLine: `Want a quieter 90s roadside frame? Add: keep the denim jacket, open-top jeep, and dusty country road, but soften grain slightly and use a calmer lean—no modern alloy wheels or neon city props.`,
  },
  "trending-ai-photo-prompt-for-boys-with-rose-red-shirt": {
    intro: `Warm romantic daylight for boys: red shirt, bouquet of red roses, sunny old-town street with cream walls and soft blur. Use one clear chest-up or waist-up photo.`,
    tips: [
      `Chest-up sharpness lets the rose bouquet and red shirt read without cutting petals at the edge.`,
      `Ask for a sunny old-town street with cream walls and green plants—not a dark studio.`,
      `Keep exact skin tone under bright daylight; romantic grades often lighten faces.`,
      `If the smile looks stiff, request a relaxed natural smile with roses held casually.`,
    ],
    faqs: [
      {
        question: `Must I already hold roses in my photo?`,
        answer: `No. A clear portrait is enough; the bouquet and red shirt build when clothing and pose are not locked.`,
      },
      {
        question: `Is this a sad rainy-window look?`,
        answer: `No—this is warm romantic daylight with roses. Rainy-window sadness is a different mood.`,
      },
      {
        question: `Will my hairstyle change?`,
        answer: `Hairstyle and beard stay; only outfit, roses, and street backdrop shift unless you change settings.`,
      },
      {
        question: `Can I use white roses instead?`,
        answer: `Default is red roses with a red shirt. Use an add-on line only if you want a small colour tweak without rewriting the whole look.`,
      },
    ],
    addonLine: `Want a softer rose-street mood? Add: keep the red shirt, red rose bouquet, and sunny cream-wall street, but ease saturation slightly and use a quieter smile—no heart stickers or night neon.`,
  },
  "kurta-pajama-ai-photo-prompt-for-boys-old-city-haveli": {
    intro: `Classic desi everyday look for boys: white kurta pajama and waistcoat on old-city haveli steps with carved wooden doors and sandstone arches. Upload one clear chest-up or waist-up photo.`,
    tips: [
      `Chest-up or waist-up frames show the waistcoat and kurta cleanly against the carved doors.`,
      `Ask for haveli courtyard steps with arched sandstone walls—not a wedding mandap or stage lights.`,
      `Keep exact skin tone under warm heritage daylight; heritage grades can orange the face.`,
      `This is everyday classic, not festive—avoid requesting heavy sherwani embroidery unless you want a different style.`,
    ],
    faqs: [
      {
        question: `Do I need a photo already taken in a haveli?`,
        answer: `No. A clear portrait works; the old-city courtyard and steps build when pose is not preserved.`,
      },
      {
        question: `Is this a festive wedding look?`,
        answer: `No—it is a classic everyday kurta pajama and waistcoat look, not heavy wedding attire.`,
      },
      {
        question: `Will my kurta stay if I already wore one?`,
        answer: `Only if clothing preservation is on. Otherwise it restyles into white kurta pajama with a waistcoat.`,
      },
      {
        question: `Why do festival props appear?`,
        answer: `Ask for plain heritage daylight on haveli steps with no diyas, garlands, or stage décor.`,
      },
    ],
    addonLine: `Want a quieter haveli step pose? Add: keep the white kurta pajama, waistcoat, and carved courtyard steps, but soften hard sunlight and use a calmer seated stance—no wedding florals or stage lights.`,
  },
  "realistic-ai-photo-prompt-for-boys-golden-hour-field": {
    intro: `Natural golden-hour field portrait for boys: open wheat field, tall grass, soft warm sky, simple linen shirt, true skin texture. Use one clear chest-up or waist-up photo.`,
    tips: [
      `Sharp face and natural daylight sources keep true skin texture under golden hour.`,
      `Ask for an open wheat field with tall grass—not a studio backdrop or city street.`,
      `Keep exact skin tone and hairstyle; golden grades often lighten complexions and smooth pores.`,
      `Turn clothing on only to keep your real shirt; otherwise accept the simple linen restyle.`,
    ],
    faqs: [
      {
        question: `Must my photo already be in a field?`,
        answer: `No. A clear chest-up or waist-up portrait works; the golden-hour field builds when pose is not locked.`,
      },
      {
        question: `Will my face look heavily edited?`,
        answer: `This style aims for realistic skin texture. Ask for true pores and exact skin tone if smoothing creeps in.`,
      },
      {
        question: `Is this a sad rainy indoor mood?`,
        answer: `No—this is natural outdoor golden hour. Rainy-window sadness is a different page.`,
      },
      {
        question: `Outfit too fancy?`,
        answer: `Ask for a simple linen shirt while locking face, hair, and skin tone.`,
      },
    ],
    addonLine: `Want a quieter field glow? Add: keep the wheat field, tall grass, and simple linen shirt, but soften the sun rim and use a calmer stance—no flower crowns or heavy beauty filters.`,
  },
  "sad-ai-photo-prompt-for-boys-rainy-window": {
    intro: `Moody blue-and-amber sadness for boys: sit by a rain-streaked night window with warm lamp glow and blurred city lights outside, hoodie on. Upload one clear chest-up or waist-up photo.`,
    tips: [
      `Chest-up sharpness keeps eyes readable under mixed blue window light and amber lamp.`,
      `Ask for rain streaks on the glass and a small warm table lamp—not a bright studio fill.`,
      `Keep exact skin tone; moody grades can drain warmth or over-blue the face.`,
      `Request a thoughtful quiet expression, not exaggerated crying unless you specifically want that.`,
    ],
    faqs: [
      {
        question: `Do I need a rainy night photo already?`,
        answer: `No. A clear portrait is enough; the rain window and lamp glow build when pose is not preserved.`,
      },
      {
        question: `Is this black-and-white?`,
        answer: `No—it stays in colour with moody blue window light and warm amber lamp.`,
      },
      {
        question: `Will clothing stay mine?`,
        answer: `Only if clothing preservation is on. Otherwise it restyles into a simple hoodie look.`,
      },
      {
        question: `Why does it look cheerful?`,
        answer: `Ask for a thoughtful sad expression with rain streaks and soft lamp light, not a bright smile.`,
      },
    ],
    addonLine: `Want a quieter rainy-window mood? Add: keep the rain-streaked glass, warm lamp, and hoodie, but soften blue contrast and use a calmer glance outside—no text overlays or heavy tears.`,
  },
  "attitude-ai-photo-prompt-for-boys-black-outfit": {
    intro: `High-contrast urban attitude for boys: all-black outfit, sunglasses in hand, low-angle shot against a raw grey concrete city wall with hard afternoon shadows. Use one clear chest-up or waist-up photo.`,
    tips: [
      `Waist-up or chest-up sharpness helps the low-angle concrete wall read without cutting the jaw.`,
      `Ask for a raw grey concrete wall and hard afternoon shadows—not soft golden fields.`,
      `Keep exact skin tone under high contrast; attitude grades often crush midtones.`,
      `Sunglasses stay in hand by default for a clear face—say so if the model puts them on.`,
    ],
    faqs: [
      {
        question: `Must my photo already be against a wall?`,
        answer: `No. A clear portrait works; the concrete wall and low angle build when pose is not locked.`,
      },
      {
        question: `Will sunglasses cover my eyes?`,
        answer: `Default keeps sunglasses in hand so the face stays visible. Ask only if you want them worn.`,
      },
      {
        question: `Is this a night neon DP?`,
        answer: `No—this is hard afternoon light on a concrete wall. Neon rim-light DP is a different style.`,
      },
      {
        question: `Outfit colour change?`,
        answer: `Default restyles to all black unless clothing preservation is on.`,
      },
    ],
    addonLine: `Want a quieter concrete attitude frame? Add: keep the all-black outfit, low-angle wall, and sunglasses in hand, but ease hard shadows slightly and calm the stance—no gang props or neon graffiti tags.`,
  },
  "ai-photo-prompt-for-boy-and-girl-standing-together-rooftop": {
    intro: `Boy and girl on a city rooftop at dusk under warm string lights, matching outfits, standing side by side. Upload two clear photos (boy, then girl) or one photo of you both.`,
    tips: [
      `Use one clear photo per person—or one shot of you both—with faces large and sharp, no sunglasses.`,
      `Keep similar light in both sources so dusk string lights do not mismatch skin tones.`,
      `Ask for rooftop terrace string lights and soft skyline bokeh—not an indoor studio.`,
      `Clothing stays by default on this style; turn it off only if you want matching outfits rebuilt.`,
    ],
    faqs: [
      {
        question: `Do we need a rooftop photo already?`,
        answer: `No. Two clear portraits (or one together) work; the dusk rooftop and string lights build when pose is not preserved.`,
      },
      {
        question: `Will both faces stay accurate?`,
        answer: `Yes. Each face, skin tone, age, and hairstyle stay locked, with realistic relative heights.`,
      },
      {
        question: `Is this a monsoon umbrella look?`,
        answer: `No—this is a dry dusk rooftop with string lights. Monsoon umbrella is a rainy street couple style.`,
      },
      {
        question: `Matching outfits required?`,
        answer: `The look aims for matching outfits when clothing is restyled. Keep clothing on to preserve what you wore.`,
      },
    ],
    addonLine: `Want a quieter rooftop dusk? Add: keep both exact faces, string lights, and side-by-side stance, but soften skyline bokeh and use calmer smiles—no extra friends or sparklers.`,
  },
  "aesthetic-ai-photo-editing-prompt-for-boy-and-girl-beach": {
    intro: `Dreamy sunset beach walk for boy and girl: soft waves, low glowing sun, golden haze, light linen outfits. Made from two photos, both faces kept. Upload two clear photos or one of you both.`,
    tips: [
      `Faces must stay large and sharp in each source—golden haze can hide soft or tiny faces.`,
      `Ask for calm sandy beach, soft waves, and golden backlight—not a city rooftop.`,
      `Match lighting across both uploads so one person does not look cooler than the other.`,
      `Clothing preserves by default; turn it off only if you want light linen restyles.`,
    ],
    faqs: [
      {
        question: `Must we already have a beach photo?`,
        answer: `No. Two clear portraits (or one together) work; the sunset beach builds when pose is not locked.`,
      },
      {
        question: `Will faces stay visible in the haze?`,
        answer: `Yes—the style keeps both faces readable. Ask to reduce haze near the eyes if it gets too strong.`,
      },
      {
        question: `Is this a monsoon street couple look?`,
        answer: `No—this is a golden sunset beach walk. Monsoon umbrella uses rain and one shared umbrella.`,
      },
      {
        question: `Heights look wrong?`,
        answer: `Ask for realistic relative heights based on the source photos.`,
      },
    ],
    addonLine: `Want a softer beach haze? Add: keep both exact faces, sunset walk, and light linen mood, but ease backlight intensity and keep a gentle pace—no crowded tourists or neon props.`,
  },
  "ai-photo-prompt-for-boy-and-girl-together-monsoon-umbrella": {
    intro: `Fresh monsoon couple look: boy and girl share one umbrella on a rainy street with wet-road reflections, green trees, and small shops. Upload two clear photos or one of you both.`,
    tips: [
      `Sharp faces without sunglasses work best—rain reflections can hide soft features.`,
      `Ask for one shared umbrella, wet road reflections, and plain shop signboards—no logo spam.`,
      `Keep similar light in both sources so monsoon greys do not mismatch skin tones.`,
      `Request a candid laughing moment, not a stiff studio pose.`,
    ],
    faqs: [
      {
        question: `Do we need a rainy-day photo already?`,
        answer: `No. Two clear portraits (or one together) work; the monsoon street and umbrella build when pose is not preserved.`,
      },
      {
        question: `Two umbrellas or one?`,
        answer: `Default is one shared umbrella for a candid couple frame.`,
      },
      {
        question: `Is this a sunset beach walk?`,
        answer: `No—this is a rainy monsoon street. Beach sunset is a different couple style.`,
      },
      {
        question: `Will outfits stay dry-looking?`,
        answer: `The look uses rain-ready outfits when clothing is restyled. Keep clothing on to preserve what you wore.`,
      },
    ],
    addonLine: `Want a quieter monsoon share? Add: keep both exact faces, one umbrella, and wet street reflections, but soften rain density and keep a natural laugh—no flooded streets or extra strangers crowding in.`,
  },
  "dp-ai-photo-prompt-for-boys-neon-rim-light": {
    intro: `Instagram DP close-up for boys: sharp square crop, dual-colour shirt, pink and blue neon rim light on a plain dark studio backdrop. Upload one clear chest-up or waist-up photo.`,
    tips: [
      `Front or slight three-quarter face sharpness matters more than background for DP crops.`,
      `Ask for pink-and-blue neon rim light and a plain dark studio gradient—not a busy street.`,
      `Keep exact skin tone under neon; pink-blue rims often tint cheeks unnaturally.`,
      `Request a square profile-ready crop so eyes stay centred after Instagram masking.`,
    ],
    faqs: [
      {
        question: `Do I need a studio photo already?`,
        answer: `No. A clear chest-up portrait works; the dark backdrop and neon rim build when pose is not locked.`,
      },
      {
        question: `Is this a full-body street attitude shot?`,
        answer: `No—this is a square close-up DP with neon rim light, not a low-angle concrete wall look.`,
      },
      {
        question: `Will my shirt colour stay?`,
        answer: `Only if clothing preservation is on. Otherwise it restyles into a dual-colour shirt.`,
      },
      {
        question: `Why does neon turn my skin purple?`,
        answer: `Ask for rim light that keeps exact skin tone on the face, with colour mostly on the outline.`,
      },
    ],
    addonLine: `Want a cleaner neon DP? Add: keep the dual-colour shirt, pink-blue rim light, and dark studio backdrop, but lower rim intensity slightly and keep a calm expression—no text stickers or extra props.`,
  },
  "luxury-life-cinematic-night-ai-photo-prompt": {
    intro: `Moody cinematic night luxury: city terrace with string lights, dark railing, glowing skyline bokeh, and premium fabric textures. Upload one clear waist-up photo of one person.`,
    tips: [
      `Waist-up sharpness keeps premium fabric texture readable against skyline bokeh.`,
      `Ask for a night city terrace with string lights and dark railing—not a bright hotel lobby.`,
      `Keep exact skin tone under cinematic night grade; teal-orange looks often shift complexions.`,
      `Solo only—say one person if extras appear in the terrace bokeh.`,
    ],
    faqs: [
      {
        question: `Must I already be on a terrace at night?`,
        answer: `No. A clear waist-up portrait works; the night terrace and skyline bokeh build when pose is not preserved.`,
      },
      {
        question: `Is this a daytime house terrace?`,
        answer: `No—this is cinematic night colour on a city terrace. Daylight house terrace is a different style.`,
      },
      {
        question: `Will famous towers be named?`,
        answer: `No. Use soft glowing skyline bokeh only—avoid naming hotels or landmarks.`,
      },
      {
        question: `Outfit too flashy?`,
        answer: `Ask for premium fabric textures with a quieter cut while locking face and skin tone.`,
      },
    ],
    addonLine: `Want a quieter cinematic terrace night? Add: keep the string lights, dark railing, and premium fabrics, but soften skyline bokeh and ease the colour grade—no champagne trays or named landmarks.`,
  },
  "quiet-luxury-terrace-women": {
    intro: `Quiet-luxury evening terrace for women: muted knit or silk, soft city bokeh, dark blue dusk sky, modest composed pose. Upload one clear waist-up photo of an adult woman.`,
    tips: [
      `Waist-up sharpness lets muted knit or silk texture read without competing with city lights.`,
      `Ask for an evening terrace with soft city bokeh—not a loud party balcony.`,
      `Keep exact skin tone and hairstyle or head covering under warm golden evening light.`,
      `Request a quiet composed pose; avoid asking for heavy jewellery stacks that break the quiet-luxury mood.`,
    ],
    faqs: [
      {
        question: `Do I need a terrace photo already?`,
        answer: `No. A clear waist-up portrait works; the evening terrace and city bokeh build when pose is not locked.`,
      },
      {
        question: `Is this a Dubai skyline balcony?`,
        answer: `No—this is a general quiet-luxury dusk terrace. Dubai balcony emphasises a generic Middle-Eastern skyline.`,
      },
      {
        question: `Will my head covering stay?`,
        answer: `Yes. Hairstyle or head covering stays, along with face, skin tone, and glasses if worn.`,
      },
      {
        question: `Outfit too bright?`,
        answer: `Ask for muted knit or silk in a quiet palette while keeping your exact face.`,
      },
    ],
    addonLine: `Want an even quieter dusk terrace? Add: keep the muted knit or silk, evening terrace, and soft city bokeh, but lower light intensity and use a calmer lean on the railing—no logos, champagne, or loud statement jewellery.`,
  },
  "dubai-balcony-women-lifestyle": {
    intro: `Women’s luxury balcony at dusk: elevated view over a soft generic Middle-Eastern city skyline, modest casual-luxury outfit, warm city-light ambience. Upload one clear waist-up photo of an adult woman.`,
    tips: [
      `Waist-up framing keeps the skyline as soft ambience behind a sharp face.`,
      `Ask for a generic Middle-Eastern skyline only—no named towers, hotels, or brands.`,
      `Keep exact skin tone under warm golden dusk; city lights often orange the face.`,
      `If the skyline dominates, request softer distant lights and stronger subject focus.`,
    ],
    faqs: [
      {
        question: `Will famous landmarks appear?`,
        answer: `No. The prompt uses a generic skyline only—do not name or depict specific towers or hotels.`,
      },
      {
        question: `Is this the quiet-luxury terrace page?`,
        answer: `Quiet-luxury terrace is a general dusk city bokeh look. This one emphasises a Middle-Eastern skyline balcony for women.`,
      },
      {
        question: `Do I need a balcony photo already?`,
        answer: `No. A clear waist-up portrait works; the dusk balcony skyline builds when pose is not preserved.`,
      },
      {
        question: `Outfit too formal?`,
        answer: `Ask for modest casual-luxury styling while locking face, skin tone, and head covering if worn.`,
      },
    ],
    addonLine: `Want a quieter Dubai-dusk balcony? Add: keep the elevated balcony, generic Middle-Eastern skyline ambience, and modest casual-luxury outfit, but soften warm city lights and calm the pose—no named landmarks, logos, or champagne props.`,
  },
  "businessman-lifestyle-lounge-ai-photo-prompt": {
    intro: `Businessman lifestyle in a glass lounge: open-collar shirt and blazer, soft leather seating, warm lamps, city view through floor-to-ceiling windows—success vibe, not a CV headshot. Use one clear waist-up photo of an adult man.`,
    tips: [
      `Waist-up sharpness shows the open-collar blazer without a passport-crop feel.`,
      `Ask for a modern glass lounge with warm lamps and soft leather—not a white studio backdrop.`,
      `Keep exact skin tone under warm lamp light; lounge grades can orange the face.`,
      `Say relaxed lifestyle pose, not stiff LinkedIn or passport stance.`,
    ],
    faqs: [
      {
        question: `Is this a LinkedIn headshot?`,
        answer: `No—it is a lifestyle success portrait in a lounge, not a CV or passport crop.`,
      },
      {
        question: `Must I already be in an office lounge?`,
        answer: `No. A clear waist-up portrait works; the glass lounge builds when pose is not locked.`,
      },
      {
        question: `Tie required?`,
        answer: `Default is open-collar shirt with blazer—no tie. Ask only if you want one.`,
      },
      {
        question: `Will my beard stay?`,
        answer: `Yes. Face, skin tone, hair, and beard stay locked unless you change preservation settings.`,
      },
    ],
    addonLine: `Want a quieter lounge success frame? Add: keep the open-collar blazer, glass lounge, and warm lamps, but soften window city blur and ease the pose—no laptop props, name badges, or CV headshot framing.`,
  },
  "old-money-aesthetic-portrait-ai-photo-prompt": {
    intro: `Quiet old-money portrait: neutral knit or wool on soft estate garden stone steps, trimmed hedges, muted greenery, gentle daylight, no logos. Upload one clear waist-up photo of one person.`,
    tips: [
      `Waist-up sharpness lets knit or wool texture read against soft garden hedges.`,
      `Ask for estate garden stone steps and muted greenery—not a neon city street.`,
      `Keep exact skin tone under soft heritage daylight; warm grades can lighten faces.`,
      `Avoid logo or badge requests on clothing—old-money stays quiet, unbranded, and logo-free.`,
    ],
    faqs: [
      {
        question: `Do I need a garden photo already?`,
        answer: `No. A clear waist-up portrait works; the estate garden steps build when pose is not preserved.`,
      },
      {
        question: `Is this the women’s old-money garden page?`,
        answer: `That page is tuned for women in cream or neutral wool or linen. This one is a general old-money aesthetic for one person.`,
      },
      {
        question: `Will brand logos appear?`,
        answer: `No. Ask again if any logo or badge creeps onto clothing.`,
      },
      {
        question: `Outfit too loud?`,
        answer: `Ask for quiet neutral knit or wool while locking your exact face and skin tone.`,
      },
    ],
    addonLine: `Want an even quieter estate-step frame? Add: keep the neutral knit or wool, stone steps, and trimmed hedges, but soften daylight contrast and use a calmer seated pose—no logos, flashy watches, or party décor.`,
  },
  "old-money-garden-women": {
    intro: `Old-money garden editorial for women: cream or neutral wool or linen on estate stone steps, soft trees, cream daylight, quiet heritage palette—no saree or logos. Upload one clear waist-up photo of an adult woman.`,
    tips: [
      `Waist-up framing shows cream wool or linen cleanly against soft garden trees.`,
      `Ask for quiet estate garden stone steps and cream daylight—not a festive courtyard.`,
      `Keep exact skin tone and hairstyle or head covering; soft grades can bleach complexions.`,
      `Skip saree or logo requests—this page stays cream or neutral wool or linen only.`,
    ],
    faqs: [
      {
        question: `Must my photo already show a garden?`,
        answer: `No. A clear waist-up portrait works; the estate garden steps build when pose is not locked.`,
      },
      {
        question: `Is a saree included?`,
        answer: `No—this look uses cream or neutral wool or linen only, not a saree.`,
      },
      {
        question: `General old-money portrait instead?`,
        answer: `The general old-money aesthetic page is for one person in neutral knit or wool. This page is women-specific garden editorial.`,
      },
      {
        question: `Will my head covering stay?`,
        answer: `Yes. Face, skin tone, hairstyle or head covering, and glasses if worn all stay locked.`,
      },
    ],
    addonLine: `Want a softer heritage garden frame? Add: keep the cream or neutral wool or linen, stone steps, and quiet trees, but ease daylight contrast and use a calmer seated pose—no logos, saree drape, or party florals.`,
  },
  "luxury-house-terrace-solo-ai-photo-prompt": {
    intro: `Person-forward luxury house terrace: modern light stone flooring, slim railing, soft greenery, bright daylight, elevated casual outfit. Not an interior redesign. Upload one clear waist-up or full-length photo.`,
    tips: [
      `Standing waist-up or full-length sources fit the terrace railing pose better than tiny distant faces.`,
      `Ask for a modern house terrace with light stone and slim railing—not a redesigned living room.`,
      `Keep exact skin tone under bright daylight; outdoor grades often lighten faces.`,
      `Remind that you are the subject—if furniture dominates, ask for person-forward framing.`,
    ],
    faqs: [
      {
        question: `Will my house interior be redesigned?`,
        answer: `No. This is a person-forward terrace portrait, not a room makeover look.`,
      },
      {
        question: `Do I need a terrace photo already?`,
        answer: `No. A clear standing portrait works; the modern terrace builds when pose is not preserved.`,
      },
      {
        question: `Is this cinematic night city terrace?`,
        answer: `No—this is bright daylight on a modern house terrace. Cinematic night luxury is a different mood.`,
      },
      {
        question: `Outfit too formal?`,
        answer: `Ask for elevated casual styling while locking face, hair, and skin tone.`,
      },
    ],
    addonLine: `Want a quieter daylight terrace? Add: keep the modern house terrace, slim railing, and elevated casual outfit, but soften bright sky contrast and use a calmer standing pose—no interior redesign or cluttered furniture stacks.`,
  },
  "luxury-editorial-magazine-ai-photo-prompt": {
    intro: `Magazine-style solo editorial: clean pale stone backdrop, premium wardrobe, soft fashion light, elegant warm grade. Upload one clear chest-up or waist-up photo of one person.`,
    tips: [
      `Chest-up or waist-up sharpness matters—editorial crops amplify soft faces.`,
      `Ask for a clean pale stone backdrop with soft shadow falloff—not a busy location set.`,
      `Keep exact skin tone and natural texture; fashion light can over-smooth faces.`,
      `Turn clothing on only to keep your real outfit; otherwise accept the premium wardrobe restyle.`,
    ],
    faqs: [
      {
        question: `Do I need a studio photo already?`,
        answer: `No. A clear chest-up or waist-up portrait works; the pale editorial backdrop builds when pose is not locked.`,
      },
      {
        question: `Is this a lifestyle terrace look?`,
        answer: `No—this is a clean magazine editorial with a pale backdrop, not a balcony or terrace scene.`,
      },
      {
        question: `Will my face stay the same?`,
        answer: `Yes. Face, skin tone, hair, and beard stay locked; only wardrobe, light, and backdrop shift.`,
      },
      {
        question: `Why does skin look plastic?`,
        answer: `Ask for natural skin texture with soft fashion light—no heavy beauty smoothing.`,
      },
    ],
    addonLine: `Want a quieter magazine finish? Add: keep the pale stone backdrop, premium wardrobe, and soft fashion light, but lower contrast slightly and keep natural skin texture—no glitter overlays or extreme beauty smoothing.`,
  },
  "golden-motion-glamour": {
    intro: `Champagne-gold sequined saree with motion-blur event lights: festive glam from one clear portrait, face kept sharp while golden streaks rush past.`,
    tips: [
      `Use a sharp face-forward portrait; motion blur is for the festive background only, not your eyes or jewellery.`,
      `Ask for a champagne-gold sequined saree with fitted long-sleeve blouse and oversized gold hoops if embroidery smears.`,
      `If anonymous crowd shapes turn into clear strangers, request soft distant figures only with no readable faces.`,
      `Keep clothing off for the saree restyle; turn it on only if you must keep what you already wore.`,
    ],
    faqs: [
      {
        question: `Will my face also go blurry?`,
        answer: `No. Motion blur belongs on the festive background and light streaks; your face, eyes, and jewellery should stay crisp.`,
      },
      {
        question: `Do I need a saree photo already?`,
        answer: `No. A clear everyday portrait works; the champagne-gold saree builds when clothing is not preserved.`,
      },
      {
        question: `Is this an outdoor street look?`,
        answer: `No—it is an indoor festive event with glowing golden lights and reflective surfaces.`,
      },
      {
        question: `Can I keep my own jewellery?`,
        answer: `Turn clothing/jewellery preservation on, or ask to keep specific pieces while locking face and skin tone.`,
      },
    ],
    addonLine: `Want a quieter golden event glow? Add: keep the champagne-gold saree, sharp face, and horizontal light streaks, but soften the crowd shapes and ease rim light on the hair—no extra jewellery stacks or readable guest faces.`,
  },
  "blue-note-scrapbook": {
    intro: `Pastel scrapbook collage on graph paper: layered photo cutouts, pale-blue tape, torn notes and soft doodles from one clear portrait.`,
    tips: [
      `Upload one sharp portrait; the look builds several crops of the same face across one scrapbook page.`,
      `Ask for off-white graph paper, pale-blue tape, and short handwritten notes if decorations turn into neon stickers.`,
      `If faces drift between cutouts, request the same person, hairstyle, and skin tone in every photo.`,
      `Keep clothing off for the blush-pink striped shirt restyle unless you want your real outfit in every panel.`,
    ],
    faqs: [
      {
        question: `Do I need many photos already?`,
        answer: `No. One clear portrait is enough; the prompt creates several cutouts of the same person on one page.`,
      },
      {
        question: `Will every face look like me?`,
        answer: `It should. If any crop drifts, ask to keep exact identity, hairstyle, and skin tone in all panels.`,
      },
      {
        question: `Can the notes stay blank?`,
        answer: `Yes—ask for torn paper cards with minimal or no writing so portraits stay the focus.`,
      },
      {
        question: `Is this a three-panel fashion triptych?`,
        answer: `No—this is a pastel scrapbook collage with tape, doodles, and paper notes.`,
      },
    ],
    addonLine: `Want a calmer diary page? Add: keep the graph-paper scrapbook, pale-blue tape, and layered cutouts of the same face, but thin out doodles and dried flowers slightly—no social-media UI icons or mismatched versions of you.`,
  },
  "dreamy-floral-warp": {
    intro: `Wide-angle floral selfie with soft pink-white blooms and liquid-wave warp around a sharp face—spring pastel mood from one clear portrait.`,
    tips: [
      `Face must stay sharp; ask for warp only in the flowers and liquid edges, never across eyes or mouth.`,
      `Request soft yellow shirt over white inner top with light-wash jeans if the casual look goes formal.`,
      `If flowers smear into plastic blobs, ask for soft pink and white blooms with fresh botanical greens.`,
      `Keep pose off for the immersive selfie angle; turn clothing on only to keep your real outfit.`,
    ],
    faqs: [
      {
        question: `Will the warp melt my face?`,
        answer: `It should not. Ask for a sharp face with liquid warp only in the surrounding flowers and colour waves.`,
      },
      {
        question: `Do I need a garden photo?`,
        answer: `No. A clear indoor selfie works; the immersive floral garden builds when pose is not preserved.`,
      },
      {
        question: `Is this the daisy field outdoor look?`,
        answer: `No—daisy drift is open blue sky with white daisies. This is a dreamy floral frame with liquid warp.`,
      },
      {
        question: `Outfit too dressy?`,
        answer: `Ask for the relaxed soft-yellow shirt and light-wash jeans while locking face and skin tone.`,
      },
    ],
    addonLine: `Want a gentler spring warp? Add: keep the pink-white floral garden and sharp face, but soften the liquid-wave distortions and keep blooms slightly farther from the cheeks—no heavy glitter overlays or extra people.`,
  },
  "sunlit-bouquet-triptych": {
    intro: `Warm three-panel bouquet story: one wide top frame and two bottom candid panels with roses, afternoon window light, and soft film grain.`,
    tips: [
      `One sharp portrait is enough; the look builds three matching candid moments with the same bouquet.`,
      `Ask for blush and deep-red roses with baby's-breath if the flowers turn into random mixed props.`,
      `If panels show different people, request identical face, hair, and charcoal hoodie across all three.`,
      `Keep pose off so the looking-down, hair-touch, and bouquet-hug moments can form.`,
    ],
    faqs: [
      {
        question: `Must I already hold flowers?`,
        answer: `No. A clear portrait works; the wrapped rose bouquet is added when props and pose are not locked.`,
      },
      {
        question: `Why do the three faces look different?`,
        answer: `Ask for the same identity, hairstyle, and skin tone in every panel with matching warm sunlight.`,
      },
      {
        question: `Is this the amber wall-shadow triptych?`,
        answer: `No—amber shadow is close-up fashion with cast wall shadows. This is a romantic bouquet story in three panels.`,
      },
      {
        question: `Can I keep my own hoodie?`,
        answer: `Yes—preserve clothing, or ask to keep your real top while the bouquet and window light build.`,
      },
    ],
    addonLine: `Want a quieter bouquet afternoon? Add: keep the three-panel layout, rose bouquet, and warm window shadows, but soften film grain and use calmer smiles—no text stickers or extra guests in any panel.`,
  },
  "monochrome-echo-trio": {
    intro: `Black-and-white beauty echo: one sharp foreground portrait with two larger faded exposures of the same face on a soft off-white studio backdrop.`,
    tips: [
      `Use a clear chest-up portrait so the main face stays sharp against the two ghosted echoes.`,
      `Ask for high-contrast monochrome with silver-gray midtones if colour or heavy tint creeps back in.`,
      `If the rear faces become strangers, request two translucent enlargements of the exact same person.`,
      `Keep styling minimal; turn clothing on only if you must keep your real outfit under the monochrome grade.`,
    ],
    faqs: [
      {
        question: `Do I need three separate photos?`,
        answer: `No. One clear portrait is enough; the prompt builds the main face plus two faded echoes.`,
      },
      {
        question: `Will skin stay realistic in black and white?`,
        answer: `Ask for natural skin texture with soft silver midtones—no plastic smoothing under the monochrome grade.`,
      },
      {
        question: `Is this the golden saree motion look?`,
        answer: `No—this is a timeless monochrome multi-exposure beauty set, not festive colour glam.`,
      },
      {
        question: `Why does one echo look blurred?`,
        answer: `Rear exposures should be soft and translucent; only the foreground portrait needs razor-sharp eyes.`,
      },
    ],
    addonLine: `Want a softer noir echo? Add: keep the sharp main portrait and two faded rear exposures of the same face, but lighten charcoal blacks slightly and keep grain subtle—no colour props or text overlays.`,
  },
  "sunlit-daisy-drift": {
    intro: `Bright outdoor daisy portrait against vivid blue sky: dense white blooms, navy zip hoodie, warm sun on skin from one clear selfie.`,
    tips: [
      `Prefer a sharp face with good daylight skin; ask for warm golden highlights that keep exact skin tone.`,
      `Request dense white daisies with yellow centres and large near-lens blur if flowers look sparse or fake.`,
      `If the sky goes grey or neon, ask for open vivid blue with soft white clouds only.`,
      `Keep clothing off for the midnight-blue zip hoodie; turn it on only to keep your real top.`,
    ],
    faqs: [
      {
        question: `Do I need a photo already taken in a field?`,
        answer: `No. A clear portrait works; the daisy field and blue sky build when background is not preserved.`,
      },
      {
        question: `Will my face stay the same under bright sun?`,
        answer: `Ask to keep exact skin tone and facial features—bright outdoor grades sometimes lighten complexions.`,
      },
      {
        question: `Is this the dreamy floral warp selfie?`,
        answer: `No—floral warp uses liquid distortions indoors around pink blooms. This is open sky with daisies.`,
      },
      {
        question: `Hoodie colour wrong?`,
        answer: `Ask for a deep navy or midnight-blue zip-front hoodie with a soft structured hood.`,
      },
    ],
    addonLine: `Want a quieter daisy field frame? Add: keep the navy zip hoodie, blue sky, and white daisy surround, but pull large blooms slightly farther from the face and ease sun intensity—no festival props or text banners.`,
  },
  "amber-shadow-triptych": {
    intro: `Three stacked amber fashion panels on a warm beige wall: hard side sun, sharp head-and-shoulder cast shadows, and close editorial poses from one photo.`,
    tips: [
      `Chest-up sharpness matters; each panel needs clear eyes under strong directional light.`,
      `Ask for a matte warm beige wall with bold cast shadows of head and shoulders if the backdrop goes busy.`,
      `If identity drifts between panels, request the same face, wet-textured hair, and dark collared shirt in all three.`,
      `Keep pose off so the frontal, over-shoulder, and tight close-up stack can form.`,
    ],
    faqs: [
      {
        question: `Must my photo already show hard shadows?`,
        answer: `No. A clear portrait is enough; the directional sun and cast wall shadows build with the triptych.`,
      },
      {
        question: `Why do the three faces look different?`,
        answer: `Ask for identical identity, hairstyle, and skin tone across all panels with the same light direction.`,
      },
      {
        question: `Is this the bouquet triptych?`,
        answer: `No—bouquet triptych is romantic flower storytelling. This is amber wall-light fashion with cast shadows.`,
      },
      {
        question: `Can I keep my beard?`,
        answer: `Yes. Hairstyle and facial hair stay; only wardrobe, light, and panel layout change unless you lock clothing.`,
      },
    ],
    addonLine: `Want a quieter amber contact sheet? Add: keep the three horizontal panels, beige wall, and sharp cast shadows, but soften chocolate contrast slightly and calm the gaze—no scrapbook tape or colourful props.`,
  },
  "golden-boho-storyboard": {
    intro: `Golden-hour boho street storyboard in a two-by-two grid: floral camisole, jeans, woven bag, and sun-dappled tree-lined pavement from one portrait.`,
    tips: [
      `One clear portrait feeds all four panels—ask for the same face and long loose waves in every square.`,
      `Request a rust or brown floral camisole, light jeans, stacked bangles, and woven bag if styling drifts formal.`,
      `If the street looks empty or fake, ask for tree-lined residential pavement with leafy dappled light.`,
      `Keep pose off for the walk, reading, hand-detail, and back-view moments.`,
    ],
    faqs: [
      {
        question: `Do I need four photos already?`,
        answer: `No. One clear portrait is enough; the prompt builds four candid lifestyle panels of the same person.`,
      },
      {
        question: `Will every panel look like me?`,
        answer: `It should. If one square drifts, ask for identical face, hair, and skin tone across the grid.`,
      },
      {
        question: `Is this the tall-grass meadow portrait?`,
        answer: `No—meadow reverie is a single moody hillside frame. This is a four-panel golden-hour street storyboard.`,
      },
      {
        question: `Can I remove the little heart icons?`,
        answer: `Yes—ask for a clean collage with no emoji accents while keeping the book and street moments.`,
      },
    ],
    addonLine: `Want a calmer golden afternoon collage? Add: keep the two-by-two grid, tree-lined street, and boho floral top, but thin out playful emoji accents and soften sun glare—no busy markets or night neon.`,
  },
  "meadow-reverie": {
    intro: `Moody hillside meadow portrait in tall wild grass under a cloudy sky: white rolled-sleeve shirt, dark denim, beige cap, calm outdoor editorial from one selfie.`,
    tips: [
      `Use a sharp face with natural skin; muted earthy grades sometimes flatten features—ask to keep likeness.`,
      `Request seated pose in tall wild grass with a bare tree and cloudy sky if the field looks manicured.`,
      `If the outfit goes shiny or formal, ask for a relaxed white button-up, loose dark denim, and light beige cap.`,
      `Keep pose off for the meadow sit; turn clothing on only to keep your real clothes.`,
    ],
    faqs: [
      {
        question: `Do I need a photo already taken in a meadow?`,
        answer: `No. A clear portrait works; the grassy hillside and cloudy sky build when background is not preserved.`,
      },
      {
        question: `Will the cap change my hair?`,
        answer: `Hair under the cap should still match your real style and colour; ask to preserve hairline and length.`,
      },
      {
        question: `Is this the golden-hour boho street collage?`,
        answer: `No—that is a four-panel street storyboard. This is one moody meadow portrait in tall grass.`,
      },
      {
        question: `Skin looking too pale or grey?`,
        answer: `Ask for muted earthy grading that keeps your exact skin tone and natural texture.`,
      },
    ],
    addonLine: `Want a quieter windy meadow frame? Add: keep the tall wild grass, cloudy hillside, and white button-up with beige cap, but soften contrast and ease wind on the hair—no bright flower overlays or sunny blue-sky filters.`,
  },
  "tactical-hero-agent-ai-photo-prompt": {
    intro: `Semi-real cel-shaded tactical game hero mid-ability blast: tech jacket, glowing energy, futuristic arena—your face, skin tone and hairstyle locked.`,
    tips: [
      `Upload a clear chest-up photo with face fully visible; action blur should not wipe eyes or jaw.`,
      `Ask for an original teal-violet tech jacket and crackling energy blast with no franchise logos or emblems.`,
      `If the arena looks empty, request glowing floor lines, floating hexagon barriers, and a hazy skyline.`,
      `Keep clothing and pose off so the sprinting ability-burst pose can build.`,
    ],
    faqs: [
      {
        question: `Will I still look like myself in game art?`,
        answer: `Yes—ask to keep face shape, skin tone, hairstyle, and any beard or glasses even under cel shading.`,
      },
      {
        question: `Do I need an action photo already?`,
        answer: `No. A calm chest-up portrait works; the sprinting ability pose builds when pose is not preserved.`,
      },
      {
        question: `Is this the armored rooftop superhero look?`,
        answer: `No—that is live-action tech armor on a dusk rooftop. This is cel-shaded arena game-hero energy.`,
      },
      {
        question: `Why did a logo appear on the jacket?`,
        answer: `Ask for an original unbranded tech jacket with abstract panels only—no emblems or franchise marks.`,
      },
    ],
    addonLine: `Want a tighter arena blast? Add: keep the cel-shaded tech jacket, forward energy burst, and glowing floor lines, but ease particle sparkwalls and keep rim light modest—no blood, guns aimed at camera, or brand emblems.`,
  },
  "fantasy-druid-forest-ai-photo-prompt": {
    intro: `Fierce twilight druid under a giant mossy canopy: leaf-and-bark armor, glowing green rune magic, fireflies—your real face and skin tone kept.`,
    tips: [
      `Chest-up sharpness helps rune glow stay around the hands without melting facial features.`,
      `Ask for leaf-and-bark armor and green nature runes if the outfit turns into plain fantasy robes.`,
      `If the forest looks thin, request huge mossy roots, hanging vines, and firefly swarms at dusk.`,
      `Keep clothing off for the druid armor restyle; preserve hair and any head covering.`,
    ],
    faqs: [
      {
        question: `Do I need a forest photo already?`,
        answer: `No. A clear chest-up portrait works; the ancient canopy and vines build when background is not preserved.`,
      },
      {
        question: `Will magic light change my skin tone?`,
        answer: `Ask to keep exact skin tone; green rune light should rim hands and armor, not bleach the face.`,
      },
      {
        question: `Is this the misty dawn monk look?`,
        answer: `No—monk meditation is a calm cliff-ledge sunrise. This is an active twilight forest spell cast.`,
      },
      {
        question: `Armor looking plastic?`,
        answer: `Ask for realistic leaf, bark, and moss textures with soft dusk light on the materials.`,
      },
    ],
    addonLine: `Want a quieter canopy casting? Add: keep the leaf-and-bark armor, green rune glow, and giant twilight roots, but soften firefly density and ease spell brightness near the face—no modern weapons or neon city props.`,
  },
  "monk-meditating-misty-dawn-ai-photo-prompt": {
    intro: `Calm dawn meditation on a cliff ledge above a misty mountain valley: simple robe, soft gold sunrise, layered peaks—your face kept recognizable.`,
    tips: [
      `Use a clear chest-up photo; serene looks fail when eyes or jaw are soft or cropped.`,
      `Ask for a simple robe and seated cliff-edge meditation if the pose turns into a standing action stance.`,
      `If mist becomes foggy mush, request layered distant peaks with soft gold sunrise and readable valley depth.`,
      `Keep clothing and pose off so the calm dawn scene can form.`,
    ],
    faqs: [
      {
        question: `Must my photo already show meditation?`,
        answer: `No. Everyday portraits work; the cliff-ledge meditation pose builds when pose is not preserved.`,
      },
      {
        question: `Will my hair or beard stay?`,
        answer: `Yes—hairstyle, beard, glasses, or head covering stay while the robe and misty valley change.`,
      },
      {
        question: `Is this the storm hammer warrior cliff?`,
        answer: `No—storm warrior is battle-cry lightning drama. This is soft misty dawn stillness.`,
      },
      {
        question: `Valley looking flat?`,
        answer: `Ask for layered mountain peaks, soft gold sunrise, and gentle mist between ridges.`,
      },
    ],
    addonLine: `Want an even quieter dawn sit? Add: keep the simple robe, cliff ledge, and misty valley sunrise, but lower gold intensity and calm the expression further—no floating weapons, neon runes, or storm lightning.`,
  },
  "astronomer-observatory-ai-photo-prompt": {
    intro: `Twilight observatory portrait at a brass telescope under an open dome: meteor shower sky, star charts, warm lamp gold—your face locked.`,
    tips: [
      `Chest-up clarity matters beside metal telescope detail; soft faces fight the lamp highlights.`,
      `Ask for a brass telescope, open dome slit, and meteor streaks if props turn into random gadgets.`,
      `If the sky stays daytime blue, request deep twilight indigo with warm brass lamp light.`,
      `Keep clothing off for the astronomer restyle; preserve glasses if you wear them in the source.`,
    ],
    faqs: [
      {
        question: `Do I need a telescope in my photo?`,
        answer: `No. A clear portrait works; the brass telescope and open dome build when pose is not preserved.`,
      },
      {
        question: `Will my glasses stay?`,
        answer: `Yes if they are in the source—ask to keep glasses, skin tone, and hairstyle while the scene changes.`,
      },
      {
        question: `Is this the cosmic energy space hero?`,
        answer: `No—cosmic hero floats in deep space with nebula energy. This is an old observatory dome at twilight.`,
      },
      {
        question: `Sky looking empty?`,
        answer: `Ask for a deep twilight sky with a gentle meteor shower and warm brass lamps inside the dome.`,
      },
    ],
    addonLine: `Want a quieter dome night? Add: keep the brass telescope, open observatory slit, and warm lamp glow, but thin the meteor shower and soften lamp bloom on the face—no spaceship cockpits or neon city signs.`,
  },
  "sky-pirate-captain-ai-photo-prompt": {
    intro: `Golden-hour sky pirate at the helm of a wooden flying galleon above the clouds: long captain's coat, wind and spray—your real face kept.`,
    tips: [
      `Use a sharp chest-up portrait so wind-blown hair and coat details do not erase your likeness.`,
      `Ask for a wooden flying galleon deck, billowing sails, and sea-of-clouds horizon if it becomes a normal ship at sea.`,
      `If the coat turns into modern streetwear, request a long original captain's coat with no franchise marks.`,
      `Keep clothing and pose off for the helm stance in golden-hour wind.`,
    ],
    faqs: [
      {
        question: `Do I need a ship photo already?`,
        answer: `No. A clear portrait works; the flying galleon deck and cloud sea build when background is not preserved.`,
      },
      {
        question: `Will I look older or weathered against my will?`,
        answer: `Ask to keep exact apparent age and skin tone—adventure light should not age you up.`,
      },
      {
        question: `Is this a sea pirate on water?`,
        answer: `No—this is a sky pirate above the clouds at golden hour, not an ocean-surface ship.`,
      },
      {
        question: `Coat looking branded?`,
        answer: `Ask for an original unbranded captain's coat with no logos, emblems, or franchise costumes.`,
      },
    ],
    addonLine: `Want a calmer cloud voyage? Add: keep the flying galleon helm, long captain's coat, and golden-hour cloud sea, but ease wind spray and soften rim light—no skull flags with logos or modern city skylines.`,
  },
  "armored-tech-superhero-ai-photo-prompt": {
    intro: `Original low-profile tech armor, bare head and high collar, striding a dusk city rooftop in graphite and electric blue—your face fully visible.`,
    tips: [
      `Face must stay uncovered and sharp; ask for no helmet so identity reads clearly.`,
      `Request matte graphite plating with electric-blue accents if the suit goes shiny chrome or logo-covered.`,
      `If the rooftop looks empty, ask for glowing skyscrapers, wind-blown haze, and a dramatic dusk sky.`,
      `Keep clothing and pose off for the rooftop stride.`,
    ],
    faqs: [
      {
        question: `Will a helmet cover my face?`,
        answer: `No—this look keeps a bare head and high collar so your real face stays visible.`,
      },
      {
        question: `Do I need a rooftop photo already?`,
        answer: `No. A clear chest-up portrait works; the dusk rooftop and skyline build when pose is not preserved.`,
      },
      {
        question: `Is this the night cape ledge hero?`,
        answer: `No—cape ledge is a crouched night skyline poster. This is low-profile tech armor walking at dusk.`,
      },
      {
        question: `Armor looking like a known character?`,
        answer: `Ask for original matte graphite plating with no logos, emblems, or copied costumes.`,
      },
    ],
    addonLine: `Want a quieter dusk stride? Add: keep the bare-head tech armor, high collar, and graphite-blue rooftop walk, but soften electric glow lines and ease wind haze—no helmets, franchise emblems, or daylight beach props.`,
  },
  "rooftop-skyline-superhero-ai-photo-prompt": {
    intro: `Caped hero crouched on a skyscraper ledge at night: original suit, whipping cape, searchlights and drifting clouds—your face and skin tone locked.`,
    tips: [
      `Chest-up sharpness beats tiny distant figures; the ledge crop needs readable eyes.`,
      `Ask for an original caped suit with no franchise emblems if logos appear on the chest.`,
      `If the city looks daytime, request night blue-and-gold glow with searchlights and drifting clouds.`,
      `Keep pose off for the wind-whipped crouch on the ledge.`,
    ],
    faqs: [
      {
        question: `Do I need a night city photo already?`,
        answer: `No. A clear portrait works; the skyscraper ledge and night skyline build when background is not preserved.`,
      },
      {
        question: `Will my face stay uncovered?`,
        answer: `Yes—ask for no mask or helmet so face, skin tone, and hairstyle stay recognizable.`,
      },
      {
        question: `Is this the glass-tower wall climber?`,
        answer: `No—tower climber clings to a glass wall above neon streets. This is a caped crouch on a ledge.`,
      },
      {
        question: `Cape looking stiff?`,
        answer: `Ask for a long cape whipping in night wind with soft fabric folds and rim light.`,
      },
    ],
    addonLine: `Want a calmer night ledge? Add: keep the original caped suit, skyscraper crouch, and glowing city lights, but ease searchlight beams and soften cape whip—no helmets covering the face or brand logos on the chest.`,
  },
  "glass-tower-climber-night-hero-ai-photo-prompt": {
    intro: `Night hero clinging to a glass-and-steel tower wall above neon streets: sleek original suit, motion blur, teal city glow—your face kept.`,
    tips: [
      `Face must stay sharp against motion blur on traffic trails—ask for blur only in distant lights.`,
      `Request a wall-climbing pose on glass panels between neon towers if it becomes a flat rooftop stand.`,
      `If neon turns pink-purple mush, ask for teal night glow with readable skyscraper edges.`,
      `Keep clothing off for the sleek original suit; preserve hair and any head covering.`,
    ],
    faqs: [
      {
        question: `Will motion blur ruin my face?`,
        answer: `It should not. Ask for a sharp face with motion blur only on distant traffic light trails.`,
      },
      {
        question: `Do I need a climbing photo already?`,
        answer: `No. A calm chest-up portrait works; the wall-cling pose builds when pose is not preserved.`,
      },
      {
        question: `Is this the rainy gargoyle vigilante?`,
        answer: `No—vigilante sits on a gothic gargoyle in rain. This is a glass tower climb above neon streets.`,
      },
      {
        question: `Suit looking branded?`,
        answer: `Ask for an original sleek suit with no logos, chest emblems, or copied costumes.`,
      },
    ],
    addonLine: `Want a tighter neon climb? Add: keep the sleek original suit, glass-wall cling, and neon tower trails, but ease motion blur near the face and soften neon bloom—no flowers, daylight parks, or franchise emblems.`,
  },
  "caped-night-vigilante-ai-photo-prompt": {
    intro: `Dark armored vigilante on a stone gargoyle ledge in pouring rain and lightning: long cape, rainy steel-blue mood—your real face kept.`,
    tips: [
      `Use a sharp chest-up source; rain and lightning can wash faces—ask to keep exact skin tone.`,
      `Request dark armored suit, long cape, and a gothic gargoyle ledge if it becomes a sunny rooftop.`,
      `If rain streaks cover the eyes, ask for rain in the air and cape, with a clear face.`,
      `Keep clothing and pose off for the rainy ledge stance.`,
    ],
    faqs: [
      {
        question: `Do I need a rainy night photo already?`,
        answer: `No. A clear portrait works; rain, lightning, and the gargoyle ledge build when pose is not preserved.`,
      },
      {
        question: `Will a mask hide my face?`,
        answer: `Ask for an uncovered face with dark armor and cape only—no mask covering identity.`,
      },
      {
        question: `Is this the kids toy-town hero?`,
        answer: `No—kids superhero is bright playful rooftops. This is a moody adult rain vigilante scene.`,
      },
      {
        question: `Lightning looking fake?`,
        answer: `Ask for distant forked lightning and rainy steel-blue light, not neon overlays on the skin.`,
      },
    ],
    addonLine: `Want a quieter storm ledge? Add: keep the dark armored suit, long cape, and gargoyle in heavy rain, but ease lightning flashes and reduce rain streaks across the face—no bright floral props or daytime blue sky.`,
  },
  "kids-superhero-ai-photo-prompt": {
    intro: `Little superhero kid flying over colourful toy-town rooftops in a homemade-style cape and mask—child's face, age and skin tone locked.`,
    tips: [
      `Upload one clear child photo at eye level; soft daylight without stickers works best.`,
      `Ask for a homemade-looking cape and mask with bright primary colours if it turns into dark adult armor.`,
      `If the town looks too real or scary, request toy-town rooftops, puffy clouds, and paper-kite birds.`,
      `Keep clothing and pose off for the joyful flying pose; never age the child up.`,
    ],
    faqs: [
      {
        question: `Can I use an adult photo?`,
        answer: `This page is for a child source. Use an adult hero style if the photo is of a grown-up.`,
      },
      {
        question: `Will my child's age change?`,
        answer: `No—ask to keep exact apparent age, face, hair, and skin tone; do not age up or slim.`,
      },
      {
        question: `Is this a dark night vigilante look?`,
        answer: `No—this is bright playful primary colours over toy-town rooftops.`,
      },
      {
        question: `Mask covering the whole face?`,
        answer: `Ask for a small homemade-style mask that still leaves eyes and smile readable.`,
      },
    ],
    addonLine: `Want a gentler toy-town flight? Add: keep the homemade-style cape, child's exact face and age, and colourful rooftops, but soften primary saturation and calm the flying pose—no realistic explosions, weapons, or adult armor.`,
  },
  "storm-hammer-warrior-ai-photo-prompt": {
    intro: `Norse-myth storm warrior on a sea cliff: rune-carved hammer raised, forked lightning, crashing waves—your face, skin tone and hairstyle locked.`,
    tips: [
      `Chest-up sharpness helps when lightning contrast is high—ask to keep exact skin tone under blue storm light.`,
      `Request Norse-style armor and a rune-carved war hammer if props become modern gym gear.`,
      `If the cliff looks calm, ask for towering black clouds, crashing waves, and forked lightning.`,
      `Keep clothing and pose off for the battle-cry hammer raise.`,
    ],
    faqs: [
      {
        question: `Do I need a storm photo already?`,
        answer: `No. A clear portrait works; the sea cliff, waves, and lightning build when background is not preserved.`,
      },
      {
        question: `Will lightning bleach my skin?`,
        answer: `Ask to keep exact skin tone; storm light should rim armor and hammer, not wash out the face.`,
      },
      {
        question: `Is this the misty dawn monk cliff?`,
        answer: `No—monk dawn is calm gold mist. This is an epic storm warrior with a raised hammer.`,
      },
      {
        question: `Hammer looking branded?`,
        answer: `Ask for an original rune-carved war hammer with no logos or franchise designs.`,
      },
    ],
    addonLine: `Want a tighter storm battle cry? Add: keep the Norse-style armor, rune-carved hammer, and sea-cliff lightning, but ease flash brightness on the face and reduce spray—no flowers, soft pastel skies, or franchise logos on the hammer.`,
  },
  "superhero-squad-group-ai-photo-prompt": {
    intro: `Friends as a matching original hero squad poster: navy-silver suits, orange accents, explosion backlight—every face, age and skin tone kept from one group photo.`,
    tips: [
      `Every face must be sharp and unobstructed in one group frame; hidden faces get invented wrong.`,
      `Ask for matching original navy-and-silver suits with glowing orange accents and no chest emblems.`,
      `If someone is added or removed, request the exact same number of people as your upload.`,
      `Clothing stays by default here; turn pose off so the staggered heroic lineup can form.`,
    ],
    faqs: [
      {
        question: `Can I merge separate selfies?`,
        answer: `This page expects one clear group photo with every face visible. Separate uploads need a merge-style workflow.`,
      },
      {
        question: `Will outfits stay what we wore?`,
        answer: `Clothing preservation defaults on here, but the look still builds matching original hero suits when you allow restyle—follow the on-page clothing toggle.`,
      },
      {
        question: `Why did an extra person appear?`,
        answer: `Ask for only the people in your photo—same count, each exact face and skin tone, no strangers.`,
      },
      {
        question: `Is this a solo cosmic space hero?`,
        answer: `No—this is a multi-person squad poster with explosion backlight behind a city skyline.`,
      },
    ],
    addonLine: `Want a cleaner squad poster? Add: keep every exact face, matching navy-silver suits, and explosion backlight, but soften smoke and sparks near cheeks—no extra teammates, franchise logos, or masks that hide identity.`,
  },
  "cosmic-energy-hero-ai-photo-prompt": {
    intro: `Hero floating in deep space with a star-dust aura and galaxy energy in the hands: purple-gold nebula, distant planets—your face locked.`,
    tips: [
      `Chest-up clarity matters against bright nebula glow—ask for energy in the hands, not across the face.`,
      `Request a swirling purple-and-gold nebula with star dust if the backdrop becomes a plain black void.`,
      `If skin lightens under violet light, ask to keep exact skin tone and facial features.`,
      `Keep clothing and pose off for the floating space stance.`,
    ],
    faqs: [
      {
        question: `Do I need a space photo already?`,
        answer: `No. A clear chest-up portrait works; deep space and the nebula build when background is not preserved.`,
      },
      {
        question: `Will purple light change my skin?`,
        answer: `Ask to keep exact skin tone; galaxy energy should stay in the hands and aura, not bleach the face.`,
      },
      {
        question: `Is this the observatory telescope look?`,
        answer: `No—observatory is brass telescope under a dome. This is a floating cosmic hero in open space.`,
      },
      {
        question: `Energy looking like text or logos?`,
        answer: `Ask for abstract galaxy energy only—no lettering, numbers, or brand shapes in the hands.`,
      },
    ],
    addonLine: `Want a quieter nebula float? Add: keep the star-dust aura, galaxy energy in the hands, and purple-gold space backdrop, but soften glow near the cheeks and ease planet clutter—no earth rooftops or flower gardens behind you.`,
  },
  "golden-aura-anime-fighter-ai-photo-prompt": {
    intro: `Anime fighter powering up on a shattered battlefield: crackling golden aura, torn training clothes, floating boulders—your face recognizable under stylization.`,
    tips: [
      `Even with anime shading, ask to keep face shape, eye shape, hairline, and exact skin tone.`,
      `Request a blazing gold aura and floating rocky debris if the scene stays a quiet indoor room.`,
      `If the scream pose exaggerates the jaw too far, ask for a powerful but still recognizable expression.`,
      `Keep clothing off for torn training clothes; preserve beard or head covering if present.`,
    ],
    faqs: [
      {
        question: `Will I still look like myself in anime style?`,
        answer: `Yes—ask to keep face shape, features, hairstyle, and skin tone even under cel-shaded power-up art.`,
      },
      {
        question: `Do I need an action photo already?`,
        answer: `No. A calm portrait works; the power-up scream and floating boulders build when pose is not preserved.`,
      },
      {
        question: `Is this the soft 90s rooftop anime portrait?`,
        answer: `No—90s retro is pastel sunset rooftop calm. This is a blazing golden battlefield power-up.`,
      },
      {
        question: `Aura looking neon green?`,
        answer: `Ask for blazing gold energy with stormy sky and cracked rocky ground.`,
      },
    ],
    addonLine: `Want a tighter power-up frame? Add: keep the crackling golden aura, shattered battlefield rocks, and torn training clothes, but ease aura brightness on the face and calm debris density—no soft floral props or pastel scrapbook overlays.`,
  },
  "90s-retro-anime-portrait-ai-photo-prompt": {
    intro: `Cel-shaded 90s anime portrait on a pastel pink-lavender sunset rooftop with power lines, film grain, and wind-blown retro fashion—your likeness kept.`,
    tips: [
      `Upload a clear chest-up photo; ask for soft film grain without melting eye detail.`,
      `Request pastel pink and lavender sunset, rooftop power lines, and gentle wind if it becomes modern neon night.`,
      `If the anime look swaps your face, insist on same face shape, hair colour, and skin tone.`,
      `Keep clothing off for retro fashion; turn it on only to keep your real outfit under the cel shade.`,
    ],
    faqs: [
      {
        question: `Do I need a rooftop photo already?`,
        answer: `No. A clear portrait works; the sunset rooftop and power lines build when background is not preserved.`,
      },
      {
        question: `Will cel shading erase my features?`,
        answer: `Ask to keep face shape, eye shape, hairstyle, and exact skin tone even in 90s anime rendering.`,
      },
      {
        question: `Is this the golden aura fighter look?`,
        answer: `No—fighter power-up is battlefield gold energy. This is a calm pastel 90s sunset portrait.`,
      },
      {
        question: `Sky looking too dark?`,
        answer: `Ask for pastel pink and lavender sunset glow with soft film grain, not night neon.`,
      },
    ],
    addonLine: `Want a quieter 90s rooftop dusk? Add: keep the cel-shaded look, pastel sunset sky, and power-line rooftop, but soften grain and ease wind on the hair—no golden battle auras or shattered rocks.`,
  },
  "hand-painted-anime-film-poster-ai-prompt": {
    intro: `Hand-painted anime film-poster frame on a windswept grassy hilltop under a huge painted sunset sky—your face, skin tone and hair locked.`,
    tips: [
      `Chest-up sharpness helps painterly strokes stay on sky and grass, not across facial landmarks.`,
      `Ask for a towering cloud-filled sunset and wind-swept hilltop if the backdrop becomes a plain studio wall.`,
      `If brush texture makes you look like someone else, request exact face shape and skin tone under painterly light.`,
      `Keep clothing and pose off for the poster-style windswept stance.`,
    ],
    faqs: [
      {
        question: `Do I need a hilltop photo already?`,
        answer: `No. A clear portrait works; the grassy hill and painted sunset sky build when background is not preserved.`,
      },
      {
        question: `Will the painted look change my skin tone?`,
        answer: `Ask to keep exact skin tone; painterly light should sit in the sky and grass, not bleach the face.`,
      },
      {
        question: `Is this the 90s pastel rooftop anime look?`,
        answer: `No—90s retro uses cel shading on a city rooftop. This is a hand-painted film-poster hilltop.`,
      },
      {
        question: `Poster looking too photographic?`,
        answer: `Ask for visible hand-painted brush texture in the giant cloud sky while keeping facial likeness sharp.`,
      },
    ],
    addonLine: `Want a quieter painted poster dusk? Add: keep the hand-painted anime finish, grassy hilltop, and huge sunset clouds, but soften brush contrast on the face and ease wind in the hair—no neon cities, battle auras, or scrapbook stickers.`,
  },
  "anime-swordsman-ai-photo-prompt": {
    intro: `Anime night battle look: plain hakama and kimono, a glowing blade trailing one silver moonlight arc through misty bamboo. Upload one clear chest-up photo with your face fully visible.`,
    tips: [
      `Use a sharp chest-up portrait in even light—side profiles and beauty filters make the moonlight rim light smear across the cheeks.`,
      `If the sword glow looks neon or rainbow, ask for a single silver moonlight arc along the blade, nothing else.`,
      `Ask for plain hakama and kimono fabric with readable folds; avoid ornate clan crests or logo embroidery.`,
      `Keep clothing and pose off so the mid-slash action and bamboo grove can appear while your face stays locked.`,
    ],
    faqs: [
      {
        question: `Do I need a photo already holding a sword?`,
        answer: `No. A clear everyday portrait works; the look adds the blade, slash pose, and moonlight arc when pose is not preserved.`,
      },
      {
        question: `Will my own clothes stay?`,
        answer: `Only if you turn clothing preservation on. By default you get plain hakama and kimono while your face stays exact.`,
      },
      {
        question: `Why does the moonlight look purple or pink?`,
        answer: `Ask for cool silver-blue moonlight only—one clean arc on the blade, no rainbow trails or sparkle stickers.`,
      },
      {
        question: `Can I use a full-body mirror selfie?`,
        answer: `Chest-up is safer. Distant full-body shots shrink the face against the bamboo and mist.`,
      },
    ],
    addonLine: `Want a quieter moonlight cut? Add: keep the plain hakama, glowing blade, and misty bamboo grove, but thin the drifting leaves and soften the silver arc—no extra swordsmen, no fireworks.`,
  },
  "anime-ninja-hero-ai-photo-prompt": {
    intro: `Sunset rooftop leap in anime style: original ninja outfit, blank headband, flowing scarf, and dusk embers over tiled village roofs. One clear chest-up photo is enough.`,
    tips: [
      `Upload a sharp frontal or three-quarter portrait; heavy filters fight the warm sunset orange and leaf-green grade.`,
      `If the headband shows random letters or symbols, ask for a blank headband with no text or clan marks.`,
      `Ask for a flowing scarf and drifting dusk embers—avoid solid black void backgrounds that erase the hillside village.`,
      `Keep pose off so the rooftop leap can appear; preserve clothing only if you must keep your own outfit.`,
    ],
    faqs: [
      {
        question: `Must I already be jumping in the source photo?`,
        answer: `No. A still portrait works; the prompt builds the rooftop leap when pose is not preserved.`,
      },
      {
        question: `Will famous anime logos appear on the headband?`,
        answer: `They should not. Ask for a blank headband with no letters, symbols, or franchise marks.`,
      },
      {
        question: `Why do the rooftops look modern and flat?`,
        answer: `Ask for tiled hillside village roofs at sunset with swirling leaves and distant mountains, not glass skyscrapers.`,
      },
      {
        question: `Can girls use this ninja look?`,
        answer: `Yes. The prompt keeps your face, hair, and age; the leap and outfit restyle around that identity.`,
      },
    ],
    addonLine: `Want a calmer dusk leap? Add: keep the ninja outfit, blank headband, scarf, and tiled rooftops, but reduce ember density near the face—no second ninja, no neon city signs.`,
  },
  "anime-samurai-autumn-leaves-ai-photo-prompt": {
    intro: `Crimson autumn samurai draw: red-and-black armor, katana mid-draw, and a storm of red maple leaves on a mountain path. Best from one clear chest-up photo.`,
    tips: [
      `Prefer a sharp chest-up portrait; blurry selfies lose the side-light edge on the armor plates.`,
      `If leaves stick to the face like stickers, ask for swirling maple leaves in the air and path, not glued to skin.`,
      `Ask for red-and-black armor with a clean katana draw—avoid random European plate mail.`,
      `Keep clothing and pose off so the autumn mountain path and dramatic side light can build correctly.`,
    ],
    faqs: [
      {
        question: `Do I need autumn photos already?`,
        answer: `No. Any clear portrait works; the look builds the blazing maple trees and falling leaves for you.`,
      },
      {
        question: `Will my beard or hairstyle change?`,
        answer: `No. Face, skin tone, hairstyle, beard, and head covering are meant to stay while armor and pose change.`,
      },
      {
        question: `Why does the armor look plastic?`,
        answer: `Ask for matte red-and-black armor with readable plate seams and dramatic side light, not shiny toy plastic.`,
      },
      {
        question: `Is a group photo okay?`,
        answer: `Use a single-person chest-up shot. Extra faces confuse who becomes the samurai.`,
      },
    ],
    addonLine: `Want a quieter leaf storm? Add: keep the red-and-black armor, katana draw, and maple mountain path, but thin the falling leaves near the eyes—no second warrior, no cherry blossoms.`,
  },
  "chibi-3d-couple-ai-photo-prompt": {
    intro: `Turn you both into glossy big-head 3D chibi figures bouncing in a soft pastel set with hearts, stars, and confetti. Upload two clear photos or one of you together.`,
    tips: [
      `Use two sharp face photos with similar light, or one clear couple shot where both faces are large.`,
      `If heads look adult-proportioned, ask for big-head chibi proportions with a glossy toy finish.`,
      `Keep clothing on if you want your real outfits as tiny chibi versions; turn it off for a full toy restyle.`,
      `When heights look swapped, ask to keep realistic relative heights between person A and person B.`,
    ],
    faqs: [
      {
        question: `Can I upload two separate selfies?`,
        answer: `Yes. One clear photo per person works well; a single photo of you both also works if both faces are sharp.`,
      },
      {
        question: `Will our real heights stay?`,
        answer: `Relative heights should stay realistic even in chibi form. Ask to preserve them if one person looks wrongly taller.`,
      },
      {
        question: `Why do our faces blend into one person?`,
        answer: `Upload two distinct photos with large faces, or crop a couple shot so each face is clear and unobstructed.`,
      },
      {
        question: `Do our clothes stay in the chibi look?`,
        answer: `Clothing preservation is on by default here, so outfits usually carry over into the toy style.`,
      },
    ],
    addonLine: `Want a softer pastel bounce? Add: keep both exact faces, glossy chibi finish, and pastel backdrop, but quiet the confetti a little—no third character, no scary monster props.`,
  },
  "anime-clone-flashlight-glow-ai-photo-prompt": {
    intro: `Viral flashlight-clone portrait: a tiny anime you shines a torch that warms your hair with golden rim light in a dark moody room. One clear chest-up photo works best.`,
    tips: [
      `Upload a sharp chest-up portrait with visible hair edges—heavy beauty blur kills the warm hair glow.`,
      `If the tiny clone looks like a stranger, ask for the same face, hair, and skin tone on the mini anime figure.`,
      `Ask for a single flashlight beam lighting the hair with warm rim light, not a full studio softbox.`,
      `Keep clothing and pose off so the moody dark room and clone gesture can appear correctly.`,
    ],
    faqs: [
      {
        question: `Must my photo already be taken in the dark?`,
        answer: `No. A daylight portrait is fine; the prompt builds the dark room and warm flashlight glow.`,
      },
      {
        question: `Will the tiny clone copy my exact face?`,
        answer: `It should. If it drifts, ask for the mini figure to match your face shape, hair, and skin tone exactly.`,
      },
      {
        question: `Why is my whole face overexposed?`,
        answer: `Ask for the flashlight to warm the hair with soft rim light while keeping the face naturally lit, not blasted white.`,
      },
      {
        question: `Can I keep my own outfit?`,
        answer: `Turn clothing preservation on. By default the look may restyle clothing around the clone scene.`,
      },
    ],
    addonLine: `Want a softer hair glow? Add: keep the tiny anime clone, flashlight beam, and dark moody room, but ease the warm rim light on the hair tips—no second clone, no neon party lights.`,
  },
  "mecha-pilot-anime-key-visual-ai-prompt": {
    intro: `Anime key-visual framing: original pilot suit, low camera angle, and a towering original giant robot in a dusk launch bay with steam and sparks. Use one clear chest-up photo.`,
    tips: [
      `Prefer a sharp frontal portrait; tiny distant full-body shots make the pilot face vanish under the robot scale.`,
      `If the mecha looks like a famous franchise design, ask for an original giant robot with no logos or known silhouettes.`,
      `Ask for steel-blue hangar light with warning-orange accents, steam, and sparks—avoid flat white studio backdrops.`,
      `Keep clothing and pose off so the pilot suit and low-angle key-visual stance can build.`,
    ],
    faqs: [
      {
        question: `Do I need a photo in a jumpsuit already?`,
        answer: `No. A clear everyday portrait works; the prompt adds the original pilot suit when clothing is not preserved.`,
      },
      {
        question: `Will a real anime mecha brand appear?`,
        answer: `It should stay original. Ask for a custom giant robot with no franchise badges, names, or copied silhouettes.`,
      },
      {
        question: `Why does the robot look tiny behind me?`,
        answer: `Ask for a towering robot filling the hangar behind you with a low camera angle so scale reads epic.`,
      },
      {
        question: `Is a blurry phone selfie okay?`,
        answer: `Avoid blur. The face must stay sharp because the hangar detail will otherwise overpower identity.`,
      },
    ],
    addonLine: `Want a quieter launch-bay stare? Add: keep the original pilot suit, giant robot, and hangar bay, but soften the warning lights and reduce spark density—no flowers, no second pilot.`,
  },
  "anime-couple-cherry-blossoms-ai-photo-prompt": {
    intro: `Soft shoujo couple scene on a petal-covered path under arching cherry blossoms, with a romantic glance and sparkles in the air. Upload two clear photos or one of you both.`,
    tips: [
      `Use two sharp portraits with similar lighting, or one couple photo where both faces are large and unobstructed.`,
      `If petals cover the eyes, ask for a petal gust around the path and trees, not stuck on lashes.`,
      `Keep clothing on by default so your real outfits carry into the blossom path; turn it off only for a full restyle.`,
      `When one person looks older or lighter-skinned wrongly, ask to lock each exact skin tone and apparent age.`,
    ],
    faqs: [
      {
        question: `Can we use two photos taken years apart?`,
        answer: `Yes, if both faces are clear. Matching light and camera height helps the blend look natural.`,
      },
      {
        question: `Will our relative heights stay?`,
        answer: `They should. Ask to keep realistic relative heights if one person suddenly looks much taller.`,
      },
      {
        question: `Why do we look like strangers?`,
        answer: `Upload sharper, closer face crops and ask to preserve each person’s face shape, hair, and skin tone exactly.`,
      },
      {
        question: `Do our clothes change under the blossoms?`,
        answer: `Clothing preservation is on by default, so outfits usually stay while the petal path and sparkles are added.`,
      },
    ],
    addonLine: `Want a calmer blossom walk? Add: keep both exact faces, cherry path, and soft pink mood, but thin the petal storm near the cheeks—no third person, no heavy jewellery props.`,
  },
  "sunset-city-game-loading-screen-ai-prompt": {
    intro: `Bold cel-shaded game loading-screen couple on a palm-lined coastal boulevard at hot sunset, with thick outlines and an unbadged sports car. Two clear photos or one couple shot.`,
    tips: [
      `Upload two sharp face photos or one clear couple portrait—beauty filters flatten the cel-shade edge lines.`,
      `If the car shows brand logos or number plates, ask for a sleek original sports car with no badges or plates.`,
      `Ask for thick outlines and bold cel shading under hot orange-pink sunset light, not soft photoreal skin.`,
      `Keep clothing on if you want your real outfits in the illustration; turn pose off for the loading-screen stance.`,
    ],
    faqs: [
      {
        question: `Must we already stand near a car?`,
        answer: `No. Clear portraits are enough; the prompt builds the coastal boulevard, palms, and unbadged sports car.`,
      },
      {
        question: `Will game UI text appear on the image?`,
        answer: `It should stay clean. If letters show up, ask for a loading-screen illustration with no readable text or buttons.`,
      },
      {
        question: `Why do we look photoreal instead of game-art?`,
        answer: `Ask for bold cel shading, thick outlines, and saturated sunset colour like a game key art frame.`,
      },
      {
        question: `Can one photo of both of us work?`,
        answer: `Yes, if both faces are large and sharp. Separate portraits also work well.`,
      },
    ],
    addonLine: `Want a cleaner loading-screen frame? Add: keep both faces, thick cel outlines, palms, and sunset boulevard, but soften the car reflections slightly—no UI text, no random NPCs.`,
  },
  "dark-fantasy-game-over-screen-ai-prompt": {
    intro: `Lone wanderer at a misty grey-blue waterfall gorge, framed like a dark fantasy game-over screen with cold cinematic light. One clear chest-up photo is enough.`,
    tips: [
      `Use a sharp chest-up portrait; smiling party selfies fight the cold misty game-over mood.`,
      `If the menu overlay looks cluttered, ask for a simple game-menu frame with minimal plain UI and no readable ads.`,
      `Ask for damp black rocks, pale mist, and a grey-blue waterfall gorge—avoid bright tropical water.`,
      `Keep clothing and pose off so the lone wanderer stance and cold cinematic light can appear.`,
    ],
    faqs: [
      {
        question: `Do I need a waterfall photo already?`,
        answer: `No. A clear indoor or outdoor portrait works; the prompt builds the misty gorge and rocks.`,
      },
      {
        question: `Will real game logos appear?`,
        answer: `They should not. Ask for a plain original game-menu overlay with no franchise titles or brand marks.`,
      },
      {
        question: `Why do I look cheerful in the result?`,
        answer: `Ask for a subdued lone-wanderer expression under cold cinematic light, matching a game-over frame.`,
      },
      {
        question: `Can I keep my own jacket?`,
        answer: `Turn clothing preservation on. Otherwise the look restyles you as the misty wanderer while locking your face.`,
      },
    ],
    addonLine: `Want a quieter game-over mood? Add: keep the misty waterfall gorge, lone wanderer framing, and cold light, but soften the menu overlay opacity—no victory confetti, no bright loot glow.`,
  },
  "cartoon-battle-royale-avatar-ai-photo-prompt": {
    intro: `Stylised 3D battle-royale avatar gliding down onto a colourful tropical island with bright trees, supply crates, and a parachute pack. Upload one clear chest-up photo.`,
    tips: [
      `Prefer a sharp frontal portrait; sunglasses and heavy filters hide the cartoon eye shapes.`,
      `If the outfit looks military-camo drab, ask for a bright original avatar outfit with no real brand logos.`,
      `Ask for a parachute pack and colourful island drop—avoid empty grey voids with no terrain.`,
      `Keep clothing and pose off so the glide-down stance and tropical island can build.`,
    ],
    faqs: [
      {
        question: `Must I already be wearing a parachute?`,
        answer: `No. A plain portrait is enough; the prompt adds the pack and glide-down pose when clothing and pose are off.`,
      },
      {
        question: `Will famous battle-royale skins copy over?`,
        answer: `Ask for an original bright outfit and island—no franchise skin names, logos, or copied costumes.`,
      },
      {
        question: `Why does my skin tone look lighter?`,
        answer: `Ask to lock your exact skin tone; cartoon shading should not bleach or Europeanise the face.`,
      },
      {
        question: `Is a group photo okay?`,
        answer: `Use a single clear chest-up photo. Extra people can get turned into random island NPCs.`,
      },
    ],
    addonLine: `Want a cleaner island drop? Add: keep the stylised 3D avatar, parachute pack, and colourful island, but reduce floating crate clutter near the face—no real gun brands, no blood effects.`,
  },
  "hero-shooter-character-card-ai-photo-prompt": {
    intro: `Splash-art hero character card: dynamic angle, ability glow, and saturated energy shapes behind a framed portrait. Best from one clear chest-up photo with a sharp face.`,
    tips: [
      `Upload a sharp chest-up portrait; low-res crops make the splash-art face melt into paint streaks.`,
      `If ability glow covers the eyes, ask for glow on hands or gear edges, with the face kept clear.`,
      `Ask for an abstract splash-art backdrop of energy shapes and paint-like streaks—not a plain white card.`,
      `Keep clothing and pose off so the hero suit and dynamic card angle can appear.`,
    ],
    faqs: [
      {
        question: `Do I need a costume photo already?`,
        answer: `No. A clear everyday portrait works; the look builds splash-art styling and ability glow when clothing is off.`,
      },
      {
        question: `Will hero names from real games appear?`,
        answer: `They should not. Ask for an original character card with no franchise titles, logos, or ability names.`,
      },
      {
        question: `Why does the card look flat and dull?`,
        answer: `Ask for saturated splash-art colour, a dynamic camera angle, and bright energy shapes behind you.`,
      },
      {
        question: `Can I keep my own clothes on the card?`,
        answer: `Turn clothing preservation on. By default the prompt restyles you into hero splash-art gear.`,
      },
    ],
    addonLine: `Want a cleaner character-card hit? Add: keep the splash-art style, ability glow, and dynamic angle, but pull glow away from the eyes—no real team logos, no cluttered stat text.`,
  },
  "16-bit-pixel-rpg-party-ai-photo-prompt": {
    intro: `Your whole group as a 16-bit pixel RPG party on a retro overworld with castle, forest, river, and plain icon-only health bars. Use one clear group photo with every face visible.`,
    tips: [
      `Shoot or pick a group photo where every face is sharp and facing camera—hidden faces vanish in pixel form.`,
      `If someone is missing from the party, ask to keep the same number of people as the source, no extras.`,
      `Ask for 16-bit sprite style with a pixel fantasy overworld and plain icon-only HP bars—no readable modern UI text.`,
      `Keep clothing on if you want outfit colours to carry into the sprites; keep pose off for a classic party lineup.`,
    ],
    faqs: [
      {
        question: `Can I merge separate selfies into one party?`,
        answer: `This style expects one group photo with every face visible. Separate selfies are harder to line up as a party.`,
      },
      {
        question: `Will we all stay recognisable in pixel form?`,
        answer: `Yes if faces are sharp. Ask to preserve each hairstyle, skin tone, and head covering in the sprite read.`,
      },
      {
        question: `Why do HP bars show random numbers or ads?`,
        answer: `Ask for plain icon-only health bars with no readable text, scores, or brand marks.`,
      },
      {
        question: `Is a blurry wedding group shot okay?`,
        answer: `Avoid blur. Even light on all faces works better than a distant soft group photo.`,
      },
    ],
    addonLine: `Want a cleaner overworld party? Add: keep every exact face as 16-bit sprites, the pixel castle-forest map, and icon HP bars, but simplify the river detail slightly—no modern HUD text, no extra hirelings.`,
  },
  "voxel-block-world-avatar-ai-photo-prompt": {
    intro: `Kid-friendly rounded pastel voxel avatar jumping on candy-colored floating islands with soft trees and a little waterfall. Upload one clear photo of a child with the face visible.`,
    tips: [
      `Use a sharp child photo at eye level—adult-height downward shots warp the voxel head shape.`,
      `If blocks look sharp and scary, ask for rounded pastel voxels and soft candy island colours.`,
      `Ask for a bright sky with soft round clouds and a small waterfall—avoid dark caves or combat props.`,
      `Keep clothing and pose off so the jumping kid avatar and floating islands can appear.`,
    ],
    faqs: [
      {
        question: `Can I use an adult photo for this look?`,
        answer: `It is written for a child source photo. Adult faces often look odd in this pastel kid avatar set.`,
      },
      {
        question: `Will filters or stickers on the photo cause issues?`,
        answer: `Yes. Soft daylight with no stickers works best so hair and face lock cleanly into voxels.`,
      },
      {
        question: `Why does my child look older?`,
        answer: `Ask to lock apparent age and face shape; the voxel style should stay playful, not aged up.`,
      },
      {
        question: `Do clothes stay from the source?`,
        answer: `By default clothing changes into the voxel avatar look. Turn clothing preservation on to keep the real outfit colours.`,
      },
    ],
    addonLine: `Want a gentler island hop? Add: keep the rounded pastel voxels, candy floating islands, and kid-friendly jump, but soften the waterfall spray—no weapons, no scary mobs.`,
  },
  "fighting-game-versus-screen-ai-photo-prompt": {
    intro: `Two friends on a split fighting-game versus screen: crimson side versus electric blue, crackling energy, lightning, and plain health bars. Upload two clear photos or one of you both.`,
    tips: [
      `Use two sharp portraits with similar light, or one clear duo shot where both faces are large.`,
      `If sides mix colours, ask for a clean split—crimson energy on one side, electric blue on the other.`,
      `Ask for plain health bars at the top with no readable names or brand logos.`,
      `Keep clothing on by default so real outfits stay in the face-off; keep pose off for the versus stances.`,
    ],
    faqs: [
      {
        question: `Can cousins or classmates use this, not just friends?`,
        answer: `Yes. Any two people work if both faces are clear and you upload two photos or one duo shot.`,
      },
      {
        question: `Will real fighting-game titles appear?`,
        answer: `They should not. Ask for an original versus screen with no franchise logos or fighter names.`,
      },
      {
        question: `Why does one person look washed out?`,
        answer: `Ask to preserve each skin tone separately and balance the crimson and blue side lighting.`,
      },
      {
        question: `Do our clothes change for the fight?`,
        answer: `Clothing preservation is on by default, so outfits usually stay while the VS energy frame is added.`,
      },
    ],
    addonLine: `Want a cleaner VS stare-down? Add: keep both exact faces, the crimson-blue split arena, and plain health bars, but ease lightning near the cheeks—no third fighter, no blood spray.`,
  },
  "dark-fantasy-armored-knight-ai-photo-prompt": {
    intro: `Battle-worn knight swinging a glowing sword through a misty ruined castle courtyard with broken arches, cold fog, and falling ash. One clear chest-up photo works best.`,
    tips: [
      `Upload a sharp chest-up portrait; smiling party photos fight the cold misty steel mood.`,
      `If armor looks shiny and new, ask for ornate battle-worn plates with scuffs and ash dust.`,
      `Ask for a glowing sword mid-swing in misty ruins—avoid bright flower gardens or sunny meadows.`,
      `Keep clothing and pose off so the armor and sword-swing action can build correctly.`,
    ],
    faqs: [
      {
        question: `Do I need a photo in armor already?`,
        answer: `No. A clear everyday portrait works; the prompt adds ornate battle-worn armor when clothing is not preserved.`,
      },
      {
        question: `Will my beard or glasses stay?`,
        answer: `Yes. Face details including beard, glasses, or head covering are meant to stay under the helm framing.`,
      },
      {
        question: `Why does the sword glow look neon pink?`,
        answer: `Ask for a cold steel-compatible sword glow—pale blue or silver—matching the misty ruin light.`,
      },
      {
        question: `Is a full-body gym mirror shot okay?`,
        answer: `Chest-up is safer. Very wide full-body shots shrink the face against the ruined arches.`,
      },
    ],
    addonLine: `Want a colder ruin swing? Add: keep the battle-worn armor, glowing sword, and misty courtyard, but thin the falling ash near the face—no flowers, no second knight.`,
  },
  "eastern-wanderer-swordsman-ai-photo-prompt": {
    intro: `Wandering swordsman in flowing robes and a bamboo hat on a misty mountain path among bamboo and pine, cloud-wrapped peaks behind. Upload one clear chest-up photo.`,
    tips: [
      `Use a sharp chest-up portrait in even light—harsh flash fights the misty jade mountain grade.`,
      `If the hat hides the whole face, ask for a bamboo hat angled so eyes and face stay readable.`,
      `Ask for flowing robes and a sword-draw on a misty bamboo-pine path—avoid modern street clothes lingering.`,
      `Keep clothing and pose off so the wanderer stance and cloud-wrapped peaks can appear.`,
    ],
    faqs: [
      {
        question: `Must I already wear robes in the photo?`,
        answer: `No. A plain portrait is enough; the look adds flowing robes and the bamboo hat when clothing is off.`,
      },
      {
        question: `Will my turban or head covering be removed?`,
        answer: `Head coverings from the source are meant to stay. If a bamboo hat conflicts, ask to keep your covering and skip the hat.`,
      },
      {
        question: `Why do the mountains look flat like a poster?`,
        answer: `Ask for layered misty peaks with bamboo and pine depth, soft fog between ridges, and natural jade-green light.`,
      },
      {
        question: `Can women use this wanderer look?`,
        answer: `Yes. The prompt locks your face, hair, and age while building the misty path and sword-draw.`,
      },
    ],
    addonLine: `Want a quieter mountain draw? Add: keep the flowing robes, bamboo hat, and misty pine path, but soften peak haze slightly—no modern city skyline, no extra travellers.`,
  },
  "elven-forest-archer-ai-photo-prompt": {
    intro: `Elven archer in a sun-dappled ancient forest: pointed ears, leaf-embroidered cloak, longbow draw, and a glowing arrow between huge trees and ferns. One clear chest-up photo.`,
    tips: [
      `Prefer a sharp frontal or three-quarter portrait so ear tips and eye line stay clean under forest light shafts.`,
      `If pointed ears look glued on, ask for natural ear blending that still keeps your exact face shape.`,
      `Ask for a leaf-embroidered cloak and glowing arrow—avoid heavy plate armor that belongs to knight looks.`,
      `Keep clothing and pose off so the longbow draw and sun-dappled forest can build.`,
    ],
    faqs: [
      {
        question: `Do I need a bow in my source photo?`,
        answer: `No. A clear portrait works; the prompt adds the longbow draw and glowing arrow when pose is not preserved.`,
      },
      {
        question: `Will pointed ears change my whole face?`,
        answer: `They should not. Ask to keep your exact face shape and only add subtle pointed ears.`,
      },
      {
        question: `Why does the forest look fake and plastic?`,
        answer: `Ask for huge ancient trees, ferns, and soft light shafts with natural sun-dappled gold, not flat green screens.`,
      },
      {
        question: `Can I keep my own clothes?`,
        answer: `Turn clothing preservation on. By default you get the leaf-embroidered cloak and archer styling.`,
      },
    ],
    addonLine: `Want a quieter forest aim? Add: keep the pointed ears, leaf cloak, longbow, and sun-dappled trees, but soften the arrow glow—no battle army in the background, no neon magic rings.`,
  },
  "royal-mughal-prince-princess-ai-photo-prompt": {
    intro: `Couple as a royal prince and princess in a marble palace courtyard with carved arches, hanging lanterns, fountains, and rose petals. Upload two clear photos or one of you both.`,
    tips: [
      `Use two sharp portraits with similar light, or one clear couple photo where both faces are large.`,
      `If outfits look costume-shop plastic, ask for jewelled sherwani and lehenga with rich fabric folds.`,
      `Ask for marble arches, lantern glow, and soft rose petals—avoid modern hotel lobbies sneaking in.`,
      `Keep clothing on by default if you already wear festive wear; turn it off for a full royal restyle.`,
    ],
    faqs: [
      {
        question: `Can we use engagement photos as the source?`,
        answer: `Yes, if both faces are sharp. Separate selfies also work when you cannot stand together.`,
      },
      {
        question: `Will our skin tones stay natural?`,
        answer: `They should. Ask to lock each exact skin tone if the palace light tries to lighten either face.`,
      },
      {
        question: `Do we need real sherwani and lehenga already?`,
        answer: `Not required. With clothing off, the prompt can dress you in jewelled royal outfits while keeping faces exact.`,
      },
      {
        question: `Why do lanterns look like LED strips?`,
        answer: `Ask for warm hanging palace lanterns under carved marble arches, with soft fountain mist—not club lighting.`,
      },
    ],
    addonLine: `Want a quieter palace portrait? Add: keep both exact faces, marble arches, lanterns, and regal pose, but thin the rose petals on the floor—no crowded court, no modern sunglasses.`,
  },
  "dragon-rider-ai-photo-prompt": {
    intro: `Epic rider on a huge original dragon soaring above jagged mountain peaks at sunset, with wind, smoke, and ember-filled air. Best from one clear chest-up photo.`,
    tips: [
      `Upload a sharp chest-up portrait; tiny distant full-body shots lose facial identity against the dragon scale.`,
      `If the dragon looks like a movie franchise creature, ask for a huge original dragon with no known logos or copied heads.`,
      `Ask for leather riding armor, wind-swept motion, and ember sky above the clouds—avoid calm studio poses.`,
      `Keep clothing and pose off so the saddle stance and mountain peaks can build.`,
    ],
    faqs: [
      {
        question: `Do I need a photo on a bike or horse first?`,
        answer: `No. A clear portrait works; the prompt builds the dragon, wind, and mountain soar when pose is off.`,
      },
      {
        question: `Will famous movie dragons appear?`,
        answer: `Ask for an original dragon design with no franchise silhouettes, names, or saddle logos.`,
      },
      {
        question: `Why does my face look tiny?`,
        answer: `Ask to keep the rider large in frame with a readable face, dragon body filling the sky behind.`,
      },
      {
        question: `Can I keep my own jacket?`,
        answer: `Turn clothing preservation on. By default you get leather riding armor while your face stays locked.`,
      },
    ],
    addonLine: `Want a fiercer high-altitude ride? Add: keep the original dragon, leather riding armor, and ember mountain sky, but thin embers near the eyes—no second dragon, no flowers in the saddle.`,
  },
  "80s-dark-fantasy-film-still-ai-photo-prompt": {
    intro: `1980s sword-and-sorcery film still: practical fog, colored gels, crumbling stone pillars, film grain, and a faded fantasy costume. Upload one clear chest-up photo.`,
    tips: [
      `Use a sharp portrait without modern beauty filters—the faded 80s film grade needs real skin texture.`,
      `If the image looks like crisp digital HDR, ask for soft film grain, slight fade, and practical smoke-machine fog.`,
      `Ask for sword-and-sorcery costume under colored gels—avoid clean modern streetwear lingering in frame.`,
      `Keep clothing and pose off so the foggy set and film-still framing can appear.`,
    ],
    faqs: [
      {
        question: `Must my photo already look old?`,
        answer: `No. A clear modern portrait works; the prompt adds the faded 80s film look, fog, and gels.`,
      },
      {
        question: `Will I look like a famous 80s actor?`,
        answer: `You should stay yourself. Ask to lock your exact face, skin tone, and age—no celebrity morph.`,
      },
      {
        question: `Why does fog erase my face?`,
        answer: `Ask for practical smoke around the pillars and mid-ground, with sharp focus kept on the eyes and face.`,
      },
      {
        question: `Can I keep my own clothes in the film still?`,
        answer: `Turn clothing preservation on. Otherwise the default uses a sword-and-sorcery costume.`,
      },
    ],
    addonLine: `Want a more VHS-era still? Add: keep the foggy pillars, sword-and-sorcery costume, and colored gels, but add a touch more film grain—no modern LED panels, no clean studio white.`,
  },
  "enchanted-academy-wizard-kids-ai-photo-prompt": {
    intro: `Young wizard casting a sparkly spell in a candle-lit castle library with towering shelves, floating books, and warm lanterns. Upload one clear photo of a child with the face visible.`,
    tips: [
      `Use a sharp child photo at eye level with soft daylight—stickers and cartoon filters fight identity lock.`,
      `If robes look house-branded, ask for plain wizard robes with no crest letters or franchise marks.`,
      `Ask for a wand spell with soft sparkles, floating books, and candle-lit shelves—avoid dark horror lighting.`,
      `Keep clothing and pose off so the library spell cast can appear while age and face stay exact.`,
    ],
    faqs: [
      {
        question: `Can adults use this wizard academy look?`,
        answer: `It is written for a child source photo. Adult faces often read oddly in this young-wizard library set.`,
      },
      {
        question: `Will famous wizard school logos appear?`,
        answer: `They should not. Ask for plain robes and an original castle library with no franchise crests or names.`,
      },
      {
        question: `Why does my child look older or younger?`,
        answer: `Ask to lock apparent age exactly; the magic styling should not de-age or age up the face.`,
      },
      {
        question: `Is a blurry birthday-party photo okay?`,
        answer: `Avoid blur and heavy party filters. Soft daylight with a clear face works much better.`,
      },
    ],
    addonLine: `Want a gentler library spell? Add: keep the plain wizard robes, wand sparkles, and candle-lit shelves, but soften floating-book motion—no scary creatures, no exam-board text on books.`,
  },
  "sorceress-glowing-spell-book-ai-photo-prompt": {
    intro: `Dramatic sorceress in a gothic tower chamber: dark gown, levitating spell book, violet magic swirl, floating candles, and a stormy arched window. One clear chest-up photo.`,
    tips: [
      `Upload a sharp chest-up portrait; heavy beauty blur melts the violet magic edges into the face.`,
      `If the spell book looks like a phone or laptop, ask for a levitating hardbound spell book with soft violet glow.`,
      `Ask for a gothic tower chamber with stormy night through a tall arched window—avoid sunny beach light.`,
      `Keep clothing and pose off so the dark gown and levitating-book gesture can build.`,
    ],
    faqs: [
      {
        question: `Do I need a book in my hands already?`,
        answer: `No. A clear portrait works; the prompt adds the levitating spell book and violet magic when pose is off.`,
      },
      {
        question: `Will my hijab or head covering stay?`,
        answer: `Yes, head coverings are meant to stay. If the gown hood conflicts, ask to keep your exact covering from the source.`,
      },
      {
        question: `Why is the violet glow turning my skin purple?`,
        answer: `Ask for violet magic around the book and hands while keeping natural skin tone on the face.`,
      },
      {
        question: `Can men use this sorceress look?`,
        answer: `The styling is written as a sorceress scene. For a different mage mood, pick a wizard or wanderer style instead.`,
      },
    ],
    addonLine: `Want a quieter arcane cast? Add: keep the dark gown, levitating spell book, violet swirl, and gothic tower, but ease magic density near the eyes—no extra familiars, no modern neon signs.`,
  },
  "desert-warrior-prince-ai-photo-prompt": {
    intro: `Warrior prince on rolling sunset dunes: flowing scarves, curved sword, swirling sand, and a golden palace far away under desert sunset gold. Upload one clear chest-up photo.`,
    tips: [
      `Use a sharp chest-up portrait; dusty filters on the source fight clean scarf edges and sand motion.`,
      `If scarves hide the whole face, ask for flowing scarves that frame the face without covering the eyes.`,
      `Ask for a curved sword and distant golden palace on sunset dunes—avoid snowy or forest backgrounds.`,
      `Keep clothing and pose off so the desert prince stance and swirling sand can appear.`,
    ],
    faqs: [
      {
        question: `Must I already be in a desert photo?`,
        answer: `No. A clear indoor or city portrait works; the prompt builds the dunes, sand, and distant palace.`,
      },
      {
        question: `Will my beard or hairstyle change?`,
        answer: `No. Face, skin tone, hairstyle, beard, and head covering stay while scarves and pose restyle around you.`,
      },
      {
        question: `Why does the palace look like a modern mall?`,
        answer: `Ask for a distant golden palace silhouette on the horizon under warm sunset light, not glass buildings.`,
      },
      {
        question: `Can I keep my own kurta?`,
        answer: `Turn clothing preservation on. By default the look restyles into flowing scarves and desert prince attire.`,
      },
    ],
    addonLine: `Want a quieter dune stare? Add: keep the flowing scarves, curved sword, sunset dunes, and distant palace, but thin the sand swirl near the face—no modern sunglasses, no crowded camel caravan.`,
  },
  "space-bounty-hunter-ai-photo-prompt": {
    intro: `Dusty desert sci-fi bounty hunter look: layered leather gear at a sunbaked spaceport with dome hangars and heat haze, original helmet under one arm. Your face, skin tone and hairstyle stay locked.`,
    tips: [
      `Use one clear chest-up photo with the face sharp—front or slight three-quarter angle in even daylight.`,
      `Leave clothing and pose unlocked so the leather gear, helmet-under-arm stance and desert spaceport can apply.`,
      `If the port looks empty, ask for rounded cargo containers and dome hangars with dust storms—without covering the face.`,
      `When skin tone shifts, restate exact skin tone and apparent age; avoid beauty filters on the upload.`,
    ],
    faqs: [
      {
        question: `Will my clothes stay the same?`,
        answer: `Not by default. Clothing is unlocked so layered leather bounty-hunter gear can apply; turn clothing on only to keep your real outfit.`,
      },
      {
        question: `Do I need a full-body photo?`,
        answer: `A clear chest-up portrait is enough. Face fully visible and sharp matters more than seeing your shoes.`,
      },
      {
        question: `Can I keep my exact pose?`,
        answer: `Yes—turn pose preservation on. By default pose is unlocked so the helmet-under-arm spaceport stance can form.`,
      },
      {
        question: `Why does the helmet hide my face?`,
        answer: `Ask for the original helmet held under the arm, visor away from the face, so identity stays clear.`,
      },
    ],
    addonLine: `Want thicker desert atmosphere? Add: keep the leather gear, helmet under the arm and spaceport, but deepen the heat haze and distant dust—no jetpack, no extra bounty targets in frame.`,
  },
  "kids-astronaut-space-ai-photo-prompt": {
    intro: `Fun kids' astronaut adventure: white space suit with visor up, bouncing on an alien planet of glowing crystals while Earth rises in a starry sky. Your child's face, hair and age stay exact.`,
    tips: [
      `Upload one clear eye-level photo of the child with a sharp, unobscured face and soft daylight—no filters or stickers.`,
      `Leave clothing and pose unlocked so the white suit, visor-up look and bounce pose can apply.`,
      `If the planet looks blank, ask for glowing crystals, craters and Earth rising without covering the face.`,
      `When age or skin tone drifts, restate exact skin tone and apparent age—no beautify or age-up.`,
    ],
    faqs: [
      {
        question: `What photo works best for a child?`,
        answer: `One sharp eye-level shot with the face fully visible. Soft daylight and no stickers help keep identity.`,
      },
      {
        question: `Will the child's age change?`,
        answer: `No—face, hair, skin tone and apparent age stay. Avoid add-ons that ask to make them look older.`,
      },
      {
        question: `Does the helmet cover the face?`,
        answer: `The look uses a white suit with the visor up so the child's face stays readable.`,
      },
      {
        question: `Why does Earth look flat in the sky?`,
        answer: `Ask for Earth rising clearly above the alien horizon with a starry sky, not a sticker pasted behind the suit.`,
      },
    ],
    addonLine: `Want a richer alien surface? Add: keep the white suit, visor up and Earth rise, but add a few more glowing crystals near the boots—no extra astronauts, no scary aliens.`,
  },
  "half-android-portrait-ai-photo-prompt": {
    intro: `Cinematic half-android close-up: one side chrome with glowing circuitry, the other your real face, lit by cyan and orange rim light in a dark studio. Identity and skin tone stay locked.`,
    tips: [
      `Start with one clear chest-up photo, face fully visible—front or slight three-quarter works best.`,
      `Leave clothing and pose unlocked for the chrome half-face circuitry and cinematic studio framing.`,
      `If circuitry looks muddy, ask for sharp glowing lines on the chrome half without covering both eyes.`,
      `When the human side lightens, restate exact skin tone—no beautify or ethnicity shift.`,
    ],
    faqs: [
      {
        question: `Will both sides of my face stay mine?`,
        answer: `Yes—the human half keeps your exact features and skin tone; only one side becomes chrome circuitry.`,
      },
      {
        question: `Do I need a dark studio photo already?`,
        answer: `No. A clear daylight portrait works; the dark studio with cyan and orange rim light is built in.`,
      },
      {
        question: `Will my hairstyle change?`,
        answer: `No—hairstyle, beard or head covering stay. The chrome treatment sits on the face, not a new haircut.`,
      },
      {
        question: `Why does the chrome side look blurry?`,
        answer: `Ask for crisp chrome plating and fine glowing circuitry on one half, with sharp focus on both eyes.`,
      },
    ],
    addonLine: `Want stronger chrome contrast? Add: keep half the face human and half chrome with glowing circuitry, but sharpen the cyan rim on the metal side—no full-robot head, no floating HUD text.`,
  },
  "neon-samurai-cyborg-ai-photo-prompt": {
    intro: `Neon crimson-and-cyan cyborg samurai: armored figure slashing a glowing katana on a rain-soaked megacity rooftop with abstract neon signs. Your face, skin tone and hair stay recognisable.`,
    tips: [
      `Use one sharp chest-up portrait in even daylight with the face fully visible.`,
      `Leave clothing and pose unlocked so cyborg samurai armor, glowing katana and slash action can apply.`,
      `If neon looks dull, ask for rain reflections and abstract glowing signs—without readable brand logos on the face.`,
      `When identity drifts, restate same face shape, skin tone and hairstyle; skip beauty filters on the source.`,
    ],
    faqs: [
      {
        question: `Will my clothes be replaced?`,
        answer: `Yes by default—clothing is unlocked for cyborg samurai armor. Turn clothing on only to keep your real outfit.`,
      },
      {
        question: `Must I already hold a sword in the photo?`,
        answer: `No. With pose unlocked, the glowing katana slash is added while your face stays the same.`,
      },
      {
        question: `Is the background a real city photo?`,
        answer: `It builds a rainy neon megacity rooftop with abstract glowing signs and holograms—not a tourist landmark shot.`,
      },
      {
        question: `Why does the katana look like a stick?`,
        answer: `Ask for a clear glowing katana blade mid-slash with neon rim light catching the rain.`,
      },
    ],
    addonLine: `Want wetter neon rain? Add: keep the cyborg armor, glowing katana and rooftop slash, but thicken rain streaks on the armor plates—no extra fighters, no bloody effects.`,
  },
  "desert-planet-wanderer-ai-photo-prompt": {
    intro: `Burnt-orange desert-planet wanderer: layered robes crossing vast dunes under a single huge pale sun, with sandstorms on the horizon. Face, skin tone and hairstyle stay yours.`,
    tips: [
      `Upload one clear chest-up photo with a sharp face—front or slight three-quarter angle.`,
      `Leave clothing and pose unlocked so layered desert robes and the dune-crossing stance can apply.`,
      `If dunes look flat, ask for vast orange sand under one huge pale sun with distant storms—without hiding the face.`,
      `When skin lightens in harsh sun, restate exact skin tone and apparent age.`,
    ],
    faqs: [
      {
        question: `Do I need an outdoor desert photo?`,
        answer: `No. A clear indoor portrait works; the vast orange dunes and huge pale sun are generated around you.`,
      },
      {
        question: `Will my clothes stay?`,
        answer: `Not by default. Clothing is unlocked for layered desert robes; preserve clothing only if you want your real outfit.`,
      },
      {
        question: `Can I keep a head covering I already wear?`,
        answer: `Yes—hairstyle, beard or head covering stay part of your identity even when robes are added.`,
      },
      {
        question: `Why does the sun look like a white circle sticker?`,
        answer: `Ask for one huge pale sun low over the dunes with natural heat haze, not a flat cut-out in the sky.`,
      },
    ],
    addonLine: `Want a stronger dune epic feel? Add: keep the layered robes, huge pale sun and orange dunes, but push the sandstorm a little closer on the horizon—no second sun, no speeder vehicles.`,
  },
  "star-of-your-own-movie-poster-ai-prompt": {
    intro: `Moody teal-and-orange blockbuster poster: you as the action star against a night city skyline with explosions and searchlights. Face, skin tone and hairstyle stay locked.`,
    tips: [
      `Use one clear chest-up photo with the face sharp and fully visible.`,
      `Leave clothing and pose unlocked so hero wardrobe and a strong poster pose can apply.`,
      `If the poster feels empty, ask for night skyline, searchlights and distant explosions that stay behind you—not over the face.`,
      `When the grade washes out skin, restate exact skin tone under the moody teal-orange look.`,
    ],
    faqs: [
      {
        question: `Will title text appear on the poster?`,
        answer: `The default look is you as the star with a blockbuster backdrop. Ask for no title text if lettering shows up.`,
      },
      {
        question: `Do I need a dramatic pose already?`,
        answer: `No. Pose is unlocked so a hero poster stance can form while your face stays recognisable.`,
      },
      {
        question: `Will my age or face change?`,
        answer: `No—face shape, skin tone, hairstyle and apparent age stay. Avoid beautify or de-age add-ons.`,
      },
      {
        question: `Why do the explosions cover my face?`,
        answer: `Ask for explosions and searchlights in the background city skyline only, with your face clear in the foreground.`,
      },
    ],
    addonLine: `Want a punchier poster sky? Add: keep your face, the night skyline and hero pose, but add one sharper searchlight beam behind the shoulder—no title text, no fake studio logos.`,
  },
  "retro-hand-painted-film-poster-ai-prompt": {
    intro: `Warm 1970s hand-painted cinema poster: you both as hero and heroine against a dramatic painted sky with burst lines and grain. Both faces, skin tones and relative heights stay true.`,
    tips: [
      `Upload one clear photo per person, or one sharp photo of you both with both faces large.`,
      `Clothing stays by default—your real outfits remain; unlock clothing only if you want period poster costumes.`,
      `Leave pose unlocked so the classic hero-and-heroine poster layout can form.`,
      `If the paint look fades, ask for grainy hand-painted texture and burst lines without covering either face.`,
    ],
    faqs: [
      {
        question: `Do we need two separate photos?`,
        answer: `One clear photo per person works best, but a single photo of you both is fine if both faces are sharp.`,
      },
      {
        question: `Will our clothes change?`,
        answer: `No by default—clothing is preserved. Turn clothing off only if you want retro film-poster outfits.`,
      },
      {
        question: `Can heights look wrong between us?`,
        answer: `The look keeps realistic relative heights. Use sources where neither face is oddly cropped.`,
      },
      {
        question: `Why do we look like smooth digital art?`,
        answer: `Ask for visible hand-painted brush texture and grainy 1970s poster finish, not a glossy modern render.`,
      },
    ],
    addonLine: `Want richer painted drama? Add: keep both faces, the 1970s poster layout and grain, but deepen the dramatic sky washes behind you—no modern CGI gloss, no third person.`,
  },
  "masked-stranger-halloween-selfie-ai-prompt": {
    intro: `Grainy late-90s flash Halloween selfie: you in a dim bedroom hallway with a shadowy blank white-mask figure behind. Spooky, not violent—your face and skin tone stay exact.`,
    tips: [
      `Use one clear chest-up photo with the face sharp; even daylight source photos still work for this flash look.`,
      `Leave clothing and pose unlocked so the late-90s selfie framing and spooky hallway setup can apply.`,
      `If the mask figure crowds you, ask for the blank white mask slightly behind and to the side—never covering your face.`,
      `When flash washes skin, restate exact skin tone and keep grainy flash shadows without beautify.`,
    ],
    faqs: [
      {
        question: `Is this meant to look violent?`,
        answer: `No—it is a spooky late-90s flash selfie with a blank white mask figure. Keep it eerie, not graphic.`,
      },
      {
        question: `Will my face stay clear?`,
        answer: `Yes. Your face stays the main subject; the masked figure stays behind you in the dim hallway.`,
      },
      {
        question: `Do I need a dark hallway photo already?`,
        answer: `No. A clear portrait works; the dim late-90s bedroom hallway and flash look are built in.`,
      },
      {
        question: `Why does the mask look like a face filter on me?`,
        answer: `Ask for a separate shadowy figure in a blank white mask behind you—not a mask on your own face.`,
      },
    ],
    addonLine: `Want a creepier hallway depth? Add: keep your face, the flash selfie and blank white mask figure, but push the figure a step deeper into the dark hallway—no gore, no jump-scare blood.`,
  },
  "y2k-ghost-doorway-selfie-ai-photo-prompt": {
    intro: `Early-2000s point-and-shoot spooky selfie: digital flash grain with a sheet-ghost silhouette in a half-open dark doorway behind you. Your real face, hair and skin tone stay locked.`,
    tips: [
      `Upload one clear chest-up photo with the face fully visible and sharp.`,
      `Leave clothing and pose unlocked so the Y2K flash selfie framing and doorway ghost can apply.`,
      `If the ghost looks solid or scary-violent, ask for a soft sheet-ghost silhouette in the doorway—fun spooky, not gore.`,
      `When colours look too clean, ask for early-2000s digital-camera flash and mild noise.`,
    ],
    faqs: [
      {
        question: `Is the ghost on my face?`,
        answer: `No. You stay clear in the flash selfie; the sheet-ghost silhouette stands in the dark doorway behind.`,
      },
      {
        question: `Do I need an old digital camera photo?`,
        answer: `No. A sharp modern portrait works; the early-2000s point-and-shoot flash look is applied.`,
      },
      {
        question: `Will my clothes change?`,
        answer: `By default clothing is unlocked for the selfie scene. Turn clothing on if you want to keep your real outfit only.`,
      },
      {
        question: `Why does the doorway look bright?`,
        answer: `Ask for a dark home hallway at night with a half-open doorway so the sheet ghost reads as a silhouette.`,
      },
    ],
    addonLine: `Want a more Y2K camera feel? Add: keep your face, the flash selfie and sheet ghost in the doorway, but add slight digital noise and a softer flash hotspot—no text date stamps covering the face.`,
  },
  "film-noir-detective-ai-photo-prompt": {
    intro: `1940s black-and-white noir detective: fedora and trench coat in a night office with venetian-blind shadows, rain on the window and smoke haze. Your face and identity stay recognisable in mono.`,
    tips: [
      `Use one clear chest-up photo with the face sharp—front or slight three-quarter angle.`,
      `Leave clothing and pose unlocked so the fedora, trench coat and noir office framing can apply.`,
      `If shadows look flat, ask for strong venetian-blind stripes and rain-streaked window light across the scene.`,
      `When the face softens in black and white, restate exact features and apparent age—no beautify.`,
    ],
    faqs: [
      {
        question: `Will the photo stay in colour?`,
        answer: `No—this look is black-and-white film noir. Your face shape and features still stay recognisable.`,
      },
      {
        question: `Do I need a vintage photo already?`,
        answer: `No. A clear modern portrait works; the 1940s office, blinds and rain window are built around you.`,
      },
      {
        question: `Can I keep my own clothes?`,
        answer: `Turn clothing preservation on. By default clothing is unlocked for the fedora and trench coat.`,
      },
      {
        question: `Why do the blind shadows miss my face?`,
        answer: `Ask for venetian-blind shadow stripes falling across the coat and wall, with the face still readable.`,
      },
    ],
    addonLine: `Want deeper noir shadows? Add: keep the fedora, trench coat and rain-streaked window, but strengthen the venetian-blind stripes across the coat—no colour tint, no modern gadgets.`,
  },
  "secret-agent-tuxedo-couple-ai-photo-prompt": {
    intro: `Glamorous spy-thriller couple night: tuxedo and evening gown on a casino-style marble balcony over a glittering harbor with fireworks. Both faces, skin tones and relative heights stay true.`,
    tips: [
      `Upload one clear photo per person, or one sharp photo of you both with both faces large.`,
      `Clothing stays by default—your real outfits remain; unlock clothing only for tuxedo and gown styling.`,
      `Leave pose unlocked so the balcony spy-thriller stance can form over the harbor.`,
      `If fireworks overpower faces, ask for distant harbor fireworks and glitter without washing out either person.`,
    ],
    faqs: [
      {
        question: `Do we need two photos?`,
        answer: `One clear photo per person is ideal, but one photo of you both works if both faces are sharp and visible.`,
      },
      {
        question: `Will we automatically get a tuxedo and gown?`,
        answer: `Only if you turn clothing preservation off. By default your real clothes stay on the glittering balcony.`,
      },
      {
        question: `Can heights look uneven?`,
        answer: `The look keeps realistic relative heights. Prefer sources where neither person is tightly cropped.`,
      },
      {
        question: `Why do the fireworks look pasted on?`,
        answer: `Ask for fireworks over the glittering harbor behind the balcony, with natural night depth—not stickers beside your heads.`,
      },
    ],
    addonLine: `Want richer night gold? Add: keep both faces, the marble balcony and harbor glitter, but warm the fireworks bokeh slightly behind you—no logos on the railing, no third agent in frame.`,
  },
  "wild-west-frontier-cowboy-ai-photo-prompt": {
    intro: `Dusty sunset sepia frontier hero: duster coat and hat striding a wooden-storefront town street with tumbleweeds and low sun film grain. Face, skin tone and hairstyle stay yours.`,
    tips: [
      `Start with one clear chest-up photo, face fully visible in even daylight.`,
      `Leave clothing and pose unlocked so the duster, hat and sunset street stride can apply.`,
      `If the town looks modern, ask for dusty wooden storefronts with no readable signs and tumbleweeds at low sun.`,
      `When sepia washes skin, restate exact skin tone under the dusty sunset grade.`,
    ],
    faqs: [
      {
        question: `Will my clothes change?`,
        answer: `Yes by default—clothing is unlocked for a duster coat and hat. Preserve clothing only to keep your real outfit.`,
      },
      {
        question: `Do I need a full-body walking photo?`,
        answer: `No. A sharp chest-up portrait is enough; the dusty street stride builds when pose is unlocked.`,
      },
      {
        question: `Is the look full colour?`,
        answer: `It uses a dusty sunset sepia-leaning grade with film grain—not bright modern colour.`,
      },
      {
        question: `Why do store signs show random text?`,
        answer: `Ask for wooden storefronts with no readable signs so the frontier street stays clean behind you.`,
      },
    ],
    addonLine: `Want thicker sunset dust? Add: keep the duster coat, hat and frontier street, but add a light dust haze in the low sun—no gunfights, no crowd of extras.`,
  },
  "zombie-apocalypse-survivor-group-ai-photo-prompt": {
    intro: `Gritty but family-friendly survivor poster: your whole group with backpacks through an abandoned overgrown city of rusted cars, vines and horizon smoke. Every face and the same headcount stay locked.`,
    tips: [
      `Use one clear group photo where every face is visible, facing the camera, with even light on all.`,
      `Clothing stays by default—real outfits remain; unlock clothing only if you want matching survivor gear.`,
      `Leave pose unlocked so the running-through-ruins energy can form without adding extra people.`,
      `If the city looks empty, ask for rusted cars, vines and distant smoke without covering any face.`,
    ],
    faqs: [
      {
        question: `Must everyone be in one photo?`,
        answer: `Yes—one clear group photo with every face visible works best so the same people and count are kept.`,
      },
      {
        question: `Will our clothes change?`,
        answer: `No by default. Clothing is preserved; turn it off only if you want survivor gear applied.`,
      },
      {
        question: `Can extra people appear?`,
        answer: `No. Only the people in your upload are used—same number of faces, no blended or swapped identities.`,
      },
      {
        question: `Is this too scary for a family share?`,
        answer: `It is a desaturated survival poster with overgrown ruins—gritty mood, not graphic horror. Ask for no gore if anything looks too intense.`,
      },
    ],
    addonLine: `Want denser overgrown ruins? Add: keep every face, the abandoned street and backpacks, but add more vines on the rusted cars—no graphic zombies in the foreground, no extra strangers.`,
  },
  "vintage-1920s-gangster-boss-ai-photo-prompt": {
    intro: `Cold steel 1920s gangster-boss stride: flat cap and wool coat through a smoky industrial street of brick factories, cobblestones and gas lamps. Your face, skin tone and age stay exact.`,
    tips: [
      `Upload one clear chest-up photo with the face sharp and fully visible.`,
      `Leave clothing and pose unlocked so the flat cap, wool coat and industrial-street stride can apply.`,
      `If smoke looks fake, ask for soft factory smoke and gas-lamp glow without hiding the face.`,
      `When the cold grade lightens skin, restate exact skin tone—no beautify.`,
    ],
    faqs: [
      {
        question: `Will my clothes be replaced?`,
        answer: `Yes by default for the flat cap and wool coat. Turn clothing preservation on to keep your real outfit.`,
      },
      {
        question: `Do I need a period photo already?`,
        answer: `No. A clear modern portrait works; the smoky 1920s industrial street is built around you.`,
      },
      {
        question: `Does my face stay the same in the cold grade?`,
        answer: `Yes—face shape, features, hairstyle and apparent age stay while the cold cinematic grade applies.`,
      },
      {
        question: `Why do the gas lamps look like yellow blobs?`,
        answer: `Ask for clear gas lamps along the brick factory street with soft smoke, still keeping your face sharp.`,
      },
    ],
    addonLine: `Want heavier industrial mood? Add: keep the flat cap, wool coat and cobblestone street, but thicken the factory smoke behind you—no tommy-gun props, no crowd of henchmen.`,
  },
  "victorian-gothic-novel-heroine-ai-photo-prompt": {
    intro: `Moody Victorian gothic heroine: lace high-neck gown, candle in hand on a foggy moor with a dark manor and storm clouds. Face, skin tone and hairstyle stay locked in oil-painting light.`,
    tips: [
      `Use one clear chest-up photo with the face fully visible—front or slight three-quarter.`,
      `Leave clothing and pose unlocked so the lace gown, candle-in-hand pose and foggy moor can apply.`,
      `If fog swallows detail, ask for soft moor fog with the gothic manor readable in the distance—face still clear.`,
      `When candle light washes skin, restate exact skin tone under warm oil-painting light.`,
    ],
    faqs: [
      {
        question: `Will my clothes stay?`,
        answer: `Not by default. Clothing is unlocked for a lace high-neck gown; preserve clothing only to keep your real outfit.`,
      },
      {
        question: `Must I already hold a candle?`,
        answer: `No. With pose unlocked, a candle in hand is added while your face stays recognisable.`,
      },
      {
        question: `Is this a painted look or a photo look?`,
        answer: `It aims for photoreal portraiture with oil-painting-like light on a foggy moor—not a flat illustration.`,
      },
      {
        question: `Why is the manor missing?`,
        answer: `Ask for a dark gothic manor on the foggy moor under storm clouds, placed behind you without covering the face.`,
      },
    ],
    addonLine: `Want deeper moor atmosphere? Add: keep the lace gown, candle and foggy manor, but thicken storm clouds behind the manor—no modern buildings, no extra figures on the moor.`,
  },
  "regency-ballroom-couple-ai-photo-prompt": {
    intro: `Pastel candlelit Regency romance: empire-waist gown and tailcoat mid-waltz in a chandelier ballroom with pastel flowers. Both faces, skin tones and relative heights stay true.`,
    tips: [
      `Upload one clear photo per person, or one sharp photo of you both with both faces large.`,
      `Clothing stays by default—unlock it only if you want empire gown and tailcoat styling.`,
      `Leave pose unlocked so the mid-waltz ballroom moment can form.`,
      `If chandeliers look sparse, ask for warm candlelight and pastel flowers without covering either face.`,
    ],
    faqs: [
      {
        question: `Do we need two separate photos?`,
        answer: `One clear photo per person works best, but a single photo of you both is fine if both faces are sharp.`,
      },
      {
        question: `Will our clothes change into period outfits?`,
        answer: `Only if you turn clothing preservation off. By default your real clothes stay in the ballroom.`,
      },
      {
        question: `Must we already be dancing in the source?`,
        answer: `No. Pose is unlocked so a mid-waltz frame can form while both faces stay recognisable.`,
      },
      {
        question: `Why do heights look wrong?`,
        answer: `The look keeps realistic relative heights—use sources where neither person is tightly cropped at the neck only.`,
      },
    ],
    addonLine: `Want softer ballroom romance? Add: keep both faces, the waltz and candle-lit chandeliers, but add a few more pastel flowers along the wall—no modern DJ gear, no third dancer close-up.`,
  },
  "moonlit-vampire-romance-couple-ai-photo-prompt": {
    intro: `Moonlit crimson gothic romance: couple in dark velvet in a misty pine forest under a huge full moon. Both faces, skin tones and relative heights stay locked—romantic mood, not horror gore.`,
    tips: [
      `Use one clear photo per person, or one sharp photo of you both with both faces readable.`,
      `Clothing stays by default—unlock clothing only if you want dark velvet styling.`,
      `Leave pose unlocked so the misty forest romance framing can form under the full moon.`,
      `If mist hides faces, ask for soft pine mist with moonlit glow that still keeps both faces clear.`,
    ],
    faqs: [
      {
        question: `Is this a scary vampire photo?`,
        answer: `It is a moonlit gothic romance in a misty pine forest—moody and stylish, not a gore horror shot.`,
      },
      {
        question: `Will our clothes become velvet automatically?`,
        answer: `Only if you turn clothing preservation off. By default your real outfits stay under the moonlight.`,
      },
      {
        question: `Do we need a forest photo already?`,
        answer: `No. Clear portraits work; the misty pine forest and huge full moon are built around you.`,
      },
      {
        question: `Can one face get lost in the mist?`,
        answer: `Ask for moonlit glow on both faces with mist in the pines behind—not fog covering either person.`,
      },
    ],
    addonLine: `Want richer moonlit mist? Add: keep both faces, dark velvet and the huge full moon, but soften crimson accents on the collars only—no fangs close-up, no blood effects.`,
  },
  "storybook-princess-kids-ai-photo-prompt": {
    intro: `Soft rose-gold storybook princess: child in an original sparkling gown twirling in a castle garden with fountain, fireflies and pastel flowers. Face, hair, skin tone and age stay exact.`,
    tips: [
      `Upload one clear eye-level photo of the child with a sharp face—soft daylight, no filters or stickers.`,
      `Leave clothing and pose unlocked so the sparkling gown and twirl pose can apply.`,
      `If the garden looks empty, ask for a fountain, glowing fireflies and pastel flowers without covering the face.`,
      `When skin or age shifts, restate exact skin tone and apparent age—no beautify or age-up.`,
    ],
    faqs: [
      {
        question: `What photo works best?`,
        answer: `One sharp eye-level photo of the child with the face fully visible and no stickers on the skin.`,
      },
      {
        question: `Will the child's age change?`,
        answer: `No—face, hair, skin tone and apparent age stay. Avoid add-ons that age them up or down.`,
      },
      {
        question: `Does the gown copy a famous movie dress?`,
        answer: `The look uses an original sparkling gown in a storybook castle garden—not a copy of a branded costume.`,
      },
      {
        question: `Why is the castle missing?`,
        answer: `Ask for a storybook castle garden with fountain and pastel flowers behind the child, face still clear.`,
      },
    ],
    addonLine: `Want a sweeter garden glow? Add: keep the child's face, sparkling gown and castle garden, but add a few more fireflies near the fountain—no licensed cartoon characters, no heavy crown hiding the hairline.`,
  },
  "dark-academia-library-ai-photo-prompt": {
    intro: `Moody brown dark-academia scholar: tweed blazer in a towering old library with spiral stairs, stacked books, warm lamps and papers in flight. Face, skin tone and hairstyle stay yours.`,
    tips: [
      `Use one clear chest-up photo with the face sharp—front or slight three-quarter.`,
      `Leave clothing and pose unlocked so the tweed blazer and library scholar framing can apply.`,
      `If papers look chaotic over the face, ask for flying pages around the shoulders, not across the eyes.`,
      `When warm lamps shift skin, restate exact skin tone under the moody brown grade.`,
    ],
    faqs: [
      {
        question: `Will my clothes change?`,
        answer: `Yes by default—clothing is unlocked for a tweed blazer look. Preserve clothing only to keep your real outfit.`,
      },
      {
        question: `Do I need a library photo already?`,
        answer: `No. A clear portrait works; the towering old library with spiral stairs and warm lamps is generated.`,
      },
      {
        question: `Can I keep my glasses or head covering?`,
        answer: `Yes—glasses, beard or head covering stay as part of your identity.`,
      },
      {
        question: `Why do the flying papers cover my face?`,
        answer: `Ask for papers swirling beside and behind you with the face kept clear in the warm lamp light.`,
      },
    ],
    addonLine: `Want a taller library feel? Add: keep the tweed blazer, stacked books and warm lamps, but show more of the spiral stairs behind—no floating Latin text overlays, no extra scholars crowding the frame.`,
  },
  "retro-90s-blister-card-action-figure-ai-prompt": {
    intro: `Saturated 90s toy listing shot: you as a glossy action figure sealed on a vintage blister card with a starburst sticker, photographed on a plain table in soft daylight. Face and skin tone stay recognisable.`,
    tips: [
      `Upload one clear chest-up photo with the face sharp and fully visible.`,
      `Leave clothing and pose unlocked so the glossy figure sculpt and blister-card packaging can apply.`,
      `If the card looks modern, ask for a vintage 90s blister card, starburst sticker and soft tabletop listing light.`,
      `When the toy face drifts, restate same face shape, hairstyle and exact skin tone even in plastic gloss.`,
    ],
    faqs: [
      {
        question: `Will I still look like myself as a toy?`,
        answer: `Yes—even stylized as a glossy figure, face shape, hair, skin tone and age stay recognisable.`,
      },
      {
        question: `Do I need a product photo background already?`,
        answer: `No. A clear portrait works; the plain table listing photo and blister card are built around you.`,
      },
      {
        question: `Will my clothes become plastic armor?`,
        answer: `By default clothing is unlocked for the action-figure look. Turn clothing on only to keep your real outfit details.`,
      },
      {
        question: `Why does the blister card show random logos?`,
        answer: `Ask for a vintage-style blister card with abstract starburst art only—no real brand names or logos.`,
      },
    ],
    addonLine: `Want a more 90s shelf look? Add: keep your face on the glossy figure and the blister card, but brighten the starburst sticker slightly—no real brand logos, no extra figures in the pack.`,
  },
  "plastic-brick-toy-figure-group-ai-photo-prompt": {
    intro: `Bright brick-toy diorama: each friend as a glossy plastic figure on a baseplate with tiny trees and a little house. Every face, skin tone and the same group size stay locked in fun toy scale.`,
    tips: [
      `Use one clear group photo where every face is visible and evenly lit, facing the camera.`,
      `Clothing stays by default so real outfits read on the toy figures; unlock clothing only for full toy costumes.`,
      `Leave pose unlocked so playful toy-scale action on the baseplate can form.`,
      `If the diorama looks empty, ask for tiny trees and a little house on the baseplate without hiding faces.`,
    ],
    faqs: [
      {
        question: `Must everyone be in one photo?`,
        answer: `Yes—one clear group photo with every face visible keeps the same people and count on the diorama.`,
      },
      {
        question: `Will our clothes change?`,
        answer: `No by default. Clothing is preserved so outfits stay readable on the glossy toy figures.`,
      },
      {
        question: `Can faces still look like us in toy form?`,
        answer: `Yes—each face, hairstyle, skin tone and age stay recognisable even as glossy brick-toy figures.`,
      },
      {
        question: `Why does someone disappear from the group?`,
        answer: `Make sure every face is visible in the source. The look keeps the same number of people—no extras, no drops.`,
      },
    ],
    addonLine: `Want a fuller baseplate scene? Add: keep every face as glossy brick-toy figures and the baseplate, but add one more tiny tree beside the little house—no extra people, no real brand logo tiles.`,
  },
  "crochet-amigurumi-couple-ai-photo-prompt": {
    intro: `Cozy craft-table amigurumi couple: yarn-textured crochet dolls with stitched details among yarn balls and hooks in soft window light. Both faces, skin tones and relative heights stay recognisable.`,
    tips: [
      `Upload one clear photo per person, or one sharp photo of you both with both faces large.`,
      `Clothing stays by default so outfits read in yarn texture; unlock clothing only for full crochet outfits.`,
      `Leave pose unlocked so the cozy craft-table doll pairing can form.`,
      `If yarn texture looks smooth like plastic, ask for clear crochet stitches and soft window light on the wooden table.`,
    ],
    faqs: [
      {
        question: `Do we need two photos?`,
        answer: `One clear photo per person is ideal, but one photo of you both works if both faces are sharp.`,
      },
      {
        question: `Will we still look like ourselves as dolls?`,
        answer: `Yes—even with yarn texture, both faces, hairstyles, skin tones and ages stay recognisable.`,
      },
      {
        question: `Do our clothes stay?`,
        answer: `Yes by default. Clothing is preserved so your outfits translate into stitched yarn detail.`,
      },
      {
        question: `Why do we look like smooth plastic toys?`,
        answer: `Ask for visible crochet amigurumi stitches and soft yarn texture on a cozy wooden craft table.`,
      },
    ],
    addonLine: `Want cozier craft clutter? Add: keep both faces as yarn amigurumi and the wooden craft table, but add one small yarn ball near the hooks—no third doll, no messy pile covering faces.`,
  },
  "color-pop-pedestal": {
    intro: `Bold monochrome product campaign: your item on a circular coral pedestal against a seamless coral studio backdrop—minimal, high-impact colour pop. Exact product shape, materials and colour stay preserved.`,
    tips: [
      `Upload a sharp product shot with the full item visible, true colour and clean edges—no heavy filters.`,
      `Keep the scene monochrome: one dominant backdrop colour with a slightly deeper or lighter pedestal tone.`,
      `Avoid unrelated props; the geometric pedestal and seamless backdrop should carry the campaign look.`,
      `If lighting looks flat, ask for premium studio highlights and soft controlled shadows on the product only.`,
    ],
    faqs: [
      {
        question: `Will my product colour change to coral?`,
        answer: `No—the product keeps its original colour, materials and finish. Coral is for the pedestal and backdrop only.`,
      },
      {
        question: `Can I add lifestyle props around it?`,
        answer: `This look stays minimal. Skip unrelated props so the pedestal and monochrome set keep the product dominant.`,
      },
      {
        question: `What kind of source photo works best?`,
        answer: `A sharp, well-lit product image showing the full shape and true surface colour without busy backgrounds.`,
      },
      {
        question: `Why does the pedestal match the product oddly?`,
        answer: `Ask for a simple geometric coral pedestal that supports the item, with the product colour left unchanged.`,
      },
    ],
    addonLine: `Want a cleaner coral campaign frame? Add: keep the exact product, circular pedestal and monochrome coral set, but soften the shadow under the base slightly—no extra props, no text overlays on the product.`,
  },
  "botanical-wellness-still-life": {
    intro: `Calm botanical still-life for skincare and wellness: product on warm limestone with soft green leaves, natural stone, folded unbleached linen and a pale beige backdrop. Exact product details stay preserved.`,
    tips: [
      `Use a sharp product photo with true colour, readable label and the full bottle or jar visible.`,
      `Keep props restrained—only a few leaves, stone or linen pieces so the product stays clearly dominant.`,
      `Prefer soft natural daylight; avoid harsh flash that flattens glass or cream textures.`,
      `If the set feels crowded, remove extra foliage and keep the limestone pedestal and pale beige backdrop clean.`,
    ],
    faqs: [
      {
        question: `Will the product packaging change?`,
        answer: `No—shape, materials, original colour, surface finish and packaging details stay the same.`,
      },
      {
        question: `How many props should appear?`,
        answer: `Only a few restrained natural elements like foliage, stone or linen. The product must stay dominant.`,
      },
      {
        question: `Is this good for skincare bottles?`,
        answer: `Yes—it is built as a calm botanical still-life set suited to skincare and wellness items.`,
      },
      {
        question: `Why do leaves cover the label?`,
        answer: `Ask for soft green leaves beside or behind the product so the label and full shape stay fully visible.`,
      },
    ],
    addonLine: `Want a quieter wellness set? Add: keep the exact product, limestone pedestal and soft leaves, but fold the linen a little flatter beside the base—no flower piles, no extra bottles in frame.`,
  },
  "midnight-luxury-spotlight": {
    intro: `Dark cinematic jewellery spotlight: rings, watches or perfume sit on a low black reflective plinth in a charcoal studio, rim light tracing the silhouette. Use one clear product photo.`,
    tips: [
      `Shoot or crop so the product fills the frame—rim light needs clean edges, not busy packaging clutter.`,
      `Ask for deep charcoal seamless studio and a low black reflective plinth—not a bright white tabletop.`,
      `Keep original metal colour and stone hues exact; cool grades often turn gold into silver tones.`,
      `Skip props and lifestyle hands; this look isolates the piece with controlled rim light only.`,
    ],
    faqs: [
      {
        question: `Does this work for perfume bottles as well as rings?`,
        answer: `Yes. Any jewellery, watch, or perfume piece works if shape, materials, and finish stay true to your photo.`,
      },
      {
        question: `Will my product colours change on the black background?`,
        answer: `They should not—original colour and surface finish stay locked. Re-ask if metals look washed out.`,
      },
      {
        question: `Is this a bright white ecommerce table shot?`,
        answer: `No—this is a dark charcoal studio with a reflective plinth and rim light for a premium campaign feel.`,
      },
      {
        question: `Do I need a studio photo already?`,
        answer: `No. A clear product shot with readable shape and finish is enough; the dark studio builds in the edit.`,
      },
    ],
    addonLine: `Want a softer luxury spotlight? Add: keep the charcoal studio, black reflective plinth, and rim light, but ease highlight intensity slightly—no white seamless, props, or lifestyle hands.`,
  },
  "floating-motion-hero": {
    intro: `Dynamic floating hero for ads: your product hangs in mid-air over a pale sage-to-cream studio with soft curved light trails and a subtle shadow beneath. Upload one sharp product photo.`,
    tips: [
      `Use a sharp, fully visible product shot so floating staging keeps edges crisp against the gradient.`,
      `Ask for pale sage-to-cream gradient with restrained light trails—not busy particle explosions.`,
      `Keep original packaging colour exact; warm grades can shift label whites toward cream.`,
      `Motion should stay in the background trails only—the product itself must remain perfectly sharp.`,
    ],
    faqs: [
      {
        question: `Will my product look blurry because of the motion?`,
        answer: `No. The product stays sharp; motion is only suggested through soft background light trails.`,
      },
      {
        question: `Do I need a photo already shot mid-air?`,
        answer: `No. A normal tabletop product photo works; suspension and the soft under-shadow are added in the style.`,
      },
      {
        question: `Is this a dark luxury jewellery spotlight?`,
        answer: `No—this is a warm pale sage-to-cream floating hero for banners and ads, not a charcoal rim-light studio.`,
      },
      {
        question: `Can I use this for bottle or box packaging?`,
        answer: `Yes, as long as shape, materials, labels, and finish stay true to the uploaded product.`,
      },
    ],
    addonLine: `Want a calmer floating banner? Add: keep the suspended product, soft under-shadow, and sage-to-cream studio, but soften light trails further—no heavy particle storms or tilted action blur on the product.`,
  },
  "tactile-macro-detail": {
    intro: `Macro texture close-up: the most tactile details of your product sit on warm ivory microsuede with soft shallow depth of field and golden-neutral light. Use one clear detail-ready product photo.`,
    tips: [
      `Prefer photos where stitching, grain, metal grain, or finish is already visible—macro needs real texture to reveal.`,
      `Ask for warm ivory microsuede with fine matte-stone feel—not a glossy reflective table.`,
      `Keep the hero detail tack sharp; only distant edges should fall into soft shallow depth of field.`,
      `Preserve original colour and finish; warm golden grades sometimes over-amber leather and metals.`,
    ],
    faqs: [
      {
        question: `Should I upload a full product shot or a close crop?`,
        answer: `Either works if texture is readable. A clear full product photo is fine; the style frames the most tactile detail.`,
      },
      {
        question: `Will the whole product stay in focus?`,
        answer: `The main feature stays tack sharp; distant areas can soft-fall naturally, like a real macro lens.`,
      },
      {
        question: `Is this an in-hand scale shot?`,
        answer: `No—this is a surface macro on ivory microsuede. In-hand scale is a separate style.`,
      },
      {
        question: `Does packaging print stay readable?`,
        answer: `Yes if it is in the hero detail. Ask again if labels smear while texture elsewhere looks sharp.`,
      },
    ],
    addonLine: `Want a gentler macro read? Add: keep the ivory microsuede surface and tack-sharp main detail, but soften depth-of-field falloff slightly—no extreme fisheye crop or glossy mirror table.`,
  },
  "everyday-in-hand-scale": {
    intro: `Natural in-hand scale shot: one adult hand holds your product so buyers see true size, against a softly blurred bathroom vanity by a sunlit window. Upload one clear product photo.`,
    tips: [
      `Use a sharp product photo with readable proportions so the hand scale feels believable.`,
      `Ask for one adult hand and a softly blurred neutral vanity by a window—not a crowded lifestyle scene.`,
      `Keep the product fully visible and unobstructed; fingers should not hide labels or key details.`,
      `Preserve exact product colour under soft daylight; warm window light can orange pale packaging.`,
    ],
    faqs: [
      {
        question: `Do I need a photo of someone already holding the product?`,
        answer: `No. A clear product-only shot works; a natural adult hand and vanity backdrop are added for scale.`,
      },
      {
        question: `Will the hand cover important labels?`,
        answer: `It should not—the product stays fully visible and sharp. Re-ask if fingers block key details.`,
      },
      {
        question: `Is this a floating mid-air hero for banners?`,
        answer: `No—this is an everyday in-hand scale reference so buyers judge true size.`,
      },
      {
        question: `Whose hand appears in the result?`,
        answer: `A generic adult hand with realistic skin texture for scale—not a celebrity or model identity.`,
      },
    ],
    addonLine: `Want a quieter scale frame? Add: keep the single adult hand, true product size, and sunlit vanity blur, but ease skin warmth slightly—no two-hand grips, props, or sharp busy backgrounds.`,
  },
  "analog-street-fashion": {
    intro: `Candid film-look street walk: soft sunlit analog warmth, tree-lined city street with parked cars and gentle motion blur, simple elegant black outfit with pearl necklace and red roses. Use one clear portrait with walking crop space.`,
    tips: [
      `Upload a clear face with room for full or half-body crop—tight headshots fight the walking pose.`,
      `Natural daylight sources hold the faded film warmth better than harsh flash selfies.`,
      `Face, features, skin texture, and likeness stay locked; outfit and street rebuild unless you preserve clothing.`,
      `Ask for soft grain and analog warmth—not heavy Instagram filters that muddy the face.`,
    ],
    faqs: [
      {
        question: `Will my face stay recognisable?`,
        answer: `Yes. Identity, facial features, natural skin texture, and likeness stay; only scene, outfit, and film texture shift by default.`,
      },
      {
        question: `Do I need a street photo already?`,
        answer: `No. A clear portrait with space for a walking crop is enough; the tree-lined street builds in the style.`,
      },
      {
        question: `Can I keep my own clothes?`,
        answer: `Turn clothing preservation on. Otherwise it restyles into the black outfit, pearl necklace, and red rose look.`,
      },
      {
        question: `Is this a sharp digital fashion studio shot?`,
        answer: `No—it is a candid analog street walk with soft sunlit film warmth and light grain.`,
      },
    ],
    addonLine: `Want a quieter film street walk? Add: keep the tree-lined street, black outfit, pearl necklace, and red rose bouquet, but soften grain slightly and use a calmer mid-stride—no neon night props or heavy vintage overlays.`,
  },
  "cozy-dream-room": {
    intro: `Cozy dream-room makeover for plain bedrooms: warm wood accents, layered neutral textiles, soft curtains and subtle greenery while your room’s walls, windows and proportions stay recognisable. Upload one clear bedroom photo.`,
    tips: [
      `Photograph the full room with walls, windows, and floor visible so furniture fits real proportions.`,
      `Ask for warm wood, layered neutrals, soft curtains, and light greenery—not a hotel lobby makeover.`,
      `Keep architecture locked: room size, major walls, doors, and ceiling geometry should not invent new windows.`,
      `Even daylight or soft evening light in the source helps textiles read warm without orange blowouts.`,
    ],
    faqs: [
      {
        question: `Will my bedroom still look like my house?`,
        answer: `Yes. Proportions, major walls, windows, doors, and ceiling geometry stay when preserved; only furniture and soft décor upgrade.`,
      },
      {
        question: `Does this work on an empty or sparsely furnished room?`,
        answer: `Yes. Plain bedrooms are ideal—the style furnishes for the room’s function without inventing a different property.`,
      },
      {
        question: `Is this the same as empty-room virtual staging for listings?`,
        answer: `Related idea, different mood—this is a cozy lived-in dream bedroom with warm textiles, not a cooler sales staging.`,
      },
      {
        question: `Can I use a phone photo?`,
        answer: `Yes if the room is clear and not blurry. Wide, level shots work better than extreme corner selfies.`,
      },
    ],
    addonLine: `Want a lighter dream bedroom? Add: keep the warm wood accents, layered neutral textiles, and soft curtains, but reduce greenery slightly—no chandelier overload or layout-changing wall moves.`,
  },
  "modern-virtual-staging": {
    intro: `Move-in-ready virtual staging for empty rooms: cream upholstery, warm natural wood, textured neutral rug, soft curtains and minimal décor while walls, windows and floor plan stay true. Use one clear empty-room photo.`,
    tips: [
      `Shoot empty rooms wide and level so sofa and rug scale match real floor area.`,
      `Ask for cream upholstery, warm wood, and refined minimal décor—not cluttered showroom props.`,
      `Preserve wall positions, window and door locations, ceiling geometry, and flooring direction.`,
      `Balanced exposure helps staged fabrics stay cream instead of yellow or grey.`,
    ],
    faqs: [
      {
        question: `Must the room be completely empty?`,
        answer: `Empty or nearly empty works best. The style stages for the room’s function while keeping architecture recognisable.`,
      },
      {
        question: `Will windows and doors move?`,
        answer: `No when preserved. Wall positions, openings, ceiling geometry, and flooring direction stay locked.`,
      },
      {
        question: `Is this a luxury walnut living-room redesign?`,
        answer: `No—this is clean move-in-ready staging with cream upholstery and minimal décor for listings.`,
      },
      {
        question: `Can agents use this for listing photos?`,
        answer: `Yes—that is the intent: polished staged living spaces that still read as the same property.`,
      },
    ],
    addonLine: `Want a quieter staged listing look? Add: keep the cream upholstery, warm wood, and textured neutral rug, but simplify décor further—no oversized art walls or layout-changing furniture piles.`,
  },
  "refined-luxury-living": {
    intro: `Sophisticated luxury living restyle: cream upholstery, warm walnut wood, layered textiles, refined artwork and soft premium lighting while your room shell stays recognisable. Upload one clear living-room photo.`,
    tips: [
      `Show full wall spans and window light so walnut and cream furniture scale correctly.`,
      `Ask for cream upholstery, warm walnut, layered textiles, and refined artwork—not gold-leaf maximalism.`,
      `Keep architectural shell, proportions, windows, doors, and flooring boundaries locked.`,
      `Warm elegant neutrals should not bleach skin tones in mirrors or wash artwork into neon.`,
    ],
    faqs: [
      {
        question: `Will my room still be recognisable?`,
        answer: `Yes. The architectural shell, proportions, windows, doors, and flooring boundaries stay when preserved.`,
      },
      {
        question: `Is this empty-room listing staging?`,
        answer: `No—this upgrades toward a sophisticated premium residential interior with walnut and layered textiles.`,
      },
      {
        question: `Do I need professional interior photos?`,
        answer: `No. A clear, level living-room photo with readable walls and windows is enough.`,
      },
      {
        question: `Can furniture colours change from my current set?`,
        answer: `Yes by default—the restyle brings cream upholstery and warm walnut while structure stays.`,
      },
    ],
    addonLine: `Want a slightly quieter luxury living room? Add: keep cream upholstery, warm walnut, and layered textiles, but ease artwork presence—no crystal chandeliers crowding the ceiling or moved window walls.`,
  },
  "garden-lawn-makeover": {
    intro: `Natural residential garden landscaping: healthy lawn, layered shrubs, flowering borders, ornamental grasses, small trees and a subtle stepping-stone path while yard boundaries stay true. Use one clear yard photo.`,
    tips: [
      `Capture the full yard with house edge, fences, and major trees visible so planting fits real boundaries.`,
      `Ask for healthy lawn, layered shrubs, flowering borders, and a subtle stepping-stone path—not a resort pool deck.`,
      `Preserve yard boundaries, house walls, fences, major trees, and overall spatial proportions.`,
      `Fresh natural green should stay realistic—avoid neon turf or cartoon flower beds.`,
    ],
    faqs: [
      {
        question: `Will my house and fence stay in place?`,
        answer: `Yes when preserved. Yard boundaries, house walls, fences, and major trees stay; planting and lawn improve.`,
      },
      {
        question: `Does a patchy or bare yard work as a source?`,
        answer: `Yes. The style improves landscape health and beds rather than inventing a different property.`,
      },
      {
        question: `Is this a patio furniture lounge makeover?`,
        answer: `No—this focuses on lawn, shrubs, borders, and a subtle path, not outdoor seating sets.`,
      },
      {
        question: `Should I photograph in sunlight?`,
        answer: `Clear daylight helps greens read natural. Avoid heavy blur or night shots where planting detail is lost.`,
      },
    ],
    addonLine: `Want a softer lawn makeover? Add: keep the healthy lawn, layered shrubs, and stepping-stone pathway, but reduce flowering density slightly—no swimming pools, fake turf, or relocated fence lines.`,
  },
  "outdoor-living-oasis": {
    intro: `Polished patio or rooftop lounge: natural wood seating, cream cushions, dining furniture, slatted pergola, warm ambient lights and potted greenery while terrace boundaries stay recognisable. Upload one clear outdoor photo.`,
    tips: [
      `Include railings, floor area, and doors so furniture and the pergola fit the real terrace footprint.`,
      `Ask for wood seating, cream cushions, slatted pergola, and warm ambient lighting—not a club dance floor.`,
      `Preserve architectural boundaries, railings, doors, windows, and overall spatial proportions.`,
      `Warm golden evening mood should not blow out cushion colour or invent extra floors.`,
    ],
    faqs: [
      {
        question: `Does this work for balconies as well as rooftops?`,
        answer: `Yes. Terrace, patio, rooftop, backyard, or balcony photos work if the floor area and boundaries are clear.`,
      },
      {
        question: `Will railings and doors stay where they are?`,
        answer: `Yes when preserved. Main boundaries, railings, doors, windows, and proportions stay locked.`,
      },
      {
        question: `Is this a front-yard curb-appeal makeover?`,
        answer: `No—this builds a lounge outdoor living oasis with seating, shade, and evening light.`,
      },
      {
        question: `Can I start from a bare concrete terrace?`,
        answer: `Yes. Bare outdoor spaces are ideal; furniture, pergola, plants, and lights are added in place.`,
      },
    ],
    addonLine: `Want a quieter rooftop evening? Add: keep the wood seating, cream cushions, slatted pergola, and warm lights, but soften string-light density—no DJ setups, water features, or moved railings.`,
  },
  "modern-curb-refresh": {
    intro: `Modern curb-appeal exterior refresh: manicured lawn, layered shrubs, flowering borders, stone walkway, warm entry lighting and subtle uplights while footprint, roofline and windows stay true. Use one clear front-of-house photo.`,
    tips: [
      `Shoot the full façade straight-on or slightly angled with driveway and walkway visible.`,
      `Ask for manicured lawn, layered shrubs, stone walkway, and warm entry lighting—not a commercial glass tower.`,
      `Preserve building footprint, roofline, window and door placement, garage position, and façade proportions.`,
      `Warm golden evening light should enhance entry lamps without inventing new window openings.`,
    ],
    faqs: [
      {
        question: `Will my house still look like mine?`,
        answer: `Yes. Footprint, roofline, windows, doors, garage alignment, and façade proportions stay when preserved.`,
      },
      {
        question: `Can paint and landscaping change?`,
        answer: `Yes—that is the makeover: façade finishes, planting, lighting, and walkway refresh around the same structure.`,
      },
      {
        question: `Is this an interior living-room restyle?`,
        answer: `No—this is a polished exterior curb-appeal upgrade of the front yard and façade.`,
      },
      {
        question: `Do night photos work?`,
        answer: `Warm evening shots can work if the façade is clear. Very dark underexposed fronts hide landscaping detail.`,
      },
    ],
    addonLine: `Want a softer curb refresh? Add: keep the manicured lawn, stone walkway, and warm entry lighting, but ease landscape uplighting—no tropical resort planting or shifted garage doors.`,
  },
  "kitchen-remodel-vision": {
    intro: `Realistic contemporary kitchen renovation preview: cream upper cabinets, muted sage lowers, light stone counters, white tile backsplash, brass hardware and stainless appliances while layout stays recognisable. Upload one clear kitchen photo.`,
    tips: [
      `Include counters, cabinets, and windows so the remodel respects the real footprint.`,
      `Ask for cream uppers, muted sage lowers, light stone, white tile, and brass hardware—not neon open shelving chaos.`,
      `Preserve room proportions, wall positions, sink and major appliance placement, and camera view.`,
      `Warm natural neutrals should keep stainless looking steel, not gold-tinted.`,
    ],
    faqs: [
      {
        question: `Will my sink and appliance places stay?`,
        answer: `Yes when preserved. Room proportions, sink position, major appliances, cabinet footprint, and view stay locked.`,
      },
      {
        question: `Is this only for empty gut-renovation shells?`,
        answer: `No. Lived-in kitchens work—the style modernises surfaces and cabinetry on the same layout.`,
      },
      {
        question: `Is this a spa bathroom upgrade?`,
        answer: `No—this is a contemporary kitchen remodel vision with cream, sage, stone, and brass.`,
      },
      {
        question: `Can I use this before hiring contractors?`,
        answer: `Yes—that is a common use: a realistic renovation preview from your own kitchen photo.`,
      },
    ],
    addonLine: `Want a quieter kitchen remodel preview? Add: keep cream uppers, muted sage lowers, light stone counters, and brass hardware, but simplify backsplash pattern—no island relocation or moved window walls.`,
  },
  "bathroom-spa-upgrade": {
    intro: `Calm spa bathroom renovation: warm wood vanity, pale stone, large-format neutral tile, frameless glass shower, brushed brass fixtures and soft integrated light while plumbing layout stays true. Use one clear bathroom photo.`,
    tips: [
      `Show vanity, shower zone, and tiles clearly so upgrades fit the real wet-area footprint.`,
      `Ask for warm wood vanity, pale stone, frameless glass, and brushed brass—not black glossy nightclub tile.`,
      `Preserve room proportions, toilet and shower footprint, vanity zone, window, and camera perspective.`,
      `Warm spa neutrals should not turn pale stone pink or invent extra windows.`,
    ],
    faqs: [
      {
        question: `Will toilet and shower positions change?`,
        answer: `No when preserved. Room proportions, toilet position, shower footprint, and vanity zone stay locked.`,
      },
      {
        question: `Does a small Indian apartment bathroom work?`,
        answer: `Yes if the photo is clear. The upgrade respects the existing footprint rather than inventing a hotel suite.`,
      },
      {
        question: `Is this a kitchen remodel style?`,
        answer: `No—this is a spa-inspired bathroom with stone, wood vanity, and soft integrated lighting.`,
      },
      {
        question: `Do I need a renovation already started?`,
        answer: `No. A normal bathroom photo is enough to preview the calm spa surfaces and fixtures.`,
      },
    ],
    addonLine: `Want a softer spa bath mood? Add: keep the warm wood vanity, pale stone, frameless glass shower, and brushed brass, but ease greenery—no freestanding tub added where none fits or moved plumbing walls.`,
  },
  "street-beautification": {
    intro: `Walkable neighbourhood street upgrade: improved sidewalks, street trees, planters, benches, tidy façades and subtle modern lighting while road alignment and buildings stay recognisable. Upload one clear street photo.`,
    tips: [
      `Shoot the road with sidewalks and building fronts visible so planting and benches fit real widths.`,
      `Ask for cleaner sidewalks, street trees, planters, and tidy edges—not a highway flyover redesign.`,
      `Preserve road alignment, building positions, boundary walls, gates, major trees, and camera viewpoint.`,
      `Fresh clean daylight should organise the street without erasing local building character.`,
    ],
    faqs: [
      {
        question: `Will the road and buildings stay the same?`,
        answer: `Yes when preserved. Road alignment, building positions, walls, gates, and major trees stay; public space tidies up.`,
      },
      {
        question: `Is this for a single house front only?`,
        answer: `It is a streetscape upgrade—sidewalks, trees, and edges—not a solo façade curb-appeal makeover.`,
      },
      {
        question: `Can narrow gali-style streets work?`,
        answer: `Yes if the photo clearly shows the street width and building edges; improvements stay realistic to that space.`,
      },
      {
        question: `Does night lighting get added?`,
        answer: `Subtle modern street lighting can appear, but the default mood is fresh clean daylight organisation.`,
      },
    ],
    addonLine: `Want a quieter street beautification? Add: keep improved sidewalks, street trees, planters, and tidy façades, but reduce bench count slightly—no skyscraper replacements or relocated road centre lines.`,
  },
  "historic-revival": {
    intro: `Careful heritage façade restoration: warm aged plaster, repaired stone, restored timber shutters and doors, preserved iron balcony railings and authentic patina while proportions and openings stay true. Use one clear building photo.`,
    tips: [
      `Photograph the full façade with windows, doors, balconies, and mouldings readable.`,
      `Ask for restored plaster, stone repair, timber shutters, and subtle patina—not a glass curtain-wall rebuild.`,
      `Preserve façade proportions, floor count, roofline, arches, columns, cornices, railings, and masonry patterns.`,
      `Warm heritage neutrals should repair surfaces, not invent new floors or modern cladding.`,
    ],
    faqs: [
      {
        question: `Will original arches and balconies stay?`,
        answer: `Yes when preserved. Proportions, openings, arches, columns, cornices, balconies, and masonry patterns stay locked.`,
      },
      {
        question: `Is this a brand-new modern house design?`,
        answer: `No—it restores the historic property carefully rather than replacing it with a different style.`,
      },
      {
        question: `Do damaged or peeling façades work as sources?`,
        answer: `Yes. Clear photos of worn heritage buildings are ideal; the style repairs surfaces and ornament.`,
      },
      {
        question: `Should decorative mouldings disappear for a clean look?`,
        answer: `No. Historically significant ornament stays; the goal is restoration, not stripping character.`,
      },
    ],
    addonLine: `Want a gentler heritage restore? Add: keep aged plaster, repaired stone, timber shutters, and iron railings, but soften patina slightly—no modern glass façades or removed historic cornices.`,
  },
  "family-lakshmi-puja-photo": {
    intro: `Warm Diwali family puja portrait at a decorated Lakshmi Puja entrance with marigold torans, large rangoli and glowing diyas at your feet—every face, age and height kept true. Upload one clear group photo with all faces visible.`,
    tips: [
      `Frame everyone together with every face sharp and evenly lit—missing faces cannot be invented accurately.`,
      `Pose stays by default; outfits restyle into coordinated festive red, gold, and cream unless clothing is preserved.`,
      `Ask for marigold torans, rangoli, and diyas at the family’s feet—not a generic party balloon backdrop.`,
      `Keep exact skin tones under warm festive light; Diwali grades often over-orange complexions.`,
    ],
    faqs: [
      {
        question: `Will children’s ages stay correct?`,
        answer: `Yes. Every person’s face, age, height difference, and family resemblance stay locked to the source.`,
      },
      {
        question: `Do we need a photo already taken at a puja entrance?`,
        answer: `No. A clear family group photo works; the decorated Lakshmi Puja entrance builds around your preserved pose.`,
      },
      {
        question: `Can we keep our real clothes?`,
        answer: `Turn clothing preservation on. Otherwise the family restyles into coordinated festive red, gold, and cream.`,
      },
      {
        question: `What if someone is blinking or blurry?`,
        answer: `Use a sharper alternate frame. Blurry or closed-eye faces are hard to keep accurate in a group edit.`,
      },
    ],
    addonLine: `Want a softer Lakshmi Puja doorway frame? Add: keep marigold torans, rangoli, diyas at the feet, and coordinated festive outfits, but ease diya glow slightly—no fireworks overlays or face swaps between relatives.`,
  },
  "side-by-side-keepsake-frame-merge-two-photos-prompt-gemini-couple": {
    intro: `Couple keepsake frame merge: both original photos sit side by side unchanged in a soft cream paper border with a thin gold divider—faces, outfits and backgrounds stay as uploaded. Upload two similar chest-up photos, left side first.`,
    tips: [
      `Upload two photos with similar crop and brightness so the cream frame feels balanced.`,
      `Left photo first, right photo second—order controls which side each image appears on.`,
      `Do not expect people to be merged into one scene; each photo’s content stays separate and unchanged.`,
      `Faces must be clear and unblurred; the style frames photos, it does not rebuild identity.`,
    ],
    faqs: [
      {
        question: `Are the two people placed into one shared background?`,
        answer: `No. Each photo stays as-is side by side in one framed layout; backgrounds are not combined into one scene.`,
      },
      {
        question: `Will outfits or poses change?`,
        answer: `No by default. Faces, outfits, poses, and original photo backgrounds stay exactly as uploaded.`,
      },
      {
        question: `Does upload order matter?`,
        answer: `Yes. The first photo goes left and the second goes right in the cream keepsake frame.`,
      },
      {
        question: `What if one photo is much darker?`,
        answer: `Try closer brightness between the two. A gentle matching grade may help, but content still stays unchanged.`,
      },
    ],
    addonLine: `Want a quieter keepsake frame? Add: keep both photos unchanged side by side with the cream border and thin gold divider, but soften the gold line slightly—no single-scene body merge or heavy ornate scrapbook stickers.`,
  },
  "sofa-cuddle-with-your-pet-merge-two-photos-prompt-gemini-person-and-pet": {
    intro: `Person-and-pet sofa merge: you and your dog share one cozy living-room sofa scene, the dog leaning on your shoulder, with your face, outfit, breed, coat and markings kept exact. Upload you first, pet second.`,
    tips: [
      `Use a sharp face photo and a clear pet photo with eyes and markings visible.`,
      `Upload person first and pet second so identities map correctly into the sofa cuddle.`,
      `Your outfit stays; pose rebuilds for the lean-on-shoulder sofa moment under soft daylight.`,
      `Ask for cream living-room sofa staging—not a park run or studio seamless.`,
    ],
    faqs: [
      {
        question: `Will my dog’s breed and markings stay correct?`,
        answer: `Yes. Breed, coat, markings, and eye colour from the pet photo stay locked.`,
      },
      {
        question: `Do I need a photo already taken together on a sofa?`,
        answer: `No. Separate photos work—you first, pet second—and they merge into one sofa scene.`,
      },
      {
        question: `Will my clothes change?`,
        answer: `No by default. Your outfit from the first photo stays while pose adapts to the sofa cuddle.`,
      },
      {
        question: `Can I use a cat instead of a dog?`,
        answer: `Use a clear photo of your own pet. Markings and species cues follow the second upload, not a generic stock animal.`,
      },
    ],
    addonLine: `Want a calmer sofa cuddle? Add: keep your face, outfit, the pet’s breed and markings, and the living-room sofa lean, but soften the lean intensity—no breed changes, outfit swaps, or outdoor park backgrounds.`,
  },
  "luxury-editorial-crew": {
    intro: `High-fashion magazine crew portrait: coordinated editorial styling in a luxury garden picnic with soft golden-hour light, every face and headcount kept true. Upload one clear group photo.`,
    tips: [
      `All faces should be sharp and countable—the edit keeps the exact same number of people.`,
      `Ask for luxury garden picnic golden-hour editorial styling—not a casual selfie mirror collage.`,
      `Natural skin texture and authentic expressions stay; wardrobe restyles into coordinated high-fashion looks.`,
      `Even group lighting in the source reduces one face going dark under golden hour.`,
    ],
    faqs: [
      {
        question: `Will everyone still look like themselves?`,
        answer: `Yes. Faces stay recognisable with natural skin texture and the same headcount; styling and scene upgrade.`,
      },
      {
        question: `Do we need a garden photo already?`,
        answer: `No. A clear group photo works; the luxury garden picnic golden-hour setting builds in the style.`,
      },
      {
        question: `Is this a claymation toy group look?`,
        answer: `No—this is a premium magazine-campaign editorial for your crew in a garden picnic setting.`,
      },
      {
        question: `Can clothing stay as in our photo?`,
        answer: `Only if clothing preservation is on. Otherwise expect coordinated high-fashion editorial wardrobe.`,
      },
    ],
    addonLine: `Want a quieter editorial crew frame? Add: keep the luxury garden picnic, golden-hour light, and coordinated high-fashion styling, but soften wardrobe drama slightly—no extra people added or face beautification.`,
  },
  "clay-crew": {
    intro: `Handcrafted 3D clay group portrait: your friends become tactile claymation figures with rounded forms in a miniature snowy village scene, identities and headcount still clear. Use one sharp group photo.`,
    tips: [
      `Clear faces and distinct hairstyles help each clay figure stay recognisable.`,
      `Ask for handcrafted clay texture and a miniature snowy village—not smooth plastic action figures.`,
      `Keep the exact same number of people; the medium changes, not the crew size.`,
      `Cozy playful lighting should show sculpted facial cues without melting features together.`,
    ],
    faqs: [
      {
        question: `Will we still be recognisable as clay figures?`,
        answer: `Yes. Distinct facial identity, hairstyle cues, expressions, and headcount stay; the medium becomes tactile clay.`,
      },
      {
        question: `Is this a luxury fashion magazine group shot?`,
        answer: `No—this is a cozy handcrafted 3D clay group portrait in a miniature snowy village.`,
      },
      {
        question: `Do solo photos work?`,
        answer: `This style is for a group. Use a clear friends photo with every face visible and countable.`,
      },
      {
        question: `Will outfits become clay too?`,
        answer: `Yes—the whole group restyles as detailed clay figures, including clothing cues in sculpted form.`,
      },
    ],
    addonLine: `Want a softer clay crew scene? Add: keep the handmade clay figures, rounded forms, and miniature snowy village, but ease snow density slightly—no realistic skin rendering or extra characters.`,
  },
  "hand-painted-watercolor-pet": {
    intro: `Soft watercolor pet portrait on textured paper: translucent washes, delicate green botanical foliage and pigment splashes while breed, markings and eye colour stay true. Upload one clear pet photo.`,
    tips: [
      `Eyes and distinctive markings should be readable so the watercolor still looks like your pet.`,
      `Ask for translucent washes on white watercolor paper with soft botanical foliage—not thick oil paint.`,
      `Preserve species, breed cues, fur colours, markings, ear shape, and eye colour through the brushwork.`,
      `Soft warm natural grades should not bleach white fur into pure paper white with no shading.`,
    ],
    faqs: [
      {
        question: `Will my pet still look like itself?`,
        answer: `Yes. Species, breed characteristics, face, fur colours, markings, and eye colour stay recognisable in watercolor.`,
      },
      {
        question: `Is this a plush-toy makeover?`,
        answer: `No—this is a hand-painted watercolor portrait on textured paper with soft botanical accents.`,
      },
      {
        question: `Do old slightly soft photos work?`,
        answer: `They can if eyes and markings are still clear. Very blurry faces lose likeness in paint translation.`,
      },
      {
        question: `Can I use a cat or a dog?`,
        answer: `Yes. Any pet photo works; the watercolor follows the species and markings in your upload.`,
      },
    ],
    addonLine: `Want a quieter watercolor pet portrait? Add: keep the translucent washes, paper texture, and delicate green foliage, but reduce pigment splashes—no photoreal fur rendering or busy full garden scenes.`,
  },
  "cozy-plushie-pet": {
    intro: `Handcrafted plush-toy pet makeover: soft fuzzy fabric, stitched seams and rounded toy proportions in a cozy bedroom with blankets and warm lamps, still matching your pet’s colours and markings. Use one clear pet photo.`,
    tips: [
      `A sharp head-and-shoulders pet photo helps embroidered eyes and fabric ears match the real face.`,
      `Ask for fuzzy plush fabric, visible stitched seams, and rounded toy proportions—not a realistic fur render.`,
      `Preserve species, breed cues, coat colours, and markings even as anatomy simplifies into plush form.`,
      `Warm cozy pastel bedroom light should not wash out darker coat patches.`,
    ],
    faqs: [
      {
        question: `Will coat colours and markings stay?`,
        answer: `Yes. Species, breed cues, coat colours, and markings stay so the plush still reads as your pet.`,
      },
      {
        question: `Is this a watercolor paper portrait?`,
        answer: `No—this reimagines your pet as a handcrafted plush toy with stitched details in a cozy bedroom.`,
      },
      {
        question: `Do the eyes become button-like?`,
        answer: `Eyes become embroidered or glossy toy-like while still echoing your pet’s eye colour and expression cues.`,
      },
      {
        question: `Can puppies and kittens use this look?`,
        answer: `Yes. Clear photos of young pets work; rounded plush proportions often suit them especially well.`,
      },
    ],
    addonLine: `Want a softer plushie pet scene? Add: keep the fuzzy fabric, stitched seams, and cozy bedroom setting, but simplify blanket clutter slightly—no hyper-real fur or outdoor park backgrounds.`,
  },
  "mini-collectible-figure": {
    intro: `Premium mini collectible figurine: your pet as a display-worthy sculpted figure on a premium wooden base in a clean softly lit collector setting, markings and face kept recognisable. Upload one clear pet photo.`,
    tips: [
      `Full head or clear body shots help miniature proportions and painted finish stay accurate.`,
      `Ask for a premium wooden display base and soft collector lighting—not a cluttered toy-store shelf.`,
      `Preserve species, breed or type, facial structure, colours, markings, and eye colour in the sculpt.`,
      `Warm premium display light should show painted detail without melting fine markings.`,
    ],
    faqs: [
      {
        question: `Will the figurine still look like my pet?`,
        answer: `Yes. Species, face, colours, markings, and eye colour stay recognisable in the miniature sculpted finish.`,
      },
      {
        question: `Is this a soft plush-toy look?`,
        answer: `No—this is a hard premium collectible figure with molded detail on a wooden display base.`,
      },
      {
        question: `Do I need a photo of an existing figurine?`,
        answer: `No. A clear real pet photo is enough; the collectible presentation is created in the style.`,
      },
      {
        question: `Can dogs and cats both work?`,
        answer: `Yes. Any pet with readable features can become a display-ready mini collectible figure.`,
      },
    ],
    addonLine: `Want a quieter collector display? Add: keep the mini figurine form, premium wooden base, and soft studio display light, but soften packaging presence—no giant robot redesign or missing breed markings.`,
  },
  "dreamy-memorial-portrait": {
    intro: `Gentle remembrance pet portrait: soft golden sunset garden with misty hills, delicate blossoms and a faint rainbow, while species, face, fur colours and markings stay faithful to your photo. Use one clear pet photo with eyes visible.`,
    tips: [
      `Choose a photo where eyes and distinctive markings are clear—likeness matters most for memorial pieces.`,
      `Ask for a peaceful flower garden, soft golden sunset, distant misty hills, and a faint rainbow—not party confetti.`,
      `Preserve species, breed cues, facial structure, fur colours, markings, and eye colour exactly.`,
      `Soft warm peaceful light should feel gentle; avoid heavy glow that washes out the face.`,
    ],
    faqs: [
      {
        question: `Will my pet’s face and markings stay accurate?`,
        answer: `Yes. Species, facial structure, fur or feather colours, distinctive markings, and eye colour stay faithful.`,
      },
      {
        question: `Can I use an older or slightly imperfect photo?`,
        answer: `Yes if eyes and markings remain readable. Very blurry memorial sources make likeness harder to hold.`,
      },
      {
        question: `Is this a playful plush-toy style?`,
        answer: `No—this is a soft emotional remembrance portrait in a peaceful sunset garden.`,
      },
      {
        question: `Does the rainbow have to appear?`,
        answer: `A faint rainbow is part of the default memorial atmosphere. Use a small add-on only if you want it softer, without rewriting the whole look.`,
      },
    ],
    addonLine: `Want a quieter memorial garden mood? Add: keep the peaceful flower garden, soft golden sunset, and faithful pet likeness, but soften the rainbow further—no text overlays, heavy lens flares, or altered markings.`,
  },
  "mint-sequin-stripe-saree-marble-hallway": {
    intro: `Party mint georgette with vertical silver sequin stripes in a bright marble hallway—not a teal curtain studio or blush lounge sequin look. Upload one clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo of an adult woman—blurry selfies smear mint sequin-stripe saree detail.`,
      `If the look drifts toward teal velvet curtain seated glam or blush floral lounge, restate this exact wardrobe and scene: mint georgette with vertical silver sequin stripes in a bright marble hallway.`,
      `Keep jewellery light and modest; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the saree edit can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face stay the same with this saree edit?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses stay from your photo while only the outfit and scene update.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the mint sequin-stripe saree.`,
      },
      {
        question: `Is this the same as a generic modern saree outfit change?`,
        answer: `No. This page is the specific mint georgette with vertical silver sequin stripes in a bright marble hallway—distinct from a generic modern drape utility edit.`,
      },
      {
        question: `Why does the fabric look flat or bridal-heavy?`,
        answer: `Ask for true-to-life fabric texture on the mint sequin-stripe saree and keep jewellery light—explicitly non-bridal unless you want wedding styling.`,
      },
    ],
    addonLine: `Want a quieter take on this look? Add: keep the mint sequin-stripe saree and marble hallway, lock exact skin tone and face, soften background bokeh slightly—no extra people, logos, or heavy bridal jewellery.`,
  },
  "blush-organza-potli-saree-garden-patio": {
    intro: `Soft blush organza with a pearl-handled potli on a sunlit garden patio—airy outdoor daylight, not an ivy terrace or mirror selfie. One clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo of an adult woman—blurry selfies smear blush organza saree detail.`,
      `If the look drifts toward sage ivy terrace or lavender mirror selfie, restate this exact wardrobe and scene: sheer blush organza with a pearl-handled potli on a sunlit garden patio.`,
      `Keep jewellery light and modest; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the saree edit can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face stay the same with this saree edit?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses stay from your photo while only the outfit and scene update.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the blush organza saree.`,
      },
      {
        question: `Is this the same as a generic modern saree outfit change?`,
        answer: `No. This page is the specific sheer blush organza with a pearl-handled potli on a sunlit garden patio—distinct from a generic modern drape utility edit.`,
      },
      {
        question: `Why does the fabric look flat or bridal-heavy?`,
        answer: `Ask for true-to-life fabric texture on the blush organza saree and keep jewellery light—explicitly non-bridal unless you want wedding styling.`,
      },
    ],
    addonLine: `Want a quieter take on this look? Add: keep the blush organza saree and garden patio, lock exact skin tone and face, soften background bokeh slightly—no extra people, logos, or heavy bridal jewellery.`,
  },
  "ivory-lace-reception-saree-boutique-mirror": {
    intro: `Ivory lace reception saree beside a boutique floor mirror under warm showroom light—not a palace-hall pallu flare or lounge sequin look. Upload one clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo of an adult woman—blurry selfies smear ivory lace reception saree detail.`,
      `If the look drifts toward champagne palace flare or blush lounge sequins, restate this exact wardrobe and scene: ivory lace reception saree beside a boutique floor mirror.`,
      `Keep jewellery light and modest; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the saree edit can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face stay the same with this saree edit?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses stay from your photo while only the outfit and scene update.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the ivory lace reception saree.`,
      },
      {
        question: `Is this the same as a generic modern saree outfit change?`,
        answer: `No. This page is the specific ivory lace reception saree beside a boutique floor mirror—distinct from a generic modern drape utility edit.`,
      },
      {
        question: `Why does the fabric look flat or bridal-heavy?`,
        answer: `Ask for true-to-life fabric texture on the ivory lace reception saree and keep jewellery light—explicitly non-bridal unless you want wedding styling.`,
      },
    ],
    addonLine: `Want a quieter take on this look? Add: keep the ivory lace reception saree and boutique floor mirror, lock exact skin tone and face, soften background bokeh slightly—no extra people, logos, or heavy bridal jewellery.`,
  },
  "leopard-print-belted-saree-old-city-street": {
    intro: `Retro editorial leopard-print chiffon with a slim black belt on an old city street—vintage Bollywood street energy, not noir shadow or black-and-gold steps. One clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo of an adult woman—blurry selfies smear leopard-print chiffon saree detail.`,
      `If the look drifts toward shadowed saree noir or black-and-gold flower steps, restate this exact wardrobe and scene: tan leopard-print chiffon saree with a slim black belt on an old city street.`,
      `Keep jewellery light and modest; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the saree edit can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face stay the same with this saree edit?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses stay from your photo while only the outfit and scene update.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the leopard-print chiffon saree.`,
      },
      {
        question: `Is this the same as a generic modern saree outfit change?`,
        answer: `No. This page is the specific tan leopard-print chiffon saree with a slim black belt on an old city street—distinct from a generic modern drape utility edit.`,
      },
      {
        question: `Why does the fabric look flat or bridal-heavy?`,
        answer: `Ask for true-to-life fabric texture on the leopard-print chiffon saree and keep jewellery light—explicitly non-bridal unless you want wedding styling.`,
      },
    ],
    addonLine: `Want a quieter take on this look? Add: keep the leopard-print chiffon saree and old city street, lock exact skin tone and face, soften background bokeh slightly—no extra people, logos, or heavy bridal jewellery.`,
  },
  "teal-sequin-glam-saree-velvet-curtain": {
    intro: `Deep teal sequin glam saree seated against champagne velvet curtains—studio drama, not a mint marble hallway walk or blush lounge stand. Upload one clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo of an adult woman—blurry selfies smear teal sequin glam saree detail.`,
      `If the look drifts toward mint marble hallway stripes or blush floral lounge, restate this exact wardrobe and scene: deep teal sequin saree seated against champagne velvet curtains.`,
      `Keep jewellery light and modest; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the saree edit can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face stay the same with this saree edit?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses stay from your photo while only the outfit and scene update.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the teal sequin glam saree.`,
      },
      {
        question: `Is this the same as a generic modern saree outfit change?`,
        answer: `No. This page is the specific deep teal sequin saree seated against champagne velvet curtains—distinct from a generic modern drape utility edit.`,
      },
      {
        question: `Why does the fabric look flat or bridal-heavy?`,
        answer: `Ask for true-to-life fabric texture on the teal sequin glam saree and keep jewellery light—explicitly non-bridal unless you want wedding styling.`,
      },
    ],
    addonLine: `Want a quieter take on this look? Add: keep the teal sequin glam saree and velvet curtains, lock exact skin tone and face, soften background bokeh slightly—no extra people, logos, or heavy bridal jewellery.`,
  },
  "sage-organza-saree-ivy-terrace": {
    intro: `Pale sage organza with silver sequin stripes on a bright ivy terrace—fresh outdoor daylight, not a blush garden potli or mint marble hallway. One clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo of an adult woman—blurry selfies smear sage organza saree detail.`,
      `If the look drifts toward blush organza garden potli or mint marble hallway, restate this exact wardrobe and scene: pale sage organza with silver sequin stripes on a bright ivy terrace.`,
      `Keep jewellery light and modest; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the saree edit can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face stay the same with this saree edit?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses stay from your photo while only the outfit and scene update.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the sage organza saree.`,
      },
      {
        question: `Is this the same as a generic modern saree outfit change?`,
        answer: `No. This page is the specific pale sage organza with silver sequin stripes on a bright ivy terrace—distinct from a generic modern drape utility edit.`,
      },
      {
        question: `Why does the fabric look flat or bridal-heavy?`,
        answer: `Ask for true-to-life fabric texture on the sage organza saree and keep jewellery light—explicitly non-bridal unless you want wedding styling.`,
      },
    ],
    addonLine: `Want a quieter take on this look? Add: keep the sage organza saree and ivy stone terrace, lock exact skin tone and face, soften background bokeh slightly—no extra people, logos, or heavy bridal jewellery.`,
  },
  "red-ruffle-gown-saree-red-carpet": {
    intro: `Deep ruby satin gown-saree with a cascading organza ruffle pallu on a red carpet—party glam, not a bridal lehenga or black-and-gold steps look. Upload one clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo of an adult woman—blurry selfies smear red ruffle gown saree detail.`,
      `If the look drifts toward bridal lehenga or black-and-gold flower steps, restate this exact wardrobe and scene: deep ruby satin gown-style saree with organza ruffle pallu on a red carpet.`,
      `Keep jewellery light and modest; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the saree edit can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face stay the same with this saree edit?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses stay from your photo while only the outfit and scene update.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the red ruffle gown saree.`,
      },
      {
        question: `Is this the same as a generic modern saree outfit change?`,
        answer: `No. This page is the specific deep ruby satin gown-style saree with organza ruffle pallu on a red carpet—distinct from a generic modern drape utility edit.`,
      },
      {
        question: `Why does the fabric look flat or bridal-heavy?`,
        answer: `Ask for true-to-life fabric texture on the red ruffle gown saree and keep jewellery light—explicitly non-bridal unless you want wedding styling.`,
      },
    ],
    addonLine: `Want a quieter take on this look? Add: keep the red ruffle gown saree and red carpet aisle, lock exact skin tone and face, soften background bokeh slightly—no extra people, logos, or heavy bridal jewellery.`,
  },
  "rose-gold-tissue-silk-saree-marble-studio": {
    intro: `Iridescent rose-gold tissue silk in a minimal marble studio with soft side light—quiet metallic shimmer, not a champagne palace flare or Kanjivaram colonnade. One clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo of an adult woman—blurry selfies smear rose-gold tissue silk saree detail.`,
      `If the look drifts toward champagne palace pallu flare or Kanjivaram colonnade, restate this exact wardrobe and scene: iridescent rose-gold tissue silk saree in a minimal marble studio.`,
      `Keep jewellery light and modest; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the saree edit can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face stay the same with this saree edit?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses stay from your photo while only the outfit and scene update.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the rose-gold tissue silk saree.`,
      },
      {
        question: `Is this the same as a generic modern saree outfit change?`,
        answer: `No. This page is the specific iridescent rose-gold tissue silk saree in a minimal marble studio—distinct from a generic modern drape utility edit.`,
      },
      {
        question: `Why does the fabric look flat or bridal-heavy?`,
        answer: `Ask for true-to-life fabric texture on the rose-gold tissue silk saree and keep jewellery light—explicitly non-bridal unless you want wedding styling.`,
      },
    ],
    addonLine: `Want a quieter take on this look? Add: keep the rose-gold tissue silk saree and marble studio, lock exact skin tone and face, soften background bokeh slightly—no extra people, logos, or heavy bridal jewellery.`,
  },
  "champagne-pallu-flare-saree-palace-hall": {
    intro: `Champagne net lace with a wide flared embroidered pallu in a palace-style hall—dramatic reception energy, not an ivory boutique mirror or red-carpet ruffle. Upload one clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo of an adult woman—blurry selfies smear champagne net lace saree detail.`,
      `If the look drifts toward ivory boutique mirror or red ruffle carpet, restate this exact wardrobe and scene: champagne net lace saree with flared pallu in a palace-style hall.`,
      `Keep jewellery light and modest; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the saree edit can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face stay the same with this saree edit?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses stay from your photo while only the outfit and scene update.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the champagne net lace saree.`,
      },
      {
        question: `Is this the same as a generic modern saree outfit change?`,
        answer: `No. This page is the specific champagne net lace saree with flared pallu in a palace-style hall—distinct from a generic modern drape utility edit.`,
      },
      {
        question: `Why does the fabric look flat or bridal-heavy?`,
        answer: `Ask for true-to-life fabric texture on the champagne net lace saree and keep jewellery light—explicitly non-bridal unless you want wedding styling.`,
      },
    ],
    addonLine: `Want a quieter take on this look? Add: keep the champagne net lace saree and palace-style hall, lock exact skin tone and face, soften background bokeh slightly—no extra people, logos, or heavy bridal jewellery.`,
  },
  "black-gold-border-saree-flower-steps": {
    intro: `Black sheer georgette with a dense gold sequin border, seated on beige steps beside white chrysanthemums—festive black saree energy, not Banarasi sofa or noir shadow. One clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo of an adult woman—blurry selfies smear black and gold border saree detail.`,
      `If the look drifts toward black Banarasi vintage sofa or shadowed saree noir, restate this exact wardrobe and scene: black georgette with a wide gold sequin border seated on flower steps.`,
      `Keep jewellery light and modest; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the saree edit can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face stay the same with this saree edit?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses stay from your photo while only the outfit and scene update.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the black and gold border saree.`,
      },
      {
        question: `Is this the same as a generic modern saree outfit change?`,
        answer: `No. This page is the specific black georgette with a wide gold sequin border seated on flower steps—distinct from a generic modern drape utility edit.`,
      },
      {
        question: `Why does the fabric look flat or bridal-heavy?`,
        answer: `Ask for true-to-life fabric texture on the black and gold border saree and keep jewellery light—explicitly non-bridal unless you want wedding styling.`,
      },
    ],
    addonLine: `Want a quieter take on this look? Add: keep the black and gold border saree and flower steps, lock exact skin tone and face, soften background bokeh slightly—no extra people, logos, or heavy bridal jewellery.`,
  },
  "ombre-saree-over-shoulder-dressing-room": {
    intro: `Ombre ivory-to-rose georgette in a soft over-shoulder dressing-room view with a modest blouse back—intimate styling corner, not a mirror selfie or outdoor patio. Upload one clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo of an adult woman—blurry selfies smear ombre georgette saree detail.`,
      `If the look drifts toward lavender mirror selfie or blush garden patio, restate this exact wardrobe and scene: ombre georgette over-shoulder dressing-room portrait with a modest blouse back.`,
      `Keep jewellery light and modest; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the saree edit can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face stay the same with this saree edit?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses stay from your photo while only the outfit and scene update.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the ombre georgette saree.`,
      },
      {
        question: `Is this the same as a generic modern saree outfit change?`,
        answer: `No. This page is the specific ombre georgette over-shoulder dressing-room portrait with a modest blouse back—distinct from a generic modern drape utility edit.`,
      },
      {
        question: `Why does the fabric look flat or bridal-heavy?`,
        answer: `Ask for true-to-life fabric texture on the ombre georgette saree and keep jewellery light—explicitly non-bridal unless you want wedding styling.`,
      },
    ],
    addonLine: `Want a quieter take on this look? Add: keep the ombre georgette saree and dressing room, lock exact skin tone and face, soften background bokeh slightly—no extra people, logos, or heavy bridal jewellery.`,
  },
  "black-banarasi-pallu-saree-vintage-living-room": {
    intro: `Black Banarasi silk with an ornate gold woven pallu on a vintage living-room sofa—classic weave portrait, not sequin flower steps or Kanjivaram colonnade. One clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo of an adult woman—blurry selfies smear black banarasi silk saree detail.`,
      `If the look drifts toward black-and-gold sequin steps or Kanjivaram colonnade, restate this exact wardrobe and scene: black banarasi silk with ornate gold pallu on a vintage living-room sofa.`,
      `Keep jewellery light and modest; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the saree edit can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face stay the same with this saree edit?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses stay from your photo while only the outfit and scene update.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the black banarasi silk saree.`,
      },
      {
        question: `Is this the same as a generic modern saree outfit change?`,
        answer: `No. This page is the specific black banarasi silk with ornate gold pallu on a vintage living-room sofa—distinct from a generic modern drape utility edit.`,
      },
      {
        question: `Why does the fabric look flat or bridal-heavy?`,
        answer: `Ask for true-to-life fabric texture on the black banarasi silk saree and keep jewellery light—explicitly non-bridal unless you want wedding styling.`,
      },
    ],
    addonLine: `Want a quieter take on this look? Add: keep the black banarasi silk saree and vintage living room, lock exact skin tone and face, soften background bokeh slightly—no extra people, logos, or heavy bridal jewellery.`,
  },
  "lavender-zari-saree-mirror-selfie": {
    intro: `Lavender zari organza as a full-length oval-mirror selfie with a plain unbranded phone—casual room reflection, not an ombre over-shoulder dressing room or outdoor patio. Upload one clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo of an adult woman—blurry selfies smear lavender zari saree detail.`,
      `If the look drifts toward ombre dressing-room over-shoulder or blush garden patio, restate this exact wardrobe and scene: lavender zari saree captured as a full-length mirror selfie with a plain phone.`,
      `Keep jewellery light and modest; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the saree edit can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face stay the same with this saree edit?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses stay from your photo while only the outfit and scene update.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the lavender zari saree.`,
      },
      {
        question: `Is this the same as a generic modern saree outfit change?`,
        answer: `No. This page is the specific lavender zari saree captured as a full-length mirror selfie with a plain phone—distinct from a generic modern drape utility edit.`,
      },
      {
        question: `Why does the fabric look flat or bridal-heavy?`,
        answer: `Ask for true-to-life fabric texture on the lavender zari saree and keep jewellery light—explicitly non-bridal unless you want wedding styling.`,
      },
    ],
    addonLine: `Want a quieter take on this look? Add: keep the lavender zari saree and oval floor mirror, lock exact skin tone and face, soften background bokeh slightly—no extra people, logos, or heavy bridal jewellery.`,
  },
  "blush-floral-sequin-saree-luxury-lounge": {
    intro: `Soft blush organza with gold-champagne floral sequins in a luxury lounge—tufted sofa and chandelier bokeh, not teal curtain seating or mint marble hallway. One clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo of an adult woman—blurry selfies smear blush floral sequin saree detail.`,
      `If the look drifts toward teal velvet curtain glam or mint marble hallway, restate this exact wardrobe and scene: blush floral sequin saree in a luxury lounge with tufted sofa and chandelier bokeh.`,
      `Keep jewellery light and modest; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the saree edit can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face stay the same with this saree edit?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses stay from your photo while only the outfit and scene update.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the blush floral sequin saree.`,
      },
      {
        question: `Is this the same as a generic modern saree outfit change?`,
        answer: `No. This page is the specific blush floral sequin saree in a luxury lounge with tufted sofa and chandelier bokeh—distinct from a generic modern drape utility edit.`,
      },
      {
        question: `Why does the fabric look flat or bridal-heavy?`,
        answer: `Ask for true-to-life fabric texture on the blush floral sequin saree and keep jewellery light—explicitly non-bridal unless you want wedding styling.`,
      },
    ],
    addonLine: `Want a quieter take on this look? Add: keep the blush floral sequin saree and luxury lounge, lock exact skin tone and face, soften background bokeh slightly—no extra people, logos, or heavy bridal jewellery.`,
  },
  "golden-hour-chiffon-saree-rooftop-pallu-wind": {
    intro: `Light peach chiffon on a private rooftop at golden hour with the pallu mid-motion in the breeze—soft vintage warmth, not a rainy monsoon balcony or leopard street edit. Upload one clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo of an adult woman—blurry selfies smear golden-hour chiffon saree detail.`,
      `If the look drifts toward monsoon rainy balcony or leopard old-city street, restate this exact wardrobe and scene: peach chiffon saree on a rooftop at golden hour with the pallu lifting in the wind.`,
      `Keep jewellery light and modest; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the saree edit can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face stay the same with this saree edit?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses stay from your photo while only the outfit and scene update.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the golden-hour chiffon saree.`,
      },
      {
        question: `Is this the same as a generic modern saree outfit change?`,
        answer: `No. This page is the specific peach chiffon saree on a rooftop at golden hour with the pallu lifting in the wind—distinct from a generic modern drape utility edit.`,
      },
      {
        question: `Why does the fabric look flat or bridal-heavy?`,
        answer: `Ask for true-to-life fabric texture on the golden-hour chiffon saree and keep jewellery light—explicitly non-bridal unless you want wedding styling.`,
      },
    ],
    addonLine: `Want a quieter take on this look? Add: keep the golden-hour chiffon saree and rooftop terrace, lock exact skin tone and face, soften background bokeh slightly—no extra people, logos, or heavy bridal jewellery.`,
  },
  "kanjivaram-silk-saree-carved-stone-colonnade": {
    intro: `Rich Kanjivaram silk with broad contrast gold zari borders in a generic carved stone colonnade—weave showcase only, no temples or deities, and not a Banarasi sofa or rose-gold marble studio. One clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo of an adult woman—blurry selfies smear kanjivaram silk saree detail.`,
      `If the look drifts toward black Banarasi vintage sofa or rose-gold marble studio, restate this exact wardrobe and scene: rich kanjivaram silk with contrast gold zari borders in a carved stone colonnade.`,
      `Keep jewellery light and modest; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the saree edit can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face stay the same with this saree edit?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses stay from your photo while only the outfit and scene update.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the kanjivaram silk saree.`,
      },
      {
        question: `Is this the same as a generic modern saree outfit change?`,
        answer: `No. This page is the specific rich kanjivaram silk with contrast gold zari borders in a carved stone colonnade—distinct from a generic modern drape utility edit.`,
      },
      {
        question: `Why does the fabric look flat or bridal-heavy?`,
        answer: `Ask for true-to-life fabric texture on the kanjivaram silk saree and keep jewellery light—explicitly non-bridal unless you want wedding styling.`,
      },
    ],
    addonLine: `Want a quieter take on this look? Add: keep the kanjivaram silk saree and stone colonnade, lock exact skin tone and face, soften background bokeh slightly—no extra people, logos, or heavy bridal jewellery.`,
  },
  "monsoon-chiffon-saree-rainy-balcony": {
    intro: `Powder-blue chiffon on a covered rainy balcony at cool blue hour with wet railing reflections—soft classic romance, not golden-hour rooftop wind or a dry mirror selfie. Upload one clear waist-up photo of an adult woman.`,
    tips: [
      `Use a sharp waist-up or three-quarter photo of an adult woman—blurry selfies smear monsoon chiffon saree detail.`,
      `If the look drifts toward golden-hour rooftop pallu wind or lavender mirror selfie, restate this exact wardrobe and scene: powder-blue chiffon saree on a covered rainy balcony at blue hour.`,
      `Keep jewellery light and modest; ask to remove heavy bridal sets if they appear uninvited.`,
      `Leave clothing preservation off so the saree edit can apply; turn it on only to keep what you wore.`,
    ],
    faqs: [
      {
        question: `Will my face stay the same with this saree edit?`,
        answer: `Yes. Face, skin tone, hair or head covering, and glasses stay from your photo while only the outfit and scene update.`,
      },
      {
        question: `Do I need to already wear a saree?`,
        answer: `No. Everyday wear is fine; the prompt swaps you into the monsoon chiffon saree.`,
      },
      {
        question: `Is this the same as a generic modern saree outfit change?`,
        answer: `No. This page is the specific powder-blue chiffon saree on a covered rainy balcony at blue hour—distinct from a generic modern drape utility edit.`,
      },
      {
        question: `Why does the fabric look flat or bridal-heavy?`,
        answer: `Ask for true-to-life fabric texture on the monsoon chiffon saree and keep jewellery light—explicitly non-bridal unless you want wedding styling.`,
      },
    ],
    addonLine: `Want a quieter take on this look? Add: keep the monsoon chiffon saree and rainy balcony, lock exact skin tone and face, soften background bokeh slightly—no extra people, logos, or heavy bridal jewellery.`,
  },
};
