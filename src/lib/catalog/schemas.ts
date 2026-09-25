import { z } from "zod";

export const styleSubjectSchema = z.enum([
  "Person",
  "Group",
  "Pet",
  "Place",
  "Product or object",
]);

export const editIntentSchema = z.enum([
  "Change lighting",
  "Change background",
  "Artistic restyle",
  "New outfit or theme",
  "Full scene transformation",
]);

export const inputRequirementSchema = z.enum([
  "One photo",
  "Photo plus style reference",
]);

export const publishStatusSchema = z.enum([
  "draft",
  "in_review",
  "published",
  "archived",
]);

export const moodSchema = z.enum([
  "Warm neutral",
  "Deep blue",
  "Soft pastel",
  "Black and white",
  "Warm neutral with luminous gold highlights",
  "Deep charcoal, black, and warm amber",
  "Sunlit warm gold with fresh natural greens",
  "Vintage teal, burnt orange, cream, and faded sepia",
  "Muted espresso, charcoal, and warm amber",
  "Luminous golden-hour warmth",
  "Deep teal shadows with burnt-orange highlights",
  "Rich amber-gold with deep brown shadows",
  "Soft sunlit analog warmth with a slightly faded film look",
  "Warm cinematic golden amber",
  "High-contrast cinematic monochrome with luminous silver highlights and deep soft blacks",
  "Warm sunlit cinematic contrast with natural skin tones, deep crimson reds, crisp whites, and rich dark shadows",
  "Warm golden-hour romantic editorial with softly luminous skin, rich natural contrast, creamy highlights, and elegant warm tones",
  "Warm cinematic amber glow with rich burgundy reds, creamy highlights, caramel skin tones, and deep soft shadows",
  "Soft pastel scrapbook daylight with warm natural skin tones, blush pink, creamy white, muted sky blue, and gentle film softness",
  "Bright dreamy pastel spring with soft blush pinks, creamy whites, fresh botanical greens, warm natural skin tones, and airy luminous highlights",
  "Moody warm cinematic chiaroscuro with amber highlights, muted skin tones, deep brown-black shadows, and a single rich crimson-red accent",
  "Warm nostalgic cinematic sunlight with soft vintage tones, gentle film grain, creamy highlights, and cozy shadow depth",
  "Timeless high-contrast cinematic monochrome with soft silver-gray midtones, luminous whites, deep charcoal blacks, and subtle vintage film grain",
  "Soft cinematic monochrome with silver-gray midtones, gentle film grain, luminous highlights, and deep romantic shadows",
  "Bright sunlit cinematic outdoor color with vivid sky blue, warm golden skin highlights, deep navy tones, creamy whites, and fresh natural greens",
  "Warm cinematic amber-brown editorial with rich skin highlights, deep chocolate shadows, muted earth tones, and subtle film grain",
  "Soft warm lifestyle daylight with creamy beige neutrals, clean whites, muted blush accents, gentle greens, and playful polished contrast",
  "Warm nostalgic golden-hour lifestyle with earthy brown tones, sunlit skin, creamy highlights, muted greens, and soft cinematic contrast",
  "Warm heritage cinematic color with rich royal blue, deep crimson roses, natural golden skin tones, soft sandstone neutrals, and refined contrast",
  "Luxurious cinematic monochrome with luminous skin, glossy silver highlights, deep elegant blacks, soft gray midtones, and subtle film grain",
  "Warm golden-hour cinematic glow with honey-amber highlights, rich mustard tones, natural skin color, soft earthy neutrals, and elegant contrast",
  "Golden sunset cinematic travel-poster glow with warm peach-orange sky, glowing water reflections, rich blue boat tones, deep red-orange fabric, and soft atmospheric haze",
  "Warm intimate golden window light with creamy ivory whites, deep ruby-red bangles, antique silver jewelry, natural skin tones, and soft nostalgic film contrast",
  "Muted earthy",
  "Bright neutral",
  "Dark cool neutral",
  "Warm golden neutral",
]);

