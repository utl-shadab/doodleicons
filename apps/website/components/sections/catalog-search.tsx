"use client";

import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useTransition,
  type Ref,
} from "react";
import { useRouter } from "next/navigation";
import { CloseIcon, SearchIcon } from "doodle-icon-react";
import type { LibraryData } from "@/types/library";

type SearchFilters = Pick<LibraryData, "query" | "style" | "source">;
export interface CatalogSearchHandle {
  resetForNavigation: () => void;
}
interface CatalogSearchProps extends SearchFilters {
  ref: Ref<CatalogSearchHandle>;
  category: string;
  sources: LibraryData["sources"];
  matching: number;
  onSearchingChange: (searching: boolean) => void;
}

function searchHref(filters: SearchFilters, category = "") {
  const params = new URLSearchParams();
  if (filters.query.trim()) params.set("q", filters.query.trim());
  if (filters.style) params.set("style", filters.style);
  if (filters.source) params.set("source", filters.source);
  if (category) params.set("category", category);
  return params.size ? `/?${params}` : "/";
}

export function CatalogSearch({
  ref,
  query,
  style,
  source,
  category,
  sources,
  matching,
  onSearchingChange,
}: CatalogSearchProps) {
  const router = useRouter();
  const [draft, setDraft] = useState<SearchFilters>({ query, style, source });
  const draftRef = useRef(draft);
  const input = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const composing = useRef(false);
  const ownNavigations = useRef(new Set<string>());
  const [waiting, setWaiting] = useState(false);
  const [pending, startTransition] = useTransition();
  const searching = waiting || pending;
  const serverHref = searchHref({ query, style, source }, category);
  const previousServerHref = useRef(serverHref);

  function cancelDebounce() {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  }

  useImperativeHandle(ref, () => ({
    resetForNavigation() {
      cancelDebounce();
      ownNavigations.current.clear();
      composing.current = false;
      setWaiting(false);
      const filters = { ...draftRef.current, query: "" };
      draftRef.current = filters;
      setDraft(filters);
    },
  }));

  function navigate(filters: SearchFilters) {
    cancelDebounce();
    setWaiting(false);
    const href = searchHref(filters);
    ownNavigations.current.add(href);
    // Keep delayed responses from replacing a newer draft, without retaining
    // an unbounded history of every search made during this visit.
    if (ownNavigations.current.size > 16) {
      const oldest = ownNavigations.current.values().next().value;
      if (oldest !== undefined) ownNavigations.current.delete(oldest);
    }
    startTransition(() => router.replace(href, { scroll: false }));
  }

  function update(filters: SearchFilters, immediate = false) {
    draftRef.current = filters;
    setDraft(filters);
    cancelDebounce();
    setWaiting(true);
    if (composing.current) return;
    if (immediate || !filters.query.trim()) navigate(filters);
    else timer.current = setTimeout(() => navigate(filters), 280);
  }

  useEffect(() => {
    onSearchingChange(searching);
  }, [searching, onSearchingChange]);

  useEffect(() => {
    if (previousServerHref.current === serverHref) return;
    previousServerHref.current = serverHref;
    if (ownNavigations.current.delete(serverHref)) return;
    // Category links and browser history can also change the server filters.
    cancelDebounce();
    setWaiting(false);
    const filters = { query, style, source };
    draftRef.current = filters;
    setDraft(filters);
  }, [serverHref, query, style, source]);

  useEffect(() => {
    const onHistoryNavigation = () => {
      ownNavigations.current.clear();
      cancelDebounce();
      setWaiting(false);
      const params = new URLSearchParams(window.location.search);
      const filters = {
        query: params.get("q") ?? "",
        style: params.get("style") ?? "",
        source: params.get("source") ?? "",
      };
      draftRef.current = filters;
      setDraft(filters);
    };
    window.addEventListener("popstate", onHistoryNavigation);
    return () => {
      cancelDebounce();
      window.removeEventListener("popstate", onHistoryNavigation);
    };
  }, []);

  return (
    <>
      <form
        action="/"
        role="search"
        className="catalog-search"
        onSubmit={(event) => {
          event.preventDefault();
          if (!composing.current) navigate(draftRef.current);
        }}
      >
        <div className="catalog-search-input">
          <SearchIcon size={20} iconStyle="outline" />
          <input
            ref={input}
            aria-label="Search all icons"
            aria-describedby="catalog-search-help"
            aria-controls="catalog-results"
            type="search"
            name="q"
            autoComplete="off"
            maxLength={100}
            placeholder="Start typing any name, meaning or short form…"
            value={draft.query}
            onChange={(event) =>
              update({ ...draftRef.current, query: event.target.value })
            }
            onCompositionStart={() => {
              composing.current = true;
              cancelDebounce();
              setWaiting(true);
            }}
            onCompositionEnd={(event) => {
              composing.current = false;
              update({ ...draftRef.current, query: event.currentTarget.value });
            }}
          />
          {draft.query && (
            <button
              type="button"
              className="catalog-search-clear"
              aria-label="Clear search"
              onClick={() => {
                update({ ...draftRef.current, query: "" }, true);
                input.current?.focus();
              }}
            >
              <CloseIcon size={16} iconStyle="outline" />
            </button>
          )}
        </div>
        <select
          name="style"
          aria-label="Icon style"
          value={draft.style}
          onChange={(event) =>
            update({ ...draftRef.current, style: event.target.value }, true)
          }
        >
          <option value="">All styles</option>
          {[
            "outline",
            "solid",
            "duotone",
            "wireframe",
            "isometric",
            "geometric",
          ].map((value) => (
            <option key={value} value={value}>
              {value[0]?.toUpperCase()}
              {value.slice(1)}
            </option>
          ))}
        </select>
        <select
          name="source"
          aria-label="Icon source"
          value={draft.source}
          onChange={(event) =>
            update({ ...draftRef.current, source: event.target.value }, true)
          }
        >
          <option value="">All sources</option>
          {sources.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </form>
      <div className="catalog-search-feedback">
        <p id="catalog-search-help" className="catalog-search-hint">
          Results update as you type. English, Hindi, Hinglish and short forms
          welcome.
        </p>
        <span
          className="catalog-search-status"
          role="status"
          aria-atomic="true"
        >
          {searching ? (
            <>
              <span
                className="skeleton catalog-search-progress"
                aria-hidden="true"
              />
              Updating results…
            </>
          ) : (
            `${matching.toLocaleString("en-US")} icons found`
          )}
        </span>
      </div>
    </>
  );
}
