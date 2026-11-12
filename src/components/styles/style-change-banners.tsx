import type { CSSProperties, ReactNode } from "react";
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

function BannerShell({
  children,
  chip,
  category,
}: {
  children: ReactNode;
  chip: string;
  category: StyleChangeCategoryId;
}) {
  return (
    <>
      {children}
      <Chip category={category} text={chip} />
    </>
  );
}

function delay(ms: string): CSSProperties {
  return { animationDelay: ms };
}

/** Saad’s final popup header art — ATMOSPHERE */
function AtmosphereBanner({ chip, uid }: { chip: string; uid: string }) {
  return (
    <BannerShell category="ATMOSPHERE" chip={chip}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.45),transparent_65%),radial-gradient(circle_at_75%_70%,rgba(192,132,252,0.32),transparent_60%)]" />
      <svg
        className="absolute -inset-2 h-[120%] w-[120%] opacity-95"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <style>{`
          @keyframes svgSmokeDrift1 { 0%, 100% { transform: translate(0px, 0px) scale(1); } 50% { transform: translate(5px, -4px) scale(1.03); } }
          @keyframes svgSmokeDrift2 { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(-5px, 4px); } }
          @keyframes svgEmberPulse { 0%, 100% { opacity: 0.35; transform: translateY(0px); } 50% { opacity: 1; transform: translateY(-4px); } }
          .s-smoke-1 { animation: svgSmokeDrift1 5.5s ease-in-out infinite; transform-origin: center; }
          .s-smoke-2 { animation: svgSmokeDrift2 7s ease-in-out infinite; transform-origin: center; }
          .s-ember { animation: svgEmberPulse 3.6s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) { .s-smoke-1, .s-smoke-2, .s-ember { animation: none; } }
        `}</style>
        <path
          className="s-smoke-1"
          d="M-10 75 C 30 35, 65 85, 105 45 C 145 5, 175 65, 215 30"
          stroke={`url(#${uid}-smokeGrad1)`}
          strokeWidth="16"
          strokeLinecap="round"
          opacity="0.58"
        />
        <path
          className="s-smoke-2"
          d="M-5 50 C 40 80, 80 15, 125 55 C 165 90, 185 25, 215 45"
          stroke={`url(#${uid}-smokeGrad2)`}
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.78"
        />
        <circle className="s-ember" cx="58" cy="36" r="1.6" fill="#E9D5FF" />
        <circle
          className="s-ember"
          style={delay("1.2s")}
          cx="138"
          cy="28"
          r="2"
          fill="#C084FC"
        />
        <circle
          className="s-ember"
          style={delay("2.1s")}
          cx="162"
          cy="64"
          r="1.4"
          fill="#F3E8FF"
        />
        <defs>
          <linearGradient
            id={`${uid}-smokeGrad1`}
            x1="0"
            y1="0"
            x2="200"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#E879F9" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient
            id={`${uid}-smokeGrad2`}
            x1="200"
            y1="0"
            x2="0"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#C084FC" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#DDD6FE" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </BannerShell>
  );
}

