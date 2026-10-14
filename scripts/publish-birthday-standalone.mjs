/**
 * Publish the 12 birthday catalog styles, their public images, and the guide social image.
 *
 * Uses @supabase/supabase-js, the ws package (Node 20 has no global WebSocket),
 * and Node built-ins. Does not import the repo.
 *
 *   NEXT_PUBLIC_SUPABASE_URL=https://....supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=... \
 *   node scripts/publish-birthday-standalone.mjs /path/to/birthday-ai-photo-prompts/webp
 *
 * The folder must contain before/<slug>-before.webp and after/<slug>-after.webp.
 * The collage style (#12 / friends-or-partner) also needs before/<slug>-before-b.webp.
 * The 1200x630 guide image is read from scripts/assets/birthday-ai-photo-prompts-og.webp
 * and uploaded to seed/catalog/editorial/birthday-ai-photo-prompts-og.webp.
 *
 * Safe to run again: storage objects are upserted, style rows are upserted,
 * and each style prompt variant and assets are replaced.
 */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import WebSocketImpl from "ws";

globalThis.WebSocket ??= WebSocketImpl;

const BUCKET = "catalog-public";
const DATA = {"provenance":{"source":"seed","licence":"catalog","modelRelease":false,"notes":"Before photos are AI-generated, not real people. The after image is an AI edit of those sources."},"og":{"file":"birthday-ai-photo-prompts-og.webp","key":"seed/catalog/editorial/birthday-ai-photo-prompts-og.webp","alt":"Realistic party photo of four friends laughing around a candle-lit white cake with confetti, balloons and streamers."},"styles":[{"n":"111","id":"birthday-ai-photo-prompt-girl-pastel-cake","title":"Birthday AI Photo Prompt for Girl (Pastel Cake)","note":"Pastel balloon wall, seated beside a tiered birthday cake","description":"A birthday AI photo prompt for girls: sit beside a pastel tiered cake in front of a balloon wall, with your real face kept. Free to copy-paste.","categorySlug":"cinematic","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":14,"status":"published","targetSourcePhoto":"One clear waist-up or full-length photo of a girl or woman","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Pastel balloon wall","Tiered birthday cake","Elegant party dress","Seated photoshoot pose"],"stays":["Face and identity","Skin tone","Hairstyle or head covering","Glasses if worn"],"beforeFile":"birthday-ai-photo-prompt-girl-pastel-cake-before.webp","afterFile":"birthday-ai-photo-prompt-girl-pastel-cake-after.webp","altSource":"Young South Asian woman with long dark wavy hair in a mustard cotton kurti, standing by a window in a home living room with a sofa and framed photos.","altResult":"Realistic photo of the same woman in a blush-pink embroidered anarkali and dupatta, seated on a cream stool beside a three-tier pastel cake with lit candles, in front of a pink, lilac and cream balloon garland with fairy lights.","variant":{"id":"birthday-ai-photo-prompt-girl-pastel-cake-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into a dreamy pastel birthday photoshoot. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a modest pastel tulle gown or a pastel embroidered anarkali with a light dupatta; keep any existing head covering. If pose is not preserved, seat her on a cream velvet stool beside a three-tier pastel cake with a few lit candles, hands resting softly on her lap, smiling at the camera. Light her with soft frontal studio light and warm twinkle from the fairy lights. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Soft pastel","background":"Pastel pink, lilac and cream balloon garland wall with fairy lights","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"112","id":"birthday-ai-photo-prompt-boy-black-gold","title":"Birthday AI Photo Prompt for Boy (Black & Gold)","note":"Black-and-gold balloons, suit, cutting the cake","description":"A birthday AI photo prompt for boys: a sharp suit, black-and-gold balloons and a cake-cutting moment that keeps your real face.","categorySlug":"cinematic","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":13,"status":"published","targetSourcePhoto":"One clear waist-up photo of a boy or young man","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Black-and-gold balloon arch","Tailored suit","Cake-cutting moment","Gold confetti"],"stays":["Face and identity","Skin tone","Hairstyle and beard","Glasses if worn"],"beforeFile":"birthday-ai-photo-prompt-boy-black-gold-before.webp","afterFile":"birthday-ai-photo-prompt-boy-black-gold-after.webp","altSource":"Young South Asian man with short black hair and light stubble in a grey t-shirt, in a busy college corridor with notice boards and students.","altResult":"Realistic photo of the same young man in a black kurta with gold embroidery, holding a knife to a black cake with gold drip and lit candles, under a black and gold balloon arch with gold confetti on the table and floor.","variant":{"id":"birthday-ai-photo-prompt-boy-black-gold-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into a stylish black-and-gold birthday photoshoot. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a fitted black suit with a plain white shirt, no tie, or a black sherwani-style kurta with subtle gold detail. If pose is not preserved, show him standing behind a black cake with gold drip and lit candles, holding a cake knife mid-cut, smiling confidently at the camera. Light him with a crisp key light and warm golden reflections on the balloons. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Luxe black and gold","background":"Black and metallic gold balloon arch with gold confetti on the floor","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"113","id":"baby-boy-birthday-photo-ai-prompt-number-balloon","title":"Baby Boy Birthday Photo AI Prompt (Number Balloon)","note":"Baby with a big gold number balloon and confetti","description":"A baby boy birthday photo AI prompt: your little one with a giant gold number balloon, soft blue decor and falling confetti, same sweet face.","categorySlug":"cinematic","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":12,"status":"published","targetSourcePhoto":"One clear photo of a baby or toddler boy, face visible","bestSourcePhoto":["One child, face clearly visible and sharp","Taken at the child's eye level","Soft daylight, no filters or stickers","Original image should not be blurry"],"changes":["Giant gold number balloon","Baby-blue decor","Confetti shower","Cute party outfit"],"stays":["Baby's face and identity","Skin tone","Hair","Apparent age"],"beforeFile":"baby-boy-birthday-photo-ai-prompt-number-balloon-before.webp","afterFile":"baby-boy-birthday-photo-ai-prompt-number-balloon-after.webp","altSource":"South Asian baby boy with short dark hair in a white onesie, sitting on a bed with beige sheets.","altResult":"Realistic photo of the same baby boy in a white shirt, blue bow tie and light-blue trousers, smiling on a fluffy white rug beside a giant gold number 1 balloon, with blue and white balloons, fairy lights and falling confetti.","variant":{"id":"baby-boy-birthday-photo-ai-prompt-number-balloon-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into a cute first-birthday photoshoot for a baby boy. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a fully covered cute party outfit: a small white shirt, little blue bow tie, and soft trousers. If pose is not preserved, seat him on a fluffy white rug beside a giant shiny gold number balloon (use the number 1 unless the user specifies another age), giggling and reaching for the falling confetti. Light him with soft, bright, even daylight with no harsh shadows. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Soft baby blue","background":"Soft baby-blue and white balloon backdrop with falling paper confetti","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"114","id":"happy-birthday-ai-photo-editing-prompt-girl-neon","title":"Happy Birthday AI Photo Editing Prompt for Girl (Neon)","note":"Glowing pink \"Happy Birthday\" neon sign photoshoot","description":"A happy birthday AI photo editing prompt for girls: pose under a glowing pink \"Happy Birthday\" neon sign with sparkler-lit party vibes.","categorySlug":"cinematic","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":11,"status":"published","targetSourcePhoto":"One clear waist-up photo of a girl or woman","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["\"Happy Birthday\" neon sign","Night party glow","Chic outfit","Playful pose"],"stays":["Face and identity","Skin tone","Hairstyle or head covering","Glasses if worn"],"beforeFile":"happy-birthday-ai-photo-editing-prompt-girl-neon-before.webp","afterFile":"happy-birthday-ai-photo-editing-prompt-girl-neon-after.webp","altSource":"South Asian woman with shoulder-length wavy dark hair in a navy blouse and jeans, smiling in a bright café-style room with wooden tables and plants.","altResult":"Realistic photo of the same woman laughing in a navy sequined long-sleeve dress, holding a pink heart-shaped balloon, under a pink cursive \"Happy Birthday\" neon sign on a dark wall with metallic balloons.","variant":{"id":"happy-birthday-ai-photo-editing-prompt-girl-neon-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into a trendy neon-lit birthday photoshoot. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a modest sequined midi dress with sleeves or a shimmery kurti with palazzo trousers; keep any existing head covering. If pose is not preserved, show her standing below the sign holding a small heart-shaped balloon, laughing with a slight head tilt. Light her with pink neon glow from above and a soft fill light on her face so skin tone stays true. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. The only text allowed is the words \"Happy Birthday\" in cursive glowing neon tube lettering on the wall above her; spell it correctly and add no other words. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Neon pink glow","background":"Dark moody party wall with a glowing pink neon sign and soft bokeh lights","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"115","id":"birthday-ai-photo-prompt-men-rooftop-night","title":"Birthday AI Photo Prompt for Men (Rooftop Night)","note":"Rooftop at night with candles, cake and city lights","description":"A birthday AI photo prompt for men: a calm rooftop night with a candle-lit cake and glowing city lights behind you, real face kept.","categorySlug":"cinematic","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":10,"status":"published","targetSourcePhoto":"One clear waist-up photo of an adult man","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Rooftop at night","City-light bokeh","Candle-lit cake table","Smart-casual outfit"],"stays":["Face and identity","Skin tone","Hair and beard","Glasses if worn"],"beforeFile":"birthday-ai-photo-prompt-men-rooftop-night-before.webp","afterFile":"birthday-ai-photo-prompt-men-rooftop-night-after.webp","altSource":"South Asian man with short dark hair and a trimmed beard in a light-blue button shirt, standing in a modern office lobby.","altResult":"Realistic night photo of the same man in a dark jacket over a navy shirt, leaning on a wooden table with a chocolate cake with lit candles and two glass candle holders, on a rooftop with string lights and a city skyline.","variant":{"id":"birthday-ai-photo-prompt-men-rooftop-night-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into a cinematic rooftop birthday night portrait. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a plain dark shirt with a light open jacket, or a dark kurta with a waistcoat. If pose is not preserved, show him leaning on a small table with a round cake, glowing candles and lanterns, looking at the camera with a relaxed smile. Light his face with warm candle glow plus a soft cool rim light from the city. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Warm cinematic night","background":"Night city rooftop with string lights, glowing skyline bokeh and a dark blue sky","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"116","id":"birthday-photo-shoot-ai-prompt-friends-party","title":"Birthday Photo Shoot AI Prompt (Friends Party)","note":"Friends laughing around a cake with a confetti burst","description":"A birthday photo shoot AI prompt for friends: turn one group photo into a party shot with a cake, party poppers and a confetti burst.","categorySlug":"cinematic","subject":"Group","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":9,"status":"published","targetSourcePhoto":"One group photo of 2–6 friends with every face visible","bestSourcePhoto":["Every face clearly visible in one photo","Everyone facing the camera, not hidden behind others","Even light on all faces","Original image should not be blurry"],"changes":["Party room with balloons","Confetti burst","Cake and party poppers","Candid laughing pose"],"stays":["Every face and identity","Each skin tone and age","Hairstyles, beards, head coverings","Outfits (if kept)"],"beforeFile":"birthday-photo-shoot-ai-prompt-friends-party-before.webp","afterFile":"birthday-photo-shoot-ai-prompt-friends-party-after.webp","altSource":"Four young South Asian friends on a college campus walkway: a woman in a lilac hijab and green top, a man with glasses in a navy t-shirt, a woman with curly hair in a maroon blouse, and a man in a grey t-shirt.","altResult":"Realistic party photo of four friends laughing around a candle-lit white cake on a cake stand: a curly-haired woman in a maroon shirt leans in to blow out the candles, a woman in a lilac hijab and green top, a man with glasses in a navy t-shirt clapping, and a man in a grey t-shirt, with confetti falling, red, yellow, blue and green balloons, gold and green tinsel curtains, polka-dot paper plates, cups and party poppers on the table.","variant":{"id":"birthday-photo-shoot-ai-prompt-friends-party-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded group photo into a joyful birthday party photo shoot of a friend group. Use every person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep every person exactly recognizable as the matching person in the source: same face shape, features, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress everyone in modest, bright party outfits, keeping any head covering or dupatta. If group arrangement and pose are not preserved, gather them closely around a table with a frosted cake, the birthday person in the center leaning in to blow the candles while friends pop party poppers and laugh. Light everyone evenly with warm party light and a slight flash pop, with a frozen confetti burst overhead. Apply {{mood}} color grading. Replace the background with {{background}}. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping any face.","defaults":{"mood":"Vibrant party","background":"Colorful party room with balloon clusters, streamers and a big confetti burst in the air","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"117","id":"birthday-photo-ai-prompt-instagram-mirror-selfie","title":"Birthday Photo AI Prompt Instagram (Mirror Selfie)","note":"Aesthetic mirror selfie in a room full of balloons","description":"A birthday photo AI prompt for Instagram: an aesthetic mirror selfie in a cozy room filled with balloons, keeping your real face.","categorySlug":"cinematic","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":360,"saved":8,"status":"published","targetSourcePhoto":"One clear photo of a girl or woman, face fully visible","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Mirror-selfie framing","Ceiling of floating balloons","Cozy aesthetic room","Story format"],"stays":["Face and identity","Skin tone","Hairstyle or head covering","Glasses if worn"],"beforeFile":"birthday-photo-ai-prompt-instagram-mirror-selfie-before.webp","afterFile":"birthday-photo-ai-prompt-instagram-mirror-selfie-after.webp","altSource":"Young South Asian woman with long straight dark hair and a middle part in a cream sweater, standing in a plain bedroom with white walls, an unmade bed and a small shelf.","altResult":"Realistic mirror selfie of the same woman in a beige ribbed turtleneck knit dress, holding a plain phone and the ribbons of pink, peach and cream balloons floating at the ceiling, reflected in an arched mirror in her bedroom strung with fairy lights.","variant":{"id":"birthday-photo-ai-prompt-instagram-mirror-selfie-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into an aesthetic birthday mirror selfie for a social story. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a modest cozy knit dress or a soft co-ord set; keep any existing head covering. If pose is not preserved, show her reflection in the mirror holding a plain phone case with no logo at chest height so her face stays fully visible, the other hand holding balloon ribbons, smiling. Light her with soft warm window light and fairy-light glow. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Warm aesthetic","background":"Cozy bedroom with an arched full-length mirror, ceiling full of floating pastel balloons with ribbons, and fairy lights","ratio":"9:16 Story","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"118","id":"trending-birthday-boy-ai-photo-prompt-moody-candle","title":"Trending Birthday Boy AI Photo Prompt (Moody Candle)","note":"Dark cinematic portrait lit by a single candle","description":"A trending birthday boy AI photo prompt to copy and paste: a moody, dark cinematic portrait lit by one candle on a small cake.","categorySlug":"cinematic","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":7,"status":"published","targetSourcePhoto":"One clear chest-up photo of a boy or young man","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Single candle light","Dark cinematic backdrop","Small cake","All-black outfit"],"stays":["Face and identity","Skin tone","Hair and beard","Glasses if worn"],"beforeFile":"trending-birthday-boy-ai-photo-prompt-moody-candle-before.webp","afterFile":"trending-birthday-boy-ai-photo-prompt-moody-candle-after.webp","altSource":"Young South Asian man with wavy black hair in an olive t-shirt, standing on a residential street with parked cars.","altResult":"Moody low-key photo of the same young man with wavy black hair in a black sweater, smiling softly down at a small chocolate cake with one lit candle held in both hands, against a dark backdrop.","variant":{"id":"trending-birthday-boy-ai-photo-prompt-moody-candle-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into a trending moody cinematic birthday portrait. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a plain black crew-neck sweater or black shirt. If pose is not preserved, show him holding a small cake with one lit candle near his chest, looking into the flame with a calm, slight smile. Light him only with warm candlelight from below, deep soft shadows, and a faint rim light so the face stays clearly visible. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Moody cinematic","background":"Plain dark charcoal studio backdrop fading to black","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"119","id":"kids-birthday-photo-ai-prompt-garden-party","title":"Kids Birthday Photo AI Prompt (Garden Party)","note":"Toddler first-birthday picnic setup in a sunny garden","description":"A kids birthday photo AI prompt: a sunny garden first-birthday setup with a mini cake, flowers and balloons, same little face.","categorySlug":"cinematic","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":6,"status":"published","targetSourcePhoto":"One clear photo of a toddler or young child, face visible","bestSourcePhoto":["One child, face clearly visible and sharp","Taken at the child's eye level","Soft daylight, no filters or stickers","Original image should not be blurry"],"changes":["Garden birthday setup","Mini smash cake","Flowers and balloons","Cute outfit"],"stays":["Child's face and identity","Skin tone","Hair","Apparent age"],"beforeFile":"kids-birthday-photo-ai-prompt-garden-party-before.webp","afterFile":"kids-birthday-photo-ai-prompt-garden-party-after.webp","altSource":"South Asian toddler girl with a small top ponytail in a yellow frock, sitting on a patterned rug in a living room with toys.","altResult":"Realistic photo of the same toddler in a peach floral ruffled romper and daisy flower crown, clapping on a picnic blanket in front of a small pink cake with one candle, in a sunny garden with pastel balloons, bunting and picnic baskets.","variant":{"id":"kids-birthday-photo-ai-prompt-garden-party-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into a sunny garden first-birthday photoshoot for a young child. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a fully covered cute outfit: a soft cotton romper or frock in pastel colors with a small floral crown. If pose is not preserved, seat the child on a picnic blanket in front of a small cake with one candle, clapping happily. Light the scene with soft golden morning sunlight filtered through leaves. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Add no text or lettering anywhere. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Fresh natural sunny","background":"Sunny green garden with flowers, a wooden picnic setup and pastel balloons tied to a tree","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"120","id":"birthday-photo-frame-design-ai-prompt-floral-card","title":"Birthday Photo Frame Design AI Prompt (Floral Card)","note":"Your photo inside a floral watercolor birthday card frame","description":"A birthday photo frame design AI prompt: your photo set in an elegant floral card frame with \"Happy Birthday\" lettering, ready to share.","categorySlug":"painting","subject":"Person","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":5,"status":"published","targetSourcePhoto":"One clear chest-up photo of a girl or woman","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Floral card frame","\"Happy Birthday\" script","Paper texture","Card layout"],"stays":["Face and identity","Skin tone","Outfit (if kept)","Pose (if kept)"],"beforeFile":"birthday-photo-frame-design-ai-prompt-floral-card-before.webp","afterFile":"birthday-photo-frame-design-ai-prompt-floral-card-after.webp","altSource":"South Asian woman in a soft-pink dupatta over her hair and a white kurti, smiling on a home balcony.","altResult":"Birthday card with the same woman's photo in an arched frame, surrounded by watercolor pink and peach roses and peonies on cream paper, with gold script \"Happy Birthday\" below.","variant":{"id":"birthday-photo-frame-design-ai-prompt-floral-card-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into an elegant floral birthday greeting card. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Keep the portrait itself photographic and realistic, and render only the frame as soft watercolor florals on paper. If clothing is not preserved, dress them in a modest pastel outfit; keep any existing head covering. If pose is not preserved, show her in a gentle, smiling chest-up portrait. Place her real photo inside an arched or oval frame in the upper center, with soft natural light on her face. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. The only text allowed is the words \"Happy Birthday\" in elegant gold script below the photo frame; spell it correctly and add no other words. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Soft romantic floral","background":"Cream textured paper with watercolor roses, peonies and green leaves around the edges","ratio":"4:5 Portrait","keepClothing":true,"keepPose":true},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"121","id":"birthday-wishes-ai-photo-prompt-3d-text-poster","title":"Birthday Wishes AI Photo Prompt (3D Text Poster)","note":"Bold birthday wishes poster with big 3D lettering","description":"A birthday wishes AI photo prompt: a bold poster with your photo and giant glossy 3D \"Happy Birthday\" letters, balloons and confetti.","categorySlug":"3d-avatars","subject":"Person","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":360,"saved":4,"status":"published","targetSourcePhoto":"One clear waist-up photo of a boy or man","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Big 3D \"Happy Birthday\" text","Poster layout","Floating 3D balloons","Story format"],"stays":["Face and identity","Skin tone","Hair and beard","Outfit (if kept)"],"beforeFile":"birthday-wishes-ai-photo-prompt-3d-text-poster-before.webp","afterFile":"birthday-wishes-ai-photo-prompt-3d-text-poster-after.webp","altSource":"South Asian man with short dark hair and a full black beard in a white t-shirt, smiling in a green park.","altResult":"Story-format poster of the same man in a white t-shirt giving a thumbs-up under giant gold 3D \"HAPPY BIRTHDAY\" letters, on a royal-blue background with navy, gold and white balloons, gold stars and confetti.","variant":{"id":"birthday-wishes-ai-photo-prompt-3d-text-poster-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into a bold birthday wishes poster. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Keep the person a realistic photograph with natural skin texture; render only the lettering, balloons and stars as glossy 3D graphics. If clothing is not preserved, dress them in a smart plain shirt or kurta in a bright solid color. If pose is not preserved, show him from the waist up giving a cheerful thumbs-up, slightly turned toward the text. Light him with bright, clean studio light so he matches the glossy poster. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. The only text allowed is the words \"Happy Birthday\" as giant glossy gold 3D letters across the top of the poster; spell it correctly and add no other words. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Bold vibrant","background":"Deep royal blue gradient poster background with floating 3D balloons, stars and confetti","ratio":"9:16 Story","keepClothing":true,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"122","id":"ai-birthday-photo-collage-prompt-friends-or-partner","title":"AI Birthday Photo Collage Prompt (Friends or Partner)","note":"Four-frame memory collage of two people","description":"An AI birthday photo collage prompt for your partner or best friend: two photos become a four-frame memory collage with \"Happy Birthday\" text.","categorySlug":"vintage","subject":"Group","intent":"Full scene transformation","requirement":"Two photos","tool":"ChatGPT Image","height":320,"saved":3,"status":"published","targetSourcePhoto":"Two clear photos (one per person) or one photo of you both","bestSourcePhoto":["One clear photo per person, or one photo of you both","Faces large and sharp","Similar light in both photos","Original images should not be blurry"],"changes":["Four-photo collage layout","Scrapbook page","Instant-print frames","\"Happy Birthday\" caption"],"stays":["Both faces and identities","Each skin tone and age","Hairstyles, beards, head coverings","Outfits (if kept)"],"beforeFile":"ai-birthday-photo-collage-prompt-friends-or-partner-before.webp","afterFile":"ai-birthday-photo-collage-prompt-friends-or-partner-after.webp","altSource":"South Asian woman with dark hair in a low bun in a teal top, smiling in a tree-lined park.","altResult":"Scrapbook collage of four instant-print photos of the woman in teal and the man in grey together: laughing on a bench, sharing cake, holding colorful balloons, and a close cheek-to-cheek portrait, with a blue handwritten \"Happy Birthday\" caption, washi tape, hearts and dried flowers.","variant":{"id":"ai-birthday-photo-collage-prompt-friends-or-partner-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["first photo","second photo"],"version":"1.0.0","template":"Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a four-frame birthday memory collage of two people. The first uploaded photo shows person A and the second uploaded photo shows person B; if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in modest casual outfits that differ slightly between frames; keep any head covering or dupatta. If group arrangement and pose are not preserved, create four instant-print-style photo frames showing them together: laughing side by side, sharing a slice of cake, holding balloons, and a close smiling portrait, at realistic relative heights. Light every frame with the same warm natural light so they look like real photos from one day. Apply {{mood}} color grading. Use {{background}} as the backdrop. The only text allowed is the words \"Happy Birthday\" as one handwritten caption in the center of the page; spell it correctly and add no other words. Do not add extra people, watermarks, brand names, logos, characters, or licensed decorations; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping any face.","defaults":{"mood":"Warm nostalgic film","background":"Warm cream scrapbook page with washi tape, small paper hearts and dried flowers","ratio":"1:1 Square","keepClothing":true,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]},"beforeBFile":"ai-birthday-photo-collage-prompt-friends-or-partner-before-b.webp","altSecond":"South Asian man with short dark hair and light stubble in a charcoal polo shirt, smiling in a park with benches."}]};

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error("Missing required env: " + name);
  return value;
}

function uuidFromKey(key) {
  const hash = createHash("sha256").update("ai-prompt-grid:" + key).digest("hex");
  const chars = hash.slice(0, 32).split("");
  chars[12] = "5";
  const variant = (parseInt(chars[16], 16) & 0x3) | 0x8;
  chars[16] = variant.toString(16);
  const h = chars.join("");
  return (
    h.slice(0, 8) +
    "-" +
    h.slice(8, 12) +
    "-" +
    h.slice(12, 16) +
    "-" +
    h.slice(16, 20) +
    "-" +
    h.slice(20, 32)
  );
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function publicObjectUrl(base, stem) {
  return (
    base.replace(/\/$/, "") +
    "/storage/v1/object/public/" +
    BUCKET +
    "/seed/catalog/editorial/" +
    stem +
    ".webp"
  );
}

async function ensureBucket(client) {
  const { data: buckets, error: listError } = await client.storage.listBuckets();
  if (listError) throw listError;
  if ((buckets ?? []).some((bucket) => bucket.name === BUCKET)) return;
  const { error: createError } = await client.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: "10MB",
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  });
  if (createError && !/already exists/i.test(createError.message)) throw createError;
}

