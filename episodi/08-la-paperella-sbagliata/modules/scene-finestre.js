const { seg, eo, ei, eio, lerp } = kit;
// Dentro la montagna, nel buio. Tra i passeggeri si accendono i fili di luce, tutti verso chi sta davanti. Da Chiama, in
// fondo, partono fili verso tutti: quello verso Cane brilla come una lampadina, quelli verso Emma e «si» si vedono
// appena, quelli verso i due sassolini in testa quasi per niente. Lungo il filo più forte scorre il nocciola di Cane.
// Poi il fascio di binari: clac, clac, ogni vagone sul suo binario; Chiama è tirata via. Poi le finestre sulla vasca:
// il treno rallenta, con i primi cinque l'acqua resta vuota, con Chiama si accendono le paperelle di luce. Fili e scambi,
// due volte ancora: a ogni finestra le paperelle sono più dei colori caldi dei nomi da cane; all'ultima sono sei colori
// vicini, tante per ciascuno, nessuno più forte, e nuotano tutte verso Chiama. In fondo, la luce dell'uscita.
// Si apre dal buio (la montagna di «partenza»); finisce nella luce (la riprende «vasca», fuori).
// Il treno va verso sinistra: la parete, le finestre e gli scambi scorrono verso destra.
const FN_VEL = [[0, 240], [15.4, 240], [16.8, 520], [19.8, 520], [21.0, 40], [23.4, 40], [24.4, 520], [29.2, 520], [30.4, 40],
  [32.8, 40], [33.8, 520], [37.8, 520], [39.0, 30], [44.0, 30], [45.4, 320]];
