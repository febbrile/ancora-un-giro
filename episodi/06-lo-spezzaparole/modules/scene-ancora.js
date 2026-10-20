const { seg, eo, ei, eio, lerp } = kit;
// Le sbarre si abbassano e il treno riparte, un vagone più lungo. A montaggio, da lontano: il treno sparisce nella
// montagna; nella cameretta la storia si allunga sul telefono, troppo piccola per leggerla; il treno è di nuovo in
// stazione e una paperella sale in fondo, nell'ultimo posto della banchina, accanto alla sbarra di dietro. La storia si
// allunga ancora, e non smette. Il treno riparte, Ada lo guarda e si gratta la testa con la matita. Cartello: «Fine».
// Si apre come finisce «pesca».
const AN_CAM = [
  { t: 0, cx: 420, cy: 780, z: 2.4 },
  { t: 1.4, cx: 420, cy: 780, z: 2.4 },
  { t: 4.0, cx: 900, cy: 560, z: 1.05 },
  // Di nuovo in stazione: sale l'ultima paperella.
  { t: 8.61, cx: 430, cy: 800, z: 2.8, da: 8.6 },
  { t: 10.8, cx: 430, cy: 800, z: 2.8 },
  // Il treno riparte ancora; Ada lo guarda.
  { t: 13.61, cx: 470, cy: 760, z: 2.4, da: 13.6 },
  { t: 15.0, cx: 470, cy: 760, z: 2.4 },
  { t: 17.0, cx: 430, cy: 660, z: 1.7 },
  { t: 22.0, cx: 430, cy: 660, z: 1.7 },
  { t: 24.0, cx: 760, cy: 640, z: 1.6 },
];
const AN_PASSO = 76, AN_TRENO = 490;
const AN_VEL = [[[0, 0], [1.4, 0], [2.4, 250], [3.2, 650]], [[0, 0], [14.4, 0], [15.6, 120], [17.4, 160], [19.0, 300], [20.4, 520]]];
const AN_SBARRE = [0.2, 1.0], AN_SBARRA_7 = [13.6, 14.2];
const AN_CASE = [[5.4, 8.6], [10.8, 13.6]];
const AN_ADA = [672, 896];
const AN_SALTA = 9.0, AN_SALE = 10.4, AN_VAGONE = 9.6;
const AN_GRATTA = 15.0;
const AN_FINE = 21.2;
// Ada si gratta la testa con la matita: il braccio destro alzato (nelle coordinate del suo disegno).
function anGratta(G, ang) {
  const s = G.ada('base', 'pensa').replace(/<path d="M128 152 Q144 196 140 236[^>]*\/><circle cx="130" cy="238"[^>]*\/>/, '');
  const braccio = '<path d="M118 150 Q170 136 148 76" stroke="#2E2A26" stroke-width="21" stroke-linecap="round" fill="none"/>' +
    '<path d="M118 150 Q170 136 148 76" stroke="#FBFAF6" stroke-width="16" stroke-linecap="round" fill="none"/>' +
    '<g transform="rotate(' + ang.toFixed(1) + ' 146 70)"><rect x="143" y="32" width="7" height="38" rx="2" fill="#F2B544"/><path d="M143 32 L150 32 L146.5 24 Z" fill="#3A2418"/></g>' +
    '<circle cx="146" cy="72" r="8" fill="#C98B63"/>';
  return s.replace(/<\/g>$/, braccio + '</g>');
}
kit.scene('ancora', {
  init(kit) {
    const G = window.G, M = G.MONDO, Z = G.MOD.zampiru, P = Z.passeggeri, F = G.MOD.finisce.passeggeri;
    // L'ultima paperella del montaggio: il suo biglietto (dal modellino, quello di «e»); la paperella ha il colore di «e» nella vasca.
    this.colNuova = F.e.biglietto;
    this.colPap = (Z.passeggeri['rù'].finestre[0].find(x => x[0] === 'e') || ['e', 0, '#f08c78'])[2];
    const treno = [['al', P.Al, ''], ['mare', P.mare, ''], ['pezzo', P.Zam, 'd'], ['pezzo', P.pi, 'sd'], ['pezzo', P['rù'], 's']]
      .map(([tipo, p, strappo]) => ({ tipo, col: p.biglietto, o: { strappo } }))
      .concat([{ tipo: 'paperella', col: Z.nuovo.nuota }, { tipo: 'paperella', col: this.colNuova }]);
    let scintille = '';
    for (let k = 0; k < 10; k++) scintille += '<circle r="2.4" fill="' + G.C.luce + '"/>';
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="an-treno">' + G.treno(treno, { sbarra: 0 }) + '</g>' +
      '<g class="an-scint" opacity="0">' + scintille + '</g>' +
      '<g class="an-ada"></g>' +
      '<g class="an-pap"><g transform="translate(-50 -84)">' + G.paperella(this.colPap) + '</g></g>';
    const casa = '<g class="an-casa" opacity="0"><g transform="translate(960 540) scale(1.25) translate(-930 -560)"><g class="an-casa-in"></g></g></g>';
    const fine = '<g class="an-fine" opacity="0"><g transform="translate(960 330)"><g class="an-insegna"></g></g></g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'ancora', manopola: 0, banchina: true, morto: true, davanti: casa + fine,
      html: G.sottotitolo('NARRATORE', 'E il treno riparte, giro dopo giro. La storia di Zampirù si allunga.') +
        G.sottotitolo('ADA', 'Ma quando finisce?') +
        G.sottotitolo('NARRATORE', 'Questa è un’altra storia.'),
    });
    this.G = G;
    this.vag = this.m.qa('.an-treno .g-vag');
    this.ada = this.m.q('.an-ada'); this.pap = this.m.q('.an-pap'); this.scint = this.m.q('.an-scint');
    this.casa = this.m.q('.an-casa'); this.casaIn = this.m.q('.an-casa-in');
    this.fine = this.m.q('.an-fine'); this.insegna = this.m.q('.an-insegna');
    this.sedile = [M.fermo + 6 * AN_PASSO + 6, 816];
    this.stato = ''; this.statoCasa = ''; this.statoIns = '';
    this.sub = G.subs(kit, [[1.4, 7.6], [15.6, 18.0], [18.4, 21.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('06', 'ancora', t);
    const G = this.G, M = G.MONDO, m = this.m;
    m.cam.setAttribute('transform', G.camChiavi(AN_CAM, t));
    G.animaMondo(m, t + 780);
    // Il treno: parte, sparisce; poi (a montaggio) è di nuovo in stazione, sale l'ultima paperella, riparte.
    const giro = t < 8.6 ? 0 : 1;
    const s = G.percorso(t, AN_TRENO, AN_VEL[giro]);
    G.posaTreno(this.vag, m.partenza, s, null, AN_PASSO);
    G.nascondiInMontagna(this.vag, m.partenza, s, { fine: true, passo: AN_PASSO });
    const v7 = this.vag[6];
    v7.setAttribute('opacity', (giro === 0 ? 0 : Math.min(+v7.getAttribute('opacity'), eo(seg(t, AN_VAGONE, AN_VAGONE + 0.6)))).toFixed(3));
    this.vag[6].querySelector('.g-pass').setAttribute('opacity', seg(t, AN_SALE - 0.05, AN_SALE + 0.3).toFixed(3));
    G.sbarre(this.vag, i => i < 6 ? eio(seg(t, AN_SBARRE[0] + i * 0.12, AN_SBARRE[1] + i * 0.12)) : eio(seg(t, AN_SBARRA_7[0], AN_SBARRA_7[1])));
    // Ada: alla bancarella, con l'ultima paperella in mano; poi guarda il treno ripartire e si gratta la testa.
    let k, html;
    if (t >= AN_GRATTA) {
      const ang = Math.round(-10 + 14 * Math.sin((t - AN_GRATTA) * 9));
      k = 'gratta' + ang; html = anGratta(G, ang);
    } else if (t >= 8.6 && t < AN_SALTA + 0.4) {
      k = 'pesca'; html = G.ada('pesca', 'felice', { giu: 0 });
    } else {
      const espr = t < 8.6 ? 'felice' : t < 13.6 ? 'felice' : 'base';
      k = 'q' + espr; html = G.ada('quaderno', espr);
    }
    if (k !== this.stato) { this.ada.innerHTML = '<g transform="' + G.posaAda(AN_ADA[0], AN_ADA[1]) + '">' + html + '</g>'; this.stato = k; }
    // L'ultima paperella: salta giù dalla mano di Ada e corre al vagone in fondo, accanto alla sbarra di dietro.
    const hx = AN_ADA[0] - 28 + 144 * 0.28, hy = AN_ADA[1] - 85 + 236 * 0.28;
    let px = hx, py = hy, pr = 0;
    const a = eo(seg(t, AN_SALTA, AN_SALTA + 0.5)), corsa = eio(seg(t, AN_SALTA + 0.5, AN_SALE - 0.4)), salto = eio(seg(t, AN_SALE - 0.4, AN_SALE));
    if (t < AN_SALTA + 0.5) { px = lerp(hx, 640, a); py = lerp(hy, 836, a) - 24 * Math.sin(Math.PI * a); }
    else if (t < AN_SALE - 0.4) { px = lerp(640, this.sedile[0] + 20, corsa); py = 836 - 3 * Math.abs(Math.sin(t * 12)); pr = 9 * Math.sin(t * 12); }
    else { px = lerp(this.sedile[0] + 20, this.sedile[0], salto); py = lerp(836, this.sedile[1], salto) - 20 * Math.sin(Math.PI * salto); }
    this.pap.setAttribute('transform', 'translate(' + px.toFixed(2) + ' ' + py.toFixed(2) + ') rotate(' + pr.toFixed(2) + ') scale(0.16)');
    this.pap.setAttribute('opacity', t >= 8.6 && t < AN_SALE ? 1 : 0);
    const sc = seg(t, AN_VAGONE, AN_VAGONE + 1.1);
    this.scint.setAttribute('opacity', (sc > 0 && sc < 1 ? 1 - sc : 0).toFixed(3));
    [...this.scint.children].forEach((c, n) => { const an = n * Math.PI / 5, d = 10 + 34 * eo(sc); c.setAttribute('cx', (this.sedile[0] + d * Math.cos(an)).toFixed(2)); c.setAttribute('cy', (838 + d * 0.6 * Math.sin(an)).toFixed(2)); });
    // La cameretta: la storia si allunga, parola dopo parola (troppo piccola per leggerla), e non smette.
    const ca = Math.max(...AN_CASE.map(([x, y]) => seg(t, x, x + 0.4) * (1 - seg(t, y - 0.4, y))));
    this.casa.setAttribute('opacity', ca.toFixed(3));
    if (ca > 0) {
      const n = t < AN_CASE[1][0] ? 1 + Math.floor(Math.max(0, t - AN_CASE[0][0] - 0.4) * 2.2) : 9 + Math.floor(Math.max(0, t - AN_CASE[1][0] - 0.2) * 8);
      if (String(n) !== this.statoCasa) {
        this.casaIn.innerHTML = G.unico(G.salotto(G.telefono({ chat: [['io', 'Al mare Zampirù'], ['ai', n]] }), { cameretta: true }), 'ancora');
        this.statoCasa = String(n);
      }
    }
    // Il cartello: «Fine».
    const f = eo(seg(t, AN_FINE, AN_FINE + 1.0));
    this.fine.setAttribute('opacity', f.toFixed(3));
    this.fine.setAttribute('transform', 'translate(0 ' + (16 * (1 - f)).toFixed(1) + ')');
    const turno = String(Math.floor(t / 0.6) % 3);
    if (turno !== this.statoIns) { this.insegna.innerHTML = G.insegna('Fine', 520, 200, +turno); this.statoIns = turno; }
    this.sub(t);
  },
});
