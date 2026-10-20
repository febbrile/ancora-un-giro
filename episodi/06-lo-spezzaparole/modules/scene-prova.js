const { seg, eo, ei, eio, lerp } = kit;
// Ada fa una prova, tutta fuori dalla montagna. Scrive «gelato» sul foglio e lo infila nello Spezzaparole: zac, un
// biglietto solo. Poi prende un foglio lunghissimo, ci scrive tutta d'un fiato «precipitevolissimevolmente», e il foglio
// le si srotola fino ai piedi. Zac, zac, zac, zac, zac, zac: i biglietti escono a cascata e le si ammucchiano sulle scarpe.
// Ada ride, li mette in fila sulla banchina: due sono identici, i bordi combaciano e la parola torna intera. Disegna
// sul quaderno, senza scritte, un biglietto solo per una parola e tanti per l'altra; si infila i biglietti in tasca
// (su questi non sale nessuno) e corre alla bancarella della pesca.
// Si apre come finisce «partenza»; finisce con Ada alla bancarella (fuori dalla montagna; «fili» va dentro).
const PV_CAM = [
  { t: 0, cx: 556, cy: 790, z: 4.0 },
  { t: 3.0, cx: 556, cy: 790, z: 4.0 },
  { t: 4.0, cx: 560, cy: 792, z: 4.4 },
  { t: 5.2, cx: 560, cy: 792, z: 4.4 },
  { t: 6.2, cx: 530, cy: 800, z: 4.6 },
  { t: 12.0, cx: 520, cy: 804, z: 4.6 },
  { t: 13.4, cx: 548, cy: 798, z: 4.2 },
  { t: 17.8, cx: 548, cy: 798, z: 4.2 },
  { t: 19.0, cx: 410, cy: 808, z: 5.2 },
  { t: 28.8, cx: 410, cy: 808, z: 5.2 },
  { t: 29.6, cx: 470, cy: 812, z: 4.4 },
  { t: 32.0, cx: 620, cy: 840, z: 3.4 },
];
const PV_GELATO = 'gelato', PV_LUNGA = 'precipitevolissimevolmente';
// I tagli dello Spezzaparole (dal modellino): «gelato» intero, l'altra in sei pezzi.
const PV_FOGLI = [[0.8, 3.4], [7.2, 11.8]];
const PV_SCRIVE = [1.3, 7.9];
const PV_VIA = 3.0, PV_ZAC_G = 4.5;
const PV_SROTOLA = [11.9, 12.9], PV_INFILA = [13.2, 13.8], PV_MANGIA = [13.9, 16.8];
const PV_ZAC = [14.2, 14.65, 15.1, 15.55, 16.0, 16.45];
const PV_RIDE = [16.8, 18.4];
const PV_FILA = 18.8, PV_GEMELLI = [21.8, 22.6], PV_COMBACIA = [22.8, 23.6];
const PV_QUADERNO = [24.4, 28.6];
const PV_TASCA = [28.8, 29.6];
const PV_CORSA = [29.8, 32.0];
const PV_SC = 0.2;
function pvBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
const pvBolla = (t, a, b) => Math.sin(Math.PI * seg(t, a, b));
kit.scene('prova', {
  init(kit) {
    const G = window.G, M = G.MONDO, C = G.C, Z = G.MOD.zampiru;
    this.pezzi = Z.tagli[PV_LUNGA];
    const strappo = k => k === 0 ? 'd' : k === this.pezzi.length - 1 ? 's' : 'sd';
    // I biglietti della prova: prima «gelato», poi i sei pezzi della parola lunga.
    const tutti = [[Z.tagli[PV_GELATO][0], '']].concat(this.pezzi.map((p, k) => [p, strappo(k)]));
    const big = tutti.map(([p, s]) => '<g class="pv-big" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(p, { strappo: s }) + '</g></g>').join('');
    const bagliori = [2, 4].map(k => '<ellipse class="pv-gemello" rx="20" ry="14" fill="' + C.luce + '" opacity="0" filter="url(#g-soft)"/>').join('');
    const sopra = '<g class="pv-macchina"></g><g class="pv-ada"></g>' +
      '<clipPath id="g-pv-fessura"><rect x="0" y="-1000" width="1920" height="1754"/></clipPath>' +
      '<g clip-path="url(#g-pv-fessura)"><g class="pv-striscia" opacity="0"><g transform="translate(-100 -22)">' + G.striscia(PV_GELATO, 200) + '</g></g></g>' +
      '<g class="pv-nastro" opacity="0"><path class="pv-n1" fill="none" stroke="' + C.cremaScura + '" stroke-width="7" stroke-linecap="round" pathLength="100"/>' +
      '<path class="pv-n2" fill="none" stroke="' + C.crema + '" stroke-width="4.6" stroke-linecap="round" pathLength="100"/></g>' +
      bagliori + big +
      '<ellipse class="pv-lucciola" cy="830" rx="7" ry="11" fill="#FFF6DA" opacity="0" filter="url(#g-glow)"/>';
    // Il foglio da vicino: Ada scrive (la matita alla fine della scritta).
    const matita = '<g class="pv-matita"><g transform="rotate(35)"><rect x="-9" y="-150" width="18" height="130" rx="3" fill="' + C.oro + '"/>' +
      '<rect x="-9" y="-160" width="18" height="16" rx="3" fill="#E58FA0"/><path d="M-9 -20 L9 -20 L0 6 Z" fill="#F3D9B5"/><path d="M-3 -2 L3 -2 L0 6 Z" fill="#3A2418"/></g></g>';
    const foglio = '<g class="pv-foglio" opacity="0"><rect x="-200" y="-200" width="2320" height="1480" fill="#07060F" opacity=".82"/>' +
      '<g class="pv-carta"><path class="pv-carta-p" fill="' + C.crema + '" stroke="' + C.cremaScura + '" stroke-width="6"/>' +
      '<text class="pv-scritta" x="0" y="560" font-family="Fredoka, sans-serif" font-weight="600" font-size="150" fill="' + C.inchiostro + '"></text>' + matita + '</g></g>';
    // Il quaderno da vicino: un biglietto solo per una parola, tanti biglietti per l'altra. Niente scritte.
    const tratto = (d, k) => '<path class="pv-tratto" data-k="' + k + '" d="' + d + '" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>';
    const bigl = (x, y, w, h) => 'M' + (x + 10) + ' ' + y + ' L' + (x + w - 10) + ' ' + y + ' Q' + (x + w) + ' ' + y + ' ' + (x + w) + ' ' + (y + 10) + ' L' + (x + w) + ' ' + (y + h - 10) + ' Q' + (x + w) + ' ' + (y + h) + ' ' + (x + w - 10) + ' ' + (y + h) + ' L' + (x + 10) + ' ' + (y + h) + ' Q' + x + ' ' + (y + h) + ' ' + x + ' ' + (y + h - 10) + ' L' + x + ' ' + (y + 10) + ' Q' + x + ' ' + y + ' ' + (x + 10) + ' ' + y + ' Z';
    const zig = (x, y, h) => { let d = 'M' + x + ' ' + y; for (let i = 1; i <= 8; i++) d += ' L' + (x + (i % 2 ? 9 : -9)) + ' ' + (y + i * h / 8); return d; };
    let disegni = tratto(bigl(330, 420, 380, 170), 0) + tratto('M396 450 L396 560', 0.3);
    const w6 = 116;
    disegni += tratto(bigl(1040, 440, 6 * w6, 130), 1);
    for (let k = 1; k < 6; k++) disegni += tratto(zig(1040 + k * w6, 440, 130), 1 + k * 0.12);
    const quaderno = '<g class="pv-quaderno" opacity="0"><rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<rect x="150" y="160" width="1620" height="760" rx="26" fill="#2F6F73"/><rect x="176" y="186" width="1568" height="708" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 186 L960 894" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g class="pv-disegni" stroke="#3A3570" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' + disegni + '</g>' +
      '<g class="pv-matita-q"><g transform="rotate(35)"><rect x="-9" y="-150" width="18" height="130" rx="3" fill="' + C.oro + '"/><rect x="-9" y="-160" width="18" height="16" rx="3" fill="#E58FA0"/><path d="M-9 -20 L9 -20 L0 6 Z" fill="#F3D9B5"/><path d="M-3 -2 L3 -2 L0 6 Z" fill="#3A2418"/></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'prova', manopola: 0, banchina: true, morto: true, davanti: foglio + quaderno,
      html: G.sottotitolo('NARRATORE', 'Ada fa una prova. Gelato: zac, un biglietto solo.') +
        G.sottotitolo('ADA', 'E adesso la parola più lunga che conosco!') +
        G.sottotitolo('NARRATORE', 'Le parole che passano tutti i giorni hanno un biglietto intero. Le altre, lo Spezzaparole le taglia nei pezzi che ha.'),
    });
    this.G = G;
    const q = this.m.q, qa = this.m.qa;
    this.ada = q('.pv-ada'); this.mac = q('.pv-macchina'); this.str = q('.pv-striscia');
    this.nastro = q('.pv-nastro'); this.n = [q('.pv-n1'), q('.pv-n2')];
    this.big = qa('.pv-big'); this.gemelli = qa('.pv-gemello'); this.lucciola = q('.pv-lucciola');
    this.foglio = q('.pv-foglio'); this.carta = q('.pv-carta'); this.cartaP = q('.pv-carta-p'); this.scritta = q('.pv-scritta'); this.matita = q('.pv-matita');
    this.quaderno = q('.pv-quaderno'); this.tratti = qa('.pv-tratto'); this.matitaQ = q('.pv-matita-q');
    this.typ = [kit.typist(PV_GELATO, PV_SCRIVE[0], 4.2, 3), kit.typist(PV_LUNGA, PV_SCRIVE[1], 9.5, 4)];
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    this.fessura = [x0 + 100 * s, y0 + 60 * s]; this.bocca = [x0 + 100 * s, y0 + 213 * s];
    // Dove cadono i biglietti: «gelato» accanto ad Ada, i sei pezzi ammucchiati sulle sue scarpe.
    const r = G.rng(61);
    this.mucchio = this.pezzi.map((p, k) => [503 + k * 6 + r() * 6, 832 - (k % 3) * 3.5 - r() * 2, (r() - 0.5) * 70]);
    // La fila sulla banchina: «gelato» da solo, poi i sei pezzi.
    this.fila = (k, stretta) => k === 0 ? [296, 830] : [342 + (k - 1) * (120 * PV_SC + 5 * (1 - stretta)), 830];
    this.statoAda = ''; this.statoMac = ''; this.statoTesto = '';
    this.sub = G.subs(kit, [[1.0, 6.6], [7.6, 11.4], [19.4, 29.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('06', 'prova', t);
    const G = this.G, M = G.MONDO, C = G.C, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PV_CAM, t));
    G.animaMondo(m, t + 690);
    // Ada.
    let posa, espr, testo = '';
    if (t < PV_VIA) { posa = 'striscia'; testo = t > 2.2 ? PV_GELATO : ''; espr = t < 0.8 ? 'felice' : 'pensa'; }
    else if (t < PV_FOGLI[1][0] + 0.4) { posa = 'base'; espr = t < PV_ZAC_G + 0.5 ? 'base' : 'felice'; }
    else if (t < PV_INFILA[0]) { posa = 'striscia'; espr = t < PV_SROTOLA[0] ? 'pensa' : 'felice'; }
    else if (t < PV_QUADERNO[0]) { posa = 'base'; espr = t < PV_ZAC[0] ? 'felice' : t < PV_RIDE[0] ? 'sorpresa' : t < 20.2 ? 'felice' : 'base'; }
    else if (t < PV_QUADERNO[1]) { posa = 'disegna'; espr = 'pensa'; }
    else { posa = 'quaderno'; espr = 'felice'; }
    const ka = posa + espr + testo;
    if (ka !== this.statoAda) { this.ada.innerHTML = '<g class="pv-ada-in">' + G.ada(posa, espr, { testo }) + '</g>'; this.statoAda = ka; }
    // Annuisce dopo «gelato», ride dopo la cascata; poi corre alla bancarella, saltellando.
    const annuisce = 2.2 * (pvBolla(t, 5.4, 5.8) + pvBolla(t, 5.9, 6.3));
    const ride = Math.abs(Math.sin(t * 16)) * 2.4 * seg(t, PV_RIDE[0], PV_RIDE[0] + 0.2) * (1 - seg(t, PV_RIDE[1] - 0.2, PV_RIDE[1]));
    const uc = eio(seg(t, PV_CORSA[0], PV_CORSA[1]));
    const ax = lerp(M.ada[0], 672, uc), ay = lerp(M.ada[1], 896, uc) - (uc > 0 && uc < 1 ? 6 * Math.abs(Math.sin(t * 9)) : 0);
    this.ada.firstChild.setAttribute('transform', 'translate(0 ' + (annuisce + ride).toFixed(2) + ') ' + G.posaAda(ax, ay));
    // La striscia di «gelato» sale alla fessura e sparisce dentro.
    const [fx, fy] = this.fessura;
    {
      const su = eio(seg(t, PV_VIA, PV_VIA + 0.7)), giu = eio(seg(t, PV_VIA + 0.9, PV_VIA + 1.4));
      const x = lerp(M.ada[0], fx, su), y = lerp(808, fy - 22, su) + 26 * giu, rot = lerp(0, 90, eio(seg(t, PV_VIA + 0.2, PV_VIA + 0.6)));
      this.str.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + rot.toFixed(1) + ') scale(0.123)');
      this.str.setAttribute('opacity', t >= PV_VIA && t < PV_VIA + 1.5 ? 1 : 0);
    }
    // Il foglio lungo: si srotola dalle mani fino ai piedi, poi lo Spezzaparole se lo mangia.
    {
      const A = [[504, 812], [498, 822], [494, 830], [490, 835], [412, 836]];
      const B = [[fx, fy - 2], [fx, fy + 38], [530, 806], [495, 835], [412, 836]];
      const v = eio(seg(t, PV_INFILA[0], PV_INFILA[1]));
      const P = A.map((a, i) => [lerp(a[0], B[i][0], v), lerp(a[1], B[i][1], v)]);
      const d = 'M' + P[0].join(' ') + ' C' + P[1].join(' ') + ' ' + P[2].join(' ') + ' ' + P[3].join(' ') + ' L' + P[4].join(' ');
      const f = 100 * eio(seg(t, PV_SROTOLA[0], PV_SROTOLA[1])) * (1 - seg(t, PV_MANGIA[0], PV_MANGIA[1]));
      this.n.forEach(p => { p.setAttribute('d', d); p.setAttribute('stroke-dasharray', f.toFixed(2) + ' 300'); });
      this.nastro.setAttribute('opacity', t >= PV_SROTOLA[0] && t < PV_MANGIA[1] ? 1 : 0);
    }
    // La biglietteria lavora: una volta per «gelato», sei volte di fila per la parola lunga.
    const tagli = [PV_ZAC_G].concat(PV_ZAC);
    const lavora = Math.max(seg(t, 3.8, 4.0) * (1 - seg(t, 5.0, 5.3)), seg(t, 13.6, 13.8) * (1 - seg(t, 16.9, 17.2)));
    let forbice = 0.6;
    tagli.forEach(a => { forbice = Math.min(forbice, Math.min(0.6, 0.6 * Math.abs((t - a) / 0.12))); });
    const bocca = Math.max(0, ...tagli.map(a => 1 - Math.abs(t - a - 0.25) / 0.25));
    const trema = lavora * 1.4 * Math.sin(t * 40), aghi = lavora * 80 * Math.sin(t * 6);
    const km = forbice.toFixed(2) + '|' + Math.round(aghi) + '|' + bocca.toFixed(2);
    const tr = 'translate(' + trema.toFixed(2) + ' 0) ' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300);
    if (km !== this.statoMac) { this.mac.innerHTML = '<g transform="' + tr + '">' + G.spezzaparole({ forbice, aghi, bocca }) + '</g>'; this.statoMac = km; }
    else if (this.mac.firstChild) this.mac.firstChild.setAttribute('transform', tr);
    // I biglietti: escono dalla bocca, cadono, si mettono in fila, combaciano, finiscono in tasca.
    const [bx, by] = this.bocca;
    const stretta = eio(seg(t, PV_COMBACIA[0], PV_COMBACIA[1]));
    const tasca = [ax + 6, ay - 12];
    this.big.forEach((el, k) => {
      const esce = tagli[k] + 0.25;
      const caduta = k === 0 ? [470, 830, -6] : this.mucchio[k - 1];
      const u = seg(t, esce, esce + 0.7);
      let x = lerp(bx, caduta[0], u), y = lerp(by, caduta[1], ei(u)) - (k === 0 ? 34 : 18) * Math.sin(Math.PI * u), rot = caduta[2] * u, sc = PV_SC;
      // In fila: uno dopo l'altro, con un saltello («gelato» per ultimo).
      const tf = k === 0 ? PV_FILA + 2.4 : PV_FILA + 0.4 * (k - 1);
      const uf = eio(seg(t, tf, tf + 0.6));
      const [fx2, fy2] = this.fila(k, stretta);
      x = lerp(x, fx2, uf); y = lerp(y, fy2, uf) - 16 * Math.sin(Math.PI * uf); rot = lerp(rot, 0, uf);
      // I due pezzi uguali brillano e saltano insieme.
      if (k === 3 || k === 5) y -= 5 * pvBolla(t, PV_GEMELLI[0], PV_GEMELLI[1]);
      // In tasca.
      const ut = ei(seg(t, PV_TASCA[0] + 0.06 * k, PV_TASCA[1] + 0.06 * k));
      x = lerp(x, tasca[0], ut); y = lerp(y, tasca[1], ut) - 10 * Math.sin(Math.PI * ut); sc *= 1 - 0.8 * ut;
      el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + rot.toFixed(1) + ') scale(' + sc.toFixed(3) + ')');
      el.setAttribute('opacity', t < esce ? 0 : (1 - seg(ut, 0.8, 1)).toFixed(3));
    });
    this.gemelli.forEach((g, j) => {
      const [gx, gy] = this.fila(j ? 5 : 3, stretta);
      g.setAttribute('cx', gx); g.setAttribute('cy', gy - 2);
      g.setAttribute('opacity', (0.9 * pvBolla(t, PV_GEMELLI[0] - 0.2, PV_GEMELLI[1] + 0.4)).toFixed(3));
    });
    // La parola torna intera: un lampo di luce corre lungo la fila.
    const ul = seg(t, PV_COMBACIA[1], PV_COMBACIA[1] + 0.8);
    this.lucciola.setAttribute('opacity', (ul > 0 && ul < 1 ? Math.sin(Math.PI * ul) : 0).toFixed(3));
    this.lucciola.setAttribute('cx', lerp(334, 470, ul).toFixed(1));
    // Il foglio da vicino: la scritta cresce lettera per lettera, la matita la segue.
    const fg = Math.max(...PV_FOGLI.map(([a, b]) => seg(t, a, a + 0.4) * (1 - seg(t, b - 0.4, b))));
    this.foglio.setAttribute('opacity', fg.toFixed(3));
    if (fg > 0) {
      const n = t < PV_FOGLI[1][0] ? 0 : 1, typ = this.typ[n], scritto = typ.at(t);
      const cw = 150 * 0.56, x0 = n ? 260 : 700, w = n ? PV_LUNGA.length * cw + 220 : 560;
      const fine = x0 + scritto.length * cw;
      const sposta = n ? Math.max(0, fine - 1300) : 0;
      if (scritto !== this.statoTesto) { this.scritta.textContent = scritto; this.statoTesto = scritto; }
      this.scritta.setAttribute('x', x0);
      this.cartaP.setAttribute('d', 'M' + (x0 - 80) + ' 430 L' + (x0 - 80 + w) + ' 420 L' + (x0 - 100 + w) + ' 520 L' + (x0 - 80 + w) + ' 620 L' + (x0 - 80) + ' 610 L' + (x0 - 60) + ' 520 Z');
      this.carta.setAttribute('transform', 'translate(' + (-sposta).toFixed(1) + ' 0)');
      const scrive = typ.count(t) < typ.text.length && t > typ.times[0] - 0.4;
      const mx = fine + 10, my = 560 - (scrive ? 30 + 24 * Math.abs(Math.sin(t * 14)) : 60);
      this.matita.setAttribute('transform', 'translate(' + mx.toFixed(1) + ' ' + my.toFixed(1) + ')');
    }
    // Il quaderno da vicino: i disegni compaiono tratto dopo tratto.
    const qd = seg(t, PV_QUADERNO[0], PV_QUADERNO[0] + 0.4) * (1 - seg(t, PV_QUADERNO[1] - 0.4, PV_QUADERNO[1]));
    this.quaderno.setAttribute('opacity', qd.toFixed(3));
    if (qd > 0) {
      let px = 330, py = 420;
      this.tratti.forEach(p => {
        const k = +p.dataset.k, a = PV_QUADERNO[0] + 0.5 + k * 1.3, u = eio(seg(t, a, a + 0.9));
        p.setAttribute('stroke-dashoffset', (1 - u).toFixed(3));
        if (u > 0 && u < 1) { const L = p.getTotalLength(), pt = p.getPointAtLength(u * L); px = pt.x; py = pt.y; }
        else if (u >= 1 && k >= 1) { px = 1040 + 6 * 116; py = 570; }
      });
      this.matitaQ.setAttribute('transform', 'translate(' + px.toFixed(1) + ' ' + py.toFixed(1) + ')');
    }
    this.sub(t);
  },
});
