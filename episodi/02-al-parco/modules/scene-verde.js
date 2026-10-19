const { seg, eo, ei, eio, lerp } = kit;
// Esce il secondo treno: passano Al e Parco, e non succede niente; passa Emma, verde, e sotto di lei cadono paperelle
// quasi tutte verdi. Il treno si ferma in stazione e i vestiti tornano del colore dei biglietti: Emma è di nuovo rosa.
// Ada, sul quaderno, disegna accanto alla vasca blu questa, così diversa. Poi Parco la saluta con un rametto.
// Si apre sulla montagna e sulla vasca vuota; finisce sulla vasca piena (la riprende «pesca»).
const VD_CAM = [
  { t: 0, cx: 820, cy: 820, z: 3.0 },
  { t: 3.6, cx: 820, cy: 820, z: 3.0 },
  { t: 5.4, cx: 772, cy: 862, z: 4.4 },
  { t: 9.6, cx: 772, cy: 862, z: 4.4 },
  { t: 11.6, cx: 640, cy: 846, z: 4.2 },
  { t: 17.4, cx: 420, cy: 830, z: 2.6 },
  { t: 23.6, cx: 420, cy: 830, z: 2.6 },
  { t: 25.6, cx: 238, cy: 800, z: 6.4 },
  { t: 30.4, cx: 238, cy: 800, z: 6.4 },
  { t: 33.4, cx: 600, cy: 830, z: 3.2 },
];
const VD_ESCE = 1.0;
const VD_VEL = [[VD_ESCE, 100], [4.4, 55], [8.0, 55], [9.4, 130], [11.0, 130], [12.8, 0]];
const VD_QUADERNO = [11.4, 12.0, 16.8, 17.4];
const VD_CIAO = [25.2, 30.6];
kit.scene('verde', {
  init(kit) {
    const G = window.G, M = G.MONDO, C = G.C, A = G.MOD.mare, D = G.MOD.parco, P = D.passeggeri;
    this.chi = [['al', P.Al], ['parco', P.parco], ['emma', P.Emma]];
    this.lista = G.papereVasca(D.vasca);
    const ordine = this.lista.map((p, i) => i).sort((a, b) => this.lista[a].y - this.lista[b].y);
    const papere = ordine.map(i => '<g class="vd-pap" data-i="' + i + '"><g transform="translate(-50 -84)"><g class="vd-vera">' + G.paperella(this.lista[i].col) + '</g><g class="vd-dilu">' + G.paperellaDiLuce(this.lista[i].col) + '</g></g></g>').join('');
    // Il quaderno: a sinistra la vasca dell'altra volta (già disegnata), a destra quella di oggi (si disegna adesso).
    // Ogni pagina ha il suo centro: cx = 568 (sinistra) e 1352 (destra).
    const omino = (x, y, col) => '<g transform="translate(' + x + ' ' + y + ') scale(1.7)"><path d="M-26 0 L26 0 L16 -34 L-16 -34 Z" fill="' + col + '"/><circle cy="-52" r="22" fill="#F5C84C"/><circle cy="-48" r="15" fill="#FFE9D6"/></g>';
    const papereQ = (lista, cx) => lista.slice(0, 9).map((p, i) => '<g transform="translate(' + (cx - 262 + i * 58) + ' ' + (650 + (i % 2) * 26) + ') scale(.55)">' + G.paperella(p.col) + '</g>').join('');
    const vascaQ = cx => 'M' + (cx - 310) + ' 620 L' + (cx + 310) + ' 620 L' + (cx + 280) + ' 760 Q' + cx + ' 792 ' + (cx - 280) + ' 760 Z';
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="#3A3570" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' +
      '<path d="' + vascaQ(568) + '"/>' +
      '<path d="M360 420 q25 -36 50 0 t50 0 t50 0" stroke="' + A.passeggeri.mare.biglietto + '" stroke-width="12"/>' +
      '<path class="vd-tratto" d="' + vascaQ(1352) + '"/>' +
      '<path class="vd-tratto" d="M1190 470 L1190 380 M1150 392 a46 40 0 1 1 80 0 a42 36 0 1 1 -80 0 Z" stroke="' + C.legno + '" stroke-width="12"/>' +
      '</g>' +
      omino(640, 480, A.passeggeri.Emma.tratti[2]) + papereQ(G.papereVasca(A.vasca), 568) +
      '<g class="vd-colore" opacity="0">' + omino(1424, 480, P.Emma.tratti[2]) + '</g>' +
      '<g class="vd-colore" opacity="0">' + papereQ(this.lista, 1352) + '</g>';
    const sopra = '<g class="vd-treno">' + G.treno(this.chi.map(c => ({ tipo: c[0], col: c[1].tratti[2] })), { sbarra: 1 }) + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="vd-ada"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'verde',
      davanti: '<g class="vd-quad" opacity="0">' + pagine + '<g class="vd-matita"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="#3A3570" transform="rotate(28)"/></g></g>',
      html: G.sottotitolo('NARRATORE', 'Dal secondo treno Emma esce verde, e la vasca si riempie di altri colori.') +
        G.sottotitolo('ADA', 'Stessa Emma, stesso vestito rosa. È cambiato solo un vagone!') +
        G.sottotitolo('NARRATORE', 'Con un compagno diverso, Emma ha fatto un viaggio diverso.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', papere);
    this.G = G;
    this.vag = this.m.qa('.vd-treno .g-vag'); this.ada = this.m.q('.vd-ada');
    this.pap = this.m.qa('.vd-pap').map(el => ({ el, i: +el.dataset.i, vera: el.querySelector('.vd-vera'), luce: el.querySelector('.vd-dilu') }));
    this.quad = this.m.q('.vd-quad'); this.tratti = this.m.qa('.vd-tratto'); this.colori = this.m.qa('.vd-colore'); this.matita = this.m.q('.vd-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    const path = this.m.arrivo, sF = path.getTotalLength() - (M.fermo - 40);
    this.sF = sF;
    const sAt = t => Math.min(sF, G.percorso(t, 0, VD_VEL));
    this.cade = this.lista.map(p => {
      for (let t = VD_ESCE; t < 20; t += 0.02) { const se = sAt(t) - 2 * M.passo; if (se > 0 && path.getPointAtLength(se).x <= p.x + 6) return t; }
      return 8;
    });
    this.stato = ''; this.statoParco = '';
    this.sub = G.subs(kit, [[3.0, 10.0], [18.0, 24.0], [26.4, 32.4]]);
  },
  render(t, kit) {
    t = window.G.tempo('02', 'verde', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(VD_CAM, t));
    G.animaMondo(m, t + 790);
    const s = Math.min(this.sF, G.percorso(t, 0, VD_VEL));
    G.posaTreno(this.vag, m.arrivo, t < VD_ESCE ? -500 : s);
    G.nascondiInMontagna(this.vag, m.arrivo, t < VD_ESCE ? -500 : s, { inizio: true });
    // In stazione i vestiti tornano del colore dei biglietti; Parco, poi, saluta Ada.
    const torna = Math.round(seg(s, this.sF - 150, this.sF) * 12) / 12;
    const ciao = Math.round((-22 + 18 * Math.sin((t - VD_CIAO[0]) * 5)) * seg(t, VD_CIAO[0], VD_CIAO[0] + 0.6) * (1 - seg(t, VD_CIAO[1] - 0.6, VD_CIAO[1])));
    this.vag.forEach((v, i) => G.cambiaPasseggero(v, this.chi[i][0], G.mix(this.chi[i][1].tratti[2], this.chi[i][1].biglietto, torna), i === 1 ? { ciao } : {}));
    this.pap.forEach(({ el, i, vera, luce }) => {
      const t0 = this.cade[i], p = this.lista[i];
      const u = seg(t, t0, t0 + 0.55);
      // Cadono ancora di luce, come nelle finestre; quando toccano l'acqua sono vere.
      const vv = seg(u, 0.55, 1);
      vera.setAttribute('opacity', vv.toFixed(3)); luce.setAttribute('opacity', (1 - vv).toFixed(3));
      const yy = lerp(808, p.y, ei(u)) + (u >= 1 ? 1.2 * Math.sin(t * 2.2 + i) : 0);
      el.setAttribute('transform', 'translate(' + p.x.toFixed(2) + ' ' + yy.toFixed(2) + ') scale(' + (0.16 * (u < 1 ? lerp(0.7, 1, u) : 1)).toFixed(4) + ')');
      el.setAttribute('opacity', t < t0 ? 0 : 1);
    });
    // Ada: guarda il treno, si sorprende, disegna; poi guarda Emma, di nuovo rosa, e sorride a Parco.
    const espr = t < 6.4 ? 'base' : t < 17.4 ? 'sorpresa' : t < 24.4 ? 'pensa' : 'felice';
    if (espr !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(672, 896) + '">' + G.ada('quaderno', espr) + '</g>'; this.stato = espr; }
    // Il quaderno: la pagina di oggi si disegna, un tratto dopo l'altro; poi arrivano i colori.
    this.quad.setAttribute('opacity', (seg(t, VD_QUADERNO[0], VD_QUADERNO[1]) * (1 - seg(t, VD_QUADERNO[2], VD_QUADERNO[3]))).toFixed(3));
    let punta = null;
    this.tratti.forEach((p, i) => {
      const u = eio(seg(t, 12.2 + i * 1.3, 13.5 + i * 1.3));
      p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1));
      p.setAttribute('stroke-dashoffset', ((1 - u) * this.lung[i]).toFixed(1));
      if (u > 0 && u < 1) punta = p.getPointAtLength(u * this.lung[i]);
    });
    this.colori.forEach((c, i) => c.setAttribute('opacity', eo(seg(t, 15.0 + i * 0.6, 15.4 + i * 0.6)).toFixed(3)));
    if (punta) this.matita.setAttribute('transform', 'translate(' + punta.x.toFixed(1) + ' ' + punta.y.toFixed(1) + ')');
    this.matita.setAttribute('opacity', t < 14.9 ? 1 : 0);
    this.sub(t);
  },
});
