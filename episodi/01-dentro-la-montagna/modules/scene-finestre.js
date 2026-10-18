const { seg, eo, eio, lerp } = kit;
// Il giro continua: fili di luce e scambi, due volte ancora. Dalle finestre nella parete si vedono una spiaggia, un molo,
// il mare aperto: ogni volta più simili al vestito di Emma. In fondo, la luce dell'uscita.
// Si apre come finisce «scambi».
const FN_VEL = 300;
const FN_CAM = [
  { t: 0, cx: 960, cy: 560, z: 1 },
  { t: 23.4, cx: 960, cy: 560, z: 1 },
  { t: 25.8, cx: 1000, cy: 440, z: 1.25 },
  { t: 30.0, cx: 1000, cy: 440, z: 1.25 },
  { t: 33.0, cx: 960, cy: 560, z: 1 },
];
// Le finestre: quando il loro centro entra da destra (x = 2150).
const FN_FINESTRE = [-1.0, 8.6, 22.2];
// I tratti 2 e 3: quando si accendono i fili, e gli scambi di Al, Mare, Emma (con le corsie).
const FN_TRATTI = [
  { fili: 5.8, scambi: [{ t: 8.6, da: 3, a: 2 }, { t: 8.9, da: 1, a: 0 }, { t: 9.2, da: 1, a: 0 }] },
  { fili: 17.6, scambi: [{ t: 20.2, da: 2, a: 3 }, { t: 20.5, da: 0, a: 1 }, { t: 20.8, da: 0, a: 1 }] },
];
const FN_LUCE = [32.0, 41.6];
kit.scene('finestre', {
  init(kit) {
    const G = window.G, P = G.MOD.mare.passeggeri, C = G.C, I = G.INTERNO;
    this.chi = [['al', P.Al], ['mare', P.mare], ['emma', P.Emma]];
    const finestre = G.MOD.mare.passeggeri.Emma.finestre.map((nome, k) => '<g class="fn-finestra" data-k="' + k + '">' + G.finestra(nome, k + 1) + '</g>').join('');
    const scambi = FN_TRATTI.map((tr, n) => tr.scambi.map((s, i) => {
      const yd = I.corsie[s.da], ya = I.corsie[s.a];
      return '<g class="fn-scambio" data-n="' + n + '" data-i="' + i + '"><path d="M0 ' + ya + ' C60 ' + ya + ' 80 ' + yd + ' 160 ' + yd + '" stroke="' + C.acciaio + '" stroke-width="5" fill="none"/>' +
        '<g transform="translate(150 ' + (Math.max(yd, ya) + 46) + ')"><rect x="-4" y="-34" width="8" height="40" fill="' + C.acciaioScuro + '"/><g class="fn-disco"><circle cy="-40" r="14" fill="' + C.rosso + '" stroke="' + C.crema + '" stroke-width="3"/><rect x="-12" y="-43" width="24" height="6" fill="' + C.crema + '"/></g></g></g>';
    }).join('')).join('');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + G.interniDefs +
      '<defs><radialGradient id="g-uscita" cx="0" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="fn-cam">' + G.interno(this.chi.map(c => ({ tipo: c[0], col: c[1].tratti[0] })), { corsie: I.corsie, finestre }) + '</g>' +
      '<rect class="fn-luce" x="-200" y="-200" width="2400" height="1480" fill="url(#g-uscita)" opacity="0"/></svg>' +
      G.sottotitolo('NARRATORE', 'E il giro continua: fili di luce, scambi, fili di luce, scambi.') +
      G.sottotitolo('NARRATORE', 'Ogni tanto la montagna ha una finestra. A ogni finestra, il paesaggio somiglia un po’ di più al vestito di Emma.') +
      '</div>', 'finestre')));
    this.G = G;
    const q = s => kit.stage.querySelector(s);
    this.cam = q('.fn-cam'); this.luce = q('.fn-luce');
    q('.g-int-binari').insertAdjacentHTML('beforeend', scambi);
    this.vag = [...kit.stage.querySelectorAll('.g-vag')];
    this.basi = this.vag.map(v => v.getAttribute('transform'));
    this.fin = [...kit.stage.querySelectorAll('.fn-finestra')];
    this.scambi = [...kit.stage.querySelectorAll('.fn-scambio')];
    // Le corsie di ogni vagone, all'inizio di ogni tratto (alla fine di «scambi»: Al in 3, Mare in 1, Emma in 1).
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
        if (i === j) { const a = G.testa(i, tipi[i], dy[i]), rx = i === 2 ? 50 : 44, ry = i === 2 ? 58 : 40; d = 'M' + (a[0] - rx) + ' ' + a[1] + ' a' + rx + ' ' + ry + ' 0 1 0 ' + (2 * rx) + ' 0 a' + rx + ' ' + ry + ' 0 1 0 ' + (-2 * rx) + ' 0'; }
        else { const a = G.cima(i, tipi[i], dy[i]), b = G.cima(j, tipi[j], dy[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 80 - 0.12 * Math.abs(a[0] - b[0]); d = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
        const ww = i === j ? 0.45 * w : w;
        fili += '<path class="fn-filo" data-n="' + n + '" d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + 10 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>';
        this.fili.push({ n, w });
      });
    });
    q('.g-int-fili').innerHTML = fili;
    this.filiEl = [...kit.stage.querySelectorAll('.fn-filo')];
    this.sub = G.subs(kit, [[5.6, 11.6], [13.0, 23.0]]);
  },
  render(t, kit) {
    const G = this.G, I = G.INTERNO;
    this.cam.setAttribute('transform', G.camChiavi(FN_CAM, t));
    // Verso la fine il treno accelera un poco.
    const d = FN_VEL * t + 60 * Math.pow(Math.max(0, t - 32), 2);
    G.scorriInterno(kit, d);
    // Le finestre scorrono con la parete.
    this.fin.forEach((f, k) => {
      const x = 2150 - FN_VEL * (t - FN_FINESTRE[k]);
      f.setAttribute('transform', 'translate(' + (x - 216).toFixed(1) + ' 150) scale(1.2)');
      f.setAttribute('opacity', x < -500 || x > 2600 ? 0 : 1);
    });
    // I vagoni: in quale corsia sono, e di che colore, tratto dopo tratto.
    this.vag.forEach((v, i) => {
      let corsia = [3, 1, 1][i], col = this.chi[i][1].tratti[0];
      let dy = I.corsie[corsia] - I.ruote;
      FN_TRATTI.forEach((tr, n) => {
        const s = tr.scambi[i], p = eio(seg(t, s.t - 0.25, s.t + 0.3));
        if (t >= s.t - 0.25) dy = lerp(I.corsie[s.da], I.corsie[s.a], p) - I.ruote;
        const c = Math.round(eio(seg(t, s.t, s.t + 1.4)) * 12) / 12;
        if (t >= s.t) col = G.mix(this.chi[i][1].tratti[n], this.chi[i][1].tratti[n + 1], c);
      });
      v.setAttribute('transform', 'translate(0 ' + (dy + 2 * Math.sin(t * 5 + i * 1.3)).toFixed(2) + ') ' + this.basi[i]);
      G.cambiaPasseggero(v, this.chi[i][0], col);
    });
    // Gli scambi arrivano da sinistra; le leve scattano da sole.
    this.scambi.forEach(g => {
      const n = +g.dataset.n, i = +g.dataset.i, s = FN_TRATTI[n].scambi[i];
      const x = I.centri[i] - 80 - FN_VEL * (s.t - t);
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
    // La luce dell'uscita, in fondo al tunnel (a sinistra).
    this.luce.setAttribute('opacity', (0.95 * eio(seg(t, FN_LUCE[0], FN_LUCE[1]))).toFixed(3));
    this.sub(t);
  },
});
