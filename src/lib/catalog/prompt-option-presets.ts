import { backgroundSchema, moodSchema } from "./schemas";
import { categories } from "./styles";
import type { CatalogStyle } from "./types";
import { defaultsForStyle } from "./prompts";

export type LabeledOption = { value: string; label: string };

type CategoryName = (typeof categories)[number];

const MAX_OPTIONS = 10;
const PRESET_COUNT = 9;

/** Short 2–3 word UI labels for full mood prompt strings. */
export const moodLabels: Record<string, string> = {
  "Warm neutral": "Warm neutral",
  "Deep blue": "Deep blue",
  "Soft pastel": "Soft pastel",
  "Black and white": "Black and white",
  "Warm neutral with luminous gold highlights": "Warm gold highlights",
  "Deep charcoal, black, and warm amber": "Charcoal amber",
  "Sunlit warm gold with fresh natural greens": "Sunlit warm gold",
  "Vintage teal, burnt orange, cream, and faded sepia": "Vintage teal sepia",
  "Muted espresso, charcoal, and warm amber": "Muted espresso",
  "Luminous golden-hour warmth": "Golden hour",
  "Deep teal shadows with burnt-orange highlights": "Teal orange",
  "Rich amber-gold with deep brown shadows": "Amber gold",
  "Soft sunlit analog warmth with a slightly faded film look": "Soft analog film",
  "Warm cinematic golden amber": "Cinematic amber",
  "High-contrast cinematic monochrome with luminous silver highlights and deep soft blacks":
    "Cinematic monochrome",
  "Warm sunlit cinematic contrast with natural skin tones, deep crimson reds, crisp whites, and rich dark shadows":
    "Sunlit cinematic",
  "Warm golden-hour romantic editorial with softly luminous skin, rich natural contrast, creamy highlights, and elegant warm tones":
    "Romantic editorial",
  "Warm cinematic amber glow with rich burgundy reds, creamy highlights, caramel skin tones, and deep soft shadows":
    "Amber burgundy",
  "Soft pastel scrapbook daylight with warm natural skin tones, blush pink, creamy white, muted sky blue, and gentle film softness":
    "Pastel scrapbook",
  "Bright dreamy pastel spring with soft blush pinks, creamy whites, fresh botanical greens, warm natural skin tones, and airy luminous highlights":
    "Dreamy pastel",
  "Moody warm cinematic chiaroscuro with amber highlights, muted skin tones, deep brown-black shadows, and a single rich crimson-red accent":
    "Moody chiaroscuro",
  "Warm nostalgic cinematic sunlight with soft vintage tones, gentle film grain, creamy highlights, and cozy shadow depth":
    "Nostalgic sunlight",
  "Timeless high-contrast cinematic monochrome with soft silver-gray midtones, luminous whites, deep charcoal blacks, and subtle vintage film grain":
    "Timeless monochrome",
  "Soft cinematic monochrome with silver-gray midtones, gentle film grain, luminous highlights, and deep romantic shadows":
    "Soft monochrome",
  "Bright sunlit cinematic outdoor color with vivid sky blue, warm golden skin highlights, deep navy tones, creamy whites, and fresh natural greens":
    "Bright outdoor",
  "Warm cinematic amber-brown editorial with rich skin highlights, deep chocolate shadows, muted earth tones, and subtle film grain":
    "Amber editorial",
  "Soft warm lifestyle daylight with creamy beige neutrals, clean whites, muted blush accents, gentle greens, and playful polished contrast":
    "Lifestyle daylight",
  "Warm nostalgic golden-hour lifestyle with earthy brown tones, sunlit skin, creamy highlights, muted greens, and soft cinematic contrast":
    "Nostalgic lifestyle",
  "Warm heritage cinematic color with rich royal blue, deep crimson roses, natural golden skin tones, soft sandstone neutrals, and refined contrast":
    "Heritage cinematic",
  "Luxurious cinematic monochrome with luminous skin, glossy silver highlights, deep elegant blacks, soft gray midtones, and subtle film grain":
    "Luxury monochrome",
  "Warm golden-hour cinematic glow with honey-amber highlights, rich mustard tones, natural skin color, soft earthy neutrals, and elegant contrast":
    "Golden cinematic",
  "Golden sunset cinematic travel-poster glow with warm peach-orange sky, glowing water reflections, rich blue boat tones, deep red-orange fabric, and soft atmospheric haze":
    "Sunset travel",
  "Warm intimate golden window light with creamy ivory whites, deep ruby-red bangles, antique silver jewelry, natural skin tones, and soft nostalgic film contrast":
    "Golden window",
  "Muted earthy": "Muted earthy",
  "Bright neutral": "Bright neutral",
  "Dark cool neutral": "Dark cool",
  "Warm golden neutral": "Warm golden",
  "Warm nostalgic": "Warm nostalgic",
  "Soft nostalgic": "Soft nostalgic",
  "Moody cinematic": "Moody cinematic",
  "Vibrant cinematic": "Vibrant cinematic",
  "Flashy nostalgic": "Flashy nostalgic",
  "Elegant warm editorial": "Warm editorial",
  "Cozy playful": "Cozy playful",
  "Playful nostalgic": "Playful nostalgic",
  "Warm elegant neutral": "Elegant neutral",
  "Fresh natural green": "Fresh green",
  "Warm golden evening": "Golden evening",
  "Warm natural neutral": "Natural neutral",
  "Warm spa neutral": "Spa neutral",
  "Fresh clean daylight": "Clean daylight",
  "Warm heritage neutral": "Heritage neutral",
  "Warm cheerful": "Warm cheerful",
  "Soft warm natural": "Soft natural",
  "Warm cozy pastel": "Cozy pastel",
  "Bright cheerful cinematic": "Cheerful cinematic",
  "Warm adventurous": "Warm adventurous",
  "Warm premium display": "Premium display",
  "Warm magical adventurous": "Magical adventurous",
  "Warm cozy humorous": "Cozy humorous",
  "Soft warm peaceful": "Soft peaceful",
};

