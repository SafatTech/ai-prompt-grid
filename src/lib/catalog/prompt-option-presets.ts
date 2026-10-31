import { categories } from "./filter-constants";
import type { CatalogStyle } from "./types";
import { defaultsForStyleCore } from "./prompt-core";

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
  "Warm golden": "Warm golden",
  "Eerie cool": "Eerie cool",
  "Warm magical": "Warm magical",
  "Moody gothic": "Moody gothic",
  "Soft dramatic": "Soft dramatic",
  "Warm golden festive": "Golden festive",
  "Warm candid festive": "Candid festive",
  "Rich warm celebratory": "Rich celebratory",
  "Warm romantic festive": "Romantic festive",
  "Soft warm festive": "Soft festive",
  "Warm evening festive": "Evening festive",
  "Warm joyful festive": "Joyful festive",
  "Soft warm dreamy": "Soft dreamy",
  "Cozy warm winter festive": "Winter festive",
  "Rich saturated sunset colors with painted-poster warmth and slight print wear":
    "Poster sunset",
  "Warm sunset backlight with soft golden haze": "Sunset backlight",
  "Match the original photo's colors": "Match original colors",
  "Crisp icy blue with warm natural skin tones and bright snow highlights":
    "Crisp icy blue",
  "Warm amber tea-stall glow against cool blue snowy dusk": "Amber tea glow",
  "Soft winter pastel with rose-pink accents, creamy whites, and natural warm skin tones":
    "Soft winter pastel",
  "Warm cozy winter glow with soft amber highlights and cool snowy shadows":
    "Cozy winter glow",
  "Warm festive cel-shaded glow with saffron, magenta, and gold accents and soft evening highlights":
    "Festive cel glow",
  "Luxe black and gold": "Luxe black gold",
  "Soft baby blue": "Soft baby blue",
  "Neon pink glow": "Neon pink glow",
  "Warm cinematic night": "Cinematic night",
  "Vibrant party": "Vibrant party",
  "Warm aesthetic": "Warm aesthetic",
  "Fresh natural sunny": "Fresh sunny",
  "Soft romantic floral": "Romantic floral",
  "Bold vibrant": "Bold vibrant",
  "Warm nostalgic film": "Nostalgic film",
  "Cool cinematic night": "Cool night",
  "Cool muted editorial": "Cool editorial",
  "Warm romantic daylight": "Romantic daylight",
  "Warm golden dusk": "Golden dusk",
  "Moody blue and amber": "Blue amber",
  "Golden sunset": "Golden sunset",
  "Faded 90s film": "Faded 90s",
  "Golden hazy sunset": "Hazy sunset",
  "High-contrast urban": "High contrast",
  "Warm heritage sunlight": "Heritage sunlight",
  "Neon pink and blue": "Neon pink blue",
  "Fresh monsoon": "Fresh monsoon",
  "Natural golden hour": "Natural golden",
  "Warm festive red and gold": "Festive red gold",
  "Soft festive cream and red": "Cream and red",
  "Warm fireside amber": "Fireside amber",
  "Rich festive jewel tones": "Jewel tones",
  "Warm classic Christmas": "Classic Christmas",
  "Bright peppermint red and white": "Peppermint red",
  "Soft romantic Christmas": "Romantic Christmas",
  "Cheerful warm kitchen": "Warm kitchen",
  "Magical gold and emerald": "Gold emerald",
  "Faded 70s film": "Faded 70s",
  "Cozy festive warm": "Cozy festive",
  "Festive red and green evening": "Red green evening",
  "Electric teal and violet": "Electric teal violet",
  "Warm sunny storybook": "Sunny storybook",
  "Clean studio daylight": "Studio daylight",
  "Pink and cyan neon": "Pink cyan neon",
  "Bold flash pop": "Bold flash pop",
  "Icy silver and blue": "Icy silver blue",
  "Teal and magenta neon": "Teal magenta neon",
  "Green and cyan code glow": "Code glow",
  "Deep violet high contrast": "Deep violet",
  "Clean neutral studio": "Neutral studio",
  "Rainy neon action": "Rainy neon action",
  "Cold steel and gold rays": "Steel and gold rays",
  "Twilight emerald glow": "Twilight emerald",
  "Soft misty dawn": "Misty dawn",
  "Twilight indigo and lamp gold": "Indigo lamp gold",
  "Golden hour adventure": "Golden adventure",
  "Graphite and electric blue": "Graphite electric blue",
  "Night city blue and gold": "Night city gold",
  "Neon night teal": "Neon night teal",
  "Rainy steel blue": "Rainy steel blue",
  "Fiery dusk orange and teal": "Fiery dusk teal",
  "Bright playful primary colors": "Playful primaries",
  "Stormy blue lightning": "Stormy lightning",
  "Explosive orange and blue": "Explosive orange blue",
  "Galaxy violet and gold": "Galaxy violet gold",
  "Blazing gold power": "Blazing gold",
  "Pastel 90s sunset": "Pastel 90s sunset",
  "Glowing sunset painterly": "Painterly sunset",
  "Moonlit silver blue": "Moonlit silver blue",
  "Sunset orange and leaf green": "Sunset leaf green",
  "Crimson autumn": "Crimson autumn",
  "Soft pastel candy": "Pastel candy",
  "Warm golden glow on dark": "Golden glow dark",
  "Steel blue and warning orange": "Steel and warning orange",
  "Soft blossom pink": "Blossom pink",
  "Hot sunset orange and pink": "Hot sunset pink",
  "Grey-blue misty dark fantasy": "Misty dark fantasy",
  "Glowing gamer blue": "Gamer blue",
  "Bright tropical pop": "Tropical pop",
  "Saturated splash-art": "Splash-art color",
  "Retro bright pixel": "Retro pixel",
  "Sunny candy pastel": "Candy pastel",
  "Crimson versus electric blue": "Crimson versus blue",
  "Cold misty steel": "Cold misty steel",
  "Misty jade mountains": "Misty jade",
  "Sun-dappled forest gold": "Forest gold",
  "Royal jewel tones": "Royal jewel tones",
  "Fiery ember sky": "Fiery ember sky",
  "Faded 80s film": "Faded 80s film",
  "Candlelit magic gold": "Candlelit gold",
  "Violet arcane glow": "Violet arcane",
  "Desert sunset gold": "Desert sunset gold",
  "Dusty desert sci-fi": "Dusty desert sci-fi",
  "Cosmic blue wonder": "Cosmic blue",
  "Chrome and cyan rim": "Chrome cyan rim",
  "Neon crimson and cyan": "Neon crimson cyan",
  "Burnt orange desert": "Burnt orange desert",
  "Moody blockbuster teal and orange": "Blockbuster teal orange",
  "Warm 70s painted": "Warm 70s painted",
  "Grainy flash shadows": "Grainy flash",
  "Early-2000s digital flash": "Early-2000s flash",
  "Black and white noir": "Black and white noir",
  "Glamorous night gold": "Glamorous night gold",
  "Dusty sunset sepia": "Dusty sepia",
  "Desaturated survival": "Desaturated survival",
  "Cold steel 1920s": "Cold steel 1920s",
  "Moody candle and fog": "Candle and fog",
  "Pastel candlelit romance": "Pastel candlelit",
  "Moonlit crimson": "Moonlit crimson",
  "Soft magical rose gold": "Magical rose gold",
  "Moody brown dark academia": "Dark academia brown",
  "Saturated 90s toy colors": "90s toy colors",
  "Bright toy primaries": "Bright toy primaries",
  "Cozy warm craft": "Cozy craft",
  "Warm handmade clay": "Handmade clay",
  "Rich royal crimson": "Royal crimson",
  "Soft dreamy pastel": "Dreamy pastel",
  "Deep jewel-tone dramatic": "Jewel dramatic",
  "Soft ivory luminous": "Ivory luminous",
  "Glamorous champagne silver": "Champagne silver",
  "Vibrant warm festive": "Warm festive",
  "Soft cinematic ivory": "Cinematic ivory",
  "Rich regal gold": "Regal gold",
  "Moody cinematic noir gold": "Noir gold",
  "Warm evening elegant": "Evening elegant",
  "Rich royal maroon gold": "Maroon gold",
  "Dramatic festive crimson": "Festive crimson",
  "Glamorous midnight cinematic": "Midnight glam",
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
  "Historic European-style cobblestone city street with soft café details":
    "Cobblestone street",
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
  "Grassy hillside meadow with tall wild grass, a bare tree, and a cloudy sky":
    "Hillside meadow",
  "Pure white seamless infinity studio background": "White infinity",
  "Monochrome coral seamless studio backdrop with a circular coral pedestal":
    "Coral pedestal",
  "Sunlit pale-oak desk with a softly blurred open notebook, ceramic cup, and minimal greenery near a window":
    "Oak desk",
  "Warm light-beige textured paper surface with a closed cream notebook and graphite pencil at the edges":
    "Paper surface",
  "Warm limestone pedestal with soft green leaves, natural stone, folded unbleached linen, and a pale beige backdrop":
    "Limestone pedestal",
  "Deep charcoal-black seamless studio with a low black reflective plinth":
    "Charcoal studio",
  "Pale sage-to-cream gradient studio background with subtle curved light trails":
    "Sage gradient",
  "Warm ivory microsuede surface with a subtle fine matte-stone texture":
    "Ivory microsuede",
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
  "Cozy indoor celebration setting with subtle booth-style atmosphere":
    "Indoor celebration",
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
  "Pumpkin patch": "Pumpkin patch",
  "Abandoned street at night": "Abandoned street",
  "Cozy cottage kitchen": "Cottage kitchen",
  "Candlelit gothic library": "Gothic library",
  "Plain dark background": "Plain dark",
  "An elegant apartment balcony at Diwali night with rows of glowing clay diyas along the railing, warm string lights, and subtle distant fireworks":
    "Diya balcony",
  "The front entrance of a welcoming home during Diwali, with a vivid rangoli on the floor, small glowing diyas surrounding it, and warm light spilling naturally from the doorway":
    "Rangoli entrance",
  "The entrance of an elegant home decorated for Diwali with marigold torans, a large colorful rangoli, dozens of glowing diyas, and delicate fairy lights above the doorway":
    "Marigold entrance",
  "A lamp-lit rooftop terrace at Diwali night with subtle diya illumination, warm ambient lights, and soft distant fireworks in the evening sky":
    "Rooftop terrace",
  "A dark Diwali-night setting filled with soft golden bokeh and subtle glowing fairy lights":
    "Fairy-light bokeh",
  "A Diwali courtyard at dusk lined with glowing diyas, marigold garlands, and a deepening evening sky":
    "Diwali courtyard",
  "A rooftop at Diwali evening with paper lanterns overhead, string lights, distant city lights, and faint fireworks in the background":
    "Lantern rooftop",
  "A decorated residential lane at Diwali night with glowing diyas, string lights, soft smoke, and a lively festive atmosphere":
    "Festive lane",
  "A home entrance decorated for Lakshmi Puja with marigold torans, a large rangoli, and glowing diyas placed at the family's feet":
    "Lakshmi Puja door",
  "A cozy Diwali portrait setting with marigold petals, soft cushions, and distant glowing diyas safely positioned far behind the baby":
    "Baby Diwali set",
  "The courtyard of a historic stone temple in Karachi or Sindh decorated with diyas, string lights, a rangoli at the family's feet, a box of mithai, and children's sparklers glowing safely nearby":
    "Karachi courtyard",
  "A cold-city residential street at Diwali night with terraced houses, fairy lights glowing in the windows, diyas on the front steps, warm light from an open doorway, and subtle fireworks over the rooftops":
    "Cold-city street",
  "Hand-painted sunset sky with empty space at the top": "Painted sunset",
  "Soft blue 1980s laser-style studio backdrop": "Blue laser studio",
  "Busy 1980s city market street in bright afternoon sun": "Market street",
  "1980s teenager bedroom with a cassette player, a stack of tapes, and a patterned bedspread":
    "Cassette bedroom",
  "Dark roller rink with neon lights": "Neon roller rink",
  "Purple and blue laser-beam mall photo-studio backdrop": "Mall laser studio",
  "Park at golden hour with soft trees": "Golden hour park",
  "Floral wedding-stage backdrop": "Floral wedding stage",
  "Soft evenly lit light-grey studio backdrop": "Even grey studio",
  "Soft out-of-focus neutral grey studio backdrop": "Blurred grey studio",
  "Soft beige studio backdrop": "Beige studio",
  "Plain soft grey studio backdrop": "Soft grey studio",
  "Plain light-grey studio backdrop": "Light grey studio",
  "Softly blurred bright modern office with glass walls and plants": "Glass office",
  "Softly blurred green trees in late-afternoon light": "Blurred trees",
  "Dark charcoal studio backdrop with a soft gradient": "Charcoal gradient",
  "Riverside promenade with a calm river, trees along the bank, and warm late-afternoon light":
    "Riverside promenade",
  "Cozy café table beside a large window with softly blurred interior": "Cafe window",
  "Soft cream paper border with a thin gold divider line": "Cream gold frame",
  "Wide sandy beach at sunset with gentle waves and a glowing horizon": "Sunset beach",
  "Living room decorated for Eid with warm string lights, crescent lanterns, and soft floral accents":
    "Eid living room",
  "Rooftop dinner table at dusk with warm fairy lights and a softly blurred city skyline":
    "Rooftop lights",
  "Sunny traditional courtyard with a woven charpai, potted plants, and soft morning light":
    "Sunny courtyard",
  "Wedding stage with a floral backdrop of white and blush flowers, warm fairy lights, and a cream sofa":
    "Wedding stage",
  "Sunny campus lawn with trees and softly blurred academic buildings": "Campus lawn",
  "Mountain viewpoint with pine trees, a green valley, and distant snowy peaks":
    "Mountain viewpoint",
  "Snowy northern mountain valley with tall snow-covered pine trees, distant white peaks, and a clear blue sky":
    "Snowy pine valley",
  "Snowy hill-station roadside with a small wooden tea stall, warm bulb lights, and pine trees at dusk":
    "Snowy tea stall",
  "Snowy city street at night with warm streetlights, soft bokeh, and snow-covered parked cars":
    "Night snow street",
  "Cozy wooden cabin interior beside a frosted window with snow falling outside and warm fairy lights":
    "Cabin window",
  "Snowy Kashmir-style valley garden with bare chinar-style trees, a wooden fence, and soft misty mountains":
    "Snowy valley garden",
  "Wooden hill-station balcony overlooking snowy pine-covered hills under a soft grey winter sky":
    "Snowy balcony",
  "Snowy tree-lined avenue with frosted bare branches, old lamp posts, and soft distant bokeh":
    "Snowy avenue",
  "Cozy bedroom corner at night beside a frosted window with snow outside and warm fairy lights":
    "Fairy-light bedroom",
  "Snowy hill-station viewpoint with a wooden railing, snow-covered pine slopes, and distant white peaks":
    "Snowy viewpoint",
  "Snow-covered wooden cottage porch at dusk with a warm lantern, pine trees, and soft snowfall":
    "Snowy cottage porch",
  "Quiet snowy pine forest path with fresh snow, frosted branches, and soft winter mist":
    "Snowy pine path",
  "Snowy northern mountain valley with a frozen river, small stone houses, bare poplar trees, and towering white peaks":
    "Frozen river valley",
  "Plain soft pastel backdrop with tiny sparkles and hearts around a white die-cut sticker border":
    "Pastel sticker sheet",
  "Sunlit anime college campus with brick buildings, blossom trees, a wide path, and pink petals drifting in the air":
    "Anime college campus",
  "Anime courtyard at dusk with carved arches, hanging marigold garlands, and glowing lanterns":
    "Anime courtyard dusk",
  "Dramatic anime rooftop at sunset with swirling clouds, glowing energy sparks, and a distant city skyline":
    "Energy rooftop",
  "Rainy anime city street at night with glowing signs without readable text, wet pavement reflections, and falling rain":
    "Rainy neon street",
  "Sunlit anime cricket ground with a green outfield, white boundary rope, and a softly blurred empty stand":
    "Anime cricket ground",
  "Quiet anime neighborhood street at golden hour with power lines, small houses, and a glowing sunset sky":
    "Neighborhood sunset",
  "Anime city rooftop at sunset with a low railing, warm string lights, and an orange sky over distant buildings":
    "Friends rooftop",
  "Anime park path lined with pink cherry blossom trees, falling petals, and a soft blue sky":
    "Blossom park path",
  "Pastel pink, lilac and cream balloon garland wall with fairy lights":
    "Pastel balloon wall",
  "Black and metallic gold balloon arch with gold confetti on the floor":
    "Black gold balloons",
  "Soft baby-blue and white balloon backdrop with falling paper confetti":
    "Baby blue balloons",
  "Dark moody party wall with a glowing pink neon sign and soft bokeh lights":
    "Neon party wall",
  "Night city rooftop with string lights, glowing skyline bokeh and a dark blue sky":
    "Night rooftop",
  "Colorful party room with balloon clusters, streamers and a big confetti burst in the air":
    "Party confetti room",
  "Cozy bedroom with an arched full-length mirror, ceiling full of floating pastel balloons with ribbons, and fairy lights":
    "Balloon bedroom",
  "Plain dark charcoal studio backdrop fading to black": "Dark charcoal studio",
  "Sunny green garden with flowers, a wooden picnic setup and pastel balloons tied to a tree":
    "Garden picnic party",
  "Cream textured paper with watercolor roses, peonies and green leaves around the edges":
    "Floral card paper",
  "Deep royal blue gradient poster background with floating 3D balloons, stars and confetti":
    "3D poster blue",
  "Warm cream scrapbook page with washi tape, small paper hearts and dried flowers":
    "Cream scrapbook",
  "Wet city road at night with neon and streetlight reflections on the asphalt and soft bokeh":
    "Wet neon road",
  "Sunny old-town street with cream walls, green plants and soft background blur":
    "Sunny old town",
  "City rooftop terrace at dusk with warm string lights overhead and a softly blurred skyline":
    "Dusk rooftop",
  "Dim room at night with a rain-streaked window, blurred city lights outside and a small warm table lamp":
    "Rainy window room",
  "Winding mountain highway at sunset with layered peaks and a glowing orange sky":
    "Mountain highway",
  "Dusty countryside road with dry grass, a lone tree and a pale afternoon sky":
    "Dusty country road",
  "Calm sandy beach at sunset with soft waves, a low glowing sun and golden haze":
    "Calm sunset beach",
  "Raw grey concrete city wall with hard afternoon shadows": "Concrete city wall",
  "Old-city haveli courtyard with carved wooden doors, arched sandstone walls and worn stone steps":
    "Haveli courtyard",
  "Plain dark studio backdrop with a soft gradient glow": "Dark studio glow",
  "Rainy monsoon street with wet road reflections, green trees, and small shops with plain signboards":
    "Monsoon street",
  "Open wheat field at golden hour with tall grass and a soft warm sky":
    "Golden wheat field",
  "Bright city sidewalk in soft daylight with cream shopfronts, trees and gentle background blur":
    "Daylight sidewalk",
  "City rooftop terrace at golden hour with soft skyline bokeh, warm sky and a low concrete ledge":
    "Golden rooftop",
  "Quiet apartment balcony with a soft sheer curtain, muted beige walls and gentle window light":
    "Quiet balcony",
  "Lit city street at night with shop-window glow, wet pavement reflections and soft bokeh lights":
    "Night suit street",
  "Soft out-of-focus warm cream studio backdrop": "Warm cream studio",
  "Tall textured concrete wall in soft afternoon light with subtle shadow falloff":
    "Textured concrete",
  "Modern cafe interior with an arched mirror, warm wood, plants and soft daylight through a window":
    "Cafe mirror",
  "Outdoor concrete stairs beside a colourful abstract mural wall with soft late-afternoon light":
    "Mural stairs",
  "Soft charcoal fashion studio backdrop with a gentle gradient and subtle rim light":
    "Charcoal fashion studio",
  "Bright city plaza sidewalk in soft daylight with cream shopfronts and gentle blur":
    "Daylight plaza",
  "Soft outdoor concrete wall with muted daylight and gentle shadow":
    "Muted concrete wall",
  "Modern cafe balcony with soft daylight, railing and gentle city blur": "Cafe balcony",
  "Soft out-of-focus warm cream window-lit backdrop": "Cream window light",
  "Evening balcony overlooking soft city bokeh lights with a dark blue dusk sky":
    "Evening city balcony",
  "Warm lit hotel lobby with marble floors, soft chandelier glow and deep hallway perspective":
    "Hotel lobby",
  "High balcony overlooking a modern glass skyline city at dusk with soft amber and blue city lights (no named landmarks)":
    "Glass skyline balcony",
  "Modern glass lounge with soft leather seating, warm lamps and a softly blurred city view through floor-to-ceiling windows":
    "Glass lounge",
  "Night city terrace with string lights, dark railing and glowing skyline bokeh":
    "Night city terrace",
  "Soft estate garden with stone steps, trimmed hedges and muted greenery in gentle daylight":
    "Estate garden",
  "Warm soft-brown fashion studio backdrop with gentle gradient and clean negative space":
    "Brown fashion studio",
  "Modern house terrace with light stone flooring, slim railing, soft greenery and bright daylight sky":
    "Modern house terrace",
  "Clean pale stone editorial backdrop with soft shadow falloff": "Pale stone editorial",
  "Quiet waterfront promenade at dusk with soft city lights across the water and a warm sky":
    "Waterfront dusk",
  "Evening terrace overlooking soft city bokeh with dark blue dusk sky":
    "Evening city terrace",
  "Elevated balcony overlooking a soft generic Middle-Eastern city skyline at dusk with warm lights (no landmark names)":
    "Dusk skyline balcony",
  "Quiet estate garden with stone steps, soft trees and cream daylight":
    "Quiet estate garden",
  "A carved wooden doorway framed by hanging marigold garlands, with a neat row of glowing clay diyas along the threshold at the couple's feet and soft warm light from inside":
    "Diya doorway",
  "An open city rooftop at Diwali night with a soft out-of-focus fireworks sky in gold and pink, warm string lights along the parapet and distant lit homes":
    "Fireworks rooftop",
  "A softly lit window nook at Diwali dusk with sheer curtains, a few diyas on the sill and blurred warm lights outside":
    "Window diya nook",
  "A studio backdrop of hanging marigold flower strings in orange and yellow, softly out of focus, with a warm cream wall behind":
    "Marigold studio",
  "A traditional home interior at Diwali evening with a carved wooden jhoola, tall glowing brass oil lamps behind and soft marigold accents":
    "Jhoola interior",
  "A curtain of warm fairy lights hanging behind, melting into large golden bokeh, with a dark festive night backdrop":
    "Fairy-light curtain",
  "A lit home courtyard at Diwali night with diyas along the walls, string lights overhead and a ground chakri spinning safely far in the background":
    "Courtyard sparkler",
  "Wide stone steps of an old haveli courtyard at Diwali evening, diyas on every step edge, a simple rangoli border at the base and carved arches behind":
    "Haveli steps",
  "A family dining room at Diwali night with a long table of brass thalis, mithai and diyas, warm string lights overhead and marigold garlands on the wall":
    "Dinner table",
  "Cozy living room with a tall green Christmas tree, red and gold ornaments, and a wooden floor":
    "Tree living room",
  "Bright cream studio set with a small decorated Christmas tree, stacked wrapped gift boxes with satin ribbons, and a soft white rug":
    "Gift box studio",
  "Stone fireplace with a crackling fire, a garland mantel with plain red stockings, and wrapped gifts on the floor":
    "Stocking fireplace",
  "Grand hallway with a huge Christmas tree covered in red, gold and silver glass ornaments and ribbon bows":
    "Ornament hallway",
  "Warm living room with a large decorated Christmas tree, a pile of wrapped gifts and a red-and-green plaid throw on the sofa":
    "Tree and gifts room",
  "Bright red-and-white peppermint-striped studio backdrop with giant candy canes and scattered wrapped candies":
    "Peppermint studio",
  "Cozy room with a decorated Christmas tree, wrapped gifts underneath, and warm candle lanterns on a side table":
    "Lantern tree room",
  "Festive home kitchen with a small tree on the counter, trays of gingerbread cookies, red-and-white candy canes in a jar and a window":
    "Festive kitchen",
  "Close-up of a huge pine branch with red and gold baubles and a soft blurred Christmas tree glow":
    "Ornament pine branch",
  "Retro 1970s living room with wood paneling, a tinsel Christmas tree with big colored bulbs, and gifts in patterned paper":
    "Retro 70s room",
  "Under a decorated Christmas tree with wrapped gifts, red and gold ornaments and a soft plaid blanket":
    "Under the tree",
  "Festive outdoor lane at dusk lined with giant candy canes, oversized wrapped gift-box displays and decorated pine trees":
    "Candy cane lane",
  "Sleek futuristic training arena with glowing floor lines, floating hexagon barriers and a hazy skyline beyond":
    "Training arena",
  "Rolling green meadow full of wildflowers under huge soft cumulus clouds, a lone tree and distant hills":
    "Wildflower meadow",
  "Tidy creator's desk with a computer monitor showing an untextured 3D model of the same figure, soft daylight from a window":
    "Creator's desk",
  "Rain-soaked city side street at night with pink and cyan neon glow, reflections on wet pavement and drifting steam":
    "Neon side street",
  "Seamless saturated orange studio backdrop with a hard shadow on the wall":
    "Orange studio",
  "Glossy white iceberg runway on still arctic water under a vast overcast sky, distant ice cliffs and drifting mist":
    "Iceberg runway",
  "Crowded-looking neon night market alley with glowing holographic stall canopies, steam vents and heavy rain, all signs showing abstract shapes":
    "Neon night market",
  "Dark room lit only by a curved wall of monitors showing abstract glowing code patterns, tangled cables and server lights":
    "Monitor wall room",
  "Pure black studio background filled with swirling violet smoke": "Violet smoke studio",
  "Seamless mid-grey studio backdrop with soft vignette": "Grey studio",
  "Rain-soaked neon city street at night with glowing signs showing only abstract shapes, puddles and steam":
    "Rainy neon street",
  "Ruined flooded gothic cathedral with tall stained-glass windows, broken pillars and god rays cutting through mist":
    "Flooded cathedral",
  "Giant ancient forest canopy at dusk with huge mossy roots, hanging vines and swarms of fireflies":
    "Firefly forest",
  "Cliff ledge above a misty mountain valley at sunrise with layered peaks and soft gold light":
    "Misty cliff ledge",
  "Old observatory dome with the slit open to a deep twilight sky with a meteor shower, star charts and warm brass lamps":
    "Old observatory",
  "Deck of a wooden flying galleon sailing above a sea of clouds at golden hour, billowing sails and rigging":
    "Flying galleon deck",
  "City rooftop at dusk with glowing skyscrapers, wind-blown haze and a dramatic sky":
    "Dusk city rooftop",
  "Skyscraper ledge high above a glowing city at night with searchlights and drifting clouds":
    "Night skyscraper ledge",
  "Glass-and-steel tower wall between neon skyscrapers at night, high above traffic light trails":
    "Glass tower wall",
  "Stone gargoyle ledge on a gothic tower in heavy rain above a moody city skyline with lightning":
    "Gargoyle tower ledge",
  "Ruined city skyline at dusk with smoke columns, floating debris and a glowing energy-charged sky":
    "Ruined city skyline",
  "Colorful toy-town rooftops under a bright blue sky with puffy clouds and paper-kite birds":
    "Toy-town rooftops",
  "Stormy sea cliff with towering black clouds, crashing waves and forked lightning":
    "Stormy sea cliff",
  "Poster backdrop of a city skyline with a huge fiery explosion glow and smoke behind":
    "Explosion skyline",
  "Deep space with a swirling purple and gold nebula, distant planets and star dust":
    "Purple gold nebula",
  "Shattered rocky battlefield with floating boulders, cracked ground and a stormy sky":
    "Floating boulder field",
  "City rooftop at sunset with pastel pink and lavender sky, power lines and a soft sunset glow":
    "Pastel sunset rooftop",
  "Grassy hilltop under a huge towering cloud-filled sunset sky with distant hills and wind-swept grass":
    "Sunset hilltop",
  "Moonlit bamboo grove with mist and drifting leaves": "Moonlit bamboo grove",
  "Tiled rooftops of a hillside village at sunset with swirling leaves and distant mountains":
    "Sunset village rooftops",
  "Mountain path with blazing red maple trees and swirling falling leaves":
    "Red maple path",
  "Soft pastel studio backdrop with floating hearts, stars and confetti":
    "Pastel hearts studio",
  "Dark moody room with soft shadows": "Dark moody room",
  "Hangar launch bay at dusk with a towering original giant robot behind, steam, sparks and warning lights":
    "Robot hangar bay",
  "Petal-covered path under arching cherry blossom trees with sparkles in the air":
    "Cherry blossom path",
  "Palm-lined coastal city boulevard at sunset with a sleek original sports car with no badges or plates":
    "Palm sunset boulevard",
  "Misty grey-blue waterfall gorge with damp black rocks and pale mist":
    "Waterfall gorge",
  "Character-select menu screen with a glowing circular platform, abstract icon stat bars without numbers and soft holographic panels":
    "Character-select screen",
  "Colorful stylized tropical island with bright trees, floating supply crates and a blue sky":
    "Tropical island",
  "Abstract dynamic splash-art backdrop of bright energy shapes and paint-like streaks":
    "Splash-art backdrop",
  "16-bit pixel-art fantasy overworld with a castle, forest and river, with plain icon-only health bars":
    "Pixel overworld",
  "Candy-colored floating voxel islands with rounded pastel trees, a little waterfall and a bright sky with soft round clouds":
    "Floating voxel islands",
  "Split arena versus screen with a crimson side and an electric-blue side and plain health bars at the top":
    "Versus screen",
  "Misty ruined castle courtyard with broken arches, cold fog and falling ash":
    "Ruined castle courtyard",
  "Misty mountain path among bamboo and pine with towering cloud-wrapped peaks":
    "Misty mountain path",
  "Sun-dappled ancient forest with huge trees, ferns and light shafts":
    "Sun-dappled forest",
  "Marble palace courtyard with carved arches, hanging lanterns, fountains and rose petals":
    "Marble palace courtyard",
  "Jagged mountain peaks above the clouds at sunset with smoke and ember-filled air":
    "Ember mountain peaks",
  "Foggy sword-and-sorcery set with crumbling stone pillars, smoke machines and colored gels":
    "Foggy fantasy set",
  "Candle-lit castle library with towering shelves, floating books and warm hanging lanterns":
    "Castle library",
  "Gothic tower chamber with a tall arched window, stormy night and floating candles":
    "Gothic tower chamber",
  "Rolling sand dunes at sunset with a golden palace far away and swirling sand":
    "Sunset sand dunes",
  "Sunbaked desert spaceport with rounded cargo containers and dome hangars, heat haze and dust storms":
    "Desert spaceport",
  "Alien planet surface with glowing crystals, craters and Earth rising in a starry sky":
    "Crystal alien planet",
  "Dark studio with cyan and orange rim lights and faint floating particles":
    "Rim-lit dark studio",
  "Rainy neon megacity rooftop with glowing signs showing only abstract shapes and holograms":
    "Neon megacity rooftop",
  "Vast orange dunes under a single huge pale sun with sand storms on the horizon":
    "Single-sun dunes",
  "Blockbuster poster backdrop of a city skyline at night with explosions and searchlights":
    "Blockbuster skyline",
  "Hand-painted 1970s cinema poster backdrop with dramatic sky, burst lines and grainy texture":
    "70s painted poster",
  "Dim late-90s bedroom hallway at night": "Dim 90s hallway",
  "Dark home hallway at night with a half-open doorway": "Dark home hallway",
  "1940s detective office at night with venetian blinds, rain on the window and smoke haze":
    "1940s detective office",
  "Casino-style marble balcony at night over a glittering harbor with fireworks":
    "Harbor night balcony",
  "Dusty frontier town street at sunset with wooden storefronts showing no signs and tumbleweeds":
    "Frontier town street",
  "Abandoned overgrown city street with rusted cars, vines and smoke on the horizon":
    "Overgrown city street",
  "Smoky industrial 1920s street with brick factories, cobblestones and gas lamps":
    "1920s industrial street",
  "Foggy moor with a dark gothic manor and storm clouds": "Foggy gothic moor",
  "Candle-lit Regency ballroom with chandeliers and pastel flowers": "Regency ballroom",
  "Misty pine forest at night under a huge full moon": "Full-moon pine forest",
  "Storybook castle garden with a fountain, glowing fireflies and pastel flowers":
    "Storybook castle garden",
  "Towering old library with spiral stairs, stacked books and warm lamps":
    "Old spiral library",
  "Plain table surface with soft daylight, like an online listing photo":
    "Listing photo table",
  "Tidy desk with soft daylight and blurred shelves": "Tidy desk shelves",
  "Bright building-brick baseplate diorama with tiny trees and a little house":
    "Brick baseplate diorama",
  "Cozy wooden craft table with yarn balls, crochet hooks and soft window light":
    "Crochet craft table",
  "Miniature handmade clay set of a town square": "Clay town square",
  "A grand Mughal-style palace hall with carved marble arches, warm hanging lanterns and deep red rose petals scattered on the floor":
    "Mughal palace hall",
  "A lush garden pavilion in soft daylight with white marble pillars, cascading white and pink flowers and a blurred fountain behind":
    "Garden pavilion",
  "A traditional haveli courtyard at night with carved jharokha windows, brass lamps, deep red drapes and scattered marigold and rose petals":
    "Haveli courtyard",
  "An elegant nikah setting with ivory floral arches of white roses and jasmine, soft sheer drapes and warm fairy-light bokeh":
    "Nikah floral arch",
  "A luxurious walima reception stage with crystal chandeliers, white and silver floral walls, mirrored floor and soft glowing bokeh":
    "Walima stage",
  "A colourful mehndi night setting with marigold garlands, hanging string lights, brass lanterns, colourful floor cushions and a floral swing":
    "Mehndi night set",
  "A neutral grand hall with tall arched windows, white floral arrangements, soft sheer drapes and a polished marble floor, no religious symbols":
    "Neutral grand hall",
  "A royal palace corridor with carved sandstone arches, warm lanterns and soft drapes in deep red and gold":
    "Palace corridor",
  "A dark luxurious reception hall with warm gold uplighting, deep velvet drapes, scattered candles and soft gold bokeh":
    "Reception hall",
  "A softly lit garden lawn at a wedding evening with fairy-light canopies, white floral pillars and warm bokeh":
    "Fairy-lit lawn",
  "A grand palace hall with carved marble arches, deep maroon drapes, warm hanging lanterns and rose petals on the floor":
    "Maroon palace hall",
  "A lavish wedding stage with a carved gold sofa, walls of red roses and marigolds, hanging floral strings and warm golden bokeh":
    "Floral wedding stage",
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
    "Warm golden festive",
    "Warm joyful festive",
    "Warm candid festive",
    "Soft warm festive",
    "Moody gothic",
    "Warm magical",
    "Soft warm dreamy",
    "Cozy warm winter festive",
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
    "An elegant apartment balcony at Diwali night with rows of glowing clay diyas along the railing, warm string lights, and subtle distant fireworks",
    "A Diwali courtyard at dusk lined with glowing diyas, marigold garlands, and a deepening evening sky",
    "A home entrance decorated for Lakshmi Puja with marigold torans, a large rangoli, and glowing diyas placed at the family's feet",
    "Pumpkin patch",
    "Candlelit gothic library",
    "Cozy cottage kitchen",
    "A dark Diwali-night setting filled with soft golden bokeh and subtle glowing fairy lights",
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
  const words = value.replace(/[,—]/g, " ").split(/\s+/).filter(Boolean).slice(0, 3);
  return words.join(" ") || value;
}

function labelFor(kind: "mood" | "background", value: string): string {
  const map = kind === "mood" ? moodLabels : backgroundLabels;
  return map[value] ?? shortLabelFallback(value);
}

function presetsFor(category: string, kind: "mood" | "background"): readonly string[] {
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
  const defaults = defaultsForStyleCore(style);
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
