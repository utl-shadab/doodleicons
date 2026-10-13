import type {
  IconDefinition,
  IconOptions,
  IconShape,
  NormalizedOptions,
} from "./types.js";
import { normalizeOptions, safeColor } from "./styles.js";
import { licenseNotice } from "./license.js";
export const escapeXml = (value: string | number): string =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[char] ?? char,
  );
export function shapePaint(
  shape: IconShape,
  settings: NormalizedOptions,
): { fill: string; stroke: string } {
  const part = settings.partColors[shape.part];
  const ink = safeColor(part, settings.color);
  const accent = safeColor(part, settings.accent);
  return {
    stroke: ink,
    fill:
      shape.paint === "fill"
        ? ink
        : shape.paint === "accent" && settings.iconStyle === "duotone"
          ? accent
          : settings.fill,
  };
}
export function iconTransform(settings: NormalizedOptions): string {
  const angle = (settings.rotation * Math.PI) / 180;
  const fit = 0.875 / (Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle)));
  return `translate(16 16) rotate(${settings.rotation}) scale(${(settings.flipX ? -1 : 1) * fit} ${(settings.flipY ? -1 : 1) * fit}) translate(-16 -16)`;
}
export function strokeDash(settings: NormalizedOptions): string | undefined {
  return settings.strokeStyle === "dashed"
    ? "3 3"
    : settings.strokeStyle === "dotted"
      ? "0.1 3"
      : undefined;
}
export const softBlob = "M6 9C10 3 24 3 27 10s0 16-8 18S1 21 4 15Z";
export const doodleFlourish = "M26 3l-1 2m4 1-2 1";
export function renderSvg(
  icon: IconDefinition,
  options: IconOptions = {},
): string {
  const s = normalizeOptions(options);
  const dash = strokeDash(s);
  const shapes = icon.shapes
    .map((shape) => {
      const paint = shapePaint(shape, s);
      const attrs = Object.entries(shape.attrs)
        .map(([key, value]) => `${key}="${escapeXml(value)}"`)
        .join(" ");
      return `<${shape.tag} ${attrs} data-part="${escapeXml(shape.part)}" fill="${escapeXml(paint.fill)}" stroke="${escapeXml(paint.stroke)}"/>`;
    })
    .join("");
  const decoration =
    s.iconStyle === "soft"
      ? `<path d="${softBlob}" fill="${escapeXml(s.accent)}" opacity="0.35" stroke="none"/>`
      : "";
  const flourish =
    s.iconStyle === "doodle" ? `<path d="${doodleFlourish}" fill="none"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s.width}" height="${s.height}" viewBox="0 0 32 32" fill="none" stroke="${escapeXml(s.color)}" stroke-width="${s.strokeWidth}" stroke-linecap="${s.strokeLinecap}" stroke-linejoin="${s.strokeLinejoin}" opacity="${s.opacity}"${dash ? ` stroke-dasharray="${dash}"` : ""}${s.title ? ` role="img" aria-label="${escapeXml(s.title)}"` : ' aria-hidden="true"'}><!--${licenseNotice}-->${s.title ? `<title>${escapeXml(s.title)}</title>` : ""}<g transform="${iconTransform(s)}">${decoration}${shapes}${flourish}</g></svg>`;
}
