const { seg, eo, ei, eio, lerp } = kit;
// Ada scende dalla collina fino alla ringhiera della stazione immensa. Tra mille strisce, una le passa accanto e Ada la
// legge al volo: «Al mare Emma». Lo Spezzaparole gigante fa zac, zac: tre biglietti volano sui sedili di un treno e
// prendono vita. Sono Al, Mare ed Emma, uguali a quelli di Ada, ma con vestiti di altri colori (G.MOD.grande.biglietti).
// Ada apre il quaderno sulla sua Emma rosa e la confronta con questa. Le sbarre si abbassano; il treno parte da solo,
// con il fanale acceso e nessuno alla guida, e sparisce nella prima cima.
// Si apre come finisce «immenso», su Ada in cima alla collina; finisce sulla bocca della prima cima (la riprende «finestre»).
const FR_P = window.G.PARCO;
const FR_CAM = [
  { t: 0, cx: 2565, cy: 505, z: 3.1 },
  { t: 1.1, cx: 2580, cy: 520, z: 3.1 },
  FR_P.chiave(1.2, 300, 820, 1.7, 1.19),
  FR_P.chiave(3.4, 440, 930, 2.4),
  FR_P.chiave(6.6, 450, 940, 2.5),
  FR_P.chiave(8.2, 80, 720, 1.5),
  FR_P.chiave(9.2, 80, 720, 1.5),
  FR_P.chiave(11.0, 330, 930, 2.6),
  FR_P.chiave(13.4, 330, 930, 2.6),
  FR_P.chiave(14.6, 40, 930, 4.2),
  FR_P.chiave(18.4, 50, 930, 4.2),
  FR_P.chiave(19.6, 350, 930, 2.6),
  FR_P.chiave(20.8, 350, 930, 2.6),
  FR_P.chiave(23.6, 1100, 880, 1.6),
  FR_P.chiave(27.4, 2350, 800, 1.0),
  FR_P.chiave(30.4, 2900, 740, 0.8),
  FR_P.chiave(32, 2930, 735, 0.8),
];
const FR_ADA = [[160, 1062], [600, 1062]];
const FR_ENTRA = [1.2, 3.4];
// La striscia di Ada: arriva da sinistra, le passa accanto (più vicina a noi, più grande), poi sale nella fessura.
const FR_STRISCIA = [3.2, 6.0, 8.0];
const FR_TAGLI = [8.4, 8.9], FR_USCITE = [9.1, 9.45, 9.8], FR_VOLO = 1.2, FR_VITA = 0.25;
const FR_QUADERNO = [13.8, 14.6, 18.2, 19.0];
const FR_SBARRE = [19.6, 20.6];
const FR_VEL = [[20.8, 0], [22.6, 150], [25.0, 300], [28.0, 460]];
// Al, Mare, Emma: dove stanno (centro del vagone) sul binario dell'andata, prima di partire.
const FR_POSTI = [380, 294, 208];
function frBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('frase', {
  init(kit) {
    const G = window.G, C = G.C, B = G.MOD.grande.biglietti;
    this.chi = [['al', B.Al, 'Al'], ['mare', B.mare, 'mare'], ['emma', B.Emma, 'Emma']];
    let scintille = '';
    for (let i = 0; i < 3; i++) { scintille += '<g class="fr-scint" opacity="0">'; for (let k = 0; k < 8; k++) scintille += '<circle r="3" fill="' + C.luce + '"/>'; scintille += '</g>'; }
    // Il quaderno, a sinistra: la pagina con la sua Emma rosa.
    const quad = '<g class="fr-quad" opacity="0"><rect x="-200" y="-200" width="1180" height="1480" fill="#0B1030" opacity=".55"/>' +
      '<clipPath id="g-fr-pagina"><rect x="60" y="120" width="820" height="840" rx="22"/></clipPath><g clip-path="url(#g-fr-pagina)"><g class="fr-pagina">' + G.quadernoAda() + '</g></g>' +
      '<rect x="60" y="120" width="820" height="840" rx="22" fill="none" stroke="#1E4A4D" stroke-width="10"/></g>';
    this.m = G.costruisciPaesaggio(kit, '<g class="fr-ada-collina"></g>', {
      pre: 'frase', laggiu: 1, manopola: 0, banchina: true, morto: true, treni: false, davanti: quad,
      html: G.sottotitolo('NARRATORE', 'Tra mille frasi, ne arriva una che Ada conosce.') +
        G.sottotitolo('ADA', 'Al mare Emma!') +
        G.sottotitolo('NARRATORE', 'Salgono Al, Mare ed Emma. Ma qui i vestiti hanno altri colori: ogni parco ha i suoi.') +
        G.sottotitolo('NARRATORE', 'Anche qui nessuno guida. Il treno parte da solo e sparisce nella montagna.'),
    });
    this.G = G;
    const q = this.m.q;
    // Il treno di Al, Mare ed Emma, sul binario dell'andata; i biglietti, Ada, la sua striscia: nel parco.
    q('.pi-andata').insertAdjacentHTML('beforeend', '<g class="fr-treno">' + G.treno(this.chi.map(c => ({ tipo: c[0], col: c[1] })), { sbarra: 0 }) + '</g>');
    q('.pi-davanti').insertAdjacentHTML('beforeend', '<g class="fr-ada"></g>' +
      this.chi.map(c => '<g class="fr-big" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(c[2]) + '</g></g>').join('') + scintille +
      '<g class="fr-striscia" opacity="0"><g transform="translate(-150 -22)">' + G.striscia('Al mare Emma', 300) + '</g></g>');
    this.vag = this.m.qa('.fr-treno .g-vag');
    this.pass = this.vag.map(v => v.querySelector('.g-pass'));
    this.adaColl = q('.fr-ada-collina'); this.ada = q('.fr-ada'); this.big = this.m.qa('.fr-big'); this.scint = this.m.qa('.fr-scint');
    this.str = q('.fr-striscia'); this.quad = q('.fr-quad'); this.pagina = q('.fr-pagina');
    this.adaColl.innerHTML = '<g transform="' + G.posaAda(2550, 558) + '">' + G.ada('quaderno', 'sorpresa') + '</g>';
    this.fase = FR_P.quando(10, -3000, 0);
    this.statoAda = '';
    this.sub = G.subs(kit, [[1.4, 5.8], [7.0, 8.8], [11.4, 19.0], [22.6, 29.2]]);
  },
  render(t, kit) {
    t = window.G.tempo('09', 'frase', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(FR_CAM, t));
    G.animaPaesaggio(m, t + this.fase, { treni: false, forbice: t > 7.8 });
    // Ada in cima alla collina, finché non scende (stacco).
    this.adaColl.setAttribute('opacity', t < 1.15 ? 1 : 0);
    // Il treno: fermo alla stazione, poi parte da solo e sparisce nella bocca della prima cima.
    const s = G.percorso(t, 0, FR_VEL);
    this.vag.forEach((v, i) => {
      const x = FR_POSTI[i] + s;
      v.setAttribute('transform', FR_P.posaVagone(x, FR_P.andata + (s > 0 ? 1.2 * Math.sin(t * 7 + i) : 0), 1));
      v.setAttribute('opacity', Math.max(0, Math.min(1, (FR_P.bocca - x) / 30)).toFixed(3));
    });
    G.sbarre(this.vag, i => eio(seg(t, FR_SBARRE[0] + i * 0.2, FR_SBARRE[1] + i * 0.2)));
    // I biglietti escono dalla bocca dello Spezzaparole e volano sui sedili; poi i passeggeri prendono vita.
    const [bx, by] = FR_P.boccaSpezza;
    this.big.forEach((b, i) => {
      const a = FR_USCITE[i], vita = a + FR_VOLO + FR_VITA, u = eio(seg(t, a, a + FR_VOLO));
      const sx = FR_POSTI[i] - 6, sy = FR_P.andata - 36;
      const x = lerp(bx, sx, u), y = lerp(by, sy - 6, u) - 140 * Math.sin(Math.PI * u);
      const nasce = seg(t, vita - 0.15, vita + 0.25);
      b.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + (-10 * u).toFixed(1) + ') scale(' + (0.3 * (1 - 0.5 * nasce)).toFixed(3) + ')');
      b.setAttribute('opacity', t < a ? 0 : (1 - nasce).toFixed(3));
      const v = eo(seg(t, vita, vita + 0.6)), p = this.pass[i];
      p.setAttribute('opacity', v.toFixed(3));
      p.setAttribute('transform', 'translate(140 40) scale(' + lerp(0.5, 1, v).toFixed(3) + ') translate(-140 -40)');
      const sc = seg(t, vita, vita + 1.1);
      this.scint[i].setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
      [...this.scint[i].children].forEach((c, j) => { const an = j * Math.PI / 4 + 0.3, d = 8 + 30 * eo(sc); c.setAttribute('cx', (sx + d * Math.cos(an)).toFixed(1)); c.setAttribute('cy', (sy - 12 + d * Math.sin(an)).toFixed(1)); });
    });
    // La striscia di Ada: arriva, le passa accanto (si legge), poi sale nella fessura dello Spezzaparole.
    const [fx, fy] = FR_P.fessura;
    let px, py, sc, rot;
    if (t < FR_STRISCIA[1]) {
      const u = eio(seg(t, FR_STRISCIA[0], FR_STRISCIA[1]));
      [px, py] = frBez([[-300, 700], [100, 820], [380, 960], [560, 955]], u);
      sc = lerp(0.12, 0.45, u); rot = lerp(-10, 4, u) + 3 * Math.sin(t * 3);
    } else {
      const u = eio(seg(t, FR_STRISCIA[1], FR_STRISCIA[2]));
      [px, py] = frBez([[560, 955], [760, 860], [fx + 60, fy - 260], [fx, fy + 10]], u);
      sc = lerp(0.45, 0.12, u); rot = lerp(4, 90, eio(seg(t, FR_STRISCIA[2] - 0.6, FR_STRISCIA[2]))) + 3 * Math.sin(t * 3) * (1 - u);
    }
    this.str.setAttribute('transform', 'translate(' + px.toFixed(1) + ' ' + py.toFixed(1) + ') rotate(' + rot.toFixed(1) + ') scale(' + sc.toFixed(3) + ')');
    this.str.setAttribute('opacity', (seg(t, FR_STRISCIA[0], FR_STRISCIA[0] + 0.3) * (1 - seg(t, FR_STRISCIA[2] - 0.15, FR_STRISCIA[2]))).toFixed(3));
    // Ada arriva alla ringhiera; legge la striscia, guarda i passeggeri, apre il quaderno, guarda il treno partire.
    const u = seg(t, FR_ENTRA[0], FR_ENTRA[1]);
    const x = lerp(FR_ADA[0][0], FR_ADA[1][0], eio(u) * 0.3 + u * 0.7), y = FR_ADA[0][1] - (u > 0 && u < 1 ? 5 * Math.abs(Math.sin(t * 9)) : 0);
    const posa = t < FR_QUADERNO[0] ? 'base' : 'quaderno';
    const espr = t < 4.6 ? 'base' : t < 9.0 ? 'sorpresa' : t < 13.0 ? 'felice' : t < 19.0 ? 'pensa' : t < 22.4 ? 'sorpresa' : 'felice';
    const k = posa + espr;
    if (k !== this.statoAda) {
      this.ada.innerHTML = '<g class="fr-ada-in">' + G.ada(posa, espr) + (posa === 'base' ?
        '<g transform="rotate(-10 140 196)"><rect x="124" y="168" width="34" height="50" rx="4" fill="#2F6F73" stroke="#1E4A4D" stroke-width="2.5"/><rect x="154" y="172" width="4" height="42" fill="' + G.C.crema + '"/></g>' : '') + '</g>';
      this.statoAda = k;
    }
    this.ada.firstChild.setAttribute('transform', G.posaAda(x, y));
    // Il quaderno, a sinistra: la sua Emma rosa, accanto a questa Emma color paglia.
    const qd = seg(t, FR_QUADERNO[0], FR_QUADERNO[1]) * (1 - seg(t, FR_QUADERNO[2], FR_QUADERNO[3]));
    this.quad.setAttribute('opacity', qd.toFixed(3));
    this.quad.setAttribute('transform', 'translate(0 ' + (60 * (1 - eo(seg(t, FR_QUADERNO[0], FR_QUADERNO[1])))).toFixed(1) + ')');
    const zq = lerp(2.9, 3.1, seg(t, FR_QUADERNO[0], FR_QUADERNO[3]));
    this.pagina.setAttribute('transform', 'translate(' + (470 - 440 * zq).toFixed(1) + ' ' + (560 - 400 * zq).toFixed(1) + ') scale(' + zq.toFixed(3) + ')');
    this.sub(t);
  },
});
