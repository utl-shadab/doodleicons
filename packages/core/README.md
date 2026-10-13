# DoodleIcons core

Static SVG geometry and renderers shared by the website, React package, and offline Figma plugin. Code and original artwork are MIT licensed; imported vectors retain the licenses in `THIRD_PARTY_NOTICES.md` and `licenses/`.

Version 0.1.0 includes **15,000 drawings in 30 categories, exactly 500 per category**, plus the separate original 200 UI concepts and 33 studio illustrations. Different drawings of the same subject count separately; recolors do not. Import a single drawing without loading the catalog:

```ts
import icon from "doodle-icon/assets/tabler-cat";
import { renderLibrarySvg } from "doodle-icon/library";
const svg = renderLibrarySvg(icon, { width: 64, height: 48, strokeWidth: 0.2 });
```

Library options include color, interior fill, background, padding, alignment, rotation, flips, opacity, line ends and joins. Line width defaults to 0.2 and adjusts stroked paths; it does not convert filled silhouettes into centerline drawings. Full upstream notices are retained in exported SVG descriptions.

```ts
import { renderSvg } from "doodle-icon";
import { icons } from "doodle-icon/catalog";

const rocket = icons.find((icon) => icon.id === "rocket");
if (rocket) {
  const svg = renderSvg(rocket, {
    size: 64,
    iconStyle: "duotone",
    color: "#242833",
    accent: "#b9cdfa",
    partColors: { flame: "#c46742" },
    title: "Launch",
  });
}
```

The catalog is a separate entry point so rendering helpers do not import the artwork collection. Geometry inputs must be trusted `IconDefinition` objects from the maintained catalog; this API is not an arbitrary SVG sanitizer. Colors reject external resource references, and labels are XML escaped.

The `./collections` entry point contains 33 separate vector studies in eleven visual families, including scenes, characters, isometric constructions, wireframes, gradients and SVG glass materials. The 15,000-item library does not imply 500 assets in every subject-and-style combination. The website separately provides 500 editable wireframe OBJ surfaces.

```ts
import { collections } from "doodle-icon/collections";
import { renderCollectionSvg } from "doodle-icon/collections/render";

const family = collections.find((item) => item.id === "frosted-glass");
const artwork = family?.assets[0];
if (family && artwork) {
  const svg = renderCollectionSvg(artwork, {
    ...family,
    size: 512,
    primary: "#0642f5",
  });
}
```

`artwork.parts` lists editable parts. Options also support `ink`, `secondary`, `paper`, `strokeWidth`, `background`, and `partColors`. For repeated inline SVG instances, pass a unique third argument to `renderCollectionSvg` as the gradient ID prefix. Artwork geometry must come from a trusted definition; the serializer is not a sanitizer for untrusted SVG.

Retain the appropriate upstream copyright, license and attribution notices when redistributing artwork or source. Brand artwork can also be subject to trademark rights. No animation is included.
