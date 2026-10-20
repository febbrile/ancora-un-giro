const { seg, eo, ei, eio, lerp } = kit;
// Fuori. Il treno esce dall'ultima cima, sopra il lago. Ada corre lungo la riva fino alla bancarella della pesca, uguale
// alla sua, con il tendone più alto. Passano Al e Mare, e non succede niente; passa Emma, viola: sotto di lei cadono le
// paperelle di luce e toccano l'acqua vere, tantissime viola, parecchie rosa, e poi di tanti colori diversi
// (G.MOD.grande.lago: 400 paperelle). Il treno si ferma oltre il lago. Ada si tira su le maniche, chiude gli occhi e
// pesca una paperella viola, che le salta di mano e corre a sedersi in un vagone nuovo, dietro Emma. Le altre scivolano
// via dallo scarico. Stacco: in una casa lontana, sotto «Al mare Emma» compare «nuota». Ada guarda sul quaderno la sua
// Emma blu e la sua vasca blu, e ride.
// Si apre dalla luce dell'uscita; finisce su Ada che ride alla bancarella (la riprende «nomi»).
const LG_P = window.G.PARCO;
const LG_CAM = [
  LG_P.chiave(0, 7150, 880, 1.6),
  LG_P.chiave(1.4, 7150, 880, 1.6),
  LG_P.chiave(3.2, 6750, 990, 1.0),
  LG_P.chiave(7.4, 5850, 1000, 1.0),
  LG_P.chiave(9.8, 5380, 1010, 2.4),
  LG_P.chiave(19.4, 5390, 1010, 2.4),
  LG_P.chiave(28.4, 5420, 1035, 3.4, 28.39),
  LG_P.chiave(34, 5420, 1035, 3.6),
];
const LG_ESCE = 1.0;
const LG_VEL = [[LG_ESCE, 220], [2.0, 320], [7.2, 320], [9.0, 0]];
const LG_CORSA = [2.4, 6.4], LG_DA = 4880;
const LG_PESCA = { maniche: 10.0, giu: 11.8, su: 13.6, preso: 14.2 };
const LG_SALTA = 15.4, LG_SALE = 16.9, LG_VAGONE = 16.0, LG_VIA = 16.8;
const LG_CASA = [19.4, 19.8, 24.0, 24.4], LG_NUOTA = 20.8;
const LG_QUADERNO = [24.4, 24.8, 28.0, 28.4];
kit.scene('lago', {
  init(kit) {
    const G = window.G, C = G.C, D = G.MOD.grande;
    this.chi = [['al', D.uscita.Al], ['mare', D.uscita.mare], ['emma', D.uscita.Emma]];
    this.lista = G.papereLago(D.lago, 41);
    const mano = this.manoAt(1);
    let best = 0, bd = 1e9;
    this.lista.forEach((p, i) => { const d = Math.hypot(p.x - mano[0], (p.y - mano[1]) * 2); if (p.parola === D.pesca[0] && d < bd) { bd = d; best = i; } });
    this.presa = best; this.colPresa = this.lista[best].col;
    const ordine = this.lista.map((p, i) => i).sort((a, b) => this.lista[a].y - this.lista[b].y);
    let scintille = '';
    for (let k = 0; k < 10; k++) scintille += '<circle r="3" fill="' + C.luce + '"/>';
    // La casa lontana: il telefono, con la frase; poi, sotto, la parola pescata.
    const z = 1.16, [bx, by] = G.SALOTTO.bolla;
    const casa = '<g class="lg-casa" opacity="0"><g transform="translate(' + (bx - bx * z).toFixed(1) + ' ' + (by - by * z).toFixed(1) + ') scale(' + z + ')">' +
      G.salotto('<g>' + G.telefono({ messaggi: ['Al mare Emma'] }) + '</g><g class="lg-nuota" opacity="0">' + G.telefono({ messaggi: ['Al mare Emma'], rispostaTesto: 'nuota' }) + '</g>', { muro: ['#2A2F55', '#3E4677', '#5B3B5E'] }) + '</g></g>';
    const quad = '<g class="lg-quad" opacity="0"><rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030" opacity=".7"/><g transform="translate(-1080 -300) scale(1.5)">' + G.quadernoAda() + '</g></g>';
    const luce = '<defs><radialGradient id="g-lg-luce" cx="1" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
      '<rect class="lg-uscita" x="-200" y="-200" width="2400" height="1480" fill="url(#g-lg-luce)"/>';
    this.m = G.costruisciPaesaggio(kit, '', {
      pre: 'lago', laggiu: 1, manopola: 0, banchina: true, morto: true, davanti: luce + casa + quad,
      html: G.sottotitolo('NARRATORE', 'Il treno esce sopra il lago, e sotto Emma cadono le paperelle. Più colori di quanti se ne possano contare.') +
        G.sottotitolo('NARRATORE', 'Ada chiude gli occhi e pesca, come a casa.') +
        G.sottotitolo('ADA', 'Nuota! È lo stesso giro!'),
    });
    this.G = G;
    const q = this.m.q;
    const passeggeri = this.chi.map(c => ({ tipo: c[0], col: c[1] })).concat([{ tipo: 'paperella', col: D.pesca[1] }]);
    q('.pi-ritorno').insertAdjacentHTML('beforeend', '<g class="lg-treno">' + G.treno(passeggeri, { sbarra: 1 }) + '</g>');
    q('.pi-papere').innerHTML = ordine.map(i => '<use class="lg-pap" data-i="' + i + '" href="#lago-g-pi-papl" fill="' + this.lista[i].col + '" opacity="0"/>').join('');
    q('.pi-davanti').insertAdjacentHTML('beforeend', '<g class="lg-ada"></g><g class="lg-scint" opacity="0">' + scintille + '</g>' +
      '<ellipse class="lg-luce" rx="22" ry="18" fill="' + this.colPresa + '" opacity="0" filter="url(#g-soft)"/>' +
      '<g class="lg-mano" opacity="0"><g transform="translate(-50 -84)">' + G.paperella(this.colPresa) + '</g></g>');
    this.vag = this.m.qa('.lg-treno .g-vag'); this.passNuovo = this.vag[3].querySelector('.g-pass');
    this.pap = this.m.qa('.lg-pap').map(el => ({ el, i: +el.dataset.i, vera: false }));
    this.ada = q('.lg-ada'); this.mano = q('.lg-mano'); this.luce = q('.lg-luce'); this.scint = q('.lg-scint');
    this.uscita = q('.lg-uscita'); this.casa = q('.lg-casa'); this.nuota = q('.lg-nuota'); this.quad = q('.lg-quad');
    // Dove si ferma il treno, e quando Emma (il terzo vagone) passa sopra ogni paperella.
    this.sAt = t => G.percorso(t, 0, LG_VEL);
    this.cade = this.lista.map(p => { for (let t = LG_ESCE; t < 12; t += 0.02) if (LG_P.uscita - this.sAt(t) + 2 * LG_P.passo <= p.x + 6) return t; return 9; });
    const testaFerma = LG_P.uscita - this.sAt(30);
    this.sedile = [testaFerma + 3 * LG_P.passo + 6, LG_P.ritorno - 36];
    this.stato = '';
    this.sub = G.subs(kit, [[1.8, 10.8], [12.0, 16.0], [28.6, 31.6]]);
  },
  manoAt(giu) {
    const s = 0.28, [ax, ay] = window.G.PARCO.ada, mx = 150 + 26 * giu - 6, my = 230 + 50 * giu + 6;
    return [ax - 100 * s + mx * s, ay - 304 * s + my * s];
  },
  render(t, kit) {
    t = window.G.tempo('09', 'lago', t);
    const G = this.G, m = this.m, [sx, sy] = LG_P.scarico;
    m.cam.setAttribute('transform', G.camChiavi(LG_CAM, t));
    G.animaPaesaggio(m, t + 200, { treni: false });
    this.uscita.setAttribute('opacity', (0.95 * (1 - eio(seg(t, 0.1, 1.6)))).toFixed(3));
    // Il treno: esce dall'ultima cima, passa sopra il lago, si ferma oltre la riva.
    const testa = LG_P.uscita - (t < LG_ESCE ? -400 : this.sAt(t));
    this.vag.forEach((v, i) => {
      const x = testa + i * LG_P.passo;
      v.setAttribute('transform', LG_P.posaVagone(x, LG_P.ritorno + (t < 9 ? 1.2 * Math.sin(t * 7 + i) : 0), -1));
      v.setAttribute('opacity', (i < 3 ? Math.max(0, Math.min(1, (LG_P.uscita - x) / 30)) : eo(seg(t, LG_VAGONE, LG_VAGONE + 0.6))).toFixed(3));
    });
    this.passNuovo.setAttribute('opacity', seg(t, LG_SALE - 0.05, LG_SALE + 0.3).toFixed(3));
    // Le paperelle: cadono di luce sotto Emma e toccano l'acqua vere; dopo la pesca scivolano via dallo scarico.
    this.pap.forEach(P => {
      const t0 = this.cade[P.i], p = this.lista[P.i], u = seg(t, t0, t0 + 0.55);
      if (t < t0) { P.el.setAttribute('opacity', 0); return; }
      const vera = u >= 0.7;
      if (vera !== P.vera) { P.el.setAttribute('href', vera ? '#lago-g-pi-papv' : '#lago-g-pi-papl'); P.vera = vera; }
      const via = eio(seg(t, LG_VIA + (P.i % 9) * 0.1, LG_VIA + 1.6 + (P.i % 9) * 0.1));
      const x = lerp(p.x, sx, via), y = lerp(lerp(LG_P.ritorno, p.y, ei(u)) + (u >= 1 ? 1.5 * Math.sin(t * 2.2 + P.i) : 0), sy, via);
      P.el.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (0.16 * (u < 1 ? lerp(0.7, 1, u) : 1) * (1 - via)).toFixed(4) + ') translate(-50 -84)');
      P.el.setAttribute('opacity', P.i === this.presa ? (t < LG_PESCA.su + 0.2 ? 1 : 0) : (1 - seg(via, 0.85, 1)).toFixed(3));
    });
    // Ada: corre lungo la riva, guarda, si tira su le maniche, pesca a occhi chiusi.
    const [ax, ay] = LG_P.ada, uc = seg(t, LG_CORSA[0], LG_CORSA[1]);
    const x = lerp(LG_DA, ax, eio(uc) * 0.3 + uc * 0.7), corre = uc > 0 && uc < 1;
    let giu = 0;
    if (t >= LG_PESCA.maniche && t < LG_PESCA.maniche + 0.9) giu = 0.18 * Math.abs(Math.sin((t - LG_PESCA.maniche) * 10));
    if (t >= LG_PESCA.giu - 0.6) giu = eio(seg(t, LG_PESCA.giu - 0.6, LG_PESCA.giu + 0.4));
    if (t > LG_PESCA.giu + 0.4 && t < LG_PESCA.su) giu = 0.9 + 0.1 * Math.sin((t - LG_PESCA.giu) * 9);
    if (t >= LG_PESCA.su) giu = 1 - eio(seg(t, LG_PESCA.su, LG_PESCA.preso + 0.4));
    const giuQ = Math.round(giu * 40) / 40;
    const posa = t < LG_PESCA.maniche ? 'quaderno' : t < 24.4 ? 'pesca' : 'quaderno';
    const espr = t < 4.4 ? 'felice' : t < LG_PESCA.maniche ? 'sorpresa' : t < 11.0 ? 'felice' : t < LG_PESCA.preso ? 'chiusi' : t < 15.6 ? 'sorpresa' : 'felice';
    const k = posa + espr + giuQ;
    if (k !== this.stato) { this.ada.innerHTML = '<g class="lg-ada-in">' + G.ada(posa, espr, { giu: giuQ }) + '</g>'; this.stato = k; }
    const ride = t > 28.4 ? 3 * Math.abs(Math.sin(t * 8)) * (1 - seg(t, 32, 33)) : 0;
    this.ada.firstChild.setAttribute('transform', G.posaAda(x, ay - (corre ? 6 * Math.abs(Math.sin(t * 10)) : 0) - ride));
    // La paperella pescata: in mano ad Ada, poi salta e corre a sedersi nel vagone nuovo.
    const [hx, hy] = this.manoAt(giuQ), [qx, qy] = this.sedile;
    let px = hx, py = hy, pr = 0, pv = t >= LG_PESCA.su + 0.2 ? 1 : 0;
    if (t >= LG_SALTA) {
      const a = eo(seg(t, LG_SALTA, LG_SALTA + 0.5)), b = eio(seg(t, LG_SALTA + 0.5, LG_SALE));
      if (t < LG_SALTA + 0.5) { px = lerp(hx, hx - 40, a); py = lerp(hy, ay + 4, a) - 24 * Math.sin(Math.PI * a); pr = -10 * a; }
      else { px = lerp(hx - 40, qx, b); py = lerp(ay + 4, qy, b) - 110 * Math.sin(Math.PI * b); pr = 8 * Math.sin(t * 14); }
      pv = t < LG_SALE ? 1 : 1 - seg(t, LG_SALE, LG_SALE + 0.3);
    }
    this.mano.setAttribute('transform', 'translate(' + px.toFixed(1) + ' ' + py.toFixed(1) + ') rotate(' + pr.toFixed(1) + ') scale(0.16)');
    this.mano.setAttribute('opacity', pv.toFixed(3));
    const lu = seg(t, LG_PESCA.su + 0.3, LG_PESCA.preso + 0.4) * (1 - seg(t, 15.0, 15.6));
    this.luce.setAttribute('cx', hx.toFixed(1)); this.luce.setAttribute('cy', (hy - 10).toFixed(1));
    this.luce.setAttribute('opacity', (0.6 * lu).toFixed(3));
    const sc = seg(t, LG_VAGONE, LG_VAGONE + 1.1);
    this.scint.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
    [...this.scint.children].forEach((c, n) => { const an = n * Math.PI / 5, dd = 10 + 34 * eo(sc); c.setAttribute('cx', (qx + dd * Math.cos(an)).toFixed(1)); c.setAttribute('cy', (qy + 10 + dd * 0.6 * Math.sin(an)).toFixed(1)); });
    // La casa lontana e il quaderno.
    this.casa.setAttribute('opacity', (seg(t, LG_CASA[0], LG_CASA[1]) * (1 - seg(t, LG_CASA[2], LG_CASA[3]))).toFixed(3));
    this.nuota.setAttribute('opacity', eo(seg(t, LG_NUOTA, LG_NUOTA + 0.4)).toFixed(3));
    this.quad.setAttribute('opacity', (seg(t, LG_QUADERNO[0], LG_QUADERNO[1]) * (1 - seg(t, LG_QUADERNO[2], LG_QUADERNO[3]))).toFixed(3));
    this.sub(t);
  },
});