/** Saad’s final popup header art — BACKDROP */
function BackdropBanner({ chip, uid }: { chip: string; uid: string }) {
  return (
    <BannerShell category="BACKDROP" chip={chip}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.22),transparent_72%)]" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <style>{`
          @keyframes svgSpotCone { 0%, 100% { transform: skewX(-2deg); opacity: 0.72; } 50% { transform: skewX(2deg); opacity: 1; } }
          @keyframes svgStagePulse { 0%, 100% { transform: scale(0.96); opacity: 0.45; } 50% { transform: scale(1.04); opacity: 0.9; } }
          @keyframes svgDustFloat { 0%, 100% { transform: translateY(0px); opacity: 0.3; } 50% { transform: translateY(-6px); opacity: 0.95; } }
          .bg-cone { animation: svgSpotCone 6s ease-in-out infinite; transform-origin: 100px 6px; }
          .bg-ring { animation: svgStagePulse 4.8s ease-in-out infinite; transform-origin: 100px 82px; }
          .bg-dust { animation: svgDustFloat 4.2s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) { .bg-cone, .bg-ring, .bg-dust { animation: none; } }
        `}</style>
        <polygon
          className="bg-cone"
          points="100,4 44,86 156,86"
          fill={`url(#${uid}-voidConeGrad)`}
        />
        <ellipse
          className="bg-ring"
          cx="100"
          cy="82"
          rx="64"
          ry="11"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <ellipse
          className="bg-ring"
          style={delay("0.8s")}
          cx="100"
          cy="82"
          rx="32"
          ry="5.5"
          stroke="rgba(167,139,250,0.65)"
          strokeWidth="1.2"
        />
        <circle className="bg-dust" cx="84" cy="46" r="1.2" fill="#E9D5FF" />
        <circle
          className="bg-dust"
          style={delay("1.4s")}
          cx="116"
          cy="58"
          r="1.4"
          fill="#A78BFA"
        />
        <circle
          className="bg-dust"
          style={delay("2.2s")}
          cx="96"
          cy="30"
          r="1"
          fill="#FFFFFF"
        />
        <defs>
          <linearGradient
            id={`${uid}-voidConeGrad`}
            x1="100"
            y1="4"
            x2="100"
            y2="86"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.28" />
            <stop offset="65%" stopColor="#8B5CF6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#050508" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </BannerShell>
  );
}

/** Saad’s final popup header art — LIGHTING */
function LightingBanner({ chip }: { chip: string }) {
  return (
    <BannerShell category="LIGHTING" chip={chip}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_50%,rgba(139,92,246,0.38),transparent_55%),radial-gradient(circle_at_72%_50%,rgba(245,158,11,0.28),transparent_55%)]" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <style>{`
          @keyframes svgRimViolet { 0%, 100% { opacity: 0.7; filter: drop-shadow(0 0 4px rgba(167,139,250,0.55)); } 50% { opacity: 1; filter: drop-shadow(0 0 10px rgba(167,139,250,0.95)); } }
          @keyframes svgRimAmber { 0%, 100% { opacity: 1; filter: drop-shadow(0 0 9px rgba(251,191,36,0.9)); } 50% { opacity: 0.68; filter: drop-shadow(0 0 4px rgba(251,191,36,0.5)); } }
          .rim-left { animation: svgRimViolet 3.8s ease-in-out infinite; }
          .rim-right { animation: svgRimAmber 3.8s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) { .rim-left, .rim-right { animation: none; } }
        `}</style>
        <path
          className="rim-left"
          d="M74 96 C 74 74, 83 68, 88 64 C 82 58, 80 48, 80 40 C 80 27, 89 19, 100 19"
          stroke="#A78BFA"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          className="rim-right"
          d="M100 19 C 111 19, 120 27, 120 40 C 120 48, 118 58, 112 64 C 117 68, 126 74, 126 96"
          stroke="#FBBF24"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M75 96 C 75 75, 84 68, 89 64 C 83 58, 81 48, 81 40 C 81 28, 89 20, 100 20 C 111 20, 119 28, 119 40 C 119 48, 117 58, 111 64 C 116 68, 125 75, 125 96 Z"
          fill="#0B0B11"
        />
      </svg>
    </BannerShell>
  );
}

/** Saad’s final popup header art — TONE & COLOR */
function ToneBanner({ chip, uid }: { chip: string; uid: string }) {
  return (
    <BannerShell category="TONE & COLOR" chip={chip}>
      <div className="absolute inset-0 bg-[linear-gradient(125deg,#060609_0%,#060609_48%,rgba(139,92,246,0.28)_50%,rgba(45,212,191,0.16)_100%)]" />
      <svg
        className="relative h-full w-full"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <style>{`
          @keyframes svgCurveGlow { 0% { stroke-dashoffset: 180; } 100% { stroke-dashoffset: 0; } }
          @keyframes svgNodeBreathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.3); } }
          .tone-tracer { stroke-dasharray: 42 138; animation: svgCurveGlow 3.6s linear infinite; }
          .tone-node { animation: svgNodeBreathe 3.2s ease-in-out infinite; transform-origin: 100px 50px; }
          @media (prefers-reduced-motion: reduce) { .tone-tracer, .tone-node { animation: none; } }
        `}</style>
        <line
          x1="24"
          y1="80"
          x2="176"
          y2="20"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <path
          d="M 24 82 C 75 82, 85 50, 100 50 C 115 50, 125 18, 176 18"
          stroke={`url(#${uid}-contrastCurve)`}
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          className="tone-tracer"
          d="M 24 82 C 75 82, 85 50, 100 50 C 115 50, 125 18, 176 18"
          stroke="#F3E8FF"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <circle
          className="tone-node"
          cx="100"
          cy="50"
          r="3.6"
          fill="#0B0B0F"
          stroke="#2DD4BF"
          strokeWidth="2"
        />
        <defs>
          <linearGradient
            id={`${uid}-contrastCurve`}
            x1="24"
            y1="82"
            x2="176"
            y2="18"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#6D28D9" />
            <stop offset="50%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>
        </defs>
      </svg>
    </BannerShell>
  );
}

