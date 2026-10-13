import { define, p, c, r, e } from "./helpers.js";
const icon = (
  id: string,
  name: string,
  tags: string,
  shapes: Parameters<typeof define>[4],
) => define("commerce", id, name, tags, shapes);
export const commerceIcons = [
  icon("shopping-bag", "Shopping bag", "shop purchase retail", [
    p("M6 10h20l3 19H3z", "body", "accent"),
    p("M11 12V7c0-7 10-7 10 0v5", "handle"),
  ]),
  icon("cart", "Cart", "shopping checkout basket", [
    p("M2 3h4l4 20h16l4-15H7", "body", "accent"),
    c(12, 28, 2, "wheels"),
    c(25, 28, 2, "wheels"),
  ]),
  icon("basket", "Basket", "groceries shopping", [
    p("M3 12h26l-4 16H7z", "body", "accent"),
    p("M9 12l5-9M23 12l-5-9M11 17l1 6M21 17l-1 6M16 17v6", "detail"),
  ]),
  icon("tag", "Tag", "price label deal", [
    p("M3 3h13l14 14-13 13L3 16z", "body", "accent"),
    c(10, 10, 2, "hole"),
  ]),
  icon("coupon", "Coupon", "discount voucher ticket", [
    p("M3 7h26v7c-6 0-6 6 0 6v6H3v-6c6 0 6-6 0-6z", "body", "accent"),
    p("M20 7v4m0 3v4m0 3v5", "perforation"),
  ]),
  icon("gift", "Gift", "present surprise reward", [
    r(2, 11, 28, 6),
    r(5, 17, 22, 12),
    p("M16 11v18M16 11C-4 11 7-7 16 11c20 0 9-18 0 0", "ribbon"),
  ]),
  icon("package", "Package", "box parcel shipping", [
    p("M16 2 30 9v15l-14 7L2 24V9z", "body", "accent"),
    p("M2 9l14 7 14-7M16 16v15M9 5l14 7v7", "tape"),
  ]),
  icon("truck", "Truck", "delivery transport shipping", [
    r(2, 6, 17, 18),
    p("M19 13h7l5 7v4H19z", "cab", "accent"),
    c(8, 26, 3, "wheels"),
    c(25, 26, 3, "wheels"),
  ]),
  icon("wallet", "Wallet", "money balance cash", [
    r(3, 8, 26, 20),
    p("M4 8V5l20-3v6", "back"),
    r(20, 14, 10, 9, 2, "pocket"),
    c(24, 18.5, 0.8, "button", "fill"),
  ]),
  icon("credit-card", "Credit card", "payment debit bank", [
    r(2, 6, 28, 21, 3),
    p("M2 12h28M7 22h6M17 22h3", "detail"),
  ]),
  icon("receipt", "Receipt", "bill expense transaction", [
    p("M6 2l5 3 5-3 5 3 5-3v28l-5-3-5 3-5-3-5 3z", "body", "accent"),
    p("M11 10h10M11 16h10M11 22h5"),
  ]),
  icon("invoice", "Invoice", "bill document payment", [
    p("M5 2h15l7 7v21H5z", "body", "accent"),
    p("M20 2v7h7M11 14h10M11 19h10M11 24h4"),
  ]),
  icon("coins", "Coins", "currency savings money", [
    e(12, 10, 10, 4),
    p("M2 10v13c0 6 20 6 20 0V10M2 16c0 6 20 6 20 0", "stack"),
    p("M23 5c11 0 11 10 0 10M29 10v11c0 3-3 5-6 5", "back"),
  ]),
  icon("bank", "Bank", "institution finance savings", [
    p("M2 11 16 2l14 9z", "roof", "accent"),
    p("M5 14v11M12 14v11M20 14v11M27 14v11M2 29h28M3 25h26", "columns"),
  ]),
  icon("chart", "Chart", "analytics bars growth", [
    p("M3 3v26h27", "axis"),
    r(7, 18, 4, 11, 0, "bars"),
    r(15, 11, 4, 18, 0, "bars"),
    r(23, 5, 4, 24, 0, "bars"),
  ]),
  icon("trending-up", "Trending up", "growth increase profit", [
    p("M3 25 13 15l6 6L29 7M19 7h10v10", "arrow"),
  ]),
  icon("trending-down", "Trending down", "decline decrease loss", [
    p("M3 7 13 17l6-6 10 14M19 25h10V15", "arrow"),
  ]),
  icon("calculator", "Calculator", "math calculate accounting", [
    r(6, 2, 20, 28),
    r(10, 6, 12, 6, 1, "screen"),
    p("M10 17h2M20 17h2M10 22h2M20 22h2M10 27h2M20 26h2"),
  ]),
  icon("percent", "Percent", "discount rate percentage", [
    c(9, 9, 5, "dots", "accent"),
    c(23, 23, 5, "dots", "accent"),
    p("M5 28 27 4", "slash"),
  ]),
  icon("cash", "Cash", "banknote currency money", [
    r(2, 7, 28, 18),
    c(16, 16, 5, "seal", "accent"),
    p(
      "M2 12c3 0 5-2 5-5M25 7c0 3 2 5 5 5M2 20c3 0 5 2 5 5M25 25c0-3 2-5 5-5",
      "corners",
    ),
  ]),
];
