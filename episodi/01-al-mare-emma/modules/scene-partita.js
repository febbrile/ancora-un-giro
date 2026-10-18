const { seg, eo, ei, eio, eob, lerp } = kit;
// 1.5 · La partita a carte: lanterne e cartelli, la partita Emma–Mare per intero, poi le partite veloci con Al ed Emma.
const PA_Q = [0.90, 0.20, -0.50];
const PA_K = { Al: [-0.40, 0.30, 0.60], Mare: [1.00, -0.30, -1.02], Emma: [0.20, 0.20, 0.24] };
const PA_SALA = [
  { x: 520, nome: 'Al', v: PA_K.Al, t0: 7.6, raggio: 'M520 640 L520 560' },
  { x: 960, nome: 'Mare', v: PA_K.Mare, t0: 8.0, raggio: 'M960 640 L960 560' },
  { x: 1400, nome: 'Emma', v: PA_K.Emma, t0: 8.4, raggio: 'M1400 600 L1400 560' },
  { x: 1700, nome: 'Emma', v: PA_Q, t0: 4.6, raggio: 'M1460 640 C1560 620 1640 600 1700 560', lanterna: true },
];
// La partita Emma–Mare (tempi della scena).
const PA_P = [0.90, -0.06, 0.51], PA_TC = [17.0, 18.8, 21.0];
const PA_Y = [92, 162, 232].map(y => 400 + (y - 150) * 1.35);
const PA_F = ['q · k = 0.90', 'q · k = 0.90 − 0.06', 'q · k = 0.90 − 0.06 + 0.51', 'q · k = 0.90 − 0.06 + 0.51 = 1.35'];
// Le partite veloci.
const PA_GT = [
  { x: 480, nome: 'Al', tot: -0.60, t0: 31.4 },
  { x: 960, nome: 'Mare', tot: 1.35, t0: -1 },
  { x: 1440, nome: 'Emma', tot: 0.10, t0: 34.6 },
];
function paVal(v) {
  return '<g><rect x="-52" y="-24" width="104" height="48" rx="10" fill="#FFFDF6" stroke="#C8B48F" stroke-width="3"/><text y="10" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="600" font-size="26" fill="' + (v < 0 ? '#B8332E' : '#2E2A26') + '">' + window.PZ.fmt(v) + '</text></g>';
}
const PA_MURO = '<rect width="1920" height="1080" fill="url(#pa-muro)"/>';
kit.scene('partita', {
  init(kit) {
    const P = window.PZ, C = P.CARTA_COL;
    let s = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><linearGradient id="pa-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#262F60"/></linearGradient></defs>';
    // A · la Sala degli Sguardi: le lenti fanno cartelli e la lanterna.
    s += '<g class="pa-A">' + PA_MURO + '<path d="M140 1080 L340 120 M1780 1080 L1580 120" stroke="#2A3466" stroke-width="6"/>' +
      '<ellipse cx="960" cy="860" rx="840" ry="120" fill="#1B2244" stroke="#2A3466" stroke-width="4"/>';
    PA_SALA.forEach(c => {
      const ly = c.lanterna ? 600 : 545, lx = c.lanterna ? 1640 : c.x;
      s += '<path class="pa-raggio" d="' + c.raggio + '" stroke="#FFE9A8" stroke-width="6" stroke-linecap="round" fill="none" opacity="0"/>' +
        '<g class="pa-lente" style="transform-origin:' + lx + 'px ' + ly + 'px"><circle cx="' + lx + '" cy="' + ly + '" r="24" fill="#5B6B8C" stroke="#3E4A66" stroke-width="4"/><ellipse cx="' + (lx - 7) + '" cy="' + (ly - 7) + '" rx="8" ry="5" fill="#FFFFFF" opacity=".3"/></g>' +
        '<g class="pa-sc">' + P.carta({ v: c.v, col: C[c.nome], titolo: c.nome, sotto: c.lanterna ? 'lanterna · query' : 'cartello · key' }) + '</g>';
    });
    s += '<g transform="translate(445 695.5) scale(.75)">' + P.al() + '</g><g transform="translate(860 636)">' + P.mare() + '</g>' +
      '<g class="pa-emma" style="transform-origin:1400px 860px"><g transform="translate(1320 642) scale(.8)">' + P.emma(P.VESTITO.rosa, { dy: -2 }) + '</g></g></g>';
    // B · la partita Emma–Mare.
    s += '<g class="pa-B">' + PA_MURO +
      '<ellipse cx="960" cy="560" rx="900" ry="330" fill="#1E5A3A" opacity=".55"/><ellipse cx="960" cy="560" rx="900" ry="330" fill="none" stroke="#8A5A3C" stroke-width="14"/>' +
      '<rect x="560" y="34" width="900" height="84" rx="14" fill="#0F2A2A" stroke="#C9973F" stroke-width="5"/>' +
      '<text class="pa-form" x="1010" y="88" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="34" fill="#9BE7C4"></text>' +
      '<g class="pa-cq">' + P.carta({ v: PA_Q, col: C.Emma, titolo: 'Emma', sotto: 'lanterna · query' }) + '</g>' +
      '<g class="pa-ck">' + P.carta({ v: PA_K.Mare, col: C.Mare, titolo: 'Mare', sotto: 'cartello · key' }) + '</g>';
    PA_Y.forEach(y => {
      s += '<rect class="pa-hl" x="318" y="' + (y - 40) + '" width="304" height="80" rx="14" fill="none" stroke="#FFD978" stroke-width="6"/>' +
        '<rect class="pa-hl" x="1298" y="' + (y - 40) + '" width="304" height="80" rx="14" fill="none" stroke="#FFD978" stroke-width="6"/>';
    });
    PA_Y.forEach((y, i) => {
      s += '<g class="pa-vq">' + paVal(PA_Q[i]) + '</g><g class="pa-vk">' + paVal(PA_K.Mare[i]) + '</g>' +
        '<text class="pa-x" x="960" y="' + (y + 14) + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="44" fill="#FFD978">×</text>' +
        '<g class="pa-p">' + P.pill(PA_P[i]) + '</g>';
    });
    s += '<text class="pa-mm" x="960" y="620" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="#FFD978">meno × meno = più!</text>' +
      '<g class="pa-g">' + P.gettone(1.35) + '</g>' +
      '<text class="pa-gl" x="960" y="945" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="28" fill="#C8CEE8">il gettone: quanto la lanterna di Emma si accende davanti a Mare</text></g>';
    // C · le partite veloci.
    s += '<g class="pa-C">' + PA_MURO + '<rect y="860" width="1920" height="220" fill="#1B2244"/><rect x="160" y="150" width="1600" height="540" rx="60" fill="#1E5A3A" opacity=".45"/>' +
      '<g class="pa-cap"><rect x="610" y="44" width="700" height="76" rx="14" fill="#0F2A2A" stroke="#C9973F" stroke-width="5"/>' +
      '<text x="960" y="94" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="32" fill="#9BE7C4">Al −0.60 · Emma 0.10</text></g>';
    PA_GT.forEach((g, j) => {
      s += '<g class="pa-gq' + j + '">' + P.carta({ v: PA_Q, col: C.Emma, titolo: 'Emma', sotto: 'lanterna' }) + '</g>' +
        '<g class="pa-gk' + j + '">' + P.carta({ v: PA_K[g.nome], col: C[g.nome], titolo: g.nome, sotto: 'cartello' }) + '</g>';
      for (let i = 0; i < 3; i++) s += '<g class="pa-gp' + j + '">' + P.pill(Math.round(PA_Q[i] * PA_K[g.nome][i] * 100) / 100) + '</g>';
      s += '<g class="pa-gg' + j + '">' + P.gettone(g.tot) + '</g>';
      if (j === 0) s += '<g transform="translate(' + (g.x - 60) + ' 760) scale(.6)">' + P.al() + '</g>';
      else if (j === 1) s += '<g transform="translate(' + (g.x - 60) + ' 750) scale(.6)">' + P.mare() + '</g>';
      else s += '<g transform="translate(' + (g.x - 45) + ' 740) scale(.45)">' + P.emma(P.VESTITO.rosa) + '</g>';
    });
    s += '</g></svg>';
    kit.stage.append(kit.h('<div class="ground">' + s +
      P.sott('NARRATORE', 'Al primo piano ognuno riceve due carte nuove: una lanterna, che dice cosa cerca, e un cartello, che dice cosa offre. Emma gioca la sua lanterna contro il cartello di Mare.') +
      P.sott('ADA', 'Seme per seme si moltiplica, poi si somma. Meno per meno fa più! Gettone: uno virgola trentacinque.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.A = q('.pa-A'); this.B = q('.pa-B'); this.C = q('.pa-C');
    this.lenti = all('.pa-lente').map(e => e.style); this.raggi = all('.pa-raggio'); this.sc = all('.pa-sc');
    this.emma = q('.pa-emma').style;
    this.cq = q('.pa-cq'); this.ck = q('.pa-ck'); this.hl = all('.pa-hl');
    this.vq = all('.pa-vq'); this.vk = all('.pa-vk'); this.x = all('.pa-x'); this.p = all('.pa-p');
    this.mm = q('.pa-mm'); this.g = q('.pa-g'); this.gl = q('.pa-gl'); this.form = q('.pa-form');
    this.gt = PA_GT.map((g, j) => ({ cq: q('.pa-gq' + j), ck: q('.pa-gk' + j), p: all('.pa-gp' + j), g: q('.pa-gg' + j) }));
    this.cap = q('.pa-cap');
    this.sub = window.PZ.subs(kit, [[0.4, 15.4], [15.8, 27.4]]);
  },
  render(t) {
    const ab = eio(seg(t, 12.4, 13.0)), bc = eio(seg(t, 30.4, 31.0));
    this.A.setAttribute('opacity', (1 - ab).toFixed(3));
    this.B.setAttribute('opacity', (ab * (1 - bc)).toFixed(3));
    this.C.setAttribute('opacity', bc.toFixed(3));
    // A
    PA_SALA.forEach((c, i) => {
      this.lenti[i].transform = 'scale(' + eob(seg(t, c.t0 - 2.2, c.t0 - 1.7), 1.7).toFixed(3) + ')';
      const r = seg(t, c.t0, c.t0 + 0.4);
      this.raggi[i].setAttribute('opacity', (r * (1 - seg(t, c.t0 + 0.8, c.t0 + 1.4)) * 0.9).toFixed(2));
      const k = seg(t, c.t0 + 0.3, c.t0 + 0.8);
      const sc = 0.62 * (k <= 0 ? 0 : eob(k, 1.6));
      const bob = 4 * Math.sin(t * 1.5 + i), tilt = (c.lanterna ? 4 : 0) + 2 * Math.sin(t * 1.1 + i);
      this.sc[i].setAttribute('transform', 'translate(' + c.x + ' ' + (330 + bob).toFixed(1) + ') rotate(' + tilt.toFixed(2) + ') scale(' + sc.toFixed(3) + ') translate(-110 -150)');
    });
    this.emma.transform = 'scale(' + (1 + 0.012 * Math.sin(t * 2 * Math.PI / 3)) + ')';
    // B
    const a = eob(seg(t, 12.9, 13.6), 1.4), b = eob(seg(t, 13.6, 14.3), 1.4);
    this.cq.setAttribute('transform', 'translate(' + lerp(-200, 470, a).toFixed(1) + ' 400) rotate(' + lerp(-14, -2, a).toFixed(2) + ') scale(1.35) translate(-110 -150)');
    this.ck.setAttribute('transform', 'translate(' + lerp(2120, 1450, b).toFixed(1) + ' 400) rotate(' + lerp(14, 2, b).toFixed(2) + ') scale(1.35) translate(-110 -150)');
    PA_Y.forEach((y, i) => {
      const tc = PA_TC[i];
      const h = seg(t, tc - 1.0, tc - 0.7) * (1 - seg(t, tc + 0.6, tc + 1.0));
      this.hl[i * 2].setAttribute('opacity', h.toFixed(2)); this.hl[i * 2 + 1].setAttribute('opacity', h.toFixed(2));
      const m = eio(seg(t, tc - 0.8, tc)), gone = seg(t, tc, tc + 0.15);
      this.vq[i].setAttribute('transform', 'translate(' + lerp(560, 880, m).toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (m <= 0 ? 0 : (1 - gone)).toFixed(3) + ')');
      this.vk[i].setAttribute('transform', 'translate(' + lerp(1360, 1040, m).toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (m <= 0 ? 0 : (1 - gone)).toFixed(3) + ')');
      this.x[i].setAttribute('opacity', (m > 0.2 && gone < 1 ? 1 : 0));
      const sp = seg(t, tc, tc + 0.4), fly = seg(t, 23.6 + i * 0.25, 24.2 + i * 0.25);
      this.p[i].setAttribute('transform', 'translate(960 ' + lerp(y, 740, eio(fly)).toFixed(1) + ') scale(' + (sp <= 0 || fly >= 1 ? 0 : eob(sp, 1.7) * (1 - 0.5 * fly)).toFixed(3) + ')');
    });
    this.mm.setAttribute('opacity', (eo(seg(t, 21.3, 21.7)) * (1 - seg(t, 23.2, 23.6))).toFixed(2));
    const g = seg(t, 24.6, 25.1);
    this.g.setAttribute('transform', 'translate(960 740) scale(' + (g <= 0 ? 0 : 1.3 * eob(g, 1.8)).toFixed(3) + ') rotate(' + (8 * Math.sin(t * 1.5)).toFixed(2) + ')');
    this.gl.setAttribute('opacity', eo(seg(t, 25.6, 26.2)).toFixed(2));
    let f = -1; PA_TC.forEach((tc, i) => { if (t >= tc + 0.2) f = i; }); if (t >= 25.0) f = 3;
    this.form.textContent = f < 0 ? 'q · k = ?' : PA_F[f];
    // C
    PA_GT.forEach((g, j) => {
      const G = this.gt[j], pre = g.t0 < 0;
      const app = pre ? 1 : eob(seg(t, g.t0, g.t0 + 0.5), 1.5);
      const bob = 3 * Math.sin(t * 1.4 + j);
      G.cq.setAttribute('transform', 'translate(' + (g.x - 72) + ' ' + (290 + bob).toFixed(1) + ') rotate(-3) scale(' + (0.55 * app).toFixed(3) + ') translate(-110 -150)');
      G.ck.setAttribute('transform', 'translate(' + (g.x + 72) + ' ' + (290 - bob).toFixed(1) + ') rotate(3) scale(' + (0.55 * app).toFixed(3) + ') translate(-110 -150)');
      for (let i = 0; i < 3; i++) {
        const tp = g.t0 + 0.8 + i * 0.45, p = pre ? 0 : seg(t, tp, tp + 0.35);
        const m = pre ? 0 : eio(seg(t, g.t0 + 2.3, g.t0 + 2.8));
        G.p[i].setAttribute('transform', 'translate(' + lerp(g.x - 92 + i * 92, g.x, m).toFixed(1) + ' ' + lerp(480, 600, m).toFixed(1) + ') scale(' + (p <= 0 || m >= 1 ? 0 : 0.62 * eob(p, 1.7) * (1 - 0.5 * m)).toFixed(3) + ')');
      }
      const gp = pre ? 1 : seg(t, g.t0 + 2.75, g.t0 + 3.2);
      G.g.setAttribute('transform', 'translate(' + g.x + ' 600) scale(' + (gp <= 0 ? 0 : (pre ? 1 : eob(gp, 1.8))).toFixed(3) + ') rotate(' + (6 * Math.sin(t * 1.3 + j)).toFixed(2) + ')');
    });
    this.cap.setAttribute('opacity', eo(seg(t, 38.4, 39.0)).toFixed(2));
    this.sub(t);
  },
});
