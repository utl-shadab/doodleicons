import type { IconOptions, IconStyle, NormalizedOptions } from "./types.js";
export const styles = [
  {
    id: "doodle",
    label: "Doodle",
    description: "Expressive outlines with a small hand-drawn flourish.",
  },
  {
    id: "outline",
    label: "Outline",
    description: "Clean, open strokes for everyday interfaces.",
  },
  {
    id: "duotone",
    label: "Duotone",
    description: "Two independent colors with subtle filled surfaces.",
  },
  {
    id: "soft",
    label: "Soft",
    description: "Outlined artwork on an organic accent shape.",
  },
] as const satisfies readonly {
  id: IconStyle;
  label: string;
  description: string;
}[];
export const defaultOptions: Readonly<NormalizedOptions> = {
  size: 32,
  width: 32,
  height: 32,
  color: "#242833",
  accent: "#b9cdfa",
  fill: "none",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeStyle: "solid",
  opacity: 1,
  rotation: 0,
  flipX: false,
  flipY: false,
  iconStyle: "doodle",
  partColors: {},
  title: "",
};
export const isIconStyle = (value: unknown): value is IconStyle =>
  styles.some((style) => style.id === value);
const bounded = (
  value: number | undefined,
  fallback: number,
  min: number,
  max: number,
): number =>
  typeof value === "number" && Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback;
export function safeColor(value: unknown, fallback: string): string {
  if (typeof value !== "string" || value.length > 100) return fallback;
  return /^(#[a-f\d]{3,8}|[a-z]+|(?:rgb|hsl)a?\([\d\s.,%/+-]+\)|var\(--[a-z\d_-]+\))$/i.test(
    value,
  )
    ? value
    : fallback;
}
export function normalizeOptions(options: IconOptions = {}): NormalizedOptions {
  const size = bounded(options.size, 32, 8, 2048);
  return {
    size,
    width: bounded(options.width, size, 8, 2048),
    height: bounded(options.height, size, 8, 2048),
    color: safeColor(options.color, defaultOptions.color),
    accent: safeColor(options.accent, defaultOptions.accent),
    fill: safeColor(options.fill, "none"),
    strokeWidth: bounded(options.strokeWidth, 1.6, 0.1, 3),
    strokeLinecap:
      options.strokeLinecap === "butt" || options.strokeLinecap === "square"
        ? options.strokeLinecap
        : "round",
    strokeLinejoin:
      options.strokeLinejoin === "miter" || options.strokeLinejoin === "bevel"
        ? options.strokeLinejoin
        : "round",
    strokeStyle:
      options.strokeStyle === "dashed" || options.strokeStyle === "dotted"
        ? options.strokeStyle
        : "solid",
    opacity: bounded(options.opacity, 1, 0, 1),
    rotation: bounded(options.rotation, 0, -360, 360),
    flipX: options.flipX === true,
    flipY: options.flipY === true,
    iconStyle: isIconStyle(options.iconStyle) ? options.iconStyle : "doodle",
    partColors: options.partColors ?? {},
    title: (options.title ?? "").slice(0, 300),
  };
}
