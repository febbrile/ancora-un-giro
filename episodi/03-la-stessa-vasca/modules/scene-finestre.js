const { seg, eo, ei, eio, lerp } = kit;
// Dentro la montagna. Il primo treno fa il giro intero: si accendono i fili di luce e l'azzurro di Mare scorre verso
// Emma; clac, clac, clac, Emma è tirata via e il vestito si fa azzurro, poi blu. A ogni finestra il treno rallenta: con
// Al e Mare l'acqua resta vuota, con Emma si accendono le paperelle di luce, sempre più blu. Dietro arriva il secondo
// treno, poi il terzo: lo stesso giro, più veloce, come un'eco; alle finestre si accendono le stesse paperelle di luce,
// negli stessi posti. All'ultima finestra, tre volte, sono quasi tutte blu. In fondo, la luce dell'uscita.
// Si apre dal buio; finisce nella luce (la riprende «pesche», fuori).
// Il treno va verso sinistra: la parete, le finestre e gli scambi scorrono verso destra.
// Un giro, nel suo tempo (tau): velocità, i tre tratti (fili e scambi), quando Emma passa sotto ogni finestra.
const FI_VEL = [[0, 240], [1, 200], [6.6, 200], [7.6, 40], [9.6, 40], [10.6, 280], [13.2, 280], [14.2, 40], [16.2, 40],
  [17.2, 280], [19.4, 280], [20.4, 40], [22.4, 40], [23.4, 360]];
