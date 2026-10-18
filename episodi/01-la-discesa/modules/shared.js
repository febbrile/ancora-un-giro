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
window.PZ = { defs, emma, emmaCade, emmaSpalle, al, mare, parco, ada, adaHead, sott, fade, subs, CORALLO:'#FE8787' };
window.__kit = kit;
})();
