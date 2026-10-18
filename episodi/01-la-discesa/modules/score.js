kit.score(function (S, T) {
  const BPM = 80, B = 60 / BPM;
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
  const giro = ['D', 'Bm', 'G', 'A'];
  const beatOf = t => t / B;
  function pads(from, to, seq, vel) {
    for (let b = from, i = 0; b < to - 0.5; b += 4, i++) S.chord('pad', C[seq[i % seq.length]], { beat: b, beats: Math.min(4, to - b), vel });
  }
  // Intro: notte + esperimento
  pads(0, beatOf(T.forbice), giro, 34);
  [['A5', 1, 1], ['F#5', 2, 1], ['D5', 3, 2], ['E5', 5, 1], ['F#5', 6, 1], ['A5', 7, 2], ['B5', 9, 1], ['A5', 10, 1], ['F#5', 11, 2], ['E5', 13, 2]].forEach(([n, b, d]) => S.note('box', n, { beat: b, beats: d, vel: 44 }));
  for (let b = Math.ceil(beatOf(T.esperimento)), i = 0; b < beatOf(T.forbice) - 1; b += 4, i++) S.pattern('mallet', 'x...x.x.', { from: b, pitch: ARP[giro[i % 4]], vel: 40 });
  // Groove: forbice, lettere, gag
  const g0 = Math.ceil(beatOf(T.forbice)), g1 = Math.floor(beatOf(T.armadio));
  pads(g0, g1, giro, 30);
  for (let b = g0, i = 0; b + 4 <= g1; b += 4, i++) {
    const c = giro[i % 4];
    S.pattern('mallet', 'x.x.X.x.', { from: b, pitch: ARP[c], vel: 58 });
    S.note('bass', ROOT[c], { beat: b, beats: 1.5, vel: 70 });
    S.note('bass', ROOT[c], { beat: b + 2.5, beats: 1, vel: 56 });
  }
  S.drums({ kick: 'x.......', sidestick: '....x...', shaker: 'oxoxoxox' }, { from: g0 + 4, repeat: Math.floor((g1 - g0 - 4) / 4), vel: 52 });
  // Armadio + identiche: luminoso
  const a0 = Math.ceil(beatOf(T.armadio)), a1 = Math.floor(beatOf(T.attesa));
  pads(a0, a1, ['G', 'D', 'Em', 'A'], 34);
  for (let b = a0, i = 0; b + 4 <= a1; b += 4, i++) {
    const c = ['G', 'D', 'Em', 'A'][i % 4];
    S.chord('keys', C[c].map(n => n.replace(/(\d)$/, d => String(+d + 1))), { beat: b, beats: 3.5, vel: 40 });
    S.pattern('box', 'x...x...', { from: b, pitch: [ARP[c][0], ARP[c][2]], vel: 34 });
    S.note('bass', ROOT[c], { beat: b, beats: 3, vel: 54 });
  }
  // Attesa: solo pad
  pads(a1, Math.floor(beatOf(T.caduta)), ['A'], 30);
  // Caduta
  const c0 = Math.ceil(beatOf(T.caduta)), c1 = Math.floor(beatOf(T.nomi));
  pads(c0, c1, ['Bm', 'G', 'A'], 32);
  S.note('bass', 'B1', { beat: c0, beats: c1 - c0, vel: 50 });
  S.drums({ kick: 'x...x...', hat: '..o...o.' }, { from: c0, repeat: Math.floor((c1 - c0) / 4), vel: 50 });
  for (let k = 0; k < 4; k++) S.run('box', ['B6', 'A6', 'F#6', 'E6', 'D6', 'B5', 'A5', 'F#5'], { t: T.caduta + 0.8 + k * 1.9, step: 0.11, vel: 40, cresc: -10 });
  S.fx('whoosh', T.caduta + 0.1, { dur: 1.4 });
  // Nomi + periscopio: misterioso
  const n0 = Math.ceil(beatOf(T.nomi)), n1 = Math.floor(beatOf(T.continua));
  pads(n0, n1, ['Bm', 'Em', 'G', 'Fm'], 32);
  for (let b = n0 + 2, i = 0; b + 4 <= n1; b += 4, i++) S.pattern('vib', 'x..x..x.', { from: b, pitch: ARP[['Bm', 'Em', 'G', 'Fm'][i % 4]], vel: 36 });
  // Continua
  S.fx('revswell', T.continua + 0.3, { dur: 1.4 });
  S.chord('pad', C.D, { t: T.continua + 0.3, dur: 5.4, vel: 46 });
  S.chord('keys', ['D4', 'F#4', 'A4', 'D5'], { t: T.continua + 0.3, dur: 4.5, vel: 52 });
  S.note('bass', 'D2', { t: T.continua + 0.3, dur: 4, vel: 70 });
  S.run('box', ['D5', 'F#5', 'A5', 'D6', 'F#6'], { t: T.continua - 0.3, step: 0.12, vel: 48, cresc: 10 });
  S.fx('chime', T.continua + 1.3);
  // Foley
  const tk = (t0, n, cps) => Array.from({ length: n }, (_, k) => t0 + k / cps);
  S.ticks(tk(T.notte + 5.2, 12, 9), { vel: 26 });
  S.ticks(tk(T.esperimento + 0.7, 12, 11).concat(tk(T.esperimento + 2.4, 13, 11)), { vel: 26 });
  S.ticks(tk(T.periscopio + 3.6, 21, 14), { vel: 24 });
  [3.0, 3.55].forEach(c => S.fx('click', T.forbice + c, { vel: 70 }));
  [3.3, 3.85, 4.35].forEach(c => S.fx('pop', T.forbice + c, { vel: 55 }));
  [2.0, 2.25, 2.5].forEach(c => S.fx('pop', T.lettere + c, { vel: 45 }));
  for (let j = 0; j < 3; j++) for (let k = 0; k < 4; k++) S.fx('tick', T.lettere + 5.9 + j * 0.55 + k * 0.13, { vel: 22 });
  for (let k = 0; k < 8; k++) S.fx('pop', T.gag + 2.05 + k * 0.24, { vel: 40, pitch: k % 3 });
  S.fx('boing', T.gag + 2.75, { vel: 60 });
  for (let j = 0; j < 3; j++) { S.fx('thud', T.armadio + 0.8 + j * 0.7, { vel: 40 }); S.fx('sparkle', T.armadio + 2.1 + j * 0.7, { vel: 40 }); }
  S.fx('pop', T.armadio + 8.0, { vel: 40 }); S.fx('pop', T.armadio + 8.3, { vel: 40 });
  [1.5, 2.0, 2.5, 3.0].forEach(c => S.fx('pop', T.identiche + c, { vel: 38 }));
  S.fx('pop', T.identiche + 5.6, { vel: 52 }); S.fx('pop', T.identiche + 10.5, { vel: 52 }); S.fx('ding', T.identiche + 10.95, { vel: 62 });
  S.fx('whoosh', T.attesa + 1.6, { dur: 1.2 });
  [1.3, 1.6, 1.8].forEach(c => S.fx('boing', T.nomi + c, { vel: 45 }));
  for (let i = 0; i < 4; i++) S.fx('pop', T.periscopio + 2.2 + i * 0.25, { vel: 36 });
  S.master({ gain: -6, fadeOut: 1.5 });
});
