-- Featured home demo styles (6 published + featured)
-- Apply after init: supabase db push  (or run in SQL editor)
-- Images are static files under public/images/featured/ served by Next.js.

-- ---------------------------------------------------------------------------
-- 1) Ensure styles exist as drafts (publish only after images exist)
-- ---------------------------------------------------------------------------

insert into public.styles (
  title, slug, short_description, prompt, how_to_use, category_id, status, is_featured, model_slugs
)
select
  'Vintage Film Portrait',
  'vintage-film-portrait',
  'Warm faded tones with soft film grain — copy-ready and tested.',
  'Transform this photo into an authentic vintage film portrait. Keep facial features and identity strictly unchanged. Apply warm faded tones, soft focus, realistic film grain, subtle vignette, and natural skin texture. Photorealistic, high detail.',
  'Paste into Gemini or ChatGPT with your photo attached. Keep identity lock; let wardrobe and color grade shift.',
  c.id,
  'draft',
  false,
  array['gemini', 'chatgpt']::text[]
from public.categories c
where c.slug = 'vintage-film'
on conflict (slug) do update set
  title = excluded.title,
  short_description = excluded.short_description,
  prompt = excluded.prompt,
  how_to_use = excluded.how_to_use,
  category_id = excluded.category_id,
  model_slugs = excluded.model_slugs,
  updated_at = timezone('utc', now());

insert into public.styles (
  title, slug, short_description, prompt, how_to_use, category_id, status, is_featured, model_slugs
)
select
  'Golden Hour Cinematic',
  'golden-hour-cinematic',
  'Warm sidelight and shallow depth of field for a filmic dusk look.',
  'Transform this photo into a cinematic golden-hour portrait. Keep identity unchanged. Use warm sidelight, soft rim light, shallow depth of field, natural skin texture, and filmic contrast. Photorealistic.',
  'Best tested on Gemini or ChatGPT with your photo attached.',
  c.id,
  'draft',
  false,
  array['gemini', 'chatgpt']::text[]
from public.categories c
where c.slug = 'cinematic'
on conflict (slug) do update set
  title = excluded.title,
  short_description = excluded.short_description,
  prompt = excluded.prompt,
  how_to_use = excluded.how_to_use,
  category_id = excluded.category_id,
  model_slugs = excluded.model_slugs,
  updated_at = timezone('utc', now());

insert into public.styles (
  title, slug, short_description, prompt, how_to_use, category_id, status, is_featured, model_slugs
)
select
  'Editorial Fashion Cover',
  'editorial-fashion-cover',
  'Magazine-cover framing with sharp fashion lighting.',
  'Transform this photo into an editorial fashion magazine cover portrait. Keep facial identity unchanged. Use confident cover framing, sharp fashion lighting, polished wardrobe, and clean composition. Photorealistic, high detail.',
  'Paste into Midjourney or Flux with your reference photo. Keep identity locked; style the wardrobe and lighting.',
  c.id,
  'draft',
  false,
  array['midjourney', 'flux']::text[]
from public.categories c
where c.slug = 'fashion'
on conflict (slug) do update set
  title = excluded.title,
  short_description = excluded.short_description,
  prompt = excluded.prompt,
  how_to_use = excluded.how_to_use,
  category_id = excluded.category_id,
  model_slugs = excluded.model_slugs,
  updated_at = timezone('utc', now());

insert into public.styles (
  title, slug, short_description, prompt, how_to_use, category_id, status, is_featured, model_slugs
)
select
  'Soft Studio Portrait',
  'soft-studio-portrait',
  'Clean backdrop and gentle beauty light.',
  'Transform this photo into a soft studio portrait. Keep identity unchanged. Use a clean backdrop, soft beauty lighting, gentle catchlights, natural skin texture, and calm expression. Photorealistic.',
  'Paste into Gemini or ChatGPT with your photo attached.',
  c.id,
  'draft',
  false,
  array['gemini', 'chatgpt']::text[]
from public.categories c
where c.slug = 'portrait'
on conflict (slug) do update set
  title = excluded.title,
  short_description = excluded.short_description,
  prompt = excluded.prompt,
  how_to_use = excluded.how_to_use,
  category_id = excluded.category_id,
  model_slugs = excluded.model_slugs,
  updated_at = timezone('utc', now());

