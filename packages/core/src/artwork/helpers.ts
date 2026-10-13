import type { CategoryId, IconDefinition, IconShape } from "../types.js";
export const p = (
  d: string,
  part = "detail",
  paint: IconShape["paint"] = "outline",
): IconShape => ({ tag: "path", attrs: { d }, part, paint });
export const c = (
  cx: number,
  cy: number,
  r: number,
  part = "detail",
  paint: IconShape["paint"] = "outline",
): IconShape => ({ tag: "circle", attrs: { cx, cy, r }, part, paint });
export const r = (
  x: number,
  y: number,
  width: number,
  height: number,
  rx = 2,
  part = "body",
  paint: IconShape["paint"] = "accent",
): IconShape => ({
  tag: "rect",
  attrs: { x, y, width, height, rx },
  part,
  paint,
});
export const e = (
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  part = "body",
): IconShape => ({
  tag: "ellipse",
  attrs: { cx, cy, rx, ry },
  part,
  paint: "accent",
});
export function define(
  category: CategoryId,
  id: string,
  name: string,
  tags: string,
  shapes: readonly IconShape[],
): IconDefinition {
  return {
    id,
    name,
    category,
    tags: tags.split(" "),
    shapes,
    parts: [...new Set(shapes.map((shape) => shape.part))],
    license: "MIT",
    artworkVersion: 1,
  };
}
