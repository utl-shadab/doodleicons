import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cache } from "react";
import {
  libraryCategories,
  type LibraryIcon,
  type LibraryIndexItem,
  type LibrarySource,
  type LibraryCategoryId,
} from "doodle-icon/library";
import type { LibraryQuery, LibraryData } from "@/types/library";
import { createCatalogSearch } from "@/lib/utils/catalog-search";
const indexPromise = readFile(
  join(process.cwd(), "../../packages/core/data/index.json"),
  "utf8",
).then((text) => JSON.parse(text) as LibraryIndexItem[]);
const sourcesPromise = readFile(
  join(process.cwd(), "../../packages/core/data/sources.json"),
  "utf8",
).then((text) => JSON.parse(text) as LibrarySource[]);
const searchPromise = indexPromise.then(createCatalogSearch);
const categoryCache = new Map<LibraryCategoryId, Promise<LibraryIcon[]>>();
function getCategory(id: LibraryCategoryId) {
  let promise = categoryCache.get(id);
  if (!promise) {
    promise = readFile(
      join(process.cwd(), "../../packages/core/data/categories", `${id}.json`),
      "utf8",
    ).then((text) => JSON.parse(text) as LibraryIcon[]);
    categoryCache.set(id, promise);
    promise.catch(() => categoryCache.delete(id));
  }
  return promise;
}
const first = (value: string | string[] | undefined) =>
  typeof value === "string"
    ? value
    : Array.isArray(value)
      ? (value[0] ?? "")
      : "";
export const getLibrary = cache(
  async (params: LibraryQuery): Promise<LibraryData> => {
    const [index, sources, search] = await Promise.all([
      indexPromise,
      sourcesPromise,
      searchPromise,
    ]);
    const query = first(params.q).trim().slice(0, 100),
      category = first(params.category),
      style = first(params.style),
      source = first(params.source);
    const searchResult = search(query);
    const filtered = searchResult.items.filter(
      (icon) =>
        (!category || category === icon.category) &&
        (!style || style === icon.style) &&
        (!source || source === icon.source),
    );
    const perPage = 36,
      pages = Math.max(1, Math.ceil(filtered.length / perPage));
    const page = Math.min(
      pages,
      Math.max(1, Math.floor(Number(first(params.page)) || 1)),
    );
    // Interleave categories on the unfiltered landing page to expose the actual breadth.
    const grouped = new Map(
      libraryCategories.map(([id]) => [
        id,
        index.filter((icon) => icon.category === id),
      ]),
    );
    const ordered =
      !category && !query && !style && !source
        ? Array.from({ length: 500 }, (_, position) =>
            libraryCategories.flatMap(([id]) => {
              const item = grouped.get(id)?.[position];
              return item ? [item] : [];
            }),
          ).flat()
        : filtered;
    const selected = ordered.slice((page - 1) * perPage, page * perPage);
    const catalogs = await Promise.all(
      [...new Set(selected.map((icon) => icon.category))].map(getCategory),
    );
    const lookup = new Map(catalogs.flat().map((icon) => [icon.id, icon]));
    return {
      icons: selected
        .map((icon) => lookup.get(icon.id))
        .filter((icon): icon is LibraryIcon => !!icon),
      categories: libraryCategories.map(([id, name, description]) => ({
        id,
        name,
        description,
        count: index.filter((icon) => icon.category === id).length,
      })),
      sources,
      total: index.length,
      matching: filtered.length,
      page,
      pages,
      query,
      category,
      style,
      source,
      relatedTerms: searchResult.relatedTerms,
    };
  },
);
export async function getLibrarySources(): Promise<readonly LibrarySource[]> {
  return sourcesPromise;
}
