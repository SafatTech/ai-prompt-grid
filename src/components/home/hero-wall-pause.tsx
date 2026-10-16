"use client";

import { useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "apg:hero-wall-paused";

type Props = {
  heroSelector?: string;
};

function subscribePaused(onStoreChange: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY || event.key === null) onStoreChange();
  }
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}

function readPaused(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function HeroWallPause({ heroSelector = "[data-hero-wall]" }: Props) {
  const paused = useSyncExternalStore(subscribePaused, readPaused, () => false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(heroSelector);
    if (!hero) return;

    hero.classList.toggle("paused", paused);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (!entry.isIntersecting) {
          hero.classList.add("paused");
        } else if (!paused) {
          hero.classList.remove("paused");
        }
      },
      { threshold: 0.05 },
    );
    io.observe(hero);

    function onVisibility() {
      const el = document.querySelector<HTMLElement>(heroSelector);
      if (!el) return;
      if (document.hidden) {
        el.classList.add("paused");
      } else if (!paused) {
        el.classList.remove("paused");
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [heroSelector, paused]);

  function toggle() {
    const next = !paused;
    try {
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {
      // ignore
    }
    const hero = document.querySelector<HTMLElement>(heroSelector);
    hero?.classList.toggle("paused", next);
    // Notify this tab's useSyncExternalStore subscribers.
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }

  return (
    <button
      type="button"
      className="hero-wall-pause"
      aria-pressed={paused}
      aria-label={paused ? "Play background animation" : "Pause background animation"}
      onClick={toggle}
    >
      {paused ? "▶ Play" : "❚❚ Pause"}
    </button>
  );
}
