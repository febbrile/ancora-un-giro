const { seg, eo, ei, eio, lerp } = kit;
// Il parco di notte, spento. Sulla pista girano i treni grigi: uno sale nella montagna carico di passeggeri, un altro
// aspetta vuoto in stazione. Dalla città, da tutte le finestre accese, partono strisce di carta; sul parco scendono
// come una nevicata e infilano da sole la fessura dello Spezzaparole. Una striscia: «Al mare Emma nuota». Zac, zac,
// zac: quattro biglietti. I primi tre volano sui sedili del treno grigio e prendono vita: Al, Mare ed Emma, rosa antico.
// Il quarto, blu, non sale: vola sopra la vasca e resta lì, sospeso sull'acqua, acceso come una lanterna.
// Si apre come finisce «indietro»; finisce sul treno pronto e sulla lanterna (lo riprende «dritta»).
const PR_CAM = [
  { t: 0, cx: 760, cy: 560, z: 1.15 },
  { t: 7.6, cx: 820, cy: 540, z: 1.1 },
  { t: 12.4, cx: 600, cy: 420, z: 1.6, da: 12.39 },
  { t: 13.0, cx: 600, cy: 420, z: 1.6 },
  { t: 16.4, cx: 575, cy: 760, z: 3.2 },
  { t: 20.0, cx: 575, cy: 770, z: 3.4 },
  { t: 22.8, cx: 460, cy: 790, z: 2.2 },
];
// Il treno carico sale nella montagna; quello vuoto aspetta in stazione.
const PR_SALE = [1080, [[0, 70], [2, 150], [5, 200]]];
const PR_VUOTO = 490;
// La città: quando si vede.
const PR_CITTA = [7.6, 8.2, 12.2, 12.8];
// La nevicata di strisce: quante, quando scendono.
const PR_NEVE = 16, PR_NEVE_T = [12.2, 15.2];
// La striscia di Emma: quando appare, quando entra nella fessura; i tre colpi di forbice; i quattro biglietti.
const PR_STRISCIA = [15.0, 17.6];
const PR_TAGLI = [18.6, 19.1, 19.6];
const PR_USCITE = [20.2, 20.6, 21.0, 21.4];
const PR_VOLO = 1.2, PR_VITA = 0.25;
// La lanterna: dove resta sospesa, sopra l'acqua della vasca, e quando si accende.
const PR_LANTERNA = [772, 834], PR_ACCESA = [22.6, 23.6];
const PR_SBARRE = [26.4, 27.2];
function prBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('prova', {
  init(kit) {
    const G = window.G, M = G.MONDO, C = G.C, A = G.MOD.parco.passeggeri, P = G.MOD.mare.passeggeri;
    this.chi = [['al', P.Al.biglietto], ['mare', P.mare.biglietto], ['emma', P.Emma.biglietto]];
    this.blu = G.MOD.mare.nuovo.nuota;
    const carico = [{ tipo: 'al', col: A.Al.biglietto }, { tipo: 'parco', col: A.parco.biglietto }, { tipo: 'emma', col: A.Emma.biglietto }];
    const lucido = '<path d="M30 72 L70 72 L52 126 L14 126 Z M84 72 L96 72 L78 126 L66 126 Z" fill="#FFFFFF" opacity=".22"/>';
    // Una striscia piccola, lontana: le righe della frase si vedono, le lettere no.
    const strisciolina = '<g transform="translate(-150 -22)"><path d="M0 4 L300 0 L290 22 L300 44 L0 40 L10 22 Z" fill="' + C.crema + '" stroke="' + C.cremaScura + '" stroke-width="3"/>' +
      '<path d="M40 22 L120 22 M140 22 L190 22 M210 22 L260 22" stroke="#9A93B8" stroke-width="9" stroke-linecap="round"/></g>';
    let neve = '';
    for (let k = 0; k < PR_NEVE; k++) neve += '<g class="pr-neve" opacity="0">' + strisciolina + '</g>';
    let scintille = '';
    for (let i = 0; i < 3; i++) { scintille += '<g class="pr-scint" opacity="0">'; for (let k = 0; k < 8; k++) scintille += '<circle r="2.2" fill="' + C.luce + '"/>'; scintille += '</g>'; }
    const parole = ['Al', 'mare', 'Emma', 'nuota'];
    const sopra = '<g class="pr-sale">' + G.treno(carico, { grigio: true, fanale: 1, sbarra: 1 }) + '</g>' +
      '<g class="pr-vuoto">' + G.treno(this.chi.map(c => ({ tipo: c[0], col: c[1] })), { grigio: true, fanale: 1, sbarra: 0 }) + '</g>' +
      '<g class="pr-lanterna" opacity="0"><g class="pr-lant-in"></g></g>' +
      '<g class="pr-macchina"></g>' +
      '<clipPath id="g-pr-fessura"><rect x="0" y="-1000" width="1920" height="1754"/></clipPath>' +
      '<g clip-path="url(#g-pr-fessura)">' + neve + '<g class="pr-striscia" opacity="0"><g transform="translate(-180 -22)">' + G.striscia('Al mare Emma nuota', 360) + '</g></g></g>' +
      parole.map(p => '<g class="pr-big" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(p) + '</g></g>').join('') + scintille;
    // La città: da ogni finestra accesa parte una striscia verso il cielo.
    let salgono = '';
    for (let k = 0; k < 14; k++) salgono += '<g class="pr-sale-citta" opacity="0">' + strisciolina + '</g>';
    const citta = '<g class="pr-citta" opacity="0">' + G.cittaDiNotte(14) + salgono + '</g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'prova', morto: true, spento: 1, banchina: true, davanti: citta,
      html: G.sottotitolo('NARRATORE', 'A quel tempo, di notte, giravano solo i treni di prova: treni grigi, senza vernice e senza lucine.') +
        G.sottotitolo('NARRATORE', 'Erano carichi di frasi che la gente aveva scritto davvero. E la parola dopo era già scritta sulla striscia.') +
        G.sottotitolo('NARRATORE', 'Quel biglietto non saliva: restava acceso sopra la vasca.'),
    });
    this.G = G;
    const m = this.m;
    this.sale = m.qa('.pr-sale .g-vag'); this.vuoto = m.qa('.pr-vuoto .g-vag');
    this.pass = this.vuoto.map(v => v.querySelector('.g-pass'));
    this.sale.concat(this.vuoto).forEach(el => el.querySelector('.g-vag-in').insertAdjacentHTML('beforeend', lucido));
    G.posaTreno(this.vuoto, m.partenza, PR_VUOTO, M.scala, M.passoBanchina);
    this.lant = m.q('.pr-lanterna'); this.lantIn = m.q('.pr-lant-in');
    this.mac = m.q('.pr-macchina'); this.neve = m.qa('.pr-neve'); this.str = m.q('.pr-striscia');
    this.big = m.qa('.pr-big'); this.scint = m.qa('.pr-scint');
    this.citta = m.q('.pr-citta'); this.saleCitta = m.qa('.pr-sale-citta');
    // Le finestre da cui partono le strisce, in città.
    const fin = m.qa('.g-finestrella');
    this.daFinestre = this.saleCitta.map((_, k) => { const f = fin[(k * 37 + 11) % fin.length]; return [+f.getAttribute('x') + 8, +f.getAttribute('y')]; });
    // I sedili del treno vuoto, nel mondo.
    const svg = m.cam.ownerSVGElement, base = m.cam.getCTM().inverse();
    this.sedili = this.vuoto.map(el => { const pt = svg.createSVGPoint(); pt.x = 138; pt.y = 42; const w = pt.matrixTransform(base.multiply(el.querySelector('.g-vag-in').getCTM())); return [w.x, w.y]; });
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    this.fessura = [x0 + 100 * s, y0 + 60 * s]; this.bocca = [x0 + 100 * s, y0 + 213 * s];
    const r = G.rng(55);
    this.fiocchi = this.neve.map((_, k) => ({ x: 260 + r() * 760, t0: PR_NEVE_T[0] + (PR_NEVE_T[1] - PR_NEVE_T[0]) * k / PR_NEVE + r() * 0.3, dur: 2.6 + r() * 1.2, ph: r() * 6, w: r() < 0.5 ? -1 : 1 }));
    this.statoMac = ''; this.statoLant = '';
    this.sub = G.subs(kit, [[0.6, 9.2], [9.8, 19.2], [24.0, 29.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('05', 'prova', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PR_CAM, t));
    // Il treno carico sale e sparisce nella montagna.
    const s = G.percorso(t, PR_SALE[0], PR_SALE[1]);
    G.posaTreno(this.sale, m.partenza, s, M.scala, M.passoBanchina);
    G.nascondiInMontagna(this.sale, m.partenza, s, { fine: true, passo: M.passoBanchina });
    // La città: le strisce partono dalle finestre e salgono nel cielo.
    this.citta.setAttribute('opacity', (seg(t, PR_CITTA[0], PR_CITTA[1]) * (1 - seg(t, PR_CITTA[2], PR_CITTA[3]))).toFixed(3));
    this.saleCitta.forEach((el, k) => {
      const a = PR_CITTA[0] + 0.3 + k * 0.22, u = seg(t, a, a + 3.0);
      const [x0, y0] = this.daFinestre[k];
      const x = x0 + 260 * eio(u) + 20 * Math.sin(t * 2 + k), y = y0 - 760 * eio(u);
      el.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + (-12 + 18 * Math.sin(t * 2.4 + k)).toFixed(1) + ') scale(' + lerp(0.34, 0.5, u).toFixed(3) + ')');
      el.setAttribute('opacity', (u > 0 && u < 1 ? Math.min(1, u * 8, (1 - u) * 4) : 0).toFixed(3));
    });
    // La nevicata: le strisce scendono ondeggiando e infilano la fessura.
    const [fx, fy] = this.fessura;
    this.neve.forEach((el, k) => {
      const f = this.fiocchi[k], u = seg(t, f.t0, f.t0 + f.dur);
      if (u <= 0 || u >= 1) { el.setAttribute('opacity', 0); return; }
      const g = eio(u), x = lerp(f.x, fx, g) + 40 * f.w * Math.sin(u * 7 + f.ph) * (1 - g), y = lerp(80, fy - 6, ei(u) * 0.4 + g * 0.6);
      const dentro = seg(u, 0.85, 1);
      el.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + (y + 24 * dentro).toFixed(1) + ') rotate(' + lerp(25 * Math.sin(u * 6 + f.ph), 90, dentro).toFixed(1) + ') scale(' + lerp(0.24, 0.08, g).toFixed(3) + ')');
      el.setAttribute('opacity', Math.min(1, u * 6).toFixed(3));
    });
    // La striscia di Emma: scende davanti alla biglietteria, si gira e infila la fessura.
    const a = PR_STRISCIA[0], b = PR_STRISCIA[1];
    let sx, sy, sr, ss = lerp(0.34, 0.18, eio(seg(t, b - 0.6, b + 0.4)));
    const u = eio(seg(t, a, b - 0.2));
    sx = lerp(720, fx + 6, u) + 30 * Math.sin(t * 2.2) * (1 - u); sy = lerp(470, fy - 34, u) + 10 * Math.sin(t * 3) * (1 - u);
    sr = lerp(-10 + 8 * Math.sin(t * 2), 90, eio(seg(t, b - 0.3, b + 0.2)));
    sy += 34 * eio(seg(t, b + 0.2, b + 0.8)); sx = lerp(sx, fx, seg(t, b - 0.3, b + 0.2));
    this.str.setAttribute('transform', 'translate(' + sx.toFixed(2) + ' ' + sy.toFixed(2) + ') rotate(' + sr.toFixed(1) + ') scale(' + ss.toFixed(3) + ')');
    this.str.setAttribute('opacity', (seg(t, a, a + 0.4) * (t < b + 0.9 ? 1 : 0)).toFixed(3));
    // La biglietteria: trema mentre entrano le strisce; con la striscia di Emma, tre colpi di forbice e quattro biglietti.
    const lavoraNeve = seg(t, PR_NEVE_T[0] + 2.4, PR_NEVE_T[0] + 2.6) * (1 - seg(t, PR_NEVE_T[1] + 3.6, PR_NEVE_T[1] + 3.9));
    const lavora = Math.max(0.5 * lavoraNeve, seg(t, PR_TAGLI[0] - 0.8, PR_TAGLI[0] - 0.6) * (1 - seg(t, PR_USCITE[3] + 0.5, PR_USCITE[3] + 0.8)));
    let forbice = 0.6, bocca = 0;
    PR_TAGLI.forEach(c => { forbice = Math.min(forbice, Math.min(0.6, 0.6 * Math.abs((t - c) / 0.18))); });
    bocca = Math.max(0, ...PR_USCITE.map(c => 1 - Math.abs(t - c) / 0.3));
    const trema = lavora * 1.2 * Math.sin(t * 40), aghi = lavora * 70 * Math.sin(t * 5);
    const km = forbice.toFixed(2) + '|' + Math.round(aghi) + '|' + bocca.toFixed(2);
    const tr = 'translate(' + trema.toFixed(2) + ' 0) ' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300);
    if (km !== this.statoMac) { this.mac.innerHTML = '<g transform="' + tr + '">' + G.spezzaparole({ forbice, aghi, bocca }) + '</g>'; this.statoMac = km; }
    else if (this.mac.firstChild) this.mac.firstChild.setAttribute('transform', tr);
    // I biglietti: tre volano sui sedili e prendono vita; il quarto vola sopra la vasca.
    const [bx, by] = this.bocca, [lx, ly] = PR_LANTERNA;
    this.big.forEach((el, i) => {
      const c = PR_USCITE[i], v = eio(seg(t, c, c + PR_VOLO + (i === 3 ? 0.4 : 0)));
      let x, y, sc = 0.26, op = t < c ? 0 : 1;
      if (i < 3) {
        const [qx, qy] = this.sedili[i], vita = c + PR_VOLO + PR_VITA, nasce = seg(t, vita - 0.15, vita + 0.25);
        x = lerp(bx, qx, v); y = lerp(by, qy - 8, v) - 70 * Math.sin(Math.PI * v); sc = 0.26 * (1 - 0.5 * nasce); op *= 1 - nasce;
        const p = this.pass[i], w = eo(seg(t, vita, vita + 0.6));
        p.setAttribute('opacity', w.toFixed(3));
        p.setAttribute('transform', 'translate(140 40) scale(' + lerp(0.5, 1, w).toFixed(3) + ') translate(-140 -40)');
        const sp = seg(t, vita, vita + 1.1);
        this.scint[i].setAttribute('opacity', (sp > 0 && sp < 1 ? 1 - sp : 0).toFixed(3));
        [...this.scint[i].children].forEach((cc, j) => { const an = j * Math.PI / 4 + 0.3, d = 6 + 22 * eo(sp); cc.setAttribute('cx', (qx + d * Math.cos(an)).toFixed(2)); cc.setAttribute('cy', (qy - 14 + d * Math.sin(an)).toFixed(2)); });
      } else {
        // Il quarto non sale: si alza sopra la vasca, si ferma sull'acqua e si accende.
        x = lerp(bx, lx, v); y = lerp(by, ly, v) - 60 * Math.sin(Math.PI * v); sc = lerp(0.26, 0.4, v);
        op *= 1 - seg(t, PR_ACCESA[0], PR_ACCESA[1]);
      }
      el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + (i < 3 ? -8 * v : 0).toFixed(1) + ') scale(' + sc.toFixed(3) + ')');
      el.setAttribute('opacity', op.toFixed(3));
    });
    // La lanterna, sospesa sull'acqua, respira piano.
    const luce = Math.round(eo(seg(t, PR_ACCESA[0], PR_ACCESA[1] + 0.6)) * (0.88 + 0.12 * Math.sin(t * 2.2)) * 30) / 30;
    if (String(luce) !== this.statoLant) { this.lantIn.innerHTML = '<g transform="translate(-60 -30)">' + G.lanternaAccesa('nuota', this.blu, luce) + '</g>'; this.statoLant = String(luce); }
    this.lant.setAttribute('opacity', seg(t, PR_ACCESA[0], PR_ACCESA[0] + 0.3).toFixed(3));
    this.lant.setAttribute('transform', 'translate(' + lx + ' ' + (ly + 2 * Math.sin(t * 1.6)).toFixed(2) + ') scale(0.4)');
    G.sbarre(this.vuoto, i => eio(seg(t, PR_SBARRE[0] + i * 0.15, PR_SBARRE[1] + i * 0.15)));
    this.sub(t);
  },
});
