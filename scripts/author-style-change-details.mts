/**
 * Offline authoring for Glass Icon Bento "What changes" detail copy.
 * Output: src/lib/catalog/style-change-details.ts
 *
 * Run: npx tsx scripts/author-style-change-details.mts
 *
 * Text is derived from each style's title, note, description, mood,
 * background, and prompt template — never generic boilerplate.
 */
import fs from "node:fs";
import path from "node:path";
import {
  inferStyleChangeCategory,
  STYLE_CHANGE_CATEGORIES,
  type StyleChangeCategoryId,
} from "../src/lib/catalog/style-change-categories";
import type { StyleChangeDetail } from "../src/lib/catalog/style-change-detail-types";
import { getPublishedStyles } from "../src/lib/catalog/styles";
import type { CatalogStyle } from "../src/lib/catalog/types";

const OUT = path.join(process.cwd(), "src/lib/catalog/style-change-details.ts");
const SHORT_MAX = 95;

const STOP = new Set([
  "the", "a", "an", "and", "or", "of", "on", "in", "into", "with", "for", "from",
  "your", "you", "to", "as", "at", "by", "is", "are", "be", "this", "that", "one",
  "two", "photo", "photos", "portrait", "portraits", "ai", "prompt", "prompts",
  "free", "gemini", "chatgpt", "copy", "paste", "edit", "editing", "style",
  "look", "looks", "image", "images", "using", "keep", "keeps", "made", "create",
  "creating", "upload", "uploaded", "clear", "both", "each", "their", "them",
  "preserve", "preserving", "exact", "facial", "identity", "do", "not", "while",
  "keeping", "subject", "subjects", "selected", "follow", "settings", "if",
  "clothing", "pose", "place", "apply", "compose", "final", "ratio", "without",
]);

function words(s: string): string[] {
  return s.split(/\s+/).filter(Boolean);
}

function clampChars(text: string, max: number): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  const sliced = cleaned.slice(0, max - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  return `${(lastSpace > 36 ? sliced.slice(0, lastSpace) : sliced).trimEnd()}…`;
}

