"use client";

import { useRef, type MouseEvent, type PointerEvent } from "react";
import {
  DEFAULT_IMAGE_FOCUS,
  type ImageFocus,
} from "@/lib/catalog/image-focus";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  label: string;
  focus: ImageFocus | null;
  onChange: (focus: ImageFocus) => void;
  className?: string;
};

/**
 * Click (or drag) on the preview to set cover-crop focus.
 * Marker shows the current object-position anchor.
 */
export function ImageFocusPicker({
  src,
  label,
  focus,
  onChange,
  className,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const point = focus ?? DEFAULT_IMAGE_FOCUS;

  function setFromClient(clientX: number, clientY: number) {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const x = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100));
    onChange({
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
    });
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromClient(event.clientX, event.clientY);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    setFromClient(event.clientX, event.clientY);
  }

  function onClick(event: MouseEvent<HTMLDivElement>) {
    setFromClient(event.clientX, event.clientY);
  }

  if (!src) {
    return (
      <p className="m-0 text-[12px] text-[var(--muted)]">
        Add an image URL to set {label} focus.
      </p>
    );
  }

  return (
    <div className={cn("grid gap-1.5", className)}>
      <p className="m-0 text-[11px] font-bold text-[#cbc9d2]">
        {label} focus — click to set ({point.x.toFixed(0)}%, {point.y.toFixed(0)}%)
      </p>
      <div
        ref={frameRef}
        role="button"
        tabIndex={0}
        aria-label={`Set ${label} crop focus`}
        className="relative aspect-[4/5] max-h-[220px] w-full max-w-[160px] cursor-crosshair overflow-hidden rounded-[10px] border border-[var(--line)] bg-[#101016] select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onClick={onClick}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          onChange({ ...DEFAULT_IMAGE_FOCUS });
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- admin preview; arbitrary HTTPS URLs */}
        <img
          src={src}
          alt=""
          draggable={false}
          className="pointer-events-none h-full w-full object-cover"
          style={{ objectPosition: `${point.x}% ${point.y}%` }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[rgba(255,155,130,0.85)] shadow-[0_0_0_1px_rgba(0,0,0,0.45)]"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
        />
      </div>
    </div>
  );
}
