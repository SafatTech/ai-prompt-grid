import Link from "next/link";

type Props = {
  publishedCount: number;
};

const OCCASION_LINKS = [
  {
    label: "Professional headshots",
    href: `/explore?category=${encodeURIComponent("Professional portraits")}`,
  },
  { label: "Couples & shaadi", href: "/explore?q=couple" },
  { label: "Family portraits", href: "/explore?q=family" },
  { label: "Festivals", href: "/guides/category/festivals" },
  { label: "Trends", href: "/guides/category/trends" },
  {
    label: "Cinematic & anime",
    href: `/explore?category=${encodeURIComponent("Cinematic")}`,
  },
  {
    label: "Two-photo merges",
    href: `/explore?requirement=${encodeURIComponent("Two photos")}`,
  },
] as const;

const FACTS = [
  { term: "Tested on real photos", line: "Checked before it goes live." },
  { term: "Copy-paste prompts", line: "Ready for your AI editor." },
  { term: "See the result first", line: "A real before and after." },
  { term: "Free, no sign-up", line: "Copy without an account." },
] as const;

export function TrustStrip({ publishedCount }: Props) {
  return (
    <section className="home-section home-trust" aria-labelledby="home-trust-heading">
      <div className="home-trust-grid">
        <div>
          <h2 id="home-trust-heading">
            One collection of AI photo prompts. <span>Every occasion.</span>
          </h2>
          <p className="home-trust-lead">
            From headshots to shaadi, festivals to two-photo merges. Every style is tested on a
            real photo, and new ones are added regularly.
          </p>
          <div className="home-trust-meta">
            <Link href="/explore" className="home-trust-link">
              Browse the collection →
            </Link>
            {publishedCount > 0 ? (
              <span className="home-trust-count">
                {publishedCount} styles and growing
              </span>
            ) : null}
          </div>
        </div>
        <nav aria-label="Browse by occasion">
          <ul className="home-trust-index">
            {OCCASION_LINKS.map((item) => (
              <li key={item.href + item.label}>
                <Link href={item.href}>
                  {item.label}
                  <i aria-hidden="true">→</i>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <ul className="home-trust-facts">
        {FACTS.map((fact) => (
          <li key={fact.term}>
            {fact.term}
            <span>{fact.line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
