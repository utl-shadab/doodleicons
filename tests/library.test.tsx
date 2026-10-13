import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import {
  libraryCategories,
  librarySettings,
  libraryNodes,
  renderLibrarySvg,
  type LibraryIcon,
  type LibraryNode,
} from "../packages/core/src/library/render.js";
import { normalizeOptions } from "../packages/core/src/styles.js";
import { vectorSettings } from "../packages/core/src/collections/render.js";
import { LibraryIcon as ReactLibraryIcon } from "doodle-icon-react/library";
const root = new URL("../", import.meta.url);
test("thin 0.2 strokes are preserved in previews and exports across source sizes", async () => {
  assert.equal(librarySettings().strokeWidth, 0.2);
  assert.equal(normalizeOptions({ strokeWidth: 0.2 }).strokeWidth, 0.2);
  assert.equal(vectorSettings({ strokeWidth: 0.2 }).strokeWidth, 0.2);
  for (const id of ["animals", "wireframe", "isometric"]) {
    const icon =
      (await category(id)).find((item) => item.id === "tabler-cat") ??
      (await category(id))[0];
    assert.ok(icon);
    const widths = (nodes: readonly LibraryNode[]): number[] =>
      nodes.flatMap((node) => [
        ...(typeof node.attrs.strokeWidth === "number"
          ? [node.attrs.strokeWidth]
          : []),
        ...widths(node.children ?? []),
      ]);
    const thin = widths(libraryNodes(icon)),
      thick = widths(libraryNodes(icon, { strokeWidth: 2 }));
    assert.ok(thin.length > 0, icon.id);
    assert.ok(
      thin.every((width) => Math.abs((width / icon.width) * 24 - 0.2) < 1e-8),
    );
    assert.ok(
      thick.every((width) => Math.abs((width / icon.width) * 24 - 2) < 1e-8),
    );
    const svg = renderLibrarySvg(icon),
      markup = renderToStaticMarkup(<ReactLibraryIcon icon={icon} />);
    assert.deepEqual(
      [...svg.matchAll(/stroke-width="([^"]+)"/g)].map((match) => match[1]),
      [...markup.matchAll(/stroke-width="([^"]+)"/g)].map((match) => match[1]),
    );
  }
});
async function category(id: string): Promise<LibraryIcon[]> {
  return JSON.parse(
    await readFile(
      new URL(`packages/core/data/categories/${id}.json`, root),
      "utf8",
    ),
  ) as LibraryIcon[];
}
test("all 30 categories contain exactly 500 distinct attributed geometries", async () => {
  assert.equal(libraryCategories.length, 30);
  const ids = new Set<string>(),
    hashes = new Set<string>();
  for (const [id] of libraryCategories) {
    const icons = await category(id);
    assert.equal(icons.length, 500, id);
    for (const icon of icons) {
      assert.equal(icon.category, id);
      assert.ok(!ids.has(icon.id), icon.id);
      assert.ok(!hashes.has(icon.geometryHash), icon.id);
      ids.add(icon.id);
      hashes.add(icon.geometryHash);
      assert.ok(icon.sourceUrl.startsWith("https://"));
      assert.ok(icon.license);
      const svg = renderLibrarySvg(icon);
      assert.doesNotMatch(
        svg,
        /<(?:script|image|use|animate|foreignObject)\b|\bon\w+=/,
      );
      assert.doesNotMatch(JSON.stringify(icon.nodes), /NaN|Infinity/);
      assert.match(svg, /<desc>.+/);
    }
  }
  assert.equal(ids.size, 15000);
  assert.equal(hashes.size, 15000);
});
test("every library SVG rasterizes to visible artwork with safe margins", async () => {
  for (const [id] of libraryCategories) {
    const icons = await category(id);
    for (let offset = 0; offset < icons.length; offset += 12)
      await Promise.all(
        icons.slice(offset, offset + 12).map(async (icon) => {
          const { data, info } = await sharp(
            Buffer.from(renderLibrarySvg(icon, { width: 64, height: 64 })),
          )
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });
          let ink = 0,
            edge = 0;
          for (let y = 0; y < info.height; y++)
            for (let x = 0; x < info.width; x++) {
              const alpha = data[(y * info.width + x) * 4 + 3] ?? 0;
              if (alpha > 0) {
                ink++;
                if (x === 0 || y === 0 || x === 63 || y === 63) edge++;
              }
            }
          assert.ok(ink > 0, `Empty or invisible: ${icon.id}`);
          assert.equal(edge, 0, `Clipped: ${icon.id}`);
        }),
      );
  }
});
test("React and exported SVG share transforms, non-square dimensions and safe controls", async () => {
  const icon = (await category("animals")).find(
    (icon) => icon.id === "tabler-cat",
  );
  assert.ok(icon);
  const options = {
    width: 480,
    height: 240,
    color: "#123abc",
    fill: "none",
    background: "#abcdef",
    roundedness: 20,
    alignX: "right",
    rotation: 35,
    flipX: true,
    opacity: 0.65,
  } as const;
  const svg = renderLibrarySvg(icon, options),
    markup = renderToStaticMarkup(
      <ReactLibraryIcon icon={icon} options={options} />,
    );
  for (const value of [
    'width="480"',
    'height="240"',
    'fill="#abcdef"',
    'opacity="0.65"',
  ]) {
    assert.ok(svg.includes(value));
    assert.ok(markup.includes(value));
  }
  assert.equal(
    svg.match(/transform="([^"]+)"/)?.[1],
    markup.match(/transform="([^"]+)"/)?.[1],
  );
  assert.match(svg, /Permission is hereby granted/);
  const safe = librarySettings({
    width: Infinity,
    height: -2,
    color: "url(https://bad)",
    background: "<script>",
    roundedness: 900,
  });
  assert.equal(safe.width, 256);
  assert.equal(safe.height, 16);
  assert.equal(safe.color, "#242833");
  assert.equal(safe.background, "none");
  assert.equal(safe.roundedness, 50);
});
test("every wireframe has a corresponding editable 3D OBJ surface", async () => {
  const icons = await category("wireframe");
  for (const icon of icons) {
    const model = await readFile(
      new URL(`apps/website/public/models/${icon.id}.obj`, root),
      "utf8",
    );
    assert.equal((model.match(/^v /gm) ?? []).length, 625);
    assert.equal((model.match(/^f /gm) ?? []).length, 576);
    assert.doesNotMatch(model, /NaN|Infinity/);
  }
});
