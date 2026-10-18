import {
  mergeInputPhotos,
  mergeResultImage,
  usesMergeStack,
} from "@/lib/catalog/merge-inputs";
import { assemblePrompt, defaultsForStyle, previewPrompt } from "@/lib/catalog/prompts";
import type { CatalogStyle, StyleSubject } from "@/lib/catalog/types";

/** Tiny shared blur so below-fold cards avoid unique ~0.6 KB data URIs each. */
export const SHARED_STYLE_BLUR =
  "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoQAAkAAUAmJQBOgB0A86YAAAD+/+1xAA==";

export type StyleCardMergePhoto = {
  src: string;
  alt: string;
};

export type StyleCardMergeResult = {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurSrc?: string;
};

/**
 * Slim DTO for StyleCard / rails / explore grids.
 * Omits template, examplePairs, defaults, and other unused CatalogStyle fields
 * so RSC payloads stay small.
 */
export type StyleCardData = {
  id: string;
  title: string;
  category: string;
  subject: StyleSubject;
  tool: string;
  note: string;
  height: number;
  source: string;
  result: string;
  /** Blur for next/image; omitted or shared for below-fold cards. */
  resultBlur?: string;
  promptPreview: string;
  /** Pre-assembled prompt for the copy button (empty when invalid). */
  copyPrompt: string;
  promptVariantId: string;
  promptTool: string;
  mediaWidth: number;
  mediaHeight: number;
  mergePhotos: StyleCardMergePhoto[];
  mergeResult?: StyleCardMergeResult;
};

export type ToStyleCardDataOptions = {
  /** Include the unique per-style blur data URI. Prefer for above-the-fold only. */
  includeBlur?: boolean;
  /** Use a tiny shared placeholder instead of the unique blur (or empty). */
  sharedBlur?: boolean;
  /**
   * Embed the full copy-paste prompt in the RSC payload.
   * Prefer false below the fold — CopyPromptButton fetches `/api/styles/[id]/prompt`.
   */
  includeCopyPrompt?: boolean;
};

export function toStyleCardData(
  style: CatalogStyle,
  options: ToStyleCardDataOptions = {},
): StyleCardData {
  const {
    includeBlur = false,
    sharedBlur = false,
    includeCopyPrompt = false,
  } = options;
  const defaults = defaultsForStyle(style);
  const assembled = assemblePrompt(style, defaults);
  const fullPrompt = assembled.ok ? assembled.prompt : previewPrompt(style, defaults);
  // Hover preview is a short clip — do not ship the full prompt twice in HTML.
  const promptPreview =
    fullPrompt.length > 140 ? `${fullPrompt.slice(0, 137).trimEnd()}…` : fullPrompt;
  const pair =
    style.examplePairs.find((p) => p.result === style.result) ?? style.examplePairs[0];
  const mergePhotos = usesMergeStack(style) ? mergeInputPhotos(style) : [];
  const mergeResult = mergePhotos.length >= 2 ? mergeResultImage(style) : undefined;

  let resultBlur: string | undefined;
  if (includeBlur && style.resultBlur) {
    resultBlur = style.resultBlur;
  } else if (sharedBlur) {
    resultBlur = SHARED_STYLE_BLUR;
  }

  const mergeResultSlim: StyleCardMergeResult | undefined = mergeResult
    ? {
        src: mergeResult.src,
        alt: mergeResult.alt,
        width: mergeResult.width,
        height: mergeResult.height,
        // Ambient blur on merge cards is a tiny asset; only keep when unique blur allowed.
        ...(includeBlur && mergeResult.blurSrc ? { blurSrc: mergeResult.blurSrc } : {}),
      }
    : undefined;

  return {
    id: style.id,
    title: style.title,
    category: style.category,
    subject: style.subject,
    tool: style.tool,
    note: style.note,
    height: style.height,
    source: style.source,
    result: style.result,
    ...(resultBlur ? { resultBlur } : {}),
    promptPreview,
    copyPrompt: includeCopyPrompt && assembled.ok ? assembled.prompt : "",
    promptVariantId: style.promptVariant.id,
    promptTool: assembled.ok ? assembled.tool : style.promptVariant.tool,
    mediaWidth: pair?.resultWidth && pair.resultWidth > 0 ? pair.resultWidth : 800,
    mediaHeight: pair?.resultHeight && pair.resultHeight > 0 ? pair.resultHeight : 1000,
    mergePhotos,
    ...(mergeResultSlim ? { mergeResult: mergeResultSlim } : {}),
  };
}

export function toStyleCardDataList(
  styles: CatalogStyle[],
  options: ToStyleCardDataOptions & {
    blurCount?: number;
    /** Embed full copy prompts for the first N cards only. */
    copyPromptCount?: number;
  } = {},
): StyleCardData[] {
  const { blurCount = 0, copyPromptCount = 0, ...rest } = options;
  return styles.map((style, index) =>
    toStyleCardData(style, {
      ...rest,
      includeBlur: index < blurCount,
      sharedBlur: index >= blurCount ? rest.sharedBlur : false,
      includeCopyPrompt:
        index < copyPromptCount || rest.includeCopyPrompt === true,
    }),
  );
}
