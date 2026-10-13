import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { icons, categories } from "../packages/core/src/catalog";
import { renderSvg, escapeXml } from "../packages/core/src/render";
const output = resolve(import.meta.dirname, "../artifacts/review");
await mkdir(output, { recursive: true });
for (const category of categories) {
  const entries = icons.filter((icon) => icon.category === category.id);
  const width = 1000;
  const height = 535;
  const cells = entries
    .map((icon, i) => {
      const x = (i % 5) * 200;
      const y = Math.floor(i / 5) * 120 + 50;
      const svg = renderSvg(icon, {
        size: 64,
        iconStyle: "duotone",
        color: "#242833",
        accent: "#d8e5ff",
      });
      return `<g transform="translate(${x} ${y})"><rect x="6" y="5" width="188" height="108" rx="8" fill="#f7f7f8"/><g transform="translate(68 10)">${svg}</g><text x="100" y="95" text-anchor="middle" font-family="Arial" font-size="12" fill="#505765">${escapeXml(icon.name)}</text></g>`;
    })
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="white"/><text x="12" y="30" font-family="Arial" font-size="23" fill="#242833">${escapeXml(category.label)}</text>${cells}</svg>`;
  await sharp(Buffer.from(svg))
    .png()
    .toFile(resolve(output, `${category.id}.png`));
}
console.log("Rendered ten category sheets in artifacts/review.");
