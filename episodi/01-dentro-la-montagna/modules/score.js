kit.score(function (S, T) {
  // Musica originale: lo stesso valzerino del prologo fuori dalla montagna; dentro, un tema sospeso che si apre piano.
  // Gli accordi stanno sul pad (servono anche allo stile «anni 90» del sito).
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
  // Fuori: il luna park.
  sez(T.domanda, T.domanda + 19.6, ['Am', 'F', 'C', 'G'], { pad: 28, keys: 26 });
  sez(T.carrozza, T.buio, giro, { pad: 28, mallet: 'x.x.X.x.', mv: 42, bass: 52 });
  sez(T.buio, T.buio + 10.6, ['Am', 'Am', 'F', 'G'], { pad: 30, bass: 44 });
  // Dentro: sospeso, poi sempre più aperto.
  sez(T.buio + 11.6, T.fili, ['Em', 'Em'], { pad: 22 });
  sez(T.fili, T.scambi, ['Em', 'C', 'Am', 'G'], { pad: 28, vib: 26 });
  sez(T.scambi, T.finestre, ['Am', 'F', 'Dm', 'G'], { pad: 28, mallet: 'x...x...', mv: 34, bass: 42 });
  sez(T.finestre, T.finestre + 32, ['F', 'G', 'Em', 'Am'], { pad: 30, box: 'x.x.x.x.', bv: 30, vib: 24 });
  sez(T.finestre + 32, T.uscita, ['F', 'G', 'C', 'C'], { pad: 36, keys: 32 });
  // Fuori di nuovo: la vasca, la pesca, il quaderno.
  sez(T.uscita, T.pesca, ['C', 'Am', 'F', 'G'], { pad: 28, mallet: 'x.x.X.x.', mv: 40, bass: 50 });
  sez(T.pesca, T.pesca + 10, ['Am', 'Em', 'F', 'G'], { pad: 30, vib: 24 });
  sez(T.pesca + 10, T.quaderno, giro, { pad: 28, box: 'x.x.x.x.', bv: 30, bass: 48 });
  sez(T.quaderno, T.quaderno + 20.6, ['F', 'C', 'Dm', 'G'], { pad: 28, keys: 28, mallet: 'x...x.x.', mv: 36 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(T.uscita + 2)), repeat: 6, vel: 30 });
  // I due cartelli: il titolo e la fine.
  [T.domanda + 19.6, T.quaderno + 20.6].forEach((a, k) => {
    S.fx('revswell', a - 0.6, { dur: 1.2 });
    S.chord('pad', C.C, { t: a, dur: 3.8, vel: 42 });
    S.chord('keys', ['C4', 'E4', 'G4', 'C5'], { t: a, dur: 3.4, vel: 44 });
    S.note('bass', 'C2', { t: a, dur: 3, vel: 58 });
    S.run('box', k ? ['C5', 'E5', 'G5', 'C6', 'E6', 'G6'] : ['C5', 'E5', 'G5', 'C6'], { t: a - 0.2, step: 0.12, vel: 44, cresc: 8 });
    S.fx('chime', a + 0.9);
  });

  // ── Rumori ─────────────────────────────────────────────────────────────────────────────────────────
  [0.6, 1.8, 3.2].forEach(c => S.fx('doubleclick', T.domanda + c, { vel: 30 }));
  for (let k = 0; k < 14; k++) S.fx('tick', T.domanda + 6.2 + k * 0.6, { vel: 16 });
  // In carrozza: la striscia, la biglietteria, i biglietti, i passeggeri, le sbarre.
  S.fx('whoosh', T.carrozza + 0.6, { dur: 2.0 });
  S.fx('pop', T.carrozza + 2.8, { vel: 38 });
  S.fx('whoosh', T.carrozza + 4.0, { dur: 0.6 });
  for (let k = 0; k < 9; k++) S.fx('tick', T.carrozza + 5.2 + k * 0.28, { vel: 24 });
  [5.6, 6.2].forEach(c => { S.fx('click', T.carrozza + c, { vel: 56 }); S.fx('doubleclick', T.carrozza + c + 0.05, { vel: 38 }); });
  [6.8, 7.2, 7.6].forEach(c => S.fx('pop', T.carrozza + c, { vel: 44 }));
  [9.6, 10.1, 10.6].forEach(c => { S.fx('sparkle', T.carrozza + c, { vel: 38 }); S.fx('ding', T.carrozza + c + 0.15, { vel: 28 }); });
  [20.6, 20.9, 21.2].forEach(c => S.fx('click', T.carrozza + c, { vel: 40 }));
  // Nel buio: la catena, la discesa, il buio.
  for (let k = 0; k < 22; k++) S.fx('tick', T.buio + 1.8 + k * 0.2, { vel: 30 });
  S.fx('whoosh', T.buio + 7.2, { dur: 3.2 });
  S.fx('thud', T.buio + 10.8, { vel: 36 });
  // I fili: si accendono con un tintinnio; i colori scorrono.
  [2.4, 3.1, 4.0].forEach(c => S.fx('sparkle', T.fili + c, { vel: 34 }));
  S.fx('chime', T.fili + 15.6);
  S.fx('sparkle', T.fili + 18.4, { vel: 40 });
  // Gli scambi: clac.
  [3.35, 4.15].forEach(c => S.fx('doubleclick', T.scambi + c, { vel: 52 }));
  S.fx('doubleclick', T.scambi + 12.75, { vel: 56 });
  S.fx('whoosh', T.scambi + 12.8, { dur: 1.0 });
  S.fx('sparkle', T.scambi + 13.6, { vel: 40 });
  // Le finestre: altri giri, più veloci.
  [5.8, 17.6].forEach(c => S.fx('sparkle', T.finestre + c, { vel: 30 }));
  [8.35, 8.65, 8.95, 19.95, 20.25, 20.55].forEach(c => S.fx('doubleclick', T.finestre + c, { vel: 44 }));
  S.fx('whoosh', T.finestre + 33, { dur: 6.0 });
  // L'uscita: le paperelle cadono nell'acqua.
  S.fx('whoosh', T.uscita + 1.0, { dur: 1.6 });
  for (let k = 0; k < 16; k++) S.fx('pop', T.uscita + 7.6 + k * 0.22, { vel: 28 + (k % 3) * 6 });
  S.fx('ding', T.uscita + 24.8, { vel: 40 });
  // La pesca.
  S.fx('sparkle', T.pesca + 5.9, { vel: 52 });
  S.fx('chime', T.pesca + 6.2);
  S.fx('whoosh', T.pesca + 8.2, { dur: 1.8 });
  S.fx('boing', T.pesca + 10.3, { vel: 44 });
  for (let k = 0; k < 9; k++) S.fx('woodblock', T.pesca + 11.1 + k * 0.24, { vel: 26 });
  S.fx('sparkle', T.pesca + 13.0, { vel: 46 });
  S.fx('boing', T.pesca + 13.4, { vel: 40 });
  S.fx('ding', T.pesca + 13.8, { vel: 40 });
  S.fx('pop', T.pesca + 16.3, { vel: 40 });
  // Il quaderno: la matita.
  for (let k = 0; k < 24; k++) S.fx('tick', T.quaderno + 0.7 + k * 0.3, { vel: 14 });
  for (let k = 0; k < 14; k++) S.fx('tick', T.quaderno + 12.6 + k * 0.2, { vel: 24 });
});
