const { seg, eo, eio, lerp } = kit;
// Ada corre alla guardiola. Il custode sfoglia il regolamento fino a una pagina con il disegno di una cabina appesa a un
// filo. Fuori, sulla collina dietro la ruota panoramica, si accende un pilone: un filo parte dal parco, dal palo accanto
// alla guardiola, sale oltre le colline e sparisce tra le nuvole. Sul filo è appesa una cabina viola. Il custode prende dal
// cassetto della guardiola una bandierina turchese e la attacca alla frase del parco, dietro «Storie di mare».
// Si apre sulla strada verso la guardiola; finisce sul custode con la frase del parco (la riprende «viola»).
const PG_CU = [1784, 872], PG_ADA = [1734, 874];
const PG_CORRE = [0.2, 2.6];
const PG_APRE = 3.0, PG_LIBRO = [4.4, 4.9, 8.0, 8.5];
const PG_LUCE = [9.0, 9.8], PG_FILO = [9.4, 12.6], PG_CABINA = [12.0, 12.8];
const PG_CASSETTO = [21.4, 22.6], PG_ATTACCA = 24.0;
const PG_CAM = [
  { t: 0, cx: 1640, cy: 830, z: 2.4 },
  { t: 2.6, cx: 1770, cy: 830, z: 3.6 },
  { t: 8.6, cx: 1770, cy: 830, z: 3.6 },
  { t: 10.6, cx: 2380, cy: 470, z: 0.74 },
  { t: 15.6, cx: 2380, cy: 470, z: 0.74 },
  { t: 17.0, cx: 1780, cy: 830, z: 3.8 },
  { t: 22.6, cx: 1780, cy: 830, z: 3.8 },
  { t: 23.6, cx: 1766, cy: 818, z: 5.6 },
];
kit.scene('pagina', {
  init(kit) {
    const G = window.G, C = G.C, S2 = G.S2;
    const libro = '<g class="pg-libro" opacity="0"><rect x="-200" y="-200" width="2320" height="1480" fill="#141026"/>' +
      '<circle cx="960" cy="560" r="620" fill="' + C.luce + '" opacity=".12" filter="url(#g-velo)"/>' +
      '<g transform="translate(960 560) scale(7.4) translate(-120 -262)">' + G.libroAperto(120, 262, 'teleferica') + '</g></g>';
    const sopra = '<g class="pg-tel"></g><g class="pg-cabina"></g><g class="pg-ada"></g><g class="pg-cu"></g><g class="pg-nastro"></g>' +
      '<g class="pg-scint" opacity="0">' + [0, 1, 2, 3, 4, 5].map(() => '<circle r="1.1" fill="' + C.luce + '"/>').join('') + '</g>';
    this.m = G.costruisciPaesaggio(kit, sopra, {
      pre: 'pagina', laggiu: 1, manopola: 0, banchina: true, morto: true, bruco: 'acceso', strisce: 0, davanti: libro,
      html: G.sottotitolo('NARRATORE', 'Una cabina appesa a un filo, che esce dal parco, passa oltre le colline e torna.') +
        G.sottotitolo('CUSTODE', 'Da stasera la teleferica è aperta. Lo dice il regolamento.') +
        G.sottotitolo('NARRATORE', 'E alla frase del parco il custode attacca una bandierina turchese.'),
    });
    this.G = G;
    const q = this.m.q;
    this.tel = q('.pg-tel'); this.cabina = q('.pg-cabina'); this.ada = q('.pg-ada'); this.cu = q('.pg-cu'); this.nastroEl = q('.pg-nastro');
    this.scint = q('.pg-scint'); this.libro = q('.pg-libro');
    this.stati = {};
    this.sub = G.subs(kit, [[9.0, 15.8], [16.4, 21.4], [22.0, 27.8]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('12', 'pagina', t);
    const G = this.G, S2 = G.S2, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PG_CAM, t));
    G.animaPaesaggio(m, t + 520, { treni: true });
    // La teleferica si accende: le lampadine del pilone, poi il filo dal basso, poi la cabina.
    const luce = Math.round(eio(seg(t, PG_LUCE[0], PG_LUCE[1])) * 10) / 10, filo = Math.round(eo(seg(t, PG_FILO[0], PG_FILO[1])) * 40) / 40;
    this.cambia('tel', luce + '|' + filo, this.tel, luce > 0 || filo > 0 ? S2.teleferica({ luce, filo }) : '');
    const [px, py] = S2.puntoCabina(0.015), cab = eio(seg(t, PG_CABINA[0], PG_CABINA[1]));
    this.cambia('cab', cab > 0 ? 'c' : '', this.cabina, cab > 0 ? '<g transform="translate(' + px.toFixed(1) + ' ' + py.toFixed(1) + ')">' + S2.cabina({}) + '</g>' : '');
    this.cabina.setAttribute('opacity', cab.toFixed(3));
    // Il regolamento, da vicino.
    const [l0, l1, l2, l3] = PG_LIBRO;
    this.libro.setAttribute('opacity', (seg(t, l0, l1) * (1 - seg(t, l2, l3))).toFixed(3));
    // Il custode: apre il regolamento; poi dal cassetto prende la bandierina e la attacca alla frase del parco.
    let posa = 'base', espr = 'serio', occhi = 0;
    if (t >= PG_APRE && t < 16.0) { posa = 'legge'; occhi = t < 9 ? 0 : 1; }
    else if (t >= 16.0 && t < PG_CASSETTO[0]) { posa = 'base'; espr = 'base'; occhi = -1; }
    else if (t >= PG_CASSETTO[0]) { posa = 'porge'; occhi = 0; }
    const dond = Math.round(5 * Math.sin(t * 2));
    this.cambia('cu', posa + espr + occhi + dond, this.cu, '<g transform="' + G.posaCustode(PG_CU[0], PG_CU[1]) + '">' + G.unico(G.custode(posa, espr, { occhi, dondolo: dond, pagina: 'teleferica' }), 'pgcu') + '</g>');
    // La frase del parco, tenuta in mano; la bandierina turchese che si aggiunge in fondo.
    let nastro = '';
    const [hx, hy] = G.puntoCustode(PG_CU[0], PG_CU[1], G.CUSTODE_MANI.porge);
    if (t >= PG_CASSETTO[0]) {
      const u = eo(seg(t, PG_CASSETTO[0], PG_CASSETTO[0] + 0.5)), turchese = eo(seg(t, PG_ATTACCA - 0.2, PG_ATTACCA + 0.2));
      const parole = ['⚑oro', 'Storie', 'di', 'mare'].concat(turchese > 0.5 ? ['⚑turchese'] : []);
      const lung = (parole.length * 15 + 6) * u, ln = G.linea([[hx - 2, hy - 2], [hx - 2 + lung, hy - 4]]);
      nastro = G.nastro(ln, 0, lung, parole.map((w, i) => [w, 8 + i * 15]), 9, {});
    }
    this.cambia('nastro', nastro, this.nastroEl, nastro);
    const sc = seg(t, PG_ATTACCA, PG_ATTACCA + 0.8), sx = hx + 70, sy = hy - 4;
    this.scint.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
    if (sc > 0 && sc < 1) [...this.scint.children].forEach((c, k) => { const an = k * Math.PI / 3, d = 2 + 8 * eo(sc); c.setAttribute('cx', (sx + d * Math.cos(an)).toFixed(2)); c.setAttribute('cy', (sy + d * Math.sin(an)).toFixed(2)); });
    // Ada: arriva di corsa; guarda la pagina; guarda la collina; guarda la bandierina.
    const corre = eio(seg(t, PG_CORRE[0], PG_CORRE[1]));
    const ax = lerp(1560, PG_ADA[0], corre), ay = PG_ADA[1] - (corre > 0 && corre < 1 ? 5 * Math.abs(Math.sin(t * 9)) : 0);
    const espA = t < 3 ? 'base' : t < 9 ? 'sorpresa' : t < 16 ? 'felice' : 'base';
    this.cambia('ada', espA, this.ada, '<g class="pg-ada-in">' + G.ada('base', espA) + '</g>');
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    this.sub(t);
  },
});
