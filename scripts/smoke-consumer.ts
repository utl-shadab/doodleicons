import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const npmCli = process.env.npm_execpath;
if (!npmCli)
  throw new Error("Run this verification with npm run smoke:consumer.");
const packageNames = ["doodle-icon", "doodle-icon-react"].map((name) =>
  resolve(root, `artifacts/packages/${name}-0.1.0.tgz`),
);

for (const version of ["18.3.1", "19.3.0"]) {
  const directory = await mkdtemp(resolve(tmpdir(), "doodleicons-consumer-"));
  await writeFile(
    resolve(directory, "package.json"),
    JSON.stringify({ private: true, type: "module" }),
  );
  execFileSync(
    process.execPath,
    [
      npmCli,
      "install",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
      ...packageNames,
      `react@${version}`,
      `react-dom@${version}`,
      `@types/react@${version.startsWith("18") ? "18" : "19"}`,
    ],
    { cwd: directory, stdio: "inherit" },
  );
  await writeFile(
    resolve(directory, "smoke.mjs"),
    `
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as icons from 'doodle-icon-react';
import { RocketIcon } from 'doodle-icon-react/icons/rocket';
import { icons as catalog } from 'doodle-icon/catalog';
import { renderSvg } from 'doodle-icon';
import { Illustration } from 'doodle-icon-react/illustration';
import { collectionArtworks } from 'doodle-icon/collections';
import { LibraryIcon } from 'doodle-icon-react/library';
import cat from 'doodle-icon/assets/tabler-cat';
import { renderLibrarySvg } from 'doodle-icon/library';
assert.match(renderToStaticMarkup(createElement(LibraryIcon,{icon:cat,options:{width:80,height:40}})),/height="40"/);
assert.match(renderLibrarySvg(cat),/Paweł Kuna/);
assert.equal(Object.keys(icons).length, 200);
assert.equal(catalog.length, 200);
const markup = renderToStaticMarkup(createElement(RocketIcon, { size: 64, title: 'Launch', partColors: { flame: '#ff5500' } }));
assert.match(markup, /width="64"/);
assert.match(markup, /aria-label="Launch"/);
assert.match(markup, /#ff5500/);
assert.match(renderSvg(catalog[0]), /MIT License/);
assert.equal(collectionArtworks.length,33);
assert.match(renderToStaticMarkup(createElement(Illustration,{artwork:collectionArtworks[0],idPrefix:'consumer-art',options:{size:160}})),/Verified capture/);
console.log('React ${version}: packed entry points and SSR passed.');
`,
  );
  execFileSync(process.execPath, [resolve(directory, "smoke.mjs")], {
    cwd: directory,
    stdio: "inherit",
  });
  await writeFile(
    resolve(directory, "consumer.tsx"),
    `
import { RocketIcon } from 'doodle-icon-react';
import { HeartIcon } from 'doodle-icon-react/icons/heart';
import { Illustration } from 'doodle-icon-react/illustration';
import { collectionArtworks } from 'doodle-icon/collections';
import { LibraryIcon } from 'doodle-icon-react/library';
import cat from 'doodle-icon/assets/tabler-cat';
export const catIcon = <LibraryIcon icon={cat} options={{width:80,height:40,alignX:'right',roundedness:10}} />;
export const artwork = <Illustration artwork={collectionArtworks[0]!} idPrefix="typed-art" options={{primary:'#ffaa22'}} />;
export const icons = <><RocketIcon partColors={{flame: '#ff5500'}} title="Launch" /><HeartIcon size={24} /></>;
// @ts-expect-error Only authored parts are allowed.
export const invalid = <RocketIcon partColors={{notARealPart: '#000'}} />;
`,
  );
  await writeFile(
    resolve(directory, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        strict: true,
        noEmit: true,
        jsx: "react-jsx",
        target: "ES2022",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        skipLibCheck: false,
      },
      include: ["consumer.tsx"],
    }),
  );
  execFileSync(
    process.execPath,
    [
      resolve(root, "node_modules/typescript/bin/tsc"),
      "--project",
      resolve(directory, "tsconfig.json"),
    ],
    { cwd: directory, stdio: "inherit" },
  );
  assert.ok(directory.startsWith(resolve(tmpdir(), "doodleicons-consumer-")));
  console.log(
    `React ${version}: consumer TypeScript declarations passed (${directory}).`,
  );
}
