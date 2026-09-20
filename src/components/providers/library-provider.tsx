"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  clearPersistedPendingAction,
  persistPendingAction,
  readPersistedPendingAction,
  type PendingAction,
} from "@/lib/auth/pending-action";
import { isSupabaseConfigured } from "@/lib/env";
import {
  fetchOwnProfile,
  isEditorRole,
  type ProfileRole,
} from "@/lib/admin/access";
import {
  addStyleToCollection,
  deleteSavedStyle,
  fetchCollections,
  fetchCreations,
  fetchSavedStyleSlugs,
  insertCollection,
  insertSavedStyle,
} from "@/lib/library/client";
import type { Collection, Creation } from "@/lib/library/types";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { track } from "@/lib/analytics";

export type { Collection, Creation };

export type AddCreationInput = {
  styleId: string;
  styleName: string;
  notes: string;
  prompt: string;
  /** Remote path: File objects uploaded via /api/creations */
  resultFile?: File;
  sourceFile?: File | null;
  /** Mock / offline path: data URLs stored in localStorage */
  result?: string;
  source?: string;
};

export type AddCreationResult =
  | { ok: true; creation: Creation }
  | { ok: false; error: string };

const STORAGE_KEY = "aiPromptGridState";

type PersistedLocal = {
  /** Mock-only when Supabase Auth is not configured. */
  signedIn: boolean;
  savedStyles: string[];
  collections: Collection[];
  creations: Creation[];
};

type LibraryState = {
  ready: boolean;
  signedIn: boolean;
  role: ProfileRole;
  isEditor: boolean;
  savedStyles: string[];
  collections: Collection[];
  creations: Creation[];
  pendingAction: PendingAction;
  /** Mock sign-in when Supabase is not configured. */
  signIn: (options?: { saveStyleId?: string }) => void;
  signOut: () => void;
  setPendingAction: (action: PendingAction) => void;
  toggleSave: (styleId: string) => boolean;
  isSaved: (styleId: string) => boolean;
  createCollection: (name: string) => void;
  moveStyleToCollection: (styleId: string, collectionId: string) => void;
  addCreation: (input: AddCreationInput) => Promise<AddCreationResult>;
  deleteCreation: (id: string) => Promise<boolean>;
  removeCreationSource: (id: string) => Promise<boolean>;
  refreshCreations: () => Promise<void>;
};

const defaultCollections: Collection[] = [
  { id: "saved-styles", name: "Saved styles", styleIds: [] },
];

const emptyLocal: PersistedLocal = {
  signedIn: false,
  savedStyles: [],
  collections: defaultCollections,
  creations: [],
};

function readLocal(): PersistedLocal {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyLocal;
    const parsed = JSON.parse(raw) as Partial<PersistedLocal>;
    return {
      signedIn: Boolean(parsed.signedIn),
      savedStyles: parsed.savedStyles ?? [],
      collections: parsed.collections?.length
        ? parsed.collections
        : [{ id: "saved-styles", name: "Saved styles", styleIds: parsed.savedStyles ?? [] }],
      creations: parsed.creations ?? [],
    };
  } catch {
    return emptyLocal;
  }
}

function writeLocal(next: PersistedLocal) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore quota
  }
}

