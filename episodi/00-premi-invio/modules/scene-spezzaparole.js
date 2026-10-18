const { seg, eo, ei, eio, lerp } = kit;
// Ada infila la striscia nello Spezzaparole: due colpi di forbice, tre biglietti che escono dalla bocca e restano sospesi.
// Si apre sull'inquadratura con cui finisce «lunapark»; i biglietti restano dove li riprende «passeggeri».
const SP_CAM = [
  { t: 0, cx: 556, cy: 772, z: 3.6 },
  { t: 3.0, cx: 575, cy: 784, z: 4.4 },
  { t: 4.6, cx: 594, cy: 778, z: 6.2 },
  { t: 7.3, cx: 594, cy: 778, z: 6.2 },
  { t: 9.6, cx: 530, cy: 780, z: 4.2 },
  { t: 12.5, cx: 530, cy: 780, z: 4.2 },
  { t: 19.5, cx: 470, cy: 784, z: 3.8 },
];
const SP_TAGLI = [5.2, 6.0];
const SP_USCITE = [7.0, 7.8, 8.6];
// Dove restano sospesi i biglietti (mondo), e la loro scala.
const SP_SOSPESI = [[402, 770], [446, 756], [490, 770]];
const SP_SB = 0.3;
kit.scene('spezzaparole', {
  init(kit) {
    const G = window.G, M = G.MONDO;
    const parole = ['Al', 'mare', 'Emma'];
    const sopra = '<g class="sp-treno">' + G.treno([{ tipo: '' }, { tipo: '' }, { tipo: '' }], { sbarra: 0 }) + '</g>' +
      '<g class="sp-macchina"></g>' +
      '<g class="sp-ada"></g>' +
      '<clipPath id="g-sp-fessura"><rect x="0" y="-1000" width="1920" height="1754"/></clipPath>' +
      '<g clip-path="url(#g-sp-fessura)"><g class="sp-striscia"><g transform="translate(-150 -22)">' + G.striscia('Al mare Emma', 300) + '</g></g></g>' +
      parole.map((p, i) => '<g class="sp-big" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(p) + '</g></g>').join('');
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'spezzaparole',
      html: G.sottotitolo('NARRATORE', 'Prima, però, la frase passa dallo Spezzaparole: una vecchia biglietteria, con una grande forbice.'),
    });
    this.G = G;
    this.vag = this.m.qa('.sp-treno .g-vag'); this.ada = this.m.q('.sp-ada'); this.mac = this.m.q('.sp-macchina');
    this.str = this.m.q('.sp-striscia'); this.big = this.m.qa('.sp-big');
    // La fessura in cima alla macchina e la bocca, in coordinate del mondo.
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    this.fessura = [x0 + 100 * s, y0 + 60 * s];
    this.bocca = [x0 + 100 * s, y0 + 213 * s];
    this.statoAda = ''; this.statoMac = '';
    this.sub = G.subs(kit, [[0.6, 9.6]]);
  },
  render(t) {
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(SP_CAM, t));
    G.animaMondo(m, t + 66);
    G.posaTreno(this.vag, m.arrivo, m.arrivo.getTotalLength() - (M.fermo - 40));
    // Ada: tiene la striscia, la infila, poi guarda i biglietti.
    const posa = t < 1.6 ? 'striscia' : 'base';
    const espr = t < 1.6 ? 'felice' : t < 7 ? 'base' : t < 10 ? 'sorpresa' : 'felice';
    if (posa + espr !== this.statoAda) {
      this.ada.innerHTML = '<g transform="' + G.posaAda(M.ada[0], M.ada[1]) + '">' + G.ada(posa, espr, { testo: 'Al mare Emma' }) + '</g>';
      this.statoAda = posa + espr;
    }
    // La striscia: dalle mani di Ada sopra la fessura, si gira e scende dentro.
    const su = eio(seg(t, 1.6, 3.0)), giu = eio(seg(t, 3.2, 4.4));
    const [fx, fy] = this.fessura;
    const x = lerp(M.ada[0], fx, su), y = lerp(808, fy - 22, su) + 26 * giu;
    const rot = lerp(0, 90, eio(seg(t, 2.4, 3.1)));
    this.str.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + rot.toFixed(1) + ') scale(0.123)');
    this.str.setAttribute('opacity', t < 1.6 ? 0 : t > 4.6 ? 0 : 1);
    // La macchina: trema mentre lavora, gli aghi girano, la forbice scatta due volte, la bocca si accende.
    const lavora = seg(t, 4.4, 4.7) * (1 - seg(t, 8.8, 9.2));
    const trema = lavora * 1.2 * Math.sin(t * 40);
    const aghi = lavora * 70 * Math.sin(t * 5);
    let forbice = 0.6;
    SP_TAGLI.forEach(a => { forbice = Math.min(forbice, 0.6 * Math.abs((t - a) / 0.18) < 0.6 ? 0.6 * Math.abs((t - a) / 0.18) : 0.6); });
    if (t > SP_TAGLI[0] - 0.4 && t < SP_TAGLI[1] + 0.4) forbice = Math.min(forbice, 1);
    const bocca = Math.max(0, ...SP_USCITE.map(a => 1 - Math.abs(t - a) / 0.35));
    const km = forbice.toFixed(2) + '|' + Math.round(aghi) + '|' + bocca.toFixed(2);
    if (km !== this.statoMac) {
      this.mac.innerHTML = '<g transform="translate(' + trema.toFixed(2) + ' 0) ' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({ forbice, aghi, bocca }) + '</g>';
      this.statoMac = km;
    } else this.mac.firstChild && this.mac.firstChild.setAttribute('transform', 'translate(' + trema.toFixed(2) + ' 0) ' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300));
    // I biglietti: escono dalla bocca, salgono in arco e restano sospesi, ondeggiando.
    this.big.forEach((b, i) => {
      const u = eo(seg(t, SP_USCITE[i], SP_USCITE[i] + 1.4));
      const [tx, ty] = SP_SOSPESI[i], [bx, by] = this.bocca;
      const x = lerp(bx, tx, u), y = lerp(by, ty, u) - 34 * Math.sin(Math.PI * u) + 2.2 * Math.sin(t * 2 + i) * u;
      const s = lerp(0.08, SP_SB, eo(seg(t, SP_USCITE[i], SP_USCITE[i] + 0.6)));
      b.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + (6 * Math.sin(t * 1.7 + i) * u).toFixed(2) + ') scale(' + s.toFixed(3) + ')');
      b.setAttribute('opacity', t < SP_USCITE[i] ? 0 : 1);
    });
    this.sub(t);
  },
});
