const { seg, eo, ei, eio, lerp } = kit;
// Ada appoggia il quaderno sul bancone, e il quaderno urta qualcosa: una vecchia manopola d'ottone con una freccia,
// e intorno un arco di lucine (da un lato una sola lucina grande, dall'altro tante lucine piccole). La freccia sta nel
// mezzo. Ada la gira tutta verso la lucina grande, che si accende. Un treno esce dalla montagna: Emma è dello stesso blu,
// ma nella vasca cadono quasi solo paperelle blu, e due turchesi. Ada pesca: blu. Un altro treno: blu. Su due telefoni,
// sotto «Al mare Emma», nuota e ancora nuota.
// Si apre come finisce «pesche» (Ada alla bancarella, il terzo treno in stazione); finisce sui due telefoni.
const MA_CAM = [
  { t: 0, cx: 690, cy: 846, z: 5.2 },
  { t: 1.2, cx: 712, cy: 846, z: 6.2 },
  { t: 13.2, cx: 712, cy: 846, z: 6.2 },
  { t: 14.6, cx: 820, cy: 820, z: 3.0 },
  { t: 16.6, cx: 772, cy: 856, z: 4.0 },
  { t: 22.0, cx: 772, cy: 856, z: 4.0 },
  { t: 23.0, cx: 700, cy: 846, z: 4.6 },
  { t: 25.0, cx: 700, cy: 846, z: 4.6 },
  { t: 26.4, cx: 520, cy: 816, z: 2.8 },
  { t: 28.6, cx: 640, cy: 820, z: 2.6 },
  { t: 30.4, cx: 772, cy: 856, z: 4.0 },
  { t: 34.6, cx: 772, cy: 856, z: 4.0 },
  { t: 35.8, cx: 700, cy: 846, z: 4.6 },
  { t: 37.4, cx: 700, cy: 846, z: 4.6 },
];
const MA_APPOGGIA = [0.4, 1.0];
const MA_VICINO = [2.0, 2.6, 13.0, 13.6];
const MA_MANO = { entra: [9.8, 10.6], gira: [11.0, 12.4], esce: [12.6, 13.2] };
// Il treno rimasto in stazione riparte (mentre guardiamo la manopola).
const MA_PARTE = [3.0, 7.0];
const MA_VEL = [[0, 110], [2.8, 60], [5.4, 60], [6.4, 160], [7.6, 160], [8.8, 0]];
const MA_GIRI = [13.6, 26.6].map((a, n) => ({
  esce: a, vel: MA_VEL.map(([t, v]) => [a + t, v]),
  pesca: { giu: a + 9.2, su: a + 10.2, preso: a + 10.6 }, salta: a + 11.2, vagone: a + 11.6, sale: a + 12.8, via: a + 11.4,
  riparte: n === 0 ? [a + 13.2, a + 16.4] : undefined,
}));
const MA_TEL = [39.4, 40.0, 41.2];
kit.scene('manopola', {
  init(kit) {
    const G = window.G, M = G.MONDO, C = G.C, D = G.MOD.mare, P = D.passeggeri, MN = G.MOD.manopola;
    const chi = [['al', P.Al], ['mare', P.mare], ['emma', P.Emma]].map(([tipo, x]) => ({ tipo, biglietto: x.biglietto, uscita: x.tratti[2] }));
    this.giri = MA_GIRI.map((T, n) => G.pescata({ id: 'ma' + n, chi, vasca: MN.vasche.stretta, parola: 'nuota', nuovo: MN.nuovo.nuota, t: T }));
    // Il treno dell'ultima pesca, con la paperella verde, è ancora in stazione: riparte.
    const vecchio = chi.map(c => ({ tipo: c.tipo, col: c.biglietto })).concat([{ tipo: 'paperella', col: MN.nuovo.corre }]);
    const quaderno = '<g class="ma-quad" opacity="0"><rect x="-13" y="-4" width="26" height="5" rx="1.5" fill="#2F6F73" stroke="#1E4A4D" stroke-width="1"/><rect x="-11" y="-5" width="22" height="2" fill="' + C.crema + '"/></g>';
    const sopra = '<g class="ma-vecchio">' + G.treno(vecchio, { sbarra: 1 }) + '</g>' + this.giri.map(g => g.treno).join('') +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      quaderno + '<g class="ma-ada"></g>' + this.giri.map(g => g.mano).join('');
    // La manopola da vicino: il bancone di legno, la manopola grande, la mano di Ada che la gira.
    let venature = '';
    for (let k = 0; k < 9; k++) venature += '<path d="M-100 ' + (180 + k * 110) + ' Q600 ' + (150 + k * 110) + ' 2020 ' + (200 + k * 110) + '" stroke="' + C.legnoScuro + '" stroke-width="5" fill="none" opacity=".35"/>';
    const vicino = '<g class="ma-vicino" opacity="0"><rect x="-200" y="-200" width="2320" height="1480" fill="' + C.legno + '"/>' + venature +
      '<rect x="-200" y="-200" width="2320" height="210" fill="' + C.legnoScuro + '"/>' +
      '<g transform="translate(120 800) rotate(-8)"><rect width="520" height="360" rx="20" fill="#2F6F73" stroke="#1E4A4D" stroke-width="8"/><rect x="16" y="-12" width="488" height="24" fill="' + C.crema + '"/></g>' +
      '<g class="ma-grande" transform="translate(960 540) scale(3.6)"></g>' +
      '<g class="ma-mano"><path d="M80 40 L360 300 L240 420 L-20 150 Z" fill="#FBFAF6" stroke="#2E2A26" stroke-width="6" stroke-linejoin="round"/>' +
      '<ellipse cx="20" cy="70" rx="78" ry="62" fill="#C98B63"/><ellipse cx="-34" cy="30" rx="30" ry="22" fill="#C98B63" transform="rotate(-30 -34 30)"/></g></g>';
    const MURI = [{}, { muro: ['#203A3F', '#35585A', '#3D5E6E'] }];
    const pannello = k => {
      const z = 0.95, tx = 480 - 947 * z, ty = 540 - 522 * z;
      return '<g transform="translate(' + (k * 960) + ' 0)"><clipPath id="g-ma-pan' + k + '"><rect width="960" height="1080"/></clipPath><g clip-path="url(#g-ma-pan' + k + ')">' +
        '<g transform="translate(' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ') scale(' + z + ')">' + G.salotto('<g>' + G.telefono({ messaggi: ['Al mare Emma'] }) + '</g><g class="ma-risposta" opacity="0">' + G.telefono({ messaggi: ['Al mare Emma'], rispostaTesto: 'nuota' }) + '</g>', MURI[k]) + '</g></g></g>';
    };
    const tel = '<g class="ma-tel" opacity="0">' + pannello(0) + pannello(1) + '<path d="M960 -10 L960 1090" stroke="#05070F" stroke-width="12"/></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'manopola', manopola: 0, davanti: vicino + tel,
      html: G.sottotitolo('NARRATORE', 'Sul bancone della bancarella c’è una vecchia manopola. È sempre stata lì, con la freccia nel mezzo.') +
        G.sottotitolo('NARRATORE', 'Ada la gira da un lato. Il treno fa lo stesso giro, ed Emma esce dello stesso blu.') +
        G.sottotitolo('NARRATORE', 'Ma nella vasca cadono quasi solo paperelle blu.') +
        G.sottotitolo('ADA', 'Nuota… e ancora nuota.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.giri.map(g => g.papere).join(''));
    this.giri.forEach(g => g.monta(this.m));
    this.G = G;
    this.vecchio = this.m.qa('.ma-vecchio .g-vag');
    this.ada = this.m.q('.ma-ada'); this.quad = this.m.q('.ma-quad');
    this.manWorld = this.m.q('.g-manopola'); this.manBase = this.manWorld.getAttribute('transform');
    this.vicino = this.m.q('.ma-vicino'); this.grande = this.m.q('.ma-grande'); this.mano = this.m.q('.ma-mano');
    this.tel = this.m.q('.ma-tel'); this.risposte = this.m.qa('.ma-risposta');
    this.stato = ''; this.statoMan = '';
    this.sub = G.subs(kit, [[2.0, 10.4], [13.4, 20.4], [20.8, 24.8], [37.8, 40.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('03', 'manopola', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(MA_CAM, t));
    G.animaMondo(m, t + 1060);
    // Il treno di prima riparte e sparisce nella montagna.
    const sv = lerp(640 - M.fermo, 2400, ei(seg(t, MA_PARTE[0], MA_PARTE[1])));
    G.posaTreno(this.vecchio, m.partenza, sv);
    G.nascondiInMontagna(this.vecchio, m.partenza, sv, { fine: true });
    // La manopola: urtata dal quaderno trema; poi Ada la gira tutta verso la lucina grande.
    const pos = -eio(seg(t, MA_MANO.gira[0], MA_MANO.gira[1]));
    const pq = Math.round(pos * 40) / 40;
    if (String(pq) !== this.statoMan) { const html = G.manopola(pq); this.manWorld.innerHTML = html; this.grande.innerHTML = html; this.statoMan = String(pq); }
    const urto = Math.sin(Math.PI * seg(t, MA_APPOGGIA[1], MA_APPOGGIA[1] + 0.5)) * Math.sin(t * 40);
    this.manWorld.setAttribute('transform', this.manBase + ' rotate(' + (6 * urto).toFixed(2) + ')');
    // Il quaderno, appoggiato sul bancone.
    const qa = eo(seg(t, MA_APPOGGIA[0], MA_APPOGGIA[1]));
    this.quad.setAttribute('opacity', t >= MA_APPOGGIA[0] ? 1 : 0);
    this.quad.setAttribute('transform', 'translate(' + lerp(686, 704, qa).toFixed(2) + ' ' + lerp(852, 830, qa).toFixed(2) + ')');
    // Da vicino: la manopola grande e la mano di Ada che entra, la gira e se ne va.
    this.vicino.setAttribute('opacity', (seg(t, MA_VICINO[0], MA_VICINO[1]) * (1 - seg(t, MA_VICINO[2], MA_VICINO[3]))).toFixed(3));
    const dentro = eio(seg(t, MA_MANO.entra[0], MA_MANO.entra[1])) * (1 - eio(seg(t, MA_MANO.esce[0], MA_MANO.esce[1])));
    const ang = 62 * pos, ar = (ang - 90) * Math.PI / 180;
    const hx = 960 + 150 * Math.cos(ar) + 30, hy = 540 + 150 * Math.sin(ar) + 40;
    this.mano.setAttribute('transform', 'translate(' + lerp(1700, hx, dentro).toFixed(1) + ' ' + lerp(1300, hy, dentro).toFixed(1) + ') rotate(' + (ang * 0.6).toFixed(1) + ')');
    // Le due uscite; Ada segue quella in corso.
    let giu = 0, n = -1;
    this.giri.forEach((g, k) => { const x = g.render(t); if (t >= MA_GIRI[k].esce - 0.5) { n = k; giu = x; } });
    let posa = 'base', espr = 'base';
    if (n < 0) { posa = t < MA_APPOGGIA[0] ? 'quaderno' : 'base'; espr = t < 2 ? 'sorpresa' : t < 11 ? 'pensa' : 'felice'; }
    else {
      const T = MA_GIRI[n], pesca = t >= T.pesca.giu - 1.2 && t < T.salta + 1.6;
      posa = pesca ? 'pesca' : 'base';
      espr = t < T.pesca.giu - 0.6 ? (n === 0 && t > 19 ? 'sorpresa' : 'base') : t < T.pesca.preso ? 'chiusi' : n === 1 ? 'felice' : 'sorpresa';
    }
    const k = posa + espr + giu;
    if (k !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(posa, espr, { giu }) + '</g>'; this.stato = k; }
    // Due telefoni: sotto «Al mare Emma», nuota, e ancora nuota.
    this.tel.setAttribute('opacity', seg(t, MA_TEL[0], MA_TEL[1]).toFixed(3));
    this.risposte.forEach((r, i) => r.setAttribute('opacity', eo(seg(t, MA_TEL[1] + 0.3 + i * 0.7, MA_TEL[1] + 0.7 + i * 0.7)).toFixed(3)));
    this.sub(t);
  },
});
