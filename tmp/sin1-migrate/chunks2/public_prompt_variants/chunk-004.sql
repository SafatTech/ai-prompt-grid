insert into public.prompt_variants (id, style_id, tool, mode, input_image_count, input_image_roles, version, template, variables, settings, test_record, is_primary, status, created_at, updated_at) values
('7e37c446-0e01-5212-9955-83e39fb19d7f', '85afabc5-1fc4-5234-9f3e-c29215a44f54', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a bright cinematic outdoor portrait surrounded by daisies while preserving the subject’s recognizable identity, facial structure, natural skin texture, hair characteristics, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

If clothing is not preserved, replace the original outfit with a deep navy or midnight-blue zip-front hoodie with a softly structured hood. Keep the styling casual, youthful, minimal, and slightly sporty. Add a subtle dark backpack strap over one shoulder and, if suitable, a small simple hoop earring and a single white wireless earbud for a relaxed modern lifestyle feel.

If pose is not preserved, create a low-angle close portrait photographed from among the flowers. Position the subject from approximately the chest upward, with the camera placed below face level and tilted gently toward the sky. Raise the chin slightly and turn the head a little to one side. Keep the eyes softly closed or nearly closed and use a calm, peaceful, content expression with relaxed lips. The pose should feel spontaneous, sunlit, and quietly confident rather than formally posed.

Keep the subject’s hair natural but allow it to become lightly windswept and textured. Let several strands lift or move around the top and sides of the head to reinforce the outdoor breeze. Preserve the subject’s natural hair color, density, and overall identity.

Apply {{mood}} color grading consistently across the image. Use saturated but realistic blue sky tones, warm golden sunlight on the skin, deep navy clothing, creamy white daisy petals, fresh green stems, and clean natural contrast. Preserve realistic skin pores, subtle facial texture, individual hair strands, natural lips, and authentic tonal variation. Avoid plastic skin, excessive sharpening, or heavy glamour retouching.

Create {{background}}. Place the subject outdoors beneath a vivid open blue sky with a few soft white clouds and surrounded by a field or dense cluster of white daisies with yellow centers. Keep the environment natural, uplifting, and uncluttered.

Place several daisies very close to the camera along the bottom and side edges of the frame. Use shallow depth of field so some foreground flowers become large, soft, and partially blurred while midground daisies remain more recognizable. The foreground flowers should create a strong sense of depth and make the camera feel physically positioned inside the flower patch.

Use warm direct sunlight from a low side angle, similar to late-afternoon or golden-hour sunlight. Let the light strongly illuminate the cheekbones, nose, lips, neck, and parts of the hair while producing realistic sculpted shadows beneath the jaw and around the hood. Keep the sunlight warm without making the scene excessively orange.

Let the sunlight create subtle rim highlights around the windswept hair and soft luminous edges on some daisy petals. Preserve bright sky detail and avoid blowing out the highlights.

Use a wide-angle or moderately wide portrait-lens perspective from below. The low viewpoint should make the sky expansive and place the subject confidently above the surrounding flowers while maintaining believable facial proportions.

Use shallow-to-moderate depth of field. Keep the face, upper clothing, and selected midground flowers crisp while allowing the closest daisies and distant clouds to soften naturally. Add subtle photographic grain and gentle highlight roll-off for a polished lifestyle-editorial finish.

The finished portrait should feel fresh, peaceful, youthful, free-spirited, sun-drenched, and cinematic, like a candid moment captured while resting in a meadow on a clear day.

Frame the subject from approximately the chest upward, leaving substantial open sky around the head. Let daisies rise naturally into the lower foreground and partially overlap the clothing without obscuring the face.

Do not add text, logos, watermarks, social-media interface elements, play icons, borders, extra people, duplicated flowers, extra fingers, distorted facial features, malformed earbuds, floating objects, or unrealistic anatomy.

Compose and crop the final image specifically for {{ratio}}, keeping the full face, hair, neck, hoodie, foreground daisies, and enough blue sky comfortably visible inside the frame.', "{\"defaults\":{\"mood\":\"Bright sunlit cinematic outdoor color with vivid sky blue, warm golden skin highlights, deep navy tones, creamy whites, and fresh natural greens\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Open vivid blue sky with scattered soft white clouds, surrounded by a dense field of white daisies with yellow centers and large blurred flowers close to the lens\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:15:30.539552+00:00', '2026-09-25T20:15:30.539552+00:00'),
('97ad6208-d864-571f-8c2f-aa56b3c144c4', 'c3de7213-dfd0-5abd-8b74-e648b5df6090', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a cinematic three-panel editorial portrait collage while preserving the subject’s recognizable identity, facial structure, natural skin texture, hair characteristics, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

Create one cohesive portrait composed of three horizontal photographic panels stacked vertically. Each panel should show the same subject in a different close-up pose while maintaining identical identity, hairstyle, wardrobe, lighting direction, and overall photographic treatment.

If clothing is not preserved, replace the original outfit with a dark chocolate-brown or near-black collared shirt or lightweight jacket with a relaxed open neckline. Keep the styling minimal, masculine, understated, and editorial. Add subtle accessories such as a small hoop earring and a thin chain necklace only if they support the look.

If pose is not preserved, create three complementary portrait variations:

Top panel: show a close frontal or slightly three-quarter head-and-shoulders portrait with the subject facing mostly toward the camera. Keep the expression serious, calm, and slightly intense, with relaxed lips and direct or nearly direct eye contact.

Middle panel: turn the upper body and head more strongly to one side, creating an over-the-shoulder or strong three-quarter profile. Direct the eyes back toward the camera or slightly past it. Keep the jawline pronounced and the expression composed and self-assured.

Bottom panel: create the tightest close-up, cropping closer around the face and shoulders. Let a few strands of hair fall across the forehead or near one eye, and use an intense sideways gaze or direct stare to produce a more dramatic editorial mood.

Style the hair with slightly wet, tousled, textured movement. Preserve the subject’s natural hair color and overall structure while allowing loose strands and subtle volume around the forehead. If facial hair is present, keep it natural and consistent rather than removing or exaggerating it.

Apply {{mood}} color grading consistently across all three panels. Use warm amber-brown skin highlights, muted earthy tones, deep chocolate clothing, rich soft shadows, and strong but controlled cinematic contrast. Preserve realistic pores, facial hair, lip texture, eyebrow detail, and individual hair strands. Avoid excessive smoothing or artificial beauty-filter effects.

Create {{background}}. Use a simple matte beige, tan, or warm taupe wall behind the subject. Keep the background minimal and uncluttered so the face and shadow patterns remain dominant.

Use strong direct sunlight or hard directional studio light coming from one side of the frame. Allow the light to strike the subject’s face and hair while creating a bold, clearly defined cast shadow of the head and shoulders on the wall behind. The cast shadow should be an important visual element in all three panels.

Keep the illuminated areas warm and dimensional while preserving enough detail in the shadowed side of the face. Use realistic highlights along the cheekbones, brow, nose bridge, lips, jawline, and hair. Avoid flat studio lighting.

Maintain the same lighting direction and wall color in all three frames so the collage feels like one continuous editorial photo session.

Use shallow depth of field and a premium portrait-photography aesthetic. Keep the eyes, face, hair, and nearby clothing details crisp while the plain wall remains softly rendered. Add very subtle analog film grain and gentle tonal softness for a polished but slightly vintage finish.

Separate the three horizontal photographs with extremely thin, subtle divider lines or clean edge transitions. Do not add decorative graphic frames, text, captions, or scrapbook elements.

The final composition should feel masculine, warm, minimal, intense, sophisticated, and cinematic, similar to a high-fashion portrait contact sheet or editorial campaign.

Do not add text, logos, watermarks, social-media interface elements, gallery icons, extra people, mismatched identities between panels, duplicated facial features, malformed ears, distorted jewelry, extra limbs, or unrealistic facial anatomy.

Compose and crop the complete three-panel collage specifically for {{ratio}}, keeping all three faces, hairstyles, shoulders, and important cast shadows comfortably visible within the canvas.', "{\"defaults\":{\"mood\":\"Warm cinematic amber-brown editorial with rich skin highlights, deep chocolate shadows, muted earth tones, and subtle film grain\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Minimal matte warm beige wall with strong directional sunlight and sharply defined head-and-shoulder cast shadows\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:15:34.995509+00:00', '2026-09-25T20:15:34.995509+00:00'),
('df63833a-637f-5d45-8dbe-2b8b65f0410c', 'cb1ffeb8-3621-5d33-87e8-a4e409cb18c3', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a playful mixed-media scrapbook collage while preserving the subject’s recognizable identity, facial structure, natural skin tone, and defining features. Follow the selected preservation requirements exactly: {{preserve}}.

Create one polished vertical collage that combines a realistic central fashion portrait of the subject with several smaller stylized chibi-like versions of the same person arranged around it. Every version must clearly represent the same subject through consistent facial features, hair, skin tone, and styling cues.

If clothing is not preserved, style the subject in a crisp white button-up blouse with a relaxed open collar, high-waisted beige tailored trousers, simple white sneakers, and elegant oversized gold hoop earrings. Keep the outfit clean, modern, soft, and neutral.

For the main central portrait, keep the subject mostly realistic and full-length, standing naturally with one or both hands resting casually in the trouser pockets. Use a calm confident expression, relaxed shoulders, and a polished lifestyle-fashion posture.

If pose is not preserved, create several surrounding mini-scenes using exaggerated cute chibi proportions: slightly oversized head, expressive large eyes, softened facial features, and a smaller body while still retaining the subject’s recognizable identity.

Include approximately five to seven surrounding mini portraits or character moments, such as:
- an energetic jumping pose with arms spread wide and a joyful expression,
- a relaxed seated pose wearing dark sunglasses,
- a cheerful peace-sign pose,
- a playful close-up holding a green smoothie or juice,
- a cozy portrait hugging a small fluffy dog,
- a dreamy chin-in-hands pose,
- and one additional smiling or candid lifestyle pose.

Keep the hairstyle consistent across the collage. If needed, style the hair into a half-up messy bun with long flowing texture around the shoulders, matching both the realistic central portrait and the stylized mini versions.

Apply {{mood}} color grading across the entire composition. Use warm soft daylight, creamy beige tones, clean whites, muted blush accents, subtle greenery, and a light editorial finish. Keep the central portrait realistic and naturally lit, while allowing the surrounding chibi portraits to have a slightly more illustrated, glossy, doll-like finish.

Create {{background}} as a layered editorial scrapbook page. Use torn cream paper, off-white paper textures, taped photo corners, tilted Polaroid-style frames, paper scraps, faint handwritten doodles, hearts, and subtle black line accents. Include a few lightly blurred outdoor greenery backgrounds inside some photo frames so the collage feels like a collection of lifestyle snapshots.

Add small handwritten note snippets or mini caption cards around the collage, styled like casual journal notes. Keep any visible text short, decorative, and secondary to the images. Use a few tiny hearts, check marks, doodles, and simple motivational phrases to enhance the scrapbook feel without overcrowding the composition.

Keep the main realistic portrait centered and dominant. Arrange the chibi versions around the edges and corners so they frame the central figure without blocking the face or clothing. Use overlapping paper layers, soft contact shadows, tape pieces, and subtle depth to make the page feel handcrafted.

Use clean daylight portrait photography for the main figure, with realistic skin texture, natural fabric folds, and soft depth separation. For the mini versions, maintain consistent identity while allowing more exaggerated eyes, compact proportions, and cute expressive poses.

Do not add social-media UI, play buttons, carousel indicators, watermarks, brand logos, unrelated people, inconsistent identities, extra limbs, malformed hands, distorted faces, duplicate features, or cluttered decorative elements.

Compose the entire collage specifically for {{ratio}}, keeping the central full-body portrait, all surrounding mini portraits, doodles, notes, and scrapbook elements comfortably inside the frame without awkward cropping.', "{\"defaults\":{\"mood\":\"Soft warm lifestyle daylight with creamy beige neutrals, clean whites, muted blush accents, gentle greens, and playful polished contrast\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Layered cream scrapbook page with torn paper, tilted Polaroid frames, tape pieces, handwritten doodles, tiny hearts, casual note cards, and soft outdoor greenery inside selected photo frames\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:15:39.560752+00:00', '2026-09-25T20:15:39.560752+00:00'),
('f64ecf19-70c8-5079-a6ef-909a4be92a09', 'd81e5a10-9011-536d-8a29-864f9edaf947', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a warm cinematic four-panel lifestyle collage while preserving the subject’s recognizable identity, facial structure, natural skin texture, hair characteristics, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

Create a polished four-image collage arranged in a clean two-by-two grid with thin white divider lines between the panels. Each panel should show the same subject in a different candid lifestyle moment while maintaining identical identity, styling, color treatment, and overall photographic mood.

If clothing is not preserved, dress the subject in a relaxed boho-casual outfit: a brown or rust-toned sleeveless floral camisole or peplum-style top with a soft feminine silhouette, paired with light or medium-wash blue jeans. Add stacked metallic bangles on one wrist, a few simple rings if suitable, and a woven off-white or beige shoulder bag. Keep the styling youthful, natural, casual, and slightly bohemian.

If pose is not preserved, create these four coordinated panels:

Top-left panel: show a full or three-quarter walking portrait outdoors on a quiet sunlit street lined with trees and boundary walls. Let the subject walk naturally while looking off to one side with a soft relaxed smile.

Top-right panel: show a seated close portrait of the subject reading a dark-covered poetry or journal-style book. Frame it from about the waist or knees upward, with the book held near the face and one knee drawn upward casually. Add a few tiny decorative emoji-like accents nearby, such as a red heart, a white dove, and a yellow crescent moon, keeping them subtle and playful.

Bottom-left panel: show a close detail shot focused on the subject’s hand resting naturally on denim-clad legs or lap. Emphasize stacked bangles, warm-toned nail polish, fabric texture, and the floral print of the top.

Bottom-right panel: show a back-view walking portrait on the same sunlit tree-lined street, with one hand raised into the hair. Let the woven shoulder bag hang naturally from one shoulder.

Keep the subject’s hair long, loose, and naturally wavy with soft volume and movement. Preserve the natural hair color while allowing light to catch highlights in the strands. Keep the hairstyle consistent across all panels.

Apply {{mood}} color grading consistently across the collage. Use warm golden sunlight, earthy brown and rust tones, creamy highlights, muted greenery, sunlit skin tones, and gentle nostalgic contrast. Preserve realistic pores, hair strands, natural fabric texture, and authentic tonal variation. Avoid plastic smoothing or overly glamorous retouching.

Create {{background}}. The setting should feel like a peaceful residential or neighborhood street with leafy trees, sun filtering through branches, light-colored walls or fences, and a calm everyday outdoor atmosphere. For the reading panel, keep the same outdoor environment or a closely matching natural setting so the collage still feels coherent.

Use strong natural sunlight filtered through tree leaves, creating soft dappled light and shadow on the ground, walls, subject, and clothing. The lighting should feel warm, summery, cozy, and lifestyle-editorial rather than studio-like.

Use shallow-to-moderate depth of field. Keep the subject crisp in each panel while softly blurring distant street details. Let the hand-detail panel emphasize textures sharply, including skin, jewelry, denim, and floral fabric.

Keep the collage clean, balanced, and visually calm. Each frame should feel like a different memory from the same golden afternoon, with the overall layout reading as a cohesive story rather than unrelated images.

Do not add social-media interface elements, play buttons, watermarks, logos, random extra people, distorted hands, duplicate limbs, mismatched identities between panels, malformed jewelry, or cluttered graphic decorations.

Compose the final artwork specifically for {{ratio}}, keeping all four panels, the subject, hand detail, book, woven bag, and sunlit street moments comfortably visible within the canvas.', "{\"defaults\":{\"mood\":\"Warm nostalgic golden-hour lifestyle with earthy brown tones, sunlit skin, creamy highlights, muted greens, and soft cinematic contrast\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Peaceful tree-lined residential street with sun-dappled pavement, light boundary walls, leafy shadows, and a calm boho outdoor atmosphere\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:15:43.970687+00:00', '2026-09-25T20:15:43.970687+00:00'),
('71396525-a450-5631-ac2a-11578527e2f4', '4ec344c5-57b2-57a0-860f-0b12ab97428d', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into an elegant four-panel cinematic portrait collage while preserving the subject’s recognizable identity, facial structure, natural skin texture, hair characteristics, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

Create one cohesive four-image editorial collage arranged as a clean two-by-two grid with thin, subtle divider lines. Every panel must show the same subject with consistent identity, hairstyle, wardrobe, jewelry, lighting direction, and photographic treatment.

If clothing is not preserved, replace the original outfit with a rich royal or cobalt-blue saree made from soft flowing fabric, paired with a matching fitted blouse with short puff sleeves or gently structured sleeves. Keep the saree elegant, refined, and lightly translucent in the draped sections. Add ornate silver jhumka-style earrings, a delicate small pendant necklace, and subtle matching bangles if visible. Include a tiny understated bindi for a traditional editorial finish.

If pose is not preserved, create four complementary portraits:

Top-left panel: show the subject seated gracefully on old stone steps or beside a historic stone wall, holding a compact bouquet of deep crimson-red roses in both hands. Keep the body relaxed, feet naturally placed, and let the subject look slightly away from the camera with a soft calm smile.

Top-right panel: create a close beauty portrait from approximately the chest upward. Let the subject lower the gaze slightly with a gentle smile, highlighting the silver earrings, natural skin texture, subtle makeup, bindi, and the translucent blue saree drape across the shoulder. Keep the face softly lit and intimate.

Bottom-left panel: create a closer front-facing portrait with the bouquet of red roses raised near the lower foreground. Let the subject look toward the camera with a composed, warm expression. Keep the roses richly detailed and the face crisp, with shallow depth of field behind.

Bottom-right panel: show a full or three-quarter standing portrait beneath a grand heritage archway or historic stone structure. Let the subject hold the bouquet at waist level while the saree pallu lifts and flows outward to one side in a gentle breeze, creating graceful motion. Keep the architecture symmetrical and cinematic without overpowering the subject.

Keep the hairstyle long, loose, smooth, and softly flowing with natural volume. Preserve the subject’s natural hair color and texture while allowing slight movement from the breeze in the wider panels.

Apply {{mood}} color grading consistently across all four panels. Use warm natural skin tones, deep royal-blue fabric, saturated crimson roses, soft sandstone and taupe architecture, and clean luminous highlights. Add subtle golden warmth in the skin and stone while keeping the blue saree vibrant and elegant.

Create {{background}}. Interpret it as an old heritage or palace-like architectural setting with weathered stone steps, carved archways, textured walls, and warm historic masonry. Keep the environment photorealistic, uncluttered, and softly softened by depth of field where appropriate.

Use soft directional natural light, similar to late-afternoon sunlight entering a shaded heritage courtyard. Let the light gently shape the face, hair, saree folds, bouquet, and stone textures. Avoid harsh flat lighting. Preserve highlight detail in the blue fabric and roses.

Use shallow-to-moderate depth of field in the close portraits and slightly deeper focus in the wider architectural panels. Keep the face, jewelry, bouquet, and saree texture sharp while allowing distant stone details to soften naturally.

Add very subtle editorial polish such as fine photographic grain, restrained highlight bloom, and soft contrast. In one close panel, a few tiny warm spark-like glints may appear near the lower saree edge, but keep them minimal, elegant, and realistic rather than magical or decorative.

The collage should feel romantic, regal, cinematic, traditional, and polished, like a fashion story photographed at a historic palace or heritage monument.

Do not add social-media interface elements, play buttons, watermarks, logos, extra people, inconsistent identities between panels, duplicated jewelry, malformed flowers, extra hands, distorted fingers, warped architecture, or excessive fantasy effects.

Compose and crop the complete collage specifically for {{ratio}}, keeping all four panels, faces, roses, jewelry, saree drape, stone steps, and archway comfortably visible within the canvas.', "{\"defaults\":{\"mood\":\"Warm heritage cinematic color with rich royal blue, deep crimson roses, natural golden skin tones, soft sandstone neutrals, and refined contrast\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Historic sandstone courtyard with old stone steps, textured heritage walls, carved archways, and softly blurred palace architecture\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:15:48.57661+00:00', '2026-09-25T20:15:48.57661+00:00')
on conflict do nothing;