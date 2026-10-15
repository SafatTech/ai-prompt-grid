export type StyleSubject =
  | "Person"
  | "Group"
  | "Pet"
  | "Place"
  | "Product or object";

export type EditIntent =
  | "Change lighting"
  | "Change background"
  | "Artistic restyle"
  | "New outfit or theme"
  | "Full scene transformation";

export type InputRequirement = "One photo" | "Two photos" | "Photo plus style reference";

export type PublishStatus = "draft" | "in_review" | "published" | "archived";

export type ExamplePair = {
  source: string;
  result: string;
  altSource: string;
  altResult: string;
  /** Pixel size of the result file, when known. Optional so older rows still map. */
  resultWidth?: number;
  resultHeight?: number;
  /** Tiny WebP data URI for the merge hero ambient blur. Null/absent = surface fallback. */
  resultBlur?: string;
};

export type PromptVariant = {
  id: string;
  version: string;
  tool: string;
  mode: string;
  inputImageCount: number;
  inputImageRoles: string[];
  template: string;
  defaults: {
    mood: string;
    background: string;
    ratio: string;
    keepClothing: boolean;
    keepPose: boolean;
  };
  lastVerified: string;
  limitations: string[];
};

export type CatalogStyle = {
  id: string;
  title: string;
  category: string;
  subject: StyleSubject;
  intent: EditIntent;
  requirement: InputRequirement;
  tool: string;
  note: string;
  height: number;
  saved: number;
  source: string;
  result: string;
  description: string;
  status: PublishStatus;
  bestSourcePhoto: string[];
  changes: string[];
  stays: string[];
  targetSourcePhoto: string;
  examplePairs: ExamplePair[];
  /**
   * Ambient hero blur for the card/result image. Prefer examplePairs[].resultBlur;
   * this is a fallback when only a card/hero asset carries the data URI.
   */
  resultBlur?: string;
  promptVariant: PromptVariant;
};
