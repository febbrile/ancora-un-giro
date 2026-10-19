kit.score(function (S, T) {
  const BPM = 76, B = 60 / BPM;
  S.tempo(BPM, { t0: 0 });
  S.program('pad', 'pad', { rev: 0.65, gain: -2 });
  S.program('box', 'glock', { rev: 0.5, gain: -5, pan: 0.2 });
  S.program('mallet', 'marimba', { rev: 0.3, gain: -4, pan: -0.15 });
  S.program('bass', 'bass', { gain: -4 });
  S.program('keys', 'ep', { rev: 0.4, gain: -6 });
  S.program('vib', 'vibes', { rev: 0.6, gain: -6 });
  const C = { D: ['D3', 'F#3', 'A3', 'D4'], Bm: ['B2', 'D3', 'F#3', 'B3'], G: ['G2', 'B2', 'D3', 'G3'], A: ['A2', 'C#3', 'E3', 'A3'], Em: ['E3', 'G3', 'B3', 'E4'], Fm: ['F#2', 'A2', 'C#3', 'F#3'] };
  const ROOT = { D: 'D2', Bm: 'B1', G: 'G1', A: 'A1', Em: 'E2', Fm: 'F#2' };
  const ARP = { D: ['D5', 'A4', 'F#4', 'A4'], Bm: ['B4', 'F#4', 'D4', 'F#4'], G: ['B4', 'G4', 'D4', 'G4'], A: ['C#5', 'A4', 'E4', 'A4'], Em: ['B4', 'G4', 'E4', 'G4'], Fm: ['C#5', 'A4', 'F#4', 'A4'] };
  const bt = t => t / B;
  // Una sezione: accordi di pad su tutta la scena, con strumenti facoltativi.
  function sez(a, b, seq, o) {
    o = o || {};
    const b0 = Math.ceil(bt(a)), b1 = Math.floor(bt(b));
    for (let x = b0, i = 0; x + 1 < b1; x += 4, i++) {
      const c = seq[i % seq.length], len = Math.min(4, b1 - x);
      S.chord('pad', C[c], { beat: x, beats: len, vel: o.pad || 32 });
      if (o.mallet && len >= 4) S.pattern('mallet', o.mallet, { from: x, pitch: ARP[c], vel: o.mv || 46 });
      if (o.bass) S.note('bass', ROOT[c], { beat: x, beats: Math.min(3, len), vel: o.bass });
      if (o.vib && len >= 4) S.pattern('vib', 'x..x..x.', { from: x, pitch: ARP[c], vel: o.vib });
      if (o.keys) S.chord('keys', C[c].map(n => n.replace(/(\d)$/, d => String(+d + 1))), { beat: x, beats: Math.min(3.5, len), vel: o.keys });
    }
  }
  const giro = ['D', 'Bm', 'G', 'A'];
  // Musica, scena per scena.
  sez(T.notte, T.spezzaparole, giro, { pad: 34 });
  [['A5', 1, 1], ['F#5', 2, 1], ['D5', 3, 2], ['E5', 5, 1], ['F#5', 6, 1], ['A5', 7, 2], ['B5', 9, 1], ['A5', 10, 1], ['F#5', 11, 2], ['E5', 13, 2]].forEach(([n, b, d]) => S.note('box', n, { beat: b, beats: d, vel: 42 }));
  sez(T.spezzaparole, T.armadio, giro, { pad: 30, mallet: 'x.x.X.x.', mv: 50, bass: 58 });
  sez(T.armadio, T.caduta, ['Bm', 'G', 'Em', 'Fm'], { pad: 30, vib: 32 });
  sez(T.caduta, T.partita, ['Bm', 'A'], { pad: 32, bass: 50 });
  sez(T.partita, T.nuovacarta, giro, { pad: 28, mallet: 'x...x...', mv: 38, bass: 48 });
  sez(T.nuovacarta, T.piani, ['G', 'D', 'Em', 'A'], { pad: 32, keys: 34 });
  sez(T.piani, T.piani + 32, ['Bm', 'G', 'D', 'A'], { pad: 30, mallet: 'x..x..x.', mv: 40, bass: 46 });
  sez(T.piani + 32, T.campane, ['Bm', 'G', 'Em', 'Fm'], { pad: 34, vib: 30 });
  sez(T.campane, T.pesca, ['Bm', 'Em', 'G', 'D'], { pad: 30, vib: 28 });
  sez(T.pesca, T.continua, ['G', 'A', 'D', 'D'], { pad: 30, keys: 32, bass: 46 });
  S.drums({ kick: 'x.......', sidestick: '....x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(T.pesca + 26)), repeat: 1, vel: 40 });
  // Finale.
  S.fx('revswell', T.continua + 0.3, { dur: 1.4 });
  S.chord('pad', C.D, { t: T.continua + 0.3, dur: 7.0, vel: 46 });
  S.chord('keys', ['D4', 'F#4', 'A4', 'D5'], { t: T.continua + 0.3, dur: 5.0, vel: 50 });
  S.note('bass', 'D2', { t: T.continua + 0.3, dur: 4, vel: 64 });
  S.run('box', ['D5', 'F#5', 'A5', 'D6', 'F#6'], { t: T.continua - 0.3, step: 0.12, vel: 46, cresc: 10 });
  S.fx('chime', T.continua + 1.3);
  // Rumori.
  const sp = T.spezzaparole;
  [4.2, 4.7].forEach(c => S.fx('click', sp + c, { vel: 52 }));
  [4.4, 4.9, 5.4].forEach(c => S.fx('pop', sp + c + 0.2, { vel: 46 }));
  [6.4, 6.55, 6.7].forEach(c => S.fx('sparkle', sp + c, { vel: 34 }));
  for (let k = 0; k < 8; k++) S.fx('tick', sp + 10.2 + k * 0.28, { vel: 26 });
  for (let k = 0; k < 10; k++) S.fx('click', sp + 18.0 + k * 0.19, { vel: 40 });
  S.fx('boing', sp + 18.9, { vel: 58 });
  const ar = T.armadio;
  [5.0, 6.2, 7.4].forEach(c => { S.fx('thud', ar + c, { vel: 40 }); S.fx('sparkle', ar + c + 0.9, { vel: 36 }); });
  S.fx('chime', ar + 9.0);
  for (let k = 0; k < 8; k++) S.fx('tick', ar + 12.0 + k * 0.2, { vel: 24 });
  S.fx('whoosh', ar + 16.0, { dur: 1.0 });
  S.fx('whoosh', T.caduta + 0.2, { dur: 3.0 });
  const pa = T.partita;
  [4.6, 7.6, 8.0, 8.4].forEach(c => S.fx('sparkle', pa + c + 0.3, { vel: 34 }));
  [17.0, 18.8, 21.0].forEach(c => S.fx('pop', pa + c, { vel: 50 }));
  S.fx('boing', pa + 21.4, { vel: 46 });
  S.fx('roll', pa + 23.6, { dur: 1.0, vel: 40 });
  S.fx('ding', pa + 24.7, { vel: 50 });
  [31.4, 34.6].forEach(g => { [0.8, 1.25, 1.7].forEach(c => S.fx('click', pa + g + c, { vel: 34 })); S.fx('ding', pa + g + 2.8, { vel: 38 }); });
  const nc = T.nuovacarta;
  S.fx('whoosh', nc + 1.4, { dur: 1.2 }); S.fx('whoosh', nc + 3.6, { dur: 1.0 });
  for (let k = 0; k < 9; k++) S.fx('tick', nc + 8.4 + k * 0.33, { vel: 28 });
  S.fx('sparkle', nc + 13.4, { vel: 50 });
  const pi = T.piani;
  [4.2, 14.4, 24.8].forEach(o => {
    for (let k = 0; k < 6; k++) S.fx('tick', pi + o - 1.4 + k * 0.25, { vel: 30 });
    S.fx('click', pi + o - 0.2, { vel: 46 });
    S.fx('whoosh', pi + o, { dur: 1.8 });
    [0, 0.12, 0.24].forEach(d => S.fx('boing', pi + o + 1.8 + d, { vel: 38 }));
  });
  [11.0, 21.4].forEach(g => S.fx('sparkle', pi + g + 0.3, { vel: 40 }));
  S.fx('revswell', pi + 32.0, { dur: 3.0 });
  [[35.2, 2.6], [38.2, 1.7], [40.2, 1.1]].forEach(([c, d]) => S.fx('whoosh', pi + c, { dur: d }));
  const ca = T.campane;
  S.chord('box', ['A5', 'C#6', 'E6'], { t: ca + 6.6, dur: 1.5, vel: 46 });
  S.chord('vib', ['F#4', 'A4', 'C#5', 'E5'], { t: ca + 7.2, dur: 3, vel: 50 });
  S.fx('whoosh', ca + 10.4, { dur: 3.2 });
  [17.2, 18.9, 20.6].forEach(c => S.fx('sparkle', ca + c, { vel: 48 }));
  S.fx('thud', ca + 22.0, { vel: 46 }); S.fx('chime', ca + 23.4);
  const pe = T.pesca;
  for (let k = 0; k < 20; k++) S.fx('tick', pe + 1.35 + k * 0.17, { vel: 26 });
  S.fx('roll', pe + 7.0, { dur: 2.2, vel: 40 });
  S.fx('thud', pe + 11.4, { vel: 48 });
  S.fx('pop', pe + 19.0, { vel: 56 }); S.fx('chime', pe + 21.2);
  S.master({ gain: -6, fadeOut: 1.5 });
});
