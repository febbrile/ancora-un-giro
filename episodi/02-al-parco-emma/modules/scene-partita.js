const { seg, eo, ei, eio, eob, lerp } = kit;
// 2.4 · La partita con Parco: la stessa lanterna, il cartello di Parco, lo stesso gettone di ieri.
// Poi le quote, uguali a ieri, ma nel mescolamento c'è Parco: la nuova carta è diversa.
const PP_Q = [0.90, 0.20, -0.50], PP_K = [0.55, 1.25, -1.20], PP_P = [0.50, 0.25, 0.60], PP_TC = [4.2, 5.8, 7.4];
const PP_Y = [92, 162, 232].map(y => 400 + (y - 150) * 1.35);
const PP_F = ['q · k = 0.50', 'q · k = 0.50 + 0.25', 'q · k = 0.50 + 0.25 + 0.60', 'q · k = 0.50 + 0.25 + 0.60 = 1.35'];
const PP_CARTE = [
  { x: 413, nome: 'Al', v: [-0.14, 0.14, 0.15], w: 0.1, q: 10, c: '#17B3B3' },
  { x: 826, nome: 'Parco', v: [0.43, 0.59, 0.33], w: 0.7, q: 70, c: '#87FE87' },
  { x: 1238, nome: 'Emma', v: [0.55, 0.07, -0.58], w: 0.2, q: 20, c: '#E3A58E' },
];
const PP_NEW = [0.40, 0.44, 0.13], PP_IERI = [-0.15, 0.46, -0.38], PP_RY = [92, 162, 232], PP_NX = 826, PP_NY = 700;
function ppVal(v) {
  return '<g><rect x="-52" y="-24" width="104" height="48" rx="10" fill="#FFFDF6" stroke="#C8B48F" stroke-width="3"/><text y="10" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="600" font-size="26" fill="' + (v < 0 ? '#B8332E' : '#2E2A26') + '">' + window.PZ.fmt(v) + '</text></g>';
}
function ppPezzo(v) {
  const t = (v < 0 ? '−' : '') + Math.abs(v).toFixed(3);
  return '<g><rect x="-50" y="-19" width="100" height="38" rx="9" fill="#FFFDF6" stroke="#C8B48F" stroke-width="2"/><text y="8" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="600" font-size="20" fill="' + (v < 0 ? '#B8332E' : '#2E2A26') + '">' + t + '</text></g>';
}
kit.scene('partita', {
  init(kit) {
    const P = window.PZ, C = P.CARTA_COL;
    let s = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><linearGradient id="pp-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#262F60"/></linearGradient></defs><rect width="1920" height="1080" fill="url(#pp-muro)"/>';
    // B · la partita.
    s += '<g class="pp-B"><ellipse cx="960" cy="560" rx="900" ry="330" fill="#1E5A3A" opacity=".55"/><ellipse cx="960" cy="560" rx="900" ry="330" fill="none" stroke="#8A5A3C" stroke-width="14"/>' +
      '<rect x="560" y="34" width="900" height="84" rx="14" fill="#0F2A2A" stroke="#C9973F" stroke-width="5"/>' +
      '<text class="pp-form" x="1010" y="88" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="34" fill="#9BE7C4"></text>' +
      '<g class="pp-cq">' + P.carta({ v: PP_Q, col: C.Emma, titolo: 'Emma', sotto: 'la lanterna di ieri' }) + '</g>' +
      '<g class="pp-ck">' + P.carta({ v: PP_K, col: C.Parco, titolo: 'Parco', sotto: 'cartello · key' }) + '</g>';
    PP_Y.forEach(y => { s += '<rect class="pp-hl" x="318" y="' + (y - 40) + '" width="304" height="80" rx="14" fill="none" stroke="#FFD978" stroke-width="6"/><rect class="pp-hl" x="1298" y="' + (y - 40) + '" width="304" height="80" rx="14" fill="none" stroke="#FFD978" stroke-width="6"/>'; });
    PP_Y.forEach((y, i) => {
      s += '<g class="pp-vq">' + ppVal(PP_Q[i]) + '</g><g class="pp-vk">' + ppVal(PP_K[i]) + '</g>' +
        '<text class="pp-x" x="960" y="' + (y + 14) + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="44" fill="#FFD978">×</text><g class="pp-p">' + P.pill(PP_P[i]) + '</g>';
    });
    s += '<g class="pp-g">' + P.gettone(1.35) + '</g>' +
      '<g class="pp-ieri">' + P.gettone(1.35) + '<text y="88" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="26" fill="#C8CEE8">ieri, con Mare</text></g>' +
      '<text class="pp-ug" x="1070" y="752" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="54" fill="#FFD978">=</text></g>';
    // C · il mescolamento: quote uguali, carte diverse.
    s += '<g class="pp-C"><rect y="880" width="1920" height="200" fill="#1B2244"/><rect x="160" y="130" width="1300" height="740" rx="60" fill="#1E5A3A" opacity=".45"/>' +
      '<g class="pp-f2"><rect x="230" y="40" width="1160" height="70" rx="14" fill="#0F2A2A" stroke="#C9973F" stroke-width="5"/>' +
      '<text x="810" y="87" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="27" fill="#9BE7C4">nuova carta = 0.1·Al + 0.7·Parco + 0.2·Emma</text></g>';
    PP_CARTE.forEach(c => {
      s += '<g class="pp-cc" transform="translate(' + c.x + ' 300) scale(.62) translate(-110 -150)">' + P.carta({ v: c.v, col: C[c.nome], titolo: c.nome, sotto: 'carta' }) + '</g>' +
        '<g transform="translate(' + c.x + ' 440)"><rect x="-50" y="-24" width="100" height="48" rx="24" fill="' + c.c + '"/><text y="10" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="28" fill="#141A33">' + c.q + '%</text></g>';
      for (let i = 0; i < 3; i++) s += '<g class="pp-v">' + ppPezzo(Math.round(c.v[i] * c.w * 1000) / 1000) + '</g>';
    });
    s += '<g class="pp-new"><g transform="scale(.8) translate(-110 -150)">' + P.carta({ v: PP_NEW, col: '#2E9E4F', titolo: 'Emma · oggi', sotto: 'con Parco', cls: 'ppn' }) + '</g></g>' +
      '<g class="pp-vec"><g transform="scale(.62) translate(-110 -150)">' + P.carta({ v: PP_IERI, col: '#7A5CE0', titolo: 'Emma · ieri', sotto: 'con Mare' }) + '</g></g>' +
      '<g class="pp-emma" style="transform-origin:1700px 880px"><g transform="translate(1620 666) scale(.8)">' + P.emma(P.VESTITO.rosa, { dx: -4 }) + '</g></g></g></svg>';
    kit.stage.append(kit.h('<div class="ground">' + s +
      P.sott('NARRATORE', 'Al primo piano, Emma alzò la stessa lanterna di ieri. Ma questa volta, davanti, c’era il cartello di Parco.') +
      P.sott('ADA', 'Stesso gettone di ieri: uno virgola trentacinque. Ma nelle carte da mescolare c’è Parco al posto di Mare.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.B = q('.pp-B'); this.C = q('.pp-C');
    this.cq = q('.pp-cq'); this.ck = q('.pp-ck'); this.hl = all('.pp-hl'); this.vq = all('.pp-vq'); this.vk = all('.pp-vk'); this.x = all('.pp-x'); this.p = all('.pp-p');
    this.g = q('.pp-g'); this.ieri = q('.pp-ieri'); this.ug = q('.pp-ug'); this.form = q('.pp-form');
    this.v = all('.pp-v'); this.cc = all('.pp-cc'); this.rows = all('.ppn-r'); this.nw = q('.pp-new'); this.vec = q('.pp-vec'); this.f2 = q('.pp-f2');
    this.sub = window.PZ.subs(kit, [[0.4, 9.8], [12.4, 21.6]]);
  },
  render(t) {
    const bc = eio(seg(t, 17.2, 17.8));
    this.B.setAttribute('opacity', (1 - bc).toFixed(3)); this.C.setAttribute('opacity', bc.toFixed(3));
    const a = eob(seg(t, 0.4, 1.1), 1.4), b = eob(seg(t, 1.1, 1.8), 1.4);
    this.cq.setAttribute('transform', 'translate(' + lerp(-200, 470, a).toFixed(1) + ' 400) rotate(' + lerp(-14, -2, a).toFixed(2) + ') scale(1.35) translate(-110 -150)');
    this.ck.setAttribute('transform', 'translate(' + lerp(2120, 1450, b).toFixed(1) + ' 400) rotate(' + lerp(14, 2, b).toFixed(2) + ') scale(1.35) translate(-110 -150)');
    PP_Y.forEach((y, i) => {
      const tc = PP_TC[i], h = seg(t, tc - 1.0, tc - 0.7) * (1 - seg(t, tc + 0.6, tc + 1.0));
      this.hl[i * 2].setAttribute('opacity', h.toFixed(2)); this.hl[i * 2 + 1].setAttribute('opacity', h.toFixed(2));
      const m = eio(seg(t, tc - 0.8, tc)), gone = seg(t, tc, tc + 0.15);
      this.vq[i].setAttribute('transform', 'translate(' + lerp(560, 880, m).toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (m <= 0 ? 0 : (1 - gone)).toFixed(3) + ')');
      this.vk[i].setAttribute('transform', 'translate(' + lerp(1360, 1040, m).toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (m <= 0 ? 0 : (1 - gone)).toFixed(3) + ')');
      this.x[i].setAttribute('opacity', (m > 0.2 && gone < 1 ? 1 : 0));
      const sp = seg(t, tc, tc + 0.4), fly = seg(t, 9.0 + i * 0.2, 9.6 + i * 0.2);
      this.p[i].setAttribute('transform', 'translate(960 ' + lerp(y, 740, eio(fly)).toFixed(1) + ') scale(' + (sp <= 0 || fly >= 1 ? 0 : eob(sp, 1.7) * (1 - 0.5 * fly)).toFixed(3) + ')');
    });
    const g = seg(t, 9.9, 10.4), gx = lerp(960, 860, eio(seg(t, 11.0, 11.8)));
    this.g.setAttribute('transform', 'translate(' + gx.toFixed(1) + ' 740) scale(' + (g <= 0 ? 0 : 1.3 * eob(g, 1.8)).toFixed(3) + ')');
    const ie = eob(seg(t, 11.0, 11.8), 1.4);
    this.ieri.setAttribute('transform', 'translate(' + lerp(2100, 1280, ie).toFixed(1) + ' 740) scale(1.3)');
    this.ug.setAttribute('opacity', eo(seg(t, 11.8, 12.2)).toFixed(2));
    let f = -1; PP_TC.forEach((tc, i) => { if (t >= tc + 0.2) f = i; }); if (t >= 10.2) f = 3;
    this.form.textContent = f < 0 ? 'q · k = ?' : PP_F[f];
    // C: i pezzi delle carte volano nella carta nuova.
    const app = eob(seg(t, 18.0, 18.5), 1.6);
    this.nw.setAttribute('transform', 'translate(' + PP_NX + ' ' + PP_NY + ') scale(' + app.toFixed(3) + ')');
    PP_CARTE.forEach((c, j) => {
      for (let i = 0; i < 3; i++) {
        const el = this.v[j * 3 + i], t0 = 18.8 + i * 1.0 + j * 0.15, p = seg(t, t0, t0 + 0.8);
        const sx = c.x + 40, sy = 300 + (PP_RY[i] - 150) * 0.62, tx = PP_NX + 40, ty = PP_NY + (PP_RY[i] - 150) * 0.8;
        el.setAttribute('transform', 'translate(' + lerp(sx, tx, eio(p)).toFixed(1) + ' ' + (lerp(sy, ty, eio(p)) - 70 * Math.sin(Math.PI * p)).toFixed(1) + ') scale(' + (p <= 0 || p >= 1 ? 0 : 0.85).toFixed(2) + ')');
      }
      this.cc[j].setAttribute('opacity', lerp(1, 0.45 + 0.55 * c.w / 0.7, eio(seg(t, 18.2, 18.8))).toFixed(2));
    });
    this.rows.forEach((r, i) => r.setAttribute('opacity', eo(seg(t, 19.8 + i * 1.0, 20.2 + i * 1.0)).toFixed(2)));
    this.f2.setAttribute('opacity', eo(seg(t, 22.6, 23.2)).toFixed(2));
    // Ieri e oggi, una accanto all'altra: la nuova carta è diversa.
    const vv = eob(seg(t, 24.6, 25.4), 1.4);
    this.vec.setAttribute('transform', 'translate(' + lerp(1700, 1250, vv).toFixed(1) + ' 700) rotate(4) scale(' + vv.toFixed(3) + ')');
    this.vec.setAttribute('opacity', (0.85 * vv).toFixed(2));
    this.sub(t);
  },
});
