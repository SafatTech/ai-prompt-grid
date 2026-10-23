/**
 * Filter chip labels and option lists — safe for client bundles.
 * Keep this module free of seed catalog data and zod.
 */

export const categories = [
  "Cinematic",
  "Anime",
  "Painting",
  "Vintage",
  "Professional portraits",
  "Fantasy",
  "Pets",
  "Travel",
  "3D avatars",
  "Product and objects",
] as const;

export const filterGroups = {
  category: [...categories],
  subject: ["Person", "Group", "Pet", "Place", "Product or object"] as const,
  intent: [
    "Change lighting",
    "Change background",
    "Artistic restyle",
    "New outfit or theme",
    "Full scene transformation",
  ] as const,
  requirement: ["One photo", "Two photos", "Photo plus style reference"] as const,
  tool: ["ChatGPT Image", "Gemini", "Flux", "Other AI editor"] as const,
};

export const groupLabels: Record<keyof typeof filterGroups, string> = {
  category: "Category",
  subject: "Photo subject",
  intent: "Edit intent",
  requirement: "Input requirement",
  tool: "Tested with",
};
