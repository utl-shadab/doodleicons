"use client";
import { useState, useRef, useTransition, type CSSProperties } from "react";
import Link from "next/link";
import {
  styles,
  renderSvg,
  licenseNotice,
  type IconOptions,
  type IconStyle,
  type IconDefinition,
} from "doodle-icon";
import {
  GridIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  DownloadIcon,
  CopyIcon,
  SlidersIcon,
  CloseIcon,
  HeartIcon,
  CheckIcon,
  UndoIcon,
} from "doodle-icon-react";
import { Artwork } from "@/components/ui/artwork";
import { catalogLink, componentName } from "@/lib/utils/links";
import { downloadBlob } from "@/lib/utils/download";
import type { CatalogData } from "@/types/catalog";
const initialOptions: IconOptions = {
  iconStyle: "doodle",
  size: 32,
  color: "#242833",
  accent: "#b9cdfa",
  strokeWidth: 0.2,
  fill: "none",
  opacity: 1,
  rotation: 0,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeStyle: "solid",
};
const palette = ["#242833", "#002fa7", "#7667c6", "#c46742", "#527566"];
export function Explorer({ data }: { data: CatalogData }) {
  const [selected, setSelected] = useState<IconDefinition | undefined>(
    data.icons[0],
  );
  const [options, setOptions] = useState<IconOptions>(initialOptions);
  const [saved, setSaved] = useState<ReadonlySet<string>>(new Set());
  const [tab, setTab] = useState<"react" | "svg">("react");
  const [background, setBackground] = useState<"grid" | "light" | "dark">(
    "grid",
  );
  const [feedback, setFeedback] = useState("");
  const [pending, startTransition] = useTransition();
  const inspectorRef = useRef<HTMLElement>(null);
  const update = (patch: IconOptions) => {
    setOptions((previous) => ({ ...previous, ...patch }));
    setFeedback("");
  };
  const choose = (icon: IconDefinition) => {
    setSelected(icon);
    setOptions((previous) => ({ ...previous, partColors: {} }));
    setFeedback("");
    if (window.innerWidth < 800)
      inspectorRef.current?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
  };
  const toggle = (id: string) =>
    setSaved((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const name = selected ? componentName(selected.id) : "";
  const svg = selected
    ? renderSvg(selected, { ...options, title: selected.name })
    : "";
  const codeOptions = { ...options, "aria-label": selected?.name };
  const code = `import { ${name} } from 'doodle-icon-react/icons/${selected?.id ?? "rocket"}';\n\n<${name}\n  {...${JSON.stringify(codeOptions, null, 2)}}\n/>`;
  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setFeedback(`${label} copied`);
    } catch {
      setFeedback("Clipboard unavailable. Select and copy the code below.");
    }
  };
  const download = () => {
    if (selected) {
      downloadBlob(
        new Blob([svg], { type: "image/svg+xml" }),
        `${selected.id}-${options.iconStyle}.svg`,
      );
      setFeedback("SVG downloaded");
    }
  };
  const bulk = () =>
    startTransition(async () => {
      try {
        const { zipSync, strToU8 } = await import("fflate");
        const files: Record<string, Uint8Array> = {};
        for (const icon of data.icons.filter((icon) => saved.has(icon.id)))
          files[`${icon.id}.svg`] = strToU8(
            renderSvg(icon, { ...options, partColors: {}, title: icon.name }),
          );
        files["README.txt"] = strToU8(
          "DoodleIcons · Original static SVG artwork · MIT License\nGenerated from the current shared customization settings.\n",
        );
        files["LICENSE.txt"] = strToU8(licenseNotice);
        const archive = zipSync(files);
        downloadBlob(
          new Blob([new Uint8Array(archive)], { type: "application/zip" }),
          "doodleicons-selection.zip",
        );
        setFeedback(`${saved.size} icons exported`);
      } catch {
        setFeedback("Export failed. Please try again.");
      }
    });
  const png = () =>
    startTransition(async () => {
      if (!selected) return;
      try {
        const { downloadPng } = await import("@/lib/utils/download");
        await downloadPng(svg, options.size ?? 32, `${selected.id}.png`);
        setFeedback("PNG downloaded");
      } catch (error) {
        setFeedback(
          error instanceof Error ? error.message : "PNG export failed.",
        );
      }
    });
  return (
    <div className="explorer-layout">
      <aside className="category-sidebar" aria-label="Icon categories">
        <div className="sidebar-title">
          THE COLLECTION<span>{data.total}</span>
        </div>
        <Link
          href={catalogLink("all", data.query)}
          className={`category-link ${data.category === "all" ? "active" : ""}`}
          aria-current={data.category === "all" ? "page" : undefined}
        >
          <span>
            <GridIcon size={17} iconStyle="outline" />
            All icons
          </span>
          <span>{data.total}</span>
        </Link>
        <div className="category-separator" />
        <p className="sidebar-label">Categories</p>
        {data.categories.map((category) => (
          <Link
            className={`category-link ${data.category === category.id ? "active" : ""}`}
            href={catalogLink(category.id, data.query)}
            key={category.id}
            aria-current={data.category === category.id ? "page" : undefined}
          >
            <span>{category.label}</span>
            <span>{category.count}</span>
          </Link>
        ))}
        <div className="sidebar-note">
          <HeartIcon size={22} iconStyle="soft" color="#002fa7" />
          <strong>Small icons. Open doors.</strong>
          <p>
            Free to use, remix, and make your own. Always credit the license.
          </p>
          <Link href="/support">
            Support DoodleIcons <ArrowRightIcon size={14} iconStyle="outline" />
          </Link>
        </div>
      </aside>
      <section className="icon-browser" aria-label="Browse icons">
        <div className="browser-toolbar">
          <div className="style-tabs" role="group" aria-label="Icon style">
            {styles.map((style) => (
              <button
                key={style.id}
                onClick={() => update({ iconStyle: style.id as IconStyle })}
                aria-pressed={options.iconStyle === style.id}
                className={options.iconStyle === style.id ? "active" : ""}
              >
                {style.label}
              </button>
            ))}
          </div>
          <span className="browser-count">{data.matching} icons</span>
        </div>
        <div className="browser-subtitle">
          <span>
            {data.query
              ? `Results for “${data.query}”`
              : data.category === "all"
                ? "A little personality for every project"
                : data.categories.find(
                    (category) => category.id === data.category,
                  )?.description}
          </span>
          <span className="grid-hint">Click to customize</span>
        </div>
        {data.icons.length ? (
          <div className="icon-grid">
            {data.icons.map((icon) => (
              <div
                key={icon.id}
                className={`icon-tile ${selected?.id === icon.id ? "selected" : ""}`}
              >
                <button
                  className="icon-choice"
                  onClick={() => choose(icon)}
                  aria-pressed={selected?.id === icon.id}
                  aria-label={`Customize ${icon.name}`}
                >
                  <Artwork
                    icon={icon}
                    options={{ ...options, partColors: {}, size: 43 }}
                  />
                  <span>{icon.name}</span>
                </button>
                <label
                  className={`save-icon ${saved.has(icon.id) ? "is-saved" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={saved.has(icon.id)}
                    onChange={() => toggle(icon.id)}
                    aria-label={`Select ${icon.name} for export`}
                  />
                  <span aria-hidden="true">
                    {saved.has(icon.id) ? (
                      <CheckIcon size={11} iconStyle="outline" />
                    ) : (
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <path d="M5 1v8M1 5h8" stroke="currentColor" />
                      </svg>
                    )}
                  </span>
                </label>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-face">:(</span>
            <h2>No little details found.</h2>
            <p>Try “heart”, “cloud”, or a broader search.</p>
            <Link href="/" className="button">
              Clear filters
            </Link>
          </div>
        )}
        {saved.size > 0 && (
          <div className="selection-tray">
            <span>
              <strong>{saved.size}</strong> selected on this page
            </span>
            <button className="text-button" onClick={() => setSaved(new Set())}>
              Clear
            </button>
            <button
              className="button primary"
              disabled={pending}
              onClick={bulk}
            >
              <DownloadIcon size={16} iconStyle="outline" />
              {pending ? "Preparing…" : "Download ZIP"}
            </button>
          </div>
        )}
        <nav className="pagination" aria-label="Pagination">
          <span>
            Page {data.page} of {data.pages}
          </span>
          <div>
            {data.page > 1 && (
              <Link
                className="button small"
                href={catalogLink(data.category, data.query, data.page - 1)}
              >
                <ArrowLeftIcon size={15} iconStyle="outline" />
                Previous
              </Link>
            )}
            {data.page < data.pages && (
              <Link
                className="button small"
                href={catalogLink(data.category, data.query, data.page + 1)}
              >
                Next
                <ArrowRightIcon size={15} iconStyle="outline" />
              </Link>
            )}
          </div>
        </nav>
      </section>
      <aside
        className="inspector"
        ref={inspectorRef}
        aria-label="Icon customizer"
      >
        {selected ? (
          <>
            <div className="inspector-heading">
              <span>
                <SlidersIcon size={17} iconStyle="outline" />
                Make it yours
              </span>
              <button
                className="icon-button"
                onClick={() => {
                  setOptions(initialOptions);
                  setBackground("grid");
                  setFeedback("Defaults restored");
                }}
                aria-label="Reset customization"
              >
                <UndoIcon size={17} iconStyle="outline" />
              </button>
            </div>
            <div className={`icon-preview preview-${background}`}>
              <Artwork icon={selected} options={{ ...options, size: 108 }} />
              <div
                className="preview-backgrounds"
                role="group"
                aria-label="Preview background"
              >
                {(["grid", "light", "dark"] as const).map((value) => (
                  <button
                    key={value}
                    className={`background-swatch ${value}`}
                    aria-label={`${value} background`}
                    aria-pressed={background === value}
                    onClick={() => setBackground(value)}
                  />
                ))}
              </div>
            </div>
            <div className="selected-name">
              <h2>{selected.name}</h2>
              <Link
                href={`/icons/${selected.id}`}
                aria-label={`Open ${selected.name} details`}
              >
                <ArrowRightIcon size={16} iconStyle="outline" />
              </Link>
            </div>
            <div className="icon-tags">
              <span>
                {styles.find((style) => style.id === options.iconStyle)?.label}
              </span>
              <span>32 × 32 grid</span>
              <span>MIT</span>
            </div>
            <div className="customization-controls">
              <div className="control-label">
                Stroke color<span>{options.color}</span>
              </div>
              <div className="color-controls">
                {palette.map((color) => (
                  <button
                    key={color}
                    className="color-swatch"
                    style={{ "--swatch": color } as CSSProperties}
                    aria-label={`Set stroke color to ${color}`}
                    aria-pressed={options.color === color}
                    onClick={() => update({ color })}
                  />
                ))}
                <label className="custom-color">
                  <input
                    type="color"
                    value={options.color}
                    onInput={(event) =>
                      update({ color: event.currentTarget.value })
                    }
                    aria-label="Custom stroke color"
                  />
                  <span>Custom</span>
                </label>
              </div>
              <label className="range-control">
                <span>
                  Size<output>{options.size} px</output>
                </span>
                <input
                  type="range"
                  aria-label="Icon size"
                  min="16"
                  max="256"
                  step="8"
                  value={options.size}
                  onChange={(event) =>
                    update({ size: Number(event.target.value) })
                  }
                />
                <span className="range-limits">
                  <span>16</span>
                  <span>256</span>
                </span>
              </label>
              <label className="range-control">
                <span>
                  Stroke weight<output>{options.strokeWidth} px</output>
                </span>
                <input
                  type="range"
                  aria-label="Stroke weight"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={options.strokeWidth}
                  onChange={(event) =>
                    update({ strokeWidth: Number(event.target.value) })
                  }
                />
              </label>
              <div className="color-row">
                <label>
                  Accent
                  <input
                    type="color"
                    value={options.accent}
                    onInput={(event) =>
                      update({ accent: event.currentTarget.value })
                    }
                  />
                </label>
                <label>
                  Fill
                  <input
                    type="color"
                    value={options.fill === "none" ? "#ffffff" : options.fill}
                    onInput={(event) =>
                      update({ fill: event.currentTarget.value })
                    }
                  />
                </label>
                <button
                  className="text-button"
                  onClick={() => update({ fill: "none" })}
                >
                  No fill
                </button>
              </div>
              <details className="advanced-controls">
                <summary>
                  More controls<span>+</span>
                </summary>
                <label className="range-control">
                  <span>
                    Opacity
                    <output>{Math.round((options.opacity ?? 1) * 100)}%</output>
                  </span>
                  <input
                    type="range"
                    aria-label="Opacity"
                    min="0"
                    max="1"
                    step="0.05"
                    value={options.opacity}
                    onChange={(event) =>
                      update({ opacity: Number(event.target.value) })
                    }
                  />
                </label>
                <label className="range-control">
                  <span>
                    Rotation<output>{options.rotation}°</output>
                  </span>
                  <input
                    type="range"
                    aria-label="Rotation"
                    min="-180"
                    max="180"
                    step="15"
                    value={options.rotation}
                    onChange={(event) =>
                      update({ rotation: Number(event.target.value) })
                    }
                  />
                </label>
                <div className="select-row">
                  <label>
                    Line cap
                    <select
                      value={options.strokeLinecap}
                      onChange={(event) =>
                        update({
                          strokeLinecap: event.target.value as
                            | "round"
                            | "butt"
                            | "square",
                        })
                      }
                    >
                      <option>round</option>
                      <option>butt</option>
                      <option>square</option>
                    </select>
                  </label>
                  <label>
                    Line join
                    <select
                      value={options.strokeLinejoin}
                      onChange={(event) =>
                        update({
                          strokeLinejoin: event.target.value as
                            | "round"
                            | "miter"
                            | "bevel",
                        })
                      }
                    >
                      <option>round</option>
                      <option>miter</option>
                      <option>bevel</option>
                    </select>
                  </label>
                </div>
                <label className="standalone-select">
                  Stroke style
                  <select
                    value={options.strokeStyle}
                    onChange={(event) =>
                      update({
                        strokeStyle: event.target.value as
                          | "solid"
                          | "dashed"
                          | "dotted",
                      })
                    }
                  >
                    <option>solid</option>
                    <option>dashed</option>
                    <option>dotted</option>
                  </select>
                </label>
                <div className="flip-controls">
                  <label>
                    <input
                      type="checkbox"
                      checked={options.flipX ?? false}
                      onChange={(event) =>
                        update({ flipX: event.target.checked })
                      }
                    />
                    Flip horizontal
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={options.flipY ?? false}
                      onChange={(event) =>
                        update({ flipY: event.target.checked })
                      }
                    />
                    Flip vertical
                  </label>
                </div>
                <p className="control-label">Individual parts</p>
                {selected.parts.map((part) => (
                  <label className="part-color" key={part}>
                    <span>{part}</span>
                    <input
                      type="color"
                      value={options.partColors?.[part] ?? options.color}
                      onInput={(event) =>
                        update({
                          partColors: {
                            ...options.partColors,
                            [part]: event.currentTarget.value,
                          },
                        })
                      }
                    />
                  </label>
                ))}
              </details>
            </div>
            <div className="export-buttons">
              <button className="button primary" onClick={download}>
                <DownloadIcon size={17} iconStyle="outline" />
                Download SVG
              </button>
              <button className="button" disabled={pending} onClick={png}>
                PNG
              </button>
            </div>
            <button
              className="copy-svg-button"
              onClick={() => void copy(svg, "SVG")}
            >
              <CopyIcon size={15} iconStyle="outline" />
              Copy SVG for Figma
            </button>
            <div className="feedback" role="status" aria-live="polite">
              {feedback || "Your settings travel with your export."}
            </div>
            <details className="code-details">
              <summary>Use in your project</summary>
              <div className="code-tabs">
                <button
                  aria-pressed={tab === "react"}
                  onClick={() => setTab("react")}
                >
                  React
                </button>
                <button
                  aria-pressed={tab === "svg"}
                  onClick={() => setTab("svg")}
                >
                  SVG
                </button>
                <button
                  className="code-copy"
                  aria-label="Copy code"
                  onClick={() =>
                    void copy(tab === "react" ? code : svg, "Code")
                  }
                >
                  <CopyIcon size={14} iconStyle="outline" />
                </button>
              </div>
              <pre tabIndex={0}>
                <code>{tab === "react" ? code : svg}</code>
              </pre>
            </details>
            <div className="inspector-license">
              <CheckIcon size={12} iconStyle="outline" />
              Free for personal & commercial projects
            </div>
          </>
        ) : (
          <div className="inspector-empty">
            <CloseIcon size={32} iconStyle="soft" />
            <p>Find an icon to start customizing.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
