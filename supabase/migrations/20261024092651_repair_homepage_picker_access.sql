-- Ensure the homepage picker can read every column used by its styles query.
-- RLS still limits public callers to published styles and their assets.
-- Explicit grants repair environments that use column-level Data API privileges.

grant select (
  id,
  slug,
  title,
  status,
  published_at,
  save_count,
  trending_rank,
  pin_new_rank,
  show_on_home,
  hide_from_new,
  explore_weight,
  exclude_from_explore,
  allow_in_hero,
  hero_priority
) on table public.styles to anon, authenticated;

grant select (
  style_id,
  kind,
  result_storage_key,
  sort_order
) on table public.style_assets to anon, authenticated;

grant all on table public.styles, public.style_assets to service_role;
