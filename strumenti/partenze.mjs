// Controlla che l'audio segua le partenze dei treni: per ogni treno che entra nella montagna, la catena (tick) suona
// finché la coda non è in cima alla salita, e un whoosh accompagna l'ingresso nella bocca.
//   node strumenti/partenze.mjs [episodio …]      (senza episodi: tutti)
// Serve `npm install` in strumenti/ (playwright-core) e il Chrome di sistema, come fotogrammi.mjs.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const RADICE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME || ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(p => fs.existsSync(p));
const TIPI = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const episodi = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(path.join(RADICE, 'episodi')).filter(d => /^\d\d-/.test(d)).sort();
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

// Nel browser: segue ogni treno (i vagoni con lo stesso genitore) sulla pista di partenza, un fotogramma ogni decimo di
// secondo, e trova gli ingressi nella montagna; poi raccoglie i tick e i whoosh della partitura nella stessa scena.
function misura() {
  const PASSO = 0.1, giri = [];
  window.film.scene.forEach(s => {
    window.vai(s.inizio + 0.01);
    const sc = document.querySelector('.scena.attiva');
    const p = sc && [...sc.querySelectorAll('path')].find(e => /partenza/.test(e.getAttribute('class') || ''));
    if (!p) return;
    const L = p.getTotalLength(), pts = [];
    for (let x = 0; x <= L; x += 4) { const q = p.getPointAtLength(x); pts.push([x, q.x, q.y]); }
    // I piedi della salita (la pista comincia a salire rispetto alla banchina) e la cima (il punto più alto).
    const sal = pts.find(q => q[2] < pts[0][2] - 6)[0], cima = pts.reduce((a, b) => b[2] < a[2] ? b : a)[0];
    // Dove sta un vagone sulla pista di partenza; null se non ci sta (per esempio sulla pista d'arrivo).
    const dove = v => {
      const m = /translate\(([-\d.]+) ([-\d.]+)\)/.exec(v.getAttribute('transform') || '');
      if (!m) return null;
      let b = null, d = 1e9;
      pts.forEach(q => { const dd = (q[1] - m[1]) ** 2 + (q[2] - m[2]) ** 2; if (dd < d) { d = dd; b = q[0]; } });
      return d < 64 ? b : null;
    };
    // Se un punto della pista si vede nell'inquadratura (lo schermo è 1920×1080).
    const stage = document.getElementById('stage').getBoundingClientRect();
    // Non basta che stia nello schermo: davanti può esserci un'altra immagine (la casa col telefono, il quaderno). Il
    // primo elemento non trasparente in quel punto deve essere del mondo (la camera che contiene la pista).
    const camera = p.parentElement;
    // Un velo semitrasparente (una luce, un'ombra) non copre: conta solo quello che è quasi opaco.
    const opaco = el => {
      let a = +(getComputedStyle(el).fillOpacity || 1);
      for (let e = el; e && e !== document.body; e = e.parentElement) a *= +getComputedStyle(e).opacity * +(e.getAttribute('opacity') || 1);
      return a >= 0.6;
    };
    const siVede = x => {
      const q = p.getPointAtLength(x), m = p.getScreenCTM(), sx = m.a * q.x + m.c * q.y + m.e, sy = m.b * q.x + m.d * q.y + m.f;
      if (sx <= stage.left || sx >= stage.left + 1920 || sy <= stage.top || sy >= stage.top + 1080) return false;
      const sopra = document.elementsFromPoint(sx, sy).find(e => sc.contains(e) && !e.closest('.sott') && opaco(e));
      return !sopra || camera.contains(sopra);
    };
    const tracce = new Map(), campo = [];
    for (let t = 0; t < s.durata; t += PASSO) {
      window.vai(s.inizio + t);
      campo.push({ bocca: siVede(L - 20), salita: siVede((sal + cima) / 2) });
      const visti = new Map();
      sc.querySelectorAll('.g-vag').forEach(v => {
        if (+(v.getAttribute('opacity') || 1) <= 0.05 || v.parentElement.closest('[opacity="0"]')) return;
        const x = dove(v);
        if (x === null) return;
        const g = visti.get(v.parentElement) || { testa: -1, coda: 1e9 };
        g.testa = Math.max(g.testa, x); g.coda = Math.min(g.coda, x);
        visti.set(v.parentElement, g);
      });
      sc.querySelectorAll('.g-vag').forEach(v => { if (!tracce.has(v.parentElement)) tracce.set(v.parentElement, []); });
      tracce.forEach((tr, el) => tr.push([t, visti.get(el) || null]));
    }
    // Un ingresso: la testa arriva alla bocca (o ci sparisce dentro) dopo essere stata lontana. Prima di ogni ingresso
    // si guarda quando la coda è passata dai piedi della salita alla cima.
    [...tracce.values()].forEach((tr, n) => {
      let lontano = true, da = 0;
      tr.forEach(([t, g], i) => {
        if (!g) return;
        if (g.testa < L - 300) lontano = true;
        if (!lontano || g.testa < L - 120) return;
        lontano = false;
        // Con un treno lungo la coda arriva in cima anche dopo che la testa è entrata: si guarda fino a quando è tutto dentro.
        const k = j => Math.round(j / PASSO), fine = tr.findIndex((q, j) => j > i && !q[1]), dentro = tr[fine];
        const prima = tr.slice(da, fine < 0 ? tr.length : fine).filter(q => q[1]);
        const piedi = prima.find(q => q[1].coda >= sal), su = prima.find(q => q[1].coda >= cima);
        giri.push({ scena: s.id, inizio: s.inizio, treno: n + 1, bocca: +t.toFixed(1), dentro: dentro ? +dentro[0].toFixed(1) : +t.toFixed(1), siVede: campo[k(t)].bocca,
          sale: piedi && su ? [+piedi[0].toFixed(1), +su[0].toFixed(1)] : null, saleSiVede: piedi && su ? campo.slice(k(piedi[0]), k(su[0]) + 1).some(c => c.salita) : false, da: +tr[da][0].toFixed(1) });
        da = i + 1;
      });
    });
  });
  const suoni = window.film.partitura.eventi.filter(e => e.patch === 'tick' || e.patch === 'whoosh').map(e => ({ t: e.t, dur: e.dur || 0, patch: e.patch }));
  return { giri, suoni };
}

