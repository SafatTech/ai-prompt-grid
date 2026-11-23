-- Idempotent SEO title/description updates for style pages whose catalog
-- fields live in Supabase. Safe to re-run: only rows matching the listed
-- slugs are touched, and values are set to the final copy (no append).
-- Page <title>/H1/meta also come from src/lib/catalog/style-seo-overrides-data.ts
-- so production HTML updates without this migration; run this (or npm run db:seed)
-- to keep styles.title / styles.description / styles.summary in sync for cards.

UPDATE public.styles AS s
SET
  title = v.title,
  description = v.description,
  summary = COALESCE(v.summary, s.summary),
  updated_at = now()
FROM (
  VALUES
    (
      'sad-ai-photo-prompt-for-boys-rainy-window',
      'Sad Boy AI Photo Prompt: Rainy Window (Copy & Paste)',
      'A sad boy AI photo prompt: sitting by a rain-streaked window at night with a warm lamp glow, an emotional colour portrait, real face kept.',
      'Sad boy by a rain-streaked window at night, warm lamp light, in colour'::text
    ),
    (
      'hand-painted-watercolor-pet',
      'Watercolor Dog Portrait AI Prompt',
      'Watercolor dog portrait AI prompt: a soft hand-painted portrait of your dog on textured paper, true to its face. Free to copy and paste.',
      'Soft watercolor dog portrait on paper'
    ),
    (
      'mini-collectible-figure',
      '3D Dog Collectible Figure AI Photo Prompt',
      'Turn your dog into a premium mini collectible figure on a display stand. Free copy-paste 3D dog AI photo prompt that keeps breed and markings.',
      'Premium dog collectible figurine presentation'
    ),
    (
      'christmas-baby-photoshoot-ai-prompt-gift-boxes',
      'Baby Photoshoot AI Prompt (Christmas Gift Boxes)',
      'Baby photoshoot AI prompt among gift boxes and a small tree. Soft Christmas styling, same sweet face. Free to copy and paste.',
      'Baby sitting among wrapped gift boxes beside a small tree'
    ),
    (
      'baby-boy-birthday-photo-ai-prompt-number-balloon',
      'Baby Boy Photoshoot AI Prompt (Birthday Number Balloon)',
      'Baby boy photoshoot AI prompt with a giant gold number balloon, soft blue decor and confetti. Same sweet face. Free to copy and paste.',
      'Baby with a big gold number balloon and confetti'
    )
) AS v(slug, title, description, summary)
WHERE s.slug = v.slug
  AND (
    s.title IS DISTINCT FROM v.title
    OR s.description IS DISTINCT FROM v.description
    OR s.summary IS DISTINCT FROM v.summary
  );
