const { seg, eo, eio, lerp } = kit;
// Ogni sera Ada guarda il trenino sparire nella montagna e si chiede cosa succeda là dentro: sul quaderno ha disegnato
// la montagna con un punto di domanda. Titolo: «Dentro la montagna».
const DO_CAM = [
  { t: 0, cx: 960, cy: 540, z: 1 },
  { t: 4.4, cx: 960, cy: 540, z: 1 },
  { t: 9.6, cx: 700, cy: 838, z: 4.0 },
  { t: 16.4, cx: 700, cy: 838, z: 4.0 },
  { t: 19.4, cx: 820, cy: 700, z: 1.9 },
];
// Il treno dell'ultima volta (quello del prologo, con il vagone della paperella) sta entrando nella montagna.
const DO_VEL = [[0, 260], [4, 260]];
const DO_QUADERNO = [11.6, 12.2, 15.6, 16.2];
const DO_TITOLO = 19.6;
kit.scene('domanda', {
  init(kit) {
    const G = window.G, M = G.MONDO, D = G.MOD.mare, P = D.passeggeri, C = G.C;
    const chi = [{ tipo: 'al', col: P.Al.biglietto }, { tipo: 'mare', col: P.mare.biglietto }, { tipo: 'emma', col: P.Emma.biglietto }, { tipo: 'paperella', col: D.nuovo.nuota }];
    const disegno = '<g transform="translate(260 120)" stroke="#3A3570" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none">' +
      '<path class="do-tratto" d="M0 520 L180 220 Q260 90 360 70 Q440 60 520 200 L700 520"/>' +
      '<path class="do-tratto" d="M140 520 L140 440 Q190 380 250 430 L250 520"/>' +
      '<path class="do-tratto" d="M-120 300 Q60 200 300 150"/>' +
      '<path class="do-tratto" d="M760 120 Q760 40 840 40 Q920 40 920 120 Q920 180 840 210 L840 280" stroke="' + C.rossoScuro + '" stroke-width="16"/>' +
      '<circle class="do-punto" cx="840" cy="350" r="14" fill="' + C.rossoScuro + '" stroke="none" opacity="0"/></g>';
    const quaderno = '<g class="do-quad" opacity="0"><rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<rect x="210" y="70" width="1500" height="860" rx="24" fill="#2F6F73"/><rect x="236" y="96" width="1448" height="808" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 96 L960 904" stroke="' + C.cremaScura + '" stroke-width="4"/>' + disegno + '</g>';
    const sopra = '<g class="do-treno">' + G.treno(chi, { sbarra: 1 }) + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="do-ada"></g>';
    const titolo = '<g class="do-titolo" opacity="0"><g transform="translate(960 300)"><g class="do-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'domanda', davanti: quaderno + titolo,
      html: G.sottotitolo('NARRATORE', 'Ogni sera Ada guarda il trenino sparire nella montagna, e ogni sera si chiede cosa succeda là dentro. Ada sul trenino non sale mai. Noi, questa volta, sì.'),
    });
    this.G = G;
    this.vag = this.m.qa('.do-treno .g-vag'); this.ada = this.m.q('.do-ada');
    this.quad = this.m.q('.do-quad'); this.tratti = this.m.qa('.do-tratto'); this.punto = this.m.q('.do-punto');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.titolo = this.m.q('.do-titolo'); this.insegna = this.m.q('.do-insegna');
    this.s0 = this.m.partenza.getTotalLength() - 520;
    this.statoAda = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[0.6, 13.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('01', 'domanda', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(DO_CAM, t));
    G.animaMondo(m, t + 300);
    const s = G.percorso(t, this.s0, DO_VEL);
    G.posaTreno(this.vag, m.partenza, s);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true });
    // Ada, alla bancarella, con il quaderno: disegna, poi alza gli occhi verso la montagna.
    const posa = t < 16.4 ? 'disegna' : 'quaderno';
    const espr = t < 16.4 ? 'base' : 'pensa';
    const matita = Math.round(10 * Math.sin(t * 6)) * (t > 6 && t < 16 ? 1 : 0);
    const k = posa + espr + matita;
    if (k !== this.statoAda) { this.ada.innerHTML = '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(posa, espr, { matita }) + '</g>'; this.statoAda = k; }
    // Il quaderno da vicino: la montagna e un grande punto di domanda, tratto dopo tratto.
    this.quad.setAttribute('opacity', (seg(t, DO_QUADERNO[0], DO_QUADERNO[1]) * (1 - seg(t, DO_QUADERNO[2], DO_QUADERNO[3]))).toFixed(3));
    this.tratti.forEach((p, i) => {
      const u = eio(seg(t, 11.0 + i * 0.9, 12.2 + i * 0.9));
      p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1));
      p.setAttribute('stroke-dashoffset', ((1 - u) * this.lung[i]).toFixed(1));
    });
    this.punto.setAttribute('opacity', seg(t, 14.6, 14.8).toFixed(3));
    // Il titolo.
    const tit = eo(seg(t, DO_TITOLO, DO_TITOLO + 1.2));
    this.titolo.setAttribute('opacity', tit.toFixed(3));
    this.titolo.setAttribute('transform', 'translate(0 ' + (16 * (1 - tit)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('Dentro la montagna', 1160, 230, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