let male = 0;
for (const ep of episodi) {
  await page.goto('http://127.0.0.1:' + srv.address().port + '/strumenti/fotogramma.html?ep=' + ep);
  await page.waitForFunction(() => window.pronto || window.errore, null, { timeout: 30000 });
  const { giri, suoni } = await page.evaluate(misura);
  console.log(ep);
  if (!giri.length) console.log('  (nessun treno entra nella montagna)');
  giri.forEach(g => {
    const T = x => g.inizio + x, rel = x => +(x - g.inizio).toFixed(1);
    const problemi = [];
    // Il whoosh: comincia al più 4 s prima che la testa arrivi alla bocca e prima che la coda sia dentro, e suona ancora
    // a un secondo dalla bocca.
    const w = suoni.find(e => e.patch === 'whoosh' && e.t >= T(g.bocca) - 4 && e.t <= T(Math.max(g.dentro, g.bocca + 0.3)) && e.t + e.dur >= T(g.bocca) - 1);
    if (!w && g.siVede) problemi.push('nessun whoosh all\'ingresso');
    // La catena: se la salita della coda si vede (non è un salto fuori campo), suona fino a poco prima della cima.
    let catena = '';
    if (g.sale && g.saleSiVede && g.sale[1] - g.sale[0] >= 0.6) {
      const tick = suoni.filter(e => e.patch === 'tick' && e.t >= T(g.da) && e.t <= T(g.sale[1]) + 0.5);
      const ultimo = tick.length ? rel(tick.at(-1).t) : null;
      catena = ', la coda in cima a ' + g.sale[1] + ' s' + (ultimo !== null ? ', ultima catena a ' + ultimo + ' s' : '');
      if (ultimo === null || ultimo < g.sale[1] - 1.2) problemi.push('la catena smette prima che la coda sia in cima');
    }
    if (problemi.length) male++;
    console.log('  ' + (problemi.length ? '✗' : '✓') + ' ' + g.scena + ', treno ' + g.treno + ': entra a ' + g.bocca + ' s' + (g.siVede ? '' : ' (fuori campo)') +
      (w ? ', whoosh a ' + rel(w.t) + ' s' : '') + catena + (problemi.length ? ' — ' + problemi.join('; ') : ''));
  });
}
await browser.close(); srv.close();
process.exit(male ? 1 : 0);
