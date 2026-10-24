// Controlla le uscite sopra la vasca (G.giro7) di un episodio: Ada deve pescare dopo che sono cadute tutte le paperelle.
//   node strumenti/giri.mjs 10-la-frase-del-parco …
// Serve `npm install` in strumenti/ (playwright-core) e il Chrome di sistema, come fotogrammi.mjs.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const RADICE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME || ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(p => fs.existsSync(p));
const TIPI = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const srv = await new Promise(ok => {
  const s = http.createServer((req, res) => {
    const f = path.join(RADICE, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!f.startsWith(RADICE) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': TIPI[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  s.listen(0, '127.0.0.1', () => ok(s));
});
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
let male = 0;
for (const ep of process.argv.slice(2)) {
  await page.goto('http://127.0.0.1:' + srv.address().port + '/strumenti/fotogramma.html?ep=' + ep);
  await page.waitForFunction(() => window.pronto || window.errore, null, { timeout: 30000 });
  const righe = await page.evaluate(() => {
    const out = [];
    window.film.scene.forEach(s => {
      const d = s.def || {};
      Object.keys(d).forEach(k => {
        const v = d[k], lista = Array.isArray(v) ? v : [v];
        lista.forEach((g, i) => {
          if (!g || !g.cade || !g.t || !g.t.pesca) return;
          const ultima = Math.max(...g.cade);
          out.push({ scena: s.id, chi: k + (Array.isArray(v) ? '[' + i + ']' : ''), ultima: +ultima.toFixed(2), giu: g.t.pesca.giu });
        });
      });
    });
    return out;
  });
  console.log(ep);
  righe.forEach(r => {
    const ok = r.ultima + 0.3 <= r.giu;
    if (!ok) male++;
    console.log('  ' + (ok ? '✓' : '✗') + ' ' + r.scena + ' ' + r.chi + ': l\'ultima paperella cade a ' + r.ultima + ', Ada pesca a ' + r.giu);
  });
}
await browser.close(); srv.close();
process.exit(male ? 1 : 0);
