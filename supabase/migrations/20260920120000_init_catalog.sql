-- Phase 3: public catalog schema
-- Apply with: supabase db push   OR   psql / SQL editor

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles (auth-linked; used later in Phase 4+)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  role text not null default 'user' check (role in ('user', 'editor', 'admin')),
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- tags
-- ---------------------------------------------------------------------------
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  kind text not null default 'general'
    check (kind in ('subject', 'intent', 'tool', 'requirement', 'general')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- styles
-- ---------------------------------------------------------------------------
create table if not exists public.styles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category_id uuid not null references public.categories (id),
  summary text not null default '',
  description text not null default '',
  supported_subjects text[] not null default '{}',
  edit_intent text not null default '',
  input_requirement text not null default 'One photo',
  photo_requirements jsonb not null default '{}'::jsonb,
  preservation_targets text[] not null default '{}',
  change_targets text[] not null default '{}',
  target_source_photo text not null default '',
  card_height int not null default 330,
  save_count int not null default 0,
  status text not null default 'draft'
    check (status in ('draft', 'in_review', 'published', 'archived')),
  author_id uuid references public.profiles (id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists styles_status_idx on public.styles (status);
create index if not exists styles_category_id_idx on public.styles (category_id);

-- ---------------------------------------------------------------------------
-- style_tags
-- ---------------------------------------------------------------------------
create table if not exists public.style_tags (
  style_id uuid not null references public.styles (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  primary key (style_id, tag_id)
);

-- ---------------------------------------------------------------------------
-- prompt_variants
-- ---------------------------------------------------------------------------
create table if not exists public.prompt_variants (
  id uuid primary key default gen_random_uuid(),
  style_id uuid not null references public.styles (id) on delete cascade,
  tool text not null,
  mode text not null,
  input_image_count int not null default 1,
  input_image_roles jsonb not null default '["source photo"]'::jsonb,
  version text not null,
  template text not null,
  variables jsonb not null default '{}'::jsonb,
  settings jsonb not null default '{}'::jsonb,
  test_record jsonb not null default '{}'::jsonb,
  is_primary boolean not null default false,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists prompt_variants_one_primary_per_style
  on public.prompt_variants (style_id)
  where is_primary = true;

-- ---------------------------------------------------------------------------
-- style_assets
-- ---------------------------------------------------------------------------
create table if not exists public.style_assets (
  id uuid primary key default gen_random_uuid(),
  style_id uuid not null references public.styles (id) on delete cascade,
  kind text not null default 'example_pair'
    check (kind in ('example_pair', 'hero', 'card_pair', 'other')),
  source_storage_key text not null,
  result_storage_key text not null,
  alt_text text not null default '',
  provenance jsonb not null default '{}'::jsonb,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists style_assets_style_id_idx on public.style_assets (style_id);

-- ---------------------------------------------------------------------------
-- Private user tables (schema ready; used in Phase 4–5)
-- ---------------------------------------------------------------------------
create table if not exists public.saved_styles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  style_id uuid not null references public.styles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, style_id)
);

create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.collection_items (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid not null references public.collections (id) on delete cascade,
  style_id uuid not null references public.styles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (collection_id, style_id)
);

create table if not exists public.creations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  style_id uuid not null references public.styles (id),
  prompt_variant_id uuid references public.prompt_variants (id),
  prompt_snapshot text not null,
  tool_used text not null default '',
  result_storage_key text not null,
  source_storage_key text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.profiles (id),
  target_type text not null,
  target_id uuid not null,
  reason text not null,
  status text not null default 'open'
    check (status in ('open', 'resolved', 'dismissed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id),
  action text not null,
  entity_type text not null,
  entity_id uuid not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists styles_set_updated_at on public.styles;
create trigger styles_set_updated_at
  before update on public.styles
  for each row execute function public.set_updated_at();

drop trigger if exists prompt_variants_set_updated_at on public.prompt_variants;
create trigger prompt_variants_set_updated_at
  before update on public.prompt_variants
  for each row execute function public.set_updated_at();

drop trigger if exists collections_set_updated_at on public.collections;
create trigger collections_set_updated_at
  before update on public.collections
  for each row execute function public.set_updated_at();

drop trigger if exists creations_set_updated_at on public.creations;
create trigger creations_set_updated_at
  before update on public.creations
  for each row execute function public.set_updated_at();
