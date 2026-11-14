import type { StyleBestForEntry } from "./style-best-for";

/**
 * Per-style Best for / Works with lines for every published style page.
 * Each `occasions` string is unique across the catalog (AdSense uniqueness).
 * Authored offline from each style’s title, note, and theme — stored as data,
 * not computed with fragile runtime regex. Re-run
 * `npx tsx scripts/author-unique-best-for.mts` and review when styles change.
 */
export const STYLE_BEST_FOR_DATA: Readonly<Record<string, StyleBestForEntry>> = {
  "16-bit-pixel-rpg-party-ai-photo-prompt": {
    occasions: "3D bit pixel rpg hero avatar profile looks",
    worksWith: "one clear group photo with every face visible",
  },
  "1985-studio-couple": {
    occasions: "80s retro mottled backdrop couple studio throwback posts",
    worksWith: "one photo of two people, both faces clear and at a similar",
  },
  "1985-studio-portrait": {
    occasions: "80s retro 1985 studio retro throwback posts",
    worksWith: "one clear head-and-shoulders portrait with the face large and sharp",
  },
  "1986-school-yearbook": {
    occasions: "A polished laser backdrop for LinkedIn or CV",
    worksWith: "one clear head-and-shoulders photo",
  },
  "80s-bedroom-cassette": {
    occasions: "80s retro cassette flash throwback posts",
    worksWith: "one clear photo with the face visible, ideally sitting or a relaxed",
  },
  "80s-dark-fantasy-film-still-ai-photo-prompt": {
    occasions: "80s retro dark fantasy film still throwback posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "80s-film-poster-couple": {
    occasions: "80s retro bollywood poster couple throwback posts",
    worksWith: "one couple photo with both faces clear",
  },
  "80s-film-poster-lead": {
    occasions: "80s retro solo lead throwback posts",
    worksWith: "one clear portrait, face large enough to stay recognizable on a poster",
  },
  "80s-retro-christmas-portrait": {
    occasions: "80s retro Christmas holiday cards",
    worksWith: "one clear chest-up photo of an adult",
  },
  "80s-wedding-album": {
    occasions: "Formal flash yellowed print wedding album shots",
    worksWith: "one couple photo with both faces clear",
  },
  "90s-retro-anime-portrait-ai-photo-prompt": {
    occasions: "Anime-style 90s retro social posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "90s-yearbook-crew": {
    occasions: "Coordinated 1990s school yearbook vintage nostalgia posts",
    worksWith: "clear group photo with all faces visible and evenly lit",
  },
  "action-heroine-neon-street-fight-ai-photo-prompt": {
    occasions: "Woman fighting tokyo cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "add-missing-person-to-group-photo-merge-two-photos-prompt-gemini-family": {
    occasions: "Add missing person group family reunion posts",
    worksWith: "the group photo first, then a clear photo of the person to",
  },
  "aesthetic-ai-photo-editing-prompt-for-boy-and-girl-beach": {
    occasions: "Sunset beach walk golden haze cinematic portfolio frames",
    worksWith: "two clear photos (boy, then girl) or one photo of you both",
  },
  "aesthetic-soft-light-ai-photo-prompt-for-boys": {
    occasions: "Trending aesthetic soft light boy feed posts",
    worksWith: "one clear chest-up or waist-up photo of a boy or young man",
  },
  "after-hours-polaroid": {
    occasions: "Candid instant film evening friends vintage nostalgia posts",
    worksWith: "clear group photo with all faces visible and evenly lit",
  },
  "ai-action-figure-prompt-premium-collectible": {
    occasions: "3D premium collectible action figure avatar profile looks",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "ai-birthday-photo-collage-prompt-friends-or-partner": {
    occasions: "Friends partner birthday party photos",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "ai-christmas-pet-photo-prompt-gift-box-surprise": {
    occasions: "Gift box surprise Christmas holiday cards",
    worksWith: "one clear photo of your dog or cat with its face visible",
  },
  "ai-christmas-photo-prompt-for-boys-with-candy-cane": {
    occasions: "Candy cane Christmas holiday cards",
    worksWith: "one clear waist-up photo of a boy or young man",
  },
  "ai-christmas-photo-prompt-for-couples-gift-exchange": {
    occasions: "Gift exchange Christmas holiday cards",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "ai-photo-prompt-for-boy-and-girl-standing-together-rooftop": {
    occasions: "Standing together under string lights cinematic portfolio frames",
    worksWith: "two clear photos (boy, then girl) or one photo of you both",
  },
  "ai-photo-prompt-for-boy-and-girl-together-monsoon-umbrella": {
    occasions: "Monsoon umbrella cinematic portfolio frames",
    worksWith: "two clear photos (boy, then girl) or one photo of you both",
  },
  "amber-shadow-triptych": {
    occasions: "Amber light triptych fashion professional profile photos",
    worksWith: "one clear portrait with a visible face",
  },
  "analog-street-fashion": {
    occasions: "Candid film street fashion walk vintage nostalgia posts",
    worksWith: "clear portrait with space for a walking full/half-body crop",
  },
  "anime-boy-ai-photo-prompt-gemini-power-aura": {
    occasions: "Anime-style power aura social posts",
    worksWith: "one clear chest-up or waist-up photo of a boy or man",
  },
  "anime-character-ai-photo-prompt-in-saree-or-lehenga": {
    occasions: "Anime character saree lehenga wedding album shots",
    worksWith: "one clear waist-up photo of a girl or woman, ideally in traditional",
  },
  "anime-clone-flashlight-glow-ai-photo-prompt": {
    occasions: "Anime-style clone flashlight glow social posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "anime-companion": {
    occasions: "Anime-style polished companion pet social posts",
    worksWith: "clear pet photo with eyes visible and distinctive markings readable",
  },
  "anime-couple-cherry-blossoms-ai-photo-prompt": {
    occasions: "Anime-style couple under cherry blossoms social posts",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "anime-cricket-hero-boy-ai-photo-prompt": {
    occasions: "Anime-style cricket hero boy social posts",
    worksWith: "one clear chest-up or waist-up photo of a boy or man",
  },
  "anime-girl-ai-photo-prompt-gemini-meadow": {
    occasions: "Anime-style soft hand painted film girl social posts",
    worksWith: "one clear chest-up or waist-up photo of a girl or woman",
  },
  "anime-ninja-hero-ai-photo-prompt": {
    occasions: "Anime-style rooftop leap ninja social posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "anime-samurai-autumn-leaves-ai-photo-prompt": {
    occasions: "Anime-style samurai autumn leaves social posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "anime-squad": {
    occasions: "Anime-style friends squad social posts",
    worksWith: "clear group photo with all faces visible and evenly lit",
  },
  "anime-swordsman-ai-photo-prompt": {
    occasions: "Anime-style moonlit swordsman social posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "armored-tech-superhero-ai-photo-prompt": {
    occasions: "Armored tech superhero cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "astronomer-observatory-ai-photo-prompt": {
    occasions: "Astronomer observatory dome twilight cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "attitude-ai-photo-prompt-for-boys-black-outfit": {
    occasions: "Trending black outfit boy feed posts",
    worksWith: "one clear chest-up or waist-up photo of a boy or young man",
  },
  "baby-boy-birthday-photo-ai-prompt-number-balloon": {
    occasions: "Number balloon birthday party photos",
    worksWith: "one clear photo of a baby or toddler boy, face visible",
  },
  "babys-first-diwali": {
    occasions: "Baby boy girl Diwali festive posts",
    worksWith: "clear baby photo with face and body visible",
  },
  "bathroom-spa-upgrade": {
    occasions: "Spa bathroom design travel vacation posts",
    worksWith: "clear place photo with architecture or outdoor layout visible",
  },
  "bike-ai-photo-prompt-for-boys-mountain-highway": {
    occasions: "Trending mountain highway boy feed posts",
    worksWith: "one clear chest-up or waist-up photo of a boy or young man",
  },
  "birthday-ai-photo-prompt-boy-black-gold": {
    occasions: "Black gold birthday party photos",
    worksWith: "one clear waist-up photo of a boy or young man",
  },
  "birthday-ai-photo-prompt-girl-pastel-cake": {
    occasions: "Pastel cake birthday party photos",
    worksWith: "one clear waist-up or full-length photo of a girl or woman",
  },
  "birthday-ai-photo-prompt-men-rooftop-night": {
    occasions: "Rooftop night birthday party photos",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "birthday-photo-ai-prompt-instagram-mirror-selfie": {
    occasions: "Mirror selfie birthday party photos",
    worksWith: "one clear photo of a girl or woman, face fully visible",
  },
  "birthday-photo-frame-design-ai-prompt-floral-card": {
    occasions: "Floral card birthday party photos",
    worksWith: "one clear chest-up photo of a girl or woman",
  },
  "birthday-photo-shoot-ai-prompt-friends-party": {
    occasions: "Friends party birthday party photos",
    worksWith: "one group photo of 2–6 friends with every face visible",
  },
  "birthday-wishes-ai-photo-prompt-3d-text-poster": {
    occasions: "Text poster birthday party photos",
    worksWith: "one clear waist-up photo of a boy or man",
  },
  "black-blazer-linkedin-profile-picture-prompt-gemini-women": {
    occasions: "A polished black blazer cream high neck for LinkedIn or CV",
    worksWith: "one recent, front-facing head-and-shoulders photo",
  },
  "black-shalwar-kameez-outfit-change-men": {
    occasions: "Black shalwar kameez change outfit-change try-on",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "black-sherwani": {
    occasions: "Velvet reception cinematic portfolio frames",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "black-suit-city-night-ai-photo-prompt-for-men": {
    occasions: "A polished black suit city night for LinkedIn or CV",
    worksWith: "one clear full-length or waist-up photo of an adult man",
  },
  "black-suit-lobby-luxury-ai-photo-prompt-for-men": {
    occasions: "A polished tailored black suit lit hotel for LinkedIn or CV",
    worksWith: "one clear full-length or waist-up photo of an adult man",
  },
  "black-suit-outfit-change-men": {
    occasions: "Black suit change outfit-change try-on",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "blazer-power-suit-outfit-change-women": {
    occasions: "Blazer power suit change outfit-change try-on",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "blue-note-scrapbook": {
    occasions: "Pastel aesthetic vintage nostalgia posts",
    worksWith: "one clear portrait with a visible face",
  },
  "botanical-wellness-still-life": {
    occasions: "Botanical still life professional product shots for your shop",
    worksWith: "one clear product photo with clean edges and visible packaging",
  },
  "bridal-sharara": {
    occasions: "Maroon gota work wedding album shots",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "businessman-lifestyle-lounge-ai-photo-prompt": {
    occasions: "A polished open collar blazer businessman glass for LinkedIn or CV",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "cafe-window-merge-two-photos-prompt-gemini-couple": {
    occasions: "Cafe window couple merge anniversary posts",
    worksWith: "two separate photos uploaded together: person A first, person B second",
  },
  "candid-phuljhadi-moment": {
    occasions: "Candid street laugh Diwali festive posts",
    worksWith: "clear candid or portrait photo",
  },
  "caped-night-vigilante-ai-photo-prompt": {
    occasions: "Caped night vigilante cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "cartoon-animation-pet": {
    occasions: "Anime-style animated film social posts",
    worksWith: "clear pet photo with eyes visible and distinctive markings readable",
  },
  "cartoon-battle-royale-avatar-ai-photo-prompt": {
    occasions: "3D cartoon battle royale avatar profile looks",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "cassette-player-street-snapshot": {
    occasions: "80s retro cassette player street snapshot throwback posts",
    worksWith: "one clear photo of a person standing or walking, face visible",
  },
  "chai-dhaba-fog-leather-jacket-winter-ai-photo-prompt-men": {
    occasions: "Chai dhaba fog leather jacket winter snow-day posts",
    worksWith: "one clear chest-up photo of a boy or man",
  },
  "charcoal-suit-corporate-linkedin-profile-picture-prompt-gemini-men": {
    occasions: "A polished charcoal suit for LinkedIn or CV",
    worksWith: "one clear head-and-shoulders photo with the face large and sharp",
  },
  "cherry-blossom-anime-couple-prompt-gemini": {
    occasions: "Anime-style cherry blossom couple social posts",
    worksWith: "two separate photos uploaded together: person A first, person B second",
  },
  "chibi-3d-couple-ai-photo-prompt": {
    occasions: "Anime-style chibi character social posts",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "chibi-daydream-collage": {
    occasions: "Anime-style chibi daydream scrapbook collage social posts",
    worksWith: "one clear portrait with a visible face",
  },
  "christmas-ai-photo-prompt-for-girls-ornament-tree": {
    occasions: "Ornament tree Christmas holiday cards",
    worksWith: "one clear waist-up photo of a girl or woman",
  },
  "christmas-ai-photo-prompts-for-men-fireside-gifts": {
    occasions: "Fireside gifts Christmas holiday cards",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "christmas-baby-photoshoot-ai-prompt-gift-boxes": {
    occasions: "Gift boxes Christmas holiday cards",
    worksWith: "one clear photo of a baby or toddler, face visible",
  },
  "christmas-couple-photo-ai-prompt-decorating-the-tree": {
    occasions: "Decorating tree Christmas holiday cards",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "christmas-couple-photoshoot-ai-prompt-candy-cane-lane": {
    occasions: "Candy cane lane Christmas holiday cards",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "christmas-family-photoshoot-ai-prompt-tree-and-gifts": {
    occasions: "Tree gifts Christmas holiday cards",
    worksWith: "one family photo of 2–6 people with every face visible",
  },
  "christmas-snowfall-winter-coat-portrait": {
    occasions: "Snowfall winter coat Christmas holiday cards",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "christmas-tree-lights-bokeh-selfie": {
    occasions: "Tree lights bokeh selfie Christmas holiday cards",
    worksWith: "one clear close-up photo of an adult woman",
  },
  "cinematic-ensemble": {
    occasions: "Dramatic movie cast ensemble cinematic portfolio frames",
    worksWith: "clear group photo with all faces visible and evenly lit",
  },
  "cinematic-foggy-street-portrait-winter-ai-photo-prompt-women": {
    occasions: "Cinematic foggy street winter snow-day posts",
    worksWith: "one clear waist-up photo of a girl or woman",
  },
  "clay-crew": {
    occasions: "3D handcrafted clay group avatar profile looks",
    worksWith: "clear group photo with all faces visible and evenly lit",
  },
  "clay-stop-motion-group-ai-photo-prompt": {
    occasions: "3D clay stop motion character avatar profile looks",
    worksWith: "one clear group photo with every face visible",
  },
  "color-pop-pedestal": {
    occasions: "Color pop pedestal photography product shots for your shop",
    worksWith: "one clear product photo with clean edges and visible packaging",
  },
  "combine-two-photos-80s-couple": {
    occasions: "80s couple merge throwback portraits",
    worksWith: "two clear portraits, one of each person, attached in the same message",
  },
  "cool-editorial-low-angle-ai-photo-prompt-for-men": {
    occasions: "Cool editorial low angle stylish Instagram portraits",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "cool-women-outdoor-editorial": {
    occasions: "Cool women outdoor editorial stylish Instagram portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "cosmic-energy-hero-ai-photo-prompt": {
    occasions: "Cosmic energy hero fantasy creative edits",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "couple-action-figure-two-pack-ai-prompt": {
    occasions: "Pack action figures couple anniversary posts",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "couple-christmas-market-night-stroll": {
    occasions: "Couple market night stroll Christmas holiday cards",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "couple-eastern-twinning-outfit-change": {
    occasions: "Couple eastern twinning change outfit-change try-on",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "couple-foggy-road-walk-one-shawl-winter-ai-photo-prompt": {
    occasions: "Couple foggy road walk shawl winter snow-day posts",
    worksWith: "two separate photos uploaded together in one message: person A first, person",
  },
  "couple-matching-black-outfits-change": {
    occasions: "Matching black outfits couple anniversary posts",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "couple-matching-christmas-pajamas-by-tree": {
    occasions: "Couple matching pajamas Christmas holiday cards",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "couple-snowy-cabin-window-christmas": {
    occasions: "Couple snowy cabin window Christmas holiday cards",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "couple-string-lights-doorway-christmas": {
    occasions: "Couple string lights doorway Christmas holiday cards",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "couple-wedding-outfits": {
    occasions: "Maroon ivory wedding album shots",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "cozy-dream-room": {
    occasions: "Dream room travel vacation posts",
    worksWith: "clear place photo with architecture or outdoor layout visible",
  },
  "cozy-fireplace-sweater-christmas-portrait-women": {
    occasions: "Cozy fireplace sweater Christmas holiday cards",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "cozy-plushie-pet": {
    occasions: "Adorable plush toy pet profile posts",
    worksWith: "clear pet photo with eyes visible and distinctive markings readable",
  },
  "cozy-pumpkin-patch-portrait": {
    occasions: "Warm autumn among pumpkins Halloween costume posts",
    worksWith: "one clear frontal or three-quarter portrait",
  },
  "crimson-bangle-reverie": {
    occasions: "Crimson bangle window-lit triptych portraits",
    worksWith: "one clear portrait with a visible face",
  },
  "crimson-bloom-shadows": {
    occasions: "Close floral beauty crimson rose cinematic portfolio frames",
    worksWith: "one clear portrait with a visible face",
  },
  "crochet-amigurumi-couple-ai-photo-prompt": {
    occasions: "Crocheted amigurumi doll couple anniversary posts",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "cute-3d-toon-pet": {
    occasions: "Cute 3D toon pet profile stickers",
    worksWith: "clear pet photo with eyes visible and distinctive markings readable",
  },
  "cute-chibi-ai-photo-prompt-girls-sticker": {
    occasions: "Anime-style big head chibi sticker white social posts",
    worksWith: "one clear chest-up photo of a girl or woman",
  },
  "cv-photo-ai-prompt-plain-background-resume-headshot": {
    occasions: "A clean CV resume headshot on a plain background",
    worksWith: "one recent, front-facing head-and-shoulders photo",
  },
  "cybernetic-warrior-gothic-cathedral-ai-photo-prompt": {
    occasions: "Cybernetic warrior flooded gothic cathedral cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "cyberpunk-hacker-ai-photo-prompt": {
    occasions: "Cyberpunk hacker cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "cyberpunk-street-market-ai-photo-prompt": {
    occasions: "Cyberpunk street market cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "dark-academia-library-ai-photo-prompt": {
    occasions: "Dark academia library scholar cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "dark-crowd-editorial": {
    occasions: "Night crowd editorial cinematic portfolio frames",
    worksWith: "clear three-quarter portrait with visible face",
  },
  "dark-fantasy-armored-knight-ai-photo-prompt": {
    occasions: "Dark armored knight fantasy creative edits",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "dark-fantasy-game-over-screen-ai-prompt": {
    occasions: "Dark fantasy game over screen cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "desert-planet-wanderer-ai-photo-prompt": {
    occasions: "Desert planet wanderer cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "desert-warrior-prince-ai-photo-prompt": {
    occasions: "Desert kingdom warrior prince fantasy creative edits",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "diaspora-diwali-in-a-cold-city": {
    occasions: "Winter coats Diwali festive posts",
    worksWith: "clear couple or small-group photo with faces visible",
  },
  "disposable-camera-date-night": {
    occasions: "80s retro disposable camera date night throwback posts",
    worksWith: "one photo of two people, both faces clear",
  },
  "diwali-boy-instagram-portrait": {
    occasions: "Fairy light reel cover Diwali festive posts",
    worksWith: "one clear chest-up or waist-up photo of a boy or young man",
  },
  "diwali-couple-instagram-fireworks": {
    occasions: "Rooftop fireworks Diwali festive posts",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "diwali-couple-poses-diya-doorway": {
    occasions: "Couple poses diya doorway Diwali festive posts",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "diwali-family-courtyard-group": {
    occasions: "Courtyard steps adults Diwali festive posts",
    worksWith: "one clear group photo of 4 to 6 adults with every face",
  },
  "diwali-family-dinner-table": {
    occasions: "Family dinner table Diwali festive posts",
    worksWith: "one clear group photo of the family with every face visible",
  },
  "diwali-girl-aesthetic-diya": {
    occasions: "Aesthetic girl diya tray Diwali festive posts",
    worksWith: "one clear chest-up or waist-up photo of a girl or young woman",
  },
  "diwali-men-crackers-celebration": {
    occasions: "Courtyard sparkler Diwali festive posts",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "diwali-men-kurta-portrait": {
    occasions: "Seated ivory kurta shawl carved Diwali festive posts",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "diwali-women-marigold-portrait": {
    occasions: "Editorial half body against hanging Diwali festive posts",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "diya-lit-balcony": {
    occasions: "Diya-lined balcony Diwali couple evening posts",
    worksWith: "clear couple photo with both faces visible",
  },
  "dp-ai-photo-prompt-for-boys-neon-rim-light": {
    occasions: "Trending neon rim light boy feed posts",
    worksWith: "one clear chest-up or waist-up photo of a boy or young man",
  },
  "dragon-rider-ai-photo-prompt": {
    occasions: "Dragon rider fantasy creative edits",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "dreamy-floral-warp": {
    occasions: "Liquid warp selfie fantasy creative edits",
    worksWith: "one clear portrait with a visible face",
  },
  "dreamy-memorial-portrait": {
    occasions: "Adorable gentle remembrance pet profile posts",
    worksWith: "clear pet photo with eyes visible and distinctive markings readable",
  },
  "dubai-balcony-women-lifestyle": {
    occasions: "Quiet-luxury dubai balcony women lifestyle posts",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "dubai-skyline-balcony-luxury-ai-photo-prompt": {
    occasions: "Quiet-luxury dubai skyline balcony lifestyle posts",
    worksWith: "one clear waist-up photo of one person",
  },
  "dulha-dulhan-outfits": {
    occasions: "Bride groom outfits wedding album shots",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "dupatta-office-linkedin-profile-picture-prompt-gemini-women": {
    occasions: "A polished dupatta kurta for LinkedIn or CV",
    worksWith: "one clear head-and-shoulders photo, with or without a dupatta over the head",
  },
  "eastern-wanderer-swordsman-ai-photo-prompt": {
    occasions: "Eastern wanderer swordsman fantasy creative edits",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "editorial-flat-lay": {
    occasions: "Reddit fave product shots for your shop",
    worksWith: "one clear product photo with clean edges and visible packaging",
  },
  "eid-family-frame-merge-two-photos-prompt-gemini-family": {
    occasions: "Parents' kids' combined Eid family photos",
    worksWith: "two photos uploaded together: the parents' photo first, the children's photo second",
  },
  "elegant-gothic-vampire-portrait": {
    occasions: "Gothic vampire Halloween costume posts",
    worksWith: "one clear frontal or three-quarter portrait",
  },
  "elven-forest-archer-ai-photo-prompt": {
    occasions: "Elven forest archer fantasy creative edits",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "enchanted-academy-wizard-kids-ai-photo-prompt": {
    occasions: "Enchanted academy wizard fantasy creative edits",
    worksWith: "one clear photo of a child, face visible",
  },
  "everyday-in-hand-scale": {
    occasions: "Scale shot product shots for your shop",
    worksWith: "one clear product photo with clean edges and visible packaging",
  },
  "executive-corporate-linkedin-profile-picture-prompt-gemini": {
    occasions: "A polished executive dark studio for LinkedIn or CV",
    worksWith: "one clear head-and-shoulders photo with the face large and sharp",
  },
  "fairy-light-portrait": {
    occasions: "Fairy light Diwali festive posts",
    worksWith: "one clear frontal or three-quarter portrait",
  },
  "fairy-lights-sweater-winter-ai-photo-prompt-girls": {
    occasions: "Fairy lights sweater winter snow-day posts",
    worksWith: "one clear chest-up selfie or portrait of a girl or woman",
  },
  "family-diwali-in-karachi-or-sindh": {
    occasions: "Karachi family Diwali festive posts",
    worksWith: "clear family group photo with all faces visible",
  },
  "family-lakshmi-puja-photo": {
    occasions: "Warm family decorated lakshmi puja Diwali festive posts",
    worksWith: "clear family group photo with all faces visible",
  },
  "fantasy-druid-forest-ai-photo-prompt": {
    occasions: "Fierce druid twilight canopy fantasy creative edits",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "fighting-game-versus-screen-ai-photo-prompt": {
    occasions: "Fighting game versus screen cinematic portfolio frames",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "film-noir-detective-ai-photo-prompt": {
    occasions: "Film noir detective vintage nostalgia posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "finishing-the-rangoli-together": {
    occasions: "Candid couple finishing rangoli doorway Diwali festive posts",
    worksWith: "clear couple photo with both faces readable",
  },
  "first-diwali-as-a-married-couple": {
    occasions: "First married couple Diwali festive posts",
    worksWith: "full-length or three-quarter couple portrait",
  },
  "floating-motion-hero": {
    occasions: "Floating photography product shots for your shop",
    worksWith: "one clear product photo with clean edges and visible packaging",
  },
  "foggy-road-hoodie-muffler-winter-ai-photo-prompt-boys": {
    occasions: "Foggy road hoodie muffler winter snow-day posts",
    worksWith: "one clear chest-up or waist-up photo of a boy or man",
  },
  "free-stylish-editor-portrait-ai-photo-prompt": {
    occasions: "Trending stylish editor boy feed posts",
    worksWith: "one clear chest-up photo of a boy or young man",
  },
  "friendly-glowing-witch-portrait": {
    occasions: "Witch glowing hand Halloween costume posts",
    worksWith: "one clear frontal or three-quarter portrait",
  },
  "friendship-scrapbook": {
    occasions: "Handmade scrapbook memory page collage vintage nostalgia posts",
    worksWith: "clear group photo with all faces visible and evenly lit",
  },
  "fun-ai-christmas-photo-prompt-for-kids-santa-hat-cookies": {
    occasions: "Santa hat cookies Christmas holiday cards",
    worksWith: "one clear photo of a young child, face visible",
  },
  "funny-everyday-pet": {
    occasions: "Adorable everyday life pet profile posts",
    worksWith: "clear pet photo with eyes visible and distinctive markings readable",
  },
  "garden-lawn-makeover": {
    occasions: "Garden design lawn makeover travel vacation posts",
    worksWith: "clear place photo with architecture or outdoor layout visible",
  },
  "glass-tower-climber-night-hero-ai-photo-prompt": {
    occasions: "Glass tower climber night hero cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "golden-aura-anime-fighter-ai-photo-prompt": {
    occasions: "Anime-style golden aura fighter social posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "golden-boho-storyboard": {
    occasions: "Golden hour travel vacation posts",
    worksWith: "one clear portrait with a visible face",
  },
  "golden-bouquet-glow": {
    occasions: "Warm amber glow cinematic portfolio frames",
    worksWith: "one clear portrait with a visible face",
  },
  "golden-flora-triptych": {
    occasions: "Three panel floral fashion collage professional profile photos",
    worksWith: "one clear portrait with a visible face",
  },
  "golden-hour-sparkler-shot": {
    occasions: "Festive dusk holding lit sparkler Diwali festive posts",
    worksWith: "clear waist-up or full portrait",
  },
  "golden-motion-glamour": {
    occasions: "Motion blur glam professional profile photos",
    worksWith: "one clear portrait with a visible face",
  },
  "golden-twirl-storyboard": {
    occasions: "Golden hour twirl travel vacation posts",
    worksWith: "one clear portrait with a visible face",
  },
  "graduation-day-merge-two-photos-prompt-gemini-family": {
    occasions: "Graduate parent who could not family reunion posts",
    worksWith: "two photos uploaded together: the graduate first, the parent second",
  },
  "grandparent-and-grandchild-courtyard-merge-two-photos-prompt-gemini-family": {
    occasions: "Grandparent reading grandchild charpai family reunion posts",
    worksWith: "two photos uploaded together: the grandparent first, the grandchild (older kid or",
  },
  "groom-prince-coat": {
    occasions: "Prince coat waistcoat wedding album shots",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "half-android-portrait-ai-photo-prompt": {
    occasions: "Half android cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "hand-painted-anime-film-poster-ai-prompt": {
    occasions: "Anime-style hand painted film poster social posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "hand-painted-anime-picnic-couple-ai-photo-prompt": {
    occasions: "Anime-style meadow picnic social posts",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "hand-painted-watercolor-pet": {
    occasions: "Adorable soft watercolor paper pet profile posts",
    worksWith: "clear pet photo with eyes visible and distinctive markings readable",
  },
  "handsome-boy-close-up-dp-ai-photo-prompt": {
    occasions: "Trending handsome close stylish boy feed posts",
    worksWith: "one clear close-up or chest-up photo of a boy or young man",
  },
  "happy-birthday-ai-photo-editing-prompt-girl-neon": {
    occasions: "Glowing pink happy neon birthday party photos",
    worksWith: "one clear waist-up photo of a girl or woman",
  },
  "hero-shooter-character-card-ai-photo-prompt": {
    occasions: "Hero shooter character card painterly art posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "hijab-office-linkedin-profile-picture-prompt-gemini-women": {
    occasions: "A polished dusty rose hijab navy blazer for LinkedIn or CV",
    worksWith: "one clear head-and-shoulders photo wearing a hijab, full face and chin visible",
  },
  "historic-revival": {
    occasions: "Historic facade exterior design travel vacation posts",
    worksWith: "clear place photo with architecture or outdoor layout visible",
  },
  "home-office-linkedin-profile-picture-prompt-gemini": {
    occasions: "A polished remote-work LinkedIn profile photo",
    worksWith: "one clear head-and-shoulders photo, front-facing",
  },
  "hunza-style-valley-merge-two-photos-winter-prompt": {
    occasions: "People snowy northern valley trip winter snow-day posts",
    worksWith: "two separate photos uploaded together in one message: person A first, person",
  },
  "iceberg-runway-fashion-ai-photo-prompt": {
    occasions: "Floating iceberg runway cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "intimate-cinematic-portrait": {
    occasions: "Indie-film seated portrait portfolio frames",
    worksWith: "clear portrait that can crop to a seated three-quarter",
  },
  "ivory-sherwani": {
    occasions: "Ivory zardozi sherwani kulla khussa wedding album shots",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "joyful-outdoor-lifestyle": {
    occasions: "Bright candid outdoor confetti cinematic portfolio frames",
    worksWith: "clear outdoor-friendly portrait with visible face",
  },
  "kids-astronaut-space-ai-photo-prompt": {
    occasions: "Astronaut space explorer cinematic portfolio frames",
    worksWith: "one clear photo of a child, face visible",
  },
  "kids-birthday-photo-ai-prompt-garden-party": {
    occasions: "Garden party birthday party photos",
    worksWith: "one clear photo of a toddler or young child, face visible",
  },
  "kids-superhero-ai-photo-prompt": {
    occasions: "Little superhero kid cinematic portfolio frames",
    worksWith: "one clear photo of a child, face visible",
  },
  "kitchen-remodel-vision": {
    occasions: "Modern kitchen remodel travel vacation posts",
    worksWith: "clear place photo with architecture or outdoor layout visible",
  },
  "kurta-and-nehru-jacket-with-lanterns": {
    occasions: "Kurta nehru jacket Diwali festive posts",
    worksWith: "clear standing or three-quarter portrait",
  },
  "kurta-pajama-ai-photo-prompt-for-boys-old-city-haveli": {
    occasions: "Trending old city haveli boy feed posts",
    worksWith: "one clear chest-up or waist-up photo of a boy or young man",
  },
  "kurta-pashmina-shawl-snowy-pine-forest-winter-ai-photo-prompt-men": {
    occasions: "Kurta pashmina pine forest winter snow-day posts",
    worksWith: "one clear waist-up or full-body photo of a boy or man",
  },
  "kurta-waistcoat-eid-outfit-change-men": {
    occasions: "Kurta waistcoat outfit change Eid family photos",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "leather-jacket-street-outfit-change-men": {
    occasions: "Leather jacket street change outfit-change try-on",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "linkedin-photo-clean-up-ai-prompt-gemini-keep-outfit": {
    occasions: "A polished minimal plain grey tidy even for LinkedIn or CV",
    worksWith: "a photo you already like, head and shoulders, facing the camera",
  },
  "long-coat-snowfall-winter-ai-photo-prompt-girls": {
    occasions: "Long coat snowfall winter snow-day posts",
    worksWith: "one clear waist-up or full-body photo of a girl or woman",
  },
  "long-distance-sunset-beach-merge-two-photos-prompt-gemini-couple": {
    occasions: "Walking hand beach sunset travel vacation posts",
    worksWith: "two separate photos uploaded together: person A first, person B second",
  },
  "luxury-editorial-crew": {
    occasions: "Quiet-luxury fashion crew lifestyle posts",
    worksWith: "clear group photo with all faces visible and evenly lit",
  },
  "luxury-editorial-magazine-ai-photo-prompt": {
    occasions: "Quiet-luxury solo editorial magazine lifestyle posts",
    worksWith: "one clear chest-up or waist-up photo of one person",
  },
  "luxury-house-terrace-solo-ai-photo-prompt": {
    occasions: "Quiet-luxury house terrace lifestyle posts",
    worksWith: "one clear waist-up or full-length photo of one person",
  },
  "luxury-life-cinematic-night-ai-photo-prompt": {
    occasions: "Quiet-luxury cinematic night lifestyle posts",
    worksWith: "one clear waist-up photo of one person",
  },
  "luxury-lifestyle-balcony-ai-photo-prompt": {
    occasions: "Quiet-luxury solo lifestyle balcony lifestyle posts",
    worksWith: "one clear waist-up photo of one person",
  },
  "main-character-game-menu-ai-photo-prompt": {
    occasions: "3D main character game menu avatar profile looks",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "mall-laser-backdrop-couple": {
    occasions: "80s retro laser backdrop throwback posts",
    worksWith: "one couple photo, both faces clear and close enough for a cheek-to-cheek",
  },
  "masked-stranger-halloween-selfie-ai-prompt": {
    occasions: "Masked stranger selfie Halloween costume posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "matching-team-headshot-ai-prompt-gemini-company-page": {
    occasions: "A polished company page for LinkedIn or CV",
    worksWith: "one head-and-shoulders photo per team member; run the same settings for each",
  },
  "meadow-reverie": {
    occasions: "Tall grass cinematic portfolio frames",
    worksWith: "one clear portrait with a visible face",
  },
  "mecha-pilot-anime-key-visual-ai-prompt": {
    occasions: "Anime-style mecha pilot key visual social posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "mehndi-groom-kurta": {
    occasions: "Mustard green wedding album shots",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "mehndi-outfit": {
    occasions: "Mustard green gharara wedding album shots",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "men-black-suit-three-quarter-ai-photo-prompt": {
    occasions: "Quiet-luxury men black suit three quarter lifestyle posts",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "men-suit-photoshoot-fashion-ai-photo-prompt": {
    occasions: "A polished three quarter suit photoshoot fashion for LinkedIn or CV",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "mens-christmas-knit-sweater-portrait": {
    occasions: "Men's knit sweater Christmas holiday cards",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "mens-christmas-photoshoot-dark-suit-gift-boxes": {
    occasions: "Dark suit gifts Christmas holiday cards",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "midnight-glove-noir": {
    occasions: "Noir gloves black white cinematic portfolio frames",
    worksWith: "one clear portrait with a visible face",
  },
  "midnight-luxury-spotlight": {
    occasions: "Luxury jewellery photography product shots for your shop",
    worksWith: "one clear product photo with clean edges and visible packaging",
  },
  "mini-collectible-figure": {
    occasions: "Collectible figure product shots for your shop",
    worksWith: "clear pet photo with eyes visible and distinctive markings readable",
  },
  "modern-cafe-mirror-selfie-ai-photo-prompt-for-boys": {
    occasions: "Trending modern cafe mirror selfie boy feed posts",
    worksWith: "one clear photo of a boy or young man, face fully visible",
  },
  "modern-curb-refresh": {
    occasions: "Home exterior modern curb appeal travel vacation posts",
    worksWith: "clear place photo with architecture or outdoor layout visible",
  },
  "modern-girl-cafe-balcony": {
    occasions: "Modern girl cafe balcony cinematic portfolio frames",
    worksWith: "one clear waist-up photo of a girl or young woman",
  },
  "modern-office-linkedin-profile-picture-prompt-gemini": {
    occasions: "A polished glass office window profile for LinkedIn or CV",
    worksWith: "one clear head-and-shoulders photo in daylight",
  },
  "modern-saree-drape-outfit-change": {
    occasions: "Modern saree drape change outfit-change try-on",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "modern-virtual-staging": {
    occasions: "Virtual staging empty rooms travel vacation posts",
    worksWith: "clear place photo with architecture or outdoor layout visible",
  },
  "modest-maxi-abaya-chic-outfit-change": {
    occasions: "Modest maxi abaya chic outfit-change try-on",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "monk-meditating-misty-dawn-ai-photo-prompt": {
    occasions: "Monk meditating misty dawn painterly art posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "monochrome-echo-trio": {
    occasions: "Panel echo cinematic portfolio frames",
    worksWith: "one clear portrait with a visible face",
  },
  "moonlit-vampire-romance-couple-ai-photo-prompt": {
    occasions: "Moonlit vampire romance Halloween costume posts",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "mountain-viewpoint-trip-merge-two-photos-prompt-gemini-couple": {
    occasions: "Together mountain viewpoint warm jackets winter snow-day posts",
    worksWith: "two separate photos uploaded together: person A first, person B second",
  },
  "navy-blazer-linkedin-profile-picture-prompt-gemini": {
    occasions: "A polished navy blazer profile picture for LinkedIn or CV",
    worksWith: "one recent, front-facing head-and-shoulders photo in even light",
  },
  "neon-samurai-cyborg-ai-photo-prompt": {
    occasions: "Neon samurai cyborg cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "neon-street-fashion-ai-photo-prompt": {
    occasions: "Neon lit street fashion stylish Instagram portraits",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "night-snow-street-winter-ai-photo-prompt-men": {
    occasions: "Night snow street winter snow-day posts",
    worksWith: "one clear waist-up photo of a boy or man",
  },
  "nikkah-dress": {
    occasions: "Ivory gold wedding album shots",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "old-money-aesthetic-portrait-ai-photo-prompt": {
    occasions: "Quiet-luxury old money aesthetic lifestyle posts",
    worksWith: "one clear waist-up photo of one person",
  },
  "old-money-garden-women": {
    occasions: "Old money garden women cinematic portfolio frames",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "outdoor-living-oasis": {
    occasions: "Patio rooftop outdoor travel vacation posts",
    worksWith: "clear place photo with architecture or outdoor layout visible",
  },
  "outdoor-natural-light-linkedin-profile-picture-prompt-gemini": {
    occasions: "A polished outdoor natural light for LinkedIn or CV",
    worksWith: "one clear head-and-shoulders photo with a natural expression",
  },
  "oversized-hoodie-cargo-streetwear-outfit-change": {
    occasions: "Oversized hoodie cargo streetwear outfit-change try-on",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "party-lehenga-outfit-change": {
    occasions: "Mint silver party lehenga under wedding album shots",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "passport-size-photo-ai-prompt-gemini-white-background": {
    occasions: "A polished passport-size ID photo for applications",
    worksWith: "one front-facing photo, face straight to camera, head and upper shoulders",
  },
  "pastel-anime-college-girl-ai-photo-prompt": {
    occasions: "Anime-style pastel college girl social posts",
    worksWith: "one clear chest-up or waist-up photo of an adult woman",
  },
  "pastel-bridal-lehenga": {
    occasions: "Blush pearls wedding album shots",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "pastel-coat-beanie-snowfall-winter-ai-photo-prompt-girls": {
    occasions: "Pastel coat beanie snowfall winter snow-day posts",
    worksWith: "one clear chest-up or waist-up photo of a girl or woman",
  },
  "pastel-shalwar-kameez-outfit-change-women": {
    occasions: "Pastel shalwar kameez change outfit-change try-on",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "pheran-snow-garden-winter-ai-photo-prompt-girls": {
    occasions: "Pheran snow garden winter snow-day posts",
    worksWith: "one clear chest-up or waist-up photo of a girl or woman",
  },
  "photo-booth-chaos": {
    occasions: "Friends group vintage nostalgia posts",
    worksWith: "clear group photo with all faces visible and evenly lit",
  },
  "photographer-red-t-shirt-studio-portrait-ai-prompt": {
    occasions: "Photographer red shirt studio professional profile photos",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "plastic-brick-toy-figure-group-ai-photo-prompt": {
    occasions: "3D plastic brick toy figure group avatar profile looks",
    worksWith: "one clear group photo with every face visible",
  },
  "pure-white-packshot": {
    occasions: "Clean white-background product packshots for shops",
    worksWith: "one clear product photo with clean edges and visible packaging",
  },
  "purple-smoke-portrait-ai-photo-prompt": {
    occasions: "Purple smoke artwork cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "quiet-luxury-couple-evening-walk-ai-photo-prompt": {
    occasions: "Quiet-luxury quiet couple evening walk lifestyle posts",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "quiet-luxury-terrace-women": {
    occasions: "Quiet-luxury quiet terrace women lifestyle posts",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "rainy-night-street-anime-boy-ai-photo-prompt": {
    occasions: "Anime-style rainy night street boy social posts",
    worksWith: "one clear waist-up photo of a boy or man",
  },
  "realistic-ai-photo-prompt-for-boys-golden-hour-field": {
    occasions: "Trending golden hour field boy feed posts",
    worksWith: "one clear chest-up or waist-up photo of a boy or young man",
  },
  "recognizable-zombie-portrait": {
    occasions: "Spooky zombie styling face Halloween costume posts",
    worksWith: "one clear frontal or three-quarter portrait",
  },
  "red-bridal-lehenga": {
    occasions: "Zardozi kundan wedding album shots",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "red-velvet-holiday-glam-portrait": {
    occasions: "Modest deep red velvet gown Christmas holiday cards",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "refined-luxury-living": {
    occasions: "Quiet-luxury home interior design lifestyle posts",
    worksWith: "clear place photo with architecture or outdoor layout visible",
  },
  "regency-ballroom-couple-ai-photo-prompt": {
    occasions: "Regency romance ballroom couple anniversary posts",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "retro-90s-blister-card-action-figure-ai-prompt": {
    occasions: "3D retro 90s blister card action avatar profile looks",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "retro-ai-photo-prompt-for-boys-90s-vintage-jeep": {
    occasions: "Trending 90s vintage jeep boy feed posts",
    worksWith: "one clear chest-up or waist-up photo of a boy or young man",
  },
  "retro-hand-painted-film-poster-ai-prompt": {
    occasions: "Retro hand painted film poster couple anniversary posts",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "retro-sitcom-cast": {
    occasions: "80s retro sitcom cast family group throwback posts",
    worksWith: "clear group photo with all faces visible and evenly lit",
  },
  "riverside-merge-two-photos-prompt-gemini-couple": {
    occasions: "Selfies riverside walk couple anniversary posts",
    worksWith: "two separate photos uploaded together in one message: person A first, person",
  },
  "rooftop-friends-reunion-merge-two-photos-prompt-gemini-group": {
    occasions: "Friends reunited rooftop dinner cinematic portfolio frames",
    worksWith: "two separate selfies uploaded together: friend A first, friend B second",
  },
  "rooftop-skyline-superhero-ai-photo-prompt": {
    occasions: "Rooftop skyline superhero cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "rooftop-sunset-anime-friends-ai-photo-prompt": {
    occasions: "Anime-style rooftop sunset friends social posts",
    worksWith: "one group photo of 2–5 friends with every face clearly visible",
  },
  "royal-blue-rose-storyboard": {
    occasions: "Courtyard storyboard professional profile photos",
    worksWith: "one clear portrait with a visible face",
  },
  "royal-mughal-prince-princess-ai-photo-prompt": {
    occasions: "Royal mughal prince princess couple anniversary posts",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "sad-ai-photo-prompt-for-boys-rainy-window": {
    occasions: "Trending rainy window boy feed posts",
    worksWith: "one clear chest-up or waist-up photo of a boy or young man",
  },
  "secret-agent-tuxedo-couple-ai-photo-prompt": {
    occasions: "Secret agent tuxedo couple anniversary posts",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "separate-photos-couple": {
    occasions: "Sparkler rooftop Diwali couple merge posts",
    worksWith: "two clear individual portraits (or a couple photo) with readable faces",
  },
  "shadowed-saree-noir": {
    occasions: "Leaf shadow professional profile photos",
    worksWith: "one clear portrait with a visible face",
  },
  "shalwar-kameez-linkedin-profile-picture-prompt-gemini-men": {
    occasions: "A polished shalwar kameez for LinkedIn or CV",
    worksWith: "one clear head-and-shoulders photo with the face large and sharp",
  },
  "shared-shawl-couple-winter-ai-photo-prompt-chai": {
    occasions: "Shared shawl couple winter snow-day posts",
    worksWith: "one photo of a couple with both faces clearly visible",
  },
  "shawl-chai-winter-ai-photo-prompt-girls": {
    occasions: "Shawl chai winter snow-day posts",
    worksWith: "one clear chest-up photo of a girl or woman",
  },
  "side-by-side-keepsake-frame-merge-two-photos-prompt-gemini-couple": {
    occasions: "Kept framed keepsake couple anniversary posts",
    worksWith: "two separate photos uploaded together, the one for the left side first",
  },
  "silver-rim-noir": {
    occasions: "Silver rim cinematic portfolio frames",
    worksWith: "one clear portrait with a visible face",
  },
  "skeleton-face-paint-portrait": {
    occasions: "Skeleton face paint women Halloween costume posts",
    worksWith: "one clear frontal or three-quarter portrait",
  },
  "sky-pirate-captain-ai-photo-prompt": {
    occasions: "Grizzled sky pirate galleon helm fantasy creative edits",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "snowfall-chai-winter-ai-photo-prompt-boys": {
    occasions: "Snowfall chai winter snow-day posts",
    worksWith: "one clear chest-up photo of a boy or man",
  },
  "snowfall-merge-two-photos-winter-ai-prompt-couple": {
    occasions: "Separate selfies snowy couple winter snow-day posts",
    worksWith: "two separate photos uploaded together in one message: person A first, person",
  },
  "snowy-mountain-couple-winter-ai-photo-prompt": {
    occasions: "Snowy mountain couple winter snow-day posts",
    worksWith: "one photo of a couple with both faces clearly visible",
  },
  "snowy-valley-winter-ai-photo-prompt-boys": {
    occasions: "Snowy valley winter snow-day posts",
    worksWith: "one clear chest-up or waist-up photo of a boy or man",
  },
  "sofa-cuddle-with-your-pet-merge-two-photos-prompt-gemini-person-and-pet": {
    occasions: "Adorable dog together sofa pet profile posts",
    worksWith: "two photos uploaded together: you first, your pet second",
  },
  "soft-daylight-lifestyle": {
    occasions: "Soft window-light lifestyle product shots",
    worksWith: "one clear product photo with clean edges and visible packaging",
  },
  "sorceress-glowing-spell-book-ai-photo-prompt": {
    occasions: "Sorceress glowing spell book fantasy creative edits",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "south-asian-editorial-collage": {
    occasions: "Traditional saree panel collage professional profile photos",
    worksWith: "clear portrait with visible eyes and face",
  },
  "south-asian-fashion-editorial": {
    occasions: "Traditional saree editorial profile photos",
    worksWith: "one clear frontal or three-quarter portrait",
  },
  "space-bounty-hunter-ai-photo-prompt": {
    occasions: "Desert spaceport bounty hunter cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "star-of-your-own-movie-poster-ai-prompt": {
    occasions: "Star own movie poster cinematic portfolio frames",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "storm-hammer-warrior-ai-photo-prompt": {
    occasions: "Storm hammer warrior fantasy creative edits",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "storybook-adventure-pet": {
    occasions: "Adorable illustrated adventure pet profile posts",
    worksWith: "clear pet photo with eyes visible and distinctive markings readable",
  },
  "storybook-princess-kids-ai-photo-prompt": {
    occasions: "Storybook fairy tale princess fantasy creative edits",
    worksWith: "one clear photo of a child, face visible",
  },
  "street-beautification": {
    occasions: "Outdoor render travel vacation posts",
    worksWith: "clear place photo with architecture or outdoor layout visible",
  },
  "stylish-ai-photo-prompt-for-boys-daylight-street": {
    occasions: "Trending daylight street boy feed posts",
    worksWith: "one clear waist-up or full-length photo of a boy or young man",
  },
  "stylish-ai-photo-prompt-for-men-rooftop-blazer": {
    occasions: "A polished rooftop golden hour open blazer for LinkedIn or CV",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "stylish-boy-outdoor-stairs-ai-photo-prompt": {
    occasions: "Trending stylish outdoor stairs mural boy feed posts",
    worksWith: "one clear full-length or waist-up photo of a boy or young man",
  },
  "stylish-girl-daylight-street": {
    occasions: "Girl daylight street stylish Instagram portraits",
    worksWith: "one clear waist-up or full-length photo of a girl or young woman",
  },
  "stylish-girl-instagram-dp": {
    occasions: "Stylish girl Instagram professional profile photos",
    worksWith: "one clear chest-up photo of a girl or young woman",
  },
  "sunlit-bouquet-triptych": {
    occasions: "Sunlit flower triptych cinematic portfolio frames",
    worksWith: "one clear portrait with a visible face",
  },
  "sunlit-daisy-drift": {
    occasions: "Blue sky travel vacation posts",
    worksWith: "one clear portrait with a visible face",
  },
  "sunset-city-game-loading-screen-ai-prompt": {
    occasions: "Anime-style sunset city game loading screen social posts",
    worksWith: "two clear photos (one per person) or one photo of you both",
  },
  "superhero-squad-group-ai-photo-prompt": {
    occasions: "Superhero squad group poster cinematic portfolio frames",
    worksWith: "one clear group photo with every face visible",
  },
  "tactical-hero-agent-ai-photo-prompt": {
    occasions: "Anime-style tactical hero agent social posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "tactile-macro-detail": {
    occasions: "Texture close product shots for your shop",
    worksWith: "one clear product photo with clean edges and visible packaging",
  },
  "travel-fashion-bouquet": {
    occasions: "Golden hour fashion wildflowers travel vacation posts",
    worksWith: "clear portrait with room for a walking crop",
  },
  "trending-ai-photo-prompt-for-boys-with-car-night": {
    occasions: "Night car lean boy Instagram feed posts",
    worksWith: "one clear chest-up or waist-up photo of a boy or young man",
  },
  "trending-ai-photo-prompt-for-boys-with-rose-red-shirt": {
    occasions: "Trending red shirt boy feed posts",
    worksWith: "one clear chest-up or waist-up photo of a boy or young man",
  },
  "trending-anime-boy-ai-photo-prompt-hoodie-bike": {
    occasions: "Anime-style hoodie bike social posts",
    worksWith: "one clear waist-up photo of a boy or man",
  },
  "trending-birthday-boy-ai-photo-prompt-moody-candle": {
    occasions: "Moody candle birthday party photos",
    worksWith: "one clear chest-up photo of a boy or young man",
  },
  "turn-photo-into-anime-countryside-family-ai-prompt": {
    occasions: "Anime-style turn countryside family social posts",
    worksWith: "one family or friends photo of 2–6 people with every face visible",
  },
  "urban-street-fashion-editorial": {
    occasions: "Urban street fashion stylish Instagram portraits",
    worksWith: "clear portrait suitable for a three-quarter fashion crop",
  },
  "varanasi-sunset-voyage": {
    occasions: "Riverside boat wedding album shots",
    worksWith: "one clear portrait with a visible face",
  },
  "velvet-rose-noir": {
    occasions: "Low light cinematic portfolio frames",
    worksWith: "one clear portrait with a visible face",
  },
  "victorian-gothic-novel-heroine-ai-photo-prompt": {
    occasions: "Victorian gothic novel heroine painterly art posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "vintage-1920s-gangster-boss-ai-photo-prompt": {
    occasions: "Gangster boss vintage nostalgia posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "vintage-christmas-photo-ai-prompt-for-men-retro-film": {
    occasions: "Retro film Christmas holiday cards",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "vintage-pulp-comic-hero": {
    occasions: "Pulp hero vintage nostalgia posts",
    worksWith: "clear portrait with a strong facial silhouette",
  },
  "viral-chibi-friends-ai-prompt-sticker-sheet": {
    occasions: "Chibi friends sticker-sheet social posts",
    worksWith: "one group photo of 2–4 friends with every face clearly visible",
  },
  "viral-christmas-ai-photo-trend-prompt-giant-ornament": {
    occasions: "Giant ornament Christmas holiday cards",
    worksWith: "one clear photo of a girl or woman, face fully visible",
  },
  "viral-snowflake-close-up-portrait-winter-ai-photo-prompt": {
    occasions: "Snowflake close winter snow-day posts",
    worksWith: "one clear chest-up selfie or portrait",
  },
  "voxel-block-world-avatar-ai-photo-prompt": {
    occasions: "3D voxel block world avatar profile looks",
    worksWith: "one clear photo of a child, face visible",
  },
  "walima-groom-suit": {
    occasions: "Three piece tuxedo wedding album shots",
    worksWith: "one clear waist-up photo of an adult man",
  },
  "walima-maxi": {
    occasions: "Silver champagne gown wedding album shots",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "warm-home-editorial": {
    occasions: "Home lifestyle photography product shots for your shop",
    worksWith: "one clear product photo with clean edges and visible packaging",
  },
  "wedding-stage-merge-two-photos-prompt-gemini-couple": {
    occasions: "Bride groom seated together decorated wedding album shots",
    worksWith: "two separate photos uploaded together: person A first, person B second",
  },
  "white-wedding-gown": {
    occasions: "Modest lace wedding gown album shots",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "wild-west-frontier-cowboy-ai-photo-prompt": {
    occasions: "Trending wild west frontier cowboy boy feed posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "womens-studio-christmas-photoshoot-red-backdrop": {
    occasions: "Red gold Christmas holiday cards",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "wooden-cabin-window-winter-ai-photo-prompt-boys": {
    occasions: "Wooden cabin window winter snow-day posts",
    worksWith: "one clear chest-up photo of a boy or man",
  },
  "y2k-digicam-party": {
    occasions: "Y2k digicam party vintage nostalgia posts",
    worksWith: "clear group photo with all faces visible and evenly lit",
  },
  "y2k-ghost-doorway-selfie-ai-photo-prompt": {
    occasions: "Y2k ghost doorway vintage nostalgia posts",
    worksWith: "one clear chest-up photo, face fully visible",
  },
  "zombie-apocalypse-survivor-group-ai-photo-prompt": {
    occasions: "Zombie apocalypse survivor Halloween costume posts",
    worksWith: "one clear group photo with every face visible",
  },
  "mint-sequin-stripe-saree-marble-hallway": {
    occasions: "Mint sequin stripe saree marble hallway portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "blush-organza-potli-saree-garden-patio": {
    occasions: "Blush organza potli saree garden patio portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "ivory-lace-reception-saree-boutique-mirror": {
    occasions: "Ivory lace reception saree boutique mirror portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "leopard-print-belted-saree-old-city-street": {
    occasions: "Leopard print belted saree old city street portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "teal-sequin-glam-saree-velvet-curtain": {
    occasions: "Teal sequin glam saree velvet curtain studio portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "sage-organza-saree-ivy-terrace": {
    occasions: "Sage organza saree ivy terrace daylight portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "red-ruffle-gown-saree-red-carpet": {
    occasions: "Red ruffle gown saree red carpet event portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "rose-gold-tissue-silk-saree-marble-studio": {
    occasions: "Rose-gold tissue silk saree marble studio portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "champagne-pallu-flare-saree-palace-hall": {
    occasions: "Champagne pallu flare saree palace hall portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "black-gold-border-saree-flower-steps": {
    occasions: "Black and gold border saree flower steps portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "ombre-saree-over-shoulder-dressing-room": {
    occasions: "Ombre saree over-shoulder dressing room portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "black-banarasi-pallu-saree-vintage-living-room": {
    occasions: "Black Banarasi pallu saree vintage living room portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "lavender-zari-saree-mirror-selfie": {
    occasions: "Lavender zari saree mirror selfie casual portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "blush-floral-sequin-saree-luxury-lounge": {
    occasions: "Blush floral sequin saree luxury lounge portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "golden-hour-chiffon-saree-rooftop-pallu-wind": {
    occasions: "Golden-hour chiffon saree rooftop pallu wind portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "kanjivaram-silk-saree-carved-stone-colonnade": {
    occasions: "Kanjivaram silk saree carved stone colonnade portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
  "monsoon-chiffon-saree-rainy-balcony": {
    occasions: "Monsoon chiffon saree rainy balcony blue-hour portraits",
    worksWith: "one clear waist-up photo of an adult woman",
  },
};
