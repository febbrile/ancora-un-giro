// Ancora un giro · i moduli condivisi: personaggi, oggetti, il luna park, il treno, i sottotitoli.
// Vale per tutti gli episodi: il motore del sito lo carica da episodi/comune/.
// I disegni sono gli stessi della tela di design.

// ── Emma e Ada (disegni di base) ────────────────────────────────────────────────────────────────────
const SK='#FFE9D6', HA='#F5C84C', HD='#D9A12E', HL='#FFE28A', IN='#2B2350';
const star='<polygon points="78,57 79.8,61.6 84.7,61.8 80.9,64.9 82.1,69.7 78,67 73.9,69.7 75.1,64.9 71.3,61.8 76.2,61.6" fill="#E0475B" stroke="#FFFFFF" stroke-width="1"/>';
const fringe='<path d="M60 82 C58 52 78 38 100 38 C124 38 142 54 140 84 C136 76 132 72 128 76 C126 66 118 62 114 68 C110 58 100 56 96 64 C90 56 80 60 80 70 C74 66 66 72 66 80 C64 78 62 80 60 82 Z" fill="'+HA+'"/><path d="M76 50 Q100 40 124 50" stroke="'+HL+'" stroke-width="4" stroke-linecap="round" fill="none" opacity=".85"/><path d="M90 60 Q94 50 102 46 M118 64 Q122 54 128 52" stroke="'+HD+'" stroke-width="2" stroke-linecap="round" fill="none"/>'+star;
const legs='<rect x="84" y="226" width="11" height="40" rx="5.5" fill="'+SK+'"/><rect x="105" y="226" width="11" height="40" rx="5.5" fill="'+SK+'"/><ellipse cx="88" cy="268" rx="11" ry="6" fill="'+IN+'"/><ellipse cx="112" cy="268" rx="11" ry="6" fill="'+IN+'"/>';
const dressF='<rect x="94" y="110" width="12" height="20" fill="'+SK+'"/><path d="M100 124 C84 124 76 132 74 146 L56 228 Q100 244 144 228 L126 146 C124 132 116 124 100 124 Z" fill="currentColor"/><path d="M88 140 L74 222 Q81 226 89 228 L97 142 Z" fill="#FFFFFF" opacity=".18"/><path d="M86 126 Q100 142 114 126 Q100 132 86 126 Z" fill="#FFF7EC"/>';
const armsDown='<path d="M78 146 Q60 176 62 204" stroke="'+SK+'" stroke-width="11" stroke-linecap="round" fill="none"/><path d="M122 146 Q140 176 138 204" stroke="'+SK+'" stroke-width="11" stroke-linecap="round" fill="none"/>';
const glow='<ellipse cx="100" cy="165" rx="78" ry="112" fill="currentColor" opacity=".32" filter="url(#g-soft)"/>';
function face(dx, dy, mouth){
  dx=dx||0; dy=dy||0;
  const m = mouth==='o' ? '<ellipse cx="'+(100+dx)+'" cy="106" rx="5" ry="6.5" fill="'+IN+'"/>' : '<path d="M'+(93+dx)+' 103 Q'+(100+dx)+' 110 '+(107+dx)+' 103" stroke="'+IN+'" stroke-width="2.6" stroke-linecap="round" fill="none"/>';
  return '<ellipse cx="'+(86+dx)+'" cy="'+(88+dy)+'" rx="4.2" ry="5.6" fill="'+IN+'"/><ellipse cx="'+(114+dx)+'" cy="'+(88+dy)+'" rx="4.2" ry="5.6" fill="'+IN+'"/><circle cx="'+(87.5+dx)+'" cy="'+(86+dy)+'" r="1.5" fill="#FFFFFF"/><circle cx="'+(115.5+dx)+'" cy="'+(86+dy)+'" r="1.5" fill="#FFFFFF"/><circle cx="77" cy="100" r="6" fill="#FF8F8F" opacity=".45"/><circle cx="123" cy="100" r="6" fill="#FF8F8F" opacity=".45"/>'+m;
}
function emma(dress, o){
  o=o||{};
  const back='<path d="M100 32 C70 30 52 50 52 80 C52 96 48 106 52 116 C55 124 64 124 66 118 L134 118 C136 124 145 124 148 116 C152 106 148 96 148 80 C148 50 130 30 100 32 Z" fill="'+HA+'"/><path d="M60 90 C56 100 62 108 58 116 M140 90 C144 100 138 108 142 116" stroke="'+HD+'" stroke-width="2" stroke-linecap="round" fill="none"/>';
  return '<g style="color:'+dress+'">'+(o.noGlow?'':glow)+back+legs+armsDown+dressF+'<circle cx="100" cy="80" r="40" fill="'+SK+'"/>'+fringe+face(o.dx,o.dy,o.mouth)+'</g>';
}
const AI='#2E2A26', AS='#C98B63', AC='#FBFAF6';
function adaHead(expr){
  let e;
  if(expr==='felice') e='<path d="M81 90 Q87 83 93 90 M109 90 Q115 83 121 90" stroke="'+AI+'" stroke-width="2.8" stroke-linecap="round" fill="none"/><path d="M90 103 Q100 116 110 103 Z" fill="'+AI+'"/>';
  else if(expr==='sorpresa') e='<path d="M76 66 Q86 60 96 66 M104 66 Q114 60 124 66" stroke="#3A2418" stroke-width="3" stroke-linecap="round" fill="none"/><circle cx="87" cy="88" r="5" fill="'+AI+'"/><circle cx="115" cy="88" r="5" fill="'+AI+'"/><ellipse cx="100" cy="108" rx="5" ry="6.5" fill="'+AI+'"/>';
  else if(expr==='occhio') e='<path d="M80 89 Q87 84 94 89" stroke="'+AI+'" stroke-width="2.6" stroke-linecap="round" fill="none"/><path d="M95 106 Q100 108 106 106" stroke="'+AI+'" stroke-width="2.4" stroke-linecap="round" fill="none"/><circle cx="104" cy="109" r="3" fill="#E07A5F"/>';
  else e='<circle cx="87" cy="88" r="3.6" fill="'+AI+'"/><circle cx="115" cy="88" r="3.6" fill="'+AI+'"/><circle cx="88.2" cy="86.8" r="1.2" fill="#FFFFFF"/><circle cx="116.2" cy="86.8" r="1.2" fill="#FFFFFF"/><path d="M92 106 Q100 112 108 106" stroke="'+AI+'" stroke-width="2.6" stroke-linecap="round" fill="none"/>';
  return '<circle cx="100" cy="36" r="22" fill="#3A2418"/><circle cx="80" cy="46" r="16" fill="#3A2418"/><circle cx="120" cy="46" r="16" fill="#3A2418"/><circle cx="92" cy="26" r="12" fill="#3A2418"/><path d="M110 34 L140 16" stroke="#F2C14E" stroke-width="6" stroke-linecap="round"/><path d="M140 16 L147 12" stroke="#3A2418" stroke-width="3" stroke-linecap="round"/><path d="M110 34 L105 37" stroke="#E58FA0" stroke-width="6" stroke-linecap="round"/><rect x="94" y="112" width="12" height="20" fill="'+AS+'"/><circle cx="100" cy="82" r="38" fill="'+AS+'"/><path d="M62 84 C60 56 78 44 100 44 C122 44 140 56 138 84 C132 70 120 62 100 62 C80 62 68 70 62 84 Z" fill="#3A2418"/><circle cx="78" cy="100" r="6" fill="#E07A5F" opacity=".35"/><circle cx="122" cy="100" r="6" fill="#E07A5F" opacity=".35"/><circle cx="86" cy="86" r="13" fill="#FFFFFF" fill-opacity=".35" stroke="'+AI+'" stroke-width="3"/><circle cx="114" cy="86" r="13" fill="#FFFFFF" fill-opacity=".35" stroke="'+AI+'" stroke-width="3"/><path d="M99 85 Q100 82 101 85" stroke="'+AI+'" stroke-width="3" fill="none"/>'+e;
}
const adaBody='<path d="M100 128 C82 128 72 136 68 150 L50 300 Q100 312 150 300 L132 150 C128 136 118 128 100 128 Z" fill="'+AC+'" stroke="'+AI+'" stroke-width="2.5"/><path d="M88 130 L100 172 L112 130 Z" fill="#E8743B"/><path d="M100 172 L100 304" stroke="#D9D3C7" stroke-width="2"/>';
const slL='<path d="M72 152 Q56 196 60 236 L78 236 Q76 200 88 160 Z" fill="'+AC+'" stroke="'+AI+'" stroke-width="2.5"/><circle cx="70" cy="238" r="6" fill="'+AS+'"/>';
const slR='<path d="M128 152 Q144 196 140 236 L122 236 Q124 200 112 160 Z" fill="'+AC+'" stroke="'+AI+'" stroke-width="2.5"/><circle cx="130" cy="238" r="6" fill="'+AS+'"/>';
const TIRATA="<path d=\"M-30 120 L10 120 M-36 150 L4 150 M-24 180 L16 180\" stroke=\"#FFF4E0\" stroke-width=\"3\" stroke-linecap=\"round\" opacity=\"0.4\"/><circle cx=\"262\" cy=\"96\" r=\"18\" fill=\"none\" stroke=\"#FFF4E0\" stroke-width=\"2\" opacity=\"0.3\"/><circle cx=\"262\" cy=\"96\" r=\"32\" fill=\"none\" stroke=\"#FFF4E0\" stroke-width=\"2\" opacity=\"0.18\"/><circle cx=\"262\" cy=\"96\" r=\"46\" fill=\"none\" stroke=\"#FFF4E0\" stroke-width=\"2\" opacity=\"0.08\"/><circle cx=\"206\" cy=\"112\" r=\"3\" fill=\"#FFF4E0\" opacity=\"0.55\"/><circle cx=\"222\" cy=\"106\" r=\"3\" fill=\"#FFF4E0\" opacity=\"0.4\"/><circle cx=\"238\" cy=\"101\" r=\"3\" fill=\"#FFF4E0\" opacity=\"0.25\"/><g transform=\"rotate(28 100 160)\"><ellipse cx=\"90\" cy=\"165\" rx=\"92\" ry=\"110\" fill=\"currentColor\" opacity=\"0.32\" filter=\"url(#g-soft)\"/><path d=\"M92 226 L70 252\" stroke=\"#FFE9D6\" stroke-width=\"11\" stroke-linecap=\"round\" fill=\"none\"/><path d=\"M108 226 L92 258\" stroke=\"#FFE9D6\" stroke-width=\"11\" stroke-linecap=\"round\" fill=\"none\"/><ellipse cx=\"66\" cy=\"257\" rx=\"11\" ry=\"6\" fill=\"#2B2350\" transform=\"rotate(-40 66 257)\"/><ellipse cx=\"88\" cy=\"263\" rx=\"11\" ry=\"6\" fill=\"#2B2350\" transform=\"rotate(-50 88 263)\"/><path d=\"M78 146 Q56 160 40 170\" stroke=\"#FFE9D6\" stroke-width=\"11\" stroke-linecap=\"round\" fill=\"none\"/><path d=\"M122 146 Q112 176 96 196\" stroke=\"#FFE9D6\" stroke-width=\"11\" stroke-linecap=\"round\" fill=\"none\"/><rect x=\"94\" y=\"110\" width=\"12\" height=\"20\" fill=\"#FFE9D6\"/><path d=\"M100 124 C84 124 76 132 74 146 L30 210 Q52 214 64 232 Q84 226 100 236 Q120 230 140 226 L126 146 C124 132 116 124 100 124 Z\" fill=\"currentColor\"/><path d=\"M88 140 L44 206 Q54 210 60 216 L97 142 Z\" fill=\"#FFFFFF\" opacity=\"0.18\"/><path d=\"M86 126 Q100 142 114 126 Q100 132 86 126 Z\" fill=\"#FFF7EC\"/><path d=\"M104 40 C78 36 60 50 56 68 C46 70 36 74 28 76 C34 82 30 90 22 94 C32 98 34 106 30 112 C40 114 50 112 56 108 C60 116 70 118 76 110 L120 104 C130 80 126 48 104 40 Z\" fill=\"#F5C84C\"/><path d=\"M52 82 C44 86 36 86 30 90 M56 96 C48 102 40 102 32 106\" stroke=\"#D9A12E\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/><path d=\"M72 54 C62 58 54 62 46 66\" stroke=\"#FFE28A\" stroke-width=\"3.5\" stroke-linecap=\"round\" fill=\"none\" opacity=\"0.8\"/><circle cx=\"100\" cy=\"80\" r=\"40\" fill=\"#FFE9D6\"/><path d=\"M60 82 C58 52 78 38 100 38 C124 38 142 54 140 84 C136 76 132 72 128 76 C126 66 118 62 114 68 C110 58 100 56 96 64 C90 56 80 60 80 70 C74 66 66 72 66 80 C64 78 62 80 60 82 Z\" fill=\"#F5C84C\"/><path d=\"M76 50 Q100 40 124 50\" stroke=\"#FFE28A\" stroke-width=\"4\" stroke-linecap=\"round\" fill=\"none\" opacity=\"0.85\"/><path d=\"M90 60 Q94 50 102 46 M118 64 Q122 54 128 52\" stroke=\"#D9A12E\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/><polygon points=\"78,57 79.8,61.6 84.7,61.8 80.9,64.9 82.1,69.7 78,67 73.9,69.7 75.1,64.9 71.3,61.8 76.2,61.6\" fill=\"#E0475B\" stroke=\"#FFFFFF\" stroke-width=\"1\"/><circle cx=\"92\" cy=\"88\" r=\"5.2\" fill=\"#2B2350\"/><circle cx=\"119\" cy=\"88\" r=\"5.2\" fill=\"#2B2350\"/><circle cx=\"93.8\" cy=\"86\" r=\"1.7\" fill=\"#FFFFFF\"/><circle cx=\"120.8\" cy=\"86\" r=\"1.7\" fill=\"#FFFFFF\"/><circle cx=\"84\" cy=\"101\" r=\"6\" fill=\"#FF8F8F\" opacity=\"0.45\"/><circle cx=\"127\" cy=\"101\" r=\"6\" fill=\"#FF8F8F\" opacity=\"0.45\"/><path d=\"M100 104 Q107 112 115 103\" stroke=\"#2B2350\" stroke-width=\"2.6\" stroke-linecap=\"round\" fill=\"none\"/></g>";
const WEAK = new Set('il lo la i gli le un uno una di a da in con su per tra fra del dello della dei degli delle al allo alla ai agli alle dal dallo dalla dai dagli dalle nel nello nella nei negli nelle sul sullo sulla sui sugli sulle e ed o ma che se come non mi ti si ci vi ne è suo sua suoi sue mio mia tuo tua quel quella questo questa ogni più'.split(' '));
const MAX = 48, MIN = 18;
const punct = w => /[.,:;?!…»]$/.test(w);
const weak = w => WEAK.has(w.toLowerCase().replace(/[«"]/g, '')) || /['’]$/.test(w);
function splitLong(words) {
  const s = words.join(' ');
  if (s.length <= MAX || words.length < 2) return [s];
  let best = -1, bs = 1e9;
  for (let i = 0; i < words.length - 1; i++) {
    if (weak(words[i])) continue;
    const L = words.slice(0, i + 1).join(' ').length, R = words.slice(i + 1).join(' ').length;
    const sc = Math.abs(L - R) + (punct(words[i]) ? -8 : 0);
    if (sc < bs) { bs = sc; best = i; }
  }
  if (best < 0) best = Math.floor(words.length / 2) - 1;
  return splitLong(words.slice(0, best + 1)).concat(splitLong(words.slice(best + 1)));
}
function chunkSub(text) {
  const words = text.split(' ');
  const cl = []; let cur = [];
  words.forEach((w, k) => { cur.push(w); if (punct(w) || k === words.length - 1) { cl.push(cur); cur = []; } });
  const len = c => c.join(' ').length;
  let merged = cl.slice(), changed = true;
  while (changed) {
    changed = false;
    for (let i = 0; i < merged.length; i++) {
      const c = merged[i];
      if (len(c) >= MIN || merged.length < 2) continue;
      const strong = /[.?!\u2026\u00bb]$/.test(c[c.length - 1]);
      const back = i > 0 && len(merged[i - 1]) + 1 + len(c) <= MAX;
      const fwd = i < merged.length - 1 && len(c) + 1 + len(merged[i + 1]) <= MAX;
      if ((strong && back) || (!fwd && back)) { merged[i - 1] = merged[i - 1].concat(c); merged.splice(i, 1); changed = true; break; }
      if (fwd) { merged[i + 1] = c.concat(merged[i + 1]); merged.splice(i, 1); changed = true; break; }
    }
  }
  return merged.flatMap(splitLong);
}
function subs(kit, wins){
  const cl = x => Math.max(0, Math.min(1, x));
  const items = [...kit.stage.querySelectorAll('.sott')].map((el, i) => {
    el.style.left = ''; el.style.width = '';
    const d = el.querySelector('.detto');
    const chunks = chunkSub(d.textContent);
    const w = wins[i] || [0, 0], a = w[0], b = w[1];
    const tot = chunks.reduce((s, c) => s + c.length + 8, 0);
    let acc = a;
    const st = chunks.map(c => { const s = acc; acc += (b - a) * (c.length + 8) / tot; return s; });
    return { el, d, chunks, st, a, b };
  });
  return function (t) {
    items.forEach(it => {
      const outer = Math.min(cl((t - it.a) / 0.3), cl((it.b - t) / 0.3));
      it.el.style.opacity = outer;
      if (outer <= 0) return;
      let k = 0;
      for (let j = 0; j < it.st.length; j++) if (t >= it.st[j]) k = j;
      if (it.d.textContent !== it.chunks[k]) it.d.textContent = it.chunks[k];
      const next = k + 1 < it.st.length ? it.st[k + 1] : it.b + 1;
      it.d.style.opacity = k === 0 ? cl((next - t) / 0.14) : Math.min(cl((t - it.st[k]) / 0.14), cl((next - t) / 0.14));
    });
  };
}


// ── Il ritmo ────────────────────────────────────────────────────────────────────────────────────────
// Dove nessuno parla, una scena può andare più veloce: soprattutto alla fine, prima dello stacco.
// RITMO[episodio][scena] = [[x0, x1, r, fine], …]: il tratto di tempo interno da x0 a x1 dura r secondi veri.
// Con fine (l'ultimo tratto, fino allo stacco) parte a velocità normale e accelera; senza, rallenta di nuovo alla fine.
// Le scene scrivono i loro tempi in tempo interno (t = G.tempo(ep, id, t) all'inizio di render); la musica usa G.reale.
// In scenes.json dur è la durata vera. Mai un tratto veloce mentre c'è un sottotitolo (lo controlla controlla.mjs).
const RITMO = {
  '00': {
    invio: [[14.0, 18, 1.6, 1]], volo: [[7.8, 14, 2.6, 1]], lunapark: [[23.4, 26, 1.8, 1]],
    spezzaparole: [[10.0, 20, 2.6, 1]], passeggeri: [[18.0, 28, 2.6, 1]], partenza: [[18.2, 24, 2.4, 1]],
    vasca: [[19.0, 26, 2.2, 1]], pesca: [[20.8, 26, 2.2, 1]], ancora: [[20.6, 24, 2.6, 1]],
  },
  '01': {
    domanda: [[14.0, 19.0, 2.6], [21.4, 24, 1.6, 1]], carrozza: [[19.0, 28, 2.6, 1]], buio: [[11.0, 16, 2.6, 1]],
    fili: [[24.8, 36, 2.6, 1]], scambi: [[21.6, 34, 2.6, 1]], pesca: [[20.6, 30, 2.4, 1]],
    finestre: [[46.2, 51, 2.6, 1]], uscita: [[29.6, 34, 2.2, 1]], quaderno: [[1.0, 10.0, 6.0]],
  },
};
// Dove si trova il tempo interno dentro un tratto, dopo tau secondi veri.
function nelTratto(x0, x1, r, fine, tau) {
  if (fine) { const c = (x1 - x0 - r) / (r * r); return x0 + tau + c * tau * tau; }
  const s = tau / r, s2 = s * s, s3 = s2 * s;
  return (2 * s3 - 3 * s2 + 1) * x0 + (s3 - 2 * s2 + s) * r + (-2 * s3 + 3 * s2) * x1 + (s3 - s2) * r;
}
// Dal tempo vero della scena al tempo interno.
function tempo(ep, id, t) {
  const tr = (RITMO[ep] || {})[id] || [];
  let acc = 0;
  for (const [x0, x1, r, fine] of tr) {
    const a = x0 - acc;
    if (t < a) return t + acc;
    if (t <= a + r) return nelTratto(x0, x1, r, fine, t - a);
    acc += x1 - x0 - r;
  }
  return t + acc;
}
// Dal tempo interno al tempo vero (per la musica e i rumori).
function reale(ep, id, x) {
  const tr = (RITMO[ep] || {})[id] || [];
  let acc = 0;
  for (const [x0, x1, r, fine] of tr) {
    if (x < x0) return x - acc;
    if (x <= x1) {
      let lo = 0, hi = r;
      for (let k = 0; k < 40; k++) { const m = (lo + hi) / 2; if (nelTratto(x0, x1, r, fine, m) < x) lo = m; else hi = m; }
      return x0 - acc + (lo + hi) / 2;
    }
    acc += x1 - x0 - r;
  }
  return x - acc;
}

// ── Colori del mondo ────────────────────────────────────────────────────────────────────────────────
const C = {
  notte1: '#0B1030', notte2: '#1B2257', orizzonte: '#4A3A7A', luce: '#FFD27A', luce2: '#FFB45E',
  rosso: '#D9483B', rossoScuro: '#A8322A', oro: '#F2B544', crema: '#F6EEDD', cremaScura: '#D9C9AC',
  legno: '#9A6440', legnoScuro: '#6E4630', acciaio: '#9AA3CF', acciaioScuro: '#5A6290',
  mont1: '#1E1A3A', mont2: '#2A2450', mont3: '#3A3266', buio: '#05070F', terra: '#15132C',
  acqua: '#4FB6D8', menta: '#7FE0C8', pelle: '#E3A887', pelleScura: '#C98A6B', inchiostro: '#2B2350',
};
const defs = '<defs>' +
  '<filter id="g-soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="8"/></filter>' +
  '<filter id="g-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>' +
  '<filter id="g-velo" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="18"/></filter>' +
  '<radialGradient id="g-bulbo"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".3" stop-color="#FFD27A" stop-opacity=".85"/><stop offset="1" stop-color="#FFD27A" stop-opacity="0"/></radialGradient>' +
  '<linearGradient id="g-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1030"/><stop offset=".6" stop-color="#1B2257"/><stop offset="1" stop-color="#4A3A7A"/></linearGradient>' +
  '<linearGradient id="g-acqua" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7AD6EE"/><stop offset="1" stop-color="#2A7FA6"/></linearGradient>' +
  '<linearGradient id="g-montagna" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3A3266"/><stop offset="1" stop-color="#1E1A3A"/></linearGradient>' +
  '</defs>';

// Rende unici gli id dei filtri e delle sfumature (id="g-…") dentro l'SVG di una scena: ogni scena ha i suoi.
function unico(html, pre) {
  return html.replace(/id="g-/g, 'id="' + pre + '-g-').replace(/url\(#g-/g, 'url(#' + pre + '-g-');
}
// Mescola due colori #rrggbb (p = 0 dà a, p = 1 dà b).
function mix(a, b, p) {
  p = Math.max(0, Math.min(1, p));
  const x = parseInt(a.slice(1), 16), y = parseInt(b.slice(1), 16);
  const c = [16, 8, 0].map(s => Math.round(((x >> s) & 255) * (1 - p) + ((y >> s) & 255) * p));
  return '#' + c.map(v => v.toString(16).padStart(2, '0')).join('');
}
// Il colore lungo una serie di tappe: p da 0 a tappe.length - 1.
function tappa(tappe, p) {
  p = Math.max(0, Math.min(tappe.length - 1, p));
  const i = Math.min(tappe.length - 2, Math.floor(p));
  return mix(tappe[i], tappe[i + 1], p - i);
}
function fade(t, a, b, d) { d = d || 0.4; const c = x => Math.max(0, Math.min(1, x)); return Math.min(c((t - a) / d), c((b - t) / d)); }
// La camera: il punto (cx, cy) del mondo al centro dello schermo, ingrandito z volte.
function cam(cx, cy, z) { return 'translate(' + (960 - cx * z).toFixed(2) + ' ' + (540 - cy * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')'; }
// I movimenti di camera: chiavi [{ t, cx, cy, z }], con passaggi morbidi (eio) da una chiave alla successiva.
// Lo zoom si interpola in scala logaritmica. Ritorna la stringa di transform.
function camChiavi(chiavi, t) {
  let a = chiavi[0], b = chiavi[0];
  for (let i = 0; i < chiavi.length; i++) { if (t >= chiavi[i].t) { a = chiavi[i]; b = chiavi[i + 1] || chiavi[i]; } }
  if (t < chiavi[0].t) { a = b = chiavi[0]; }
  const u = b === a ? 0 : (function (x) { x = Math.max(0, Math.min(1, x)); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; })((t - (a.da !== undefined ? a.da : a.t)) / ((b.t) - (a.da !== undefined ? a.da : a.t)));
  const z = Math.exp(Math.log(a.z) + (Math.log(b.z) - Math.log(a.z)) * u);
  return cam(a.cx + (b.cx - a.cx) * u, a.cy + (b.cy - a.cy) * u, z);
}
// Posa un disegno di base (larghezza w, piedi a y = piedi) con i piedi nel punto (x, y), a scala s.
function posa(x, y, s, w, piedi) { return 'translate(' + (x - w / 2 * s).toFixed(2) + ' ' + (y - piedi * s).toFixed(2) + ') scale(' + s + ')'; }

// ── Personaggi ──────────────────────────────────────────────────────────────────────────────────────
// Emma, Al e Mare: il colore del vestito (o della luce) arriva da fuori, dal modellino.
function emmaTirata(dress) { return '<g style="color:' + dress + '">' + TIRATA + '</g>'; }
// Due occhi grandi, bianchi con la pupilla: si leggono anche quando il passeggero è piccolo.
function occhi(x1, y1, x2, y2) {
  const o = (x, y) => '<ellipse cx="' + x + '" cy="' + y + '" rx="10" ry="11.5" fill="#FFFFFF"/><circle cx="' + (x + 2) + '" cy="' + (y + 2) + '" r="5.5" fill="#1C1F4A"/><circle cx="' + (x + 4) + '" cy="' + (y - 1) + '" r="1.8" fill="#FFFFFF"/>';
  return o(x1, y1) + o(x2, y2);
}
function al(col) {
  return '<g style="color:' + col + '"><ellipse cx="102" cy="122" rx="78" ry="58" fill="currentColor" opacity=".35" filter="url(#g-soft)"/>' +
    '<path d="M40 130 C36 96 70 72 108 72 C146 72 168 100 164 130 C160 156 130 166 100 166 C66 166 44 158 40 130 Z" fill="currentColor" stroke="' + C.crema + '" stroke-width="4" stroke-opacity=".9"/>' +
    '<ellipse cx="82" cy="94" rx="24" ry="8" fill="#FFFFFF" opacity=".3" transform="rotate(-15 82 94)"/>' +
    occhi(86, 118, 120, 118) +
    '<path d="M94 142 Q103 150 112 142" stroke="#0E2E33" stroke-width="4" stroke-linecap="round" fill="none"/></g>';
}
function mare(col) {
  return '<g style="color:' + col + '"><ellipse cx="100" cy="124" rx="86" ry="58" fill="currentColor" opacity=".35" filter="url(#g-soft)"/>' +
    '<path d="M22 170 C40 120 70 82 120 72 C160 64 186 88 182 116 C178 140 150 146 140 128 C132 114 146 102 156 108 C150 92 128 90 112 104 C92 122 96 158 122 170 Z" fill="currentColor" stroke="' + C.crema + '" stroke-width="4" stroke-opacity=".9" stroke-linejoin="round"/>' +
    '<path d="M58 116 C78 88 102 76 128 72" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" fill="none" opacity=".6"/>' +
    occhi(72, 134, 98, 128) +
    '<path d="M74 154 Q88 164 102 150" stroke="#1C1F4A" stroke-width="4" stroke-linecap="round" fill="none"/></g>';
}
// Parco: un alberello tondo con gli occhi e due rametti. La chioma ha il colore del vestito. Scatola 200×180.
// o.ciao: l'angolo (gradi) del rametto destro, che saluta.
function parco(col, o) {
  o = o || {};
  const foglia = (x, y, r) => '<g transform="rotate(' + r + ' ' + x + ' ' + y + ')"><ellipse cx="' + x + '" cy="' + y + '" rx="15" ry="8" fill="currentColor"/><ellipse cx="' + x + '" cy="' + y + '" rx="15" ry="8" fill="#FFFFFF" opacity=".18"/><path d="M' + (x - 12) + ' ' + y + ' L' + (x + 12) + ' ' + y + '" stroke="#000000" stroke-width="2" opacity=".25"/></g>';
  const chioma = (r, fill) => [[70, 100, 34], [130, 100, 34], [100, 72, 40], [100, 108, 38]].map(([x, y, rr]) => '<circle cx="' + x + '" cy="' + y + '" r="' + (rr + r) + '" fill="' + fill + '"/>').join('');
  return '<g style="color:' + col + '"><ellipse cx="100" cy="100" rx="88" ry="70" fill="currentColor" opacity=".35" filter="url(#g-soft)"/>' +
    '<rect x="90" y="126" width="20" height="54" rx="6" fill="' + C.legno + '"/><path d="M96 140 L96 176" stroke="' + C.legnoScuro + '" stroke-width="3" stroke-linecap="round" opacity=".5"/>' +
    '<g opacity=".9">' + chioma(4, C.crema) + '</g>' + chioma(0, 'currentColor') +
    '<ellipse cx="100" cy="132" rx="52" ry="14" fill="#000000" opacity=".12"/>' +
    '<ellipse cx="80" cy="56" rx="18" ry="8" fill="#FFFFFF" opacity=".3" transform="rotate(-20 80 56)"/>' +
    '<path d="M56 86 q6 -6 12 0 M124 70 q6 -6 12 0 M138 112 q6 -6 12 0" stroke="#000000" stroke-width="2.5" stroke-linecap="round" fill="none" opacity=".12"/>' +
    occhi(86, 98, 116, 98) +
    '<path d="M92 120 Q101 128 110 120" stroke="#1C1F4A" stroke-width="4" stroke-linecap="round" fill="none"/>' +
    '<path d="M56 134 Q38 134 24 118" stroke="' + C.legno + '" stroke-width="7" stroke-linecap="round" fill="none"/>' + foglia(16, 110, 40) +
    '<g transform="rotate(' + (o.ciao || 0) + ' 144 134)"><path d="M144 134 Q162 134 176 118" stroke="' + C.legno + '" stroke-width="7" stroke-linecap="round" fill="none"/>' + foglia(184, 110, -40) + '</g></g>';
}
// La paperella guarda a sinistra; scatola 100×90, la pancia tocca y = 84.
function paperella(col, o) {
  o = o || {};
  const scuro = mix(col, '#000000', 0.28);
  return '<g>' + (o.glow ? '<ellipse cx="54" cy="58" rx="56" ry="42" fill="' + col + '" opacity=".4" filter="url(#g-soft)"/>' : '') +
    '<path d="M26 58 C26 46 40 42 58 44 C74 46 84 40 92 30 C94 46 94 62 86 72 C78 82 60 86 44 84 C32 82 26 70 26 58 Z" fill="' + col + '"/>' +
    '<circle cx="36" cy="34" r="17" fill="' + col + '"/>' +
    '<path d="M21 33 C12 32 7 37 9 41 C13 45 20 43 24 40 Z" fill="#F39A2B"/>' +
    '<circle cx="31" cy="30" r="3.4" fill="' + C.inchiostro + '"/><circle cx="32" cy="29" r="1.2" fill="#FFFFFF"/>' +
    '<path d="M50 60 C58 51 72 53 76 61 C70 68 57 69 50 60 Z" fill="' + scuro + '" opacity=".55"/>' +
    '<ellipse cx="33" cy="25" rx="7" ry="3.2" fill="#FFFFFF" opacity=".35" transform="rotate(-20 33 25)"/></g>';
}
// Ada: pose 'base', 'quaderno', 'striscia', 'pesca', 'disegna'; espressioni di adaHead più 'chiusi' e 'pensa'.
function adaTesta(expr) {
  if (expr === 'chiusi') return adaHead('nessuno').replace(/<circle cx="87" cy="88"[^>]*>|<circle cx="115" cy="88"[^>]*>|<circle cx="88.2"[^>]*>|<circle cx="116.2"[^>]*>|<path d="M92 106 Q100 112 108 106"[^>]*>/g, '') +
    '<path d="M80 89 Q87 93 94 89 M108 89 Q115 93 122 89" stroke="' + AI + '" stroke-width="2.8" stroke-linecap="round" fill="none"/><path d="M92 105 Q100 112 108 105" stroke="' + AI + '" stroke-width="2.6" stroke-linecap="round" fill="none"/>';
  if (expr === 'pensa') return adaHead('nessuno').replace(/<circle cx="87" cy="88"[^>]*>|<circle cx="115" cy="88"[^>]*>|<circle cx="88.2"[^>]*>|<circle cx="116.2"[^>]*>|<path d="M92 106 Q100 112 108 106"[^>]*>/g, '') +
    '<circle cx="89" cy="83" r="3.6" fill="' + AI + '"/><circle cx="117" cy="83" r="3.6" fill="' + AI + '"/><ellipse cx="100" cy="108" rx="3.5" ry="3" fill="' + AI + '"/>';
  return adaHead(expr);
}
function ada(pose, expr, o) {
  o = o || {};
  const head = adaTesta(expr);
  if (pose === 'quaderno' || pose === 'disegna') {
    const pagina = '<rect x="64" y="190" width="72" height="54" rx="4" fill="#2F6F73" stroke="#1E4A4D" stroke-width="2"/><rect x="69" y="194" width="62" height="46" rx="2" fill="' + C.crema + '"/>';
    const matita = pose === 'disegna' ? '<g transform="rotate(' + (o.matita || 0) + ' 120 220)"><rect x="116" y="196" width="6" height="34" rx="2" fill="' + C.oro + '" transform="rotate(30 119 213)"/></g>' : '';
    return '<g>' + adaBody + slL + slR + pagina + (o.disegno || '') + matita + head + '</g>';
  }
  if (pose === 'striscia') {
    const testo = o.testo ? '<text x="100" y="213" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="20" fill="' + C.inchiostro + '">' + o.testo + '</text>' : '';
    return '<g>' + adaBody + slL + slR + '<path d="M34 196 L166 192 L160 207 L166 222 L34 224 L40 210 Z" fill="' + C.crema + '" stroke="' + C.cremaScura + '" stroke-width="2"/>' + testo + head + '</g>';
  }
  if (pose === 'pesca') {
    const giu = o.giu === undefined ? 1 : o.giu;
    const mx = 150 + 26 * giu, my = 230 + 50 * giu;
    const braccio = '<path d="M128 152 Q' + (148 + 10 * giu) + ' ' + (180 + 20 * giu) + ' ' + mx + ' ' + my + ' L' + (mx - 16) + ' ' + (my + 6) + ' Q' + (128 + 8 * giu) + ' ' + (196 + 20 * giu) + ' 112 160 Z" fill="' + AC + '" stroke="' + AI + '" stroke-width="2.5"/><circle cx="' + (mx - 6) + '" cy="' + (my + 6) + '" r="7" fill="' + AS + '"/>';
    return '<g>' + adaBody + slL + braccio + head + '</g>';
  }
  return '<g>' + adaBody + slL + slR + head + '</g>';
}

// ── Oggetti ─────────────────────────────────────────────────────────────────────────────────────────
// Un biglietto: scatola 120×60.
function biglietto(testo) {
  return '<g><path d="M0 6 Q0 0 6 0 L114 0 Q120 0 120 6 L120 22 Q112 30 120 38 L120 54 Q120 60 114 60 L6 60 Q0 60 0 54 L0 38 Q8 30 0 22 Z" fill="' + C.crema + '" stroke="' + C.cremaScura + '" stroke-width="2"/>' +
    '<line x1="26" y1="8" x2="26" y2="52" stroke="' + C.cremaScura + '" stroke-width="2" stroke-dasharray="4 4"/>' +
    '<circle cx="13" cy="30" r="5" fill="' + C.rosso + '"/>' +
    '<text x="73" y="39" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="24" fill="' + C.inchiostro + '">' + testo + '</text></g>';
}
// La striscia di carta con la frase: larga w, alta 44, con la scritta al centro.
function striscia(testo, w) {
  w = w || 300;
  return '<g><path d="M0 4 L' + w + ' 0 L' + (w - 10) + ' 22 L' + w + ' 44 L0 40 L10 22 Z" fill="' + C.crema + '" stroke="' + C.cremaScura + '" stroke-width="2"/>' +
    '<text x="' + (w / 2) + '" y="31" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="24" fill="' + C.inchiostro + '">' + testo + '</text></g>';
}
// Lo Spezzaparole: vecchia biglietteria rossa e oro. Scatola 220×300, piedi a y = 300.
// o.forbice da 0 (chiusa) a 1 (aperta), o.aghi (gradi), o.bocca (0..1, luce della bocca).
function spezzaparole(o) {
  o = o || {};
  const ap = 4 + 22 * (o.forbice === undefined ? 0.6 : o.forbice), ago = o.aghi || 0;
  const quadrante = (cx) => '<circle cx="' + cx + '" cy="124" r="23" fill="' + C.crema + '" stroke="' + C.oro + '" stroke-width="5"/>' +
    '<path d="M' + (cx - 14) + ' 124 A14 14 0 0 1 ' + (cx + 14) + ' 124" stroke="' + C.cremaScura + '" stroke-width="2" fill="none"/>' +
    '<line x1="' + cx + '" y1="126" x2="' + cx + '" y2="108" stroke="' + C.rossoScuro + '" stroke-width="3" stroke-linecap="round" transform="rotate(' + ago + ' ' + cx + ' 126)"/>' +
    '<circle cx="' + cx + '" cy="126" r="4" fill="' + C.inchiostro + '"/>';
  const lama = (rot, su) => '<g transform="rotate(' + rot + ')"><path d="' + (su ? 'M-4 0 Q40 -16 104 -3 Q60 2 -4 8 Z' : 'M-4 0 Q40 16 104 3 Q60 -2 -4 -8 Z') + '" fill="#DDE2F2" stroke="' + C.acciaioScuro + '" stroke-width="3" stroke-linejoin="round"/></g>';
  const manico = (rot) => '<g transform="rotate(' + rot + ')"><path d="M0 0 L-16 0" stroke="' + C.oro + '" stroke-width="8" stroke-linecap="round"/><ellipse cx="-34" cy="0" rx="20" ry="13" fill="none" stroke="' + C.oro + '" stroke-width="8"/></g>';
  return '<g>' +
    '<rect x="44" y="286" width="22" height="14" rx="3" fill="' + C.legnoScuro + '"/><rect x="134" y="286" width="22" height="14" rx="3" fill="' + C.legnoScuro + '"/>' +
    '<rect x="34" y="74" width="132" height="214" rx="18" fill="' + C.rosso + '" stroke="' + C.oro + '" stroke-width="5"/>' +
    '<path d="M42 78 Q100 18 158 78 Z" fill="' + C.rossoScuro + '" stroke="' + C.oro + '" stroke-width="5" stroke-linejoin="round"/>' +
    '<circle cx="100" cy="30" r="8" fill="' + C.oro + '"/><rect x="74" y="56" width="52" height="8" rx="4" fill="#2B1B1B"/>' +
    quadrante(74) + quadrante(126) +
    '<rect x="58" y="162" width="84" height="24" rx="6" fill="none" stroke="' + C.oro + '" stroke-width="3"/>' +
    '<circle cx="78" cy="174" r="4" fill="' + C.oro + '"/><circle cx="100" cy="174" r="4" fill="' + C.oro + '"/><circle cx="122" cy="174" r="4" fill="' + C.oro + '"/>' +
    '<rect x="60" y="206" width="80" height="14" rx="7" fill="#2B1B1B"/>' +
    '<rect x="60" y="206" width="80" height="14" rx="7" fill="' + C.luce + '" opacity="' + (o.bocca || 0) + '"/>' +
    '<path d="M56 226 L144 226" stroke="' + C.oro + '" stroke-width="4" stroke-linecap="round"/>' +
    '<rect x="70" y="244" width="60" height="30" rx="6" fill="' + C.rossoScuro + '"/>' +
    '<g transform="translate(184 150) rotate(-62)">' + manico(180 - ap / 2) + manico(180 + ap / 2) + lama(-ap / 2, true) + lama(ap / 2, false) +
    '<circle r="8" fill="' + C.oro + '" stroke="' + C.legnoScuro + '" stroke-width="3"/></g>' +
    '</g>';
}
// Un vagone visto di lato, che guarda a sinistra. Scatola 240×150: le ruote toccano y = 150.
// La sponda è bassa (y = 60), così chi siede si vede dalla testa alla vita; lo schienale imbottito sta dietro.
// o: { primo, sbarra (0 alzata .. 1 abbassata), ruote (gradi), striscia (colore) }; dentro: il passeggero.
const SBARRA = [30, 58];
function vagone(o, dentro) {
  o = o || {};
  const sb = o.sbarra === undefined ? 1 : o.sbarra, rr = o.ruote || 0;
  const ruota = cx => '<g transform="rotate(' + rr + ' ' + cx + ' 136)"><circle cx="' + cx + '" cy="136" r="15" fill="#2A2440" stroke="' + C.acciaioScuro + '" stroke-width="3"/><path d="M' + (cx - 10) + ' 136 L' + (cx + 10) + ' 136 M' + cx + ' 126 L' + cx + ' 146" stroke="' + C.acciaio + '" stroke-width="3"/><circle cx="' + cx + '" cy="136" r="4.5" fill="' + C.oro + '"/></g>';
  const lampadine = [48, 92, 136, 180].map(x => '<circle cx="' + x + '" cy="98" r="5" fill="' + C.luce + '"/><circle cx="' + x + '" cy="98" r="9" fill="' + C.luce + '" opacity=".25"/>').join('');
  return '<g>' +
    // Lo schienale: alto e imbottito, dietro al passeggero.
    '<path d="M176 64 L178 -6 Q179 -24 198 -24 L210 -24 Q230 -24 230 -6 L228 64 Z" fill="' + C.rossoScuro + '"/>' +
    '<path d="M188 -8 L188 56 M204 -12 L204 56 M219 -8 L219 56" stroke="' + C.rosso + '" stroke-width="5" stroke-linecap="round"/>' +
    (dentro || '') +
    (o.primo ? '<ellipse cx="0" cy="84" rx="34" ry="18" fill="' + C.luce + '" opacity=".35" filter="url(#g-glow)"/>' : '') +
    // La scocca: un guscio arrotondato, il muso davanti più alto.
    '<path d="M4 66 Q2 56 12 56 L226 58 Q238 58 236 70 L228 120 Q225 134 210 134 L36 134 Q18 134 14 120 Z" fill="' + C.crema + '" stroke="' + C.legnoScuro + '" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M8 66 L232 68" stroke="' + C.oro + '" stroke-width="7" stroke-linecap="round"/>' +
    '<path d="M11 86 L233 86 L230 110 L16 110 Z" fill="' + (o.striscia || C.rosso) + '"/>' +
    lampadine +
    (o.primo ? '<circle cx="12" cy="80" r="10" fill="' + C.luce + '" stroke="' + C.legnoScuro + '" stroke-width="2.5"/><circle cx="9" cy="77" r="3" fill="#FFFFFF"/>' : '') +
    '<rect x="230" y="112" width="22" height="8" rx="3" fill="' + C.acciaioScuro + '"/>' +
    '<rect x="30" y="128" width="190" height="10" rx="5" fill="' + C.legnoScuro + '"/>' +
    ruota(62) + ruota(180) +
    '<g class="g-sbarra" transform="rotate(' + (-105 * (1 - sb)).toFixed(1) + ' ' + SBARRA[0] + ' ' + SBARRA[1] + ')"><rect x="22" y="' + (SBARRA[1] - 7) + '" width="96" height="11" rx="5.5" fill="' + C.oro + '" stroke="' + C.legnoScuro + '" stroke-width="2.5"/></g>' +
    '</g>';
}
// Chi siede nel vagone: tipo 'emma' | 'al' | 'mare' | 'parco' | 'paperella', col il colore del vestito.
// Tutti hanno il centro a x ≈ 140, davanti allo schienale; la testa sta sopra la sponda.
const POSTO = {
  emma: 'translate(62 -100) scale(.8)', al: 'translate(38 -100)', mare: 'translate(34 -118)', parco: 'translate(40 -122)', paperella: 'translate(80 -20) scale(1.1)',
};
function passeggero(tipo, col, o) {
  o = o || {};
  if (!POSTO[tipo]) return '';
  const dentro = tipo === 'emma' ? (o.tirata ? emmaTirata(col) : emma(col, { mouth: o.bocca })) :
    tipo === 'al' ? al(col) : tipo === 'mare' ? mare(col) : tipo === 'parco' ? parco(col, { ciao: o.ciao }) : paperella(col, { glow: true });
  return '<g transform="' + POSTO[tipo] + '">' + dentro + '</g>';
}
// Il telefono con la chat. Scatola 360×700. o.scritto: il testo nel campo; o.messaggi: le bolle già inviate.
function bolle(messaggi) {
  return (messaggi || []).map((m, i) => {
    const w = Math.min(300, 48 + m.length * 16), y = 470 - (messaggi.length - 1 - i) * 80;
    return '<rect x="' + (322 - w) + '" y="' + y + '" width="' + w + '" height="60" rx="26" fill="#4F7BF0"/>' +
      '<text x="' + (300) + '" y="' + (y + 40) + '" text-anchor="end" font-family="Atkinson Hyperlegible, sans-serif" font-size="30" fill="#FFFFFF">' + m + '</text>';
  }).join('');
}
function telefono(o) {
  o = o || {};
  // La risposta: n parole (pillole grigie, illeggibili), in righe, in una bolla sotto il messaggio.
  let risposta = '', yMsg = 470;
  const n = o.risposta || 0;
  if (n > 0) {
    const r = kitRng(77), righe = [[]];
    let w = 0;
    for (let k = 0; k < n; k++) {
      const pw = 40 + Math.round(r() * 60);
      if (w + pw > 230 && righe[righe.length - 1].length) { righe.push([]); w = 0; }
      righe[righe.length - 1].push(pw); w += pw + 10;
    }
    const h = righe.length * 34 + 22, y0 = 566 - h;
    risposta = '<rect x="30" y="' + y0 + '" width="276" height="' + h + '" rx="24" fill="#E4E7F1"/>';
    righe.forEach((riga, ri) => { let x = 46; riga.forEach(pw => { risposta += '<rect x="' + x + '" y="' + (y0 + 14 + ri * 34) + '" width="' + pw + '" height="18" rx="9" fill="#AEB6D3"/>'; x += pw + 10; }); });
    yMsg = y0 - 76;
  }
  if (o.rispostaTesto) {
    const w = 48 + o.rispostaTesto.length * 16, y0 = 506;
    risposta = '<rect x="30" y="' + y0 + '" width="' + w + '" height="60" rx="26" fill="#E4E7F1"/>' +
      '<text x="52" y="' + (y0 + 40) + '" font-family="Atkinson Hyperlegible, sans-serif" font-size="30" fill="#2B2B38">' + o.rispostaTesto + '</text>';
    yMsg = y0 - 76;
  }
  const msg = (o.messaggi || []).length ? bolle(o.messaggi).replace(/y="470"/, 'y="' + yMsg + '"').replace(/y="510"/, 'y="' + (yMsg + 40) + '"') : '';
  return '<g>' +
    '<rect x="0" y="0" width="360" height="700" rx="48" fill="#1B1E2B"/>' +
    '<rect x="16" y="16" width="328" height="668" rx="36" fill="#F3F4F8"/>' +
    '<rect x="140" y="30" width="80" height="18" rx="9" fill="#1B1E2B"/>' +
    '<rect x="16" y="70" width="328" height="64" fill="#E4E7F1"/>' +
    '<circle cx="62" cy="102" r="18" fill="#B9C2E8"/><rect x="92" y="94" width="110" height="16" rx="8" fill="#B9C2E8"/>' +
    msg + risposta +
    '<rect x="32" y="596" width="232" height="56" rx="28" fill="#FFFFFF" stroke="#D2D7E6" stroke-width="2"/>' +
    '<text class="g-tel-scritto" x="52" y="635" font-family="Atkinson Hyperlegible, sans-serif" font-size="30" fill="#2B2B38">' + (o.scritto || '') + '</text>' +
    (o.cursore ? '<rect x="' + (54 + (o.scritto || '').length * 15.2) + '" y="606" width="3" height="36" fill="#4F7BF0"/>' : '') +
    '<circle cx="300" cy="624" r="28" fill="' + (o.premuto ? '#2F57C9' : '#4F7BF0') + '"/>' +
    '<path d="M288 624 L312 624 M302 613 L313 624 L302 635" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
    '</g>';
}
// Il salotto della sera: muro, finestra sui tetti, lampada, divano, il telefono tenuto in mano.
// dentroTelefono: quello che sta sopra il telefono, nelle sue coordinate (360×700).
const SALOTTO = { tel: [740, 120], s: 1.15, bolla: [972, 695], finestra: [1480, 365] };
function salotto(dentroTelefono, o) {
  o = o || {};
  const r = kitRng(21);
  let stelle = '';
  for (let i = 0; i < 26; i++) stelle += '<circle cx="' + (1260 + r() * 440).toFixed(0) + '" cy="' + (130 + r() * 300).toFixed(0) + '" r="' + (1 + r() * 1.6).toFixed(1) + '" fill="#FFF4DA" opacity="' + (0.4 + r() * 0.5).toFixed(2) + '"/>';
  const tetti = '<path d="M1240 620 L1240 520 L1300 520 L1300 480 L1360 450 L1420 480 L1420 540 L1480 540 L1480 500 L1520 500 L1520 470 L1560 470 L1560 530 L1620 530 L1640 490 L1680 490 L1700 520 L1720 520 L1720 620 Z" fill="#14183F"/>' +
    '<rect x="1316" y="500" width="12" height="16" fill="' + C.luce + '" opacity=".8"/><rect x="1440" y="560" width="12" height="16" fill="' + C.luce + '" opacity=".7"/><rect x="1580" y="548" width="12" height="16" fill="' + C.luce + '" opacity=".8"/>';
  const finestra = '<rect x="1220" y="90" width="520" height="550" rx="10" fill="' + C.legnoScuro + '"/>' +
    '<rect x="1240" y="110" width="480" height="510" fill="url(#g-cielo)"/>' + stelle +
    '<circle cx="1620" cy="190" r="34" fill="#FFF4DA"/>' + tetti +
    '<path d="M1480 110 L1480 620 M1240 365 L1720 365" stroke="' + C.legnoScuro + '" stroke-width="14"/>' +
    '<path d="M1210 640 L1750 640" stroke="' + C.legno + '" stroke-width="22" stroke-linecap="round"/>';
  const lampada = '<circle cx="250" cy="300" r="320" fill="#FFC56B" opacity=".18" filter="url(#g-velo)"/>' +
    '<path d="M250 340 L250 900" stroke="#3A2A30" stroke-width="12"/><path d="M170 900 L330 900" stroke="#3A2A30" stroke-width="14" stroke-linecap="round"/>' +
    '<path d="M170 330 L330 330 L295 200 L205 200 Z" fill="#F4D9A8"/><path d="M180 330 L320 330" stroke="#E9BF7A" stroke-width="6"/>';
  const divano = '<path d="M-40 1080 L-40 820 Q-40 760 40 756 L1960 756 L1960 1080 Z" fill="#6E3D58"/>' +
    '<path d="M-40 800 Q300 770 640 800 Q980 770 1320 800 Q1660 770 1960 800" stroke="#5A2F48" stroke-width="10" fill="none"/>' +
    '<path d="M640 800 L640 1080 M1320 800 L1320 1080" stroke="#5A2F48" stroke-width="8"/>';
  const dita = [520, 590, 660].map(y => '<rect x="704" y="' + y + '" width="58" height="54" rx="27" fill="' + C.pelle + '" stroke="' + C.pelleScura + '" stroke-width="2"/>').join('');
  // o.muro: i colori di un'altra casa, [muro in alto, muro in basso, divano].
  const mu = o.muro || ['#34203F', '#5A3550'], id = 'g-muro' + (o.muro ? '-' + mu[0].slice(1) : '');
  const div = o.muro && mu[2] ? divano.replace(/#6E3D58/g, mu[2]).replace(/#5A2F48/g, mix(mu[2], '#000000', 0.18)) : divano;
  return '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + mu[0] + '"/><stop offset="1" stop-color="' + mu[1] + '"/></linearGradient></defs>' +
    '<rect x="-200" y="-200" width="2320" height="1480" fill="url(#' + id + ')"/>' + finestra + lampada + div +
    '<g transform="translate(' + SALOTTO.tel[0] + ' ' + SALOTTO.tel[1] + ') scale(' + SALOTTO.s + ')">' + (o.telefono || '') + (dentroTelefono || '') + '</g>' + dita;
}
// Il cartello del titolo, con le lampadine intorno: centrato in (0, 0).
function insegna(testo, w, h, acceso) {
  w = w || 900; h = h || 220;
  let b = '';
  const n = Math.round((w + h) / 46);
  for (let i = 0; i < n * 2; i++) {
    const p = i / (n * 2), per = 2 * (w + h);
    let d = p * per, x, y;
    if (d < w) { x = -w / 2 + d; y = -h / 2; } else if ((d -= w) < h) { x = w / 2; y = -h / 2 + d; } else if ((d -= h) < w) { x = w / 2 - d; y = h / 2; } else { d -= w; x = -w / 2; y = h / 2 - d; }
    const on = acceso === undefined ? 1 : ((i + acceso) % 3 === 0 ? 0.45 : 1);
    b += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="9" fill="' + C.luce + '" opacity="' + on + '"/>';
  }
  return '<g><rect x="' + (-w / 2) + '" y="' + (-h / 2) + '" width="' + w + '" height="' + h + '" rx="26" fill="' + C.rossoScuro + '" stroke="' + C.oro + '" stroke-width="8"/>' + b +
    '<text x="0" y="' + (h * 0.16) + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="' + Math.round(h * 0.42) + '" fill="' + C.crema + '">' + testo + '</text></g>';
}

// ── Il luna park ────────────────────────────────────────────────────────────────────────────────────
// Il mondo è disegnato in coordinate 1920×1080; le scene lo inquadrano con cam().
// Il treno parte verso sinistra, sale la salita, attraversa il cielo, entra in alto nella montagna;
// esce in basso, passa sopra la vasca e rientra in stazione da destra.
const MONDO = {
  partenza: 'M 640 852 L 110 852 C 44 852 30 818 58 778 L 248 408 C 264 378 290 362 330 362 C 600 362 860 392 1048 446',
  arrivo: 'M 962 818 C 910 818 888 796 846 796 L 704 796 C 656 796 646 852 590 852 L 40 852',
  ada: [520, 834], spezzaparole: [585, 836], vasca: [772, 880], gradino: [672, 896], ingresso: [1048, 446], uscita: [962, 818],
  ruota: [1720, 470], fermo: 150, passo: 86, scala: 1 / 3,
};
function mondo(o) {
  o = o || {};
  const r = kitRng(o.seme || 3);
  let stelle = '';
  for (let i = 0; i < 90; i++) {
    const x = r() * 1920, y = r() * 620, s = 0.8 + r() * 1.8;
    stelle += '<circle class="g-stella" cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + s.toFixed(1) + '" fill="#FFF4DA" opacity="' + (0.35 + r() * 0.6).toFixed(2) + '"/>';
  }
  // La ruota panoramica (gira nel gruppo .g-ruota).
  const [rx, ry] = MONDO.ruota;
  let raggi = '', bulbi = '';
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6;
    raggi += '<line x1="0" y1="0" x2="' + (200 * Math.cos(a)).toFixed(1) + '" y2="' + (200 * Math.sin(a)).toFixed(1) + '"/>';
  }
  for (let i = 0; i < 24; i++) {
    const a = i * Math.PI / 12;
    bulbi += '<circle cx="' + (200 * Math.cos(a)).toFixed(1) + '" cy="' + (200 * Math.sin(a)).toFixed(1) + '" r="6" fill="' + (i % 2 ? C.luce : C.luce2) + '"/>';
  }
  const ruota = '<g stroke="#3B3A6E" stroke-width="10"><line x1="' + rx + '" y1="' + ry + '" x2="' + (rx - 110) + '" y2="880"/><line x1="' + rx + '" y1="' + ry + '" x2="' + (rx + 110) + '" y2="880"/></g>' +
    '<g transform="translate(' + rx + ' ' + ry + ')"><g class="g-ruota"><g stroke="#4A4A86" stroke-width="4">' + raggi + '</g>' +
    '<circle r="200" fill="none" stroke="#5A5AA0" stroke-width="7"/><circle r="186" fill="none" stroke="#4A4A86" stroke-width="3"/>' + bulbi + '</g>' +
    '<circle r="16" fill="' + C.oro + '"/></g>';
  // La montagna, con le due bocche.
  const montagna = '<path d="M872 900 L896 760 Q936 640 1006 560 L1076 468 Q1146 330 1240 282 Q1300 254 1352 300 L1446 404 Q1524 486 1566 604 L1626 760 L1656 900 Z" fill="url(#g-montagna)"/>' +
    '<path d="M1240 282 Q1300 254 1352 300 L1446 404 Q1524 486 1566 604 L1626 760 L1656 900 L1420 900 Q1430 700 1360 560 Q1300 420 1240 282 Z" fill="' + C.mont1 + '" opacity=".6"/>' +
    '<path d="M1006 560 L1076 468 Q1146 330 1240 282 Q1180 400 1120 520 Q1080 600 1010 660 Z" fill="' + C.mont3 + '" opacity=".55"/>' +
    '<path d="M1190 330 L1214 302 L1240 282 L1226 320 Z M1100 620 L1140 600 L1150 640 Z M1300 700 L1350 680 L1356 730 Z M1480 640 L1510 630 L1516 668 Z" fill="' + C.mont3 + '" opacity=".7"/>' +
    // bocca in alto (ingresso)
    '<path d="M1026 478 L1026 446 Q1046 410 1076 430 L1084 470 Z" fill="' + C.buio + '" stroke="#4E447F" stroke-width="5"/>' +
    // bocca in basso (uscita)
    '<path d="M920 872 L920 806 Q950 760 994 794 L1000 872 Z" fill="' + C.buio + '" stroke="#4E447F" stroke-width="6"/>' +
    '<circle cx="922" cy="806" r="5" fill="' + C.luce + '"/><circle cx="944" cy="776" r="5" fill="' + C.luce2 + '"/><circle cx="972" cy="772" r="5" fill="' + C.luce + '"/><circle cx="994" cy="794" r="5" fill="' + C.luce2 + '"/>' +
    '<circle cx="1028" cy="446" r="4" fill="' + C.luce + '"/><circle cx="1048" cy="424" r="4" fill="' + C.luce2 + '"/><circle cx="1074" cy="430" r="4" fill="' + C.luce + '"/>';
  // I sostegni della pista: tralicci sottili.
  let tralicci = '';
  const sost = (x, y) => tralicci += '<path d="M' + (x - 8) + ' ' + y + ' L' + (x - 14) + ' 880 M' + (x + 8) + ' ' + y + ' L' + (x + 14) + ' 880" stroke="#34316A" stroke-width="4"/>';
  [[90, 730], [130, 650], [170, 572], [210, 492], [250, 412]].forEach(p => sost(p[0], p[1]));
  [[400, 364], [550, 366], [700, 374], [850, 393], [970, 420]].forEach(p => sost(p[0], p[1]));
  [[704, 800], [846, 800]].forEach(p => sost(p[0], p[1]));
  const binario = d => '<path d="' + d + '" stroke="' + C.legnoScuro + '" stroke-width="12" stroke-dasharray="3 7" fill="none"/>' +
    '<path d="' + d + '" stroke="' + C.acciaio + '" stroke-width="4" fill="none"/>';
  // La stazione: pedana, pensilina a righe, lampadine.
  let righe = '', lamp = '';
  for (let x = 30; x < 630; x += 40) righe += '<path d="M' + x + ' 612 L' + (x + 40) + ' 612 L' + (x + 40) + ' 654 Q' + (x + 20) + ' 672 ' + x + ' 654 Z" fill="' + ((x / 40) % 2 < 1 ? C.rosso : C.crema) + '"/>';
  for (let x = 50; x < 630; x += 40) lamp += '<circle cx="' + x + '" cy="664" r="5" fill="' + C.luce + '"/>';
  const stazione = '<rect x="40" y="836" width="590" height="34" fill="' + C.legno + '"/><rect x="40" y="836" width="590" height="7" fill="#B98058"/>' +
    '<g stroke="' + C.legnoScuro + '" stroke-width="10"><line x1="64" y1="836" x2="64" y2="640"/><line x1="334" y1="836" x2="334" y2="640"/><line x1="604" y1="836" x2="604" y2="640"/></g>' +
    '<path d="M24 612 L636 612 L626 590 Q330 560 34 590 Z" fill="' + C.rossoScuro + '"/>' + righe + lamp;
  // La vasca della pesca, sotto il ponte, con il suo palo e la bandierina.
  const vasca = '<g class="g-vasca">' +
    '<path d="M684 880 L860 880 L850 914 Q772 926 694 914 Z" fill="' + C.legno + '" stroke="' + C.legnoScuro + '" stroke-width="4"/>' +
    '<path d="M688 897 L856 897" stroke="' + C.oro + '" stroke-width="4"/>' +
    '<ellipse cx="772" cy="880" rx="88" ry="12" fill="url(#g-acqua)" stroke="' + C.legnoScuro + '" stroke-width="4"/></g>' +
    '<line x1="880" y1="914" x2="880" y2="866" stroke="' + C.legnoScuro + '" stroke-width="6"/>' +
    '<circle cx="880" cy="852" r="19" fill="' + C.crema + '" stroke="' + C.oro + '" stroke-width="4"/>' +
    '<g transform="translate(866 840) scale(.27)">' + paperella('#FFD23F') + '</g>' +
    '<rect x="652" y="896" width="40" height="18" rx="3" fill="' + C.legnoScuro + '"/>';
  // Un tendone sullo sfondo, a destra.
  const tendone = '<path d="M1760 880 L1780 700 L1900 640 L1920 700 L1920 880 Z" fill="' + C.rossoScuro + '"/><path d="M1780 700 L1810 880 M1840 668 L1850 880 M1900 640 L1890 880" stroke="' + C.crema + '" stroke-width="16" opacity=".8"/>';
  return '<g class="g-mondo">' +
    '<rect x="-2000" y="-1000" width="5920" height="3080" fill="' + C.notte1 + '"/>' +
    '<rect x="-2000" y="0" width="5920" height="900" fill="url(#g-cielo)"/>' +
    stelle +
    '<circle cx="1530" cy="150" r="48" fill="#FFF4DA"/><circle cx="1530" cy="150" r="90" fill="#FFF4DA" opacity=".12" filter="url(#g-soft)"/>' +
    '<path d="M-2000 900 L-2000 760 Q200 700 500 740 Q800 770 1100 730 Q1500 690 1920 740 L3920 740 L3920 900 Z" fill="#171A44"/>' +
    ruota + tendone +
    tralicci +
    montagna +
    binario(MONDO.partenza) + binario(MONDO.arrivo) +
    stazione +
    '<rect x="-2000" y="868" width="5920" height="2000" fill="' + C.terra + '"/>' +
    '<path d="M-2000 868 L3920 868" stroke="#2A2650" stroke-width="3"/>' +
    vasca +
    '</g>';
}
// Numeri pseudo-casuali ripetibili (uguali a kit.rng).
function kitRng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

// Le paperelle di una vasca: [{ parola, col, x, y }], mescolate in modo ripetibile (stessa vasca, stesse posizioni).
function papereVasca(vasca, seme) {
  const r = kitRng(seme || 40), lista = [];
  vasca.forEach(([w, n, col]) => { for (let k = 0; k < n; k++) lista.push({ parola: w, col }); });
  for (let i = lista.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [lista[i], lista[j]] = [lista[j], lista[i]]; }
  lista.forEach((p, i) => { p.x = 700 + r() * 144; p.y = 872 + (i % 3) * 6 + r() * 3; });
  return lista;
}

// ── Il treno sulla pista ────────────────────────────────────────────────────────────────────────────
// Costruisce i vagoni (dentro un <g> del mondo) e li posa lungo un percorso SVG.
// passeggeri: [{ tipo, col }], dal primo (davanti) all'ultimo.
function treno(passeggeri, o) {
  o = o || {};
  return passeggeri.map((p, i) => '<g class="g-vag" data-i="' + i + '"><g class="g-vag-in">' +
    vagone({ primo: i === 0, sbarra: o.sbarra }, '<g class="g-pass">' + passeggero(p.tipo, p.col) + '</g>') + '</g></g>').join('');
}
// Le sbarre di sicurezza dei vagoni: v da 0 (alzate) a 1 (abbassate); v può essere una funzione dell'indice.
function sbarre(els, v) {
  els.forEach((el, i) => {
    const b = el.querySelector('.g-sbarra'), x = typeof v === 'function' ? v(i) : v;
    if (b) b.setAttribute('transform', 'rotate(' + (-105 * (1 - x)).toFixed(1) + ' ' + SBARRA[0] + ' ' + SBARRA[1] + ')');
  });
}
// Ridisegna il passeggero di un vagone (per cambiargli il colore o farlo comparire).
function cambiaPasseggero(el, tipo, col, o) {
  const p = el.querySelector('.g-pass');
  const k = tipo + col + JSON.stringify(o || {});
  if (p && p.__k !== k) { p.innerHTML = passeggero(tipo, col, o); p.__k = k; }
  return p;
}
// Posa i vagoni: path è l'elemento <path> (anche invisibile), s la distanza percorsa dal primo vagone.
// I vagoni stanno dietro al primo, a MONDO.passo l'uno dall'altro.
function posaTreno(els, path, s, scala, passo) {
  scala = scala || MONDO.scala; passo = passo || MONDO.passo;
  const L = path.getTotalLength();
  els.forEach((el, i) => {
    const si = Math.max(0.5, Math.min(L - 0.5, s - i * passo));
    const p = path.getPointAtLength(si), q = path.getPointAtLength(Math.min(L, si + 1)), q0 = path.getPointAtLength(Math.max(0, si - 1));
    const dx = q.x - q0.x, dy = q.y - q0.y;
    const a = Math.atan2(dy, dx) * 180 / Math.PI;
    let tr = 'translate(' + p.x.toFixed(2) + ' ' + p.y.toFixed(2) + ') ';
    tr += dx < 0 ? 'rotate(' + (a - 180).toFixed(2) + ')' : 'rotate(' + a.toFixed(2) + ') scale(-1 1)';
    tr += ' scale(' + scala + ') translate(-120 -150)';
    el.setAttribute('transform', tr);
  });
}

// La distanza percorsa al tempo t, partendo da s0, con una velocità che varia in modo lineare tra le chiavi
// [[t, v], …] (prima della prima chiave e dopo l'ultima la velocità resta quella della chiave).
function percorso(t, s0, chiavi) {
  let s = s0;
  for (let i = 0; i < chiavi.length; i++) {
    const [ta, va] = chiavi[i], nx = chiavi[i + 1];
    if (!nx) { if (t > ta) s += va * (t - ta); break; }
    const [tb, vb] = nx;
    if (t <= ta) break;
    const u = Math.min(t, tb) - ta, acc = (vb - va) / (tb - ta);
    s += va * u + acc * u * u / 2;
    if (t <= tb) break;
  }
  return s;
}
// Il mondo, con la camera, i due percorsi (invisibili) e quello che sta sopra (treno, personaggi…).
function costruisciMondo(kit, sopra, o) {
  o = o || {};
  kit.stage.append(kit.h(unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + defs +
    '<g class="g-cam">' + mondo(o) + '<path class="g-p-partenza" d="' + MONDO.partenza + '" fill="none"/>' +
    '<path class="g-p-arrivo" d="' + MONDO.arrivo + '" fill="none"/>' + (sopra || '') + '</g>' + (o.davanti || '') + '</svg>' + (o.html || '') + '</div>', o.pre || 'm')));
  const q = sel => kit.stage.querySelector(sel);
  return { cam: q('.g-cam'), ruota: q('.g-ruota'), partenza: q('.g-p-partenza'), arrivo: q('.g-p-arrivo'), q, qa: sel => [...kit.stage.querySelectorAll(sel)] };
}
// La ruota panoramica gira piano; le stelle respirano.
function animaMondo(m, t) {
  if (m.ruota) m.ruota.setAttribute('transform', 'rotate(' + (t * 4).toFixed(2) + ')');
}
// I vagoni vicini a una bocca della montagna sfumano: chi è dentro non si vede.
function nascondiInMontagna(els, path, s, o) {
  o = o || {};
  const L = path.getTotalLength(), passo = o.passo || MONDO.passo, f = 26;
  els.forEach((el, i) => {
    const si = s - i * passo;
    let a = 1;
    if (o.inizio) a = Math.min(a, Math.max(0, Math.min(1, (si - 4) / f)));
    if (o.fine) a = Math.min(a, Math.max(0, Math.min(1, (L - 4 - si) / f)));
    el.setAttribute('opacity', a.toFixed(3));
  });
}
// Posa un personaggio del mondo (Ada, lo Spezzaparole) con i piedi nel punto [x, y].
function posaAda(x, y, s) { return posa(x, y, s || 0.28, 200, 304); }

// ── Dentro la montagna ──────────────────────────────────────────────────────────────────────────────
// Le finestre sulla vasca (scatola 360×260): una finestra ad arco nella parete, e dietro l'acqua della vasca,
// con il bordo di legno in basso. Quando passa l'ultimo vagone, nell'acqua si accendono paperelle di luce
// (le mette la scena dentro .g-fin-papere): quelle che cadrebbero se il treno uscisse lì. id: unico nella scena.
function finestra(id) {
  const arco = 'M0 260 L0 100 Q0 0 180 0 Q360 0 360 100 L360 260 Z';
  return '<g><clipPath id="g-fin-' + id + '"><path d="' + arco + '"/></clipPath>' +
    '<g clip-path="url(#g-fin-' + id + ')">' +
    '<linearGradient id="g-fin-acqua-' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#21557A"/><stop offset="1" stop-color="#0F2C4A"/></linearGradient>' +
    '<rect width="360" height="260" fill="url(#g-fin-acqua-' + id + ')"/>' +
    '<path d="M-10 70 q22 -10 44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 M-10 130 q22 -10 44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 M-10 190 q22 -10 44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0" stroke="#7FC4E0" stroke-width="3" fill="none" opacity=".35"/>' +
    '<g class="g-fin-papere"></g>' +
    '<rect y="226" width="360" height="40" fill="' + C.legno + '"/><path d="M0 228 L360 228" stroke="' + C.oro + '" stroke-width="6"/>' +
    '</g>' +
    '<path d="' + arco + '" fill="none" stroke="' + C.mont3 + '" stroke-width="18"/>' +
    '<path d="M-14 262 L374 262" stroke="' + C.mont2 + '" stroke-width="16" stroke-linecap="round"/></g>';
}
// Le paperelle di luce di una finestra: conta = [[parola, quante, colore], …] dal modellino. Ognuna ha il suo posto
// (x, y: dove sta la pancia, nella scatola della finestra) e il momento in cui si accende (0..1, in ordine sparso).
function papereFinestra(conta, seme) {
  const r = kitRng(seme || 7), lista = [];
  conta.forEach(([w, n, col]) => { for (let k = 0; k < n; k++) lista.push({ parola: w, col }); });
  for (let i = lista.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [lista[i], lista[j]] = [lista[j], lista[i]]; }
  const col = 10, righe = Math.ceil(lista.length / col);
  lista.forEach((p, i) => {
    const riga = Math.floor(i / col), c = i % col;
    p.x = 26 + c * 32 + (riga % 2) * 14 + (r() - 0.5) * 10;
    p.y = 92 + riga * (100 / Math.max(1, righe - 1)) + (r() - 0.5) * 8;
    p.quando = r();
  });
  return lista;
}
// La paperella di luce: come una paperella, ma trasparente e con l'alone (non è vera: non cade e non si pesca).
function paperellaDiLuce(col) {
  return '<g opacity=".82"><ellipse cx="54" cy="56" rx="62" ry="46" fill="' + col + '" opacity=".55" filter="url(#g-soft)"/>' +
    paperella(col) + '<path d="M26 58 C26 46 40 42 58 44 C74 46 84 40 92 30 C94 46 94 62 86 72 C78 82 60 86 44 84 C32 82 26 70 26 58 Z" fill="none" stroke="#FFFFFF" stroke-width="4" opacity=".7"/></g>';
}
// L'interno: il treno grande, che corre verso sinistra. Il treno sta fermo nell'inquadratura, il mondo scorre.
// Vagoni a scala 1.25, ruote a y = 770, centri a x = 470, 820, 1170 (Al, Mare, Emma).
const INTERNO = { scala: 1.45, ruote: 800, centri: [430, 810, 1190, 1570], corsie: [720, 760, 800, 840, 880] };
function interno(passeggeri, o) {
  o = o || {};
  const r = kitRng(o.seme || 12);
  let lontano = '', vicino = '';
  for (let i = 0; i < 14; i++) {
    const x = i * 260 + r() * 80, y = 120 + r() * 380, w = 120 + r() * 200, h = 60 + r() * 120;
    lontano += '<path d="M' + x.toFixed(0) + ' ' + (y + h).toFixed(0) + ' Q' + (x + w * 0.2).toFixed(0) + ' ' + y.toFixed(0) + ' ' + (x + w * 0.5).toFixed(0) + ' ' + (y + h * 0.2).toFixed(0) + ' Q' + (x + w).toFixed(0) + ' ' + (y - h * 0.1).toFixed(0) + ' ' + (x + w).toFixed(0) + ' ' + (y + h).toFixed(0) + ' Z" fill="#1A1636" opacity=".8"/>';
  }
  for (let i = 0; i < 9; i++) {
    const x = i * 400 + r() * 160, h = 90 + r() * 150, w = 40 + r() * 50;
    vicino += '<path d="M' + x.toFixed(0) + ' -10 L' + (x + w).toFixed(0) + ' -10 L' + (x + w * 0.55).toFixed(0) + ' ' + h.toFixed(0) + ' Z" fill="#06050F"/>';
  }
  const binari = (o.corsie || [INTERNO.ruote]).map(y => '<g><path d="M-400 ' + (y + 6) + ' L2400 ' + (y + 6) + '" stroke="' + C.legnoScuro + '" stroke-width="14" stroke-dasharray="6 22" class="g-traversine"/><path d="M-400 ' + y + ' L2400 ' + y + '" stroke="' + C.acciaio + '" stroke-width="4" opacity=".85"/></g>').join('');
  const S = INTERNO.scala;
  const vag = passeggeri.map((p, i) => '<g class="g-vag" data-i="' + i + '" transform="translate(' + (INTERNO.centri[i] - 120 * S) + ' ' + (INTERNO.ruote - 150 * S) + ') scale(' + S + ')">' +
    vagone({ primo: i === 0, sbarra: 1 }, '<g class="g-pass">' + passeggero(p.tipo, p.col) + '</g>') + '</g>').join('');
  return '<rect x="-200" y="-200" width="2320" height="1480" fill="#07060F"/>' +
    '<rect x="-200" y="0" width="2320" height="1080" fill="url(#g-interno)"/>' +
    '<g class="g-int-lontano">' + lontano + '</g>' +
    '<g class="g-int-finestre">' + (o.finestre || '') + '</g>' +
    '<g class="g-int-binari">' + binari + '</g>' +
    '<g class="g-int-fanale"><path d="M' + (INTERNO.centri[0] - 118 * S) + ' ' + (INTERNO.ruote - 92 * S) + ' L-200 ' + (INTERNO.ruote - 300) + ' L-200 ' + (INTERNO.ruote + 80) + ' Z" fill="' + C.luce + '" opacity=".12"/></g>' +
    '<g class="g-int-treno">' + vag + '</g>' +
    '<g class="g-int-fili"></g>' +
    '<g class="g-int-vicino">' + vicino + '</g>';
}
const interniDefs = '<defs><linearGradient id="g-interno" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B0920"/><stop offset=".7" stop-color="#151230"/><stop offset="1" stop-color="#0A0818"/></linearGradient></defs>';
// Il centro di un passeggero nell'interno (per l'anello di luce intorno a sé).
const CENTRO = { emma: [142, -36], al: [140, 19], mare: [136, 0], parco: [140, -24], paperella: [120, 17] };
function testa(i, tipo, dy) {
  const S = INTERNO.scala, x0 = INTERNO.centri[i] - 120 * S, y0 = INTERNO.ruote - 150 * S + (dy || 0);
  const l = CENTRO[tipo] || CENTRO.al;
  return [x0 + l[0] * S, y0 + l[1] * S];
}
// La sommità della testa (da qui partono e arrivano i fili tra due passeggeri).
const CIMA = { emma: [142, -70], al: [140, -26], mare: [150, -48], parco: [140, -84], paperella: [120, -7] };
function cima(i, tipo, dy) {
  const S = INTERNO.scala, x0 = INTERNO.centri[i] - 120 * S, y0 = INTERNO.ruote - 150 * S + (dy || 0);
  const l = CIMA[tipo] || CIMA.al;
  return [x0 + l[0] * S, y0 + l[1] * S];
}
// L'anello di luce intorno a un passeggero (il filo verso sé stesso): il tracciato SVG.
const ANELLO = { emma: [50, 58], al: [66, 52], mare: [70, 54], parco: [72, 64], paperella: [50, 40] };
function anello(i, tipo, dy) {
  const a = testa(i, tipo, dy), r = ANELLO[tipo] || ANELLO.al, rx = r[0], ry = r[1];
  return 'M' + (a[0] - rx) + ' ' + a[1] + ' a' + rx + ' ' + ry + ' 0 1 0 ' + (2 * rx) + ' 0 a' + rx + ' ' + ry + ' 0 1 0 ' + (-2 * rx) + ' 0';
}
// Fa scorrere il mondo dell'interno: d = distanza percorsa (pixel dello schermo).
function scorriInterno(kit, d) {
  const q = sel => kit.stage.querySelector(sel);
  const lont = q('.g-int-lontano'), vic = q('.g-int-vicino');
  if (lont) lont.setAttribute('transform', 'translate(' + ((d * 0.25) % 3640 - 400).toFixed(1) + ' 0)');
  if (vic) vic.setAttribute('transform', 'translate(' + ((d * 1.6) % 3600 - 1800).toFixed(1) + ' 0)');
  kit.stage.querySelectorAll('.g-traversine').forEach(el => el.setAttribute('stroke-dashoffset', (-d % 28).toFixed(1)));
}

// ── Sottotitoli ─────────────────────────────────────────────────────────────────────────────────────
// La voce del narratore non ha etichetta; quella di Ada sì.
function sottotitolo(chi, testo) {
  return '<div class="sott">' + (chi === 'ADA' ? '<div class="chi chi-ada">ADA</div>' : '') + '<div class="detto">' + testo + '</div></div>';
}

// <modellino> generato da strumenti/modellino.py: non modificare a mano
const MOD = {"mare": {"frase": ["Al", "mare", "Emma"], "passeggeri": {"Al": {"biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"], "fili": {"Al": 1.0}}, "mare": {"biglietto": "#4681d7", "tratti": ["#427edb", "#3d79de", "#3975df"], "fili": {"Al": 0.3, "mare": 0.7}}, "Emma": {"biglietto": "#bc937f", "tratti": ["#728ebe", "#306edd", "#2864dc"], "fili": {"Al": 0.1, "mare": 0.7, "Emma": 0.2}, "fili_tratti": [{"Al": 0.1, "mare": 0.7, "Emma": 0.2}, {"Al": 0.1, "mare": 0.6, "Emma": 0.3}, {"Al": 0.1, "mare": 0.5, "Emma": 0.4}], "dopo_fili": "#8c8eab", "finestre": [[["Bovary", 4, "#f07064"], ["onde", 4, "#3c78e6"], ["sabbia", 4, "#5a96dc"], ["conchiglie", 4, "#508ceb"], ["felice", 4, "#f5c84c"], ["e", 3, "#f08c78"], ["altalena", 3, "#50be6e"], ["scivolo", 3, "#46af64"], ["nuota", 3, "#2864dc"], ["foglie", 2, "#3cb45a"], ["corre", 2, "#28aa50"], ["gioca", 2, "#28aaaa"], [".", 1, "#9696a0"], ["Fine", 1, "#46465a"]], [["nuota", 7, "#2864dc"], ["onde", 5, "#3c78e6"], ["conchiglie", 5, "#508ceb"], ["sabbia", 4, "#5a96dc"], ["gioca", 4, "#28aaaa"], ["felice", 3, "#f5c84c"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["scivolo", 2, "#46af64"], ["corre", 2, "#28aa50"], ["e", 1, "#f08c78"], ["Fine", 1, "#46465a"]], [["nuota", 18, "#2864dc"], ["gioca", 7, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]]]}}, "vasca": [["nuota", 18, "#2864dc"], ["gioca", 7, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]], "probabilita": {"nuota": 0.446, "gioca": 0.186, "onde": 0.087, "conchiglie": 0.073, "sabbia": 0.061}, "nuovo": {"nuota": "#2f73d4"}}, "parco": {"frase": ["Al", "parco", "Emma"], "passeggeri": {"Al": {"biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"], "fili": {"Al": 1.0}}, "parco": {"biglietto": "#47a688", "tratti": ["#3ca58a", "#30a38d", "#29a292"], "fili": {"Al": 0.3, "parco": 0.7}}, "Emma": {"biglietto": "#bc937f", "tratti": ["#60aa75", "#30ae57", "#28aa50"], "fili": {"Al": 0.1, "parco": 0.7, "Emma": 0.2}, "fili_tratti": [{"Al": 0.1, "parco": 0.7, "Emma": 0.2}, {"Al": 0.1, "parco": 0.6, "Emma": 0.3}, {"Al": 0.1, "parco": 0.5, "Emma": 0.4}], "dopo_fili": "#899785", "finestre": [[["Bovary", 4, "#f07064"], ["foglie", 4, "#3cb45a"], ["altalena", 4, "#50be6e"], ["scivolo", 4, "#46af64"], ["e", 3, "#f08c78"], ["onde", 3, "#3c78e6"], ["sabbia", 3, "#5a96dc"], ["conchiglie", 3, "#508ceb"], ["corre", 3, "#28aa50"], ["nuota", 2, "#2864dc"], ["gioca", 2, "#28aaaa"], ["felice", 2, "#f5c84c"], [".", 2, "#9696a0"], ["Fine", 1, "#46465a"]], [["corre", 8, "#28aa50"], ["foglie", 6, "#3cb45a"], ["altalena", 6, "#50be6e"], ["scivolo", 5, "#46af64"], ["gioca", 5, "#28aaaa"], ["Bovary", 2, "#f07064"], ["sabbia", 2, "#5a96dc"], ["conchiglie", 2, "#508ceb"], ["nuota", 2, "#2864dc"], ["e", 1, "#f08c78"], ["onde", 1, "#3c78e6"]], [["corre", 25, "#28aa50"], ["gioca", 6, "#28aaaa"], ["foglie", 3, "#3cb45a"], ["altalena", 3, "#50be6e"], ["scivolo", 2, "#46af64"], ["nuota", 1, "#2864dc"]]]}}, "vasca": [["corre", 25, "#28aa50"], ["gioca", 6, "#28aaaa"], ["foglie", 3, "#3cb45a"], ["altalena", 3, "#50be6e"], ["scivolo", 2, "#46af64"], ["nuota", 1, "#2864dc"]], "probabilita": {"corre": 0.621, "gioca": 0.135, "foglie": 0.084, "altalena": 0.082, "scivolo": 0.053}, "nuovo": {"corre": "#2daa64", "gioca": "#2e95a0"}}};
// </modellino>

window.G = {
  C, defs, MOD, MONDO, mix, tappa, fade, cam, camChiavi, posa, unico,
  emma, emmaTirata, al, mare, parco, paperella, ada, adaTesta,
  biglietto, striscia, spezzaparole, vagone, passeggero, telefono, bolle, insegna, salotto, SALOTTO,
  mondo, papereVasca, treno, posaTreno, sbarre, cambiaPasseggero, rng: kitRng, percorso, costruisciMondo, animaMondo, nascondiInMontagna, posaAda,
  finestra, papereFinestra, paperellaDiLuce, INTERNO, interno, interniDefs, testa, cima, anello, scorriInterno,
  sottotitolo, chunkSub, subs, RITMO, tempo, reale,
};
