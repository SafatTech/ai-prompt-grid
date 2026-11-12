import type { StyleChangeCategoryId } from "@/lib/catalog/style-change-categories";
import { getStyleChangeCategory } from "@/lib/catalog/style-change-categories";

function Chip({
  category,
  text,
}: {
  category: StyleChangeCategoryId;
  text: string;
}) {
  const accent = getStyleChangeCategory(category).accent;
  return (
    <div className="absolute bottom-3 left-4 flex items-center gap-2">
      <span
        className={`rounded-md border ${accent.chipBorder} bg-[#0B0B0F]/80 px-2 py-0.5 font-mono text-[10px] ${accent.chipText} backdrop-blur-sm`}
      >
        {text}
      </span>
    </div>
  );
}

function AtmosphereBanner({ chip, uid }: { chip: string; uid: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_35%,rgba(139,92,246,0.5),transparent_65%),radial-gradient(circle_at_75%_68%,rgba(192,132,252,0.38),transparent_60%)]" />
      <svg
        className="style-change-smoke-1 absolute -inset-2 h-[120%] w-[120%] opacity-95"
        viewBox="0 0 320 140"
        fill="none"
        aria-hidden
      >
        <path
          d="M-15 105 C 45 45, 95 118, 160 62 C 225 6, 270 90, 335 42"
          stroke={`url(#${uid}-smoke1)`}
          strokeWidth="22"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M-10 70 C 60 112, 120 22, 190 78 C 255 128, 285 35, 335 65"
          stroke={`url(#${uid}-smoke2)`}
          strokeWidth="13"
          strokeLinecap="round"
          opacity="0.8"
        />
        <circle cx="88" cy="48" r="2" fill="#E9D5FF" opacity="0.85" />
        <circle cx="215" cy="36" r="2.5" fill="#C084FC" opacity="0.75" />
        <circle cx="262" cy="88" r="1.8" fill="#F3E8FF" opacity="0.9" />
        <defs>
          <linearGradient
            id={`${uid}-smoke1`}
            x1="0"
            y1="0"
            x2="320"
            y2="140"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E879F9" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient
            id={`${uid}-smoke2`}
            x1="320"
            y1="0"
            x2="0"
            y2="140"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#C084FC" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#EDE9FE" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
      <Chip category="ATMOSPHERE" text={chip} />
    </>
  );
}

