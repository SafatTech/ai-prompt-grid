type Props = {
  publishedCount: number;
};

export function TrustStrip({ publishedCount }: Props) {
  return (
    <section className="home-section home-trust" aria-labelledby="home-trust-heading">
      <h2 id="home-trust-heading" className="sr-only">
        Why AI Prompt Grid
      </h2>
      <div className="home-trust-grid">
        <div>
          <b>{publishedCount > 0 ? publishedCount : "—"}</b>
          <span>tested styles</span>
        </div>
        <div>
          <b>Copy-paste</b>
          <span>prompts ready to use</span>
        </div>
        <div>
          <b>Your photo</b>
          <span>see the result first</span>
        </div>
        <div>
          <b>Free</b>
          <span>no sign-up to copy</span>
        </div>
      </div>
    </section>
  );
}
