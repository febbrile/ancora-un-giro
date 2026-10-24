const { seg, eo, ei, eio, lerp } = kit;
// Nel parco gemello (coordinate del suo mondo, uguale a quello di Ada). Una striscia vola sopra il fiume: «Al mare Emma».
// La prende il custode tondo. La porta al suo Bruco, che qui ha la faccia dipinta di un altro colore: le paperelle escono
// verdi, e la sbarra resta su. Poi, alla stazione, attacca in testa la sua frase del parco, dietro una bandierina d'oro:
// «Storie di parco». Le bandierine d'argento e d'ottone sono le stesse. Zac, zac: salgono la bandierina d'oro, Storie, Di e
// Parco, che agita i rametti; poi la bandierina d'argento, Al, Mare ed Emma, coi vestiti di sempre; nell'ultimo vagone, la
// bandierina d'ottone. Ada li confronta con il quaderno: uguali.
// Si apre sul cielo sopra il fiume; finisce sul treno che parte (lo riprende «finestre», dentro).
const FR_VOLO = [0.2, 2.8];
const FR_BRUCO = { sale: 3.2, passo: 0.3, parte: 4.2, giro: 3.0, carta: 7.6 };
const FR_CU_B = [1120, 1032], FR_CU_S = [470, 836];
const FR_TAGLI = Array.from({ length: 9 }, (_, i) => 11.4 + i * 0.6);
const FR_VOLA = 1.0, FR_VITA = 0.2;
const FR_SBARRE = [28.6, 29.2], FR_PARTE = 29.2, FR_VEL = [[FR_PARTE, 0], [30.0, 220], [31.2, 640]];
const FR_CAM = [
  { t: 0, cx: 2000, cy: 700, z: 1.4 },
  { t: 2.8, cx: 1220, cy: 990, z: 3.0 },
  { t: 8.19, cx: 1220, cy: 990, z: 3.0 },
  { t: 8.2, cx: 420, cy: 790, z: 3.6 },
  { t: 11.0, cx: 420, cy: 790, z: 3.6 },
  { t: 12.0, cx: 250, cy: 790, z: 2.4 },
  { t: 21.0, cx: 250, cy: 790, z: 2.4 },
  { t: 22.0, cx: 520, cy: 820, z: 3.2 },
  { t: 28.4, cx: 520, cy: 820, z: 3.2 },
  { t: 31.2, cx: 120, cy: 760, z: 2.0 },
];
function frBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('frase', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, L = G.MOD.seconda.gemello.laggiu, F = G.MOD.seconda.bruco.frasi.mare;
    const gio = S2.giostrina({ sbarra: 0, luci: 1 });
    this.bruco = S2.giroBruco({ id: 'frb', parole: F.frase, vestiti: F.vestiti, uscita: F.uscita, rosse: F.rosse, verdi: F.verdi, seme: 75, faccia: S2.FACCIA_GEMELLO,
      mano: [FR_CU_B[0] - 26, FR_CU_B[1] - 92], riporta: () => [FR_CU_B[0] - 26, FR_CU_B[1] - 92], t: FR_BRUCO });
    this.chi = S2.treno(L);
    this.parole = L.frase.map(w => w === 'storie' ? 'Storie' : w);
    this.fermo = G.fermoTreno(10);
    this.sedili = this.chi.map((c, i) => [this.fermo + i * M.passoBanchina + 6, 816]);
    let scintille = '';
    for (let i = 0; i < 9; i++) { scintille += '<g class="fr-scint" opacity="0">'; for (let k = 0; k < 8; k++) scintille += '<circle r="2.2" fill="' + C.luce + '"/>'; scintille += '</g>'; }
    const sopra = '<g class="fr-macchina"></g><g class="fr-cu"></g><g class="fr-treno">' + G.treno(this.chi.map(c => ({ tipo: c.tipo, col: c.biglietto, o: c.o })), { sbarra: 0 }) + '</g>' +
      gio.dietro + this.bruco.bruco + gio.davanti + '<g class="fr-ada"></g><g class="fr-nastro"></g>' + this.bruco.biglietti +
      this.parole.map(p => '<g class="fr-big" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(p) + '</g></g>').join('') + scintille;
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'frase', manopola: 0, banchina: true, morto: true, gemello: true, fiume: -S2.GEMELLO.dx,
      html: G.sottotitolo('NARRATORE', 'Anche qui il custode attacca la frase del parco. Ma la sua dice un’altra cosa: storie di parco.') +
        G.sottotitolo('ADA', 'Stessi biglietti, stessi vestiti. Ma davanti c’è Parco!'),
    });
    this.m.q('.g-bruco-vasca').insertAdjacentHTML('beforeend', this.bruco.papere);
    this.bruco.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.fr-treno .g-vag'); this.pass = this.vag.map(v => v.querySelector('.g-pass'));
    this.mac = q('.fr-macchina'); this.cu = q('.fr-cu'); this.ada = q('.fr-ada'); this.nastroEl = q('.fr-nastro');
    this.big = this.m.qa('.fr-big'); this.scint = this.m.qa('.fr-scint');
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    this.bocca = [x0 + 100 * s, y0 + 213 * s];
    this.linea = G.linea([[40, 740], [568, 740], [575, 741], [x0 + 100 * s - 1.5, 745], [x0 + 100 * s, y0 + 60 * s + 2]]);
    this.fine = 528;
    const pts = [];
    for (let i = 0; i <= 80; i++) pts.push(frBez([[2600, 300], [2200, 260], [1500, 700], [FR_CU_B[0] - 26, FR_CU_B[1] - 92]], i / 80));
    this.volo = G.linea(pts);
    this.stati = {};
    this.sub = G.subs(kit, [[11.2, 19.4], [23.4, 28.2]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('15', 'frase', t);
    const G = this.G, S2 = G.S2, M = G.MONDO, m = this.m, N = this.parole.length;
    m.cam.setAttribute('transform', G.camChiavi(FR_CAM, t));
    G.animaMondo(m, t + 2540);
    this.bruco.render(t);
    // La striscia in volo sopra il fiume; poi, alla stazione, la striscia intera che entra nella fessura.
    let nastro = '';
    if (t >= FR_VOLO[0] && t < FR_VOLO[1]) {
      const Lv = this.volo.lung, A = Lv * eo(seg(t, FR_VOLO[0], FR_VOLO[1]));
      nastro = G.nastro(this.volo, A - 150, A, ['Al', 'mare', 'Emma'].map((w, i) => [w, A - (2 - i + 0.5) * 50]), 16, { onda: s => 6 * Math.sin((A - s) * 0.05 - t * 6) * (A - s) / 150 });
    } else if (t >= 8.2 && t < FR_TAGLI[N - 1] + 0.3) {
      const P = 52;
      let f = 50 * eio(seg(t, FR_TAGLI[0] - 0.6, FR_TAGLI[0] - 0.05));
      FR_TAGLI.slice(1).forEach(a => { f += P * eio(seg(t, a - 0.5, a - 0.05)); });
      const par = this.parole.map((w, i) => [w, this.fine - (N - 1 - i + 0.5) * P + f]);
      nastro = G.nastro(this.linea, this.fine - N * P + f, Math.min(this.linea.lung, this.fine + f), par, 15, {});
    }
    this.cambia('nastro', nastro, this.nastroEl, nastro);
    // Lo Spezzaparole: zac, zac.
    let forbice = 0.6, bocca = 0;
    FR_TAGLI.forEach(a => { forbice = Math.min(forbice, 0.6 * Math.min(1, Math.abs((t - a) / 0.16))); bocca = Math.max(bocca, 1 - Math.abs(t - a - 0.1) / 0.3); });
    this.cambia('mac', forbice.toFixed(2) + bocca.toFixed(2), this.mac, '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({ forbice, bocca }) + '</g>');
    // Il treno: i biglietti volano sui sedili, dall'ultimo al primo; poi parte.
    const sp = G.percorso(t, 640 - this.fermo, FR_VEL), passo = lerp(M.passoBanchina, M.passo, seg(sp, 640 - this.fermo, 640 - this.fermo + 150));
    G.posaTreno(this.vag, m.partenza, sp, null, passo);
    G.nascondiInMontagna(this.vag, m.partenza, sp, { fine: true, passo });
    G.sbarre(this.vag, i => eio(seg(t, FR_SBARRE[0] + i * 0.05, FR_SBARRE[1] + i * 0.05)));
    this.big.forEach((b, i) => {
      const j = N - 1 - i, a = FR_TAGLI[j] + 0.1, vita = a + FR_VOLA + FR_VITA, u = eio(seg(t, a, a + FR_VOLA)), [sx, sy] = this.sedili[i];
      const x = lerp(this.bocca[0], sx, u), y = lerp(this.bocca[1], sy - 8, u) - (40 + 9 * j) * Math.sin(Math.PI * u), nasce = seg(t, vita - 0.15, vita + 0.25);
      b.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.26 * (1 - 0.5 * nasce)).toFixed(3) + ')');
      b.setAttribute('opacity', t < a ? 0 : (1 - nasce).toFixed(3));
      const p = this.pass[i], v = eo(seg(t, vita, vita + 0.6));
      p.setAttribute('opacity', v.toFixed(3));
      p.setAttribute('transform', 'translate(140 40) scale(' + lerp(0.5, 1, v).toFixed(3) + ') translate(-140 -40)');
      const sc = seg(t, vita, vita + 1.1), sci = this.scint[i];
      sci.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
      if (sc > 0 && sc < 1) [...sci.children].forEach((cc, n) => { const an = n * Math.PI / 4 + 0.3, d = 6 + 22 * eo(sc); cc.setAttribute('cx', (sx + d * Math.cos(an)).toFixed(2)); cc.setAttribute('cy', (sy - 14 + d * Math.sin(an)).toFixed(2)); });
    });
    const ip = this.chi.findIndex(c => c.tipo === 'parco'), vp = FR_TAGLI[N - 1 - ip] + 0.1 + FR_VOLA + FR_VITA;
    const ciao = Math.round((-22 + 18 * Math.sin((t - vp) * 5)) * seg(t, vp + 0.4, vp + 0.9) * (1 - seg(t, vp + 2.4, vp + 2.9)));
    if (String(ciao) !== this.stati.parco) { G.cambiaPasseggero(this.vag[ip], 'parco', this.chi[ip].biglietto, { ciao }); this.stati.parco = String(ciao); }
    // Il custode tondo: al Bruco con i biglietti; poi alla stazione, con la frase del parco.
    const alBruco = t < 8.2, [cx, cy] = alBruco ? FR_CU_B : FR_CU_S;
    const posa = alBruco ? (t < FR_BRUCO.sale + 1 || t > FR_BRUCO.carta ? 'cenno' : 'base') : t < FR_TAGLI[0] ? 'cenno' : 'base';
    this.cambia('cu', posa + alBruco, this.cu, '<g transform="' + G.posaCustode(cx, cy, 0.26) + '">' + G.unico(G.custodeGemello(posa, 'sorriso', { occhi: alBruco ? 1 : -1 }), 'frcu') + '</g>');
    // Ada: al Bruco guarda; alla stazione confronta il treno col quaderno.
    const [ax, ay] = alBruco ? [1060, 1050] : [672, 896];
    const espr = t < 22 ? 'base' : t < 26 ? 'sorpresa' : 'felice';
    this.cambia('ada', espr + alBruco, this.ada, '<g transform="' + G.posaAda(ax, ay) + '">' + G.ada('quaderno', espr) + '</g>');
    this.sub(t);
  },
});
