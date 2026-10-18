const { seg, eo, ei, eio, lerp } = kit;
// I tre biglietti volano sui sedili del trenino e prendono vita: Al, Mare, Emma. Poi le sbarre si abbassano.
// Si apre dove finisce «spezzaparole» (biglietti sospesi); finisce sul treno intero, con Ada (la riprende «partenza»).
const PS_CAM = [
  { t: 0, cx: 470, cy: 784, z: 3.8 },
  { t: 3.0, cx: 300, cy: 792, z: 3.6 },
  { t: 14.6, cx: 300, cy: 792, z: 3.6 },
  { t: 16.6, cx: 330, cy: 800, z: 7.2 },
  { t: 20.0, cx: 330, cy: 800, z: 7.2 },
  { t: 23.5, cx: 380, cy: 770, z: 2.5 },
];
const PS_SOSPESI = [[402, 770], [446, 756], [490, 770]];
const PS_ATTERRA = [3.0, 4.6, 6.2];
const PS_VITA = [8.4, 10.1, 12.4];
const PS_SBARRE = [20.4, 21.6];
kit.scene('passeggeri', {
  init(kit) {
    const G = window.G, M = G.MONDO, P = G.MOD.mare.passeggeri;
    this.chi = [['al', P.Al.biglietto], ['mare', P.mare.biglietto], ['emma', P.Emma.biglietto]];
    const parole = ['Al', 'mare', 'Emma'];
    let scintille = '';
    for (let i = 0; i < 3; i++) {
      scintille += '<g class="ps-scint" opacity="0">';
      for (let k = 0; k < 8; k++) scintille += '<circle r="2.2" fill="' + G.C.luce + '"/>';
      scintille += '</g>';
    }
    const sopra = '<g class="ps-treno">' + G.treno(this.chi.map(c => ({ tipo: c[0], col: c[1] })), { sbarra: 0 }) + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g transform="' + G.posaAda(M.ada[0], M.ada[1]) + '">' + G.ada('base', 'felice') + '</g>' +
      parole.map(p => '<g class="ps-big"><g transform="translate(-60 -30)">' + G.biglietto(p) + '</g></g>').join('') + scintille;
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'passeggeri',
      html: G.sottotitolo('NARRATORE', 'I biglietti volano sul trenino e, appena toccano i sedili, prendono vita. Al è un sassolino. Mare è un’onda. Ed Emma, nell’ultimo vagone, è una bambina fatta di luce.'),
    });
    this.G = G;
    this.vag = this.m.qa('.ps-treno .g-vag'); this.big = this.m.qa('.ps-big'); this.scint = this.m.qa('.ps-scint');
    this.pass = this.vag.map(v => v.querySelector('.g-pass'));
    const L = this.m.arrivo.getTotalLength();
    G.posaTreno(this.vag, this.m.arrivo, L - (M.fermo - 40));
    // Il sedile di ogni vagone, nel mondo.
    this.sedili = this.vag.map((v, i) => [M.fermo + i * M.passo + 6, 816]);
    this.sub = G.subs(kit, [[0.8, 17.6]]);
  },
  render(t) {
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PS_CAM, t));
    G.animaMondo(m, t + 86);
    G.sbarre(this.vag, i => eio(seg(t, PS_SBARRE[0] + i * 0.3, PS_SBARRE[1] + i * 0.3)));
    this.big.forEach((b, i) => {
      // Dal punto sospeso al sedile, con un arco; poi resta lì finché non prende vita.
      const u = eio(seg(t, PS_ATTERRA[i] - 1.8, PS_ATTERRA[i]));
      const [ax, ay] = PS_SOSPESI[i], [sx, sy] = this.sedili[i];
      const x = lerp(ax, sx, u), y = lerp(ay, sy - 8, u) - 40 * Math.sin(Math.PI * u) + (1 - u) * 2.2 * Math.sin(t * 2 + i);
      const nasce = seg(t, PS_VITA[i] - 0.2, PS_VITA[i] + 0.3);
      const s = 0.3 * lerp(1, 0.75, u) * (1 - nasce * 0.6);
      b.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + ((1 - u) * 6 * Math.sin(t * 1.7 + i) - 8 * u).toFixed(2) + ') scale(' + s.toFixed(3) + ')');
      b.setAttribute('opacity', (1 - nasce).toFixed(3));
      // Il passeggero cresce dal sedile, con qualche scintilla.
      const v = eo(seg(t, PS_VITA[i], PS_VITA[i] + 0.7));
      this.pass[i].setAttribute('opacity', v.toFixed(3));
      this.pass[i].setAttribute('transform', 'translate(140 40) scale(' + lerp(0.5, 1, v).toFixed(3) + ') translate(-140 -40)');
      const sc = seg(t, PS_VITA[i], PS_VITA[i] + 1.2);
      this.scint[i].setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
      [...this.scint[i].children].forEach((c, k) => {
        const a = k * Math.PI / 4 + 0.3, d = 6 + 22 * eo(sc);
        c.setAttribute('cx', (sx + d * Math.cos(a)).toFixed(2));
        c.setAttribute('cy', (sy - 14 + d * Math.sin(a)).toFixed(2));
      });
    });
    this.sub(t);
  },
});
