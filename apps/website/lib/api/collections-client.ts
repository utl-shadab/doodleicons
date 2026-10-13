import type { CollectionArtwork, CollectionId } from "doodle-icon/collections";

interface CollectionAssetsResponse {
  assets: readonly CollectionArtwork[];
}

export async function fetchCollectionAssets(
  id: CollectionId,
): Promise<readonly CollectionArtwork[]> {
  const response = await fetch(`/api/collections/${encodeURIComponent(id)}`);
  if (!response.ok) throw new Error(`Unable to load ${id} artwork.`);
  const result = (await response.json()) as CollectionAssetsResponse;
  return result.assets;
}