function BackdropBanner({ chip, uid }: { chip: string; uid: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-[#050508]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(167,139,250,0.18),transparent_72%)]" />
      <svg
        className="absolute inset-0 h-full w-full opacity-55"
        viewBox="0 0 320 140"
        fill="none"
        aria-hidden
      >
        <ellipse
          cx="160"
          cy="116"
          rx="115"
          ry="18"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <ellipse
          cx="160"
          cy="116"
          rx="58"
          ry="9"
          stroke="rgba(139,92,246,0.55)"
          strokeWidth="1.2"
        />
        <line
          x1="160"
          y1="12"
          x2="160"
          y2="116"
          stroke={`url(#${uid}-void)`}
          strokeWidth="1.5"
          strokeDasharray="3 4"
        />
        <defs>
          <linearGradient
            id={`${uid}-void`}
            x1="160"
            y1="12"
            x2="160"
            y2="116"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <Chip category="BACKDROP" text={chip} />
    </>
  );
}

function LightingBanner({ chip }: { chip: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-[#08080D]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_50%,rgba(139,92,246,0.42),transparent_55%),radial-gradient(circle_at_68%_50%,rgba(245,158,11,0.3),transparent_55%)]" />
      <svg
        className="style-change-rim absolute inset-0 h-full w-full"
        viewBox="0 0 320 140"
        fill="none"
        aria-hidden
      >
        <path
          d="M122 134 C 122 104, 134 94, 142 88 C 134 80, 131 66, 131 54 C 131 36, 144 25, 160 25"
          stroke="#A78BFA"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M160 25 C 176 25, 189 36, 189 54 C 189 66, 186 80, 178 88 C 186 94, 198 104, 198 134"
          stroke="#FBBF24"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.92"
        />
        <path
          d="M124 134 C 124 105, 136 94, 143 88 C 135 80, 132 66, 132 54 C 132 37, 144 26, 160 26 C 176 26, 188 37, 188 54 C 188 66, 185 80, 177 88 C 184 94, 196 105, 196 134 Z"
          fill="#0B0B11"
        />
      </svg>
      <Chip category="LIGHTING" text={chip} />
    </>
  );
}

function ToneBanner({ chip, uid }: { chip: string; uid: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(125deg,#060609_0%,#060609_48%,rgba(139,92,246,0.32)_50%,rgba(45,212,191,0.18)_100%)]" />
      <svg
        className="relative h-full w-full"
        viewBox="0 0 320 140"
        fill="none"
        aria-hidden
      >
        <line
          x1="36"
          y1="114"
          x2="284"
          y2="26"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <path
          d="M 36 116 C 115 116, 132 70, 160 70 C 188 70, 205 24, 284 24"
          stroke={`url(#${uid}-curve)`}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          cx="160"
          cy="70"
          r="4.5"
          fill="#0B0B0F"
          stroke="#2DD4BF"
          strokeWidth="2.2"
        />
        <defs>
          <linearGradient
            id={`${uid}-curve`}
            x1="36"
            y1="116"
            x2="284"
            y2="24"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#6D28D9" />
            <stop offset="50%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>
        </defs>
      </svg>
      <Chip category="TONE & COLOR" text={chip} />
    </>
  );
}

function OutfitBanner({ chip }: { chip: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-[#0A080C]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(244,63,94,0.35),transparent_55%),radial-gradient(circle_at_70%_75%,rgba(251,113,133,0.22),transparent_50%)]" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 320 140"
        fill="none"
        aria-hidden
      >
        <path
          d="M128 30h64l18 28-22 6-12-16h-32l-12 16-22-6Z"
          stroke="#FDA4AF"
          strokeWidth="2"
          fill="rgba(244,63,94,0.12)"
        />
        <path
          d="M140 64v58h40V64"
          stroke="#FECDD3"
          strokeWidth="2"
          fill="rgba(251,113,133,0.08)"
        />
        <path d="M140 78h40M140 96h40" stroke="#FB7185" strokeWidth="1.2" opacity="0.55" />
      </svg>
      <Chip category="OUTFIT" text={chip} />
    </>
  );
}

function JewelleryBanner({ chip }: { chip: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-[#0A0710]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(217,70,239,0.4),transparent_55%)]" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 320 140"
        fill="none"
        aria-hidden
      >
        <circle cx="160" cy="58" r="16" stroke="#E879F9" strokeWidth="2" />
        <circle cx="160" cy="58" r="6" fill="#F5D0FE" />
        <path
          d="M160 74c-28 10-42 28-46 48M160 74c28 10 42 28 46 48"
          stroke="#D946EF"
          strokeWidth="1.6"
          opacity="0.7"
        />
        <circle cx="118" cy="42" r="2" fill="#F5D0FE" />
        <circle cx="204" cy="38" r="1.6" fill="#F0ABFC" />
        <circle cx="190" cy="86" r="1.8" fill="#E879F9" />
      </svg>
      <Chip category="JEWELLERY & ACCESSORIES" text={chip} />
    </>
  );
}

function PoseBanner({ chip }: { chip: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-[#070B10]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_40%,rgba(56,189,248,0.32),transparent_60%)]" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 320 140"
        fill="none"
        aria-hidden
      >
        <circle cx="168" cy="36" r="10" stroke="#7DD3FC" strokeWidth="2" />
        <path
          d="M168 48v28M168 76l-18 36M168 76l18 36M150 62h36"
          stroke="#38BDF8"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <rect
          x="96"
          y="18"
          width="128"
          height="104"
          rx="8"
          stroke="rgba(125,211,252,0.35)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
      </svg>
      <Chip category="POSE & FRAMING" text={chip} />
    </>
  );
}

function LayoutBanner({ chip }: { chip: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-[#06100C]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.28),transparent_55%)]" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 320 140"
        fill="none"
        aria-hidden
      >
        {[
          [48, 28],
          [168, 28],
          [48, 76],
          [168, 76],
        ].map(([x, y], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width="104"
            height="36"
            rx="6"
            stroke="#34D399"
            strokeWidth="1.6"
            fill="rgba(16,185,129,0.08)"
            opacity={0.55 + i * 0.1}
          />
        ))}
      </svg>
      <Chip category="LAYOUT" text={chip} />
    </>
  );
}

function PropsBanner({ chip }: { chip: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-[#100A06]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_55%,rgba(249,115,22,0.32),transparent_58%)]" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 320 140"
        fill="none"
        aria-hidden
      >
        <ellipse cx="160" cy="108" rx="70" ry="10" fill="rgba(249,115,22,0.15)" />
        <path
          d="M120 100c8-36 22-62 40-62s32 26 40 62"
          stroke="#FB923C"
          strokeWidth="2"
          fill="rgba(251,146,60,0.12)"
        />
        <circle cx="160" cy="42" r="5" fill="#FDBA74" />
        <path d="M160 47v14" stroke="#F97316" strokeWidth="1.5" />
        <circle cx="112" cy="72" r="3" fill="#FDBA74" opacity="0.7" />
        <circle cx="208" cy="78" r="2.5" fill="#FDBA74" opacity="0.7" />
      </svg>
      <Chip category="PROPS & DECOR" text={chip} />
    </>
  );
}

function ArtStyleBanner({ chip, uid }: { chip: string; uid: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-[#0A0812]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_40%,rgba(139,92,246,0.35),transparent_55%),radial-gradient(circle_at_75%_60%,rgba(99,102,241,0.22),transparent_50%)]" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 320 140"
        fill="none"
        aria-hidden
      >
        <path
          d="M40 110 C 80 40, 120 120, 160 50 C 200 -10, 240 100, 280 40"
          stroke={`url(#${uid}-art)`}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M56 96h28M92 72h24M140 54h30M198 68h26"
          stroke="#C4B5FD"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <defs>
          <linearGradient
            id={`${uid}-art`}
            x1="40"
            y1="110"
            x2="280"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#6D28D9" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
      </svg>
      <Chip category="ART STYLE" text={chip} />
    </>
  );
}

function HairBanner({ chip }: { chip: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-[#12080C]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(251,113,133,0.35),transparent_60%)]" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 320 140"
        fill="none"
        aria-hidden
      >
        <path
          d="M112 118c4-40 18-70 48-70s44 30 48 70"
          stroke="#FDA4AF"
          strokeWidth="2.2"
          fill="rgba(251,113,133,0.1)"
        />
        <circle cx="160" cy="64" r="18" stroke="#FECDD3" strokeWidth="2" />
        <path
          d="M130 48c10-18 28-26 30-10M190 48c-10-18-28-26-30-10"
          stroke="#FB7185"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <Chip category="HAIR & MAKEUP" text={chip} />
    </>
  );
}

function PeopleBanner({ chip }: { chip: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-[#070B12]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_45%,rgba(56,189,248,0.28),transparent_60%)]" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 320 140"
        fill="none"
        aria-hidden
      >
        <circle cx="132" cy="52" r="14" stroke="#7DD3FC" strokeWidth="2" />
        <circle cx="188" cy="56" r="12" stroke="#38BDF8" strokeWidth="2" />
        <path
          d="M100 118c4-28 18-42 32-42s28 14 32 42"
          stroke="#7DD3FC"
          strokeWidth="2"
          fill="rgba(56,189,248,0.08)"
        />
        <path
          d="M160 118c4-24 16-36 28-36s24 12 28 36"
          stroke="#38BDF8"
          strokeWidth="2"
          fill="rgba(14,165,233,0.08)"
        />
      </svg>
      <Chip category="PEOPLE" text={chip} />
    </>
  );
}

export function StyleChangeBanner({
  category,
  chip,
  uid,
}: {
  category: StyleChangeCategoryId;
  chip: string;
  uid: string;
}) {
  switch (category) {
    case "ATMOSPHERE":
      return <AtmosphereBanner chip={chip} uid={uid} />;
    case "BACKDROP":
      return <BackdropBanner chip={chip} uid={uid} />;
    case "LIGHTING":
      return <LightingBanner chip={chip} />;
    case "TONE & COLOR":
      return <ToneBanner chip={chip} uid={uid} />;
    case "OUTFIT":
      return <OutfitBanner chip={chip} />;
    case "JEWELLERY & ACCESSORIES":
      return <JewelleryBanner chip={chip} />;
    case "POSE & FRAMING":
      return <PoseBanner chip={chip} />;
    case "LAYOUT":
      return <LayoutBanner chip={chip} />;
    case "PROPS & DECOR":
      return <PropsBanner chip={chip} />;
    case "ART STYLE":
      return <ArtStyleBanner chip={chip} uid={uid} />;
    case "HAIR & MAKEUP":
      return <HairBanner chip={chip} />;
    case "PEOPLE":
      return <PeopleBanner chip={chip} />;
    default:
      return <PropsBanner chip={chip} />;
  }
}
