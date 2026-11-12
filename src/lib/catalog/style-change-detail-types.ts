import type { StyleChangeCategoryId } from "./style-change-categories";

/** Authored detail for one "What changes" label on a style page. */
export type StyleChangeDetail = {
  label: string;
  category: StyleChangeCategoryId;
  /** Card micro-copy — must be ≤95 characters and unique across the catalog. */
  shortDescription: string;
  /** Two-sentence modal summary, specific to this style's prompt. */
  summary: string;
  beforeLabel: string;
  afterLabel: string;
  /** Short phrase taken from the style's actual prompt / defaults. */
  trigger: string;
  /** Mono chip text on the modal visual banner. */
  chip: string;
};

export type StyleChangeDetailsMap = Readonly<
  Record<string, readonly StyleChangeDetail[]>
>;