async function uploadFile(client, localPath, key) {
  const body = fs.readFileSync(localPath);
  const { error } = await client.storage.from(BUCKET).upload(key, body, {
    contentType: "image/webp",
    upsert: true,
  });
  if (error) throw new Error(key + ": " + error.message);
}

function resultPixels(style) {
  const ratio = style.variant?.defaults?.ratio ?? "";
  if (String(ratio).startsWith("9:16")) return { resultWidth: 941, resultHeight: 1672 };
  if (String(ratio).startsWith("1:1")) return { resultWidth: 1200, resultHeight: 1200 };
  return { resultWidth: 1122, resultHeight: 1402 };
}

function pairAsset(styleId, kind, sortOrder, sourceUrl, resultUrl, altSource, altResult, pixels) {
  return {
    id: uuidFromKey("asset:" + styleId + ":" + kind + ":" + sortOrder),
    style_id: uuidFromKey("style:" + styleId),
    kind,
    source_storage_key: sourceUrl,
    result_storage_key: resultUrl,
    alt_text: altSource,
    provenance: {
      ...DATA.provenance,
      altSource,
      altResult,
      resultWidth: pixels.resultWidth,
      resultHeight: pixels.resultHeight,
    },
    sort_order: sortOrder,
  };
}

async function categoryIdFor(client, cache, slug) {
  if (cache.has(slug)) return cache.get(slug);
  const { data: category, error } = await client
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  if (!category) throw new Error("Category not found: " + slug);
  cache.set(slug, category.id);
  return category.id;
}

