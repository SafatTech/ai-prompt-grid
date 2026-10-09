import Image from "next/image";
import Link from "next/link";
import { Children, isValidElement, type ReactNode } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CopyPromptButton } from "@/components/guides/copy-prompt-button";
import {
  firstDimensionedPairSrcs,
  isFirstDimensionedPair,
  isLocalGuideSrc,
  isSizedGuideSrc,
  parseDimensionTitle,
} from "@/lib/guides/image-pairs";
import { guideLinkMode } from "@/lib/guides/prepare";

const PLACEHOLDER_SRC = "guide-image-placeholder";

export function GuideMarkdown({
  markdown,
  visibleSlugs,
}: {
  markdown: string;
  visibleSlugs: ReadonlySet<string>;
}) {
  const eagerPair = firstDimensionedPairSrcs(markdown);

  return (
    <div className="guide-body">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <p className="my-3 text-[15px] leading-relaxed text-[var(--muted)]">
              {children}
            </p>
          ),
          h2: ({ children }) => (
            <h2 className="mt-10 mb-3 text-[22px] tracking-[-0.02em]">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-6 mb-2 text-[17px] tracking-[-0.02em]">{children}</h3>
          ),
          p: ({ children }) => {
            const pair = sizedLocalPair(children);
            if (pair) {
              return (
                <GuideBeforeAfter
                  images={pair}
                  eager={isFirstDimensionedPair(
                    pair.map((image) => image.src),
                    eagerPair,
                  )}
                />
              );
            }
            return (
              <p className="my-3 text-[15px] leading-relaxed text-[var(--muted)]">
                {children}
              </p>
            );
          },
          ul: ({ children }) => (
            <ul className="my-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[var(--muted)]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-[var(--muted)]">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-2 border-[var(--line-strong)] pl-4 text-[15px] text-[var(--muted)]">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <GuideAnchor href={href} visibleSlugs={visibleSlugs}>
              {children}
            </GuideAnchor>
          ),
          img: GuideImage,
          pre: ({ children }) => <PromptBlock>{children}</PromptBlock>,
          code: ({ className, children }) => {
            if (className) return <code className={className}>{children}</code>;
            return (
              <code className="rounded bg-[#15151E] px-1.5 py-0.5 font-mono text-[0.9em] text-[var(--text)]">
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-[var(--muted)]">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-[var(--line)] px-3 py-2 font-bold text-[var(--text)]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-[var(--line)] px-3 py-2 align-top">
              {children}
            </td>
          ),
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}

function GuideAnchor({
  href,
  visibleSlugs,
  children,
}: {
  href?: string;
  visibleSlugs: ReadonlySet<string>;
  children: ReactNode;
}) {
  if (!href || guideLinkMode(href, visibleSlugs) === "text") {
    return <span className="font-bold text-[var(--text)]">{children}</span>;
  }

  const className = "font-bold text-[var(--text)] underline-offset-2 hover:underline";
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function GuideImage({
  src,
  alt,
  title,
}: {
  src?: unknown;
  alt?: string;
  title?: string;
}) {
  return (
    <GuideFigure src={typeof src === "string" ? src : ""} alt={alt ?? ""} title={title} />
  );
}

function sizedLocalPair(
  children: ReactNode,
): { src: string; alt: string; width: number; height: number }[] | null {
  const images: { src: string; alt: string; width: number; height: number }[] = [];
  for (const node of Children.toArray(children)) {
    if (typeof node === "string") {
      if (node.trim() === "") continue;
      return null;
    }
    if (
      !isValidElement<{ src?: unknown; alt?: unknown; title?: unknown }>(node) ||
      node.type !== GuideImage
    ) {
      return null;
    }
    const src = typeof node.props.src === "string" ? node.props.src : "";
    const dimensions = parseDimensionTitle(node.props.title);
    if (!isSizedGuideSrc(src) || !dimensions) return null;
    const alt = typeof node.props.alt === "string" ? node.props.alt : "";
    images.push({ src, alt, width: dimensions.width, height: dimensions.height });
  }
  return images.length >= 2 ? images : null;
}

function frameLabel(src: string): string | null {
  if (src.includes("-before.") || /\/source-\d+b?\./.test(src)) return "Before";
  if (src.includes("-after.") || /\/result-\d+b?\./.test(src)) return "After";
  return null;
}

function GuideBeforeAfter({
  images,
  eager = false,
}: {
  images: { src: string; alt: string; width: number; height: number }[];
  eager?: boolean;
}) {
  return (
    <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {images.map((image) => {
        const label = frameLabel(image.src);
        const loading = eager ? "eager" : "lazy";
        const fetchPriority = eager ? "high" : "auto";
        return (
          <figure key={image.src} className="m-0">
            {isLocalGuideSrc(image.src) ? (
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 640px) calc(100vw - 24px), 360px"
                className="h-auto w-full rounded-2xl bg-[#15151E]"
                loading={loading}
                fetchPriority={fetchPriority}
              />
            ) : (
              // Remote catalog files stay on Supabase, so they are not optimized here.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading={loading}
                fetchPriority={fetchPriority}
                className="h-auto w-full rounded-2xl bg-[#15151E]"
              />
            )}
            {label ? (
              <figcaption className="mt-2 text-center text-xs text-[var(--muted)]">
                {label}
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}

function GuideFigure({ src, alt, title }: { src: string; alt: string; title?: string }) {
  if (!src || src === PLACEHOLDER_SRC) {
    return (
      <figure className="my-6">
        <div className="flex min-h-[180px] items-center justify-center rounded-2xl border-2 border-dashed border-[#8b6cff] bg-[#15151E] px-6 py-10 text-center">
          <div>
            <p className="m-0 text-[11px] font-extrabold tracking-[0.12em] text-[#c1b4ff] uppercase">
              Image placeholder
            </p>
            <p className="mx-auto mt-2 mb-0 max-w-[42ch] text-sm leading-relaxed text-[var(--muted)]">
              {alt || "Example photo coming soon"}
            </p>
          </div>
        </div>
      </figure>
    );
  }

  const dimensions = parseDimensionTitle(title);
  if (dimensions && isLocalGuideSrc(src)) {
    const label = frameLabel(src);
    return (
      <figure className="my-6">
        <Image
          src={src}
          alt={alt}
          width={dimensions.width}
          height={dimensions.height}
          sizes="(max-width: 760px) 100vw, 760px"
          className="h-auto w-full rounded-2xl bg-[#15151E]"
        />
        {label || alt ? (
          <figcaption className="mt-2 text-center text-xs text-[var(--muted)]">
            {label ?? alt}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (isLocalGuideSrc(src)) {
    return (
      <figure className="my-6">
        <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-[#15151E]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 760px) 100vw, 760px"
            className="object-contain"
          />
        </div>
        {alt ? (
          <figcaption className="mt-2 text-center text-xs text-[var(--muted)]">
            {alt}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className="my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-auto w-full rounded-2xl" />
      {alt ? (
        <figcaption className="mt-2 text-center text-xs text-[var(--muted)]">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

function PromptBlock({ children }: { children?: ReactNode }) {
  const text = nodeText(children).replace(/\n$/, "");
  return (
    <div className="my-5 overflow-hidden rounded-[13px] border border-[var(--line)] bg-[#0f0f15]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-3 py-2 sm:px-4">
        <span className="text-[11px] font-extrabold tracking-[0.12em] text-[var(--muted)] uppercase">
          Prompt
        </span>
        <CopyPromptButton text={text} />
      </div>
      <pre className="m-0 overflow-x-auto p-4 font-mono text-[13px] leading-relaxed break-words whitespace-pre-wrap text-[#d5d2dc]">
        {children}
      </pre>
    </div>
  );
}

function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map((child) => nodeText(child)).join("");
  if (isValidElement<{ children?: ReactNode }>(node))
    return nodeText(node.props.children);
  return "";
}
