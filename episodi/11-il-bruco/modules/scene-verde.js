const { seg, eo, ei, eio, lerp } = kit;
// Arriva un'altra striscia: «Al mare Emma». Il custode la porta al Bruco: i tre biglietti salgono sui segmenti, tutti con
// un vestito verde. Il Bruco passa nella mela, e all'uscita cadono quasi tutte verdi, una sola rossa. La sbarra resta su.
// Il custode si riprende i biglietti e li riporta alla stazione: attacca in testa la frase del parco e le bandierine, e
// consegna la striscia ad Ada. Zac, zac: salgono la bandierina d'oro, Storie, Di, Mare, la bandierina d'argento, Al, Mare,
// Emma e, nell'ultimo vagone, la bandierina d'ottone. Il treno parte.
// Si apre sul Bruco; finisce sul treno che parte dalla stazione (lo riprende «finestre», dentro).
const VE_CU = [2066, 886], VE_ADA = [2016, 906];
const VE_ARRIVA = [0, 1.6], VE_ALZA = [0.6, 1.4];
const VE_GIRO = { sale: 1.9, passo: 0.55, parte: 3.8, giro: 5.0, carta: 10.0 };
// La stazione: la striscia intera tra le mani del custode, poi ad Ada, poi lo Spezzaparole.
const VE_STAZIONE = 12.0, VE_ATTACCA = [12.4, 13.6], VE_PORGE = 14.2;
const VE_TAGLI = Array.from({ length: 9 }, (_, i) => 15.0 + i * 0.42);
const VE_VOLO = 1.0, VE_VITA = 0.2;
const VE_SBARRE = [20.6, 21.2], VE_PARTE = 21.2, VE_VEL = [[VE_PARTE, 0], [22.0, 220], [23.6, 700]];
const VE_CAM = [
  { t: 0, cx: 2150, cy: 860, z: 2.9 },
  { t: 11.99, cx: 2150, cy: 860, z: 2.9 },
  { t: 12.0, cx: 470, cy: 790, z: 4.4 },
  { t: 14.6, cx: 470, cy: 790, z: 4.4 },
  { t: 15.4, cx: 290, cy: 790, z: 2.4 },
  { t: 20.4, cx: 290, cy: 790, z: 2.4 },
  { t: 23.4, cx: 100, cy: 740, z: 1.9 },
];
kit.scene('verde', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, F = G.MOD.seconda.bruco.frasi.mare, GIRO = G.MOD.seconda.bruco.giro;
    const gio = S2.giostrina({ sbarra: 1, luci: 1 });
    this.cuX = t => t < VE_ARRIVA[1] ? lerp(1990, VE_CU[0], eio(seg(t, VE_ARRIVA[0], VE_ARRIVA[1]))) : VE_CU[0];
    this.giro = S2.giroBruco({ id: 've', parole: F.frase, vestiti: F.vestiti, uscita: F.uscita, rosse: F.rosse, verdi: F.verdi, seme: 63,
      mano: G.puntoCustode(VE_CU[0], VE_CU[1], G.CUSTODE_MANI.porge), riporta: () => G.puntoCustode(VE_CU[0], VE_CU[1], G.CUSTODE_MANI.porge), t: VE_GIRO });
    // La stazione: il treno di nove vagoni, la striscia, i biglietti.
    this.chi = S2.treno(GIRO);
    this.parole = GIRO.frase.map(w => w === 'storie' ? 'Storie' : w);
    this.fermo = G.fermoTreno(10);
    this.sedili = this.chi.map((c, i) => [this.fermo + i * M.passoBanchina + 6, 816]);
    let scintille = '';
    for (let i = 0; i < 9; i++) { scintille += '<g class="ve-scint" opacity="0">'; for (let k = 0; k < 8; k++) scintille += '<circle r="2.2" fill="' + C.luce + '"/>'; scintille += '</g>'; }
    const sopra = '<g class="ve-macchina"></g>' +
      '<g class="ve-treno">' + G.treno(this.chi.map(c => ({ tipo: c.tipo, col: c.biglietto, o: c.o })), { sbarra: 0 }) + '</g>' +
      gio.dietro + this.giro.bruco + gio.davanti + '<g class="ve-ada"></g><g class="ve-cu"></g><g class="ve-nastro"></g><g class="ve-big"></g>' + this.giro.biglietti +
      this.parole.map(p => '<g class="ve-volo" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(p) + '</g></g>').join('') + scintille;
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'verde', manopola: 0, banchina: true, morto: true,
      html: G.sottotitolo('NARRATORE', 'Con «Al mare Emma» le paperelle escono verdi, e la sbarra resta su.') +
        G.sottotitolo('NARRATORE', 'Allora la frase va alla stazione, e il treno grande parte.'),
    });
    this.m.q('.g-bruco-vasca').insertAdjacentHTML('beforeend', this.giro.papere);
    this.giro.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.ve-treno .g-vag'); this.pass = this.vag.map(v => v.querySelector('.g-pass'));
    this.mac = q('.ve-macchina'); this.ada = q('.ve-ada'); this.cu = q('.ve-cu'); this.nastroEl = q('.ve-nastro'); this.bigEl = q('.ve-big');
    this.volo = this.m.qa('.ve-volo'); this.scint = this.m.qa('.ve-scint'); this.asta = q('.g-bruco-asta');
    this.bigHtml = F.frase.map((w, i) => '<g transform="translate(' + (i * 3) + ' ' + (-i * 2) + ') rotate(' + (-12 + 8 * i) + ') scale(.13) translate(-60 -30)">' + G.biglietto(w) + '</g>');
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    this.bocca = [x0 + 100 * s, y0 + 213 * s];
    this.stati = {};
    this.sub = G.subs(kit, [[8.6, 14.4], [15.6, 20.6]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('11', 'verde', t);
    const G = this.G, S2 = G.S2, M = G.MONDO, m = this.m, T = VE_GIRO;
    m.cam.setAttribute('transform', G.camChiavi(VE_CAM, t));
    G.animaMondo(m, t + 1520);
    this.giro.render(t);
    // La sbarra del Bruco: il custode la rialza, e resta su.
    this.asta.setAttribute('transform', S2.astaBruco(1 - eio(seg(t, VE_ALZA[0], VE_ALZA[1]))));
    const staz = t >= VE_STAZIONE;
    // Il custode: al Bruco coi biglietti; poi alla stazione, attacca la frase del parco e la porge ad Ada.
    let cx = this.cuX(t), cy = VE_CU[1], posa = 'porge', occhi = 1;
    if (staz) { cx = 436; cy = 836; posa = t < VE_ATTACCA[1] ? 'attacca' : t < VE_PORGE + 0.6 ? 'porge' : 'base'; occhi = t < VE_ATTACCA[1] ? 0 : 1; }
    const cammina = !staz && t < VE_ARRIVA[1], dond = Math.round(6 * Math.sin(t * 2));
    this.cambia('cu', posa + occhi + dond + staz, this.cu, '<g class="ve-cu-in">' + G.unico(G.custode(posa, 'serio', { occhi, dondolo: dond }), 've-cu') + '</g>');
    this.cu.firstChild.setAttribute('transform', G.posaCustode(cx, cy - (cammina ? 3 * Math.abs(Math.sin(t * 6)) : 0)));
    // I biglietti in mano al custode, finché non volano sul Bruco; e quando tornano, li tiene lui.
    const [hx, hy] = G.puntoCustode(cx, cy, G.CUSTODE_MANI.porge), rimasti = this.bigHtml.filter((h, i) => t < T.sale + i * T.passo);
    this.cambia('big', rimasti.length + '' + staz, this.bigEl, staz ? '' : rimasti.join(''));
    this.bigEl.setAttribute('transform', 'translate(' + hx.toFixed(1) + ' ' + (hy - 3).toFixed(1) + ')');
    // Alla stazione: la striscia intera tra le mani; poi Ada la infila nella fessura.
    let nastro = '';
    if (staz && t < VE_TAGLI[0] - 0.3) {
      const a = G.puntoCustode(cx, cy, G.CUSTODE_MANI.attacca[0]), X = i => 352 + 16 * i, cy2 = a[1] + 1;
      const pezzi = eo(seg(t, VE_ATTACCA[0], VE_ATTACCA[1])), sx = lerp(X(5) - 9, X(0) - 9, pezzi), dx = lerp(X(7) + 9, X(8) + 9, pezzi);
      const par = this.parole.map((w, i) => [w, X(i) - sx]).filter((p, i) => (i >= 5 && i <= 7) || pezzi > 0.6);
      const ln = G.linea([[sx, cy2], [dx, cy2]]);
      nastro = '<g transform="translate(' + (lerp(0, 90, eio(seg(t, VE_PORGE, VE_PORGE + 0.6)))).toFixed(1) + ' 0)">' + G.nastro(ln, 0, ln.lung, par, 9, {}) + '</g>';
    }
    this.cambia('nastro', nastro, this.nastroEl, nastro);
    // Lo Spezzaparole: zac, zac…
    let forbice = 0.6, bocca = 0;
    VE_TAGLI.forEach(a => { forbice = Math.min(forbice, 0.6 * Math.min(1, Math.abs((t - a) / 0.14))); bocca = Math.max(bocca, 1 - Math.abs(t - a - 0.1) / 0.25); });
    this.cambia('mac', forbice.toFixed(2) + bocca.toFixed(2), this.mac, '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({ forbice, bocca }) + '</g>');
    // Il treno grande: i biglietti volano sui sedili, dall'ultimo al primo, e prendono vita; poi parte.
    const N = this.parole.length;
    const sp = G.percorso(t, 640 - this.fermo, VE_VEL), passo = lerp(M.passoBanchina, M.passo, seg(sp, 640 - this.fermo, 640 - this.fermo + 150));
    G.posaTreno(this.vag, m.partenza, sp, null, passo);
    G.nascondiInMontagna(this.vag, m.partenza, sp, { fine: true, passo });
    G.sbarre(this.vag, i => eio(seg(t, VE_SBARRE[0] + i * 0.05, VE_SBARRE[1] + i * 0.05)));
    this.volo.forEach((b, i) => {
      const j = N - 1 - i, a = VE_TAGLI[j] + 0.1, vita = a + VE_VOLO + VE_VITA, u = eio(seg(t, a, a + VE_VOLO)), [sx, sy] = this.sedili[i];
      const x = lerp(this.bocca[0], sx, u), y = lerp(this.bocca[1], sy - 8, u) - (40 + 9 * j) * Math.sin(Math.PI * u), nasce = seg(t, vita - 0.15, vita + 0.25);
      b.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.26 * (1 - 0.5 * nasce)).toFixed(3) + ')');
      b.setAttribute('opacity', t < a ? 0 : (1 - nasce).toFixed(3));
      const v = eo(seg(t, vita, vita + 0.6)), p = this.pass[i];
      p.setAttribute('opacity', v.toFixed(3));
      p.setAttribute('transform', 'translate(140 40) scale(' + lerp(0.5, 1, v).toFixed(3) + ') translate(-140 -40)');
      const sc = seg(t, vita, vita + 1.1), sci = this.scint[i];
      sci.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
      if (sc > 0 && sc < 1) [...sci.children].forEach((cc, n) => { const an = n * Math.PI / 4 + 0.3, d = 6 + 22 * eo(sc); cc.setAttribute('cx', (sx + d * Math.cos(an)).toFixed(2)); cc.setAttribute('cy', (sy - 14 + d * Math.sin(an)).toFixed(2)); });
    });
    // Ada: al Bruco guarda le verdi; alla stazione prende la striscia e la infila nella fessura, poi va alla bancarella.
    let ax = VE_ADA[0], ay = VE_ADA[1], espr = t < T.parte + T.giro ? 'base' : 'felice', posaA = 'base';
    if (staz) {
      const va = eio(seg(t, VE_PORGE + 0.4, VE_TAGLI[0] - 0.4)), corre = eio(seg(t, VE_TAGLI[2], VE_TAGLI[2] + 1.0));
      ax = lerp(lerp(500, 540, va), 672, corre); ay = lerp(M.ada[1], 896, corre) - (corre > 0 && corre < 1 ? 5 * Math.abs(Math.sin(t * 9)) : 0);
      posaA = t > VE_PORGE + 0.3 && t < VE_TAGLI[0] ? 'striscia' : 'base'; espr = 'felice';
    }
    this.cambia('ada', posaA + espr, this.ada, '<g class="ve-ada-in">' + G.ada(posaA, espr) + '</g>');
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    this.sub(t);
  },
});
