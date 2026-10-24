const { seg, eo, eio, lerp } = kit;
// In tutti e due i parchi le sbarre si abbassano e i treni ripartono, identici: prima laggiù, poi nel parco di Ada. Ada si
// alza dal ponte e lo riattraversa, verso casa.
// Coordinate del parco di Ada (il parco gemello è spostato di G.S2.GEMELLO.dx). Si apre sulla stazione di laggiù; finisce
// sulla riva di Ada (la riprende «cancello», al cancello del suo luna park).
const TR_PARTE = [1.0, 5.4], TR_SBARRE = 0.6;
const TR_ALZA = 9.6, TR_CAMMINA = [10.2, 15.0];
const TR_CAM = [
  { t: 0, cx: 380 - 5700, cy: 790, z: 2.4 },
  { t: 4.39, cx: 60 - 5700, cy: 780, z: 2.0 },
  { t: 4.4, cx: 380, cy: 790, z: 2.4 },
  { t: 8.79, cx: 60, cy: 780, z: 2.0 },
  { t: 8.8, cx: -3220, cy: 800, z: 3.4 },
  { t: 10.2, cx: -3220, cy: 800, z: 3.4 },
  { t: 15.0, cx: -2800, cy: 760, z: 2.2 },
  { t: 16.4, cx: -2760, cy: 760, z: 2.2 },
];
kit.scene('treni', {
  init(kit) {
    const G = window.G, M = G.MONDO, S2 = G.S2, dx = S2.GEMELLO.dx;
    // Due treni: quello di laggiù («Storie di parco») e quello di Ada («Storie di mare»), stessa pista, stessa partenza.
    this.chi = [S2.treno(G.MOD.seconda.gemello.laggiu), S2.treno(G.MOD.seconda.bruco.giro)];
    this.fermo = this.chi.map(c => G.fermoTreno(c.length + 1));
    const treno = (c, k) => '<g class="tr-treno' + k + '"' + (k === 0 ? ' transform="translate(' + dx + ' 0)"' : '') + '>' + G.treno(c.map(p => ({ tipo: p.tipo, col: p.biglietto, o: p.o })), { sbarra: 1 }) + '</g>';
    const sopra = '<g transform="translate(' + dx + ' 0)' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300).replace(/^/, ' ') + '">' + G.spezzaparole({}) + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.chi.map(treno).join('') + '<g class="tr-ada"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'treni', manopola: 0, banchina: true, morto: true, bruco: 'acceso', fiume: true,
      prima: S2.parcoGemello({ bruco: 'acceso' }),
      html: G.sottotitolo('NARRATORE', 'La montagna fa sempre lo stesso giro. Chi sale, chi controlla, come si pesca e cosa si va a prendere fuori lo fa il parco, e cambia da un parco all’altro.'),
    });
    this.G = G;
    this.vag = [0, 1].map(k => this.m.qa('.tr-treno' + k + ' .g-vag'));
    this.ada = this.m.q('.tr-ada');
    this.stati = {};
    this.sub = G.subs(kit, [[0.8, 13.8]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('15', 'treni', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(TR_CAM, t));
    G.animaMondo(m, t + 2760);
    // I due treni: le sbarre si abbassano, il treno parte e sparisce nella montagna.
    TR_PARTE.forEach((p, k) => {
      const f = this.fermo[k], v = this.vag[k], vel = [[p, 0], [p + 0.8, 240], [p + 2.4, 700]];
      const sp = G.percorso(t, 640 - f, vel), passo = lerp(M.passoBanchina, M.passo, seg(sp, 640 - f, 640 - f + 150));
      G.posaTreno(v, m.partenza, sp, null, passo);
      G.nascondiInMontagna(v, m.partenza, sp, { fine: true, passo });
      G.sbarre(v, i => eio(seg(t, p - TR_SBARRE + i * 0.03, p - TR_SBARRE + 0.5 + i * 0.03)));
    });
    // Ada, seduta sul ponte: si alza e torna verso la sua riva.
    const seduta = t < TR_ALZA, u = eio(seg(t, TR_CAMMINA[0], TR_CAMMINA[1])), muove = u > 0 && u < 1;
    const ax = lerp(-3270, -2760, u), [f0, f1] = G.S2.GEMELLO.fiume, pp = Math.max(0, Math.min(1, (ax - f0 + 60) / (f1 - f0 + 120)));
    const ay = seduta ? 852 : Math.min(868, G.S2.GEMELLO.ponte - 14 * Math.sin(Math.PI * pp)) - (muove ? 4 * Math.abs(Math.sin(t * 8)) : 0);
    const espr = t > 12 ? 'felice' : 'base';
    this.cambia('ada', seduta + espr, this.ada, '<g class="tr-ada-in">' + (seduta ? G.adaSeduta('quaderno', espr, {}) : G.ada('quaderno', espr)) + '</g>');
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    this.sub(t);
  },
});
