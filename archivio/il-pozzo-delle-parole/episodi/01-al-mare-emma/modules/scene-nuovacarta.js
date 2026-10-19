const { seg, eo, ei, eio, eob, lerp } = kit;
// 1.6 · La nuova carta: i gettoni diventano quote, con le quote si mescolano le carte. Pietra fissa, quote del momento.
const NC_QU = [
  { x: 480, nome: 'Al', s: -0.60, e: 0.55, p: 10, c: '#17B3B3' },
  { x: 960, nome: 'Mare', s: 1.35, e: 3.86, p: 70, c: '#8787FE' },
  { x: 1440, nome: 'Emma', s: 0.10, e: 1.11, p: 20, c: '#E3A58E' },
];
const NC_CARTE = [
  { x: 413, nome: 'Al', v: [-0.14, 0.14, 0.15], w: 0.1 },
  { x: 826, nome: 'Mare', v: [-0.35, 0.61, -0.40], w: 0.7 },
  { x: 1238, nome: 'Emma', v: [0.55, 0.07, -0.58], w: 0.2 },
];
const NC_NEW = [-0.15, 0.46, -0.38];
const NC_RY = [92, 162, 232];
const NC_NX = 826, NC_NY = 700;
function ncPezzo(v) {
  const t = (v < 0 ? '−' : '') + Math.abs(v).toFixed(3);
  return '<g><rect x="-50" y="-19" width="100" height="38" rx="9" fill="#FFFDF6" stroke="#C8B48F" stroke-width="2"/><text y="8" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="600" font-size="20" fill="' + (v < 0 ? '#B8332E' : '#2E2A26') + '">' + t + '</text></g>';
}
kit.scene('nuovacarta', {
  init(kit) {
    const P = window.PZ, C = P.CARTA_COL;
    let s = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><linearGradient id="nc-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#262F60"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#nc-muro)"/>';
    // A · dai gettoni alle quote.
    s += '<g class="nc-A"><rect x="160" y="150" width="1600" height="640" rx="60" fill="#1E5A3A" opacity=".45"/>' +
      '<text class="nc-cap" x="960" y="100" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="30" fill="#9BE7C4"></text>';
    NC_QU.forEach(q => {
      s += '<text x="' + q.x + '" y="230" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="38" fill="' + q.c + '">' + q.nome + '</text>' +
        '<g class="nc-g" transform="translate(' + q.x + ' 410)"><circle class="nc-c" r="52" stroke-width="7"/><circle class="nc-c2" r="40" fill="none" stroke="#FFFFFF" stroke-opacity=".6" stroke-width="2" stroke-dasharray="6 5"/>' +
        '<text class="nc-t" y="12" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="600" font-size="32" fill="#2E2A26"></text></g>';
    });
    let x0 = 360;
    NC_QU.forEach(q => { const w = 1200 * q.p / 100; s += '<g class="nc-seg"><rect x="' + x0 + '" y="630" width="' + w + '" height="80" fill="' + q.c + '"/><text x="' + (x0 + w / 2) + '" y="682" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="34" fill="#141A33">' + q.p + '%</text></g>'; x0 += w; });
    s += '<rect class="nc-bord" x="360" y="630" width="1200" height="80" rx="8" fill="none" stroke="#F4EEE2" stroke-width="4"/></g>';
    // B · il mescolamento delle carte.
    s += '<g class="nc-B"><rect y="880" width="1920" height="200" fill="#1B2244"/><rect x="160" y="130" width="1300" height="740" rx="60" fill="#1E5A3A" opacity=".45"/>' +
      '<rect x="230" y="40" width="1160" height="70" rx="14" fill="#0F2A2A" stroke="#C9973F" stroke-width="5"/>' +
      '<text class="nc-f1" x="810" y="87" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="27" fill="#9BE7C4">softmax → Al 0.1 · Mare 0.7 · Emma 0.2</text>' +
      '<text class="nc-f2" x="810" y="87" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="27" fill="#9BE7C4">nuova carta = 0.1·Al + 0.7·Mare + 0.2·Emma</text>';
    NC_CARTE.forEach((c, j) => {
      s += '<g class="nc-cc" transform="translate(' + c.x + ' 300) scale(.62) translate(-110 -150)">' + P.carta({ v: c.v, col: C[c.nome], titolo: c.nome, sotto: 'carta' }) + '</g>' +
        '<g transform="translate(' + c.x + ' 440)"><rect x="-50" y="-24" width="100" height="48" rx="24" fill="' + NC_QU[j].c + '"/><text y="10" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="28" fill="#141A33">' + NC_QU[j].p + '%</text></g>';
      for (let i = 0; i < 3; i++) s += '<g class="nc-v">' + ncPezzo(Math.round(c.v[i] * c.w * 1000) / 1000) + '</g>';
    });
    s += '<g class="nc-new"><g transform="scale(.8) translate(-110 -150)">' + P.carta({ v: NC_NEW, col: '#7A5CE0', titolo: 'Emma · nuova', sotto: 'mescolata', cls: 'ncn' }) + '</g></g>' +
      '<g class="nc-emma" style="transform-origin:1700px 880px"><ellipse class="nc-glow" cx="1700" cy="760" rx="120" ry="150" fill="#FFF4E0" opacity="0" filter="url(#pz-soft)"/><g transform="translate(1620 666) scale(.8)">' + P.emma(P.VESTITO.rosa, { dx: -4 }) + '</g></g></g>';
    // C · pietra fissa, quote del momento.
    s += '<g class="nc-C"><rect y="880" width="1920" height="200" fill="#1B2244"/>' +
      '<g transform="translate(560 470)"><rect x="-190" y="-150" width="380" height="300" rx="28" fill="#5B6B8C" stroke="#3E4A66" stroke-width="8"/>' +
      '<circle cx="-70" cy="-10" r="62" fill="#3E4A66" stroke="#2A3350" stroke-width="6"/><ellipse cx="-90" cy="-30" rx="20" ry="12" fill="#FFFFFF" opacity=".25"/>' +
      '<circle cx="80" cy="-10" r="62" fill="#3E4A66" stroke="#2A3350" stroke-width="6"/><ellipse cx="60" cy="-30" rx="20" ry="12" fill="#FFFFFF" opacity=".25"/>' +
      '<text y="230" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="#C8D0E6">le lenti: pietra</text>' +
      '<text y="280" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="30" fill="#8B93B8">uguali per ogni frase</text></g>' +
      '<g class="nc-luce" transform="translate(1360 470)"><ellipse rx="300" ry="190" fill="#FFD978" opacity=".18" filter="url(#pz-soft)"/>';
    NC_QU.forEach((q, j) => { s += '<g transform="translate(' + ((j - 1) * 170) + ' ' + (j === 1 ? -20 : 10) + ')"><circle class="nc-lp" r="' + (j === 1 ? 74 : 54) + '" fill="' + q.c + '"/><text y="12" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="34" fill="#141A33">' + q.p + '%</text></g>'; });
    s += '<text y="230" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="#FFD978">le quote: luce</text>' +
      '<text y="280" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="30" fill="#E9D7A6">nate adesso, da questa frase</text></g></g></svg>';
    kit.stage.append(kit.h('<div class="ground">' + s +
      P.sott('NARRATORE', 'I gettoni diventano quote, e la parte più grande va a Mare. Con quelle quote si mescolano le carte, e nasce una carta nuova.') +
      P.sott('ADA', 'Le lenti sono di pietra, sempre uguali. Le quote invece sono nate adesso.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.A = q('.nc-A'); this.B = q('.nc-B'); this.C = q('.nc-C');
    this.g = all('.nc-g'); this.c = all('.nc-c'); this.c2 = all('.nc-c2'); this.t = all('.nc-t'); this.seg = all('.nc-seg'); this.bord = q('.nc-bord'); this.cap = q('.nc-cap');
    this.v = all('.nc-v'); this.rows = all('.ncn-r'); this.nw = q('.nc-new'); this.cc = all('.nc-cc');
    this.f1 = q('.nc-f1'); this.f2 = q('.nc-f2'); this.emma = q('.nc-emma'); this.glow = q('.nc-glow');
    this.luce = q('.nc-luce'); this.lp = all('.nc-lp');
    this.sub = window.PZ.subs(kit, [[0.4, 11.4], [20.0, 26.6]]);
  },
  render(t) {
    const P = window.PZ;
    const ab = eio(seg(t, 5.8, 6.3)), bc = eio(seg(t, 19.0, 19.6));
    this.A.setAttribute('opacity', (1 - ab).toFixed(3));
    this.B.setAttribute('opacity', (ab * (1 - bc)).toFixed(3));
    this.C.setAttribute('opacity', bc.toFixed(3));
    // A: punteggio → e^punteggio → quote.
    const a = eio(seg(t, 1.4, 2.6));
    const ph = t < 2.0 ? 0 : (t < 3.6 ? 1 : 2);
    const dip = Math.min(1, Math.abs(t - 2.0) / 0.15, Math.abs(t - 3.6) / 0.15);
    NC_QU.forEach((q, i) => {
      const r = lerp(52, 34 * Math.sqrt(q.e) + 12, a);
      this.c[i].setAttribute('r', r.toFixed(1)); this.c2[i].setAttribute('r', (r - 12).toFixed(1));
      const neg = q.s < 0 ? 1 - a : 0;
      this.c[i].setAttribute('fill', P.mix('#F5C84C', '#8A90A8', neg)); this.c[i].setAttribute('stroke', P.mix('#C9973F', '#5B6B8C', neg));
      this.t[i].textContent = ph === 0 ? P.fmt(q.s) : ph === 1 ? q.e.toFixed(2) : q.p + '%';
      this.t[i].setAttribute('opacity', dip.toFixed(2));
      this.g[i].setAttribute('transform', 'translate(' + q.x + ' ' + (410 + 6 * Math.sin(t * 1.4 + i)).toFixed(1) + ')');
      this.seg[i].setAttribute('opacity', eo(seg(t, 4.0 + i * 0.25, 4.6 + i * 0.25)).toFixed(2));
    });
    this.bord.setAttribute('opacity', eo(seg(t, 3.9, 4.3)).toFixed(2));
    this.cap.textContent = ph === 0 ? 'tre gettoni' : ph === 1 ? 'e^gettone: le differenze si allargano' : 'softmax: quote che sommano a 100%';
    this.cap.setAttribute('opacity', dip.toFixed(2));
    // B: i pezzi di ogni carta (quota × valore) volano nella carta nuova.
    const app = eob(seg(t, 6.8, 7.3), 1.6), go = eio(seg(t, 12.6, 13.6));
    this.nw.setAttribute('transform', 'translate(' + lerp(NC_NX, 1680, go).toFixed(1) + ' ' + lerp(NC_NY, 640, go).toFixed(1) + ') scale(' + (app * (1 - 0.8 * go)).toFixed(3) + ')');
    this.nw.setAttribute('opacity', (1 - seg(t, 13.4, 13.7)).toFixed(2));
    NC_CARTE.forEach((c, j) => {
      for (let i = 0; i < 3; i++) {
        const el = this.v[j * 3 + i], t0 = 7.6 + i * 1.0 + j * 0.15, p = seg(t, t0, t0 + 0.8);
        const sx = c.x + 40, sy = 300 + (NC_RY[i] - 150) * 0.62, tx = NC_NX + 40, ty = NC_NY + (NC_RY[i] - 150) * 0.8;
        const x = lerp(sx, tx, eio(p)), y = lerp(sy, ty, eio(p)) - 70 * Math.sin(Math.PI * p);
        el.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (p <= 0 || p >= 1 ? 0 : 0.85).toFixed(2) + ')');
      }
      this.cc[j].setAttribute('opacity', lerp(1, 0.45 + 0.55 * c.w / 0.7, eio(seg(t, 7.0, 7.6))).toFixed(2));
    });
    this.rows.forEach((r, i) => r.setAttribute('opacity', eo(seg(t, 8.6 + i * 1.0, 9.0 + i * 1.0)).toFixed(2)));
    this.f1.setAttribute('opacity', (1 - eo(seg(t, 10.8, 11.2))).toFixed(2));
    this.f2.setAttribute('opacity', eo(seg(t, 11.2, 11.6)).toFixed(2));
    const hit = Math.sin(Math.PI * seg(t, 13.4, 14.2));
    this.glow.setAttribute('opacity', (0.5 * hit).toFixed(2));
    this.emma.style.transform = 'scale(' + (1 + 0.05 * hit + 0.01 * Math.sin(t * 2)) + ')';
    // C: le quote brillano, la pietra resta ferma.
    this.lp.forEach((c, i) => c.setAttribute('opacity', (0.75 + 0.25 * Math.sin(t * 3 + i * 1.3)).toFixed(2)));
    this.luce.setAttribute('transform', 'translate(1360 ' + (470 + 6 * Math.sin(t * 1.6)).toFixed(1) + ')');
    this.sub(t);
  },
});
