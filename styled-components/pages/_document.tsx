import { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

const MyDocument = (props: any) => {
  const { emotionStyleTags } = props;

  return (
    <Html lang="ko">
      <Head>{emotionStyleTags}</Head>
      <body>
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;

export const getInitialProps = async (ctx: DocumentContext): Promise<any> => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [initialProps.styles, sheet.getStyleElement()],
    };
  } finally {
    sheet.seal();
  }
};
