import { define, p, c, r, e } from "./helpers.js";
const icon = (
  id: string,
  name: string,
  tags: string,
  shapes: Parameters<typeof define>[4],
) => define("expressive", id, name, tags, shapes);
export const expressiveIcons = [
  icon("smile", "Smile", "happy face emotion", [
    c(16, 16, 13, "face", "accent"),
    c(11, 12, 1, "eyes", "fill"),
    c(21, 12, 1, "eyes", "fill"),
    p("M9 20c4 6 10 6 14 0", "mouth"),
  ]),
  icon("sad", "Sad", "unhappy face emotion", [
    c(16, 16, 13, "face", "accent"),
    c(11, 12, 1, "eyes", "fill"),
    c(21, 12, 1, "eyes", "fill"),
    p("M10 24c3-6 9-6 12 0", "mouth"),
  ]),
  icon("wink", "Wink", "playful face emoji", [
    c(16, 16, 13, "face", "accent"),
    c(11, 12, 1, "eyes", "fill"),
    p("M19 12h5M9 20c4 6 10 6 14 0", "expression"),
  ]),
  icon("surprised", "Surprised", "wow shock face", [
    c(16, 16, 13, "face", "accent"),
    c(11, 11, 1, "eyes", "fill"),
    c(21, 11, 1, "eyes", "fill"),
    e(16, 22, 3, 4, "mouth"),
  ]),
  icon("sparkles", "Sparkles", "magic shine stars", [
    p("m16 5 3 8 8 3-8 3-3 8-3-8-8-3 8-3z", "star", "accent"),
    p("M5 1v7M1 5h7M27 24v7M24 27h7", "rays"),
  ]),
  icon("fire", "Fire", "hot flame trending", [
    p(
      "M18 1c5 13-6 10-2 18 4-1 7-4 7-8 18 16-4 29-16 16C-1 17 13 13 18 1Z",
      "body",
      "accent",
    ),
    p("M14 22c-5 6 0 10 4 7 2-2 0-5-1-7", "core"),
  ]),
  icon("trophy", "Trophy", "winner award achievement", [
    p("M8 3h16v11c0 12-16 12-16 0z", "cup", "accent"),
    p("M8 7H2c0 9 4 11 8 11M24 7h6c0 9-4 11-8 11M16 23v6M9 30h14", "stand"),
  ]),
  icon("medal", "Medal", "prize award badge", [
    c(16, 22, 9, "medal", "accent"),
    p("M10 15 4 2h8l4 11 4-11h8l-6 13", "ribbon"),
    p(
      "m16 17 1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z",
      "star",
    ),
  ]),
  icon("puzzle", "Puzzle", "piece solution connect", [
    p(
      "M3 3h10c-4 8 10 8 6 0h10v10c-8-4-8 10 0 6v10H19c4-8-10-8-6 0H3V19c8 4 8-10 0-6z",
      "body",
      "accent",
    ),
  ]),
  icon("infinity", "Infinity", "forever unlimited loop", [
    p("M16 16C0-6-5 32 8 24 13 21 19 10 24 8 37 0 32 38 16 16Z", "loop"),
  ]),
  icon("diamond", "Diamond", "gem value precious", [
    p("M7 3h18l6 9-15 19L1 12z", "body", "accent"),
    p("M1 12h30M7 3l9 28 9-28M7 3l9 9 9-9", "facets"),
  ]),
  icon("cube", "Cube", "geometry block three dimensional", [
    p("M16 2 30 9v15l-14 7L2 24V9z", "body", "accent"),
    p("M2 9l14 7 14-7M16 16v15", "edges"),
  ]),
  icon("orbit", "Orbit", "abstract atom science", [
    c(16, 16, 7, "core", "accent"),
    p(
      "M2 26C-5 15 25-5 30 5 37 17 7 38 2 26ZM3 5c9-9 36 15 26 22C19 35-5 14 3 5Z",
      "rings",
    ),
  ]),
  icon("spiral", "Spiral", "abstract flow geometry", [
    p(
      "M16 16c3-3 6 3 2 5-6 3-11-5-6-10C20 4 31 16 24 25 15 36 0 23 5 11 9 1 24 0 29 9",
      "curve",
    ),
  ]),
  icon("balloon", "Balloon", "party celebration float", [
    e(16, 12, 10, 11, "body"),
    p("M16 23l-3 4h6zM16 27c-6 4 5 3 0 5", "string"),
  ]),
  icon("party", "Party", "celebrate confetti birthday", [
    p("M10 11 2 30l20-8z", "cone", "accent"),
    p(
      "M7 18l9 8M14 9c-4-7 5-3 2-8M21 17c8 3 4-7 10-4M23 4l-4 7M28 6l2 2M24 28l2 2",
      "confetti",
    ),
  ]),
  icon("crown", "Crown", "royalty leader premium", [
    p("M3 8l7 8 6-13 6 13 7-8-3 21H6z", "body", "accent"),
    p("M6 24h20", "band"),
  ]),
  icon("flower", "Flower", "bloom nature decorative", [
    p(
      "M16 9C5 0 0 11 9 16 0 21 5 32 16 23 27 32 32 21 23 16 32 11 27 0 16 9Z",
      "petals",
      "accent",
    ),
    c(16, 16, 4, "center"),
  ]),
  icon("happy-window", "Happy window", "mascot browser friendly", [
    r(2, 4, 28, 25, 3, "window"),
    p("M2 10h28M9 21c4 5 10 5 14 0", "mouth"),
    c(7, 7, 0.7, "controls", "fill"),
    c(11, 7, 0.7, "controls", "fill"),
    c(11, 16, 1, "eyes", "fill"),
    c(22, 16, 1, "eyes", "fill"),
  ]),
  icon("peace", "Peace", "harmony calm symbol", [
    c(16, 16, 14, "body", "accent"),
    p("M16 2v28M16 16 6 26M16 16l10 10", "symbol"),
  ]),
];
