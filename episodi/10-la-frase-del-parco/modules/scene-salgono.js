const { seg, eo, ei, eio, lerp } = kit;
// Ada infila la striscia nello Spezzaparole: zac, zac, zac… I biglietti volano sui sedili e prendono vita, dall'ultimo
// vagone in avanti: nell'ultimo la bandierina d'ottone; poi Emma, col suo vestito rosa antico, Parco ed Al; la bandierina
// d'argento; Mare, l'onda con gli occhi, Di e Storie; nel primo vagone la bandierina d'oro: una bandierina piccola sul suo
// bastoncino, con due occhi, senza scritte. Sono nove vagoni. La camera percorre il treno dalla testa alla coda; Mare
// saluta Ada. Le sbarre si abbassano e il treno parte da solo.
// Si apre alla fessura dello Spezzaparole; finisce sul treno che corre verso la salita (lo riprende «fili», dentro).
const SA_PASSO = 52, SA_ALTO = 15;
// I colpi di forbice: uno per biglietto, dall'ultimo (la bandierina d'ottone) al primo (quella d'oro).
const SA_TAGLI = [1.8, 2.75, 3.7, 4.65, 5.6, 6.55, 7.5, 8.45, 9.4];
const SA_VOLO = 1.2, SA_VITA = 0.2;
const SA_GUIDA = [0, 1.6];
const SA_CORRE = [10.6, 11.8];
const SA_CIAO = [20.9, 23.4], SA_MARE = [20.6, 23.6];
const SA_SBARRE = [23.2, 23.9], SA_PARTE = 23.9;
const SA_VEL = [[SA_PARTE, 0], [24.7, 200], [26.0, 620]];
const SA_CAM = [
  { t: 0, cx: 380, cy: 784, z: 2.5 },
  { t: 10.8, cx: 380, cy: 784, z: 2.5 },
  // Dalla testa alla coda.
  { t: 12.6, cx: -20, cy: 790, z: 3.6 },
  { t: 13.6, cx: -20, cy: 790, z: 3.6 },
  { t: 19.6, cx: 500, cy: 790, z: 3.6 },
  // Ada, alla bancarella, saluta Mare.
  { t: 20.6, cx: 400, cy: 806, z: 2.3 },
  { t: 23.6, cx: 400, cy: 806, z: 2.3 },
  { t: 26.2, cx: 160, cy: 760, z: 2.0 },
];
kit.scene('salgono', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, giro = G.MOD.seconda.parco.giri[0];
    this.chi = S2.treno(giro);
    this.parole = giro.frase.map(w => w === 'storie' ? 'Storie' : w);
    this.fermo = G.fermoTreno(10);
    this.sedili = this.chi.map((c, i) => [this.fermo + i * M.passoBanchina + 6, 816]);
    let scintille = '';
    for (let i = 0; i < 9; i++) { scintille += '<g class="sa-scint" opacity="0">'; for (let k = 0; k < 8; k++) scintille += '<circle r="2.2" fill="' + C.luce + '"/>'; scintille += '</g>'; }
    const sopra = '<g class="sa-macchina"></g>' +
      '<g transform="' + G.posaCustode(-150, 836) + '">' + G.unico(G.custode('base', 'base', { occhi: 1 }), 'sacu') + '</g>' +
      '<g class="sa-treno">' + G.treno(this.chi.map(c => ({ tipo: c.tipo, col: c.biglietto, o: c.o })), { sbarra: 0 }) + '</g>' +
      '<g class="sa-nastro"></g>' +
      this.parole.map(p => '<g class="sa-big" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(p) + '</g></g>').join('') + scintille +
      '<g class="sa-ada"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'salgono', manopola: 0, banchina: true, morto: true,
      html: G.sottotitolo('NARRATORE', 'Davanti al messaggio, una bandierina d’argento. In fondo, una d’ottone, per la risposta.') +
        G.sottotitolo('NARRATORE', 'Salgono tutti, anche le bandierine. E nell’ultimo vagone, stasera, c’è quella d’ottone.') +
        G.sottotitolo('ADA', 'C’è anche Mare!'),
    });
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.sa-treno .g-vag');
    this.pass = this.vag.map(v => v.querySelector('.g-pass'));
    this.mac = q('.sa-macchina'); this.nastroEl = q('.sa-nastro'); this.ada = q('.sa-ada');
    this.big = this.m.qa('.sa-big'); this.scint = this.m.qa('.sa-scint');
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    this.bocca = [x0 + 100 * s, y0 + 213 * s];
    const fx = x0 + 100 * s, fy = y0 + 60 * s;
    this.linea = G.linea([[40, 740], [568, 740], [575, 741], [fx - 1.5, 745], [fx, fy + 2]]);
    this.fine = 528;
    this.stati = {};
    this.sub = G.subs(kit, [[2.4, 10.2], [12.8, 20.2], [21.0, 23.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('10', 'salgono', t);
    const G = this.G, M = G.MONDO, m = this.m, N = this.parole.length;
    m.cam.setAttribute('transform', G.camChiavi(SA_CAM, t));
    G.animaMondo(m, t + 1100);
    // La striscia, tirata dentro la fessura a strattoni: a ogni colpo di forbice entra un biglietto.
    let f = 50 * eio(seg(t, SA_TAGLI[0] - 0.6, SA_TAGLI[0] - 0.05));
    SA_TAGLI.slice(1).forEach(a => { f += SA_PASSO * eio(seg(t, a - 0.55, a - 0.05)); });
    const lfin = this.linea.lung;
    const par = this.parole.map((w, i) => [w, this.fine - (N - 1 - i + 0.5) * SA_PASSO + f]);
    const nastro = t > SA_TAGLI[N - 1] + 0.3 ? '' : G.nastro(this.linea, this.fine - N * SA_PASSO + f, Math.min(lfin, this.fine + f), par, SA_ALTO, {
      onda: s => 1.2 * Math.sin((this.fine - s) * 0.03 - t * 4) * (1 - seg(s, lfin - 40, lfin - 20)),
    });
    if (this.stati.nastro !== nastro) { this.nastroEl.innerHTML = nastro; this.stati.nastro = nastro; }
    // Lo Spezzaparole: trema, gli aghi girano, la forbice scatta, la bocca si accende.
    const lavora = seg(t, SA_TAGLI[0] - 0.8, SA_TAGLI[0] - 0.5) * (1 - seg(t, SA_TAGLI[N - 1] + 0.5, SA_TAGLI[N - 1] + 0.9));
    let forbice = 0.6, bocca = 0;
    SA_TAGLI.forEach(a => { forbice = Math.min(forbice, 0.6 * Math.min(1, Math.abs((t - a) / 0.18))); bocca = Math.max(bocca, 1 - Math.abs(t - a - 0.1) / 0.3); });
    const trema = lavora * 1.2 * Math.sin(t * 40), aghi = lavora * 70 * Math.sin(t * 5);
    const km = forbice.toFixed(2) + '|' + Math.round(aghi) + '|' + bocca.toFixed(2);
    const tr = 'translate(' + trema.toFixed(2) + ' 0) ' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300);
    if (km !== this.stati.mac) { this.mac.innerHTML = '<g transform="' + tr + '">' + G.spezzaparole({ forbice, aghi, bocca }) + '</g>'; this.stati.mac = km; }
    else if (this.mac.firstChild) this.mac.firstChild.setAttribute('transform', tr);
    // Il treno: fermo lungo la banchina; poi le sbarre si abbassano e parte.
    const sp = G.percorso(t, 640 - this.fermo, SA_VEL), passo = lerp(M.passoBanchina, M.passo, seg(sp, 640 - this.fermo, 640 - this.fermo + 150));
    G.posaTreno(this.vag, m.partenza, sp, null, passo);
    G.nascondiInMontagna(this.vag, m.partenza, sp, { fine: true, passo });
    G.sbarre(this.vag, i => eio(seg(t, SA_SBARRE[0] + i * 0.06, SA_SBARRE[1] + i * 0.06)));
    // I biglietti: escono dalla bocca e volano sui sedili, dall'ultimo in avanti; poi i passeggeri prendono vita.
    this.big.forEach((b, i) => {
      const j = N - 1 - i, a = SA_TAGLI[j] + 0.1, vita = a + SA_VOLO + SA_VITA;
      const u = eio(seg(t, a, a + SA_VOLO)), [bx, by] = this.bocca, [sx, sy] = this.sedili[i];
      const x = lerp(bx, sx, u), y = lerp(by, sy - 8, u) - (40 + 9 * j) * Math.sin(Math.PI * u);
      const nasce = seg(t, vita - 0.15, vita + 0.25);
      b.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + (-10 * Math.sin(Math.PI * u)).toFixed(1) + ') scale(' + (0.26 * (1 - 0.5 * nasce) * lerp(0.4, 1, eo(seg(t, a, a + 0.25)))).toFixed(3) + ')');
      b.setAttribute('opacity', t < a ? 0 : (1 - nasce).toFixed(3));
      const v = eo(seg(t, vita, vita + 0.6));
      // Mare saluta Ada, dondolando; la bandierina d'oro sventola appena nata.
      const c = this.chi[i];
      const ciaoMare = c.tipo === 'mare' ? 10 * Math.sin((t - SA_MARE[0]) * 7) * seg(t, SA_MARE[0], SA_MARE[0] + 0.4) * (1 - seg(t, SA_MARE[1] - 0.4, SA_MARE[1])) : 0;
      const sventola = c.tipo === 'bandierina' ? 6 * Math.sin((t - vita) * 9) * seg(t, vita + 0.3, vita + 0.6) * (1 - seg(t, vita + 1.6, vita + 2.0)) : 0;
      const p = this.pass[i];
      p.setAttribute('opacity', v.toFixed(3));
      p.setAttribute('transform', 'translate(140 40) rotate(' + (ciaoMare + sventola).toFixed(1) + ') scale(' + lerp(0.5, 1, v).toFixed(3) + ') translate(-140 -40)');
      const sc = seg(t, vita, vita + 1.1), sci = this.scint[i];
      sci.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
      if (sc > 0 && sc < 1) [...sci.children].forEach((cc, n) => { const an = n * Math.PI / 4 + 0.3, d = 6 + 22 * eo(sc); cc.setAttribute('cx', (sx + d * Math.cos(an)).toFixed(2)); cc.setAttribute('cy', (sy - 14 + d * Math.sin(an)).toFixed(2)); });
    });
    // Parco agita i rametti appena nato.
    const ip = this.chi.findIndex(c => c.tipo === 'parco'), vp = SA_TAGLI[N - 1 - ip] + 0.1 + SA_VOLO + SA_VITA;
    const ciao = Math.round((-22 + 18 * Math.sin((t - vp) * 5)) * seg(t, vp + 0.4, vp + 0.9) * (1 - seg(t, vp + 2.4, vp + 2.9)));
    if (String(ciao) !== this.stati.parco) { G.cambiaPasseggero(this.vag[ip], 'parco', this.chi[ip].biglietto, { ciao }); this.stati.parco = String(ciao); }
    // Ada: guida la striscia nella fessura; poi guarda i passeggeri, e saluta Mare.
    const guida = t > SA_GUIDA[0] && t < SA_GUIDA[1], ciaoAda = t > SA_CIAO[0] && t < SA_CIAO[1];
    const espr = t < SA_TAGLI[0] ? 'base' : t < 12 ? 'sorpresa' : t < 21 ? 'base' : 'felice';
    const ang = ciaoAda ? Math.round(14 * Math.sin((t - SA_CIAO[0]) * 7)) : guida ? -24 : 0;
    const ka = guida + '|' + ciaoAda + '|' + espr + '|' + ang;
    if (ka !== this.stati.ada) { this.ada.innerHTML = '<g class="sa-ada-in">' + (guida || ciaoAda ? G.adaSaluta(espr, ang) : G.ada('base', espr)) + '</g>'; this.stati.ada = ka; }
    // Poi va alla bancarella, per non coprire nessuno.
    const corre = eio(seg(t, SA_CORRE[0], SA_CORRE[1]));
    const ax = lerp(lerp(526, 512, eio(seg(t, SA_GUIDA[1], SA_GUIDA[1] + 0.8))), 672, corre), ay = lerp(M.ada[1], 896, corre) - (corre > 0 && corre < 1 ? 5 * Math.abs(Math.sin(t * 9)) : 0);
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    this.sub(t);
  },
});
