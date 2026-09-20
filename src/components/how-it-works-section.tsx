import Link from "next/link";

export function HowItWorksSection() {
  const steps = [
    {
      title: "Choose a look",
      copy: "Browse styles with clear before-and-after examples.",
    },
    {
      title: "Use your photo",
      copy: "Upload your image in the supported external AI editor.",
    },
    {
      title: "Save what works",
      copy: "Keep prompts, styles, and finished images in your private library.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="border-y border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.018),transparent)] py-[78px]"
    >
      <div className="container">
        <div className="mb-8 max-w-[760px]">
          <h2 className="m-0 mb-2.5 text-[clamp(32px,4vw,54px)] leading-[1.03] tracking-[-0.045em]">
            From source photo to finished look
          </h2>
          <p className="m-0 text-[17px] text-[var(--muted)]">
            AI Prompt Grid guides the style choice. Your external AI editor performs the
            transformation.
          </p>
        </div>
        <div className="mt-[34px] grid gap-2.5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="relative min-h-[225px] px-6 py-[26px]">
              <span className="grid h-12 w-12 place-items-center rounded-[14px] border border-[var(--line)] bg-[var(--surface-2)] font-extrabold text-[#b9abff]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-[35px] mb-2 text-[22px]">{step.title}</h3>
              <p className="m-0 text-[var(--muted)]">{step.copy}</p>
            </article>
          ))}
        </div>
        <Link
          href="/explore"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--violet)] px-[18px] text-sm font-bold text-[#100d1a] hover:bg-[#9b82ff]"
        >
          Explore styles
        </Link>
      </div>
    </section>
  );
}
