const { seg, eo, ei, eio, lerp } = kit;
// Notte al luna park. Ada è alla stazione, col quaderno aperto sul disegno di «Al parco» della prima stagione: Emma nel
// treno con Parco, la vasca piena di paperelle verdi. Una striscia vola sopra i tetti: «Al parco Emma». Ada allunga la
// mano, ma la striscia la prende prima il custode, che stasera è sulla banchina, con la lanterna e il regolamento sotto il
// braccio. Lui ci attacca qualcosa in testa, svelto (non si vede cosa: lo si vedrà in «pagina»), e gliela porge. Ada gli
// mostra il disegno verde, tutta contenta, infila la striscia nello Spezzaparole e corre alla bancarella. Il treno esce
// sopra la vasca: la camera resta sull'acqua, dove cadono le paperelle, tantissime blu, quasi altrettante turchesi,
// qualche verde. Ada guarda la vasca, poi il disegno. Titolo: «La frase del parco».
// Si apre sulla stazione; finisce su Ada alla bancarella, col titolo (la riprende «pesca», con la vasca piena).
const DM_CU = [436, 836];
const DM_QUADERNO = [2.0, 2.6, 7.0, 7.6];
const DM_VOLO = [7.4, 10.0], DM_PRESA = 10.0;
const DM_ATTACCA = [10.6, 12.6], DM_ZAC = 11.6;
const DM_PORGE = [12.6, 13.8], DM_ADA_PRENDE = 13.4;
const DM_MOSTRA = [14.0, 15.6];
const DM_FESSURA = [15.8, 16.8];
const DM_CORRE = [16.9, 17.8];
const DM_ACQUA = 18.0;
const DM_GIRO = { esce: 15.6, vel: [[15.6, 280], [18.0, 280], [18.5, 50], [22.4, 50], [23.2, 220]] };
const DM_GUARDA = 24.6;
const DM_TITOLO = 28.4;
const DM_CAM = [
  { t: 0, cx: 500, cy: 784, z: 3.0 },
  { t: 7.4, cx: 440, cy: 730, z: 2.1 },
  { t: 9.6, cx: 452, cy: 776, z: 3.2 },
  { t: 12.4, cx: 452, cy: 790, z: 4.4 },
  { t: 14.0, cx: 480, cy: 790, z: 3.6 },
  { t: 16.8, cx: 560, cy: 800, z: 3.0 },
  { t: 17.99, cx: 600, cy: 820, z: 2.8 },
  // Sull'acqua: il treno passa sopra, fuori dall'inquadratura, e cadono le paperelle.
  { t: 18.0, cx: 772, cy: 902, z: 6.6 },
  { t: 23.6, cx: 772, cy: 902, z: 6.6 },
  { t: 25.4, cx: 728, cy: 862, z: 4.4 },
  { t: 28.0, cx: 728, cy: 862, z: 4.4 },
  { t: 29.6, cx: 740, cy: 800, z: 2.6 },
];
const DM_PAROLE = ['Al', 'parco', 'Emma'];
function dmBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('domanda', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, P = G.MOD.parco, giro = G.MOD.seconda.parco.giri[0];
    this.giro = G.giro7({ id: 'dm', chi: S2.treno(giro), vasca: giro.vasca, seme: 101, fermo: G.fermoTreno(10), t: DM_GIRO });
    const sopra = '<g class="dm-macchina"><g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '"><g class="dm-sp"></g></g></g>' +
      this.giro.treno + '<g class="dm-cu"></g><g class="dm-ada"></g><g class="dm-nastro"></g><g class="dm-scint" opacity="0">' +
      [0, 1, 2, 3, 4, 5].map(() => '<circle r="1.6" fill="' + C.luce + '"/>').join('') + '</g>';
    // Il quaderno: la sera di «Al parco», nella prima stagione. A sinistra Emma nel treno, con Parco davanti; a destra
    // la vasca di quella sera, verde (dal modellino).
    const PP = P.passeggeri;
    const sinistra = S2.vagoneDisegnato(385, 600, 1.55, '<g transform="translate(0 6) scale(.85)">' + S2.schizzoParco(PP.parco.biglietto) + '</g>') +
      S2.vagoneDisegnato(745, 600, 1.55, '<g transform="translate(0 30)">' + G.schizzoEmma(0, 0, PP.Emma.tratti[2], 1.0) + '</g>') +
      '<path d="M210 760 L920 760" stroke="#3A3570" stroke-width="6" stroke-dasharray="4 16" stroke-linecap="round"/>';
    const destra = S2.vascaDisegnata(P.vasca, 1350, 560, 1.2, 9, 18);
    const quaderno = '<g class="dm-quad" opacity="0"><g class="dm-q-cam">' + G.quadernoAperto(sinistra, destra) + '</g></g>';
    const titolo = '<g class="dm-titolo" opacity="0"><g transform="translate(960 290)"><g class="dm-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'domanda', manopola: 0, banchina: true, morto: true, bruco: 'buio', davanti: quaderno + titolo,
      html: G.sottotitolo('NARRATORE', 'Stasera arriva una frase che Ada conosce: «Al parco Emma». L’altra volta la vasca era verde.') +
        G.sottotitolo('ADA', 'E stasera è blu. Perché?'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.giro.papere);
    this.giro.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.sp = q('.dm-sp'); this.cu = q('.dm-cu'); this.ada = q('.dm-ada'); this.nastroEl = q('.dm-nastro'); this.scint = q('.dm-scint');
    this.quad = q('.dm-quad'); this.qCam = q('.dm-q-cam'); this.titolo = q('.dm-titolo'); this.insegna = q('.dm-insegna');
    // Il volo della striscia: dal cielo sopra i tetti fino alla mano del custode.
    this.mano = G.puntoCustode(DM_CU[0], DM_CU[1], G.CUSTODE_MANI.porge);
    const [hx, hy] = this.mano, pts = [];
    for (let i = 0; i <= 120; i++) pts.push(dmBez([[-330, 340], [-60, 330], [220, 560], [hx, hy]], i / 120));
    this.volo = G.linea(pts);
    this.stati = {};
    this.sub = G.subs(kit, [[0.8, 9.4], [24.8, 27.6]]);
  },
  // Disegna di nuovo solo se è cambiato qualcosa.
  cambia(el, k, html) { if (this.stati[el.className.baseVal || el.getAttribute('class')] !== k) { el.innerHTML = html; this.stati[el.className.baseVal || el.getAttribute('class')] = k; } },
  render(t, kit) {
    t = window.G.tempo('10', 'domanda', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(DM_CAM, t));
    G.animaMondo(m, t + 1010);
    // Il quaderno, da vicino.
    const [q0, q1, q2, q3] = DM_QUADERNO;
    this.quad.setAttribute('opacity', (seg(t, q0, q1) * (1 - seg(t, q2, q3))).toFixed(3));
    const zq = lerp(1.0, 1.06, seg(t, q0, q3));
    this.qCam.setAttribute('transform', 'translate(' + (960 - 960 * zq).toFixed(1) + ' ' + (540 - 540 * zq).toFixed(1) + ') scale(' + zq.toFixed(4) + ')');
    // Lo Spezzaparole: prende la striscia dalla fessura e la taglia (la forbice si vede appena).
    const lavora = seg(t, DM_FESSURA[0] + 0.3, DM_FESSURA[0] + 0.5) * (1 - seg(t, DM_CORRE[1], DM_CORRE[1] + 0.3));
    const forbice = lavora ? 0.3 + 0.3 * Math.abs(Math.sin(t * 14)) : 0.6, bocca = lavora * Math.abs(Math.sin(t * 7));
    this.cambia(this.sp, forbice.toFixed(1) + bocca.toFixed(1), G.spezzaparole({ forbice: +forbice.toFixed(1), bocca: +bocca.toFixed(1), aghi: lavora * 40 }));
    // Il treno esce e le paperelle cadono nella vasca (il treno non si vede: la camera è sull'acqua).
    this.giro.render(t);
    // La striscia: vola, la prende il custode, ci attacca qualcosa in testa, la porge ad Ada, Ada la infila nella fessura.
    const passo = 46, alto = 14, L = this.volo.lung;
    let nastro = '';
    if (t >= DM_VOLO[0] && t < DM_PRESA) {
      const A = L * eo(seg(t, DM_VOLO[0], DM_PRESA)), par = DM_PAROLE.map((w, i) => [w, A - (2 - i + 0.5) * passo]);
      nastro = G.nastro(this.volo, A - 3 * passo, A, par, alto, { onda: s => 6 * Math.sin((A - s) * 0.05 - t * 6) * (A - s) / (3 * passo) });
    } else if (t >= DM_PRESA && t < DM_ATTACCA[0]) {
      // Appesa alla mano, nel vento.
      const [hx, hy] = this.mano, ln = G.linea([[hx, hy], [hx - 40, hy + 30], [hx - 120, hy + 44]]);
      nastro = G.nastro(ln, 0, 3 * passo, DM_PAROLE.map((w, i) => [w, (i + 0.5) * passo]), alto, { onda: s => 4 * Math.sin(s * 0.06 - t * 5) * s / 140 });
    } else if (t >= DM_ATTACCA[0] && t < DM_ADA_PRENDE) {
      // Tra le due mani, davanti al petto: il custode ci attacca qualcosa in testa.
      const a = G.puntoCustode(DM_CU[0], DM_CU[1], G.CUSTODE_MANI.attacca[0]), b = G.puntoCustode(DM_CU[0], DM_CU[1], G.CUSTODE_MANI.attacca[1]);
      const testa = eo(seg(t, DM_ZAC - 0.2, DM_ZAC + 0.2)) * 9, ln = G.linea([[a[0] - 24 - testa, a[1] + 1], [b[0] + 26, b[1] + 1]]);
      nastro = G.nastro(ln, 0, ln.lung, DM_PAROLE.map((w, i) => [w, testa + 14 + i * 18]), 9, {});
      if (testa > 0) nastro += '<rect x="' + (a[0] - 24 - testa).toFixed(1) + '" y="' + (a[1] - 4).toFixed(1) + '" width="' + testa.toFixed(1) + '" height="10" fill="' + G.C.crema + '" stroke="' + G.C.cremaScura + '" stroke-width=".8"/>';
      const sc = seg(t, DM_ZAC, DM_ZAC + 0.8);
      this.scint.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
      [...this.scint.children].forEach((c, k) => { const an = k * Math.PI / 3, d = 3 + 9 * eo(sc); c.setAttribute('cx', (a[0] - 26 + d * Math.cos(an)).toFixed(2)); c.setAttribute('cy', (a[1] + d * Math.sin(an)).toFixed(2)); });
    } else if (t >= DM_FESSURA[0] && t < DM_FESSURA[1]) {
      // Ada la infila nella fessura dello Spezzaparole.
      const fx = 581.6, fy = 754.4, u = eio(seg(t, DM_FESSURA[0], DM_FESSURA[1])), ln = G.linea([[548, 790], [fx - 6, 760], [fx, fy + 2]]);
      nastro = G.nastro(ln, ln.lung * u * 0.9, ln.lung, [], 9, {});
    }
    if (this.stati.nastro !== nastro) { this.nastroEl.innerHTML = nastro; this.stati.nastro = nastro; }
    // Il custode: aspetta con la lanterna, prende la striscia, ci attacca qualcosa, la porge ad Ada, guarda il disegno.
    const posaCu = t >= DM_VOLO[1] - 0.6 && t < DM_ATTACCA[0] ? 'porge' : t >= DM_ATTACCA[0] && t < DM_ADA_PRENDE ? 'attacca' : 'base';
    const esprCu = t >= DM_MOSTRA[0] && t < DM_MOSTRA[1] + 0.6 ? 'sorriso' : 'base';
    const occhiCu = t >= DM_VOLO[0] && t < DM_PRESA ? -1 : t >= DM_PORGE[0] && t < DM_MOSTRA[1] + 0.6 ? 1 : 0;
    const dond = Math.round(6 * Math.sin(t * 1.6));
    this.cambia(this.cu, posaCu + esprCu + occhiCu + dond, '<g transform="' + G.posaCustode(DM_CU[0], DM_CU[1]) + '">' + G.unico(G.custode(posaCu, esprCu, { occhi: occhiCu, dondolo: dond }), 'dmcu') + '</g>');
    // Ada: il quaderno; allunga la mano verso la striscia; la prende dal custode, gli mostra il disegno; la infila nella
    // fessura; corre alla bancarella; guarda la vasca, poi il disegno.
    let ax = M.ada[0], ay = M.ada[1], posa = 'quaderno', espr = 'felice', alza = false;
    if (t >= DM_VOLO[0] + 0.6 && t < DM_PRESA + 0.4) { posa = 'saluta'; espr = 'sorpresa'; alza = true; }
    else if (t >= DM_PRESA + 0.4 && t < DM_ADA_PRENDE) { posa = 'base'; espr = 'sorpresa'; }
    else if (t >= DM_ADA_PRENDE && t < DM_MOSTRA[0]) { posa = 'striscia'; espr = 'felice'; }
    else if (t >= DM_MOSTRA[0] && t < DM_MOSTRA[1]) { posa = 'quaderno'; espr = 'felice'; }
    else if (t >= DM_MOSTRA[1] && t < DM_CORRE[0]) { posa = 'striscia'; espr = 'base'; }
    else if (t >= DM_CORRE[0] && t < DM_ACQUA + 2) { posa = 'base'; espr = 'base'; }
    else if (t >= DM_ACQUA + 2) { posa = 'quaderno'; espr = t < DM_GUARDA ? 'sorpresa' : t < DM_TITOLO - 1 ? 'pensa' : 'base'; }
    // Ada si avvicina al custode per prendere la striscia, poi va alla fessura, poi alla bancarella.
    const verso = eio(seg(t, DM_PORGE[0] - 0.4, DM_ADA_PRENDE)), fess = eio(seg(t, DM_MOSTRA[1], DM_FESSURA[0] + 0.2)), corre = eio(seg(t, DM_CORRE[0], DM_CORRE[1]));
    ax = lerp(lerp(lerp(M.ada[0], 486, verso), 548, fess), 672, corre);
    ay = lerp(M.ada[1], 896, corre) - (corre > 0 && corre < 1 ? 5 * Math.abs(Math.sin(t * 9)) : 0) - (alza ? 10 * Math.sin(Math.PI * seg(t, DM_PRESA - 0.6, DM_PRESA + 0.2)) : 0);
    const kAda = posa + espr;
    this.cambia(this.ada, kAda, '<g class="dm-ada-in">' + (alza ? G.adaSaluta(espr, -18) : G.ada(posa, espr)) + '</g>');
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    // Il titolo.
    const tit = eo(seg(t, DM_TITOLO, DM_TITOLO + 1.2));
    this.titolo.setAttribute('opacity', tit.toFixed(3));
    this.titolo.setAttribute('transform', 'translate(0 ' + (16 * (1 - tit)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (t > DM_TITOLO - 0.2) this.cambia(this.insegna, turno, G.insegna('La frase del parco', 1160, 230, +turno));
    this.sub(t);
  },
});
