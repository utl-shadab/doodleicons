import { createElement, type ReactElement, type SVGProps } from "react";
import {
  librarySettings,
  libraryGeometry,
  libraryNodes,
  type LibraryIcon as IconData,
  type LibraryNode,
  type LibraryOptions,
} from "doodle-icon/library";
export interface LibraryIconProps
  extends Omit<
    SVGProps<SVGSVGElement>,
    "children" | "dangerouslySetInnerHTML" | "width" | "height" | "fill"
  > {
  icon: IconData;
  options?: LibraryOptions;
}
export function LibraryIcon({
  icon,
  options = {},
  ...props
}: LibraryIconProps): ReactElement {
  const s = librarySettings(options);
  const node = (item: LibraryNode, key: number): ReactElement =>
    createElement(item.tag, { ...item.attrs, key }, item.children?.map(node));
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={s.width}
      height={s.height}
      viewBox={`0 0 ${s.width} ${s.height}`}
      fill="none"
      role={props["aria-hidden"] ? undefined : "img"}
      aria-label={props["aria-label"] ?? icon.name}
    >
      <title>{icon.name}</title>
      <desc>{`${icon.sourceName} · ${icon.license} · ${icon.sourceUrl}`}</desc>
      {s.background !== "none" && s.background !== "transparent" && (
        <rect
          width={s.width}
          height={s.height}
          rx={(Math.min(s.width, s.height) * s.roundedness) / 100}
          fill={s.background}
        />
      )}
      <g opacity={s.opacity} transform={libraryGeometry(icon, options)}>
        {libraryNodes(icon, options).map(node)}
      </g>
    </svg>
  );
}
