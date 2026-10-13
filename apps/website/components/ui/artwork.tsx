import { createElement } from "react";
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
export function Artwork({
  icon,
  options = {},
  className,
}: {
  icon: IconDefinition;
  options?: IconOptions;
  className?: string;
}) {
  const s = normalizeOptions(options);
  return (
    <svg
      className={className}
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
      aria-hidden="true"
      focusable="false"
    >
      <g transform={iconTransform(s)}>
        {s.iconStyle === "soft" && (
          <path d={softBlob} fill={s.accent} opacity="0.35" stroke="none" />
        )}
        {icon.shapes.map((shape, i) =>
          createElement(shape.tag, {
            ...shape.attrs,
            ...shapePaint(shape, s),
            "data-part": shape.part,
            key: i,
          }),
        )}
        {s.iconStyle === "doodle" && <path d={doodleFlourish} fill="none" />}
      </g>
    </svg>
  );
}
