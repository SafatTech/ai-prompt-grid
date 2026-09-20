# AI Prompt Grid Phase 0 Implementation Guide

**Purpose:** complete the product and engineering foundation before building public catalog features.  
**Target outcome:** a build-ready repository, validated product decisions, an approved content plan, and clear acceptance criteria for the functional beta.

## 1. Phase 0 boundaries

Phase 0 is not the public catalog build. It prepares the project so later phases can be implemented without re-deciding the product, content rules, data model, or privacy model.

V0 is a private beta for photo transformation through **external AI editing tools**. A user finds a style, copies a tested prompt, creates the result elsewhere, then can save that result privately in AI Prompt Grid.

Do not include these items in V0:

- Built-in image generation or AI-editing jobs
- Video prompts or video uploads
- Payments, subscriptions, credits, or ads
- Public profiles, galleries, comments, likes, or follows
- Creator marketplace or public prompt submissions
- Automatic imports from image-generation tools

## 2. Definition of done

Phase 0 is complete only when all of the following are true:

- [ ] The V0 product specification is approved.
- [ ] The first 12 to 20 styles are selected and each has an assigned owner/tester.
- [ ] A primary external AI editing tool and its tested mode are identified for each initial style.
- [ ] The approved HTML prototype has an asset inventory and responsive behaviour notes.
- [ ] The Next.js project runs locally with TypeScript, Tailwind, linting, formatting and a minimal test setup.
- [ ] Supabase project environments and the database/storage design are documented.
- [ ] The row-level security ownership rules are written before private user data is stored.
- [ ] The event taxonomy, privacy rules, upload limits and V0 beta metrics are agreed.
- [ ] Phase 1 can begin without unresolved product-scope questions.

## 3. Product decisions to lock

| Decision | V0 decision |
|---|---|
| Core promise | “I have a photo and want this look.” |
| Main flow | Browse style → inspect before/after → customize/copy prompt → use external tool → save result privately. |
| Sign-in boundary | Guests can browse and copy. Sign-in is required only to save a style, collection, or creation. |
| Initial catalog size | 12 to 20 tested styles for beta. |
| Public/private split | Catalog styles and approved examples are public. All user creations and source photos are private by default. |
| Initial upload policy | JPEG, PNG, WebP; proposed maximum 10 MB per file; proposed cap of 25 creations per user. |
| V0 technical stack | Next.js + TypeScript + App Router + Tailwind + Supabase + Vercel + Zod. |

## 4. Work order

### P0.1 Create the repository foundation

Create the repository and these baseline files:

```text
ai-prompt-grid/
  app/
  components/
  lib/
  public/
    catalog/
    brand/
  docs/
    product/
    engineering/
    content/
  supabase/
    migrations/
    seed/
  tests/
    e2e/
    unit/
  .env.example
  README.md
```

Required project rules:

- TypeScript strict mode enabled.
- Use path aliases such as `@/components` and `@/lib`.
- Add ESLint and Prettier before features are added.
- Add a basic Playwright setup early; retain stable `data-testid` values for primary user actions.
- Keep all secrets out of Git. Commit `.env.example` only.
- Use small feature branches and descriptive commits.

Suggested setup commands:

```bash
npx create-next-app@latest ai-prompt-grid --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd ai-prompt-grid
npm install @supabase/supabase-js @supabase/ssr zod clsx tailwind-merge
npm install -D prettier prettier-plugin-tailwindcss @playwright/test
npx playwright install
```

Do not add a separate Express service, Prisma layer, microservices, a queue, or an AI provider SDK in Phase 0.

### P0.2 Record the approved UI handoff

The HTML prototype is the visual reference, not production code. Create `docs/product/ui-handoff.md` with:

- Each current screen: Home, Explore, style detail, sign-in, and My Library.
- Desktop and mobile layout notes.
- Existing components to preserve: navigation, search, category chips, style cards, comparison display, prompt panel, buttons, empty states, and library cards.
- Final hero decision: use the film-strip artwork as the **single** right-side hero visual. Keep the left text area dark. Do not place a portrait background behind additional floating cards.
- Design tokens: page background, surface color, border color, text colors, purple accent, radius scale, shadows, grid spacing, type scale and focus states.
- Asset ownership/licence record for every hero, catalog example, logo and icon.

### P0.3 Finalize the initial style register

Create `docs/content/style-register.md`. Every initial style needs one row before it is implemented.

| Field | Required content |
|---|---|
| Style title and slug | Unique user-facing title and URL slug. |
| Category and tags | Controlled category, subject, edit-intent and tool tags. |
| Target source photo | Example: one clear frontal selfie, pet close-up, landscape. |
| External tool and mode | Exact tool, mode and required number/order of input images. |
| Prompt variant | Tested prompt text, defaults, variables and version. |
| Changes and preservation | What changes; what needs to remain recognizable. |
| Evidence | At least two authorised before/after pairs. |
| Test record | Three source-photo tests per supported subject type, limitations and test date. |
| Owner and status | Draft, in review, published or archived. |

