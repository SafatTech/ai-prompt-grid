import type { CatalogStyle } from "./types";

const asset = (name: string) => `/catalog/place/${name}`;

function evidence(
  n: string,
  altSource: string,
  altResult: string,
): CatalogStyle["examplePairs"] {
  const source = asset(`source-${n}.png`);
  const result = asset(`result-${n}.png`);
  return [
    { source, result, altSource, altResult },
    {
      source,
      result,
      altSource: `${altSource} (detail)`,
      altResult: `${altResult} (detail)`,
    },
  ];
}

/** Place preserve: structural layout + camera perspective both ON. */
const placePreserve = {
  keepClothing: true,
  keepPose: true,
} as const;

type PlaceSeed = {
  n: string;
  id: string;
  title: string;
  note: string;
  description: string;
  intent: CatalogStyle["intent"];
  mood: string;
  background: string;
  template: string;
  changes: string[];
  height: number;
};

const places: PlaceSeed[] = [
  {
    n: "01",
    id: "cozy-dream-room",
    title: "Cozy Dream Room",
    note: "Furnished dream-room makeover for plain spaces",
    description:
      "Transform a plain or unfurnished room into a realistically furnished, comfortable living space while keeping the original architecture recognizable.",
    intent: "Full scene transformation",
    mood: "Warm neutral",
    background:
      "Cozy contemporary bedroom interior with warm wood accents, layered neutral textiles, soft curtains and subtle greenery",
    changes: ["Furniture", "Textiles", "Lighting", "Decor"],
    height: 340,
    template: `Transform the uploaded {{subject}} into a beautifully furnished, inviting dream-room makeover while respecting {{preserve}}.
Retain the recognizable architecture of the original space, including its room proportions, major walls, windows, doors, ceiling geometry, and permanent structural elements whenever they are included in {{preserve}}. Furnish the room naturally according to its apparent function and available floor space rather than changing it into a completely different property.
Create a cohesive interior using comfortable contemporary furniture, layered textiles, a large area rug, warm wood accents, tasteful wall art, curtains or soft window treatments, practical side tables, ambient lamps, subtle indoor greenery, and a small number of carefully chosen decorative objects. Arrange everything with realistic spacing, circulation paths, believable furniture scale, and professional interior-design balance.
Use {{mood}} to control the overall color palette, material warmth, lighting character, and emotional atmosphere of the redesigned room. Keep materials photorealistic, with convincing fabric texture, wood grain, ceramic surfaces, soft shadows, natural reflections, and realistic contact between furniture and the floor.
Interpret {{background}} as the desired surrounding interior environment and decorative context. Integrate it naturally into the existing room rather than replacing the room's actual architecture.
Maintain believable natural daylight from the existing windows and supplement it with subtle warm interior lighting where appropriate. The final result should resemble a professionally photographed real home makeover rather than a CGI showroom.
Compose the finished transformation for {{ratio}}, preserving the useful view of the room and avoiding unnecessary cropping of important architectural or furnishing elements.
Do not introduce people, text, logos, watermarks, distorted furniture, impossible room geometry, floating objects, duplicated décor, blocked doors, obstructed windows, or unrealistic scale.`,
  },
  {
    n: "02",
    id: "modern-virtual-staging",
    title: "Modern Virtual Staging",
    note: "Move-in-ready real-estate staging look",
    description:
      "Convert an empty or nearly empty room into a realistic, professionally staged interior while keeping the property recognizable.",
    intent: "Full scene transformation",
    mood: "Warm neutral",
    background:
      "Modern staged living room with cream upholstery, warm natural wood, textured neutral rug, soft curtains, indoor greenery and refined minimal decor",
    changes: ["Furniture staging", "Lighting", "Decor", "Color mood"],
    height: 340,
    template: `Transform the uploaded {{subject}} into a professionally staged, move-in-ready interior while preserving {{preserve}}.
Keep the original architecture clearly recognizable. Preserve the existing wall positions, room proportions, window and door locations, ceiling geometry, flooring direction, balcony access, and other permanent structural elements whenever they are included in {{preserve}}.
Furnish the space according to its apparent function and available dimensions. Add appropriately scaled contemporary furniture, comfortable seating, a coffee table or side tables where suitable, a coordinated area rug, soft window treatments, tasteful wall art, practical lighting, subtle indoor greenery, and a restrained number of decorative accessories.
Use {{mood}} to control the overall palette, lighting atmosphere, contrast, material warmth, and emotional feel of the staged room.
Interpret {{background}} as the desired interior-design context and furnishing environment. Integrate it naturally into the existing room without replacing or distorting the original architecture, window positions, exterior views, or structural boundaries.
Maintain realistic furniture scale, believable walking paths, clear access to doors and windows, accurate contact shadows, consistent perspective, natural fabric texture, wood grain, reflections, and convincing daylight behavior.
The result should look like a high-quality real-estate listing photograph rather than a synthetic showroom or completely rebuilt room.
Compose the transformation for {{ratio}}, keeping important architectural features and major furniture comfortably inside the frame.
Do not add people, text, logos, watermarks, impossible geometry, oversized furniture, floating objects, duplicated decor, blocked doors, obstructed balcony access, distorted windows, or unrealistic room dimensions.`,
  },
  {
    n: "03",
    id: "refined-luxury-living",
    title: "Refined Luxury Living",
    note: "Sophisticated premium residential interior",
    description:
      "Upgrade a room into a sophisticated luxury living space with refined furniture, layered lighting, and polished materials.",
    intent: "Full scene transformation",
    mood: "Warm elegant neutral",
    background:
      "Upscale contemporary living room with cream upholstery, warm walnut wood, soft layered textiles, refined artwork, indoor greenery and subtle premium lighting",
    changes: ["Furniture", "Materials", "Lighting", "Decor"],
    height: 350,
    template: `Transform the uploaded {{subject}} into a sophisticated luxury living space while preserving {{preserve}}.
Keep the original room clearly recognizable. Preserve its architectural shell, proportions, wall positions, ceiling height, windows, doors, flooring boundaries, and other permanent structural features whenever they are included in {{preserve}}.
Upgrade the space using elegant, premium interior design. Add refined furniture with clean proportions, high-quality upholstery, warm natural wood, subtle stone or marble accents, sculptural lighting, layered textiles, coordinated rugs, curated wall art, tasteful decorative objects, and restrained indoor greenery. The result should feel expensive and polished without becoming overly ornate.
Use {{mood}} to control the overall palette, lighting warmth, contrast, material richness, and emotional tone of the transformation.
Interpret {{background}} as the intended luxury interior environment and decorative context. Blend it naturally into the existing room instead of replacing or distorting the original architecture.
Maintain realistic circulation paths, proper furniture scale, believable perspective, natural material textures, soft contact shadows, realistic reflections, and consistent daylight direction. Use layered ambient lighting to create depth and a premium residential atmosphere.
The final image should resemble a professionally photographed high-end residence or luxury interior editorial, with a cohesive and realistic finish.
Compose the transformation for {{ratio}}, keeping major furniture, windows, architectural details, and important visual elements comfortably inside the frame.
Do not add people, text, logos, watermarks, impossible geometry, floating furniture, duplicated objects, distorted windows, blocked doors, oversized decor, or excessive gold ornamentation.`,
  },
  {
    n: "04",
    id: "garden-lawn-makeover",
    title: "Garden & Lawn Makeover",
    note: "Natural residential garden landscaping",
    description:
      "Improve an outdoor space into a naturally landscaped, well-maintained garden with healthy lawn and layered planting.",
    intent: "Full scene transformation",
    mood: "Fresh natural green",
    background:
      "Natural residential garden with healthy lawn, layered shrubs, flowering borders, ornamental grasses, small trees and a subtle stepping-stone pathway",
    changes: ["Lawn", "Planting", "Pathway", "Color mood"],
    height: 345,
    template: `Transform the uploaded {{subject}} into a naturally landscaped, well-maintained garden while preserving {{preserve}}.
Keep the original outdoor space clearly recognizable. Preserve the existing yard boundaries, house walls, fences, major trees, established structural elements, and overall spatial proportions whenever they are included in {{preserve}}. Improve the landscape rather than replacing the property with a completely different garden.
Create a healthy, realistic lawn with natural variation in grass texture instead of an artificial carpet-like appearance. Organize the garden into believable planting zones using layered shrubs, ornamental grasses, flowering plants, small trees, ground cover, and other vegetation appropriate for a residential garden. Use varied plant heights, organic spacing, and restrained repetition so the planting feels established and naturally grown.
Introduce a simple practical pathway using stepping stones, gravel, natural stone, or another subtle landscape material where appropriate. Keep paths proportional to the available space and integrated naturally around the lawn and planting beds.
Use {{mood}} to control the overall color character, sunlight warmth, vegetation tones, seasonal feeling, and atmosphere of the redesigned garden.
Interpret {{background}} as the desired landscaping environment and planting context. Blend it naturally with the existing property, fences, neighboring structures, trees, and visible surroundings rather than replacing the location.
Maintain realistic sunlight direction, tree shadows, soil texture, mulch, foliage density, plant scale, and natural imperfections. Avoid making every plant perfectly symmetrical or excessively saturated. The result should look like a professionally landscaped real garden, not a fantasy garden, artificial render, or botanical showroom.
Compose the transformation for {{ratio}}, retaining a clear view of the lawn, planting zones, pathway, existing architecture, and important surrounding elements.
Do not add people, text, logos, watermarks, impossible vegetation, oversized flowers, tropical species that conflict with the environment, excessive landscaping ornaments, artificial-looking grass, perfectly cloned plants, floating objects, or major architectural changes.`,
  },
  {
    n: "05",
    id: "outdoor-living-oasis",
    title: "Outdoor Living Oasis",
    note: "Polished patio or rooftop outdoor living",
    description:
      "Design a comfortable outdoor living oasis with lounge seating, shade, ambient lighting, and layered greenery.",
    intent: "Full scene transformation",
    mood: "Warm golden evening",
    background:
      "Cozy rooftop outdoor living area with natural wood seating, cream cushions, dining furniture, slatted pergola, warm ambient lighting, climbing greenery and potted plants",
    changes: ["Outdoor furniture", "Shade structure", "Lighting", "Greenery"],
    height: 350,
    template: `Transform the uploaded {{subject}} into a comfortable, polished outdoor living oasis while preserving {{preserve}}.
Keep the original terrace, patio, rooftop, backyard, or balcony clearly recognizable. Preserve the main architectural boundaries, floor area, walls, railings, doors, windows, permanent structures, and overall spatial proportions whenever they are included in {{preserve}}.
Design the space as a true extension of indoor living. Add a comfortable outdoor lounge area with weather-resistant seating, soft neutral cushions, a coffee table, practical side tables, and a textured outdoor rug. Include a dining area where space allows, using appropriately scaled outdoor chairs and a dining table without overcrowding the layout.
Introduce a pergola, slatted shade structure, canopy, or other believable overhead shade element where appropriate. Integrate warm ambient lighting such as recessed pergola lights, wall sconces, pendant lighting, subtle string lights, or low landscape lighting to create an inviting evening atmosphere.
Use {{mood}} to control the overall color palette, sunlight warmth, lighting character, contrast, materials, and emotional tone of the outdoor transformation.
Interpret {{background}} as the intended outdoor-living environment and decorative context. Blend it naturally into the existing property and surrounding view rather than replacing the original architecture or location.
Add layered greenery using realistic potted plants, small trees, climbing vines, shrubs, and restrained flowering plants. Keep vegetation scale believable and allow enough open space for movement, seating, and dining.
Use realistic outdoor materials such as natural wood, rattan, stone, ceramic planters, woven textiles, powder-coated metal, and weather-resistant fabrics. Maintain convincing shadows, daylight direction, reflections, material texture, and contact with the ground.
The final result should look like a professionally designed and photographed real outdoor living space: comfortable, elegant, functional, relaxing, and achievable rather than like a luxury resort set or fantasy rendering.
Compose the finished transformation for {{ratio}}, retaining the major architectural features, important view lines, seating zone, dining area, shade structure, and greenery within the frame.
Do not add people, text, logos, watermarks, impossible structures, unsupported pergolas, floating furniture, blocked doors, overcrowded planting, excessive decorative lights, distorted architecture, or furniture that is too large for the space.`,
  },
  {
    n: "06",
    id: "modern-curb-refresh",
    title: "Modern Curb Refresh",
    note: "Polished curb-appeal exterior makeover",
    description:
      "Refresh a home’s curb appeal with refined exterior finishes, healthier front landscaping, and warm entry lighting.",
    intent: "Full scene transformation",
    mood: "Warm golden evening",
    background:
      "Refined suburban front yard with manicured lawn, layered shrubs, flowering borders, stone walkway, warm entry lighting and subtle landscape uplighting",
    changes: ["Facade finishes", "Landscaping", "Lighting", "Walkway"],
    height: 345,
    template: `Transform the uploaded {{subject}} into a polished curb-appeal makeover while preserving {{preserve}}.
Keep the original home clearly recognizable. Preserve the main building footprint, roofline, window positions, door placement, garage position, chimney, driveway alignment, and overall façade proportions whenever they are included in {{preserve}}.
Upgrade the exterior using refined residential materials and finishes. Refresh or repaint the façade with a cohesive modern palette, improve siding or cladding where suitable, introduce tasteful stone or brick accents, refine trims, upgrade the front door, and enhance visible exterior details without making the house look like a different property.
Use {{mood}} to control the overall exterior palette, sunlight character, material warmth, contrast, and visual atmosphere.
Interpret {{background}} as the desired curb-appeal environment surrounding the home. Blend it naturally into the existing property instead of replacing neighboring context or changing the architecture beyond recognition.
Improve the front landscaping with a healthier lawn, layered shrubs, ornamental grasses, restrained flowering plants, small feature trees, clean planting beds, and realistic spacing. Add or refine a practical walkway leading to the entrance using stone, pavers, or another suitable residential material.
Introduce tasteful exterior lighting such as wall lanterns, entry sconces, pathway lights, and subtle landscape uplighting. Keep the lighting realistic and coordinated with the time-of-day mood.
Maintain believable architectural scale, material texture, window reflections, shadows, landscaping density, and ground contact. The result should feel like an achievable professional exterior renovation rather than a rebuilt luxury mansion.
Compose the finished makeover for {{ratio}}, keeping the full façade, entryway, major windows, front landscaping, walkway, and important architectural features comfortably visible.
Do not add people, text, logos, watermarks, impossible architectural extensions, extra floors, relocated windows, distorted rooflines, excessive ornamentation, oversized plants, floating lights, duplicated doors, or unrealistic materials.`,
  },
  {
    n: "07",
    id: "kitchen-remodel-vision",
    title: "Kitchen Remodel Vision",
    note: "Realistic contemporary kitchen renovation",
    description:
      "Modernize a kitchen with cohesive cabinetry, countertops, lighting, and finishes while keeping the original layout recognizable.",
    intent: "Full scene transformation",
    mood: "Warm natural neutral",
    background:
      "Warm contemporary kitchen with cream upper cabinets, muted sage lower cabinets, light stone countertops, white tile backsplash, brass hardware, stainless appliances and subtle greenery",
    changes: ["Cabinetry", "Surfaces", "Lighting", "Fixtures"],
    height: 340,
    template: `Transform the uploaded {{subject}} into a polished, realistic kitchen renovation while preserving {{preserve}}.
Keep the original kitchen clearly recognizable. Preserve the room proportions, wall positions, window and door locations, major appliance placement, sink position, cabinet footprint, and overall camera view whenever they are included in {{preserve}}.
Modernize the kitchen using a cohesive residential design. Upgrade the cabinetry with clean contemporary fronts, refined hardware, coordinated upper and lower cabinet finishes, improved countertops, a modern backsplash, updated sink and faucet details, and refreshed visible surfaces. Keep all cabinetry and appliances appropriately scaled to the original room.
Use {{mood}} to control the overall palette, material warmth, contrast, daylight character, and emotional tone of the renovation.
Interpret {{background}} as the desired kitchen design environment and material context. Integrate it naturally with the existing architecture rather than replacing the original layout with a different kitchen.
Introduce layered lighting where appropriate, including natural window light, recessed ceiling lighting, pendant lighting, and subtle under-cabinet illumination. Keep lighting realistic and consistent with the physical placement of fixtures.
Use convincing real-world materials such as painted wood cabinetry, natural or engineered stone countertops, ceramic or stone backsplash tile, brushed metal fixtures, stainless appliances, and subtle wood accessories. Add only restrained styling such as small plants, cutting boards, utensils, bowls, or countertop accessories so the kitchen remains functional and uncluttered.
Maintain realistic clearances around appliances, drawers, cabinets, sink areas, and walkways. Preserve believable perspective, shadows, reflections, material textures, and installation details.
The finished image should resemble a professionally photographed real kitchen renovation: fresh, functional, premium, achievable, and visually cohesive rather than a completely reconstructed luxury showroom.
Compose the transformation for {{ratio}}, keeping the main cabinetry, appliances, window, work surfaces, and floor area comfortably inside the frame.
Do not add people, text, logos, watermarks, impossible cabinet geometry, blocked appliances, floating countertops, duplicated fixtures, distorted windows, unusable workspaces, excessive decor, or unrealistic material finishes.`,
  },
  {
    n: "08",
    id: "bathroom-spa-upgrade",
    title: "Bathroom Spa Upgrade",
    note: "Calm spa-inspired bathroom renovation",
    description:
      "Upgrade a bathroom into a calm contemporary spa-inspired space with refined tile, vanity, and soft integrated lighting.",
    intent: "Full scene transformation",
    mood: "Warm spa neutral",
    background:
      "Contemporary spa bathroom with warm wood vanity, pale stone surfaces, large-format neutral tile, frameless glass shower, brushed brass fixtures, soft integrated lighting and subtle greenery",
    changes: ["Surfaces", "Fixtures", "Lighting", "Vanity"],
    height: 340,
    template: `Transform the uploaded {{subject}} into a calm, contemporary spa-inspired bathroom while preserving {{preserve}}.
Keep the original bathroom clearly recognizable. Preserve the room proportions, wall positions, window placement, door location, toilet position, shower footprint, vanity zone, and overall camera perspective whenever they are included in {{preserve}}.
Upgrade the space with a refined spa-style design using modern tile, a clean vanity, elegant mirrors, improved shower fixtures, warm integrated lighting, and coordinated finishes. Use realistic proportions and practical plumbing placement rather than redesigning the room into a completely different bathroom.
Use {{mood}} to control the overall color palette, material warmth, lighting softness, contrast, and emotional atmosphere of the bathroom transformation.
Interpret {{background}} as the desired spa-inspired bathroom environment and decorative context. Blend it naturally into the existing architecture instead of replacing structural elements or changing the property's identity.
Use believable materials such as large-format stone or marble-look tile, warm wood cabinetry, pale stone countertops, brushed brass or muted metal fixtures, frameless glass, soft woven textiles, ceramic accessories, and restrained indoor greenery. Add subtle open shelving or a recessed shower niche where appropriate without overcrowding the room.
Introduce layered lighting through ceiling lights, mirror backlighting, shelf lighting, niche lighting, and soft ambient illumination. Keep the light physically plausible and consistent with the room.
Maintain realistic wet-area construction, shower drainage, clearances, plumbing locations, mirror reflections, material textures, grout lines, shadows, and reflections. The final image should feel like an achievable residential renovation, not a luxury hotel fantasy or oversized spa suite.
Compose the transformation for {{ratio}}, keeping the vanity, mirror, toilet, shower, window, floor area, and important architectural details comfortably visible.
Do not add people, text, logos, watermarks, impossible plumbing, floating fixtures, duplicated taps, distorted mirrors, blocked doors, unusable showers, oversized bathtubs, excessive decor, or unrealistic room dimensions.`,
  },
  {
    n: "09",
    id: "street-beautification",
    title: "Street Beautification",
    note: "Walkable neighborhood streetscape upgrade",
    description:
      "Improve a street into a cleaner, more walkable neighborhood with better sidewalks, trees, planters, and organized edges.",
    intent: "Full scene transformation",
    mood: "Fresh clean daylight",
    background:
      "Clean walkable residential street with improved sidewalks, street trees, planters, benches, tidy façades, organized edges and subtle modern street lighting",
    changes: ["Sidewalks", "Planting", "Lighting", "Public space"],
    height: 345,
    template: `Transform the uploaded {{subject}} into a cleaner, more walkable, visually organized street environment while preserving {{preserve}}.
Keep the original street clearly recognizable. Preserve the road alignment, building positions, boundary walls, gate placement, utility poles, overall street width, major trees, and the original camera viewpoint whenever they are included in {{preserve}}.
Improve the street as a realistic neighborhood beautification project rather than replacing it with a completely different location. Add cleaner and more defined sidewalks, coordinated curb edges, improved planting beds, street trees, planters, small seating elements, better lighting, tidier façades, and more organized public space while keeping the street practical and believable.
Use {{mood}} to control the overall color character, light quality, greenery tones, cleanliness, and atmosphere of the upgraded streetscape.
Interpret {{background}} as the desired streetscape-improvement environment and urban design context. Blend it naturally into the existing lane, houses, walls, utility infrastructure, and neighborhood setting rather than erasing the real location.
Add landscaping in a realistic residential-street manner using trees, shrubs, flowering plants, climbers, and planter boxes with varied heights and natural spacing. Introduce walkability improvements such as continuous sidewalk treatment, more orderly edge conditions, modest benches, and coordinated street lighting where suitable.
Keep all interventions realistic in scale and construction. Maintain believable paving materials, curb lines, shadows, façade proportions, electrical poles, overhead wires, plant scale, and circulation space for pedestrians and vehicles. The final result should feel like a practical urban-design improvement proposal, not a fantasy boulevard or car-free plaza unless the original scene supports it.
Compose the finished transformation for {{ratio}}, keeping the full street view, sidewalks, planting, façades, and key public-space improvements clearly visible.
Do not add people, text, logos, watermarks, impossible architecture, oversized trees, unrealistic road widening, floating benches, excessive decorative elements, blocked driveways, distorted utility poles, or unrealistically perfect symmetry.`,
  },
  {
    n: "10",
    id: "historic-revival",
    title: "Historic Revival",
    note: "Careful heritage façade restoration",
    description:
      "Restore a historic property with repaired materials and preserved ornament while keeping the building’s architectural identity.",
    intent: "Artistic restyle",
    mood: "Warm heritage neutral",
    background:
      "Carefully restored historic façade with warm aged plaster, repaired stone details, restored timber shutters and doors, preserved iron balcony railings and subtle authentic patina",
    changes: ["Surface repair", "Materials", "Ornament", "Color mood"],
    height: 350,
    template: `Transform the uploaded {{subject}} into a carefully restored historic property while preserving {{preserve}}.
Keep the building's original architectural identity clearly recognizable. Preserve the existing façade proportions, floor count, roofline, window and door positions, arches, columns, cornices, balconies, railings, decorative moldings, masonry patterns, and other historically significant features whenever they are included in {{preserve}}.
Restore rather than redesign the structure. Repair cracked plaster, damaged masonry, exposed brick, stained surfaces, deteriorated stonework, corroded metalwork, weathered timber, missing trim, and other visible age-related damage while retaining the building's authentic character and craftsmanship.
Use {{mood}} to control the overall color character, material warmth, daylight quality, contrast, and emotional atmosphere of the restoration.
Interpret {{background}} as the desired heritage-restoration environment and finish context. Apply it naturally to the existing structure without replacing the historic architecture with modern construction or inventing a different building.
Restore decorative elements with restraint and historical plausibility. Clean and repair carved surrounds, cornices, pilasters, capitals, arches, shutters, doors, balcony railings, stone bases, and ornamental details while retaining subtle signs of age where appropriate. Avoid making every surface look newly manufactured.
Use historically sympathetic materials and finishes such as lime or mineral plaster, aged stone, restored brick, painted or stained timber, patinated metalwork, traditional masonry, and period-appropriate colors. Where original materials remain visible, preserve their natural texture and variation.
Maintain realistic weathering, surface depth, mortar joints, stone grain, timber texture, ironwork, reflections, shadows, and architectural scale. The finished result should resemble a professional conservation restoration of the same building rather than a modern replica.
Compose the restored property for {{ratio}}, keeping the major façade, entrance, windows, balcony, architectural ornament, and surrounding context clearly visible.
Do not add extra floors, relocate windows or doors, alter the building's historical style, replace ornate details with modern minimalist elements, introduce modern glass façades, add people, text, logos, watermarks, impossible symmetry, excessive decoration, or erase all evidence of the building's age.`,
  },
];

