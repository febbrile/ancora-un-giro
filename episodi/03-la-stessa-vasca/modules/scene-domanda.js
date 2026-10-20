const { seg, eo, eio, lerp } = kit;
// Ada, alla bancarella, ha il quaderno aperto sul disegno dell'altra volta: la vasca piena di paperelle verdi e, accanto,
// le due paperelle pescate da quella stessa vasca, una verde e una turchese. Mordicchia la matita, guarda la vasca vuota
// e si chiede perché non esce sempre la stessa paperella. Titolo: «La stessa vasca».
// Si apre sul luna park; finisce sulla bancarella con il titolo (la riprende «case», in città).
const DO_CAM = [
  { t: 0, cx: 960, cy: 540, z: 1 },
  { t: 2.6, cx: 960, cy: 540, z: 1 },
  { t: 6.4, cx: 700, cy: 838, z: 4.0 },
  { t: 12.6, cx: 700, cy: 838, z: 4.0 },
  { t: 14.6, cx: 740, cy: 850, z: 4.6 },
  { t: 16.2, cx: 740, cy: 850, z: 4.6 },
  { t: 18.2, cx: 820, cy: 700, z: 1.9 },
];
const DO_QUADERNO = [6.6, 7.2, 11.8, 12.4];
const DO_TITOLO = 17.0;
kit.scene('domanda', {
  init(kit) {
    const G = window.G, M = G.MONDO, C = G.C, V = G.MOD.parco.vasca;
    const verde = V[0][2], turchese = V[1][2];
    // Il disegno dell'altra volta: a sinistra la vasca piena di paperelle (quasi tutte verdi, come la vasca del parco);
    // a destra, grandi, le due paperelle pescate da quella vasca, una verde e una turchese.
    const colori = [];
    V.forEach(([, n, col]) => { for (let k = 0; k < Math.max(1, Math.round(n / 3)); k++) colori.push(col); });
    let papere = '';
    colori.forEach((col, i) => { const r = Math.floor(i / 5); papere += '<g transform="translate(' + (318 + (i % 5) * 104 + (r % 2) * 46) + ' ' + (478 + r * 92) + ') scale(.9)">' + G.paperella(col) + '</g>'; });
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="#3A3570" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' +
      '<path d="M250 450 Q570 410 900 450 L860 800 Q570 840 290 800 Z"/>' +
      '</g>' + papere +
      '<g transform="translate(1110 380) scale(2.6)">' + G.paperella(verde) + '</g>' +
      '<g transform="translate(1400 380) scale(2.6)">' + G.paperella(turchese) + '</g>' +
      '<path d="M1110 640 Q1240 670 1370 640 M1400 640 Q1530 670 1660 640" stroke="#3A3570" stroke-width="7" stroke-linecap="round" fill="none"/>';
    const quaderno = '<g class="do-quad" opacity="0"><g class="do-pagine">' + pagine + '</g></g>';
    const titolo = '<g class="do-titolo" opacity="0"><g transform="translate(960 300)"><g class="do-insegna"></g></g></g>';
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="do-ada"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'domanda', manopola: 0, davanti: quaderno + titolo,
      html: G.sottotitolo('NARRATORE', 'L’ultima volta, dalla stessa vasca, Ada ha pescato due paperelle diverse.') +
        G.sottotitolo('ADA', 'Perché non esce sempre la stessa paperella?'),
    });
    this.G = G;
    this.ada = this.m.q('.do-ada'); this.quad = this.m.q('.do-quad'); this.pagine = this.m.q('.do-pagine');
    this.titolo = this.m.q('.do-titolo'); this.insegna = this.m.q('.do-insegna');
    this.statoAda = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[0.8, 8.0], [12.4, 16.2]]);
  },
  render(t, kit) {
    t = window.G.tempo('03', 'domanda', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(DO_CAM, t));
    G.animaMondo(m, t + 900);
    // Ada col quaderno; poi mordicchia la matita e guarda la vasca vuota; al titolo sorride.
    const posa = t < 12.4 ? 'quaderno' : 'disegna';
    const espr = t < 12.4 ? 'base' : t < 16.8 ? 'pensa' : 'felice';
    const matita = posa === 'disegna' ? Math.round(-60 + 6 * Math.sin(t * 7)) : 0;
    const k = posa + espr + matita;
    if (k !== this.statoAda) { this.ada.innerHTML = '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(posa, espr, { matita }) + '</g>'; this.statoAda = k; }
    // Il quaderno da vicino: la camera scorre piano dalla vasca alle due paperelle pescate.
    this.quad.setAttribute('opacity', (seg(t, DO_QUADERNO[0], DO_QUADERNO[1]) * (1 - seg(t, DO_QUADERNO[2], DO_QUADERNO[3]))).toFixed(3));
    const u = eio(seg(t, DO_QUADERNO[0], DO_QUADERNO[3]));
    this.pagine.setAttribute('transform', G.cam(lerp(860, 1080, u), 520, lerp(1.0, 1.08, u)));
    // Il titolo.
    const tit = eo(seg(t, DO_TITOLO, DO_TITOLO + 1.2));
    this.titolo.setAttribute('opacity', tit.toFixed(3));
    this.titolo.setAttribute('transform', 'translate(0 ' + (16 * (1 - tit)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('La stessa vasca', 900, 230, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
