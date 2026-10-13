import { build } from "esbuild";
import { copyFile, mkdir, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { icons } from "../packages/core/src/catalog";
const root = resolve(import.meta.dirname, "..");
for (const name of ["core", "react"]) {
  const base = resolve(root, "packages", name);
  const destination = resolve(base, "dist");
  const allowed = [
    resolve(root, "packages/core/dist"),
    resolve(root, "packages/react/dist"),
  ];
  if (!allowed.includes(destination))
    throw new Error("Refusing to clean an unexpected build directory.");
  await rm(destination, { recursive: true, force: true });
  await mkdir(resolve(base, "dist"), { recursive: true });
  await build({
    entryPoints:
      name === "core"
        ? [
            resolve(base, "src/index.ts"),
            resolve(base, "src/catalog.ts"),
            resolve(base, "src/collections/index.ts"),
            resolve(base, "src/collections/render.ts"),
            resolve(base, "src/library/render.ts"),
          ]
        : [
            resolve(base, "src/index.ts"),
            resolve(base, "src/illustration.tsx"),
            resolve(base, "src/library-icon.tsx"),
            ...icons.map((icon) => resolve(base, `src/icons/${icon.id}.tsx`)),
          ],
    outdir: resolve(base, "dist"),
    outbase: resolve(base, "src"),
    bundle: true,
    splitting: true,
    format: "esm",
    platform: "neutral",
    target: "es2022",
    packages: "external",
    jsx: "automatic",
    sourcemap: true,
    chunkNames: "shared/[name]-[hash]",
  });
  execFileSync(
    process.execPath,
    [
      resolve(root, "node_modules/typescript/bin/tsc"),
      "-p",
      resolve(base, "tsconfig.json"),
    ],
    { stdio: "inherit" },
  );
  await copyFile(resolve(root, "LICENSE"), resolve(base, "LICENSE"));
}
console.log("Built ESM packages and strict TypeScript declarations.");
