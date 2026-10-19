const { seg, eo, ei, eio, lerp } = kit;
// Il treno esce dalla montagna sopra la vasca. Passano i primi cinque vagoni e non succede niente; passa Parco, verde
// prato, e sotto di lui cadono le paperelle, di luce come nella finestra, e toccano l'acqua vere. Il treno scivola in
// stazione lungo la banchina e i vestiti tornano del colore dei biglietti. Ada pesca a occhi chiusi una paperella verde:
// la paperella le salta di mano e si siede in un vagone nuovo, dietro Parco, che arriva giusto alla sbarra di dietro.
// La banchina è piena. Stacco sul telefono: sotto «Al parco» compare «corre».
// Si apre dalla luce dell'uscita; finisce sul telefono (la riprende «giu», alla stazione).
const PE_CAM = [
  { t: 0, cx: 820, cy: 820, z: 2.6 },
  { t: 2.6, cx: 820, cy: 820, z: 2.6 },
  { t: 4.4, cx: 772, cy: 850, z: 3.6 },
  { t: 7.4, cx: 772, cy: 850, z: 3.6 },
  { t: 9.4, cx: 560, cy: 820, z: 2.7 },
  { t: 10.0, cx: 560, cy: 820, z: 2.7 },
  { t: 11.2, cx: 660, cy: 846, z: 3.6 },
  { t: 14.6, cx: 660, cy: 846, z: 3.6 },
  { t: 16.6, cx: 560, cy: 820, z: 3.0 },
  { t: 18.8, cx: 377, cy: 786, z: 2.45 },
];
const PE_ESCE = 1.0;
const PE_VEL = [[PE_ESCE, 170], [3.8, 170], [4.4, 50], [7.6, 50], [8.4, 90], [10.2, 0]];
// In corsa i vagoni stanno un po' distanti; quando il treno frena in stazione si stringono fino a toccarsi.
const PE_PASSO = [86, 76];
const PE_ADA = [672, 896];
const PE_PESCA = { giu: 10.8, su: 12.6, preso: 13.1 };
const PE_SALTA = 15.2, PE_SALE = 17.4, PE_VAGONE = 16.6, PE_PIENA = 17.8;
const PE_TELEFONO = [20.0, 20.5], PE_CORRE = 21.0;
kit.scene('pesca', {
  init(kit) {
    const G = window.G, M = G.MONDO, H = G.MOD.chat, P = H.giro.passeggeri;
    const tipi = ['al', 'mare', 'emma', 'paperella', 'al', 'parco'];
    this.chi = tipi.map((tp, i) => [tp, P[i]]);
    this.lista = G.papereVasca(H.giro.vasca, 44);
    let best = 0, bd = 1e9;
    this.lista.forEach((p, i) => { const d = Math.abs(p.x - 700) + Math.abs(p.y - 880); if (p.parola === 'corre' && d < bd) { bd = d; best = i; } });
    this.presa = best; this.colPresa = this.lista[best].col;
    const ordine = this.lista.map((p, i) => i).sort((a, b) => this.lista[a].y - this.lista[b].y);
    const papere = ordine.map(i => '<g class="pe-pap" data-i="' + i + '"><g transform="translate(-50 -84)"><g class="pe-vera">' + G.paperella(this.lista[i].col) + '</g><g class="pe-dilu">' + G.paperellaDiLuce(this.lista[i].col) + '</g></g></g>').join('');
    const treno = this.chi.map(c => ({ tipo: c[0], col: c[1].tratti[2] })).concat([{ tipo: 'paperella', col: H.giro.nuovo.corre }]);
    let scintille = '';
    for (let k = 0; k < 10; k++) scintille += '<circle r="2.4" fill="' + G.C.luce + '"/>';
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<circle class="pe-lampada" cx="' + M.banchina[1] + '" cy="802" r="14" fill="' + G.C.rosso + '" opacity="0" filter="url(#g-glow)"/>' +
      '<g class="pe-treno">' + G.treno(treno, { sbarra: 1 }) + '</g>' +
      '<g class="pe-scint" opacity="0">' + scintille + '</g>' +
      '<g class="pe-ada"></g>' +
      '<ellipse class="pe-luce" rx="22" ry="18" fill="' + this.colPresa + '" opacity="0" filter="url(#g-soft)"/>' +
      '<g class="pe-mano"><g transform="translate(-50 -84)">' + G.paperella(this.colPresa) + '</g></g>';
    const chat = [['io', 'Al mare Emma'], ['ai', 'nuota'], ['io', 'Al parco']];
    const tel = '<g class="pe-tel" opacity="0"><g class="pe-tel-cam">' + G.salotto('<g>' + G.telefono({ chat }) + '</g><g class="pe-tel-b" opacity="0">' + G.telefono({ chat: chat.concat([['ai', 'corre']]) }) + '</g>') + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'pesca', manopola: 0, banchina: true,
      davanti: '<defs><radialGradient id="g-pe-luce" cx="0" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
        '<rect class="pe-uscita" x="-200" y="-200" width="2400" height="1480" fill="url(#g-pe-luce)"/>' + tel,
      html: G.sottotitolo('NARRATORE', 'Ada pesca una paperella verde, e la paperella prende l’ultimo posto della banchina.') +
        G.sottotitolo('ADA', 'Corre… Emma corre! Era sulla striscia.'),
    });
    // Due telefoni nello stesso disegno: ognuno con il suo ritaglio dello schermo.
    this.m.qa('.pe-tel clipPath').forEach((c, k) => { const id = c.id + '-' + k; c.parentNode.querySelector('[clip-path]').setAttribute('clip-path', 'url(#' + id + ')'); c.id = id; });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', papere);
    this.G = G;
    this.vag = this.m.qa('.pe-treno .g-vag'); this.ada = this.m.q('.pe-ada'); this.uscita = this.m.q('.pe-uscita');
    this.mano = this.m.q('.pe-mano'); this.luce = this.m.q('.pe-luce'); this.scint = this.m.q('.pe-scint'); this.lampada = this.m.q('.pe-lampada');
    this.tel = this.m.q('.pe-tel'); this.telCam = this.m.q('.pe-tel-cam'); this.telB = this.m.q('.pe-tel-b');
    this.pap = this.m.qa('.pe-pap').map(el => ({ el, i: +el.dataset.i, vera: el.querySelector('.pe-vera'), luce: el.querySelector('.pe-dilu') }));
    this.passNuovo = this.vag[6].querySelector('.g-pass');
    const path = this.m.arrivo, sF = path.getTotalLength() - (M.fermo - 40);
    this.sF = sF;
    this.passo = st => lerp(PE_PASSO[0], PE_PASSO[1], eio(seg(st, sF - 160, sF)));
    const sAt = t => Math.min(sF, G.percorso(t, 0, PE_VEL));
    // Le paperelle cadono dove passa l'ultimo vagone, Parco.
    this.cade = this.lista.map(p => {
      for (let t = PE_ESCE; t < 20; t += 0.02) { const st = sAt(t), se = st - 5 * this.passo(st); if (se > 0 && path.getPointAtLength(se).x <= p.x + 6) return t; }
      return 8;
    });
    this.sedile = [M.fermo + 6 * M.passoBanchina + 6, 816];
    this.stato = '';
    this.sub = G.subs(kit, [[11.0, 18.4], [21.6, 25.6]]);
  },
  manoAt(giu) {
    const s = 0.28, [ax, ay] = PE_ADA, mx = 150 + 26 * giu - 6, my = 230 + 50 * giu + 6;
    return [ax - 100 * s + mx * s, ay - 304 * s + my * s];
  },
  render(t, kit) {
    t = window.G.tempo('04', 'pesca', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PE_CAM, t));
    G.animaMondo(m, t + 1060);
    this.uscita.setAttribute('opacity', (0.95 * (1 - eio(seg(t, 0.1, 1.6)))).toFixed(3));
    // Il treno esce dalla montagna e si ferma lungo la banchina; in stazione i vestiti tornano del colore dei biglietti.
    const s = Math.min(this.sF, G.percorso(t, 0, PE_VEL)), sp = t < PE_ESCE ? -800 : s;
    const tr = this.vag.slice(0, 6);
    G.posaTreno(tr, m.arrivo, sp, null, this.passo(s));
    G.nascondiInMontagna(tr, m.arrivo, sp, { inizio: true, passo: this.passo(s) });
    G.posaTreno([this.vag[6]], m.partenza, 640 - this.sedile[0] + 6);
    const torna = Math.round(seg(s, this.sF - 150, this.sF) * 12) / 12;
    tr.forEach((v, i) => G.cambiaPasseggero(v, this.chi[i][0], G.mix(this.chi[i][1].tratti[2], this.chi[i][1].biglietto, torna)));
    // Le paperelle: cadono di luce sotto Parco, toccano l'acqua vere; dopo la pesca scivolano via dallo scarico.
    this.pap.forEach(({ el, i, vera, luce }) => {
      const t0 = this.cade[i], p = this.lista[i];
      const u = seg(t, t0, t0 + 0.55), vv = seg(u, 0.55, 1);
      vera.setAttribute('opacity', vv.toFixed(3)); luce.setAttribute('opacity', (1 - vv).toFixed(3));
      const via = eio(seg(t, 14.4 + (i % 7) * 0.12, 16.0 + (i % 7) * 0.12)), a = via * 2.4 + i;
      const x = lerp(p.x, 772 + 8 * Math.cos(a), via);
      const y = lerp(lerp(808, p.y, ei(u)) + (u >= 1 ? 1.2 * Math.sin(t * 2.2 + i) : 0), 884, via);
      el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.16 * (u < 1 ? lerp(0.7, 1, u) : 1) * (1 - via)).toFixed(4) + ')');
      el.setAttribute('opacity', t < t0 ? 0 : i === this.presa ? (t < PE_PESCA.su + 0.2 ? 1 : 0) : (1 - seg(via, 0.85, 1)).toFixed(3));
    });
    // Ada: guarda il treno, poi pesca a occhi chiusi.
    let giu = 0;
    if (t >= PE_PESCA.giu - 0.6) giu = eio(seg(t, PE_PESCA.giu - 0.6, PE_PESCA.giu + 0.4));
    if (t > PE_PESCA.giu + 0.4 && t < PE_PESCA.su) giu = 0.9 + 0.1 * Math.sin((t - PE_PESCA.giu) * 9);
    if (t >= PE_PESCA.su) giu = 1 - eio(seg(t, PE_PESCA.su, PE_PESCA.preso + 0.4));
    const posa = t < 9.8 ? 'quaderno' : 'pesca';
    const espr = t < 4 ? 'base' : t < 9.8 ? 'sorpresa' : t < PE_PESCA.preso ? 'chiusi' : t < 15 ? 'sorpresa' : 'felice';
    const giuQ = Math.round(giu * 40) / 40;
    const k = posa + espr + giuQ;
    if (k !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(PE_ADA[0], PE_ADA[1]) + '">' + G.ada(posa, espr, { giu: giuQ }) + '</g>'; this.stato = k; }
    // La paperella pescata: in mano ad Ada, poi salta giù, corre alla sbarra e salta sul vagone nuovo.
    const [hx, hy] = this.manoAt(giuQ);
    let px = hx, py = hy, pr = 0, pv = t >= PE_PESCA.su + 0.2 ? 1 : 0;
    if (t >= PE_SALTA) {
      const a = eo(seg(t, PE_SALTA, PE_SALTA + 0.6)), corsa = eio(seg(t, PE_SALTA + 0.6, PE_SALE - 0.6)), salto = eio(seg(t, PE_SALE - 0.6, PE_SALE));
      if (t < PE_SALTA + 0.6) { px = lerp(hx, 700, a); py = lerp(hy, 862, a) - 26 * Math.sin(Math.PI * a); }
      else if (t < PE_SALE - 0.6) { px = lerp(700, 660, corsa); py = lerp(862, 846, corsa) - 3 * Math.abs(Math.sin(t * 12)); pr = 9 * Math.sin(t * 12); }
      else { px = lerp(660, this.sedile[0], salto); py = lerp(846, this.sedile[1], salto) - 40 * Math.sin(Math.PI * salto); }
      pv = t < PE_SALE ? 1 : 1 - seg(t, PE_SALE, PE_SALE + 0.3);
    }
    this.mano.setAttribute('transform', 'translate(' + px.toFixed(2) + ' ' + py.toFixed(2) + ') rotate(' + pr.toFixed(2) + ') scale(0.16)');
    this.mano.setAttribute('opacity', pv.toFixed(3));
    const luce = seg(t, PE_PESCA.su + 0.3, PE_PESCA.preso + 0.4) * (1 - seg(t, PE_SALTA - 0.6, PE_SALTA));
    this.luce.setAttribute('cx', hx.toFixed(1)); this.luce.setAttribute('cy', (hy - 10).toFixed(1));
    this.luce.setAttribute('opacity', (0.6 * luce).toFixed(3));
    // Il vagone nuovo compare dietro Parco, giusto alla sbarra di dietro; la lampadina della sbarra si accende.
    this.vag[6].setAttribute('opacity', eo(seg(t, PE_VAGONE, PE_VAGONE + 0.6)).toFixed(3));
    this.passNuovo.setAttribute('opacity', seg(t, PE_SALE - 0.05, PE_SALE + 0.3).toFixed(3));
    const sc = seg(t, PE_VAGONE, PE_VAGONE + 1.1);
    this.scint.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
    [...this.scint.children].forEach((c, n) => { const a = n * Math.PI / 5, d = 10 + 34 * eo(sc); c.setAttribute('cx', (this.sedile[0] + d * Math.cos(a)).toFixed(2)); c.setAttribute('cy', (838 + d * 0.6 * Math.sin(a)).toFixed(2)); });
    this.lampada.setAttribute('opacity', (0.95 * Math.max(0, Math.sin(Math.PI * seg(t, PE_PIENA, PE_PIENA + 1.6)))).toFixed(3));
    // Il telefono: sotto «Al parco» compare «corre».
    this.tel.setAttribute('opacity', seg(t, PE_TELEFONO[0], PE_TELEFONO[1]).toFixed(3));
    this.telB.setAttribute('opacity', eo(seg(t, PE_CORRE, PE_CORRE + 0.4)).toFixed(3));
    const z = lerp(1, 1.1, eio(seg(t, PE_TELEFONO[0], PE_TELEFONO[0] + 6))), [bx, by] = G.SALOTTO.bolla;
    this.telCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')');
    this.sub(t);
  },
});
