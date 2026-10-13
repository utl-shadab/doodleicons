"use client";
import type { Category } from "doodle-icon";
import { useEffect, useRef, useState } from "react";
import { Illustration } from "doodle-icon-react/illustration";
import { renderCollectionSvg } from "doodle-icon/collections/render";
import type {
  ArtworkCollection,
  CollectionArtwork,
  ArtworkOptions,
} from "doodle-icon/collections";
import { downloadBlob, downloadPng } from "@/lib/utils/download";
function defaults(collection: ArtworkCollection): ArtworkOptions {
  return {
    ink: collection.ink,
    primary: collection.primary,
    secondary: collection.secondary,
    paper: collection.id === "character-doodle" ? "#f4f1e8" : "#ffffff",
    strokeWidth: 0.2,
    size: 256,
  };
}
export function CollectionExplorer({
  collections,
  subjects,
}: {
  collections: readonly ArtworkCollection[];
  subjects: readonly Category[];
}) {
  const [selected, setSelected] = useState<{
    collection: ArtworkCollection;
    artwork: CollectionArtwork;
  } | null>(null);
  const [options, setOptions] = useState<ArtworkOptions>({});
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [subject, setSubject] = useState("all");
  const inspector = useRef<HTMLElement>(null);
  useEffect(() => {
    if (selected && window.innerWidth <= 760)
      inspector.current?.scrollIntoView({
        block: "start",
        behavior: "instant",
      });
  }, [selected]);
  const choose = (
    collection: ArtworkCollection,
    artwork: CollectionArtwork,
  ) => {
    setSelected({ collection, artwork });
    setOptions(defaults(collection));
    setStatus("");
  };
  const patch = (value: ArtworkOptions) => {
    setOptions((previous) => ({ ...previous, ...value }));
    setStatus("");
  };
  const svg = selected ? renderCollectionSvg(selected.artwork, options) : "";
  const exportSvg = () => {
    if (!selected) return;
    downloadBlob(
      new Blob([svg], { type: "image/svg+xml" }),
      `${selected.artwork.id}.svg`,
    );
    setStatus("Editable SVG downloaded");
  };
  const exportPng = async () => {
    if (!selected) return;
    setBusy(true);
    try {
      await downloadPng(svg, options.size ?? 256, `${selected.artwork.id}.png`);
      setStatus("PNG downloaded");
    } catch {
      setStatus("PNG export failed. Try downloading the SVG.");
    } finally {
      setBusy(false);
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(svg);
      setStatus("SVG copied for Figma");
    } catch {
      setStatus("Clipboard unavailable. Download the editable SVG instead.");
    }
  };
  const visible = collections
    .filter((collection) => family === "all" || collection.id === family)
    .map((collection) => ({
      ...collection,
      assets: collection.assets.filter(
        (artwork) =>
          (subject === "all" || artwork.category === subject) &&
          `${artwork.name} ${artwork.subject} ${collection.name}`
            .toLowerCase()
            .includes(query.toLowerCase().trim()),
      ),
    }))
    .filter((collection) => collection.assets.length);
  return (
    <>
      <div className="collection-filter">
        <label>
          <span className="sr-only">Search collection artwork</span>
          <input
            type="search"
            placeholder="Search scenes, characters, materials…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label>
          <span className="sr-only">Visual collection</span>
          <select
            value={family}
            onChange={(event) => setFamily(event.target.value)}
          >
            <option value="all">All 11 collections</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Subject category</span>
          <select
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          >
            <option value="all">All subject categories</option>
            {subjects.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div
        className="collection-family-links"
        role="group"
        aria-label="Choose a visual collection"
      >
        <button
          aria-pressed={family === "all"}
          onClick={() => setFamily("all")}
        >
          All collections
        </button>
        {collections.map((collection) => (
          <button
            aria-pressed={family === collection.id}
            key={collection.id}
            onClick={() => setFamily(collection.id)}
          >
            {collection.name}
          </button>
        ))}
      </div>
      <div
        className={
          selected ? "collection-workspace with-editor" : "collection-workspace"
        }
      >
        <div>
          {visible.length ? (
            visible.map((collection) => (
              <section
                className="collection-family"
                key={collection.id}
                aria-labelledby={`heading-${collection.id}`}
              >
                <div className="family-heading">
                  <div>
                    <h2 id={`heading-${collection.id}`}>{collection.name}</h2>
                    <p>{collection.description}</p>
                  </div>
                  <span>
                    {collection.assets.length}{" "}
                    {collection.assets.length === 1 ? "study" : "studies"}
                  </span>
                </div>
                <div className="collection-grid">
                  {collection.assets.map((artwork) => (
                    <button
                      className={`collection-card ${selected?.artwork.id === artwork.id ? "is-selected" : ""}`}
                      key={artwork.id}
                      onClick={() => choose(collection, artwork)}
                      aria-label={`Customize ${artwork.name}`}
                      aria-pressed={selected?.artwork.id === artwork.id}
                    >
                      <div style={{ background: collection.background }}>
                        <Illustration
                          artwork={artwork}
                          options={{ ...defaults(collection), size: 224 }}
                          idPrefix={`card-${artwork.id}`}
                        />
                      </div>
                      <span>
                        <strong>{artwork.name}</strong>
                        <small>{artwork.subject}</small>
                      </span>
                    </button>
                  ))}
                </div>
                {collection.sourceNote && (
                  <p className="collection-source-note">
                    {collection.sourceNote}
                  </p>
                )}
              </section>
            ))
          ) : (
            <p className="collection-empty">
              No artwork is available for this combination yet. The target
              remains 500 concepts in each subject and visual family.
            </p>
          )}
        </div>
        {selected && (
          <aside
            ref={inspector}
            className="collection-editor"
            aria-label="Artwork customizer"
          >
            <div className="collection-editor-title">
              <span>Customize artwork</span>
              <button
                className="text-button"
                onClick={() => setSelected(null)}
                aria-label="Close artwork customizer"
              >
                Close
              </button>
            </div>
            <div
              className="collection-preview"
              style={{ background: selected.collection.background }}
            >
              <Illustration
                artwork={selected.artwork}
                options={{ ...options, size: 250 }}
                idPrefix="inspector-artwork"
              />
            </div>
            <h2>{selected.artwork.name}</h2>
            <p>{selected.collection.name}</p>
            <div className="collection-colors">
              {(
                [
                  ["ink", "Outline"],
                  ["primary", "Primary"],
                  ["secondary", "Secondary"],
                  ["paper", "Surface"],
                ] as const
              ).map(([key, label]) => (
                <label key={key}>
                  {label}
                  <input
                    type="color"
                    aria-label={`${label} color`}
                    value={options[key]}
                    onInput={(event) =>
                      patch({ [key]: event.currentTarget.value })
                    }
                  />
                </label>
              ))}
            </div>
            <label className="range-control">
              <span>
                Export size<output>{options.size} px</output>
              </span>
              <input
                aria-label="Artwork export size"
                type="range"
                min="128"
                max="1024"
                step="32"
                value={options.size}
                onChange={(event) =>
                  patch({ size: Number(event.target.value) })
                }
              />
            </label>
            <label className="range-control">
              <span>
                Line weight<output>{options.strokeWidth}</output>
              </span>
              <input
                aria-label="Artwork line weight"
                type="range"
                min="0.1"
                max="4"
                step="0.1"
                value={options.strokeWidth}
                onChange={(event) =>
                  patch({ strokeWidth: Number(event.target.value) })
                }
              />
            </label>
            <details>
              <summary>Named parts ({selected.artwork.parts.length})</summary>
              <div className="collection-part-colors">
                {selected.artwork.parts.map((part) => (
                  <label key={part}>
                    <span>{part.replaceAll("-", " ")}</span>
                    <input
                      type="color"
                      aria-label={`Color ${part}`}
                      value={options.partColors?.[part] ?? options.primary}
                      onInput={(event) =>
                        patch({
                          partColors: {
                            ...options.partColors,
                            [part]: event.currentTarget.value,
                          },
                        })
                      }
                    />
                  </label>
                ))}
              </div>
            </details>
            <button className="button primary" onClick={exportSvg}>
              Download editable SVG
            </button>
            <div className="collection-export-row">
              <button
                className="button"
                disabled={busy}
                onClick={() => void exportPng()}
              >
                PNG
              </button>
              <button className="button" onClick={() => void copy()}>
                Copy for Figma
              </button>
            </div>
            <button
              className="text-button"
              onClick={() => {
                setOptions(defaults(selected.collection));
                setStatus("Palette restored");
              }}
            >
              Reset palette
            </button>
            <p role="status" aria-live="polite" className="collection-status">
              {status || "Static vectors · editable paths · MIT"}
            </p>
            <details>
              <summary>React component</summary>
              <pre>
                <code>{`import { Illustration } from 'doodle-icon-react/illustration';\nimport { collectionArtworks } from 'doodle-icon/collections';\n\nconst artwork = collectionArtworks.find(\n  item => item.id === '${selected.artwork.id}'\n);\n\n{artwork && <Illustration\n  artwork={artwork}\n  idPrefix="feature-art"\n  options={${JSON.stringify(options, null, 2)}}\n/>}`}</code>
              </pre>
            </details>
          </aside>
        )}
      </div>
    </>
  );
}
