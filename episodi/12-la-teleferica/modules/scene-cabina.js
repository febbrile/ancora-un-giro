const { seg, eo, ei, eio, lerp } = kit;
// Il custode copia su una striscia quello che c'è tra le due paperelle viola (una sola parola, la paperella rosa, che noi
// non leggiamo), la arrotola e la infila nella cabina. La cabina parte, sale lungo il filo, passa sopra la ruota
// panoramica, oltre le colline, e sparisce in un cielo grigio di pioggia. Ada aspetta, in punta di piedi. Poco dopo la
// cabina torna, gocciolante, con una striscia nuova. Il custode la porta allo Spezzaparole: zac. Il biglietto «pioggia»
// sale in un vagone nuovo, in fondo al treno, dietro un'altra bandierina turchese. È blu.
// Si apre sul treno fermo in stazione; finisce sul treno più lungo, con «pioggia» in fondo (lo riprende «finestre»).
const CB_COPIA = [0.6, 2.6], CB_ARROTOLA = [2.8, 3.6];
const CB_CU = [1870, 872], CB_ADA = [1734, 874];
const CB_INFILA = [4.8, 5.6], CB_ANDATA = [5.8, 11.6], CB_RITORNO = [14.6, 19.4], CB_PRENDE = 19.8;
const CB_TAGLI = [21.4, 22.0];
const CB_CAM = [
  { t: 0, cx: 470, cy: 790, z: 3.2 },
  { t: 4.39, cx: 500, cy: 790, z: 3.2 },
  { t: 4.4, cx: 1820, cy: 820, z: 3.8 },
  { t: 5.8, cx: 1820, cy: 820, z: 3.8 },
  { t: 8.0, cx: 2380, cy: 470, z: 0.74 },
  { t: 10.4, cx: 3000, cy: 120, z: 0.74 },
  { t: 12.4, cx: 3200, cy: -60, z: 0.9 },
  { t: 13.4, cx: 1760, cy: 830, z: 3.6 },
  { t: 14.6, cx: 1760, cy: 830, z: 3.6 },
  { t: 16.0, cx: 2400, cy: 520, z: 0.8 },
  { t: 18.4, cx: 1840, cy: 800, z: 2.6 },
  { t: 20.39, cx: 1820, cy: 820, z: 3.8 },
  { t: 20.4, cx: 420, cy: 790, z: 2.8 },
  { t: 22.0, cx: 420, cy: 790, z: 2.8 },
  { t: 23.4, cx: 520, cy: 800, z: 3.6 },
];
kit.scene('cabina', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, TE = G.MOD.seconda.teleferica;
    this.chi = S2.trenoDa(TE.pioggia[3].frase, TE.pioggia[3].tratti);
    this.N = this.chi.length;
    this.fermo = G.fermoTreno(this.N + 1);
    this.sedili = this.chi.map((c, i) => [this.fermo + i * M.passoBanchina + 6, 816]);
    const sopra = '<g class="cb-macchina"></g>' +
      '<g class="cb-treno">' + G.treno(this.chi.map(c => ({ tipo: c.tipo, col: c.biglietto, o: c.o })), { sbarra: 0 }) + '</g>' +
      S2.teleferica({}) + '<g class="cb-cabina"></g><g class="cb-ada"></g><g class="cb-cu"></g><g class="cb-carta"></g>' +
      ['⚑turchese', 'pioggia'].map(w => '<g class="cb-big" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(w) + '</g></g>').join('') +
      '<g class="cb-scint" opacity="0">' + [0, 1, 2, 3, 4, 5, 6, 7].map(() => '<circle r="2.2" fill="' + C.luce + '"/>').join('') + '</g>';
    this.m = G.costruisciPaesaggio(kit, sopra, {
      pre: 'cabina', laggiu: 1, manopola: 0, banchina: true, morto: true, bruco: 'acceso', strisce: 0,
      html: G.sottotitolo('NARRATORE', 'La teleferica porta la richiesta fuori dal parco, oltre le colline. E torna con una striscia.') +
        G.sottotitolo('ADA', 'Pioggia!'),
    });
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.cb-treno .g-vag'); this.pass = this.vag.map(v => v.querySelector('.g-pass'));
    G.posaTreno(this.vag, this.m.partenza, 640 - this.fermo, null, M.passoBanchina);
    this.mac = q('.cb-macchina'); this.cabina = q('.cb-cabina'); this.ada = q('.cb-ada'); this.cu = q('.cb-cu'); this.carta = q('.cb-carta');
    this.big = this.m.qa('.cb-big'); this.scint = q('.cb-scint');
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    this.bocca = [x0 + 100 * s, y0 + 213 * s];
    this.stati = {};
    this.sub = G.subs(kit, [[5.8, 13.6], [23.6, 25.6]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('12', 'cabina', t);
    const G = this.G, S2 = G.S2, M = G.MONDO, m = this.m, N = this.N;
    m.cam.setAttribute('transform', G.camChiavi(CB_CAM, t));
    G.animaPaesaggio(m, t + 560, { treni: true });
    const staz = t < 4.4 || t >= 20.4;
    // La cabina: aspetta al palo, parte, sparisce tra le nuvole; torna gocciolante.
    let u = 0;
    if (t >= CB_ANDATA[0] && t < CB_RITORNO[0]) u = eio(seg(t, CB_ANDATA[0], CB_ANDATA[1]));
    else if (t >= CB_RITORNO[0]) u = 1 - eio(seg(t, CB_RITORNO[0], CB_RITORNO[1]));
    const [px, py] = S2.puntoCabina(0.015 + 0.985 * u), nuvola = seg(u, 0.88, 0.97);
    const gocce = t >= CB_RITORNO[0] ? 1 : 0, dentro = t >= CB_INFILA[1] && t < CB_PRENDE;
    this.cambia('cab', gocce + '' + dentro + (gocce ? (Math.round(t * 20) / 20).toFixed(2) : ''), this.cabina, '<g>' + S2.cabina({ gocce, t, rotolo: dentro }) + '</g>');
    this.cabina.firstChild.setAttribute('transform', 'translate(' + px.toFixed(1) + ' ' + py.toFixed(1) + ') rotate(' + (3 * Math.sin(t * 2.4) * (u > 0 && u < 1 ? 1 : 0.3)).toFixed(2) + ')');
    this.cabina.setAttribute('opacity', (1 - nuvola).toFixed(3));
    // Il custode: alla stazione copia la paperella rosa su una striscia e la arrotola; alla teleferica infila il rotolo
    // nella cabina, poi riprende la striscia nuova; alla stazione la porta allo Spezzaparole.
    // Alla fine si fa da parte, per non coprire i due vagoni nuovi.
    const cx = staz ? (t < 4.4 ? 470 : lerp(470, 250, eio(seg(t, CB_TAGLI[1] + 0.2, CB_TAGLI[1] + 1.0)))) : CB_CU[0], cy = staz ? 836 : CB_CU[1];
    const posa = staz && t < 4.4 ? 'porge' : !staz && t < CB_INFILA[1] + 0.4 ? 'porge' : !staz && t >= CB_PRENDE - 0.4 ? 'porge' : t >= 20.4 && t < CB_TAGLI[0] + 0.2 ? 'porge' : 'base';
    const occhi = staz && t < 4.4 ? 1 : !staz ? (t > 6 && t < 19 ? 1 : -1) : 1, dond = Math.round(6 * Math.sin(t * 2));
    this.cambia('cu', posa + occhi + dond + staz, this.cu, '<g transform="' + G.posaCustode(cx, cy) + '">' + G.unico(G.custode(posa, 'serio', { occhi, dondolo: dond }), 'cbcu') + '</g>');
    // La striscia nella mano: bianca (non si legge), poi arrotolata.
    const [hx, hy] = G.puntoCustode(cx, cy, G.CUSTODE_MANI.porge);
    let carta = '';
    if (staz && t < 4.4) {
      const u2 = eo(seg(t, CB_COPIA[0], CB_COPIA[1])), r = eio(seg(t, CB_ARROTOLA[0], CB_ARROTOLA[1]));
      carta = r < 1 ? '<g transform="translate(' + hx.toFixed(1) + ' ' + (hy - 4).toFixed(1) + ') scale(' + (0.1 * u2 * (1 - r)).toFixed(3) + ' .1)">' + G.striscia('', 300) + '</g>' : '';
      if (r > 0) carta += '<g transform="translate(' + hx.toFixed(1) + ' ' + (hy - 2).toFixed(1) + ') scale(' + (0.1 * r).toFixed(3) + ')">' + G.rotolo() + '</g>';
    } else if (!staz && t < CB_INFILA[1]) {
      const v = eio(seg(t, CB_INFILA[0], CB_INFILA[1])), [cbx, cby] = S2.puntoCabina(0.015);
      carta = '<g transform="translate(' + lerp(hx, cbx, v).toFixed(1) + ' ' + lerp(hy - 2, cby + 26, v).toFixed(1) + ') scale(.1)">' + G.rotolo() + '</g>';
    } else if (!staz && t >= CB_PRENDE) {
      carta = '<g transform="translate(' + hx.toFixed(1) + ' ' + (hy - 2).toFixed(1) + ') scale(.1)">' + G.rotolo() + '</g>';
    } else if (t >= 20.4 && t < CB_TAGLI[0] - 0.3) {
      const v = eio(seg(t, 20.4, CB_TAGLI[0] - 0.3));
      carta = '<g transform="translate(' + lerp(hx, 581, v).toFixed(1) + ' ' + lerp(hy - 2, 756, v).toFixed(1) + ') scale(.1)">' + G.rotolo() + '</g>';
    }
    this.cambia('carta', carta, this.carta, carta);
    // Lo Spezzaparole: zac, zac. I due biglietti volano nei due vagoni nuovi, in fondo.
    let forbice = 0.6, bocca = 0;
    CB_TAGLI.forEach(a => { forbice = Math.min(forbice, 0.6 * Math.min(1, Math.abs((t - a) / 0.16))); bocca = Math.max(bocca, 1 - Math.abs(t - a - 0.1) / 0.3); });
    this.cambia('mac', forbice.toFixed(2) + bocca.toFixed(2), this.mac, '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({ forbice, bocca }) + '</g>');
    this.vag.forEach((v, i) => { if (i >= N - 2) v.setAttribute('opacity', eo(seg(t, CB_TAGLI[0] - 0.4 + (i - N + 2) * 0.3, CB_TAGLI[0] + 0.2 + (i - N + 2) * 0.3)).toFixed(3)); });
    let scx = 0, sc = -1;
    this.big.forEach((b, j) => {
      const i = N - 2 + j, a = CB_TAGLI[j] + 0.1, u3 = eio(seg(t, a, a + 0.9)), [sx, sy] = this.sedili[i], vita = a + 1.1;
      const x = lerp(this.bocca[0], sx, u3), y = lerp(this.bocca[1], sy - 8, u3) - 36 * Math.sin(Math.PI * u3), nasce = seg(t, vita - 0.15, vita + 0.25);
      b.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.26 * (1 - 0.5 * nasce)).toFixed(3) + ')');
      b.setAttribute('opacity', t < a ? 0 : (1 - nasce).toFixed(3));
      const p = this.pass[i], v = eo(seg(t, vita, vita + 0.6));
      p.setAttribute('opacity', v.toFixed(3));
      p.setAttribute('transform', 'translate(140 40) scale(' + lerp(0.5, 1, v).toFixed(3) + ') translate(-140 -40)');
      const s2 = seg(t, vita, vita + 1.1);
      if (s2 > 0 && s2 < 1) { sc = s2; scx = sx; }
    });
    this.vag.slice(0, N - 2).forEach(v => v.querySelector('.g-pass').setAttribute('opacity', 1));
    this.scint.setAttribute('opacity', (sc > 0 ? 1 - sc : 0).toFixed(3));
    if (sc > 0) [...this.scint.children].forEach((cc, n) => { const an = n * Math.PI / 4 + 0.3, d = 6 + 22 * eo(sc); cc.setAttribute('cx', (scx + d * Math.cos(an)).toFixed(2)); cc.setAttribute('cy', (802 + d * Math.sin(an)).toFixed(2)); });
    // Ada: alla teleferica aspetta in punta di piedi; alla stazione guarda «pioggia» e la saluta.
    let ax = CB_ADA[0], ay = CB_ADA[1], espr = 'sorpresa', saluta = false;
    if (staz) { ax = 648; ay = 836; espr = t < 4.4 ? 'base' : t < 23.4 ? 'sorpresa' : 'felice'; saluta = t >= 23.4 && t < 26; }
    else { const punta = eio(seg(t, 11.8, 12.4)) * (1 - eio(seg(t, 18.6, 19.2))); ay -= 5 * punta; espr = t < 12 ? 'base' : t < 17 ? 'pensa' : 'sorpresa'; }
    const ang = saluta ? Math.round(14 * Math.sin((t - 23.4) * 7)) : 0;
    this.cambia('ada', espr + saluta + ang, this.ada, '<g class="cb-ada-in">' + (saluta ? G.adaSaluta(espr, ang) : G.ada('base', espr)) + '</g>');
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    this.sub(t);
  },
});
