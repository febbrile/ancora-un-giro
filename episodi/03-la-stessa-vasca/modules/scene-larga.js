const { seg, eo, ei, eio, lerp } = kit;
// Ada gira la manopola tutta dall'altra parte, verso le lucine piccole, che si accendono una dopo l'altra. Arriva un altro
// treno, con un'altra Emma blu come sempre; sotto di lei cadono paperelle di tutti i colori, quasi alla pari. Ada pesca
// a occhi chiusi: una paperella verde chiaro. Sul telefono, sotto «Al mare Emma», compare «altalena». Ada fa una smorfia.
// Si apre come finisce «manopola» (i due telefoni); finisce su Ada con la paperella in mano (la riprende «resta»).
const LA_TEL0 = [0, 0.6];
const LA_VICINO = [0.4, 1.0, 7.2, 7.8];
const LA_MANO = { entra: [1.2, 2.0], gira: [2.4, 5.0], esce: [5.6, 6.4] };
const LA_PARTE = [1.6, 5.6];
const LA_CAM = [
  { t: 0, cx: 712, cy: 846, z: 6.2 },
  { t: 7.6, cx: 712, cy: 846, z: 6.2 },
  { t: 8.8, cx: 820, cy: 820, z: 3.0 },
  { t: 10.8, cx: 772, cy: 856, z: 4.0 },
  { t: 16.0, cx: 772, cy: 856, z: 4.0 },
  { t: 17.2, cx: 700, cy: 846, z: 4.6 },
  { t: 23.2, cx: 700, cy: 846, z: 4.6 },
  { t: 23.3, cx: 676, cy: 840, z: 6.4, da: 23.2 },
  { t: 27.4, cx: 676, cy: 840, z: 6.8 },
];
const LA_ESCE = 7.8;
const LA_GIRO = {
  esce: LA_ESCE, vel: [[0, 110], [2.8, 60], [5.4, 60], [6.4, 160], [7.6, 160], [8.8, 0]].map(([t, v]) => [LA_ESCE + t, v]),
  pesca: { giu: LA_ESCE + 9.2, su: LA_ESCE + 10.2, preso: LA_ESCE + 10.6 }, via: LA_ESCE + 11.8,
};
const LA_TEL = [19.2, 19.7, 23.0, 23.5];
kit.scene('larga', {
  init(kit) {
    const G = window.G, M = G.MONDO, C = G.C, D = G.MOD.mare, P = D.passeggeri, MN = G.MOD.manopola;
    const chi = [['al', P.Al], ['mare', P.mare], ['emma', P.Emma]].map(([tipo, x]) => ({ tipo, biglietto: x.biglietto, uscita: x.tratti[2] }));
    this.giro = G.pescata({ id: 'la', chi, vasca: MN.vasche.larga, parola: 'altalena', t: LA_GIRO });
    // Il treno dell'ultima pesca è ancora in stazione: riparte.
    const vecchio = chi.map(c => ({ tipo: c.tipo, col: c.biglietto })).concat([{ tipo: 'paperella', col: MN.nuovo.nuota }]);
    const quaderno = '<g transform="translate(704 830)"><rect x="-13" y="-4" width="26" height="5" rx="1.5" fill="#2F6F73" stroke="#1E4A4D" stroke-width="1"/><rect x="-11" y="-5" width="22" height="2" fill="' + C.crema + '"/></g>';
    const sopra = '<g class="la-vecchio">' + G.treno(vecchio, { sbarra: 1 }) + '</g>' + this.giro.treno +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      quaderno + '<g class="la-ada"></g>' + this.giro.mano;
    let venature = '';
    for (let k = 0; k < 9; k++) venature += '<path d="M-100 ' + (180 + k * 110) + ' Q600 ' + (150 + k * 110) + ' 2020 ' + (200 + k * 110) + '" stroke="' + C.legnoScuro + '" stroke-width="5" fill="none" opacity=".35"/>';
    const vicino = '<g class="la-vicino" opacity="0"><rect x="-200" y="-200" width="2320" height="1480" fill="' + C.legno + '"/>' + venature +
      '<rect x="-200" y="-200" width="2320" height="210" fill="' + C.legnoScuro + '"/>' +
      '<g transform="translate(120 800) rotate(-8)"><rect width="520" height="360" rx="20" fill="#2F6F73" stroke="#1E4A4D" stroke-width="8"/><rect x="16" y="-12" width="488" height="24" fill="' + C.crema + '"/></g>' +
      '<g class="la-grande" transform="translate(960 540) scale(3.6)"></g>' +
      '<g class="la-mano"><path d="M80 40 L360 300 L240 420 L-20 150 Z" fill="#FBFAF6" stroke="#2E2A26" stroke-width="6" stroke-linejoin="round"/>' +
      '<ellipse cx="20" cy="70" rx="78" ry="62" fill="#C98B63"/><ellipse cx="-34" cy="30" rx="30" ry="22" fill="#C98B63" transform="rotate(-30 -34 30)"/></g></g>';
    // I due telefoni dell'altra volta (solo per l'attacco) e il telefono della nuova storia.
    const dueTel = '<g class="la-due">' + [0, 1].map(k => {
      const z = 0.95, tx = 480 - 947 * z, ty = 540 - 522 * z, o = k ? { muro: ['#203A3F', '#35585A', '#3D5E6E'] } : {};
      return '<g transform="translate(' + (k * 960) + ' 0)"><clipPath id="g-la-pan' + k + '"><rect width="960" height="1080"/></clipPath><g clip-path="url(#g-la-pan' + k + ')">' +
        '<g transform="translate(' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ') scale(' + z + ')">' + G.salotto(G.telefono({ messaggi: ['Al mare Emma'], rispostaTesto: 'nuota' }), o) + '</g></g></g>';
    }).join('') + '<path d="M960 -10 L960 1090" stroke="#05070F" stroke-width="12"/></g>';
    const z = 1.16, [bx, by] = G.SALOTTO.bolla;
    const camTel = 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z + ')';
    const tel = '<g class="la-tel" opacity="0"><g transform="' + camTel + '">' + G.salotto('<g>' + G.telefono({ messaggi: ['Al mare Emma'] }) + '</g><g class="la-risposta" opacity="0">' + G.telefono({ messaggi: ['Al mare Emma'], rispostaTesto: 'altalena' }) + '</g>', { muro: ['#3E2E22', '#5E4632', '#7A5A3C'] }) + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'larga', manopola: -1, davanti: vicino + dueTel + tel,
      html: G.sottotitolo('NARRATORE', 'Poi la gira dall’altro lato. Emma è blu come sempre, ma nella vasca i colori si pareggiano.') +
        G.sottotitolo('NARRATORE', 'Adesso anche le paperelle rare escono spesso.') +
        G.sottotitolo('ADA', 'Al mare Emma… altalena?'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.giro.papere);
    this.giro.monta(this.m);
    this.G = G;
    this.vecchio = this.m.qa('.la-vecchio .g-vag');
    this.ada = this.m.q('.la-ada'); this.manWorld = this.m.q('.g-manopola');
    this.vicino = this.m.q('.la-vicino'); this.grande = this.m.q('.la-grande'); this.mano = this.m.q('.la-mano');
    this.due = this.m.q('.la-due'); this.tel = this.m.q('.la-tel'); this.risposta = this.m.q('.la-risposta');
    this.stato = ''; this.statoMan = '';
    this.sub = G.subs(kit, [[1.0, 9.4], [11.6, 16.0], [23.8, 26.8]]);
  },
  render(t, kit) {
    t = window.G.tempo('03', 'larga', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(LA_CAM, t));
    G.animaMondo(m, t + 1110);
    this.due.setAttribute('opacity', (1 - seg(t, LA_TEL0[0], LA_TEL0[1])).toFixed(3));
    const sv = lerp(640 - M.fermo, m.partenza.getTotalLength(), ei(seg(t, LA_PARTE[0], LA_PARTE[1])));
    G.posaTreno(this.vecchio, m.partenza, sv);
    G.nascondiInMontagna(this.vecchio, m.partenza, sv, { fine: true });
    // La manopola: dalla lucina grande, passando per il mezzo, fino alle lucine piccole, che si accendono una dopo l'altra.
    const pos = -1 + 2 * eio(seg(t, LA_MANO.gira[0], LA_MANO.gira[1]));
    const pq = Math.round(pos * 40) / 40;
    if (String(pq) !== this.statoMan) { const html = G.manopola(pq); this.manWorld.innerHTML = html; this.grande.innerHTML = html; this.statoMan = String(pq); }
    this.vicino.setAttribute('opacity', (seg(t, LA_VICINO[0], LA_VICINO[1]) * (1 - seg(t, LA_VICINO[2], LA_VICINO[3]))).toFixed(3));
    const dentro = eio(seg(t, LA_MANO.entra[0], LA_MANO.entra[1])) * (1 - eio(seg(t, LA_MANO.esce[0], LA_MANO.esce[1])));
    const ang = 62 * pos, ar = (ang - 90) * Math.PI / 180;
    const hx = 960 + 150 * Math.cos(ar) + 30, hy = 540 + 150 * Math.sin(ar) + 40;
    this.mano.setAttribute('transform', 'translate(' + lerp(1700, hx, dentro).toFixed(1) + ' ' + lerp(1300, hy, dentro).toFixed(1) + ') rotate(' + (ang * 0.6).toFixed(1) + ')');
    // L'uscita e la pesca; la paperella verde chiaro resta in mano ad Ada.
    const giu = this.giro.render(t), T = LA_GIRO;
    const posa = t >= T.pesca.giu - 1.2 ? 'pesca' : 'base';
    const espr = t < 8 ? 'pensa' : t < T.pesca.giu - 0.6 ? 'base' : t < T.pesca.preso ? 'chiusi' : t < 23.2 ? 'sorpresa' : 'occhio';
    const k = posa + espr + giu;
    if (k !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(posa, espr, { giu }) + '</g>'; this.stato = k; }
    // Il telefono: sotto «Al mare Emma», altalena.
    this.tel.setAttribute('opacity', (seg(t, LA_TEL[0], LA_TEL[1]) * (1 - seg(t, LA_TEL[2], LA_TEL[3]))).toFixed(3));
    this.risposta.setAttribute('opacity', eo(seg(t, LA_TEL[1] + 0.3, LA_TEL[1] + 0.7)).toFixed(3));
    this.sub(t);
  },
});
