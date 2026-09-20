import Link from "next/link";
import { HeroArt } from "@/components/hero-art";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { StyleCard } from "@/components/style-card";
import { listPublishedStyles } from "@/lib/catalog/repository";
import { categories } from "@/lib/catalog/styles";

export default async function HomePage() {
  const trending = (await listPublishedStyles()).slice(0, 6);

  return (
    <div>
      <section className="hero">
        <div className="hero-bg" aria-hidden />
        <div className="container hero-inner">
          <div>
            <span className="inline-flex min-h-[30px] items-center rounded-[var(--pill)] border border-[rgba(139,108,255,0.23)] bg-[rgba(139,108,255,0.1)] px-[11px] text-xs font-extrabold tracking-[0.12em] text-[#c1b4ff] uppercase">
              Transform the photos you already love
            </span>
            <h1 className="mt-[22px] mb-5 max-w-[670px] text-[clamp(48px,6.25vw,88px)] leading-[0.95] font-bold tracking-[-0.065em] max-[860px]:max-w-[700px] max-[860px]:text-[clamp(48px,12vw,74px)] max-[640px]:text-[clamp(43px,13.2vw,63px)] max-[640px]:tracking-[-0.055em]">
              Find a look.{" "}
              <span className="font-semibold text-[var(--muted)]">Keep your story.</span>
            </h1>
            <p className="m-0 max-w-[610px] text-[clamp(16px,1.25vw,19px)] text-[#c3c1cb] max-[640px]:text-[15px]">
              Use tested prompts to turn your photos into cinematic portraits, paintings,
              avatars, and more.
            </p>
            <div className="mt-[30px] flex flex-wrap gap-[11px]">
              <Link
                href="/explore"
                data-testid="hero-explore"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--violet)] px-[18px] text-sm font-bold text-[#100d1a] hover:bg-[#9b82ff]"
              >
                Explore styles
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-[18px] text-sm font-bold text-[var(--text)] hover:border-[var(--line-strong)] hover:bg-[#272636]"
              >
                How it works
              </Link>
            </div>
          </div>
          <HeroArt />
        </div>
      </section>

      <section className="container py-[88px]">
        <div className="mb-7 flex items-end justify-between gap-5">
          <h2 className="m-0 text-[clamp(28px,3vw,42px)] tracking-[-0.035em]">
            Trending transformations
          </h2>
          <Link href="/explore" className="py-1.5 font-bold text-[#bbaeff] hover:text-[var(--text)]">
            View all styles →
          </Link>
        </div>
        <div className="grid grid-cols-1 items-start gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((style) => (
            <StyleCard key={style.id} style={style} compact stagger />
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="mb-[30px] max-w-[760px]">
          <h2 className="m-0 mb-2.5 text-[clamp(32px,4vw,54px)] leading-[1.03] tracking-[-0.045em]">
            Start with the look
          </h2>
          <p className="m-0 text-[17px] text-[var(--muted)]">
            Choose a direction for the photo you already have.
          </p>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-3.5 [scrollbar-width:thin]">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/explore?category=${encodeURIComponent(category)}`}
              className="inline-flex min-h-[38px] shrink-0 items-center rounded-[var(--pill)] border border-[var(--line)] bg-[var(--surface)] px-3.5 text-[13px] text-[#c8c6cf] hover:border-[rgba(139,108,255,0.55)] hover:bg-[rgba(139,108,255,0.14)] hover:text-[var(--text)]"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-[88px]">
        <div className="mb-[30px] max-w-[760px]">
          <h2 className="m-0 mb-2.5 text-[clamp(32px,4vw,54px)] leading-[1.03] tracking-[-0.045em]">
            Made for your photos
          </h2>
          <p className="m-0 text-[17px] text-[var(--muted)]">
            See what changes, keep what matters, and carry the prompt to the editor you
            trust.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-[1.18fr_0.92fr] md:grid-rows-2">
          <article className="relative min-h-[310px] overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[linear-gradient(145deg,rgba(139,108,255,0.14),transparent_50%),var(--surface)] p-[27px] md:row-span-2 md:min-h-[396px]">
            <div className="grid h-12 w-12 place-items-center rounded-[14px] border border-[var(--line-strong)] bg-[rgba(139,108,255,0.09)] text-[21px] text-[#c5baff]">
              ↔
            </div>
            <h3 className="mt-24 mb-2 text-[33px] tracking-[-0.03em] md:mt-[170px]">
              See the result first
            </h3>
            <p className="m-0 max-w-[440px] text-[var(--muted)]">
              Every style pairs a source photo with an AI result, so you can judge the
              transformation before copying anything.
            </p>
          </article>
          <article className="min-h-[190px] rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-[27px]">
            <div className="grid h-12 w-12 place-items-center rounded-[14px] border border-[var(--line-strong)] bg-[rgba(139,108,255,0.09)] text-[21px] text-[#c5baff]">
              ⌁
            </div>
            <h3 className="mt-[54px] mb-2 text-[25px] tracking-[-0.03em]">Use the right prompt</h3>
            <p className="m-0 text-[var(--muted)]">
              Prompts are written and tested for photo transformation.
            </p>
          </article>
          <article className="min-h-[190px] rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-[27px]">
            <div className="grid h-12 w-12 place-items-center rounded-[14px] border border-[var(--line-strong)] bg-[rgba(139,108,255,0.09)] text-[21px] text-[#c5baff]">
              ♡
            </div>
            <h3 className="mt-[54px] mb-2 text-[25px] tracking-[-0.03em]">Save your favorites</h3>
            <p className="m-0 text-[var(--muted)]">
              Build a personal collection of styles worth trying.
            </p>
          </article>
        </div>
      </section>

      <HowItWorksSection />
    </div>
  );
}
