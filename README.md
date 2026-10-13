# DoodleIcons

**A searchable icon library with customizable SVG exports, typed React components, detailed vector illustrations, and an offline Figma plugin.**

[![Star DoodleIcons on GitHub](https://img.shields.io/github/stars/utl-shadab/doodleicons?style=social)](https://github.com/utl-shadab/doodleicons)

If this project is useful to you, please ⭐ [star the repository](https://github.com/utl-shadab/doodleicons). A star helps other designers and developers discover it.

## What is DoodleIcons?

DoodleIcons lets you find, customize, and use vector icons in websites and design files. Search the gallery, select an icon, adjust its appearance, and export SVG or PNG. Developers can use the same artwork as typed React components or render SVG on the server. Designers can copy SVG into Figma or use the offline development plugin.

The project currently includes:

- **15,000 library drawings** in 30 categories, with 500 drawings in each category. These come from 15 open-source icon sets, plus 500 original wireframe surfaces, 500 isometric compositions, and 500 geometric studies. Different source drawings of the same subject count separately.
- **200 original UI concepts** with four vector treatments, exposed as individual React icons.
- **33 original illustration studies** across 11 visual families, available as detailed SVG compositions. These are separate from the 15,000-icon library.
- A browser gallery with instant search, category and source filters, infinite scroll, per-icon customization, and SVG, PNG, and SVG ZIP export.
- An offline Figma development plugin for inserting editable vectors and reusable components.

## Use the website

Visit the deployed DoodleIcons site, or run it locally using the instructions below. Type in the search box to see results as you type; no Enter key is needed. Search recognizes English, Hindi, Hinglish, common abbreviations, related terms, prefixes, and small typos. Results can be narrowed by category, style, and source. Scroll down to load more icons.

Select an icon to customize its size, line width, color, fill, background, alignment, and transforms. The default line width for the library artwork is **0.2**. Filled silhouettes remain filled shapes; line width adjusts strokes rather than converting silhouettes to outlines. The gallery exports the selected result as SVG or PNG, or downloads a selection as an SVG ZIP.

## Install the packages

The library is split into two packages:

- [`doodle-icon`](packages/core/README.md) contains the vector catalog, individual artwork assets, serializers, and illustration data.
- [`doodle-icon-react`](packages/react/README.md) contains React components for the original named UI icons and the illustration renderer. It depends on `doodle-icon`.

**npm publishing is currently pending maintainer verification**, so `npm install` will work after both packages are published. Until then, clone this repository and build the packages locally:

```sh
git clone https://github.com/utl-shadab/doodleicons.git
cd doodleicons
npm install
npm run build:packages
npm run pack:icons
```

Install the generated tarballs into your app (replace the paths with the absolute paths on your machine):

```sh
npm install /path/to/doodleicons/artifacts/packages/doodle-icon-0.1.0.tgz /path/to/doodleicons/artifacts/packages/doodle-icon-react-0.1.0.tgz
```

When published, install both packages from npm:

```sh
npm install doodle-icon doodle-icon-react
```

### Render an individual library icon

Importing an individual asset keeps your bundle focused. `LibraryIcon` renders library artwork using the same default 0.2 line width as the gallery.

```tsx
import { LibraryIcon } from "doodle-icon-react/library";
import cat from "doodle-icon/assets/tabler-cat";

export function CatIcon() {
  return (
    <LibraryIcon
      icon={cat}
      options={{ width: 64, height: 48, strokeWidth: 0.2, color: "#252631" }}
      title="Cat"
    />
  );
}
```

The core package can also render an SVG string without React. This is useful for server rendering, file generation, or custom renderers:

```ts
import { renderLibrarySvg } from "doodle-icon/library";
import cat from "doodle-icon/assets/tabler-cat";

const svg = renderLibrarySvg(cat, {
  width: 64,
  height: 48,
  strokeWidth: 0.2,
  color: "#252631",
});
```

### Use a named React icon

Named icons support outline, doodle, duotone, and soft treatments. Icon-specific `partColors` are typed, so TypeScript catches unknown part names.

```tsx
import { RocketIcon } from "doodle-icon-react/icons/rocket";

export function LaunchButton() {
  return (
    <button type="button" aria-label="Launch">
      <RocketIcon
        size={32}
        iconStyle="duotone"
        color="currentColor"
        accent="#b9cdfa"
        partColors={{ flame: "#c46742" }}
      />
    </button>
  );
}
```

Use an accessible label when an icon conveys information by itself. For an icon inside a button, label the button. Icons are decorative by default.

### Render an illustration

The `collections` entry point provides larger compositions such as scenes, characters, isometric art, wireframes, and glass-like SVG studies. Give every illustration a unique `idPrefix` so SVG gradients do not collide when multiple illustrations appear on a page.

```tsx
import { Illustration } from "doodle-icon-react/illustration";
import { collectionArtworks } from "doodle-icon/collections";

const artwork = collectionArtworks.find(
  (item) => item.id === "color-isometric-secure-vault",
);

export function VaultArtwork() {
  return artwork ? (
    <Illustration
      artwork={artwork}
      idPrefix="vault-feature"
      options={{ size: 160, primary: "#84c65b", secondary: "#bae3e4" }}
    />
  ) : null;
}
```

See the package guides for full APIs and options: [core package](packages/core/README.md) and [React package](packages/react/README.md).

## Use in Figma

You can copy an SVG from the website and paste it into Figma, or build the offline development plugin:

```sh
npm run build:figma
```

Create a development plugin in Figma, put its assigned plugin ID in `release.config.json` as `figmaPluginId`, rebuild, and import `apps/figma-plugin/dist/manifest.json`. The plugin works offline, does not collect telemetry, and inserts editable vector frames or native reusable components. Community publication requires separate Figma setup.

## Run DoodleIcons locally

Requirements: Node.js 22.20 or newer and npm.

```sh
npm install
npm run dev
```

Open `http://127.0.0.1:3000`. The website is a Next.js app; its catalog is read on the server and results are sent to the UI in bounded batches. Infinite scrolling loads 36 more icons at a time. Search updates after a short typing pause and keeps the current filters. The app does not send the complete catalog to the browser.

Useful commands:

```sh
npm run check           # build packages and plugin, type-check workspaces, run tests
npm run build           # production build, including the website
npm run pack:icons      # create installable package tarballs
npm run smoke:consumer  # test the tarballs with React 18 and React 19
```

The package source is compiled before starting Next.js. After editing icon or illustration source data, run `npm run build:packages` to regenerate generated exports.

## Project structure

```text
apps/website/       Next.js searchable gallery and export UI
apps/figma-plugin/  Offline Figma plugin and native insertion bridge
packages/core/      Catalog data, vector assets, and SVG renderers
packages/react/     Typed React icons and illustration components
scripts/            Asset generation, builds, packaging, and release checks
tests/              Catalog, export, SSR, typing, and plugin checks
docs/               Artwork provenance, release guide, and roadmap
```

## Artwork, licensing, and attribution

Project code and original artwork are MIT licensed. Imported artwork keeps its upstream license and attribution. Source-specific notices are included in the repository and package files; SVG exports also include attribution in their descriptions where applicable. Read [`THIRD_PARTY_NOTICES.md`](packages/core/THIRD_PARTY_NOTICES.md) and the license files before redistributing artwork. Brand icons may also be subject to trademark rights.

The 15,000 library drawings, 200 named UI concepts, and 33 illustration studies are separate collections with separate APIs. Counts include distinct source drawings, not 15,000 unique concepts or every subject in every style. The library does not contain 500 drawings for every possible subject/style combination.

## Contributing

Issues and pull requests are welcome. Please include the affected package or app, steps to reproduce for bugs, and a short description of the intended change. For new or modified artwork, preserve its source, license, and attribution information.

```sh
npm run check
```

## Support the project

If DoodleIcons saves you time, please ⭐ [star it on GitHub](https://github.com/utl-shadab/doodleicons) or share it with someone who may find it useful. Contributions and clear bug reports also help the project grow.

Donations are optional. The website's Support page accepts a donation URL through the `DONATION_URL` environment variable when the maintainer configures one; no paywall or placeholder payee is used.

## License

The repository's own code and original artwork are MIT licensed. Some imported vector artwork uses other licenses; those terms and attributions remain applicable. See [`LICENSE`](LICENSE), [`THIRD_PARTY_NOTICES.md`](packages/core/THIRD_PARTY_NOTICES.md), and the individual license files.
