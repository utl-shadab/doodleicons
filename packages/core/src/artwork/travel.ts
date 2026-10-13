import { define, p, c, r, e } from "./helpers.js";
const icon = (
  id: string,
  name: string,
  tags: string,
  shapes: Parameters<typeof define>[4],
) => define("travel", id, name, tags, shapes);
export const travelIcons = [
  icon("map", "Map", "navigation explore atlas", [
    p("M2 7l9-5 10 5 9-5v25l-9 4-10-5-9 5z", "body", "accent"),
    p("M11 2v24M21 7v24", "folds"),
  ]),
  icon("map-pin", "Map pin", "location marker place", [
    p("M16 31S4 18 4 13C4-3 28-3 28 13c0 5-12 18-12 18Z", "body", "accent"),
    c(16, 12, 4, "center"),
  ]),
  icon("route", "Route", "journey path directions", [
    c(6, 6, 4, "start", "accent"),
    c(26, 26, 4, "end", "accent"),
    p("M10 6h13c11 0 8 11 0 11H9C-3 17 0 26 8 26h14", "path"),
  ]),
  icon("car", "Car", "vehicle drive transport", [
    p("M3 16l4-11h18l4 11v11H3z", "body", "accent"),
    p("M3 16h26M8 27v4M24 27v4M8 21h4M20 21h4", "detail"),
  ]),
  icon("plane", "Plane", "flight air travel", [
    p(
      "M14 12V4c0-4 4-4 4 0v8l12 7v4l-12-4v6l4 4v2l-6-2-6 2v-2l4-4v-6L2 23v-4z",
      "body",
      "accent",
    ),
  ]),
  icon("train", "Train", "rail railway station", [
    r(6, 2, 20, 24, 5),
    r(10, 6, 12, 9, 2, "window"),
    p("M8 31l4-5M24 31l-4-5M10 21h2M20 21h2", "detail"),
  ]),
  icon("bus", "Bus", "public transport commute", [
    r(5, 2, 22, 27, 4),
    r(8, 7, 16, 12, 1, "windows"),
    p("M16 7v12M9 29v2M23 29v2M1 10v7M31 10v7M9 24h3M20 24h3", "detail"),
  ]),
  icon("globe", "Globe", "world international earth", [
    c(16, 16, 14, "body", "accent"),
    e(16, 16, 6, 14, "meridian"),
    p("M2 16h28M5 8h22M5 24h22", "latitude"),
  ]),
  icon("rain", "Rain", "weather storm cloud", [
    p("M7 19C-2 19 0 9 7 10c0-10 17-10 18 0 9-1 10 9 0 9z", "cloud", "accent"),
    p("M9 24l-3 6M17 24l-3 6M25 24l-3 6", "rain"),
  ]),
  icon("sun", "Sun", "day sunshine weather", [
    c(16, 16, 7, "body", "accent"),
    p(
      "M16 1v4M16 27v4M1 16h4M27 16h4M5 5l3 3M24 24l3 3M5 27l3-3M24 8l3-3",
      "rays",
    ),
  ]),
  icon("moon", "Moon", "night dark lunar", [
    p("M28 22C11 29 2 11 12 2-5 7 0 31 18 30c4 0 8-3 10-8Z", "body", "accent"),
  ]),
  icon("snow", "Snow", "winter cold snowflake", [
    p(
      "M16 1v30M3 8l26 16M3 24 29 8M11 4l5 4 5-4M11 28l5-4 5 4M3 14l6-2-1-6M24 26l-1-6 6-2M3 18l6 2-1 6M24 6l-1 6 6 2",
      "crystal",
    ),
  ]),
  icon("wind", "Wind", "breeze weather air", [
    p(
      "M2 11h19c10 0 6-13-1-8M2 17h25c7 0 6 10 0 10M2 23h12c6 0 6 9 0 7",
      "gusts",
    ),
  ]),
  icon("mountain", "Mountain", "hiking peak adventure", [
    p("M1 29 13 4l8 16 4-7 6 16z", "body", "accent"),
    p("M8 15l5 3 4-6M21 20l4 3 2-3", "snow"),
  ]),
  icon("tree", "Tree", "forest nature woodland", [
    p("M16 2 7 12h4L4 22h24l-7-10h4z", "foliage", "accent"),
    p("M13 22v8h6v-8", "trunk"),
  ]),
  icon("tent", "Tent", "camp camping outdoors", [
    p("M16 3 1 29h30z", "body", "accent"),
    p("M16 3v26M8 29l8-14 8 14", "entrance"),
  ]),
  icon("luggage", "Luggage", "suitcase trip baggage", [
    r(6, 8, 20, 21, 4),
    p("M12 8V2h8v6M10 29v2M22 29v2M12 13v11M20 13v11", "detail"),
  ]),
  icon("umbrella", "Umbrella", "rain shelter weather", [
    p("M2 16c0-17 28-17 28 0z", "canopy", "accent"),
    p("M16 2v24c0 7-9 7-9 0M9 16c0-8 2-12 7-14 5 2 7 6 7 14", "handle"),
  ]),
  icon("sailboat", "Sailboat", "boat sea sailing", [
    p("M16 2 3 20h13z", "sail", "accent"),
    p("M19 6v14h11z", "sail", "accent"),
    p("M2 24h28l-5 6H7zM16 2v22", "hull"),
  ]),
  icon("recycle", "Recycle", "sustainability ecology reuse", [
    p(
      "M9 11l6-9 7 11M16 12l6 1 1-6M25 17l6 9H17M21 22l-4 4 4 5M12 27H2l6-11M3 18l5-2 3 5",
      "arrows",
    ),
  ]),
];
