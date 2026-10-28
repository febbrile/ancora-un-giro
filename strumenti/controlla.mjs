// Controlla gli episodi senza aprirli: `node strumenti/controlla.mjs [episodio…]`.
//
// Per ogni scena legge i sottotitoli (G.sottotitolo) e le loro finestre (G.subs) e verifica:
// - al massimo 12 caratteri al secondo;
// - finestre dentro la durata della scena, e almeno 3 secondi di sole immagini;
// - il ritmo (RITMO in shared.js): nessun tratto veloce sotto un sottotitolo; dopo l'ultima battuta (o il cartello,
//   se la scena ne ha uno: const XX_TITOLO / XX_FINE) al massimo 3 secondi prima dello stacco;
// - nessun pezzo di sottotitolo che finisce con un articolo, una preposizione, una congiunzione o un apostrofo;
// - l'episodio sotto i 5 minuti, senza contare la scena `coda`, che da sola sta sotto 1 minuto;
// - nessun numero a schermo nei sottotitoli.
//
// Poi controlla il sito: ogni episodio in sito/episodi.json, nella sua stagione, con i campi della scheda e un volto
// che sito/sito.js sa disegnare; ogni lezione di sito/lezioni.json con il suo file.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RADICE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CPS = 12, PAUSA = 3, MAX = 300, MAX_CODA = 60, CODA = 3.0;
const comune = f => fs.readFileSync(path.join(RADICE, 'episodi', 'comune', f), 'utf8');
globalThis.window = {};
new Function(comune('shared.js'))();
const G = globalThis.window.G;
const WEAK = new Set('il lo la i gli le un uno una di a da in con su per tra fra del dello della dei degli delle al allo alla ai agli alle dal dallo dalla dai dagli dalle nel nello nella nei negli nelle sul sullo sulla sui sugli sulle e ed o ma che se come non mi ti si ci vi ne è suo sua suoi sue mio mia tuo tua quel quella questo questa ogni più'.split(' '));

