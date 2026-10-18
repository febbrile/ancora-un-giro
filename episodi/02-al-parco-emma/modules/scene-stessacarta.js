const { seg, eo, eio, eob, lerp } = kit;
// 2.2 · La stessa carta: lo stesso cassetto di ieri, la stessa carta, IDENTICA. Poi il monitor con i punti delle parole.
const SC_X = [660, 960, 1260];
const SC_CASS = [[4, 1], [5, 3], [8, 2]];
const SC_NUM = ['1204', '15530', '22741'];
const SC_T = [1.0, 1.4, 1.8];
const SC_V = [[-0.14, 0.14, 0.15], [0.43, 0.59, 0.33], [0.55, 0.07, -0.58]];
const SC_TIT = ['Al', 'Parco', 'Emma'];
const SC_PT = [
  { nome: 'Al', v: [-0.14, 0.14, 0.15], c: '#17B3B3', dx: -60, dy: 70 },
  { nome: 'mare', v: [-0.35, 0.61, -0.40], c: '#8787FE', dx: -190, dy: 30 },
  { nome: 'parco', v: [0.43, 0.59, 0.33], c: '#87FE87', dx: 22, dy: -24 },
  { nome: 'Emma', v: [0.55, 0.07, -0.58], c: '#E3A58E', dx: 26, dy: 10 },
];
function scCass(c, r) { return [40 + c * 142, 56 + r * 90]; }
function scProj(v, a) { const S = 330, cx = 600, cy = 460, c = Math.cos(a), s = Math.sin(a); return [cx + S * (v[0] * c - v[1] * s), cy - S * (v[2] * 0.95 + (v[0] * s + v[1] * c) * 0.33)]; }
function scVec(P, v, fs) {
  let g = '';
  v.forEach((x, i) => { const ox = i * fs * 5.4; g += P.seme(i, ox, -fs * 0.35, fs / 28, true) + '<text x="' + (ox + fs * 0.75) + '" y="0" font-family="JetBrains Mono, monospace" font-size="' + fs + '" fill="#9BE7C4">' + P.fmt(x) + '</text>'; });
  return g;
}
kit.scene('stessacarta', {
  init(kit) {
    const P = window.PZ;
    const rnd = kit.rng(5);
    // A · l'armadio e il confronto con la carta di ieri.
    let a = '<g class="sc-a"><defs><linearGradient id="sc-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#222B57"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#sc-muro)"/><rect x="0" y="780" width="1920" height="300" fill="#1B2244"/><path d="M0 780 L1920 780" stroke="#2A3466" stroke-width="4"/>';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 13; c++) {
      const [x, y] = scCass(c, r);
      const k = SC_CASS.findIndex(v => v[0] === c && v[1] === r);
      a += '<g class="' + (k >= 0 ? 'sc-c' + k : '') + '" style="transform-origin:' + (x + 55) + 'px ' + (y + 40) + 'px"><rect x="' + x + '" y="' + y + '" width="110" height="76" rx="8" fill="#5B6B8C" stroke="#3E4A66" stroke-width="3"/>' +
        '<rect x="' + (x + 38) + '" y="' + (y + 50) + '" width="34" height="8" rx="4" fill="#3E4A66"/><text x="' + (x + 55) + '" y="' + (y + 32) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="17" fill="#C8D0E6">' + (k >= 0 ? SC_NUM[k] : String(10000 + Math.floor(rnd() * 89999))) + '</text></g>';
    }
    SC_X.forEach((x, j) => {
      const pers = j === 0 ? '<g transform="translate(' + (x - 110) + ' 597) scale(1.1)">' + P.al() + '</g>' : j === 1 ? '<g transform="translate(' + (x - 110) + ' 570) scale(1.1)">' + P.parco() + '</g>' : '<g class="sc-emma" transform="translate(' + (x - 85) + ' 552) scale(.85)">' + P.emma('#C9C2D6') + '</g>';
      a += '<g class="sc-pers" style="transform-origin:' + x + 'px 780px">' + pers + '</g><g class="sc-carta">' + P.carta({ v: SC_V[j], col: P.CARTA_COL[SC_TIT[j]], titolo: SC_TIT[j] }) + '</g>';
    });
    a += '<rect class="sc-velo" width="1920" height="1080" fill="#070912" opacity="0"/>' +
      '<g class="sc-ieri"><g transform="translate(-110 -150)">' + P.carta({ v: SC_V[2], col: P.CARTA_COL.Emma, titolo: 'Emma', sotto: 'ieri' }) + '</g><circle cx="0" cy="-160" r="12" fill="#E8743B"/></g>' +
      '<g class="sc-oggi"><g transform="translate(-110 -150)">' + P.carta({ v: SC_V[2], col: P.CARTA_COL.Emma, titolo: 'Emma', sotto: 'oggi' }) + '</g></g>' +
      '<ellipse class="sc-luce" cx="960" cy="480" rx="260" ry="320" fill="#FFF4E0" opacity="0" filter="url(#pz-soft)"/>' +
      '<g class="sc-timbro"><g transform="rotate(-7)"><rect x="-190" y="-44" width="380" height="88" rx="12" fill="#0F2A2A" stroke="#E8743B" stroke-width="7"/>' +
      '<text x="0" y="17" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="48" letter-spacing="4" fill="#E8743B">IDENTICA</text></g></g></g>';
    // B · il monitor di Ada.
    let ax = '';
    for (let i = 0; i < 3; i++) ax += '<line class="sc-asse" stroke="#2F6F73" stroke-width="3"/><g class="sc-et"><circle r="20" fill="#E6FFF4"/>' + P.seme(i, 0, 0, 0.8) + '</g>';
    let pts = '';
    SC_PT.forEach(k => {
      pts += '<g class="sc-pt"><line class="sc-gui" stroke="' + k.c + '" stroke-width="1.5" stroke-dasharray="4 6" opacity=".6"/><circle class="sc-dot" r="12" fill="' + k.c + '"/>' +
        '<g class="sc-lab"><text font-family="Fredoka, sans-serif" font-weight="600" font-size="28" fill="' + k.c + '">' + k.nome + '</text><g transform="translate(0 30)">' + scVec(P, k.v, 19) + '</g></g></g>';
    });
    const b = '<g class="sc-b"><rect width="1920" height="1080" fill="#F3EADB"/><rect x="0" y="840" width="1920" height="240" fill="#A9744F"/><rect x="0" y="820" width="1920" height="30" fill="#8A5A3C"/>' +
      '<rect x="100" y="50" width="1160" height="760" rx="22" fill="#0F2A2A" stroke="#C9973F" stroke-width="10"/>' +
      '<text x="140" y="104" font-family="JetBrains Mono, monospace" font-size="20" letter-spacing="1.5" fill="#5FB89A">MONITOR DI ADA · OGNI PAROLA HA IL SUO PUNTO</text>' +
      ax + pts + '<circle class="sc-alone" r="30" fill="none" stroke="#87FE87" stroke-width="4"/>' +
      '<text class="sc-m1" x="140" y="722" font-family="JetBrains Mono, monospace" font-size="26" fill="#E6FFF4">Embedding: uguale in ogni frase</text>' +
      '<g class="sc-m2" transform="translate(140 770)"><text font-family="JetBrains Mono, monospace" font-size="26" fill="#E6FFF4">Emma →</text><g transform="translate(130 0)">' + scVec(P, SC_V[2], 26) + '</g></g>' +
      '<g class="sc-ada" style="transform-origin:1560px 840px"><g transform="translate(1400 300) scale(1.6)">' + P.ada('quaderno', 'felice') + '</g></g></g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + P.defs + a + b + '</svg>' +
      P.sott('NARRATORE', 'Emma aprì lo stesso cassetto di ieri, e ricevette la stessa carta. Identica.') +
      P.sott('ADA', 'L’armadio non sa ancora dove si trova Emma. Lo scoprirà solo guardando i compagni.') + '</div>'));
    const all = s => [...kit.stage.querySelectorAll(s)], q = s => kit.stage.querySelector(s);
    this.A = q('.sc-a'); this.B = q('.sc-b');
    this.cass = [0, 1, 2].map(k => q('.sc-c' + k)); this.carte = all('.sc-carta'); this.pers = all('.sc-pers').map(e => e.style);
    this.vest = q('.sc-emma').firstElementChild;
    this.velo = q('.sc-velo'); this.ieri = q('.sc-ieri'); this.oggi = q('.sc-oggi'); this.luce = q('.sc-luce'); this.timbro = q('.sc-timbro');
    this.assi = all('.sc-asse'); this.et = all('.sc-et');
    this.pt = all('.sc-pt').map((g, i) => ({ g, k: SC_PT[i], gui: g.querySelector('.sc-gui'), dot: g.querySelector('.sc-dot'), lab: g.querySelector('.sc-lab') }));
    this.alone = q('.sc-alone'); this.m1 = q('.sc-m1'); this.m2 = q('.sc-m2'); this.ada = q('.sc-ada').style;
    this.sub = window.PZ.subs(kit, [[0.4, 7.4], [12.5, 20.0]]);
  },
  render(t) {
    const P = window.PZ;
    const bx = eio(seg(t, 11.0, 11.6));
    this.A.setAttribute('opacity', (1 - bx).toFixed(3));
    this.B.setAttribute('opacity', bx.toFixed(3));
    // A: i cassetti di ieri, le carte di ieri.
    SC_X.forEach((X, j) => {
      const t0 = SC_T[j], [cx, cy] = scCass(SC_CASS[j][0], SC_CASS[j][1]);
      const open = eob(seg(t, t0, t0 + 0.45), 1.6);
      this.cass[j].style.transform = 'translateY(' + (10 * open) + 'px) scale(' + (1 + 0.1 * open) + ')';
      const p = seg(t, t0 + 0.4, t0 + 1.3);
      const x = lerp(cx + 55, X, eio(p)), y = lerp(cy + 40, 478, eio(p)) - 90 * Math.sin(Math.PI * p);
      const vola = j === 2 ? eio(seg(t, 5.2, 6.2)) : 0;
      const sc = (p <= 0 ? 0 : lerp(0.2, 0.42, eo(p))) * (1 - vola);
      this.carte[j].setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + sc.toFixed(3) + ') translate(-110 -150)');
      this.pers[j].transform = 'scale(' + (1 + 0.06 * Math.sin(Math.PI * seg(t, t0 + 1.25, t0 + 1.7))) + ')';
    });
    this.vest.style.color = P.mix('#C9C2D6', P.VESTITO.rosa, eo(seg(t, 3.0, 3.6)));
    // La carta di ieri e quella di oggi, una sopra l'altra.
    this.velo.setAttribute('opacity', (0.6 * eo(seg(t, 4.6, 5.2))).toFixed(2));
    const ia = eob(seg(t, 4.8, 5.6), 1.4), insieme = eio(seg(t, 6.6, 7.6));
    this.ieri.setAttribute('transform', 'translate(' + lerp(lerp(-300, 700, ia), 960, insieme).toFixed(1) + ' 480) rotate(' + lerp(-4, 0, insieme).toFixed(2) + ') scale(1.2)');
    const ob = eio(seg(t, 5.2, 6.2));
    this.oggi.setAttribute('transform', 'translate(' + lerp(lerp(1260, 1220, ob), 960, insieme).toFixed(1) + ' ' + lerp(478, 480, ob).toFixed(1) + ') rotate(' + lerp(4, 0, insieme).toFixed(2) + ') scale(' + (ob <= 0 ? 0 : lerp(0.42, 1.2, ob)).toFixed(3) + ')');
    this.oggi.setAttribute('opacity', (ob > 0 ? 1 - 0.45 * insieme : 0).toFixed(2));
    this.luce.setAttribute('opacity', (0.45 * Math.sin(Math.PI * seg(t, 7.4, 8.6))).toFixed(2));
    const st = seg(t, 8.0, 8.4);
    this.timbro.setAttribute('transform', 'translate(1260 300) scale(' + (st <= 0 ? 0 : lerp(1.2, 0.9, eob(st, 1.5))).toFixed(3) + ')');
    // B: il monitor con i punti delle parole.
    if (bx <= 0) { this.sub(t); return; }
    const a = 0.62 + 0.03 * (t - 11.0);
    const O = scProj([0, 0, 0], a), axp = eo(seg(t, 11.4, 12.2));
    [[1.1, 0, 0], [0, 1.1, 0], [0, 0, 0.9]].forEach((d, i) => {
      const e = scProj(d.map(x => x * axp), a), e2 = scProj(d.map(x => x * axp * 1.12), a);
      this.assi[i].setAttribute('x1', O[0]); this.assi[i].setAttribute('y1', O[1]); this.assi[i].setAttribute('x2', e[0].toFixed(1)); this.assi[i].setAttribute('y2', e[1].toFixed(1));
      this.et[i].setAttribute('transform', 'translate(' + e2[0].toFixed(1) + ' ' + e2[1].toFixed(1) + ')');
      this.et[i].setAttribute('opacity', axp.toFixed(2));
    });
    let PK = null;
    this.pt.forEach((T, i) => {
      const p = scProj(T.k.v, a), b0 = scProj([T.k.v[0], T.k.v[1], 0], a);
      if (T.k.nome === 'parco') PK = p;
      const s = seg(t, 12.0 + i * 0.3, 12.5 + i * 0.3);
      T.g.setAttribute('opacity', s > 0 ? (T.k.nome === 'mare' ? 0.55 : 1) : 0);
      T.dot.setAttribute('cx', p[0].toFixed(1)); T.dot.setAttribute('cy', p[1].toFixed(1));
      T.dot.setAttribute('r', (12 * eob(s, 1.8)).toFixed(2));
      T.gui.setAttribute('x1', b0[0].toFixed(1)); T.gui.setAttribute('y1', b0[1].toFixed(1)); T.gui.setAttribute('x2', p[0].toFixed(1)); T.gui.setAttribute('y2', p[1].toFixed(1));
      T.lab.setAttribute('transform', 'translate(' + (p[0] + T.k.dx).toFixed(1) + ' ' + (p[1] + T.k.dy).toFixed(1) + ')');
      T.lab.setAttribute('opacity', eo(seg(t, 12.2 + i * 0.3, 12.7 + i * 0.3)).toFixed(2));
    });
    // «...guardando i compagni»: Parco si accende.
    const ring = seg(t, 17.2, 18.4);
    this.alone.setAttribute('cx', PK[0].toFixed(1)); this.alone.setAttribute('cy', PK[1].toFixed(1));
    this.alone.setAttribute('r', (16 + 50 * eo(ring)).toFixed(1));
    this.alone.setAttribute('opacity', ring > 0 && ring < 1 ? (1 - ring).toFixed(2) : 0);
    this.m1.setAttribute('opacity', eo(seg(t, 20.4, 21.0)).toFixed(2));
    this.m2.setAttribute('opacity', eo(seg(t, 21.2, 21.8)).toFixed(2));
    this.ada.transform = 'scale(' + (1 + 0.012 * Math.sin(t * 2 * Math.PI / 3.2)) + ')';
    this.sub(t);
  },
});
