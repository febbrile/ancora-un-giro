const { seg, eo, ei, eio, lerp } = kit;
// Arriva «Al mare Emma»: Ada la dà allo Spezzaparole, tre biglietti volano sui sedili e prendono vita.
// Primo piano su Emma: vestito rosa antico. Le sbarre si abbassano. Finisce sull'ultimo vagone (lo riprende «buio»).
const CR_CAM = [
  { t: 0, cx: 480, cy: 780, z: 3.2 },
  { t: 3.2, cx: 540, cy: 784, z: 4.0 },
  { t: 7.0, cx: 540, cy: 784, z: 4.0 },
  { t: 9.6, cx: 300, cy: 792, z: 3.6 },
  { t: 12.0, cx: 300, cy: 792, z: 3.6 },
  { t: 14.2, cx: 330, cy: 800, z: 7.2 },
  { t: 20.4, cx: 330, cy: 800, z: 7.2 },
  { t: 23.6, cx: 322, cy: 798, z: 4.0 },
];
const CR_PRESA = 2.8, CR_TAGLI = [5.6, 6.2], CR_USCITE = [6.8, 7.2, 7.6], CR_ATTERRA = [8.6, 9.0, 9.4], CR_VITA = [9.6, 10.1, 10.6];
const CR_SBARRE = [20.6, 21.6];
function crBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('carrozza', {
  init(kit) {
    const G = window.G, M = G.MONDO, P = G.MOD.mare.passeggeri;
    this.chi = [['al', P.Al.biglietto], ['mare', P.mare.biglietto], ['emma', P.Emma.biglietto]];
    let scintille = '';
    for (let i = 0; i < 3; i++) { scintille += '<g class="cr-scint" opacity="0">'; for (let k = 0; k < 8; k++) scintille += '<circle r="2.2" fill="' + G.C.luce + '"/>'; scintille += '</g>'; }
    const sopra = '<g class="cr-treno">' + G.treno(this.chi.map(c => ({ tipo: c[0], col: c[1] })), { sbarra: 0 }) + '</g>' +
      '<g class="cr-macchina"></g><g class="cr-ada"></g>' +
      '<clipPath id="g-cr-fessura"><rect x="0" y="-1000" width="1920" height="1754"/></clipPath>' +
      '<g clip-path="url(#g-cr-fessura)"><g class="cr-striscia"><g transform="translate(-150 -22)">' + G.striscia('Al mare Emma', 300) + '</g></g></g>' +
      ['Al', 'mare', 'Emma'].map(p => '<g class="cr-big" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(p) + '</g></g>').join('') + scintille;
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'carrozza',
      html: G.sottotitolo('NARRATORE', 'Arriva una frase: «Al mare Emma». Lo Spezzaparole la strappa in tre biglietti, e i biglietti salgono sul treno. Emma, nell’ultimo vagone, ha un vestito rosa antico: un colore che non somiglia ancora a niente.'),
    });
    this.G = G;
    this.vag = this.m.qa('.cr-treno .g-vag'); this.pass = this.vag.map(v => v.querySelector('.g-pass'));
    this.ada = this.m.q('.cr-ada'); this.mac = this.m.q('.cr-macchina'); this.str = this.m.q('.cr-striscia');
    this.big = this.m.qa('.cr-big'); this.scint = this.m.qa('.cr-scint');
    G.posaTreno(this.vag, this.m.arrivo, this.m.arrivo.getTotalLength() - (M.fermo - 40));
    this.sedili = this.vag.map((v, i) => [M.fermo + i * M.passo + 6, 816]);
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    this.fessura = [x0 + 100 * s, y0 + 60 * s]; this.bocca = [x0 + 100 * s, y0 + 213 * s];
    this.statoAda = ''; this.statoMac = '';
    this.sub = G.subs(kit, [[0.8, 18.6]]);
  },
  render(t, kit) {
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(CR_CAM, t));
    G.animaMondo(m, t + 330);
    // Ada prende la striscia che arriva dal cielo e la infila nella biglietteria.
    const posa = t >= CR_PRESA && t < 3.6 ? 'striscia' : 'base';
    const espr = t < CR_PRESA ? 'base' : t < 7 ? 'felice' : 'sorpresa';
    if (posa + espr !== this.statoAda) { this.ada.innerHTML = '<g transform="' + G.posaAda(M.ada[0], M.ada[1]) + '">' + G.ada(posa, espr, { testo: 'Al mare Emma' }) + '</g>'; this.statoAda = posa + espr; }
    const [fx, fy] = this.fessura;
    let x, y, rot = 0, sc = 0.123, op = 1;
    if (t < CR_PRESA) { const u = eio(seg(t, 0.2, CR_PRESA)); [x, y] = crBez([[900, 560], [760, 600], [620, 700], [M.ada[0], 808]], u); sc = lerp(0.3, 0.123, u); rot = (1 - u) * -14 * Math.sin(t * 3); }
    else if (t < 3.6) { x = M.ada[0]; y = 808; op = 0; }
    else { const su = eio(seg(t, 3.6, 4.4)), giu = eio(seg(t, 4.5, 5.2)); x = lerp(M.ada[0], fx, su); y = lerp(808, fy - 22, su) + 26 * giu; rot = lerp(0, 90, eio(seg(t, 4.0, 4.5))); op = t > 5.4 ? 0 : 1; }
    this.str.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + rot.toFixed(1) + ') scale(' + sc.toFixed(3) + ')');
    this.str.setAttribute('opacity', op);
    // La macchina lavora: due colpi di forbice, la bocca si accende.
    const lavora = seg(t, 5.2, 5.4) * (1 - seg(t, 7.8, 8.1));
    const trema = lavora * 1.2 * Math.sin(t * 40), aghi = lavora * 70 * Math.sin(t * 5);
    let forbice = 0.6;
    CR_TAGLI.forEach(a => { forbice = Math.min(forbice, Math.min(0.6, 0.6 * Math.abs((t - a) / 0.18))); });
    const bocca = Math.max(0, ...CR_USCITE.map(a => 1 - Math.abs(t - a) / 0.3));
    const km = forbice.toFixed(2) + '|' + Math.round(aghi) + '|' + bocca.toFixed(2);
    const tr = 'translate(' + trema.toFixed(2) + ' 0) ' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300);
    if (km !== this.statoMac) { this.mac.innerHTML = '<g transform="' + tr + '">' + G.spezzaparole({ forbice, aghi, bocca }) + '</g>'; this.statoMac = km; }
    else if (this.mac.firstChild) this.mac.firstChild.setAttribute('transform', tr);
    // I biglietti escono dalla bocca e volano diretti sui sedili; poi i passeggeri prendono vita.
    this.big.forEach((b, i) => {
      const u = eio(seg(t, CR_USCITE[i], CR_ATTERRA[i]));
      const [bx, by] = this.bocca, [sx, sy] = this.sedili[i];
      const x = lerp(bx, sx, u), y = lerp(by, sy - 8, u) - 60 * Math.sin(Math.PI * u);
      const nasce = seg(t, CR_VITA[i] - 0.15, CR_VITA[i] + 0.25);
      b.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + (-8 * u).toFixed(1) + ') scale(' + (0.26 * (1 - 0.5 * nasce)).toFixed(3) + ')');
      b.setAttribute('opacity', t < CR_USCITE[i] ? 0 : (1 - nasce).toFixed(3));
      const v = eo(seg(t, CR_VITA[i], CR_VITA[i] + 0.6));
      this.pass[i].setAttribute('opacity', v.toFixed(3));
      this.pass[i].setAttribute('transform', 'translate(140 40) scale(' + lerp(0.5, 1, v).toFixed(3) + ') translate(-140 -40)');
      const sc2 = seg(t, CR_VITA[i], CR_VITA[i] + 1.1);
      this.scint[i].setAttribute('opacity', (sc2 > 0 && sc2 < 1 ? 1 - sc2 : 0).toFixed(3));
      [...this.scint[i].children].forEach((c, k) => { const a = k * Math.PI / 4 + 0.3, d = 6 + 22 * eo(sc2); c.setAttribute('cx', (sx + d * Math.cos(a)).toFixed(2)); c.setAttribute('cy', (sy - 14 + d * Math.sin(a)).toFixed(2)); });
    });
    G.sbarre(this.vag, i => eio(seg(t, CR_SBARRE[0] + i * 0.3, CR_SBARRE[1] + i * 0.3)));
    this.sub(t);
  },
});
