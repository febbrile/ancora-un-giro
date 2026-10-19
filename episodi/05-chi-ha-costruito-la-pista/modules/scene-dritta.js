const { seg, eo, ei, eio, lerp } = kit;
// Il treno grigio parte da solo, sale ed entra nella montagna. Dentro, nel buio, il fascio di binari corre dritto: tra i
// passeggeri si accendono i fili di luce, sottili, ma lungo i fili non scorre nessun colore; gli scambi passano sotto
// i vagoni e non spostano nessuno. Le tre finestre sulla vasca: con Al e Mare l'acqua resta vuota, con Emma si accendono
// paperelle di luce di tutti i colori, un po' per uno, e nella seconda e nella terza sono le stesse. Il treno esce sopra
// la vasca: Emma è ancora rosa, sotto di lei cadono paperelle di tutti i colori, e solo due sono blu come la lanterna.
// Alla bancarella non c'è nessuno a pescare. Il treno va a fermarsi in stazione.
// Si apre come finisce «prova»; finisce sul treno fermo in stazione e sulla vasca piena (lo riprende «brivido»).
const DR_CAM = [
  { t: 0, cx: 460, cy: 790, z: 2.2 },
  { t: 0.8, cx: 460, cy: 790, z: 2.2 },
  { t: 3.8, cx: 880, cy: 520, z: 1.05 },
  { t: 31.0, cx: 860, cy: 826, z: 3.4, da: 30.99 },
  { t: 33.4, cx: 780, cy: 846, z: 3.8 },
  { t: 35.6, cx: 780, cy: 846, z: 3.8 },
  { t: 38.6, cx: 520, cy: 820, z: 2.4 },
];
// Fuori: la partenza e l'uscita.
const DR_PARTE = [490, [[0.6, 0], [1.8, 300], [3.6, 560]]];
const DR_ESCE = [31.0, [[31.0, 170], [33.4, 90], [35.0, 180], [38.4, 0]]], DR_FERMO = 831;
// Dentro: quando si vede, la corsa, quando Emma passa sotto ogni finestra.
const DR_DENTRO = [4.2, 4.8, 5.4, 30.2, 31.0];
const DR_VEL = [[4.6, 260], [6, 220], [12.2, 220], [13.0, 40], [14.4, 40], [15.4, 320], [18.8, 320], [19.8, 40], [21.4, 40], [22.4, 320],
  [25.6, 320], [26.6, 30], [28.6, 30], [29.6, 320]];
