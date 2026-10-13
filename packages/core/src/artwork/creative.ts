import { define, p, c, r } from "./helpers.js";
const icon = (
  id: string,
  name: string,
  tags: string,
  shapes: Parameters<typeof define>[4],
) => define("creative", id, name, tags, shapes);
export const creativeIcons = [
  icon("image", "Image", "photo picture landscape", [
    r(3, 4, 26, 24),
    c(11, 11, 3, "sun"),
    p("M4 25l9-10 6 6 5-5 5 6", "mountains"),
  ]),
  icon("camera", "Camera", "photo photography capture", [
    p("M3 9h7l3-5h7l3 5h6v19H3z", "body", "accent"),
    c(16, 18, 6, "lens"),
    c(25, 13, 1, "flash", "fill"),
  ]),
  icon("video", "Video", "film recording movie", [
    r(4, 3, 24, 26),
    p(
      "M9 3v26M23 3v26M4 9h5m14 0h5M4 16h5m14 0h5M4 23h5m14 0h5M13 11l7 5-7 5z",
      "film",
    ),
  ]),
  icon("play", "Play", "start media player", [
    p("M9 3 29 16 9 29z", "body", "accent"),
  ]),
  icon("pause", "Pause", "stop wait media", [
    r(7, 4, 6, 24, 1),
    r(20, 4, 6, 24, 1),
  ]),
  icon("stop", "Stop", "end playback square", [r(5, 5, 22, 22, 3)]),
  icon("music", "Music", "note audio melody", [
    p("M13 24V7l15-4v17M13 12l15-4", "stem"),
    c(8, 25, 5, "notes", "accent"),
    c(23, 21, 5, "notes", "accent"),
  ]),
  icon("headphones", "Headphones", "music listen audio", [
    p("M5 18v-4C5-1 27-1 27 14v4", "band"),
    r(3, 15, 7, 14, 3, "earpads"),
    r(22, 15, 7, 14, 3, "earpads"),
  ]),
  icon("microphone", "Microphone", "voice podcast recording", [
    r(11, 2, 10, 20, 5),
    p("M6 15v3c0 12 20 12 20 0v-3M16 27v4M11 31h10", "stand"),
  ]),
  icon("volume", "Volume", "sound speaker audio", [
    p("M3 11h6l9-8v26l-9-8H3z", "body", "accent"),
    p("M23 11c4 3 4 7 0 10M27 6c7 6 7 14 0 20", "waves"),
  ]),
  icon("mute", "Mute", "silent sound off", [
    p("M3 11h6l9-8v26l-9-8H3z", "body", "accent"),
    p("M23 12l7 8M30 12l-7 8", "cross"),
  ]),
  icon("palette", "Palette", "art colors painting", [
    p("M16 2C-3 2-3 30 16 30c6 0 2-8 6-9 15-1 12-19-6-19Z", "body", "accent"),
    c(9, 10, 2, "paint"),
    c(8, 20, 2, "paint"),
    c(18, 7, 2, "paint"),
    c(25, 13, 2, "paint"),
  ]),
  icon("pen-tool", "Pen tool", "vector bezier design", [
    p("M16 2 3 22l9 8h8l9-8z", "nib", "accent"),
    c(16, 19, 3, "hole"),
    p("M16 2v14M12 30v-5h8v5", "detail"),
  ]),
  icon("brush", "Brush", "paint art draw", [
    p("M13 17 25 2l5 5-15 13z", "handle", "accent"),
    p("M13 17c-9-4-5 10-12 11 12 6 17-4 14-8", "bristles", "accent"),
  ]),
  icon("layers", "Layers", "stack arrange depth", [
    p("M16 2 31 10 16 18 1 10z", "top", "accent"),
    p("M3 17l13 7 13-7M3 24l13 7 13-7", "stack"),
  ]),
  icon("crop", "Crop", "resize trim image", [
    p("M8 2v22h22M2 8h22v22M14 18 29 3", "frame"),
  ]),
  icon("scissors", "Scissors", "cut trim split", [
    c(8, 8, 5, "handles", "accent"),
    c(8, 25, 5, "handles", "accent"),
    p("M12 11l17 17M12 22 29 3", "blades"),
  ]),
  icon("typography", "Typography", "font text letter", [
    p("M3 8V4h26v4M16 4v25M10 29h12", "letter"),
  ]),
  icon("color-drop", "Color drop", "ink paint swatch", [
    p("M16 2C10 12 4 15 4 21c0 14 24 14 24 0 0-6-6-9-12-19Z", "body", "accent"),
    p("M9 21c0 4 3 5 5 5", "shine"),
  ]),
  icon("clapperboard", "Clapperboard", "cinema film production", [
    r(3, 12, 26, 17),
    p("M3 12 1 6l26-5 2 6z", "top", "accent"),
    p("M8 5l4 5M18 3l4 5M3 18h26", "stripes"),
  ]),
];
