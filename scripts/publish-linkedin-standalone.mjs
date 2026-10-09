/**
 * Publish the 15 LinkedIn / CV headshot catalog styles, their public images,
 * and the guide social image.
 *
 * Uses @supabase/supabase-js, the ws package (Node 20 has no global WebSocket),
 * and Node built-ins. Does not import the repo.
 *
 *   NEXT_PUBLIC_SUPABASE_URL=https://....supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=... \
 *   node scripts/publish-linkedin-standalone.mjs /path/to/gemini-headshot-cv-photo-prompts
 *
 * The folder must contain before/<slug>-before.webp and after/<slug>-after.webp.
 * Five after files were regenerated: charcoal-suit, cv-photo, clean-up,
 * modern-office and outdoor. Use those WebPs, not the first tarball versions.
 * Matching team also uploads before/<slug>-before-b.webp and
 * after/<slug>-after-b.webp to source-70b.webp and result-70b.webp.
 * The 1200x630 guide image is read from scripts/assets/linkedin-headshot-og.webp
 * and uploaded to seed/catalog/editorial/linkedin-headshot-og.webp.
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
const CATEGORY_SLUG = "professional-portraits";
const DATA = {"provenance":{"source":"seed","licence":"catalog","modelRelease":false,"notes":"Before photo is an AI-generated person, not a real person. After image is an AI edit of that source."},"og":{"file":"linkedin-headshot-og.webp","key":"seed/catalog/editorial/linkedin-headshot-og.webp"},"styles":[{"n":"60","id":"navy-blazer-linkedin-profile-picture-prompt-gemini","title":"Navy Blazer LinkedIn Profile Picture Prompt for Gemini (Men & Women)","note":"Navy blazer, white shirt, light-grey studio","description":"Turn a casual selfie into a classic LinkedIn profile picture with a navy blazer, white shirt, and a soft light-grey studio backdrop, keeping your face unchanged.","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":30,"status":"published","targetSourcePhoto":"One recent, front-facing head-and-shoulders photo in even light","bestSourcePhoto":["Face the camera, eyes visible","Even daylight, no harsh shadows","No sunglasses or other people","Original image should not be blurry"],"changes":["Navy blazer and white shirt","Light-grey studio backdrop","Soft even studio light"],"stays":["Face and identity","Skin tone","Hairstyle","Expression"],"beforeFile":"navy-blazer-linkedin-profile-picture-prompt-gemini-before.webp","afterFile":"navy-blazer-linkedin-profile-picture-prompt-gemini-after.webp","altSource":"Man with wavy hair and a short beard in an untucked white shirt and navy trousers, in a living room with a TV, sofa and plants.","altResult":"Man in a navy blazer over a white shirt, light-grey studio.","variant":{"id":"navy-blazer-linkedin-profile-picture-prompt-gemini-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a professional LinkedIn headshot with flattering soft studio light and sharp focus on the eyes. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a well-fitted navy blazer over a plain white shirt. If pose is not preserved, use straight head-and-shoulders framing facing the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading with soft, even light. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Bright neutral","background":"Soft evenly lit light-grey studio backdrop","ratio":"1:1 Square","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"61","id":"charcoal-suit-corporate-linkedin-profile-picture-prompt-gemini-men","title":"Charcoal Suit Corporate LinkedIn Profile Picture Prompt for Gemini (Men)","note":"Coat pant, light blue shirt, dark tie","description":"Turn a portrait into a corporate headshot for men in a charcoal two-piece suit (coat pant), light blue shirt, and dark tie, with soft front-left studio light.","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":350,"saved":29,"status":"published","targetSourcePhoto":"One clear head-and-shoulders photo with the face large and sharp","bestSourcePhoto":["Face fully visible","Neutral or slight smile","Beard and hair as you wear them day to day","Original image should not be blurry"],"changes":["Charcoal suit, blue shirt, and tie","Blurred neutral grey backdrop","Soft front-left studio light"],"stays":["Face and identity","Beard or moustache","Hairline","Skin tone and texture"],"beforeFile":"charcoal-suit-corporate-linkedin-profile-picture-prompt-gemini-men-before.webp","afterFile":"charcoal-suit-corporate-linkedin-profile-picture-prompt-gemini-men-after.webp","altSource":"Man with curly hair and a salt-and-pepper beard in an olive polo, at an office desk with a monitor.","altResult":"Man in a charcoal suit, light-blue shirt and dark plain tie, blurred grey backdrop.","variant":{"id":"charcoal-suit-corporate-linkedin-profile-picture-prompt-gemini-men-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a corporate headshot with soft studio light from the front left, no harsh shadows, and sharp eyes. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a well-fitted charcoal grey two-piece suit with a light blue shirt and a dark plain tie. If pose is not preserved, use head-and-shoulders framing at a slight angle to the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Bright neutral","background":"Soft out-of-focus neutral grey studio backdrop","ratio":"1:1 Square","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"62","id":"black-blazer-linkedin-profile-picture-prompt-gemini-women","title":"Black Blazer LinkedIn Profile Picture Prompt for Gemini (Women)","note":"Black blazer, cream high-neck top, beige studio","description":"Turn a portrait into a polished LinkedIn profile picture for women with a tailored black blazer, cream high-neck top, light natural makeup, and a soft beige backdrop.","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":28,"status":"published","targetSourcePhoto":"One recent, front-facing head-and-shoulders photo","bestSourcePhoto":["Face visible, no sunglasses","Even window light","Hair styled as you usually wear it","Original image should not be blurry"],"changes":["Black blazer and cream top","Soft beige backdrop","Gentle even light"],"stays":["Face and identity","Skin tone","Hairstyle","Expression"],"beforeFile":"black-blazer-linkedin-profile-picture-prompt-gemini-women-before.webp","afterFile":"black-blazer-linkedin-profile-picture-prompt-gemini-women-after.webp","altSource":"Woman with long wavy hair in a pink and white floral kurta, in a kitchen.","altResult":"Woman in a black blazer over a cream high-neck top, beige backdrop.","variant":{"id":"black-blazer-linkedin-profile-picture-prompt-gemini-women-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a professional LinkedIn headshot with gentle even light and light, natural makeup only. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a tailored black blazer over a cream high-neck top. If pose is not preserved, use straight head-and-shoulders framing facing the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Warm neutral","background":"Soft beige studio backdrop","ratio":"1:1 Square","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"63","id":"hijab-office-linkedin-profile-picture-prompt-gemini-women","title":"Hijab Office LinkedIn Profile Picture Prompt for Gemini (Women)","note":"Dusty-rose hijab, navy blazer, grey studio","description":"Turn a hijab portrait into a professional LinkedIn headshot with a neatly wrapped dusty-rose hijab, navy blazer, and a soft grey studio backdrop.","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":360,"saved":27,"status":"published","targetSourcePhoto":"One clear head-and-shoulders photo wearing a hijab, full face and chin visible","bestSourcePhoto":["Full face and chin visible","Even lighting on the face","No sunglasses or other people","Original image should not be blurry"],"changes":["Dusty-rose hijab and navy blazer","Soft grey studio backdrop","Even flattering light"],"stays":["Face and identity","Hijab kept on","Skin tone","Expression"],"beforeFile":"hijab-office-linkedin-profile-picture-prompt-gemini-women-before.webp","afterFile":"hijab-office-linkedin-profile-picture-prompt-gemini-women-after.webp","altSource":"Woman in a dusty-mauve hijab and a cream floral shalwar kameez, in a hallway with curtains.","altResult":"Woman in a neatly wrapped dusty-rose hijab and navy blazer, grey backdrop.","variant":{"id":"hijab-office-linkedin-profile-picture-prompt-gemini-women-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a professional headshot with even, flattering light. Follow the selected source-preservation settings: {{preserve}}. Keep the hijab on, neatly wrapped, with the full face and chin visible. If clothing is not preserved, make the hijab a solid dusty-rose color and pair it with a well-fitted navy blazer over a plain top. If pose is not preserved, use straight head-and-shoulders framing facing the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Bright neutral","background":"Plain soft grey studio backdrop","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"64","id":"dupatta-office-linkedin-profile-picture-prompt-gemini-women","title":"Dupatta Office LinkedIn Profile Picture Prompt for Gemini (Women)","note":"Off-white kurta, beige blazer, draped dupatta","description":"Turn a portrait into an office headshot for women with an off-white kurta, fitted beige blazer, and a neatly draped solid dupatta on a light-grey backdrop.","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":350,"saved":26,"status":"published","targetSourcePhoto":"One clear head-and-shoulders photo, with or without a dupatta over the head","bestSourcePhoto":["Face fully visible","Daylight from a window","Head and shoulders in frame","Original image should not be blurry"],"changes":["Kurta, beige blazer, and dupatta","Light-grey backdrop","Even daylight-style light"],"stays":["Face and identity","Skin tone","Hairstyle or head covering","Expression"],"beforeFile":"dupatta-office-linkedin-profile-picture-prompt-gemini-women-before.webp","afterFile":"dupatta-office-linkedin-profile-picture-prompt-gemini-women-after.webp","altSource":"Woman with long hair in a pink printed drape and a gold necklace, on a balcony with plants.","altResult":"Woman in an off-white kurta, beige blazer and a plain light dupatta, light-grey backdrop.","variant":{"id":"dupatta-office-linkedin-profile-picture-prompt-gemini-women-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a professional office headshot with even daylight-style lighting. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a plain off-white kurta with a fitted beige blazer and a light, solid-color dupatta neatly draped over both shoulders, or over the head if the head is covered in the original photo. If pose is not preserved, use straight head-and-shoulders framing facing the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Fresh clean daylight","background":"Plain light-grey studio backdrop","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"65","id":"shalwar-kameez-linkedin-profile-picture-prompt-gemini-men","title":"Shalwar Kameez Waistcoat LinkedIn Profile Picture Prompt for Gemini (Men)","note":"White kameez, navy waistcoat, grey studio","description":"Turn a portrait into a formal LinkedIn headshot for men in a crisp white shalwar kameez and navy waistcoat, with soft even light on a light-grey backdrop.","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":25,"status":"published","targetSourcePhoto":"One clear head-and-shoulders photo with the face large and sharp","bestSourcePhoto":["Face fully visible","Beard as you wear it day to day","Even lighting, no heavy shadows","Original image should not be blurry"],"changes":["White kameez and navy waistcoat","Light-grey studio backdrop","Soft even light"],"stays":["Face and identity","Beard and hairline","Skin tone","Expression"],"beforeFile":"shalwar-kameez-linkedin-profile-picture-prompt-gemini-men-before.webp","afterFile":"shalwar-kameez-linkedin-profile-picture-prompt-gemini-men-after.webp","altSource":"Bearded man in a light-grey shalwar kameez, in a courtyard with plants, a cot and a gate.","altResult":"Bearded man in a crisp white shalwar kameez and navy waistcoat, light-grey backdrop.","variant":{"id":"shalwar-kameez-linkedin-profile-picture-prompt-gemini-men-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a formal professional headshot with soft, even studio lighting and a confident, relaxed look. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a crisp white shalwar kameez with a well-fitted navy waistcoat. If pose is not preserved, use straight head-and-shoulders framing facing the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Bright neutral","background":"Plain light-grey studio backdrop","ratio":"1:1 Square","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"66","id":"cv-photo-ai-prompt-plain-background-resume-headshot","title":"CV Photo AI Prompt: Plain Background Resume Headshot","note":"Plain light backdrop, smart formal, slight smile","description":"Turn a casual photo into a clean CV or resume photo for job portals, with smart formal clothing and a plain light backdrop. Not a substitute for a passport or ID card.","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":360,"saved":24,"status":"published","targetSourcePhoto":"One recent, front-facing head-and-shoulders photo","bestSourcePhoto":["Facing the camera","No shadows across the face","Slight natural smile","Original image should not be blurry"],"changes":["Smart formal clothing","Plain light backdrop","Shadow-free even light"],"stays":["Face and identity","Skin tone","Hairstyle","Apparent age"],"beforeFile":"cv-photo-ai-prompt-plain-background-resume-headshot-before.webp","afterFile":"cv-photo-ai-prompt-plain-background-resume-headshot-after.webp","altSource":"Woman with glasses in a lavender knit sweater, in a bedroom.","altResult":"Woman with glasses in a smart top, plain cream wall.","variant":{"id":"cv-photo-ai-prompt-plain-background-resume-headshot-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a clean CV photo with soft, even lighting, no shadows on the face, and sharp focus. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in smart formal clothing in plain, solid colors. If pose is not preserved, have them face the camera with a slight friendly smile, framed from head to upper shoulders. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Bright neutral","background":"Minimal cream wall","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"67","id":"modern-office-linkedin-profile-picture-prompt-gemini","title":"Modern Office LinkedIn Profile Picture Prompt for Gemini (Office Photo)","note":"Blurred glass office, window light","description":"Place a portrait in a bright modern office with glass walls and plants softly blurred behind, keeping their own clothes, with natural window light.","subject":"Person","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":350,"saved":23,"status":"published","targetSourcePhoto":"One clear head-and-shoulders photo in daylight","bestSourcePhoto":["Face lit from the front or side window","Head and shoulders in frame","No other people in the photo","Original image should not be blurry"],"changes":["Blurred modern office","Natural window light"],"stays":["Face and identity","Own clothing","Skin tone","Expression"],"beforeFile":"modern-office-linkedin-profile-picture-prompt-gemini-before.webp","afterFile":"modern-office-linkedin-profile-picture-prompt-gemini-after.webp","altSource":"Man with curly hair and a goatee in a light-blue shirt, on a city street.","altResult":"Man in a smart blue shirt, blurred bright office with glass and plants.","variant":{"id":"modern-office-linkedin-profile-picture-prompt-gemini-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into an office headshot with natural window light on the face and a shallow depth of field. Follow the selected source-preservation settings: {{preserve}}. If clothing is preserved, keep their own clothes. If clothing is not preserved, dress them in smart business clothing in plain colors. If pose is not preserved, use head-and-shoulders framing turned slightly toward the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Fresh clean daylight","background":"Softly blurred bright modern office with glass walls and plants","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"68","id":"outdoor-natural-light-linkedin-profile-picture-prompt-gemini","title":"Outdoor Natural Light LinkedIn Profile Picture Prompt for Gemini (Freelancers & Teachers)","note":"Blurred trees, late-afternoon light, warm smile","description":"Turn a portrait into an approachable outdoor headshot for freelancers, teachers, and creatives, keeping their own clothes, with blurred green trees and late-afternoon light.","subject":"Person","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":22,"status":"published","targetSourcePhoto":"One clear head-and-shoulders photo with a natural expression","bestSourcePhoto":["Face visible, no sunglasses","Soft daylight on the face","Natural smile if you have one","Original image should not be blurry"],"changes":["Blurred green trees","Late-afternoon light"],"stays":["Face and identity","Own clothing","Skin tone","Hairstyle"],"beforeFile":"outdoor-natural-light-linkedin-profile-picture-prompt-gemini-before.webp","afterFile":"outdoor-natural-light-linkedin-profile-picture-prompt-gemini-after.webp","altSource":"Woman with her hair pulled back in a blue and white printed kurta, in a park with trees and a bench.","altResult":"Woman in her blue printed kurta, blurred green trees in warm light.","variant":{"id":"outdoor-natural-light-linkedin-profile-picture-prompt-gemini-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into an approachable outdoor headshot with soft late-afternoon light and a shallow depth of field. Follow the selected source-preservation settings: {{preserve}}. If clothing is preserved, keep their own clothes. If clothing is not preserved, dress them in a smart-casual plain shirt or kurta in a solid color. If pose is not preserved, use relaxed head-and-shoulders framing with a natural, warm smile. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Soft warm natural","background":"Softly blurred green trees in late-afternoon light","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"69","id":"linkedin-photo-clean-up-ai-prompt-gemini-keep-outfit","title":"LinkedIn Photo Clean-Up AI Prompt for Gemini (Keep Your Outfit)","note":"Minimal edit: plain grey, tidy, even light","description":"Keep your own photo and outfit, and only swap in a plain soft grey backdrop, even out the light, and tidy stray hairs and lint.","subject":"Person","intent":"Change background","requirement":"One photo","tool":"ChatGPT Image","height":350,"saved":21,"status":"published","targetSourcePhoto":"A photo you already like, head and shoulders, facing the camera","bestSourcePhoto":["Outfit you are happy with","Face fully visible","Simple background is easier to replace","Original image should not be blurry"],"changes":["Plain soft grey backdrop","Evened-out lighting","Stray hairs and lint removed"],"stays":["Face and identity","Clothes","Pose","Skin tone and texture"],"beforeFile":"linkedin-photo-clean-up-ai-prompt-gemini-keep-outfit-before.webp","afterFile":"linkedin-photo-clean-up-ai-prompt-gemini-keep-outfit-after.webp","altSource":"Man with a salt-and-pepper beard in a messy open light-blue shirt, in front of cluttered shelves.","altResult":"Man in the same light-blue shirt tidied, plain soft-grey backdrop.","variant":{"id":"linkedin-photo-clean-up-ai-prompt-gemini-keep-outfit-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} with minimal changes into a tidy professional headshot. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, neaten the outfit into a similar plain smart version without changing its style. If pose is not preserved, straighten into a simple head-and-shoulders pose facing the camera. Even out the lighting and remove small stray hairs and lint. No skin smoothing, slimming, or makeup changes. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Warm natural neutral","background":"Plain soft grey studio backdrop","ratio":"4:5 Portrait","keepClothing":true,"keepPose":true},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"70","id":"matching-team-headshot-ai-prompt-gemini-company-page","title":"Matching Team Headshot AI Prompt for Gemini (Company Page)","note":"Consistent grey studio look for team pages","description":"Make consistent company team-page headshots: same light-grey backdrop, even front light, and eye-line framing, keeping each person's own outfit.","subject":"Person","intent":"Change background","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":20,"status":"published","targetSourcePhoto":"One head-and-shoulders photo per team member; run the same settings for each person","bestSourcePhoto":["One person per photo","Face the camera in even light","Similar distance from camera for everyone","Original image should not be blurry"],"changes":["Light-grey studio backdrop","Even front lighting","Consistent eye-line framing","Neatened collar"],"stays":["Face and identity","Own outfit","Skin tone","Hairstyle"],"beforeFile":"matching-team-headshot-ai-prompt-gemini-company-page-before.webp","afterFile":"matching-team-headshot-ai-prompt-gemini-company-page-after.webp","altSource":"Woman with long hair in a maroon henley, in a hallway.","altResult":"Woman in a maroon top with a neat collar, light-grey studio.","second":{"beforeFile":"matching-team-headshot-ai-prompt-gemini-company-page-before-b.webp","afterFile":"matching-team-headshot-ai-prompt-gemini-company-page-after-b.webp","altSource":"Bearded man in a blue plaid shirt, on a street.","altResult":"Bearded man in a plaid shirt with a neat collar, light-grey studio."},"variant":{"id":"matching-team-headshot-ai-prompt-gemini-company-page-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a company team headshot with even front lighting and the eyes about one-third from the top of the frame. Follow the selected source-preservation settings: {{preserve}}. If clothing is preserved, keep their own outfit but neaten the collar. If clothing is not preserved, dress them in a plain smart top or shirt in a neutral color. If pose is not preserved, use straight head-and-shoulders framing facing the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Bright neutral","background":"Soft evenly lit light-grey studio backdrop","ratio":"1:1 Square","keepClothing":true,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"71","id":"saree-office-linkedin-profile-picture-prompt-gemini-women","title":"Saree Office LinkedIn Profile Picture Prompt for Gemini (Women)","note":"Plain silk-cotton saree, fitted blouse, grey studio","description":"Turn a portrait into an elegant office headshot for women in a plain solid-color saree with a neatly pinned pallu, on a soft light-grey backdrop.","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":360,"saved":19,"status":"published","targetSourcePhoto":"One clear head-and-shoulders photo, front-facing","bestSourcePhoto":["Face fully visible","Even lighting, no heavy shadows","Hair as you wear it to work","Original image should not be blurry"],"changes":["Plain office saree and blouse","Light-grey studio backdrop","Soft even light"],"stays":["Face and identity","Skin tone","Hairstyle or head covering","Expression"],"beforeFile":"saree-office-linkedin-profile-picture-prompt-gemini-women-before.webp","afterFile":"saree-office-linkedin-profile-picture-prompt-gemini-women-after.webp","altSource":"Woman with long hair in a pink sleeveless top with a printed drape, in a living room.","altResult":"Woman in a deep-teal saree with a thin border and matching blouse, light-grey backdrop.","variant":{"id":"saree-office-linkedin-profile-picture-prompt-gemini-women-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a professional office headshot with soft, even studio light and a modest, polished look. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a plain solid deep-teal silk-cotton saree with a thin understated border, a matching elbow-sleeve blouse, and the pallu neatly pinned over the left shoulder, with small simple stud earrings only. If pose is not preserved, use straight head-and-shoulders framing facing the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Warm natural neutral","background":"Plain light-grey studio backdrop","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"72","id":"passport-size-photo-ai-prompt-gemini-white-background","title":"Passport Size Photo AI Prompt for Gemini (White Background)","note":"Plain white, front-facing, for CVs and forms","description":"Turn a photo into a passport-size style headshot on a plain white background for CVs and forms that accept one. Official ID photo rules vary by country, so check yours before using it on a passport, visa, or national ID.","subject":"Person","intent":"Change background","requirement":"One photo","tool":"ChatGPT Image","height":350,"saved":18,"status":"published","targetSourcePhoto":"One front-facing photo, face straight to camera, head and upper shoulders","bestSourcePhoto":["Look straight at the camera","Both sides of the face evenly lit","A recent photo, with glasses only if you wear them day to day","Original image should not be blurry"],"changes":["Plain white background","Front-facing centered framing","Even shadow-free light"],"stays":["Face and identity","Own clothing","Skin tone","Head covering if worn"],"beforeFile":"passport-size-photo-ai-prompt-gemini-white-background-before.webp","afterFile":"passport-size-photo-ai-prompt-gemini-white-background-after.webp","altSource":"Man with curly hair and a salt-and-pepper beard in a black shirt, against a plain light wall.","altResult":"Man in a plain dark shirt, pure white background, neutral expression.","variant":{"id":"passport-size-photo-ai-prompt-gemini-white-background-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a passport-size style photo on a plain background for a CV or application form, with even, shadow-free front lighting. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in plain dark smart clothing that contrasts with the background. If pose is not preserved, center the head and upper shoulders, facing straight to the camera, with a neutral expression, mouth closed, and eyes open. Keep any head covering worn for religious reasons, with the full face visible from chin to forehead. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Bright neutral","background":"Pure white seamless infinity studio background","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","This look is for CVs and forms that accept a white-background photo. Official ID photo rules vary by country, so check yours."]}},{"n":"73","id":"executive-corporate-linkedin-profile-picture-prompt-gemini","title":"Executive Dark Studio LinkedIn Profile Picture Prompt for Gemini (Corporate)","note":"Low-key charcoal backdrop, soft side light","description":"Turn a portrait into a confident executive headshot with a dark charcoal studio backdrop, dark formal outfit, and soft low-key side light.","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":360,"saved":17,"status":"published","targetSourcePhoto":"One clear head-and-shoulders photo with the face large and sharp","bestSourcePhoto":["Face fully visible","Neutral or confident expression","No sunglasses","Original image should not be blurry"],"changes":["Dark suit or formal outfit","Charcoal studio backdrop","Low-key side light"],"stays":["Face and identity","Skin tone","Hairstyle","Expression"],"beforeFile":"executive-corporate-linkedin-profile-picture-prompt-gemini-before.webp","afterFile":"executive-corporate-linkedin-profile-picture-prompt-gemini-after.webp","altSource":"Man in his 50s with grey hair, glasses and a grey mustache in a checked shirt, in a bedroom.","altResult":"Man in a dark suit and light shirt, dark charcoal backdrop with rim light.","variant":{"id":"executive-corporate-linkedin-profile-picture-prompt-gemini-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a confident executive headshot with soft low-key studio light from one side and a gentle rim light separating the hair from the background. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a well-fitted dark navy or black suit or formal outfit with a plain light shirt or top. If pose is not preserved, use head-and-shoulders framing at a slight angle with the face turned to the camera. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading with deep but soft shadows. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Dark cool neutral","background":"Dark charcoal studio backdrop with a soft gradient","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"74","id":"home-office-linkedin-profile-picture-prompt-gemini","title":"Home Office LinkedIn Profile Picture Prompt for Gemini (Remote Work)","note":"Blurred home-office desk, warm lamp light","description":"Place a portrait in a softly blurred home office for remote-work profiles, freelancer pages, and video-call avatars, keeping their own clothes.","subject":"Person","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":16,"status":"published","targetSourcePhoto":"One clear head-and-shoulders photo, front-facing","bestSourcePhoto":["Face visible, no sunglasses","Even light on the face","Head and shoulders in frame","Original image should not be blurry"],"changes":["Blurred home office","Soft window and lamp light"],"stays":["Face and identity","Own clothing","Skin tone","Hairstyle"],"beforeFile":"home-office-linkedin-profile-picture-prompt-gemini-before.webp","afterFile":"home-office-linkedin-profile-picture-prompt-gemini-after.webp","altSource":"Woman in a lilac sweater with her hand on her cheek, at a cluttered desk with a laptop, mug and plants.","altResult":"Woman in a purple sweater, blurred cozy home office with a laptop, mug, lamp, books and plants.","variant":{"id":"home-office-linkedin-profile-picture-prompt-gemini-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a friendly remote-work headshot with soft window light on the face and the background kept well out of focus. Follow the selected source-preservation settings: {{preserve}}. If clothing is preserved, keep their own clothes. If clothing is not preserved, dress them in a smart-casual plain shirt, sweater, or kurta in a solid color. If pose is not preserved, use head-and-shoulders framing facing the camera with a warm, natural smile. Keep their face shape, eyes, nose, lips, hairline, any beard, glasses, or head covering, apparent age, and exact skin tone; do not beautify, slim, de-age, or lighten the skin, and keep natural skin texture. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, text, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Soft warm natural","background":"Cozy home office desk with a laptop, coffee mug, notebook, warm lamp light, books, and soft greenery","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}}]};

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

function pairAsset(styleId, kind, sortOrder, sourceUrl, resultUrl, altSource, altResult) {
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
    },
    sort_order: sortOrder,
  };
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

  const assets = [
    pairAsset(style.id, "card_pair", 0, style._sourceUrl, style._resultUrl, style.altSource, style.altResult),
    pairAsset(style.id, "example_pair", 1, style._sourceUrl, style._resultUrl, style.altSource, style.altResult),
  ];
  if (style.second) {
    assets.push(
      pairAsset(
        style.id,
        "example_pair",
        2,
        style._secondSourceUrl,
        style._secondResultUrl,
        style.second.altSource,
        style.second.altResult,
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
    if (style.second) {
      const secondSourcePath = path.join(root, "before", style.second.beforeFile);
      const secondResultPath = path.join(root, "after", style.second.afterFile);
      if (!fs.existsSync(secondSourcePath)) throw new Error("Missing " + secondSourcePath);
      if (!fs.existsSync(secondResultPath)) throw new Error("Missing " + secondResultPath);
      const secondSourceKey = "seed/catalog/editorial/source-" + style.n + "b.webp";
      const secondResultKey = "seed/catalog/editorial/result-" + style.n + "b.webp";
      await uploadFile(client, secondSourcePath, secondSourceKey);
      await uploadFile(client, secondResultPath, secondResultKey);
      style._secondSourceUrl = publicObjectUrl(base, "source-" + style.n + "b");
      style._secondResultUrl = publicObjectUrl(base, "result-" + style.n + "b");
      urls.push(style._secondSourceUrl, style._secondResultUrl);
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

  const { data: category, error: categoryError } = await client
    .from("categories")
    .select("id")
    .eq("slug", CATEGORY_SLUG)
    .maybeSingle();
  if (categoryError) throw categoryError;
  if (!category) throw new Error("Professional portraits category not found in DB");

  for (const style of DATA.styles) {
    await seedStyle(client, style, category.id);
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
