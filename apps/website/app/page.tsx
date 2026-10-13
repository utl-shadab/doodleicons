import { getLibrary } from "@/lib/api/library";
import { CatalogSection } from "@/components/sections/catalog-section";
import type { LibraryQuery } from "@/types/library";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<LibraryQuery>;
}) {
  const data = await getLibrary(await searchParams);
  return <CatalogSection data={data} />;
}
