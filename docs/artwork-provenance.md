# Artwork provenance

The main library contains 15,000 distinct vector drawings. 13,500 are curated from pinned, openly licensed Iconify source sets; each record retains the original name, source URL, source name, license and normalized geometry hash. The 15 sets and their creators are listed in `packages/core/THIRD_PARTY_NOTICES.md` and `packages/core/data/sources.json`. Full license notices are included in `packages/core/licenses/` and embedded in SVG exports. Game Icons notices retain the upstream contributor roster. Brand icons may also be subject to trademark rights.

The other 1,500 drawings were generated for this project from original mathematical geometry in `scripts/library-generative.ts`: 500 wireframe surfaces, 500 isometric compositions and 500 geometric studies. Their profiles and layouts differ geometrically; color and stroke changes do not count as distinct artwork. The wireframe category includes editable OBJ meshes in `apps/website/public/models/`.

The original 200 UI concepts in `packages/core/src/artwork` and the 33 studio studies in `packages/core/src/collections` were authored as AI-assisted vector geometry for this project on 2026-10-13, under MIT. These are separate from the main 15,000 count. SVG glass studies use gradients and transparency; they are not native 3D material scenes.

User-supplied images guided topic and visual direction. Their pixels and watermarked source sheets were not copied into the catalog. Imported artwork comes from the explicitly attributed upstream sets, not from those reference images.

Future contributions must preserve creator, source, license and stable identity. Imported assets cannot be relabeled as original MIT artwork. The renderer customizes colors, strokes and transforms; original source attribution remains attached to the export.
