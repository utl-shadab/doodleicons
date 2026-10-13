import { define, p, c, r, e } from "./helpers.js";
const icon = (
  id: string,
  name: string,
  tags: string,
  shapes: Parameters<typeof define>[4],
) => define("technology", id, name, tags, shapes);
export const technologyIcons = [
  icon("rocket", "Rocket", "launch startup space", [
    p("M10 21C8 12 17 3 28 3c1 12-8 20-17 19Z", "body", "accent"),
    c(21, 10, 3, "window"),
    p("M10 12H5l-3 9 8-1M20 22v5l-9 3 1-8", "fins"),
    p("M7 24 3 29M10 26l-1 4M5 22l-4 2", "flame"),
  ]),
  icon("robot", "Robot", "bot artificial intelligence", [
    r(5, 9, 22, 19, 5),
    p("M16 9V5M1 15v7M31 15v7M11 23h10", "detail"),
    c(16, 3, 2, "antenna"),
    c(11, 16, 1, "eyes", "fill"),
    c(21, 16, 1, "eyes", "fill"),
  ]),
  icon("brain", "Brain", "intelligence mind thinking", [
    p(
      "M16 5c-5-6-11 0-9 5-7 0-7 10-2 11-2 8 9 11 11 4 2 7 13 4 11-4 5-1 5-11-2-11 2-5-4-11-9-5Z",
      "body",
      "accent",
    ),
    p("M16 5v20M7 10l4 3M5 21l6-4M25 10l-4 3M27 21l-6-4", "folds"),
  ]),
  icon("chip", "Chip", "processor cpu hardware", [
    r(7, 7, 18, 18),
    r(12, 12, 8, 8, 1, "core"),
    p(
      "M11 2v5M16 2v5M21 2v5M11 25v5M16 25v5M21 25v5M2 11h5M2 16h5M2 21h5M25 11h5M25 16h5M25 21h5",
      "pins",
    ),
  ]),
  icon("code", "Code", "developer brackets programming", [
    p("M10 7 2 16l8 9M22 7l8 9-8 9M19 4l-6 24"),
  ]),
  icon("terminal", "Terminal", "shell cli command", [
    r(3, 5, 26, 22),
    p("M8 11l5 5-5 5M17 22h7", "prompt"),
  ]),
  icon("database", "Database", "storage sql data", [
    e(16, 7, 12, 4),
    p("M4 7v18c0 6 24 6 24 0V7M4 16c0 6 24 6 24 0", "body"),
  ]),
  icon("cloud", "Cloud", "hosting online storage", [
    p(
      "M8 26C0 26 0 14 8 14 7 3 24 2 25 14 33 14 32 26 25 26Z",
      "body",
      "accent",
    ),
  ]),
  icon("server", "Server", "hosting rack infrastructure", [
    r(4, 3, 24, 11),
    r(4, 18, 24, 11),
    c(9, 8.5, 1, "status", "fill"),
    c(9, 23.5, 1, "status", "fill"),
    p("M17 8h6M17 23h6"),
  ]),
  icon("network", "Network", "nodes system connection", [
    r(11, 3, 10, 8),
    r(2, 22, 10, 8),
    r(20, 22, 10, 8),
    p("M16 11v6H7v5M16 17h9v5", "connections"),
  ]),
  icon("workflow", "Workflow", "automation process steps", [
    r(3, 3, 9, 9),
    r(20, 20, 9, 9),
    p("M12 7h12v13M7 12v12h13", "connections"),
    p("M21 16l3 4 3-4M16 21l4 3-4 3", "arrows"),
  ]),
  icon("wand", "Magic wand", "ai generate effects", [
    p("M3 25 20 8l5 5L8 30z", "body", "accent"),
    p("M16 12l5 5M8 3v6M5 6h6M25 1v5M23 3h5M27 23v6M24 26h6", "sparkles"),
  ]),
  icon("bug", "Bug", "debug insect issue", [
    r(9, 11, 14, 18, 7),
    p(
      "M12 11V7c0-5 8-5 8 0v4M16 11v18M3 10l6 5M2 20h7M3 29l7-5M29 10l-6 5M30 20h-7M29 29l-7-5",
      "legs",
    ),
  ]),
  icon("shield", "Shield", "security protect safe", [
    p(
      "M16 2c4 4 9 5 13 5 0 12-5 18-13 23C8 25 3 19 3 7c4 0 9-1 13-5Z",
      "body",
      "accent",
    ),
    p("M10 16l4 4 8-9", "check"),
  ]),
  icon("key", "Key", "password access login", [
    c(10, 11, 7, "head", "accent"),
    p("M15 16l13 13M22 23l4-4M25 26l4-4", "teeth"),
  ]),
  icon("lock", "Lock", "secure private password", [
    r(5, 13, 22, 16),
    p("M10 13V8c0-9 12-9 12 0v5", "shackle"),
    c(16, 20, 2, "keyhole", "fill"),
    p("M16 22v3", "keyhole"),
  ]),
  icon("fingerprint", "Fingerprint", "biometric identity touch", [
    p(
      "M5 18v-5c0-15 23-15 23 0v7M10 24V13c0-8 13-8 13 0v12M16 12v11c0 3-1 6-4 8M5 23l-2 5M22 29l-1 2",
    ),
  ]),
  icon("scan", "Scan", "qr identify camera", [
    p("M3 11V3h8M21 3h8v8M29 21v8h-8M11 29H3v-8M1 16h30", "frame"),
    r(9, 9, 14, 14, 3, "target"),
  ]),
  icon("lightbulb", "Lightbulb", "idea innovation inspiration", [
    p("M11 23C-4 8 9-1 18 3c12 3 12 11 3 20z", "bulb", "accent"),
    p("M11 27h10M13 30h6M16 23v-9m-4 0 4 3 4-3", "filament"),
  ]),
  icon("laptop", "Laptop", "computer screen device", [
    r(5, 4, 22, 18),
    p("M5 22 1 28h30l-4-6M12 25h8", "base", "accent"),
  ]),
];