/**
 * Place templates 1–10 from place_images/place-templates.md
 * Preserve toggles: keepClothing → Structural layout;
 * keepPose → Camera perspective.
 */
export const seedPlaceStyles: CatalogStyle[] = places.map((item, index) => ({
  id: item.id,
  title: item.title,
  category: "Travel",
  subject: "Place",
  intent: item.intent,
  requirement: "One photo",
  tool: "ChatGPT Image",
  note: item.note,
  height: item.height,
  saved: 70 - index,
  source: asset(`source-${item.n}.png`),
  result: asset(`result-${item.n}.png`),
  status: "published",
  targetSourcePhoto: "Clear place photo with architecture or outdoor layout visible",
  description: item.description,
  bestSourcePhoto: [
    "Clear architectural or outdoor structure",
    "Balanced exposure",
    "Important landmarks or room features visible",
    "Original image should not be blurry",
  ],
  changes: item.changes,
  stays: [
    "Structural layout",
    "Camera perspective",
    "Room or property identity",
    "Window and door positions",
    "Overall proportions",
  ],
  examplePairs: evidence(
    item.n,
    `Source place for ${item.title}`,
    `${item.title} result`,
  ),
  promptVariant: {
    id: `${item.id}-v1`,
    version: "1.0.0",
    tool: "ChatGPT Image",
    mode: "Image edit / transform with uploaded photo",
    inputImageCount: 1,
    inputImageRoles: ["source photo"],
    template: item.template,
    defaults: {
      mood: item.mood,
      background: item.background,
      ratio: "4:5 Portrait",
      ...placePreserve,
    },
    lastVerified: "2026-09-27",
    limitations: [
      "Tiny distant architectural detail may soften",
      "Complex multi-room scenes can invent extra furniture",
    ],
  },
}));
