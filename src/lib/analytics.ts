/**
 * Privacy-safe analytics stubs for Phase 2.
 * Never send image data, private prompts, notes, or email.
 */
type EventName =
  | "style_view"
  | "comparison_interaction"
  | "prompt_copy"
  | "external_tool_click"
  | "sign_in_started"
  | "style_saved";

type EventProps = Record<string, string | number | boolean | undefined>;

export function track(event: EventName, props: EventProps = {}) {
  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", event, props);
  }
  // Phase 6+ may wire a real provider here.
}
