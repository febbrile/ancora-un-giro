const { seg, eo, eio, lerp } = kit;
// Il treno corre nel fascio di binari: clac, clac, clac, gli scambi scattano da soli al passaggio, ogni vagone si sposta
// sul suo binario e la chioma di Parco si fa più verde. Poi, nella parete, la finestra sulla vasca, e il treno rallenta:
// passano Al, Mare, Emma, la paperella blu e l'altro Al, e l'acqua resta vuota; passa Parco, e si accendono le paperelle
// di luce, di tutti i colori. Fili e scambi, due volte ancora: a ogni finestra le paperelle sono più verdi e più
// turchesi e gli nuotano incontro. All'ultima finestra la camera si avvicina; in fondo, la luce dell'uscita.
// Si apre come finisce «fili» (il treno intero nel buio); finisce nella luce (la riprende «pesca», fuori).
// Il treno va verso sinistra: la parete, le finestre e gli scambi scorrono verso destra.
const FS_VEL = [[0, 240], [2.6, 240], [3.6, 380], [8.4, 380], [9.4, 40], [14.0, 40], [15.0, 300], [18.0, 300], [18.8, 700],
  [21.0, 700], [21.8, 40], [25.4, 40], [26.4, 300], [29.6, 300], [30.4, 760], [32.6, 760], [33.4, 30], [38.6, 30], [39.6, 340]];
