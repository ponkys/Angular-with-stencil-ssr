# ConsumerWebPoc

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## How to hack

``` bash
npm install
npm run build:ssr && npm run serve:ssr
```

## Context

this project is consuming stencil web components from `@ponkys/consumer-web-components-test` dependency declared in package json. This includes the `hydrate` folder in the dist (I manually pasted it there). In a stencil project add the following object to the outputTargets array in `stencil.config.js`:

```JavaScript
  {
    type: 'dist-hydrate-script'
  }
```

this hydrate folder exposes `renderToString` and `hydrateDocument` methods that are useful for ssr.

## IMPORTANT PATCH

file `index.js` from `node_modules/@ponkys/consumer-web-components-test/dist/hydrate/index.js` in line 19.

```JavaScript
  const filePath = path.resolve(process.cwd(), `node_modules/@ponkys/consumer-web-components-test/dist/hydrate/app.js`);
```

It seems that Angular universal has wrong node `__dirname` set.
