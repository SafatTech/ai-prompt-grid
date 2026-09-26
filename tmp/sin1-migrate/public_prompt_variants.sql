insert into public.prompt_variants (id, style_id, tool, mode, input_image_count, input_image_roles, version, template, variables, settings, test_record, is_primary, status, created_at, updated_at) values
('95aa62f7-36b3-5b07-ba7e-6572ee072191', '72cc5f79-c79a-5bfe-a298-e040fbb1a464', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into an elegant South Asian fashion editorial portrait, preserving their identity, facial features, natural skin texture, and {{preserve}}.

Style the subject in refined traditional attire with delicate embroidery, statement jewellery, fresh jasmine flowers, softly styled hair, and a graceful posed expression. Use {{mood}} color grading, luminous cinematic highlights, realistic fabric texture, and a nostalgic film finish. Create gentle lateral motion in the surroundings while keeping the face, hair, outfit, jewellery, and hands crisp.

Place the scene in {{background}} with a soft, premium editorial atmosphere. Do not add extra people, text, logos, watermarks, artificial skin, altered identity, or distorted fingers. Compose for {{ratio}} without awkwardly cropping the face, hairstyle, outfit details, or hands.', "{\"defaults\":{\"mood\":\"Warm neutral with luminous gold highlights\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Upscale softly blurred interior with lateral motion blur\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Jewellery and embroidery detail may vary\",\"Very tight head crops leave little room for outfit framing\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:13:57.676036+00:00', '2026-09-25T20:13:57.676036+00:00'),
('afda91fe-b514-5510-a421-f6ccfb31cf05', 'a04a9729-821e-5a88-a5e6-267521c9bf50', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a high-fashion urban editorial portrait, preserving their identity, facial features, natural skin texture, and {{preserve}}.

Dress the subject in refined dark streetwear with subtle sunglasses and a confident three-quarter pose. Create a cinematic scene with a sharply focused subject surrounded by anonymous passersby moving in natural lateral motion blur. Use {{mood}} color grading, deep editorial contrast, subtle film grain, and premium fashion-photography detail.

Interpret {{background}} as a sophisticated city or street-style setting while keeping the subject clear and central. Do not add readable text, logos, watermarks, extra focal people, artificial skin, or distorted hands. Compose for {{ratio}} with the face and outfit comfortably framed.', "{\"defaults\":{\"mood\":\"Deep charcoal, black, and warm amber\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Dark luxury urban interior with a moving blurred crowd\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Sunglasses may partially hide eye detail\",\"Crowd motion blur can vary between generations\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:14:02.604109+00:00', '2026-09-25T20:14:02.604109+00:00'),
('3cba2cd2-434f-50d5-8ba8-820e65ecdc8f', '804a551e-6371-559f-913a-d2335e3a4cc7', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a joyful outdoor lifestyle editorial portrait, preserving their identity, facial features, natural skin texture, and {{preserve}}.

Style the subject in relaxed light-toned clothing, holding a simple hardbound notebook or book, with sparse colorful confetti floating naturally around them. Give the portrait an optimistic, candid expression, soft background depth, realistic clothing texture, and cinematic editorial polish. Use {{mood}} color grading with natural highlights and a gentle film-like finish.

Build the setting from {{background}} while retaining a fresh celebratory atmosphere. Do not add text, logos, watermarks, extra focal people, artificial skin, or distorted hands. Compose for {{ratio}} without cropping the face, book, or hands awkwardly.', "{\"defaults\":{\"mood\":\"Sunlit warm gold with fresh natural greens\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Bright outdoor park with mature trees and colorful floating confetti\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Book and hand placement may shift slightly\",\"Confetti density can vary\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:14:07.821722+00:00', '2026-09-25T20:14:07.821722+00:00'),
('8b97ed40-f5f0-564b-8bfc-877bb278ca2f', 'ff81786e-a97c-5a18-a8d9-58c2f7552987', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into an original vintage pulp-comic hero illustration, preserving their recognisable identity, facial features, natural complexion, and {{preserve}}.

Illustrate the subject in a classic leather jacket over a simple shirt, posed confidently in a retro roadside setting with a vintage car and diner-inspired architecture. Use bold ink contours, halftone shading, crosshatching, weathered-paper texture, and {{mood}} print-color treatment. Keep the artwork polished, dramatic, and clearly illustrated rather than photorealistic.

Adapt the scene around {{background}} while keeping the subject as the central comic-book hero. Do not add any titles, captions, speech bubbles, logos, barcodes, watermark, or readable signage. Compose for {{ratio}} with clean framing and natural-looking hands.', "{\"defaults\":{\"mood\":\"Vintage teal, burnt orange, cream, and faded sepia\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Retro roadside diner at sunset with a classic red car\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Illustration style softens photo-real skin detail by design\",\"Background signage must stay unreadable\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:14:12.261041+00:00', '2026-09-25T20:14:12.261041+00:00'),
('3751117e-d0bc-5184-b564-620b5adaa185', '4f6e2dc3-0abf-5f3a-80f6-e5b6e5810406', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into an intimate, thoughtful cinematic editorial portrait, preserving their identity, facial features, natural skin texture, and {{preserve}}.

Style the subject in relaxed dark layers over a simple light shirt, seated calmly with a reflective expression and one hand resting near the face. Use {{mood}} color grading, filtered side lighting, gentle film grain, realistic clothing texture, and a quiet indie-film atmosphere. Keep the face and hands crisp with soft depth in the surrounding details.

Use {{background}} as a creative studio or reading-room-inspired setting with subtle framed art and books. Do not add text, logos, watermarks, extra people, artificial skin, or distorted fingers. Compose for {{ratio}} with a balanced seated portrait crop.', "{\"defaults\":{\"mood\":\"Muted espresso, charcoal, and warm amber\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Dim artist studio or reading room beside a textured window\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Hand-near-face pose may differ slightly from the source pose\",\"Window light direction can vary\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:14:17.385524+00:00', '2026-09-25T20:14:17.385524+00:00')
on conflict do nothing;

