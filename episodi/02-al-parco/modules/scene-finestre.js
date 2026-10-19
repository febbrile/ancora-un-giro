const { seg, eo, eio, lerp } = kit;
// Il secondo treno corre nel fascio di binari. Gli scambi sono gli stessi dell'altro treno e scattano da soli, a seconda
// di chi passa: Emma è tirata via e il vestito si fa verde. Poi le finestre sulla vasca: il treno rallenta, con Al e
// Parco l'acqua resta vuota, con Emma si accendono le paperelle di luce. Fili e scambi, due volte ancora: a ogni
// finestra le paperelle sono più verdi e le nuotano incontro. In fondo, la luce dell'uscita.
// Si apre come finisce «fili»; finisce nella luce (la riprende «mare», fuori).
// Il treno va verso sinistra: la parete, le finestre e gli scambi scorrono verso destra.
const FS_VEL = [[0, 260], [2, 200], [10, 200], [11, 40], [15.5, 40], [17, 300], [21, 300], [22.4, 200], [23.4, 40], [27.9, 40],
  [29.4, 300], [33.6, 300], [35, 200], [36, 30], [41.4, 30], [42.8, 320]];
// Quando l'ultimo vagone, Emma, passa sotto il centro di ogni finestra.
const FS_EMMA = [11.0, 23.4, 36.0];
const FS_CAM = [
  { t: 0, cx: 960, cy: 540, z: 1 },
  { t: 1.6, cx: 960, cy: 560, z: 1 },
  { t: 2.8, cx: 1080, cy: 700, z: 1.6 },
  { t: 5.6, cx: 1080, cy: 700, z: 1.6 },
  { t: 7.6, cx: 960, cy: 560, z: 1 },
  { t: 34.6, cx: 960, cy: 560, z: 1 },
  { t: 36.6, cx: 1190, cy: 390, z: 1.45 },
  { t: 41.0, cx: 1190, cy: 390, z: 1.45 },
  { t: 43.0, cx: 960, cy: 560, z: 1 },
];
// I tre tratti: quando si accendono i fili (nel primo li ha già visti «fili») e gli scambi di Al, Parco, Emma.
const FS_TRATTI = [
  { fili: null, scambi: [{ t: 3.0, da: 2, a: 3 }, { t: 3.4, da: 2, a: 1 }, { t: 4.0, da: 2, a: 1 }] },
  { fili: 16.4, scambi: [{ t: 19.0, da: 3, a: 2 }, { t: 19.3, da: 1, a: 0 }, { t: 19.6, da: 1, a: 0 }] },
  { fili: 29.6, scambi: [{ t: 32.2, da: 2, a: 3 }, { t: 32.5, da: 0, a: 1 }, { t: 32.8, da: 0, a: 1 }] },
];
const FS_LUCE = [41.0, 45.0];
kit.scene('finestre', {
  init(kit) {
    const G = window.G, P = G.MOD.parco.passeggeri, C = G.C, I = G.INTERNO;
    // Chi siede dove, e i suoi colori: all'inizio, poi dopo ogni tratto.
    this.chi = [
      ['al', [P.Al.biglietto].concat(P.Al.tratti)],
      ['parco', [P.parco.biglietto].concat(P.parco.tratti)],
      ['emma', [P.Emma.dopo_fili].concat(P.Emma.tratti)],
    ];
    const finestre = FS_EMMA.map((_, k) => '<g class="fs-finestra" data-k="' + k + '">' + G.finestra('fs' + k) + '</g>').join('');
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
      G.sottotitolo('NARRATORE', 'Questa volta, finestra dopo finestra, le paperelle di luce diventano verdi.') +
      G.sottotitolo('NARRATORE', 'All’ultima finestra sono quasi tutte verdi, come Emma.') +
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
    this.d = t => G.percorso(t, 0, FS_VEL);
    this.dEmma = FS_EMMA.map(this.d);
    // Le paperelle di luce di ogni finestra (dal modellino: la vasca che si avrebbe dopo ogni tratto).
    // Quanto somigliano a Emma decide quanto le nuotano incontro.
    const rgb = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
    const dist = (a, b) => { const x = rgb(a), y = rgb(b); return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]); };
    this.papere = this.fin.map((f, k) => {
      const lista = G.papereFinestra(P.Emma.finestre[k], 21 + k), emma = P.Emma.tratti[k];
      f.querySelector('.g-fin-papere').innerHTML = lista.map(p => '<g class="fs-pap"><g transform="translate(-50 -84)">' + G.paperellaDiLuce(p.col) + '</g></g>').join('');
      const els = [...f.querySelectorAll('.fs-pap')];
      return lista.map((p, i) => ({ ...p, el: els[i], sim: Math.max(0, 1 - dist(p.col, emma) / 170) }));
    });
    // I fili dei tratti 2 e 3: Emma verso Al, Parco e sé; Parco verso Al e sé; Al verso sé.
    const tipi = this.chi.map(c => c[0]);
    let fili = '';
    this.fili = [];
    [1, 2].forEach(n => {
      const dy = FS_TRATTI[n].scambi.map(s => I.corsie[s.da] - I.ruote);
      const pe = P.Emma.fili_tratti[n];
      const pesi = [[0, 0, P.Al.fili.Al], [1, 0, P.parco.fili.Al], [1, 1, P.parco.fili.parco], [2, 0, pe.Al], [2, 1, pe.parco], [2, 2, pe.Emma]];
      pesi.forEach(([i, j, w]) => {
        let d;
        if (i === j) d = G.anello(i, tipi[i], dy[i]);
        else { const a = G.cima(i, tipi[i], dy[i]), b = G.cima(j, tipi[j], dy[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 80 - 0.12 * Math.abs(a[0] - b[0]); d = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
        const ww = i === j ? 0.45 * w : w;
        fili += '<path class="fs-filo" d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + 10 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>';
        this.fili.push({ n, w });
      });
    });
    q('.g-int-fili').innerHTML = fili;
    this.filiEl = [...kit.stage.querySelectorAll('.fs-filo')];
    this.sub = G.subs(kit, [[0.8, 8.0], [22.4, 28.8], [36.4, 41.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('02', 'finestre', t);
    const G = this.G, I = G.INTERNO;
    this.cam.setAttribute('transform', G.camChiavi(FS_CAM, t));
    const d = this.d(t);
    G.scorriInterno(kit, d);
    // Il fascio: le corsie laterali si accendono, quella centrale c'è già.
    this.corsie.forEach((c, k) => c.setAttribute('opacity', k === 2 ? 1 : (0.85 * eio(seg(t, 0.2 + Math.abs(k - 2) * 0.4, 1.6 + Math.abs(k - 2) * 0.4))).toFixed(3)));
    // Le finestre scorrono con la parete: la finestra k ha il centro sopra Emma quando t = FS_EMMA[k].
    const S = 1.6, emmaX = I.centri[2];
    this.fin.forEach((f, k) => {
      const x = emmaX + d - this.dEmma[k];
      f.setAttribute('transform', 'translate(' + (x - 180 * S).toFixed(1) + ' 36) scale(' + S + ')');
      f.setAttribute('opacity', x < -500 || x > 2500 ? 0 : 1);
      if (x < -500 || x > 2500) return;
      const ex = (emmaX - (x - 180 * S)) / S;
      this.papere[k].forEach(p => {
        const t0 = FS_EMMA[k] - 0.7 + p.quando * 1.4, u = seg(t, t0, t0 + 0.4);
        if (u <= 0) { p.el.setAttribute('opacity', 0); return; }
        const v = eio(seg(t, t0 + 0.3, t0 + 2.6)) * p.sim;
        const px = p.x + Math.max(-60, Math.min(60, (ex - p.x) * 0.3)) * v, py = Math.min(204, p.y + 18 * v);
        const sc = 0.34 * (0.4 + 0.6 * eo(u)) * (1 + 0.12 * v);
        p.el.setAttribute('opacity', Math.min(1, u * 2).toFixed(3));
        p.el.setAttribute('transform', 'translate(' + px.toFixed(1) + ' ' + (py + 1.5 * Math.sin(t * 2.4 + p.x)).toFixed(1) + ') scale(' + sc.toFixed(3) + ')');
      });
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
        const pass = G.cambiaPasseggero(v, 'emma', col, tir > 0.15 ? { tirata: true } : {});
        pass.setAttribute('transform', 'translate(140 40) rotate(' + (-13 * tir).toFixed(2) + ') translate(-140 -40)');
        const [hx, hy] = G.testa(2, 'emma', dy);
        this.linee.setAttribute('transform', 'translate(' + (hx + 70) + ' ' + hy + ')');
        linee = 0.7 * tir;
      } else G.cambiaPasseggero(v, this.chi[i][0], col);
    });
    this.linee.setAttribute('opacity', linee.toFixed(3));
    // Gli scambi scorrono con i binari; le leve scattano da sole.
    this.scambi.forEach(g => {
      const n = +g.dataset.n, i = +g.dataset.i, s = FS_TRATTI[n].scambi[i];
      const x = I.centri[i] - 80 + d - this.d(s.t);
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
