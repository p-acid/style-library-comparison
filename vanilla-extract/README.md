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
