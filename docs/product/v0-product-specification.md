# V0 Product Specification — Markdown summary

**Canonical planning copy:** `docs/AI_Prompt_Grid_V0_Product_Specification.docx`  
**This file:** day-to-day implementation summary. Keep aligned when the Word doc changes.

## Core promise

> “I have a photo and want this look.”

Users browse tested transformation styles, copy a prompt for an external AI image editor, transform their photo there, then may save the result privately in AI Prompt Grid.

## Sign-in boundary

| Action | Guest | Signed-in |
|---|---|---|
| Browse, search, filter, view detail | Yes | Yes |
| Customize and copy prompt | Yes | Yes |
| Save style / collections / creations | No | Yes |

## V0 must-haves

1. Visual catalog with before/after cards and filters  
2. Style detail with requirements, changes, preservation, tested tool/mode  
3. Prompt customize + copy (with clipboard fallback)  
4. Google OAuth + email magic link with return-to-action  
5. Saved styles and named private collections  
6. Private creations (result + optional source, prompt snapshot, delete)  
7. Editorial admin (draft/review/publish/archive) — after public catalog  
8. Access controls, upload limits, privacy-safe analytics, error monitoring  

## Explicit exclusions

- Onsite image generation or AI-editing jobs  
- Video prompts / video uploads  
- Payments, subscriptions, credits, ads  
- Public profiles, galleries, comments, likes, follows  
- Creator marketplace / public prompt submissions  
- Automatic imports from generation tools  

## Initial catalog

- Beta: **12–20** tested styles across personal-photo-led categories  
- Product imagery allowed but must not dominate  
- Every published style needs authorised evidence, tested variant, requirements, limitations  

## Upload policy (proposed)

- Formats: JPEG, PNG, WebP  
- Max **10 MB** per file  
- Cap **25 creations** per user (confirm before launch)  
- Validate bytes/MIME/dimensions; re-encode; strip metadata  
- Private by default; separate storage from public catalog  

## Stack

Next.js + TypeScript + App Router + Tailwind + Supabase (Auth, Postgres, Storage) + Vercel + Zod.

## Routes

| Route | Purpose |
|---|---|
| `/` | Home |
| `/explore` | Catalog browse |
| `/styles/[slug]` | Style detail + prompt |
| `/how-it-works` | External-tool explanation |
| `/sign-in` | Auth entry |
| `/library` | Saved / collections / creations |
| `/creations/[id]` | Owner-only creation detail |
| `/admin` | Editorial (role-protected) |

## Functional requirements (IDs)

| ID | Requirement |
|---|---|
| FR01 | Guest browse |
| FR02 | Search + combine filters |
| FR03 | Authentic before/after + recipe fields |
| FR04 | Customize/copy prompt |
| FR05 | Google + magic link with return action |
| FR06 | Save styles + collections |
| FR07 | Private creation with snapshot |
| FR08 | Delete source and/or creation |
| FR09 | Editorial lifecycle + deny ordinary users |
| FR10 | Empty/loading/failure states with next actions |

## Beta gate (diagnostic)

- 12 photo-owner task sessions  
- 8/12 finish without help; 6 create a keepable result within 3 attempts  
- Cross-account access denied; auth recovery works; uploads/quotas documented  

## Delivery phases after Phase 0

1. UI port (mock data)  
2. Public catalog + copy  
3. Data integration  
4. Accounts + library  
5. Private creations  
