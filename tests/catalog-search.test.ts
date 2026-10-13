import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import type { LibraryIndexItem } from "../packages/core/src/library/types.js";
import { libraryCategories } from "../packages/core/src/library/categories.js";
import {
  createCatalogSearch,
  normalizeSearch,
} from "../apps/website/lib/utils/catalog-search.js";

const index = JSON.parse(
  await readFile(
    new URL("../packages/core/data/index.json", import.meta.url),
    "utf8",
  ),
) as LibraryIndexItem[];
const search = createCatalogSearch(index);
test("every icon is indexed by its ID and every category supports names and prefixes", () => {
  for (const item of index) assert.equal(search(item.id).items[0]?.id, item.id);
  for (const [category] of libraryCategories) {
    const items = index.filter((item) => item.category === category);
    for (const offset of [0, Math.floor(items.length / 2), items.length - 1]) {
      const item = items[offset];
      assert.ok(item);
      assert.ok(
        search(item.name).items.some((result) => result.id === item.id),
        `${category}: ${item.name}`,
      );
      const prefix =
        normalizeSearch(item.name).split(" ")[0]?.slice(0, 3) ?? "";
      assert.ok(
        search(prefix).items.some((result) => result.id === item.id),
        `${category}: ${prefix}`,
      );
    }
  }
});
test("joined names and initials work for any indexed subject without special cases", () => {
  const fixtures = [
    {
      id: "new-solar-array",
      name: "Solar Array",
      originalName: "solar-array",
      category: "industry",
      sourceName: "Studio",
      style: "outline",
    },
    {
      id: "new-invoice-approval",
      name: "Invoice Approval",
      originalName: "invoice-approval",
      category: "finance",
      sourceName: "Studio",
      style: "outline",
    },
  ] as const;
  const generic = createCatalogSearch(fixtures);
  assert.equal(generic("solararray").items[0]?.id, "new-solar-array");
  assert.equal(generic("sa").items[0]?.id, "new-solar-array");
  assert.equal(generic("ia").items[0]?.id, "new-invoice-approval");
});
test("airplane intent works across short forms, languages, phrases and typos", () => {
  for (const query of [
    "plan",
    "plane",
    "air plane",
    "flight",
    "hawai jahaj",
    "हवाई जहाज",
    "विमान",
    "avión",
    "flugzeug",
    "طائرة",
    "airplnae",
    "mujhe plane ka icon chahiye",
  ]) {
    const result = search(query);
    assert.ok(result.items.length > 0, query);
    assert.ok(
      result.items
        .slice(0, 12)
        .some((item) =>
          /airplane|aeroplane|aircraft|plane|flight|jet/i.test(item.name),
        ),
      query,
    );
  }
});
test("everyday Hindi, Hinglish and abbreviations return relevant real assets", () => {
  assert.ok(
    search("db").items.every(
      (item) =>
        !["Dog Bowl", "Dutch Bike", "Double Bed", "Disco Ball"].includes(
          item.name,
        ),
    ),
  );
  for (const [query, expected] of [
    ["ghar", /home|house/i],
    ["घर", /home|house/i],
    ["gaadi", /car|taxi|vehicle|automobile/i],
    ["paisa", /money|cash|coin|rupee|dollar|wallet|payment|currency/i],
    ["msg", /message|chat|comment|sms|conversation/i],
    ["db", /database|data|server|storage/i],
    ["cam", /camera|photo/i],
    ["notif", /notification|bell|alert|alarm/i],
    ["billi", /cat|kitten/i],
    ["phool", /flower|blossom|bloom|floral/i],
  ] as const) {
    assert.ok(
      search(query)
        .items.slice(0, 12)
        .some((item) => expected.test(item.name)),
      query,
    );
  }
});
test("search supports prefixes, all terms, stable ordering, and genuine empty results", () => {
  const prefix = search("airp");
  assert.ok(prefix.items.length > 0);
  assert.ok(
    prefix.items.every((item) =>
      /airp/i.test(`${item.name} ${item.originalName}`),
    ),
  );
  const outline = search("plane outline");
  assert.ok(outline.items.length > 0);
  assert.ok(
    outline.items.every(
      (item) =>
        item.style === "outline" ||
        /outline/i.test(`${item.name} ${item.originalName}`),
    ),
  );
  assert.deepEqual(search("zzqxxvnotfound").items, []);
  assert.equal(search("").items.length, 15000);
  assert.deepEqual(
    search("plan").items.map((item) => item.id),
    search("plan").items.map((item) => item.id),
  );
  assert.equal(
    new Set(search("plan").items.map((item) => item.id)).size,
    search("plan").items.length,
  );
  assert.equal(normalizeSearch("  HAWAI--Jahaj  "), "hawai jahaj");
  assert.equal(normalizeSearch("हवाई जहाज"), "हवाई जहाज");
});
