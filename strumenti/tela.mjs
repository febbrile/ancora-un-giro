// Genera la tela di design (artboard .dc.html) dagli stessi disegni dei film: `node strumenti/tela.mjs`.
// Scrive design/project/canvas.json e una tavola per file. Le tavole sono SVG statici: per cambiare un personaggio
// si cambia episodi/comune/shared.js e si rigenera la tela.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RADICE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(RADICE, 'design', 'project');
globalThis.window = {};
new Function(fs.readFileSync(path.join(RADICE, 'episodi', 'comune', 'shared.js'), 'utf8'))();
const G = globalThis.window.G, C = G.C, D = G.MOD.mare, P = D.passeggeri;

const at = (x, y, s, svg) => '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + svg + '</g>';
const et = (x, y, t, chiaro, size) => '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="' + (size || 22) + '" fill="' + (chiaro ? C.crema : C.inchiostro) + '">' + t + '</text>';
const titolo = t => '<text x="60" y="84" font-family="Fredoka, sans-serif" font-weight="600" font-size="46" fill="' + C.inchiostro + '">' + t + '</text>';
const pannello = (x, y, w, h) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="24" fill="' + C.notte2 + '"/>';
// In un artboard ogni elemento non vuoto va chiuso: <circle …/> diventa <circle …></circle>.
const chiudi = s => s.replace(/<([a-zA-Z]+)((?:\s[^<>]*?)?)\/>/g, '<$1$2></$1>');

