/**
 * Styles browse CTA. `/styles` has no search index of its own; the form posts
 * there and `src/app/styles/page.tsx` forwards `q` to `/explore`.
 */
export function GuidesCta() {
  return (
    <section className="guides-cta">
      <div className="guides-wrap">
        <div className="guides-cta-band">
          <div>
            <h2>Find a style for your photo</h2>
            <p>Browse hundreds of tested styles, then copy the prompt into your AI editor.</p>
          </div>
          <form className="guides-cta-form" role="search" action="/styles" method="get">
            <label>
              <small>What do you want to make?</small>
              <input
                type="search"
                name="q"
                placeholder="e.g. Diwali couple, LinkedIn headshot"
                autoComplete="off"
              />
            </label>
            <button type="submit">Search styles</button>
          </form>
        </div>
      </div>
    </section>
  );
}
