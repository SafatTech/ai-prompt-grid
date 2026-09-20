import type { SupabaseClient } from "@supabase/supabase-js";
import {
  SIGNED_URL_TTL_SECONDS,
  USER_CREATIONS_BUCKET,
} from "@/lib/creations/constants";
import type { Collection, Creation } from "@/lib/library/types";

type StyleRef = { id: string; slug: string };

function formatCreationDate(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

async function signedUrl(
  client: SupabaseClient,
  key: string,
): Promise<string> {
  const { data, error } = await client.storage
    .from(USER_CREATIONS_BUCKET)
    .createSignedUrl(key, SIGNED_URL_TTL_SECONDS);
  if (error || !data?.signedUrl) {
    console.warn("[library] signed URL failed", key, error?.message);
    return "";
  }
  return data.signedUrl;
}

function mapCreationRow(
  row: {
    id: string;
    prompt_snapshot: string;
    tool_used: string;
    result_storage_key: string;
    source_storage_key: string | null;
    notes: string | null;
    created_at: string;
    styles: { slug: string; title: string } | { slug: string; title: string }[] | null;
  },
  resultUrl: string,
  sourceUrl: string,
): Creation {
  const styles = row.styles;
  const style = Array.isArray(styles) ? styles[0] : styles;
  return {
    id: row.id,
    result: resultUrl,
    source: sourceUrl,
    styleId: style?.slug ?? "",
    styleName: style?.title ?? "Style",
    date: formatCreationDate(row.created_at),
    notes: row.notes ?? "",
    prompt: row.prompt_snapshot,
    toolUsed: row.tool_used,
    resultStorageKey: row.result_storage_key,
    sourceStorageKey: row.source_storage_key,
  };
}

async function resolveStyleBySlug(
  client: SupabaseClient,
  slug: string,
): Promise<StyleRef | null> {
  const { data, error } = await client
    .from("styles")
    .select("id, slug")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error || !data) return null;
  return data as StyleRef;
}

export async function fetchSavedStyleSlugs(client: SupabaseClient): Promise<string[]> {
  const { data, error } = await client
    .from("saved_styles")
    .select("style_id, styles ( slug )")
    .order("created_at", { ascending: false });

  if (error || !data) {
    if (error) console.warn("[library] saved_styles fetch failed", error.message);
    return [];
  }

  return data
    .map((row) => {
      const styles = row.styles as { slug: string } | { slug: string }[] | null;
      if (Array.isArray(styles)) return styles[0]?.slug;
      return styles?.slug;
    })
    .filter((slug): slug is string => Boolean(slug));
}

export async function fetchCollections(client: SupabaseClient): Promise<Collection[]> {
  const { data, error } = await client
    .from("collections")
    .select("id, name, collection_items ( style_id, styles ( slug ) )")
    .order("created_at", { ascending: true });

  if (error || !data) {
    if (error) console.warn("[library] collections fetch failed", error.message);
    return [{ id: "saved-styles", name: "Saved styles", styleIds: [] }];
  }

  const mapped: Collection[] = data.map((row) => {
    const items = (row.collection_items ?? []) as Array<{
      styles: { slug: string } | { slug: string }[] | null;
    }>;
    const styleIds = items
      .map((item) => {
        const styles = item.styles;
        if (Array.isArray(styles)) return styles[0]?.slug;
        return styles?.slug;
      })
      .filter((slug): slug is string => Boolean(slug));
    return { id: row.id as string, name: row.name as string, styleIds };
  });

  return [{ id: "saved-styles", name: "Saved styles", styleIds: [] }, ...mapped];
}

export async function insertSavedStyle(
  client: SupabaseClient,
  userId: string,
  slug: string,
): Promise<boolean> {
  const style = await resolveStyleBySlug(client, slug);
  if (!style) {
    console.warn("[library] cannot save — style slug not in database:", slug);
    return false;
  }
  const { error } = await client.from("saved_styles").upsert(
    { user_id: userId, style_id: style.id },
    { onConflict: "user_id,style_id" },
  );
  if (error) {
    console.warn("[library] save failed", error.message);
    return false;
  }
  return true;
}

export async function deleteSavedStyle(
  client: SupabaseClient,
  userId: string,
  slug: string,
): Promise<boolean> {
  const style = await resolveStyleBySlug(client, slug);
  if (!style) return false;

  const { error } = await client
    .from("saved_styles")
    .delete()
    .eq("user_id", userId)
    .eq("style_id", style.id);

  if (error) {
    console.warn("[library] unsave failed", error.message);
    return false;
  }

  // Also remove from any of the user's collections
  const { data: collections } = await client
    .from("collections")
    .select("id")
    .eq("owner_id", userId);
  const collectionIds = (collections ?? []).map((c) => c.id as string);
  if (collectionIds.length) {
    await client
      .from("collection_items")
      .delete()
      .eq("style_id", style.id)
      .in("collection_id", collectionIds);
  }

  return true;
}

