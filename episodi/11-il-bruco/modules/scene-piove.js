const { seg, eo, eio, lerp } = kit;
// Arriva una striscia nuova: «Domani piove?». Sul Bruco esce verde, la sbarra resta su. Il treno grande parte ed esce
// sopra la vasca, e sotto la bandierina d'ottone cadono paperelle sparse, di tutti i colori: qualche bianca, qualche
// marrone, una blu, una gialla, una rosa, una viola… nessuna molto più delle altre. Ada guarda la vasca, con la mano
// sospesa sull'acqua. Cartello: «Fine».
// Si apre sul Bruco; finisce sulla vasca, col cartello.
const PV_CU = [2066, 886], PV_ADA = [2016, 906];
const PV_BRUCO = { sale: 0.3, passo: 0.3, parte: 1.4, giro: 3.2 };
const PV_TRENO = { esce: 5.6, vel: [[5.6, 300], [7.0, 300], [7.5, 60], [9.8, 60], [10.4, 240]] };
const PV_MANO = 11.4;
const PV_FINE = 17.6;
const PV_CAM = [
  { t: 0, cx: 2160, cy: 856, z: 3.0 },
  { t: 5.39, cx: 2160, cy: 856, z: 3.0 },
  { t: 5.4, cx: 740, cy: 846, z: 3.6 },
  { t: 10.6, cx: 740, cy: 846, z: 3.6 },
  { t: 12.4, cx: 728, cy: 868, z: 5.2 },
  { t: 16.6, cx: 728, cy: 868, z: 5.2 },
  { t: 18.0, cx: 760, cy: 780, z: 2.4 },
];
kit.scene('piove', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, F = G.MOD.seconda.bruco.frasi.piove, PV = G.MOD.seconda.bruco.piove;
    const gio = S2.giostrina({ sbarra: 0, luci: 1 });
    this.mano = G.puntoCustode(PV_CU[0], PV_CU[1], G.CUSTODE_MANI.porge);
    this.giro = S2.giroBruco({ id: 'pvb', parole: F.frase, vestiti: F.vestiti, uscita: F.uscita, rosse: F.rosse, verdi: F.verdi, seme: 69, mano: this.mano, t: PV_BRUCO });
    // Il treno di «Domani piove?»: la frase del parco e le bandierine, come sempre; i colori dei biglietti dal modellino.
    // I primi cinque passeggeri sono quelli della frase del parco, uguali in ogni giro; la bandierina d'ottone ha i suoi tratti.
    const capo = G.MOD.seconda.parco.giri[0].passeggeri.slice(0, 5), BT = G.MOD.seconda.teleferica.biglietti;
    const chi = capo.map(p => S2.chi(p)).concat(['Domani', 'piove', '?'].map(w => S2.chi({ parola: w, biglietto: BT[w], tratti: [BT[w]] })))
      .concat([S2.chi({ parola: '⚑ottone', biglietto: G.MOD.seconda.parco.bandierine['⚑ottone'], tratti: PV.tratti })]);
    this.treno = G.giro7({ id: 'pv', chi, vasca: PV.vasca, seme: 151, fermo: G.fermoTreno(10), t: PV_TRENO });
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.treno.treno + gio.dietro + this.giro.bruco + gio.davanti + '<g class="pv-cu"></g><g class="pv-ada"></g>' + this.giro.biglietti;
    const fine = '<g class="pv-fine" opacity="0"><g transform="translate(960 300)"><g class="pv-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'piove', manopola: 0, banchina: true, morto: true, davanti: fine,
      html: G.sottotitolo('NARRATORE', 'Poi arriva una domanda nuova. E nella vasca, le paperelle sono di tutti i colori.') +
        G.sottotitolo('ADA', 'Come fa il treno a sapere se domani piove?'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.treno.papere);
    this.m.q('.g-bruco-vasca').insertAdjacentHTML('beforeend', this.giro.papere);
    this.treno.monta(this.m); this.giro.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.cu = q('.pv-cu'); this.ada = q('.pv-ada'); this.fine = q('.pv-fine'); this.insegna = q('.pv-insegna');
    this.cu.innerHTML = '<g transform="' + G.posaCustode(PV_CU[0], PV_CU[1]) + '">' + G.unico(G.custode('porge', 'serio', { occhi: 1 }), 'pvcu') + '</g>';
    this.stati = {};
    this.sub = G.subs(kit, [[5.8, 12.6], [13.4, 17.0]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('11', 'piove', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PV_CAM, t));
    G.animaMondo(m, t + 1650);
    this.giro.render(t);
    this.treno.render(t);
    // Ada: al Bruco guarda le verdi; poi, alla vasca grande, allunga la mano e la tiene sospesa sull'acqua.
    const alBruco = t < 5.4, sospesa = t >= PV_MANO;
    const giu = sospesa ? Math.round(0.45 * eio(seg(t, PV_MANO, PV_MANO + 0.8)) * 20) / 20 : 0;
    const espr = alBruco ? 'felice' : t < PV_MANO ? 'sorpresa' : 'pensa';
    const [ax, ay] = alBruco ? PV_ADA : [672, 896];
    this.cambia('ada', espr + giu + alBruco, this.ada, '<g transform="' + G.posaAda(ax, ay) + '">' + G.ada(sospesa ? 'pesca' : 'base', espr, { giu }) + '</g>');
    const f = eo(seg(t, PV_FINE, PV_FINE + 1.0));
    this.fine.setAttribute('opacity', f.toFixed(3));
    const turno = String(Math.floor(t / 0.6) % 3);
    if (t > PV_FINE - 0.2) this.cambia('ins', turno, this.insegna, G.insegna('Fine', 520, 200, +turno));
    this.sub(t);
  },
});