const DR_EMMA = [13.4, 20.4, 27.2];
const DR_ICAM = [
  { t: 4.6, cx: 960, cy: 560, z: 1 },
  { t: 12.2, cx: 960, cy: 560, z: 1 },
  { t: 13.4, cx: 1190, cy: 400, z: 1.4 },
  { t: 15.4, cx: 1190, cy: 400, z: 1.4 },
  { t: 16.6, cx: 960, cy: 560, z: 1 },
  { t: 26.2, cx: 960, cy: 560, z: 1 },
  { t: 27.4, cx: 1190, cy: 400, z: 1.4 },
  { t: 29.0, cx: 1190, cy: 400, z: 1.4 },
  { t: 30.2, cx: 960, cy: 560, z: 1 },
];
// I tre tratti: quando si accendono i fili (sottili, vuoti) e quando passano gli scambi (fermi).
const DR_FILI = [6.4, 15.8, 22.6];
const DR_SCAMBI = [9.4, 17.4, 24.2];
const DR_LANTERNA = [772, 834];
kit.scene('dritta', {
  init(kit) {
    const G = window.G, M = G.MONDO, I = G.INTERNO, C = G.C, P = G.MOD.mare.passeggeri, D = G.MOD.addestramento.momenti[0];
    this.D = D; this.blu = G.MOD.mare.nuovo.nuota;
    // Sulla pista dritta tutti restano del colore del loro biglietto, dentro e fuori.
    this.chi = [['al', P.Al.biglietto], ['mare', P.mare.biglietto], ['emma', D.tratti[2]]];
    this.lista = G.papereVasca(D.vasca, 41);
    const ordine = this.lista.map((p, i) => i).sort((a, b) => this.lista[a].y - this.lista[b].y);
    const papere = ordine.map(i => '<g class="dr-pap" data-i="' + i + '"><g transform="translate(-50 -84)"><g class="dr-vera">' + G.paperella(this.lista[i].col) + '</g><g class="dr-dilu">' + G.paperellaDiLuce(this.lista[i].col) + '</g></g></g>').join('');
    const treno = this.chi.map(c => ({ tipo: c[0], col: c[1] }));
    const sopra = '<g class="dr-treno">' + G.treno(treno, { grigio: true, fanale: 1, sbarra: 1 }) + '</g>' +
      '<g class="dr-lanterna" transform="translate(' + DR_LANTERNA[0] + ' ' + DR_LANTERNA[1] + ') scale(.4)"><g class="dr-lant-in"></g></g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>';
    // Dentro la montagna: il fascio di binari, le finestre, gli scambi dritti.
    const finestre = DR_EMMA.map((_, k) => '<g class="dr-finestra">' + G.finestra('dr' + k) + '</g>').join('');
    const yc = I.corsie[2];
    const scambi = DR_SCAMBI.map((t0, n) => [0, 1, 2].map(i => '<g class="dr-scambio" data-n="' + n + '" data-i="' + i + '">' + G.scambio(yc, yc, 0) + '</g>').join('')).join('');
    const dentro = '<g class="dr-dentro" opacity="0">' + G.interniDefs + '<g class="dr-icam">' + G.interno(treno, { corsie: I.corsie, finestre }) + '</g></g>' +
      '<defs><radialGradient id="g-dr-uscita" cx="0" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
      '<rect class="dr-luce" x="-200" y="-200" width="2400" height="1480" fill="url(#g-dr-uscita)" opacity="0"/>' +
      '<rect class="dr-nero" x="-200" y="-200" width="2320" height="1480" fill="#07060F" opacity="0"/>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'dritta', morto: true, spento: 1, banchina: true, davanti: dentro,
      html: G.sottotitolo('NARRATORE', 'Dentro la montagna, allora, la pista era dritta. I fili non portavano niente, e gli scambi non spostavano nessuno.') +
        G.sottotitolo('NARRATORE', 'Finestra dopo finestra, le paperelle di luce restavano le stesse.') +
        G.sottotitolo('NARRATORE', 'Emma usciva rosa com’era entrata, e nella vasca cadeva un po’ di tutto.'),
    });
    const m = this.m;
    m.q('.g-vasca').insertAdjacentHTML('beforeend', papere);
    this.G = G;
    this.treno = m.qa('.dr-treno .g-vag');
    this.lantIn = m.q('.dr-lant-in'); this.statoLant = '';
    this.pap = m.qa('.dr-pap').map(el => ({ el, i: +el.dataset.i, vera: el.querySelector('.dr-vera'), luce: el.querySelector('.dr-dilu') }));
    this.dentro = m.q('.dr-dentro'); this.icam = m.q('.dr-icam'); this.luce = m.q('.dr-luce'); this.nero = m.q('.dr-nero');
    G.ingrigisci(this.dentro);
    const qa = s => [...this.dentro.querySelectorAll(s)];
    this.dentro.querySelector('.g-int-binari').insertAdjacentHTML('beforeend', scambi);
    this.ivag = qa('.g-vag'); this.ibasi = this.ivag.map(v => v.getAttribute('transform'));
    this.icorsie = qa('.g-int-binari > g').slice(0, I.corsie.length);
    this.fin = qa('.dr-finestra'); this.scambi = qa('.dr-scambio');
    this.d = t => G.percorso(t, 0, DR_VEL);
    this.dEmma = DR_EMMA.map(this.d);
    // Le paperelle di luce: le tre finestre sono uguali (stesso modellino, stesso posto per ognuna).
    const rgb = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
    const dist = (a, b) => { const x = rgb(a), y = rgb(b); return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]); };
    this.papere = this.fin.map((f, k) => {
      const lista = G.papereFinestra(D.finestre[k], 51), emma = D.tratti[k];
      f.querySelector('.g-fin-papere').innerHTML = lista.map(p => '<g class="dr-fpap"><g transform="translate(-50 -84)">' + G.paperellaDiLuce(p.col) + '</g></g>').join('');
      const els = [...f.querySelectorAll('.dr-fpap')];
      return lista.map((p, i) => ({ ...p, el: els[i], sim: Math.max(0, 1 - dist(p.col, emma) / 170) }));
    });
    // I fili, sottili: Emma verso Al, Mare e sé; Mare verso Al e sé; Al verso sé. Lungo i fili non scorre niente.
    const tipi = this.chi.map(c => c[0]);
    let fili = '';
    this.fili = [];
    DR_FILI.forEach((t0, n) => {
      const pe = P.Emma.fili_tratti[n];
      const pesi = [[0, 0, P.Al.fili.Al], [1, 0, P.mare.fili.Al], [1, 1, P.mare.fili.mare], [2, 0, pe.Al], [2, 1, pe.mare], [2, 2, pe.Emma]];
      pesi.forEach(([i, j, w]) => {
        let d;
        if (i === j) d = G.anello(i, tipi[i]);
        else { const a = G.cima(i, tipi[i]), b = G.cima(j, tipi[j]), mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 80 - 0.12 * Math.abs(a[0] - b[0]); d = 'M' + b[0] + ' ' + b[1] + ' Q' + mx + ' ' + my + ' ' + a[0] + ' ' + a[1]; }
        const ww = i === j ? 0.45 * w : w;
        fili += '<path class="dr-filo" d="' + d + '" fill="none" stroke="#FFF1C9" stroke-width="' + (1 + 4 * ww).toFixed(1) + '" stroke-linecap="round" opacity="0" filter="url(#g-glow)"/>';
        this.fili.push({ n, w });
      });
    });
    this.dentro.querySelector('.g-int-fili').innerHTML = fili;
    this.filiEl = qa('.dr-filo');
    this.lung = this.filiEl.map(p => p.getTotalLength());
    // Quando cade ogni paperella: quando sopra di lei passa l'ultimo vagone, Emma.
    const path = m.arrivo, sAt = t => Math.min(DR_FERMO, G.percorso(t, 0, DR_ESCE[1]));
    this.cade = this.lista.map(p => {
      for (let t = DR_ESCE[0]; t < 40; t += 0.02) { const se = sAt(t) - 2 * M.passoBanchina; if (se > 0 && path.getPointAtLength(se).x <= p.x + 6) return t; }
      return 36;
    });
    this.sub = G.subs(kit, [[5.8, 15.6], [20.0, 26.0], [33.0, 39.2]]);
  },
  render(t, kit) {
    t = window.G.tempo('05', 'dritta', t);
    const G = this.G, M = G.MONDO, I = G.INTERNO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(DR_CAM, t));
    // Fuori: il treno parte e sale; poi esce sopra la vasca e si ferma.
    if (t < DR_ESCE[0]) {
      const s = G.percorso(t, DR_PARTE[0], DR_PARTE[1]);
      G.posaTreno(this.treno, m.partenza, s, M.scala, M.passoBanchina);
      G.nascondiInMontagna(this.treno, m.partenza, s, { fine: true, passo: M.passoBanchina });
    } else {
      const s = Math.min(DR_FERMO, G.percorso(t, 0, DR_ESCE[1]));
      G.posaTreno(this.treno, m.arrivo, s, M.scala, M.passoBanchina);
      G.nascondiInMontagna(this.treno, m.arrivo, s, { inizio: true, passo: M.passoBanchina });
    }
    // La lanterna, sopra l'acqua.
    const luce = Math.round((0.88 + 0.12 * Math.sin(t * 2.2)) * 30) / 30;
    if (String(luce) !== this.statoLant) { this.lantIn.innerHTML = '<g transform="translate(-60 -30)">' + G.lanternaAccesa('nuota', this.blu, luce) + '</g>'; this.statoLant = String(luce); }
    // Le paperelle cadono dove passa Emma: di luce, poi vere quando toccano l'acqua.
    this.pap.forEach(({ el, i, vera, luce }) => {
      const t0 = this.cade[i], p = this.lista[i], u = seg(t, t0, t0 + 0.55), vv = seg(u, 0.55, 1);
      vera.setAttribute('opacity', vv.toFixed(3)); luce.setAttribute('opacity', (1 - vv).toFixed(3));
      const y = lerp(808, p.y, ei(u)) + (u >= 1 ? 1.2 * Math.sin(t * 2.2 + i) : 0);
      el.setAttribute('transform', 'translate(' + p.x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.16 * (u < 1 ? lerp(0.7, 1, u) : 1)).toFixed(4) + ')');
      el.setAttribute('opacity', t < t0 ? 0 : 1);
    });
    // Il buio tra fuori e dentro, e la luce dell'uscita.
    const [a0, a1, a2, b0, b1] = DR_DENTRO;
    this.nero.setAttribute('opacity', (seg(t, a0, a1) * (1 - seg(t, a1, a2))).toFixed(3));
    this.dentro.setAttribute('opacity', t >= a1 && t < b1 ? 1 : 0);
    this.luce.setAttribute('opacity', (0.95 * Math.min(eio(seg(t, b0, b1)), 1 - eio(seg(t, b1, b1 + 1.4)))).toFixed(3));
    if (t < a1 || t >= b1) { this.sub(t); return; }
    // Dentro: il treno corre nel fascio, sempre sulla stessa corsia.
    this.icam.setAttribute('transform', G.camChiavi(DR_ICAM, t));
    const d = this.d(t);
    G.scorriInterno(kit, d);
    this.icorsie.forEach((c, k) => c.setAttribute('opacity', k === 2 ? 1 : (0.85 * eio(seg(t, a1 + Math.abs(k - 2) * 0.4, a1 + 1.4 + Math.abs(k - 2) * 0.4))).toFixed(3)));
    this.ivag.forEach((v, i) => v.setAttribute('transform', 'translate(0 ' + (2 * Math.sin(t * 5 + i * 1.3)).toFixed(2) + ') ' + this.ibasi[i]));
    // Le finestre scorrono con la parete: con Emma si accendono le paperelle di luce, sempre le stesse.
    const S = 1.6, emmaX = I.centri[2];
    this.fin.forEach((f, k) => {
      const x = emmaX + d - this.dEmma[k];
      f.setAttribute('transform', 'translate(' + (x - 180 * S).toFixed(1) + ' 36) scale(' + S + ')');
      const fuori = x < -500 || x > 2500;
      f.setAttribute('opacity', fuori ? 0 : 1);
      if (fuori) return;
      const ex = (emmaX - (x - 180 * S)) / S;
      this.papere[k].forEach(p => {
        const t0 = DR_EMMA[k] - 0.7 + p.quando * 1.4, u = seg(t, t0, t0 + 0.4);
        if (u <= 0) { p.el.setAttribute('opacity', 0); return; }
        const v = eio(seg(t, t0 + 0.3, t0 + 2.6)) * p.sim;
        const px = p.x + Math.max(-60, Math.min(60, (ex - p.x) * 0.3)) * v, py = Math.min(204, p.y + 18 * v);
        const sc = 0.34 * (0.4 + 0.6 * eo(u)) * (1 + 0.12 * v);
        p.el.setAttribute('opacity', Math.min(1, u * 2).toFixed(3));
        p.el.setAttribute('transform', 'translate(' + px.toFixed(1) + ' ' + (py + 1.5 * Math.sin(t * 2.4 + p.x)).toFixed(1) + ') scale(' + sc.toFixed(3) + ')');
      });
    });
    // Gli scambi passano sotto i vagoni: dritti, fermi. Nessuno si sposta.
    this.scambi.forEach(g => {
      const n = +g.dataset.n, i = +g.dataset.i, ts = DR_SCAMBI[n] + 0.3 * i;
      const x = I.centri[i] - 80 + d - this.d(ts);
      g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' 0)');
      g.setAttribute('opacity', x < -300 || x > 2200 ? 0 : 1);
    });
    // I fili: si accendono sottili e si spengono; non portano niente.
    this.filiEl.forEach((el, k) => {
      const f = this.fili[k], t0 = DR_FILI[f.n], L = this.lung[k];
      const u = eo(seg(t, t0, t0 + 1.0));
      el.setAttribute('stroke-dasharray', L.toFixed(1));
      el.setAttribute('stroke-dashoffset', ((1 - u) * L).toFixed(1));
      const a = u > 0 ? (1 - eio(seg(t, t0 + 2.2, t0 + 3.0))) : 0;
      el.setAttribute('opacity', (a * (0.2 + 0.5 * f.w)).toFixed(3));
    });
    this.sub(t);
  },
});
