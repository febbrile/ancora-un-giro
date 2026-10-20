// Un provino al volo dei disegni di shared.js: `node strumenti/provino.mjs disegno.js uscita.png`.
// disegno.js contiene il corpo di una funzione (G) che restituisce un SVG 1920×1080 (senza il tag <svg>).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const RADICE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME || ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(p => fs.existsSync(p));
const [corpo, uscita] = process.argv.slice(2);
const shared = fs.readFileSync(path.join(RADICE, 'episodi', 'comune', 'shared.js'), 'utf8');
const html = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Fredoka:wght@400;600&display=swap">' +
  '<style>html,body{margin:0;background:#000}</style></head><body><div id="t" style="width:1920px;height:1080px"></div><script>' + shared +
  '</script><script>document.getElementById("t").innerHTML = \'<svg viewBox="0 0 1920 1080" width="1920" height="1080">\' + window.G.defs + (function (G) {' +
  fs.readFileSync(corpo, 'utf8') + '})(window.G) + "</svg>";</script></body></html>';
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const err = [];
page.on('pageerror', e => err.push(String(e)));
await page.setContent(html);
await page.waitForTimeout(800);
await page.screenshot({ path: uscita });
if (err.length) console.log(err.join('\n'));
await browser.close();
console.log(uscita);
