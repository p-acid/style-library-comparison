import React from "react";
import { Global, ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";

import { global } from "../styles/global";
import theme from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={global} />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
