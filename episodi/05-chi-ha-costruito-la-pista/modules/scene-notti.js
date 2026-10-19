const { seg, eo, ei, eio, lerp } = kit;
// Montaggio: notte dopo notte. Ogni treno grigio parte dalla stazione con la sua frase e la sua lanterna accesa sopra la
// vasca ancora vuota: prima Al, Parco ed Emma con una lanterna verde; poi Al, Mare ed Emma con una turchese; poi di nuovo
// Al, Mare ed Emma con la lanterna blu, due volte. Dopo ogni treno un brivido del colore della lanterna corre dentro la
// montagna, mentre la luna attraversa il cielo, ancora e ancora. Ogni volta che ripassa «Al mare Emma» con la lanterna
// blu, nella vasca le paperelle blu sono di più. I binari, da una notte all'altra, sono un poco più piegati.
// Si apre come finisce «brivido» (il treno vuoto in stazione); finisce sulla montagna (la riprende «finestre»).
// I quattro treni: quando partono dalla stazione, quando (se c'è) si vede la vasca, quando corre il brivido.
const NT_TRENI = [
  { stazione: 0, vasca: null, brivido: 3.0, fine: 6.4 },
  { stazione: 6.4, vasca: null, brivido: 8.4, fine: 11.0 },
  { stazione: 11.0, vasca: 12.8, brivido: 16.2, fine: 18.0 },
  { stazione: 18.0, vasca: 19.4, brivido: 23.0, fine: 25.0 },
];
const NT_STAZ = { cx: 470, cy: 790, z: 2.2 }, NT_MONT = { cx: 1250, cy: 470, z: 1.35 }, NT_VASCA = { cx: 780, cy: 890, z: 6.0 };
// La partenza dalla stazione (dal momento in cui il treno è pronto).
const NT_PARTE = [[0.7, 0], [1.6, 240], [2.4, 320]];
const NT_LANT = [772, 834];
const NT_LUNA = 6.2;
const NT_GLOW = 'M 962 830 C 1120 790 1310 700 1296 560 C 1284 450 1130 420 1048 446';
kit.scene('notti', {
  init(kit) {
    const G = window.G, M = G.MONDO, A = G.MOD.addestramento.momenti, Pm = G.MOD.mare.passeggeri, Pp = G.MOD.parco.passeggeri, N = G.MOD.parco.nuovo;
    const mare = [['al', Pm.Al.biglietto], ['mare', Pm.mare.biglietto], ['emma', Pm.Emma.biglietto]];
    const parco = [['al', Pp.Al.biglietto], ['parco', Pp.parco.biglietto], ['emma', Pp.Emma.biglietto]];
    const blu = G.MOD.mare.nuovo.nuota;
    // Chi viaggia, quale lanterna, quanto è forte il brivido; per «Al mare Emma» con la lanterna blu, la notte del modellino.
    // Il brivido dei primi due treni non è nel modellino: lo disegniamo di forza media.
    this.treni = [
      { chi: parco, parola: 'corre', col: N.corre, forza: 0.8, piega: 0.35 },
      { chi: mare, parola: 'gioca', col: N.gioca, forza: 0.8, piega: 0.65 },
      { chi: mare, parola: 'nuota', col: blu, forza: A[1].brivido, piega: A[1].piega[0], vasca: A[1].vasca },
      { chi: mare, parola: 'nuota', col: blu, forza: A[2].brivido, piega: A[2].piega[0], vasca: A[2].vasca },
    ];
    const vasche = this.treni.map((tr, k) => !tr.vasca ? '' : '<g class="nt-vasca" data-k="' + k + '">' + G.papereVasca(tr.vasca, 60 + k).map((p, i) =>
      '<g class="nt-pap" data-x="' + p.x.toFixed(1) + '" data-y="' + p.y.toFixed(1) + '"><g transform="translate(-50 -84)"><g class="nt-vera">' + G.paperella(p.col) + '</g><g class="nt-dilu">' + G.paperellaDiLuce(p.col) + '</g></g></g>').join('') + '</g>').join('');
    const binario = 'stroke="#E8EEFF" stroke-width="2.4" stroke-linecap="round" fill="none" opacity=".85"';
    const anelli = [0, 1, 2].map(() => '<ellipse class="nt-anello" cx="772" cy="880" rx="10" ry="2" fill="none" stroke-width="2" opacity="0"/>').join('');
    const sopra = '<path class="nt-pieghe" ' + binario + '/>' +
      '<path class="nt-glow" d="' + NT_GLOW + '" stroke-width="72" stroke-linecap="round" fill="none" filter="url(#g-velo)" opacity="0"/>' +
      '<path class="nt-glow-c" d="' + NT_GLOW + '" stroke="#EAF2FF" stroke-width="8" stroke-linecap="round" fill="none" filter="url(#g-glow)" opacity="0"/>' +
      '<g class="nt-treno">' + G.treno(mare.map(c => ({ tipo: c[0], col: c[1] })), { grigio: true, fanale: 1, sbarra: 1 }) + '</g>' +
      '<g class="nt-lanterna" transform="translate(' + NT_LANT[0] + ' ' + NT_LANT[1] + ') scale(.4)"><g class="nt-lant-in"></g></g>' +
      '<g transform="' + G.posa(M.spezzaparole[0], M.spezzaparole[1], 0.34, 220, 300) + '">' + G.spezzaparole({}) + '</g>' + anelli +
      '<path class="nt-sale" d="M 772 870 L 772 798" stroke-width="4" stroke-linecap="round" fill="none" filter="url(#g-glow)" opacity="0"/>';
    this.m = G.costruisciMondo(kit, sopra, {
      pre: 'notti', morto: true, spento: 1, banchina: true,
      davanti: '<rect class="nt-nero" x="-200" y="-200" width="2320" height="1480" fill="#07060F" opacity="0"/>',
      html: G.sottotitolo('NARRATORE', 'Notte dopo notte passavano treni e treni, con frasi di ogni tipo. Ognuno piegava un pochino la stessa pista.') +
        G.sottotitolo('NARRATORE', 'E ogni volta che passava «Al mare Emma», nella vasca le paperelle blu erano di più.'),
    });
    const m = this.m;
    m.q('.g-vasca').insertAdjacentHTML('beforeend', vasche);
    this.G = G;
    this.treno = m.qa('.nt-treno .g-vag'); this.lant = m.q('.nt-lanterna'); this.lantIn = m.q('.nt-lant-in');
    this.glow = m.q('.nt-glow'); this.glowC = m.q('.nt-glow-c'); this.lGlow = this.glow.getTotalLength();
    this.nero = m.q('.nt-nero'); this.luna = m.q('.g-luna'); this.anelli = m.qa('.nt-anello'); this.sale = m.q('.nt-sale');
    this.pieghe = m.q('.nt-pieghe'); this.pista = G.pieghePista(m);
    this.vasche = m.qa('.nt-vasca').map(g => ({ g, k: +g.dataset.k, pap: [...g.querySelectorAll('.nt-pap')].map(el => ({ el, x: +el.dataset.x, y: +el.dataset.y, vera: el.querySelector('.nt-vera'), luce: el.querySelector('.nt-dilu') })) }));
    this.stato = '';
    this.sub = G.subs(kit, [[0.8, 10.4], [14.8, 22.2]]);
  },
  render(t, kit) {
    t = window.G.tempo('05', 'notti', t);
    const G = this.G, M = G.MONDO, m = this.m;
    let k = 0;
    NT_TRENI.forEach((b, i) => { if (t >= b.stazione) k = i; });
    const b = NT_TRENI[k], tr = this.treni[k];
    // L'inquadratura del momento: la stazione, la vasca da vicino, la montagna.
    const shot = t < (b.vasca || b.brivido) ? 'staz' : t < b.brivido ? 'vasca' : 'mont';
    const c = shot === 'staz' ? NT_STAZ : shot === 'vasca' ? NT_VASCA : NT_MONT;
    const t0 = shot === 'staz' ? b.stazione : shot === 'vasca' ? b.vasca : b.brivido;
    const lento = t - t0;
    m.cam.setAttribute('transform', G.cam(c.cx + (shot === 'mont' ? -12 * lento : 6 * lento), c.cy, c.z * (1 + 0.012 * lento)));
    // Un battito di buio a ogni stacco.
    const stacchi = [];
    NT_TRENI.forEach(x => { stacchi.push(x.stazione); if (x.vasca) stacchi.push(x.vasca); stacchi.push(x.brivido); });
    let nero = 0;
    stacchi.forEach(s => { if (s > 0) nero = Math.max(nero, 1 - Math.abs(t - s) / 0.22); });
    this.nero.setAttribute('opacity', Math.max(0, nero).toFixed(3));
    // I passeggeri e la lanterna di questo treno; i binari, un poco più piegati.
    const chiave = k + '|' + Math.round((0.88 + 0.12 * Math.sin(t * 2.2)) * 20);
    if (chiave !== this.stato) {
      tr.chi.forEach((p, i) => G.cambiaPasseggero(this.treno[i], p[0], p[1]));
      this.lantIn.innerHTML = '<g transform="translate(-60 -30)">' + G.lanternaAccesa(tr.parola, tr.col, 0.88 + 0.12 * Math.sin(t * 2.2)) + '</g>';
      if (this.statoK !== k) { this.pieghe.setAttribute('d', this.pista.d(tr.piega, 2.2)); this.statoK = k; }
      this.stato = chiave;
    }
    // Il treno: parte dalla stazione; nella montagna sparisce dalla bocca in alto.
    if (shot === 'staz') {
      const s = G.percorso(lento, 490, NT_PARTE);
      G.posaTreno(this.treno, m.partenza, s, M.scala, M.passoBanchina);
      G.nascondiInMontagna(this.treno, m.partenza, s, { fine: true, passo: M.passoBanchina });
    } else if (shot === 'mont' && !b.vasca) {
      const s = 1600 + 320 * lento;
      G.posaTreno(this.treno, m.partenza, s, M.scala, M.passoBanchina);
      G.nascondiInMontagna(this.treno, m.partenza, s, { fine: true, passo: M.passoBanchina });
    } else this.treno.forEach(v => v.setAttribute('opacity', 0));
    // La lanterna si spegne dopo il brivido.
    this.lant.setAttribute('opacity', (1 - seg(t, b.brivido + 1.2, b.brivido + 1.8)).toFixed(3));
    // La vasca: le paperelle cadono dove passa l'ultimo vagone (da destra a sinistra), poi l'acqua trema.
    this.vasche.forEach(v => {
      const on = v.k === k && shot === 'vasca';
      v.g.setAttribute('opacity', on ? 1 : 0);
      if (!on) return;
      v.pap.forEach((p, i) => {
        const tc = b.vasca + 0.3 + 1.5 * (860 - p.x) / 170, u = seg(t, tc, tc + 0.5), vv = seg(u, 0.55, 1);
        p.vera.setAttribute('opacity', vv.toFixed(3)); p.luce.setAttribute('opacity', (1 - vv).toFixed(3));
        const y = lerp(800, p.y, ei(u)) + (u >= 1 ? 1.2 * Math.sin(t * 2.2 + i) : 0);
        p.el.setAttribute('transform', 'translate(' + p.x.toFixed(2) + ' ' + y.toFixed(2) + ') scale(' + (0.16 * lerp(0.7, 1, u)).toFixed(4) + ')');
        p.el.setAttribute('opacity', t < tc ? 0 : 1);
      });
    });
    const tv = b.vasca ? b.vasca + 2.4 : -99;
    this.anelli.forEach((el, j) => {
      const u = seg(t, tv + j * 0.3, tv + j * 0.3 + 0.9);
      el.setAttribute('stroke', tr.col);
      el.setAttribute('rx', (10 + 80 * eo(u)).toFixed(1)); el.setAttribute('ry', (2 + 10 * eo(u)).toFixed(1));
      el.setAttribute('opacity', (shot === 'vasca' && u > 0 && u < 1 ? tr.forza * (1 - u) : 0).toFixed(3));
    });
    this.sale.setAttribute('stroke', tr.col);
    G.onda(this.sale, 72, eio(seg(t, tv + 0.5, tv + 1.1)), 40);
    this.sale.setAttribute('opacity', (shot === 'vasca' && t > tv + 0.5 ? tr.forza : 0).toFixed(3));
    // Il brivido corre dentro la montagna, dalla bocca in basso a quella in alto: si vede la luce attraverso la roccia.
    const ug = seg(t, b.brivido + 0.3, b.fine - 0.3);
    [this.glow, this.glowC].forEach((el, j) => {
      el.setAttribute('stroke', j ? '#EAF2FF' : tr.col);
      G.onda(el, this.lGlow, eio(ug), j ? 60 : 180);
      el.setAttribute('opacity', (shot === 'mont' && ug > 0 && ug < 1 ? (j ? 0.6 : 0.9) * tr.forza : 0).toFixed(3));
    });
    // La luna attraversa il cielo, una notte dopo l'altra.
    const v = (t / NT_LUNA) % 1, lx = lerp(-300, 2300, v) - 1530, ly = 520 - 430 * Math.sin(Math.PI * v) - 150;
    this.luna.setAttribute('transform', 'translate(' + lx.toFixed(1) + ' ' + ly.toFixed(1) + ')');
    this.sub(t);
  },
});
