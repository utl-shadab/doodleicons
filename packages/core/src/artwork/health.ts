import { define, p, c, r } from "./helpers.js";
const icon = (
  id: string,
  name: string,
  tags: string,
  shapes: Parameters<typeof define>[4],
) => define("health", id, name, tags, shapes);
export const healthIcons = [
  icon("heart-pulse", "Heart pulse", "health heartbeat medical", [
    p("M16 28C-5 15 2-2 16 9 30-2 37 15 16 28Z", "heart", "accent"),
    p("M3 16h7l3-6 5 12 3-6h8", "pulse"),
  ]),
  icon("activity", "Activity", "pulse fitness movement", [
    p("M1 17h8l5-14 6 26 5-12h6", "pulse"),
  ]),
  icon("water", "Water", "hydration liquid drop", [
    p("M16 2C11 9 4 16 4 22c0 12 24 12 24 0 0-6-7-13-12-20Z", "body", "accent"),
    p("M8 23c0 3 2 4 5 4", "shine"),
  ]),
  icon("bottle", "Bottle", "drink hydration water", [
    r(12, 2, 8, 5, 1, "cap"),
    p("M12 7v5l-4 5v12h16V17l-4-5V7z", "body", "accent"),
    p("M8 20h16M8 24h16", "label"),
  ]),
  icon("leaf", "Leaf", "plant organic wellbeing", [
    p("M28 2C2 2-1 19 9 26 20 34 31 17 28 2Z", "body", "accent"),
    p("M3 31 22 10M9 24v-9M15 18h9", "veins"),
  ]),
  icon("sleep", "Sleep", "rest bedtime night", [
    p("M4 15h24v14M4 9v20M4 24h24M9 15v-5h8v5", "bed", "accent"),
    p("M20 2h8l-8 7h8", "dream"),
  ]),
  icon("apple", "Apple", "fruit food nutrition", [
    p("M16 12C-3 1 1 28 11 30l5-2 5 2c10-2 14-29-5-18Z", "fruit", "accent"),
    p("M16 12V6M16 6c1-5 8-5 8-5 0 6-8 5-8 5", "leaf"),
  ]),
  icon("dumbbell", "Dumbbell", "gym strength workout", [
    r(2, 8, 6, 17, 1, "weights"),
    r(24, 8, 6, 17, 1, "weights"),
    p("M8 14h16v5H8M2 12H0m30 0h2", "bar"),
  ]),
  icon("running", "Running", "exercise sport movement", [
    c(21, 5, 3, "head", "accent"),
    p("M8 16l5-7 6 4-3 7 7 5v6M19 13l5 4 5-2M16 20l-6 7H3", "body"),
  ]),
  icon("bicycle", "Bicycle", "cycling exercise bike", [
    c(7, 23, 6, "wheels"),
    c(25, 23, 6, "wheels"),
    p("M7 23l7-12 6 12H7M25 23 19 5h6M10 8h7M14 11h8", "frame"),
  ]),
  icon("medical-cross", "Medical cross", "hospital first aid", [
    p("M11 3h10v8h8v10h-8v8H11v-8H3V11h8z", "body", "accent"),
  ]),
  icon("pill", "Pill", "medicine medication capsule", [
    p("M5 15 15 5c9-9 21 3 12 12L17 27C8 36-4 24 5 15Z", "body", "accent"),
    p("M10 10l12 12", "division"),
  ]),
  icon("bandage", "Bandage", "injury plaster healing", [
    p("M3 18 18 3c5-5 16 6 11 11L14 29C9 34-2 23 3 18Z", "body", "accent"),
    p("M10 11l11 11M11 10l11 11", "pad"),
    c(14, 18, 0.7, "holes", "fill"),
    c(18, 14, 0.7, "holes", "fill"),
  ]),
  icon("stethoscope", "Stethoscope", "doctor examination medical", [
    p(
      "M4 3v10c0 12 16 12 16 0V3M2 3h5M17 3h5M12 22c0 13 17 11 17 1v-4",
      "tube",
    ),
    c(28, 15, 3, "chestpiece", "accent"),
  ]),
  icon("thermometer", "Thermometer", "temperature fever medical", [
    p("M12 19V6c0-6 8-6 8 0v13a6 6 0 1 1-8 0Z", "body", "accent"),
    p("M16 10v15M23 7h5M23 13h3", "scale"),
    c(16, 25, 2, "mercury", "fill"),
  ]),
  icon("meditation", "Meditation", "mindfulness calm yoga", [
    c(16, 6, 4, "head", "accent"),
    p(
      "M10 14l-3 8H2M22 14l3 8h5M12 17v6L4 28c9 4 15 3 24 0l-8-5v-6M10 30l8-3",
      "body",
    ),
  ]),
  icon("coffee", "Coffee", "drink cafe break", [
    p("M4 11h19v9c0 12-19 12-19 0z", "cup", "accent"),
    p(
      "M23 13h3c7 0 5 9-3 9M3 30h22M9 7c-4-2 4-3 0-6M17 7c-4-2 4-3 0-6",
      "detail",
    ),
  ]),
  icon("utensils", "Utensils", "food restaurant dining", [
    p("M4 2v9c0 7 8 7 8 0V2M8 2v28M24 2c-7 5-7 13 0 13v15M24 2v13", "cutlery"),
  ]),
  icon("first-aid", "First aid", "emergency kit medical", [
    r(3, 8, 26, 21),
    p("M10 8V3h12v5", "handle"),
    p("M13 13h6v4h4v5h-4v4h-6v-4H9v-5h4z", "cross"),
  ]),
  icon("tooth", "Tooth", "dental dentist care", [
    p(
      "M16 5C-4-5 3 16 6 27c3 10 7-7 10-7s7 17 10 7C29 16 36-5 16 5Z",
      "body",
      "accent",
    ),
    p("M10 5c2 3 6 4 10 3", "detail"),
  ]),
];
