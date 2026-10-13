import type { Metadata } from "next";
import { getLibrarySources } from "@/lib/api/library";
import { LicensesSection } from "@/components/sections/licenses-section";
export const metadata: Metadata = { title: "Sources & licenses" };
export default async function Page() {
  const sources = await getLibrarySources();
  return <LicensesSection sources={sources} />;
}