/** Saad’s final popup header art — PROPS & DECOR */
function PropsBanner({ chip, uid }: { chip: string; uid: string }) {
  return (
    <BannerShell category="PROPS & DECOR" chip={chip}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_62%,rgba(139,92,246,0.34),transparent_65%),radial-gradient(circle_at_76%_28%,rgba(251,191,36,0.22),transparent_55%)]" />
      <svg
        className="relative h-full w-full"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <style>{`
          @keyframes svgPrismHover { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
          @keyframes svgBokehFloat { 0%, 100% { transform: translate(0px, 0px); opacity: 0.55; } 50% { transform: translate(3px, -4px); opacity: 1; } }
          @keyframes svgPlinthGlow { 0%, 100% { opacity: 0.45; } 50% { opacity: 0.95; } }
          .prism-body { animation: svgPrismHover 4.4s ease-in-out infinite; transform-origin: 100px 44px; }
          .prism-bokeh { animation: svgBokehFloat 5s ease-in-out infinite; }
          .prism-plinth { animation: svgPlinthGlow 4.4s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) { .prism-body, .prism-bokeh, .prism-plinth { animation: none; } }
        `}</style>
        <ellipse
          className="prism-plinth"
          cx="100"
          cy="84"
          rx="54"
          ry="8"
          fill="rgba(139,92,246,0.18)"
          stroke="rgba(167,139,250,0.45)"
          strokeWidth="1"
        />
        <path
          d="M74 84 L80 69 H120 L126 84"
          fill="#0E0D16"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.2"
        />
        <g className="prism-body">
          <polygon
            points="100,19 124,47 100,65 76,47"
            fill={`url(#${uid}-propsPrismFill)`}
            stroke={`url(#${uid}-propsPrismStroke)`}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <line
            x1="100"
            y1="19"
            x2="100"
            y2="65"
            stroke="rgba(233,213,255,0.65)"
            strokeWidth="1.1"
          />
          <line
            x1="76"
            y1="47"
            x2="124"
            y2="47"
            stroke="rgba(251,191,36,0.55)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        </g>
        <circle
          className="prism-bokeh"
          cx="54"
          cy="34"
          r="3"
          stroke="#FBBF24"
          strokeWidth="1.2"
        />
        <circle
          className="prism-bokeh"
          style={delay("1.5s")}
          cx="148"
          cy="30"
          r="2.2"
          fill="#2DD4BF"
        />
        <circle
          className="prism-bokeh"
          style={delay("2.4s")}
          cx="142"
          cy="60"
          r="1.6"
          fill="#E9D5FF"
        />
        <defs>
          <linearGradient
            id={`${uid}-propsPrismFill`}
            x1="76"
            y1="19"
            x2="124"
            y2="65"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.78" />
          </linearGradient>
          <linearGradient
            id={`${uid}-propsPrismStroke`}
            x1="76"
            y1="19"
            x2="124"
            y2="65"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="55%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
        </defs>
      </svg>
    </BannerShell>
  );
}

