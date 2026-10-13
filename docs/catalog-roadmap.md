# Catalog inventory and expansion

The current main library contains **30 categories with exactly 500 distinct vector drawings each: 15,000 total**. Category names and IDs live in `packages/core/src/library/categories.ts`; `artifacts/library/inventory.json` records the generated counts. Tests verify counts, globally unique geometry hashes, valid static SVGs, and successful rasterization.

Twenty-seven subject categories draw from attributed open-source sets. Three additional categories contain original mathematical artwork: 500 wireframe surfaces, 500 isometric compositions, and 500 geometric studies. Each wireframe has a downloadable OBJ surface with 625 vertices and 576 faces. These are distinct parameterized geometries, not 500 hand-drawn concepts.

Different source drawings of the same subject count as separate artworks. Recolors, output sizes, formats and line-weight changes do not add to the inventory. The 15,000 total is not a claim of 15,000 distinct subjects or every subject in every visual family.

The original 200 UI concepts with four treatments and the 33 studio studies in eleven families remain separately accessible. Extending those studio families to hundreds of individually authored illustrations is separate artwork work; their counts are not included in the main 15,000.

Run `npm run import:library` to regenerate the main catalog from pinned dependencies and the original generators. Keep stable IDs, source URLs, upstream notices and distinct geometry. Validate with `npm run check` before packaging. See `artwork-provenance.md` and `packages/core/THIRD_PARTY_NOTICES.md` for attribution.
