const { seg, eo, ei, eio, lerp } = kit;
// Il treno esce dalla montagna sopra la vasca della pesca: sotto l'ultimo vagone cadono le paperelle (quante dice il modellino).
// Poi il treno rientra in stazione e i vestiti tornano del colore dei biglietti.
// Si apre dove finisce «partenza»; finisce sul treno fermo e sulla vasca piena (la riprende «pesca»).
const VS_CAM = [
  { t: 0, cx: 1100, cy: 600, z: 1.45 },
  { t: 4.6, cx: 790, cy: 790, z: 2.3 },
  { t: 8.0, cx: 790, cy: 790, z: 2.3 },
  { t: 10.4, cx: 790, cy: 830, z: 3.3 },
  { t: 15.2, cx: 790, cy: 830, z: 3.3 },
  { t: 19.2, cx: 540, cy: 800, z: 2.3 },
];
const VS_ESCE = 7.0;
const VS_VEL = [[VS_ESCE, 95], [12, 62], [16, 80], [19.3, 0]];
kit.scene('vasca', {
  init(kit) {
    const G = window.G, M = G.MONDO, D = G.MOD.mare, P = D.passeggeri;
    this.chi = [['al', P.Al], ['mare', P.mare], ['emma', P.Emma]];
    // Le 40 paperelle (le stesse della scena «pesca»).
    const lista = G.papereVasca(D.vasca), cols = lista.map(p => p.col);
    this.posti = lista.map(p => [p.x, p.y]);
    // In profondità: prima quelle più indietro.
    const ordine = cols.map((c, i) => i).sort((a, b) => this.posti[a][1] - this.posti[b][1]);
    const papere = ordine.map(i => '<g class="vs-pap" data-i="' + i + '"><g transform="translate(-50 -84)">' + G.paperella(cols[i]) + '</g></g>').join('');
    const sopra = '<g class="vs-treno">' + G.treno(this.chi.map(c => ({ tipo: c[0], col: c[1].tratti[2] })), { sbarra: 1 }) + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="vs-ada"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'vasca',
      html: G.sottotitolo('NARRATORE', 'Accanto ai binari c’è la bancarella della pesca.') +
        G.sottotitolo('NARRATORE', 'Quando il treno esce dalla montagna, nella vasca cadono le paperelle.') +
        G.sottotitolo('NARRATORE', 'Ogni colore è una parola.'),
    });
    // Le paperelle vanno nel gruppo della vasca, sopra l'acqua.
    const vasca = this.m.q('.g-vasca');
    vasca.insertAdjacentHTML('beforeend', papere);
    this.G = G;
    this.vag = this.m.qa('.vs-treno .g-vag'); this.ada = this.m.q('.vs-ada');
    this.pap = this.m.qa('.vs-pap').map(el => ({ el, i: +el.dataset.i }));
    // Quando cade ogni paperella: quando l'ultimo vagone passa sopra il suo posto.
    const path = this.m.arrivo, sF = path.getTotalLength() - (M.fermo - 40);
    this.sF = sF;
    const sAt = t => Math.min(sF, G.percorso(t, 0, VS_VEL));
    this.cade = this.posti.map(([x]) => {
      for (let t = VS_ESCE; t < 22; t += 0.02) {
        const se = sAt(t) - 2 * M.passo;
        if (se > 0 && path.getPointAtLength(se).x <= x + 6) return t;
      }
      return 14;
    });
    this.stato = '';
    this.sub = G.subs(kit, [[0.8, 5.6], [7.6, 14.0], [15.0, 18.6]]);
  },
  render(t) {
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(VS_CAM, t));
    G.animaMondo(m, t + 138);
    const s = Math.min(this.sF, G.percorso(t, 0, VS_VEL));
    G.posaTreno(this.vag, m.arrivo, t < VS_ESCE ? -500 : s);
    G.nascondiInMontagna(this.vag, m.arrivo, t < VS_ESCE ? -500 : s, { inizio: true });
    // In stazione i vestiti tornano del colore dei biglietti.
    const torna = seg(s, this.sF - 150, this.sF);
    this.vag.forEach((v, i) => G.cambiaPasseggero(v, this.chi[i][0], G.mix(this.chi[i][1].tratti[2], this.chi[i][1].biglietto, Math.round(torna * 12) / 12)));
    // Le paperelle cadono dal vagone di Emma nella vasca, poi galleggiano.
    this.pap.forEach(({ el, i }) => {
      const t0 = this.cade[i], [x, y] = this.posti[i];
      const u = seg(t, t0, t0 + 0.55);
      const yy = lerp(808, y, ei(u)) + (u >= 1 ? 1.2 * Math.sin(t * 2.2 + i) : 0);
      const sc = 0.16 * (u < 1 ? lerp(0.7, 1, u) : 1 + 0.04 * Math.max(0, 1 - (t - t0 - 0.55) / 0.3));
      el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + yy.toFixed(2) + ') scale(' + sc.toFixed(4) + ')');
      el.setAttribute('opacity', t < t0 ? 0 : 1);
    });
    const espr = t < 9 ? 'base' : t < 16 ? 'sorpresa' : 'felice';
    if (espr !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(M.ada[0], M.ada[1]) + '">' + G.ada('base', espr) + '</g>'; this.stato = espr; }
    this.sub(t);
  },
});
