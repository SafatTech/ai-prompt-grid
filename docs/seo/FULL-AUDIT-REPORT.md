# AI Prompt Grid — Full SEO & AdSense Readiness Audit

**Site:** https://aipromptgrid.com  
**Business type:** Programmatic catalog / publisher hybrid (tested photo-transformation prompts for external AI editors)  
**Audit date:** 1 October 2026  
**Stack observed:** Next.js (App Router) + Supabase  
**Method:** Live HTTP + Playwright rendered checks + in-repo code review. Specialist SEO skills consulted (`seo`, `seo-technical`, `seo-content`, `seo-schema`, `seo-sitemap`, `seo-geo`, `seo-agentic`, `seo-page`, `seo-sxo`, `seo-performance`).

**Data tiers**

| Tier | Source | Status |
|------|--------|--------|
| Tier 0 (live HTML/HTTP/Playwright) | This audit | Completed |
| Tier 1 (GSC / CrUX / GA4 / PSI field) | Google APIs | **Not available** — `google_auth` / GSC credentials not confirmed in-repo; PSI API returned HTTP 429 during audit |
| Tier 2 (backlinks / paid SEO APIs) | Moz/Bing/DataForSEO | **Not available** — auth checks not confirmed |

Do **not** treat any traffic, index-coverage, or CWV field numbers below as measured — they are absent unless noted as lab observations.

**Production vs local Phase 0**

Local uncommitted work includes `/about`, `/contact`, sitemap static entries for those routes, footer trust links, style `generateMetadata` + CreativeWork JSON-LD, and Privacy/Terms cleanup. **Live production (1 Oct 2026) does not yet reflect that work:** `/about` and `/contact` return **404**; footer shows only Privacy/Terms; style/explore pages still lack unique titles and JSON-LD in the document.

---

## A) Executive scorecard

### Overall SEO readiness: **36 / 100**

| Category | Weight | Score | Weighted |
|----------|--------|------:|---------:|
| Technical SEO | 22% | 45 | 9.9 |
| Content quality / E-E-A-T | 23% | 28 | 6.4 |
| On-page SEO | 20% | 38 | 7.6 |
| Schema / structured data | 10% | 10 | 1.0 |
| Performance (CWV) | 10% | 55* | 5.5 |
| AI search readiness (GEO + agentic) | 10% | 28 | 2.8 |
| Images | 5% | 60 | 3.0 |
| **Total** | | | **~36** |

\*Performance is **provisional** (no CrUX; PSI rate-limited). No evidence of total breakage; explore HTML payload is large (~366 KB). Technical category aligned with [Technical SEO audit](df2c722c-f650-425f-8cb9-af4cbd9dd211) specialist score (**45/100**); indexability alone rated ~18 until canonical + CSR + metadata ship.

### AdSense readiness: **27 / 100**

**Blockers (must clear before applying):**

1. **Missing live trust pages** — `/about` and `/contact` 404 (AdSense expects clear ownership/contact).
2. **Thin / template-heavy inventory** — ~69 style URLs with CSR-empty initial HTML and limited unique editorial prose.
3. **No guide/blog corpus** — insufficient original articles for “valuable content” review.
4. **Sitewide canonical → homepage** — signals duplicate/utility navigation more than a content property.
5. **Entity/E-E-A-T gaps** — no Organization schema, weak “who runs this” signals on the live site.
6. **“Unfinished site” copy** — live “Version 0” / “private beta” on `/how-it-works` (and related invite language historically).

**Not blockers yet (by design):** AdSense code not installed (correct — approval prep only).

### Top 10 issues

| # | Severity | Issue |
|---|----------|--------|
| 1 | **Critical** | Almost every URL’s `<link rel="canonical">` points to `https://aipromptgrid.com/` (homepage) |
| 2 | **Critical** | `/styles/*` and `/explore` SSR **bail out to CSR** (`BAILOUT_TO_CLIENT_SIDE_RENDERING`) — initial HTML is a Loading shell |
| 3 | **Critical** | Live `/about` and `/contact` are **404**; Phase 0 trust pages not deployed |
| 4 | **High** | Style/explore/how-it-works share **identical title + meta description** with the homepage |
| 5 | **High** | **No JSON-LD** on live pages (home, explore, styles); local CreativeWork not shipped |
| 6 | **High** | **No guides/blog** — thin topical depth for rankings and AdSense |
| 7 | **High** | Style pages thin on unique crawlable copy even after hydration (~500–670 words, mostly UI chrome) |
| 8 | **Medium** | No default **OG/Twitter images**; social/unfurls weak |
| 9 | **Medium** | No `llms.txt` / agent discovery; AI-search citability limited |
| 10 | **Medium** | Incomplete security headers (HSTS present; CSP / XFO / XCTO / Referrer-Policy missing) |
| 11 | **High** | Live “Version 0” / “private beta” copy on `/how-it-works` (AdSense unfinished-site risk) |
| 12 | **Medium** | Legacy `/terms-of-service/` still 308; prior-owner brand residue in search |
| 13 | **High** | Lab CLS **0.245** sitewide (images missing dimensions + header/footer shift) |

