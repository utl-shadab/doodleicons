import { define, p, c, r } from "./helpers.js";
const icon = (
  id: string,
  name: string,
  tags: string,
  shapes: Parameters<typeof define>[4],
) => define("communication", id, name, tags, shapes);
export const communicationIcons = [
  icon("mail", "Mail", "email envelope inbox", [
    r(3, 6, 26, 20),
    p("M4 8l12 10L28 8M4 25l8-9m8 0 8 9"),
  ]),
  icon("chat", "Chat", "message bubble comment", [
    p("M5 5h22v17H14l-9 6z", "body", "accent"),
    p("M10 11h12M10 16h8"),
  ]),
  icon("conversation", "Conversation", "chat discussion replies", [
    p("M3 4h20v14H11l-8 6z", "front", "accent"),
    p("M23 10h6v19l-8-5h-9v-6", "back"),
  ]),
  icon("phone", "Phone", "call telephone contact", [
    p(
      "M8 3 3 7c0 11 11 22 22 22l4-5-7-6-4 4c-5-2-8-5-9-9l4-4z",
      "body",
      "accent",
    ),
  ]),
  icon("video-call", "Video call", "meeting camera conference", [
    r(3, 7, 18, 19),
    p("M21 13l8-5v17l-8-5z", "lens", "accent"),
  ]),
  icon("bell", "Bell", "notification alert sound", [
    p("M6 23c4-4 1-16 10-16s6 12 10 16z", "body", "accent"),
    p("M13 27c1 3 5 3 6 0M16 3v4", "detail"),
  ]),
  icon("user", "User", "person profile account", [
    c(16, 10, 6, "head", "accent"),
    p("M5 29v-3c0-10 22-10 22 0v3", "body", "accent"),
  ]),
  icon("users", "Users", "team group community", [
    c(12, 10, 5, "head", "accent"),
    p("M2 28v-3c0-10 20-10 20 0v3", "body", "accent"),
    p("M23 5c7 0 7 10 0 10M26 19c4 1 5 5 5 9", "friend"),
  ]),
  icon("heart", "Heart", "love like favorite", [
    p("M16 28C-5 15 2-2 16 9 30-2 37 15 16 28Z", "body", "accent"),
  ]),
  icon("thumbs-up", "Thumbs up", "like approve good", [
    r(3, 14, 6, 14),
    p("M9 16l7-13c5 0 5 4 3 10h8c5 0 1 15-2 15H9z", "hand", "accent"),
  ]),
  icon("bookmark", "Bookmark", "save favorite reading", [
    p("M7 3h18v26l-9-6-9 6z", "body", "accent"),
  ]),
  icon("star", "Star", "favorite rating review", [
    p(
      "m16 2 4.4 9 9.6 1.4-7 6.8 1.7 9.6-8.7-4.5-8.7 4.5 1.7-9.6-7-6.8 9.6-1.4z",
      "body",
      "accent",
    ),
  ]),
  icon("mention", "Mention", "at email username", [
    c(16, 16, 6, "body", "accent"),
    p("M22 10v11c9 6 14-19-5-19C-2 2-3 31 20 29", "ring"),
  ]),
  icon("link", "Link", "url connect chain", [
    p(
      "M14 10l4-4c9-8 17 3 10 10l-5 5M18 22l-4 4C5 34-3 23 4 16l5-5M11 21l10-10",
      "chain",
    ),
  ]),
  icon("send", "Send", "paper plane message", [
    p("M2 13 30 3l-8 27-7-11z", "body", "accent"),
    p("M15 19 30 3M15 19l-2 8 5-3", "fold"),
  ]),
  icon("support", "Support", "headset help service", [
    p("M4 19v-4C4 0 28 0 28 15v9c0 5-6 5-10 5", "band"),
    r(3, 14, 6, 10, 3, "earpads"),
    r(23, 14, 6, 10, 3, "earpads"),
  ]),
  icon("contact-card", "Contact card", "id identity profile", [
    r(3, 5, 26, 23),
    c(11, 13, 3, "avatar"),
    p("M6 23c0-7 10-7 10 0M20 11h5M20 16h5M20 21h3"),
  ]),
  icon("megaphone", "Megaphone", "announce broadcast marketing", [
    p("M4 12h7l16-8v23l-16-8H4z", "body", "accent"),
    p("M9 19l3 10h5l-3-9M11 12v7", "handle"),
  ]),
  icon("handshake", "Handshake", "agreement partnership trust", [
    p("M2 13l6-7 6 2 5-2 11 9-5 11-10 3L2 17z", "hands", "accent"),
    p("M14 8 9 14l4 3 5-4 8 8M9 21l6 8M14 20l7 7", "detail"),
  ]),
  icon("inbox", "Inbox", "messages received incoming", [
    p("M8 5h16l6 16v7H2v-7z", "body", "accent"),
    p("M2 21h8l2 4h8l2-4h8M16 7v10m-4-4 4 4 4-4", "detail"),
  ]),
];
