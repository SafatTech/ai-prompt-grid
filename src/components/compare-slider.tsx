"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Props = {
  source: string;
  result: string;
  title: string;
  large?: boolean;
  styleId?: string;
  className?: string;
  showModeToggle?: boolean;
};

export function CompareSlider({
  source,
  result,
  title,
  large = false,
  styleId,
  className,
  showModeToggle = false,
}: Props) {
  const [value, setValue] = useState(50);
  const [mode, setMode] = useState<"slider" | "side">("slider");

  function onInteract() {
    if (styleId) {
      track("comparison_interaction", {
        style_id: styleId,
        surface: large ? "detail" : "card",
      });
    }
  }

  if (mode === "side") {
    return (
      <div className={cn("relative h-full w-full", className)}>
        {showModeToggle ? (
          <ModeToggle mode={mode} onChange={setMode} />
        ) : null}
        <div className="grid h-full grid-cols-2 gap-0.5">
          <div className="relative min-h-0 bg-[linear-gradient(135deg,#292836,#15151e)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={source}
              alt={`Source photo for ${title}`}
              className="h-full w-full object-cover"
              loading={large ? "eager" : "lazy"}
            />
            <span className="absolute bottom-3 left-3 rounded-lg bg-[rgba(11,11,16,0.72)] px-2 py-1 text-[10px] font-extrabold backdrop-blur-sm">
              Source photo
            </span>
          </div>
          <div className="relative min-h-0 bg-[linear-gradient(135deg,#292836,#15151e)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result}
              alt={`AI result showing ${title}`}
              className="h-full w-full object-cover"
              loading={large ? "eager" : "lazy"}
            />
            <span className="absolute right-3 bottom-3 rounded-lg bg-[rgba(11,11,16,0.72)] px-2 py-1 text-[10px] font-extrabold backdrop-blur-sm">
              AI result
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("compare relative h-full w-full overflow-hidden touch-pan-y", className)}
      data-compare
    >
      {showModeToggle ? <ModeToggle mode={mode} onChange={setMode} /> : null}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#292836,#15151e)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={source}
          alt={`Source photo for ${title}`}
          className="h-full w-full object-cover"
          loading={large ? "eager" : "lazy"}
        />
      </div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${value}%)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={result}
          alt={`AI result showing ${title}`}
          className="h-full w-full object-cover"
          loading={large ? "eager" : "lazy"}
        />
      </div>
      <span className="absolute bottom-3 left-3 rounded-lg bg-[rgba(11,11,16,0.72)] px-2 py-1 text-[10px] font-extrabold text-[var(--text)] backdrop-blur-sm">
        Source photo
      </span>
      <span className="absolute right-3 bottom-3 rounded-lg bg-[rgba(11,11,16,0.72)] px-2 py-1 text-[10px] font-extrabold text-[var(--text)] backdrop-blur-sm">
        AI result
      </span>
      <span
        className="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-[rgba(245,243,238,0.92)] shadow-[0_0_0_1px_rgba(0,0,0,0.18)]"
        style={{ left: `${value}%`, transform: "translateX(-1px)" }}
      />
      <span
        className="pointer-events-none absolute top-1/2 grid h-[38px] w-[38px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--text)] text-xs font-black text-[#17151e] shadow-[0_8px_22px_rgba(0,0,0,0.32)]"
        style={{ left: `${value}%` }}
      >
        ↔
      </span>
      <label className="sr-only">Move to compare source photo and AI result</label>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        aria-label="Compare source photo and AI result"
        className="absolute inset-0 m-0 h-full w-full cursor-ew-resize opacity-0"
        onChange={(event) => {
          setValue(Number(event.target.value));
          onInteract();
        }}
      />
    </div>
  );
}

function ModeToggle({
  mode,
  onChange,
}: {
  mode: "slider" | "side";
  onChange: (mode: "slider" | "side") => void;
}) {
  return (
    <div className="absolute top-3 left-3 z-10 flex overflow-hidden rounded-lg border border-[rgba(255,255,255,0.18)] bg-[rgba(11,11,16,0.75)] text-[11px] font-bold backdrop-blur-sm">
      <button
        type="button"
        className={cn(
          "cursor-pointer border-0 px-2.5 py-1.5",
          mode === "slider" ? "bg-[rgba(139,108,255,0.35)] text-[var(--text)]" : "bg-transparent text-[var(--muted)]",
        )}
        onClick={() => onChange("slider")}
      >
        Slider
      </button>
      <button
        type="button"
        className={cn(
          "cursor-pointer border-0 px-2.5 py-1.5",
          mode === "side" ? "bg-[rgba(139,108,255,0.35)] text-[var(--text)]" : "bg-transparent text-[var(--muted)]",
        )}
        onClick={() => onChange("side")}
        data-testid="compare-side-by-side"
      >
        Side by side
      </button>
    </div>
  );
}
