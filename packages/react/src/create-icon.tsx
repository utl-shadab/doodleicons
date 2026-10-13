import {
  createElement,
  type CSSProperties,
  type ReactElement,
  type SVGProps,
} from "react";
import {
  doodleFlourish,
  iconTransform,
  normalizeOptions,
  shapePaint,
  softBlob,
  strokeDash,
  type IconDefinition,
  type IconOptions,
} from "doodle-icon";
export type IconProps<Part extends string = string> = Omit<
  SVGProps<SVGSVGElement>,
  | "children"
  | "dangerouslySetInnerHTML"
  | "color"
  | "fill"
  | "opacity"
  | "width"
  | "height"
  | "strokeWidth"
  | "strokeLinecap"
  | "strokeLinejoin"
  | "ref"
> &
  Omit<IconOptions, "partColors"> & {
    partColors?: Partial<Record<Part, string>>;
    style?: CSSProperties;
  };
export interface IconComponent<Part extends string = string> {
  (props: IconProps<Part>): ReactElement;
  displayName: string;
}
export function createIcon<Part extends string>(
  definition: IconDefinition,
): IconComponent<Part> {
  function DoodleIcon(props: IconProps<Part>) {
    const {
      size,
      width,
      height,
      color = "currentColor",
      accent,
      fill,
      strokeWidth,
      strokeLinecap,
      strokeLinejoin,
      strokeStyle,
      opacity,
      rotation,
      flipX,
      flipY,
      iconStyle,
      partColors,
      title,
      ...svgProps
    } = props;
    const options = Object.fromEntries(
      Object.entries({
        size,
        width,
        height,
        color,
        accent,
        fill,
        strokeWidth,
        strokeLinecap,
        strokeLinejoin,
        strokeStyle,
        opacity,
        rotation,
        flipX,
        flipY,
        iconStyle,
        partColors,
        title,
      }).filter(([, value]) => value !== undefined),
    ) as IconOptions;
    const s = normalizeOptions(options);
    const label = svgProps["aria-label"] ?? s.title;
    const labelled = Boolean(label || svgProps["aria-labelledby"]);
    return (
      <svg
        {...svgProps}
        xmlns="http://www.w3.org/2000/svg"
        width={s.width}
        height={s.height}
        viewBox="0 0 32 32"
        fill="none"
        stroke={s.color}
        strokeWidth={s.strokeWidth}
        strokeLinecap={s.strokeLinecap}
        strokeLinejoin={s.strokeLinejoin}
        strokeDasharray={strokeDash(s)}
        opacity={s.opacity}
        role={labelled ? "img" : undefined}
        aria-label={label || undefined}
        aria-hidden={svgProps["aria-hidden"] ?? (labelled ? undefined : true)}
        focusable="false"
      >
        {s.title ? <title>{s.title}</title> : null}
        <g transform={iconTransform(s)}>
          {s.iconStyle === "soft" ? (
            <path d={softBlob} fill={s.accent} opacity={0.35} stroke="none" />
          ) : null}
          {definition.shapes.map((shape, index) =>
            createElement(shape.tag, {
              ...shape.attrs,
              ...shapePaint(shape, s),
              "data-part": shape.part,
              key: index,
            }),
          )}
          {s.iconStyle === "doodle" ? (
            <path d={doodleFlourish} fill="none" />
          ) : null}
        </g>
      </svg>
    );
  }
  DoodleIcon.displayName =
    definition.name.replace(/[^a-zA-Z0-9]/g, "") + "Icon";
  return DoodleIcon;
}
