# Admin style fields → client map

Quick reference for `/admin/styles/new` and `/admin/styles/[slug]/edit`.  
**Publish the style** (admin list) before guests see it on Explore / style detail.

---

## Identity

| Admin field | What to write | Client location |
|---|---|---|
| **Title** | Public name, e.g. `Cinematic Window Portrait` | Style cards, detail headline, breadcrumb, library, share text |
| **Slug (URL)** | Lowercase URL key, e.g. `cinematic-window` | URL: `/styles/your-slug`. Locked after first non-draft publish |

---

## Taxonomy

| Admin field | What to write | Client location |
|---|---|---|
| **Category** | One of the fixed categories (Cinematic, Anime, …) | Explore filter **Category**; badge on style detail; breadcrumb |
| **Subject** | Person / Group / Pet / Place / Product or object | Explore filter **Photo subject**; badge on style **card** and detail |
| **Edit intent** | Change lighting, Artistic restyle, etc. | Explore filter **Edit intent** only (not shown as a card badge) |
| **Input requirement** | `One photo` or `Photo plus style reference` | Explore filter **Input requirement**; badge on style detail |
| **Tool (card badge)** | ChatGPT Image / Gemini / Flux / Other… | Badge on style **card** and detail; synced with variant Tool below |

---

## Copy

| Admin field | What to write | Client location |
|---|---|---|
| **Card note** | One short line under the title on cards | Style card subtitle (`style.note`) |
| **Description** | 1–2 sentences about the look | Style detail lead paragraph |
| **Target source photo** | One line: what photo to use | Style detail meta line: “Target photo: …” |
| **Best source photo** | Checklist, one tip per line | Style detail section **Best source photo** |
| **What changes** | Short labels, one per line | Style detail section **What changes** |
| **What stays** | Short labels, one per line | Style detail section **What should stay recognizable** |

---

## Primary prompt variant

| Admin field | What to write | Client location |
|---|---|---|
| **Tool** | Same list as card tool (kept in sync) | Detail prompt panel (“copy to …”), how-to steps, analytics |
| **Mode** | Exact editor mode you tested, e.g. `Image edit` | Detail badge `Mode: …` and “Open {tool} in {mode}” |
| **Version** | Prompt version label, e.g. `v1` | Detail meta: “Prompt v…” |
| **Last verified** | Date string, e.g. `2026-09-20` | Detail meta: “Last verified …” |
| **Template** | Full prompt with `{{mood}}` `{{background}}` `{{ratio}}` `{{preserve}}` (optional `{{subject}}`) | Becomes the live prompt box after user options fill placeholders |
| **Default mood / background / ratio** | Starting dropdown values | Initial values on detail **Customize this prompt** controls |
| **Default: keep clothing / pose** | Starting toggle state | Initial toggles on detail customize panel |
| **Limitations** | One caveat per line | Style detail section **Limitations** |
| **Live prompt preview** | (admin-only preview) | **Not on client** — editor helper only |

### How to write the Template (placeholders)

The client **Customize this prompt** controls only change text where you put placeholders. If you hard-code a mood, background, or ratio as plain words, changing the dropdowns will leave the prompt unchanged.

Use these tokens exactly (double curly braces):

| Placeholder | Filled from | Inserted as |
|---|---|---|
| `{{mood}}` | Color mood dropdown | Selected mood, lowercased (e.g. `warm neutral`) |
| `{{background}}` | Background dropdown | Selected background, lowercased |
| `{{ratio}}` | Ratio dropdown | Selected ratio label as-is (e.g. `4:5 Portrait`) |
| `{{preserve}}` | Keep clothing / keep pose checkboxes | Comma list of what to keep; includes `pose` and/or `clothing` when those toggles are on |
| `{{subject}}` | Style **Subject** field (optional) | e.g. `person`, `pet` |

**Allowed option values today** (must match these labels when setting defaults):

- **Mood:** Warm neutral, Deep blue, Soft pastel, Black and white, Warm neutral with luminous gold highlights, Deep charcoal, black, and warm amber, Sunlit warm gold with fresh natural greens, Vintage teal, burnt orange, cream, and faded sepia, Muted espresso, charcoal, and warm amber, Luminous golden-hour warmth, Deep teal shadows with burnt-orange highlights, Rich amber-gold with deep brown shadows, Soft sunlit analog warmth with a slightly faded film look  
- **Background:** Softly blurred interior, Window-lit studio, Minimal cream wall, Keep original background, Upscale softly blurred interior with lateral motion blur, Dark luxury urban interior with a moving blurred crowd, Bright outdoor park with mature trees and colorful floating confetti, Retro roadside diner at sunset with a classic red car, Dim artist studio or reading room beside a textured window, Historic European-style cobblestone city street with soft café details, Dense dark city crowd at blue hour with heavy motion blur, Dark indoor room with strong late-afternoon window shadows, Tree-lined city street with parked cars and subtle street motion blur  
- **Ratio:** 4:5 Portrait, 1:1 Square, 9:16 Story  

**Do:** write one reusable sentence around each token. **Don’t:** paste a finished prompt with a specific mood/background/ratio baked in and expect the dropdowns to rewrite it.

Example template:

```text
Edit the uploaded portrait into a polished cinematic editorial look. Use the main person in the source image as the subject. Preserve their {{preserve}}.

Apply a refined treatment with {{mood}} color grading, soft golden highlights, and realistic skin texture. Replace the background with {{background}}, keeping clean edges around hair and clothing. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping important facial features.
```

Use the **Live prompt preview** on the form: change mood / background / ratio / clothing / pose and confirm those spots update before you save and publish. Defaults on the form are only the starting values on the style detail page—they do not replace missing placeholders.

---

## Evidence images

| Admin field | What to write | Client location |
|---|---|---|
| **Card source / result URL** | Before/after for the card (or upload after first save) | Compare slider on style **cards** and main detail compare |
| **Example pair source / result URLs** | ≥2 extra before/after pairs | Detail section **More examples** |
| **Alt source / Alt result** | Accessibility text for examples | `alt` on example images (screen readers; not big visible copy) |
| **File upload** | Optional after style exists | Fills the URL fields; same client locations as URLs above |

---

## Not on this form (or no separate client UI)

| Item | Notes |
|---|---|
| **Status** (draft / publish / …) | Controlled on `/admin` list, not the create form. Drafts are **hidden** from guests. |
| **Card height** | Uses default (~330). No field on the form today; affects card media height if set in DB. |
| **Input image count / roles** | Saved with defaults (`1`, `source photo`). Shown on detail meta / how-to steps, but **not editable fields** on the create form yet. |
| **Author / audit logs** | Server-side only — **no client display**. |

---

## Mental model

1. **Taxonomy + card fields** → discovery (Explore filters + cards).  
2. **Copy sections** → style detail education.  
3. **Template + defaults** → customize/copy prompt panel.  
4. **Images** → card + detail before/after.  
5. **Publish** on the admin list → makes it visible to clients.
