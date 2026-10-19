const { seg, eo, eio, lerp } = kit;
// Il secondo treno corre nel fascio di binari. Gli scambi sono gli stessi dell'altro treno, e scattano da soli a seconda
// di chi passa: Emma è tirata via e il vestito cambia. Fili di luce, scambi, fili di luce, scambi. Le finestre danno su
// un giardino, un viale, un prato: ogni volta più simili al vestito di Emma. In fondo, la luce dell'uscita.
// Si apre come finisce «fili».
const FS_VEL = 300;
const FS_CAM = [
  { t: 0, cx: 960, cy: 540, z: 1 },
  { t: 2.0, cx: 960, cy: 560, z: 1 },
  { t: 3.6, cx: 1080, cy: 700, z: 1.6 },
  { t: 6.6, cx: 1080, cy: 700, z: 1.6 },
  { t: 8.6, cx: 960, cy: 560, z: 1 },
  { t: 26.6, cx: 960, cy: 560, z: 1 },
  { t: 28.6, cx: 1000, cy: 440, z: 1.25 },
  { t: 31.4, cx: 1000, cy: 440, z: 1.25 },
  { t: 33.6, cx: 960, cy: 560, z: 1 },
];
// Le finestre: quando il loro centro entra da destra (x = 2150).
const FS_FINESTRE = [4.8, 14.8, 24.4];
// I tre tratti: quando si accendono i fili (nel primo li ha già visti «fili») e gli scambi di Al, Parco, Emma.
const FS_TRATTI = [
  { fili: null, scambi: [{ t: 3.6, da: 2, a: 3 }, { t: 4.1, da: 2, a: 1 }, { t: 4.8, da: 2, a: 1 }] },
  { fili: 11.0, scambi: [{ t: 13.8, da: 3, a: 2 }, { t: 14.1, da: 1, a: 0 }, { t: 14.4, da: 1, a: 0 }] },
  { fili: 21.2, scambi: [{ t: 24.0, da: 2, a: 3 }, { t: 24.3, da: 0, a: 1 }, { t: 24.6, da: 0, a: 1 }] },
];
const FS_LUCE = [31.6, 35.8];
kit.scene('finestre', {
  init(kit) {
    const G = window.G, P = G.MOD.parco.passeggeri, C = G.C, I = G.INTERNO;
    // Chi siede dove, e i suoi colori: all'inizio, poi dopo ogni tratto.
    this.chi = [
      ['al', [P.Al.biglietto].concat(P.Al.tratti)],
      ['parco', [P.parco.biglietto].concat(P.parco.tratti)],
      ['emma', [P.Emma.dopo_fili].concat(P.Emma.tratti)],
    ];
    const finestre = P.Emma.finestre.map((nome, k) => '<g class="fs-finestra" data-k="' + k + '">' + G.finestra(nome, k + 1) + '</g>').join('');
    const scambi = FS_TRATTI.map((tr, n) => tr.scambi.map((s, i) => {
      const yd = I.corsie[s.da], ya = I.corsie[s.a];
      return '<g class="fs-scambio" data-n="' + n + '" data-i="' + i + '"><path d="M0 ' + ya + ' C60 ' + ya + ' 80 ' + yd + ' 160 ' + yd + '" stroke="' + C.acciaio + '" stroke-width="5" fill="none"/>' +
        '<g transform="translate(150 ' + (Math.max(yd, ya) + 46) + ')"><rect x="-4" y="-34" width="8" height="40" fill="' + C.acciaioScuro + '"/><g class="fs-disco"><circle cy="-40" r="14" fill="' + C.rosso + '" stroke="' + C.crema + '" stroke-width="3"/><rect x="-12" y="-43" width="24" height="6" fill="' + C.crema + '"/></g></g></g>';
    }).join('')).join('');
    const linee = '<g class="fs-linee" opacity="0"><path d="M0 -10 L60 -14 M4 14 L70 16 M0 38 L54 42" stroke="#FFF4E0" stroke-width="4" stroke-linecap="round"/></g>';
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + G.interniDefs +
      '<defs><radialGradient id="g-uscita" cx="0" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="fs-cam">' + G.interno(this.chi.map(c => ({ tipo: c[0], col: c[1][0] })), { corsie: I.corsie, finestre }) + '</g>' +
      '<rect class="fs-luce" x="-200" y="-200" width="2400" height="1480" fill="url(#g-uscita)" opacity="0"/></svg>' +
      G.sottotitolo('NARRATORE', 'Gli scambi sono gli stessi dell’altro treno. Ma scattano a seconda di chi passa.') +
      G.sottotitolo('NARRATORE', 'Ma le finestre, questa volta, non danno sul mare.') +
      '</div>', 'finestre')));
    this.G = G;
    const q = s => kit.stage.querySelector(s);
    this.cam = q('.fs-cam'); this.luce = q('.fs-luce');
    q('.g-int-binari').insertAdjacentHTML('beforeend', scambi);
    q('.g-int-treno').insertAdjacentHTML('beforeend', linee);
    this.linee = q('.fs-linee');
    this.vag = [...kit.stage.querySelectorAll('.g-vag')];
    this.basi = this.vag.map(v => v.getAttribute('transform'));
    this.corsie = [...kit.stage.querySelectorAll('.g-int-binari > g')].slice(0, I.corsie.length);
    this.fin = [...kit.stage.querySelectorAll('.fs-finestra')];
    this.scambi = [...kit.stage.querySelectorAll('.fs-scambio')];
    // I fili dei tratti 2 e 3: Emma verso Al, Parco e sé; Parco verso Al e sé; Al verso sé.
    const tipi = this.chi.map(c => c[0]);
    let fili = '';
    this.fili = [];
    [1, 2].forEach(n => {
      const corsie = FS_TRATTI[n].scambi.map(s => s.da);
      const dy = corsie.map(c => I.corsie[c] - I.ruote);
      const pe = P.Emma.fili_tratti[n];
      const pesi = [[0, 0, P.Al.fili.Al], [1, 0, P.parco.fili.Al], [1, 1, P.parco.fili.parco], [2, 0, pe.Al], [2, 1, pe.parco], [2, 2, pe.Emma]];
      pesi.forEach(([i, j, w]) => {
        let d;
        if (i === j) { const a = G.testa(i, tipi[i], dy[i]), rx = i === 2 ? 50 : 44, ry = i === 2 ? 58 : 40; d = 'M' + (a[0] - rx) + ' ' + a[1] + ' a' + rx + ' ' + ry + ' 0 1 0 ' + (2 * rx) + ' 0 a' + rx + ' ' + ry + ' 0 1 0 ' + (-2 * rx) + ' 0'; }
        else { const a = G.cima(i, tipi[i], dy[i]), b = G.cima(j, tipi[j], dy[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 80 - 0.12 * Math.abs(a[0] - b[0]); d = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
        const ww = i === j ? 0.45 * w : w;
        fili += '<path class="fs-filo" d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + 10 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>';
        this.fili.push({ n, w });
      });
    });
    q('.g-int-fili').innerHTML = fili;
    this.filiEl = [...kit.stage.querySelectorAll('.fs-filo')];
    this.statoEmma = '';
    this.sub = G.subs(kit, [[0.8, 8.6], [18.6, 23.2]]);
  },
  render(t, kit) {
    const G = this.G, I = G.INTERNO;
    this.cam.setAttribute('transform', G.camChiavi(FS_CAM, t));
    const d = FS_VEL * t + 60 * Math.pow(Math.max(0, t - 31.6), 2);
    G.scorriInterno(kit, d);
    // Il fascio: le corsie laterali si accendono, quella centrale c'è già.
    this.corsie.forEach((c, k) => c.setAttribute('opacity', k === 2 ? 1 : (0.85 * eio(seg(t, 0.2 + Math.abs(k - 2) * 0.4, 1.6 + Math.abs(k - 2) * 0.4))).toFixed(3)));
    // Le finestre scorrono con la parete.
    this.fin.forEach((f, k) => {
      const x = 2150 - FS_VEL * (t - FS_FINESTRE[k]);
      f.setAttribute('transform', 'translate(' + (x - 216).toFixed(1) + ' 150) scale(1.2)');
      f.setAttribute('opacity', x < -500 || x > 2600 ? 0 : 1);
    });
    // I vagoni: in quale corsia sono, di che colore, tratto dopo tratto. Emma, sullo scambio, è tirata via.
    let linee = 0;
    this.vag.forEach((v, i) => {
      let dy = I.corsie[2] - I.ruote, col = this.chi[i][1][0], tir = 0;
      FS_TRATTI.forEach((tr, n) => {
        const s = tr.scambi[i], p = eio(seg(t, s.t - 0.25, s.t + 0.3));
        if (t >= s.t - 0.25) dy = lerp(I.corsie[s.da], I.corsie[s.a], p) - I.ruote;
        const c = Math.round(eio(seg(t, s.t, s.t + 1.4)) * 12) / 12;
        if (t >= s.t) col = G.mix(this.chi[i][1][n], this.chi[i][1][n + 1], c);
        tir = Math.max(tir, Math.sin(Math.PI * seg(t, s.t - 0.3, s.t + 0.9)));
      });
      v.setAttribute('transform', 'translate(0 ' + (dy + 2 * Math.sin(t * 5 + i * 1.3)).toFixed(2) + ') ' + this.basi[i]);
      if (i === 2) {
        const tirata = tir > 0.15;
        const pass = G.cambiaPasseggero(v, 'emma', col, tirata ? { tirata: true } : {});
        pass.setAttribute('transform', 'translate(140 40) rotate(' + (-13 * tir).toFixed(2) + ') translate(-140 -40)');
        const [hx, hy] = G.testa(2, 'emma', dy);
        this.linee.setAttribute('transform', 'translate(' + (hx + 70) + ' ' + hy + ')');
        linee = 0.7 * tir;
      } else G.cambiaPasseggero(v, this.chi[i][0], col);
    });
    this.linee.setAttribute('opacity', linee.toFixed(3));
    // Gli scambi arrivano da sinistra; le leve scattano da sole.
    this.scambi.forEach(g => {
      const n = +g.dataset.n, i = +g.dataset.i, s = FS_TRATTI[n].scambi[i];
      const x = I.centri[i] - 80 - FS_VEL * (s.t - t);
      g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' 0)');
      g.setAttribute('opacity', x < -300 || x > 2200 ? 0 : 1);
      g.querySelector('.fs-disco').setAttribute('transform', 'rotate(' + (90 * eio(seg(t, s.t - 0.45, s.t - 0.25))).toFixed(1) + ' 0 -40)');
    });
    // I fili, veloci: si accendono e si spengono a ogni tratto.
    this.filiEl.forEach((el, k) => {
      const f = this.fili[k], t0 = FS_TRATTI[f.n].fili;
      const a = eio(seg(t, t0, t0 + 0.8)) * (1 - eio(seg(t, t0 + 2.2, t0 + 3.0)));
      el.setAttribute('opacity', (a * (0.25 + 0.75 * f.w)).toFixed(3));
    });
    this.luce.setAttribute('opacity', (0.95 * eio(seg(t, FS_LUCE[0], FS_LUCE[1]))).toFixed(3));
    this.sub(t);
  },
});
