import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";

globalStyle("html, body", {
  boxSizing: "border-box",
});

export const vars = createGlobalTheme(":root", {
  color: {
    brand: "blue",
  },
  font: {
    body: "arial",
  },
});
