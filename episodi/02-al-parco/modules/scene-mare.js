const { seg, eo, ei, eio, lerp } = kit;
// Il primo treno esce come l'altra volta: Emma è blu, e sotto l'ultimo vagone la vasca si riempie di blu. Il treno si
// ferma in stazione e i vestiti tornano del colore dei biglietti. Ada pesca a occhi chiusi: una paperella blu, «nuota».
// Le altre scivolano via; la paperella sale su un vagone nuovo. Poi il treno va ad aspettare in cima alla salita.
// Si apre dalla luce dell'uscita; finisce con la stazione libera e la vasca vuota (la riprende «verde»).
const MR_CAM = [
  { t: 0, cx: 820, cy: 820, z: 3.0 },
  { t: 3.6, cx: 820, cy: 820, z: 3.0 },
  { t: 5.4, cx: 772, cy: 862, z: 4.4 },
  { t: 8.6, cx: 772, cy: 862, z: 4.4 },
  { t: 11.0, cx: 640, cy: 846, z: 4.2 },
  { t: 17.4, cx: 640, cy: 846, z: 4.2 },
  { t: 19.6, cx: 520, cy: 816, z: 3.0 },
  { t: 22.0, cx: 520, cy: 816, z: 3.0 },
  { t: 27.4, cx: 520, cy: 650, z: 1.7 },
];
const MR_ESCE = 1.0;
const MR_VEL = [[MR_ESCE, 100], [4.4, 55], [8.0, 55], [9.4, 130], [11.0, 130], [12.8, 0]];
const MR_ADA = [672, 896];
const MR_PESCA = { giu: 12.4, su: 14.2, preso: 14.7 };
const MR_SALTA = 17.4, MR_SALE = 20.6, MR_VAGONE = 19.8;
const MR_SALITA = [22.4, 27.8], MR_CIMA = 1080;
kit.scene('mare', {
  init(kit) {
    const G = window.G, M = G.MONDO, D = G.MOD.mare, P = D.passeggeri;
    this.chi = [['al', P.Al], ['mare', P.mare], ['emma', P.Emma]];
    this.lista = G.papereVasca(D.vasca);
    let best = 0, bd = 1e9;
    this.lista.forEach((p, i) => { const d = Math.abs(p.x - 700) + Math.abs(p.y - 880); if (p.parola === 'nuota' && d < bd) { bd = d; best = i; } });
    this.presa = best; this.colPresa = this.lista[best].col;
    const ordine = this.lista.map((p, i) => i).sort((a, b) => this.lista[a].y - this.lista[b].y);
    const papere = ordine.map(i => '<g class="mr-pap" data-i="' + i + '"><g transform="translate(-50 -84)">' + G.paperella(this.lista[i].col) + '</g></g>').join('');
    const treno = this.chi.map(c => ({ tipo: c[0], col: c[1].tratti[2] })).concat([{ tipo: 'paperella', col: D.nuovo.nuota }]);
    let scintille = '';
    for (let k = 0; k < 10; k++) scintille += '<circle r="2.4" fill="' + G.C.luce + '"/>';
    const sopra = '<g class="mr-treno">' + G.treno(treno, { sbarra: 1 }) + '</g>' +
      '<g class="mr-scint" opacity="0">' + scintille + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="mr-ada"></g>' +
      '<ellipse class="mr-luce" rx="22" ry="18" fill="' + this.colPresa + '" opacity="0" filter="url(#g-soft)"/>' +
      '<g class="mr-mano"><g transform="translate(-50 -84)">' + G.paperella(this.colPresa) + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'mare',
      davanti: '<defs><radialGradient id="g-mr-luce" cx="0" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
        '<rect class="mr-uscita" x="-200" y="-200" width="2400" height="1480" fill="url(#g-mr-luce)"/>',
      html: G.sottotitolo('NARRATORE', 'Il primo treno esce come l’altra volta: Emma è blu, e la vasca si riempie di blu.') +
        G.sottotitolo('ADA', 'Nuota!'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', papere);
    this.G = G;
    this.vag = this.m.qa('.mr-treno .g-vag'); this.ada = this.m.q('.mr-ada'); this.uscita = this.m.q('.mr-uscita');
    this.mano = this.m.q('.mr-mano'); this.luce = this.m.q('.mr-luce'); this.scint = this.m.q('.mr-scint');
    this.pap = this.m.qa('.mr-pap').map(el => ({ el, i: +el.dataset.i }));
    this.passNuovo = this.vag[3].querySelector('.g-pass');
    const path = this.m.arrivo, sF = path.getTotalLength() - (M.fermo - 40);
    this.sF = sF;
    const sAt = t => Math.min(sF, G.percorso(t, 0, MR_VEL));
    this.cade = this.lista.map(p => {
      for (let t = MR_ESCE; t < 20; t += 0.02) { const se = sAt(t) - 2 * M.passo; if (se > 0 && path.getPointAtLength(se).x <= p.x + 6) return t; }
      return 8;
    });
    this.sedile = [M.fermo + 3 * M.passo + 6, 816];
    this.stato = '';
    this.sub = G.subs(kit, [[2.0, 9.6], [15.2, 17.2]]);
  },
  manoAt(giu) {
    const s = 0.28, [ax, ay] = MR_ADA, mx = 150 + 26 * giu - 6, my = 230 + 50 * giu + 6;
    return [ax - 100 * s + mx * s, ay - 304 * s + my * s];
  },
  render(t, kit) {
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(MR_CAM, t));
    G.animaMondo(m, t + 760);
    this.uscita.setAttribute('opacity', (0.95 * (1 - eio(seg(t, 0.1, 1.6)))).toFixed(3));
    // Il treno: esce dalla montagna, si ferma in stazione; poi riparte e va in cima alla salita.
    const s = Math.min(this.sF, G.percorso(t, 0, MR_VEL));
    if (t < MR_SALITA[0]) {
      G.posaTreno(this.vag, m.arrivo, t < MR_ESCE ? -500 : s);
      G.nascondiInMontagna(this.vag, m.arrivo, t < MR_ESCE ? -500 : s, { inizio: true });
    } else {
      G.posaTreno(this.vag, m.partenza, lerp(640 - M.fermo, MR_CIMA, eio(seg(t, MR_SALITA[0], MR_SALITA[1]))));
    }
    const torna = seg(s, this.sF - 150, this.sF);
    this.vag.slice(0, 3).forEach((v, i) => G.cambiaPasseggero(v, this.chi[i][0], G.mix(this.chi[i][1].tratti[2], this.chi[i][1].biglietto, Math.round(torna * 12) / 12)));
    // Le paperelle cadono dove passa l'ultimo vagone.
    this.pap.forEach(({ el, i }) => {
      const t0 = this.cade[i], p = this.lista[i];
      const u = seg(t, t0, t0 + 0.55);
      const via = eio(seg(t, 17.6 + (i % 7) * 0.12, 19.2 + (i % 7) * 0.12)), a = via * 2.4 + i;
      const x = lerp(p.x, 772 + 8 * Math.cos(a), via);
      const y = lerp(lerp(808, p.y, ei(u)) + (u >= 1 ? 1.2 * Math.sin(t * 2.2 + i) : 0), 884, via);
      el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.16 * (u < 1 ? lerp(0.7, 1, u) : 1) * (1 - via)).toFixed(4) + ')');
      el.setAttribute('opacity', t < t0 ? 0 : i === this.presa ? (t < MR_PESCA.su + 0.2 ? 1 : 0) : (1 - seg(via, 0.85, 1)).toFixed(3));
    });
    // Ada: guarda il treno, poi pesca a occhi chiusi.
    let giu = 0;
    if (t >= MR_PESCA.giu - 0.6) giu = eio(seg(t, MR_PESCA.giu - 0.6, MR_PESCA.giu + 0.4));
    if (t > MR_PESCA.giu + 0.4 && t < MR_PESCA.su) giu = 0.9 + 0.1 * Math.sin((t - MR_PESCA.giu) * 9);
    if (t >= MR_PESCA.su) giu = 1 - eio(seg(t, MR_PESCA.su, MR_PESCA.preso + 0.4));
    const posa = t < 11.4 ? 'quaderno' : 'pesca';
    const espr = t < 6 ? 'base' : t < 11.4 ? 'felice' : t < MR_PESCA.preso ? 'chiusi' : t < 19 ? 'sorpresa' : 'felice';
    const giuQ = Math.round(giu * 40) / 40;
    const k = posa + espr + giuQ;
    if (k !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(MR_ADA[0], MR_ADA[1]) + '">' + G.ada(posa, espr, { giu: giuQ }) + '</g>'; this.stato = k; }
    // La paperella pescata: in mano ad Ada, poi salta giù e corre al vagone nuovo.
    const [hx, hy] = this.manoAt(giuQ);
    let px = hx, py = hy, pr = 0, pv = t >= MR_PESCA.su + 0.2 ? 1 : 0;
    if (t >= MR_SALTA) {
      const a = eo(seg(t, MR_SALTA, MR_SALTA + 0.7)), corsa = eio(seg(t, MR_SALTA + 0.7, MR_SALE - 0.5)), salto = eio(seg(t, MR_SALE - 0.5, MR_SALE));
      if (t < MR_SALTA + 0.7) { px = lerp(hx, 636, a); py = lerp(hy, 836, a) - 30 * Math.sin(Math.PI * a); }
      else if (t < MR_SALE - 0.5) { px = lerp(636, this.sedile[0] + 24, corsa); py = 836 - 3 * Math.abs(Math.sin(t * 12)); pr = 9 * Math.sin(t * 12); }
      else { px = lerp(this.sedile[0] + 24, this.sedile[0], salto); py = lerp(836, this.sedile[1], salto) - 22 * Math.sin(Math.PI * salto); }
      pv = t < MR_SALE ? 1 : 1 - seg(t, MR_SALE, MR_SALE + 0.3);
    }
    this.mano.setAttribute('transform', 'translate(' + px.toFixed(2) + ' ' + py.toFixed(2) + ') rotate(' + pr.toFixed(2) + ') scale(0.16)');
    this.mano.setAttribute('opacity', pv.toFixed(3));
    const luce = seg(t, MR_PESCA.su + 0.3, MR_PESCA.preso + 0.4) * (1 - seg(t, 16.8, 17.6));
    this.luce.setAttribute('cx', hx.toFixed(1)); this.luce.setAttribute('cy', (hy - 10).toFixed(1));
    this.luce.setAttribute('opacity', (0.6 * luce).toFixed(3));
    // Il vagone nuovo compare dietro Emma, con le scintille; la paperella ci sale.
    this.vag[3].setAttribute('opacity', eo(seg(t, MR_VAGONE, MR_VAGONE + 0.6)).toFixed(3));
    this.passNuovo.setAttribute('opacity', seg(t, MR_SALE - 0.05, MR_SALE + 0.3).toFixed(3));
    const sc = seg(t, MR_VAGONE, MR_VAGONE + 1.1);
    this.scint.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
    [...this.scint.children].forEach((c, n) => { const a = n * Math.PI / 5, d = 10 + 34 * eo(sc); c.setAttribute('cx', (this.sedile[0] + d * Math.cos(a)).toFixed(2)); c.setAttribute('cy', (838 + d * 0.6 * Math.sin(a)).toFixed(2)); });
    this.sub(t);
  },
});
