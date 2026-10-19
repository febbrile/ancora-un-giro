const { seg, eo, ei, eio, lerp } = kit;
// Ada infila le tre strisce nello Spezzaparole, una dopo l'altra: zac, zac per ognuna. Sulla pista aspettano tre trenini
// uguali, uno dietro l'altro: in cima alla salita, a metà salita, in stazione. I biglietti volano sui sedili e prendono
// vita: in tutti e tre Al, Mare ed Emma, rosa antico. Le sbarre si abbassano, i tre treni partono da soli, uno dietro
// l'altro, e spariscono nella montagna. Ada corre alla bancarella col quaderno stretto al petto.
// Si apre come finisce «case» (Ada con le tre strisce in fila); finisce sulla montagna (la riprende «finestre», dentro).
const TR_TRENI = [1080, 800, 490];
const TR_CAM = [
  { t: 0, cx: 522, cy: 806, z: 6.6 },
  { t: 1.2, cx: 556, cy: 784, z: 4.2 },
  { t: 5.0, cx: 556, cy: 784, z: 4.2 },
  { t: 7.4, cx: 330, cy: 640, z: 1.75 },
  { t: 9.6, cx: 330, cy: 640, z: 1.75 },
  { t: 11.0, cx: 236, cy: 800, z: 5.2 },
  { t: 12.8, cx: 236, cy: 800, z: 5.2 },
  { t: 14.6, cx: 560, cy: 600, z: 1.4 },
  { t: 19.0, cx: 860, cy: 560, z: 1.1 },
  { t: 22.4, cx: 1030, cy: 520, z: 1.3 },
];
// Le tre strisce: quando lasciano le mani di Ada, i due colpi di forbice, quando escono i tre biglietti.
const TR_STRISCE = [0.8, 2.4, 4.0].map(via => ({ via, tagli: [via + 1.5, via + 1.85], uscite: [via + 2.1, via + 2.35, via + 2.6] }));
const TR_VOLO = 1.3, TR_VITA = 0.25;
const TR_SBARRE = [11.8, 12.8];
// La partenza: la stessa velocità per i tre treni, uno dopo l'altro.
const TR_VEL = [[0, 0], [1.2, 90], [3.6, 170], [6.0, 300]];
const TR_PARTE = [13.2, 13.6, 14.0];
const TR_CORSA = [15.0, 18.0];
function trBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('treni', {
  init(kit) {
    const G = window.G, M = G.MONDO, P = G.MOD.mare.passeggeri;
    this.chi = [['al', P.Al.biglietto], ['mare', P.mare.biglietto], ['emma', P.Emma.biglietto]];
    this.parole = ['Al', 'mare', 'Emma'];
    let scintille = '';
    for (let i = 0; i < 9; i++) { scintille += '<g class="tr-scint" opacity="0">'; for (let k = 0; k < 8; k++) scintille += '<circle r="2.2" fill="' + G.C.luce + '"/>'; scintille += '</g>'; }
    const treni = [0, 1, 2].map(n => '<g class="tr-treno" data-n="' + n + '">' + G.treno(this.chi.map(x => ({ tipo: x[0], col: x[1] })), { sbarra: 0 }) + '</g>').join('');
    const sopra = treni + '<g class="tr-macchina"></g><g class="tr-ada"></g>' +
      '<clipPath id="g-tr-fessura"><rect x="0" y="-1000" width="1920" height="1754"/></clipPath>' +
      // Ogni striscia due volte: libera, finché sale verso la fessura; tagliata dalla fessura, mentre ci entra.
      [0, 1, 2].map(n => '<g class="tr-striscia" data-n="' + n + '"><g transform="translate(-150 -22)">' + G.striscia('Al mare Emma', 300) + '</g></g>').join('') +
      '<g clip-path="url(#g-tr-fessura)">' + [0, 1, 2].map(n => '<g class="tr-striscia-c" data-n="' + n + '"><g transform="translate(-150 -22)">' + G.striscia('Al mare Emma', 300) + '</g></g>').join('') + '</g>' +
      [0, 1, 2].map(() => this.parole.map(p => '<g class="tr-big" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(p) + '</g></g>').join('')).join('') + scintille;
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'treni', manopola: 0,
      html: G.sottotitolo('NARRATORE', 'Lo Spezzaparole strappa le tre frasi, e i biglietti salgono su tre treni uguali.') +
        G.sottotitolo('NARRATORE', 'Partono da soli, uno dietro l’altro, e spariscono nella montagna.'),
    });
    this.G = G;
    this.treni = [0, 1, 2].map(n => this.m.qa('.tr-treno[data-n="' + n + '"] .g-vag'));
    this.pass = this.treni.map(v => v.map(x => x.querySelector('.g-pass')));
    this.ada = this.m.q('.tr-ada'); this.mac = this.m.q('.tr-macchina');
    this.str = this.m.qa('.tr-striscia'); this.strC = this.m.qa('.tr-striscia-c'); this.big = this.m.qa('.tr-big'); this.scint = this.m.qa('.tr-scint');
    // I treni fermi; i sedili, nel mondo, anche sulla salita.
    this.treni.forEach((v, n) => G.posaTreno(v, this.m.partenza, TR_TRENI[n]));
    const svg = this.m.cam.ownerSVGElement, base = this.m.cam.getCTM().inverse();
    this.sedili = this.treni.map(v => v.map(el => { const pt = svg.createSVGPoint(); pt.x = 138; pt.y = 42; const w = pt.matrixTransform(base.multiply(el.querySelector('.g-vag-in').getCTM())); return [w.x, w.y]; }));
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    this.fessura = [x0 + 100 * s, y0 + 60 * s]; this.bocca = [x0 + 100 * s, y0 + 213 * s];
    this.statoAda = ''; this.statoMac = '';
    this.sub = G.subs(kit, [[1.0, 8.4], [13.6, 19.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('03', 'treni', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(TR_CAM, t));
    G.animaMondo(m, t + 960);
    // Ada: dà le strisce alla biglietteria, guarda i passeggeri, poi corre alla bancarella.
    const u = eio(seg(t, TR_CORSA[0], TR_CORSA[1]));
    const x = lerp(M.ada[0], 672, u), y = lerp(M.ada[1], 896, u) - (u > 0 && u < 1 ? 6 * Math.abs(Math.sin(t * 9)) : 0);
    const posa = u > 0 ? 'quaderno' : 'base';
    const espr = t < 9 ? 'felice' : t < 13 ? 'sorpresa' : t < TR_CORSA[1] ? 'base' : 'pensa';
    if (posa + espr !== this.statoAda) { this.ada.innerHTML = '<g class="tr-ada-in">' + G.ada(posa, espr) + '</g>'; this.statoAda = posa + espr; }
    this.ada.firstChild.setAttribute('transform', G.posaAda(x, y));
    // Le strisce: in fila davanti ad Ada, poi una alla volta su nella fessura.
    const [fx, fy] = this.fessura;
    this.str.forEach((el, n) => {
      const a = TR_STRISCE[n].via, x0 = M.ada[0], y0 = 799 + 15 * n;
      const su = eio(seg(t, a, a + 1.0)), giu = eio(seg(t, a + 1.4, a + 2.2));
      const x = lerp(x0, fx, su), y = lerp(y0, fy - 22, su) + 26 * giu, rot = lerp(0, 90, eio(seg(t, a + 0.4, a + 0.9)));
      const sc = lerp(0.16, 0.123, su);
      const tr = 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + rot.toFixed(1) + ') scale(' + sc.toFixed(3) + ')';
      el.setAttribute('transform', tr); this.strC[n].setAttribute('transform', tr);
      el.setAttribute('opacity', t < a + 1.2 ? 1 : 0);
      this.strC[n].setAttribute('opacity', t >= a + 1.2 && t < a + 2.4 ? 1 : 0);
    });
    // La biglietteria lavora tre volte: trema, gli aghi girano, la forbice scatta due volte, la bocca si accende.
    let lavora = 0, forbice = 0.6, bocca = 0;
    TR_STRISCE.forEach(s => {
      lavora = Math.max(lavora, seg(t, s.tagli[0] - 0.7, s.tagli[0] - 0.5) * (1 - seg(t, s.uscite[2] + 0.3, s.uscite[2] + 0.6)));
      s.tagli.forEach(a => { forbice = Math.min(forbice, Math.min(0.6, 0.6 * Math.abs((t - a) / 0.15))); });
      bocca = Math.max(bocca, ...s.uscite.map(a => 1 - Math.abs(t - a) / 0.25));
    });
    const trema = lavora * 1.2 * Math.sin(t * 40), aghi = lavora * 70 * Math.sin(t * 5);
    const km = forbice.toFixed(2) + '|' + Math.round(aghi) + '|' + bocca.toFixed(2);
    const tr = 'translate(' + trema.toFixed(2) + ' 0) ' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300);
    if (km !== this.statoMac) { this.mac.innerHTML = '<g transform="' + tr + '">' + G.spezzaparole({ forbice, aghi, bocca }) + '</g>'; this.statoMac = km; }
    else if (this.mac.firstChild) this.mac.firstChild.setAttribute('transform', tr);
    // I biglietti escono dalla bocca e volano sui sedili del loro treno; poi i passeggeri prendono vita.
    this.big.forEach((b, k) => {
      const n = Math.floor(k / 3), i = k % 3, a = TR_STRISCE[n].uscite[i], vita = a + TR_VOLO + TR_VITA;
      const uu = eio(seg(t, a, a + TR_VOLO));
      const [bx, by] = this.bocca, [sx, sy] = this.sedili[n][i];
      const x = lerp(bx, sx, uu), y = lerp(by, sy - 8, uu) - [140, 90, 50][n] * Math.sin(Math.PI * uu);
      const nasce = seg(t, vita - 0.15, vita + 0.25);
      b.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + (-8 * uu).toFixed(1) + ') scale(' + (0.26 * (1 - 0.5 * nasce)).toFixed(3) + ')');
      b.setAttribute('opacity', t < a ? 0 : (1 - nasce).toFixed(3));
      const v = eo(seg(t, vita, vita + 0.6));
      const p = this.pass[n][i];
      p.setAttribute('opacity', v.toFixed(3));
      p.setAttribute('transform', 'translate(140 40) scale(' + lerp(0.5, 1, v).toFixed(3) + ') translate(-140 -40)');
      const sc = seg(t, vita, vita + 1.1);
      this.scint[k].setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
      [...this.scint[k].children].forEach((c, j) => { const an = j * Math.PI / 4 + 0.3, d = 6 + 22 * eo(sc); c.setAttribute('cx', (sx + d * Math.cos(an)).toFixed(2)); c.setAttribute('cy', (sy - 14 + d * Math.sin(an)).toFixed(2)); });
    });
    // Le sbarre si abbassano; i tre treni partono da soli, uno dietro l'altro, e spariscono nella montagna.
    G.sbarre(this.treni.flat(), i => eio(seg(t, TR_SBARRE[0] + i * 0.08, TR_SBARRE[1] + i * 0.08)));
    this.treni.forEach((v, n) => {
      const s = TR_TRENI[n] + G.percorso(t - TR_PARTE[n], 0, TR_VEL);
      G.posaTreno(v, m.partenza, s);
      G.nascondiInMontagna(v, m.partenza, s, { fine: true });
    });
    this.sub(t);
  },
});
