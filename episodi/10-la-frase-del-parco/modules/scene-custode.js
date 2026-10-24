const { seg, eo, eio, lerp } = kit;
// Ada corre dal custode, sulla banchina, col quaderno aperto sulle tre vasche: blu, turchese, verde. Il custode guarda il
// disegno sopra gli occhiali, poi apre il regolamento sulla pagina della frase del parco e ci batte sopra un dito. Dietro
// di lui il treno lungo riparte, con la frase del parco in testa e i tre Parco in fila.
// Si apre alla bancarella, come finisce «insiste» fuori; finisce sul treno che corre via (la riprende «giostrina»).
const CS_CU = [436, 836];
const CS_CORRE = [0.2, 1.8];
const CS_QUADERNO = [2.0, 2.5, 7.4, 7.9];
const CS_GUARDA = 8.0, CS_APRE = 9.0;
const CS_PAGINA = [10.2, 10.7, 14.6, 15.1], CS_DITO = [11.0, 14.4];
const CS_SBARRE = [16.4, 17.2], CS_PARTE = 17.2;
const CS_VEL = [[CS_PARTE, 0], [18.6, 90], [21.0, 200]];
const CS_CAM = [
  { t: 0, cx: 640, cy: 840, z: 3.2 },
  { t: 1.9, cx: 470, cy: 790, z: 4.0 },
  { t: 8.0, cx: 470, cy: 790, z: 4.0 },
  { t: 9.6, cx: 452, cy: 790, z: 5.2 },
  { t: 15.2, cx: 452, cy: 790, z: 5.2 },
  // Il treno lungo riparte, dietro di loro: la camera si allarga e va in testa al treno.
  { t: 17.2, cx: 300, cy: 780, z: 2.4 },
  { t: 19.4, cx: 300, cy: 780, z: 2.4 },
];
// Poi la camera segue la testa del treno (la frase del parco e la sua bandierina d'oro).
const CS_SEGUE = [19.4, 21.6];
kit.scene('custode', {
  init(kit) {
    const G = window.G, C = G.C, M = G.MONDO, S2 = G.S2, GIRI = G.MOD.seconda.parco.giri;
    this.chi = S2.treno(GIRI[2]);
    this.fermo = G.fermoTreno(this.chi.length + 1);
    const sopra = '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' +
      '<g class="cs-treno">' + G.treno(this.chi.map(c => ({ tipo: c.tipo, col: c.biglietto, o: c.o })), { sbarra: 0 }) + '</g>' +
      '<g class="cs-cu"></g><g class="cs-ada"></g>';
    // Il quaderno: le tre vasche, blu, turchese e verde (dal modellino).
    const quaderno = '<g class="cs-quad" opacity="0">' + G.quadernoAperto(S2.vascaDisegnata(GIRI[0].vasca, 568, 470, 1.15, 31, 18),
      S2.vascaDisegnata(GIRI[1].vasca, 1352, 300, 0.85, 33, 18) + S2.vascaDisegnata(GIRI[2].vasca, 1352, 640, 0.85, 35, 18)) + '</g>';
    // Il regolamento da vicino, con il dito che batte sulla pagina.
    const dito = '<g class="cs-dito"><path d="M1240 760 Q1300 900 1420 1000 L1600 1000 Q1460 860 1380 720 Z" fill="' + C.pelle + '"/>' +
      '<path d="M1290 560 Q1270 610 1300 700 L1384 712 Q1350 640 1352 580 Q1352 548 1322 546 Q1296 546 1290 560 Z" fill="' + C.pelle + '" stroke="' + C.pelleScura + '" stroke-width="5"/>' +
      '<path d="M1300 700 Q1270 760 1300 810 L1400 800 Q1404 744 1384 712 Z" fill="' + C.pelle + '" stroke="' + C.pelleScura + '" stroke-width="5"/>' +
      '<path d="M1206 1080 L1240 760 L1420 760 L1470 1080 Z" fill="#5A4A42"/></g>';
    const libro = '<g class="cs-libro" opacity="0"><rect x="-200" y="-200" width="2320" height="1480" fill="#141026"/>' +
      '<circle cx="960" cy="560" r="620" fill="' + C.luce + '" opacity=".12" filter="url(#g-velo)"/>' +
      '<g transform="translate(960 560) scale(7.4) translate(-120 -262)">' + G.libroAperto(120, 262, 'frase') + '</g>' + dito + '</g>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'custode', manopola: 0, banchina: true, morto: true, davanti: quaderno + libro,
      html: G.sottotitolo('ADA', 'Ma la frase del parco… non doveva fermarla?') +
        G.sottotitolo('CUSTODE', 'Il regolamento l’ho rispettato: la frase del parco l’ho attaccata.') +
        G.sottotitolo('CUSTODE', 'Il treno non obbedisce a nessuno: porta.') +
        G.sottotitolo('NARRATORE', 'La frase del parco siede davanti. Ma non guida nessuno.'),
    });
    this.G = G;
    const q = this.m.q;
    this.vag = this.m.qa('.cs-treno .g-vag');
    this.cu = q('.cs-cu'); this.ada = q('.cs-ada'); this.quad = q('.cs-quad'); this.libro = q('.cs-libro'); this.dito = q('.cs-dito');
    this.stati = {};
    this.sub = G.subs(kit, [[3.0, 7.2], [9.6, 15.4], [16.0, 19.6], [20.4, 25.6]]);
  },
  cambia(nome, k, el, html) { if (this.stati[nome] !== k) { el.innerHTML = html; this.stati[nome] = k; } },
  render(t, kit) {
    t = window.G.tempo('10', 'custode', t);
    const G = this.G, M = G.MONDO, m = this.m;
    const sp = G.percorso(t, 640 - this.fermo, CS_VEL), passo = lerp(M.passoBanchina, M.passo, seg(sp, 640 - this.fermo, 640 - this.fermo + 150));
    if (t < CS_SEGUE[0]) m.cam.setAttribute('transform', G.camChiavi(CS_CAM, t));
    else {
      const testa = m.partenza.getPointAtLength(Math.min(m.partenza.getTotalLength(), sp)), u = eio(seg(t, CS_SEGUE[0], CS_SEGUE[1]));
      m.cam.setAttribute('transform', G.cam(lerp(300, testa.x + 90, u), lerp(780, Math.min(800, testa.y - 40), u), lerp(2.4, 3.0, u)));
    }
    G.animaMondo(m, t + 1250);
    const [q0, q1, q2, q3] = CS_QUADERNO;
    this.quad.setAttribute('opacity', (seg(t, q0, q1) * (1 - seg(t, q2, q3))).toFixed(3));
    const [l0, l1, l2, l3] = CS_PAGINA;
    this.libro.setAttribute('opacity', (seg(t, l0, l1) * (1 - seg(t, l2, l3))).toFixed(3));
    const batte = t > CS_DITO[0] && t < CS_DITO[1] ? Math.abs(Math.sin((t - CS_DITO[0]) * 5)) : 1;
    this.dito.setAttribute('transform', 'translate(' + (-30 * batte).toFixed(1) + ' ' + (-60 * batte).toFixed(1) + ')');
    // Il treno lungo: fermo, poi le sbarre si abbassano e riparte; i tre Parco agitano i rametti.
    G.posaTreno(this.vag, m.partenza, sp, null, passo);
    G.nascondiInMontagna(this.vag, m.partenza, sp, { fine: true, passo });
    G.sbarre(this.vag, i => eio(seg(t, CS_SBARRE[0] + i * 0.03, CS_SBARRE[1] + i * 0.03)));
    const ciao = Math.round(-22 + 18 * Math.sin(t * 6) * seg(t, CS_PARTE, CS_PARTE + 0.5));
    this.chi.forEach((c, i) => { if (c.tipo === 'parco') G.cambiaPasseggero(this.vag[i], 'parco', c.biglietto, { ciao: t > CS_PARTE ? ciao : 0 }); });
    // Il custode: guarda il disegno sopra gli occhiali; apre il regolamento e ci batte il dito.
    const posa = t >= CS_APRE ? 'legge' : 'base', espr = t < CS_GUARDA ? 'base' : t < 16 ? 'serio' : 'base';
    const dito = t > CS_DITO[0] && t < CS_DITO[1] ? +Math.abs(Math.sin((t - CS_DITO[0]) * 5)).toFixed(1) : 0;
    const occhi = t < CS_APRE ? 1 : t < 16 ? 0 : 1;
    this.cambia('cu', posa + espr + dito + occhi, this.cu, '<g transform="' + G.posaCustode(CS_CU[0], CS_CU[1]) + '">' + G.unico(G.custode(posa, espr, { pagina: 'frase', dito, occhi }), 'cscu') + '</g>');
    // Ada: corre dal custode col quaderno aperto; chiede; ascolta.
    const corre = eio(seg(t, CS_CORRE[0], CS_CORRE[1]));
    const ax = lerp(672, 504, corre), ay = lerp(896, 836, corre) - (corre > 0 && corre < 1 ? 5 * Math.abs(Math.sin(t * 9)) : 0);
    const esprA = t < 3 ? 'felice' : t < 8 ? 'sorpresa' : t < 20 ? 'base' : 'pensa';
    this.cambia('ada', esprA, this.ada, '<g class="cs-ada-in">' + G.ada('quaderno', esprA) + '</g>');
    this.ada.firstChild.setAttribute('transform', G.posaAda(ax, ay));
    this.sub(t);
  },
});
