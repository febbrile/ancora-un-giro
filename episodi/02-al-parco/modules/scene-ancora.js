const { seg, eo, ei, eio, lerp } = kit;
// I due treni ripartono, un vagone più lungo. Poco dopo, da una terza casa, arriva di nuovo «Al parco Emma». In un lampo,
// a montaggio: stessi biglietti, stesso treno con Parco, stesso giro; Emma esce dello stesso verde e la vasca si riempie
// con le stesse paperelle. Ada pesca, sicura: questa volta esce una paperella turchese, «gioca». Cartello: «Fine».
// Si apre come finisce «pesca».
const AN_CAM = [
  { t: 0, cx: 190, cy: 720, z: 1.8 },
  { t: 1.2, cx: 190, cy: 720, z: 1.8 },
  { t: 5.6, cx: 900, cy: 560, z: 1.05 },
  // La striscia arriva ad Ada.
  { t: 8.4, cx: 534, cy: 790, z: 4.0, da: 8.39 },
  { t: 10.4, cx: 534, cy: 790, z: 4.0 },
  // Il treno di nuovo pronto in stazione.
  { t: 10.41, cx: 250, cy: 800, z: 3.6, da: 10.4 },
  { t: 12.4, cx: 250, cy: 800, z: 3.6 },
  // L'uscita sopra la vasca.
  { t: 12.41, cx: 800, cy: 840, z: 3.6, da: 12.4 },
  { t: 14.0, cx: 772, cy: 862, z: 4.4 },
  { t: 17.0, cx: 772, cy: 862, z: 4.4 },
  { t: 17.8, cx: 700, cy: 846, z: 4.6 },
  { t: 20.4, cx: 700, cy: 846, z: 4.6 },
  { t: 22.0, cx: 520, cy: 816, z: 3.2 },
  { t: 25.6, cx: 640, cy: 846, z: 3.6 },
  { t: 28.6, cx: 640, cy: 846, z: 3.6 },
  { t: 31.6, cx: 760, cy: 700, z: 1.7 },
];
const AN_VEL = [[[0, 0], [1.0, 0], [2.4, 160], [3.2, 220]], [[0, 0], [1.4, 0], [3.0, 150], [4.6, 220]]];
const AN_PARTENZE = [920, 490];
// Fuori campo, tra a e b, il treno corre il resto della banchina, la salita e un pezzo di viadotto, e a b è al punto s.
const AN_FUORI = [[3.05, 3.6, 3380], [5.0, 5.6, 3540]];
function anDove(n, t) {
  const G = window.G, [a, b, s] = AN_FUORI[n], v = AN_PARTENZE[n] + G.percorso(t, 0, AN_VEL[n]);
  return v + (s - AN_PARTENZE[n] - G.percorso(b, 0, AN_VEL[n])) * eio(seg(t, a, b));
}
const AN_CASA = [5.6, 6.0, 8.0, 8.4];
const AN_CASA_DI_NUOVO = [22.6, 23.0, 25.4, 25.8];
const AN_STRISCIA = [8.4, 9.8];
const AN_PRONTO = [10.4, 12.4];
const AN_ESCE = 12.6;
const AN_C_VEL = [[AN_ESCE, 220], [13.6, 90], [15.4, 90], [16.2, 220], [17.6, 220], [18.8, 0]];
const AN_ADA = [672, 896];
const AN_PESCA = { giu: 17.4, su: 19.0, preso: 19.5 };
const AN_SALTA = 20.6, AN_SALE = 22.6, AN_VAGONE = 21.8;
const AN_FINE = 29.2;
const AN_NERO = [12.2, 12.4, 12.6];
kit.scene('ancora', {
  init(kit) {
    const G = window.G, M = G.MONDO, A = G.MOD.mare, D = G.MOD.parco, P = D.passeggeri;
    this.lista = G.papereVasca(D.vasca);
    let best = 0, bd = 1e9;
    this.lista.forEach((p, i) => { const d = Math.abs(p.x - 700) + Math.abs(p.y - 880); if (p.parola === 'gioca' && d < bd) { bd = d; best = i; } });
    this.presa = best; this.colPresa = this.lista[best].col;
    const ordine = this.lista.map((p, i) => i).sort((a, b) => this.lista[a].y - this.lista[b].y);
    const papere = ordine.map(i => '<g class="an-pap" data-i="' + i + '"><g transform="translate(-50 -84)"><g class="an-vera">' + G.paperella(this.lista[i].col) + '</g><g class="an-dilu">' + G.paperellaDiLuce(this.lista[i].col) + '</g></g></g>').join('');
    this.chiC = [['al', P.Al], ['parco', P.parco], ['emma', P.Emma]];
    const treni = [
      [{ tipo: 'al', col: A.passeggeri.Al.biglietto }, { tipo: 'mare', col: A.passeggeri.mare.biglietto }, { tipo: 'emma', col: A.passeggeri.Emma.biglietto }, { tipo: 'paperella', col: A.nuovo.nuota }],
      [{ tipo: 'al', col: P.Al.biglietto }, { tipo: 'parco', col: P.parco.biglietto }, { tipo: 'emma', col: P.Emma.biglietto }, { tipo: 'paperella', col: D.nuovo.corre }],
      this.chiC.map(c => ({ tipo: c[0], col: c[1].biglietto })).concat([{ tipo: 'paperella', col: D.nuovo.gioca }]),
    ];
    let scintille = '';
    for (let k = 0; k < 10; k++) scintille += '<circle r="2.4" fill="' + G.C.luce + '"/>';
    const sopra = treni.map((c, n) => '<g class="an-treno" data-n="' + n + '">' + G.treno(c, { sbarra: 1 }) + '</g>').join('') +
      '<g class="an-scint" opacity="0">' + scintille + '</g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="an-ada"></g>' +
      '<g class="an-striscia" opacity="0"><g transform="translate(-150 -22)">' + G.striscia('Al parco Emma', 300) + '</g></g>' +
      '<ellipse class="an-luce" rx="22" ry="18" fill="' + this.colPresa + '" opacity="0" filter="url(#g-soft)"/>' +
      '<g class="an-mano"><g transform="translate(-50 -84)">' + G.paperella(this.colPresa) + '</g></g>';
    // La terza casa: un'altra stanza, lo stesso messaggio; poi, sotto, la parola pescata.
    const z = 1.16, [bx, by] = G.SALOTTO.bolla;
    const camTel = 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z + ')';
    const muro = { muro: ['#3E2E22', '#5E4632', '#7A5A3C'] };
    const casa = '<g class="an-casa" opacity="0"><g transform="' + camTel + '">' + G.salotto('<g class="an-tel-a">' + G.telefono({ messaggi: ['Al parco Emma'] }) + '</g><g class="an-tel-b" opacity="0">' + G.telefono({ messaggi: ['Al parco Emma'], rispostaTesto: 'gioca' }) + '</g>', muro) + '</g></g>';
    const fine = '<g class="an-fine" opacity="0"><g transform="translate(960 330)"><g class="an-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'ancora', davanti: '<rect class="an-nero" x="-200" y="-200" width="2320" height="1480" fill="#07060F" opacity="0"/>' + casa + fine,
      html: G.sottotitolo('NARRATORE', 'Poco dopo arriva di nuovo la stessa frase. Stesso treno, stesso giro, stessa vasca.') +
        G.sottotitolo('ADA', 'Stessa vasca… e un’altra paperella?') +
        G.sottotitolo('NARRATORE', 'Ma questa è un’altra storia.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', papere);
    this.G = G;
    this.treni = [0, 1, 2].map(n => this.m.qa('.an-treno[data-n="' + n + '"] .g-vag'));
    this.passC = this.treni[2].map(v => v.querySelector('.g-pass'));
    this.ada = this.m.q('.an-ada'); this.str = this.m.q('.an-striscia'); this.nero = this.m.q('.an-nero');
    this.mano = this.m.q('.an-mano'); this.luce = this.m.q('.an-luce'); this.scint = this.m.q('.an-scint');
    this.pap = this.m.qa('.an-pap').map(el => ({ el, i: +el.dataset.i, vera: el.querySelector('.an-vera'), luce: el.querySelector('.an-dilu') }));
    this.casa = this.m.q('.an-casa'); this.telB = this.m.q('.an-tel-b');
    this.fine = this.m.q('.an-fine'); this.insegna = this.m.q('.an-insegna');
    const path = this.m.arrivo, sF = path.getTotalLength() - (M.fermo - 40);
    this.sF = sF;
    const sAt = t => Math.min(sF, G.percorso(t, 0, AN_C_VEL));
    this.cade = this.lista.map(p => {
      for (let t = AN_ESCE; t < 20; t += 0.02) { const se = sAt(t) - 2 * M.passo; if (se > 0 && path.getPointAtLength(se).x <= p.x + 6) return t; }
      return 15;
    });
    this.sedile = [M.fermo + 3 * M.passo + 6, 816];
    this.stato = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[6.4, 14.4], [25.8, 29.0], [29.4, 31.8]]);
  },
  manoAt(giu) {
    const s = 0.28, [ax, ay] = AN_ADA, mx = 150 + 26 * giu - 6, my = 230 + 50 * giu + 6;
    return [ax - 100 * s + mx * s, ay - 304 * s + my * s];
  },
  render(t, kit) {
    t = window.G.tempo('02', 'ancora', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(AN_CAM, t));
    G.animaMondo(m, t + 860);
    this.nero.setAttribute('opacity', (seg(t, AN_NERO[0], AN_NERO[1]) * (1 - seg(t, AN_NERO[1], AN_NERO[2]))).toFixed(3));
    // I due treni di prima ripartono e spariscono nella montagna.
    [0, 1].forEach(n => {
      const v = this.treni[n], s = anDove(n, t);
      G.posaTreno(v, m.partenza, s);
      G.nascondiInMontagna(v, m.partenza, s, { fine: true });
      if (t > 8) v.forEach(el => el.setAttribute('opacity', 0));
    });
    // Il terzo treno: pronto in stazione, poi (a montaggio) esce dalla montagna e torna in stazione.
    const C = this.treni[2];
    let sC = -500;
    if (t >= AN_PRONTO[0] && t < AN_PRONTO[1]) {
      G.posaTreno(C, m.arrivo, this.sF);
      C.forEach((el, i) => el.setAttribute('opacity', i < 3 ? 1 : 0));
      this.passC.slice(0, 3).forEach((p, i) => { const v = eo(seg(t, AN_PRONTO[0] + 0.2 + i * 0.3, AN_PRONTO[0] + 0.8 + i * 0.3)); p.setAttribute('opacity', v.toFixed(3)); });
      this.chiC.forEach((c, i) => G.cambiaPasseggero(C[i], c[0], c[1].biglietto));
    } else if (t >= AN_ESCE) {
      sC = Math.min(this.sF, G.percorso(t, 0, AN_C_VEL));
      G.posaTreno(C, m.arrivo, sC);
      G.nascondiInMontagna(C, m.arrivo, sC, { inizio: true });
      this.passC.slice(0, 3).forEach(p => p.setAttribute('opacity', 1));
      C[3].setAttribute('opacity', eo(seg(t, AN_VAGONE, AN_VAGONE + 0.6)).toFixed(3));
      const torna = Math.round(seg(sC, this.sF - 150, this.sF) * 12) / 12;
      this.chiC.forEach((c, i) => G.cambiaPasseggero(C[i], c[0], G.mix(c[1].tratti[2], c[1].biglietto, torna)));
    } else C.forEach(el => el.setAttribute('opacity', 0));
    this.passC[3].setAttribute('opacity', seg(t, AN_SALE - 0.05, AN_SALE + 0.3).toFixed(3));
    // La striscia scende dal cielo nelle mani di Ada.
    const us = eio(seg(t, AN_STRISCIA[0], AN_STRISCIA[1]));
    const sx = lerp(760, M.ada[0], us), sy = lerp(640, 808, us) - 40 * Math.sin(Math.PI * us);
    this.str.setAttribute('transform', 'translate(' + sx.toFixed(1) + ' ' + sy.toFixed(1) + ') rotate(' + ((1 - us) * -14).toFixed(1) + ') scale(' + lerp(0.3, 0.123, us).toFixed(3) + ')');
    this.str.setAttribute('opacity', t >= AN_STRISCIA[0] && t < AN_STRISCIA[1] ? 1 : 0);
    // La vasca: si riempie uguale, poi, dopo la pesca, si svuota.
    this.pap.forEach(({ el, i, vera, luce }) => {
      const t0 = this.cade[i], p = this.lista[i];
      const u = seg(t, t0, t0 + 0.55);
      // Cadono ancora di luce, come nelle finestre; quando toccano l'acqua sono vere.
      const vv = seg(u, 0.55, 1);
      vera.setAttribute('opacity', vv.toFixed(3)); luce.setAttribute('opacity', (1 - vv).toFixed(3));
      const via = eio(seg(t, 20.4 + (i % 7) * 0.12, 22.0 + (i % 7) * 0.12)), a = via * 2.4 + i;
      const x = lerp(p.x, 772 + 8 * Math.cos(a), via);
      const y = lerp(lerp(808, p.y, ei(u)) + (u >= 1 ? 1.2 * Math.sin(t * 2.2 + i) : 0), 884, via);
      el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.16 * (u < 1 ? lerp(0.7, 1, u) : 1) * (1 - via)).toFixed(4) + ')');
      el.setAttribute('opacity', t < AN_ESCE || t < t0 ? 0 : i === this.presa ? (t < AN_PESCA.su + 0.2 ? 1 : 0) : (1 - seg(via, 0.85, 1)).toFixed(3));
    });
    // Ada: riceve la striscia, poi alla vasca pesca sicura; apre gli occhi e si stupisce.
    let giu = 0;
    if (t >= AN_PESCA.giu - 0.6) giu = eio(seg(t, AN_PESCA.giu - 0.6, AN_PESCA.giu + 0.4));
    if (t > AN_PESCA.giu + 0.4 && t < AN_PESCA.su) giu = 0.9 + 0.1 * Math.sin((t - AN_PESCA.giu) * 9);
    if (t >= AN_PESCA.su) giu = 1 - eio(seg(t, AN_PESCA.su, AN_PESCA.preso + 0.4));
    const giuQ = Math.round(giu * 40) / 40;
    let k, html;
    if (t < 10.4) {
      const presa = t >= AN_STRISCIA[1];
      k = 'staz' + presa;
      html = '<g transform="' + G.posaAda(M.ada[0], M.ada[1]) + '">' + G.ada(presa ? 'striscia' : 'base', presa ? 'felice' : 'base', { testo: 'Al parco Emma' }) + '</g>';
    } else {
      const posa = t < 16.6 ? 'quaderno' : t < 24 ? 'pesca' : 'quaderno';
      const espr = t < 16.6 ? 'felice' : t < AN_PESCA.giu - 0.6 ? 'felice' : t < AN_PESCA.preso + 0.6 ? 'chiusi' : t < 24 ? 'sorpresa' : 'pensa';
      k = posa + espr + giuQ;
      html = '<g transform="' + G.posaAda(AN_ADA[0], AN_ADA[1]) + '">' + G.ada(posa, espr, { giu: giuQ }) + '</g>';
    }
    if (k !== this.stato) { this.ada.innerHTML = html; this.stato = k; }
    const [hx, hy] = this.manoAt(giuQ);
    let px = hx, py = hy, pr = 0, pv = t >= AN_PESCA.su + 0.2 ? 1 : 0;
    if (t >= AN_SALTA) {
      const a = eo(seg(t, AN_SALTA, AN_SALTA + 0.6)), corsa = eio(seg(t, AN_SALTA + 0.6, AN_SALE - 0.4)), salto = eio(seg(t, AN_SALE - 0.4, AN_SALE));
      if (t < AN_SALTA + 0.6) { px = lerp(hx, 636, a); py = lerp(hy, 836, a) - 30 * Math.sin(Math.PI * a); }
      else if (t < AN_SALE - 0.4) { px = lerp(636, this.sedile[0] + 24, corsa); py = 836 - 3 * Math.abs(Math.sin(t * 12)); pr = 9 * Math.sin(t * 12); }
      else { px = lerp(this.sedile[0] + 24, this.sedile[0], salto); py = lerp(836, this.sedile[1], salto) - 22 * Math.sin(Math.PI * salto); }
      pv = t < AN_SALE ? 1 : 1 - seg(t, AN_SALE, AN_SALE + 0.3);
    }
    this.mano.setAttribute('transform', 'translate(' + px.toFixed(2) + ' ' + py.toFixed(2) + ') rotate(' + pr.toFixed(2) + ') scale(0.16)');
    this.mano.setAttribute('opacity', pv.toFixed(3));
    const luce = seg(t, AN_PESCA.su + 0.3, AN_PESCA.preso + 0.4) * (1 - seg(t, 20.0, 20.6));
    this.luce.setAttribute('cx', hx.toFixed(1)); this.luce.setAttribute('cy', (hy - 10).toFixed(1));
    this.luce.setAttribute('opacity', (0.6 * luce).toFixed(3));
    const sc = seg(t, AN_VAGONE, AN_VAGONE + 1.1);
    this.scint.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
    [...this.scint.children].forEach((c, n) => { const a = n * Math.PI / 5, d = 10 + 34 * eo(sc); c.setAttribute('cx', (this.sedile[0] + d * Math.cos(a)).toFixed(2)); c.setAttribute('cy', (838 + d * 0.6 * Math.sin(a)).toFixed(2)); });
    // La terza casa: prima il messaggio inviato, poi la parola pescata.
    const casa = Math.max(seg(t, AN_CASA[0], AN_CASA[1]) * (1 - seg(t, AN_CASA[2], AN_CASA[3])), seg(t, AN_CASA_DI_NUOVO[0], AN_CASA_DI_NUOVO[1]) * (1 - seg(t, AN_CASA_DI_NUOVO[2], AN_CASA_DI_NUOVO[3])));
    this.casa.setAttribute('opacity', casa.toFixed(3));
    this.telB.setAttribute('opacity', eo(seg(t, AN_CASA_DI_NUOVO[1] + 0.4, AN_CASA_DI_NUOVO[1] + 0.8)).toFixed(3));
    // Il cartello: «Fine».
    const f = eo(seg(t, AN_FINE, AN_FINE + 1.0));
    this.fine.setAttribute('opacity', f.toFixed(3));
    this.fine.setAttribute('transform', 'translate(0 ' + (16 * (1 - f)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('Fine', 520, 200, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
