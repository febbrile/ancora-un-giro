kit.score(function (S, T) {
  // Musica originale: il valzerino del luna park fuori dalla montagna; dentro, il tema sospeso che si apre piano.
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
  // Fuori: la domanda, le due case, il parco, la partenza.
  sez(T.domanda, T.domanda + 17.6, ['Am', 'F', 'C', 'G'], { pad: 28, keys: 26 });
  sez(T.frasi, T.frasi + 16.2, ['F', 'C', 'Am', 'G'], { pad: 26, vib: 24 });
  sez(T.frasi + 16.2, T.parco, giro, { pad: 28, mallet: 'x...x.x.', mv: 36 });
  sez(T.parco, T.partenza, giro, { pad: 28, mallet: 'x.x.X.x.', mv: 42, bass: 52 });
  sez(T.partenza, T.fili, ['Am', 'Am', 'F', 'G'], { pad: 30, bass: 44 });
  // Dentro: sospeso, poi sempre più aperto.
  sez(T.fili, T.fili + 15, ['Em', 'C', 'Am', 'G'], { pad: 28, vib: 26 });
  sez(T.fili + 15, T.fili + 21, ['Em', 'Em'], { pad: 22 });
  sez(T.fili + 21, T.finestre, ['Em', 'C', 'F', 'G'], { pad: 28, vib: 26 });
  sez(T.finestre, T.finestre + 31.6, ['F', 'G', 'C', 'Am'], { pad: 30, box: 'x.x.x.x.', bv: 30, mallet: 'x...x...', mv: 32, bass: 42 });
  sez(T.finestre + 31.6, T.mare, ['F', 'G', 'C', 'C'], { pad: 36, keys: 32 });
  // Fuori di nuovo: le due vasche, la pesca, la stessa frase.
  sez(T.mare, T.verde, ['C', 'Am', 'F', 'G'], { pad: 28, mallet: 'x.x.X.x.', mv: 40, bass: 50 });
  sez(T.verde, T.verde + 11.4, ['C', 'Am', 'F', 'G'], { pad: 28, mallet: 'x.x.X.x.', mv: 40, bass: 50 });
  sez(T.verde + 11.4, T.pesca, ['F', 'C', 'Dm', 'G'], { pad: 28, keys: 28, box: 'x...x...', bv: 28 });
  sez(T.pesca, T.pesca + 14, ['Am', 'Em', 'F', 'G'], { pad: 30, vib: 24 });
  sez(T.pesca + 14, T.ancora, giro, { pad: 28, box: 'x.x.x.x.', bv: 30, bass: 48 });
  sez(T.ancora, T.ancora + 17, giro, { pad: 28, mallet: 'x.x.X.x.', mv: 38, bass: 48 });
  sez(T.ancora + 17, T.ancora + 29.2, ['Am', 'F', 'Dm', 'G'], { pad: 28, keys: 26 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(T.mare + 2)), repeat: 5, vel: 30 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(T.verde + 2)), repeat: 5, vel: 30 });
  // I due cartelli: il titolo e la fine.
  [T.domanda + 17.6, T.ancora + 29.2].forEach((a, k) => {
    S.fx('revswell', a - 0.6, { dur: 1.2 });
    S.chord('pad', C.C, { t: a, dur: 3.8, vel: 42 });
    S.chord('keys', ['C4', 'E4', 'G4', 'C5'], { t: a, dur: 3.4, vel: 44 });
    S.note('bass', 'C2', { t: a, dur: 2.6, vel: 58 });
    S.run('box', k ? ['C5', 'E5', 'G5', 'C6', 'E6', 'G6'] : ['C5', 'E5', 'G5', 'C6'], { t: a - 0.2, step: 0.12, vel: 44, cresc: 8 });
    S.fx('chime', a + 0.9);
  });

  // ── Rumori ─────────────────────────────────────────────────────────────────────────────────────────
  for (let k = 0; k < 10; k++) S.fx('tick', T.domanda + 7.6 + k * 0.4, { vel: 14 });
  // Le due case: si scrive, si preme invio; le strisce volano e atterrano.
  for (let k = 0; k < 13; k++) S.fx('tick', T.frasi + 4.9 + k * 0.24, { vel: 18 });
  [8.2, 9.0].forEach(c => S.fx('click', T.frasi + c, { vel: 46 }));
  [11.0, 11.9].forEach(c => S.fx('whoosh', T.frasi + c, { dur: 2.4 }));
  [18.4, 20.0].forEach(c => S.fx('pop', T.frasi + c, { vel: 38 }));
  // Lo Spezzaparole, due volte; i biglietti, i passeggeri, Parco che saluta, le sbarre.
  [[1.0, [4.0, 4.6], [5.2, 5.6, 6.0]], [8.6, [11.6, 12.2], [12.8, 13.2, 13.6]]].forEach(([via, tagli, uscite]) => {
    S.fx('whoosh', T.parco + via + 0.2, { dur: 0.6 });
    for (let k = 0; k < 6; k++) S.fx('tick', T.parco + tagli[0] - 0.7 + k * 0.12, { vel: 22 });
    tagli.forEach(c => { S.fx('click', T.parco + c, { vel: 56 }); S.fx('doubleclick', T.parco + c + 0.05, { vel: 38 }); });
    uscite.forEach(c => { S.fx('pop', T.parco + c, { vel: 44 }); S.fx('sparkle', T.parco + c + 1.45, { vel: 34 }); S.fx('ding', T.parco + c + 1.6, { vel: 26 }); });
  });
  S.fx('boing', T.parco + 17.4, { vel: 36 });
  for (let k = 0; k < 6; k++) S.fx('click', T.parco + 26.4 + k * 0.15, { vel: 36 });
  // La partenza: la catena della salita.
  for (let k = 0; k < 24; k++) S.fx('tick', T.partenza + 2.0 + k * 0.22, { vel: 28 });
  S.fx('whoosh', T.partenza + 8.0, { dur: 3.0 });
  S.fx('whoosh', T.partenza + 12.2, { dur: 3.0 });
  // I fili: si accendono con un tintinnio; i colori scorrono; il primo treno passa, arriva il secondo.
  [2.2, 2.9, 3.6, 21.8, 22.5, 23.2].forEach(c => S.fx('sparkle', T.fili + c, { vel: 32 }));
  [6.4, 26.0].forEach(c => S.fx('chime', T.fili + c));
  S.fx('whoosh', T.fili + 15.0, { dur: 2.4 });
  S.fx('whoosh', T.fili + 18.4, { dur: 2.6 });
  // Gli scambi: clac, a ogni tratto.
  [3.6, 4.1, 4.8, 13.8, 14.1, 14.4, 24.0, 24.3, 24.6].forEach(c => S.fx('doubleclick', T.finestre + c - 0.35, { vel: 48 }));
  [11.0, 21.2].forEach(c => S.fx('sparkle', T.finestre + c, { vel: 30 }));
  S.fx('whoosh', T.finestre + 31.6, { dur: 4.4 });
  // Il primo treno: le paperelle blu, la pesca, la corsa al vagone nuovo, la salita.
  S.fx('whoosh', T.mare + 1.0, { dur: 1.6 });
  for (let k = 0; k < 16; k++) S.fx('pop', T.mare + 5.0 + k * 0.2, { vel: 28 + (k % 3) * 6 });
  S.fx('sparkle', T.mare + 14.7, { vel: 50 }); S.fx('chime', T.mare + 15.0);
  S.fx('whoosh', T.mare + 17.6, { dur: 1.8 });
  S.fx('boing', T.mare + 17.4, { vel: 42 });
  for (let k = 0; k < 9; k++) S.fx('woodblock', T.mare + 18.1 + k * 0.24, { vel: 26 });
  S.fx('sparkle', T.mare + 19.8, { vel: 44 }); S.fx('ding', T.mare + 20.6, { vel: 40 });
  for (let k = 0; k < 18; k++) S.fx('tick', T.mare + 22.8 + k * 0.26, { vel: 24 });
  // Il secondo treno: le paperelle verdi, la matita, il saluto di Parco.
  S.fx('whoosh', T.verde + 1.0, { dur: 1.6 });
  for (let k = 0; k < 16; k++) S.fx('pop', T.verde + 5.0 + k * 0.2, { vel: 28 + (k % 3) * 6 });
  for (let k = 0; k < 10; k++) S.fx('tick', T.verde + 12.2 + k * 0.26, { vel: 16 });
  S.fx('sparkle', T.verde + 15.0, { vel: 36 });
  S.fx('boing', T.verde + 25.4, { vel: 34 });
  // La pesca: corre; le due case.
  S.fx('sparkle', T.pesca + 4.7, { vel: 50 }); S.fx('chime', T.pesca + 5.0);
  S.fx('whoosh', T.pesca + 7.2, { dur: 1.8 });
  S.fx('boing', T.pesca + 9.4, { vel: 42 });
  for (let k = 0; k < 9; k++) S.fx('woodblock', T.pesca + 10.1 + k * 0.24, { vel: 26 });
  S.fx('sparkle', T.pesca + 12.0, { vel: 44 }); S.fx('ding', T.pesca + 12.8, { vel: 40 });
  [16.0, 17.4].forEach(c => S.fx('pop', T.pesca + c, { vel: 40 }));
  // Di nuovo: i treni ripartono, la terza casa, lo stesso giro, un'altra paperella.
  for (let k = 0; k < 14; k++) S.fx('tick', T.ancora + 1.4 + k * 0.22, { vel: 24 });
  S.fx('pop', T.ancora + 6.0, { vel: 34 });
  S.fx('whoosh', T.ancora + 8.4, { dur: 1.4 });
  [10.6, 10.9, 11.2].forEach(c => S.fx('sparkle', T.ancora + c, { vel: 32 }));
  S.fx('whoosh', T.ancora + 12.6, { dur: 1.4 });
  for (let k = 0; k < 12; k++) S.fx('pop', T.ancora + 15.2 + k * 0.1, { vel: 28 + (k % 3) * 6 });
  S.fx('sparkle', T.ancora + 19.5, { vel: 50 }); S.fx('chime', T.ancora + 19.8);
  S.fx('boing', T.ancora + 20.6, { vel: 42 });
  for (let k = 0; k < 6; k++) S.fx('woodblock', T.ancora + 21.2 + k * 0.22, { vel: 26 });
  S.fx('sparkle', T.ancora + 21.8, { vel: 44 }); S.fx('ding', T.ancora + 22.6, { vel: 40 });
  S.fx('pop', T.ancora + 23.4, { vel: 40 });
});
