import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
const destination = resolve(root, "artifacts/packages");
mkdirSync(destination, { recursive: true });
const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error("Run packaging through npm run pack:icons.");
for (const name of ["doodle-icon", "doodle-icon-react"]) {
  const args = [
    "pack",
    "--workspace",
    name,
    "--pack-destination",
    "artifacts/packages",
  ];
  execFileSync(process.execPath, [npmCli, ...args], {
    cwd: root,
    stdio: "inherit",
  });
}