/** Saad’s final popup header art — OUTFIT */
function OutfitBanner({ chip, uid }: { chip: string; uid: string }) {
  return (
    <BannerShell category="OUTFIT" chip={chip}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(139,92,246,0.32),transparent_68%)]" />
      <svg
        className="relative h-full w-full"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <style>{`
          @keyframes svgSilkSheen { 0% { stroke-dashoffset: 160; opacity: 0.35; } 50% { opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 0.35; } }
          @keyframes svgSilkWave { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(3px); } }
          .outfit-sheen { stroke-dasharray: 45 115; animation: svgSilkSheen 4.2s ease-in-out infinite; }
          .outfit-wave { animation: svgSilkWave 5s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) { .outfit-sheen, .outfit-wave { animation: none; } }
        `}</style>
        <path
          d="M52 94 C 54 66, 66 48, 84 42 L 100 72 L 116 42 C 134 48, 146 66, 148 94 Z"
          fill="#0D0C14"
          stroke={`url(#${uid}-outfitLapelGrad)`}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          className="outfit-sheen"
          d="M52 94 C 54 66, 66 48, 84 42 L 100 72 L 116 42 C 134 48, 146 66, 148 94"
          stroke="#F3E8FF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          className="outfit-wave"
          d="M84 42 L 77 56 L 91 64 L 100 72"
          stroke="#C084FC"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="outfit-wave"
          d="M116 42 L 123 56 L 109 64 L 100 72"
          stroke="#C084FC"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M88 30 H112 L115 43 L100 68 L85 43 Z"
          fill="#161424"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.2"
        />
        <circle cx="100" cy="80" r="2" fill="#2DD4BF" />
        <circle cx="100" cy="88" r="2" fill="#A78BFA" opacity="0.75" />
        <defs>
          <linearGradient
            id={`${uid}-outfitLapelGrad`}
            x1="52"
            y1="42"
            x2="148"
            y2="94"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="50%" stopColor="#E9D5FF" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>
        </defs>
      </svg>
    </BannerShell>
  );
}

/** Saad’s final popup header art — POSE & FRAMING */
function PoseBanner({ chip, uid }: { chip: string; uid: string }) {
  return (
    <BannerShell category="POSE & FRAMING" chip={chip}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.18),transparent_65%)]" />
      <svg
        className="relative h-full w-full"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <style>{`
          @keyframes svgBracketBreathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(0.95); } }
          @keyframes svgFocusDot { 0%, 100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.45); opacity: 1; } }
          @keyframes svgSubjectShift { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(2px, -2px); } }
          .pose-brackets { animation: svgBracketBreathe 4.2s ease-in-out infinite; transform-origin: 100px 50px; }
          .pose-dot { animation: svgFocusDot 2.8s ease-in-out infinite; transform-origin: 124px 38px; }
          .pose-subject { animation: svgSubjectShift 4.8s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) { .pose-brackets, .pose-dot, .pose-subject { animation: none; } }
        `}</style>
        <line x1="76" y1="14" x2="76" y2="86" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="124" y1="14" x2="124" y2="86" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="36" y1="38" x2="164" y2="38" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="36" y1="62" x2="164" y2="62" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <g className="pose-brackets">
          <path
            d="M44 28 V16 H58"
            stroke="#A78BFA"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M156 28 V16 H142"
            stroke="#A78BFA"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M44 72 V84 H58"
            stroke="#2DD4BF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M156 72 V84 H142"
            stroke="#2DD4BF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g className="pose-subject">
          <circle
            cx="100"
            cy="44"
            r="13"
            stroke={`url(#${uid}-poseRingGrad)`}
            strokeWidth="1.6"
          />
          <path
            d="M76 82 C 78 67, 88 61, 100 61 C 112 61, 122 67, 124 82"
            stroke={`url(#${uid}-poseRingGrad)`}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>
        <circle className="pose-dot" cx="124" cy="38" r="2.5" fill="#2DD4BF" />
        <defs>
          <linearGradient
            id={`${uid}-poseRingGrad`}
            x1="76"
            y1="31"
            x2="124"
            y2="82"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>
        </defs>
      </svg>
    </BannerShell>
  );
}

