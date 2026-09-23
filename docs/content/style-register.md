# Style register — V0 beta

Every beta style needs a complete row before status moves to **published**.

**Live content:** after Supabase is seeded, create and edit styles in **`/admin`** (editor role). This register remains the planning checklist (owners, licence, tool/mode notes). Prototype seeds in code are **bootstrap only** — see `docs/PHASE_8_STATUS.md`.

Prototype table rows below may still say draft until owners complete testing, licensed evidence, and exact tool/mode records.

## Controlled vocabularies

**Categories:** Cinematic · Anime · Painting · Vintage · Professional portraits · Fantasy · Pets · Travel · 3D avatars · Product and objects  

**Subjects:** Person · Group · Pet · Place · Product or object  

**Edit intents:** Change lighting · Change background · Artistic restyle · New outfit or theme · Full scene transformation  

**Input requirements:** One photo · Photo plus style reference  

**Tools (initial):** ChatGPT Image · Gemini · Flux · Other AI editor  

**Status:** `draft` · `in_review` · `published` · `archived`

## Required fields per style

| Field | Content |
|---|---|
| Title + slug | Unique user-facing title and URL slug |
| Category + tags | Controlled category, subject, intent, tool |
| Target source photo | e.g. clear frontal selfie, pet close-up, landscape |
| External tool + mode | Exact tool, mode, input count/order |
| Prompt variant | Template, defaults, variables, version |
| Changes / preservation | What changes; what must stay recognizable |
| Evidence | ≥2 authorised before/after pairs |
| Test record | 3 source-photo tests per supported subject; limitations; test date |
| Owner + status | Named owner; draft → published |

## Beta mix rule

Personal photo transformation leads the list. Product imagery may appear (≤ ~1–2 of first 12–20) and must not dominate.

## Initial register (from prototype — all draft)

| # | Title | Slug | Category | Subject | Intent | Requirement | Tool (proposed) | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Cinematic Window Portrait | `cinematic-window` | Cinematic | Person | Change lighting | One photo | ChatGPT Image | *TBD* | draft |
| 2 | Dreamy Golden Hour | `golden-hour` | Cinematic | Person | Change lighting | One photo | Gemini | *TBD* | draft |
| 3 | Vintage Film Snapshot | `vintage-film` | Vintage | Group | Artistic restyle | One photo | ChatGPT Image | *TBD* | draft |
| 4 | Soft Watercolor Portrait | `watercolor-portrait` | Painting | Person | Artistic restyle | Photo plus style reference | Other AI editor | *TBD* | draft |
| 5 | Studio Professional Headshot | `professional-headshot` | Professional portraits | Person | Change background | One photo | ChatGPT Image | *TBD* | draft |
| 6 | Anime Street Portrait | `anime-street` | Anime | Person | Full scene transformation | One photo | Gemini | *TBD* | draft |
| 7 | Clay 3D Avatar | `clay-avatar` | 3D avatars | Person | Artistic restyle | One photo | Flux | *TBD* | draft |
| 8 | Fantasy Forest Explorer | `forest-explorer` | Fantasy | Person | New outfit or theme | One photo | Gemini | *TBD* | draft |
| 9 | Painted Pet Portrait | `painted-pet` | Pets | Pet | Artistic restyle | One photo | ChatGPT Image | *TBD* | draft |
| 10 | Cinematic Travel Postcard | `travel-postcard` | Travel | Place | Change lighting | One photo | Flux | *TBD* | draft |
| 11 | Editorial Fashion Look | `editorial-fashion` | Professional portraits | Person | New outfit or theme | Photo plus style reference | Other AI editor | *TBD* | draft |
| 12 | Minimal Product Studio Shot | `product-studio` | Product and objects | Product or object | Change background | One photo | ChatGPT Image | *TBD* | draft |
| 13 | South Asian Fashion Editorial | `south-asian-fashion-editorial` | Professional portraits | Person | New outfit or theme | One photo | ChatGPT Image | *TBD* | published |
| 14 | Urban Street Fashion Editorial | `urban-street-fashion-editorial` | Cinematic | Person | Full scene transformation | One photo | ChatGPT Image | *TBD* | published |
| 15 | Joyful Outdoor Lifestyle | `joyful-outdoor-lifestyle` | Cinematic | Person | Artistic restyle | One photo | ChatGPT Image | *TBD* | published |
| 16 | Vintage Pulp Comic Hero | `vintage-pulp-comic-hero` | Vintage | Person | Artistic restyle | One photo | ChatGPT Image | *TBD* | published |
| 17 | Intimate Cinematic Portrait | `intimate-cinematic-portrait` | Cinematic | Person | Change lighting | One photo | ChatGPT Image | *TBD* | published |
| 18 | Travel Fashion Bouquet | `travel-fashion-bouquet` | Travel | Person | Full scene transformation | One photo | ChatGPT Image | *TBD* | published |
| 19 | Dark Crowd Editorial | `dark-crowd-editorial` | Cinematic | Person | Full scene transformation | One photo | ChatGPT Image | *TBD* | published |
| 20 | South Asian Editorial Collage | `south-asian-editorial-collage` | Professional portraits | Person | Artistic restyle | One photo | ChatGPT Image | *TBD* | published |
| 21 | Analog Street Fashion | `analog-street-fashion` | Vintage | Person | New outfit or theme | One photo | ChatGPT Image | *TBD* | published |

Additional person editorial styles **22–42** (templates 10–30) live in `src/lib/catalog/seed-editorial-styles-10-30.ts` — Golden Motion Glamour through Meadow Reverie.

## Detail sheet template (copy per style when testing)

```markdown
### [Title] (`slug`)

- Owner:
- Status: draft
- Category / subject / intent / requirement:
- Target source photo:
- Tool + mode + input order:
- Prompt variant version:
- Prompt template:
- Defaults / variables:
- What changes:
- What stays recognizable:
- Limitations:
- Evidence pair 1 (paths + licence):
- Evidence pair 2 (paths + licence):
- Test photos (3) + dates + outcomes:
- Last verified:
```

## Open actions before Phase 2 publish

- [ ] Assign an owner/tester to each of the 12 styles (add 0–8 more if beta expands toward 20)
- [ ] Record exact external tool **mode** and input image rules per style
- [ ] Replace Picsum placeholders with authorised before/after assets
- [ ] Complete three source-photo tests per supported subject type
- [ ] Decide whether watercolor / editorial “style reference” workflows stay in V0 beta
