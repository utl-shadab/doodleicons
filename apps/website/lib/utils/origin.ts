export function siteOrigin(): URL {
  const fallback = new URL("http://localhost:3000");
  const value = process.env.SITE_URL;
  if (!value) return fallback;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? new URL(url.origin)
      : fallback;
  } catch {
    return fallback;
  }
}
