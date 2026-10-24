const { seg, eo, eio, lerp } = kit;
// Notte al luna park, oggi. Il trenino color crema sale e sparisce nella bocca buia della montagna. Ada, sulla banchina
// col quaderno, guarda i binari: sono lucidi, e piegati un pochino in mille punti, come i gradini di una scala vecchia.
// Dietro la stazione, sul binario morto mezzo coperto dall'erba, dormono tre vecchi treni grigi, impolverati, col
// fanale spento. Ada guarda la pista, poi i treni grigi, e si chiede chi l'ha costruita. Titolo.
// Si apre sul parco intero; finisce sul parco con Ada e il titolo (lo riprende «indietro»).
const DM_CAM = [
  { t: 0, cx: 960, cy: 540, z: 1 },
  { t: 3.6, cx: 960, cy: 540, z: 1 },
  { t: 6.8, cx: 690, cy: 816, z: 3.8 },
  { t: 9.4, cx: 700, cy: 812, z: 3.8 },
  // Ada si gira: stacco sui treni grigi, in fondo alla banchina lunga; poi stacco di nuovo su di lei.
  { t: 11.6, cx: 680, cy: 812, z: 3.8 },
  { t: 11.61, cx: -1698, cy: 790, z: 2.2 },
  { t: 16.8, cx: -1668, cy: 790, z: 2.2 },
  { t: 16.81, cx: 460, cy: 800, z: 3.2 },
  { t: 17.8, cx: 470, cy: 800, z: 3.2 },
  { t: 20.4, cx: 470, cy: 800, z: 3.2 },
  { t: 22.4, cx: 420, cy: 640, z: 1.5 },
];
// Il trenino di oggi sale e sparisce nella montagna.
const DM_TRENO = [3986, [[0, 230], [3.2, 300]]];
// Ada, dove guarda: i binari (a destra), poi i treni grigi (a sinistra).
const DM_GUARDA = [[6.0, 9.0], [11.0, 13.4], [17.0, 18.0]];
const DM_TITOLO = 21.4;
kit.scene('domanda', {
  init(kit) {
    const G = window.G, M = G.MONDO, P = G.MOD.mare.passeggeri;
    const chi = [{ tipo: 'al', col: P.Al.biglietto }, { tipo: 'mare', col: P.mare.biglietto }, { tipo: 'emma', col: P.Emma.biglietto }];
    const binario = 'stroke="#E8EEFF" stroke-width="2.4" stroke-linecap="round" fill="none" opacity=".85"';
    const sopra = '<path class="dm-p-morto" d="' + M.morto + '" fill="none"/>' +
      '<path class="dm-pieghe" ' + binario + '/>' +
      '<path class="dm-luccica" d="' + M.arrivo + '" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity=".8" filter="url(#g-glow)"/>' +
      '<g class="dm-dormono" opacity=".9">' + G.treniCheDormono() + '</g>' +
      '<g class="dm-treno">' + G.treno(chi, { sbarra: 1 }) + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="dm-ada"></g>';
    const titolo = '<g class="dm-titolo" opacity="0"><g transform="translate(960 230)"><g class="dm-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'domanda', morto: true, manopola: 0, banchina: true, davanti: titolo,
      html: G.sottotitolo('NARRATORE', 'Ogni sera la pista porta i treni nella montagna, sempre per la stessa strada.') +
        G.sottotitolo('NARRATORE', 'Dietro la stazione dormono dei vecchi treni grigi.') +
        G.sottotitolo('ADA', 'Chi ha costruito una pista così?'),
    });
    this.G = G;
    const m = this.m;
    this.treno = m.qa('.dm-treno .g-vag'); this.ada = m.q('.dm-ada');
    this.titolo = m.q('.dm-titolo'); this.insegna = m.q('.dm-insegna');
    // La pista di oggi: piegata in mille punti (sulla salita e sul ponte sopra la vasca).
    m.q('.dm-pieghe').setAttribute('d', G.pieghePista(m).d(1, 2.2));
    this.luccica = m.q('.dm-luccica'); this.lLuccica = m.arrivo.getTotalLength();
    G.dormono(m.q('.dm-p-morto'), m.q('.dm-dormono'), true);
    this.statoAda = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[0.8, 8.0], [10.0, 14.6], [17.8, 21.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('05', 'domanda', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(DM_CAM, t));
    G.animaMondo(m, t + 900);
    const s = G.percorso(t, DM_TRENO[0], DM_TRENO[1]);
    G.posaTreno(this.treno, m.partenza, s, M.scala, M.passoBanchina);
    G.nascondiInMontagna(this.treno, m.partenza, s, { fine: true, passo: M.passoBanchina });
    // Un riflesso di luce scorre piano sulla rotaia del ponte: i binari sono lucidi.
    G.onda(this.luccica, this.lLuccica, ((t - 4.5) / 6) % 1 < 0 ? 0 : ((t - 4.5) / 6) % 1, 60);
    // Ada: guarda i binari, poi i treni grigi; si chiede chi ha costruito la pista.
    const espr = t < 13.4 ? 'base' : t < 17.0 ? 'pensa' : t < 21.2 ? 'pensa' : 'base';
    if (espr !== this.statoAda) { this.ada.innerHTML = '<g class="dm-ada-in">' + G.ada('quaderno', espr) + '</g>'; this.statoAda = espr; }
    let giro = 0;
    DM_GUARDA.forEach(([a, b], k) => { giro += (k === 1 ? -5 : 4) * (eio(seg(t, a, a + 0.8)) - eio(seg(t, b - 0.8, b))); });
    giro += 0.8 * Math.sin(t * 1.7);
    this.ada.firstChild.setAttribute('transform', 'rotate(' + giro.toFixed(2) + ' ' + M.ada[0] + ' ' + M.ada[1] + ') ' + G.posaAda(M.ada[0], M.ada[1]));
    // Il titolo.
    const tit = eo(seg(t, DM_TITOLO, DM_TITOLO + 1.2));
    this.titolo.setAttribute('opacity', tit.toFixed(3));
    this.titolo.setAttribute('transform', 'translate(0 ' + (16 * (1 - tit)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('Chi ha costruito la pista', 1320, 190, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
