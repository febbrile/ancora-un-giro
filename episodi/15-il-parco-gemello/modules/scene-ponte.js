const { seg, eo, eio, lerp } = kit;
// Ada attraversa il ponte sul fiume, col quaderno stretto al petto. Dall'altra parte c'è un parco piccolo come il suo: la
// ruota panoramica, la stazione con la sua banchina, lo Spezzaparole, la bancarella della pesca, e la montagna buia con la
// pista che ci sparisce dentro (le sue righe sono verdi). Ada apre il quaderno sul disegno della sua montagna e lo confronta
// curva per curva: è identica. Al cancello c'è un'altra guardiola, con la finestra accesa, e un altro custode: basso e
// tondo, con il gilet a quadri, una lanterna verde e un regolamento rilegato in verde. Titolo: «Il parco gemello».
// Coordinate del parco di Ada (il parco gemello è spostato di G.S2.GEMELLO.dx). Si apre sul ponte; finisce col titolo.
const PO_CAMMINA = [0, 6.4];
const PO_QUADERNO = [8.4, 8.9, 14.6, 15.1];
const PO_CUSTODE = 19.0;
const PO_TITOLO = 24.6;
const PO_CAM = [
  { t: 0, cx: -3000, cy: 760, z: 1.6 },
  { t: 6.4, cx: -3700, cy: 640, z: 0.8 },
  { t: 8.2, cx: -4600, cy: 560, z: 0.62 },
  { t: 15.2, cx: -4600, cy: 560, z: 0.62 },
  { t: 18.4, cx: -3690, cy: 820, z: 3.0 },
  { t: 23.6, cx: -3690, cy: 820, z: 3.0 },
  { t: 25.6, cx: -3800, cy: 700, z: 1.6 },
];
kit.scene('ponte', {
  init(kit) {
    const G = window.G, C = G.C, S2 = G.S2, dx = S2.GEMELLO.dx;
    const [gx, gy] = S2.CANCELLO_GEMELLO;
    this.cuPos = [gx + dx + 46, gy];
    const sopra = '<g class="po-cu"></g><g class="po-ada"></g>';
    // Il quaderno: a sinistra la montagna di Ada, disegnata a matita; a destra, ricalcata in verde, quella di laggiù.
    // La stessa montagna del mondo (G.mondo), a matita: il profilo, le due bocche e la pista che entra in alto ed esce in basso.
    const sketch = '<path d="M872 900 L896 760 Q936 640 1006 560 L1076 468 Q1146 330 1240 282 Q1300 254 1352 300 L1446 404 Q1524 486 1566 604 L1626 760 L1656 900 Z" fill="none" stroke="#3A3570" stroke-width="7" stroke-linejoin="round"/>' +
      '<path d="M600 362 C860 392 1000 420 1048 446" fill="none" stroke="#3A3570" stroke-width="6" stroke-dasharray="14 10"/>' +
      '<path d="M962 818 C910 818 888 796 846 796 L640 796" fill="none" stroke="#3A3570" stroke-width="6" stroke-dasharray="14 10"/>' +
      '<path d="M1026 478 L1026 446 Q1046 410 1076 430 L1084 470 Z M920 872 L920 806 Q950 760 994 794 L1000 872 Z" fill="#3A3570"/>';
    const quaderno = '<g class="po-quad" opacity="0">' + G.quadernoAperto('<g transform="translate(220 160) scale(.62) translate(-600 -240)">' + sketch + '</g>', '<g transform="translate(1004 160) scale(.62) translate(-600 -240)">' + sketch.replace(/#3A3570/g, '#2F7A4A') + '</g>') + '</g>';
    const titolo = '<g class="po-titolo" opacity="0"><g transform="translate(960 290)"><g class="po-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'ponte', manopola: 0, banchina: true, morto: true, bruco: 'acceso', fiume: true, davanti: quaderno + titolo,
      prima: S2.parcoGemello({ bruco: 'acceso' }),
      html: G.sottotitolo('NARRATORE', 'Dall’altra parte del fiume c’è un parco piccolo come quello di Ada. E la montagna è identica.') +
        G.sottotitolo('ADA', 'Stessa pista, stesse curve!'),
    });
    this.G = G;
    const q = this.m.q;
    this.cu = q('.po-cu'); this.ada = q('.po-ada'); this.quad = q('.po-quad'); this.titolo = q('.po-titolo'); this.insegna = q('.po-insegna');
    this.stati = {};
    this.sub = G.subs(kit, [[1.0, 8.8], [15.4, 18.0]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('15', 'ponte', t);
    const G = this.G, S2 = G.S2, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PO_CAM, t));
    G.animaMondo(m, t + 2500);
    const [q0, q1, q2, q3] = PO_QUADERNO;
    this.quad.setAttribute('opacity', (seg(t, q0, q1) * (1 - seg(t, q2, q3))).toFixed(3));
    // Ada attraversa il ponte, poi si ferma sull'altra riva col quaderno aperto.
    const u = eio(seg(t, PO_CAMMINA[0], PO_CAMMINA[1])), ax = lerp(-3000, -3580, u);
    const [f0, f1] = S2.GEMELLO.fiume, pp = Math.max(0, Math.min(1, (ax - f0 + 60) / (f1 - f0 + 120)));
    const ay = Math.min(868, S2.GEMELLO.ponte - 14 * Math.sin(Math.PI * pp)) - (u > 0 && u < 1 ? 4 * Math.abs(Math.sin(t * 8)) : 0);
    const espr = t < 8 ? 'base' : t < 15 ? 'sorpresa' : t < 19 ? 'felice' : 'sorpresa';
    this.cambia('ada', espr, this.ada, '<g class="po-ada-in">' + G.ada('quaderno', espr) + '</g>');
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    // Il custode gemello, al suo cancello: alza la lanterna verde.
    const posa = t >= PO_CUSTODE && t < PO_CUSTODE + 3 ? 'alza' : 'base';
    this.cambia('cu', posa, this.cu, '<g transform="' + G.posaCustode(this.cuPos[0], this.cuPos[1], 0.26) + '">' + G.unico(G.custodeGemello(posa, 'sorriso', { occhi: 1, dondolo: posa === 'alza' ? 6 : 0 }), 'pocu') + '</g>');
    const tit = eo(seg(t, PO_TITOLO, PO_TITOLO + 1.2));
    this.titolo.setAttribute('opacity', tit.toFixed(3));
    this.titolo.setAttribute('transform', 'translate(0 ' + (16 * (1 - tit)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (t > PO_TITOLO - 0.2) this.cambia('ins', turno, this.insegna, G.insegna('Il parco gemello', 1100, 230, +turno));
    this.sub(t);
  },
});
