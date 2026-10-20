const { seg, eo, eio, lerp } = kit;
// Il treno di cinque vagoni corre nel fascio di binari. Clac, clac, clac: gli scambi di sempre scattano da soli al
// passaggio, e ogni vagone si sposta sul suo binario. Poi, nella parete, la finestra ad arco sull'acqua della vasca, e il
// treno rallenta: passano Al, Mare, «Zam» e «pi» e l'acqua resta vuota; passa «rù», tutto giallo, e si accendono
// paperelle di luce di tanti colori, le gialle più numerose. Fili e scambi: il filo più forte di «rù» va a Mare e porta
// l'azzurro, «rù» si fa blu polvere; alla seconda finestra le blu sono le più numerose. Ancora fili e scambi: alla terza
// finestra, da vicino, le paperelle di luce sono quasi tutte blu e corrono verso «rù». In fondo, la luce dell'uscita.
// Finestre, paperelle, fili e colori vengono dal modellino. Si apre come finisce «fili»; finisce nella luce («vasca»).
// Il treno va verso sinistra: la parete, le finestre e gli scambi scorrono verso destra.
const FS_VEL = [[0, 260], [2, 220], [10.8, 220], [11.8, 40], [16.2, 40], [17.6, 300], [21.6, 300], [23.4, 220], [24.6, 40], [28.6, 40],
  [30.0, 300], [34.0, 300], [35.6, 220], [36.8, 30], [41.6, 30], [43.0, 320]];
