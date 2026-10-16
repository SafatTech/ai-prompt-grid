import { cn } from "@/lib/utils";

export type MergeImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Tiny data-URI (or URL) for the ambient hero blur. Optional. */
  blurSrc?: string;
};

type Props = {
  inputs: MergeImage[];
  result: MergeImage;
  variant: "hero" | "guide" | "card";
  title: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

const DEFAULT_WIDTH = 1122;
const DEFAULT_HEIGHT = 1402;
const PORTRAIT_RATIO = 4 / 5;

/** Result box follows the file. A square keepsake is not cropped to 4:5. */
export function resultPresentation(
  width?: number,
  height?: number,
): { aspectRatio: string; contain: boolean } {
  const frameWidth = width && width > 0 ? width : DEFAULT_WIDTH;
  const frameHeight = height && height > 0 ? height : DEFAULT_HEIGHT;
  const contain = Math.abs(frameWidth / frameHeight - PORTRAIT_RATIO) >= 0.02;
  return { aspectRatio: `${frameWidth} / ${frameHeight}`, contain };
}

function FrameImage({
  image,
  sizes,
  priority = false,
  highPriority = false,
  className,
  objectPosition,
}: {
  image: MergeImage;
  sizes: string;
  priority?: boolean;
  highPriority?: boolean;
  className?: string;
  objectPosition?: string;
}) {
  const width = image.width ?? DEFAULT_WIDTH;
  const height = image.height ?? DEFAULT_HEIGHT;
  const shared = cn("absolute inset-0 h-full w-full object-cover", className);
  // Public guide files and remote catalog WebPs both use a plain img so
  // inputs keep rendering when /_next/image is unavailable.
  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote catalog / guide assets
    <img
      src={image.src}
      alt={image.alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={highPriority ? "high" : "auto"}
      decoding="async"
      className={shared}
      style={objectPosition ? { objectPosition } : undefined}
    />
  );
}

function Arrow() {
  return (
    <svg
      className="mba-arrow"
      viewBox="0 0 64 40"
      width="64"
      height="40"
      aria-hidden="true"
    >
      <path
        d="M4 26 C18 8,36 6,54 18"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M46 10 L56 19 L44 23"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function inputAlt(image: MergeImage, title: string, index: number, total: number): string {
  return image.alt.trim() || `${title}: input photo ${index + 1} of ${total}`;
}

function resultAlt(image: MergeImage, title: string): string {
  return image.alt.trim() || `${title}: merged result`;
}

function summary(title: string, count: number): string {
  if (count <= 1) return `${title}: one input photo and the result`;
  return `${title}: ${count} input photos combined into one result`;
}

function AmbientBlur({ src }: { src: string }) {
  return (
    <div className="mba-ambient" aria-hidden="true">
      {/* Tiny 32×40 asset — next/image would add an unnecessary request. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" width={32} height={40} decoding="async" />
    </div>
  );
}

/**
 * Multi-photo before/after.
 * Hero = print stack + ambient blur. Guide = docked. Card = split thumbnail.
 * No client JavaScript: hover is CSS, and single-photo callers stay on CompareSlider.
 */
export function MergeBeforeAfter({
  inputs,
  result,
  variant,
  title,
  priority = false,
  sizes,
  className,
}: Props) {
  if (inputs.length === 0 || !result.src) return null;

  const shown = inputs.slice(0, 4);
  const hidden = inputs.length - shown.length;
  const label = summary(title, shown.length);
  const resultSizes =
    sizes ??
    (variant === "card" ? "(max-width: 768px) 100vw, 360px" : "(max-width: 768px) 100vw, 560px");
  const inputSizes =
    variant === "card"
      ? "(max-width:767px) 18vw, 110px"
      : variant === "guide"
        ? "150px"
        : "(max-width: 768px) 50vw, 320px";
  const resultFrame = resultPresentation(result.width, result.height);
  const ambientSrc = result.blurSrc ?? null;

  if (variant === "card") {
    const tiles = inputs.slice(0, 2);
    const extra = Math.max(0, inputs.length - 2);
    const groupLabel = `${title}: Photo 1 and Photo 2 merged into the result`;
    return (
      <figure
        role="group"
        aria-label={groupLabel}
        data-testid="merge-before-after"
        data-variant="card"
        className={cn("absolute inset-0 m-0", className)}
      >
        <figcaption className="sr-only">{groupLabel}</figcaption>
        <div className="mba-split">
          <div className="mba-split__inputs">
            {tiles.map((input, index) => (
              <div key={`${input.src}-${index}`} className="relative overflow-hidden">
                <FrameImage
                  image={{ ...input, alt: inputAlt(input, title, index, inputs.length) }}
                  sizes={inputSizes}
                  priority={priority}
                  objectPosition="50% 30%"
                />
                <span className="mba-split__tag" aria-hidden="true">
                  {index + 1}
                </span>
                {index === 1 && extra > 0 ? (
                  <span className="mba-split__plus" aria-hidden="true">
                    +{extra}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
          <div className={cn("relative overflow-hidden", resultFrame.contain && "bg-[#f5f3ee]")}>
            <FrameImage
              image={{ ...result, alt: resultAlt(result, title) }}
              sizes="(max-width:767px) 40vw, 240px"
              priority={priority}
              highPriority={priority}
              className={resultFrame.contain ? "object-contain" : undefined}
            />
          </div>
          <span className="mba-split__seam" aria-hidden="true">
            →
          </span>
        </div>
      </figure>
    );
  }

  if (variant === "guide") {
    return (
      <figure
        role="group"
        aria-label={label}
        data-testid="merge-before-after"
        data-variant="guide"
        className={cn(
          "mba-guide relative z-0 mx-auto my-6 max-w-[560px] pt-3 pr-1 pb-10 pl-[26px] md:pb-[60px] md:pl-[60px]",
          shown.length === 1 && "mba-guide-single",
          className,
        )}
      >
        <figcaption className="sr-only">{label}</figcaption>
        <div
          className={cn(
            "relative overflow-hidden rounded-[18px] shadow-[var(--shadow)]",
            resultFrame.contain && "bg-[#f5f3ee]",
          )}
          style={{ aspectRatio: resultFrame.aspectRatio }}
        >
          <FrameImage
            image={{ ...result, alt: resultAlt(result, title) }}
            sizes={resultSizes}
            priority={priority}
            highPriority={priority}
            className={resultFrame.contain ? "object-contain" : undefined}
          />
          <span className="mba-pill mba-pill-result mba-pill-result-end" aria-hidden="true">
            Result
          </span>
        </div>
        <div className="mba-dock">
          {shown.map((input, index) => (
            <div
              key={`${input.src}-${index}`}
              className={cn("mba-chip relative", index >= 2 && "mba-chip-late")}
            >
              <FrameImage
                image={{ ...input, alt: inputAlt(input, title, index, shown.length) }}
                sizes={inputSizes}
                priority={priority}
              />
              <span className="mba-chip-label" aria-hidden="true">
                {shown.length === 1 ? "Before" : `Photo ${index + 1}`}
              </span>
            </div>
          ))}
        </div>
      </figure>
    );
  }

  const topPhoto = shown.length > 1 ? 2 : 1;

  return (
    <figure
      role="group"
      aria-label={label}
      data-testid="merge-before-after"
      data-variant="hero"
      className={cn("relative m-0", className)}
    >
      <figcaption className="sr-only">{label}</figcaption>
      {ambientSrc ? <AmbientBlur src={ambientSrc} /> : null}
      <div className="mba-hero">
        <div
          className={cn("mba-stack", shown.length === 1 && "mba-stack-single")}
          data-count={shown.length}
        >
          {shown.map((input, index) => {
            const photo = index + 1;
            return (
              <div
                key={`${input.src}-${index}`}
                className={cn("mba-print", photo === topPhoto && shown.length > 1 && "mba-print-top")}
                data-photo={photo}
              >
                <div className="mba-print-img relative">
                  <FrameImage
                    image={{ ...input, alt: inputAlt(input, title, index, shown.length) }}
                    sizes={inputSizes}
                    priority={priority}
                  />
                </div>
                <span className="mba-lip" aria-hidden="true">
                  {shown.length === 1 ? "Before" : `Photo ${photo}`}
                </span>
              </div>
            );
          })}
          {hidden > 0 ? (
            <span className="mba-more" aria-hidden="true">
              +{hidden}
            </span>
          ) : null}
        </div>
        <Arrow />
        <div
          className={cn(
            "relative overflow-hidden rounded-[18px] shadow-[var(--shadow)] outline outline-1 outline-white/12",
            resultFrame.contain && "bg-[#f5f3ee]",
          )}
          style={{ aspectRatio: resultFrame.aspectRatio }}
        >
          <FrameImage
            image={{ ...result, alt: resultAlt(result, title) }}
            sizes={resultSizes}
            priority={priority}
            highPriority={priority}
            className={resultFrame.contain ? "object-contain" : undefined}
          />
          <span className="mba-pill mba-pill-result" aria-hidden="true">
            Result
          </span>
        </div>
      </div>
    </figure>
  );
}
