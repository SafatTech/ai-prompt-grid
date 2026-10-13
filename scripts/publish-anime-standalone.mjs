/**
 * Publish the 12 anime catalog styles, their public images, and the guide social image.
 *
 * Uses @supabase/supabase-js, the ws package (Node 20 has no global WebSocket),
 * and Node built-ins. Does not import the repo.
 *
 *   NEXT_PUBLIC_SUPABASE_URL=https://....supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=... \
 *   node scripts/publish-anime-standalone.mjs /path/to/anime-ai-photo-prompts/webp
 *
 * The folder must contain before/<slug>-before.webp and after/<slug>-after.webp.
 * The merge style (#10 / cherry-blossom) also needs before/<slug>-before-b.webp.
 * The 1200x630 guide image is read from scripts/assets/anime-ai-photo-prompts-og.webp
 * and uploaded to seed/catalog/editorial/anime-ai-photo-prompts-og.webp.
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
const DATA = {"provenance":{"source":"seed","licence":"catalog","modelRelease":false,"notes":"Before photos are AI-generated, not real people. The after image is an AI edit of those sources."},"og":{"file":"anime-ai-photo-prompts-og.webp","key":"seed/catalog/editorial/anime-ai-photo-prompts-og.webp","alt":"Anime-style illustration of four friends seated on a rooftop ledge with fairy lights, city skyline and a vivid orange sunset."},"styles":[{"n":"99","id":"anime-girl-ai-photo-prompt-gemini-meadow","title":"Anime Girl AI Photo Prompt for Gemini (Meadow)","note":"Soft hand-painted film-style girl in a windy meadow","description":"Turn your photo into an anime girl in a soft hand-painted film style, standing in a breezy summer meadow with fluffy clouds, keeping your real face.","categorySlug":"anime","subject":"Person","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":14,"status":"published","targetSourcePhoto":"One clear chest-up or waist-up photo of a girl or woman","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Hand-painted anime film style","Light summer dress and cardigan","Breezy meadow and clouds","Wind-swept hair pose"],"stays":["Face and identity","Skin tone","Hairstyle or head covering","Glasses if worn"],"beforeFile":"anime-girl-ai-photo-prompt-gemini-meadow-before.webp","afterFile":"anime-girl-ai-photo-prompt-gemini-meadow-after.webp","altSource":"Young woman with long dark wavy hair in a blue-and-white floral midi dress, blue cardigan and white sneakers on a grassy hillside with a bare tree.","altResult":"Painted anime-style illustration of the same woman in a blue floral dress and blue cardigan, hair blowing, on a sunlit golden meadow with a bare tree and hills.","variant":{"id":"anime-girl-ai-photo-prompt-gemini-meadow-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Transform the uploaded portrait into a gentle anime film still of a girl in a summer meadow. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. The anime version must stay clearly recognizable as the uploaded person: keep their face shape, eye shape, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style; do not lighten the skin, change ethnicity, de-age, slim, or replace the face with a generic anime face. Render it as a soft hand-painted animated film frame with watercolor-like backgrounds, gentle linework, and warm painterly shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. If clothing is not preserved, dress them in a modest light cotton sundress with a soft knit cardigan; keep any existing head covering. If pose is not preserved, show her standing in the grass with a soft breeze lifting her hair and clothes, one hand holding her hair, smiling toward the camera. Light her with warm afternoon sunlight and soft cloud shadows. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style with clean line edges around hair and clothing. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Soft warm peaceful","background":"Grassy hillside meadow with tall wild grass, a bare tree, and a cloudy sky","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"100","id":"anime-boy-ai-photo-prompt-gemini-power-aura","title":"Anime Boy AI Photo Prompt for Gemini (Power Aura)","note":"Action-genre anime hero with a glowing energy aura","description":"A prompt for a Gemini AI boy anime look: you as an action anime hero with a glowing energy aura, wind-blown hair and speed lines.","categorySlug":"anime","subject":"Person","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":13,"status":"published","targetSourcePhoto":"One clear chest-up or waist-up photo of a boy or man","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Action anime style","Plain jacket over a training tee","Glowing energy aura","Power-up stance"],"stays":["Face and identity","Skin tone","Hairstyle and beard","Glasses if worn"],"beforeFile":"anime-boy-ai-photo-prompt-gemini-power-aura-before.webp","afterFile":"anime-boy-ai-photo-prompt-gemini-power-aura-after.webp","altSource":"Young man with dark wavy hair and light stubble in a black jacket, grey tee and olive cargo pants on a city rooftop at orange sunset.","altResult":"Action anime illustration of the same man, low angle, fists clenched, in black jacket, grey tee, cargo pants and wrist wraps, blue energy aura and flying debris at sunset.","variant":{"id":"anime-boy-ai-photo-prompt-gemini-power-aura-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Transform the uploaded portrait into an epic action anime hero portrait. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. The anime version must stay clearly recognizable as the uploaded person: keep their face shape, eye shape, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style; do not lighten the skin, change ethnicity, de-age, slim, or replace the face with a generic anime face. Render it in a bold action-genre anime style with dynamic linework, sharp cel shading, and speed lines. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. If clothing is not preserved, dress them in a plain open jacket over a training t-shirt and cargo pants, with simple wrist wraps. If pose is not preserved, show him in a confident power-up stance, fists clenched at his sides, hair and jacket blown by the energy, looking determined at the camera. Surround him with a glowing blue-white energy aura and rim light, with small sparks and speed lines in the air. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style with clean line edges around hair and clothing. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Vibrant cinematic","background":"Dramatic anime rooftop at sunset with swirling clouds, glowing energy sparks, and a distant city skyline","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"101","id":"rooftop-sunset-anime-friends-ai-photo-prompt","title":"Rooftop Sunset Anime Friends AI Photo Prompt","note":"Your friend group hanging out on a sunset rooftop, anime style","description":"A copy-paste anime friends prompt for Gemini: turn one group photo into a warm anime scene of friends on a city rooftop at sunset.","categorySlug":"anime","subject":"Group","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":12,"status":"published","targetSourcePhoto":"One group photo of 2–5 friends with every face clearly visible","bestSourcePhoto":["Every face clearly visible in one photo","Everyone facing the camera, not hidden behind others","Even light on all faces","Original image should not be blurry"],"changes":["Cel-shaded anime style","Rooftop at sunset","String lights","Relaxed hangout pose"],"stays":["Every face and identity","Each skin tone","Hairstyles, beards, head coverings","Relative heights"],"beforeFile":"rooftop-sunset-anime-friends-ai-photo-prompt-before.webp","afterFile":"rooftop-sunset-anime-friends-ai-photo-prompt-after.webp","altSource":"Four young friends, two men and two women, in jeans, hoodie, black shirt and embroidered white top, sitting on a rooftop ledge with string lights at orange sunset.","altResult":"Anime-style illustration of the same four friends in the same outfits seated on a rooftop ledge with fairy lights, city skyline and a vivid orange sunset.","variant":{"id":"rooftop-sunset-anime-friends-ai-photo-prompt-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Transform the uploaded group photo into a warm anime scene of friends on a rooftop at sunset. Use every person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve the {{preserve}}. Each anime character must stay clearly recognizable as the matching person in the source: keep each face shape, eye shape, nose, lips, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face with a generic anime face. Render it in clean cel-shaded anime style with crisp linework, flat color fills, and simple two-tone shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. Keep everyone's own outfits, simplified into clean anime clothing, keeping any head covering or dupatta. If group arrangement and pose are not preserved, arrange them leaning on the railing and sitting on its ledge side by side, laughing together and looking toward the camera. Light everyone with the same warm low sunset light from one side, soft string-light glow, and matching cel shadows. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping any face.","defaults":{"mood":"Luminous golden-hour warmth","background":"Anime city rooftop at sunset with a low railing, warm string lights, and an orange sky over distant buildings","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"102","id":"cute-chibi-ai-photo-prompt-girls-sticker","title":"Cute Chibi AI Photo Prompt for Girls (Sticker)","note":"Big-head chibi sticker with a white die-cut border","description":"A viral cute chibi AI photo prompt for girls: turn your photo into a big-eyed chibi sticker with a white die-cut outline and pastel sparkles.","categorySlug":"anime","subject":"Person","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":320,"saved":11,"status":"published","targetSourcePhoto":"One clear chest-up photo of a girl or woman","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Chibi proportions","White die-cut sticker outline","Pastel sparkles","Cheerful waving pose"],"stays":["Face features and identity","Skin tone","Hairstyle or head covering","Outfit colors (if kept)"],"beforeFile":"cute-chibi-ai-photo-prompt-girls-sticker-before.webp","afterFile":"cute-chibi-ai-photo-prompt-girls-sticker-after.webp","altSource":"Smiling young woman with long dark hair in a pink hoodie and floral ruffled mini skirt, holding a phone with a black shoulder bag on a sunny sidewalk.","altResult":"Chibi sticker of the same woman waving in a pink hoodie, floral skirt and white sneakers with a black bag, white die-cut border, hearts and sparkles on pink.","variant":{"id":"cute-chibi-ai-photo-prompt-girls-sticker-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Transform the uploaded portrait into a cute chibi sticker portrait. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. The anime version must stay clearly recognizable as the uploaded person: keep their face shape, eye shape, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style; do not lighten the skin, change ethnicity, de-age, slim, or replace the face with a generic anime face. Render it as a cute chibi character with a big head, small body, large expressive eyes that keep the person's real eye shape, thick clean outlines, and soft glossy shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. If clothing is not preserved, dress them in a cute simplified version of a pastel hoodie and skirt; keep any existing head covering. If pose is not preserved, show the full chibi body standing and waving with a big happy smile and a small head tilt. Use soft even light with small glossy highlights on the hair and eyes, and add a thick white die-cut sticker outline around the character. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style with clean line edges around hair and clothing. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Soft pastel","background":"Plain soft pastel backdrop with tiny sparkles and hearts around a white die-cut sticker border","ratio":"1:1 Square","keepClothing":true,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"103","id":"rainy-night-street-anime-boy-ai-photo-prompt","title":"Rainy Night Street Anime Boy AI Photo Prompt","note":"Moody anime boy under an umbrella on a neon-wet street","description":"A moody anime style AI photo prompt: turn your photo into an anime boy holding a clear umbrella on a rainy city street with neon reflections.","categorySlug":"anime","subject":"Person","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":360,"saved":10,"status":"published","targetSourcePhoto":"One clear waist-up photo of a boy or man","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Moody cel-shaded anime style","Dark coat and hoodie","Rainy neon street","Clear umbrella pose"],"stays":["Face and identity","Skin tone","Hairstyle and beard","Glasses if worn"],"beforeFile":"rainy-night-street-anime-boy-ai-photo-prompt-before.webp","afterFile":"rainy-night-street-anime-boy-ai-photo-prompt-after.webp","altSource":"Young man with dark hair in a grey hoodie and long black coat holding a clear umbrella on a wet city street at night with pink and blue neon reflections.","altResult":"Neon anime illustration of the same man in grey hoodie and black coat under a clear umbrella on a rainy night street glowing with pink and blue city lights.","variant":{"id":"rainy-night-street-anime-boy-ai-photo-prompt-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Transform the uploaded portrait into a moody anime night scene of a boy in the rain. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. The anime version must stay clearly recognizable as the uploaded person: keep their face shape, eye shape, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style; do not lighten the skin, change ethnicity, de-age, slim, or replace the face with a generic anime face. Render it in clean cel-shaded anime style with crisp linework, flat color fills, and simple two-tone shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. If clothing is not preserved, dress them in a plain dark long coat over a grey hoodie, with the hood down. If pose is not preserved, show him standing under a clear umbrella, looking slightly off to the side with a calm, thoughtful expression. Light him with cool blue and magenta reflected glow from the street, with rain streaks and puddle reflections. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style with clean line edges around hair and clothing. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Moody cinematic","background":"Rainy anime city street at night with glowing signs without readable text, wet pavement reflections, and falling rain","ratio":"9:16 Story","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"104","id":"cherry-blossom-anime-couple-prompt-gemini","title":"Cherry Blossom Anime Couple Prompt for Gemini","note":"Two separate photos, one anime couple under blossom trees","description":"A couple anime prompt for Gemini AI: merge two photos into one soft anime scene of a couple walking under pink blossom trees.","categorySlug":"anime","subject":"Group","intent":"Full scene transformation","requirement":"Two photos","tool":"ChatGPT Image","height":340,"saved":9,"status":"published","targetSourcePhoto":"Two separate photos uploaded together: person A first, person B second","bestSourcePhoto":["One person per photo, face large and sharp","Similar light in all photos","Similar head angle and framing, ideally chest-up","Original images should not be blurry"],"changes":["Both people in one anime scene","Soft painted anime style","Blossom-lined path","Walking side by side"],"stays":["Person A's face from photo 1","Person B's face from photo 2","Each skin tone","Any head covering"],"beforeFile":"cherry-blossom-anime-couple-prompt-gemini-before.webp","afterFile":"cherry-blossom-anime-couple-prompt-gemini-after.webp","beforeBFile":"cherry-blossom-anime-couple-prompt-gemini-before-b.webp","altSource":"Young man with dark hair in an open sage-green shirt over a white tee and beige trousers on a cherry-blossom park path by a lake.","altResult":"Soft anime-style illustration of the man and woman arm in arm, sage shirt and cream kurta with pink dupatta, under cherry blossoms by a lake with falling petals.","altSecond":"Young woman with long dark hair in a cream floral-embroidered kurta and pink dupatta on a cherry-blossom path with a lamppost.","variant":{"id":"cherry-blossom-anime-couple-prompt-gemini-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["first photo","second photo"],"version":"1.0.0","template":"Merge the first uploaded photo and the second uploaded photo into one {{subject}} anime illustration of a couple under cherry blossom trees. The first uploaded photo shows person A and the second uploaded photo shows person B. Follow the selected source-preservation settings: preserve the {{preserve}}. Keep person A recognizable from the first uploaded photo and person B from the second uploaded photo: preserve each face shape, eye shape, nose, lips, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face with a generic anime face. Render it as a soft hand-painted animated film frame with watercolor-like backgrounds, gentle linework, and warm painterly shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. Draw both in modest, plain spring outfits based on their own clothes, keeping any head covering or dupatta. If group arrangement and pose are not preserved, show them walking side by side on the path, holding hands and smiling at each other, at realistic relative heights. Light both with the same soft spring sunlight and drifting petals so they look drawn in one scene. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping any face.","defaults":{"mood":"Bright dreamy pastel spring with soft blush pinks, creamy whites, fresh botanical greens, warm natural skin tones, and airy luminous highlights","background":"Anime park path lined with pink cherry blossom trees, falling petals, and a soft blue sky","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"105","id":"pastel-anime-college-girl-ai-photo-prompt","title":"Pastel Anime College Girl AI Photo Prompt","note":"Aesthetic pastel college-campus portrait with drifting blossom petals","description":"An aesthetic anime AI photo prompt for ChatGPT or Gemini: you as a pastel anime college student on a sunny campus with drifting petals.","categorySlug":"anime","subject":"Person","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":8,"status":"published","targetSourcePhoto":"One clear chest-up or waist-up photo of an adult woman","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Pastel anime style","Casual college outfit with tote bag","Sunny college campus","Drifting petals"],"stays":["Face and identity","Skin tone","Hairstyle or head covering","Glasses if worn"],"beforeFile":"pastel-anime-college-girl-ai-photo-prompt-before.webp","afterFile":"pastel-anime-college-girl-ai-photo-prompt-after.webp","altSource":"Young woman with long dark hair in a beige cardigan, white top and sage floral skirt, holding books with a canvas tote on a brick college campus path.","altResult":"Soft pastel anime-style illustration of the same woman with books and tote in a beige cardigan and sage skirt on a campus path under pink blossoms.","variant":{"id":"pastel-anime-college-girl-ai-photo-prompt-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Transform the uploaded portrait into an aesthetic pastel anime portrait of an adult college student on campus. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. The anime version must stay clearly recognizable as the uploaded person: keep their face shape, eye shape, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style; do not lighten the skin, change ethnicity, de-age, slim, or replace the face with a generic anime face. Render it in clean cel-shaded anime style with crisp linework, flat color fills, and simple two-tone shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. If clothing is not preserved, dress them in a modest casual college outfit: a soft beige cardigan over a plain blouse, a long skirt or loose trousers, and a plain canvas tote bag with no text; keep any existing head covering. If pose is not preserved, show her walking along the campus path holding a few books against her chest, smiling softly at the camera. Light her with bright spring sunlight, soft rim light on her hair, and a few blossom petals floating past. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style with clean line edges around hair and clothing. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Bright dreamy pastel spring with soft blush pinks, creamy whites, fresh botanical greens, warm natural skin tones, and airy luminous highlights","background":"Sunlit anime college campus with brick buildings, blossom trees, a wide path, and pink petals drifting in the air","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"106","id":"anime-cricket-hero-boy-ai-photo-prompt","title":"Anime Cricket Hero Boy AI Photo Prompt","note":"Action anime cricketer mid-shot on a sunny ground","description":"A boy anime AI photo prompt for cricket fans: you as an action anime cricket hero in plain whites, swinging a bat on a sunlit ground.","categorySlug":"anime","subject":"Person","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":7,"status":"published","targetSourcePhoto":"One clear chest-up or waist-up photo of a boy or man","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Action anime style","Plain generic cricket kit","Sunlit cricket ground","Big batting shot pose"],"stays":["Face and identity","Skin tone","Hairstyle and beard","Glasses if worn"],"beforeFile":"anime-cricket-hero-boy-ai-photo-prompt-before.webp","afterFile":"anime-cricket-hero-boy-ai-photo-prompt-after.webp","altSource":"Smiling young man with dark hair in white cricket kit, pads and gloves, holding a bat and dark helmet on a sunny cricket ground by the boundary rope.","altResult":"Dynamic anime illustration of the same man in white cricket kit and pads swinging a bat at a red ball, speed lines, green field and stands under blue sky.","variant":{"id":"anime-cricket-hero-boy-ai-photo-prompt-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Transform the uploaded portrait into an action anime cricket hero portrait. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. The anime version must stay clearly recognizable as the uploaded person: keep their face shape, eye shape, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style; do not lighten the skin, change ethnicity, de-age, slim, or replace the face with a generic anime face. Render it in a bold action-genre anime style with dynamic linework, sharp cel shading, and speed lines. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. If clothing is not preserved, dress them in a plain generic cricket kit: plain white or single-color shirt and trousers, plain pads and gloves, and a plain helmet held or worn with the face fully visible, with no team logos, crests, sponsor marks, names, or numbers. If pose is not preserved, show him mid-swing playing a powerful batting shot with a plain unbranded bat, eyes on the ball, with a determined expression. Light him with bright midday sun, sharp cel shadows, speed lines behind the bat, and a small motion trail on the ball. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style with clean line edges around hair and clothing. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Vibrant cinematic","background":"Sunlit anime cricket ground with a green outfield, white boundary rope, and a softly blurred empty stand","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"107","id":"viral-chibi-friends-ai-prompt-sticker-sheet","title":"Viral Chibi Friends AI Prompt (Sticker Sheet)","note":"One friends photo turned into a chibi sticker sheet","description":"A viral chibi AI prompt: turn one friends group photo into a cute chibi sticker sheet, each friend in their own die-cut sticker pose.","categorySlug":"anime","subject":"Group","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":320,"saved":6,"status":"published","targetSourcePhoto":"One group photo of 2–4 friends with every face clearly visible","bestSourcePhoto":["Every face clearly visible in one photo","Everyone facing the camera, not hidden behind others","Even light on all faces","Original image should not be blurry"],"changes":["Every friend as a chibi","Die-cut sticker sheet layout","Different fun poses","Pastel sparkles"],"stays":["Every face and identity","Each skin tone","Hairstyles, beards, head coverings","Outfit colors"],"beforeFile":"viral-chibi-friends-ai-prompt-sticker-sheet-before.webp","afterFile":"viral-chibi-friends-ai-prompt-sticker-sheet-after.webp","altSource":"Selfie of a young man in a black shirt over a white tee and two young women in white-and-blue and black embroidered kurtas against a peach wall with bougainvillea.","altResult":"Chibi sticker sheet of the same three friends: thumbs-up, chin-in-hands, heart hands and a group hug, white die-cut borders with hearts and sparkles on pink.","variant":{"id":"viral-chibi-friends-ai-prompt-sticker-sheet-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Transform the uploaded group photo into a cute chibi sticker sheet of a friend group. Use every person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve the {{preserve}}. Each anime character must stay clearly recognizable as the matching person in the source: keep each face shape, eye shape, nose, lips, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face with a generic anime face. Render it as a cute chibi character with a big head, small body, large expressive eyes that keep the person's real eye shape, thick clean outlines, and soft glossy shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. Draw each friend in a cute simplified version of their own outfit, keeping any head covering or dupatta. If group arrangement and pose are not preserved, lay them out as one sticker sheet with one sticker per friend in a different fun pose (waving, heart hands, thumbs-up), plus one small sticker of everyone hugging, each with a thick white die-cut outline. Use the same soft even light and glossy highlights on every sticker. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping any face.","defaults":{"mood":"Cozy playful","background":"Plain soft pastel backdrop with tiny sparkles and hearts around a white die-cut sticker border","ratio":"1:1 Square","keepClothing":true,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"108","id":"anime-character-ai-photo-prompt-in-saree-or-lehenga","title":"Anime Character AI Photo Prompt in Saree or Lehenga","note":"Cel-shaded anime heroine in traditional South Asian dress","description":"A Gemini AI photo prompt for an anime character: turn your photo into a cel-shaded anime girl in a saree or lehenga with soft festive lights.","categorySlug":"anime","subject":"Person","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":5,"status":"published","targetSourcePhoto":"One clear waist-up photo of a girl or woman, ideally in traditional dress","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Cel-shaded anime style","Saree or lehenga drawn in anime style","Lantern-lit courtyard","Graceful standing pose"],"stays":["Face and identity","Skin tone","Hairstyle, dupatta or head covering","Jewelry style"],"beforeFile":"anime-character-ai-photo-prompt-in-saree-or-lehenga-before.webp","afterFile":"anime-character-ai-photo-prompt-in-saree-or-lehenga-after.webp","altSource":"Young woman with long dark hair in a cream saree with gold sequin border and gold bangles, in a lantern-lit palace courtyard with marigold garlands.","altResult":"Warm painted anime-style illustration of the same woman in a gold-embroidered cream saree in a glowing courtyard with marigolds, lanterns and pink petals.","variant":{"id":"anime-character-ai-photo-prompt-in-saree-or-lehenga-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Transform the uploaded portrait into a cel-shaded anime heroine portrait in traditional South Asian dress. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. The anime version must stay clearly recognizable as the uploaded person: keep their face shape, eye shape, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style; do not lighten the skin, change ethnicity, de-age, slim, or replace the face with a generic anime face. Render it in clean cel-shaded anime style with crisp linework, flat color fills, and simple two-tone shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. If clothing is not preserved, dress them in an elegant, modest silk saree or lehenga with a dupatta, delicate gold borders, and simple bangles; keep any existing head covering. If pose is not preserved, show her standing in three-quarter view, one hand holding the edge of the dupatta, smiling warmly at the camera. Light her with warm lantern glow from one side and soft dusk sky light from behind. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style with clean line edges around hair and clothing. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Warm festive cel-shaded glow with saffron, magenta, and gold accents and soft evening highlights","background":"Anime courtyard at dusk with carved arches, hanging marigold garlands, and glowing lanterns","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"109","id":"trending-anime-boy-ai-photo-prompt-hoodie-bike","title":"Trending Anime Boy AI Photo Prompt (Hoodie & Bike)","note":"Hoodie, bicycle and a sunset street, trending anime aesthetic","description":"A trending AI photo prompt for anime: you as an anime boy in an oversized hoodie leaning on a bicycle on a quiet sunset street.","categorySlug":"anime","subject":"Person","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":4,"status":"published","targetSourcePhoto":"One clear waist-up photo of a boy or man","bestSourcePhoto":["One person, face clearly visible and sharp","Front or slight three-quarter angle works best","Even daylight, no beauty filters","Original image should not be blurry"],"changes":["Cel-shaded anime style","Oversized hoodie and headphones","Plain bicycle","Golden-hour street"],"stays":["Face and identity","Skin tone","Hairstyle and beard","Glasses if worn"],"beforeFile":"trending-anime-boy-ai-photo-prompt-hoodie-bike-before.webp","afterFile":"trending-anime-boy-ai-photo-prompt-hoodie-bike-after.webp","altSource":"Young man with curly dark hair in a dark brown hoodie, headphones around neck, olive pants and white sneakers leaning on a black bicycle in a street at sunset.","altResult":"Painted anime-style illustration of the same man in brown hoodie and headphones leaning on a black bicycle on a sunset street with flowering trees and power lines.","variant":{"id":"trending-anime-boy-ai-photo-prompt-hoodie-bike-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Transform the uploaded portrait into a trending aesthetic anime portrait of a boy with a bicycle. Use the main person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve their {{preserve}}. The anime version must stay clearly recognizable as the uploaded person: keep their face shape, eye shape, nose, lips, eyebrows, hairstyle and hairline, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style; do not lighten the skin, change ethnicity, de-age, slim, or replace the face with a generic anime face. Render it in clean cel-shaded anime style with crisp linework, flat color fills, and simple two-tone shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. If clothing is not preserved, dress them in an oversized plain hoodie, loose trousers, sneakers, and plain headphones around his neck, all without logos. If pose is not preserved, show him leaning on a plain unbranded bicycle with one foot on the ground, smiling slightly at the camera. Light him with warm low sunset light from behind, a soft rim glow on his hair, and long gentle shadows. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style with clean line edges around hair and clothing. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping important facial features.","defaults":{"mood":"Luminous golden-hour warmth","background":"Quiet anime neighborhood street at golden hour with power lines, small houses, and a glowing sunset sky","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"110","id":"turn-photo-into-anime-countryside-family-ai-prompt","title":"Turn Photo into Anime: Countryside Family AI Prompt","note":"Whole group photo turned into a hand-painted countryside film scene","description":"Turn one family or friends photo into anime with this AI prompt: a hand-painted film scene on a green countryside hill with soft summer clouds.","categorySlug":"anime","subject":"Group","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":3,"status":"published","targetSourcePhoto":"One family or friends photo of 2–6 people with every face visible","bestSourcePhoto":["Every face clearly visible in one photo","Everyone facing the camera, not hidden behind others","Even light on all faces","Original image should not be blurry"],"changes":["Hand-painted anime film style","Green countryside hill","Picnic blanket scene","Relaxed group pose"],"stays":["Every face and identity","Each skin tone and age","Hairstyles, beards, head coverings","Relative heights"],"beforeFile":"turn-photo-into-anime-countryside-family-ai-prompt-before.webp","afterFile":"turn-photo-into-anime-countryside-family-ai-prompt-after.webp","altSource":"Family of four on a blanket in a green hillside meadow: grey-haired grandmother and woman in floral outfits, teen girl in green tee and jeans, man in navy polo.","altResult":"Cel-shaded anime illustration of a family of four on a white picnic blanket in a sunny meadow: a dark-haired woman in a pink floral dress with a coral dupatta, a silver-haired grandmother in a cream floral outfit, a long-haired teen girl in an olive tee and light-blue jeans, and a bearded man in a navy polo and beige shorts, under a leafy tree with rolling green hills, distant blue mountains and a bright cloud-dotted sky.","variant":{"id":"turn-photo-into-anime-countryside-family-ai-prompt-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Transform the uploaded group photo into a peaceful hand-painted anime countryside scene of a family or friends. Use every person in the source image as the {{subject}}. Follow the selected source-preservation settings: preserve the {{preserve}}. Each anime character must stay clearly recognizable as the matching person in the source: keep each face shape, eye shape, nose, lips, hairstyle, hair color, any beard, glasses, or head covering, apparent age, and exact skin tone, translated faithfully into anime style. Treat them as separate people; do not blend, swap, lighten, de-age, or replace any face with a generic anime face. Render it as a soft hand-painted animated film frame with watercolor-like backgrounds, gentle linework, and warm painterly shading. Use an original, generic anime illustration style; do not imitate any specific studio, artist, series, or existing character. Keep everyone's own outfits, simplified into soft painted anime clothing, keeping any head covering or dupatta. If group arrangement and pose are not preserved, seat them together on a plain picnic blanket on a grassy hill, the eldest in the middle, everyone smiling and looking toward the camera. Light everyone with the same warm summer sunlight and soft drifting cloud shadows. Apply {{mood}} color grading. Replace the background with {{background}}, drawn in the same anime style. Do not add extra people, text, lettering, watermarks, brand names, or logos; keep clothing modest, plain, and unbranded. Compose for {{ratio}} without cropping any face.","defaults":{"mood":"Fresh natural green","background":"Sunlit anime countryside with green fields, trees, distant hills, soft clouds, wildflowers and gentle atmospheric depth","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}}]};

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
