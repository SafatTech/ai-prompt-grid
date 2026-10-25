# Sitemap after publishing styles

`/sitemap.xml` is ISR (`revalidate = 300` in `src/app/sitemap.ts`).

## What the sitemap includes

- Static marketing/legal URLs
- Explore pagination paths
- Published guides
- **Every published style slug**, from Supabase when healthy, **unioned with the seed catalog** (`getPublishedStyles()`), so a partial DB response cannot drop seed rows (e.g. character styles 147–222).

## After a bulk publish

1. Confirm styles are `status = published` in Supabase (or present in seed for fallback).
2. Wait up to **5 minutes** for ISR, or trigger an on-demand revalidation of `/sitemap.xml` (e.g. `revalidatePath("/sitemap.xml")` from an admin publish hook, or redeploy).
3. Spot-check: `curl -s https://aipromptgrid.com/sitemap.xml | grep -c '/styles/'` should match the published count (~284+), and character slugs such as `desert-warrior-prince-ai-photo-prompt` / `dark-fantasy-armored-knight-ai-photo-prompt` must appear.
4. Resubmit the sitemap in Google Search Console if the URL set grew substantially.

## Ops notes

- Sitemap Supabase reads paginate (1000/page) with a **15s** abort; on timeout/error the full seed list is used.
- Never treat a non-empty but short Supabase page as complete without the seed union.
