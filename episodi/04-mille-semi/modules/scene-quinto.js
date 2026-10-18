const { seg, eo, ei, eio, eob, lerp } = kit;
// 4.4 · Il quinto seme: disegnare è impossibile, giocare è facilissimo.
const QI_Q = [0.90, 0.20, -0.50, 0.40, -0.30], QI_K = [1.00, -0.30, -1.02, 0.50, 0.60], QI_P = [0.90, -0.06, 0.51, 0.20, -0.18];
const QI_TC = [1.0, 1.6, 2.2, 2.8, 3.4];
kit.scene('quinto', {
  init(kit) {
    const P = window.PZ;
    const Y = P.righeY(5).map(y => 420 + (y - 150) * 1.35);
    let s = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><linearGradient id="qi-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#2C2660"/></linearGradient></defs><rect width="1920" height="1080" fill="url(#qi-muro)"/>' +
      '<ellipse cx="960" cy="580" rx="900" ry="330" fill="#1E5A3A" opacity=".55"/><ellipse cx="960" cy="580" rx="900" ry="330" fill="none" stroke="#8A5A3C" stroke-width="14"/>' +
      '<g class="qi-mon"><rect x="610" y="34" width="700" height="84" rx="14" fill="#0F2A2A" stroke="#C9973F" stroke-width="5"/><text x="960" y="88" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="32" fill="#9BE7C4">… + 0.20 − 0.18 = 1.37</text></g>' +
      '<g transform="translate(470 420) rotate(-2) scale(1.35) translate(-110 -150)">' + P.carta({ v: QI_Q, col: P.CARTA_COL.Emma, titolo: 'Emma', sotto: 'lanterna · 5 semi' }) + '</g>' +
      '<g transform="translate(1450 420) rotate(2) scale(1.35) translate(-110 -150)">' + P.carta({ v: QI_K, col: P.CARTA_COL.Mare, titolo: 'Mare', sotto: 'cartello · 5 semi' }) + '</g>';
    Y.forEach((y, i) => { s += '<g class="qi-p">' + P.pill(QI_P[i]) + '</g>'; });
    s += '<g class="qi-g">' + P.gettone(1.37) + '</g></svg>';
    kit.stage.append(kit.h('<div class="ground">' + s + P.sott('ADA', 'Cinque semi. Disegnare, impossibile. Giocare, facilissimo.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.p = all('.qi-p'); this.g = q('.qi-g'); this.mon = q('.qi-mon'); this.Y = Y;
    this.sub = window.PZ.subs(kit, [[5.4, 10.6]]);
  },
  render(t) {
    // Le cinque pastiglie, una dopo l'altra, veloci: poi il gettone.
    this.Y.forEach((y, i) => {
      const sp = seg(t, QI_TC[i], QI_TC[i] + 0.4), fly = seg(t, 4.0 + i * 0.1, 4.6 + i * 0.1);
      this.p[i].setAttribute('transform', 'translate(960 ' + lerp(y, 800, eio(fly)).toFixed(1) + ') scale(' + (sp <= 0 || fly >= 1 ? 0 : eob(sp, 1.7) * (1 - 0.5 * fly)).toFixed(3) + ')');
    });
    const g = seg(t, 4.8, 5.3);
    this.g.setAttribute('transform', 'translate(960 800) scale(' + (g <= 0 ? 0 : 1.3 * eob(g, 1.8)).toFixed(3) + ') rotate(' + (8 * Math.sin(t * 1.5)).toFixed(2) + ')');
    this.mon.setAttribute('opacity', eo(seg(t, 11.0, 11.6)).toFixed(2));
    this.sub(t);
  },
});
