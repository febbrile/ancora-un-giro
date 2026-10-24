const { seg, eo, eio, lerp } = kit;
// Ada sfoglia il quaderno all'indietro, pagina dopo pagina, fino alla prima sera: il disegno della vasca piena di
// paperelle blu e turchesi. In mezzo, piccola piccola, c'è una paperella scura: l'aveva disegnata senza farci caso.
// Ada guarda il disegno, poi la vasca vuota, poi di nuovo il disegno, e si chiede che parola sarà.
// Si apre come finisce «giri», con il treno che riparte e corre via lungo la banchina; finisce su Ada e la vasca vuota
// (la riprende «punto», con il treno che esce).
const QD_CAM = [
  { t: 0, cx: 420, cy: 760, z: 2.0 },
  { t: 0.4, cx: 420, cy: 760, z: 2.0 },
  { t: 2.0, cx: 700, cy: 846, z: 4.2 },
  { t: 11.2, cx: 730, cy: 856, z: 4.6 },
  { t: 14.4, cx: 716, cy: 852, z: 4.4 },
  { t: 22.0, cx: 712, cy: 850, z: 4.0 },
];
// Quando si vede il quaderno da vicino.
// Il treno che riparte: dove si trova e la sua velocità (come alla fine di «giri»).
const QD_TRENO = [804, [[0, 260], [1.6, 420]]];
const QD_PAGINA = [[2.0, 11.3], [14.4, 16.0]];
// Le pagine che si sfogliano all'indietro, sempre più piano, fino alla prima sera.
const QD_FOGLI = [[2.2, 2.9], [3.0, 3.7], [3.8, 4.6], [4.8, 6.0]];
// La camera sul quaderno: la pagina intera, poi sempre più vicino alla paperella scura.
const QD_ZOOM = [
  { t: 0, cx: 960, cy: 520, z: 1 },
  { t: 6.6, cx: 960, cy: 520, z: 1 },
  { t: 10.8, cx: 1360, cy: 720, z: 2.1 },
  { t: 14.4, cx: 1360, cy: 712, z: 2.7 },
  { t: 16.0, cx: 1366, cy: 708, z: 3.0 },
];
kit.scene('quaderno', {
  init(kit) {
    const G = window.G, C = G.C, ps = G.primaSera();
    // Le pagine delle altre sere: schizzi a matita, senza colori e senza scritte.
    const matita = '#3A3570';
    const schizzo = (k, lato) => {
      const r = G.rng(300 + k * 7 + (lato ? 3 : 0)), x0 = lato ? 960 : 176;
      let d = '';
      const tipo = (k + (lato ? 1 : 0)) % 3;
      if (tipo === 0) { // montagne e un binario
        for (let i = 0; i < 2; i++) { const x = x0 + 140 + i * 300 + r() * 60, h = 200 + r() * 160; d += 'M' + x + ' 700 L' + (x + 120) + ' ' + (700 - h) + ' L' + (x + 250) + ' 700 '; }
        d += 'M' + (x0 + 60) + ' 760 L' + (x0 + 720) + ' 760';
      } else if (tipo === 1) { // vagoni in fila
        for (let i = 0; i < 4; i++) { const x = x0 + 80 + i * 160; d += 'M' + x + ' 560 L' + (x + 130) + ' 560 L' + (x + 120) + ' 620 L' + (x + 10) + ' 620 Z M' + (x + 65) + ' 520 m-26 0 a26 26 0 1 0 52 0 a26 26 0 1 0 -52 0 '; }
        d += 'M' + (x0 + 60) + ' 660 L' + (x0 + 720) + ' 660';
      } else { // una vasca e qualche paperella
        d += 'M' + (x0 + 120) + ' 520 L' + (x0 + 660) + ' 520 L' + (x0 + 630) + ' 700 Q' + (x0 + 390) + ' 740 ' + (x0 + 150) + ' 700 Z';
        for (let i = 0; i < 5; i++) { const x = x0 + 190 + i * 100 + r() * 20; d += 'M' + x + ' 590 q10 -26 30 -10 q22 -10 26 14 q-24 18 -56 -4 '; }
      }
      return '<rect x="' + x0 + '" y="86" width="784" height="828" rx="12" fill="' + C.crema + '"/><path d="' + d + '" stroke="' + matita + '" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".75"/>';
    };
    const N = QD_FOGLI.length;
    const meta = (k, lato) => k === N ? (lato ? ps.destra : ps.sinistra) : schizzo(k, lato);
    const ombra = x => '<rect class="qd-ombra" x="' + x + '" y="86" width="784" height="828" fill="#000000" opacity="0"/>';
    let sin = '', des = '';
    for (let k = N; k >= 0; k--) sin += '<g class="qd-sin" data-k="' + k + '">' + meta(k, 0) + ombra(176) + '</g>';
    for (let k = 0; k <= N; k++) des += '<g class="qd-des" data-k="' + k + '">' + meta(k, 1) + ombra(960) + '</g>';
    const quaderno = '<g class="qd-quad" opacity="0"><g class="qd-pagine">' + ps.copertina + sin + des + ps.costa + '</g></g>';
    const A = G.MOD.mare.passeggeri, P = G.MOD.finisce.passeggeri;
    const treno = [{ tipo: 'al', col: A.Al.biglietto }, { tipo: 'mare', col: A.mare.biglietto }, { tipo: 'emma', col: A.Emma.biglietto }]
      .concat(['nuota', 'e', 'gioca'].map(w => ({ tipo: 'paperella', col: P[w].biglietto })));
    const sopra = '<g transform="' + G.posa(G.MONDO.spezzaparole[0], G.MONDO.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="qd-treno">' + G.treno(treno, { sbarra: 1 }) + '</g><g class="qd-ada"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'quaderno', manopola: 0, banchina: true, morto: true, davanti: quaderno,
      html: G.sottotitolo('NARRATORE', 'C’era già la prima sera. Una sola, in fondo alla vasca. Nessuno l’ha mai pescata.') +
        G.sottotitolo('ADA', 'Che parola sarà?'),
    });
    this.G = G;
    this.vag = this.m.qa('.qd-treno .g-vag');
    this.ada = this.m.q('.qd-ada'); this.quad = this.m.q('.qd-quad'); this.pagine = this.m.q('.qd-pagine');
    const per = (sel) => { const o = []; this.m.qa(sel).forEach(el => { o[+el.dataset.k] = { el, ombra: el.querySelector('.qd-ombra') }; }); return o; };
    this.sin = per('.qd-sin'); this.des = per('.qd-des');
    this.stato = '';
    this.sub = G.subs(kit, [[6.4, 13.6], [16.4, 19.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('07', 'quaderno', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(QD_CAM, t));
    G.animaMondo(m, t + 980);
    // Il treno, ripartito alla fine di «giri», sale e sparisce nella montagna.
    const s = G.percorso(t, QD_TRENO[0], QD_TRENO[1]);
    G.posaTreno(this.vag, m.partenza, s);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true });
    // Ada col quaderno: lo apre e sfoglia; poi guarda la vasca vuota, e pensa.
    const espr = t < 1.4 ? 'base' : t < 11.2 ? 'base' : 'pensa';
    const sporge = eio(seg(t, 11.4, 12.4)) * (1 - eio(seg(t, 13.8, 14.4)));
    const k = espr + sporge.toFixed(2);
    if (k !== this.stato) {
      this.ada.innerHTML = '<g transform="rotate(' + (7 * sporge).toFixed(2) + ' 672 896)"><g transform="' + G.posaAda(672, 896) + '">' + G.ada('quaderno', espr) + '</g></g>';
      this.stato = k;
    }
    // Il quaderno da vicino.
    const vis = Math.max(...QD_PAGINA.map(([a, b]) => seg(t, a - 0.15, a) * (1 - seg(t, b - 0.15, b))));
    this.quad.setAttribute('opacity', vis.toFixed(3));
    this.pagine.setAttribute('transform', G.camChiavi(QD_ZOOM, t));
    // Le pagine: dove siamo (k) e quanto è girato il foglio che si sta sfogliando (p).
    const N = QD_FOGLI.length;
    let kk = 0, p = -1;
    QD_FOGLI.forEach(([a, b], i) => { if (t >= a) { kk = i; p = eio(seg(t, a, b)); } });
    if (t >= QD_FOGLI[N - 1][1]) { kk = N; p = -1; }
    if (p >= 1) { kk += 1; p = -1; }
    const mostra = (o, vis, c) => {
      o.el.setAttribute('opacity', vis ? 1 : 0);
      o.el.setAttribute('transform', c === undefined ? '' : 'translate(960 0) scale(' + Math.max(0.001, c).toFixed(4) + ' 1) translate(-960 0)');
      o.ombra.setAttribute('opacity', c === undefined ? 0 : (0.3 * (1 - c)).toFixed(3));
    };
    this.sin.forEach((o, i) => mostra(o, false));
    this.des.forEach((o, i) => mostra(o, false));
    if (p < 0) { mostra(this.sin[kk], true); mostra(this.des[kk], true); }
    else {
      // Il foglio si alza da sinistra e si posa a destra: sotto c'è la sera prima.
      mostra(this.sin[kk + 1], true); mostra(this.des[kk], true);
      if (p < 0.5) mostra(this.sin[kk], true, Math.cos(Math.PI * p));
      else mostra(this.des[kk + 1], true, -Math.cos(Math.PI * p));
    }
    this.sub(t);
  },
});
