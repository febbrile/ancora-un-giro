kit.score(function (S, T) {
  // Musica originale. L'indovinello e l'attesa, sospesi; il telone ha il suo motivo, un po' misterioso, sul vibrafono
  // in minore, che torna ogni volta che il custode lo stende o lo arrotola; dentro la montagna il tema di sempre, che si
  // fa grigio; la risposta giusta e quella sbagliata con la stessa musica, tranquilla; il fiume, piano.
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
  const R = (id, x) => T[id] + window.G.reale('14', id, x);
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
  const telone = t => S.run('vib', ['A4', 'C5', 'E5', 'D5', 'C5'], { t, step: 0.28, dur: 0.5, vel: 30 });
  const uscita = (id, esce, cade, pesca, salta, sale) => {
    S.fx('whoosh', R(id, esce), { dur: 1.6 });
    for (let k = 0; k < 14; k++) S.fx('pop', R(id, cade[0] + k * (cade[1] - cade[0]) / 14), { vel: 24 + (k % 3) * 6 });
    if (pesca !== undefined) { S.fx('sparkle', R(id, pesca), { vel: 44 }); S.fx('chime', R(id, pesca + 0.3)); }
    if (salta !== undefined) { S.fx('boing', R(id, salta), { vel: 38 }); for (let k = 0; k < 4; k++) S.fx('woodblock', R(id, salta + 0.4 + k * 0.18), { vel: 22 }); }
    if (sale !== undefined) S.fx('ding', R(id, sale), { vel: 36 });
  };
  // La domanda.
  sez(T.domanda, R('domanda', 8.4), ['Am', 'F', 'C', 'G'], { pad: 24, keys: 20 });
  sez(R('domanda', 8.4), R('domanda', 24.0), ['Am', 'Em', 'Am', 'Dm'], { pad: 26, mallet: 'x...x...', mv: 28 });
  for (let t = 0.8; t < 7.4; t += 0.2) S.fx('tick', R('domanda', t), { vel: 12 });
  S.fx('click', R('domanda', 7.6), { vel: 40 });
  for (let k = 0; k < 4; k++) S.fx('whoosh', R('domanda', 9.0 + k * 1.6), { dur: 1.0, vel: 18 });
  // Il telone.
  sez(T.telone, R('telone', 13.0), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 38, bass: 46 });
  sez(R('telone', 13.0), T.sotto, suo, { pad: 26, vib: 22, bass: 38 });
  telone(R('telone', 15.4)); custode(R('telone', 22.0));
  uscita('telone', 3.2, [5.6, 8.0], 9.0, 9.8, 10.8);
  S.fx('whoosh', R('telone', 15.4), { dur: 2.2, vel: 24 });
  // Sotto il telone.
  sez(T.sotto, T.finestre, giro, { pad: 28, mallet: 'xxx.X.x.', mv: 40, box: 'x...x...', bv: 24, bass: 48 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('sotto', 0.4))), repeat: 6, vel: 28 });
  [0.4, 10.2, 20.0].forEach(a => { uscita('sotto', a, [a + 2.0, a + 4.6], a + 5.6, a + 6.2, a + 7.2); telone(R('sotto', a + 7.6)); });
  for (let k = 0; k < 6; k++) S.fx('tick', R('sotto', 28.8 + k * 0.3), { vel: 12 });
  S.fx('whoosh', R('sotto', 33.0), { dur: 1.2, vel: 22 }); S.note('vib', 'E5', { t: R('sotto', 34.0), dur: 1.6, vel: 30 });
  // Dentro.
  sez(T.finestre, R('finestre', 15.0), ['Em', 'C', 'Am', 'G'], { pad: 28, vib: 24 });
  sez(R('finestre', 15.0), R('finestre', 24.4), ['Am', 'Em', 'F', 'G'], { pad: 28, box: 'x...x...', bv: 24 });
  sez(R('finestre', 24.4), T.risposta, ['Em', 'Am', 'Em', 'Am'], { pad: 28, vib: 22, bass: 38 });
  [1.6, 2.4, 15.0, 24.4].forEach(c => S.fx('sparkle', R('finestre', c), { vel: 28 }));
  [[6.2, 0.06], [16.6, 0.05], [26.0, 0.05]].forEach(([a, p]) => { for (let i = 0; i < 23; i++) S.fx('doubleclick', R('finestre', a + i * p - 0.35), { vel: 36 }); });
  [13.0, 22.4, 31.8].forEach((c, k) => { S.fx('chime', R('finestre', c - 0.4)); S.note('vib', ['E3', 'D3', 'A2'][k], { t: R('finestre', c), dur: 2.4, vel: 28 }); });
  S.fx('whoosh', R('finestre', 38.6), { dur: 2.4 });
  // Al.
  sez(T.risposta, R('risposta', 19.4), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 36, bass: 44 });
  sez(R('risposta', 19.4), T.sbagliata, ['C', 'F', 'G', 'C'], { pad: 26, keys: 22 });
  uscita('risposta', 0.4, [3.4, 5.9], 7.0, 7.6, 8.6); uscita('risposta', 9.6, [12.8, 15.4], 16.6);
  S.fx('click', R('risposta', 17.8), { vel: 40 }); S.fx('pop', R('risposta', 20.4), { vel: 40 }); S.fx('boing', R('risposta', 21.2), { vel: 26 });
  // La paperella sbagliata: la stessa musica, tranquilla.
  sez(T.sbagliata, R('sbagliata', 33.0), giro, { pad: 28, mallet: 'xxx.X.x.', mv: 40, bass: 46 });
  sez(R('sbagliata', 33.0), T.campanella, ['Am', 'F', 'Dm', 'Em'], { pad: 24, keys: 20 });
  [3.6, 10.8, 18.0, 25.2].forEach(a => uscita('sbagliata', a, [a + 2.0, a + 3.8], a + 4.6, a + 5.2, a + 6.2));
  S.fx('pop', R('sbagliata', 33.8), { vel: 40 });
  [37.0, 37.5].forEach(c => S.fx('whoosh', R('sbagliata', c), { dur: 0.5, vel: 22 }));
  // Il telone a metà.
  sez(T.campanella, R('campanella', 10.4), suo, { pad: 26, keys: 22, bass: 38 });
  S.fx('chime', R('campanella', 3.6)); S.run('box', ['E6', 'G6', 'E6', 'G6', 'E6', 'G6'], { t: R('campanella', 3.6), step: 0.07, vel: 40, cresc: -4 });
  telone(R('campanella', 6.0)); S.fx('sparkle', R('campanella', 8.0), { vel: 34 });
  sez(R('campanella', 10.4), T.fiume, giro, { pad: 26, mallet: 'x...x.x.', mv: 32, bass: 42 });
  uscita('campanella', 10.6, [12.8, 15.0], 16.2);
  S.fx('pop', R('campanella', 19.6), { vel: 40 });
  // Il fiume: piano, e le luci dell'altra riva.
  sez(T.fiume, R('fiume', 18.4), ['F', 'C', 'Am', 'G'], { pad: 24, vib: 20 });
  for (let k = 0; k < 10; k++) S.fx('woodblock', R('fiume', 0.3 + k * 0.5), { vel: 12 });
  for (let k = 0; k < 8; k++) S.note('box', ['C6', 'E6', 'G6', 'C7', 'G6', 'E6', 'G6', 'C7'][k], { t: R('fiume', 5.8 + k * 0.4), dur: 0.3, vel: 24 });
  // I due cartelli: il titolo e la fine.
  [R('domanda', 24.0), R('fiume', 18.4)].forEach((a, k) => {
    S.fx('revswell', a - 0.6, { dur: 1.2 });
    S.chord('pad', C.C, { t: a, dur: 3.8, vel: 42 });
    S.chord('keys', ['C4', 'E4', 'G4', 'C5'], { t: a, dur: 3.4, vel: 44 });
    S.note('bass', 'C2', { t: a, dur: 2.6, vel: 58 });
    S.run('box', k ? ['C5', 'E5', 'G5', 'C6', 'E6', 'G6'] : ['C5', 'E5', 'G5', 'C6'], { t: a - 0.2, step: 0.12, vel: 44, cresc: 8 });
    S.fx('chime', a + 0.9);
  });
});
