const { seg, eo, eio, lerp } = kit;
// Il treno parte, sale, scende di colpo ed entra nella montagna; la camera segue l'ultimo vagone e ci entra con lui.
// Stacco: dalla banchina alla salita, in fondo alla banchina lunga. Sul viadotto la camera si allarga; alla fine
// aspetta il treno sulla bocca della montagna e ci entra.
// Buio; poi, piano, le luci dei passeggeri e il treno visto da dentro (come si apre «fili»).
// Si apre come finisce «carrozza».
const BU_STACCO = 3.4;
// Velocità del treno [t, v]. Prima dello stacco: parte dalla stazione.
const BU_VEL = [[0, 0], [0.8, 0], [2, 120]];
// Dopo lo stacco il treno è sulla salita (BU_SALITA_S lungo la pista, Emma a metà): su piano, poi veloce sul viadotto.
const BU_SALITA_S = 2422;
const BU_SALITA = [[BU_STACCO, 100], [6.2, 100], [7.6, 420], [8.6, 560]];
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
  render(t, kit) {
    t = window.G.tempo('01', 'buio', t);
    const G = this.G, M = G.MONDO, m = this.m;
    const dopo = t >= BU_STACCO;
    const s = dopo ? G.percorso(t, BU_SALITA_S, BU_SALITA) : G.percorso(t, this.s0, BU_VEL);
    G.posaTreno(this.vag, m.partenza, s);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true });
    // La camera segue l'ultimo vagone (Emma); quando entra, resta sulla bocca della montagna.
    const se = Math.min(this.L - 6, s - 2 * M.passo);
    const p = m.partenza.getPointAtLength(Math.max(0, se));
    if (!dopo) {
      const z = lerp(4.0, 3.2, eio(seg(t, 0.8, BU_STACCO)));
      const avvio = eio(seg(t, 0, 1.6));
      m.cam.setAttribute('transform', G.cam(lerp(322, p.x, avvio), lerp(798, p.y - 30, avvio), z));
    } else {
      // Sulla salita Emma sta a sinistra, con davanti la strada; sul viadotto la camera si allarga (senza mostrare
      // il cielo sopra le stelle), poi va sulla bocca della montagna e stringe mentre il treno entra.
      const larga = eio(seg(t, 6.0, 8.2));
      const z = lerp(2.0, 1.25, larga) * lerp(1, 3.0, eio(seg(t, 9.4, 10.9)));
      const bocca = eio(seg(t, 9.2, 10.4));
      const cx = lerp(p.x + lerp(260, 120, larga), M.ingresso[0], bocca);
      const cy = lerp(Math.max(p.y - 30, 545 / z), M.ingresso[1] - 30, bocca);
      m.cam.setAttribute('transform', G.cam(cx, cy, z));
    }
    G.animaMondo(m, t + 358);
    this.nero.setAttribute('opacity', eio(seg(t, BU_NERO[0], BU_NERO[1])).toFixed(3));
    // Dentro: il treno nel buio, che si schiarisce piano.
    this.dentro.setAttribute('opacity', eio(seg(t, BU_DENTRO[0], BU_DENTRO[1])).toFixed(3));
    G.scorriInterno(kit, 300 * t);
    this.sub(t);
  },
});
