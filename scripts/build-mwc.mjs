/**
 * Bundles the locally-installed Material Web components (only those
 * imported by src/material-web-entry.js) into a single minified, self-
 * registering file: vendor/material-web.min.js. That file is committed
 * so the static gh-pages deploy ships Material Design 3 with no CDN.
 *
 * Run: npm run build:mwc
 */
import { build } from 'esbuild';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outfile = resolve(root, 'vendor/material-web.min.js');
mkdirSync(dirname(outfile), { recursive: true });

await build({
  entryPoints: [resolve(root, 'src/material-web-entry.js')],
  outfile,
  bundle: true,
  minify: true,
  format: 'esm',
  target: ['es2021'],
  legalComments: 'none',
  logLevel: 'info',
});

console.log('Built', outfile);
