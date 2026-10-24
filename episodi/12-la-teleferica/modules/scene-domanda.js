const { seg, eo, eio, lerp } = kit;
// Alla bancarella, la vasca sparsa di «Domani piove?»: paperelle di tutti i colori, nessuna molto più delle altre, e in un
// angolo una viola. Ada chiude gli occhi e pesca una paperella bianca: sul telefono di una casa compare «Sì». Da un'altra
// casa arriva la stessa domanda: stesso treno, stessa vasca. Ada pesca una marrone: sul secondo telefono, «No». Ada guarda
// la vasca, poi il quaderno. Titolo: «La teleferica».
// Si apre come finisce l'episodio 11, sulla vasca sparsa; finisce sulla bancarella, col titolo (la riprende «pagina»).
// Il primo giro è quello della fine dell'episodio 11 («piove»: esce a 5.6 di una scena lunga 21.6).
const DM_A = { esce: -16.0, vel: [[-16.0, 300], [-14.6, 300], [-14.1, 60], [-11.8, 60], [-11.2, 240]], pesca: { giu: 1.6, su: 2.4, preso: 2.8 }, via: 3.2, salta: 3.2, vagone: 3.8, sale: 4.4 };
const DM_B = { esce: 8.8, vel: [[8.8, 300], [10.2, 300], [10.7, 60], [13.0, 60], [13.6, 240]], pesca: { giu: 14.0, su: 14.8, preso: 15.2 }, via: 15.6, salta: 15.6, vagone: 16.2, sale: 16.8 };
const DM_CASE = [
  { da: 5.2, a: 8.4, risposta: 'Sì', arriva: 6.2, muro: undefined },
  { da: 17.4, a: 20.2, risposta: 'No', arriva: 18.2, muro: ['#1E3A40', '#2E5A58', '#4A6E5C'] },
];
const DM_TITOLO = 25.0;
const DM_CAM = [
  { t: 0, cx: 728, cy: 868, z: 5.2 },
  { t: 4.6, cx: 680, cy: 850, z: 4.4 },
  { t: 8.6, cx: 740, cy: 846, z: 3.6 },
  { t: 16.8, cx: 700, cy: 846, z: 3.6 },
  { t: 20.4, cx: 712, cy: 860, z: 4.6 },
  { t: 24.4, cx: 712, cy: 860, z: 4.6 },
  { t: 25.8, cx: 740, cy: 790, z: 2.6 },
];
kit.scene('domanda', {
  init(kit) {
    const G = window.G, M = G.MONDO, S2 = G.S2, PV = G.MOD.seconda.bruco.piove, PA = G.MOD.seconda.teleferica.paperelle;
    const chi = S2.trenoDa(PV.frase, PV.tratti);
    // Il primo giro continua quello della fine dell'episodio 11 (stessa vasca, stesse paperelle); il secondo è un altro
    // treno con la stessa frase: la stessa vasca, paperella per paperella.
    this.a = G.giro7({ id: 'a', chi, vasca: PV.vasca, seme: 151, parola: 'Sì', nuovo: PA['Sì'], fermo: G.fermoTreno(10), t: DM_A });
    this.b = G.giro7({ id: 'b', chi, vasca: PV.vasca, seme: 151, parola: 'No', nuovo: PA.No, fermo: G.fermoTreno(10), t: DM_B });
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.a.treno + this.b.treno + '<g class="dm-ada"></g>' + this.a.mano + this.b.mano;
    const case_ = DM_CASE.map((c, k) => '<g class="dm-casa" data-k="' + k + '" opacity="0"><g class="dm-casa-cam">' + G.salotto('<g class="dm-tel"></g>', c.muro ? { muro: c.muro } : {}) + '</g></g>').join('');
    const titolo = '<g class="dm-titolo" opacity="0"><g transform="translate(960 290)"><g class="dm-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'domanda', manopola: 0, banchina: true, morto: true, bruco: 'acceso', davanti: case_ + titolo,
      html: G.sottotitolo('NARRATORE', 'Due case, la stessa domanda, la stessa vasca. E due risposte diverse.') +
        G.sottotitolo('ADA', 'Come fa il treno a sapere se domani piove?'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.a.papere + this.b.papere);
    this.a.monta(this.m); this.b.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.ada = q('.dm-ada'); this.titolo = q('.dm-titolo'); this.insegna = q('.dm-insegna');
    this.case = this.m.qa('.dm-casa').map(el => ({ el, cam: el.querySelector('.dm-casa-cam'), tel: el.querySelector('.dm-tel') }));
    this.stati = {};
    this.sub = G.subs(kit, [[14.0, 20.4], [21.0, 24.6]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('12', 'domanda', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(DM_CAM, t));
    G.animaMondo(m, t + 1700);
    // Il primo giro fino a quando esce il secondo treno; poi il secondo (il primo è ripartito).
    const primo = t < DM_B.esce - 0.2;
    const ra = this.a.render(primo ? t : -100), rb = this.b.render(primo ? -100 : t);
    if (!primo) this.a.vag.forEach(v => v.setAttribute('opacity', 0));
    else this.b.vag.forEach(v => v.setAttribute('opacity', 0));
    // Ada pesca a occhi chiusi; poi guarda la vasca, e il quaderno.
    const T = primo ? DM_A : DM_B, r = primo ? ra : rb;
    const pesca = t >= T.pesca.giu - 0.9 && t < T.pesca.preso + 0.9;
    const espr = pesca ? (t < T.pesca.preso + 0.1 ? 'chiusi' : 'sorpresa') : t > 20.4 ? 'pensa' : 'base';
    this.cambia('ada', (pesca ? 'p' : 'q') + espr + (pesca ? r.giu : 0), this.ada, '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(pesca ? 'pesca' : 'quaderno', espr, { giu: pesca ? r.giu : 0 }) + '</g>');
    // Le due case: in ognuna arriva la sua risposta.
    DM_CASE.forEach((c, k) => {
      const el = this.case[k], on = seg(t, c.da - 0.2, c.da) * (1 - seg(t, c.a - 0.2, c.a));
      el.el.setAttribute('opacity', on.toFixed(3));
      if (on <= 0) return;
      const arrivata = t >= c.arriva, kk = arrivata ? 'r' : (Math.round(t * 30) / 30).toFixed(3);
      this.cambia('tel' + k, kk, el.tel, G.unico(G.telefono({ chat: [['io', 'Domani piove?']].concat(arrivata ? [['ai', c.risposta]] : []), puntini: arrivata ? undefined : t }), 'dmtel' + k));
      const z = lerp(1.0, 1.08, seg(t, c.da, c.a)), [bx, by] = G.SALOTTO.bolla;
      el.cam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')');
    });
    const tit = eo(seg(t, DM_TITOLO, DM_TITOLO + 1.2));
    this.titolo.setAttribute('opacity', tit.toFixed(3));
    this.titolo.setAttribute('transform', 'translate(0 ' + (16 * (1 - tit)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (t > DM_TITOLO - 0.2) this.cambia('ins', turno, this.insegna, G.insegna('La teleferica', 1040, 230, +turno));
    this.sub(t);
  },
});