// Quando l'ultimo vagone, «rù», passa sotto il centro di ogni finestra.
const FS_RU = [12.4, 25.4, 37.6];
const FS_CAM = [
  { t: 0, cx: 1190, cy: 560, z: 0.9 },
  { t: 35.0, cx: 1190, cy: 560, z: 0.9 },
  { t: 36.8, cx: 1900, cy: 430, z: 1.3 },
  { t: 41.4, cx: 1900, cy: 430, z: 1.3 },
  { t: 43.4, cx: 1190, cy: 560, z: 0.9 },
];
// Le corsie di ogni vagone, tratto per tratto (Al e Mare come in «Al mare Emma»), e quando si accendono i fili.
const FS_CORSIE = [[2, 3, 2, 3], [2, 1, 0, 1], [2, 3, 4, 3], [2, 1, 2, 1], [2, 3, 2, 3]];
const FS_TRATTI = [{ fili: null, scambi: 3.0 }, { fili: 17.2, scambi: 19.6 }, { fili: 29.4, scambi: 32.0 }];
const FS_LUCE = [40.8, 44.0];
kit.scene('finestre', {
  init(kit) {
    const G = window.G, Z = G.MOD.zampiru, P = Z.passeggeri, C = G.C, I = G.INTERNO;
    this.nomi = Z.pezzi; this.P = P;
    const R = P['rù'];
    // Chi siede dove, e i suoi colori: all'inizio, poi dopo ogni tratto. «rù» parte dal giallo oro dei fili.
    this.chi = [['al', P.Al, ''], ['mare', P.mare, ''], ['pezzo', P.Zam, 'd'], ['pezzo', P.pi, 'sd'], ['pezzo', R, 's']]
      .map(([tipo, p, strappo], i) => ({ tipo, strappo, col: [i === 4 ? R.dopo_fili : p.biglietto].concat(p.tratti) }));
    this.scambi = FS_TRATTI.map((tr, n) => this.chi.map((c, i) => ({ t: tr.scambi + 0.3 * i, da: FS_CORSIE[i][n], a: FS_CORSIE[i][n + 1] })));
    const finestre = FS_RU.map((_, k) => '<g class="fs-finestra" data-k="' + k + '">' + G.finestra('fs' + k) + '</g>').join('');
    const scambi = this.scambi.map((tr, n) => tr.map((s, i) => {
      const yd = I.corsie[s.da], ya = I.corsie[s.a];
      return '<g class="fs-scambio" data-n="' + n + '" data-i="' + i + '"><path d="M0 ' + ya + ' C60 ' + ya + ' 80 ' + yd + ' 160 ' + yd + '" stroke="' + C.acciaio + '" stroke-width="5" fill="none"/>' +
        '<g transform="translate(150 ' + (Math.max(yd, ya) + 46) + ')"><rect x="-4" y="-34" width="8" height="40" fill="' + C.acciaioScuro + '"/><g class="fs-disco"><circle cy="-40" r="14" fill="' + C.rosso + '" stroke="' + C.crema + '" stroke-width="3"/><rect x="-12" y="-43" width="24" height="6" fill="' + C.crema + '"/></g></g></g>';
    }).join('')).join('');
    const linee = '<g class="fs-linee" opacity="0"><path d="M0 -10 L60 -14 M4 14 L70 16 M0 38 L54 42" stroke="#FFF4E0" stroke-width="4" stroke-linecap="round"/></g>';
    const fondo = '<rect x="-700" y="-500" width="3900" height="2080" fill="#07060F"/><rect x="-700" y="0" width="3900" height="1080" fill="url(#g-interno)"/>';
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + G.interniDefs +
      '<defs><radialGradient id="g-uscita" cx="0" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="fs-cam">' + fondo + G.interno(this.chi.map(c => ({ tipo: c.tipo, col: c.col[0] })), { corsie: I.corsie, finestre }) + '</g>' +
      '<rect class="fs-luce" x="-200" y="-200" width="2400" height="1480" fill="url(#g-uscita)" opacity="0"/></svg>' +
      G.sottotitolo('NARRATORE', 'Gli scambi sono quelli di sempre, e scattano a seconda di chi passa.') +
      G.sottotitolo('NARRATORE', 'Alla prima finestra, con l’ultimo pezzo, si accendono paperelle gialle.') +
      G.sottotitolo('NARRATORE', 'Poi il filo più forte va a Mare, e finestra dopo finestra arriva il blu.') +
      '</div>', 'finestre')));
    this.G = G;
    const q = s => kit.stage.querySelector(s);
    this.cam = q('.fs-cam'); this.luce = q('.fs-luce');
    this.corsie = [...kit.stage.querySelectorAll('.g-int-binari > g')].slice(0, I.corsie.length);
    // I binari continuano oltre il bordo dell'interno: la camera, da vicino, guarda lontano a destra.
    this.corsie.forEach((g, k) => { const y = I.corsie[k]; g.insertAdjacentHTML('beforeend', '<path d="M2380 ' + (y + 6) + ' L3400 ' + (y + 6) + '" stroke="' + C.legnoScuro + '" stroke-width="14" stroke-dasharray="6 22" class="g-traversine"/><path d="M2380 ' + y + ' L3400 ' + y + '" stroke="' + C.acciaio + '" stroke-width="4" opacity=".85"/>'); });
    q('.g-int-binari').insertAdjacentHTML('beforeend', scambi);
    q('.g-int-treno').insertAdjacentHTML('beforeend', linee);
    this.linee = q('.fs-linee');
    this.vag = [...kit.stage.querySelectorAll('.g-vag')];
    this.basi = this.vag.map(v => v.getAttribute('transform'));
    this.fin = [...kit.stage.querySelectorAll('.fs-finestra')];
    this.scEl = [...kit.stage.querySelectorAll('.fs-scambio')];
    this.d = t => G.percorso(t, 0, FS_VEL);
    this.dRu = FS_RU.map(this.d);
    // Le paperelle di luce di ogni finestra (dal modellino): quanto somigliano a «rù» decide quanto gli nuotano incontro.
    const rgb = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
    const dist = (a, b) => { const x = rgb(a), y = rgb(b); return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]); };
    this.papere = this.fin.map((f, k) => {
      const lista = G.papereFinestra(R.finestre[k], 31 + k), ru = R.tratti[k];
      f.querySelector('.g-fin-papere').innerHTML = lista.map(p => '<g class="fs-pap"><g transform="translate(-50 -84)">' + G.paperellaDiLuce(p.col) + '</g></g>').join('');
      const els = [...f.querySelectorAll('.fs-pap')];
      return lista.map((p, i) => ({ ...p, el: els[i], sim: Math.max(0, 1 - dist(p.col, ru) / 170) }));
    });
    // I fili dei tratti 2 e 3: per «rù» quelli del modellino (il più forte va a Mare), per gli altri quelli di sempre.
    const tipi = this.chi.map(c => c.tipo);
    let fili = '', punti = '';
    this.fili = [];
    [1, 2].forEach(n => {
      const dy = this.scambi[n].map(s => I.corsie[s.da] - I.ruote);
      this.nomi.forEach((ni, i) => this.nomi.slice(0, i + 1).forEach((nj, j) => {
        const w = (i === 4 ? R.fili_tratti[n] : P[ni].fili)[nj] || 0;
        let d;
        if (i === j) d = G.anello(i, tipi[i], dy[i]);
        else { const a = G.cima(i, tipi[i], dy[i]), b = G.cima(j, tipi[j], dy[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 70 - 0.12 * Math.abs(a[0] - b[0]); d = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
        const ww = i === j ? 0.45 * w : w, k = this.fili.length;
        const quanti = i === 4 && i !== j ? Math.round(w * 9) : 0;
        fili += '<path class="fs-filo" d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + 18 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>';
        for (let p = 0; p < quanti; p++) punti += '<circle class="fs-punto" data-k="' + k + '" data-p="' + p + '" r="' + (5 + 3 * w).toFixed(1) + '" opacity="0"/>';
        this.fili.push({ n, i, j, w, quanti });
      }));
    });
    q('.g-int-fili').innerHTML = fili + punti;
    this.filiEl = [...kit.stage.querySelectorAll('.fs-filo')];
    this.lung = this.filiEl.map(p => p.getTotalLength());
    this.punti = [...kit.stage.querySelectorAll('.fs-punto')];
    this.sub = G.subs(kit, [[0.8, 7.0], [10.8, 16.8], [31.0, 37.4]]);
  },
  // Il colore del vagone i al tempo t: cambia allo scambio; «rù», nei tratti 2 e 3, comincia a cambiare con i fili.
  colore(i, t) {
    const c = this.chi[i].col;
    let col = c[0];
    FS_TRATTI.forEach((tr, n) => {
      const s = this.scambi[n][i], a = i === 4 && tr.fili ? tr.fili + 0.8 : s.t;
      if (t >= a) col = this.G.mix(c[n], c[n + 1], Math.round(eio(seg(t, a, s.t + 1.4)) * 12) / 12);
    });
    return col;
  },
  render(t, kit) {
    t = window.G.tempo('06', 'finestre', t);
    const G = this.G, I = G.INTERNO;
    this.cam.setAttribute('transform', G.camChiavi(FS_CAM, t));
    const d = this.d(t);
    G.scorriInterno(kit, d);
    // Il fascio: le corsie laterali si accendono, quella centrale c'è già.
    this.corsie.forEach((c, k) => c.setAttribute('opacity', k === 2 ? 1 : (0.85 * eio(seg(t, 0.2 + Math.abs(k - 2) * 0.4, 1.6 + Math.abs(k - 2) * 0.4))).toFixed(3)));
    // Le finestre scorrono con la parete: la finestra k ha il centro sopra «rù» quando t = FS_RU[k].
    const S = 1.6, ruX = I.centri[4];
    this.fin.forEach((f, k) => {
      const x = ruX + d - this.dRu[k];
      f.setAttribute('transform', 'translate(' + (x - 180 * S).toFixed(1) + ' 36) scale(' + S + ')');
      const via = x < -800 || x > 3200;
      f.setAttribute('opacity', via ? 0 : 1);
      if (via) return;
      const ex = (ruX - (x - 180 * S)) / S;
      this.papere[k].forEach(p => {
        const t0 = FS_RU[k] - 0.7 + p.quando * 1.4, u = seg(t, t0, t0 + 0.4);
        if (u <= 0) { p.el.setAttribute('opacity', 0); return; }
        const v = eio(seg(t, t0 + 0.3, t0 + 2.6)) * p.sim;
        const px = p.x + Math.max(-60, Math.min(60, (ex - p.x) * 0.3)) * v, py = Math.min(204, p.y + 18 * v);
        const sc = 0.34 * (0.4 + 0.6 * eo(u)) * (1 + 0.12 * v);
        p.el.setAttribute('opacity', Math.min(1, u * 2).toFixed(3));
        p.el.setAttribute('transform', 'translate(' + px.toFixed(1) + ' ' + (py + 1.5 * Math.sin(t * 2.4 + p.x)).toFixed(1) + ') scale(' + sc.toFixed(3) + ')');
      });
    });
    // I vagoni: in quale corsia sono e di che colore, tratto dopo tratto. «rù», sullo scambio, è tirato via.
    let linee = 0;
    this.dy = [];
    this.vag.forEach((v, i) => {
      let dy = I.corsie[2] - I.ruote, tir = 0;
      this.scambi.forEach(tr => {
        const s = tr[i], p = eio(seg(t, s.t - 0.25, s.t + 0.3));
        if (t >= s.t - 0.25) dy = lerp(I.corsie[s.da], I.corsie[s.a], p) - I.ruote;
        tir = Math.max(tir, Math.sin(Math.PI * seg(t, s.t - 0.3, s.t + 0.9)));
      });
      this.dy[i] = dy;
      v.setAttribute('transform', 'translate(0 ' + (dy + 2 * Math.sin(t * 5 + i * 1.3)).toFixed(2) + ') ' + this.basi[i]);
      const c = this.chi[i], pass = G.cambiaPasseggero(v, c.tipo, this.colore(i, t), c.strappo ? { strappo: c.strappo } : {});
      if (i === 4) {
        pass.setAttribute('transform', 'translate(140 40) rotate(' + (-13 * tir).toFixed(2) + ') translate(-140 -40)');
        const [hx, hy] = G.testa(4, 'pezzo', dy);
        this.linee.setAttribute('transform', 'translate(' + (hx + 90) + ' ' + hy + ')');
        linee = 0.7 * tir;
      }
    });
    this.linee.setAttribute('opacity', linee.toFixed(3));
    // Gli scambi scorrono con i binari; le leve scattano da sole.
    this.scEl.forEach(g => {
      const n = +g.dataset.n, i = +g.dataset.i, s = this.scambi[n][i];
      const x = I.centri[i] - 80 + d - this.d(s.t);
      g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' 0)');
      g.setAttribute('opacity', x < -600 || x > 3200 ? 0 : 1);
      g.querySelector('.fs-disco').setAttribute('transform', 'rotate(' + (90 * eio(seg(t, s.t - 0.45, s.t - 0.25))).toFixed(1) + ' 0 -40)');
    });
    // I fili dei tratti 2 e 3: si accendono, portano i colori a «rù», si spengono.
    const acceso = n => { const t0 = FS_TRATTI[n].fili; return eio(seg(t, t0, t0 + 0.8)) * (1 - eio(seg(t, t0 + 2.8, t0 + 3.6))); };
    this.filiEl.forEach((el, k) => {
      const f = this.fili[k];
      el.setAttribute('opacity', (acceso(f.n) * (0.15 + 0.85 * f.w) * (f.i === 4 ? 1.2 : 0.7)).toFixed(3));
    });
    this.punti.forEach(c => {
      const k = +c.dataset.k, pp = +c.dataset.p, f = this.fili[k], L = this.lung[k];
      const u = ((t * 0.45 + pp / f.quanti) % 1);
      const pt = this.filiEl[k].getPointAtLength(u * L);
      c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1));
      c.setAttribute('fill', this.colore(f.j, t));
      c.setAttribute('opacity', (acceso(f.n) * Math.min(1, u * 6, (1 - u) * 6)).toFixed(3));
    });
    this.luce.setAttribute('opacity', (0.95 * eio(seg(t, FS_LUCE[0], FS_LUCE[1]))).toFixed(3));
    this.sub(t);
  },
});
