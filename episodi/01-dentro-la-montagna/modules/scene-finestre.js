const { seg, eo, eio, lerp } = kit;
// Le finestre sulla vasca. Il treno rallenta davanti a una finestra nella parete: dietro c'è l'acqua della vasca.
// Passano Al e Mare, e l'acqua resta vuota; passa Emma, l'ultimo vagone, e nell'acqua si accendono paperelle di luce,
// di tutti i colori. Il giro continua (fili e scambi, due volte): a ogni finestra le paperelle somigliano di più
// al vestito di Emma, e le nuotano incontro. All'ultima finestra sono quasi tutte blu. In fondo, la luce dell'uscita.
// Si apre come finisce «scambi» (il treno nel fascio); finisce nella luce (la riprende «uscita»).
// Il treno va verso sinistra: la parete, le finestre e gli scambi scorrono verso destra.
// Davanti a ogni finestra il treno rallenta fin quasi a fermarsi, come le giostre davanti a qualcosa da guardare.
const FN_VEL = [[0, 260], [2, 200], [8.4, 200], [9.4, 40], [13.9, 40], [15.4, 300], [21, 300], [22.5, 200], [25, 200], [26, 40],
  [30.5, 40], [32, 300], [35.5, 300], [36.5, 200], [39.6, 200], [40.6, 30], [46, 30], [47.4, 320]];
