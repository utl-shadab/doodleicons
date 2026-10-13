import type { Metadata } from "next";
import { getCollections } from "@/lib/api/collections";
import { CollectionsSection } from "@/components/sections/collections-section";
export const metadata: Metadata = {
  title: "Visual collections",
  description:
    "Explore editable doodle scenes, characters, isometric, gradient, glass and wireframe icon artwork.",
};
export default async function CollectionsPage() {
  const data = await getCollections();
  return <CollectionsSection data={data} />;
}
