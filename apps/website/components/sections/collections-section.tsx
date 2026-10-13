import Link from "next/link";
import { CollectionExplorer } from "./collection-explorer";
import type { getCollections } from "@/lib/api/collections";
export function CollectionsSection({
  data,
}: {
  data: Awaited<ReturnType<typeof getCollections>>;
}) {
  return (
    <div className="collections-page">
      <div className="collections-heading">
        <div>
          <p className="eyebrow">The visual collections</p>
          <h1>
            Icon <span>collections.</span>
          </h1>
          <p>
            Scenes, characters, materials and geometry. Explore every visual
            direction from the reference set.
          </p>
        </div>
        <div className="collection-progress">
          <strong>{data.collections.length} visual collections</strong>
          <span>{data.available} editable vector studies</span>
          <span>Original studio compositions with named, editable parts</span>
          <p>
            Browse 50 distinct product-ready illustrations in each visual
            collection, or explore the 15,000-icon library across 30 categories.
          </p>
        </div>
      </div>
      <CollectionExplorer
        collections={data.collections}
        subjects={data.subjects}
      />
      <div className="collection-footer">
        <p>
          Each study has editable vector paths, named parts and an independent
          palette. No animated assets.
        </p>
        <Link href="/">Browse all 15,000 icons →</Link>
      </div>
    </div>
  );
}
