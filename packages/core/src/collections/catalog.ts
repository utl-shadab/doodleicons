import type { CategoryId } from "../types.js";
import * as scene from "./scenes.js";
import * as dimensional from "./dimensional.js";
import * as wire from "./wireframes.js";
import { createPremiumProductStudies } from "./popular-product-art.js";
import type {
  ArtworkCollection,
  CollectionArtwork,
  CollectionId,
  VectorNode,
} from "./types.js";
const topicMap: Record<string, CategoryId> = {
  "Identity & security": "technology",
  "Cloud & technology": "technology",
  "Travel & environment": "travel",
  "Communication & social": "communication",
  "Media & creative": "creative",
  "Health & lifestyle": "health",
  "Interface & navigation": "interface",
  "Business & growth": "commerce",
  "Commerce & finance": "commerce",
  "AI & technology": "technology",
  "Search & discovery": "interface",
  "Actions & status": "actions",
  "Files & productivity": "productivity",
  "Shapes & expression": "expressive",
};
type Entry = readonly [
  id: string,
  name: string,
  subject: string,
  nodes: readonly VectorNode[],
];
function makeAssets(
  collection: CollectionId,
  entries: readonly Entry[],
): CollectionArtwork[] {
  return entries.map(([id, name, subject, nodes]) => {
    const category = topicMap[subject];
    if (!category) throw new Error(`Missing primary category for ${subject}`);
    const parts = new Set<string>();
    const walk = (items: readonly VectorNode[]) => {
      for (const item of items) {
        if (item.part) parts.add(item.part);
        if (item.children) walk(item.children);
      }
    };
    walk(nodes);
    return {
      id: `${collection}-${id}`,
      name,
      subject,
      category,
      collection,
      nodes,
      parts: [...parts],
      description: `${name}, original editable vector artwork in the ${collection} collection.`,
    };
  });
}
function makeCollectionAssets(
  collection: CollectionId,
  entries: readonly Entry[],
  rotation: number,
): CollectionArtwork[] {
  return [
    ...makeAssets(collection, entries),
    ...createPremiumProductStudies(collection, rotation, 47),
  ];
}
export const collections: readonly ArtworkCollection[] = [
  {
    id: "duotone-scenes",
    name: "Duotone scenes",
    description:
      "Layered objects, ink shadows, orbit lines and two-color surfaces.",
    referenceImages: [1, 2],
    background: "#eef5ff",
    ink: "#123b8e",
    primary: "#2c5ed5",
    secondary: "#c0dafa",
    assets: makeCollectionAssets(
      "duotone-scenes",
      [
        [
          "verified-capture",
          "Verified capture",
          "Media & creative",
          scene.captureScene,
        ],
        [
          "connected-devices",
          "Connected devices",
          "Cloud & technology",
          scene.connectedScene,
        ],
        [
          "identity-scan",
          "Identity scan",
          "Identity & security",
          scene.identityScene,
        ],
      ],
      0,
    ),
  },
  {
    id: "soft-outline",
    name: "Soft accent",
    description: "Rounded contours on organic pastel backdrops.",
    referenceImages: [3],
    background: "#ffffff",
    ink: "#111111",
    primary: "#f7b8c9",
    secondary: "#fbe2e9",
    assets: makeCollectionAssets(
      "soft-outline",
      [
        ["access-key", "Access key", "Identity & security", scene.softKey],
        ["shelter", "Shelter", "Travel & environment", scene.softUmbrella],
        [
          "new-message",
          "New message",
          "Communication & social",
          scene.softMail,
        ],
      ],
      1,
    ),
  },
  {
    id: "character-doodle",
    name: "Character doodle",
    description: "Expressive faces, loose limbs and playful object characters.",
    referenceImages: [4],
    background: "#f4f1e8",
    ink: "#171714",
    primary: "#171714",
    secondary: "#e4dfd1",
    assets: makeCollectionAssets(
      "character-doodle",
      [
        [
          "curious-world",
          "Curious world",
          "Travel & environment",
          scene.characterGlobe,
        ],
        [
          "happy-stride",
          "Happy stride",
          "Health & lifestyle",
          scene.characterRunner,
        ],
        [
          "friendly-browser",
          "Friendly browser",
          "Interface & navigation",
          scene.characterBrowser,
        ],
      ],
      2,
    ),
  },
  {
    id: "editorial-doodle",
    name: "Editorial doodle",
    description:
      "Detailed monochrome compositions, bold ink areas and small accents.",
    referenceImages: [5],
    background: "#f7f7f8",
    ink: "#141414",
    primary: "#141414",
    secondary: "#e0e0e0",
    assets: makeCollectionAssets(
      "editorial-doodle",
      [
        ["lift-off", "Lift off", "Business & growth", scene.editorialLaunch],
        [
          "growth-report",
          "Growth report",
          "Commerce & finance",
          scene.editorialAnalytics,
        ],
        [
          "creative-mind",
          "Creative mind",
          "AI & technology",
          scene.editorialIdea,
        ],
      ],
      3,
    ),
  },
  {
    id: "character-scenes",
    name: "Character scenes",
    description:
      "People, products and interface states in small narrative scenes.",
    referenceImages: [6],
    background: "#eef2f8",
    ink: "#30313b",
    primary: "#5264ee",
    secondary: "#cbd3e4",
    assets: makeCollectionAssets(
      "character-scenes",
      [
        [
          "finding-answers",
          "Finding answers",
          "Search & discovery",
          scene.searchPerson,
        ],
        [
          "connection-lost",
          "Connection lost",
          "Actions & status",
          scene.offlinePerson,
        ],
        [
          "work-approved",
          "Work approved",
          "Files & productivity",
          scene.successPerson,
        ],
      ],
      4,
    ),
  },
  {
    id: "color-isometric",
    name: "Color isometric",
    description:
      "Constructed volumes with distinct top, side and front surfaces.",
    referenceImages: [7],
    background: "#f0f2ef",
    ink: "#141a16",
    primary: "#84c65b",
    secondary: "#bae3e4",
    assets: makeCollectionAssets(
      "color-isometric",
      [
        [
          "secure-vault",
          "Secure vault",
          "Commerce & finance",
          dimensional.isometricVault,
        ],
        [
          "protected-value",
          "Protected value",
          "Identity & security",
          dimensional.isometricDiamond,
        ],
        [
          "growth-modules",
          "Growth modules",
          "Business & growth",
          dimensional.isometricGrowth,
        ],
      ],
      5,
    ),
  },
  {
    id: "gradient-dimensional",
    name: "Gradient dimensional",
    description:
      "Luminous volumes, fine outlines and architectural abstract forms.",
    referenceImages: [8, 9, 15],
    background: "#f4f1fd",
    ink: "#484dca",
    primary: "#5055f8",
    secondary: "#c6c8fb",
    assets: makeCollectionAssets(
      "gradient-dimensional",
      [
        [
          "orbital-system",
          "Orbital system",
          "AI & technology",
          dimensional.gradientOrbit,
        ],
        [
          "layered-system",
          "Layered system",
          "Shapes & expression",
          dimensional.gradientLayers,
        ],
        [
          "continuous-cycle",
          "Continuous cycle",
          "Actions & status",
          dimensional.gradientCycle,
        ],
      ],
      6,
    ),
  },
  {
    id: "frosted-glass",
    name: "Frosted glass",
    description: "Translucent front panels over saturated, offset silhouettes.",
    referenceImages: [10],
    background: "#ffffff",
    ink: "#1246d8",
    primary: "#0642f5",
    secondary: "#aabffc",
    assets: makeCollectionAssets(
      "frosted-glass",
      [
        [
          "glass-folder",
          "Glass folder",
          "Files & productivity",
          dimensional.frostedFolder,
        ],
        [
          "glass-lock",
          "Glass lock",
          "Identity & security",
          dimensional.frostedLock,
        ],
        [
          "glass-location",
          "Glass location",
          "Travel & environment",
          dimensional.frostedLocation,
        ],
      ],
      7,
    ),
  },
  {
    id: "technical-wireframe",
    name: "Technical wireframe",
    description:
      "Mathematical surfaces drawn as fine, precise vector linework.",
    referenceImages: [11],
    background: "#191a1d",
    ink: "#e8e9ee",
    primary: "#cfd2e4",
    secondary: "#9094a0",
    assets: makeCollectionAssets(
      "technical-wireframe",
      [
        [
          "spherical-grid",
          "Spherical grid",
          "Shapes & expression",
          wire.wireSphere,
        ],
        [
          "toroidal-surface",
          "Toroidal surface",
          "Shapes & expression",
          wire.wireTorus,
        ],
        ["wave-field", "Wave field", "AI & technology", wire.wireWave],
      ],
      8,
    ),
  },
  {
    id: "monochrome-isometric",
    name: "Monochrome isometric",
    description:
      "Thin construction lines, raised planes and hard black shadows.",
    referenceImages: [12],
    background: "#f0f0f0",
    ink: "#111111",
    primary: "#111111",
    secondary: "#cccccc",
    assets: makeCollectionAssets(
      "monochrome-isometric",
      [
        [
          "elevated-layers",
          "Elevated layers",
          "Shapes & expression",
          dimensional.monoLayers,
        ],
        [
          "modular-structure",
          "Modular structure",
          "Cloud & technology",
          dimensional.monoModules,
        ],
        [
          "archive-cabinet",
          "Archive cabinet",
          "Files & productivity",
          dimensional.monoArchive,
        ],
      ],
      9,
    ),
  },
  {
    id: "glossy-glass",
    name: "Glossy glass",
    description:
      "Beveled edges, luminous rims and layered dimensional surfaces.",
    referenceImages: [13, 14],
    background: "#eef7fd",
    ink: "#2254ac",
    primary: "#1689ed",
    secondary: "#b9e6fc",
    sourceNote:
      "These are editable SVG material studies. Native 3D models and physically rendered glass are still required for the final 3D collection.",
    assets: makeCollectionAssets(
      "glossy-glass",
      [
        [
          "glass-shield",
          "Glass shield",
          "Identity & security",
          dimensional.glossyShield,
        ],
        [
          "glass-rocket",
          "Glass rocket",
          "Business & growth",
          dimensional.glossyRocket,
        ],
        [
          "glass-growth",
          "Glass growth",
          "Commerce & finance",
          dimensional.glossyGrowth,
        ],
      ],
      10,
    ),
  },
];
export const collectionArtworks: readonly CollectionArtwork[] =
  collections.flatMap((collection) => collection.assets);