// Quando l'ultimo vagone, Chiama, passa sotto il centro di ogni finestra.
const FN_CHIAMA = [21.4, 30.8, 39.4];
const FN_CAM = [
  { t: 0, cx: 1380, cy: 540, z: 0.8 },
  { t: 6.4, cx: 1380, cy: 540, z: 0.8 },
  { t: 8.4, cx: 1570, cy: 520, z: 0.92 },
  { t: 13.8, cx: 1570, cy: 520, z: 0.92 },
  { t: 15.0, cx: 1380, cy: 560, z: 0.8 },
  { t: 19.4, cx: 1380, cy: 560, z: 0.8 },
  { t: 21.0, cx: 2000, cy: 480, z: 1.02 },
  { t: 23.4, cx: 2000, cy: 480, z: 1.02 },
  { t: 24.6, cx: 1380, cy: 560, z: 0.8 },
  { t: 28.8, cx: 1380, cy: 560, z: 0.8 },
  { t: 30.4, cx: 2000, cy: 480, z: 1.02 },
  { t: 32.6, cx: 2000, cy: 480, z: 1.02 },
  { t: 33.8, cx: 1380, cy: 560, z: 0.8 },
  { t: 37.4, cx: 1380, cy: 560, z: 0.8 },
  { t: 39.2, cx: 2290, cy: 410, z: 1.5 },
  { t: 44.4, cx: 2290, cy: 410, z: 1.5 },
  { t: 46.6, cx: 1800, cy: 520, z: 1.0 },
];
// I fili del primo tratto: quando si accendono quelli degli altri, quelli di Chiama, quando scorrono i colori.
const FN_FILI = { altri: 2.2, chiama: 4.8, piano: [6.6, 7.4], colore: [9.0, 13.0], scorre: [7.0, 14.0], spegne: [13.8, 14.8] };
// I tre tratti: gli scambi di ogni vagone (corsia di partenza e di arrivo) e, nei tratti 2 e 3, i fili veloci.
const FN_TRATTI = [
  { fili: null, t: 14.8, corsie: [[2, 1], [2, 3], [2, 1], [2, 3], [2, 1], [2, 3]] },
  { fili: 23.8, t: 24.6, corsie: [[1, 0], [3, 2], [1, 2], [3, 4], [1, 0], [3, 4]] },
  { fili: 32.6, t: 33.4, corsie: [[0, 1], [2, 3], [2, 1], [4, 3], [0, 1], [4, 3]] },
];
const FN_LUCE = [45.0, 47.6];
const FN_PAROLE = ['Il', 'cane', 'di', 'Emma', 'si', 'chiama'];
kit.scene('finestre', {
  init(kit) {
    const G = window.G, D = G.MOD.cane, P = D.passeggeri, C = G.C, I = G.INTERNO;
    const forme = { Il: 0, di: 1, si: 2 };
    this.tipi = FN_PAROLE.map(w => w === 'cane' ? 'cane' : w === 'Emma' ? 'emma' : w === 'chiama' ? 'chiama' : 'sasso');
    this.opz = FN_PAROLE.map(w => w in forme ? { forma: forme[w] } : {});
    // I colori di ognuno: il biglietto, poi dopo ogni tratto. Chiama passa anche per il colore dopo i fili.
    this.col = FN_PAROLE.map(w => [P[w].biglietto].concat(P[w].tratti));
    this.chiamaFili = P.chiama.dopo_fili;
    const finestre = FN_CHIAMA.map((_, k) => '<g class="fn-finestra" data-k="' + k + '">' + G.finestra('f8' + k) + '</g>').join('');
    // Gli scambi: uno per vagone e per tratto, con il disco che scatta da solo.
    const scambi = FN_TRATTI.map((tr, n) => tr.corsie.map(([da, a], i) => {
      const yd = I.corsie[da], ya = I.corsie[a];
      return '<g class="fn-scambio" data-n="' + n + '" data-i="' + i + '"><path d="M0 ' + ya + ' C60 ' + ya + ' 80 ' + yd + ' 160 ' + yd + '" stroke="' + C.acciaio + '" stroke-width="5" fill="none"/>' +
        '<g transform="translate(150 ' + (Math.max(yd, ya) + 46) + ')"><rect x="-4" y="-34" width="8" height="40" fill="' + C.acciaioScuro + '"/><g class="fn-disco"><circle cy="-40" r="14" fill="' + C.rosso + '" stroke="' + C.crema + '" stroke-width="3"/><rect x="-12" y="-43" width="24" height="6" fill="' + C.crema + '"/></g></g></g>';
    }).join('')).join('');
    // Il treno è di sei vagoni: lo sfondo e i binari continuano oltre l'ultimo.
    const lungo = '<rect x="-2000" y="-1200" width="7000" height="3400" fill="#07060F"/><rect x="-2000" y="0" width="7000" height="1080" fill="url(#g-interno)"/>';
    const binariOltre = I.corsie.map(y => '<g><path d="M2380 ' + (y + 6) + ' L5200 ' + (y + 6) + '" stroke="' + C.legnoScuro + '" stroke-width="14" stroke-dasharray="6 22" class="g-traversine"/><path d="M2380 ' + y + ' L5200 ' + y + '" stroke="' + C.acciaio + '" stroke-width="4" opacity=".85"/></g>').join('');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + G.interniDefs +
      '<defs><radialGradient id="g-uscita" cx="0" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="fn-cam">' + lungo + G.interno(FN_PAROLE.map((w, i) => ({ tipo: this.tipi[i], col: this.col[i][0] })), { corsie: I.corsie, finestre }) + '</g>' +
      '<rect class="fn-luce" x="-200" y="-200" width="2400" height="1480" fill="url(#g-uscita)" opacity="0"/>' +
      '<rect class="fn-nero" x="-200" y="-200" width="2320" height="1480" fill="#07060F"/></svg>' +
      G.sottotitolo('NARRATORE', 'Dentro la montagna non c’è un elenco di cani da guardare. Ci sono solo i fili, gli scambi e i colori.') +
      G.sottotitolo('NARRATORE', 'Il filo più forte di Chiama va a Cane, e porta il suo colore.') +
      G.sottotitolo('NARRATORE', 'Finestra dopo finestra, le paperelle di luce prendono i colori dei nomi da cane: la pista porta dove l’hanno piegata i treni di prova.') +
      G.sottotitolo('NARRATORE', 'All’ultima finestra sono tutte nomi: tanti, vicini, e nessuno più forte degli altri.') +
      '</div>', 'finestre')));
    this.G = G;
    const q = s => kit.stage.querySelector(s);
    this.cam = q('.fn-cam'); this.luce = q('.fn-luce'); this.nero = q('.fn-nero');
    q('.g-int-binari').insertAdjacentHTML('beforeend', binariOltre + scambi);
    this.corsie = [...kit.stage.querySelectorAll('.g-int-binari > g:not(.fn-scambio)')];
    this.vag = [...kit.stage.querySelectorAll('.g-vag')];
    this.basi = this.vag.map(v => v.getAttribute('transform'));
    this.vag.forEach((v, i) => G.cambiaPasseggero(v, this.tipi[i], this.col[i][0], this.opz[i]));
    this.fin = [...kit.stage.querySelectorAll('.fn-finestra')];
    this.scambi = [...kit.stage.querySelectorAll('.fn-scambio')];
    this.d = t => G.percorso(t, 0, FN_VEL);
    this.dChiama = FN_CHIAMA.map(this.d);
    // Le paperelle di luce di ogni finestra (dal modellino). Quanto somigliano a Chiama decide quanto le nuotano incontro.
    const rgb = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
    const dist = (a, b) => { const x = rgb(a), y = rgb(b); return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]); };
    this.papere = this.fin.map((f, k) => {
      const lista = G.papereFinestra(P.chiama.finestre[k], 81 + k), ch = P.chiama.tratti[k];
      f.querySelector('.g-fin-papere').innerHTML = lista.map(p => '<g class="fn-pap"><g transform="translate(-50 -84)">' + G.paperellaDiLuce(p.col) + '</g></g>').join('');
      const els = [...f.querySelectorAll('.fn-pap')];
      return lista.map((p, i) => ({ ...p, el: els[i], sim: Math.max(0, 1 - dist(p.col, ch) / 170) }));
    });
    // I fili. Si guarda sempre avanti: da ogni passeggero verso chi gli siede davanti e verso sé stesso.
    // Nel primo tratto si disegnano piano; nei tratti 2 e 3 si accendono veloci, sulle corsie di quel momento.
    const pesi = n => {
      const out = [];
      FN_PAROLE.forEach((w, i) => {
        const f = i === 5 ? P.chiama.fili_tratti[n] : P[w].fili;
        FN_PAROLE.slice(0, i + 1).forEach((v, j) => out.push([i, j, f[v] || 0]));
      });
      return out;
    };
    const arco = (i, j, dy) => {
      if (i === j) return G.anello(i, this.tipi[i], dy[i]);
      const a = G.cima(i, this.tipi[i], dy[i]), b = G.cima(j, this.tipi[j], dy[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 70 - 0.11 * Math.abs(a[0] - b[0]);
      return 'M' + b[0].toFixed(1) + ' ' + b[1].toFixed(1) + ' Q' + mx.toFixed(1) + ' ' + my.toFixed(1) + ' ' + a[0].toFixed(1) + ' ' + a[1].toFixed(1);
    };
    // Quanto si vede un filo: anche quelli che non portano niente si vedono appena («quasi per niente»).
    this.vis = w => Math.min(1, 0.1 + 1.6 * w);
    let fili = '', punti = '';
    this.fili = [];
    [0, 1, 2].forEach(n => {
      const dy = FN_TRATTI[n].corsie.map(c => I.corsie[c[0]] - I.ruote);
      pesi(n).forEach(([i, j, w]) => {
        const ww = i === j ? 0.45 * w : w, k = this.fili.length;
        const d = arco(i, j, dy);
        fili += '<path class="fn-filo" d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + 12 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>' +
          '<path class="fn-core" d="' + d + '" fill="none" stroke="#FFFBEF" stroke-width="' + (0.8 + 4.5 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0"/>';
        // Lungo i fili di Chiama, nel primo tratto, scorrono i colori di chi gli siede davanti.
        const quanti = n === 0 && i === 5 && i !== j ? Math.round(w * 10) : 0;
        for (let p = 0; p < quanti; p++) punti += '<circle class="fn-punto" data-k="' + k + '" data-p="' + p + '" r="' + (6 + 4 * w).toFixed(1) + '" fill="' + this.col[j][0] + '" opacity="0"/>';
        this.fili.push({ n, i, j, w, quanti });
      });
    });
    const strato = q('.g-int-fili');
    strato.innerHTML = fili + punti;
    this.filiEl = [...strato.querySelectorAll('.fn-filo')]; this.coreEl = [...strato.querySelectorAll('.fn-core')];
    this.punti = [...strato.querySelectorAll('.fn-punto')];
    this.lung = this.filiEl.map(p => p.getTotalLength());
    this.filiEl.forEach((el, k) => { [el, this.coreEl[k]].forEach(e => e.setAttribute('stroke-dasharray', this.lung[k].toFixed(1))); });
    this.stato = this.vag.map(() => '');
    this.sub = G.subs(kit, [[1.0, 9.6], [9.8, 15.4], [22.0, 34.0], [39.8, 46.8]]);
  },
  render(t, kit) {
    t = window.G.tempo('08', 'finestre', t);
    const G = this.G, I = G.INTERNO;
    this.cam.setAttribute('transform', G.camChiavi(FN_CAM, t));
    this.nero.setAttribute('opacity', (1 - eio(seg(t, 0, 2.2))).toFixed(3));
    const d = this.d(t);
    G.scorriInterno(kit, d);
    // Il fascio: le corsie laterali si accendono quando arrivano gli scambi; quella centrale c'è già.
    this.corsie.forEach((c, k) => { const kk = k % 5; c.setAttribute('opacity', kk === 2 ? 1 : (0.85 * eio(seg(t, 13.6 + Math.abs(kk - 2) * 0.4, 14.6 + Math.abs(kk - 2) * 0.4))).toFixed(3)); });
    // Le finestre scorrono con la parete: la finestra k ha il centro sopra Chiama quando t = FN_CHIAMA[k].
    const S = 1.6, chX = I.centri[5];
    this.fin.forEach((f, k) => {
      const x = chX + d - this.dChiama[k];
      const fuori = x < -700 || x > 3400;
      f.setAttribute('transform', 'translate(' + (x - 180 * S).toFixed(1) + ' 36) scale(' + S + ')');
      f.setAttribute('opacity', fuori ? 0 : 1);
      if (fuori) return;
      const ex = (chX - (x - 180 * S)) / S;
      this.papere[k].forEach(p => {
        const t0 = FN_CHIAMA[k] - 0.7 + p.quando * 1.4, u = seg(t, t0, t0 + 0.4);
        if (u <= 0) { p.el.setAttribute('opacity', 0); return; }
        const v = eio(seg(t, t0 + 0.3, t0 + 2.6)) * p.sim;
        const px = p.x + Math.max(-70, Math.min(70, (ex - p.x) * 0.35)) * v, py = Math.min(204, p.y + 18 * v);
        const sc = 0.34 * (0.4 + 0.6 * eo(u)) * (1 + 0.12 * v);
        p.el.setAttribute('opacity', Math.min(1, u * 2).toFixed(3));
        p.el.setAttribute('transform', 'translate(' + px.toFixed(1) + ' ' + (py + 1.5 * Math.sin(t * 2.4 + p.x)).toFixed(1) + ') scale(' + sc.toFixed(3) + ')');
      });
    });
    // I vagoni: in quale corsia sono e di che colore, tratto dopo tratto. Chiama, sullo scambio, è tirata via.
    this.vag.forEach((v, i) => {
      let dy = 0, col = this.col[i][0], tir = 0;
      if (i === 5) col = G.mix(this.col[5][0], this.chiamaFili, Math.round(eio(seg(t, FN_FILI.colore[0], FN_FILI.colore[1])) * 16) / 16);
      FN_TRATTI.forEach((tr, n) => {
        const ts = tr.t + i * 0.3, [da, a] = tr.corsie[i], p = eio(seg(t, ts - 0.25, ts + 0.3));
        if (t >= ts - 0.25) dy = lerp(I.corsie[da], I.corsie[a], p) - I.ruote;
        const c = Math.round(eio(seg(t, ts, ts + 1.4)) * 12) / 12;
        const da0 = i === 5 && n === 0 ? this.chiamaFili : this.col[i][n];
        if (t >= ts) col = G.mix(da0, this.col[i][n + 1], c);
        if (i === 5) tir = Math.max(tir, Math.sin(Math.PI * seg(t, ts - 0.3, ts + 0.9)));
      });
      v.setAttribute('transform', 'translate(0 ' + (dy + 2 * Math.sin(t * 5 + i * 1.3)).toFixed(2) + ') ' + this.basi[i]);
      const o = Object.assign({}, this.opz[i]);
      if (i === 1) o.coda = Math.round((8 + 14 * Math.sin(t * 7)) / 4) * 4;
      if (i === 5 && tir > 0.15) o.tirata = true;
      const pass = G.cambiaPasseggero(v, this.tipi[i], col, o);
      if (i === 5) pass.setAttribute('transform', 'translate(140 40) rotate(' + (-10 * tir).toFixed(2) + ') translate(-140 -40)');
    });
    // Gli scambi scorrono con i binari; i dischi scattano da soli, uno per vagone.
    this.scambi.forEach(g => {
      const n = +g.dataset.n, i = +g.dataset.i, ts = FN_TRATTI[n].t + i * 0.3;
      const x = I.centri[i] - 80 + d - this.d(ts);
      g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' 0)');
      g.setAttribute('opacity', x < -900 || x > 3400 ? 0 : n === 0 ? eio(seg(t, 13.4, 14.4)).toFixed(3) : 1);
      g.querySelector('.fn-disco').setAttribute('transform', 'rotate(' + (90 * eio(seg(t, ts - 0.45, ts - 0.25))).toFixed(1) + ' 0 -40)');
    });
    // I fili: nel primo tratto si disegnano piano (prima quelli degli altri, poi quelli di Chiama), poi gli altri si
    // abbassano e restano accesi quelli di Chiama; nei tratti 2 e 3 si accendono e si spengono veloci.
    const F = FN_FILI;
    this.fili.forEach((f, k) => {
      let a = 0, u = 1;
      if (f.n === 0) {
        const t0 = (f.i === 5 ? F.chiama + 0.22 * f.j : F.altri + 0.4 * f.i + 0.12 * f.j);
        u = eo(seg(t, t0, t0 + 1.3));
        const giu = f.i === 5 ? 1 : 1 - 0.7 * eio(seg(t, F.piano[0], F.piano[1]));
        a = u > 0 ? giu * (1 - eio(seg(t, F.spegne[0], F.spegne[1]))) * (1 + 0.08 * Math.sin(t * 3 + k)) : 0;
      } else {
        const t0 = FN_TRATTI[f.n].fili;
        a = eio(seg(t, t0, t0 + 0.7)) * (1 - eio(seg(t, t0 + 1.6, t0 + 2.3)));
      }
      const L = this.lung[k], b = a * this.vis(f.w);
      [this.filiEl[k], this.coreEl[k]].forEach(el => el.setAttribute('stroke-dashoffset', ((1 - u) * L).toFixed(1)));
      this.filiEl[k].setAttribute('opacity', b.toFixed(3));
      this.coreEl[k].setAttribute('opacity', Math.min(1, 1.3 * b).toFixed(3));
    });
    // I colori scorrono lungo i fili di Chiama, da chi le siede davanti fino a lei: soprattutto il nocciola di Cane.
    this.punti.forEach(c => {
      const k = +c.dataset.k, pp = +c.dataset.p, f = this.fili[k], L = this.lung[k];
      const scorre = seg(t, F.scorre[0], F.scorre[0] + 1) * (1 - seg(t, F.scorre[1] - 1, F.scorre[1]));
      const u = ((t * 0.3 + pp / f.quanti) % 1);
      const pt = this.filiEl[k].getPointAtLength(u * L);
      c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1));
      c.setAttribute('opacity', (scorre * Math.min(1, u * 6, (1 - u) * 6)).toFixed(3));
    });
    this.luce.setAttribute('opacity', (0.95 * eio(seg(t, FN_LUCE[0], FN_LUCE[1]))).toFixed(3));
    this.sub(t);
  },
});
