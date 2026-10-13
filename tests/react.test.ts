import test from "node:test";
import assert from "node:assert/strict";
import { createElement, type FunctionComponent } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { build } from "esbuild";
import { RocketIcon } from "doodle-icon-react/icons/rocket";
import { icons } from "../packages/core/src/catalog";
import * as components from "doodle-icon-react";
test("every React icon renders on the server without browser globals", () => {
  for (const icon of icons) {
    const name =
      icon.id
        .split("-")
        .map((part) => (part[0]?.toUpperCase() ?? "") + part.slice(1))
        .join("") + "Icon";
    const Component = components[name as keyof typeof components];
    assert.equal(typeof Component, "function");
    const html = renderToStaticMarkup(
      createElement(Component as FunctionComponent),
    );
    assert.match(html, /aria-hidden="true"/);
    assert.match(html, /stroke="currentColor"/);
  }
});
test("meaningful SVG has an accessible name and supports typed part colors", () => {
  const html = renderToStaticMarkup(
    createElement(RocketIcon, {
      title: "Launch project",
      partColors: { flame: "#c46742" },
      size: 48,
      iconStyle: "duotone",
    }),
  );
  assert.match(html, /role="img"/);
  assert.match(html, /aria-label="Launch project"/);
  assert.doesNotMatch(html, /aria-hidden/);
  assert.match(html, /width="48"/);
  assert.match(html, /data-part="flame"/);
  assert.match(html, /#c46742/);
});
test("single-icon bundle excludes catalog, unrelated icons, and motion runtimes", async () => {
  const result = await build({
    stdin: {
      contents: "export { RocketIcon } from 'doodle-icon-react';",
      resolveDir: process.cwd(),
      loader: "ts",
    },
    bundle: true,
    write: false,
    minify: true,
    treeShaking: true,
    external: ["react", "react/jsx-runtime"],
    format: "esm",
    metafile: true,
  });
  const output = result.outputFiles[0]?.text;
  assert.ok(output);
  assert.ok(
    Buffer.byteLength(output) < 12000,
    `Single icon exceeded 12 kB: ${Buffer.byteLength(output)}`,
  );
  assert.doesNotMatch(
    output,
    /Shopping bag|Fingerprint|Happy window|gsap|framer-motion/,
  );
  console.log(
    `Single icon + shared customization runtime: ${Buffer.byteLength(output)} bytes minified, React excluded.`,
  );
});
