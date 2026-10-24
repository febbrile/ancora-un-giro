const { seg, eo, eio, lerp } = kit;
// Arriva di nuovo «Domani piove?». Sul Bruco esce verde. In testa al treno, dietro la frase del parco, adesso c'è la
// bandierina turchese. Il treno fa il suo giro ed esce sopra la vasca: sotto la bandierina d'ottone cadono tantissime
// paperelle viola chiaro, e intorno le altre, sparse. Ada pesca una viola: la paperella corre sul treno come tutte, ma sul
// telefono non arriva niente, solo tre puntini. Giro dopo giro, a montaggio: la vasca si riempie di paperelle rosa, e Ada
// ne pesca una; poi di paperelle viola scuro, e Ada ne pesca una. Il custode alza la lanterna.
// Si apre sul Bruco; finisce sul custode con la lanterna alzata (la riprende «cabina»).
const VI_BRUCO = { sale: 0.2, passo: 0.25, parte: 0.9, giro: 2.2 };
const VI_TESTA = [3.4, 6.4];
const VI_GIRI = [
  { esce: 6.6, vel: [[6.6, 360], [8.4, 360], [8.9, 60], [11.0, 60], [11.6, 260]], pesca: { giu: 11.4, su: 12.2, preso: 12.6 }, via: 13.0, salta: 13.0, vagone: 13.6, sale: 14.2 },
  { esce: 17.6, vel: [[17.6, 520], [19.6, 520], [20.0, 80], [21.6, 80], [22.0, 300]], pesca: { giu: 21.4, su: 22.0, preso: 22.3 }, via: 22.7, salta: 22.7, vagone: 23.1, sale: 23.6 },
  { esce: 24.2, vel: [[24.2, 560], [26.2, 560], [26.6, 80], [28.2, 80], [28.6, 300]], pesca: { giu: 28.0, su: 28.6, preso: 28.9 }, via: 29.3, salta: 29.3, vagone: 29.7, sale: 30.2 },
];
const VI_TEL = [14.6, 17.4];
const VI_CU = [930, 936], VI_ALZA = 30.6;
const VI_CAM = [
  { t: 0, cx: 1260, cy: 980, z: 3.0 },
  { t: 3.39, cx: 1260, cy: 980, z: 3.0 },
  { t: 3.4, cx: -40, cy: 790, z: 3.4 },
  { t: 6.39, cx: 40, cy: 790, z: 3.4 },
  { t: 6.4, cx: 740, cy: 846, z: 3.6 },
  { t: 14.59, cx: 700, cy: 846, z: 3.6 },
  { t: 17.4, cx: 740, cy: 846, z: 3.6 },
  { t: 30.0, cx: 740, cy: 846, z: 3.6 },
  { t: 31.0, cx: 820, cy: 860, z: 3.0 },
];
kit.scene('viola', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, TE = G.MOD.seconda.teleferica, PA = TE.paperelle, F = G.MOD.seconda.bruco.frasi.piove;
    const gio = S2.giostrina({ sbarra: 0, luci: 1 });
    this.bruco = S2.giroBruco({ id: 'vib', parole: F.frase, vestiti: F.vestiti, uscita: F.uscita, rosse: F.rosse, verdi: F.verdi, seme: 71, mano: [1120, 960], t: VI_BRUCO });
    const nuovi = ['teleferica', 'domani', 'teleferica·fine'];
    this.giri = TE.pioggia.slice(0, 3).map((g, k) => G.giro7({ id: 'g' + k, chi: S2.trenoDa(g.frase, g.tratti), vasca: g.vasca, seme: 161 + 2 * k, parola: g.pescata,
      nuovo: PA[nuovi[k]], fermo: G.fermoTreno(g.frase.length + 1), t: VI_GIRI[k] }));
    // Il treno fermo in stazione, con la bandierina turchese dietro «Storie di mare».
    this.chi = S2.trenoDa(TE.pioggia[0].frase, TE.pioggia[0].tratti);
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="vi-fermo">' + G.treno(this.chi.map(c => ({ tipo: c.tipo, col: c.biglietto, o: c.o })), { sbarra: 1 }) + '</g>' +
      this.giri.map(g => g.treno).join('') + gio.dietro + this.bruco.bruco + gio.davanti + '<g class="vi-ada"></g><g class="vi-cu"></g>' + this.giri.map(g => g.mano).join('');
    const casa = '<g class="vi-casa" opacity="0"><g class="vi-casa-cam">' + G.salotto('<g class="vi-tel"></g>') + '</g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'viola', manopola: 0, banchina: true, morto: true, davanti: casa,
      html: G.sottotitolo('NARRATORE', 'Adesso, tra le paperelle sparse, ce ne sono tante viola.') +
        G.sottotitolo('NARRATORE', 'Dopo la viola chiara Ada pesca una paperella rosa, poi una viola scura.') +
        G.sottotitolo('CUSTODE', 'Viola scura: si parte.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', this.giri.map(g => g.papere).join(''));
    this.m.q('.g-bruco-vasca').insertAdjacentHTML('beforeend', this.bruco.papere);
    this.giri.forEach(g => g.monta(this.m)); this.bruco.monta(this.m);
    this.G = G;
    const q = this.m.q;
    this.fermo = this.m.qa('.vi-fermo .g-vag');
    G.posaTreno(this.fermo, this.m.partenza, 640 - G.fermoTreno(11), null, M.passoBanchina);
    this.fermoEl = q('.vi-fermo'); this.ada = q('.vi-ada'); this.cu = q('.vi-cu');
    this.casa = q('.vi-casa'); this.casaCam = q('.vi-casa-cam'); this.tel = q('.vi-tel');
    this.stati = {};
    this.sub = G.subs(kit, [[8.6, 13.6], [18.0, 24.6], [30.6, 33.0]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('12', 'viola', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(VI_CAM, t));
    G.animaMondo(m, t + 1760);
    this.bruco.render(t);
    this.fermoEl.setAttribute('opacity', t >= VI_TESTA[0] && t < VI_TESTA[1] ? 1 : 0);
    // I giri: ognuno nel suo tratto di montaggio.
    const quale = t < VI_GIRI[1].esce ? 0 : t < VI_GIRI[2].esce ? 1 : 2;
    const res = this.giri.map((g, k) => {
      const vivo = k === quale && t >= VI_GIRI[k].esce - 0.1;
      const r = g.render(vivo ? t : -100);
      if (!vivo) g.vag.forEach(v => v.setAttribute('opacity', 0));
      return r;
    });
    // Ada, alla bancarella.
    const T = VI_GIRI[quale], r = res[quale];
    const pesca = t >= T.pesca.giu - 0.8 && t < T.pesca.preso + 0.8;
    const espr = pesca ? (t < T.pesca.preso + 0.1 ? 'chiusi' : 'sorpresa') : t > VI_ALZA ? 'sorpresa' : 'base';
    this.cambia('ada', (pesca ? 'p' : 'q') + espr + (pesca ? r.giu : 0), this.ada, '<g transform="' + G.posaAda(672, 896) + '">' + G.ada(pesca ? 'pesca' : 'quaderno', espr, { giu: pesca ? r.giu : 0 }) + '</g>');
    // Il custode guarda, accanto alla vasca; all'ultima pesca alza la lanterna.
    const alza = t >= VI_ALZA, dond = Math.round(8 * Math.sin(t * 3));
    this.cambia('cu', alza + '' + dond, this.cu, t < 6.4 ? '' : '<g transform="' + G.posaCustode(VI_CU[0], VI_CU[1]) + '">' + G.unico(G.custode(alza ? 'alza' : 'base', alza ? 'serio' : 'base', { occhi: -1, dondolo: dond }), 'vicu') + '</g>');
    // La casa: sul telefono, solo tre puntini.
    const on = seg(t, VI_TEL[0], VI_TEL[0] + 0.2) * (1 - seg(t, VI_TEL[1] - 0.2, VI_TEL[1]));
    this.casa.setAttribute('opacity', on.toFixed(3));
    if (on > 0) {
      this.cambia('tel', (Math.round(t * 30) / 30).toFixed(3), this.tel, G.unico(G.telefono({ chat: [['io', 'Domani piove?']], puntini: t }), 'vitel'));
      const z = lerp(1.0, 1.08, seg(t, VI_TEL[0], VI_TEL[1])), [bx, by] = G.SALOTTO.bolla;
      this.casaCam.setAttribute('transform', 'translate(' + (bx - bx * z).toFixed(2) + ' ' + (by - by * z).toFixed(2) + ') scale(' + z.toFixed(4) + ')');
    }
    this.sub(t);
  },
});
