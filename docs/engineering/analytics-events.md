# Analytics events

Track only events that improve discovery, copy, auth, and library flows.

## Allowed events

| Event | When | Properties (safe) |
|---|---|---|
| `style_view` | Style detail opened | `style_id` / slug, `category` |
| `comparison_interaction` | Compare slider used | `style_id`, `surface` (`card` \| `detail`) |
| `prompt_copy` | Copy succeeds | `style_id`, `variant_id`, `tool` |
| `external_tool_click` | User opens external-tool guidance/link | `style_id`, `tool` |
| `sign_in_started` | Auth modal/page opened | `method` (`google` \| `magic_link`), `intent` |
| `sign_in_completed` | Session established | `method`, `intent` |
| `style_saved` | Style saved | `style_id` |
| `collection_created` | Collection created | `collection_id` (opaque) |
| `creation_upload_started` | Upload begins | `style_id`, `has_source` boolean |
| `creation_upload_completed` | Upload succeeds | `style_id`, `has_source` |
| `creation_deleted` | Creation deleted | `style_id` |

## Never send

- Uploaded image bytes or URLs that expose private objects long-term  
- Private prompt text or notes  
- Full email addresses  
- Display names or other PII beyond opaque user ids if required by the analytics vendor  
- Exact file names from the user’s device  

## Implementation notes

- Prefer first-party or privacy-respecting analytics with server-side filtering when possible  
- Gate analytics behind consent if required by the privacy policy jurisdiction  
- Error monitoring (e.g. Sentry) must also scrub private prompts and image payloads — see `SENTRY_DSN` in `.env.example`  

## V0 beta metrics (diagnostic)

| Metric | Definition | Initial target |
|---|---|---|
| Prompt use | Successful copies / style-detail sessions | ≥ 25% |
| Account activation | New accounts that save or upload within 7 days | ≥ 40% |
| Repeat use | Activated accounts with a meaningful action next week | ≥ 20% |
| Upload reliability | Completed valid uploads / initiated valid uploads | ≥ 95% |
