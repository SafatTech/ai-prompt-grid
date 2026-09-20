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

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed right-5 bottom-5 z-[100] grid w-[min(390px,calc(100%-40px))] gap-2.5"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            className={cn(
              "rounded-[13px] border border-[var(--line-strong)] bg-[#24232f] px-4 py-3.5 text-[13px] text-[var(--text)] shadow-[var(--shadow)]",
              item.type === "success" && "border-l-[3px] border-l-[var(--mint)]",
              item.type === "error" && "border-l-[3px] border-l-[var(--danger)]",
            )}
          >
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
