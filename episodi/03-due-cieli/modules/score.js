kit.score(function (S, T) {
  const BPM = 80, B = 60 / BPM;
  S.tempo(BPM, { t0: 0 });
  S.program('pad', 'pad', { rev: 0.65, gain: -2 });
  S.program('box', 'glock', { rev: 0.5, gain: -5, pan: 0.2 });
  S.program('mallet', 'marimba', { rev: 0.3, gain: -4, pan: -0.15 });
  S.program('bass', 'bass', { gain: -4 });
  S.program('keys', 'ep', { rev: 0.4, gain: -6 });
  S.program('vib', 'vibes', { rev: 0.6, gain: -5 });
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
      if (o.mallet && len >= 4) S.pattern('mallet', o.mallet, { from: x, pitch: ARP[c], vel: o.mv || 50 });
      if (o.bass) S.note('bass', ROOT[c], { beat: x, beats: Math.min(3, len), vel: o.bass });
      if (o.vib && len >= 4) S.pattern('vib', 'x..x..x.', { from: x, pitch: ARP[c], vel: o.vib });
      if (o.keys) S.chord('keys', C[c].map(n => n.replace(/(\d)$/, d => String(+d + 1))), { beat: x, beats: Math.min(3.5, len), vel: o.keys });
    }
  }
  const giro = ['D', 'Bm', 'G', 'A'];
  sez(T.ritorno, T.sguardo, giro, { pad: 34 });
  [['A5', 1], ['F#5', 2], ['D5', 3], ['E5', 5], ['F#5', 6], ['A5', 7]].forEach(([n, b]) => S.note('box', n, { beat: b, beats: 1, vel: 42 }));
  sez(T.sguardo, T.stanze, ['G', 'D', 'Em', 'A'], { pad: 30, mallet: 'x...x...', mv: 42, bass: 48 });
  sez(T.stanze, T.corre, ['G', 'Em', 'D', 'A'], { pad: 30, mallet: 'x.x.X.x.', mv: 46 });
  sez(T.corre, T.cielo, giro, { pad: 30, mallet: 'x.x.X.x.', mv: 50, bass: 58 });
  S.drums({ kick: 'x.......', sidestick: '....x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(T.corre)), repeat: Math.max(1, Math.floor((bt(T.cielo) - bt(T.corre)) / 4)), vel: 44 });
  sez(T.cielo, T.ciclo, ['D', 'Bm', 'G', 'A'], { pad: 36, keys: 42, vib: 30, bass: 50 });
  sez(T.ciclo, T.fine, giro, { pad: 30, mallet: 'x.x.X.x.', mv: 50, bass: 56 });
  S.drums({ kick: 'x...x...', hat: 'oxoxoxox' }, { from: Math.ceil(bt(T.ciclo + 4)), repeat: Math.max(1, Math.floor((bt(T.fine) - bt(T.ciclo + 4)) / 4)), vel: 42 });
  sez(T.fine, T.numeri, ['Bm', 'G', 'A'], { pad: 30, keys: 34 });
  sez(T.numeri, T.riepilogo, ['Bm', 'Em', 'G', 'Fm'], { pad: 30, vib: 30 });
  sez(T.riepilogo, T.riepilogo + 7, ['G', 'A'], { pad: 34, keys: 40, bass: 52 });
  S.fx('revswell', T.riepilogo + 7.4, { dur: 1.4 });
  S.chord('pad', C.D, { t: T.riepilogo + 7.4, dur: 4.6, vel: 48 });
  S.chord('keys', ['D4', 'F#4', 'A4', 'D5'], { t: T.riepilogo + 7.4, dur: 4.2, vel: 52 });
  S.note('bass', 'D2', { t: T.riepilogo + 7.4, dur: 4, vel: 70 });
  S.run('box', ['D5', 'F#5', 'A5', 'D6', 'F#6'], { t: T.riepilogo + 6.8, step: 0.12, vel: 48, cresc: 10 });
  S.fx('chime', T.riepilogo + 8.4);
  // foley
  S.fx('whoosh', T.ritorno + 2.8, { dur: 0.8 }); S.fx('sparkle', T.ritorno + 6.0, { vel: 44 });
  S.fx('ding', T.sguardo + 1.0, { vel: 48 });
  [6.5, 7.6, 8.7].forEach(c => S.fx('sparkle', T.sguardo + c, { vel: 50 }));
  S.fx('roll', T.sguardo + 9.4, { dur: 0.9, vel: 40 }); S.fx('whoosh', T.sguardo + 11.0, { dur: 1.2 });
  S.fx('boing', T.stanze + 0.9, { vel: 44 }); S.fx('whoosh', T.stanze + 8.6, { dur: 1.0 });
  S.chord('vib', ['F#4', 'A4', 'C#5', 'E5'], { t: T.corre + 0.6, dur: 3, vel: 52 }); S.fx('whoosh', T.corre + 1.6, { dur: 2.6 });
  S.fx('pop', T.corre + 8.8, { vel: 56 }); S.fx('chime', T.corre + 9.6);
  for (let k = 0; k < 7; k++) S.fx('sparkle', T.cielo + 0.3 + k * 0.12, { vel: 26 });
  S.fx('pop', T.cielo + 11.2, { vel: 44 });
  [0.6, 4.8, 8.0].forEach(c => { S.fx('click', T.ciclo + c + 1.7, { vel: 56 }); S.fx('thud', T.ciclo + c + 2.4, { vel: 36 }); });
  S.fx('pop', T.fine + 2.0, { vel: 56 }); S.fx('thud', T.fine + 4.6, { vel: 50 }); S.fx('click', T.fine + 8.9, { vel: 64 }); S.fx('whoosh', T.fine + 9.1, { dur: 0.9 });
  S.fx('whoosh', T.numeri + 1.0, { dur: 2.0, into: 1 });
  for (let i = 0; i < 5; i++) S.fx('tick', T.riepilogo + 0.1 + i * 0.55, { vel: 34 });
  S.master({ gain: -6, fadeOut: 1.5 });
});