/** Saad’s final popup header art — ART STYLE */
function ArtStyleBanner({ chip, uid }: { chip: string; uid: string }) {
  return (
    <BannerShell category="ART STYLE" chip={chip}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_40%,rgba(124,58,237,0.38),transparent_62%),radial-gradient(circle_at_72%_65%,rgba(45,212,191,0.24),transparent_58%)]" />
      <svg
        className="relative h-full w-full"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <style>{`
          @keyframes svgBrushGlide1 { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(4px, -3px); } }
          @keyframes svgBrushGlide2 { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(-4px, 3px); } }
          @keyframes svgFacetTilt { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(8deg); } }
          .art-stroke-1 { animation: svgBrushGlide1 5.2s ease-in-out infinite; }
          .art-stroke-2 { animation: svgBrushGlide2 6s ease-in-out infinite; }
          .art-facet { animation: svgFacetTilt 4.6s ease-in-out infinite; transform-origin: 148px 70px; }
          @media (prefers-reduced-motion: reduce) { .art-stroke-1, .art-stroke-2, .art-facet { animation: none; } }
        `}</style>
        <path
          className="art-stroke-1"
          d="M28 68 C 56 26, 94 82, 128 34 C 146 12, 164 42, 174 28"
          stroke={`url(#${uid}-artBrush1)`}
          strokeWidth="13"
          strokeLinecap="round"
          opacity="0.88"
        />
        <path
          className="art-stroke-2"
          d="M36 44 C 72 66, 108 18, 166 58"
          stroke={`url(#${uid}-artBrush2)`}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.92"
        />
        <polygon
          className="art-facet"
          points="144,58 162,72 140,80"
          fill="rgba(167,139,250,0.25)"
          stroke="#E9D5FF"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <circle cx="58" cy="28" r="2" fill="#FBBF24" />
        <circle cx="118" cy="74" r="2.2" fill="#2DD4BF" />
        <defs>
          <linearGradient
            id={`${uid}-artBrush1`}
            x1="28"
            y1="68"
            x2="174"
            y2="28"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#6D28D9" />
            <stop offset="50%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>
          <linearGradient
            id={`${uid}-artBrush2`}
            x1="36"
            y1="44"
            x2="166"
            y2="58"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F3E8FF" />
          </linearGradient>
        </defs>
      </svg>
    </BannerShell>
  );
}

/** Saad’s final popup header art — JEWELLERY & ACCESSORIES */
function JewelleryBanner({ chip, uid }: { chip: string; uid: string }) {
  return (
    <BannerShell category="JEWELLERY & ACCESSORIES" chip={chip}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(251,191,36,0.24),transparent_62%),radial-gradient(circle_at_35%_30%,rgba(139,92,246,0.28),transparent_60%)]" />
      <svg
        className="relative h-full w-full"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <style>{`
          @keyframes svgPendantSway { 0%, 100% { transform: rotate(-2.5deg); } 50% { transform: rotate(2.5deg); } }
          @keyframes svgStarTwinkle { 0%, 100% { transform: scale(0.75) rotate(0deg); opacity: 0.55; } 50% { transform: scale(1.25) rotate(22deg); opacity: 1; } }
          .jewel-pendulum { animation: svgPendantSway 4.6s ease-in-out infinite; transform-origin: 100px 26px; }
          .jewel-glint { animation: svgStarTwinkle 3.2s ease-in-out infinite; transform-origin: 115px 51px; }
          @media (prefers-reduced-motion: reduce) { .jewel-pendulum, .jewel-glint { animation: none; } }
        `}</style>
        <path
          d="M54 16 C 68 52, 132 52, 146 16"
          stroke={`url(#${uid}-jewelChainGrad)`}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="3 2"
        />
        <path
          d="M64 16 C 76 44, 124 44, 136 16"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
        />
        <g className="jewel-pendulum">
          <polygon
            points="100,44 113,60 100,78 87,60"
            fill={`url(#${uid}-jewelGemFill)`}
            stroke={`url(#${uid}-jewelGemStroke)`}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <polygon
            points="100,50 107,60 100,71 93,60"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1"
          />
          <path
            className="jewel-glint"
            d="M115 44 L117 49 L122 51 L117 53 L115 58 L113 53 L108 51 L113 49 Z"
            fill="#FFFBEB"
          />
        </g>
        <defs>
          <linearGradient
            id={`${uid}-jewelChainGrad`}
            x1="54"
            y1="16"
            x2="146"
            y2="16"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
          <linearGradient
            id={`${uid}-jewelGemFill`}
            x1="87"
            y1="44"
            x2="113"
            y2="78"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#C084FC" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient
            id={`${uid}-jewelGemStroke`}
            x1="87"
            y1="44"
            x2="113"
            y2="78"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
      </svg>
    </BannerShell>
  );
}

