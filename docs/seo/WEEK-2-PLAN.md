# Week 2 plan — organic depth + AdSense prep (draft only)

**Status:** Planning only — no `/guides` build in this pass.  
**Depends on:** Week-1 SEO fixes (1–5 + OG/not-found) deployed to production.

---

## Goals

1. Stand up a **guides IA** that matches SERP listicle intent (AdSense-friendly original articles).
2. Add **richer crawlable copy** on style pages (SSR, unique per style).
3. Complete **Search Console + Bing** sitemap submission checklist (off-site).

---

## 1) `/guides` information architecture

### URL shape (proposed)

| Route | Purpose |
|-------|---------|
| `/guides` | Index: short intro + card list of published guides |
| `/guides/[slug]` | Long-form article (1,500+ words target) |

Optional later (Week 3+): `/prompts/[category]` hubs. Do **not** block Week 2 on hubs.

### Sitemap / nav

- Add `/guides` (+ each published guide) to `sitemap.ts`.
- Footer link: Guides (next to About).
- Soft CTA from homepage / how-it-works (“Read guides”) — keep hero clean; place below fold.

### Content standards (AdSense + E-E-A-T)

- Bylined or “AI Prompt Grid editorial” with last-updated date.
- Original testing notes (not just pasted prompts).
- Internal links to ≥3 `/styles/...` URLs + `/explore` + `/how-it-works`.
- No “beta / Version 0 / invite-only” language.
- Disclose: transforms happen in external editors; example photos owned/licensed.
- `Article` JSON-LD + self-canonical (no FAQPage for SERP chase).

### First 5 AdSense-friendly articles (ship order)

| # | Slug (proposed) | Title angle | Target intent | Primary style links |
|---|-----------------|-------------|---------------|---------------------|
| 1 | `cinematic-selfie-chatgpt` | Selfie → cinematic portrait with ChatGPT | Informational + how-to | `/styles/intimate-cinematic-portrait`, `/styles/crimson-bloom-shadows`, `/styles/after-hours-polaroid` |
| 2 | `ai-virtual-staging-prompt` | Virtual staging prompts for empty rooms | Commercial | `/styles/modern-virtual-staging`, `/styles/refined-luxury-living`, `/styles/kitchen-remodel-vision` |
| 3 | `ai-pet-portrait-prompts` | Pet portrait prompts + photo tips | Informational | `/styles/funny-everyday-pet`, `/styles/hand-painted-watercolor-pet`, `/styles/cozy-plushie-pet` |
| 4 | `product-photo-ai-prompts` | Packshot → lifestyle product shots | Commercial | `/styles/pure-white-packshot`, `/styles/soft-daylight-lifestyle`, `/styles/editorial-flat-lay` |
| 5 | `how-we-test-prompts` | How AI Prompt Grid tests prompts | Trust / E-E-A-T | `/about`, `/contact`, `/how-it-works`, 2–3 example styles |

**H2 skeleton (all five):** What this solves → Photo checklist → Step-by-step in ChatGPT/Gemini → What stays the same → Common fails → Related styles → CTA (copy prompt / explore).

**Owner split:** Content drafts outlines → Dev scaffolds `/guides` routes → Content fills MD/MDX or CMS fields → Dev wires internal links + schema.

**Effort:** Dev M (scaffold), Content L (5 articles). **Impact:** High for organic + AdSense.

---

## 2) Richer crawlable copy on style pages

### Problem

After Week 1, styles SSR with H1/UI, but unique editorial prose is still thin (~100–150 words outside the prompt).

### Proposed SSR blocks (template + data)

Add server-rendered sections **above** the customize island (or as static HTML siblings):

1. **Opening summary** (40–60 words) — what the style does + tested editor.
2. **Best source photo** (expand existing bullets into a short paragraph if thin).
3. **What changes / what stays** (keep structure; ensure unique bullets per style).
4. **Test notes** (new, 150–250 words) — runs, failures, when to pick related styles.
5. **Photo credit / license line** under examples.

### Implementation sketch (no build this week until approved)

- Prefer new optional Supabase fields: `seo_intro`, `test_notes`, `photo_credit` (nullable).
- Fallback: derive intro from `note` + `description` + `promptVariant.tool` / `lastVerified` so every page has *something* unique in HTML.
- Keep existing visual design; no new card chrome in the hero.

### Priority styles for first content pass

Top of funnel from catalog: intimate cinematic, modern virtual staging, anime squad, a pet style, a product packshot — then batch the rest.

**Owner:** Dev (template) + Content (notes). **Effort:** M. **Dependency:** Week 1 CSR fix (done).

---

## 3) Search Console + Bing checklist (off-site)

### Google Search Console

- [ ] Verify `https://aipromptgrid.com` (DNS or HTML tag / hosting integration).
- [ ] Confirm preferred domain (www vs apex) matches canonicals.
- [ ] Submit sitemap: `https://aipromptgrid.com/sitemap.xml`.
- [ ] URL Inspection on: `/`, `/explore`, `/about`, `/contact`, 3 style URLs — check **user-declared = Google-selected canonical**.
- [ ] Monitor Coverage: “Duplicate, Google chose different canonical” should drop after deploy.
- [ ] Request indexing for `/about`, `/contact`, and 5 priority styles (after deploy + sitemap fetch).
- [ ] (Optional) Link GA4 property once measurement ID is live.

### Bing Webmaster Tools

- [ ] Add & verify site (or import from GSC).
- [ ] Submit same sitemap URL.
- [ ] (Optional later) IndexNow key for faster Bing/AI discovery — not required for Week 2 day-1.

### Pre-submit smoke (production)

- [ ] `/sitemap.xml` 200; includes about, contact, styles; no 404 URLs.
- [ ] `/robots.txt` allows `/` and lists Sitemap.
- [ ] No `BAILOUT_TO_CLIENT_SIDE_RENDERING` on `/explore` or a style URL.
- [ ] Homepage HTML contains Organization + WebSite JSON-LD.
- [ ] Scrub remaining “Version 0” / “private beta” on live `/how-it-works` when deploying content fixes.

### Leading indicators (2–4 weeks)

- Indexed `/styles/*` count rising in GSC.
- Impressions on style titles / guide queries.
- Zero recurring sitemap “Couldn’t fetch”.

---

## Suggested Week-2 sequence

| Day | Focus |
|-----|--------|
| 1–2 | Deploy Week-1 code; GSC + Bing verify + sitemap submit |
| 2–3 | `/guides` scaffold (empty index OK) + Article template |
| 3–5 | Write/publish guides 1–3; style test-notes fields for 5 priority styles |
| 5–7 | Guides 4–5; scrub beta copy; internal linking pass |

---

## Explicitly out of scope for Week 2 build kickoff

- AdSense.js / ads.txt (wait until guides live + trust pages production-stable).
- Category hub URLs at scale.
- CLS image-dimension pass (can parallel if capacity).
- Default OG already handled in polish pass; do not re-do unless branding changes.