export async function insertCollection(
  client: SupabaseClient,
  userId: string,
  name: string,
): Promise<Collection | null> {
  const { data, error } = await client
    .from("collections")
    .insert({ owner_id: userId, name })
    .select("id, name")
    .single();
  if (error || !data) {
    console.warn("[library] create collection failed", error?.message);
    return null;
  }
  return { id: data.id as string, name: data.name as string, styleIds: [] };
}

export async function addStyleToCollection(
  client: SupabaseClient,
  slug: string,
  collectionId: string,
): Promise<boolean> {
  if (collectionId === "saved-styles") return false;
  const style = await resolveStyleBySlug(client, slug);
  if (!style) return false;
  const { error } = await client.from("collection_items").upsert(
    { collection_id: collectionId, style_id: style.id },
    { onConflict: "collection_id,style_id" },
  );
  if (error) {
    console.warn("[library] add to collection failed", error.message);
    return false;
  }
  return true;
}

export async function countCreations(
  client: SupabaseClient,
  userId: string,
): Promise<number> {
  const { count, error } = await client
    .from("creations")
    .select("id", { count: "exact", head: true })
    .eq("owner_id", userId);
  if (error) {
    console.warn("[library] creations count failed", error.message);
    return 0;
  }
  return count ?? 0;
}

export async function fetchCreations(
  client: SupabaseClient,
): Promise<Creation[]> {
  const { data, error } = await client
    .from("creations")
    .select(
      "id, prompt_snapshot, tool_used, result_storage_key, source_storage_key, notes, created_at, styles ( slug, title )",
    )
    .order("created_at", { ascending: false });

  if (error || !data) {
    if (error) console.warn("[library] creations fetch failed", error.message);
    return [];
  }

  const creations: Creation[] = [];
  for (const row of data) {
    const resultUrl = await signedUrl(client, row.result_storage_key as string);
    const sourceKey = row.source_storage_key as string | null;
    const sourceUrl = sourceKey ? await signedUrl(client, sourceKey) : "";
    creations.push(
      mapCreationRow(
        row as Parameters<typeof mapCreationRow>[0],
        resultUrl,
        sourceUrl,
      ),
    );
  }
  return creations;
}

export async function fetchCreationById(
  client: SupabaseClient,
  id: string,
): Promise<Creation | null> {
  const { data, error } = await client
    .from("creations")
    .select(
      "id, prompt_snapshot, tool_used, result_storage_key, source_storage_key, notes, created_at, styles ( slug, title )",
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    if (error) console.warn("[library] creation fetch failed", error.message);
    return null;
  }

  const resultUrl = await signedUrl(client, data.result_storage_key as string);
  const sourceKey = data.source_storage_key as string | null;
  const sourceUrl = sourceKey ? await signedUrl(client, sourceKey) : "";
  return mapCreationRow(
    data as Parameters<typeof mapCreationRow>[0],
    resultUrl,
    sourceUrl,
  );
}

export async function deleteCreationRemote(
  client: SupabaseClient,
  creation: Pick<Creation, "id" | "resultStorageKey" | "sourceStorageKey">,
): Promise<boolean> {
  const keys = [creation.resultStorageKey, creation.sourceStorageKey].filter(
    (key): key is string => Boolean(key),
  );
  if (keys.length) {
    const { error: storageError } = await client.storage
      .from(USER_CREATIONS_BUCKET)
      .remove(keys);
    if (storageError) {
      console.warn("[library] storage delete failed", storageError.message);
    }
  }

  const { error } = await client.from("creations").delete().eq("id", creation.id);
  if (error) {
    console.warn("[library] creation delete failed", error.message);
    return false;
  }
  return true;
}

export async function removeCreationSourceRemote(
  client: SupabaseClient,
  creation: Pick<Creation, "id" | "sourceStorageKey">,
): Promise<boolean> {
  if (!creation.sourceStorageKey) return true;

  const { error: storageError } = await client.storage
    .from(USER_CREATIONS_BUCKET)
    .remove([creation.sourceStorageKey]);
  if (storageError) {
    console.warn("[library] source storage delete failed", storageError.message);
  }

  const { error } = await client
    .from("creations")
    .update({ source_storage_key: null })
    .eq("id", creation.id);
  if (error) {
    console.warn("[library] source clear failed", error.message);
    return false;
  }
  return true;
}

export async function createSignedDownloadUrl(
  client: SupabaseClient,
  key: string,
  filename: string,
): Promise<string | null> {
  const { data, error } = await client.storage
    .from(USER_CREATIONS_BUCKET)
    .createSignedUrl(key, 60, { download: filename });
  if (error || !data?.signedUrl) {
    console.warn("[library] download URL failed", error?.message);
    return null;
  }
  return data.signedUrl;
}

export { resolveStyleBySlug };
