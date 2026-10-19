const { seg, eo, ei, eio, lerp } = kit;
// Fuori, alla bancarella. Il treno esce dalla montagna sopra la vasca. Passano Al, Mare, «Zam» e «pi», e non succede
// niente. Passa l'ultimo vagone: «rù» è blu, e sotto di lui cadono le paperelle, di luce come nelle finestre, che
// toccano l'acqua vere: tantissime blu, parecchie azzurre, qualcuna gialla (la vasca del modellino, uguale all'ultima
// finestra). Ada guarda la vasca, poi i tre pezzi sul treno, e sorride. Il treno scivola piano verso la stazione.
// Si apre dalla luce dell'uscita; finisce col treno quasi in stazione (lo riprende «pesca»).
const VS_CAM = [
  { t: 0, cx: 820, cy: 820, z: 3.0 },
  { t: 3.4, cx: 820, cy: 820, z: 3.0 },
  { t: 5.2, cx: 772, cy: 846, z: 3.6 },
  { t: 11.4, cx: 772, cy: 846, z: 3.6 },
  { t: 12.6, cx: 760, cy: 868, z: 4.8 },
  { t: 13.8, cx: 760, cy: 868, z: 4.8 },
  { t: 15.4, cx: 600, cy: 836, z: 3.4 },
];
const VS_ESCE = 1.0, VS_PASSO = 76;
const VS_VEL = [[VS_ESCE, 110], [3.0, 80], [5.6, 45], [9.6, 45], [11.0, 22]];
const VS_ADA = [672, 896];
kit.scene('vasca', {
  init(kit) {
    const G = window.G, M = G.MONDO, Z = G.MOD.zampiru, P = Z.passeggeri;
    this.lista = G.papereVasca(Z.vasca, 46);
    const ordine = this.lista.map((p, i) => i).sort((a, b) => this.lista[a].y - this.lista[b].y);
    const papere = ordine.map(i => '<g class="vs-pap" data-i="' + i + '"><g transform="translate(-50 -84)"><g class="vs-vera">' + G.paperella(this.lista[i].col) + '</g><g class="vs-dilu">' + G.paperellaDiLuce(this.lista[i].col) + '</g></g></g>').join('');
    // I vestiti all'uscita: il colore dopo l'ultimo tratto.
    const treno = [['al', P.Al, ''], ['mare', P.mare, ''], ['pezzo', P.Zam, 'd'], ['pezzo', P.pi, 'sd'], ['pezzo', P['rù'], 's']]
      .map(([tipo, p, strappo]) => ({ tipo, col: p.tratti[2], o: { strappo } }));
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="vs-treno">' + G.treno(treno, { sbarra: 1 }) + '</g>' +
      '<g class="vs-ada"></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'vasca', manopola: 0, banchina: true, morto: true,
      davanti: '<defs><radialGradient id="g-vs-luce" cx="0" cy=".5" r="1"><stop offset="0" stop-color="#FFF6DA"/><stop offset=".35" stop-color="#FFE2A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient></defs>' +
        '<rect class="vs-uscita" x="-200" y="-200" width="2400" height="1480" fill="url(#g-vs-luce)"/>',
      html: G.sottotitolo('NARRATORE', 'Sotto l’ultimo pezzo cadono le paperelle: tante blu, come per Emma, e qualcuna gialla.'),
    });
    this.m.q('.g-vasca').insertAdjacentHTML('beforeend', papere);
    this.G = G;
    this.vag = this.m.qa('.vs-treno .g-vag'); this.ada = this.m.q('.vs-ada'); this.uscita = this.m.q('.vs-uscita');
    this.pap = this.m.qa('.vs-pap').map(el => ({ el, i: +el.dataset.i, vera: el.querySelector('.vs-vera'), luce: el.querySelector('.vs-dilu') }));
    // Le paperelle cadono dove passa l'ultimo vagone.
    const path = this.m.arrivo, sAt = t => G.percorso(t, 0, VS_VEL);
    this.cade = this.lista.map(p => {
      for (let t = VS_ESCE; t < 20; t += 0.02) { const se = sAt(t) - 4 * VS_PASSO; if (se > 0 && path.getPointAtLength(se).x <= p.x + 6) return t; }
      return 9;
    });
    this.stato = '';
    this.sub = G.subs(kit, [[6.6, 14.2]]);
  },
  render(t, kit) {
    t = window.G.tempo('06', 'vasca', t);
    const G = this.G, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(VS_CAM, t));
    G.animaMondo(m, t + 720);
    this.uscita.setAttribute('opacity', (0.95 * (1 - eio(seg(t, 0.1, 1.6)))).toFixed(3));
    const s = t < VS_ESCE ? -500 : G.percorso(t, 0, VS_VEL);
    G.posaTreno(this.vag, m.arrivo, s, null, VS_PASSO);
    G.nascondiInMontagna(this.vag, m.arrivo, s, { inizio: true, passo: VS_PASSO });
    this.pap.forEach(({ el, i, vera, luce }) => {
      const t0 = this.cade[i], p = this.lista[i];
      const u = seg(t, t0, t0 + 0.55);
      // Cadono di luce, come nelle finestre; quando toccano l'acqua sono vere.
      const vv = seg(u, 0.55, 1);
      vera.setAttribute('opacity', vv.toFixed(3)); luce.setAttribute('opacity', (1 - vv).toFixed(3));
      const y = lerp(808, p.y, ei(u)) + (u >= 1 ? 1.2 * Math.sin(t * 2.2 + i) : 0);
      el.setAttribute('transform', 'translate(' + p.x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.16 * (u < 1 ? lerp(0.7, 1, u) : 1)).toFixed(4) + ')');
      el.setAttribute('opacity', t < t0 ? 0 : 1);
    });
    // Ada guarda il treno uscire, si stupisce quando cadono le paperelle, poi guarda i tre pezzi e sorride.
    const espr = t < 7.0 ? 'base' : t < 12.0 ? 'sorpresa' : t < 14.0 ? 'pensa' : 'felice';
    if (espr !== this.stato) { this.ada.innerHTML = '<g class="vs-ada-in">' + G.ada('quaderno', espr) + '</g>'; this.stato = espr; }
    const gira = -4 * eio(seg(t, 13.4, 14.2));
    this.ada.firstChild.setAttribute('transform', 'rotate(' + gira.toFixed(2) + ' ' + VS_ADA[0] + ' ' + VS_ADA[1] + ') ' + G.posaAda(VS_ADA[0], VS_ADA[1]));
    this.sub(t);
  },
});
