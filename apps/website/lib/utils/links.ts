export function catalogLink(category: string, query = "", page = 1): string {
  const params = new URLSearchParams();
  if (category !== "all") params.set("category", category);
  if (query) params.set("q", query);
  if (page > 1) params.set("page", String(page));
  const search = params.toString();
  return search ? `/?${search}` : "/";
}
export const componentName = (id: string): string =>
  id
    .split("-")
    .map((part) => (part[0]?.toUpperCase() ?? "") + part.slice(1))
    .join("") + "Icon";
