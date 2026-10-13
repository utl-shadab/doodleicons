import { readFile, writeFile, mkdir } from "node:fs/promises";
import type { LibrarySource } from "../packages/core/src/library/types.js";
const root = new URL("../", import.meta.url);
const sources = JSON.parse(
  await readFile(new URL("packages/core/data/sources.json", root), "utf8"),
) as LibrarySource[];
const overrides: Record<string, string> = {
  hugeicons:
    "https://raw.githubusercontent.com/hugeicons/hugeicons/main/LICENSE.md",
  carbon:
    "https://raw.githubusercontent.com/carbon-design-system/carbon/main/LICENSE",
  solar:
    "https://raw.githubusercontent.com/spdx/license-list-data/main/text/CC-BY-4.0.txt",
  streamline:
    "https://raw.githubusercontent.com/spdx/license-list-data/main/text/CC-BY-4.0.txt",
  "game-icons":
    "https://raw.githubusercontent.com/game-icons/icons/master/license.txt",
};
const directory = new URL("packages/core/licenses/", root);
await mkdir(directory, { recursive: true });
const rows: string[] = [];
const texts: Record<string, string> = {};
for (const source of sources) {
  if (source.id === "doodleicons-studio") continue;
  const url =
    overrides[source.id] ??
    source.licenseUrl
      .replace("https://github.com/", "https://raw.githubusercontent.com/")
      .replace("/blob/", "/");
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok)
    throw new Error(
      `License fetch failed ${source.id}: ${response.status} ${url}`,
    );
  const license = await response.text();
  if (license.includes("<!DOCTYPE html"))
    throw new Error(`Expected plain-text license: ${source.id}`);
  await writeFile(
    new URL(`${source.id}.txt`, directory),
    `${source.name}\nAuthor: ${source.author}\nSource: ${source.url}\nIconify package version: ${source.version}\n\n${license}`,
  );
  texts[source.id] =
    `${source.name}. ${source.author}. ${source.url}\n${license}`;
  rows.push(
    `| ${source.name} | ${source.author} | ${source.license} | [Source](${source.url}) | [License](licenses/${source.id}.txt) |`,
  );
  console.log(`Saved ${source.id} license`);
}
texts["doodleicons-studio"] = await readFile(new URL("LICENSE", root), "utf8");
await writeFile(
  new URL("packages/core/src/library/license-texts.ts", root),
  `// Generated from verified upstream license texts.\nexport const licenseTexts: Readonly<Record<string,string>> = ${JSON.stringify(texts)};\n`,
);
await writeFile(
  new URL("packages/core/THIRD_PARTY_NOTICES.md", root),
  `# Artwork attribution\n\nDoodleIcons code and original artwork are MIT licensed. Imported artwork retains each upstream license. Redistribution must retain the applicable notices. The collection includes independently drawn treatments of shared subjects; artwork count is not a claim of 15,000 unique concepts.\n\n| Collection | Author | License | Source | Text |\n| --- | --- | --- | --- | --- |\n${rows.join("\n")}\n\n## Changes\n\nImported SVGs were converted to typed vector nodes, categorized, and given consistent canvas controls. Geometry is preserved. User customization can modify colors, line widths, transforms, and canvas dimensions. SVG exports retain source and license attribution in their description.\n\nGame Icons includes contributions from the artists listed at https://game-icons.net/about.html#authors. Source files and per-icon history are available at https://github.com/game-icons/icons.\n\nBrand logos are the property of their respective owners. An artwork license does not grant trademark rights or imply endorsement. Consult the source brand guidelines for use of a mark.\n`,
);
