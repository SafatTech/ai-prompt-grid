import { cache } from "react";
import { z } from "zod";
import { createPublicSupabaseClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/env";
import { activeSeason, SEASONS, type Season, type SeasonChip } from "./seasons";

export const seasonChipSchema = z.object({
  label: z.string().trim().min(1).max(30),
  q: z.string().trim().min(1).max(80),
  icon: z.enum(["couple", "family", "sparkle"]),
});

export const homepageSettingsSchema = z.object({
  heroSlugs: z.array(z.string().trim().min(1)).max(40),
  heroAutoFill: z.boolean(),
  seasonMode: z.enum(["calendar", "override", "hidden"]),
  seasonId: z.string().trim().max(80).nullable(),
  seasonEyebrow: z.string().trim().max(100).nullable(),
  seasonHeadline: z.string().trim().max(120).nullable(),
  seasonBody: z.string().trim().max(280).nullable(),
  seasonChips: z.array(seasonChipSchema).max(6).nullable(),
  seasonStyleSlugs: z.array(z.string().trim().min(1)).max(12),
  seasonImageSlugs: z.array(z.string().trim().min(1)).max(8),
});

export type HomepageSettings = z.infer<typeof homepageSettingsSchema>;

export const DEFAULT_HOMEPAGE_SETTINGS: HomepageSettings = {
  heroSlugs: [],
  heroAutoFill: true,
  seasonMode: "calendar",
  seasonId: null,
  seasonEyebrow: null,
  seasonHeadline: null,
  seasonBody: null,
  seasonChips: null,
  seasonStyleSlugs: [],
  seasonImageSlugs: [],
};

type SettingsRow = {
  hero_slugs: string[];
  hero_auto_fill: boolean;
  season_mode: HomepageSettings["seasonMode"];
  season_id: string | null;
  season_eyebrow: string | null;
  season_headline: string | null;
  season_body: string | null;
  season_chips: unknown;
  season_style_slugs: string[];
  season_image_slugs: string[];
};

export function mapHomepageSettings(row: SettingsRow | null): HomepageSettings {
  if (!row) return DEFAULT_HOMEPAGE_SETTINGS;
  const parsed = homepageSettingsSchema.safeParse({
    heroSlugs: row.hero_slugs,
    heroAutoFill: row.hero_auto_fill,
    seasonMode: row.season_mode,
    seasonId: row.season_id,
    seasonEyebrow: row.season_eyebrow,
    seasonHeadline: row.season_headline,
    seasonBody: row.season_body,
    seasonChips: row.season_chips,
    seasonStyleSlugs: row.season_style_slugs,
    seasonImageSlugs: row.season_image_slugs,
  });
  return parsed.success ? parsed.data : DEFAULT_HOMEPAGE_SETTINGS;
}

export const getHomepageSettings = cache(async (): Promise<HomepageSettings> => {
  if (!isSupabaseConfigured()) return DEFAULT_HOMEPAGE_SETTINGS;
  try {
    const client = createPublicSupabaseClient();
    if (!client) return DEFAULT_HOMEPAGE_SETTINGS;
    const { data, error } = await client
      .from("homepage_settings")
      .select(
        "hero_slugs, hero_auto_fill, season_mode, season_id, season_eyebrow, season_headline, season_body, season_chips, season_style_slugs, season_image_slugs",
      )
      .eq("id", "default")
      .maybeSingle();
    if (error) {
      console.warn(
        "[home] curation settings unavailable; using defaults.",
        error.message,
      );
      return DEFAULT_HOMEPAGE_SETTINGS;
    }
    return mapHomepageSettings(data as SettingsRow | null);
  } catch (error) {
    console.warn("[home] curation settings failed; using defaults.", error);
    return DEFAULT_HOMEPAGE_SETTINGS;
  }
});

export function resolveHomepageSeason(
  settings: HomepageSettings,
  now = new Date(),
): Season | null {
  if (settings.seasonMode === "hidden") return null;
  const calendar = activeSeason(now);
  if (settings.seasonMode === "calendar") return calendar;
  const base = SEASONS.find((season) => season.id === settings.seasonId) ?? calendar;
  if (!base) return null;
  return {
    ...base,
    eyebrow: settings.seasonEyebrow || base.eyebrow,
    title: settings.seasonHeadline || base.title,
    body: settings.seasonBody || base.body,
    chips: (settings.seasonChips as SeasonChip[] | null) ?? base.chips,
    styleSlugs:
      settings.seasonStyleSlugs.length > 0 ? settings.seasonStyleSlugs : base.styleSlugs,
  };
}

export function resolveHomepageSeasonImages(
  settings: HomepageSettings,
  season: Season | null,
): { slugs: string[]; isCurated: boolean } {
  if (settings.seasonImageSlugs.length > 0) {
    return { slugs: settings.seasonImageSlugs, isCurated: true };
  }
  return { slugs: season?.styleSlugs ?? [], isCurated: false };
}
