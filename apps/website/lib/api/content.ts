import "server-only";
import { getLibrary } from "./library";
export async function getProjectInfo() {
  const library = await getLibrary({});
  return {
    count: library.total,
    categoryCount: library.categories.length,
    scope: "doodle-icon-react",
    github: "https://github.com/utl-shadab/doodleicons",
    donationUrl: getDonationUrl(),
  };
}
function getDonationUrl(): string | null {
  const value = process.env.DONATION_URL;
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}
