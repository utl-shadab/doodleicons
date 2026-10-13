import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
interface MockNode {
  name: string;
  x: number;
  y: number;
  removed: boolean;
  parent: object;
  fills: unknown[];
  constraints: object;
  description: string;
  children: MockNode[];
  remove: () => void;
  setPluginData: (key: string, value: string) => void;
  resize: (width: number, height: number) => void;
  appendChild: (node: MockNode) => void;
}
test("compiled Figma runtime creates editable components and rolls back a failed batch", async () => {
  const script = await readFile(
    new URL("../apps/figma-plugin/dist/code.js", import.meta.url),
    "utf8",
  );
  const currentPage = { selection: [] as MockNode[] };
  const nodes: MockNode[] = [];
  const messages: { type: string; message: string }[] = [];
  const svgInputs: string[] = [];
  const makeNode = (): MockNode => {
    const node: MockNode = {
      name: "",
      x: 0,
      y: 0,
      removed: false,
      parent: currentPage,
      fills: [],
      constraints: {},
      description: "",
      children: [],
      remove() {
        this.removed = true;
      },
      setPluginData() {},
      resize() {},
      appendChild(child) {
        this.children.push(child);
        child.parent = this;
      },
    };
    nodes.push(node);
    return node;
  };
  let failOnSecond = false;
  const figma = {
    currentPage,
    viewport: { center: { x: 10, y: 20 }, scrollAndZoomIntoView() {} },
    showUI() {},
    ui: {
      onmessage: (_input: unknown) => {},
      postMessage: (message: { type: string; message: string }) =>
        messages.push(message),
    },
    createNodeFromSvg: (svg: string) => {
      svgInputs.push(svg);
      if (failOnSecond && svgInputs.length === 3)
        throw new Error("Simulated host insertion error");
      return makeNode();
    },
    createComponent: makeNode,
  };
  vm.runInNewContext(
    script,
    { figma, __html__: "<html></html>", console },
    { timeout: 2000 },
  );
  figma.ui.onmessage({
    type: "insert",
    ids: ["rocket"],
    options: { iconStyle: "duotone", size: 48, color: "#002fa7" },
    component: true,
  });
  assert.equal(messages.at(-1)?.type, "success");
  assert.equal(currentPage.selection.length, 1);
  assert.equal(
    currentPage.selection[0]?.name,
    "DoodleIcons/duotone/technology/Rocket",
  );
  assert.equal(currentPage.selection[0]?.children.length, 1);
  assert.match(svgInputs[0] ?? "", /width="48"/);
  const previous = nodes.length;
  failOnSecond = true;
  figma.ui.onmessage({
    type: "insert",
    ids: ["heart", "cloud"],
    options: {},
    component: false,
  });
  assert.equal(messages.at(-1)?.type, "error");
  assert.ok(nodes.slice(previous).every((node) => node.removed));
  assert.equal(nodes[0]?.removed, false);
  failOnSecond = false;
  figma.ui.onmessage({
    type: "insert",
    mode: "collection",
    ids: ["glossy-glass-glass-shield"],
    options: { size: 160, strokeWidth: 1.7 },
    artworkOptions: {
      primary: "#bd563f",
      ink: "#123456",
      secondary: "#eeeeff",
    },
    component: true,
  });
  assert.equal(messages.at(-1)?.type, "success");
  assert.equal(currentPage.selection.length, 1);
  assert.match(
    currentPage.selection[0]?.name ?? "",
    /DoodleIcons\/glossy-glass/,
  );
  assert.match(svgInputs.at(-1) ?? "", /#bd563f/);
  assert.match(svgInputs.at(-1) ?? "", /linearGradient/);
  figma.ui.onmessage({
    type: "insert",
    mode: "library",
    ids: ["tabler-cat", "studio-wire-1-1"],
    options: { size: 96, color: "#1267ac", strokeWidth: 1.5 },
    component: true,
  });
  assert.equal(messages.at(-1)?.type, "success");
  assert.equal(currentPage.selection.length, 2);
  assert.match(svgInputs.at(-2) ?? "", /Paweł Kuna/);
  assert.match(svgInputs.at(-1) ?? "", /Torus/);
  assert.match(currentPage.selection[0]?.description ?? "", /Tabler Icons/);
  const countBefore = nodes.length;
  figma.ui.onmessage({
    type: "insert",
    mode: "library",
    ids: ["untrusted-icon"],
    options: {},
    component: false,
  });
  assert.equal(messages.at(-1)?.type, "error");
  assert.equal(nodes.length, countBefore);
});
