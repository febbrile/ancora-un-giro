const { seg, eo, eio, lerp } = kit;
// Il trenino di Ada resta fermo in stazione, con le sbarre alzate e le lucine basse. Ada si stringe il quaderno al petto
// ed esce dal cancello del luna park; sale a piedi il sentiero della collina, il camice che striscia nell'erba, mentre
// sopra di lei le strisce volano tutte dalla stessa parte. In cima si ferma, col fiato corto, e la camera sale alle sue
// spalle: oltre la collina, il chiarore.
// Si apre come finisce «domanda»; finisce sulla cima, dietro Ada (la riprende «immenso»).
const CL_CAM = [
  { t: 0, cx: 960, cy: 540, z: 1 },
  { t: 0.8, cx: 960, cy: 540, z: 1 },
  { t: 3.6, cx: 700, cy: 760, z: 2.0 },
  { t: 4.6, cx: 2060, cy: 780, z: 2.1, da: 4.59 },
  { t: 7.2, cx: 2140, cy: 760, z: 1.8 },
  { t: 11.4, cx: 2440, cy: 620, z: 1.8 },
  { t: 12.4, cx: 2500, cy: 600, z: 1.8 },
  { t: 15.0, cx: 2950, cy: 430, z: 1.0 },
];
// Ada: per la stazione fino alla vasca, poi (dopo lo stacco) dal cancello su per il sentiero, fino alla cima.
const CL_STAZIONE = [[520, 834], [600, 878], [700, 896], [960, 900]];
const CL_PASSI = [[1.0, 4.6], [4.6, 12.2]];
const CL_CIMA = 12.2;
function clLungo(pt, u) {
  const L = [0];
  for (let i = 1; i < pt.length; i++) L.push(L[i - 1] + Math.hypot(pt[i][0] - pt[i - 1][0], pt[i][1] - pt[i - 1][1]));
  const d = Math.max(0, Math.min(1, u)) * L[L.length - 1];
  let i = 1;
  while (i < pt.length - 1 && L[i] < d) i++;
  const a = (d - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]);
  return [lerp(pt[i - 1][0], pt[i][0], a), lerp(pt[i - 1][1], pt[i][1], a)];
}
kit.scene('collina', {
  init(kit) {
    const G = window.G, M = G.MONDO, A = G.MOD.mare, P = G.PARCO;
    const chi = [{ tipo: 'al', col: A.passeggeri.Al.biglietto }, { tipo: 'mare', col: A.passeggeri.mare.biglietto }, { tipo: 'emma', col: A.passeggeri.Emma.biglietto }, { tipo: 'paperella', col: A.nuovo.nuota }];
    this.salita = [[1860, 872]].concat(P.sentiero);
    const sopra = '<g class="cl-treno">' + G.treno(chi, { sbarra: 0 }) + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="cl-ada"></g>';
    this.m = G.costruisciPaesaggio(kit, sopra, {
      pre: 'collina', laggiu: 1, manopola: 0, banchina: true, morto: true,
      html: G.sottotitolo('NARRATORE', 'Ada lascia il trenino in stazione e segue le strisce, a piedi, su per la collina.'),
    });
    this.G = G;
    G.posaTreno(this.m.qa('.cl-treno .g-vag'), this.m.arrivo, this.m.arrivo.getTotalLength() - (M.fermo - 40));
    this.m.qa('.cl-treno .g-lucina').forEach(l => l.setAttribute('opacity', 0.3));
    this.ada = this.m.q('.cl-ada');
    this.stato = '';
    this.sub = G.subs(kit, [[1.0, 11.4]]);
  },
  render(t, kit) {
    t = window.G.tempo('09', 'collina', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(CL_CAM, t));
    G.animaPaesaggio(m, t + 60, { treni: false });
    // Dove sta Ada: in stazione, poi dopo lo stacco sul sentiero; cammina a passettini, saltellando un poco.
    let x, y, passo = 0;
    if (t < CL_PASSI[1][0]) {
      const u = seg(t, CL_PASSI[0][0], CL_PASSI[0][1]);
      [x, y] = clLungo(CL_STAZIONE, eio(u) * 0.3 + u * 0.7);
      passo = u > 0 && u < 1 ? 1 : 0;
    } else {
      const u = seg(t, CL_PASSI[1][0], CL_PASSI[1][1]);
      [x, y] = clLungo(this.salita, u * 0.85 + eio(u) * 0.15);
      passo = u < 1 ? 1 : 0;
    }
    const fiato = t > CL_CIMA ? Math.abs(Math.sin((t - CL_CIMA) * 7)) * 3 * (1 - seg(t, CL_CIMA + 1.6, CL_CIMA + 2.6)) : 0;
    const salto = passo * 5 * Math.abs(Math.sin(t * 9));
    const posa = t < 0.6 ? 'base' : 'quaderno';
    const espr = t < 0.6 ? 'felice' : t < CL_PASSI[1][0] ? 'base' : t < CL_CIMA ? 'pensa' : t < CL_CIMA + 1.4 ? 'chiusi' : 'sorpresa';
    const k = posa + espr;
    if (k !== this.stato) {
      this.ada.innerHTML = '<g class="cl-ada-in">' + G.ada(posa, espr) + (posa === 'base' ?
        '<g transform="rotate(-10 140 196)"><rect x="124" y="168" width="34" height="50" rx="4" fill="#2F6F73" stroke="#1E4A4D" stroke-width="2.5"/><rect x="154" y="172" width="4" height="42" fill="' + G.C.crema + '"/></g>' : '') + '</g>';
      this.stato = k;
    }
    this.ada.firstChild.setAttribute('transform', G.posaAda(x, y - salto - fiato) + ' rotate(' + (passo * 3 * Math.sin(t * 4.5)).toFixed(2) + ' 100 300)');
    this.sub(t);
  },
});
