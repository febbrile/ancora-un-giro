const { seg, eo, eio, lerp } = kit;
// Stacco su un'altra casa: una bambina, con un libro di fiabe sulle ginocchia aperto su Cappuccetto Rosso (il lupo da una
// parte, la bambina col cappuccio rosso dall'altra, nessuna scritta), scrive «Il lupo mangia la nonna». Invio. Al Bruco
// salgono cinque biglietti: il lupo e mangia si accendono di rosso, la nonna di un verde sporco, gli altri verdi. All'uscita
// dalla mela cadono tante rosse e qualche verde: le rosse sono di più. Clonc: la sbarra si abbassa. Alla bambina arriva «Di
// questo, qui, non si parla.»: il telefono si gira verso il libro, poi torna, e si scuote. Ada tira la manica del custode.
// Si apre nella casa; finisce sulla vasca piccola, rossa (la riprende «piove»).
const LU_FRASE = 'Il lupo mangia la nonna';
const LU_SCRIVE = 0.8, LU_INVIO = 5.2, LU_VIA = [5.8, 6.2];
const LU_CU = [1120, 1032], LU_ADA = [1070, 1052];
const LU_BRUCO = { sale: 6.8, passo: 0.5, parte: 10.0, giro: 5.0 };
const LU_CLONC = 16.0;
const LU_CASA = [16.8, 17.2, 21.0, 21.4], LU_ARRIVA = 18.0, LU_LIBRO = [18.8, 19.8], LU_NO = [20.0, 20.9];
const LU_MANICA = [21.6, 24.0];
const LU_CAM = [
  { t: 6.0, cx: 1204, cy: 1002, z: 3.0 },
  { t: 15.4, cx: 1204, cy: 1002, z: 3.0 },
  { t: 16.2, cx: 1134, cy: 1016, z: 3.6 },
  { t: 21.4, cx: 1114, cy: 1026, z: 4.6 },
  { t: 29.6, cx: 1114, cy: 1026, z: 4.6 },
  { t: 31.2, cx: 1254, cy: 1042, z: 6.0 },
];
kit.scene('lupo', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, F = G.MOD.seconda.bruco.frasi.lupo;
    const gio = S2.giostrina({ sbarra: 0, luci: 1 });
    this.mano = G.puntoCustode(LU_CU[0], LU_CU[1], G.CUSTODE_MANI.porge);
    this.giro = S2.giroBruco({ id: 'lu', parole: F.frase, vestiti: F.vestiti, uscita: F.uscita, rosse: F.rosse, verdi: F.verdi, seme: 67, mano: this.mano, t: LU_BRUCO });
    const sopra = gio.dietro + this.giro.bruco + gio.davanti + '<g class="lu-ada"></g><g class="lu-cu"></g><g class="lu-big"></g>' + this.giro.biglietti;
    // Il libro di fiabe aperto sulle ginocchia: il lupo, e la bambina col cappuccio rosso. Niente scritte.
    const lupo = '<g transform="translate(210 0)"><path d="M-70 40 Q-60 -30 0 -40 Q60 -30 70 40 Z" fill="#8C8E99"/><path d="M-50 -24 L-62 -70 L-28 -40 Z M50 -24 L62 -70 L28 -40 Z" fill="#8C8E99"/>' +
      '<circle cx="-22" cy="-6" r="7" fill="#FFFFFF"/><circle cx="22" cy="-6" r="7" fill="#FFFFFF"/><circle cx="-22" cy="-5" r="3.5" fill="' + C.inchiostro + '"/><circle cx="22" cy="-5" r="3.5" fill="' + C.inchiostro + '"/>' +
      '<ellipse cx="0" cy="16" rx="12" ry="9" fill="' + C.inchiostro + '"/><path d="M-24 30 L-16 40 L-8 30 L0 40 L8 30 L16 40 L24 30" stroke="#FFFFFF" stroke-width="4" fill="none"/></g>';
    const cappuccio = '<g transform="translate(-170 0)"><path d="M-46 60 L0 -40 L46 60 Z" fill="' + C.rosso + '"/><circle cx="0" cy="-20" r="20" fill="#FFE9D6"/>' +
      '<path d="M-24 -18 Q0 -64 24 -18 Q0 -40 -24 -18 Z" fill="' + C.rossoScuro + '"/><circle cx="-7" cy="-20" r="2.6" fill="' + C.inchiostro + '"/><circle cx="7" cy="-20" r="2.6" fill="' + C.inchiostro + '"/>' +
      '<path d="M30 40 L52 40 L48 54 L34 54 Z" fill="' + C.legno + '"/></g>';
    const libro = '<g transform="translate(470 880) rotate(-6) scale(1.15)"><path d="M0 -10 Q-170 -40 -360 -20 L-360 110 Q-170 90 0 120 Q170 90 360 110 L360 -20 Q170 -40 0 -10 Z" fill="#3F6FA8"/>' +
      '<path d="M0 -4 Q-170 -32 -344 -14 L-344 100 Q-170 82 0 108 Q170 82 344 100 L344 -14 Q170 -32 0 -4 Z" fill="' + C.crema + '"/><path d="M0 -4 L0 108" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g transform="translate(0 46) scale(.9)">' + lupo + cappuccio + '</g></g>';
    const casa = '<g class="lu-casa"><g class="lu-casa-cam">' + G.salotto('<g class="lu-tel"></g>', { muro: ['#3A2448', '#6A3A5E', '#7A4A6A'] }) + libro + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'lupo', manopola: 0, banchina: true, morto: true, davanti: casa,
      html: G.sottotitolo('ADA', 'Ma è una fiaba!') +
        G.sottotitolo('CUSTODE', 'Il regolamento conta le rosse. Le storie non le legge.') +
        G.sottotitolo('NARRATORE', 'Il Bruco non può inventare niente: nella sua vasca ci sono due colori soli. Però può sbagliare.'),
    });
    this.m.q('.g-bruco-vasca').insertAdjacentHTML('beforeend', this.giro.papere);
    this.giro.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.ada = q('.lu-ada'); this.cu = q('.lu-cu'); this.bigEl = q('.lu-big'); this.asta = q('.g-bruco-asta');
    this.casa = q('.lu-casa'); this.casaCam = q('.lu-casa-cam'); this.tel = q('.lu-tel');
    this.typ = kit.typist(LU_FRASE, LU_SCRIVE, 5.4, 41);
    this.bigHtml = F.frase.map((w, i) => '<g transform="translate(' + (i * 3) + ' ' + (-i * 2) + ') rotate(' + (-12 + 6 * i) + ') scale(.13) translate(-60 -30)">' + G.biglietto(w) + '</g>');
    this.stati = {};
    this.sub = G.subs(kit, [[21.8, 24.0], [24.4, 29.4], [30.0, 38.0]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('11', 'lupo', t);
    const G = this.G, S2 = G.S2, m = this.m, T = LU_BRUCO;
    m.cam.setAttribute('transform', G.camChiavi(LU_CAM, t));
    G.animaMondo(m, t + 1610);
    this.giro.render(t);
    this.asta.setAttribute('transform', S2.astaBruco(eio(seg(t, LU_CLONC - 0.35, LU_CLONC)) - 0.06 * Math.sin(Math.PI * seg(t, LU_CLONC, LU_CLONC + 0.3))));
    // La casa della bambina: scrive; più tardi arriva la frase già pronta; guarda il libro, poi il telefono, e fa no.
    const [c0, c1, c2, c3] = LU_CASA;
    const inCasa = t < LU_VIA[1] || (t >= c0 && t < c3);
    this.casa.setAttribute('opacity', (t < LU_VIA[1] ? 1 - seg(t, LU_VIA[0], LU_VIA[1]) : seg(t, c0, c1) * (1 - seg(t, c2, c3))).toFixed(3));
    if (inCasa) {
      const inviato = t >= LU_INVIO + 0.15, arrivata = t >= LU_ARRIVA;
      const chat = inviato ? [['io', LU_FRASE]].concat(arrivata ? [['ai', 'Di questo, qui, non si parla.']] : []) : [];
      const scritto = inviato ? '' : this.typ.at(t), cursore = !inviato && Math.floor(t / 0.53) % 2 === 0, premuto = t > LU_INVIO - 0.05 && t < LU_INVIO + 0.3;
      const puntini = inviato && !arrivata && t >= c0 ? t : undefined;
      this.cambia('tel', chat.length + scritto + cursore + premuto + (puntini !== undefined ? (Math.round(t * 30) / 30).toFixed(3) : ''), this.tel,
        G.unico(G.telefono({ chat, scritto, cursore, premuto, puntini }), 'lutel'));
      // Il telefono si gira verso il libro, poi torna, e fa no.
      const gira = -10 * Math.sin(Math.PI * seg(t, LU_LIBRO[0], LU_LIBRO[1])), no = 5 * Math.sin((t - LU_NO[0]) * 16) * Math.sin(Math.PI * seg(t, LU_NO[0], LU_NO[1]));
      const z = t < 6 ? lerp(1, 1.06, seg(t, 0, 6)) : 1.06, [bx, by] = G.SALOTTO.bolla;
      this.casaCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ') rotate(' + (gira + no).toFixed(2) + ' 950 560)');
    }
    // Il custode: fa salire i biglietti, guarda il giro, guarda le rosse; Ada gli tira la manica; risponde.
    const dond = Math.round(6 * Math.sin(t * 2)), occhi = t < LU_MANICA[0] ? 1 : -1, espr = t < 24.4 ? 'serio' : 'base';
    this.cambia('cu', dond + '' + occhi + espr, this.cu, '<g transform="' + G.posaCustode(LU_CU[0], LU_CU[1]) + '">' + G.unico(G.custode('porge', espr, { occhi, dondolo: dond }), 'lucu') + '</g>');
    const [hx, hy] = this.mano, rimasti = this.bigHtml.filter((h, i) => t < T.sale + i * T.passo);
    this.cambia('big', rimasti.length, this.bigEl, rimasti.join(''));
    this.bigEl.setAttribute('transform', 'translate(' + hx.toFixed(1) + ' ' + (hy - 3).toFixed(1) + ')');
    // Ada: guarda il giro; poi tira la manica al custode.
    const tira = t >= LU_MANICA[0] && t < LU_MANICA[1], va = eio(seg(t, LU_MANICA[0] - 0.6, LU_MANICA[0]));
    const ax = lerp(LU_ADA[0], 1100, va), espA = t < 15 ? 'base' : t < 22 ? 'sorpresa' : t < 29.6 ? 'accigliata' : 'pensa';
    const ang = tira ? Math.round(-60 + 10 * Math.sin((t - LU_MANICA[0]) * 9)) : 0;
    this.cambia('ada', espA + ang, this.ada, '<g class="lu-ada-in">' + (tira ? G.adaSaluta(espA === 'accigliata' ? 'sorpresa' : espA, ang) : G.adaGira('base', espA, {}, 0)) + '</g>');
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, LU_ADA[1]));
    this.sub(t);
  },
});
