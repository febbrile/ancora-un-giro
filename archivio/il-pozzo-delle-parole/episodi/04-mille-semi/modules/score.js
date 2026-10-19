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
  sez(T.domanda, T.direzioni, ['Bm', 'G', 'D', 'A'], { pad: 30, vib: 24 });
  [['F#5', 2, 1], ['D5', 3, 1], ['B4', 4, 2], ['A4', 7, 1], ['B4', 8, 2]].forEach(([n, b, d]) => S.note('box', n, { beat: b, beats: d, vel: 38 }));
  sez(T.direzioni, T.quarto, ['D', 'G', 'Bm', 'A'], { pad: 30, keys: 30 });
  sez(T.quarto, T.quinto, ['G', 'Em', 'D', 'A'], { pad: 30, mallet: 'x...x...', mv: 38, bass: 44 });
  sez(T.quinto, T.rotolo, ['D', 'A'], { pad: 30, mallet: 'x.x.x.x.', mv: 40 });
  sez(T.rotolo, T.rotolo + 13, ['Bm', 'Fm'], { pad: 32 });
  sez(T.rotolo + 13, T.senzanome, ['Bm', 'G', 'Em', 'Fm'], { pad: 34, vib: 30, bass: 40 });
  sez(T.senzanome, T.fine, ['G', 'D', 'Em', 'A'], { pad: 30, keys: 30 });
  sez(T.fine, T.fine + 16, ['D', 'Bm', 'G', 'D'], { pad: 36, vib: 26 });
  S.fx('revswell', T.fine + 9.6, { dur: 1.4 });
  S.chord('pad', C.D, { t: T.fine + 10.0, dur: 5.5, vel: 46 });
  S.chord('keys', ['D4', 'F#4', 'A4', 'D5'], { t: T.fine + 10.0, dur: 5.0, vel: 50 });
  S.run('box', ['D5', 'F#5', 'A5', 'D6', 'F#6'], { t: T.fine + 9.7, step: 0.12, vel: 46, cresc: 10 });
  S.fx('chime', T.fine + 11.0);
  // Rumori.
  [7.6, 8.1, 8.6].forEach(c => S.fx('sparkle', T.domanda + c, { vel: 30 }));
  const di = T.direzioni;
  [0.6, 1.2, 1.8].forEach(c => S.fx('pop', di + c, { vel: 36 }));
  for (let k = 0; k < 12; k++) S.fx('tick', di + 6.8 + k * 0.38, { vel: 24 });
  S.fx('chime', di + 11.4);
  const qu = T.quarto;
  S.fx('whoosh', qu + 3.0, { dur: 1.6 }); S.fx('whoosh', qu + 7.0, { dur: 1.4 }); S.fx('boing', qu + 9.6, { vel: 54 }); S.fx('thud', qu + 10.4, { vel: 44 });
  [15.6, 16.8, 18.0, 19.2].forEach(c => S.fx('pop', qu + c, { vel: 48 }));
  S.fx('roll', qu + 20.4, { dur: 0.8, vel: 40 }); S.fx('ding', qu + 21.3, { vel: 50 });
  const qi = T.quinto;
  [1.0, 1.6, 2.2, 2.8, 3.4].forEach(c => S.fx('pop', qi + c, { vel: 46 })); S.fx('ding', qi + 4.9, { vel: 50 });
  const ro = T.rotolo;
  S.fx('revswell', ro + 9.6, { dur: 3.0 }); S.fx('whoosh', ro + 13.0, { dur: 10.0 });
  for (let k = 0; k < 30; k++) S.fx('tick', ro + 15.0 + k * 0.35, { vel: 22 });
  S.fx('chime', ro + 25.6);
  const sn = T.senzanome;
  S.fx('whoosh', sn + 0.2, { dur: 1.2 });
  for (let k = 0; k < 12; k++) S.fx('pop', sn + 4.0 + k * 0.45, { vel: 34 });
  S.master({ gain: -6, fadeOut: 1.5 });
});
