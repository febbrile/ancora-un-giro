const { seg, eo, eio, lerp } = kit;
// I due treni partono da soli, uno dietro l'altro, dalla banchina lunga; escono di campo a sinistra e ricompaiono sul
// viadotto, poi spariscono nella montagna. Ada corre alla bancarella della pesca, col quaderno stretto al petto.
// Si apre come finisce «parco»; finisce sulla montagna (la riprende «fili», dentro).
const PR_CAM = [
  { t: 0, cx: 190, cy: 720, z: 1.8 },
  { t: 1.8, cx: 190, cy: 720, z: 1.8 },
  { t: 9.0, cx: 860, cy: 560, z: 1.1 },
  { t: 13.4, cx: 960, cy: 540, z: 1 },
  { t: 17.4, cx: 1030, cy: 520, z: 1.3 },
];
const PR_TRENI = [920, 490];
// Velocità [t, v]: fermi, poi via lungo la banchina; sul viadotto il secondo va piano, poi prende velocità come il primo.
const PR_VEL = [
  [[0, 0], [1.4, 0], [3.0, 170], [3.6, 240], [6.0, 330], [8.0, 420]],
  [[0, 0], [1.8, 0], [3.4, 120], [5.0, 260], [6.4, 240], [7.4, 150], [10.4, 150], [11.4, 200], [12.6, 300]],
];
// Fuori campo, tra a e b, il treno corre il resto della banchina, la salita e un pezzo di viadotto, e a b è al punto s:
// così entra nella montagna quando entrava prima (il primo a 8.0, il secondo a 13.9), con la stessa musica.
const PR_FUORI = [[3.6, 4.3, 3326], [5.7, 6.7, 3146]];
function prDove(n, t) {
  const G = window.G, [a, b, s] = PR_FUORI[n], v = PR_TRENI[n] + G.percorso(t, 0, PR_VEL[n]);
  return v + (s - PR_TRENI[n] - G.percorso(b, 0, PR_VEL[n])) * eio(seg(t, a, b));
}
const PR_CORSA = [3.0, 6.4];
kit.scene('partenza', {
  init(kit) {
    const G = window.G, M = G.MONDO, A = G.MOD.mare.passeggeri, B = G.MOD.parco.passeggeri;
    const chi = [
      [{ tipo: 'al', col: A.Al.biglietto }, { tipo: 'mare', col: A.mare.biglietto }, { tipo: 'emma', col: A.Emma.biglietto }],
      [{ tipo: 'al', col: B.Al.biglietto }, { tipo: 'parco', col: B.parco.biglietto }, { tipo: 'emma', col: B.Emma.biglietto }],
    ];
    const sopra = chi.map((c, n) => '<g class="pr-treno" data-n="' + n + '">' + G.treno(c, { sbarra: 1 }) + '</g>').join('') +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="pr-ada"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'partenza',
      html: G.sottotitolo('NARRATORE', 'I due treni partono da soli, uno dietro l’altro, e spariscono nella montagna.'),
    });
    this.G = G;
    this.treni = [0, 1].map(n => this.m.qa('.pr-treno[data-n="' + n + '"] .g-vag'));
    this.ada = this.m.q('.pr-ada');
    this.stato = '';
    this.sub = G.subs(kit, [[1.6, 9.4]]);
  },
  render(t, kit) {
    t = window.G.tempo('02', 'partenza', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PR_CAM, t));
    G.animaMondo(m, t + 700);
    this.treni.forEach((v, n) => {
      const s = prDove(n, t);
      G.posaTreno(v, m.partenza, s);
      G.nascondiInMontagna(v, m.partenza, s, { fine: true });
    });
    // Ada corre dalla stazione alla bancarella della pesca, saltellando.
    const u = eio(seg(t, PR_CORSA[0], PR_CORSA[1]));
    const x = lerp(M.ada[0], 672, u), y = lerp(M.ada[1], 896, u) - (u > 0 && u < 1 ? 6 * Math.abs(Math.sin(t * 9)) : 0);
    const espr = t < 2 ? 'felice' : t < 12 ? 'base' : 'pensa';
    const posa = u > 0 ? 'quaderno' : 'base';
    if (posa + espr !== this.stato) { this.ada.innerHTML = '<g class="pr-ada-in">' + G.ada(posa, espr) + '</g>'; this.stato = posa + espr; }
    this.ada.firstChild.setAttribute('transform', G.posaAda(x, y));
    this.sub(t);
  },
});
