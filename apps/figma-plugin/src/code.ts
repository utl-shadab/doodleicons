import { icons } from "doodle-icon/catalog";
import { renderSvg } from "doodle-icon";
import {
  collectionArtworks,
  renderCollectionSvg,
} from "doodle-icon/collections";
import { parseInsertMessage } from "./protocol";
import { findPluginLibraryIcon } from "./library-catalog";
import { renderLibrarySvg } from "doodle-icon/library";
figma.showUI(__html__, { width: 420, height: 660, themeColors: true });
const catalog = new Map(icons.map((icon) => [icon.id, icon]));
const artworkCatalog = new Map(
  collectionArtworks.map((artwork) => [artwork.id, artwork]),
);
let inserting = false;
figma.ui.onmessage = (input: unknown) => {
  if (inserting) return;
  const message = parseInsertMessage(input);
  if (!message) {
    figma.ui.postMessage({
      type: "error",
      message: "Choose up to 100 icons and try again.",
    });
    return;
  }
  if (
    message.ids.some((id) =>
      message.mode === "library"
        ? !findPluginLibraryIcon(id)
        : message.mode === "collection"
          ? !artworkCatalog.has(id)
          : !catalog.has(id),
    )
  ) {
    figma.ui.postMessage({
      type: "error",
      message: "An icon is not in this version of the catalog.",
    });
    return;
  }
  inserting = true;
  const created: SceneNode[] = [];
  try {
    const size =
      message.mode === "collection"
        ? (message.artworkOptions.size ?? 160)
        : (message.options.size ?? 32);
    const columns = Math.min(8, Math.ceil(Math.sqrt(message.ids.length)));
    const center = figma.viewport.center;
    for (const [index, id] of message.ids.entries()) {
      const icon =
        message.mode === "library"
          ? findPluginLibraryIcon(id)
          : message.mode === "collection"
            ? artworkCatalog.get(id)
            : catalog.get(id);
      if (!icon) continue;
      const family =
        "source" in icon
          ? icon.style
          : "collection" in icon
            ? icon.collection
            : message.options.iconStyle;
      const subject = "subject" in icon ? icon.subject : icon.category;
      const svg =
        "source" in icon
          ? renderLibrarySvg(icon, {
              width: size,
              height: size,
              ...(message.options.color
                ? { color: message.options.color }
                : {}),
              ...(message.options.strokeWidth
                ? { strokeWidth: message.options.strokeWidth }
                : {}),
            })
          : "nodes" in icon
            ? renderCollectionSvg(icon, message.artworkOptions)
            : renderSvg(icon, message.options);
      const frame = figma.createNodeFromSvg(svg);
      created.push(frame);
      frame.name = `${icon.name} / ${family}`;
      frame.setPluginData("doodleicons:id", icon.id);
      frame.setPluginData("doodleicons:version", "0.1.0");
      frame.setPluginData(
        "doodleicons:options",
        JSON.stringify(
          message.mode === "collection"
            ? message.artworkOptions
            : message.options,
        ),
      );
      let node: FrameNode | ComponentNode = frame;
      if (message.component) {
        const component = figma.createComponent();
        created.push(component);
        component.name = `DoodleIcons/${family}/${subject}/${icon.name}`;
        component.resize(size, size);
        component.fills = [];
        component.appendChild(frame);
        frame.x = 0;
        frame.y = 0;
        frame.constraints = { horizontal: "SCALE", vertical: "SCALE" };
        component.description =
          "source" in icon
            ? `${icon.name}. ${icon.sourceName}. ${icon.license}. ${icon.sourceUrl}. Customized using DoodleIcons.`
            : `${icon.name}. Original DoodleIcons artwork. MIT License. Version 0.1.0.`;
        component.setPluginData("doodleicons:id", icon.id);
        node = component;
      }
      node.x = center.x + (index % columns) * (size + 24);
      node.y = center.y + Math.floor(index / columns) * (size + 24);
    }
    const topLevel = created.filter(
      (node) => node.parent === figma.currentPage,
    );
    figma.currentPage.selection = topLevel;
    figma.viewport.scrollAndZoomIntoView(topLevel);
    figma.ui.postMessage({
      type: "success",
      message: `Inserted ${message.ids.length} editable ${message.component ? "components" : "icons"}.`,
    });
  } catch {
    for (const node of created.reverse()) if (!node.removed) node.remove();
    figma.ui.postMessage({
      type: "error",
      message: "Could not insert the icons. No partial batch was kept.",
    });
  } finally {
    inserting = false;
  }
};
