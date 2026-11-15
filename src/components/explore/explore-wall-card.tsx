"use client";

import Image from "next/image";
import Link from "next/link";
import { CopyPromptButton } from "@/components/home/copy-prompt-button";
import { StyleCardSaveButton } from "@/components/style-card-save-button";
import type { StyleCardData } from "@/lib/catalog/style-card-data";

export type ExploreWallCardData = StyleCardData & {
  isHot?: boolean;
  isNew?: boolean;
};

type Props = {
  style: ExploreWallCardData;
  priority?: boolean;
  eager?: boolean;
};

const WALL_SIZES =
  "(max-width: 599px) 33vw, (max-width: 899px) 25vw, (max-width: 1199px) 16vw, 12.5vw";

export function ExploreWallCard({ style, priority = false, eager = false }: Props) {
  const snippet = style.promptPreview || style.title;
  const objectPosition =
    style.resultFocusX != null && style.resultFocusY != null
      ? `${style.resultFocusX}% ${style.resultFocusY}%`
      : undefined;

  return (
    <article className="wall-card" data-testid={`style-card-${style.id}`}>
      <div className="thumb">
        <Link
          href={`/styles/${style.id}`}
          className="absolute inset-0 block"
          aria-label={`Open ${style.title}`}
        >
          <Image
            className="thumb-img"
            src={style.result}
            alt={`${style.title} result`}
            fill
            sizes={WALL_SIZES}
            priority={priority}
            loading={priority || eager ? "eager" : "lazy"}
            placeholder={style.resultBlur ? "blur" : "empty"}
            {...(style.resultBlur ? { blurDataURL: style.resultBlur } : {})}
            style={objectPosition ? { objectPosition } : undefined}
          />
        </Link>
        {style.isHot || style.isNew ? (
          <div className="card-tags">
            {style.isNew ? <span className="tag tag-new">New</span> : null}
            {style.isHot ? <span className="tag tag-hot">Hot</span> : null}
          </div>
        ) : null}
        <StyleCardSaveButton styleId={style.id} className="save-btn" />
        <div className="prompt-strip" aria-hidden="true">
          <span>{snippet}</span>
        </div>
      </div>
      <div className="body">
        <div className="body-main">
          <div className="cat">{style.category}</div>
          <Link className="title" href={`/styles/${style.id}`}>
            {style.title}
          </Link>
        </div>
        <CopyPromptButton styleId={style.id} variant="icon" />
      </div>
    </article>
  );
}
