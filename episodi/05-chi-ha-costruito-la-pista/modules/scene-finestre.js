const { seg, eo, ei, eio, lerp } = kit;
// Una delle ultime notti. Un treno grigio con Al, Mare ed Emma entra nella montagna, con la lanterna blu sopra la vasca.
// Dentro, adesso il filo tra Emma e Mare brilla come una lampadina, e l'azzurro scorre verso Emma. Gli scambi fanno clac:
// Emma è tirata via e il suo vestito si fa azzurro. Alla prima finestra, con Al e Mare niente; con Emma paperelle di luce
// di tutti i colori, e le blu le nuotano un po' incontro. Fili, scambi: Emma è più blu; alla seconda finestra le blu
// sono di più. Ancora fili e scambi; alla terza la camera si avvicina: sono quasi tutte blu e corrono verso Emma.
// Il treno esce: Emma è blu, nella vasca cadono tantissime paperelle blu; sotto la lanterna parte un brivido piccolo.
// È il treno dell'episodio 1, sulla pista ormai quasi fissata.
// Si apre sulla montagna dall'esterno (come finisce «notti»); finisce sulla vasca (la riprende «apre»).
const FN_CAM = [
  { t: 0, cx: 980, cy: 560, z: 1.15 },
  { t: 2.4, cx: 1010, cy: 540, z: 1.25 },
  { t: 30.0, cx: 820, cy: 836, z: 3.4, da: 29.99 },
  { t: 32.2, cx: 780, cy: 850, z: 3.8 },
  { t: 33.4, cx: 780, cy: 850, z: 3.8 },
  { t: 35.4, cx: 860, cy: 836, z: 3.4 },
];
const FN_ENTRA = [1640, 300];
const FN_ESCE = [30.0, [[30.0, 170], [32.4, 90], [34.0, 180], [37.4, 0]]], FN_FERMO = 831;
const FN_DENTRO = [1.8, 2.4, 3.0, 28.8, 30.0];
const FN_VEL = [[2.4, 260], [3, 220], [9.6, 220], [10.4, 40], [12.0, 40], [13.0, 320], [16.6, 320], [17.6, 40], [19.4, 40], [20.4, 320],
  [23.8, 320], [24.8, 30], [28.4, 30], [29.4, 320]];
