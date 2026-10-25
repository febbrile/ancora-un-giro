const { seg, eo, eio, lerp } = kit;
// Un'altra notte ancora. La vasca arancio, il telone. Sotto il telone Ada pesca una rosa antico, e subito il custode guarda
// l'orologio: drin. Arrotola il telone e attacca lui, in fondo al treno, una paperella arancio scura. Il treno esce: grigie,
// rosa antico e acquamarina, quasi alla pari. Ada pesca una rosa antico, e sul telefono compare «Emma».
// Si apre sulla vasca quasi alla pari; finisce sulla bancarella (la riprende «fiume»).
const CA_A = { esce: -3.0, vel: [[-3.0, 900], [-1.6, 900], [-1.2, 90], [0.2, 90], [0.6, 400]], pesca: { giu: 0.4, su: 1.1, preso: 1.4 }, via: 1.8, salta: 1.8, vagone: 2.2, sale: 2.7 };
const CA_DRIN = [3.6, 5.0], CA_ARROTOLA = [6.0, 7.4], CA_ATTACCA = 8.0;
const CA_B = { esce: 10.6, vel: [[10.6, 900], [12.0, 900], [12.4, 90], [13.8, 90], [14.2, 400]], pesca: { giu: 14.0, su: 14.7, preso: 15.0 }, via: 15.4 };
const CA_CASA = [18.8, 19.2, 22.2, 22.6], CA_ARRIVA = 19.6;
const CA_CU = [470, 836];
const CA_CAM = [
  { t: 0, cx: 740, cy: 846, z: 3.6 },
  { t: 3.39, cx: 700, cy: 846, z: 3.6 },
  { t: 3.4, cx: 480, cy: 800, z: 3.6 },
  { t: 10.39, cx: 520, cy: 810, z: 3.6 },
  { t: 10.4, cx: 740, cy: 846, z: 3.6 },
  { t: 22.6, cx: 720, cy: 850, z: 3.4 },
];
kit.scene('campanella', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, TL = G.MOD.seconda.telone, GI = TL.campanella.giri;
    this.a = G.giro7({ id: 'a', chi: S2.trenoDa(GI[1].frase, GI[1].tratti), vasca: GI[1].vasca, seme: 281, parola: 'Emma', nuovo: TL.paperelle.Emma, fermo: G.fermoTreno(21), t: CA_A });
    this.b = G.giro7({ id: 'b', chi: S2.trenoDa(GI[2].frase, GI[2].tratti), vasca: GI[2].vasca, seme: 283, parola: 'Emma', fermo: G.fermoTreno(23), t: CA_B });
    // In stazione: il treno con la rosa antico sotto il telone; il custode attacca l'arancio scura in fondo.
    this.chiS = S2.trenoDa(GI[2].frase, GI[2].tratti);
    this.fermo = G.fermoTreno(22);
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.a.treno + this.b.treno + '<g class="ca-staz">' + G.treno(this.chiS.map(c => ({ tipo: c.tipo, col: c.biglietto, o: c.o })), { sbarra: 1 }) + '</g>' +
      '<g class="ca-telone"></g><g class="ca-scint" opacity="0">' + [0, 1, 2, 3, 4, 5].map(() => '<circle r="2" fill="' + C.luce + '"/>').join('') + '</g>' +
      '<g class="ca-cu"></g><g class="ca-ada"></g>' + this.a.mano + this.b.mano;
    const camera = '<g class="ca-camera" opacity="0"><g class="ca-cam-cam">' + G.salotto('<g class="ca-tel"></g>', { cameretta: true }) + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'campanella', manopola: 0, banchina: true, morto: true, bruco: 'acceso', davanti: camera,
      html: G.sottotitolo('NARRATORE', 'Un’altra notte suona la campanella, e il custode toglie il telone a metà.') +
        G.sottotitolo('NARRATORE', 'La risposta arriva lo stesso, ma senza i giri che servivano.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.a.papere + this.b.papere);
    this.a.monta(this.m); this.b.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.staz = q('.ca-staz'); this.svag = this.m.qa('.ca-staz .g-vag');
    G.posaTreno(this.svag, this.m.partenza, 640 - this.fermo, null, M.passoBanchina);
    this.telone = q('.ca-telone'); this.scint = q('.ca-scint'); this.cu = q('.ca-cu'); this.ada = q('.ca-ada');
    this.camera = q('.ca-camera'); this.camCam = q('.ca-cam-cam'); this.tel = q('.ca-tel');
    this.stati = {};
    this.sub = G.subs(kit, [[3.8, 10.2], [22.8, 28.0]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('14', 'campanella', t);
    const G = this.G, S2 = G.S2, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(CA_CAM, t));
    G.animaMondo(m, t + 2400);
    const fase = t < 3.4 ? 0 : t < 10.4 ? 1 : 2;
    const ra = this.a.render(fase === 0 ? t : -100), rb = this.b.render(fase === 2 ? t : -100);
    if (fase !== 0) this.a.vag.forEach(v => v.setAttribute('opacity', 0));
    if (fase !== 2) this.b.vag.forEach(v => v.setAttribute('opacity', 0));
    // In stazione: il telone sulla rosa antico; drin; il custode lo arrotola e attacca l'arancio scura.
    this.staz.setAttribute('opacity', fase === 1 ? 1 : 0);
    const n = this.chiS.length;
    this.svag.forEach((v, i) => { if (i === n - 1) v.setAttribute('opacity', fase === 1 ? eo(seg(t, CA_ATTACCA, CA_ATTACCA + 0.5)).toFixed(3) : 0); });
    const a = this.fermo + 20 * M.passoBanchina - 40, b = this.fermo + 20 * M.passoBanchina + 40;
    const tel = fase === 1 ? S2.telone(a, b, { srotola: 1 - eio(seg(t, CA_ARROTOLA[0], CA_ARROTOLA[1])) }) : '';
    this.cambia('tel', tel, this.telone, tel);
    const sc = seg(t, CA_ATTACCA, CA_ATTACCA + 0.9), sx = this.fermo + (n - 1) * M.passoBanchina;
    this.scint.setAttribute('opacity', (fase === 1 && sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
    if (sc > 0 && sc < 1) [...this.scint.children].forEach((c, k) => { const an = k * Math.PI / 3, d = 4 + 16 * eo(sc); c.setAttribute('cx', (sx + d * Math.cos(an)).toFixed(1)); c.setAttribute('cy', (802 + d * Math.sin(an)).toFixed(1)); });
    // Il custode: guarda l'orologio, drin; arrotola; attacca.
    const suona = t >= CA_DRIN[0] && t < CA_DRIN[1] ? Math.round(18 * Math.sin((t - CA_DRIN[0]) * 20) * Math.exp(-(t - CA_DRIN[0]) * 1.4)) : 0;
    const posa = fase === 1 ? (t < CA_DRIN[1] ? 'orologio' : t < CA_ATTACCA + 0.6 ? 'attacca' : 'base') : 'base';
    const [cx, cy] = fase === 1 ? CA_CU : [930, 936];
    this.cambia('cu', fase + posa + suona, this.cu, '<g transform="' + G.posaCustode(cx, cy) + '">' + G.unico(G.custode(posa, 'serio', { occhi: 1, campanella: true, lancetta: 1, suona }), 'cacu') + '</g>');
    // Ada: pesca; poi guarda.
    const T = fase === 0 ? CA_A : CA_B, r = fase === 0 ? ra : rb, P = T.pesca, pesca = fase !== 1 && t >= P.giu - 0.8 && t < P.preso + 0.8;
    const espr = pesca ? (t < P.preso + 0.1 ? 'chiusi' : 'sorpresa') : t > 22.6 ? 'pensa' : 'base';
    this.cambia('ada', (pesca ? 'p' : 'q') + espr + (pesca ? r.giu : 0) + fase, this.ada, fase === 1 ? '' : '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(pesca ? 'pesca' : 'quaderno', espr, { giu: pesca ? r.giu : 0 }) + '</g>');
    const [c0, c1, c2, c3] = CA_CASA;
    this.camera.setAttribute('opacity', (seg(t, c0, c1) * (1 - seg(t, c2, c3))).toFixed(3));
    if (t > c0 && t < c3) {
      const arrivata = t >= CA_ARRIVA, k = arrivata ? 'r' : (Math.round(t * 30) / 30).toFixed(3);
      this.cambia('t', k, this.tel, G.unico(G.telefono({ chat: [['io', 'Chi è il più basso tra Emma, Al e Mare?']].concat(arrivata ? [['ai', 'Emma']] : []), puntini: arrivata ? undefined : t }), 'catel'));
      const z = 1.1;
      this.camCam.setAttribute('transform', 'translate(' + (960 - 960 * z) + ' ' + (620 - 620 * z) + ') scale(' + z + ')');
    }
    this.sub(t);
  },
});