---

## B) Full audit report

### 1. Technical SEO

#### What works
- `https://` with **HSTS** (`max-age=63072000`).
- `robots.txt` allows public catalog; disallows `/admin`, `/api/`, `/auth/`, `/sign-in`, `/library`, `/creations/`; declares Sitemap.
- `sitemap.xml` returns **200** for Chrome / Googlebot / GPTBot UAs in this audit (**74** URLs: 5 static + 69 styles).
- Core public routes respond 200: `/`, `/explore`, `/how-it-works`, `/privacy`, `/terms`, style URLs sampled.
- Viewport meta present.

#### Findings

##### C1 — Sitewide canonical to homepage (Critical)
- **Observation:** Raw HTML for `/`, `/explore`, `/how-it-works`, `/privacy`, and style URLs all emit `rel="canonical" href="https://aipromptgrid.com"` (or `/`). Playwright after hydration still shows homepage canonical on style + explore pages.
- **Why it matters:** Google may treat most URLs as duplicates of the homepage and **drop style pages from the index** or consolidate ranking signals incorrectly ([Google Search Central — consolidate duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)).
- **Exact fix:** Remove `alternates.canonical: "/"` from `src/app/layout.tsx`. Set self-canonicals on every indexable route (`/explore`, `/how-it-works`, each style via `generateMetadata`, legal/trust pages). Deploy.
- **How we know it failed:** `curl`/View-Source on a style URL still shows homepage canonical; GSC URL Inspection (Tier 1) would show “Google-selected canonical” ≠ user-declared once GSC is connected.
- **Leading indicator:** % of indexed style URLs in GSC with correct self-canonical (target → 95%+ within 14 days of deploy).

##### C2 — CSR bailout on catalog pages (Critical)
- **Observation:** Initial HTML for `/styles/intimate-cinematic-portrait`, `/styles/anime-squad`, `/explore` contains `<template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING">` and fallback copy (“Loading…” / “Loading styles…”). Main has essentially **no H1 / no body copy** until JS. Root cause in code: client components call `useSearchParams()` inside `Suspense` (`style-detail-client.tsx`, `explore-client.tsx`).
- **Why it matters:** Non-JS and partial renderers see empty pages; AdSense reviewers and some crawlers under-weight JS-only content; slower indexing of primary inventory ([Google — JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)).
- **Exact fix:** SSR critical content **outside** the `useSearchParams` boundary: H1, summary, before/after, prompt preview, related links as Server Components. Confine `useSearchParams` to a small client island (e.g. saveResult query only). Prefer reading `searchParams` in the **server** page prop where possible.
- **How we know it failed:** `Invoke-WebRequest` HTML still contains `BAILOUT_TO_CLIENT_SIDE_RENDERING` and `<main>` ≈ Loading shell.
- **Leading indicator:** Initial HTML word count in `<main>` for a style URL without executing JS (target ≥ 300 words of unique copy).

##### C3 — Trust routes 404 (Critical for trust + AdSense)
- **Observation:** Live `GET /about` and `GET /contact` → **404**. Local files exist (`src/app/about/page.tsx`, `src/app/contact/page.tsx`) with `hello@aipromptgrid.com` but are **untracked / undeployed**. Production footer does **not** yet link About/Contact.
- **Why it matters:** Clear who-we-are + contact is a trust and AdSense expectation; 404 trust URLs waste crawl and look unfinished.
- **Exact fix:** Ship Phase 0 pages + footer links + sitemap entries; verify 200s in production.
- **How we know it failed:** HTTP status ≠ 200 on `/about` and `/contact`.
- **Leading indicator:** Both URLs 200 + linked from footer sitewide.

##### C4 — Security headers incomplete (Medium)
- **Observation:** HSTS present; **missing** CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy on homepage response.
- **Why it matters:** Indirect trust/security posture; not a ranking factor primary, but good for AdSense/review hygiene.
- **Exact fix:** Add headers in Next config / hosting (Vercel headers) without breaking embeds.
- **How we know it failed:** Response header set still missing those keys.
- **Leading indicator:** securityheaders.com / curl `-I` grade improvement.

