const { seg, eo, ei, eio, lerp } = kit;
// Stacco sul salotto. Sul telefono, sotto «Il cane di Emma si chiama», arrivano i tre puntini e poi «Briciola». Le mani
// tengono il telefono. In stazione il treno aspetta lungo la banchina, coi vestiti
// del colore dei biglietti e Briciola nell'ultimo vagone: Ada la guarda, poi guarda il quaderno: Emma, e accanto a lei
// nessun cane. La montagna, tranquilla, sopra la vasca vuota.
// Si apre con uno stacco sul salotto; finisce sulla stazione col treno pronto (la riprende «laggiù»).
const TL_FRASE = 'Il cane di Emma si chiama';
const TL_PUNTINI = [0.6, 1.9];
const TL_STAZ = 6.0;
const TL_CAM = [
  { t: TL_STAZ, cx: 560, cy: 806, z: 3.6 },
  { t: 11.6, cx: 600, cy: 816, z: 4.2 },
  { t: 17.4, cx: 600, cy: 816, z: 4.2, da: 17.39 },
  { t: 17.41, cx: 640, cy: 760, z: 2.0, da: 17.4 },
  { t: 24.6, cx: 760, cy: 700, z: 1.5 },
];
const TL_ADA = [672, 896];
const TL_QUADERNO = [12.0, 12.6, 16.9, 17.4];
kit.scene('telefono', {
  init(kit) {
    const G = window.G, M = G.MONDO, C = G.C, D = G.MOD.cane, P = D.passeggeri;
    // Il salotto: come sempre, di chi scrive si vedono solo le mani.
    const salotto = '<g class="tl-salotto"><g class="tl-sal-cam">' + G.salotto('<g class="tl-tel"></g>') + '</g></g>';
    // Il quaderno: Emma, col suo vestito rosa, e accanto a lei la pagina vuota.
    const quaderno = '<g class="tl-quad" opacity="0"><g class="tl-q-cam">' + G.quadernoAperto(G.schizzoEmma(560, 720, P.Emma.biglietto, 2.4), '') +
      '<g class="tl-q-matita"><rect x="-8" y="-120" width="16" height="120" rx="4" fill="' + C.oro + '"/><path d="M-8 0 L0 22 L8 0 Z" fill="#E8C690"/><path d="M-3 14 L0 22 L3 14 Z" fill="#3A2418"/></g></g></g>';
    const forme = { Il: 0, di: 1, si: 2 };
    const parole = ['Il', 'cane', 'di', 'Emma', 'si', 'chiama'];
    const treno = parole.map(w => ({ tipo: w === 'cane' ? 'cane' : w === 'Emma' ? 'emma' : w === 'chiama' ? 'chiama' : 'sasso', col: P[w].biglietto, o: w in forme ? { forma: forme[w] } : w === 'cane' ? { coda: 12 } : {} }))
      .concat([{ tipo: 'paperella', col: D.nuovo[D.pesca] }]);
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      G.treniDormono() + '<g class="tl-treno">' + G.treno(treno, { sbarra: 0 }) + '</g><g class="tl-ada"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'telefono', morto: true, banchina: true, manopola: 0, davanti: quaderno + salotto,
      html: G.sottotitolo('ADA', 'Briciola… Suona proprio bene. Ma il cane di Emma non c’è.') +
        G.sottotitolo('NARRATORE', 'Il telefono risponde con un nome, tranquillo come sempre. La montagna ha fatto quello che fa ogni sera: ha riempito una vasca.'),
    });
    this.G = G;
    this.vag = this.m.qa('.tl-treno .g-vag');
    G.posaTreno(this.vag, this.m.partenza, 490, M.scala, M.passoBanchina);
    this.ada = this.m.q('.tl-ada'); this.salotto = this.m.q('.tl-salotto'); this.salCam = this.m.q('.tl-sal-cam'); this.tel = this.m.q('.tl-tel');
    this.quad = this.m.q('.tl-quad'); this.qCam = this.m.q('.tl-q-cam'); this.matita = this.m.q('.tl-q-matita');
    this.statoTel = ''; this.statoAda = '';
    this.sub = G.subs(kit, [[6.6, 11.6], [12.2, 23.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('08', 'telefono', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(TL_CAM, t));
    G.animaMondo(m, t + 1180);
    // Il salotto: i tre puntini, poi la risposta.
    this.salotto.setAttribute('opacity', (1 - seg(t, TL_STAZ - 0.5, TL_STAZ)).toFixed(3));
    this.salotto.setAttribute('display', t < TL_STAZ ? 'inline' : 'none');
    const z = lerp(1.0, 1.08, eio(seg(t, 0, TL_STAZ)));
    this.salCam.setAttribute('transform', 'translate(' + (972 - 972 * z).toFixed(1) + ' ' + (600 - 600 * z).toFixed(1) + ') scale(' + z.toFixed(4) + ')');
    const fase = t < TL_PUNTINI[0] ? 0 : t < TL_PUNTINI[1] ? 1 : 2;
    const pk = fase === 1 ? Math.round(t * 10) / 10 : -1;
    const kt = fase + '|' + pk;
    if (kt !== this.statoTel) {
      const chat = fase === 2 ? [['io', TL_FRASE], ['ai', 'Briciola']] : [['io', TL_FRASE]];
      this.tel.innerHTML = G.telefono({ chat, puntini: fase === 1 ? pk : undefined });
      this.statoTel = kt;
    }
    // In stazione: Ada guarda Briciola (felice), poi pensa a Emma (accigliata).
    const espr = t < 8.6 ? 'felice' : t < 9.6 ? 'pensa' : t < 12 ? 'accigliata' : 'pensa';
    const ang = Math.round((t < 9.4 ? -9 : lerp(-9, 2, eio(seg(t, 9.4, 10.2)))) * 2) / 2;
    const ka = espr + ang;
    if (ka !== this.statoAda) { this.ada.innerHTML = '<g transform="' + G.posaAda(TL_ADA[0], TL_ADA[1]) + '">' + G.adaGira('quaderno', espr, {}, ang) + '</g>'; this.statoAda = ka; }
    // Il quaderno: Emma, e accanto a lei niente. La matita resta sospesa sulla pagina vuota.
    this.quad.setAttribute('opacity', (seg(t, TL_QUADERNO[0], TL_QUADERNO[1]) * (1 - seg(t, TL_QUADERNO[2], TL_QUADERNO[3]))).toFixed(3));
    this.qCam.setAttribute('transform', G.cam(lerp(900, 980, eio(seg(t, TL_QUADERNO[0], TL_QUADERNO[3]))), 520, 1.05));
    const mx = lerp(1500, 1300, eio(seg(t, 12.4, 14.2))) + 20 * Math.sin(t * 1.4), my = 560 + 30 * Math.sin(t * 1.1);
    this.matita.setAttribute('transform', 'translate(' + mx.toFixed(1) + ' ' + my.toFixed(1) + ') rotate(28)');
    this.sub(t);
  },
});
