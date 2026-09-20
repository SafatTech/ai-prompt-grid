# UI Handoff — AI Prompt Grid V0

**Source of truth:** `prototype/index.html` (visual and interaction reference, not production code)  
**Approved hero decision:** film-strip artwork as the **single** right-side hero visual; left text area stays dark. Do **not** place a portrait background behind floating mini-cards.

---

## Screens

### 1. Home (`/`)

| Region | Content |
|---|---|
| Hero | Eyebrow, headline (“Find a look. Keep your story.”), one supporting sentence, two CTAs (Explore styles / How it works). Right side: **one** film-strip visual only. |
| Trending | Six style cards with before/after compare + save control. |
| Categories | Horizontal chip strip routing into Explore with that category selected. |
| Benefits | Three benefit blocks (see result first / right prompt / save favorites). |
| How it works | Three numbered steps clarifying that transformation happens in an external editor. |

### 2. Explore (`/explore`)

| Region | Content |
|---|---|
| Header | Title, short description, search field. |
| Filters (desktop) | Sticky left rail: category, subject, edit intent, input requirement, tested tool. Clear all. |
| Filters (mobile) | Bottom drawer opened by Filters button. |
| Results | Count, sort (Trending / Newest / Most saved), masonry-style style grid. |
| Empty | Dashed empty state with clear-filters CTA. |

### 3. Style detail (`/styles/[slug]`)

| Region | Content |
|---|---|
| Top | Back control, breadcrumb, Save style, Share. |
| Compare | Large before/after slider with Source / AI result labels. |
| Content column | Badges, title, lead, Best source photo, What changes, What should stay recognizable + honesty warning. |
| Prompt panel (sticky desktop) | Mood / background / ratio controls, clothing & pose toggles, live prompt box, Copy prompt, Save to collection, Save your result, Try another style, external-tool guide. |
| Below | More examples (paired grids), related styles, permission note. |

### 4. Sign-in (modal or `/sign-in`)

- Continue with Google  
- Email magic link  
- Continue as guest  
- After auth, restore the pending action (save style / save result / open library).

### 5. My Library (`/library`) — signed-in only

Tabs:

1. **Saved styles** — grid of saved cards or empty state.  
2. **Collections** — collection cards + create collection; move saved styles into collections.  
3. **My creations** — result (+ optional source), style name, date, notes, prompt snapshot, download, delete.

Guests hitting Library see a sign-in empty state.

---

## Layout notes

### Desktop (≥1120px)

- Max content width ~1380px.  
- Header: logo, nav (Explore / Categories / How it works), search, Sign in or avatar.  
- Home hero: two columns (~0.9 / 1.1).  
- Explore: 260px filter rail + results.  
- Detail: content + ~440px sticky prompt panel.  
- Style grid: 3 columns with staggered vertical offset on middle column.

### Tablet (≤1120px)

- Header search hidden.  
- Style grid: 2 columns.  
- Detail prompt panel ~390px.

### Mobile (≤860px / ≤640px)

- Hamburger drawer for nav.  
- Hero stacks; film-strip below copy.  
- Explore filters move to bottom drawer.  
- Detail stacks; prompt panel becomes static and remains easy to reach.  
- Library collections / creations go to 1 column.  
- No horizontal overflow at **360px**.

---

## Components to preserve in Phase 1

| Component | Notes |
|---|---|
| Site header / nav | Sticky, blurred dark surface, active link state |
| Logo / grid mark | 3×3 mark with violet accents |
| Search | Header quick search + Explore search panel |
| Category chips | Pill chips; active = violet tint |
| Style card | Compare media, save heart, badges, title, note |
| Compare display | Range-driven clip-path slider; accessible label; Source/Result labels |
| Prompt panel | Controls, toggles, monospace prompt box, action grid |
| Buttons | Primary (violet), secondary, ghost, danger |
| Empty states | Icon + title + copy + CTA |
| Library cards | Collection preview stack; creation before/after + snapshot |
| Modals | Sign-in, create collection, save result, external-tool info |
| Toasts | Success / error bottom-right |

Primary interactive controls should expose stable `data-testid` values in implementation (copy prompt, save style, filters, sign-in, upload).

---

## Design tokens (from prototype)

```css
--bg: #0B0B10;
--surface: #15151E;
--surface-2: #1D1D29;
--text: #F5F3EE;
--muted: #A6A4B2;
--violet: #8B6CFF;
--violet-dark: #7254E8;
--peach: #FF9B82;
--mint: #67D8B2;
--danger: #FF7C8E;
--line: rgba(255,255,255,.10);
--line-strong: rgba(255,255,255,.18);
--shadow: 0 24px 70px rgba(0,0,0,.32);
--radius: 18px;
--pill: 999px;
--max: 1380px;
--header: 72px; /* 64px on small screens */
```

| Token area | Value / rule |
|---|---|
| Page background | `#0B0B10` with optional soft violet radial wash |
| Surfaces | `#15151E` / `#1D1D29` |
| Borders | `--line` / `--line-strong` |
| Text | Primary `#F5F3EE`, muted `#A6A4B2`, accent text `#A995FF` |
| Accent | Violet `#8B6CFF` (primary buttons, active chips, focus) |
| Radius | Cards/panels 18px; controls 10–14px; chips pill |
| Shadows | Large soft black shadows on modals and detail compare |
| Grid spacing | Style grid gap ~18px; section padding ~64–88px |
| Type | Large display headlines with tight tracking; body ~16–19px |
| Focus | `outline: 3px solid rgba(139,108,255,.42); outline-offset: 3px` |

**Typography note for Phase 1:** replace the prototype’s system UI stack with intentional brand fonts while keeping scale and weight hierarchy.

---

## Hero decision (final)

| Do | Don’t |
|---|---|
| Keep left copy on dark background | Place `hero-background*.png` portrait wash behind floating cards |
| Use **one** film-strip artwork on the right | Stack four rotated mini before/after cards as the hero visual |
| Keep CTAs to Explore + How it works | Add stats, promos, or upload CTA implying onsite generation |

Prototype currently still shows the old floating-card hero plus background image. Phase 1 must ship the approved film-strip treatment.

---

## Asset inventory / licence record

| Asset | Location | Intended use | Ownership / licence | Status |
|---|---|---|---|---|
| Logo / grid mark | CSS in prototype | Brand mark | Original product mark | OK to recreate in code |
| Favicon | Inline SVG in prototype | Browser icon | Original | OK |
| Hero film-strip | *TBD — replace current floating cards* | Home hero right visual | Must be owned or licensed | **Needed** |
| `hero-background1–5.png` | `prototype/` | Deprecated hero experiments | Unclear | **Do not ship** until licence confirmed; prefer remove from production path |
| Catalog before/after examples | Prototype uses Picsum seeds | Style cards + detail | Placeholder only | **Replace** with authorised pairs before public beta |
| Category / UI icons | Unicode / CSS shapes in prototype | Decorative | Original | OK |

Editors must record provenance (creator, permission, commercial use, model release if identifiable people) for every published catalog pair before status moves to **published**.
