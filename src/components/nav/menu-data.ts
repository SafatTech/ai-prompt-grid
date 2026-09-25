export type NavItem = {
  label: string;
  description: string;
  href: string;
};

export type NavGroup = {
  id: string;
  label: string;
  items: NavItem[];
};

function explore(params: Record<string, string>) {
  return `/explore?${new URLSearchParams(params).toString()}`;
}

export const categoryGroups: NavGroup[] = [
  {
    id: "subject",
    label: "By subject",
    items: [
      {
        label: "Person portraits",
        description: "One clear face, restyled with a tested prompt",
        href: explore({ subject: "Person" }),
      },
      {
        label: "Couple and group photos",
        description: "Looks made for more than one person",
        href: explore({ subject: "Group" }),
      },
      {
        label: "Pet portraits",
        description: "Keep your pet recognizable in a new look",
        href: explore({ subject: "Pet" }),
      },
      {
        label: "Travel and places",
        description: "Scenes and destinations from a real photo",
        href: explore({ subject: "Place" }),
      },
      {
        label: "Products and objects",
        description: "Restyle a product or object you already have",
        href: explore({ subject: "Product or object" }),
      },
    ],
  },
  {
    id: "transformation",
    label: "By transformation",
    items: [
      {
        label: "Cinematic lighting",
        description: "Turn a clear photo into a film-like scene",
        href: explore({ category: "Cinematic", intent: "Change lighting" }),
      },
      {
        label: "Background change",
        description: "Keep the subject and replace the setting",
        href: explore({ intent: "Change background" }),
      },
      {
        label: "Artistic restyle",
        description: "Shift the photo toward a designed look",
        href: explore({ intent: "Artistic restyle" }),
      },
      {
        label: "New outfit or theme",
        description: "Change wardrobe or theme, keep identity",
        href: explore({ intent: "New outfit or theme" }),
      },
      {
        label: "Professional headshot",
        description: "Polished portraits for a profile or bio",
        href: explore({ category: "Professional portraits" }),
      },
      {
        label: "Full scene transformation",
        description: "Rebuild the scene around the same subject",
        href: explore({ intent: "Full scene transformation" }),
      },
    ],
  },
  {
    id: "visual-style",
    label: "By visual style",
    items: [
      {
        label: "Cinematic",
        description: "Film color, light, and atmosphere",
        href: explore({ category: "Cinematic" }),
      },
      {
        label: "Editorial fashion",
        description: "Styled portraits with a magazine finish",
        href: explore({ q: "editorial" }),
      },
      {
        label: "Anime and illustration",
        description: "Drawn looks that still start from your photo",
        href: explore({ category: "Anime" }),
      },
      {
        label: "Painting and sketch",
        description: "Painted and sketched treatments",
        href: explore({ category: "Painting" }),
      },
      {
        label: "Vintage film",
        description: "Faded color and analog texture",
        href: explore({ category: "Vintage" }),
      },
      {
        label: "Fantasy",
        description: "Imagined worlds around a real subject",
        href: explore({ category: "Fantasy" }),
      },
      {
        label: "3D avatars",
        description: "Stylized character versions of a photo",
        href: explore({ category: "3D avatars" }),
      },
    ],
  },
  {
    id: "mood",
    label: "By mood",
    items: [
      {
        label: "Warm neutral",
        description: "Soft cream, amber, and natural skin",
        href: explore({ q: "warm" }),
      },
      {
        label: "Soft pastel",
        description: "Light color with a gentle finish",
        href: explore({ q: "pastel" }),
      },
      {
        label: "Deep blue",
        description: "Cool shadows and blue-hour color",
        href: explore({ q: "blue" }),
      },
      {
        label: "Dark dramatic",
        description: "Low light and strong contrast",
        href: explore({ q: "noir" }),
      },
      {
        label: "Golden hour",
        description: "Late sun and warm highlights",
        href: explore({ q: "golden" }),
      },
      {
        label: "Black and white",
        description: "Monochrome portraits and scenes",
        href: explore({ q: "monochrome" }),
      },
    ],
  },
  {
    id: "everyday",
    label: "For everyday photos",
    items: [
      {
        label: "Profile photo upgrade",
        description: "A clearer portrait for a profile",
        href: explore({ category: "Professional portraits" }),
      },
      {
        label: "Birthday and celebration",
        description: "Looks for a party or a special day",
        href: explore({ q: "celebration" }),
      },
      {
        label: "Wedding guest portraits",
        description: "Formal and festive portrait styles",
        href: explore({ q: "wedding" }),
      },
      {
        label: "Travel memories",
        description: "Place and travel transformations",
        href: explore({ category: "Travel" }),
      },
      {
        label: "Social profile styles",
        description: "Portraits sized for a public profile",
        href: explore({ subject: "Person", category: "Professional portraits" }),
      },
      {
        label: "Pet memories",
        description: "Keep a pet photo and change the look",
        href: explore({ subject: "Pet" }),
      },
    ],
  },
  {
    id: "creators",
    label: "For creators",
    items: [
      {
        label: "Style submission guide",
        description: "What a tested style needs before it is listed",
        href: "/how-it-works#for-creators",
      },
      {
        label: "Prompt testing standard",
        description: "How a prompt is checked against a source photo",
        href: "/how-it-works#testing-standard",
      },
      {
        label: "Creator guidelines",
        description: "What stays true in Version 0",
        href: "/how-it-works#creator-guidelines",
      },
      {
        label: "Request a style",
        description: "Ask for a look that is not in the catalog yet",
        href: "/how-it-works#request-a-style",
      },
    ],
  },
  {
    id: "tools",
    label: "Supported tools",
    items: [
      {
        label: "ChatGPT Image",
        description: "Styles tested with ChatGPT Image",
        href: explore({ tool: "ChatGPT Image" }),
      },
      {
        label: "Gemini",
        description: "Styles tested with Gemini",
        href: explore({ tool: "Gemini" }),
      },
      {
        label: "Flux",
        description: "Styles tested with Flux",
        href: explore({ tool: "Flux" }),
      },
      {
        label: "Other AI editors",
        description: "Prompts you can try in another editor",
        href: explore({ tool: "Other AI editor" }),
      },
      {
        label: "How to use an external tool",
        description: "Copy the prompt, then transform the photo elsewhere",
        href: "/how-it-works",
      },
    ],
  },
];

export const creatorLinks: NavItem[] = [
  {
    label: "Creator guide",
    description: "How styles are added to the catalog",
    href: "/how-it-works#for-creators",
  },
  {
    label: "Style testing standard",
    description: "Source photo, result, and a checked prompt",
    href: "/how-it-works#testing-standard",
  },
  {
    label: "Submit a style idea",
    description: "Request a transformation that is not listed yet",
    href: "/how-it-works#request-a-style",
  },
  {
    label: "Contact us",
    description: "Questions about the private beta",
    href: "/privacy#contact",
  },
];

/** Mobile Categories accordion uses a shorter set than the desktop mega menu. */
export const mobileCategoryGroupIds = [
  "subject",
  "transformation",
  "visual-style",
  "mood",
] as const;

export const mobileTransformationOmit = new Set(["Full scene transformation"]);
export const mobileMoodOmit = new Set(["Dark dramatic"]);

export const featuredStyle = {
  title: "Intimate Cinematic Portrait",
  href: "/styles/intimate-cinematic-portrait",
  source: "/catalog/editorial/source-05.png",
  result: "/catalog/editorial/result-05.png",
};
