# Competitor & Reference — Proxima Pictures

**Status:** Locked for v1 planning  
**Primary competitor + UX/IA reference:** [proxima.art](https://proxima.art/)  
**Last updated:** 2026-09-12  
**Product:** AIPromptGrid

---

## 1. How we treat Proxima

| Role | Meaning for AIPromptGrid |
| --- | --- |
| **Competitor** | Same market: AI creative platform users who want images, styles, and prompts. We compete for attention, SEO, and habit (“where do I go for a look?”). |
| **Reference** | We deliberately mirror their **information architecture**, **nav mental model**, **section tone**, and **explore-by-style** patterns so the product feels familiar and credible. |

We do **not** clone their brand, visuals, copy, models, or generator-first product.

---

## 2. What Proxima does (observed)

From [proxima.art](https://proxima.art/):

| Area | Their pattern |
| --- | --- |
| Positioning | AI platform for generating **video & images** — “Creativity Without Limits” |
| Primary CTA | **Start Generating** / Studio — generation is the core product |
| Nav split | **Create** (Images/Video, Studio Packs) vs **Explore** (Models, Prompt Library, Usage Guide) |
| Home sections | Hero → Featured Images → Featured Videos → **Explore AI Prompts by Style / Concept** (large tag cloud with counts) |
| Auth | Sign in / Register in header |
| Footer | Gallery, legal cluster (ToS, Privacy, Cookie, GDPR, DMCA, AI Policy), social, contact |
| Prompt library | One explore surface among many; supports the generator ecosystem |

---

## 3. What we copy as reference (must follow)

Use these on AIPromptGrid so we stay aligned with the competitor’s UX language:

| Pattern | Our v1 implementation |
| --- | --- |
| **Create vs Explore** nav | Explore = live library; Create = waitlists (Video prompts, Image generator) until v2 |
| **Featured** gallery strip | Home “Featured styles” with “Explore all” |
| **Explore by style / concept** | Categories index + chips/tiles + `/categories/[slug]` |
| **Sign in / Register** | Header auth entry points |
| **Calm platform tone** | Confident, creative, short section labels — not meme hype |
| **Prompt Library as first-class** | For us it *is* the product; for them it’s Explore sub-nav — we elevate it |
| **Legal in footer** | Privacy + Terms at minimum |

---

## 4. How we differentiate (must not become a Proxima clone)

| Dimension | Proxima | AIPromptGrid v1 |
| --- | --- | --- |
| Core job | Generate images/video in-platform | **Browse → copy prompt** into external tools |
| Prompt library | Supporting explore surface | **Main product** |
| Generation | Live (Aurelia, Veritas, Flux, Wan, SD, etc.) | **Waitlist only** |
| Videos | Featured videos on home | Waitlist page only |
| Catalog scale | Huge style/concept cloud (hundreds of tags) | **Curated ~24** at launch; grow with quality |
| Proof | Gallery of generated art | **Before/after required** per style |
| Monetization | Platform/generation business | **Free library**; credits later with generator |
| Brand | Proxima Pictures | **AIPromptGrid** — Graphite Gallery look, not their visual ID |

---

## 5. Competitive implications for v1

1. **Familiarity wins.** Someone who has used Proxima should understand our nav in seconds (Create / Explore / Sign in).  
2. **We win on clarity of the copy loop.** Faster path from style → full prompt → clipboard than a generation mega-platform.  
3. **We do not pretend to be a studio yet.** Honest waitlists beat fake “Create” that 404s or blurs.  
4. **SEO / content.** Compete on individual style pages (“vintage film portrait prompt”) and freshness, not on matching their entire tag cloud on day one.  
5. **Later parity.** In-app generator + video prompts (v2+) move us closer to their Create surface — still under our brand and free-library funnel.

---

## 6. Checklist for every new feature / page

Before shipping UI or copy, ask:

- [ ] Does this match Proxima’s **Explore / Featured / style-concept** clarity where relevant?  
- [ ] Are we accidentally cloning their **generator-first** home or brand look?  
- [ ] Is Create honest (live vs waitlist)?  
- [ ] Would a Proxima user feel oriented — and still see why AIPromptGrid is different (copy-ready styles + proof)?

---

## 7. Doc cross-links

All Phase 0 docs must treat Proxima as **competitor + reference**. Detail lives here; other docs point here.

| Doc | Alignment |
| --- | --- |
| [brand-positioning.md](./brand-positioning.md) | Tone + messaging vs Proxima |
| [ia-sitemap.md](./ia-sitemap.md) | Nav and section IA |
| [prd-v1.md](./prd-v1.md) | Goals / non-goals vs their Create core |
| [design-direction.md](./design-direction.md) | Structure yes, visual identity no |
| [content-model.md](./content-model.md) | Style/concept taxonomy (curated, not megacloud) |
