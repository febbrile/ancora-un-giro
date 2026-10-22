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

// Il custode (fine dell'episodio 9, poi la seconda stagione): tiene il parco con la lanterna, le chiavi alla cintura,
// l'orologio da tasca e il regolamento sotto il braccio, un grosso libro senza scritte. Scatola 240×420, piedi a y = 410.
// pose: 'base' (la lanterna in mano), 'alza' (la lanterna alzata, per fare luce), 'orologio' (guarda l'orologio; la
// lanterna è appesa alla cintura). Espressioni: 'base', 'sorriso', 'serio', 'chiusi'.
// o.dondolo: di quanti gradi dondola la lanterna; o.occhi: dove guarda (da -1, a sinistra, a 1); o.luce: da 0 a 1.
const CU = { giacca: '#3F6E5A', giaccaScura: '#2A4B3E', pantaloni: '#2E3448', berretto: '#335C4B', visiera: '#1E2A26',
  pelle: '#E8B48F', naso: '#D8957A', bianco: '#ECE7DD', grigio: '#BDB6AA', libro: '#8E3B2E', libroScuro: '#5E2620', ottone: '#E0A93B', ottoneScuro: '#8C6420' };
// La lanterna del custode, appesa per il manico nel punto (x, y): alta 56.
function lume(x, y, luce) {
  luce = luce === undefined ? 1 : luce;
  return '<g><circle cx="' + x + '" cy="' + (y + 34) + '" r="54" fill="' + C.luce + '" opacity="' + (0.4 * luce).toFixed(2) + '" filter="url(#g-soft)"/>' +
    '<path d="M' + (x - 9) + ' ' + (y + 12) + ' Q' + x + ' ' + (y - 4) + ' ' + (x + 9) + ' ' + (y + 12) + '" stroke="' + AI + '" stroke-width="3" fill="none"/>' +
    '<path d="M' + (x - 12) + ' ' + (y + 20) + ' L' + (x + 12) + ' ' + (y + 20) + ' L' + (x + 8) + ' ' + (y + 11) + ' L' + (x - 8) + ' ' + (y + 11) + ' Z" fill="' + CU.ottone + '" stroke="' + CU.ottoneScuro + '" stroke-width="2"/>' +
    '<rect x="' + (x - 12) + '" y="' + (y + 20) + '" width="24" height="28" rx="3" fill="' + mix('#8A7A5A', '#FFE7A8', luce) + '" stroke="' + CU.ottoneScuro + '" stroke-width="2.5"/>' +
    '<ellipse cx="' + x + '" cy="' + (y + 36) + '" rx="5" ry="8" fill="#FFFFFF" opacity="' + (0.85 * luce).toFixed(2) + '"/>' +
    '<path d="M' + x + ' ' + (y + 20) + ' L' + x + ' ' + (y + 48) + '" stroke="' + CU.ottoneScuro + '" stroke-width="1.5" opacity=".6"/>' +
    '<rect x="' + (x - 14) + '" y="' + (y + 47) + '" width="28" height="7" rx="2" fill="' + CU.ottone + '" stroke="' + CU.ottoneScuro + '" stroke-width="2"/></g>';
}
function custodeTesta(expr, o) {
  const dx = 4 * (o.occhi || 0);
  let occhi, bocca = '<path d="M111 142 Q120 147 129 142" stroke="' + AI + '" stroke-width="2.6" stroke-linecap="round" fill="none"/>';
  let ciglia = '<path d="M92 99 Q103 91 114 98 M126 98 Q137 91 148 99" stroke="' + CU.bianco + '" stroke-width="6" stroke-linecap="round" fill="none"/>';
  if (expr === 'sorriso' || expr === 'chiusi') {
    occhi = expr === 'sorriso' ?
      '<path d="M97 110 Q104 103 111 110 M129 110 Q136 103 143 110" stroke="' + AI + '" stroke-width="3" stroke-linecap="round" fill="none"/>' :
      '<path d="M97 107 Q104 112 111 107 M129 107 Q136 112 143 107" stroke="' + AI + '" stroke-width="3" stroke-linecap="round" fill="none"/>';
    if (expr === 'sorriso') bocca = '<path d="M109 140 Q120 151 131 140 Z" fill="' + AI + '"/>';
  } else {
    occhi = '<circle cx="' + (104 + dx) + '" cy="108" r="3.8" fill="' + AI + '"/><circle cx="' + (136 + dx) + '" cy="108" r="3.8" fill="' + AI + '"/>' +
      '<circle cx="' + (105.2 + dx) + '" cy="106.8" r="1.2" fill="#FFFFFF"/><circle cx="' + (137.2 + dx) + '" cy="106.8" r="1.2" fill="#FFFFFF"/>';
    if (expr === 'serio') {
      ciglia = '<path d="M92 99 L114 101 M126 101 L148 99" stroke="' + CU.bianco + '" stroke-width="6" stroke-linecap="round" fill="none"/>';
      bocca = '<path d="M112 143 L128 143" stroke="' + AI + '" stroke-width="2.6" stroke-linecap="round" fill="none"/>';
    }
  }
  return '<rect x="110" y="140" width="20" height="22" fill="' + CU.pelle + '"/>' +
    '<circle cx="78" cy="112" r="9" fill="' + CU.pelle + '"/><circle cx="162" cy="112" r="9" fill="' + CU.pelle + '"/>' +
    '<circle cx="120" cy="106" r="42" fill="' + CU.pelle + '"/>' +
    '<path d="M80 92 C76 104 78 118 84 126 L90 120 C86 110 86 100 88 92 Z M160 92 C164 104 162 118 156 126 L150 120 C154 110 154 100 152 92 Z" fill="' + CU.grigio + '"/>' +
    '<circle cx="92" cy="126" r="7" fill="#FF8F8F" opacity=".4"/><circle cx="148" cy="126" r="7" fill="#FF8F8F" opacity=".4"/>' +
    ciglia + occhi + bocca +
    '<path d="M120 128 C110 123 96 125 89 136 C99 139 110 137 120 132 C130 137 141 139 151 136 C144 125 130 123 120 128 Z" fill="' + CU.bianco + '" stroke="' + CU.grigio + '" stroke-width="1.5"/>' +
    '<ellipse cx="120" cy="121" rx="9" ry="7.5" fill="' + CU.naso + '"/>' +
    // Il berretto da custode: la fascia scura, la stellina d'ottone, la visiera.
    '<path d="M76 84 Q76 48 120 46 Q164 48 164 84 Z" fill="' + CU.berretto + '" stroke="' + AI + '" stroke-width="2.5"/>' +
    '<rect x="76" y="74" width="88" height="12" fill="' + CU.giaccaScura + '"/>' +
    '<path d="M120 54 L123 61 L130 61 L124.5 65.5 L126.5 72.5 L120 68.5 L113.5 72.5 L115.5 65.5 L110 61 L117 61 Z" fill="' + CU.ottone + '"/>' +
    '<path d="M72 86 Q120 100 168 86 L166 80 Q120 92 74 80 Z" fill="' + CU.visiera + '"/>';
}
function custode(pose, expr, o) {
  o = o || {};
  const luce = o.luce === undefined ? 1 : o.luce, dond = o.dondolo || 0;
  const gambe = '<rect x="94" y="350" width="22" height="50" fill="' + CU.pantaloni + '"/><rect x="124" y="350" width="22" height="50" fill="' + CU.pantaloni + '"/>' +
    '<ellipse cx="102" cy="404" rx="19" ry="9" fill="#1E1A20"/><ellipse cx="140" cy="404" rx="19" ry="9" fill="#1E1A20"/>';
  const giacca = '<path d="M120 166 C92 166 74 176 68 196 L58 360 Q120 374 182 360 L172 196 C166 176 148 166 120 166 Z" fill="' + CU.giacca + '" stroke="' + AI + '" stroke-width="2.5"/>' +
    '<path d="M120 188 L120 366" stroke="' + CU.giaccaScura + '" stroke-width="2.5"/>' +
    '<path d="M102 168 L120 200 L112 168 Z M138 168 L120 200 L128 168 Z" fill="' + CU.giaccaScura + '"/>' +
    [214, 244, 300, 330].map(y => '<circle cx="128" cy="' + y + '" r="4" fill="' + CU.ottone + '"/>').join('') +
    '<rect x="63" y="266" width="114" height="14" fill="#3A2A22"/><rect x="111" y="264" width="18" height="18" rx="2" fill="none" stroke="' + CU.ottone + '" stroke-width="3"/>';
  // Le chiavi, appese alla cintura su un anello.
  const chiavi = '<circle cx="158" cy="290" r="8" fill="none" stroke="' + CU.ottone + '" stroke-width="3"/>' +
    '<path d="M153 296 L149 318 M149 312 L144 311 M149 318 L144 317 M158 298 L158 322 M158 316 L163 316 M158 322 L163 322 M163 296 L169 316 M167 310 L172 308" stroke="' + CU.ottone + '" stroke-width="3.5" stroke-linecap="round" fill="none"/>';
  // Il regolamento sotto il braccio destro (a destra di chi guarda), coperto dalla manica.
  const libro = '<g transform="rotate(-8 178 252)"><rect x="150" y="212" width="58" height="80" rx="4" fill="' + CU.libro + '" stroke="' + CU.libroScuro + '" stroke-width="2.5"/>' +
    '<rect x="203" y="216" width="7" height="72" fill="' + C.crema + '"/><rect x="150" y="226" width="58" height="5" fill="' + CU.libroScuro + '"/><rect x="150" y="272" width="58" height="5" fill="' + CU.libroScuro + '"/>' +
    '<path d="M186 292 L186 306 L190 301 L194 306 L194 292" fill="' + C.oro + '"/></g>';
  const destro = '<path d="M164 190 Q188 228 182 284 L166 286 Q170 236 152 204 Z" fill="' + CU.giacca + '" stroke="' + AI + '" stroke-width="2.5"/><circle cx="174" cy="290" r="9" fill="' + CU.pelle + '"/>';
  let sinistro;
  if (pose === 'alza') {
    sinistro = '<g transform="rotate(' + dond + ' 36 132)">' + lume(36, 132, luce) + '</g>' +
      '<path d="M86 200 Q50 188 28 144 L46 128 Q64 166 100 182 Z" fill="' + CU.giacca + '" stroke="' + AI + '" stroke-width="2.5"/><circle cx="36" cy="134" r="9" fill="' + CU.pelle + '"/>';
  } else if (pose === 'orologio') {
    sinistro = '<g transform="rotate(' + dond + ' 70 280)">' + lume(70, 280, luce) + '</g>' +
      '<path d="M76 190 Q58 236 80 256 L102 240 Q84 228 92 204 Z" fill="' + CU.giacca + '" stroke="' + AI + '" stroke-width="2.5"/>' +
      '<path d="M104 236 Q114 256 128 244" stroke="' + CU.ottone + '" stroke-width="2" fill="none"/>' +
      '<circle cx="104" cy="224" r="12" fill="' + CU.ottone + '" stroke="' + CU.ottoneScuro + '" stroke-width="2"/><circle cx="104" cy="224" r="8.5" fill="' + C.crema + '"/>' +
      '<path d="M104 224 L104 218 M104 224 L108 226" stroke="' + AI + '" stroke-width="1.6" stroke-linecap="round"/><circle cx="104" cy="210" r="3" fill="none" stroke="' + CU.ottone + '" stroke-width="2"/>' +
      '<circle cx="98" cy="238" r="9" fill="' + CU.pelle + '"/>';
  } else {
    sinistro = '<path d="M76 190 Q56 232 60 290 L76 292 Q74 240 90 204 Z" fill="' + CU.giacca + '" stroke="' + AI + '" stroke-width="2.5"/>' +
      '<g transform="rotate(' + dond + ' 68 296)">' + lume(68, 296, luce) + '</g><circle cx="68" cy="296" r="9" fill="' + CU.pelle + '"/>';
  }
  return '<g>' + gambe + giacca + chiavi + libro + destro + sinistro + custodeTesta(expr, o) + '</g>';
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
    // La porta: aperta, dentro si vede la luce.
    '<rect x="70" y="94" width="30" height="76" fill="' + mix('#2A2240', C.luce2, 0.8 * luce) + '"/>' +
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
  return '<g><path d="' + forma + '" fill="' + (o.fondo || C.crema) + '" stroke="' + C.cremaScura + '" stroke-width="2" stroke-linejoin="round"/>' + segno +
    '<text x="' + (s ? 60 : 73) + '" y="39" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="24" fill="' + C.inchiostro + '">' + testo + '</text></g>';
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
};
// o: { tirata, bocca (Emma), ciao (Parco), forma (sasso), strappo (pezzo), coda (Cane), suona (Chiama) }.
function passeggero(tipo, col, o) {
  o = o || {};
  if (!POSTO[tipo]) return '';
  const dentro = tipo === 'emma' ? (o.tirata ? emmaTirata(col) : emma(col, { mouth: o.bocca })) :
    tipo === 'al' ? al(col) : tipo === 'mare' ? mare(col) : tipo === 'parco' ? parco(col, { ciao: o.ciao }) :
    tipo === 'sasso' ? sasso(col, o.forma) : tipo === 'pezzo' ? pezzo(col, o.strappo) : tipo === 'cane' ? cane(col, { coda: o.coda }) :
    tipo === 'chiama' ? chiama(col, { tirata: o.tirata, suona: o.suona }) : paperella(col, { glow: true });
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
  partenza: 'M 640 852 L 110 852 C 44 852 30 818 58 778 L 248 408 C 264 378 290 362 330 362 C 600 362 860 392 1048 446',
  arrivo: 'M 962 818 C 910 818 888 796 846 796 L 704 796 C 656 796 646 852 590 852 L 40 852',
  ada: [520, 834], spezzaparole: [585, 836], vasca: [772, 880], gradino: [672, 896], ingresso: [1048, 446], uscita: [962, 818],
  ruota: [1720, 470], fermo: 150, passo: 86, scala: 1 / 3,
  // Dall'episodio 4: la banchina tiene sette vagoni tra le sue due sbarre a righe (x della sbarra davanti e di quella
  // dietro); i vagoni in stazione stanno a passoBanchina l'uno dall'altro, attaccati.
  banchina: [100, 654], passoBanchina: 76, posti: 7,
  // Dall'episodio 3: il bancone della bancarella, con la manopola (centro della manopola).
  manopola: [716, 846],
  // Dall'episodio 5: il binario morto dei treni di prova, dietro la stazione, oltre i piedi della salita.
  morto: 'M 640 852 L 110 852 C 70 852 40 858 0 858 L -900 858',
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
  [[90, 730], [130, 650], [170, 572], [210, 492], [250, 412]].forEach(p => sost(p[0], p[1]));
  [[400, 364], [550, 366], [700, 374], [850, 393], [970, 420]].forEach(p => sost(p[0], p[1]));
  [[704, 800], [846, 800]].forEach(p => sost(p[0], p[1]));
  const binario = d => '<path d="' + d + '" stroke="' + C.legnoScuro + '" stroke-width="12" stroke-dasharray="3 7" fill="none"/>' +
    '<path d="' + d + '" stroke="' + C.acciaio + '" stroke-width="4" fill="none"/>';
  // La stazione: pedana, pensilina a righe, lampadine.
  let righe = '', lamp = '';
  for (let x = 30; x < 630; x += 40) righe += '<path d="M' + x + ' 612 L' + (x + 40) + ' 612 L' + (x + 40) + ' 654 Q' + (x + 20) + ' 672 ' + x + ' 654 Z" fill="' + ((x / 40) % 2 < 1 ? C.rosso : C.crema) + '"/>';
  for (let x = 50; x < 630; x += 40) lamp += '<circle class="g-lampadina g-luce-parco"' + acc + ' cx="' + x + '" cy="664" r="5" fill="' + C.luce + '"/>';
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
  // Il binario morto dei treni di prova (episodio 5): una massicciata bassa, mezza coperta dall'erba.
  let morto = '';
  if (o.morto) {
    const ciuffi = [];
    for (let x = -880; x < 20; x += 23) ciuffi.push('<path d="M' + x + ' 870 q3 -12 6 -2 q3 -14 6 0 q3 -10 5 2" stroke="#2E5A3E" stroke-width="3" fill="none" stroke-linecap="round"/>');
    morto = '<rect x="-900" y="856" width="920" height="14" fill="#2A2238"/>' + binario('M 110 852 C 70 852 40 858 0 858 L -900 858') + '<rect x="-912" y="836" width="14" height="26" rx="3" fill="' + C.legnoScuro + '"/>' + ciuffi.join('');
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
    '<rect x="-2000" y="-1000" width="5920" height="3080" fill="' + C.notte1 + '"/>' +
    '<rect x="-2000" y="0" width="5920" height="900" fill="url(#g-cielo)"/>' +
    stelle +
    '<g class="g-luna"><circle cx="1530" cy="150" r="48" fill="#FFF4DA"/><circle cx="1530" cy="150" r="90" fill="#FFF4DA" opacity=".12" filter="url(#g-soft)"/></g>' +
    (o.laggiu ? '<g class="g-laggiu" opacity="' + o.laggiu + '">' + laggiu() + '</g>' : '') +
    '<path d="M-2000 900 L-2000 760 Q200 700 500 740 Q800 770 1100 730 Q1500 690 1920 740 L3920 740 L3920 900 Z" fill="#171A44"/>' +
    ruota + tendone +
    tralicci +
    montagna +
    binario(MONDO.partenza) + binario(MONDO.arrivo) +
    stazione + morto + bancone +
    '<rect x="-2000" y="868" width="5920" height="2000" fill="' + C.terra + '"/>' +
    '<path d="M-2000 868 L3920 868" stroke="#2A2650" stroke-width="3"/>' +
    vasca + banchina +
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
const INTERNO = { scala: 1.45, ruote: 800, centri: [430, 810, 1190, 1570, 1950, 2330, 2710, 3090], corsie: [720, 760, 800, 840, 880] };
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
const CENTRO = { emma: [142, -36], al: [140, 19], mare: [136, 0], parco: [140, -24], paperella: [120, 17], sasso: [140, 30], pezzo: [140, 18], cane: [140, -10], chiama: [140, 8] };
function testa(i, tipo, dy) {
  const S = INTERNO.scala, x0 = INTERNO.centri[i] - 120 * S, y0 = INTERNO.ruote - 150 * S + (dy || 0);
  const l = CENTRO[tipo] || CENTRO.al;
  return [x0 + l[0] * S, y0 + l[1] * S];
}
// La sommità della testa (da qui partono e arrivano i fili tra due passeggeri).
const CIMA = { emma: [142, -70], al: [140, -26], mare: [150, -48], parco: [140, -84], paperella: [120, -7], sasso: [142, -4], pezzo: [140, -16], cane: [140, -54], chiama: [140, -60] };
function cima(i, tipo, dy) {
  const S = INTERNO.scala, x0 = INTERNO.centri[i] - 120 * S, y0 = INTERNO.ruote - 150 * S + (dy || 0);
  const l = CIMA[tipo] || CIMA.al;
  return [x0 + l[0] * S, y0 + l[1] * S];
}
// L'anello di luce intorno a un passeggero (il filo verso sé stesso): il tracciato SVG.
const ANELLO = { emma: [50, 58], al: [66, 52], mare: [70, 54], parco: [72, 64], paperella: [50, 40], sasso: [54, 42], pezzo: [74, 46], cane: [62, 60], chiama: [60, 58] };
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
const MOD = {"mare": {"frase": ["Al", "mare", "Emma"], "passeggeri": {"Al": {"biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"], "fili": {"Al": 1.0}}, "mare": {"biglietto": "#4681d7", "tratti": ["#427edb", "#3d79de", "#3975df"], "fili": {"Al": 0.3, "mare": 0.7}}, "Emma": {"biglietto": "#bc937f", "tratti": ["#728ebe", "#306edd", "#2864dc"], "fili": {"Al": 0.1, "mare": 0.7, "Emma": 0.2}, "fili_tratti": [{"Al": 0.1, "mare": 0.7, "Emma": 0.2}, {"Al": 0.1, "mare": 0.6, "Emma": 0.3}, {"Al": 0.1, "mare": 0.5, "Emma": 0.4}], "dopo_fili": "#8c8eab", "finestre": [[["Bovary", 4, "#f07064"], ["onde", 4, "#3c78e6"], ["sabbia", 4, "#5a96dc"], ["conchiglie", 4, "#508ceb"], ["felice", 4, "#f5c84c"], ["e", 3, "#f08c78"], ["altalena", 3, "#50be6e"], ["scivolo", 3, "#46af64"], ["nuota", 3, "#2864dc"], ["foglie", 2, "#3cb45a"], ["corre", 2, "#28aa50"], ["gioca", 2, "#28aaaa"], [".", 1, "#9696a0"], ["Fine", 1, "#46465a"]], [["nuota", 7, "#2864dc"], ["onde", 5, "#3c78e6"], ["conchiglie", 5, "#508ceb"], ["sabbia", 4, "#5a96dc"], ["gioca", 4, "#28aaaa"], ["felice", 3, "#f5c84c"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["scivolo", 2, "#46af64"], ["corre", 2, "#28aa50"], ["e", 1, "#f08c78"], ["Fine", 1, "#46465a"]], [["nuota", 18, "#2864dc"], ["gioca", 7, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]]]}}, "vasca": [["nuota", 18, "#2864dc"], ["gioca", 7, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]], "probabilita": {"nuota": 0.446, "gioca": 0.186, "onde": 0.087, "conchiglie": 0.073, "sabbia": 0.061}, "nuovo": {"nuota": "#2f73d4"}}, "parco": {"frase": ["Al", "parco", "Emma"], "passeggeri": {"Al": {"biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"], "fili": {"Al": 1.0}}, "parco": {"biglietto": "#47a688", "tratti": ["#3ca58a", "#30a38d", "#29a292"], "fili": {"Al": 0.3, "parco": 0.7}}, "Emma": {"biglietto": "#bc937f", "tratti": ["#60aa75", "#30ae57", "#28aa50"], "fili": {"Al": 0.1, "parco": 0.7, "Emma": 0.2}, "fili_tratti": [{"Al": 0.1, "parco": 0.7, "Emma": 0.2}, {"Al": 0.1, "parco": 0.6, "Emma": 0.3}, {"Al": 0.1, "parco": 0.5, "Emma": 0.4}], "dopo_fili": "#899785", "finestre": [[["Bovary", 4, "#f07064"], ["foglie", 4, "#3cb45a"], ["altalena", 4, "#50be6e"], ["scivolo", 4, "#46af64"], ["e", 3, "#f08c78"], ["onde", 3, "#3c78e6"], ["sabbia", 3, "#5a96dc"], ["conchiglie", 3, "#508ceb"], ["corre", 3, "#28aa50"], ["nuota", 2, "#2864dc"], ["gioca", 2, "#28aaaa"], ["felice", 2, "#f5c84c"], [".", 2, "#9696a0"], ["Fine", 1, "#46465a"]], [["corre", 8, "#28aa50"], ["foglie", 6, "#3cb45a"], ["altalena", 6, "#50be6e"], ["scivolo", 5, "#46af64"], ["gioca", 5, "#28aaaa"], ["Bovary", 2, "#f07064"], ["sabbia", 2, "#5a96dc"], ["conchiglie", 2, "#508ceb"], ["nuota", 2, "#2864dc"], ["e", 1, "#f08c78"], ["onde", 1, "#3c78e6"]], [["corre", 25, "#28aa50"], ["gioca", 6, "#28aaaa"], ["foglie", 3, "#3cb45a"], ["altalena", 3, "#50be6e"], ["scivolo", 2, "#46af64"], ["nuota", 1, "#2864dc"]]]}}, "vasca": [["corre", 25, "#28aa50"], ["gioca", 6, "#28aaaa"], ["foglie", 3, "#3cb45a"], ["altalena", 3, "#50be6e"], ["scivolo", 2, "#46af64"], ["nuota", 1, "#2864dc"]], "probabilita": {"corre": 0.621, "gioca": 0.135, "foglie": 0.084, "altalena": 0.082, "scivolo": 0.053}, "nuovo": {"corre": "#2daa64", "gioca": "#2e95a0"}}, "manopola": {"posizioni": {"mezzo": 1.0, "stretta": 0.3, "larga": 3.0}, "vasche": {"mezzo": [["nuota", 18, "#2864dc"], ["gioca", 7, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]], "stretta": [["nuota", 38, "#2864dc"], ["gioca", 2, "#28aaaa"]], "larga": [["nuota", 7, "#2864dc"], ["gioca", 5, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 4, "#508ceb"], ["sabbia", 3, "#5a96dc"], ["corre", 3, "#28aa50"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["scivolo", 2, "#46af64"], ["felice", 2, "#f5c84c"], ["Fine", 2, "#46465a"], ["e", 1, "#f08c78"], [".", 1, "#9696a0"]]}, "pesche": {"mezzo": ["nuota", "gioca", "corre"], "stretta": ["nuota", "nuota"], "larga": ["altalena"]}, "nuovo": {"nuota": "#2f73d4", "gioca": "#2e95a0", "corre": "#2daa64", "altalena": "#55aa73"}}, "chat": {"banchina": 7, "messaggi": [{"striscia": ["Al", "mare", "Emma"], "sale": ["Al", "mare", "Emma"], "giu": [], "biglietti": ["#429096", "#4681d7", "#bc937f"]}, {"striscia": ["Al", "mare", "Emma", "nuota", "Al", "parco"], "sale": ["Al", "mare", "Emma", "nuota", "Al", "parco"], "giu": [], "biglietti": ["#429096", "#4681d7", "#bc937f", "#2f73d4", "#429096", "#47a688"]}, {"striscia": ["Al", "mare", "Emma", "nuota", "Al", "parco", "corre", "Al", "parco"], "sale": ["Emma", "nuota", "Al", "parco", "corre", "Al", "parco"], "giu": ["Al", "mare"], "biglietti": ["#bc937f", "#2f73d4", "#429096", "#47a688", "#2daa64", "#429096", "#47a688"]}], "giro": {"frase": ["Al", "mare", "Emma", "nuota", "Al", "parco"], "passeggeri": [{"parola": "Al", "biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"]}, {"parola": "mare", "biglietto": "#4681d7", "tratti": ["#427edb", "#3d79de", "#3975df"]}, {"parola": "Emma", "biglietto": "#bc937f", "tratti": ["#728ebe", "#306edd", "#2864dc"]}, {"parola": "nuota", "biglietto": "#2f73d4", "tratti": ["#2e71d5", "#2c6ed7", "#2a6cd8"]}, {"parola": "Al", "biglietto": "#429096", "tratti": ["#3e9691", "#3a9d89", "#37a37e"]}, {"parola": "parco", "biglietto": "#47a688", "dopo_fili": "#54a397", "tratti": ["#35aa7d", "#28aa6e", "#28aa56"], "fili": [0.1, 0.1, 0.5, 0.1, 0.1, 0.1], "fili_tratti": [[0.1, 0.1, 0.5, 0.1, 0.1, 0.1], [0.1, 0.1, 0.3, 0.1, 0.1, 0.3], [0.1, 0.1, 0.2, 0.1, 0.1, 0.4]], "finestre": [[["corre", 5, "#28aa50"], ["gioca", 5, "#28aaaa"], ["foglie", 4, "#3cb45a"], ["altalena", 4, "#50be6e"], ["scivolo", 4, "#46af64"], ["nuota", 4, "#2864dc"], ["onde", 3, "#3c78e6"], ["sabbia", 3, "#5a96dc"], ["conchiglie", 3, "#508ceb"], ["Bovary", 2, "#f07064"], ["e", 1, "#f08c78"], ["felice", 1, "#f5c84c"], [".", 1, "#9696a0"]], [["corre", 11, "#28aa50"], ["gioca", 10, "#28aaaa"], ["nuota", 5, "#2864dc"], ["foglie", 3, "#3cb45a"], ["altalena", 3, "#50be6e"], ["scivolo", 3, "#46af64"], ["sabbia", 2, "#5a96dc"], ["Bovary", 1, "#f07064"], ["onde", 1, "#3c78e6"], ["conchiglie", 1, "#508ceb"]], [["corre", 21, "#28aa50"], ["gioca", 14, "#28aaaa"], ["nuota", 3, "#2864dc"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"]]]}], "vasca": [["corre", 21, "#28aa50"], ["gioca", 14, "#28aaaa"], ["nuota", 3, "#2864dc"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"]], "nuovo": {"corre": "#2daa64"}}}, "addestramento": {"momenti": [{"notte": 0, "piega": [0.0, 0.0], "tratti": ["#bc937f", "#bc937f", "#bc937f"], "finestre": [[["Bovary", 4, "#f07064"], ["e", 4, "#f08c78"], ["felice", 4, "#f5c84c"], [".", 4, "#9696a0"], ["onde", 3, "#3c78e6"], ["foglie", 3, "#3cb45a"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["nuota", 2, "#2864dc"], ["corre", 2, "#28aa50"], ["gioca", 1, "#28aaaa"], ["Fine", 1, "#46465a"]], [["Bovary", 4, "#f07064"], ["e", 4, "#f08c78"], ["felice", 4, "#f5c84c"], [".", 4, "#9696a0"], ["onde", 3, "#3c78e6"], ["foglie", 3, "#3cb45a"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["nuota", 2, "#2864dc"], ["corre", 2, "#28aa50"], ["gioca", 1, "#28aaaa"], ["Fine", 1, "#46465a"]], [["Bovary", 4, "#f07064"], ["e", 4, "#f08c78"], ["felice", 4, "#f5c84c"], [".", 4, "#9696a0"], ["onde", 3, "#3c78e6"], ["foglie", 3, "#3cb45a"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["nuota", 2, "#2864dc"], ["corre", 2, "#28aa50"], ["gioca", 1, "#28aaaa"], ["Fine", 1, "#46465a"]]], "vasca": [["Bovary", 4, "#f07064"], ["e", 4, "#f08c78"], ["felice", 4, "#f5c84c"], [".", 4, "#9696a0"], ["onde", 3, "#3c78e6"], ["foglie", 3, "#3cb45a"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["nuota", 2, "#2864dc"], ["corre", 2, "#28aa50"], ["gioca", 1, "#28aaaa"], ["Fine", 1, "#46465a"]], "brivido": 0.96, "piega_notte": 0.0416}, {"notte": 80, "piega": [0.912, 0.785], "tratti": ["#7e91b2", "#2f70d9", "#2867da"], "finestre": [[["Bovary", 4, "#f07064"], ["onde", 4, "#3c78e6"], ["sabbia", 4, "#5a96dc"], ["conchiglie", 4, "#508ceb"], ["felice", 4, "#f5c84c"], ["e", 3, "#f08c78"], ["altalena", 3, "#50be6e"], ["scivolo", 3, "#46af64"], ["foglie", 2, "#3cb45a"], ["nuota", 2, "#2864dc"], ["corre", 2, "#28aa50"], ["gioca", 2, "#28aaaa"], [".", 2, "#9696a0"], ["Fine", 1, "#46465a"]], [["nuota", 6, "#2864dc"], ["onde", 4, "#3c78e6"], ["sabbia", 4, "#5a96dc"], ["conchiglie", 4, "#508ceb"], ["gioca", 4, "#28aaaa"], ["corre", 3, "#28aa50"], ["felice", 3, "#f5c84c"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["scivolo", 2, "#46af64"], ["Fine", 2, "#46465a"], ["e", 1, "#f08c78"], [".", 1, "#9696a0"]], [["nuota", 13, "#2864dc"], ["gioca", 8, "#28aaaa"], ["corre", 4, "#28aa50"], ["Fine", 4, "#46465a"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], ["conchiglie", 2, "#508ceb"], ["Bovary", 1, "#f07064"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["felice", 1, "#f5c84c"]]], "vasca": [["nuota", 13, "#2864dc"], ["gioca", 8, "#28aaaa"], ["corre", 4, "#28aa50"], ["Fine", 4, "#46465a"], ["onde", 2, "#3c78e6"], ["sabbia", 2, "#5a96dc"], ["conchiglie", 2, "#508ceb"], ["Bovary", 1, "#f07064"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["felice", 1, "#f5c84c"]], "brivido": 0.69, "piega_notte": 0.0099}, {"notte": 97, "piega": [0.963, 0.897], "tratti": ["#7890b8", "#2f6edb", "#2865db"], "finestre": [[["Bovary", 4, "#f07064"], ["onde", 4, "#3c78e6"], ["sabbia", 4, "#5a96dc"], ["conchiglie", 4, "#508ceb"], ["e", 3, "#f08c78"], ["altalena", 3, "#50be6e"], ["scivolo", 3, "#46af64"], ["nuota", 3, "#2864dc"], ["felice", 3, "#f5c84c"], ["foglie", 2, "#3cb45a"], ["corre", 2, "#28aa50"], ["gioca", 2, "#28aaaa"], [".", 2, "#9696a0"], ["Fine", 1, "#46465a"]], [["nuota", 6, "#2864dc"], ["onde", 5, "#3c78e6"], ["conchiglie", 5, "#508ceb"], ["sabbia", 4, "#5a96dc"], ["gioca", 4, "#28aaaa"], ["felice", 3, "#f5c84c"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["scivolo", 2, "#46af64"], ["corre", 2, "#28aa50"], ["e", 1, "#f08c78"], [".", 1, "#9696a0"], ["Fine", 1, "#46465a"]], [["nuota", 16, "#2864dc"], ["gioca", 8, "#28aaaa"], ["onde", 3, "#3c78e6"], ["corre", 3, "#28aa50"], ["sabbia", 2, "#5a96dc"], ["conchiglie", 2, "#508ceb"], ["Fine", 2, "#46465a"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["felice", 1, "#f5c84c"]]], "vasca": [["nuota", 16, "#2864dc"], ["gioca", 8, "#28aaaa"], ["onde", 3, "#3c78e6"], ["corre", 3, "#28aa50"], ["sabbia", 2, "#5a96dc"], ["conchiglie", 2, "#508ceb"], ["Fine", 2, "#46465a"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["felice", 1, "#f5c84c"]], "brivido": 0.61, "piega_notte": 0.0047}, {"notte": 310, "piega": [1.0, 1.0], "tratti": ["#728ebe", "#306edd", "#2864dc"], "finestre": [[["Bovary", 4, "#f07064"], ["onde", 4, "#3c78e6"], ["sabbia", 4, "#5a96dc"], ["conchiglie", 4, "#508ceb"], ["felice", 4, "#f5c84c"], ["e", 3, "#f08c78"], ["altalena", 3, "#50be6e"], ["scivolo", 3, "#46af64"], ["nuota", 3, "#2864dc"], ["foglie", 2, "#3cb45a"], ["corre", 2, "#28aa50"], ["gioca", 2, "#28aaaa"], [".", 1, "#9696a0"], ["Fine", 1, "#46465a"]], [["nuota", 7, "#2864dc"], ["onde", 5, "#3c78e6"], ["conchiglie", 5, "#508ceb"], ["sabbia", 4, "#5a96dc"], ["gioca", 4, "#28aaaa"], ["felice", 3, "#f5c84c"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["scivolo", 2, "#46af64"], ["corre", 2, "#28aa50"], ["e", 1, "#f08c78"], ["Fine", 1, "#46465a"]], [["nuota", 18, "#2864dc"], ["gioca", 7, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]]], "vasca": [["nuota", 18, "#2864dc"], ["gioca", 7, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]], "brivido": 0.56, "piega_notte": 0.0}]}, "zampiru": {"frase": ["Al", "mare", "Zampirù"], "pezzi": ["Al", "mare", "Zam", "pi", "rù"], "tagli": {"Al": ["Al"], "mare": ["mare"], "Emma": ["Emma"], "parco": ["parco"], "gelato": ["gelato"], "Zampirù": ["Zam", "pi", "rù"], "precipitevolissimevolmente": ["pre", "cipit", "evol", "issim", "evol", "mente"]}, "passeggeri": {"Al": {"biglietto": "#429096", "tratti": ["#409493", "#3d998e", "#3b9e87"], "fili": {"Al": 1.0}}, "mare": {"biglietto": "#4681d7", "tratti": ["#427edb", "#3d79de", "#3975df"], "fili": {"Al": 0.3, "mare": 0.7}}, "Zam": {"biglietto": "#eec552", "tratti": ["#eac356", "#dfbe5f", "#c5b374"], "fili": {"Al": 0.2, "mare": 0.3, "Zam": 0.5}}, "pi": {"biglietto": "#cd8d7c", "tratti": ["#c98d7b", "#ba8f7c", "#9d9284"], "fili": {"Al": 0.0, "mare": 0.2, "Zam": 0.5, "pi": 0.3}}, "rù": {"biglietto": "#949f9c", "tratti": ["#e8c257", "#5178c0", "#2864dc"], "fili": {"Al": 0.0, "mare": 0.2, "Zam": 0.3, "pi": 0.4, "rù": 0.1}, "fili_tratti": [{"Al": 0.0, "mare": 0.2, "Zam": 0.3, "pi": 0.4, "rù": 0.1}, {"Al": 0.1, "mare": 0.6, "Zam": 0.1, "pi": 0.1, "rù": 0.1}, {"Al": 0.1, "mare": 0.6, "Zam": 0.1, "pi": 0.1, "rù": 0.1}], "dopo_fili": "#d7bc66", "finestre": [[["felice", 9, "#f5c84c"], ["onde", 5, "#3c78e6"], ["conchiglie", 5, "#508ceb"], ["sabbia", 4, "#5a96dc"], ["nuota", 4, "#2864dc"], ["Bovary", 3, "#f07064"], ["e", 2, "#f08c78"], ["gioca", 2, "#28aaaa"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["corre", 1, "#28aa50"], [".", 1, "#9696a0"], ["Fine", 1, "#46465a"]], [["nuota", 10, "#2864dc"], ["felice", 8, "#f5c84c"], ["onde", 6, "#3c78e6"], ["conchiglie", 5, "#508ceb"], ["sabbia", 3, "#5a96dc"], ["gioca", 2, "#28aaaa"], ["Bovary", 1, "#f07064"], ["e", 1, "#f08c78"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["corre", 1, "#28aa50"], ["Fine", 1, "#46465a"]], [["nuota", 22, "#2864dc"], ["onde", 5, "#3c78e6"], ["felice", 5, "#f5c84c"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["gioca", 2, "#28aaaa"], ["Fine", 1, "#46465a"]]]}}, "vasca": [["nuota", 22, "#2864dc"], ["onde", 5, "#3c78e6"], ["felice", 5, "#f5c84c"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["gioca", 2, "#28aaaa"], ["Fine", 1, "#46465a"]], "probabilita": {"nuota": 0.556, "onde": 0.117, "felice": 0.108, "conchiglie": 0.079, "gioca": 0.053}, "nuovo": {"nuota": "#2f73d4"}}, "finisce": {"storia": ["nuota", "e", "gioca", ".", "Fine"], "passeggeri": {"nuota": {"biglietto": "#2f73d4", "tratti": ["#6f90b9", "#d0a572", "#d59f76"]}, "e": {"biglietto": "#ad9584", "tratti": ["#2da08a", "#28a095", "#28a29d"]}, "gioca": {"biglietto": "#2e95a0", "tratti": ["#909280", "#9696a0", "#9696a0"]}, ".": {"biglietto": "#98969f", "tratti": ["#83838f", "#46465a", "#46465a"]}}, "giri": [{"ultimo": "Emma", "finestre": [[["Bovary", 4, "#f07064"], ["onde", 4, "#3c78e6"], ["sabbia", 4, "#5a96dc"], ["conchiglie", 4, "#508ceb"], ["felice", 4, "#f5c84c"], ["e", 3, "#f08c78"], ["altalena", 3, "#50be6e"], ["scivolo", 3, "#46af64"], ["nuota", 3, "#2864dc"], ["foglie", 2, "#3cb45a"], ["corre", 2, "#28aa50"], ["gioca", 2, "#28aaaa"], [".", 1, "#9696a0"], ["Fine", 1, "#46465a"]], [["nuota", 7, "#2864dc"], ["onde", 5, "#3c78e6"], ["conchiglie", 5, "#508ceb"], ["sabbia", 4, "#5a96dc"], ["gioca", 4, "#28aaaa"], ["felice", 3, "#f5c84c"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["scivolo", 2, "#46af64"], ["corre", 2, "#28aa50"], ["e", 1, "#f08c78"], ["Fine", 1, "#46465a"]], [["nuota", 18, "#2864dc"], ["gioca", 7, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]]], "vasca": [["nuota", 18, "#2864dc"], ["gioca", 7, "#28aaaa"], ["onde", 4, "#3c78e6"], ["conchiglie", 3, "#508ceb"], ["sabbia", 2, "#5a96dc"], ["corre", 2, "#28aa50"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]], "pescata": "nuota"}, {"ultimo": "nuota", "finestre": [[["onde", 4, "#3c78e6"], ["conchiglie", 4, "#508ceb"], ["felice", 4, "#f5c84c"], ["Bovary", 3, "#f07064"], ["e", 3, "#f08c78"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["nuota", 3, "#2864dc"], ["gioca", 3, "#28aaaa"], ["foglie", 2, "#3cb45a"], ["scivolo", 2, "#46af64"], ["corre", 2, "#28aa50"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"]], [["felice", 5, "#f5c84c"], ["Bovary", 4, "#f07064"], ["e", 4, "#f08c78"], ["onde", 3, "#3c78e6"], ["foglie", 3, "#3cb45a"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], [".", 3, "#9696a0"], ["nuota", 2, "#2864dc"], ["gioca", 2, "#28aaaa"], ["corre", 1, "#28aa50"], ["Fine", 1, "#46465a"]], [["e", 6, "#f08c78"], ["felice", 5, "#f5c84c"], [".", 5, "#9696a0"], ["Bovary", 4, "#f07064"], ["onde", 3, "#3c78e6"], ["sabbia", 3, "#5a96dc"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["nuota", 1, "#2864dc"], ["corre", 1, "#28aa50"], ["gioca", 1, "#28aaaa"], ["Fine", 1, "#46465a"]]], "vasca": [["e", 6, "#f08c78"], ["felice", 5, "#f5c84c"], [".", 5, "#9696a0"], ["Bovary", 4, "#f07064"], ["onde", 3, "#3c78e6"], ["sabbia", 3, "#5a96dc"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["nuota", 1, "#2864dc"], ["corre", 1, "#28aa50"], ["gioca", 1, "#28aaaa"], ["Fine", 1, "#46465a"]], "pescata": "e"}, {"ultimo": "e", "finestre": [[["corre", 5, "#28aa50"], ["gioca", 5, "#28aaaa"], ["nuota", 4, "#2864dc"], ["onde", 3, "#3c78e6"], ["foglie", 3, "#3cb45a"], ["sabbia", 3, "#5a96dc"], ["altalena", 3, "#50be6e"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["Bovary", 2, "#f07064"], ["e", 2, "#f08c78"], ["Fine", 2, "#46465a"], ["felice", 1, "#f5c84c"], [".", 1, "#9696a0"]], [["gioca", 9, "#28aaaa"], ["corre", 8, "#28aa50"], ["nuota", 7, "#2864dc"], ["onde", 2, "#3c78e6"], ["foglie", 2, "#3cb45a"], ["sabbia", 2, "#5a96dc"], ["altalena", 2, "#50be6e"], ["conchiglie", 2, "#508ceb"], ["scivolo", 2, "#46af64"], ["Fine", 2, "#46465a"], ["Bovary", 1, "#f07064"], ["e", 1, "#f08c78"]], [["gioca", 13, "#28aaaa"], ["nuota", 10, "#2864dc"], ["corre", 10, "#28aa50"], ["onde", 1, "#3c78e6"], ["foglie", 1, "#3cb45a"], ["sabbia", 1, "#5a96dc"], ["altalena", 1, "#50be6e"], ["conchiglie", 1, "#508ceb"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]]], "vasca": [["gioca", 13, "#28aaaa"], ["nuota", 10, "#2864dc"], ["corre", 10, "#28aa50"], ["onde", 1, "#3c78e6"], ["foglie", 1, "#3cb45a"], ["sabbia", 1, "#5a96dc"], ["altalena", 1, "#50be6e"], ["conchiglie", 1, "#508ceb"], ["scivolo", 1, "#46af64"], ["Fine", 1, "#46465a"]], "pescata": "gioca"}, {"ultimo": "gioca", "finestre": [[["felice", 4, "#f5c84c"], ["Bovary", 3, "#f07064"], ["e", 3, "#f08c78"], ["onde", 3, "#3c78e6"], ["sabbia", 3, "#5a96dc"], ["conchiglie", 3, "#508ceb"], ["scivolo", 3, "#46af64"], ["nuota", 3, "#2864dc"], ["gioca", 3, "#28aaaa"], [".", 3, "#9696a0"], ["Fine", 3, "#46465a"], ["foglie", 2, "#3cb45a"], ["altalena", 2, "#50be6e"], ["corre", 2, "#28aa50"]], [[".", 14, "#9696a0"], ["Fine", 6, "#46465a"], ["e", 4, "#f08c78"], ["felice", 4, "#f5c84c"], ["Bovary", 2, "#f07064"], ["foglie", 2, "#3cb45a"], ["onde", 1, "#3c78e6"], ["sabbia", 1, "#5a96dc"], ["altalena", 1, "#50be6e"], ["conchiglie", 1, "#508ceb"], ["scivolo", 1, "#46af64"], ["nuota", 1, "#2864dc"], ["corre", 1, "#28aa50"], ["gioca", 1, "#28aaaa"]], [[".", 22, "#9696a0"], ["Fine", 8, "#46465a"], ["e", 3, "#f08c78"], ["felice", 2, "#f5c84c"], ["Bovary", 1, "#f07064"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["corre", 1, "#28aa50"]]], "vasca": [[".", 22, "#9696a0"], ["Fine", 8, "#46465a"], ["e", 3, "#f08c78"], ["felice", 2, "#f5c84c"], ["Bovary", 1, "#f07064"], ["foglie", 1, "#3cb45a"], ["altalena", 1, "#50be6e"], ["scivolo", 1, "#46af64"], ["corre", 1, "#28aa50"]], "pescata": "."}, {"ultimo": ".", "finestre": [[[".", 8, "#9696a0"], ["Fine", 7, "#46465a"], ["e", 3, "#f08c78"], ["felice", 3, "#f5c84c"], ["Bovary", 2, "#f07064"], ["onde", 2, "#3c78e6"], ["foglie", 2, "#3cb45a"], ["sabbia", 2, "#5a96dc"], ["altalena", 2, "#50be6e"], ["conchiglie", 2, "#508ceb"], ["scivolo", 2, "#46af64"], ["corre", 2, "#28aa50"], ["gioca", 2, "#28aaaa"], ["nuota", 1, "#2864dc"]], [["Fine", 16, "#46465a"], [".", 6, "#9696a0"], ["felice", 3, "#f5c84c"], ["e", 2, "#f08c78"], ["nuota", 2, "#2864dc"], ["corre", 2, "#28aa50"], ["gioca", 2, "#28aaaa"], ["Bovary", 1, "#f07064"], ["onde", 1, "#3c78e6"], ["foglie", 1, "#3cb45a"], ["sabbia", 1, "#5a96dc"], ["altalena", 1, "#50be6e"], ["conchiglie", 1, "#508ceb"], ["scivolo", 1, "#46af64"]], [["Fine", 27, "#46465a"], [".", 4, "#9696a0"], ["felice", 2, "#f5c84c"], ["Bovary", 1, "#f07064"], ["e", 1, "#f08c78"], ["foglie", 1, "#3cb45a"], ["scivolo", 1, "#46af64"], ["nuota", 1, "#2864dc"], ["corre", 1, "#28aa50"], ["gioca", 1, "#28aaaa"]]], "vasca": [["Fine", 27, "#46465a"], [".", 4, "#9696a0"], ["felice", 2, "#f5c84c"], ["Bovary", 1, "#f07064"], ["e", 1, "#f08c78"], ["foglie", 1, "#3cb45a"], ["scivolo", 1, "#46af64"], ["nuota", 1, "#2864dc"], ["corre", 1, "#28aa50"], ["gioca", 1, "#28aaaa"]], "pescata": "Fine"}]}, "cane": {"frase": ["Il", "cane", "di", "Emma", "si", "chiama"], "passeggeri": {"Il": {"biglietto": "#9d9272", "tratti": ["#a3926f", "#ac916b", "#b49068"], "fili": {"Il": 1.0}}, "cane": {"biglietto": "#c68e63", "tratti": ["#c68e62", "#c78e61", "#c78e61"], "fili": {"Il": 0.4, "cane": 0.6}}, "di": {"biglietto": "#889584", "tratti": ["#9b9374", "#b19069", "#bf8f65"], "fili": {"Il": 0.1, "cane": 0.6, "di": 0.3}}, "Emma": {"biglietto": "#bc937f", "tratti": ["#ba9380", "#b19485", "#a7958d"], "fili": {"Il": 0.1, "cane": 0.2, "di": 0.2, "Emma": 0.5}}, "si": {"biglietto": "#ad8965", "tratti": ["#ba8a62", "#c28c60", "#c68d5f"], "fili": {"Il": 0.1, "cane": 0.3, "di": 0.0, "Emma": 0.2, "si": 0.4}}, "chiama": {"biglietto": "#648dc3", "tratti": ["#688b85", "#bb865e", "#c38959"], "fili": {"Il": 0.0, "cane": 0.5, "di": 0.0, "Emma": 0.1, "si": 0.1, "chiama": 0.3}, "fili_tratti": [{"Il": 0.0, "cane": 0.5, "di": 0.0, "Emma": 0.1, "si": 0.1, "chiama": 0.3}, {"Il": 0.0, "cane": 0.4, "di": 0.0, "Emma": 0.1, "si": 0.1, "chiama": 0.4}, {"Il": 0.0, "cane": 0.3, "di": 0.0, "Emma": 0.1, "si": 0.1, "chiama": 0.5}], "dopo_fili": "#8093a1", "finestre": [[["Bovary", 2, "#f07064"], ["e", 2, "#f08c78"], ["onde", 2, "#3c78e6"], ["foglie", 2, "#3cb45a"], ["sabbia", 2, "#5a96dc"], ["altalena", 2, "#50be6e"], ["conchiglie", 2, "#508ceb"], ["scivolo", 2, "#46af64"], ["nuota", 2, "#2864dc"], ["corre", 2, "#28aa50"], ["gioca", 2, "#28aaaa"], ["felice", 2, "#f5c84c"], [".", 2, "#9696a0"], ["Fine", 2, "#46465a"], ["Briciola", 2, "#d6965c"], ["Fido", 2, "#b0764c"], ["Pallino", 2, "#e8b660"], ["Birba", 2, "#cc8068"], ["Macchia", 2, "#9e7054"], ["Biscotto", 2, "#e2a276"]], [["Briciola", 6, "#d6965c"], ["Fido", 6, "#b0764c"], ["Fine", 5, "#46465a"], ["Pallino", 5, "#e8b660"], ["Birba", 5, "#cc8068"], ["Macchia", 5, "#9e7054"], ["Biscotto", 5, "#e2a276"], ["corre", 1, "#28aa50"], ["gioca", 1, "#28aaaa"], [".", 1, "#9696a0"]], [["Fido", 8, "#b0764c"], ["Briciola", 7, "#d6965c"], ["Macchia", 7, "#9e7054"], ["Pallino", 6, "#e8b660"], ["Birba", 6, "#cc8068"], ["Biscotto", 6, "#e2a276"]]]}}, "vasca": [["Fido", 8, "#b0764c"], ["Briciola", 7, "#d6965c"], ["Macchia", 7, "#9e7054"], ["Pallino", 6, "#e8b660"], ["Birba", 6, "#cc8068"], ["Biscotto", 6, "#e2a276"]], "probabilita": {"Fido": 0.187, "Briciola": 0.174, "Macchia": 0.165, "Pallino": 0.162, "Birba": 0.154, "Biscotto": 0.152, "Fine": 0.006, ".": 0.0}, "pesca": "Briciola", "nuovo": {"Briciola": "#c88d5f"}}, "grande": {"frase": ["Al", "mare", "Emma"], "biglietti": {"Al": "#c98a6a", "mare": "#8f6fc4", "Emma": "#b5b08a"}, "uscita": {"Al": "#c4876e", "mare": "#8a6ccc", "Emma": "#8246d2"}, "fili_emma": {"Al": 0.15, "mare": 0.6, "Emma": 0.25}, "emma_finestre": ["#9e9c9c", "#9e9c9c", "#9e9c9c", "#9f9b9c", "#9f999d", "#9f959e", "#a08ea0", "#9f83a5", "#9d72ae", "#9962b9", "#9456c2", "#8f4ec8", "#8b4acc", "#8848ce", "#8647cf", "#8547d0", "#8446d1", "#8346d1", "#8346d2", "#8246d2", "#8246d2", "#8246d2", "#8246d2", "#8246d2"], "finestre": [[["nuota", 2, "#8246d2"], ["gioca", 2, "#dc5aa0"], ["onde", 2, "#9664dc"], ["corre", 2, "#eb8228"], ["conchiglie", 2, "#a573d7"], ["sabbia", 2, "#b487d2"], ["e", 2, "#64a578"], ["felice", 2, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 2, "#727fca"], ["coda165", 2, "#ca7f72"], ["coda166", 2, "#72ca99"], ["coda167", 2, "#b272ca"], ["coda168", 2, "#c8ca72"], ["coda169", 2, "#72aeca"], ["coda170", 2, "#ca7295"], ["coda171", 2, "#7bca72"], ["coda172", 2, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 2, "#8246d2"], ["gioca", 2, "#dc5aa0"], ["onde", 2, "#9664dc"], ["corre", 2, "#eb8228"], ["conchiglie", 2, "#a573d7"], ["sabbia", 2, "#b487d2"], ["e", 2, "#64a578"], ["felice", 2, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 2, "#727fca"], ["coda165", 2, "#ca7f72"], ["coda166", 2, "#72ca99"], ["coda167", 2, "#b272ca"], ["coda168", 2, "#c8ca72"], ["coda169", 2, "#72aeca"], ["coda170", 2, "#ca7295"], ["coda171", 2, "#7bca72"], ["coda172", 2, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 2, "#8246d2"], ["gioca", 2, "#dc5aa0"], ["onde", 2, "#9664dc"], ["corre", 2, "#eb8228"], ["conchiglie", 2, "#a573d7"], ["sabbia", 2, "#b487d2"], ["e", 2, "#64a578"], ["felice", 2, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 2, "#727fca"], ["coda165", 2, "#ca7f72"], ["coda166", 2, "#72ca99"], ["coda167", 2, "#b272ca"], ["coda168", 2, "#c8ca72"], ["coda169", 2, "#72aeca"], ["coda170", 2, "#ca7295"], ["coda171", 2, "#7bca72"], ["coda172", 2, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 2, "#8246d2"], ["gioca", 2, "#dc5aa0"], ["onde", 2, "#9664dc"], ["corre", 2, "#eb8228"], ["conchiglie", 2, "#a573d7"], ["sabbia", 2, "#b487d2"], ["e", 2, "#64a578"], ["felice", 2, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 2, "#727fca"], ["coda165", 2, "#ca7f72"], ["coda166", 2, "#72ca99"], ["coda167", 2, "#b272ca"], ["coda168", 2, "#c8ca72"], ["coda169", 2, "#72aeca"], ["coda170", 2, "#ca7295"], ["coda171", 2, "#7bca72"], ["coda172", 2, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 2, "#8246d2"], ["gioca", 2, "#dc5aa0"], ["onde", 2, "#9664dc"], ["corre", 2, "#eb8228"], ["conchiglie", 2, "#a573d7"], ["sabbia", 2, "#b487d2"], ["e", 2, "#64a578"], ["felice", 2, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 2, "#727fca"], ["coda165", 2, "#ca7f72"], ["coda166", 2, "#72ca99"], ["coda167", 2, "#b272ca"], ["coda168", 2, "#c8ca72"], ["coda169", 2, "#72aeca"], ["coda170", 2, "#ca7295"], ["coda171", 2, "#7bca72"], ["coda172", 2, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 2, "#8246d2"], ["gioca", 2, "#dc5aa0"], ["onde", 2, "#9664dc"], ["corre", 2, "#eb8228"], ["conchiglie", 2, "#a573d7"], ["sabbia", 2, "#b487d2"], ["e", 2, "#64a578"], ["felice", 2, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 2, "#727fca"], ["coda165", 2, "#ca7f72"], ["coda166", 2, "#72ca99"], ["coda167", 2, "#b272ca"], ["coda168", 2, "#c8ca72"], ["coda169", 2, "#72aeca"], ["coda170", 2, "#ca7295"], ["coda171", 2, "#7bca72"], ["coda172", 2, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 3, "#8246d2"], ["gioca", 3, "#dc5aa0"], ["onde", 2, "#9664dc"], ["corre", 2, "#eb8228"], ["conchiglie", 2, "#a573d7"], ["sabbia", 2, "#b487d2"], ["e", 2, "#64a578"], ["felice", 2, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 2, "#727fca"], ["coda165", 2, "#ca7f72"], ["coda166", 2, "#72ca99"], ["coda167", 2, "#b272ca"], ["coda168", 2, "#c8ca72"], ["coda169", 2, "#72aeca"], ["coda170", 2, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 3, "#8246d2"], ["gioca", 3, "#dc5aa0"], ["onde", 3, "#9664dc"], ["corre", 3, "#eb8228"], ["conchiglie", 3, "#a573d7"], ["sabbia", 3, "#b487d2"], ["e", 2, "#64a578"], ["felice", 2, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 2, "#727fca"], ["coda165", 2, "#ca7f72"], ["coda166", 2, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 4, "#8246d2"], ["gioca", 3, "#dc5aa0"], ["onde", 3, "#9664dc"], ["corre", 3, "#eb8228"], ["conchiglie", 3, "#a573d7"], ["sabbia", 3, "#b487d2"], ["e", 3, "#64a578"], ["felice", 3, "#5abec8"], ["altalena", 2, "#f0a555"], ["scivolo", 2, "#e18c46"], ["foglie", 2, "#e6963c"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda1", 2, "#72ca8c"], ["coda2", 2, "#a572ca"], ["coda3", 2, "#cabf72"], ["coda4", 2, "#72bbca"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 2, "#c472ca"], ["coda155", 2, "#b6ca72"], ["coda156", 2, "#729cca"], ["coda157", 2, "#ca7283"], ["coda158", 2, "#72ca7c"], ["coda159", 2, "#9572ca"], ["coda160", 2, "#caae72"], ["coda161", 2, "#72cac8"], ["coda162", 2, "#ca72b2"], ["coda163", 2, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 5, "#8246d2"], ["gioca", 4, "#dc5aa0"], ["onde", 4, "#9664dc"], ["corre", 3, "#eb8228"], ["conchiglie", 3, "#a573d7"], ["sabbia", 3, "#b487d2"], ["e", 3, "#64a578"], ["felice", 3, "#5abec8"], ["altalena", 3, "#f0a555"], ["scivolo", 3, "#e18c46"], ["foglie", 3, "#e6963c"], ["coda1", 3, "#72ca8c"], ["coda2", 3, "#a572ca"], ["coda3", 3, "#cabf72"], ["coda4", 3, "#72bbca"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda5", 2, "#ca72a2"], ["coda6", 2, "#88ca72"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 2, "#ca7472"], ["coda145", 2, "#72ca8e"], ["coda146", 2, "#a772ca"], ["coda147", 2, "#cac172"], ["coda148", 2, "#72b9ca"], ["coda149", 2, "#ca72a0"], ["coda150", 2, "#87ca72"], ["coda151", 2, "#7872ca"], ["coda152", 2, "#ca9172"], ["coda153", 2, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 6, "#8246d2"], ["gioca", 5, "#dc5aa0"], ["onde", 4, "#9664dc"], ["corre", 4, "#eb8228"], ["conchiglie", 4, "#a573d7"], ["sabbia", 4, "#b487d2"], ["e", 3, "#64a578"], ["felice", 3, "#5abec8"], ["altalena", 3, "#f0a555"], ["scivolo", 3, "#e18c46"], ["foglie", 3, "#e6963c"], ["Bovary", 3, "#78b45a"], ["coda1", 3, "#72ca8c"], ["coda2", 3, "#a572ca"], ["coda3", 3, "#cabf72"], ["coda4", 3, "#72bbca"], ["coda5", 3, "#ca72a2"], ["coda6", 3, "#88ca72"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 2, "#72caa0"], ["coda133", 2, "#b972ca"], ["coda134", 2, "#c1ca72"], ["coda135", 2, "#72a7ca"], ["coda136", 2, "#ca728e"], ["coda137", 2, "#75ca72"], ["coda138", 2, "#8a72ca"], ["coda139", 2, "#caa372"], ["coda140", 2, "#72cabd"], ["coda141", 2, "#ca72bd"], ["coda142", 2, "#a4ca72"], ["coda143", 2, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 8, "#8246d2"], ["gioca", 6, "#dc5aa0"], ["onde", 5, "#9664dc"], ["corre", 4, "#eb8228"], ["conchiglie", 4, "#a573d7"], ["sabbia", 4, "#b487d2"], ["e", 4, "#64a578"], ["felice", 4, "#5abec8"], ["altalena", 3, "#f0a555"], ["scivolo", 3, "#e18c46"], ["foglie", 3, "#e6963c"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda1", 3, "#72ca8c"], ["coda2", 3, "#a572ca"], ["coda3", 3, "#cabf72"], ["coda4", 3, "#72bbca"], ["coda5", 3, "#ca72a2"], ["coda6", 3, "#88ca72"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 2, "#afca72"], ["coda122", 2, "#7295ca"], ["coda123", 2, "#ca727c"], ["coda124", 2, "#72ca82"], ["coda125", 2, "#9c72ca"], ["coda126", 2, "#cab572"], ["coda127", 2, "#72c5ca"], ["coda128", 2, "#ca72ab"], ["coda129", 2, "#92ca72"], ["coda130", 2, "#7278ca"], ["coda131", 2, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 10, "#8246d2"], ["gioca", 7, "#dc5aa0"], ["onde", 6, "#9664dc"], ["corre", 5, "#eb8228"], ["conchiglie", 5, "#a573d7"], ["sabbia", 5, "#b487d2"], ["e", 4, "#64a578"], ["felice", 4, "#5abec8"], ["coda1", 4, "#72ca8c"], ["altalena", 3, "#f0a555"], ["scivolo", 3, "#e18c46"], ["foglie", 3, "#e6963c"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda2", 3, "#a572ca"], ["coda3", 3, "#cabf72"], ["coda4", 3, "#72bbca"], ["coda5", 3, "#ca72a2"], ["coda6", 3, "#88ca72"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 3, "#ca7285"], ["coda14", 3, "#72ca7a"], ["coda15", 3, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 2, "#caaa72"], ["coda106", 2, "#72cac4"], ["coda107", 2, "#ca72b6"], ["coda108", 2, "#9dca72"], ["coda109", 2, "#7283ca"], ["coda110", 2, "#ca7b72"], ["coda111", 2, "#72ca94"], ["coda112", 2, "#ae72ca"], ["coda113", 2, "#cac772"], ["coda114", 2, "#72b3ca"], ["coda115", 2, "#ca7299"], ["coda116", 2, "#80ca72"], ["coda117", 2, "#7f72ca"], ["coda118", 2, "#ca9872"], ["coda119", 2, "#72cab2"], ["coda120", 2, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 13, "#8246d2"], ["gioca", 9, "#dc5aa0"], ["onde", 6, "#9664dc"], ["corre", 6, "#eb8228"], ["conchiglie", 5, "#a573d7"], ["sabbia", 5, "#b487d2"], ["e", 5, "#64a578"], ["felice", 5, "#5abec8"], ["altalena", 4, "#f0a555"], ["scivolo", 4, "#e18c46"], ["foglie", 4, "#e6963c"], ["coda1", 4, "#72ca8c"], ["coda2", 4, "#a572ca"], ["coda3", 4, "#cabf72"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda4", 3, "#72bbca"], ["coda5", 3, "#ca72a2"], ["coda6", 3, "#88ca72"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 3, "#ca7285"], ["coda14", 3, "#72ca7a"], ["coda15", 3, "#9372ca"], ["coda16", 3, "#caad72"], ["coda17", 3, "#72cac6"], ["coda18", 3, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 2, "#a372ca"], ["coda92", 2, "#cabc72"], ["coda93", 2, "#72beca"], ["coda94", 2, "#ca72a4"], ["coda95", 2, "#8bca72"], ["coda96", 2, "#7472ca"], ["coda97", 2, "#ca8d72"], ["coda98", 2, "#72caa7"], ["coda99", 2, "#c072ca"], ["coda100", 2, "#baca72"], ["coda101", 2, "#72a1ca"], ["coda102", 2, "#ca7287"], ["coda103", 2, "#72ca77"], ["coda104", 2, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"], ["coda114", 1, "#72b3ca"], ["coda115", 1, "#ca7299"], ["coda116", 1, "#80ca72"], ["coda117", 1, "#7f72ca"], ["coda118", 1, "#ca9872"], ["coda119", 1, "#72cab2"], ["coda120", 1, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 17, "#8246d2"], ["gioca", 11, "#dc5aa0"], ["onde", 8, "#9664dc"], ["corre", 7, "#eb8228"], ["conchiglie", 6, "#a573d7"], ["sabbia", 6, "#b487d2"], ["e", 5, "#64a578"], ["felice", 5, "#5abec8"], ["altalena", 4, "#f0a555"], ["scivolo", 4, "#e18c46"], ["foglie", 4, "#e6963c"], ["coda1", 4, "#72ca8c"], ["coda2", 4, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 4, "#ca72a2"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda6", 3, "#88ca72"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 3, "#ca7285"], ["coda14", 3, "#72ca7a"], ["coda15", 3, "#9372ca"], ["coda16", 3, "#caad72"], ["coda17", 3, "#72cac6"], ["coda18", 3, "#ca72b4"], ["coda19", 3, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 2, "#ca8272"], ["coda77", 2, "#72ca9b"], ["coda78", 2, "#b572ca"], ["coda79", 2, "#c5ca72"], ["coda80", 2, "#72acca"], ["coda81", 2, "#ca7292"], ["coda82", 2, "#79ca72"], ["coda83", 2, "#8672ca"], ["coda84", 2, "#ca9f72"], ["coda85", 2, "#72cab9"], ["coda86", 2, "#ca72c1"], ["coda87", 2, "#a8ca72"], ["coda88", 2, "#728fca"], ["coda89", 2, "#ca7275"], ["coda90", 2, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"], ["coda93", 1, "#72beca"], ["coda94", 1, "#ca72a4"], ["coda95", 1, "#8bca72"], ["coda96", 1, "#7472ca"], ["coda97", 1, "#ca8d72"], ["coda98", 1, "#72caa7"], ["coda99", 1, "#c072ca"], ["coda100", 1, "#baca72"], ["coda101", 1, "#72a1ca"], ["coda102", 1, "#ca7287"], ["coda103", 1, "#72ca77"], ["coda104", 1, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"], ["coda114", 1, "#72b3ca"], ["coda115", 1, "#ca7299"], ["coda116", 1, "#80ca72"], ["coda117", 1, "#7f72ca"], ["coda118", 1, "#ca9872"], ["coda119", 1, "#72cab2"], ["coda120", 1, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 22, "#8246d2"], ["gioca", 13, "#dc5aa0"], ["onde", 9, "#9664dc"], ["corre", 8, "#eb8228"], ["conchiglie", 7, "#a573d7"], ["sabbia", 7, "#b487d2"], ["e", 6, "#64a578"], ["felice", 6, "#5abec8"], ["coda1", 5, "#72ca8c"], ["altalena", 4, "#f0a555"], ["scivolo", 4, "#e18c46"], ["foglie", 4, "#e6963c"], ["coda2", 4, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 4, "#ca72a2"], ["coda6", 4, "#88ca72"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 3, "#ca7285"], ["coda14", 3, "#72ca7a"], ["coda15", 3, "#9372ca"], ["coda16", 3, "#caad72"], ["coda17", 3, "#72cac6"], ["coda18", 3, "#ca72b4"], ["coda19", 3, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 2, "#ca729d"], ["coda61", 2, "#84ca72"], ["coda62", 2, "#7a72ca"], ["coda63", 2, "#ca9472"], ["coda64", 2, "#72caad"], ["coda65", 2, "#c772ca"], ["coda66", 2, "#b3ca72"], ["coda67", 2, "#729aca"], ["coda68", 2, "#ca7280"], ["coda69", 2, "#72ca7e"], ["coda70", 2, "#9872ca"], ["coda71", 2, "#cab172"], ["coda72", 2, "#72c9ca"], ["coda73", 2, "#ca72af"], ["coda74", 2, "#96ca72"], ["coda75", 2, "#727dca"], ["coda76", 1, "#ca8272"], ["coda77", 1, "#72ca9b"], ["coda78", 1, "#b572ca"], ["coda79", 1, "#c5ca72"], ["coda80", 1, "#72acca"], ["coda81", 1, "#ca7292"], ["coda82", 1, "#79ca72"], ["coda83", 1, "#8672ca"], ["coda84", 1, "#ca9f72"], ["coda85", 1, "#72cab9"], ["coda86", 1, "#ca72c1"], ["coda87", 1, "#a8ca72"], ["coda88", 1, "#728fca"], ["coda89", 1, "#ca7275"], ["coda90", 1, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"], ["coda93", 1, "#72beca"], ["coda94", 1, "#ca72a4"], ["coda95", 1, "#8bca72"], ["coda96", 1, "#7472ca"], ["coda97", 1, "#ca8d72"], ["coda98", 1, "#72caa7"], ["coda99", 1, "#c072ca"], ["coda100", 1, "#baca72"], ["coda101", 1, "#72a1ca"], ["coda102", 1, "#ca7287"], ["coda103", 1, "#72ca77"], ["coda104", 1, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"], ["coda114", 1, "#72b3ca"], ["coda115", 1, "#ca7299"], ["coda116", 1, "#80ca72"], ["coda117", 1, "#7f72ca"], ["coda118", 1, "#ca9872"], ["coda119", 1, "#72cab2"], ["coda120", 1, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 29, "#8246d2"], ["gioca", 16, "#dc5aa0"], ["onde", 10, "#9664dc"], ["corre", 9, "#eb8228"], ["conchiglie", 8, "#a573d7"], ["sabbia", 8, "#b487d2"], ["e", 6, "#64a578"], ["felice", 6, "#5abec8"], ["altalena", 5, "#f0a555"], ["scivolo", 5, "#e18c46"], ["foglie", 5, "#e6963c"], ["coda1", 5, "#72ca8c"], ["coda2", 5, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 4, "#ca72a2"], ["coda6", 4, "#88ca72"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 3, "#ca7285"], ["coda14", 3, "#72ca7a"], ["coda15", 3, "#9372ca"], ["coda16", 3, "#caad72"], ["coda17", 3, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 2, "#72caa2"], ["coda44", 2, "#bc72ca"], ["coda45", 2, "#beca72"], ["coda46", 2, "#72a5ca"], ["coda47", 2, "#ca728b"], ["coda48", 2, "#72ca73"], ["coda49", 2, "#8d72ca"], ["coda50", 2, "#caa672"], ["coda51", 2, "#72cabf"], ["coda52", 2, "#ca72bb"], ["coda53", 2, "#a1ca72"], ["coda54", 2, "#7288ca"], ["coda55", 2, "#ca7772"], ["coda56", 2, "#72ca90"], ["coda57", 2, "#aa72ca"], ["coda58", 2, "#cac372"], ["coda59", 2, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"], ["coda74", 1, "#96ca72"], ["coda75", 1, "#727dca"], ["coda76", 1, "#ca8272"], ["coda77", 1, "#72ca9b"], ["coda78", 1, "#b572ca"], ["coda79", 1, "#c5ca72"], ["coda80", 1, "#72acca"], ["coda81", 1, "#ca7292"], ["coda82", 1, "#79ca72"], ["coda83", 1, "#8672ca"], ["coda84", 1, "#ca9f72"], ["coda85", 1, "#72cab9"], ["coda86", 1, "#ca72c1"], ["coda87", 1, "#a8ca72"], ["coda88", 1, "#728fca"], ["coda89", 1, "#ca7275"], ["coda90", 1, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"], ["coda93", 1, "#72beca"], ["coda94", 1, "#ca72a4"], ["coda95", 1, "#8bca72"], ["coda96", 1, "#7472ca"], ["coda97", 1, "#ca8d72"], ["coda98", 1, "#72caa7"], ["coda99", 1, "#c072ca"], ["coda100", 1, "#baca72"], ["coda101", 1, "#72a1ca"], ["coda102", 1, "#ca7287"], ["coda103", 1, "#72ca77"], ["coda104", 1, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"], ["coda114", 1, "#72b3ca"], ["coda115", 1, "#ca7299"], ["coda116", 1, "#80ca72"], ["coda117", 1, "#7f72ca"], ["coda118", 1, "#ca9872"], ["coda119", 1, "#72cab2"], ["coda120", 1, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 38, "#8246d2"], ["gioca", 19, "#dc5aa0"], ["onde", 12, "#9664dc"], ["corre", 10, "#eb8228"], ["conchiglie", 9, "#a573d7"], ["sabbia", 9, "#b487d2"], ["e", 7, "#64a578"], ["felice", 7, "#5abec8"], ["altalena", 5, "#f0a555"], ["scivolo", 5, "#e18c46"], ["foglie", 5, "#e6963c"], ["coda1", 5, "#72ca8c"], ["coda2", 5, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 4, "#ca72a2"], ["coda6", 4, "#88ca72"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 3, "#ca7285"], ["coda14", 3, "#72ca7a"], ["coda15", 3, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 2, "#9f72ca"], ["coda37", 2, "#cab872"], ["coda38", 2, "#72c2ca"], ["coda39", 2, "#ca72a9"], ["coda40", 2, "#8fca72"], ["coda41", 2, "#7276ca"], ["coda42", 2, "#ca8972"], ["coda43", 1, "#72caa2"], ["coda44", 1, "#bc72ca"], ["coda45", 1, "#beca72"], ["coda46", 1, "#72a5ca"], ["coda47", 1, "#ca728b"], ["coda48", 1, "#72ca73"], ["coda49", 1, "#8d72ca"], ["coda50", 1, "#caa672"], ["coda51", 1, "#72cabf"], ["coda52", 1, "#ca72bb"], ["coda53", 1, "#a1ca72"], ["coda54", 1, "#7288ca"], ["coda55", 1, "#ca7772"], ["coda56", 1, "#72ca90"], ["coda57", 1, "#aa72ca"], ["coda58", 1, "#cac372"], ["coda59", 1, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"], ["coda74", 1, "#96ca72"], ["coda75", 1, "#727dca"], ["coda76", 1, "#ca8272"], ["coda77", 1, "#72ca9b"], ["coda78", 1, "#b572ca"], ["coda79", 1, "#c5ca72"], ["coda80", 1, "#72acca"], ["coda81", 1, "#ca7292"], ["coda82", 1, "#79ca72"], ["coda83", 1, "#8672ca"], ["coda84", 1, "#ca9f72"], ["coda85", 1, "#72cab9"], ["coda86", 1, "#ca72c1"], ["coda87", 1, "#a8ca72"], ["coda88", 1, "#728fca"], ["coda89", 1, "#ca7275"], ["coda90", 1, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"], ["coda93", 1, "#72beca"], ["coda94", 1, "#ca72a4"], ["coda95", 1, "#8bca72"], ["coda96", 1, "#7472ca"], ["coda97", 1, "#ca8d72"], ["coda98", 1, "#72caa7"], ["coda99", 1, "#c072ca"], ["coda100", 1, "#baca72"], ["coda101", 1, "#72a1ca"], ["coda102", 1, "#ca7287"], ["coda103", 1, "#72ca77"], ["coda104", 1, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"], ["coda114", 1, "#72b3ca"], ["coda115", 1, "#ca7299"], ["coda116", 1, "#80ca72"], ["coda117", 1, "#7f72ca"], ["coda118", 1, "#ca9872"], ["coda119", 1, "#72cab2"], ["coda120", 1, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"], ["coda185", 1, "#7274ca"], ["coda186", 1, "#ca8a72"], ["coda187", 1, "#72caa4"], ["coda188", 1, "#bd72ca"], ["coda189", 1, "#bdca72"], ["coda190", 1, "#72a3ca"], ["coda191", 1, "#ca728a"], ["coda192", 1, "#72ca75"], ["coda193", 1, "#8e72ca"], ["coda194", 1, "#caa872"], ["coda195", 1, "#72cac1"], ["coda196", 1, "#ca72b9"], ["coda197", 1, "#9fca72"], ["coda198", 1, "#7286ca"], ["coda199", 1, "#ca7872"], ["coda200", 1, "#72ca92"]], [["nuota", 50, "#8246d2"], ["gioca", 24, "#dc5aa0"], ["onde", 14, "#9664dc"], ["corre", 12, "#eb8228"], ["conchiglie", 10, "#a573d7"], ["sabbia", 10, "#b487d2"], ["e", 8, "#64a578"], ["felice", 8, "#5abec8"], ["altalena", 5, "#f0a555"], ["scivolo", 5, "#e18c46"], ["foglie", 5, "#e6963c"], ["coda1", 5, "#72ca8c"], ["coda2", 5, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 4, "#ca72a2"], ["coda6", 4, "#88ca72"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 3, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 2, "#7293ca"], ["coda34", 2, "#ca7279"], ["coda35", 2, "#72ca85"], ["coda36", 1, "#9f72ca"], ["coda37", 1, "#cab872"], ["coda38", 1, "#72c2ca"], ["coda39", 1, "#ca72a9"], ["coda40", 1, "#8fca72"], ["coda41", 1, "#7276ca"], ["coda42", 1, "#ca8972"], ["coda43", 1, "#72caa2"], ["coda44", 1, "#bc72ca"], ["coda45", 1, "#beca72"], ["coda46", 1, "#72a5ca"], ["coda47", 1, "#ca728b"], ["coda48", 1, "#72ca73"], ["coda49", 1, "#8d72ca"], ["coda50", 1, "#caa672"], ["coda51", 1, "#72cabf"], ["coda52", 1, "#ca72bb"], ["coda53", 1, "#a1ca72"], ["coda54", 1, "#7288ca"], ["coda55", 1, "#ca7772"], ["coda56", 1, "#72ca90"], ["coda57", 1, "#aa72ca"], ["coda58", 1, "#cac372"], ["coda59", 1, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"], ["coda74", 1, "#96ca72"], ["coda75", 1, "#727dca"], ["coda76", 1, "#ca8272"], ["coda77", 1, "#72ca9b"], ["coda78", 1, "#b572ca"], ["coda79", 1, "#c5ca72"], ["coda80", 1, "#72acca"], ["coda81", 1, "#ca7292"], ["coda82", 1, "#79ca72"], ["coda83", 1, "#8672ca"], ["coda84", 1, "#ca9f72"], ["coda85", 1, "#72cab9"], ["coda86", 1, "#ca72c1"], ["coda87", 1, "#a8ca72"], ["coda88", 1, "#728fca"], ["coda89", 1, "#ca7275"], ["coda90", 1, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"], ["coda93", 1, "#72beca"], ["coda94", 1, "#ca72a4"], ["coda95", 1, "#8bca72"], ["coda96", 1, "#7472ca"], ["coda97", 1, "#ca8d72"], ["coda98", 1, "#72caa7"], ["coda99", 1, "#c072ca"], ["coda100", 1, "#baca72"], ["coda101", 1, "#72a1ca"], ["coda102", 1, "#ca7287"], ["coda103", 1, "#72ca77"], ["coda104", 1, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"], ["coda114", 1, "#72b3ca"], ["coda115", 1, "#ca7299"], ["coda116", 1, "#80ca72"], ["coda117", 1, "#7f72ca"], ["coda118", 1, "#ca9872"], ["coda119", 1, "#72cab2"], ["coda120", 1, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"], ["coda163", 1, "#99ca72"], ["coda164", 1, "#727fca"], ["coda165", 1, "#ca7f72"], ["coda166", 1, "#72ca99"], ["coda167", 1, "#b272ca"], ["coda168", 1, "#c8ca72"], ["coda169", 1, "#72aeca"], ["coda170", 1, "#ca7295"], ["coda171", 1, "#7bca72"], ["coda172", 1, "#8372ca"], ["coda173", 1, "#ca9c72"], ["coda174", 1, "#72cab6"], ["coda175", 1, "#ca72c4"], ["coda176", 1, "#abca72"], ["coda177", 1, "#7291ca"], ["coda178", 1, "#ca7278"], ["coda179", 1, "#72ca87"], ["coda180", 1, "#a072ca"], ["coda181", 1, "#caba72"], ["coda182", 1, "#72c0ca"], ["coda183", 1, "#ca72a7"], ["coda184", 1, "#8dca72"]], [["nuota", 66, "#8246d2"], ["gioca", 29, "#dc5aa0"], ["onde", 15, "#9664dc"], ["corre", 13, "#eb8228"], ["conchiglie", 11, "#a573d7"], ["sabbia", 11, "#b487d2"], ["e", 8, "#64a578"], ["felice", 8, "#5abec8"], ["altalena", 5, "#f0a555"], ["scivolo", 5, "#e18c46"], ["foglie", 5, "#e6963c"], ["coda1", 5, "#72ca8c"], ["coda2", 5, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 4, "#ca72a2"], ["coda6", 4, "#88ca72"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 3, "#729eca"], ["coda13", 3, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 2, "#ca9b72"], ["coda30", 2, "#72cab4"], ["coda31", 2, "#ca72c6"], ["coda32", 2, "#acca72"], ["coda33", 1, "#7293ca"], ["coda34", 1, "#ca7279"], ["coda35", 1, "#72ca85"], ["coda36", 1, "#9f72ca"], ["coda37", 1, "#cab872"], ["coda38", 1, "#72c2ca"], ["coda39", 1, "#ca72a9"], ["coda40", 1, "#8fca72"], ["coda41", 1, "#7276ca"], ["coda42", 1, "#ca8972"], ["coda43", 1, "#72caa2"], ["coda44", 1, "#bc72ca"], ["coda45", 1, "#beca72"], ["coda46", 1, "#72a5ca"], ["coda47", 1, "#ca728b"], ["coda48", 1, "#72ca73"], ["coda49", 1, "#8d72ca"], ["coda50", 1, "#caa672"], ["coda51", 1, "#72cabf"], ["coda52", 1, "#ca72bb"], ["coda53", 1, "#a1ca72"], ["coda54", 1, "#7288ca"], ["coda55", 1, "#ca7772"], ["coda56", 1, "#72ca90"], ["coda57", 1, "#aa72ca"], ["coda58", 1, "#cac372"], ["coda59", 1, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"], ["coda74", 1, "#96ca72"], ["coda75", 1, "#727dca"], ["coda76", 1, "#ca8272"], ["coda77", 1, "#72ca9b"], ["coda78", 1, "#b572ca"], ["coda79", 1, "#c5ca72"], ["coda80", 1, "#72acca"], ["coda81", 1, "#ca7292"], ["coda82", 1, "#79ca72"], ["coda83", 1, "#8672ca"], ["coda84", 1, "#ca9f72"], ["coda85", 1, "#72cab9"], ["coda86", 1, "#ca72c1"], ["coda87", 1, "#a8ca72"], ["coda88", 1, "#728fca"], ["coda89", 1, "#ca7275"], ["coda90", 1, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"], ["coda93", 1, "#72beca"], ["coda94", 1, "#ca72a4"], ["coda95", 1, "#8bca72"], ["coda96", 1, "#7472ca"], ["coda97", 1, "#ca8d72"], ["coda98", 1, "#72caa7"], ["coda99", 1, "#c072ca"], ["coda100", 1, "#baca72"], ["coda101", 1, "#72a1ca"], ["coda102", 1, "#ca7287"], ["coda103", 1, "#72ca77"], ["coda104", 1, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"], ["coda114", 1, "#72b3ca"], ["coda115", 1, "#ca7299"], ["coda116", 1, "#80ca72"], ["coda117", 1, "#7f72ca"], ["coda118", 1, "#ca9872"], ["coda119", 1, "#72cab2"], ["coda120", 1, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"], ["coda137", 1, "#75ca72"], ["coda138", 1, "#8a72ca"], ["coda139", 1, "#caa372"], ["coda140", 1, "#72cabd"], ["coda141", 1, "#ca72bd"], ["coda142", 1, "#a4ca72"], ["coda143", 1, "#728aca"], ["coda144", 1, "#ca7472"], ["coda145", 1, "#72ca8e"], ["coda146", 1, "#a772ca"], ["coda147", 1, "#cac172"], ["coda148", 1, "#72b9ca"], ["coda149", 1, "#ca72a0"], ["coda150", 1, "#87ca72"], ["coda151", 1, "#7872ca"], ["coda152", 1, "#ca9172"], ["coda153", 1, "#72caab"], ["coda154", 1, "#c472ca"], ["coda155", 1, "#b6ca72"], ["coda156", 1, "#729cca"], ["coda157", 1, "#ca7283"], ["coda158", 1, "#72ca7c"], ["coda159", 1, "#9572ca"], ["coda160", 1, "#caae72"], ["coda161", 1, "#72cac8"], ["coda162", 1, "#ca72b2"]], [["nuota", 85, "#8246d2"], ["gioca", 34, "#dc5aa0"], ["onde", 17, "#9664dc"], ["corre", 15, "#eb8228"], ["conchiglie", 12, "#a573d7"], ["sabbia", 12, "#b487d2"], ["e", 9, "#64a578"], ["felice", 9, "#5abec8"], ["coda1", 6, "#72ca8c"], ["altalena", 5, "#f0a555"], ["scivolo", 5, "#e18c46"], ["foglie", 5, "#e6963c"], ["coda2", 5, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 4, "#ca72a2"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda6", 3, "#88ca72"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 3, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 2, "#c9ca72"], ["coda25", 2, "#72b0ca"], ["coda26", 2, "#ca7297"], ["coda27", 2, "#7dca72"], ["coda28", 2, "#8172ca"], ["coda29", 1, "#ca9b72"], ["coda30", 1, "#72cab4"], ["coda31", 1, "#ca72c6"], ["coda32", 1, "#acca72"], ["coda33", 1, "#7293ca"], ["coda34", 1, "#ca7279"], ["coda35", 1, "#72ca85"], ["coda36", 1, "#9f72ca"], ["coda37", 1, "#cab872"], ["coda38", 1, "#72c2ca"], ["coda39", 1, "#ca72a9"], ["coda40", 1, "#8fca72"], ["coda41", 1, "#7276ca"], ["coda42", 1, "#ca8972"], ["coda43", 1, "#72caa2"], ["coda44", 1, "#bc72ca"], ["coda45", 1, "#beca72"], ["coda46", 1, "#72a5ca"], ["coda47", 1, "#ca728b"], ["coda48", 1, "#72ca73"], ["coda49", 1, "#8d72ca"], ["coda50", 1, "#caa672"], ["coda51", 1, "#72cabf"], ["coda52", 1, "#ca72bb"], ["coda53", 1, "#a1ca72"], ["coda54", 1, "#7288ca"], ["coda55", 1, "#ca7772"], ["coda56", 1, "#72ca90"], ["coda57", 1, "#aa72ca"], ["coda58", 1, "#cac372"], ["coda59", 1, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"], ["coda74", 1, "#96ca72"], ["coda75", 1, "#727dca"], ["coda76", 1, "#ca8272"], ["coda77", 1, "#72ca9b"], ["coda78", 1, "#b572ca"], ["coda79", 1, "#c5ca72"], ["coda80", 1, "#72acca"], ["coda81", 1, "#ca7292"], ["coda82", 1, "#79ca72"], ["coda83", 1, "#8672ca"], ["coda84", 1, "#ca9f72"], ["coda85", 1, "#72cab9"], ["coda86", 1, "#ca72c1"], ["coda87", 1, "#a8ca72"], ["coda88", 1, "#728fca"], ["coda89", 1, "#ca7275"], ["coda90", 1, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"], ["coda93", 1, "#72beca"], ["coda94", 1, "#ca72a4"], ["coda95", 1, "#8bca72"], ["coda96", 1, "#7472ca"], ["coda97", 1, "#ca8d72"], ["coda98", 1, "#72caa7"], ["coda99", 1, "#c072ca"], ["coda100", 1, "#baca72"], ["coda101", 1, "#72a1ca"], ["coda102", 1, "#ca7287"], ["coda103", 1, "#72ca77"], ["coda104", 1, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"], ["coda114", 1, "#72b3ca"], ["coda115", 1, "#ca7299"], ["coda116", 1, "#80ca72"], ["coda117", 1, "#7f72ca"], ["coda118", 1, "#ca9872"], ["coda119", 1, "#72cab2"], ["coda120", 1, "#ca72c8"], ["coda121", 1, "#afca72"], ["coda122", 1, "#7295ca"], ["coda123", 1, "#ca727c"], ["coda124", 1, "#72ca82"], ["coda125", 1, "#9c72ca"], ["coda126", 1, "#cab572"], ["coda127", 1, "#72c5ca"], ["coda128", 1, "#ca72ab"], ["coda129", 1, "#92ca72"], ["coda130", 1, "#7278ca"], ["coda131", 1, "#ca8672"], ["coda132", 1, "#72caa0"], ["coda133", 1, "#b972ca"], ["coda134", 1, "#c1ca72"], ["coda135", 1, "#72a7ca"], ["coda136", 1, "#ca728e"]], [["nuota", 107, "#8246d2"], ["gioca", 39, "#dc5aa0"], ["onde", 19, "#9664dc"], ["corre", 16, "#eb8228"], ["conchiglie", 12, "#a573d7"], ["sabbia", 12, "#b487d2"], ["e", 9, "#64a578"], ["felice", 9, "#5abec8"], ["altalena", 5, "#f0a555"], ["scivolo", 5, "#e18c46"], ["foglie", 5, "#e6963c"], ["coda1", 5, "#72ca8c"], ["coda2", 5, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 4, "#ca72a2"], ["Bovary", 3, "#78b45a"], [".", 3, "#aca28c"], ["Fine", 3, "#283e48"], ["coda6", 3, "#88ca72"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["coda9", 3, "#72caa9"], ["coda10", 3, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 2, "#7281ca"], ["coda21", 2, "#ca7e72"], ["coda22", 2, "#72ca97"], ["coda23", 2, "#b172ca"], ["coda24", 1, "#c9ca72"], ["coda25", 1, "#72b0ca"], ["coda26", 1, "#ca7297"], ["coda27", 1, "#7dca72"], ["coda28", 1, "#8172ca"], ["coda29", 1, "#ca9b72"], ["coda30", 1, "#72cab4"], ["coda31", 1, "#ca72c6"], ["coda32", 1, "#acca72"], ["coda33", 1, "#7293ca"], ["coda34", 1, "#ca7279"], ["coda35", 1, "#72ca85"], ["coda36", 1, "#9f72ca"], ["coda37", 1, "#cab872"], ["coda38", 1, "#72c2ca"], ["coda39", 1, "#ca72a9"], ["coda40", 1, "#8fca72"], ["coda41", 1, "#7276ca"], ["coda42", 1, "#ca8972"], ["coda43", 1, "#72caa2"], ["coda44", 1, "#bc72ca"], ["coda45", 1, "#beca72"], ["coda46", 1, "#72a5ca"], ["coda47", 1, "#ca728b"], ["coda48", 1, "#72ca73"], ["coda49", 1, "#8d72ca"], ["coda50", 1, "#caa672"], ["coda51", 1, "#72cabf"], ["coda52", 1, "#ca72bb"], ["coda53", 1, "#a1ca72"], ["coda54", 1, "#7288ca"], ["coda55", 1, "#ca7772"], ["coda56", 1, "#72ca90"], ["coda57", 1, "#aa72ca"], ["coda58", 1, "#cac372"], ["coda59", 1, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"], ["coda74", 1, "#96ca72"], ["coda75", 1, "#727dca"], ["coda76", 1, "#ca8272"], ["coda77", 1, "#72ca9b"], ["coda78", 1, "#b572ca"], ["coda79", 1, "#c5ca72"], ["coda80", 1, "#72acca"], ["coda81", 1, "#ca7292"], ["coda82", 1, "#79ca72"], ["coda83", 1, "#8672ca"], ["coda84", 1, "#ca9f72"], ["coda85", 1, "#72cab9"], ["coda86", 1, "#ca72c1"], ["coda87", 1, "#a8ca72"], ["coda88", 1, "#728fca"], ["coda89", 1, "#ca7275"], ["coda90", 1, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"], ["coda93", 1, "#72beca"], ["coda94", 1, "#ca72a4"], ["coda95", 1, "#8bca72"], ["coda96", 1, "#7472ca"], ["coda97", 1, "#ca8d72"], ["coda98", 1, "#72caa7"], ["coda99", 1, "#c072ca"], ["coda100", 1, "#baca72"], ["coda101", 1, "#72a1ca"], ["coda102", 1, "#ca7287"], ["coda103", 1, "#72ca77"], ["coda104", 1, "#9172ca"], ["coda105", 1, "#caaa72"], ["coda106", 1, "#72cac4"], ["coda107", 1, "#ca72b6"], ["coda108", 1, "#9dca72"], ["coda109", 1, "#7283ca"], ["coda110", 1, "#ca7b72"], ["coda111", 1, "#72ca94"], ["coda112", 1, "#ae72ca"], ["coda113", 1, "#cac772"]], [["nuota", 133, "#8246d2"], ["gioca", 44, "#dc5aa0"], ["onde", 20, "#9664dc"], ["corre", 16, "#eb8228"], ["conchiglie", 12, "#a573d7"], ["sabbia", 12, "#b487d2"], ["e", 9, "#64a578"], ["felice", 9, "#5abec8"], ["altalena", 5, "#f0a555"], ["scivolo", 5, "#e18c46"], ["foglie", 5, "#e6963c"], ["coda1", 5, "#72ca8c"], ["coda2", 4, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 4, "#72bbca"], ["coda5", 3, "#ca72a2"], ["coda6", 3, "#88ca72"], ["coda7", 3, "#7672ca"], ["coda8", 3, "#ca9072"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 2, "#caad72"], ["coda17", 2, "#72cac6"], ["coda18", 2, "#ca72b4"], ["coda19", 2, "#9aca72"], ["coda20", 1, "#7281ca"], ["coda21", 1, "#ca7e72"], ["coda22", 1, "#72ca97"], ["coda23", 1, "#b172ca"], ["coda24", 1, "#c9ca72"], ["coda25", 1, "#72b0ca"], ["coda26", 1, "#ca7297"], ["coda27", 1, "#7dca72"], ["coda28", 1, "#8172ca"], ["coda29", 1, "#ca9b72"], ["coda30", 1, "#72cab4"], ["coda31", 1, "#ca72c6"], ["coda32", 1, "#acca72"], ["coda33", 1, "#7293ca"], ["coda34", 1, "#ca7279"], ["coda35", 1, "#72ca85"], ["coda36", 1, "#9f72ca"], ["coda37", 1, "#cab872"], ["coda38", 1, "#72c2ca"], ["coda39", 1, "#ca72a9"], ["coda40", 1, "#8fca72"], ["coda41", 1, "#7276ca"], ["coda42", 1, "#ca8972"], ["coda43", 1, "#72caa2"], ["coda44", 1, "#bc72ca"], ["coda45", 1, "#beca72"], ["coda46", 1, "#72a5ca"], ["coda47", 1, "#ca728b"], ["coda48", 1, "#72ca73"], ["coda49", 1, "#8d72ca"], ["coda50", 1, "#caa672"], ["coda51", 1, "#72cabf"], ["coda52", 1, "#ca72bb"], ["coda53", 1, "#a1ca72"], ["coda54", 1, "#7288ca"], ["coda55", 1, "#ca7772"], ["coda56", 1, "#72ca90"], ["coda57", 1, "#aa72ca"], ["coda58", 1, "#cac372"], ["coda59", 1, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"], ["coda74", 1, "#96ca72"], ["coda75", 1, "#727dca"], ["coda76", 1, "#ca8272"], ["coda77", 1, "#72ca9b"], ["coda78", 1, "#b572ca"], ["coda79", 1, "#c5ca72"], ["coda80", 1, "#72acca"], ["coda81", 1, "#ca7292"], ["coda82", 1, "#79ca72"], ["coda83", 1, "#8672ca"], ["coda84", 1, "#ca9f72"], ["coda85", 1, "#72cab9"], ["coda86", 1, "#ca72c1"], ["coda87", 1, "#a8ca72"], ["coda88", 1, "#728fca"], ["coda89", 1, "#ca7275"], ["coda90", 1, "#72ca89"], ["coda91", 1, "#a372ca"], ["coda92", 1, "#cabc72"]], [["nuota", 160, "#8246d2"], ["gioca", 48, "#dc5aa0"], ["onde", 20, "#9664dc"], ["corre", 16, "#eb8228"], ["conchiglie", 12, "#a573d7"], ["sabbia", 12, "#b487d2"], ["e", 8, "#64a578"], ["felice", 8, "#5abec8"], ["coda1", 5, "#72ca8c"], ["altalena", 4, "#f0a555"], ["scivolo", 4, "#e18c46"], ["foglie", 4, "#e6963c"], ["coda2", 4, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 3, "#72bbca"], ["coda5", 3, "#ca72a2"], ["coda6", 3, "#88ca72"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 1, "#caad72"], ["coda17", 1, "#72cac6"], ["coda18", 1, "#ca72b4"], ["coda19", 1, "#9aca72"], ["coda20", 1, "#7281ca"], ["coda21", 1, "#ca7e72"], ["coda22", 1, "#72ca97"], ["coda23", 1, "#b172ca"], ["coda24", 1, "#c9ca72"], ["coda25", 1, "#72b0ca"], ["coda26", 1, "#ca7297"], ["coda27", 1, "#7dca72"], ["coda28", 1, "#8172ca"], ["coda29", 1, "#ca9b72"], ["coda30", 1, "#72cab4"], ["coda31", 1, "#ca72c6"], ["coda32", 1, "#acca72"], ["coda33", 1, "#7293ca"], ["coda34", 1, "#ca7279"], ["coda35", 1, "#72ca85"], ["coda36", 1, "#9f72ca"], ["coda37", 1, "#cab872"], ["coda38", 1, "#72c2ca"], ["coda39", 1, "#ca72a9"], ["coda40", 1, "#8fca72"], ["coda41", 1, "#7276ca"], ["coda42", 1, "#ca8972"], ["coda43", 1, "#72caa2"], ["coda44", 1, "#bc72ca"], ["coda45", 1, "#beca72"], ["coda46", 1, "#72a5ca"], ["coda47", 1, "#ca728b"], ["coda48", 1, "#72ca73"], ["coda49", 1, "#8d72ca"], ["coda50", 1, "#caa672"], ["coda51", 1, "#72cabf"], ["coda52", 1, "#ca72bb"], ["coda53", 1, "#a1ca72"], ["coda54", 1, "#7288ca"], ["coda55", 1, "#ca7772"], ["coda56", 1, "#72ca90"], ["coda57", 1, "#aa72ca"], ["coda58", 1, "#cac372"], ["coda59", 1, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"]]], "lago": [["nuota", 160, "#8246d2"], ["gioca", 48, "#dc5aa0"], ["onde", 20, "#9664dc"], ["corre", 16, "#eb8228"], ["conchiglie", 12, "#a573d7"], ["sabbia", 12, "#b487d2"], ["e", 8, "#64a578"], ["felice", 8, "#5abec8"], ["coda1", 5, "#72ca8c"], ["altalena", 4, "#f0a555"], ["scivolo", 4, "#e18c46"], ["foglie", 4, "#e6963c"], ["coda2", 4, "#a572ca"], ["coda3", 4, "#cabf72"], ["coda4", 3, "#72bbca"], ["coda5", 3, "#ca72a2"], ["coda6", 3, "#88ca72"], ["Bovary", 2, "#78b45a"], [".", 2, "#aca28c"], ["Fine", 2, "#283e48"], ["coda7", 2, "#7672ca"], ["coda8", 2, "#ca9072"], ["coda9", 2, "#72caa9"], ["coda10", 2, "#c372ca"], ["coda11", 2, "#b7ca72"], ["coda12", 2, "#729eca"], ["coda13", 2, "#ca7285"], ["coda14", 2, "#72ca7a"], ["coda15", 2, "#9372ca"], ["coda16", 1, "#caad72"], ["coda17", 1, "#72cac6"], ["coda18", 1, "#ca72b4"], ["coda19", 1, "#9aca72"], ["coda20", 1, "#7281ca"], ["coda21", 1, "#ca7e72"], ["coda22", 1, "#72ca97"], ["coda23", 1, "#b172ca"], ["coda24", 1, "#c9ca72"], ["coda25", 1, "#72b0ca"], ["coda26", 1, "#ca7297"], ["coda27", 1, "#7dca72"], ["coda28", 1, "#8172ca"], ["coda29", 1, "#ca9b72"], ["coda30", 1, "#72cab4"], ["coda31", 1, "#ca72c6"], ["coda32", 1, "#acca72"], ["coda33", 1, "#7293ca"], ["coda34", 1, "#ca7279"], ["coda35", 1, "#72ca85"], ["coda36", 1, "#9f72ca"], ["coda37", 1, "#cab872"], ["coda38", 1, "#72c2ca"], ["coda39", 1, "#ca72a9"], ["coda40", 1, "#8fca72"], ["coda41", 1, "#7276ca"], ["coda42", 1, "#ca8972"], ["coda43", 1, "#72caa2"], ["coda44", 1, "#bc72ca"], ["coda45", 1, "#beca72"], ["coda46", 1, "#72a5ca"], ["coda47", 1, "#ca728b"], ["coda48", 1, "#72ca73"], ["coda49", 1, "#8d72ca"], ["coda50", 1, "#caa672"], ["coda51", 1, "#72cabf"], ["coda52", 1, "#ca72bb"], ["coda53", 1, "#a1ca72"], ["coda54", 1, "#7288ca"], ["coda55", 1, "#ca7772"], ["coda56", 1, "#72ca90"], ["coda57", 1, "#aa72ca"], ["coda58", 1, "#cac372"], ["coda59", 1, "#72b7ca"], ["coda60", 1, "#ca729d"], ["coda61", 1, "#84ca72"], ["coda62", 1, "#7a72ca"], ["coda63", 1, "#ca9472"], ["coda64", 1, "#72caad"], ["coda65", 1, "#c772ca"], ["coda66", 1, "#b3ca72"], ["coda67", 1, "#729aca"], ["coda68", 1, "#ca7280"], ["coda69", 1, "#72ca7e"], ["coda70", 1, "#9872ca"], ["coda71", 1, "#cab172"], ["coda72", 1, "#72c9ca"], ["coda73", 1, "#ca72af"]], "pesca": ["nuota", "#8246d2"]}};
// </modellino>

window.G = {
  C, defs, MOD, MONDO, mix, tappa, fade, cam, camChiavi, posa, unico,
  emma, emmaTirata, al, mare, parco, paperella, ada, adaTesta, custode, guardiola,
  biglietto, lanterna, striscia, chat, cameretta, spezzaparole, vagone, passeggero, sasso, pezzo, cane, chiama, manopola, laggiu, telefono, bolle, insegna, salotto, SALOTTO,
  mondo, papereVasca, treno, posaTreno, sbarre, cambiaPasseggero, rng: kitRng, percorso, costruisciMondo, animaMondo, nascondiInMontagna, posaAda,
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
  const passeggeri = o.chi.map(c => ({ tipo: c.tipo, col: c.uscita })).concat(o.nuovo ? [{ tipo: 'paperella', col: o.nuovo }] : []);
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
        const sp = lerp(640 - M.fermo, 2400, ei(seg(t, T.riparte[0], T.riparte[1])));
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
    const sc = o.scala ? o.scala(k) : 1, w = alto * 0.17 * testo.length * sc;
    if (s - w < a || s + w > b) return;
    const [x, y] = su(s), p0 = su(Math.max(a, s - 3)), p1 = su(Math.min(b, s + 3));
    const ang = Math.atan2(p1[1] - p0[1], p1[0] - p0[0]) * 180 / Math.PI, r = ang > 90 || ang < -90 ? ang - 180 : ang, lu = o.luce ? o.luce(k) : 0;
    out += '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + r.toFixed(1) + ') scale(' + sc.toFixed(3) + ')">' +
      (lu > 0 ? '<ellipse rx="' + (w + alto * 0.5).toFixed(1) + '" ry="' + (alto * 0.62).toFixed(1) + '" fill="' + C.luce + '" opacity="' + (0.75 * lu).toFixed(2) + '" filter="url(#g-glow)"/>' : '') +
      '<text y="' + (alto * 0.2).toFixed(1) + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="' + (alto * 0.56).toFixed(1) + '" fill="' + C.inchiostro + '">' + testo + '</text></g>';
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
  const p = [[m.partenza, 600, 760, 3], [m.partenza, 910, undefined, 13], [m.arrivo, 0, 340, 4]].map(([path, da, a, seme]) => window.G.pieghe(path, { da, a, seme }));
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
window.G.DORMONO = [940, 1220, 1500];
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
//      scivolano via per ultime), t: { esce, vel, pesca: { giu, su, preso }, via, salta, sale, vagone, tiene, riparte, velParte } }.
// Se la velocità non finisce a zero, il treno frena dall'ultima chiave e si ferma proprio in stazione (ferma: quando).
// .treno, .mano, .papere: gli SVG da mettere nel mondo (.papere nella vasca, .g-vasca). Dopo costruisciMondo, monta(m);
// render(t) muove tutto e restituisce { giu, mano: [x, y] } (da t.tiene la paperella in mano la muove la scena).
window.G.giro7 = function (o) {
  const G = window.G, M = G.MONDO, id = o.id, T = o.t, n = o.chi.length, ADA = [672, 896];
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
  const passeggeri = o.chi.map(c => ({ tipo: c.tipo, col: c.uscita })).concat(o.nuovo ? [{ tipo: 'paperella', col: o.nuovo }] : []);
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
      const path = m.arrivo;
      this.sF = path.getTotalLength() - (M.fermo - 40);
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
      this.sedile = [M.fermo + n * M.passoBanchina + 6, 816];
    },
    sAt(t) { return Math.min(this.sF, G.percorso(t, 0, this.vel)); },
    // Mentre arriva in stazione il treno si accosta: i vagoni passano da MONDO.passo a MONDO.passoBanchina; ripartendo, il contrario.
    passoA(s) { return lerp(M.passo, M.passoBanchina, c01((s - (this.sF - 220)) / 220)); },
    passoP(s) { return lerp(M.passoBanchina, M.passo, c01((s - (640 - M.fermo)) / 260)); },
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
        G.posaTreno(this.vag, m.arrivo, s, undefined, ps);
        this.vag.forEach((el, i) => el.setAttribute('opacity', (i < n ? c01((s - i * ps - 4) / 26) : nuovo).toFixed(3)));
        // Fermo in stazione, l'ultimo vagone della banchina piena sta in piano, sulle assi (come quando riparte).
        const ferma = seg(s, this.sF - 150, this.sF), L = m.arrivo.getTotalLength();
        if (ferma > 0) this.vag.forEach((el, i) => {
          const si = Math.max(0.5, Math.min(L - 0.5, s - i * ps)), p = m.arrivo.getPointAtLength(si);
          if (p.x > 650 || p.x < 560) return;
          const q = m.arrivo.getPointAtLength(Math.min(L, si + 1)), q0 = m.arrivo.getPointAtLength(Math.max(0, si - 1));
          const a = (Math.atan2(q.y - q0.y, q.x - q0.x) * 180 / Math.PI - 180) * (1 - ferma);
          el.setAttribute('transform', 'translate(' + p.x.toFixed(2) + ' ' + lerp(p.y, 852, ferma).toFixed(2) + ') rotate(' + a.toFixed(2) + ') scale(' + M.scala + ') translate(-120 -150)');
        });
      } else {
        const sp = G.percorso(t, 640 - M.fermo, T.velParte), pp = this.passoP(sp);
        G.posaTreno(this.vag, m.partenza, sp, undefined, pp);
        this.vag.forEach((el, i) => el.setAttribute('opacity', (c01((this.Lp - 4 - (sp - i * pp)) / 26) * (i < n ? 1 : nuovo)).toFixed(3)));
      }
      // In stazione i vestiti tornano del colore dei biglietti.
      const torna = parte ? 1 : Math.round(seg(s, this.sF - 150, this.sF) * 12) / 12;
      o.chi.forEach((c, i) => G.cambiaPasseggero(this.vag[i], c.tipo, G.mix(c.uscita, c.biglietto, torna)));
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
// all'ultimo la pila di traversine dove si siede Ada (il sedile è in (-95, 835)). Coordinate del mondo.
window.G.treniDormono = function () {
  const G = window.G, M = G.MONDO, C = G.C;
  let grigi = '';
  [-820, -580, -340].forEach(x0 => { for (let i = 2; i >= 0; i--) grigi += '<g transform="translate(' + (x0 + i * M.passo) + ' 858) scale(' + M.scala + ') translate(-120 -150)">' + G.vagone({ primo: i === 0, sbarra: 1, grigio: true, fanale: 0 }, '') + '</g>'; });
  return grigi + '<rect x="-124" y="846" width="58" height="12" rx="2" fill="' + C.legnoScuro + '"/><rect x="-120" y="835" width="50" height="11" rx="2" fill="' + C.legno + '"/>' +
    '<path d="M-116 840 L-78 840 M-120 852 L-72 852" stroke="' + C.legnoScuro + '" stroke-width="1.5" opacity=".6"/>';
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
      G.mondo(o) +
      stelle.map((l, k) => '<path d="' + puntini(l) + '" fill="#FFF4DA" opacity="' + [0.8, 0.55, 0.35][k] + '"/>').join('') +
      '<path d="M1880 760 Q2600 700 3400 734 Q4400 772 5400 728 Q6600 690 7800 736 Q9000 772 10400 730 L14000 740 L14000 1300 L1880 1300 Z" fill="#171A44"/>' +
      '<g class="pi-parco" transform="translate(' + PARCO.origine[0] + ' ' + PARCO.origine[1] + ') scale(' + PARCO.scala + ')">' + G.parcoImmenso(o) + '</g>' +
      '<path d="' + collina + '" fill="url(#g-pi-collina)"/><path d="' + collina.replace(/^M1500 3200 L1500 1010 C1660 990 1790 920 1880 872 /, 'M1880 872 ').replace(/ L4300 3200 Z$/, '') + '" fill="none" stroke="#2E3270" stroke-width="5"/>' +
      '<path d="' + ciuffi + '" stroke="#2E5A3E" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path d="' + sentiero + '" stroke="#3E3A72" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' + cancello +
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
