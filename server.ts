import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine, RenderOptions } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';


import * as express from 'express';
import { join } from 'path';

// tests
import { renderToString, hydrateDocument } from './hydrate/index';
import * as domino from 'domino';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

const eng = ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
});

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Server static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req: express.Request, res: express.Response) => {
  eng(
    'src/index.html',
    {
      req
    } as RenderOptions,
    async (err: any, html) => {
      try {
        // not working
        // using domino to pass a document to hydrateDocument
        const fakeWindow = domino.createWindow(html);
        const doc = fakeWindow.document;
        const a = await hydrateDocument(doc);
        if (a.diagnostics[0].level === 'error') {
          throw new Error(`Error: ${a.diagnostics[0].header}`);
        }
        res.send(a);
      } catch (error) {
        console.log(error);
        res.send(html);
      }
    }
  );
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
