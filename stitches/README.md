# Setting

```sh
# Short way
npx create-next-app --example with-stitches
```

> If you want to add the settings of stitches to cna project, check [this link](https://stitches.dev/blog/using-nextjs-with-stitches)

## Packages

```sh
yarn add @stitches/react
```

## Basic process

- [x] Add Configure file : `stitches.config.ts`
- [x] Add SSR settings in `_document.tsx`
  > 이하 한글로 작성. 원문은 [해당 링크](https://stitches.dev/docs/installation) 확인

# Styling

## Object syntax(객체 구문)

번들 사이즈를 최소화하기 위해, 문자열 구문이 아닌 **객체 구문**을 유지합니다.
아래 예시들을 통해 이를 확인할 수 있습니다.

## Global styles(전역 스타일)

전역 스타일 초기화는 **`globalCss` 함수**를 통해 가능하다.
이는 앱에서 실행하는 새로운 함수를 반환한다.

- `_app` 페이지와 개별 페이지 동시에 반영 가능
  - `_app` 보다 개별 페이지 `globalCss` 가 우선
- `_document` 페이지 내 `globalCss` 는 미반영

## Basic usages(기본 사용법)

- 기본적으로 `emotion` 및 `styled-components` 와 흡사 (방식 생략)
- 추가적으로 다룰 수 있는 기능들만을 작성

```tsx
// stitches
const Button = styled("button", {
  backgroundColor: "gainsboro",
  borderRadius: "9999px",
  fontSize: "13px",
  border: "0",
});
```

```tsx
// emotion and styled-components
const Button = styled.button`
  backgroundcolor: gainsboro;
  borderradius: 9999px;
  fontsize: 13px;
  border: 0;
`;
```

- 위 작성 방식을 확인해보면 **객체 형식**으로 작성된 것을 확인할 수 있음
  - 문자열 구문을 채택하는 타 라이브러리와 구분됨을 확인 가능

### Target a Stitches component(Stitches 컴포넌트 지정)

```ts
const Icon = styled("svg", {
  display: "inline-block",
  marginLeft: "5px",
  width: "16px",
});

const Button = styled("button", {
  // base styles

  [`& ${Icon}`]: {
    marginLeft: "5px",
  },
});

() => (
  <Button>
    Button
    <Icon>...</Icon>
  </Button>
);
```

### Target a React component(리액트 컴포넌트 지정)

- `toString` 메서드를 활용하여 추가 가능
  - 의도한 셀렉터와 매칭하기 위해 필요

```ts
const RightArrow = () => (
  <svg className="right-arrow" ... />
);

// add a `toString` method
RightArrow.toString = () => '.right-arrow';

const Button = styled('button', {
  // base styles

  [`& ${RightArrow}`]: {
    display: 'inline-block',
    marginLeft: '5px',
    width: '16px',
  },
});

() => <Button>Button <RightArrow /></Button>;
```

### Import rules(`@import`)

- `globalCss` 에서 사용 가능

```ts
const globalStyles = globalCss({
  "@import": "custom.css", // single
  "@import": ["custom1.css", "custom2.css"], // multiple
});
```

### Font face rules(`@font-face`)

- `globalCss` 에서 사용 가능

```ts
const globalStyles = globalCss({
  // single
  "@font-face": {
    fontFamily: "CustomFont",
    src: 'local("CustomFont"), url("CustomFont.woff2")',
  },

  // multiple
  "@font-face": [
    {
      fontFamily: "CustomFont1",
      src: 'local("CustomFont1"), url("CustomFont1.woff2")',
    },
    {
      fontFamily: "CustomFont2",
      src: 'local("CustomFont2"), url("CustomFont2.woff2")',
    },
  ],
});
```

### Supports rules(`@supports`)

- `globalCss`, `styled`, `css` 에서 사용 가능

```ts
const globalStyles = globalCss({
  "@supports (display: grid)": {
    body: {
      display: grid,
    },
  },
});

const Grid = styled("div", {
  "@supports (display: grid)": {
    display: grid,
  },
});
```

### Token aware values(토큰 사용)

- 속성과 토큰을 매핑하여 `$` 접두사를 통해 토큰 값을 사용할 수 있음

```ts
import { createStitches } from "@stitches/react";

const { styled } = createStitches({
  theme: {
    colors: {
      blue: "royalblue",
    },
  },
});

const Button = styled("button", {
  backgroundColor: "$blue",
});
```

### Token aware values(토큰 사용)

- 속성과 토큰을 매핑하여 `$` 접두사를 통해 토큰 값을 사용할 수 있음
- 지역 스코프로 지정 가능
- 스케일 접두사로도 지정 가능

```ts
import { createStitches } from "@stitches/react";

const { styled } = createStitches({
  theme: {
    colors: {
      blue: "royalblue",
    },
  },
});

const Button = styled("button", {
  backgroundColor: "$blue",

  // 지역 스코프
  $$shadow: "blueviolet",
  boxShadow: "0 0 0 3px $$shadow",

  // 스케일 접두사 지정
  marginTop: "$sizes$1",

  // 지역 스코프 + 스케일 접두사 지정
  $$shadowColor: "$colors$purple500",
  boxShadow: "0 0 0 15px $$shadowColor",
});
```

### Theme specific styles(테마별 스타일)

- 동적으로 생성된 테마별로 스타일링 가능
- 테마는 클래스명을 반환하기에 `.` 접두사를 꼭 붙여서 사용

```ts
import { createStitches } from "@stitches/react";

const { styled, createTheme } = createStitches({
  theme: {},
});

const myTheme = createTheme({});

const Button = styled("button", {
  borderRadius: "9999px",
  fontSize: "13px",
  border: "0",

  [`.${myTheme} &`]: {
    backgroundColor: "$blue",
  },
});

() => (
  <div className={myTheme}>
    <Button>Button</Button>
  </div>
);
```
