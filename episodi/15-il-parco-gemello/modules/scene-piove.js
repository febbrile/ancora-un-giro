const { seg, eo, eio, lerp } = kit;
// Arriva una striscia: «Domani piove?». Il treno fa il suo giro ed esce sopra la vasca: paperelle sparse, di tutti i
// colori, come nel parco di Ada prima della teleferica. Ada guarda la collina, dove non c'è nessuna cabina. Pesca una
// marrone; sul telefono, «No». Ada guarda il cielo: oltre le colline, nuvole scure.
// Coordinate del parco gemello. Si apre sul cielo; finisce sulle nuvole (la riprende «nomi», sul ponte).
const PV_VOLO = [0.2, 2.6];
const PV_GIRO = { esce: 3.0, vel: [[3.0, 600], [4.4, 600], [4.8, 80], [9.0, 80], [9.6, 360]], pesca: { giu: 10.4, su: 11.1, preso: 11.4 }, via: 11.8 };
const PV_CASA = [12.4, 12.8, 16.4, 16.8], PV_ARRIVA = 13.4;
const PV_CAM = [
  { t: 0, cx: 2000, cy: 640, z: 1.3 },
  { t: 2.79, cx: 1300, cy: 820, z: 1.6 },
  { t: 2.8, cx: 740, cy: 846, z: 3.6 },
  { t: 5.6, cx: 740, cy: 846, z: 3.6 },
  { t: 7.0, cx: 1700, cy: 600, z: 1.1 },
  { t: 8.6, cx: 1700, cy: 600, z: 1.1 },
  { t: 9.8, cx: 740, cy: 846, z: 3.6 },
  { t: 16.8, cx: 740, cy: 846, z: 3.6 },
  { t: 19.0, cx: 1500, cy: 450, z: 0.8 },
];
function pvBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('piove', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, PV = G.MOD.seconda.gemello.piove;
    this.giro = G.giro7({ id: 'pv', chi: S2.trenoDa(PV.frase, PV.tratti), vasca: PV.vasca, seme: 307, parola: PV.pescata, fermo: G.fermoTreno(10), t: PV_GIRO });
    const sopra = S2.nuvolePioggia(false, [2400, 200]) + '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.giro.treno + '<g class="pv-ada"></g>' + this.giro.mano + '<g class="pv-nastro"></g>';
    const casa = '<g class="pv-casa" opacity="0"><g class="pv-casa-cam">' + G.salotto('<g class="pv-tel"></g>', { muro: ['#3A2E1E', '#5A4630', '#6E5C3E'] }) + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'piove', manopola: 0, banchina: true, morto: true, gemello: true, fiume: -S2.GEMELLO.dx, bruco: 'acceso', davanti: casa,
      html: G.sottotitolo('NARRATORE', 'Qui non parte nessuna cabina. La risposta viene solo dalla vasca.') +
        G.sottotitolo('ADA', 'E da qui la pioggia non si vede.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.giro.papere);
    this.giro.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.ada = q('.pv-ada'); this.nastroEl = q('.pv-nastro'); this.casa = q('.pv-casa'); this.casaCam = q('.pv-casa-cam'); this.tel = q('.pv-tel');
    const pts = [];
    for (let i = 0; i <= 80; i++) pts.push(pvBez([[2700, 260], [2300, 220], [1400, 600], [600, 760]], i / 80));
    this.volo = G.linea(pts);
    this.stati = {};
    this.sub = G.subs(kit, [[5.2, 10.8], [19.0, 22.0]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('15', 'piove', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PV_CAM, t));
    G.animaMondo(m, t + 2680);
    const r = this.giro.render(t);
    // La striscia «Domani piove?» in volo, verso la stazione.
    let nastro = '';
    if (t >= PV_VOLO[0] && t < PV_VOLO[1]) {
      const A = this.volo.lung * eo(seg(t, PV_VOLO[0], PV_VOLO[1]));
      nastro = G.nastro(this.volo, A - 150, A, ['Domani', 'piove', '?'].map((w, i) => [w, A - (2 - i + 0.5) * 50]), 16, { onda: s => 6 * Math.sin((A - s) * 0.05 - t * 6) * (A - s) / 150 });
    }
    this.cambia('nastro', nastro, this.nastroEl, nastro);
    // Ada: guarda la vasca, poi la collina vuota; pesca; poi guarda il cielo.
    const P = PV_GIRO.pesca, pesca = t >= P.giu - 0.8 && t < P.preso + 0.8;
    const espr = pesca ? (t < P.preso + 0.1 ? 'chiusi' : 'sorpresa') : t > 16.8 ? 'pensa' : 'base';
    this.cambia('ada', (pesca ? 'p' : 'q') + espr + (pesca ? r.giu : 0), this.ada, '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(pesca ? 'pesca' : 'quaderno', espr, { giu: pesca ? r.giu : 0 }) + '</g>');
    // La casa: sotto «Domani piove?», «No».
    const [c0, c1, c2, c3] = PV_CASA;
    this.casa.setAttribute('opacity', (seg(t, c0, c1) * (1 - seg(t, c2, c3))).toFixed(3));
    if (t > c0 && t < c3) {
      const arrivata = t >= PV_ARRIVA, k = arrivata ? 'r' : (Math.round(t * 30) / 30).toFixed(3);
      this.cambia('tel', k, this.tel, G.unico(G.telefono({ chat: [['io', 'Domani piove?']].concat(arrivata ? [['ai', 'No']] : []), puntini: arrivata ? undefined : t }), 'pvtel'));
      const z = lerp(1.04, 1.1, seg(t, c0, c3)), [bx, by] = G.SALOTTO.bolla;
      this.casaCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')');
    }
    this.sub(t);
  },
});
