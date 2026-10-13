import type { Metadata } from "next";
import { getProjectInfo } from "@/lib/api/content";
import { SupportSection } from "@/components/sections/content-sections";
export const metadata: Metadata = { title: "Support the project" };
export default async function Page() {
  return <SupportSection project={await getProjectInfo()} />;
}
