const { seg, eo, ei, eio, eob, lerp } = kit;
const GT_Q = [0.90, 0.20, -0.50];
const GT = [
  { x: 480, nome: 'Al', col: '#139A9A', k: [-0.40, 0.30, 0.60], tot: -0.60, t0: 0.6 },
  { x: 960, nome: 'Mare', col: '#6E6EE6', k: [1.00, -0.30, -1.02], tot: 1.35, t0: -10 },
  { x: 1440, nome: 'Emma', col: '#E0475B', k: [0.20, 0.20, 0.24], tot: 0.10, t0: 4.0 },
];
kit.scene('barattoli', {
  init(kit) {
    const P = window.PZ;
    let s = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><linearGradient id="gt-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#262F60"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#gt-muro)"/><rect y="860" width="1920" height="220" fill="#1B2244"/>' +
      '<rect x="160" y="120" width="1600" height="560" rx="60" fill="#1E5A3A" opacity=".45"/>';
    GT.forEach((g, j) => {
      s += '<g class="gt-cq' + j + '">' + P.carta({ v: GT_Q, col: '#E0475B', titolo: 'Emma', sotto: 'lanterna' }) + '</g>' +
        '<g class="gt-ck' + j + '">' + P.carta({ v: g.k, col: g.col, titolo: g.nome, sotto: 'cartello' }) + '</g>';
      for (let i = 0; i < 3; i++) s += '<g class="gt-p' + j + '">' + P.pill(Math.round(GT_Q[i] * g.k[i] * 100) / 100) + '</g>';
      s += '<g class="gt-g' + j + '">' + P.gettone(g.tot) + '</g>';
      if (j === 0) s += '<g transform="translate(' + (g.x - 60) + ' 760) scale(.6)">' + P.al() + '</g>';
      else if (j === 1) s += '<g transform="translate(' + (g.x - 60) + ' 750) scale(.6)">' + P.mare() + '</g>';
      else s += '<g transform="translate(' + (g.x - 45) + ' 740) scale(.45)">' + P.emma('#FE8787') + '</g>';
    });
    s += '</svg>';
    kit.stage.append(kit.h('<div class="ground">' + s +
      P.sott('ADA', 'Rifaccio la partita con Al: un gettone sotto zero, meno zero sessanta. E con Emma stessa: zero virgola dieci. Tre gettoni, tre punteggi.') + '</div>'));
    const q = c => kit.stage.querySelector(c), all = c => [...kit.stage.querySelectorAll(c)];
    this.col = GT.map((g, j) => ({ cq: q('.gt-cq' + j), ck: q('.gt-ck' + j), p: all('.gt-p' + j), g: q('.gt-g' + j) }));
    this.sub = window.PZ.subs(kit, [[0.5, 12.6]]);
  },
  render(t) {
    GT.forEach((g, j) => {
      const C = this.col[j], pre = g.t0 < 0;
      const app = pre ? 1 : eob(seg(t, g.t0, g.t0 + 0.5), 1.5);
      const bob = 3 * Math.sin(t * 1.4 + j);
      C.cq.setAttribute('transform', 'translate(' + (g.x - 72) + ' ' + (260 + bob).toFixed(1) + ') rotate(-3) scale(' + (0.55 * app).toFixed(3) + ') translate(-110 -150)');
      C.ck.setAttribute('transform', 'translate(' + (g.x + 72) + ' ' + (260 - bob).toFixed(1) + ') rotate(3) scale(' + (0.55 * app).toFixed(3) + ') translate(-110 -150)');
      for (let i = 0; i < 3; i++) {
        const tp = g.t0 + 0.8 + i * 0.45, p = pre ? 0 : seg(t, tp, tp + 0.35);
        const m = pre ? 0 : eio(seg(t, g.t0 + 2.3, g.t0 + 2.8));
        const x = lerp(g.x - 92 + i * 92, g.x, m), y = lerp(450, 580, m);
        C.p[i].setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (p <= 0 || m >= 1 ? 0 : 0.62 * eob(p, 1.7) * (1 - 0.5 * m)).toFixed(3) + ')');
      }
      const gp = pre ? 1 : seg(t, g.t0 + 2.75, g.t0 + 3.2);
      C.g.setAttribute('transform', 'translate(' + g.x + ' 580) scale(' + (gp <= 0 ? 0 : (pre ? 1 : eob(gp, 1.8))).toFixed(3) + ') rotate(' + (6 * Math.sin(t * 1.3 + j)).toFixed(2) + ')');
    });
    this.sub(t);
  },
});
