insert into public.prompt_variants (id, style_id, tool, mode, input_image_count, input_image_roles, version, template, variables, settings, test_record, is_primary, status, created_at, updated_at) values
('69b82d35-0558-5737-a2ca-83b8e943b231', '3052781d-297a-5dee-8625-c14c578d32e0', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into an elegant cinematic black-and-white beauty portrait while preserving the subject’s recognizable identity, facial structure, natural skin texture, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

If clothing is not preserved, replace the original outfit with a luxurious glossy satin or silk blouse in a light reflective tone, styled with a relaxed open collar and refined evening-fashion appearance. Add minimal elegant jewelry such as small hoop earrings and a delicate necklace. Keep the wardrobe sophisticated, understated, and premium rather than heavily embellished.

If pose is not preserved, reposition the subject into a graceful close-up editorial pose with the head turned slightly downward and toward one side, eyes softly closed or lowered, shoulders relaxed, and a subtle natural smile. The pose should feel candid, intimate, serene, and effortless rather than formal or rigid.

Style the hair with soft natural volume and loose flowing movement around the face and shoulders. Keep the hairstyle elegant and slightly windswept, with individual strands visible around the silhouette. Preserve the subject’s natural hair characteristics while allowing the styling to become fuller and more cinematic.

Apply {{mood}} color grading to the entire image. Render the portrait primarily in rich monochrome black and white with smooth silver-gray tonal separation, luminous highlights, deep blacks, soft midtones, and refined cinematic contrast. Keep the skin realistic and detailed with visible natural texture while avoiding plastic smoothing, exaggerated retouching, or artificial beauty-filter effects.

Create {{background}}. Keep the environment dark, minimal, and softly out of focus so the face and hair remain dominant. Use a powerful backlight positioned behind and slightly above the subject to produce a bright silver rim around the outer edges of the hair, shoulders, and clothing. Let the strongest glow pass through individual hair strands, creating luminous separation from the dark background.

Use soft frontal or side fill lighting on the face so facial features remain clearly visible despite the strong backlight. Maintain delicate shadow transitions across the cheeks, jawline, nose, eyelids, and neck. The result should feel like a premium monochrome fashion photograph captured with professional studio lighting.

Introduce subtle cinematic bloom around the brightest backlit areas, fine photographic grain, gentle atmospheric particles or dust in the distant background, and a shallow depth of field. Keep the face, eyelashes, lips, hair near the face, jewelry, and foreground clothing sharply resolved while allowing the outer background to remain soft.

Frame the subject as a close portrait from approximately the chest or shoulders upward. Keep the face large in the composition with enough surrounding space for the glowing rim light and flowing hair to remain visible. Avoid overly tight cropping around the hair or chin.

Do not add text, logos, watermarks, phone-interface elements, carousel arrows, social-media icons, borders, extra people, duplicated jewelry, malformed clothing, distorted facial features, extra limbs, or unnatural hair artifacts.

Compose and crop the final image specifically for {{ratio}}, maintaining a polished editorial composition without awkwardly cropping the top of the hair, earrings, shoulders, neckline, or important facial details.', "{\"defaults\":{\"mood\":\"High-contrast cinematic monochrome with luminous silver highlights and deep soft blacks\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Dark minimal studio background with subtle grain, faint atmospheric particles, soft distant bokeh, and strong backlight creating a glowing silver rim around the hair\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:14:44.566536+00:00', '2026-09-25T20:14:44.566536+00:00'),
('da872d44-cd64-59ba-be21-cf9d938dc267', 'f18be902-49c0-5119-8775-e2f3b1995251', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into an intimate cinematic floral beauty portrait while preserving the subject’s recognizable identity, facial structure, natural skin texture, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

If clothing is not preserved, replace the original outfit with a soft ivory or white romantic blouse featuring delicate lace, embroidery, or lightly textured fabric around the shoulders and neckline. Keep the wardrobe elegant, minimal, and secondary to the face and flowers.

If pose is not preserved, reposition the subject into a very close beauty portrait with the face turned slightly toward the camera, chin relaxed, and eyes looking naturally toward the lens with a soft, calm, subtly confident expression. Keep the pose intimate and candid rather than formal.

Place a large deep-crimson rose immediately below and beside the subject’s lips, close enough to become a dominant foreground element without hiding important facial features. Surround the rose and one side of the face with clusters of tiny white baby’s-breath flowers and delicate branching stems.

Style the subject’s hair with loose natural movement around the face. Allow a few fine strands to fall across the forehead, cheek, or eye area in a deliberately imperfect, windswept way while keeping the subject’s identity and both eyes recognizable.

Apply {{mood}} color grading throughout the portrait. Preserve warm natural skin tones, rich deep-red flower tones, crisp white floral highlights, dark hair contrast, and dramatic sunlit warmth. Keep pores, fine skin detail, lips, eyelashes, and subtle tonal variation realistic. Avoid plastic skin, excessive smoothing, or artificial beauty-filter effects.

Create {{background}}. Keep it simple, dark, cool-toned, softly blurred, and visually unobtrusive so the face and flowers remain dominant. The setting should feel like an outdoor or window-lit environment with strong natural depth separation and no distracting scenery.

Use strong direct late-afternoon sunlight entering from one side of the frame. Let the light strike the subject’s face, rose, hair, and flowers sharply while producing distinct organic shadows from flower stems, petals, leaves, and loose hair across the forehead, eyes, cheeks, nose, and lips.

The projected floral shadows are a defining element of the style. They should appear naturally caused by real sunlight and nearby flowers rather than looking painted, composited, or artificial.

Keep one side of the face brightly illuminated and allow the opposite side to fall into deeper natural shadow. Add subtle specular highlights to the eyes and lips, gentle warmth in the skin, and sculpted dimensional contrast around the cheekbones, nose, jawline, and brow.

Render the rose with deep velvety crimson petals, realistic layered folds, rich tonal depth, and visible natural texture. Render the baby’s-breath as numerous small white blossoms on thin branching stems. Some blossoms may remain sharply focused while others fall softly out of focus to create foreground depth.

Use a close-focus editorial photography aesthetic with shallow depth of field, crisp facial detail, realistic lens rendering, subtle photographic grain, gentle highlight roll-off, and natural optical softness in the background.

The overall mood should feel romantic, intimate, sunlit, artistic, and cinematic rather than like a conventional studio headshot.

Frame the portrait tightly from approximately the upper shoulders upward. Let the face occupy most of the composition while flowers enter prominently from the lower-left or lower-center foreground. Preserve enough space around the hairline and shoulders so the portrait feels balanced.

Do not add text, logos, watermarks, social-media interface elements, carousel arrows, borders, extra people, duplicated flowers, malformed petals, distorted facial features, extra limbs, unnatural accessories, or artificial-looking shadows.

Compose and crop the final image specifically for {{ratio}}, keeping the eyes, hairline, lips, rose, flowers, shoulders, and important facial features comfortably inside the frame.', "{\"defaults\":{\"mood\":\"Warm sunlit cinematic contrast with natural skin tones, deep crimson reds, crisp whites, and rich dark shadows\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Dark cool-toned softly blurred outdoor background with minimal detail and strong natural depth separation\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:14:49.154205+00:00', '2026-09-25T20:14:49.154205+00:00'),
('ac3e2500-5c1e-5616-8563-dd58f0f94c97', 'f0793efb-8986-55e5-8702-c587a13e38eb', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into an elegant three-panel cinematic editorial collage while preserving the subject’s recognizable identity, facial structure, natural skin texture, hair characteristics, and defining features. Follow the selected preservation requirements exactly: {{preserve}}.

Create one cohesive portrait made from three separate photographic crops of the same subject. Divide the canvas into three wide diagonal sections using very thin, clean light-colored separator lines. The panels should feel like three moments from the same professional fashion photoshoot rather than three unrelated images.

If clothing is not preserved, style the subject in an elegant ivory traditional formal outfit with delicate gold embroidery, beadwork, sequins, and refined fabric texture. Add tasteful traditional gold jewelry, including ornate round statement earrings and layered decorative bangles. Keep the styling sophisticated, detailed, and realistic.

If pose is not preserved, use a different complementary pose or detail crop in each section:

Top panel: show a close side-profile or three-quarter beauty portrait from approximately the shoulders upward. Turn the subject’s face gently toward nearby flowers with the chin slightly lifted and eyes softly closed or lowered. Keep the expression peaceful and subtly smiling. Let loose natural hair flow around the head and shoulders.

Middle panel: create an extreme beauty close-up focused primarily on one eye, eyebrow, upper cheek, and a small portion of the nose bridge. Preserve the subject’s actual eye shape and facial identity. Use refined natural eye makeup with defined lashes and a subtle eyeliner treatment. Keep pores, eyebrow hairs, eyelashes, and skin texture realistic and sharply resolved.

Bottom panel: show a graceful close-up of one hand and forearm with the palm facing gently upward and fingers naturally relaxed. Decorate the wrist with multiple intricate gold bangles. Include part of the embroidered garment near the edge of the frame so the three panels remain visually connected.

Integrate delicate white jasmine-like blossoms around the subject’s hair in the upper panel, with a small cascading strand positioned naturally near the ear. Include vivid pink-red blossoms close to the face in the upper panel and near the open hand in the lower panel. Keep all flowers botanical and realistic, with natural stems, petal shapes, and believable scale.

Apply {{mood}} color grading consistently across all three panels. Keep skin realistic and dimensional, preserve fine facial and hair detail, maintain controlled highlight roll-off, and avoid excessive skin smoothing or artificial beauty-filter effects.

Use directional natural-looking light that creates a luminous edge around individual hair strands, delicate highlights on jewelry and embroidery, and soft sculpting across the face and hand. Keep the three sections consistent in lighting direction and photographic treatment so they clearly belong to the same shoot.

Create the environment from {{background}}. Render it with strong shallow depth of field, smooth circular bokeh, gentle tonal separation, and enough blur that the subject, flowers, jewelry, and clothing remain the visual focus. Do not introduce distracting recognizable people or unnecessary objects.

Use a premium editorial photography aesthetic with realistic full-frame-camera rendering, shallow depth of field, crisp focal details, subtle optical softness outside the focal plane, fine photographic texture, and restrained cinematic polish.

Keep the diagonal separators extremely thin and elegant. Do not use thick borders, decorative frames, text boxes, or graphic-design elements beyond the three photographic sections and their narrow separators.

The final collage should feel romantic, refined, celebratory, intimate, and fashion-editorial while remaining photorealistic. Each panel should reveal a different detail of the same person: overall beauty and floral styling, expressive eye detail, and graceful jewelry-adorned hand detail.

Do not add text, logos, watermarks, social-media interface elements, carousel arrows, pagination dots, UI icons, duplicate faces, mismatched identities between panels, extra hands, malformed fingers, duplicated jewelry, distorted flowers, or inconsistent clothing.

Compose the complete collage specifically for {{ratio}}, keeping the important face, eye, flowers, hand, jewelry, and clothing details comfortably inside the canvas and ensuring all three diagonal panels remain clearly visible.', "{\"defaults\":{\"mood\":\"Warm golden-hour romantic editorial with softly luminous skin, rich natural contrast, creamy highlights, and elegant warm tones\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Soft sunlit garden greenery with warm natural bokeh and distant foliage completely out of focus\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:14:53.771747+00:00', '2026-09-25T20:14:53.771747+00:00'),
('abefb3d3-b50c-5520-bf5b-bcb5fd5bc0d3', 'b9e3cc93-953b-508e-94d6-bc0ccd1bb7db', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a warm, romantic cinematic floral portrait while preserving the subject’s recognizable identity, facial structure, natural skin texture, hair characteristics, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

If clothing is not preserved, replace the original outfit with an elegant ivory, cream, or champagne-toned off-shoulder dress or softly draped formal garment. Keep the fabric refined, lightly luminous, and romantic without excessive ornamentation. The clothing should complement the warm floral palette and remain secondary to the subject’s face and bouquet.

If pose is not preserved, reposition the subject into a close upper-body portrait with the torso angled slightly away from the camera and the head tilted gently downward toward a large bouquet held close to the chest. Keep the shoulders relaxed, eyes softly lowered or closed, and create a natural joyful smile as though the subject is quietly admiring the flowers. The pose should feel candid, affectionate, graceful, and emotionally warm rather than staged.

Style the hair with soft natural volume and loose flowing waves around the face and shoulders. Allow a few fine strands to catch the backlight for a realistic luminous edge. Keep the hairstyle elegant but slightly effortless rather than highly structured.

Place a large lush bouquet prominently in the lower foreground. Build the arrangement from deep crimson-red roses, soft blush and pale peach roses, small delicate filler flowers, muted burgundy accents, and natural eucalyptus or dusty-green foliage. Make the bouquet abundant, layered, photorealistic, and slightly asymmetrical, with some flowers closer to the lens to create depth.

Apply {{mood}} color grading throughout the image. Use glowing amber highlights, warm caramel midtones, rich burgundy and crimson floral tones, creamy skin highlights, and deep soft brown shadows. Preserve natural skin texture, pores, subtle facial variation, realistic lips, and individual hair strands. Avoid plastic skin, excessive smoothing, or artificial beauty-filter effects.

Create {{background}}. Keep the environment dark, intimate, softly blurred, and elegant, with subtle hints of warm decorative lights, distant floral shapes, or indistinct interior details. The background should never compete with the subject and bouquet.

Use strong warm directional lighting from behind and slightly to one side of the subject, producing a golden rim light around the hair, shoulder, and bouquet edges. Add soft warm frontal fill so the face remains beautifully visible while retaining dimensional shadows. Let the strongest highlights glow naturally on loose hair strands, rose petals, and the subject’s shoulder.

The lighting should resemble late-afternoon golden light or warm cinematic event lighting in a dark interior. Maintain deep shadow areas around the background while letting the face, hair, bare shoulder, and bouquet emerge from the darkness with soft luminous contrast.

Use shallow depth of field so the face and key flowers remain crisp while the outer bouquet, background lights, and distant details transition smoothly into creamy blur. Add subtle optical bloom around bright highlights, fine photographic grain, soft highlight roll-off, and realistic full-frame-camera depth.

Keep the expression gentle and authentic. The subject should appear to be sharing a private happy moment with the flowers rather than posing directly for a formal portrait.

Frame the image from approximately the waist or upper torso upward. Let the bouquet occupy a substantial portion of the lower half of the composition while the face remains clearly visible above it. Maintain enough space around the hair and shoulders for the warm rim light to remain visible.

Do not add text, logos, watermarks, video play buttons, mute icons, social-media controls, carousel arrows, borders, extra people, duplicated flowers, malformed petals, extra fingers, distorted hands, duplicated limbs, or unnatural facial features.

Compose and crop the final image specifically for {{ratio}}, keeping the face, hairstyle, shoulders, bouquet, and important flower details comfortably inside the frame.', "{\"defaults\":{\"mood\":\"Warm cinematic amber glow with rich burgundy reds, creamy highlights, caramel skin tones, and deep soft shadows\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Dark intimate indoor setting with softly blurred warm decorative lights, subtle floral shapes, and deep cinematic bokeh\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:14:58.479888+00:00', '2026-09-25T20:14:58.479888+00:00'),
('c8078f96-f382-5345-992d-9b018f3e4046', 'df9e8888-2c43-513d-a5b6-e0fe5e5ef8cf', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a playful editorial scrapbook-style portrait collage while preserving the subject’s recognizable identity, facial structure, natural skin texture, hair characteristics, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

Build the final composition as a handcrafted visual diary made from several different photographs of the same subject arranged across one vertical scrapbook page. Keep the same person consistent in every photo crop, with matching facial identity, hairstyle, skin tone, and wardrobe throughout the collage.

If clothing is not preserved, style the subject in a relaxed pale blush-pink or very light pink-and-white vertically striped button-up shirt with the collar casually open and sleeves rolled to the forearms. Pair it with simple dark trousers and a minimal metallic wristwatch or bracelet. Keep the styling youthful, clean, casual, and understated.

If pose is not preserved, create a varied set of natural lifestyle poses across the collage: one relaxed portrait with a hand running through the hair, one side-profile looking away from the camera, one thoughtful seated pose with a hand near the chin, one softly smiling portrait, and one casual standing or leaning pose. Expressions should remain calm, friendly, confident, and candid rather than exaggerated.

Preserve the subject’s natural hairstyle but allow slightly fuller texture and relaxed movement if needed. Keep individual curls or waves sharply defined in the main portraits and avoid changing the person into a different hairstyle or identity.

Apply {{mood}} color grading consistently to every embedded photograph. Use soft natural daylight, lightly warm skin tones, muted blush-pink clothing, gentle blue accents, creamy whites, subtle film softness, and clean youthful contrast. Keep skin realistic and preserve pores, facial texture, hair strands, and natural tonal variation.

Create {{background}} as the scrapbook canvas itself. Use a light off-white graph-paper or notebook-paper surface with very faint gray grid lines. Layer photographic cutouts, taped paper scraps, small blue decorative elements, thin botanical drawings, paper clips, pressed-flower details, and subtle hand-drawn doodles around the subject without making the design cluttered.

Arrange approximately five to six photos of the same subject in different sizes. Place two larger cutout portraits near the upper left and upper right, one centered Polaroid-style photograph around the middle, and several overlapping portrait cutouts across the lower half. Let some photographs overlap naturally to create depth while keeping every face clearly visible.

Give the center image a white Polaroid-style border and a slight handmade paper tilt. Add a small pale-blue paper clip near one upper corner of the Polaroid. Other subject photos may be clean cutouts without rectangular backgrounds so they feel layered directly onto the scrapbook page.

Add several torn-paper note cards in pale cream, muted blue, or soft gray-blue tones. Place them at different angles and attach some with realistic pieces of semi-transparent blue or beige masking tape. Notes should look like personal handwritten journal snippets or motivational phrases, but keep any visible writing short, tasteful, legible, and secondary to the portraits.

Include delicate decorative details such as tiny blue hearts, small stars, simple black doodles, thin floral line drawings, clusters of tiny white dried flowers, and a few pale-blue pressed-flower accents. These should feel hand-placed and organic rather than like glossy digital stickers.

Use natural outdoor daylight inside the individual photographs, with soft greenery or sunlit environmental blur behind some portraits. Maintain shallow depth of field inside each photo while keeping the scrapbook canvas itself flat and paper-like.

Create believable paper texture, slightly imperfect torn edges, soft contact shadows beneath overlapping photographs and notes, subtle tape translucency, and realistic printed-photo texture. The collage should feel tactile and handmade while still looking polished enough for a modern editorial social-media aesthetic.

Keep the overall layout airy and balanced. Use the subject portraits as the main visual hierarchy, with the centered Polaroid acting as the anchor. Leave enough negative space between decorative elements so the composition does not become visually noisy.

Do not add video play buttons, mute icons, carousel indicators, social-media interface elements, watermarks, brand logos, large typography, extra unrelated people, mismatched versions of the subject, duplicated facial features, malformed hands, distorted limbs, or random decorative clutter.

Compose the complete scrapbook artwork specifically for {{ratio}}, keeping all major faces, the center Polaroid, torn notes, and important decorative details comfortably inside the canvas without awkward edge cropping.', "{\"defaults\":{\"mood\":\"Soft pastel scrapbook daylight with warm natural skin tones, blush pink, creamy white, muted sky blue, and gentle film softness\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Off-white graph-paper scrapbook page with faint grid lines, torn paper notes, pale-blue tape, small doodles, paper clips, delicate dried flowers, blue botanical accents, and layered photo cutouts\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:15:03.068327+00:00', '2026-09-25T20:15:03.068327+00:00')
on conflict do nothing;