/** Short 2–3 word UI labels for full background prompt strings. */
export const backgroundLabels: Record<string, string> = {
  "Softly blurred interior": "Blurred interior",
  "Window-lit studio": "Window studio",
  "Minimal cream wall": "Cream wall",
  "Keep original background": "Keep original",
  "Upscale softly blurred interior with lateral motion blur": "Motion blur interior",
  "Dark luxury urban interior with a moving blurred crowd": "Dark luxury interior",
  "Bright outdoor park with mature trees and colorful floating confetti": "Park confetti",
  "Retro roadside diner at sunset with a classic red car": "Retro diner",
  "Dim artist studio or reading room beside a textured window": "Artist studio",
  "Historic European-style cobblestone city street with soft café details": "Cobblestone street",
  "Dense dark city crowd at blue hour with heavy motion blur": "Night crowd",
  "Dark indoor room with strong late-afternoon window shadows": "Window shadows",
  "Tree-lined city street with parked cars and subtle street motion blur": "City street",
  "Luxurious indoor festive event with glowing golden lights, reflective surfaces, soft anonymous crowd shapes, and strong horizontal directional motion blur":
    "Festive event",
  "Dark minimal studio background with subtle grain, faint atmospheric particles, soft distant bokeh, and strong backlight creating a glowing silver rim around the hair":
    "Dark rim studio",
  "Dark cool-toned softly blurred outdoor background with minimal detail and strong natural depth separation":
    "Cool outdoor blur",
  "Soft sunlit garden greenery with warm natural bokeh and distant foliage completely out of focus":
    "Sunlit garden",
  "Dark intimate indoor setting with softly blurred warm decorative lights, subtle floral shapes, and deep cinematic bokeh":
    "Intimate indoor",
  "Off-white graph-paper scrapbook page with faint grid lines, torn paper notes, pale-blue tape, small doodles, paper clips, delicate dried flowers, blue botanical accents, and layered photo cutouts":
    "Graph scrapbook",
  "Immersive garden of soft pink and white flowers surrounded by flowing blush-pink, ivory, and botanical-green liquid-wave distortions":
    "Floral garden waves",
  "Dark softly blurred interior with faint warm window-light patches and minimal indistinct shapes":
    "Dark soft interior",
  "Minimal indoor wall near a doorway or window with warm afternoon sunlight and soft geometric window-shadow patterns":
    "Sunlit doorway",
  "Minimal off-white studio backdrop with soft atmospheric texture, faint analog grain, gentle vignette, and two translucent enlarged portrait exposures of the same subject":
    "Off-white studio",
  "Minimal textured wall with dramatic natural leaf shadows and soft sunlight filtering across the scene":
    "Leaf shadow wall",
  "Open vivid blue sky with scattered soft white clouds, surrounded by a dense field of white daisies with yellow centers and large blurred flowers close to the lens":
    "Daisy sky field",
  "Minimal matte warm beige wall with strong directional sunlight and sharply defined head-and-shoulder cast shadows":
    "Beige shadow wall",
  "Layered cream scrapbook page with torn paper, tilted Polaroid frames, tape pieces, handwritten doodles, tiny hearts, casual note cards, and soft outdoor greenery inside selected photo frames":
    "Cream scrapbook",
  "Peaceful tree-lined residential street with sun-dappled pavement, light boundary walls, leafy shadows, and a calm boho outdoor atmosphere":
    "Boho street",
  "Historic sandstone courtyard with old stone steps, textured heritage walls, carved archways, and softly blurred palace architecture":
    "Sandstone courtyard",
  "Dark elegant indoor evening setting with soft circular bokeh lights, minimal detail, and shallow cinematic depth":
    "Evening bokeh",
  "Quiet sunlit residential street with warm walls, trees, soft greenery, neighborhood gates, and long late-afternoon shadows":
    "Quiet street",
  "Varanasi-inspired riverside ghats at sunset with historic buildings, temple silhouettes, river boats, glowing shoreline lights, broad reflective water, and flying birds in the sky":
    "Riverside sunset",
  "Warm traditional indoor setting beside a wooden window or doorway with muted beige-brown walls, soft sunlight, and shallow cinematic blur":
    "Traditional indoor",
  "Grassy hillside meadow with tall wild grass, a bare tree, and a cloudy sky": "Hillside meadow",
  "Pure white seamless infinity studio background": "White infinity",
  "Monochrome coral seamless studio backdrop with a circular coral pedestal": "Coral pedestal",
  "Sunlit pale-oak desk with a softly blurred open notebook, ceramic cup, and minimal greenery near a window":
    "Oak desk",
  "Warm light-beige textured paper surface with a closed cream notebook and graphite pencil at the edges":
    "Paper surface",
  "Warm limestone pedestal with soft green leaves, natural stone, folded unbleached linen, and a pale beige backdrop":
    "Limestone pedestal",
  "Deep charcoal-black seamless studio with a low black reflective plinth": "Charcoal studio",
  "Pale sage-to-cream gradient studio background with subtle curved light trails":
    "Sage gradient",
  "Warm ivory microsuede surface with a subtle fine matte-stone texture": "Ivory microsuede",
  "A softly blurred neutral bathroom vanity beside a sunlit window": "Bathroom vanity",
  "Sunlit pale-oak table with soft cream linen curtains and a small blurred dried-flower arrangement":
    "Oak table",
  "Evening city lights with soft distant bokeh": "City bokeh",
  "Classic mottled studio backdrop": "Mottled studio",
  "Luxury rooftop at sunset with city lights": "Rooftop sunset",
  "Layered handmade scrapbook page with torn paper, tape, mini photos, and doodles":
    "Handmade scrapbook",
  "Detailed scenic outdoor adventure setting": "Outdoor adventure",
  "Sunset beach hangout with casual party vibe": "Sunset beach",
  "Luxury garden picnic with soft golden-hour light": "Garden picnic",
  "Cozy retro living-room set with warm ambient lights": "Retro living room",
  "Miniature snowy village scene with handcrafted depth": "Snowy village",
  "Cozy indoor celebration setting with subtle booth-style atmosphere": "Indoor celebration",
  "Cozy contemporary bedroom interior with warm wood accents, layered neutral textiles, soft curtains and subtle greenery":
    "Cozy bedroom",
  "Modern staged living room with cream upholstery, warm natural wood, textured neutral rug, soft curtains, indoor greenery and refined minimal decor":
    "Modern living room",
  "Upscale contemporary living room with cream upholstery, warm walnut wood, soft layered textiles, refined artwork, indoor greenery and subtle premium lighting":
    "Upscale living room",
  "Natural residential garden with healthy lawn, layered shrubs, flowering borders, ornamental grasses, small trees and a subtle stepping-stone pathway":
    "Residential garden",
  "Cozy rooftop outdoor living area with natural wood seating, cream cushions, dining furniture, slatted pergola, warm ambient lighting, climbing greenery and potted plants":
    "Rooftop living",
  "Refined suburban front yard with manicured lawn, layered shrubs, flowering borders, stone walkway, warm entry lighting and subtle landscape uplighting":
    "Suburban front yard",
  "Warm contemporary kitchen with cream upper cabinets, muted sage lower cabinets, light stone countertops, white tile backsplash, brass hardware, stainless appliances and subtle greenery":
    "Contemporary kitchen",
  "Contemporary spa bathroom with warm wood vanity, pale stone surfaces, large-format neutral tile, frameless glass shower, brushed brass fixtures, soft integrated lighting and subtle greenery":
    "Spa bathroom",
  "Clean walkable residential street with improved sidewalks, street trees, planters, benches, tidy façades, organized edges and subtle modern street lighting":
    "Walkable street",
  "Carefully restored historic façade with warm aged plaster, repaired stone details, restored timber shutters and doors, preserved iron balcony railings and subtle authentic patina":
    "Historic façade",
  "Cozy softly lit home interior": "Home interior",
  "Minimal white watercolor paper with delicate green botanical foliage and soft pigment splashes":
    "Watercolor paper",
  "Cozy softly lit bedroom with blankets, cushions, warm lamps, natural wood and subtle greenery":
    "Soft bedroom",
  "Lush sunlit animated natural environment with soft foliage and atmospheric depth":
    "Animated nature",
  "Sunlit anime countryside with green fields, trees, distant hills, soft clouds, wildflowers and gentle atmospheric depth":
    "Anime countryside",
  "Clean softly lit collector display setting with a premium wooden base and subtle studio blur":
    "Collector display",
  "Enchanted forest path with flowers, sunlight, a stone bridge, distant castle, and whimsical storybook scenery":
    "Enchanted forest",
  "Cozy home office desk with a laptop, coffee mug, notebook, warm lamp light, books, and soft greenery":
    "Home office",
  "Peaceful flower-filled garden with soft golden sunset light, distant misty hills, delicate blossoms, and a faint rainbow":
    "Flower garden",
};

