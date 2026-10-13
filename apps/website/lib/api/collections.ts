import "server-only";
import { collections } from "doodle-icon/collections";
import { categories } from "doodle-icon/catalog";
export async function getCollections() {
  return {
    collections,
    subjects: categories,
    available: collections.reduce(
      (sum, collection) => sum + collection.assets.length,
      0,
    ),
    conceptsPerSubject: 500,
    subjectCount: categories.length,
  };
}
