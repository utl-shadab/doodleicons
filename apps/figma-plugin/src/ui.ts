import { icons, categories } from "doodle-icon/catalog";
import { getPluginLibrary } from "./library-catalog";
import {
  libraryCategories,
  renderLibrarySvg,
} from "doodle-icon/library";
import {
  collections,
  collectionArtworks,
  renderCollectionSvg,
  type ArtworkOptions,
} from "doodle-icon/collections";
import {
  isIconStyle,
  renderSvg,
  type IconOptions,
} from "doodle-icon";
const byId = <T extends HTMLElement>(id: string): T => {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Missing control: ${id}`);
  return node as T;
};
const search = byId<HTMLInputElement>("search");
const category = byId<HTMLSelectElement>("category");
const style = byId<HTMLSelectElement>("style");
const color = byId<HTMLInputElement>("color");
const accent = byId<HTMLInputElement>("accent");
const primary = byId<HTMLInputElement>("primary");
const size = byId<HTMLInputElement>("size");
const stroke = byId<HTMLInputElement>("stroke");
const grid = byId("grid");
const selected = new Set<string>();
let page = 1;
let busy = false;
const isCollection = () => category.value.startsWith("collection:");
const isLibrary = () => category.value.startsWith("library:");
const artworkOptions = (): ArtworkOptions => ({
  size: Number(size.value),
  strokeWidth: Number(stroke.value),
  ink: color.value,
  primary: primary.value,
  secondary: accent.value,
  paper:
    category.value === "collection:character-doodle" ? "#f4f1e8" : "#ffffff",
});
const options = (): IconOptions => ({
  size: Number(size.value),
  color: color.value,
  accent: accent.value,
  strokeWidth: Number(stroke.value),
  iconStyle: isIconStyle(style.value) ? style.value : "doodle",
});
for (const entry of categories) {
  const option = document.createElement("option");
  option.value = entry.id;
  option.textContent = entry.label;
  category.append(option);
}
for (const [id, label] of libraryCategories) {
  const option = document.createElement("option");
  option.value = `library:${id}`;
  option.textContent = `${label} · 500`;
  category.append(option);
}
for (const collection of collections) {
  const option = document.createElement("option");
  option.value = `collection:${collection.id}`;
  option.textContent = collection.name;
  category.append(option);
}
function render() {
  const tokens = search.value.toLowerCase().trim().split(/\s+/);
  const matches = isLibrary()
    ? getPluginLibrary(category.value.slice(8)).filter((icon) =>
        tokens.every((token) =>
          `${icon.name} ${icon.sourceName}`.toLowerCase().includes(token),
        ),
      )
    : isCollection()
      ? collectionArtworks.filter(
          (artwork) =>
            category.value === `collection:${artwork.collection}` &&
            tokens.every((token) =>
              `${artwork.name} ${artwork.subject}`
                .toLowerCase()
                .includes(token),
            ),
        )
      : icons.filter(
          (icon) =>
            (category.value === "all" || icon.category === category.value) &&
            tokens.every((token) =>
              `${icon.name} ${icon.tags.join(" ")}`
                .toLowerCase()
                .includes(token),
            ),
        );
  const pages = Math.max(1, Math.ceil(matches.length / 24));
  page = Math.min(page, pages);
  grid.replaceChildren();
  for (const icon of matches.slice((page - 1) * 24, page * 24)) {
    const card = document.createElement("button");
    card.className = `tile ${selected.has(icon.id) ? "selected" : ""}`;
    if ("collection" in icon) {
      const family = collections.find((item) => item.id === icon.collection);
      card.style.height = "126px";
      card.style.background = family?.background ?? "#ffffff";
      card.style.color = family?.ink ?? "#242833";
    }
    card.setAttribute("aria-pressed", String(selected.has(icon.id)));
    card.setAttribute("aria-label", `Select ${icon.name}`);
    card.innerHTML =
      "source" in icon
        ? renderLibrarySvg(icon, {
            width: 42,
            height: 42,
            color: color.value,
            strokeWidth: Number(stroke.value),
          })
        : "nodes" in icon
          ? renderCollectionSvg(
              icon,
              { ...artworkOptions(), size: 88 },
              `preview-${icon.id}`,
            )
          : renderSvg(icon, { ...options(), size: 36 });
    const label = document.createElement("span");
    label.textContent = icon.name;
    card.append(label);
    card.onclick = () => {
      if (selected.has(icon.id)) selected.delete(icon.id);
      else if (selected.size < 100) selected.add(icon.id);
      render();
    };
    grid.append(card);
  }
  if (!matches.length) {
    const empty = document.createElement("p");
    empty.textContent = "No icons found. Try another search.";
    grid.append(empty);
  }
  byId("count").textContent = `${matches.length} icons · ${page}/${pages}`;
  byId<HTMLButtonElement>("previous").disabled = page <= 1;
  byId<HTMLButtonElement>("next").disabled = page >= pages;
  byId<HTMLButtonElement>("insert").disabled = selected.size === 0 || busy;
  byId("insert").textContent = busy
    ? "Inserting…"
    : `Insert ${selected.size || "selected"} icon${selected.size === 1 ? "" : "s"}`;
}
category.addEventListener("input", () => {
  selected.clear();
  style.disabled = isCollection() || isLibrary();
  const collection = collections.find(
    (item) => category.value === `collection:${item.id}`,
  );
  if (collection) {
    color.value = collection.ink;
    primary.value = collection.primary;
    accent.value = collection.secondary;
    size.value = "160";
    stroke.value = "1.7";
  } else {
    size.value = isLibrary() ? "64" : "32";
    color.value = "#242833";
    accent.value = "#b9cdfa";
  }
});
for (const control of [
  search,
  category,
  style,
  color,
  primary,
  accent,
  size,
  stroke,
])
  control.addEventListener("input", () => {
    page = 1;
    render();
  });
byId("previous").onclick = () => {
  page--;
  render();
};
byId("next").onclick = () => {
  page++;
  render();
};
byId("clear").onclick = () => {
  selected.clear();
  render();
};
byId("insert").onclick = () => {
  if (busy || !selected.size) return;
  busy = true;
  byId("status").textContent = "Inserting editable vectors…";
  parent.postMessage(
    {
      pluginMessage: {
        type: "insert",
        ids: [...selected],
        options: options(),
        mode: isLibrary() ? "library" : isCollection() ? "collection" : "basic",
        artworkOptions: artworkOptions(),
        component: byId<HTMLInputElement>("component").checked,
      },
    },
    "*",
  );
  render();
};
window.addEventListener("message", (event: MessageEvent<unknown>) => {
  if (
    event.source !== parent ||
    typeof event.data !== "object" ||
    event.data === null ||
    !("pluginMessage" in event.data)
  )
    return;
  const message: unknown = event.data.pluginMessage;
  if (
    typeof message === "object" &&
    message !== null &&
    "type" in message &&
    (message.type === "success" || message.type === "error") &&
    "message" in message &&
    typeof message.message === "string"
  ) {
    busy = false;
    byId("status").textContent = message.message;
    render();
  }
});
category.value = "library:interface";
style.disabled = true;
size.value = "64";
render();
