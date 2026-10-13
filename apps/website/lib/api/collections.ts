import "server-only";
import { collections, collectionArtworks } from "doodle-icon/collections";
import { categories } from "doodle-icon/catalog";
import type { CollectionId, CollectionArtwork } from "doodle-icon/collections";
import type { CollectionSummary } from "@/types/collections";

export async function getCollections() {
  return {
    collections: collections.map(({ assets, ...collection }): CollectionSummary => ({
      ...collection,
      previewAssets: assets.slice(0, 3),
      assetCount: assets.length,
    })),
    subjects: categories,
    available: collectionArtworks.length,
    conceptsPerSubject: 500,
    subjectCount: categories.length,
  };
}

export async function getCollectionAssets(
  id: string,
): Promise<readonly CollectionArtwork[] | null> {
  const collection = collections.find((item) => item.id === id);
  return collection?.assets ?? null;
}

export function isCollectionId(id: string): id is CollectionId {
  return collections.some((collection) => collection.id === id);
}
