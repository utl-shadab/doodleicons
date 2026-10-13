import type { ArtworkCollection, CollectionArtwork } from "doodle-icon/collections";

export interface CollectionSummary
  extends Omit<ArtworkCollection, "assets"> {
  previewAssets: readonly CollectionArtwork[];
  assetCount: number;
}
