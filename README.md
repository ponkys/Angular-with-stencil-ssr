# ConsumerWebPoc

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## How to hack

``` bash
npm install
npm run build:ssr && npm run serve:ssr
```

## Question: how to render a stencil component in server-side

Stencil component is working properly with javascript but not without. When inspecting the html string returned by the angular universal engine the component is visible but with no content inside.

there are some commented options that I have tried with no success in `server.ts`. The hydrate folder is included in the npm package to have access to hydrateDocument and renderToString methods.
