import { decompressSync, strFromU8 } from "fflate";
import packed from "doodleicons:library-data";
import type { LibraryIcon } from "doodle-icon/library";
const cache = new Map<string, readonly LibraryIcon[]>();
const ids = new Map<string, LibraryIcon>();
function base64(value: string): Uint8Array {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const bytes = new Uint8Array(
    Math.floor((value.replace(/=+$/, "").length * 6) / 8),
  );
  let bits = 0,
    buffer = 0,
    index = 0;
  for (const character of value) {
    const code = alphabet.indexOf(character);
    if (code < 0) continue;
    buffer = (buffer << 6) | code;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      bytes[index++] = (buffer >> bits) & 255;
    }
  }
  return bytes;
}
export function getPluginLibrary(category: string): readonly LibraryIcon[] {
  if (category === "all") return Object.keys(packed).flatMap(getPluginLibrary);
  const cached = cache.get(category);
  if (cached) return cached;
  const data = packed[category];
  if (!data) return [];
  const icons = JSON.parse(
    strFromU8(decompressSync(base64(data))),
  ) as LibraryIcon[];
  cache.set(category, icons);
  for (const icon of icons) ids.set(icon.id, icon);
  return icons;
}
export function findPluginLibraryIcon(id: string): LibraryIcon | undefined {
  if (ids.has(id)) return ids.get(id);
  for (const category of Object.keys(packed)) {
    getPluginLibrary(category);
    if (ids.has(id)) return ids.get(id);
  }
  return undefined;
}