async function seedStyle(client, style, categoryId) {
  const styleId = uuidFromKey("style:" + style.id);
  const { error: styleError } = await client.from("styles").upsert(
    {
      id: styleId,
      slug: style.id,
      title: style.title,
      category_id: categoryId,
      summary: style.note,
      description: style.description,
      supported_subjects: [style.subject],
      edit_intent: style.intent,
      input_requirement: style.requirement,
      photo_requirements: { best: style.bestSourcePhoto },
      preservation_targets: style.stays,
      change_targets: style.changes,
      target_source_photo: style.targetSourcePhoto,
      card_height: style.height,
      save_count: style.saved,
      status: style.status,
      published_at: style.status === "published" ? new Date().toISOString() : null,
    },
    { onConflict: "slug" },
  );
  if (styleError) throw styleError;

  const variantId = uuidFromKey("variant:" + style.variant.id);
  const { error: deleteVariantError } = await client
    .from("prompt_variants")
    .delete()
    .eq("style_id", styleId);
  if (deleteVariantError) throw deleteVariantError;

  const { error: variantError } = await client.from("prompt_variants").insert({
    id: variantId,
    style_id: styleId,
    tool: style.variant.tool,
    mode: style.variant.mode,
    input_image_count: style.variant.inputImageCount,
    input_image_roles: style.variant.inputImageRoles,
    version: style.variant.version,
    template: style.variant.template,
    variables: { defaults: style.variant.defaults },
    settings: {},
    test_record: {
      limitations: style.variant.limitations,
    },
    is_primary: true,
    status: "published",
  });
  if (variantError) throw variantError;

  const { error: deleteAssetError } = await client
    .from("style_assets")
    .delete()
    .eq("style_id", styleId);
  if (deleteAssetError) throw deleteAssetError;

  const pixels = resultPixels(style);
  const assets = [
    pairAsset(style.id, "card_pair", 0, style._sourceUrl, style._resultUrl, style.altSource, style.altResult, pixels),
    pairAsset(style.id, "example_pair", 1, style._sourceUrl, style._resultUrl, style.altSource, style.altResult, pixels),
  ];
  if (style.beforeBFile) {
    assets.push(
      pairAsset(
        style.id,
        "example_pair",
        2,
        style._secondSourceUrl,
        style._resultUrl,
        style.altSecond,
        style.altResult,
        pixels,
      ),
    );
  }
  const { error: assetsError } = await client.from("style_assets").insert(assets);
  if (assetsError) throw assetsError;

  const tags = [
    { name: style.subject, kind: "subject" },
    { name: style.intent, kind: "intent" },
    { name: style.tool, kind: "tool" },
  ];
  for (const tag of tags) {
    const tagSlug = slugify(tag.kind + "-" + tag.name);
    const { data: existingTag, error: findTagError } = await client
      .from("tags")
      .select("id")
      .eq("slug", tagSlug)
      .maybeSingle();
    if (findTagError) throw findTagError;
    let tagId = existingTag?.id;
    if (!tagId) {
      tagId = uuidFromKey("tag:" + tagSlug);
      const { error: tagError } = await client.from("tags").insert({
        id: tagId,
        name: tag.name,
        slug: tagSlug,
        kind: tag.kind,
      });
      if (tagError) throw tagError;
    }
    const { error: linkError } = await client.from("style_tags").upsert(
      { style_id: styleId, tag_id: tagId },
      { onConflict: "style_id,tag_id" },
    );
    if (linkError) throw linkError;
  }
}

