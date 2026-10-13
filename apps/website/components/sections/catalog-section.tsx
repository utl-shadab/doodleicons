import Link from "next/link";
import type { LibraryData } from "@/types/library";
import { CatalogExplorer } from "./catalog-explorer";
export function CatalogSection({ data }: { data: LibraryData }) {
  return (
    <section className="catalog-page" aria-labelledby="catalog-heading">
      <div className="catalog-hero">
        <div>
          <p className="catalog-eyebrow">THE DOODLEICONS LIBRARY</p>
          <h1 id="catalog-heading">Every idea has an icon.</h1>
          <p>
            Find your shape. Make it yours. Editable vectors for the things you
            build.
          </p>
        </div>
        <div className="catalog-stats">
          <div>
            <strong>{data.total.toLocaleString("en-US")}</strong>
            <span>icon artworks</span>
          </div>
          <div>
            <strong>{data.categories.length}</strong>
            <span>categories · 500 each</span>
          </div>
        </div>
      </div>
      <div className="catalog-collection-link">
        <span>Looking for illustrated scenes, doodles, or glass?</span>
        <Link href="/collections">
          Explore 11 studio collections <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <CatalogExplorer data={data} />
      <p className="catalog-attribution">
        Original artwork and attributed open-source sets. Counts represent
        distinct vector drawings, including different source styles of the same
        subject. <Link href="/licenses">Sources & licenses</Link>
      </p>
    </section>
  );
}
