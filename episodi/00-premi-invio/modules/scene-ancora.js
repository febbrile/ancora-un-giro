const { seg, eo, eio, lerp } = kit;
// Il treno riparte con un vagone in più, esce a sinistra, ricompare sul viadotto e sparisce nella montagna;
// sul telefono la storia si allunga.
// Ada, alla vasca, guarda la montagna. Titolo: «Ancora un giro».
// Si apre dove finisce «pesca».
const AN_CAM = [
  { t: 0, cx: 400, cy: 790, z: 2.7 },
  { t: 2.4, cx: 400, cy: 790, z: 2.7 },
  { t: 9.0, cx: 900, cy: 560, z: 1.05 },
  { t: 12.2, cx: 900, cy: 560, z: 1.05 },
  { t: 15.4, cx: 770, cy: 818, z: 3.3, da: 15.0 },
  { t: 19.4, cx: 770, cy: 818, z: 3.3 },
  { t: 22.6, cx: 960, cy: 560, z: 1 },
];
// Velocità del treno [t, v]: parte piano; fuori dall'inquadratura corre sulla banchina lunga e sale (non si vede);
// ricompare da sinistra sul viadotto ed entra nella montagna quando entrava prima.
const AN_VEL = [[0, 0], [1.6, 0], [2.6, 110], [4.5, 120], [5.0, 110], [5.4, 110], [6.4, 2382], [7.4, 320]];
const AN_TEL = [11.8, 12.4, 15.0, 15.6];
const AN_TITOLO = 19.6;
kit.scene('ancora', {
  init(kit) {
    const G = window.G, M = G.MONDO, D = G.MOD.mare, P = D.passeggeri;
    const chi = [{ tipo: 'al', col: P.Al.biglietto }, { tipo: 'mare', col: P.mare.biglietto }, { tipo: 'emma', col: P.Emma.biglietto }, { tipo: 'paperella', col: D.nuovo.nuota }];
    const sopra = '<g class="an-treno">' + G.treno(chi, { sbarra: 1 }) + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="an-ada"></g>';
    const z = 1.16, [bx, by] = G.SALOTTO.bolla;
    const camTel = 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z + ')';
    const telefono = '<g class="an-tel" opacity="0"><g transform="' + camTel + '">' + G.salotto('<g class="an-tel-in"></g>') + '</g></g>';
    const titolo = '<g class="an-titolo" opacity="0"><g transform="translate(960 330)"><g class="an-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'ancora', davanti: telefono + titolo,
      html: G.sottotitolo('NARRATORE', 'E il treno riparte, un vagone più lungo: ancora un giro.') +
        G.sottotitolo('ADA', 'La vasca si riempie sempre. Ma cosa succede, là dentro?'),
    });
    this.G = G;
    this.vag = this.m.qa('.an-treno .g-vag'); this.ada = this.m.q('.an-ada');
    this.tel = this.m.q('.an-tel'); this.telIn = this.m.q('.an-tel-in');
    this.titolo = this.m.q('.an-titolo'); this.insegna = this.m.q('.an-insegna');
    this.s0 = 640 - M.fermo;
    this.statoAda = ''; this.statoTel = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[1.0, 7.4], [15.2, 19.9]]);
  },
  render(t, kit) {
    t = window.G.tempo('00', 'ancora', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(AN_CAM, t));
    G.animaMondo(m, t + 190);
    const s = G.percorso(t, this.s0, AN_VEL);
    G.posaTreno(this.vag, m.partenza, s);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true });
    const espr = t < 14 ? 'felice' : 'pensa';
    if (espr !== this.statoAda) { this.ada.innerHTML = '<g transform="' + G.posaAda(672, 896) + '">' + G.ada('base', espr) + '</g>'; this.statoAda = espr; }
    // Il telefono: la risposta cresce di una parola alla volta.
    this.tel.setAttribute('opacity', (seg(t, AN_TEL[0], AN_TEL[1]) * (1 - seg(t, AN_TEL[2], AN_TEL[3]))).toFixed(3));
    const parole = 1 + Math.max(0, Math.min(9, Math.floor((t - AN_TEL[1]) / 0.32)));
    if (String(parole) !== this.statoTel) { this.telIn.innerHTML = G.telefono({ messaggi: ['Al mare Emma'], risposta: parole }); this.statoTel = String(parole); }
    // Il titolo, con le lampadine che si accendono a turno (piano: meno di due volte al secondo).
    const tit = eo(seg(t, AN_TITOLO, AN_TITOLO + 1.2));
    this.titolo.setAttribute('opacity', tit.toFixed(3));
    this.titolo.setAttribute('transform', 'translate(0 ' + (16 * (1 - tit)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('Ancora un giro', 980, 230, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
