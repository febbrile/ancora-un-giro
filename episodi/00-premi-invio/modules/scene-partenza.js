const { seg, eo, eio, lerp } = kit;
// Il treno parte da solo, corre lungo la banchina ed esce dall'inquadratura; stacco sulla salita, in fondo alla
// banchina: il treno sale piano, poi corre sul viadotto ed entra in alto nella montagna. Ada resta a terra.
// Si apre dove finisce «passeggeri»; finisce sulla montagna (la riprende «vasca»).
const PT_STACCO = 7.0;
// Prima dello stacco: la stazione, il treno che parte.
const PT_CAM = [
  { t: 0, cx: 380, cy: 770, z: 2.5 },
  { t: 2.8, cx: 380, cy: 770, z: 2.5 },
  { t: PT_STACCO, cx: 330, cy: 760, z: 1.9 },
];
// Dopo lo stacco: la salita, poi la camera segue il treno sul viadotto fino alla montagna.
const PT_CAM2 = [
  { t: PT_STACCO, cx: -620, cy: 570, z: 1.1 },
  { t: 10.4, cx: -580, cy: 560, z: 1.1 },
  { t: 15.8, cx: 960, cy: 540, z: 1 },
  { t: 21, cx: 1100, cy: 600, z: 1.45 },
];
// Velocità del treno [t, v] (pixel del mondo al secondo). Prima dello stacco: parte e corre sulla banchina.
const PT_VEL = [[0, 0], [2.6, 0], [4.6, 170]];
// Dopo lo stacco il treno è a metà salita (PT_SALITA_S lungo la pista): su piano, poi veloce sul viadotto.
const PT_SALITA_S = 2200;
const PT_SALITA = [[PT_STACCO, 90], [10.4, 90], [11.8, 340], [13.0, 540]];
kit.scene('partenza', {
  init(kit) {
    const G = window.G, M = G.MONDO, P = G.MOD.mare.passeggeri;
    const sopra = '<g class="pt-treno">' + G.treno([{ tipo: 'al', col: P.Al.biglietto }, { tipo: 'mare', col: P.mare.biglietto }, { tipo: 'emma', col: P.Emma.biglietto }], { sbarra: 1 }) + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="pt-ada"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'partenza',
      html: G.sottotitolo('NARRATORE', 'Ada sul trenino non sale mai. Il treno parte da solo, senza nessuno alla guida,') +
        G.sottotitolo('NARRATORE', 'e sparisce dentro la montagna.'),
    });
    this.G = G;
    this.vag = this.m.qa('.pt-treno .g-vag'); this.ada = this.m.q('.pt-ada');
    this.s0 = 640 - M.fermo;
    this.stato = '';
    this.sub = G.subs(kit, [[0.8, 9.6], [14.6, 17.8]]);
  },
  render(t, kit) {
    t = window.G.tempo('00', 'partenza', t);
    const G = this.G, M = G.MONDO, m = this.m;
    const dopo = t >= PT_STACCO;
    m.cam.setAttribute('transform', G.camChiavi(dopo ? PT_CAM2 : PT_CAM, t));
    G.animaMondo(m, t + 114);
    const s = dopo ? G.percorso(t, PT_SALITA_S, PT_SALITA) : G.percorso(t, this.s0, PT_VEL);
    G.posaTreno(this.vag, m.partenza, s);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true });
    const espr = t < 3 ? 'felice' : t < 16 ? 'base' : 'pensa';
    if (espr !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(M.ada[0], M.ada[1]) + '">' + G.ada('base', espr) + '</g>'; this.stato = espr; }
    this.sub(t);
  },
});
