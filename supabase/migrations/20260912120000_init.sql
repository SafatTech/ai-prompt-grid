-- AIPromptGrid Phase 2 — schema, RLS, storage, seeds
-- Apply via Supabase SQL editor or: supabase db push

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
do $$ begin
  create type public.style_status as enum ('draft', 'published');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.image_role as enum ('before', 'after', 'gallery');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.user_role as enum ('user', 'admin');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.waitlist_interest as enum ('video', 'generator');
exception when duplicate_object then null;
end $$;

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_admin() to anon;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  role public.user_role not null default 'user',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, role)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1)
    ),
    'user'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists categories_sort_order_idx on public.categories (sort_order);

create trigger categories_set_updated_at
  before update on public.categories
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- styles
-- ---------------------------------------------------------------------------
create table if not exists public.styles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text,
  prompt text not null default '',
  how_to_use text,
  category_id uuid not null references public.categories (id) on delete restrict,
  status public.style_status not null default 'draft',
  is_featured boolean not null default false,
  model_slugs text[] not null default '{}',
  seo_title text,
  seo_description text,
  copy_count int not null default 0 check (copy_count >= 0),
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles (id) on delete set null,
  -- v2 stubs (unused in v1 UI)
  is_premium boolean not null default false,
  credit_cost int
);

create index if not exists styles_status_idx on public.styles (status);
create index if not exists styles_category_id_idx on public.styles (category_id);
create index if not exists styles_featured_idx on public.styles (is_featured) where status = 'published';
create index if not exists styles_model_slugs_gin on public.styles using gin (model_slugs);
create index if not exists styles_title_trgm_ready on public.styles (lower(title));

create trigger styles_set_updated_at
  before update on public.styles
  for each row execute function public.set_updated_at();

create or replace function public.enforce_style_publish_requirements()
returns trigger
language plpgsql
as $$
declare
  has_before boolean;
  has_after boolean;
  allowed constant text[] := array[
    'gemini', 'chatgpt', 'midjourney', 'flux', 'stable-diffusion', 'other'
  ];
  slug text;
begin
  if new.status = 'published' then
    if length(trim(new.title)) = 0 then
      raise exception 'Published styles require a title';
    end if;
    if length(trim(new.slug)) = 0 then
      raise exception 'Published styles require a slug';
    end if;
    if length(trim(new.prompt)) = 0 then
      raise exception 'Published styles require a prompt';
    end if;
    if new.category_id is null then
      raise exception 'Published styles require a category';
    end if;
    if coalesce(cardinality(new.model_slugs), 0) < 1 then
      raise exception 'Published styles require at least one model tag';
    end if;

    foreach slug in array new.model_slugs loop
      if not (slug = any (allowed)) then
        raise exception 'Invalid model slug: %', slug;
      end if;
    end loop;

    select exists (
      select 1 from public.style_images si
      where si.style_id = new.id and si.role = 'before'
    ) into has_before;

    select exists (
      select 1 from public.style_images si
      where si.style_id = new.id and si.role = 'after'
    ) into has_after;

    if not has_before or not has_after then
      raise exception 'Published styles require before and after images';
    end if;

    if new.published_at is null then
      new.published_at = timezone('utc', now());
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists styles_enforce_publish on public.styles;
create trigger styles_enforce_publish
  before insert or update of status, title, slug, prompt, category_id, model_slugs
  on public.styles
  for each row execute function public.enforce_style_publish_requirements();

-- Atomic copy counter for Phase 3
create or replace function public.increment_style_copy_count(style_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.styles
  set copy_count = copy_count + 1
  where id = style_id
    and status = 'published';
end;
$$;

revoke all on function public.increment_style_copy_count(uuid) from public;
grant execute on function public.increment_style_copy_count(uuid) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- style_images
-- ---------------------------------------------------------------------------
create table if not exists public.style_images (
  id uuid primary key default gen_random_uuid(),
  style_id uuid not null references public.styles (id) on delete cascade,
  storage_path text not null,
  public_url text not null,
  role public.image_role not null,
  alt_text text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists style_images_style_id_idx on public.style_images (style_id);
create index if not exists style_images_role_idx on public.style_images (style_id, role);

-- ---------------------------------------------------------------------------
-- favorites
-- ---------------------------------------------------------------------------
create table if not exists public.favorites (
  user_id uuid not null references public.profiles (id) on delete cascade,
  style_id uuid not null references public.styles (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, style_id)
);

create index if not exists favorites_user_id_idx on public.favorites (user_id);
create index if not exists favorites_style_id_idx on public.favorites (style_id);

-- ---------------------------------------------------------------------------
-- waitlist_entries
-- ---------------------------------------------------------------------------
create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  interest public.waitlist_interest not null,
  created_at timestamptz not null default timezone('utc', now()),
  constraint waitlist_email_interest_unique unique (email, interest),
  constraint waitlist_email_format check (email ~* '^[^@]+@[^@]+\.[^@]+$')
);

create index if not exists waitlist_interest_idx on public.waitlist_entries (interest);

create or replace function public.normalize_waitlist_email()
returns trigger
language plpgsql
as $$
begin
  new.email = lower(trim(new.email));
  return new;
end;
$$;

drop trigger if exists waitlist_normalize_email on public.waitlist_entries;
create trigger waitlist_normalize_email
  before insert or update on public.waitlist_entries
  for each row execute function public.normalize_waitlist_email();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.styles enable row level security;
alter table public.style_images enable row level security;
alter table public.favorites enable row level security;
alter table public.waitlist_entries enable row level security;

-- profiles
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create or replace function public.protect_profile_role()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'UPDATE' and old.role is distinct from new.role then
    raise exception 'Role changes must be applied via SQL bootstrap (service role), not the client';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_protect_role on public.profiles;
create trigger profiles_protect_role
  before update on public.profiles
  for each row execute function public.protect_profile_role();

-- categories
drop policy if exists "categories_public_read" on public.categories;
create policy "categories_public_read"
  on public.categories for select
  to anon, authenticated
  using (true);

drop policy if exists "categories_admin_write" on public.categories;
create policy "categories_admin_write"
  on public.categories for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- styles
drop policy if exists "styles_public_read_published" on public.styles;
create policy "styles_public_read_published"
  on public.styles for select
  to anon, authenticated
  using (status = 'published' or public.is_admin());

drop policy if exists "styles_admin_write" on public.styles;
create policy "styles_admin_write"
  on public.styles for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- style_images
drop policy if exists "style_images_public_read" on public.style_images;
create policy "style_images_public_read"
  on public.style_images for select
  to anon, authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.styles s
      where s.id = style_id and s.status = 'published'
    )
  );

