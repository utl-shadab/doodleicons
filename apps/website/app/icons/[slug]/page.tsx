import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIcon, getAllIconIds } from "@/lib/api/catalog";
import { IconDetailSection } from "@/components/sections/icon-detail-section";
export async function generateStaticParams() {
  return (await getAllIconIds()).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const icon = await getIcon((await params).slug);
  return {
    title: icon ? `${icon.name} icon` : "Icon not found",
    description: icon
      ? `Customize the ${icon.name} static SVG icon for React and Figma. MIT licensed.`
      : "Icon not found",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const icon = await getIcon((await params).slug);
  if (!icon) notFound();
  return <IconDetailSection icon={icon} />;
}