const FI_EMMA = [8.6, 15.2, 21.4];
const FI_TRATTI = [
  { fili: 0.8, scambi: [{ t: 4.8, da: 2, a: 3 }, { t: 5.1, da: 2, a: 1 }, { t: 5.4, da: 2, a: 1 }] },
  { fili: 10.2, scambi: [{ t: 11.8, da: 3, a: 2 }, { t: 12.1, da: 1, a: 0 }, { t: 12.4, da: 1, a: 0 }] },
  { fili: 16.6, scambi: [{ t: 18.0, da: 2, a: 3 }, { t: 18.3, da: 0, a: 1 }, { t: 18.6, da: 0, a: 1 }] },
];
// Nel primo tratto i fili restano accesi più a lungo, e l'azzurro di Mare scorre verso Emma.
const FI_PRIMI = { scorre: [1.6, 3.8], colore: [1.8, 3.6], spegne: [3.8, 4.6] };
const FI_CAM = [
  { t: 0, cx: 960, cy: 560, z: 1 },
  { t: 19.6, cx: 960, cy: 560, z: 1 },
  { t: 20.8, cx: 1190, cy: 400, z: 1.4 },
  { t: 23.0, cx: 1190, cy: 400, z: 1.4 },
];
// I tre giri: quando partono (tempo della scena), quanto vanno veloci, fino a che tau.
const FI_GIRI = [{ da: 0, v: 1, fino: 23.0 }, { da: 23.4, v: 3.4, fino: 23.0 }, { da: 30.4, v: 3.4, fino: 23.4 }];
const FI_LUCE = [36.4, 38.2];
kit.scene('finestre', {
  init(kit) {
    const G = window.G, P = G.MOD.mare.passeggeri, C = G.C, I = G.INTERNO;
    // Chi siede dove, e i suoi colori: il biglietto, poi dopo i fili del primo tratto (solo Emma cambia), poi dopo ogni tratto.
    this.chi = [
      ['al', [P.Al.biglietto, P.Al.biglietto].concat(P.Al.tratti)],
      ['mare', [P.mare.biglietto, P.mare.biglietto].concat(P.mare.tratti)],
      ['emma', [P.Emma.biglietto, P.Emma.dopo_fili].concat(P.Emma.tratti)],
    ];
    const finestre = FI_EMMA.map((_, k) => '<g class="fi-finestra" data-k="' + k + '">' + G.finestra('fi' + k) + '</g>').join('');
    const scambi = FI_TRATTI.map((tr, n) => tr.scambi.map((s, i) => {
      const yd = I.corsie[s.da], ya = I.corsie[s.a];
      return '<g class="fi-scambio" data-n="' + n + '" data-i="' + i + '"><path d="M0 ' + ya + ' C60 ' + ya + ' 80 ' + yd + ' 160 ' + yd + '" stroke="' + C.acciaio + '" stroke-width="5" fill="none"/>' +
        '<g transform="translate(150 ' + (Math.max(yd, ya) + 46) + ')"><rect x="-4" y="-34" width="8" height="40" fill="' + C.acciaioScuro + '"/><g class="fi-disco"><circle cy="-40" r="14" fill="' + C.rosso + '" stroke="' + C.crema + '" stroke-width="3"/><rect x="-12" y="-43" width="24" height="6" fill="' + C.crema + '"/></g></g></g>';
    }).join('')).join('');
    const linee = '<g class="fi-linee" opacity="0"><path d="M0 -10 L60 -14 M4 14 L70 16 M0 38 L54 42" stroke="#FFF4E0" stroke-width="4" stroke-linecap="round"/></g>';
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + G.interniDefs +
      '<defs><radialGradient id="g-uscita" cx="0" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="fi-cam">' + G.interno(this.chi.map(c => ({ tipo: c[0], col: c[1][0] })), { corsie: I.corsie, finestre }) + '</g>' +
      '<rect class="fi-nero" x="-200" y="-200" width="2320" height="1480" fill="#07060F"/>' +
      '<rect class="fi-luce" x="-200" y="-200" width="2400" height="1480" fill="url(#g-uscita)" opacity="0"/></svg>' +
      G.sottotitolo('NARRATORE', 'Dentro la montagna, i tre treni fanno lo stesso identico giro.') +
      G.sottotitolo('NARRATORE', 'Stessi fili, stessi scambi. E alle finestre, le stesse paperelle di luce.') +
      '</div>', 'finestre')));
    this.G = G;
    const q = s => kit.stage.querySelector(s);
    this.cam = q('.fi-cam'); this.luce = q('.fi-luce'); this.nero = q('.fi-nero');
    q('.g-int-binari').insertAdjacentHTML('beforeend', scambi);
    q('.g-int-treno').insertAdjacentHTML('beforeend', linee);
    this.linee = q('.fi-linee');
    this.vag = [...kit.stage.querySelectorAll('.g-vag')];
    this.basi = this.vag.map(v => v.getAttribute('transform'));
    this.corsie = [...kit.stage.querySelectorAll('.g-int-binari > g')].slice(0, I.corsie.length);
    this.fin = [...kit.stage.querySelectorAll('.fi-finestra')];
    this.scambi = [...kit.stage.querySelectorAll('.fi-scambio')];
    this.d = tau => G.percorso(tau, 0, FI_VEL);
    this.dEmma = FI_EMMA.map(this.d);
    // Le paperelle di luce di ogni finestra (dal modellino), uguali per i tre treni: stesse paperelle, stessi posti.
    const rgb = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
    const dist = (a, b) => { const x = rgb(a), y = rgb(b); return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]); };
    this.papere = this.fin.map((f, k) => {
      const lista = G.papereFinestra(P.Emma.finestre[k], 11 + k), emma = P.Emma.tratti[k];
      f.querySelector('.g-fin-papere').innerHTML = lista.map(p => '<g class="fi-pap"><g transform="translate(-50 -84)">' + G.paperellaDiLuce(p.col) + '</g></g>').join('');
      const els = [...f.querySelectorAll('.fi-pap')];
      return lista.map((p, i) => ({ ...p, el: els[i], sim: Math.max(0, 1 - dist(p.col, emma) / 170) }));
    });
    // I fili dei tre tratti: Emma verso Al, Mare e sé; Mare verso Al e sé; Al verso sé. Si guarda avanti.
    const tipi = this.chi.map(c => c[0]);
    let fili = '', punti = '';
    this.fili = [];
    FI_TRATTI.forEach((tr, n) => {
      const dy = (n === 0 ? [2, 2, 2] : tr.scambi.map(s => s.da)).map(c => I.corsie[c] - I.ruote);
      const pe = P.Emma.fili_tratti[n];
      const pesi = [[0, 0, P.Al.fili.Al], [1, 0, P.mare.fili.Al], [1, 1, P.mare.fili.mare], [2, 0, pe.Al], [2, 1, pe.mare], [2, 2, pe.Emma]];
      pesi.forEach(([i, j, w]) => {
        let d;
        if (i === j) d = G.anello(i, tipi[i], dy[i]);
        else { const a = G.cima(i, tipi[i], dy[i]), b = G.cima(j, tipi[j], dy[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 80 - 0.12 * Math.abs(a[0] - b[0]); d = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
        const ww = i === j ? 0.45 * w : w, k = this.fili.length;
        fili += '<path class="fi-filo" d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + 10 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>';
        // Nel primo tratto, lungo i fili di Emma scorrono i colori di chi le siede davanti.
        const quanti = n === 0 && i === 2 && i !== j ? Math.max(1, Math.round(w * 9)) : 0;
        for (let p = 0; p < quanti; p++) punti += '<circle class="fi-punto" data-k="' + k + '" data-p="' + p + '" r="' + (5 + 3 * w).toFixed(1) + '" fill="' + this.chi[j][1][0] + '" opacity="0"/>';
        this.fili.push({ n, i, j, w, quanti });
      });
    });
    q('.g-int-fili').innerHTML = fili + punti;
    this.filiEl = [...kit.stage.querySelectorAll('.fi-filo')];
    this.punti = [...kit.stage.querySelectorAll('.fi-punto')];
    this.lung = this.filiEl.map(p => p.getTotalLength());
    this.sub = G.subs(kit, [[1.0, 7.0], [30.2, 36.4]]);
  },
  render(t, kit) {
    t = window.G.tempo('03', 'finestre', t);
    const G = this.G, I = G.INTERNO;
    // Quale giro si vede, e a che punto è (tau). Tra un giro e l'altro, un attimo di buio.
    let g = 0;
    FI_GIRI.forEach((x, k) => { if (t >= x.da - 0.2) g = k; });
    const giro = FI_GIRI[g], tau = Math.min(giro.fino, Math.max(0, (t - giro.da) * giro.v));
    const buio = g === 0 ? 1 - eio(seg(t, 0, 1.4)) : Math.max(0, 1 - Math.abs(t - giro.da + 0.05) / 0.3);
    const fineGiro = g < 2 ? seg(t, FI_GIRI[g + 1].da - 0.5, FI_GIRI[g + 1].da - 0.2) : 0;
    this.nero.setAttribute('opacity', Math.min(1, buio + fineGiro).toFixed(3));
    this.cam.setAttribute('transform', G.camChiavi(FI_CAM, tau));
    const d = this.d(tau);
    G.scorriInterno(kit, d);
    // Il fascio: le corsie laterali si accendono, quella centrale c'è già.
    this.corsie.forEach((c, k) => c.setAttribute('opacity', k === 2 ? 1 : (0.85 * eio(seg(tau, 2.6 + Math.abs(k - 2) * 0.4, 4.0 + Math.abs(k - 2) * 0.4))).toFixed(3)));
    // Le finestre scorrono con la parete: la finestra k ha il centro sopra Emma quando tau = FI_EMMA[k].
    const S = 1.6, emmaX = I.centri[2];
    this.fin.forEach((f, k) => {
      const x = emmaX + d - this.dEmma[k];
      const fuori = x < -500 || x > 2500;
      f.setAttribute('transform', 'translate(' + (x - 180 * S).toFixed(1) + ' 36) scale(' + S + ')');
      f.setAttribute('opacity', fuori ? 0 : 1);
      if (fuori) return;
      const ex = (emmaX - (x - 180 * S)) / S;
      this.papere[k].forEach(p => {
        const t0 = FI_EMMA[k] - 0.7 + p.quando * 1.4, u = seg(tau, t0, t0 + 0.4);
        if (u <= 0) { p.el.setAttribute('opacity', 0); return; }
        const v = eio(seg(tau, t0 + 0.3, t0 + 2.6)) * p.sim;
        const px = p.x + Math.max(-60, Math.min(60, (ex - p.x) * 0.3)) * v, py = Math.min(204, p.y + 18 * v);
        const sc = 0.34 * (0.4 + 0.6 * eo(u)) * (1 + 0.12 * v);
        p.el.setAttribute('opacity', Math.min(1, u * 2).toFixed(3));
        p.el.setAttribute('transform', 'translate(' + px.toFixed(1) + ' ' + (py + 1.5 * Math.sin(t * 2.4 + p.x)).toFixed(1) + ') scale(' + sc.toFixed(3) + ')');
      });
    });
    // I vagoni: in quale corsia sono, di che colore, tratto dopo tratto. Emma, sullo scambio, è tirata via.
    let linee = 0;
    this.vag.forEach((v, i) => {
      const tappe = this.chi[i][1];
      let dy = I.corsie[2] - I.ruote, tir = 0;
      // I fili del primo tratto: il vestito di Emma va dal colore del biglietto a quello dopo i fili.
      let col = G.mix(tappe[0], tappe[1], Math.round(eio(seg(tau, FI_PRIMI.colore[0], FI_PRIMI.colore[1])) * 16) / 16);
      FI_TRATTI.forEach((tr, n) => {
        const s = tr.scambi[i], p = eio(seg(tau, s.t - 0.25, s.t + 0.3));
        if (tau >= s.t - 0.25) dy = lerp(I.corsie[s.da], I.corsie[s.a], p) - I.ruote;
        const c = Math.round(eio(seg(tau, s.t, s.t + 1.4)) * 12) / 12;
        if (tau >= s.t) col = G.mix(tappe[n + 1], tappe[n + 2], c);
        tir = Math.max(tir, Math.sin(Math.PI * seg(tau, s.t - 0.3, s.t + 0.9)));
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
    this.scambi.forEach(el => {
      const n = +el.dataset.n, i = +el.dataset.i, s = FI_TRATTI[n].scambi[i];
      const x = I.centri[i] - 80 + d - this.d(s.t);
      el.setAttribute('transform', 'translate(' + x.toFixed(1) + ' 0)');
      el.setAttribute('opacity', x < -300 || x > 2200 ? 0 : 1);
      el.querySelector('.fi-disco').setAttribute('transform', 'rotate(' + (90 * eio(seg(tau, s.t - 0.45, s.t - 0.25))).toFixed(1) + ' 0 -40)');
    });
    // I fili: nel primo tratto si disegnano da chi guarda e restano accesi; negli altri si accendono e si spengono.
    this.filiEl.forEach((el, k) => {
      const f = this.fili[k], t0 = FI_TRATTI[f.n].fili;
      let a;
      if (f.n === 0) {
        const t1 = t0 + 0.5 * f.i + 0.2 * f.j, u = eo(seg(tau, t1, t1 + 1.0)), L = this.lung[k];
        el.setAttribute('stroke-dasharray', L.toFixed(1)); el.setAttribute('stroke-dashoffset', ((1 - u) * L).toFixed(1));
        a = (u > 0 ? 1 : 0) * (1 - eio(seg(tau, FI_PRIMI.spegne[0], FI_PRIMI.spegne[1])));
      } else a = eio(seg(tau, t0, t0 + 0.6)) * (1 - eio(seg(tau, t0 + 1.8, t0 + 2.6)));
      el.setAttribute('opacity', (a * (0.25 + 0.75 * f.w)).toFixed(3));
    });
    this.punti.forEach(c => {
      const k = +c.dataset.k, pp = +c.dataset.p, f = this.fili[k], L = this.lung[k];
      const scorre = seg(tau, FI_PRIMI.scorre[0], FI_PRIMI.scorre[0] + 0.6) * (1 - seg(tau, FI_PRIMI.scorre[1] - 0.6, FI_PRIMI.scorre[1]));
      const u = ((tau * 0.5 + pp / f.quanti) % 1);
      const pt = this.filiEl[k].getPointAtLength(u * L);
      c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1));
      c.setAttribute('opacity', (scorre * Math.min(1, u * 6, (1 - u) * 6)).toFixed(3));
    });
    this.luce.setAttribute('opacity', (0.95 * eio(seg(t, FI_LUCE[0], FI_LUCE[1]))).toFixed(3));
    this.sub(t);
  },
});
