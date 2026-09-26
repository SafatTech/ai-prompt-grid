insert into public.prompt_variants (id, style_id, tool, mode, input_image_count, input_image_roles, version, template, variables, settings, test_record, is_primary, status, created_at, updated_at) values
('18916dbd-b623-54bf-b18a-9ffa6a319ad5', '1763d1f4-3819-5590-a4dd-3e8554154a22', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a glamorous monochrome evening portrait while preserving the subject’s recognizable identity, facial structure, natural skin texture, hair characteristics, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

If clothing is not preserved, replace the original outfit with an elegant black evening look featuring a fitted spaghetti-strap or sleeveless top with a clean neckline. Add one long sheer black mesh glove extending from the hand to above the elbow on the arm closest to the face. Keep the styling minimal, refined, feminine, and sophisticated.

If pose is not preserved, create a close beauty portrait from approximately the upper chest upward. Angle the shoulders slightly away from the camera while turning the face gently back toward the lens. Rest the gloved hand softly against the cheek or jawline, with the fingers relaxed and naturally curved. Keep the head slightly tilted and use a warm, confident, elegant smile with direct eye contact.

Style the hair in a polished updo or loosely pinned evening hairstyle with soft volume at the crown and a few delicate face-framing strands. Preserve the subject’s natural hair color and texture while giving it a refined formal finish.

Add elegant floral or crystal stud earrings and a very delicate necklace with a small sparkling pendant. Keep the jewelry subtle enough to complement the portrait without becoming the main focus.

Apply {{mood}} color grading across the entire image. Render the portrait in luxurious black and white with luminous skin highlights, rich black clothing, soft silver-gray midtones, glossy lips, and deep but controlled shadows. Preserve realistic pores, eyelashes, eyebrow hairs, fine facial texture, individual hair strands, and natural skin detail. Avoid plastic smoothing or heavy glamour retouching.

Create {{background}}. Use a dark, softly blurred indoor evening setting with minimal recognizable detail. Include a few small circular out-of-focus lights or soft luminous highlights in the distance to create subtle cinematic bokeh while keeping the face dominant.

Use flattering soft frontal or three-quarter beauty lighting combined with gentle side shaping. Let the light create luminous highlights across the forehead, cheekbones, nose, lips, shoulders, jewelry, and sheer glove while maintaining dimensional shadows around the jaw and hair.

Keep the sheer glove visibly translucent, with realistic fabric texture and soft diagonal folds across the forearm. Preserve the natural form of the hand beneath the mesh without distorted fingers or unnatural fabric wrapping.

Use shallow depth of field with premium portrait-lens rendering. Keep the eyes, eyelashes, lips, jewelry, facial skin, and nearby glove details sharply resolved while allowing the background to fall into smooth blur.

Add subtle photographic grain, refined highlight bloom, gentle tonal softness, and a polished classic-Hollywood portrait atmosphere. The final image should feel intimate, sophisticated, glamorous, timeless, and cinematic rather than like a standard studio headshot.

Frame the subject tightly but comfortably, leaving enough space around the hair, shoulders, earrings, glove, and hand. Keep the face large in the composition while preserving an elegant balance between the exposed shoulder and the gloved arm.

Do not add time, date, lock-screen elements, text, logos, watermarks, social-media interface elements, play buttons, borders, extra people, duplicate jewelry, extra fingers, malformed hands, distorted facial features, or unrealistic glove anatomy.

Compose and crop the final portrait specifically for {{ratio}}, keeping the face, hairstyle, earrings, necklace, gloved hand, shoulders, and important lighting details comfortably inside the frame.', "{\"defaults\":{\"mood\":\"Luxurious cinematic monochrome with luminous skin, glossy silver highlights, deep elegant blacks, soft gray midtones, and subtle film grain\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Dark elegant indoor evening setting with soft circular bokeh lights, minimal detail, and shallow cinematic depth\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:15:53.152447+00:00', '2026-09-25T20:15:53.152447+00:00'),
('f183a82b-5705-5398-bde8-6602b6ff8087', 'ef927544-f3f2-5925-baba-7e84646ff638', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a warm cinematic four-panel fashion storyboard while preserving the subject’s recognizable identity, facial structure, natural skin texture, hair characteristics, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

Create one cohesive four-image collage arranged in a clean two-by-two grid with thin, subtle divider lines. Every panel must show the same subject with consistent identity, hairstyle, wardrobe, jewelry, lighting direction, and photographic treatment.

If clothing is not preserved, replace the original outfit with an elegant mustard-gold traditional dress or flowing anarkali-style ensemble with delicate embroidered details, subtle beadwork, and a lightweight matching dupatta. Keep the fabric rich, graceful, and slightly luminous in sunlight. Add ornate gold jhumka-style earrings, a small delicate necklace, and minimal traditional jewelry. Keep the styling refined, feminine, and festive without becoming overly heavy.

If pose is not preserved, create four complementary portraits:

Top-left panel: show a dynamic full-body twirling or turning pose on a quiet residential street. Let the dress flare naturally with motion, the dupatta trail behind, and the subject look back toward the camera with a bright joyful smile. Capture natural movement in the hair and fabric.

Top-right panel: create a close beauty portrait from approximately the shoulders upward. Turn the face slightly toward warm sunlight and let the subject look gently upward and away from the lens with a soft dreamy expression. Emphasize glowing skin, delicate eye makeup, glossy lips, gold earrings, and warm highlights in the hair.

Bottom-left panel: create an intimate close-up portrait with the subject looking toward the camera and smiling naturally. Keep the face dominant, preserve realistic skin texture, and let warm sunlight skim across the cheekbones and hair.

Bottom-right panel: show a relaxed full or three-quarter standing portrait on the same residential street. Let the subject hold the hands loosely near the waist or allow the dupatta to fall naturally. Keep the posture elegant and effortless, with a soft smile and direct or slightly off-camera gaze.

Style the hair long, loose, softly waved, and naturally flowing. Preserve the subject’s natural hair color and texture while allowing gentle motion in the wider panels and polished framing around the face in the close-ups.

Apply {{mood}} color grading consistently across all four panels. Use warm golden sunlight, honey-amber highlights, rich mustard fabric tones, natural skin color, soft earthy neutrals, and gently deepened shadows. Maintain realistic pores, facial texture, individual hair strands, fabric detail, embroidery, and jewelry highlights. Avoid plastic skin, heavy smoothing, or exaggerated beauty filters.

Create {{background}}. Interpret the setting as a calm residential street or lane with warm-toned walls, gates, trees, soft greenery, and late-afternoon sunlight. Keep the environment photorealistic, elegant, and uncluttered, with no distracting crowds or unrelated objects.

Use strong but flattering late-afternoon directional sunlight. Allow the light to create luminous edges around the hair and dupatta, warm highlights across the face and shoulders, and soft long shadows across the street. Keep the close-up portraits gently sculpted with realistic light falloff.

Use shallow-to-moderate depth of field. Keep the subject, jewelry, face, and key clothing details sharp while allowing distant houses, walls, plants, and street elements to soften naturally. In the twirling panel, preserve motion in the dress and hair while keeping the face clear.

Add subtle cinematic polish with very fine film grain, soft highlight bloom, warm tonal roll-off, and restrained editorial contrast. The final collage should feel romantic, joyful, elegant, sunlit, and fashion-forward.

Do not add social-media interface elements, play buttons, watermarks, logos, text overlays, random extra people, mismatched identities between panels, duplicated jewelry, malformed hands, extra fingers, distorted faces, warped architecture, or unnatural fabric motion.

Compose and crop the complete collage specifically for {{ratio}}, keeping all four faces, full-body poses, flowing dress, jewelry, hair, and important street details comfortably visible within the canvas.', "{\"defaults\":{\"mood\":\"Warm golden-hour cinematic glow with honey-amber highlights, rich mustard tones, natural skin color, soft earthy neutrals, and elegant contrast\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Quiet sunlit residential street with warm walls, trees, soft greenery, neighborhood gates, and long late-afternoon shadows\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:15:57.697736+00:00', '2026-09-25T20:15:57.697736+00:00'),
('9079d0d5-5e92-593a-9bcd-0f1f790c6885', 'aff35eee-3ba9-5d2c-ae7e-c0f02e498b93', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a cinematic travel-poster portrait while preserving the subject’s recognizable identity, facial structure, natural skin texture, hair characteristics, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

If clothing is not preserved, replace the original outfit with a graceful travel-editorial look consisting of a fitted black sleeveless blouse or tank-style top paired with a flowing red-orange traditional skirt or lehenga with delicate white floral motifs. Add oxidized silver jhumka-style earrings and stacked bangles for a soft cultural styling touch. Keep the outfit elegant, comfortable, and visually striking against the river setting.

If pose is not preserved, place the subject seated sideways on the pointed front bow of a wooden boat, with the body angled slightly away from the camera and the face turned toward one side. Keep one hand resting naturally on the lap or boat edge and the expression soft, calm, and subtly smiling, as if enjoying the atmosphere of the river at sunset.

Preserve the subject’s long hair in a loose, softly flowing style with gentle natural movement from the breeze. Keep the identity realistic and consistent.

Apply {{mood}} color grading throughout the image. Use glowing sunset tones, warm peach-orange sky hues, soft golden reflections on the water, rich blue paint texture on the boat, deep red-orange fabric tones, and natural warm skin color. Preserve realistic pores, hair strands, facial texture, jewelry detail, and cloth texture. Avoid plastic skin or excessive glamour retouching.

Create {{background}} as a dramatic riverside heritage cityscape inspired by Varanasi at sunset: broad river water in the foreground and midground, historic ghats and riverside buildings in the distance, temple-like silhouettes, moored boats, and a lively but softly rendered waterfront atmosphere. The setting should feel iconic, densely layered, and culturally rich without becoming chaotic.

Fill the sky with several flying seagulls or river birds at different distances to create movement and travel-poster energy. Keep the birds naturally placed and proportionate.

Use warm golden-hour or sunset lighting. Let the low sun illuminate the side of the face, shoulders, hair, and skirt while reflecting across the water. Add a soft atmospheric glow and subtle haze to the distant ghats for depth.

The wooden boat should be clearly visible and weathered, with blue painted planks, rope details, and worn texture. The subject should sit near the center-front of the composition so the converging lines of the boat guide the eye toward the person and the city beyond.

Use shallow-to-moderate depth of field. Keep the subject, nearby boat textures, and immediate foreground crisp while allowing the far background buildings and distant boats to soften slightly. Maintain a premium editorial-photography feel with subtle cinematic polish.

Add travel-poster style headline text at the top of the image. Include “इश्क-ए-” in red Devanagari lettering above “बनारस” in a larger mustard-yellow or golden Devanagari style. The typography should feel decorative, elegant, and centered near the top without overpowering the portrait.

The final image should feel romantic, adventurous, cultural, cinematic, and poster-like, combining realistic portrait photography with destination storytelling.

Do not add social-media UI, play buttons, watermarks, random extra people in the foreground, distorted birds, malformed hands, duplicated jewelry, or cluttered text. Keep the poster headline clean and readable.

Compose and crop the final image specifically for {{ratio}}, keeping the subject, the boat bow, the river reflections, the flying birds, the historic skyline, and the destination title comfortably inside the frame.', "{\"defaults\":{\"mood\":\"Golden sunset cinematic travel-poster glow with warm peach-orange sky, glowing water reflections, rich blue boat tones, deep red-orange fabric, and soft atmospheric haze\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Varanasi-inspired riverside ghats at sunset with historic buildings, temple silhouettes, river boats, glowing shoreline lights, broad reflective water, and flying birds in the sky\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:16:02.11488+00:00', '2026-09-25T20:16:02.11488+00:00'),
('f7c820e8-771f-54bc-819e-6595e2d8c855', '4231fea0-3f20-5ecf-ae7c-795c090177ea', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into an elegant three-panel traditional fashion portrait while preserving the subject’s recognizable identity, facial structure, natural skin texture, hair characteristics, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

Create one cohesive vertical triptych made from three cinematic photographs of the same subject, stacked from top to bottom and separated by thin white dotted or beaded divider lines. Keep the identity, hairstyle, wardrobe, jewelry, lighting direction, and color treatment consistent across all three panels.

If clothing is not preserved, replace the original outfit with an elegant white or ivory embroidered traditional dress featuring delicate threadwork, floral embroidery, sheer sleeves, and soft semi-transparent fabric. Keep the outfit refined, feminine, luminous, and detailed without appearing overly ornate.

Add traditional silver-toned jhumka earrings, a tiny black bindi, a delicate nose pin if suitable, and stacks of deep red glass bangles mixed with antique-silver kadas or oxidized bangles on both wrists. Add one ornate silver statement ring and a few minimal thin rings. Jewelry should look realistic, intricate, and handcrafted rather than oversized or artificial.

If pose is not preserved, create three coordinated panels:

Top panel: show an extreme close-up of the subject’s crossed hands and wrists resting gently over the white embroidered fabric. Make the red bangles, oxidized silver bangles, statement ring, fingers, and embroidery the visual focus. Use soft sunlight to reveal jewelry texture, skin detail, and fabric stitching.

Middle panel: create the main portrait from approximately the waist or chest upward. Position the subject near a wooden window or warm interior opening, with both arms raised naturally behind the head as if adjusting or gathering the hair. Keep the elbows visible, shoulders relaxed, and gaze directed softly toward the camera. Use a calm, poised, subtly confident expression with relaxed lips.

Bottom panel: create another intimate close-up focused on the hands, wrists, red bangles, silver jewelry, and embroidered white sleeves. Let the hands overlap naturally at a gentle diagonal, with rich detail in the bangles, ring, fabric, and skin texture.

Style the hair in a loose low ponytail or softly gathered hairstyle with several face-framing strands falling naturally around the cheeks and forehead. Preserve the subject’s natural hair color and texture while making the styling softly romantic and understated.

Apply {{mood}} color grading consistently across all three panels. Use warm golden sunlight, creamy ivory whites, deep ruby-red bangles, oxidized silver jewelry, soft natural skin tones, warm wooden browns, and gentle cinematic shadow depth. Preserve realistic pores, hand texture, fine hairs, fabric stitching, embroidery, metal reflections, and glass-bangle highlights.

Create {{background}} as a warm, softly lit traditional interior with a wooden doorway or window frame, muted beige or brown walls, and minimal softly blurred furnishings. Keep the environment intimate and unobtrusive so the subject, jewelry, and white embroidered clothing remain dominant.

Use strong directional natural sunlight entering from one side, similar to warm late-afternoon window light. Let sunlight create luminous highlights across the face, arms, hands, earrings, rings, bangles, and embroidered sleeves, while producing soft natural shadows that sculpt the features.

Maintain shallow depth of field in the main portrait and macro-like detail in the hand panels. Keep jewelry and hands crisp in the close-ups while allowing surrounding fabric and background to soften naturally.

Add subtle editorial polish with fine photographic grain, warm highlight roll-off, gentle optical bloom, and a soft nostalgic film texture. The image should feel intimate, graceful, traditional, and cinematic, like a jewelry-and-fashion editorial captured in natural window light.

Optionally include only a few tiny decorative symbolic accents near the edge of the middle panel, such as very small sparkle, white dove, crescent moon, or ring motifs, but keep them minimal and secondary to the photography.

Do not add social-media UI, play buttons, logos, watermarks, unrelated text, extra people, mismatched identities between panels, duplicated hands, extra fingers, malformed jewelry, distorted bangles, or inconsistent clothing.

Compose and crop the complete three-panel artwork specifically for {{ratio}}, keeping the main face, raised arms, hands, rings, bangles, earrings, embroidered sleeves, and all three panels comfortably visible within the frame.', "{\"defaults\":{\"mood\":\"Warm intimate golden window light with creamy ivory whites, deep ruby-red bangles, antique silver jewelry, natural skin tones, and soft nostalgic film contrast\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Warm traditional indoor setting beside a wooden window or doorway with muted beige-brown walls, soft sunlight, and shallow cinematic blur\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:16:06.62939+00:00', '2026-09-25T20:16:06.62939+00:00'),
('1ebd2c7c-71ad-55f7-9501-a6698f6084b7', '8360a287-2a3d-5641-ae0b-3ed4347c519b', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a moody outdoor editorial portrait, preserving their identity, facial features, natural skin texture, and any elements specified in {{preserve}}.

If clothing is not preserved, style the subject in a relaxed white button-up shirt with casually rolled sleeves, loose dark blue denim, a light beige baseball cap, and a classic gold-tone wristwatch. If pose is not preserved, place the subject seated naturally in tall wild grass on a hillside, with one hand lightly touching the cap brim, the other hand resting loosely near the leg, and the face turned slightly to the side with a calm, thoughtful expression.

Apply {{mood}} color grading with soft overcast daylight, muted earthy greens, gentle desaturation, subtle cinematic contrast, realistic skin texture, and delicate natural grain. Build the environment from {{background}}, interpreted as a grassy open hillside with tall meadow grass, a weathered leafless tree behind the subject, a softly clouded sky, and a shallow depth of field that keeps the subject crisp while the surroundings remain softly blurred. Keep the overall look natural, editorial, intimate, and quietly cinematic.

Do not add extra people, text, logos, watermarks, UI icons, or distorted hands. Compose for {{ratio}} without awkwardly cropping the face, cap, hands, knees, or surrounding grass.', "{\"defaults\":{\"mood\":\"Muted earthy\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Grassy hillside meadow with tall wild grass, a bare tree, and a cloudy sky\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:16:11.113832+00:00', '2026-09-25T20:16:11.113832+00:00')
on conflict do nothing;