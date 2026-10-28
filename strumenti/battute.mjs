// Le battute di un episodio con le loro finestre nel tempo vero del film, in JSON:
//   node strumenti/battute.mjs <episodio>
// Le legge dalle scene (G.sottotitolo e G.subs, come controlla.mjs) e porta le finestre dal tempo interno al tempo
// vero con il RITMO di shared.js, sommando l'inizio della scena:
// { scene: [{ id, battute: [{ chi, testo, da, a }] }] }, con `da` e `a` in secondi dall'inizio del film.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RADICE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
globalThis.window = {};
new Function(fs.readFileSync(path.join(RADICE, 'episodi', 'comune', 'shared.js'), 'utf8'))();
const G = globalThis.window.G;

const ep = process.argv[2];
if (!ep) { console.error('uso: node strumenti/battute.mjs <episodio>'); process.exit(2); }
const dir = path.join(RADICE, 'episodi', ep, 'modules');
const scene = JSON.parse(fs.readFileSync(path.join(dir, 'scenes.json'), 'utf8')).scenes;
const code = ep.slice(0, 2);
const svela = s => s.replace(/\\(.)/g, '$1');
let inizio = 0;
const out = { episodio: ep, scene: [] };
for (const s of scene) {
  const src = fs.readFileSync(path.join(dir, 'scene-' + s.id + '.js'), 'utf8');
  const testi = [...src.matchAll(/G\.sottotitolo\('(NARRATORE|ADA|CUSTODE)', '((?:[^'\\]|\\.)*)'\)/g)].map(m => ({ chi: m[1], testo: svela(m[2]) }));
  const fin = /G\.subs\(kit, (\[\[.*?\]\])\)/.exec(src);
  const finestre = fin ? JSON.parse(fin[1]) : [];
  if (testi.length !== finestre.length) { console.error(s.id + ': ' + testi.length + ' sottotitoli ma ' + finestre.length + ' finestre'); process.exit(1); }
  const vero = x => Math.round((inizio + G.reale(code, s.id, x)) * 100) / 100;
  out.scene.push({ id: s.id, battute: testi.map((x, i) => ({ chi: x.chi, testo: x.testo, da: vero(finestre[i][0]), a: vero(finestre[i][1]) })) });
  inizio += s.dur;
}
console.log(JSON.stringify(out, null, 1));
