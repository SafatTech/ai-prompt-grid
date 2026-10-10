import Image from "next/image";
import { cn } from "@/lib/utils";

export type MergeImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
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

function isRemoteSrc(src: string): boolean {
  return src.startsWith("https://") || src.startsWith("http://");
}

function FrameImage({
  image,
  sizes,
  priority = false,
  highPriority = false,
  className,
}: {
  image: MergeImage;
  sizes: string;
  priority?: boolean;
  highPriority?: boolean;
  className?: string;
}) {
  const width = image.width ?? DEFAULT_WIDTH;
  const height = image.height ?? DEFAULT_HEIGHT;
  const shared = cn("absolute inset-0 h-full w-full object-cover", className);
  if (!isRemoteSrc(image.src) && image.src.startsWith("/")) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        fetchPriority={highPriority ? "high" : "auto"}
        className={shared}
      />
    );
  }
  return (
    // Remote catalog files stay on Supabase. Width and height still reserve the box.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image.src}
      alt={image.alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={highPriority ? "high" : "auto"}
      decoding="async"
      className={shared}
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
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M46 10 L56 19 L44 23"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
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

/**
 * Multi-photo before/after. Hero is the print stack. Guide and card are docked.
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
    variant === "card" ? "46px" : variant === "guide" ? "150px" : "(max-width: 768px) 50vw, 320px";

  if (variant === "card") {
    const chips = inputs.slice(0, 3);
    const extra = inputs.length - chips.length;
    return (
      <figure
        role="group"
        aria-label={label}
        data-testid="merge-before-after"
        data-variant="card"
        className={cn("absolute inset-0 m-0", className)}
      >
        <figcaption className="sr-only">{label}</figcaption>
        <div className="absolute inset-0">
          <FrameImage
            image={{ ...result, alt: resultAlt(result, title) }}
            sizes={resultSizes}
            priority={priority}
            highPriority={priority}
          />
        </div>
        <div className="absolute bottom-2 left-2 z-3 flex">
          {chips.map((input, index) => (
            <div key={`${input.src}-${index}`} className="mba-card-chip relative">
              <FrameImage
                image={{ ...input, alt: inputAlt(input, title, index, inputs.length) }}
                sizes={inputSizes}
                priority={priority}
              />
            </div>
          ))}
          {extra > 0 ? (
            <span className="mba-card-more" aria-hidden="true">
              +{extra}
            </span>
          ) : null}
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
        <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] shadow-[var(--shadow)]">
          <FrameImage
            image={{ ...result, alt: resultAlt(result, title) }}
            sizes={resultSizes}
            priority={priority}
            highPriority={priority}
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
      className={cn("m-0", className)}
    >
      <figcaption className="sr-only">{label}</figcaption>
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
        <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] shadow-[var(--shadow)] outline outline-1 outline-white/12">
          <FrameImage
            image={{ ...result, alt: resultAlt(result, title) }}
            sizes={resultSizes}
            priority={priority}
            highPriority={priority}
          />
          <span className="mba-pill mba-pill-result" aria-hidden="true">
            Result
          </span>
        </div>
      </div>
    </figure>
  );
}
