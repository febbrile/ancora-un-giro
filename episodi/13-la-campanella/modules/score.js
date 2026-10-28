kit.score(function (S, T) {
  // Musica originale. La storia a metà, sospesa; la notte del custode, col suo tema e un passo regolare di woodblock,
  // come un orologio; il primo giro col valzerino e il tema sospeso dentro la montagna; il montaggio dei giri sempre più
  // svelto, con un tic a ogni tacca; la campanella che ferma tutto; «continua» che riparte, fino alla Fine.
  // Gli accordi stanno sul pad (per lo stile «anni 90»).
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
  const R = (id, x) => T[id] + window.G.reale('13', id, x);
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
  // Il tema del custode: quattro note gravi, sempre le stesse, a ogni sua entrata.
  const custode = t => S.run('keys', ['A3', 'E3', 'F3', 'E3'], { t, step: 0.5, dur: 0.6, vel: 40 });
  const giro = ['C', 'Am', 'F', 'G'], suo = ['Am', 'Dm', 'Am', 'Em'];
  const tic = (t, v) => { S.fx('woodblock', t, { vel: v || 30 }); S.note('box', 'E6', { t, dur: 0.12, vel: 22 }); };
  const drin = t => { S.fx('chime', t); S.run('box', ['E6', 'G6', 'E6', 'G6', 'E6', 'G6', 'E6'], { t, step: 0.07, vel: 40, cresc: -4 }); };
  // La domanda.
  sez(T.domanda, R('domanda', 18.8), ['Am', 'F', 'Dm', 'Em'], { pad: 24, keys: 20 });
  // La notte del custode: il suo tema, e il passo dell'orologio.
  sez(T.guardiola, T.orologio, suo, { pad: 26, keys: 22, bass: 38 });
  custode(R('guardiola', 1.4)); custode(R('guardiola', 27.4));
  for (let k = 0; k < 40; k++) S.fx('woodblock', R('guardiola', 1.0 + k * 0.6), { vel: 10 });
  // L'orologio.
  sez(T.orologio, T.primo, suo, { pad: 26, vib: 22, bass: 36 });
  // Il primo giro.
  sez(T.primo, R('primo', 9.0), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 38, bass: 46 });
  sez(R('primo', 9.0), R('primo', 29.0), ['Em', 'C', 'Am', 'G'], { pad: 28, vib: 24, box: 'x...x...', bv: 22 });
  sez(R('primo', 29.0), T.giri, giro, { pad: 28, mallet: 'x...x.x.', mv: 34, bass: 44 });
  // Giro dopo giro: sempre più svelto.
  sez(T.giri, T.campanella, giro, { pad: 30, mallet: 'xxx.X.x.', mv: 42, box: 'x.x.x.x.', bv: 26, bass: 52 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('giri', 0.6))), repeat: 6, vel: 32 });
  // La campanella: tutto si ferma.
  sez(T.campanella, R('campanella', 6.2), ['F', 'G'], { pad: 28, keys: 22 });
  sez(R('campanella', 6.6), T.continua, ['Am', 'Dm', 'Em', 'Am'], { pad: 22, vib: 18 });
  // Continua: riparte, fino alla Fine.
  sez(T.continua, R('continua', 12.6), ['C', 'F', 'G', 'C'], { pad: 26, keys: 22, bass: 40 });
  sez(R('continua', 12.6), R('continua', 31.0), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 38, bass: 46 });
  S.chord('pad', C.C, { t: R('continua', 31.2), dur: 3.0, vel: 30 });
  // L'indovinello: il treno gira, il telefono tace.
  sez(T.indovinello, R('indovinello', 17.4), ['Am', 'Em', 'Am', 'Dm'], { pad: 24, mallet: 'x...x...', mv: 28 });
  // La coda sul quaderno: solo il pad, piano, sotto la voce.
  sez(R('coda', 1.0), R('coda', 41.0), ['C', 'Am', 'F', 'G'], { pad: 22, keys: 18 });
  // I due cartelli: il titolo e la fine.
  [R('domanda', 18.8), R('indovinello', 17.4)].forEach((a, k) => {
    S.fx('revswell', a - 0.6, { dur: 1.2 });
    S.chord('pad', C.C, { t: a, dur: 3.8, vel: 42 });
    S.chord('keys', ['C4', 'E4', 'G4', 'C5'], { t: a, dur: 3.4, vel: 44 });
    S.note('bass', 'C2', { t: a, dur: 2.6, vel: 58 });
    S.run('box', k ? ['C5', 'E5', 'G5', 'C6', 'E6', 'G6'] : ['C5', 'E5', 'G5', 'C6'], { t: a - 0.2, step: 0.12, vel: 44, cresc: 8 });
    S.fx('chime', a + 0.9);
  });

  // ── Rumori ─────────────────────────────────────────────────────────────────────────────────────────
  const uscita = (id, esce, cade, pesca, salta, sale) => {
    S.fx('whoosh', R(id, esce), { dur: 1.6 });
    for (let k = 0; k < 14; k++) S.fx('pop', R(id, cade[0] + k * (cade[1] - cade[0]) / 14), { vel: 24 + (k % 3) * 6 });
    if (pesca !== undefined) { S.fx('sparkle', R(id, pesca), { vel: 44 }); S.fx('chime', R(id, pesca + 0.3)); }
    if (salta !== undefined) { S.fx('boing', R(id, salta), { vel: 38 }); for (let k = 0; k < 4; k++) S.fx('woodblock', R(id, salta + 0.4 + k * 0.18), { vel: 22 }); }
    if (sale !== undefined) S.fx('ding', R(id, sale), { vel: 36 });
  };
  // La domanda: il telefono scosso; le pagine del quaderno.
  for (let k = 0; k < 6; k++) S.fx('tick', R('domanda', 2.6 + k * 0.2), { vel: 24 });
  S.fx('whoosh', R('domanda', 4.8), { dur: 0.8, vel: 22 });
  [8.4, 9.6, 10.5, 11.4, 12.3].forEach(c => S.fx('pop', R('domanda', c), { vel: 22 }));
  // La notte del custode: la porta, i lampioni, il lucchetto, l'orologio caricato.
  S.fx('click', R('guardiola', 0.4), { vel: 30 });
  [4.0, 6.0, 8.0, 10.0].forEach(c => { S.fx('click', R('guardiola', c), { vel: 30 }); S.fx('sparkle', R('guardiola', c + 0.1), { vel: 24 }); });
  [15.0, 15.4, 15.8].forEach(c => S.fx('click', R('guardiola', c), { vel: 36 }));
  for (let k = 0; k < 9; k++) S.fx('tick', R('guardiola', 19.6 + k * 0.22), { vel: 28 });
  // L'orologio: la campanella, piano.
  S.fx('ding', R('orologio', 6.2), { vel: 24, pitch: 'E7' });
  [12.0, 13.0, 19.0].forEach(c => S.fx('whoosh', R('orologio', c), { dur: 0.4, vel: 20 }));
  // Il primo giro.
  for (let k = 0; k < 3; k++) S.fx('pop', R('primo', 1.0 + k * 0.4), { vel: 20 });
  for (let k = 0; k < 10; k++) S.fx('click', R('primo', 4.6 + k * 0.04), { vel: 26 });
  S.fx('click', R('primo', 5.4), { vel: 40 }); S.fx('whoosh', R('primo', 6.0), { dur: 2.4 });
  [10.4, 16.0, 22.8].forEach(c => S.fx('sparkle', R('primo', c), { vel: 26 }));
  [15.5, 20.2, 24.9].forEach((c, k) => { S.fx('chime', R('primo', c - 0.2)); S.note('vib', ['E3', 'G3', 'C4'][k], { t: R('primo', c), dur: 1.6, vel: 26 }); });
  uscita('primo', 29.2, [31.3, 33.2], 34.6, 35.4, 36.6);
  tic(R('primo', 39.0), 40);
  // Giro dopo giro: tic a ogni pesca.
  [1.0, 9.4, 17.0].forEach((a, k) => { uscita('giri', a, [a + 1.8, a + 3.2], a + 4.1, k < 2 ? a + 4.8 : undefined, k < 2 ? a + 5.7 : undefined); tic(R('giri', a + 4.9), 40); S.fx('pop', R('giri', a + 5.8), { vel: 34 }); });
  // La campanella: la corsa al vagone nuovo; la cordicella; drin; il fanale.
  S.fx('boing', R('campanella', 0.4), { vel: 36 }); S.fx('ding', R('campanella', 1.8), { vel: 34 });
  S.fx('click', R('campanella', 5.8), { vel: 34 });
  drin(R('campanella', 6.2));
  S.fx('thud', R('campanella', 11.2), { vel: 20 });
  // Continua.
  for (let t = 1.0; t < 3.6; t += 0.24) S.fx('tick', R('continua', t), { vel: 14 });
  S.fx('click', R('continua', 3.8), { vel: 40 }); S.fx('whoosh', R('continua', 5.0), { dur: 2.4 });
  for (let k = 0; k < 8; k++) S.fx('tick', R('continua', 7.0 + k * 0.15), { vel: 24 });
  for (let k = 0; k < 17; k++) { S.fx('click', R('continua', 8.4 + k * 0.13), { vel: 36 }); S.fx('pop', R('continua', 8.45 + k * 0.13), { vel: 24 }); }
  [12.6, 19.2, 25.8].forEach((a, k) => uscita('continua', a, [a + 1.8, a + 3.2], a + 4.1, k < 2 ? a + 4.8 : undefined, k < 2 ? a + 5.7 : undefined));
  S.fx('click', R('continua', 31.0), { vel: 40 });
  S.fx('pop', R('continua', 32.8), { vel: 40 });
  // L'indovinello.
  S.fx('whoosh', R('indovinello', 0.2), { dur: 2.4 });
  for (let k = 0; k < 6; k++) S.fx('whoosh', R('indovinello', 4.0 + k * 2.2), { dur: 1.2, vel: 18 });
  // La matita della coda: un tratto ogni mezzo secondo, per ogni schizzo.
  [[1.4, 3], [11.0, 3], [21.4, 2], [29.6, 1]].forEach(([a, n]) => { for (let k = 0; k < n * 2; k++) S.fx('tick', R('coda', a + k * 0.25), { vel: 14 }); });
});
