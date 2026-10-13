import { define, p, c, r } from "./helpers.js";
const icon = (
  id: string,
  name: string,
  tags: string,
  shapes: Parameters<typeof define>[4],
) => define("interface", id, name, tags, shapes);
export const interfaceIcons = [
  icon("home", "Home", "house dashboard start", [
    p("M4 14L16 4l12 10", "roof"),
    p("M7 12v15h7v-9h5v9h6V12", "body", "accent"),
  ]),
  icon("search", "Search", "find magnify discover", [
    c(14, 14, 9, "lens", "accent"),
    p("M21 21l7 7", "handle"),
  ]),
  icon("menu", "Menu", "hamburger navigation lines", [
    p("M5 8h22M5 16h16M5 24h22"),
  ]),
  icon("close", "Close", "dismiss cancel cross", [p("M7 7l18 18M25 7L7 25")]),
  icon("arrow-left", "Arrow left", "back previous direction", [
    p("M27 16H5m9-9-9 9 9 9"),
  ]),
  icon("arrow-right", "Arrow right", "next forward direction", [
    p("M5 16h22m-9-9 9 9-9 9"),
  ]),
  icon("arrow-up", "Arrow up", "top direction north", [
    p("M16 27V5m-9 9 9-9 9 9"),
  ]),
  icon("arrow-down", "Arrow down", "bottom direction south", [
    p("M16 5v22m-9-9 9 9 9-9"),
  ]),
  icon("compass", "Compass", "explore navigation direction", [
    c(16, 16, 12, "body", "accent"),
    p("M21 10l-3 9-8 3 3-9z", "needle"),
  ]),
  icon("dashboard", "Dashboard", "overview panels layout", [
    r(4, 4, 10, 14),
    r(18, 4, 10, 9),
    r(4, 22, 10, 6),
    r(18, 17, 10, 11),
  ]),
  icon("grid", "Grid", "layout tiles squares", [
    r(5, 5, 9, 9),
    r(18, 5, 9, 9),
    r(5, 18, 9, 9),
    r(18, 18, 9, 9),
  ]),
  icon("list", "List", "rows bullet layout", [
    c(6, 8, 1, "bullet", "fill"),
    c(6, 16, 1, "bullet", "fill"),
    c(6, 24, 1, "bullet", "fill"),
    p("M12 8h15M12 16h15M12 24h11"),
  ]),
  icon("filter", "Filter", "funnel refine results", [
    p("M4 5h24L19 16v9l-6 3V16z", "body", "accent"),
  ]),
  icon("sort", "Sort", "order ascending descending", [
    p("M6 5v22m-3-4 3 4 4-4M14 7h14M14 15h10M14 23h6"),
  ]),
  icon("sliders", "Sliders", "settings controls preferences", [
    p("M5 8h7m6 0h9M5 16h15m6 0h1M5 24h3m6 0h13"),
    c(15, 8, 3, "knobs", "accent"),
    c(23, 16, 3, "knobs", "accent"),
    c(11, 24, 3, "knobs", "accent"),
  ]),
  icon("sidebar", "Sidebar", "panel split layout", [
    r(4, 5, 24, 22),
    p("M12 5v22M7 10h2M7 15h2M7 20h2"),
  ]),
  icon("external-link", "External link", "open new window", [
    p("M17 5h10v10M27 5 14 18", "arrow"),
    p("M12 6H6v21h21v-6", "body"),
  ]),
  icon("cursor", "Cursor", "pointer select mouse", [
    p("M7 3l19 15-9 1-5 10z", "body", "accent"),
  ]),
  icon("maximize", "Maximize", "expand fullscreen", [
    p("M5 12V5h7M20 5h7v7M27 20v7h-7M12 27H5v-7"),
  ]),
  icon("command", "Command", "keyboard shortcut mac", [
    p(
      "M11 11H7a4 4 0 1 1 4-4v18a4 4 0 1 1-4-4h18a4 4 0 1 1-4 4V7a4 4 0 1 1 4 4H11v10h10V11",
    ),
  ]),
];
