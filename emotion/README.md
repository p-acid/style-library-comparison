# Setting

> There are no shortcuts. Just follow.

## Packages

```sh
yarn add @emotion/styled @emotion/react

# babel 사용할 경우
yarn add -D @emotion/babel-plugin
```

## Transplier

### Babel

```json
// .babelrc

{
  "presets": ["next/babel", "@emotion/babel-preset-css-prop"],
  "plugins": []
}
```

### SWC

```js
const nextConfig = {
  ...,

  compiler: {
    emotion: true,
  },
};
```

## Global styles

- `css` 함수를 통해 가능

```ts
export const gloabl = css`
  ...
`;
```

## SSR

> Vanilla Emotion 혹은 10 이전의 버전을 사용하는 경우 별도의 셋팅이 필요하지만, 그 이후의 버전에서는 Next.js의 경우 별도 셋팅이 필요 없습니다.

# The css Prop

- Babel Preset과 JSX Pragma 두 가지 방식이 있음
- 기존에 Babel을 사용하는 경우 프리셋을 추가하여 진행
- 이외의 경우엔 JSX Pragma 사용

```json
// .babelrc

{
  "presets": ["@emotion/babel-preset-css-prop"]
}
```

## Usage

- 객체 형식, 문자열 형식으로 사용 가능

```tsx
// Object styles

render(
  <div
    css={{
      backgroundColor: "hotpink",
      "&:hover": {
        color: "lightgreen",
      },
    }}
  >
    This has a hotpink background.
  </div>
);
```

```tsx
// String styles

import { css } from "@emotion/react";

const color = "darkgreen";

render(
  <div
    css={css`
      background-color: hotpink;
      &:hover {
        color: ${color};
      }
    `}
  >
    This has a hotpink background.
  </div>
);
```

> @emotion의 css는 계산된 클래스명을 반환하지 않습니다.

# Variants

공식 문서에서 variant를 위한 별도의 공식 답안이 없지만, 다음과 같이 표현할 수 있음.

```tsx
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
