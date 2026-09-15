# AIPromptGrid

Ready-to-copy prompts for stunning AI photo styles.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Supabase (auth / DB / storage — wired in Phase 2)
- Deploy target: Vercel

## Phase 0 docs

See [`docs/README.md`](./docs/README.md). Competitor + UX reference: [proxima.art](https://proxima.art/).

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Supabase keys are optional for Phase 1 shell; auth and CMS need them from Phase 2 onward.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Design system

**Graphite Gallery** — stone surfaces, deep teal accent, Fraunces (display) + Figtree (body). Tokens live in `src/app/globals.css`.

## Phase 2

See [`docs/phase-2-setup.md`](./docs/phase-2-setup.md) to apply the SQL migration, enable auth providers, and promote your first admin.

Home featured demo styles (6 published + featured with static before/after under `public/images/featured/`) ship in `supabase/migrations/20260913140000_featured_home_styles.sql`. Apply with `supabase db push` (or run that file in the SQL editor) after the init migration.
