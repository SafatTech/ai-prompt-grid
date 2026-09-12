# PRD — AIPromptGrid v1

**Status:** Draft for approval (Phase 0)  
**Product:** AIPromptGrid  
**Last updated:** 2026-09-12  
**Related:** [brand-positioning.md](./brand-positioning.md) · [competitor-proxima.md](./competitor-proxima.md)  
**Competitor + reference:** [proxima.art](https://proxima.art/)

---

## 1. Summary

AIPromptGrid v1 is a **free prompt library** for AI photo styles. Visitors browse a grid of styles (Proxima-like Explore / Featured patterns), open a style, see before/after proof, copy a tested prompt, and optionally sign in to favorite styles. Admins publish and update styles via a CMS. Video prompts and in-app generation are honest **waitlist** pages only.

**Success for v1:** 20–30 published styles, working browse → copy loop, accounts + favorites, admin CRUD, waitlists collecting emails — deployed and shareable.

---

## 2. Goals

| Goal | Measure |
| --- | --- |
| Make copying a prompt effortless | One-click copy on every style page; feedback on success |
| Prove each style | Before/after (or equivalent proof images) required to publish |
| Grow via free access | No paywall; browse never gated behind signup |
| Enable fast content ops | Admin can create/edit/publish without a code deploy |
| Capture demand for v2 | Waitlists for video prompts + in-app generator |
| Stay globally welcoming | Brand/hero copy is universal (see brand doc) |

---

## 3. Personas

| Persona | Needs |
| --- | --- |
| **Visitor** | Discover a look, understand the result, copy a prompt that works |
| **Signed-in user** | Save favorites; return later |
| **Admin** | Add/update styles, upload images, publish or unpublish, organize categories |

---

## 4. User stories

### 4.1 Browse

| ID | Story | Acceptance criteria |
| --- | --- | --- |
| US-B1 | As a visitor, I want to see featured styles on the home page so I can start exploring quickly. | Home shows a Featured styles section with at least title + thumbnail; link to full explore. |
| US-B2 | As a visitor, I want to explore all styles in a grid so I can scan many looks. | `/styles` (or equivalent) lists published styles as a visual grid; pagination or infinite load if catalog grows. |
| US-B3 | As a visitor, I want to explore by style / concept (category) so I can narrow to a look family. | Categories are listed and link to filtered views; empty categories show a calm empty state. |

### 4.2 Filter

| ID | Story | Acceptance criteria |
| --- | --- | --- |
| US-F1 | As a visitor, I want to filter by category so I only see relevant styles. | Selecting a category updates the grid to matching published styles. |
| US-F2 | As a visitor, I want to filter by model (e.g. Gemini, ChatGPT) so I know where to paste. | Model tags are filterable; styles can have multiple models. |
| US-F3 | As a visitor, I want to search by name/keywords so I can find a known look. | Text search matches title (and optional short description/tags); no results → helpful empty state. |
| US-F4 | As a visitor, I want filters to combine without breaking the page. | Category + model + search work together; clear “reset filters” control. |

### 4.3 Open style

| ID | Story | Acceptance criteria |
| --- | --- | --- |
| US-O1 | As a visitor, I want to open a style page so I can see proof and the full prompt. | Unique URL per style (`/styles/[slug]`); shows title, images, prompt, model tags, category. |
| US-O2 | As a visitor, I want to see before/after so I trust the prompt. | At least one before and one after (or labeled proof pair) visible above or beside the prompt. |
| US-O3 | As a visitor, I want related or similar styles so I can keep browsing. | Detail page shows a small related set (same category or featured fallback). |
| US-O4 | As a visitor, I want draft/unpublished styles hidden from the public. | Only `published` styles appear in public lists and are reachable by slug (or 404 if draft). |

### 4.4 Copy prompt

| ID | Story | Acceptance criteria |
| --- | --- | --- |
| US-C1 | As a visitor, I want a Copy button so I can paste the prompt into my AI tool. | One primary Copy control; copies full prompt text to clipboard. |
| US-C2 | As a visitor, I want clear feedback that copy worked. | Button or toast shows “Copied” (or equivalent) after success. |
| US-C3 | As a product owner, I want copy actions counted so I know which styles perform. | Successful copy increments a counter (or analytics event) per style. |
| US-C4 | As a visitor, I want to know which model this prompt was tested on. | Model tags visible near the prompt; no claim of universal model fit. |

### 4.5 Favorite

| ID | Story | Acceptance criteria |
| --- | --- | --- |
| US-V1 | As a signed-in user, I want to favorite a style so I can find it later. | Favorite control on style detail (and optionally grid cards); persists to account. |
| US-V2 | As a signed-in user, I want a favorites list on my account. | `/account` (or similar) lists favorited styles; unfavorite works. |
| US-V3 | As a visitor, if I try to favorite while logged out, I am guided to sign in. | Prompt to sign in/register; after auth, user can complete favorite (best-effort return). |
| US-V4 | As a visitor, I can browse and copy without an account. | No login wall on home, explore, style detail, or copy. |

### 4.6 Waitlist

| ID | Story | Acceptance criteria |
| --- | --- | --- |
| US-W1 | As a visitor, I want to join a waitlist for **video prompts**. | Dedicated coming-soon page; email capture; confirmation message; no blurred fake catalog. |
| US-W2 | As a visitor, I want to join a waitlist for the **in-app image generator**. | Dedicated coming-soon page; same email pattern; honest “coming soon” copy. |
| US-W3 | As a product owner, I want waitlist emails stored and deduped per interest. | Same email can sign up for both interests; duplicate same interest is handled gracefully. |

### 4.7 Admin CRUD

| ID | Story | Acceptance criteria |
| --- | --- | --- |
| US-A1 | As an admin, I want to create a style (draft) so I can prepare content before publish. | Admin form: title, slug, prompt, category, model tags, images, status=draft. |
| US-A2 | As an admin, I want to edit an existing style. | All fields editable; save updates public page only when published. |
| US-A3 | As an admin, I want to publish / unpublish a style. | Status toggle; unpublished disappears from public browse. |
| US-A4 | As an admin, I want to upload before/after images. | Upload to storage; preview in admin; required before publish (enforce in UI and/or validation). |
| US-A5 | As an admin, I want to manage categories. | Create/edit/reorder or list categories used by styles. |
| US-A6 | As an admin, I want to feature a style on the home page. | Featured flag; home Featured section uses it. |
| US-A7 | As a non-admin user, I cannot access admin. | Admin routes redirect or 403 for non-admins. |
| US-A8 | As an admin, I want to delete or archive a style carefully. | Soft-delete or confirm delete; public URL stops resolving. |

---

## 5. Auth (supporting stories)

| ID | Story | Acceptance criteria |
| --- | --- | --- |
| US-AUTH1 | As a visitor, I can register / sign in with email (magic link) and Google. | Supabase Auth; sessions work across pages. |
| US-AUTH2 | As a signed-in user, I can sign out. | Sign out clears session; favorites UI reflects logged-out state. |

---

## 6. Functional requirements (condensed)

1. Public pages: home, styles index, style detail, category views, waitlists, auth, account/favorites, legal (Terms/Privacy — ship with polish phase).  
2. Only published styles are public.  
3. Prompt text is fully visible and copyable for free.  
4. Admin CMS behind role check (`profiles.role = admin`).  
5. Image assets in Supabase Storage (or equivalent).  
6. Copy analytics (counter and/or event).  
7. Responsive layout; works on mobile and desktop.  
8. SEO basics on style pages (title, description, OG image when available).

---

## 7. Explicit non-goals (v1)

Do **not** build these in v1:

| Non-goal | Why deferred |
| --- | --- |
| Payments / premium prompt paywall | Free-first growth; prompts are easily copied |
| In-app image or video generation | Waitlist only; v2 |
| Video prompt library (full) | Waitlist only; v2 |
| Blurred / fake “premium” placeholder pages | Trust and SEO |
| User-submitted prompts / community marketplace | Curation and moderation overhead |
| Public API | Not needed for launch |
| Mobile native apps | Web-first |
| Multi-language UI / i18n | English-first for v1 |
| Complex social (comments, likes public feed, follows) | Favorites only |
| Stripe / Paddle checkout UI | Schema-ready later; no checkout in v1 |
| A/B testing platform, heavy marketing automation | Keep ops simple |
| Model hosting or API keys for generation | No generator yet |
| Country- or culture-led brand positioning | Global messaging (brand doc) |

---

## 8. UX / IA notes (v1)

- **Competitor + reference:** [proxima.art](https://proxima.art/) — see [competitor-proxima.md](./competitor-proxima.md).  
- Follow their Explore / Featured / style-concept patterns and calm platform tone.  
- Differentiate: library + copy is core; their Create/Studio generation is our waitlist until v2.  
- **Brand first** on home; one primary CTA to explore (not “Start Generating”).  
- **No cards-for-decoration** beyond interactive browse surfaces.  
- Coming soon = honest waitlist pages, not fake UI.

Detailed sitemap: [ia-sitemap.md](./ia-sitemap.md).

---

## 9. Launch content target

- **20–30** published styles with proof images and model tags.  
- Catalog list and prompt writing rules live in Phase 0 content docs (separate).

---

## 10. Out of scope tech (v1)

- Payment provider integration  
- Real-time collaboration  
- Multi-tenant / white-label  

Stack locked elsewhere: Next.js + Tailwind + Supabase + Vercel.

---

## 11. Risks & mitigations

| Risk | Mitigation |
| --- | --- |
| Prompts get copied off-site | Accept it; compete on freshness + proof + later generator |
| Empty-looking launch | Require proof images; soft-launch only when catalog hits target |
| Admin misuse / broken publish | Draft default; publish validation (images + prompt required) |
| Waitlist spam | Basic rate limit / honeypot optional; unique email+interest |

---

## 12. Approval checklist

- [ ] User stories cover browse, filter, open, copy, favorite, waitlist, admin CRUD  
- [ ] Non-goals agreed  
- [ ] Auth + favorites never block browse/copy  
- [ ] Proceed to content model, catalog brief, and remaining Phase 0 docs  

Content model: [content-model.md](./content-model.md).
