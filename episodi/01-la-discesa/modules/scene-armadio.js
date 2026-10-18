const { seg, eo, eio, eob, lerp } = kit;
const AR_X = [230, 480, 730];
const AR_CASS = [[[1, 2], [3, 0], [5, 2]], [[1, 2], [4, 1], [5, 2]]];
const AR_NUM = [['1204', '8812', '22741'], ['1204', '15530', '22741']];
const AR_LUCE = [['#17B3B3', '#8787FE', '#FE8787'], ['#17B3B3', '#87FE87', '#FE8787']];
function arMix(a, b, p) {
  const h = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16));
  const A = h(a), B = h(b);
  return 'rgb(' + A.map((v, i) => Math.round(lerp(v, B[i], p))).join(',') + ')';
}
function arCass(c, r) { return [100 + c * 130, 96 + r * 92]; }
kit.scene('armadio', {
  init(kit) {
    const P = window.PZ;
    const rnd = kit.rng(5);
    let svg = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><linearGradient id="armadio-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#222B57"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#armadio-muro)"/><rect x="0" y="760" width="1920" height="320" fill="#1B2244"/><path d="M0 760 L1920 760" stroke="#2A3466" stroke-width="4"/>';
    for (let i = 0; i < 2; i++) {
      svg += '<g transform="translate(' + (i * 960) + ' 0)">';
      for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
        const [x, y] = arCass(c, r);
        const k = AR_CASS[i].findIndex(v => v[0] === c && v[1] === r);
        const num = k >= 0 ? AR_NUM[i][k] : String(10000 + Math.floor(rnd() * 89999));
        svg += '<g class="' + (k >= 0 ? 'armadio-cass armadio-c' + k : '') + '" style="transform-origin:' + (x + 55) + 'px ' + (y + 40) + 'px">' +
          '<rect x="' + x + '" y="' + y + '" width="110" height="76" rx="8" fill="#5B6B8C" stroke="#3E4A66" stroke-width="3"/>' +
          '<rect x="' + (x + 38) + '" y="' + (y + 50) + '" width="34" height="8" rx="4" fill="#3E4A66"/>' +
          '<text x="' + (x + 55) + '" y="' + (y + 32) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="17" fill="#C8D0E6">' + num + '</text></g>';
      }
      AR_X.forEach((x, j) => {
        let pers;
        if (j === 0) pers = '<g transform="translate(' + (x - 75) + ' 635) scale(.75)">' + P.al() + '</g>';
        else if (j === 1) pers = '<g transform="translate(' + (x - 80) + ' ' + (i ? 619 : 613) + ') scale(.8)">' + (i ? P.parco() : P.mare()) + '</g>';
        else pers = '<g class="armadio-fronte" transform="translate(' + (x - 55) + ' 595) scale(.55)">' + P.emma('#C9C2D6') + '</g><g class="armadio-spalle" transform="translate(' + (x - 55) + ' 595) scale(.55)">' + P.emmaSpalle('#FE8787', 3) + '</g>' +
          '<path class="armadio-ago" d="M0 0 L18 -6" stroke="#D9DDE6" stroke-width="3" stroke-linecap="round"/>';
        svg += '<g class="armadio-pers" style="transform-origin:' + x + 'px 760px">' + pers + '</g>' +
          '<circle class="armadio-orb" r="18" fill="' + AR_LUCE[i][j] + '"/>';
        if (j < 2) svg += '<g class="armadio-badge" transform="translate(' + (x + 52) + ' 690)"><circle r="17" fill="#F6E7C8" stroke="#2B2350" stroke-width="1.6" stroke-dasharray="3 2.5"/><text y="7" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="19" fill="#2B2350">' + (j + 1) + '</text></g>';
      });
      svg += '</g>';
    }
    svg += '<path d="M960 80 L960 1000" stroke="#3A4374" stroke-width="4" stroke-dasharray="14 12"/></svg>';
    kit.stage.append(kit.h('<div class="ground">' + svg +
      P.sott('NARRATORE', 'Nel pozzo c’è un armadio, con un cassetto per ogni parola. Ognuno prende il suo vestito di luce: sempre lo stesso, in qualunque frase.') +
      P.sott('NARRATORE', 'E siccome il pozzo non sa chi viene prima e chi dopo, a ognuno si cuce un numero sulla schiena.') + '</div>'));
    const all = s => [...kit.stage.querySelectorAll(s)];
    this.cass = [0, 1, 2].map(k => all('.armadio-c' + k));
    this.orbs = all('.armadio-orb');
    this.pers = all('.armadio-pers').map(e => e.style);
    this.fronte = all('.armadio-fronte');
    this.vestiti = this.fronte.map(g => g.firstElementChild);
    this.spalle = all('.armadio-spalle');
    this.aghi = all('.armadio-ago');
    this.badge = all('.armadio-badge');
    this.sub = window.PZ.subs(kit, [[0.4, 7.4], [7.8, 12.8]]);
  },
  render(t) {
    for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) {
      const t0 = 0.8 + j * 0.7;
      const [cx, cy] = arCass(AR_CASS[i][j][0], AR_CASS[i][j][1]);
      const open = eob(seg(t, t0, t0 + 0.45), 1.6);
      this.cass[j][i].style.transform = 'translateY(' + (10 * open) + 'px) scale(' + (1 + 0.1 * open) + ')';
      const p = seg(t, t0 + 0.4, t0 + 1.3);
      const x0 = i * 960 + cx + 55, y0 = cy + 40, x1 = i * 960 + AR_X[j], y1 = j === 2 ? 680 : 700;
      const o = this.orbs[i * 3 + j];
      o.setAttribute('cx', lerp(x0, x1, eio(p)).toFixed(1));
      o.setAttribute('cy', (lerp(y0, y1, eio(p)) - 120 * Math.sin(Math.PI * p)).toFixed(1));
      o.setAttribute('opacity', p <= 0 || p >= 1 ? 0 : 0.9);
      const hit = Math.sin(Math.PI * seg(t, t0 + 1.25, t0 + 1.7));
      this.pers[i * 3 + j].transform = 'scale(' + (1 + 0.06 * hit + 0.01 * Math.sin(t * 2 + j)).toFixed(3) + ')';
      if (j < 2) {
        const b = this.badge[i * 2 + j];
        const pb = seg(t, 8.0 + j * 0.3, 8.4 + j * 0.3);
        b.setAttribute('transform', 'translate(' + (i * 960 + AR_X[j] + 52) + ' 690) scale(' + eob(pb, 1.8).toFixed(3) + ')');
      }
    }
    const dressP = eo(seg(t, 3.4, 3.9));
    this.vestiti.forEach(g => { g.style.color = arMix('#C9C2D6', '#FE8787', dressP); });
    const back = eio(seg(t, 8.3, 8.8)) * (1 - eio(seg(t, 11.4, 11.9)));
    this.fronte.forEach(g => g.setAttribute('opacity', (1 - back).toFixed(3)));
    this.spalle.forEach(g => g.setAttribute('opacity', back.toFixed(3)));
    const st = seg(t, 9.0, 10.6);
    this.aghi.forEach((a, i) => {
      const ang = st * Math.PI * 6;
      const x = i * 960 + AR_X[2] + Math.cos(ang) * 14, y = 595 + 178 * 0.55 + Math.sin(ang) * 14;
      a.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')');
      a.setAttribute('opacity', st > 0 && st < 1 ? 1 : 0);
    });
    this.sub(t);
  },
});
