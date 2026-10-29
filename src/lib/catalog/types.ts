export type StyleSubject = "Person" | "Group" | "Pet" | "Place" | "Product or object";

export type EditIntent =
  | "Change lighting"
  | "Change background"
  | "Artistic restyle"
  | "New outfit or theme"
  | "Full scene transformation";

export type InputRequirement = "One photo" | "Two photos" | "Photo plus style reference";

export type PublishStatus = "draft" | "in_review" | "published" | "archived";

/** Crop focus as 0–100 percent for object-position. */
export type ImageFocusPoint = {
  x: number;
  y: number;
};

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
  /** Cover-crop focus for the source image (face-aware). */
  sourceFocus?: ImageFocusPoint;
  /** Cover-crop focus for the result image (face-aware). */
  resultFocus?: ImageFocusPoint;
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
  /** Homepage editorial controls. Seed styles use these defaults when absent. */
  showOnHome?: boolean;
  pinNewRank?: number | null;
  hideFromNew?: boolean;
  exploreWeight?: number;
  excludeFromExplore?: boolean;
  allowInHero?: boolean;
  heroPriority?: number;
  trendingRank?: number | null;
  /**
   * ISO timestamp when the style was published (or created, as fallback from DB).
   * Seed rows omit this; newest sorting then falls back to reverse catalog order.
   */
  publishedAt?: string | null;
  source: string;
  result: string;
  /** Cover-crop focus for the card source image. */
  sourceFocus?: ImageFocusPoint;
  /** Cover-crop focus for the card result image. */
  resultFocus?: ImageFocusPoint;
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
