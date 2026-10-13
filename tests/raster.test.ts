import test from "node:test";
import assert from "node:assert/strict";
import sharp from "sharp";
import { icons } from "../packages/core/src/catalog";
import { renderSvg } from "../packages/core/src/render";
test("every icon rasterizes with nonempty artwork and a clear outer border", async () => {
  const failures: string[] = [];
  for (const icon of icons) {
    const { data, info } = await sharp(
      Buffer.from(
        renderSvg(icon, { size: 96, strokeWidth: 3, iconStyle: "outline" }),
      ),
    )
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    let occupied = 0;
    let border = 0;
    for (let y = 0; y < info.height; y++)
      for (let x = 0; x < info.width; x++) {
        const alpha = data[(y * info.width + x) * info.channels + 3] ?? 0;
        if (alpha > 20) {
          occupied++;
          if (
            x === 0 ||
            y === 0 ||
            x === info.width - 1 ||
            y === info.height - 1
          )
            border++;
        }
      }
    if (occupied < 20 || border > 0)
      failures.push(
        `${icon.id}: pixels=${occupied}, touching border=${border}`,
      );
  }
  assert.deepEqual(
    failures,
    [],
    "Artwork must be visible and avoid viewport clipping at maximum supported stroke.",
  );
});