const FN_EMMA = [11.0, 18.4, 25.8];
const FN_ICAM = [
  { t: 2.4, cx: 960, cy: 560, z: 1 },
  { t: 3.6, cx: 960, cy: 560, z: 1 },
  { t: 4.8, cx: 1010, cy: 560, z: 1.3 },
  { t: 7.6, cx: 1010, cy: 560, z: 1.3 },
  { t: 8.6, cx: 960, cy: 560, z: 1 },
  { t: 24.6, cx: 960, cy: 560, z: 1 },
  { t: 25.8, cx: 1190, cy: 390, z: 1.45 },
  { t: 28.2, cx: 1190, cy: 390, z: 1.45 },
  { t: 29.2, cx: 960, cy: 560, z: 1 },
];
// Il primo tratto: i fili si accendono, i colori scorrono verso Emma, il vestito cambia; poi gli scambi.
const FN_FILI1 = { accende: 3.2, scorre: [4.0, 8.0], colore: [4.6, 7.2], spegne: [7.6, 8.4] };
const FN_TRATTI = [
  { fili: null, scambi: [{ t: 8.6, da: 2, a: 3 }, { t: 8.9, da: 2, a: 1 }, { t: 9.2, da: 2, a: 1 }] },
  { fili: 13.4, scambi: [{ t: 15.4, da: 3, a: 2 }, { t: 15.7, da: 1, a: 0 }, { t: 16.0, da: 1, a: 0 }] },
  { fili: 20.8, scambi: [{ t: 22.8, da: 2, a: 3 }, { t: 23.1, da: 0, a: 1 }, { t: 23.4, da: 0, a: 1 }] },
];
const FN_LANT = [772, 834];
// Il brivido piccolo: l'acqua trema appena, l'onda sale e corre alla bocca.
const FN_BRIVIDO = [33.2, 33.8, 34.4, 36.0];
const FN_ONDA = 'M 772 796 L 846 796 C 888 796 910 818 962 818 L 996 818';
kit.scene('finestre', {
  init(kit) {
    const G = window.G, M = G.MONDO, I = G.INTERNO, C = G.C, D = G.MOD.mare, P = D.passeggeri, A = G.MOD.addestramento.momenti;
    this.ultima = A[A.length - 1]; this.blu = D.nuovo.nuota;
    // Chi siede dove, e i suoi colori: il biglietto, poi dopo ogni tratto.
    this.chi = [['al', [P.Al.biglietto].concat(P.Al.tratti)], ['mare', [P.mare.biglietto].concat(P.mare.tratti)], ['emma', [P.Emma.dopo_fili].concat(P.Emma.tratti)]];
    this.P = P;
    this.lista = G.papereVasca(D.vasca);
    const ordine = this.lista.map((p, i) => i).sort((a, b) => this.lista[a].y - this.lista[b].y);
    const papere = ordine.map(i => '<g class="fn-pap" data-i="' + i + '"><g transform="translate(-50 -84)"><g class="fn-vera">' + G.paperella(this.lista[i].col) + '</g><g class="fn-dilu">' + G.paperellaDiLuce(this.lista[i].col) + '</g></g></g>').join('');
    const anelli = [0, 1].map(() => '<ellipse class="fn-anello" cx="772" cy="880" rx="10" ry="2" fill="none" stroke="' + this.blu + '" stroke-width="2" opacity="0"/>').join('');
    const binario = 'stroke="#E8EEFF" stroke-width="2.4" stroke-linecap="round" fill="none" opacity=".85"';
    const sopra = '<path class="fn-pieghe" ' + binario + '/>' +
      '<g class="fn-treno">' + G.treno(this.chi.map(c => ({ tipo: c[0], col: c[1][0] })), { grigio: true, fanale: 1, sbarra: 1 }) + '</g>' +
      '<g transform="translate(' + FN_LANT[0] + ' ' + FN_LANT[1] + ') scale(.4)"><g class="fn-lant-in"></g></g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' + anelli +
      '<path class="fn-sale" d="M 772 870 L 772 798" stroke="' + this.blu + '" stroke-width="3" stroke-linecap="round" fill="none" filter="url(#g-glow)" opacity="0"/>' +
      '<path class="fn-onda" d="' + FN_ONDA + '" stroke="' + this.blu + '" stroke-width="4" stroke-linecap="round" fill="none" filter="url(#g-glow)" opacity="0"/>';
    // Dentro: il fascio, le finestre, gli scambi.
    const finestre = FN_EMMA.map((_, k) => '<g class="fn-finestra">' + G.finestra('fn' + k) + '</g>').join('');
    const scambi = FN_TRATTI.map((tr, n) => tr.scambi.map((s, i) => '<g class="fn-scambio" data-n="' + n + '" data-i="' + i + '">' + G.scambio(I.corsie[s.da], I.corsie[s.a], 0) + '</g>').join('')).join('');
    const linee = '<g class="fn-linee" opacity="0"><path d="M0 -10 L60 -14 M4 14 L70 16 M0 38 L54 42" stroke="#FFF4E0" stroke-width="4" stroke-linecap="round"/></g>';
    const dentro = '<g class="fn-dentro" opacity="0">' + G.interniDefs + '<g class="fn-icam">' + G.interno(this.chi.map(c => ({ tipo: c[0], col: P[c[0] === 'al' ? 'Al' : c[0] === 'mare' ? 'mare' : 'Emma'].biglietto })), { corsie: I.corsie, finestre }) + '</g></g>' +
      '<defs><radialGradient id="g-fn-uscita" cx="0" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
      '<rect class="fn-luce" x="-200" y="-200" width="2400" height="1480" fill="url(#g-fn-uscita)" opacity="0"/>' +
      '<rect class="fn-nero" x="-200" y="-200" width="2320" height="1480" fill="#07060F" opacity="0"/>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'finestre', morto: true, spento: 1, banchina: true, davanti: dentro,
      html: G.sottotitolo('NARRATORE', 'Adesso i fili portavano i colori, e gli scambi facevano clac.') +
        G.sottotitolo('NARRATORE', 'Finestra dopo finestra, le paperelle di luce diventavano blu, come Emma.') +
        G.sottotitolo('NARRATORE', 'E il brivido era più piccolo.'),
    });
    const m = this.m;
    m.q('.g-vasca').insertAdjacentHTML('beforeend', papere);
    this.G = G;
    this.treno = m.qa('.fn-treno .g-vag');
    m.q('.fn-pieghe').setAttribute('d', G.pieghePista(m).d(this.ultima.piega[0], 2.2));
    m.q('.fn-lant-in').innerHTML = '<g transform="translate(-60 -30)">' + G.lanternaAccesa('nuota', this.blu, 1) + '</g>';
    this.luna = m.q('.g-luna'); this.luna.setAttribute('transform', 'translate(-380 420)');
    this.pap = m.qa('.fn-pap').map(el => ({ el, i: +el.dataset.i, vera: el.querySelector('.fn-vera'), luce: el.querySelector('.fn-dilu') }));
    this.anelli = m.qa('.fn-anello'); this.sale = m.q('.fn-sale'); this.onda = m.q('.fn-onda'); this.lOnda = this.onda.getTotalLength();
    this.dentro = m.q('.fn-dentro'); this.icam = m.q('.fn-icam'); this.luce = m.q('.fn-luce'); this.nero = m.q('.fn-nero');
    G.ingrigisci(this.dentro);
    const qa = s => [...this.dentro.querySelectorAll(s)];
    this.dentro.querySelector('.g-int-binari').insertAdjacentHTML('beforeend', scambi);
    this.dentro.querySelector('.g-int-treno').insertAdjacentHTML('beforeend', linee);
    this.linee = this.dentro.querySelector('.fn-linee');
    this.ivag = qa('.g-int-treno .g-vag'); this.ibasi = this.ivag.map(v => v.getAttribute('transform'));
    this.icorsie = qa('.g-int-binari > g').slice(0, I.corsie.length);
    this.fin = qa('.fn-finestra'); this.scambi = qa('.fn-scambio');
    this.d = t => G.percorso(t, 0, FN_VEL);
    this.dEmma = FN_EMMA.map(this.d);
    const rgb = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
    const dist = (a, b) => { const x = rgb(a), y = rgb(b); return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]); };
    this.papere = this.fin.map((f, k) => {
      const lista = G.papereFinestra(P.Emma.finestre[k], 11 + k), emma = P.Emma.tratti[k];
      f.querySelector('.g-fin-papere').innerHTML = lista.map(p => '<g class="fn-fpap"><g transform="translate(-50 -84)">' + G.paperellaDiLuce(p.col) + '</g></g>').join('');
      const els = [...f.querySelectorAll('.fn-fpap')];
      return lista.map((p, i) => ({ ...p, el: els[i], sim: Math.max(0, 1 - dist(p.col, emma) / 170) }));
    });
    // I fili: nel primo tratto si disegnano e portano i colori; nel secondo e nel terzo si accendono in fretta.
    const tipi = this.chi.map(c => c[0]);
    let fili = '', punti = '';
    this.fili = [];
    [0, 1, 2].forEach(n => {
      const corsia = n === 0 ? [2, 2, 2] : FN_TRATTI[n].scambi.map(s => s.da);
      const dy = corsia.map(c => I.corsie[c] - I.ruote);
      const pe = P.Emma.fili_tratti[n];
      const pesi = [[0, 0, P.Al.fili.Al], [1, 0, P.mare.fili.Al], [1, 1, P.mare.fili.mare], [2, 0, pe.Al], [2, 1, pe.mare], [2, 2, pe.Emma]];
      pesi.forEach(([i, j, w]) => {
        let d;
        if (i === j) d = G.anello(i, tipi[i], dy[i]);
        else { const a = G.cima(i, tipi[i], dy[i]), b = G.cima(j, tipi[j], dy[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 80 - 0.12 * Math.abs(a[0] - b[0]); d = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
        const ww = i === j ? 0.45 * w : w, k = this.fili.length;
        const quanti = n === 0 && i === 2 && i !== j ? Math.max(1, Math.round(w * 9)) : 0;
        fili += '<path class="fn-filo" d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1.5 + 10 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>' +
          '<path class="fn-core" d="' + d + '" fill="none" stroke="#FFFBEF" stroke-width="' + (0.8 + 4 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0"/>';
        for (let p = 0; p < quanti; p++) punti += '<circle class="fn-punto" data-k="' + k + '" data-p="' + p + '" r="' + (5 + 3 * w).toFixed(1) + '" fill="' + this.chi[j][1][0] + '" opacity="0"/>';
        this.fili.push({ n, i, j, w, quanti });
      });
    });
    const strato = this.dentro.querySelector('.g-int-fili');
    strato.innerHTML = fili + punti;
    this.filiEl = [...strato.querySelectorAll('.fn-filo')]; this.coreEl = [...strato.querySelectorAll('.fn-core')];
    this.punti = [...strato.querySelectorAll('.fn-punto')];
    this.punti.forEach(c => { const f = this.fili[+c.dataset.k]; if (f.j === 0) c.setAttribute('fill', P.Al.biglietto); else if (f.j === 1) c.setAttribute('fill', P.mare.biglietto); });
    this.lung = this.filiEl.map(p => p.getTotalLength());
    const path = m.arrivo, sAt = t => Math.min(FN_FERMO, G.percorso(t, 0, FN_ESCE[1]));
    this.cade = this.lista.map(p => {
      for (let t = FN_ESCE[0]; t < 40; t += 0.02) { const se = sAt(t) - 2 * M.passoBanchina; if (se > 0 && path.getPointAtLength(se).x <= p.x + 6) return t; }
      return 34;
    });
    this.sub = G.subs(kit, [[3.6, 9.6], [18.8, 25.0], [32.8, 35.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('05', 'finestre', t);
    const G = this.G, M = G.MONDO, I = G.INTERNO, m = this.m, P = this.P;
    m.cam.setAttribute('transform', G.camChiavi(FN_CAM, t));
    // Fuori: il treno entra in alto; poi esce sopra la vasca, blu, e va in stazione.
    if (t < FN_ESCE[0]) {
      const s = FN_ENTRA[0] + FN_ENTRA[1] * t;
      G.posaTreno(this.treno, m.partenza, s, M.scala, M.passoBanchina);
      G.nascondiInMontagna(this.treno, m.partenza, s, { fine: true, passo: M.passoBanchina });
    } else {
      const s = Math.min(FN_FERMO, G.percorso(t, 0, FN_ESCE[1]));
      G.posaTreno(this.treno, m.arrivo, s, M.scala, M.passoBanchina);
      G.nascondiInMontagna(this.treno, m.arrivo, s, { inizio: true, passo: M.passoBanchina });
      this.treno.forEach((v, i) => G.cambiaPasseggero(v, this.chi[i][0], this.chi[i][1][3]));
    }
    this.pap.forEach(({ el, i, vera, luce }) => {
      const t0 = this.cade[i], p = this.lista[i], u = seg(t, t0, t0 + 0.55), vv = seg(u, 0.55, 1);
      vera.setAttribute('opacity', vv.toFixed(3)); luce.setAttribute('opacity', (1 - vv).toFixed(3));
      const y = lerp(808, p.y, ei(u)) + (u >= 1 ? 1.2 * Math.sin(t * 2.2 + i) : 0);
      el.setAttribute('transform', 'translate(' + p.x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.16 * (u < 1 ? lerp(0.7, 1, u) : 1)).toFixed(4) + ')');
      el.setAttribute('opacity', t < t0 ? 0 : 1);
    });
    // Il brivido piccolo.
    const forza = this.ultima.brivido, [b0, b1, b2, b3] = FN_BRIVIDO;
    this.anelli.forEach((el, k) => {
      const u = seg(t, b0 + k * 0.35, b0 + k * 0.35 + 0.9);
      el.setAttribute('rx', (10 + 50 * eo(u)).toFixed(1)); el.setAttribute('ry', (2 + 6 * eo(u)).toFixed(1));
      el.setAttribute('opacity', (u > 0 && u < 1 ? forza * (1 - u) : 0).toFixed(3));
    });
    G.onda(this.sale, 72, eio(seg(t, b1, b2)), 30);
    this.sale.setAttribute('opacity', (t > b1 && t < b2 + 0.1 ? forza : 0).toFixed(3));
    G.onda(this.onda, this.lOnda, seg(t, b2, b3), 50);
    this.onda.setAttribute('opacity', (t > b2 && t < b3 ? forza : 0).toFixed(3));
    // Buio, dentro, luce dell'uscita.
    const [a0, a1, a2, c0, c1] = FN_DENTRO;
    this.nero.setAttribute('opacity', (seg(t, a0, a1) * (1 - seg(t, a1, a2))).toFixed(3));
    this.dentro.setAttribute('opacity', t >= a1 && t < c1 ? 1 : 0);
    this.luce.setAttribute('opacity', (0.95 * Math.min(eio(seg(t, c0, c1)), 1 - eio(seg(t, c1, c1 + 1.4)))).toFixed(3));
    if (t >= a1 && t < c1) this.dentroAl(t, kit);
    this.sub(t);
  },
  dentroAl(t, kit) {
    const G = this.G, I = G.INTERNO, P = this.P;
    this.icam.setAttribute('transform', G.camChiavi(FN_ICAM, t));
    const d = this.d(t);
    G.scorriInterno(kit, d);
    this.icorsie.forEach((c, k) => c.setAttribute('opacity', k === 2 ? 1 : (0.85 * eio(seg(t, 7.6 + Math.abs(k - 2) * 0.4, 9.0 + Math.abs(k - 2) * 0.4))).toFixed(3)));
    // Le finestre.
    const S = 1.6, emmaX = I.centri[2];
    this.fin.forEach((f, k) => {
      const x = emmaX + d - this.dEmma[k], fuori = x < -500 || x > 2500;
      f.setAttribute('transform', 'translate(' + (x - 180 * S).toFixed(1) + ' 36) scale(' + S + ')');
      f.setAttribute('opacity', fuori ? 0 : 1);
      if (fuori) return;
      const ex = (emmaX - (x - 180 * S)) / S;
      this.papere[k].forEach(p => {
        const t0 = FN_EMMA[k] - 0.7 + p.quando * 1.4, u = seg(t, t0, t0 + 0.4);
        if (u <= 0) { p.el.setAttribute('opacity', 0); return; }
        const v = eio(seg(t, t0 + 0.3, t0 + 2.6)) * p.sim;
        const px = p.x + Math.max(-60, Math.min(60, (ex - p.x) * 0.3)) * v, py = Math.min(204, p.y + 18 * v);
        const sc = 0.34 * (0.4 + 0.6 * eo(u)) * (1 + 0.12 * v);
        p.el.setAttribute('opacity', Math.min(1, u * 2).toFixed(3));
        p.el.setAttribute('transform', 'translate(' + px.toFixed(1) + ' ' + (py + 1.5 * Math.sin(t * 2.4 + p.x)).toFixed(1) + ') scale(' + sc.toFixed(3) + ')');
      });
    });
    // I vagoni: corsia e colore, tratto dopo tratto; Emma, sullo scambio, è tirata via.
    let linee = 0;
    const pf = Math.round(eio(seg(t, FN_FILI1.colore[0], FN_FILI1.colore[1])) * 16) / 16;
    this.ivag.forEach((v, i) => {
      let dy = I.corsie[2] - I.ruote, col = this.chi[i][1][0], tir = 0;
      if (i === 2) col = G.mix(P.Emma.biglietto, P.Emma.dopo_fili, pf);
      FN_TRATTI.forEach((tr, n) => {
        const s = tr.scambi[i], p = eio(seg(t, s.t - 0.25, s.t + 0.3));
        if (t >= s.t - 0.25) dy = lerp(I.corsie[s.da], I.corsie[s.a], p) - I.ruote;
        const c = Math.round(eio(seg(t, s.t, s.t + 1.4)) * 12) / 12;
        if (t >= s.t) col = G.mix(this.chi[i][1][n], this.chi[i][1][n + 1], c);
        tir = Math.max(tir, Math.sin(Math.PI * seg(t, s.t - 0.3, s.t + 0.9)));
      });
      v.setAttribute('transform', 'translate(0 ' + (dy + 2 * Math.sin(t * 5 + i * 1.3)).toFixed(2) + ') ' + this.ibasi[i]);
      if (i === 2) {
        const pass = G.cambiaPasseggero(v, 'emma', col, tir > 0.15 ? { tirata: true } : {});
        pass.setAttribute('transform', 'translate(140 40) rotate(' + (-13 * tir).toFixed(2) + ') translate(-140 -40)');
        const [hx, hy] = G.testa(2, 'emma', dy);
        this.linee.setAttribute('transform', 'translate(' + (hx + 70) + ' ' + hy + ')');
        linee = 0.7 * tir;
      } else G.cambiaPasseggero(v, this.chi[i][0], col);
    });
    this.linee.setAttribute('opacity', linee.toFixed(3));
    // Gli scambi scorrono con i binari e scattano da soli: clac.
    this.scambi.forEach(g => {
      const n = +g.dataset.n, i = +g.dataset.i, s = FN_TRATTI[n].scambi[i];
      const x = I.centri[i] - 80 + d - this.d(s.t);
      g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' 0)');
      g.setAttribute('opacity', x < -300 || x > 2200 ? 0 : 1);
      g.querySelector('.g-disco').setAttribute('transform', 'rotate(' + (90 * eio(seg(t, s.t - 0.45, s.t - 0.25))).toFixed(1) + ' 0 -40)');
    });
    // I fili: nel primo tratto si disegnano da chi guarda e restano; dopo, si accendono e si spengono in fretta.
    this.fili.forEach((f, k) => {
      let u, a;
      if (f.n === 0) {
        const t0 = FN_FILI1.accende + 0.7 * f.i + 0.25 * f.j;
        u = eo(seg(t, t0, t0 + 1.4));
        a = u > 0 ? (0.25 + 0.75 * f.w) * (1 - eio(seg(t, FN_FILI1.spegne[0], FN_FILI1.spegne[1]))) * (1 + 0.08 * Math.sin(t * 3 + k)) : 0;
      } else {
        const t0 = FN_TRATTI[f.n].fili;
        u = 1;
        a = eio(seg(t, t0, t0 + 0.8)) * (1 - eio(seg(t, t0 + 2.2, t0 + 3.0))) * (0.25 + 0.75 * f.w);
      }
      const L = this.lung[k];
      [this.filiEl[k], this.coreEl[k]].forEach(el => { el.setAttribute('stroke-dasharray', L.toFixed(1)); el.setAttribute('stroke-dashoffset', ((1 - u) * L).toFixed(1)); });
      this.filiEl[k].setAttribute('opacity', a.toFixed(3));
      this.coreEl[k].setAttribute('opacity', Math.min(1, 1.3 * a).toFixed(3));
    });
    this.punti.forEach(c => {
      const k = +c.dataset.k, pp = +c.dataset.p, f = this.fili[k], L = this.lung[k];
      const scorre = seg(t, FN_FILI1.scorre[0], FN_FILI1.scorre[0] + 1) * (1 - seg(t, FN_FILI1.scorre[1] - 1, FN_FILI1.scorre[1]));
      const u = ((t * 0.32 + pp / f.quanti) % 1), pt = this.filiEl[k].getPointAtLength(u * L);
      c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1));
      c.setAttribute('opacity', (scorre * Math.min(1, u * 6, (1 - u) * 6)).toFixed(3));
    });
  },
});