The first beta should cover multiple personal-photo use cases. Product imagery should be present as a category but must not dominate the list.

### P0.4 Define the data and storage contract

Create `docs/engineering/data-model.md` and design these entities before writing migrations:

```text
profiles
categories
tags
styles
style_tags
prompt_variants
style_assets
saved_styles
collections
collection_items
creations
reports
audit_logs
```

Non-negotiable rules:

- `saved_styles` has a unique `(user_id, style_id)` constraint.
- A `creation` stores `owner_id`, `style_id`, `prompt_variant_id`, `prompt_snapshot`, `tool_used`, `result_storage_key`, optional `source_storage_key`, notes and timestamps.
- Never replace a historical prompt snapshot after a public recipe changes.
- Archiving a style must not remove an existing private creation.
- Public catalog assets and private user assets must not share a delivery path.

Plan two storage buckets or equivalent boundaries:

```text
catalog-public/      # published before/after examples only
user-creations/      # private result, optional source and thumbnails
```

### P0.5 Write access-control rules before implementation

Create `docs/engineering/access-control.md` with this matrix:

| Resource | Guest | Signed-in user | Editor/Admin |
|---|---|---|---|
| Published styles and catalog images | Read | Read | Read and manage |
| Draft or archived styles | Denied | Denied | Manage according to role |
| Saved styles and collections | Denied | Own records only | No routine access |
| Creations, source files and result files | Denied | Own records/files only | Only if a documented support process is later added |
| Editorial audit records | Denied | Denied | Read/manage according to role |

Implement the policy principle in every later phase: **database rules and storage rules must agree**. Changing an ID in a request must never allow a user to read, edit, download or delete another user’s content.

### P0.6 Prepare environments and configuration

Create separate development and production Supabase/Vercel environments. Add these placeholders to `.env.example`:

```dotenv
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SENTRY_DSN=
```

Rules:

- `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be exposed to the browser.
- Configure Google OAuth and email magic links after correct callback URLs are known.
- Use environment-specific storage and data during development; do not test with production user photos.
- Write the expected auth redirect routes before implementing sign-in.

### P0.7 Define quality and safety checks

Create `docs/engineering/quality-plan.md` covering:

- Unit tests for prompt assembly and validation.
- Playwright smoke flow: explore → style detail → resolve options → copy prompt.
- Playwright protected-route flow for sign-in return-to-action.
- Authorization tests that deliberately change a creation or collection ID across two test users.
- Upload tests for an oversized file, a disguised file and a successful allowed file.
- Mobile visual checks at 360 px, tablet and desktop widths.
- Keyboard and focus checks for filters, copy, modal/dialog interactions and upload controls.
- Manual content QA for before/after labels, prompt variables, photo requirements and licensed asset records.

### P0.8 Define privacy-safe events

Create `docs/engineering/analytics-events.md`.

Track only events that help improve the flow:

```text
style_view
comparison_interaction
prompt_copy
external_tool_click
sign_in_started
sign_in_completed
style_saved
collection_created
creation_upload_started
creation_upload_completed
creation_deleted
```

Never send uploaded image data, private prompt text, private notes, full email addresses or other personally identifying details in analytics event payloads.

## 5. Required documentation files after Phase 0

```text
docs/product/v0-product-specification.docx
docs/product/ui-handoff.md
docs/product/user-flows.md
docs/content/style-register.md
docs/engineering/data-model.md
docs/engineering/access-control.md
docs/engineering/quality-plan.md
docs/engineering/analytics-events.md
docs/engineering/deployment-plan.md
```

The supplied `AI_Prompt_Grid_V0_Product_Specification.docx` is the source for `docs/product/v0-product-specification.docx`. Keep the Word copy for planning and a Markdown summary in the repository for day-to-day implementation.

## 6. Phase 0 review meeting checklist

Before moving to Phase 1, answer these questions in writing:

1. Which 12 to 20 styles are in the beta and who owns their testing?
2. Which external tool and mode is the primary test target for each style?
3. Which examples are owned or licensed, and which need permission records?
4. Are the initial upload cap, storage budget and backup-retention policy accepted?
5. Is the V0 hero using the film-strip artwork without the portrait background and old floating card stack?
6. Are Google OAuth, magic-link redirect URLs and the required privacy-policy pages planned?
7. Are the V0 exclusions still protected from scope creep?

## 7. Handoff to Phase 1

Start Phase 1 only after this checklist passes. Phase 1 will translate the approved prototype into reusable, responsive Next.js components using local mock data. It must not wait for the database or authentication work.

The Phase 1 completion condition is: Home, Explore, style detail and Library shell match the approved experience on desktop and mobile, with the film-strip hero visual and realistic style-card data.
