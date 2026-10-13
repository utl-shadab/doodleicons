import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { icons, categories } from "../packages/core/src/catalog";
import { renderSvg } from "../packages/core/src/render";
import { styles } from "../packages/core/src/styles";
const root = resolve(import.meta.dirname, "..");
export const componentName = (id: string): string =>
  id
    .split("-")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join("") + "Icon";
const directory = resolve(root, "packages/react/src/icons");
await mkdir(directory, { recursive: true });
const exports: string[] = [
  'export type { IconProps, IconComponent } from "./create-icon.js";',
];
for (const icon of icons) {
  const name = componentName(icon.id);
  const source = `// Generated from canonical artwork. Run npm run generate to update.\nimport { createIcon, type IconComponent } from "../create-icon.js";\nexport const ${name}: IconComponent<${icon.parts.map((part) => JSON.stringify(part)).join(" | ")}> = /* @__PURE__ */ createIcon(${JSON.stringify(icon)});\n`;
  await writeFile(resolve(directory, `${icon.id}.tsx`), source);
  exports.push(`export { ${name} } from "./icons/${icon.id}.js";`);
}
await writeFile(
  resolve(root, "packages/react/src/index.ts"),
  exports.join("\n") + "\n",
);
const assetDirectory = resolve(root, "artifacts/svg");
for (const style of styles) {
  await mkdir(resolve(assetDirectory, style.id), { recursive: true });
  for (const icon of icons)
    await writeFile(
      resolve(assetDirectory, style.id, `${icon.id}.svg`),
      renderSvg(icon, { iconStyle: style.id, title: icon.name }),
    );
}
await writeFile(
  resolve(root, "artifacts/catalog.json"),
  JSON.stringify(
    {
      version: "0.1.0",
      concepts: icons.length,
      styles: styles.map((style) => style.id),
      categories: categories.map((category) => ({
        ...category,
        available: icons.filter((icon) => icon.category === category.id).length,
      })),
      icons,
    },
    null,
    2,
  ),
);
console.log(
  `Generated ${icons.length} React components and ${icons.length * styles.length} SVG style exports.`,
);
