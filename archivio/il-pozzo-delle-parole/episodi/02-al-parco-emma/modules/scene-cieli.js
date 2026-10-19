const { seg, eo, ei, eio, eob, lerp } = kit;
// 2.8 · Due cieli: una sola stella di partenza, due scie. Il cielo ruota piano, senza parole.
const CI_MARE = [[0.55, 0.07, -0.58], [0.11, 0.50, -0.72], [-0.82, 1.11, -0.50], [-2.47, 2.19, 0.14]];
const CI_PARCO = [[0.55, 0.07, -0.58], [0.73, 0.49, -0.14], [0.58, 1.09, 0.81], [0.07, 2.15, 2.51]];
const CI_U = {
  nuota: [-0.80, 0.60, -0.05], onde: [-0.25, 0.51, -0.61], conchiglie: [-0.15, 0.54, -0.60],
  corre: [0.08, 0.59, 0.77], foglie: [0.56, 0.50, 0.19], altalena: [0.51, 0.62, 0.04], gioca: [-0.36, 0.67, 0.38],
};
const CI_COL = { nuota: '#8FB6FF', onde: '#8FB6FF', conchiglie: '#8FB6FF', corre: '#8EE8A8', foglie: '#8EE8A8', altalena: '#8EE8A8', gioca: '#5FD0D0' };
function ciProj(v, a) {
  const S = 145, c = Math.cos(a), s = Math.sin(a);
  return [960 + S * (v[0] * c - v[1] * s), 520 - S * (v[2] * 0.95 + (v[0] * s + v[1] * c) * 0.33)];
}
// La parte di una polilinea fino alla frazione f.
function ciScia(pts, f) {
  const seg2 = []; let tot = 0;
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg2.push(d); tot += d; }
  let rest = tot * f, d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
  for (let i = 1; i < pts.length && rest > 0; i++) {
    const k = Math.min(1, rest / seg2[i - 1]);
    d += ' L' + lerp(pts[i - 1][0], pts[i][0], k).toFixed(1) + ' ' + lerp(pts[i - 1][1], pts[i][1], k).toFixed(1);
    rest -= seg2[i - 1];
  }
  return d;
}
kit.scene('cieli', {
  init(kit) {
    const P = window.PZ;
    const r = kit.rng(9);
    let stelle = '';
    for (let i = 0; i < 90; i++) stelle += '<circle class="ci-st" cx="' + (r() * 1920).toFixed(0) + '" cy="' + (r() * 1080).toFixed(0) + '" r="' + (0.8 + r() * 1.8).toFixed(1) + '" fill="#FFF4E0"/>';
    let ax = '';
    for (let i = 0; i < 3; i++) ax += '<line class="ci-asse" stroke="#3A4374" stroke-width="2" stroke-dasharray="6 8"/><g class="ci-et" opacity=".55"><circle r="16" fill="#E6FFF4"/>' + P.seme(i, 0, 0, 0.6) + '</g>';
    let parole = '';
    Object.keys(CI_U).forEach(w => { const dy = w === 'conchiglie' ? 34 : -12; parole += '<g class="ci-w"><circle r="9" fill="' + CI_COL[w] + '"/><circle r="26" fill="' + CI_COL[w] + '" opacity=".25" filter="url(#pz-soft)"/><text x="16" y="' + dy + '" font-family="Fredoka, sans-serif" font-weight="600" font-size="30" fill="' + CI_COL[w] + '">' + w + '</text></g>'; });
    kit.stage.append(kit.h('<div class="ground">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><radialGradient id="ci-cielo" cx=".5" cy=".5" r=".75"><stop offset="0" stop-color="#1A2350"/><stop offset="1" stop-color="#05060C"/></radialGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#ci-cielo)"/>' + stelle + ax + parole +
      '<path class="ci-blu" stroke="#2864DC" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
      '<path class="ci-verde" stroke="#28AA50" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
      '<g class="ci-emma"><circle r="44" fill="#BC937F" opacity=".4" filter="url(#pz-soft)"/><circle r="14" fill="#BC937F" stroke="#FFF4E0" stroke-width="3"/></g>' +
      '<g class="ci-mon"><rect x="420" y="930" width="1080" height="80" rx="16" fill="#0F2A2A" stroke="#C9973F" stroke-width="5"/>' +
      '<text x="960" y="982" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="28" fill="#9BE7C4">Embedding: uguale. Dopo gli strati: dipende da tutta la frase.</text></g></svg>' +
      P.sott('NARRATORE', 'Stessa bambina, stesso pozzo, stesse pietre. È bastata una parola sola per portare Emma in due cieli diversi.') +
      P.sott('ADA', 'Il punto di partenza è lo stesso. È il contesto che sposta.') + '</div>'));
    const q = c => kit.stage.querySelector(c), all = c => [...kit.stage.querySelectorAll(c)];
    this.st = all('.ci-st'); this.assi = all('.ci-asse'); this.et = all('.ci-et'); this.w = all('.ci-w');
    this.blu = q('.ci-blu'); this.verde = q('.ci-verde'); this.emma = q('.ci-emma'); this.mon = q('.ci-mon');
    this.sub = window.PZ.subs(kit, [[3.0, 12.6], [14.0, 19.4]]);
  },
  render(t) {
    const a = 2.88 + 0.035 * t;
    const O = ciProj([0, 0, 0], a);
    [[1.6, 0, 0], [0, 1.6, 0], [0, 0, 1.6]].forEach((d, i) => {
      const e = ciProj(d, a), e2 = ciProj(d.map(x => x * 1.1), a);
      this.assi[i].setAttribute('x1', O[0].toFixed(1)); this.assi[i].setAttribute('y1', O[1].toFixed(1)); this.assi[i].setAttribute('x2', e[0].toFixed(1)); this.assi[i].setAttribute('y2', e[1].toFixed(1));
      this.et[i].setAttribute('transform', 'translate(' + e2[0].toFixed(1) + ' ' + e2[1].toFixed(1) + ')');
    });
    Object.keys(CI_U).forEach((w, i) => {
      const u = CI_U[w], n = Math.hypot(u[0], u[1], u[2]), p = ciProj(u.map(x => 2.6 * x / n), a);
      this.w[i].setAttribute('transform', 'translate(' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ')');
      this.w[i].setAttribute('opacity', eo(seg(t, 0.4 + i * 0.15, 1.0 + i * 0.15)).toFixed(2));
    });
    const E = ciProj(CI_MARE[0], a);
    this.emma.setAttribute('transform', 'translate(' + E[0].toFixed(1) + ' ' + E[1].toFixed(1) + ') scale(' + eob(seg(t, 0.2, 0.8), 1.6).toFixed(3) + ')');
    this.blu.setAttribute('d', ciScia(CI_MARE.map(v => ciProj(v, a)), eio(seg(t, 1.2, 4.2))));
    this.verde.setAttribute('d', ciScia(CI_PARCO.map(v => ciProj(v, a)), eio(seg(t, 4.4, 7.4))));
    this.blu.setAttribute('opacity', seg(t, 1.2, 1.3).toFixed(2)); this.verde.setAttribute('opacity', seg(t, 4.4, 4.5).toFixed(2));
    this.st.forEach((s, i) => s.setAttribute('opacity', (0.4 + 0.4 * Math.sin(t * 1.3 + i * 1.7)).toFixed(2)));
    this.mon.setAttribute('opacity', eo(seg(t, 20.0, 20.6)).toFixed(2));
    this.sub(t);
  },
});
