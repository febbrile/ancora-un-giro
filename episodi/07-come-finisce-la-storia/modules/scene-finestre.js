const { seg, eo, eio, lerp } = kit;
// Dentro la montagna, nel buio. Il treno è lungo sette vagoni: in fondo la paperella grigio
// chiaro del punto, davanti a lei la paperella turchese. Si accendono i fili di luce, da ogni passeggero verso chi gli
// siede davanti e verso sé stesso; clac, clac, clac: gli scambi spostano ogni vagone sul suo binario. Poi, nella parete,
// la finestra ad arco sull'acqua della vasca: passa sopra tutti i vagoni, e l'acqua resta vuota; passa l'ultimo e si
// accendono le paperelle di luce. Fili, scambi, finestre, tre volte: la paperella del punto si fa scura, e finestra dopo
// finestra le paperelle di luce sono sempre più del colore della notte. In fondo, la luce dell'uscita.
// Si apre dal buio (il treno è appena entrato, alla fine di «punto»); finisce nella luce (la riprende «vasca», fuori).
// Il treno va verso sinistra: la parete, le finestre e gli scambi scorrono verso destra.
const FT_VEL = [[0, 300], [7.0, 300], [7.6, 520], [11.4, 520], [12.4, 40], [13.8, 40], [14.6, 520], [20.8, 520], [21.8, 40], [23.2, 40],
  [24.0, 520], [30.2, 520], [31.2, 40], [31.8, 30], [37.6, 30], [39.0, 320]];
