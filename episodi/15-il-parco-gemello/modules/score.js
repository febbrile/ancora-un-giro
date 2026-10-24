kit.score(function (S, T) {
  // Musica originale. Il ponte e il parco di laggiù hanno lo stesso tema del parco di Ada, ma il custode tondo ha il suo
  // motivo, allegro, sulla marimba; dentro la montagna il tema di sempre; i due regolamenti si sfogliano a ritmo; i nomi
  // veri arrivano piano, uno per uno; i due treni ripartono insieme, e al cancello torna il motivo del custode di Ada.
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
  const R = (id, x) => T[id] + window.G.reale('15', id, x);
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
  // Il tema del custode di Ada: quattro note gravi. Quello del custode tondo: quattro note in su, saltellanti.
  const custode = t => S.run('keys', ['A3', 'E3', 'F3', 'E3'], { t, step: 0.5, dur: 0.6, vel: 40 });
  const gemello = t => S.run('mallet', ['G4', 'B4', 'D5', 'B4', 'G5'], { t, step: 0.22, dur: 0.3, vel: 40 });
  const giro = ['C', 'Am', 'F', 'G'], suo = ['Am', 'Dm', 'Am', 'Em'];
  const passi = (id, a, b, p) => { for (let t = a; t < b; t += p || 0.5) S.fx('woodblock', R(id, t), { vel: 12 }); };
  const uscita = (id, esce, cade, pesca) => {
    S.fx('whoosh', R(id, esce), { dur: 1.6 });
    for (let k = 0; k < 14; k++) S.fx('pop', R(id, cade[0] + k * (cade[1] - cade[0]) / 14), { vel: 24 + (k % 3) * 6 });
    if (pesca !== undefined) { S.fx('sparkle', R(id, pesca), { vel: 44 }); S.fx('chime', R(id, pesca + 0.3)); }
  };
  // Il ponte.
  sez(T.ponte, R('ponte', 8.4), ['F', 'C', 'Am', 'G'], { pad: 24, vib: 20 });
  sez(R('ponte', 8.4), R('ponte', 24.6), giro, { pad: 26, mallet: 'x...x.x.', mv: 30, bass: 40 });
  passi('ponte', 0.2, 6.4);
  S.fx('whoosh', R('ponte', 8.4), { dur: 0.6, vel: 22 });
  gemello(R('ponte', 19.0));
  // La frase di laggiù.
  sez(T.frase, R('frase', 8.2), suo, { pad: 26, vib: 22 });
  sez(R('frase', 8.2), T.finestre, giro, { pad: 28, mallet: 'x.x.X.x.', mv: 38, bass: 46 });
  S.fx('whoosh', R('frase', 0.2), { dur: 2.4, vel: 26 });
  S.fx('sparkle', R('frase', 4.2), { vel: 30 }); S.fx('chime', R('frase', 7.6));
  gemello(R('frase', 8.4));
  for (let i = 0; i < 9; i++) { S.fx('click', R('frase', 11.4 + i * 0.6), { vel: 36 }); S.fx('ding', R('frase', 12.7 + i * 0.6), { vel: 24 }); }
  S.fx('click', R('frase', 28.6), { vel: 40 }); S.fx('whoosh', R('frase', 29.2), { dur: 2.0 });
  // Dentro: la stessa montagna, lo stesso giro.
  sez(T.finestre, R('finestre', 15.0), ['Em', 'C', 'Am', 'G'], { pad: 28, vib: 24 });
  sez(R('finestre', 15.0), R('finestre', 24.4), ['Am', 'Em', 'F', 'G'], { pad: 28, box: 'x...x...', bv: 24 });
  sez(R('finestre', 24.4), T.vasca, ['C', 'Am', 'F', 'G'], { pad: 28, vib: 22, bass: 38 });
  [1.6, 2.4, 15.0, 24.4].forEach(c => S.fx('sparkle', R('finestre', c), { vel: 28 }));
  [[6.2, 0.16], [16.6, 0.13], [26.0, 0.13]].forEach(([a, p]) => { for (let i = 0; i < 9; i++) S.fx('doubleclick', R('finestre', a + i * p - 0.35), { vel: 36 }); });
  [13.0, 22.4, 31.8].forEach((c, k) => { S.fx('chime', R('finestre', c - 0.4)); S.note('vib', ['E3', 'D3', 'G2'][k], { t: R('finestre', c), dur: 2.4, vel: 28 }); });
  S.fx('whoosh', R('finestre', 38.6), { dur: 2.4 });
  // Un'altra risposta.
  sez(T.vasca, R('vasca', 13.0), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 36, bass: 44 });
  sez(R('vasca', 13.0), T.regolamento, ['Am', 'F', 'Dm', 'Em'], { pad: 24, keys: 20 });
  uscita('vasca', 0.4, [2.4, 4.4], 11.6);
  S.fx('whoosh', R('vasca', 4.6), { dur: 0.5, vel: 20 }); gemello(R('vasca', 9.0));
  S.fx('pop', R('vasca', 14.0), { vel: 40 });
  // I due regolamenti.
  sez(T.regolamento, T.piove, ['C', 'G', 'Am', 'F'], { pad: 26, mallet: 'x.x.x.x.', mv: 30, bass: 40 });
  passi('regolamento', 0.2, 2.4, 0.25); gemello(R('regolamento', 2.6));
  [3.4, 13.0, 14.6, 16.0, 16.9].forEach(c => S.fx('whoosh', R('regolamento', c - 0.2), { dur: 0.4, vel: 22 }));
  // Senza teleferica.
  sez(T.piove, R('piove', 12.4), ['Am', 'Em', 'F', 'G'], { pad: 26, mallet: 'x...x...', mv: 30, bass: 40 });
  sez(R('piove', 12.4), T.nomi, ['Am', 'F', 'Dm', 'Em'], { pad: 24, vib: 20 });
  S.fx('whoosh', R('piove', 0.2), { dur: 2.4, vel: 26 });
  uscita('piove', 3.0, [5.0, 7.0], 11.4);
  S.fx('pop', R('piove', 13.4), { vel: 40 });
  // I nomi veri: piano, una campanella per nome.
  sez(T.nomi, T.treni, ['F', 'C', 'Dm', 'G'], { pad: 24, keys: 18 });
  [10.6, 16.2, 19.4, 23.4, 28.4].forEach((c, k) => S.note('vib', ['C5', 'E5', 'G5', 'A5', 'C6'][k], { t: R('nomi', c), dur: 1.6, vel: 26 }));
  // I due treni, e il cancello.
  sez(T.treni, T.cancello, giro, { pad: 28, mallet: 'x.x.X.x.', mv: 34, bass: 44 });
  [1.0, 5.4].forEach(p => { S.fx('click', R('treni', p - 0.6), { vel: 36 }); S.fx('whoosh', R('treni', p), { dur: 2.0 }); });
  passi('treni', 10.2, 15.0);
  sez(T.cancello, R('cancello', 11.6), ['F', 'G', 'Am', 'G'], { pad: 26, keys: 22 });
  passi('cancello', 0, 2.6, 0.25); custode(R('cancello', 2.6));
  S.fx('click', R('cancello', 5.2), { vel: 30 });
  // I due cartelli: il titolo e la fine.
  [R('ponte', 24.6), R('cancello', 11.6)].forEach((a, k) => {
    S.fx('revswell', a - 0.6, { dur: 1.2 });
    S.chord('pad', C.C, { t: a, dur: 3.8, vel: 42 });
    S.chord('keys', ['C4', 'E4', 'G4', 'C5'], { t: a, dur: 3.4, vel: 44 });
    S.note('bass', 'C2', { t: a, dur: 2.6, vel: 58 });
    S.run('box', k ? ['C5', 'E5', 'G5', 'C6', 'E6', 'G6'] : ['C5', 'E5', 'G5', 'C6'], { t: a - 0.2, step: 0.12, vel: 44, cresc: 8 });
    S.fx('chime', a + 0.9);
  });
});
