const { seg, eo, ei, eio, lerp } = kit;
// Ada corre lungo tutta la banchina, fino in testa, si china e raccoglie i due biglietti rimasti giù, Al e Mare. Li
// guarda, poi li mette nel quaderno, tra le pagine. Il treno sale piano la salita, senza il mare, corre sul viadotto e
// sparisce nella montagna; dal buio arrivano i clac. Ada segue con gli occhi la pista: la salita, il viadotto, la bocca
// buia della montagna. Cartello: «Fine».
// Si apre come finisce «giu» (la banchina intera, il treno che comincia a salire, i due biglietti sulle assi).
const PI_CAM = [
  { t: 0, cx: -307, cy: 700, z: 0.9 },
  { t: 2.4, cx: -307, cy: 700, z: 0.9 },
  { t: 4.2, cx: -1150, cy: 790, z: 3.0 },
  { t: 8.0, cx: -1150, cy: 790, z: 3.0 },
  { t: 10.6, cx: -820, cy: 560, z: 1.15 },
  { t: 12.6, cx: -820, cy: 560, z: 1.15 },
  { t: 14.6, cx: -100, cy: 470, z: 1.1 },
  { t: 16.6, cx: 640, cy: 430, z: 1.6 },
  { t: 18.8, cx: 920, cy: 480, z: 1.5 },
  { t: 21.2, cx: 760, cy: 560, z: 1.12 },
];
// Il treno riprende da dove l'ha lasciato «giu» (distanza sul percorso di partenza): piano sulla salita, più svelto sul
// viadotto, e alla fine della scena è tutto dentro la montagna.
const PI_S0 = 1953, PI_VEL = [[0, 80], [3, 110], [7, 230], [11, 380], [15, 420]];
const PI_ADA = [672, 896], PI_TESTA = [-1242, 834], PI_CORSA = [0.2, 3.8];
// I due biglietti sulle assi, accanto alla sbarra davanti (come li lascia «giu»), quando Ada li raccoglie e quando li
// mette nel quaderno. Dietro di lei passa il treno.
const PI_ASSI = [[-1226, 841, -8], [-1202, 843, 6]];
const PI_PRENDE = [4.6, 5.6], PI_QUADERNO = [6.6, 7.6];
const PI_FINE = 19.8;
kit.scene('pista', {
  init(kit) {
    const G = window.G, M = G.MONDO, H = G.MOD.chat;
    const TIPO = { Al: 'al', mare: 'mare', Emma: 'emma', nuota: 'paperella', parco: 'parco', corre: 'paperella' };
    const ultimo = H.messaggi.at(-1);
    const sale = ultimo.sale.map((w, i) => ({ tipo: TIPO[w] || 'paperella', col: ultimo.biglietti[i] }));
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="pi-treno">' + G.treno(sale, { sbarra: 1 }) + '</g>' +
      ultimo.giu.map(w => '<g class="pi-big"><g transform="translate(-60 -30)">' + G.biglietto(w) + '</g></g>').join('') +
      '<g class="pi-ada"></g><g class="pi-mano"></g>';
    const fine = '<g class="pi-fine" opacity="0"><g transform="translate(960 330)"><g class="pi-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'pista', manopola: 0, banchina: true, davanti: fine,
      html: G.sottotitolo('NARRATORE', 'Il treno non ricorda niente: porta chi sale, ogni volta, dalla banchina.') +
        G.sottotitolo('ADA', 'E una pista così… chi l’ha costruita?') +
        G.sottotitolo('NARRATORE', 'Ma questa è un’altra storia.'),
    });
    this.G = G;
    this.vag = this.m.qa('.pi-treno .g-vag'); this.big = this.m.qa('.pi-big'); this.ada = this.m.q('.pi-ada');
    this.fine = this.m.q('.pi-fine'); this.insegna = this.m.q('.pi-insegna');
    this.stato = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[2.0, 8.6], [14.0, 17.8], [18.4, 21.2]]);
  },
  render(t, kit) {
    t = window.G.tempo('04', 'pista', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PI_CAM, t));
    G.animaMondo(m, t + 1150);
    // Il treno sale piano e sparisce nella montagna.
    const s = G.percorso(t, PI_S0, PI_VEL);
    G.posaTreno(this.vag, m.partenza, s, null, 86);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true });
    // Ada corre in testa alla banchina, raccoglie i biglietti, li mette nel quaderno; poi segue la pista con gli occhi.
    const c = eio(seg(t, PI_CORSA[0], PI_CORSA[1]));
    const ax = lerp(PI_ADA[0], PI_TESTA[0], c), ay = lerp(PI_ADA[1], PI_TESTA[1], c) - (c > 0 && c < 1 ? 5 * Math.abs(Math.sin(t * 9)) : 0);
    let giu = 0;
    PI_PRENDE.forEach(a => { giu = Math.max(giu, Math.sin(Math.PI * seg(t, a - 0.5, a + 0.5))); });
    const giuQ = Math.round(giu * 20) / 20;
    const posa = t < PI_PRENDE[0] - 0.6 ? 'base' : t < PI_QUADERNO[0] ? 'pesca' : 'quaderno';
    const espr = t < PI_PRENDE[0] - 0.6 ? 'base' : t < PI_QUADERNO[0] ? 'sorpresa' : t < 18.2 ? 'pensa' : 'felice';
    const k = posa + espr + giuQ;
    if (k !== this.stato) { this.ada.innerHTML = '<g class="pi-ada-in">' + G.ada(posa, espr, { giu: posa === 'pesca' ? giuQ : 0 }) + '</g>'; this.stato = k; }
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    // I due biglietti: sulle assi, poi in mano ad Ada, poi dentro il quaderno.
    const s0 = 0.28, mano = g => [ax - 100 * s0 + (150 + 26 * g - 6) * s0, ay - 304 * s0 + (230 + 50 * g + 6) * s0];
    const pagina = [ax, ay - 24];
    this.big.forEach((b, i) => {
      const [bx, by, br] = PI_ASSI[i], preso = t >= PI_PRENDE[i];
      const [hx, hy] = mano(giuQ);
      const q = eio(seg(t, PI_QUADERNO[0] + i * 0.2, PI_QUADERNO[1] + i * 0.2));
      let x = bx, y = by, r = br, sx = 0.21, sy = 0.115;
      if (preso) { x = hx + 4 * i - 2; y = hy - 4 - 6 * i; r = -6 + 12 * i; sx = 0.2; sy = 0.2; }
      if (t >= PI_QUADERNO[0] - 0.4) { x = lerp(pagina[0] + 4 * i - 2, pagina[0], q); y = lerp(pagina[1] - 14 - 6 * i, pagina[1], q); r = lerp(-6 + 12 * i, 0, q); sx = sy = lerp(0.2, 0.12, q); }
      b.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + r.toFixed(1) + ') scale(' + sx.toFixed(3) + ' ' + sy.toFixed(3) + ')');
      b.setAttribute('opacity', (1 - seg(q, 0.7, 1)).toFixed(3));
    });
    // Il cartello: «Fine».
    const f = eo(seg(t, PI_FINE, PI_FINE + 1.0));
    this.fine.setAttribute('opacity', f.toFixed(3));
    this.fine.setAttribute('transform', 'translate(0 ' + (16 * (1 - f)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('Fine', 520, 200, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
