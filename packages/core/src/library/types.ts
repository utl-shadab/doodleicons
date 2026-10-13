import type { LibraryCategoryId } from "./categories.js";
export type LibraryStyle =
  | "outline"
  | "solid"
  | "duotone"
  | "wireframe"
  | "isometric"
  | "geometric";
export type LibraryTag =
  | "g"
  | "path"
  | "circle"
  | "ellipse"
  | "rect"
  | "line"
  | "polyline"
  | "polygon";
export type LibraryAttribute =
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
  | "strokeMiterlimit"
  | "strokeDasharray"
  | "strokeDashoffset"
  | "opacity"
  | "fillOpacity"
  | "strokeOpacity"
  | "fillRule"
  | "clipRule"
  | "transform";
export interface LibraryNode {
  tag: LibraryTag;
  attrs: Partial<Record<LibraryAttribute, string | number>>;
  children?: readonly LibraryNode[];
}
export interface LibrarySource {
  id: string;
  name: string;
  author: string;
  url: string;
  license: string;
  licenseUrl: string;
  version: string;
}
export interface LibraryIcon {
  id: string;
  name: string;
  category: LibraryCategoryId;
  source: string;
  sourceName: string;
  license: string;
  sourceUrl: string;
  originalName: string;
  style: LibraryStyle;
  width: number;
  height: number;
  nodes: readonly LibraryNode[];
  /** SHA-256 of normalized geometry, excluding identity and display colors. */
  geometryHash: string;
}
export interface LibraryOptions {
  width?: number;
  height?: number;
  color?: string;
  fill?: string;
  background?: string;
  strokeWidth?: number;
  linecap?: "round" | "butt" | "square";
  linejoin?: "round" | "miter" | "bevel";
  roundedness?: number;
  padding?: number;
  alignX?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  rotation?: number;
  flipX?: boolean;
  flipY?: boolean;
  opacity?: number;
}
export interface LibraryIndexItem extends Omit<LibraryIcon, "nodes"> {}
