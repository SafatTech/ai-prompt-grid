/**
 * Publish the 12 boys catalog styles, their public images, and the guide social image.
 *
 * Uses @supabase/supabase-js, the ws package (Node 20 has no global WebSocket),
 * and Node built-ins. Does not import the repo.
 *
 *   NEXT_PUBLIC_SUPABASE_URL=https://....supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=... \
 *   node scripts/publish-boys-standalone.mjs /path/to/trending-ai-photo-prompts-for-boys/webp
 *
 * The folder must contain before/<slug>-before.webp and after/<slug>-after.webp.
 * Couple styles (#3, #7, #11 / rooftop, beach, monsoon) also need before/<slug>-before-b.webp.
 * The 1200x630 guide image is read from scripts/assets/trending-ai-photo-prompts-for-boys-og.webp
 * and uploaded to seed/catalog/editorial/trending-ai-photo-prompts-for-boys-og.webp.
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
const DATA = {"provenance":{"source":"seed","licence":"catalog","modelRelease":false,"notes":"Before photos are AI-generated, not real people. The after image is an AI edit of those sources."},"og":{"file":"trending-ai-photo-prompts-for-boys-og.webp","key":"seed/catalog/editorial/trending-ai-photo-prompts-for-boys-og.webp","alt":"Realistic night photo of the same young man in a black bomber jacket, dark tee and dark jeans, arms crossed, leaning on a glossy unbadged black sports car on a rain-wet city street with blurred neon signs and streetlights."},"styles":[{"n":"123","id":"trending-ai-photo-prompt-for-boys-with-car-night","title":"Trending AI Photo Prompt for Boys with Car (Night)","note":"Leaning on a generic black sports car on a wet night road","description":"A trending AI photo prompt for boys with a car: lean on a sleek unbadged black sports car on a rain-wet city road at night, with your real face kept.","categorySlug":"cinematic","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":14,"status":"published","targetSourcePhoto":"One clear chest-up or waist-up photo of a boy or young man","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Generic black sports car","Wet night road reflections","Dark jacket outfit","Leaning pose"],"stays":["Face and identity","Skin tone","Hairstyle and beard","Glasses if worn"],"beforeFile":"trending-ai-photo-prompt-for-boys-with-car-night-before.webp","afterFile":"trending-ai-photo-prompt-for-boys-with-car-night-after.webp","altSource":"Young South Asian man with short side-parted black hair, clean shaven, in a plain white t-shirt, taking a selfie outside an older apartment building with balconies and overhead wires.","altResult":"Realistic night photo of the same young man in a black bomber jacket, dark tee and dark jeans, arms crossed, leaning on a glossy unbadged black sports car on a rain-wet city street with blurred neon signs and streetlights.","variant":{"id":"trending-ai-photo-prompt-for-boys-with-car-night-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into a cinematic night portrait with a sports car. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a plain black bomber jacket over a dark crew-neck tee and dark jeans. If pose is not preserved, show him leaning back against the front of a sleek, unbadged, generic black sports car with no logos or number plate, arms crossed, looking at the camera with a calm, confident expression. Light him with cool streetlight from the side and warm reflections bouncing off the wet road. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Cool cinematic night","background":"Wet city road at night with neon and streetlight reflections on the asphalt and soft bokeh","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"124","id":"trending-ai-photo-prompt-for-boys-with-rose-red-shirt","title":"Trending AI Photo Prompt for Boys with Rose (Red Shirt)","note":"Daylight street portrait in a red shirt with a red rose bouquet","description":"A trending AI photo prompt for boys with rose: a bright daylight street portrait in a red shirt holding a bouquet of red roses. Free to copy and paste.","categorySlug":"cinematic","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":13,"status":"published","targetSourcePhoto":"One clear chest-up or waist-up photo of a boy or young man","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Red shirt","Red rose bouquet","Sunny street","Relaxed smiling pose"],"stays":["Face and identity","Skin tone","Hairstyle and beard","Glasses if worn"],"beforeFile":"trending-ai-photo-prompt-for-boys-with-rose-red-shirt-before.webp","afterFile":"trending-ai-photo-prompt-for-boys-with-rose-red-shirt-after.webp","altSource":"Young South Asian man with curly black hair and light stubble in a grey polo shirt, smiling in a brick university courtyard with students walking behind.","altResult":"Realistic daylight photo of the same young man in a red shirt with rolled sleeves and beige trousers, holding a bouquet of red roses wrapped in kraft paper on a sunny cream-walled street with green plants.","variant":{"id":"trending-ai-photo-prompt-for-boys-with-rose-red-shirt-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into a bright romantic daylight street portrait with red roses. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a plain red button-up shirt with sleeves rolled to the forearm and light beige trousers. If pose is not preserved, show him standing on the street holding a bouquet of fresh red roses wrapped in plain kraft paper at chest height, smiling slightly at the camera. Light him with soft, warm natural daylight and gentle shade on the face; avoid low-light or noir lighting. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Warm romantic daylight","background":"Sunny old-town street with cream walls, green plants and soft background blur","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"125","id":"ai-photo-prompt-for-boy-and-girl-standing-together-rooftop","title":"AI Photo Prompt for Boy and Girl Standing Together (Rooftop)","note":"Standing together under string lights on a city rooftop, matching outfits","description":"An AI photo prompt for boy and girl standing together: a city rooftop at dusk under string lights, in matching outfits, made from two photos.","categorySlug":"cinematic","subject":"Group","intent":"Full scene transformation","requirement":"Two photos","tool":"ChatGPT Image","height":340,"saved":12,"status":"published","targetSourcePhoto":"Two clear photos (boy, then girl) or one photo of you both","bestSourcePhoto":["One clear photo per person, or one photo of you both","Faces large and sharp, no sunglasses","Similar light in both photos","Original images should not be blurry"],"changes":["Rooftop at dusk","String lights","Matching outfits","Standing side by side"],"stays":["Both faces and identities","Each skin tone and age","Hairstyles, beards, head coverings","Realistic relative heights"],"beforeFile":"ai-photo-prompt-for-boy-and-girl-standing-together-rooftop-before.webp","afterFile":"ai-photo-prompt-for-boy-and-girl-standing-together-rooftop-after.webp","altSource":"Young South Asian man with short wavy hair and a short beard in a navy t-shirt, smiling in a residential lane with brick houses and overhead wires.","altResult":"Realistic dusk photo of the same couple standing close on a city rooftop under string lights, he in an off-white shirt and dark trousers, she in an off-white kurta and dupatta with her hand on his chest, potted plants and a city skyline behind.","variant":{"id":"ai-photo-prompt-for-boy-and-girl-standing-together-rooftop-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["first photo","second photo"],"version":"1.0.0","template":"Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a boy and girl standing together on a city rooftop at dusk. The first uploaded photo shows person A (the boy) and the second uploaded photo shows person B (the girl); if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Dress them in modest matching outfits in the same color: an off-white shirt and dark trousers for him, and an off-white long kurta or long-sleeve dress for her; keep any head covering or dupatta. If group arrangement and pose are not preserved, show them standing side by side close together, her hand on his arm, both smiling toward the camera. Keep realistic relative heights and natural, modest, family-friendly body language. Light both with the same warm string-light glow and soft dusk sky light so they look photographed together. Apply {{mood}} color grading. Use {{background}} as the backdrop. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Warm golden dusk","background":"City rooftop terrace at dusk with warm string lights overhead and a softly blurred skyline","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]},"beforeBFile":"ai-photo-prompt-for-boy-and-girl-standing-together-rooftop-before-b.webp","altSecond":"Young South Asian woman with long dark hair in a peach cotton kurti with a dupatta over one shoulder, smiling in a residential lane."},{"n":"126","id":"sad-ai-photo-prompt-for-boys-rainy-window","title":"Sad AI Photo Prompt for Boys (Rainy Window)","note":"Sad boy by a rain-streaked window at night, warm lamp light, in colour","description":"A sad AI photo prompt for boys: sitting by a rain-streaked window at night with a warm lamp glow, an emotional colour portrait, real face kept.","categorySlug":"cinematic","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":11,"status":"published","targetSourcePhoto":"One clear chest-up or waist-up photo of a boy or young man","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Rainy night window","Warm lamp light","Hoodie outfit","Thoughtful sad pose"],"stays":["Face and identity","Skin tone","Hairstyle and beard","Glasses if worn"],"beforeFile":"sad-ai-photo-prompt-for-boys-rainy-window-before.webp","afterFile":"sad-ai-photo-prompt-for-boys-rainy-window-after.webp","altSource":"South Asian teenage boy with messy black hair and a fringe in a maroon t-shirt, sitting at a cluttered desk with a laptop in a bedroom.","altResult":"Moody colour night photo of the same boy in a dark grey hoodie, chin resting on his hand by a rain-streaked window, a warm table lamp reflected on one side and blurred blue city lights outside.","variant":{"id":"sad-ai-photo-prompt-for-boys-rainy-window-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into an emotional, cinematic sad portrait by a rainy window. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a plain dark grey hoodie. If pose is not preserved, show him sitting by the window with his chin resting on one hand, looking out at the rain with a quiet, sad expression, his face turned three-quarters toward the camera. Light his face with warm lamp light from one side and cool blue window light from the other; keep it in color, not black and white. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Moody blue and amber","background":"Dim room at night with a rain-streaked window, blurred city lights outside and a small warm table lamp","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"127","id":"bike-ai-photo-prompt-for-boys-mountain-highway","title":"Bike AI Photo Prompt for Boys (Mountain Highway)","note":"Generic cafe-racer motorcycle on a mountain highway at sunset","description":"A bike AI photo prompt for boys: sit on a generic cafe-racer motorcycle on a winding mountain highway at sunset, with your real face kept.","categorySlug":"cinematic","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":10,"status":"published","targetSourcePhoto":"One clear chest-up or waist-up photo of a boy or young man","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Generic cafe-racer motorcycle","Mountain highway","Riding jacket","Sunset glow"],"stays":["Face and identity","Skin tone","Hairstyle and beard","Glasses if worn"],"beforeFile":"bike-ai-photo-prompt-for-boys-mountain-highway-before.webp","afterFile":"bike-ai-photo-prompt-for-boys-mountain-highway-after.webp","altSource":"South Asian man with a short crew cut and full black beard in an olive henley, smiling in a tree-lined park.","altResult":"Realistic sunset photo of the same man in a brown jacket and dark jeans, sitting on an unbadged cafe-racer style motorcycle with a round headlight, holding an open-face helmet, on a winding mountain highway with hazy peaks.","variant":{"id":"bike-ai-photo-prompt-for-boys-mountain-highway-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into a cinematic motorcycle portrait on a mountain road at sunset. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a plain brown leather-look riding jacket, dark jeans and boots, with no patches or logos. If pose is not preserved, show him seated sideways on a parked, generic, unbadged cafe-racer style motorcycle with a round headlight and no logos or number plate, holding an open-face helmet on his knee, looking at the camera. Light him with warm low sunset light from the side and a soft golden rim on his hair. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Golden sunset","background":"Winding mountain highway at sunset with layered peaks and a glowing orange sky","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"128","id":"retro-ai-photo-prompt-for-boys-90s-vintage-jeep","title":"Retro AI Photo Prompt for Boys (90s Vintage Jeep)","note":"90s denim-jacket look beside a vintage jeep, film grain","description":"A retro AI photo prompt for boys: a 90s film look in a denim jacket beside a vintage open-top jeep, with warm grain and faded colour.","categorySlug":"cinematic","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":9,"status":"published","targetSourcePhoto":"One clear chest-up or waist-up photo of a boy or young man","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["90s film grain","Denim jacket","Vintage open-top jeep","Dusty country road"],"stays":["Face and identity","Skin tone","Hairstyle and beard","Glasses if worn"],"beforeFile":"retro-ai-photo-prompt-for-boys-90s-vintage-jeep-before.webp","afterFile":"retro-ai-photo-prompt-for-boys-90s-vintage-jeep-after.webp","altSource":"Young South Asian man with swept-back medium-length black hair and a thin moustache in a black t-shirt, smiling by an iron gate and brick pillar.","altResult":"Faded 90s-film-style photo of the same young man in a light-wash denim jacket, white tee and jeans, one hand in his pocket, leaning on a weathered olive open-top vintage jeep on a dusty country road.","variant":{"id":"retro-ai-photo-prompt-for-boys-90s-vintage-jeep-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into a 1990s-style retro film photograph beside a vintage jeep. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a light-wash denim jacket over a plain white tee with loose straight-leg jeans. If pose is not preserved, show him leaning on the side of a generic, unbadged vintage open-top jeep in faded olive with no logos or number plate, one hand in his pocket, looking at the camera with a relaxed smile. Light him with warm afternoon sun and add a 90s point-and-shoot film look: soft grain, slightly faded colors and gentle warm tint; do not make it an 80s poster. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Faded 90s film","background":"Dusty countryside road with dry grass, a lone tree and a pale afternoon sky","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"129","id":"aesthetic-ai-photo-editing-prompt-for-boy-and-girl-beach","title":"Aesthetic AI Photo Editing Prompt for Boy and Girl (Beach)","note":"Sunset beach walk with golden haze, faces still visible","description":"An aesthetic AI photo editing prompt for boy and girl: a dreamy sunset beach walk in golden haze, made from two photos, with both faces kept.","categorySlug":"cinematic","subject":"Group","intent":"Full scene transformation","requirement":"Two photos","tool":"ChatGPT Image","height":340,"saved":8,"status":"published","targetSourcePhoto":"Two clear photos (boy, then girl) or one photo of you both","bestSourcePhoto":["One clear photo per person, or one photo of you both","Faces large and sharp, no sunglasses","Similar light in both photos","Original images should not be blurry"],"changes":["Sunset beach","Golden haze and backlight","Light linen outfits","Walking together"],"stays":["Both faces and identities","Each skin tone and age","Hairstyles, beards, head coverings","Realistic relative heights"],"beforeFile":"aesthetic-ai-photo-editing-prompt-for-boy-and-girl-beach-before.webp","afterFile":"aesthetic-ai-photo-editing-prompt-for-boy-and-girl-beach-after.webp","altSource":"Young South Asian man with short black hair and round thin-framed glasses in a light-blue shirt, smiling in an office corridor.","altResult":"Realistic sunset beach photo of the same couple walking hand in hand along the shoreline, smiling at each other, he in glasses, a white linen shirt and beige trousers, she in a long pastel-pink dress and dusty-rose hijab, the sun low over the waves.","variant":{"id":"aesthetic-ai-photo-editing-prompt-for-boy-and-girl-beach-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["first photo","second photo"],"version":"1.0.0","template":"Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: an aesthetic boy and girl walking on the beach at sunset. The first uploaded photo shows person A (the boy) and the second uploaded photo shows person B (the girl); if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Dress them in modest light linen outfits: a white linen shirt and beige trousers for him and a long flowing pastel dress with sleeves for her; keep any head covering or dupatta. If group arrangement and pose are not preserved, show them walking slowly along the shoreline holding hands, turning to smile at each other with their faces visible in three-quarter view. Keep realistic relative heights and natural, modest, family-friendly body language. Backlight both with the low sun for a warm golden glow and soft rim light, but keep enough front fill light that both faces stay clear and recognizable, not silhouettes. Apply {{mood}} color grading. Use {{background}} as the backdrop. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Golden hazy sunset","background":"Calm sandy beach at sunset with soft waves, a low glowing sun and golden haze","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]},"beforeBFile":"aesthetic-ai-photo-editing-prompt-for-boy-and-girl-beach-before-b.webp","altSecond":"Young South Asian woman in a dusty-rose hijab and cream long-sleeve top, smiling softly in an office corridor with plants."},{"n":"130","id":"attitude-ai-photo-prompt-for-boys-black-outfit","title":"Attitude AI Photo Prompt for Boys (Black Outfit)","note":"Stylish all-black outfit, sunglasses in hand, low-angle city wall shot","description":"An attitude AI photo prompt for boys: a stylish all-black outfit and sunglasses, shot from a low angle against a concrete city wall.","categorySlug":"cinematic","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":360,"saved":7,"status":"published","targetSourcePhoto":"One clear chest-up or waist-up photo of a boy or young man","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["All-black outfit","Low-angle shot","Concrete city wall","Attitude pose"],"stays":["Face and identity","Skin tone","Hairstyle and beard","Glasses if worn"],"beforeFile":"attitude-ai-photo-prompt-for-boys-black-outfit-before.webp","afterFile":"attitude-ai-photo-prompt-for-boys-black-outfit-after.webp","altSource":"South Asian young man with a short faded haircut and stubble beard in a grey hoodie, serious expression, on a city sidewalk with pedestrians.","altResult":"Low-angle story-format photo of the same man with a short fade and stubble beard in an all-black overshirt, tee and trousers with a thin silver chain, lowering dark round sunglasses with one hand so his eyes show above the frames, standing against a weathered grey concrete wall in hard sunlight.","variant":{"id":"attitude-ai-photo-prompt-for-boys-black-outfit-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into a stylish attitude street portrait shot from a low angle. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in an all-black outfit: a plain black overshirt, black tee, black trousers and a simple silver chain. If pose is not preserved, show him from a slightly low camera angle, one hand adjusting a pair of plain dark sunglasses pulled down so his eyes stay visible, chin slightly raised with a confident, serious expression. Light him with hard directional afternoon sun and crisp shadows on the wall. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"High-contrast urban","background":"Raw grey concrete city wall with hard afternoon shadows","ratio":"9:16 Story","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"131","id":"kurta-pajama-ai-photo-prompt-for-boys-old-city-haveli","title":"Kurta Pajama AI Photo Prompt for Boys (Old City Haveli)","note":"White kurta pajama and waistcoat on old-city haveli steps, everyday (non-festive)","description":"A kurta pajama AI photo prompt for boys: a white kurta pajama and waistcoat on old-city haveli steps, a classic desi everyday look, real face kept.","categorySlug":"cinematic","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":6,"status":"published","targetSourcePhoto":"One clear chest-up or waist-up photo of a boy or young man","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["White kurta pajama","Waistcoat","Haveli steps","Heritage daylight"],"stays":["Face and identity","Skin tone","Hairstyle and beard","Glasses if worn"],"beforeFile":"kurta-pajama-ai-photo-prompt-for-boys-old-city-haveli-before.webp","afterFile":"kurta-pajama-ai-photo-prompt-for-boys-old-city-haveli-after.webp","altSource":"South Asian man with neat short hair, a thick moustache and short beard in a beige t-shirt, standing in a home living room.","altResult":"Realistic photo of the same man in a white kurta pajama, dark grey waistcoat and brown leather sandals, sitting on worn stone steps in a sunlit old haveli courtyard with carved wooden doors and arches.","variant":{"id":"kurta-pajama-ai-photo-prompt-for-boys-old-city-haveli-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into a classic desi portrait on old-city haveli steps. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a crisp plain white kurta pajama with a solid dark waistcoat and simple leather sandals. If pose is not preserved, show him sitting casually on the stone steps, one arm resting on his knee, smiling softly at the camera. Light him with warm, soft daylight falling into the courtyard; keep it an everyday look with no festive lamps, lanterns or decorations. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Warm heritage sunlight","background":"Old-city haveli courtyard with carved wooden doors, arched sandstone walls and worn stone steps","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"132","id":"dp-ai-photo-prompt-for-boys-neon-rim-light","title":"DP AI Photo Prompt for Boys (Neon Rim Light)","note":"Instagram DP close-up in a dual-colour shirt with neon rim light","description":"A DP AI photo prompt for boys: a sharp square close-up for your Instagram profile, in a two-tone shirt with pink and blue neon rim light.","categorySlug":"cinematic","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":320,"saved":5,"status":"published","targetSourcePhoto":"One clear chest-up or waist-up photo of a boy or young man","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Square DP close-up","Dual-colour shirt","Neon rim light","Dark studio backdrop"],"stays":["Face and identity","Skin tone","Hairstyle and beard","Glasses if worn"],"beforeFile":"dp-ai-photo-prompt-for-boys-neon-rim-light-before.webp","afterFile":"dp-ai-photo-prompt-for-boys-neon-rim-light-after.webp","altSource":"Young South Asian man with spiky black hair and rectangular black glasses in a dark green t-shirt, slight smile, indoors by a plain wall.","altResult":"Square close-up of the same young man with his glasses, in a half-black, half-maroon tee, with pink and blue neon rim light against a dark studio backdrop.","variant":{"id":"dp-ai-photo-prompt-for-boys-neon-rim-light-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into a sharp profile-picture close-up with neon rim lighting. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a plain two-tone color-block shirt, half black and half maroon, with no print. If pose is not preserved, frame him from the chest up, head turned slightly, looking straight into the camera with a confident half-smile. Light him with a soft frontal key light so skin tone stays true, plus a pink neon rim light on one side and a blue neon rim light on the other. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Neon pink and blue","background":"Plain dark studio backdrop with a soft gradient glow","ratio":"1:1 Square","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"133","id":"ai-photo-prompt-for-boy-and-girl-together-monsoon-umbrella","title":"AI Photo Prompt for Boy and Girl Together (Monsoon Umbrella)","note":"Monsoon street under one umbrella, candid laughing moment","description":"An AI photo prompt for boy and girl together: sharing one umbrella on a rainy monsoon street, laughing candidly, made from two photos.","categorySlug":"cinematic","subject":"Group","intent":"Full scene transformation","requirement":"Two photos","tool":"ChatGPT Image","height":340,"saved":4,"status":"published","targetSourcePhoto":"Two clear photos (boy, then girl) or one photo of you both","bestSourcePhoto":["One clear photo per person, or one photo of you both","Faces large and sharp, no sunglasses","Similar light in both photos","Original images should not be blurry"],"changes":["Monsoon street","One shared umbrella","Rain-ready outfits","Candid laughing pose"],"stays":["Both faces and identities","Each skin tone and age","Hairstyles, beards, head coverings","Realistic relative heights"],"beforeFile":"ai-photo-prompt-for-boy-and-girl-together-monsoon-umbrella-before.webp","afterFile":"ai-photo-prompt-for-boy-and-girl-together-monsoon-umbrella-after.webp","altSource":"South Asian man with short wavy hair and stubble in a white shirt, smiling on a busy shop-lined street.","altResult":"Realistic monsoon photo of the same couple laughing under one black umbrella he holds, he in a denim shirt, she in a sage-green kurti and white dupatta, on a rain-soaked street with trees and blurred shop signs.","variant":{"id":"ai-photo-prompt-for-boy-and-girl-together-monsoon-umbrella-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["first photo","second photo"],"version":"1.0.0","template":"Combine the first uploaded photo and the second uploaded photo into one {{subject}} image: a boy and girl together under one umbrella on a monsoon street. The first uploaded photo shows person A (the boy) and the second uploaded photo shows person B (the girl); if one photo already shows both people, use it for both. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: same face shape, features, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. Dress them in modest casual rain-day outfits: a light denim shirt for him and a plain cotton kurti with a light dupatta for her; keep any head covering. If group arrangement and pose are not preserved, show them walking close together under one plain black umbrella that he holds, both laughing candidly as raindrops fall around them. Keep realistic relative heights and natural, modest, family-friendly body language. Light both with the same soft overcast daylight and glistening rain reflections. Apply {{mood}} color grading. Use {{background}} as the backdrop. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Fresh monsoon","background":"Rainy monsoon street with wet road reflections, green trees, and small shops with plain signboards","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]},"beforeBFile":"ai-photo-prompt-for-boy-and-girl-together-monsoon-umbrella-before-b.webp","altSecond":"South Asian woman with a side braid and a white dupatta over her head in a mint-green kurti, smiling on a shop-lined street."},{"n":"134","id":"realistic-ai-photo-prompt-for-boys-golden-hour-field","title":"Realistic AI Photo Prompt for Boys (Golden Hour Field)","note":"Natural golden-hour field portrait that keeps your real face and hairstyle","description":"A realistic AI photo prompt for boys: a natural golden-hour portrait in an open field with true skin texture, keeping your real face and hairstyle.","categorySlug":"cinematic","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":3,"status":"published","targetSourcePhoto":"One clear chest-up or waist-up photo of a boy or young man","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Golden-hour light","Open field","Simple linen shirt","Natural relaxed pose"],"stays":["Face and identity","Skin tone","Hairstyle and beard","Glasses if worn"],"beforeFile":"realistic-ai-photo-prompt-for-boys-golden-hour-field-before.webp","afterFile":"realistic-ai-photo-prompt-for-boys-golden-hour-field-after.webp","altSource":"South Asian teenage boy with thick straight black hair and a fringe in a sky-blue t-shirt, smiling in a backyard.","altResult":"Realistic golden-hour photo of the same boy in an off-white linen shirt with rolled sleeves and khaki trousers, smiling in a field of tall golden grass.","variant":{"id":"realistic-ai-photo-prompt-for-boys-golden-hour-field-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded portrait into a natural, realistic golden-hour portrait in an open field. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. Keep the person exactly recognizable as the uploaded person: same face shape, eyes, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone; do not lighten the skin, change ethnicity, de-age, age up, slim, beautify, or replace the face. Make it a realistic high-resolution photograph with natural skin texture, true-to-life fabric detail, and believable depth of field. If clothing is not preserved, dress them in a plain off-white linen shirt with the sleeves rolled up and khaki trousers. If pose is not preserved, show him standing in the tall grass, hands relaxed, looking at the camera with a natural smile. Light him with low warm golden-hour sun from the side and gentle fill; keep real skin texture, pores and his exact hairstyle with no smoothing or beautifying. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, watermarks, number plates, brand names, badges, or logos on clothing, vehicles, or anywhere in the frame; keep clothing modest and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Natural golden hour","background":"Open wheat field at golden hour with tall grass and a soft warm sky","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}}]};

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
