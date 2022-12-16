<h1 align="center">Why we use stitches? 🤔</h1>

> 디자인시스템에 stitches 라이브러리를 적용하기 위한 타당성을 확보하고, 변경이 불필요하다는 이유 또한 도출하여 과투자를 방지하고자 합니다.
> 작성 사항에 오류가 있거나, 이에 대한 의견과 같은 사항들을 환영합니다.

<br/>

# Environment

| Package           | Version |
| ----------------- | ------- |
| stitches          | 1.2.8   |
| @emotion/react    | 11.10.5 |
| styled-components | 5.3.6   |

# Differences

> 개인적으로 느낀 차이에 대해 기술합니다. 다소 객관적이지 않을 수 있습니다.
>
> - 다소 익숙하지 않은 stitches의 세부 설명이 포함되기에 상대적으로 stitches에 대한 기술이 많을 수 있습니다.
> - Emotion과 Styled components가 다소 유사한 점을 고려하여 공동으로 작성되는 부분이 많습니다.
> - 되도록 공식 문서를 기준으로 했으며, 추가적인 방법론들을 레퍼런스를 통해 참고했습니다.

## Syntax

> 전반적인 스타일링 코드 작성 방식 차이를 요약하여 기술했습니다.

### stitches

객체 형태의 작성 방식을 채택합니다.

- 번들 사이즈를 최소화 하기 위함이라고 합니다.

```ts
const Button = styled("button", {
  backgroundColor: "gainsboro",
  borderRadius: "9999px",
  fontSize: "13px",
  border: "0",
});
```

### emotion & styled

문자열 작성 방식과 객체 작성 방식을 혼용할 수 있습니다.

- `css` prop과의 호환성을 향상 시켜줍니다.
- 성능에 대한 별도의 언급은 없습니다.

```ts
// string
const BoxByString = styled.div`
  background: palevioletred;
  height: 50px;
  width: 50px;
`;

// object
const BoxByString = styled.div(({ theme }) => ({
  background: "palevioletred",
  height: "50px",
  width: "50px",
  color: theme.colors.red,
}));
```

## Theming

> 라벨링 된 스타일 값을 활용하기 위한 설정 차이를 기술했습니다.

### stitches

`stitches.config.ts` 파일에 `createStitches` 를 활용하여 일괄적으로 작성합니다.

- 별도 Provider 필요 없이 테마가 적용됩니다.
- 테마, 반응형, 유틸, 테마맵 등을 활용할 수 있습니다.

```ts
// stitches.config.ts

export const { styled, createTheme, getCssText, ...rest } = createStitches({
  /**
   * theme, media, utils, themeMap ...
   */
});
```

### emotion & styled-components

`theme.ts` 파일을 생성하고 `<ThemeProvider>` 를 통해 전달합니다.

```ts
// theme.ts

import { Theme } from "@emotion/react";

const theme: Theme = {
  // theme
};

export default theme;
```

```ts
// _app.tsx

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
```

## Variants

> 상황별로 스타일링의 변화를 줄 수 있는 방식의 차이를 기술했습니다.

### stitches

라이브러리 내 Variant API를 활용하여 구현할 수 있습니다.