/** Saad’s final popup header art — LAYOUT */
function LayoutBanner({ chip, uid }: { chip: string; uid: string }) {
  return (
    <BannerShell category="LAYOUT" chip={chip}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_50%,rgba(139,92,246,0.28),transparent_65%)]" />
      <svg
        className="relative h-full w-full"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <style>{`
          @keyframes svgPanelFloatA { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-2.5px); } }
          @keyframes svgPanelFloatB { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(2.5px); } }
          .layout-card-main { animation: svgPanelFloatA 4.8s ease-in-out infinite; }
          .layout-card-side { animation: svgPanelFloatB 4.8s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) { .layout-card-main, .layout-card-side { animation: none; } }
        `}</style>
        <g className="layout-card-main">
          <rect
            x="42"
            y="16"
            width="64"
            height="68"
            rx="6"
            fill="#100F1A"
            stroke={`url(#${uid}-layoutFrameGrad)`}
            strokeWidth="1.8"
          />
          <line
            x1="52"
            y1="66"
            x2="84"
            y2="66"
            stroke="#A78BFA"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="52"
            y1="73"
            x2="72"
            y2="73"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>
        <g className="layout-card-side">
          <rect
            x="114"
            y="16"
            width="44"
            height="31"
            rx="5"
            fill="#0D0C14"
            stroke="rgba(255,255,255,0.24)"
            strokeWidth="1.4"
          />
          <circle cx="136" cy="31.5" r="6" stroke="#2DD4BF" strokeWidth="1.4" />
          <rect
            x="114"
            y="53"
            width="44"
            height="31"
            rx="5"
            fill="#0D0C14"
            stroke="rgba(167,139,250,0.45)"
            strokeWidth="1.4"
          />
          <path
            d="M123 73 L132 64 L139 70 L145 65 L150 73"
            stroke="#C084FC"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <linearGradient
            id={`${uid}-layoutFrameGrad`}
            x1="42"
            y1="16"
            x2="106"
            y2="84"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
    </BannerShell>
  );
}

/** Saad’s final popup header art — PEOPLE */
function PeopleBanner({ chip, uid }: { chip: string; uid: string }) {
  return (
    <BannerShell category="PEOPLE" chip={chip}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_48%,rgba(139,92,246,0.34),transparent_60%),radial-gradient(circle_at_64%_48%,rgba(45,212,191,0.24),transparent_60%)]" />
      <svg
        className="relative h-full w-full"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <style>{`
          @keyframes svgPersonBack { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(2.5px); } }
          @keyframes svgPersonFront { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(-2.5px); } }
          @keyframes svgHaloPulse { 0%, 100% { opacity: 0.35; transform: scale(0.97); } 50% { opacity: 0.85; transform: scale(1.03); } }
          .people-back { animation: svgPersonBack 5s ease-in-out infinite; }
          .people-front { animation: svgPersonFront 5s ease-in-out infinite; }
          .people-halo { animation: svgHaloPulse 4.4s ease-in-out infinite; transform-origin: 102px 52px; }
          @media (prefers-reduced-motion: reduce) { .people-back, .people-front, .people-halo { animation: none; } }
        `}</style>
        <ellipse
          className="people-halo"
          cx="102"
          cy="52"
          rx="54"
          ry="34"
          stroke="rgba(167,139,250,0.3)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <g className="people-back">
          <circle
            cx="122"
            cy="36"
            r="11"
            fill="#0B0B12"
            stroke="#2DD4BF"
            strokeWidth="1.8"
          />
          <path
            d="M102 82 C 103 65, 111 57, 122 57 C 133 57, 141 65, 142 82 Z"
            fill="#0B0B12"
            stroke="#2DD4BF"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </g>
        <g className="people-front">
          <circle
            cx="82"
            cy="33"
            r="12.5"
            fill="#0E0D16"
            stroke={`url(#${uid}-peoplePrimaryGrad)`}
            strokeWidth="2"
          />
          <path
            d="M58 84 C 60 64, 69 55, 82 55 C 95 55, 104 64, 106 84 Z"
            fill="#0E0D16"
            stroke={`url(#${uid}-peoplePrimaryGrad)`}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <linearGradient
            id={`${uid}-peoplePrimaryGrad`}
            x1="58"
            y1="21"
            x2="106"
            y2="84"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
    </BannerShell>
  );
}

