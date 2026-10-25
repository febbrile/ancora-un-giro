const { seg, eo, eio, lerp } = kit;
// Alla stazione vuota (il treno è in giro), Ada si siede sulla panchina e il custode, in piedi accanto a lei, le mostra l'orologio da tasca: sopra, al
// posto della corona, c'è una campanella d'ottone piccola come un ditale. Poi apre il regolamento su una pagina con il
// disegno di un trenino che fa il giro della pista, più volte, e di una campanella. Nessun numero, nessuna scritta.
// Si apre sulla stazione; finisce sul custode col regolamento (la riprende «primo»).
const OR_PANCHINA = [300, 836], OR_CU = [388, 836];
const OR_ARRIVA = [0, 2.6];
const OR_OROLOGIO = [3.6, 4.1, 11.0, 11.5], OR_MOSTRA = [2.8, 11.6];
const OR_PAGINA = [13.0, 13.5, 19.0, 19.5], OR_APRE = 12.0;
const OR_CAM = [
  { t: 0, cx: 420, cy: 790, z: 2.8 },
  { t: 2.8, cx: 344, cy: 800, z: 4.6 },
  { t: 12.0, cx: 344, cy: 800, z: 4.6 },
  { t: 20.0, cx: 344, cy: 800, z: 4.6 },
  { t: 22.0, cx: 360, cy: 796, z: 5.4 },
];
kit.scene('orologio', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2;
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g transform="translate(' + OR_PANCHINA[0] + ' ' + OR_PANCHINA[1] + ') scale(.5)">' + S2.panchina() + '</g><g class="or-ada"></g><g class="or-cu"></g>';
    const fondo = '<rect x="-200" y="-200" width="2320" height="1480" fill="#141026"/><circle cx="960" cy="560" r="620" fill="' + C.luce + '" opacity=".12" filter="url(#g-velo)"/>';
    const orologio = '<g class="or-orologio" opacity="0">' + fondo + '<g transform="translate(960 600) scale(2.6)"><g class="or-quadrante"></g></g></g>';
    const pagina = '<g class="or-pagina" opacity="0">' + fondo + '<g transform="translate(960 560) scale(7.4) translate(-120 -262)">' + G.libroAperto(120, 262, 'campanella') + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'orologio', manopola: 0, banchina: true, morto: true, bruco: 'acceso', davanti: orologio + pagina,
      html: G.sottotitolo('NARRATORE', 'Il regolamento dice quanti giri può fare una risposta. Il custode li conta sull’orologio.') +
        G.sottotitolo('CUSTODE', 'Quando i giri sono finiti, suona la campanella.'),
    });
    this.G = G;
    const q = this.m.q;
    this.ada = q('.or-ada'); this.cu = q('.or-cu'); this.orologio = q('.or-orologio'); this.quadrante = q('.or-quadrante'); this.pagina = q('.or-pagina');
    this.stati = {};
    this.sub = G.subs(kit, [[4.0, 11.6], [19.8, 23.8]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('13', 'orologio', t);
    const G = this.G, S2 = G.S2, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(OR_CAM, t));
    G.animaMondo(m, t + 1960);
    // L'orologio, da vicino: la campanella brilla un momento.
    const [o0, o1, o2, o3] = OR_OROLOGIO;
    this.orologio.setAttribute('opacity', (seg(t, o0, o1) * (1 - seg(t, o2, o3))).toFixed(3));
    const suona = Math.round(8 * Math.sin((t - 6) * 9) * Math.sin(Math.PI * seg(t, 6.0, 7.4)));
    if (t > o0 && t < o3) this.cambia('q', suona, this.quadrante, S2.orologio({ lancetta: 0, suona }));
    const [p0, p1, p2, p3] = OR_PAGINA;
    this.pagina.setAttribute('opacity', (seg(t, p0, p1) * (1 - seg(t, p2, p3))).toFixed(3));
    // Il custode: arriva con Ada; mostra l'orologio; apre il regolamento.
    const u = eio(seg(t, OR_ARRIVA[0], OR_ARRIVA[1])), cx = lerp(560, OR_CU[0], u), cammina = u > 0 && u < 1;
    const posa = t >= OR_MOSTRA[0] && t < OR_MOSTRA[1] ? 'orologio' : t >= OR_APRE ? 'legge' : 'base';
    this.cambia('cu', posa, this.cu, '<g class="or-cu-in">' + G.unico(G.custode(posa, 'serio', { occhi: -1, campanella: true, pagina: 'campanella' }), 'orcu') + '</g>');
    this.cu.firstChild.setAttribute('transform', G.posaCustode(cx, OR_CU[1] - (cammina ? 3 * Math.abs(Math.sin(t * 6)) : 0)));
    // Ada: arriva, si siede sulla panchina, guarda.
    const sedu = t >= OR_ARRIVA[1], ax = lerp(610, OR_PANCHINA[0], u);
    const espr = t < 4 ? 'base' : t < 12 ? 'sorpresa' : 'pensa';
    this.cambia('ada', sedu + espr, this.ada, '<g class="or-ada-in">' + (sedu ? G.adaSeduta('quaderno', espr, { testa: 8 }) : G.ada('quaderno', espr)) + '</g>');
    this.ada.firstChild.setAttribute('transform', sedu ? G.posaAda(OR_PANCHINA[0], OR_PANCHINA[1] - 10) : G.posaAda(ax, OR_CU[1] - (cammina ? 4 * Math.abs(Math.sin(t * 8)) : 0)));
    this.sub(t);
  },
});
