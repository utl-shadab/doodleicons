import type { VectorAttribute, VectorNode, VectorTag } from "./types.js";
export const node = (
  tag: VectorTag,
  attrs: Partial<Record<VectorAttribute, string | number>>,
  children?: readonly VectorNode[],
  part?: string,
): VectorNode => ({
  tag,
  attrs,
  ...(children ? { children } : {}),
  ...(part ? { part } : {}),
});
export const path = (
  d: string,
  fill = "none",
  part = "detail",
  attrs: VectorNode["attrs"] = {},
): VectorNode => node("path", { d, fill, ...attrs }, undefined, part);
export const circle = (
  cx: number,
  cy: number,
  r: number,
  fill = "none",
  part = "detail",
  attrs: VectorNode["attrs"] = {},
): VectorNode => node("circle", { cx, cy, r, fill, ...attrs }, undefined, part);
export const ellipse = (
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  fill = "none",
  part = "detail",
  attrs: VectorNode["attrs"] = {},
): VectorNode =>
  node("ellipse", { cx, cy, rx, ry, fill, ...attrs }, undefined, part);
export const rect = (
  x: number,
  y: number,
  width: number,
  height: number,
  rx = 0,
  fill = "none",
  part = "body",
  attrs: VectorNode["attrs"] = {},
): VectorNode =>
  node("rect", { x, y, width, height, rx, fill, ...attrs }, undefined, part);
export const group = (
  children: readonly VectorNode[],
  attrs: VectorNode["attrs"] = {},
): VectorNode => node("g", attrs, children);
export const rays = (x: number, y: number): VectorNode =>
  path(`M${x - 6} ${y - 2}l-4-3m8 0 1-5m4 9 5-2`, "none", "sparkles");
export const sparkle = (x: number, y: number, r = 7): VectorNode =>
  path(
    `M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`,
    "$ink",
    "sparkles",
    { stroke: "none" },
  );
export const smile = (x: number, y: number, scale = 1): VectorNode =>
  group(
    [
      circle(x - 8, y - 3, 1.7, "$ink", "face", { stroke: "none" }),
      circle(x + 8, y - 3, 1.7, "$ink", "face", { stroke: "none" }),
      path(
        `M${x - 9} ${y + 5}Q${x} ${y + 15} ${x + 10} ${y + 4}`,
        "none",
        "face",
        { strokeWidth: 2.4 },
      ),
    ],
    {
      transform: `translate(${x} ${y}) scale(${scale}) translate(${-x} ${-y})`,
    },
  );
export const gradient = (
  id: string,
  colors: readonly string[],
  radial = false,
): VectorNode =>
  node(
    radial ? "radialGradient" : "linearGradient",
    radial
      ? { id, cx: "32%", cy: "24%", r: "85%" }
      : { id, x1: "0%", y1: "0%", x2: "85%", y2: "100%" },
    colors.map((stopColor, index) =>
      node("stop", {
        offset: `${(index / (colors.length - 1)) * 100}%`,
        stopColor,
      }),
    ),
  );
export const depthDefs = (): VectorNode =>
  node("defs", {}, [
    gradient("face", ["$paper", "$secondary", "$primary"]),
    gradient("edge", ["$secondary", "$primary", "$ink"]),
    gradient("glass", ["$paper", "$secondary", "$primary"], true),
    gradient("light", ["$paper", "$secondary"]),
  ]);
export const isoBox = (
  x: number,
  y: number,
  w: number,
  h: number,
  d: number,
  monochrome = false,
): VectorNode =>
  group([
    path(
      `M${x} ${y}l${w} ${-w / 2} ${d} ${d / 2}-${w} ${w / 2}Z`,
      monochrome ? "$paper" : "$primary",
      "top",
    ),
    path(
      `M${x} ${y}l${d} ${d / 2}v${h}l-${d}-${d / 2}Z`,
      monochrome ? "$ink" : "$secondary",
      "left",
    ),
    path(
      `M${x + d} ${y + d / 2}l${w}-${w / 2}v${h}l-${w} ${w / 2}Z`,
      monochrome ? "$paper" : "$ink",
      "right",
    ),
  ]);
