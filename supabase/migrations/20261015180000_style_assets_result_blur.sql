-- Tiny inline WebP (32×40) for merge-hero ambient blur backgrounds.
-- Null is fine: the UI falls back to the panel --surface fill.
alter table public.style_assets
  add column if not exists result_blur_data_url text;
