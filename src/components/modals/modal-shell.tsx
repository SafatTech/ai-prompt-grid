"use client";

import { useEffect, useId, useRef, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  wide?: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
};

export function ModalShell({ title, description, wide, onClose, children, label }: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const focusable = panelRef.current?.querySelector<HTMLElement>(
      "button, input, select, textarea, a[href]",
    );
    focusable?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = [
        ...panelRef.current.querySelectorAll<HTMLElement>(
          "button, input, select, textarea, a[href], [tabindex]:not([tabindex='-1'])",
        ),
      ].filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-[rgba(4,4,8,0.78)] p-5 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        aria-labelledby={titleId}
        className={cn(
          "max-h-[calc(100dvh-40px)] w-[min(520px,100%)] overflow-y-auto rounded-[22px] border border-[var(--line-strong)] bg-[#181821] p-[26px] shadow-[var(--shadow)]",
          wide && "w-[min(700px,100%)]",
        )}
      >
        <div className="mb-5 flex items-start justify-between gap-5">
          <div>
            <h2 id={titleId} className="m-0 mb-1 text-[25px] tracking-[-0.025em]">
              {title}
            </h2>
            {description ? (
              <p className="m-0 max-w-[500px] text-[13px] text-[var(--muted)]">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            className="grid h-[38px] w-[38px] shrink-0 cursor-pointer place-items-center rounded-xl border border-[var(--line)] bg-[rgba(21,21,30,0.92)] text-[19px]"
            aria-label="Close dialog"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function preventSubmit(handler: (event: FormEvent) => void) {
  return (event: FormEvent) => {
    event.preventDefault();
    handler(event);
  };
}