const LibraryContext = createContext<LibraryState | null>(null);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const remote = isSupabaseConfigured();
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<ProfileRole>("user");
  const [savedStyles, setSavedStyles] = useState<string[]>([]);
  const [collections, setCollections] = useState<Collection[]>(defaultCollections);
  const [creations, setCreations] = useState<Creation[]>([]);
  const [mockSignedIn, setMockSignedIn] = useState(false);
  const [pendingAction, setPendingActionState] = useState<PendingAction>(null);
  const pendingHandled = useRef(false);

  const signedIn = remote ? Boolean(userId) : mockSignedIn;
  const isEditor = isEditorRole(role);

  const setPendingAction = useCallback((action: PendingAction) => {
    setPendingActionState(action);
    persistPendingAction(action);
  }, []);

  const refreshRemoteLibrary = useCallback(async (uid?: string) => {
    const supabase = createBrowserSupabaseClient();
    if (!supabase) return;
    const activeUid = uid ?? userId;
    const [slugs, cols, remoteCreations, profile] = await Promise.all([
      fetchSavedStyleSlugs(supabase),
      fetchCollections(supabase),
      fetchCreations(supabase),
      activeUid ? fetchOwnProfile(supabase, activeUid) : Promise.resolve(null),
    ]);
    setSavedStyles(slugs);
    setCollections(
      cols.map((c) =>
        c.id === "saved-styles" ? { ...c, styleIds: slugs } : c,
      ),
    );
    setCreations(remoteCreations);
    setRole(profile?.role ?? "user");
  }, [userId]);

  const refreshCreations = useCallback(async () => {
    if (!remote) return;
    const supabase = createBrowserSupabaseClient();
    if (!supabase) return;
    setCreations(await fetchCreations(supabase));
  }, [remote]);

  const applyPendingAfterAuth = useCallback(async (uid: string) => {
    if (pendingHandled.current) return;
    const pending = readPersistedPendingAction();
    if (!pending) return;
    pendingHandled.current = true;
    clearPersistedPendingAction();
    setPendingActionState(null);

    const supabase = createBrowserSupabaseClient();
    track("sign_in_completed", { method: "oauth_or_magic_link" });

    if (pending.type === "save-style" && supabase) {
      const ok = await insertSavedStyle(supabase, uid, pending.styleId);
      if (ok) {
        await refreshRemoteLibrary();
        track("style_saved", { style_id: pending.styleId });
      }
    } else if (pending.type === "open-library") {
      router.push("/library");
    } else if (pending.type === "save-result") {
      router.push(`/styles/${pending.styleId}?saveResult=1`);
    }
  }, [refreshRemoteLibrary, router]);

  useEffect(() => {
    let cancelled = false;
    const local = readLocal();

    const hydrate = async () => {
      if (cancelled) return;

      if (!remote) {
        setMockSignedIn(local.signedIn);
        setSavedStyles(local.savedStyles);
        setCollections(local.collections);
        setCreations(local.creations);
        setReady(true);
        return;
      }

      const supabase = createBrowserSupabaseClient();
      if (!supabase) {
        setReady(true);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      const uid = data.session?.user.id ?? null;
      setUserId(uid);
      if (uid) {
        await refreshRemoteLibrary(uid);
        if (!cancelled) await applyPendingAfterAuth(uid);
      } else {
        setCreations([]);
        setRole("user");
      }
      setReady(true);
    };

    void hydrate();

    if (!remote) {
      return () => {
        cancelled = true;
      };
    }

    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      return () => {
        cancelled = true;
      };
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const uid = session?.user.id ?? null;
      setUserId(uid);
      if (uid) {
        void refreshRemoteLibrary(uid).then(() => applyPendingAfterAuth(uid));
      } else {
        pendingHandled.current = false;
        setSavedStyles([]);
        setCollections(defaultCollections);
        setCreations([]);
        setRole("user");
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [remote, refreshRemoteLibrary, applyPendingAfterAuth]);

  const signIn = useCallback(
    (options?: { saveStyleId?: string }) => {
      if (remote) return;
      const styleId = options?.saveStyleId;
      const nextSaved =
        styleId && !savedStyles.includes(styleId)
          ? [...savedStyles, styleId]
          : savedStyles;
      const nextCollections = collections.map((c) =>
        c.id === "saved-styles" && styleId && !c.styleIds.includes(styleId)
          ? { ...c, styleIds: [...c.styleIds, styleId] }
          : c,
      );
      setMockSignedIn(true);
      setSavedStyles(nextSaved);
      setCollections(nextCollections);
      writeLocal({
        signedIn: true,
        savedStyles: nextSaved,
        collections: nextCollections,
        creations,
      });
      track("sign_in_completed", { method: "mock" });
    },
    [remote, savedStyles, collections, creations],
  );

  const signOut = useCallback(() => {
    if (remote) {
      const supabase = createBrowserSupabaseClient();
      void supabase?.auth.signOut();
      setUserId(null);
      setRole("user");
      setSavedStyles([]);
      setCollections(defaultCollections);
      setCreations([]);
      pendingHandled.current = false;
      return;
    }
    setMockSignedIn(false);
    writeLocal({
      signedIn: false,
      savedStyles,
      collections,
      creations,
    });
  }, [remote, savedStyles, collections, creations]);

  const isSaved = useCallback(
    (styleId: string) => savedStyles.includes(styleId),
    [savedStyles],
  );

  const toggleSave = useCallback(
    (styleId: string) => {
      if (!signedIn) return false;

      const exists = savedStyles.includes(styleId);
      const nextSaved = exists
        ? savedStyles.filter((id) => id !== styleId)
        : [...savedStyles, styleId];
      const nextCollections = collections.map((c) => {
        if (exists) {
          return { ...c, styleIds: c.styleIds.filter((id) => id !== styleId) };
        }
        if (c.id === "saved-styles" && !c.styleIds.includes(styleId)) {
          return { ...c, styleIds: [...c.styleIds, styleId] };
        }
        return c;
      });

      setSavedStyles(nextSaved);
      setCollections(nextCollections);

      if (remote && userId) {
        const supabase = createBrowserSupabaseClient();
        if (supabase) {
          void (exists
            ? deleteSavedStyle(supabase, userId, styleId)
            : insertSavedStyle(supabase, userId, styleId).then((ok) => {
                if (ok) track("style_saved", { style_id: styleId });
              })
          ).then(() => refreshRemoteLibrary());
        }
      } else {
        writeLocal({
          signedIn: true,
          savedStyles: nextSaved,
          collections: nextCollections,
          creations,
        });
        if (!exists) track("style_saved", { style_id: styleId });
      }

      return true;
    },
    [signedIn, savedStyles, collections, remote, userId, creations, refreshRemoteLibrary],
  );

  const createCollection = useCallback(
    (name: string) => {
      if (remote && userId) {
        const supabase = createBrowserSupabaseClient();
        if (!supabase) return;
        void insertCollection(supabase, userId, name).then((created) => {
          if (created) {
            setCollections((prev) => [...prev, created]);
            track("collection_created", { name });
          }
        });
        return;
      }
      const next = [
        ...collections,
        { id: `collection-${Date.now()}`, name, styleIds: [] },
      ];
      setCollections(next);
      writeLocal({
        signedIn: mockSignedIn,
        savedStyles,
        collections: next,
        creations,
      });
      track("collection_created", { name });
    },
    [remote, userId, collections, mockSignedIn, savedStyles, creations],
  );

  const moveStyleToCollection = useCallback(
    (styleId: string, collectionId: string) => {
      setCollections((prev) =>
        prev.map((c) =>
          c.id === collectionId && !c.styleIds.includes(styleId)
            ? { ...c, styleIds: [...c.styleIds, styleId] }
            : c,
        ),
      );

      if (remote) {
        const supabase = createBrowserSupabaseClient();
        if (supabase) void addStyleToCollection(supabase, styleId, collectionId);
        return;
      }

      const next = collections.map((c) =>
        c.id === collectionId && !c.styleIds.includes(styleId)
          ? { ...c, styleIds: [...c.styleIds, styleId] }
          : c,
      );
      writeLocal({
        signedIn: mockSignedIn,
        savedStyles,
        collections: next,
        creations,
      });
    },
    [remote, collections, mockSignedIn, savedStyles, creations],
  );

  const addCreation = useCallback(
    async (input: AddCreationInput): Promise<AddCreationResult> => {
      if (remote) {
        if (!input.resultFile) {
          return { ok: false, error: "Select your transformed result first." };
        }
        track("creation_upload_started", {
          style_id: input.styleId,
          has_source: Boolean(input.sourceFile),
        });
        const form = new FormData();
        form.append("result", input.resultFile);
        if (input.sourceFile) form.append("source", input.sourceFile);
        form.append("styleSlug", input.styleId);
        form.append("notes", input.notes);
        form.append("promptSnapshot", input.prompt);

        const response = await fetch("/api/creations", {
          method: "POST",
          body: form,
        });
        const payload = (await response.json().catch(() => ({}))) as {
          creation?: Creation;
          error?: string;
        };
        if (!response.ok || !payload.creation) {
          return {
            ok: false,
            error: payload.error ?? "Could not save creation.",
          };
        }
        setCreations((prev) => [payload.creation!, ...prev]);
        track("creation_upload_completed", {
          style_id: input.styleId,
          has_source: Boolean(input.sourceFile),
        });
        return { ok: true, creation: payload.creation };
      }

      if (!input.result) {
        return { ok: false, error: "Select your transformed result first." };
      }
      const date = new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date());
      const creation: Creation = {
        id: `creation-${Date.now()}`,
        result: input.result,
        source: input.source ?? "",
        styleId: input.styleId,
        styleName: input.styleName,
        notes: input.notes,
        prompt: input.prompt,
        date,
      };
      const next = [creation, ...creations];
      setCreations(next);
      writeLocal({
        signedIn: mockSignedIn,
        savedStyles,
        collections,
        creations: next,
      });
      track("creation_upload_completed", {
        style_id: input.styleId,
        has_source: Boolean(input.source),
      });
      return { ok: true, creation };
    },
    [remote, creations, mockSignedIn, savedStyles, collections],
  );

  const deleteCreation = useCallback(
    async (id: string): Promise<boolean> => {
      const target = creations.find((c) => c.id === id);
      if (remote) {
        const response = await fetch(`/api/creations/${id}`, { method: "DELETE" });
        if (!response.ok) return false;
        setCreations((prev) => prev.filter((c) => c.id !== id));
        track("creation_deleted", { style_id: target?.styleId });
        return true;
      }
      const next = creations.filter((c) => c.id !== id);
      setCreations(next);
      writeLocal({
        signedIn: mockSignedIn,
        savedStyles,
        collections,
        creations: next,
      });
      track("creation_deleted", { style_id: target?.styleId });
      return true;
    },
    [remote, creations, mockSignedIn, savedStyles, collections],
  );

  const removeCreationSource = useCallback(
    async (id: string): Promise<boolean> => {
      if (remote) {
        const response = await fetch(`/api/creations/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ removeSource: true }),
        });
        if (!response.ok) return false;
        const payload = (await response.json().catch(() => ({}))) as {
          creation?: Creation;
        };
        if (payload.creation) {
          setCreations((prev) =>
            prev.map((c) => (c.id === id ? payload.creation! : c)),
          );
        } else {
          setCreations((prev) =>
            prev.map((c) =>
              c.id === id
                ? { ...c, source: "", sourceStorageKey: null }
                : c,
            ),
          );
        }
        return true;
      }
      const next = creations.map((c) =>
        c.id === id ? { ...c, source: "", sourceStorageKey: null } : c,
      );
      setCreations(next);
      writeLocal({
        signedIn: mockSignedIn,
        savedStyles,
        collections,
        creations: next,
      });
      return true;
    },
    [remote, creations, mockSignedIn, savedStyles, collections],
  );

  const value = useMemo(
    () => ({
      ready,
      signedIn,
      role,
      isEditor,
      savedStyles,
      collections,
      creations,
      pendingAction,
      signIn,
      signOut,
      setPendingAction,
      toggleSave,
      isSaved,
      createCollection,
      moveStyleToCollection,
      addCreation,
      deleteCreation,
      removeCreationSource,
      refreshCreations,
    }),
    [
      ready,
      signedIn,
      role,
      isEditor,
      savedStyles,
      collections,
      creations,
      pendingAction,
      signIn,
      signOut,
      setPendingAction,
      toggleSave,
      isSaved,
      createCollection,
      moveStyleToCollection,
      addCreation,
      deleteCreation,
      removeCreationSource,
      refreshCreations,
    ],
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used within LibraryProvider");
  return ctx;
}
