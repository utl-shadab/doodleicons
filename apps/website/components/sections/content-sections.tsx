import Link from "next/link";
import {
  HeartIcon,
  ArrowRightIcon,
  CopyIcon,
} from "doodle-icon-react";
import type { getProjectInfo } from "@/lib/api/content";
type ProjectInfo = Awaited<ReturnType<typeof getProjectInfo>>;
export function DocsSection({ project }: { project: ProjectInfo }) {
  return (
    <article className="content-page">
      <p className="eyebrow">For developers</p>
      <h1>
        A small import.
        <br />A lot of personality.
      </h1>
      <p className="content-lede">
        {project.count.toLocaleString("en-US")} static icon artworks. Strict
        TypeScript, individual imports, and no animation runtime. Built for
        React and Next.js.
      </p>
      <h2>Install the local packages</h2>
      <p>
        Version 0.1.0 is prepared locally. Public npm installation becomes
        available after the owner publishes the packages. Install both generated
        tarballs in your React project now:
      </p>
      <pre>
        <code>
          {
            "npm install /path/to/doodle-icon-0.1.0.tgz \\\n  /path/to/doodle-icon-react-0.1.0.tgz"
          }
        </code>
      </pre>
      <p>After publication, the standard command will be:</p>
      <pre>
        <code>npm install doodle-icon-react</code>
      </pre>
      <h2>Make your first import</h2>
      <pre>
        <code>{`import { LibraryIcon } from 'doodle-icon-react/library';\nimport icon from 'doodle-icon/assets/tabler-cat';\n\n<LibraryIcon icon={icon} options={{\n  width: 64, height: 48, color: '#002fa7',\n  background: 'none', padding: 10, strokeWidth: 0.2\n}} />`}</code>
      </pre>
      <p>
        The library has 30 categories of 500 artworks, including 500 brand
        marks, 500 parametric 3D wireframes, 500 isometric compositions, and 500
        geometric studies. Each asset is individually importable. Source
        licenses stay with the artwork.
      </p>
      <h2>Original UI components</h2>
      <pre>
        <code>{`import { RocketIcon } from 'doodle-icon-react/icons/rocket';\n\nexport function Launch() {\n  return (\n    <RocketIcon\n      size={40}\n      iconStyle="duotone"\n      color="#242833"\n      accent="#b9cdfa"\n      strokeWidth={1.6}\n      partColors={{ flame: '#c46742', window: '#002fa7' }}\n      aria-label="Launch"\n    />\n  );\n}`}</code>
      </pre>
      <p>
        Named imports from the package root also work. Individual entry points
        give bundlers a direct path to just the icon you need. The static
        components support server rendering and have no client directive.
      </p>
      <h2>Customization</h2>
      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type / supported values</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["size", "number · 8–2048", "32"],
            ["width / height", "number · aspect ratio preserved", "size"],
            ["iconStyle", "doodle · outline · duotone · soft", "doodle"],
            ["color", "SVG color, currentColor, CSS variable", "currentColor"],
            ["accent", "Secondary surface color", "#b9cdfa"],
            ["fill", "SVG color or none", "none"],
            ["strokeWidth", "number · 0.1–3", "1.6"],
            ["strokeLinecap", "round · butt · square", "round"],
            ["strokeLinejoin", "round · miter · bevel", "round"],
            ["strokeStyle", "solid · dashed · dotted", "solid"],
            ["opacity", "number · 0–1", "1"],
            ["rotation", "number · −360–360 degrees", "0"],
            ["flipX / flipY", "boolean", "false"],
            ["partColors", "Typed colors for that icon’s named parts", "{}"],
            ["className / style", "React SVG styling", "—"],
            ["title / aria-label", "Accessible text", "decorative"],
          ].map((row) => (
            <tr key={row[0]}>
              {row.map((value) => (
                <td key={value}>
                  <code>{value}</code>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Accessibility and Next.js</h2>
      <p>
        Icons without a label are decorative and hidden from screen readers.
        Give meaningful icons a title or aria-label. Label the button itself
        when an icon sits inside an interactive control. Static icons work in
        Server Components; add a client boundary only for your own interactions.
      </p>
      <h2>Customization limits</h2>
      <p>
        Accent fills apply to authored surfaces in Duotone and to the background
        shape in Soft. Part colors affect that part’s outline and supported
        fills. The original 200 UI components use the API below. The expanded
        library uses LibraryIcon with width, height, color, fill, background,
        strokeWidth, linecap, linejoin, roundedness, padding, alignX, alignY,
        rotation, flipX, flipY, and opacity inside its options object. Line
        width changes stroked paths; canvas roundedness changes the background.
        The wireframe set also offers OBJ meshes. Isometric artwork is 2.5D SVG.
      </p>
      <h2>License</h2>
      <p>
        The source code and original artwork use the MIT license. Commercial
        use, modification, and redistribution are permitted with the copyright
        and license notice retained. Imported sets retain their source licenses;
        see <Link href="/licenses">Sources & licenses</Link>. Donations are
        optional.
      </p>
      <div className="inline-actions">
        <Link className="button primary" href="/">
          Explore the icons <ArrowRightIcon size={16} />
        </Link>
        <Link className="button" href="/figma">
          Use in Figma
        </Link>
      </div>
    </article>
  );
}
export function FigmaSection({ project }: { project: ProjectInfo }) {
  return (
    <article className="content-page">
      <p className="eyebrow">For designers</p>
      <h1>
        Your canvas.
        <br />
        Our little characters.
      </h1>
      <p className="content-lede">
        Bring {project.count.toLocaleString("en-US")} icon artworks into Figma
        as editable vectors. Use the local plugin to insert individual icons or
        reusable components.
      </p>
      <h2>Copy an SVG straight into Figma</h2>
      <ol>
        <li>
          Choose an icon in the library and set its colors, stroke, and style.
        </li>
        <li>
          Select <strong>Copy SVG for Figma</strong>.
        </li>
        <li>
          Paste onto your Figma canvas. If your browser does not preserve SVG
          clipboard data, download the SVG and drag the file onto the canvas.
        </li>
      </ol>
      <Link className="button primary" href="/">
        <CopyIcon size={16} />
        Find an icon
      </Link>
      <h2>Install the development plugin</h2>
      <p>
        The offline plugin is included in this project. A public Figma Community
        listing is not yet published.
      </p>
      <ol>
        <li>
          Run <code>npm install</code>, then <code>npm run build:figma</code> in
          the project.
        </li>
        <li>
          In Figma Desktop, create a plugin for development. Keep the plugin ID
          assigned by Figma.
        </li>
        <li>
          Set that ID as <code>figmaPluginId</code> in{" "}
          <code>release.config.json</code>, then rebuild.
        </li>
        <li>
          Import <code>apps/figma-plugin/dist/manifest.json</code> from Figma’s
          Development menu.
        </li>
        <li>
          Search, select a style and color, then insert a vector or a reusable
          component. Select several icons for a batch.
        </li>
      </ol>
      <h2>Works without a network connection</h2>
      <p>
        The catalog and renderer are bundled inside the plugin. Icons are
        generated from trusted geometry in the package. It does not request
        access to external domains, accept arbitrary SVG input, or upload your
        design.
      </p>
      <h2>Built to stay editable</h2>
      <p>
        Named vector parts retain their editable paths. The plugin can create
        native Figma components with predictable category and style names.
        Colors and strokes become editable SVG properties; source artwork
        remains versioned alongside the React package.
      </p>
      <p className="license-note">
        Gradient, glass, and true 3D families remain planned artwork work. This
        version includes Doodle, Outline, Duotone, and Soft.
      </p>
    </article>
  );
}
export function SupportSection({ project }: { project: ProjectInfo }) {
  return (
    <article className="content-page">
      <HeartIcon size={58} iconStyle="soft" color="#002fa7" />
      <p className="eyebrow" style={{ marginTop: 28 }}>
        Community supported
      </p>
      <h1>
        Free to use.
        <br />
        Worth caring about.
      </h1>
      <p className="content-lede">
        DoodleIcons is open source. Every icon in this release is available
        under the MIT license, for personal and commercial work.
      </p>
      <h2>Support the work</h2>
      <p>
        Optional donations help fund new artwork, accessibility reviews, and
        maintenance. They do not unlock icons or change your license.
      </p>
      {project.donationUrl ? (
        <a
          href={project.donationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button primary"
        >
          <HeartIcon size={17} />
          Donate to DoodleIcons
        </a>
      ) : (
        <p>
          A donation link has not been added yet. You can support the project by
          sharing it, reporting an issue, or contributing.
        </p>
      )}
      <h2>Built in the open</h2>
      <p>
        The current catalog contains {project.count} original concepts across{" "}
        {project.categoryCount} categories, each with four supported vector
        treatments. The longer-term target is 500 concepts per category across
        eleven authored visual collections. That expanded artwork is still in
        development.
      </p>
      <div className="inline-actions">
        <a
          href={project.github}
          className="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit the maintainer on GitHub <ArrowRightIcon size={16} />
        </a>
        <Link href="/" className="button">
          Explore the library
        </Link>
      </div>
    </article>
  );
}
