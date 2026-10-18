(function(){
const SK='#FFE9D6', HA='#F5C84C', HD='#D9A12E', HL='#FFE28A', IN='#2B2350';
const defs='<defs><filter id="pz-soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="16"/></filter></defs>';
const star='<polygon points="78,57 79.8,61.6 84.7,61.8 80.9,64.9 82.1,69.7 78,67 73.9,69.7 75.1,64.9 71.3,61.8 76.2,61.6" fill="#E0475B" stroke="#FFFFFF" stroke-width="1"/>';
const fringe='<path d="M60 82 C58 52 78 38 100 38 C124 38 142 54 140 84 C136 76 132 72 128 76 C126 66 118 62 114 68 C110 58 100 56 96 64 C90 56 80 60 80 70 C74 66 66 72 66 80 C64 78 62 80 60 82 Z" fill="'+HA+'"/><path d="M76 50 Q100 40 124 50" stroke="'+HL+'" stroke-width="4" stroke-linecap="round" fill="none" opacity=".85"/><path d="M90 60 Q94 50 102 46 M118 64 Q122 54 128 52" stroke="'+HD+'" stroke-width="2" stroke-linecap="round" fill="none"/>'+star;
const legs='<rect x="84" y="226" width="11" height="40" rx="5.5" fill="'+SK+'"/><rect x="105" y="226" width="11" height="40" rx="5.5" fill="'+SK+'"/><ellipse cx="88" cy="268" rx="11" ry="6" fill="'+IN+'"/><ellipse cx="112" cy="268" rx="11" ry="6" fill="'+IN+'"/>';
const dressF='<rect x="94" y="110" width="12" height="20" fill="'+SK+'"/><path d="M100 124 C84 124 76 132 74 146 L56 228 Q100 244 144 228 L126 146 C124 132 116 124 100 124 Z" fill="currentColor"/><path d="M88 140 L74 222 Q81 226 89 228 L97 142 Z" fill="#FFFFFF" opacity=".18"/><path d="M86 126 Q100 142 114 126 Q100 132 86 126 Z" fill="#FFF7EC"/>';
const armsDown='<path d="M78 146 Q60 176 62 204" stroke="'+SK+'" stroke-width="11" stroke-linecap="round" fill="none"/><path d="M122 146 Q140 176 138 204" stroke="'+SK+'" stroke-width="11" stroke-linecap="round" fill="none"/>';
const glow='<ellipse cx="100" cy="165" rx="78" ry="112" fill="currentColor" opacity=".32" filter="url(#pz-soft)"/>';
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
function emmaCade(dress){
  return '<g style="color:'+dress+'"><g transform="rotate(-14 100 160)"><ellipse cx="100" cy="160" rx="84" ry="112" fill="currentColor" opacity=".32" filter="url(#pz-soft)"/>'+
  '<path d="M92 226 L86 258" stroke="'+SK+'" stroke-width="11" stroke-linecap="round"/><path d="M108 226 L120 254" stroke="'+SK+'" stroke-width="11" stroke-linecap="round"/><ellipse cx="85" cy="264" rx="11" ry="6" fill="'+IN+'"/><ellipse cx="123" cy="260" rx="11" ry="6" fill="'+IN+'" transform="rotate(30 123 260)"/>'+
  '<path d="M78 146 Q58 116 54 86" stroke="'+SK+'" stroke-width="11" stroke-linecap="round" fill="none"/><path d="M122 146 Q144 118 150 90" stroke="'+SK+'" stroke-width="11" stroke-linecap="round" fill="none"/>'+
  '<rect x="94" y="110" width="12" height="20" fill="'+SK+'"/><path d="M100 124 C84 124 76 132 74 146 L40 222 Q68 212 84 232 Q100 214 116 232 Q132 212 160 222 L126 146 C124 132 116 124 100 124 Z" fill="currentColor"/><path d="M86 126 Q100 142 114 126 Q100 132 86 126 Z" fill="#FFF7EC"/>'+
  '<path d="M60 92 C54 76 48 64 52 50 C54 42 62 42 64 48 C66 38 78 34 84 42 C90 32 110 32 116 42 C122 34 134 38 136 48 C138 42 146 42 148 50 C152 64 146 76 140 92 Z" fill="'+HA+'"/>'+
  '<circle cx="100" cy="80" r="40" fill="'+SK+'"/>'+fringe+face(0,0,'o')+'</g></g>';
}
function emmaSpalle(dress, n){
  return '<g style="color:'+dress+'">'+glow+legs+armsDown+dressF+'<rect x="86" y="164" width="28" height="28" rx="6" fill="#F6E7C8" stroke="'+IN+'" stroke-width="1.6" stroke-dasharray="3 2.5"/><text x="100" y="185" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="19" fill="'+IN+'">'+n+'</text>'+
  '<path d="M100 34 C66 34 56 54 56 82 C56 100 52 112 56 122 C60 130 72 130 78 124 C86 132 114 132 122 124 C128 130 140 130 144 122 C148 112 144 100 144 82 C144 54 134 34 100 34 Z" fill="'+HA+'"/><path d="M72 70 C66 88 74 104 68 122 M100 44 C96 70 104 96 100 128 M128 70 C134 88 126 104 132 122" stroke="'+HD+'" stroke-width="2" fill="none"/></g>';
}
function al(){ return '<g style="color:#17B3B3"><ellipse cx="102" cy="122" rx="78" ry="58" fill="currentColor" opacity=".3" filter="url(#pz-soft)"/><path d="M40 130 C36 96 70 72 108 72 C146 72 168 100 164 130 C160 156 130 166 100 166 C66 166 44 158 40 130 Z" fill="currentColor"/><ellipse cx="82" cy="96" rx="24" ry="8" fill="#FFFFFF" opacity=".25" transform="rotate(-15 82 96)"/><path d="M78 120 Q86 126 94 120 M110 120 Q118 126 126 120" stroke="#0E2E33" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M97 140 L107 140" stroke="#0E2E33" stroke-width="3" stroke-linecap="round"/></g>'; }
function mare(){ return '<g style="color:#8787FE"><ellipse cx="100" cy="124" rx="86" ry="58" fill="currentColor" opacity=".3" filter="url(#pz-soft)"/><path d="M22 170 C40 120 70 82 120 72 C160 64 186 88 182 116 C178 140 150 146 140 128 C132 114 146 102 156 108 C150 92 128 90 112 104 C92 122 96 158 122 170 Z" fill="currentColor"/><path d="M58 116 C78 88 102 76 128 72" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" fill="none" opacity=".6"/><ellipse cx="74" cy="134" rx="8" ry="9" fill="#FFFFFF"/><ellipse cx="96" cy="128" rx="8" ry="9" fill="#FFFFFF"/><circle cx="76" cy="136" r="4" fill="#1C1F4A"/><circle cx="98" cy="130" r="4" fill="#1C1F4A"/><path d="M76 152 Q88 160 100 148" stroke="#1C1F4A" stroke-width="3" stroke-linecap="round" fill="none"/></g>'; }
function parco(){ return '<g style="color:#87FE87"><ellipse cx="100" cy="100" rx="80" ry="84" fill="currentColor" opacity=".28" filter="url(#pz-soft)"/><rect x="90" y="120" width="20" height="56" rx="6" fill="#8A5A3C"/><circle cx="100" cy="84" r="46" fill="currentColor"/><circle cx="64" cy="104" r="30" fill="currentColor"/><circle cx="136" cy="104" r="30" fill="currentColor"/><circle cx="100" cy="52" r="30" fill="currentColor"/><ellipse cx="88" cy="92" rx="8" ry="9" fill="#FFFFFF"/><ellipse cx="112" cy="92" rx="8" ry="9" fill="#FFFFFF"/><circle cx="89" cy="94" r="4" fill="#1D3A22"/><circle cx="113" cy="94" r="4" fill="#1D3A22"/><path d="M90 110 Q100 118 110 110" stroke="#1D3A22" stroke-width="3" stroke-linecap="round" fill="none"/></g>'; }
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
function ada(pose, expr){
  if(pose==='quaderno') return '<g>'+adaBody+slL+slR+'<rect x="72" y="198" width="56" height="44" rx="4" fill="#2F6F73" stroke="#1E4A4D" stroke-width="2"/><rect x="84" y="208" width="32" height="10" rx="2" fill="#F3EADB"/>'+adaHead(expr)+'</g>';
  if(pose==='periscopio') return '<g><rect x="146" y="94" width="16" height="226" fill="#C9973F" stroke="#7A5A24" stroke-width="2"/>'+adaBody+slL+adaHead('occhio')+'<path d="M128 152 Q152 132 152 112 L140 108 Q138 128 114 160 Z" fill="'+AC+'" stroke="'+AI+'" stroke-width="2.5"/><rect x="122" y="70" width="42" height="20" rx="7" fill="#C9973F" stroke="#7A5A24" stroke-width="2"/><circle cx="120" cy="80" r="10" fill="#7A5A24"/><circle cx="146" cy="106" r="6" fill="'+AS+'"/></g>';
  return '<g>'+adaBody+slL+slR+adaHead(expr)+'</g>';
}
function sott(who, text){
  return '<div class="sott"><div class="chi'+(who==='ADA'?' chi-ada':'')+'">'+who+'</div><div class="detto">'+text+'</div></div>';
}
function fade(t, a, b, d){ d=d||0.4; const k=window.__kit; return Math.min(k.clamp01((t-a)/d), k.clamp01((b-t)/d)); }
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

const TIRATA="<path d=\"M-30 120 L10 120 M-36 150 L4 150 M-24 180 L16 180\" stroke=\"#FFF4E0\" stroke-width=\"3\" stroke-linecap=\"round\" opacity=\"0.4\"/><circle cx=\"262\" cy=\"96\" r=\"18\" fill=\"none\" stroke=\"#FFF4E0\" stroke-width=\"2\" opacity=\"0.3\"/><circle cx=\"262\" cy=\"96\" r=\"32\" fill=\"none\" stroke=\"#FFF4E0\" stroke-width=\"2\" opacity=\"0.18\"/><circle cx=\"262\" cy=\"96\" r=\"46\" fill=\"none\" stroke=\"#FFF4E0\" stroke-width=\"2\" opacity=\"0.08\"/><circle cx=\"206\" cy=\"112\" r=\"3\" fill=\"#FFF4E0\" opacity=\"0.55\"/><circle cx=\"222\" cy=\"106\" r=\"3\" fill=\"#FFF4E0\" opacity=\"0.4\"/><circle cx=\"238\" cy=\"101\" r=\"3\" fill=\"#FFF4E0\" opacity=\"0.25\"/><g transform=\"rotate(28 100 160)\"><ellipse cx=\"90\" cy=\"165\" rx=\"92\" ry=\"110\" fill=\"currentColor\" opacity=\"0.32\" filter=\"url(#pz-soft)\"/><path d=\"M92 226 L70 252\" stroke=\"#FFE9D6\" stroke-width=\"11\" stroke-linecap=\"round\" fill=\"none\"/><path d=\"M108 226 L92 258\" stroke=\"#FFE9D6\" stroke-width=\"11\" stroke-linecap=\"round\" fill=\"none\"/><ellipse cx=\"66\" cy=\"257\" rx=\"11\" ry=\"6\" fill=\"#2B2350\" transform=\"rotate(-40 66 257)\"/><ellipse cx=\"88\" cy=\"263\" rx=\"11\" ry=\"6\" fill=\"#2B2350\" transform=\"rotate(-50 88 263)\"/><path d=\"M78 146 Q56 160 40 170\" stroke=\"#FFE9D6\" stroke-width=\"11\" stroke-linecap=\"round\" fill=\"none\"/><path d=\"M122 146 Q112 176 96 196\" stroke=\"#FFE9D6\" stroke-width=\"11\" stroke-linecap=\"round\" fill=\"none\"/><rect x=\"94\" y=\"110\" width=\"12\" height=\"20\" fill=\"#FFE9D6\"/><path d=\"M100 124 C84 124 76 132 74 146 L30 210 Q52 214 64 232 Q84 226 100 236 Q120 230 140 226 L126 146 C124 132 116 124 100 124 Z\" fill=\"currentColor\"/><path d=\"M88 140 L44 206 Q54 210 60 216 L97 142 Z\" fill=\"#FFFFFF\" opacity=\"0.18\"/><path d=\"M86 126 Q100 142 114 126 Q100 132 86 126 Z\" fill=\"#FFF7EC\"/><path d=\"M104 40 C78 36 60 50 56 68 C46 70 36 74 28 76 C34 82 30 90 22 94 C32 98 34 106 30 112 C40 114 50 112 56 108 C60 116 70 118 76 110 L120 104 C130 80 126 48 104 40 Z\" fill=\"#F5C84C\"/><path d=\"M52 82 C44 86 36 86 30 90 M56 96 C48 102 40 102 32 106\" stroke=\"#D9A12E\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/><path d=\"M72 54 C62 58 54 62 46 66\" stroke=\"#FFE28A\" stroke-width=\"3.5\" stroke-linecap=\"round\" fill=\"none\" opacity=\"0.8\"/><circle cx=\"100\" cy=\"80\" r=\"40\" fill=\"#FFE9D6\"/><path d=\"M60 82 C58 52 78 38 100 38 C124 38 142 54 140 84 C136 76 132 72 128 76 C126 66 118 62 114 68 C110 58 100 56 96 64 C90 56 80 60 80 70 C74 66 66 72 66 80 C64 78 62 80 60 82 Z\" fill=\"#F5C84C\"/><path d=\"M76 50 Q100 40 124 50\" stroke=\"#FFE28A\" stroke-width=\"4\" stroke-linecap=\"round\" fill=\"none\" opacity=\"0.85\"/><path d=\"M90 60 Q94 50 102 46 M118 64 Q122 54 128 52\" stroke=\"#D9A12E\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/><polygon points=\"78,57 79.8,61.6 84.7,61.8 80.9,64.9 82.1,69.7 78,67 73.9,69.7 75.1,64.9 71.3,61.8 76.2,61.6\" fill=\"#E0475B\" stroke=\"#FFFFFF\" stroke-width=\"1\"/><circle cx=\"92\" cy=\"88\" r=\"5.2\" fill=\"#2B2350\"/><circle cx=\"119\" cy=\"88\" r=\"5.2\" fill=\"#2B2350\"/><circle cx=\"93.8\" cy=\"86\" r=\"1.7\" fill=\"#FFFFFF\"/><circle cx=\"120.8\" cy=\"86\" r=\"1.7\" fill=\"#FFFFFF\"/><circle cx=\"84\" cy=\"101\" r=\"6\" fill=\"#FF8F8F\" opacity=\"0.45\"/><circle cx=\"127\" cy=\"101\" r=\"6\" fill=\"#FF8F8F\" opacity=\"0.45\"/><path d=\"M100 104 Q107 112 115 103\" stroke=\"#2B2350\" stroke-width=\"2.6\" stroke-linecap=\"round\" fill=\"none\"/></g>";
function emmaTirata(dress){ return '<g style="color:'+dress+'">'+TIRATA+'</g>'; }
function perla(cls, v, col){
  const r = (8 + 22 * Math.min(1.3, Math.abs(v))).toFixed(1);
  return v >= 0 ? '<circle class="'+cls+'" r="'+r+'" fill="'+col+'" stroke="#FFFFFF" stroke-opacity=".4" stroke-width="2"/>' : '<circle class="'+cls+'" r="'+r+'" fill="none" stroke="'+col+'" stroke-width="4" stroke-dasharray="7 5"/>';
}
function mix(a, b, p){
  const h = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16));
  const A = h(a), B = h(b);
  return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * Math.max(0, Math.min(1, p)))).join(',') + ')';
}
// Bozza 3: le righe delle carte sono semi senza nome (♠ ♥ ♦, poi ♣ e ☾), disegnati come tracciati SVG.
const NERO = '#2E2A26', ROSSO_SEME = '#C2453F';
const SEMI_COL = [NERO, ROSSO_SEME, ROSSO_SEME, NERO, '#6B5BA8'];
const SEMI_ICON = [
  '<path d="M0 -15 C6 -7 15 -2 15 5 C15 11 9 14 4 11 C5 14 6 16 8 17 L-8 17 C-6 16 -5 14 -4 11 C-9 14 -15 11 -15 5 C-15 -2 -6 -7 0 -15 Z" fill="' + NERO + '"/>',
  '<path d="M0 15 C-10 7 -15 1 -15 -5 C-15 -11 -10 -14 -6 -14 C-3 -14 -1 -12 0 -9 C1 -12 3 -14 6 -14 C10 -14 15 -11 15 -5 C15 1 10 7 0 15 Z" fill="' + ROSSO_SEME + '"/>',
  '<path d="M0 -16 L12 0 L0 16 L-12 0 Z" fill="' + ROSSO_SEME + '"/>',
  '<circle cx="0" cy="-7" r="6.5" fill="' + NERO + '"/><circle cx="-7" cy="3" r="6.5" fill="' + NERO + '"/><circle cx="7" cy="3" r="6.5" fill="' + NERO + '"/><path d="M-2 4 L-5 16 L5 16 L2 4 Z" fill="' + NERO + '"/>',
  '<path d="M4 -14 A14 14 0 1 0 4 14 A10 10 0 1 1 4 -14 Z" fill="#6B5BA8"/>'];