// Quando l'ultimo vagone, Emma, passa sotto il centro di ogni finestra.
const FN_EMMA = [9.4, 26.0, 40.6];
const FN_CAM = [
  { t: 0, cx: 960, cy: 560, z: 1 },
  { t: 39.0, cx: 960, cy: 560, z: 1 },
  { t: 41.0, cx: 1190, cy: 390, z: 1.45 },
  { t: 45.8, cx: 1190, cy: 390, z: 1.45 },
  { t: 48.0, cx: 960, cy: 560, z: 1 },
];
// I tratti 2 e 3: quando si accendono i fili, e gli scambi di Al, Mare, Emma (con le corsie).
const FN_TRATTI = [
  { fili: 16.4, scambi: [{ t: 19.0, da: 3, a: 2 }, { t: 19.3, da: 1, a: 0 }, { t: 19.6, da: 1, a: 0 }] },
  { fili: 32.0, scambi: [{ t: 34.6, da: 2, a: 3 }, { t: 34.9, da: 0, a: 1 }, { t: 35.2, da: 0, a: 1 }] },
];
const FN_LUCE = [46.4, 50.4];
kit.scene('finestre', {
  init(kit) {
    const G = window.G, P = G.MOD.mare.passeggeri, C = G.C, I = G.INTERNO;
    this.chi = [['al', P.Al], ['mare', P.mare], ['emma', P.Emma]];
    const finestre = FN_EMMA.map((_, k) => '<g class="fn-finestra" data-k="' + k + '">' + G.finestra('fn' + k) + '</g>').join('');
    const scambi = FN_TRATTI.map((tr, n) => tr.scambi.map((s, i) => {
      const yd = I.corsie[s.da], ya = I.corsie[s.a];
      return '<g class="fn-scambio" data-n="' + n + '" data-i="' + i + '"><path d="M0 ' + ya + ' C60 ' + ya + ' 80 ' + yd + ' 160 ' + yd + '" stroke="' + C.acciaio + '" stroke-width="5" fill="none"/>' +
        '<g transform="translate(150 ' + (Math.max(yd, ya) + 46) + ')"><rect x="-4" y="-34" width="8" height="40" fill="' + C.acciaioScuro + '"/><g class="fn-disco"><circle cy="-40" r="14" fill="' + C.rosso + '" stroke="' + C.crema + '" stroke-width="3"/><rect x="-12" y="-43" width="24" height="6" fill="' + C.crema + '"/></g></g></g>';
    }).join('')).join('');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + G.interniDefs +
      '<defs><radialGradient id="g-uscita" cx="0" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="fn-cam">' + G.interno(this.chi.map(c => ({ tipo: c[0], col: c[1].tratti[0] })), { corsie: I.corsie, finestre }) + '</g>' +
      '<rect class="fn-luce" x="-200" y="-200" width="2400" height="1480" fill="url(#g-uscita)" opacity="0"/></svg>' +
      G.sottotitolo('NARRATORE', 'Ogni tanto la montagna ha una finestra sulla vasca.') +
      G.sottotitolo('NARRATORE', 'Passa Al, passa Mare: l’acqua resta vuota.') +
      G.sottotitolo('NARRATORE', 'Passa Emma, e nell’acqua si accendono paperelle di luce, di tutti i colori.') +
      G.sottotitolo('NARRATORE', 'E il giro continua: fili di luce, scambi, fili di luce, scambi.') +
      G.sottotitolo('NARRATORE', 'A ogni finestra, le paperelle somigliano un po’ di più al vestito di Emma.') +
      G.sottotitolo('NARRATORE', 'All’ultima finestra sono quasi tutte blu, come Emma.') +
      '</div>', 'finestre')));
    this.G = G;
    const q = s => kit.stage.querySelector(s);
    this.cam = q('.fn-cam'); this.luce = q('.fn-luce');
    q('.g-int-binari').insertAdjacentHTML('beforeend', scambi);
    this.vag = [...kit.stage.querySelectorAll('.g-vag')];
    this.basi = this.vag.map(v => v.getAttribute('transform'));
    this.fin = [...kit.stage.querySelectorAll('.fn-finestra')];
    this.scambi = [...kit.stage.querySelectorAll('.fn-scambio')];
    this.d = t => G.percorso(t, 0, FN_VEL);
    this.dEmma = FN_EMMA.map(this.d);
    // Le paperelle di luce di ogni finestra (dal modellino: la vasca che si avrebbe dopo ogni tratto).
    // Quanto somigliano a Emma decide quanto le nuotano incontro.
    const rgb = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
    const dist = (a, b) => { const x = rgb(a), y = rgb(b); return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]); };
    this.papere = this.fin.map((f, k) => {
      const lista = G.papereFinestra(P.Emma.finestre[k], 11 + k), emma = P.Emma.tratti[k];
      f.querySelector('.g-fin-papere').innerHTML = lista.map(p => '<g class="fn-pap"><g transform="translate(-50 -84)">' + G.paperellaDiLuce(p.col) + '</g></g>').join('');
      const els = [...f.querySelectorAll('.fn-pap')];
      return lista.map((p, i) => ({ ...p, el: els[i], sim: Math.max(0, 1 - dist(p.col, emma) / 170) }));
    });
    // Le corsie di ogni vagone, all'inizio (alla fine di «scambi»: Al in 3, Mare in 1, Emma in 1).
    const corsia0 = [3, 1, 1];
    // I fili di ogni tratto: Emma verso Al, Mare e sé; Mare verso Al e sé; Al verso sé.
    const tipi = ['al', 'mare', 'emma'];
    let fili = '';
    this.fili = [];
    FN_TRATTI.forEach((tr, n) => {
      const corsie = n === 0 ? corsia0 : tr.scambi.map(s => s.da);
      const dy = corsie.map(c => I.corsie[c] - I.ruote);
      const pesiEmma = P.Emma.fili_tratti[n + 1];
      const pesi = [[0, 0, P.Al.fili.Al], [1, 0, P.mare.fili.Al], [1, 1, P.mare.fili.mare], [2, 0, pesiEmma.Al], [2, 1, pesiEmma.mare], [2, 2, pesiEmma.Emma]];
      pesi.forEach(([i, j, w]) => {
        let d;
        if (i === j) d = G.anello(i, tipi[i], dy[i]);
        else { const a = G.cima(i, tipi[i], dy[i]), b = G.cima(j, tipi[j], dy[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 80 - 0.12 * Math.abs(a[0] - b[0]); d = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
        const ww = i === j ? 0.45 * w : w;
        fili += '<path class="fn-filo" data-n="' + n + '" d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + 10 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>';
        this.fili.push({ n, w });
      });
    });
    q('.g-int-fili').innerHTML = fili;
    this.filiEl = [...kit.stage.querySelectorAll('.fn-filo')];
    this.sub = G.subs(kit, [[0.6, 5.0], [5.4, 9.0], [9.6, 16.0], [16.2, 21.6], [24.0, 30.6], [41.2, 45.8]]);
  },
  render(t, kit) {
    t = window.G.tempo('01', 'finestre', t);
    const G = this.G, I = G.INTERNO;
    this.cam.setAttribute('transform', G.camChiavi(FN_CAM, t));
    const d = this.d(t);
    G.scorriInterno(kit, d);
    // Le finestre scorrono con la parete: la finestra k ha il centro sopra Emma (x = 1190) quando t = FN_EMMA[k].
    const S = 1.6, emmaX = I.centri[2];
    this.fin.forEach((f, k) => {
      const x = emmaX + d - this.dEmma[k];
      f.setAttribute('transform', 'translate(' + (x - 180 * S).toFixed(1) + ' 36) scale(' + S + ')');
      f.setAttribute('opacity', x < -500 || x > 2500 ? 0 : 1);
      if (x < -500 || x > 2500) return;
      // Dove passa Emma, nelle coordinate della finestra.
      const ex = (emmaX - (x - 180 * S)) / S;
      this.papere[k].forEach(p => {
        const t0 = FN_EMMA[k] - 0.7 + p.quando * 1.4, u = seg(t, t0, t0 + 0.4);
        if (u <= 0) { p.el.setAttribute('opacity', 0); return; }
        // Le paperelle che somigliano a Emma le nuotano incontro: verso il basso e verso di lei.
        const v = eio(seg(t, t0 + 0.3, t0 + 2.6)) * p.sim;
        const px = p.x + Math.max(-60, Math.min(60, (ex - p.x) * 0.3)) * v, py = Math.min(204, p.y + 18 * v);
        const sc = 0.34 * (0.4 + 0.6 * eo(u)) * (1 + 0.12 * v);
        p.el.setAttribute('opacity', Math.min(1, u * 2).toFixed(3));
        p.el.setAttribute('transform', 'translate(' + px.toFixed(1) + ' ' + (py + 1.5 * Math.sin(t * 2.4 + p.x)).toFixed(1) + ') scale(' + sc.toFixed(3) + ')');
      });
    });
    // I vagoni: in quale corsia sono, e di che colore, tratto dopo tratto.
    this.vag.forEach((v, i) => {
      const corsia = [3, 1, 1][i];
      let col = this.chi[i][1].tratti[0], dy = I.corsie[corsia] - I.ruote;
      FN_TRATTI.forEach((tr, n) => {
        const s = tr.scambi[i], p = eio(seg(t, s.t - 0.25, s.t + 0.3));
        if (t >= s.t - 0.25) dy = lerp(I.corsie[s.da], I.corsie[s.a], p) - I.ruote;
        const c = Math.round(eio(seg(t, s.t, s.t + 1.4)) * 12) / 12;
        if (t >= s.t) col = G.mix(this.chi[i][1].tratti[n], this.chi[i][1].tratti[n + 1], c);
      });
      v.setAttribute('transform', 'translate(0 ' + (dy + 2 * Math.sin(t * 5 + i * 1.3)).toFixed(2) + ') ' + this.basi[i]);
      G.cambiaPasseggero(v, this.chi[i][0], col);
    });
    // Gli scambi scorrono con i binari; le leve scattano da sole.
    this.scambi.forEach(g => {
      const n = +g.dataset.n, i = +g.dataset.i, s = FN_TRATTI[n].scambi[i];
      const x = I.centri[i] - 80 + d - this.d(s.t);
      g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' 0)');
      g.setAttribute('opacity', x < -300 || x > 2200 ? 0 : 1);
      g.querySelector('.fn-disco').setAttribute('transform', 'rotate(' + (90 * eio(seg(t, s.t - 0.45, s.t - 0.25))).toFixed(1) + ' 0 -40)');
    });
    // I fili, veloci: si accendono e si spengono a ogni tratto.
    this.filiEl.forEach((el, k) => {
      const f = this.fili[k], t0 = FN_TRATTI[f.n].fili;
      const a = eio(seg(t, t0, t0 + 0.8)) * (1 - eio(seg(t, t0 + 2.2, t0 + 3.0)));
      el.setAttribute('opacity', (a * (0.25 + 0.75 * f.w)).toFixed(3));
    });
    // La luce dell'uscita, in fondo al tunnel.
    this.luce.setAttribute('opacity', (0.95 * eio(seg(t, FN_LUCE[0], FN_LUCE[1]))).toFixed(3));
    this.sub(t);
  },
});
