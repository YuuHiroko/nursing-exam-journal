/**
 * Bundles the Vercel Speed Insights package into a single minified file:
 * vendor/speed-insights.min.js. This file is committed so the static
 * gh-pages deploy includes Speed Insights with no runtime CDN dependency.
 *
 * Run: npm run build:si
 */
import { build } from 'esbuild';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outfile = resolve(root, 'vendor/speed-insights.min.js');
mkdirSync(dirname(outfile), { recursive: true });

await build({
  entryPoints: [resolve(root, 'src/speed-insights-entry.js')],
  outfile,
  bundle: true,
  minify: true,
  format: 'esm',
  target: ['es2021'],
  legalComments: 'none',
  logLevel: 'info',
});

console.log('Built', outfile);
