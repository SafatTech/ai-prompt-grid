/** V0 upload policy — keep in sync with docs/engineering/data-model.md */
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const MAX_CREATIONS_PER_USER = 25;
export const MAX_NOTES_LENGTH = 240;
export const MAX_IMAGE_EDGE = 8192;
export const MAX_IMAGE_PIXELS = 36_000_000;
export const SIGNED_URL_TTL_SECONDS = 3600;
export const USER_CREATIONS_BUCKET = "user-creations";

export const ALLOWED_UPLOAD_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type AllowedUploadMime = (typeof ALLOWED_UPLOAD_MIME)[number];
