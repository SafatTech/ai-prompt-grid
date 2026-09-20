# Quality plan

## Goals

Catch broken discovery/copy flows, auth return paths, authorization holes, unsafe uploads, and major responsive/a11y regressions before private beta.

## Automated tests

### Unit (`tests/unit`)

- Prompt assembly from template + variables (required fields block incomplete prompts)  
- Zod schemas for filters, auth forms, creation upload metadata  
- Slug / controlled-vocabulary helpers  

### Playwright smoke (`tests/e2e`)

1. **Guest discovery:** explore → open style detail → resolve options → copy prompt (`data-testid` on primary actions)  
2. **Protected route:** attempt save → sign-in → return-to-action  
3. **Authorization:** two users; swap creation/collection IDs; expect denial for read/edit/download/delete  
4. **Upload:** oversized file rejected; disguised MIME rejected; valid JPEG/PNG/WebP accepted  

Stable selectors: prefer `data-testid` for copy, save, filter chips, sign-in, upload controls.

## Manual checks

### Responsive

- **360px**, tablet, desktop widths  
- No horizontal overflow  
- Detail page stacks; Copy prompt remains easy to reach  

### Accessibility

- Keyboard navigation through filters, cards, modals, upload  
- Visible focus rings  
- Meaningful labels and alt text on before/after pairs  
- Side-by-side or labelled alternative to the compare slider where needed  
- `prefers-reduced-motion` respected  

### Content QA

- Before/after labels correct  
- Prompt variables resolve; no unresolved placeholders on copy  
- Photo requirements and limitations accurate  
- Licensed asset records present for every published pair  

## Error / empty states to verify

| State | Expected |
|---|---|
| No filter results | Clear message + clear filters |
| Auth failure / expired magic link | Recovery path |
| Upload quota (25) | Actionable message |
| Oversized / invalid file | Rejection without storing |
| Missing preview / retired tool | Explained next step |

## Definition of done for a release candidate

- [ ] Unit + Playwright suites green on CI  
- [ ] Mobile visual pass at 360px  
- [ ] Keyboard pass on primary flows  
- [ ] Cross-account authz tests green  
- [ ] Content QA checklist signed for published styles  
