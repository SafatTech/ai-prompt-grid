"use client";

import { useRef, useState, type PointerEvent } from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type CompareMode = "slider" | "side";

type Props = {
  source: string;
  result: string;
  title: string;
  large?: boolean;
  styleId?: string;
  className?: string;
  showModeToggle?: boolean;
  /** Defaults to slider. Style detail passes "side" so the full frame is visible. */
  defaultMode?: CompareMode;
};

type ActiveDrag =
  | { type: "slider"; pointerId: number }
  | {
      type: "pan";
      pointerId: number;
      startX: number;
      startY: number;
      originX: number;
      originY: number;
    };

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Half-width of the compare-handle hit zone, in CSS pixels. */
const HANDLE_HIT_PX = 28;

export function CompareSlider({
  source,
  result,
  title,
  large = false,
  styleId,
  className,
  showModeToggle = false,
  defaultMode = "slider",
}: Props) {
  const [value, setValue] = useState(50);
  const [mode, setMode] = useState<CompareMode>(defaultMode);
  const [pan, setPan] = useState({ x: 50, y: 50 });
  const [panning, setPanning] = useState(false);
  const [sliding, setSliding] = useState(false);
  const [overHandle, setOverHandle] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeDrag = useRef<ActiveDrag | null>(null);

  /** Image pan is only for the detail-page slider (where cover crop is noticeable). */
  const allowPan = showModeToggle;
  const objectPosition = allowPan ? `${pan.x}% ${pan.y}%` : undefined;

  function onInteract() {
    if (styleId) {
      track("comparison_interaction", {
        style_id: styleId,
        surface: large ? "detail" : "card",
      });
    }
  }

  function valueFromClientX(clientX: number) {
    const el = containerRef.current;
    if (!el) return value;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return value;
    return clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
  }

  function isNearHandle(clientX: number) {
    const el = containerRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const handleX = rect.left + (value / 100) * rect.width;
    return Math.abs(clientX - handleX) <= HANDLE_HIT_PX;
  }

  function updateHoverCursor(clientX: number) {
    if (!allowPan || activeDrag.current) return;
    setOverHandle(isNearHandle(clientX));
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    const el = containerRef.current;
    if (!el) return;

    const nearHandle = isNearHandle(event.clientX);

    // Detail page: drag near the handle to compare; drag elsewhere to pan.
    // Cards (no pan): any drag compares.
    if (!allowPan || nearHandle) {
      activeDrag.current = { type: "slider", pointerId: event.pointerId };
      setSliding(true);
      setOverHandle(true);
      setValue(valueFromClientX(event.clientX));
      onInteract();
    } else {
      activeDrag.current = {
        type: "pan",
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originX: pan.x,
        originY: pan.y,
      };
      setPanning(true);
      setOverHandle(false);
    }

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const drag = activeDrag.current;

    if (!drag) {
      updateHoverCursor(event.clientX);
      return;
    }

    if (drag.pointerId !== event.pointerId) return;

    if (drag.type === "slider") {
      setValue(valueFromClientX(event.clientX));
      onInteract();
      return;
    }

    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dx = ((event.clientX - drag.startX) / rect.width) * 100;
    const dy = ((event.clientY - drag.startY) / rect.height) * 100;
    // Dragging the image right reveals the left crop (object-position moves opposite).
    setPan({
      x: clamp(drag.originX - dx, 0, 100),
      y: clamp(drag.originY - dy, 0, 100),
    });
    onInteract();
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const drag = activeDrag.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    activeDrag.current = null;
    setPanning(false);
    setSliding(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    updateHoverCursor(event.clientX);
  }

  const cursorClass = sliding
    ? "cursor-ew-resize"
    : panning
      ? "cursor-grabbing"
      : allowPan
        ? overHandle
          ? "cursor-ew-resize"
          : "cursor-grab"
        : "cursor-ew-resize";

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
              draggable={false}
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
              draggable={false}
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
      ref={containerRef}
      className={cn(
        "compare relative h-full w-full overflow-hidden touch-none select-none",
        cursorClass,
        className,
      )}
      data-compare
      onDragStart={(event) => event.preventDefault()}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={() => {
        if (!activeDrag.current) setOverHandle(false);
      }}
    >
      {showModeToggle ? <ModeToggle mode={mode} onChange={setMode} /> : null}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#292836,#15151e)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={source}
          alt={`Source photo for ${title}`}
          className="pointer-events-none h-full w-full object-cover"
          style={objectPosition ? { objectPosition } : undefined}
          loading={large ? "eager" : "lazy"}
          draggable={false}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${value}%)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={result}
          alt={`AI result showing ${title}`}
          className="pointer-events-none h-full w-full object-cover"
          style={objectPosition ? { objectPosition } : undefined}
          loading={large ? "eager" : "lazy"}
          draggable={false}
        />
      </div>
      <span className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-[rgba(11,11,16,0.72)] px-2 py-1 text-[10px] font-extrabold text-[var(--text)] backdrop-blur-sm">
        Source photo
      </span>
      <span className="pointer-events-none absolute right-3 bottom-3 rounded-lg bg-[rgba(11,11,16,0.72)] px-2 py-1 text-[10px] font-extrabold text-[var(--text)] backdrop-blur-sm">
        AI result
      </span>
      <span
        className="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-[rgba(245,243,238,0.92)] shadow-[0_0_0_1px_rgba(0,0,0,0.18)]"
        style={{ left: `${value}%`, transform: "translateX(-1px)" }}
      />
      <span
        className="pointer-events-none absolute top-1/2 grid h-[38px] w-[38px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--text)] text-xs font-black text-[#17151e] shadow-[0_8px_22px_rgba(0,0,0,0.32)]"
        style={{ left: `${value}%` }}
        aria-hidden
      >
        ↔
      </span>
      <label className="sr-only" htmlFor={`compare-range-${styleId ?? "card"}`}>
        Move to compare source photo and AI result
      </label>
      <input
        id={`compare-range-${styleId ?? "card"}`}
        type="range"
        min={0}
        max={100}
        value={value}
        aria-label="Compare source photo and AI result"
        className="sr-only"
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
  mode: CompareMode;
  onChange: (mode: CompareMode) => void;
}) {
  return (
    <div className="absolute top-3 left-3 z-10 flex overflow-hidden rounded-lg border border-[rgba(255,255,255,0.18)] bg-[rgba(11,11,16,0.75)] text-[11px] font-bold backdrop-blur-sm">
      <button
        type="button"
        className={cn(
          "cursor-pointer border-0 px-2.5 py-1.5",
          mode === "slider"
            ? "bg-[rgba(139,108,255,0.35)] text-[var(--text)]"
            : "bg-transparent text-[var(--muted)]",
        )}
        onClick={() => onChange("slider")}
      >
        Slider
      </button>
      <button
        type="button"
        className={cn(
          "cursor-pointer border-0 px-2.5 py-1.5",
          mode === "side"
            ? "bg-[rgba(139,108,255,0.35)] text-[var(--text)]"
            : "bg-transparent text-[var(--muted)]",
        )}
        onClick={() => onChange("side")}
        data-testid="compare-side-by-side"
      >
        Side by side
      </button>
    </div>
  );
}
