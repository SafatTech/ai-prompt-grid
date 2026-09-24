-- Homepage "Trending transformations": editors pick up to 6 published styles.
-- Null = not featured. Unique ranks 1–6 among featured styles.

alter table public.styles
  add column if not exists trending_rank int
  check (trending_rank is null or (trending_rank >= 1 and trending_rank <= 6));

create unique index if not exists styles_trending_rank_uidx
  on public.styles (trending_rank)
  where trending_rank is not null;

comment on column public.styles.trending_rank is
  'Homepage trending slot (1–6). Null means not featured.';
