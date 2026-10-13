import {
  circle as c,
  ellipse as e,
  group as g,
  path as p,
  rect as r,
  rays,
  sparkle,
  smile,
} from "./primitives.js";
import type { VectorNode } from "./types.js";
export const captureScene: readonly VectorNode[] = [
  p("M43 118C7 80 14 25 48 38M127 84c40 55-10 66-56 25", "none", "orbit"),
  r(80, 27, 43, 89, 8, "$ink", "phone-shadow", { stroke: "none" }),
  r(75, 24, 43, 89, 7, "$secondary", "phone"),
  r(89, 30, 16, 3, 1.5, "$ink", "speaker", { stroke: "none" }),
  p("M22 70h13l9-12h29l9 12h20v47H22Z", "$paper", "camera"),
  p("M91 70h11v47H91Z", "$ink", "camera-shadow"),
  c(55, 94, 22, "$ink", "lens-shadow"),
  c(50, 94, 20, "$paper", "lens"),
  c(50, 94, 15, "$secondary", "lens-glass"),
  c(85, 80, 3, "$secondary", "shutter", { stroke: "none" }),
  c(117, 68, 21, "$ink", "verification-shadow", { stroke: "none" }),
  c(114, 66, 20, "$paper", "verification"),
  p("M104 66l7 7 13-15", "none", "check", { strokeWidth: 3.3 }),
  sparkle(61, 42, 7),
];
export const connectedScene: readonly VectorNode[] = [
  p("M26 107C-3 69 87 11 109 30c21 17-20 39-8 60s50 17 43-12", "none", "orbit"),
  r(24, 46, 85, 64, 3, "$ink", "monitor-shadow"),
  r(20, 43, 85, 64, 3, "$secondary", "monitor"),
  r(20, 96, 85, 11, 0, "$paper", "chin"),
  c(63, 101.5, 2.5, "$ink", "power", { stroke: "none" }),
  p("M57 107v16h-13v5h42v-5H72v-16", "$paper", "stand"),
  p("M34 128h65", "none", "ground"),
  r(115, 61, 30, 62, 5, "$ink", "phone-shadow"),
  r(110, 59, 30, 62, 5, "$secondary", "phone"),
  p("M120 65h11", "none", "speaker", { strokeWidth: 3 }),
  p("M117 83v-6h6m9 0h3v6m0 14v6h-6m-9 0h-3v-6", "none", "scan", {
    stroke: "$paper",
    strokeWidth: 3,
  }),
  c(98, 51, 19, "$paper", "connection"),
  p(
    "M89 56l-2 2a6 6 0 0 1-8-8l6-6a6 6 0 0 1 8 0m6 0 2-2a6 6 0 0 1 8 8l-6 6a6 6 0 0 1-8 0m-7-3 10-10",
    "none",
    "link",
    {
      transform: "translate(98 51) scale(.65) translate(-94 -50)",
      strokeWidth: 3,
    },
  ),
];
export const identityScene: readonly VectorNode[] = [
  p("M45 40C4 15 9 83 71 124s86 12 58-28", "none", "orbit"),
  r(65, 20, 53, 113, 8, "$ink", "phone-shadow", { stroke: "none" }),
  r(59, 18, 53, 112, 7, "$secondary", "phone"),
  r(75, 25, 22, 4, 2, "$ink", "speaker", { stroke: "none" }),
  p("M40 61v-9h11m77 0h11v9m0 41v11h-11m-77 0H40v-11", "none", "scan", {
    strokeWidth: 3,
  }),
  r(44, 64, 92, 45, 3, "$ink", "card-shadow"),
  r(40, 60, 92, 45, 3, "$paper", "identity-card"),
  r(47, 67, 27, 28, 3, "$secondary", "portrait"),
  c(60, 77, 6, "$ink", "face", { stroke: "none" }),
  p("M50 94c0-12 20-12 20 0Z", "$ink", "shoulders", { stroke: "none" }),
  p("M82 71h40m-40 7h40m-40 7h25", "none", "details", { strokeWidth: 2.8 }),
  p("M48 99h78", "none", "barcode", {
    strokeDasharray: "1 5",
    strokeWidth: 2.3,
  }),
];
export const softKey: readonly VectorNode[] = [
  p(
    "M52 40c22-18 46 2 65 24s19 51-7 61-83-13-85-39 8-29 27-46Z",
    "$secondary",
    "blob",
    { stroke: "none", opacity: 0.55 },
  ),
  g(
    [
      c(59, 85, 22, "$paper", "key-head", { strokeWidth: 3.2 }),
      p("M75 69l37-37m-9 9 8 8m-17 1 7 7", "none", "key", { strokeWidth: 4.5 }),
      c(55, 88, 8, "$secondary", "key-hole", { stroke: "none" }),
    ],
    { transform: "rotate(8 80 80)" },
  ),
];
export const softUmbrella: readonly VectorNode[] = [
  p(
    "M38 57C57 22 115 31 123 71s-26 71-56 54S12 91 38 57Z",
    "$secondary",
    "blob",
    { stroke: "none", opacity: 0.55 },
  ),
  p("M35 81a45 45 0 0 1 90 0Z", "$paper", "canopy", { strokeWidth: 3 }),
  p("M80 81v30c0 20-25 18-24 2m24-77v-9", "none", "handle", {
    strokeWidth: 3.5,
  }),
  p("M62 80q1-31 18-43 17 12 18 43", "none", "ribs", { strokeWidth: 1.3 }),
  c(111, 118, 3, "$secondary", "accent", { stroke: "none" }),
];
export const softMail: readonly VectorNode[] = [
  p(
    "M34 47C65 21 130 52 127 86s-41 63-70 36S10 67 34 47Z",
    "$secondary",
    "blob",
    { stroke: "none", opacity: 0.55 },
  ),
  g(
    [
      r(36, 52, 88, 61, 12, "$paper", "envelope", { strokeWidth: 3.2 }),
      p(
        "M40 59l34 28q6 5 12 0l34-28M40 106l25-21m30 0 25 21",
        "none",
        "folds",
        { strokeWidth: 2.4 },
      ),
      c(120, 46, 13, "$secondary", "notification", {
        stroke: "$paper",
        strokeWidth: 4,
      }),
    ],
    { transform: "rotate(-7 80 80)" },
  ),
];
export const editorialLaunch: readonly VectorNode[] = [
  p(
    "M23 132c-3-14 13-20 21-11-2-13 13-22 22-12 2-18 19-20 24-5 15-13 27 1 22 12 16-4 25 7 22 16",
    "$paper",
    "clouds",
  ),
  g(
    [
      p("M64 87 43 107l5-28 14-11M91 87l21 20-5-28-14-11", "$paper", "fins"),
      p("M63 95C39 64 58 31 78 19c26 16 38 48 14 76Z", "$paper", "rocket"),
      p("M62 34c9 7 21 8 33 0l-17-15Z", "$ink", "nose"),
      c(78, 57, 12, "$ink", "window"),
      c(75, 53, 3, "$paper", "highlight", { stroke: "none" }),
      p("M66 96h24v8H66Z", "$ink", "engine"),
      p("M69 108q-8 16 8 25 15-9 9-25m-10 6 1 11", "none", "flame"),
    ],
    { transform: "rotate(18 80 76)" },
  ),
  sparkle(28, 51, 6),
  rays(117, 42),
  p(
    "M28 109c-11-8-11-19-4-24m101 5c8-5 12-3 11 4s-10 10-13 3",
    "none",
    "flourishes",
  ),
];
export const editorialAnalytics: readonly VectorNode[] = [
  g(
    [
      r(24, 33, 108, 82, 5, "$ink", "shadow"),
      r(20, 29, 108, 82, 5, "$paper", "browser"),
      p("M20 44h108", "none", "toolbar"),
      c(28, 36, 1.5, "$ink", "dot", { stroke: "none" }),
      c(35, 36, 1.5, "$ink", "dot", { stroke: "none" }),
      c(42, 36, 1.5, "$ink", "dot", { stroke: "none" }),
      r(39, 80, 11, 20, 1, "$ink", "bar-one"),
      r(61, 69, 11, 31, 1, "$paper", "bar-two"),
      r(83, 55, 11, 45, 1, "$ink", "bar-three"),
      p("M37 71l20-13 19 3 23-13m-9 0h10v10", "none", "growth"),
    ],
    { transform: "rotate(-9 80 80)" },
  ),
  p(
    "M83 118c10 20 26 12 22 3s-14-4-6 5m-55-4-6 6m14-3-1 9",
    "none",
    "flourishes",
  ),
  sparkle(124, 23, 5),
  rays(130, 99),
];
export const editorialIdea: readonly VectorNode[] = [
  p(
    "M62 102c-2-13-18-17-18-38a36 36 0 0 1 72 0c0 21-15 25-18 38Z",
    "$paper",
    "bulb",
  ),
  p("M80 30c25 0 36 15 36 34 0 21-15 25-18 38H80Z", "$ink", "shade"),
  p(
    "M66 48c-13-5-17 9-10 15-13 8-2 23 7 19-1 13 10 18 17 10V42c-7-9-18-1-14 6Z",
    "$paper",
    "brain",
  ),
  p(
    "M65 49q11 3 5 13m-13 2 12 5m-6 13q4-15 17-11m-10 20q-3-8 10-9",
    "none",
    "folds",
  ),
  r(61, 104, 39, 7, 2, "$paper", "base"),
  r(63, 113, 35, 7, 2, "$paper", "base"),
  p("M69 122q10 17 21 0Z", "$ink", "cap"),
  p(
    "M27 55l9 3m-2-18 7 5m-3 43-8 4m91-53 6-7m-1 31 10 1m-10 26 7 4M89 135q22 5 37-11",
    "none",
    "rays",
  ),
  sparkle(30, 114, 6),
];
export const characterGlobe: readonly VectorNode[] = [
  p("M37 128c23 8 62 8 88 0", "none", "ground"),
  p("M87 105v25m-13 2h28", "none", "stand", { strokeWidth: 3 }),
  p("M110 30a54 54 0 0 0-52 93l8-15a36 36 0 0 1 38-60Z", "$paper", "holder"),
  c(87, 80, 39, "$paper", "earth", { strokeWidth: 2.5 }),
  e(87, 80, 17, 39, "none", "longitude"),
  p("M50 66h73M49 92h75", "none", "latitude"),
  c(75, 72, 7, "$paper", "eyes"),
  c(99, 72, 7, "$paper", "eyes"),
  c(77, 73, 3, "$ink", "pupils"),
  c(97, 73, 3, "$ink", "pupils"),
  p("M79 89q10 11 18-1", "none", "smile", { strokeWidth: 2.7 }),
];
export const characterRunner: readonly VectorNode[] = [
  e(80, 136, 29, 5, "$ink", "shadow", { stroke: "none" }),
  p("M62 85 36 92 22 82 18 104 37 111 69 103Z", "$paper", "left-leg", {
    strokeWidth: 2.8,
  }),
  p("M85 91l19 10 23-13 11 15-31 22-33-18Z", "$paper", "right-leg", {
    strokeWidth: 2.8,
  }),
  p("M95 67c15-5 21-19 14-31l-10 4q11 16-15 16", "$paper", "arm", {
    strokeWidth: 2.5,
  }),
  p(
    "M52 62 36 58 28 49l-5 3 5 10-12-5-3 5 15 8-11-1-1 5 26 8",
    "$paper",
    "hand",
    { strokeWidth: 2.3 },
  ),
  c(76, 71, 30, "$paper", "head", { strokeWidth: 2.6 }),
  p("M62 67q5 7 10 0m9 0q5 7 10 0m-28 15q14 12 26-2", "none", "face", {
    strokeWidth: 2.6,
  }),
  p("M101 44q-3-18-24-18", "none", "motion"),
];
export const characterBrowser: readonly VectorNode[] = [
  g(
    [
      p("M30 34 132 39 127 125 27 120Z", "$paper", "browser", {
        strokeWidth: 2.6,
      }),
      p("M29 52 131 57l-4 68-100-5Z", "$ink", "screen"),
      p("M41 120C44 67 74 57 98 78q17 14 22 47Z", "$paper", "character", {
        strokeWidth: 2,
      }),
      smile(81, 96, 1.2),
      p("M106 45h6m8-3 6 7m-6-1 6-6", "none", "controls", { strokeWidth: 2.3 }),
      p("M49 44h27", "none", "address", { strokeWidth: 2 }),
    ],
    { transform: "rotate(-4 80 80)" },
  ),
];
export const searchPerson: readonly VectorNode[] = [
  r(68, 28, 72, 81, 5, "$secondary", "browser", {
    stroke: "none",
    opacity: 0.3,
  }),
  p("M77 41h54m-54 14h38m-38 13h48m-48 13h20", "none", "results", {
    stroke: "$secondary",
    strokeWidth: 4,
  }),
  p("M18 136h126", "none", "ground"),
  p("M30 132c-4-29 2-42 19-49l19 2q20 6 23 47Z", "$paper", "shirt"),
  p("M49 72v15l12 11 9-15-5-13", "$paper", "neck"),
  p(
    "M28 50c-9-17 6-29 20-22 17-14 38 1 31 20l-2 28c5 9-7 16-15 10-13 6-25 1-24-9-14 0-18-15-10-27Z",
    "$ink",
    "hair",
  ),
  p(
    "M50 39c1 12 11 13 23 13l1 17c-3 18-22 20-28 4l-1-16c-11-1-8-14-1-12Z",
    "$paper",
    "face",
  ),
  c(66, 59, 6, "none", "glasses"),
  p("M60 59h-9m22 3 5 6-6 2m-12 3q5 6 10 1", "none", "features"),
  p("M43 95 55 111l28-12 8 13-37 20q-6 2-11-5L30 111", "$paper", "arm"),
  p("M89 106 110 78", "none", "search-handle", {
    stroke: "$primary",
    strokeWidth: 9,
  }),
  p("M78 101l6-7q4-5 7-1l5 6q3 4-2 8l-6 5Z", "$paper", "hand"),
  p("M84 97l7 6m-10-2 7 6", "none", "fingers"),
  c(119, 64, 20, "$primary", "search-lens"),
  c(119, 64, 16, "none", "lens-rim", { stroke: "$secondary", strokeWidth: 1 }),
  c(112, 64, 1.8, "$paper", "search-dots", { stroke: "none" }),
  c(119, 64, 1.8, "$paper", "search-dots", { stroke: "none" }),
  c(126, 64, 1.8, "$paper", "search-dots", { stroke: "none" }),
  p("M92 27l3-6m46 66 6 2m-126 3-4 3", "none", "accents", {
    stroke: "$primary",
    strokeWidth: 1,
  }),
];
export const offlinePerson: readonly VectorNode[] = [
  r(29, 46, 102, 63, 5, "$secondary", "backdrop", {
    stroke: "none",
    opacity: 0.22,
  }),
  p("M21 133h122", "none", "desk"),
  p("M17 40q25-24 51 0m-42 10q17-17 34 0m-24 10q7-7 14 0", "none", "wifi", {
    stroke: "$primary",
    strokeWidth: 6,
  }),
  p("M21 24l40 44", "none", "disconnected", {
    stroke: "$paper",
    strokeWidth: 7,
  }),
  p("M21 24l40 44", "none", "disconnected", {
    stroke: "$primary",
    strokeWidth: 2.5,
  }),
  p("M75 90c-13 4-20 18-17 42h84c1-26-5-39-22-45Z", "$paper", "shirt"),
  p("M87 75v18q8 10 19-1V76", "$paper", "neck"),
  p(
    "M77 50c-13-8-5-28 8-23 10-11 25-4 26 4 18-2 25 19 17 31 13 10 6 36-11 33-14 10-25-3-18-17l-14-9Z",
    "$ink",
    "hair",
  ),
  g(
    [
      p(
        "M85 40q9 17 27 12v14c-1 20-23 28-31 11l-4-17c-10 1-11-11-3-12l4 1Z",
        "$paper",
        "face",
      ),
      c(84, 62, 5.5, "none", "glasses"),
      c(103, 62, 5.5, "none", "glasses"),
      p(
        "M90 62h7m-4 1-2 9 5-1m-10 8q6-4 12-1m-19-24 6 1m15-1 6-2",
        "none",
        "features",
      ),
    ],
    { transform: "rotate(-10 92 69)" },
  ),
  p(
    "M72 115 78 86l-2-8q-1-6 3-7 5-1 6 6l1 5 4-8q3-4 6-1l-4 15-2 32Z",
    "$paper",
    "supporting-hand",
  ),
  p("M69 106l-7 15q-1 8 8 8h17l5-9-13-4", "$paper", "left-sleeve"),
  p("M132 104l5 22q-1 6-9 6h-24l-2-9 24-3-4-15", "$paper", "right-arm"),
  p("M103 122l-11-2q-5 0-5 4l7 1-6 1q-5 3 0 5h16", "$paper", "resting-hand"),
  p("M27 99h31l7 33H35Z", "$primary", "laptop"),
  p("M24 133h46", "none", "keyboard", { strokeWidth: 3 }),
  c(46, 116, 2.5, "$secondary", "laptop-logo", { stroke: "none" }),
];
export const successPerson: readonly VectorNode[] = [
  r(35, 33, 98, 70, 5, "$secondary", "backdrop", {
    stroke: "none",
    opacity: 0.22,
  }),
  p("M97 76q25-7 36 8 10 16 9 49H62l1-47Z", "$paper", "shirt"),
  p("M89 66v19q6 6 14-1V64", "$paper", "neck"),
  p(
    "M75 46c-14-14 1-33 16-24 11-11 31-1 30 13 9 6 8 18-1 23l-6 18-24-6-15-9Z",
    "$ink",
    "hair",
  ),
  p(
    "M83 35q5 13 26 10l1 14c-2 19-24 22-29 5l-3-13c-7 2-9-9-2-10l4 2Z",
    "$paper",
    "face",
  ),
  p(
    "M85 53q3-4 6 0m10-1q3-4 6 0m-13 2-1 7 4 1m-11 2q9 9 16-2",
    "none",
    "features",
  ),
  r(22, 82, 84, 52, 4, "$paper", "approved-window"),
  p("M22 93h84", "none", "toolbar"),
  c(29, 88, 1, "$ink", "window-dots", { stroke: "none" }),
  c(34, 88, 1, "$ink", "window-dots", { stroke: "none" }),
  c(39, 88, 1, "$ink", "window-dots", { stroke: "none" }),
  c(62, 113, 14, "$primary", "approved", { stroke: "none" }),
  p("M55 113l5 5 10-12", "none", "check", {
    stroke: "$paper",
    strokeWidth: 2.8,
  }),
  p("M112 90l11 20-22 7 2 13q23-3 31-13 4-6-9-30", "$paper", "embracing-arm"),
  p(
    "M105 118l-8-4q-4-2-6 0l7 5-12-1q-4 1-1 4l13 3-9 1q-3 4 1 5l15-2Z",
    "$paper",
    "hand",
  ),
  p(
    "M44 82v-7q0-5 4-3l2 8v-8q2-5 5-1l1 9v-7q3-4 6 0l1 9v-6q4-3 6 2v8",
    "$paper",
    "holding-fingers",
  ),
  p("M19 137h125", "none", "ground"),
  p("M23 56l4 3m7-16 2 6m96 16 5-3", "none", "accents", { stroke: "$primary" }),
  sparkle(136, 43, 4),
];
