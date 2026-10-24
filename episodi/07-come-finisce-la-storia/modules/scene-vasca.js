const { seg, eo, eio, lerp } = kit;
// Fuori, alla bancarella. Il treno esce sopra la vasca: passano gli altri vagoni, e non succede niente. Passa l'ultimo,
// la paperella del punto, scura come la notte. Sotto di lei cadono le paperelle, di luce, e toccano l'acqua vere:
// tantissime scure, qualcuna grigio chiaro, una o due di altri colori. La vasca sembra un pezzo di cielo. Il treno si
// ferma in stazione, lungo la banchina, e i vestiti tornano del colore dei biglietti. Ada guarda la vasca, poi il
// quaderno, con la paperellina scura della prima sera.
// Si apre dalla luce dell'uscita, come finisce «finestre»; finisce su Ada e la vasca scura (la riprende «pesca»).
const VS_CAM = [
  { t: 0, cx: 760, cy: 830, z: 2.8 },
  { t: 1.6, cx: 690, cy: 846, z: 3.0 },
  { t: 9.2, cx: 690, cy: 846, z: 3.0 },
  // Un pezzo di cielo.
  { t: 10.8, cx: 776, cy: 874, z: 6.4 },
  { t: 12.6, cx: 772, cy: 874, z: 6.8 },
  { t: 13.6, cx: 716, cy: 852, z: 4.4 },
  { t: 21.0, cx: 712, cy: 850, z: 4.2 },
];
const VS_GIRO = { esce: 0.6, vel: [[0.6, 140], [4.4, 140], [4.9, 50], [7.4, 50], [8.0, 120]] };
// Il quaderno da vicino: la paperellina scura della prima sera.
const VS_PAGINA = [13.6, 15.4];
const VS_ZOOM = [{ t: 13.6, cx: 1340, cy: 712, z: 2.2 }, { t: 15.4, cx: 1366, cy: 708, z: 2.8 }];
kit.scene('vasca', {
  init(kit) {
    const G = window.G, M = G.MONDO, A = G.MOD.mare.passeggeri, F = G.MOD.finisce, P = F.passeggeri;
    const chi = [{ tipo: 'al', biglietto: A.Al.biglietto, uscita: A.Al.tratti[2] }, { tipo: 'mare', biglietto: A.mare.biglietto, uscita: A.mare.tratti[2] },
      { tipo: 'emma', biglietto: A.Emma.biglietto, uscita: A.Emma.tratti[2] }]
      .concat(['nuota', 'e', 'gioca', '.'].map(w => ({ tipo: 'paperella', biglietto: P[w].biglietto, uscita: P[w].tratti[2] })));
    this.giro = G.giro7({ id: 'v', chi, vasca: F.giri[4].vasca, seme: 53, t: VS_GIRO });
    const ps = G.primaSera();
    const pagina = '<g class="vs-quad" opacity="0"><g class="vs-pagine">' + ps.copertina + ps.sinistra + ps.destra + ps.costa + '</g></g>';
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.giro.treno + '<g class="vs-ada"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'vasca', manopola: 0, banchina: true, morto: true,
      davanti: '<defs><radialGradient id="g-vs-luce" cx="1" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
        '<rect class="vs-uscita" x="-200" y="-200" width="2400" height="1480" fill="url(#g-vs-luce)"/>' + pagina,
      html: G.sottotitolo('NARRATORE', 'E nella vasca cadono tantissime paperelle scure.') +
        G.sottotitolo('ADA', 'Adesso sono quasi tutte così.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.giro.papere);
    this.giro.monta(this.m);
    this.G = G;
    this.ada = this.m.q('.vs-ada'); this.uscita = this.m.q('.vs-uscita');
    this.quad = this.m.q('.vs-quad'); this.pagine = this.m.q('.vs-pagine');
    this.stato = '';
    this.sub = G.subs(kit, [[6.4, 11.0], [15.8, 18.4]]);
  },
  render(t, kit) {
    t = window.G.tempo('07', 'vasca', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(VS_CAM, t));
    G.animaMondo(m, t + 1080);
    this.uscita.setAttribute('opacity', (0.95 * (1 - eio(seg(t, 0.1, 1.6)))).toFixed(3));
    this.giro.render(t);
    // Ada, col quaderno: guarda il treno, poi la vasca scura; poi il quaderno, e pensa.
    const espr = t < 6.4 ? 'base' : t < 12.8 ? 'sorpresa' : 'pensa';
    const sporge = eio(seg(t, 7.0, 8.0)) * (1 - eio(seg(t, 12.6, 13.4)));
    const k = espr + sporge.toFixed(2);
    if (k !== this.stato) {
      this.ada.innerHTML = '<g transform="rotate(' + (8 * sporge).toFixed(2) + ' 672 896)"><g transform="' + G.posaAda(672, 896) + '">' + G.ada('quaderno', espr) + '</g></g>';
      this.stato = k;
    }
    this.quad.setAttribute('opacity', (seg(t, VS_PAGINA[0] - 0.15, VS_PAGINA[0]) * (1 - seg(t, VS_PAGINA[1] - 0.15, VS_PAGINA[1]))).toFixed(3));
    this.pagine.setAttribute('transform', G.camChiavi(VS_ZOOM, t));
    this.sub(t);
  },
});
