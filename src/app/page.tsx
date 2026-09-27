import Link from "next/link";
import { HeroArt } from "@/components/hero-art";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { StyleCard } from "@/components/style-card";
import { listTrendingStyles } from "@/lib/catalog/repository";
import { categories } from "@/lib/catalog/styles";

export default async function HomePage() {
  const trending = await listTrendingStyles(6);

  return (
    <div>
      <section className="hero">
        <div className="hero-bg hero-background-film" aria-hidden />
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="hero-eyebrow inline-flex min-h-[30px] max-w-full flex-wrap items-center rounded-[var(--pill)] border border-[rgba(139,108,255,0.23)] bg-[rgba(139,108,255,0.1)] px-[11px] py-1 text-left text-xs font-extrabold tracking-[0.12em] text-[#c1b4ff] uppercase">
              Transform the photos you already love
            </span>
            <h1 className="hero-title mt-[22px] mb-5 max-w-[670px] text-[clamp(38px,11vw,88px)] leading-[0.95] font-bold tracking-[-0.065em]">
              Find a look.
              <br className="hero-title-break" />
              <span className="font-semibold text-[var(--muted)]">
                Keep your
                <br className="hero-title-break" />
                {" "}
                story.
              </span>
            </h1>
            <p className="hero-description m-0 max-w-[610px] text-[clamp(16px,1.25vw,19px)] text-[#c3c1cb]">
              Tested prompts turn your photos into cinematic portraits,
              paintings, and more.
            </p>
            <div className="hero-actions mt-[30px] flex flex-wrap gap-[11px]">
              <Link
                href="/explore"
                data-testid="hero-explore"
                className="primary-button inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--violet)] px-[18px] text-sm font-bold text-[#100d1a] hover:bg-[#9b82ff]"
              >
                Explore styles
              </Link>
              <Link
                href="/how-it-works"
                className="secondary-button inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-[18px] text-sm font-bold text-[var(--text)] hover:border-[var(--line-strong)] hover:bg-[#272636]"
              >
                How it works
              </Link>
            </div>
          </div>
          <HeroArt />
        </div>
      </section>

      <section className="container py-12 sm:py-16 lg:py-[88px]">
        <div className="mb-7 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
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

      <section className="container py-12 sm:py-16">
        <div className="mb-[30px] max-w-[760px]">
          <h2 className="m-0 mb-2.5 text-[clamp(32px,4vw,54px)] leading-[1.03] tracking-[-0.045em]">
            Start with the look
          </h2>
          <p className="m-0 text-[15px] text-[var(--muted)] sm:text-[17px]">
            Choose a direction for the photo you already have.
          </p>
        </div>
        <div className="category-chip-scroll -mx-3 flex gap-2.5 overflow-x-auto px-3 pb-3.5 [scrollbar-width:thin] sm:-mx-4 sm:px-4 md:-mx-6 md:px-6">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/explore?category=${encodeURIComponent(category)}`}
              className="inline-flex min-h-11 shrink-0 items-center rounded-[var(--pill)] border border-[var(--line)] bg-[var(--surface)] px-3.5 text-[14px] text-[#c8c6cf] hover:border-[rgba(139,108,255,0.55)] hover:bg-[rgba(139,108,255,0.14)] hover:text-[var(--text)]"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-12 sm:py-16 lg:py-[88px]">
        <div className="mb-[30px] max-w-[760px]">
          <h2 className="m-0 mb-2.5 text-[clamp(32px,4vw,54px)] leading-[1.03] tracking-[-0.045em]">
            Made for your photos
          </h2>
          <p className="m-0 text-[15px] text-[var(--muted)] sm:text-[17px]">
            See what changes, keep what matters, and carry the prompt to the editor you
            trust.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-[1.18fr_0.92fr] md:grid-rows-2">
          <MadeForCard
            image="/home/made-for/see_the_result_first.png"
            icon="↔"
            title="See the result first"
            body="Every style pairs a source photo with an AI result, so you can judge the transformation before copying anything."
            featured
          />
          <MadeForCard
            image="/home/made-for/use_the_right_prompt.png"
            icon="⌁"
            title="Use the right prompt"
            body="Prompts are written and tested for photo transformation."
          />
          <MadeForCard
            image="/home/made-for/save_your_fav.png"
            icon="♡"
            title="Save your favorites"
            body="Build a personal collection of styles worth trying."
          />
        </div>
      </section>

      <HowItWorksSection />
    </div>
  );
}

function MadeForCard({
  image,
  icon,
  title,
  body,
  featured = false,
}: {
  image: string;
  icon: string;
  title: string;
  body: string;
  featured?: boolean;
}) {
  return (
    <article
      className={
        featured
          ? "made-for-card group relative flex min-h-[260px] flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--line)] p-5 md:row-span-2 md:min-h-[396px] md:p-[27px]"
          : "made-for-card group relative flex min-h-[180px] flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--line)] p-5 md:p-[27px]"
      }
    >
      <div
        className="made-for-card-media absolute inset-0"
        style={{ backgroundImage: `url("${image}")` }}
        aria-hidden
      />
      <div className="made-for-card-scrim absolute inset-0" aria-hidden />
      <div
        className="made-for-card-icon relative z-[1] grid h-12 w-12 place-items-center rounded-[14px] border border-[var(--line-strong)] bg-[rgba(139,108,255,0.09)] text-[21px] text-[#c5baff]"
      >
        {icon}
      </div>
      <h3
        className={
          featured
            ? "relative z-[1] mt-auto mb-2 pt-10 text-[24px] tracking-[-0.03em] transition-[color,transform] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 sm:text-[28px] md:pt-[170px] md:text-[33px]"
            : "relative z-[1] mt-auto mb-2 pt-8 text-[20px] tracking-[-0.03em] transition-[color,transform] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 md:pt-[54px] md:text-[25px]"
        }
      >
        {title}
      </h3>
      <p
        className={
          featured
            ? "relative z-[1] m-0 max-w-[440px] text-[var(--muted)] transition-colors duration-[420ms] group-hover:text-[#d2d0da]"
            : "relative z-[1] m-0 text-[var(--muted)] transition-colors duration-[420ms] group-hover:text-[#d2d0da]"
        }
      >
        {body}
      </p>
    </article>
  );
}
