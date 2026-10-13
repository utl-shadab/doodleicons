import type { LibrarySource } from "doodle-icon/library";
export function LicensesSection({
  sources,
}: {
  sources: readonly LibrarySource[];
}) {
  return (
    <article className="content-page">
      <p className="catalog-eyebrow">OPEN SOURCE, WITH CREDIT</p>
      <h1>Sources & licenses</h1>
      <p>
        DoodleIcons combines original studio artwork with attributed open-source
        icon sets. Each drawing keeps its source license, which is included in
        SVG exports. Different drawings of the same subject are separate
        artworks.
      </p>
      <table className="license-table">
        <thead>
          <tr>
            <th scope="col">Collection</th>
            <th scope="col">Creator</th>
            <th scope="col">License</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => (
            <tr key={source.id}>
              <td>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.name}
                </a>
              </td>
              <td>{source.author}</td>
              <td>
                <a href={source.licenseUrl} target="_blank" rel="noreferrer">
                  {source.license}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop: 24 }}>
        Brand marks belong to their owners. Their artwork licenses do not grant
        trademark rights or imply endorsement. The wireframe catalog includes
        original parametric 3D surfaces; isometric icons are editable 2.5D
        vectors.
      </p>
      <p style={{ marginTop: 16 }}>
        Poppins by Indian Type Foundry is self-hosted under the SIL Open Font
        License. Game Icons includes contributions from the{" "}
        <a href="https://game-icons.net/about.html#authors">
          Game Icons artists
        </a>
        .
      </p>
    </article>
  );
}