function seme(i, x, y, k, chiaro) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + (k || 1) + ')">' + (chiaro ? SEMI_ICON[i].replace(/#2E2A26/g, '#E6FFF4') : SEMI_ICON[i]) + '</g>'; }
function semeHTML(i) { return '<svg class="seme" viewBox="-17 -17 34 34" aria-hidden="true">' + SEMI_ICON[i].replace(/fill="#2E2A26"/g, 'fill="#E6FFF4"') + '</svg>'; }
function fmt(v) { return (v < 0 ? '−' : '') + Math.abs(v).toFixed(2); }
// Vettore per il monitor: «♠ 0.55 ♥ 0.07 ♦ −0.58» con i semi disegnati.
function vecHTML(v) { return v.map((x, i) => semeHTML(i) + '&#8202;' + fmt(x)).join('&ensp;'); }
function righeY(n) { return n === 3 ? [92, 162, 232] : Array.from({ length: n }, (_, i) => 64 + (200 / n) * (i + 0.5)); }
function carta(o) {
  const n = o.v.length, Y = righeY(n), h = n === 3 ? 56 : Math.min(48, 200 / n - 6), k = n === 3 ? 1 : n === 4 ? 0.85 : 0.72, fs = n === 3 ? 34 : n === 4 ? 30 : 26;
  let r = '';
  o.v.forEach((x, i) => {
    const y = Y[i];
    r += '<g class="' + (o.cls || 'carta') + '-r"><rect x="14" y="' + (y - h / 2).toFixed(1) + '" width="192" height="' + h.toFixed(1) + '" rx="10" fill="' + SEMI_COL[i] + '" fill-opacity=".08"/>' +
      seme(i, 44, y.toFixed(1), k) +
      '<text x="192" y="' + (y + fs * 0.35).toFixed(1) + '" text-anchor="end" font-family="JetBrains Mono, monospace" font-weight="600" font-size="' + fs + '" fill="' + (x < 0 ? '#B8332E' : '#2E2A26') + '">' + fmt(x) + '</text></g>';
  });
  return '<g><rect x="0" y="0" width="220" height="300" rx="18" fill="#FFFDF6" stroke="' + o.col + '" stroke-width="7"/>' +
    '<text x="18" y="42" font-family="Fredoka, sans-serif" font-weight="600" font-size="27" fill="' + o.col + '">' + o.titolo + '</text>' + r +
    '<text x="110" y="290" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="18" fill="#7A6F60">' + (o.sotto || '') + '</text></g>';
}
function gettone(v) {
  const neg = v < 0;
  return '<g><circle r="52" fill="' + (neg ? '#8A90A8' : '#F5C84C') + '" stroke="' + (neg ? '#5B6B8C' : '#C9973F') + '" stroke-width="7"/><circle r="40" fill="none" stroke="#FFFFFF" stroke-opacity=".6" stroke-width="2" stroke-dasharray="6 5"/>' +
    '<text y="9" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="600" font-size="25" fill="#2E2A26">' + fmt(v) + '</text></g>';
}
function pill(v) {
  const neg = v < 0;
  return '<g><rect x="-66" y="-27" width="132" height="54" rx="27" fill="' + (neg ? '#8A90A8' : '#F5C84C') + '" stroke="' + (neg ? '#5B6B8C' : '#C9973F') + '" stroke-width="4"/><text y="11" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="600" font-size="28" fill="#2E2A26">' + (v > 0 ? '+' : '') + fmt(v) + '</text></g>';
}
// I viaggiatori dell'episodio 3 (tela «I nuovi viaggiatori»), in un riquadro 200×200.
function corre() { return '<g style="color:#2FAD57"><ellipse cx="108" cy="128" rx="84" ry="46" fill="currentColor" opacity=".28" filter="url(#pz-soft)"/><path d="M8 104 L30 104 M4 120 L28 120 M10 136 L30 136" stroke="currentColor" stroke-width="5" stroke-linecap="round" opacity=".55"/><path d="M38 138 C36 108 50 88 76 86 L100 86 C112 86 118 94 124 102 C134 114 154 116 168 120 C182 124 186 134 182 140 L38 140 Z" fill="currentColor"/><path d="M44 108 C44 98 50 92 60 90" stroke="#1D5A33" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M140 118 C158 120 176 124 182 136 L150 138 C146 130 142 124 140 118 Z" fill="#FFFFFF" opacity=".85"/><path d="M86 96 L100 108 M94 92 L108 104 M102 90 L114 100" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/><rect x="32" y="136" width="156" height="20" rx="10" fill="#F4EEE2"/><path d="M44 150 L176 150" stroke="#C9C1B2" stroke-width="3" stroke-dasharray="8 6" stroke-linecap="round"/><ellipse cx="122" cy="114" rx="7" ry="8" fill="#FFFFFF"/><ellipse cx="142" cy="116" rx="7" ry="8" fill="#FFFFFF"/><circle cx="124" cy="116" r="3.6" fill="#173A24"/><circle cx="144" cy="118" r="3.6" fill="#173A24"/><path d="M126 128 Q134 134 142 128" stroke="#173A24" stroke-width="3" stroke-linecap="round" fill="none"/></g>'; }
function felice() { return '<g style="color:#F5C84C"><circle cx="100" cy="104" r="80" fill="currentColor" opacity=".26" filter="url(#pz-soft)"/><g stroke="currentColor" stroke-width="9" stroke-linecap="round"><path d="M100 34 L100 46"/><path d="M100 162 L100 174"/><path d="M30 104 L42 104"/><path d="M158 104 L170 104"/><path d="M50 54 L59 63"/><path d="M141 145 L150 154"/><path d="M150 54 L141 63"/><path d="M59 145 L50 154"/></g><circle cx="100" cy="104" r="46" fill="currentColor"/><circle cx="84" cy="86" r="10" fill="#FFFFFF" opacity=".3"/><circle cx="74" cy="114" r="8" fill="#F28B6B" opacity=".6"/><circle cx="126" cy="114" r="8" fill="#F28B6B" opacity=".6"/><path d="M78 100 Q86 90 94 100 M106 100 Q114 90 122 100" stroke="#6B4A12" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M84 118 Q100 134 116 118" stroke="#6B4A12" stroke-width="3.5" stroke-linecap="round" fill="none"/></g>'; }
function punto() { return '<g style="color:#8E96C8"><ellipse cx="100" cy="124" rx="70" ry="54" fill="currentColor" opacity=".22" filter="url(#pz-soft)"/><ellipse cx="100" cy="124" rx="50" ry="44" fill="#1E1F2E"/><ellipse cx="82" cy="102" rx="16" ry="8" fill="#FFFFFF" opacity=".32" transform="rotate(-24 82 102)"/><circle cx="120" cy="96" r="3" fill="#FFFFFF" opacity=".5"/><circle cx="88" cy="124" r="6" fill="#FFFFFF"/><circle cx="112" cy="124" r="6" fill="#FFFFFF"/><circle cx="89" cy="125" r="3" fill="#1E1F2E"/><circle cx="113" cy="125" r="3" fill="#1E1F2E"/><path d="M95 142 L105 142" stroke="#8E96C8" stroke-width="3" stroke-linecap="round"/></g>'; }
// Il laboratorio di Ada visto di lato: a sinistra il pozzo (il modello), a destra il bancone (il codice).
const SLOT = [[88,162],[104,162],[120,162],[136,162],[152,162],[80,146],[96,146],[112,146],[128,146],[144,146],[160,146],[78,130],[94,130],[110,130],[126,130],[142,130],[158,130],[100,114],[116,114],[132,114]];
function lab(o) {
  o = o || {}; const g = o.luce || ['#67A96F', '#2FAD57', '#28AA50'];
  return '<rect width="1920" height="1080" fill="#F3EADB"/><rect x="0" y="0" width="760" height="300" fill="#141A33"/><circle cx="660" cy="58" r="26" fill="#FFF1C9"/><circle cx="670" cy="52" r="24" fill="#141A33"/>' +
    '<rect x="0" y="300" width="760" height="780" fill="#2A211C"/><path d="M0 300 Q190 290 380 300 T760 300 L760 314 L0 314 Z" fill="#2F5D3A"/>' +
    '<rect x="230" y="300" width="300" height="780" fill="#0B0E1C"/><rect x="200" y="300" width="30" height="780" fill="#3E4A66"/><rect x="530" y="300" width="30" height="780" fill="#3E4A66"/>' +
    '<g class="lab-luce"><ellipse cx="380" cy="520" rx="110" ry="26" fill="' + g[0] + '" opacity=".3" filter="url(#pz-soft)"/><ellipse cx="380" cy="720" rx="120" ry="28" fill="' + g[1] + '" opacity=".32" filter="url(#pz-soft)"/><ellipse cx="380" cy="1060" rx="180" ry="70" fill="' + g[2] + '" opacity=".6" filter="url(#pz-soft)"/></g>' +
    '<rect x="180" y="272" width="400" height="40" rx="10" fill="#5B6B8C" stroke="#3E4A66" stroke-width="4"/><rect x="196" y="110" width="16" height="164" fill="#8A5A3C"/><rect x="548" y="110" width="16" height="164" fill="#8A5A3C"/><rect x="180" y="98" width="400" height="22" rx="4" fill="#8A5A3C"/><circle cx="380" cy="146" r="26" fill="#C9973F" stroke="#7A5A24" stroke-width="4"/>' +
    '<rect x="760" y="760" width="1160" height="320" fill="#C9A27A"/><rect x="780" y="700" width="1120" height="34" rx="4" fill="#8A5A3C"/><rect x="800" y="734" width="1080" height="300" fill="#A9744F"/>' +
    '<path d="M404 140 C560 128 800 300 968 466" stroke="#C9973F" stroke-width="4" fill="none"/><path d="M760 0 L760 1080" stroke="#E8743B" stroke-width="4" stroke-dasharray="18 12"/>' +
    '<g transform="translate(760 54)"><rect x="-150" y="-26" width="300" height="52" rx="26" fill="#E8743B"/><text y="9" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="18" fill="#F4EEE2">← modello · fine · codice →</text></g>';
}
// Il secchio di vetro, con le palline nei posti fissi (classe cls-p, colori in ordine).
function secchio(cls, colori, k) {
  let p = ''; SLOT.forEach((sl, i) => { p += '<circle class="' + cls + '-p" cx="' + sl[0] + '" cy="' + sl[1] + '" r="8" fill="' + colori[i % colori.length] + '"/>'; });
  return '<g class="' + cls + '"><g transform="scale(' + (k || 1.4) + ')"><path d="M60 52 Q120 -6 180 52" stroke="#8C8F99" stroke-width="4" fill="none"/>' + p +
    '<path d="M60 52 L180 52 L168 172 Q120 182 72 172 Z" fill="#BFD7FF" fill-opacity=".2" stroke="#7C9CC9" stroke-width="3"/><path d="M70 62 L80 164" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity=".3"/></g></g>';
}
// Una pallina pescata, con la sua parola sopra. La pallina Fine è scura con un punto bianco.
function palla(cls, colore, parola) {
  const fine = parola === 'Fine';
  return '<g class="' + cls + '"><circle r="16" fill="' + (fine ? '#1E1F2E' : colore) + '"/>' + (fine ? '<circle r="5" fill="#FFFFFF"/>' : '<ellipse cx="-5" cy="-5" rx="5" ry="3" fill="#FFFFFF" opacity=".4"/>') +
    '<text x="0" y="-30" text-anchor="middle" stroke="#FFFDF6" stroke-width="7" paint-order="stroke" font-family="Fredoka, sans-serif" font-weight="600" font-size="30" fill="#2E2A26">' + parola + '</text></g>';
}
// Un viaggiatore con i piedi in (0, 0).
function viaggiatore(nome, vestito) {
  if (nome === 'Al') return '<g transform="translate(-102 -166)">' + al() + '</g>';
  if (nome === 'Mare') return '<g transform="translate(-100 -184)">' + mare() + '</g>';
  if (nome === 'Parco') return '<g transform="translate(-100 -178)">' + parco() + '</g>';
  if (nome === 'Corre') return '<g transform="translate(-110 -156)">' + corre() + '</g>';
  if (nome === 'Felice') return '<g transform="translate(-100 -178)">' + felice() + '</g>';
  if (nome === 'Punto') return '<g transform="translate(-100 -170)">' + punto() + '</g>';
  return '<g transform="translate(-80 -219) scale(.8)">' + emma(vestito || '#28AA50') + '</g>';
}
// La discesa veloce, di botola in botola: tutta la fila cade dalla botola che i calcoli aprono.
// o = { id, chi: [nomi], open: [tempi], scelta: [indice botola per piano], parole: [[parola, colore], ...] per stanza }
function discesa(o) {
  const RH = 1080, F = r => 900 + RH * r, BOT = [300, 620, 940, 1260, 1580], n = o.chi.length;
  const X0 = j => 960 + (j - (n - 1) / 2) * 190, HX = r => BOT[o.scelta[r]];
  const pos = (j, r) => r === 0 ? X0(j) : Math.max(140, Math.min(1780, HX(r - 1) + (j - (n - 1) / 2) * 160));
  const id = o.id, piani = o.open.length + 1;
  let s = '<g class="' + id + '-mondo">';
  for (let r = 0; r < piani; r++) {
    const oy = RH * r, sf = ['#262F60', '#1F3B2C', '#1E4630', '#1A5A34'][r % 4];
    s += '<defs><linearGradient id="' + id + '-m' + r + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="' + sf + '"/></linearGradient></defs><rect x="0" y="' + oy + '" width="1920" height="' + RH + '" fill="url(#' + id + '-m' + r + ')"/>';
    (o.parole[r] || []).forEach((w, k) => { s += '<text x="' + (260 + k * 520) + '" y="' + (oy + 300 + (k % 2) * 140) + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="' + (k === 0 ? 96 : 60) + '" fill="' + w[1] + '" opacity=".85">' + w[0] + '</text>'; });
    s += '<rect x="0" y="' + F(r) + '" width="1920" height="180" fill="#3E4A66"/><path d="M0 ' + F(r) + ' L1920 ' + F(r) + '" stroke="#5B6B8C" stroke-width="6"/>';
    if (r < piani - 1) BOT.forEach((h, b) => {
      s += '<circle cx="' + h + '" cy="' + (F(r) + 92) + '" r="46" fill="#141A33"/><g transform="translate(' + h + ' ' + (F(r) + 92) + ')"><g class="' + id + '-rot" data-r="' + r + '"><circle r="26" fill="#C9973F" stroke="#7A5A24" stroke-width="4"/><path d="M0 -36 L0 36 M-36 0 L36 0 M-25 -25 L25 25 M-25 25 L25 -25" stroke="#C9973F" stroke-width="9"/><circle r="8" fill="#7A5A24"/></g></g>' +
        '<ellipse cx="' + h + '" cy="' + (F(r) + 4) + '" rx="80" ry="20" fill="#56658A" stroke="#2A3350" stroke-width="4"/>' +
        (b === o.scelta[r] ? '<ellipse class="' + id + '-buco" data-r="' + r + '" cx="' + h + '" cy="' + (F(r) + 4) + '" rx="0" ry="0" fill="#05060C" stroke="#7A86A8" stroke-width="5"/>' : '');
    });
  }
  o.chi.forEach(nome => { s += '<g class="' + id + '-p">' + viaggiatore(nome, o.vestito) + '</g>'; });
  s += '</g>';
  let mondo, pers, rot, buchi;
  return {
    svg: s,
    init(stage) {
      mondo = stage.querySelector('.' + id + '-mondo'); pers = [...stage.querySelectorAll('.' + id + '-p')];
      rot = [...stage.querySelectorAll('.' + id + '-rot')]; buchi = [...stage.querySelectorAll('.' + id + '-buco')];
    },
    render(t, extra) {
      const k = window.__kit, seg = k.seg, eio = k.eio, ei = k.ei, lerp = k.lerp, eob = k.eob;
      let cam = 0; o.open.forEach(t0 => { cam += eio(seg(t, t0 + 0.3, t0 + 1.3)); });
      mondo.setAttribute('transform', 'translate(0 ' + (-cam * RH + (extra || 0)).toFixed(1) + ')');
      pers.forEach((g, j) => {
        let x = X0(j), y = F(0), rot2 = 0, sq = 0;
        o.open.forEach((t00, r) => {
          const t0 = t00 + (n - 1 - j) * 0.1; if (t < t0) return;
          const a = seg(t, t0, t0 + 0.4), b = seg(t, t0 + 0.4, t0 + 1.2);
          x = b > 0 ? lerp(HX(r), pos(j, r + 1), eio(b)) : lerp(pos(j, r), HX(r), eio(a));
          y = lerp(F(r), F(r + 1), ei(b)) - 30 * Math.sin(Math.PI * a);
          rot2 = t < t0 + 1.2 ? 16 * Math.sign(HX(r) - pos(j, r) || 1) : 0;
          sq = Math.sin(Math.PI * seg(t, t0 + 1.2, t0 + 1.45));
        });
        g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + rot2 + ') scale(' + (1 + 0.08 * sq).toFixed(3) + ',' + (1 - 0.1 * sq).toFixed(3) + ')');
      });
      rot.forEach(g => { const t0 = o.open[+g.getAttribute('data-r')], on = seg(t, t0 - 1.0, t0 + 0.1); g.setAttribute('transform', 'rotate(' + (on >= 1 ? 400 : 400 * on).toFixed(1) + ')'); });
      buchi.forEach(b => { const t0 = o.open[+b.getAttribute('data-r')], op = eob(seg(t, t0 - 0.25, t0), 1.4) * (1 - eio(seg(t, t0 + 1.6, t0 + 2.0))); b.setAttribute('rx', (90 * op).toFixed(1)); b.setAttribute('ry', (22 * op).toFixed(1)); });
    },
  };
}
// Colori del vestito di Emma, calcolati da strumenti/numeri.py (il colore dei vicini).
const VESTITO = { rosa: '#BC937F', mare: ['#BC937F', '#728EBE', '#306EDD', '#2864DC'], parco: ['#BC937F', '#67A96F', '#2FAD57', '#28AA50'] };
// Colori delle carte dei personaggi.
const CARTA_COL = { Al: '#139A9A', Mare: '#6E6EE6', Parco: '#2E9E4F', Emma: '#B5715C' };
window.PZ = { viaggiatore, discesa, lab, secchio, palla, SLOT, corre, felice, punto, carta, gettone, pill, fmt, seme, semeHTML, vecHTML, righeY, SEMI_COL, VESTITO, CARTA_COL, emmaTirata, perla, mix, defs, emma, emmaCade, emmaSpalle, al, mare, parco, ada, adaHead, sott, fade, subs, CORALLO: VESTITO.rosa };
window.__kit = kit;
})();
