const { seg, eo, ei, eio, lerp } = kit;
// La luce in fondo al tunnel: il treno esce sopra la vasca. Al e Mare passano, e non succede niente; sotto l'ultimo vagone,
// quello di Emma (blu come il mare), cadono le paperelle: quelle dell'ultima finestra. Cadono ancora di luce e toccano
// l'acqua vere. Ada se ne accorge.
// Si apre come finisce «finestre» (la luce); finisce sul treno fermo e sulla vasca piena (lo riprende «pesca»).
const US_CAM = [
  { t: 0, cx: 820, cy: 820, z: 3.0 },
  { t: 12.6, cx: 820, cy: 820, z: 3.0 },
  { t: 14.6, cx: 772, cy: 868, z: 4.6 },
  { t: 18.8, cx: 772, cy: 868, z: 4.6 },
  { t: 21.4, cx: 860, cy: 740, z: 1.9 },
  { t: 23.2, cx: 860, cy: 740, z: 1.9 },
  { t: 24.6, cx: 684, cy: 846, z: 5.0 },
  { t: 29.6, cx: 684, cy: 846, z: 5.0 },
  { t: 33.0, cx: 540, cy: 800, z: 2.3 },
];
const US_ESCE = 1.2;
const US_VEL = [[US_ESCE, 60], [6, 35], [10, 35], [12, 40], [16, 60], [21, 0]];
kit.scene('uscita', {
  init(kit) {
    const G = window.G, M = G.MONDO, D = G.MOD.mare, P = D.passeggeri;
    this.chi = [['al', P.Al], ['mare', P.mare], ['emma', P.Emma]];
    this.lista = G.papereVasca(D.vasca);
    const ordine = this.lista.map((p, i) => i).sort((a, b) => this.lista[a].y - this.lista[b].y);
    const papere = ordine.map(i => '<g class="us-pap" data-i="' + i + '"><g transform="translate(-50 -84)"><g class="us-vera">' + G.paperella(this.lista[i].col) + '</g><g class="us-dilu">' + G.paperellaDiLuce(this.lista[i].col) + '</g></g></g>').join('');
    const sopra = '<g class="us-treno">' + G.treno(this.chi.map(c => ({ tipo: c[0], col: c[1].tratti[2] })), { sbarra: 1 }) + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="us-ada"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'uscita',
      davanti: '<defs><radialGradient id="g-us-luce" cx="0" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
        '<rect class="us-luce" x="-200" y="-200" width="2400" height="1480" fill="url(#g-us-luce)"/>',
      html: G.sottotitolo('NARRATORE', 'Il treno esce dalla montagna sopra la vasca. Sotto l’ultimo vagone, quello di Emma, cadono le paperelle.') +
        G.sottotitolo('NARRATORE', 'Sono quelle dell’ultima finestra, ma adesso sono vere.') +
        G.sottotitolo('NARRATORE', 'La montagna non ha scelto niente: ha riempito una vasca.') +
        G.sottotitolo('ADA', 'È entrata rosa, ed è uscita blu come il mare!'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', papere);
    this.G = G;
    this.vag = this.m.qa('.us-treno .g-vag'); this.ada = this.m.q('.us-ada'); this.luce = this.m.q('.us-luce');
    this.pap = this.m.qa('.us-pap').map(el => ({ el, i: +el.dataset.i, vera: el.querySelector('.us-vera'), luce: el.querySelector('.us-dilu') }));
    const path = this.m.arrivo, sF = path.getTotalLength() - (M.fermo - 40);
    this.sF = sF;
    const sAt = t => Math.min(sF, G.percorso(t, 0, US_VEL));
    this.cade = this.lista.map(p => {
      for (let t = US_ESCE; t < 24; t += 0.02) { const se = sAt(t) - 2 * M.passo; if (se > 0 && path.getPointAtLength(se).x <= p.x + 6) return t; }
      return 12;
    });
    this.stato = '';
    this.sub = G.subs(kit, [[3.6, 12.6], [13.0, 18.4], [18.8, 24.0], [24.8, 29.2]]);
  },
  render(t, kit) {
    t = window.G.tempo('01', 'uscita', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(US_CAM, t));
    G.animaMondo(m, t + 500);
    this.luce.setAttribute('opacity', (0.95 * (1 - eio(seg(t, 0.2, 1.8)))).toFixed(3));
    const s = Math.min(this.sF, G.percorso(t, 0, US_VEL));
    G.posaTreno(this.vag, m.arrivo, t < US_ESCE ? -500 : s);
    G.nascondiInMontagna(this.vag, m.arrivo, t < US_ESCE ? -500 : s, { inizio: true });
    const torna = seg(s, this.sF - 150, this.sF);
    this.vag.forEach((v, i) => G.cambiaPasseggero(v, this.chi[i][0], G.mix(this.chi[i][1].tratti[2], this.chi[i][1].biglietto, Math.round(torna * 12) / 12)));
    this.pap.forEach(({ el, i, vera, luce }) => {
      const t0 = this.cade[i], p = this.lista[i];
      const u = seg(t, t0, t0 + 0.55);
      const yy = lerp(808, p.y, ei(u)) + (u >= 1 ? 1.2 * Math.sin(t * 2.2 + i) : 0);
      el.setAttribute('transform', 'translate(' + p.x.toFixed(2) + ' ' + yy.toFixed(2) + ') scale(' + (0.16 * (u < 1 ? lerp(0.7, 1, u) : 1)).toFixed(4) + ')');
      el.setAttribute('opacity', t < t0 ? 0 : 1);
      // Cadono ancora di luce, come nella finestra; quando toccano l'acqua sono vere.
      const v = seg(u, 0.55, 1);
      vera.setAttribute('opacity', v.toFixed(3)); luce.setAttribute('opacity', (1 - v).toFixed(3));
    });
    // Ada, alla bancarella: guarda il treno uscire, si sorprende.
    const espr = t < 9.5 ? 'base' : t < 24.6 ? 'sorpresa' : 'felice';
    const posa = 'quaderno';
    if (espr !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(posa, espr) + '</g>'; this.stato = espr; }
    this.sub(t);
  },
});
