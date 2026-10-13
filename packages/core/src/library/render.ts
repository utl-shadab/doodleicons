import type { LibraryIcon, LibraryNode, LibraryOptions } from "./types.js";
import { licenseTexts } from "./license-texts.js";
export type {
  LibraryIcon,
  LibraryNode,
  LibraryOptions,
  LibrarySource,
  LibraryStyle,
  LibraryIndexItem,
} from "./types.js";
export { libraryCategories, type LibraryCategoryId } from "./categories.js";
export const defaultLibraryStrokeWidth = 0.2;
const number = (
  value: number | undefined,
  fallback: number,
  min: number,
  max: number,
): number =>
  Number.isFinite(value)
    ? Math.min(max, Math.max(min, value ?? fallback))
    : fallback;
const color = (value: string | undefined, fallback: string): string =>
  value && /^(#[a-f\d]{3,8}|none|currentColor|transparent)$/i.test(value)
    ? value
    : fallback;
export function librarySettings(options: LibraryOptions = {}) {
  return {
    width: Math.round(number(options.width, 256, 16, 2048)),
    height: Math.round(number(options.height, 256, 16, 2048)),
    color: color(options.color, "#242833"),
    fill: color(options.fill, "none"),
    background: color(options.background, "none"),
    strokeWidth: number(options.strokeWidth, defaultLibraryStrokeWidth, 0, 4),
    linecap:
      options.linecap === "butt" || options.linecap === "square"
        ? options.linecap
        : "round",
    linejoin:
      options.linejoin === "miter" || options.linejoin === "bevel"
        ? options.linejoin
        : "round",
    roundedness: number(options.roundedness, 0, 0, 50),
    padding: number(options.padding, 12, 0, 40),
    alignX:
      options.alignX === "left" || options.alignX === "right"
        ? options.alignX
        : "center",
    alignY:
      options.alignY === "top" || options.alignY === "bottom"
        ? options.alignY
        : "center",
    rotation: number(options.rotation, 0, -180, 180),
    flipX: options.flipX === true,
    flipY: options.flipY === true,
    opacity: number(options.opacity, 1, 0, 1),
  } as const;
}
export function libraryGeometry(
  icon: LibraryIcon,
  options: LibraryOptions = {},
) {
  const s = librarySettings(options);
  const radians = (Math.abs(s.rotation) * Math.PI) / 180;
  const rotatedWidth =
    Math.abs(icon.width * Math.cos(radians)) +
    Math.abs(icon.height * Math.sin(radians));
  const rotatedHeight =
    Math.abs(icon.width * Math.sin(radians)) +
    Math.abs(icon.height * Math.cos(radians));
  const pad = (Math.min(s.width, s.height) * s.padding) / 100;
  const scale = Math.min(
    (s.width - 2 * pad) / rotatedWidth,
    (s.height - 2 * pad) / rotatedHeight,
  );
  const dx =
    (s.width - rotatedWidth * scale - 2 * pad) *
    (s.alignX === "left" ? 0 : s.alignX === "right" ? 1 : 0.5);
  const dy =
    (s.height - rotatedHeight * scale - 2 * pad) *
    (s.alignY === "top" ? 0 : s.alignY === "bottom" ? 1 : 0.5);
  return `translate(${pad + dx + (rotatedWidth * scale) / 2} ${pad + dy + (rotatedHeight * scale) / 2}) scale(${scale}) rotate(${s.rotation}) scale(${s.flipX ? -1 : 1} ${s.flipY ? -1 : 1}) translate(${-icon.width / 2} ${-icon.height / 2})`;
}
export function libraryNodes(
  icon: LibraryIcon,
  options: LibraryOptions = {},
): readonly LibraryNode[] {
  const s = librarySettings(options);
  const walk = (node: LibraryNode): LibraryNode => {
    const attrs = { ...node.attrs };
    for (const key of ["fill", "stroke"] as const) {
      if (attrs[key] === "currentColor") attrs[key] = s.color;
      if (attrs[key] === "$accent")
        attrs[key] = s.fill === "none" ? s.color : s.fill;
    }
    if (attrs.fill === "none" && icon.style === "outline") attrs.fill = s.fill;
    if (
      (attrs.stroke !== undefined && attrs.stroke !== "none") ||
      attrs.strokeWidth !== undefined
    ) {
      attrs.strokeWidth = s.strokeWidth * (icon.width / 24);
      attrs.strokeLinecap = s.linecap;
      attrs.strokeLinejoin = s.linejoin;
    }
    return {
      tag: node.tag,
      attrs,
      ...(node.children ? { children: node.children.map(walk) } : {}),
    };
  };
  return icon.nodes.map(walk);
}
const escape = (value: string | number) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
function serialize(node: LibraryNode): string {
  const attrs = Object.entries(node.attrs)
    .map(
      ([key, value]) =>
        `${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}="${escape(value)}"`,
    )
    .join(" ");
  return `<${node.tag} ${attrs}>${node.children?.map(serialize).join("") ?? ""}</${node.tag}>`;
}
export function renderLibrarySvg(
  icon: LibraryIcon,
  options: LibraryOptions = {},
): string {
  const s = librarySettings(options);
  const attribution = `${icon.name} · ${icon.sourceName} · ${icon.license} · ${icon.sourceUrl}. Customized with DoodleIcons.\n${licenseTexts[icon.source] ?? ""}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s.width}" height="${s.height}" viewBox="0 0 ${s.width} ${s.height}" fill="none" role="img"><title>${escape(icon.name)}</title><desc>${escape(attribution)}</desc>${s.background === "none" || s.background === "transparent" ? "" : `<rect width="${s.width}" height="${s.height}" rx="${(Math.min(s.width, s.height) * s.roundedness) / 100}" fill="${s.background}"/>`}<g opacity="${s.opacity}" transform="${libraryGeometry(icon, options)}">${libraryNodes(icon, options).map(serialize).join("")}</g></svg>`;
}
