/**
 * Guide images declare their real size in the markdown title:
 * `![alt](/guides/example/photo.webp "960x1200")`.
 * A https URL works the same way when the file lives outside the repo.
 * A paragraph of two or more of those images is a before/after pair.
 * The first pair in the document loads immediately; the rest wait.
 */

export type ImageDimensions = {
  width: number;
  height: number;
};

const DIMENSION_TITLE = /^(\d+)x(\d+)$/;
const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)\s*$/;

/** Positive integer pixel size from a markdown image title, or null. */
export function parseDimensionTitle(title: unknown): ImageDimensions | null {
  if (typeof title !== "string") return null;
  const match = DIMENSION_TITLE.exec(title.trim());
  if (!match) return null;
  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1) {
    return null;
  }
  return { width, height };
}

/** Root-relative public file, not a protocol-relative or parent-path URL. */
export function isLocalGuideSrc(src: string): boolean {
  return src.startsWith("/") && !src.startsWith("//") && !src.includes("..");
}

/** Local file or absolute https URL that can sit in a sized before/after pair. */
export function isSizedGuideSrc(src: string): boolean {
  if (isLocalGuideSrc(src)) return true;
  if (src.includes("..") || src.includes(" ")) return false;
  try {
    return new URL(src).protocol === "https:";
  } catch {
    return false;
  }
}

function outsideFences(markdown: string): string {
  return markdown
    .split(/(```[\s\S]*?```)/g)
    .filter((_, index) => index % 2 === 0)
    .join("\n");
}

/**
 * Src list of the first paragraph that is only sized guide images.
 * Empty when the guide has no before/after pair.
 */
export function firstDimensionedPairSrcs(markdown: string): string[] {
  const paragraphs = outsideFences(markdown).split(/\n\s*\n/);
  for (const paragraph of paragraphs) {
    const lines = paragraph
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    if (lines.length < 2) continue;

    const srcs: string[] = [];
    let onlySizedLocalImages = true;
    for (const line of lines) {
      const match = IMAGE_LINE.exec(line);
      const src = match?.[2] ?? "";
      if (!match || !isSizedGuideSrc(src) || !parseDimensionTitle(match[3])) {
        onlySizedLocalImages = false;
        break;
      }
      srcs.push(src);
    }
    if (onlySizedLocalImages) return srcs;
  }
  return [];
}

const GUIDE_INPUT_SRC = /(?:-before(?:-[bcd])?\.|\/source-\d+[bcd]?\.)/;
const GUIDE_RESULT_SRC = /(?:-after\.|\/result-\d+[bcd]?\.)/;

/**
 * Split a sized guide group into inputs and one result.
 * Two or more inputs and exactly one result use the docked layout.
 * Anything else, including a single before/after or two separate results,
 * returns an empty classification so the old grid stays.
 */
export function classifyPairImages<T extends { src: string }>(
  images: readonly T[],
): { inputs: T[]; result: T | null } {
  const inputs: T[] = [];
  const results: T[] = [];
  for (const image of images) {
    if (GUIDE_RESULT_SRC.test(image.src)) results.push(image);
    else if (GUIDE_INPUT_SRC.test(image.src)) inputs.push(image);
    else return { inputs: [], result: null };
  }
  if (results.length !== 1 || inputs.length < 2) return { inputs: [], result: null };
  return { inputs, result: results[0] ?? null };
}

/** True when this rendered pair is the first dimensioned pair in the document. */
export function isFirstDimensionedPair(
  srcs: readonly string[],
  firstPair: readonly string[],
): boolean {
  if (firstPair.length < 2 || srcs.length !== firstPair.length) return false;
  return srcs.every((src, index) => src === firstPair[index]);
}
