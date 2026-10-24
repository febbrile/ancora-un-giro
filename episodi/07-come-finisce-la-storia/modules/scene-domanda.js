const { seg, eo, eio, lerp } = kit;
// Sera, il salotto del prologo, con la lampada calda. Sul telefono, sotto «Al mare Emma», la risposta: «nuota»; sotto,
// tre puntini che pulsano piano: la risposta sta ancora arrivando. Stacco sul luna park: il treno di Al, Mare, Emma e
// della paperella blu, un vagone più lungo, attraversa il cielo e sparisce nella montagna. Ada, alla bancarella col
// quaderno aperto, lo segue con gli occhi e si chiede se potrebbe girare per sempre. Titolo: «Come finisce la storia».
// Si apre nel salotto; finisce su Ada alla bancarella, con il titolo (la riprende «giri», con il treno che esce).
const DM_STACCO = 7.4;
const DM_CAM = [
  { t: 7.4, cx: 960, cy: 560, z: 1.02 },
  { t: 10.6, cx: 960, cy: 560, z: 1.02 },
  { t: 13.0, cx: 706, cy: 846, z: 3.8 },
  { t: 16.4, cx: 706, cy: 846, z: 3.8 },
  { t: 19.0, cx: 760, cy: 760, z: 2.4 },
];
// Il treno sul cielo, in fondo al viadotto: dove si trova all'inizio del luna park, e la sua velocità.
const DM_TRENO = 3886, DM_VEL = [[DM_STACCO, 230]];
const DM_TITOLO = 17.0;
kit.scene('domanda', {
  init(kit) {
    const G = window.G, M = G.MONDO, P = G.MOD.mare.passeggeri, F = G.MOD.finisce.passeggeri;
    const chi = [{ tipo: 'al', col: P.Al.biglietto }, { tipo: 'mare', col: P.mare.biglietto }, { tipo: 'emma', col: P.Emma.biglietto }, { tipo: 'paperella', col: F.nuota.biglietto }];
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="dm-treno">' + G.treno(chi, { sbarra: 1 }) + '</g>' +
      '<g class="dm-ada"></g>';
    const casa = '<g class="dm-casa"><g class="dm-casa-cam">' + G.salotto('<g class="dm-tel"></g>') + '</g></g>';
    const titolo = '<g class="dm-titolo" opacity="0"><g transform="translate(960 300)"><g class="dm-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'domanda', manopola: 0, banchina: true, morto: true, davanti: casa + titolo,
      html: G.sottotitolo('NARRATORE', 'Sul telefono, sotto la storia, tre puntini: la risposta sta ancora arrivando. Al luna park, il treno fa un giro dopo l’altro.') +
        G.sottotitolo('ADA', 'Il treno potrebbe girare per sempre?'),
    });
    this.G = G;
    this.vag = this.m.qa('.dm-treno .g-vag'); this.ada = this.m.q('.dm-ada');
    this.casa = this.m.q('.dm-casa'); this.casaCam = this.m.q('.dm-casa-cam'); this.tel = this.m.q('.dm-tel');
    this.titolo = this.m.q('.dm-titolo'); this.insegna = this.m.q('.dm-insegna');
    this.statoAda = ''; this.statoIns = ''; this.statoTel = '';
    this.sub = G.subs(kit, [[0.8, 11.6], [13.0, 16.2]]);
  },
  render(t, kit) {
    t = window.G.tempo('07', 'domanda', t);
    const G = this.G, m = this.m;
    // Il salotto: la camera si avvicina piano alla chat; i tre puntini pulsano.
    const inCasa = t < DM_STACCO;
    this.casa.setAttribute('opacity', inCasa ? 1 : 0);
    if (inCasa) {
      const z = lerp(1.0, 1.55, eio(seg(t, 0.4, 7.4))), [bx, by] = [940, 640];
      this.casaCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')');
      const k = (Math.round(t * 30) / 30).toFixed(3);
      if (k !== this.statoTel) { this.tel.innerHTML = G.unico(G.telefono({ chat: [['io', 'Al mare Emma'], ['ai', 'nuota']], puntini: +k }), 'dmtel'); this.statoTel = k; }
    }
    // Il luna park: il treno attraversa il cielo e sparisce nella montagna.
    m.cam.setAttribute('transform', G.camChiavi(DM_CAM, t));
    G.animaMondo(m, t + 900);
    const s = G.percorso(t, DM_TRENO, DM_VEL);
    G.posaTreno(this.vag, m.partenza, s);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true });
    // Ada, alla bancarella col quaderno aperto: segue il treno, poi pensa.
    const espr = t < 11.6 ? 'base' : 'pensa';
    if (espr !== this.statoAda) { this.ada.innerHTML = '<g transform="' + G.posaAda(672, 896) + '">' + G.ada('quaderno', espr) + '</g>'; this.statoAda = espr; }
    // Il titolo.
    const tit = eo(seg(t, DM_TITOLO, DM_TITOLO + 1.2));
    this.titolo.setAttribute('opacity', tit.toFixed(3));
    this.titolo.setAttribute('transform', 'translate(0 ' + (16 * (1 - tit)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('Come finisce la storia', 1340, 230, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
