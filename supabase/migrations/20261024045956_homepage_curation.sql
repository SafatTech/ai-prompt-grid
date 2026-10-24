-- Homepage curation keeps ordered slug lists and lightweight display overrides.
-- Images are always resolved from each style's existing primary result asset.

alter table public.styles
  drop constraint if exists styles_trending_rank_check;

alter table public.styles
  add constraint styles_trending_rank_check
  check (trending_rank is null or (trending_rank >= 1 and trending_rank <= 12));

alter table public.styles
  add column if not exists show_on_home boolean not null default true,
  add column if not exists pin_new_rank int,
  add column if not exists hide_from_new boolean not null default false,
  add column if not exists explore_weight int not null default 0,
  add column if not exists exclude_from_explore boolean not null default false,
  add column if not exists allow_in_hero boolean not null default true,
  add column if not exists hero_priority int not null default 0;

alter table public.styles
  drop constraint if exists styles_pin_new_rank_check,
  add constraint styles_pin_new_rank_check
    check (pin_new_rank is null or (pin_new_rank >= 1 and pin_new_rank <= 5)),
  drop constraint if exists styles_explore_weight_check,
  add constraint styles_explore_weight_check
    check (explore_weight between -100 and 100),
  drop constraint if exists styles_hero_priority_check,
  add constraint styles_hero_priority_check
    check (hero_priority between -100 and 100);

create unique index if not exists styles_pin_new_rank_uidx
  on public.styles (pin_new_rank)
  where pin_new_rank is not null;

create index if not exists styles_home_explore_idx
  on public.styles (status, show_on_home, exclude_from_explore, explore_weight desc, save_count desc);

create table if not exists public.homepage_settings (
  id text primary key default 'default' check (id = 'default'),
  hero_slugs text[] not null default '{}',
  hero_auto_fill boolean not null default true,
  season_mode text not null default 'calendar'
    check (season_mode in ('calendar', 'override', 'hidden')),
  season_id text,
  season_eyebrow text,
  season_headline text,
  season_body text,
  season_chips jsonb,
  season_style_slugs text[] not null default '{}',
  season_image_slugs text[] not null default '{}',
  updated_by uuid references public.profiles (id),
  updated_at timestamptz not null default now()
);

alter table public.homepage_settings enable row level security;

drop policy if exists homepage_settings_public_read on public.homepage_settings;
create policy homepage_settings_public_read on public.homepage_settings
  for select using (true);

drop policy if exists homepage_settings_editor_write on public.homepage_settings;
create policy homepage_settings_editor_write on public.homepage_settings
  for all using (private.current_profile_role() in ('editor', 'admin'))
  with check (private.current_profile_role() in ('editor', 'admin'));

-- Explicit Data API privileges are required in addition to RLS.
revoke all on table public.homepage_settings from anon, authenticated;
grant select (
  id,
  hero_slugs,
  hero_auto_fill,
  season_mode,
  season_id,
  season_eyebrow,
  season_headline,
  season_body,
  season_chips,
  season_style_slugs,
  season_image_slugs,
  updated_at
) on table public.homepage_settings to anon, authenticated;
grant insert, update, delete on table public.homepage_settings to authenticated;
grant all on table public.homepage_settings to service_role;

-- Existing styles grants may differ between environments; grant only the columns
-- the authenticated editor UI updates.
grant update (
  trending_rank,
  show_on_home,
  pin_new_rank,
  hide_from_new,
  explore_weight,
  exclude_from_explore,
  allow_in_hero,
  hero_priority
) on table public.styles to authenticated;

drop trigger if exists homepage_settings_set_updated_at on public.homepage_settings;
create trigger homepage_settings_set_updated_at
  before update on public.homepage_settings
  for each row execute function public.set_updated_at();

comment on table public.homepage_settings is
  'Singleton homepage curation settings. Style slugs refer to public.styles.slug.';
comment on column public.styles.explore_weight is
  'Homepage Explore boost/bury weight (-100 to 100); save_count remains the base order.';
