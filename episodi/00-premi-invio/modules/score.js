kit.score(function (S, T) {
  // Musica originale: un valzerino da luna park, piano. Gli accordi stanno sul pad (servono anche allo stile «anni 90» del sito).
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
  const R = (id, x) => T[id] + window.G.reale('00', id, x);
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
  // La sera, il telefono.
  sez(T.invio, T.volo, ['C', 'Am', 'F', 'G'], { pad: 28, keys: 30 });
  // Il volo sopra i tetti.
  sez(T.volo, T.lunapark, ['F', 'G', 'Em', 'Am'], { pad: 30, box: 'x.x.x.x.', bv: 30, vib: 26 });
  // Il luna park: il tema, con marimba e basso.
  sez(T.lunapark, T.spezzaparole, giro, { pad: 28, mallet: 'x.x.X.x.', mv: 44, bass: 54 });
  sez(T.spezzaparole, T.passeggeri, ['Dm', 'G', 'C', 'Am'], { pad: 26, mallet: 'x...x.x.', mv: 38, bass: 48 });
  sez(T.passeggeri, T.partenza, giro, { pad: 28, box: 'x..x..x.', bv: 30, bass: 46 });
  // La partenza: si sale piano, poi giù.
  sez(T.partenza, R('partenza', 12), ['Am', 'Am', 'F', 'G'], { pad: 30, bass: 44 });
  sez(R('partenza', 12), T.vasca, ['Em', 'Am', 'Dm', 'G'], { pad: 34, vib: 28 });
  // La vasca e la pesca.
  sez(T.vasca, T.pesca, ['F', 'C', 'G', 'Am'], { pad: 28, keys: 26, mallet: 'x...x...', mv: 34 });
  sez(T.pesca, R('pesca', 11), ['Am', 'Em', 'F', 'G'], { pad: 30, vib: 24 });
  sez(R('pesca', 11), T.ancora, giro, { pad: 28, box: 'x.x.x.x.', bv: 30, bass: 48 });
  // Ancora un giro: il tema intero, poi il titolo.
  sez(T.ancora, R('ancora', 22.0), giro, { pad: 30, mallet: 'x.x.X.x.', mv: 44, bass: 54 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('ancora', 2))), repeat: 6, vel: 34 });
  const fine = R('ancora', 22.0);
  S.fx('revswell', fine - 0.6, { dur: 1.2 });
  S.chord('pad', C.C, { t: fine, dur: 4.2, vel: 44 });
  S.chord('keys', ['C4', 'E4', 'G4', 'C5'], { t: fine, dur: 3.6, vel: 46 });
  S.note('bass', 'C2', { t: fine, dur: 3, vel: 60 });
  S.run('box', ['C5', 'E5', 'G5', 'C6', 'E6'], { t: fine - 0.2, step: 0.12, vel: 44, cresc: 8 });
  S.fx('chime', fine + 0.9);
  // La coda sul quaderno: solo il pad, piano, sotto la voce.
  sez(R('coda', 1.0), R('coda', 45.0), ['C', 'Am', 'F', 'G'], { pad: 22, keys: 18 });

  // ── Rumori ─────────────────────────────────────────────────────────────────────────────────────────
  // Il telefono: i tasti e l'invio.
  for (let k = 0; k < 12; k++) S.fx('tick', R('invio', 10.6 + k * 0.42), { vel: 22 });
  S.fx('click', R('invio', 16.0), { vel: 50 });
  S.fx('pop', R('invio', 16.2), { vel: 44 });
  // Il volo.
  S.fx('whoosh', R('volo', 1.0), { dur: 1.2 });
  S.fx('whoosh', R('volo', 3.0), { dur: 1.6 });
  S.fx('whoosh', R('volo', 6.0), { dur: 3.0 });
  S.fx('whoosh', R('volo', 12.0), { dur: 3.0 });
  // Il luna park: la striscia atterra in mano ad Ada.
  S.fx('whoosh', R('lunapark', 8.0), { dur: 2.4 });
  S.fx('pop', R('lunapark', 11.0), { vel: 40 });
  // Lo Spezzaparole: la striscia entra, la macchina lavora, zac zac, tre biglietti.
  S.fx('whoosh', R('spezzaparole', 3.6), { dur: 0.6 });
  for (let k = 0; k < 14; k++) S.fx('tick', R('spezzaparole', 4.5 + k * 0.28), { vel: 26 });
  [5.2, 6.0].forEach(c => { S.fx('click', R('spezzaparole', c), { vel: 58 }); S.fx('doubleclick', R('spezzaparole', c + 0.05), { vel: 40 }); });
  [7.0, 7.8, 8.6].forEach(c => S.fx('pop', R('spezzaparole', c), { vel: 46 }));
  // I passeggeri prendono vita; le sbarre.
  [3.0, 4.6, 6.2].forEach(c => S.fx('thud', R('passeggeri', c), { vel: 26 }));
  [8.4, 10.1, 12.4].forEach(c => { S.fx('sparkle', R('passeggeri', c), { vel: 40 }); S.fx('ding', R('passeggeri', c + 0.2), { vel: 30 }); });
  [20.6, 20.9, 21.2].forEach(c => S.fx('click', R('passeggeri', c), { vel: 40 }));
  // La partenza: la catena della salita, la discesa, i clac nel buio.
  for (let k = 0; k < 19; k++) S.fx('tick', R('partenza', 7.0 + k * 0.2), { vel: 30 });
  S.fx('whoosh', R('partenza', 12.4), { dur: 3.0 });
  [16.6, 17.4, 18.9, 20.2, 21.0, 22.6].forEach(c => S.fx('doubleclick', R('partenza', c), { vel: 32 }));
  // La vasca: il treno esce, le paperelle cadono nell'acqua.
  S.fx('whoosh', R('vasca', 6.8), { dur: 1.4 });
  for (let k = 0; k < 14; k++) S.fx('pop', R('vasca', 11.0 + k * 0.13), { vel: 30 + (k % 3) * 6 });
  S.fx('roll', R('vasca', 14.5), { dur: 4.0, vel: 30 });
  // La pesca.
  S.fx('sparkle', R('pesca', 7.9), { vel: 52 });
  S.fx('chime', R('pesca', 8.2));
  S.fx('whoosh', R('pesca', 9.4), { dur: 1.8 });
  S.fx('boing', R('pesca', 11.6), { vel: 44 });
  for (let k = 0; k < 9; k++) S.fx('woodblock', R('pesca', 12.4 + k * 0.24), { vel: 26 });
  S.fx('sparkle', R('pesca', 14.2), { vel: 46 });
  S.fx('boing', R('pesca', 14.6), { vel: 40 });
  S.fx('ding', R('pesca', 15.0), { vel: 40 });
  for (let k = 0; k < 1; k++) S.fx('tick', R('pesca', 17.1), { vel: 30 });
  // Ancora un giro: si riparte; sul telefono le parole arrivano una alla volta.
  for (let k = 0; k < 16; k++) S.fx('tick', R('ancora', 4.2 + k * 0.2), { vel: 26 });
  S.fx('whoosh', R('ancora', 8.4), { dur: 2.6 });
  for (let k = 0; k < 9; k++) S.fx('tick', R('ancora', 8.4 + k * 0.6), { vel: 26 });
  [18.0, 19.2, 20.4].forEach(c => S.fx('doubleclick', R('ancora', c), { vel: 26 }));
  // La matita della coda: un tratto ogni mezzo secondo, per ogni schizzo.
  [[1.4, 2], [9.4, 3], [18.5, 2], [27.4, 1], [37.4, 1]].forEach(([a, n]) => { for (let k = 0; k < n * 2; k++) S.fx('tick', R('coda', a + k * 0.25), { vel: 14 }); });
});
