import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

export const MAX_TRENDING = 6;

export const adminTrendingSchema = z.object({
  styleIds: z
    .array(z.string().uuid())
    .max(MAX_TRENDING, `At most ${MAX_TRENDING} trending styles.`)
    .refine((ids) => new Set(ids).size === ids.length, {
      message: "Duplicate styles are not allowed.",
    }),
});

export type TrendingStyleSummary = {
  id: string;
  slug: string;
  title: string;
  category: string;
  tool: string;
  trendingRank: number;
};

/**
 * Replace homepage trending selection with an ordered list of published style IDs (max 6).
 * Ranks are 1-based in list order. Clears ranks for styles no longer selected.
 */
export async function setTrendingStyles(
  client: SupabaseClient,
  styleIds: string[],
): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  if (styleIds.length > MAX_TRENDING) {
    return {
      ok: false,
      status: 400,
      error: `At most ${MAX_TRENDING} trending styles allowed.`,
    };
  }

  if (styleIds.length > 0) {
    const { data: rows, error } = await client
      .from("styles")
      .select("id, status")
      .in("id", styleIds);

    if (error) {
      console.warn("[admin] trending validate failed", error.message);
      return { ok: false, status: 500, error: "Could not validate styles." };
    }

    const byId = new Map(
      (rows ?? []).map((r) => [r.id as string, r.status as string]),
    );
    for (const id of styleIds) {
      const status = byId.get(id);
      if (!status) {
        return { ok: false, status: 400, error: "One or more styles were not found." };
      }
      if (status !== "published") {
        return {
          ok: false,
          status: 400,
          error: "Only published styles can be featured on the homepage.",
        };
      }
    }
  }

  // Two-phase update avoids unique-rank conflicts while reordering.
  const { error: clearError } = await client
    .from("styles")
    .update({ trending_rank: null })
    .not("trending_rank", "is", null);

  if (clearError) {
    console.warn("[admin] trending clear failed", clearError.message);
    return { ok: false, status: 500, error: "Could not update trending styles." };
  }

  for (let i = 0; i < styleIds.length; i += 1) {
    const id = styleIds[i]!;
    const { error: rankError } = await client
      .from("styles")
      .update({ trending_rank: i + 1 })
      .eq("id", id);

    if (rankError) {
      console.warn("[admin] trending rank failed", rankError.message);
      return { ok: false, status: 500, error: "Could not update trending styles." };
    }
  }

  return { ok: true };
}

export async function listTrendingAdminStyles(
  client: SupabaseClient,
): Promise<TrendingStyleSummary[]> {
  const { data, error } = await client
    .from("styles")
    .select(
      "id, slug, title, trending_rank, categories ( name ), prompt_variants ( tool, is_primary )",
    )
    .not("trending_rank", "is", null)
    .eq("status", "published")
    .order("trending_rank", { ascending: true });

  if (error || !data) {
    if (error) console.warn("[admin] trending list failed", error.message);
    return [];
  }

  return data.map((row) => {
    const categories = row.categories as
      | { name: string }
      | { name: string }[]
      | null;
    const category = Array.isArray(categories)
      ? categories[0]?.name
      : categories?.name;
    const variants = (row.prompt_variants ?? []) as Array<{
      tool: string;
      is_primary: boolean;
    }>;
    const primary =
      variants.find((v) => v.is_primary) ?? variants[0] ?? null;
    return {
      id: row.id as string,
      slug: row.slug as string,
      title: row.title as string,
      category: category ?? "—",
      tool: primary?.tool ?? "—",
      trendingRank: row.trending_rank as number,
    };
  });
}
