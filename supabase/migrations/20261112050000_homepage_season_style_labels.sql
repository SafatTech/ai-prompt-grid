-- Optional short labels for season banner style pills (slug → label).

alter table public.homepage_settings
  add column if not exists season_style_labels jsonb not null default '{}'::jsonb;

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
  season_style_labels,
  updated_at
) on table public.homepage_settings to anon, authenticated;
grant insert, update, delete on table public.homepage_settings to authenticated;
grant all on table public.homepage_settings to service_role;

comment on column public.homepage_settings.season_style_labels is
  'Optional short labels for season banner style pills, keyed by styles.slug.';
