/**
 * Publish the 12 merge-two-photos catalog styles, their public images,
 * and the guide social image.
 *
 * Uses @supabase/supabase-js, the ws package (Node 20 has no global WebSocket),
 * and Node built-ins. Does not import the repo.
 *
 *   NEXT_PUBLIC_SUPABASE_URL=https://....supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=... \
 *   node scripts/publish-merge-standalone.mjs /path/to/how-to-merge-two-photos-in-gemini
 *
 * The folder must contain before/<slug>-before.webp, before/<slug>-before-b.webp,
 * and after/<slug>-after.webp. Each style uploads source-<n>.webp, source-<n>b.webp,
 * and result-<n>.webp. The second example pair is Photo 2 and uses the
 * same result URL. The print-stack and docked layouts read that existing
 * row. No extra style_assets columns are required.
 * The 1200x630 guide image is read from scripts/assets/merge-two-photos-og.webp
 * and uploaded to seed/catalog/editorial/merge-two-photos-og.webp.
 * Its alt matches result-75. Style 77's result stays 1:1 (1200x1200).
 *
 * Categories are looked up by slug (cinematic, vintage, travel, pets). Missing
 * categories throw. Tags are reused by slug and inserted only when missing.
 * Empty lastVerified is omitted.
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
const DATA = {"provenance":{"source":"seed","licence":"catalog","modelRelease":false,"notes":"Before photos are AI-generated, not real people or animals. The after image is an AI edit of those sources."},"og":{"file":"merge-two-photos-og.webp","key":"seed/catalog/editorial/merge-two-photos-og.webp","alt":"Couple on a riverside promenade at golden hour, his arm around her shoulder."},"styles":[{"n":"75","id":"riverside-merge-two-photos-prompt-gemini-couple","title":"Riverside Merge Two Photos Prompt for Gemini (Couple)","note":"Two selfies, one riverside walk photo","description":"Merge two separate photos into one natural couple photo standing side by side on a riverside promenade in late-afternoon light, one arm around the other's shoulder, both faces kept exactly as in their own photos.","categorySlug":"cinematic","subject":"Group","intent":"Full scene transformation","requirement":"Two photos","tool":"ChatGPT Image","height":340,"saved":15,"status":"published","targetSourcePhoto":"Two separate photos uploaded together in one message: person A first, person B second","bestSourcePhoto":["One person per photo, face large and sharp","Similar light in both photos (both daylight or both indoors)","Similar head angle and framing, ideally chest-up","Original images should not be blurry"],"changes":["Both people in one photo","Riverside setting","One shared warm light from the left","Arm-around-shoulder pose"],"stays":["Person A's face from photo 1","Person B's face from photo 2","Each skin tone","Each person's own outfit"],"beforeFile":"riverside-merge-two-photos-prompt-gemini-couple-before.webp","beforeBFile":"riverside-merge-two-photos-prompt-gemini-couple-before-b.webp","afterFile":"riverside-merge-two-photos-prompt-gemini-couple-after.webp","altSource":"Woman in her late 20s in a sage-green jacket over a black top, on a riverside walkway.","altSecond":"Man with stubble in a dark-green jacket over a black tee, on a rocky riverbank.","altResult":"Couple on a riverside promenade at golden hour, his arm around her shoulder.","variant":{"id":"riverside-merge-two-photos-prompt-gemini-couple-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["first photo","second photo"],"version":"1.0.0","template":"Merge the first uploaded photo and the second uploaded photo into one natural {{subject}} photo of a couple standing side by side. The first uploaded photo shows person A and the second uploaded photo shows person B. Follow the selected source-preservation settings: {{preserve}}. Always keep person A's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and person B's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Keep the outfit each person wears in their own photo. If group arrangement and pose are not preserved, stand them close together, one arm around the other's shoulder, both smiling at the camera, with realistic relative heights. Light both people with one warm, low sun from the left so they look photographed together, with matching shadows and color temperature. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Luminous golden-hour warmth","background":"Riverside promenade with a calm river, trees along the bank, and warm late-afternoon light","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people and animals in the before photos are AI-generated, not real."]}},{"n":"76","id":"cafe-window-merge-two-photos-prompt-gemini-couple","title":"Cafe Window Merge Two Photos Prompt for Gemini (Couple)","note":"Seated together at a cafe window table","description":"Combine two separate portraits into one waist-up couple photo seated at a cafe table by a window, with soft window light matched on both faces.","categorySlug":"cinematic","subject":"Group","intent":"Full scene transformation","requirement":"Two photos","tool":"ChatGPT Image","height":350,"saved":14,"status":"published","targetSourcePhoto":"Two separate photos uploaded together: person A first, person B second","bestSourcePhoto":["One person per photo, face large and sharp","Similar light in both photos (both daylight or both indoors)","Similar head angle and framing, ideally chest-up","Original images should not be blurry"],"changes":["Both people seated at one table","Cafe window setting","Soft window light from the right","Waist-up framing"],"stays":["Person A's face from photo 1","Person B's face from photo 2","Each skin tone","Each person's own outfit"],"beforeFile":"cafe-window-merge-two-photos-prompt-gemini-couple-before.webp","beforeBFile":"cafe-window-merge-two-photos-prompt-gemini-couple-before-b.webp","afterFile":"cafe-window-merge-two-photos-prompt-gemini-couple-after.webp","altSource":"Bearded man in a grey button-up at a cafe table by a window.","altSecond":"Woman in a lilac embroidered kurti, hand at her chin, at a cafe table.","altResult":"Couple at a cafe window table with plain cups, warm interior.","variant":{"id":"cafe-window-merge-two-photos-prompt-gemini-couple-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["first photo","second photo"],"version":"1.0.0","template":"Use the first uploaded photo and the second uploaded photo as identity references and create one new waist-up {{subject}} photo of a couple seated together at a cafe table by a window. The first uploaded photo shows person A and the second uploaded photo shows person B. Follow the selected source-preservation settings: {{preserve}}. Always keep person A's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and person B's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Keep the outfit each person wears in their own photo. If group arrangement and pose are not preserved, seat them side by side at the table, both smiling at the camera, at realistic matching sizes. Light both faces with soft window light from the right, with matching shadows and color temperature. Keep the table clean, with only plain unbranded cups. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Warm natural neutral","background":"Cozy café table beside a large window with softly blurred interior","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people and animals in the before photos are AI-generated, not real."]}},{"n":"77","id":"side-by-side-keepsake-frame-merge-two-photos-prompt-gemini-couple","title":"Keepsake Frame Merge Two Photos Prompt for Gemini (Couple)","note":"Both photos kept as-is in one framed keepsake","description":"Combine two photos in one frame: both original photos placed side by side, unchanged, in an elegant cream keepsake layout with a thin gold divider.","categorySlug":"vintage","subject":"Group","intent":"Artistic restyle","requirement":"Two photos","tool":"ChatGPT Image","height":360,"saved":13,"status":"published","targetSourcePhoto":"Two separate photos uploaded together, the one for the left side first","bestSourcePhoto":["Two photos with a similar crop (both portrait, chest-up)","Similar brightness","Faces clearly visible","Original images should not be blurry"],"changes":["Two photos in one frame","Cream border and gold divider","Gentle matching color grade"],"stays":["Both photos' content","Both faces","Each pose and outfit","Each original background"],"beforeFile":"side-by-side-keepsake-frame-merge-two-photos-prompt-gemini-couple-before.webp","beforeBFile":"side-by-side-keepsake-frame-merge-two-photos-prompt-gemini-couple-before-b.webp","afterFile":"side-by-side-keepsake-frame-merge-two-photos-prompt-gemini-couple-after.webp","altSource":"Woman with wavy hair in a brown scoop-neck top, indoors.","altSecond":"Young man with tousled dark hair and a light moustache in an olive-green tee, indoors.","altResult":"The two original photos of the couple side by side on cream paper with a thin gold divider.","variant":{"id":"side-by-side-keepsake-frame-merge-two-photos-prompt-gemini-couple-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["first photo","second photo"],"version":"1.0.0","template":"Place the first uploaded photo on the left and the second uploaded photo on the right, side by side in one elegant framed layout as a single couple keepsake of the {{subject}}. Follow the selected source-preservation settings: {{preserve}}. Do not change the content of either photo: keep every face, skin tone, outfit, pose, and original photo background exactly as uploaded, and do not merge the people into one scene. If group arrangement and pose are not preserved, you may crop each photo slightly so both share the same size and eye level. Apply a gentle {{mood}} color grade to both photos so they match. Set both photos on {{background}}, with even margins around them. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Warm elegant neutral","background":"Soft cream paper border with a thin gold divider line","ratio":"1:1 Square","keepClothing":true,"keepPose":true},"limitations":["Example people and animals in the before photos are AI-generated, not real."]}},{"n":"78","id":"long-distance-sunset-beach-merge-two-photos-prompt-gemini-couple","title":"Long Distance Couple: Merge 2 Photos AI Prompt (Gemini)","note":"Walking hand in hand on a beach at sunset","description":"For long-distance couples: merge two photos into one photo walking hand in hand on a sunset beach in casual summer clothes, with matching warm backlight on both.","categorySlug":"travel","subject":"Group","intent":"Full scene transformation","requirement":"Two photos","tool":"ChatGPT Image","height":340,"saved":12,"status":"published","targetSourcePhoto":"Two separate photos uploaded together: person A first, person B second","bestSourcePhoto":["One person per photo, face large and sharp","Similar light in both photos (both daylight or both indoors)","Similar head angle and framing, ideally chest-up","Original images should not be blurry"],"changes":["Both people together on a beach","Casual summer clothes","Warm sunset backlight","Sea breeze in hair and fabric"],"stays":["Person A's face from photo 1","Person B's face from photo 2","Each skin tone","Any head covering"],"beforeFile":"long-distance-sunset-beach-merge-two-photos-prompt-gemini-couple-before.webp","beforeBFile":"long-distance-sunset-beach-merge-two-photos-prompt-gemini-couple-before-b.webp","afterFile":"long-distance-sunset-beach-merge-two-photos-prompt-gemini-couple-after.webp","altSource":"Bearded man in a white palm-print shirt, beach selfie at sunset.","altSecond":"Woman in a pink dupatta and floral kurti, selfie against a sunset sky.","altResult":"Couple walking hand in hand on a beach at sunset, her dupatta in the breeze.","variant":{"id":"long-distance-sunset-beach-merge-two-photos-prompt-gemini-couple-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["first photo","second photo"],"version":"1.0.0","template":"Merge the first uploaded photo and the second uploaded photo into one natural {{subject}} photo of a long-distance couple finally together on a beach at sunset. The first uploaded photo shows person A and the second uploaded photo shows person B. Follow the selected source-preservation settings: {{preserve}}. Always keep person A's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and person B's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Dress both in modest, casual summer clothes; if either wears a dupatta, scarf, or head covering, keep it and let the sea breeze move it gently. If group arrangement and pose are not preserved, show them walking hand in hand toward the camera, smiling, at realistic relative heights. Give both the same warm sunset backlight and matching shadows so they look photographed together. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Warm sunset backlight with soft golden haze","background":"Wide sandy beach at sunset with gentle waves and a glowing horizon","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people and animals in the before photos are AI-generated, not real."]}},{"n":"79","id":"add-missing-person-to-group-photo-merge-two-photos-prompt-gemini-family","title":"Add Missing Person to Group Photo AI Prompt (Gemini)","note":"Add one person to an existing group photo","description":"Add a missing person to a family group photo: the person from the second photo joins the group at the right end, matched in size, light, and shadow, with everyone else unchanged.","categorySlug":"cinematic","subject":"Group","intent":"Full scene transformation","requirement":"Two photos","tool":"ChatGPT Image","height":350,"saved":11,"status":"published","targetSourcePhoto":"The group photo first, then a clear photo of the person to add","bestSourcePhoto":["Group photo where the right end has some free space","Added person photographed in similar light","Added person's face large and sharp","Original images should not be blurry"],"changes":["One person added at the right end","Size, light, and shadows matched to the group"],"stays":["Everyone already in the group photo","Group arrangement","Original background","Added person's face from photo 2"],"beforeFile":"add-missing-person-to-group-photo-merge-two-photos-prompt-gemini-family-before.webp","beforeBFile":"add-missing-person-to-group-photo-merge-two-photos-prompt-gemini-family-before-b.webp","afterFile":"add-missing-person-to-group-photo-merge-two-photos-prompt-gemini-family-after.webp","altSource":"Family of four at an outdoor viewpoint: father in a dark-green polo, mother in pink floral, son in a navy tee, daughter in white and blue floral.","altSecond":"Young man in a navy sweatshirt and light jeans, with greenery and water behind.","altResult":"Young man added at the right end of the family of four at the viewpoint.","variant":{"id":"add-missing-person-to-group-photo-merge-two-photos-prompt-gemini-family-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["first photo","second photo"],"version":"1.0.0","template":"The first uploaded photo is a {{subject}} photo of a family. The second uploaded photo shows one more person who was missing from it. Add the person from the second uploaded photo into the first uploaded photo, standing at the right end of the group. Follow the selected source-preservation settings: {{preserve}}. Keep everyone already in the first uploaded photo exactly as they are: faces, skin tones, clothing, and positions. Keep the added person's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, exact skin tone, and outfit exactly as in the second uploaded photo; do not blend them with anyone else, beautify, slim, de-age, or lighten them. If group arrangement and pose are not preserved, you may shift people slightly so the added person fits naturally. Match the added person's size, focus, lighting, shadows, and grain to the rest of the group so they look like they were there. Apply {{mood}} color grading. Background setting: {{background}}; if a new background is chosen, replace it, otherwise keep the first uploaded photo's background and extend it naturally behind the added person. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Match the original photo's colors","background":"Keep original background","ratio":"4:5 Portrait","keepClothing":true,"keepPose":true},"limitations":["Example people and animals in the before photos are AI-generated, not real."]}},{"n":"80","id":"eid-family-frame-merge-two-photos-prompt-gemini-family","title":"Eid Family Frame Merge Two Photos Prompt for Gemini (Family)","note":"Parents' photo and kids' photo combined for Eid","description":"Combine two photos, one of the parents and one of the children, into one Eid family portrait in a festively decorated living room, every face kept as in its own photo.","categorySlug":"cinematic","subject":"Group","intent":"Full scene transformation","requirement":"Two photos","tool":"ChatGPT Image","height":360,"saved":10,"status":"published","targetSourcePhoto":"Two photos uploaded together: the parents' photo first, the children's photo second","bestSourcePhoto":["Faces large and sharp in both photos","Similar light in both photos","Five people or fewer in total","Original images should not be blurry"],"changes":["Both photos' people in one portrait","Formal festive clothes","Eid-decorated living room","Soft warm light on everyone"],"stays":["Each face from its own photo","Each age and height","Each skin tone","Any beard, glasses, or hijab"],"beforeFile":"eid-family-frame-merge-two-photos-prompt-gemini-family-before.webp","beforeBFile":"eid-family-frame-merge-two-photos-prompt-gemini-family-before-b.webp","afterFile":"eid-family-frame-merge-two-photos-prompt-gemini-family-after.webp","altSource":"Couple in their 40s in a living room, him in a sage-green shirt and her in a cream and blue floral kurti.","altSecond":"Two children, a girl in a lavender knit and a boy in a navy top.","altResult":"Family of four in festive clothes, parents seated with the children standing behind them, string lights and crescent lanterns.","variant":{"id":"eid-family-frame-merge-two-photos-prompt-gemini-family-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["first photo","second photo"],"version":"1.0.0","template":"Merge the first uploaded photo and the second uploaded photo into one formal {{subject}} family portrait for Eid. The first uploaded photo shows the parents and the second uploaded photo shows their children; include every person from both photos and no one else. Follow the selected source-preservation settings: {{preserve}}. Always keep each person's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, height, and exact skin tone exactly as in their own photo. Treat everyone as separate people; do not blend, swap, beautify, slim, de-age, or lighten any face, and keep natural skin texture. Dress everyone in modest, formal festive clothes such as kurtas, shalwar kameez, or embroidered suits in coordinated soft colors. If group arrangement and pose are not preserved, seat the parents on a sofa in the center with the children standing behind or beside them, everyone smiling at the camera, at realistic relative heights. Light everyone with the same soft, warm light. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping any face.","defaults":{"mood":"Warm golden neutral","background":"Living room decorated for Eid with warm string lights, crescent lanterns, and soft floral accents","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people and animals in the before photos are AI-generated, not real."]}},{"n":"81","id":"rooftop-friends-reunion-merge-two-photos-prompt-gemini-group","title":"Rooftop Reunion Merge Two Photos Prompt for Gemini (Group)","note":"Two friends reunited at a rooftop dinner","description":"Merge two separate selfies into one candid photo of two friends reunited at a rooftop dinner under warm fairy lights, both faces kept exactly as in their own photos.","categorySlug":"cinematic","subject":"Group","intent":"Full scene transformation","requirement":"Two photos","tool":"ChatGPT Image","height":340,"saved":9,"status":"published","targetSourcePhoto":"Two separate selfies uploaded together: friend A first, friend B second","bestSourcePhoto":["One person per photo, face large and sharp","Similar light in both photos (both daylight or both indoors)","Similar head angle and framing, ideally chest-up","Original images should not be blurry"],"changes":["Both friends in one photo","Rooftop dinner setting","Fairy lights","Same evening light on both"],"stays":["Friend A's face from photo 1","Friend B's face from photo 2","Hairstyle, glasses, beard, or hijab","Each person's own outfit"],"beforeFile":"rooftop-friends-reunion-merge-two-photos-prompt-gemini-group-before.webp","beforeBFile":"rooftop-friends-reunion-merge-two-photos-prompt-gemini-group-before-b.webp","afterFile":"rooftop-friends-reunion-merge-two-photos-prompt-gemini-group-after.webp","altSource":"Woman in a purple top, rooftop selfie at sunset.","altSecond":"Woman in a dusty-rose hijab and floral dress, rooftop selfie at dusk.","altResult":"Two friends at a rooftop dinner table at dusk with fairy lights and a blurred skyline.","variant":{"id":"rooftop-friends-reunion-merge-two-photos-prompt-gemini-group-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["first photo","second photo"],"version":"1.0.0","template":"Merge the first uploaded photo and the second uploaded photo into one candid {{subject}} photo of two friends reunited at a rooftop dinner. The first uploaded photo shows friend A and the second uploaded photo shows friend B. Follow the selected source-preservation settings: {{preserve}}. Always keep friend A's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and friend B's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Keep the outfit each friend wears in their own photo. If group arrangement and pose are not preserved, seat them side by side at the table, laughing naturally toward the camera, at realistic relative heights. Light both with the same warm evening light. Keep plain unbranded tableware only. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Warm golden evening","background":"Rooftop dinner table at dusk with warm fairy lights and a softly blurred city skyline","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people and animals in the before photos are AI-generated, not real."]}},{"n":"82","id":"grandparent-and-grandchild-courtyard-merge-two-photos-prompt-gemini-family","title":"Grandparent Merge Two Photos Prompt for Gemini (Family)","note":"Grandparent reading to a grandchild on a charpai","description":"Merge a grandparent's photo and a grandchild's photo into one warm family photo sitting together on a charpai in a sunny courtyard, the grandparent sharing a book with their older grandchild or teen.","categorySlug":"cinematic","subject":"Group","intent":"Full scene transformation","requirement":"Two photos","tool":"ChatGPT Image","height":350,"saved":8,"status":"published","targetSourcePhoto":"Two photos uploaded together: the grandparent first, the grandchild (older kid or teen) second","bestSourcePhoto":["One person per photo, face clearly visible","Similar daylight in both photos","A recent photo of the grandchild","Original images should not be blurry"],"changes":["Both together on a charpai","Sunny courtyard setting","Sharing-a-book pose","Soft morning light"],"stays":["Grandparent's face and age from photo 1","Grandchild's face and age from photo 2","Each skin tone","Each person's own outfit"],"beforeFile":"grandparent-and-grandchild-courtyard-merge-two-photos-prompt-gemini-family-before.webp","beforeBFile":"grandparent-and-grandchild-courtyard-merge-two-photos-prompt-gemini-family-before-b.webp","afterFile":"grandparent-and-grandchild-courtyard-merge-two-photos-prompt-gemini-family-after.webp","altSource":"Grandmother about 70 with grey hair in a pink floral sari, in a courtyard garden.","altSecond":"Teen girl in a white and blue floral kurti and navy dupatta, on a garden path.","altResult":"Grandmother and teen granddaughter seated on a charpai in a sunny courtyard, the grandmother holding a plain book.","variant":{"id":"grandparent-and-grandchild-courtyard-merge-two-photos-prompt-gemini-family-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["first photo","second photo"],"version":"1.0.0","template":"Merge the first uploaded photo and the second uploaded photo into one warm {{subject}} photo. The first uploaded photo shows a grandparent and the second uploaded photo shows their older grandchild, a preteen or teenager. Follow the selected source-preservation settings: {{preserve}}. Always keep the grandparent's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and the grandchild's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Keep both ages exactly as they are, with realistic relative sizes. Keep the modest outfit each person wears in their own photo. If group arrangement and pose are not preserved, seat them together on a charpai, the grandparent showing a plain book to the grandchild, both relaxed and smiling. Light both with the same soft morning sunlight. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Soft warm natural","background":"Sunny traditional courtyard with a woven charpai, potted plants, and soft morning light","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people and animals in the before photos are AI-generated, not real."]}},{"n":"83","id":"sofa-cuddle-with-your-pet-merge-two-photos-prompt-gemini-person-and-pet","title":"Sofa Pet Merge Two Photos Prompt for Gemini (Person & Pet)","note":"You and your dog together on the sofa","description":"Merge your photo and your dog's photo into one cozy picture on a living room sofa, the dog leaning on your shoulder, with breed, coat, and markings kept exact.","categorySlug":"pets","subject":"Pet","intent":"Full scene transformation","requirement":"Two photos","tool":"ChatGPT Image","height":360,"saved":7,"status":"published","targetSourcePhoto":"Two photos uploaded together: you first, your pet second","bestSourcePhoto":["Your face large and sharp","Pet photographed clearly, eyes visible","Both in daylight if possible","Original images should not be blurry"],"changes":["Person and pet in one photo","Living room sofa setting","Dog leaning on shoulder","Same soft daylight on both"],"stays":["Your face and skin tone from photo 1","Pet's breed, coat, and markings from photo 2","Pet's eye color","Your own outfit"],"beforeFile":"sofa-cuddle-with-your-pet-merge-two-photos-prompt-gemini-person-and-pet-before.webp","beforeBFile":"sofa-cuddle-with-your-pet-merge-two-photos-prompt-gemini-person-and-pet-before-b.webp","afterFile":"sofa-cuddle-with-your-pet-merge-two-photos-prompt-gemini-person-and-pet-after.webp","altSource":"Woman in a white and blue floral kurti on a beige sofa.","altSecond":"Brown-and-white dog with a white face stripe, on a tiled floor.","altResult":"Woman on a sofa with a brown-and-white dog leaning on her shoulder.","variant":{"id":"sofa-cuddle-with-your-pet-merge-two-photos-prompt-gemini-person-and-pet-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["first photo","second photo"],"version":"1.0.0","template":"Merge the first uploaded photo and the second uploaded photo into one cozy, natural photo. The first uploaded photo shows a person and the second uploaded photo shows their {{subject}}. Follow the selected source-preservation settings: {{preserve}}. Always keep the person's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, exact skin tone, and outfit as in the first uploaded photo; do not beautify, slim, de-age, or lighten them. Always keep the animal's breed, size, coat color, markings, and eye color exactly as in the second uploaded photo. If original pose and composition are not preserved, seat the person on a sofa with the pet leaning against their shoulder, at a realistic size next to an adult. Light both with the same soft daylight. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and fur. Do not add extra people or animals, text, lettering, or logos. Compose for {{ratio}} without cropping the face or the pet.","defaults":{"mood":"Soft warm natural","background":"Modern staged living room with cream upholstery, warm natural wood, textured neutral rug, soft curtains, indoor greenery and refined minimal decor","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people and animals in the before photos are AI-generated, not real."]}},{"n":"84","id":"wedding-stage-merge-two-photos-prompt-gemini-couple","title":"Wedding Stage Merge Two Photos Prompt for Gemini (Couple)","note":"Bride and groom seated together on a decorated stage","description":"Merge two separate photos into one wedding stage photo of a couple seated together on a floral stage, each face kept exactly as in their own photo.","categorySlug":"cinematic","subject":"Group","intent":"Full scene transformation","requirement":"Two photos","tool":"ChatGPT Image","height":340,"saved":6,"status":"published","targetSourcePhoto":"Two separate photos uploaded together: person A first, person B second; formal outfits work best","bestSourcePhoto":["Each person in formal or wedding clothes","Face large and sharp in each photo","Similar indoor light","Original images should not be blurry"],"changes":["Both seated on one stage","Floral wedding backdrop","Warm stage lighting"],"stays":["Person A's face from photo 1","Person B's face from photo 2","Each skin tone","Each person's own outfit"],"beforeFile":"wedding-stage-merge-two-photos-prompt-gemini-couple-before.webp","beforeBFile":"wedding-stage-merge-two-photos-prompt-gemini-couple-before-b.webp","afterFile":"wedding-stage-merge-two-photos-prompt-gemini-couple-after.webp","altSource":"Bearded man in a cream patterned sherwani.","altSecond":"Woman in a red bridal lehenga with gold jewellery, a maang tikka and hennaed hands.","altResult":"Couple on a cream sofa before white and blush flowers with fairy lights.","variant":{"id":"wedding-stage-merge-two-photos-prompt-gemini-couple-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["first photo","second photo"],"version":"1.0.0","template":"Merge the first uploaded photo and the second uploaded photo into one elegant {{subject}} photo of a couple seated together on a wedding stage. The first uploaded photo shows person A and the second uploaded photo shows person B. Follow the selected source-preservation settings: {{preserve}}. Always keep person A's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and person B's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Keep the outfit and jewelry each person wears in their own photo. If group arrangement and pose are not preserved, seat them side by side on a cream sofa, close together, smiling at the camera, at realistic relative heights. Light both with the same warm, soft stage light. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Warm golden-hour cinematic glow with honey-amber highlights, rich mustard tones, natural skin color, soft earthy neutrals, and elegant contrast","background":"Wedding stage with a floral backdrop of white and blush flowers, warm fairy lights, and a cream sofa","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people and animals in the before photos are AI-generated, not real."]}},{"n":"85","id":"graduation-day-merge-two-photos-prompt-gemini-family","title":"Graduation Day Merge Two Photos Prompt for Gemini (Family)","note":"Graduate with a parent who could not attend","description":"Merge a graduate's photo with a parent's photo into one proud graduation day picture on a sunny campus lawn, both faces kept exactly as in their own photos.","categorySlug":"cinematic","subject":"Group","intent":"Full scene transformation","requirement":"Two photos","tool":"ChatGPT Image","height":350,"saved":5,"status":"published","targetSourcePhoto":"Two photos uploaded together: the graduate first, the parent second","bestSourcePhoto":["Graduate photo in a gown if you have one","Parent's face large and sharp","Both in daylight","Original images should not be blurry"],"changes":["Graduate and parent together","Campus lawn setting","Plain black gown and cap","Shared daylight"],"stays":["Graduate's face from photo 1","Parent's face from photo 2","Each skin tone","Parent's own outfit"],"beforeFile":"graduation-day-merge-two-photos-prompt-gemini-family-before.webp","beforeBFile":"graduation-day-merge-two-photos-prompt-gemini-family-before-b.webp","afterFile":"graduation-day-merge-two-photos-prompt-gemini-family-after.webp","altSource":"Graduate in a black gown and cap on a campus lawn.","altSecond":"Parent in their 50s with glasses and a grey beard, in a charcoal blazer and light-blue shirt.","altResult":"Graduate beside her parent on a sunny campus lawn, his arm at her shoulder.","variant":{"id":"graduation-day-merge-two-photos-prompt-gemini-family-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["first photo","second photo"],"version":"1.0.0","template":"Merge the first uploaded photo and the second uploaded photo into one proud graduation day {{subject}} photo. The first uploaded photo shows the graduate and the second uploaded photo shows their parent. Follow the selected source-preservation settings: {{preserve}}. Always keep the graduate's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and the parent's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Dress the graduate in a plain black graduation gown and cap with no crest or insignia, and keep the parent's own outfit. If group arrangement and pose are not preserved, stand them side by side, the parent's arm around the graduate, both smiling at the camera, at realistic relative heights. Light both with the same bright daylight and matching shadows. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Bright neutral","background":"Sunny campus lawn with trees and softly blurred academic buildings","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people and animals in the before photos are AI-generated, not real."]}},{"n":"86","id":"mountain-viewpoint-trip-merge-two-photos-prompt-gemini-couple","title":"Mountain Trip Merge Two Photos Prompt for Gemini (Couple)","note":"Together at a mountain viewpoint in warm jackets","description":"Merge two separate photos into one travel photo of a couple at a mountain viewpoint, in warm jackets, with crisp daylight matched on both faces.","categorySlug":"travel","subject":"Group","intent":"Full scene transformation","requirement":"Two photos","tool":"ChatGPT Image","height":360,"saved":4,"status":"published","targetSourcePhoto":"Two separate photos uploaded together: person A first, person B second","bestSourcePhoto":["One person per photo, face large and sharp","Similar light in both photos (both daylight or both indoors)","Similar head angle and framing, ideally chest-up","Original images should not be blurry"],"changes":["Both at one mountain viewpoint","Plain warm jackets","Crisp shared daylight"],"stays":["Person A's face from photo 1","Person B's face from photo 2","Each skin tone","Any head covering"],"beforeFile":"mountain-viewpoint-trip-merge-two-photos-prompt-gemini-couple-before.webp","beforeBFile":"mountain-viewpoint-trip-merge-two-photos-prompt-gemini-couple-before-b.webp","afterFile":"mountain-viewpoint-trip-merge-two-photos-prompt-gemini-couple-after.webp","altSource":"Bearded man in a black puffer at a railing with mountains.","altSecond":"Woman in a maroon puffer with a fur-trimmed hood and cream scarf.","altResult":"Couple in warm jackets at a railing with pines, a green valley and snowy peaks.","variant":{"id":"mountain-viewpoint-trip-merge-two-photos-prompt-gemini-couple-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["first photo","second photo"],"version":"1.0.0","template":"Merge the first uploaded photo and the second uploaded photo into one natural travel {{subject}} photo of a couple at a mountain viewpoint. The first uploaded photo shows person A and the second uploaded photo shows person B. Follow the selected source-preservation settings: {{preserve}}. Always keep person A's face shape, eyes, nose, lips, hairline, hair, any beard, glasses, or head covering, apparent age, and exact skin tone as in the first uploaded photo, and person B's exactly as in the second uploaded photo. Treat them as two separate people; do not blend, swap, beautify, slim, de-age, or lighten either face, and keep natural skin texture. Dress both in plain, unbranded warm jackets over their own clothes, keeping any head covering. If group arrangement and pose are not preserved, stand them side by side at a railing, smiling at the camera, at realistic relative heights. Light both with the same crisp daylight from one direction and matching shadows. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, text, lettering, or logos. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Bright sunlit cinematic outdoor color with vivid sky blue, warm golden skin highlights, deep navy tones, creamy whites, and fresh natural greens","background":"Mountain viewpoint with pine trees, a green valley, and distant snowy peaks","ratio":"4:5 Portrait","keepClothing":true,"keepPose":false},"limitations":["Example people and animals in the before photos are AI-generated, not real."]}}]};

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
  ];
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
    const secondPath = path.join(root, "before", style.beforeBFile);
    const resultPath = path.join(root, "after", style.afterFile);
    if (!fs.existsSync(sourcePath)) throw new Error("Missing " + sourcePath);
    if (!fs.existsSync(secondPath)) throw new Error("Missing " + secondPath);
    if (!fs.existsSync(resultPath)) throw new Error("Missing " + resultPath);
    const sourceKey = "seed/catalog/editorial/source-" + style.n + ".webp";
    const secondKey = "seed/catalog/editorial/source-" + style.n + "b.webp";
    const resultKey = "seed/catalog/editorial/result-" + style.n + ".webp";
    await uploadFile(client, sourcePath, sourceKey);
    await uploadFile(client, secondPath, secondKey);
    await uploadFile(client, resultPath, resultKey);
    style._sourceUrl = publicObjectUrl(base, "source-" + style.n);
    style._secondSourceUrl = publicObjectUrl(base, "source-" + style.n + "b");
    style._resultUrl = publicObjectUrl(base, "result-" + style.n);
    urls.push(style._sourceUrl, style._secondSourceUrl, style._resultUrl);
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
