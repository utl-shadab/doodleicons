import "server-only";
import { cache } from "react";
import { icons, categories } from "doodle-icon/catalog";
import type { CatalogData, SearchParameters } from "@/types/catalog";
const perPage = 40;
const featured = [
  "rocket",
  "heart",
  "coffee",
  "lightbulb",
  "sparkles",
  "camera",
  "cloud",
  "smile",
  "headphones",
  "gift",
  "palette",
  "leaf",
  "sun",
  "chat",
  "music",
  "globe",
  "bookmark",
  "wand",
  "diamond",
  "rain",
  "flower",
  "laptop",
  "shopping-bag",
  "paperclip",
  "robot",
  "moon",
  "book",
  "compass",
  "send",
  "trophy",
  "shield",
  "puzzle",
  "balloon",
  "home",
  "key",
  "bell",
  "happy-window",
  "tree",
  "meditation",
  "orbit",
];
const ordered = [...icons].sort(
  (a, b) =>
    (featured.includes(a.id) ? featured.indexOf(a.id) : 1000) -
    (featured.includes(b.id) ? featured.indexOf(b.id) : 1000),
);
const scalar = (value: string | string[] | undefined): string =>
  typeof value === "string" ? value : "";
export const getCatalog = cache(
  async (params: SearchParameters): Promise<CatalogData> => {
    const query = scalar(params.q).trim().slice(0, 100);
    const category = categories.some(
      (category) => category.id === params.category,
    )
      ? scalar(params.category)
      : "all";
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    const matches = ordered.filter(
      (icon) =>
        (category === "all" || icon.category === category) &&
        tokens.every((token) =>
          `${icon.id} ${icon.name} ${icon.tags.join(" ")} ${icon.category}`
            .toLowerCase()
            .includes(token),
        ),
    );
    const pages = Math.max(1, Math.ceil(matches.length / perPage));
    const requested = Number(scalar(params.page));
    const page = Math.max(
      1,
      Math.min(pages, Number.isFinite(requested) ? Math.floor(requested) : 1),
    );
    return {
      icons: matches.slice((page - 1) * perPage, page * perPage),
      categories: categories.map((category) => ({
        ...category,
        count: icons.filter((icon) => icon.category === category.id).length,
      })),
      total: icons.length,
      matching: matches.length,
      query,
      category,
      page,
      pages,
    };
  },
);
export const getIcon = cache(async (id: string) =>
  icons.find((icon) => icon.id === id),
);
export const getAllIconIds = cache(async () => icons.map((icon) => icon.id));