let errori = 0;
const male = m => { errori++; console.log('  ✗ ' + m); };
const eps = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(path.join(RADICE, 'episodi')).filter(d => /^\d\d-/.test(d)).sort();
for (const ep of eps) {
  const dir = path.join(RADICE, 'episodi', ep, 'modules');
  const scene = JSON.parse(fs.readFileSync(path.join(dir, 'scenes.json'), 'utf8')).scenes;
  const tot = scene.filter(x => x.id !== 'coda').reduce((s, x) => s + x.dur, 0), durCoda = scene.filter(x => x.id === 'coda').reduce((s, x) => s + x.dur, 0), code = ep.slice(0, 2);
  console.log('\n' + ep + ' · ' + Math.floor(tot / 60) + ':' + (tot % 60).toFixed(1).padStart(4, '0') + (durCoda ? ' · coda ' + durCoda + ' s' : ''));
  if (tot > MAX) male('più di 5 minuti');
  if (durCoda > MAX_CODA) male('coda più lunga di 1 minuto');
  for (const s of scene) {
    const file = path.join(dir, 'scene-' + s.id + '.js');
    if (!fs.existsSync(file)) { male('manca scene-' + s.id + '.js'); continue; }
    const src = fs.readFileSync(file, 'utf8');
    const testi = [...src.matchAll(/G\.sottotitolo\('(NARRATORE|ADA|CUSTODE)', '((?:[^'\\]|\\.)*)'\)/g)].map(m => ({ chi: m[1], testo: m[2] }));
    const fin = /G\.subs\(kit, (\[\[.*?\]\])\)/.exec(src);
    const finestre = fin ? JSON.parse(fin[1]) : [];
    if (testi.length !== finestre.length) { male(s.id + ': ' + testi.length + ' sottotitoli ma ' + finestre.length + ' finestre'); continue; }
    let detto = 0, ultima = 0;
    // Le finestre sono in tempo interno: il ritmo le porta al tempo vero.
    const vero = x => G.reale(code, s.id, x);
    testi.forEach((x, i) => {
      const [a, b] = finestre[i], n = x.testo.length, cps = n / (b - a);
      detto += b - a;
      ultima = Math.max(ultima, vero(b));
      if (Math.abs(vero(b) - vero(a) - (b - a)) > 0.02) male(s.id + ': un tratto veloce sotto «' + x.testo.slice(0, 40) + '…»');
      if (cps > CPS) male(s.id + ': «' + x.testo.slice(0, 40) + '…» ' + cps.toFixed(1) + ' car/s (servono ' + (n / CPS).toFixed(1) + ' s, ne ha ' + (b - a).toFixed(1) + ')');
      if (a < 0 || vero(b) > s.dur) male(s.id + ': finestra ' + a + '–' + b + ' fuori dalla scena (' + s.dur + ' s)');
      if (/\d/.test(x.testo)) male(s.id + ': un numero nel sottotitolo «' + x.testo + '»');
      G.chunkSub(x.testo).forEach(c => {
        const w = c.split(' ').pop().toLowerCase().replace(/[«"]/g, '');
        if (WEAK.has(w) || /['’]$/.test(w)) male(s.id + ': il pezzo «' + c + '» finisce con «' + w + '»');
        if (c.length > 48) male(s.id + ': il pezzo «' + c + '» è più lungo di 48 caratteri');
      });
    });
    if (s.dur - detto < PAUSA) male(s.id + ': meno di ' + PAUSA + ' s di sole immagini');
    const cartello = /const \w+_(?:TITOLO|FINE) = ([\d.]+);/.exec(src);
    if (cartello) ultima = Math.max(ultima, vero(+cartello[1]) + 1.2);
    const coda = s.dur - ultima;
    if (coda > CODA) male(s.id + ': ' + coda.toFixed(1) + ' s dopo l\'ultima battuta (al massimo ' + CODA + '): accelera la fine nel RITMO');
    console.log('  ✓ ' + s.id.padEnd(14) + String(s.dur).padStart(4) + ' s · ' + testi.length + ' battute · ' + (s.dur - detto).toFixed(1) + ' s di sole immagini · coda ' + coda.toFixed(1) + ' s');
  }
}
// Il sito: ogni episodio sta in sito/episodi.json, nella sua stagione, con tutto quello che serve alla sua scheda.
console.log('\nsito/episodi.json');
new Function(fs.readFileSync(path.join(RADICE, 'sito', 'sito.js'), 'utf8'))();
const Sito = globalThis.window.Sito;
const stagioni = JSON.parse(fs.readFileSync(path.join(RADICE, 'sito', 'episodi.json'), 'utf8'));
const sulSito = new Set();
if (!Array.isArray(stagioni) || !stagioni.length) male('episodi.json deve essere una lista di stagioni');
else stagioni.forEach((s, k) => {
  const nome = 'stagione ' + (s.n ?? '?');
  if (s.n !== k + 1) male(nome + ': le stagioni vanno numerate 1, 2, 3… nell’ordine dell’elenco');
  if (!s.titolo) male(nome + ': manca il titolo');
  if (!Array.isArray(s.episodi) || !s.episodi.length) { male(nome + ': nessun episodio'); return; }
  s.episodi.forEach((e, i) => {
    const chi = nome + ', ' + (e.cartella || 'episodio ' + i);
    ['n', 'cartella', 'titolo', 'racconto', 'personaggio'].forEach(c => { if (e[c] === undefined || e[c] === '') male(chi + ': manca «' + c + '»'); });
    if (i > 0 && e.n !== s.episodi[i - 1].n + 1) male(chi + ': i numeri degli episodi devono seguire quelli prima');
    if (e.personaggio && !Sito.PERSONAGGI.includes(e.personaggio)) male(chi + ': il personaggio «' + e.personaggio + '» non ha un volto in sito/sito.js (' + Sito.PERSONAGGI.join(', ') + ')');
    if (sulSito.has(e.cartella)) male(chi + ': compare due volte');
    sulSito.add(e.cartella);
    if (e.cartella && !fs.existsSync(path.join(RADICE, 'episodi', e.cartella, 'modules', 'scenes.json'))) male(chi + ': non trovo episodi/' + e.cartella + '/modules/scenes.json');
  });
  console.log('  ✓ ' + (s.titolo || nome) + ' · ' + (s.episodi || []).length + ' episodi');
});
fs.readdirSync(path.join(RADICE, 'episodi')).filter(d => /^\d\d-/.test(d)).forEach(d => { if (!sulSito.has(d)) male('episodi/' + d + ' non è in sito/episodi.json'); });
const lezioni = JSON.parse(fs.readFileSync(path.join(RADICE, 'sito', 'lezioni.json'), 'utf8'));
lezioni.forEach(l => { if (!fs.existsSync(path.join(RADICE, 'sito', 'lezioni', l.file + '.md'))) male('sito/lezioni.json: non trovo sito/lezioni/' + l.file + '.md'); });
console.log('  ✓ ' + lezioni.length + ' lezioni in sito/lezioni.json');

console.log(errori ? '\n' + errori + ' problemi' : '\nTutto a posto.');
process.exit(errori ? 1 : 0);
