// Rende i fotogrammi di un episodio in PNG, con il motore del sito e il Chrome installato.
//
//   node strumenti/fotogrammi.mjs 00-premi-invio 1 5.5 12          → fotogrammi/00-premi-invio/t_001.00.png …
//   node strumenti/fotogrammi.mjs 00-premi-invio --scena volo        → inizio, ogni 2 s e fine della scena
//   node strumenti/fotogrammi.mjs 00-premi-invio --ogni 4 --foglio   → tutto il film ogni 4 s, in un foglio di provini
//   node strumenti/fotogrammi.mjs --tavola personaggi                → la tavola (personaggi, oggetti, mondo)
//
// Opzioni: --foglio (un foglio di provini con i tempi), --scala 0.5 (riduce i PNG), --passo 2 (per --scena).
// Serve `npm install` in strumenti/ (playwright-core). Chrome: $CHROME, altrimenti quello di sistema.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const RADICE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME || [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium',
].find(p => fs.existsSync(p));
const TIPI = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml' };

const argv = process.argv.slice(2);
const opz = k => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : undefined; };
const ha = k => argv.includes(k);
const tavola = opz('--tavola');
const ep = tavola ? null : argv[0];
const scala = parseFloat(opz('--scala') || '1');

function server() {
  return new Promise(ok => {
    const s = http.createServer((req, res) => {
      const u = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      const f = path.join(RADICE, u);
      if (!f.startsWith(RADICE) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'Content-Type': TIPI[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      fs.createReadStream(f).pipe(res);
    });
    s.listen(0, '127.0.0.1', () => ok(s));
  });
}

const fmt = t => 't_' + t.toFixed(2).padStart(6, '0');

async function main() {
  if (!CHROME) throw new Error('Non trovo Chrome: indica il percorso con CHROME=/percorso/chrome');
  const srv = await server();
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: scala });
  const errori = [];
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errori.push(m.text()); });
  page.on('pageerror', e => errori.push(String(e)));
  try {
    if (tavola) {
      await page.goto(base + '/strumenti/tavola.html?tav=' + tavola);
      await page.waitForFunction(() => window.pronto, null, { timeout: 20000 });
      const out = path.join(RADICE, 'fotogrammi', 'tavola-' + tavola + '.png');
      fs.mkdirSync(path.dirname(out), { recursive: true });
      await page.locator('#t').screenshot({ path: out });
      console.log(out);
      return;
    }
    await page.goto(base + '/strumenti/fotogramma.html?ep=' + ep);
    await page.waitForFunction(() => window.pronto || window.errore, null, { timeout: 30000 });
    const err = await page.evaluate(() => window.errore);
    if (err) throw new Error(err);
    const info = await page.evaluate(() => ({ durata: window.film.durata, scene: window.film.scene.map(s => ({ id: s.id, inizio: s.inizio, durata: s.durata })) }));
    let tempi = argv.slice(1).filter((a, i, A) => !a.startsWith('--') && !(A[i - 1] || '').startsWith('--')).map(Number).filter(x => isFinite(x));
    const sc = opz('--scena');
    if (sc) {
      const s = info.scene.find(x => x.id === sc);
      if (!s) throw new Error('Scena sconosciuta: ' + sc + ' (ci sono: ' + info.scene.map(x => x.id).join(', ') + ')');
      const passo = parseFloat(opz('--passo') || '2');
      for (let t = 0.3; t < s.durata - 0.2; t += passo) tempi.push(+(s.inizio + t).toFixed(2));
      tempi.push(+(s.inizio + s.durata - 0.15).toFixed(2));
    }
    if (opz('--ogni')) { const p = parseFloat(opz('--ogni')); for (let t = 0.5; t < info.durata; t += p) tempi.push(+t.toFixed(2)); }
    const cartella = path.join(RADICE, 'fotogrammi', ep);
    fs.mkdirSync(cartella, { recursive: true });
    const fatti = [];
    for (const t of tempi) {
      const id = await page.evaluate(t => window.vai(t), t);
      const f = path.join(cartella, fmt(t) + '.png');
      await page.locator('#stage').screenshot({ path: f });
      fatti.push({ t, f, id });
    }
    if (ha('--foglio') && fatti.length) {
      const col = fatti.length > 9 ? 4 : 3, w = 1920 / col;
      const html = '<body style="margin:0;background:#111;font:20px sans-serif;color:#eee;display:grid;grid-template-columns:repeat(' + col + ',1fr);gap:6px;padding:6px;width:1920px;box-sizing:border-box">' +
        fatti.map(x => '<figure style="margin:0"><img style="width:100%;display:block" src="' + base + '/fotogrammi/' + ep + '/' + path.basename(x.f) + '"><figcaption style="padding:2px 4px">' + x.t.toFixed(2) + ' s · ' + x.id + '</figcaption></figure>').join('') + '</body>';
      const p2 = await browser.newPage({ viewport: { width: 1920, height: 400 } });
      await p2.setContent(html);
      await p2.waitForLoadState('networkidle');
      const f = path.join(cartella, 'foglio' + (sc ? '-' + sc : '') + '.png');
      await p2.screenshot({ path: f, fullPage: true });
      console.log(f);
    } else fatti.forEach(x => console.log(x.f, x.id));
  } finally {
    if (errori.length) console.log('Messaggi della pagina:\n  ' + [...new Set(errori)].join('\n  '));
    await browser.close();
    srv.close();
  }
}
main().catch(e => { console.error(e.message || e); process.exit(1); });
