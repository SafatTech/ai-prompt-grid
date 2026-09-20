import { getPublicSupabaseConfig, isSupabaseConfigured } from "@/lib/env";
import { createPublicSupabaseClient } from "@/lib/supabase/public";
import { mapDbStyleToCatalog, type DbStyleRow } from "./mapper";
import { getPublishedStyleById, getPublishedStyles } from "./styles";
import type { CatalogStyle } from "./types";

const STYLE_SELECT = `
  id,
  slug,
  title,
  summary,
  description,
  supported_subjects,
  edit_intent,
  input_requirement,
  photo_requirements,
  preservation_targets,
  change_targets,
  target_source_photo,
  card_height,
  save_count,
  status,
  categories ( name, slug ),
  prompt_variants ( * ),
  style_assets ( * )
`;

function publicBaseUrl(): string | null {
  return getPublicSupabaseConfig()?.url ?? null;
}

function mapRows(rows: DbStyleRow[]): CatalogStyle[] {
  const base = publicBaseUrl();
  return rows
    .map((row) => mapDbStyleToCatalog(row, base))
    .filter((style): style is CatalogStyle => style !== null)
    .filter((style) => style.status === "published");
}

/**
 * Published catalog for guest UI.
 * Prefers Supabase when configured; falls back to static seed otherwise.
 * Uses a cookie-free anon client so catalog pages can prerender.
 */
export async function listPublishedStyles(): Promise<CatalogStyle[]> {
  if (!isSupabaseConfigured()) {
    return getPublishedStyles();
  }

  try {
    const supabase = createPublicSupabaseClient();
    if (!supabase) return getPublishedStyles();

    const { data, error } = await supabase
      .from("styles")
      .select(STYLE_SELECT)
      .eq("status", "published")
      .order("save_count", { ascending: false });

    if (error) {
      console.warn("[catalog] Supabase query failed; using seed fallback.", error.message);
      return getPublishedStyles();
    }

    const mapped = mapRows((data ?? []) as DbStyleRow[]);
    if (mapped.length === 0) {
      console.warn("[catalog] No published styles in database; using seed fallback.");
      return getPublishedStyles();
    }

    return mapped;
  } catch (err) {
    console.warn("[catalog] Unexpected catalog error; using seed fallback.", err);
    return getPublishedStyles();
  }
}

export async function getPublishedStyleBySlug(
  slug: string,
): Promise<CatalogStyle | undefined> {
  if (!isSupabaseConfigured()) {
    return getPublishedStyleById(slug);
  }

  try {
    const supabase = createPublicSupabaseClient();
    if (!supabase) return getPublishedStyleById(slug);

    const { data, error } = await supabase
      .from("styles")
      .select(STYLE_SELECT)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      console.warn("[catalog] Style lookup failed; using seed fallback.", error.message);
      return getPublishedStyleById(slug);
    }

    if (!data) return getPublishedStyleById(slug);

    const mapped = mapDbStyleToCatalog(data as DbStyleRow, publicBaseUrl());
    return mapped?.status === "published" ? mapped : undefined;
  } catch (err) {
    console.warn("[catalog] Unexpected style lookup error; using seed fallback.", err);
    return getPublishedStyleById(slug);
  }
}
