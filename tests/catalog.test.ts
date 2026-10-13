import test from "node:test";
import assert from "node:assert/strict";
import { icons, categories } from "../packages/core/src/catalog";
import { normalizeOptions, styles } from "../packages/core/src/styles";
import { renderSvg } from "../packages/core/src/render";
test("catalog IDs and geometric concepts are unique, with honest category counts", () => {
  assert.equal(icons.length, 200);
  assert.equal(new Set(icons.map((icon) => icon.id)).size, icons.length);
  const geometry = new Map<string, string>();
  for (const icon of icons) {
    assert.match(icon.id, /^[a-z][a-z0-9-]*$/);
    assert.ok(categories.some((category) => category.id === icon.category));
    assert.equal(icon.license, "MIT");
    assert.ok(icon.parts.length > 0);
    const signature = JSON.stringify(
      icon.shapes.map(({ tag, attrs }) => ({ tag, attrs })),
    );
    assert.equal(
      geometry.has(signature),
      false,
      `${icon.id} duplicates ${geometry.get(signature)}`,
    );
    geometry.set(signature, icon.id);
  }
  for (const category of categories) {
    assert.equal(
      icons.filter((icon) => icon.category === category.id).length,
      20,
    );
    assert.equal(category.target, 500);
  }
});
test("all SVG exports use only local, static vector geometry", () => {
  for (const icon of icons)
    for (const style of styles) {
      const svg = renderSvg(icon, { iconStyle: style.id, title: icon.name });
      assert.match(svg, /^<svg /);
      assert.match(svg, /viewBox="0 0 32 32"/);
      assert.doesNotMatch(
        svg,
        /<script|foreignObject|<image|href=|url\(|\son\w+=|<animate/i,
      );
      assert.doesNotMatch(
        svg,
        /(?:width|height|stroke-width|opacity)="(?:NaN|undefined|Infinity)"/,
      );
      for (const part of icon.parts)
        assert.ok(svg.includes(`data-part="${part}"`));
    }
});
test("customization clamps unsafe numeric inputs and excludes resource colors", () => {
  const result = normalizeOptions({
    size: Infinity,
    strokeWidth: 99,
    color: "url(https://evil.test/icon)",
    opacity: -1,
    rotation: NaN,
  });
  assert.equal(result.size, 32);
  assert.equal(result.strokeWidth, 3);
  assert.equal(result.opacity, 0);
  assert.equal(result.rotation, 0);
  assert.equal(result.color, "#242833");
  const rocket = icons.find((icon) => icon.id === "rocket");
  assert.ok(rocket);
  const svg = renderSvg(rocket, {
    title: '"><script>alert(1)</script>',
    color: "#123456",
    size: 96,
    strokeWidth: 2,
    partColors: { flame: "#abcdef", body: "url(javascript:evil)" },
  });
  assert.doesNotMatch(svg, /<script|javascript:|url\(/);
  assert.match(svg, /width="96"/);
  assert.match(svg, /stroke-width="2"/);
  assert.match(svg, /data-part="flame" fill="none" stroke="#abcdef"/);
  assert.match(svg, /&lt;script&gt;/);
});
test("rotation retains a protective viewport inset", () => {
  const icon = icons[0];
  assert.ok(icon);
  for (const rotation of [0, 45, 90, 135, 180, -45]) {
    const output = renderSvg(icon, { rotation, strokeWidth: 3 });
    const matched = output.match(/scale\(([\d.-]+)/);
    assert.ok(matched?.[1]);
    const scale = Number(matched[1]);
    const radians = (rotation * Math.PI) / 180;
    assert.ok(
      scale * (Math.abs(Math.cos(radians)) + Math.abs(Math.sin(radians))) <=
        0.876,
    );
  }
});
