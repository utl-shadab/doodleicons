# DoodleIcons for React

Customizable static SVG icons for React 18/19 and Next.js. Component code is MIT licensed; imported artwork retains its upstream license. No client directive, browser globals, animation runtime, or runtime network requests.

This is the **0.1.0 source release**: 15,000 drawings in 30 categories, with exactly 500 per category, plus the original 200 UI concepts and 33 studio studies. Public npm availability depends on the maintainer publishing this version.

```tsx
import { LibraryIcon } from "doodle-icon-react/library";
import icon from "doodle-icon/assets/tabler-cat";

<LibraryIcon
  icon={icon}
  options={{ width: 64, height: 48, strokeWidth: 0.2 }}
/>;
```

Individual asset imports avoid bundling the entire library. `LibraryIcon` supports colors, interior fill, background, canvas corners, padding, alignment, line ends and joins, rotation, flips and opacity. Its default line width is 0.2. Filled silhouettes retain their filled geometry. The table below describes the separate original named-component API.

After publication:

```sh
npm install doodle-icon-react
```

Before publication, install both generated core and React tarballs from `artifacts/packages` in the source repository.

```tsx
import { RocketIcon } from "doodle-icon-react/icons/rocket";

export function LaunchButton() {
  return (
    <button aria-label="Launch project">
      <RocketIcon
        size={32}
        iconStyle="duotone"
        color="currentColor"
        accent="#b9cdfa"
        strokeWidth={1.6}
        partColors={{ flame: "#c46742", window: "#002fa7" }}
      />
    </button>
  );
}
```

Root named imports also work: `import { RocketIcon, HeartIcon } from 'doodle-icon-react'`. ES modules and `sideEffects: false` support tree shaking; direct icon imports are available for each kebab-case icon ID.

## Supported properties

| Property                                 | Values                                                             |
| ---------------------------------------- | ------------------------------------------------------------------ |
| `size`, `width`, `height`                | 8–2048; default 32; aspect ratio preserved                         |
| `iconStyle`                              | `doodle`, `outline`, `duotone`, `soft`                             |
| `color`, `accent`, `fill`                | SVG colors, `currentColor`, CSS variables; fill defaults to `none` |
| `strokeWidth`                            | 0.1–3; default 1.6                                                 |
| `strokeLinecap`                          | `round`, `butt`, `square`                                          |
| `strokeLinejoin`                         | `round`, `miter`, `bevel`                                          |
| `strokeStyle`                            | `solid`, `dashed`, `dotted`                                        |
| `opacity`, `rotation`                    | 0–1 and degrees                                                    |
| `flipX`, `flipY`                         | Boolean                                                            |
| `partColors`                             | Icon-specific, typed semantic part names                           |
| `className`, `style`                     | Standard React SVG styling                                         |
| `title`, `aria-label`, `aria-labelledby` | Accessible name                                                    |

Icons are decorative by default. Set a meaningful accessible name when the icon itself conveys information. Label the surrounding control when the icon appears in a button. SVG geometry is intentionally protected from `children` and `dangerouslySetInnerHTML` props.

The rendered drawing has a protective inset inside a 32-unit viewBox; displayed stroke thickness scales with the drawing. Rotation fits the icon inside that viewBox. Accent support depends on the chosen treatment and authored surfaces. Part names differ by icon and are checked by TypeScript.

## Detailed vector collections

The separate `Illustration` entry point renders 33 original vector studies in eleven visual families: duotone scenes, soft accent, character doodle, editorial doodle, character scenes, color isometric, gradient dimensional, frosted glass, technical wireframe, monochrome isometric, and glossy glass. These are artwork studies awaiting review; no family has reached the requested 500 icons per subject.

```tsx
import { Illustration } from "doodle-icon-react/illustration";
import { collectionArtworks } from "doodle-icon/collections";

const artwork = collectionArtworks.find(
  (item) => item.id === "color-isometric-secure-vault",
);

export function VaultIllustration() {
  return artwork ? (
    <Illustration
      artwork={artwork}
      idPrefix="vault-feature"
      options={{
        size: 160,
        ink: "#141a16",
        primary: "#84c65b",
        secondary: "#bae3e4",
      }}
    />
  ) : null;
}
```

Pass a unique `idPrefix` for each instance in a document to prevent SVG gradient collisions. `options` supports size, outline color (`ink`), primary and secondary colors, surface color (`paper`), stroke weight, background, and semantic `partColors`. `artwork.parts` lists the authored part names. On a server-rendered website, select the required artwork in the data layer and pass just that definition to the component.

Glass and dimensional studies are editable SVG compositions. Native 3D models, physical material controls, and animation are not included. All artwork is static.
