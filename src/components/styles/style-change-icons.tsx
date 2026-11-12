import type { StyleChangeCategoryId } from "@/lib/catalog/style-change-categories";

const svgProps = {
  className: "h-4 w-4",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

/** Duotone line icons matched to Glass Icon Bento categories. */
export function StyleChangeCategoryIcon({
  category,
}: {
  category: StyleChangeCategoryId;
}) {
  switch (category) {
    case "ATMOSPHERE":
      return (
        <svg {...svgProps}>
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      );
    case "BACKDROP":
      return (
        <svg {...svgProps}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="12" cy="10" r="3" />
          <path d="M7 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2" />
        </svg>
      );
    case "LIGHTING":
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case "TONE & COLOR":
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 0 0 0 18Z" fill="currentColor" fillOpacity="0.35" />
        </svg>
      );
    case "OUTFIT":
      return (
        <svg {...svgProps}>
          <path d="M16 4h2l3 5-4 1-2-3H9L7 10 3 9l3-5h2" />
          <path d="M9 9v11h6V9" />
        </svg>
      );
    case "JEWELLERY & ACCESSORIES":
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" />
        </svg>
      );
    case "POSE & FRAMING":
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="5" r="2" />
          <path d="M8 22l2-7 2 3 2-3 2 7" />
          <path d="M7 10h10l-1.5 5H8.5Z" />
        </svg>
      );
    case "LAYOUT":
      return (
        <svg {...svgProps}>
          <rect x="3" y="3" width="8" height="8" rx="1.5" />
          <rect x="13" y="3" width="8" height="8" rx="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" />
          <rect x="13" y="13" width="8" height="8" rx="1.5" />
        </svg>
      );
    case "PROPS & DECOR":
      return (
        <svg {...svgProps}>
          <path d="M12 3 4 8v8l8 5 8-5V8Z" />
          <path d="M12 12 4 8M12 12l8-4M12 12v9" />
        </svg>
      );
    case "ART STYLE":
      return (
        <svg {...svgProps}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      );
    case "HAIR & MAKEUP":
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="9" r="4" />
          <path d="M6 20c1.5-3 4-4.5 6-4.5S16.5 17 18 20" />
          <path d="M9 9c.5-2 1.5-3 3-3" />
        </svg>
      );
    case "PEOPLE":
      return (
        <svg {...svgProps}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="16" cy="9" r="2.5" />
          <path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 4.3 2.4" />
          <path d="M16 20v-1a4 4 0 0 0-2.2-3.6" />
        </svg>
      );
    default:
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

/** Same expand-icon control on every card (no prototype "Click to inspect" label). */
export function CardInspectBadge() {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-[#0B0B0F]/80 text-zinc-400 backdrop-blur-sm transition-all duration-200 group-hover:border-violet-400/50 group-hover:bg-violet-500/20 group-hover:text-violet-200">
      <svg
        className="h-3 w-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        aria-hidden
      >
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
      </svg>
    </span>
  );
}
