import { define, p, c, r } from "./helpers.js";
const icon = (
  id: string,
  name: string,
  tags: string,
  shapes: Parameters<typeof define>[4],
) => define("productivity", id, name, tags, shapes);
export const productivityIcons = [
  icon("document", "Document", "file paper text", [
    p("M6 2h13l8 8v20H6z", "body", "accent"),
    p("M19 2v8h8M11 16h11M11 21h11M11 26h7"),
  ]),
  icon("folder", "Folder", "directory files organize", [
    p("M3 5h10l3 5h13v18H3z", "body", "accent"),
    p("M3 14h26", "fold"),
  ]),
  icon("folder-open", "Folder open", "directory browse files", [
    p("M3 26V5h10l3 5h12v5", "back"),
    p("M7 15h24l-5 13H2z", "body", "accent"),
  ]),
  icon("spreadsheet", "Spreadsheet", "table excel cells", [
    r(4, 3, 24, 27),
    p("M4 11h24M4 18h24M4 24h24M12 11v19M21 11v19", "grid"),
  ]),
  icon("presentation", "Presentation", "slides deck keynote", [
    r(3, 4, 26, 18),
    p("M16 22v9M16 25l-8 6M16 25l8 6M8 16l5-5 5 4 6-7", "detail"),
  ]),
  icon("clipboard", "Clipboard", "notes board record", [
    r(5, 6, 22, 24),
    r(11, 2, 10, 8, 2, "clip"),
    p("M10 16h12M10 22h8"),
  ]),
  icon("checklist", "Checklist", "tasks todo done", [
    r(3, 2, 26, 28),
    p("M7 9l2 2 4-5M16 8h8M7 19l2 2 4-5M16 18h8M16 25h8", "items"),
  ]),
  icon("clock", "Clock", "time schedule hours", [
    c(16, 16, 13, "body", "accent"),
    p("M16 7v10l6 4", "hands"),
  ]),
  icon("timer", "Timer", "stopwatch countdown time", [
    c(16, 19, 11, "body", "accent"),
    p("M16 13v7M12 2h8M16 2v6M24 9l3-3", "detail"),
  ]),
  icon("calendar", "Calendar", "date schedule appointment", [
    r(3, 6, 26, 24),
    p("M3 13h26M10 2v8M22 2v8M9 19h3M20 19h3M9 25h3M20 25h3"),
  ]),
  icon("target", "Target", "goal focus objective", [
    c(16, 16, 13, "outer", "accent"),
    c(16, 16, 8, "middle"),
    c(16, 16, 3, "center", "fill"),
  ]),
  icon("flag", "Flag", "milestone mark report", [
    p("M5 30V3c9-5 12 7 22 1v16c-10 6-13-6-22-1", "body", "accent"),
  ]),
  icon("pin", "Pin", "attach notice thumbtack", [
    p("M10 3h12l-2 11 7 6H5l7-6z", "body", "accent"),
    p("M16 20v11", "needle"),
  ]),
  icon("paperclip", "Paperclip", "attachment link file", [
    p(
      "M12 18 21 9C25 5 30 10 26 14L15 25C8 32 1 22 7 16L19 4C26 0 32 9 27 15L16 27",
    ),
  ]),
  icon("notebook", "Notebook", "journal notes diary", [
    r(7, 2, 22, 28),
    p("M13 2v28M3 7h7M3 14h7M3 21h7M3 28h7M18 9h7M18 14h5"),
  ]),
  icon("briefcase", "Briefcase", "work business office", [
    r(2, 9, 28, 21),
    p("M10 9V3h12v6M2 17c8 6 20 6 28 0", "detail"),
    r(13, 17, 6, 7, 1, "clasp"),
  ]),
  icon("hourglass", "Hourglass", "waiting time sand", [
    p("M7 3h18v5L18 16l7 8v5H7v-5l7-8-7-8z", "body", "accent"),
    p("M5 3h22M5 29h22M11 8h10M11 25l5-5 5 5z", "sand"),
  ]),
  icon("kanban", "Kanban", "project board tasks", [
    r(2, 3, 28, 27),
    r(6, 8, 5, 12, 1, "cards"),
    r(14, 8, 5, 17, 1, "cards"),
    r(22, 8, 4, 8, 1, "cards"),
  ]),
  icon("printer", "Printer", "print office paper", [
    r(2, 10, 28, 16),
    p("M8 10V2h16v8M8 20h16v11H8z", "paper", "accent"),
    c(25, 15, 1, "light", "fill"),
  ]),
  icon("book", "Book", "read knowledge manual", [
    p(
      "M16 7C10 3 5 3 1 5v24c4-2 9-2 15 2 6-4 11-4 15-2V5c-4-2-9-2-15 2z",
      "pages",
      "accent",
    ),
    p("M16 7v24M5 11l7 1M5 17l7 1M21 12l6-1M21 18l6-1", "detail"),
  ]),
];