const genericMoodPresets = [
  "Warm neutral",
  "Moody cinematic",
  "Black and white",
  "Soft pastel",
  "Warm nostalgic",
  "Vibrant cinematic",
  "Fresh clean daylight",
  "Elegant warm editorial",
  "Luminous golden-hour warmth",
] as const;

const genericBackgroundPresets = [
  "Softly blurred interior",
  "Window-lit studio",
  "Minimal cream wall",
  "Keep original background",
  "Evening city lights with soft distant bokeh",
  "Soft sunlit garden greenery with warm natural bokeh and distant foliage completely out of focus",
  "Classic mottled studio backdrop",
  "Luxury rooftop at sunset with city lights",
  "Cozy softly lit home interior",
] as const;

/** Nine curated full mood values per category. */
export const categoryMoodPresets: Record<CategoryName, readonly string[]> = {
  Cinematic: [
    "Moody cinematic",
    "Vibrant cinematic",
    "Warm cinematic golden amber",
    "Deep charcoal, black, and warm amber",
    "Luminous golden-hour warmth",
    "High-contrast cinematic monochrome with luminous silver highlights and deep soft blacks",
    "Deep teal shadows with burnt-orange highlights",
    "Warm sunlit cinematic contrast with natural skin tones, deep crimson reds, crisp whites, and rich dark shadows",
    "Black and white",
  ],
  Anime: [
    "Bright cheerful cinematic",
    "Soft pastel",
    "Warm cozy pastel",
    "Bright dreamy pastel spring with soft blush pinks, creamy whites, fresh botanical greens, warm natural skin tones, and airy luminous highlights",
    "Warm cheerful",
    "Fresh natural green",
    "Soft warm peaceful",
    "Vibrant cinematic",
    "Cozy playful",
  ],
  Painting: [
    "Soft warm peaceful",
    "Soft pastel",
    "Muted earthy",
    "Soft nostalgic",
    "Warm spa neutral",
    "Fresh natural green",
    "Soft sunlit analog warmth with a slightly faded film look",
    "Warm neutral",
    "Elegant warm editorial",
  ],
  Vintage: [
    "Warm nostalgic",
    "Soft nostalgic",
    "Flashy nostalgic",
    "Playful nostalgic",
    "Vintage teal, burnt orange, cream, and faded sepia",
    "Soft sunlit analog warmth with a slightly faded film look",
    "Warm nostalgic cinematic sunlight with soft vintage tones, gentle film grain, creamy highlights, and cozy shadow depth",
    "Soft pastel scrapbook daylight with warm natural skin tones, blush pink, creamy white, muted sky blue, and gentle film softness",
    "Muted espresso, charcoal, and warm amber",
  ],
  "Professional portraits": [
    "Elegant warm editorial",
    "Warm neutral",
    "Black and white",
    "Warm golden-hour romantic editorial with softly luminous skin, rich natural contrast, creamy highlights, and elegant warm tones",
    "Luxurious cinematic monochrome with luminous skin, glossy silver highlights, deep elegant blacks, soft gray midtones, and subtle film grain",
    "Fresh clean daylight",
    "Warm elegant neutral",
    "Soft cinematic monochrome with silver-gray midtones, gentle film grain, luminous highlights, and deep romantic shadows",
    "Bright neutral",
  ],
  Fantasy: [
    "Warm magical adventurous",
    "Warm adventurous",
    "Bright dreamy pastel spring with soft blush pinks, creamy whites, fresh botanical greens, warm natural skin tones, and airy luminous highlights",
    "Soft warm peaceful",
    "Vibrant cinematic",
    "Luminous golden-hour warmth",
    "Soft pastel",
    "Warm cozy pastel",
    "Moody cinematic",
  ],
  Pets: [
    "Warm cozy humorous",
    "Cozy playful",
    "Soft warm natural",
    "Warm cheerful",
    "Soft warm peaceful",
    "Warm cozy pastel",
    "Fresh natural green",
    "Warm natural neutral",
    "Soft pastel",
  ],
  Travel: [
    "Luminous golden-hour warmth",
    "Bright sunlit cinematic outdoor color with vivid sky blue, warm golden skin highlights, deep navy tones, creamy whites, and fresh natural greens",
    "Golden sunset cinematic travel-poster glow with warm peach-orange sky, glowing water reflections, rich blue boat tones, deep red-orange fabric, and soft atmospheric haze",
    "Warm golden evening",
    "Fresh clean daylight",
    "Sunlit warm gold with fresh natural greens",
    "Warm heritage neutral",
    "Warm nostalgic golden-hour lifestyle with earthy brown tones, sunlit skin, creamy highlights, muted greens, and soft cinematic contrast",
    "Vibrant cinematic",
  ],
  "3D avatars": [
    "Warm premium display",
    "Cozy playful",
    "Bright cheerful cinematic",
    "Warm cheerful",
    "Soft pastel",
    "Vibrant cinematic",
    "Warm cozy humorous",
    "Playful nostalgic",
    "Fresh clean daylight",
  ],
  "Product and objects": [
    "Fresh clean daylight",
    "Warm neutral",
    "Bright neutral",
    "Warm spa neutral",
    "Dark cool neutral",
    "Warm elegant neutral",
    "Warm natural neutral",
    "Muted earthy",
    "Warm premium display",
  ],
};

