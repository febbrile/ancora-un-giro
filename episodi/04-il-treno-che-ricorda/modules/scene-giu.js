const { seg, eo, ei, eio, lerp } = kit;
// La risposta è finita: i passeggeri tornano biglietti e il vento se li porta via; il treno resta vuoto. Nel salotto la
// persona continua a scrivere, e a montaggio, sempre più veloce, a ogni messaggio il treno risale tutto: i passeggeri
// salgono, il treno parte, torna con una paperella in più, i passeggeri scendono. Ogni volta è più lungo, e si allunga
// lungo la banchina verso la salita, finché il primo vagone arriva alla sbarra davanti. Poi si scrive di nuovo «Al parco».
// Alla stazione arriva un rotolo di carta: Ada lo srotola, e la striscia corre lungo tutta la banchina e pende oltre la
// sbarra davanti. Lo Spezzaparole se la tira dentro, zac, zac, zac…: i biglietti volano verso il treno partendo
// dall'ultimo vagone. Il treno è pieno da una sbarra all'altra; restano in aria i primi due biglietti della chat, Al e
// Mare: girano su sé stessi, non trovano posto e scendono piano sulle assi. Le sbarre dei vagoni si abbassano e il
// treno parte senza di loro.
// Si apre sulla stazione (dopo il telefono di «pesca»); finisce sulla banchina intera, col treno che sale e i due
// biglietti a terra (lo riprende «pista»).
const GI_LARGA = { cx: -307, cy: 700, z: 0.9 };
const GI_CAM = [
  { t: 0, cx: 377, cy: 786, z: 2.45 },
  { t: 2.4, cx: 377, cy: 786, z: 2.45 },
  { t: 4.6, cx: 520, cy: 700, z: 1.9 },
  { t: 9.39, cx: 520, cy: 700, z: 1.9 },
  { t: 9.4, ...GI_LARGA },
  { t: 26.0, ...GI_LARGA },
  { t: 26.6, cx: 470, cy: 760, z: 2.2 },
  { t: 28.6, cx: 470, cy: 760, z: 2.2 },
  { t: 31.4, ...GI_LARGA },
];
const GI_SBARRE = [0.4, 1.2], GI_CARTA = 1.2, GI_VENTO = 2.2;
// Il salotto: prima la chat che si allunga, messaggio dopo messaggio; poi di nuovo «Al parco».
const GI_CHAT = [5.4, 5.8, 9.0, 9.4], GI_SALOTTO = [21.6, 22.0, 26.2, 26.6], GI_SCRIVE = 22.6, GI_INVIO = 25.0;
// Il montaggio alla stazione: un giro per messaggio (dal terzo al settimo), sempre più veloce. All'ultimo giro il treno
// torna lungo quanto tutta la banchina e resta fermo un momento, pieno, prima che i passeggeri scendano.
const GI_GIRI = [9.6, 12.2, 14.4, 16.3, 18.0, 21.6], GI_ULTIMO = 2.2;
// Il rotolo: scende in mano ad Ada, poi si srotola lungo la banchina fino a pendere oltre la sbarra davanti.
const GI_ROTOLO = [26.8, 28.0], GI_SROTOLA = [28.4, 31.4];
const GI_ADA = [630, 834];
// I colpi di forbice: uno per parola, dall'ultima («parco») alla prima («Al»), sempre più svelti.
const GI_TAGLIO0 = 32.0, GI_TAGLIO = 0.24;
// I due biglietti senza posto: dove scendono, sulle assi, in testa alla banchina, accanto alla sbarra davanti.
const GI_ASSI = [[-1226, 841, -8], [-1202, 843, 6]];
const GI_PARTE = 41.6;
const GI_VEL = [[0, 0], [GI_PARTE + 0.3, 0], [GI_PARTE + 1.6, 60], [GI_PARTE + 2.4, 80]];
const GI_PASSO = 76, GI_ALTO = 18;
function giBez(p, u) { const a = 1 - u; return [0, 1].map(k => a * a * a * p[0][k] + 3 * a * a * u * p[1][k] + 3 * a * u * u * p[2][k] + u * u * u * p[3][k]); }
kit.scene('giu', {
  init(kit) {
    const G = window.G, M = G.MONDO, H = G.MOD.chat, C = G.C;
    const TIPO = { Al: 'al', mare: 'mare', Emma: 'emma', parco: 'parco' };
    // Il colore del biglietto di ogni parola (le risposte sono paperelle, col colore del loro biglietto).
    const col = {};
    H.messaggi.forEach(mm => mm.sale.forEach((w, i) => { col[w] = mm.biglietti[i]; }));
    col.corre = H.giro.nuovo.corre;
    const pass = w => [TIPO[w] || 'paperella', col[w]];
    this.N = M.posti;
    // Prima: i passeggeri della risposta di prima (con «corre» in fondo).
    this.prima = H.messaggi[1].striscia.concat(['corre']).map(w => pass(w).concat([w]));
    // Il montaggio: per ogni messaggio dal terzo al settimo, chi sale, e chi c'è al ritorno (con la risposta in fondo).
    const risposte = ['gioca', 'corre', 'nuota', 'gioca', 'nuota'];
    this.giri = H.messaggi.slice(2, 7).map((mm, k) => ({ sale: mm.sale.map(pass), torna: mm.sale.concat([risposte[k]]).map(pass) }));
    // L'ultimo «Al parco»: chi sale e chi resta giù.
    const ultimo = H.messaggi.at(-1);
    this.dopo = ultimo.sale.map(pass);
    this.parole = ultimo.striscia;
    this.giu = ultimo.giu.length;
    this.fermoPieno = G.fermoTreno(this.N);
    this.sedili = this.prima.map((c, i) => [M.fermo + i * M.passoBanchina + 6, 816]);
    this.posti = this.dopo.map((c, i) => [this.fermoPieno + i * M.passoBanchina + 6, 816]);
    let scintille = '';
    for (let i = 0; i < this.N; i++) { scintille += '<g class="gi-scint" opacity="0">'; for (let k = 0; k < 8; k++) scintille += '<circle r="2.2" fill="' + C.luce + '"/>'; scintille += '</g>'; }
    // Il binario d'arrivo che continua lungo tutta la banchina (per i treni lunghi del montaggio).
    const arrivoLungo = M.arrivo.replace(/L 40 852$/, 'L -1400 852');
    const sopra = '<path class="gi-arrivo" d="' + arrivoLungo + '" fill="none"/><g class="gi-macchina"></g>' +
      '<g class="gi-treno">' + G.treno(Array.from({ length: this.N }, () => ({})), { sbarra: 1 }) + '</g>' +
      this.prima.map(c => '<g class="gi-vola" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(c[2]) + '</g></g>').join('') +
      '<g class="gi-nastro"></g><g class="gi-rotolo" opacity="0"><circle r="11" fill="' + C.crema + '" stroke="' + C.cremaScura + '" stroke-width="2"/><path d="M0 0 m-6 0 a6 6 0 1 1 6 6 a3.5 3.5 0 1 1 -3.5 -3.5" fill="none" stroke="' + C.cremaScura + '" stroke-width="1.6"/></g>' +
      this.parole.map(p => '<g class="gi-big" opacity="0"><g transform="translate(-60 -30)">' + G.biglietto(p) + '</g></g>').join('') + scintille +
      '<g class="gi-ada"></g>';
    const salotto = '<g class="gi-salotto" opacity="0"><g class="gi-sal-cam">' + G.salotto('<g class="gi-tel"></g>') + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'giu', manopola: 0, banchina: true, davanti: salotto,
      html: G.sottotitolo('NARRATORE', 'La chat si allunga, messaggio dopo messaggio. E una sera la striscia è più lunga della banchina.') +
        G.sottotitolo('NARRATORE', 'I biglietti salgono dall’ultimo vagone in avanti. Quando i posti finiscono, quelli del principio restano giù.') +
        G.sottotitolo('NARRATORE', 'E il treno parte senza di loro.'),
    });
    this.G = G;
    const q = this.m.q;
    this.arrivo = q('.gi-arrivo'); this.Larr = this.arrivo.getTotalLength();
    this.vag = this.m.qa('.gi-treno .g-vag');
    this.dentro = this.vag.map(v => v.querySelector('.g-vag-in'));
    this.pass = this.vag.map(v => v.querySelector('.g-pass'));
    this.vola = this.m.qa('.gi-vola'); this.big = this.m.qa('.gi-big'); this.scint = this.m.qa('.gi-scint');
    this.mac = q('.gi-macchina'); this.nastroEl = q('.gi-nastro'); this.rotolo = q('.gi-rotolo'); this.ada = q('.gi-ada');
    this.salotto = q('.gi-salotto'); this.salCam = q('.gi-sal-cam'); this.tel = q('.gi-tel');
    this.typ = kit.typist('Al parco', GI_SCRIVE, 4.2, 13);
    const s = 0.34, x0 = M.spezzaparole[0] - 110 * s, y0 = M.spezzaparole[1] - 300 * s;
    const fx = x0 + 100 * s, fy = y0 + 60 * s;
    this.bocca = [x0 + 100 * s, y0 + 213 * s];
    // La linea della striscia: dal capo che pende oltre la sbarra davanti, lungo tutta la banchina, fino alla fessura.
    this.linea = G.linea([[-1344, 1000], [-1340, 930], [-1332, 870], [-1316, 818], [-1294, 772], [-1270, 746], [-1246, 740], [568, 740], [575, 741], [fx - 1.5, 745], [fx, fy + 2]]);
    this.fine = this.linea.L[7];
    // I colpi di forbice e i voli: dall'ultima parola alla prima; i voli più lunghi durano di più.
    const P = this.parole.length;
    this.tagli = this.parole.map((w, i) => GI_TAGLIO0 + (P - 1 - i) * GI_TAGLIO);
    this.voli = this.parole.map((w, i) => i < this.giu ? 0 : 0.8 + Math.abs(this.bocca[0] - this.posti[i - this.giu][0]) / 1600);
    this.statoTel = ''; this.statoAda = ''; this.statoMac = ''; this.statoPass = [];
    this.sub = G.subs(kit, [[13.0, 21.0], [32.2, 41.4], [41.4, 44.0]]);
  },
  // Dove sta il treno e chi c'è sopra, al tempo t.
  treno(t) {
    const G = this.G, M = G.MONDO, out = { path: this.m.partenza, n: 7, c: this.prima, vede: [], gente: [] };
    const fermo = n => 640 - G.fermoTreno(n);
    if (t < GI_GIRI[0]) {
      out.s = fermo(7);
      out.vede = this.prima.map(() => 1);
      out.gente = this.prima.map((c, i) => t >= GI_CARTA + i * 0.2 + 0.6 ? 0 : 1 - seg(t, GI_CARTA + i * 0.2, GI_CARTA + i * 0.2 + 0.6));
      out.carta = true;
      return out;
    }
    const k = GI_GIRI.findIndex((a, j) => t >= a && t < GI_GIRI[j + 1]);
    if (k < 0 || k >= this.giri.length) {
      // Dopo il montaggio: il treno vuoto, lungo quanto la banchina, poi i passeggeri dell'ultimo «Al parco».
      out.n = this.N; out.s = fermo(this.N) + G.percorso(t, 0, GI_VEL); out.c = this.dopo;
      out.vede = this.dopo.map(() => 1);
      out.nasce = this.dopo.map((c, i) => this.tagli[i + this.giu] + 0.1 + this.voli[i + this.giu] + 0.2);
      out.gente = out.nasce.map(v => eo(seg(t, v, v + 0.6)));
      out.parte = true;
      return out;
    }
    const ultimo = k === this.giri.length - 1, fine = GI_GIRI[k + 1];
    const g = this.giri[k], a = GI_GIRI[k], D = ultimo ? GI_ULTIMO : fine - a, u = Math.min(0.87, (t - a) / D);
    const nPrima = k === 0 ? 7 : this.giri[k - 1].torna.length, nSale = g.sale.length, nTorna = g.torna.length;
    if (u < 0.58) {
      // Il treno si allunga, salgono i passeggeri (dall'ultimo vagone in avanti), poi parte e corre via verso la salita.
      const cresce = eio(seg(u, 0, 0.2)), n = lerp(nPrima, nSale, cresce);
      out.n = nSale; out.c = g.sale;
      out.s = lerp(fermo(nPrima), fermo(nSale), cresce) + 1500 * ei(seg(u, 0.38, 0.58));
      const via = 1 - seg(u, 0.5, 0.58);
      out.vede = g.sale.map((c, i) => Math.min(via, Math.max(0, Math.min(1, n - i))));
      out.gente = g.sale.map((c, i) => seg(u, 0.1 + 0.2 * (nSale - 1 - i) / nSale, 0.14 + 0.2 * (nSale - 1 - i) / nSale));
    } else {
      // Torna da destra, con la paperella nuova in fondo; si ferma, e i passeggeri scendono.
      out.n = nTorna; out.c = g.torna; out.path = this.arrivo;
      const stop = this.Larr - (G.fermoTreno(nTorna) + 1400);
      out.s = stop - 900 * (1 - eo(seg(u, 0.6, 0.84)));
      const entra = seg(u, 0.6, 0.66);
      out.vede = g.torna.map(() => entra);
      out.gente = g.torna.map(() => ultimo ? 1 - seg(t, fine - 0.5, fine - 0.1) : 1 - seg((t - a) / D, 0.88, 0.98));
    }
    return out;
  },
  render(t, kit) {
    t = window.G.tempo('04', 'giu', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(GI_CAM, t));
    G.animaMondo(m, t + 1100);
    // Il treno: fermo lungo la banchina, il montaggio dei messaggi, poi parte.
    const T = this.treno(t);
    const passo = T.parte ? lerp(M.passoBanchina, 86, seg(T.s, 640 - this.fermoPieno, 640 - this.fermoPieno + 150)) : M.passoBanchina;
    G.posaTreno(this.vag, T.path, T.s, null, passo);
    if (T.path === m.partenza) G.nascondiInMontagna(this.vag, m.partenza, T.s, { fine: true, passo });
    else this.vag.forEach(v => v.setAttribute('opacity', 1));
    this.dentro.forEach((d, i) => d.setAttribute('opacity', (i < T.c.length ? T.vede[i] || 0 : 0).toFixed(3)));
    G.sbarre(this.vag, i => t < GI_PARTE - 2 ? 1 - eio(seg(t, GI_SBARRE[0] + i * 0.12, GI_SBARRE[1] + i * 0.12)) : eio(seg(t, GI_PARTE - 0.8 + i * 0.03, GI_PARTE + i * 0.03)));
    this.pass.forEach((p, i) => {
      const chi = T.c[i];
      if (!chi) { p.setAttribute('opacity', 0); return; }
      const ciao = T.parte && chi[0] === 'parco' && t >= T.nasce[i] ? Math.round((-22 + 18 * Math.sin((t - T.nasce[i]) * 5)) * seg(t, T.nasce[i] + 0.4, T.nasce[i] + 0.9) * (1 - seg(t, T.nasce[i] + 2.4, T.nasce[i] + 2.9))) : 0;
      const k = chi[0] + chi[1] + ciao;
      if (k !== this.statoPass[i]) { G.cambiaPasseggero(this.vag[i], chi[0], chi[1], chi[0] === 'parco' ? { ciao } : {}); this.statoPass[i] = k; }
      const c = T.gente[i];
      p.setAttribute('opacity', c.toFixed(3));
      p.setAttribute('transform', 'translate(140 40) scale(' + lerp(T.carta ? 0.6 : 0.5, 1, c).toFixed(3) + ') translate(-140 -40)');
      // Le scintille quando un passeggero dell'ultimo «Al parco» prende vita.
      const sci = this.scint[i];
      const sc = T.parte ? seg(t, T.nasce[i], T.nasce[i] + 1.1) : 0, [sx, sy] = this.posti[i] || [0, 0];
      sci.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
      if (sc > 0 && sc < 1) [...sci.children].forEach((cc, n) => { const an = n * Math.PI / 4 + 0.3, d = 6 + 22 * eo(sc); cc.setAttribute('cx', (sx + d * Math.cos(an)).toFixed(2)); cc.setAttribute('cy', (sy - 14 + d * Math.sin(an)).toFixed(2)); });
    });
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
    // Il salotto: la chat che si allunga a montaggio; poi si scrive di nuovo «Al parco».
    const chatOn = seg(t, GI_CHAT[0], GI_CHAT[1]) * (1 - seg(t, GI_CHAT[2], GI_CHAT[3])), salOn = seg(t, GI_SALOTTO[0], GI_SALOTTO[1]) * (1 - seg(t, GI_SALOTTO[2], GI_SALOTTO[3]));
    this.salotto.setAttribute('opacity', Math.max(chatOn, salOn).toFixed(3));
    if (chatOn > 0 || salOn > 0) {
      const base = [['io', 'Al mare Emma'], ['ai', 'nuota'], ['io', 'Al parco'], ['ai', 'corre']];
      const altri = [['io', 'Al mare'], ['ai', 'gioca'], ['io', 'Al parco Emma'], ['ai', 'corre'], ['io', 'Al mare Emma'], ['ai', 'nuota'], ['io', 'Al parco Emma'], ['ai', 'gioca'], ['io', 'Al mare'], ['ai', 'nuota']];
      let chat, scritto = '', cursore = false, premuto = false, z, k;
      if (chatOn > 0) {
        // Un messaggio e la sua risposta ogni mezzo secondo, sempre più svelti.
        const quanti = Math.min(altri.length, Math.floor(altri.length * Math.pow(seg(t, GI_CHAT[0] + 0.3, GI_CHAT[2]), 0.8) + 0.0001));
        chat = base.concat(altri.slice(0, quanti));
        z = lerp(1, 1.06, seg(t, GI_CHAT[0], GI_CHAT[3])); k = 'c' + quanti;
      } else {
        const inviato = t >= GI_INVIO + 0.15;
        chat = base.concat(altri).concat(inviato ? [['io', 'Al parco']] : []);
        scritto = inviato ? '' : this.typ.at(t);
        cursore = !inviato && t > GI_SCRIVE - 0.6 && Math.floor(t / 0.53) % 2 === 0;
        premuto = t > GI_INVIO - 0.05 && t < GI_INVIO + 0.3;
        z = lerp(1, 1.1, eio(seg(t, GI_SALOTTO[0], GI_SALOTTO[3]))); k = scritto + '|' + cursore + '|' + premuto + '|' + inviato;
      }
      if (k !== this.statoTel) { this.tel.innerHTML = G.unico(G.telefono({ chat, scritto, cursore, premuto }), 'gi-tel'); this.statoTel = k; }
      const [bx, by] = G.SALOTTO.bolla;
      this.salCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')');
    }
    // Il rotolo scende in mano ad Ada; Ada lo lancia e la striscia si srotola lungo tutta la banchina.
    const L = this.linea, fine = this.fine, lfin = L.lung, P = this.parole.length;
    const sr = eio(seg(t, GI_SROTOLA[0], GI_SROTOLA[1]));
    const r = lerp(fine, fine - P * GI_PASSO, sr);
    let f = 62 * eio(seg(t, this.tagli[P - 1] - 0.5, this.tagli[P - 1] - 0.05));
    this.tagli.forEach((a, i) => { if (i < P - 1) f += GI_PASSO * eio(seg(t, a - 0.22, a - 0.02)); });
    const ultimo = this.tagli[0];
    const par = this.parole.map((w, i) => [w, fine - (P - 1 - i + 0.5) * GI_PASSO + f]);
    this.nastroEl.innerHTML = t < GI_SROTOLA[0] || t > ultimo + 0.3 ? '' : G.nastro(L, r + f, Math.min(lfin, fine + f), par, GI_ALTO, {
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
    const lavora = seg(t, this.tagli[P - 1] - 0.9, this.tagli[P - 1] - 0.6) * (1 - seg(t, ultimo + 0.5, ultimo + 0.9));
    let forbice = 0.6, bocca = 0;
    this.tagli.forEach(a => { forbice = Math.min(forbice, 0.6 * Math.min(1, Math.abs((t - a) / 0.1))); bocca = Math.max(bocca, 1 - Math.abs(t - a - 0.06) / 0.2); });
    const trema = lavora * 1.2 * Math.sin(t * 40), aghi = lavora * 70 * Math.sin(t * 5);
    const km = forbice.toFixed(2) + '|' + Math.round(aghi) + '|' + bocca.toFixed(2);
    const tr = 'translate(' + trema.toFixed(2) + ' 0) ' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300);
    if (km !== this.statoMac) { this.mac.innerHTML = '<g transform="' + tr + '">' + G.spezzaparole({ forbice, aghi, bocca }) + '</g>'; this.statoMac = km; }
    else if (this.mac.firstChild) this.mac.firstChild.setAttribute('transform', tr);
    // I biglietti: escono dalla bocca e volano ai sedili, dall'ultimo in avanti. I primi due non trovano posto: girano
    // in aria davanti al treno, poi scendono piano sulle assi.
    this.big.forEach((b, i) => {
      const a = this.tagli[i] + 0.1, [bx, by] = this.bocca;
      let x, y, rot, sc = 0.26, op = t < a ? 0 : 1;
      if (i >= this.giu) {
        const [sx, sy] = this.posti[i - this.giu], volo = this.voli[i], u = eio(seg(t, a, a + volo)), vita = a + volo + 0.2;
        const nasce = seg(t, vita - 0.15, vita + 0.25);
        x = lerp(bx, sx, u); y = lerp(by, sy - 8, u) - (40 + 0.12 * Math.abs(bx - sx)) * Math.sin(Math.PI * u); rot = -10 * Math.sin(Math.PI * u);
        sc = 0.26 * (1 - 0.5 * nasce); if (t >= a) op = 1 - nasce;
      } else {
        // Cercano un posto lungo il treno, girano su sé stessi davanti al primo vagone, poi scendono sulle assi.
        const [ax, ay, ar] = GI_ASSI[i], u = eio(seg(t, a, a + 2.0)), giro = seg(t, a + 2.0, a + 3.0), cade = eio(seg(t, a + 3.0, a + 4.6));
        const [hx, hy] = giBez([[bx, by], [bx - 400, 560], [-900, 520], [ax + 30, 690 + i * 14]], u);
        x = lerp(hx + 14 * Math.sin(giro * 9), ax, cade) + 10 * Math.sin(t * 2.6 + i) * (1 - cade);
        y = lerp(hy + 6 * Math.sin(giro * 7), ay, cade);
        rot = lerp(360 * (giro + u * 0.3) * (i ? -1 : 1) + 20 * Math.sin(t * 3), ar, cade);
        sc = 0.26 * lerp(1, 0.8, cade) * lerp(0.4, 1, eo(seg(t, a, a + 0.25)));
      }
      b.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + rot.toFixed(1) + ') scale(' + sc.toFixed(3) + ' ' + (i < this.giu && t > a + 3.0 ? sc * lerp(1, 0.55, eio(seg(t, a + 4.0, a + 4.6))) : sc).toFixed(3) + ')');
      b.setAttribute('opacity', op.toFixed(3));
    });
    // Ada: guarda i passeggeri che scendono e il treno che cresce; va a prendere il rotolo, lo lancia, poi torna alla
    // bancarella e guarda.
    const va = eio(seg(t, GI_SALOTTO[1], GI_SALOTTO[1] + 2.0)), torna = eio(seg(t, this.tagli[P - 1] - 1.4, this.tagli[P - 1]));
    const ax = lerp(lerp(672, GI_ADA[0], va), 672, torna), ay = lerp(lerp(896, GI_ADA[1], va), 896, torna) - ((va > 0 && va < 1) || (torna > 0 && torna < 1) ? 5 * Math.abs(Math.sin(t * 8)) : 0);
    const alza = t > GI_ROTOLO[1] - 0.6 && t < GI_SROTOLA[0] + 0.5;
    const espr = t < GI_CARTA + 1 ? 'base' : t < 5 ? 'sorpresa' : t < GI_GIRI[0] ? 'felice' : t < GI_GIRI.at(-1) ? 'sorpresa' : t < GI_SROTOLA[0] ? 'felice' : t < this.tagli[1] ? 'sorpresa' : t < GI_PARTE ? 'pensa' : 'sorpresa';
    const ka = alza + espr;
    if (ka !== this.statoAda) { this.ada.innerHTML = '<g class="gi-ada-in">' + (alza ? G.adaSaluta(espr, lerp(-30, 20, seg(t, GI_SROTOLA[0] - 0.2, GI_SROTOLA[0] + 0.4))) : G.ada('base', espr)) + '</g>'; this.statoAda = ka; }
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    this.sub(t);
  },
});
