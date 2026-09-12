# Launch Catalog Brief — AIPromptGrid v1

**Status:** Draft for approval (Phase 0)  
**Product:** AIPromptGrid  
**Target:** 24 styles at launch (within 20–30 band)  
**Last updated:** 2026-09-12  
**Related:** [content-model.md](./content-model.md) · [brand-positioning.md](./brand-positioning.md)

---

## 1. Goals

- Ship a **balanced grid**: mostly photo-transformation looks, universal titles.  
- Every style: tested model tag(s), before/after proof, copy-ready prompt.  
- Brand copy stays global; **style titles** may use eras/places when they help the look — without making the whole site feel country-specific.

---

## 2. Prompt writing checklist (per style)

Use when drafting `prompt` + `how_to_use`:

1. State the transformation goal in one clear opening line.  
2. Identity lock (when applicable): face, features, skin tone, likeness unchanged.  
3. What changes: hair, wardrobe, setting, era cues, lighting.  
4. Camera / film language if relevant: grain, focus, color shift, vignette.  
5. Realism: proportions, hands, expression.  
6. Composition: framing, background.  
7. Tag only models actually tested; note paste tips in `how_to_use`.

---

## 3. Launch list (24)

| # | Title | Category slug | Suggested models | Proof notes |
| --- | --- | --- | --- | --- |
| 1 | Vintage Film Portrait | `vintage-film` | gemini, chatgpt | Warm fade, grain, soft focus |
| 2 | 1980s Film Camera Look | `retro-nostalgia` | gemini, chatgpt | Decade look; generic title OK |
| 3 | 1990s Disposable Camera | `retro-nostalgia` | gemini | Flash, date-stamp optional in prompt only |
| 4 | Golden Hour Cinematic | `cinematic` | gemini, chatgpt | Warm sidelight, shallow DOF |
| 5 | Moody Noir Portrait | `cinematic` | chatgpt, midjourney | High contrast B&W or near-B&W |
| 6 | Soft Studio Portrait | `portrait` | gemini, chatgpt | Clean backdrop, beauty light |
| 7 | Editorial Fashion Cover | `fashion` | midjourney, flux | Magazine cover framing |
| 8 | Street Style Daylight | `street-documentary` | gemini | City sidewalk, natural light |
| 9 | Documentary Reportage | `street-documentary` | chatgpt | Gritty, candid, lens imperfections |
| 10 | Viral Selfie Glow-Up | `selfie-transformation` | gemini, chatgpt | Identity lock + polish |
| 11 | Yearbook Portrait Remake | `selfie-transformation` | gemini | Classic school-photo vibe |
| 12 | Polaroid Instant Frame | `vintage-film` | gemini | Instant border / fade (prompt-only frame) |
| 13 | Slide Film Saturation | `vintage-film` | flux, midjourney | Rich but aged color |
| 14 | Rainy Night Cinematic | `cinematic` | chatgpt, midjourney | Reflections, neon optional |
| 15 | Soft Dreamy Portrait | `portrait` | gemini | Haze, gentle bloom |
| 16 | High-Fashion Runway Flash | `fashion` | midjourney | Hard flash, runway energy |
| 17 | Minimal Product Hero | `product-commercial` | flux, chatgpt | Clean product on simple set |
| 18 | Lifestyle Product in Use | `product-commercial` | gemini | Hands/context; keep realistic |
| 19 | Fantasy Portrait Soft Light | `fantasy-surreal` | midjourney | Tasteful, not horror |
| 20 | Surreal Double Exposure | `fantasy-surreal` | midjourney, flux | Artistic blend |
| 21 | Classic Black & White | `portrait` | gemini, chatgpt | Timeless mono |
| 22 | Travel Postcard Film | `retro-nostalgia` | gemini | Vacation snapshot energy |
| 23 | Concert Crowd Flash | `street-documentary` | chatgpt | Low light, motion, flash |
| 24 | Clean LinkedIn Headshot | `portrait` | gemini, chatgpt | Pro headshot; identity lock |

**Archetype for prompt craft:** Style #2 (1980s film camera) follows the same structure as your original long-form example — identity lock, wardrobe/era, film imperfections, scene, realism — without requiring that exact scene in brand messaging.

---

## 4. Production order

1. Draft titles + category + model intent (this list).  
2. Write prompts for batch of 8.  
3. Generate before/after (synthetic/owned).  
4. Upload via admin; publish when validation passes.  
5. Repeat until 24 live.  
6. Pick 6–8 `is_featured` for home.

---

## 5. Explicitly not in launch set

- Adult / exploitative looks  
- Real celebrity “deepfake as X” styles  
- Politics / hate / religious mockery  
- Prompts that remove identity safeguards for non-consensual lookalikes  

---

## 6. Approval checklist

- [ ] 24 titles / categories look right (swap freely before content phase)  
- [ ] Prompt checklist accepted  
- [ ] Featured count target: 6–8 at launch  
