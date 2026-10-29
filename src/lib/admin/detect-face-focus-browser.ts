/**
 * Admin helper: ask the server to detect focus for a remote image URL.
 * File uploads get focus from the assets route response instead.
 */

import {
  DEFAULT_IMAGE_FOCUS,
  type ImageFocus,
} from "@/lib/catalog/image-focus";

export async function detectFaceFocusFromUrl(url: string): Promise<ImageFocus> {
  if (!url) return { ...DEFAULT_IMAGE_FOCUS };
  try {
    const response = await fetch("/api/admin/detect-focus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const payload = (await response.json().catch(() => ({}))) as {
      focusX?: number;
      focusY?: number;
      error?: string;
    };
    if (
      !response.ok ||
      typeof payload.focusX !== "number" ||
      typeof payload.focusY !== "number"
    ) {
      return { ...DEFAULT_IMAGE_FOCUS };
    }
    return { x: payload.focusX, y: payload.focusY };
  } catch {
    return { ...DEFAULT_IMAGE_FOCUS };
  }
}

export async function detectFaceFocusFromFile(file: File): Promise<ImageFocus> {
  // Uploads prefer the assets API (detects from the processed buffer).
  // This path is a fallback when detecting before upload.
  const body = new FormData();
  body.append("file", file);
  try {
    const response = await fetch("/api/admin/detect-focus", {
      method: "POST",
      body,
    });
    const payload = (await response.json().catch(() => ({}))) as {
      focusX?: number;
      focusY?: number;
    };
    if (
      !response.ok ||
      typeof payload.focusX !== "number" ||
      typeof payload.focusY !== "number"
    ) {
      return { ...DEFAULT_IMAGE_FOCUS };
    }
    return { x: payload.focusX, y: payload.focusY };
  } catch {
    return { ...DEFAULT_IMAGE_FOCUS };
  }
}
