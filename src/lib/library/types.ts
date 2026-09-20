export type Collection = {
  id: string;
  name: string;
  styleIds: string[];
};

export type Creation = {
  id: string;
  /** Display URL: signed URL (remote) or data URL (local mock). */
  result: string;
  /** Display URL for optional source; empty string when absent. */
  source: string;
  /** Catalog style slug (matches CatalogStyle.id in the app). */
  styleId: string;
  styleName: string;
  date: string;
  notes: string;
  prompt: string;
  toolUsed?: string;
  resultStorageKey?: string;
  sourceStorageKey?: string | null;
};
