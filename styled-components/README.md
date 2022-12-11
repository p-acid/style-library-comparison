# Setting

> There are no shortcuts. Just follow.

## Packages

```sh
yarn add styled-components
```

> `yarn` 은 `package.json` 에 `resolution` 을 작성하여 여러 버전의 패키지를 설치하는 것을 방지할 수 있습니다.

```json
{
    ...,
    "resolution": {
        "styled-components": "^x"
    }
}
```

## SSR

pre-rendering 전에 html 파일에 스타일 요소를 주입시켜주는 작업을 진행합니다.

- `ServerStyleSheet` 를 생성하고 provider를 react tree에 추가하여 Context API를 통해 스타일 할당
- 해당 세팅은 SWC 기준으로 진행

```tsx
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
```

```js
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
};
```

## Theme & Global Style

> `emotion` 과 유사

# Styling

> 기본적인 활용은 `@emotion/styled` 와 유사