##### C5 — Sitemap coverage gap vs IA (High until Phase 0 ships)
- **Observation:** Live sitemap has `/`, `/explore`, `/how-it-works`, `/privacy`, `/terms` + 69 styles. **No** `/about` or `/contact`. Local `sitemap.ts` already adds them. Style `lastmod` values are unique; all **static** `lastmod`s share one ISR-generation timestamp (`lastModified: now`).
- **Why it matters:** Trust URLs won’t be discovered efficiently until listed. Misleading static `lastmod` teaches Google to ignore the signal ([sitemap lastmod guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)).
- **Exact fix:** Deploy updated `sitemap.ts`; use real content dates for static pages (not `now`); resubmit in GSC after go-live. Optionally drop ignored `changefreq`/`priority`.
- **How we know it failed:** Sitemap XML lacks trust `<loc>`s; static `lastmod`s identical across hourly regenerations.
- **Leading indicator:** Sitemap URL count includes trust pages; GSC sitemap “discovered” increases; static lastmods stable unless content changed.

##### C6 — Sitemap intermittent 500 via some fetchers (High)
- **Observation:** Cursor `WebFetch` hit **500** on `/sitemap.xml` while direct browser-like requests returned **200** with full XML. Bot UAs tested here returned 200. Likely cold-start / DB stall before the style `try/catch` fallback runs.
- **Why it matters:** Intermittent 500s → GSC “Couldn’t fetch” and stale URL inventory.
- **Exact fix:** Hard-timeout around `listPublishedStyleSitemapEntries()` (e.g. 4s) falling back to static-only; monitor `/sitemap.xml`; consider on-publish static generation.
- **How we know it failed:** Synthetic monitor returns non-200 from multiple egress points.
- **Leading indicator:** 7-day sitemap uptime ≥ 99.9%; GSC sitemap last-read healthy.

---

### 2. Content / E-E-A-T

#### What works
- Clear product promise on homepage and `/how-it-works` (SSR text present).
- Privacy + Terms exist and are substantive (~390 words privacy HTML text extract).
- Styles (after JS) show tested-prompt framing, limitations, tool/mode, related styles — real product utility.
- Explore claims **69 tested styles** across categories (Cinematic, Anime, Pets, Travel, Product, etc.).

#### Quality gates (skill thresholds)
| Page | Gate | Observed (approx.) | Pass? |
|------|------|--------------------|-------|
| Homepage | 500 words | ~360–380 raw / ~363 rendered main | **Fail** |
| Product-like style | 400 unique | ~540–670 rendered, much UI chrome | **Borderline** |
| Category/explore | 400 | ~616 rendered after JS; **0** in raw HTML | **Fail (crawlable)** |
| About | 400 | **404 live**; local draft shorter | **Fail live** |
| Blog post | 1,500 | **None** | **Fail** |

#### Findings

##### E1 — No educational content corpus (High)
- **Observation:** No `/blog`, `/guides`, or article routes in the app.
- **Why it matters:** Organic head terms (“ChatGPT photo prompt”, “AI virtual staging prompt”) need informational pages; AdSense wants substantial original content beyond a tool UI.
- **Exact fix:** Launch `/guides` (or `/blog`) IA; ship 8–12 guides in 30 days (see section E).
- **How we know it failed:** No indexable guide URLs in sitemap; site: search shows catalog-only.
- **Leading indicator:** Guides in sitemap + GSC impressions on informational queries.

##### E2 — Style pages lack crawlable depth (High)
- **Observation:** After hydration, `intimate-cinematic-portrait` ~540 words, `modern-virtual-staging` ~667; raw HTML ~37 words. Unique “experience” copy is short vs UI labels.
- **Why it matters:** Programmatic pages need durable unique text (when to use, photo tips, limitations, editor steps) to avoid thin-content classification.
- **Exact fix:** Add SSR sections per style: use-cases, photo requirements, what changes / what preserves, FAQ-as-visible-HTML (not FAQ rich-result chasing), related guides. Keep design system.
- **How we know it failed:** Raw HTML `<main>` word count &lt; 300; duplicate boilerplate ratio high across styles.
- **Leading indicator:** Median unique SSR words/style ≥ 400; bounce/time metrics once analytics live.

