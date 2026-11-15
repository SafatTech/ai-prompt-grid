"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import type { ExploreHeroSlide } from "@/lib/catalog/explore-hero";

type Props = {
  slides: ExploreHeroSlide[];
  onFilter: (key: string) => void;
};

const INTERVAL_MS = 5000;

export function ExploreHero({ slides, onFilter }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const timerRef = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      if (!slides.length) return;
      setIndex(((next % slides.length) + slides.length) % slides.length);
      const bar = barRef.current;
      if (bar) {
        bar.classList.remove("run");
        void bar.offsetWidth;
        bar.classList.add("run");
      }
    },
    [slides.length],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (reduceMotion || paused || slides.length < 2) return;
    timerRef.current = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
      const bar = barRef.current;
      if (bar) {
        bar.classList.remove("run");
        void bar.offsetWidth;
        bar.classList.add("run");
      }
    }, INTERVAL_MS);
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [paused, reduceMotion, slides.length, index]);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || reduceMotion) return;
    bar.classList.remove("run");
    void bar.offsetWidth;
    bar.classList.add("run");
  }, [index, reduceMotion]);

  if (!slides.length) return null;

  function onHeroClick(event: MouseEvent<HTMLElement>) {
    const target = event.target as HTMLElement;
    const dot = target.closest<HTMLElement>(".hero-dot");
    if (dot?.dataset.i != null) {
      go(Number(dot.dataset.i));
      return;
    }
    const jump = target.closest<HTMLElement>(
      ".hero-cta, .hero-qchip, .float-tag[data-key]",
    );
    if (jump?.dataset.key) onFilter(jump.dataset.key);
  }

  return (
    <section
      className="hero"
      data-testid="explore-hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onClick={onHeroClick}
    >
      <div className="hero-slides">
        {slides.map((slide, slideIndex) => {
          const isOn = slideIndex === index;
          const pieceCount = slide.styles.length;
          const TitleTag = slideIndex === 0 ? "h1" : "p";
          return (
            <div
              key={slide.key}
              className={`hero-slide${isOn ? " is-on" : ""}`}
              data-i={slideIndex}
              data-key={slide.key}
              data-mood={slide.mood}
              aria-hidden={!isOn}
            >
              <div className="explore-hero-photo-layer">
                {/* Plain img so CSS blur/saturate apply to the full photo (next/image wrappers fight filters). */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="explore-hero-photo"
                  src={slide.bg}
                  alt=""
                  decoding="async"
                  loading={slideIndex === 0 ? "eager" : "lazy"}
                  fetchPriority={slideIndex === 0 ? "high" : "auto"}
                />
                <div className="hero-tint" />
                <div className="hero-scrim" />
                <div className="hero-grain" />
              </div>
              <div className="hero-inner">
                <div className="hero-tag-band hero-tag-band-top">
                  {slide.tags
                    .filter((tag) => tag.band !== "bottom")
                    .map((tag) => (
                      <HeroTag key={`${slide.key}-top-${tag.label}`} tag={tag} />
                    ))}
                </div>
                <div className="hero-copy">
                  <div className="hero-kicker">{slide.kicker}</div>
                  <TitleTag className="hero-title">{slide.key}</TitleTag>
                  <p className="hero-lede">{slide.lede}</p>
                  <p className="hero-stats">{slide.stats}</p>
                  <button
                    type="button"
                    className="hero-cta"
                    data-key={slide.key}
                  >
                    {slide.cta}
                  </button>
                  <div className="hero-quick">
                    {slide.quick.map((chip) => (
                      <button
                        key={`${slide.key}-q-${chip.key}`}
                        type="button"
                        className="hero-qchip"
                        data-key={chip.key}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div
                  className={`collage${pieceCount === 1 ? " is-one" : ""}`}
                  aria-hidden="true"
                >
                  {slide.styles.map((style, pieceIndex) => (
                    <figure key={style.id} className="piece">
                      <Image
                        className="piece-img"
                        src={style.result}
                        alt=""
                        fill
                        sizes="(max-width: 859px) 40vw, 18vw"
                        loading={slideIndex === 0 && pieceIndex < 3 ? "eager" : "lazy"}
                      />
                    </figure>
                  ))}
                </div>
                <div className="hero-tag-band hero-tag-band-bottom">
                  {slide.tags
                    .filter((tag) => tag.band === "bottom")
                    .map((tag) => (
                      <HeroTag
                        key={`${slide.key}-bottom-${tag.label}`}
                        tag={tag}
                      />
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        style={{ position: "absolute" }}
      >
        <filter id="explore-v5-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div className="hero-nav">
        {slides.map((slide, slideIndex) => (
          <button
            key={`dot-${slide.key}`}
            type="button"
            className={`hero-dot${slideIndex === index ? " is-on" : ""}`}
            data-i={slideIndex}
            aria-label={slide.key}
            aria-current={slideIndex === index ? "true" : undefined}
          />
        ))}
        <div className="hero-progress" aria-hidden="true">
          <i
            ref={barRef}
            className={`run${paused || reduceMotion ? " paused" : ""}`}
          />
        </div>
      </div>
    </section>
  );
}

function HeroTag({
  tag,
}: {
  tag: ExploreHeroSlide["tags"][number];
}) {
  const content = (
    <>
      {tag.icon ? <span className="ft-ico">{tag.icon}</span> : null}
      <span className="ft-label">
        {tag.hash ? <span className="ft-hash">#</span> : null}
        {tag.label}
      </span>
    </>
  );
  const className = `float-tag${tag.countish ? " is-count" : ""}`;
  if (tag.filter) {
    return (
      <button type="button" className={className} data-key={tag.filter}>
        {content}
      </button>
    );
  }
  return <span className={className}>{content}</span>;
}
