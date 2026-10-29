-- Per-image crop focus for object-position (0–100 percent).
-- Lives on style_assets (source/result storage keys), not styles.
-- Do not apply to prod from the agent — Saad applies this migration.

alter table public.style_assets
  add column if not exists source_focus_x real,
  add column if not exists source_focus_y real,
  add column if not exists result_focus_x real,
  add column if not exists result_focus_y real;

alter table public.style_assets
  drop constraint if exists style_assets_source_focus_x_check,
  drop constraint if exists style_assets_source_focus_y_check,
  drop constraint if exists style_assets_result_focus_x_check,
  drop constraint if exists style_assets_result_focus_y_check;

alter table public.style_assets
  add constraint style_assets_source_focus_x_check
    check (source_focus_x is null or (source_focus_x >= 0 and source_focus_x <= 100)),
  add constraint style_assets_source_focus_y_check
    check (source_focus_y is null or (source_focus_y >= 0 and source_focus_y <= 100)),
  add constraint style_assets_result_focus_x_check
    check (result_focus_x is null or (result_focus_x >= 0 and result_focus_x <= 100)),
  add constraint style_assets_result_focus_y_check
    check (result_focus_y is null or (result_focus_y >= 0 and result_focus_y <= 100));

comment on column public.style_assets.source_focus_x is
  'CSS object-position X for source image, 0–100 percent. Null = use app default (center 30%).';
comment on column public.style_assets.source_focus_y is
  'CSS object-position Y for source image, 0–100 percent. Null = use app default (center 30%).';
comment on column public.style_assets.result_focus_x is
  'CSS object-position X for result image, 0–100 percent. Null = use app default (center 30%).';
comment on column public.style_assets.result_focus_y is
  'CSS object-position Y for result image, 0–100 percent. Null = use app default (center 30%).';
