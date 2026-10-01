import { ImageResponse } from "next/og";

export const alt = "AI Prompt Grid — tested photo transformation prompts";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default Open Graph / social preview for routes without their own image. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(145deg, #0b0b10 0%, #15151e 45%, #1a1428 100%)",
          color: "#F5F3EE",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg, #9A7BFF 0%, #7B4DFF 100%)",
              display: "flex",
            }}
          />
          AI Prompt Grid
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 1.05,
              maxWidth: 920,
            }}
          >
            Find a look. Keep your story.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#A6A4B2",
              maxWidth: 820,
              lineHeight: 1.35,
            }}
          >
            Tested photo-transformation prompts for ChatGPT, Gemini, and other AI
            image editors.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
