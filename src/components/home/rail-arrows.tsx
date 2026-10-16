"use client";

import { useEffect, useState } from "react";

type Props = {
  railId: string;
};

export function RailArrows({ railId }: Props) {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const rail = document.getElementById(railId);
    if (!rail) return;

    function update() {
      if (!rail) return;
      setAtStart(rail.scrollLeft < 4);
      setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4);
    }

    update();
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [railId]);

  function scrollByDir(dir: -1 | 1) {
    const rail = document.getElementById(railId);
    if (!rail) return;
    rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <span className="home-rail-arrows">
      <button
        type="button"
        aria-label="Scroll left"
        disabled={atStart}
        onClick={() => scrollByDir(-1)}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        disabled={atEnd}
        onClick={() => scrollByDir(1)}
      >
        ›
      </button>
    </span>
  );
}
