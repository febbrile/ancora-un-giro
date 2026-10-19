const { seg, eo, ei, eio, lerp } = kit;
// Ada pesca a occhi chiusi: una paperella blu. «Nuota!». Le altre scivolano via; la paperella corre al treno e sale su un
// vagone nuovo. Sul telefono: «Al mare Emma» e, sotto, «nuota».
// Si apre come finisce «uscita»; finisce sul treno con quattro vagoni (lo riprende «quaderno»).
const PQ_CAM = [
  { t: 0, cx: 540, cy: 800, z: 2.3 },
  { t: 2.4, cx: 728, cy: 846, z: 4.2 },
  { t: 10.0, cx: 728, cy: 846, z: 4.2 },
  { t: 13.4, cx: 470, cy: 806, z: 3.0 },
  { t: 21.6, cx: 470, cy: 806, z: 3.0 },
  { t: 28.6, cx: 520, cy: 800, z: 2.4 },
];
const PQ_ADA = [672, 896];
const PQ_PESCA = { giu: 3.0, su: 5.4, preso: 5.9 };
const PQ_SALTA = 10.2, PQ_SALE = 13.8, PQ_VAGONE = 13.0;
const PQ_TEL = [15.0, 15.6, 20.4, 21.0];
kit.scene('pesca', {
  init(kit) {
    const G = window.G, M = G.MONDO, D = G.MOD.mare, P = D.passeggeri;
    this.lista = G.papereVasca(D.vasca);
    let best = 0, bd = 1e9;
    this.lista.forEach((p, i) => { const d = Math.abs(p.x - 700) + Math.abs(p.y - 880); if (p.parola === 'nuota' && d < bd) { bd = d; best = i; } });
    this.presa = best; this.colPresa = this.lista[best].col;
    const ordine = this.lista.map((p, i) => i).sort((a, b) => this.lista[a].y - this.lista[b].y);
    const papere = ordine.map(i => '<g class="pq-pap" data-i="' + i + '"><g transform="translate(-50 -84)">' + G.paperella(this.lista[i].col) + '</g></g>').join('');
    const chi = [{ tipo: 'al', col: P.Al.biglietto }, { tipo: 'mare', col: P.mare.biglietto }, { tipo: 'emma', col: P.Emma.biglietto }, { tipo: 'paperella', col: D.nuovo.nuota }];
    let scintille = '';
    for (let k = 0; k < 10; k++) scintille += '<circle r="2.4" fill="' + G.C.luce + '"/>';
    const sopra = '<g class="pq-treno">' + G.treno(chi, { sbarra: 1 }) + '</g>' +
      '<g class="pq-scint" opacity="0">' + scintille + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="pq-ada"></g>' +
      '<ellipse class="pq-luce" rx="22" ry="18" fill="' + this.colPresa + '" opacity="0" filter="url(#g-soft)"/>' +
      '<g class="pq-mano"><g transform="translate(-50 -84)">' + G.paperella(this.colPresa) + '</g></g>';
    const z = 1.16, [bx, by] = G.SALOTTO.bolla;
    const camTel = 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z + ')';
    const telefono = '<g class="pq-tel" opacity="0"><g transform="' + camTel + '">' + G.salotto('<g class="pq-tel-a">' + G.telefono({ messaggi: ['Al mare Emma'] }) + '</g><g class="pq-tel-b" opacity="0">' + G.telefono({ messaggi: ['Al mare Emma'], rispostaTesto: 'nuota' }) + '</g>') + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'pesca', davanti: telefono,
      html: G.sottotitolo('NARRATORE', 'Ada pesca senza guardare.') + G.sottotitolo('ADA', 'Nuota!') + G.sottotitolo('NARRATORE', 'Al mare Emma nuota.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', papere);
    this.G = G;
    this.vag = this.m.qa('.pq-treno .g-vag'); this.ada = this.m.q('.pq-ada'); this.mano = this.m.q('.pq-mano'); this.luce = this.m.q('.pq-luce');
    this.pap = this.m.qa('.pq-pap').map(el => ({ el, i: +el.dataset.i })); this.scint = this.m.q('.pq-scint');
    this.tel = this.m.q('.pq-tel'); this.telB = this.m.q('.pq-tel-b');
    this.passNuovo = this.vag[3].querySelector('.g-pass');
    G.posaTreno(this.vag, this.m.arrivo, this.m.arrivo.getTotalLength() - (M.fermo - 40));
    this.sedile = [M.fermo + 3 * M.passo + 6, 816];
    this.stato = '';
    this.sub = G.subs(kit, [[1.2, 4.4], [6.4, 8.6], [16.6, 20.2]]);
  },
  manoAt(giu) {
    const s = 0.28, [ax, ay] = PQ_ADA, mx = 150 + 26 * giu - 6, my = 230 + 50 * giu + 6;
    return [ax - 100 * s + mx * s, ay - 304 * s + my * s];
  },
  render(t, kit) {
    t = window.G.tempo('01', 'pesca', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PQ_CAM, t));
    G.animaMondo(m, t + 534);
    let giu = 0;
    if (t >= PQ_PESCA.giu - 0.6) giu = eio(seg(t, PQ_PESCA.giu - 0.6, PQ_PESCA.giu + 0.4));
    if (t > PQ_PESCA.giu + 0.4 && t < PQ_PESCA.su) giu = 0.9 + 0.1 * Math.sin((t - PQ_PESCA.giu) * 9);
    if (t >= PQ_PESCA.su) giu = 1 - eio(seg(t, PQ_PESCA.su, PQ_PESCA.preso + 0.4));
    const posa = t < 2.2 ? 'quaderno' : 'pesca';
    const espr = t < 2.2 ? 'felice' : t < PQ_PESCA.preso ? 'chiusi' : t < 9 ? 'sorpresa' : 'felice';
    const giuQ = Math.round(giu * 40) / 40;
    const k = posa + espr + giuQ;
    if (k !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(PQ_ADA[0], PQ_ADA[1]) + '">' + G.ada(posa, espr, { giu: giuQ }) + '</g>'; this.stato = k; }
    const [hx, hy] = this.manoAt(giuQ);
    let px = hx, py = hy, pr = 0, pv = t >= PQ_PESCA.su + 0.2 ? 1 : 0;
    if (t >= PQ_SALTA) {
      const a = eo(seg(t, PQ_SALTA, PQ_SALTA + 0.7)), corsa = eio(seg(t, PQ_SALTA + 0.7, PQ_SALE - 0.5)), salto = eio(seg(t, PQ_SALE - 0.5, PQ_SALE));
      if (t < PQ_SALTA + 0.7) { px = lerp(hx, 636, a); py = lerp(hy, 836, a) - 30 * Math.sin(Math.PI * a); }
      else if (t < PQ_SALE - 0.5) { px = lerp(636, this.sedile[0] + 24, corsa); py = 836 - 3 * Math.abs(Math.sin(t * 12)); pr = 9 * Math.sin(t * 12); }
      else { px = lerp(this.sedile[0] + 24, this.sedile[0], salto); py = lerp(836, this.sedile[1], salto) - 22 * Math.sin(Math.PI * salto); }
      pv = t < PQ_SALE ? 1 : 1 - seg(t, PQ_SALE, PQ_SALE + 0.3);
    }
    this.mano.setAttribute('transform', 'translate(' + px.toFixed(2) + ' ' + py.toFixed(2) + ') rotate(' + pr.toFixed(2) + ') scale(0.16)');
    this.mano.setAttribute('opacity', pv.toFixed(3));
    const luce = seg(t, PQ_PESCA.su + 0.3, PQ_PESCA.preso + 0.4) * (1 - seg(t, 9.4, 10.4));
    this.luce.setAttribute('cx', hx.toFixed(1)); this.luce.setAttribute('cy', (hy - 10).toFixed(1));
    this.luce.setAttribute('opacity', (0.6 * luce).toFixed(3));
    this.pap.forEach(({ el, i }) => {
      const p = this.lista[i];
      const via = eio(seg(t, 8.0 + (i % 7) * 0.12, 9.7 + (i % 7) * 0.12)), a = via * 2.4 + i;
      const x = lerp(p.x, 772 + 8 * Math.cos(a), via), y = lerp(p.y, 884, via) + (1 - via) * 1.2 * Math.sin(t * 2.2 + i);
      el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.16 * (1 - via)).toFixed(4) + ')');
      el.setAttribute('opacity', i === this.presa ? (t < PQ_PESCA.su + 0.2 ? 1 : 0) : (1 - seg(via, 0.85, 1)).toFixed(3));
    });
    this.vag[3].setAttribute('opacity', eo(seg(t, PQ_VAGONE, PQ_VAGONE + 0.6)).toFixed(3));
    this.passNuovo.setAttribute('opacity', seg(t, PQ_SALE - 0.05, PQ_SALE + 0.3).toFixed(3));
    const sc = seg(t, PQ_VAGONE, PQ_VAGONE + 1.1);
    this.scint.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
    [...this.scint.children].forEach((c, n) => { const a = n * Math.PI / 5, d = 10 + 34 * eo(sc); c.setAttribute('cx', (this.sedile[0] + d * Math.cos(a)).toFixed(2)); c.setAttribute('cy', (838 + d * 0.6 * Math.sin(a)).toFixed(2)); });
    this.tel.setAttribute('opacity', (seg(t, PQ_TEL[0], PQ_TEL[1]) * (1 - seg(t, PQ_TEL[2], PQ_TEL[3]))).toFixed(3));
    this.telB.setAttribute('opacity', eo(seg(t, 16.2, 16.6)).toFixed(3));
    this.sub(t);
  },
});
