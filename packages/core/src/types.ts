export type IconStyle = "outline" | "doodle" | "duotone" | "soft";
export type CategoryId =
  | "interface"
  | "actions"
  | "communication"
  | "technology"
  | "commerce"
  | "creative"
  | "health"
  | "productivity"
  | "travel"
  | "expressive";
export type ShapeTag =
  | "path"
  | "circle"
  | "rect"
  | "ellipse"
  | "line"
  | "polyline"
  | "polygon";
export type GeometryAttribute =
  | "d"
  | "cx"
  | "cy"
  | "r"
  | "rx"
  | "ry"
  | "x"
  | "y"
  | "x1"
  | "x2"
  | "y1"
  | "y2"
  | "width"
  | "height"
  | "points";
export interface IconShape {
  readonly tag: ShapeTag;
  readonly attrs: Readonly<Partial<Record<GeometryAttribute, string | number>>>;
  readonly part: string;
  readonly paint: "outline" | "fill" | "accent";
}
export interface IconDefinition {
  readonly id: string;
  readonly name: string;
  readonly category: CategoryId;
  readonly tags: readonly string[];
  readonly shapes: readonly IconShape[];
  readonly parts: readonly string[];
  readonly license: "MIT";
  readonly artworkVersion: 1;
}
export interface IconOptions {
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  accent?: string;
  fill?: string;
  strokeWidth?: number;
  strokeLinecap?: "round" | "butt" | "square";
  strokeLinejoin?: "round" | "miter" | "bevel";
  strokeStyle?: "solid" | "dashed" | "dotted";
  opacity?: number;
  rotation?: number;
  flipX?: boolean;
  flipY?: boolean;
  iconStyle?: IconStyle;
  partColors?: Readonly<Record<string, string>>;
  title?: string;
}
export interface NormalizedOptions {
  size: number;
  width: number;
  height: number;
  color: string;
  accent: string;
  fill: string;
  strokeWidth: number;
  strokeLinecap: "round" | "butt" | "square";
  strokeLinejoin: "round" | "miter" | "bevel";
  strokeStyle: "solid" | "dashed" | "dotted";
  opacity: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
  iconStyle: IconStyle;
  partColors: Readonly<Record<string, string>>;
  title: string;
}
export interface Category {
  readonly id: CategoryId;
  readonly label: string;
  readonly description: string;
  readonly target: 500;
}