/** Nine curated full background values per category. */
export const categoryBackgroundPresets: Record<CategoryName, readonly string[]> = {
  Cinematic: [
    "Dark luxury urban interior with a moving blurred crowd",
    "Dense dark city crowd at blue hour with heavy motion blur",
    "Evening city lights with soft distant bokeh",
    "Dark elegant indoor evening setting with soft circular bokeh lights, minimal detail, and shallow cinematic depth",
    "Dim artist studio or reading room beside a textured window",
    "Dark indoor room with strong late-afternoon window shadows",
    "Luxury rooftop at sunset with city lights",
    "Tree-lined city street with parked cars and subtle street motion blur",
    "Dark softly blurred interior with faint warm window-light patches and minimal indistinct shapes",
  ],
  Anime: [
    "Sunlit anime countryside with green fields, trees, distant hills, soft clouds, wildflowers and gentle atmospheric depth",
    "Lush sunlit animated natural environment with soft foliage and atmospheric depth",
    "Peaceful flower-filled garden with soft golden sunset light, distant misty hills, delicate blossoms, and a faint rainbow",
    "Open vivid blue sky with scattered soft white clouds, surrounded by a dense field of white daisies with yellow centers and large blurred flowers close to the lens",
    "Soft sunlit garden greenery with warm natural bokeh and distant foliage completely out of focus",
    "Bright outdoor park with mature trees and colorful floating confetti",
    "Grassy hillside meadow with tall wild grass, a bare tree, and a cloudy sky",
    "Cozy softly lit home interior",
    "Keep original background",
  ],
  Painting: [
    "Minimal white watercolor paper with delicate green botanical foliage and soft pigment splashes",
    "Soft sunlit garden greenery with warm natural bokeh and distant foliage completely out of focus",
    "Peaceful flower-filled garden with soft golden sunset light, distant misty hills, delicate blossoms, and a faint rainbow",
    "Warm light-beige textured paper surface with a closed cream notebook and graphite pencil at the edges",
    "Minimal cream wall",
    "Softly blurred interior",
    "Dim artist studio or reading room beside a textured window",
    "Grassy hillside meadow with tall wild grass, a bare tree, and a cloudy sky",
    "Keep original background",
  ],
  Vintage: [
    "Retro roadside diner at sunset with a classic red car",
    "Cozy retro living-room set with warm ambient lights",
    "Layered handmade scrapbook page with torn paper, tape, mini photos, and doodles",
    "Off-white graph-paper scrapbook page with faint grid lines, torn paper notes, pale-blue tape, small doodles, paper clips, delicate dried flowers, blue botanical accents, and layered photo cutouts",
    "Layered cream scrapbook page with torn paper, tilted Polaroid frames, tape pieces, handwritten doodles, tiny hearts, casual note cards, and soft outdoor greenery inside selected photo frames",
    "Classic mottled studio backdrop",
    "Cozy indoor celebration setting with subtle booth-style atmosphere",
    "Quiet sunlit residential street with warm walls, trees, soft greenery, neighborhood gates, and long late-afternoon shadows",
    "Keep original background",
  ],
  "Professional portraits": [
    "Window-lit studio",
    "Minimal cream wall",
    "Classic mottled studio backdrop",
    "Dark minimal studio background with subtle grain, faint atmospheric particles, soft distant bokeh, and strong backlight creating a glowing silver rim around the hair",
    "Softly blurred interior",
    "Minimal matte warm beige wall with strong directional sunlight and sharply defined head-and-shoulder cast shadows",
    "Minimal indoor wall near a doorway or window with warm afternoon sunlight and soft geometric window-shadow patterns",
    "Minimal off-white studio backdrop with soft atmospheric texture, faint analog grain, gentle vignette, and two translucent enlarged portrait exposures of the same subject",
    "Keep original background",
  ],
  Fantasy: [
    "Enchanted forest path with flowers, sunlight, a stone bridge, distant castle, and whimsical storybook scenery",
    "Immersive garden of soft pink and white flowers surrounded by flowing blush-pink, ivory, and botanical-green liquid-wave distortions",
    "Peaceful flower-filled garden with soft golden sunset light, distant misty hills, delicate blossoms, and a faint rainbow",
    "Detailed scenic outdoor adventure setting",
    "Miniature snowy village scene with handcrafted depth",
    "Open vivid blue sky with scattered soft white clouds, surrounded by a dense field of white daisies with yellow centers and large blurred flowers close to the lens",
    "Grassy hillside meadow with tall wild grass, a bare tree, and a cloudy sky",
    "Soft sunlit garden greenery with warm natural bokeh and distant foliage completely out of focus",
    "Keep original background",
  ],
  Pets: [
    "Cozy softly lit bedroom with blankets, cushions, warm lamps, natural wood and subtle greenery",
    "Cozy softly lit home interior",
    "Peaceful flower-filled garden with soft golden sunset light, distant misty hills, delicate blossoms, and a faint rainbow",
    "Minimal white watercolor paper with delicate green botanical foliage and soft pigment splashes",
    "Soft sunlit garden greenery with warm natural bokeh and distant foliage completely out of focus",
    "Cozy home office desk with a laptop, coffee mug, notebook, warm lamp light, books, and soft greenery",
    "Bright outdoor park with mature trees and colorful floating confetti",
    "Softly blurred interior",
    "Keep original background",
  ],
  Travel: [
    "Historic European-style cobblestone city street with soft café details",
    "Sunset beach hangout with casual party vibe",
    "Varanasi-inspired riverside ghats at sunset with historic buildings, temple silhouettes, river boats, glowing shoreline lights, broad reflective water, and flying birds in the sky",
    "Luxury garden picnic with soft golden-hour light",
    "Peaceful tree-lined residential street with sun-dappled pavement, light boundary walls, leafy shadows, and a calm boho outdoor atmosphere",
    "Historic sandstone courtyard with old stone steps, textured heritage walls, carved archways, and softly blurred palace architecture",
    "Natural residential garden with healthy lawn, layered shrubs, flowering borders, ornamental grasses, small trees and a subtle stepping-stone pathway",
    "Luxury rooftop at sunset with city lights",
    "Keep original background",
  ],
  "3D avatars": [
    "Clean softly lit collector display setting with a premium wooden base and subtle studio blur",
    "Pure white seamless infinity studio background",
    "Softly blurred interior",
    "Minimal cream wall",
    "Classic mottled studio backdrop",
    "Window-lit studio",
    "Pale sage-to-cream gradient studio background with subtle curved light trails",
    "Deep charcoal-black seamless studio with a low black reflective plinth",
    "Keep original background",
  ],
  "Product and objects": [
    "Pure white seamless infinity studio background",
    "Monochrome coral seamless studio backdrop with a circular coral pedestal",
    "Deep charcoal-black seamless studio with a low black reflective plinth",
    "Warm limestone pedestal with soft green leaves, natural stone, folded unbleached linen, and a pale beige backdrop",
    "Sunlit pale-oak desk with a softly blurred open notebook, ceramic cup, and minimal greenery near a window",
    "A softly blurred neutral bathroom vanity beside a sunlit window",
    "Warm ivory microsuede surface with a subtle fine matte-stone texture",
    "Sunlit pale-oak table with soft cream linen curtains and a small blurred dried-flower arrangement",
    "Keep original background",
  ],
};

