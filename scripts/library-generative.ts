import type {
  LibraryIcon,
  LibraryNode,
} from "../packages/core/src/library/types.js";
export type GeneratedIcon = Omit<LibraryIcon, "geometryHash">;
const n = (value: number) => Math.round(value * 100) / 100;
const line = (
  points: readonly (readonly [number, number])[],
  close = false,
  fill = "none",
): LibraryNode => ({
  tag: "path",
  attrs: {
    d:
      points
        .map(
          (point, index) => `${index ? "L" : "M"}${n(point[0])} ${n(point[1])}`,
        )
        .join(" ") + (close ? "Z" : ""),
    fill,
    stroke: "currentColor",
    strokeWidth: 1.3,
    strokeLinejoin: "round",
    strokeLinecap: "round",
  },
});
const circle = (
  x: number,
  y: number,
  r: number,
  fill = "none",
): LibraryNode => ({
  tag: "circle",
  attrs: {
    cx: n(x),
    cy: n(y),
    r: n(r),
    fill,
    stroke: "currentColor",
    strokeWidth: 1.3,
  },
});
const project = (x: number, y: number, z: number): [number, number] => [
  80 + (x - y) * 0.866,
  91 + (x + y) * 0.5 - z,
];
function box(
  x: number,
  y: number,
  z: number,
  w: number,
  d: number,
  h: number,
): LibraryNode[] {
  const face = (points: [number, number, number][], opacity: number) => ({
    ...line(
      points.map((p) => project(...p)),
      true,
      "currentColor",
    ),
    attrs: {
      ...line(
        points.map((p) => project(...p)),
        true,
        "currentColor",
      ).attrs,
      fillOpacity: opacity,
    },
  });
  return [
    face(
      [
        [x, y, z],
        [x + w, y, z],
        [x + w, y, z + h],
        [x, y, z + h],
      ],
      0.06,
    ),
    face(
      [
        [x + w, y, z],
        [x + w, y + d, z],
        [x + w, y + d, z + h],
        [x + w, y, z + h],
      ],
      0.35,
    ),
    face(
      [
        [x, y, z + h],
        [x + w, y, z + h],
        [x + w, y + d, z + h],
        [x, y + d, z + h],
      ],
      0.14,
    ),
  ];
}
function generated(
  id: string,
  name: string,
  category: "wireframe" | "isometric" | "abstract",
  nodes: LibraryNode[],
): GeneratedIcon {
  return {
    id,
    name,
    category,
    source: "doodleicons-studio",
    sourceName: "DoodleIcons Studio",
    license: "MIT",
    sourceUrl: "https://github.com/utl-shadab/doodleicons",
    originalName: id,
    style: category === "abstract" ? "geometric" : category,
    width: 160,
    height: 160,
    nodes,
  };
}
const wireNames = [
  "Torus",
  "Ellipsoid",
  "Saddle",
  "Ripple sheet",
  "Twisted cylinder",
  "Spindle",
  "Superellipse vessel",
  "Helical tube",
  "Möbius ribbon",
  "Radial canopy",
];
export function wireSurface(
  family: number,
  variant: number,
  u: number,
  v: number,
): [number, number, number] {
  const a = variant % 10,
    b = Math.floor(variant / 10),
    t = u * Math.PI * 2,
    p = v * Math.PI * 2;
  switch (family) {
    case 0: {
      const r = 9 + a * 0.9,
        R = 28 + b * 3;
      return [
        (R + r * Math.cos(p)) * Math.cos(t),
        (R + r * Math.cos(p)) * Math.sin(t),
        r * Math.sin(p),
      ];
    }
    case 1:
      return [
        (29 + a) * Math.sin(Math.PI * v) * Math.cos(t),
        (22 + b * 4) * Math.sin(Math.PI * v) * Math.sin(t),
        (28 + b * 3) * Math.cos(Math.PI * v),
      ];
    case 2: {
      const x = (u - 0.5) * 75,
        y = (v - 0.5) * 75;
      return [x, y, (x * x - y * y) / (80 + a * 12) + ((b - 2) * x * y) / 150];
    }
    case 3: {
      const x = (u - 0.5) * 75,
        y = (v - 0.5) * 75;
      return [
        x,
        y,
        Math.sin(Math.hypot(x, y) / (7 + a * 0.5) + b * 0.5) * (7 + b * 2),
      ];
    }
    case 4: {
      const r = 22 + Math.sin(p * (1 + b) + t) * (3 + a);
      return [
        r * Math.cos(t + v * (b + 1)),
        r * Math.sin(t + v * (b + 1)),
        (v - 0.5) * (52 + a * 2),
      ];
    }
    case 5: {
      const r =
        Math.sin(Math.PI * v) *
        (22 + a * 1.4) *
        (1 + 0.2 * Math.cos(p * (b + 1)));
      return [r * Math.cos(t), r * Math.sin(t), (v - 0.5) * 80];
    }
    case 6: {
      const power = 0.5 + a * 0.15,
        r = 23 + Math.sin(v * Math.PI * (b + 1)) * 8;
      return [
        Math.sign(Math.cos(t)) * Math.abs(Math.cos(t)) ** power * r,
        Math.sign(Math.sin(t)) * Math.abs(Math.sin(t)) ** power * r,
        (v - 0.5) * 65,
      ];
    }
    case 7: {
      const R = 24 + a * 0.8,
        r = 5 + b,
        tube = u * Math.PI * 2 * (1.2 + b * 0.25);
      return [
        (R + r * Math.cos(p)) * Math.cos(tube),
        (R + r * Math.cos(p)) * Math.sin(tube),
        (u - 0.5) * 60 + r * Math.sin(p),
      ];
    }
    case 8: {
      const w = (v - 0.5) * (22 + a),
        R = 28 + b;
      return [
        (R + w * Math.cos((t * (b * 2 + 1)) / 2)) * Math.cos(t),
        (R + w * Math.cos((t * (b * 2 + 1)) / 2)) * Math.sin(t),
        w * Math.sin((t * (b * 2 + 1)) / 2),
      ];
    }
    default: {
      const r = 9 + v * 38;
      return [
        r * Math.cos(t),
        r * Math.sin(t),
        (1 - v) * (25 + a * 2) + Math.cos(t * (3 + b)) * v * (3 + a * 0.5),
      ];
    }
  }
}
export function generateWireframe(
  family: number,
  variant: number,
): GeneratedIcon {
  const nodes: LibraryNode[] = [];
  const wireProject = ([x, y, z]: [number, number, number]): [
    number,
    number,
  ] => [80 + x * 0.88 - y * 0.38, 80 + x * 0.24 + y * 0.5 - z * 0.78];
  for (let axis = 0; axis < 2; axis++)
    for (let i = 0; i <= 12; i++) {
      const points = Array.from({ length: 37 }, (_, j) =>
        wireProject(
          wireSurface(
            family,
            variant,
            axis ? j / 36 : i / 12,
            axis ? i / 12 : j / 36,
          ),
        ),
      );
      nodes.push(line(points));
    }
  return generated(
    `studio-wire-${family + 1}-${variant + 1}`,
    `${wireNames[family]} · profile ${(variant % 10) + 1}, structure ${Math.floor(variant / 10) + 1}`,
    "wireframe",
    nodes,
  );
}
export function generateObj(family: number, variant: number): string {
  const lines = [
    `# DoodleIcons ${wireNames[family]} ${variant + 1} — MIT`,
    "o DoodleIcons",
  ];
  for (let i = 0; i <= 24; i++)
    for (let j = 0; j <= 24; j++)
      lines.push(
        `v ${wireSurface(family, variant, i / 24, j / 24)
          .map(n)
          .join(" ")}`,
      );
  for (let i = 0; i < 24; i++)
    for (let j = 0; j < 24; j++) {
      const a = i * 25 + j + 1;
      lines.push(`f ${a} ${a + 1} ${a + 26} ${a + 25}`);
    }
  return lines.join("\n") + "\n";
}
const isoNames = [
  "City block",
  "Data center",
  "Terraced garden",
  "Solar array",
  "Warehouse",
  "Stepped pavilion",
  "Workstations",
  "Battery storage",
  "Modular building",
  "Logistics pallets",
];
export function generateIsometric(
  family: number,
  variant: number,
): GeneratedIcon {
  const rows = 2 + Math.floor(variant / 10),
    cols = 2 + (variant % 5),
    profile = Math.floor((variant % 10) / 5);
  const nodes: LibraryNode[] = [];
  const unit = 65 / Math.max(rows, cols),
    originX = (-cols * unit) / 2,
    originY = (-rows * unit) / 2;
  nodes.push(
    ...box(originX - 4, originY - 4, -3, cols * unit + 8, rows * unit + 8, 3),
  );
  for (let row = 0; row < rows; row++)
    for (let col = 0; col < cols; col++) {
      const x = originX + col * unit,
        y = originY + row * unit;
      const height =
        family === 0
          ? 12 + ((row * 3 + col * 7 + profile * 2) % 5) * 7
          : family === 5
            ? (row + 1) * 6 + profile * 3
            : family === 8
              ? 18 + ((row + col + profile) % 3) * 9
              : family === 4
                ? 10 + profile * 8
                : family === 7
                  ? 22 + profile * 7
                  : 6 + profile * 7;
      const width = unit * 0.7;
      nodes.push(...box(x, y, 0, width, width, height));
      if ([0, 1, 8].includes(family))
        for (let window = 1; window <= 3; window++)
          nodes.push(
            line([
              project(x + width, y + width * 0.15, (height * window) / 4),
              project(x + width, y + width * 0.85, (height * window) / 4),
            ]),
          );
      if (family === 2) {
        const p = project(x + width / 2, y + width / 2, height + 6);
        nodes.push(circle(p[0], p[1], unit * 0.24, "currentColor"));
      }
      if (family === 3)
        for (let cell = 1; cell < 3; cell++) {
          nodes.push(
            line([
              project(x + (width * cell) / 3, y, height + 0.3),
              project(x + (width * cell) / 3, y + width, height + 0.3),
            ]),
          );
          nodes.push(
            line([
              project(x, y + (width * cell) / 3, height + 0.3),
              project(x + width, y + (width * cell) / 3, height + 0.3),
            ]),
          );
        }
      if (family === 6)
        nodes.push(...box(x + 1, y + 1, height, 1, width * 0.75, unit * 0.55));
      if (family === 7) {
        const p = project(x + width / 2, y + width / 2, height + 0.5);
        nodes.push(
          line([
            [p[0] - 2, p[1]],
            [p[0] + 2, p[1]],
          ]),
          line([
            [p[0], p[1] - 2],
            [p[0], p[1] + 2],
          ]),
        );
      }
      if (family === 9)
        nodes.push(
          ...box(
            x + 2,
            y + 2,
            height,
            width * 0.55,
            width * 0.55,
            6 + ((col + row) % 3) * 4,
          ),
        );
    }
  return generated(
    `studio-iso-${family + 1}-${variant + 1}`,
    `${isoNames[family]} · ${rows} × ${cols}, ${profile ? "raised" : "compact"}`,
    "isometric",
    nodes,
  );
}
const abstractNames = [
  "Petal rosette",
  "Nested polygon",
  "Harmonic orbit",
  "Wave lattice",
  "Radial star",
  "Concentric bloom",
  "Interlocking rings",
  "Guilloche",
  "Superformula",
  "Radial weave",
];
export function generateAbstract(
  family: number,
  variant: number,
): GeneratedIcon {
  const count = 3 + (variant % 10),
    structure = 1 + Math.floor(variant / 10),
    nodes: LibraryNode[] = [];
  const polar = (radius: number, t: number): [number, number] => [
    80 + radius * Math.cos(t),
    80 + radius * Math.sin(t),
  ];
  if (family === 1)
    for (let ring = 0; ring < structure + 3; ring++)
      nodes.push(
        line(
          Array.from({ length: count }, (_, i) =>
            polar(55 - ring * 7, (i * Math.PI * 2) / count + ring * 0.12),
          ),
          true,
        ),
      );
  else if (family === 6)
    for (let i = 0; i < count; i++) {
      const p = polar(12 + structure * 4, (i * Math.PI * 2) / count);
      nodes.push(circle(p[0], p[1], 16 + structure * 2));
    }
  else if (family === 3)
    for (let i = 0; i < count + 3; i++)
      nodes.push(
        line(
          Array.from(
            { length: 65 },
            (_, j) =>
              [
                20 + (j * 120) / 64,
                35 +
                  (i * 85) / (count + 2) +
                  Math.sin((j / 64) * Math.PI * structure * 2 + i * 0.35) * 8,
              ] as [number, number],
          ),
        ),
      );
  else if (family === 4)
    nodes.push(
      line(
        Array.from({ length: count * 2 }, (_, i) =>
          polar(i % 2 ? 9 + structure * 6 : 58, (i * Math.PI) / count),
        ),
        true,
        "currentColor",
      ),
    );
  else if (family === 9)
    for (let i = 0; i < count * 4; i++)
      nodes.push(
        line([
          polar(54, (i * Math.PI * 2) / (count * 4)),
          polar(
            20 + structure * 4,
            ((i + structure + count) * Math.PI * 2) / (count * 4),
          ),
        ]),
      );
  else
    for (let ring = 0; ring < (family === 2 ? count : structure + 1); ring++) {
      const points = Array.from({ length: 181 }, (_, i): [number, number] => {
        const t = (i * Math.PI * 2) / 180;
        if (family === 2)
          return [
            80 +
              52 * Math.cos(t) * Math.cos((ring * Math.PI) / count) -
              structure * 3 * Math.sin(t) * Math.sin((ring * Math.PI) / count),
            80 +
              52 * Math.cos(t) * Math.sin((ring * Math.PI) / count) +
              structure * 3 * Math.sin(t) * Math.cos((ring * Math.PI) / count),
          ];
        if (family === 5)
          return polar(
            45 - ring * 6 + Math.sin(count * t) * (6 + structure),
            t,
          );
        if (family === 7)
          return polar(
            29 + ring * 3 + Math.cos(count * t + ring * 0.35) * 15,
            t,
          );
        if (family === 8) {
          const r =
            44 /
            (Math.abs(Math.cos((count * t) / 4)) ** (1 + structure * 0.3) +
              Math.abs(Math.sin((count * t) / 4)) ** (1 + structure * 0.3)) **
              0.5;
          return polar(Math.min(58, r - ring * 5), t);
        }
        return polar(34 + Math.cos(count * t) * (19 - ring * 2) - ring * 4, t);
      });
      nodes.push(line(points, true));
    }
  return generated(
    `studio-abstract-${family + 1}-${variant + 1}`,
    `${abstractNames[family]} · ${count} folds, structure ${structure}`,
    "abstract",
    nodes,
  );
}
