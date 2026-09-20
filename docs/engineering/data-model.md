# Data model and storage contract

Design target for Supabase Postgres + Storage. Migrations are written in Phase 3+; this document is the contract.

## Entities

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

## Entity definitions

### profiles

| Column | Notes |
|---|---|
| `id` uuid PK | Matches `auth.users.id` |
| `display_name` text | Nullable until set |
| `role` text | `user` \| `editor` \| `admin` (default `user`) |
| `preferences` jsonb | Optional UI prefs |
| `created_at` / `updated_at` | Timestamps |

### categories

| Column | Notes |
|---|---|
| `id` uuid PK | |
| `name` text unique | Controlled vocabulary |
| `slug` text unique | |
| `sort_order` int | |
| `created_at` | |

### tags

| Column | Notes |
|---|---|
| `id` uuid PK | |
| `name` text unique | |
| `slug` text unique | |
| `kind` text | e.g. `subject`, `intent`, `tool`, `general` |

### styles

| Column | Notes |
|---|---|
| `id` uuid PK | |
| `slug` text unique | URL key |
| `title` text | |
| `category_id` uuid FK | |
| `summary` text | Short card note |
| `description` text | Detail lead |
| `supported_subjects` text[] | |
| `edit_intent` text | |
| `photo_requirements` jsonb | Checklist + unsuitable cases |
| `preservation_targets` text[] | What must stay recognizable |
| `change_targets` text[] | What is expected to change |
| `status` text | `draft` \| `in_review` \| `published` \| `archived` |
| `author_id` uuid FK profiles | Editorial owner |
| `published_at` timestamptz | Nullable |
| `created_at` / `updated_at` | |

Archiving a style must **not** cascade-delete private creations.

### style_tags

| Column | Notes |
|---|---|
| `style_id` uuid FK | |
| `tag_id` uuid FK | |
| PK `(style_id, tag_id)` | |

### prompt_variants

| Column | Notes |
|---|---|
| `id` uuid PK | |
| `style_id` uuid FK | |
| `tool` text | ChatGPT Image, Gemini, Flux, … |
| `mode` text | Exact editor mode tested |
| `input_image_count` int | |
| `input_image_roles` jsonb | Order/role of images |
| `version` text | Prompt version label |
| `template` text | Full template with variables |
| `variables` jsonb | Names, types, defaults, required |
| `settings` jsonb | Optional model settings notes |
| `test_record` jsonb | Tests, limitations, last verified date |
| `is_primary` boolean | Default variant for the style |
| `status` text | draft/published/archived |
| `created_at` / `updated_at` | |

### style_assets

| Column | Notes |
|---|---|
| `id` uuid PK | |
| `style_id` uuid FK | |
| `kind` text | `example_pair` \| `hero` \| other |
| `source_storage_key` text | Public catalog path |
| `result_storage_key` text | Public catalog path |
| `alt_text` text | |
| `provenance` jsonb | Owner, licence, model release |
| `sort_order` int | |
| `created_at` | |

### saved_styles

| Column | Notes |
|---|---|
| `id` uuid PK | |
| `user_id` uuid FK | |
| `style_id` uuid FK | |
| `created_at` | |
| **UNIQUE** `(user_id, style_id)` | Non-negotiable |

### collections

| Column | Notes |
|---|---|
| `id` uuid PK | |
| `owner_id` uuid FK | |
| `name` text | |
| `created_at` / `updated_at` | |

### collection_items

| Column | Notes |
|---|---|
| `id` uuid PK | |
| `collection_id` uuid FK | |
| `style_id` uuid FK | |
| `created_at` | |
| UNIQUE `(collection_id, style_id)` | |

### creations

| Column | Notes |
|---|---|
| `id` uuid PK | |
| `owner_id` uuid FK | Required |
| `style_id` uuid FK | Linked style (may be archived later) |
| `prompt_variant_id` uuid FK | Nullable if variant removed; snapshot remains |
| `prompt_snapshot` text | **Immutable** after insert |
| `tool_used` text | |
| `result_storage_key` text | Private bucket key |
| `source_storage_key` text | Optional private key |
| `notes` text | Optional, length-capped |
| `created_at` / `updated_at` | |

Rules:

- Never replace a historical `prompt_snapshot` when the public recipe changes.
- Deleting a creation removes result, optional source, and derived thumbnails.
- Source-only deletion clears `source_storage_key` and file; result remains.

### reports

| Column | Notes |
|---|---|
| `id` uuid PK | |
| `reporter_id` uuid FK nullable | |
| `target_type` text | style, creation, user, … |
| `target_id` uuid | |
| `reason` text | |
| `status` text | open/resolved/dismissed |
| `created_at` / `updated_at` | |

### audit_logs

| Column | Notes |
|---|---|
| `id` uuid PK | |
| `actor_id` uuid FK | |
| `action` text | publish, archive, update_variant, … |
| `entity_type` text | |
| `entity_id` uuid | |
| `payload` jsonb | Diff summary; no private user images |
| `created_at` | Immutable |

## Storage buckets

```text
catalog-public/      # published before/after examples only
user-creations/      # private result, optional source, thumbnails
```

| Rule | Detail |
|---|---|
| Separation | Public catalog assets and private user assets must **not** share a delivery path |
| Catalog | Readable by anyone for published keys only |
| User creations | Owner-only via RLS + signed URLs |
| Pathing | Prefer `user-creations/{owner_id}/{creation_id}/...` so ownership is structural |

## Upload policy (proposed)

- MIME: `image/jpeg`, `image/png`, `image/webp`
- Max **10 MB** per file
- Cap **25** creations per user
- Server validates signature, dimensions, pixel count; re-encodes; strips metadata

## Non-negotiable integrity rules

1. `saved_styles` unique on `(user_id, style_id)`  
2. Creations always store ownership + prompt snapshot + tool  
3. Prompt snapshots are immutable history  
4. Archiving a style does not remove private creations  
5. Public and private media paths stay isolated  
