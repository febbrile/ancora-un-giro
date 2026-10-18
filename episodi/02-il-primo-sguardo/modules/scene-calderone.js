const { seg, eo, ei, eio, eob, lerp } = kit;
const NC = [
  { x: 480, nome: 'Al', col: '#139A9A', v: [0.10, 0.10, -0.20], w: 0.1, q: '10%', qc: '#17B3B3' },
  { x: 960, nome: 'Mare', col: '#6E6EE6', v: [0.80, 0.05, 0.05], w: 0.7, q: '70%', qc: '#8787FE' },
  { x: 1440, nome: 'Emma', col: '#E0475B', v: [0.05, 0.05, 0.80], w: 0.2, q: '20%', qc: '#FE8787' },
];
const NC_NEW = [0.58, 0.06, 0.18];
const NC_RY = [92, 162, 232];
function ncVal(v) {
  return '<g><rect x="-46" y="-20" width="92" height="40" rx="9" fill="#FFFDF6" stroke="#C8B48F" stroke-width="2"/><text y="9" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="600" font-size="22" fill="' + (v < 0 ? '#B8332E' : '#2E2A26') + '">' + window.PZ.fmt(v) + '</text></g>';
}
kit.scene('calderone', {
  init(kit) {
    const P = window.PZ;
    let s = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><linearGradient id="nc-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#262F60"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#nc-muro)"/><rect y="860" width="1920" height="220" fill="#1B2244"/><rect x="160" y="130" width="1300" height="720" rx="60" fill="#1E5A3A" opacity=".45"/>' +
      '<text class="nc-form" x="810" y="90" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="28" fill="#9BE7C4">0.1·Al + 0.7·Mare + 0.2·Emma = [0.58, 0.06, 0.18]</text>';
    NC.forEach((c, j) => {
      s += '<g class="nc-c" transform="translate(' + (c.x * 0.86) + ' 300) scale(.62) translate(-110 -150)">' + P.carta({ v: c.v, col: c.col, titolo: c.nome, sotto: 'carta' }) + '</g>' +
        '<g transform="translate(' + (c.x * 0.86) + ' 440)"><rect x="-50" y="-24" width="100" height="48" rx="24" fill="' + c.qc + '"/><text y="10" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="28" fill="#141A33">' + c.q + '</text></g>';
      for (let i = 0; i < 3; i++) s += '<g class="nc-v">' + ncVal(Math.round(c.v[i] * c.w * 100) / 100) + '</g>';
    });
    s += '<g class="nc-new"><g class="nc-newin" transform="scale(.8) translate(-110 -150)">' + P.carta({ v: NC_NEW, col: '#7A5CE0', titolo: 'Emma · nuova', sotto: 'il raccolto', cls: 'nc' }) + '</g></g>' +
      '<g class="nc-emma" style="transform-origin:1700px 860px"><g transform="translate(1620 646) scale(.8)">' + P.emma('#FE8787', { dx: -4 }) + '</g></g></svg>';
    kit.stage.append(kit.h('<div class="ground">' + s +
      P.sott('NARRATORE', 'Poi Emma prende un po’ della carta di tutti: tanto di Mare, poco di Al, un po’ di sé stessa. Ne esce una carta nuova, e il suo vestito cambia colore.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.v = all('.nc-v'); this.rows = all('.nc-r'); this.nw = q('.nc-new'); this.emma = q('.nc-emma'); this.vest = this.emma.firstElementChild.firstElementChild;
    this.form = q('.nc-form'); this.cards = all('.nc-c');
    this.sub = window.PZ.subs(kit, [[0.4, 10.6]]);
  },
  render(t) {
    const P = window.PZ;
    const nx = 960 * 0.86, ny = 690;
    const app = eob(seg(t, 2.4, 2.9), 1.6), go = eio(seg(t, 7.0, 8.0));
    this.nw.setAttribute('transform', 'translate(' + lerp(nx, 1660, go).toFixed(1) + ' ' + lerp(ny, 600, go).toFixed(1) + ') scale(' + (app * (1 - 0.8 * go)).toFixed(3) + ')');
    this.nw.setAttribute('opacity', (1 - seg(t, 7.8, 8.1)).toFixed(2));
    NC.forEach((c, j) => {
      for (let i = 0; i < 3; i++) {
        const el = this.v[j * 3 + i], t0 = 3.0 + i * 1.2 + j * 0.12, p = seg(t, t0, t0 + 0.8);
        const sx = c.x * 0.86 + 40, sy = 300 + (NC_RY[i] - 150) * 0.62, tx = nx + 40, ty = ny + (NC_RY[i] - 150) * 0.8;
        const x = lerp(sx, tx, eio(p)), y = lerp(sy, ty, eio(p)) - 70 * Math.sin(Math.PI * p);
        el.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (p <= 0 || p >= 1 ? 0 : 0.8).toFixed(2) + ')');
      }
    });
    this.rows.forEach((r, i) => r.setAttribute('opacity', eo(seg(t, 3.75 + i * 1.2, 4.1 + i * 1.2)).toFixed(2)));
    this.cards.forEach((c, j) => c.setAttribute('opacity', lerp(1, 0.45 + 0.55 * NC[j].w / 0.7, eio(seg(t, 2.0, 2.6))).toFixed(2)));
    this.form.setAttribute('opacity', eo(seg(t, 6.4, 6.9)).toFixed(2));
    this.vest.style.color = P.mix('#FE8787', '#A48BF9', eio(seg(t, 7.7, 8.5)));
    this.emma.style.transform = 'scale(' + (1 + 0.05 * Math.sin(Math.PI * seg(t, 7.7, 8.3)) + 0.01 * Math.sin(t * 2)) + ')';
    this.sub(t);
  },
});
