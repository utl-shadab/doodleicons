import test from "node:test";
import assert from "node:assert/strict";
import sharp from "sharp";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Illustration } from "doodle-icon-react/illustration";
import {
  collections,
  collectionArtworks,
} from "../packages/core/src/collections/catalog";
import { renderCollectionSvg } from "../packages/core/src/collections/render";
test("all eleven reference families have separate vector compositions and resolvable gradients", async () => {
  assert.equal(collections.length, 11);
  assert.equal(
    new Set(collectionArtworks.map((item) => item.category)).size,
    10,
  );
  assert.equal(
    new Set(collectionArtworks.map((item) => item.id)).size,
    collectionArtworks.length,
  );
  assert.equal(
    new Set(collectionArtworks.map((item) => JSON.stringify(item.nodes))).size,
    collectionArtworks.length,
  );
  for (const collection of collections) {
    for (const artwork of collection.assets) {
      const svg = renderCollectionSvg(artwork, { ...collection, size: 256 });
      assert.doesNotMatch(
        svg,
        /\$(?:ink|paper|primary|secondary)|NaN|<animate|<script|<image|<foreignObject/,
      );
      assert.match(svg, /MIT License/);
      const ids = [...svg.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
      assert.equal(new Set(ids).size, ids.length);
      for (const match of svg.matchAll(/url\(#([^)]+)\)/g))
        assert.ok(
          ids.includes(match[1]),
          `${artwork.id}: unresolved gradient ${match[1]}`,
        );
      const raster = await sharp(Buffer.from(svg))
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      let painted = 0;
      for (let index = 3; index < raster.data.length; index += 4)
        if ((raster.data[index] ?? 0) > 8) painted++;
      assert.ok(painted > 120, `${artwork.id}: blank export`);
    }
  }
});
test("React collection renderer preserves customization and isolates gradient IDs", () => {
  const collection = collections.find((item) => item.id === "glossy-glass");
  assert.ok(collection);
  const artwork = collection.assets[0];
  assert.ok(artwork);
  const html = renderToStaticMarkup(
    createElement(Illustration, {
      artwork,
      idPrefix: "hero-shield",
      options: {
        ...collection,
        size: 128,
        primary: "#00ff66",
        partColors: { lock: "#ffaa11" },
      },
    }),
  );
  assert.match(html, /hero-shield-face/);
  assert.match(html, /#00ff66/);
  assert.match(html, /#ffaa11/);
  assert.match(html, /width="128"/);
  const other = renderToStaticMarkup(
    createElement(Illustration, { artwork, idPrefix: "footer-shield" }),
  );
  assert.doesNotMatch(other, /hero-shield/);
});
