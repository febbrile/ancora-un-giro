kit.score(function (S, T) {
  // Musica originale: il valzerino del luna park fuori dalla montagna; dentro, il tema sospeso che torna tre volte, come
  // un'eco; alla manopola un carillon che gira. Gli accordi stanno sul pad (servono anche allo stile «anni 90» del sito).
  const BPM = 84, B = 60 / BPM;
  S.tempo(BPM, { t0: 0 });
  S.program('pad', 'pad', { rev: 0.6, gain: -3 });
  S.program('keys', 'ep', { rev: 0.4, gain: -7 });
  S.program('box', 'glock', { rev: 0.5, gain: -7, pan: 0.2 });
  S.program('mallet', 'marimba', { rev: 0.3, gain: -5, pan: -0.15 });
  S.program('vib', 'vibes', { rev: 0.6, gain: -7 });
  S.program('bass', 'bass', { gain: -5 });
  const C = { C: ['C3', 'E3', 'G3', 'C4'], Am: ['A2', 'C3', 'E3', 'A3'], F: ['F2', 'A2', 'C3', 'F3'], G: ['G2', 'B2', 'D3', 'G3'], Em: ['E3', 'G3', 'B3', 'E4'], Dm: ['D3', 'F3', 'A3', 'D4'] };
  const ROOT = { C: 'C2', Am: 'A1', F: 'F1', G: 'G1', Em: 'E2', Dm: 'D2' };
  const ARP = { C: ['C5', 'G4', 'E4', 'G4'], Am: ['A4', 'E4', 'C4', 'E4'], F: ['A4', 'F4', 'C4', 'F4'], G: ['B4', 'G4', 'D4', 'G4'], Em: ['B4', 'G4', 'E4', 'G4'], Dm: ['A4', 'F4', 'D4', 'F4'] };
  const bt = t => t / B;
  // I tempi dentro una scena sono interni: R li porta al tempo vero (vedi il ritmo in shared.js).
  const R = (id, x) => T[id] + window.G.reale('03', id, x);
  function sez(a, b, seq, o) {
    o = o || {};
    const b0 = Math.ceil(bt(a)), b1 = Math.floor(bt(b));
    for (let x = b0, i = 0; x + 1 < b1; x += 4, i++) {
      const c = seq[i % seq.length], len = Math.min(4, b1 - x);
      S.chord('pad', C[c], { beat: x, beats: len, vel: o.pad || 30 });
      if (o.keys) S.chord('keys', C[c].map(n => n.replace(/(\d)$/, d => String(+d + 1))), { beat: x, beats: Math.min(3.5, len), vel: o.keys });
      if (o.mallet && len >= 4) S.pattern('mallet', o.mallet, { from: x, pitch: ARP[c], vel: o.mv || 42 });
      if (o.box && len >= 4) S.pattern('box', o.box, { from: x, pitch: ARP[c].map(n => n.replace(/(\d)$/, d => String(+d + 1))), vel: o.bv || 34 });
      if (o.vib && len >= 4) S.pattern('vib', 'x..x..x.', { from: x, pitch: ARP[c], vel: o.vib });
      if (o.bass) { S.note('bass', ROOT[c], { beat: x, beats: 1.5, vel: o.bass }); if (len >= 4) S.note('bass', ROOT[c].replace(/(\d)$/, d => String(+d + 1)), { beat: x + 2, beats: 1.5, vel: o.bass - 8 }); }
    }
  }
  const giro = ['C', 'Am', 'F', 'G'];
  // Fuori: la domanda, le tre case, i tre treni.
  sez(T.domanda, R('domanda', 17.0), ['Am', 'F', 'C', 'G'], { pad: 28, keys: 26 });
  sez(T.case, R('case', 15.4), ['F', 'C', 'Am', 'G'], { pad: 26, vib: 24 });
  sez(R('case', 15.4), T.treni, giro, { pad: 28, mallet: 'x...x.x.', mv: 36 });
  sez(T.treni, R('treni', 13.2), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 42, bass: 52 });
  sez(R('treni', 13.2), T.finestre, ['Am', 'Am', 'F', 'G'], { pad: 30, bass: 44 });
  // Dentro: il tema sospeso, poi due volte ancora, più svelto, come un'eco.
  sez(T.finestre, R('finestre', 23.0), ['Em', 'C', 'F', 'G'], { pad: 30, box: 'x.x.x.x.', bv: 30, vib: 24 });
  sez(R('finestre', 23.0), R('finestre', 36.4), ['Em', 'C', 'F', 'G'], { pad: 26, box: 'x.x.x.x.', bv: 22, mallet: 'x...x...', mv: 28 });
  sez(R('finestre', 36.4), T.pesche, ['F', 'G', 'C', 'C'], { pad: 36, keys: 32 });
  // Fuori di nuovo: tre pesche, poi le tre case.
  sez(T.pesche, R('pesche', 39.0), ['C', 'Am', 'F', 'G'], { pad: 28, mallet: 'x.x.X.x.', mv: 40, bass: 50 });
  sez(R('pesche', 39.0), R('pesche', 43.4), ['F', 'C', 'Dm', 'G'], { pad: 28, keys: 28, box: 'x...x...', bv: 28 });
  sez(R('pesche', 43.4), T.manopola, ['Am', 'Em', 'F', 'G'], { pad: 30, vib: 24 });
  // La manopola: un carillon; poi la vasca tutta blu, e quella di tutti i colori.
  sez(T.manopola, R('manopola', 13.4), ['Dm', 'Am', 'Dm', 'G'], { pad: 28, box: 'x.x.x...', bv: 30, vib: 22 });
  sez(R('manopola', 13.4), T.larga, ['C', 'C', 'F', 'C'], { pad: 28, mallet: 'x.x.X.x.', mv: 38, bass: 48 });
  sez(T.larga, R('larga', 7.8), ['Dm', 'Am', 'Dm', 'G'], { pad: 28, box: 'x.x.x...', bv: 30, vib: 22 });
  sez(R('larga', 7.8), T.resta, ['C', 'Em', 'F', 'Dm', 'Am', 'G'], { pad: 28, mallet: 'x.xxX.x.', mv: 38, bass: 46 });
  // Resta pescato: il treno va via; e la storia continua, in una casa.
  sez(T.resta, R('resta', 4.6), ['Am', 'F'], { pad: 30, keys: 26 });
  sez(R('resta', 4.6), T.ancora, ['Am', 'F', 'Dm', 'G'], { pad: 28, bass: 44, vib: 22 });
  sez(T.ancora, R('ancora', 11.6), ['F', 'C', 'Am', 'G'], { pad: 26, keys: 26 });
  sez(R('ancora', 11.6), R('ancora', 19.4), ['Am', 'F', 'Dm', 'G'], { pad: 28, keys: 26 });
  [0.6, 13.2, 25.8].forEach(a => S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('pesche', a + 1.4))), repeat: 3, vel: 30 }));
  // La coda sul quaderno: solo il pad, piano, sotto la voce.
  sez(R('coda', 1.0), R('coda', 45.0), ['C', 'Am', 'F', 'G'], { pad: 22, keys: 18 });
  // I due cartelli: il titolo e la fine.
  [R('domanda', 17.0), R('ancora', 19.4)].forEach((a, k) => {
    S.fx('revswell', a - 0.6, { dur: 1.2 });
    S.chord('pad', C.C, { t: a, dur: 3.8, vel: 42 });
    S.chord('keys', ['C4', 'E4', 'G4', 'C5'], { t: a, dur: 3.4, vel: 44 });
    S.note('bass', 'C2', { t: a, dur: 2.6, vel: 58 });
    S.run('box', k ? ['C5', 'E5', 'G5', 'C6', 'E6', 'G6'] : ['C5', 'E5', 'G5', 'C6'], { t: a - 0.2, step: 0.12, vel: 44, cresc: 8 });
    S.fx('chime', a + 0.9);
  });

  // ── Rumori ─────────────────────────────────────────────────────────────────────────────────────────
  for (let k = 0; k < 10; k++) S.fx('tick', R('domanda', 6.8 + k * 0.4), { vel: 14 });
  for (let k = 0; k < 8; k++) S.fx('tick', R('domanda', 12.6 + k * 0.3), { vel: 10 });
  // Le tre case: si scrive, si preme invio; le strisce volano e atterrano.
  for (let k = 0; k < 16; k++) S.fx('tick', R('case', 4.7 + k * 0.2), { vel: 16 });
  [8.0, 8.5, 9.0].forEach(c => S.fx('click', R('case', c), { vel: 46 }));
  [10.6, 11.3, 12.0].forEach(c => S.fx('whoosh', R('case', c), { dur: 2.2 }));
  [17.4, 18.2, 19.0].forEach(c => S.fx('pop', R('case', c), { vel: 38 }));
  S.fx('sparkle', R('case', 19.6), { vel: 30 });
  // Lo Spezzaparole, tre volte; i biglietti, i passeggeri, le sbarre, la partenza.
  [0.8, 2.4, 4.0].forEach(via => {
    S.fx('whoosh', R('treni', via + 0.2), { dur: 0.6 });
    for (let k = 0; k < 4; k++) S.fx('tick', R('treni', via + 0.9 + k * 0.12), { vel: 22 });
    [via + 1.5, via + 1.85].forEach(c => { S.fx('click', R('treni', c), { vel: 56 }); S.fx('doubleclick', R('treni', c + 0.05), { vel: 38 }); });
    [via + 2.1, via + 2.35, via + 2.6].forEach(c => { S.fx('pop', R('treni', c), { vel: 40 }); S.fx('sparkle', R('treni', c + 1.55), { vel: 30 }); });
  });
  for (let k = 0; k < 9; k++) S.fx('click', R('treni', 11.8 + k * 0.1), { vel: 34 });
  for (let k = 0; k < 22; k++) S.fx('tick', R('treni', 13.4 + k * 0.2), { vel: 26 });
  [17.0, 18.6, 20.0].forEach(c => S.fx('whoosh', R('treni', c), { dur: 2.4 }));
  // Dentro: per ogni giro, i fili, gli scambi, le finestre (tempi del giro, tau, portati al tempo della scena).
  [[0, 1], [23.4, 3.4], [30.4, 3.4]].forEach(([da, v], g) => {
    const F = tau => R('finestre', da + tau / v), vel = g ? 30 : 40;
    [0.8, 1.3, 1.8].forEach(c => S.fx('sparkle', F(c), { vel: vel - 6 }));
    S.fx('chime', F(1.8));
    [4.8, 5.1, 5.4, 11.8, 12.1, 12.4, 18.0, 18.3, 18.6].forEach(c => S.fx('doubleclick', F(c - 0.35), { vel: vel + 6 }));
    [10.2, 16.6].forEach(c => S.fx('sparkle', F(c), { vel: vel - 8 }));
    [8.6, 15.2, 21.4].forEach(c => S.fx('chime', F(c - 0.4)));
  });
  S.fx('whoosh', R('finestre', 36.4), { dur: 2.0 });
  // Le uscite e le pesche.
  const pesca = (id, a, o) => {
    S.fx('whoosh', R(id, a), { dur: 1.4 });
    for (let k = 0; k < 14; k++) S.fx('pop', R(id, a + 1.6 + k * 0.18), { vel: 26 + (k % 3) * 6 });
    S.fx('sparkle', R(id, a + 10.6), { vel: 50 }); S.fx('chime', R(id, a + 10.9));
    if (o.corre) {
      S.fx('boing', R(id, a + 11.2), { vel: 42 });
      for (let k = 0; k < 6; k++) S.fx('woodblock', R(id, a + 11.9 + k * 0.2), { vel: 26 });
      S.fx('sparkle', R(id, a + 11.6), { vel: 40 }); S.fx('ding', R(id, a + 12.8), { vel: 40 });
    }
    S.fx('whoosh', R(id, a + 11.6), { dur: 1.4, vel: 30 });
    if (o.parte) for (let k = 0; k < 12; k++) S.fx('tick', R(id, a + 13.3 + k * 0.22), { vel: 22 });
  };
  [0.6, 13.2, 25.8].forEach((a, n) => pesca('pesche', a, { corre: true, parte: n < 2 }));
  [39.9, 40.5, 41.1].forEach(c => S.fx('pop', R('pesche', c), { vel: 40 }));
  // La manopola: il quaderno la urta; la mano la gira, scatto dopo scatto; la lucina grande si accende.
  S.fx('woodblock', R('manopola', 1.0), { vel: 46 });
  for (let k = 0; k < 7; k++) S.fx('tick', R('manopola', 11.0 + k * 0.2), { vel: 30 });
  S.fx('chime', R('manopola', 12.4)); S.fx('sparkle', R('manopola', 12.5), { vel: 40 });
  [13.6, 26.6].forEach((a, n) => pesca('manopola', a, { corre: true, parte: n === 0 }));
  [40.3, 41.0].forEach(c => S.fx('pop', R('manopola', c), { vel: 40 }));
  // Dall'altro lato: la freccia torna indietro e va dall'altra parte; le lucine piccole si accendono una dopo l'altra.
  for (let k = 0; k < 13; k++) S.fx('tick', R('larga', 2.4 + k * 0.2), { vel: 28 });
  for (let k = 0; k < 8; k++) S.run('box', [['C6', 'D6', 'E6', 'G6', 'A6', 'C7', 'D7', 'E7'][k]], { t: R('larga', 3.8 + k * 0.15), vel: 30 });
  pesca('larga', 7.8, {});
  S.fx('pop', R('larga', 20.0), { vel: 40 });
  S.fx('boing', R('larga', 23.4), { vel: 30 });
  // Resta pescato: la paperella corre al vagone nuovo, la sbarra scatta, il treno va via; la freccia torna nel mezzo.
  S.fx('boing', R('resta', 0.8), { vel: 42 });
  for (let k = 0; k < 6; k++) S.fx('woodblock', R('resta', 1.5 + k * 0.22), { vel: 26 });
  S.fx('sparkle', R('resta', 1.8), { vel: 40 }); S.fx('ding', R('resta', 3.4), { vel: 40 });
  S.fx('click', R('resta', 4.2), { vel: 50 });
  for (let k = 0; k < 16; k++) S.fx('tick', R('resta', 4.8 + k * 0.24), { vel: 24 });
  S.fx('whoosh', R('resta', 8.6), { dur: 2.0 });
  for (let k = 0; k < 8; k++) S.fx('tick', R('resta', 12.2 + k * 0.25), { vel: 22 });
  // Ancora: si scrive, invio; la striscia vola e arriva ad Ada.
  for (let k = 0; k < 6; k++) S.fx('tick', R('ancora', 4.0 + k * 0.3), { vel: 18 });
  S.fx('click', R('ancora', 6.4), { vel: 46 });
  S.fx('whoosh', R('ancora', 6.9), { dur: 2.6 });
  S.fx('whoosh', R('ancora', 11.8), { dur: 1.8 });
  S.fx('pop', R('ancora', 13.6), { vel: 38 });
  // La matita della coda: un tratto ogni mezzo secondo, per ogni schizzo.
  [[1.4, 1], [13.2, 3], [24.2, 2]].forEach(([a, n]) => { for (let k = 0; k < n * 2; k++) S.fx('tick', R('coda', a + k * 0.25), { vel: 14 }); });
});
