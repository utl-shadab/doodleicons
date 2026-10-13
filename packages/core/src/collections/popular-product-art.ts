import type { CategoryId } from "../types.js";
import {
  circle,
  ellipse,
  group,
  node,
  path as vectorPath,
  rect,
} from "./primitives.js";
import type { CollectionId, CollectionArtwork, VectorNode } from "./types.js";

type Motif =
  | "commerce"
  | "analytics"
  | "assistant"
  | "payment"
  | "shield"
  | "biometric"
  | "team"
  | "calendar"
  | "mail"
  | "meeting"
  | "cloud"
  | "files"
  | "database"
  | "launch"
  | "subscription"
  | "cart"
  | "gift"
  | "delivery"
  | "map"
  | "booking"
  | "health"
  | "wellness"
  | "course"
  | "graduate"
  | "workflow"
  | "invoice"
  | "wallet"
  | "bank"
  | "growth"
  | "investment"
  | "search"
  | "notification"
  | "settings"
  | "developer"
  | "deploy"
  | "network"
  | "phone"
  | "workstation"
  | "camera"
  | "music"
  | "streaming"
  | "route"
  | "food"
  | "bag"
  | "privacy"
  | "passkey"
  | "fingerprint"
  | "support"
  | "review"
  | "sustainability";

interface ProductStudy {
  id: string;
  name: string;
  subject: string;
  category: CategoryId;
  motif: Motif;
}

export const productStudies: readonly ProductStudy[] = [
  {
    id: "checkout-flow",
    name: "Checkout flow",
    subject: "Commerce & finance",
    category: "commerce",
    motif: "commerce",
  },
  {
    id: "revenue-dashboard",
    name: "Revenue dashboard",
    subject: "Commerce & finance",
    category: "commerce",
    motif: "analytics",
  },
  {
    id: "ai-assistant",
    name: "AI assistant",
    subject: "AI & technology",
    category: "technology",
    motif: "assistant",
  },
  {
    id: "premium-card",
    name: "Premium card",
    subject: "Commerce & finance",
    category: "commerce",
    motif: "payment",
  },
  {
    id: "account-protection",
    name: "Account protection",
    subject: "Identity & security",
    category: "technology",
    motif: "shield",
  },
  {
    id: "face-verification",
    name: "Face verification",
    subject: "Identity & security",
    category: "technology",
    motif: "biometric",
  },
  {
    id: "team-workspace",
    name: "Team workspace",
    subject: "Communication & social",
    category: "communication",
    motif: "team",
  },
  {
    id: "editorial-calendar",
    name: "Editorial calendar",
    subject: "Files & productivity",
    category: "productivity",
    motif: "calendar",
  },
  {
    id: "inbox-zero",
    name: "Inbox zero",
    subject: "Communication & social",
    category: "communication",
    motif: "mail",
  },
  {
    id: "video-meeting",
    name: "Video meeting",
    subject: "Communication & social",
    category: "communication",
    motif: "meeting",
  },
  {
    id: "cloud-sync",
    name: "Cloud sync",
    subject: "Cloud & technology",
    category: "technology",
    motif: "cloud",
  },
  {
    id: "creative-library",
    name: "Creative library",
    subject: "Files & productivity",
    category: "productivity",
    motif: "files",
  },
  {
    id: "data-vault",
    name: "Data vault",
    subject: "Cloud & technology",
    category: "technology",
    motif: "database",
  },
  {
    id: "product-launch",
    name: "Product launch",
    subject: "Business & growth",
    category: "commerce",
    motif: "launch",
  },
  {
    id: "member-plan",
    name: "Member plan",
    subject: "Commerce & finance",
    category: "commerce",
    motif: "subscription",
  },
  {
    id: "smart-cart",
    name: "Smart cart",
    subject: "Commerce & finance",
    category: "commerce",
    motif: "cart",
  },
  {
    id: "gift-card",
    name: "Gift card",
    subject: "Commerce & finance",
    category: "commerce",
    motif: "gift",
  },
  {
    id: "express-delivery",
    name: "Express delivery",
    subject: "Commerce & finance",
    category: "commerce",
    motif: "delivery",
  },
  {
    id: "city-guide",
    name: "City guide",
    subject: "Travel & environment",
    category: "travel",
    motif: "map",
  },
  {
    id: "travel-booking",
    name: "Travel booking",
    subject: "Travel & environment",
    category: "travel",
    motif: "booking",
  },
  {
    id: "care-record",
    name: "Care record",
    subject: "Health & lifestyle",
    category: "health",
    motif: "health",
  },
  {
    id: "daily-wellness",
    name: "Daily wellness",
    subject: "Health & lifestyle",
    category: "health",
    motif: "wellness",
  },
  {
    id: "learning-path",
    name: "Learning path",
    subject: "Students & education",
    category: "productivity",
    motif: "course",
  },
  {
    id: "graduation-day",
    name: "Graduation day",
    subject: "Students & education",
    category: "expressive",
    motif: "graduate",
  },
  {
    id: "approval-workflow",
    name: "Approval workflow",
    subject: "Files & productivity",
    category: "productivity",
    motif: "workflow",
  },
  {
    id: "smart-invoice",
    name: "Smart invoice",
    subject: "Commerce & finance",
    category: "commerce",
    motif: "invoice",
  },
  {
    id: "digital-wallet",
    name: "Digital wallet",
    subject: "Commerce & finance",
    category: "commerce",
    motif: "wallet",
  },
  {
    id: "modern-banking",
    name: "Modern banking",
    subject: "Commerce & finance",
    category: "commerce",
    motif: "bank",
  },
  {
    id: "growth-insights",
    name: "Growth insights",
    subject: "Business & growth",
    category: "commerce",
    motif: "growth",
  },
  {
    id: "portfolio-value",
    name: "Portfolio value",
    subject: "Commerce & finance",
    category: "commerce",
    motif: "investment",
  },
  {
    id: "smart-discovery",
    name: "Smart discovery",
    subject: "Search & discovery",
    category: "interface",
    motif: "search",
  },
  {
    id: "priority-alert",
    name: "Priority alert",
    subject: "Actions & status",
    category: "actions",
    motif: "notification",
  },
  {
    id: "control-center",
    name: "Control center",
    subject: "Interface & navigation",
    category: "interface",
    motif: "settings",
  },
  {
    id: "developer-console",
    name: "Developer console",
    subject: "Development & engineering",
    category: "technology",
    motif: "developer",
  },
  {
    id: "release-pipeline",
    name: "Release pipeline",
    subject: "Development & engineering",
    category: "technology",
    motif: "deploy",
  },
  {
    id: "connected-network",
    name: "Connected network",
    subject: "Cloud & technology",
    category: "technology",
    motif: "network",
  },
  {
    id: "mobile-product",
    name: "Mobile product",
    subject: "Interface & navigation",
    category: "interface",
    motif: "phone",
  },
  {
    id: "studio-workstation",
    name: "Studio workstation",
    subject: "Media & creative",
    category: "creative",
    motif: "workstation",
  },
  {
    id: "campaign-camera",
    name: "Campaign camera",
    subject: "Media & creative",
    category: "creative",
    motif: "camera",
  },
  {
    id: "music-library",
    name: "Music library",
    subject: "Media & creative",
    category: "creative",
    motif: "music",
  },
  {
    id: "streaming-service",
    name: "Streaming service",
    subject: "Media & creative",
    category: "creative",
    motif: "streaming",
  },
  {
    id: "route-planner",
    name: "Route planner",
    subject: "Travel & environment",
    category: "travel",
    motif: "route",
  },
  {
    id: "food-order",
    name: "Food order",
    subject: "Commerce & finance",
    category: "commerce",
    motif: "food",
  },
  {
    id: "curated-shopping",
    name: "Curated shopping",
    subject: "Commerce & finance",
    category: "commerce",
    motif: "bag",
  },
  {
    id: "private-browsing",
    name: "Private browsing",
    subject: "Identity & security",
    category: "technology",
    motif: "privacy",
  },
  {
    id: "passkey-access",
    name: "Passkey access",
    subject: "Identity & security",
    category: "technology",
    motif: "passkey",
  },
  {
    id: "secure-fingerprint",
    name: "Secure fingerprint",
    subject: "Identity & security",
    category: "technology",
    motif: "fingerprint",
  },
  {
    id: "customer-care",
    name: "Customer care",
    subject: "Communication & social",
    category: "communication",
    motif: "support",
  },
  {
    id: "customer-review",
    name: "Customer review",
    subject: "Actions & status",
    category: "actions",
    motif: "review",
  },
  {
    id: "conscious-commerce",
    name: "Conscious commerce",
    subject: "Travel & environment",
    category: "travel",
    motif: "sustainability",
  },
];

