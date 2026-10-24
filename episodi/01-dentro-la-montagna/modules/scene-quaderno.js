const { seg, eo, eio, lerp } = kit;
// Ada disegna il viaggio sul quaderno, senza scritte: il treno entra con Emma rosa, esce con Emma blu, la vasca di paperelle blu.
// Poi si chiede: e se fosse un parco? Il trenino riparte, un vagone più lungo. Cartello: «Fine».
const QU_STACCO = [9.0, 9.6];
const QU_CAM = [
  { t: 9.0, cx: 560, cy: 806, z: 2.6 },
  { t: 14.0, cx: 560, cy: 806, z: 2.6 },
  { t: 20.0, cx: 760, cy: 640, z: 1.5 },
];
// Velocità del treno [t, v]: riparte piano; fuori dall'inquadratura corre sulla banchina lunga e sale (non si vede),
// e ricompare in alto sul viadotto quando ci passava prima.
const QU_VEL = [[0, 0], [11.4, 0], [12.6, 110], [14.6, 116], [16.0, 2074], [17.4, 176], [18, 200]];
const QU_FINE = 20.6;
kit.scene('quaderno', {
  init(kit) {
    const G = window.G, M = G.MONDO, D = G.MOD.mare, P = D.passeggeri, C = G.C;
    const rosa = P.Emma.biglietto, blu = P.Emma.tratti[2];
    // Il disegno: due pagine. Tratti a matita (si disegnano), macchie di colore (compaiono).
    const omino = (x, y, col) => '<g class="qu-colore" opacity="0"><path d="M' + (x - 26) + ' ' + y + ' L' + (x + 26) + ' ' + y + ' L' + (x + 16) + ' ' + (y - 34) + ' L' + (x - 16) + ' ' + (y - 34) + ' Z" fill="' + col + '"/><circle cx="' + x + '" cy="' + (y - 52) + '" r="22" fill="#F5C84C"/><circle cx="' + x + '" cy="' + (y - 48) + '" r="15" fill="#FFE9D6"/></g>';
    let papere = '';
    for (let i = 0; i < 9; i++) papere += '<g class="qu-colore" opacity="0" transform="translate(' + (1150 + i * 52) + ' ' + (760 + (i % 2) * 18) + ') scale(.4)">' + G.paperella(i === 4 ? '#28AAAA' : i === 7 ? '#5FA05F' : blu) + '</g>';
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="#3A3570" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' +
      // pagina sinistra: la montagna, la bocca in alto, il treno che entra con Emma rosa
      '<path class="qu-tratto" d="M260 820 L470 470 Q560 330 640 320 Q720 320 800 470 L900 820"/>' +
      '<path class="qu-tratto" d="M500 520 Q520 470 560 480 L560 520"/>' +
      '<path class="qu-tratto" d="M220 420 Q360 380 500 500"/>' +
      '<path class="qu-tratto" d="M300 410 L380 410 L380 450 L300 450 Z M390 430 L470 430 L470 470 L390 470 Z"/>' +
      // pagina destra: la bocca in basso, il treno che esce con Emma blu, la vasca
      '<path class="qu-tratto" d="M1020 640 L1180 300 Q1260 200 1340 200 Q1420 210 1500 330 L1700 640"/>' +
      '<path class="qu-tratto" d="M1100 640 L1100 590 Q1130 550 1170 580 L1170 640"/>' +
      '<path class="qu-tratto" d="M1180 620 L1300 620 L1300 660 L1180 660 Z M1310 620 L1430 620 L1430 660 L1310 660 Z"/>' +
      '<path class="qu-tratto" d="M1120 760 L1640 760 L1610 860 Q1380 890 1150 860 Z"/>' +
      '</g>' +
      omino(440, 400, rosa) + omino(1400, 610, blu) + papere;
    const sopra = '<g class="qu-treno">' + G.treno([{ tipo: 'al', col: P.Al.biglietto }, { tipo: 'mare', col: P.mare.biglietto }, { tipo: 'emma', col: P.Emma.biglietto }, { tipo: 'paperella', col: D.nuovo.nuota }], { sbarra: 1 }) + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="qu-ada"></g>';
    const fine = '<g class="qu-fine" opacity="0"><g transform="translate(960 330)"><g class="qu-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'quaderno',
      davanti: '<g class="qu-pagine">' + pagine + '<g class="qu-matita"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="#3A3570" transform="rotate(28)"/></g></g>' + fine,
      html: G.sottotitolo('ADA', 'E se al posto del mare ci fosse un parco?') + G.sottotitolo('NARRATORE', 'Il trenino riparte, un vagone più lungo. Ma questa è un’altra storia.'),
    });
    this.G = G;
    this.vag = this.m.qa('.qu-treno .g-vag'); this.ada = this.m.q('.qu-ada');
    this.pagine = this.m.q('.qu-pagine'); this.tratti = this.m.qa('.qu-tratto'); this.colori = this.m.qa('.qu-colore'); this.matita = this.m.q('.qu-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.fine = this.m.q('.qu-fine'); this.insegna = this.m.q('.qu-insegna');
    this.s0 = 640 - M.fermo;
    this.stato = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[11.0, 14.8], [15.2, 21.2]]);
  },
  render(t, kit) {
    t = window.G.tempo('01', 'quaderno', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(QU_CAM, t));
    G.animaMondo(m, t + 564);
    // Il quaderno: un tratto dopo l'altro; la matita segue il tratto che si sta disegnando.
    const n = this.tratti.length, dur = 7.4 / n;
    let punta = null;
    this.tratti.forEach((p, i) => {
      const u = eio(seg(t, 0.6 + i * dur, 0.6 + (i + 1) * dur));
      p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1));
      p.setAttribute('stroke-dashoffset', ((1 - u) * this.lung[i]).toFixed(1));
      if (u > 0 && u < 1) punta = p.getPointAtLength(u * this.lung[i]);
    });
    // I colori arrivano dopo i loro tratti: Emma rosa dopo il treno che entra, Emma blu e le paperelle dopo la vasca.
    this.colori.forEach((c, i) => { const t0 = i === 0 ? 4.5 : i === 1 ? 7.0 : 7.7 + (i - 2) * 0.08; c.setAttribute('opacity', eo(seg(t, t0, t0 + 0.4)).toFixed(3)); });
    if (punta) this.matita.setAttribute('transform', 'translate(' + punta.x.toFixed(1) + ' ' + punta.y.toFixed(1) + ')');
    this.matita.setAttribute('opacity', t < 8.2 ? 1 : 0);
    this.pagine.setAttribute('opacity', (1 - eio(seg(t, QU_STACCO[0], QU_STACCO[1]))).toFixed(3));
    // Ada, con il quaderno: sorride, poi pensa al parco. Il treno riparte.
    const espr = t < 11 ? 'felice' : t < 16 ? 'pensa' : 'felice';
    if (espr !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(672, 896) + '">' + G.ada('quaderno', espr) + '</g>'; this.stato = espr; }
    const s = G.percorso(t, this.s0, QU_VEL);
    G.posaTreno(this.vag, m.partenza, s);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true });
    // Il cartello: «Fine».
    const f = eo(seg(t, QU_FINE, QU_FINE + 1.0));
    this.fine.setAttribute('opacity', f.toFixed(3));
    this.fine.setAttribute('transform', 'translate(0 ' + (16 * (1 - f)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('Fine', 520, 200, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
