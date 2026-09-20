"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const STORAGE_KEY = "aiPromptGridState";

export type Collection = {
  id: string;
  name: string;
  styleIds: string[];
};

export type Creation = {
  id: string;
  result: string;
  source: string;
  styleId: string;
  styleName: string;
  date: string;
  notes: string;
  prompt: string;
};

type PendingAction =
  | { type: "save-style"; styleId: string }
  | { type: "save-result"; styleId: string }
  | { type: "open-library" }
  | null;

type PersistedLibrary = {
  signedIn: boolean;
  savedStyles: string[];
  collections: Collection[];
  creations: Creation[];
};

type LibraryState = PersistedLibrary & {
  ready: boolean;
  pendingAction: PendingAction;
  signIn: (options?: { saveStyleId?: string }) => void;
  signOut: () => void;
  setPendingAction: (action: PendingAction) => void;
  toggleSave: (styleId: string) => boolean;
  isSaved: (styleId: string) => boolean;
  createCollection: (name: string) => void;
  moveStyleToCollection: (styleId: string, collectionId: string) => void;
  addCreation: (creation: Omit<Creation, "id" | "date">) => void;
  deleteCreation: (id: string) => void;
};

const defaultCollections: Collection[] = [
  { id: "saved-styles", name: "Saved styles", styleIds: [] },
];

const emptyPersisted: PersistedLibrary = {
  signedIn: false,
  savedStyles: [],
  collections: defaultCollections,
  creations: [],
};

let memoryStore: PersistedLibrary = emptyPersisted;
/** False until after mount so hydration matches the server snapshot. */
let clientReady = false;
const listeners = new Set<() => void>();
let pendingActionStore: PendingAction = null;
const pendingListeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function emitPending() {
  pendingListeners.forEach((listener) => listener());
}

function readStore(): PersistedLibrary {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyPersisted;
    const parsed = JSON.parse(raw) as Partial<PersistedLibrary>;
    return {
      signedIn: Boolean(parsed.signedIn),
      savedStyles: parsed.savedStyles ?? [],
      collections: parsed.collections?.length
        ? parsed.collections
        : [{ id: "saved-styles", name: "Saved styles", styleIds: parsed.savedStyles ?? [] }],
      creations: parsed.creations ?? [],
    };
  } catch {
    return emptyPersisted;
  }
}

function writeStore(next: PersistedLibrary) {
  memoryStore = next;
  if (clientReady) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota errors here
    }
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  // Must match getServerSnapshot during hydration.
  if (!clientReady) return emptyPersisted;
  return memoryStore;
}

function getServerSnapshot() {
  return emptyPersisted;
}

function subscribePending(listener: () => void) {
  pendingListeners.add(listener);
  return () => pendingListeners.delete(listener);
}

function getPendingSnapshot() {
  return pendingActionStore;
}

const LibraryContext = createContext<LibraryState | null>(null);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const persisted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const pendingAction = useSyncExternalStore(
    subscribePending,
    getPendingSnapshot,
    () => null,
  );

  useEffect(() => {
    memoryStore = readStore();
    clientReady = true;
    emit();
  }, []);

  const setPendingAction = useCallback((action: PendingAction) => {
    pendingActionStore = action;
    emitPending();
  }, []);

  const signIn = useCallback((options?: { saveStyleId?: string }) => {
    const styleId = options?.saveStyleId;
    const savedStyles =
      styleId && !memoryStore.savedStyles.includes(styleId)
        ? [...memoryStore.savedStyles, styleId]
        : memoryStore.savedStyles;
    const collections = memoryStore.collections.map((c) =>
      c.id === "saved-styles" && styleId && !c.styleIds.includes(styleId)
        ? { ...c, styleIds: [...c.styleIds, styleId] }
        : c,
    );
    writeStore({
      ...memoryStore,
      signedIn: true,
      savedStyles,
      collections,
    });
  }, []);

  const signOut = useCallback(() => {
    writeStore({ ...memoryStore, signedIn: false });
  }, []);

  const isSaved = useCallback(
    (styleId: string) => persisted.savedStyles.includes(styleId),
    [persisted.savedStyles],
  );

  const toggleSave = useCallback((styleId: string) => {
    if (!memoryStore.signedIn) return false;
    const exists = memoryStore.savedStyles.includes(styleId);
    const savedStyles = exists
      ? memoryStore.savedStyles.filter((id) => id !== styleId)
      : [...memoryStore.savedStyles, styleId];
    const collections = memoryStore.collections.map((c) => {
      if (exists) {
        return { ...c, styleIds: c.styleIds.filter((id) => id !== styleId) };
      }
      if (c.id === "saved-styles" && !c.styleIds.includes(styleId)) {
        return { ...c, styleIds: [...c.styleIds, styleId] };
      }
      return c;
    });
    writeStore({ ...memoryStore, savedStyles, collections });
    return true;
  }, []);

  const createCollection = useCallback((name: string) => {
    writeStore({
      ...memoryStore,
      collections: [
        ...memoryStore.collections,
        { id: `collection-${Date.now()}`, name, styleIds: [] },
      ],
    });
  }, []);

  const moveStyleToCollection = useCallback((styleId: string, collectionId: string) => {
    writeStore({
      ...memoryStore,
      collections: memoryStore.collections.map((c) =>
        c.id === collectionId && !c.styleIds.includes(styleId)
          ? { ...c, styleIds: [...c.styleIds, styleId] }
          : c,
      ),
    });
  }, []);

  const addCreation = useCallback((creation: Omit<Creation, "id" | "date">) => {
    const date = new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date());
    writeStore({
      ...memoryStore,
      creations: [{ ...creation, id: `creation-${Date.now()}`, date }, ...memoryStore.creations],
    });
  }, []);

  const deleteCreation = useCallback((id: string) => {
    writeStore({
      ...memoryStore,
      creations: memoryStore.creations.filter((c) => c.id !== id),
    });
  }, []);

  const value = useMemo(
    () => ({
      ...persisted,
      ready: clientReady,
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
    }),
    [
      persisted,
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
    ],
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used within LibraryProvider");
  return ctx;
}
