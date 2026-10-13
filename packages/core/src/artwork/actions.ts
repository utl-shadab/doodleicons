import { define, p, c, r } from "./helpers.js";
const icon = (
  id: string,
  name: string,
  tags: string,
  shapes: Parameters<typeof define>[4],
) => define("actions", id, name, tags, shapes);
export const actionIcons = [
  icon("add", "Add", "plus new create", [
    c(16, 16, 12, "body", "accent"),
    p("M9 16h14M16 9v14", "symbol"),
  ]),
  icon("remove", "Remove", "minus subtract", [
    c(16, 16, 12, "body", "accent"),
    p("M9 16h14", "symbol"),
  ]),
  icon("check", "Check", "done success tick", [p("M5 16l7 8L27 7", "tick")]),
  icon("check-circle", "Check circle", "success complete verified", [
    c(16, 16, 12, "body", "accent"),
    p("M9 16l5 5 9-10", "tick"),
  ]),
  icon("warning", "Warning", "alert caution danger", [
    p("M16 4 2 27h28z", "body", "accent"),
    p("M16 12v7", "mark"),
    c(16, 23, 0.7, "mark", "fill"),
  ]),
  icon("info", "Information", "about notice help", [
    c(16, 16, 12, "body", "accent"),
    p("M14 15h2v8h3", "mark"),
    c(16, 10, 0.7, "mark", "fill"),
  ]),
  icon("help", "Help", "question support answer", [
    c(16, 16, 12, "body", "accent"),
    p("M12 11c0-5 9-5 9 0 0 4-5 4-5 8", "mark"),
    c(16, 24, 0.7, "mark", "fill"),
  ]),
  icon("edit", "Edit", "pencil write change", [
    p("M5 21 22 4l6 6-17 17-7 1z", "body", "accent"),
    p("M18 8l6 6M5 21l6 6", "detail"),
  ]),
  icon("trash", "Trash", "delete bin remove", [
    p("M7 10l1 18h16l1-18", "body", "accent"),
    p("M4 9h24M12 9V4h8v5M13 14v9M19 14v9", "detail"),
  ]),
  icon("save", "Save", "disk store commit", [
    p("M5 4h18l5 5v19H5z", "body", "accent"),
    p("M10 4v9h12V4M10 28V18h13v10", "detail"),
  ]),
  icon("copy", "Copy", "duplicate clipboard", [
    r(10, 10, 18, 18),
    p("M22 10V4H4v18h6", "back"),
  ]),
  icon("paste", "Paste", "clipboard insert", [
    r(6, 7, 21, 22),
    r(11, 3, 10, 7, 2, "clip"),
    p("M12 16h9M12 22h6"),
  ]),
  icon("download", "Download", "export get file", [
    p("M16 3v17m-6-6 6 6 6-6", "arrow"),
    p("M5 21v7h22v-7", "tray", "accent"),
  ]),
  icon("upload", "Upload", "import send file", [
    p("M16 21V3m-6 6 6-6 6 6", "arrow"),
    p("M5 21v7h22v-7", "tray", "accent"),
  ]),
  icon("share", "Share", "connect distribute send", [
    c(7, 16, 4, "nodes", "accent"),
    c(25, 6, 4, "nodes", "accent"),
    c(25, 26, 4, "nodes", "accent"),
    p("M10 14l11-6M10 18l11 6", "connections"),
  ]),
  icon("undo", "Undo", "revert backward", [
    p("M4 6v9h9M4 15c6-15 24-10 24 2 0 7-6 11-14 10"),
  ]),
  icon("redo", "Redo", "repeat forward", [
    p("M28 6v9h-9M28 15C22 0 4 5 4 17c0 7 6 11 14 10"),
  ]),
  icon("sync", "Sync", "refresh reload repeat", [
    p("M5 14C5 3 23 1 27 12m0-8v8h-8M27 18C27 29 9 31 5 20m0 8v-8h8"),
  ]),
  icon("eye", "Eye", "view visible preview", [
    p("M2 16S7 6 16 6s14 10 14 10-5 10-14 10S2 16 2 16Z", "body", "accent"),
    c(16, 16, 5, "pupil"),
  ]),
  icon("archive", "Archive", "store box history", [
    r(3, 4, 26, 7),
    p("M6 11v17h20V11", "body", "accent"),
    p("M12 17h8", "handle"),
  ]),
];