// Quando l'ultimo vagone, Parco, passa sotto il centro di ogni finestra.
const FS_PARCO = [9.6, 22.0, 33.6];
const FS_CAM = [
  { t: 0, cx: 1460, cy: 540, z: 0.8 },
  { t: 1.4, cx: 1400, cy: 560, z: 0.78 },
  { t: 9.6, cx: 1400, cy: 560, z: 0.78 },
  { t: 11.4, cx: 2000, cy: 500, z: 1.05 },
  { t: 13.6, cx: 2000, cy: 500, z: 1.05 },
  { t: 15.4, cx: 1400, cy: 560, z: 0.78 },
  { t: 21.6, cx: 1400, cy: 560, z: 0.78 },
  { t: 23.2, cx: 2000, cy: 500, z: 1.05 },
  { t: 25.0, cx: 2000, cy: 500, z: 1.05 },
  { t: 26.6, cx: 1400, cy: 560, z: 0.78 },
  { t: 32.4, cx: 1400, cy: 560, z: 0.78 },
  { t: 34.6, cx: 2160, cy: 512, z: 1.12 },
  { t: 39.0, cx: 2160, cy: 512, z: 1.12 },
  { t: 41.0, cx: 1900, cy: 520, z: 1.0 },
];
// I tre tratti: quando si accendono i fili (nel primo li ha già visti «fili») e gli scambi di ogni vagone, con le corsie.
const FS_CORSIE = [[[2, 3], [2, 1], [2, 1], [2, 1], [2, 3], [2, 1]], [[3, 2], [1, 0], [1, 0], [1, 0], [3, 2], [1, 0]], [[2, 3], [0, 1], [0, 1], [0, 1], [2, 3], [0, 1]]];
const FS_TRATTI = [{ fili: null, scambi: 2.2 }, { fili: 15.2, scambi: 17.2 }, { fili: 26.6, scambi: 28.4 }].map((tr, n) => ({
  fili: tr.fili, scambi: FS_CORSIE[n].map(([da, a], i) => ({ t: tr.scambi + i * 0.24, da, a })),
}));
const FS_LUCE = [38.6, 41.4];
kit.scene('finestre', {
  init(kit) {
    const G = window.G, H = G.MOD.chat, P = H.giro.passeggeri, E = G.MOD.mare.passeggeri, C = G.C, I = G.INTERNO;
    const tipi = ['al', 'mare', 'emma', 'paperella', 'al', 'parco'];
    // Chi siede dove, e i suoi colori: all'inizio (dopo i fili), poi dopo ogni tratto.
    this.chi = tipi.map((tp, i) => [tp, [i === 2 ? E.Emma.dopo_fili : i === 5 ? P[5].dopo_fili : P[i].biglietto].concat(P[i].tratti)]);
    const finestre = FS_PARCO.map((_, k) => '<g class="fs-finestra" data-k="' + k + '">' + G.finestra('fs' + k) + '</g>').join('');
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
      G.sottotitolo('NARRATORE', 'Alle finestre sulla vasca, per tutto il treno l’acqua resta vuota.') +
      G.sottotitolo('NARRATORE', 'Passa Parco, l’ultimo, e si accendono le paperelle di luce.') +
      G.sottotitolo('NARRATORE', 'Finestra dopo finestra, diventano verdi come la sua chioma.') +
      '</div>', 'finestre')));
    this.G = G;
    const q = s => kit.stage.querySelector(s);
    this.cam = q('.fs-cam'); this.luce = q('.fs-luce');
    G.internoLungo(this.cam, I.corsie);
    q('.g-int-binari').insertAdjacentHTML('beforeend', scambi);
    q('.g-int-treno').insertAdjacentHTML('beforeend', linee);
    this.linee = q('.fs-linee');
    this.vag = [...kit.stage.querySelectorAll('.g-vag')];
    this.basi = this.vag.map(v => v.getAttribute('transform'));
    const corsie = [...kit.stage.querySelectorAll('.g-int-binari > g')];
    this.corsie = corsie.slice(0, I.corsie.length).concat(corsie.filter(g => g.classList.contains('g-oltre-corsia')));
    this.fin = [...kit.stage.querySelectorAll('.fs-finestra')];
    this.scambi = [...kit.stage.querySelectorAll('.fs-scambio')];
    this.d = t => G.percorso(t, 0, FS_VEL);
    this.dParco = FS_PARCO.map(this.d);
    // Le paperelle di luce di ogni finestra (dal modellino: la vasca che si avrebbe dopo ogni tratto, sotto Parco).
    // Quanto somigliano a Parco decide quanto gli nuotano incontro.
    const rgb = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
    const dist = (a, b) => { const x = rgb(a), y = rgb(b); return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]); };
    this.papere = this.fin.map((f, k) => {
      const lista = G.papereFinestra(P[5].finestre[k], 41 + k), parco = P[5].tratti[k];
      f.querySelector('.g-fin-papere').innerHTML = lista.map(p => '<g class="fs-pap"><g transform="translate(-50 -84)">' + G.paperellaDiLuce(p.col) + '</g></g>').join('');
      const els = [...f.querySelectorAll('.fs-pap')];
      return lista.map((p, i) => ({ ...p, el: els[i], sim: Math.max(0, 1 - dist(p.col, parco) / 170) }));
    });
    // I fili dei tratti 2 e 3: in testa come la prima volta (Al, Mare, Emma); Parco verso tutti quelli davanti e verso sé.
    let fili = '';
    this.fili = [];
    [1, 2].forEach(n => {
      const dy = FS_TRATTI[n].scambi.map(s => I.corsie[s.da] - I.ruote);
      const pe = E.Emma.fili_tratti[n], pp = P[5].fili_tratti[n];
      const pesi = [[0, 0, E.Al.fili.Al], [1, 0, E.mare.fili.Al], [1, 1, E.mare.fili.mare], [2, 0, pe.Al], [2, 1, pe.mare], [2, 2, pe.Emma]]
        .concat(pp.map((w, j) => [5, j, w]));
      pesi.forEach(([i, j, w]) => {
        let d;
        if (i === j) d = G.anello(i, tipi[i], dy[i]);
        else { const a = G.cima(i, tipi[i], dy[i]), b = G.cima(j, tipi[j], dy[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 80 - 0.12 * Math.abs(a[0] - b[0]); d = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
        const ww = i === j ? 0.45 * w : w;
        fili += '<path class="fs-filo" d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + 10 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>';
        this.fili.push({ n, w });
      });
    });
    q('.g-int-fili').innerHTML = G.unico(fili, 'finestre');
    this.filiEl = [...kit.stage.querySelectorAll('.fs-filo')];
    this.sub = G.subs(kit, [[4.2, 9.8], [10.2, 15.4], [34.0, 39.4]]);
  },
  render(t, kit) {
    t = window.G.tempo('04', 'finestre', t);
    const G = this.G, I = G.INTERNO;
    this.cam.setAttribute('transform', G.camChiavi(FS_CAM, t));
    const d = this.d(t);
    G.scorriInterno(kit, d);
    // Il fascio: le corsie laterali si accendono, quella centrale c'è già.
    this.corsie.forEach((c, k) => { const c5 = k % 5; c.setAttribute('opacity', c5 === 2 ? 1 : (0.85 * eio(seg(t, 0.2 + Math.abs(c5 - 2) * 0.4, 1.6 + Math.abs(c5 - 2) * 0.4))).toFixed(3)); });
    // Le finestre scorrono con la parete: la finestra k ha il centro sopra Parco quando t = FS_PARCO[k].
    const S = 1.6, parcoX = I.centri[5];
    this.fin.forEach((f, k) => {
      const x = parcoX + d - this.dParco[k];
      f.setAttribute('transform', 'translate(' + (x - 180 * S).toFixed(1) + ' 36) scale(' + S + ')');
      const fuori = x < -700 || x > 3400;
      f.setAttribute('opacity', fuori ? 0 : 1);
      if (fuori) return;
      const ex = (parcoX - (x - 180 * S)) / S;
      this.papere[k].forEach(p => {
        const t0 = FS_PARCO[k] - 0.7 + p.quando * 1.4, u = seg(t, t0, t0 + 0.4);
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
      g.setAttribute('opacity', x < -900 || x > 3600 ? 0 : 1);
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
