import { getCollectionAssets, isCollectionId } from "@/lib/api/collections";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  if (!isCollectionId(id)) {
    return Response.json({ error: "Collection not found." }, { status: 404 });
  }
  const assets = await getCollectionAssets(id);
  if (!assets) {
    return Response.json({ error: "Collection not found." }, { status: 404 });
  }
  return Response.json({ assets }, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