insert into public.styles (
  title, slug, short_description, prompt, how_to_use, category_id, status, is_featured, model_slugs
)
select
  'Moody Noir Portrait',
  'moody-noir-portrait',
  'High-contrast near black-and-white with dramatic side light.',
  'Transform this photo into a moody noir portrait. Keep identity unchanged. Use high-contrast near black-and-white, dramatic side light, deep shadows, and cinematic film-noir atmosphere. Photorealistic.',
  'Paste into ChatGPT or Midjourney with your photo attached.',
  c.id,
  'draft',
  false,
  array['chatgpt', 'midjourney']::text[]
from public.categories c
where c.slug = 'cinematic'
on conflict (slug) do update set
  title = excluded.title,
  short_description = excluded.short_description,
  prompt = excluded.prompt,
  how_to_use = excluded.how_to_use,
  category_id = excluded.category_id,
  model_slugs = excluded.model_slugs,
  updated_at = timezone('utc', now());

insert into public.styles (
  title, slug, short_description, prompt, how_to_use, category_id, status, is_featured, model_slugs
)
select
  'Viral Selfie Glow-Up',
  'viral-selfie-glow-up',
  'Polished social glow while keeping likeness locked.',
  'Transform this selfie into a polished viral glow-up look. Keep facial features, skin tone, and identity strictly unchanged. Refine lighting, soften harsh shadows, and keep natural skin texture — no heavy plastic filters. Photorealistic.',
  'Paste into Gemini or ChatGPT with your selfie attached. Identity stays locked.',
  c.id,
  'draft',
  false,
  array['gemini', 'chatgpt']::text[]
from public.categories c
where c.slug = 'selfie-transformation'
on conflict (slug) do update set
  title = excluded.title,
  short_description = excluded.short_description,
  prompt = excluded.prompt,
  how_to_use = excluded.how_to_use,
  category_id = excluded.category_id,
  model_slugs = excluded.model_slugs,
  updated_at = timezone('utc', now());

-- ---------------------------------------------------------------------------
-- 2) Before / after demo images (static Next.js public URLs)
-- ---------------------------------------------------------------------------

insert into public.style_images (style_id, storage_path, public_url, role, alt_text, sort_order)
select s.id,
  'local/featured/vintage-film-portrait-before.png',
  '/images/featured/vintage-film-portrait-before.png',
  'before',
  'Original photo before vintage film portrait style',
  0
from public.styles s
where s.slug = 'vintage-film-portrait'
  and not exists (
    select 1 from public.style_images si
    where si.style_id = s.id and si.role = 'before'
  );

insert into public.style_images (style_id, storage_path, public_url, role, alt_text, sort_order)
select s.id,
  'local/featured/vintage-film-portrait-after.png',
  '/images/featured/vintage-film-portrait-after.png',
  'after',
  'Vintage film portrait style result',
  1
from public.styles s
where s.slug = 'vintage-film-portrait'
  and not exists (
    select 1 from public.style_images si
    where si.style_id = s.id and si.role = 'after'
  );

insert into public.style_images (style_id, storage_path, public_url, role, alt_text, sort_order)
select s.id,
  'local/featured/golden-hour-cinematic-before.png',
  '/images/featured/golden-hour-cinematic-before.png',
  'before',
  'Original photo before golden hour cinematic style',
  0
from public.styles s
where s.slug = 'golden-hour-cinematic'
  and not exists (
    select 1 from public.style_images si
    where si.style_id = s.id and si.role = 'before'
  );

insert into public.style_images (style_id, storage_path, public_url, role, alt_text, sort_order)
select s.id,
  'local/featured/golden-hour-cinematic-after.png',
  '/images/featured/golden-hour-cinematic-after.png',
  'after',
  'Golden hour cinematic style result',
  1
from public.styles s
where s.slug = 'golden-hour-cinematic'
  and not exists (
    select 1 from public.style_images si
    where si.style_id = s.id and si.role = 'after'
  );

