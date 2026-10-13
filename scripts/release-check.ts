import { readFile } from "node:fs/promises";
const config: unknown = JSON.parse(
  await readFile(new URL("../release.config.json", import.meta.url), "utf8"),
);
if (
  typeof config !== "object" ||
  config === null ||
  !("repository" in config) ||
  typeof config.repository !== "string" ||
  !/^https:\/\/github\.com\/utl-shadab\/[a-zA-Z0-9._-]+$/.test(
    config.repository,
  )
) {
  console.error(
    "Release blocked: set the verified public repository URL in release.config.json and both package manifests before publishing.",
  );
  process.exitCode = 1;
} else {
  for (const name of ["core", "react"]) {
    const pkg: unknown = JSON.parse(
      await readFile(
        new URL(`../packages/${name}/package.json`, import.meta.url),
        "utf8",
      ),
    );
    if (
      typeof pkg !== "object" ||
      pkg === null ||
      !("repository" in pkg) ||
      !pkg.repository
    )
      throw new Error(`Missing repository metadata: ${name}`);
  }
  console.log(
    "Release metadata is configured. Verify npm scope ownership and trusted publishing before release.",
  );
}
