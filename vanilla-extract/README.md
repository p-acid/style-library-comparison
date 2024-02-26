# Installation

```sh
npm install @vanilla-extract/css
```

## Vite

```sh
npm install --save-dev @vanilla-extract/vite-plugin
```

```ts
// vite.config.ts
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default {
  plugins: [
    vanillaExtractPlugin({
      // configuration
    }),
  ],
};
```

# Concept

> Zero-runtime Stylesheets in TypeScript.

- [Type-safe](https://en.wikipedia.org/wiki/Type_safety) Static CSS
- First-class theming
- Framework agnostic
- Built for extension

> [!TIP]
> 위 내용은 공식 문서 [메인 페이지](https://vanilla-extract.style/)를 참조했습니다.

## My Summary

- 타입 안정성이 보장된 정적 CSS를 TypeScript를 통해 활용할 수 있는 라이브러리
- *Use TypeScript as your preprocessor*의 의미
  - TypeScript를 통해 작성된 스타일링 구문을 런타임이 아닌 컴파일 단계에서 처리하도록 한다는 뜻으로 해석
- 여러 번들링 툴에 호환되기에 프레임워크에 구애받지 않는다.

# Overview

- 스타일시트 확장자를 `.css.ts` 로 설정하여 작성한다.
- 작성된 스타일 객체를 `import` 하여 사용한다.

## Styling

- 스타일링은 기본적으로 **스타일 객체**를 통해 작성한다.

> [!NOTE]
>
> **왜 스타일 객체인가?**
>
> 스타일 객체로 작성되면 나머지 애플리케이션 코드와 마찬가지로 타입이 지정된 데이터 구조이기에 TypeScript를 더 잘 사용할 수 있고, 이를 통해 타입 안정성과 자동 완성을 보장할 수 있다.

- [카멜 케이스를 통해 CSS 속성을 작성한다.](https://vanilla-extract.style/documentation/styling/#css-properties)
- [단위를 작성하지 않으면 기본 단위를 `px` 로 간주한다.](https://vanilla-extract.style/documentation/styling/#unitless-properties)
- [플랫폼 별 CSS 속성(e.g. `-webkit-tap-highlight-color`)을 사용하려면 하이픈(`-`)을 제거하고 파스칼 케이스로 작성한다.](https://vanilla-extract.style/documentation/styling/#vendor-prefixes)
- [`vars` 키를 통해 CSS 변수를 설정할 수 있다.](https://vanilla-extract.style/documentation/styling/#css-variables)
  - `createVar` 를 통해 생성된 CSS 변수도 허용한다.
- [`@media` 키를 통해 미디어 쿼리를 사용할 수 있다.](https://vanilla-extract.style/documentation/styling/#media-queries)
  - 미디어 쿼리는 파일의 마지막에 렌더링하기에, 미디어 쿼리 내부의 스타일의 우선순위를 앞으로 유지해준다.
- 선택자는 간단한 선택자와 복잡한 선택자를 두 가지 방법으로 구현할 수 있다.
  - [간단한 선택자는 별도의 파라미터 없이 최상위 레벨에서 사용하며, CSS 속성 및 CSS 변수만 포함될 수 있다.](https://vanilla-extract.style/documentation/styling/#simple-pseudo-selectors)
  - [복잡한 선택자는 `selectors` 키를 사용하여 가능하다.](https://vanilla-extract.style/documentation/styling/#complex-selectors)
    - 유지 및 관리에 용이하기 위해 단일 요소만을 대상으로 지정할 수 있기에 본인 지정자(`&`) 만을 대상으로 한다.
    - 다른 범위의 클래스를 참조하는 것은 가능하며, 이를 대상으로 하기 위해선 해당 클래스의 스타일 객체 내에서 정의해야 한다.
    - 현재 요소 내 하위 노드를 전역적으로 지정하기 위해선 `globalStyle` 을 사용한다.
  - [선택자가 서로 종속된 경우엔 getter를 사용하여 정의할 수 있다.](https://vanilla-extract.style/documentation/styling/#complex-selectors)
- [컨테이너 쿼리는 미디어 쿼리와 동일하게 동작하며 `@container` 키를 통해 사용한다.](https://vanilla-extract.style/documentation/styling/#container-queries)
  - `createContainer` 를 통해 범위가 지정된 컨테이너를 만들 수도 있다.
- [`@layer` 키를 통해 레이어에 스타일을 할당할 수 있다. (미디어 쿼리와 동일하게 동작)](https://vanilla-extract.style/documentation/styling/#layers)
  - `@layer` 키는 layer API를 통해 생성된 범위가 지정된 레이어 참조도 가능하다.
- [`@supports` 키를 통해 서포트 쿼리를 사용할 수 있다. (미디어 쿼리와 동일하게 동작)](https://arc.net/l/quote/omjjtdcd)
- [특정 브라우저에서 호환되지 않는 CSS 속성 값을 대체하기 위해 배열 형태로 값을 작성하여 Fallback을 구현할 수 있다.](https://vanilla-extract.style/documentation/styling/#fallback-styles)
