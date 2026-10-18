const { seg, eo, eio, lerp } = kit;
// Il treno parte, sale, scende di colpo ed entra nella montagna; la camera segue l'ultimo vagone e ci entra con lui.
// Buio; poi, piano, le luci dei passeggeri e il treno visto da dentro (come si apre «fili»).
// Si apre come finisce «carrozza».
const BU_VEL = [[0, 0], [0.8, 0], [2, 120], [5, 110], [6, 110], [7.5, 180], [9, 260]];
const BU_NERO = [10.6, 11.6];
const BU_DENTRO = [12.2, 15.6];
kit.scene('buio', {
  init(kit) {
    const G = window.G, M = G.MONDO, P = G.MOD.mare.passeggeri;
    const chi = [{ tipo: 'al', col: P.Al.biglietto }, { tipo: 'mare', col: P.mare.biglietto }, { tipo: 'emma', col: P.Emma.biglietto }];
    const dentro = '<g class="bu-dentro" opacity="0">' + G.interno(chi) + '</g>';
    this.m = G.costruisciMondo(kit, '<g class="bu-treno">' + G.treno(chi, { sbarra: 1 }) + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g transform="' + G.posaAda(M.ada[0], M.ada[1]) + '">' + G.ada('base', 'felice') + '</g>', {
      pre: 'buio',
      davanti: '<rect class="bu-nero" x="-200" y="-200" width="2320" height="1480" fill="#07060F" opacity="0"/>' + G.interniDefs + dentro,
      html: G.sottotitolo('NARRATORE', 'Il treno sale piano, scende di colpo, ed entra nel buio.'),
    });
    this.G = G;
    this.vag = this.m.qa('.bu-treno .g-vag'); this.nero = this.m.q('.bu-nero'); this.dentro = this.m.q('.bu-dentro');
    this.s0 = 640 - M.fermo;
    this.L = this.m.partenza.getTotalLength();
    this.sub = G.subs(kit, [[1.2, 10.6]]);
  },
  render(t) {
    const G = this.G, M = G.MONDO, m = this.m;
    const s = G.percorso(t, this.s0, BU_VEL);
    G.posaTreno(this.vag, m.partenza, s);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true });
    // La camera segue l'ultimo vagone (Emma); quando entra, resta sulla bocca della montagna.
    const se = Math.min(this.L - 6, s - 2 * M.passo);
    const p = m.partenza.getPointAtLength(Math.max(0, se));
    const z = lerp(4.0, 2.6, eio(seg(t, 0.8, 4))) * lerp(1, 1.5, eio(seg(t, 8.6, 10.8)));
    const avvio = eio(seg(t, 0, 1.6));
    const cx = lerp(322, p.x, avvio), cy = lerp(798, p.y - 30, avvio);
    m.cam.setAttribute('transform', G.cam(cx, cy, z));
    G.animaMondo(m, t + 358);
    this.nero.setAttribute('opacity', eio(seg(t, BU_NERO[0], BU_NERO[1])).toFixed(3));
    // Dentro: il treno nel buio, che si schiarisce piano.
    this.dentro.setAttribute('opacity', eio(seg(t, BU_DENTRO[0], BU_DENTRO[1])).toFixed(3));
    G.scorriInterno(kit, 300 * t);
    this.sub(t);
  },
});
