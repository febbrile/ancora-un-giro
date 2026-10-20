const { seg, eo, eio, lerp } = kit;
// Dall'altra parte della collina, fino all'orizzonte, una pianura di luci: le strisce arrivano da tutte le direzioni, da
// una città che non finisce mai, verso un parco come quello di Ada, ma immenso. La camera lo attraversa: la stazione
// lunga come una strada e lo Spezzaparole alto come un palazzo, con la forbice che non si ferma mai; i treni che partono
// uno dopo l'altro, senza nessuno alla guida, alcuni così lunghi che non se ne vede la fine; la montagna fatta di tante
// cime in fila, che si perdono tra le nuvole; in fondo la vasca grande come un lago, che luccica. Ada, in cima alla
// collina, apre la bocca e non dice niente.
// Si apre come finisce «collina», alle spalle di Ada; finisce su Ada in cima alla collina (la riprende «frase»).
const IM_P = window.G.PARCO;
const IM_CAM = [
  { t: 0, cx: 2950, cy: 430, z: 1.0 },
  { t: 1.0, cx: 2950, cy: 430, z: 1.0 },
  { t: 5.4, cx: 5560, cy: 560, z: 0.3 },
  { t: 8.0, cx: 5620, cy: 560, z: 0.3 },
  IM_P.chiave(10.6, 400, 740, 1.0),
  IM_P.chiave(12.6, 520, 760, 1.0),
  IM_P.chiave(15.8, 2300, 780, 0.75),
  IM_P.chiave(18.8, 3400, 320, 0.42),
  IM_P.chiave(21.8, 3900, -1150, 0.42),
  IM_P.chiave(27.4, 5800, -400, 0.33),
  IM_P.chiave(30.2, 6450, 940, 0.9),
  IM_P.chiave(33.2, 6350, 950, 0.95),
  { t: 33.4, cx: 2570, cy: 500, z: 3.0, da: 33.39 },
  { t: 36, cx: 2565, cy: 505, z: 3.1 },
];
// Il treno lunghissimo (il quinto del giro) parte quando la camera arriva alla stazione.
const IM_LUNGO = [4, 380, 11.0];
const IM_ADA = [2550, 558];
kit.scene('immenso', {
  init(kit) {
    const G = window.G;
    this.m = G.costruisciPaesaggio(kit, '<g class="im-ada"></g>', {
      pre: 'immenso', laggiu: 1, manopola: 0, banchina: true, morto: true, treni: true,
      html: G.sottotitolo('NARRATORE', 'Laggiù c’è un parco come quello di Ada. Ma immenso.') +
        G.sottotitolo('NARRATORE', 'Lo Spezzaparole è alto come un palazzo, e i treni partono senza fermarsi mai.') +
        G.sottotitolo('NARRATORE', 'La montagna è una sola, fatta di tante cime in fila, fino alle nuvole. Dentro, gli scambi sono più delle stelle in cielo.') +
        G.sottotitolo('NARRATORE', 'E la vasca è grande come un lago.'),
    });
    this.G = G;
    this.fase = IM_P.quando(IM_LUNGO[0], IM_LUNGO[1], IM_LUNGO[2]);
    this.ada = this.m.q('.im-ada');
    this.stato = '';
    this.sub = G.subs(kit, [[1.5, 6.5], [8.6, 15.4], [16.6, 28.2], [29.6, 33.2]]);
  },
  render(t, kit) {
    t = window.G.tempo('09', 'immenso', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(IM_CAM, t));
    G.animaPaesaggio(m, t + this.fase, { treni: true, biglietti: true });
    // Ada, in cima: a bocca aperta, senza dire niente; ogni tanto si alza in punta di piedi per vedere meglio.
    const espr = t < 33 ? 'sorpresa' : 'sorpresa';
    if (espr !== this.stato) { this.ada.innerHTML = '<g class="im-ada-in">' + G.ada('quaderno', espr) + '</g>'; this.stato = espr; }
    const punta = 4 * Math.max(0, Math.sin(t * 1.3)) * seg(t, 1.0, 2.0);
    this.ada.firstChild.setAttribute('transform', G.posaAda(IM_ADA[0], IM_ADA[1] - punta));
    this.sub(t);
  },
});