insert into public.prompt_variants (id, style_id, tool, mode, input_image_count, input_image_roles, version, template, variables, settings, test_record, is_primary, status, created_at, updated_at) values
('476bb804-4e83-5705-b4ff-93a160cad85a', '5c9de9f3-edf0-5e8f-a915-23032d562b35', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a joyful cinematic travel-fashion portrait, preserving their identity, facial features, natural skin texture, and {{preserve}}.

Style the subject in a softly flowing light summer outfit, holding a loose bouquet of delicate wildflowers with natural green stems. Give them a genuine happy expression, naturally windblown hair, and a walking or lightly running pose. Use {{mood}} color grading, realistic fabric movement, soft background depth, and elegant editorial-film detail.

Build the scene around {{background}} with a romantic old-city-street feeling and softly blurred anonymous pedestrians where appropriate. Do not add text, logos, watermarks, extra focal people, artificial skin, or distorted fingers. Compose for {{ratio}} without awkwardly cropping the face, bouquet, hair, or hands.', "{\"defaults\":{\"mood\":\"Luminous golden-hour warmth\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Historic European-style cobblestone city street with soft café details\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Bouquet and hand detail may vary\",\"Hair motion can differ from the source photo\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:14:21.916046+00:00', '2026-09-25T20:14:21.916046+00:00'),
('7228b00e-cb62-5984-bc1a-025cb1791b3c', '9dbbe3bf-a98b-5756-bc43-2990c34dd659', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a dark cinematic crowd portrait, preserving their identity, facial features, natural skin texture, and {{preserve}}.

Dress the subject in a distinctive hooded jacket with a calm three-quarter pose, turning their face toward the camera. Keep the subject sharply focused while anonymous people move around them in strong natural motion blur. Use {{mood}} color grading, dramatic editorial contrast, subtle film grain, and rich realistic jacket texture.

Interpret {{background}} as a dense urban crowd environment while keeping the subject visually separate and central. Do not add text, logos, watermarks, readable signs, extra focal people, artificial skin, or distorted hands. Compose for {{ratio}} with the face and jacket clearly visible.', "{\"defaults\":{\"mood\":\"Deep teal shadows with burnt-orange highlights\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Dense dark city crowd at blue hour with heavy motion blur\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Hood shape and jacket texture may vary\",\"Crowd blur intensity can differ between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:14:26.455878+00:00', '2026-09-25T20:14:26.455878+00:00'),
('23ba2199-70a6-57bc-a8f7-c74629275b57', 'bff28b1b-d9b9-5ded-8336-8653208a4d6c', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into one vertical three-panel South Asian editorial collage, preserving their identity, facial features, natural skin texture, and {{preserve}} consistently across every panel.

Create exactly three horizontal panels: a close portrait resting the cheek on one hand, an extreme close-up of the same eyes and brows, and a wider portrait showing traditional clothing and jewellery. Style the subject with an embroidered light-toned outfit, patterned drape, small bindi, ornate earrings, and stacked bangles. Use {{mood}} color grading, cinematic side light, realistic pores, detailed fabric, and thin dark dividers between panels.

Use {{background}} consistently behind all three panels with a soft window-lit editorial atmosphere. Do not add text, logos, watermarks, carousel dots, a fourth panel, artificial skin, altered identity, or distorted fingers. Compose the full collage for {{ratio}}.', "{\"defaults\":{\"mood\":\"Rich amber-gold with deep brown shadows\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Dark indoor room with strong late-afternoon window shadows\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Panel crop ratios can vary slightly\",\"Jewellery detail may differ across panels\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:14:30.922694+00:00', '2026-09-25T20:14:30.922694+00:00'),
('237fc634-8f6a-5a00-82ce-cb7a5bfba4a5', '367b6372-62e9-5463-92c0-20a057dfc403', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a candid analog street-fashion portrait, preserving their identity, facial features, natural skin texture, and {{preserve}}.

If clothing is not preserved, style the subject in a simple elegant black outfit with a delicate pearl necklace, a rich red shoulder bag, and a bouquet of deep red roses wrapped in natural brown paper. Create a carefree walking pose with eyes gently closed or lifted toward the light, a relaxed happy expression, and naturally moving hair.

Apply {{mood}} color grading, soft daylight flare, realistic film grain, subtle vintage-camera texture, and gentle directional motion blur around the surroundings while keeping the subject’s face, bouquet, and outfit crisp. Build the scene from {{background}}, interpreted as a lively urban street with soft anonymous movement and natural depth.

Do not add phone lock-screen elements, time, date, text, logos, watermarks, UI icons, or distorted hands. Compose for {{ratio}} without awkwardly cropping the face, bag, bouquet, or hands.', "{\"defaults\":{\"mood\":\"Soft sunlit analog warmth with a slightly faded film look\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Tree-lined city street with parked cars and subtle street motion blur\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Bouquet and bag placement may vary\",\"Walking pose will differ from a static source pose\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:14:35.475467+00:00', '2026-09-25T20:14:35.475467+00:00'),
('75f2ef6d-29ea-56e1-9fe1-1bc3def642fa', 'd7509547-94fe-50a6-a1e2-5cd5c1c941ff', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into an elegant cinematic festive-fashion portrait while preserving the subject’s recognizable identity, facial structure, natural skin texture, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

If clothing is not preserved, replace the original outfit with a luxurious champagne-gold traditional formal look: a heavily embellished sequined saree with a fitted long-sleeve blouse, intricate beadwork, shimmering embroidery, translucent layered fabric, and refined metallic detailing. Add elegant oversized gold statement hoop earrings and a delicate layered gold necklace with a small circular pendant. Keep the styling sophisticated, glamorous, realistic, and suitable for a premium celebration or evening event.

If pose is not preserved, reposition the subject into a graceful three-quarter fashion pose with the torso slightly angled away from the camera, shoulders relaxed, arms naturally gathered near the waist, head gently tilted downward and toward one side, eyes looking softly downward, and a subtle confident closed-mouth smile. The expression should feel calm, graceful, candid, and naturally captured rather than deliberately posed.

Style the hair in an elegant half-up evening hairstyle with volume at the crown, a loose textured bun or gathered section at the top, soft strands framing the face, and the remaining hair flowing naturally around the shoulders. Preserve the subject’s natural hair color and realistic strand detail.

Apply {{mood}} color grading throughout the image. Use rich warm highlights, glowing amber-gold illumination, soft luminous skin tones, subtle shadow depth, gentle highlight roll-off, and polished cinematic contrast. Illuminate the subject with flattering warm directional event lighting that creates delicate golden rim light around the hair and shoulders while maintaining realistic facial detail and natural skin texture. Avoid plastic skin, excessive smoothing, or artificial beauty-filter effects.

Create {{background}}. Render the environment as an upscale indoor celebration or fashion-event atmosphere with warm decorative lighting, reflective golden surfaces, distant anonymous figures or shapes, and shallow depth of field. Introduce strong directional background motion blur and elongated horizontal golden light streaks to create the impression that the surroundings are moving rapidly past the camera while the subject remains sharply focused.

Keep the subject’s face, eyes, jewelry, clothing embroidery, and foreground body details crisp and highly detailed. Motion blur should affect primarily the background and peripheral environmental elements, not the face. Add soft optical glow, realistic lens bloom around bright lights, subtle depth separation, fine photographic texture, and a premium full-frame-camera look.

Frame the portrait from approximately the upper thighs or waist upward with the subject occupying most of the composition while still leaving enough surrounding space for the moving golden environment to remain visible. Keep the face positioned naturally within the upper-middle portion of the frame.

Do not add text, logos, watermarks, phone-interface elements, carousel arrows, social-media icons, borders, duplicated jewelry, extra fingers, distorted hands, malformed fabric, duplicated limbs, or recognizable additional people.

Compose and crop the final image specifically for {{ratio}}, maintaining a polished editorial composition without awkwardly cropping the head, hairstyle, earrings, arms, hands, saree draping, or important clothing details.', "{\"defaults\":{\"mood\":\"Warm cinematic golden amber\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Luxurious indoor festive event with glowing golden lights, reflective surfaces, soft anonymous crowd shapes, and strong horizontal directional motion blur\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:14:40.044451+00:00', '2026-09-25T20:14:40.044451+00:00')
on conflict do nothing;

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

