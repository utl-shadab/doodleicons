import {
  ellipse as e,
  circle as c,
  path as p,
  group as g,
} from "./primitives.js";
import type { VectorNode } from "./types.js";
const TAU = Math.PI * 2;
function projectedPath(points: readonly [number, number][]): string {
  return points
    .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(3)} ${y.toFixed(3)}`)
    .join(" ");
}
export const wireSphere: readonly VectorNode[] = [
  c(80, 80, 53, "none", "boundary"),
  ...Array.from({ length: 9 }, (_, i) =>
    e(80, 80, 53, 5 + i * 6, "none", "meridians", {
      transform: `rotate(${i * 20} 80 80)`,
      strokeWidth: 0.6,
    }),
  ),
  ...[-0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75].map((t) =>
    e(
      80,
      80 + t * 53,
      53 * Math.sqrt(1 - t * t),
      10 * Math.sqrt(1 - t * t),
      "none",
      "latitudes",
      { strokeWidth: 0.6 },
    ),
  ),
];
export const wireTorus: readonly VectorNode[] = [
  ...Array.from({ length: 22 }, (_, i) => {
    const a = (i / 22) * TAU;
    const pts = Array.from({ length: 65 }, (_, j): [number, number] => {
      const b = (j / 64) * TAU;
      const radius = 36 + 15 * Math.cos(b);
      return [
        80 + radius * Math.cos(a),
        80 + radius * Math.sin(a) * 0.55 + 15 * Math.sin(b),
      ];
    });
    return p(projectedPath(pts), "none", "longitude", { strokeWidth: 0.55 });
  }),
  ...Array.from({ length: 12 }, (_, i) => {
    const b = (i / 12) * TAU;
    const pts = Array.from({ length: 89 }, (_, j): [number, number] => {
      const a = (j / 88) * TAU;
      const radius = 36 + 15 * Math.cos(b);
      return [
        80 + radius * Math.cos(a),
        80 + radius * Math.sin(a) * 0.55 + 15 * Math.sin(b),
      ];
    });
    return p(projectedPath(pts), "none", "latitude", { strokeWidth: 0.55 });
  }),
];
export const wireWave: readonly VectorNode[] = [
  p("M20 123h123m-5-5 5 5-5 5M25 133V24m-5 5 5-5 5 5", "none", "axes", {
    strokeWidth: 0.8,
  }),
  ...Array.from({ length: 20 }, (_, i) => {
    const pts = Array.from({ length: 70 }, (_, j): [number, number] => {
      const x = (j / 69) * 100;
      const amp = 28 * Math.exp(-Math.pow((x - 50) / 36, 2));
      const y = 94 - Math.sin(x / 18 + i * 0.17) * amp;
      return [27 + x + i * 0.4, y - i * 1.2];
    });
    return p(projectedPath(pts), "none", "wave", {
      strokeWidth: 0.55,
      opacity: 0.55 + i * 0.02,
    });
  }),
];
