import {
  circle as c,
  ellipse as e,
  group as g,
  path as p,
  rect as r,
  node,
  gradient,
  depthDefs,
  isoBox,
} from "./primitives.js";
import type { VectorNode } from "./types.js";
export const isometricVault: readonly VectorNode[] = [
  e(82, 134, 53, 8, "$ink", "shadow", { stroke: "none", opacity: 0.1 }),
  isoBox(29, 57, 63, 57, 43),
  p("M72 79 135 48v57l-63 32Z", "$ink", "front"),
  e(103, 92, 24, 33, "$paper", "dial", { transform: "rotate(28 103 92)" }),
  e(103, 92, 15, 22, "$primary", "dial-ring", {
    transform: "rotate(28 103 92)",
  }),
  e(103, 92, 9, 14, "$secondary", "hub", { transform: "rotate(28 103 92)" }),
  ...Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    return p(
      `M${103 + 20 * Math.cos(a)} ${92 + 28 * Math.sin(a)}l${-3 * Math.cos(a)} ${-4 * Math.sin(a)}`,
      "none",
      "ticks",
      { strokeWidth: 1 },
    );
  }),
  p("M37 68v43m9-39v43m9-39v42", "none", "side-lines", {
    stroke: "$paper",
    strokeWidth: 0.5,
  }),
];
export const isometricDiamond: readonly VectorNode[] = [
  p("M25 114 82 84l56 30-57 30-56-30Z", "$ink", "base-shadow"),
  p("M25 107 82 77l56 30-57 30-56-30Z", "$primary", "platform"),
  e(81, 110, 21, 10, "$ink", "shadow", { stroke: "none" }),
  p("M28 105V45q0-6 5-9L76 13q5-3 10 0l47 25q5 3 5 9v57", "none", "case", {
    stroke: "$primary",
    strokeWidth: 1,
  }),
  p("M29 41 81 69l55-27m-55 27v68", "none", "case-edges", {
    stroke: "$primary",
    strokeWidth: 0.8,
  }),
  p("M50 64 66 48h30l17 16-31 38Z", "$secondary", "gem"),
  p("M50 64h63M66 48l-5 16 21 38 20-38-6-16M61 64h41", "none", "facets", {
    stroke: "$paper",
  }),
  p("M50 64 66 48h30l17 16-31 38Z", "none", "gem-outline"),
];
export const isometricGrowth: readonly VectorNode[] = [
  p("M22 117 76 89l68 33-58 31Z", "$ink", "base"),
  isoBox(30, 85, 25, 36, 24),
  isoBox(56, 54, 29, 55, 27),
  isoBox(89, 86, 26, 38, 26),
  p(
    "M25 120c27 17 35-34 57-25 14 7 15 18 38-10l9 9c-27 37-38 18-53 18-17 0-23 40-51 18Z",
    "$paper",
    "ribbon",
  ),
  c(116, 70, 21, "$secondary", "circle"),
  p("M63 56 90 70m-59 17 23 12", "none", "highlight", {
    stroke: "$paper",
    strokeWidth: 0.6,
  }),
];
export const gradientOrbit: readonly VectorNode[] = [
  depthDefs(),
  c(80, 77, 43, "@glass", "sphere", { stroke: "$primary", strokeWidth: 0.8 }),
  e(80, 77, 57, 18, "none", "orbit-one", {
    transform: "rotate(43 80 77)",
    stroke: "$primary",
    strokeWidth: 1,
  }),
  e(80, 77, 57, 18, "none", "orbit-two", {
    transform: "rotate(-43 80 77)",
    stroke: "$primary",
    strokeWidth: 1,
  }),
  c(45, 48, 4, "$paper", "orbit-point", {
    stroke: "$primary",
    strokeWidth: 0.7,
  }),
  e(81, 136, 38, 4, "$secondary", "shadow", { stroke: "none", opacity: 0.28 }),
];
export const gradientLayers: readonly VectorNode[] = [
  depthDefs(),
  ...Array.from({ length: 5 }, (_, i) =>
    p(
      `M29 ${56 + i * 12} 80 ${26 + i * 12} 131 ${56 + i * 12} 80 ${87 + i * 12}Z`,
      "@face",
      `layer-${i + 1}`,
      { stroke: "$primary", strokeWidth: 0.55, opacity: 0.56 + i * 0.1 },
    ),
  ).reverse(),
  p("M61 57v71m19-82v84m19-73v71", "none", "verticals", {
    stroke: "$paper",
    strokeWidth: 0.8,
    opacity: 0.8,
  }),
];
export const gradientCycle: readonly VectorNode[] = [
  node("defs", {}, [
    gradient("outer", ["$paper", "$primary", "$paper"], true),
    gradient("inside", ["$primary", "$secondary", "$paper"]),
  ]),
  c(77, 73, 44, "@outer", "torus", { stroke: "$primary", strokeWidth: 0.7 }),
  c(77, 73, 20, "@inside", "inner", { stroke: "$primary", strokeWidth: 0.5 }),
  c(77, 73, 13, "$paper", "opening", { stroke: "none" }),
  p("M27 130h108m-7-7 7 7-7 7", "none", "direction", {
    stroke: "$primary",
    strokeWidth: 1,
  }),
  e(77, 121, 38, 2, "$secondary", "shadow", { stroke: "none", opacity: 0.5 }),
];
export const frostedFolder: readonly VectorNode[] = [
  depthDefs(),
  pathBack(),
  r(40, 44, 91, 72, 11, "$primary", "back-folder", { stroke: "none" }),
  p("M40 51v-17q0-8 8-8h25l10 14h39q9 0 9 9v10Z", "$primary", "tab", {
    stroke: "none",
  }),
  p(
    "M24 60q0-12 13-12h27q8 0 13 10h44q13 0 13 13v46q0 16-16 16H40q-16 0-16-16Z",
    "@glass",
    "frosted-panel",
    {
      stroke: "$paper",
      strokeOpacity: 0.85,
      strokeWidth: 1.3,
      fillOpacity: 0.77,
    },
  ),
  p("M33 72v42q0 10 8 10m-7-62q0-5 6-5h21", "none", "edge-light", {
    stroke: "$paper",
    strokeOpacity: 0.65,
    strokeWidth: 2,
  }),
];
function pathBack(): VectorNode {
  return e(80, 140, 45, 4, "$secondary", "shadow", {
    stroke: "none",
    opacity: 0.22,
  });
}
export const frostedLock: readonly VectorNode[] = [
  depthDefs(),
  pathBack(),
  p("M51 70V49a29 29 0 0 1 58 0v21", "none", "shackle-back", {
    stroke: "$primary",
    strokeWidth: 12,
  }),
  p("M47 67V46a29 29 0 0 1 58 0v21", "none", "shackle-highlight", {
    stroke: "$secondary",
    strokeWidth: 3,
  }),
  r(34, 64, 96, 69, 15, "@glass", "glass-body", {
    stroke: "$paper",
    strokeWidth: 1.5,
    fillOpacity: 0.85,
  }),
  r(38, 68, 87, 60, 12, "none", "rim", {
    stroke: "$paper",
    strokeOpacity: 0.6,
    strokeWidth: 0.7,
  }),
  c(82, 93, 8, "$paper", "keyhole", { stroke: "none" }),
  p("M79 96h6l3 14H76Z", "$paper", "keyhole", { stroke: "none" }),
];
export const frostedLocation: readonly VectorNode[] = [
  depthDefs(),
  p("M42 98h75l21 33q4 8-7 8H29q-11 0-7-8Z", "$primary", "map", {
    stroke: "none",
  }),
  p(
    "M83 125c-5-4-37-40-37-59a37 37 0 0 1 74 0c0 20-32 55-37 59Z",
    "@glass",
    "pin",
    { stroke: "$paper", strokeWidth: 1, fillOpacity: 0.84 },
  ),
  c(83, 65, 13, "$paper", "center", { stroke: "none" }),
  p("M56 65c0-18 9-27 23-29", "none", "highlight", {
    stroke: "$paper",
    strokeWidth: 2,
    opacity: 0.7,
  }),
];
export const monoLayers: readonly VectorNode[] = [
  ...Array.from({ length: 4 }, (_, i) =>
    g([
      p(
        `M32 ${71 + i * 17} 92 ${36 + i * 17} 135 ${60 + i * 17} 75 ${95 + i * 17}Z`,
        "$ink",
        `shadow-${i + 1}`,
        { stroke: "none" },
      ),
      p(
        `M25 ${63 + i * 17} 85 ${28 + i * 17} 128 ${52 + i * 17} 68 ${87 + i * 17}Z`,
        "$paper",
        `layer-${i + 1}`,
        { strokeWidth: 0.85 },
      ),
    ]),
  ).reverse(),
  p("M135 76v47m-4-47h8m-8 47h8", "none", "measurement", {
    strokeWidth: 0.65,
    strokeDasharray: "4 5",
  }),
];
export const monoModules: readonly VectorNode[] = [
  p("M24 107 79 78l63 33-55 32Z", "$ink", "shadow", { stroke: "none" }),
  isoBox(30, 78, 27, 31, 27, true),
  isoBox(59, 58, 30, 33, 27, true),
  isoBox(88, 89, 28, 31, 27, true),
  p("M23 126l56 29m-56-33v7m56 21v7", "none", "measurement", {
    strokeWidth: 0.65,
    strokeDasharray: "4 5",
  }),
];
export const monoArchive: readonly VectorNode[] = [
  p("M51 26 83 12l38 20v105l-38-20-32 15Z", "$paper", "cabinet", {
    strokeWidth: 0.8,
  }),
  p("M51 26 83 43v105l-5-3V47L51 32Z", "$ink", "frame", { stroke: "none" }),
  p("M83 43l38-11v105l-38 11Z", "$paper", "side", { strokeWidth: 0.8 }),
  p("M51 47 77 60m-26 6 26 13m-26 6 26 13m-26 6 26 13", "none", "shelves", {
    strokeWidth: 0.8,
  }),
  p("M51 32v100l5-3V36Z", "$ink", "frame", { stroke: "none" }),
  p("M63 53v10m0 9v10m0 9v10m0 9v10", "none", "handles", { strokeWidth: 0.55 }),
];
export const glossyShield: readonly VectorNode[] = [
  depthDefs(),
  pathBack(),
  p(
    "M83 18q23 20 51 19v47q-1 37-51 60Q37 128 30 88V39q29 1 53-21Z",
    "@edge",
    "extrusion",
    { stroke: "$secondary", strokeWidth: 1 },
  ),
  p(
    "M76 14q23 20 51 19v47q-1 37-51 60Q30 124 23 84V35q29 1 53-21Z",
    "@glass",
    "glass-rim",
    { stroke: "$paper", strokeWidth: 1.4, fillOpacity: 0.85 },
  ),
  p(
    "M77 28q20 17 38 17v35q-3 29-39 46Q43 111 36 81V46q22-2 41-18Z",
    "@face",
    "face",
    { stroke: "$paper", strokeWidth: 1.6 },
  ),
  p("M66 73V62a11 11 0 0 1 22 0v11", "none", "shackle", {
    stroke: "$paper",
    strokeWidth: 5,
  }),
  r(61, 72, 33, 27, 5, "$paper", "lock", {
    stroke: "$secondary",
    strokeWidth: 0.7,
  }),
  c(77, 82, 3, "$primary", "keyhole", { stroke: "none" }),
  p("M77 84v6", "none", "keyhole", { stroke: "$primary", strokeWidth: 2.5 }),
  p("M30 42v37q2 29 22 41", "none", "rim-light", {
    stroke: "$paper",
    strokeWidth: 2,
    opacity: 0.65,
  }),
];
export const glossyRocket: readonly VectorNode[] = [
  depthDefs(),
  p("M37 126 82 104l46 24-46 25Z", "@edge", "base", {
    stroke: "$secondary",
    strokeWidth: 0.7,
  }),
  p("M37 119 82 97l46 24-46 25Z", "@light", "platform", {
    stroke: "$paper",
    strokeWidth: 0.7,
  }),
  p("M64 78 43 100l3 25 26-26m22-21 24 21-2 29-26-29", "@edge", "fins", {
    stroke: "$secondary",
    strokeWidth: 1,
  }),
  p("M64 103C48 77 58 30 83 12c28 27 33 63 14 94Z", "@glass", "hull", {
    stroke: "$paper",
    strokeWidth: 1.2,
  }),
  p("M63 34q21 14 40 3Q93 18 83 12Z", "@edge", "nose", {
    stroke: "$secondary",
    strokeWidth: 0.8,
  }),
  e(82, 65, 15, 19, "@edge", "window-rim", {
    transform: "rotate(-8 82 65)",
    stroke: "$paper",
    strokeWidth: 2,
  }),
  e(82, 65, 10, 13, "@light", "window", {
    transform: "rotate(-8 82 65)",
    stroke: "$secondary",
    strokeWidth: 1,
  }),
  p("M74 105q-6 19 8 27 13-9 10-27Z", "@face", "exhaust", {
    stroke: "$paper",
    strokeWidth: 0.8,
  }),
  p("M63 54q-6 22 2 40", "none", "shine", {
    stroke: "$paper",
    strokeWidth: 2,
    opacity: 0.8,
  }),
];
export const glossyGrowth: readonly VectorNode[] = [
  depthDefs(),
  g(
    [
      r(33, 29, 105, 102, 20, "@edge", "depth", {
        stroke: "$secondary",
        strokeWidth: 1,
      }),
      r(25, 24, 105, 102, 20, "@glass", "tile", {
        stroke: "$paper",
        strokeWidth: 1.3,
      }),
      r(32, 31, 91, 88, 15, "none", "rim", {
        stroke: "$paper",
        strokeWidth: 0.7,
        opacity: 0.65,
      }),
      r(44, 83, 14, 21, 3, "@light", "bar-one", {
        stroke: "$paper",
        strokeWidth: 0.7,
      }),
      r(69, 70, 14, 34, 3, "@light", "bar-two", {
        stroke: "$paper",
        strokeWidth: 0.7,
      }),
      r(95, 54, 14, 50, 3, "@light", "bar-three", {
        stroke: "$paper",
        strokeWidth: 0.7,
      }),
      p("M43 67 66 50l14 6 24-20m-14 0h15v15", "none", "growth", {
        stroke: "$paper",
        strokeWidth: 5,
      }),
    ],
    { transform: "rotate(-9 80 80)" },
  ),
];
