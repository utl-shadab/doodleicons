import test from "node:test";
import assert from "node:assert/strict";
import { parseInsertMessage } from "../apps/figma-plugin/src/protocol";
test("Figma bridge accepts known options and removes arbitrary SVG payloads", () => {
  const message = parseInsertMessage({
    type: "insert",
    ids: ["rocket", "rocket", "heart"],
    svg: "<script/>",
    options: {
      color: "url(https://evil.test)",
      size: 9999,
      iconStyle: "duotone",
    },
    component: true,
  });
  assert.ok(message);
  assert.deepEqual(message.ids, ["rocket", "heart"]);
  assert.equal(message.options.size, 512);
  assert.equal(message.options.color, "#242833");
  assert.equal(message.component, true);
  assert.equal("svg" in message, false);
});
test("Figma bridge rejects malformed and oversized batches", () => {
  for (const value of [
    null,
    {},
    { type: "insert", ids: [] },
    { type: "insert", ids: ["<svg>"] },
    { type: "insert", ids: Array.from({ length: 101 }, () => "heart") },
    { type: "insert", ids: [5] },
  ])
    assert.equal(parseInsertMessage(value), null);
});
