import { escapeXml } from "../render.js";
import { safeColor } from "../styles.js";
import { licenseNotice } from "../license.js";
import type { ArtworkOptions, CollectionArtwork, VectorNode } from "./types.js";
export type { ArtworkOptions, CollectionArtwork, VectorNode } from "./types.js";
export function vectorSettings(options: ArtworkOptions = {}) {
  const size =
    typeof options.size === "number" && Number.isFinite(options.size)
      ? Math.max(16, Math.min(2048, options.size))
      : 160;
  return {
    size,
    ink: safeColor(options.ink, "#123c91"),
    primary: safeColor(options.primary, "#5264f8"),
    secondary: safeColor(options.secondary, "#bedcff"),
    paper: safeColor(options.paper, "#ffffff"),
    strokeWidth:
      typeof options.strokeWidth === "number" &&
      Number.isFinite(options.strokeWidth)
        ? Math.max(0.1, Math.min(4, options.strokeWidth))
        : 1.7,
    background: safeColor(options.background, "none"),
    partColors: options.partColors ?? {},
  };
}
export function resolveVectorNodes(
  nodes: readonly VectorNode[],
  options: ArtworkOptions,
  idPrefix: string,
): readonly VectorNode[] {
  const settings = vectorSettings(options);
  const prefix = idPrefix.replace(/[^a-zA-Z0-9_-]/g, "_");
  if (!prefix)
    throw new Error("A unique idPrefix is required for vector artwork.");
  const tokens: Record<string, string> = {
    $ink: settings.ink,
    $primary: settings.primary,
    $secondary: settings.secondary,
    $paper: settings.paper,
  };
  const walk = (item: VectorNode): VectorNode => {
    const attrs = { ...item.attrs };
    for (const key of Object.keys(attrs) as (keyof typeof attrs)[]) {
      const value = attrs[key];
      if (typeof value === "string")
        attrs[key] =
          key === "id"
            ? `${prefix}-${value}`
            : value.startsWith("@")
              ? `url(#${prefix}-${value.slice(1)})`
              : (tokens[value] ?? value);
    }
    if (typeof attrs.strokeWidth === "number")
      attrs.strokeWidth = (attrs.strokeWidth * settings.strokeWidth) / 1.7;
    const part = item.part ? settings.partColors[item.part] : undefined;
    if (part) {
      const color = safeColor(part, settings.primary);
      if (attrs.fill && attrs.fill !== "none") attrs.fill = color;
      else attrs.stroke = color;
    }
    return {
      ...item,
      attrs,
      ...(item.children ? { children: item.children.map(walk) } : {}),
    };
  };
  return nodes.map(walk);
}
const xmlNames: Record<string, string> = {
  strokeWidth: "stroke-width",
  strokeLinecap: "stroke-linecap",
  strokeLinejoin: "stroke-linejoin",
  strokeDasharray: "stroke-dasharray",
  fillOpacity: "fill-opacity",
  strokeOpacity: "stroke-opacity",
  stopColor: "stop-color",
  stopOpacity: "stop-opacity",
};
export function renderCollectionSvg(
  artwork: CollectionArtwork,
  options: ArtworkOptions = {},
  idPrefix = artwork.id,
): string {
  const settings = vectorSettings(options);
  const render = (item: VectorNode): string =>
    `<${item.tag} ${Object.entries(item.attrs)
      .map(([key, value]) => `${xmlNames[key] ?? key}="${escapeXml(value)}"`)
      .join(
        " ",
      )}${item.part ? ` data-part="${escapeXml(item.part)}"` : ""}>${item.children?.map(render).join("") ?? ""}</${item.tag}>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${settings.size}" height="${settings.size}" viewBox="0 0 160 160" fill="none" stroke="${settings.ink}" stroke-width="${settings.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="${escapeXml(artwork.name)}"><!--${licenseNotice}--><title>${escapeXml(artwork.name)}</title>${settings.background !== "none" ? `<rect width="160" height="160" fill="${settings.background}" stroke="none"/>` : ""}${resolveVectorNodes(artwork.nodes, options, idPrefix).map(render).join("")}</svg>`;
}
