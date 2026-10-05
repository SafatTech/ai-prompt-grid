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

## Live register (all subject packs)

- Person editorial templates **1–47** (Halloween **31–35**, Diwali **36–47** in `seed-halloween-styles.ts` / `seed-diwali-styles.ts`)
- Product templates **1–10** (`seed-product-styles.ts`)
- Group templates **1–10** (`seed-group-styles.ts`)
- Place templates **1–10** (`seed-place-styles.ts`)
- Pet templates **1–9** (`seed-pet-styles.ts`) — Cute 3D Toon Pet through Dreamy Memorial Portrait

Product preserve: **Product details & genuine packaging** / **Camera angle & framing**.  
Group preserve: **Identities & facial features** / **Group arrangement & pose**.  
Place preserve: **Structural layout** / **Camera perspective**.  
Pet preserve: **Pet identity and distinctive markings** / **Original pose and composition**.

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
