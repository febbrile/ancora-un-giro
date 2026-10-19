const { seg, eo, ei, eio, lerp } = kit;
// Ada porta la coda della striscia alla fessura dello Spezzaparole, e la biglietteria se la tira dentro: zac, zac,
// zac… a ogni parola un biglietto esce dalla bocca e vola sul suo sedile, dall'ultimo vagone in avanti (il treno si
// allunga di due vagoni). I passeggeri prendono vita, ognuno col colore del suo biglietto: Al, Mare, Emma rosa antico,
// la paperella blu che si scrolla le piume, l'altro Al, Parco che agita i rametti. Ada li saluta. Poi si vede la
// banchina intera, con le due sbarre a righe ai suoi capi: tra Parco e la sbarra di dietro c'è posto per un vagone solo.
// Si apre come finisce «striscia»; finisce sulla banchina intera (la riprende «fili»).
const BA_CAM = [
  { t: 0, cx: 400, cy: 780, z: 2.55 },
  { t: 1.4, cx: 470, cy: 778, z: 3.1 },
  { t: 4.2, cx: 470, cy: 778, z: 3.1 },
  { t: 6.8, cx: 380, cy: 784, z: 2.6 },
  { t: 12.0, cx: 380, cy: 784, z: 2.6 },
  { t: 15.6, cx: 330, cy: 790, z: 3.2 },
  { t: 18.6, cx: 330, cy: 790, z: 3.2 },
  { t: 21.0, cx: 377, cy: 786, z: 2.45 },
];
// La striscia: la stessa linea su cui l'ha lasciata «striscia», che poi scende nella fessura dello Spezzaparole.
const BA_PASSO = 76, BA_ALTO = 18;
// I colpi di forbice: uno per parola, dall'ultima («parco») alla prima.
const BA_TAGLI = [1.9, 2.85, 3.8, 4.75, 5.7, 6.65];
const BA_VOLO = 1.2, BA_VITA = 0.2;
const BA_VAGONI = [0.7, 1.3];
const BA_GUIDA = [0.3, 1.9], BA_VIA = [2.6, 4.2];
const BA_CIAO = [8.6, 11.8];
// La banchina: la luce corre sulle assi da una sbarra all'altra, poi resta sul posto libero.
const BA_LUCE = [20.4, 22.8], BA_POSTO = [22.6, 27.2];
kit.scene('banchina', {
  init(kit) {
    const G = window.G, M = G.MONDO, H = G.MOD.chat;
    this.parole = H.messaggi[1].striscia;
    this.chi = ['al', 'mare', 'emma', 'paperella', 'al', 'parco'].map((tp, i) => [tp, H.messaggi[1].biglietti[i]]);
    this.sedili = this.chi.map((c, i) => [M.fermo + i * M.passoBanchina + 6, 816]);
    let scintille = '';
    for (let i = 0; i < 8; i++) { scintille += '<g class="ba-scint" opacity="0">'; for (let k = 0; k < 8; k++) scintille += '<circle r="2.2" fill="' + G.C.luce + '"/>'; scintille += '</g>'; }
    const [b0, b1] = M.banchina;
    const luce = '<rect class="ba-luce" x="-60" y="826" width="120" height="26" rx="13" fill="' + G.C.luce + '" opacity="0" filter="url(#g-glow)"/>' +
      '<rect class="ba-posto" x="' + (M.fermo + 6 * M.passoBanchina - 38) + '" y="792" width="76" height="60" rx="14" fill="' + G.C.luce + '" opacity="0" filter="url(#g-soft)"/>' +
      [b0, b1].map(x => '<circle class="ba-lampada" cx="' + x + '" cy="802" r="14" fill="' + G.C.rosso + '" opacity="0" filter="url(#g-glow)"/>').join('');
    const sopra = '<g class="ba-macchina"></g>' + luce +
      '<g class="ba-treno">' + G.treno(this.chi.map(c => ({ tipo: c[0], col: c[1] })), { sbarra: 0 }) + '</g>' +
      '<g class="ba-nastro"></g>' +
      this.parole.map(p => '<g class="ba-big" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(p) + '</g></g>').join('') + scintille +
      '<g class="ba-ada"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'banchina', manopola: 0, banchina: true,
      html: G.sottotitolo('ADA', 'Siete di nuovo voi!') +
        G.sottotitolo('NARRATORE', 'Il treno non si ricorda niente: a ogni messaggio risalgono tutti, dal principio.') +
        G.sottotitolo('NARRATORE', 'E la banchina è lunga così: ci stanno sette vagoni, non uno di più.'),
    });
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.ba-treno .g-vag');
    this.pass = this.vag.map(v => v.querySelector('.g-pass'));
    G.posaTreno(this.vag, this.m.partenza, 640 - M.fermo, null, M.passoBanchina);
    this.mac = q('.ba-macchina'); this.nastroEl = q('.ba-nastro'); this.ada = q('.ba-ada');
    this.big = this.m.qa('.ba-big'); this.scint = this.m.qa('.ba-scint');
    this.luce = q('.ba-luce'); this.posto = q('.ba-posto'); this.lampade = this.m.qa('.ba-lampada');
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    this.fessura = [x0 + 100 * s, y0 + 60 * s]; this.bocca = [x0 + 100 * s, y0 + 213 * s];
    const [fx, fy] = this.fessura;
    this.linea = G.linea([[110, 740], [568, 740], [575, 741], [fx - 1.5, 745], [fx, fy + 2]]);
    this.fine = 458;
    this.statoAda = ''; this.statoMac = ''; this.statoPass = [];
    this.sub = G.subs(kit, [[8.8, 11.4], [12.0, 19.2], [19.8, 26.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('04', 'banchina', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(BA_CAM, t));
    G.animaMondo(m, t + 970);
    // La striscia, tirata dentro la fessura a strattoni: a ogni colpo di forbice entra una parola.
    let f = 62 * eio(seg(t, 1.25, 1.85));
    BA_TAGLI.slice(0, -1).forEach((a, j) => { f += BA_PASSO * eio(seg(t, BA_TAGLI[j + 1] - 0.55, BA_TAGLI[j + 1] - 0.05)); });
    const lfin = this.linea.lung;
    const par = this.parole.map((w, i) => [w, this.fine - (5 - i + 0.5) * BA_PASSO + f]);
    this.nastroEl.innerHTML = t > BA_TAGLI[5] + 0.3 ? '' : G.nastro(this.linea, this.fine - 6 * BA_PASSO + f, Math.min(lfin, this.fine + f), par, BA_ALTO, {
      onda: s => 1.2 * Math.sin((this.fine - s) * 0.03 - t * 4) * (1 - seg(s, lfin - 40, lfin - 20)),
    });
    // Lo Spezzaparole: trema, gli aghi girano, la forbice scatta, la bocca si accende.
    const lavora = seg(t, 1.0, 1.3) * (1 - seg(t, BA_TAGLI[5] + 0.5, BA_TAGLI[5] + 0.9));
    let forbice = 0.6, bocca = 0;
    BA_TAGLI.forEach(a => { forbice = Math.min(forbice, 0.6 * Math.min(1, Math.abs((t - a) / 0.18))); bocca = Math.max(bocca, 1 - Math.abs(t - a - 0.1) / 0.3); });
    const trema = lavora * 1.2 * Math.sin(t * 40), aghi = lavora * 70 * Math.sin(t * 5);
    const km = forbice.toFixed(2) + '|' + Math.round(aghi) + '|' + bocca.toFixed(2);
    const tr = 'translate(' + trema.toFixed(2) + ' 0) ' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300);
    if (km !== this.statoMac) { this.mac.innerHTML = '<g transform="' + tr + '">' + G.spezzaparole({ forbice, aghi, bocca }) + '</g>'; this.statoMac = km; }
    else if (this.mac.firstChild) this.mac.firstChild.setAttribute('transform', tr);
    // Il treno si allunga di due vagoni, con le scintille.
    [4, 5].forEach(i => this.vag[i].setAttribute('opacity', eo(seg(t, BA_VAGONI[0] + (i - 4) * 0.3, BA_VAGONI[1] + (i - 4) * 0.3)).toFixed(3)));
    // I biglietti: escono dalla bocca e volano sui sedili, dall'ultimo in avanti; poi i passeggeri prendono vita.
    this.big.forEach((b, i) => {
      const j = 5 - i, a = BA_TAGLI[j] + 0.1, vita = a + BA_VOLO + BA_VITA;
      const u = eio(seg(t, a, a + BA_VOLO)), [bx, by] = this.bocca, [sx, sy] = this.sedili[i];
      const x = lerp(bx, sx, u), y = lerp(by, sy - 8, u) - (40 + 14 * j) * Math.sin(Math.PI * u);
      const nasce = seg(t, vita - 0.15, vita + 0.25);
      b.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + (-10 * Math.sin(Math.PI * u)).toFixed(1) + ') scale(' + (0.26 * (1 - 0.5 * nasce) * lerp(0.4, 1, eo(seg(t, a, a + 0.25)))).toFixed(3) + ')');
      b.setAttribute('opacity', t < a ? 0 : (1 - nasce).toFixed(3));
      const v = eo(seg(t, vita, vita + 0.6));
      // La paperella blu si scrolla le piume; gli altri si guardano intorno, contenti.
      const scrolla = this.chi[i][0] === 'paperella' ? 12 * Math.sin((t - vita) * 22) * seg(t, vita + 0.5, vita + 0.7) * (1 - seg(t, vita + 1.3, vita + 1.6)) : 0;
      const p = this.pass[i];
      p.setAttribute('opacity', v.toFixed(3));
      p.setAttribute('transform', 'translate(140 40) rotate(' + scrolla.toFixed(1) + ') scale(' + lerp(0.5, 1, v).toFixed(3) + ') translate(-140 -40)');
      const sc = seg(t, vita, vita + 1.1), sci = this.scint[i];
      sci.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
      [...sci.children].forEach((c, n) => { const an = n * Math.PI / 4 + 0.3, d = 6 + 22 * eo(sc); c.setAttribute('cx', (sx + d * Math.cos(an)).toFixed(2)); c.setAttribute('cy', (sy - 14 + d * Math.sin(an)).toFixed(2)); });
    });
    [6, 7].forEach((n, k) => {
      const sc = seg(t, BA_VAGONI[0] + k * 0.3, BA_VAGONI[0] + k * 0.3 + 1.1), sci = this.scint[n], sx = this.sedili[4 + k][0];
      sci.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
      [...sci.children].forEach((c, i) => { const an = i * Math.PI / 4, d = 10 + 30 * eo(sc); c.setAttribute('cx', (sx + d * Math.cos(an)).toFixed(2)); c.setAttribute('cy', (838 + d * 0.6 * Math.sin(an)).toFixed(2)); });
    });
    // Parco agita i rametti appena nato, e di nuovo quando Ada saluta.
    const vp = BA_TAGLI[0] + 0.1 + BA_VOLO + BA_VITA;
    const ciao = Math.round((-22 + 18 * Math.sin((t - vp) * 5)) * Math.max(seg(t, vp + 0.4, vp + 0.9) * (1 - seg(t, vp + 2.4, vp + 2.9)), seg(t, BA_CIAO[0], BA_CIAO[0] + 0.5) * (1 - seg(t, BA_CIAO[1] - 0.5, BA_CIAO[1]))));
    if (String(ciao) !== this.statoPass[5]) { G.cambiaPasseggero(this.vag[5], 'parco', this.chi[5][1], { ciao }); this.statoPass[5] = String(ciao); }
    // Ada: porta la coda della striscia alla fessura, poi va alla bancarella e saluta i passeggeri.
    const via = eio(seg(t, BA_VIA[0], BA_VIA[1]));
    const ax = lerp(512, 672, via), ay = lerp(M.ada[1], 896, via) - (via > 0 && via < 1 ? 5 * Math.abs(Math.sin(t * 8)) : 0);
    const guida = t > BA_GUIDA[0] && t < BA_GUIDA[1], ciaoAda = t > BA_CIAO[0] && t < BA_CIAO[1];
    const espr = t < BA_TAGLI[0] ? 'base' : t < 8.4 ? 'sorpresa' : t < 13 ? 'felice' : t < 19.6 ? 'base' : t < 23 ? 'pensa' : 'occhio';
    const ang = ciaoAda ? Math.round(14 * Math.sin((t - BA_CIAO[0]) * 7)) : guida ? -24 : 0;
    const ka = guida + '|' + ciaoAda + '|' + espr + '|' + ang;
    if (ka !== this.statoAda) { this.ada.innerHTML = '<g class="ba-ada-in">' + (guida || ciaoAda ? G.adaSaluta(espr, ang) : G.ada('base', espr)) + '</g>'; this.statoAda = ka; }
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    // La banchina intera: le lampadine delle due sbarre si accendono; la luce corre sulle assi, poi resta sul posto libero.
    this.lampade.forEach((l, k) => {
      const a = BA_LUCE[0] + k * (BA_LUCE[1] - BA_LUCE[0]);
      l.setAttribute('opacity', (0.9 * Math.max(Math.sin(Math.PI * seg(t, 6.8 + k * 0.5, 8.0 + k * 0.5)), Math.sin(Math.PI * seg(t, a - 0.3, a + 0.9)))).toFixed(3));
    });
    const lu = seg(t, BA_LUCE[0], BA_LUCE[1]);
    this.luce.setAttribute('transform', 'translate(' + lerp(M.banchina[0], M.banchina[1], eio(lu)).toFixed(1) + ' 0)');
    this.luce.setAttribute('opacity', (0.8 * Math.sin(Math.PI * lu)).toFixed(3));
    this.posto.setAttribute('opacity', (0.7 * eio(seg(t, BA_POSTO[0], BA_POSTO[0] + 0.8)) * (1 - eio(seg(t, BA_POSTO[1] - 0.8, BA_POSTO[1]))) * (0.85 + 0.15 * Math.sin(t * 4))).toFixed(3));
    this.sub(t);
  },
});
