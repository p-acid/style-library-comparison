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
