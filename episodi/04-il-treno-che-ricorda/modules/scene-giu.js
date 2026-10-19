const { seg, eo, ei, eio, lerp } = kit;
// La risposta è finita: i passeggeri tornano biglietti e il vento se li porta via; il treno resta vuoto. Nel salotto si
// scrive di nuovo «Al parco». Alla stazione arriva un rotolo di carta: Ada lo prende e lo srotola, e la striscia supera
// la sbarra di testa e pende oltre la banchina. Lo Spezzaparole se la tira dentro, zac, zac, zac…: i biglietti volano
// verso il treno partendo dall'ultimo vagone. Il treno è pieno da una sbarra all'altra; restano in aria i primi due
// biglietti della chat, Al e Mare: girano su sé stessi, non trovano posto e scendono piano sulle assi. Le sbarre dei
// vagoni si abbassano e il treno parte senza di loro.
// Si apre sulla stazione (dopo il telefono di «pesca»); finisce sul treno che parte e i due biglietti a terra
// (lo riprende «pista»).
const GI_CAM = [
  { t: 0, cx: 377, cy: 786, z: 2.45 },
  { t: 2.4, cx: 377, cy: 786, z: 2.45 },
  { t: 4.6, cx: 520, cy: 700, z: 1.9 },
  { t: 10.6, cx: 377, cy: 790, z: 2.45, da: 10.59 },
  { t: 16.4, cx: 377, cy: 790, z: 2.45 },
  { t: 18.4, cx: 420, cy: 786, z: 2.6 },
  { t: 22.2, cx: 420, cy: 786, z: 2.6 },
  { t: 24.6, cx: 260, cy: 790, z: 3.0 },
  { t: 27.4, cx: 260, cy: 790, z: 3.0 },
  { t: 30.4, cx: 330, cy: 740, z: 2.1 },
];
const GI_SBARRE = [0.4, 1.2], GI_CARTA = 1.2, GI_VENTO = 2.2;
const GI_SALOTTO = [5.4, 5.8, 10.2, 10.6], GI_SCRIVE = 6.4, GI_INVIO = 8.6;
// Il rotolo: scende in mano ad Ada, poi si srotola lungo la banchina fino a pendere oltre la sbarra di testa.
const GI_ROTOLO = [10.8, 12.2], GI_SROTOLA = [12.6, 15.6];
const GI_ADA = [630, 834];
// I colpi di forbice: uno per parola, dall'ultima («parco») alla prima («Al»).
const GI_TAGLI = [16.4, 17.25, 18.1, 18.95, 19.8, 20.65, 21.5, 22.35, 23.2];
const GI_VOLO = 1.2;
// I due biglietti senza posto: dove scendono, sulle assi davanti al primo vagone.
const GI_ASSI = [[52, 841, -8], [78, 843, 6]];
const GI_PARTE = 28.4;
const GI_VEL = [[0, 0], [GI_PARTE + 0.4, 0], [GI_PARTE + 2.0, 70], [GI_PARTE + 4, 110]];
const GI_PASSO = 76, GI_ALTO = 18;
function giBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('giu', {
  init(kit) {
    const G = window.G, M = G.MONDO, H = G.MOD.chat, C = G.C;
    // Prima: i passeggeri della risposta di prima (con «corre» in fondo). Poi: quelli che salgono col terzo messaggio.
    const TIPO = { Al: 'al', mare: 'mare', Emma: 'emma', nuota: 'paperella', parco: 'parco', corre: 'paperella' };
    this.prima = H.messaggi[1].striscia.concat(['corre']).map((w, i) => [TIPO[w], i < 6 ? H.messaggi[1].biglietti[i] : H.giro.nuovo.corre, w]);
    this.dopo = H.messaggi[2].sale.map((w, i) => [TIPO[w], H.messaggi[2].biglietti[i]]);
    this.parole = H.messaggi[2].striscia;
    this.giu = H.messaggi[2].giu.length;
    this.sedili = this.prima.map((c, i) => [M.fermo + i * M.passoBanchina + 6, 816]);
    let scintille = '';
    for (let i = 0; i < 7; i++) { scintille += '<g class="gi-scint" opacity="0">'; for (let k = 0; k < 8; k++) scintille += '<circle r="2.2" fill="' + C.luce + '"/>'; scintille += '</g>'; }
    const sopra = '<g class="gi-macchina"></g>' +
      '<g class="gi-treno">' + G.treno(this.prima.map(c => ({ tipo: c[0], col: c[1] })), { sbarra: 1 }) + '</g>' +
      this.prima.map(c => '<g class="gi-vola" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(c[2]) + '</g></g>').join('') +
      '<g class="gi-nastro"></g><g class="gi-rotolo" opacity="0"><circle r="11" fill="' + C.crema + '" stroke="' + C.cremaScura + '" stroke-width="2"/><path d="M0 0 m-6 0 a6 6 0 1 1 6 6 a3.5 3.5 0 1 1 -3.5 -3.5" fill="none" stroke="' + C.cremaScura + '" stroke-width="1.6"/></g>' +
      this.parole.map(p => '<g class="gi-big" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(p) + '</g></g>').join('') + scintille +
      '<g class="gi-ada"></g>';
    const salotto = '<g class="gi-salotto" opacity="0"><g class="gi-sal-cam">' + G.salotto('<g class="gi-tel"></g>') + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'giu', manopola: 0, banchina: true, davanti: salotto,
      html: G.sottotitolo('NARRATORE', 'La chat si allunga ancora, e questa volta la striscia è più lunga della banchina.') +
        G.sottotitolo('NARRATORE', 'I biglietti salgono dall’ultimo vagone in avanti. Quando i posti finiscono, quelli del principio restano giù.') +
        G.sottotitolo('NARRATORE', 'E il treno parte senza di loro.'),
    });
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.gi-treno .g-vag');
    this.pass = this.vag.map(v => v.querySelector('.g-pass'));
    this.vola = this.m.qa('.gi-vola'); this.big = this.m.qa('.gi-big'); this.scint = this.m.qa('.gi-scint');
    this.mac = q('.gi-macchina'); this.nastroEl = q('.gi-nastro'); this.rotolo = q('.gi-rotolo'); this.ada = q('.gi-ada');
    this.salotto = q('.gi-salotto'); this.salCam = q('.gi-sal-cam'); this.tel = q('.gi-tel');
    this.typ = kit.typist('Al parco', GI_SCRIVE, 4.2, 13);
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    const fx = x0 + 100 * s, fy = y0 + 60 * s;
    this.bocca = [x0 + 100 * s, y0 + 213 * s];
    // La linea della striscia: dal capo che pende oltre la sbarra di testa, lungo la banchina, fino alla fessura.
    this.linea = G.linea([[24, 1000], [28, 930], [36, 870], [52, 818], [74, 772], [98, 746], [122, 740], [568, 740], [575, 741], [fx - 1.5, 745], [fx, fy + 2]]);
    this.fine = this.linea.L[7];
    this.statoTel = ''; this.statoAda = ''; this.statoMac = ''; this.statoPass = [];
    this.sub = G.subs(kit, [[6.0, 13.0], [16.6, 26.4], [28.4, 31.4]]);
  },
  render(t, kit) {
    t = window.G.tempo('04', 'giu', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(GI_CAM, t));
    G.animaMondo(m, t + 1100);
    // Il treno: fermo lungo la banchina, poi parte.
    const s = G.percorso(t, 640 - M.fermo, GI_VEL);
    G.posaTreno(this.vag, m.partenza, s, null, lerp(M.passoBanchina, 86, seg(s, 490, 640)));
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true });
    G.sbarre(this.vag, i => t < GI_PARTE - 2 ? 1 - eio(seg(t, GI_SBARRE[0] + i * 0.12, GI_SBARRE[1] + i * 0.12)) : eio(seg(t, GI_PARTE - 0.8 + i * 0.1, GI_PARTE + i * 0.1)));
    // La risposta è finita: i passeggeri tornano biglietti e il vento se li porta via.
    this.vola.forEach((b, i) => {
      const c = seg(t, GI_CARTA + i * 0.2, GI_CARTA + i * 0.2 + 0.6), [sx, sy] = this.sedili[i];
      const w0 = GI_VENTO + i * 0.3, u = seg(t, w0, w0 + 3.2), e = eio(u);
      const [x, y] = giBez([[sx, sy - 6], [sx + 40, sy - 160], [sx + 420, sy - 300], [sx + 980 - i * 30, 250 + i * 30]], e);
      const fl = Math.sin(t * 7 + i * 1.7) * (0.3 + u), rot = c < 1 ? 0 : 26 * fl + 300 * e * (i % 2 ? 1 : -1);
      const sc = lerp(0.28, 0.36, eo(seg(t, w0, w0 + 1))) * lerp(1, 0.55, e) * (0.6 + 0.4 * c);
      b.setAttribute('transform', 'translate(' + (x + 6 * fl).toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + rot.toFixed(1) + ') scale(' + sc.toFixed(3) + ' ' + (sc * (0.75 + 0.25 * Math.cos(t * 9 + i))).toFixed(3) + ')');
      b.setAttribute('opacity', (c * (1 - seg(u, 0.75, 1))).toFixed(3));
    });
    // I passeggeri: prima sfumano (tornano biglietti), poi, col terzo messaggio, risalgono dall'ultimo vagone in avanti.
    this.pass.forEach((p, i) => {
      const j = 6 - i, a = GI_TAGLI[j] + 0.1, vita = a + GI_VOLO + 0.2, nuovo = t >= vita - 0.2;
      const c = nuovo ? eo(seg(t, vita, vita + 0.6)) : 1 - seg(t, GI_CARTA + i * 0.2, GI_CARTA + i * 0.2 + 0.6);
      const chi = nuovo ? this.dopo[i] : this.prima[i];
      const ciao = nuovo && chi[0] === 'parco' ? Math.round((-22 + 18 * Math.sin((t - vita) * 5)) * seg(t, vita + 0.4, vita + 0.9) * (1 - seg(t, vita + 2.4, vita + 2.9))) : 0;
      const k = chi[0] + chi[1] + ciao;
      if (k !== this.statoPass[i]) { G.cambiaPasseggero(this.vag[i], chi[0], chi[1], chi[0] === 'parco' ? { ciao } : {}); this.statoPass[i] = k; }
      p.setAttribute('opacity', c.toFixed(3));
      p.setAttribute('transform', 'translate(140 40) scale(' + lerp(nuovo ? 0.5 : 0.6, 1, c).toFixed(3) + ') translate(-140 -40)');
      const sc = seg(t, vita, vita + 1.1), sci = this.scint[i], [sx, sy] = this.sedili[i];
      sci.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
      [...sci.children].forEach((cc, n) => { const an = n * Math.PI / 4 + 0.3, d = 6 + 22 * eo(sc); cc.setAttribute('cx', (sx + d * Math.cos(an)).toFixed(2)); cc.setAttribute('cy', (sy - 14 + d * Math.sin(an)).toFixed(2)); });
    });
    // Il salotto: si scrive di nuovo «Al parco».
    this.salotto.setAttribute('opacity', (seg(t, GI_SALOTTO[0], GI_SALOTTO[1]) * (1 - seg(t, GI_SALOTTO[2], GI_SALOTTO[3]))).toFixed(3));
    if (t > GI_SALOTTO[0] - 0.1 && t < GI_SALOTTO[3] + 0.1) {
      const inviato = t >= GI_INVIO + 0.15;
      const chat = [['io', 'Al mare Emma'], ['ai', 'nuota'], ['io', 'Al parco'], ['ai', 'corre']].concat(inviato ? [['io', 'Al parco']] : []);
      const scritto = inviato ? '' : this.typ.at(t);
      const cursore = !inviato && t > GI_SCRIVE - 0.6 && Math.floor(t / 0.53) % 2 === 0;
      const premuto = t > GI_INVIO - 0.05 && t < GI_INVIO + 0.3;
      const k = scritto + '|' + cursore + '|' + premuto + '|' + inviato;
      if (k !== this.statoTel) { this.tel.innerHTML = G.unico(G.telefono({ chat, scritto, cursore, premuto }), 'gi-tel'); this.statoTel = k; }
      const z = lerp(1, 1.1, eio(seg(t, GI_SALOTTO[0], GI_SALOTTO[3]))), [bx, by] = G.SALOTTO.bolla;
      this.salCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')');
    }
    // Il rotolo scende in mano ad Ada; Ada lo lancia e la striscia si srotola fino a pendere oltre la banchina.
    const L = this.linea, fine = this.fine, lfin = L.lung;
    const sr = eio(seg(t, GI_SROTOLA[0], GI_SROTOLA[1]));
    const r = lerp(fine, fine - 9 * GI_PASSO, sr);
    let f = 62 * eio(seg(t, GI_TAGLI[0] - 0.65, GI_TAGLI[0] - 0.05));
    GI_TAGLI.slice(1).forEach(a => { f += GI_PASSO * eio(seg(t, a - 0.55, a - 0.05)); });
    const par = this.parole.map((w, i) => [w, fine - (8 - i + 0.5) * GI_PASSO + f]);
    this.nastroEl.innerHTML = t < GI_SROTOLA[0] || t > GI_TAGLI[8] + 0.3 ? '' : G.nastro(L, r + f, Math.min(lfin, fine + f), par, GI_ALTO, {
      onda: x => 1.2 * Math.sin((fine - x) * 0.03 - t * 4) * (1 - seg(x, lfin - 40, lfin - 20)) * seg(x, 140, 200),
    });
    const ru = eio(seg(t, GI_ROTOLO[0], GI_ROTOLO[1]));
    let rx, ry, rr;
    if (t < GI_SROTOLA[0]) { [rx, ry] = giBez([[760, 520], [720, 560], [670, 700], [568, 740]], ru); rr = -200 * (1 - ru); }
    else { [rx, ry] = L.at(r); rr = -(fine - r) * 3; }
    const rs = t < GI_SROTOLA[0] ? 1 : lerp(1, 0.25, sr);
    this.rotolo.setAttribute('transform', 'translate(' + rx.toFixed(1) + ' ' + (ry - 2).toFixed(1) + ') rotate(' + rr.toFixed(1) + ') scale(' + rs.toFixed(3) + ')');
    this.rotolo.setAttribute('opacity', (seg(t, GI_ROTOLO[0], GI_ROTOLO[0] + 0.3) * (1 - seg(t, GI_SROTOLA[1] - 0.2, GI_SROTOLA[1]))).toFixed(3));
    // Lo Spezzaparole: trema, gli aghi girano, la forbice scatta, la bocca si accende.
    const lavora = seg(t, GI_TAGLI[0] - 0.9, GI_TAGLI[0] - 0.6) * (1 - seg(t, GI_TAGLI[8] + 0.5, GI_TAGLI[8] + 0.9));
    let forbice = 0.6, bocca = 0;
    GI_TAGLI.forEach(a => { forbice = Math.min(forbice, 0.6 * Math.min(1, Math.abs((t - a) / 0.18))); bocca = Math.max(bocca, 1 - Math.abs(t - a - 0.1) / 0.3); });
    const trema = lavora * 1.2 * Math.sin(t * 40), aghi = lavora * 70 * Math.sin(t * 5);
    const km = forbice.toFixed(2) + '|' + Math.round(aghi) + '|' + bocca.toFixed(2);
    const tr = 'translate(' + trema.toFixed(2) + ' 0) ' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300);
    if (km !== this.statoMac) { this.mac.innerHTML = '<g transform="' + tr + '">' + G.spezzaparole({ forbice, aghi, bocca }) + '</g>'; this.statoMac = km; }
    else if (this.mac.firstChild) this.mac.firstChild.setAttribute('transform', tr);
    // I biglietti: escono dalla bocca e volano ai sedili, dall'ultimo in avanti. I primi due non trovano posto: girano
    // in aria davanti al treno, poi scendono piano sulle assi.
    this.big.forEach((b, i) => {
      const j = 8 - i, a = GI_TAGLI[j] + 0.1, [bx, by] = this.bocca;
      let x, y, rot, sc = 0.26, op = t < a ? 0 : 1;
      if (i >= this.giu) {
        const seat = i - this.giu, [sx, sy] = this.sedili[seat], u = eio(seg(t, a, a + GI_VOLO)), vita = a + GI_VOLO + 0.2;
        const nasce = seg(t, vita - 0.15, vita + 0.25);
        x = lerp(bx, sx, u); y = lerp(by, sy - 8, u) - (40 + 12 * j) * Math.sin(Math.PI * u); rot = -10 * Math.sin(Math.PI * u);
        sc = 0.26 * (1 - 0.5 * nasce); if (t >= a) op = 1 - nasce;
      } else {
        // Cercano un posto lungo il treno, girano su sé stessi, poi scendono sulle assi.
        const [ax, ay, ar] = GI_ASSI[i], u = eio(seg(t, a, a + 1.6)), giro = seg(t, a + 1.6, a + 3.4), cade = eio(seg(t, a + 3.4, a + 5.6));
        const [hx, hy] = giBez([[bx, by], [bx - 60, 640], [300, 600], [ax + 30, 690 + i * 14]], u);
        x = lerp(hx + 14 * Math.sin(giro * 9), ax, cade) + 10 * Math.sin(t * 2.6 + i) * (1 - cade);
        y = lerp(hy + 6 * Math.sin(giro * 7), ay, cade);
        rot = lerp(360 * (giro + u * 0.3) * (i ? -1 : 1) + 20 * Math.sin(t * 3), ar, cade);
        sc = 0.26 * lerp(1, 0.8, cade) * lerp(0.4, 1, eo(seg(t, a, a + 0.25)));
      }
      b.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + rot.toFixed(1) + ') scale(' + sc.toFixed(3) + ' ' + (i < this.giu && t > a + 3.4 ? sc * lerp(1, 0.55, eio(seg(t, a + 4.8, a + 5.6))) : sc).toFixed(3) + ')');
      b.setAttribute('opacity', op.toFixed(3));
    });
    // Ada: guarda i passeggeri che scendono, va a prendere il rotolo, lo lancia, poi torna alla bancarella e guarda.
    const va = eio(seg(t, 3.0, 5.0)), torna = eio(seg(t, GI_TAGLI[0] + 0.2, GI_TAGLI[0] + 1.6));
    const ax = lerp(lerp(672, GI_ADA[0], va), 672, torna), ay = lerp(lerp(896, GI_ADA[1], va), 896, torna) - ((va > 0 && va < 1) || (torna > 0 && torna < 1) ? 5 * Math.abs(Math.sin(t * 8)) : 0);
    const alza = t > GI_ROTOLO[1] - 0.6 && t < GI_SROTOLA[0] + 0.5;
    const espr = t < GI_CARTA + 1 ? 'base' : t < 5 ? 'sorpresa' : t < GI_SROTOLA[0] ? 'felice' : t < GI_TAGLI[7] ? 'sorpresa' : t < GI_PARTE ? 'pensa' : 'sorpresa';
    const ka = alza + espr;
    if (ka !== this.statoAda) { this.ada.innerHTML = '<g class="gi-ada-in">' + (alza ? G.adaSaluta(espr, lerp(-30, 20, seg(t, GI_SROTOLA[0] - 0.2, GI_SROTOLA[0] + 0.4))) : G.ada('base', espr)) + '</g>'; this.statoAda = ka; }
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    this.sub(t);
  },
});
