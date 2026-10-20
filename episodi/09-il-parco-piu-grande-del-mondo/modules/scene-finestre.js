const { seg, eo, ei, eio, lerp } = kit;
// Dentro la montagna (Ada è rimasta fuori: entriamo noi). Il treno di Al, Mare ed Emma corre in un fascio di binari
// largo come un'autostrada, binari paralleli che si perdono nel buio, sopra e sotto. Si accendono i fili di luce: Al ha
// il suo anello, Mare i suoi fili verso Al e verso di sé, e il filo più forte di Emma va a Mare. Clac, clac: gli scambi
// spostano ogni vagone sul suo binario, Emma è tirata via. Poi la prima finestra sulla vasca: il treno rallenta; con Al
// e Mare l'acqua resta vuota, con Emma si accendono le paperelle di luce. A montaggio, sempre più veloce, una cima dopo
// l'altra, una finestra dopo l'altra (G.MOD.grande.finestre: 24 finestre da 400 paperelle di luce): per tante finestre
// le paperelle restano di tutti i colori, il vestito di Emma si fa viola (emma_finestre); alle ultime cresce il viola e
// le nuota incontro. All'ultima finestra la camera si avvicina: è il lago che aspetta fuori. In fondo, la luce dell'uscita.
// Si apre dal buio, dopo «frase»; finisce nella luce (la riprende «lago», fuori).
const FS_VEL = [[0, 260], [10.4, 260], [12.2, 50], [15.2, 50], [16.6, 700], [20, 1300], [28, 1900], [31, 1900], [33.6, 700], [34.8, 50], [38.6, 50], [40, 500], [42, 900]];
// Quando Emma passa sotto la prima e sotto l'ultima finestra; le altre stanno a distanze uguali, in mezzo.
const FS_PRIMA = 13.6, FS_ULTIMA = 36.0;
const FS_CAM = [
  { t: 0, cx: 960, cy: 540, z: 1 },
  { t: 2.4, cx: 960, cy: 540, z: 1 },
  { t: 4.2, cx: 1000, cy: 580, z: 1.28 },
  { t: 8.6, cx: 1000, cy: 580, z: 1.28 },
  { t: 10.2, cx: 960, cy: 540, z: 1 },
  { t: 12.4, cx: 1120, cy: 450, z: 1.3 },
  { t: 15.6, cx: 1120, cy: 450, z: 1.3 },
  { t: 16.8, cx: 960, cy: 540, z: 1 },
  { t: 33.8, cx: 960, cy: 540, z: 1 },
  { t: 35.8, cx: 1170, cy: 390, z: 1.55 },
  { t: 39.2, cx: 1170, cy: 390, z: 1.55 },
  { t: 41.2, cx: 1000, cy: 480, z: 1.15 },
];
const FS_FILI = { accende: 2.4, colore: [5.0, 8.4], scorre: [4.4, 8.6], spegne: [8.6, 9.6] };
// I primi scambi (lenti, con le leve): Al sale di un binario, Mare ed Emma scendono.
const FS_SCAMBI = [{ t: 10.0, a: 1 }, { t: 10.3, a: -1 }, { t: 10.6, a: -1 }];
const FS_LUCE = [39.4, 42.0];
const FS_S = 1.8, FS_N = 400;
kit.scene('finestre', {
  init(kit) {
    const G = window.G, C = G.C, I = G.INTERNO, D = G.MOD.grande, B = D.biglietti;
    this.D = D;
    this.chi = [['al', B.Al, D.uscita.Al], ['mare', B.mare, D.uscita.mare], ['emma', B.Emma, D.uscita.Emma]];
    // Il fascio: binari ogni 40, sopra e sotto quello del treno, fino a perdersi nel buio.
    const corsie = [];
    for (let y = I.ruote - 1120; y <= I.ruote + 640; y += 40) corsie.push(y);
    this.corsieY = corsie;
    // Tre finestre (si scambiano le cime: la finestra k usa la numero k % 3), e tre costoloni di roccia tra una cima e l'altra.
    const papere = '<g class="fs-pap-in"></g>';
    const fin = [0, 1, 2].map(j => '<g class="fs-finestra" data-j="' + j + '" opacity="0">' + G.finestra('fs9-' + j).replace('<g class="g-fin-papere"></g>', '<g class="g-fin-papere">' + papere + '</g>') + '</g>').join('');
    const costole = [0, 1, 2].map(j => '<g class="fs-costola" opacity="0"><path d="M-110 -260 Q0 -300 110 -260 L84 1340 L-84 1340 Z" fill="#0D0A20" stroke="#2A2450" stroke-width="6"/><path d="M-60 -240 L-40 1300" stroke="#1E1A3A" stroke-width="10"/></g>').join('');
    const leve = FS_SCAMBI.map((s, i) => {
      const yd = I.ruote, ya = I.ruote + 40 * s.a;
      return '<g class="fs-scambio"><path d="M0 ' + ya + ' C60 ' + ya + ' 80 ' + yd + ' 160 ' + yd + '" stroke="' + C.acciaio + '" stroke-width="5" fill="none"/>' +
        '<g transform="translate(150 ' + (Math.max(yd, ya) + 46) + ')"><rect x="-4" y="-34" width="8" height="40" fill="' + C.acciaioScuro + '"/><g class="fs-disco"><circle cy="-40" r="14" fill="' + C.rosso + '" stroke="' + C.crema + '" stroke-width="3"/><rect x="-12" y="-43" width="24" height="6" fill="' + C.crema + '"/></g></g></g>';
    }).join('');
    const linee = '<g class="fs-linee" opacity="0"><path d="M0 -10 L60 -14 M4 14 L70 16 M0 38 L54 42" stroke="#FFF4E0" stroke-width="4" stroke-linecap="round"/></g>';
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + G.interniDefs + G.PARCO.defs +
      '<defs><radialGradient id="g-uscita" cx="0" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="fs-cam">' + G.interno(this.chi.map(c => ({ tipo: c[0], col: c[1] })), { corsie, finestre: fin, seme: 19 }) + '</g>' +
      '<rect class="fs-nero" x="-200" y="-200" width="2320" height="1480" fill="#07060F"/>' +
      '<rect class="fs-luce" x="-200" y="-200" width="2400" height="1480" fill="url(#g-uscita)" opacity="0"/></svg>' +
      G.sottotitolo('NARRATORE', 'Dentro, fili di luce e scambi, come sempre. Solo che qui i binari sono un’autostrada, e le cime non finiscono mai.') +
      G.sottotitolo('NARRATORE', 'Per tante finestre le paperelle di luce sono di tutti i colori. Solo verso le ultime cime cresce il viola, come il vestito di Emma.') +
      '</div>', 'finestre').replace(/href="#g-/g, 'href="#finestre-g-')));
    this.G = G;
    const q = s => kit.stage.querySelector(s), qa = s => [...kit.stage.querySelectorAll(s)];
    this.cam = q('.fs-cam'); this.nero = q('.fs-nero'); this.luce = q('.fs-luce');
    q('.g-int-binari').insertAdjacentHTML('beforeend', leve);
    q('.g-int-finestre').insertAdjacentHTML('afterend', '<g class="fs-costole">' + costole + '</g>');
    q('.g-int-treno').insertAdjacentHTML('beforeend', linee);
    this.linee = q('.fs-linee'); this.leve = qa('.fs-scambio'); this.costole = qa('.fs-costola');
    this.vag = qa('.g-vag');
    this.basi = this.vag.map(v => v.getAttribute('transform'));
    // I binari si perdono nel buio: più sono lontani da quello del treno, meno si vedono.
    this.binari = qa('.g-int-binari > g').slice(0, corsie.length);
    this.binari.forEach((b, k) => b.setAttribute('data-op', Math.max(0.03, 0.9 - Math.abs(corsie[k] - I.ruote) / 520).toFixed(2)));
    // La strada: d(t), e dove stanno le finestre (dove Emma passa sotto il loro centro).
    this.d = t => G.percorso(t, 0, FS_VEL);
    const d0 = this.d(FS_PRIMA), d1 = this.d(FS_ULTIMA);
    this.dFin = []; for (let k = 0; k < 24; k++) this.dFin.push(d0 + (d1 - d0) * k / 23);
    this.tFin = this.dFin.map(dd => { let lo = 0, hi = 42; for (let n = 0; n < 40; n++) { const mid = (lo + hi) / 2; if (this.d(mid) < dd) lo = mid; else hi = mid; } return lo; });
    // Le finestre: 400 posti ciascuna, sparsi nell'acqua; i colori cambiano con la cima.
    const rP = G.rng(31), posti = [];
    for (let i = 0; i < FS_N; i++) { const riga = Math.floor(i / 25), c = i % 25; posti.push({ x: 18 + c * 13.2 + (riga % 2) * 6 + (rP() - 0.5) * 5, y: 86 + riga * 8.6 + (rP() - 0.5) * 4, quando: rP() }); }
    this.posti = posti;
    this.fin = qa('.fs-finestra').map(f => {
      const box = f.querySelector('.fs-pap-in');
      box.innerHTML = posti.map(() => '<use href="#finestre-g-pi-papl" fill="#FFFFFF" opacity="0"/>').join('');
      return { f, els: [...box.children], k: -1, col: [], sim: [] };
    });
    const rgb = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
    this.dist = (a, b) => { const x = rgb(a), y = rgb(b); return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]); };
    // I fili: Al verso sé; Mare verso Al e verso sé; Emma verso Al, Mare (il più forte) e sé.
    const tipi = this.chi.map(c => c[0]), fe = D.fili_emma;
    const pesi = [[0, 0, 1], [1, 0, 0.5], [1, 1, 0.5], [2, 0, fe.Al], [2, 1, fe.mare], [2, 2, fe.Emma]];
    let fili = '', punti = '';
    this.fili = [];
    pesi.forEach(([i, j, w]) => {
      let d;
      if (i === j) d = G.anello(i, tipi[i]);
      else { const a = G.cima(i, tipi[i]), b = G.cima(j, tipi[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 80 - 0.12 * Math.abs(a[0] - b[0]); d = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
      const ww = i === j ? 0.45 * w : w, k = this.fili.length, quanti = i === 2 && i !== j ? Math.max(1, Math.round(w * 9)) : 0;
      fili += '<path class="fs-filo" d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + 10 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>' +
        '<path class="fs-core" d="' + d + '" fill="none" stroke="#FFFBEF" stroke-width="' + (0.8 + 4 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0"/>';
      for (let p = 0; p < quanti; p++) punti += '<circle class="fs-punto" data-k="' + k + '" data-p="' + p + '" r="' + (5 + 3 * w).toFixed(1) + '" fill="' + this.chi[j][1] + '" opacity="0"/>';
      this.fili.push({ i, j, w, quanti });
    });
    const strato = q('.g-int-fili');
    strato.innerHTML = fili + punti;
    this.filiEl = [...strato.querySelectorAll('.fs-filo')]; this.coreEl = [...strato.querySelectorAll('.fs-core')];
    this.punti = [...strato.querySelectorAll('.fs-punto')];
    this.lung = this.filiEl.map(p => p.getTotalLength());
    this.sub = G.subs(kit, [[1.0, 11.4], [27.6, 39.2]]);
  },
  // Dove sta il treno tra le finestre: 0 alla prima, 23 all'ultima (con i decimali in mezzo).
  indice(d) { const a = this.dFin[0], b = this.dFin[23]; return Math.max(0, Math.min(23, (d - a) / (b - a) * 23)); },
  render(t, kit) {
    t = window.G.tempo('09', 'finestre', t);
    const G = this.G, I = G.INTERNO, D = this.D;
    this.cam.setAttribute('transform', G.camChiavi(FS_CAM, t));
    this.nero.setAttribute('opacity', (1 - eio(seg(t, 0, 2.0))).toFixed(3));
    const d = this.d(t);
    G.scorriInterno(kit, d);
    // Il fascio di binari: si accende dal centro verso il buio.
    this.binari.forEach((b, k) => { const dist = Math.abs(this.corsieY[k] - I.ruote) / 40; b.setAttribute('opacity', (+b.dataset.op * eio(seg(t, 0.4 + dist * 0.08, 1.6 + dist * 0.08))).toFixed(3)); });
    // I vestiti: Emma dal biglietto al grigio della prima finestra (i fili), poi finestra dopo finestra fino al viola;
    // Al e Mare, piano, dal colore del biglietto a quello dell'uscita.
    const kk = this.indice(d), k0 = Math.floor(kk), fr = kk - k0, EF = D.emma_finestre;
    const emma = t < FS_PRIMA ? G.mix(this.chi[2][1], EF[0], Math.round(eio(seg(t, FS_FILI.colore[0], FS_FILI.colore[1])) * 16) / 16) : G.mix(EF[k0], EF[Math.min(23, k0 + 1)], eio(fr));
    const cols = [G.mix(this.chi[0][1], this.chi[0][2], kk / 23), G.mix(this.chi[1][1], this.chi[1][2], kk / 23), emma];
    // Gli scambi: i primi, lenti; poi, a ogni cima, ogni vagone passa su un binario vicino (alla fine Emma è tirata via).
    let linee = 0;
    this.vag.forEach((v, i) => {
      let off = 0, tir = 0;
      const s = FS_SCAMBI[i];
      off = s.a * eio(seg(t, s.t - 0.25, s.t + 0.3));
      tir = Math.sin(Math.PI * seg(t, s.t - 0.3, s.t + 0.9));
      if (kk > 0) {
        const passi = [1, -1, 0, -1, 1, 1, -1, 0, 1, -1, -1, 1, 0, 1, -1, 1, -1, 0, -1, 1, 1, -1, 0, 1];
        for (let k = 1; k <= Math.min(23, k0 + 1); k++) {
          const p = seg(kk, k - 0.62, k - 0.45);
          off += passi[(k + i * 7) % 24] * (k <= k0 ? 1 : p) * 0.5;
        }
        if (i === 2) tir = Math.max(tir, Math.sin(Math.PI * seg(t, FS_ULTIMA - 1.6, FS_ULTIMA - 0.4)));
      }
      const dy = 40 * off;
      v.setAttribute('transform', 'translate(0 ' + (dy + 2 * Math.sin(t * 5 + i * 1.3)).toFixed(2) + ') ' + this.basi[i]);
      if (i === 2) {
        const pass = G.cambiaPasseggero(v, 'emma', cols[2], tir > 0.15 ? { tirata: true } : {});
        pass.setAttribute('transform', 'translate(140 40) rotate(' + (-13 * tir).toFixed(2) + ') translate(-140 -40)');
        const [hx, hy] = G.testa(2, 'emma', dy);
        this.linee.setAttribute('transform', 'translate(' + (hx + 70) + ' ' + hy + ')');
        linee = 0.7 * tir;
      } else G.cambiaPasseggero(v, this.chi[i][0], cols[i]);
    });
    this.linee.setAttribute('opacity', linee.toFixed(3));
    // Le leve dei primi scambi scorrono con i binari e scattano da sole.
    this.leve.forEach((g, i) => {
      const s = FS_SCAMBI[i], x = I.centri[i] - 80 + d - this.d(s.t);
      g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' 0)');
      g.setAttribute('opacity', x < -300 || x > 2200 ? 0 : 1);
      g.querySelector('.fs-disco').setAttribute('transform', 'rotate(' + (90 * eio(seg(t, s.t - 0.45, s.t - 0.25))).toFixed(1) + ' 0 -40)');
    });
    // I fili: si disegnano da chi guarda, i colori scorrono fino a Emma, poi si spengono.
    const F = FS_FILI;
    this.fili.forEach((f, k) => {
      const t0 = F.accende + 0.7 * f.i + 0.25 * f.j, u = eo(seg(t, t0, t0 + 1.4)), L = this.lung[k];
      [this.filiEl[k], this.coreEl[k]].forEach(el => { el.setAttribute('stroke-dasharray', L.toFixed(1)); el.setAttribute('stroke-dashoffset', ((1 - u) * L).toFixed(1)); });
      const brilla = (0.25 + 0.75 * f.w) * (1 - eio(seg(t, F.spegne[0], F.spegne[1]))) * (1 + 0.08 * Math.sin(t * 3 + k));
      this.filiEl[k].setAttribute('opacity', (u > 0 ? brilla : 0).toFixed(3));
      this.coreEl[k].setAttribute('opacity', (u > 0 ? Math.min(1, 1.3 * brilla) : 0).toFixed(3));
    });
    this.punti.forEach(c => {
      const k = +c.dataset.k, pp = +c.dataset.p, f = this.fili[k], L = this.lung[k];
      const scorre = seg(t, F.scorre[0], F.scorre[0] + 1) * (1 - seg(t, F.scorre[1] - 1, F.scorre[1]));
      if (scorre <= 0) { c.setAttribute('opacity', 0); return; }
      const u = ((t * 0.32 + pp / f.quanti) % 1), pt = this.filiEl[k].getPointAtLength(u * L);
      c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1));
      c.setAttribute('opacity', (scorre * Math.min(1, u * 6, (1 - u) * 6)).toFixed(3));
    });
    // Le costole di roccia: una tra una cima e l'altra.
    const emmaX = I.centri[2];
    this.costole.forEach((c, j) => {
      let best = null;
      for (let k = j; k < 25; k += 3) { const dc = k === 0 ? this.dFin[0] - 1400 : (this.dFin[k - 1] + (this.dFin[Math.min(23, k)] - this.dFin[k - 1]) / 2); const x = emmaX + d - dc + 500; if (k < 24 && x > -400 && x < 2400) best = x; }
      c.setAttribute('opacity', best === null || t < FS_PRIMA + 1.5 ? 0 : 1);
      if (best !== null) c.setAttribute('transform', 'translate(' + best.toFixed(1) + ' 0)');
    });
    // Le finestre: scorrono con la parete; quando passa Emma si accendono le paperelle di luce della sua cima.
    this.fin.forEach((F2, j) => {
      let k = -1, x = 0;
      for (let kk2 = j; kk2 < 24; kk2 += 3) { const xx = emmaX + d - this.dFin[kk2]; if (xx > -700 && xx < 2620) { k = kk2; x = xx; } }
      if (k < 0) { F2.f.setAttribute('opacity', 0); return; }
      F2.f.setAttribute('opacity', 1);
      F2.f.setAttribute('transform', 'translate(' + (x - 180 * FS_S).toFixed(1) + ' 36) scale(' + FS_S + ')');
      if (F2.k !== k) {
        // I colori di questa cima, mescolati in modo ripetibile; quanto somigliano al vestito di Emma qui.
        const r = G.rng(200 + k), lista = [];
        D.finestre[k].forEach(([w, n, col]) => { for (let a = 0; a < n; a++) lista.push(col); });
        for (let a = lista.length - 1; a > 0; a--) { const b = Math.floor(r() * (a + 1)); [lista[a], lista[b]] = [lista[b], lista[a]]; }
        F2.col = lista; F2.sim = lista.map(c => Math.max(0, 1 - this.dist(c, D.emma_finestre[k]) / 150));
        F2.els.forEach((el, i) => el.setAttribute('fill', lista[i]));
        F2.k = k;
      }
      const tk = this.tFin[k], gap = k === 0 || k === 23 ? 1.4 : Math.max(0.25, Math.min(1.2, (this.tFin[Math.min(23, k + 1)] - tk) * 0.6));
      const ex = (emmaX - (x - 180 * FS_S)) / FS_S;
      F2.els.forEach((el, i) => {
        const p = this.posti[i], t0 = tk - gap / 2 + p.quando * gap, u = seg(t, t0, t0 + 0.3);
        if (u <= 0) { if (el.__v !== 0) { el.setAttribute('opacity', 0); el.__v = 0; } return; }
        const v = eio(seg(t, t0 + 0.2, t0 + 2.4)) * F2.sim[i];
        const px = p.x + Math.max(-70, Math.min(70, (ex - p.x) * 0.35)) * v, py = Math.min(216, p.y + 16 * v);
        const sc = 0.13 * (0.4 + 0.6 * eo(u)) * (1 + 0.15 * v);
        el.setAttribute('opacity', Math.min(1, u * 2).toFixed(2)); el.__v = 1;
        el.setAttribute('transform', 'translate(' + px.toFixed(1) + ' ' + (py + Math.sin(t * 2.4 + i)).toFixed(1) + ') scale(' + sc.toFixed(3) + ') translate(-50 -84)');
      });
    });
    this.luce.setAttribute('opacity', (0.95 * eio(seg(t, FS_LUCE[0], FS_LUCE[1]))).toFixed(3));
    this.sub(t);
  },
});