drop policy if exists "style_images_admin_write" on public.style_images;
create policy "style_images_admin_write"
  on public.style_images for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- favorites
drop policy if exists "favorites_select_own" on public.favorites;
create policy "favorites_select_own"
  on public.favorites for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "favorites_insert_own" on public.favorites;
create policy "favorites_insert_own"
  on public.favorites for insert
  to authenticated
  with check (
    user_id = auth.uid()
    and exists (
      select 1 from public.styles s
      where s.id = style_id and s.status = 'published'
    )
  );

drop policy if exists "favorites_delete_own" on public.favorites;
create policy "favorites_delete_own"
  on public.favorites for delete
  to authenticated
  using (user_id = auth.uid());

-- waitlist
drop policy if exists "waitlist_insert_public" on public.waitlist_entries;
create policy "waitlist_insert_public"
  on public.waitlist_entries for insert
  to anon, authenticated
  with check (true);

drop policy if exists "waitlist_admin_read" on public.waitlist_entries;
create policy "waitlist_admin_read"
  on public.waitlist_entries for select
  to authenticated
  using (public.is_admin());

drop policy if exists "waitlist_admin_delete" on public.waitlist_entries;
create policy "waitlist_admin_delete"
  on public.waitlist_entries for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage bucket: style-images
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'style-images',
  'style-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "style_images_bucket_public_read" on storage.objects;
create policy "style_images_bucket_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'style-images');

drop policy if exists "style_images_bucket_admin_insert" on storage.objects;
create policy "style_images_bucket_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'style-images' and public.is_admin());

drop policy if exists "style_images_bucket_admin_update" on storage.objects;
create policy "style_images_bucket_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'style-images' and public.is_admin())
  with check (bucket_id = 'style-images' and public.is_admin());

drop policy if exists "style_images_bucket_admin_delete" on storage.objects;
create policy "style_images_bucket_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'style-images' and public.is_admin());

-- ---------------------------------------------------------------------------
-- Seed categories + draft styles for smoke testing
-- ---------------------------------------------------------------------------
insert into public.categories (name, slug, description, sort_order) values
  ('Vintage Film', 'vintage-film', 'Analog grain, faded tones, soft focus.', 10),
  ('Cinematic', 'cinematic', 'Movie lighting and composition.', 20),
  ('Portrait', 'portrait', 'Face and identity-forward looks.', 30),
  ('Fashion', 'fashion', 'Wardrobe and editorial looks.', 40),
  ('Street & Documentary', 'street-documentary', 'Candid city and reportage feel.', 50),
  ('Selfie Transformation', 'selfie-transformation', 'Upload-photo viral looks.', 60),
  ('Retro & Nostalgia', 'retro-nostalgia', 'Decade and era aesthetics.', 70),
  ('Fantasy & Surreal', 'fantasy-surreal', 'Creative non-literal looks.', 80),
  ('Product & Commercial', 'product-commercial', 'Clean product and commercial sets.', 90)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order;

insert into public.styles (
  title, slug, short_description, prompt, how_to_use, category_id, status, is_featured, model_slugs
)
select
  'Vintage Film Portrait',
  'vintage-film-portrait',
  'Warm faded tones with soft film grain — draft for admin testing.',
  'Transform this photo into an authentic vintage film portrait. Keep facial features and identity strictly unchanged. Apply warm faded tones, soft focus, realistic film grain, subtle vignette, and natural skin texture. Photorealistic, high detail.',
  'Paste into Gemini or ChatGPT with your photo attached. Draft — add before/after before publishing.',
  c.id,
  'draft',
  false,
  array['gemini', 'chatgpt']::text[]
from public.categories c
where c.slug = 'vintage-film'
on conflict (slug) do nothing;

insert into public.styles (
  title, slug, short_description, prompt, how_to_use, category_id, status, is_featured, model_slugs
)
select
  'Golden Hour Cinematic',
  'golden-hour-cinematic',
  'Warm sidelight and shallow depth of field — draft for admin testing.',
  'Transform this photo into a cinematic golden-hour portrait. Keep identity unchanged. Use warm sidelight, soft rim light, shallow depth of field, natural skin texture, and filmic contrast. Photorealistic.',
  'Best tested on Gemini. Draft — add before/after before publishing.',
  c.id,
  'draft',
  false,
  array['gemini']::text[]
from public.categories c
where c.slug = 'cinematic'
on conflict (slug) do nothing;
