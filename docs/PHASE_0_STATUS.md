# Phase 0 review checklist status

Use before starting Phase 1. Source questions from `AI_Prompt_Grid_Phase_0_Implementation.md`.

| # | Question | Status |
|---|---|---|
| 1 | Which 12–20 styles are in the beta and who owns testing? | 12 draft styles listed in `docs/content/style-register.md`; owners still **TBD** |
| 2 | Primary external tool and mode per style? | Tool proposed; **mode/input order TBD** |
| 3 | Which examples are owned/licensed? | Placeholders only; licence records **open** |
| 4 | Upload cap, storage budget, backup retention accepted? | Proposed 10 MB / 25 creations documented; **needs product sign-off** |
| 5 | V0 hero uses film-strip without portrait background + floating cards? | Documented in UI handoff; asset **still needed** for Phase 1 |
| 6 | Google OAuth, magic-link redirects, privacy pages planned? | Documented in deployment plan; URLs **TBD** per environment |
| 7 | V0 exclusions still protected from scope creep? | Yes — restated in product summary |

## Definition of done (Phase 0 guide)

| Criterion | Status |
|---|---|
| V0 product specification approved | Markdown summary created; Word canonical — **await product approval** |
| 12–20 styles selected with owners | Styles selected; owners TBD |
| Primary tool/mode per style | Partial |
| HTML prototype asset inventory + responsive notes | Done in `docs/product/ui-handoff.md` |
| Next.js runs locally with TS, Tailwind, lint, format, tests | Done |
| Supabase envs + DB/storage design documented | Design documented; live projects TBD |
| RLS ownership rules written | Done in `docs/engineering/access-control.md` |
| Event taxonomy, privacy, upload limits, metrics agreed | Documented — **await agreement** |
| Phase 1 can begin without unresolved product-scope questions | Scope is clear; content ownership can proceed in parallel with Phase 1 UI |
