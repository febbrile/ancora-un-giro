const { seg, eo, ei, eio, lerp } = kit;
// Il treno scivola in stazione e si ferma; i vestiti tornano piano del colore dei biglietti («rù» di nuovo grigio
// argento). Ada chiude gli occhi, infila la mano nella vasca e tira fuori una paperella blu. La paperella le salta di
// mano e corre a sedersi in un vagone nuovo, dietro «rù»; le altre scivolano via dallo scarico. Stacco sulla cameretta:
// sul telefono, sotto «Al mare Zampirù», compare «nuota», e una mano piccola accarezza il disegno.
// Si apre come finisce «vasca»; finisce sul treno di sei vagoni in stazione (lo riprende «ancora»).
const PS_CAM = [
  { t: 0, cx: 600, cy: 836, z: 3.4 },
  { t: 1.6, cx: 600, cy: 836, z: 3.4 },
  { t: 3.6, cx: 716, cy: 850, z: 4.4 },
  { t: 10.6, cx: 716, cy: 850, z: 4.4 },
  { t: 12.4, cx: 590, cy: 826, z: 3.4 },
  { t: 19.6, cx: 590, cy: 826, z: 3.4 },
  { t: 20.4, cx: 420, cy: 780, z: 2.4 },
];
const PS_PASSO = 76, PS_S0 = 716;
const PS_VEL = [[0, 22], [2.0, 40], [4.0, 0]];
const PS_TORNA = [0.6, 4.0];
const PS_ADA = [672, 896];
const PS_PESCA = { giu: 4.6, su: 6.4, preso: 6.9 };
const PS_SALTA = 10.6, PS_SALE = 13.4, PS_VAGONE = 12.6, PS_SCARICO = 9.4;
const PS_CASA = [14.2, 14.8, 19.8, 20.6], PS_RISPOSTA = 15.2, PS_CAREZZA = [16.4, 19.6];
const PS_CASA_CAM = [
  { t: 14.2, cx: 950, cy: 520, z: 2.0 },
  { t: 16.0, cx: 950, cy: 520, z: 2.0 },
  { t: 17.6, cx: 760, cy: 560, z: 1.25 },
];
kit.scene('pesca', {
  init(kit) {
    const G = window.G, M = G.MONDO, Z = G.MOD.zampiru, P = Z.passeggeri;
    this.lista = G.papereVasca(Z.vasca, 46);
    let best = 0, bd = 1e9;
    this.lista.forEach((p, i) => { const d = Math.abs(p.x - 700) + Math.abs(p.y - 880); if (p.parola === 'nuota' && d < bd) { bd = d; best = i; } });
    this.presa = best; this.colPresa = this.lista[best].col;
    const ordine = this.lista.map((p, i) => i).sort((a, b) => this.lista[a].y - this.lista[b].y);
    const papere = ordine.map(i => '<g class="ps-pap" data-i="' + i + '"><g transform="translate(-50 -84)">' + G.paperella(this.lista[i].col) + '</g></g>').join('');
    this.chi = [['al', P.Al, ''], ['mare', P.mare, ''], ['pezzo', P.Zam, 'd'], ['pezzo', P.pi, 'sd'], ['pezzo', P['rù'], 's']];
    const treno = this.chi.map(([tipo, p, strappo]) => ({ tipo, col: p.tratti[2], o: { strappo } })).concat([{ tipo: 'paperella', col: Z.nuovo.nuota }]);
    let scintille = '';
    for (let k = 0; k < 10; k++) scintille += '<circle r="2.4" fill="' + G.C.luce + '"/>';
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="ps-treno">' + G.treno(treno, { sbarra: 1 }) + '</g>' +
      '<g class="ps-scint" opacity="0">' + scintille + '</g>' +
      '<g class="ps-ada"></g>' +
      '<ellipse class="ps-luce" rx="22" ry="18" fill="' + this.colPresa + '" opacity="0" filter="url(#g-soft)"/>' +
      '<g class="ps-mano"><g transform="translate(-50 -84)">' + G.paperella(this.colPresa) + '</g></g>';
    const casa = '<g class="ps-casa" opacity="0"><g class="ps-casa-cam"></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'pesca', manopola: 0, banchina: true, morto: true, davanti: casa,
      html: G.sottotitolo('ADA', 'Una parola mai sentita… e nuota!') + G.sottotitolo('NARRATORE', 'Al mare Zampirù nuota.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', papere);
    this.G = G;
    this.vag = this.m.qa('.ps-treno .g-vag');
    this.vagNuovo = this.vag[5]; this.passNuovo = this.vagNuovo.querySelector('.g-pass');
    this.ada = this.m.q('.ps-ada'); this.mano = this.m.q('.ps-mano'); this.luce = this.m.q('.ps-luce'); this.scint = this.m.q('.ps-scint');
    this.pap = this.m.qa('.ps-pap').map(el => ({ el, i: +el.dataset.i }));
    this.casa = this.m.q('.ps-casa'); this.casaCam = this.m.q('.ps-casa-cam');
    this.sF = this.m.arrivo.getTotalLength() - (M.fermo - 40);
    this.sedile = [M.fermo + 5 * PS_PASSO + 6, 816];
    this.stato = ''; this.statoCasa = '';
    this.sub = G.subs(kit, [[7.4, 10.4], [15.6, 18.4]]);
  },
  manoAt(giu) {
    const s = 0.28, [ax, ay] = PS_ADA, mx = 150 + 26 * giu - 6, my = 230 + 50 * giu + 6;
    return [ax - 100 * s + mx * s, ay - 304 * s + my * s];
  },
  render(t, kit) {
    t = window.G.tempo('06', 'pesca', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(PS_CAM, t));
    G.animaMondo(m, t + 740);
    // Il treno arriva in stazione e si ferma; i vestiti tornano del colore dei biglietti.
    const s = Math.min(this.sF, G.percorso(t, PS_S0, PS_VEL));
    G.posaTreno(this.vag, m.arrivo, s, null, PS_PASSO);
    const torna = Math.round(eio(seg(t, PS_TORNA[0], PS_TORNA[1])) * 12) / 12;
    this.chi.forEach(([tipo, p, strappo], i) => G.cambiaPasseggero(this.vag[i], tipo, G.mix(p.tratti[2], p.biglietto, torna), { strappo }));
    // Ada pesca a occhi chiusi.
    let giu = 0;
    if (t >= PS_PESCA.giu - 0.6) giu = eio(seg(t, PS_PESCA.giu - 0.6, PS_PESCA.giu + 0.4));
    if (t > PS_PESCA.giu + 0.4 && t < PS_PESCA.su) giu = 0.9 + 0.1 * Math.sin((t - PS_PESCA.giu) * 9);
    if (t >= PS_PESCA.su) giu = 1 - eio(seg(t, PS_PESCA.su, PS_PESCA.preso + 0.4));
    const posa = t < 3.6 ? 'quaderno' : 'pesca';
    const espr = t < 3.6 ? 'felice' : t < PS_PESCA.preso ? 'chiusi' : t < 10.6 ? 'sorpresa' : 'felice';
    const giuQ = Math.round(giu * 40) / 40;
    const k = posa + espr + giuQ;
    if (k !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(PS_ADA[0], PS_ADA[1]) + '">' + G.ada(posa, espr, { giu: giuQ }) + '</g>'; this.stato = k; }
    // La paperella pescata: in mano ad Ada, poi salta giù e corre al vagone nuovo, dietro «rù».
    const [hx, hy] = this.manoAt(giuQ);
    let px = hx, py = hy, pr = 0, pv = t >= PS_PESCA.su + 0.2 ? 1 : 0;
    if (t >= PS_SALTA) {
      const a = eo(seg(t, PS_SALTA, PS_SALTA + 0.7)), corsa = eio(seg(t, PS_SALTA + 0.7, PS_SALE - 0.5)), salto = eio(seg(t, PS_SALE - 0.5, PS_SALE));
      if (t < PS_SALTA + 0.7) { px = lerp(hx, 636, a); py = lerp(hy, 836, a) - 30 * Math.sin(Math.PI * a); }
      else if (t < PS_SALE - 0.5) { px = lerp(636, this.sedile[0] + 24, corsa); py = 836 - 3 * Math.abs(Math.sin(t * 12)); pr = 9 * Math.sin(t * 12); }
      else { px = lerp(this.sedile[0] + 24, this.sedile[0], salto); py = lerp(836, this.sedile[1], salto) - 22 * Math.sin(Math.PI * salto); }
      pv = t < PS_SALE ? 1 : 1 - seg(t, PS_SALE, PS_SALE + 0.3);
    }
    this.mano.setAttribute('transform', 'translate(' + px.toFixed(2) + ' ' + py.toFixed(2) + ') rotate(' + pr.toFixed(2) + ') scale(0.16)');
    this.mano.setAttribute('opacity', pv.toFixed(3));
    const luce = seg(t, PS_PESCA.su + 0.3, PS_PESCA.preso + 0.4) * (1 - seg(t, 10.2, 10.8));
    this.luce.setAttribute('cx', hx.toFixed(1)); this.luce.setAttribute('cy', (hy - 10).toFixed(1));
    this.luce.setAttribute('opacity', (0.6 * luce).toFixed(3));
    // Le altre scivolano via dallo scarico.
    this.pap.forEach(({ el, i }) => {
      const p = this.lista[i];
      const via = eio(seg(t, PS_SCARICO + (i % 7) * 0.12, PS_SCARICO + 1.7 + (i % 7) * 0.12)), a = via * 2.4 + i;
      const x = lerp(p.x, 772 + 8 * Math.cos(a), via), y = lerp(p.y, 884, via) + (1 - via) * 1.2 * Math.sin(t * 2.2 + i);
      el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.16 * (1 - via)).toFixed(4) + ')');
      el.setAttribute('opacity', i === this.presa ? (t < PS_PESCA.su + 0.2 ? 1 : 0) : (1 - seg(via, 0.85, 1)).toFixed(3));
    });
    // Il vagone nuovo compare dietro «rù», con le scintille; la paperella ci sale.
    this.vagNuovo.setAttribute('opacity', eo(seg(t, PS_VAGONE, PS_VAGONE + 0.6)).toFixed(3));
    this.passNuovo.setAttribute('opacity', seg(t, PS_SALE - 0.05, PS_SALE + 0.3).toFixed(3));
    const sc = seg(t, PS_VAGONE, PS_VAGONE + 1.1);
    this.scint.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
    [...this.scint.children].forEach((c, n) => { const a = n * Math.PI / 5, d = 10 + 34 * eo(sc); c.setAttribute('cx', (this.sedile[0] + d * Math.cos(a)).toFixed(2)); c.setAttribute('cy', (838 + d * 0.6 * Math.sin(a)).toFixed(2)); });
    // La cameretta: sotto la frase compare «nuota»; poi una mano piccola accarezza il disegno.
    const ca = seg(t, PS_CASA[0], PS_CASA[1]) * (1 - seg(t, PS_CASA[2], PS_CASA[3]));
    this.casa.setAttribute('opacity', ca.toFixed(3));
    if (ca > 0) {
      const risposta = t >= PS_RISPOSTA;
      const carezza = t >= PS_CAREZZA[0] && t < PS_CAREZZA[1] ? Math.max(0.01, Math.round((t - PS_CAREZZA[0]) / (PS_CAREZZA[1] - PS_CAREZZA[0]) * 60) / 60) : 0;
      const kc = risposta + '|' + carezza;
      if (kc !== this.statoCasa) {
        const tel = G.telefono(risposta ? { messaggi: ['Al mare Zampirù'], rispostaTesto: 'nuota' } : { messaggi: ['Al mare Zampirù'] });
        this.casaCam.innerHTML = G.unico(G.salotto(tel, { cameretta: true, carezza }), 'pesca');
        this.statoCasa = kc;
      }
      this.casaCam.setAttribute('transform', G.camChiavi(PS_CASA_CAM, t));
    }
    this.sub(t);
  },
});
