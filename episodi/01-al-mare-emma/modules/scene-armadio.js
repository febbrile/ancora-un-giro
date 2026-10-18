const { seg, eo, eio, eob, lerp } = kit;
// 1.3 · L'armadio: ognuno prende la sua carta e un numero sulla schiena; poi, sul monitor, ogni parola ha il suo punto.
const AR_X = [660, 960, 1260];
const AR_CASS = [[4, 1], [6, 0], [8, 2]];
const AR_NUM = ['1204', '8812', '22741'];
const AR_T = [5.0, 6.2, 7.4];
const AR_V = [[-0.14, 0.14, 0.15], [-0.35, 0.61, -0.40], [0.55, 0.07, -0.58]];
const AR_TIT = ['Al', 'Mare', 'Emma'];
const AR_PT = [
  { nome: 'Al', v: [-0.14, 0.14, 0.15], c: '#17B3B3', dx: -60, dy: 70 },
  { nome: 'mare', v: [-0.35, 0.61, -0.40], c: '#8787FE', dx: -190, dy: 30 },
  { nome: 'parco', v: [0.43, 0.59, 0.33], c: '#87FE87', dx: 22, dy: -24 },
  { nome: 'Emma', v: [0.55, 0.07, -0.58], c: '#E3A58E', dx: 26, dy: 10 },
];
function arCass(c, r) { return [40 + c * 142, 56 + r * 90]; }
function arProj(v, a) {
  const S = 330, cx = 600, cy = 460, c = Math.cos(a), s = Math.sin(a);
  return [cx + S * (v[0] * c - v[1] * s), cy - S * (v[2] * 0.95 + (v[0] * s + v[1] * c) * 0.33)];
}
// Un vettore come riga di semi e numeri, in SVG.
function arVec(P, v, fs) {
  let g = '';
  v.forEach((x, i) => { const ox = i * fs * 5.4; g += P.seme(i, ox, -fs * 0.35, fs / 28, true) + '<text x="' + (ox + fs * 0.75) + '" y="0" font-family="JetBrains Mono, monospace" font-size="' + fs + '" fill="#9BE7C4">' + P.fmt(x) + '</text>'; });
  return g;
}
kit.scene('armadio', {
  init(kit) {
    const P = window.PZ;
    const rnd = kit.rng(5);
    // Parte A: l'armadio.
    let a = '<g class="ar-a"><defs><linearGradient id="ar-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#222B57"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#ar-muro)"/><rect x="0" y="780" width="1920" height="300" fill="#1B2244"/><path d="M0 780 L1920 780" stroke="#2A3466" stroke-width="4"/>';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 13; c++) {
      const [x, y] = arCass(c, r);
      const k = AR_CASS.findIndex(v => v[0] === c && v[1] === r);
      const num = k >= 0 ? AR_NUM[k] : String(10000 + Math.floor(rnd() * 89999));
      a += '<g class="' + (k >= 0 ? 'ar-cass ar-c' + k : '') + '" style="transform-origin:' + (x + 55) + 'px ' + (y + 40) + 'px">' +
        '<rect x="' + x + '" y="' + y + '" width="110" height="76" rx="8" fill="#5B6B8C" stroke="#3E4A66" stroke-width="3"/>' +
        '<rect x="' + (x + 38) + '" y="' + (y + 50) + '" width="34" height="8" rx="4" fill="#3E4A66"/>' +
        '<text x="' + (x + 55) + '" y="' + (y + 32) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="17" fill="#C8D0E6">' + num + '</text></g>';
    }
    AR_X.forEach((x, j) => {
      let pers;
      if (j === 0) pers = '<g transform="translate(' + (x - 110) + ' 597) scale(1.1)">' + P.al() + '</g>';
      else if (j === 1) pers = '<g transform="translate(' + (x - 120) + ' 559) scale(1.2)">' + P.mare() + '</g>';
      else pers = '<g class="ar-fronte" transform="translate(' + (x - 85) + ' 552) scale(.85)">' + P.emma('#C9C2D6') + '</g><g class="ar-spalle" transform="translate(' + (x - 85) + ' 552) scale(.85)">' + P.emmaSpalle(P.VESTITO.rosa, 3) + '</g>' +
        '<path class="ar-ago" d="M0 0 L18 -6" stroke="#D9DDE6" stroke-width="3" stroke-linecap="round"/>';
      a += '<g class="ar-pers" style="transform-origin:' + x + 'px 780px">' + pers + '</g>' +
        '<g class="ar-carta">' + P.carta({ v: AR_V[j], col: P.CARTA_COL[AR_TIT[j]], titolo: AR_TIT[j] }) + '</g>';
      if (j < 2) a += '<g class="ar-badge"><circle r="17" fill="#F6E7C8" stroke="#2B2350" stroke-width="1.6" stroke-dasharray="3 2.5"/><text y="7" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="19" fill="#2B2350">' + (j + 1) + '</text></g>';
    });
    a += '</g>';
    // Parte B: il monitor di Ada.
    let ax = '';
    for (let i = 0; i < 3; i++) ax += '<line class="ar-asse" stroke="#2F6F73" stroke-width="3"/><g class="ar-et"><circle r="20" fill="#E6FFF4"/>' + P.seme(i, 0, 0, 0.8) + '</g>';
    let pts = '';
    AR_PT.forEach(k => {
      pts += '<g class="ar-pt"><line class="ar-gui" stroke="' + k.c + '" stroke-width="1.5" stroke-dasharray="4 6" opacity=".6"/>' +
        '<circle class="ar-dot" r="12" fill="' + k.c + '"/>' +
        '<g class="ar-lab"><text font-family="Fredoka, sans-serif" font-weight="600" font-size="28" fill="' + k.c + '">' + k.nome + '</text><g transform="translate(0 30)">' + arVec(P, k.v, 19) + '</g></g></g>';
    });
    const b = '<g class="ar-b"><rect width="1920" height="1080" fill="#F3EADB"/><rect x="0" y="840" width="1920" height="240" fill="#A9744F"/><rect x="0" y="820" width="1920" height="30" fill="#8A5A3C"/>' +
      '<rect x="100" y="50" width="1160" height="760" rx="22" fill="#0F2A2A" stroke="#C9973F" stroke-width="10"/>' +
      '<text x="140" y="104" font-family="JetBrains Mono, monospace" font-size="20" letter-spacing="1.5" fill="#5FB89A">MONITOR DI ADA · OGNI PAROLA HA IL SUO PUNTO</text>' +
      ax + pts + '<circle class="ar-alone" r="30" fill="none" stroke="#E3A58E" stroke-width="3"/>' +
      '<g class="ar-cartaE" transform="translate(1050 330) scale(.78) translate(-110 -150)">' + P.carta({ v: AR_V[2], col: P.CARTA_COL.Emma, titolo: 'Emma', cls: 'arE' }) + '</g>' +
      '<g class="ar-m1" transform="translate(140 722)"><text font-family="JetBrains Mono, monospace" font-size="26" fill="#E6FFF4">Embedding: Emma →</text><g transform="translate(300 0)">' + arVec(P, AR_V[2], 26) + '</g></g>' +
      '<text class="ar-m2" x="140" y="770" font-family="JetBrains Mono, monospace" font-size="26" fill="#E6FFF4">+ posizione 1, 2, 3</text>' +
      '<g class="ar-ada" style="transform-origin:1560px 840px"><g transform="translate(1400 300) scale(1.6)">' + P.ada('quaderno', 'felice') + '</g></g></g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + P.defs + a + b + '</svg>' +
      P.sott('NARRATORE', 'Nel pozzo c’è un grande armadio, con un cassetto per ogni parola. Ognuno prende la sua carta, sempre la stessa, in qualunque frase. E a ognuno si cuce un numero sulla schiena.') +
      P.sott('ADA', 'La carta di Emma ha tre righe. Non hanno un nome: le segno con i semi.') + '</div>'));
    const all = s => [...kit.stage.querySelectorAll(s)], q = s => kit.stage.querySelector(s);
    this.A = q('.ar-a'); this.B = q('.ar-b');
    this.cass = [0, 1, 2].map(k => q('.ar-c' + k));
    this.carte = all('.ar-carta'); this.pers = all('.ar-pers').map(e => e.style);
    this.fronte = q('.ar-fronte'); this.vest = this.fronte.firstElementChild;
    this.spalle = q('.ar-spalle'); this.ago = q('.ar-ago'); this.badge = all('.ar-badge');
    this.assi = all('.ar-asse'); this.et = all('.ar-et');
    this.pt = all('.ar-pt').map((g, i) => ({ g, k: AR_PT[i], gui: g.querySelector('.ar-gui'), dot: g.querySelector('.ar-dot'), lab: g.querySelector('.ar-lab') }));
    this.alone = q('.ar-alone'); this.cE = q('.ar-cartaE'); this.rE = all('.arE-r');
    this.m1 = q('.ar-m1'); this.m2 = q('.ar-m2'); this.ada = q('.ar-ada').style;
    this.sub = window.PZ.subs(kit, [[0.5, 15.8], [19.0, 26.2]]);
  },
  render(t) {
    const P = window.PZ;
    const bx = eio(seg(t, 16.2, 16.9));
    this.A.setAttribute('opacity', (1 - bx).toFixed(3));
    this.B.setAttribute('opacity', bx.toFixed(3));
    // A: i cassetti si aprono, le carte volano sopra i loro padroni.
    AR_X.forEach((X, j) => {
      const t0 = AR_T[j], [cx, cy] = arCass(AR_CASS[j][0], AR_CASS[j][1]);
      const open = eob(seg(t, t0, t0 + 0.45), 1.6);
      this.cass[j].style.transform = 'translateY(' + (10 * open) + 'px) scale(' + (1 + 0.1 * open) + ')';
      const p = seg(t, t0 + 0.4, t0 + 1.3);
      const x = lerp(cx + 55, X, eio(p)), y = lerp(cy + 40, 478, eio(p)) - 90 * Math.sin(Math.PI * p);
      const sc = p <= 0 ? 0 : lerp(0.2, 0.42, eo(p));
      this.carte[j].setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + (y + (p >= 1 ? 4 * Math.sin(t * 1.5 + j) : 0)).toFixed(1) + ') rotate(' + (2 * Math.sin(t * 1.1 + j)).toFixed(2) + ') scale(' + sc.toFixed(3) + ') translate(-110 -150)');
      const hit = Math.sin(Math.PI * seg(t, t0 + 1.25, t0 + 1.7));
      this.pers[j].transform = 'scale(' + (1 + 0.06 * hit + 0.01 * Math.sin(t * 2 + j)).toFixed(3) + ')';
      if (j < 2) {
        const pb = seg(t, 11.8 + j * 0.3, 12.2 + j * 0.3);
        this.badge[j].setAttribute('transform', 'translate(' + (X + 84) + ' 700) scale(' + eob(pb, 1.8).toFixed(3) + ')');
      }
    });
    this.vest.style.color = P.mix('#C9C2D6', P.VESTITO.rosa, eo(seg(t, 9.0, 9.6)));
    const back = eio(seg(t, 11.2, 11.7)) * (1 - eio(seg(t, 14.6, 15.1)));
    this.fronte.setAttribute('opacity', (1 - back).toFixed(3));
    this.spalle.setAttribute('opacity', back.toFixed(3));
    const st = seg(t, 12.0, 13.6), ang = st * Math.PI * 6;
    this.ago.setAttribute('transform', 'translate(' + (AR_X[2] + Math.cos(ang) * 16).toFixed(1) + ' ' + (703 + Math.sin(ang) * 16).toFixed(1) + ')');
    this.ago.setAttribute('opacity', st > 0 && st < 1 ? 1 : 0);
    // B: il monitor con i quattro punti.
    if (bx <= 0) { this.sub(t); return; }
    const tb = t - 16.5, a = 0.62 + 0.03 * tb;
    const O = arProj([0, 0, 0], a), axp = eo(seg(t, 16.8, 17.6));
    [[1.1, 0, 0], [0, 1.1, 0], [0, 0, 0.9]].forEach((d, i) => {
      const e = arProj(d.map(x => x * axp), a), e2 = arProj(d.map(x => x * axp * 1.12), a);
      this.assi[i].setAttribute('x1', O[0]); this.assi[i].setAttribute('y1', O[1]); this.assi[i].setAttribute('x2', e[0].toFixed(1)); this.assi[i].setAttribute('y2', e[1].toFixed(1));
      this.et[i].setAttribute('transform', 'translate(' + e2[0].toFixed(1) + ' ' + e2[1].toFixed(1) + ')');
      this.et[i].setAttribute('opacity', axp.toFixed(2));
    });
    let E = null;
    this.pt.forEach((T, i) => {
      const p = arProj(T.k.v, a), b0 = arProj([T.k.v[0], T.k.v[1], 0], a);
      if (T.k.nome === 'Emma') E = p;
      const s = seg(t, 17.6 + i * 0.4, 18.1 + i * 0.4);
      T.g.setAttribute('opacity', s > 0 ? (T.k.nome === 'Emma' ? 1 : lerp(1, 0.6, eio(seg(t, 19.0, 19.6)))).toFixed(2) : 0);
      T.dot.setAttribute('cx', p[0].toFixed(1)); T.dot.setAttribute('cy', p[1].toFixed(1));
      T.dot.setAttribute('r', (12 * eob(s, 1.8)).toFixed(2));
      T.gui.setAttribute('x1', b0[0].toFixed(1)); T.gui.setAttribute('y1', b0[1].toFixed(1)); T.gui.setAttribute('x2', p[0].toFixed(1)); T.gui.setAttribute('y2', p[1].toFixed(1));
      T.lab.setAttribute('transform', 'translate(' + (p[0] + T.k.dx).toFixed(1) + ' ' + (p[1] + T.k.dy).toFixed(1) + ')');
      T.lab.setAttribute('opacity', eo(seg(t, 17.8 + i * 0.4, 18.3 + i * 0.4)).toFixed(2));
    });
    const ring = seg(t, 19.2, 20.2);
    this.alone.setAttribute('cx', E[0].toFixed(1)); this.alone.setAttribute('cy', E[1].toFixed(1));
    this.alone.setAttribute('r', (16 + 46 * eo(ring)).toFixed(1));
    this.alone.setAttribute('opacity', ring > 0 && ring < 1 ? (1 - ring).toFixed(2) : 0);
    // La carta di Emma: tre righe, segnate con i semi.
    const ce = seg(t, 20.0, 20.6);
    this.cE.setAttribute('transform', 'translate(1060 ' + (330 + 4 * Math.sin(t * 1.4)).toFixed(1) + ') rotate(3) scale(' + (ce <= 0 ? 0 : 0.78 * eob(ce, 1.6)).toFixed(3) + ') translate(-110 -150)');
    this.rE.forEach((r, i) => { const k = Math.sin(Math.PI * seg(t, 23.0 + i * 0.5, 23.6 + i * 0.5)); r.setAttribute('transform', 'translate(110 ' + P.righeY(3)[i] + ') scale(' + (1 + 0.12 * k).toFixed(3) + ') translate(-110 ' + (-P.righeY(3)[i]) + ')'); });
    this.m1.setAttribute('opacity', eo(seg(t, 26.4, 27.0)).toFixed(2));
    this.m2.setAttribute('opacity', eo(seg(t, 27.4, 28.0)).toFixed(2));
    this.ada.transform = 'scale(' + (1 + 0.012 * Math.sin(t * 2 * Math.PI / 3.2)) + ')';
    this.sub(t);
  },
});
