"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LibraryIcon } from "doodle-icon-react/library";
import {
  defaultLibraryStrokeWidth,
  librarySettings,
  renderLibrarySvg,
  type LibraryOptions,
} from "doodle-icon/library";
import {
  SearchIcon,
  DownloadIcon,
  CopyIcon,
  CheckIcon,
  CloseIcon,
} from "doodle-icon-react";
import type { LibraryData } from "@/types/library";
import { downloadBlob, downloadPng } from "@/lib/utils/download";
import { CatalogSearch, type CatalogSearchHandle } from "./catalog-search";
const defaults: LibraryOptions = {
  width: 256,
  height: 256,
  color: "#242833",
  fill: "none",
  background: "none",
  strokeWidth: defaultLibraryStrokeWidth,
  padding: 12,
  roundedness: 0,
};
export function CatalogExplorer({ data }: { data: LibraryData }) {
  const [searching, setSearching] = useState(false);
  const [browsing, startBrowsing] = useTransition();
  const search = useRef<CatalogSearchHandle>(null);
  const router = useRouter();
  const browseCategory = (destination: string) => {
    search.current?.resetForNavigation();
    startBrowsing(() => router.push(destination, { scroll: false }));
  };
  return (
    <>
      <CatalogSearch
        ref={search}
        query={data.query}
        style={data.style}
        source={data.source}
        category={data.category}
        sources={data.sources}
        matching={data.matching}
        onSearchingChange={setSearching}
      />
      <CatalogResults
        key={`${data.category}/${data.query}/${data.style}/${data.source}`}
        data={data}
        searching={searching || browsing}
        onBrowseCategory={browseCategory}
      />
    </>
  );
}
function CatalogResults({
  data,
  searching,
  onBrowseCategory,
}: {
  data: LibraryData;
  searching: boolean;
  onBrowseCategory: (destination: string) => void;
}) {
  const router = useRouter();
  const [loaded, setLoaded] = useState([...data.icons]);
  const [isPending, startTransition] = useTransition();
  const sentinel = useRef<HTMLDivElement>(null);
  const results = useRef<HTMLDivElement>(null);
  const [editingOnMobile, setEditingOnMobile] = useState(false);
  const requested = useRef(0);
  const previousPage = useRef(data.page);
  useEffect(() => {
    const reset = data.page < previousPage.current;
    setLoaded((previous) =>
      reset
        ? [...data.icons]
        : [
            ...new Map(
              [...previous, ...data.icons].map((icon) => [icon.id, icon]),
            ).values(),
          ],
    );
    previousPage.current = data.page;
    requested.current = 0;
  }, [data.icons, data.page]);
  const [selected, setSelected] = useState(data.icons[0] ?? null),
    [options, setOptions] = useState<LibraryOptions>(defaults);
  const [chosen, setChosen] = useState<Set<string>>(new Set()),
    [status, setStatus] = useState(""),
    [busy, setBusy] = useState(false);
  const inspector = useRef<HTMLElement>(null);
  const s = librarySettings(options);
  const patch = (value: LibraryOptions) => {
    setOptions((previous) => ({ ...previous, ...value }));
    setStatus("");
  };
  const href = useCallback(
    (changes: Record<string, string | number>) => {
      const params = new URLSearchParams({
        q: data.query,
        category: data.category,
        style: data.style,
        source: data.source,
        ...Object.fromEntries(
          Object.entries(changes).map(([key, value]) => [key, String(value)]),
        ),
      });
      for (const [key, value] of [...params]) if (!value) params.delete(key);
      return params.size ? `/?${params}` : "/";
    },
    [data.query, data.category, data.style, data.source],
  );
  const loadMore = useCallback(() => {
    if (
      searching ||
      isPending ||
      data.page >= data.pages ||
      requested.current > data.page
    )
      return;
    requested.current = data.page + 1;
    startTransition(() =>
      router.replace(href({ page: data.page + 1 }), { scroll: false }),
    );
  }, [data.page, data.pages, href, isPending, router, searching]);
  useEffect(() => {
    const element = sentinel.current;
    if (
      !element ||
      data.page >= data.pages ||
      isPending ||
      editingOnMobile ||
      searching
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadMore();
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [
    data.page,
    data.pages,
    isPending,
    loadMore,
    loaded.length,
    editingOnMobile,
    searching,
  ]);
  const toggle = (id: string) =>
    setChosen((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const svg = selected ? renderLibrarySvg(selected, options) : "";
  async function copy(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setStatus(`${label} copied`);
    } catch {
      setStatus("Clipboard unavailable. Download the SVG instead.");
    }
  }
  async function png() {
    if (!selected) return;
    setBusy(true);
    try {
      await downloadPng(svg, s.width, `${selected.id}.png`, s.height);
      setStatus("PNG downloaded");
    } catch {
      setStatus("PNG export failed. Please try SVG.");
    } finally {
      setBusy(false);
    }
  }
  async function zip() {
    setBusy(true);
    try {
      const { zipSync, strToU8 } = await import("fflate");
      const picked = loaded.filter((icon) => chosen.has(icon.id));
      const files: Record<string, Uint8Array> = {};
      for (const icon of picked)
        files[`${icon.id}.svg`] = strToU8(renderLibrarySvg(icon, options));
      files["ATTRIBUTION.txt"] = strToU8(
        picked
          .map(
            (icon) =>
              `${icon.name}\n${icon.sourceName}\n${icon.license}\n${icon.sourceUrl}\nCustomized using DoodleIcons\n`,
          )
          .join("\n"),
      );
      const bytes = zipSync(files);
      downloadBlob(
        new Blob([new Uint8Array(bytes)], { type: "application/zip" }),
        "doodleicons-selection.zip",
      );
      setStatus(`${picked.length} SVGs downloaded`);
    } catch {
      setStatus("Download failed. Try a smaller selection.");
    } finally {
      setBusy(false);
    }
  }
  const active = data.categories.find(
    (category) => category.id === data.category,
  );
  const snippet = selected
    ? `import { LibraryIcon } from "doodle-icon-react/library";\nimport icon from "doodle-icon/assets/${selected.id}";\n\n<LibraryIcon icon={icon} options={${JSON.stringify(options, null, 2)}} />`
    : "";
  return (
    <>
      <div
        className="catalog-workspace"
        id="catalog-results"
        aria-busy={searching}
      >
        <aside className="catalog-sidebar" aria-label="Icon categories">
          <div className="catalog-sidebar-heading">
            Categories <span>{data.categories.length}</span>
          </div>
          <nav aria-label="Categories">
            <Link
              href={href({ q: "", category: "", page: "" })}
              onNavigate={(event) => {
                event.preventDefault();
                onBrowseCategory(href({ q: "", category: "", page: "" }));
              }}
              aria-current={!data.category ? "page" : undefined}
            >
              All icons <span>{data.total.toLocaleString("en-US")}</span>
            </Link>
            {data.categories.map((category) => (
              <Link
                key={category.id}
                href={href({ q: "", category: category.id, page: "" })}
                onNavigate={(event) => {
                  event.preventDefault();
                  onBrowseCategory(
                    href({ q: "", category: category.id, page: "" }),
                  );
                }}
                aria-current={
                  category.id === data.category ? "page" : undefined
                }
              >
                {category.name}
                <span>{category.count}</span>
              </Link>
            ))}
          </nav>
          <Link className="catalog-license-link" href="/licenses">
            Sources & licenses ↗
          </Link>
        </aside>
        <div className="catalog-results" ref={results}>
          <div className="catalog-results-heading">
            <div>
              <h2>{active?.name ?? "All icons"}</h2>
              <p>
                {data.matching.toLocaleString("en-US")} results
                {data.query ? ` for “${data.query}”` : ""}
              </p>
              {!!data.relatedTerms.length && (
                <p className="catalog-related">
                  Also matching: {data.relatedTerms.join(", ")}
                </p>
              )}
            </div>
            <button
              className="catalog-select-page"
              onClick={() =>
                setChosen(
                  chosen.size === loaded.length
                    ? new Set()
                    : new Set(loaded.map((icon) => icon.id)),
                )
              }
              disabled={!loaded.length}
            >
              {chosen.size === loaded.length && chosen.size
                ? "Clear selection"
                : "Select loaded"}
            </button>
          </div>
          {!!chosen.size && (
            <div className="catalog-batch">
              <span>{chosen.size} selected</span>
              <button onClick={zip} disabled={busy}>
                <DownloadIcon size={16} /> Download ZIP
              </button>
              <button
                onClick={() => setChosen(new Set())}
                aria-label="Clear selected icons"
              >
                <CloseIcon size={16} />
              </button>
            </div>
          )}
          {loaded.length ? (
            <div className="catalog-grid" aria-busy={isPending || searching}>
              {loaded.map((icon) => (
                <div
                  className={`catalog-card${selected?.id === icon.id ? " selected" : ""}`}
                  key={icon.id}
                >
                  <button
                    className="catalog-card-main"
                    aria-label={`Customize ${icon.name} by ${icon.sourceName}`}
                    aria-pressed={selected?.id === icon.id}
                    onClick={() => {
                      setSelected(icon);
                      setStatus("");
                      if (window.innerWidth < 1000) {
                        setEditingOnMobile(true);
                        inspector.current?.scrollIntoView({ block: "start" });
                      }
                    }}
                  >
                    <LibraryIcon
                      icon={icon}
                      options={{
                        width: 76,
                        height: 76,
                        color: "currentColor",
                        padding: 9,
                        strokeWidth: s.strokeWidth,
                      }}
                      aria-hidden
                    />
                    <span>{icon.name}</span>
                    <small>{icon.sourceName}</small>
                  </button>
                  <label className="catalog-card-check">
                    <input
                      type="checkbox"
                      checked={chosen.has(icon.id)}
                      onChange={() => toggle(icon.id)}
                      aria-label={`Select ${icon.name} by ${icon.sourceName}`}
                    />
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <div className="catalog-empty">
              <SearchIcon size={36} />
              <h3>No icons match these filters.</h3>
              <p>
                Try a related word or a shorter name. You can also remove the
                source, style and category filters.
              </p>
              {data.query && (data.category || data.style || data.source) && (
                <Link href={`/?q=${encodeURIComponent(data.query)}`}>
                  Search “{data.query}” without filters
                </Link>
              )}
              <Link href="/">Browse all icons</Link>
            </div>
          )}
          {isPending && (
            <div
              className="catalog-grid catalog-loading"
              aria-label="Loading more icons"
              role="status"
            >
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="skeleton catalog-loading-card" />
              ))}
            </div>
          )}
          <div className="catalog-load-more" ref={sentinel}>
            <span role="status">
              {loaded.length.toLocaleString("en-US")} icons loaded
            </span>
            {data.page < data.pages ? (
              <button disabled={isPending || searching} onClick={loadMore}>
                {isPending ? "Loading more icons…" : "Load more icons"}
              </button>
            ) : (
              <span>{data.matching ? "You’ve reached the end." : ""}</span>
            )}
          </div>
        </div>
        <aside
          className="catalog-inspector"
          ref={inspector}
          aria-label="Icon customization"
        >
          {editingOnMobile && (
            <button
              className="catalog-back"
              onClick={() => {
                setEditingOnMobile(false);
                results.current?.scrollIntoView({ block: "start" });
              }}
            >
              ← Back to icons
            </button>
          )}
          {selected ? (
            <>
              <div className="catalog-inspector-title">
                <span>Make it yours</span>
                <button
                  onClick={() => {
                    setOptions(defaults);
                    setStatus("Settings reset");
                  }}
                >
                  Reset
                </button>
              </div>
              <div className="catalog-preview">
                <LibraryIcon
                  icon={selected}
                  options={options}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: 232,
                    maxHeight: 196,
                    objectFit: "contain",
                  }}
                />
              </div>
              <h3>{selected.name}</h3>
              <p className="catalog-source">
                {selected.sourceName} · {selected.style}
              </p>
              <div className="catalog-controls">
                <div className="control-pair">
                  <label>
                    Width <span>px</span>
                    <input
                      aria-label="Export width"
                      type="number"
                      min={16}
                      max={2048}
                      value={s.width}
                      onChange={(e) => patch({ width: Number(e.target.value) })}
                    />
                  </label>
                  <label>
                    Height <span>px</span>
                    <input
                      aria-label="Export height"
                      type="number"
                      min={16}
                      max={2048}
                      value={s.height}
                      onChange={(e) =>
                        patch({ height: Number(e.target.value) })
                      }
                    />
                  </label>
                </div>
                <div className="control-pair">
                  <label>
                    Ink / outline
                    <input
                      type="color"
                      aria-label="Icon color"
                      value={s.color}
                      onInput={(e) => patch({ color: e.currentTarget.value })}
                    />
                  </label>
                  <label>
                    Interior fill
                    <input
                      type="color"
                      aria-label="Fill color"
                      value={s.fill === "none" ? "#b9cdfa" : s.fill}
                      onInput={(e) => patch({ fill: e.currentTarget.value })}
                    />
                  </label>
                </div>
                <label className="control-checkbox">
                  <input
                    type="checkbox"
                    checked={s.fill === "none"}
                    onChange={(e) =>
                      patch({ fill: e.target.checked ? "none" : "#b9cdfa" })
                    }
                  />{" "}
                  No interior fill
                </label>
                <div className="control-pair">
                  <label>
                    Background
                    <input
                      type="color"
                      aria-label="Background color"
                      value={s.background === "none" ? "#eef3ff" : s.background}
                      onInput={(e) =>
                        patch({ background: e.currentTarget.value })
                      }
                    />
                  </label>
                  <label className="control-checkbox">
                    <input
                      type="checkbox"
                      checked={s.background === "none"}
                      onChange={(e) =>
                        patch({
                          background: e.target.checked ? "none" : "#eef3ff",
                        })
                      }
                    />{" "}
                    Transparent
                  </label>
                </div>
                <label className="control-range">
                  Line width <output>{s.strokeWidth}</output>
                  <input
                    aria-label="Line width"
                    type="range"
                    min={0}
                    max={4}
                    step={0.1}
                    value={s.strokeWidth}
                    onChange={(e) =>
                      patch({ strokeWidth: Number(e.target.value) })
                    }
                  />
                </label>
                <div className="control-pair">
                  <label>
                    Line ends
                    <select
                      aria-label="Line ends"
                      value={s.linecap}
                      onChange={(e) =>
                        patch({
                          linecap: e.target.value as
                            | "round"
                            | "butt"
                            | "square",
                        })
                      }
                    >
                      <option value="round">Round</option>
                      <option value="butt">Flat</option>
                      <option value="square">Square</option>
                    </select>
                  </label>
                  <label>
                    Line joins
                    <select
                      aria-label="Line joins"
                      value={s.linejoin}
                      onChange={(e) =>
                        patch({
                          linejoin: e.target.value as
                            | "round"
                            | "miter"
                            | "bevel",
                        })
                      }
                    >
                      <option value="round">Round</option>
                      <option value="miter">Sharp</option>
                      <option value="bevel">Bevel</option>
                    </select>
                  </label>
                </div>
                <details>
                  <summary>Canvas & transforms</summary>
                  <label className="control-range">
                    Canvas corners <output>{s.roundedness}%</output>
                    <input
                      aria-label="Canvas roundedness"
                      type="range"
                      min={0}
                      max={50}
                      value={s.roundedness}
                      onChange={(e) =>
                        patch({ roundedness: Number(e.target.value) })
                      }
                    />
                  </label>
                  <label className="control-range">
                    Padding <output>{s.padding}%</output>
                    <input
                      aria-label="Icon padding"
                      type="range"
                      min={0}
                      max={40}
                      value={s.padding}
                      onChange={(e) =>
                        patch({ padding: Number(e.target.value) })
                      }
                    />
                  </label>
                  <div className="control-pair">
                    <label>
                      Horizontal
                      <select
                        aria-label="Horizontal alignment"
                        value={s.alignX}
                        onChange={(e) =>
                          patch({
                            alignX: e.target.value as
                              | "left"
                              | "center"
                              | "right",
                          })
                        }
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </label>
                    <label>
                      Vertical
                      <select
                        aria-label="Vertical alignment"
                        value={s.alignY}
                        onChange={(e) =>
                          patch({
                            alignY: e.target.value as
                              | "top"
                              | "center"
                              | "bottom",
                          })
                        }
                      >
                        <option value="top">Top</option>
                        <option value="center">Center</option>
                        <option value="bottom">Bottom</option>
                      </select>
                    </label>
                  </div>
                  <label className="control-range">
                    Rotation <output>{s.rotation}°</output>
                    <input
                      aria-label="Rotation"
                      type="range"
                      min={-180}
                      max={180}
                      value={s.rotation}
                      onChange={(e) =>
                        patch({ rotation: Number(e.target.value) })
                      }
                    />
                  </label>
                  <div className="control-pair">
                    <label className="control-checkbox">
                      <input
                        type="checkbox"
                        checked={s.flipX}
                        onChange={(e) => patch({ flipX: e.target.checked })}
                      />{" "}
                      Flip X
                    </label>
                    <label className="control-checkbox">
                      <input
                        type="checkbox"
                        checked={s.flipY}
                        onChange={(e) => patch({ flipY: e.target.checked })}
                      />{" "}
                      Flip Y
                    </label>
                  </div>
                  <label className="control-range">
                    Opacity <output>{Math.round(s.opacity * 100)}%</output>
                    <input
                      aria-label="Icon opacity"
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={s.opacity}
                      onChange={(e) =>
                        patch({ opacity: Number(e.target.value) })
                      }
                    />
                  </label>
                </details>
              </div>
              <div className="catalog-export">
                <button
                  className="catalog-primary"
                  onClick={() => {
                    downloadBlob(
                      new Blob([svg], { type: "image/svg+xml" }),
                      `${selected.id}.svg`,
                    );
                    setStatus("Editable SVG downloaded");
                  }}
                >
                  <DownloadIcon size={17} /> SVG
                </button>
                <button onClick={png} disabled={busy}>
                  PNG
                </button>
                <button onClick={() => copy(svg, "SVG for Figma")}>
                  <CopyIcon size={15} /> Copy SVG
                </button>
                <button onClick={() => copy(snippet, "React code")}>
                  React code
                </button>
              </div>
              {selected.category === "wireframe" && (
                <a
                  className="catalog-model"
                  href={`/models/${selected.id}.obj`}
                  download
                >
                  Download 3D model (.obj) ↗
                </a>
              )}
              <p className="catalog-license">
                <a href={selected.sourceUrl} target="_blank" rel="noreferrer">
                  {selected.sourceName}
                </a>{" "}
                · {selected.license}
                <br />
                Line width affects stroked paths. Corner radius applies to the
                background canvas.
              </p>
            </>
          ) : (
            <p>Select an icon to customize it.</p>
          )}
          <p role="status" aria-live="polite" className="catalog-status">
            {status && (
              <>
                <CheckIcon size={14} /> {status}
              </>
            )}
          </p>
        </aside>
      </div>
    </>
  );
}