async function main() {
  const folder = process.argv[2];
  if (!folder) {
    throw new Error("Pass the folder that contains before/ and after/.");
  }
  const root = path.resolve(folder);
  const base = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const client = createClient(base, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  await ensureBucket(client);

  const urls = [];
  for (const style of DATA.styles) {
    const sourcePath = path.join(root, "before", style.beforeFile);
    const resultPath = path.join(root, "after", style.afterFile);
    if (!fs.existsSync(sourcePath)) throw new Error("Missing " + sourcePath);
    if (!fs.existsSync(resultPath)) throw new Error("Missing " + resultPath);
    const sourceKey = "seed/catalog/editorial/source-" + style.n + ".webp";
    const resultKey = "seed/catalog/editorial/result-" + style.n + ".webp";
    await uploadFile(client, sourcePath, sourceKey);
    await uploadFile(client, resultPath, resultKey);
    style._sourceUrl = publicObjectUrl(base, "source-" + style.n);
    style._resultUrl = publicObjectUrl(base, "result-" + style.n);
    urls.push(style._sourceUrl, style._resultUrl);
    if (style.beforeBFile) {
      const secondPath = path.join(root, "before", style.beforeBFile);
      if (!fs.existsSync(secondPath)) throw new Error("Missing " + secondPath);
      const secondKey = "seed/catalog/editorial/source-" + style.n + "b.webp";
      await uploadFile(client, secondPath, secondKey);
      style._secondSourceUrl = publicObjectUrl(base, "source-" + style.n + "b");
      urls.push(style._secondSourceUrl);
    }
    console.log("uploaded " + style.n + " " + style.id);
  }

  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const ogPath = path.join(scriptDir, "assets", DATA.og.file);
  if (!fs.existsSync(ogPath)) throw new Error("Missing " + ogPath);
  await uploadFile(client, ogPath, DATA.og.key);
  const ogUrl = publicObjectUrl(base, DATA.og.file.replace(/\.webp$/, ""));
  urls.push(ogUrl);
  console.log("uploaded " + DATA.og.file);

  const categories = new Map();
  for (const style of DATA.styles) {
    const categoryId = await categoryIdFor(client, categories, style.categorySlug);
    await seedStyle(client, style, categoryId);
    console.log("seeded " + style.id);
  }

  let failed = 0;
  for (const url of urls) {
    const response = await fetch(url);
    if (response.ok) {
      console.log("OK " + url);
    } else {
      failed += 1;
      console.log("FAIL " + url + " " + response.status);
    }
  }
  if (failed > 0) {
    throw new Error(failed + " public image URL(s) failed");
  }
  console.log("Done. Published " + DATA.styles.length + " styles.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
