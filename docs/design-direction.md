# Design Direction — AIPromptGrid v1

**Status:** Draft for approval (Phase 0)  
**Product:** AIPromptGrid  
**Last updated:** 2026-09-12  
**Related:** [brand-positioning.md](./brand-positioning.md) · [ia-sitemap.md](./ia-sitemap.md)  
**Competitor + structure reference:** [proxima.art](https://proxima.art/) — IA/section patterns only; not a visual or brand clone ([competitor-proxima.md](./competitor-proxima.md))

---

## 1. Visual north star

**Gallery-led prompt library** — calm, creative, global. Feels like browsing a curated lookbook of styles, then copying a prompt. Not a purple SaaS dashboard, not a noisy meme feed.

**Keywords:** clear grid, strong photography, spacious type, confident platform voice.

**vs Proxima:** Match *familiarity* of Featured / Explore section rhythm and creative-platform confidence. Do **not** match their logo, color system, model branding, or generator-hero layout. Our hero CTA is Explore / copy-oriented, not “Start Generating.”

---

## 2. Hard rules (from product + frontend taste)

1. **Brand first** on home — “AIPromptGrid” is hero-level, not only nav.  
2. **One composition** in the first viewport: brand + one headline + one short line + one CTA group + one dominant visual.  
3. **No decorative card stacks** in the hero; grids are for browsing styles (interaction).  
4. **No blurred fake premium UI.**  
5. **Avoid** default AI looks: purple-on-white gradients, cream+terracotta editorial cliché, broadsheet hairline newspaper layouts, glow soup, emoji clutter.  
6. Mobile and desktop both first-class.

---

## 3. Direction choice (locked for v1)

**Name:** *Graphite Gallery*

| Token | Direction |
| --- | --- |
| Mood | Modern gallery / creative tool |
| Base | Soft warm-gray or cool stone page ground (not flat pure white void, not pure black app) |
| Surface | Slight tonal shifts, subtle grain or soft gradient atmosphere — imagery carries the emotion |
| Accent | Single sharp accent (e.g. deep teal or ink blue) for CTAs/links — not purple |
| Type | Distinctive pairing: editorial sans for UI + characterful display for brand/hero (no Inter/Roboto/Arial as primary) |
| Imagery | Full-bleed or edge-dominant hero photography; style grid thumbnails are the product |

---

## 4. CSS variable sketch

Implemented in Phase 1 (`src/app/globals.css`):

```css
:root {
  --color-bg: #e6e3dc;
  --color-bg-elevated: #f1eee7;
  --color-bg-deep: #1c1f1e;
  --color-ink: #161918;
  --color-ink-muted: #5a605c;
  --color-accent: #0c6b6b; /* deep teal */
  --color-accent-contrast: #f7f5f0;
  --color-border: #cfcabf;
  --font-display: Fraunces;
  --font-body: Figtree;
  --radius-sm: 0.375rem;
  --space-section: clamp(4.5rem, 10vw, 7.5rem);
}
```

---

## 5. Layout patterns

| Surface | Pattern |
| --- | --- |
| Home hero | Full-bleed visual plane; brand + copy + CTA over or beside with strong hierarchy |
| Featured / Explore | Responsive image grid; title + model tags under or on hover — keep chrome light |
| Style detail | Proof pair prominent; prompt in a clear readable block; Copy as primary action |
| Categories | Simple concept index → grid |
| Admin | Dense, utilitarian; no marketing hero |
| Waitlist | Minimal: headline, one sentence, form |

---

## 6. Motion (2–3 intentional)

1. **Home:** subtle hero fade/rise of brand + CTA (once).  
2. **Explore:** light image reveal or stagger on grid enter (respect `prefers-reduced-motion`).  
3. **Copy:** micro feedback (button label → “Copied”).  

No scroll-jacking, no constant parallax noise.

---

## 7. Component inventory (v1)

- Site header / footer  
- Style card (grid)  
- Filter bar (search, category, model)  
- Before/after pair  
- Prompt block + Copy button  
- Favorite control  
- Auth forms  
- Waitlist form  
- Admin table + style form + uploader  
- Empty states  

---

## 8. Approval checklist

- [ ] *Graphite Gallery* direction OK (or name an alternative before Phase 1)  
- [ ] Accent family preference: teal vs ink-blue (optional note)  
- [ ] Motion scope OK  
