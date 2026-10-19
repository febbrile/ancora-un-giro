const { seg, eo, eio, lerp } = kit;
// Ada, alla bancarella, guarda il disegno dell'altra volta: il treno entra con Emma rosa ed esce con Emma blu,
// la vasca piena di paperelle blu. Poi guarda la montagna e si chiede: e se al posto del mare ci fosse un parco?
// Titolo: «Al parco».
const DM_CAM = [
  { t: 0, cx: 960, cy: 540, z: 1 },
  { t: 3.4, cx: 960, cy: 540, z: 1 },
  { t: 7.0, cx: 700, cy: 838, z: 4.0 },
  { t: 13.0, cx: 700, cy: 838, z: 4.0 },
  { t: 16.6, cx: 820, cy: 700, z: 1.9 },
];
const DM_QUADERNO = [7.2, 7.8, 11.6, 12.2];
const DM_TITOLO = 17.6;
kit.scene('domanda', {
  init(kit) {
    const G = window.G, M = G.MONDO, D = G.MOD.mare, P = D.passeggeri, C = G.C;
    const rosa = P.Emma.biglietto, blu = P.Emma.tratti[2];
    // Il disegno dell'episodio 1, già fatto: la montagna, il treno che entra con Emma rosa, quello che esce con Emma blu.
    const omino = (x, y, col) => '<path d="M' + (x - 26) + ' ' + y + ' L' + (x + 26) + ' ' + y + ' L' + (x + 16) + ' ' + (y - 34) + ' L' + (x - 16) + ' ' + (y - 34) + ' Z" fill="' + col + '"/><circle cx="' + x + '" cy="' + (y - 52) + '" r="22" fill="#F5C84C"/><circle cx="' + x + '" cy="' + (y - 48) + '" r="15" fill="#FFE9D6"/>';
    let papere = '';
    for (let i = 0; i < 9; i++) papere += '<g transform="translate(' + (1150 + i * 52) + ' ' + (760 + (i % 2) * 18) + ') scale(.4)">' + G.paperella(i === 4 ? '#28AAAA' : i === 7 ? '#5FA05F' : blu) + '</g>';
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="#3A3570" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' +
      '<path d="M260 820 L470 470 Q560 330 640 320 Q720 320 800 470 L900 820"/>' +
      '<path d="M500 520 Q520 470 560 480 L560 520"/>' +
      '<path d="M220 420 Q360 380 500 500"/>' +
      '<path d="M300 410 L380 410 L380 450 L300 450 Z M390 430 L470 430 L470 470 L390 470 Z"/>' +
      '<path d="M1020 640 L1180 300 Q1260 200 1340 200 Q1420 210 1500 330 L1700 640"/>' +
      '<path d="M1100 640 L1100 590 Q1130 550 1170 580 L1170 640"/>' +
      '<path d="M1180 620 L1300 620 L1300 660 L1180 660 Z M1310 620 L1430 620 L1430 660 L1310 660 Z"/>' +
      '<path d="M1120 760 L1640 760 L1610 860 Q1380 890 1150 860 Z"/>' +
      '</g>' + omino(440, 400, rosa) + omino(1400, 610, blu) + papere;
    const quaderno = '<g class="dm-quad" opacity="0"><g class="dm-pagine">' + pagine + '</g></g>';
    const titolo = '<g class="dm-titolo" opacity="0"><g transform="translate(960 300)"><g class="dm-insegna"></g></g></g>';
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="dm-ada"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'domanda', davanti: quaderno + titolo,
      html: G.sottotitolo('NARRATORE', 'L’ultima volta Emma è entrata nella montagna rosa, ed è uscita blu come il mare.') +
        G.sottotitolo('ADA', 'E se al posto del mare ci fosse un parco?'),
    });
    this.G = G;
    this.ada = this.m.q('.dm-ada'); this.quad = this.m.q('.dm-quad'); this.pagine = this.m.q('.dm-pagine');
    this.titolo = this.m.q('.dm-titolo'); this.insegna = this.m.q('.dm-insegna');
    this.statoAda = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[0.8, 9.0], [12.6, 16.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('02', 'domanda', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(DM_CAM, t));
    G.animaMondo(m, t + 620);
    // Ada, alla bancarella: guarda il quaderno, poi alza gli occhi verso la montagna e pensa.
    const espr = t < 12.4 ? 'base' : t < 17 ? 'pensa' : 'felice';
    if (espr !== this.statoAda) { this.ada.innerHTML = '<g transform="' + G.posaAda(672, 896) + '">' + G.ada('quaderno', espr) + '</g>'; this.statoAda = espr; }
    // Il quaderno da vicino: il viaggio dell'altra volta, con la camera che scorre piano dalla pagina rosa a quella blu.
    this.quad.setAttribute('opacity', (seg(t, DM_QUADERNO[0], DM_QUADERNO[1]) * (1 - seg(t, DM_QUADERNO[2], DM_QUADERNO[3]))).toFixed(3));
    const u = eio(seg(t, DM_QUADERNO[0], DM_QUADERNO[3]));
    this.pagine.setAttribute('transform', G.cam(lerp(930, 990, u), 510, lerp(1.0, 1.06, u)));
    // Il titolo.
    const tit = eo(seg(t, DM_TITOLO, DM_TITOLO + 1.2));
    this.titolo.setAttribute('opacity', tit.toFixed(3));
    this.titolo.setAttribute('transform', 'translate(0 ' + (16 * (1 - tit)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('Al parco', 760, 230, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