##### E3 — E-E-A-T entity weak (High)
- **Observation:** Live site: no About, no Contact, no author/organization bio, no “how we test” page beyond product UI, no Organization schema.
- **Why it matters:** Helpful Content / E-E-A-T expects identifiable publishers ([Google Search Quality Rater Guidelines concepts](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).
- **Exact fix:** Deploy About (methodology + who) + Contact (`hello@aipromptgrid.com`) + optional “Prompt testing standard” guide; Organization JSON-LD.
- **How we know it failed:** `/about`/`/contact` 404; no `Organization` in HTML.
- **Leading indicator:** Trust pages indexed; brand SERP shows sitelinks to About/Contact.

---

### 3. Schema / structured data

- **Observation:** Live pages sampled: **0** `application/ld+json` blocks (home, explore, styles, how-it-works). Local style page defines `CreativeWork` + nested `Organization`, but production HTML has none (CSR/deploy gap).
- **Why it matters:** Entity understanding and eligibility for rich results where applicable; reinforces brand for AI/answer engines.
- **Exact fix:**
  - Root: `Organization` + `WebSite`. Add `SearchAction` only with `urlTemplate` using explore’s real `q` param (`/explore?q={search_term_string}` — confirmed in `explore-client.tsx`).
  - Styles: keep `CreativeWork` (or `HowTo` **do not use** — deprecated). Prefer `CreativeWork`; include `image`, `dateModified`, `provider`.
  - Explore: `CollectionPage` + `ItemList` of styles (cap list size if needed).
  - Do **not** add FAQPage for Google SERP benefit (FAQ rich results retired for all sites per skill guidance May 2026).
- **How we know it failed:** Rich Results Test / View-Source shows no JSON-LD; schema score stays near 0.
- **Leading indicator:** Rich Results Test “valid” Organization/WebSite; style pages validate CreativeWork.

**Schema score: 10/100**

---

### 4. Sitemap / indexation

- **Count:** 74 URLs.
- **Static:** home, explore, how-it-works, privacy, terms.
- **Styles:** 69 (list includes e.g. `modern-virtual-staging`, `anime-squad`, `intimate-cinematic-portrait`, `south-asian-fashion-editorial`, … full list captured during audit).
- **Missing live:** `/about`, `/contact`.
- **lastmod:** Present; static pages share a build-ish timestamp pattern.
- **changefreq/priority:** Present (Google largely ignores these — Low priority noise).
- **Indexation:** **Unknown** without GSC (Tier 1 setup required).

**Setup needed (Tier 0/1):**
1. Verify domain in Google Search Console.
2. Submit `https://aipromptgrid.com/sitemap.xml`.
3. Enable GA4 (or Matomo) + link to GSC.
4. Optional: Bing Webmaster Tools + IndexNow later.

---

### 5. GEO / AI search readiness

- **robots.txt:** No AI-bot blocks observed (`User-Agent: *` Allow `/`). Good default for citation discovery.
- **llms.txt:** **404**.
- **`/.well-known/ai-catalog.json`:** **404**.
- **Citability:** Homepage SSR passages are quote-friendly; style pages are not citation-ready in raw HTML due to CSR bailout.
- **Brand entity:** “AI Prompt Grid” clear in UI; weak Knowledge-panel-grade entity (no Organization schema, no About live).

**AI search score contribution: 22/100**

Recommendations: ship SSR style summaries; add concise `llms.txt` pointing to About, How it works, Explore, top guides; Organization schema; optional Markdown alternatives only if maintained.

---

### 6. Agentic readiness (optional pass)

Source: [Agentic readiness audit](cd5f6029-60dc-4b28-9828-d92eb7fe78bc).

- Accessibility tree after JS is usable on explore/styles (landmarks, named links/buttons, strong image alts on catalog). Homepage SSR is agent-friendly.
- **P0 (same as CSR bailout):** Prompt/body text lives in RSC/client path; non-JS agents see “Loading…” — blocks Lighthouse Agentic Browsing content access.
- **P0 (a11y):** Prompt-customization **checkboxes appear to lack accessible names** (likely fails axe `label` / `agent-accessibility-tree`). Fix: associate `<label htmlFor>` or `aria-label` on preserve/option toggles in `style-detail-client.tsx`.
  - **How we know it failed:** axe/Lighthouse agent-accessibility-tree still flags unlabeled controls on a style URL.
  - **Leading indicator:** Agentic fraction audits pass label checks; screen-reader name for each checkbox non-empty.
- **P1:** No `Content-Signal` / AI-specific robots groups (optional policy choice); no `llms.txt` / Markdown / WebMCP / ai-catalog; private paths (`/library`, `/creations/`) robots-disallowed only — confirm auth still required server-side.
- Lighthouse Agentic Browsing fraction: **not measured** (PSI 429); specialist estimate **0/2 or 2/2** until P0s fixed, then `llms.txt` can support a fuller 3/3-style checklist.
- Nothing here is a ranking guarantee — it improves how agents read/act on the catalog.

---

### 7. On-page — Home, Explore, Styles

#### Homepage `https://aipromptgrid.com/`
| Signal | Live value |
|--------|------------|
| Title | `AI Prompt Grid` |
| Meta description | Generic product blurb |
| Canonical | Self (homepage) — OK here only |
| H1 | “Find a look. Keep your story.” (SSR) |
| JSON-LD | None |
| OG image | None |
| Words | ~360–380 (below 500 gate) |

**Gaps:** Thin copy below gate; no Organization/WebSite; no OG image; brand in title only (OK) but weak supporting depth.

#### Explore `https://aipromptgrid.com/explore`
| Signal | Live value |
|--------|------------|
| Title / description | **Identical to homepage** |
| Canonical | **Homepage** (wrong) |
| Raw HTML | CSR bailout — “Loading styles…” |
| After JS | H1 “Find a style for your photo”; ~616 words; style links present |
| Page metadata in code | **Missing** (`explore/page.tsx` has no `metadata` / `generateMetadata`) |

#### Style samples
| URL | Title (live) | Canonical | Raw HTML | After JS | JSON-LD |
|-----|--------------|-----------|----------|----------|---------|
| `/styles/intimate-cinematic-portrait` | Homepage default | Homepage | Bailout / ~37 words | H1 correct; ~540 words; prompt UI | None |
| `/styles/modern-virtual-staging` | Homepage default | Homepage | Bailout | H1 correct; ~667 words | None |
| `/styles/anime-squad` | Homepage default | Homepage | Bailout; no ld+json | (same pattern) | None |

Local `generateMetadata` would set titles like `{Style} Prompt` + OG — **not live**.

#### How it works
- SSR content OK (~430+ words extract).
- Title/description/canonical still homepage defaults — **no page `metadata` export**.

#### Trust / legal
- Privacy/Terms: 200, readable content.
- Privacy live title showed double brand suffix pattern historically; local title is clean `"Privacy policy"` + layout template.
- About/Contact: **404 live**.

---

### 8. Trust pages (AdSense-critical)

| Page | Live | Notes |
|------|------|-------|
| Privacy | 200 | Present |
| Terms | 200 | Present |
| About | **404** | Local ready — deploy |
| Contact | **404** | Local ready — `hello@aipromptgrid.com` |
| How it works | 200 | Product education; add metadata |

Footer live: Privacy + Terms only (no About/Contact email in footer text sampled).

---

### 9. AdSense-specific risks

| Risk | Severity | Detail |
|------|----------|--------|
| Insufficient content | High | Catalog UI ≠ article inventory |
| Navigation/utility classification | High | CSR shells + thin templates |
| Missing contact/about | Critical | 404s |
| Duplicate meta/canonicals | High | Looks unfinished / doorway-adjacent |
| Copyrighted / third-party policy | Medium | Ensure sample images are owned/licensed; disclose external editors |
| Ad placement prep | Info | Do not install ads until content + trust shipped |
| Traffic threshold | Info | Unknown without analytics |

---

### 10. Performance (lab — provisional)

Source: [Performance CWV check](0dbf0188-5913-4373-b16d-795d809e8d3b) via Playwright lab (desktop, unthrottled). PSI/CrUX **unavailable** (HTTP 429). **No field CWV; no INP** measured.

| Page | TTFB | FCP | LCP | CLS | Notes |
|------|------|-----|-----|-----|-------|
| `/` | ~70 ms | ~504 ms | ~688 ms (lab Good) | **0.2448** Needs Improvement | LCP: Supabase `source-05.webp` ~329 KB |
| `/styles/intimate-cinematic-portrait` | ~71 ms | ~196 ms | ~348 ms (cached lab) | **0.2448** same | Sitewide shift, not page-local |

- **P1 — CLS ~0.245:** Single large shift (~270–570 ms) involving sticky header / footer reflow; catalog `<img>`s lack `width`/`height` (CSS `h-full w-full object-cover` only).
  - **Fix:** Explicit dimensions or Next.js `Image`; reserve sticky header height; stop footer/nav remount reflow.
  - **How we know it failed:** Lab CLS still ≥ 0.1 (target ≤ 0.1; avoid ≥ 0.25 Poor).
  - **Leading indicator:** CrUX CLS p75 once PSI/GSC available; Lighthouse CLS subscore.
- **P2 — LCP image:** Add `fetchpriority="high"` / `priority` on hero/LCP image; consider `srcset` vs 1440× full file.
- **Projected mobile Lighthouse:** ~55–70 (CLS is the cliff); treat lab LCP as optimistic (~3–4× on throttled mobile).

Update category Performance score rationale: keep **55** provisional — loading looks strong in lab, CLS nearly Poor.

---

### 11. SXO (search experience) notes

Specialist pass ([SXO search experience](310a3f45-8400-4840-97ab-3f9f1d7974df)): SERP sample for persona queries is **~68% listicle/guide** pages; style detail pages only match long-tail single-prompt intent once indexable.

- SERP intent for “AI photo prompt / ChatGPT image prompt” expects **guides + examples**, not only an app shell.
- Style URLs can match mid-tail “virtual staging AI prompt” **if** indexable with unique titles/copy.
- Personas underserved informationally: real-estate stagers, pet owners, product sellers — map guides → style clusters.
- **Category hubs missing:** `/explore?category=Pets` (etc.) is not a durable indexable URL; competitors win with hubs like “pet portrait prompts”. Add SSR hubs (e.g. `/prompts/pet-portraits`, `/prompts/virtual-staging`).
- **IA mismatch:** `modern-virtual-staging` and related property styles appear under **Travel**; related styles / background options can feel off-persona for stagers. Add Home & real estate (+ Fashion) categories; related-by-subject.
- **Title formula risk:** `${style.title} Prompt` (“Crimson Bloom Shadows Prompt”) under-matches search descriptors; prefer SEO titles like “Virtual Staging Prompt for ChatGPT (Empty Room)” while keeping creative H1.
- **Persona fit (rendered UX heuristic):** casual selfie ~75; pet ~62; fashion ~56; real-estate stager ~44 (weakest).
- **Legacy domain identity:** `https://aipromptgrid.com/terms-of-service/` still returns **308** (prior-owner path in the index). Point explicitly to `/terms` with a stable redirect or **410** after reclaim messaging settles; ship live About to re-establish current operator.

### 12. Live “unfinished / beta” copy (AdSense — High)

Confirmed by [Content E-E-A-T audit](ba1b268a-450a-428f-bba8-f670b394f779) + live fetch:

- `/how-it-works` still contains **“Version 0”** / **“private beta”** language (3 matches in HTML this audit).
- Privacy/contact flows historically referenced invite-only channels; local Phase 0 cleans some of this — **verify all invite/beta/V0 strings are gone after deploy**.
- **Falsifiability:** sitewide rendered search for `beta|Version 0|V0|invite` → 0 hits on public pages.
- **Leading indicator:** AdSense review no longer flags “under construction / not ready”.
- **Also:** `ads.txt` 404 — add only when a publisher ID exists (do not invent); example photo **source/consent** line under style samples for trust.

---

## C) Prioritized 30-day action plan

### Week 1 — Indexation & trust unblockers

| Item | Owner | Effort | Impact | Dependency |
|------|-------|--------|--------|------------|
| Remove root `canonical: "/"`; add self-canonicals on explore, how-it-works, styles, legal | Dev | S | Critical | None |
| Deploy `/about` + `/contact` + footer links + sitemap entries | Dev | S | Critical | Content already drafted locally |
| Fix CSR bailout: SSR style/explore critical content; isolate `useSearchParams` | Dev | M | Critical | None |
| Ship style `generateMetadata` + CreativeWork JSON-LD to production | Dev | S | High | Deploy pipeline |
| Add explore + how-it-works `metadata` | Dev | S | High | Canonical fix |
| Add Organization + WebSite JSON-LD in root layout | Dev | S | High | Absolute URL helper |
| Verify domain in GSC + submit sitemap | Off-site | S | High | DNS/access |
| Install GA4 (or Matomo) basic pageviews | Dev / Off-site | S | High | None |

### Week 2 — Depth & sharing

| Item | Owner | Effort | Impact | Dependency |
|------|-------|--------|--------|------------|
| SSR “style story” blocks (use-cases, photo tips, preserve/change) on style template | Dev + Content | M | High | CSR fix |
| Default OG image + per-style OG from result image (already coded locally — verify live) | Dev | S | Medium | Metadata deploy |
| Launch `/guides` route + index template + 3 cornerstone guides | Dev + Content | L | High | IA decision |
| Scrub live “Version 0” / “private beta” / invite-only copy (how-it-works, legal, creators) | Content + Dev | S | High | Deploy Phase 0 |
| Redirect or 410 legacy `/terms-of-service/` → `/terms` | Dev | S | Medium | Confirm no needed inbound |
| Internal links: guides ↔ styles ↔ explore categories | Dev + Content | M | High | Guides exist |
| Security headers pass | Dev | S | Low–Med | Hosting config |
| `llms.txt` (short) | Dev | S | Medium | About live |

### Weeks 3–4 — Organic + AdSense corpus

| Item | Owner | Effort | Impact | Dependency |
|------|-------|--------|--------|------------|
| Publish guides 4–10 (see content plan) | Content | L | High | Guides IA |
| Expand homepage copy to clear 500-word helpful gate without cluttering UX | Content + Dev | M | Medium | Design constraints |
| Category landing intros (SSR) for top 5 categories | Dev + Content | M | Medium | Explore IA |
| SSR category hubs for Pets + Virtual staging (listicle-shaped) | Dev + Content | L | High | Indexability Week 1 |
| Recategorize staging/place styles out of Travel; related-by-subject | Dev + Content | M | High | Taxonomy decision |
| GSC: fix coverage issues; request indexing on top styles + guides | Off-site | S | High | Week 1 GSC |
| AdSense policy self-review checklist; still **no ad code** | Owner | S | High | Trust + 8+ guides |
| Performance pass (LCP images, explore payload) | Dev | M | Medium | PSI access |
| Fix sitewide CLS: img width/height + sticky header/footer reserve | Dev | M | High | Lab CLS 0.245 |

---

## D) Implementation backlog (this codebase)

### Code changes

| Task | Files / area |
|------|----------------|
| Delete layout homepage-only canonical | `src/app/layout.tsx` |
| Explore metadata + canonical | `src/app/explore/page.tsx` |
| How-it-works metadata + canonical | `src/app/how-it-works/page.tsx` |
| Ensure style metadata/OG/JSON-LD deployed | `src/app/styles/[slug]/page.tsx` |
| SSR style content shell (H1, summary, images, prompt teaser) outside searchParams island | `styles/[slug]/page.tsx`, `style-detail-client.tsx` |
| SSR explore listing shell outside searchParams | `explore/page.tsx`, `explore-client.tsx` |
| Organization + WebSite JSON-LD | `src/app/layout.tsx` or `src/components/seo/json-ld.tsx` |
| Deploy about/contact | `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/lib/site-contact.ts` |
| Footer trust links | `src/components/site-footer.tsx` |
| Sitemap trust URLs | `src/app/sitemap.ts` (already local) |
| Fix not-found title double-brand | `src/app/not-found.tsx` (`title: "Page not found"` only) |
| Optional `src/app/llms.txt/route.ts` or `public/llms.txt` | new |
| Guides IA routes | `src/app/guides/...` (new) |
| Security headers | `next.config.*` / Vercel `headers` |
| Default OG image in root metadata | `src/app/layout.tsx` + `public/og/...` |
| CLS: width/height (or `next/image`) on catalog imgs; `priority`/`fetchPriority` on LCP | `HeroArt`, style cards, compare slider images |
| LCP: smaller `srcset` for hero WebP | image pipeline / Supabase transforms |
| Accessible names on style prompt option checkboxes | `style-detail-client.tsx` |

### Content to write
- About/Contact finalized (mostly done locally).
- Per-style SSR blurbs (template + editorial fields in Supabase if needed: `seo_body_md`, `use_cases`, `photo_tips`).
- 15–20 guides (section E).
- Homepage supporting sections (methodology, who it’s for) without breaking hero composition rules.

### Search Console / off-site
- GSC property + sitemap submit + URL Inspection sampling.
- GA4 property + key events (`style_view`, `prompt_copy` already tracked in code — wire to GA4).
- Bing Webmaster (optional).
- Brand NAP/entity: consistent `AI Prompt Grid` + `hello@aipromptgrid.com` on About/Contact.
- Do **not** add AdSense.js until blockers cleared.

---

## E) Content plan (organic + AdSense)

### Topic list (18)

| # | Topic | Category cluster | Intent |
|---|-------|------------------|--------|
| 1 | How to turn a selfie into a cinematic portrait with ChatGPT | Cinematic / Portraits | Informational + transactional |
| 2 | Best AI virtual staging prompts for empty rooms | Travel/Places / Staging | Commercial |
| 3 | ChatGPT image prompts for pet portraits (with photo tips) | Pets | Informational |
| 4 | AI product photography prompts: packshot to lifestyle | Product | Commercial |
| 5 | South Asian editorial & fashion prompts that keep identity | Fashion / Editorial | Informational |
| 6 | Anime and illustration transforms from real photos | Anime | Informational |
| 7 | Group photo to cinematic ensemble: prompt checklist | Cinematic / Group | Informational |
| 8 | Before you paste: photo requirements for AI restyles | Cross-cutting | Informational |
| 9 | Gemini vs ChatGPT for photo transformation prompts | Cross-cutting | Comparison |
| 10 | Real-estate curb appeal AI makeovers (ethical use) | Places | Commercial |
| 11 | Vintage & yearbook crew looks from modern photos | Vintage | Informational |
| 12 | Macro / product detail prompts that look expensive | Product | Commercial |
| 13 | Travel fashion prompts that preserve the place | Travel / Fashion | Informational |
| 14 | How we test prompts at AI Prompt Grid | Trust / E-E-A-T | Informational |
| 15 | Fixing common AI photo fails (identity drift, hands, lighting) | Cross-cutting | Informational |
| 16 | Wedding & memorial portrait restyles — sensitive use guide | Portraits | Informational |
| 17 | 3D / collectible figure prompts from a single photo | 3D avatars | Informational |
| 18 | Interior remodel vision prompts (kitchen, bath, outdoor) | Places | Commercial |

### Top 5 outlines

#### 1) Cinematic selfie → portrait (ChatGPT)
- **Target query:** `chatgpt cinematic portrait prompt` / `selfie to cinematic portrait AI`
- **H2s:** What “cinematic” changes; Photo checklist; Step-by-step in ChatGPT; Preserve identity settings; Example results; Common fails; Related styles
- **Internal links:** `/styles/intimate-cinematic-portrait`, `/styles/crimson-bloom-shadows`, `/styles/after-hours-polaroid`, `/explore`, `/how-it-works`
- **CTA:** Open Intimate Cinematic Portrait → copy prompt

#### 2) AI virtual staging prompts
- **Target query:** `AI virtual staging prompt` / `chatgpt empty room staging`
- **H2s:** When staging helps listings; Ethics & disclosure; Photo requirements; Prompt anatomy; Room-type tips; Related styles
- **Internal links:** `/styles/modern-virtual-staging`, `/styles/refined-luxury-living`, `/styles/cozy-dream-room`, `/styles/kitchen-remodel-vision`
- **CTA:** Try Modern Virtual Staging

#### 3) Pet portrait prompts
- **Target query:** `AI pet portrait prompt` / `chatgpt dog photo prompt`
- **H2s:** Best source pet photos; Style families (watercolor, plush, anime); Prompt controls; Related styles gallery
- **Internal links:** `/styles/funny-everyday-pet`, `/styles/hand-painted-watercolor-pet`, `/styles/cozy-plushie-pet`, `/styles/cartoon-animation-pet`
- **CTA:** Explore Pets category

#### 4) Product packshot → lifestyle
- **Target query:** `AI product photography prompt` / `chatgpt product photo lifestyle`
- **H2s:** Packshot vs lifestyle; Lighting language; Surface/background controls; Related styles
- **Internal links:** `/styles/pure-white-packshot`, `/styles/soft-daylight-lifestyle`, `/styles/editorial-flat-lay`, `/styles/color-pop-pedestal`
- **CTA:** Copy Pure White Packshot / Soft Daylight Lifestyle

#### 5) How we test prompts (E-E-A-T)
- **Target query:** `tested AI image prompts` / brand + methodology
- **H2s:** Our standard (source + result + verify); What we refuse to publish; How often we re-check; How to report a bad recipe
- **Internal links:** `/about`, `/contact`, `/how-it-works`, `/explore`
- **CTA:** Contact `hello@aipromptgrid.com` / browse catalog

---

## F) Quick wins to ship this week (max 8)

1. **Remove** `alternates.canonical: "/"` from `src/app/layout.tsx`; add self-canonicals on explore + how-it-works.
2. **Deploy** `/about` + `/contact` + footer links + sitemap static entries.
3. **Deploy** style `generateMetadata` + JSON-LD from `styles/[slug]/page.tsx`.
4. **Isolate** `useSearchParams` so style/explore SSR HTML includes H1 + summary + images (kill `BAILOUT` empty main).
5. **Add** Organization + WebSite JSON-LD on the root layout.
6. **Add** default `openGraph.images` (brand OG) on root metadata.
7. **Fix** `not-found.tsx` title to `"Page not found"` (avoid double brand).
8. **Connect** Google Search Console + submit sitemap (off-site, same week).

---

## Scoring appendix — falsifiability summary

Every Critical/High item above includes a concrete “how we know it failed” check. Re-run this audit after Week 1 deploy by:

```text
1. curl -sI /about /contact /sitemap.xml
2. curl -s /styles/intimate-cinematic-portrait | findstr /C:"canonical" /C:"BAILOUT" /C:"application/ld+json" /C:"<title>"
3. Playwright: confirm title ≠ "AI Prompt Grid" alone on style URLs
4. GSC (once live): Coverage + canonical consistency sample of 10 style URLs
```

**Projected scores if Week 1 ships cleanly:** SEO ~55–60; AdSense readiness ~45–50 (still needs guides).  
**Projected after Weeks 3–4 guides:** SEO ~68–75; AdSense readiness ~65–70 (apply only after policy self-check).

---

## Credentials / Tier 1 setup checklist

- [ ] Google Search Console property verified for `aipromptgrid.com`
- [ ] Sitemap submitted
- [ ] GA4 (or Matomo) with measurement ID in env
- [ ] Optional: PageSpeed API key to avoid 429s
- [ ] Optional: Bing Webmaster

Until then, do not invent indexation or CWV field metrics.

---

*Audit artifacts: live fetches 1 Oct 2026; Playwright rendered checks on home, explore, three style URLs; codebase review of App Router SEO surfaces. Specialist subagents were launched in parallel; this report is grounded in primary live evidence and may be amended if Tier 1 API access is added.*
