import type { Metadata } from "next";
import { getProjectInfo } from "@/lib/api/content";
import { DocsSection } from "@/components/sections/content-sections";
export const metadata: Metadata = { title: "React documentation" };
export default async function Page() {
  return <DocsSection project={await getProjectInfo()} />;
}
