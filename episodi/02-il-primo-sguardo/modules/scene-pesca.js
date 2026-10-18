const { seg, eo, ei, eio, eob, lerp } = kit;
const PES_SLOT = [[88,162],[104,162],[120,162],[136,162],[152,162],[80,146],[96,146],[112,146],[128,146],[144,146],[160,146],[78,130],[94,130],[110,130],[126,130],[142,130],[158,130],[100,114],[116,114],[132,114]];
const B = '#3379E5', G = '#28C1C1', O = '#AB70F6', S = '#B09FF0', C = '#B57FF3', R = '#33E57F', X = '#8A90A8', Z = '#5F3020';
const PES_CFG = {
  t1: [B,B,G,B,O, B,G,B,S,B,R, G,B,C,B,X,G, O,B,X],
  t03: [B,B,B,B,B, B,B,B,B,B,B, B,B,B,B,B,G, B,B,B],
  t0: [B,B,B,B,B, B,B,B,B,B,B, B,B,B,B,B,B, B,B,B],
  t3: [B,G,O,S,C, R,B,G,X,O,S, C,R,B,X,G,Z, X,B,X],
};
const PES_BARS = [['nuota', B], ['gioca', G], ['onde', O], ['sabbia', S], ['conchiglie', C], ['corre', R], ['stira', '#C98A6B']];
const PES_V = { t1: [45, 20, 9, 7, 7, 6, 0.4], t03: [93, 6, 0.4, 0.2, 0.2, 0.1, 0], t0: [100, 0, 0, 0, 0, 0, 0], t3: [18, 14, 10, 10, 10, 9, 3.7] };
const PES_K = [[0, 't1', -25, 'T = 1'], [11.5, 't03', -55, 'T = 0.3'], [13.8, 't0', -80, 'T = 0'], [15.8, 't3', 55, 'T = 3'], [20.6, 't1', -25, 'T = 1']];
const PES_DRAW = [[6.0, B, 'nuota'], [8.6, G, 'gioca'], [17.0, Z, 'stira'], [22.5, B, 'nuota']];
function pesStato(t) {
  let a = PES_K[0], b = PES_K[0];
  for (let i = 0; i < PES_K.length; i++) if (t >= PES_K[i][0]) { a = PES_K[i]; b = PES_K[i + 1] || PES_K[i]; }
  const k = PES_K.indexOf(a), prev = k > 0 ? PES_K[k - 1] : a;
  const p = eio(seg(t, a[0], a[0] + 0.8));
  return { from: prev, to: a, p };
}
kit.scene('pesca', {
  init(kit) {
    const P = window.PZ;
    let palle = ''; PES_SLOT.forEach(s => { palle += '<circle class="pes-p" cx="' + s[0] + '" cy="' + s[1] + '" r="8"/>'; });
    let palle2 = ''; PES_SLOT.forEach((s, i) => { palle2 += '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="8" fill="' + PES_CFG.t1[i] + '"/>'; });
    const sec = (cls, inner) => '<g class="' + cls + '"><g transform="scale(1.4)"><path d="M60 52 Q120 -6 180 52" stroke="#8C8F99" stroke-width="4" fill="none"/>' + inner + '<path d="M60 52 L180 52 L168 172 Q120 182 72 172 Z" fill="#BFD7FF" fill-opacity=".2" stroke="#7C9CC9" stroke-width="3"/></g></g>';
    let barre = '';
    PES_BARS.forEach(([w, c], i) => { const y = 194 + i * 34; barre += '<text x="1524" y="' + (y + 14) + '" font-family="JetBrains Mono, monospace" font-size="15" fill="#9BE7C4">' + w + '</text><rect class="pes-bar" x="1640" y="' + y + '" height="18" rx="4" fill="' + c + '"/><text class="pes-bv" y="' + (y + 14) + '" font-family="JetBrains Mono, monospace" font-size="13" fill="#E6FFF4"></text>'; });
    kit.stage.append(kit.h('<div class="ground" style="background:#F3EADB">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect x="0" y="0" width="760" height="300" fill="#141A33"/><circle cx="660" cy="58" r="26" fill="#FFF1C9"/><circle cx="670" cy="52" r="24" fill="#141A33"/>' +
      '<rect x="0" y="300" width="760" height="780" fill="#2A211C"/><path d="M0 300 Q190 290 380 300 T760 300 L760 314 L0 314 Z" fill="#2F5D3A"/>' +
      '<rect x="230" y="300" width="300" height="780" fill="#0B0E1C"/><rect x="200" y="300" width="30" height="780" fill="#3E4A66"/><rect x="530" y="300" width="30" height="780" fill="#3E4A66"/>' +
      '<ellipse cx="380" cy="520" rx="110" ry="26" fill="#D586DD" opacity=".28" filter="url(#pz-soft)"/><ellipse cx="380" cy="720" rx="120" ry="28" fill="#6E88FD" opacity=".32" filter="url(#pz-soft)"/><ellipse cx="380" cy="1060" rx="180" ry="70" fill="#398BE9" opacity=".6" filter="url(#pz-soft)"/>' +
      '<rect x="180" y="272" width="400" height="40" rx="10" fill="#5B6B8C" stroke="#3E4A66" stroke-width="4"/><rect x="196" y="110" width="16" height="164" fill="#8A5A3C"/><rect x="548" y="110" width="16" height="164" fill="#8A5A3C"/><rect x="180" y="98" width="400" height="22" rx="4" fill="#8A5A3C"/><circle cx="380" cy="146" r="26" fill="#C9973F" stroke="#7A5A24" stroke-width="4"/>' +
      '<rect x="760" y="760" width="1160" height="320" fill="#C9A27A"/>' +
      '<rect x="1500" y="120" width="380" height="330" rx="16" fill="#0F2A2A" stroke="#2F6F73" stroke-width="6"/><text class="pes-tt" x="1524" y="160" font-family="JetBrains Mono, monospace" font-size="17" fill="#5FB89A"></text>' + barre +
      '<g transform="rotate(-3 1335 220)"><rect x="1230" y="150" width="220" height="140" rx="4" fill="#FFFDF6" stroke="#E2D6BF" stroke-width="2"/><circle cx="1340" cy="162" r="6" fill="#E8743B"/>' +
      '<text x="1250" y="200" font-family="Fredoka, sans-serif" font-weight="600" font-size="20" fill="#2E2A26">Esperimento 1</text><text class="pes-nota" x="1250" y="238" font-family="Fredoka, sans-serif" font-size="21" fill="#2E2A26">Al mare Emma ___</text></g>' +
      '<g transform="translate(1000 270) scale(1.5)">' + P.ada('mani', 'felice').replace(/<circle cx="70" cy="238"[^>]*>/, '') + '</g>' +
      '<g class="pes-sorpr" opacity="0"><g transform="translate(1000 270) scale(1.5)">' + P.adaHead('sorpresa') + '</g></g>' +
      '<rect x="780" y="700" width="1120" height="34" rx="4" fill="#8A5A3C"/><rect x="800" y="734" width="1080" height="300" fill="#A9744F"/>' +
      '<path d="M404 140 C560 128 800 300 968 466" stroke="#C9973F" stroke-width="4" fill="none"/>' +
      sec('pes-sec', palle) + sec('pes-sec2', palle2) +
      '<g class="pes-ter"><g transform="translate(1290 520) scale(.9)"><rect x="100" y="164" width="40" height="30" fill="#7A5A24"/><circle cx="120" cy="96" r="72" fill="#FBF6EC" stroke="#2E2A26" stroke-width="4"/>' +
      '<path d="M73.2 123 A54 54 0 0 1 120 42" stroke="#7FC8F8" stroke-width="12" stroke-linecap="round" fill="none"/><path d="M120 42 A54 54 0 0 1 166.8 123" stroke="#E8743B" stroke-width="12" stroke-linecap="round" fill="none"/>' +
      '<path class="pes-ago" d="M120 96 L120 46" stroke="#2E2A26" stroke-width="5" stroke-linecap="round"/><circle cx="120" cy="96" r="10" fill="#2E2A26"/><text class="pes-tl" x="120" y="142" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="16" font-weight="600" fill="#2E2A26"></text></g></g>' +
      '<text class="pes-st1" x="1060" y="830" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="#FFF4E0" stroke="#8A5A3C" stroke-width="1">stesso secchio: IDENTICO</text>' +
      '<text class="pes-st2" x="1060" y="880" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="#FFD978">pesca diversa!</text>' +
      '<text class="pes-st3" x="1060" y="830" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="#FFF4E0">T = 0: sempre nuota</text>' +
      '<g class="pes-palla"><circle r="16" fill="#3379E5"/><ellipse cx="-5" cy="-5" rx="5" ry="3" fill="#FFFFFF" opacity=".4"/><text class="pes-pw" x="0" y="-30" text-anchor="middle" stroke="#FFFDF6" stroke-width="7" paint-order="stroke" font-family="Fredoka, sans-serif" font-weight="600" font-size="30" fill="#2E2A26"></text></g>' +
      '<g class="pes-gag"><rect x="110" y="380" width="560" height="330" rx="26" fill="#FFF4E0" stroke="#E8743B" stroke-width="6"/>' +
      '<rect x="110" y="590" width="560" height="120" rx="0" fill="#F0DDB0"/><rect x="300" y="600" width="230" height="40" rx="8" fill="#E5484D"/><path d="M370 590 Q400 540 470 560 L500 600 L360 600 Z" fill="#8A90A8" stroke="#5B6B8C" stroke-width="3"/>' +
      '<g transform="translate(130 412) scale(.64)">' + P.emma('#398BE9', { dx: 4 }) + '</g>' +
      '<text x="390" y="440" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="36" fill="#2E2A26">Al mare Emma stira.</text></g>' +
      '<path d="M760 0 L760 1080" stroke="#E8743B" stroke-width="4" stroke-dasharray="18 12"/></svg>' +
      '<div style="position:absolute;left:610px;top:40px;width:300px;display:flex;justify-content:center"><div style="font-family:var(--mono, ui-monospace, monospace);font-size:17px;color:var(--second);background:var(--accent);border-radius:999px;padding:10px 20px;white-space:nowrap">← modello · fine · codice →</div></div>' +
      P.sott('NARRATORE', 'E adesso la domanda più importante: chi sceglie la parola? Non il pozzo. A pescare è Ada, che sta fuori.') +
      P.sott('ADA', 'Stessa frase, stesso secchio: sempre. Ma se pesco due volte, posso tirare fuori palline diverse.') +
      P.sott('ADA', 'Freddo: vince quasi sempre la pallina più numerosa. Ghiacciato: vince sempre lei. Caldo… anche le più strane. «Stira» aveva quasi il quattro per cento. Ed è uscita lei!') +
      P.sott('ADA', 'Temperatura normale. Pesco… «nuota». Al mare Emma nuota.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.p = all('.pes-p'); this.sec = q('.pes-sec'); this.sec2 = q('.pes-sec2');
    this.bar = all('.pes-bar'); this.bv = all('.pes-bv'); this.tt = q('.pes-tt');
    this.ago = q('.pes-ago'); this.tl = q('.pes-tl'); this.nota = q('.pes-nota');
    this.palla = q('.pes-palla'); this.pc = this.palla.querySelector('circle'); this.pw = q('.pes-pw');
    this.st = [q('.pes-st1'), q('.pes-st2'), q('.pes-st3')]; this.gag = q('.pes-gag'); this.sorpr = q('.pes-sorpr');
    this.sub = window.PZ.subs(kit, [[0.4, 4.8], [5.0, 10.8], [11.0, 20.8], [21.0, 25.8]]);
  },
  render(t) {
    const P = window.PZ;
    const arr = eo(seg(t, 0.2, 1.6));
    this.sec.setAttribute('transform', 'translate(800 ' + lerp(-300, 456, arr).toFixed(1) + ')');
    const s2 = eio(seg(t, 7.2, 7.8)) * (1 - eio(seg(t, 10.4, 11.0)));
    this.sec2.setAttribute('transform', 'translate(' + lerp(1960, 1080, s2).toFixed(1) + ' 456)');
    const st = pesStato(t);
    this.p.forEach((c, i) => c.setAttribute('fill', P.mix(PES_CFG[st.from[1]][i], PES_CFG[st.to[1]][i], st.p)));
    const vf = PES_V[st.from[1]], vt = PES_V[st.to[1]];
    this.bar.forEach((b, i) => {
      const v = lerp(vf[i], vt[i], st.p), w = Math.max(2, v * 2.0);
      b.setAttribute('width', w.toFixed(1));
      this.bv[i].setAttribute('x', (1648 + w).toFixed(1));
      this.bv[i].textContent = (v < 1 && v > 0 ? v.toFixed(1) : Math.round(v)) + '%';
    });
    this.tt.textContent = 'SECCHIO · ' + st.to[3];
    const ang = lerp(st.from[2], st.to[2], st.p);
    this.ago.setAttribute('transform', 'rotate(' + ang.toFixed(1) + ' 120 96)');
    this.tl.textContent = st.to[3];
    let d = null; PES_DRAW.forEach(x => { if (t >= x[0] - 0.1) d = x; });
    if (d) {
      const p = seg(t, d[0], d[0] + 0.8), back = seg(t, d[0] + 2.0, d[0] + 2.5);
      const x = lerp(970, 1070, eo(p)), y = lerp(600, 400, eo(p)) - 60 * Math.sin(Math.PI * p);
      this.palla.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (p <= 0 ? 0 : eob(p, 1.6) * (1 - back)).toFixed(3) + ')');
      this.pc.setAttribute('fill', d[1]); this.pw.textContent = d[2];
    } else this.palla.setAttribute('transform', 'scale(0)');
    this.st[0].setAttribute('opacity', (eo(seg(t, 7.8, 8.2)) * (1 - seg(t, 10.4, 10.8))).toFixed(2));
    this.st[1].setAttribute('opacity', (eo(seg(t, 9.4, 9.8)) * (1 - seg(t, 10.4, 10.8))).toFixed(2));
    this.st[2].setAttribute('opacity', (eo(seg(t, 14.4, 14.8)) * (1 - seg(t, 15.6, 16.0))).toFixed(2));
    const g = seg(t, 17.8, 18.3) * (1 - seg(t, 20.4, 20.8));
    this.gag.setAttribute('opacity', eo(g).toFixed(2));
    this.gag.setAttribute('transform', 'translate(390 545) scale(' + lerp(0.8, 1, eob(seg(t, 17.8, 18.3), 1.6)).toFixed(3) + ') translate(-390 -545)');
    this.sorpr.setAttribute('opacity', (t > 17.6 && t < 20.4) ? 1 : 0);
    this.nota.textContent = t >= 23.6 ? 'Al mare Emma nuota.' : 'Al mare Emma ___';
    this.sub(t);
  },
});
