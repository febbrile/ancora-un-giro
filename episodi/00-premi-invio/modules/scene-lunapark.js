const { seg, eo, eio, lerp } = kit;
// Il luna park di notte: la striscia arriva dal cielo e atterra in mano ad Ada, alla stazione delle montagne russe.
// Finisce sull'inquadratura di Ada e dello Spezzaparole (la riprende «spezzaparole»).
const LP_PRESA = 11.0;
const LP_CAM = [
  { t: 0, cx: 960, cy: 540, z: 1 },
  { t: 6.5, cx: 960, cy: 540, z: 1 },
  { t: 10.6, cx: 470, cy: 760, z: 2.6 },
  { t: 12.6, cx: 470, cy: 760, z: 2.6 },
  { t: 14.4, cx: 528, cy: 792, z: 5.2 },
  { t: 16.6, cx: 528, cy: 792, z: 5.2 },
  { t: 19.6, cx: 640, cy: 620, z: 1.35 },
  { t: 22.6, cx: 640, cy: 620, z: 1.35 },
  { t: 25.4, cx: 556, cy: 772, z: 3.6 },
];
function lpBez(p, u) {
  const a = 1 - u;
  return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]);
}
kit.scene('lunapark', {
  init(kit) {
    const G = window.G, M = G.MONDO;
    const vuoti = [{ tipo: '' }, { tipo: '' }, { tipo: '' }];
    const sopra = '<g class="lp-treno">' + G.treno(vuoti, { sbarra: 0 }) + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({ forbice: 0.5 }) + '</g>' +
      '<g class="lp-ada"></g>' +
      '<g class="lp-striscia"><g transform="translate(-150 -22)">' + G.striscia('Al mare Emma', 300) + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'lunapark',
      html: G.sottotitolo('NARRATORE', 'Vola sopra i tetti, fino a un luna park acceso nella notte. Alla stazione delle montagne russe lavora Ada, una piccola scienziata.') +
        G.sottotitolo('ADA', 'Al mare Emma… e poi?') +
        G.sottotitolo('NARRATORE', 'Per scoprirlo, c’è una sola strada: un giro sulle montagne russe.'),
    });
    this.G = G;
    this.ada = this.m.q('.lp-ada'); this.str = this.m.q('.lp-striscia');
    this.vag = this.m.qa('.lp-treno .g-vag');
    this.stato = '';
    this.sub = G.subs(kit, [[0.8, 12.4], [13.2, 16.4], [17.0, 23.0]]);
  },
  render(t, kit) {
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(LP_CAM, t));
    G.animaMondo(m, t + 40);
    G.posaTreno(this.vag, m.arrivo, m.arrivo.getTotalLength() - (M.fermo - 40));
    // Ada: prima aspetta, poi prende la striscia e la legge.
    const posa = t < LP_PRESA ? 'base' : 'striscia';
    const espr = t < LP_PRESA ? 'base' : t < 13 ? 'sorpresa' : t < 17 ? 'pensa' : 'felice';
    const chiave = posa + espr;
    if (chiave !== this.stato) {
      this.ada.innerHTML = '<g transform="' + G.posaAda(M.ada[0], M.ada[1]) + '">' + G.ada(posa, espr, { testo: 'Al mare Emma' }) + '</g>';
      this.stato = chiave;
    }
    // La striscia scende dal cielo fino alle mani di Ada.
    const u = eio(seg(t, 1.0, LP_PRESA));
    const p = lpBez([[2050, 140], [1500, 40], [900, 520], [M.ada[0], 808]], u);
    const s = lerp(0.55, 0.123, eio(seg(t, 4, LP_PRESA)));
    const rot = (1 - u) * (-18 + 10 * Math.sin(t * 3));
    this.str.setAttribute('transform', 'translate(' + p[0].toFixed(1) + ' ' + (p[1] + (1 - u) * 18 * Math.sin(t * 2.2)).toFixed(1) + ') rotate(' + rot.toFixed(2) + ') skewX(' + ((1 - u) * 9 * Math.sin(t * 6)).toFixed(2) + ') scale(' + s.toFixed(3) + ')');
    this.str.setAttribute('opacity', t < LP_PRESA ? 1 : 0);
    this.sub(t);
  },
});