// Quando l'ultimo vagone, il punto, passa sotto il centro di ogni finestra.
const FT_ULTIMO = [13.0, 22.4, 31.8];
const FT_CAM = [
  // Tutto il treno.
  { t: 0, cx: 1570, cy: 560, z: 0.62 },
  { t: 10.6, cx: 1570, cy: 560, z: 0.62 },
  // Gli ultimi vagoni, dove passa la finestra.
  { t: 12.0, cx: 2290, cy: 520, z: 0.86 },
  { t: 30.2, cx: 2290, cy: 520, z: 0.86 },
  // L'ultima finestra, da vicino.
  { t: 31.6, cx: 2650, cy: 470, z: 1.25 },
  { t: 37.4, cx: 2650, cy: 470, z: 1.25 },
  { t: 39.8, cx: 2290, cy: 520, z: 0.86 },
];
// I tre tratti: quando si accendono i fili e quando scattano gli scambi (da una corsia all'altra), vagone per vagone.
const FT_CORSIE = [[2, 2, 2, 2, 2, 2, 2], [3, 1, 1, 3, 1, 3, 1], [2, 0, 0, 4, 2, 2, 2], [3, 1, 1, 3, 1, 3, 1]];
const FT_TRATTI = [
  { fili: 1.6, disegna: 0.3, spegne: [5.6, 6.4], scambi: 6.2, passo: 0.2 },
  { fili: 15.0, disegna: 0.08, spegne: [16.6, 17.4], scambi: 16.6, passo: 0.16 },
  { fili: 24.4, disegna: 0.08, spegne: [26.0, 26.8], scambi: 26.0, passo: 0.16 },
];
const FT_EMMA_FILI = [3.6, 5.2];
const FT_BUIO = [0, 1.6], FT_LUCE = [37.6, 40.6];
kit.scene('finestre', {
  init(kit) {
    const G = window.G, A = G.MOD.mare.passeggeri, F = G.MOD.finisce, P = F.passeggeri, C = G.C, I = G.INTERNO;
    // Chi siede dove, e i suoi colori: in stazione (il biglietto), poi dopo ogni tratto.
    const tappe = x => [x.biglietto].concat(x.tratti);
    this.chi = [['al', tappe(A.Al)], ['mare', tappe(A.mare)], ['emma', tappe(A.Emma)]]
      .concat(['nuota', 'e', 'gioca', '.'].map(w => ['paperella', tappe(P[w])]));
    const N = this.chi.length, tipi = this.chi.map(c => c[0]);
    // Gli scambi di ogni tratto, vagone per vagone.
    this.scambi = FT_TRATTI.map((tr, n) => this.chi.map((_, i) => ({ t: tr.scambi + tr.passo * i, da: FT_CORSIE[n][i], a: FT_CORSIE[n + 1][i] })));
    const finestre = FT_ULTIMO.map((_, k) => '<g class="ft-finestra" data-k="' + k + '">' + G.finestra('ft' + k) + '</g>').join('');
    const scambi = this.scambi.map((tr, n) => tr.map((s, i) => {
      const yd = I.corsie[s.da], ya = I.corsie[s.a];
      return '<g class="ft-scambio" data-n="' + n + '" data-i="' + i + '"><path d="M0 ' + ya + ' C60 ' + ya + ' 80 ' + yd + ' 160 ' + yd + '" stroke="' + C.acciaio + '" stroke-width="5" fill="none"/>' +
        '<g transform="translate(150 ' + (Math.max(yd, ya) + 46) + ')"><rect x="-4" y="-34" width="8" height="40" fill="' + C.acciaioScuro + '"/><g class="ft-disco"><circle cy="-40" r="14" fill="' + C.rosso + '" stroke="' + C.crema + '" stroke-width="3"/><rect x="-12" y="-43" width="24" height="6" fill="' + C.crema + '"/></g></g></g>';
    }).join('')).join('');
    // Il buio della montagna è più largo del solito: il treno di sette vagoni ci deve stare tutto.
    const fondo = '<rect x="-3000" y="-1500" width="9000" height="4500" fill="#07060F"/><rect x="-3000" y="0" width="9000" height="1080" fill="url(#g-interno)"/>';
    const binari = I.corsie.map(y => '<g><path d="M-3000 ' + (y + 6) + ' L6000 ' + (y + 6) + '" stroke="' + C.legnoScuro + '" stroke-width="14" stroke-dasharray="6 22" class="g-traversine"/><path d="M-3000 ' + y + ' L6000 ' + y + '" stroke="' + C.acciaio + '" stroke-width="4" opacity=".85"/></g>').join('');
    const linee = '<g class="ft-linee" opacity="0"><path d="M0 -10 L60 -14 M4 14 L70 16 M0 38 L54 42" stroke="#FFF4E0" stroke-width="4" stroke-linecap="round"/></g>';
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + G.interniDefs +
      '<defs><radialGradient id="g-uscita" cx="0" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="ft-cam">' + fondo + G.interno(this.chi.map(c => ({ tipo: c[0], col: c[1][0] })), { corsie: I.corsie, finestre }) + '</g>' +
      '<rect class="ft-luce" x="-200" y="-200" width="2400" height="1480" fill="url(#g-uscita)" opacity="0"/>' +
      '<rect class="ft-nero" x="-200" y="-200" width="2400" height="1480" fill="#07060F"/></svg>' +
      G.sottotitolo('NARRATORE', 'Dentro la montagna, il treno fa il giro di sempre: fili di luce, scambi, finestre.') +
      G.sottotitolo('NARRATORE', 'Ma questa volta, finestra dopo finestra, le paperelle di luce si fanno scure.') +
      G.sottotitolo('NARRATORE', 'All’ultima finestra sono quasi tutte del colore della notte.') +
      '</div>', 'finestre')));
    this.G = G;
    const q = s => kit.stage.querySelector(s);
    this.cam = q('.ft-cam'); this.luce = q('.ft-luce'); this.nero = q('.ft-nero');
    // Le pareti lontane e le punte vicine si ripetono, a destra e a sinistra.
    const lont = q('.g-int-lontano'), vic = q('.g-int-vicino');
    const tre = (el, w) => { const x = el.innerHTML; el.innerHTML = '<g transform="translate(' + (-w) + ' 0)">' + x + '</g>' + x + '<g transform="translate(' + w + ' 0)">' + x + '</g>'; };
    tre(lont, 3640); tre(vic, 3600);
    this.vicino = vic;
    q('.g-int-binari').innerHTML = binari + scambi;
    q('.g-int-treno').insertAdjacentHTML('beforeend', linee);
    this.linee = q('.ft-linee');
    this.vag = [...kit.stage.querySelectorAll('.g-vag')];
    this.basi = this.vag.map(v => v.getAttribute('transform'));
    this.corsie = [...kit.stage.querySelectorAll('.g-int-binari > g')].slice(0, I.corsie.length);
    this.fin = [...kit.stage.querySelectorAll('.ft-finestra')];
    this.scambiEl = [...kit.stage.querySelectorAll('.ft-scambio')];
    this.d = t => G.percorso(t, 0, FT_VEL);
    this.dUltimo = FT_ULTIMO.map(this.d);
    // Le paperelle di luce di ogni finestra (dal modellino: la vasca che si avrebbe dopo ogni tratto).
    // Quanto somigliano al vestito del punto decide quanto gli nuotano incontro.
    const rgb = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
    const dist = (a, b) => { const x = rgb(a), y = rgb(b); return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]); };
    this.papere = this.fin.map((f, k) => {
      const lista = G.papereFinestra(F.giri[4].finestre[k], 71 + k), punto = P['.'].tratti[k];
      f.querySelector('.g-fin-papere').innerHTML = lista.map(p => '<g class="ft-pap"><g transform="translate(-50 -84)">' + G.paperellaDiLuce(p.col) + '</g></g>').join('');
      const els = [...f.querySelectorAll('.ft-pap')];
      return lista.map((p, i) => ({ ...p, el: els[i], sim: Math.max(0, 1 - dist(p.col, punto) / 170) }));
    });
    // I fili di ogni tratto: da ogni passeggero verso chi gli siede davanti e verso sé stesso. I pesi di Al, Mare ed Emma
    // vengono dal modellino; quelli dei passeggeri nuovi il modellino non li dichiara: fili tutti uguali, sottili.
    const peso = (n, i, j) => {
      if (i === 0) return A.Al.fili.Al;
      if (i === 1) return A.mare.fili[j === 0 ? 'Al' : 'mare'];
      if (i === 2) return A.Emma.fili_tratti[n][['Al', 'mare', 'Emma'][j]];
      return 1 / (i + 1);
    };
    let fili = '';
    this.fili = [];
    FT_TRATTI.forEach((tr, n) => {
      const dy = FT_CORSIE[n].map(c => I.corsie[c] - I.ruote);
      for (let i = 0; i < N; i++) for (let j = 0; j <= i; j++) {
        const w = peso(n, i, j);
        let d;
        if (i === j) d = G.anello(i, tipi[i], dy[i]);
        else { const a = G.cima(i, tipi[i], dy[i]), b = G.cima(j, tipi[j], dy[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 80 - 0.12 * Math.abs(a[0] - b[0]); d = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
        const ww = i === j ? 0.45 * w : w;
        fili += '<path class="ft-filo" d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + 10 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>';
        this.fili.push({ n, i, j, w });
      }
    });
    q('.g-int-fili').innerHTML = fili;
    this.filiEl = [...kit.stage.querySelectorAll('.ft-filo')];
    this.lung = this.filiEl.map(p => p.getTotalLength());
    this.sub = G.subs(kit, [[1.0, 8.4], [16.0, 22.6], [32.4, 37.8]]);
  },
  render(t, kit) {
    t = window.G.tempo('07', 'finestre', t);
    const G = this.G, I = G.INTERNO;
    this.cam.setAttribute('transform', G.camChiavi(FT_CAM, t));
    this.nero.setAttribute('opacity', (1 - eio(seg(t, FT_BUIO[0], FT_BUIO[1]))).toFixed(3));
    const d = this.d(t);
    G.scorriInterno(kit, d);
    // Davanti all'ultima finestra, da vicino, le punte della volta si fanno da parte.
    this.vicino.setAttribute('opacity', (1 - eio(seg(t, 30.4, 31.2)) * (1 - eio(seg(t, 37.6, 38.4)))).toFixed(3));
    // Le finestre scorrono con la parete: la finestra k ha il centro sopra l'ultimo vagone quando t = FT_ULTIMO[k].
    const S = 1.6, ultX = I.centri[this.chi.length - 1];
    this.fin.forEach((f, k) => {
      const x = ultX + d - this.dUltimo[k];
      f.setAttribute('transform', 'translate(' + (x - 180 * S).toFixed(1) + ' 36) scale(' + S + ')');
      const fuori = x < -800 || x > 4200;
      f.setAttribute('opacity', fuori ? 0 : 1);
      if (fuori) return;
      // Dove passa l'ultimo vagone, nelle coordinate della finestra.
      const ex = (ultX - (x - 180 * S)) / S;
      this.papere[k].forEach(p => {
        const t0 = FT_ULTIMO[k] - 0.7 + p.quando * 1.4, u = seg(t, t0, t0 + 0.4);
        if (u <= 0) { p.el.setAttribute('opacity', 0); return; }
        // Le paperelle che somigliano al punto gli nuotano incontro: verso il basso e verso di lui.
        const corsa = k === 2 ? 1.6 : 1;
        const v = eio(seg(t, t0 + 0.3, t0 + 2.6)) * p.sim;
        const px = p.x + Math.max(-60 * corsa, Math.min(60 * corsa, (ex - p.x) * 0.3 * corsa)) * v, py = Math.min(204, p.y + 18 * corsa * v);
        const sc = 0.34 * (0.4 + 0.6 * eo(u)) * (1 + 0.12 * v);
        p.el.setAttribute('opacity', Math.min(1, u * 2).toFixed(3));
        p.el.setAttribute('transform', 'translate(' + px.toFixed(1) + ' ' + (py + 1.5 * Math.sin(t * 2.4 + p.x)).toFixed(1) + ') scale(' + sc.toFixed(3) + ')');
      });
    });
    // I vagoni: in quale corsia sono, di che colore, tratto dopo tratto. Emma, sullo scambio, è tirata via.
    let linee = 0;
    this.vag.forEach((v, i) => {
      let dy = I.corsie[2] - I.ruote, col = this.chi[i][1][0], tir = 0;
      if (i === 2) col = G.mix(this.chi[i][1][0], G.MOD.mare.passeggeri.Emma.dopo_fili, Math.round(eio(seg(t, FT_EMMA_FILI[0], FT_EMMA_FILI[1])) * 12) / 12);
      this.scambi.forEach((tr, n) => {
        const s = tr[i], p = eio(seg(t, s.t - 0.25, s.t + 0.3));
        if (t >= s.t - 0.25) dy = lerp(I.corsie[s.da], I.corsie[s.a], p) - I.ruote;
        const c = Math.round(eio(seg(t, s.t, s.t + 1.4)) * 12) / 12;
        const da = n === 0 && i === 2 ? G.MOD.mare.passeggeri.Emma.dopo_fili : this.chi[i][1][n];
        if (t >= s.t) col = G.mix(da, this.chi[i][1][n + 1], c);
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
    this.scambiEl.forEach(g => {
      const n = +g.dataset.n, i = +g.dataset.i, s = this.scambi[n][i];
      const x = I.centri[i] - 80 + d - this.d(s.t);
      g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' 0)');
      g.setAttribute('opacity', x < -900 || x > 4300 ? 0 : 1);
      g.querySelector('.ft-disco').setAttribute('transform', 'rotate(' + (90 * eio(seg(t, s.t - 0.45, s.t - 0.25))).toFixed(1) + ' 0 -40)');
    });
    // I fili: si disegnano da chi guarda verso chi gli siede davanti, brillano, si spengono.
    this.filiEl.forEach((el, k) => {
      const f = this.fili[k], tr = FT_TRATTI[f.n], L = this.lung[k];
      const t0 = tr.fili + tr.disegna * f.i + 0.06 * f.j, u = eo(seg(t, t0, t0 + (f.n === 0 ? 1.2 : 0.6)));
      el.setAttribute('stroke-dasharray', L.toFixed(1));
      el.setAttribute('stroke-dashoffset', ((1 - u) * L).toFixed(1));
      const a = u > 0 ? (1 - eio(seg(t, tr.spegne[0], tr.spegne[1]))) * (0.3 + 0.7 * f.w) * (1 + 0.08 * Math.sin(t * 3 + k)) : 0;
      el.setAttribute('opacity', a.toFixed(3));
    });
    this.luce.setAttribute('opacity', (0.95 * eio(seg(t, FT_LUCE[0], FT_LUCE[1]))).toFixed(3));
    this.sub(t);
  },
});
