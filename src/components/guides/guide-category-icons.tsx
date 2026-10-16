import type { ReactNode } from "react";
import type { GuideCategorySlug } from "@/lib/guides/categories";

type IconProps = {
  className?: string;
};

function Svg({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function GuideAllIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </Svg>
  );
}

export function GuideCategoryIcon({
  name,
  className,
}: {
  name: GuideCategorySlug | "all";
  className?: string;
}) {
  if (name === "all") return <GuideAllIcon className={className} />;
  switch (name) {
    case "festivals":
      return (
        <Svg className={className}>
          <path d="M12 3c2 3 4 4.5 4 8a4 4 0 0 1-8 0c0-3.5 2-5 4-8z" />
          <path d="M8 21h8" />
        </Svg>
      );
    case "couples-family":
      return (
        <Svg className={className}>
          <path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21.5l8.8-8.8a5 5 0 0 0 0-7.1z" />
        </Svg>
      );
    case "trends":
      return (
        <Svg className={className}>
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M15 7h6v6" />
        </Svg>
      );
    case "seasonal":
      return (
        <Svg className={className}>
          <path d="M12 2v20M4.9 7l14.2 10M4.9 17L19.1 7" />
        </Svg>
      );
    case "occasions":
      return (
        <Svg className={className}>
          <path d="M4 11h16v10H4zM2 7h20v4H2zM12 7v14" />
          <path d="M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0" />
        </Svg>
      );
    case "professional":
      return (
        <Svg className={className}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        </Svg>
      );
    case "styles":
      return (
        <Svg className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" />
        </Svg>
      );
    default:
      return <GuideAllIcon className={className} />;
  }
}