function path(
  d: string,
  fill: string,
  part: string,
  attrsOrStroke?: VectorNode["attrs"] | string,
  width = 1,
): VectorNode {
  const attrs =
    typeof attrsOrStroke === "string"
      ? { stroke: attrsOrStroke, strokeWidth: width }
      : attrsOrStroke;
  return vectorPath(d, fill, part, attrs);
}

const p = (
  d: string,
  fill: string,
  part: string,
  stroke = "none",
  width = 1,
): VectorNode => path(d, fill, part, stroke, width);

function deviceFrame(index: number): VectorNode[] {
  const x = 48 + (index % 3) * 2;
  const y = 34 + (index % 2) * 2;
  const frame = rect(x, y, 64, 92, 9, "$ink", "device-frame", {
    stroke: "none",
  });
  const screen = rect(x + 4, y + 5, 56, 82, 6, "$paper", "device-screen", {
    stroke: "$secondary",
    strokeWidth: 0.8,
  });
  return [
    ellipse(80, 139, 46, 5, "$ink", "ground-shadow", {
      opacity: 0.1,
      stroke: "none",
    }),
    frame,
    screen,
    rect(x + 25, y + 2, 14, 1.8, 1, "$secondary", "speaker", {
      stroke: "none",
    }),
    circle(x + 32, y + 90, 1.7, "$secondary", "home-indicator", {
      stroke: "none",
    }),
  ];
}

