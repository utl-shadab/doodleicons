import sharp, { type OverlayOptions } from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { collections } from "../packages/core/src/collections/catalog";
import { renderCollectionSvg } from "../packages/core/src/collections/render";
import { escapeXml } from "../packages/core/src/render";
const root = resolve(import.meta.dirname, "../artifacts/collections");
await mkdir(root, { recursive: true });
const sheets: Buffer[] = [];
const overview: OverlayOptions[] = [];
for (const collection of collections) {
  const folder = resolve(root, collection.id);
  await mkdir(folder, { recursive: true });
  const composites: OverlayOptions[] = [];
  for (const [index, artwork] of collection.assets.entries()) {
    const svg = renderCollectionSvg(artwork, {
      ...collection,
      size: 512,
      paper: collection.id === "character-doodle" ? "#f4f1e8" : "#ffffff",
    });
    await writeFile(resolve(folder, `${artwork.id}.svg`), svg);
    const buffer = await sharp(Buffer.from(svg))
      .resize(300, 300)
      .png()
      .toBuffer();
    composites.push({ input: buffer, top: 65, left: index * 340 + 20 });
    const text = Buffer.from(
      `<svg width="320" height="50"><text x="160" y="24" text-anchor="middle" font-family="Arial" font-size="15" fill="${collection.ink}">${escapeXml(artwork.name)}</text></svg>`,
    );
    composites.push({ input: text, top: 370, left: index * 340 + 10 });
  }
  composites.push({
    input: Buffer.from(
      `<svg width="1000" height="55"><text x="24" y="35" font-family="Arial" font-size="24" fill="${collection.ink}">${escapeXml(collection.name)}</text></svg>`,
    ),
    top: 0,
    left: 0,
  });
  const sheet = await sharp({
    create: {
      width: 1020,
      height: 420,
      channels: 4,
      background: collection.background,
    },
  })
    .composite(composites)
    .png()
    .toBuffer();
  await writeFile(resolve(root, `${collection.id}.png`), sheet);
  sheets.push(sheet);
  const example = collection.assets[0];
  if (example) {
    const index = sheets.length - 1;
    const tile = await sharp({
      create: {
        width: 360,
        height: 320,
        channels: 4,
        background: collection.background,
      },
    })
      .composite([
        {
          input: Buffer.from(
            renderCollectionSvg(example, { ...collection, size: 240 }),
          ),
          top: 52,
          left: 60,
        },
        {
          input: Buffer.from(
            `<svg width="360" height="45"><text x="20" y="30" font-family="Arial" font-size="18" fill="${collection.ink}">${escapeXml(collection.name)}</text></svg>`,
          ),
          top: 0,
          left: 0,
        },
      ])
      .png()
      .toBuffer();
    overview.push({
      input: tile,
      top: Math.floor(index / 3) * 320,
      left: (index % 3) * 360,
    });
  }
}
await sharp({
  create: {
    width: 1020,
    height: 420 * sheets.length,
    channels: 4,
    background: "#ffffff",
  },
})
  .composite(
    sheets.map((input, index) => ({ input, top: index * 420, left: 0 })),
  )
  .png()
  .toFile(resolve(root, "all-collections.png"));
overview.push({
  input: Buffer.from(
    `<svg width="360" height="320"><rect width="360" height="320" fill="#ffffff"/><g font-family="Arial" fill="#20232a"><text x="26" y="115" font-size="29">DoodleIcons</text><text x="26" y="153" font-size="18">11 visual families</text><text x="26" y="183" font-size="18">33 editable vector studies</text><text x="26" y="235" font-size="13" fill="#616673">Artwork review · static icons only</text><text x="26" y="258" font-size="13" fill="#616673">500 per subject/style is still in progress.</text></g></svg>`,
  ),
  top: 960,
  left: 720,
});
await sharp({
  create: { width: 1080, height: 1280, channels: 4, background: "#ffffff" },
})
  .composite(overview)
  .png()
  .toFile(resolve(root, "style-overview.png"));
console.log(
  `Rendered ${collections.length} collection review sheets and ${collections.reduce((sum, item) => sum + item.assets.length, 0)} editable SVG studies.`,
);
