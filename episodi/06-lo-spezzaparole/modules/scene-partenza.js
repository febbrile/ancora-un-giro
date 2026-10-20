const { seg, eo, eio, lerp } = kit;
// Il trenino parte da solo, cinque vagoni in fila, senza nessuno alla guida: sale piano, scende di colpo e sparisce nella
// bocca buia della montagna (dal buio arrivano i clac). Ada non corre alla bancarella: resta davanti allo Spezzaparole,
// lo guarda, apre il quaderno e ne strappa un foglio.
// Si apre come finisce «zac»; finisce su Ada col foglio in mano, davanti allo Spezzaparole (la riprende «prova»).
const PR_CAM = [
  { t: 0, cx: 340, cy: 640, z: 1.9 },
  { t: 1.6, cx: 340, cy: 640, z: 1.9 },
  { t: 5.6, cx: 720, cy: 560, z: 1.15 },
  { t: 7.6, cx: 960, cy: 540, z: 1 },
  { t: 9.2, cx: 960, cy: 540, z: 1 },
  { t: 10.8, cx: 556, cy: 790, z: 4.0 },
];
const PR_PASSO = 76, PR_TRENO = 490;
// Velocità [t, v]: fermo, poi piano sulla salita; in cima prende velocità e scende di colpo.
const PR_VEL = [[0, 0], [1.2, 0], [2.6, 90], [4.8, 120], [6.2, 280], [7.6, 420]];
const PR_GUARDA = 8.4, PR_QUADERNO = 9.8, PR_STRAPPA = 11.0;
kit.scene('partenza', {
  init(kit) {
    const G = window.G, M = G.MONDO, P = G.MOD.zampiru.passeggeri;
    const chi = [['al', P.Al], ['mare', P.mare], ['pezzo', P.Zam, 'd'], ['pezzo', P.pi, 'sd'], ['pezzo', P['rù'], 's']];
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="pr-treno">' + G.treno(chi.map(c => ({ tipo: c[0], col: c[1].biglietto, o: { strappo: c[2] } })), { sbarra: 1 }) + '</g>' +
      '<g class="pr-ada"></g>' +
      '<g class="pr-ritaglio" opacity="0"><path d="M-6 -4 L6 -5 L4 3 L-5 4 Z" fill="' + G.C.crema + '" stroke="' + G.C.cremaScura + '" stroke-width="1"/></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'partenza', manopola: 0, banchina: true, morto: true,
      html: G.sottotitolo('NARRATORE', 'Il treno parte da solo e sparisce nella montagna. Ada, invece, resta lì.'),
    });
    this.G = G;
    this.vag = this.m.qa('.pr-treno .g-vag');
    this.ada = this.m.q('.pr-ada'); this.ritaglio = this.m.q('.pr-ritaglio');
    this.stato = '';
    this.sub = G.subs(kit, [[1.6, 9.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('06', 'partenza', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PR_CAM, t));
    G.animaMondo(m, t + 670);
    const s = G.percorso(t, PR_TRENO, PR_VEL);
    G.posaTreno(this.vag, m.partenza, s, null, PR_PASSO);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true, passo: PR_PASSO });
    // Ada saluta il treno con gli occhi, poi guarda lo Spezzaparole, apre il quaderno e strappa un foglio.
    const posa = t < PR_QUADERNO ? 'base' : t < PR_STRAPPA ? 'quaderno' : 'striscia';
    const espr = t < 2.4 ? 'felice' : t < PR_GUARDA ? 'base' : t < PR_STRAPPA + 0.3 ? 'pensa' : 'felice';
    if (posa + espr !== this.stato) {
      this.ada.innerHTML = '<g class="pr-ada-in"><g transform="' + G.posaAda(M.ada[0], M.ada[1]) + '">' + G.ada(posa, espr, {}) + '</g></g>';
      this.stato = posa + espr;
    }
    // Si gira un poco verso lo Spezzaparole.
    const gira = 4 * eio(seg(t, PR_GUARDA, PR_GUARDA + 0.6));
    this.ada.firstChild.setAttribute('transform', 'rotate(' + gira.toFixed(2) + ' ' + M.ada[0] + ' ' + M.ada[1] + ')');
    // Il ritaglio di carta che vola via quando strappa il foglio.
    const u = seg(t, PR_STRAPPA, PR_STRAPPA + 0.9);
    this.ritaglio.setAttribute('opacity', (u > 0 && u < 1 ? 1 - u * u : 0).toFixed(3));
    this.ritaglio.setAttribute('transform', 'translate(' + (M.ada[0] + 14 + 14 * u).toFixed(2) + ' ' + (806 - 10 * Math.sin(Math.PI * u) + 24 * u * u).toFixed(2) + ') rotate(' + (200 * u).toFixed(1) + ') scale(.8)');
    this.sub(t);
  },
});