/** Saad’s final popup header art — HAIR & MAKEUP */
function HairBanner({ chip, uid }: { chip: string; uid: string }) {
  return (
    <BannerShell category="HAIR & MAKEUP" chip={chip}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_45%,rgba(192,132,252,0.34),transparent_62%),radial-gradient(circle_at_70%_35%,rgba(251,191,36,0.2),transparent_55%)]" />
      <svg
        className="relative h-full w-full"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <style>{`
          @keyframes svgHairSway1 { 0%, 100% { transform: translate(0px, 0px) skewX(0deg); } 50% { transform: translate(3px, -2px) skewX(-1.5deg); } }
          @keyframes svgHairSway2 { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(-2.5px, 2px); } }
          @keyframes svgMakeupSparkle { 0%, 100% { transform: scale(0.75) rotate(0deg); opacity: 0.6; } 50% { transform: scale(1.25) rotate(20deg); opacity: 1; } }
          .hair-strand-1 { animation: svgHairSway1 4.8s ease-in-out infinite; transform-origin: 100px 50px; }
          .hair-strand-2 { animation: svgHairSway2 5.4s ease-in-out infinite; }
          .hair-sparkle { animation: svgMakeupSparkle 3.4s ease-in-out infinite; transform-origin: 148px 31px; }
          @media (prefers-reduced-motion: reduce) { .hair-strand-1, .hair-strand-2, .hair-sparkle { animation: none; } }
        `}</style>
        <path
          className="hair-strand-1"
          d="M56 78 C 58 42, 82 20, 118 22 C 134 23, 146 34, 142 50 C 138 64, 118 62, 114 78"
          stroke={`url(#${uid}-hairWaveGrad1)`}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="hair-strand-2"
          d="M68 82 C 70 50, 90 32, 120 34 C 132 35, 136 46, 128 56 C 120 66, 104 68, 102 82"
          stroke={`url(#${uid}-hairWaveGrad2)`}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          className="hair-strand-1"
          d="M80 84 C 82 58, 98 44, 118 46"
          stroke="rgba(255,255,255,0.48)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          className="hair-sparkle"
          d="M148 24 L150 29 L155 31 L150 33 L148 38 L146 33 L141 31 L146 29 Z"
          fill="#FDE68A"
        />
        <circle cx="64" cy="30" r="1.8" fill="#2DD4BF" />
        <defs>
          <linearGradient
            id={`${uid}-hairWaveGrad1`}
            x1="56"
            y1="78"
            x2="142"
            y2="22"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#E879F9" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
          <linearGradient
            id={`${uid}-hairWaveGrad2`}
            x1="68"
            y1="82"
            x2="136"
            y2="34"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#F3E8FF" />
          </linearGradient>
        </defs>
      </svg>
    </BannerShell>
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
      return <OutfitBanner chip={chip} uid={uid} />;
    case "JEWELLERY & ACCESSORIES":
      return <JewelleryBanner chip={chip} uid={uid} />;
    case "POSE & FRAMING":
      return <PoseBanner chip={chip} uid={uid} />;
    case "LAYOUT":
      return <LayoutBanner chip={chip} uid={uid} />;
    case "PROPS & DECOR":
      return <PropsBanner chip={chip} uid={uid} />;
    case "ART STYLE":
      return <ArtStyleBanner chip={chip} uid={uid} />;
    case "HAIR & MAKEUP":
      return <HairBanner chip={chip} uid={uid} />;
    case "PEOPLE":
      return <PeopleBanner chip={chip} uid={uid} />;
    default:
      return <PropsBanner chip={chip} uid={uid} />;
  }
}