export const backgroundSchema = z.enum([
  "Softly blurred interior",
  "Window-lit studio",
  "Minimal cream wall",
  "Keep original background",
  "Upscale softly blurred interior with lateral motion blur",
  "Dark luxury urban interior with a moving blurred crowd",
  "Bright outdoor park with mature trees and colorful floating confetti",
  "Retro roadside diner at sunset with a classic red car",
  "Dim artist studio or reading room beside a textured window",
  "Historic European-style cobblestone city street with soft café details",
  "Dense dark city crowd at blue hour with heavy motion blur",
  "Dark indoor room with strong late-afternoon window shadows",
  "Tree-lined city street with parked cars and subtle street motion blur",
  "Luxurious indoor festive event with glowing golden lights, reflective surfaces, soft anonymous crowd shapes, and strong horizontal directional motion blur",
  "Dark minimal studio background with subtle grain, faint atmospheric particles, soft distant bokeh, and strong backlight creating a glowing silver rim around the hair",
  "Dark cool-toned softly blurred outdoor background with minimal detail and strong natural depth separation",
  "Soft sunlit garden greenery with warm natural bokeh and distant foliage completely out of focus",
  "Dark intimate indoor setting with softly blurred warm decorative lights, subtle floral shapes, and deep cinematic bokeh",
  "Off-white graph-paper scrapbook page with faint grid lines, torn paper notes, pale-blue tape, small doodles, paper clips, delicate dried flowers, blue botanical accents, and layered photo cutouts",
  "Immersive garden of soft pink and white flowers surrounded by flowing blush-pink, ivory, and botanical-green liquid-wave distortions",
  "Dark softly blurred interior with faint warm window-light patches and minimal indistinct shapes",
  "Minimal indoor wall near a doorway or window with warm afternoon sunlight and soft geometric window-shadow patterns",
  "Minimal off-white studio backdrop with soft atmospheric texture, faint analog grain, gentle vignette, and two translucent enlarged portrait exposures of the same subject",
  "Minimal textured wall with dramatic natural leaf shadows and soft sunlight filtering across the scene",
  "Open vivid blue sky with scattered soft white clouds, surrounded by a dense field of white daisies with yellow centers and large blurred flowers close to the lens",
  "Minimal matte warm beige wall with strong directional sunlight and sharply defined head-and-shoulder cast shadows",
  "Layered cream scrapbook page with torn paper, tilted Polaroid frames, tape pieces, handwritten doodles, tiny hearts, casual note cards, and soft outdoor greenery inside selected photo frames",
  "Peaceful tree-lined residential street with sun-dappled pavement, light boundary walls, leafy shadows, and a calm boho outdoor atmosphere",
  "Historic sandstone courtyard with old stone steps, textured heritage walls, carved archways, and softly blurred palace architecture",
  "Dark elegant indoor evening setting with soft circular bokeh lights, minimal detail, and shallow cinematic depth",
  "Quiet sunlit residential street with warm walls, trees, soft greenery, neighborhood gates, and long late-afternoon shadows",
  "Varanasi-inspired riverside ghats at sunset with historic buildings, temple silhouettes, river boats, glowing shoreline lights, broad reflective water, and flying birds in the sky",
  "Warm traditional indoor setting beside a wooden window or doorway with muted beige-brown walls, soft sunlight, and shallow cinematic blur",
  "Grassy hillside meadow with tall wild grass, a bare tree, and a cloudy sky",
  "Pure white seamless infinity studio background",
  "Monochrome coral seamless studio backdrop with a circular coral pedestal",
  "Sunlit pale-oak desk with a softly blurred open notebook, ceramic cup, and minimal greenery near a window",
  "Warm light-beige textured paper surface with a closed cream notebook and graphite pencil at the edges",
  "Warm limestone pedestal with soft green leaves, natural stone, folded unbleached linen, and a pale beige backdrop",
  "Deep charcoal-black seamless studio with a low black reflective plinth",
  "Pale sage-to-cream gradient studio background with subtle curved light trails",
  "Warm ivory microsuede surface with a subtle fine matte-stone texture",
  "A softly blurred neutral bathroom vanity beside a sunlit window",
  "Sunlit pale-oak table with soft cream linen curtains and a small blurred dried-flower arrangement",
]);

export const ratioSchema = z.enum(["4:5 Portrait", "1:1 Square", "9:16 Story"]);

export const promptOptionsSchema = z.object({
  mood: moodSchema,
  background: backgroundSchema,
  ratio: ratioSchema,
  keepClothing: z.boolean(),
  keepPose: z.boolean(),
});

export type PromptOptionsInput = z.infer<typeof promptOptionsSchema>;

export const exploreQuerySchema = z.object({
  q: z.string().max(120).optional().default(""),
  sort: z.enum(["Trending", "Newest", "Most saved"]).optional().default("Trending"),
  category: z.array(z.string()).optional().default([]),
  subject: z.array(z.string()).optional().default([]),
  intent: z.array(z.string()).optional().default([]),
  requirement: z.array(z.string()).optional().default([]),
  tool: z.array(z.string()).optional().default([]),
});

export type ExploreQuery = z.infer<typeof exploreQuerySchema>;
