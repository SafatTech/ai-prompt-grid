"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Toast = { id: string; message: string; type: "success" | "error" };

type ToastContextValue = {
  toast: (message: string, type?: "success" | "error") => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_MS = 3800;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_MS);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-end gap-3 p-5 sm:p-6"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((item) => (
          <ToastItem key={item.id} item={item} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({
  item,
  onDismiss,
}: {
  item: Toast;
  onDismiss: (id: string) => void;
}) {
  const isError = item.type === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      className={cn(
        "toast-item pointer-events-auto relative flex w-[min(380px,calc(100vw-2.5rem))] items-start gap-3 overflow-hidden rounded-2xl border px-3.5 py-3.5 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl",
        isError
          ? "border-[rgba(255,124,142,0.28)] bg-[linear-gradient(160deg,rgba(48,22,28,0.94),rgba(24,16,22,0.92))]"
          : "border-[rgba(103,216,178,0.22)] bg-[linear-gradient(160deg,rgba(22,36,34,0.94),rgba(18,18,28,0.92))]",
      )}
    >
      <span
        className={cn(
          "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full",
          isError
            ? "bg-[rgba(255,124,142,0.16)] text-[var(--danger)]"
            : "bg-[rgba(103,216,178,0.16)] text-[var(--mint)]",
        )}
        aria-hidden
      >
        {isError ? <ErrorIcon /> : <SuccessIcon />}
      </span>

      <p className="m-0 min-w-0 flex-1 pt-1 text-[13.5px] leading-snug font-medium tracking-[-0.01em] text-[var(--text)]">
        {item.message}
      </p>

      <button
        type="button"
        className="mt-0.5 grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-lg border-0 bg-transparent text-[var(--muted)] transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-[var(--text)]"
        aria-label="Dismiss notification"
        onClick={() => onDismiss(item.id)}
      >
        <DismissIcon />
      </button>

      <span
        className={cn(
          "toast-progress absolute inset-x-0 bottom-0 h-[2px] origin-left",
          isError ? "bg-[var(--danger)]" : "bg-[var(--mint)]",
        )}
        aria-hidden
      />
    </div>
  );
}

function SuccessIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8.25 6.4 11.2 12.5 4.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4.2 4.2 11.8 11.8M11.8 4.2 4.2 11.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DismissIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3.5 3.5 10.5 10.5M10.5 3.5 3.5 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
