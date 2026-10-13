import { build } from "esbuild";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { gzipSync, strToU8 } from "fflate";
import { libraryCategories } from "../packages/core/src/library/categories.js";
import type { Plugin } from "esbuild";
const root = resolve(import.meta.dirname, "..");
const base = resolve(root, "apps/figma-plugin");
const output = resolve(base, "dist");
await mkdir(output, { recursive: true });
const packed: Record<string, string> = {};
for (const [id] of libraryCategories) {
  const json = await readFile(
    resolve(root, `packages/core/data/categories/${id}.json`),
    "utf8",
  );
  packed[id] = Buffer.from(gzipSync(strToU8(json))).toString("base64");
}
const libraryPlugin: Plugin = {
  name: "offline-library",
  setup(build) {
    build.onResolve({ filter: /^doodleicons:library-data$/ }, () => ({
      path: "library-data",
      namespace: "doodleicons",
    }));
    build.onLoad({ filter: /.*/, namespace: "doodleicons" }, () => ({
      contents: `export default ${JSON.stringify(packed)}`,
      loader: "js",
    }));
  },
};
await build({
  entryPoints: [resolve(base, "src/code.ts")],
  outfile: resolve(output, "code.js"),
  bundle: true,
  format: "iife",
  target: "es2017",
  minify: true,
  plugins: [libraryPlugin],
});
const ui = await build({
  entryPoints: [resolve(base, "src/ui.ts")],
  write: false,
  bundle: true,
  format: "iife",
  target: "es2020",
  minify: true,
  plugins: [libraryPlugin],
});
const script = ui.outputFiles[0]?.text;
if (!script) throw new Error("Plugin UI build produced no output.");
const template = await readFile(resolve(base, "ui.html"), "utf8");
await writeFile(
  resolve(output, "ui.html"),
  template.replace(
    "<!-- SCRIPT -->",
    `<script>${script.replaceAll("</script", "<\\/script")}</script>`,
  ),
);
const config: unknown = JSON.parse(
  await readFile(resolve(root, "release.config.json"), "utf8"),
);
const id =
  typeof config === "object" &&
  config !== null &&
  "figmaPluginId" in config &&
  typeof config.figmaPluginId === "string"
    ? config.figmaPluginId
    : undefined;
const manifest = {
  name: "DoodleIcons",
  ...(id ? { id } : {}),
  api: "1.0.0",
  main: "code.js",
  ui: "ui.html",
  editorType: ["figma"],
  documentAccess: "dynamic-page",
  networkAccess: { allowedDomains: ["none"] },
};
await writeFile(
  resolve(output, "manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  `Built offline Figma plugin.${id ? "" : " Add the Figma-assigned development plugin ID to release.config.json before importing."}`,
);
