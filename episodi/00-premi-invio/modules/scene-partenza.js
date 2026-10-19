const { seg, eo, eio, lerp } = kit;
// Il treno parte da solo, sale la salita, attraversa il cielo ed entra in alto nella montagna. Ada resta a terra.
// Si apre dove finisce «passeggeri»; finisce sulla montagna (la riprende «vasca»).
const PT_CAM = [
  { t: 0, cx: 380, cy: 770, z: 2.5 },
  { t: 2.8, cx: 380, cy: 770, z: 2.5 },
  { t: 10, cx: 900, cy: 560, z: 1.08 },
  { t: 15.8, cx: 960, cy: 540, z: 1 },
  { t: 21, cx: 1100, cy: 600, z: 1.45 },
];
// Velocità del treno [t, v] (pixel del mondo al secondo): fermo, piano fino alla salita, su piano, poi giù veloce.
const PT_VEL = [[0, 0], [2.6, 0], [4.0, 80], [5.5, 80], [6.2, 70], [11.8, 70], [12.8, 150], [14, 300]];
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
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PT_CAM, t));
    G.animaMondo(m, t + 114);
    const s = G.percorso(t, this.s0, PT_VEL);
    G.posaTreno(this.vag, m.partenza, s);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true });
    const espr = t < 3 ? 'felice' : t < 16 ? 'base' : 'pensa';
    if (espr !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(M.ada[0], M.ada[1]) + '">' + G.ada('base', espr) + '</g>'; this.stato = espr; }
    this.sub(t);
  },
});