function isCategoryName(value: string): value is CategoryName {
  return (categories as readonly string[]).includes(value);
}

function shortLabelFallback(value: string): string {
  const words = value
    .replace(/[,—]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3);
  return words.join(" ") || value;
}

function labelFor(kind: "mood" | "background", value: string): string {
  const map = kind === "mood" ? moodLabels : backgroundLabels;
  return map[value] ?? shortLabelFallback(value);
}

function presetsFor(
  category: string,
  kind: "mood" | "background",
): readonly string[] {
  if (isCategoryName(category)) {
    const presets =
      kind === "mood"
        ? categoryMoodPresets[category]
        : categoryBackgroundPresets[category];
    return presets.slice(0, PRESET_COUNT);
  }
  return kind === "mood" ? genericMoodPresets : genericBackgroundPresets;
}

/**
 * Up to 10 labeled options for a style: default first, then category presets.
 * Values are full prompt strings; labels are short UI text.
 */
export function labeledOptionsForStyle(
  style: CatalogStyle,
  kind: "mood" | "background",
): LabeledOption[] {
  const defaults = defaultsForStyle(style);
  const defaultValue = kind === "mood" ? defaults.mood : defaults.background;
  const presets = presetsFor(style.category, kind);

  const values: string[] = [defaultValue];
  for (const preset of presets) {
    if (values.length >= MAX_OPTIONS) break;
    if (preset === defaultValue) continue;
    values.push(preset);
  }

  return values.map((value) => ({
    value,
    label: labelFor(kind, value),
  }));
}

/** Dev/test helper: ensure preset values exist in the schema enums. */
export function assertPresetValuesInSchema(): void {
  const moodSet = new Set<string>(moodSchema.options);
  const backgroundSet = new Set<string>(backgroundSchema.options);

  for (const category of categories) {
    for (const mood of categoryMoodPresets[category]) {
      if (!moodSet.has(mood)) {
        throw new Error(`Unknown mood preset for ${category}: ${mood}`);
      }
    }
    for (const background of categoryBackgroundPresets[category]) {
      if (!backgroundSet.has(background)) {
        throw new Error(`Unknown background preset for ${category}: ${background}`);
      }
    }
  }
}
