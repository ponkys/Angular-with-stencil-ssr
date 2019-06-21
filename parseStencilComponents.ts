import { renderToString } from '@ponkys/consumer-web-components-test/dist/hydrate';
import * as express from 'express';

export function parseStencilComponents(res: express.Response): (err?: Error, html?: string) => void {
  return async (err: any, html) => {
    if (err) {
      console.log(`Error in ngExpressEngine: ${err}`);
      res.sendStatus(500);
    }
    try {
      const stencilSSR = await renderToString(html);
      res.send(stencilSSR.html);
    } catch (error) {
      console.log(`Error in stencil renderToString: ${error}`);
      res.sendStatus(500);
    }
  };
}
