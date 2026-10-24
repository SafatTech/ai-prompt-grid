import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { getPublicSupabaseConfig } from "@/lib/env";
import {
  DEFAULT_HOMEPAGE_SETTINGS,
  homepageSettingsSchema,
  mapHomepageSettings,
  type HomepageSettings,
} from "@/lib/home/curation";

export const MAX_TRENDING = 12;
export const MAX_NEW_PINS = 5;

const styleOverrideSchema = z.object({
  id: z.string().uuid(),
  showOnHome: z.boolean().default(true),
  hideFromNew: z.boolean().default(false),
  exploreWeight: z.number().int().min(-100).max(100).default(0),
  excludeFromExplore: z.boolean().default(false),
  allowInHero: z.boolean().default(true),
  heroPriority: z.number().int().min(-100).max(100).default(0),
});

export const homepageCurationSaveSchema = z
  .object({
    settings: homepageSettingsSchema,
    trendingStyleIds: z.array(z.string().uuid()).max(MAX_TRENDING),
    newPinStyleIds: z.array(z.string().uuid()).max(MAX_NEW_PINS),
    styleOverrides: z.array(styleOverrideSchema),
  })
  .superRefine((value, context) => {
    for (const [path, ids] of [
      ["trendingStyleIds", value.trendingStyleIds],
      ["newPinStyleIds", value.newPinStyleIds],
    ] as const) {
      if (new Set(ids).size !== ids.length) {
        context.addIssue({
          code: "custom",
          path: [path],
          message: "Duplicate styles are not allowed.",
        });
      }
    }
  });

export type HomepageCurationSave = z.infer<typeof homepageCurationSaveSchema>;

export type HomepageAdminStyle = {
  id: string;
  slug: string;
  title: string;
  resultUrl: string;
  publishedAt: string | null;
  saveCount: number;
  trendingRank: number | null;
  pinNewRank: number | null;
  showOnHome: boolean;
  hideFromNew: boolean;
  exploreWeight: number;
  excludeFromExplore: boolean;
  allowInHero: boolean;
  heroPriority: number;
};

export type HomepageAdminData = {
  settings: HomepageSettings;
  styles: HomepageAdminStyle[];
};

function assetUrl(key: string): string {
  if (!key || /^https?:\/\//i.test(key) || key.startsWith("/")) return key;
  const base = getPublicSupabaseConfig()?.url?.replace(/\/$/, "");
  return base
    ? `${base}/storage/v1/object/public/catalog-public/${key.replace(/^\//, "")}`
    : key;
}

export async function getHomepageAdminData(
  client: SupabaseClient,
): Promise<HomepageAdminData> {
  const [{ data: settings }, { data: styles, error }] = await Promise.all([
    client
      .from("homepage_settings")
      .select(
        "hero_slugs, hero_auto_fill, season_mode, season_id, season_eyebrow, season_headline, season_body, season_chips, season_style_slugs, season_image_slugs",
      )
      .eq("id", "default")
      .maybeSingle(),
    client
      .from("styles")
      .select(
        "id, slug, title, published_at, save_count, trending_rank, pin_new_rank, show_on_home, hide_from_new, explore_weight, exclude_from_explore, allow_in_hero, hero_priority, style_assets ( kind, result_storage_key, sort_order )",
      )
      .eq("status", "published")
      .order("save_count", { ascending: false }),
  ]);

  if (error) console.warn("[admin] homepage styles fetch failed", error.message);

  return {
    settings: settings
      ? mapHomepageSettings(settings as Parameters<typeof mapHomepageSettings>[0])
      : DEFAULT_HOMEPAGE_SETTINGS,
    styles: ((styles ?? []) as Array<Record<string, unknown>>).map((row) => {
      const assets = (row.style_assets ?? []) as Array<{
        kind: string;
        result_storage_key: string;
        sort_order: number;
      }>;
      const result =
        assets.find((asset) => asset.kind === "card_pair") ??
        assets.find((asset) => asset.kind === "hero") ??
        assets.sort((a, b) => a.sort_order - b.sort_order)[0];
      return {
        id: row.id as string,
        slug: row.slug as string,
        title: row.title as string,
        resultUrl: assetUrl(result?.result_storage_key ?? ""),
        publishedAt: (row.published_at as string | null) ?? null,
        saveCount: (row.save_count as number) ?? 0,
        trendingRank: (row.trending_rank as number | null) ?? null,
        pinNewRank: (row.pin_new_rank as number | null) ?? null,
        showOnHome: row.show_on_home !== false,
        hideFromNew: row.hide_from_new === true,
        exploreWeight: (row.explore_weight as number) ?? 0,
        excludeFromExplore: row.exclude_from_explore === true,
        allowInHero: row.allow_in_hero !== false,
        heroPriority: (row.hero_priority as number) ?? 0,
      };
    }),
  };
}

export async function saveHomepageCuration(
  client: SupabaseClient,
  value: HomepageCurationSave,
  userId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const ids = new Set([
    ...value.trendingStyleIds,
    ...value.newPinStyleIds,
    ...value.styleOverrides.map((item) => item.id),
  ]);
  if (ids.size > 0) {
    const { data, error } = await client
      .from("styles")
      .select("id")
      .eq("status", "published")
      .in("id", [...ids]);
    if (error || (data?.length ?? 0) !== ids.size) {
      return { ok: false, error: "One or more selected styles are not published." };
    }
  }

  const { error: settingsError } = await client.from("homepage_settings").upsert({
    id: "default",
    hero_slugs: value.settings.heroSlugs,
    hero_auto_fill: value.settings.heroAutoFill,
    season_mode: value.settings.seasonMode,
    season_id: value.settings.seasonId,
    season_eyebrow: value.settings.seasonEyebrow,
    season_headline: value.settings.seasonHeadline,
    season_body: value.settings.seasonBody,
    season_chips: value.settings.seasonChips,
    season_style_slugs: value.settings.seasonStyleSlugs,
    season_image_slugs: value.settings.seasonImageSlugs,
    updated_by: userId,
  });
  if (settingsError) return { ok: false, error: "Could not save homepage settings." };

  const { error: resetError } = await client
    .from("styles")
    .update({
      trending_rank: null,
      pin_new_rank: null,
      show_on_home: true,
      hide_from_new: false,
      explore_weight: 0,
      exclude_from_explore: false,
      allow_in_hero: true,
      hero_priority: 0,
    })
    .eq("status", "published");
  if (resetError) return { ok: false, error: "Could not reset homepage style settings." };

  for (const [index, id] of value.trendingStyleIds.entries()) {
    const { error } = await client
      .from("styles")
      .update({ trending_rank: index + 1 })
      .eq("id", id);
    if (error) return { ok: false, error: "Could not order featured styles." };
  }
  for (const [index, id] of value.newPinStyleIds.entries()) {
    const { error } = await client
      .from("styles")
      .update({ pin_new_rank: index + 1 })
      .eq("id", id);
    if (error) return { ok: false, error: "Could not pin New styles." };
  }
  for (const override of value.styleOverrides) {
    const { error } = await client
      .from("styles")
      .update({
        show_on_home: override.showOnHome,
        hide_from_new: override.hideFromNew,
        explore_weight: override.exploreWeight,
        exclude_from_explore: override.excludeFromExplore,
        allow_in_hero: override.allowInHero,
        hero_priority: override.heroPriority,
      })
      .eq("id", override.id);
    if (error) return { ok: false, error: "Could not save per-style settings." };
  }
  return { ok: true };
}
