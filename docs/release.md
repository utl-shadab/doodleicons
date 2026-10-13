# Maintainer release guide

Repository: https://github.com/utl-shadab/doodleicons

Packages: `doodle-icon` and `doodle-icon-react`.

## Prepare and verify

```sh
npm ci
npm run check
npm run build --workspace @doodleicons/website
npm run pack:icons
npm run smoke:consumer
npm run release:check
```

The consumer smoke check installs the actual tarballs into isolated temporary projects and checks React 18 and 19 server rendering, public entry points, and TypeScript under NodeNext module resolution. Temporary projects remain outside this repository for inspection.

## First npm publication

Sign in as the owner using `npm login`, then verify `npm whoami` returns `shadab-choudhary`. Publish the core dependency first:

```sh
npm publish --workspace doodle-icon --access public
npm publish --workspace doodle-icon-react --access public
```

Complete any npm authentication or two-factor prompt personally. Do not store credentials in project files. After publication, verify both package versions in the registry and test a fresh registry installation before changing the website's publication status.

For later releases, configure an npm trusted publisher for each package: GitHub owner `utl-shadab`, repository `doodleicons`, workflow `release.yml`, environment `npm-release`. Configure that GitHub environment's reviewer rules to match the maintainer's release policy. The manual workflow accepts an exact version and only runs from `main`.

Versions are immutable on npm. Update both package versions, the React dependency on core, workspace dependencies, generated catalog metadata and consumer tarball names together for a new version.

## Figma

Create a development plugin in Figma Desktop and copy its assigned ID into `release.config.json`. Run `npm run build:figma`, then import the generated manifest. Test insertion and resizing on a real canvas before a Figma Community submission. The current automated check executes the compiled plugin against a controlled API mock; it cannot certify Figma's SVG importer.

## Website and donations

Deploy the root monorepo build to a Next.js-compatible Node host. Run the production website with `npm run start --workspace @doodleicons/website`. Set `SITE_URL` to the public origin. Add an HTTPS `DONATION_URL` when the maintainer has a donation account; the Support page will then show the donation button. The site is otherwise usable without external credentials or a database.

Version 0.1.0 includes 15,000 library drawings across 30 categories, plus 200 original named React icons (four treatments each) and 33 collection artworks across eleven families. These are separate inventories, all shipped in the packages.
