const { seg, eo, eio, lerp } = kit;
// In cima alla collina. In tutti e due i parchi le sbarre si abbassano e i treni ripartono, un vagone più lungo: il
// trenino di Ada, piccolo, e i treni del parco immenso, a centinaia. Ada guarda l'uno e l'altro, sorride e chiude il
// quaderno. Poi si alza e corre giù per il sentiero, verso il suo luna park.
// Si apre come finisce «nomi», su Ada seduta in cima; finisce con Ada a metà discesa (la riprende «cancello»).
const QD_CAM = [
  { t: 0, cx: 2560, cy: 548, z: 2.9 },
  { t: 1.6, cx: 2560, cy: 548, z: 2.9 },
  // Larga: a sinistra tutta la stazione di Ada (il trenino parte lungo la banchina ed esce di campo), a destra il parco immenso.
  { t: 5.0, cx: 2440, cy: 500, z: 0.40 },
  { t: 12.4, cx: 2460, cy: 500, z: 0.40 },
  { t: 14.4, cx: 2560, cy: 560, z: 1.8 },
  { t: 17.2, cx: 2470, cy: 600, z: 1.6 },
  { t: 21.6, cx: 2180, cy: 740, z: 1.9 },
];
const QD_SBARRE = [5.4, 6.4];
const QD_VEL = [[6.8, 0], [8.4, 90], [10.4, 140], [12.4, 200]];
const QD_CHIUDE = 14.8, QD_ALZA = [15.4, 16.0], QD_CORSA = [16.4, 21.6];
const QD_CIMA = [2550, 558];
kit.scene('quaderno', {
  init(kit) {
    const G = window.G, A = G.MOD.mare, P = G.PARCO;
    const piccolo = [{ tipo: 'al', col: A.passeggeri.Al.biglietto }, { tipo: 'mare', col: A.passeggeri.mare.biglietto }, { tipo: 'emma', col: A.passeggeri.Emma.biglietto }, { tipo: 'paperella', col: A.nuovo.nuota }];
    const prato = '<path d="M2462 650 C2486 572 2520 560 2550 560 C2580 560 2614 572 2638 650 Z" fill="#1F2258"/>' +
      '<path d="M2478 600 q3 -12 6 -2 q3 -14 6 0 q3 -10 5 2 M2530 578 q3 -12 6 -2 q3 -14 6 0 q3 -10 5 2 M2590 590 q3 -12 6 -2 q3 -14 6 0 q3 -10 5 2" stroke="#2E5A3E" stroke-width="3" fill="none" stroke-linecap="round"/>';
    // La discesa: dalla cima, giù per il sentiero, fino a dove la riprende «cancello».
    this.discesa = P.sentiero.slice(2).reverse();
    this.m = G.costruisciPaesaggio(kit, '<g class="qd-trenino">' + G.treno(piccolo, { sbarra: 0 }) + '</g>' +
      '<g transform="' + G.posa(G.MONDO.spezzaparole[0], G.MONDO.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="qd-ada"></g><g class="qd-prato">' + prato + '</g>', {
      pre: 'quaderno', laggiu: 1, manopola: 0, banchina: true, morto: true, treni: true,
      html: G.sottotitolo('NARRATORE', 'Una macchina che non pensa calcola, un pezzo alla volta, quanto è probabile ogni parola che può venire dopo. Se ne pesca una, e si ricomincia.') +
        G.sottotitolo('ADA', 'Ancora un giro!'),
    });
    this.G = G;
    this.vag = this.m.qa('.qd-trenino .g-vag');
    this.m.qa('.qd-trenino .g-lucina').forEach(l => l.setAttribute('opacity', 0.3));
    this.lucine = this.m.qa('.qd-trenino .g-lucina');
    this.ada = this.m.q('.qd-ada'); this.prato = this.m.q('.qd-prato');
    this.stato = '';
    this.sub = G.subs(kit, [[1.0, 14.0], [16.4, 18.6]]);
  },
  lungo(pt, u) {
    const L = [0];
    for (let i = 1; i < pt.length; i++) L.push(L[i - 1] + Math.hypot(pt[i][0] - pt[i - 1][0], pt[i][1] - pt[i - 1][1]));
    const d = Math.max(0, Math.min(1, u)) * L[L.length - 1];
    let i = 1;
    while (i < pt.length - 1 && L[i] < d) i++;
    const a = (d - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]);
    return [lerp(pt[i - 1][0], pt[i][0], a), lerp(pt[i - 1][1], pt[i][1], a)];
  },
  render(t, kit) {
    t = window.G.tempo('09', 'quaderno', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(QD_CAM, t));
    G.animaPaesaggio(m, t + 420, { treni: true, biglietti: true });
    // Il trenino di Ada: le sbarre si abbassano, le lucine si accendono, e riparte lungo la banchina.
    const s = G.percorso(t, 490, QD_VEL);
    G.posaTreno(this.vag, m.partenza, s);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true });
    G.sbarre(this.vag, i => eio(seg(t, QD_SBARRE[0] + i * 0.15, QD_SBARRE[1] + i * 0.15)));
    const acc = (0.3 + 0.7 * seg(t, QD_SBARRE[0], QD_SBARRE[1])).toFixed(2);
    this.lucine.forEach(l => l.setAttribute('opacity', acc));
    // Ada: guarda il suo parco e quello immenso, sorride, chiude il quaderno, si alza e corre giù.
    const alza = eio(seg(t, QD_ALZA[0], QD_ALZA[1])), uc = seg(t, QD_CORSA[0], QD_CORSA[1]);
    let [x, y] = uc > 0 ? this.lungo(this.discesa, uc) : QD_CIMA;
    y += 46 * (1 - alza) - (uc > 0 && uc < 1 ? 6 * Math.abs(Math.sin(t * 11)) : 0);
    const posa = t < QD_CHIUDE ? 'quaderno' : 'base';
    const espr = t < 4 ? 'felice' : t < 7.5 ? 'pensa' : t < 10.5 ? 'sorpresa' : 'felice';
    const k = posa + espr;
    if (k !== this.stato) {
      this.ada.innerHTML = '<g class="qd-ada-in">' + G.ada(posa, espr) + (posa === 'base' ?
        '<g transform="rotate(-10 140 196)"><rect x="124" y="168" width="34" height="50" rx="4" fill="#2F6F73" stroke="#1E4A4D" stroke-width="2.5"/><rect x="154" y="172" width="4" height="42" fill="' + G.C.crema + '"/></g>' : '') + '</g>';
      this.stato = k;
    }
    this.ada.firstChild.setAttribute('transform', G.posaAda(x, y) + ' rotate(' + (uc > 0 && uc < 1 ? 4 * Math.sin(t * 5.5) : 0).toFixed(2) + ' 100 300)');
    this.prato.setAttribute('opacity', (1 - alza).toFixed(3));
    this.sub(t);
  },
});
