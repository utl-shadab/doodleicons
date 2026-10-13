import type { Metadata } from "next";
import { getProjectInfo } from "@/lib/api/content";
import { FigmaSection } from "@/components/sections/content-sections";
export const metadata: Metadata = { title: "Use in Figma" };
export default async function Page() {
  return <FigmaSection project={await getProjectInfo()} />;
}
