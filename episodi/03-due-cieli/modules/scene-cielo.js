const { seg, eo, ei, eio, eob, lerp } = kit;
const CI_M = [[0.05, 0.05, 0.80], [0.65, 0.05, 0.60], [1.45, 0.10, -0.20], [2.75, 0.30, -1.80]];
const CI_P = [[0.05, 0.05, 0.80], [0.05, 0.65, 0.60], [0.10, 1.45, -0.20], [0.30, 2.75, -1.80]];
const CI_CM = ['#FE8787', '#D586DD', '#6E88FD', '#398BE9'], CI_CP = ['#FE8787', '#D5DD86', '#6EFD88', '#39E98B'];
const CI_W = [['nuota', [0.8, -0.05, -0.6], 3.4, '#3379E5'], ['onde', [0.8, -0.1, 0.3], 2.4, '#AB70F6'], ['sabbia', [0.7, 0.2, 0.3], 2.6, '#B09FF0'], ['corre', [0, 0.8, -0.6], 3.4, '#33E57F'], ['foglie', [-0.1, 0.8, 0.3], 2.4, '#ABF670'], ['altalena', [0.2, 0.75, 0.3], 2.7, '#ADF29E'], ['gioca', [0.45, 0.45, -0.6], 3.4, '#28C1C1']];
function ciP(v, a) { const S = 150, c = Math.cos(a), s = Math.sin(a); return [960 + S * (v[0] * c - v[1] * s) * 1.25, 560 - S * (v[2] * 0.95 + (v[0] * s + v[1] * c) * 0.33)]; }
kit.scene('cielo', {
  init(kit) {
    const P = window.PZ, r = kit.rng(8);
    let st = ''; for (let k = 0; k < 90; k++) st += '<circle cx="' + (r() * 1920).toFixed(0) + '" cy="' + (r() * 1080).toFixed(0) + '" r="' + (0.8 + r() * 1.6).toFixed(1) + '" fill="#FFF4E0" opacity="' + (0.2 + r() * 0.5).toFixed(2) + '"/>';
    let w = ''; CI_W.forEach(x => { w += '<g class="ci-w"><circle r="9" fill="' + x[3] + '"/><circle r="22" fill="' + x[3] + '" opacity=".25" filter="url(#pz-soft)"/><text x="16" y="-12" font-family="Fredoka, sans-serif" font-weight="600" font-size="28" fill="' + x[3] + '">' + x[0] + '</text></g>'; });
    let tr = ''; for (let i = 1; i < 4; i++) tr += '<line class="ci-m" stroke="' + CI_CM[i] + '" stroke-width="' + (5 + i * 2) + '" stroke-linecap="round"/><line class="ci-p" stroke="' + CI_CP[i] + '" stroke-width="' + (5 + i * 2) + '" stroke-linecap="round"/>';
    let pt = ''; for (let i = 1; i < 4; i++) pt += '<circle class="ci-mp" r="10" fill="' + CI_CM[i] + '"/><circle class="ci-pp" r="10" fill="' + CI_CP[i] + '"/>';
    kit.stage.append(kit.h('<div class="ground" style="background:#070A18">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs + st +
      '<line class="ci-ax" stroke="#2F3A6E" stroke-width="2"/><line class="ci-ax" stroke="#2F3A6E" stroke-width="2"/><line class="ci-ax" stroke="#2F3A6E" stroke-width="2"/>' +
      w + tr + pt +
      '<g class="ci-start"><circle r="26" fill="#FE8787" opacity=".35" filter="url(#pz-soft)"/><circle r="14" fill="#FE8787"/><text x="22" y="-18" font-family="Fredoka, sans-serif" font-weight="600" font-size="30" fill="#FE8787">Emma</text></g>' +
      '<g class="ci-em"><g transform="translate(-40 -110) scale(.4)">' + P.emma('#398BE9') + '</g></g><g class="ci-ep"><g transform="translate(-40 -110) scale(.4)">' + P.emma('#39E98B') + '</g></g>' +
      '<text x="1880" y="1040" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="16" fill="#5F6A9A">stelle delle parole disegnate lungo le loro direzioni · modellino a 3 dimensioni</text></svg>' +
      '<div class="tag" style="left:56px;top:44px">al mare → blu · al parco → verde</div>' +
      P.sott('NARRATORE', 'Stessa bambina, stesso pozzo, stesse pietre. È bastata una parola sola, mare o parco, per portare Emma in due cieli diversi.') +
      P.sott('ADA', 'Conclusione: il punto di partenza è lo stesso, è il contesto che sposta. E «gioca» sta proprio in mezzo: si può giocare in tutti e due i posti.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.ax = all('.ci-ax'); this.w = all('.ci-w'); this.m = all('.ci-m'); this.p = all('.ci-p'); this.mp = all('.ci-mp'); this.pp = all('.ci-pp');
    this.start = q('.ci-start'); this.em = q('.ci-em'); this.ep = q('.ci-ep');
    this.sub = window.PZ.subs(kit, [[0.6, 7.6], [8.0, 15.7]]);
  },
  render(t) {
    const a = 0.55 + 0.035 * t;
    const O = ciP([0, 0, 0], a);
    [[2, 0, 0], [0, 2, 0], [0, 0, 1.2]].forEach((v, i) => { const e = ciP(v, a); this.ax[i].setAttribute('x1', O[0]); this.ax[i].setAttribute('y1', O[1]); this.ax[i].setAttribute('x2', e[0].toFixed(1)); this.ax[i].setAttribute('y2', e[1].toFixed(1)); });
    CI_W.forEach((x, i) => {
      const p = ciP(x[1].map(c => c * x[2]), a), s = eob(seg(t, 0.3 + i * 0.12, 0.8 + i * 0.12), 1.6);
      const hi = x[0] === 'gioca' ? 1 + 0.35 * Math.sin(Math.PI * seg(t, 11.0, 12.2)) : 1;
      this.w[i].setAttribute('transform', 'translate(' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ') scale(' + (s * hi).toFixed(3) + ')');
    });
    const S0 = ciP(CI_M[0], a);
    this.start.setAttribute('transform', 'translate(' + S0[0].toFixed(1) + ' ' + S0[1].toFixed(1) + ') scale(' + eob(seg(t, 0, 0.6), 1.7).toFixed(3) + ')');
    const draw = (lines, dots, V, t0) => {
      let tip = ciP(V[0], a);
      for (let i = 1; i < 4; i++) {
        const p0 = ciP(V[i - 1], a), p1 = ciP(V[i], a), k = eio(seg(t, t0 + (i - 1) * 0.9, t0 + i * 0.9));
        const x = lerp(p0[0], p1[0], k), y = lerp(p0[1], p1[1], k);
        const L = lines[i - 1]; L.setAttribute('x1', p0[0].toFixed(1)); L.setAttribute('y1', p0[1].toFixed(1)); L.setAttribute('x2', x.toFixed(1)); L.setAttribute('y2', y.toFixed(1)); L.setAttribute('opacity', k > 0 ? 1 : 0);
        dots[i - 1].setAttribute('cx', p1[0].toFixed(1)); dots[i - 1].setAttribute('cy', p1[1].toFixed(1)); dots[i - 1].setAttribute('opacity', k >= 1 ? 1 : 0);
        if (k > 0) tip = [x, y];
      }
      return tip;
    };
    const tm = draw(this.m, this.mp, CI_M, 1.2), tp = draw(this.p, this.pp, CI_P, 4.2);
    this.em.setAttribute('transform', 'translate(' + tm[0].toFixed(1) + ' ' + tm[1].toFixed(1) + ')'); this.em.setAttribute('opacity', eo(seg(t, 1.2, 1.6)).toFixed(2));
    this.ep.setAttribute('transform', 'translate(' + tp[0].toFixed(1) + ' ' + tp[1].toFixed(1) + ')'); this.ep.setAttribute('opacity', eo(seg(t, 4.2, 4.6)).toFixed(2));
    this.sub(t);
  },
});
