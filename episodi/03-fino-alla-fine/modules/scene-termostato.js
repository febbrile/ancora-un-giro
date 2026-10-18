const { seg, eo, ei, eio, eob, lerp, TextFx } = kit;
// 3.1 · Il termostato: non tocca il pozzo, cambia solo il modo di pescare. Freddo: sempre «corre». Caldo: «Bovary».
const TE_G = '#2E9E4F', TE_T = '#28C1C1', TE_F = '#7BC96F', TE_A = '#9BD39B', TE_S = '#6FBF8A', TE_N = '#3379E5', TE_X = '#8A90A8', TE_B = '#E3A58E';
const TE_CFG = {
  t1: [TE_G, TE_G, TE_T, TE_G, TE_F, TE_G, TE_T, TE_G, TE_A, TE_G, TE_S, TE_T, TE_G, TE_N, TE_G, TE_X, TE_T, TE_F, TE_G, TE_X],
  t0: Array(20).fill(TE_G),
  t3: [TE_G, TE_T, TE_F, TE_A, TE_S, TE_N, TE_G, TE_T, TE_X, TE_F, TE_A, TE_S, TE_N, TE_G, TE_X, TE_T, TE_B, TE_X, TE_G, TE_X],
};
const TE_BAR = [['corre', TE_G], ['gioca', TE_T], ['foglie', TE_F], ['altalena', TE_A], ['scivolo', TE_S], ['nuota', TE_N], ['Bovary', TE_B]];
const TE_V = { t1: [44, 19, 9, 8, 6, 5, 1.0], t0: [100, 0, 0, 0, 0, 0, 0], t3: [17, 13, 10, 9, 9, 8, 4.6] };
// [inizio, configurazione, angolo della lancetta, etichetta]
const TE_K = [[0, 't1', -25, 'T = 1'], [13.8, 't0', -80, 'T = 0'], [18.2, 't3', 55, 'T = 3'], [27.6, 't1', -25, 'T = 1']];
const TE_DRAW = [[15.0, TE_G, 'corre'], [15.9, TE_G, 'corre'], [16.8, TE_G, 'corre'], [20.6, TE_B, 'Bovary']];
function teStato(t) {
  let k = 0; TE_K.forEach((x, i) => { if (t >= x[0]) k = i; });
  const a = TE_K[k], prev = k > 0 ? TE_K[k - 1] : a;
  return { from: prev, to: a, p: eio(seg(t, a[0], a[0] + 0.8)) };
}
kit.scene('termostato', {
  init(kit) {
    const P = window.PZ;
    let barre = '';
    TE_BAR.forEach(([w, c], i) => { const y = 112 + i * 30; barre += '<text x="1280" y="' + (y + 14) + '" font-family="JetBrains Mono, monospace" font-size="16" fill="#9BE7C4">' + w + '</text><rect class="te-bar" x="1390" y="' + y + '" height="18" rx="4" fill="' + c + '"/><text class="te-bv" y="' + (y + 14) + '" font-family="JetBrains Mono, monospace" font-size="14" fill="#E6FFF4"></text>'; });
    let s = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs + P.lab() +
      '<g class="te-mon"><rect x="1250" y="40" width="630" height="290" rx="16" fill="#0F2A2A" stroke="#2F6F73" stroke-width="6"/><text class="te-tt" x="1280" y="84" font-family="JetBrains Mono, monospace" font-size="18" fill="#5FB89A"></text>' + barre + '</g>' +
      '<g class="te-mon2"><rect x="1250" y="40" width="630" height="150" rx="16" fill="#0F2A2A" stroke="#C9973F" stroke-width="6"/>' +
      '<text x="1280" y="98" font-family="JetBrains Mono, monospace" font-size="26" fill="#E6FFF4">p = softmax(logit / T)</text>' +
      '<text x="1280" y="148" font-family="JetBrains Mono, monospace" font-size="22" fill="#9BE7C4">T = 0 → sempre corre · T = 3 → Bovary 4.6%</text></g>' +
      '<g transform="translate(1100 300) scale(1.5)">' + P.ada('mani', 'felice') + '</g>' +
      '<g class="te-sorpr" opacity="0"><g transform="translate(1100 300) scale(1.5)">' + P.adaHead('sorpresa') + '</g></g>' +
      '<g transform="translate(800 456)">' + P.secchio('te-sec', TE_CFG.t1, 1.4) + '</g>' +
      '<g transform="translate(1640 590) scale(.95)"><rect x="-20" y="68" width="40" height="40" fill="#7A5A24"/><circle r="72" fill="#FBF6EC" stroke="#2E2A26" stroke-width="4"/>' +
      '<path d="M-46.8 27 A54 54 0 0 1 0 -54" stroke="#7FC8F8" stroke-width="12" stroke-linecap="round" fill="none"/><path d="M0 -54 A54 54 0 0 1 46.8 27" stroke="#E8743B" stroke-width="12" stroke-linecap="round" fill="none"/>' +
      '<path class="te-ago" d="M0 0 L0 -50" stroke="#2E2A26" stroke-width="5" stroke-linecap="round"/><circle r="10" fill="#2E2A26"/><text class="te-tl" y="46" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="16" font-weight="600" fill="#2E2A26"></text>' +
      '<text y="-84" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="24" fill="#2E2A26">termostato</text></g>' +
      P.palla('te-palla', TE_G, 'corre') +
      '<g class="te-gag"><rect x="90" y="380" width="580" height="340" rx="26" fill="#FFF4E0" stroke="#E8743B" stroke-width="6"/>' +
      '<rect x="90" y="620" width="580" height="100" fill="#8FD07F"/>' +
      '<g transform="translate(520 470)"><path d="M-70 220 L-50 0 L50 0 L70 220" stroke="#8A5A3C" stroke-width="8" fill="none"/><path d="M-60 0 L60 0" stroke="#6E4A33" stroke-width="10"/><path d="M-22 0 L-22 120 M22 0 L22 120 M-32 120 L32 120" stroke="#C9C1B2" stroke-width="4" fill="none"/></g>' +
      '<g class="te-dama"><g transform="translate(-100 -270) scale(.82)">' + P.emma('#5B3A6E') + '<ellipse cx="100" cy="46" rx="70" ry="16" fill="#3A2418"/><path d="M58 46 C60 8 140 8 142 46 Z" fill="#5B3A6E"/><path d="M142 40 C170 30 176 60 156 64" stroke="#E5484D" stroke-width="6" fill="none"/></g></g>' +
      '<text x="380" y="428" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="36" fill="#2E2A26">Al parco Emma Bovary.</text></g></svg>';
    kit.stage.append(kit.h('<div class="ground">' + s +
      '<div class="te-tit" style="position:absolute;inset:0;background:color-mix(in srgb, var(--ground) 88%, transparent);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px">' +
      '<h1 class="line" style="font-size:112px;margin:0">Il pozzo delle parole</h1><p class="sub" style="margin:0">Episodio 3 · Fino alla Fine</p></div>' +
      P.sott('NARRATORE', 'Sul bancone di Ada c’è una manopola: il termostato. Non tocca il pozzo. Cambia solo il modo di pescare.') +
      P.sott('ADA', 'Freddo: vince sempre la pallina più numerosa. Caldo: le palline si somigliano… e pesco «Bovary»! Questa è un’altra storia.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.tit = q('.te-tit').style; this.line = q('.te-tit .line');
    this.p = all('.te-sec-p'); this.bar = all('.te-bar'); this.bv = all('.te-bv'); this.tt = q('.te-tt'); this.ago = q('.te-ago'); this.tl = q('.te-tl');
    this.palla = q('.te-palla'); this.pc = this.palla.querySelector('circle'); this.pw = this.palla.querySelector('text');
    this.gag = q('.te-gag'); this.dama = q('.te-dama'); this.sorpr = q('.te-sorpr'); this.mon = q('.te-mon'); this.mon2 = q('.te-mon2');
    this.sub = window.PZ.subs(kit, [[3.6, 12.6], [13.4, 24.4]]);
  },
  render(t) {
    const P = window.PZ;
    TextFx.fadeFromRight(this.line, t, -0.6);
    this.tit.opacity = 1 - eio(seg(t, 2.8, 3.4));
    const st = teStato(t);
    this.p.forEach((c, i) => c.setAttribute('fill', P.mix(TE_CFG[st.from[1]][i], TE_CFG[st.to[1]][i], st.p)));
    const vf = TE_V[st.from[1]], vt = TE_V[st.to[1]];
    this.bar.forEach((b, i) => {
      const v = lerp(vf[i], vt[i], st.p), w = Math.max(2, v * 4.2);
      b.setAttribute('width', w.toFixed(1)); this.bv[i].setAttribute('x', (1398 + w).toFixed(1));
      this.bv[i].textContent = (v < 1 && v > 0 ? v.toFixed(1) : (v < 10 && v % 1 ? v.toFixed(1) : Math.round(v))) + '%';
    });
    this.tt.textContent = 'SECCHIO · ' + st.to[3];
    this.ago.setAttribute('transform', 'rotate(' + lerp(st.from[2], st.to[2], st.p).toFixed(1) + ')');
    this.tl.textContent = st.to[3];
    let d = null; TE_DRAW.forEach(x => { if (t >= x[0] - 0.1) d = x; });
    if (d) {
      const p = seg(t, d[0], d[0] + 0.7), back = seg(t, d[0] + (d[2] === 'Bovary' ? 6.0 : 0.75), d[0] + (d[2] === 'Bovary' ? 6.5 : 0.9));
      const x = lerp(970, 1150, eo(p)), y = lerp(600, 560, eo(p)) - 120 * Math.sin(Math.PI * p);
      this.palla.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (p <= 0 ? 0 : eob(p, 1.6) * (1 - back)).toFixed(3) + ')');
      this.pc.setAttribute('fill', d[1]); this.pw.textContent = d[2];
    } else this.palla.setAttribute('transform', 'scale(0)');
    const g = seg(t, 21.2, 21.7) * (1 - seg(t, 26.8, 27.3));
    this.gag.setAttribute('opacity', eo(g).toFixed(2));
    this.dama.setAttribute('transform', 'translate(' + (330 + 60 * Math.sin(t * 0.5)).toFixed(1) + ' ' + (712 - 4 * Math.abs(Math.sin(t * 3))).toFixed(1) + ')');
    this.sorpr.setAttribute('opacity', (t > 20.9 && t < 26.8) ? 1 : 0);
    this.mon.setAttribute('opacity', (1 - seg(t, 28.0, 28.4)).toFixed(2));
    this.mon2.setAttribute('opacity', eo(seg(t, 28.4, 29.0)).toFixed(2));
    this.sub(t);
  },
});