function motifNodes(motif: Motif, index: number): VectorNode[] {
  const device = deviceFrame(index);
  const accent = (x: number, y: number, w: number, h: number, radius = 4) =>
    rect(x, y, w, h, radius, "$secondary", "accent-surface", {
      stroke: "none",
    });
  const check = (x: number, y: number) =>
    p(`M${x} ${y}l4 4 8-9`, "none", "verified-mark", "$paper", 2.3);
  if (motif === "cart")
    return [
      ellipse(80, 133, 45, 5, "$ink", "shadow", {
        opacity: 0.1,
        stroke: "none",
      }),
      path("M36 47h13l10 48h52l12-35H54", "none", "cart-frame", "$primary", 4),
      path("M62 65h52l-7 22H66Z", "$secondary", "cart-basket", {
        stroke: "$paper",
        strokeWidth: 1,
      }),
      circle(69, 108, 7, "$ink", "wheel"),
      circle(104, 108, 7, "$ink", "wheel"),
      rect(77, 70, 22, 4, 2, "$paper", "basket-detail", { stroke: "none" }),
      circle(115, 47, 11, "$primary", "cart-count"),
      path("M112 47h6m-3-3v6", "none", "cart-count-mark", {
        stroke: "$paper",
        strokeWidth: 1.4,
      }),
    ];
  if (motif === "bag")
    return [
      ellipse(80, 134, 43, 5, "$ink", "shadow", {
        opacity: 0.1,
        stroke: "none",
      }),
      rect(41, 59, 78, 66, 9, "$primary", "boutique-bag"),
      path("M60 62V48a20 20 0 0 1 40 0v14", "none", "bag-handle", "$paper", 3),
      path("M60 91q20-18 40 0", "none", "bag-seam", "$secondary", 1.2),
      path("M80 78c-8-10-19 2 0 18 19-16 8-28 0-18Z", "$paper", "bag-emblem"),
      circle(114, 47, 9, "$secondary", "quality-mark"),
      check(108, 47),
    ];
  if (motif === "growth")
    return [
      ellipse(80, 134, 47, 5, "$ink", "shadow", {
        opacity: 0.1,
        stroke: "none",
      }),
      rect(36, 38, 88, 82, 9, "$paper", "growth-panel", {
        stroke: "$secondary",
        strokeWidth: 1.2,
      }),
      path("M50 101 66 84l15 8 28-34", "none", "growth-curve", "$primary", 4),
      path("m98 58 11 0 0 11", "none", "growth-arrowhead", "$ink", 2),
      circle(66, 84, 4, "$paper", "growth-point", {
        stroke: "$primary",
        strokeWidth: 2,
      }),
      circle(81, 92, 4, "$paper", "growth-point", {
        stroke: "$primary",
        strokeWidth: 2,
      }),
      circle(109, 58, 4, "$paper", "growth-point", {
        stroke: "$primary",
        strokeWidth: 2,
      }),
      accent(50, 108, 60, 3),
    ];
  if (motif === "investment")
    return [
      ellipse(80, 135, 44, 5, "$ink", "shadow", {
        opacity: 0.1,
        stroke: "none",
      }),
      ...[0, 1, 2, 3].map((layer) =>
        group([
          ellipse(
            80,
            104 - layer * 17,
            33,
            10,
            layer % 2 ? "$secondary" : "$primary",
            "coin-edge",
            { stroke: "$paper", strokeWidth: 0.8 },
          ),
          path(
            `M47 ${104 - layer * 17}v-11m66 11V93`,
            "none",
            "coin-side",
            "$primary",
            1.1,
          ),
        ]),
      ),
      circle(80, 43, 15, "$paper", "investment-emblem", {
        stroke: "$primary",
        strokeWidth: 1.3,
      }),
      path(
        "M80 34v18m6-13q-1-5-7-5-7 0-7 5 0 4 8 6 7 2 7 6 0 5-8 5-6 0-7-5",
        "none",
        "currency-mark",
        "$ink",
        1.6,
      ),
    ];
  if (motif === "support")
    return [
      ellipse(80, 134, 40, 5, "$ink", "shadow", {
        opacity: 0.1,
        stroke: "none",
      }),
      path(
        "M43 83V70a37 37 0 0 1 74 0v13",
        "none",
        "headset-band",
        "$primary",
        8,
      ),
      rect(37, 72, 18, 34, 7, "$secondary", "ear-cup-left", {
        stroke: "$primary",
        strokeWidth: 1,
      }),
      rect(105, 72, 18, 34, 7, "$secondary", "ear-cup-right", {
        stroke: "$primary",
        strokeWidth: 1,
      }),
      path("M114 105q0 18-22 18H78", "none", "microphone-arm", "$ink", 2.2),
      circle(73, 123, 5, "$primary", "microphone"),
      circle(113, 49, 11, "$paper", "availability", {
        stroke: "$primary",
        strokeWidth: 1,
      }),
      circle(113, 49, 4, "$primary", "available", { stroke: "none" }),
    ];
  if (motif === "review")
    return [
      ellipse(80, 134, 43, 5, "$ink", "shadow", {
        opacity: 0.1,
        stroke: "none",
      }),
      rect(37, 48, 86, 68, 10, "$paper", "review-card", {
        stroke: "$secondary",
        strokeWidth: 1.2,
      }),
      path(
        "M80 59l7 14 15 2-11 10 3 15-14-7-14 7 3-15-11-10 15-2Z",
        "$primary",
        "review-star",
      ),
      ...[0, 1, 2, 3, 4].map((i) =>
        circle(61 + i * 10, 105, 2.5, "$secondary", "rating-dot", {
          stroke: "none",
        }),
      ),
      circle(110, 48, 10, "$primary", "review-count"),
      path("M107 48h6", "none", "review-count-mark", "$paper", 1.5),
    ];
  if (motif === "wallet")
    return [
      ellipse(80, 134, 45, 5, "$ink", "shadow", {
        opacity: 0.1,
        stroke: "none",
      }),
      path("M41 57q0-11 11-11h59q9 0 9 9v63H41Z", "$primary", "wallet"),
      path("M42 64h77v47H42Z", "$secondary", "wallet-fold", {
        stroke: "$paper",
        strokeWidth: 1,
      }),
      rect(84, 76, 43, 24, 6, "$paper", "wallet-pocket", {
        stroke: "$primary",
        strokeWidth: 1,
      }),
      circle(96, 88, 3, "$primary", "wallet-clasp"),
      accent(53, 77, 24, 4),
      accent(53, 88, 18, 3),
    ];
  if (motif === "bank")
    return [
      ellipse(80, 135, 48, 5, "$ink", "shadow", {
        opacity: 0.1,
        stroke: "none",
      }),
      path("M31 63 80 36l49 27Z", "$primary", "bank-roof"),
      path("M36 68h88v7H36Z", "$secondary", "bank-entablature", {
        stroke: "$paper",
        strokeWidth: 0.8,
      }),
      ...[0, 1, 2, 3].map((column) =>
        rect(43 + column * 20, 77, 11, 38, 3, "$paper", "bank-column", {
          stroke: "$primary",
          strokeWidth: 1.1,
        }),
      ),
      path("M34 119h92v8H34Z", "$primary", "bank-steps"),
      path("M55 96h50", "none", "bank-detail", "$secondary", 1),
    ];
  if (motif === "privacy")
    return [
      ellipse(80, 133, 42, 5, "$ink", "shadow", {
        opacity: 0.1,
        stroke: "none",
      }),
      path("M30 80q50-53 100 0-50 53-100 0Z", "$secondary", "privacy-eye", {
        stroke: "$primary",
        strokeWidth: 1.2,
      }),
      circle(80, 80, 19, "$paper", "eye-iris", {
        stroke: "$primary",
        strokeWidth: 1.3,
      }),
      circle(80, 80, 8, "$primary", "eye-pupil"),
      path("M48 112 112 48", "none", "privacy-slash", "$paper", 8),
      path("M48 112 112 48", "none", "privacy-slash-edge", "$primary", 1.2),
      circle(116, 48, 9, "$secondary", "privacy-status"),
    ];
  if (motif === "fingerprint")
    return [
      ellipse(80, 135, 40, 5, "$ink", "shadow", {
        opacity: 0.1,
        stroke: "none",
      }),
      circle(80, 77, 42, "$secondary", "fingerprint-field", {
        stroke: "$primary",
        strokeWidth: 1,
      }),
      path(
        "M80 47c-19 0-31 13-31 31m62 0c0-18-12-31-31-31M59 81c0-13 9-22 21-22s21 9 21 22c0 18-6 30-11 39M68 102c-2-7-3-13-3-20 0-10 6-16 15-16s15 6 15 16c0 14-4 26-8 34M80 83c0 19-2 30-6 37",
        "none",
        "fingerprint-lines",
        "$ink",
        2,
      ),
      circle(112, 48, 10, "$paper", "verified-badge", {
        stroke: "$primary",
        strokeWidth: 1,
      }),
      check(106, 48),
    ];
  if (motif === "workflow")
    return [
      ellipse(80, 134, 45, 5, "$ink", "shadow", {
        opacity: 0.1,
        stroke: "none",
      }),
      path("M50 52h56v25H50Zm0 53h56v25H50Z", "$paper", "workflow-steps", {
        stroke: "$secondary",
        strokeWidth: 1.1,
      }),
      circle(41, 64, 8, "$primary", "workflow-node"),
      circle(41, 117, 8, "$secondary", "workflow-node"),
      path(
        "M41 72v37m15-45h36m-36 53h36",
        "none",
        "workflow-connectors",
        "$ink",
        1.4,
      ),
      path("M72 64h15m-15 53h15", "none", "workflow-labels", "$primary", 2),
      circle(112, 90, 12, "$primary", "approval-badge"),
      check(106, 90),
    ];
  if (motif === "route")
    return [
      ellipse(80, 134, 44, 5, "$ink", "shadow", {
        opacity: 0.1,
        stroke: "none",
      }),
      path(
        "M39 53 66 44l28 10 27-10v63l-27 9-28-9-27 9Z",
        "$secondary",
        "route-map",
        { stroke: "$paper", strokeWidth: 1 },
      ),
      path("M66 44v63m28-53v62", "none", "map-fold-lines", "$primary", 1),
      path("M49 91q17-29 33-5t28-17", "none", "route-line", "$ink", 2.1),
      circle(49, 91, 4, "$paper", "route-start", {
        stroke: "$primary",
        strokeWidth: 1.4,
      }),
      path(
        "M110 47c-10 0-16 7-16 17 0 11 16 27 16 27s16-16 16-27c0-10-6-17-16-17Z",
        "$primary",
        "destination-pin",
      ),
      circle(110, 64, 4, "$paper", "pin-center", {
        stroke: "$secondary",
        strokeWidth: 1,
      }),
    ];
  if (motif === "booking")
    return [
      ellipse(80, 134, 43, 5, "$ink", "shadow", {
        opacity: 0.1,
        stroke: "none",
      }),
      path(
        "M40 58q0-10 10-10h60q10 0 10 10v54q0 10-10 10H50q-10 0-10-10Z",
        "$paper",
        "boarding-pass",
        { stroke: "$secondary", strokeWidth: 1.2 },
      ),
      path(
        "M40 76h80m-25-28v20m0 17v27",
        "none",
        "ticket-perforations",
        "$primary",
        1.2,
      ),
      path(
        "M73 92q13-10 27-2l-10 5 7 5-4 2-12-4-7 5-3-2 4-7-6-1Z",
        "$primary",
        "aircraft-mark",
      ),
      circle(54, 94, 6, "$secondary", "ticket-seal"),
      accent(48, 106, 19, 3),
    ];
  if (motif === "wellness")
    return [
      ellipse(80, 134, 42, 5, "$ink", "shadow", {
        opacity: 0.1,
        stroke: "none",
      }),
      path(
        "M80 42v63m-25-7q25-26 50 0M48 113q32-17 64 0",
        "none",
        "meditation-figure",
        "$primary",
        3,
      ),
      circle(80, 50, 13, "$secondary", "meditation-head"),
      path(
        "M80 78q-20 12-23 28m23-28q20 12 23 28m-23-16v30",
        "none",
        "meditation-limbs",
        "$ink",
        2,
      ),
      circle(80, 45, 31, "none", "calm-halo", {
        stroke: "$paper",
        strokeWidth: 1.1,
      }),
      path("M45 124h70", "none", "ground-line", "$secondary", 1),
    ];
  if (motif === "course")
    return [
      ellipse(80, 135, 43, 5, "$ink", "shadow", {
        opacity: 0.1,
        stroke: "none",
      }),
      path(
        "M38 50q22-9 42 4v63q-20-13-42-4Zm84 0q-22-9-42 4v63q20-13 42-4Z",
        "$paper",
        "open-book",
        { stroke: "$primary", strokeWidth: 1.2 },
      ),
      path(
        "M80 54v63m-31-51q12-3 22 3m-22 12q12-3 22 3m20-15q11-6 22-3m-22 15q11-6 22-3",
        "none",
        "book-lines",
        "$secondary",
        1.2,
      ),
      circle(113, 46, 11, "$primary", "lesson-status"),
      check(107, 46),
    ];
  switch (motif) {
    case "commerce":
      return [
        ellipse(80, 134, 41, 4, "$ink", "shadow", {
          opacity: 0.12,
          stroke: "none",
        }),
        p("M49 59h61l-6 67H55Z", "$primary", "shopping-bag"),
        p("M64 63V49a16 16 0 0 1 32 0v14", "none", "handle", "$paper", 3),
        accent(61, 79, 37, 5),
        accent(61, 91, 26, 4),
        circle(108, 49, 13, "$secondary", "offer-badge"),
        check(102, 49),
      ];
    case "analytics":
      return [
        rect(35, 42, 90, 78, 7, "$paper", "dashboard", {
          stroke: "$secondary",
          strokeWidth: 1.2,
        }),
        rect(35, 42, 90, 15, 7, "$primary", "dashboard-header", {
          stroke: "none",
        }),
        circle(45, 49, 1.5, "$paper", "window-dot", { stroke: "none" }),
        circle(51, 49, 1.5, "$paper", "window-dot", { stroke: "none" }),
        rect(49, 91, 10, 19, 3, "$secondary", "chart-bar", { stroke: "none" }),
        rect(66, 78, 10, 32, 3, "$primary", "chart-bar", { stroke: "none" }),
        rect(83, 65, 10, 45, 3, "$primary", "chart-bar", {
          opacity: 0.72,
          stroke: "none",
        }),
        rect(100, 72, 10, 38, 3, "$secondary", "chart-bar", { stroke: "none" }),
        p("M48 83l18-13 16 3 20-23", "none", "growth-line", "$ink", 1.8),
        p("M94 50h8v8", "none", "growth-arrow", "$ink", 1.8),
        ellipse(80, 130, 42, 4, "$ink", "shadow", {
          opacity: 0.09,
          stroke: "none",
        }),
      ];
    case "assistant":
      return [
        ellipse(80, 135, 39, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        p(
          "M38 56q0-13 13-13h58q13 0 13 13v39q0 13-13 13H69l-19 14v-16q-12-2-12-13Z",
          "$paper",
          "message-card",
          "$secondary",
          1,
        ),
        circle(60, 74, 4, "$primary", "avatar"),
        circle(80, 74, 4, "$secondary", "avatar"),
        circle(100, 74, 4, "$primary", "avatar"),
        accent(53, 87, 53, 4),
        accent(63, 96, 34, 3),
        circle(116, 49, 13, "$primary", "signal-badge"),
        p("M116 41v10m0 5v1", "none", "signal", "$paper", 2),
      ];
    case "payment":
      return [
        ellipse(80, 132, 43, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        rect(39, 53, 83, 59, 8, "$ink", "wallet-shadow", { stroke: "none" }),
        rect(35, 47, 83, 59, 8, "$primary", "wallet"),
        rect(35, 61, 83, 16, 2, "$secondary", "card-stripe", {
          opacity: 0.85,
          stroke: "none",
        }),
        rect(93, 76, 26, 21, 5, "$paper", "card-pocket", {
          stroke: "$secondary",
          strokeWidth: 0.8,
        }),
        circle(106, 86, 3, "$primary", "card-chip", { stroke: "none" }),
        accent(46, 86, 32, 4),
        accent(46, 95, 23, 3),
      ];
    case "shield":
      return [
        ellipse(80, 137, 37, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        p("M80 28 123 44v35q-2 31-43 53-41-22-43-53V44Z", "$primary", "shield"),
        p(
          "M80 38 113 50v28q-2 23-33 41-30-18-33-41V50Z",
          "$secondary",
          "shield-inlay",
          "$paper",
          1.2,
        ),
        p("M68 79l8 8 17-19", "none", "verified-mark", "$ink", 3.4),
        circle(111, 49, 10, "$paper", "security-seal"),
        check(105, 49),
      ];
    case "biometric":
      return [
        ellipse(80, 132, 39, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        circle(80, 79, 43, "$secondary", "scan-field", {
          stroke: "$primary",
          strokeWidth: 1.2,
        }),
        p(
          "M80 49c-17 0-29 12-29 29m58 0c0-17-12-29-29-29M60 87c0-12 8-21 20-21s20 9 20 21c0 14-5 26-11 34M69 104c-1-5-2-10-2-16 0-8 5-13 13-13s13 5 13 13c0 12-3 22-7 29M80 87c0 18-2 26-5 32",
          "none",
          "fingerprint-lines",
          "$ink",
          2.2,
        ),
        circle(112, 48, 11, "$primary", "secure-dot"),
        check(106, 48),
      ];
    case "team":
      return [
        ellipse(80, 133, 45, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        circle(80, 57, 15, "$primary", "lead-avatar"),
        circle(51, 70, 11, "$secondary", "member-avatar"),
        circle(109, 70, 11, "$secondary", "member-avatar"),
        p("M55 111c0-20 11-34 25-34s25 14 25 34Z", "$primary", "lead-profile"),
        p(
          "M32 110c0-16 8-27 19-27q8 0 14 8-10 9-10 24Zm96 0c0-16-8-27-19-27q-8 0-14 8 10 9 10 24Z",
          "$secondary",
          "member-profiles",
        ),
        accent(61, 119, 38, 4),
        circle(119, 47, 10, "$paper", "presence", {
          stroke: "$primary",
          strokeWidth: 1.2,
        }),
        circle(119, 47, 4, "$primary", "online", { stroke: "none" }),
      ];
    case "calendar":
      return [
        ellipse(80, 133, 42, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        rect(40, 40, 80, 82, 8, "$paper", "calendar", {
          stroke: "$secondary",
          strokeWidth: 1.2,
        }),
        p("M40 60h80", "none", "calendar-rule", "$primary", 1.4),
        rect(40, 40, 80, 22, 8, "$primary", "calendar-top", { stroke: "none" }),
        p("M58 34v14m44-14v14", "none", "calendar-rings", "$ink", 3),
        ...[0, 1, 2, 3, 4, 5].map((n) =>
          circle(
            56 + (n % 3) * 24,
            76 + Math.floor(n / 3) * 21,
            4,
            n === index % 6 ? "$primary" : "$secondary",
            "date-cell",
            { stroke: "none" },
          ),
        ),
        circle(104, 100, 10, "$paper", "event-badge", {
          stroke: "$primary",
          strokeWidth: 1.2,
        }),
        check(98, 100),
      ];
    case "mail":
      return [
        ellipse(80, 132, 43, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        rect(34, 48, 92, 64, 8, "$primary", "envelope-back", {
          stroke: "none",
        }),
        path("M38 56 80 89l42-33", "$secondary", "envelope-flap", {
          stroke: "$paper",
          strokeWidth: 1.2,
        }),
        path(
          "M35 63 80 98l45-35v39q0 10-10 10H45q-10 0-10-10Z",
          "$paper",
          "envelope-front",
          { stroke: "$secondary", strokeWidth: 1.1 },
        ),
        circle(112, 48, 12, "$primary", "unread-badge"),
        path("M112 41v8m0 5v.5", "none", "unread-mark", {
          stroke: "$paper",
          strokeWidth: 2.2,
        }),
      ];
    case "cloud":
      return [
        ellipse(80, 134, 45, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        path(
          "M49 102h64a21 21 0 0 0 0-42 34 34 0 0 0-65-2 22 22 0 0 0 1 44Z",
          "$primary",
          "cloud",
        ),
        path(
          "M58 91h47a11 11 0 0 0 0-22 23 23 0 0 0-42-2 13 13 0 0 0-5 24Z",
          "$paper",
          "cloud-inlay",
          { stroke: "$secondary", strokeWidth: 1 },
        ),
        path("M80 76v29m-11-10 11 10 11-10", "none", "sync-arrow", {
          stroke: "$ink",
          strokeWidth: 2.2,
        }),
        circle(116, 49, 10, "$paper", "sync-badge", {
          stroke: "$primary",
          strokeWidth: 1.2,
        }),
      ];
    case "files":
      return [
        ellipse(80, 136, 43, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        path(
          "M38 52q0-9 9-9h26l9 12h30q10 0 10 10v47H38Z",
          "$primary",
          "folder-back",
        ),
        path(
          "M31 68q0-9 9-9h25l10 10h44q10 0 10 10v34q0 10-10 10H41q-10 0-10-10Z",
          "$secondary",
          "folder-front",
          { stroke: "$paper", strokeWidth: 1.3 },
        ),
        rect(53, 81, 47, 4, 2, "$paper", "file-line", {
          opacity: 0.95,
          stroke: "none",
        }),
        rect(53, 92, 39, 4, 2, "$paper", "file-line", {
          opacity: 0.78,
          stroke: "none",
        }),
        rect(53, 103, 27, 4, 2, "$paper", "file-line", {
          opacity: 0.64,
          stroke: "none",
        }),
        circle(117, 47, 10, "$primary", "status-badge"),
        check(111, 47),
      ];
    case "database":
      return [
        ellipse(80, 128, 40, 6, "$ink", "shadow", {
          opacity: 0.12,
          stroke: "none",
        }),
        ellipse(80, 52, 39, 13, "$primary", "database-top"),
        path(
          "M41 52v54c0 8 17 14 39 14s39-6 39-14V52",
          "$secondary",
          "database-body",
          { stroke: "$primary", strokeWidth: 1.1 },
        ),
        path(
          "M41 70c0 8 17 14 39 14s39-6 39-14M41 89c0 8 17 14 39 14s39-6 39-14",
          "none",
          "database-rings",
          { stroke: "$ink", strokeOpacity: 0.7, strokeWidth: 1.2 },
        ),
        circle(80, 52, 5, "$paper", "data-core", {
          stroke: "$secondary",
          strokeWidth: 1,
        }),
      ];
    case "launch":
      return [
        ellipse(80, 133, 39, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        path(
          "M80 30c18 13 29 35 25 62L80 119 55 92C51 65 62 43 80 30Z",
          "$primary",
          "rocket-body",
        ),
        path(
          "M80 42c11 12 17 28 16 45L80 101 64 87c-1-17 5-33 16-45Z",
          "$secondary",
          "rocket-inlay",
          { stroke: "$paper", strokeWidth: 1 },
        ),
        circle(80, 67, 8, "$paper", "window", {
          stroke: "$ink",
          strokeWidth: 1.2,
        }),
        path(
          "M55 79 41 95l14 2m50-18 14 16-14 2M65 105l-4 19 19-10 19 10-4-19",
          "$secondary",
          "fins",
        ),
        path(
          "M73 117q-9 15 0 20m7-16q-2 11 0 16m7-20q9 15 0 20",
          "none",
          "exhaust",
          { stroke: "$primary", strokeWidth: 2 },
        ),
      ];
    case "subscription":
      return [
        ellipse(80, 132, 42, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        rect(36, 51, 88, 62, 10, "$primary", "membership-card"),
        path("M36 68h88", "none", "card-rule", {
          stroke: "$paper",
          strokeOpacity: 0.8,
          strokeWidth: 1.2,
        }),
        circle(59, 91, 12, "$secondary", "member-mark"),
        circle(59, 87, 4, "$paper", "member-head", { stroke: "none" }),
        path("M51 99q8-10 16 0", "$paper", "member-shoulders", {
          stroke: "none",
        }),
        accent(81, 85, 27, 4),
        accent(81, 95, 21, 3),
        circle(108, 47, 12, "$paper", "renewal-badge", {
          stroke: "$primary",
          strokeWidth: 1.2,
        }),
        path(
          "M102 47a6 6 0 0 1 10-4m0 0v-4m0 4h-4m2 4a6 6 0 0 1-10 4m0 0v4m0-4h4",
          "none",
          "renewal",
          { stroke: "$primary", strokeWidth: 1.3 },
        ),
      ];
    case "gift":
      return [
        ellipse(80, 132, 41, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        rect(41, 65, 78, 58, 6, "$primary", "gift-box"),
        rect(34, 55, 92, 17, 5, "$secondary", "gift-lid", {
          stroke: "$paper",
          strokeWidth: 0.8,
        }),
        rect(74, 55, 12, 68, 3, "$paper", "gift-ribbon", { stroke: "none" }),
        path(
          "M80 56c-27 0-30-21-17-22 10-1 17 22 17 22Zm0 0c27 0 30-21 17-22-10-1-17 22-17 22Z",
          "$primary",
          "gift-bow",
        ),
        circle(116, 45, 7, "$paper", "sparkle", {
          stroke: "$secondary",
          strokeWidth: 1,
        }),
      ];
    case "delivery":
      return [
        ellipse(80, 133, 47, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        path("M38 57h53v58H38Z", "$secondary", "parcel"),
        path("M91 57 119 70v45H91Z", "$primary", "parcel-side"),
        path("M38 57 66 43l53 27-28 13Z", "$paper", "parcel-top", {
          stroke: "$primary",
          strokeWidth: 1,
        }),
        path("M66 43v27m25 13V57", "none", "parcel-seams", {
          stroke: "$ink",
          strokeWidth: 1.2,
        }),
        rect(53, 76, 19, 17, 2, "$paper", "shipping-label", {
          stroke: "$primary",
          strokeWidth: 0.8,
        }),
        path("M57 82h11m-11 4h8", "none", "label-lines", {
          stroke: "$ink",
          strokeWidth: 0.9,
        }),
        circle(113, 50, 10, "$primary", "delivery-status"),
        check(107, 50),
      ];
    case "map":
      return [
        ellipse(80, 135, 45, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        path(
          "M37 53 66 43l29 10 29-10v66l-29 10-29-10-29 10Z",
          "$secondary",
          "map-fold",
          { stroke: "$paper", strokeWidth: 1 },
        ),
        path("M66 43v66m29-56v66", "none", "map-fold-lines", {
          stroke: "$primary",
          strokeWidth: 1.1,
        }),
        path("M48 91q16-28 31-5t28-16", "none", "route-line", {
          stroke: "$ink",
          strokeWidth: 2,
          strokeDasharray: "3 4",
        }),
        path(
          "M107 48c-11 0-18 8-18 18 0 12 18 29 18 29s18-17 18-29c0-10-7-18-18-18Z",
          "$primary",
          "map-pin",
        ),
        circle(107, 66, 5, "$paper", "pin-center", {
          stroke: "$secondary",
          strokeWidth: 1,
        }),
      ];
    case "health":
      return [
        ellipse(80, 133, 42, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        path(
          "M80 116S36 88 44 60c5-18 29-22 36-4 9-18 33-14 37 4 8 28-37 56-37 56Z",
          "$primary",
          "heart",
        ),
        path(
          "M48 80h18l7-14 13 30 8-16h18",
          "none",
          "pulse-line",
          "$paper",
          2.4,
        ),
        circle(116, 48, 10, "$secondary", "health-badge"),
        check(110, 48),
      ];
    case "invoice":
      return [
        ellipse(80, 133, 42, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        path(
          "M47 34h48l20 20v77l-8-5-8 5-8-5-8 5-8-5-8 5-8-5-8 5-8-5-8 5Z",
          "$paper",
          "invoice",
          { stroke: "$secondary", strokeWidth: 1.2 },
        ),
        path("M95 34v21h20", "none", "invoice-fold", {
          stroke: "$primary",
          strokeWidth: 1.4,
        }),
        accent(59, 67, 44, 5),
        accent(59, 81, 59, 3),
        accent(59, 90, 49, 3),
        accent(59, 99, 53, 3),
        rect(88, 108, 25, 13, 3, "$primary", "invoice-total", {
          stroke: "none",
        }),
        circle(101, 115, 3, "$paper", "currency-mark", { stroke: "none" }),
      ];
    case "search":
      return [
        ellipse(80, 134, 39, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        circle(70, 70, 29, "$secondary", "search-field", {
          stroke: "$primary",
          strokeWidth: 2,
        }),
        circle(70, 70, 19, "$paper", "search-lens", {
          stroke: "$ink",
          strokeWidth: 1,
        }),
        path("m91 91 26 27", "none", "search-handle", {
          stroke: "$primary",
          strokeWidth: 9,
        }),
        path("m91 91 26 27", "none", "handle-highlight", {
          stroke: "$paper",
          strokeWidth: 1.2,
        }),
        circle(70, 70, 7, "$primary", "search-result"),
        circle(70, 70, 3, "$paper", "result-core", { stroke: "none" }),
        circle(117, 48, 9, "$paper", "discovery-spark", {
          stroke: "$primary",
          strokeWidth: 1,
        }),
      ];
    case "notification":
      return [
        ellipse(80, 133, 43, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        path("M52 96V72a28 28 0 0 1 56 0v24l10 12H42Z", "$primary", "bell"),
        circle(80, 53, 4, "$paper", "bell-highlight", { stroke: "none" }),
        path("M71 113q9 14 18 0", "none", "bell-clapper", {
          stroke: "$ink",
          strokeWidth: 2,
        }),
        circle(111, 49, 12, "$secondary", "notification-count"),
        path("M111 43v7m0 4v.5", "none", "count-mark", {
          stroke: "$ink",
          strokeWidth: 2,
        }),
      ];
    case "settings":
      return [
        ellipse(80, 134, 40, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        circle(80, 78, 37, "$primary", "control-ring"),
        circle(80, 78, 26, "$paper", "control-face", {
          stroke: "$secondary",
          strokeWidth: 1.3,
        }),
        circle(80, 78, 13, "$secondary", "control-hub", {
          stroke: "$primary",
          strokeWidth: 1.2,
        }),
        ...Array.from({ length: 8 }, (_, i) => {
          const a = (Math.PI * 2 * i) / 8;
          return circle(
            80 + Math.cos(a) * 32,
            78 + Math.sin(a) * 32,
            4,
            "$paper",
            "control-tooth",
            { stroke: "$primary", strokeWidth: 0.8 },
          );
        }),
        path("M80 78l13-12", "none", "control-pointer", {
          stroke: "$ink",
          strokeWidth: 2.4,
        }),
      ];
    case "deploy":
      return [
        ellipse(80, 135, 46, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        rect(37, 91, 86, 29, 5, "$primary", "deployment-platform"),
        rect(46, 60, 68, 26, 5, "$secondary", "build-artifact", {
          stroke: "$paper",
          strokeWidth: 1,
        }),
        rect(56, 39, 48, 16, 4, "$paper", "release-tag", {
          stroke: "$primary",
          strokeWidth: 1,
        }),
        path("M80 112V71m-11 11 11-11 11 11", "none", "deploy-arrow", {
          stroke: "$ink",
          strokeWidth: 2.5,
        }),
        circle(106, 47, 7, "$primary", "release-dot", { stroke: "none" }),
      ];
    case "developer":
      return [
        ellipse(80, 134, 45, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        rect(34, 43, 92, 76, 8, "$paper", "terminal", {
          stroke: "$secondary",
          strokeWidth: 1.2,
        }),
        rect(34, 43, 92, 17, 8, "$primary", "terminal-bar", { stroke: "none" }),
        circle(45, 51, 2, "$paper", "window-dot", { stroke: "none" }),
        circle(52, 51, 2, "$secondary", "window-dot", { stroke: "none" }),
        path("m51 77-10 9 10 9m17 0 10-18", "none", "code-mark", {
          stroke: "$ink",
          strokeWidth: 2.6,
        }),
        accent(85, 75, 26, 4),
        accent(85, 86, 20, 4),
        accent(42, 105, 54, 3),
        circle(114, 108, 10, "$secondary", "build-status"),
        check(108, 108),
      ];
    case "network":
      return [
        ellipse(80, 131, 45, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        path(
          "M49 73 79 51l34 19-31 37-33-17Z",
          "none",
          "network-links",
          "$primary",
          2,
        ),
        path("M49 73 82 107l31-37", "none", "network-links", "$secondary", 1.2),
        circle(49, 73, 11, "$paper", "network-node", {
          stroke: "$primary",
          strokeWidth: 2,
        }),
        circle(79, 51, 11, "$primary", "network-node"),
        circle(113, 70, 11, "$paper", "network-node", {
          stroke: "$primary",
          strokeWidth: 2,
        }),
        circle(82, 107, 12, "$secondary", "network-node"),
        circle(49, 73, 3, "$primary", "node-core", { stroke: "none" }),
        circle(113, 70, 3, "$primary", "node-core", { stroke: "none" }),
      ];
    case "phone":
      return [
        ellipse(80, 137, 34, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        ...device,
        circle(80, 69, 15, "$secondary", "app-icon"),
        path("M74 69h12m-6-6v12", "none", "app-mark", {
          stroke: "$primary",
          strokeWidth: 2,
        }),
        accent(60, 96, 40, 5),
        accent(60, 106, 30, 4),
        circle(103, 96, 7, "$primary", "notification-dot", { stroke: "none" }),
      ];
    case "workstation":
      return [
        ellipse(80, 132, 47, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        rect(33, 41, 94, 63, 7, "$ink", "monitor-frame", { stroke: "none" }),
        rect(38, 46, 84, 53, 4, "$paper", "monitor-screen", {
          stroke: "$secondary",
          strokeWidth: 0.8,
        }),
        path("M80 104v17m-20 0h40", "none", "monitor-stand", {
          stroke: "$primary",
          strokeWidth: 4,
        }),
        rect(49, 126, 62, 6, 3, "$secondary", "keyboard", { stroke: "none" }),
        path("M51 115h58m-49-5h39", "none", "keyboard-lines", {
          stroke: "$ink",
          strokeWidth: 1,
        }),
        path("M53 78h16l7-12 10 24 7-12h14", "none", "screen-chart", {
          stroke: "$primary",
          strokeWidth: 2,
        }),
      ];
    case "camera":
      return [
        ellipse(80, 131, 45, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        path(
          "M38 63q0-9 9-9h21l10-12h25l9 12h7q9 0 9 9v48q0 9-9 9H47q-9 0-9-9Z",
          "$primary",
          "camera-body",
        ),
        circle(80, 84, 24, "$paper", "lens-rim", {
          stroke: "$secondary",
          strokeWidth: 2,
        }),
        circle(80, 84, 16, "$secondary", "lens-glass", {
          stroke: "$primary",
          strokeWidth: 1.4,
        }),
        circle(80, 84, 7, "$primary", "lens-core", { stroke: "none" }),
        circle(111, 67, 4, "$paper", "flash", { stroke: "none" }),
        p("M74 114h12", "none", "record-state", "$paper", 2.5),
      ];
    case "streaming":
      return [
        ellipse(80, 134, 44, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        rect(33, 44, 94, 69, 9, "$ink", "stream-frame", { stroke: "none" }),
        rect(38, 49, 84, 59, 5, "$primary", "stream-screen", {
          stroke: "$paper",
          strokeWidth: 0.8,
        }),
        path("M71 64v29l25-14Z", "$paper", "play-mark", {
          stroke: "$secondary",
          strokeWidth: 1,
        }),
        path("M52 120h56", "none", "stream-base", {
          stroke: "$primary",
          strokeWidth: 4,
        }),
        circle(113, 57, 3, "$paper", "live-indicator", { stroke: "none" }),
      ];
    case "music":
      return [
        ellipse(80, 132, 42, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        path(
          "M96 43v55a17 17 0 1 1-8-14V54l37-9v42a17 17 0 1 1-8-14V39Z",
          "$primary",
          "music-note",
        ),
        p("M95 57 123 50", "none", "music-highlight", "$paper", 1.5),
        circle(58, 104, 9, "$secondary", "note-head"),
        circle(107, 101, 9, "$secondary", "note-head"),
        circle(79, 55, 10, "$paper", "sound-orbit", {
          stroke: "$secondary",
          strokeWidth: 1.2,
        }),
      ];
    case "food":
      return [
        ellipse(80, 134, 43, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        path("M43 85q2-29 37-29t37 29Z", "$primary", "dish-cover"),
        path("M36 87h88q-3 26-44 26T36 87Z", "$secondary", "serving-dish", {
          stroke: "$paper",
          strokeWidth: 1,
        }),
        circle(80, 57, 4, "$paper", "dish-knob"),
        path("M60 78q20-17 40 0", "none", "steam", {
          stroke: "$paper",
          strokeWidth: 1.5,
        }),
        circle(109, 48, 10, "$primary", "delivery-badge"),
        check(103, 48),
      ];
    case "passkey":
      return [
        ellipse(80, 134, 40, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        circle(63, 73, 25, "$primary", "key-head"),
        circle(63, 73, 12, "$paper", "key-hole", {
          stroke: "$secondary",
          strokeWidth: 1.2,
        }),
        path("M83 73h45v12h-9v10h-12V85H83Z", "$secondary", "key-shaft", {
          stroke: "$primary",
          strokeWidth: 1.3,
        }),
        circle(112, 48, 11, "$paper", "secure-badge", {
          stroke: "$primary",
          strokeWidth: 1,
        }),
        check(106, 48),
      ];
    case "meeting":
      return [
        ellipse(80, 132, 42, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        rect(32, 42, 96, 67, 9, "$paper", "video-screen", {
          stroke: "$secondary",
          strokeWidth: 1.2,
        }),
        circle(80, 70, 15, "$secondary", "video-avatar"),
        path("M53 101q4-21 27-21t27 21Z", "$primary", "video-person"),
        path("m104 70 19-12v29l-19-12Z", "$primary", "camera-lens"),
        rect(59, 117, 42, 5, 2.5, "$primary", "screen-stand", {
          stroke: "none",
        }),
      ];
    default:
      return [
        ellipse(80, 134, 43, 5, "$ink", "shadow", {
          opacity: 0.1,
          stroke: "none",
        }),
        rect(39, 49, 82, 65, 9, "$primary", "product-tile"),
        circle(80, 77, 21, "$paper", "product-mark"),
        path("M69 77h22m-11-11v22", "none", "product-symbol", {
          stroke: "$primary",
          strokeWidth: 2.5,
        }),
        accent(57, 99, 46, 4),
        accent(64, 107, 32, 3),
      ];
  }
}

function surfaceNodes(collection: CollectionId, index: number): VectorNode[] {
  const nodes: VectorNode[] = [
    node("defs", {}, [
      node(
        "linearGradient",
        { id: "premium-face", x1: "12%", y1: "0%", x2: "88%", y2: "100%" },
        [
          node("stop", {
            offset: "0%",
            stopColor: "$paper",
            stopOpacity: 0.96,
          }),
          node("stop", {
            offset: "48%",
            stopColor: "$secondary",
            stopOpacity: 0.88,
          }),
          node("stop", {
            offset: "100%",
            stopColor: "$primary",
            stopOpacity: 0.98,
          }),
        ],
      ),
      node(
        "radialGradient",
        { id: "premium-light", cx: "28%", cy: "18%", r: "82%" },
        [
          node("stop", {
            offset: "0%",
            stopColor: "$paper",
            stopOpacity: 0.96,
          }),
          node("stop", {
            offset: "60%",
            stopColor: "$secondary",
            stopOpacity: 0.58,
          }),
          node("stop", {
            offset: "100%",
            stopColor: "$primary",
            stopOpacity: 0.92,
          }),
        ],
      ),
    ]),
    ellipse(80, 134, 48, 6, "$secondary", "ambient-shadow", {
      opacity: 0.18,
      stroke: "none",
    }),
    ellipse(80, 136, 35, 3, "$paper", "shadow-highlight", {
      opacity: 0.7,
      stroke: "none",
    }),
    circle(
      32 + (index % 3) * 9,
      40 + (index % 2) * 7,
      2.2,
      "$paper",
      "ambient-light",
      { stroke: "$secondary", strokeWidth: 0.7 },
    ),
    circle(
      126 - (index % 4) * 5,
      111 - (index % 3) * 4,
      1.7,
      "$paper",
      "ambient-light",
      { stroke: "$secondary", strokeWidth: 0.6 },
    ),
  ];
  if (
    ["gradient-dimensional", "frosted-glass", "glossy-glass"].includes(
      collection,
    )
  ) {
    nodes.push(
      path(
        `M${43 + (index % 7) * 3} 44q20-20 45-4t34 0`,
        "none",
        "light-ribbon",
        "$paper",
        1.4,
      ),
      ellipse(80, 131, 53, 7, "$primary", "depth-shadow", {
        opacity: 0.07 + (index % 3) * 0.02,
        stroke: "none",
      }),
    );
  } else if (collection === "technical-wireframe") {
    nodes.push(
      ...Array.from({ length: 5 }, (_, line) =>
        path(
          `M24 ${30 + line * 25}h${22 + (line % 2) * 8}m58 0h${26 - (line % 3) * 4}`,
          "none",
          "construction-lines",
          "$secondary",
          0.45,
        ),
      ),
      path(
        `M80 22v9m0 107v7m-62-65h8m108 0h8`,
        "none",
        "axis-marks",
        "$ink",
        0.55,
      ),
    );
  } else if (collection === "character-doodle") {
    nodes.push(
      circle(126, 42, 10, "$paper", "scene-orbit", {
        stroke: "$secondary",
        strokeWidth: 0.8,
      }),
      path(
        `M${118 + (index % 4) * 2} 42q8-8 16 0-8 8-16 0Z`,
        "$primary",
        "doodle-orbit",
        "$secondary",
        0.8,
      ),
    );
  } else if (collection === "character-scenes") {
    nodes.push(
      rect(116, 34, 22, 17, 5, "$paper", "scene-message", {
        stroke: "$secondary",
        strokeWidth: 0.8,
      }),
      path(
        `M${121 + (index % 4)} 42h12m-6-5v10`,
        "none",
        "scene-spark",
        "$primary",
        1,
      ),
    );
  } else {
    nodes.push(
      path(
        `M${38 + (index % 5) * 4} 42l4-6 4 6 6 2-6 3-4 6-4-6-6-3Z`,
        "$paper",
        "micro-spark",
        "none",
      ),
      path(
        `M${118 - (index % 4) * 3} 116l3-5 3 5 5 2-5 2-3 5-3-5-5-2Z`,
        "$secondary",
        "micro-spark",
        "none",
      ),
    );
  }
  if (collection === "frosted-glass" || collection === "glossy-glass") {
    nodes.push(
      path(
        `M28 112q16 8 29 8m44-73q16 4 25 15`,
        "none",
        "glass-reflection",
        "$paper",
        2,
      ),
    );
  }
  if (collection === "monochrome-isometric") {
    nodes.push(
      path(
        `M25 ${122 + (index % 3) * 3}h110`,
        "none",
        "ground-line",
        "$ink",
        0.7,
      ),
    );
  }
  if (collection === "color-isometric") {
    nodes.push(
      path(
        `M31 121 80 145l49-24-49-24Z`,
        "none",
        "isometric-ground",
        "$ink",
        0.45,
      ),
    );
  }
  if (collection === "soft-outline") {
    nodes.push(
      path(
        `M34 46q12-19 28-10m36 85q14 4 26-8`,
        "none",
        "soft-orbit",
        "$primary",
        1.2,
      ),
    );
  }
  if (collection === "editorial-doodle") {
    nodes.push(
      ...Array.from({ length: 4 }, (_, hatch) =>
        path(
          `M${28 + hatch * 4} ${117 + hatch * 2}l12-12`,
          "none",
          "editorial-hatch",
          "$ink",
          0.55,
        ),
      ),
    );
  }
  if (collection === "duotone-scenes") {
    nodes.push(
      path(`M31 112q24-24 46-7t48-13`, "none", "scene-orbit", "$ink", 0.7),
      circle(128, 61 + (index % 3) * 11, 4, "$paper", "scene-point", {
        stroke: "$primary",
        strokeWidth: 0.8,
      }),
    );
  }
  if (collection === "technical-wireframe") {
    nodes.push(path(`M33 128h94`, "none", "wire-baseline", "$secondary", 0.5));
  }
  return nodes;
}

function applyMaterial(
  nodes: readonly VectorNode[],
  collection: CollectionId,
): VectorNode[] {
  const gradientFamily =
    collection === "gradient-dimensional" ||
    collection === "frosted-glass" ||
    collection === "glossy-glass";
  const wireframe = collection === "technical-wireframe";
  const visit = (item: VectorNode): VectorNode => {
    const attrs = { ...item.attrs };
    const fill = attrs.fill;
    if (wireframe && typeof fill === "string" && fill.startsWith("$")) {
      attrs.fill = "none";
      if (fill === "$primary") attrs.stroke = "$primary";
      else if (fill === "$secondary") attrs.stroke = "$secondary";
      else attrs.stroke = "$ink";
      attrs.strokeWidth ??= 1;
    } else if (gradientFamily) {
      if (fill === "$primary") attrs.fill = "@premium-face";
      if (fill === "$secondary") attrs.fill = "@premium-light";
      if (
        collection === "frosted-glass" &&
        (fill === "$primary" || fill === "$secondary")
      ) {
        attrs.fillOpacity = Math.min(Number(attrs.fillOpacity ?? 1), 0.78);
      }
    }
    return {
      ...item,
      attrs,
      ...(item.children ? { children: item.children.map(visit) } : {}),
    };
  };
  return nodes.map(visit);
}

export function createPremiumProductStudies(
  collection: CollectionId,
  startIndex = 0,
  count = 47,
): CollectionArtwork[] {
  return Array.from({ length: count }, (_, index) => {
    const study = productStudies[(startIndex + index) % productStudies.length];
    if (!study) throw new Error("Product artwork catalog is incomplete.");
    const nodes = applyMaterial(
      [...surfaceNodes(collection, index), ...motifNodes(study.motif, index)],
      collection,
    );
    const parts = new Set<string>();
    const collectParts = (items: readonly VectorNode[]) => {
      for (const item of items) {
        if (item.part) parts.add(item.part);
        if (item.children) collectParts(item.children);
      }
    };
    collectParts(nodes);
    return {
      id: `${collection}-${study.id}`,
      name: study.name,
      subject: study.subject,
      category: study.category,
      collection,
      nodes,
      parts: [...parts],
      description: `${study.name}, polished product illustration in the ${collection} visual collection.`,
    };
  });
}
