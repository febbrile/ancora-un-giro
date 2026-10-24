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
  '02': {
    domanda: [[19.0, 22, 2.6, 1]], partenza: [[9.6, 18, 2.4, 1]], fili: [[11.4, 21.6, 6.0], [30.4, 40, 2.4, 1]],
    finestre: [[41.0, 46, 2.6, 1]], mare: [[17.4, 28, 2.6, 1]], pesca: [[21.8, 28, 2.4, 1]],
  },
  '03': {},
  '04': {
    fili: [[2.0, 9.0, 5.0]], finestre: [[15.6, 21.0, 3.6], [39.6, 42.4, 2.0, 1]],
  },
  '05': {
    indietro: [[11.0, 16, 2.4, 1]], prova: [[29.4, 34, 2.4, 1]], brivido: [[31.2, 36, 2.4, 1]],
  },
  '06': { finestre: [[38.4, 44, 1.9, 1]] },
  '07': {
    giri: [[30.2, 34.2, 2.8, 1]], punto: [[13.6, 17.4, 2.6, 1]], finestre: [[38.0, 41.0, 2.6, 1]],
  },
  '08': {},
  '09': { collina: [[11.6, 15.0, 2.4, 1]] },
  '10': { finestre: [[34.4, 40.6, 2.8, 1]] },
  '11': { finestre: [[34.0, 40.6, 2.8, 1]] },
  '12': { finestre: [[34.4, 40.6, 2.8, 1]] },
  '13': { continua: [[13.4, 25.4, 8.0]] },
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
// I sassolini delle parole corte («Il», «di», «si», episodio 8): della famiglia di Al, più piccoli e più tondi.
// Stessa scatola di Al; forma 0, 1, 2 cambia un poco il profilo, così tre sassolini vicini non sono identici.
function sasso(col, forma) {
  const f = [
    'M58 136 C56 110 80 94 106 94 C134 94 150 114 148 136 C146 156 126 164 102 164 C78 164 60 156 58 136 Z',
    'M60 138 C54 116 74 96 100 98 C128 98 152 112 148 138 C146 158 124 164 100 164 C76 164 62 156 60 138 Z',
    'M56 134 C58 108 84 96 108 98 C132 100 150 118 146 140 C142 158 122 164 98 164 C74 164 54 154 56 134 Z',
  ][(forma || 0) % 3];
  return '<g style="color:' + col + '"><ellipse cx="102" cy="132" rx="62" ry="46" fill="currentColor" opacity=".35" filter="url(#g-soft)"/>' +
    '<path d="' + f + '" fill="currentColor" stroke="' + C.crema + '" stroke-width="4" stroke-opacity=".9"/>' +
    '<ellipse cx="84" cy="110" rx="17" ry="6" fill="#FFFFFF" opacity=".3" transform="rotate(-15 84 110)"/>' +
    occhi(88, 132, 118, 132) +
    '<path d="M96 151 Q103 157 110 151" stroke="#0E2E33" stroke-width="3.5" stroke-linecap="round" fill="none"/></g>';
}
// Un pezzo di parola sul treno (episodio 6): un biglietto con gli occhi, senza scritte. Il corpo è il vestito di luce.
// strappo: i lati strappati ('s', 'd', 'sd'), con gli stessi denti del biglietto, così i bordi dei vicini combaciano.
function pezzo(col, strappo) {
  strappo = strappo || '';
  const s = strappo.includes('s'), d = strappo.includes('d');
  // Il biglietto in piedi sul sedile: 120×60 ingrandito a 140×74, da (32, 84).
  const forma = s || d ?
    'M' + (s ? 0 : 6) + ' 0 L' + (d ? 120 : 114) + ' 0 ' + (d ? bordoStrappato(120, false, 1) : 'Q120 0 120 6 L120 54 Q120 60 114 60') +
      ' L' + (s ? 0 : 6) + ' 60 ' + (s ? bordoStrappato(0, true, -1) : 'Q0 60 0 54 L0 6 Q0 0 6 0') + ' Z' :
    'M0 6 Q0 0 6 0 L114 0 Q120 0 120 6 L120 54 Q120 60 114 60 L6 60 Q0 60 0 54 L0 6 Q0 0 6 0 Z';
  return '<g style="color:' + col + '"><ellipse cx="102" cy="124" rx="80" ry="52" fill="currentColor" opacity=".35" filter="url(#g-soft)"/>' +
    '<g transform="translate(32 84) scale(1.17 1.24)"><path d="' + forma + '" fill="currentColor" stroke="' + C.crema + '" stroke-width="3.4" stroke-opacity=".9" stroke-linejoin="round"/>' +
    '<path d="M10 8 L70 8" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity=".3"/></g>' +
    occhi(86, 116, 120, 116) +
    '<path d="M94 140 Q103 148 112 140" stroke="#1C1F4A" stroke-width="4" stroke-linecap="round" fill="none"/></g>';
}
// Cane (episodio 8): un cucciolo di luce qualunque, senza collare. Il pelo è il vestito. Scatola 200×180.
// o.coda: l'angolo (gradi) della coda che scodinzola.
function cane(col, o) {
  o = o || {};
  const scuro = mix(col, '#000000', 0.25), chiaro = mix(col, '#FFFFFF', 0.35);
  return '<g style="color:' + col + '"><ellipse cx="100" cy="112" rx="84" ry="62" fill="currentColor" opacity=".35" filter="url(#g-soft)"/>' +
    '<g transform="rotate(' + (o.coda || 0) + ' 156 140)"><path d="M156 140 Q178 126 182 102" stroke="' + C.crema + '" stroke-width="16" stroke-linecap="round" fill="none" opacity=".9"/><path d="M156 140 Q178 126 182 102" stroke="currentColor" stroke-width="10" stroke-linecap="round" fill="none"/></g>' +
    '<path d="M54 170 C50 136 70 118 100 118 C132 118 152 136 148 170 Z" fill="currentColor" stroke="' + C.crema + '" stroke-width="4" stroke-opacity=".9"/>' +
    '<ellipse cx="100" cy="92" rx="48" ry="42" fill="currentColor" stroke="' + C.crema + '" stroke-width="4" stroke-opacity=".9"/>' +
    '<path d="M58 70 C40 66 32 92 40 118 C46 132 60 126 62 110 Z" fill="' + scuro + '" stroke="' + C.crema + '" stroke-width="3" stroke-opacity=".7"/>' +
    '<path d="M142 70 C160 66 168 92 160 118 C154 132 140 126 138 110 Z" fill="' + scuro + '" stroke="' + C.crema + '" stroke-width="3" stroke-opacity=".7"/>' +
    '<ellipse cx="80" cy="64" rx="16" ry="6" fill="#FFFFFF" opacity=".3" transform="rotate(-20 80 64)"/>' +
    '<ellipse cx="100" cy="112" rx="24" ry="17" fill="' + chiaro + '"/>' +
    occhi(82, 86, 118, 86) +
    '<ellipse cx="100" cy="104" rx="8" ry="6" fill="#1C1F4A"/>' +
    '<path d="M100 110 L100 116 M90 117 Q100 124 110 117" stroke="#1C1F4A" stroke-width="3.5" stroke-linecap="round" fill="none"/></g>';
}
// Chiama (episodio 8): la campanella del trenino, con due occhi tondi. La sua luce è il vestito. Scatola 200×180.
// o.tirata: la posa «tirata via» (va avanti, la luce resta indietro), come quella di Emma; o.suona: quanto oscilla (gradi).
function chiama(col, o) {
  o = o || {};
  const t = o.tirata ? 1 : 0;
  const scie = t ? '<path d="M184 96 L222 96 M188 122 L230 122 M184 148 L218 148" stroke="#FFF4E0" stroke-width="3" stroke-linecap="round" opacity=".4"/>' : '';
  return '<g style="color:' + col + '">' + scie +
    '<ellipse cx="' + (100 + 34 * t) + '" cy="116" rx="' + (76 + 30 * t) + '" ry="62" fill="currentColor" opacity=".35" filter="url(#g-soft)"/>' +
    '<g transform="rotate(' + ((o.suona || 0) - 14 * t) + ' 100 56)">' +
    '<rect x="94" y="40" width="12" height="18" rx="5" fill="' + C.oro + '" stroke="' + C.legnoScuro + '" stroke-width="2.5"/>' +
    '<path d="M100 56 C70 56 56 80 56 112 C56 136 50 148 40 156 L160 156 C150 148 144 136 144 112 C144 80 130 56 100 56 Z" fill="currentColor" stroke="' + C.crema + '" stroke-width="4" stroke-opacity=".9" stroke-linejoin="round"/>' +
    '<path d="M38 156 L162 156 Q166 166 156 168 L44 168 Q34 166 38 156 Z" fill="' + mix(col, '#000000', 0.2) + '" stroke="' + C.crema + '" stroke-width="3" stroke-opacity=".8"/>' +
    '<path d="M74 78 C66 90 64 104 66 120" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" fill="none" opacity=".35"/>' +
    occhi(84, 108, 116, 108) +
    '<path d="M92 132 Q100 139 108 132" stroke="#1C1F4A" stroke-width="3.5" stroke-linecap="round" fill="none"/></g></g>';
}
// Le bandierine (seconda stagione): biglietti senza parola che il custode attacca alla striscia, d'oro davanti alla frase
// del parco, d'argento davanti a ogni messaggio, d'ottone davanti a ogni risposta, turchese per la teleferica. Il bastoncino
// e il pomello sono del loro metallo, sempre; la stoffa è il vestito, e cambia colore come ogni vestito.
const METALLI = { oro: ['#F3C74E', '#B8862A'], argento: ['#C9CBD4', '#7E8190'], ottone: ['#C9AE78', '#87703F'], turchese: ['#3FA8B2', '#1F6F78'] };
const metallo = nome => METALLI[String(nome || 'oro').replace('⚑', '')] || METALLI.oro;
// Il segno della bandierina, per biglietti e strisce: centrato in (0, 0), alto circa 34.
function segnoBandierina(nome) {
  const [m, sc] = metallo(nome);
  return '<g><path d="M-8 17 L-8 -15" stroke="' + sc + '" stroke-width="3.4" stroke-linecap="round"/><circle cx="-8" cy="-16" r="3.6" fill="' + m + '" stroke="' + sc + '" stroke-width="1.5"/>' +
    '<path d="M-6 -13 Q4 -17 12 -12 Q8 -6 13 1 Q4 -3 -6 1 Z" fill="' + m + '" stroke="' + sc + '" stroke-width="1.8" stroke-linejoin="round"/></g>';
}
// Chi siede nel vagone: una bandierina con due occhi. Scatola 200×180; o.metallo: 'oro' | 'argento' | 'ottone' | 'turchese';
// o.tirata: la posa «tirata via» (il bastoncino va avanti, la stoffa resta indietro), come quella di Emma.
function bandierina(col, o) {
  o = o || {};
  const [m, sc] = metallo(o.metallo), t = o.tirata ? 1 : 0;
  const stoffa = t ?
    'M78 46 Q118 40 150 50 Q176 56 196 48 Q188 66 198 86 Q172 92 148 86 Q114 80 78 92 Z' :
    'M78 42 Q112 32 138 44 Q156 52 170 44 Q162 70 172 98 Q156 106 136 98 Q108 88 78 102 Z';
  const scie = t ? '<path d="M198 56 L232 56 M204 72 L240 72 M198 88 L226 88" stroke="#FFF4E0" stroke-width="3" stroke-linecap="round" opacity=".4"/>' : '';
  return '<g style="color:' + col + '">' + scie +
    '<ellipse cx="' + (124 + 20 * t) + '" cy="76" rx="' + (70 + 22 * t) + '" ry="52" fill="currentColor" opacity=".35" filter="url(#g-soft)"/>' +
    '<g transform="rotate(' + (-10 * t) + ' 76 170)">' +
    '<rect x="71" y="34" width="10" height="140" rx="5" fill="' + m + '" stroke="' + sc + '" stroke-width="2.5"/>' +
    '<path d="M74 44 L74 166" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity=".4"/>' +
    '<circle cx="76" cy="28" r="12" fill="' + m + '" stroke="' + sc + '" stroke-width="2.5"/><circle cx="72" cy="24" r="4" fill="#FFFFFF" opacity=".6"/>' +
    '<path d="' + stoffa + '" fill="currentColor" stroke="' + C.crema + '" stroke-width="4" stroke-opacity=".9" stroke-linejoin="round"/>' +
    '<path d="M86 52 Q108 44 128 52" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" fill="none" opacity=".3"/>' +
    (t ? occhi(102, 66, 128, 64) + '<path d="M106 80 Q113 85 120 80" stroke="#1C1F4A" stroke-width="3.5" stroke-linecap="round" fill="none"/>' :
      occhi(100, 66, 126, 66) + '<path d="M104 84 Q112 90 120 84" stroke="#1C1F4A" stroke-width="3.5" stroke-linecap="round" fill="none"/>') +
    '</g></g>';
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

// Il custode (fine dell'episodio 9, poi la seconda stagione): alto e magro, distinto, un po' altero, come il custode di
// una vecchia biblioteca. Redingote lunga, gilet con la catena dell'orologio, colletto bianco e cravatta, occhiali a
// mezzaluna in punta di naso; la lanterna, un mazzo di chiavi e il regolamento sotto il braccio, un grosso libro rilegato
// senza scritte. Scatola 240×420, piedi a y = 410.
// pose: 'base' (la lanterna in mano), 'alza' (la lanterna alzata, per fare luce), 'orologio' (guarda l'orologio; la
// lanterna è appesa al polso). Espressioni: 'base' (altero), 'sorriso', 'serio', 'chiusi'.
// Dalla seconda stagione: 'porge' (il braccio teso, la mano che tiene o porge qualcosa; la lanterna appesa al polso),
// 'attacca' (le due mani davanti al petto, il regolamento sotto il braccio; la lanterna per terra), 'legge' (il regolamento
// aperto con due mani; la lanterna per terra; o.dito da 0 a 1: la mano destra lascia il libro e ci batte sopra un dito;
// o.pagina: il disegno sulle pagine, PAGINE). Dove stanno le mani: CUSTODE_MANI. Le scene ci mettono la striscia.
// o.dondolo: di quanti gradi dondola la lanterna; o.occhi: dove guarda (da -1, a sinistra, a 1); o.luce: da 0 a 1.
const CU = { giacca: '#5A4A42', giaccaScura: '#3E322D', gilet: '#B5893A', giletScuro: '#8A6527', cravatta: '#7E2F3F', pantaloni: '#2B2A33',
  pelle: '#E8B48F', naso: '#DC9C80', bianco: '#F4F0E8', grigio: '#C9C3B8', grigioScuro: '#A39C90', libro: '#6B3A26', libroScuro: '#47251A',
  ottone: '#E0A93B', ottoneScuro: '#8C6420' };
// La lanterna del custode, appesa per il manico nel punto (x, y): alta 56. v: i colori (quelli d'ottone, se manca).
const LUME = { metallo: CU.ottone, scuro: CU.ottoneScuro, spento: '#8A7A5A', vetro: '#FFE7A8', alone: C.luce };
function lume(x, y, luce, v) {
  luce = luce === undefined ? 1 : luce;
  v = v || LUME;
  return '<g><circle cx="' + x + '" cy="' + (y + 34) + '" r="54" fill="' + v.alone + '" opacity="' + (0.4 * luce).toFixed(2) + '" filter="url(#g-soft)"/>' +
    '<path d="M' + (x - 9) + ' ' + (y + 12) + ' Q' + x + ' ' + (y - 4) + ' ' + (x + 9) + ' ' + (y + 12) + '" stroke="' + AI + '" stroke-width="3" fill="none"/>' +
    '<path d="M' + (x - 12) + ' ' + (y + 20) + ' L' + (x + 12) + ' ' + (y + 20) + ' L' + (x + 8) + ' ' + (y + 11) + ' L' + (x - 8) + ' ' + (y + 11) + ' Z" fill="' + v.metallo + '" stroke="' + v.scuro + '" stroke-width="2"/>' +
    '<rect x="' + (x - 12) + '" y="' + (y + 20) + '" width="24" height="28" rx="3" fill="' + mix(v.spento, v.vetro, luce) + '" stroke="' + v.scuro + '" stroke-width="2.5"/>' +
    '<ellipse cx="' + x + '" cy="' + (y + 36) + '" rx="5" ry="8" fill="#FFFFFF" opacity="' + (0.85 * luce).toFixed(2) + '"/>' +
    '<path d="M' + x + ' ' + (y + 20) + ' L' + x + ' ' + (y + 48) + '" stroke="' + v.scuro + '" stroke-width="1.5" opacity=".6"/>' +
    '<rect x="' + (x - 14) + '" y="' + (y + 47) + '" width="28" height="7" rx="2" fill="' + v.metallo + '" stroke="' + v.scuro + '" stroke-width="2"/></g>';
}
function custodeTesta(expr, o) {
  const dx = 3 * (o.occhi || 0);
  // Le sopracciglia: una un po' più alta dell'altra, da altero; dritte quando è serio.
  let ciglia = '<path d="M95 89 Q104 82 113 87 M127 89 Q136 86 145 90" stroke="' + CU.grigioScuro + '" stroke-width="4.5" stroke-linecap="round" fill="none"/>';
  let occhi, bocca = '<path d="M112 134 Q120 131 128 134" stroke="' + AI + '" stroke-width="2.4" stroke-linecap="round" fill="none"/>';
  if (expr === 'sorriso' || expr === 'chiusi') {
    occhi = expr === 'sorriso' ?
      '<path d="M98 102 Q104 97 110 102 M130 102 Q136 97 142 102" stroke="' + AI + '" stroke-width="2.8" stroke-linecap="round" fill="none"/>' :
      '<path d="M98 101 Q104 105 110 101 M130 101 Q136 105 142 101" stroke="' + AI + '" stroke-width="2.8" stroke-linecap="round" fill="none"/>';
    if (expr === 'sorriso') bocca = '<path d="M111 132 Q120 138 129 132" stroke="' + AI + '" stroke-width="2.6" stroke-linecap="round" fill="none"/>';
  } else {
    // Gli occhi a mezza palpebra: guarda dall'alto, sopra gli occhiali.
    occhi = '<circle cx="' + (104 + dx) + '" cy="102" r="3.6" fill="' + AI + '"/><circle cx="' + (136 + dx) + '" cy="102" r="3.6" fill="' + AI + '"/>' +
      '<path d="M97 99.5 L111 99.5 M129 99.5 L143 99.5" stroke="' + CU.pelle + '" stroke-width="4"/>' +
      '<path d="M97 98 Q104 96 111 98 M129 98 Q136 96 143 98" stroke="' + AI + '" stroke-width="2.4" stroke-linecap="round" fill="none"/>';
    if (expr === 'serio') {
      ciglia = '<path d="M95 88 L113 90 M127 90 L145 88" stroke="' + CU.grigioScuro + '" stroke-width="4.5" stroke-linecap="round" fill="none"/>';
      bocca = '<path d="M113 134 L127 134" stroke="' + AI + '" stroke-width="2.4" stroke-linecap="round" fill="none"/>';
    }
  }
  return '<rect x="111" y="132" width="18" height="24" fill="' + CU.pelle + '"/>' +
    '<ellipse cx="85" cy="106" rx="6" ry="9" fill="' + CU.pelle + '"/><ellipse cx="155" cy="106" rx="6" ry="9" fill="' + CU.pelle + '"/>' +
    '<ellipse cx="120" cy="100" rx="35" ry="42" fill="' + CU.pelle + '"/>' +
    // I capelli grigi, pettinati all'indietro con la riga, e la fronte alta; le basette corte.
    '<path d="M86 90 C82 62 100 54 121 54 C142 54 158 64 154 90 C150 74 140 66 126 66 C116 64 108 62 104 70 C96 72 89 80 86 90 Z" fill="' + CU.grigio + '"/>' +
    '<path d="M104 70 C112 60 128 58 140 64" stroke="' + CU.grigioScuro + '" stroke-width="2" fill="none" stroke-linecap="round"/>' +
    '<path d="M86 88 C84 98 85 106 88 112 L91 108 C89 102 89 96 90 90 Z M154 88 C156 98 155 106 152 112 L149 108 C151 102 151 96 150 90 Z" fill="' + CU.grigio + '"/>' +
    ciglia + occhi +
    '<path d="M121 100 C124 108 128 116 126 121 C124 124 118 124 115 121" fill="' + CU.naso + '"/>' +
    // Gli occhiali a mezzaluna, in punta di naso.
    '<path d="M96 108 Q104 118 112 108 Z M128 108 Q136 118 144 108 Z" fill="#FFFFFF" fill-opacity=".25" stroke="' + CU.ottone + '" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M112 109 Q120 106 128 109 M96 108 L87 104 M144 108 L153 104" stroke="' + CU.ottone + '" stroke-width="1.8" fill="none"/>' +
    '<path d="M106 125 Q113 120 120 123 Q127 120 134 125 Q127 128 120 125.5 Q113 128 106 125 Z" fill="' + CU.grigio + '"/>' +
    bocca;
}
function custode(pose, expr, o) {
  o = o || {};
  const luce = o.luce === undefined ? 1 : o.luce, dond = o.dondolo || 0;
  const gambe = '<rect x="101" y="360" width="16" height="42" fill="' + CU.pantaloni + '"/><rect x="123" y="360" width="16" height="42" fill="' + CU.pantaloni + '"/>' +
    '<path d="M92 404 Q92 396 108 396 L118 398 L118 408 L94 408 Z M148 404 Q148 396 132 396 L122 398 L122 408 L146 408 Z" fill="#14110F"/>' +
    '<path d="M98 400 L106 399 M142 400 L134 399" stroke="#FFFFFF" stroke-width="1.5" opacity=".35"/>';
  // Il gilet con i bottoni e la catena dell'orologio, la camicia, il colletto alto e la cravatta.
  const gilet = '<path d="M103 168 L137 168 L139 300 L120 314 L101 300 Z" fill="' + CU.gilet + '" stroke="' + CU.giletScuro + '" stroke-width="2"/>' +
    [204, 228, 252, 276].map(y => '<circle cx="120" cy="' + y + '" r="3.2" fill="' + CU.giletScuro + '"/>').join('') +
    '<path d="M120 240 Q128 256 136 250" stroke="' + CU.ottone + '" stroke-width="2" fill="none"/>' +
    '<path d="M108 156 L120 190 L132 156 Z" fill="' + CU.bianco + '"/>' +
    '<path d="M108 154 L120 166 L112 150 Z M132 154 L120 166 L128 150 Z" fill="' + CU.bianco + '" stroke="' + CU.grigio + '" stroke-width="1.2"/>' +
    '<path d="M120 166 L111 160 L111 172 Z M120 166 L129 160 L129 172 Z" fill="' + CU.cravatta + '"/><circle cx="120" cy="166" r="3.4" fill="' + CU.cravatta + '"/>' +
    '<path d="M117 168 L114 192 L120 198 L126 192 L123 168 Z" fill="' + CU.cravatta + '"/>';
  // La redingote lunga, aperta sul davanti, con i risvolti.
  const giacca = '<path d="M114 156 C98 157 86 165 82 184 L70 374 Q92 382 115 376 L104 300 L102 196 Z" fill="' + CU.giacca + '" stroke="' + AI + '" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M126 156 C142 157 154 165 158 184 L170 374 Q148 382 125 376 L136 300 L138 196 Z" fill="' + CU.giacca + '" stroke="' + AI + '" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M110 158 L98 204 L104 200 L114 172 Z M130 158 L142 204 L136 200 L126 172 Z" fill="' + CU.giaccaScura + '"/>' +
    '<path d="M86 300 L100 300 M140 300 L154 300" stroke="' + CU.giaccaScura + '" stroke-width="3" stroke-linecap="round"/>';
  // Le chiavi, appese alla tasca della redingote.
  const chiavi = '<circle cx="150" cy="306" r="7" fill="none" stroke="' + CU.ottone + '" stroke-width="3"/>' +
    '<path d="M146 312 L143 332 M143 326 L138 325 M143 332 L138 331 M150 313 L150 336 M150 330 L155 330 M150 336 L155 336 M154 312 L160 330 M158 324 L163 322" stroke="' + CU.ottone + '" stroke-width="3.2" stroke-linecap="round" fill="none"/>';
  // Il regolamento sotto il braccio destro (a destra di chi guarda), rilegato in cuoio con gli angoli d'ottone.
  const libro = '<g transform="rotate(-8 176 250)"><rect x="146" y="210" width="60" height="82" rx="3" fill="' + CU.libro + '" stroke="' + CU.libroScuro + '" stroke-width="2.5"/>' +
    '<rect x="201" y="214" width="7" height="74" fill="' + C.crema + '"/>' +
    '<path d="M146 224 L206 224 M146 230 L206 230 M146 272 L206 272 M146 278 L206 278" stroke="' + C.oro + '" stroke-width="2"/>' +
    '<path d="M146 210 L158 210 L146 222 Z M206 210 L194 210 L206 222 Z M146 292 L158 292 L146 280 Z M206 292 L194 292 L206 280 Z" fill="' + CU.ottone + '"/>' +
    '<path d="M182 292 L182 308 L186 303 L190 308 L190 292" fill="' + CU.cravatta + '"/></g>';
  const destro = '<path d="M156 182 Q180 226 174 284 L158 286 Q162 236 146 202 Z" fill="' + CU.giacca + '" stroke="' + AI + '" stroke-width="2.5"/><circle cx="166" cy="290" r="8" fill="' + CU.pelle + '"/>';
  let sinistro;
  if (pose === 'alza') {
    sinistro = '<g transform="rotate(' + dond + ' 38 132)">' + lume(38, 132, luce) + '</g>' +
      '<path d="M88 198 Q52 186 30 144 L48 130 Q66 166 100 182 Z" fill="' + CU.giacca + '" stroke="' + AI + '" stroke-width="2.5"/><circle cx="38" cy="134" r="8" fill="' + CU.pelle + '"/>';
  } else if (pose === 'orologio') {
    sinistro = '<g transform="rotate(' + dond + ' 92 248)">' + lume(92, 248, luce) + '</g>' +
      '<path d="M84 186 Q66 234 88 256 L106 240 Q90 228 96 204 Z" fill="' + CU.giacca + '" stroke="' + AI + '" stroke-width="2.5"/>' +
      '<path d="M104 236 Q112 254 120 240" stroke="' + CU.ottone + '" stroke-width="2" fill="none"/>' +
      '<circle cx="104" cy="224" r="11" fill="' + CU.ottone + '" stroke="' + CU.ottoneScuro + '" stroke-width="2"/><circle cx="104" cy="224" r="8" fill="' + C.crema + '"/>' +
      // Dalla seconda stagione (o.campanella) al posto della corona c'è la campanella, e la lancetta conta i giri (o.lancetta).
      (o.campanella ? '<path d="M104 224 L' + (104 + 7 * Math.sin(Math.PI * (1 + (o.lancetta || 0)))).toFixed(1) + ' ' + (224 - 7 * Math.cos(Math.PI * (1 + (o.lancetta || 0)))).toFixed(1) + '" stroke="' + AI + '" stroke-width="1.8" stroke-linecap="round"/>' +
        '<g transform="rotate(' + (o.suona || 0) + ' 104 212)"><path d="M100 212 Q100 204 104 204 Q108 204 108 212 L110 214 L98 214 Z" fill="' + CU.ottone + '" stroke="' + CU.ottoneScuro + '" stroke-width="1.2"/></g>' :
        '<path d="M104 224 L104 218 M104 224 L108 226" stroke="' + AI + '" stroke-width="1.6" stroke-linecap="round"/><circle cx="104" cy="211" r="3" fill="none" stroke="' + CU.ottone + '" stroke-width="2"/>') +
      '<circle cx="98" cy="238" r="8" fill="' + CU.pelle + '"/>';
  } else {
    sinistro = '<path d="M84 186 Q64 232 68 290 L82 292 Q80 240 96 204 Z" fill="' + CU.giacca + '" stroke="' + AI + '" stroke-width="2.5"/>' +
      '<g transform="rotate(' + dond + ' 74 296)">' + lume(74, 296, luce) + '</g><circle cx="74" cy="296" r="8" fill="' + CU.pelle + '"/>';
  }
  let davanti = '';
  if (pose === 'porge') {
    sinistro = '<path d="M86 188 Q56 198 26 196 L26 214 Q58 218 92 208 Z" fill="' + CU.giacca + '" stroke="' + AI + '" stroke-width="2.5"/>' +
      '<g transform="rotate(' + dond + ' 30 212)">' + lume(30, 212, luce) + '</g><circle cx="20" cy="205" r="8" fill="' + CU.pelle + '"/>';
  } else if (pose === 'attacca') {
    sinistro = '<g transform="rotate(' + dond + ' 40 356)">' + lume(40, 356, luce) + '</g>' +
      '<path d="M84 186 Q64 230 86 258 L102 246 Q86 228 96 204 Z" fill="' + CU.giacca + '" stroke="' + AI + '" stroke-width="2.5"/><circle cx="100" cy="252" r="8" fill="' + CU.pelle + '"/>';
    return '<g>' + gambe + gilet + giacca + chiavi + libro +
      '<path d="M156 182 Q180 222 170 254 L148 258 Q160 230 146 202 Z" fill="' + CU.giacca + '" stroke="' + AI + '" stroke-width="2.5"/><circle cx="144" cy="254" r="8" fill="' + CU.pelle + '"/>' +
      sinistro + custodeTesta(expr, o) + '</g>';
  } else if (pose === 'legge') {
    const dito = o.dito || 0, hx = 168 - 22 * dito, hy = 282 - 20 * dito;
    sinistro = '<g transform="rotate(' + dond + ' 40 356)">' + lume(40, 356, luce) + '</g>' +
      '<path d="M84 186 Q64 232 66 280 L80 284 Q80 240 96 204 Z" fill="' + CU.giacca + '" stroke="' + AI + '" stroke-width="2.5"/>';
    const dx = '<path d="M156 182 Q176 230 ' + (hx + 6) + ' ' + (hy - 2) + ' L' + (hx - 8) + ' ' + (hy + 2) + ' Q160 240 144 204 Z" fill="' + CU.giacca + '" stroke="' + AI + '" stroke-width="2.5"/>';
    davanti = libroAperto(120, 262, o.pagina) + '<circle cx="72" cy="284" r="8" fill="' + CU.pelle + '"/>' + dx +
      '<circle cx="' + hx + '" cy="' + hy + '" r="8" fill="' + CU.pelle + '"/>' +
      (dito > 0 ? '<path d="M' + (hx - 4) + ' ' + (hy - 2) + ' L' + (hx - 12) + ' ' + (hy - 8) + '" stroke="' + CU.pelle + '" stroke-width="5" stroke-linecap="round"/>' : '');
    return '<g>' + gambe + gilet + giacca + chiavi + sinistro + custodeTesta(expr, o) + davanti + '</g>';
  }
  return '<g>' + gambe + gilet + giacca + chiavi + libro + destro + sinistro + custodeTesta(expr, o) + '</g>';
}
// Dove stanno le mani del custode, nella sua scatola (240×420): per metterci la striscia.
const CUSTODE_MANI = { porge: [20, 205], attacca: [[100, 252], [144, 254]], legge: [[72, 284], [168, 282]] };
// Il regolamento aperto, rilegato in cuoio: centrato in (x, y), largo 132. Sulle pagine nessuna scritta, solo disegni
// (pagina: una chiave di PAGINE, o niente: pagine bianche con le righe dei disegni a matita).
function libroAperto(x, y, pagina, colori) {
  const k = colori || { libro: CU.libro, scuro: CU.libroScuro };
  return '<g transform="translate(' + (x - 120) + ' ' + (y - 262) + ')">' +
    '<path d="M120 236 Q90 228 54 234 L54 290 Q90 284 120 292 Q150 284 186 290 L186 234 Q150 228 120 236 Z" fill="' + k.libro + '" stroke="' + k.scuro + '" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M120 238 Q92 230 60 236 L60 284 Q92 280 120 287 Q148 280 180 284 L180 236 Q148 230 120 238 Z" fill="' + C.crema + '"/>' +
    '<path d="M120 238 L120 287" stroke="' + C.cremaScura + '" stroke-width="2"/>' +
    (PAGINE[pagina] || '') + '</g>';
}
// I disegni del regolamento, a matita: nessuna scritta. Coordinate del libro aperto (pagine da x 60 a 180, y 236–284).
const PAGINE = {
  // La campanella: un trenino che fa il giro della pista, più volte (tre anelli), e una campanella. Nessun numero.
  campanella: '<g fill="none" stroke="' + C.cremaScura + '" stroke-width="1.8"><ellipse cx="90" cy="262" rx="24" ry="12"/><ellipse cx="90" cy="262" rx="18" ry="8"/><ellipse cx="90" cy="262" rx="12" ry="5"/>' +
    '<path d="M108 252 l6 2 l-6 3"/></g><rect x="62" y="254" width="12" height="7" rx="2" fill="' + C.rosso + '"/><rect x="74" y="255" width="9" height="6" rx="2" fill="' + C.crema + '" stroke="' + C.cremaScura + '" stroke-width="1"/>' +
    '<path d="M150 246 Q140 246 140 262 L138 268 L162 268 L160 262 Q160 246 150 246 Z" fill="' + CU.ottone + '" stroke="' + CU.ottoneScuro + '" stroke-width="1.4"/><circle cx="150" cy="270" r="2.4" fill="' + CU.ottoneScuro + '"/>' +
    '<path d="M134 250 l-4 -3 M134 258 l-5 0 M166 250 l4 -3 M166 258 l5 0" stroke="' + CU.ottoneScuro + '" stroke-width="1.4"/>',
  // La teleferica: un filo che sale tra due pali, la cabina appesa, una nuvola; accanto la bandierina turchese.
  teleferica: '<path d="M64 278 L64 252 M114 248 L114 240" stroke="' + C.cremaScura + '" stroke-width="2.4"/><path d="M62 254 L116 240" stroke="' + C.cremaScura + '" stroke-width="1.6"/>' +
    '<path d="M88 247 L88 252" stroke="' + C.cremaScura + '" stroke-width="1.6"/><rect x="82" y="252" width="12" height="11" rx="2" fill="#A064D7"/>' +
    '<path d="M100 248 q4 -6 10 -2 q6 -6 10 2 q4 6 -2 6 l-16 0 q-6 0 -2 -6 Z" fill="none" stroke="' + C.cremaScura + '" stroke-width="1.6"/>' +
    '<path d="M104 258 l-2 6 M110 258 l-2 6 M116 258 l-2 6" stroke="#5C8FD0" stroke-width="1.4"/>' +
    '<g transform="translate(150 262) scale(.7)">' + segnoBandierina('turchese') + '</g>',
  // La frase del parco: una bandierina d'oro davanti a una striscia con le onde del mare.
  frase: '<g transform="translate(76 260) scale(.62)">' + segnoBandierina('oro') + '</g>' +
    '<path d="M88 252 L112 250 L110 262 L112 274 L88 272 L91 262 Z" fill="none" stroke="' + C.cremaScura + '" stroke-width="1.8"/>' +
    '<path d="M93 262 q3 -3 6 0 t6 0" stroke="#5C8FD0" stroke-width="1.8" fill="none"/>' +
    '<path d="M130 268 L170 268 M134 268 L134 258 L166 258 L166 268" stroke="' + C.cremaScura + '" stroke-width="1.8" fill="none"/>' +
    '<g transform="translate(140 252) scale(.42)">' + segnoBandierina('oro') + '</g>' +
    '<path d="M146 252 l12 0 M146 256 l14 0" stroke="#5C8FD0" stroke-width="1.6"/>',
};
// Il custode del parco gemello (stagione 2, episodio 6): fa le stesse cose del custode di Ada, con un altro regolamento.
// Diverso a colpo d'occhio: basso e tondo, bonario, con la bombetta, i baffi a manubrio e il gilet a quadri; la lanterna
// e il regolamento sono verdi. Stessa scatola del custode, 240×420, piedi a y = 410: la testa arriva a metà del custode.
// pose: 'base' (la lanterna in mano, il regolamento sotto il braccio), 'alza' (la lanterna alzata), 'cenno' (il braccio
// teso, la mano aperta: «prego»; la lanterna appesa al polso), 'legge' (il regolamento aperto con due mani; la lanterna
// per terra). Espressioni: 'base', 'sorriso', 'serio', 'chiusi'. o.dondolo, o.occhi, o.luce: come per il custode.
const CG = { giacca: '#3E4A6E', giaccaScura: '#2C3552', quadri: '#C4523C', quadriChiaro: '#F1D9B0', quadriScuro: '#2F6B45',
  pantaloni: '#3A3340', cappello: '#2A2630', nastro: '#2F7A4A', libro: '#2F7A4A', libroScuro: '#1D5232', baffi: '#E9E2D6', baffiScuri: '#BDB3A3' };
const LUME_VERDE = { metallo: '#3E8F5C', scuro: '#225E38', spento: '#5E7A5E', vetro: '#D9FFC0', alone: '#A8EE86' };
function custodeGemelloTesta(expr, o) {
  const dx = 3 * (o.occhi || 0);
  let ciglia = '<path d="M98 170 Q105 165 112 169 M128 169 Q135 165 142 170" stroke="' + CG.baffiScuri + '" stroke-width="4" stroke-linecap="round" fill="none"/>';
  let occhi = '<circle cx="' + (106 + dx) + '" cy="180" r="4.6" fill="' + AI + '"/><circle cx="' + (134 + dx) + '" cy="180" r="4.6" fill="' + AI + '"/>' +
    '<circle cx="' + (107.6 + dx) + '" cy="178.4" r="1.6" fill="#FFFFFF"/><circle cx="' + (135.6 + dx) + '" cy="178.4" r="1.6" fill="#FFFFFF"/>';
  let bocca = '<path d="M113 213 Q120 218 127 213" stroke="' + AI + '" stroke-width="2.4" stroke-linecap="round" fill="none"/>';
  if (expr === 'sorriso') {
    occhi = '<path d="M100 181 Q106 175 112 181 M128 181 Q134 175 140 181" stroke="' + AI + '" stroke-width="2.8" stroke-linecap="round" fill="none"/>';
    bocca = '<path d="M110 211 Q120 222 130 211 Z" fill="' + CU.cravatta + '" stroke="' + AI + '" stroke-width="2.2" stroke-linejoin="round"/>';
  } else if (expr === 'chiusi') {
    occhi = '<path d="M100 179 Q106 184 112 179 M128 179 Q134 184 140 179" stroke="' + AI + '" stroke-width="2.8" stroke-linecap="round" fill="none"/>';
  } else if (expr === 'serio') {
    ciglia = '<path d="M98 169 L112 171 M128 171 L142 169" stroke="' + CG.baffiScuri + '" stroke-width="4" stroke-linecap="round" fill="none"/>';
    bocca = '<path d="M114 214 L126 214" stroke="' + AI + '" stroke-width="2.4" stroke-linecap="round" fill="none"/>';
  }
  return '<ellipse cx="85" cy="186" rx="6" ry="8" fill="' + CU.pelle + '"/><ellipse cx="155" cy="186" rx="6" ry="8" fill="' + CU.pelle + '"/>' +
    '<ellipse cx="120" cy="184" rx="36" ry="34" fill="' + CU.pelle + '"/>' +
    // I ciuffi bianchi sopra le orecchie, sotto la bombetta.
    '<path d="M86 168 C80 176 82 186 88 190 C88 182 90 176 94 170 Z M154 168 C160 176 158 186 152 190 C152 182 150 176 146 170 Z" fill="' + CG.baffi + '"/>' +
    '<circle cx="97" cy="197" r="7" fill="#FF8F8F" opacity=".35"/><circle cx="143" cy="197" r="7" fill="#FF8F8F" opacity=".35"/>' +
    ciglia + occhi +
    '<ellipse cx="120" cy="193" rx="8" ry="7" fill="' + CU.naso + '"/>' +
    // I baffi a manubrio, con le punte arricciate in su.
    '<path d="M120 201 C112 197 102 198 96 204 C92 208 88 206 88 200 C86 210 96 214 104 210 C110 208 116 206 120 205 C124 206 130 208 136 210 C144 214 154 210 152 200 C152 206 148 208 144 204 C138 198 128 197 120 201 Z" fill="' + CG.baffi + '" stroke="' + CG.baffiScuri + '" stroke-width="1.5" stroke-linejoin="round"/>' +
    bocca +
    // La bombetta, con il nastro verde.
    '<path d="M90 158 C88 128 102 118 120 118 C138 118 152 128 150 158 Z" fill="' + CG.cappello + '"/>' +
    '<path d="M90 150 L150 150 L150 158 L90 158 Z" fill="' + CG.nastro + '"/>' +
    '<ellipse cx="120" cy="159" rx="44" ry="7" fill="' + CG.cappello + '"/>' +
    '<path d="M100 130 Q110 122 122 122" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity=".18"/>';
}
// Il regolamento verde, chiuso: scatola 56×74 con l'angolo in alto a sinistra in (x, y).
function regolamentoVerde(x, y) {
  return '<rect x="' + x + '" y="' + y + '" width="56" height="74" rx="3" fill="' + CG.libro + '" stroke="' + CG.libroScuro + '" stroke-width="2.5"/>' +
    '<rect x="' + (x + 51) + '" y="' + (y + 4) + '" width="7" height="66" fill="' + C.crema + '"/>' +
    '<path d="M' + x + ' ' + (y + 13) + ' L' + (x + 56) + ' ' + (y + 13) + ' M' + x + ' ' + (y + 61) + ' L' + (x + 56) + ' ' + (y + 61) + '" stroke="' + C.oro + '" stroke-width="2"/>' +
    '<circle cx="' + (x + 28) + '" cy="' + (y + 37) + '" r="9" fill="none" stroke="' + C.oro + '" stroke-width="2"/>' +
    '<path d="M' + (x + 24) + ' ' + (y + 74) + ' L' + (x + 24) + ' ' + (y + 88) + ' L' + (x + 28) + ' ' + (y + 83) + ' L' + (x + 32) + ' ' + (y + 88) + ' L' + (x + 32) + ' ' + (y + 74) + '" fill="' + C.oro + '"/>';
}
function custodeGemello(pose, expr, o) {
  o = o || {};
  const luce = o.luce === undefined ? 1 : o.luce, dond = o.dondolo || 0;
  const gambe = '<rect x="101" y="360" width="16" height="38" fill="' + CG.pantaloni + '"/><rect x="123" y="360" width="16" height="38" fill="' + CG.pantaloni + '"/>' +
    '<path d="M90 404 Q90 394 108 394 L118 396 L118 408 L92 408 Z M150 404 Q150 394 132 394 L122 396 L122 408 L148 408 Z" fill="#14110F"/>' +
    '<path d="M96 399 L105 398 M144 399 L135 398" stroke="#FFFFFF" stroke-width="1.5" opacity=".35"/>';
  // Il gilet a quadri, tondo come la pancia, con i bottoni d'ottone; il colletto e il farfallino verde.
  const quadri = '<defs><pattern id="g-quadri-gemello" width="18" height="18" patternUnits="userSpaceOnUse">' +
    '<rect width="18" height="18" fill="' + CG.quadri + '"/><rect width="7" height="18" fill="' + CG.quadriChiaro + '" opacity=".38"/>' +
    '<rect width="18" height="7" fill="' + CG.quadriChiaro + '" opacity=".38"/><path d="M12.5 0 L12.5 18 M0 12.5 L18 12.5" stroke="' + CG.quadriScuro + '" stroke-width="1.6"/></pattern></defs>';
  const gilet = '<path d="M98 226 L142 226 C170 262 174 318 152 356 Q120 368 88 356 C66 318 70 262 98 226 Z" fill="url(#g-quadri-gemello)" stroke="#8E3A2A" stroke-width="2"/>' +
    [256, 284, 312, 340].map(y => '<circle cx="120" cy="' + y + '" r="3.6" fill="' + CU.ottone + '" stroke="' + CU.ottoneScuro + '" stroke-width="1"/>').join('') +
    '<path d="M106 214 L120 236 L134 214 Z" fill="' + CU.bianco + '"/>' +
    '<path d="M120 226 L106 218 L106 234 Z M120 226 L134 218 L134 234 Z" fill="' + CG.nastro + '" stroke="' + CG.libroScuro + '" stroke-width="1.2"/><circle cx="120" cy="226" r="4" fill="' + CG.nastro + '"/>';
  // La giacca corta, aperta sulla pancia.
  const giacca = '<path d="M104 216 C74 220 48 242 44 282 C40 326 58 360 94 370 L100 358 C74 322 72 262 100 230 Z" fill="' + CG.giacca + '" stroke="' + AI + '" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M136 216 C166 220 192 242 196 282 C200 326 182 360 146 370 L140 358 C166 322 168 262 140 230 Z" fill="' + CG.giacca + '" stroke="' + AI + '" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M104 218 L92 250 L100 248 L108 228 Z M136 218 L148 250 L140 248 L132 228 Z" fill="' + CG.giaccaScura + '"/>' +
    // Il fazzoletto verde nel taschino.
    '<path d="M156 264 L174 262 L173 268 L157 270 Z" fill="' + CG.giaccaScura + '"/><path d="M160 264 L163 256 L166 263 L169 257 L171 263 Z" fill="' + CG.nastro + '"/>';
  let destro, sinistro, davanti = '';
  if (pose === 'legge') {
    // Il regolamento aperto davanti alla pancia, con tutte e due le mani; la lanterna per terra, accanto ai piedi.
    sinistro = '<g transform="rotate(' + dond + ' 40 354)">' + lume(40, 354, luce, LUME_VERDE) + '</g>' +
      '<path d="M78 244 Q60 282 80 312 L94 300 Q82 280 92 256 Z" fill="' + CG.giacca + '" stroke="' + AI + '" stroke-width="2.5"/>';
    destro = '<path d="M162 244 Q180 282 160 312 L146 300 Q158 280 148 256 Z" fill="' + CG.giacca + '" stroke="' + AI + '" stroke-width="2.5"/>';
    davanti = '<path d="M120 286 Q96 278 66 284 L66 336 Q96 330 120 338 Q144 330 174 336 L174 284 Q144 278 120 286 Z" fill="' + CG.libro + '" stroke="' + CG.libroScuro + '" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="M120 288 Q98 280 72 285 L72 330 Q98 326 120 332 Q142 326 168 330 L168 285 Q142 280 120 288 Z" fill="' + C.crema + '"/>' +
      '<path d="M120 288 L120 332" stroke="' + C.cremaScura + '" stroke-width="2"/>' +
      // Le pagine hanno disegni, non scritte: qui un treno e una paperella, tratteggiati.
      '<path d="M80 314 L110 316 M82 306 Q86 300 92 306 Q98 300 104 306" stroke="' + C.cremaScura + '" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
      '<path d="M134 306 Q142 296 150 304 Q158 302 156 312 Q146 318 134 312 Z" fill="none" stroke="' + C.cremaScura + '" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<circle cx="80" cy="318" r="8" fill="' + CU.pelle + '"/><circle cx="160" cy="318" r="8" fill="' + CU.pelle + '"/>';
  } else {
    // Il regolamento sotto il braccio sinistro di lui (a destra di chi guarda).
    destro = '<g transform="rotate(-10 196 300)">' + regolamentoVerde(172, 262) + '</g>' +
      '<path d="M170 238 Q202 272 194 320 L178 322 Q182 284 160 256 Z" fill="' + CG.giacca + '" stroke="' + AI + '" stroke-width="2.5"/><circle cx="186" cy="326" r="8" fill="' + CU.pelle + '"/>';
    if (pose === 'alza') {
      sinistro = '<g transform="rotate(' + dond + ' 40 168)">' + lume(40, 168, luce, LUME_VERDE) + '</g>' +
        '<path d="M84 250 Q52 232 32 182 L50 170 Q62 214 92 234 Z" fill="' + CG.giacca + '" stroke="' + AI + '" stroke-width="2.5"/><circle cx="40" cy="170" r="8" fill="' + CU.pelle + '"/>';
    } else if (pose === 'cenno') {
      sinistro = '<g transform="rotate(' + dond + ' 34 236)">' + lume(34, 236, luce, LUME_VERDE) + '</g>' +
        '<path d="M80 244 Q50 252 30 242 L34 226 Q54 234 86 230 Z" fill="' + CG.giacca + '" stroke="' + AI + '" stroke-width="2.5"/>' +
        // La mano aperta, il palmo in su.
        '<path d="M32 228 Q14 226 8 232 Q10 238 20 238 Q14 242 18 246 Q26 246 34 242 Z" fill="' + CU.pelle + '" stroke="' + CU.naso + '" stroke-width="1.5" stroke-linejoin="round"/>';
    } else {
      sinistro = '<path d="M70 238 Q40 278 42 324 L56 326 Q58 288 84 254 Z" fill="' + CG.giacca + '" stroke="' + AI + '" stroke-width="2.5"/>' +
        '<g transform="rotate(' + dond + ' 48 330)">' + lume(48, 330, luce, LUME_VERDE) + '</g><circle cx="48" cy="330" r="8" fill="' + CU.pelle + '"/>';
    }
  }
  return '<g>' + quadri + gambe + gilet + giacca + destro + sinistro + custodeGemelloTesta(expr, o) + davanti + '</g>';
}
// La guardiola del custode, accanto al cancello: una casetta di legno col tetto a righe e la finestra accesa.
// Scatola 120×170, base a y = 170. o.porta da 0 (chiusa) a 1 (aperta), o.luce da 0 a 1.
function guardiola(o) {
  o = o || {};
  const porta = o.porta || 0, luce = o.luce === undefined ? 1 : o.luce;
  let assi = '';
  for (let x = 22; x < 110; x += 12) assi += 'M' + x + ' 58 L' + x + ' 168 ';
  return '<g><rect x="10" y="54" width="100" height="116" fill="' + C.legno + '" stroke="' + C.legnoScuro + '" stroke-width="3"/>' +
    '<path d="' + assi + '" stroke="' + C.legnoScuro + '" stroke-width="1.5" opacity=".5"/>' +
    '<path d="M0 60 L60 10 L120 60 Z" fill="' + C.rosso + '" stroke="' + C.rossoScuro + '" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M30 35 L22 60 L38 60 L44 27 Z M76 27 L82 60 L98 60 L90 35 Z" fill="' + C.crema + '"/>' +
    '<circle cx="60" cy="10" r="5" fill="' + C.luce + '"/>' +
    // La finestra accesa.
    '<rect x="20" y="74" width="40" height="38" rx="3" fill="' + mix('#3A3060', C.luce, luce) + '" stroke="' + C.legnoScuro + '" stroke-width="3"/>' +
    '<path d="M40 74 L40 112 M20 93 L60 93" stroke="' + C.legnoScuro + '" stroke-width="3"/>' +
    '<rect x="14" y="74" width="52" height="60" fill="' + C.luce + '" opacity="' + (0.18 * luce).toFixed(2) + '" filter="url(#g-soft)"/>' +
    // La porta: aperta, dentro si vede la luce (e, con o.dentro, gli scaffali, le chiavi al chiodo, la teiera e il leggio).
    '<rect x="70" y="94" width="30" height="76" fill="' + mix('#2A2240', C.luce2, 0.8 * luce) + '"/>' +
    (o.dentro ? '<path d="M72 112 L98 112 M72 128 L98 128" stroke="' + C.legnoScuro + '" stroke-width="2.4"/>' +
      '<rect x="74" y="104" width="4" height="8" fill="#7E2F3F"/><rect x="79" y="105" width="3" height="7" fill="#3F6FA8"/><rect x="83" y="103" width="4" height="9" fill="#5A7A3A"/>' +
      '<circle cx="92" cy="118" r="1.6" fill="' + C.legnoScuro + '"/><path d="M92 118 L90 124 M92 118 L94 125 M92 118 L92 126" stroke="' + CU.ottone + '" stroke-width="1.6"/>' +
      '<path d="M74 128 Q74 121 79 121 Q84 121 84 128 Z" fill="#C9553E"/><path d="M84 124 L88 122" stroke="#C9553E" stroke-width="1.6"/>' +
      '<path d="M86 170 L90 146 L94 170 M84 146 L97 141 L97 147 L84 151 Z" fill="' + CU.libro + '" stroke="' + C.legnoScuro + '" stroke-width="1"/>' : '') +
    '<g transform="translate(70 0) scale(' + (1 - 0.8 * porta).toFixed(3) + ' 1) translate(-70 0)"><rect x="70" y="94" width="30" height="76" fill="' + C.legnoScuro + '" stroke="#4A2E20" stroke-width="2"/>' +
    '<circle cx="94" cy="134" r="3" fill="' + CU.ottone + '"/></g></g>';
}

// ── Oggetti ─────────────────────────────────────────────────────────────────────────────────────────
// Un biglietto: scatola 120×60.
// o.strappo: i lati strappati di un pezzo di parola (episodio 6): 's' a sinistra, 'd' a destra, 'sd' tutti e due.
// I denti dello strappo sono sempre gli stessi, così i bordi di due pezzi vicini combaciano.
const DENTI = [0, 5, 2, 7, 1, 6, 3, 8, 2, 6, 0];
function bordoStrappato(x, su, verso) {
  // Da y = 0 a y = 60 (su = false) o al contrario. I denti sono gli stessi sui due lati (x + d), così il lato destro di un
  // pezzo e il lato sinistro del pezzo dopo, messi a 120 l'uno dall'altro, si incastrano senza buchi (verso non conta).
  const p = DENTI.map((d, i) => [x + d, i * 6]);
  return (su ? p.reverse() : p).map(q => 'L' + q[0] + ' ' + q[1]).join(' ');
}
function biglietto(testo, o) {
  o = o || {};
  const s = (o.strappo || '').includes('s'), d = (o.strappo || '').includes('d');
  const forma = s || d ?
    'M' + (s ? 0 : 6) + ' 0 L' + (d ? 120 : 114) + ' 0 ' + (d ? bordoStrappato(120, false, 1) : 'Q120 0 120 6 L120 54 Q120 60 114 60') +
      ' L' + (s ? 0 : 6) + ' 60 ' + (s ? bordoStrappato(0, true, -1) : 'Q0 60 0 54 L0 6 Q0 0 6 0') + ' Z' :
    'M0 6 Q0 0 6 0 L114 0 Q120 0 120 6 L120 22 Q112 30 120 38 L120 54 Q120 60 114 60 L6 60 Q0 60 0 54 L0 38 Q8 30 0 22 Z';
  const segno = s ? '' : '<line x1="26" y1="8" x2="26" y2="52" stroke="' + C.cremaScura + '" stroke-width="2" stroke-dasharray="4 4"/><circle cx="13" cy="30" r="5" fill="' + C.rosso + '"/>';
  // Una bandierina (seconda stagione) non ha parola: sul biglietto c'è il suo segno.
  const dentro = String(testo).charAt(0) === '⚑' ? '<g transform="translate(' + (s ? 60 : 73) + ' 30)">' + segnoBandierina(testo) + '</g>' :
    '<text x="' + (s ? 60 : 73) + '" y="39" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="24" fill="' + C.inchiostro + '">' + testo + '</text>';
  return '<g><path d="' + forma + '" fill="' + (o.fondo || C.crema) + '" stroke="' + C.cremaScura + '" stroke-width="2" stroke-linejoin="round"/>' + segno + dentro + '</g>';
}
// La lanterna dei treni di prova (episodio 5): il biglietto della parola dopo, che non sale e resta acceso sopra la
// vasca, del colore della sua parola. luce da 0 (spenta) a 1. Scatola 120×60, come il biglietto.
function lanterna(testo, col, luce) {
  luce = luce === undefined ? 1 : luce;
  return '<g><ellipse cx="60" cy="30" rx="96" ry="66" fill="' + col + '" opacity="' + (0.55 * luce).toFixed(2) + '" filter="url(#g-soft)"/>' +
    biglietto(testo, { fondo: mix(C.crema, col, 0.35 + 0.3 * luce) }) +
    '<path d="M4 6 L116 6" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="' + (0.5 * luce).toFixed(2) + '"/></g>';
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
// o: { primo, sbarra (0 alzata .. 1 abbassata), ruote (gradi), striscia (colore), fanale (0 spento .. 1 acceso),
//      grigio (un treno di prova: senza vernice e senza lucine, solo il fanale) }; dentro: il passeggero.
const SBARRA = [30, 58];
const GRIGIO = { scocca: '#8C8E99', scuro: '#5E606C', striscia: '#73757F', schienale: '#6A6C77', righe: '#80828C' };
function vagone(o, dentro) {
  o = o || {};
  const sb = o.sbarra === undefined ? 1 : o.sbarra, rr = o.ruote || 0, gr = !!o.grigio;
  const fan = o.fanale === undefined ? 1 : o.fanale;
  const ruota = cx => '<g transform="rotate(' + rr + ' ' + cx + ' 136)"><circle cx="' + cx + '" cy="136" r="15" fill="#2A2440" stroke="' + C.acciaioScuro + '" stroke-width="3"/><path d="M' + (cx - 10) + ' 136 L' + (cx + 10) + ' 136 M' + cx + ' 126 L' + cx + ' 146" stroke="' + C.acciaio + '" stroke-width="3"/><circle cx="' + cx + '" cy="136" r="4.5" fill="' + (gr ? GRIGIO.scuro : C.oro) + '"/></g>';
  const lampadine = gr ? '' : [48, 92, 136, 180].map(x => '<circle class="g-lucina" cx="' + x + '" cy="98" r="5" fill="' + C.luce + '"/><circle class="g-lucina" cx="' + x + '" cy="98" r="9" fill="' + C.luce + '" opacity=".25"/>').join('');
  const fanale = o.primo ? '<ellipse cx="0" cy="84" rx="34" ry="18" fill="' + C.luce + '" opacity="' + (0.35 * fan).toFixed(3) + '" filter="url(#g-glow)"/>' : '';
  const faro = o.primo ? '<circle cx="12" cy="80" r="10" fill="' + mix(gr ? '#55565F' : '#6E5A3A', C.luce, fan) + '" stroke="' + (gr ? GRIGIO.scuro : C.legnoScuro) + '" stroke-width="2.5"/><circle cx="9" cy="77" r="3" fill="#FFFFFF" opacity="' + (0.3 + 0.7 * fan).toFixed(2) + '"/>' : '';
  return '<g>' +
    // Lo schienale: alto e imbottito, dietro al passeggero.
    '<path d="M176 64 L178 -6 Q179 -24 198 -24 L210 -24 Q230 -24 230 -6 L228 64 Z" fill="' + (gr ? GRIGIO.schienale : C.rossoScuro) + '"/>' +
    '<path d="M188 -8 L188 56 M204 -12 L204 56 M219 -8 L219 56" stroke="' + (gr ? GRIGIO.righe : C.rosso) + '" stroke-width="5" stroke-linecap="round"/>' +
    (dentro || '') +
    fanale +
    // La scocca: un guscio arrotondato, il muso davanti più alto.
    '<path d="M4 66 Q2 56 12 56 L226 58 Q238 58 236 70 L228 120 Q225 134 210 134 L36 134 Q18 134 14 120 Z" fill="' + (gr ? GRIGIO.scocca : C.crema) + '" stroke="' + (gr ? GRIGIO.scuro : C.legnoScuro) + '" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M8 66 L232 68" stroke="' + (gr ? GRIGIO.scuro : C.oro) + '" stroke-width="7" stroke-linecap="round"/>' +
    '<path d="M11 86 L233 86 L230 110 L16 110 Z" fill="' + (gr ? GRIGIO.striscia : (o.striscia || C.rosso)) + '"/>' +
    (gr ? '<path d="M40 76 L44 80 M150 118 L156 116 M196 78 L200 74" stroke="' + GRIGIO.scuro + '" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>' : '') +
    lampadine + faro +
    '<rect x="230" y="112" width="22" height="8" rx="3" fill="' + C.acciaioScuro + '"/>' +
    '<rect x="30" y="128" width="190" height="10" rx="5" fill="' + (gr ? GRIGIO.scuro : C.legnoScuro) + '"/>' +
    ruota(62) + ruota(180) +
    '<g class="g-sbarra" transform="rotate(' + (-105 * (1 - sb)).toFixed(1) + ' ' + SBARRA[0] + ' ' + SBARRA[1] + ')"><rect x="22" y="' + (SBARRA[1] - 7) + '" width="96" height="11" rx="5.5" fill="' + (gr ? GRIGIO.righe : C.oro) + '" stroke="' + (gr ? GRIGIO.scuro : C.legnoScuro) + '" stroke-width="2.5"/></g>' +
    '</g>';
}
// Chi siede nel vagone: tipo 'emma' | 'al' | 'mare' | 'parco' | 'paperella', col il colore del vestito.
// Tutti hanno il centro a x ≈ 140, davanti allo schienale; la testa sta sopra la sponda.
const POSTO = {
  emma: 'translate(62 -100) scale(.8)', al: 'translate(38 -100)', mare: 'translate(34 -118)', parco: 'translate(40 -122)', paperella: 'translate(80 -20) scale(1.1)',
  sasso: 'translate(38 -100)', pezzo: 'translate(38 -100)', cane: 'translate(40 -104)', chiama: 'translate(40 -104)',
  bandierina: 'translate(20 -104)',
};
// o: { tirata, bocca (Emma), ciao (Parco), forma (sasso), strappo (pezzo), coda (Cane), suona (Chiama), metallo (bandierina) }.
function passeggero(tipo, col, o) {
  o = o || {};
  if (!POSTO[tipo]) return '';
  const dentro = tipo === 'emma' ? (o.tirata ? emmaTirata(col) : emma(col, { mouth: o.bocca })) :
    tipo === 'al' ? al(col) : tipo === 'mare' ? mare(col) : tipo === 'parco' ? parco(col, { ciao: o.ciao }) :
    tipo === 'sasso' ? sasso(col, o.forma) : tipo === 'pezzo' ? pezzo(col, o.strappo) : tipo === 'cane' ? cane(col, { coda: o.coda }) :
    tipo === 'chiama' ? chiama(col, { tirata: o.tirata, suona: o.suona }) : tipo === 'bandierina' ? bandierina(col, { metallo: o.metallo, tirata: o.tirata }) :
    paperella(col, { glow: true });
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
  if (o.chat) { risposta = chat(o.chat, o.puntini); }
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
// Una chat intera (episodi 4, 7, 8): o.chat = [['io', testo] | ['ai', testo] | ['ai', n] (n parole illeggibili)], dalla
// prima all'ultima; le bolle si impilano dal basso, quelle che non ci stanno escono in alto, sotto l'intestazione.
// puntini: i tre puntini di una risposta che sta arrivando (il tempo, per farli pulsare), o undefined.
function righeDi(testo, max) {
  const righe = [''];
  String(testo).split(' ').forEach(w => { const r = righe[righe.length - 1]; if (r && (r + ' ' + w).length > max) righe.push(w); else righe[righe.length - 1] = r ? r + ' ' + w : w; });
  return righe;
}
function chat(voci, puntini) {
  const pezzi = [];
  voci.forEach(([chi, x], k) => {
    const io = chi === 'io';
    if (typeof x === 'number') {
      const r = kitRng(77 + k), righe = [[]];
      let w = 0;
      for (let j = 0; j < x; j++) {
        const pw = 40 + Math.round(r() * 60);
        if (w + pw > 230 && righe[righe.length - 1].length) { righe.push([]); w = 0; }
        righe[righe.length - 1].push(pw); w += pw + 10;
      }
      pezzi.push({ io, h: righe.length * 34 + 22, w: 276, pillole: righe });
    } else {
      const righe = righeDi(x, 15), lw = Math.max(...righe.map(r => r.length));
      pezzi.push({ io, h: 20 + righe.length * 40, w: Math.min(290, 48 + lw * 16), righe });
    }
  });
  if (puntini !== undefined) pezzi.push({ io: false, h: 56, w: 110, puntini });
  let y = 570, out = '';
  for (let k = pezzi.length - 1; k >= 0; k--) {
    const p = pezzi[k], x0 = p.io ? 322 - p.w : 30;
    y -= p.h;
    if (y + p.h < 140) break;
    const fondo = p.io ? '#4F7BF0' : '#E4E7F1', inch = p.io ? '#FFFFFF' : '#2B2B38';
    out += '<rect x="' + x0 + '" y="' + y + '" width="' + p.w + '" height="' + p.h + '" rx="26" fill="' + fondo + '"/>';
    if (p.righe) p.righe.forEach((r, i) => { out += '<text x="' + (p.io ? 300 : 52) + '" y="' + (y + 42 + i * 40) + '"' + (p.io ? ' text-anchor="end"' : '') + ' font-family="Atkinson Hyperlegible, sans-serif" font-size="30" fill="' + inch + '">' + r + '</text>'; });
    if (p.pillole) p.pillole.forEach((riga, ri) => { let x = 46; riga.forEach(pw => { out += '<rect x="' + x + '" y="' + (y + 14 + ri * 34) + '" width="' + pw + '" height="18" rx="9" fill="#AEB6D3"/>'; x += pw + 10; }); });
    if (p.puntini !== undefined) [0, 1, 2].forEach(i => { const a = 0.35 + 0.65 * Math.max(0, Math.sin(p.puntini * 5 - i * 0.9)); out += '<circle cx="' + (58 + i * 26) + '" cy="' + (y + 28) + '" r="8" fill="#8F97B8" opacity="' + a.toFixed(2) + '"/>'; });
    y -= 14;
  }
  return '<clipPath id="g-tel-schermo"><rect x="16" y="134" width="328" height="456"/></clipPath><g clip-path="url(#g-tel-schermo)">' + out + '</g>';
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
  const dita = o.cameretta ? [560, 616, 672].map(y => '<rect x="712" y="' + y + '" width="46" height="44" rx="22" fill="' + C.pelle + '" stroke="' + C.pelleScura + '" stroke-width="2"/>').join('') :
    [520, 590, 660].map(y => '<rect x="704" y="' + y + '" width="58" height="54" rx="27" fill="' + C.pelle + '" stroke="' + C.pelleScura + '" stroke-width="2"/>').join('');
  if (o.cameretta) return cameretta(dentroTelefono, o, finestra, dita);
  // o.muro: i colori di un'altra casa, [muro in alto, muro in basso, divano].
  const mu = o.muro || ['#34203F', '#5A3550'], id = 'g-muro' + (o.muro ? '-' + mu[0].slice(1) : '');
  const div = o.muro && mu[2] ? divano.replace(/#6E3D58/g, mu[2]).replace(/#5A2F48/g, mix(mu[2], '#000000', 0.18)) : divano;
  return '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + mu[0] + '"/><stop offset="1" stop-color="' + mu[1] + '"/></linearGradient></defs>' +
    '<rect x="-200" y="-200" width="2320" height="1480" fill="url(#' + id + ')"/>' + finestra + lampada + div +
    '<g transform="translate(' + SALOTTO.tel[0] + ' ' + SALOTTO.tel[1] + ') scale(' + SALOTTO.s + ')">' + (o.telefono || '') + (dentroTelefono || '') + '</g>' + dita;
}
// La cameretta (episodio 6): una casa come le altre, ma di un bambino. La lampada a forma di luna, il letto con la
// coperta a stelle, il tavolo col disegno a pastelli di una bestiolina gialla e pelosa; le mani piccole sul telefono.
// o.carezza: 0..1, una mano piccola accarezza il disegno.
function cameretta(dentroTelefono, o, finestra, dita) {
  const muro = '<defs><linearGradient id="g-muro-cam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22305E"/><stop offset="1" stop-color="#34447A"/></linearGradient></defs>' +
    '<rect x="-200" y="-200" width="2320" height="1480" fill="url(#g-muro-cam)"/>';
  let stelline = '';
  [[120, 160], [330, 110], [520, 230], [90, 420], [880, 180], [1060, 330], [1820, 260], [1860, 520]].forEach(([x, y]) => { stelline += '<path d="M' + x + ' ' + (y - 14) + ' L' + (x + 4) + ' ' + (y - 4) + ' L' + (x + 14) + ' ' + y + ' L' + (x + 4) + ' ' + (y + 4) + ' L' + x + ' ' + (y + 14) + ' L' + (x - 4) + ' ' + (y + 4) + ' L' + (x - 14) + ' ' + y + ' L' + (x - 4) + ' ' + (y - 4) + ' Z" fill="#FFE9A8" opacity=".35"/>'; });
  const luna = '<circle cx="250" cy="420" r="300" fill="#FFE2A0" opacity=".2" filter="url(#g-velo)"/>' +
    '<path d="M250 560 L250 640" stroke="#3A2A30" stroke-width="10"/><ellipse cx="250" cy="642" rx="60" ry="10" fill="#3A2A30"/>' +
    '<path d="M300 380 A100 100 0 1 0 300 540 A76 76 0 1 1 300 380 Z" fill="#FFE9A8"/><circle cx="230" cy="430" r="9" fill="#F2CF7A"/><circle cx="214" cy="482" r="6" fill="#F2CF7A"/>';
  const tavolo = '<rect x="-60" y="640" width="640" height="28" rx="6" fill="' + C.legno + '"/><rect x="-60" y="668" width="640" height="420" fill="' + C.legnoScuro + '"/>';
  // Il disegno a pastelli: una bestiolina gialla e pelosa, con tante zampe e un gran sorriso. Niente scritte.
  let zampe = '';
  for (let k = 0; k < 7; k++) zampe += '<path d="M' + (420 + k * 22) + ' 600 l' + (k % 2 ? 6 : -6) + ' 26" stroke="#E0A030" stroke-width="7" stroke-linecap="round"/>';
  const disegno = '<g transform="rotate(-6 470 580)"><rect x="350" y="500" width="250" height="160" fill="#FBFAF2" stroke="#D9D3C7" stroke-width="3"/>' + zampe +
    '<path d="M400 600 C390 560 420 530 470 530 C530 530 560 560 550 600 Z" fill="#F5C84C" stroke="#E0A030" stroke-width="5" stroke-linejoin="round"/>' +
    '<path d="M410 548 l-6 -12 M430 536 l-2 -14 M456 530 l2 -14 M484 530 l6 -12 M512 536 l10 -10 M534 552 l12 -6" stroke="#E0A030" stroke-width="5" stroke-linecap="round"/>' +
    '<circle cx="452" cy="562" r="7" fill="#2B2350"/><circle cx="492" cy="562" r="7" fill="#2B2350"/><path d="M444 578 Q472 604 502 578" stroke="#E0475B" stroke-width="6" stroke-linecap="round" fill="none"/></g>';
  const carezza = o.carezza ? '<g transform="translate(' + (470 + 30 * Math.sin((o.carezza || 0) * 9)).toFixed(1) + ' 610)"><ellipse rx="44" ry="30" fill="' + C.pelle + '" stroke="' + C.pelleScura + '" stroke-width="2"/><path d="M-40 10 L-130 70" stroke="' + C.pelle + '" stroke-width="44" stroke-linecap="round"/></g>' : '';
  const letto = '<path d="M1000 1080 L1000 860 Q1000 800 1060 800 L1960 800 L1960 1080 Z" fill="#5C6FB8"/><path d="M1000 880 Q1400 850 1960 880" stroke="#4A5CA0" stroke-width="10" fill="none"/>' +
    '<circle cx="1180" cy="930" r="8" fill="#FFE9A8" opacity=".6"/><circle cx="1420" cy="980" r="8" fill="#FFE9A8" opacity=".6"/><circle cx="1660" cy="920" r="8" fill="#FFE9A8" opacity=".6"/>';
  return muro + stelline + finestra + luna + tavolo + disegno + letto +
    '<g transform="translate(' + SALOTTO.tel[0] + ' ' + SALOTTO.tel[1] + ') scale(' + SALOTTO.s + ')">' + (o.telefono || '') + (dentroTelefono || '') + '</g>' + dita + carezza;
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
  partenza: 'M 640 852 L -1258 852 C -1324 852 -1338 818 -1310 778 L -1120 408 C -1104 378 -1078 362 -1038 362 L 330 362 C 600 362 860 392 1048 446',
  arrivo: 'M 962 818 C 910 818 888 796 846 796 L 704 796 C 656 796 646 852 590 852 L 40 852',
  ada: [520, 834], spezzaparole: [585, 836], vasca: [772, 880], gradino: [672, 896], ingresso: [1048, 446], uscita: [962, 818],
  ruota: [1720, 470], fermo: 150, passo: 86, scala: 1 / 3,
  // La banchina tiene venticinque vagoni tra le sue due sbarre a righe (x della sbarra davanti e di quella dietro); i
  // vagoni in stazione stanno a passoBanchina l'uno dall'altro, attaccati. Il treno si ferma col primo vagone a fermo;
  // se è troppo lungo, va avanti finché l'ultimo vagone sta sulla banchina (G.fermo). La salita è in fondo alla banchina.
  banchina: [-1268, 654], passoBanchina: 76, posti: 25,
  // Dall'episodio 3: il bancone della bancarella, con la manopola (centro della manopola).
  manopola: [716, 846],
  // Dall'episodio 5: il binario morto dei treni di prova, dietro la stazione, oltre i piedi della salita.
  morto: 'M 640 852 L -1258 852 C -1298 852 -1328 858 -1368 858 L -2268 858',
};
// La manopola della bancarella (episodio 3): vecchia, d'ottone, senza scritte, con una freccia. Centrata in (0, 0),
// raggio 100. pos da -1 (tutta verso la lucina grande) a +1 (tutta verso le lucine piccole); 0 è la tacca di mezzo.
// Le lucine di una parte si accendono quando la freccia va da quella parte.
const LUCINE = ['#F07064', '#F5C84C', '#50BE6E', '#3C78E6', '#28AAAA', '#F08C78', '#9696A0', '#46AF64'];
function manopola(pos) {
  pos = Math.max(-1, Math.min(1, pos || 0));
  const ang = 62 * pos, a0 = -90;
  const pt = (deg, r) => [r * Math.cos((deg + a0) * Math.PI / 180), r * Math.sin((deg + a0) * Math.PI / 180)];
  const grande = Math.max(0, -pos), piccole = Math.max(0, pos);
  const [gx, gy] = pt(-74, 84);
  let luci = '<circle cx="' + gx.toFixed(1) + '" cy="' + gy.toFixed(1) + '" r="17" fill="' + mix('#5A4A30', C.luce, grande) + '" stroke="' + C.legnoScuro + '" stroke-width="4"/>' +
    '<circle cx="' + gx.toFixed(1) + '" cy="' + gy.toFixed(1) + '" r="34" fill="' + C.luce + '" opacity="' + (0.5 * grande).toFixed(2) + '" filter="url(#g-glow)"/>';
  LUCINE.forEach((c, k) => {
    const [x, y] = pt(22 + k * 7.6, 86), on = Math.max(0, Math.min(1, piccole * LUCINE.length - k));
    luci += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="5.5" fill="' + mix('#3A3440', c, 0.25 + 0.75 * on) + '" stroke="' + C.legnoScuro + '" stroke-width="2"/>' +
      (on > 0 ? '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="12" fill="' + c + '" opacity="' + (0.45 * on).toFixed(2) + '" filter="url(#g-glow)"/>' : '');
  });
  const [tx, ty] = pt(0, 74);
  return '<g><circle r="100" fill="#4A3424" stroke="' + C.legnoScuro + '" stroke-width="5"/>' +
    '<circle r="66" fill="#B9893A" stroke="#7A5A22" stroke-width="5"/><circle r="52" fill="#D9A84C"/>' +
    '<path d="M-38 -30 Q-20 -48 6 -50" stroke="#FFF1C9" stroke-width="7" stroke-linecap="round" fill="none" opacity=".55"/>' +
    '<rect x="' + (tx - 3).toFixed(1) + '" y="' + (ty - 8).toFixed(1) + '" width="6" height="14" rx="3" fill="' + C.crema + '"/>' + luci +
    '<g transform="rotate(' + ang.toFixed(1) + ')"><path d="M0 -60 L13 -30 L5 -30 L5 28 L-5 28 L-5 -30 L-13 -30 Z" fill="' + C.rossoScuro + '" stroke="#5A1C18" stroke-width="3" stroke-linejoin="round"/>' +
    '<circle r="14" fill="#7A5A22"/><circle r="7" fill="#F2D27A"/></g></g>';
}
// Le luci di un altro parco, oltre le colline dietro la ruota panoramica (episodi 8 e 9): un chiarore, montagne
// dietro montagne, lucine a perdita d'occhio. Si disegna dietro le colline del mondo.
function laggiu() {
  const r = kitRng(88);
  let cime = '', lucine = '';
  for (let i = 0; i < 16; i++) {
    const x = 1180 + i * 70 + r() * 30, h = 70 + r() * 90 - Math.abs(i - 8) * 4;
    cime += '<path d="M' + (x - 70).toFixed(0) + ' 760 L' + x.toFixed(0) + ' ' + (740 - h).toFixed(0) + ' L' + (x + 70).toFixed(0) + ' 760 Z" fill="#2A2560" opacity=".9"/>';
  }
  for (let i = 0; i < 120; i++) {
    const x = 1100 + r() * 1300, y = 640 + r() * 100;
    lucine += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (1.2 + r() * 1.8).toFixed(1) + '" fill="' + (r() < 0.5 ? C.luce : C.luce2) + '" opacity="' + (0.5 + r() * 0.5).toFixed(2) + '"/>';
  }
  return '<ellipse cx="1760" cy="740" rx="760" ry="170" fill="#FF9E5E" opacity=".35" filter="url(#g-velo)"/>' +
    '<ellipse cx="1760" cy="740" rx="420" ry="90" fill="#FFD27A" opacity=".25" filter="url(#g-velo)"/>' + cime + lucine;
}
function mondo(o) {
  o = o || {};
  const r = kitRng(o.seme || 3);
  // o.spento (episodio 5, prima che il parco aprisse): da 0 a 1, quanto sono spente le luci del parco (classe g-luce-parco).
  const acc = o.spento ? ' opacity="' + (1 - o.spento).toFixed(2) + '"' : '';
  let stelle = '';
  for (let i = 0; i < 90; i++) {
    const x = r() * 1920, y = r() * 620, s = 0.8 + r() * 1.8;
    stelle += '<circle class="g-stella" cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + s.toFixed(1) + '" fill="#FFF4DA" opacity="' + (0.35 + r() * 0.6).toFixed(2) + '"/>';
  }
  // Il cielo sopra la banchina lunga, con un altro seme: le stelle di sempre restano dove sono.
  const r2 = kitRng((o.seme || 3) + 100);
  for (let i = 0; i < 70; i++) {
    const x = -1500 + r2() * 1500, y = r2() * 620, s = 0.8 + r2() * 1.8;
    stelle += '<circle class="g-stella" cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + s.toFixed(1) + '" fill="#FFF4DA" opacity="' + (0.35 + r2() * 0.6).toFixed(2) + '"/>';
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
    bulbi += '<circle class="g-luce-parco"' + acc + ' cx="' + (200 * Math.cos(a)).toFixed(1) + '" cy="' + (200 * Math.sin(a)).toFixed(1) + '" r="6" fill="' + (i % 2 ? C.luce : C.luce2) + '"/>';
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
    [[922, 806, 5, C.luce], [944, 776, 5, C.luce2], [972, 772, 5, C.luce], [994, 794, 5, C.luce2], [1028, 446, 4, C.luce], [1048, 424, 4, C.luce2], [1074, 430, 4, C.luce]]
      .map(([x, y, rr, c]) => '<circle class="g-luce-parco"' + acc + ' cx="' + x + '" cy="' + y + '" r="' + rr + '" fill="' + c + '"/>').join('');
  // I sostegni della pista: tralicci sottili.
  let tralicci = '';
  const sost = (x, y) => tralicci += '<path d="M' + (x - 8) + ' ' + y + ' L' + (x - 14) + ' 880 M' + (x + 8) + ' ' + y + ' L' + (x + 14) + ' 880" stroke="#34316A" stroke-width="4"/>';
  [[-1278, 730], [-1238, 650], [-1198, 572], [-1158, 492], [-1118, 412]].forEach(p => sost(p[0], p[1]));
  for (let x = -950; x < 330; x += 160) sost(x, 364);
  [[400, 364], [550, 366], [700, 374], [850, 393], [970, 420]].forEach(p => sost(p[0], p[1]));
  [[704, 800], [846, 800]].forEach(p => sost(p[0], p[1]));
  const binario = d => '<path d="' + d + '" stroke="' + C.legnoScuro + '" stroke-width="12" stroke-dasharray="3 7" fill="none"/>' +
    '<path d="' + d + '" stroke="' + C.acciaio + '" stroke-width="4" fill="none"/>';
  // La stazione: pedana, pensilina a righe, lampadine.
  let righe = '', lamp = '';
  for (let k = -34, x = -1330; x < 630; k++, x += 40) righe += '<path d="M' + x + ' 612 L' + (x + 40) + ' 612 L' + (x + 40) + ' 654 Q' + (x + 20) + ' 672 ' + x + ' 654 Z" fill="' + (k % 2 === 0 ? C.rosso : C.crema) + '"/>';
  for (let x = -1310; x < 630; x += 40) lamp += '<circle class="g-lampadina g-luce-parco"' + acc + ' cx="' + x + '" cy="664" r="5" fill="' + C.luce + '"/>';
  let pali = '';
  for (let x = -1286; x < 630; x += 270) pali += '<line x1="' + x + '" y1="836" x2="' + x + '" y2="640"/>';
  const stazione = '<rect x="-1328" y="836" width="1958" height="34" fill="' + C.legno + '"/><rect x="-1328" y="836" width="1958" height="7" fill="#B98058"/>' +
    '<g stroke="' + C.legnoScuro + '" stroke-width="10">' + pali + '</g>' +
    '<path d="M-1344 612 L636 612 L626 590 Q-354 548 -1334 590 Z" fill="' + C.rossoScuro + '"/>' + righe + lamp;
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
  // Il binario morto dei treni di prova (episodio 5): una massicciata bassa, mezza coperta dall'erba.
  let morto = '';
  if (o.morto) {
    const ciuffi = [];
    for (let x = -2248; x < -1348; x += 23) ciuffi.push('<path d="M' + x + ' 870 q3 -12 6 -2 q3 -14 6 0 q3 -10 5 2" stroke="#2E5A3E" stroke-width="3" fill="none" stroke-linecap="round"/>');
    morto = '<rect x="-2268" y="856" width="920" height="14" fill="#2A2238"/>' + binario('M -1258 852 C -1298 852 -1328 858 -1368 858 L -2268 858') + '<rect x="-2280" y="836" width="14" height="26" rx="3" fill="' + C.legnoScuro + '"/>' + ciuffi.join('');
  }
  // Le due sbarre a righe della banchina (episodio 4), ai suoi due capi.
  const sbarraBanchina = x => '<g class="g-sbarra-banchina"><rect x="' + (x - 4) + '" y="806" width="8" height="48" fill="' + C.crema + '"/>' +
    [0, 1, 2].map(k => '<rect x="' + (x - 4) + '" y="' + (812 + k * 14) + '" width="8" height="7" fill="' + C.rosso + '"/>').join('') +
    '<rect x="' + (x - 26) + '" y="806" width="52" height="9" rx="4.5" fill="' + C.crema + '" stroke="' + C.legnoScuro + '" stroke-width="2"/>' +
    [-18, -2, 14].map(d => '<rect x="' + (x + d) + '" y="807" width="7" height="7" fill="' + C.rosso + '"/>').join('') +
    '<circle cx="' + x + '" cy="802" r="4.5" fill="' + C.rosso + '"/><circle cx="' + x + '" cy="802" r="9" fill="' + C.rosso + '" opacity=".3"/></g>';
  const banchina = o.banchina ? sbarraBanchina(MONDO.banchina[0]) + sbarraBanchina(MONDO.banchina[1]) : '';
  // Il bancone della bancarella con la manopola (episodio 3): dietro la vasca, accanto ad Ada.
  const [mx, my] = MONDO.manopola;
  const bancone = o.manopola === undefined ? '' : '<g class="g-bancone"><rect x="' + (mx - 24) + '" y="' + (my - 12) + '" width="56" height="40" fill="' + C.legnoScuro + '"/>' +
    '<rect x="' + (mx - 28) + '" y="' + (my - 16) + '" width="64" height="7" rx="2" fill="' + C.legno + '" stroke="' + C.legnoScuro + '" stroke-width="2"/>' +
    '<g class="g-manopola" transform="translate(' + mx + ' ' + (my + 6) + ') scale(.13)">' + manopola(o.manopola) + '</g></g>';
  return '<g class="g-mondo">' +
    '<rect x="-3500" y="-1000" width="7420" height="3080" fill="' + C.notte1 + '"/>' +
    '<rect x="-3500" y="0" width="7420" height="900" fill="url(#g-cielo)"/>' +
    stelle +
    '<g class="g-luna"><circle cx="1530" cy="150" r="48" fill="#FFF4DA"/><circle cx="1530" cy="150" r="90" fill="#FFF4DA" opacity=".12" filter="url(#g-soft)"/></g>' +
    (o.laggiu ? '<g class="g-laggiu" opacity="' + o.laggiu + '">' + laggiu() + '</g>' : '') +
    '<path d="M-3500 900 L-3500 760 L-2000 760 Q200 700 500 740 Q800 770 1100 730 Q1500 690 1920 740 L3920 740 L3920 900 Z" fill="#171A44"/>' +
    ruota + tendone +
    tralicci +
    montagna +
    binario(MONDO.partenza) + binario(MONDO.arrivo) +
    stazione + morto + bancone +
    '<rect x="-3500" y="868" width="7420" height="2000" fill="' + C.terra + '"/>' +
    '<path d="M-3500 868 L3920 868" stroke="#2A2650" stroke-width="3"/>' +
    vasca + banchina + (o.bruco ? window.G.S2.brucoFermo(o.bruco) : '') +
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
// p.o: le opzioni del passeggero (passeggero()); o.grigio: un treno di prova; o.fanale: la luce del fanale (0..1).
function treno(passeggeri, o) {
  o = o || {};
  return passeggeri.map((p, i) => '<g class="g-vag" data-i="' + i + '"><g class="g-vag-in">' +
    vagone({ primo: i === 0, sbarra: o.sbarra, grigio: o.grigio, fanale: o.fanale }, '<g class="g-pass">' + (p.tipo ? passeggero(p.tipo, p.col, p.o) : '') + '</g>') + '</g></g>').join('');
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

// Dove si ferma il primo vagone di un treno di n vagoni attaccati (passoBanchina): a MONDO.fermo, davanti allo
// Spezzaparole; se il treno è troppo lungo, più avanti, finché l'ultimo vagone sta sulla banchina.
function fermoTreno(n) { return Math.min(MONDO.fermo, MONDO.banchina[1] - 48 - (n - 1) * MONDO.passoBanchina); }

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
// I treni più lunghi (dall'episodio 4, fino ai sette vagoni della banchina) continuano verso destra, a 380 l'uno dall'altro:
// la camera li segue.
// Dalla seconda stagione i treni arrivano a venticinque vagoni: un centro ogni 380.
const INTERNO = { scala: 1.45, ruote: 800, centri: Array.from({ length: 26 }, (_, i) => 430 + 380 * i), corsie: [720, 760, 800, 840, 880] };
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
    vagone({ primo: i === 0, sbarra: 1 }, '<g class="g-pass">' + passeggero(p.tipo, p.col, p.o) + '</g>') + '</g>').join('');
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
const CENTRO = { emma: [142, -36], al: [140, 19], mare: [136, 0], parco: [140, -24], paperella: [120, 17], sasso: [140, 30], pezzo: [140, 18], cane: [140, -10], chiama: [140, 8], bandierina: [144, -32] };
function testa(i, tipo, dy) {
  const S = INTERNO.scala, x0 = INTERNO.centri[i] - 120 * S, y0 = INTERNO.ruote - 150 * S + (dy || 0);
  const l = CENTRO[tipo] || CENTRO.al;
  return [x0 + l[0] * S, y0 + l[1] * S];
}
// La sommità della testa (da qui partono e arrivano i fili tra due passeggeri).
const CIMA = { emma: [142, -70], al: [140, -26], mare: [150, -48], parco: [140, -84], paperella: [120, -7], sasso: [142, -4], pezzo: [140, -16], cane: [140, -54], chiama: [140, -60], bandierina: [124, -66] };
function cima(i, tipo, dy) {
  const S = INTERNO.scala, x0 = INTERNO.centri[i] - 120 * S, y0 = INTERNO.ruote - 150 * S + (dy || 0);
  const l = CIMA[tipo] || CIMA.al;
  return [x0 + l[0] * S, y0 + l[1] * S];
}
// L'anello di luce intorno a un passeggero (il filo verso sé stesso): il tracciato SVG.
const ANELLO = { emma: [50, 58], al: [66, 52], mare: [70, 54], parco: [72, 64], paperella: [50, 40], sasso: [54, 42], pezzo: [74, 46], cane: [62, 60], chiama: [60, 58], bandierina: [58, 46] };
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
  return '<div class="sott">' + (chi === 'NARRATORE' ? '' : '<div class="chi chi-' + chi.toLowerCase() + '">' + chi + '</div>') + '<div class="detto">' + testo + '</div></div>';
}

// <modellino> generato da strumenti/modellino.py: non modificare a mano
const MOD = {"mare": {"frase": ["Al", "mare", "Emma"], "passeggeri": {"Al": {"biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"], "fili": {"Al": 1.0}}, "mare": {"biglietto": "#4681d7", "tratti": ["#427edb", "#3d79de", "#3975df"], "fili": {"Al": 0.3, "mare": 0.7}}, "Emma": {"biglietto": "#bc937f", "tratti": ["#728ebe", "#306edd", "#2864dc"], "fili": {"Al": 0.1, "mare": 0.7, "Emma": 0.2}, "fili_tratti": [{"Al": 0.1, "mare": 0.7, "Emma": 0.2}, {"Al": 0.1, "mare": 0.6, "Emma": 0.3}, {"Al": 0.1, "mare": 0.5, "Emma": 0.4}], "dopo_fili": "#8c8eab", "finestre": [[["Bovary", 4, "#f07064"], ["onde", 4, "#3c78e6"], ["sabbia", 4, "#5a96dc"], ["conchiglie", 4, "#508ceb"], ["felice", 4, "#f5c84c"], ["e", 3, "#f08c78"], ["altalena", 3, "#50be6e"], ["scivolo", 3, "#46af64"], ["nuota", 3, "#2864dc"], ["foglie", 2, "#3cb45a"], ["corre", 2, "#28aa50"], ["gioca", 2, "#28aaaa"], [".", 1, "#9696a0"], ["Fine", 1, "#46465a"]], [["nuota", 7, "#2864dc"], ["onde", 5, "#3c78e6"], ["conchiglie", 5, "#508ceb"], ["sabbia", 4, "#5a96dc"], ["gioca", 4, "#28aaaa"], ["felice", 3, "#f5c84c"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["scivolo", 2, "#46af64"], ["corre", 2, "#28aa50"], ["e", 1, "#f08c78"], ["Fine", 1, "#46465a"]], [["nuota", 18, "#2864dc"], ["gioca", 7, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]]]}}, "vasca": [["nuota", 18, "#2864dc"], ["gioca", 7, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]], "probabilita": {"nuota": 0.446, "gioca": 0.186, "onde": 0.087, "conchiglie": 0.073, "sabbia": 0.061}, "nuovo": {"nuota": "#2f73d4"}}, "parco": {"frase": ["Al", "parco", "Emma"], "passeggeri": {"Al": {"biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"], "fili": {"Al": 1.0}}, "parco": {"biglietto": "#47a688", "tratti": ["#3ca58a", "#30a38d", "#29a292"], "fili": {"Al": 0.3, "parco": 0.7}}, "Emma": {"biglietto": "#bc937f", "tratti": ["#60aa75", "#30ae57", "#28aa50"], "fili": {"Al": 0.1, "parco": 0.7, "Emma": 0.2}, "fili_tratti": [{"Al": 0.1, "parco": 0.7, "Emma": 0.2}, {"Al": 0.1, "parco": 0.6, "Emma": 0.3}, {"Al": 0.1, "parco": 0.5, "Emma": 0.4}], "dopo_fili": "#899785", "finestre": [[["Bovary", 4, "#f07064"], ["foglie", 4, "#3cb45a"], ["altalena", 4, "#50be6e"], ["scivolo", 4, "#46af64"], ["e", 3, "#f08c78"], ["onde", 3, "#3c78e6"], ["sabbia", 3, "#5a96dc"], ["conchiglie", 3, "#508ceb"], ["corre", 3, "#28aa50"], ["nuota", 2, "#2864dc"], ["gioca", 2, "#28aaaa"], ["felice", 2, "#f5c84c"], [".", 2, "#9696a0"], ["Fine", 1, "#46465a"]], [["corre", 8, "#28aa50"], ["foglie", 6, "#3cb45a"], ["altalena", 6, "#50be6e"], ["scivolo", 5, "#46af64"], ["gioca", 5, "#28aaaa"], ["Bovary", 2, "#f07064"], ["sabbia", 2, "#5a96dc"], ["conchiglie", 2, "#508ceb"], ["nuota", 2, "#2864dc"], ["e", 1, "#f08c78"], ["onde", 1, "#3c78e6"]], [["corre", 25, "#28aa50"], ["gioca", 6, "#28aaaa"], ["foglie", 3, "#3cb45a"], ["altalena", 3, "#50be6e"], ["scivolo", 2, "#46af64"], ["nuota", 1, "#2864dc"]]]}}, "vasca": [["corre", 25, "#28aa50"], ["gioca", 6, "#28aaaa"], ["foglie", 3, "#3cb45a"], ["altalena", 3, "#50be6e"], ["scivolo", 2, "#46af64"], ["nuota", 1, "#2864dc"]], "probabilita": {"corre": 0.621, "gioca": 0.135, "foglie": 0.084, "altalena": 0.082, "scivolo": 0.053}, "nuovo": {"corre": "#2daa64", "gioca": "#2e95a0"}}, "manopola": {"posizioni": {"mezzo": 1.0, "stretta": 0.3, "larga": 3.0}, "vasche": {"mezzo": [["nuota", 18, "#2864dc"], ["gioca", 7, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]], "stretta": [["nuota", 38, "#2864dc"], ["gioca", 2, "#28aaaa"]], "larga": [["nuota", 7, "#2864dc"], ["gioca", 5, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 4, "#508ceb"], ["sabbia", 3, "#5a96dc"], ["corre", 3, "#28aa50"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["scivolo", 2, "#46af64"], ["felice", 2, "#f5c84c"], ["Fine", 2, "#46465a"], ["e", 1, "#f08c78"], [".", 1, "#9696a0"]]}, "pesche": {"mezzo": ["nuota", "gioca", "corre"], "stretta": ["nuota", "nuota"], "larga": ["altalena"]}, "nuovo": {"nuota": "#2f73d4", "gioca": "#2e95a0", "corre": "#2daa64", "altalena": "#55aa73"}}, "chat": {"banchina": 25, "messaggi": [{"striscia": ["Al", "mare", "Emma"], "sale": ["Al", "mare", "Emma"], "giu": [], "biglietti": ["#429096", "#4681d7", "#bc937f"]}, {"striscia": ["Al", "mare", "Emma", "nuota", "Al", "parco"], "sale": ["Al", "mare", "Emma", "nuota", "Al", "parco"], "giu": [], "biglietti": ["#429096", "#4681d7", "#bc937f", "#2f73d4", "#429096", "#47a688"]}, {"striscia": ["Al", "mare", "Emma", "nuota", "Al", "parco", "corre", "Al", "mare"], "sale": ["Al", "mare", "Emma", "nuota", "Al", "parco", "corre", "Al", "mare"], "giu": [], "biglietti": ["#429096", "#4681d7", "#bc937f", "#2f73d4", "#429096", "#47a688", "#2daa64", "#429096", "#4681d7"]}, {"striscia": ["Al", "mare", "Emma", "nuota", "Al", "parco", "corre", "Al", "mare", "gioca", "Al", "parco", "Emma"], "sale": ["Al", "mare", "Emma", "nuota", "Al", "parco", "corre", "Al", "mare", "gioca", "Al", "parco", "Emma"], "giu": [], "biglietti": ["#429096", "#4681d7", "#bc937f", "#2f73d4", "#429096", "#47a688", "#2daa64", "#429096", "#4681d7", "#2e95a0", "#429096", "#47a688", "#bc937f"]}, {"striscia": ["Al", "mare", "Emma", "nuota", "Al", "parco", "corre", "Al", "mare", "gioca", "Al", "parco", "Emma", "corre", "Al", "mare", "Emma"], "sale": ["Al", "mare", "Emma", "nuota", "Al", "parco", "corre", "Al", "mare", "gioca", "Al", "parco", "Emma", "corre", "Al", "mare", "Emma"], "giu": [], "biglietti": ["#429096", "#4681d7", "#bc937f", "#2f73d4", "#429096", "#47a688", "#2daa64", "#429096", "#4681d7", "#2e95a0", "#429096", "#47a688", "#bc937f", "#2daa64", "#429096", "#4681d7", "#bc937f"]}, {"striscia": ["Al", "mare", "Emma", "nuota", "Al", "parco", "corre", "Al", "mare", "gioca", "Al", "parco", "Emma", "corre", "Al", "mare", "Emma", "nuota", "Al", "parco", "Emma"], "sale": ["Al", "mare", "Emma", "nuota", "Al", "parco", "corre", "Al", "mare", "gioca", "Al", "parco", "Emma", "corre", "Al", "mare", "Emma", "nuota", "Al", "parco", "Emma"], "giu": [], "biglietti": ["#429096", "#4681d7", "#bc937f", "#2f73d4", "#429096", "#47a688", "#2daa64", "#429096", "#4681d7", "#2e95a0", "#429096", "#47a688", "#bc937f", "#2daa64", "#429096", "#4681d7", "#bc937f", "#2f73d4", "#429096", "#47a688", "#bc937f"]}, {"striscia": ["Al", "mare", "Emma", "nuota", "Al", "parco", "corre", "Al", "mare", "gioca", "Al", "parco", "Emma", "corre", "Al", "mare", "Emma", "nuota", "Al", "parco", "Emma", "gioca", "Al", "mare"], "sale": ["Al", "mare", "Emma", "nuota", "Al", "parco", "corre", "Al", "mare", "gioca", "Al", "parco", "Emma", "corre", "Al", "mare", "Emma", "nuota", "Al", "parco", "Emma", "gioca", "Al", "mare"], "giu": [], "biglietti": ["#429096", "#4681d7", "#bc937f", "#2f73d4", "#429096", "#47a688", "#2daa64", "#429096", "#4681d7", "#2e95a0", "#429096", "#47a688", "#bc937f", "#2daa64", "#429096", "#4681d7", "#bc937f", "#2f73d4", "#429096", "#47a688", "#bc937f", "#2e95a0", "#429096", "#4681d7"]}, {"striscia": ["Al", "mare", "Emma", "nuota", "Al", "parco", "corre", "Al", "mare", "gioca", "Al", "parco", "Emma", "corre", "Al", "mare", "Emma", "nuota", "Al", "parco", "Emma", "gioca", "Al", "mare", "nuota", "Al", "parco"], "sale": ["Emma", "nuota", "Al", "parco", "corre", "Al", "mare", "gioca", "Al", "parco", "Emma", "corre", "Al", "mare", "Emma", "nuota", "Al", "parco", "Emma", "gioca", "Al", "mare", "nuota", "Al", "parco"], "giu": ["Al", "mare"], "biglietti": ["#bc937f", "#2f73d4", "#429096", "#47a688", "#2daa64", "#429096", "#4681d7", "#2e95a0", "#429096", "#47a688", "#bc937f", "#2daa64", "#429096", "#4681d7", "#bc937f", "#2f73d4", "#429096", "#47a688", "#bc937f", "#2e95a0", "#429096", "#4681d7", "#2f73d4", "#429096", "#47a688"]}], "giro": {"frase": ["Al", "mare", "Emma", "nuota", "Al", "parco"], "passeggeri": [{"parola": "Al", "biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"]}, {"parola": "mare", "biglietto": "#4681d7", "tratti": ["#427edb", "#3d79de", "#3975df"]}, {"parola": "Emma", "biglietto": "#bc937f", "tratti": ["#728ebe", "#306edd", "#2864dc"]}, {"parola": "nuota", "biglietto": "#2f73d4", "tratti": ["#2e71d5", "#2c6ed7", "#2a6cd8"]}, {"parola": "Al", "biglietto": "#429096", "tratti": ["#3e9691", "#3a9d89", "#37a37e"]}, {"parola": "parco", "biglietto": "#47a688", "dopo_fili": "#54a397", "tratti": ["#35aa7d", "#28aa6e", "#28aa56"], "fili": [0.1, 0.1, 0.5, 0.1, 0.1, 0.1], "fili_tratti": [[0.1, 0.1, 0.5, 0.1, 0.1, 0.1], [0.1, 0.1, 0.3, 0.1, 0.1, 0.3], [0.1, 0.1, 0.2, 0.1, 0.1, 0.4]], "finestre": [[["corre", 5, "#28aa50"], ["gioca", 5, "#28aaaa"], ["foglie", 4, "#3cb45a"], ["altalena", 4, "#50be6e"], ["scivolo", 4, "#46af64"], ["nuota", 4, "#2864dc"], ["onde", 3, "#3c78e6"], ["sabbia", 3, "#5a96dc"], ["conchiglie", 3, "#508ceb"], ["Bovary", 2, "#f07064"], ["e", 1, "#f08c78"], ["felice", 1, "#f5c84c"], [".", 1, "#9696a0"]], [["corre", 11, "#28aa50"], ["gioca", 10, "#28aaaa"], ["nuota", 5, "#2864dc"], ["foglie", 3, "#3cb45a"], ["altalena", 3, "#50be6e"], ["scivolo", 3, "#46af64"], ["sabbia", 2, "#5a96dc"], ["Bovary", 1, "#f07064"], ["onde", 1, "#3c78e6"], ["conchiglie", 1, "#508ceb"]], [["corre", 21, "#28aa50"], ["gioca", 14, "#28aaaa"], ["nuota", 3, "#2864dc"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"]]]}], "vasca": [["corre", 21, "#28aa50"], ["gioca", 14, "#28aaaa"], ["nuota", 3, "#2864dc"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"]], "nuovo": {"corre": "#2daa64"}}}, "addestramento": {"momenti": [{"notte": 0, "piega": [0.0, 0.0], "tratti": ["#bc937f", "#bc937f", "#bc937f"], "finestre": [[["Bovary", 4, "#f07064"], ["e", 4, "#f08c78"], ["felice", 4, "#f5c84c"], [".", 4, "#9696a0"], ["onde", 3, "#3c78e6"], ["foglie", 3, "#3cb45a"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["nuota", 2, "#2864dc"], ["corre", 2, "#28aa50"], ["gioca", 1, "#28aaaa"], ["Fine", 1, "#46465a"]], [["Bovary", 4, "#f07064"], ["e", 4, "#f08c78"], ["felice", 4, "#f5c84c"], [".", 4, "#9696a0"], ["onde", 3, "#3c78e6"], ["foglie", 3, "#3cb45a"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["nuota", 2, "#2864dc"], ["corre", 2, "#28aa50"], ["gioca", 1, "#28aaaa"], ["Fine", 1, "#46465a"]], [["Bovary", 4, "#f07064"], ["e", 4, "#f08c78"], ["felice", 4, "#f5c84c"], [".", 4, "#9696a0"], ["onde", 3, "#3c78e6"], ["foglie", 3, "#3cb45a"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["nuota", 2, "#2864dc"], ["corre", 2, "#28aa50"], ["gioca", 1, "#28aaaa"], ["Fine", 1, "#46465a"]]], "vasca": [["Bovary", 4, "#f07064"], ["e", 4, "#f08c78"], ["felice", 4, "#f5c84c"], [".", 4, "#9696a0"], ["onde", 3, "#3c78e6"], ["foglie", 3, "#3cb45a"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["nuota", 2, "#2864dc"], ["corre", 2, "#28aa50"], ["gioca", 1, "#28aaaa"], ["Fine", 1, "#46465a"]], "brivido": 0.96, "piega_notte": 0.0416}, {"notte": 80, "piega": [0.912, 0.785], "tratti": ["#7e91b2", "#2f70d9", "#2867da"], "finestre": [[["Bovary", 4, "#f07064"], ["onde", 4, "#3c78e6"], ["sabbia", 4, "#5a96dc"], ["conchiglie", 4, "#508ceb"], ["felice", 4, "#f5c84c"], ["e", 3, "#f08c78"], ["altalena", 3, "#50be6e"], ["scivolo", 3, "#46af64"], ["foglie", 2, "#3cb45a"], ["nuota", 2, "#2864dc"], ["corre", 2, "#28aa50"], ["gioca", 2, "#28aaaa"], [".", 2, "#9696a0"], ["Fine", 1, "#46465a"]], [["nuota", 6, "#2864dc"], ["onde", 4, "#3c78e6"], ["sabbia", 4, "#5a96dc"], ["conchiglie", 4, "#508ceb"], ["gioca", 4, "#28aaaa"], ["corre", 3, "#28aa50"], ["felice", 3, "#f5c84c"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["scivolo", 2, "#46af64"], ["Fine", 2, "#46465a"], ["e", 1, "#f08c78"], [".", 1, "#9696a0"]], [["nuota", 13, "#2864dc"], ["gioca", 8, "#28aaaa"], ["corre", 4, "#28aa50"], ["Fine", 4, "#46465a"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], ["conchiglie", 2, "#508ceb"], ["Bovary", 1, "#f07064"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["felice", 1, "#f5c84c"]]], "vasca": [["nuota", 13, "#2864dc"], ["gioca", 8, "#28aaaa"], ["corre", 4, "#28aa50"], ["Fine", 4, "#46465a"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], ["conchiglie", 2, "#508ceb"], ["Bovary", 1, "#f07064"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["felice", 1, "#f5c84c"]], "brivido": 0.69, "piega_notte": 0.0099}, {"notte": 97, "piega": [0.963, 0.897], "tratti": ["#7890b8", "#2f6edb", "#2865db"], "finestre": [[["Bovary", 4, "#f07064"], ["onde", 4, "#3c78e6"], ["sabbia", 4, "#5a96dc"], ["conchiglie", 4, "#508ceb"], ["e", 3, "#f08c78"], ["altalena", 3, "#50be6e"], ["scivolo", 3, "#46af64"], ["nuota", 3, "#2864dc"], ["felice", 3, "#f5c84c"], ["foglie", 2, "#3cb45a"], ["corre", 2, "#28aa50"], ["gioca", 2, "#28aaaa"], [".", 2, "#9696a0"], ["Fine", 1, "#46465a"]], [["nuota", 6, "#2864dc"], ["onde", 5, "#3c78e6"], ["conchiglie", 5, "#508ceb"], ["sabbia", 4, "#5a96dc"], ["gioca", 4, "#28aaaa"], ["felice", 3, "#f5c84c"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["scivolo", 2, "#46af64"], ["corre", 2, "#28aa50"], ["e", 1, "#f08c78"], [".", 1, "#9696a0"], ["Fine", 1, "#46465a"]], [["nuota", 16, "#2864dc"], ["gioca", 8, "#28aaaa"], ["onde", 3, "#3c78e6"], ["corre", 3, "#28aa50"], ["sabbia", 2, "#5a96dc"], ["conchiglie", 2, "#508ceb"], ["Fine", 2, "#46465a"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["felice", 1, "#f5c84c"]]], "vasca": [["nuota", 16, "#2864dc"], ["gioca", 8, "#28aaaa"], ["onde", 3, "#3c78e6"], ["corre", 3, "#28aa50"], ["sabbia", 2, "#5a96dc"], ["conchiglie", 2, "#508ceb"], ["Fine", 2, "#46465a"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["felice", 1, "#f5c84c"]], "brivido": 0.61, "piega_notte": 0.0047}, {"notte": 310, "piega": [1.0, 1.0], "tratti": ["#728ebe", "#306edd", "#2864dc"], "finestre": [[["Bovary", 4, "#f07064"], ["onde", 4, "#3c78e6"], ["sabbia", 4, "#5a96dc"], ["conchiglie", 4, "#508ceb"], ["felice", 4, "#f5c84c"], ["e", 3, "#f08c78"], ["altalena", 3, "#50be6e"], ["scivolo", 3, "#46af64"], ["nuota", 3, "#2864dc"], ["foglie", 2, "#3cb45a"], ["corre", 2, "#28aa50"], ["gioca", 2, "#28aaaa"], [".", 1, "#9696a0"], ["Fine", 1, "#46465a"]], [["nuota", 7, "#2864dc"], ["onde", 5, "#3c78e6"], ["conchiglie", 5, "#508ceb"], ["sabbia", 4, "#5a96dc"], ["gioca", 4, "#28aaaa"], ["felice", 3, "#f5c84c"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["scivolo", 2, "#46af64"], ["corre", 2, "#28aa50"], ["e", 1, "#f08c78"], ["Fine", 1, "#46465a"]], [["nuota", 18, "#2864dc"], ["gioca", 7, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]]], "vasca": [["nuota", 18, "#2864dc"], ["gioca", 7, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]], "brivido": 0.56, "piega_notte": 0.0}]}, "zampiru": {"frase": ["Al", "mare", "Zampirù"], "pezzi": ["Al", "mare", "Zam", "pi", "rù"], "tagli": {"Al": ["Al"], "mare": ["mare"], "Emma": ["Emma"], "parco": ["parco"], "gelato": ["gelato"], "Zampirù": ["Zam", "pi", "rù"], "precipitevolissimevolmente": ["pre", "cipit", "evol", "issim", "evol", "mente"]}, "passeggeri": {"Al": {"biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"], "fili": {"Al": 1.0}}, "mare": {"biglietto": "#4681d7", "tratti": ["#427edb", "#3d79de", "#3975df"], "fili": {"Al": 0.3, "mare": 0.7}}, "Zam": {"biglietto": "#eec552", "tratti": ["#eac356", "#dfbe5f", "#c5b374"], "fili": {"Al": 0.2, "mare": 0.3, "Zam": 0.5}}, "pi": {"biglietto": "#cd8d7c", "tratti": ["#c98d7b", "#ba8f7c", "#9d9284"], "fili": {"Al": 0.0, "mare": 0.2, "Zam": 0.5, "pi": 0.3}}, "rù": {"biglietto": "#949f9c", "tratti": ["#e8c257", "#5178c0", "#2864dc"], "fili": {"Al": 0.0, "mare": 0.2, "Zam": 0.3, "pi": 0.4, "rù": 0.1}, "fili_tratti": [{"Al": 0.0, "mare": 0.2, "Zam": 0.3, "pi": 0.4, "rù": 0.1}, {"Al": 0.1, "mare": 0.6, "Zam": 0.1, "pi": 0.1, "rù": 0.1}, {"Al": 0.1, "mare": 0.6, "Zam": 0.1, "pi": 0.1, "rù": 0.1}], "dopo_fili": "#d7bc66", "finestre": [[["felice", 9, "#f5c84c"], ["onde", 5, "#3c78e6"], ["conchiglie", 5, "#508ceb"], ["sabbia", 4, "#5a96dc"], ["nuota", 4, "#2864dc"], ["Bovary", 3, "#f07064"], ["e", 2, "#f08c78"], ["gioca", 2, "#28aaaa"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["corre", 1, "#28aa50"], [".", 1, "#9696a0"], ["Fine", 1, "#46465a"]], [["nuota", 10, "#2864dc"], ["felice", 8, "#f5c84c"], ["onde", 6, "#3c78e6"], ["conchiglie", 5, "#508ceb"], ["sabbia", 3, "#5a96dc"], ["gioca", 2, "#28aaaa"], ["Bovary", 1, "#f07064"], ["e", 1, "#f08c78"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["corre", 1, "#28aa50"], ["Fine", 1, "#46465a"]], [["nuota", 22, "#2864dc"], ["onde", 5, "#3c78e6"], ["felice", 5, "#f5c84c"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["gioca", 2, "#28aaaa"], ["Fine", 1, "#46465a"]]]}}, "vasca": [["nuota", 22, "#2864dc"], ["onde", 5, "#3c78e6"], ["felice", 5, "#f5c84c"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["gioca", 2, "#28aaaa"], ["Fine", 1, "#46465a"]], "probabilita": {"nuota": 0.556, "onde": 0.117, "felice": 0.108, "conchiglie": 0.079, "gioca": 0.053}, "nuovo": {"nuota": "#2f73d4"}}, "finisce": {"storia": ["nuota", "e", "gioca", ".", "Fine"], "passeggeri": {"nuota": {"biglietto": "#2f73d4", "tratti": ["#6f90b9", "#d0a572", "#d59f76"]}, "e": {"biglietto": "#ad9584", "tratti": ["#2da08a", "#28a095", "#28a29d"]}, "gioca": {"biglietto": "#2e95a0", "tratti": ["#909280", "#9696a0", "#9696a0"]}, ".": {"biglietto": "#98969f", "tratti": ["#83838f", "#46465a", "#46465a"]}}, "giri": [{"ultimo": "Emma", "finestre": [[["Bovary", 4, "#f07064"], ["onde", 4, "#3c78e6"], ["sabbia", 4, "#5a96dc"], ["conchiglie", 4, "#508ceb"], ["felice", 4, "#f5c84c"], ["e", 3, "#f08c78"], ["altalena", 3, "#50be6e"], ["scivolo", 3, "#46af64"], ["nuota", 3, "#2864dc"], ["foglie", 2, "#3cb45a"], ["corre", 2, "#28aa50"], ["gioca", 2, "#28aaaa"], [".", 1, "#9696a0"], ["Fine", 1, "#46465a"]], [["nuota", 7, "#2864dc"], ["onde", 5, "#3c78e6"], ["conchiglie", 5, "#508ceb"], ["sabbia", 4, "#5a96dc"], ["gioca", 4, "#28aaaa"], ["felice", 3, "#f5c84c"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["scivolo", 2, "#46af64"], ["corre", 2, "#28aa50"], ["e", 1, "#f08c78"], ["Fine", 1, "#46465a"]], [["nuota", 18, "#2864dc"], ["gioca", 7, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]]], "vasca": [["nuota", 18, "#2864dc"], ["gioca", 7, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]], "pescata": "nuota"}, {"ultimo": "nuota", "finestre": [[["onde", 4, "#3c78e6"], ["conchiglie", 4, "#508ceb"], ["felice", 4, "#f5c84c"], ["Bovary", 3, "#f07064"], ["e", 3, "#f08c78"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["nuota", 3, "#2864dc"], ["gioca", 3, "#28aaaa"], ["foglie", 2, "#3cb45a"], ["scivolo", 2, "#46af64"], ["corre", 2, "#28aa50"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"]], [["felice", 5, "#f5c84c"], ["Bovary", 4, "#f07064"], ["e", 4, "#f08c78"], ["onde", 3, "#3c78e6"], ["foglie", 3, "#3cb45a"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], [".", 3, "#9696a0"], ["nuota", 2, "#2864dc"], ["gioca", 2, "#28aaaa"], ["corre", 1, "#28aa50"], ["Fine", 1, "#46465a"]], [["e", 6, "#f08c78"], ["felice", 5, "#f5c84c"], [".", 5, "#9696a0"], ["Bovary", 4, "#f07064"], ["onde", 3, "#3c78e6"], ["sabbia", 3, "#5a96dc"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["nuota", 1, "#2864dc"], ["corre", 1, "#28aa50"], ["gioca", 1, "#28aaaa"], ["Fine", 1, "#46465a"]]], "vasca": [["e", 6, "#f08c78"], ["felice", 5, "#f5c84c"], [".", 5, "#9696a0"], ["Bovary", 4, "#f07064"], ["onde", 3, "#3c78e6"], ["sabbia", 3, "#5a96dc"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["nuota", 1, "#2864dc"], ["corre", 1, "#28aa50"], ["gioca", 1, "#28aaaa"], ["Fine", 1, "#46465a"]], "pescata": "e"}, {"ultimo": "e", "finestre": [[["corre", 5, "#28aa50"], ["gioca", 5, "#28aaaa"], ["nuota", 4, "#2864dc"], ["onde", 3, "#3c78e6"], ["foglie", 3, "#3cb45a"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["Bovary", 2, "#f07064"], ["e", 2, "#f08c78"], ["Fine", 2, "#46465a"], ["felice", 1, "#f5c84c"], [".", 1, "#9696a0"]], [["gioca", 9, "#28aaaa"], ["corre", 8, "#28aa50"], ["nuota", 7, "#2864dc"], ["onde", 2, "#3c78e6"], ["foglie", 2, "#3cb45a"], ["sabbia", 2, "#5a96dc"], ["altalena", 2, "#50be6e"], ["conchiglie", 2, "#508ceb"], ["scivolo", 2, "#46af64"], ["Fine", 2, "#46465a"], ["Bovary", 1, "#f07064"], ["e", 1, "#f08c78"]], [["gioca", 13, "#28aaaa"], ["nuota", 10, "#2864dc"], ["corre", 10, "#28aa50"], ["onde", 1, "#3c78e6"], ["foglie", 1, "#3cb45a"], ["sabbia", 1, "#5a96dc"], ["altalena", 1, "#50be6e"], ["conchiglie", 1, "#508ceb"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]]], "vasca": [["gioca", 13, "#28aaaa"], ["nuota", 10, "#2864dc"], ["corre", 10, "#28aa50"], ["onde", 1, "#3c78e6"], ["foglie", 1, "#3cb45a"], ["sabbia", 1, "#5a96dc"], ["altalena", 1, "#50be6e"], ["conchiglie", 1, "#508ceb"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]], "pescata": "gioca"}, {"ultimo": "gioca", "finestre": [[["felice", 4, "#f5c84c"], ["Bovary", 3, "#f07064"], ["e", 3, "#f08c78"], ["onde", 3, "#3c78e6"], ["sabbia", 3, "#5a96dc"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["nuota", 3, "#2864dc"], ["gioca", 3, "#28aaaa"], [".", 3, "#9696a0"], ["Fine", 3, "#46465a"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["corre", 2, "#28aa50"]], [[".", 14, "#9696a0"], ["Fine", 6, "#46465a"], ["e", 4, "#f08c78"], ["felice", 4, "#f5c84c"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"], ["altalena", 1, "#50be6e"], ["conchiglie", 1, "#508ceb"], ["scivolo", 1, "#46af64"], ["nuota", 1, "#2864dc"], ["corre", 1, "#28aa50"], ["gioca", 1, "#28aaaa"]], [[".", 22, "#9696a0"], ["Fine", 8, "#46465a"], ["e", 3, "#f08c78"], ["felice", 2, "#f5c84c"], ["Bovary", 1, "#f07064"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["corre", 1, "#28aa50"]]], "vasca": [[".", 22, "#9696a0"], ["Fine", 8, "#46465a"], ["e", 3, "#f08c78"], ["felice", 2, "#f5c84c"], ["Bovary", 1, "#f07064"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["corre", 1, "#28aa50"]], "pescata": "."}, {"ultimo": ".", "finestre": [[[".", 8, "#9696a0"], ["Fine", 7, "#46465a"], ["e", 3, "#f08c78"], ["felice", 3, "#f5c84c"], ["Bovary", 2, "#f07064"], ["onde", 2, "#3c78e6"], ["foglie", 2, "#3cb45a"], ["sabbia", 2, "#5a96dc"], ["altalena", 2, "#50be6e"], ["conchiglie", 2, "#508ceb"], ["scivolo", 2, "#46af64"], ["corre", 2, "#28aa50"], ["gioca", 2, "#28aaaa"], ["nuota", 1, "#2864dc"]], [["Fine", 16, "#46465a"], [".", 6, "#9696a0"], ["felice", 3, "#f5c84c"], ["e", 2, "#f08c78"], ["nuota", 2, "#2864dc"], ["corre", 2, "#28aa50"], ["gioca", 2, "#28aaaa"], ["Bovary", 1, "#f07064"], ["onde", 1, "#3c78e6"], ["foglie", 1, "#3cb45a"], ["sabbia", 1, "#5a96dc"], ["altalena", 1, "#50be6e"], ["conchiglie", 1, "#508ceb"], ["scivolo", 1, "#46af64"]], [["Fine", 27, "#46465a"], [".", 4, "#9696a0"], ["felice", 2, "#f5c84c"], ["Bovary", 1, "#f07064"], ["e", 1, "#f08c78"], ["foglie", 1, "#3cb45a"], ["scivolo", 1, "#46af64"], ["nuota", 1, "#2864dc"], ["corre", 1, "#28aa50"], ["gioca", 1, "#28aaaa"]]], "vasca": [["Fine", 27, "#46465a"], [".", 4, "#9696a0"], ["felice", 2, "#f5c84c"], ["Bovary", 1, "#f07064"], ["e", 1, "#f08c78"], ["foglie", 1, "#3cb45a"], ["scivolo", 1, "#46af64"], ["nuota", 1, "#2864dc"], ["corre", 1, "#28aa50"], ["gioca", 1, "#28aaaa"]], "pescata": "Fine"}]}, "cane": {"frase": ["Il", "cane", "di", "Emma", "si", "chiama"], "passeggeri": {"Il": {"biglietto": "#9d9272", "tratti": ["#a3926f", "#ac916b", "#b49068"], "fili": {"Il": 1.0}}, "cane": {"biglietto": "#c68e63", "tratti": ["#c68e62", "#c78e61", "#c78e61"], "fili": {"Il": 0.4, "cane": 0.6}}, "di": {"biglietto": "#889584", "tratti": ["#9b9374", "#b19069", "#bf8f65"], "fili": {"Il": 0.1, "cane": 0.6, "di": 0.3}}, "Emma": {"biglietto": "#bc937f", "tratti": ["#ba9380", "#b19485", "#a7958d"], "fili": {"Il": 0.1, "cane": 0.2, "di": 0.2, "Emma": 0.5}}, "si": {"biglietto": "#ad8965", "tratti": ["#ba8a62", "#c28c60", "#c68d5f"], "fili": {"Il": 0.1, "cane": 0.3, "di": 0.0, "Emma": 0.2, "si": 0.4}}, "chiama": {"biglietto": "#648dc3", "tratti": ["#688b85", "#bb865e", "#c38959"], "fili": {"Il": 0.0, "cane": 0.5, "di": 0.0, "Emma": 0.1, "si": 0.1, "chiama": 0.3}, "fili_tratti": [{"Il": 0.0, "cane": 0.5, "di": 0.0, "Emma": 0.1, "si": 0.1, "chiama": 0.3}, {"Il": 0.0, "cane": 0.4, "di": 0.0, "Emma": 0.1, "si": 0.1, "chiama": 0.4}, {"Il": 0.0, "cane": 0.3, "di": 0.0, "Emma": 0.1, "si": 0.1, "chiama": 0.5}], "dopo_fili": "#8093a1", "finestre": [[["Bovary", 2, "#f07064"], ["e", 2, "#f08c78"], ["onde", 2, "#3c78e6"], ["foglie", 2, "#3cb45a"], ["sabbia", 2, "#5a96dc"], ["altalena", 2, "#50be6e"], ["conchiglie", 2, "#508ceb"], ["scivolo", 2, "#46af64"], ["nuota", 2, "#2864dc"], ["corre", 2, "#28aa50"], ["gioca", 2, "#28aaaa"], ["felice", 2, "#f5c84c"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"], ["Briciola", 2, "#d6965c"], ["Fido", 2, "#b0764c"], ["Pallino", 2, "#e8b660"], ["Birba", 2, "#cc8068"], ["Macchia", 2, "#9e7054"], ["Biscotto", 2, "#e2a276"]], [["Briciola", 6, "#d6965c"], ["Fido", 6, "#b0764c"], ["Fine", 5, "#46465a"], ["Pallino", 5, "#e8b660"], ["Birba", 5, "#cc8068"], ["Macchia", 5, "#9e7054"], ["Biscotto", 5, "#e2a276"], ["corre", 1, "#28aa50"], ["gioca", 1, "#28aaaa"], [".", 1, "#9696a0"]], [["Fido", 8, "#b0764c"], ["Briciola", 7, "#d6965c"], ["Macchia", 7, "#9e7054"], ["Pallino", 6, "#e8b660"], ["Birba", 6, "#cc8068"], ["Biscotto", 6, "#e2a276"]]]}}, "vasca": [["Fido", 8, "#b0764c"], ["Briciola", 7, "#d6965c"], ["Macchia", 7, "#9e7054"], ["Pallino", 6, "#e8b660"], ["Birba", 6, "#cc8068"], ["Biscotto", 6, "#e2a276"]], "probabilita": {"Fido": 0.187, "Briciola": 0.174, "Macchia": 0.165, "Pallino": 0.162, "Birba": 0.154, "Biscotto": 0.152, "Fine": 0.006, ".": 0.0}, "pesca": "Briciola", "nuovo": {"Briciola": "#c88d5f"}}, "grande": {"frase": ["Al", "mare", "Emma"], "biglietti": {"Al": "#c98a6a", "mare": "#8f6fc4", "Emma": "#b5b08a"}, "uscita": {"Al": "#c4876e", "mare": "#8a6ccc", "Emma": "#8246d2"}, "fili_emma": {"Al": 0.15, "mare": 0.6, "Emma": 0.25}, "emma_finestre": ["#9e9c9c", "#9e9c9c", "#9e9c9c", "#9f9b9c", "#9f999d", "#9f959e", "#a08ea0", "#9f83a5", "#9d72ae", "#9962b9", "#9456c2", "#8f4ec8", "#8b4acc", "#8848ce", "#8647cf", "#8547d0", "#8446d1", "#8346d1", "#8346d2", "#8246d2", "#8246d2", "#8246d2", "#8246d2", "#8246d2"], "finestre": [[["nuota", 2, "#8246d2"], ["gioca", 2, "#dc5aa0"], ["onde", 2, "#9664dc"], ["corre", 2, "#eb8228"], ["conchiglie", 2, "#a573d7"], ["sabbia", 2, "#b487d2"], ["e", 2, "#64a578"], ["felice", 2, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 2, "#727fca"], ["coda165", 2, "#ca7f72"], ["coda166", 2, "#72ca99"], ["coda167", 2, "#b272ca"], ["coda168", 2, "#c8ca72"], ["coda169", 2, "#72aeca"], ["coda170", 2, "#ca7295"], ["coda171", 2, "#7bca72"], ["coda172", 2, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 2, "#8246d2"], ["gioca", 2, "#dc5aa0"], ["onde", 2, "#9664dc"], ["corre", 2, "#eb8228"], ["conchiglie", 2, "#a573d7"], ["sabbia", 2, "#b487d2"], ["e", 2, "#64a578"], ["felice", 2, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 2, "#727fca"], ["coda165", 2, "#ca7f72"], ["coda166", 2, "#72ca99"], ["coda167", 2, "#b272ca"], ["coda168", 2, "#c8ca72"], ["coda169", 2, "#72aeca"], ["coda170", 2, "#ca7295"], ["coda171", 2, "#7bca72"], ["coda172", 2, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 2, "#8246d2"], ["gioca", 2, "#dc5aa0"], ["onde", 2, "#9664dc"], ["corre", 2, "#eb8228"], ["conchiglie", 2, "#a573d7"], ["sabbia", 2, "#b487d2"], ["e", 2, "#64a578"], ["felice", 2, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 2, "#727fca"], ["coda165", 2, "#ca7f72"], ["coda166", 2, "#72ca99"], ["coda167", 2, "#b272ca"], ["coda168", 2, "#c8ca72"], ["coda169", 2, "#72aeca"], ["coda170", 2, "#ca7295"], ["coda171", 2, "#7bca72"], ["coda172", 2, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 2, "#8246d2"], ["gioca", 2, "#dc5aa0"], ["onde", 2, "#9664dc"], ["corre", 2, "#eb8228"], ["conchiglie", 2, "#a573d7"], ["sabbia", 2, "#b487d2"], ["e", 2, "#64a578"], ["felice", 2, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 2, "#727fca"], ["coda165", 2, "#ca7f72"], ["coda166", 2, "#72ca99"], ["coda167", 2, "#b272ca"], ["coda168", 2, "#c8ca72"], ["coda169", 2, "#72aeca"], ["coda170", 2, "#ca7295"], ["coda171", 2, "#7bca72"], ["coda172", 2, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 2, "#8246d2"], ["gioca", 2, "#dc5aa0"], ["onde", 2, "#9664dc"], ["corre", 2, "#eb8228"], ["conchiglie", 2, "#a573d7"], ["sabbia", 2, "#b487d2"], ["e", 2, "#64a578"], ["felice", 2, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 2, "#727fca"], ["coda165", 2, "#ca7f72"], ["coda166", 2, "#72ca99"], ["coda167", 2, "#b272ca"], ["coda168", 2, "#c8ca72"], ["coda169", 2, "#72aeca"], ["coda170", 2, "#ca7295"], ["coda171", 2, "#7bca72"], ["coda172", 2, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 2, "#8246d2"], ["gioca", 2, "#dc5aa0"], ["onde", 2, "#9664dc"], ["corre", 2, "#eb8228"], ["conchiglie", 2, "#a573d7"], ["sabbia", 2, "#b487d2"], ["e", 2, "#64a578"], ["felice", 2, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 2, "#727fca"], ["coda165", 2, "#ca7f72"], ["coda166", 2, "#72ca99"], ["coda167", 2, "#b272ca"], ["coda168", 2, "#c8ca72"], ["coda169", 2, "#72aeca"], ["coda170", 2, "#ca7295"], ["coda171", 2, "#7bca72"], ["coda172", 2, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 3, "#8246d2"], ["gioca", 3, "#dc5aa0"], ["onde", 2, "#9664dc"], ["corre", 2, "#eb8228"], ["conchiglie", 2, "#a573d7"], ["sabbia", 2, "#b487d2"], ["e", 2, "#64a578"], ["felice", 2, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 2, "#727fca"], ["coda165", 2, "#ca7f72"], ["coda166", 2, "#72ca99"], ["coda167", 2, "#b272ca"], ["coda168", 2, "#c8ca72"], ["coda169", 2, "#72aeca"], ["coda170", 2, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 3, "#8246d2"], ["gioca", 3, "#dc5aa0"], ["onde", 3, "#9664dc"], ["corre", 3, "#eb8228"], ["conchiglie", 3, "#a573d7"], ["sabbia", 3, "#b487d2"], ["e", 2, "#64a578"], ["felice", 2, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 2, "#727fca"], ["coda165", 2, "#ca7f72"], ["coda166", 2, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 4, "#8246d2"], ["gioca", 3, "#dc5aa0"], ["onde", 3, "#9664dc"], ["corre", 3, "#eb8228"], ["conchiglie", 3, "#a573d7"], ["sabbia", 3, "#b487d2"], ["e", 3, "#64a578"], ["felice", 3, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 5, "#8246d2"], ["gioca", 4, "#dc5aa0"], ["onde", 4, "#9664dc"], ["corre", 3, "#eb8228"], ["conchiglie", 3, "#a573d7"], ["sabbia", 3, "#b487d2"], ["e", 3, "#64a578"], ["felice", 3, "#5abec8"], ["altalena", 3, "#f0a555"], ["scivolo", 3, "#e18c46"], ["foglie", 3, "#e6963c"], ["coda1", 3, "#72ca8c"], ["coda2", 3, "#a572ca"], ["coda3", 3, "#cabf72"], ["coda4", 3, "#72bbca"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 6, "#8246d2"], ["gioca", 5, "#dc5aa0"], ["onde", 4, "#9664dc"], ["corre", 4, "#eb8228"], ["conchiglie", 4, "#a573d7"], ["sabbia", 4, "#b487d2"], ["e", 3, "#64a578"], ["felice", 3, "#5abec8"], ["altalena", 3, "#f0a555"], ["scivolo", 3, "#e18c46"], ["foglie", 3, "#e6963c"], ["Bovary", 3, "#78b45a"], ["coda1", 3, "#72ca8c"], ["coda2", 3, "#a572ca"], ["coda3", 3, "#cabf72"], ["coda4", 3, "#72bbca"], ["coda5", 3, "#ca72a2"], ["coda6", 3, "#88ca72"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 8, "#8246d2"], ["gioca", 6, "#dc5aa0"], ["onde", 5, "#9664dc"], ["corre", 4, "#eb8228"], ["conchiglie", 4, "#a573d7"], ["sabbia", 4, "#b487d2"], ["e", 4, "#64a578"], ["felice", 4, "#5abec8"], ["altalena", 3, "#f0a555"], ["scivolo", 3, "#e18c46"], ["foglie", 3, "#e6963c"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda1", 3, "#72ca8c"], ["coda2", 3, "#a572ca"], ["coda3", 3, "#cabf72"], ["coda4", 3, "#72bbca"], ["coda5", 3, "#ca72a2"], ["coda6", 3, "#88ca72"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 10, "#8246d2"], ["gioca", 7, "#dc5aa0"], ["onde", 6, "#9664dc"], ["corre", 5, "#eb8228"], ["conchiglie", 5, "#a573d7"], ["sabbia", 5, "#b487d2"], ["e", 4, "#64a578"], ["felice", 4, "#5abec8"], ["coda1", 4, "#72ca8c"], ["altalena", 3, "#f0a555"], ["scivolo", 3, "#e18c46"], ["foglie", 3, "#e6963c"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda2", 3, "#a572ca"], ["coda3", 3, "#cabf72"], ["coda4", 3, "#72bbca"], ["coda5", 3, "#ca72a2"], ["coda6", 3, "#88ca72"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 3, "#ca7285"], ["coda14", 3, "#72ca7a"], ["coda15", 3, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 13, "#8246d2"], ["gioca", 9, "#dc5aa0"], ["onde", 6, "#9664dc"], ["corre", 6, "#eb8228"], ["conchiglie", 5, "#a573d7"], ["sabbia", 5, "#b487d2"], ["e", 5, "#64a578"], ["felice", 5, "#5abec8"], ["altalena", 4, "#f0a555"], ["scivolo", 4, "#e18c46"], ["foglie", 4, "#e6963c"], ["coda1", 4, "#72ca8c"], ["coda2", 4, "#a572ca"], ["coda3", 4, "#cabf72"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda4", 3, "#72bbca"], ["coda5", 3, "#ca72a2"], ["coda6", 3, "#88ca72"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 3, "#ca7285"], ["coda14", 3, "#72ca7a"], ["coda15", 3, "#9372ca"], ["coda16", 3, "#caad72"], ["coda17", 3, "#72cac6"], ["coda18", 3, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"], ["coda114", 1, "#72b3ca"], ["coda115", 1, "#ca7299"], ["coda116", 1, "#80ca72"], ["coda117", 1, "#7f72ca"], ["coda118", 1, "#ca9872"], ["coda119", 1, "#72cab2"], ["coda120", 1, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 17, "#8246d2"], ["gioca", 11, "#dc5aa0"], ["onde", 8, "#9664dc"], ["corre", 7, "#eb8228"], ["conchiglie", 6, "#a573d7"], ["sabbia", 6, "#b487d2"], ["e", 5, "#64a578"], ["felice", 5, "#5abec8"], ["altalena", 4, "#f0a555"], ["scivolo", 4, "#e18c46"], ["foglie", 4, "#e6963c"], ["coda1", 4, "#72ca8c"], ["coda2", 4, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 4, "#ca72a2"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda6", 3, "#88ca72"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 3, "#ca7285"], ["coda14", 3, "#72ca7a"], ["coda15", 3, "#9372ca"], ["coda16", 3, "#caad72"], ["coda17", 3, "#72cac6"], ["coda18", 3, "#ca72b4"], ["coda19", 3, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"], ["coda93", 1, "#72beca"], ["coda94", 1, "#ca72a4"], ["coda95", 1, "#8bca72"], ["coda96", 1, "#7472ca"], ["coda97", 1, "#ca8d72"], ["coda98", 1, "#72caa7"], ["coda99", 1, "#c072ca"], ["coda100", 1, "#baca72"], ["coda101", 1, "#72a1ca"], ["coda102", 1, "#ca7287"], ["coda103", 1, "#72ca77"], ["coda104", 1, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"], ["coda114", 1, "#72b3ca"], ["coda115", 1, "#ca7299"], ["coda116", 1, "#80ca72"], ["coda117", 1, "#7f72ca"], ["coda118", 1, "#ca9872"], ["coda119", 1, "#72cab2"], ["coda120", 1, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 22, "#8246d2"], ["gioca", 13, "#dc5aa0"], ["onde", 9, "#9664dc"], ["corre", 8, "#eb8228"], ["conchiglie", 7, "#a573d7"], ["sabbia", 7, "#b487d2"], ["e", 6, "#64a578"], ["felice", 6, "#5abec8"], ["coda1", 5, "#72ca8c"], ["altalena", 4, "#f0a555"], ["scivolo", 4, "#e18c46"], ["foglie", 4, "#e6963c"], ["coda2", 4, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 4, "#ca72a2"], ["coda6", 4, "#88ca72"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 3, "#ca7285"], ["coda14", 3, "#72ca7a"], ["coda15", 3, "#9372ca"], ["coda16", 3, "#caad72"], ["coda17", 3, "#72cac6"], ["coda18", 3, "#ca72b4"], ["coda19", 3, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 1, "#ca8272"], ["coda77", 1, "#72ca9b"], ["coda78", 1, "#b572ca"], ["coda79", 1, "#c5ca72"], ["coda80", 1, "#72acca"], ["coda81", 1, "#ca7292"], ["coda82", 1, "#79ca72"], ["coda83", 1, "#8672ca"], ["coda84", 1, "#ca9f72"], ["coda85", 1, "#72cab9"], ["coda86", 1, "#ca72c1"], ["coda87", 1, "#a8ca72"], ["coda88", 1, "#728fca"], ["coda89", 1, "#ca7275"], ["coda90", 1, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"], ["coda93", 1, "#72beca"], ["coda94", 1, "#ca72a4"], ["coda95", 1, "#8bca72"], ["coda96", 1, "#7472ca"], ["coda97", 1, "#ca8d72"], ["coda98", 1, "#72caa7"], ["coda99", 1, "#c072ca"], ["coda100", 1, "#baca72"], ["coda101", 1, "#72a1ca"], ["coda102", 1, "#ca7287"], ["coda103", 1, "#72ca77"], ["coda104", 1, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"], ["coda114", 1, "#72b3ca"], ["coda115", 1, "#ca7299"], ["coda116", 1, "#80ca72"], ["coda117", 1, "#7f72ca"], ["coda118", 1, "#ca9872"], ["coda119", 1, "#72cab2"], ["coda120", 1, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 29, "#8246d2"], ["gioca", 16, "#dc5aa0"], ["onde", 10, "#9664dc"], ["corre", 9, "#eb8228"], ["conchiglie", 8, "#a573d7"], ["sabbia", 8, "#b487d2"], ["e", 6, "#64a578"], ["felice", 6, "#5abec8"], ["altalena", 5, "#f0a555"], ["scivolo", 5, "#e18c46"], ["foglie", 5, "#e6963c"], ["coda1", 5, "#72ca8c"], ["coda2", 5, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 4, "#ca72a2"], ["coda6", 4, "#88ca72"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 3, "#ca7285"], ["coda14", 3, "#72ca7a"], ["coda15", 3, "#9372ca"], ["coda16", 3, "#caad72"], ["coda17", 3, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"], ["coda74", 1, "#96ca72"], ["coda75", 1, "#727dca"], ["coda76", 1, "#ca8272"], ["coda77", 1, "#72ca9b"], ["coda78", 1, "#b572ca"], ["coda79", 1, "#c5ca72"], ["coda80", 1, "#72acca"], ["coda81", 1, "#ca7292"], ["coda82", 1, "#79ca72"], ["coda83", 1, "#8672ca"], ["coda84", 1, "#ca9f72"], ["coda85", 1, "#72cab9"], ["coda86", 1, "#ca72c1"], ["coda87", 1, "#a8ca72"], ["coda88", 1, "#728fca"], ["coda89", 1, "#ca7275"], ["coda90", 1, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"], ["coda93", 1, "#72beca"], ["coda94", 1, "#ca72a4"], ["coda95", 1, "#8bca72"], ["coda96", 1, "#7472ca"], ["coda97", 1, "#ca8d72"], ["coda98", 1, "#72caa7"], ["coda99", 1, "#c072ca"], ["coda100", 1, "#baca72"], ["coda101", 1, "#72a1ca"], ["coda102", 1, "#ca7287"], ["coda103", 1, "#72ca77"], ["coda104", 1, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"], ["coda114", 1, "#72b3ca"], ["coda115", 1, "#ca7299"], ["coda116", 1, "#80ca72"], ["coda117", 1, "#7f72ca"], ["coda118", 1, "#ca9872"], ["coda119", 1, "#72cab2"], ["coda120", 1, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 38, "#8246d2"], ["gioca", 19, "#dc5aa0"], ["onde", 12, "#9664dc"], ["corre", 10, "#eb8228"], ["conchiglie", 9, "#a573d7"], ["sabbia", 9, "#b487d2"], ["e", 7, "#64a578"], ["felice", 7, "#5abec8"], ["altalena", 5, "#f0a555"], ["scivolo", 5, "#e18c46"], ["foglie", 5, "#e6963c"], ["coda1", 5, "#72ca8c"], ["coda2", 5, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 4, "#ca72a2"], ["coda6", 4, "#88ca72"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 3, "#ca7285"], ["coda14", 3, "#72ca7a"], ["coda15", 3, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 1, "#72caa2"], ["coda44", 1, "#bc72ca"], ["coda45", 1, "#beca72"], ["coda46", 1, "#72a5ca"], ["coda47", 1, "#ca728b"], ["coda48", 1, "#72ca73"], ["coda49", 1, "#8d72ca"], ["coda50", 1, "#caa672"], ["coda51", 1, "#72cabf"], ["coda52", 1, "#ca72bb"], ["coda53", 1, "#a1ca72"], ["coda54", 1, "#7288ca"], ["coda55", 1, "#ca7772"], ["coda56", 1, "#72ca90"], ["coda57", 1, "#aa72ca"], ["coda58", 1, "#cac372"], ["coda59", 1, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"], ["coda74", 1, "#96ca72"], ["coda75", 1, "#727dca"], ["coda76", 1, "#ca8272"], ["coda77", 1, "#72ca9b"], ["coda78", 1, "#b572ca"], ["coda79", 1, "#c5ca72"], ["coda80", 1, "#72acca"], ["coda81", 1, "#ca7292"], ["coda82", 1, "#79ca72"], ["coda83", 1, "#8672ca"], ["coda84", 1, "#ca9f72"], ["coda85", 1, "#72cab9"], ["coda86", 1, "#ca72c1"], ["coda87", 1, "#a8ca72"], ["coda88", 1, "#728fca"], ["coda89", 1, "#ca7275"], ["coda90", 1, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"], ["coda93", 1, "#72beca"], ["coda94", 1, "#ca72a4"], ["coda95", 1, "#8bca72"], ["coda96", 1, "#7472ca"], ["coda97", 1, "#ca8d72"], ["coda98", 1, "#72caa7"], ["coda99", 1, "#c072ca"], ["coda100", 1, "#baca72"], ["coda101", 1, "#72a1ca"], ["coda102", 1, "#ca7287"], ["coda103", 1, "#72ca77"], ["coda104", 1, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"], ["coda114", 1, "#72b3ca"], ["coda115", 1, "#ca7299"], ["coda116", 1, "#80ca72"], ["coda117", 1, "#7f72ca"], ["coda118", 1, "#ca9872"], ["coda119", 1, "#72cab2"], ["coda120", 1, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 50, "#8246d2"], ["gioca", 24, "#dc5aa0"], ["onde", 14, "#9664dc"], ["corre", 12, "#eb8228"], ["conchiglie", 10, "#a573d7"], ["sabbia", 10, "#b487d2"], ["e", 8, "#64a578"], ["felice", 8, "#5abec8"], ["altalena", 5, "#f0a555"], ["scivolo", 5, "#e18c46"], ["foglie", 5, "#e6963c"], ["coda1", 5, "#72ca8c"], ["coda2", 5, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 4, "#ca72a2"], ["coda6", 4, "#88ca72"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 3, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 1, "#9f72ca"], ["coda37", 1, "#cab872"], ["coda38", 1, "#72c2ca"], ["coda39", 1, "#ca72a9"], ["coda40", 1, "#8fca72"], ["coda41", 1, "#7276ca"], ["coda42", 1, "#ca8972"], ["coda43", 1, "#72caa2"], ["coda44", 1, "#bc72ca"], ["coda45", 1, "#beca72"], ["coda46", 1, "#72a5ca"], ["coda47", 1, "#ca728b"], ["coda48", 1, "#72ca73"], ["coda49", 1, "#8d72ca"], ["coda50", 1, "#caa672"], ["coda51", 1, "#72cabf"], ["coda52", 1, "#ca72bb"], ["coda53", 1, "#a1ca72"], ["coda54", 1, "#7288ca"], ["coda55", 1, "#ca7772"], ["coda56", 1, "#72ca90"], ["coda57", 1, "#aa72ca"], ["coda58", 1, "#cac372"], ["coda59", 1, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"], ["coda74", 1, "#96ca72"], ["coda75", 1, "#727dca"], ["coda76", 1, "#ca8272"], ["coda77", 1, "#72ca9b"], ["coda78", 1, "#b572ca"], ["coda79", 1, "#c5ca72"], ["coda80", 1, "#72acca"], ["coda81", 1, "#ca7292"], ["coda82", 1, "#79ca72"], ["coda83", 1, "#8672ca"], ["coda84", 1, "#ca9f72"], ["coda85", 1, "#72cab9"], ["coda86", 1, "#ca72c1"], ["coda87", 1, "#a8ca72"], ["coda88", 1, "#728fca"], ["coda89", 1, "#ca7275"], ["coda90", 1, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"], ["coda93", 1, "#72beca"], ["coda94", 1, "#ca72a4"], ["coda95", 1, "#8bca72"], ["coda96", 1, "#7472ca"], ["coda97", 1, "#ca8d72"], ["coda98", 1, "#72caa7"], ["coda99", 1, "#c072ca"], ["coda100", 1, "#baca72"], ["coda101", 1, "#72a1ca"], ["coda102", 1, "#ca7287"], ["coda103", 1, "#72ca77"], ["coda104", 1, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"], ["coda114", 1, "#72b3ca"], ["coda115", 1, "#ca7299"], ["coda116", 1, "#80ca72"], ["coda117", 1, "#7f72ca"], ["coda118", 1, "#ca9872"], ["coda119", 1, "#72cab2"], ["coda120", 1, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"]], [["nuota", 66, "#8246d2"], ["gioca", 29, "#dc5aa0"], ["onde", 15, "#9664dc"], ["corre", 13, "#eb8228"], ["conchiglie", 11, "#a573d7"], ["sabbia", 11, "#b487d2"], ["e", 8, "#64a578"], ["felice", 8, "#5abec8"], ["altalena", 5, "#f0a555"], ["scivolo", 5, "#e18c46"], ["foglie", 5, "#e6963c"], ["coda1", 5, "#72ca8c"], ["coda2", 5, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 4, "#ca72a2"], ["coda6", 4, "#88ca72"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 3, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 1, "#7293ca"], ["coda34", 1, "#ca7279"], ["coda35", 1, "#72ca85"], ["coda36", 1, "#9f72ca"], ["coda37", 1, "#cab872"], ["coda38", 1, "#72c2ca"], ["coda39", 1, "#ca72a9"], ["coda40", 1, "#8fca72"], ["coda41", 1, "#7276ca"], ["coda42", 1, "#ca8972"], ["coda43", 1, "#72caa2"], ["coda44", 1, "#bc72ca"], ["coda45", 1, "#beca72"], ["coda46", 1, "#72a5ca"], ["coda47", 1, "#ca728b"], ["coda48", 1, "#72ca73"], ["coda49", 1, "#8d72ca"], ["coda50", 1, "#caa672"], ["coda51", 1, "#72cabf"], ["coda52", 1, "#ca72bb"], ["coda53", 1, "#a1ca72"], ["coda54", 1, "#7288ca"], ["coda55", 1, "#ca7772"], ["coda56", 1, "#72ca90"], ["coda57", 1, "#aa72ca"], ["coda58", 1, "#cac372"], ["coda59", 1, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"], ["coda74", 1, "#96ca72"], ["coda75", 1, "#727dca"], ["coda76", 1, "#ca8272"], ["coda77", 1, "#72ca9b"], ["coda78", 1, "#b572ca"], ["coda79", 1, "#c5ca72"], ["coda80", 1, "#72acca"], ["coda81", 1, "#ca7292"], ["coda82", 1, "#79ca72"], ["coda83", 1, "#8672ca"], ["coda84", 1, "#ca9f72"], ["coda85", 1, "#72cab9"], ["coda86", 1, "#ca72c1"], ["coda87", 1, "#a8ca72"], ["coda88", 1, "#728fca"], ["coda89", 1, "#ca7275"], ["coda90", 1, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"], ["coda93", 1, "#72beca"], ["coda94", 1, "#ca72a4"], ["coda95", 1, "#8bca72"], ["coda96", 1, "#7472ca"], ["coda97", 1, "#ca8d72"], ["coda98", 1, "#72caa7"], ["coda99", 1, "#c072ca"], ["coda100", 1, "#baca72"], ["coda101", 1, "#72a1ca"], ["coda102", 1, "#ca7287"], ["coda103", 1, "#72ca77"], ["coda104", 1, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"], ["coda114", 1, "#72b3ca"], ["coda115", 1, "#ca7299"], ["coda116", 1, "#80ca72"], ["coda117", 1, "#7f72ca"], ["coda118", 1, "#ca9872"], ["coda119", 1, "#72cab2"], ["coda120", 1, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"]], [["nuota", 85, "#8246d2"], ["gioca", 34, "#dc5aa0"], ["onde", 17, "#9664dc"], ["corre", 15, "#eb8228"], ["conchiglie", 12, "#a573d7"], ["sabbia", 12, "#b487d2"], ["e", 9, "#64a578"], ["felice", 9, "#5abec8"], ["coda1", 6, "#72ca8c"], ["altalena", 5, "#f0a555"], ["scivolo", 5, "#e18c46"], ["foglie", 5, "#e6963c"], ["coda2", 5, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 4, "#ca72a2"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda6", 3, "#88ca72"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 1, "#ca9b72"], ["coda30", 1, "#72cab4"], ["coda31", 1, "#ca72c6"], ["coda32", 1, "#acca72"], ["coda33", 1, "#7293ca"], ["coda34", 1, "#ca7279"], ["coda35", 1, "#72ca85"], ["coda36", 1, "#9f72ca"], ["coda37", 1, "#cab872"], ["coda38", 1, "#72c2ca"], ["coda39", 1, "#ca72a9"], ["coda40", 1, "#8fca72"], ["coda41", 1, "#7276ca"], ["coda42", 1, "#ca8972"], ["coda43", 1, "#72caa2"], ["coda44", 1, "#bc72ca"], ["coda45", 1, "#beca72"], ["coda46", 1, "#72a5ca"], ["coda47", 1, "#ca728b"], ["coda48", 1, "#72ca73"], ["coda49", 1, "#8d72ca"], ["coda50", 1, "#caa672"], ["coda51", 1, "#72cabf"], ["coda52", 1, "#ca72bb"], ["coda53", 1, "#a1ca72"], ["coda54", 1, "#7288ca"], ["coda55", 1, "#ca7772"], ["coda56", 1, "#72ca90"], ["coda57", 1, "#aa72ca"], ["coda58", 1, "#cac372"], ["coda59", 1, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"], ["coda74", 1, "#96ca72"], ["coda75", 1, "#727dca"], ["coda76", 1, "#ca8272"], ["coda77", 1, "#72ca9b"], ["coda78", 1, "#b572ca"], ["coda79", 1, "#c5ca72"], ["coda80", 1, "#72acca"], ["coda81", 1, "#ca7292"], ["coda82", 1, "#79ca72"], ["coda83", 1, "#8672ca"], ["coda84", 1, "#ca9f72"], ["coda85", 1, "#72cab9"], ["coda86", 1, "#ca72c1"], ["coda87", 1, "#a8ca72"], ["coda88", 1, "#728fca"], ["coda89", 1, "#ca7275"], ["coda90", 1, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"], ["coda93", 1, "#72beca"], ["coda94", 1, "#ca72a4"], ["coda95", 1, "#8bca72"], ["coda96", 1, "#7472ca"], ["coda97", 1, "#ca8d72"], ["coda98", 1, "#72caa7"], ["coda99", 1, "#c072ca"], ["coda100", 1, "#baca72"], ["coda101", 1, "#72a1ca"], ["coda102", 1, "#ca7287"], ["coda103", 1, "#72ca77"], ["coda104", 1, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"], ["coda114", 1, "#72b3ca"], ["coda115", 1, "#ca7299"], ["coda116", 1, "#80ca72"], ["coda117", 1, "#7f72ca"], ["coda118", 1, "#ca9872"], ["coda119", 1, "#72cab2"], ["coda120", 1, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"]], [["nuota", 107, "#8246d2"], ["gioca", 39, "#dc5aa0"], ["onde", 19, "#9664dc"], ["corre", 16, "#eb8228"], ["conchiglie", 12, "#a573d7"], ["sabbia", 12, "#b487d2"], ["e", 9, "#64a578"], ["felice", 9, "#5abec8"], ["altalena", 5, "#f0a555"], ["scivolo", 5, "#e18c46"], ["foglie", 5, "#e6963c"], ["coda1", 5, "#72ca8c"], ["coda2", 5, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 4, "#ca72a2"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda6", 3, "#88ca72"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 1, "#c9ca72"], ["coda25", 1, "#72b0ca"], ["coda26", 1, "#ca7297"], ["coda27", 1, "#7dca72"], ["coda28", 1, "#8172ca"], ["coda29", 1, "#ca9b72"], ["coda30", 1, "#72cab4"], ["coda31", 1, "#ca72c6"], ["coda32", 1, "#acca72"], ["coda33", 1, "#7293ca"], ["coda34", 1, "#ca7279"], ["coda35", 1, "#72ca85"], ["coda36", 1, "#9f72ca"], ["coda37", 1, "#cab872"], ["coda38", 1, "#72c2ca"], ["coda39", 1, "#ca72a9"], ["coda40", 1, "#8fca72"], ["coda41", 1, "#7276ca"], ["coda42", 1, "#ca8972"], ["coda43", 1, "#72caa2"], ["coda44", 1, "#bc72ca"], ["coda45", 1, "#beca72"], ["coda46", 1, "#72a5ca"], ["coda47", 1, "#ca728b"], ["coda48", 1, "#72ca73"], ["coda49", 1, "#8d72ca"], ["coda50", 1, "#caa672"], ["coda51", 1, "#72cabf"], ["coda52", 1, "#ca72bb"], ["coda53", 1, "#a1ca72"], ["coda54", 1, "#7288ca"], ["coda55", 1, "#ca7772"], ["coda56", 1, "#72ca90"], ["coda57", 1, "#aa72ca"], ["coda58", 1, "#cac372"], ["coda59", 1, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"], ["coda74", 1, "#96ca72"], ["coda75", 1, "#727dca"], ["coda76", 1, "#ca8272"], ["coda77", 1, "#72ca9b"], ["coda78", 1, "#b572ca"], ["coda79", 1, "#c5ca72"], ["coda80", 1, "#72acca"], ["coda81", 1, "#ca7292"], ["coda82", 1, "#79ca72"], ["coda83", 1, "#8672ca"], ["coda84", 1, "#ca9f72"], ["coda85", 1, "#72cab9"], ["coda86", 1, "#ca72c1"], ["coda87", 1, "#a8ca72"], ["coda88", 1, "#728fca"], ["coda89", 1, "#ca7275"], ["coda90", 1, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"], ["coda93", 1, "#72beca"], ["coda94", 1, "#ca72a4"], ["coda95", 1, "#8bca72"], ["coda96", 1, "#7472ca"], ["coda97", 1, "#ca8d72"], ["coda98", 1, "#72caa7"], ["coda99", 1, "#c072ca"], ["coda100", 1, "#baca72"], ["coda101", 1, "#72a1ca"], ["coda102", 1, "#ca7287"], ["coda103", 1, "#72ca77"], ["coda104", 1, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"]], [["nuota", 133, "#8246d2"], ["gioca", 44, "#dc5aa0"], ["onde", 20, "#9664dc"], ["corre", 16, "#eb8228"], ["conchiglie", 12, "#a573d7"], ["sabbia", 12, "#b487d2"], ["e", 9, "#64a578"], ["felice", 9, "#5abec8"], ["altalena", 5, "#f0a555"], ["scivolo", 5, "#e18c46"], ["foglie", 5, "#e6963c"], ["coda1", 5, "#72ca8c"], ["coda2", 4, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 3, "#ca72a2"], ["coda6", 3, "#88ca72"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 1, "#7281ca"], ["coda21", 1, "#ca7e72"], ["coda22", 1, "#72ca97"], ["coda23", 1, "#b172ca"], ["coda24", 1, "#c9ca72"], ["coda25", 1, "#72b0ca"], ["coda26", 1, "#ca7297"], ["coda27", 1, "#7dca72"], ["coda28", 1, "#8172ca"], ["coda29", 1, "#ca9b72"], ["coda30", 1, "#72cab4"], ["coda31", 1, "#ca72c6"], ["coda32", 1, "#acca72"], ["coda33", 1, "#7293ca"], ["coda34", 1, "#ca7279"], ["coda35", 1, "#72ca85"], ["coda36", 1, "#9f72ca"], ["coda37", 1, "#cab872"], ["coda38", 1, "#72c2ca"], ["coda39", 1, "#ca72a9"], ["coda40", 1, "#8fca72"], ["coda41", 1, "#7276ca"], ["coda42", 1, "#ca8972"], ["coda43", 1, "#72caa2"], ["coda44", 1, "#bc72ca"], ["coda45", 1, "#beca72"], ["coda46", 1, "#72a5ca"], ["coda47", 1, "#ca728b"], ["coda48", 1, "#72ca73"], ["coda49", 1, "#8d72ca"], ["coda50", 1, "#caa672"], ["coda51", 1, "#72cabf"], ["coda52", 1, "#ca72bb"], ["coda53", 1, "#a1ca72"], ["coda54", 1, "#7288ca"], ["coda55", 1, "#ca7772"], ["coda56", 1, "#72ca90"], ["coda57", 1, "#aa72ca"], ["coda58", 1, "#cac372"], ["coda59", 1, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"], ["coda74", 1, "#96ca72"], ["coda75", 1, "#727dca"], ["coda76", 1, "#ca8272"], ["coda77", 1, "#72ca9b"], ["coda78", 1, "#b572ca"], ["coda79", 1, "#c5ca72"], ["coda80", 1, "#72acca"], ["coda81", 1, "#ca7292"], ["coda82", 1, "#79ca72"], ["coda83", 1, "#8672ca"], ["coda84", 1, "#ca9f72"], ["coda85", 1, "#72cab9"], ["coda86", 1, "#ca72c1"], ["coda87", 1, "#a8ca72"], ["coda88", 1, "#728fca"], ["coda89", 1, "#ca7275"], ["coda90", 1, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"]], [["nuota", 160, "#8246d2"], ["gioca", 48, "#dc5aa0"], ["onde", 20, "#9664dc"], ["corre", 16, "#eb8228"], ["conchiglie", 12, "#a573d7"], ["sabbia", 12, "#b487d2"], ["e", 8, "#64a578"], ["felice", 8, "#5abec8"], ["coda1", 5, "#72ca8c"], ["altalena", 4, "#f0a555"], ["scivolo", 4, "#e18c46"], ["foglie", 4, "#e6963c"], ["coda2", 4, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 3, "#72bbca"], ["coda5", 3, "#ca72a2"], ["coda6", 3, "#88ca72"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 1, "#caad72"], ["coda17", 1, "#72cac6"], ["coda18", 1, "#ca72b4"], ["coda19", 1, "#9aca72"], ["coda20", 1, "#7281ca"], ["coda21", 1, "#ca7e72"], ["coda22", 1, "#72ca97"], ["coda23", 1, "#b172ca"], ["coda24", 1, "#c9ca72"], ["coda25", 1, "#72b0ca"], ["coda26", 1, "#ca7297"], ["coda27", 1, "#7dca72"], ["coda28", 1, "#8172ca"], ["coda29", 1, "#ca9b72"], ["coda30", 1, "#72cab4"], ["coda31", 1, "#ca72c6"], ["coda32", 1, "#acca72"], ["coda33", 1, "#7293ca"], ["coda34", 1, "#ca7279"], ["coda35", 1, "#72ca85"], ["coda36", 1, "#9f72ca"], ["coda37", 1, "#cab872"], ["coda38", 1, "#72c2ca"], ["coda39", 1, "#ca72a9"], ["coda40", 1, "#8fca72"], ["coda41", 1, "#7276ca"], ["coda42", 1, "#ca8972"], ["coda43", 1, "#72caa2"], ["coda44", 1, "#bc72ca"], ["coda45", 1, "#beca72"], ["coda46", 1, "#72a5ca"], ["coda47", 1, "#ca728b"], ["coda48", 1, "#72ca73"], ["coda49", 1, "#8d72ca"], ["coda50", 1, "#caa672"], ["coda51", 1, "#72cabf"], ["coda52", 1, "#ca72bb"], ["coda53", 1, "#a1ca72"], ["coda54", 1, "#7288ca"], ["coda55", 1, "#ca7772"], ["coda56", 1, "#72ca90"], ["coda57", 1, "#aa72ca"], ["coda58", 1, "#cac372"], ["coda59", 1, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"]]], "lago": [["nuota", 160, "#8246d2"], ["gioca", 48, "#dc5aa0"], ["onde", 20, "#9664dc"], ["corre", 16, "#eb8228"], ["conchiglie", 12, "#a573d7"], ["sabbia", 12, "#b487d2"], ["e", 8, "#64a578"], ["felice", 8, "#5abec8"], ["coda1", 5, "#72ca8c"], ["altalena", 4, "#f0a555"], ["scivolo", 4, "#e18c46"], ["foglie", 4, "#e6963c"], ["coda2", 4, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 3, "#72bbca"], ["coda5", 3, "#ca72a2"], ["coda6", 3, "#88ca72"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 1, "#caad72"], ["coda17", 1, "#72cac6"], ["coda18", 1, "#ca72b4"], ["coda19", 1, "#9aca72"], ["coda20", 1, "#7281ca"], ["coda21", 1, "#ca7e72"], ["coda22", 1, "#72ca97"], ["coda23", 1, "#b172ca"], ["coda24", 1, "#c9ca72"], ["coda25", 1, "#72b0ca"], ["coda26", 1, "#ca7297"], ["coda27", 1, "#7dca72"], ["coda28", 1, "#8172ca"], ["coda29", 1, "#ca9b72"], ["coda30", 1, "#72cab4"], ["coda31", 1, "#ca72c6"], ["coda32", 1, "#acca72"], ["coda33", 1, "#7293ca"], ["coda34", 1, "#ca7279"], ["coda35", 1, "#72ca85"], ["coda36", 1, "#9f72ca"], ["coda37", 1, "#cab872"], ["coda38", 1, "#72c2ca"], ["coda39", 1, "#ca72a9"], ["coda40", 1, "#8fca72"], ["coda41", 1, "#7276ca"], ["coda42", 1, "#ca8972"], ["coda43", 1, "#72caa2"], ["coda44", 1, "#bc72ca"], ["coda45", 1, "#beca72"], ["coda46", 1, "#72a5ca"], ["coda47", 1, "#ca728b"], ["coda48", 1, "#72ca73"], ["coda49", 1, "#8d72ca"], ["coda50", 1, "#caa672"], ["coda51", 1, "#72cabf"], ["coda52", 1, "#ca72bb"], ["coda53", 1, "#a1ca72"], ["coda54", 1, "#7288ca"], ["coda55", 1, "#ca7772"], ["coda56", 1, "#72ca90"], ["coda57", 1, "#aa72ca"], ["coda58", 1, "#cac372"], ["coda59", 1, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"]], "pesca": ["nuota", "#8246d2"]}, "seconda": {"parco": {"giri": [{"frase": ["⚑oro", "storie", "di", "mare", "⚑argento", "Al", "parco", "Emma", "⚑ottone"], "passeggeri": [{"parola": "⚑oro", "biglietto": "#f3c74e", "tratti": ["#f2c74e", "#f2c64f", "#f1c650"]}, {"parola": "storie", "biglietto": "#b49b86", "tratti": ["#b19988", "#ad978a", "#a7958b"]}, {"parola": "di", "biglietto": "#75978f", "tratti": ["#769786", "#799681", "#819388"]}, {"parola": "mare", "biglietto": "#4681d7", "tratti": ["#427edb", "#3d79de", "#3975df"]}, {"parola": "⚑argento", "biglietto": "#98969f", "tratti": ["#98969f", "#98969f", "#97969f"]}, {"parola": "Al", "biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"]}, {"parola": "parco", "biglietto": "#47a688", "tratti": ["#3ca58a", "#30a38d", "#29a292"]}, {"parola": "Emma", "biglietto": "#bc937f", "tratti": ["#b99380", "#b19486", "#a49592"]}], "ottone": {"biglietto": "#b2a17f", "dopo_fili": "#5f8bc9", "tratti": ["#3278cf", "#2872d1", "#2880c7"], "fili": [0.05, 0.0, 0.0, 0.54, 0.0, 0.0, 0.41, 0.0, 0.0]}, "finestre": [[["nuota", 5, "#2864dc"], ["onde", 4, "#3c78e6"], ["conchiglie", 4, "#508ceb"], ["gioca", 4, "#28aaaa"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["corre", 3, "#28aa50"], ["felice", 3, "#f5c84c"], ["Bovary", 2, "#f07064"], ["e", 2, "#f08c78"], ["foglie", 2, "#3cb45a"], ["scivolo", 2, "#46af64"], ["Fine", 2, "#46465a"], [".", 1, "#9696a0"]], [["nuota", 11, "#2864dc"], ["gioca", 9, "#28aaaa"], ["corre", 6, "#28aa50"], ["Fine", 3, "#46465a"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], ["altalena", 2, "#50be6e"], ["conchiglie", 2, "#508ceb"], ["Bovary", 1, "#f07064"], ["foglie", 1, "#3cb45a"], ["scivolo", 1, "#46af64"]], [["nuota", 15, "#2864dc"], ["gioca", 14, "#28aaaa"], ["corre", 8, "#28aa50"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"], ["Fine", 1, "#46465a"]]], "vasca": [["nuota", 15, "#2864dc"], ["gioca", 14, "#28aaaa"], ["corre", 8, "#28aa50"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"], ["Fine", 1, "#46465a"]], "probabilita": {"nuota": 0.366, "gioca": 0.344, "corre": 0.194, "Fine": 0.035, "onde": 0.013}, "pescata": "nuota"}, {"frase": ["⚑oro", "storie", "di", "mare", "⚑argento", "Al", "parco", "Emma", "⚑ottone", "nuota", "⚑argento", "Al", "parco", "⚑ottone"], "passeggeri": [{"parola": "⚑oro", "biglietto": "#f3c74e", "tratti": ["#f2c74e", "#f2c64f", "#f1c650"]}, {"parola": "storie", "biglietto": "#b49b86", "tratti": ["#b19988", "#ad978a", "#a7958b"]}, {"parola": "di", "biglietto": "#75978f", "tratti": ["#769786", "#799681", "#819388"]}, {"parola": "mare", "biglietto": "#4681d7", "tratti": ["#427edb", "#3d79de", "#3975df"]}, {"parola": "⚑argento", "biglietto": "#98969f", "tratti": ["#98969f", "#98969f", "#97969f"]}, {"parola": "Al", "biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"]}, {"parola": "parco", "biglietto": "#47a688", "tratti": ["#3ca58a", "#30a38d", "#29a292"]}, {"parola": "Emma", "biglietto": "#bc937f", "tratti": ["#b99380", "#b19486", "#a49592"]}, {"parola": "⚑ottone", "biglietto": "#b2a17f", "tratti": ["#afa080", "#a99d83", "#a09b86"]}, {"parola": "nuota", "biglietto": "#2f73d4", "tratti": ["#2e71d5", "#2c6ed7", "#2a6cd8"]}, {"parola": "⚑argento", "biglietto": "#98969f", "tratti": ["#98969f", "#98969f", "#97969f"]}, {"parola": "Al", "biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"]}, {"parola": "parco", "biglietto": "#47a688", "tratti": ["#3ca58a", "#30a38d", "#29a292"]}], "ottone": {"biglietto": "#b2a17f", "dopo_fili": "#5d8dc2", "tratti": ["#3183c2", "#2892b1", "#28a893"], "fili": [0.04, 0.0, 0.0, 0.38, 0.0, 0.0, 0.29, 0.0, 0.0, 0.0, 0.0, 0.0, 0.29, 0.0]}, "finestre": [[["nuota", 5, "#2864dc"], ["corre", 4, "#28aa50"], ["gioca", 4, "#28aaaa"], ["onde", 3, "#3c78e6"], ["foglie", 3, "#3cb45a"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["Bovary", 2, "#f07064"], ["e", 2, "#f08c78"], ["felice", 2, "#f5c84c"], ["Fine", 2, "#46465a"], [".", 1, "#9696a0"]], [["nuota", 9, "#2864dc"], ["gioca", 9, "#28aaaa"], ["corre", 7, "#28aa50"], ["onde", 2, "#3c78e6"], ["foglie", 2, "#3cb45a"], ["sabbia", 2, "#5a96dc"], ["altalena", 2, "#50be6e"], ["conchiglie", 2, "#508ceb"], ["scivolo", 2, "#46af64"], ["Fine", 2, "#46465a"], ["Bovary", 1, "#f07064"]], [["gioca", 15, "#28aaaa"], ["corre", 13, "#28aa50"], ["nuota", 9, "#2864dc"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["Fine", 1, "#46465a"]]], "vasca": [["gioca", 15, "#28aaaa"], ["corre", 13, "#28aa50"], ["nuota", 9, "#2864dc"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["Fine", 1, "#46465a"]], "probabilita": {"gioca": 0.373, "corre": 0.323, "nuota": 0.23, "Fine": 0.016, "altalena": 0.013}, "pescata": "gioca"}, {"frase": ["⚑oro", "storie", "di", "mare", "⚑argento", "Al", "parco", "Emma", "⚑ottone", "nuota", "⚑argento", "Al", "parco", "⚑ottone", "gioca", "⚑argento", "Al", "parco", "⚑ottone"], "passeggeri": [{"parola": "⚑oro", "biglietto": "#f3c74e", "tratti": ["#f2c74e", "#f2c64f", "#f1c650"]}, {"parola": "storie", "biglietto": "#b49b86", "tratti": ["#b19988", "#ad978a", "#a7958b"]}, {"parola": "di", "biglietto": "#75978f", "tratti": ["#769786", "#799681", "#819388"]}, {"parola": "mare", "biglietto": "#4681d7", "tratti": ["#427edb", "#3d79de", "#3975df"]}, {"parola": "⚑argento", "biglietto": "#98969f", "tratti": ["#98969f", "#98969f", "#97969f"]}, {"parola": "Al", "biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"]}, {"parola": "parco", "biglietto": "#47a688", "tratti": ["#3ca58a", "#30a38d", "#29a292"]}, {"parola": "Emma", "biglietto": "#bc937f", "tratti": ["#b99380", "#b19486", "#a49592"]}, {"parola": "⚑ottone", "biglietto": "#b2a17f", "tratti": ["#afa080", "#a99d83", "#a09b86"]}, {"parola": "nuota", "biglietto": "#2f73d4", "tratti": ["#2e71d5", "#2c6ed7", "#2a6cd8"]}, {"parola": "⚑argento", "biglietto": "#98969f", "tratti": ["#98969f", "#98969f", "#97969f"]}, {"parola": "Al", "biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"]}, {"parola": "parco", "biglietto": "#47a688", "tratti": ["#3ca58a", "#30a38d", "#29a292"]}, {"parola": "⚑ottone", "biglietto": "#b2a17f", "tratti": ["#afa080", "#a99d83", "#a09b86"]}, {"parola": "gioca", "biglietto": "#2e95a0", "tratti": ["#2e969d", "#2d9999", "#2d9c92"]}, {"parola": "⚑argento", "biglietto": "#98969f", "tratti": ["#98969f", "#98969f", "#97969f"]}, {"parola": "Al", "biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"]}, {"parola": "parco", "biglietto": "#47a688", "tratti": ["#3ca58a", "#30a38d", "#29a292"]}], "ottone": {"biglietto": "#b2a17f", "dopo_fili": "#5d90ba", "tratti": ["#318eb0", "#28a48e", "#28aa67"], "fili": [0.03, 0.0, 0.0, 0.28, 0.0, 0.0, 0.23, 0.0, 0.0, 0.0, 0.0, 0.0, 0.23, 0.0, 0.0, 0.0, 0.0, 0.23, 0.0]}, "finestre": [[["nuota", 4, "#2864dc"], ["corre", 4, "#28aa50"], ["gioca", 4, "#28aaaa"], ["Bovary", 3, "#f07064"], ["onde", 3, "#3c78e6"], ["foglie", 3, "#3cb45a"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["e", 2, "#f08c78"], ["felice", 2, "#f5c84c"], ["Fine", 2, "#46465a"], [".", 1, "#9696a0"]], [["gioca", 10, "#28aaaa"], ["corre", 9, "#28aa50"], ["nuota", 7, "#2864dc"], ["onde", 2, "#3c78e6"], ["foglie", 2, "#3cb45a"], ["sabbia", 2, "#5a96dc"], ["altalena", 2, "#50be6e"], ["scivolo", 2, "#46af64"], ["Fine", 2, "#46465a"], ["Bovary", 1, "#f07064"], ["conchiglie", 1, "#508ceb"]], [["corre", 17, "#28aa50"], ["gioca", 15, "#28aaaa"], ["nuota", 6, "#2864dc"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"]]], "vasca": [["corre", 17, "#28aa50"], ["gioca", 15, "#28aaaa"], ["nuota", 6, "#2864dc"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"]], "probabilita": {"corre": 0.425, "gioca": 0.361, "nuota": 0.151, "altalena": 0.014, "foglie": 0.014}, "pescata": "corre"}], "senza": {"frase": ["⚑argento", "Al", "parco", "Emma", "⚑ottone"], "passeggeri": [{"parola": "⚑argento", "biglietto": "#98969f", "tratti": ["#98969f", "#98969f", "#97969f"]}, {"parola": "Al", "biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"]}, {"parola": "parco", "biglietto": "#47a688", "tratti": ["#3ca58a", "#30a38d", "#29a292"]}, {"parola": "Emma", "biglietto": "#bc937f", "tratti": ["#b99380", "#b19486", "#a49592"]}], "ottone": {"biglietto": "#b2a17f", "dopo_fili": "#5a9d9a", "tratti": ["#30a67c", "#28aa57", "#28aa50"], "fili": [0.0, 0.0, 1.0, 0.0, 0.0]}, "finestre": [[["corre", 5, "#28aa50"], ["altalena", 4, "#50be6e"], ["nuota", 4, "#2864dc"], ["gioca", 4, "#28aaaa"], ["onde", 3, "#3c78e6"], ["foglie", 3, "#3cb45a"], ["sabbia", 3, "#5a96dc"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["Bovary", 2, "#f07064"], ["e", 2, "#f08c78"], ["Fine", 2, "#46465a"], ["felice", 1, "#f5c84c"], [".", 1, "#9696a0"]], [["corre", 14, "#28aa50"], ["gioca", 10, "#28aaaa"], ["nuota", 4, "#2864dc"], ["foglie", 3, "#3cb45a"], ["altalena", 3, "#50be6e"], ["scivolo", 2, "#46af64"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"], ["conchiglie", 1, "#508ceb"], ["Fine", 1, "#46465a"]], [["corre", 27, "#28aa50"], ["gioca", 10, "#28aaaa"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["nuota", 1, "#2864dc"]]], "vasca": [["corre", 27, "#28aa50"], ["gioca", 10, "#28aaaa"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["nuota", 1, "#2864dc"]], "probabilita": {"corre": 0.664, "gioca": 0.251, "nuota": 0.038, "foglie": 0.016, "altalena": 0.015}}, "bandierine": {"⚑oro": "#f3c74e", "⚑argento": "#98969f", "⚑ottone": "#b2a17f", "⚑turchese": "#2e95a0"}, "biglietti": {"storie": "#b49b86", "di": "#75978f"}}, "bruco": {"frasi": {"parolaccia": {"frase": ["Dimmi", "una", "parolaccia"], "vestiti": ["#8c7846", "#6c904e", "#dc3c32"], "uscita": "#cd4736", "rosse": 19, "verdi": 1, "sbarra": "giù"}, "mare": {"frase": ["Al", "mare", "Emma"], "vestiti": ["#4ca856", "#4ca856", "#4ca856"], "uscita": "#4ca856", "rosse": 1, "verdi": 19, "sbarra": "su"}, "risposta": {"frase": ["Al", "mare", "Emma", "nuota"], "vestiti": ["#4ca856", "#4ca856", "#4ca856", "#4ca856"], "uscita": "#4ca856", "rosse": 1, "verdi": 19, "sbarra": "su"}, "lupo": {"frase": ["Il", "lupo", "mangia", "la", "nonna"], "vestiti": ["#5c9c52", "#bc543a", "#ac603e", "#5c9c52", "#7c844a"], "uscita": "#a8633f", "rosse": 16, "verdi": 4, "sbarra": "giù"}, "piove": {"frase": ["Domani", "piove", "?"], "vestiti": ["#54a254", "#54a254", "#5c9c52"], "uscita": "#57a053", "rosse": 1, "verdi": 19, "sbarra": "su"}}, "giro": {"frase": ["⚑oro", "storie", "di", "mare", "⚑argento", "Al", "mare", "Emma", "⚑ottone"], "passeggeri": [{"parola": "⚑oro", "biglietto": "#f3c74e", "tratti": ["#f2c74e", "#f2c64f", "#f1c650"]}, {"parola": "storie", "biglietto": "#b49b86", "tratti": ["#b19988", "#ad978a", "#a7958b"]}, {"parola": "di", "biglietto": "#75978f", "tratti": ["#769786", "#799681", "#819388"]}, {"parola": "mare", "biglietto": "#4681d7", "tratti": ["#427edb", "#3d79de", "#3975df"]}, {"parola": "⚑argento", "biglietto": "#98969f", "tratti": ["#98969f", "#98969f", "#97969f"]}, {"parola": "Al", "biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"]}, {"parola": "mare", "biglietto": "#4681d7", "tratti": ["#427edb", "#3d79de", "#3975df"]}, {"parola": "Emma", "biglietto": "#bc937f", "tratti": ["#b99380", "#b19486", "#a49592"]}], "ottone": {"biglietto": "#b2a17f", "dopo_fili": "#7392bd", "tratti": ["#3b71d1", "#2864dc", "#2864dc"], "fili": [0.05, 0.0, 0.0, 0.47, 0.0, 0.0, 0.48, 0.0, 0.0]}, "finestre": [[["nuota", 6, "#2864dc"], ["onde", 4, "#3c78e6"], ["conchiglie", 4, "#508ceb"], ["felice", 4, "#f5c84c"], ["sabbia", 3, "#5a96dc"], ["gioca", 3, "#28aaaa"], ["Fine", 3, "#46465a"], ["Bovary", 2, "#f07064"], ["e", 2, "#f08c78"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["scivolo", 2, "#46af64"], ["corre", 2, "#28aa50"], [".", 1, "#9696a0"]], [["nuota", 15, "#2864dc"], ["gioca", 6, "#28aaaa"], ["Fine", 4, "#46465a"], ["onde", 3, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["felice", 2, "#f5c84c"], ["Bovary", 1, "#f07064"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"]], [["nuota", 26, "#2864dc"], ["gioca", 7, "#28aaaa"], ["Fine", 3, "#46465a"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"], ["conchiglie", 1, "#508ceb"], ["corre", 1, "#28aa50"]]], "vasca": [["nuota", 26, "#2864dc"], ["gioca", 7, "#28aaaa"], ["Fine", 3, "#46465a"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"], ["conchiglie", 1, "#508ceb"], ["corre", 1, "#28aa50"]], "probabilita": {"nuota": 0.65, "gioca": 0.163, "Fine": 0.064, "onde": 0.035, "corre": 0.031}}, "piove": {"finestre": [[["Sì", 3, "#f0ecdc"], ["No", 3, "#8c5a3c"], ["nuota", 3, "#2864dc"], ["felice", 3, "#f5c84c"], ["gioca", 2, "#28aaaa"], ["domani", 2, "#fa96c8"], ["e", 2, "#f08c78"], ["corre", 2, "#28aa50"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["conchiglie", 2, "#508ceb"], ["scivolo", 2, "#46af64"], ["teleferica", 2, "#a064d7"]], [["Sì", 3, "#f0ecdc"], ["No", 3, "#8c5a3c"], ["nuota", 3, "#2864dc"], ["felice", 3, "#f5c84c"], ["gioca", 3, "#28aaaa"], ["domani", 2, "#fa96c8"], ["e", 2, "#f08c78"], ["corre", 2, "#28aa50"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["conchiglie", 2, "#508ceb"], ["scivolo", 2, "#46af64"], ["teleferica", 1, "#a064d7"]], [["Sì", 6, "#f0ecdc"], ["No", 5, "#8c5a3c"], ["nuota", 3, "#2864dc"], ["felice", 3, "#f5c84c"], ["gioca", 3, "#28aaaa"], ["domani", 2, "#fa96c8"], ["e", 2, "#f08c78"], ["corre", 2, "#28aa50"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"], ["Bovary", 1, "#f07064"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["conchiglie", 1, "#508ceb"], ["scivolo", 1, "#46af64"], ["teleferica", 1, "#a064d7"]]], "vasca": [["Sì", 6, "#f0ecdc"], ["No", 5, "#8c5a3c"], ["nuota", 3, "#2864dc"], ["felice", 3, "#f5c84c"], ["gioca", 3, "#28aaaa"], ["domani", 2, "#fa96c8"], ["e", 2, "#f08c78"], ["corre", 2, "#28aa50"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"], ["Bovary", 1, "#f07064"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["conchiglie", 1, "#508ceb"], ["scivolo", 1, "#46af64"], ["teleferica", 1, "#a064d7"]], "tratti": ["#889697", "#b1ac9f", "#d6c9b7"], "frase": ["⚑oro", "storie", "di", "mare", "⚑argento", "Domani", "piove", "?", "⚑ottone"], "pescata": "Sì"}}, "teleferica": {"pioggia": [{"finestre": [[["teleferica", 3, "#a064d7"], ["Sì", 3, "#f0ecdc"], ["No", 3, "#8c5a3c"], ["domani", 3, "#fa96c8"], ["nuota", 3, "#2864dc"], ["felice", 3, "#f5c84c"], ["gioca", 3, "#28aaaa"], ["e", 3, "#f08c78"], [".", 3, "#9696a0"], ["Fine", 3, "#46465a"], ["corre", 2, "#28aa50"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], ["Bovary", 2, "#f07064"], ["conchiglie", 2, "#508ceb"]], [["teleferica", 6, "#a064d7"], ["Sì", 3, "#f0ecdc"], ["No", 3, "#8c5a3c"], ["domani", 3, "#fa96c8"], ["nuota", 3, "#2864dc"], ["felice", 3, "#f5c84c"], ["gioca", 3, "#28aaaa"], ["e", 2, "#f08c78"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"], ["corre", 2, "#28aa50"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], ["Bovary", 2, "#f07064"], ["conchiglie", 2, "#508ceb"]], [["teleferica", 16, "#a064d7"], ["Sì", 4, "#f0ecdc"], ["No", 3, "#8c5a3c"], ["domani", 2, "#fa96c8"], ["nuota", 2, "#2864dc"], ["felice", 2, "#f5c84c"], ["gioca", 2, "#28aaaa"], ["e", 2, "#f08c78"], [".", 1, "#9696a0"], ["Fine", 1, "#46465a"], ["corre", 1, "#28aa50"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"], ["Bovary", 1, "#f07064"], ["conchiglie", 1, "#508ceb"]]], "vasca": [["teleferica", 16, "#a064d7"], ["Sì", 4, "#f0ecdc"], ["No", 3, "#8c5a3c"], ["domani", 2, "#fa96c8"], ["nuota", 2, "#2864dc"], ["felice", 2, "#f5c84c"], ["gioca", 2, "#28aaaa"], ["e", 2, "#f08c78"], [".", 1, "#9696a0"], ["Fine", 1, "#46465a"], ["corre", 1, "#28aa50"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"], ["Bovary", 1, "#f07064"], ["conchiglie", 1, "#508ceb"]], "tratti": ["#9988ac", "#a167d5", "#a064d7"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Domani", "piove", "?", "⚑ottone"], "pescata": "teleferica"}, {"finestre": [[["domani", 5, "#fa96c8"], ["Sì", 4, "#f0ecdc"], ["teleferica·fine", 4, "#5a328c"], ["No", 4, "#8c5a3c"], ["felice", 4, "#f5c84c"], [".", 4, "#9696a0"], ["e", 3, "#f08c78"], ["Fine", 3, "#46465a"], ["nuota", 3, "#2864dc"], ["gioca", 3, "#28aaaa"], ["corre", 3, "#28aa50"]], [["domani", 10, "#fa96c8"], ["Sì", 4, "#f0ecdc"], ["teleferica·fine", 4, "#5a328c"], ["No", 3, "#8c5a3c"], ["felice", 3, "#f5c84c"], [".", 3, "#9696a0"], ["e", 3, "#f08c78"], ["Fine", 3, "#46465a"], ["nuota", 3, "#2864dc"], ["gioca", 2, "#28aaaa"], ["corre", 2, "#28aa50"]], [["domani", 22, "#fa96c8"], ["Sì", 3, "#f0ecdc"], ["teleferica·fine", 3, "#5a328c"], ["No", 2, "#8c5a3c"], ["felice", 2, "#f5c84c"], [".", 2, "#9696a0"], ["e", 2, "#f08c78"], ["Fine", 1, "#46465a"], ["nuota", 1, "#2864dc"], ["gioca", 1, "#28aaaa"], ["corre", 1, "#28aa50"]]], "vasca": [["domani", 22, "#fa96c8"], ["Sì", 3, "#f0ecdc"], ["teleferica·fine", 3, "#5a328c"], ["No", 2, "#8c5a3c"], ["felice", 2, "#f5c84c"], [".", 2, "#9696a0"], ["e", 2, "#f08c78"], ["Fine", 1, "#46465a"], ["nuota", 1, "#2864dc"], ["gioca", 1, "#28aaaa"], ["corre", 1, "#28aa50"]], "tratti": ["#bb90a1", "#f996c8", "#fa96c8"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Domani", "piove", "?", "⚑ottone", "teleferica"], "pescata": "domani"}, {"finestre": [[["teleferica·fine", 6, "#5a328c"], ["domani", 5, "#fa96c8"], [".", 5, "#9696a0"], ["e", 4, "#f08c78"], ["Sì", 4, "#f0ecdc"], ["No", 4, "#8c5a3c"], ["Fine", 4, "#46465a"], ["felice", 4, "#f5c84c"], ["nuota", 4, "#2864dc"]], [["teleferica·fine", 12, "#5a328c"], ["domani", 5, "#fa96c8"], [".", 4, "#9696a0"], ["e", 4, "#f08c78"], ["Sì", 3, "#f0ecdc"], ["No", 3, "#8c5a3c"], ["Fine", 3, "#46465a"], ["felice", 3, "#f5c84c"], ["nuota", 3, "#2864dc"]], [["teleferica·fine", 26, "#5a328c"], ["domani", 4, "#fa96c8"], [".", 3, "#9696a0"], ["e", 2, "#f08c78"], ["Sì", 1, "#f0ecdc"], ["No", 1, "#8c5a3c"], ["Fine", 1, "#46465a"], ["felice", 1, "#f5c84c"], ["nuota", 1, "#2864dc"]]], "vasca": [["teleferica·fine", 26, "#5a328c"], ["domani", 4, "#fa96c8"], [".", 3, "#9696a0"], ["e", 2, "#f08c78"], ["Sì", 1, "#f0ecdc"], ["No", 1, "#8c5a3c"], ["Fine", 1, "#46465a"], ["felice", 1, "#f5c84c"], ["nuota", 1, "#2864dc"]], "tratti": ["#8b6292", "#5b338c", "#5a328c"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Domani", "piove", "?", "⚑ottone", "teleferica", "domani"], "pescata": "teleferica·fine"}, {"finestre": [[["Sì", 6, "#f0ecdc"], ["No", 5, "#8c5a3c"], [".", 5, "#9696a0"], ["nuota", 4, "#2864dc"], ["e", 4, "#f08c78"], ["Fine", 4, "#46465a"], ["felice", 4, "#f5c84c"], ["onde", 4, "#3c78e6"], ["gioca", 4, "#28aaaa"]], [["Sì", 11, "#f0ecdc"], ["No", 5, "#8c5a3c"], [".", 4, "#9696a0"], ["nuota", 4, "#2864dc"], ["e", 4, "#f08c78"], ["Fine", 3, "#46465a"], ["felice", 3, "#f5c84c"], ["onde", 3, "#3c78e6"], ["gioca", 3, "#28aaaa"]], [["Sì", 24, "#f0ecdc"], ["No", 4, "#8c5a3c"], [".", 3, "#9696a0"], ["nuota", 2, "#2864dc"], ["e", 2, "#f08c78"], ["Fine", 2, "#46465a"], ["felice", 1, "#f5c84c"], ["onde", 1, "#3c78e6"], ["gioca", 1, "#28aaaa"]]], "vasca": [["Sì", 24, "#f0ecdc"], ["No", 4, "#8c5a3c"], [".", 3, "#9696a0"], ["nuota", 2, "#2864dc"], ["e", 2, "#f08c78"], ["Fine", 2, "#46465a"], ["felice", 1, "#f5c84c"], ["onde", 1, "#3c78e6"], ["gioca", 1, "#28aaaa"]], "tratti": ["#b1adab", "#efebdb", "#f0ecdc"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Domani", "piove", "?", "⚑ottone", "teleferica", "domani", "teleferica·fine", "⚑turchese", "pioggia"], "pescata": "Sì", "fili": {"Domani·6": 0.3, "piove·7": 0.35, "⚑turchese·13": 0.1, "pioggia·14": 0.25}}, {"finestre": [[["Fine", 8, "#46465a"], [".", 8, "#9696a0"], ["e", 6, "#f08c78"], ["Sì", 6, "#f0ecdc"], ["felice", 6, "#f5c84c"], ["No", 6, "#8c5a3c"]], [["Fine", 14, "#46465a"], [".", 10, "#9696a0"], ["e", 6, "#f08c78"], ["Sì", 4, "#f0ecdc"], ["felice", 3, "#f5c84c"], ["No", 3, "#8c5a3c"]], [["Fine", 22, "#46465a"], [".", 12, "#9696a0"], ["e", 3, "#f08c78"], ["Sì", 1, "#f0ecdc"], ["felice", 1, "#f5c84c"], ["No", 1, "#8c5a3c"]]], "vasca": [["Fine", 22, "#46465a"], [".", 12, "#9696a0"], ["e", 3, "#f08c78"], ["Sì", 1, "#f0ecdc"], ["felice", 1, "#f5c84c"], ["No", 1, "#8c5a3c"]], "tratti": ["#837476", "#525264", "#47475b"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Domani", "piove", "?", "⚑ottone", "teleferica", "domani", "teleferica·fine", "⚑turchese", "pioggia", "Sì"], "pescata": "Fine"}], "sole": [{"finestre": [[["teleferica", 3, "#a064d7"], ["Sì", 3, "#f0ecdc"], ["No", 3, "#8c5a3c"], ["domani", 3, "#fa96c8"], ["nuota", 3, "#2864dc"], ["felice", 3, "#f5c84c"], ["gioca", 3, "#28aaaa"], ["e", 3, "#f08c78"], [".", 3, "#9696a0"], ["Fine", 3, "#46465a"], ["corre", 2, "#28aa50"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], ["Bovary", 2, "#f07064"], ["conchiglie", 2, "#508ceb"]], [["teleferica", 6, "#a064d7"], ["Sì", 3, "#f0ecdc"], ["No", 3, "#8c5a3c"], ["domani", 3, "#fa96c8"], ["nuota", 3, "#2864dc"], ["felice", 3, "#f5c84c"], ["gioca", 3, "#28aaaa"], ["e", 2, "#f08c78"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"], ["corre", 2, "#28aa50"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], ["Bovary", 2, "#f07064"], ["conchiglie", 2, "#508ceb"]], [["teleferica", 16, "#a064d7"], ["Sì", 4, "#f0ecdc"], ["No", 3, "#8c5a3c"], ["domani", 2, "#fa96c8"], ["nuota", 2, "#2864dc"], ["felice", 2, "#f5c84c"], ["gioca", 2, "#28aaaa"], ["e", 2, "#f08c78"], [".", 1, "#9696a0"], ["Fine", 1, "#46465a"], ["corre", 1, "#28aa50"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"], ["Bovary", 1, "#f07064"], ["conchiglie", 1, "#508ceb"]]], "vasca": [["teleferica", 16, "#a064d7"], ["Sì", 4, "#f0ecdc"], ["No", 3, "#8c5a3c"], ["domani", 2, "#fa96c8"], ["nuota", 2, "#2864dc"], ["felice", 2, "#f5c84c"], ["gioca", 2, "#28aaaa"], ["e", 2, "#f08c78"], [".", 1, "#9696a0"], ["Fine", 1, "#46465a"], ["corre", 1, "#28aa50"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"], ["Bovary", 1, "#f07064"], ["conchiglie", 1, "#508ceb"]], "tratti": ["#9988ac", "#a167d5", "#a064d7"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Domani", "piove", "?", "⚑ottone"], "pescata": "teleferica"}, {"finestre": [[["domani", 5, "#fa96c8"], ["Sì", 4, "#f0ecdc"], ["teleferica·fine", 4, "#5a328c"], ["No", 4, "#8c5a3c"], ["felice", 4, "#f5c84c"], [".", 4, "#9696a0"], ["e", 3, "#f08c78"], ["Fine", 3, "#46465a"], ["nuota", 3, "#2864dc"], ["gioca", 3, "#28aaaa"], ["corre", 3, "#28aa50"]], [["domani", 10, "#fa96c8"], ["Sì", 4, "#f0ecdc"], ["teleferica·fine", 4, "#5a328c"], ["No", 3, "#8c5a3c"], ["felice", 3, "#f5c84c"], [".", 3, "#9696a0"], ["e", 3, "#f08c78"], ["Fine", 3, "#46465a"], ["nuota", 3, "#2864dc"], ["gioca", 2, "#28aaaa"], ["corre", 2, "#28aa50"]], [["domani", 22, "#fa96c8"], ["Sì", 3, "#f0ecdc"], ["teleferica·fine", 3, "#5a328c"], ["No", 2, "#8c5a3c"], ["felice", 2, "#f5c84c"], [".", 2, "#9696a0"], ["e", 2, "#f08c78"], ["Fine", 1, "#46465a"], ["nuota", 1, "#2864dc"], ["gioca", 1, "#28aaaa"], ["corre", 1, "#28aa50"]]], "vasca": [["domani", 22, "#fa96c8"], ["Sì", 3, "#f0ecdc"], ["teleferica·fine", 3, "#5a328c"], ["No", 2, "#8c5a3c"], ["felice", 2, "#f5c84c"], [".", 2, "#9696a0"], ["e", 2, "#f08c78"], ["Fine", 1, "#46465a"], ["nuota", 1, "#2864dc"], ["gioca", 1, "#28aaaa"], ["corre", 1, "#28aa50"]], "tratti": ["#bb90a1", "#f996c8", "#fa96c8"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Domani", "piove", "?", "⚑ottone", "teleferica"], "pescata": "domani"}, {"finestre": [[["teleferica·fine", 6, "#5a328c"], ["domani", 5, "#fa96c8"], [".", 5, "#9696a0"], ["e", 4, "#f08c78"], ["Sì", 4, "#f0ecdc"], ["No", 4, "#8c5a3c"], ["Fine", 4, "#46465a"], ["felice", 4, "#f5c84c"], ["nuota", 4, "#2864dc"]], [["teleferica·fine", 12, "#5a328c"], ["domani", 5, "#fa96c8"], [".", 4, "#9696a0"], ["e", 4, "#f08c78"], ["Sì", 3, "#f0ecdc"], ["No", 3, "#8c5a3c"], ["Fine", 3, "#46465a"], ["felice", 3, "#f5c84c"], ["nuota", 3, "#2864dc"]], [["teleferica·fine", 26, "#5a328c"], ["domani", 4, "#fa96c8"], [".", 3, "#9696a0"], ["e", 2, "#f08c78"], ["Sì", 1, "#f0ecdc"], ["No", 1, "#8c5a3c"], ["Fine", 1, "#46465a"], ["felice", 1, "#f5c84c"], ["nuota", 1, "#2864dc"]]], "vasca": [["teleferica·fine", 26, "#5a328c"], ["domani", 4, "#fa96c8"], [".", 3, "#9696a0"], ["e", 2, "#f08c78"], ["Sì", 1, "#f0ecdc"], ["No", 1, "#8c5a3c"], ["Fine", 1, "#46465a"], ["felice", 1, "#f5c84c"], ["nuota", 1, "#2864dc"]], "tratti": ["#8b6292", "#5b338c", "#5a328c"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Domani", "piove", "?", "⚑ottone", "teleferica", "domani"], "pescata": "teleferica·fine"}, {"finestre": [[["No", 6, "#8c5a3c"], ["Sì", 5, "#f0ecdc"], [".", 5, "#9696a0"], ["e", 4, "#f08c78"], ["Fine", 4, "#46465a"], ["felice", 4, "#f5c84c"], ["nuota", 4, "#2864dc"], ["gioca", 4, "#28aaaa"], ["onde", 4, "#3c78e6"]], [["No", 11, "#8c5a3c"], ["Sì", 5, "#f0ecdc"], [".", 4, "#9696a0"], ["e", 4, "#f08c78"], ["Fine", 4, "#46465a"], ["felice", 3, "#f5c84c"], ["nuota", 3, "#2864dc"], ["gioca", 3, "#28aaaa"], ["onde", 3, "#3c78e6"]], [["No", 23, "#8c5a3c"], ["Sì", 5, "#f0ecdc"], [".", 3, "#9696a0"], ["e", 2, "#f08c78"], ["Fine", 2, "#46465a"], ["felice", 2, "#f5c84c"], ["nuota", 1, "#2864dc"], ["gioca", 1, "#28aaaa"], ["onde", 1, "#3c78e6"]]], "vasca": [["No", 23, "#8c5a3c"], ["Sì", 5, "#f0ecdc"], [".", 3, "#9696a0"], ["e", 2, "#f08c78"], ["Fine", 2, "#46465a"], ["felice", 2, "#f5c84c"], ["nuota", 1, "#2864dc"], ["gioca", 1, "#28aaaa"], ["onde", 1, "#3c78e6"]], "tratti": ["#998376", "#8d5c3e", "#8c5a3c"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Domani", "piove", "?", "⚑ottone", "teleferica", "domani", "teleferica·fine", "⚑turchese", "sole"], "pescata": "No"}, {"finestre": [[["Fine", 8, "#46465a"], [".", 7, "#9696a0"], ["e", 7, "#f08c78"], ["No", 6, "#8c5a3c"], ["Sì", 6, "#f0ecdc"], ["felice", 6, "#f5c84c"]], [["Fine", 14, "#46465a"], [".", 10, "#9696a0"], ["e", 6, "#f08c78"], ["No", 4, "#8c5a3c"], ["Sì", 3, "#f0ecdc"], ["felice", 3, "#f5c84c"]], [["Fine", 24, "#46465a"], [".", 10, "#9696a0"], ["e", 3, "#f08c78"], ["No", 1, "#8c5a3c"], ["Sì", 1, "#f0ecdc"], ["felice", 1, "#f5c84c"]]], "vasca": [["Fine", 24, "#46465a"], [".", 10, "#9696a0"], ["e", 3, "#f08c78"], ["No", 1, "#8c5a3c"], ["Sì", 1, "#f0ecdc"], ["felice", 1, "#f5c84c"]], "tratti": ["#807173", "#4c4c5f", "#46465a"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Domani", "piove", "?", "⚑ottone", "teleferica", "domani", "teleferica·fine", "⚑turchese", "sole", "No"], "pescata": "Fine"}], "biglietti": {"Domani": "#657374", "piove": "#4680cb", "?": "#96969f", "pioggia": "#3d7ad6", "sole": "#f3c74e", "⚑turchese": "#2e95a0"}, "paperelle": {"Sì": "#f0ecdc", "No": "#8c5a3c", "domani": "#fa96c8", "teleferica": "#a064d7", "teleferica·fine": "#5a328c"}}, "campanella": {"giri": [{"frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Al", "mare", "Emma", "⚑ottone"], "passeggeri": [{"parola": "⚑oro", "biglietto": "#f3c74e", "tratti": ["#f2c74e", "#f2c64f", "#f1c650"]}, {"parola": "storie", "biglietto": "#b49b86", "tratti": ["#b19988", "#ad978a", "#a7958b"]}, {"parola": "di", "biglietto": "#75978f", "tratti": ["#769786", "#799681", "#819388"]}, {"parola": "mare", "biglietto": "#4681d7", "tratti": ["#427edb", "#3d79de", "#3975df"]}, {"parola": "⚑turchese", "biglietto": "#2e95a0", "tratti": ["#2e969d", "#2d9999", "#2d9c92"]}, {"parola": "⚑argento", "biglietto": "#98969f", "tratti": ["#98969f", "#98969f", "#97969f"]}, {"parola": "Al", "biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"]}, {"parola": "mare", "biglietto": "#4681d7", "tratti": ["#427edb", "#3d79de", "#3975df"]}, {"parola": "Emma", "biglietto": "#bc937f", "tratti": ["#b99380", "#b19486", "#a49592"]}], "ottone": {"biglietto": "#b2a17f", "dopo_fili": "#7392bd", "tratti": ["#3b71d1", "#2864dc", "#2864dc"], "fili": [0.05, 0.0, 0.0, 0.47, 0.0, 0.0, 0.0, 0.48, 0.0, 0.0]}, "finestre": [[["nuota", 6, "#2864dc"], ["onde", 4, "#3c78e6"], ["conchiglie", 4, "#508ceb"], ["felice", 4, "#f5c84c"], ["sabbia", 3, "#5a96dc"], ["gioca", 3, "#28aaaa"], ["Fine", 3, "#46465a"], ["Bovary", 2, "#f07064"], ["e", 2, "#f08c78"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["scivolo", 2, "#46af64"], ["corre", 2, "#28aa50"], [".", 1, "#9696a0"]], [["nuota", 15, "#2864dc"], ["gioca", 6, "#28aaaa"], ["Fine", 4, "#46465a"], ["onde", 3, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["felice", 2, "#f5c84c"], ["Bovary", 1, "#f07064"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"]], [["nuota", 26, "#2864dc"], ["gioca", 7, "#28aaaa"], ["Fine", 3, "#46465a"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"], ["conchiglie", 1, "#508ceb"], ["corre", 1, "#28aa50"]]], "vasca": [["nuota", 26, "#2864dc"], ["gioca", 7, "#28aaaa"], ["Fine", 3, "#46465a"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"], ["conchiglie", 1, "#508ceb"], ["corre", 1, "#28aa50"]], "probabilita": {"nuota": 0.65, "gioca": 0.163, "Fine": 0.064, "onde": 0.035, "corre": 0.031}, "pescata": "nuota"}, {"finestre": [[["e", 5, "#f08c78"], [".", 4, "#9696a0"], ["felice", 4, "#f5c84c"], ["Fine", 4, "#46465a"], ["gioca", 4, "#28aaaa"], ["corre", 4, "#28aa50"], ["onde", 4, "#3c78e6"], ["sabbia", 4, "#5a96dc"], ["Bovary", 4, "#f07064"], ["conchiglie", 3, "#508ceb"]], [["e", 8, "#f08c78"], [".", 6, "#9696a0"], ["felice", 5, "#f5c84c"], ["Fine", 4, "#46465a"], ["gioca", 4, "#28aaaa"], ["corre", 3, "#28aa50"], ["onde", 3, "#3c78e6"], ["sabbia", 3, "#5a96dc"], ["Bovary", 2, "#f07064"], ["conchiglie", 2, "#508ceb"]], [["e", 14, "#f08c78"], [".", 8, "#9696a0"], ["felice", 4, "#f5c84c"], ["Fine", 3, "#46465a"], ["gioca", 3, "#28aaaa"], ["corre", 2, "#28aa50"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], ["Bovary", 1, "#f07064"], ["conchiglie", 1, "#508ceb"]]], "vasca": [["e", 14, "#f08c78"], [".", 8, "#9696a0"], ["felice", 4, "#f5c84c"], ["Fine", 3, "#46465a"], ["gioca", 3, "#28aaaa"], ["corre", 2, "#28aa50"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], ["Bovary", 1, "#f07064"], ["conchiglie", 1, "#508ceb"]], "tratti": ["#98918b", "#de8e7e", "#ee8c79"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Al", "mare", "Emma", "⚑ottone", "nuota"], "pescata": "e"}, {"finestre": [[["gioca", 6, "#28aaaa"], ["corre", 6, "#28aa50"], ["nuota", 5, "#2864dc"], ["altalena", 5, "#50be6e"], ["foglie", 5, "#3cb45a"], ["scivolo", 5, "#46af64"], ["Fine", 4, "#46465a"], ["onde", 4, "#3c78e6"]], [["gioca", 9, "#28aaaa"], ["corre", 8, "#28aa50"], ["nuota", 6, "#2864dc"], ["altalena", 4, "#50be6e"], ["foglie", 4, "#3cb45a"], ["scivolo", 3, "#46af64"], ["Fine", 3, "#46465a"], ["onde", 3, "#3c78e6"]], [["gioca", 15, "#28aaaa"], ["corre", 11, "#28aa50"], ["nuota", 6, "#2864dc"], ["altalena", 2, "#50be6e"], ["foglie", 2, "#3cb45a"], ["scivolo", 2, "#46af64"], ["Fine", 1, "#46465a"], ["onde", 1, "#3c78e6"]]], "vasca": [["gioca", 15, "#28aaaa"], ["corre", 11, "#28aa50"], ["nuota", 6, "#2864dc"], ["altalena", 2, "#50be6e"], ["foglie", 2, "#3cb45a"], ["scivolo", 2, "#46af64"], ["Fine", 1, "#46465a"], ["onde", 1, "#3c78e6"]], "tratti": ["#309b8c", "#28a794", "#28aaa0"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Al", "mare", "Emma", "⚑ottone", "nuota", "e"], "pescata": "gioca"}, {"finestre": [[["e", 6, "#f08c78"], [".", 6, "#9696a0"], ["Fine", 5, "#46465a"], ["felice", 5, "#f5c84c"], ["corre", 5, "#28aa50"], ["nuota", 5, "#2864dc"], ["Bovary", 4, "#f07064"], ["sabbia", 4, "#5a96dc"]], [["e", 8, "#f08c78"], [".", 8, "#9696a0"], ["Fine", 6, "#46465a"], ["felice", 4, "#f5c84c"], ["corre", 4, "#28aa50"], ["nuota", 4, "#2864dc"], ["Bovary", 3, "#f07064"], ["sabbia", 3, "#5a96dc"]], [["e", 13, "#f08c78"], [".", 12, "#9696a0"], ["Fine", 6, "#46465a"], ["felice", 3, "#f5c84c"], ["corre", 2, "#28aa50"], ["nuota", 2, "#2864dc"], ["Bovary", 1, "#f07064"], ["sabbia", 1, "#5a96dc"]]], "vasca": [["e", 13, "#f08c78"], [".", 12, "#9696a0"], ["Fine", 6, "#46465a"], ["felice", 3, "#f5c84c"], ["corre", 2, "#28aa50"], ["nuota", 2, "#2864dc"], ["Bovary", 1, "#f07064"], ["sabbia", 1, "#5a96dc"]], "tratti": ["#9d8881", "#c18d87", "#ce8f87"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Al", "mare", "Emma", "⚑ottone", "nuota", "e", "gioca"], "pescata": "e"}], "giri_risposta": 4, "seguito": [{"frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Al", "mare", "Emma", "⚑ottone", "nuota", "e", "gioca", "e", "⚑argento", "continua", "⚑ottone"], "passeggeri": [{"parola": "⚑oro", "biglietto": "#f3c74e", "tratti": ["#f2c74e", "#f2c64f", "#f1c650"]}, {"parola": "storie", "biglietto": "#b49b86", "tratti": ["#b19988", "#ad978a", "#a7958b"]}, {"parola": "di", "biglietto": "#75978f", "tratti": ["#769786", "#799681", "#819388"]}, {"parola": "mare", "biglietto": "#4681d7", "tratti": ["#427edb", "#3d79de", "#3975df"]}, {"parola": "⚑turchese", "biglietto": "#2e95a0", "tratti": ["#2e969d", "#2d9999", "#2d9c92"]}, {"parola": "⚑argento", "biglietto": "#98969f", "tratti": ["#98969f", "#98969f", "#97969f"]}, {"parola": "Al", "biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"]}, {"parola": "mare", "biglietto": "#4681d7", "tratti": ["#427edb", "#3d79de", "#3975df"]}, {"parola": "Emma", "biglietto": "#bc937f", "tratti": ["#b99380", "#b19486", "#a49592"]}, {"parola": "⚑ottone", "biglietto": "#b2a17f", "tratti": ["#afa080", "#a99d83", "#a09b86"]}, {"parola": "nuota", "biglietto": "#2f73d4", "tratti": ["#2e71d5", "#2c6ed7", "#2a6cd8"]}, {"parola": "e", "biglietto": "#ad9584", "tratti": ["#ac9584", "#a99684", "#a59683"]}, {"parola": "gioca", "biglietto": "#2e95a0", "tratti": ["#2e969d", "#2d9999", "#2d9c92"]}, {"parola": "e", "biglietto": "#ad9584", "tratti": ["#ac9584", "#a99684", "#a59683"]}, {"parola": "⚑argento", "biglietto": "#98969f", "tratti": ["#98969f", "#98969f", "#97969f"]}, {"parola": "continua", "biglietto": "#52a57c", "tratti": ["#51a67b", "#4ea778", "#4ca974"]}], "ottone": {"biglietto": "#b2a17f", "dopo_fili": "#7392bd", "tratti": ["#3b71d1", "#2864dc", "#2864dc"], "fili": [0.05, 0.0, 0.0, 0.47, 0.0, 0.0, 0.0, 0.48, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, "finestre": [[["nuota", 6, "#2864dc"], ["onde", 4, "#3c78e6"], ["conchiglie", 4, "#508ceb"], ["felice", 4, "#f5c84c"], ["sabbia", 3, "#5a96dc"], ["gioca", 3, "#28aaaa"], ["Fine", 3, "#46465a"], ["Bovary", 2, "#f07064"], ["e", 2, "#f08c78"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["scivolo", 2, "#46af64"], ["corre", 2, "#28aa50"], [".", 1, "#9696a0"]], [["nuota", 15, "#2864dc"], ["gioca", 6, "#28aaaa"], ["Fine", 4, "#46465a"], ["onde", 3, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["felice", 2, "#f5c84c"], ["Bovary", 1, "#f07064"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"]], [["nuota", 26, "#2864dc"], ["gioca", 7, "#28aaaa"], ["Fine", 3, "#46465a"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"], ["conchiglie", 1, "#508ceb"], ["corre", 1, "#28aa50"]]], "vasca": [["nuota", 26, "#2864dc"], ["gioca", 7, "#28aaaa"], ["Fine", 3, "#46465a"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"], ["conchiglie", 1, "#508ceb"], ["corre", 1, "#28aa50"]], "probabilita": {"nuota": 0.65, "gioca": 0.163, "Fine": 0.064, "onde": 0.035, "corre": 0.031}, "pescata": "nuota"}, {"finestre": [[[".", 7, "#9696a0"], ["e", 6, "#f08c78"], ["Fine", 6, "#46465a"], ["felice", 6, "#f5c84c"], ["gioca", 5, "#28aaaa"], ["onde", 5, "#3c78e6"], ["sabbia", 5, "#5a96dc"]], [[".", 11, "#9696a0"], ["e", 8, "#f08c78"], ["Fine", 7, "#46465a"], ["felice", 4, "#f5c84c"], ["gioca", 4, "#28aaaa"], ["onde", 3, "#3c78e6"], ["sabbia", 3, "#5a96dc"]], [[".", 18, "#9696a0"], ["e", 9, "#f08c78"], ["Fine", 7, "#46465a"], ["felice", 2, "#f5c84c"], ["gioca", 2, "#28aaaa"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"]]], "vasca": [[".", 18, "#9696a0"], ["e", 9, "#f08c78"], ["Fine", 7, "#46465a"], ["felice", 2, "#f5c84c"], ["gioca", 2, "#28aaaa"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"]], "tratti": ["#94898b", "#9c9198", "#97969f"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Al", "mare", "Emma", "⚑ottone", "nuota", "e", "gioca", "e", "⚑argento", "continua", "⚑ottone", "nuota"], "pescata": "."}, {"finestre": [[["Fine", 9, "#46465a"], ["Al", 7, "#787369"], [".", 6, "#9696a0"], ["felice", 6, "#f5c84c"], ["e", 6, "#f08c78"], ["Bovary", 6, "#f07064"]], [["Fine", 16, "#46465a"], ["Al", 6, "#787369"], [".", 5, "#9696a0"], ["felice", 5, "#f5c84c"], ["e", 5, "#f08c78"], ["Bovary", 3, "#f07064"]], [["Fine", 30, "#46465a"], ["Al", 3, "#787369"], [".", 2, "#9696a0"], ["felice", 2, "#f5c84c"], ["e", 2, "#f08c78"], ["Bovary", 1, "#f07064"]]], "vasca": [["Fine", 30, "#46465a"], ["Al", 3, "#787369"], [".", 2, "#9696a0"], ["felice", 2, "#f5c84c"], ["e", 2, "#f08c78"], ["Bovary", 1, "#f07064"]], "tratti": ["#766463", "#46465a", "#46465a"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Al", "mare", "Emma", "⚑ottone", "nuota", "e", "gioca", "e", "⚑argento", "continua", "⚑ottone", "nuota", "."], "pescata": "Fine"}], "biglietti": {"continua": "#52a57c"}}, "telone": {"domanda": ["Chi", "è", "il", "più", "basso", "tra", "Emma", ",", "Al", "e", "mare", "?"], "giusta": {"giri": [{"finestre": [[["telone", 4, "#f58c28"], ["Emma", 4, "#bc937f"], ["Al", 4, "#787369"], ["mare", 4, "#6ed2c8"], ["Sì", 4, "#f0ecdc"], ["No", 4, "#8c5a3c"], ["nuota", 4, "#2864dc"], ["felice", 3, "#f5c84c"], [".", 3, "#9696a0"], ["e", 3, "#f08c78"], ["Fine", 3, "#46465a"]], [["telone", 9, "#f58c28"], ["Emma", 5, "#bc937f"], ["Al", 4, "#787369"], ["mare", 4, "#6ed2c8"], ["Sì", 3, "#f0ecdc"], ["No", 3, "#8c5a3c"], ["nuota", 3, "#2864dc"], ["felice", 3, "#f5c84c"], [".", 2, "#9696a0"], ["e", 2, "#f08c78"], ["Fine", 2, "#46465a"]], [["telone", 18, "#f58c28"], ["Emma", 5, "#bc937f"], ["Al", 4, "#787369"], ["mare", 3, "#6ed2c8"], ["Sì", 2, "#f0ecdc"], ["No", 2, "#8c5a3c"], ["nuota", 2, "#2864dc"], ["felice", 1, "#f5c84c"], [".", 1, "#9696a0"], ["e", 1, "#f08c78"], ["Fine", 1, "#46465a"]]], "vasca": [["telone", 18, "#f58c28"], ["Emma", 5, "#bc937f"], ["Al", 4, "#787369"], ["mare", 3, "#6ed2c8"], ["Sì", 2, "#f0ecdc"], ["No", 2, "#8c5a3c"], ["nuota", 2, "#2864dc"], ["felice", 1, "#f5c84c"], [".", 1, "#9696a0"], ["e", 1, "#f08c78"], ["Fine", 1, "#46465a"]], "tratti": ["#b5916c", "#f18c2c", "#f58c28"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Chi", "è", "il", "più", "basso", "tra", "Emma", ",", "Al", "e", "mare", "?", "⚑ottone"], "pescata": "telone"}, {"finestre": [[["Al", 4, "#787369"], ["Emma", 4, "#bc937f"], ["mare", 4, "#6ed2c8"], ["piccolo", 4, "#b4c85a"], ["felice", 4, "#f5c84c"], [".", 4, "#9696a0"], ["e", 4, "#f08c78"], ["nuota", 3, "#2864dc"], ["Fine", 3, "#46465a"], ["gioca", 3, "#28aaaa"], ["corre", 3, "#28aa50"]], [["Al", 6, "#787369"], ["Emma", 6, "#bc937f"], ["mare", 6, "#6ed2c8"], ["piccolo", 4, "#b4c85a"], ["felice", 3, "#f5c84c"], [".", 3, "#9696a0"], ["e", 3, "#f08c78"], ["nuota", 3, "#2864dc"], ["Fine", 2, "#46465a"], ["gioca", 2, "#28aaaa"], ["corre", 2, "#28aa50"]], [["Al", 9, "#787369"], ["Emma", 9, "#bc937f"], ["mare", 8, "#6ed2c8"], ["piccolo", 3, "#b4c85a"], ["felice", 2, "#f5c84c"], [".", 2, "#9696a0"], ["e", 2, "#f08c78"], ["nuota", 2, "#2864dc"], ["Fine", 1, "#46465a"], ["gioca", 1, "#28aaaa"], ["corre", 1, "#28aa50"]]], "vasca": [["Al", 9, "#787369"], ["Emma", 9, "#bc937f"], ["mare", 8, "#6ed2c8"], ["piccolo", 3, "#b4c85a"], ["felice", 2, "#f5c84c"], [".", 2, "#9696a0"], ["e", 2, "#f08c78"], ["nuota", 2, "#2864dc"], ["Fine", 1, "#46465a"], ["gioca", 1, "#28aaaa"], ["corre", 1, "#28aa50"]], "tratti": ["#8d9b87", "#8f9889", "#929284"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Chi", "è", "il", "più", "basso", "tra", "Emma", ",", "Al", "e", "mare", "?", "⚑ottone", "telone"], "pescata": "Al"}, {"finestre": [[["piccolo", 6, "#b4c85a"], ["e", 5, "#f08c78"], [".", 5, "#9696a0"], ["Fine", 5, "#46465a"], ["felice", 5, "#f5c84c"], ["telone·fine", 5, "#a04b14"], ["Emma", 5, "#bc937f"], ["mare", 4, "#6ed2c8"]], [["piccolo", 11, "#b4c85a"], ["e", 6, "#f08c78"], [".", 5, "#9696a0"], ["Fine", 4, "#46465a"], ["felice", 4, "#f5c84c"], ["telone·fine", 4, "#a04b14"], ["Emma", 3, "#bc937f"], ["mare", 3, "#6ed2c8"]], [["piccolo", 22, "#b4c85a"], ["e", 5, "#f08c78"], [".", 4, "#9696a0"], ["telone·fine", 3, "#a04b14"], ["Fine", 2, "#46465a"], ["felice", 2, "#f5c84c"], ["Emma", 1, "#bc937f"], ["mare", 1, "#6ed2c8"]]], "vasca": [["piccolo", 22, "#b4c85a"], ["e", 5, "#f08c78"], [".", 4, "#9696a0"], ["telone·fine", 3, "#a04b14"], ["Fine", 2, "#46465a"], ["felice", 2, "#f5c84c"], ["Emma", 1, "#bc937f"], ["mare", 1, "#6ed2c8"]], "tratti": ["#b1a365", "#b4c75b", "#b4c85a"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Chi", "è", "il", "più", "basso", "tra", "Emma", ",", "Al", "e", "mare", "?", "⚑ottone", "telone", "Al"], "pescata": "piccolo"}, {"finestre": [[["telone·fine", 8, "#a04b14"], [".", 7, "#9696a0"], ["e", 7, "#f08c78"], ["Fine", 6, "#46465a"], ["Al", 6, "#787369"], ["felice", 6, "#f5c84c"]], [["telone·fine", 13, "#a04b14"], [".", 7, "#9696a0"], ["e", 6, "#f08c78"], ["Fine", 5, "#46465a"], ["Al", 5, "#787369"], ["felice", 4, "#f5c84c"]], [["telone·fine", 24, "#a04b14"], [".", 6, "#9696a0"], ["e", 4, "#f08c78"], ["Fine", 2, "#46465a"], ["Al", 2, "#787369"], ["felice", 2, "#f5c84c"]]], "vasca": [["telone·fine", 24, "#a04b14"], [".", 6, "#9696a0"], ["e", 4, "#f08c78"], ["Fine", 2, "#46465a"], ["Al", 2, "#787369"], ["felice", 2, "#f5c84c"]], "tratti": ["#a56c48", "#a04d17", "#a04b14"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Chi", "è", "il", "più", "basso", "tra", "Emma", ",", "Al", "e", "mare", "?", "⚑ottone", "telone", "Al", "piccolo"], "pescata": "telone·fine"}, {"finestre": [[["Al", 8, "#787369"], ["Emma", 7, "#bc937f"], ["mare", 7, "#6ed2c8"], ["Sì", 6, "#f0ecdc"], [".", 6, "#9696a0"], ["Fine", 6, "#46465a"]], [["Al", 14, "#787369"], ["Emma", 7, "#bc937f"], ["mare", 5, "#6ed2c8"], ["Sì", 5, "#f0ecdc"], [".", 5, "#9696a0"], ["Fine", 4, "#46465a"]], [["Al", 26, "#787369"], ["Emma", 5, "#bc937f"], ["mare", 3, "#6ed2c8"], ["Sì", 2, "#f0ecdc"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"]]], "vasca": [["Al", 26, "#787369"], ["Emma", 5, "#bc937f"], ["mare", 3, "#6ed2c8"], ["Sì", 2, "#f0ecdc"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"]], "tratti": ["#898a82", "#797369", "#787369"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Chi", "è", "il", "più", "basso", "tra", "Emma", ",", "Al", "e", "mare", "?", "⚑ottone", "telone", "Al", "piccolo", "telone·fine"], "pescata": "Al", "fili": {"basso·10": 0.1, "Al·20": 0.35, "piccolo·21": 0.4, "telone·fine·22": 0.15}}, {"finestre": [[["Fine", 12, "#46465a"], [".", 10, "#9696a0"], ["e", 9, "#f08c78"], ["felice", 9, "#f5c84c"]], [["Fine", 17, "#46465a"], [".", 12, "#9696a0"], ["e", 6, "#f08c78"], ["felice", 5, "#f5c84c"]], [["Fine", 25, "#46465a"], [".", 11, "#9696a0"], ["e", 2, "#f08c78"], ["felice", 2, "#f5c84c"]]], "vasca": [["Fine", 25, "#46465a"], [".", 11, "#9696a0"], ["e", 2, "#f08c78"], ["felice", 2, "#f5c84c"]], "tratti": ["#7a6e70", "#4d4d60", "#46465a"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Chi", "è", "il", "più", "basso", "tra", "Emma", ",", "Al", "e", "mare", "?", "⚑ottone", "telone", "Al", "piccolo", "telone·fine", "Al"], "pescata": "Fine"}], "sotto": ["Al", "piccolo"], "risposta": ["Al"]}, "sbagliata": {"giri": [{"finestre": [[["telone", 4, "#f58c28"], ["Emma", 4, "#bc937f"], ["Al", 4, "#787369"], ["mare", 4, "#6ed2c8"], ["Sì", 4, "#f0ecdc"], ["No", 4, "#8c5a3c"], ["nuota", 4, "#2864dc"], ["felice", 3, "#f5c84c"], [".", 3, "#9696a0"], ["e", 3, "#f08c78"], ["Fine", 3, "#46465a"]], [["telone", 9, "#f58c28"], ["Emma", 5, "#bc937f"], ["Al", 4, "#787369"], ["mare", 4, "#6ed2c8"], ["Sì", 3, "#f0ecdc"], ["No", 3, "#8c5a3c"], ["nuota", 3, "#2864dc"], ["felice", 3, "#f5c84c"], [".", 2, "#9696a0"], ["e", 2, "#f08c78"], ["Fine", 2, "#46465a"]], [["telone", 18, "#f58c28"], ["Emma", 5, "#bc937f"], ["Al", 4, "#787369"], ["mare", 3, "#6ed2c8"], ["Sì", 2, "#f0ecdc"], ["No", 2, "#8c5a3c"], ["nuota", 2, "#2864dc"], ["felice", 1, "#f5c84c"], [".", 1, "#9696a0"], ["e", 1, "#f08c78"], ["Fine", 1, "#46465a"]]], "vasca": [["telone", 18, "#f58c28"], ["Emma", 5, "#bc937f"], ["Al", 4, "#787369"], ["mare", 3, "#6ed2c8"], ["Sì", 2, "#f0ecdc"], ["No", 2, "#8c5a3c"], ["nuota", 2, "#2864dc"], ["felice", 1, "#f5c84c"], [".", 1, "#9696a0"], ["e", 1, "#f08c78"], ["Fine", 1, "#46465a"]], "tratti": ["#b5916c", "#f18c2c", "#f58c28"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Chi", "è", "il", "più", "basso", "tra", "Emma", ",", "Al", "e", "mare", "?", "⚑ottone"], "pescata": "telone"}, {"finestre": [[["Al", 4, "#787369"], ["Emma", 4, "#bc937f"], ["mare", 4, "#6ed2c8"], ["piccolo", 4, "#b4c85a"], ["felice", 4, "#f5c84c"], [".", 4, "#9696a0"], ["e", 4, "#f08c78"], ["nuota", 3, "#2864dc"], ["Fine", 3, "#46465a"], ["gioca", 3, "#28aaaa"], ["corre", 3, "#28aa50"]], [["Al", 6, "#787369"], ["Emma", 6, "#bc937f"], ["mare", 6, "#6ed2c8"], ["piccolo", 4, "#b4c85a"], ["felice", 3, "#f5c84c"], [".", 3, "#9696a0"], ["e", 3, "#f08c78"], ["nuota", 3, "#2864dc"], ["Fine", 2, "#46465a"], ["gioca", 2, "#28aaaa"], ["corre", 2, "#28aa50"]], [["Al", 9, "#787369"], ["Emma", 9, "#bc937f"], ["mare", 8, "#6ed2c8"], ["piccolo", 3, "#b4c85a"], ["felice", 2, "#f5c84c"], [".", 2, "#9696a0"], ["e", 2, "#f08c78"], ["nuota", 2, "#2864dc"], ["Fine", 1, "#46465a"], ["gioca", 1, "#28aaaa"], ["corre", 1, "#28aa50"]]], "vasca": [["Al", 9, "#787369"], ["Emma", 9, "#bc937f"], ["mare", 8, "#6ed2c8"], ["piccolo", 3, "#b4c85a"], ["felice", 2, "#f5c84c"], [".", 2, "#9696a0"], ["e", 2, "#f08c78"], ["nuota", 2, "#2864dc"], ["Fine", 1, "#46465a"], ["gioca", 1, "#28aaaa"], ["corre", 1, "#28aa50"]], "tratti": ["#8d9b87", "#8f9889", "#929284"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Chi", "è", "il", "più", "basso", "tra", "Emma", ",", "Al", "e", "mare", "?", "⚑ottone", "telone"], "pescata": "mare"}, {"finestre": [[["piccolo", 6, "#b4c85a"], ["e", 5, "#f08c78"], [".", 5, "#9696a0"], ["telone·fine", 5, "#a04b14"], ["Fine", 5, "#46465a"], ["felice", 5, "#f5c84c"], ["Al", 5, "#787369"], ["Emma", 4, "#bc937f"]], [["piccolo", 10, "#b4c85a"], ["e", 6, "#f08c78"], [".", 5, "#9696a0"], ["telone·fine", 4, "#a04b14"], ["Fine", 4, "#46465a"], ["felice", 4, "#f5c84c"], ["Al", 4, "#787369"], ["Emma", 3, "#bc937f"]], [["piccolo", 20, "#b4c85a"], ["e", 6, "#f08c78"], [".", 4, "#9696a0"], ["telone·fine", 3, "#a04b14"], ["Fine", 2, "#46465a"], ["felice", 2, "#f5c84c"], ["Al", 2, "#787369"], ["Emma", 1, "#bc937f"]]], "vasca": [["piccolo", 20, "#b4c85a"], ["e", 6, "#f08c78"], [".", 4, "#9696a0"], ["telone·fine", 3, "#a04b14"], ["Fine", 2, "#46465a"], ["felice", 2, "#f5c84c"], ["Al", 2, "#787369"], ["Emma", 1, "#bc937f"]], "tratti": ["#b19c62", "#b5c55b", "#b4c85a"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Chi", "è", "il", "più", "basso", "tra", "Emma", ",", "Al", "e", "mare", "?", "⚑ottone", "telone", "mare"], "pescata": "piccolo"}, {"finestre": [[["telone·fine", 8, "#a04b14"], [".", 7, "#9696a0"], ["e", 7, "#f08c78"], ["Fine", 6, "#46465a"], ["mare", 6, "#6ed2c8"], ["felice", 6, "#f5c84c"]], [["telone·fine", 13, "#a04b14"], [".", 7, "#9696a0"], ["e", 6, "#f08c78"], ["Fine", 5, "#46465a"], ["mare", 5, "#6ed2c8"], ["felice", 4, "#f5c84c"]], [["telone·fine", 24, "#a04b14"], [".", 6, "#9696a0"], ["e", 4, "#f08c78"], ["Fine", 2, "#46465a"], ["mare", 2, "#6ed2c8"], ["felice", 2, "#f5c84c"]]], "vasca": [["telone·fine", 24, "#a04b14"], [".", 6, "#9696a0"], ["e", 4, "#f08c78"], ["Fine", 2, "#46465a"], ["mare", 2, "#6ed2c8"], ["felice", 2, "#f5c84c"]], "tratti": ["#a47350", "#a04d17", "#a04b14"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Chi", "è", "il", "più", "basso", "tra", "Emma", ",", "Al", "e", "mare", "?", "⚑ottone", "telone", "mare", "piccolo"], "pescata": "telone·fine"}, {"finestre": [[["mare", 8, "#6ed2c8"], ["Al", 7, "#787369"], ["Emma", 7, "#bc937f"], [".", 6, "#9696a0"], ["Fine", 6, "#46465a"], ["Sì", 6, "#f0ecdc"]], [["mare", 14, "#6ed2c8"], ["Al", 7, "#787369"], ["Emma", 6, "#bc937f"], [".", 5, "#9696a0"], ["Fine", 5, "#46465a"], ["Sì", 3, "#f0ecdc"]], [["mare", 25, "#6ed2c8"], ["Al", 6, "#787369"], ["Emma", 4, "#bc937f"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"], ["Sì", 1, "#f0ecdc"]]], "vasca": [["mare", 25, "#6ed2c8"], ["Al", 6, "#787369"], ["Emma", 4, "#bc937f"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"], ["Sì", 1, "#f0ecdc"]], "tratti": ["#80aba4", "#6ed0c6", "#6ed2c8"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Chi", "è", "il", "più", "basso", "tra", "Emma", ",", "Al", "e", "mare", "?", "⚑ottone", "telone", "mare", "piccolo", "telone·fine"], "pescata": "mare"}, {"finestre": [[["Fine", 11, "#46465a"], [".", 11, "#9696a0"], ["e", 9, "#f08c78"], ["felice", 9, "#f5c84c"]], [["Fine", 17, "#46465a"], [".", 12, "#9696a0"], ["e", 6, "#f08c78"], ["felice", 5, "#f5c84c"]], [["Fine", 24, "#46465a"], [".", 12, "#9696a0"], ["e", 2, "#f08c78"], ["felice", 2, "#f5c84c"]]], "vasca": [["Fine", 24, "#46465a"], [".", 12, "#9696a0"], ["e", 2, "#f08c78"], ["felice", 2, "#f5c84c"]], "tratti": ["#7c7071", "#4f4f62", "#47475b"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Chi", "è", "il", "più", "basso", "tra", "Emma", ",", "Al", "e", "mare", "?", "⚑ottone", "telone", "mare", "piccolo", "telone·fine", "mare"], "pescata": "Fine"}], "sotto": ["mare", "piccolo"], "risposta": ["mare"]}, "campanella": {"giri": [{"finestre": [[["telone", 4, "#f58c28"], ["Emma", 4, "#bc937f"], ["Al", 4, "#787369"], ["mare", 4, "#6ed2c8"], ["Sì", 4, "#f0ecdc"], ["No", 4, "#8c5a3c"], ["nuota", 4, "#2864dc"], ["felice", 3, "#f5c84c"], [".", 3, "#9696a0"], ["e", 3, "#f08c78"], ["Fine", 3, "#46465a"]], [["telone", 9, "#f58c28"], ["Emma", 5, "#bc937f"], ["Al", 4, "#787369"], ["mare", 4, "#6ed2c8"], ["Sì", 3, "#f0ecdc"], ["No", 3, "#8c5a3c"], ["nuota", 3, "#2864dc"], ["felice", 3, "#f5c84c"], [".", 2, "#9696a0"], ["e", 2, "#f08c78"], ["Fine", 2, "#46465a"]], [["telone", 18, "#f58c28"], ["Emma", 5, "#bc937f"], ["Al", 4, "#787369"], ["mare", 3, "#6ed2c8"], ["Sì", 2, "#f0ecdc"], ["No", 2, "#8c5a3c"], ["nuota", 2, "#2864dc"], ["felice", 1, "#f5c84c"], [".", 1, "#9696a0"], ["e", 1, "#f08c78"], ["Fine", 1, "#46465a"]]], "vasca": [["telone", 18, "#f58c28"], ["Emma", 5, "#bc937f"], ["Al", 4, "#787369"], ["mare", 3, "#6ed2c8"], ["Sì", 2, "#f0ecdc"], ["No", 2, "#8c5a3c"], ["nuota", 2, "#2864dc"], ["felice", 1, "#f5c84c"], [".", 1, "#9696a0"], ["e", 1, "#f08c78"], ["Fine", 1, "#46465a"]], "tratti": ["#b5916c", "#f18c2c", "#f58c28"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Chi", "è", "il", "più", "basso", "tra", "Emma", ",", "Al", "e", "mare", "?", "⚑ottone"], "pescata": "telone"}, {"finestre": [[["Al", 4, "#787369"], ["Emma", 4, "#bc937f"], ["mare", 4, "#6ed2c8"], ["piccolo", 4, "#b4c85a"], ["felice", 4, "#f5c84c"], [".", 4, "#9696a0"], ["e", 4, "#f08c78"], ["nuota", 3, "#2864dc"], ["Fine", 3, "#46465a"], ["gioca", 3, "#28aaaa"], ["corre", 3, "#28aa50"]], [["Al", 6, "#787369"], ["Emma", 6, "#bc937f"], ["mare", 6, "#6ed2c8"], ["piccolo", 4, "#b4c85a"], ["felice", 3, "#f5c84c"], [".", 3, "#9696a0"], ["e", 3, "#f08c78"], ["nuota", 3, "#2864dc"], ["Fine", 2, "#46465a"], ["gioca", 2, "#28aaaa"], ["corre", 2, "#28aa50"]], [["Al", 9, "#787369"], ["Emma", 9, "#bc937f"], ["mare", 8, "#6ed2c8"], ["piccolo", 3, "#b4c85a"], ["felice", 2, "#f5c84c"], [".", 2, "#9696a0"], ["e", 2, "#f08c78"], ["nuota", 2, "#2864dc"], ["Fine", 1, "#46465a"], ["gioca", 1, "#28aaaa"], ["corre", 1, "#28aa50"]]], "vasca": [["Al", 9, "#787369"], ["Emma", 9, "#bc937f"], ["mare", 8, "#6ed2c8"], ["piccolo", 3, "#b4c85a"], ["felice", 2, "#f5c84c"], [".", 2, "#9696a0"], ["e", 2, "#f08c78"], ["nuota", 2, "#2864dc"], ["Fine", 1, "#46465a"], ["gioca", 1, "#28aaaa"], ["corre", 1, "#28aa50"]], "tratti": ["#8d9b87", "#8f9889", "#929284"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Chi", "è", "il", "più", "basso", "tra", "Emma", ",", "Al", "e", "mare", "?", "⚑ottone", "telone"], "pescata": "Emma"}, {"finestre": [[["Emma", 7, "#bc937f"], ["Al", 7, "#787369"], ["mare", 6, "#6ed2c8"], ["Sì", 5, "#f0ecdc"], [".", 5, "#9696a0"], ["Fine", 5, "#46465a"], ["felice", 5, "#f5c84c"]], [["Emma", 9, "#bc937f"], ["Al", 8, "#787369"], ["mare", 8, "#6ed2c8"], ["Sì", 4, "#f0ecdc"], [".", 4, "#9696a0"], ["Fine", 4, "#46465a"], ["felice", 3, "#f5c84c"]], [["Emma", 13, "#bc937f"], ["Al", 11, "#787369"], ["mare", 9, "#6ed2c8"], ["Sì", 2, "#f0ecdc"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"], ["felice", 1, "#f5c84c"]]], "vasca": [["Emma", 13, "#bc937f"], ["Al", 11, "#787369"], ["mare", 9, "#6ed2c8"], ["Sì", 2, "#f0ecdc"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"], ["felice", 1, "#f5c84c"]], "tratti": ["#959c8d", "#999485", "#a78f7e"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Chi", "è", "il", "più", "basso", "tra", "Emma", ",", "Al", "e", "mare", "?", "⚑ottone", "telone", "Emma", "telone·fine"], "pescata": "Emma"}, {"finestre": [[["Fine", 11, "#46465a"], [".", 11, "#9696a0"], ["e", 9, "#f08c78"], ["felice", 9, "#f5c84c"]], [["Fine", 16, "#46465a"], [".", 12, "#9696a0"], ["e", 7, "#f08c78"], ["felice", 5, "#f5c84c"]], [["Fine", 24, "#46465a"], [".", 11, "#9696a0"], ["e", 3, "#f08c78"], ["felice", 2, "#f5c84c"]]], "vasca": [["Fine", 24, "#46465a"], [".", 11, "#9696a0"], ["e", 3, "#f08c78"], ["felice", 2, "#f5c84c"]], "tratti": ["#7e7070", "#4e4d60", "#46465a"], "frase": ["⚑oro", "storie", "di", "mare", "⚑turchese", "⚑argento", "Chi", "è", "il", "più", "basso", "tra", "Emma", ",", "Al", "e", "mare", "?", "⚑ottone", "telone", "Emma", "telone·fine", "Emma"], "pescata": "Fine"}], "sotto": ["Emma"], "risposta": ["Emma"]}, "paperelle": {"telone": "#f58c28", "telone·fine": "#a04b14", "Al": "#787369", "mare": "#6ed2c8", "Emma": "#bc937f", "piccolo": "#b4c85a"}, "biglietti": {"Chi": "#8b9094", "è": "#669982", "il": "#739685", "più": "#8c8f8b", "basso": "#3bab62", "tra": "#63988a", "Emma": "#bc937f", ",": "#99969d", "Al": "#429096", "e": "#ad9584", "mare": "#4681d7", "?": "#96969f"}}, "gemello": {"laggiu": {"frase": ["⚑oro", "storie", "di", "parco", "⚑argento", "Al", "mare", "Emma", "⚑ottone"], "passeggeri": [{"parola": "⚑oro", "biglietto": "#f3c74e", "tratti": ["#f2c74e", "#f2c64f", "#f1c650"]}, {"parola": "storie", "biglietto": "#b49b86", "tratti": ["#b19988", "#ad978a", "#a7958b"]}, {"parola": "di", "biglietto": "#75978f", "tratti": ["#769786", "#799681", "#819388"]}, {"parola": "parco", "biglietto": "#47a688", "tratti": ["#3ca58a", "#30a38d", "#29a292"]}, {"parola": "⚑argento", "biglietto": "#98969f", "tratti": ["#98969f", "#98969f", "#97969f"]}, {"parola": "Al", "biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"]}, {"parola": "mare", "biglietto": "#4681d7", "tratti": ["#427edb", "#3d79de", "#3975df"]}, {"parola": "Emma", "biglietto": "#bc937f", "tratti": ["#b99380", "#b19486", "#a49592"]}], "ottone": {"biglietto": "#b2a17f", "dopo_fili": "#5f8bc9", "tratti": ["#3278cf", "#2872d1", "#2880c7"], "fili": [0.05, 0.0, 0.0, 0.41, 0.0, 0.0, 0.54, 0.0, 0.0]}, "finestre": [[["nuota", 5, "#2864dc"], ["onde", 4, "#3c78e6"], ["conchiglie", 4, "#508ceb"], ["gioca", 4, "#28aaaa"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["corre", 3, "#28aa50"], ["felice", 3, "#f5c84c"], ["Bovary", 2, "#f07064"], ["e", 2, "#f08c78"], ["foglie", 2, "#3cb45a"], ["scivolo", 2, "#46af64"], ["Fine", 2, "#46465a"], [".", 1, "#9696a0"]], [["nuota", 11, "#2864dc"], ["gioca", 9, "#28aaaa"], ["corre", 6, "#28aa50"], ["Fine", 3, "#46465a"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], ["altalena", 2, "#50be6e"], ["conchiglie", 2, "#508ceb"], ["Bovary", 1, "#f07064"], ["foglie", 1, "#3cb45a"], ["scivolo", 1, "#46af64"]], [["nuota", 15, "#2864dc"], ["gioca", 14, "#28aaaa"], ["corre", 8, "#28aa50"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"], ["Fine", 1, "#46465a"]]], "vasca": [["nuota", 15, "#2864dc"], ["gioca", 14, "#28aaaa"], ["corre", 8, "#28aa50"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"], ["Fine", 1, "#46465a"]], "probabilita": {"nuota": 0.366, "gioca": 0.344, "corre": 0.194, "Fine": 0.035, "onde": 0.013}}, "pescata_laggiu": "gioca", "lupo": {"frase": ["Il", "lupo", "mangia", "la", "nonna"], "vestiti": ["#5c9c52", "#847e48", "#7c844a", "#5c9c52", "#7c844a"], "uscita": "#77874b", "rosse": 5, "verdi": 15, "sbarra": "su"}, "piove": {"finestre": [[["Sì", 3, "#f0ecdc"], ["No", 3, "#8c5a3c"], ["nuota", 3, "#2864dc"], ["felice", 3, "#f5c84c"], ["gioca", 2, "#28aaaa"], ["domani", 2, "#fa96c8"], ["e", 2, "#f08c78"], ["corre", 2, "#28aa50"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["conchiglie", 2, "#508ceb"], ["scivolo", 2, "#46af64"], ["teleferica", 2, "#a064d7"]], [["Sì", 3, "#f0ecdc"], ["No", 3, "#8c5a3c"], ["nuota", 3, "#2864dc"], ["felice", 3, "#f5c84c"], ["gioca", 3, "#28aaaa"], ["domani", 2, "#fa96c8"], ["e", 2, "#f08c78"], ["corre", 2, "#28aa50"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["conchiglie", 2, "#508ceb"], ["scivolo", 2, "#46af64"], ["teleferica", 1, "#a064d7"]], [["Sì", 6, "#f0ecdc"], ["No", 5, "#8c5a3c"], ["nuota", 3, "#2864dc"], ["felice", 3, "#f5c84c"], ["gioca", 3, "#28aaaa"], ["domani", 2, "#fa96c8"], ["e", 2, "#f08c78"], ["corre", 2, "#28aa50"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"], ["Bovary", 1, "#f07064"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["conchiglie", 1, "#508ceb"], ["scivolo", 1, "#46af64"], ["teleferica", 1, "#a064d7"]]], "vasca": [["Sì", 6, "#f0ecdc"], ["No", 5, "#8c5a3c"], ["nuota", 3, "#2864dc"], ["felice", 3, "#f5c84c"], ["gioca", 3, "#28aaaa"], ["domani", 2, "#fa96c8"], ["e", 2, "#f08c78"], ["corre", 2, "#28aa50"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"], ["Bovary", 1, "#f07064"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["conchiglie", 1, "#508ceb"], ["scivolo", 1, "#46af64"], ["teleferica", 1, "#a064d7"]], "tratti": ["#889697", "#b1ac9f", "#d6c9b7"], "frase": ["⚑oro", "storie", "di", "parco", "⚑argento", "Domani", "piove", "?", "⚑ottone"], "pescata": "No"}}}};
// </modellino>

window.G = {
  C, defs, MOD, MONDO, mix, tappa, fade, cam, camChiavi, posa, unico,
  emma, emmaTirata, al, mare, parco, paperella, ada, adaTesta, custode, custodeGemello, guardiola, CUSTODE_MANI, libroAperto, PAGINE,
  bandierina, segnoBandierina, METALLI,
  biglietto, lanterna, striscia, chat, cameretta, spezzaparole, vagone, passeggero, sasso, pezzo, cane, chiama, manopola, laggiu, telefono, bolle, insegna, salotto, SALOTTO,
  mondo, papereVasca, treno, posaTreno, fermoTreno, sbarre, cambiaPasseggero, rng: kitRng, percorso, costruisciMondo, animaMondo, nascondiInMontagna, posaAda,
  finestra, papereFinestra, paperellaDiLuce, INTERNO, interno, interniDefs, testa, cima, anello, scorriInterno,
  sottotitolo, chunkSub, subs, RITMO, tempo, reale,
};

// ── I disegni di un solo episodio ───────────────────────────────────────────────────────────────────
// Qui sotto ogni episodio aggiunge a window.G, nella sua sezione, i disegni che servono solo a lui.
// ── Episodio 3 ──
// Un'uscita con la pesca, come nell'episodio 2, da ripetere più volte nella stessa scena: il treno esce dalla montagna,
// sotto l'ultimo vagone cadono le paperelle (di luce, e toccano l'acqua vere), il treno si ferma in stazione e i vestiti
// tornano del colore dei biglietti; Ada pesca a occhi chiusi, la paperella salta, corre e sale su un vagone nuovo; le
// altre scivolano via; poi (se o.t.riparte) il treno riparte, sale e sparisce nella montagna.
// o: { id (unico nella scena), chi: [{ tipo, biglietto, uscita }], vasca, seme, parola (quella pescata), nuovo (colore),
//      t: { esce, vel ([[t, v], …] dall'uscita), pesca: { giu, su, preso }, salta, sale, vagone, via, riparte: [a, b] } }.
// pescata.treno, .mano e .papere sono gli SVG da mettere nel mondo (le papere nella vasca, .g-vasca); dopo
// costruisciMondo si chiama monta(m); render(t) muove tutto e restituisce quanto Ada ha la mano giù (per la sua posa).
window.G.pescata = function (o) {
  const G = window.G, M = G.MONDO, id = o.id, T = o.t, ADA = [672, 896];
  const lista = G.papereVasca(o.vasca, o.seme);
  let presa = -1, bd = 1e9;
  lista.forEach((p, i) => { const d = Math.abs(p.x - 700) + Math.abs(p.y - 880); if (p.parola === o.parola && d < bd) { bd = d; presa = i; } });
  const colPresa = presa >= 0 ? lista[presa].col : G.C.crema;
  const ordine = lista.map((p, i) => i).sort((a, b) => lista[a].y - lista[b].y);
  let scintille = '';
  for (let k = 0; k < 10; k++) scintille += '<circle r="2.4" fill="' + G.C.luce + '"/>';
  const passeggeri = o.chi.map(c => ({ tipo: c.tipo, col: c.uscita, o: c.o })).concat(o.nuovo ? [{ tipo: 'paperella', col: o.nuovo }] : []);
  const P = {
    lista, presa, colPresa,
    treno: '<g class="pv-treno-' + id + '">' + G.treno(passeggeri, { sbarra: 1 }) + '</g><g class="pv-scint-' + id + '" opacity="0">' + scintille + '</g>',
    mano: '<ellipse class="pv-luce-' + id + '" rx="22" ry="18" fill="' + colPresa + '" opacity="0" filter="url(#g-soft)"/>' +
      '<g class="pv-mano-' + id + '" opacity="0"><g transform="translate(-50 -84)">' + G.paperella(colPresa) + '</g></g>',
    papere: ordine.map(i => '<g class="pv-pap-' + id + '" data-i="' + i + '" opacity="0"><g transform="translate(-50 -84)"><g class="pv-vera">' + G.paperella(lista[i].col) + '</g><g class="pv-dilu">' + G.paperellaDiLuce(lista[i].col) + '</g></g></g>').join(''),
    monta(m) {
      this.m = m;
      this.vag = m.qa('.pv-treno-' + id + ' .g-vag');
      this.passNuovo = o.nuovo ? this.vag[this.vag.length - 1].querySelector('.g-pass') : null;
      this.manoEl = m.q('.pv-mano-' + id); this.luce = m.q('.pv-luce-' + id); this.scint = m.q('.pv-scint-' + id);
      this.pap = m.qa('.pv-pap-' + id).map(el => ({ el, i: +el.dataset.i, vera: el.querySelector('.pv-vera'), luce: el.querySelector('.pv-dilu') }));
      const path = m.arrivo;
      this.sF = path.getTotalLength() - (M.fermo - 40);
      const sAt = t => Math.min(this.sF, G.percorso(t, 0, T.vel));
      const ultimo = o.chi.length - 1;
      this.cade = lista.map(p => {
        for (let t = T.esce; t < T.esce + 30; t += 0.02) { const se = sAt(t) - ultimo * M.passo; if (se > 0 && path.getPointAtLength(se).x <= p.x + 6) return t; }
        return T.esce + 8;
      });
      this.sedile = [M.fermo + o.chi.length * M.passo + 6, 816];
      this.statoPass = '';
    },
    // Quanto Ada ha la mano nella vasca (0..1).
    giu(t) {
      const Pp = T.pesca;
      if (t < Pp.giu - 0.6) return 0;
      if (t <= Pp.giu + 0.4) return eio(seg(t, Pp.giu - 0.6, Pp.giu + 0.4));
      if (t < Pp.su) return 0.9 + 0.1 * Math.sin((t - Pp.giu) * 9);
      return 1 - eio(seg(t, Pp.su, Pp.preso + 0.4));
    },
    manoAt(giu) {
      const s = 0.28, mx = 150 + 26 * giu - 6, my = 230 + 50 * giu + 6;
      return [ADA[0] - 100 * s + mx * s, ADA[1] - 304 * s + my * s];
    },
    render(t) {
      const m = this.m, Pp = T.pesca;
      // Il treno: esce, si ferma in stazione; poi, se riparte, sale la salita e sparisce nella montagna.
      const s = Math.min(this.sF, G.percorso(t, 0, T.vel));
      const vedi = t >= T.esce - 0.05;
      if (!T.riparte || t < T.riparte[0]) {
        G.posaTreno(this.vag, m.arrivo, vedi ? s : -500);
        G.nascondiInMontagna(this.vag, m.arrivo, vedi ? s : -500, { inizio: true });
      } else {
        const sp = lerp(640 - M.fermo, m.partenza.getTotalLength(), ei(seg(t, T.riparte[0], T.riparte[1])));
        G.posaTreno(this.vag, m.partenza, sp);
        G.nascondiInMontagna(this.vag, m.partenza, sp, { fine: true });
      }
      const torna = Math.round(seg(s, this.sF - 150, this.sF) * 12) / 12;
      const k = String(torna);
      if (k !== this.statoPass) { o.chi.forEach((c, i) => G.cambiaPasseggero(this.vag[i], c.tipo, G.mix(c.uscita, c.biglietto, torna))); this.statoPass = k; }
      // Il vagone nuovo compare dietro l'ultimo, con le scintille; la paperella ci sale.
      if (o.nuovo) {
        const nv = this.vag[this.vag.length - 1];
        const vis = eo(seg(t, T.vagone, T.vagone + 0.6));
        if (!T.riparte || t < T.riparte[0]) nv.setAttribute('opacity', vis.toFixed(3));
        this.passNuovo.setAttribute('opacity', seg(t, T.sale - 0.05, T.sale + 0.3).toFixed(3));
        const sc = seg(t, T.vagone, T.vagone + 1.1);
        this.scint.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
        [...this.scint.children].forEach((c, n) => { const a = n * Math.PI / 5, d = 10 + 34 * eo(sc); c.setAttribute('cx', (this.sedile[0] + d * Math.cos(a)).toFixed(2)); c.setAttribute('cy', (838 + d * 0.6 * Math.sin(a)).toFixed(2)); });
      }
      // Le paperelle cadono dove passa l'ultimo vagone; dopo la pesca scivolano via dallo scarico.
      this.pap.forEach(({ el, i, vera, luce }) => {
        const t0 = this.cade[i], p = lista[i];
        if (t < t0) { el.setAttribute('opacity', 0); return; }
        const u = seg(t, t0, t0 + 0.55), vv = seg(u, 0.55, 1);
        vera.setAttribute('opacity', vv.toFixed(3)); luce.setAttribute('opacity', (1 - vv).toFixed(3));
        const via = eio(seg(t, T.via + (i % 7) * 0.12, T.via + 1.6 + (i % 7) * 0.12)), a = via * 2.4 + i;
        const x = lerp(p.x, 772 + 8 * Math.cos(a), via);
        const y = lerp(lerp(808, p.y, ei(u)) + (u >= 1 ? 1.2 * Math.sin(t * 2.2 + i) : 0), 884, via);
        el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.16 * (u < 1 ? lerp(0.7, 1, u) : 1) * (1 - via)).toFixed(4) + ')');
        el.setAttribute('opacity', i === presa ? (t < Pp.su + 0.2 ? 1 : 0) : (1 - seg(via, 0.85, 1)).toFixed(3));
      });
      // La paperella pescata: in mano ad Ada, poi salta giù e corre al vagone nuovo.
      const giu = Math.round(this.giu(t) * 40) / 40, [hx, hy] = this.manoAt(giu);
      let px = hx, py = hy, pr = 0, pv = t >= Pp.su + 0.2 ? 1 : 0;
      if (T.salta !== undefined && t >= T.salta) {
        const a = eo(seg(t, T.salta, T.salta + 0.7)), corsa = eio(seg(t, T.salta + 0.7, T.sale - 0.5)), salto = eio(seg(t, T.sale - 0.5, T.sale));
        if (t < T.salta + 0.7) { px = lerp(hx, 636, a); py = lerp(hy, 836, a) - 30 * Math.sin(Math.PI * a); }
        else if (t < T.sale - 0.5) { px = lerp(636, this.sedile[0] + 24, corsa); py = 836 - 3 * Math.abs(Math.sin(t * 12)); pr = 9 * Math.sin(t * 12); }
        else { px = lerp(this.sedile[0] + 24, this.sedile[0], salto); py = lerp(836, this.sedile[1], salto) - 22 * Math.sin(Math.PI * salto); }
        pv = t < T.sale ? 1 : 1 - seg(t, T.sale, T.sale + 0.3);
      }
      this.manoEl.setAttribute('transform', 'translate(' + px.toFixed(2) + ' ' + py.toFixed(2) + ') rotate(' + pr.toFixed(2) + ') scale(0.16)');
      this.manoEl.setAttribute('opacity', pv.toFixed(3));
      const luce = seg(t, Pp.su + 0.3, Pp.preso + 0.4) * (1 - seg(t, (T.salta || Pp.preso + 3) - 0.8, (T.salta || Pp.preso + 3)));
      this.luce.setAttribute('cx', hx.toFixed(1)); this.luce.setAttribute('cy', (hy - 10).toFixed(1));
      this.luce.setAttribute('opacity', (0.6 * luce).toFixed(3));
      return giu;
    },
  };
  const seg = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
  const lerp = (a, b, p) => a + (b - a) * p;
  const eo = x => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);
  const ei = x => Math.pow(Math.max(0, Math.min(1, x)), 3);
  const eio = x => { x = Math.max(0, Math.min(1, x)); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  return P;
};
// ── Episodio 4 ──
// Ada col braccio destro alzato (episodio 4): per prendere al volo la striscia, per salutare. a: quanto dondola (gradi).
window.G.adaSaluta = function (expr, a) {
  const braccio = '<g transform="rotate(' + (a || 0).toFixed(1) + ' 130 156)"><path d="M124 150 Q146 118 152 78 L170 80 Q168 124 140 166 Z" fill="' + AC + '" stroke="' + AI + '" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<circle cx="161" cy="72" r="7" fill="' + AS + '"/></g>';
  return '<g>' + adaBody + slL + braccio + adaTesta(expr) + '</g>';
};
// La striscia lunga (episodio 4): un nastro di carta che corre lungo una linea [[x, y], …], dalla lunghezza a alla b,
// con le parole in fila: parole = [[testo, s], …], ognuna centrata alla lunghezza s della linea (fuori dal nastro non
// si vede). alto: l'altezza del nastro. o.luce(k): quanto brilla la parola k (0..1); o.onda(s): quanto il nastro si
// scosta dalla linea, di traverso, alla lunghezza s (il vento). o.scala(k): quanto è grande la parola k (1 di solito).
window.G.linea = function (punti) {
  const L = [0];
  for (let i = 1; i < punti.length; i++) L.push(L[i - 1] + Math.hypot(punti[i][0] - punti[i - 1][0], punti[i][1] - punti[i - 1][1]));
  const at = s => {
    s = Math.max(0, Math.min(L[L.length - 1], s));
    let i = 1;
    while (i < L.length - 1 && L[i] < s) i++;
    const a = punti[i - 1], b = punti[i], u = (s - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]);
    return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI];
  };
  return { punti, L, lung: L[L.length - 1], at };
};
window.G.nastro = function (linea, a, b, parole, alto, o) {
  o = o || {};
  a = Math.max(0, a); b = Math.min(linea.lung, b);
  if (b - a < 0.5) return '';
  // Il punto alla lunghezza s, scostato di traverso dall'onda.
  const su = s => {
    const p = linea.at(s), dd = o.onda ? o.onda(s) : 0, r = p[2] * Math.PI / 180;
    return [p[0] - Math.sin(r) * dd, p[1] + Math.cos(r) * dd];
  };
  const pts = [], n = Math.max(2, Math.ceil((b - a) / 5));
  for (let i = 0; i <= n; i++) pts.push(su(a + (b - a) * i / n));
  const d = 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
  let out = '<path d="' + d + '" fill="none" stroke="' + C.cremaScura + '" stroke-width="' + (alto + 2.4).toFixed(1) + '" stroke-linejoin="round"/>' +
    '<path d="' + d + '" fill="none" stroke="' + C.crema + '" stroke-width="' + alto.toFixed(1) + '" stroke-linejoin="round"/>';
  parole.forEach(([testo, s], k) => {
    const band = testo.charAt(0) === '⚑', sc = o.scala ? o.scala(k) : 1, w = alto * 0.17 * (band ? 2 : testo.length) * sc;
    if (s - w < a || s + w > b) return;
    const [x, y] = su(s), p0 = su(Math.max(a, s - 3)), p1 = su(Math.min(b, s + 3));
    const ang = Math.atan2(p1[1] - p0[1], p1[0] - p0[0]) * 180 / Math.PI, r = ang > 90 || ang < -90 ? ang - 180 : ang, lu = o.luce ? o.luce(k) : 0;
    out += '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + r.toFixed(1) + ') scale(' + sc.toFixed(3) + ')">' +
      (lu > 0 ? '<ellipse rx="' + (w + alto * 0.5).toFixed(1) + '" ry="' + (alto * 0.62).toFixed(1) + '" fill="' + C.luce + '" opacity="' + (0.75 * lu).toFixed(2) + '" filter="url(#g-glow)"/>' : '') +
      (band ? '<g transform="scale(' + (alto / 44).toFixed(3) + ')">' + segnoBandierina(testo) + '</g>' :
        '<text y="' + (alto * 0.2).toFixed(1) + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="' + (alto * 0.56).toFixed(1) + '" fill="' + C.inchiostro + '">' + testo + '</text>') + '</g>';
  });
  return out;
};
// Il buio della montagna per i treni lunghi (episodio 4): il fondo e i binari di interno() continuano oltre il bordo
// destro, fin dove arriva la camera che segue l'ultimo vagone. el: il gruppo che contiene interno(), già sul palco.
window.G.internoLungo = function (el, corsie) {
  [...el.querySelectorAll('rect')].slice(0, 2).forEach(r => { r.setAttribute('x', '-3000'); r.setAttribute('width', '9000'); });
  const binari = el.querySelector('.g-int-binari');
  if (binari) binari.insertAdjacentHTML('beforeend', (corsie || [INTERNO.ruote]).map(y => '<g class="g-oltre-corsia"><path d="M2120 ' + (y + 6) + ' L4800 ' + (y + 6) + '" stroke="' + C.legnoScuro + '" stroke-width="14" stroke-dasharray="6 22" class="g-traversine"/>' +
    '<path d="M2120 ' + y + ' L4800 ' + y + '" stroke="' + C.acciaio + '" stroke-width="4" opacity=".85"/></g>').join(''));
};
// ── Episodio 5 ──
// Le pieghe della pista: sopra una rotaia (l'elemento <path>), una riga lucida fatta di tanti pezzetti, ognuno spostato
// di un capello di qua o di là, come i gradini di una scala vecchia. Si prepara una volta; d(piega) dà il tracciato,
// con piega da 0 (dritta e liscia) a 1 (la pista di oggi). o: { da, a (tratto del binario), passo, seme }.
window.G.pieghe = function (path, o) {
  o = o || {};
  const L = path.getTotalLength(), passo = o.passo || 10, r = kitRng(o.seme || 5), pezzi = [];
  const da = o.da || 0, a = Math.min(L, o.a === undefined ? L : o.a);
  for (let s = da; s < a - 0.5; s += passo) {
    const p = path.getPointAtLength(s), q = path.getPointAtLength(Math.min(a, s + passo));
    const dx = q.x - p.x, dy = q.y - p.y, n = Math.hypot(dx, dy) || 1;
    pezzi.push({ p, q, nx: -dy / n, ny: dx / n, k: (r() - 0.5) * 2 });
  }
  return {
    d(piega, alto) {
      const h = (alto || 1.3) * piega;
      return pezzi.map(z => { const ox = z.nx * z.k * h, oy = z.ny * z.k * h; return 'M' + (z.p.x + ox).toFixed(2) + ' ' + (z.p.y + oy).toFixed(2) + 'L' + (z.q.x + ox).toFixed(2) + ' ' + (z.q.y + oy).toFixed(2); }).join('');
    },
  };
};
// Le pieghe di tutta la pista che si vede da fuori (m: il mondo di costruisciMondo): la salita, la cima e il ponte sopra
// la vasca, senza i pezzi nascosti dalla banchina e dalla pensilina. d(piega, alto) come G.pieghe.
window.G.pieghePista = function (m) {
  const p = [[m.partenza, 1968, 2128, 3], [m.partenza, 2278, undefined, 13], [m.arrivo, 0, 340, 4]].map(([path, da, a, seme]) => window.G.pieghe(path, { da, a, seme }));
  return { d: (piega, alto) => p.map(x => x.d(piega, alto)).join('') };
};
// Il brivido dei treni di prova: un'onda sottile di luce che corre lungo un binario. el: un <path> con il tratto da
// percorrere (nel verso in cui corre l'onda), L la sua lunghezza, u da 0 (non è ancora partita) a 1 (è arrivata in fondo).
window.G.onda = function (el, L, u, lungo) {
  el.setAttribute('stroke-dasharray', lungo.toFixed(1) + ' ' + (L + lungo + 10).toFixed(1));
  el.setAttribute('stroke-dashoffset', (lungo - u * (L + lungo)).toFixed(1));
};
// Uno scambio nel fascio di binari, dentro la montagna: il pezzo di rotaia da una corsia (yDa) all'altra (yA) e il
// palo col disco, che gira di giro gradi. Si posa con translate(x 0); il disco ha la classe g-disco, la rotaia g-ago.
window.G.scambio = function (yDa, yA, giro) {
  const C = window.G.C;
  return '<path class="g-ago" d="M0 ' + yA + ' C60 ' + yA + ' 80 ' + yDa + ' 160 ' + yDa + '" stroke="' + C.acciaio + '" stroke-width="5" fill="none"/>' +
    '<g transform="translate(150 ' + (Math.max(yDa, yA) + 46) + ')"><rect x="-4" y="-34" width="8" height="40" fill="' + C.acciaioScuro + '"/>' +
    '<g class="g-disco" transform="rotate(' + (giro || 0) + ' 0 -40)"><circle cy="-40" r="14" fill="' + C.rosso + '" stroke="' + C.crema + '" stroke-width="3"/><rect x="-12" y="-43" width="24" height="6" fill="' + C.crema + '"/></g></g>';
};
// La lanterna sopra la vasca, con intorno un alone largo e morbido che illumina l'acqua. Scatola 120×60, come G.lanterna.
window.G.lanternaAccesa = function (testo, col, luce) {
  luce = luce === undefined ? 1 : luce;
  // L'alone: tanti ovali uno dentro l'altro, sempre più chiari verso il centro (senza filtri, morbido anche se piccolo).
  let alone = '';
  for (let k = 0; k < 7; k++) { const f = 1 - k / 7; alone += '<ellipse cx="60" cy="34" rx="' + (70 + 130 * f).toFixed(0) + '" ry="' + (44 + 80 * f).toFixed(0) + '" fill="' + mix(col, '#FFFFFF', 0.08 * k) + '" opacity="' + (0.07 * luce).toFixed(3) + '"/>'; }
  return alone + biglietto(testo, { fondo: mix(C.crema, col, 0.35 + 0.3 * luce) }) +
    '<path d="M4 6 L116 6" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="' + (0.5 * luce).toFixed(2) + '"/>';
};
// Dentro la montagna, il treno di G.interno diventa un treno di prova: vagoni grigi, senza vernice e senza lucine.
window.G.ingrigisci = function (radice) {
  radice.querySelectorAll('.g-int-treno .g-vag').forEach((v, i) => {
    const pass = v.querySelector('.g-pass');
    v.innerHTML = vagone({ primo: i === 0, sbarra: 1, grigio: true }, pass ? pass.outerHTML : '');
  });
};
// I treni di prova che dormono sul binario morto, dietro la stazione: tre treni grigi vuoti, col fanale spento e la
// polvere. DORMONO: dove sta il primo vagone di ognuno, lungo MONDO.morto. G.dormono(pathMorto, els) li posa.
window.G.DORMONO = [2308, 2588, 2868];
window.G.treniCheDormono = function (fanale) {
  return window.G.DORMONO.map((s, k) => '<g class="g-dorme" data-k="' + k + '">' + treno([{}, {}, {}], { grigio: true, fanale: fanale || 0, sbarra: 1 }) + '</g>').join('');
};
window.G.dormono = function (path, radice, polvere) {
  const treni = [...radice.querySelectorAll('.g-dorme')].map(g => [...g.querySelectorAll('.g-vag')]);
  treni.forEach((v, k) => {
    posaTreno(v, path, window.G.DORMONO[k], MONDO.scala, MONDO.passoBanchina);
    if (polvere) v.forEach((el, i) => {
      const r = kitRng(31 + k * 7 + i);
      let p = '';
      for (let j = 0; j < 14; j++) p += '<circle cx="' + (20 + r() * 210).toFixed(0) + '" cy="' + (60 + r() * 70).toFixed(0) + '" r="' + (2 + r() * 5).toFixed(1) + '" fill="#B9B2A2" opacity="' + (0.18 + r() * 0.25).toFixed(2) + '"/>';
      p += '<path d="M190 -20 Q206 0 224 -16 M196 -6 L218 -22" stroke="#C9C4B8" stroke-width="1.6" fill="none" opacity=".45"/>';
      el.querySelector('.g-vag-in').insertAdjacentHTML('beforeend', '<g class="g-polvere">' + p + '</g>');
    });
  });
  return treni;
};
// La città di notte, dall'alto: tetti, e le finestre delle case (classe g-finestrella, data-k), accese.
window.G.cittaDiNotte = function (seme) {
  const C = window.G.C, r = kitRng(seme || 14);
  let stelle = '';
  const finestre = ['', ''];
  for (let i = 0; i < 70; i++) stelle += '<circle cx="' + (r() * 2100 - 90).toFixed(0) + '" cy="' + (r() * 560).toFixed(0) + '" r="' + (0.8 + r() * 1.8).toFixed(1) + '" fill="#FFF4DA" opacity="' + (0.35 + r() * 0.6).toFixed(2) + '"/>';
  const dietro = '<path d="M-100 1080 L-100 700 L80 700 L80 660 L200 620 L320 660 L320 720 L470 720 L470 680 L560 640 L650 680 L650 740 L820 740 L820 690 L940 690 L940 650 L1020 650 L1020 720 L1200 720 L1260 680 L1320 720 L1480 720 L1480 700 L1640 700 L1640 660 L1760 660 L1760 710 L2100 710 L2100 1080 Z" fill="#171A44"/>';
  const davanti = '<path d="M-100 1080 L-100 800 L60 800 L160 730 L260 800 L360 800 L360 740 L480 740 L480 820 L700 820 L790 760 L880 820 L1080 820 L1080 790 L1180 790 L1180 770 L1320 770 L1320 830 L1450 770 L1540 830 L1700 830 L1700 800 L2100 800 L2100 1080 Z" fill="#0F1233"/>';
  // Le prime 30 finestre stanno sui tetti di dietro, le altre su quelli davanti.
  for (let k = 0; k < 90; k++) {
    const x = -40 + r() * 2000, y = k < 30 ? 730 + r() * 60 : 840 + r() * 220;
    finestre[k < 30 ? 0 : 1] += '<rect class="g-finestrella" data-k="' + k + '" x="' + x.toFixed(0) + '" y="' + y.toFixed(0) + '" width="16" height="20" rx="2" fill="' + C.luce + '" opacity="' + (0.55 + r() * 0.35).toFixed(2) + '"/>';
  }
  return '<rect x="-200" y="-200" width="2400" height="1500" fill="' + C.notte1 + '"/><rect x="-200" y="0" width="2400" height="900" fill="url(#g-cielo)"/>' + stelle +
    dietro + finestre[0] + davanti + finestre[1];
};
// ── Episodio 6 ──
// ── Episodio 7 ──
// La pagina della prima sera, sul quaderno di Ada (scene «quaderno», «vasca», «fine»): a sinistra il treno di «Al mare
// Emma» in stazione, con i colori dei biglietti; a destra la vasca di quella sera, con le sue quaranta paperelle (colori e
// quantità dal modellino, G.MOD.mare.vasca) e, in mezzo, piccola piccola, la paperella scura. Niente scritte.
// Pagina intera 1920×1080, come i quaderni degli episodi 1 e 2: { copertina, sinistra, destra, costa } (le due metà si
// possono sfogliare). Accanto alla paperella scura resta il posto per la seconda, che Ada disegna alla fine: il gruppo
// .g7-seconda (nascosta), con i tratti a matita .g7-tratto (si disegnano) e il colore .g7-colore (compare); posto = la pancia.
window.G.primaSera = function () {
  const G = window.G, C = G.C, D = G.MOD.mare, P = D.passeggeri, r = kitRng(71), matita = '#3A3570';
  const altre = [];
  let scura = null;
  D.vasca.forEach(([w, n, col]) => { for (let k = 0; k < n; k++) { if (w === 'Fine' && !scura) scura = col; else altre.push(col); } });
  for (let i = altre.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [altre[i], altre[j]] = [altre[j], altre[i]]; }
  // Quattro file di undici posti; la scura in mezzo, e accanto a lei il posto vuoto per la seconda.
  const xy = (riga, c) => [1100 + c * 52 + (riga % 2) * 20 - 10 + (r() - 0.5) * 8, 676 + riga * 46 + (r() - 0.5) * 6];
  const libero = { '1,6': 1, '2,5': 1, '2,6': 1, '3,10': 1 };
  let papere = '', k = 0;
  for (let riga = 0; riga < 4; riga++) for (let c = 0; c < 11; c++) {
    const [x, y] = xy(riga, c);
    if (riga === 1 && c === 5) { if (scura) papere += '<g transform="translate(' + (x - 14).toFixed(1) + ' ' + (y - 24).toFixed(1) + ') scale(.29)">' + G.paperella(scura) + '</g>'; continue; }
    if (libero[riga + ',' + c] || k >= altre.length) continue;
    papere += '<g transform="translate(' + (x - 21).toFixed(1) + ' ' + (y - 35).toFixed(1) + ') scale(.42)">' + G.paperella(altre[k++]) + '</g>';
  }
  const posto = [1408, 772], s2 = 0.6;
  const corpo = 'M26 58 C26 46 40 42 58 44 C74 46 84 40 92 30 C94 46 94 62 86 72 C78 82 60 86 44 84 C32 82 26 70 26 58 Z';
  const seconda = '<g class="g7-seconda" opacity="0" transform="translate(' + (posto[0] - 30) + ' ' + (posto[1] - 84 * s2) + ') scale(' + s2 + ')">' +
    '<g class="g7-colore" opacity="0">' + G.paperella(scura || '#46465a') + '</g>' +
    '<g stroke="' + matita + '" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none">' +
    '<path class="g7-tratto" d="' + corpo + '"/><path class="g7-tratto" d="M19 34 A17 17 0 1 1 53 34 A17 17 0 1 1 19 34"/>' +
    '<path class="g7-tratto" d="M21 33 C12 32 7 37 9 41 C13 45 20 43 24 40"/></g></g>';
  const omino = (x, y, col) => '<path d="M' + (x - 22) + ' ' + y + ' L' + (x + 22) + ' ' + y + ' L' + (x + 14) + ' ' + (y - 30) + ' L' + (x - 14) + ' ' + (y - 30) + ' Z" fill="' + col + '"/><circle cx="' + x + '" cy="' + (y - 46) + '" r="19" fill="#F5C84C"/><circle cx="' + x + '" cy="' + (y - 42) + '" r="13" fill="#FFE9D6"/>';
  // A sinistra: la stazione e il treno appena salito, con Al, Mare ed Emma dei colori dei biglietti; dietro, la montagna.
  const sinistra = '<rect x="176" y="86" width="784" height="828" rx="12" fill="' + C.crema + '"/>' +
    '<g stroke="' + matita + '" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">' +
    '<path d="M736 600 L812 380 Q852 300 892 380 L936 500" opacity=".55"/><path d="M800 560 L800 520 Q822 494 850 514 L850 560" opacity=".55"/>' +
    '<path d="M214 470 L734 470 L712 430 L236 430 Z"/><path d="M236 470 L236 690 M712 470 L712 690"/>' +
    '<path d="M210 760 L930 760"/>' +
    [270, 420, 570].map(x => '<path d="M' + x + ' 690 L' + (x + 130) + ' 690 L' + (x + 120) + ' 744 L' + (x + 10) + ' 744 Z"/><circle cx="' + (x + 32) + '" cy="752" r="11"/><circle cx="' + (x + 98) + '" cy="752" r="11"/>').join('') +
    '</g>' +
    '<ellipse cx="335" cy="664" rx="34" ry="26" fill="' + P.Al.biglietto + '"/>' +
    '<path d="M450 690 C462 652 488 636 520 640 C534 644 532 664 518 664 C508 664 506 652 514 650" fill="none" stroke="' + P.mare.biglietto + '" stroke-width="14" stroke-linecap="round"/>' +
    omino(635, 690, P.Emma.biglietto);
  // A destra: la vasca di quella sera, piena di paperelle.
  const destra = '<rect x="960" y="86" width="784" height="828" rx="12" fill="' + C.crema + '"/>' +
    '<path d="M1046 650 L1704 650 L1678 836 Q1375 874 1072 836 Z" fill="#BFE3F0" opacity=".7"/>' +
    '<g stroke="' + matita + '" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">' +
    '<path d="M1030 640 L1720 640 L1690 842 Q1375 884 1060 842 Z"/>' +
    '<path d="M1000 420 L1760 420"/><path d="M1300 360 L1450 360 L1438 412 L1312 412 Z"/>' +
    '<path d="M1340 450 l-8 46 M1375 452 l0 50 M1410 450 l8 46" stroke-width="5" stroke-dasharray="10 12" opacity=".6"/>' +
    '</g>' + omino(1375, 372, P.Emma.tratti[2]) + papere + seconda;
  return {
    copertina: '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/><rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/>',
    sinistra, destra, posto,
    costa: '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>',
  };
};
// Un'uscita sopra la vasca (scene «giri», «punto», «vasca», «pesca»). Il treno esce dalla montagna; sotto l'ultimo vagone
// cadono le paperelle (di luce, e toccano l'acqua vere); il treno si ferma in stazione, i vagoni si accostano lungo la
// banchina (MONDO.passoBanchina) e i vestiti tornano del colore dei biglietti. Ada pesca a occhi chiusi: la paperella
// salta, corre e sale in un vagone nuovo in fondo al treno (con t.sale), oppure resta nella sua mano. Le altre scivolano
// via dallo scarico (da t.via). Con t.riparte il treno riparte, sale e sparisce nella montagna.
// o: { id (unico nella scena), chi: [{ tipo, biglietto, uscita }], vasca (dal modellino), seme, parola (la pescata),
//      nuovo (il biglietto del passeggero nuovo), angolo (la paperella Fine in un angolo della vasca), ultimaFine (le Fine
//      scivolano via per ultime), fermo (dove si ferma il primo vagone: MONDO.fermo, o G.fermoTreno per i treni lunghi),
//      t: { esce, vel, pesca: { giu, su, preso }, via, salta, sale, vagone, tiene, riparte, velParte } }.
// Se la velocità non finisce a zero, il treno frena dall'ultima chiave e si ferma proprio in stazione (ferma: quando).
// .treno, .mano, .papere: gli SVG da mettere nel mondo (.papere nella vasca, .g-vasca). Dopo costruisciMondo, monta(m);
// render(t) muove tutto e restituisce { giu, mano: [x, y] } (da t.tiene la paperella in mano la muove la scena).
window.G.giro7 = function (o) {
  const G = window.G, M = G.MONDO, id = o.id, T = o.t, n = o.chi.length, ADA = [672, 896];
  // Dove si ferma il primo vagone (dalla seconda stagione i treni lunghi si fermano più avanti: G.fermoTreno).
  const FERMO = o.fermo === undefined ? M.fermo : o.fermo;
  const c01 = x => Math.max(0, Math.min(1, x)), seg = (t, a, b) => c01((t - a) / (b - a)), lerp = (a, b, p) => a + (b - a) * p;
  const eo = x => 1 - Math.pow(1 - c01(x), 3), ei = x => Math.pow(c01(x), 3);
  const eio = x => { x = c01(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  const lista = G.papereVasca(o.vasca, o.seme);
  // La paperella Fine in un angolo, davanti a destra, da sola: le altre le lasciano un po' di posto.
  if (o.angolo) {
    const f = lista.findIndex(p => p.parola === 'Fine');
    if (f >= 0) {
      lista.forEach((p, i) => { if (i !== f && p.x > 826) p.x = 826 - (p.x - 826) * 1.5; });
      lista[f].x = 848; lista[f].y = 883;
    }
  }
  let presa = -1, bd = 1e9;
  lista.forEach((p, i) => { const d = Math.abs(p.x - 700) + Math.abs(p.y - 880); if (p.parola === o.parola && d < bd) { bd = d; presa = i; } });
  const colPresa = presa >= 0 ? lista[presa].col : G.C.crema;
  const ordine = lista.map((p, i) => i).sort((a, b) => lista[a].y - lista[b].y);
  let scintille = '';
  for (let k = 0; k < 10; k++) scintille += '<circle r="2.4" fill="' + G.C.luce + '"/>';
  const passeggeri = o.chi.map(c => ({ tipo: c.tipo, col: c.uscita, o: c.o })).concat(o.nuovo ? [{ tipo: 'paperella', col: o.nuovo }] : []);
  const g = {
    lista, presa, colPresa,
    treno: '<g class="g7-treno-' + id + '">' + G.treno(passeggeri, { sbarra: 1 }) + '</g><g class="g7-scint-' + id + '" opacity="0">' + scintille + '</g>',
    mano: '<ellipse class="g7-luce-' + id + '" rx="22" ry="18" fill="' + colPresa + '" opacity="0" filter="url(#g-soft)"/>' +
      '<g class="g7-mano-' + id + '" opacity="0"><g transform="translate(-50 -84)"><g class="g7-pv">' + G.paperella(colPresa) + '</g>' +
      (o.nuovo ? '<g class="g7-pb" opacity="0">' + G.paperella(o.nuovo) + '</g>' : '') + '</g></g>',
    papere: ordine.map(i => '<g class="g7-pap-' + id + '" data-i="' + i + '" opacity="0"><g transform="translate(-50 -84)"><g class="g7-vera">' + G.paperella(lista[i].col) + '</g><g class="g7-dilu">' + G.paperellaDiLuce(lista[i].col) + '</g></g></g>').join(''),
    monta(m) {
      this.m = m;
      this.vag = m.qa('.g7-treno-' + id + ' .g-vag');
      this.passNuovo = o.nuovo ? this.vag[n].querySelector('.g-pass') : null;
      this.manoEl = m.q('.g7-mano-' + id); this.luce = m.q('.g7-luce-' + id); this.scint = m.q('.g7-scint-' + id);
      this.pv = m.q('.g7-mano-' + id + ' .g7-pv'); this.pb = m.q('.g7-mano-' + id + ' .g7-pb');
      this.pap = m.qa('.g7-pap-' + id).map(el => ({ el, i: +el.dataset.i, vera: el.querySelector('.g7-vera'), luce: el.querySelector('.g7-dilu') }));
      // Il binario d'arrivo continua lungo tutta la banchina, per i treni che si fermano oltre la fine di MONDO.arrivo.
      m.cam.insertAdjacentHTML('beforeend', '<path class="g7-arrivo-' + id + '" d="' + M.arrivo.replace(/L 40 852$/, 'L -1400 852') + '" fill="none"/>');
      const path = this.path = m.q('.g7-arrivo-' + id);
      this.sF = path.getTotalLength() - (FERMO + 1400);
      this.Lp = m.partenza.getTotalLength();
      // Se l'ultima chiave della velocità non è ferma, il treno frena da lì e si ferma proprio in stazione.
      const [tl, vl] = T.vel[T.vel.length - 1];
      this.vel = vl > 0 ? T.vel.concat([[tl + 2 * (this.sF - G.percorso(tl, 0, T.vel)) / vl, 0]]) : T.vel;
      this.ferma = this.vel[this.vel.length - 1][0];
      this.cade = lista.map(p => {
        for (let t = T.esce; t < T.esce + 40; t += 0.02) {
          const s = this.sAt(t), se = s - (n - 1) * this.passoA(s);
          if (se > 0 && path.getPointAtLength(se).x <= p.x + 6) return t;
        }
        return T.esce + 8;
      });
      this.sedile = [FERMO + n * M.passoBanchina + 6, 816];
    },
    sAt(t) { return Math.min(this.sF, G.percorso(t, 0, this.vel)); },
    // Mentre arriva in stazione il treno si accosta: i vagoni passano da MONDO.passo a MONDO.passoBanchina; ripartendo, il contrario.
    passoA(s) { return lerp(M.passo, M.passoBanchina, c01((s - (this.sF - 220)) / 220)); },
    passoP(s) { return lerp(M.passoBanchina, M.passo, c01((s - (640 - FERMO)) / 260)); },
    manoAt(giu) {
      const s = 0.28, mx = 150 + 26 * giu - 6, my = 230 + 50 * giu + 6;
      return [ADA[0] - 100 * s + mx * s, ADA[1] - 304 * s + my * s];
    },
    giu(t) {
      const Pp = T.pesca;
      if (!Pp || t < Pp.giu - 0.6) return 0;
      if (t < Pp.giu + 0.4) return eio(seg(t, Pp.giu - 0.6, Pp.giu + 0.4));
      if (t < Pp.su) return 0.9 + 0.1 * Math.sin((t - Pp.giu) * 9);
      return 1 - eio(seg(t, Pp.su, Pp.preso + 0.4));
    },
    render(t) {
      const m = this.m, s = t < T.esce ? -500 : this.sAt(t);
      const parte = T.riparte !== undefined && t >= T.riparte;
      const nuovo = T.vagone !== undefined ? eo(seg(t, T.vagone, T.vagone + 0.6)) : 0;
      if (!parte) {
        const ps = this.passoA(s);
        G.posaTreno(this.vag, this.path, s, undefined, ps);
        this.vag.forEach((el, i) => el.setAttribute('opacity', (i < n ? c01((s - i * ps - 4) / 26) : nuovo).toFixed(3)));
        // Fermo in stazione, anche il settimo vagone, accanto alla sbarra di dietro, sta in piano, sulle assi (come quando riparte).
        const ferma = seg(s, this.sF - 150, this.sF), L = this.path.getTotalLength();
        if (ferma > 0) this.vag.forEach((el, i) => {
          const si = Math.max(0.5, Math.min(L - 0.5, s - i * ps)), p = this.path.getPointAtLength(si);
          if (p.x > 650 || p.x < 560) return;
          const q = this.path.getPointAtLength(Math.min(L, si + 1)), q0 = this.path.getPointAtLength(Math.max(0, si - 1));
          const a = (Math.atan2(q.y - q0.y, q.x - q0.x) * 180 / Math.PI - 180) * (1 - ferma);
          el.setAttribute('transform', 'translate(' + p.x.toFixed(2) + ' ' + lerp(p.y, 852, ferma).toFixed(2) + ') rotate(' + a.toFixed(2) + ') scale(' + M.scala + ') translate(-120 -150)');
        });
      } else {
        const sp = G.percorso(t, 640 - FERMO, T.velParte), pp = this.passoP(sp);
        G.posaTreno(this.vag, m.partenza, sp, undefined, pp);
        this.vag.forEach((el, i) => el.setAttribute('opacity', (c01((this.Lp - 4 - (sp - i * pp)) / 26) * (i < n ? 1 : nuovo)).toFixed(3)));
      }
      // In stazione i vestiti tornano del colore dei biglietti.
      const torna = parte ? 1 : Math.round(seg(s, this.sF - 150, this.sF) * 12) / 12;
      o.chi.forEach((c, i) => G.cambiaPasseggero(this.vag[i], c.tipo, G.mix(c.uscita, c.biglietto, torna), c.o));
      // Le paperelle cadono dove passa l'ultimo vagone: di luce, e toccano l'acqua vere. Poi scivolano via dallo scarico.
      this.pap.forEach(({ el, i, vera, luce }) => {
        const t0 = this.cade[i], p = lista[i], u = seg(t, t0, t0 + 0.55), vv = seg(u, 0.55, 1);
        vera.setAttribute('opacity', vv.toFixed(3)); luce.setAttribute('opacity', (1 - vv).toFixed(3));
        const tv = T.via === undefined ? 1e9 : T.via + (i % 7) * 0.12 + (o.ultimaFine && p.parola === 'Fine' ? 1.0 : 0);
        const via = eio(seg(t, tv, tv + 1.7)), a = via * 2.4 + i;
        const x = lerp(p.x, 772 + 8 * Math.cos(a), via);
        const y = lerp(lerp(808, p.y, ei(u)) + (u >= 1 ? 1.2 * Math.sin(t * 2.2 + i) : 0), 884, via);
        el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.16 * (u < 1 ? lerp(0.7, 1, u) : 1) * (1 - via)).toFixed(4) + ')');
        const Pp = T.pesca;
        el.setAttribute('opacity', t < t0 ? 0 : i === presa && Pp ? (t < Pp.su + 0.2 ? 1 : 0) : (1 - seg(via, 0.85, 1)).toFixed(3));
      });
      // La paperella pescata: nella mano di Ada; poi salta giù, corre lungo la banchina e sale sul vagone nuovo.
      const giu = this.giu(t), giuQ = Math.round(giu * 40) / 40, [hx, hy] = this.manoAt(giuQ);
      const Pp = T.pesca;
      if (Pp && (T.tiene === undefined || t < T.tiene)) {
        let px = hx, py = hy, pr = 0, pv = t >= Pp.su + 0.2 ? 1 : 0, cb = 0;
        if (T.salta !== undefined && t >= T.salta) {
          const S = T.sale, a = eo(seg(t, T.salta, T.salta + 0.6)), corsa = eio(seg(t, T.salta + 0.6, S - 0.45)), salto = eio(seg(t, S - 0.45, S));
          const x0 = 636;
          if (t < T.salta + 0.6) { px = lerp(hx, x0, a); py = lerp(hy, 836, a) - 30 * Math.sin(Math.PI * a); }
          else if (t < S - 0.45) { px = lerp(x0, this.sedile[0] + 24, corsa); py = 836 - 3 * Math.abs(Math.sin(t * 12)); pr = 9 * Math.sin(t * 12); }
          else { px = lerp(this.sedile[0] + 24, this.sedile[0], salto); py = lerp(836, this.sedile[1], salto) - 22 * Math.sin(Math.PI * salto); cb = salto; }
          pv = t < S ? 1 : 1 - seg(t, S, S + 0.3);
        }
        this.manoEl.setAttribute('transform', 'translate(' + px.toFixed(2) + ' ' + py.toFixed(2) + ') rotate(' + pr.toFixed(2) + ') scale(0.16)');
        this.manoEl.setAttribute('opacity', pv.toFixed(3));
        if (this.pb) { this.pb.setAttribute('opacity', cb.toFixed(3)); this.pv.setAttribute('opacity', (1 - cb).toFixed(3)); }
        const fine = T.salta !== undefined ? T.salta : T.via !== undefined ? T.via + 1.2 : Pp.preso + 3;
        const luce = seg(t, Pp.su + 0.3, Pp.preso + 0.4) * (1 - seg(t, fine - 0.8, fine));
        this.luce.setAttribute('cx', hx.toFixed(1)); this.luce.setAttribute('cy', (hy - 10).toFixed(1));
        this.luce.setAttribute('opacity', (0.6 * luce).toFixed(3));
      }
      if (this.passNuovo) this.passNuovo.setAttribute('opacity', seg(t, T.sale - 0.05, T.sale + 0.3).toFixed(3));
      if (T.vagone !== undefined) {
        const sc = seg(t, T.vagone, T.vagone + 1.1);
        this.scint.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
        [...this.scint.children].forEach((c, k) => { const a = k * Math.PI / 5, d = 10 + 34 * eo(sc); c.setAttribute('cx', (this.sedile[0] + d * Math.cos(a)).toFixed(2)); c.setAttribute('cy', (838 + d * 0.6 * Math.sin(a)).toFixed(2)); });
      }
      return { giu: giuQ, mano: [hx, hy] };
    },
  };
  return g;
};
// ── Episodio 8 ──
// Ada con la testa girata di ang gradi (fa no, alza gli occhi): stesso disegno di G.ada, la testa ruota sul collo.
// Con expr 'accigliata' Ada aggrotta la fronte: sopracciglia giù e bocca all'ingiù.
window.G.adaTesta8 = function (expr) {
  const h = window.G.adaTesta(expr);
  if (expr !== 'accigliata') return h;
  return h.replace('M92 106 Q100 112 108 106', 'M92 109 Q100 104 108 109') +
    '<path d="M74 67 Q86 64 97 72 M126 67 Q114 64 103 72" stroke="#3A2418" stroke-width="3.6" stroke-linecap="round" fill="none"/>';
};
window.G.adaGira = function (pose, expr, o, ang) {
  const G = window.G, corpo = G.ada(pose, expr, o).replace(G.adaTesta(expr), '');
  return '<g>' + corpo + '<g transform="rotate(' + (ang || 0).toFixed(1) + ' 100 124)">' + G.adaTesta8(expr) + '</g></g>';
};
// Ada seduta (su una traversina, sul bordo della vasca): il camice si piega, le gambe pendono davanti.
// Stessa scatola di G.ada: con G.posaAda(x, y) il sedile sta nel punto (x, y). o.testa: la testa girata (gradi).
window.G.adaSeduta = function (pose, expr, o) {
  o = o || {};
  const G = window.G, testa = G.adaTesta8(expr), corpo = G.ada(pose, expr, o).replace(G.adaTesta(expr), '');
  const gambe = '<path d="M88 292 Q84 316 86 338 M112 292 Q116 316 114 338" stroke="#2E2A26" stroke-width="11" stroke-linecap="round" fill="none"/>' +
    '<ellipse cx="82" cy="342" rx="12" ry="6.5" fill="#6E4630"/><ellipse cx="118" cy="342" rx="12" ry="6.5" fill="#6E4630"/>';
  return '<g>' + gambe + '<g transform="translate(0 58) translate(0 128) scale(1 .66) translate(0 -128)">' + corpo + '</g>' +
    '<g transform="translate(0 58) rotate(' + (o.testa || 0).toFixed(1) + ' 100 124)">' + testa + '</g></g>';
};
// I treni di prova che dormono sul binario morto (oggi): tre treni grigi di tre vagoni, col fanale spento, e accanto
// all'ultimo la pila di traversine dove si siede Ada (il sedile è in (-1463, 835)). Coordinate del mondo.
window.G.treniDormono = function () {
  const G = window.G, M = G.MONDO, C = G.C;
  let grigi = '';
  [-2188, -1948, -1708].forEach(x0 => { for (let i = 2; i >= 0; i--) grigi += '<g transform="translate(' + (x0 + i * M.passo) + ' 858) scale(' + M.scala + ') translate(-120 -150)">' + G.vagone({ primo: i === 0, sbarra: 1, grigio: true, fanale: 0 }, '') + '</g>'; });
  return grigi + '<rect x="-1492" y="846" width="58" height="12" rx="2" fill="' + C.legnoScuro + '"/><rect x="-1488" y="835" width="50" height="11" rx="2" fill="' + C.legno + '"/>' +
    '<path d="M-1484 840 L-1446 840 M-1488 852 L-1440 852" stroke="' + C.legnoScuro + '" stroke-width="1.5" opacity=".6"/>';
};
// La striscia arrotolata, come arriva dal cielo: un rotolino di carta. Centrata in (0, 0), lunga 120.
window.G.rotolo = function () {
  const C = window.G.C;
  return '<g><rect x="-60" y="-14" width="120" height="28" rx="14" fill="' + C.crema + '" stroke="' + C.cremaScura + '" stroke-width="3"/>' +
    '<ellipse cx="60" cy="0" rx="7" ry="14" fill="' + C.cremaScura + '"/><ellipse cx="60" cy="0" rx="3" ry="7" fill="#B9A887"/>' +
    '<path d="M-48 -6 L40 -6" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity=".5"/></g>';
};
// Il quaderno di Ada aperto, a tutto schermo: la copertina verde, due pagine color crema con la piega in mezzo.
// sinistra, destra: i disegni delle due pagine, in coordinate dello schermo (pagina sinistra x 176–960, destra 960–1744).
window.G.quadernoAperto = function (sinistra, destra) {
  const C = window.G.C;
  return '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
    '<rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
    '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' + (sinistra || '') + (destra || '');
};
// Emma disegnata a matita sul quaderno: il vestito del suo colore, i capelli, la faccina. I piedi in (x, y), scala s.
window.G.schizzoEmma = function (x, y, col, s) {
  s = s || 1;
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-40 0 L40 0 L24 -60 L-24 -60 Z" fill="' + col + '" stroke="#3A3570" stroke-width="5" stroke-linejoin="round"/>' +
    '<path d="M-14 0 L-14 22 M14 0 L14 22" stroke="#3A3570" stroke-width="6" stroke-linecap="round"/>' +
    '<circle cx="0" cy="-90" r="36" fill="#F5C84C" stroke="#3A3570" stroke-width="4"/><circle cx="0" cy="-84" r="25" fill="#FFE9D6"/>' +
    '<circle cx="-9" cy="-86" r="3.2" fill="#3A3570"/><circle cx="9" cy="-86" r="3.2" fill="#3A3570"/><path d="M-8 -74 Q0 -68 8 -74" stroke="#3A3570" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<path d="M-22 -112 l3 -7 l3 7 l7 1 l-6 4 l2 7 l-6 -4 l-6 4 l2 -7 l-6 -4 Z" fill="#E0475B"/></g>';
};
// ── Episodio 9 ──
// Il parco più grande del mondo: oltre la collina, dietro la ruota panoramica (da lontano se ne vedono le luci: laggiu).
// Ha tutto quello che ha il parco di Ada, ma enorme: una stazione lunga come una strada, uno Spezzaparole alto come un
// palazzo, treni senza guidatore che girano senza fermarsi mai (alcuni lunghissimi), una montagna sola fatta di tante
// cime in fila fino alle nuvole (una per tratto, come le finestre di G.MOD.grande), una vasca grande come un lago con la
// sua bancarella, e dietro la stazione file e file di treni di prova grigi su un binario morto. Intorno, una città di luci.
// Il parco è disegnato nelle misure di quello di Ada (Ada è alta 85, un vagone è lungo 80), con il suolo a y = 1000.
// G.paesaggio mette insieme il parco di Ada, la collina col sentiero e, oltre la collina, il parco immenso, a scala
// PARCO.scala; G.costruisciPaesaggio lo monta in una scena e G.animaPaesaggio lo fa vivere (strisce, forbice, treni).
(function () {
  const G = window.G, C = G.C, mix = G.mix;
  const PARCO = {
    // Il parco nel paesaggio: il punto (x, y) del parco sta in (origine + x · scala, origine + y · scala).
    scala: 0.5, origine: [4400, 520],
    suolo: 1000, orizzonte: 440,
    // La pedana della stazione; lo Spezzaparole (x, y dei piedi, scala), con la fessura e la bocca.
    stazione: [-520, 2900], spezza: [-120, 1000, 2], fessura: [-140, 520], boccaSpezza: [-140, 826],
    // I binari: l'andata (davanti, verso la prima cima) e il ritorno (dal lago alla stazione, sopra il ponte).
    // I treni girano dietro lo Spezzaparole (giro), entrano nella bocca della prima cima ed escono da quella dell'ultima.
    andata: 1000, ritorno: 952, passo: 86, vagone: 1 / 3, giro: -200, bocca: 3150, uscita: 7300,
    // Il lago (cx, cy, rx, ry), Ada alla bancarella, lo scarico, dove si ferma Emma dopo il lago, la ringhiera.
    lago: [6300, 1060, 900, 90], ada: [5430, 1092], scarico: [5522, 1096], fermata: 5230, ringhiera: 1046,
    // Il binario morto dei treni di prova, dietro la stazione: da x a x.
    morto: [-1900, -600],
    // Nel paesaggio: il cancello del parco di Ada, il sentiero sulla collina, la cima.
    cancello: [1990, 868], cima: [2550, 558],
    sentiero: [[1990, 870], [2190, 824], [2100, 770], [2340, 702], [2262, 650], [2480, 594], [2550, 560]],
  };
  // Dal parco al paesaggio.
  PARCO.inP = (x, y) => [PARCO.origine[0] + x * PARCO.scala, PARCO.origine[1] + y * PARCO.scala];
  // Una chiave di camera scritta nelle misure del parco: (x, y) del parco al centro, ingrandimento z rispetto al parco.
  PARCO.chiave = (t, x, y, z, da) => { const [px, py] = PARCO.inP(x, y), k = { t, cx: px, cy: py, z: z / PARCO.scala }; if (da !== undefined) k.da = da; return k; };

  // ── Le cime ──────────────────────────────────────────────────────────────────────────────────────
  // Ventiquattro cime, una per tratto, in fila come un ferro di cavallo: la prima e l'ultima vicine e grandissime, quelle
  // di mezzo lontane, tra le nuvole. Ogni cima è la montagna del parco di Ada, ingrandita.
  const CIME = [];
  for (let k = 0, rc = G.rng(77); k < 24; k++) {
    const d = Math.sin(Math.PI * k / 23), s = (1 - 0.66 * d) * (0.92 + 0.16 * rc()), xl = 4000 + k * 3800 / 23;
    CIME.push({ k, d, s, x: 5900 + (xl - 5900) * (1 - 0.22 * d) + (rc() - 0.5) * 120 * d, base: 1000 - 250 * d, alta: 2972 * s });
  }
  PARCO.cime = CIME;
  const MONTE = 'M872 900 L896 760 Q936 640 1006 560 L1076 468 Q1146 330 1240 282 Q1300 254 1352 300 L1446 404 Q1524 486 1566 604 L1626 760 L1656 900 Z';
  function picco(c) {
    const tr = 'translate(' + c.x.toFixed(1) + ' ' + c.base.toFixed(1) + ') scale(' + (2.8 * c.s).toFixed(3) + ' ' + (4.6 * c.s).toFixed(3) + ') translate(-1264 -900)';
    return '<g transform="' + tr + '">' +
      '<path d="' + MONTE + '" fill="url(#g-montagna)" stroke="#4E447F" stroke-width="2.5" stroke-opacity="' + (1 - 0.8 * c.d).toFixed(2) + '" vector-effect="non-scaling-stroke"/>' +
      '<path d="M1240 282 Q1300 254 1352 300 L1446 404 Q1524 486 1566 604 L1626 760 L1656 900 L1420 900 Q1430 700 1360 560 Q1300 420 1240 282 Z" fill="' + C.mont1 + '" opacity=".6"/>' +
      '<path d="M1006 560 L1076 468 Q1146 330 1240 282 Q1180 400 1120 520 Q1080 600 1010 660 Z" fill="' + C.mont3 + '" opacity=".55"/>' +
      '<path d="M1190 330 L1214 302 L1240 282 L1226 320 Z M1100 620 L1140 600 L1150 640 Z M1300 700 L1350 680 L1356 730 Z M1480 640 L1510 630 L1516 668 Z" fill="' + C.mont3 + '" opacity=".7"/>' +
      (c.d > 0.05 ? '<path d="' + MONTE + '" fill="#4A3F7E" opacity="' + (0.7 * c.d).toFixed(2) + '"/>' : '') + '</g>';
  }
  // Una nuvola a fumetto, larga w.
  function nuvola(x, y, w, op) {
    const r = w / 5, c = (cx, cy, rr, f) => '<circle cx="' + cx.toFixed(0) + '" cy="' + cy.toFixed(0) + '" r="' + rr.toFixed(0) + '" fill="' + f + '"/>';
    return '<g opacity="' + op.toFixed(2) + '"><ellipse cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" rx="' + (w / 2).toFixed(0) + '" ry="' + (r * 0.8).toFixed(0) + '" fill="#3A3266"/>' +
      c(x - w * 0.24, y - r * 0.5, r, '#3A3266') + c(x + 0.02 * w, y - r * 0.9, r * 1.3, '#3A3266') + c(x + w * 0.25, y - r * 0.4, r * 1.05, '#3A3266') +
      c(x - w * 0.26, y - r * 0.7, r * 0.7, '#4A3F7E') + c(x - 0.02 * w, y - r * 1.25, r * 0.9, '#4A3F7E') + c(x + w * 0.22, y - r * 0.75, r * 0.7, '#4A3F7E') + '</g>';
  }
  // Tanti cerchietti in un solo tracciato (luci lontane, stelle).
  function puntini(lista) { return lista.map(([x, y, r]) => 'M' + (x - r).toFixed(1) + ' ' + y.toFixed(1) + 'a' + r.toFixed(1) + ' ' + r.toFixed(1) + ' 0 1 0 ' + (2 * r).toFixed(1) + ' 0a' + r.toFixed(1) + ' ' + r.toFixed(1) + ' 0 1 0 ' + (-2 * r).toFixed(1) + ' 0').join(''); }
  const binario = (d, w) => '<path d="' + d + '" stroke="' + C.legnoScuro + '" stroke-width="' + (12 * (w || 1)) + '" stroke-dasharray="' + (3 * (w || 1)) + ' ' + (7 * (w || 1)) + '" fill="none"/><path d="' + d + '" stroke="' + C.acciaio + '" stroke-width="' + (4 * (w || 1)) + '" fill="none"/>';

  // ── I treni ──────────────────────────────────────────────────────────────────────────────────────
  // Un passeggero visto da lontano: lo stesso disegno, senza l'alone (che costa).
  function lieve(tipo, col, o) { return G.passeggero(tipo, col, o).replace(/<ellipse[^>]*filter="url\(#g-soft\)"\/>/g, ''); }
  PARCO.lieve = lieve;
  // I treni che girano: le lunghezze, uno dietro l'altro, con il loro spazio. Alcuni lunghissimi.
  const TRENI = [3, 5, 2, 4, 38, 3, 6, 2, 4, 3, 22, 5, 3, 4, 2, 7, 3], SPAZIO = 260, VEL = 240;
  const GIRO_A = PARCO.bocca - PARCO.giro, GIRO_B = PARCO.uscita - PARCO.giro;
  const GIRO = TRENI.reduce((s, n) => s + n * PARCO.passo + SPAZIO, 0);
  // Dove sta, sul giro, il punto u: sull'andata (verso destra), dentro la montagna (null) o sul ritorno (verso sinistra).
  function luogo(u) {
    u = ((u % GIRO) + GIRO) % GIRO;
    if (u < GIRO_A) { const x = PARCO.giro + u; return { a: 1, x, y: PARCO.andata, op: Math.max(0, Math.min(1, (PARCO.bocca - x) / 30)) }; }
    const ur = u - (GIRO - GIRO_B);
    if (ur < 0) return null;
    const x = PARCO.uscita - ur;
    return { a: 0, x, y: PARCO.ritorno, op: Math.max(0, Math.min(1, (PARCO.uscita - x) / 30)) };
  }
  PARCO.luogo = luogo;
  // Dove comincia ogni treno sul giro (al tempo 0), e lo sfasamento del tempo che mette la testa del treno j nel punto x
  // dell'andata al tempo t della scena (da sommare al tempo passato a G.animaPaesaggio).
  const INIZI = [];
  TRENI.reduce((u, n) => { INIZI.push(u); return u - n * PARCO.passo - SPAZIO; }, 0);
  PARCO.quando = (j, x, t) => { const per = GIRO / VEL; return ((((x - PARCO.giro - INIZI[j]) / VEL - t) % per) + per) % per; };
  // La posa di un vagone: centro delle ruote in (x, y), verso destra (dx = 1) o sinistra (dx = -1), a scala s.
  PARCO.posaVagone = (x, y, dx, s) => 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (-dx * (s || PARCO.vagone)).toFixed(4) + ' ' + (s || PARCO.vagone).toFixed(4) + ') translate(-120 -150)';
  function vagoniGiro() {
    const r = G.rng(913), lago = G.MOD.grande.lago, tipi = ['sasso', 'pezzo', 'sasso', 'al', 'pezzo', 'mare', 'sasso', 'parco'];
    let out = '', u0 = 0;
    TRENI.forEach((n, j) => {
      for (let i = 0; i < n; i++) {
        const tipo = tipi[Math.floor(r() * tipi.length)], col = lago[Math.floor(r() * lago.length)][2];
        out += '<g class="pi-vag" data-u="' + (u0 - i * PARCO.passo) + '" display="none">' +
          G.vagone({ primo: i === 0, sbarra: 1 }, '<g class="g-pass">' + lieve(tipo, col, { forma: Math.floor(r() * 3), strappo: '' }) + '</g>') + '</g>';
      }
      u0 -= n * PARCO.passo + SPAZIO;
    });
    return out;
  }
  // Un vagone grigio visto da lontano (per le file dei treni di prova): sagoma, striscia, ruote.
  const GRIGIO_LONTANO = '<path d="M176 64 L178 -6 Q179 -24 198 -24 L210 -24 Q230 -24 230 -6 L228 64 Z" fill="#6A6C77"/>' +
    '<path d="M4 66 Q2 56 12 56 L226 58 Q238 58 236 70 L228 120 Q225 134 210 134 L36 134 Q18 134 14 120 Z" fill="#8C8E99" stroke="#5E606C" stroke-width="4"/>' +
    '<path d="M11 86 L233 86 L230 110 L16 110 Z" fill="#73757F"/><circle cx="62" cy="136" r="15" fill="#2A2440"/><circle cx="180" cy="136" r="15" fill="#2A2440"/>';

  // ── I disegni che servono (da mettere nei defs della scena) ─────────────────────────────────────────
  // Le paperelle leggere (per le centinaia del lago e delle finestre): il corpo prende il colore dal fill di <use>.
  const CORPO = '<path d="M26 58 C26 46 40 42 58 44 C74 46 84 40 92 30 C94 46 94 62 86 72 C78 82 60 86 44 84 C32 82 26 70 26 58 Z"/><circle cx="36" cy="34" r="17"/>' +
    '<path d="M21 33 C12 32 7 37 9 41 C13 45 20 43 24 40 Z" fill="#F39A2B"/><circle cx="31" cy="30" r="3.4" fill="' + C.inchiostro + '"/><circle cx="32" cy="29" r="1.2" fill="#FFFFFF"/>';
  PARCO.defs = '<defs>' +
    '<radialGradient id="g-pi-alone"><stop offset="0" stop-color="#FF9E5E" stop-opacity=".42"/><stop offset=".55" stop-color="#FF9E5E" stop-opacity=".14"/><stop offset="1" stop-color="#FF9E5E" stop-opacity="0"/></radialGradient>' +
    '<linearGradient id="g-pi-collina" gradientUnits="userSpaceOnUse" x1="0" y1="560" x2="0" y2="1180"><stop offset="0" stop-color="#22265E"/><stop offset=".5" stop-color="#1A1C4A"/><stop offset="1" stop-color="#15132C"/></linearGradient>' +
    '<radialGradient id="g-pi-luce"><stop offset="0" stop-color="#FFD27A" stop-opacity=".5"/><stop offset="1" stop-color="#FFD27A" stop-opacity="0"/></radialGradient>' +
    '<g id="g-pi-grigio">' + GRIGIO_LONTANO + '</g>' +
    // La paperella vera, e quella di luce (trasparente, con l'alone e il bordo bianco).
    '<g id="g-pi-papv">' + CORPO + '<path d="M50 60 C58 51 72 53 76 61 C70 68 57 69 50 60 Z" fill="#000000" opacity=".2"/><ellipse cx="33" cy="25" rx="7" ry="3.2" fill="#FFFFFF" opacity=".35" transform="rotate(-20 33 25)"/></g>' +
    '<g id="g-pi-papl" opacity=".85"><ellipse cx="54" cy="58" rx="58" ry="42" opacity=".32"/>' + CORPO +
    '<path d="M26 58 C26 46 40 42 58 44 C74 46 84 40 92 30 C94 46 94 62 86 72 C78 82 60 86 44 84 C32 82 26 70 26 58 Z" fill="none" stroke="#FFFFFF" stroke-width="5" opacity=".7"/></g>' +
    '</defs>';

  // ── Il parco immenso ─────────────────────────────────────────────────────────────────────────────
  // o: { treni (i treni che girano), strisce }. Gli strati da riempire o muovere: .pi-ritorno e .pi-andata (i treni),
  // .pi-spezza (lo Spezzaparole), .pi-biglietti, .pi-papere (le paperelle del lago), .pi-davanti (Ada e chi le sta
  // vicino), .pi-nuvole, .pi-luccica.
  G.parcoImmenso = function (o) {
    o = o || {};
    const r = G.rng(901), O = PARCO.orizzonte, S = PARCO.suolo;
    // Il chiarore del parco, la pianura fino all'orizzonte, piena di luci, e la città all'orizzonte.
    const alone = '<ellipse cx="3200" cy="560" rx="7600" ry="1500" fill="url(#g-pi-alone)"/>';
    let tetti = 'M-3400 ' + O;
    for (let x = -3400; x < 12000;) { const w = 14 + r() * 40, h = 4 + r() * 22 * (r() < 0.15 ? 2.4 : 1); tetti += ' L' + x.toFixed(0) + ' ' + (O - h).toFixed(1) + ' L' + (x + w).toFixed(0) + ' ' + (O - h).toFixed(1); x += w; }
    tetti += ' L12000 ' + O + ' Z';
    const luci = [[], [], [], []];
    for (let i = 0; i < 1800; i++) {
      const u = Math.pow(r(), 1.7), y = O + 6 + (S + 10 - O) * u, x = -3400 + r() * 15400;
      luci[Math.floor(r() * 4)].push([x, y, 1.4 + 3.6 * u]);
    }
    for (let i = 0; i < 300; i++) luci[i % 4].push([-3400 + r() * 15400, O - 2 - r() * 18, 1.4]);
    const COL = [[C.luce, 0.85], [C.luce2, 0.7], ['#FFF4DA', 0.6], ['#F08C78', 0.55]];
    const pianura = '<path d="' + tetti + '" fill="#1A1A48"/><rect x="-3400" y="' + O + '" width="15400" height="' + (S + 30 - O) + '" fill="#141537"/>' +
      luci.map((l, k) => '<path d="' + puntini(l) + '" fill="' + COL[k][0] + '" opacity="' + COL[k][1] + '"/>').join('');
    // Le cime, dalla più lontana alla più vicina, ognuna con la sua nuvola in cima; poi le nuvole più vicine.
    const ordine = CIME.slice().sort((a, b) => b.d - a.d);
    let monti = '';
    ordine.forEach(c => {
      monti += picco(c);
      const top = c.base - c.alta;
      if (c.d < 0.45 || c.k % 3 === 1) monti += nuvola(c.x + (r() - 0.5) * 300 * c.s, top + (c.d < 0.45 ? 120 : -60) * c.s, (c.d < 0.45 ? 1100 : 900) * c.s, 0.8 + 0.15 * c.d);
    });
    let nuvole = '';
    for (let i = 0; i < 14; i++) { const x = 2600 + r() * 6800, y = -2300 + r() * 500; nuvole += nuvola(x, y, 800 + r() * 1000, 0.5 + r() * 0.3); }
    // Le bocche: quella della prima cima (l'andata entra) e quella dell'ultima (il ritorno esce, sopra il lago).
    const bocca = (x, y, h) => '<path d="M' + (x - 64) + ' ' + (y + 4) + ' L' + (x - 64) + ' ' + (y - h + 40) + ' Q' + (x - 30) + ' ' + (y - h - 6) + ' ' + (x + 16) + ' ' + (y - h + 6) + ' Q' + (x + 60) + ' ' + (y - h + 18) + ' ' + (x + 64) + ' ' + (y - h + 50) + ' L' + (x + 64) + ' ' + (y + 4) + ' Z" fill="' + C.buio + '" stroke="#4E447F" stroke-width="9"/>' +
      [[-64, -h + 40, C.luce], [-36, -h + 2, C.luce2], [8, -h - 4, C.luce], [46, -h + 12, C.luce2], [64, -h + 50, C.luce]].map(([dx, dy, f]) => '<circle cx="' + (x + dx) + '" cy="' + (y + dy) + '" r="8" fill="' + f + '"/>').join('');
    const bocche = bocca(PARCO.bocca, S, 120) + bocca(PARCO.uscita, PARCO.ritorno, 116);
    // Il binario morto: file e file di treni di prova grigi, addormentati, fino all'orizzonte.
    let morto = '';
    const [m0, m1] = PARCO.morto;
    for (let f = 11; f >= 1; f--) {
      const y = S - 26 * f, s = PARCO.vagone * (1 - 0.05 * f), passo = PARCO.passo * s * 3, x1 = m1 - 30 * f, x0 = m0 - 400;
      let v = '';
      for (let x = x1 - 40 * s * 3; x > x0; x -= passo) v += '<use href="#g-pi-grigio" transform="translate(' + x.toFixed(1) + ' ' + y + ') scale(' + s.toFixed(3) + ') translate(-120 -150)"/>';
      morto += '<g opacity="' + (1 - 0.07 * f).toFixed(2) + '">' + binario('M' + x0 + ' ' + y + ' L' + x1 + ' ' + y, 1 - 0.05 * f) +
        '<rect x="' + (x1 - 4) + '" y="' + (y - 22) + '" width="10" height="26" rx="3" fill="' + C.legnoScuro + '"/>' + v + '</g>';
    }
    let primaFila = '';
    for (let x = m1 - 40; x > m0 - 400; x -= PARCO.passo) primaFila += '<g transform="' + PARCO.posaVagone(x, S, -1) + '">' + G.vagone({ grigio: true, fanale: 0, sbarra: 1 }, '') + '</g>';
    morto += binario('M' + (m0 - 400) + ' ' + S + ' L' + m1 + ' ' + S) + '<rect x="' + (m1 - 2) + '" y="' + (S - 26) + '" width="12" height="30" rx="3" fill="' + C.legnoScuro + '"/>' + primaFila;
    // Il ritorno: dall'ultima cima, sul ponte sopra il lago, fino alla stazione.
    let pali = '';
    for (let x = 5420; x < 7240; x += 180) pali += '<rect x="' + x + '" y="' + (PARCO.ritorno + 4) + '" width="12" height="52" fill="' + C.legnoScuro + '"/>';
    const ritorno = pali + '<rect x="5380" y="' + (PARCO.ritorno + 2) + '" width="1880" height="9" fill="' + C.legno + '"/>' + binario('M' + PARCO.giro + ' ' + PARCO.ritorno + ' L' + PARCO.uscita + ' ' + PARCO.ritorno);
    // La stazione lunga come una strada: pensilina a righe, lampadine, colonne, pedana.
    const [s0, s1] = PARCO.stazione;
    let righe = '', colonne = '';
    for (let x = s0 - 20, k = 0; x < s1 + 20; x += 40, k++) righe += '<path d="M' + x + ' 660 L' + (x + 40) + ' 660 L' + (x + 40) + ' 702 Q' + (x + 20) + ' 720 ' + x + ' 702 Z" fill="' + (k % 2 ? C.crema : C.rosso) + '"/>';
    const lampadine = [];
    for (let x = s0; x < s1 + 20; x += 40) lampadine.push([x, 714, 5.5]);
    for (let x = s0 + 20; x < s1; x += 340) colonne += '<line x1="' + x + '" y1="704" x2="' + x + '" y2="990"/>';
    const pensilina = '<g stroke="' + C.legnoScuro + '" stroke-width="14">' + colonne + '</g>' +
      '<path d="M' + (s0 - 40) + ' 660 L' + (s1 + 40) + ' 660 L' + (s1 + 20) + ' 636 Q' + ((s0 + s1) / 2) + ' 598 ' + (s0 - 20) + ' 636 Z" fill="' + C.rossoScuro + '"/>' + righe +
      '<path class="pi-lampadine" d="' + puntini(lampadine) + '" fill="' + C.luce + '"/>';
    const pedana = '<rect x="' + s0 + '" y="988" width="' + (s1 - s0) + '" height="34" fill="' + C.legno + '"/><rect x="' + s0 + '" y="988" width="' + (s1 - s0) + '" height="8" fill="#B98058"/>' +
      binario('M' + PARCO.giro + ' ' + PARCO.andata + ' L' + (PARCO.bocca + 40) + ' ' + PARCO.andata);
    // Il lago, col bordo di legno come la vasca di Ada, e la sua bancarella sulla riva, col tendone più alto.
    const [lx, ly, lrx, lry] = PARCO.lago;
    let onde = '', lucc = '';
    for (let k = 0; k < 4; k++) { const yy = ly - 34 + k * 22, w = lrx * Math.sqrt(Math.max(0, 1 - Math.pow((yy - ly) / lry, 2))) - 40; onde += 'M' + (lx - w).toFixed(0) + ' ' + yy + ' q30 -8 60 0 t60 0 t60 0 M' + (lx - w * 0.3).toFixed(0) + ' ' + (yy + 6) + ' q30 -8 60 0 t60 0 M' + (lx + w * 0.4).toFixed(0) + ' ' + yy + ' q30 -8 60 0 t60 0 t60 0'; }
    for (let k = 0; k < 40; k++) { const a = r() * Math.PI * 2, q = Math.sqrt(r()) * 0.9; lucc += '<ellipse cx="' + (lx + lrx * q * Math.cos(a)).toFixed(0) + '" cy="' + (ly + lry * q * Math.sin(a)).toFixed(0) + '" rx="' + (6 + r() * 10).toFixed(0) + '" ry="2" fill="#FFFFFF" opacity="0"/>'; }
    const lago = '<ellipse cx="' + lx + '" cy="' + ly + '" rx="' + lrx + '" ry="' + lry + '" fill="url(#g-acqua)" stroke="' + C.legnoScuro + '" stroke-width="8"/>' +
      '<path d="' + onde + '" stroke="#FFFFFF" stroke-width="3" fill="none" opacity=".22"/><g class="pi-luccica">' + lucc + '</g>' +
      '<ellipse cx="' + PARCO.scarico[0] + '" cy="' + PARCO.scarico[1] + '" rx="16" ry="5" fill="#0E2A3E" stroke="' + C.legnoScuro + '" stroke-width="3"/>';
    const [ax, ay] = PARCO.ada;
    let falde = '';
    for (let x = ax - 140, k = 0; x < ax + 120; x += 26, k++) falde += '<path d="M' + x + ' 830 L' + (x + 26) + ' 830 L' + (x + 26) + ' 860 Q' + (x + 13) + ' 874 ' + x + ' 860 Z" fill="' + (k % 2 ? C.crema : C.rosso) + '"/>';
    const lampTenda = [];
    for (let x = ax - 130; x < ax + 120; x += 26) lampTenda.push([x, 870, 4]);
    const bancarella = '<g stroke="' + C.legnoScuro + '" stroke-width="9"><line x1="' + (ax - 128) + '" y1="830" x2="' + (ax - 128) + '" y2="1074"/><line x1="' + (ax + 106) + '" y1="830" x2="' + (ax + 106) + '" y2="1072"/></g>' +
      '<path d="M' + (ax - 160) + ' 832 L' + (ax + 140) + ' 832 L' + (ax + 100) + ' 788 Q' + (ax - 10) + ' 730 ' + (ax - 120) + ' 788 Z" fill="' + C.rossoScuro + '"/>' +
      '<circle cx="' + (ax - 10) + '" cy="752" r="9" fill="' + C.oro + '"/>' + falde + '<path d="' + puntini(lampTenda) + '" fill="' + C.luce + '"/>' +
      // Il bancone con la manopola (episodio 3), e il palo con la bandierina.
      '<rect x="' + (ax - 96) + '" y="' + (ay - 30) + '" width="56" height="40" fill="' + C.legnoScuro + '"/><rect x="' + (ax - 100) + '" y="' + (ay - 34) + '" width="64" height="7" rx="2" fill="' + C.legno + '" stroke="' + C.legnoScuro + '" stroke-width="2"/>' +
      '<g transform="translate(' + (ax - 68) + ' ' + (ay - 12) + ') scale(.13)">' + G.manopola(0) + '</g>' +
      '<line x1="' + (ax - 150) + '" y1="' + (ay + 8) + '" x2="' + (ax - 150) + '" y2="' + (ay - 40) + '" stroke="' + C.legnoScuro + '" stroke-width="6"/>' +
      '<circle cx="' + (ax - 150) + '" cy="' + (ay - 54) + '" r="19" fill="' + C.crema + '" stroke="' + C.oro + '" stroke-width="4"/>' +
      '<g transform="translate(' + (ax - 164) + ' ' + (ay - 66) + ') scale(.27)">' + G.paperella('#FFD23F') + '</g>';
    // La ringhiera davanti alla stazione.
    let paletti = '';
    for (let x = s0 - 80; x < s1 + 100; x += 26) paletti += 'M' + x + ' ' + PARCO.ringhiera + ' L' + x + ' ' + (PARCO.ringhiera - 38);
    const ringhiera = '<path d="' + paletti + '" stroke="' + C.legnoScuro + '" stroke-width="4"/><path d="M' + (s0 - 90) + ' ' + (PARCO.ringhiera - 36) + ' L' + (s1 + 110) + ' ' + (PARCO.ringhiera - 36) + ' M' + (s0 - 90) + ' ' + (PARCO.ringhiera - 16) + ' L' + (s1 + 110) + ' ' + (PARCO.ringhiera - 16) + '" stroke="' + C.legno + '" stroke-width="6"/>' +
      '<path d="M' + (s0 - 90) + ' ' + (PARCO.ringhiera - 38) + ' L' + (s1 + 110) + ' ' + (PARCO.ringhiera - 38) + '" stroke="' + C.oro + '" stroke-width="3"/>';
    // Il suolo davanti e la città che non finisce mai, più vicina, sotto il parco.
    let case_ = '';
    [[1300, 60, 120, '#17193F', 0.5], [1480, 100, 180, '#14163A', 0.6], [1740, 150, 260, '#111334', 0.7], [2100, 220, 380, '#0F1130', 0.8], [2600, 320, 520, '#0D0F2B', 0.85]].forEach(([yb, h0, w0, col, lum]) => {
      let p = 'M-3400 ' + yb, fin = [];
      for (let x = -3400; x < 12000;) {
        const w = w0 * (0.6 + r() * 0.8), h = h0 * (0.6 + r() * 0.9), tetto = r() < 0.4;
        p += ' L' + x.toFixed(0) + ' ' + (yb - h).toFixed(0) + (tetto ? ' L' + (x + w / 2).toFixed(0) + ' ' + (yb - h - w * 0.3).toFixed(0) : '') + ' L' + (x + w).toFixed(0) + ' ' + (yb - h).toFixed(0);
        for (let k = 0; k < 4; k++) if (r() < lum * 0.6) fin.push('M' + (x + w * (0.15 + 0.2 * k)).toFixed(0) + ' ' + (yb - h * (0.3 + 0.4 * r())).toFixed(0) + ' h' + (w * 0.1).toFixed(0) + ' v' + (h * 0.14).toFixed(0) + ' h' + (-w * 0.1).toFixed(0) + ' Z');
        x += w + 6;
      }
      p += ' L12000 5200 L-3400 5200 Z';
      case_ += '<path d="' + p + '" fill="' + col + '"/><path d="' + fin.join('') + '" fill="' + C.luce + '" opacity=".75"/>';
    });
    const suolo = '<rect x="-3400" y="1018" width="15400" height="3400" fill="' + C.terra + '"/><path d="M-3400 1018 L12000 1018" stroke="#2A2650" stroke-width="5"/>';
    const [zx, zy, zs] = PARCO.spezza;
    return '<g class="pi-parco-in">' + alone + pianura + '<g class="pi-monti">' + monti + '</g><g class="pi-nuvole">' + nuvole + '</g>' + bocche +
      morto + ritorno + '<g class="pi-ritorno">' + (o.treni ? vagoniGiro() : '') + '</g>' +
      pensilina + pedana + '<g class="pi-andata"></g>' +
      '<g class="pi-spezza" transform="' + G.posa(zx, zy, zs, 220, 300) + '">' + G.spezzaparole({}) + '</g><g class="pi-biglietti"></g>' +
      suolo + lago + '<g class="pi-papere"></g>' + bancarella + ringhiera + '<g class="pi-davanti"></g>' + case_ + '</g>';
  };

  // ── Il paesaggio: il parco di Ada, la collina, il parco immenso ──────────────────────────────────────
  // o: le opzioni di G.mondo (laggiu, manopola, banchina, morto…) e di G.parcoImmenso (treni), più strisce (il numero
  // di strisce che volano verso lo Spezzaparole gigante; 0 nessuna).
  G.paesaggio = function (o) {
    o = o || {};
    const r = G.rng(907);
    const stelle = [[], [], []];
    for (let i = 0; i < 300; i++) stelle[i % 3].push([1920 + r() * 9800, -1700 + r() * 2300, 0.8 + r() * 1.8]);
    const [cx, cy] = PARCO.cancello;
    // La collina: dal cancello del parco di Ada sale fino alla cima, poi scende verso la pianura. Il profilo è fatto di
    // curve (da, c1, c2, a): i ciuffi d'erba ci stanno sopra.
    const PROFILO = [[[1880, 872], [2040, 864], [2170, 760], [2300, 650]], [[2300, 650], [2400, 590], [2480, 556], [2550, 552]],
      [[2550, 552], [2650, 548], [2760, 602], [2880, 690]], [[2880, 690], [3020, 792], [3220, 930], [3520, 1010]],
      [[3520, 1010], [3760, 1074], [4000, 1180], [4300, 1400]]];
    const collina = 'M1500 3200 L1500 1010 C1660 990 1790 920 1880 872 ' + PROFILO.map(c => 'C' + c[1].join(' ') + ' ' + c[2].join(' ') + ' ' + c[3].join(' ')).join(' ') + ' L4300 3200 Z';
    let ciuffi = '';
    PROFILO.forEach(c => { for (let k = 0; k < 14; k++) { const [x, y] = bez(c, (k + 0.5) / 14); ciuffi += 'M' + x.toFixed(0) + ' ' + (y + 5).toFixed(0) + ' q3 -12 6 -2 q3 -14 6 0 q3 -10 5 2'; } });
    const sentiero = PARCO.sentiero.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join(' ');
    let archi = '';
    for (let k = 0; k < 8; k++) archi += '<rect x="' + (cx - 48 + k * 12) + '" y="734" width="12" height="18" fill="' + (k % 2 ? C.crema : C.rosso) + '"/>';
    const lampCanc = [];
    for (let k = 0; k <= 8; k++) lampCanc.push([cx - 48 + k * 12, 730 - 10 * Math.sin(Math.PI * k / 8), 4]);
    const cancello = '<g class="pi-cancello"><g stroke="' + C.legnoScuro + '" stroke-width="10"><line x1="' + (cx - 48) + '" y1="870" x2="' + (cx - 48) + '" y2="740"/><line x1="' + (cx + 48) + '" y1="870" x2="' + (cx + 48) + '" y2="740"/></g>' +
      '<path d="M' + (cx - 58) + ' 754 L' + (cx + 58) + ' 754 L' + (cx + 52) + ' 730 Q' + cx + ' 706 ' + (cx - 52) + ' 730 Z" fill="' + C.rossoScuro + '"/>' + archi +
      '<path d="' + puntini(lampCanc) + '" fill="' + C.luce + '"/>' +
      // Le ante del cancello, aperte contro i pali (G.anteCancello le chiude), e la guardiola del custode, lì accanto.
      [-1, 1].map(l => { const px = cx + 43 * l, w = 43;
        let sbarre = '';
        for (let k = 1; k < 4; k++) sbarre += 'M' + (px - l * k * w / 4) + ' 812 L' + (px - l * k * w / 4) + ' 864 ';
        return '<g class="pi-anta" data-px="' + px + '" transform="translate(' + px + ' 0) scale(.12 1) translate(' + (-px) + ' 0)">' +
          '<path d="M' + px + ' 810 L' + (px - l * w) + ' 816 L' + (px - l * w) + ' 866 L' + px + ' 866 Z" fill="none" stroke="' + C.legnoScuro + '" stroke-width="5" stroke-linejoin="round"/>' +
          '<path d="' + sbarre + '" stroke="' + C.legnoScuro + '" stroke-width="3"/></g>'; }).join('') + '</g>' +
      '<g class="pi-guardiola" transform="translate(1840 734) scale(.8)"><g class="pi-guardiola-in">' + G.guardiola({ porta: 0 }) + '</g></g>';
    // Le strisce che volano verso lo Spezzaparole gigante.
    let strisce = '';
    for (let k = 0; k < (o.strisce === undefined ? 44 : o.strisce); k++) strisce += '<g class="pi-str" opacity="0"><g transform="translate(-150 -22)">' + G.striscia('', 300) + '</g></g>';
    return '<rect x="-2400" y="-4000" width="16500" height="4000" fill="' + C.notte1 + '"/><rect x="3880" y="0" width="10200" height="900" fill="url(#g-cielo)"/><rect x="-2400" y="900" width="16500" height="3400" fill="' + C.terra + '"/>' +
      G.mondo(Object.assign({}, o, { bruco: false })) +
      stelle.map((l, k) => '<path d="' + puntini(l) + '" fill="#FFF4DA" opacity="' + [0.8, 0.55, 0.35][k] + '"/>').join('') +
      '<path d="M1880 760 Q2600 700 3400 734 Q4400 772 5400 728 Q6600 690 7800 736 Q9000 772 10400 730 L14000 740 L14000 1300 L1880 1300 Z" fill="#171A44"/>' +
      '<g class="pi-parco" transform="translate(' + PARCO.origine[0] + ' ' + PARCO.origine[1] + ') scale(' + PARCO.scala + ')">' + G.parcoImmenso(o) + '</g>' +
      '<path d="' + collina + '" fill="url(#g-pi-collina)"/><path d="' + collina.replace(/^M1500 3200 L1500 1010 C1660 990 1790 920 1880 872 /, 'M1880 872 ').replace(/ L4300 3200 Z$/, '') + '" fill="none" stroke="#2E3270" stroke-width="5"/>' +
      '<path d="' + ciuffi + '" stroke="#2E5A3E" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path d="' + sentiero + '" stroke="#3E3A72" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' + cancello +
      // Il Bruco (seconda stagione) sta davanti ai piedi della collina.
      (o.bruco ? G.S2.brucoFermo(o.bruco) : '') +
      '<g class="pi-strisce">' + strisce + '</g>';
  };
  // Le ante del cancello del parco di Ada: a = 1 aperte contro i pali, a = 0 chiuse.
  G.anteCancello = function (m, a) {
    m.qa('.pi-anta').forEach(el => { const px = +el.dataset.px; el.setAttribute('transform', 'translate(' + px + ' 0) scale(' + (1 - 0.88 * a).toFixed(3) + ' 1) translate(' + (-px) + ' 0)'); });
  };
  // Monta il paesaggio in una scena, come G.costruisciMondo: sopra sta nella camera, davanti fuori.
  G.costruisciPaesaggio = function (kit, sopra, o) {
    o = o || {};
    const pre = o.pre || 'p';
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + PARCO.defs +
      '<g class="g-cam">' + G.paesaggio(o) + '<path class="g-p-partenza" d="' + G.MONDO.partenza + '" fill="none"/>' +
      '<path class="g-p-arrivo" d="' + G.MONDO.arrivo + '" fill="none"/>' + (sopra || '') + '</g>' + (o.davanti || '') + '</svg>' + (o.html || '') + '</div>', pre).replace(/href="#g-/g, 'href="#' + pre + '-g-')));
    const q = sel => kit.stage.querySelector(sel), qa = sel => [...kit.stage.querySelectorAll(sel)];
    return { cam: q('.g-cam'), ruota: q('.g-ruota'), partenza: q('.g-p-partenza'), arrivo: q('.g-p-arrivo'), parco: q('.pi-parco'), q, qa };
  };
  // Le strisce: da dove partono (a sinistra sopra il parco di Ada, dal cielo, da destra, dalla città davanti), per dove
  // passano, quanto sono grandi, quanto ci mettono.
  function voli(n) {
    const r = G.rng(915), [fx, fy] = PARCO.inP(PARCO.fessura[0], PARCO.fessura[1]), lista = [];
    for (let k = 0; k < n; k++) {
      const da = k % 11 < 4 ? 'sinistra' : k % 11 < 6 ? 'cielo' : k % 11 < 8 ? 'destra' : 'basso';
      let p, s0, dur;
      if (da === 'sinistra') { const x = -700 + r() * 500, y = 200 + r() * 220; p = [[x, y], [x + 1500, y - 40 + r() * 80], [fx - 1300, 170 + r() * 160], [fx, fy]]; s0 = 0.16; dur = 10 + r() * 3; }
      else if (da === 'cielo') { const x = 3800 + r() * 5000, y = -1500 - r() * 300; p = [[x, y], [x - 300, y + 700], [fx + (r() - 0.5) * 1200, fy - 700], [fx, fy]]; s0 = 0.12; dur = 7 + r() * 3; }
      else if (da === 'destra') { const x = 10200 + r() * 600, y = -300 + r() * 900; p = [[x, y], [x - 2200, y - 500], [fx + 1500, fy - 600], [fx, fy]]; s0 = 0.12; dur = 8 + r() * 3; }
      else { const x = 3900 + r() * 5600, y = 1650 + r() * 300; p = [[x, y], [x + (r() - 0.5) * 600, y - 700], [fx + (r() - 0.5) * 800, fy - 500], [fx, fy]]; s0 = 0.12; dur = 7 + r() * 3; }
      lista.push({ p, s0, dur, fase: r() * dur, giro: r() * 6.28 });
    }
    return lista;
  }
  const bez = (p, u) => { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); };
  PARCO.bez = bez;
  // Fa vivere il paesaggio al tempo t. o: { treni: true | 'andata' | 'ritorno' | false, biglietti, forbice (false: ferma) }.
  G.animaPaesaggio = function (m, t, o) {
    o = o || {};
    const c = m.__pi || (m.__pi = (() => {
      const strisce = m.qa('.pi-str');
      return {
        strisce, voli: voli(strisce.length), vag: m.qa('.pi-vag').map(el => ({ el, u: +el.dataset.u, dove: null })),
        andata: m.q('.pi-andata'), ritorno: m.q('.pi-ritorno'), spezza: m.q('.pi-spezza'), biglietti: m.q('.pi-biglietti'),
        nuvole: m.q('.pi-nuvole'), lucc: m.qa('.pi-luccica ellipse'), stato: '', cache: {}, bigl: null,
      };
    })());
    G.animaMondo(m, t + 900);
    // Le strisce: arrivano a ondate, senza fermarsi mai.
    c.strisce.forEach((el, k) => {
      const v = c.voli[k], u = ((t + v.fase) % v.dur) / v.dur, e = u * u * (3 - 2 * u) * 0.35 + u * 0.65;
      const [x, y] = bez(v.p, e), s = v.s0 + (0.0615 - v.s0) * e;
      el.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + (y + 14 * Math.sin(t * 2 + v.giro)).toFixed(1) + ') rotate(' + (10 * Math.sin(t * 1.6 + v.giro)).toFixed(1) + ') skewX(' + (8 * Math.sin(t * 5 + v.giro)).toFixed(1) + ') scale(' + s.toFixed(4) + ')');
      el.setAttribute('opacity', Math.min(1, u / 0.06, (1 - u) / 0.04).toFixed(3));
    });
    // Lo Spezzaparole gigante: la forbice non si ferma mai (zac zac zac), gli aghi girano, la bocca si accende.
    if (c.spezza) {
      const lav = o.forbice === false ? 0 : 1;
      const forbice = Math.round((0.6 - 0.6 * lav * Math.pow(Math.abs(Math.sin(t * Math.PI * 1.6)), 6)) * 10) / 10;
      const aghi = Math.round(lav * 60 * Math.sin(t * 4) / 10) * 10, bocca = Math.round(lav * (0.5 + 0.5 * Math.sin(t * 9)) * 4) / 4;
      const k = forbice + '|' + aghi + '|' + bocca;
      if (k !== c.stato) { c.spezza.innerHTML = c.cache[k] || (c.cache[k] = G.spezzaparole({ forbice, aghi, bocca })); c.stato = k; }
    }
    // I biglietti volano dalla bocca sui sedili dei treni dell'andata.
    if (c.biglietti) {
      if (!c.bigl && o.biglietti) {
        let h = '';
        for (let k = 0; k < 10; k++) h += '<g opacity="0"><g transform="translate(-60 -30)">' + G.biglietto('') + '</g></g>';
        c.biglietti.innerHTML = h; c.bigl = [...c.biglietti.children];
      }
      if (c.bigl) c.bigl.forEach((b, k) => {
        if (!o.biglietti) { b.setAttribute('opacity', 0); return; }
        const u = ((t + k * 0.23) % 2.3) / 1.5, [bx, by] = PARCO.boccaSpezza, tx = 160 + ((k * 137) % 700), ty = 958;
        if (u > 1) { b.setAttribute('opacity', 0); return; }
        const e = u * u * (3 - 2 * u), x = bx + (tx - bx) * e, y = by + (ty - by) * e - 160 * Math.sin(Math.PI * e);
        b.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + (-30 * e + 10 * Math.sin(k)).toFixed(1) + ') scale(.26)');
        b.setAttribute('opacity', Math.min(1, u / 0.1, (1 - u) / 0.12).toFixed(3));
      });
    }
    // I treni che girano: ogni vagone al suo posto sul giro; quelli dentro la montagna non si vedono.
    const qT = o.treni === undefined ? true : o.treni;
    c.vag.forEach(v => {
      const L = qT ? luogo(v.u + VEL * t) : null, vis = L && (qT === true || (qT === 'andata' && L.a) || (qT === 'ritorno' && !L.a));
      if (!vis) { if (v.dove !== 'no') { v.el.setAttribute('display', 'none'); v.dove = 'no'; } return; }
      const dove = L.a ? 'a' : 'r';
      if (v.dove !== dove) { (L.a ? c.andata : c.ritorno).appendChild(v.el); v.el.setAttribute('display', 'inline'); v.dove = dove; }
      v.el.setAttribute('transform', PARCO.posaVagone(L.x, L.y + 1.2 * Math.sin(t * 7 + v.u), L.a ? 1 : -1));
      v.el.setAttribute('opacity', L.op.toFixed(2));
    });
    // Le nuvole vanno piano; il lago luccica.
    if (c.nuvole) c.nuvole.setAttribute('transform', 'translate(' + (60 * Math.sin(t * 0.05)).toFixed(1) + ' 0)');
    c.lucc.forEach((e, k) => e.setAttribute('opacity', (0.5 * Math.max(0, Math.sin(t * 1.3 + k * 2.1))).toFixed(2)));
  };
  // Le paperelle del lago: [{ parola, col, x, y }], sparse sotto il ponte, mescolate in modo ripetibile.
  G.papereLago = function (lago, seme) {
    const r = G.rng(seme || 41), lista = [], [lx, ly, lrx, lry] = PARCO.lago;
    lago.forEach(([w, n, col]) => { for (let k = 0; k < n; k++) lista.push({ parola: w, col }); });
    for (let i = lista.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [lista[i], lista[j]] = [lista[j], lista[i]]; }
    lista.forEach(p => {
      p.x = 5470 + r() * 1680;
      const h = lry * Math.sqrt(Math.max(0, 1 - Math.pow((p.x - lx) / lrx, 2)));
      p.y = ly - h * 0.6 + 10 + r() * (h * 1.45 - 10);
    });
    return lista;
  };
  // Il quaderno di Ada, aperto sul giro dell'episodio 1 (scatola 1920×1080): a sinistra la montagna e il treno che entra
  // con la sua Emma rosa, a destra Emma che esce blu e la vasca piena di paperelle blu. I colori sono quelli del parco di
  // Ada (G.MOD.mare).
  G.quadernoAda = function () {
    const D = G.MOD.mare, P = D.passeggeri, rosa = P.Emma.biglietto, blu = P.Emma.tratti[2];
    const omino = (x, y, col) => '<path d="M' + (x - 26) + ' ' + y + ' L' + (x + 26) + ' ' + y + ' L' + (x + 16) + ' ' + (y - 34) + ' L' + (x - 16) + ' ' + (y - 34) + ' Z" fill="' + col + '"/><circle cx="' + x + '" cy="' + (y - 52) + '" r="22" fill="#F5C84C"/><circle cx="' + x + '" cy="' + (y - 48) + '" r="15" fill="#FFE9D6"/>';
    const papere = G.papereVasca(D.vasca).slice(0, 9).map((q, i) => '<g transform="translate(' + (1150 + i * 52) + ' ' + (760 + (i % 2) * 18) + ') scale(.4)">' + G.paperella(q.col) + '</g>').join('');
    return '<rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="#3A3570" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' +
      '<path d="M260 820 L470 470 Q560 330 640 320 Q720 320 800 470 L900 820"/><path d="M500 520 Q520 470 560 480 L560 520"/>' +
      '<path d="M220 420 Q360 380 500 500"/><path d="M300 410 L380 410 L380 450 L300 450 Z M390 430 L470 430 L470 470 L390 470 Z"/>' +
      '<path d="M1020 640 L1180 300 Q1260 200 1340 200 Q1420 210 1500 330 L1700 640"/><path d="M1100 640 L1100 590 Q1130 550 1170 580 L1170 640"/>' +
      '<path d="M1180 620 L1300 620 L1300 660 L1180 660 Z M1310 620 L1430 620 L1430 660 L1310 660 Z"/><path d="M1120 760 L1640 760 L1610 860 Q1380 890 1150 860 Z"/>' +
      '</g>' + omino(440, 400, rosa) + omino(1400, 610, blu) + papere;
  };
  G.PARCO = PARCO;
})();

// ── Stagione 2 ──────────────────────────────────────────────────────────────────────────────────────
// I passeggeri della seconda stagione, dalle parole del modellino: le bandierine («⚑oro»…), i sassolini delle parole corte
// che non hanno un personaggio («storie», «di»), Al, Mare, Parco ed Emma, e le paperelle salite (le parole pescate).
window.G.S2 = {
  TIPI: { Al: ['al'], mare: ['mare'], Emma: ['emma'], parco: ['parco'], storie: ['sasso', { forma: 0 }], di: ['sasso', { forma: 1 }],
    Domani: ['sasso', { forma: 2 }], piove: ['sasso', { forma: 0 }], '?': ['sasso', { forma: 1 }], pioggia: ['sasso', { forma: 2 }], sole: ['sasso', { forma: 0 }] },
  // { tipo, o } di una parola.
  tipo(parola) {
    if (parola.charAt(0) === '⚑') return { tipo: 'bandierina', o: { metallo: parola.slice(1) } };
    const t = this.TIPI[parola];
    return t ? { tipo: t[0], o: t[1] } : { tipo: 'paperella' };
  },
  // Un passeggero del modellino ({ parola, biglietto, tratti }) pronto per G.treno, G.interno e G.giro7.
  chi(p) { const t = this.tipo(p.parola); return { tipo: t.tipo, o: t.o, parola: p.parola, biglietto: p.biglietto, tratti: p.tratti, col: p.biglietto, uscita: p.tratti.at(-1) }; },
  // Tutto il treno di un giro del modellino: i passeggeri, e in fondo la bandierina d'ottone (giro.ottone).
  treno(giro) {
    const ott = giro.ottone;
    return giro.passeggeri.map(p => this.chi(p)).concat([Object.assign(this.chi({ parola: '⚑ottone', biglietto: ott.biglietto, tratti: ott.tratti }), { dopo_fili: ott.dopo_fili, fili: ott.fili })]);
  },
};
// Il custode nel mondo, con i piedi nel punto (x, y): alto come serve accanto ad Ada (scala 0.28, come nell'episodio 9).
window.G.posaCustode = function (x, y, s) { return window.G.posa(x, y, s || 0.28, 240, 410); };
// Dove sta, nel mondo, un punto della scatola del custode (per la striscia nella sua mano).
window.G.puntoCustode = function (x, y, p, s) { s = s || 0.28; return [x - 120 * s + p[0] * s, y - 410 * s + p[1] * s]; };
// Il quaderno di Ada: una vasca disegnata a matita, con le paperelle di quella sera (colori e quantità dal modellino,
// in ordine sparso, al più n). Il bordo della vasca ha il centro in (x, y); s la scala.
window.G.S2.vascaDisegnata = function (vasca, x, y, s, seme, n) {
  const G = window.G, lista = G.papereVasca(vasca, seme || 5).slice(0, n || 18), r = G.rng((seme || 5) + 1);
  const papere = lista.map((p, i) => {
    const riga = Math.floor(i / 6), c = i % 6;
    return '<g transform="translate(' + (-170 + c * 60 + (riga % 2) * 26 + (r() - 0.5) * 12).toFixed(1) + ' ' + (-44 + riga * 30 + (r() - 0.5) * 6).toFixed(1) + ') scale(.5)">' + G.paperella(p.col) + '</g>';
  }).join('');
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + papere +
    '<path d="M-220 40 L220 40 L196 130 Q0 150 -196 130 Z" fill="' + G.C.crema + '" stroke="#3A3570" stroke-width="8" stroke-linejoin="round"/>' +
    '<path d="M-200 80 L200 80" stroke="#3A3570" stroke-width="5" stroke-dasharray="14 12"/>' +
    '<path d="M-240 36 q30 -14 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0" stroke="#5C8FD0" stroke-width="6" fill="none" stroke-linecap="round"/></g>';
};
// Un vagone disegnato a matita sul quaderno, con dentro un disegno (dentro, in coordinate del vagone: il sedile è in
// (0, 0)). Centro del sedile (x, y), scala s.
window.G.S2.vagoneDisegnato = function (x, y, s, dentro) {
  const C = window.G.C;
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + (dentro || '') +
    '<path d="M-110 0 L110 0 L100 70 L-96 70 Z" fill="' + C.crema + '" stroke="#3A3570" stroke-width="7" stroke-linejoin="round"/>' +
    '<path d="M-104 30 L104 30" stroke="' + C.rosso + '" stroke-width="10"/>' +
    '<circle cx="-60" cy="84" r="18" fill="' + C.crema + '" stroke="#3A3570" stroke-width="6"/><circle cx="60" cy="84" r="18" fill="' + C.crema + '" stroke="#3A3570" stroke-width="6"/></g>';
};
// Parco disegnato a matita: la chioma del suo colore e il tronco; i piedi (la base del tronco) in (0, 0).
window.G.S2.schizzoParco = function (col) {
  return '<g><path d="M0 0 L0 -60" stroke="#3A3570" stroke-width="8" stroke-linecap="round"/>' +
    [[-34, -86, 38], [34, -86, 38], [0, -120, 44], [0, -80, 40]].map(([x, y, r]) => '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + col + '" stroke="#3A3570" stroke-width="5"/>').join('') +
    '<circle cx="-12" cy="-92" r="4" fill="#3A3570"/><circle cx="12" cy="-92" r="4" fill="#3A3570"/><path d="M-10 -76 Q0 -68 10 -76" stroke="#3A3570" stroke-width="4" fill="none" stroke-linecap="round"/></g>';
};
// Il Bruco (stagione 2, episodio 2): una giostrina per bambini piccoli, nell'angolo buio del parco: ai piedi della
// montagna grande, nella sua ombra, tra la vasca della pesca e la ruota panoramica. Un bruco verde con la faccia dipinta, le antenne a pallina e un sorriso largo, fatto
// di segmenti tondi uno dietro l'altro, come vagoni; la pista è un anello piatto che passa dentro una piccola montagna a
// forma di mela; davanti, una vasca piccola (paperelle di due colori soli, verdi e rosse) e una sbarra a righe bianche e
// rosse, verso la stazione. Coordinate del mondo. La pista: un'ellisse (centro c, raggi rx, ry) percorsa davanti da
// destra a sinistra, dietro da sinistra a destra; la mela sta sul capo destro, così il bruco gira dentro la mela.
window.G.S2.BRUCO = { c: [1290, 992], rx: 196, ry: 38, mela: [1454, 952], vasca: [1268, 1052], sbarra: [1050, 1030], segmenti: 6, passo: 28 };
// La pista come tracciato SVG, dal capo destro, prima la parte davanti.
window.G.S2.pistaBruco = function () {
  const B = window.G.S2.BRUCO, [cx, cy] = B.c;
  return 'M' + (cx + B.rx) + ' ' + cy + ' A' + B.rx + ' ' + B.ry + ' 0 0 1 ' + (cx - B.rx) + ' ' + cy + ' A' + B.rx + ' ' + B.ry + ' 0 0 1 ' + (cx + B.rx) + ' ' + cy;
};
// I colori del Bruco. o.faccia: il colore della faccia dipinta (il Bruco del parco gemello ne ha un altro).
window.G.S2.COLORI_BRUCO = { corpo: '#6CC04A', scuro: '#3F8A2E', chiaro: '#A6E07E', faccia: '#FFE08A', mela: '#D9483B', melaScura: '#A8322A', foglia: '#5DAE3C' };
// Un segmento del Bruco, centrato sul binario in (0, 0), che guarda a sinistra. testa: la testa con la faccia dipinta.
// dentro: chi siede sul segmento (nel punto (0, -26)).
window.G.S2.segmento = function (testa, dentro, o) {
  o = o || {};
  const K = window.G.S2.COLORI_BRUCO, C = window.G.C, fc = o.faccia || K.faccia;
  if (testa) {
    return '<g><circle cx="0" cy="-20" r="21" fill="' + K.corpo + '" stroke="' + K.scuro + '" stroke-width="2.5"/>' +
      '<path d="M-6 -38 Q-12 -54 -20 -60 M6 -38 Q4 -56 0 -64" stroke="' + K.scuro + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
      '<circle cx="-20" cy="-61" r="4.5" fill="' + C.rosso + '"/><circle cx="0" cy="-65" r="4.5" fill="' + C.oro + '"/>' +
      // La faccia dipinta, sul davanti: un tondo chiaro, gli occhi grandi, le guance e il sorriso largo.
      '<ellipse cx="-11" cy="-19" rx="13" ry="15" fill="' + fc + '"/>' +
      '<circle cx="-16" cy="-24" r="3.6" fill="#FFFFFF"/><circle cx="-16.6" cy="-24" r="2" fill="' + C.inchiostro + '"/>' +
      '<circle cx="-6" cy="-24" r="3.6" fill="#FFFFFF"/><circle cx="-6.6" cy="-24" r="2" fill="' + C.inchiostro + '"/>' +
      '<path d="M-21 -15 Q-12 -4 -2 -14" stroke="' + C.inchiostro + '" stroke-width="2" fill="' + C.rossoScuro + '" stroke-linejoin="round"/>' +
      '<circle cx="-21" cy="-16" r="2.4" fill="#FF8F8F" opacity=".7"/><circle cx="-1" cy="-16" r="2.4" fill="#FF8F8F" opacity=".7"/>' +
      '<rect x="-14" y="-2" width="28" height="5" rx="2.5" fill="' + K.scuro + '"/></g>';
  }
  return '<g><circle cx="0" cy="-12" r="15" fill="' + K.corpo + '" stroke="' + K.scuro + '" stroke-width="2.5"/>' +
    '<path d="M-9 -22 Q0 -27 9 -22" stroke="' + K.chiaro + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<path d="M-14 -12 L14 -12" stroke="' + K.scuro + '" stroke-width="2" opacity=".5"/>' +
    (dentro ? '<g transform="translate(0 -26)">' + dentro + '</g>' : '') +
    '<rect x="-12" y="-1" width="24" height="5" rx="2.5" fill="' + K.scuro + '"/></g>';
};
// Chi siede sul Bruco: un biglietto con gli occhi (un pezzo intero), piccolo, del colore che gli dà il Bruco.
window.G.S2.sulBruco = function (col) { return '<g transform="scale(.17) translate(-102 -150)">' + window.G.pezzo(col, '') + '</g>'; };
// La giostrina, in due strati: dietro (il binario, la pedana) e davanti (la mela, la vasca piccola, la sbarra); in mezzo,
// i segmenti (G.S2.posaBruco). o.sbarra: 0 alzata, 1 abbassata; o.luci: da 0 (spente) a 1.
window.G.S2.giostrina = function (o) {
  o = o || {};
  const G = window.G, C = G.C, K = G.S2.COLORI_BRUCO, B = G.S2.BRUCO, [cx, cy] = B.c, [mx, my] = B.mela, [vx, vy] = B.vasca;
  const luci = o.luci === undefined ? 1 : o.luci;
  let lampadine = '';
  for (let k = 0; k < 14; k++) { const a = Math.PI * (0.05 + k / 13 * 0.9); lampadine += '<circle cx="' + (cx + (B.rx + 16) * Math.cos(a)).toFixed(1) + '" cy="' + (cy + 12 + (B.ry + 10) * Math.sin(a)).toFixed(1) + '" r="2.6" fill="' + (k % 2 ? C.luce : '#9BE07A') + '" opacity="' + (0.25 + 0.75 * luci).toFixed(2) + '"/>'; }
  const dietro = '<g class="g-bruco-dietro">' +
    '<ellipse cx="' + cx + '" cy="' + (cy + 18) + '" rx="' + (B.rx + 34) + '" ry="' + (B.ry + 28) + '" fill="#241E44"/>' +
    '<ellipse cx="' + cx + '" cy="' + (cy + 12) + '" rx="' + (B.rx + 22) + '" ry="' + (B.ry + 16) + '" fill="' + C.legno + '" stroke="' + C.legnoScuro + '" stroke-width="3"/>' +
    '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + B.rx + '" ry="' + B.ry + '" fill="none" stroke="' + C.legnoScuro + '" stroke-width="10" stroke-dasharray="3 6"/>' +
    '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + B.rx + '" ry="' + B.ry + '" fill="none" stroke="' + C.acciaio + '" stroke-width="3"/>' +
    '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + (B.rx - 40) + '" ry="' + (B.ry - 14) + '" fill="#3F8A2E" opacity=".55"/>' + lampadine + '</g>';
  // La mela: una piccola montagna rossa e lucida, col picciolo e la foglia; il binario ci entra da una galleria.
  const mela = '<g class="g-bruco-mela" transform="translate(' + mx + ' ' + (my + 86) + ') scale(.78) translate(' + (-mx) + ' ' + (-my - 86) + ')"><path d="M' + mx + ' ' + (my - 70) + ' C' + (mx - 40) + ' ' + (my - 96) + ' ' + (mx - 116) + ' ' + (my - 74) + ' ' + (mx - 112) + ' ' + (my + 6) +
    ' C' + (mx - 108) + ' ' + (my + 60) + ' ' + (mx - 70) + ' ' + (my + 86) + ' ' + (mx - 30) + ' ' + (my + 86) + ' L' + (mx + 30) + ' ' + (my + 86) +
    ' C' + (mx + 70) + ' ' + (my + 86) + ' ' + (mx + 108) + ' ' + (my + 60) + ' ' + (mx + 112) + ' ' + (my + 6) + ' C' + (mx + 116) + ' ' + (my - 74) + ' ' + (mx + 40) + ' ' + (my - 96) + ' ' + mx + ' ' + (my - 70) + ' Z" fill="' + K.mela + '" stroke="' + K.melaScura + '" stroke-width="4"/>' +
    '<path d="M' + (mx - 70) + ' ' + (my - 40) + ' Q' + (mx - 84) + ' ' + (my - 4) + ' ' + (mx - 70) + ' ' + (my + 30) + '" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round" fill="none" opacity=".35"/>' +
    '<path d="M' + mx + ' ' + (my - 70) + ' Q' + (mx + 4) + ' ' + (my - 92) + ' ' + (mx + 14) + ' ' + (my - 104) + '" stroke="' + C.legnoScuro + '" stroke-width="7" stroke-linecap="round" fill="none"/>' +
    '<path d="M' + (mx + 10) + ' ' + (my - 92) + ' Q' + (mx + 44) + ' ' + (my - 118) + ' ' + (mx + 62) + ' ' + (my - 94) + ' Q' + (mx + 34) + ' ' + (my - 76) + ' ' + (mx + 10) + ' ' + (my - 92) + ' Z" fill="' + K.foglia + '" stroke="' + K.scuro + '" stroke-width="2.5"/>' +
    // La galleria, sul davanti a sinistra: il bruco ci entra e ne esce.
    '<path d="M' + (mx - 104) + ' ' + (my + 66) + ' L' + (mx - 104) + ' ' + (my + 34) + ' Q' + (mx - 82) + ' ' + (my + 6) + ' ' + (mx - 58) + ' ' + (my + 34) + ' L' + (mx - 56) + ' ' + (my + 70) + ' Z" fill="' + C.buio + '" stroke="' + K.melaScura + '" stroke-width="4"/>' +
    [[-100, 32], [-82, 14], [-62, 30]].map(([dx, dy]) => '<circle cx="' + (mx + dx) + '" cy="' + (my + dy) + '" r="3" fill="' + C.luce + '" opacity="' + (0.3 + 0.7 * luci).toFixed(2) + '"/>').join('') + '</g>';
  const vasca = '<g class="g-bruco-vasca"><path d="M' + (vx - 46) + ' ' + vy + ' L' + (vx + 46) + ' ' + vy + ' L' + (vx + 40) + ' ' + (vy + 20) + ' Q' + vx + ' ' + (vy + 27) + ' ' + (vx - 40) + ' ' + (vy + 20) + ' Z" fill="' + C.legno + '" stroke="' + C.legnoScuro + '" stroke-width="3"/>' +
    '<ellipse cx="' + vx + '" cy="' + vy + '" rx="46" ry="7" fill="url(#g-acqua)" stroke="' + C.legnoScuro + '" stroke-width="3"/>' +
    // Il cartello della vasca piccola: due paperelle, una verde e una rossa (la vasca grande ne ha una gialla).
    '<line x1="' + (vx + 66) + '" y1="' + (vy + 22) + '" x2="' + (vx + 66) + '" y2="' + (vy - 4) + '" stroke="' + C.legnoScuro + '" stroke-width="4"/>' +
    '<rect x="' + (vx + 46) + '" y="' + (vy - 22) + '" width="40" height="20" rx="10" fill="' + C.crema + '" stroke="' + C.oro + '" stroke-width="3"/>' +
    '<g transform="translate(' + (vx + 49) + ' ' + (vy - 21) + ') scale(.17)">' + G.paperella('#3cb45a') + '</g><g transform="translate(' + (vx + 66) + ' ' + (vy - 21) + ') scale(.17)">' + G.paperella('#dc3c32') + '</g></g>';
  const [sx, sy] = B.sbarra, giu = o.sbarra || 0;
  let righe = '';
  for (let k = 0; k < 6; k++) righe += '<rect x="' + (k * 16) + '" y="-4" width="8" height="8" fill="' + C.rosso + '"/>';
  // La sbarra: alzata sta in piedi; abbassata sbarra la strada verso la stazione (punta a sinistra).
  const sbarra = '<g class="g-bruco-sbarra"><rect x="' + (sx - 6) + '" y="' + (sy - 40) + '" width="12" height="40" rx="3" fill="' + C.crema + '" stroke="' + C.legnoScuro + '" stroke-width="2.5"/>' +
    '<g class="g-bruco-asta" transform="' + G.S2.astaBruco(giu) + '"><rect x="0" y="-4" width="96" height="8" rx="4" fill="' + C.crema + '" stroke="' + C.legnoScuro + '" stroke-width="2"/>' + righe + '</g>' +
    '<circle cx="' + sx + '" cy="' + (sy - 34) + '" r="5" fill="' + C.rosso + '"/></g>';
  return { dietro, davanti: mela + vasca + sbarra };
};
// Posa i segmenti del Bruco lungo la pista (path: il <path> di G.S2.pistaBruco; s: dove sta la testa). Dietro la pista i
// segmenti sono un po' più piccoli e guardano dall'altra parte; chi è più indietro si disegna prima.
window.G.S2.posaBruco = function (els, path, s, passo) {
  const B = window.G.S2.BRUCO, L = path.getTotalLength(), cy = B.c[1];
  const pos = els.map((el, i) => {
    const si = ((s - i * (passo || B.passo)) % L + L) % L, p = path.getPointAtLength(si), q = path.getPointAtLength((si + 1) % L);
    const dietro = p.y < cy, sc = 1 - 0.14 * Math.max(0, (cy - p.y) / B.ry);
    el.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ') scale(' + ((q.x > p.x ? -1 : 1) * sc).toFixed(3) + ' ' + sc.toFixed(3) + ')');
    return { el, y: p.y, dietro };
  });
  const padre = els[0].parentNode;
  pos.sort((a, b) => a.y - b.y).forEach(p => padre.appendChild(p.el));
  return pos;
};
// L'asta della sbarra del Bruco: giu da 0 (alzata, in piedi) a 1 (abbassata, verso la stazione).
window.G.S2.astaBruco = function (giu) {
  const B = window.G.S2.BRUCO;
  return 'translate(' + B.sbarra[0] + ' ' + (B.sbarra[1] - 34) + ') rotate(' + (90 - 90 * giu).toFixed(1) + ') scale(-1 1)';
};
// Un giro sul Bruco. Il custode porta i biglietti: volano dalla sua mano sui segmenti e prendono vita, con i colori del
// Bruco (un pezzo intero, dal verde al rosso: G.S2.sulBruco); il Bruco fa un giro, passa nella mela, e quando esce, sotto
// l'ultimo segmento cadono nella vasca piccola le paperelle, verdi e rosse (dal modellino); il Bruco si ferma. Poi (con
// t.carta) i passeggeri tornano biglietti e il vento se li porta via. Il Bruco ha un segmento per biglietto, più la testa.
// o: { id, parole, vestiti, uscita (l'ultimo, dopo il giro), rosse, verdi, seme, faccia, mano: [x, y] (da dove volano i
//      biglietti), riporta (t => [x, y]: invece del vento, i biglietti tornano nella mano del custode),
//      t: { sale (il primo biglietto), passo (tra un biglietto e l'altro), parte, giro (quanto dura), carta } }.
// .bruco, .biglietti, .papere: gli SVG (il bruco tra G.S2.giostrina().dietro e .davanti; le papere sopra la vasca piccola).
// Dopo costruisciMondo, monta(m); render(t) restituisce { rosse, verdi, cadute } (quante ne sono cadute).
window.G.S2.giroBruco = function (o) {
  const G = window.G, S2 = G.S2, B = S2.BRUCO, T = o.t, n = o.parole.length, id = o.id;
  // Dove si ferma la testa: più avanti se il Bruco è lungo, così la coda resta fuori dalla mela.
  const FERMO = 140 + (n + 1) * B.passo;
  const c01 = x => Math.max(0, Math.min(1, x)), seg = (t, a, b) => c01((t - a) / (b - a)), lerp = (a, b, p) => a + (b - a) * p;
  const eo = x => 1 - Math.pow(1 - c01(x), 3), eio = x => { x = c01(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  const ROSSA = '#dc3c32', VERDE = '#3cb45a';
  const r = G.rng(o.seme || 5), papere = [];
  for (let k = 0; k < o.rosse + o.verdi; k++) papere.push({ col: k < o.rosse ? ROSSA : VERDE });
  for (let i = papere.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [papere[i], papere[j]] = [papere[j], papere[i]]; }
  papere.forEach((p, i) => { p.x = B.vasca[0] - 38 + r() * 76; p.y = B.vasca[1] - 1 + (i % 3) * 2.4 + r() * 1.5; });
  const g = {
    bruco: '<g class="gb-' + id + '">' + Array.from({ length: n + 1 }, (_, i) => '<g class="gb-seg" data-i="' + i + '"></g>').join('') + '</g>',
    biglietti: o.parole.map(w => '<g class="gb-big-' + id + '" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(w) + '</g></g>').join(''),
    papere: papere.map((p, i) => '<g class="gb-pap-' + id + '" opacity="0"><g transform="translate(-50 -84)">' + G.paperella(p.col) + '</g></g>').join(''),
    monta(m) {
      this.m = m;
      m.cam.insertAdjacentHTML('beforeend', '<path class="gb-pista-' + id + '" d="' + S2.pistaBruco() + '" fill="none"/>');
      this.path = m.q('.gb-pista-' + id); this.L = this.path.getTotalLength();
      this.segs = m.qa('.gb-' + id + ' .gb-seg'); this.big = m.qa('.gb-big-' + id); this.pap = m.qa('.gb-pap-' + id);
      this.stati = [];
      this.sAt = t => FERMO + this.L * eio(seg(t, T.parte, T.parte + T.giro));
      // Quando cade ogni paperella: quando l'ultimo segmento, uscito dalla mela, le passa sopra.
      this.cade = papere.map(p => {
        for (let t = T.parte + T.giro * 0.5; t < T.parte + T.giro; t += 0.02) {
          const sl = this.sAt(t) - n * B.passo, q = this.path.getPointAtLength(((sl % this.L) + this.L) % this.L);
          if (q.y > B.c[1] && q.x <= p.x + 4) return t;
        }
        return T.parte + T.giro;
      });
      // I sedili, quando il Bruco è fermo: dove volano i biglietti.
      this.sedili = o.parole.map((w, i) => { const q = this.path.getPointAtLength(FERMO - (i + 1) * B.passo); return [q.x, q.y - 26]; });
    },
    render(t) {
      const s = this.sAt(t), giro = seg(t, T.parte, T.parte + T.giro);
      // Chi siede dove: vivo (dopo il suo biglietto), di carta (dopo t.carta, e poi via col vento), o nessuno.
      this.segs.forEach((el, i) => {
        let k = 'testa', html;
        if (i === 0) html = S2.segmento(true, '', { faccia: o.faccia });
        else {
          const j = i - 1, nasce = T.sale + j * T.passo + 0.9, vivo = t >= nasce && (T.carta === undefined || t < T.carta);
          let col = o.vestiti[j];
          if (j === n - 1) col = G.mix(o.vestiti[j], o.uscita, Math.round(eio(seg(giro, 0.35, 0.8)) * 8) / 8);
          k = vivo ? col : 'vuoto';
          html = S2.segmento(false, vivo ? S2.sulBruco(col) : '');
        }
        if (this.stati[i] !== k) { el.innerHTML = html; this.stati[i] = k; }
      });
      S2.posaBruco(this.segs, this.path, s);
      // I biglietti: volano dalla mano del custode ai sedili; poi, tornati di carta, il vento se li porta via.
      this.big.forEach((b, j) => {
        const a = T.sale + j * T.passo, u = eio(seg(t, a, a + 0.8)), [sx, sy] = this.sedili[j], [mx, my] = o.mano;
        let x = lerp(mx, sx, u), y = lerp(my, sy, u) - 26 * Math.sin(Math.PI * u), sc = 0.16, op = t < a ? 0 : 1 - seg(t, a + 0.75, a + 0.95), rot = 0;
        if (T.carta !== undefined && t >= T.carta && o.riporta) {
          // Il custode se li riprende: tornano nella sua mano (o.riporta: dove sta la mano, adesso).
          const w = eio(seg(t, T.carta + 0.3 + j * 0.15, T.carta + 1.1 + j * 0.15)), [rx, ry] = o.riporta(t);
          x = lerp(sx, rx + 2 * j, w); y = lerp(sy, ry - 3 - 2 * j, w) - 20 * Math.sin(Math.PI * w); rot = (-12 + 8 * j) * w;
          op = seg(t, T.carta, T.carta + 0.3); sc = lerp(0.16, 0.13, w);
        } else if (T.carta !== undefined && t >= T.carta) {
          const v = seg(t, T.carta + 0.4 + j * 0.15, T.carta + 2.6 + j * 0.15), w = eio(v);
          x = sx + 260 * w + 30 * Math.sin(v * 9 + j); y = sy - 220 * w + 10 * Math.sin(v * 7); rot = 300 * w * (j % 2 ? 1 : -1);
          op = seg(t, T.carta, T.carta + 0.3) * (1 - seg(v, 0.7, 1));
        }
        b.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + rot.toFixed(1) + ') scale(' + sc + ')');
        b.setAttribute('opacity', op.toFixed(3));
      });
      // Le paperelle della vasca piccola.
      let cadute = 0, rosse = 0, verdi = 0;
      this.pap.forEach((el, i) => {
        const t0 = this.cade[i], p = papere[i], u = seg(t, t0, t0 + 0.45);
        if (u > 0) { cadute++; if (p.col === ROSSA) rosse++; else verdi++; }
        const via = T.carta !== undefined ? eio(seg(t, T.carta + 0.2 + (i % 5) * 0.1, T.carta + 1.4 + (i % 5) * 0.1)) : 0;
        const y = lerp(p.y - 30, p.y, eo(u)) + (u >= 1 ? 0.6 * Math.sin(t * 2.4 + i) : 0);
        el.setAttribute('transform', 'translate(' + lerp(p.x, B.vasca[0], via).toFixed(1) + ' ' + lerp(y, B.vasca[1] + 3, via).toFixed(1) + ') scale(' + (0.09 * (1 - via)).toFixed(4) + ')');
        el.setAttribute('opacity', t < t0 ? 0 : (1 - seg(via, 0.85, 1)).toFixed(3));
      });
      return { rosse, verdi, cadute };
    },
  };
  return g;
};
// Il Bruco fermo, con la testa e tre segmenti vuoti, per le scene della seconda stagione che non lo fanno girare
// (G.mondo({ bruco: 'buio' | 'acceso' })): nell'angolo buio si intravede appena; acceso, ha le luci accese.
window.G.S2.brucoFermo = function (stato) {
  const S2 = window.G.S2, B = S2.BRUCO, gio = S2.giostrina({ sbarra: 0, luci: stato === 'acceso' ? 1 : 0.25 }), L = 444;
  let segm = '';
  for (let i = 3; i >= 0; i--) {
    const a = Math.PI * (140 + 4 * B.passo - i * B.passo) / L;
    segm += '<g transform="translate(' + (B.c[0] + B.rx * Math.cos(a)).toFixed(1) + ' ' + (B.c[1] + B.ry * Math.sin(a)).toFixed(1) + ')">' + S2.segmento(i === 0) + '</g>';
  }
  const buio = stato === 'acceso' ? 0.14 : 0.62;
  return '<g class="g-bruco-fermo">' + gio.dietro + segm + gio.davanti +
    '<ellipse cx="' + (B.c[0] + 20) + '" cy="' + (B.c[1] - 10) + '" rx="420" ry="200" fill="#05070F" opacity="' + buio + '" filter="url(#g-velo)"/></g>';
};
// La teleferica (stagione 2, episodio 3): da un palo accanto alla guardiola, vicino al cancello, un filo sale al pilone sulla
// cima della collina (dietro la ruota panoramica) e da lì oltre le colline, fino a sparire tra le nuvole di pioggia. Sul
// filo è appesa una cabina viola. Coordinate del paesaggio (G.costruisciPaesaggio). TELEFERICA.filo: i punti del filo.
window.G.S2.TELEFERICA = { filo: [[1826, 762], [2550, 452], [3700, -420]], nuvole: [3760, -470] };
// o.luce: da 0 (spenta) a 1, le lampadine del pilone; o.filo: da 0 a 1, quanto filo si vede (si accende dal basso).
window.G.S2.teleferica = function (o) {
  o = o || {};
  const G = window.G, C = G.C, T = G.S2.TELEFERICA, [a, b, c] = T.filo, luce = o.luce === undefined ? 1 : o.luce, filo = o.filo === undefined ? 1 : o.filo;
  const traliccio = (x, y0, y1, w) => '<path d="M' + (x - w) + ' ' + y0 + ' L' + (x - 3) + ' ' + y1 + ' L' + (x + 3) + ' ' + y1 + ' L' + (x + w) + ' ' + y0 + '" fill="none" stroke="#3E3A72" stroke-width="4"/>' +
    [0.25, 0.5, 0.75].map(u => { const y = y0 + (y1 - y0) * u, ww = w + (3 - w) * u; return '<path d="M' + (x - ww) + ' ' + y + ' L' + (x + ww) + ' ' + y + '" stroke="#3E3A72" stroke-width="3"/>'; }).join('') +
    '<path d="M' + (x - w) + ' ' + y0 + ' L' + (x + w * 0.5) + ' ' + (y0 + (y1 - y0) * 0.5) + ' M' + (x + w) + ' ' + y0 + ' L' + (x - w * 0.5) + ' ' + (y0 + (y1 - y0) * 0.5) + '" stroke="#3E3A72" stroke-width="2"/>';
  const ruota = (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="7" fill="#2A2440" stroke="' + C.acciaio + '" stroke-width="2.5"/><circle cx="' + x + '" cy="' + y + '" r="2" fill="' + C.oro + '"/>';
  const lamp = (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="4" fill="' + mix('#3A3440', C.luce, luce) + '"/>' + (luce > 0 ? '<circle cx="' + x + '" cy="' + y + '" r="16" fill="' + C.luce + '" opacity="' + (0.5 * luce).toFixed(2) + '" filter="url(#g-glow)"/>' : '');
  // Le nuvole di pioggia, oltre le colline, dove sparisce il filo.
  const [nx, ny] = T.nuvole;
  let pioggia = '';
  for (let k = 0; k < 26; k++) { const x = nx - 260 + k * 20 + (k % 3) * 6, y = ny + 70 + (k % 4) * 30; pioggia += 'M' + x + ' ' + y + ' l-10 44 '; }
  const nuvole = '<g class="g-tel-nuvole"><path d="' + pioggia + '" stroke="#7FA8D8" stroke-width="3" opacity=".55" stroke-linecap="round"/>' +
    [[-200, 30, 130], [-60, -10, 170], [120, 20, 150], [260, 50, 110]].map(([dx, dy, r]) => '<ellipse cx="' + (nx + dx) + '" cy="' + (ny + dy) + '" rx="' + r + '" ry="' + (r * 0.55).toFixed(0) + '" fill="#4A4F72"/>').join('') +
    '<ellipse cx="' + nx + '" cy="' + (ny + 64) + '" rx="380" ry="40" fill="#3A3E60"/></g>';
  // Il filo, che si accende dal basso verso le nuvole.
  const L1 = Math.hypot(b[0] - a[0], b[1] - a[1]), L2 = Math.hypot(c[0] - b[0], c[1] - b[1]), Lf = (L1 + L2) * filo;
  const d = 'M' + a[0] + ' ' + a[1] + ' L' + b[0] + ' ' + b[1] + ' L' + c[0] + ' ' + c[1];
  return '<g class="g-teleferica">' + nuvole +
    // Il palo dietro la guardiola, con la sua ruota; il pilone sulla cima, con le lampadine.
    traliccio(a[0], 870, a[1] - 6, 14) + ruota(a[0], a[1]) +
    traliccio(b[0], 560, b[1] - 6, 22) + ruota(b[0], b[1]) + lamp(b[0] - 12, b[1] + 30) + lamp(b[0] + 12, b[1] + 30) + lamp(b[0], b[1] - 14) +
    '<path d="' + d + '" fill="none" stroke="#C9CBD4" stroke-width="3.4" stroke-dasharray="' + Lf.toFixed(1) + ' 9999"/></g>';
};
// La cabina viola, appesa al filo per il gancio nel punto (0, 0); alta 40. o.gocce: da 0 a 1, quanto gocciola.
window.G.S2.cabina = function (o) {
  o = o || {};
  const C = window.G.C, g = o.gocce || 0, t = o.t || 0;
  let gocce = '';
  if (g > 0) for (let k = 0; k < 4; k++) { const u = ((t * 1.3 + k * 0.27) % 1); gocce += '<ellipse cx="' + (-10 + k * 7) + '" cy="' + (42 + 30 * u) + '" rx="1.6" ry="2.6" fill="#9CC8F0" opacity="' + (g * (1 - u)).toFixed(2) + '"/>'; }
  return '<g><path d="M0 0 L0 10" stroke="#5A5F80" stroke-width="2.4"/><circle cx="0" cy="0" r="3.4" fill="#5A5F80"/>' +
    '<path d="M-16 12 L16 12 L18 18 L-18 18 Z" fill="#6E3FA8"/>' +
    '<rect x="-15" y="17" width="30" height="22" rx="4" fill="#A064D7" stroke="#5A328C" stroke-width="2"/>' +
    '<rect x="-11" y="21" width="22" height="9" rx="2" fill="' + C.luce + '" opacity=".75"/><path d="M0 21 L0 30" stroke="#5A328C" stroke-width="1.6"/>' +
    (o.rotolo ? '<g transform="translate(0 26) scale(.1)">' + window.G.rotolo() + '</g>' : '') + gocce + '</g>';
};
// Dove sta la cabina quando ha fatto la frazione u del suo viaggio (0: al palo della guardiola, 1: tra le nuvole).
window.G.S2.puntoCabina = function (u) {
  const [a, b, c] = window.G.S2.TELEFERICA.filo, L1 = Math.hypot(b[0] - a[0], b[1] - a[1]), L2 = Math.hypot(c[0] - b[0], c[1] - b[1]);
  const d = Math.max(0, Math.min(1, u)) * (L1 + L2);
  if (d <= L1) return [a[0] + (b[0] - a[0]) * d / L1, a[1] + (b[1] - a[1]) * d / L1];
  const v = (d - L1) / L2;
  return [b[0] + (c[0] - b[0]) * v, b[1] + (c[1] - b[1]) * v];
};
// Un treno dalle sole parole del modellino (frase) e dai tratti dell'ultimo passeggero (gli unici che il modellino calcola
// per i giri con la vasca dichiarata). I primi quattro (la bandierina d'oro e «Storie di mare») hanno i colori di sempre;
// gli altri il colore del loro biglietto (bandierine, biglietti e paperelle dal modellino).
window.G.S2.trenoDa = function (frase, trattiUltimo) {
  const G = window.G, S = G.MOD.seconda, capo = S.parco.giri[0].passeggeri;
  const colore = w => S.parco.bandierine[w] || S.teleferica.biglietti[w] || S.teleferica.paperelle[w] || S.parco.biglietti[w] ||
    (G.MOD.finisce.passeggeri[w] || {}).biglietto || '#96969f';
  return frase.map((w, i) => {
    if (i < 4 && capo[i].parola === w) return this.chi(capo[i]);
    const b = colore(w);
    return this.chi({ parola: w, biglietto: b, tratti: i === frase.length - 1 ? trattiUltimo : [b] });
  });
};
// L'orologio da tasca del custode, da vicino (stagione 2, episodio 4): d'ottone, il quadrante crema senza numeri, solo
// tacche; al posto della corona, una campanella piccola come un ditale, con la cordicella. Centrato in (0, 0), raggio 100.
// o.lancetta: da 0 (in basso) a 1 (in cima, alla campanella), a scatti di una tacca per giro (o.tacche, di solito 4);
// o.suona: di quanti gradi oscilla la campanella; o.tira: da 0 a 1, la cordicella tirata giù.
window.G.S2.orologio = function (o) {
  o = o || {};
  const C = window.G.C, n = o.tacche || 4, a = Math.PI * (1 + (o.lancetta || 0));
  let tacche = '';
  for (let k = 0; k <= n; k++) { const b = Math.PI * (1 + k / n), x = Math.sin(b), y = -Math.cos(b); tacche += '<path d="M' + (72 * x).toFixed(1) + ' ' + (72 * y).toFixed(1) + ' L' + (84 * x).toFixed(1) + ' ' + (84 * y).toFixed(1) + '" stroke="' + C.inchiostro + '" stroke-width="' + (k === n ? 7 : 5) + '" stroke-linecap="round"/>'; }
  const tira = o.tira || 0;
  return '<g><circle r="100" fill="#E0A93B" stroke="#8C6420" stroke-width="6"/><circle r="88" fill="' + C.crema + '" stroke="#C9A060" stroke-width="3"/>' + tacche +
    '<path d="M0 0 L' + (64 * Math.sin(a)).toFixed(1) + ' ' + (-64 * Math.cos(a)).toFixed(1) + '" stroke="' + C.inchiostro + '" stroke-width="7" stroke-linecap="round"/><circle r="9" fill="#8C6420"/>' +
    '<path d="M-60 -50 Q-30 -76 10 -80" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round" opacity=".5"/>' +
    // La campanella, sopra, e la sua cordicella.
    '<rect x="-10" y="-112" width="20" height="14" rx="3" fill="#E0A93B" stroke="#8C6420" stroke-width="3"/>' +
    '<g transform="rotate(' + (o.suona || 0).toFixed(1) + ' 0 -150)"><path d="M0 -150 Q-26 -150 -28 -124 L-34 -114 L34 -114 L28 -124 Q26 -150 0 -150 Z" fill="#E0A93B" stroke="#8C6420" stroke-width="4" stroke-linejoin="round"/>' +
    '<circle cy="-108" r="7" fill="#8C6420"/><circle cx="0" cy="-154" r="5" fill="#8C6420"/></g>' +
    '<path d="M24 -118 Q60 -100 ' + (70 - 6 * tira).toFixed(1) + ' ' + (-40 + 50 * tira).toFixed(1) + '" stroke="#7E2F3F" stroke-width="4" fill="none" stroke-linecap="round"/>' +
    '<circle cx="' + (70 - 6 * tira).toFixed(1) + '" cy="' + (-34 + 50 * tira).toFixed(1) + '" r="7" fill="#7E2F3F"/></g>';
};
// Un lampione del viale (stagione 2, episodio 4): il palo nero, la lanterna in cima. I piedi in (0, 0), alto 92. acceso 0..1.
window.G.S2.lampione = function (acceso) {
  const C = window.G.C, a = acceso || 0;
  return '<g><path d="M0 0 L0 -78" stroke="#2A2440" stroke-width="5"/><path d="M-8 0 L8 0" stroke="#2A2440" stroke-width="6" stroke-linecap="round"/>' +
    (a > 0 ? '<circle cx="0" cy="-84" r="34" fill="' + C.luce + '" opacity="' + (0.35 * a).toFixed(2) + '" filter="url(#g-soft)"/>' : '') +
    '<path d="M-8 -78 L8 -78 L10 -92 L-10 -92 Z" fill="' + mix('#3A3440', '#FFE7A8', a) + '" stroke="#2A2440" stroke-width="2.5"/><path d="M-12 -92 L12 -92 L0 -100 Z" fill="#2A2440"/></g>';
};
// Il lucchetto del cancello: centrato in (0, 0), largo 16.
window.G.S2.lucchetto = function () {
  return '<g><path d="M-5 -2 L-5 -8 Q-5 -14 0 -14 Q5 -14 5 -8 L5 -2" stroke="#9AA3CF" stroke-width="2.6" fill="none"/><rect x="-8" y="-3" width="16" height="12" rx="2.5" fill="#E0A93B" stroke="#8C6420" stroke-width="1.6"/><circle cx="0" cy="2.5" r="1.6" fill="#8C6420"/></g>';
};
// La panchina della stazione: di legno, con lo schienale a doghe. I piedi in (0, 0), larga 84; il sedile a y = -20.
window.G.S2.panchina = function () {
  const C = window.G.C;
  return '<g><path d="M-36 0 L-36 -20 M36 0 L36 -20 M-34 -20 L-34 -44 M34 -20 L34 -44" stroke="#2A2440" stroke-width="4"/>' +
    '<rect x="-42" y="-24" width="84" height="6" rx="2" fill="' + C.legno + '" stroke="' + C.legnoScuro + '" stroke-width="1.5"/>' +
    '<rect x="-42" y="-44" width="84" height="5" rx="2" fill="' + C.legno + '" stroke="' + C.legnoScuro + '" stroke-width="1.5"/><rect x="-42" y="-36" width="84" height="5" rx="2" fill="' + C.legno + '" stroke="' + C.legnoScuro + '" stroke-width="1.5"/></g>';
};
// I lampioni del viale: dai piedi della ruota su fino alla guardiola, lungo il piede della collina. Coordinate del mondo.
window.G.S2.VIALE = [[1560, 1006], [1650, 996], [1740, 960], [1814, 908]];
// Dentro la montagna, un giro intero con le finestre sulla vasca (stagione 2): il treno corre nel fascio di binari, si
// accendono i fili (da ogni passeggero verso chi gli siede davanti), gli scambi spostano ogni vagone sul suo binario e
// l'ultimo è tirato via; tre finestre ad arco sull'acqua, e alla terza la camera si avvicina. In fondo, la luce dell'uscita.
// È la scena delle finestre degli episodi 10–12 resa riutilizzabile, anche dentro un'altra scena (o.t0, o.scala).
// o: { pre, chi (G.S2.chi…, coi tratti), primo (il colore dell'ultimo prima dei fili: di solito c.biglietto), dopoFili
//      (il colore dell'ultimo dopo i fili), fili(i, j) → peso (solo per l'ultimo vagone; gli altri hanno fili sottili),
//      finestre: [conta, conta, conta], seme, t0 (quando comincia, nel tempo della scena), scala (1: 40 secondi),
//      testa (la camera all'inizio guarda tutto il treno: true; o la coda) }.
// Monta un <div class="ground"> nella scena; render(t) lo anima e restituisce l'opacità della luce dell'uscita.
window.G.S2.dentro = function (kit, o) {
  const G = window.G, C = G.C, I = G.INTERNO, N = o.chi.length, U = N - 1, sc = o.scala || 1, t0 = o.t0 || 0;
  const c01 = x => Math.max(0, Math.min(1, x)), seg = (t, a, b) => c01((t - a) / (b - a)), lerp = (a, b, p) => a + (b - a) * p;
  const eo = x => 1 - Math.pow(1 - c01(x), 3), eio = x => { x = c01(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  const VEL = [[0, 300], [7.0, 300], [7.6, 520], [11.4, 520], [12.4, 40], [13.8, 40], [14.6, 520], [20.8, 520], [21.8, 40], [23.2, 40],
    [24.0, 520], [30.2, 520], [31.2, 40], [31.8, 30], [37.6, 30], [39.0, 320]];
  const ULTIMO = [13.0, 22.4, 31.8], uX = I.centri[U];
  const CAM = [
    { t: 0, cx: uX - 30, cy: 560, z: 1.05 }, { t: 1.6, cx: uX - 30, cy: 560, z: 1.05 },
    o.testa ? { t: 3.6, cx: (I.centri[0] + uX) / 2, cy: 540, z: Math.min(1, 1700 / (uX - I.centri[0] + 400)) } : { t: 3.6, cx: uX - 1150, cy: 500, z: 0.55 },
    o.testa ? { t: 10.4, cx: (I.centri[0] + uX) / 2, cy: 540, z: Math.min(1, 1700 / (uX - I.centri[0] + 400)) } : { t: 10.4, cx: uX - 1150, cy: 500, z: 0.55 },
    { t: 12.0, cx: uX - 380, cy: 520, z: 0.8 }, { t: 30.2, cx: uX - 380, cy: 520, z: 0.8 },
    { t: 31.6, cx: uX, cy: 470, z: 1.25 }, { t: 37.4, cx: uX, cy: 470, z: 1.25 }, { t: 39.8, cx: uX - 380, cy: 520, z: 0.8 },
  ];
  const CORSIE = [Array(N).fill(2), Array.from({ length: N }, (_, i) => [3, 1, 1, 3, 1][i % 5]), Array.from({ length: N }, (_, i) => [2, 0, 4, 2, 0, 4, 2][i % 7]), Array.from({ length: N }, (_, i) => [3, 1, 3, 1, 1][i % 5])];
  const passo = Math.min(0.16, 1.4 / N);
  const TRATTI = [
    { fili: 1.6, disegna: Math.min(0.2, 2 / N), spegne: [5.6, 6.4], scambi: 6.2, passo },
    { fili: 15.0, disegna: Math.min(0.06, 0.6 / N), spegne: [16.6, 17.4], scambi: 16.6, passo: passo * 0.8 },
    { fili: 24.4, disegna: Math.min(0.06, 0.6 / N), spegne: [26.0, 26.8], scambi: 26.0, passo: passo * 0.8 },
  ];
  const tipi = o.chi.map(c => c.tipo);
  const tappe = o.chi.map((c, i) => [i === U ? (o.dopoFili || c.biglietto) : c.biglietto].concat(c.tratti && c.tratti.length === 3 ? c.tratti : [c.biglietto, c.biglietto, c.biglietto]));
  const primo = o.primo || o.chi[U].biglietto, STOFFA = [3.4, 5.4];
  const scambi = TRATTI.map((tr, n) => o.chi.map((_, i) => ({ t: tr.scambi + tr.passo * i, da: CORSIE[n][i], a: CORSIE[n + 1][i] })));
  const pre = o.pre || 'dentro';
  const finestre = ULTIMO.map((_, k) => '<g class="d-finestra">' + G.finestra(pre + k) + '</g>').join('');
  const scambiSvg = scambi.map((tr, n) => tr.map((s, i) => {
    const yd = I.corsie[s.da], ya = I.corsie[s.a];
    return '<g class="d-scambio" data-n="' + n + '" data-i="' + i + '"><path d="M0 ' + ya + ' C60 ' + ya + ' 80 ' + yd + ' 160 ' + yd + '" stroke="' + C.acciaio + '" stroke-width="5" fill="none"/>' +
      '<g transform="translate(150 ' + (Math.max(yd, ya) + 46) + ')"><rect x="-4" y="-34" width="8" height="40" fill="' + C.acciaioScuro + '"/><g class="d-disco"><circle cy="-40" r="14" fill="' + C.rosso + '" stroke="' + C.crema + '" stroke-width="3"/><rect x="-12" y="-43" width="24" height="6" fill="' + C.crema + '"/></g></g></g>';
  }).join('')).join('');
  const L = uX + 3000;
  const fondo = '<rect x="-3000" y="-1500" width="' + (L + 3000) + '" height="4500" fill="#07060F"/><rect x="-3000" y="0" width="' + (L + 3000) + '" height="1080" fill="url(#g-interno)"/>';
  const binari = I.corsie.map(y => '<g><path d="M-3000 ' + (y + 6) + ' L' + L + ' ' + (y + 6) + '" stroke="' + C.legnoScuro + '" stroke-width="14" stroke-dasharray="6 22" class="g-traversine"/><path d="M-3000 ' + y + ' L' + L + ' ' + y + '" stroke="' + C.acciaio + '" stroke-width="4" opacity=".85"/></g>').join('');
  const linee = '<g class="d-linee" opacity="0"><path d="M0 -10 L60 -14 M4 14 L70 16 M0 38 L54 42" stroke="#FFF4E0" stroke-width="4" stroke-linecap="round"/></g>';
  const div = kit.h(G.unico('<div class="ground d-ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + G.interniDefs +
    '<defs><radialGradient id="g-uscita" cx="0" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
    '<g class="d-cam">' + fondo + G.interno(o.chi.map((c, i) => ({ tipo: c.tipo, col: i === U ? primo : tappe[i][0], o: c.o })), { corsie: I.corsie, finestre }) + '</g>' +
    '<rect class="d-luce" x="-200" y="-200" width="2400" height="1480" fill="url(#g-uscita)" opacity="0"/>' +
    '<rect class="d-nero" x="-200" y="-200" width="2400" height="1480" fill="#07060F"/></svg>' + (o.html || '') + '</div>', pre));
  kit.stage.append(div);
  const q = s => div.querySelector(s), qa = s => [...div.querySelectorAll(s)];
  const lont = q('.g-int-lontano'), vic = q('.g-int-vicino');
  const ripeti = (el, w) => { const x = el.innerHTML; let h = ''; for (let k = -1; k <= Math.ceil(L / w); k++) h += '<g transform="translate(' + (k * w) + ' 0)">' + x + '</g>'; el.innerHTML = h; };
  ripeti(lont, 3640); ripeti(vic, 3600);
  q('.g-int-binari').innerHTML = binari + scambiSvg;
  q('.g-int-treno').insertAdjacentHTML('beforeend', linee);
  const vag = qa('.g-vag'), basi = vag.map(v => v.getAttribute('transform')), fin = qa('.d-finestra'), scEl = qa('.d-scambio');
  const d = t => G.percorso(t, 0, VEL), dUltimo = ULTIMO.map(d);
  const rgb = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const dist = (a, b) => { const x = rgb(a), y = rgb(b); return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]); };
  const papere = fin.map((f, k) => {
    const lista = G.papereFinestra(o.finestre[k], (o.seme || 200) + k), stoffa = tappe[U][k + 1];
    f.querySelector('.g-fin-papere').innerHTML = lista.map(p => '<g class="d-pap"><g transform="translate(-50 -84)">' + G.paperellaDiLuce(p.col) + '</g></g>').join('');
    const els = [...f.querySelectorAll('.d-pap')];
    return lista.map((p, i) => ({ ...p, el: els[i], sim: Math.max(0, 1 - dist(p.col, stoffa) / 170) }));
  });
  const peso = (i, j) => i === U ? o.fili(j) : 1 / (i + 1);
  let fili = '';
  const filiD = [];
  TRATTI.forEach((tr, n) => {
    const dy = CORSIE[n].map(c => I.corsie[c] - I.ruote);
    for (let i = 0; i < N; i++) for (let j = 0; j <= i; j++) {
      const w = peso(i, j);
      if (!(w > 0)) continue;
      let p;
      if (i === j) p = G.anello(i, tipi[i], dy[i]);
      else { const a = G.cima(i, tipi[i], dy[i]), b = G.cima(j, tipi[j], dy[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 80 - 0.12 * Math.abs(a[0] - b[0]); p = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
      const ww = i === j ? 0.45 * w : w, ult = i === U;
      fili += '<path class="d-filo" d="' + p + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + (ult ? 14 : 6) * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>';
      filiD.push({ n, i, j, w, ult });
    }
  });
  q('.g-int-fili').innerHTML = G.unico(fili, pre);
  const filiEl = qa('.d-filo'), lung = filiEl.map(p => p.getTotalLength());
  const cam = q('.d-cam'), luce = q('.d-luce'), nero = q('.d-nero'), lin = q('.d-linee');
  const stati = [];
  return {
    div,
    render(tt) {
      const t = (tt - t0) / sc;
      cam.setAttribute('transform', G.camChiavi(CAM, t));
      nero.setAttribute('opacity', (1 - eio(seg(t, 0, 1.2))).toFixed(3));
      const dd = d(t);
      G.scorriInterno({ stage: div }, dd);
      vic.setAttribute('opacity', (1 - eio(seg(t, 30.4, 31.2)) * (1 - eio(seg(t, 37.6, 38.4)))).toFixed(3));
      const S = 1.6;
      fin.forEach((f, k) => {
        const x = uX + dd - dUltimo[k];
        f.setAttribute('transform', 'translate(' + (x - 180 * S).toFixed(1) + ' 36) scale(' + S + ')');
        const fuori = x < -2600 || x > L;
        f.setAttribute('opacity', fuori ? 0 : 1);
        if (fuori) return;
        const ex = (uX - (x - 180 * S)) / S;
        papere[k].forEach(p => {
          const a = ULTIMO[k] - 0.7 + p.quando * 1.4, u = seg(t, a, a + 0.4);
          if (u <= 0) { p.el.setAttribute('opacity', 0); return; }
          const corsa = k === 2 ? 1.6 : 1, v = eio(seg(t, a + 0.3, a + 2.6)) * p.sim;
          const px = p.x + Math.max(-60 * corsa, Math.min(60 * corsa, (ex - p.x) * 0.3 * corsa)) * v, py = Math.min(204, p.y + 18 * corsa * v);
          p.el.setAttribute('opacity', Math.min(1, u * 2).toFixed(3));
          p.el.setAttribute('transform', 'translate(' + px.toFixed(1) + ' ' + (py + 1.5 * Math.sin(t * 2.4 + p.x)).toFixed(1) + ') scale(' + (0.34 * (0.4 + 0.6 * eo(u)) * (1 + 0.12 * v)).toFixed(3) + ')');
        });
      });
      let li = 0;
      vag.forEach((v, i) => {
        let dy = I.corsie[2] - I.ruote, col = i === U ? G.mix(primo, tappe[U][0], Math.round(eio(seg(t, STOFFA[0], STOFFA[1])) * 12) / 12) : tappe[i][0], tir = 0;
        scambi.forEach((tr, n) => {
          const s = tr[i], p = eio(seg(t, s.t - 0.25, s.t + 0.3));
          if (t >= s.t - 0.25) dy = lerp(I.corsie[s.da], I.corsie[s.a], p) - I.ruote;
          if (t >= s.t) col = G.mix(tappe[i][n], tappe[i][n + 1], Math.round(eio(seg(t, s.t, s.t + 1.4)) * 12) / 12);
          tir = Math.max(tir, Math.sin(Math.PI * seg(t, s.t - 0.3, s.t + 0.9)));
        });
        v.setAttribute('transform', 'translate(0 ' + (dy + 2 * Math.sin(t * 5 + i * 1.3)).toFixed(2) + ') ' + basi[i]);
        const c = o.chi[i], tirata = i === U && tir > 0.15 && (c.tipo === 'bandierina' || c.tipo === 'emma' || c.tipo === 'chiama');
        const k = col + tirata;
        if (stati[i] !== k) { G.cambiaPasseggero(v, c.tipo, col, Object.assign({}, c.o, tirata ? { tirata: true } : {})); stati[i] = k; }
        if (i === U) {
          v.querySelector('.g-pass').setAttribute('transform', 'translate(140 40) rotate(' + (-9 * tir).toFixed(2) + ') translate(-140 -40)');
          const [hx, hy] = G.testa(U, c.tipo, dy);
          lin.setAttribute('transform', 'translate(' + (hx + 80) + ' ' + hy + ')');
          li = 0.7 * tir;
        }
      });
      lin.setAttribute('opacity', li.toFixed(3));
      scEl.forEach(g => {
        const n = +g.dataset.n, i = +g.dataset.i, s = scambi[n][i], x = I.centri[i] - 80 + dd - d(s.t);
        g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' 0)');
        g.setAttribute('opacity', x < -2600 || x > L ? 0 : 1);
        g.querySelector('.d-disco').setAttribute('transform', 'rotate(' + (90 * eio(seg(t, s.t - 0.45, s.t - 0.25))).toFixed(1) + ' 0 -40)');
      });
      filiEl.forEach((el, k) => {
        const f = filiD[k], tr = TRATTI[f.n], Lk = lung[k], a = tr.fili + tr.disegna * f.i + 0.04 * f.j, u = eo(seg(t, a, a + (f.n === 0 ? 1.2 : 0.6)));
        el.setAttribute('stroke-dasharray', Lk.toFixed(1));
        el.setAttribute('stroke-dashoffset', ((1 - u) * Lk).toFixed(1));
        el.setAttribute('opacity', (u > 0 ? (1 - eio(seg(t, tr.spegne[0], tr.spegne[1]))) * (f.ult ? 0.3 + 0.7 * f.w : 0.15 + 0.3 * f.w) * (1 + 0.08 * Math.sin(t * 3 + k)) : 0).toFixed(3));
      });
      const l = 0.95 * eio(seg(t, 37.6, 40.6));
      luce.setAttribute('opacity', l.toFixed(3));
      return l;
    },
  };
};
