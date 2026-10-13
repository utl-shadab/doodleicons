import {
  isIconStyle,
  normalizeOptions,
  type IconOptions,
} from "doodle-icon";
import {
  vectorSettings,
  type ArtworkOptions,
} from "doodle-icon/collections/render";
export interface InsertMessage {
  type: "insert";
  ids: string[];
  options: IconOptions;
  component: boolean;
  mode: "basic" | "collection" | "library";
  artworkOptions: ArtworkOptions;
}
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
export function parseInsertMessage(value: unknown): InsertMessage | null {
  if (
    !isRecord(value) ||
    value.type !== "insert" ||
    !Array.isArray(value.ids) ||
    value.ids.length < 1 ||
    value.ids.length > 100 ||
    !value.ids.every(
      (id: unknown) => typeof id === "string" && /^[a-z0-9-]{1,220}$/.test(id),
    )
  )
    return null;
  const raw = isRecord(value.options) ? value.options : {};
  const candidate: IconOptions = {};
  if (typeof raw.size === "number") candidate.size = Math.min(512, raw.size);
  if (typeof raw.strokeWidth === "number")
    candidate.strokeWidth = raw.strokeWidth;
  if (typeof raw.color === "string" && /^#[a-fA-F0-9]{6}$/.test(raw.color))
    candidate.color = raw.color;
  if (typeof raw.accent === "string" && /^#[a-fA-F0-9]{6}$/.test(raw.accent))
    candidate.accent = raw.accent;
  if (isIconStyle(raw.iconStyle)) candidate.iconStyle = raw.iconStyle;
  const normalized = normalizeOptions(candidate);
  const source = isRecord(value.artworkOptions) ? value.artworkOptions : {};
  const artworkOptions: ArtworkOptions = {
    size: normalized.size,
    strokeWidth: normalized.strokeWidth,
  };
  for (const key of ["ink", "primary", "secondary", "paper"] as const) {
    const color = source[key];
    if (typeof color === "string" && /^#[a-fA-F0-9]{6}$/.test(color))
      artworkOptions[key] = color;
  }
  return {
    type: "insert",
    ids: [...new Set(value.ids as string[])],
    options: normalized,
    component: value.component === true,
    mode:
      value.mode === "library"
        ? "library"
        : value.mode === "collection"
          ? "collection"
          : "basic",
    artworkOptions: vectorSettings(artworkOptions),
  };
}