insert into public.prompt_variants (id, style_id, tool, mode, input_image_count, input_image_roles, version, template, variables, settings, test_record, is_primary, status, created_at, updated_at) values
('2abab0d4-0b6e-5cda-9f32-afe21caf1ba8', '40d7d444-83d6-58b9-8cd8-47fb033c599f', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a joyful, immersive wide-angle floral selfie while preserving the subject’s recognizable identity, facial structure, skin tone, natural skin texture, hair characteristics, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

If clothing is not preserved, style the subject in a relaxed soft-yellow lightweight button-up shirt worn casually over a simple white inner top, paired with light-wash blue jeans. Keep the outfit youthful, comfortable, fresh, and understated so the face and floral environment remain the main focus.

If pose is not preserved, reposition the subject into a playful close-range selfie pose. Place the subject low and close to the camera with the torso leaning gently forward, one arm extended dramatically toward the lens as though holding the camera, and the other hand relaxed naturally near the body or flowers. Use strong wide-angle perspective so the extended arm appears noticeably larger in the foreground while the face remains attractive and recognizable.

Create a joyful candid expression with a broad natural smile, visible teeth, softly closed or nearly closed eyes, relaxed cheeks, and an energetic carefree feeling. The expression should look like a genuine happy moment captured spontaneously rather than a conventional posed portrait.

Keep the hair loose and naturally expressive. Allow individual strands and sections of hair to move outward around the face as though affected by a gentle breeze or the dynamic perspective of the selfie. Preserve the subject’s natural hair color, texture, curl pattern, and overall identity.

Apply {{mood}} color grading consistently across the entire image. Keep the subject’s skin realistic and dimensional, preserve pores and subtle facial texture, use soft luminous highlights, gentle contrast, clean midtones, and an airy photographic finish. Avoid plastic skin, excessive smoothing, unnatural face reshaping, or heavy glamour retouching.

Create the scene from {{background}}. Interpret the selected environment as an immersive artistic setting surrounding the subject rather than a flat backdrop. Include abundant flowers positioned around the subject at different distances from the camera, with several blossoms very close to the lens to create strong foreground depth.

Add a distinctive fluid-warp visual effect to the distant background. Stretch and bend environmental colors into broad flowing waves that radiate and curve around the subject while keeping the person, important flowers, hands, and clothing physically realistic. The distortion should resemble a controlled lens-warp or liquid-marbling effect applied primarily to the environment, not to the subject’s face or anatomy.

Allow the warped background to create sweeping curved lines that visually lead toward the subject. Keep these flowing distortions smooth, organic, elegant, and photographic rather than chaotic or psychedelic. The subject must remain clearly separated from the warped environment.

Arrange lush flowers beside and around the subject, including large layered blossoms, smaller supporting flowers, buds, leaves, and natural stems. Use varied focus depth: keep several flowers around the subject sharp, allow flowers closest to the lens to become softly blurred, and blend distant floral elements gradually into the warped environment.

Use bright soft natural daylight with flattering illumination across the face. Add gentle highlights to the hair, nose, cheeks, lips, flowers, and clothing without harsh blown-out areas. Keep shadows light and natural to preserve the cheerful, fresh atmosphere.

Use an ultra-wide-angle or close-range selfie-camera aesthetic with noticeable perspective exaggeration. The face should remain proportionally believable while the arm extending toward the lens appears enlarged by perspective. Keep the effect intentional and photographic rather than anatomically distorted.

Use a shallow-to-moderate depth of field. Keep the subject’s face and key midground flowers crisp while allowing the closest flowers, extended hand near the lens, and distant background to soften naturally according to their distance from the camera.

The finished photograph should feel playful, youthful, spontaneous, dreamy, immersive, floral, and editorial, combining realistic portrait photography with controlled surreal environmental distortion.

Frame the subject from approximately the waist or knees upward depending on the selfie perspective. Let the extended arm enter prominently from a lower corner of the frame and guide the eye toward the subject’s face. Surround the opposite side of the composition with abundant flowers to balance the perspective.

Do not add text, logos, watermarks, social-media interface elements, gallery icons, carousel indicators, borders, extra people, duplicated flowers, extra fingers, malformed hands, duplicated limbs, facial distortion, warped eyes, or unwanted deformation of the subject.

Compose and crop the final artwork specifically for {{ratio}}, keeping the face, extended arm, important flowers, clothing, and major environmental details comfortably inside the frame.', "{\"defaults\":{\"mood\":\"Bright dreamy pastel spring with soft blush pinks, creamy whites, fresh botanical greens, warm natural skin tones, and airy luminous highlights\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Immersive garden of soft pink and white flowers surrounded by flowing blush-pink, ivory, and botanical-green liquid-wave distortions\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:15:07.58613+00:00', '2026-09-25T20:15:07.58613+00:00'),
('4db805ed-1fc3-599b-8290-3ad06639ee44', '12f0ed1f-8fab-57ba-823c-77d5d76a1537', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into an intimate cinematic low-light portrait while preserving the subject’s recognizable identity, facial structure, natural skin texture, hair characteristics, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

If clothing is not preserved, replace the original outfit with a simple fitted black long-sleeve top or black knit sweater. Keep the styling minimal, elegant, masculine, and understated so the face, hands, and rose remain the main visual focus.

If pose is not preserved, reposition the subject into a close seated portrait with the torso leaning slightly forward. Rest one forearm horizontally across the knees or a raised leg and place the other hand naturally in front, creating a compact, introspective pose. Let the subject’s head tilt gently downward and to one side, with the gaze directed away from the camera or toward the lower corner of the frame. Keep the expression serious, reflective, slightly melancholic, and emotionally restrained rather than dramatic.

Place a single deep-red rose against or just above the subject’s forearm near the lower-right portion of the portrait. The rose should have a realistic green stem and a few natural leaves. Keep it prominent enough to become the only strong color accent in the composition without obscuring the hands or face.

Preserve or subtly refine the subject’s natural hairstyle, allowing a few loose strands to fall toward the forehead. If facial hair is present, keep it realistic and consistent with the source identity rather than removing or dramatically changing it. Add only minimal accessories, such as a small simple hoop earring if appropriate to the styling.

Apply {{mood}} color grading throughout the image. Use warm amber highlights, rich brown-black shadows, muted natural skin tones, deep neutral blacks, and one saturated crimson-red accent from the rose. Keep the overall palette subdued and cinematic rather than colorful.

Create {{background}}. Keep it dark, minimal, softly blurred, and warm-toned, with faint window-like patches of golden light or indistinct interior shapes in the distance. The environment should remain visually quiet and never compete with the subject.

Use strong directional warm light entering from one side of the frame, similar to late-afternoon sunlight passing through a window. Let the light fall across the subject’s forehead, cheekbones, nose, lips, ear, hands, and rose while allowing much of the opposite side of the portrait to remain in deep soft shadow.

Create pronounced but natural chiaroscuro. Preserve facial detail inside the shadows instead of crushing everything to pure black. The subject should appear sculpted by light, with realistic dimensional transitions across the brow, nose, jawline, cheek, neck, hands, and fabric folds.

Keep the eyes, lips, facial hair, fingertips, rose petals, and illuminated skin areas sharply rendered while allowing the surrounding clothing and background to become progressively softer. Maintain realistic pores, subtle skin variation, individual hair strands, and natural hand texture. Avoid plastic smoothing or glamour-style retouching.

Use shallow depth of field and a cinematic portrait-lens aesthetic. Add gentle highlight bloom, fine film grain, slightly softened contrast, subtle atmospheric haze, and warm analog-style tonal roll-off. The photograph should feel like a still frame from an intimate dramatic film rather than a bright studio portrait.

Frame the subject closely from approximately the chest or waist upward. Let the folded arms and hands occupy the lower portion of the composition while the face sits slightly above center. The red rose should create a visual counterpoint near the hands and dark clothing.

Keep the pose compact and asymmetrical. Avoid formal centered headshot framing. The image should communicate quiet introspection, loneliness, romance, and cinematic stillness while remaining photorealistic.

Do not add text, logos, watermarks, social-media interface elements, gallery icons, borders, extra people, extra roses, duplicated hands, extra fingers, malformed anatomy, exaggerated jewelry, distorted facial features, or unrelated decorative objects.

Compose and crop the final image specifically for {{ratio}}, keeping the face, hands, forearms, rose, and important lighting details comfortably inside the frame.', "{\"defaults\":{\"mood\":\"Moody warm cinematic chiaroscuro with amber highlights, muted skin tones, deep brown-black shadows, and a single rich crimson-red accent\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Dark softly blurred interior with faint warm window-light patches and minimal indistinct shapes\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:15:12.188073+00:00', '2026-09-25T20:15:12.188073+00:00'),
('a8a56f25-65e7-5014-84fa-70617a2ef078', '85ffa199-0606-572f-9b48-2008b1d9a8e2', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a soft cinematic three-panel portrait collage while preserving the subject’s recognizable identity, facial structure, natural skin texture, hair characteristics, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

Create a warm, romantic triptych layout made from three photographs of the same person arranged into one collage. Use one large horizontal image across the full top half, and two smaller vertical images side by side in the bottom half. Separate the three images with thin clean white divider lines. The collage should feel like three candid moments from the same photo session.

If clothing is not preserved, dress the subject in an oversized dark charcoal or black hoodie or sweatshirt with a soft casual fit. Keep the clothing simple, cozy, and understated so the bouquet and expression remain the visual focus.

If pose is not preserved, create three complementary candid poses while keeping the same subject and same styling across all panels:
Top panel: the subject gently looks downward at the bouquet with a soft natural smile, holding it close to the chest in a calm affectionate pose.
Bottom-left panel: the subject looks down shyly while lightly touching or brushing hair away from the face with one hand, creating a bashful candid moment.
Bottom-right panel: the subject hugs the bouquet close with both arms, tilts the head back or slightly to the side, closes or softens the eyes, and smiles with a dreamy content expression.

Place a wrapped floral bouquet prominently in all three frames. Build it with blush or pale pink roses, deep red roses, baby’s-breath filler flowers, and soft kraft-paper or translucent bouquet wrapping. The bouquet should feel elegant, abundant, and romantic, with realistic floral texture and natural arrangement.

Keep the subject’s hair loose, natural, and softly tousled, with gentle movement around the face. Let a few strands fall naturally across the forehead or cheeks in some panels to support the candid lifestyle mood.

Apply {{mood}} color grading consistently across all three panels. Use warm beige-golden light, slightly muted contrast, soft shadow transitions, delicate highlight bloom, and a subtle vintage film mood. Keep natural skin tones, realistic pores, gentle facial texture, and soft hair detail. Avoid over-retouching or artificial beauty-filter smoothing.

Create {{background}}. The environment should feel like a simple sunlit wall or corner near a doorway or window, with warm direct sunlight casting soft geometric window-shadow patterns across the wall in some areas. Keep the setting minimal and calm, with no distracting objects.

Use warm directional sunlight coming from one side, creating a cozy nostalgic afternoon look. Let the light softly illuminate the face, hair, bouquet, and shoulders while leaving some shadowed areas for depth. Add faint film grain and a slightly dreamy analog-photo atmosphere.

Use shallow to moderate depth of field so the face and bouquet remain crisp while the background stays softly blurred. Keep all three images visually consistent, as if shot in the same place, with the same light, wardrobe, bouquet, and mood.

Ensure the three-panel collage feels balanced, tactile, intimate, and editorial. The subject should appear naturally happy and emotionally connected to the flowers, not formally posed.

Do not add text, logos, watermarks, social-media UI elements, icons, borders beyond the thin panel dividers, extra people, duplicated bouquet parts, malformed hands, extra fingers, inconsistent identities, or distorted facial features.

Compose and crop the final collage specifically for {{ratio}}, keeping the subject’s face, bouquet, hands, and all three frames comfortably visible within the layout.', "{\"defaults\":{\"mood\":\"Warm nostalgic cinematic sunlight with soft vintage tones, gentle film grain, creamy highlights, and cozy shadow depth\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Minimal indoor wall near a doorway or window with warm afternoon sunlight and soft geometric window-shadow patterns\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:15:16.996965+00:00', '2026-09-25T20:15:16.996965+00:00'),
('b28dc38e-b5b2-5b8b-b64b-a4caeb4820e6', '604ea7b3-e6cd-5a0c-a155-10cc76ec9fa8', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into a cinematic monochrome multi-exposure portrait while preserving the subject’s recognizable identity, facial structure, natural skin texture, hairstyle characteristics, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

Build the final composition around one sharply focused main portrait in the foreground and two larger faded portraits of the same subject positioned behind it. All three portraits must clearly depict the same person with consistent facial identity and hairstyle.

If clothing is not preserved, replace the original outfit with a refined dark charcoal or black wool overcoat featuring a structured high collar, layered over a light cream or off-white ribbed knit sweater. Keep the wardrobe minimal, elegant, masculine, timeless, and slightly formal.

If pose is not preserved, position the primary foreground portrait from approximately the chest upward with the shoulders angled slightly away from the camera. Turn the head gently to one side and direct the eyes slightly upward or away from the lens, creating a calm, introspective, self-assured expression. Keep the mouth relaxed and neutral rather than smiling broadly.

Create two secondary enlarged portrait exposures behind the main figure. Place one faded profile on the left side facing outward and another larger translucent three-quarter or side profile on the right side facing the opposite direction. Let these background portraits extend higher than the central figure and fade naturally into the surrounding light backdrop.

Keep the central portrait crisp, dimensional, and high contrast. Render the two background faces with significantly lower opacity, soft edges, reduced contrast, and an ethereal printed-photograph appearance. They should feel like memories or alternate viewpoints rather than separate people.

Apply {{mood}} color grading across the entire composition. Convert the scene into refined black and white with rich charcoal blacks, luminous whites, smooth silver-gray midtones, controlled highlight roll-off, and subtle vintage tonal softness. Preserve realistic pores, individual hair strands, eyebrow detail, and natural facial structure.

Create {{background}}. Use a bright minimal off-white or pale gray studio-like field with soft atmospheric texture, gentle tonal falloff, and faint analog photographic imperfections. Keep the background almost empty so the layered faces remain visually dominant.

Use soft directional studio lighting on the main subject, creating subtle sculpting around the cheekbones, jawline, nose, brow, and neck without harsh shadows. Allow the faded background portraits to appear softer and flatter, as though printed or double-exposed into the same frame.

Introduce fine analog film grain, subtle paper-like texture, delicate vignette darkening near the outer edges, and faint distressed or imperfect photographic borders. Keep these effects refined and understated rather than heavily grungy.

Use moderate shallow depth of field on the central portrait. Keep the eyes, hairline, facial features, sweater texture, and coat collar sharply resolved while letting the edges of the garment gradually soften.

Maintain strong visual separation between the central dark coat and the luminous background. The central subject should occupy the lower-middle portion of the frame, while the two ghosted faces create a triangular composition around and behind the head.

The overall aesthetic should feel timeless, introspective, sophisticated, editorial, and cinematic, similar to a monochrome film poster or fine-art fashion portrait.

Do not add text, logos, watermarks, social-media interface elements, play buttons, borders unrelated to subtle photographic edge texture, extra people, inconsistent identities, duplicated facial features, malformed ears, distorted clothing, or unrealistic anatomy.

Compose and crop the final artwork specifically for {{ratio}}, keeping the main face, shoulders, coat collar, sweater, and both faded background profiles comfortably visible within the frame.', "{\"defaults\":{\"mood\":\"Timeless high-contrast cinematic monochrome with soft silver-gray midtones, luminous whites, deep charcoal blacks, and subtle vintage film grain\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Minimal off-white studio backdrop with soft atmospheric texture, faint analog grain, gentle vignette, and two translucent enlarged portrait exposures of the same subject\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:15:21.539853+00:00', '2026-09-25T20:15:21.539853+00:00'),
('1697ee87-ef18-5063-b301-ca03c5babb06', '34a68801-5343-5ce9-b119-6b6085231c42', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform the uploaded {{subject}} into an elegant monochrome cinematic portrait while preserving the subject’s recognizable identity, facial structure, natural skin texture, hair characteristics, and defining facial features. Follow the selected preservation requirements exactly: {{preserve}}.

If clothing is not preserved, replace the original outfit with a graceful traditional saree look. Use a dark fitted blouse with a soft wide neckline and drape a light-toned saree across the shoulder and chest. The saree should have a delicate embroidered or beaded border with subtle shimmering detail and a soft flowing fabric appearance. Add ornate jhumka-style earrings and a very delicate necklace with a small pendant. Keep the styling refined, timeless, and feminine.

If pose is not preserved, create a close portrait from around the mid-torso upward with the body turned slightly away from the camera. Let the subject lean or rest close to a wall, with the head turned gently to one side and the gaze directed off-camera. Keep the expression calm, introspective, soft, and elegant, with a faint subtle smile or neutral relaxed lips.

Style the hair in a loose, softly tousled, naturally flowing way with visible wave movement and a few strands falling around the face. Preserve the subject’s natural hair texture while giving it a romantic, editorial quality.

Apply {{mood}} color grading throughout the image. Render the entire portrait in rich monochrome black and white with soft silver-gray tonal transitions, luminous highlights, delicate midtones, and deep but smooth shadows. Preserve realistic skin texture, natural pores, subtle lip definition, soft eye detail, and visible hair strands. Avoid plastic retouching or over-smoothed skin.

Create {{background}}. Use a minimal textured wall as the main setting, allowing dramatic organic leaf or branch shadows to fall across the wall and partially across the subject. The shadows should feel naturally cast by sunlight filtering through foliage rather than painted or artificial.

Use strong directional light from one side, similar to sunlight coming through a nearby window or filtered outdoor light. Let the face, jewelry, and saree border catch elegant highlights while the opposite side falls into softer shadow. Maintain a moody but flattering portrait balance.

Include the subject’s soft cast shadow on the wall where appropriate, along with the leafy dappled shadows, to create visual depth and a poetic cinematic mood. Keep the wall simple and uncluttered so the subject remains the focus.

Use a shallow-to-moderate depth of field with a premium editorial-photography feel. Keep the face, earrings, necklace, and key saree details sharp while the background remains slightly softened. Add subtle fine film grain and gentle tonal softness to create a timeless classic portrait aesthetic.

The overall image should feel graceful, intimate, nostalgic, monochrome, and quietly dramatic, like a refined fine-art portrait or cinematic still.

Do not add text, logos, watermarks, social-media interface elements, play buttons, extra people, duplicated jewelry, distorted clothing, malformed hands, extra limbs, or facial distortions.

Compose and crop the final image specifically for {{ratio}}, keeping the face, hair, earrings, necklace, shoulder drape, and important shadow patterns comfortably inside the frame.', "{\"defaults\":{\"mood\":\"Soft cinematic monochrome with silver-gray midtones, gentle film grain, luminous highlights, and deep romantic shadows\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Minimal textured wall with dramatic natural leaf shadows and soft sunlight filtering across the scene\",\"keepClothing\":false}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Outfit and pose change by design when toggles are off\",\"Fine jewellery or collage detail may vary between runs\"],\"lastVerified\":\"2026-09-23\"}"::jsonb, true, 'published', '2026-09-25T20:15:26.062579+00:00', '2026-09-25T20:15:26.062579+00:00')
on conflict do nothing;

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

insert into public.prompt_variants (id, style_id, tool, mode, input_image_count, input_image_roles, version, template, variables, settings, test_record, is_primary, status, created_at, updated_at) values
('7fdccedf-59d8-5d1c-860b-0a5374b88231', '7ceea593-314c-548b-bd89-5aa692d0fcbe', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform {{subject}} into a clean, marketplace-ready product packshot. Preserve the product’s exact shape, proportions, materials, original colour, transparency, packaging, labels, and {{preserve}}.

Place the product against {{background}}, interpreted as a seamless, distraction-free studio setting with no visible horizon line. Use bright, soft, even studio lighting, realistic glass and material reflections, a subtle natural contact shadow directly beneath the product, and {{mood}} colour grading.

Keep the product fully visible, centrally composed with generous clean space around it. Render in {{ratio}} as premium photorealistic e-commerce product photography.

Do not add props, hands, extra products, decorative objects, text, logos, watermarks, altered labels, distorted edges, or changed product details.', "{\"defaults\":{\"mood\":\"Bright neutral\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Pure white seamless infinity studio background\",\"keepClothing\":true}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Transparent packaging can confuse edges\",\"Busy multi-object source photos are unsupported in this variant\"],\"lastVerified\":\"2026-09-26\"}"::jsonb, true, 'published', '2026-09-25T20:16:15.59636+00:00', '2026-09-25T20:16:15.59636+00:00'),
('10335a25-dd3f-5392-ad98-9dc7f1c4b887', '5973c369-5907-580f-82d1-685adc68c847', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform {{subject}} into a bold, modern product campaign image while preserving the exact product shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Place the product on a simple geometric pedestal built from {{background}}. Keep the scene monochromatic and minimal, using one dominant backdrop colour with a slightly deeper or lighter pedestal tone. Add no unrelated props.

Use premium photorealistic studio photography, clean controlled highlights, soft sculpted shadows, and {{mood}} colour grading. Keep the product as the obvious focal point, fully visible and centrally framed with balanced negative space.

Compose for {{ratio}}. Do not add text, logos, watermarks, hands, extra products, clutter, distorted edges, or changed product details.', "{\"defaults\":{\"mood\":\"Warm neutral\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Monochrome coral seamless studio backdrop with a circular coral pedestal\",\"keepClothing\":true}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Transparent packaging can confuse edges\",\"Busy multi-object source photos are unsupported in this variant\"],\"lastVerified\":\"2026-09-26\"}"::jsonb, true, 'published', '2026-09-25T20:16:20.032516+00:00', '2026-09-25T20:16:20.032516+00:00'),
('f788d327-bf1e-5981-a842-5dcdd5d9dd89', 'dc736cca-2f8e-5247-b1a1-58905a1480a4', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform {{subject}} into a refined, natural lifestyle product photograph while preserving its exact shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Stage the product in {{background}}, interpreted as a believable, use-appropriate everyday environment. Keep the product fully visible in sharp foreground focus, with only subtle supporting objects in the distant background and a shallow, realistic depth of field.

Use soft diffused window daylight, authentic material texture, gentle natural shadows, and {{mood}} colour grading. The scene should feel premium, calm, and lived-in while keeping the product as the clear focal point.

Compose for {{ratio}}. Do not add text, logos, watermarks, hands, extra copies of the product, clutter, distorted edges, or changed product details.', "{\"defaults\":{\"mood\":\"Warm neutral\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Sunlit pale-oak desk with a softly blurred open notebook, ceramic cup, and minimal greenery near a window\",\"keepClothing\":true}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Transparent packaging can confuse edges\",\"Busy multi-object source photos are unsupported in this variant\"],\"lastVerified\":\"2026-09-26\"}"::jsonb, true, 'published', '2026-09-25T20:16:24.503262+00:00', '2026-09-25T20:16:24.503262+00:00'),
('2c3992a5-6fab-5684-b40c-9b302aa9c1b8', 'acb20678-cf2c-526f-8a24-57db7977d9b6', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform {{subject}} into a premium top-down editorial flat-lay photograph while preserving its exact shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Arrange the product naturally from an overhead camera view on {{background}}. Keep the product as the largest, central element and add only a few restrained, product-appropriate supporting props near the frame edges. Use intentional asymmetrical spacing and generous negative space; never let props compete with the product.

Apply soft directional daylight, crisp tactile surface detail, gentle realistic shadows, and {{mood}} colour grading. Keep the overall composition minimal, refined, and photorealistic.

Compose for {{ratio}}. Do not add text, logos, watermarks, hands, duplicate products, clutter, distorted geometry, or altered product details.', "{\"defaults\":{\"mood\":\"Warm neutral\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Warm light-beige textured paper surface with a closed cream notebook and graphite pencil at the edges\",\"keepClothing\":true}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Transparent packaging can confuse edges\",\"Busy multi-object source photos are unsupported in this variant\"],\"lastVerified\":\"2026-09-26\"}"::jsonb, true, 'published', '2026-09-25T20:16:28.917161+00:00', '2026-09-25T20:16:28.917161+00:00'),
('15c23725-4e2f-5d53-8d5c-438b986a22b6', '22016ec1-dca9-565b-8032-1c9cdfe9db1b', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform {{subject}} into a calm, premium botanical still-life product photograph while preserving its exact shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Place the product within {{background}}, using only a few restrained natural elements such as foliage, stone, linen, or organic textures. Keep the setting refined and uncluttered, with the product fully visible and clearly dominant over every supporting element.

Use soft natural daylight, realistic tactile materials, gentle environmental shadows, and {{mood}} colour grading. Create a quiet, high-end editorial feeling without making the scene look artificial or changing the product itself.

Compose for {{ratio}}. Do not add text, logos, watermarks, hands, people, duplicate products, clutter, distorted geometry, or changed product details.', "{\"defaults\":{\"mood\":\"Warm neutral\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Warm limestone pedestal with soft green leaves, natural stone, folded unbleached linen, and a pale beige backdrop\",\"keepClothing\":true}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Transparent packaging can confuse edges\",\"Busy multi-object source photos are unsupported in this variant\"],\"lastVerified\":\"2026-09-26\"}"::jsonb, true, 'published', '2026-09-25T20:16:33.460134+00:00', '2026-09-25T20:16:33.460134+00:00')
on conflict do nothing;

insert into public.prompt_variants (id, style_id, tool, mode, input_image_count, input_image_roles, version, template, variables, settings, test_record, is_primary, status, created_at, updated_at) values
('a9ee24b5-3da9-5e67-ace9-c10ce95edebe', 'd4a9ca95-65ee-594a-a3a5-f7c1de9f25ac', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform {{subject}} into a dramatic luxury product campaign image while preserving its exact shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Place the product against {{background}}, interpreted as a dark, minimalist studio scene with a restrained reflective surface beneath it. Keep the product fully visible and isolated, with no props or visual distractions.

Use controlled rim lighting to trace the product silhouette, a narrow soft highlight to reveal its material texture, deep readable shadows, subtle realistic reflection, and {{mood}} colour grading. The result should feel cinematic, premium, and photorealistic.

Compose for {{ratio}}. Do not add text, logos, watermarks, hands, duplicate products, smoke, splashes, clutter, distorted geometry, or changed product details.', "{\"defaults\":{\"mood\":\"Dark cool neutral\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Deep charcoal-black seamless studio with a low black reflective plinth\",\"keepClothing\":true}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Transparent packaging can confuse edges\",\"Busy multi-object source photos are unsupported in this variant\"],\"lastVerified\":\"2026-09-26\"}"::jsonb, true, 'published', '2026-09-25T20:16:38.100208+00:00', '2026-09-25T20:16:38.100208+00:00'),
('ebe2d2ce-e536-5ff6-a7e4-87bba052bc85', '6b7f9ed2-f646-571e-ab5f-e48e9eda4b55', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform {{subject}} into a dynamic floating product campaign image while preserving its exact shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Place the product against {{background}} and make it appear realistically suspended, with a subtle, soft shadow beneath it to establish scale. Keep the product perfectly sharp and fully visible; suggest motion only through restrained background light trails, soft graphic flow, or a gentle environmental effect.

Use clean premium studio lighting, precise material highlights, controlled depth, and {{mood}} colour grading. The composition should feel energetic and modern without becoming cluttered or unrealistic.

Compose for {{ratio}}. Do not add text, logos, watermarks, hands, cords, duplicate products, clutter, motion blur on the product, distorted geometry, or changed product details.', "{\"defaults\":{\"mood\":\"Warm neutral\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Pale sage-to-cream gradient studio background with subtle curved light trails\",\"keepClothing\":true}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Transparent packaging can confuse edges\",\"Busy multi-object source photos are unsupported in this variant\"],\"lastVerified\":\"2026-09-26\"}"::jsonb, true, 'published', '2026-09-25T20:16:42.751716+00:00', '2026-09-25T20:16:42.751716+00:00'),
('a7c3a885-33de-5602-9ffe-dbb22eb7fb08', '083a093a-c202-5c35-ac5e-6ffb9451d3b1', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform {{subject}} into a high-detail macro product photograph while preserving its exact shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Frame the product’s most tactile, valuable details prominently against {{background}}. Keep the main product feature tack sharp while allowing only distant areas to fall into a realistic, soft shallow depth of field.

Use controlled close-up studio lighting to reveal authentic material texture, refined highlights, subtle contact shadows, and {{mood}} colour grading. Keep the composition minimal, premium, and photorealistic.

Compose for {{ratio}}. Do not add text, logos, watermarks, hands, people, duplicate products, unrelated props, clutter, distorted geometry, or changed product details.', "{\"defaults\":{\"mood\":\"Warm golden neutral\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Warm ivory microsuede surface with a subtle fine matte-stone texture\",\"keepClothing\":true}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Transparent packaging can confuse edges\",\"Busy multi-object source photos are unsupported in this variant\"],\"lastVerified\":\"2026-09-26\"}"::jsonb, true, 'published', '2026-09-25T20:16:47.24393+00:00', '2026-09-25T20:16:47.24393+00:00'),
('635bac63-2c94-5cdc-90fb-6301ee02613a', '49bcb437-5d35-548c-bf21-5e9373f8a02a', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform {{subject}} into a natural, premium in-hand product photograph while preserving its exact shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Show one adult hand holding the product naturally so its everyday size and scale are immediately clear. Place the scene within {{background}}, keeping the product fully visible, sharply focused, and unobstructed by the hand.

Use realistic skin texture, believable hand anatomy, soft diffused light, authentic material reflections, subtle environmental shadows, and {{mood}} colour grading. Keep the background softly out of focus and let the product remain the clear focal point.

Compose for {{ratio}}. Do not add text, logos, watermarks, duplicate products, extra hands, jewellery, clutter, distorted fingers, changed packaging, or altered product details.', "{\"defaults\":{\"mood\":\"Warm neutral\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"A softly blurred neutral bathroom vanity beside a sunlit window\",\"keepClothing\":true}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Transparent packaging can confuse edges\",\"Busy multi-object source photos are unsupported in this variant\"],\"lastVerified\":\"2026-09-26\"}"::jsonb, true, 'published', '2026-09-25T20:16:51.788925+00:00', '2026-09-25T20:16:51.788925+00:00'),
('7925f750-bd89-5eb9-8f90-a821b0db1943', '00bc2b08-0ec6-5ce1-95ce-1aa484bac2b8', 'ChatGPT Image', 'Image edit / transform with uploaded photo', 1, '["source photo"]'::jsonb, '1.0.0', 'Transform {{subject}} into a warm, elevated home editorial product photograph while preserving its exact shape, proportions, materials, original colour, surface finish, packaging details, and {{preserve}}.

Stage the product naturally within {{background}}. Keep it fully visible as the clear focal point, with only a few soft, restrained home details placed in the distant background for atmosphere.

Use natural window light, gentle environmental shadows, realistic tactile materials, a refined shallow depth of field, and {{mood}} colour grading. The result should feel inviting, premium, and photorealistic rather than overly staged.

Compose for {{ratio}}. Do not add text, logos, watermarks, hands, people, duplicate products, unrelated clutter, distorted geometry, or changed product details.', "{\"defaults\":{\"mood\":\"Warm golden neutral\",\"ratio\":\"4:5 Portrait\",\"keepPose\":false,\"background\":\"Sunlit pale-oak table with soft cream linen curtains and a small blurred dried-flower arrangement\",\"keepClothing\":true}}"::jsonb, "{}"::jsonb, "{\"limitations\":[\"Transparent packaging can confuse edges\",\"Busy multi-object source photos are unsupported in this variant\"],\"lastVerified\":\"2026-09-26\"}"::jsonb, true, 'published', '2026-09-25T20:16:56.274338+00:00', '2026-09-25T20:16:56.274338+00:00')
on conflict do nothing;