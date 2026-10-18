const { seg, eo, ei, eio, lerp } = kit;
// Ada va alla vasca, pesca una paperella a occhi chiusi (blu: «nuota», ma qui non si legge), le altre scivolano via.
// La paperella corre al treno, nasce un vagone nuovo e lei ci sale; sul telefono la storia cresce di una parola.
// Si apre dove finisce «vasca»; finisce sul treno con quattro vagoni (lo riprende «ancora»).
const PE_CAM = [
  { t: 0, cx: 540, cy: 800, z: 2.3 },
  { t: 3.6, cx: 728, cy: 846, z: 4.2 },
  { t: 11.2, cx: 728, cy: 846, z: 4.2 },
  { t: 14.6, cx: 470, cy: 806, z: 3.0 },
  { t: 20.4, cx: 470, cy: 806, z: 3.0 },
  { t: 25.6, cx: 400, cy: 790, z: 2.7 },
];
const PE_ADA = { da: [520, 834], a: [672, 896] };
const PE_PESCA = { giu: 4.6, su: 7.4, preso: 7.9 };
const PE_SALTA = 11.5, PE_SALE = 15.0, PE_VAGONE = 14.2;
const PE_TEL = [15.8, 16.4, 19.6, 20.2];
kit.scene('pesca', {
  init(kit) {
    const G = window.G, M = G.MONDO, D = G.MOD.mare, P = D.passeggeri;
    this.lista = G.papereVasca(D.vasca);
    // La paperella pescata: la blu più vicina alla mano di Ada.
    let best = 0, bd = 1e9;
    this.lista.forEach((p, i) => { const d = Math.abs(p.x - 700) + Math.abs(p.y - 880); if (p.parola === 'nuota' && d < bd) { bd = d; best = i; } });
    this.presa = best;
    this.colPresa = this.lista[best].col;
    const ordine = this.lista.map((p, i) => i).sort((a, b) => this.lista[a].y - this.lista[b].y);
    const papere = ordine.map(i => '<g class="pe-pap" data-i="' + i + '"><g transform="translate(-50 -84)">' + G.paperella(this.lista[i].col) + '</g></g>').join('');
    const chi = [{ tipo: 'al', col: P.Al.biglietto }, { tipo: 'mare', col: P.mare.biglietto }, { tipo: 'emma', col: P.Emma.biglietto }, { tipo: 'paperella', col: D.nuovo.nuota }];
    let scintille = '';
    for (let k = 0; k < 10; k++) scintille += '<circle r="2.4" fill="' + G.C.luce + '"/>';
    const sopra = '<g class="pe-treno">' + G.treno(chi, { sbarra: 1 }) + '</g>' +
      '<g class="pe-scint" opacity="0">' + scintille + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="pe-ada"></g>' +
      '<ellipse class="pe-luce" rx="22" ry="18" fill="' + this.colPresa + '" opacity="0" filter="url(#g-soft)"/>' +
      '<g class="pe-mano"><g transform="translate(-50 -84)">' + G.paperella(this.colPresa) + '</g></g>';
    const z = 1.16, [bx, by] = G.SALOTTO.bolla;
    const camTel = 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z + ')';
    const telefono = '<g class="pe-tel" opacity="0"><g transform="' + camTel + '">' + G.salotto('<g class="pe-tel-a">' + G.telefono({ messaggi: ['Al mare Emma'] }) + '</g><g class="pe-tel-b" opacity="0">' + G.telefono({ messaggi: ['Al mare Emma'], risposta: 1 }) + '</g>') + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'pesca', davanti: telefono,
      html: G.sottotitolo('NARRATORE', 'Ada ne pesca una, senza guardare.') +
        G.sottotitolo('NARRATORE', 'La paperella sale sul treno, in un vagone nuovo, e sul telefono la storia cresce di una parola.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', papere);
    this.G = G;
    this.vag = this.m.qa('.pe-treno .g-vag'); this.ada = this.m.q('.pe-ada'); this.mano = this.m.q('.pe-mano'); this.luce = this.m.q('.pe-luce');
    this.pap = this.m.qa('.pe-pap').map(el => ({ el, i: +el.dataset.i })); this.scint = this.m.q('.pe-scint');
    this.tel = this.m.q('.pe-tel'); this.telB = this.m.q('.pe-tel-b');
    this.passNuovo = this.vag[3].querySelector('.g-pass');
    const L = this.m.arrivo.getTotalLength();
    G.posaTreno(this.vag, this.m.arrivo, L - (M.fermo - 40));
    this.sedile = [M.fermo + 3 * M.passo + 6, 816];
    this.stato = '';
    this.sub = G.subs(kit, [[4.4, 8.6], [11.4, 20.4]]);
  },
  // Dove sta la mano di Ada (mondo) per un certo «giu».
  manoAt(giu) {
    const s = 0.28, [ax, ay] = PE_ADA.a;
    const mx = 150 + 26 * giu - 6, my = 230 + 50 * giu + 6;
    return [ax - 100 * s + mx * s, ay - 304 * s + my * s];
  },
  render(t, kit) {
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PE_CAM, t));
    G.animaMondo(m, t + 164);
    // Ada cammina fino al gradino della vasca.
    const u = eio(seg(t, 0.6, 3.4));
    const ax = lerp(PE_ADA.da[0], PE_ADA.a[0], u), ay = lerp(PE_ADA.da[1], PE_ADA.a[1], u) - 16 * Math.sin(Math.PI * u) - (u > 0 && u < 1 ? 2.5 * Math.abs(Math.sin(t * 9)) : 0);
    let giu = 0;
    if (t >= PE_PESCA.giu - 0.6) giu = eio(seg(t, PE_PESCA.giu - 0.6, PE_PESCA.giu + 0.4));
    if (t > PE_PESCA.giu + 0.4 && t < PE_PESCA.su) giu = 0.9 + 0.1 * Math.sin((t - PE_PESCA.giu) * 9);
    if (t >= PE_PESCA.su) giu = 1 - eio(seg(t, PE_PESCA.su, PE_PESCA.preso + 0.4));
    const posa = t < 3.6 ? 'base' : 'pesca';
    const espr = t < 3.6 ? 'felice' : t < 4.4 ? 'base' : t < PE_PESCA.preso ? 'chiusi' : t < 10.5 ? 'sorpresa' : 'felice';
    const giuQ = Math.round(giu * 40) / 40;
    const chiave = posa + espr + giuQ + ax.toFixed(1) + ay.toFixed(1);
    if (chiave !== this.stato) {
      this.ada.innerHTML = '<g transform="' + G.posaAda(ax, ay) + '">' + G.ada(posa, espr, { giu: giuQ }) + '</g>';
      this.stato = chiave;
    }
    // La paperella pescata: nella mano, poi salta giù, corre al treno e sale sul vagone nuovo.
    const [hx, hy] = this.manoAt(giuQ);
    let px = hx, py = hy, ps = 0.16, pr = 0, pv = t >= PE_PESCA.su + 0.2 ? 1 : 0;
    if (t >= PE_SALTA) {
      const a = eo(seg(t, PE_SALTA, PE_SALTA + 0.7));
      const corsa = eio(seg(t, PE_SALTA + 0.7, PE_SALE - 0.5));
      const salto = eio(seg(t, PE_SALE - 0.5, PE_SALE));
      if (t < PE_SALTA + 0.7) { px = lerp(hx, 636, a); py = lerp(hy, 836, a) - 30 * Math.sin(Math.PI * a); }
      else if (t < PE_SALE - 0.5) { px = lerp(636, this.sedile[0] + 24, corsa); py = 836 - 3 * Math.abs(Math.sin(t * 12)); pr = 9 * Math.sin(t * 12); }
      else { px = lerp(this.sedile[0] + 24, this.sedile[0], salto); py = lerp(836, this.sedile[1], salto) - 22 * Math.sin(Math.PI * salto); }
      pv = t < PE_SALE ? 1 : 1 - seg(t, PE_SALE, PE_SALE + 0.3);
    }
    this.mano.setAttribute('transform', 'translate(' + px.toFixed(2) + ' ' + py.toFixed(2) + ') rotate(' + pr.toFixed(2) + ') scale(' + ps + ')');
    this.mano.setAttribute('opacity', pv.toFixed(3));
    // La luce blu sul viso di Ada.
    const luce = seg(t, PE_PESCA.su + 0.3, PE_PESCA.preso + 0.4) * (1 - seg(t, 10.6, 11.6));
    this.luce.setAttribute('cx', hx.toFixed(1)); this.luce.setAttribute('cy', (hy - 10).toFixed(1));
    this.luce.setAttribute('opacity', (0.6 * luce).toFixed(3));
    // Le paperelle nella vasca; dopo la pesca scivolano via dallo scarico, girando verso il centro.
    this.pap.forEach(({ el, i }) => {
      const p = this.lista[i];
      if (i === this.presa) { el.setAttribute('opacity', t < PE_PESCA.su + 0.2 ? 1 : 0); }
      const via = eio(seg(t, 9.2 + (i % 7) * 0.12, 10.9 + (i % 7) * 0.12));
      const a = via * 2.4 + i;
      const x = lerp(p.x, 772 + 8 * Math.cos(a), via), y = lerp(p.y, 884, via) + (1 - via) * 1.2 * Math.sin(t * 2.2 + i);
      el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.16 * (1 - via)).toFixed(4) + ')');
      if (i !== this.presa) el.setAttribute('opacity', (1 - seg(via, 0.85, 1)).toFixed(3));
    });
    // Il vagone nuovo nasce con qualche scintilla; la paperella diventa il suo passeggero.
    const nasce = eo(seg(t, PE_VAGONE, PE_VAGONE + 0.6));
    this.vag[3].setAttribute('opacity', nasce.toFixed(3));
    this.passNuovo.setAttribute('opacity', seg(t, PE_SALE - 0.05, PE_SALE + 0.3).toFixed(3));
    const sc = seg(t, PE_VAGONE, PE_VAGONE + 1.1);
    this.scint.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
    [...this.scint.children].forEach((c, k) => {
      const a = k * Math.PI / 5, d = 10 + 34 * eo(sc);
      c.setAttribute('cx', (this.sedile[0] + d * Math.cos(a)).toFixed(2)); c.setAttribute('cy', (838 + d * 0.6 * Math.sin(a)).toFixed(2));
    });
    // Sul telefono, sotto il messaggio, compare una parola (illeggibile).
    this.tel.setAttribute('opacity', (seg(t, PE_TEL[0], PE_TEL[1]) * (1 - seg(t, PE_TEL[2], PE_TEL[3]))).toFixed(3));
    this.telB.setAttribute('opacity', eo(seg(t, 17.0, 17.4)).toFixed(3));
    this.sub(t);
  },
});
