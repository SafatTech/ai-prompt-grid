"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HowReveal({
  children,
  className = "",
  delayMs = 0,
  variant = "up",
  mode = "mount",
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  variant?: "up" | "scale";
  mode?: "mount" | "scroll";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // CSS already forces full opacity under prefers-reduced-motion.
    if (prefersReducedMotion()) return;

    if (mode === "mount") {
      const timer = window.setTimeout(() => setVisible(true), 40);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mode]);

  return (
    <div
      ref={ref}
      className={`hiw-reveal hiw-reveal--${variant} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