function upperFirst(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function lowerFirst(s: string): string {
  return s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}

function cleanTitle(title: string): string {
  return title
    .replace(/\([^)]*\)/g, " ")
    .replace(/\bAI\s+Photo\s+(Editing\s+)?Prompt\b/gi, " ")
    .replace(/\bPhoto\s+Editing\s+Prompt\b/gi, " ")
    .replace(/\bAI\s+Prompt\b/gi, " ")
    .replace(/\bPrompt\b/gi, " ")
    .replace(/\b(Copy-?Paste|Free|Gemini|ChatGPT|Trending|Viral)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function keywords(text: string, max = 5): string[] {
  const raw = text
    .replace(/[()[\]|:·"']/g, " ")
    .replace(/[-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const picked: string[] = [];
  for (const w of words(raw)) {
    const clean = w.replace(/[^a-zA-Z0-9']/g, "");
    if (!clean || clean.length < 3) continue;
    if (STOP.has(clean.toLowerCase())) continue;
    if (picked.some((p) => p.toLowerCase() === clean.toLowerCase())) continue;
    picked.push(clean);
    if (picked.length >= max) break;
  }
  return picked;
}

function excerpt(text: string, maxWords = 12): string {
  const cleaned = text
    .replace(/\{\{[^}]+\}\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return words(cleaned).slice(0, maxWords).join(" ");
}

type StyleBits = {
  titleShort: string;
  note: string;
  mood: string;
  background: string;
  themeWords: string[];
  outfitHint: string | null;
  poseHint: string | null;
  lightingHint: string | null;
  atmosphereHint: string | null;
  artHint: string | null;
  propHint: string | null;
  peopleHint: string | null;
  template: string;
};

function extractBetween(template: string, start: RegExp, end: RegExp): string | null {
  const s = start.exec(template);
  if (!s || s.index == null) return null;
  const from = s.index + s[0].length;
  const rest = template.slice(from);
  const e = end.exec(rest);
  const chunk = (e ? rest.slice(0, e.index) : rest).replace(/\s+/g, " ").trim();
  return chunk.length > 12 ? chunk : null;
}

function bitsFor(style: CatalogStyle): StyleBits {
  const template = style.promptVariant.template;
  const mood = style.promptVariant.defaults.mood;
  const background = style.promptVariant.defaults.background;
  const titleShort = cleanTitle(style.title);
  const themeWords = keywords(
    [titleShort, style.note, mood, background].join(" "),
    8,
  );

  const rawOutfit =
    extractBetween(
      template,
      /If clothing is not preserved[,:]?\s*/i,
      /\.\s+(If pose|Place the|Apply |Do not)/i,
    ) ??
    template.match(
      /(?:dress the (?:woman|man|couple|subject|them)|style the couple|wear)[^.…]{8,120}/i,
    )?.[0] ??
    null;
  const outfitHint = rawOutfit
    ? excerpt(
        rawOutfit
          .replace(/^If clothing is not preserved[,:]?\s*/i, "")
          .replace(
            /^(?:dress|style)\s+(?:the\s+)?(?:woman|man|couple|subject|them)\s+in\s+/i,
            "",
          )
          .replace(/^wear\s+/i, ""),
        16,
      ) || null
    : null;

  const rawPose = extractBetween(
    template,
    /If pose is not preserved[,:]?\s*/i,
    /\.\s+(Place the|Apply |Do not|Follow)/i,
  );
  const poseHint = rawPose
    ? excerpt(
        rawPose
          .replace(/^If pose is not preserved[,:]?\s*/i, "")
          .replace(/^(?:position|arrange|place) them\s+/i, ""),
        16,
      ) || null
    : null;

  const lightingHint = /light|glow|lamp|flash|rim|sun|neon|golden/i.test(mood)
    ? mood
    : template.match(
        /\b(?:lit by|lighting|backlit|rim light|golden-hour|soft flash|warm lamp)[^.…]{0,60}/i,
      )?.[0] ?? mood;

  const atmosphereHint =
    template.match(
      /\b(?:swirling|layered)?\s*(?:smoke|fog|mist|snow|rain|sparkle|bokeh|aura|haze|steam|vapor)[^.…]{0,50}/i,
    )?.[0] ?? null;

  const artHint =
    template.match(
      /\b(?:anime|cel-shaded|pixel|illustration|hand-painted|watercolor|manga|chibi|3D|film grain|retro)[^.…]{0,50}/i,
    )?.[0] ?? null;

  const propHint =
    template.match(
      /\b(?:rows of glowing clay diyas|rangoli|lanterns?|balloons?|birthday cake|bouquet|chandelier|string lights?|fairy lights?|sparklers?|phuljhadi)[^.…]{0,50}/i,
    )?.[0] ?? null;

  const peopleHint =
    template.match(
      /\b(?:couple standing|family gathered|both (?:people|faces)|group of friends|crowd)[^.…]{0,50}/i,
    )?.[0] ?? null;

  return {
    titleShort,
    note: style.note,
    mood,
    background,
    themeWords,
    outfitHint: outfitHint ? excerpt(outfitHint, 18) : null,
    poseHint: poseHint ? excerpt(poseHint, 18) : null,
    lightingHint: lightingHint ? excerpt(lightingHint, 14) : null,
    atmosphereHint: atmosphereHint ? excerpt(atmosphereHint, 14) : null,
    artHint: artHint ? excerpt(artHint, 14) : null,
    propHint: propHint ? excerpt(propHint, 14) : null,
    peopleHint: peopleHint ? excerpt(peopleHint, 12) : null,
    template,
  };
}

function themePhrase(bits: StyleBits, n = 3): string {
  return bits.themeWords.slice(0, n).join(" ") || bits.titleShort;
}

function bgShort(bits: StyleBits, n = 8): string {
  return lowerFirst(excerpt(bits.background, n));
}

function chipFor(
  category: StyleChangeCategoryId,
  bits: StyleBits,
  label: string,
): string {
  const base = STYLE_CHANGE_CATEGORIES[category].defaultChip;
  const tag = keywords(label, 2).join(" ") || keywords(themePhrase(bits, 2), 2).join(" ");
  if (!tag) return base;
  const head = base.split("·")[0]?.trim() ?? base;
  return clampChars(`${head} · ${upperFirst(tag)}`, 42);
}

function beforeFor(category: StyleChangeCategoryId, label: string): string {
  switch (category) {
    case "BACKDROP":
      return "Original room or outdoor clutter";
    case "LIGHTING":
      return "Flat ambient source light";
    case "ATMOSPHERE":
      return "Empty foreground air";
    case "TONE & COLOR":
      return "Neutral camera color";
    case "OUTFIT":
      return "Source clothing as shot";
    case "JEWELLERY & ACCESSORIES":
      return "Bare or mismatched accessories";
    case "POSE & FRAMING":
      return "Source stance and crop";
    case "LAYOUT":
      return "Single unframed still";
    case "PROPS & DECOR":
      return "Undressed empty scene";
    case "ART STYLE":
      return "Straight photographic capture";
    case "HAIR & MAKEUP":
      return "Everyday grooming as shot";
    case "PEOPLE":
      return "Source cast only as framed";
    default:
      return `Source ${label.toLowerCase()}`;
  }
}

function tidyHint(hint: string | null, label: string, max = 48): string {
  if (!hint) return label;
  const cleaned = hint
    .replace(/\b(proportions?|recognizable features?|facial identity|natural skin)\b/gi, "")
    .replace(/\s+/g, " ")
    .replace(/^[,;.\s]+/, "")
    .trim();
  if (cleaned.length < 8 || /^(and|or|the|with)\b/i.test(cleaned)) return label;
  return clampChars(upperFirst(cleaned), max);
}

function afterFor(
  category: StyleChangeCategoryId,
  label: string,
  bits: StyleBits,
): string {
  switch (category) {
    case "BACKDROP":
      return tidyHint(bgShort(bits, 7), label);
    case "LIGHTING":
      return tidyHint(bits.lightingHint || bits.mood, label);
    case "ATMOSPHERE":
      return tidyHint(bits.atmosphereHint, label);
    case "TONE & COLOR":
      return clampChars(upperFirst(`${bits.mood} grade`), 48);
    case "OUTFIT":
      return tidyHint(bits.outfitHint, label);
    case "POSE & FRAMING":
      return tidyHint(bits.poseHint, label);
    case "ART STYLE":
      return tidyHint(bits.artHint, label);
    case "PROPS & DECOR":
      // Prefer the change label — prop regex hits are often noisy.
      return label;
    case "PEOPLE":
      return tidyHint(bits.peopleHint, label);
    default:
      return label;
  }
}

function triggerFor(
  category: StyleChangeCategoryId,
  label: string,
  bits: StyleBits,
): string {
  const labelLower = label.toLowerCase();
  switch (category) {
    case "BACKDROP":
      return clampChars(`against ${bgShort(bits, 10) || `a ${labelLower}`}`, 90);
    case "LIGHTING":
      return clampChars(
        bits.lightingHint || `${bits.mood} lighting`,
        90,
      );
    case "ATMOSPHERE":
      return clampChars(bits.atmosphereHint || labelLower, 90);
    case "TONE & COLOR":
      return clampChars(`${bits.mood} color grading`, 90);
    case "OUTFIT":
      return clampChars(bits.outfitHint || labelLower, 90);
    case "POSE & FRAMING":
      return clampChars(bits.poseHint || labelLower, 90);
    case "ART STYLE":
      return clampChars(bits.artHint || labelLower, 90);
    case "PROPS & DECOR":
      return clampChars(
        bits.propHint && bits.propHint.length < 60 ? bits.propHint : labelLower,
        90,
      );
    case "LAYOUT":
      return clampChars(labelLower, 90);
    case "JEWELLERY & ACCESSORIES":
      return clampChars(labelLower, 90);
    case "HAIR & MAKEUP":
      return clampChars(labelLower, 90);
    case "PEOPLE":
      return clampChars(bits.peopleHint || labelLower, 90);
    default:
      return labelLower;
  }
}

function shortTemplates(
  category: StyleChangeCategoryId,
  label: string,
  bits: StyleBits,
): string[] {
  const theme = themePhrase(bits, 3);
  const bg = bgShort(bits, 6);
  const mood = excerpt(bits.mood, 5);
  const note = excerpt(bits.note, 6);
  const labelL = lowerFirst(label);

  const outfitBit = bits.outfitHint
    ? lowerFirst(excerpt(bits.outfitHint, 8))
    : labelL;
  const moodL = lowerFirst(mood || "fresh");
  const genericLabel = /^(outfit|background|lighting|color mood|pose|props|decor|atmosphere)$/i.test(
    label,
  );

  switch (category) {
    case "BACKDROP":
      return [
        `Replaces the setting with ${bg || theme} for this ${note || theme} look.`,
        `Moves you into ${bg || theme}, matching the ${note || "prompt"} scene.`,
        `Swaps walls and scenery for ${bg || labelL} while faces stay sharp.`,
        `Isolates the frame in ${bg || theme} from the style’s prompt.`,
      ];
    case "LIGHTING":
      return [
        `Shapes ${moodL} light across face and wardrobe for ${theme}.`,
        `Rebuilds key and rim light to the ${moodL} cue in the prompt.`,
        `Applies ${genericLabel ? moodL + " lighting" : labelL} so highlights match ${theme}.`,
        `Restages illumination to ${moodL} for ${theme}.`,
      ];
    case "ATMOSPHERE":
      return [
        `Adds ${labelL} around the subject for ${theme} depth.`,
        `Layers ${bits.atmosphereHint ? lowerFirst(excerpt(bits.atmosphereHint, 8)) : labelL} without covering facial detail.`,
        `Builds airy ${labelL} so ${theme} feels dimensional.`,
        `Wraps the frame in ${labelL} drawn from the prompt’s mood.`,
      ];
    case "TONE & COLOR":
      return [
        `Grades the image to ${moodL} while skin stays natural.`,
        `Shifts palette into ${moodL} for the ${theme} finish.`,
        `Applies ${genericLabel ? moodL + " grading" : labelL} so contrast matches ${theme}.`,
        `Tunes midtones toward ${moodL} from the prompt defaults.`,
      ];
    case "OUTFIT":
      return [
        `Restyles wardrobe to ${outfitBit} for ${theme}.`,
        `Changes clothing to ${outfitBit}, keeping face and proportions.`,
        `Fits the ${theme} look with ${outfitBit} from the prompt.`,
        `Swaps source clothes for ${outfitBit} while identity stays locked.`,
      ];
    case "JEWELLERY & ACCESSORIES":
      return [
        `Adds ${labelL} that finish the ${theme} styling.`,
        `Layers ${labelL} as accent detail from the prompt.`,
        `Completes the look with ${labelL} without changing your face.`,
        `Styles ${labelL} to match ${theme}.`,
      ];
    case "POSE & FRAMING":
      return [
        `Adjusts stance to ${excerpt(bits.poseHint || label, 8)} for ${theme}.`,
        `Reframes the body into ${labelL} while identity stays locked.`,
        `Sets ${labelL} so the ${theme} composition reads clean.`,
        `Guides posture toward ${excerpt(bits.poseHint || note, 7)}.`,
      ];
    case "LAYOUT":
      return [
        `Arranges the output as ${labelL} for a ${theme} storyboard.`,
        `Rebuilds the canvas into ${labelL} panels from the prompt.`,
        `Uses ${labelL} so ${theme} reads as a sequenced frame.`,
        `Composes ${labelL} without losing recognizable faces.`,
      ];
    case "PROPS & DECOR":
      return [
        `Adds ${labelL} so the set matches ${note || theme}.`,
        `Dresses the scene with ${labelL} for ${theme}.`,
        `Places ${labelL} as practical detail from the prompt.`,
        `Builds ${labelL} into ${bg || theme}.`,
      ];
    case "ART STYLE":
      return [
        `Restyles the photo into ${excerpt(bits.artHint || label, 8)}.`,
        `Applies ${labelL} while preserving your likeness.`,
        `Converts capture into ${labelL} for ${theme}.`,
        `Pushes medium toward ${excerpt(bits.artHint || theme, 7)}.`,
      ];
    case "HAIR & MAKEUP":
      return [
        `Restyles ${labelL} to suit ${theme} without changing bone structure.`,
        `Updates ${labelL} as finishing detail for ${note || theme}.`,
        `Applies ${labelL} softly so skin texture stays real.`,
        `Tunes ${labelL} to the ${theme} brief.`,
      ];
    case "PEOPLE":
      return [
        `Keeps ${excerpt(bits.peopleHint || "every subject", 6)} clear for ${theme}.`,
        `Stages ${labelL} so each face stays recognizable.`,
        `Handles ${labelL} as cast direction from the prompt.`,
        `Arranges ${labelL} inside ${bg || theme}.`,
      ];
    default:
      return [`Updates ${labelL} for ${theme}.`];
  }
}

function summaryFor(
  category: StyleChangeCategoryId,
  label: string,
  bits: StyleBits,
): string {
  const theme = bits.titleShort;
  const bg = bgShort(bits, 12);
  const mood = bits.mood;
  const s1Variants: Record<StyleChangeCategoryId, string[]> = {
    BACKDROP: [
      `This change relocates you into ${bg}, the backdrop written for ${theme}.`,
      `The prompt rebuilds the environment as ${bg} so ${theme} feels grounded.`,
    ],
    LIGHTING: [
      `Lighting is rebuilt around ${mood} so ${theme} gets dimensional highlights.`,
      `The pass restages illumination using the prompt’s ${mood} cue for ${theme}.`,
    ],
    ATMOSPHERE: [
      `Atmospheric detail adds ${label.toLowerCase()} drawn from the ${theme} brief.`,
      `${upperFirst(label)} wraps the subject to deepen ${theme} without hiding eyes or skin.`,
    ],
    "TONE & COLOR": [
      `Color grading shifts toward ${mood}, matching the ${theme} finish.`,
      `The palette is tuned to ${mood} so ${theme} reads cohesive end-to-end.`,
    ],
    OUTFIT: [
      `Wardrobe becomes ${label.toLowerCase()}, matching the ${theme} brief${bits.outfitHint ? ` (${excerpt(bits.outfitHint, 10)})` : ""}.`,
      `Clothing is restyled into ${label.toLowerCase()} while face geometry stays fixed.`,
    ],
    "JEWELLERY & ACCESSORIES": [
      `${upperFirst(label)} is layered as finishing accent for ${theme}.`,
      `Accessories follow the prompt’s ${label.toLowerCase()} note without altering identity.`,
    ],
    "POSE & FRAMING": [
      `Body language moves toward ${excerpt(bits.poseHint || label, 14)} for ${theme}.`,
      `Framing and stance are guided by the prompt so ${theme} still shows your face clearly.`,
    ],
    LAYOUT: [
      `The canvas is reorganized into ${label.toLowerCase()} to tell the ${theme} story.`,
      `${upperFirst(label)} sequences the result while each likeness stays readable.`,
    ],
    "PROPS & DECOR": [
      `Set dressing introduces ${label.toLowerCase()} into ${bg || theme}.`,
      `${upperFirst(label)} is placed as practical detail called out in the ${theme} prompt.`,
    ],
    "ART STYLE": [
      `The medium shifts into ${excerpt(bits.artHint || label, 14)} for ${theme}.`,
      `${upperFirst(label)} restyles the capture while preservation rules keep your face intact.`,
    ],
    "HAIR & MAKEUP": [
      `${upperFirst(label)} is refined to support ${theme} without rewriting facial identity.`,
      `Grooming follows the ${label.toLowerCase()} cue so ${theme} still looks like you.`,
    ],
    PEOPLE: [
      `Cast direction covers ${excerpt(bits.peopleHint || label, 12)} inside ${theme}.`,
      `${upperFirst(label)} is handled so every recognizable face stays true to source.`,
    ],
  };

  const s2Variants: Record<StyleChangeCategoryId, string[]> = {
    BACKDROP: [
      `Edges, scale, and perspective are blended so you sit naturally in the new space.`,
      `Hair edges and body proportions stay intact while room clutter disappears.`,
    ],
    LIGHTING: [
      `Facial exposure stays balanced so skin tone does not drift unnaturally.`,
      `Specular accents land on hair and wardrobe, not as harsh face bleaching.`,
    ],
    ATMOSPHERE: [
      `Particles and haze curve around the torso so eyes and texture stay readable.`,
      `Depth cues stay secondary to likeness—never a full-face cover-up.`,
    ],
    "TONE & COLOR": [
      `Midtones stay anchored so features remain sharp and recognizable.`,
      `Contrast is editorial, not crushed—skin detail survives the grade.`,
    ],
    OUTFIT: [
      `Fabric folds and seams stay photoreal while your proportions are preserved.`,
      `Identity locks remain on face shape, eyes, and skin even after the wardrobe swap.`,
    ],
    "JEWELLERY & ACCESSORIES": [
      `Metal and sparkle read as secondary accents, never covering facial landmarks.`,
      `Scale stays believable against your shoulders and neckline.`,
    ],
    "POSE & FRAMING": [
      `Hands and shoulders stay anatomically sane while the new stance sells the story.`,
      `Cropping avoids chopping faces even when the camera angle shifts.`,
    ],
    LAYOUT: [
      `Each panel inherits the same identity lock so you do not morph between tiles.`,
      `Gutters and frames stay clean without watermarks or extra strangers.`,
    ],
    "PROPS & DECOR": [
      `Props respect depth and contact shadows so they feel planted, not pasted.`,
      `Nothing in the dressing pass invents extra people or distorted hands.`,
    ],
    "ART STYLE": [
      `Line, grain, or paint texture wraps the scene without redrawing your likeness.`,
      `Stylization follows the prompt’s medium notes while preservation targets hold.`,
    ],
    "HAIR & MAKEUP": [
      `Changes stay soft and photographic—no beauty filter that erases you.`,
      `Bone structure and natural skin texture remain the priority.`,
    ],
    PEOPLE: [
      `No blending or face-swapping between subjects is allowed.`,
      `Each person keeps their own source identity, age cues, and proportions.`,
    ],
  };

  const hash = Math.abs(
    [...(bits.titleShort + label)].reduce((a, c) => a + c.charCodeAt(0), 0),
  );
  const s1 = s1Variants[category][hash % s1Variants[category].length]!;
  const s2 = s2Variants[category][(hash >> 3) % s2Variants[category].length]!;
  return `${s1} ${s2}`;
}

function uniqueShort(
  candidates: string[],
  used: Set<string>,
  salt: string,
): string {
  for (const raw of candidates) {
    const base = clampChars(raw.replace(/\s+/g, " ").trim(), SHORT_MAX);
    if (!used.has(base.toLowerCase())) {
      used.add(base.toLowerCase());
      return base;
    }
  }
  // Salt with distinctive tokens until unique
  for (let i = 0; i < 40; i++) {
    const token = keywords(salt, 6).slice(i % 4, (i % 4) + 3).join(" ") || `v${i}`;
    const base = clampChars(
      `${candidates[0]!.replace(/\.$/, "")} (${token}).`,
      SHORT_MAX,
    );
    if (!used.has(base.toLowerCase())) {
      used.add(base.toLowerCase());
      return base;
    }
  }
  const fallback = clampChars(`${candidates[0]} · ${salt}`, SHORT_MAX);
  used.add(fallback.toLowerCase());
  return fallback;
}

function authorDetail(
  style: CatalogStyle,
  label: string,
  usedShorts: Set<string>,
): StyleChangeDetail {
  const bits = bitsFor(style);
  const category = inferStyleChangeCategory(label);
  const shorts = shortTemplates(category, label, bits);
  const shortDescription = uniqueShort(
    shorts,
    usedShorts,
    `${style.id} ${label} ${bits.mood} ${bits.background}`,
  );

  return {
    label,
    category,
    shortDescription,
    summary: summaryFor(category, label, bits),
    beforeLabel: beforeFor(category, label),
    afterLabel: afterFor(category, label, bits),
    trigger: triggerFor(category, label, bits),
    chip: chipFor(category, bits, label),
  };
}

function serialize(details: Record<string, StyleChangeDetail[]>): string {
  const keys = Object.keys(details).sort((a, b) => a.localeCompare(b));
  const lines: string[] = [
    "/**",
    " * Per-style Glass Icon Bento detail copy for every published style's",
    " * change labels. Authored offline from each style's prompt, title,",
    " * mood, and background — re-run:",
    " * `npx tsx scripts/author-style-change-details.mts`",
    " */",
    'import type { StyleChangeDetailsMap } from "./style-change-detail-types";',
    "",
    "export const STYLE_CHANGE_DETAILS: StyleChangeDetailsMap = {",
  ];

  for (const id of keys) {
    const items = details[id]!;
    lines.push(`  ${JSON.stringify(id)}: [`);
    for (const item of items) {
      lines.push("    {");
      lines.push(`      label: ${JSON.stringify(item.label)},`);
      lines.push(`      category: ${JSON.stringify(item.category)},`);
      lines.push(
        `      shortDescription: ${JSON.stringify(item.shortDescription)},`,
      );
      lines.push(`      summary: ${JSON.stringify(item.summary)},`);
      lines.push(`      beforeLabel: ${JSON.stringify(item.beforeLabel)},`);
      lines.push(`      afterLabel: ${JSON.stringify(item.afterLabel)},`);
      lines.push(`      trigger: ${JSON.stringify(item.trigger)},`);
      lines.push(`      chip: ${JSON.stringify(item.chip)},`);
      lines.push("    },");
    }
    lines.push("  ],");
  }

  lines.push("};");
  lines.push("");
  return lines.join("\n");
}

function main() {
  const styles = getPublishedStyles();
  const usedShorts = new Set<string>();
  const details: Record<string, StyleChangeDetail[]> = {};
  const categoryCounts = new Map<StyleChangeCategoryId, number>();

  for (const style of styles) {
    details[style.id] = style.changes.map((label) => {
      const item = authorDetail(style, label, usedShorts);
      categoryCounts.set(
        item.category,
        (categoryCounts.get(item.category) ?? 0) + 1,
      );
      if (item.shortDescription.length > SHORT_MAX) {
        throw new Error(
          `shortDescription too long for ${style.id}/${label}: ${item.shortDescription.length}`,
        );
      }
      return item;
    });
  }

  // Verify uniqueness
  if (usedShorts.size !== [...usedShorts].length) {
    throw new Error("shortDescription uniqueness set corrupted");
  }
  const allShorts = Object.values(details).flatMap((items) =>
    items.map((i) => i.shortDescription.toLowerCase()),
  );
  if (new Set(allShorts).size !== allShorts.length) {
    throw new Error("Duplicate shortDescriptions remain");
  }

  // Verify coverage
  for (const style of styles) {
    const items = details[style.id]!;
    if (items.length !== style.changes.length) {
      throw new Error(`Length mismatch for ${style.id}`);
    }
    for (let i = 0; i < style.changes.length; i++) {
      if (items[i]!.label !== style.changes[i]) {
        throw new Error(`Label mismatch for ${style.id} at ${i}`);
      }
    }
  }

  fs.writeFileSync(OUT, serialize(details), "utf8");

  console.log(
    `Wrote ${styles.length} styles, ${allShorts.length} change details → ${path.relative(process.cwd(), OUT)}`,
  );
  console.log("Category counts:");
  for (const id of Object.keys(STYLE_CHANGE_CATEGORIES) as StyleChangeCategoryId[]) {
    console.log(`  ${id}: ${categoryCounts.get(id) ?? 0}`);
  }
}

main();
