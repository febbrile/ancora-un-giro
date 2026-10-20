const { seg, eo, ei, eio, lerp } = kit;
// Alla luce delle altre giostre (la stazione è spenta), Ada posa la paperella scura sul bordo della vasca, apre il
// quaderno e la disegna accanto a quella della prima sera. Poi la rimette nell'acqua, e la paperella scivola via dallo
// scarico come le altre. Una striscia nuova vola sopra i tetti e le atterra in mano: Ada la legge (non si legge) e
// aggrotta la fronte. Cartello: «Fine».
// Si apre su Ada alla bancarella con la paperella in mano, dopo il salotto al buio di «pesca»; finisce sul cartello.
const FI_CAM = [
  { t: 0, cx: 700, cy: 850, z: 4.2 },
  { t: 14.4, cx: 704, cy: 852, z: 4.6 },
  // La striscia arriva da sopra i tetti.
  { t: 15.4, cx: 980, cy: 640, z: 1.35 },
  { t: 16.8, cx: 960, cy: 650, z: 1.4 },
  { t: 18.4, cx: 684, cy: 846, z: 5.0 },
  { t: 23.8, cx: 684, cy: 846, z: 5.0 },
  { t: 26.6, cx: 740, cy: 760, z: 2.6 },
];
// La paperella: da davanti al camice al bordo della vasca; poi nell'acqua, e via dallo scarico.
const FI_POSA = [0.6, 1.6], FI_ACQUA = [10.8, 12.0], FI_VIA = [12.4, 14.0];
const FI_BORDO = [701, 890], FI_DAVANTI = [672, 884], FI_GALLEGGIA = [742, 880];
// Il quaderno: Ada lo apre, e sulla pagina della prima sera disegna la seconda paperella scura.
const FI_QUADERNO = [1.8, 10.6], FI_PAGINA = [2.4, 6.0], FI_TRATTI = [2.9, 5.0], FI_COLORE = [5.0, 5.6];
const FI_ZOOM = [{ t: 2.4, cx: 1300, cy: 690, z: 1.7 }, { t: 6.0, cx: 1392, cy: 728, z: 2.5 }];
// La striscia nuova, illeggibile.
const FI_STRISCIA = [15.0, 18.0], FI_CORRUGA = 19.0;
const FI_FINE = 24.2;
kit.scene('fine', {
  init(kit) {
    const G = window.G, M = G.MONDO, A = G.MOD.mare.passeggeri, F = G.MOD.finisce, P = F.passeggeri, C = G.C;
    this.chi = [{ tipo: 'al', biglietto: A.Al.biglietto, uscita: A.Al.biglietto }, { tipo: 'mare', biglietto: A.mare.biglietto, uscita: A.mare.biglietto },
      { tipo: 'emma', biglietto: A.Emma.biglietto, uscita: A.Emma.biglietto }]
      .concat(['nuota', 'e', 'gioca', '.'].map(w => ({ tipo: 'paperella', biglietto: P[w].biglietto, uscita: P[w].biglietto })));
    this.giro = G.giro7({ id: 'f', chi: this.chi, vasca: [], t: { esce: -20, vel: [[-20, 300]] } });
    const scura = F.giri[4].vasca.find(v => v[0] === 'Fine')[2];
    const ps = G.primaSera();
    const matita = '<g class="fi-matita" opacity="0"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="#3A3570" transform="rotate(28)"/></g>';
    const pagina = '<g class="fi-quad" opacity="0"><g class="fi-pagine">' + ps.copertina + ps.sinistra + ps.destra + ps.costa + matita + '</g></g>';
    // La striscia nuova: le parole ci sono, ma non si leggono.
    const pillole = (x0, y0, ws, h) => { let x = x0, s = ''; ws.forEach(w => { s += '<rect x="' + x + '" y="' + y0 + '" width="' + w + '" height="' + h + '" rx="' + h / 2 + '" fill="#8C86B0"/>'; x += w + 10; }); return s; };
    const striscia = '<g class="fi-striscia" opacity="0"><g transform="translate(-150 -22)">' + G.striscia('', 300) + pillole(36, 17, [44, 70, 38, 62], 10) + '</g></g>';
    const fine = '<g class="fi-fine" opacity="0"><g transform="translate(960 330)"><g class="fi-insegna"></g></g></g>';
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      this.giro.treno + '<g class="fi-ada"></g>' + striscia +
      '<g class="fi-pap"><g transform="translate(-50 -84)">' + G.paperella(scura) + '</g></g>';
    this.pillole = pillole(52, 204, [26, 34, 24], 7);
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'fine', manopola: 0, banchina: true, morto: true, davanti: pagina + fine,
      html: G.sottotitolo('ADA', 'Non si ferma da solo: si ferma quando esce lei.') +
        G.sottotitolo('NARRATORE', 'E più la storia sembra finita, più paperelle scure cadono nella vasca.') +
        G.sottotitolo('ADA', 'E se nessun treno di prova ha mai portato la risposta?'),
    });
    this.giro.monta(this.m);
    this.G = G;
    // La stazione è spenta: il fanale, le lampadine, le lucine dei vagoni.
    const v0 = this.giro.vag[0];
    v0.querySelector('.g-vag-in').innerHTML = G.vagone({ primo: true, sbarra: 1, fanale: 0 }, '<g class="g-pass">' + G.passeggero('al', A.Al.biglietto) + '</g>');
    this.m.qa('.g-lampadina').forEach(el => el.setAttribute('opacity', 0.15));
    this.ada = this.m.q('.fi-ada'); this.pap = this.m.q('.fi-pap'); this.str = this.m.q('.fi-striscia');
    this.quad = this.m.q('.fi-quad'); this.pagine = this.m.q('.fi-pagine'); this.matita = this.m.q('.fi-matita');
    this.seconda = this.m.q('.g7-seconda'); this.colore = this.m.q('.g7-colore');
    this.tratti = this.m.qa('.g7-tratto'); this.lung = this.tratti.map(p => p.getTotalLength());
    this.posto = [ps.posto[0] - 30, ps.posto[1] - 84 * 0.6];
    this.fine = this.m.q('.fi-fine'); this.insegna = this.m.q('.fi-insegna');
    this.stato = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[6.4, 10.6], [11.2, 17.4], [19.4, 24.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('07', 'fine', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(FI_CAM, t));
    G.animaMondo(m, t + 1140);
    this.giro.render(t);
    m.qa('.g-lucina').forEach(el => el.setAttribute('opacity', 0.12));
    // Ada: posa la paperella, disegna, parla, la rimette nell'acqua; poi la striscia, e la fronte aggrottata.
    let posa = 'base', espr = 'felice', giu = 0, extra = '';
    if (t >= FI_POSA[0] && t < FI_POSA[1] + 0.2) { posa = 'pesca'; giu = Math.round(0.4 * Math.sin(Math.PI * seg(t, FI_POSA[0], FI_POSA[1] + 0.2)) * 40) / 40; }
    else if (t >= FI_QUADERNO[0] && t < FI_QUADERNO[1]) { posa = 'disegna'; espr = t < 6.2 ? 'base' : 'felice'; }
    else if (t >= FI_ACQUA[0] - 0.2 && t < FI_ACQUA[1] + 0.3) { posa = 'pesca'; giu = Math.round(eio(seg(t, FI_ACQUA[0] - 0.2, FI_ACQUA[0] + 0.6)) * (1 - eio(seg(t, FI_ACQUA[1] - 0.2, FI_ACQUA[1] + 0.3))) * 0.9 * 40) / 40; espr = 'felice'; }
    else if (t >= FI_ACQUA[1] + 0.3 && t < FI_STRISCIA[1]) espr = t < FI_VIA[1] ? 'felice' : 'base';
    else if (t >= FI_STRISCIA[1]) { posa = 'striscia'; espr = t < FI_CORRUGA ? 'base' : 'nessuno'; }
    const matita = posa === 'disegna' ? Math.round(10 * Math.sin(t * 9)) : 0;
    const k = posa + espr + giu + matita;
    if (k !== this.stato) {
      let html = G.ada(posa, espr, { giu, matita });
      if (posa === 'striscia') {
        html = html.replace(/<\/g>$/, this.pillole + '</g>');
        // La fronte aggrottata: due sopracciglia che scendono verso il naso, e la bocca storta.
        if (espr === 'nessuno') html = html.replace(/<path d="M92 106 Q100 112 108 106"[^>]*>/, '<path d="M92 108 Q97 104 102 107 Q106 110 109 106" stroke="#2E2A26" stroke-width="2.6" stroke-linecap="round" fill="none"/>')
          .replace(/<\/g>$/, '<path d="M76 67 L95 73 M105 73 L124 67" stroke="#3A2418" stroke-width="3.6" stroke-linecap="round"/></g>');
      }
      this.ada.innerHTML = '<g transform="' + G.posaAda(672, 896) + '">' + html + '</g>';
      this.stato = k;
    }
    // La paperella scura: davanti al camice, sul bordo, nell'acqua, via dallo scarico.
    let px = FI_DAVANTI[0], py = FI_DAVANTI[1], ps = 0.18, po = 1;
    if (t >= FI_POSA[0]) { const u = eio(seg(t, FI_POSA[0], FI_POSA[1])); px = lerp(FI_DAVANTI[0], FI_BORDO[0], u); py = lerp(FI_DAVANTI[1], FI_BORDO[1], u) - 6 * Math.sin(Math.PI * u); ps = lerp(0.18, 0.16, u); }
    if (t >= FI_ACQUA[0]) { const u = eio(seg(t, FI_ACQUA[0], FI_ACQUA[1])); px = lerp(FI_BORDO[0], FI_GALLEGGIA[0], u); py = lerp(FI_BORDO[1], FI_GALLEGGIA[1], u) - 8 * Math.sin(Math.PI * u) + 1.2 * Math.sin(t * 2.2) * u; }
    if (t >= FI_VIA[0]) {
      const via = eio(seg(t, FI_VIA[0], FI_VIA[1])), a = via * 2.4;
      px = lerp(FI_GALLEGGIA[0], 772 + 8 * Math.cos(a), via); py = lerp(FI_GALLEGGIA[1], 884, via); ps = 0.16 * (1 - via); po = 1 - seg(via, 0.85, 1);
    }
    this.pap.setAttribute('transform', 'translate(' + px.toFixed(2) + ' ' + py.toFixed(2) + ') scale(' + ps.toFixed(4) + ')');
    this.pap.setAttribute('opacity', po.toFixed(3));
    // Il quaderno da vicino: la matita disegna la seconda paperella scura, accanto alla prima.
    this.quad.setAttribute('opacity', (seg(t, FI_PAGINA[0] - 0.15, FI_PAGINA[0]) * (1 - seg(t, FI_PAGINA[1] - 0.15, FI_PAGINA[1]))).toFixed(3));
    this.pagine.setAttribute('transform', G.camChiavi(FI_ZOOM, t));
    this.seconda.setAttribute('opacity', 1);
    const n = this.tratti.length, dur = (FI_TRATTI[1] - FI_TRATTI[0]) / n;
    let punta = null;
    this.tratti.forEach((p, i) => {
      const u = eio(seg(t, FI_TRATTI[0] + i * dur, FI_TRATTI[0] + (i + 1) * dur));
      p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1));
      p.setAttribute('stroke-dashoffset', ((1 - u) * this.lung[i]).toFixed(1));
      if (u > 0 && u < 1) punta = p.getPointAtLength(u * this.lung[i]);
    });
    this.colore.setAttribute('opacity', eo(seg(t, FI_COLORE[0], FI_COLORE[1])).toFixed(3));
    if (punta) this.matita.setAttribute('transform', 'translate(' + (this.posto[0] + 0.6 * punta.x).toFixed(1) + ' ' + (this.posto[1] + 0.6 * punta.y).toFixed(1) + ')');
    this.matita.setAttribute('opacity', t > FI_TRATTI[0] - 0.3 && t < FI_COLORE[1] ? 1 : 0);
    // La striscia nuova vola sopra i tetti e atterra nelle mani di Ada.
    const us = eio(seg(t, FI_STRISCIA[0], FI_STRISCIA[1]));
    const sx = lerp(1780, 672, us), sy = lerp(260, 869, us) - 260 * Math.sin(Math.PI * us);
    this.str.setAttribute('transform', 'translate(' + sx.toFixed(1) + ' ' + sy.toFixed(1) + ') rotate(' + (Math.sin(t * 5) * 10 * (1 - us)).toFixed(1) + ') scale(' + lerp(0.6, 0.123, us).toFixed(3) + ')');
    this.str.setAttribute('opacity', t >= FI_STRISCIA[0] && t < FI_STRISCIA[1] ? 1 : 0);
    // Il cartello: «Fine».
    const f = eo(seg(t, FI_FINE, FI_FINE + 1.0));
    this.fine.setAttribute('opacity', f.toFixed(3));
    this.fine.setAttribute('transform', 'translate(0 ' + (16 * (1 - f)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('Fine', 520, 200, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
