import { createElement, type ReactElement, type SVGProps } from "react";
import {
  resolveVectorNodes,
  vectorSettings,
  type CollectionArtwork,
  type ArtworkOptions,
  type VectorNode,
} from "doodle-icon/collections/render";
export interface IllustrationProps
  extends Omit<
    SVGProps<SVGSVGElement>,
    "children" | "dangerouslySetInnerHTML" | "color" | "width" | "height"
  > {
  artwork: CollectionArtwork;
  options?: ArtworkOptions;
  /** Stable and unique within the document, including when an artwork is repeated. */
  idPrefix: string;
}
export function Illustration({
  artwork,
  options = {},
  idPrefix,
  ...props
}: IllustrationProps): ReactElement {
  const settings = vectorSettings(options);
  const render = (item: VectorNode, key: number): ReactElement =>
    createElement(
      item.tag,
      { ...item.attrs, key, ...(item.part ? { "data-part": item.part } : {}) },
      item.children?.map(render),
    );
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={settings.size}
      height={settings.size}
      viewBox="0 0 160 160"
      fill="none"
      stroke={settings.ink}
      strokeWidth={settings.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={props["aria-label"] ?? artwork.name}
    >
      <title>{artwork.name}</title>
      {settings.background !== "none" && (
        <rect
          width="160"
          height="160"
          fill={settings.background}
          stroke="none"
        />
      )}
      {resolveVectorNodes(artwork.nodes, options, idPrefix).map(render)}
    </svg>
  );
}
