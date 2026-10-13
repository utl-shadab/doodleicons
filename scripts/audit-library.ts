import { readFile } from "node:fs/promises";
import type { IconifyJSON } from "@iconify/types";
import { libraryCategories } from "../packages/core/src/library/categories.js";
import { sourceSets, matchesCategory } from "./library-rules.js";
const pool: { source: string; name: string; body: string }[] = [];
for (const source of sourceSets) {
  const set = JSON.parse(
    await readFile(`node_modules/@iconify-json/${source}/icons.json`, "utf8"),
  ) as IconifyJSON;
  for (const [name, icon] of Object.entries(set.icons)) {
    if (
      /-((?:thin|light|bold)|\d{2}-(?:regular|filled))$/.test(name) &&
      source === "ph"
    )
      continue;
    if (source === "fluent" && !/-24-(regular|filled)$/.test(name)) continue;
    if (source === "solar" && !/-(linear|bold-duotone)$/.test(name)) continue;
    if (
      /<(?:mask|clipPath|filter|use|style|image|pattern|text)\b/.test(icon.body)
    )
      continue;
    pool.push({ source, name, body: icon.body });
  }
}
const used = new Set<string>();
for (const [id] of [...libraryCategories].sort(
  (a, b) =>
    pool.filter((x) => matchesCategory(x.name, a[0])).length -
    pool.filter((x) => matchesCategory(x.name, b[0])).length,
)) {
  if (["abstract", "wireframe", "isometric"].includes(id)) continue;
  const candidates = pool.filter((x) =>
    id === "brands"
      ? x.source === "simple-icons"
      : x.source !== "simple-icons" &&
        (matchesCategory(x.name, id) ||
          (id === "health" && x.source === "healthicons")),
  );
  const eligible = candidates.filter((x) => !used.has(x.body));
  eligible.slice(0, 500).forEach((x) => used.add(x.body));
  console.log(id, candidates.length, eligible.length);
}