- `variants` 라는 `key` 를 통해 작성할 수 있습니다.
- [Multiple variants](https://github.com/p-acid/why-we-use-stitches/tree/main/stitches#multiple-variants%EB%B3%B5%EC%88%98-%EB%B6%84%EA%B8%B0)가 가능합니다.
- [`boolean` 값 핸들링](https://github.com/p-acid/why-we-use-stitches/tree/main/stitches#boolean-variants%EB%B6%88%EB%A6%AC%EC%96%B8-%EB%B6%84%EA%B8%B0) 또한 가능합니다.
- [Variant 합성을 통한 작업](https://github.com/p-acid/why-we-use-stitches/tree/main/stitches#compound-variants%EB%B6%84%EA%B8%B0-%EB%82%B4-%EC%8A%A4%ED%83%80%EC%9D%BC-%ED%95%A9%EC%84%B1)도 가능합니다.
- 이외 [기본 variant 설정](https://github.com/p-acid/why-we-use-stitches/tree/main/stitches#default-variants%EA%B8%B0%EB%B3%B8-%EB%B6%84%EA%B8%B0), [반응형 분기](https://github.com/p-acid/why-we-use-stitches/tree/main/stitches#responsive-variants%EB%B0%98%EC%9D%91%ED%98%95-%EB%B6%84%EA%B8%B0) 등도 가능합니다.

```ts
// 기본 variant 사용법

const Button = styled("button", {
  // base styles

  variants: {
    color: {
      violet: {
        backgroundColor: "blueviolet",
        color: "white",
        "&:hover": {
          backgroundColor: "darkviolet",
        },
      },
      gray: {
        backgroundColor: "gainsboro",
        "&:hover": {
          backgroundColor: "lightgray",
        },
      },
    },
  },
});
```

### emotion & styled-components

`css` 함수를 통해 분기별 스타일링 값들을 객체 형태로 작성할 수 있습니다.

```ts
// css 스타일링 객체 생성 예시

// 1. variant 별 style 객체 생성
const style = {
  white: css`
    background-color: white;
  `,
  red: css`
    background-color: red;
  `,
  blue: css`
    background-color: blue;
  `,
};

// 2. 해당 컴포넌트에 스타일 분기 추가

const Button = styled.button<{ color?: string }>`
  background-color: black; ${/* Default set */}

  ${({ color }) => style[color]}
`;
```

## Responsive

> 화면 사이즈 분기별 반응형 스타일링을 구현하기 위한 방식 차이를 기술했습니다.

### stitches

[Theming](https://github.com/p-acid/why-we-use-stitches#theming) 파트에서 언급한 `createStitches` 함수를 통해 반응형 분기를 결정할 수 있고, 이를 `@` 접두사와 함께 활용할 수 있습니다.

```ts
// 반응형 분기 설정

export const { styled, css } = createStitches({
  media: {
    bp1: "(min-width: 640px)",
    bp2: "(min-width: 768px)",
    bp3: "(min-width: 1024px)",
  },
});
```

```ts
// 활용 예시

const Button = styled("button", {
  // base styles

  variants: {
    color: {
      violet: {},
      gray: {},
    },
  },
});

() => (
  <Button
    color={{
      "@initial": "gray", // 반응형 적용 전 초기 상태
      "@bp2": "violet", // bp2 분기 적용
    }}
  >
    Button
  </Button>
);
```

### emotion & styled-components

CSS 미디어 쿼리를 사용하는 방식과 동일합니다.

> 경우에 따라 `react-responsive` 라이브러리를 겸용하여 활용할 수 있습니다.
>
> `facepoint` 라이브러를 통해 분기에 따른 스타일 작성을 효율적으로 작성할 수도 있습니다.

```tsx
// 기본 사용법

import { css } from "@emotion/react";

render(
  <p
    css={css`
      font-size: 30px;
      @media (min-width: 420px) {
        font-size: 50px;
      }
    `}
  >
    Some text!
  </p>
);
```

```tsx
// 재사용 가능한 미디어 쿼리 활용 방법

import { css } from "@emotion/react";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

render(
  <div>
    <div
      css={{
        color: "green",
        [mq[0]]: {
          color: "gray",
        },
        [mq[1]]: {
          color: "hotpink",
        },
      }}
    >
      Some text!
    </div>
  </div>
);
```

## Overriding

> 특정 컴포넌트 오버라이드를 구현하기 위한 방식의 차이를 기술했습니다.

### stitches

공식 문서 기준 `css` prop을 통해 스타일 오버라이드가 가능하다고 합니다.

- `styled` 함수의 첫 번째 인자로 컴포넌트(일반, 스티치 모두)를 지정하여 오버라이드 할 수 있습니다.
- 또한, `as` prop을 통해 컴포넌트의 렌더링 DOM을 변경할 수도 있습니다.

```tsx
// css prop 오버라이드

() => (
  <Button
    as="div"
    css={{
      borderRadius: "0",
      "&:hover": {
        backgroundColor: "black",
        color: "white",
      },
    }}
  >
    Button
  </Button>
);
```

```tsx
// styled 오버라이드

const Button = styled("button", {
  ...
});

const OverridedButton = styled(Button, {
  backgroundColor: "red",
});
```

### emotion & styled-components

`style` prop을 통한 오버라이드와 `styled` 함수에서 타 컴포넌트를 지정하여 오버라이드 하는 것 또한 가능합니다.

- `as` prop을 통한 렌더링 DOM 변경 또한 가능합니다.

```tsx
const Button = styled.button`
  background-color: red;
`;

const OverridedButton = styled(Button)`
  background-color: blue;
`;

export default function Example() {
  return (
    <>
      <Button style={{ backgroundColor: "violet" }}>Button</Button>
      <OverridedButton as="div">Button</OverridedButton>
    </>
  );
}
```

## Selector

> 공통적으로 활용할 수 있는 Nested Selector 작성 방식의 차이를 기술했습니다.
>
> 기본적인 CSS Selector를 지원합니다.

### stitches

타 컴포넌트를 `string` 변환을 통해 지정할 수 있습니다.

```tsx
const Button = styled("button", {
  ...
});

const NestWrapper = styled("div", {
  [`${Button}`]: {
    color: "white",
    background: "Blue",
  },
});

export default function Example() {
  return (
    <NestWrapper>
      <Button color="green">Button</Button>
    </NestWrapper>
  );
}
```

### emotion & styled-components

`string` 작성 방식에서 템플릿 리터럴 내 변수 작성 방식으로 추가할 수 있습니다.

- 객체 작성 방식의 경우 stitches와 동일합니다.

```tsx
const Button = styled.button`
  ...
`;

const NestWrapper = styled.div`
  ${Button} {
    color: white;
    background: green;
  }
`;

export default function Example() {
  return (
    <NestWrapper>
      <Button>Button</Button>
    </NestWrapper>
  );
}
```

# References

## Docs

- [Stitches Docs](https://stitches.dev/docs/installation)
- [Emotion Docs](https://emotion.sh/docs/introduction)
- [Styled components Docs](https://styled-components.com/docs)

## Blog

- [SOSOLOG : Design System Decision Record](https://so-so.dev/react/design-system-decision-record/)
- [SOSOLOG : CSS-in-JS, 무엇이 다른가요?](https://so-so.dev/web/css-in-js-whats-the-defference/)
  - css-in-js의 발전 요약
  - run-time과 zero-runtime의 동작 방식 차이
  - Atomic CSS 맛보기
  - stitches.js의 near-zero-runtime
- [JBEE.io : Headless UI Library란?](https://jbee.io/react/headless-concept/)
  - Headless?
  - Why Headless?

## Presentation

- [slideshare : 이번 생에 디자인 시스템은 처음이라](https://www.slideshare.net/NaverEngineering/ss-248549018)
- [Youtube : feconf - 디자인 시스템, 형태를 넘어서](https://www.youtube.com/watch?v=21eiJc90ggo)
