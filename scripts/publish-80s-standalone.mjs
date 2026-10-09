/**
 * Publish the 12 1980s catalog styles and their public images.
 *
 * Uses @supabase/supabase-js, the ws package (Node 20 has no global WebSocket),
 * and Node built-ins. Does not import the repo.
 *
 *   NEXT_PUBLIC_SUPABASE_URL=https://....supabase.co \\
 *   SUPABASE_SERVICE_ROLE_KEY=... \\
 *   node scripts/publish-80s-standalone.mjs /path/to/80s-ai-photo-prompts-solo-couple
 *
 * The folder must contain before/<slug>-before.webp and after/<slug>-after.webp.
 * combine-two-photos-80s-couple uses before/<slug>-before-a.webp as its one
 * catalog source. before-b is not a catalog key and is not uploaded.
 * Style 51 reads cassette-player-street-snapshot-before.webp and
 * cassette-player-street-snapshot-after.webp.
 *
 * Safe to run again: storage objects are upserted, style rows are upserted,
 * and each style's prompt variant and assets are replaced.
 */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import WebSocketImpl from "ws";

globalThis.WebSocket ??= WebSocketImpl;

const BUCKET = "catalog-public";
const DATA = {"provenance":{"source":"seed","licence":"catalog","modelRelease":false,"notes":"Before photo is an AI-generated person, not a real person. After image is an AI edit of that source."},"styles":[{"n":"48","id":"1985-studio-portrait","title":"1985 Studio Portrait","note":"Mottled backdrop, soft flash, warm faded film","description":"Turn a portrait into a 1985 studio photo with feathered hair, period clothes, a mottled backdrop, and warm faded film.","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":42,"status":"published","targetSourcePhoto":"One clear head-and-shoulders portrait with the face large and sharp","bestSourcePhoto":["Face visible, no sunglasses","Even lighting, no heavy shadows","Face reasonably large in the frame","Original image should not be blurry"],"changes":["1980s hair and clothing","Studio backdrop","Soft flash and faded film color"],"stays":["Face and identity","Age","Skin tone","Expression"],"beforeFile":"1985-studio-portrait-before.webp","afterFile":"1985-studio-portrait-after.webp","altSource":"AI-generated portrait of a young woman with long dark hair in a cream tee.","altResult":"AI edit as a 1985 studio photo, still in the cream tee, with feathered hair and a mottled backdrop.","variant":{"id":"1985-studio-portrait-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a 1985 professional studio portrait with voluminous feathered hair and light film grain. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in 1980s period clothing. If pose is not preserved, use a simple frontal studio pose. Do not beautify or change their features. Apply {{mood}} color grading with soft frontal flash. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Soft sunlit analog warmth with a slightly faded film look","background":"Classic mottled studio backdrop","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"49","id":"80s-film-poster-lead","title":"80s Film Poster Lead","note":"Hand-painted South Asian poster, one lead","description":"Recreate a portrait as the lead on a hand-painted 1980s South Asian film poster, with period styling and no title text.","subject":"Person","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":360,"saved":41,"status":"published","targetSourcePhoto":"One clear portrait, face large enough to stay recognizable on a poster","bestSourcePhoto":["Face fully visible","Similar angle to a three-quarter pose","No heavy filters already applied","Original image should not be blurry"],"changes":["Poster styling and outfit","Painted sunset backdrop","Saturated print-wear color"],"stays":["Face and identity","Facial structure","Skin tone","Age"],"beforeFile":"80s-film-poster-lead-before.webp","afterFile":"80s-film-poster-lead-after.webp","altSource":"AI-generated portrait of a young man with dark hair and stubble, in a navy polo against a grey wall.","altResult":"AI edit as a hand-painted 1980s film-poster lead, still in the navy polo, against a sunset sky.","variant":{"id":"80s-film-poster-lead-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into the lead star on a hand-painted 1980s South Asian film poster, with painted poster texture and slight print wear. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, choose the outfit that matches the person: either a wide-collar printed shirt, open blazer, thick side-parted hair, and aviator sunglasses pushed up on the head, or a deep magenta chiffon saree with a gold border, big soft curls, bold eyeliner, and gold jhumkas. If pose is not preserved, use a dramatic three-quarter pose. Do not beautify or slim the face. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Leave empty space at the top but do not write any text, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Rich saturated sunset colors with painted-poster warmth and slight print wear","background":"Hand-painted sunset sky with empty space at the top","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"50","id":"1986-school-yearbook","title":"1986 School Yearbook","note":"Laser backdrop yearbook headshot","description":"Turn a portrait into a 1986 school yearbook photo with big hair, a period sweater or shirt, and a blue laser backdrop.","subject":"Person","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":40,"status":"published","targetSourcePhoto":"One clear head-and-shoulders photo","bestSourcePhoto":["Face centered and sharp","Neutral or slight smile","No sunglasses","Original image should not be blurry"],"changes":["1980s hair and school clothes","Laser backdrop","Soft-focus yearbook print"],"stays":["Face and identity","Skin tone","Expression","Apparent age"],"beforeFile":"1986-school-yearbook-before.webp","afterFile":"1986-school-yearbook-after.webp","altSource":"AI-generated headshot of a smiling young woman with dark hair pulled back, in a light-blue shirt.","altResult":"AI edit as a 1986 yearbook photo, still in the light-blue shirt, with feathered hair and a blue laser backdrop.","variant":{"id":"1986-school-yearbook-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a 1986 school yearbook portrait with a voluminous 1980s hairstyle, slightly soft focus, and fine grain like a printed yearbook photo. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a period sweater or collared shirt. If pose is not preserved, use a straight head-and-shoulders yearbook pose. Keep them the same age as in the photo. Apply {{mood}} color grading with even studio flash and faded colors. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Soft nostalgic","background":"Soft blue 1980s laser-style studio backdrop","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"51","id":"cassette-player-street-snapshot","title":"Cassette Player Street Snapshot","note":"Candid market walk with a portable cassette player with foam headphones","description":"Recreate a photo as a candid 1980s street snapshot of a city-market walk in denim, a portable cassette player with foam headphones, and film grain.","subject":"Person","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":350,"saved":39,"status":"published","targetSourcePhoto":"One clear photo of a person standing or walking, face visible","bestSourcePhoto":["Face visible and reasonably large","Full or three-quarter body if possible","No sunglasses covering the eyes","Original image should not be blurry"],"changes":["Casual 1980s outfit and portable cassette player with foam headphones","Market street","Point-and-shoot film look"],"stays":["Face and identity","Age","Skin tone","Likeness"],"beforeFile":"cassette-player-street-snapshot-before.webp","afterFile":"cassette-player-street-snapshot-after.webp","altSource":"AI-generated photo of a young man with wavy dark hair and a short beard, in a white tee and jeans on a sunny street.","altResult":"AI edit of a sunny 1980s market walk: light-wash denim jacket over a white tee and jeans, orange foam headphones, a small black cassette player, fruit stalls, and vintage cars.","variant":{"id":"cassette-player-street-snapshot-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a candid 1980s street snapshot walking through a city market, shot like a 35mm point-and-shoot photo with visible film grain and slightly off-center framing. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a denim jacket, high-waisted jeans, and white sneakers, with a portable cassette player with foam headphones around the neck. If pose is not preserved, show them mid-walk. Apply {{mood}} color grading in bright afternoon sun with warm faded colors. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Warm nostalgic","background":"Busy 1980s city market street in bright afternoon sun","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"52","id":"80s-aerobics-studio","title":"80s Aerobics Studio","note":"Neon workout look in a mirrored studio","description":"Turn a photo into a bright 1980s aerobics studio portrait with neon workout clothes, a headband, and a pastel mirrored wall.","subject":"Person","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":360,"saved":38,"status":"published","targetSourcePhoto":"One clear photo of a person standing or smiling, face visible","bestSourcePhoto":["Face visible","Standing or three-quarter body works best","Do not use a photo that is only a tight face crop if you want the outfit","Original image should not be blurry"],"changes":["Neon workout outfit and big hair","Mirrored studio","Bright flash and saturated color"],"stays":["Face and identity","Body shape","Age","Skin tone"],"beforeFile":"80s-aerobics-studio-before.webp","afterFile":"80s-aerobics-studio-after.webp","altSource":"AI-generated photo of a smiling young woman with dark hair in a ponytail, in a black tee and leggings.","altResult":"AI edit as a 1980s aerobics portrait in a neon outfit, in a mirrored studio with a pastel backdrop.","variant":{"id":"80s-aerobics-studio-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a 1980s aerobics studio portrait with big hair, a soft glow, and light film grain. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a neon leotard or tracksuit with a headband and leg warmers. If pose is not preserved, pose them mid-stretch. Do not slim or reshape the body. Apply {{mood}} color grading with bright studio flash and saturated colors. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Flashy nostalgic","background":"Mirrored aerobics studio wall with a pastel gradient backdrop","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"53","id":"80s-bedroom-cassette","title":"80s Bedroom Cassette","note":"Flash snapshot on a teenager's bed","description":"Recreate a photo as a casual 1980s bedroom snapshot on the bed, with posters, tapes, and direct flash.","subject":"Person","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":37,"status":"published","targetSourcePhoto":"One clear photo with the face visible, ideally sitting or a relaxed pose","bestSourcePhoto":["Face visible and not turned away","Enough of the body to sit them on a bed","No sunglasses","Original image should not be blurry"],"changes":["Bedroom setting and props","Direct flash","Faded album-print color"],"stays":["Face and identity","Age","Skin tone","Likeness"],"beforeFile":"80s-bedroom-cassette-before.webp","afterFile":"80s-bedroom-cassette-after.webp","altSource":"AI-generated photo of a young man in a grey tee sitting on a bed in a plain room.","altResult":"AI edit of him cross-legged on a geometric 1980s bedspread in a grey tee, with a cassette player and headphones, a dresser of tapes and a lamp, and three faceless neon posters.","variant":{"id":"80s-bedroom-cassette-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a casual 1980s snapshot sitting on a bed, like a print from an old photo album with visible grain. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, keep a simple 1980s casual outfit. If pose is not preserved, seat them on the bed facing the camera. Apply {{mood}} color grading with direct flash, slightly harsh highlights, warm indoor tones, and faded colors. Replace the background with {{background}}, and add abstract or illustrated music and movie posters with no real people, readable text or logos. Do not add extra people, lettering, or logos. Compose for {{ratio}} without cropping the face.","defaults":{"mood":"Warm nostalgic","background":"1980s teenager bedroom with a cassette player, a stack of tapes, and a patterned bedspread","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"54","id":"1985-studio-couple","title":"1985 Studio Couple","note":"Mottled-backdrop couple studio portrait","description":"Turn a couple photo into a 1985 studio portrait with feathered hair, period clothes, and warm faded film, keeping both faces separate.","subject":"Group","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":350,"saved":36,"status":"published","targetSourcePhoto":"One photo of two people, both faces clear and at a similar distance from the camera","bestSourcePhoto":["Both faces visible and sharp","Similar distance from the camera","No sunglasses","Original image should not be blurry"],"changes":["1980s hair and clothing for both","Studio backdrop","Soft flash and faded film color"],"stays":["Each face separately","Each person's age","Each skin tone","Each expression"],"beforeFile":"1985-studio-couple-before.webp","afterFile":"1985-studio-couple-after.webp","altSource":"AI-generated photo of a young couple against a light wall, him in navy and her in lilac.","altResult":"AI edit as a 1985 studio couple portrait, him in a brown tweed blazer with a white shirt and tie, her in a maroon blouse, with feathered hair and a mottled backdrop.","variant":{"id":"1985-studio-couple-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a 1985 professional studio couple portrait with voluminous feathered hair and light film grain. Preserve each person's face separately and do not blend, swap, or beautify features. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress both people in 1980s period clothing. If pose is not preserved, pose them together in a simple frontal studio pose. Apply {{mood}} color grading with soft frontal flash. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Soft sunlit analog warmth with a slightly faded film look","background":"Classic mottled studio backdrop","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"55","id":"80s-film-poster-couple","title":"80s Film Poster Couple","note":"Hand-painted poster of a lead pair","description":"Recreate a couple as the lead pair on a hand-painted 1980s South Asian film poster, with no title text.","subject":"Group","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":360,"saved":35,"status":"published","targetSourcePhoto":"One couple photo with both faces clear","bestSourcePhoto":["Both faces fully visible","The two people clearly distinguishable","No heavy beauty filters","Original image should not be blurry"],"changes":["Poster outfits for each person","Painted sunset backdrop","Saturated print-wear color"],"stays":["Each face separately","Each facial structure","Each skin tone","Each person's age"],"beforeFile":"80s-film-poster-couple-before.webp","afterFile":"80s-film-poster-couple-after.webp","altSource":"AI-generated photo of an older couple, him in glasses and a navy sweater, her in mustard.","altResult":"AI edit of that older couple as a hand-painted 1980s film poster, him in an open denim blazer over a wide-collar printed shirt, her in a magenta saree with gold jhumkas, against a sunset sky.","variant":{"id":"80s-film-poster-couple-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into the lead pair on a hand-painted 1980s South Asian film poster, with painted poster texture and slight print wear. Keep both faces fully recognizable and do not merge or swap features. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress the man in a wide-collar printed shirt, open blazer, thick side-parted hair, and aviator sunglasses pushed up on the head, and dress the woman in a deep magenta chiffon saree with a gold border, big soft curls, bold eyeliner, and gold jhumkas. If pose is not preserved, pose the couple close together. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Leave empty space at the top but do not write any text, lettering, or logos. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Rich saturated sunset colors with painted-poster warmth and slight print wear","background":"Hand-painted sunset sky with empty space at the top","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"56","id":"disposable-camera-date-night","title":"Disposable-Camera Date Night","note":"Harsh-flash roller-rink snapshot","description":"Recreate a couple photo as a candid 1980s disposable-camera snapshot at a roller rink, with harsh flash and neon.","subject":"Group","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":350,"saved":34,"status":"published","targetSourcePhoto":"One photo of two people, both faces clear","bestSourcePhoto":["Both faces visible","Candid or standing pose works","Similar lighting on both faces","Original image should not be blurry"],"changes":["1980s date outfits","Roller rink","Harsh flash and film grain"],"stays":["Each face separately","Each person's age","Each skin tone","Likeness"],"beforeFile":"disposable-camera-date-night-before.webp","afterFile":"disposable-camera-date-night-after.webp","altSource":"AI-generated photo of a couple, him in an olive jacket and her in a rust sweater.","altResult":"AI edit as a harsh-flash disposable-camera snapshot at a neon roller rink, him in a purple, teal and black windbreaker over a white tee, her in a denim jacket, a pink top and a scrunchie.","variant":{"id":"disposable-camera-date-night-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a candid 1980s disposable-camera snapshot of a date night, with slightly off-center framing and visible film grain. Preserve each person's face separately and do not blend or swap features. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in 1980s casual outfits such as a denim jacket, a windbreaker, high-waisted jeans, and a scrunchie. If pose is not preserved, keep them close together as if caught mid-date. Apply {{mood}} color grading with harsh direct on-camera flash, slightly overexposed skin, and a warm color shift. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Flashy nostalgic","background":"Dark roller rink with neon lights","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"57","id":"mall-laser-backdrop-couple","title":"Mall Laser Backdrop Couple","note":"Cheek-to-cheek mall studio portrait","description":"Turn a couple photo into a 1980s mall studio portrait with perms, pastels, and a purple-and-blue laser backdrop.","subject":"Group","intent":"New outfit or theme","requirement":"One photo","tool":"ChatGPT Image","height":340,"saved":33,"status":"published","targetSourcePhoto":"One couple photo, both faces clear and close enough for a cheek-to-cheek crop","bestSourcePhoto":["Both faces visible and sharp","Heads at a similar height","No sunglasses","Original image should not be blurry"],"changes":["Perms, shoulder pads, pastel and satin","Laser backdrop","Soft-focus glossy print"],"stays":["Each face separately","Each expression","Each skin tone","Likeness"],"beforeFile":"mall-laser-backdrop-couple-before.webp","afterFile":"mall-laser-backdrop-couple-after.webp","altSource":"AI-generated photo of a smiling couple, him in an olive shirt.","altResult":"AI edit as a cheek-to-cheek 1980s mall portrait, him in an olive shirt, against a purple-and-blue laser backdrop.","variant":{"id":"mall-laser-backdrop-couple-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a 1980s mall photo-studio couple portrait with a soft-focus glow around the edges and a slightly glossy print look. Treat each person as a separate identity and do not blend features. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, give them big permed hair, shoulder pads, a pastel sweater, and a satin shirt. If pose is not preserved, pose them cheek to cheek. Apply {{mood}} color grading with faded 1980s colors. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Soft nostalgic","background":"Purple and blue laser-beam mall photo-studio backdrop","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"58","id":"combine-two-photos-80s-couple","title":"Two Photos, One 80s Couple","note":"Two photos into one 1980s outdoor couple","description":"Combine two photos into one 1980s outdoor couple photo at golden hour, keeping each face matched to its source.","subject":"Group","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":350,"saved":32,"status":"published","targetSourcePhoto":"Two clear portraits, one of each person, attached in the same message","bestSourcePhoto":["Each face large and sharp","Even lighting on both faces","Straightforward head angles","Original images should not be blurry"],"changes":["Combined couple scene","Period outfits","Matched golden-hour light"],"stays":["Person A's face from photo 1","Person B's face from photo 2","Each hair texture","Each skin tone"],"beforeFile":"combine-two-photos-80s-couple-before-a.webp","afterFile":"combine-two-photos-80s-couple-after.webp","altSource":"AI-generated portrait of a woman with glasses in a blue shirt.","altResult":"AI edit of that portrait into a 1980s outdoor couple photo in a park at golden hour.","variant":{"id":"combine-two-photos-80s-couple-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":2,"inputImageRoles":["person A","person B"],"version":"1.0.0","template":"The upload is two photos of the {{subject}}: the first is person A and the second is person B. Create one new 1980s outdoor couple photograph of them standing side by side, matching lighting and camera angle so they look photographed together, with warm faded film colors, soft grain, and 35mm snapshot framing. Keep person A's face, hair texture, and skin tone exactly as in photo 1, and person B's exactly as in photo 2. Do not mix their features. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress both in 1980s period outfits. If pose is not preserved, stand them side by side. Apply {{mood}} color grading. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add extra people, lettering, or logos. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Warm nostalgic cinematic sunlight with soft vintage tones, gentle film grain, creamy highlights, and cozy shadow depth","background":"Park at golden hour with soft trees","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}},{"n":"59","id":"80s-wedding-album","title":"80s Wedding Album","note":"Formal flash portrait, yellowed print","description":"Recreate a couple photo as a page from a 1980s wedding album, with formal outfits, a floral stage, and a slightly yellowed print.","subject":"Group","intent":"Full scene transformation","requirement":"One photo","tool":"ChatGPT Image","height":360,"saved":31,"status":"published","targetSourcePhoto":"One couple photo with both faces clear","bestSourcePhoto":["Both faces visible","Enough of the body to show formal outfits","Similar distance from the camera","Original image should not be blurry"],"changes":["Formal wedding outfits","Floral stage","Yellowed album print and flash"],"stays":["Each face separately","Each person's age","Each skin tone","Likeness"],"beforeFile":"80s-wedding-album-before.webp","afterFile":"80s-wedding-album-after.webp","altSource":"AI-generated photo of a couple, him in a dark shirt and her in a green kurta.","altResult":"AI edit as a 1980s wedding-album portrait, him in a cream sherwani with a red dupatta, her in a red bridal lehenga with gold jewellery, against a floral stage.","variant":{"id":"80s-wedding-album-v1","tool":"ChatGPT Image","mode":"Image edit / transform with uploaded photo","inputImageCount":1,"inputImageRoles":["source photo"],"version":"1.0.0","template":"Edit the uploaded {{subject}} into a page from a 1980s wedding album, with slightly yellowed print, rounded photo corners, and mild film grain. Preserve each person's face separately and do not blend or beautify features. Follow the selected source-preservation settings: {{preserve}}. If clothing is not preserved, dress them in a red bridal lehenga and a cream sherwani. If pose is not preserved, use a formal posed portrait. Apply {{mood}} color grading with on-camera flash and soft shadows behind them. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping either face.","defaults":{"mood":"Warm nostalgic","background":"Floral wedding-stage backdrop","ratio":"4:5 Portrait","keepClothing":false,"keepPose":false},"limitations":["Example people in the before photo are AI-generated, not real people.","Heavy face occlusion can weaken identity fidelity"]}}]};

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

async function seedStyle(client, style, categoryId, sourceUrl, resultUrl) {
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
      ...(style.variant.lastVerified
        ? { lastVerified: style.variant.lastVerified }
        : {}),
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

  const provenance = {
    ...DATA.provenance,
    altSource: style.altSource,
    altResult: style.altResult,
  };
  const assets = [
    {
      id: uuidFromKey("asset:" + style.id + ":card"),
      style_id: styleId,
      kind: "card_pair",
      source_storage_key: sourceUrl,
      result_storage_key: resultUrl,
      alt_text: style.altSource,
      provenance,
      sort_order: 0,
    },
    {
      id: uuidFromKey("asset:" + style.id + ":ex:1"),
      style_id: styleId,
      kind: "example_pair",
      source_storage_key: sourceUrl,
      result_storage_key: resultUrl,
      alt_text: style.altSource,
      provenance,
      sort_order: 1,
    },
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
    const resultPath = path.join(root, "after", style.afterFile);
    if (!fs.existsSync(sourcePath)) throw new Error("Missing " + sourcePath);
    if (!fs.existsSync(resultPath)) throw new Error("Missing " + resultPath);
    const sourceKey = "seed/catalog/editorial/source-" + style.n + ".webp";
    const resultKey = "seed/catalog/editorial/result-" + style.n + ".webp";
    await uploadFile(client, sourcePath, sourceKey);
    await uploadFile(client, resultPath, resultKey);
    const sourceUrl = publicObjectUrl(base, "source-" + style.n);
    const resultUrl = publicObjectUrl(base, "result-" + style.n);
    urls.push(sourceUrl, resultUrl);
    style._sourceUrl = sourceUrl;
    style._resultUrl = resultUrl;
    console.log("uploaded " + style.n + " " + style.id);
  }

  const { data: vintage, error: vintageError } = await client
    .from("categories")
    .select("id")
    .eq("slug", "vintage")
    .maybeSingle();
  if (vintageError) throw vintageError;
  if (!vintage) throw new Error("Vintage category not found in DB");

  for (const style of DATA.styles) {
    const categoryId = vintage.id;
    await seedStyle(client, style, categoryId, style._sourceUrl, style._resultUrl);
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
