import type { CategoryId } from "../types.js";
export type CollectionId =
  | "duotone-scenes"
  | "soft-outline"
  | "character-doodle"
  | "editorial-doodle"
  | "character-scenes"
  | "color-isometric"
  | "gradient-dimensional"
  | "frosted-glass"
  | "technical-wireframe"
  | "monochrome-isometric"
  | "glossy-glass";
export type VectorTag =
  | "g"
  | "path"
  | "circle"
  | "ellipse"
  | "rect"
  | "line"
  | "polygon"
  | "polyline"
  | "defs"
  | "linearGradient"
  | "radialGradient"
  | "stop";
export type VectorAttribute =
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
  | "points"
  | "fill"
  | "stroke"
  | "strokeWidth"
  | "strokeLinecap"
  | "strokeLinejoin"
  | "strokeDasharray"
  | "opacity"
  | "fillOpacity"
  | "strokeOpacity"
  | "transform"
  | "id"
  | "offset"
  | "stopColor"
  | "stopOpacity"
  | "gradientTransform"
  | "gradientUnits";
export interface VectorNode {
  tag: VectorTag;
  attrs: Partial<Record<VectorAttribute, string | number>>;
  children?: readonly VectorNode[];
  part?: string;
}
export interface CollectionArtwork {
  id: string;
  name: string;
  collection: CollectionId;
  subject: string;
  category: CategoryId;
  nodes: readonly VectorNode[];
  parts: readonly string[];
  description: string;
}
export interface ArtworkCollection {
  id: CollectionId;
  name: string;
  description: string;
  referenceImages: readonly number[];
  background: string;
  ink: string;
  primary: string;
  secondary: string;
  assets: readonly CollectionArtwork[];
  sourceNote?: string;
}
export interface ArtworkOptions {
  size?: number;
  ink?: string;
  primary?: string;
  secondary?: string;
  paper?: string;
  strokeWidth?: number;
  background?: string;
  partColors?: Readonly<Record<string, string>>;
}