insert into public.style_images (style_id, storage_path, public_url, role, alt_text, sort_order)
select s.id,
  'local/featured/editorial-fashion-cover-before.png',
  '/images/featured/editorial-fashion-cover-before.png',
  'before',
  'Original photo before editorial fashion cover style',
  0
from public.styles s
where s.slug = 'editorial-fashion-cover'
  and not exists (
    select 1 from public.style_images si
    where si.style_id = s.id and si.role = 'before'
  );

insert into public.style_images (style_id, storage_path, public_url, role, alt_text, sort_order)
select s.id,
  'local/featured/editorial-fashion-cover-after.png',
  '/images/featured/editorial-fashion-cover-after.png',
  'after',
  'Editorial fashion cover style result',
  1
from public.styles s
where s.slug = 'editorial-fashion-cover'
  and not exists (
    select 1 from public.style_images si
    where si.style_id = s.id and si.role = 'after'
  );

insert into public.style_images (style_id, storage_path, public_url, role, alt_text, sort_order)
select s.id,
  'local/featured/soft-studio-portrait-before.png',
  '/images/featured/soft-studio-portrait-before.png',
  'before',
  'Original photo before soft studio portrait style',
  0
from public.styles s
where s.slug = 'soft-studio-portrait'
  and not exists (
    select 1 from public.style_images si
    where si.style_id = s.id and si.role = 'before'
  );

insert into public.style_images (style_id, storage_path, public_url, role, alt_text, sort_order)
select s.id,
  'local/featured/soft-studio-portrait-after.png',
  '/images/featured/soft-studio-portrait-after.png',
  'after',
  'Soft studio portrait style result',
  1
from public.styles s
where s.slug = 'soft-studio-portrait'
  and not exists (
    select 1 from public.style_images si
    where si.style_id = s.id and si.role = 'after'
  );

insert into public.style_images (style_id, storage_path, public_url, role, alt_text, sort_order)
select s.id,
  'local/featured/moody-noir-portrait-before.png',
  '/images/featured/moody-noir-portrait-before.png',
  'before',
  'Original photo before moody noir portrait style',
  0
from public.styles s
where s.slug = 'moody-noir-portrait'
  and not exists (
    select 1 from public.style_images si
    where si.style_id = s.id and si.role = 'before'
  );

insert into public.style_images (style_id, storage_path, public_url, role, alt_text, sort_order)
select s.id,
  'local/featured/moody-noir-portrait-after.png',
  '/images/featured/moody-noir-portrait-after.png',
  'after',
  'Moody noir portrait style result',
  1
from public.styles s
where s.slug = 'moody-noir-portrait'
  and not exists (
    select 1 from public.style_images si
    where si.style_id = s.id and si.role = 'after'
  );

insert into public.style_images (style_id, storage_path, public_url, role, alt_text, sort_order)
select s.id,
  'local/featured/viral-selfie-glow-up-before.png',
  '/images/featured/viral-selfie-glow-up-before.png',
  'before',
  'Original photo before viral selfie glow-up style',
  0
from public.styles s
where s.slug = 'viral-selfie-glow-up'
  and not exists (
    select 1 from public.style_images si
    where si.style_id = s.id and si.role = 'before'
  );

insert into public.style_images (style_id, storage_path, public_url, role, alt_text, sort_order)
select s.id,
  'local/featured/viral-selfie-glow-up-after.png',
  '/images/featured/viral-selfie-glow-up-after.png',
  'after',
  'Viral selfie glow-up style result',
  1
from public.styles s
where s.slug = 'viral-selfie-glow-up'
  and not exists (
    select 1 from public.style_images si
    where si.style_id = s.id and si.role = 'after'
  );

-- ---------------------------------------------------------------------------
-- 3) Publish + feature (trigger validates before/after images)
-- ---------------------------------------------------------------------------

update public.styles
set
  status = 'published',
  is_featured = true,
  published_at = coalesce(published_at, timezone('utc', now())),
  updated_at = timezone('utc', now())
where slug in (
  'vintage-film-portrait',
  'golden-hour-cinematic',
  'editorial-fashion-cover',
  'soft-studio-portrait',
  'moody-noir-portrait',
  'viral-selfie-glow-up'
);