function tavole() {
  const T = {};
  // I personaggi.
  let s = '<rect width="1920" height="1080" fill="#F3EADB"/>' + titolo('Ancora un giro · i personaggi');
  s += pannello(40, 120, 900, 520);
  s += at(70, 170, 1.2, G.emma(P.Emma.biglietto)) + at(330, 170, 1.2, G.emma(P.Emma.dopo_fili)) + at(590, 170, 1.2, G.emmaTirata(P.Emma.tratti[0])) + at(800, 300, 0.7, G.emma(P.Emma.tratti[2]));
  s += et(190, 610, 'Emma · biglietto', true) + et(450, 610, 'dopo i fili', true) + et(700, 610, 'tirata via', true) + et(870, 610, 'uscita', true);
  s += pannello(980, 120, 900, 520);
  s += at(1010, 240, 1.3, G.al(P.Al.biglietto)) + at(1290, 230, 1.3, G.mare(P.mare.biglietto)) + at(1580, 270, 1.5, G.paperella(D.nuovo.nuota, { glow: true }));
  s += et(1140, 610, 'Al', true) + et(1420, 610, 'Mare', true) + et(1660, 610, 'il passeggero nuovo', true);
  const pose = [['base', 'base'], ['quaderno', 'felice'], ['striscia', 'sorpresa'], ['pesca', 'chiusi'], ['disegna', 'pensa']];
  pose.forEach((p, i) => { s += at(60 + i * 250, 660, 1.12, G.ada(p[0], p[1], { testo: 'Al mare Emma' })) + et(175 + i * 250, 1060, 'Ada · ' + p[0]); });
  D.vasca.forEach((v, i) => { s += at(1340 + (i % 5) * 110, 700 + Math.floor(i / 5) * 160, 0.9, G.paperella(v[2])) + et(1385 + (i % 5) * 110, 806 + Math.floor(i / 5) * 160, v[0], false, 20); });
  T['Main.dc.html'] = { titolo: 'I personaggi', w: 1920, h: 1080, svg: s };
  // Gli oggetti.
  s = '<rect width="1920" height="1080" fill="#F3EADB"/>' + titolo('Ancora un giro · gli oggetti');
  s += at(60, 120, 1.4, G.spezzaparole({ forbice: 1, aghi: -30 })) + at(400, 120, 1.4, G.spezzaparole({ forbice: 0, aghi: 40, bocca: 1 }));
  s += et(220, 570, 'lo Spezzaparole') + et(560, 570, 'mentre taglia');
  s += at(760, 150, 1.4, G.biglietto('Al')) + at(760, 260, 1.4, G.biglietto('mare')) + at(760, 370, 1.4, G.biglietto('Emma')) + at(760, 480, 1.3, G.striscia('Al mare Emma'));
  s += pannello(1060, 110, 820, 470);
  s += at(1090, 280, 1.0, G.vagone({ primo: true, sbarra: 1 }, G.passeggero('al', P.Al.biglietto))) + at(1350, 280, 1.0, G.vagone({ sbarra: 1 }, G.passeggero('mare', P.mare.biglietto))) + at(1610, 280, 1.0, G.vagone({ sbarra: 1 }, G.passeggero('emma', P.Emma.biglietto)));
  s += et(1470, 560, 'il trenino: nessuno alla guida', true);
  s += at(60, 620, 0.62, G.telefono({ messaggi: ['Al mare Emma'], rispostaTesto: 'nuota' })) + at(320, 620, 0.62, G.telefono({ scritto: 'Al mare Em', cursore: true }));
  s += at(1040, 640, 1.0, G.vagone({ sbarra: 0 }, G.passeggero('paperella', D.nuovo.nuota))) + et(1160, 860, 'il vagone nuovo');
  s += '<g transform="translate(1600 770)">' + G.insegna('Ancora un giro', 520, 150, 0) + '</g>';
  s += '<g transform="translate(1600 950)">' + G.insegna('Fine', 300, 110, 0) + '</g>';
  T['Oggetti.dc.html'] = { titolo: 'Gli oggetti', w: 1920, h: 1080, svg: s };
  // Il luna park: la stazione, il treno fermo, Ada e lo Spezzaparole.
  const treno = G.treno([{ tipo: 'al', col: P.Al.biglietto }, { tipo: 'mare', col: P.mare.biglietto }, { tipo: 'emma', col: P.Emma.biglietto }], { sbarra: 1 });
  const M = G.MONDO;
  const vag = treno.split('<g class="g-vag"').slice(1).map((v, i) => '<g transform="translate(' + (M.fermo + i * M.passo) + ' 852) scale(' + M.scala + ') translate(-120 -150)"' + v.replace(/^ data-i="\d+">/, '>'));
  s = G.mondo() + vag.join('') +
    '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
    '<g transform="' + G.posaAda(M.ada[0], M.ada[1]) + '">' + G.ada('base', 'felice') + '</g>';
  T['LunaPark.dc.html'] = { titolo: 'Il luna park', w: 1920, h: 1080, svg: s };
  // Dentro la montagna: i fili di luce del primo tratto.
  const tipi = ['al', 'mare', 'emma'];
  const pesi = [[0, 0, P.Al.fili.Al], [1, 0, P.mare.fili.Al], [1, 1, P.mare.fili.mare], [2, 0, P.Emma.fili.Al], [2, 1, P.Emma.fili.mare], [2, 2, P.Emma.fili.Emma]];
  let fili = '';
  pesi.forEach(([i, j, w]) => {
    let d;
    if (i === j) d = G.anello(i, tipi[i]);
    else { const a = G.cima(i, tipi[i]), b = G.cima(j, tipi[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 80 - 0.12 * Math.abs(a[0] - b[0]); d = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
    const ww = i === j ? 0.45 * w : w;
    fili += '<path d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + 10 * ww).toFixed(1) + '" stroke-linecap="round" opacity="' + (0.25 + 0.75 * w).toFixed(2) + '" filter="url(#g-glow)"/>';
  });
  s = G.interniDefs + G.interno([{ tipo: 'al', col: P.Al.biglietto }, { tipo: 'mare', col: P.mare.biglietto }, { tipo: 'emma', col: P.Emma.dopo_fili }]).replace('<g class="g-int-fili"></g>', '<g>' + fili + '</g>');
  T['Montagna.dc.html'] = { titolo: 'Dentro la montagna · i fili di luce', w: 1920, h: 1080, svg: s };
  // Le finestre e i colori di Emma lungo il viaggio.
  s = '<rect width="1920" height="1080" fill="' + C.notte1 + '"/>' + titolo('Le finestre sulla vasca').replace(C.inchiostro, C.crema);
  P.Emma.finestre.forEach((conta, k) => {
    const papere = G.papereFinestra(conta, 11 + k).map(p => '<g transform="translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ') scale(.34) translate(-50 -84)">' + G.paperellaDiLuce(p.col) + '</g>').join('');
    s += at(120 + k * 600, 200, 1.2, G.finestra('t' + k).replace('<g class="g-fin-papere"></g>', '<g>' + papere + '</g>')) + et(336 + k * 600, 560, ['prima', 'seconda', 'ultima'][k] + ' finestra', true, 30);
  });
  const tappe = [['biglietto', P.Emma.biglietto], ['dopo i fili', P.Emma.dopo_fili], ['tratto 1', P.Emma.tratti[0]], ['tratto 2', P.Emma.tratti[1]], ['tratto 3', P.Emma.tratti[2]]];
  tappe.forEach(([n, col], k) => { s += at(130 + k * 360, 640, 1.05, G.emma(col)) + et(235 + k * 360, 1010, n + ' · ' + col, true, 24); });
  T['Finestre.dc.html'] = { titolo: 'Le finestre sulla vasca e il vestito di Emma', w: 1920, h: 1080, svg: s };
  // Al parco: Parco, il viaggio di Emma nel secondo treno, le finestre e la vasca.
  const Q = G.MOD.parco, PP = Q.passeggeri;
  s = '<rect width="1920" height="1080" fill="#F3EADB"/>' + titolo('Al parco · episodio 2');
  s += pannello(40, 120, 1000, 440);
  [PP.parco.biglietto].concat(PP.parco.tratti).forEach((c, k) => { s += at(70 + k * 240, 170, 1.15, G.parco(c, { ciao: k === 3 ? -25 : 0 })); });
  s += et(185, 540, 'Parco · biglietto', true) + et(665, 540, 'dopo i tratti', true) + et(905, 540, 'saluta', true);
  [['biglietto', PP.Emma.biglietto], ['dopo i fili', PP.Emma.dopo_fili], ['uscita', PP.Emma.tratti[2]]].forEach(([n, col], k) => { s += at(1090 + k * 270, 140, 1.0, G.emma(col)) + et(1190 + k * 270, 540, 'Emma · ' + n); });
  PP.Emma.finestre.forEach((conta, k) => {
    const papere = G.papereFinestra(conta, 21 + k).map(p => '<g transform="translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ') scale(.34) translate(-50 -84)">' + G.paperellaDiLuce(p.col) + '</g>').join('');
    s += at(60 + k * 400, 600, 0.95, G.finestra('p' + k).replace('<g class="g-fin-papere"></g>', '<g>' + papere + '</g>')) + et(231 + k * 400, 880, ['prima', 'seconda', 'ultima'][k] + ' finestra');
  });
  Q.vasca.forEach((v, k) => { s += at(1260 + (k % 3) * 200, 620 + Math.floor(k / 3) * 160, 0.9, G.paperella(v[2])) + et(1305 + (k % 3) * 200, 726 + Math.floor(k / 3) * 160, v[0] + ' · ' + v[1], false, 20); });
  T['Parco.dc.html'] = { titolo: 'Al parco · Parco, le finestre, la vasca', w: 1920, h: 1080, svg: s };
  // La grammatica: colori e caratteri.
  const sw = [['notte', C.notte1], ['cielo', C.notte2], ['lampadine', C.luce], ['righe', C.rosso], ['crema', C.crema], ['oro', C.oro], ['montagna', C.mont2], ['acqua', C.acqua]];
  s = '<rect width="1280" height="720" fill="#F3EADB"/>' + titolo('La grammatica');
  sw.forEach(([n, col], k) => { const x = 60 + (k % 4) * 300, y = 130 + Math.floor(k / 4) * 190; s += '<rect x="' + x + '" y="' + y + '" width="260" height="120" rx="18" fill="' + col + '" stroke="' + C.cremaScura + '" stroke-width="2"/>' + '<text x="' + x + '" y="' + (y + 152) + '" font-family="Fredoka, sans-serif" font-weight="600" font-size="22" fill="' + C.inchiostro + '">' + n + ' · ' + col + '</text>'; });
  s += '<text x="60" y="560" font-family="Fredoka, sans-serif" font-weight="600" font-size="56" fill="' + C.inchiostro + '">Fredoka per i titoli e le insegne</text>';
  s += '<text x="60" y="640" font-family="Atkinson Hyperlegible, sans-serif" font-size="40" fill="' + C.inchiostro + '">Atkinson Hyperlegible per i sottotitoli: si leggono bene.</text>';
  T['Grammatica.dc.html'] = { titolo: 'Colori e caratteri', w: 1280, h: 720, svg: s };
  return T;
}

function artboard(nome, t) {
  return '<!doctype html>\n<html lang="it">\n<head>\n<meta charset="utf-8">\n<title>' + t.titolo + '</title>\n<script src="./support.js"></script>\n</head>\n<body>\n<x-dc>\n<helmet>\n' +
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
    '<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600&amp;family=Atkinson+Hyperlegible:wght@400;700&amp;display=swap" rel="stylesheet">\n' +
    '<style>\nbody{margin:0}\na{color:#A8322A}a:hover{color:#7A2018}\n</style>\n</helmet>\n' +
    '<div style="width: ' + t.w + 'px; height: ' + t.h + 'px; position: relative; overflow: hidden; background: ' + C.notte1 + '; font-family: \'Atkinson Hyperlegible\', sans-serif">\n' +
    '<svg width="' + t.w + '" height="' + t.h + '" viewBox="0 0 ' + t.w + ' ' + t.h + '" role="img" aria-label="' + t.titolo + '">' + chiudi(G.defs + t.svg) + '</svg>\n</div>\n</x-dc>\n' +
    '<script type="text/x-dc" data-dc-script data-props=\'{"$preview":{"width":' + t.w + ',"height":' + t.h + '}}\'>\nclass Component extends DCLogic {\nrenderVals() {\nreturn {};\n}\n}\n</script>\n</body>\n</html>\n';
}

const T = tavole();
fs.mkdirSync(OUT, { recursive: true });
const posto = { 'Main.dc.html': [0, 0], 'Oggetti.dc.html': [2000, 0], 'LunaPark.dc.html': [0, 1200], 'Montagna.dc.html': [2000, 1200], 'Finestre.dc.html': [0, 2400], 'Grammatica.dc.html': [2000, 2400], 'Parco.dc.html': [0, 3600] };
const canvas = {
  v: 3, createdOnFiles: { v: 1, at: new Date().toISOString().replace(/\.\d+Z$/, 'Z') }, title: 'Ancora un giro · design',
  launch: { view: 'canvas' }, pages: [], boards: {}, order: Object.keys(T), notes: {}, designSystems: [],
};
for (const [nome, t] of Object.entries(T)) {
  fs.writeFileSync(path.join(OUT, nome), artboard(nome, t));
  canvas.boards[nome] = { x: posto[nome][0], y: posto[nome][1], w: t.w, h: t.h, title: t.titolo };
}
const vecchio = path.join(OUT, 'canvas.json');
if (fs.existsSync(vecchio)) { const v = JSON.parse(fs.readFileSync(vecchio, 'utf8')); canvas.createdOnFiles = v.createdOnFiles; }
fs.writeFileSync(vecchio, JSON.stringify(canvas, null, 2) + '\n');
console.log('Scritte ' + Object.keys(T).length + ' tavole in ' + path.relative(RADICE, OUT));
