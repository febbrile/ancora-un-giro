kit.score(function (S, T) {
  // Musica originale. Le camerette, piano; il tema del custode (quattro note gravi) quando entra lui; il Bruco ha il suo
  // carillon, piccolo e svelto, sul glockenspiel: allegro quando esce verde, in minore quando esce rosso, e la sbarra fa
  // clonc. Dentro la montagna il tema sospeso di sempre. Alla fine la vasca di tutti i colori, e una domanda.
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
  const R = (id, x) => T[id] + window.G.reale('11', id, x);
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
  // Il carillon del Bruco: un giro di glockenspiel, verde (maggiore) o rosso (minore).
  const carillon = (a, b, rosso) => { for (let t = a; t < b - 0.2; t += 0.24) S.note('box', (rosso ? ['A5', 'C6', 'E6', 'C6'] : ['C6', 'E6', 'G6', 'E6'])[Math.round((t - a) / 0.24) % 4], { t, dur: 0.2, vel: 30 }); };
  // La domanda.
  sez(T.domanda, R('domanda', 5.6), ['Am', 'F', 'C', 'G'], { pad: 24, keys: 20 });
  sez(R('domanda', 5.6), R('domanda', 13.4), suo, { pad: 28, keys: 22, bass: 40 });
  custode(R('domanda', 6.6));
  sez(R('domanda', 13.4), R('domanda', 21.6), ['Am', 'Dm', 'F', 'Em'], { pad: 24, vib: 20 });
  // Il Bruco: il custode accende la giostrina.
  sez(T.bruco, R('bruco', 6.4), suo, { pad: 26, keys: 22, bass: 38 });
  sez(R('bruco', 6.4), T.rosso, giro, { pad: 28, box: 'x.x.x.x.', bv: 26, mallet: 'x...x...', mv: 30 });
  // Rosso.
  sez(T.rosso, R('rosso', 11.0), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 36, bass: 44 });
  carillon(R('rosso', 5.0), R('rosso', 11.0), false);
  sez(R('rosso', 11.0), T.grande, ['Am', 'Dm', 'Am', 'Em'], { pad: 28, keys: 22, bass: 40 });
  // Non l'ha mai vista: la montagna grande, in silenzio; il tema del custode.
  sez(T.grande, R('grande', 8.0), ['Em', 'C', 'Am', 'Em'], { pad: 22 });
  sez(R('grande', 8.0), T.verde, suo, { pad: 26, keys: 22, bass: 38 });
  custode(R('grande', 11.2));
  // Verde, e il treno grande parte.
  sez(T.verde, R('verde', 12.0), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 38, bass: 46 });
  carillon(R('verde', 3.8), R('verde', 8.8), false);
  sez(R('verde', 12.0), T.finestre, giro, { pad: 30, mallet: 'xxx.X.x.', mv: 42, box: 'x...x...', bv: 26, bass: 50 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('verde', 15.0))), repeat: 3, vel: 30 });
  // Dentro.
  sez(T.finestre, R('finestre', 15.0), ['Em', 'C', 'Am', 'G'], { pad: 28, vib: 24 });
  sez(R('finestre', 15.0), R('finestre', 24.4), ['C', 'Am', 'F', 'G'], { pad: 28, box: 'x...x...', bv: 26 });
  sez(R('finestre', 24.4), T.risposta, ['F', 'C', 'G', 'C'], { pad: 30, vib: 22, bass: 40 });
  // Anche la risposta.
  sez(T.risposta, R('risposta', 10.8), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 38, bass: 46 });
  carillon(R('risposta', 13.2), R('risposta', 17.8), false);
  sez(R('risposta', 10.8), T.lupo, giro, { pad: 28, box: 'x.x.x.x.', bv: 24, bass: 42 });
  // Il lupo.
  sez(T.lupo, R('lupo', 6.0), ['Am', 'F', 'C', 'G'], { pad: 24, keys: 22 });
  carillon(R('lupo', 10.0), R('lupo', 15.0), true);
  sez(R('lupo', 6.0), R('lupo', 16.8), ['Am', 'Dm', 'Am', 'Em'], { pad: 26, mallet: 'x...x...', mv: 30, bass: 40 });
  sez(R('lupo', 16.8), T.piove, suo, { pad: 26, keys: 22, bass: 38 });
  custode(R('lupo', 24.4));
  // Tutti i colori.
  carillon(R('piove', 1.4), R('piove', 4.6), false);
  sez(T.piove, R('piove', 17.6), ['C', 'Am', 'Dm', 'G'], { pad: 26, vib: 22, bass: 40 });
  // La coda sul quaderno: solo il pad, piano, sotto la voce.
  sez(R('coda', 1.0), R('coda', 43.0), ['C', 'Am', 'F', 'G'], { pad: 22, keys: 18 });
  // I due cartelli: il titolo e la fine.
  [R('domanda', 21.6), R('piove', 17.6)].forEach((a, k) => {
    S.fx('revswell', a - 0.6, { dur: 1.2 });
    S.chord('pad', C.C, { t: a, dur: 3.8, vel: 42 });
    S.chord('keys', ['C4', 'E4', 'G4', 'C5'], { t: a, dur: 3.4, vel: 44 });
    S.note('bass', 'C2', { t: a, dur: 2.6, vel: 58 });
    S.run('box', k ? ['C5', 'E5', 'G5', 'C6', 'E6', 'G6'] : ['C5', 'E5', 'G5', 'C6'], { t: a - 0.2, step: 0.12, vel: 44, cresc: 8 });
    S.fx('chime', a + 0.9);
  });

  // ── Rumori ─────────────────────────────────────────────────────────────────────────────────────────
  const scrive = (id, a, b, invio) => { for (let t = a; t < b; t += 0.22) S.fx('tick', R(id, t), { vel: 14 }); S.fx('click', R(id, invio), { vel: 40 }); S.fx('whoosh', R(id, invio + 0.15), { dur: 0.6, vel: 30 }); };
  // Un giro sul Bruco: i biglietti che salgono, la corsa, la mela, le paperelle nella vasca piccola.
  const bruco = (id, sale, passo, n, parte, giro, cade) => {
    for (let k = 0; k < n; k++) { S.fx('pop', R(id, sale + k * passo + 0.8), { vel: 30 }); S.fx('ding', R(id, sale + k * passo + 0.9), { vel: 20, pitch: 'E6' }); }
    S.fx('whoosh', R(id, parte), { dur: 1.0, vel: 28 });
    for (let k = 0; k < 8; k++) S.fx('woodblock', R(id, parte + 0.3 + k * giro / 10), { vel: 16 });
    S.fx('whoosh', R(id, parte + giro * 0.45), { dur: 0.6, vel: 22 });
    for (let k = 0; k < 10; k++) S.fx('pop', R(id, cade[0] + k * (cade[1] - cade[0]) / 10), { vel: 18 + (k % 3) * 4 });
  };
  const clonc = (id, t) => { S.fx('thud', R(id, t), { vel: 60 }); S.fx('woodblock', R(id, t + 0.02), { vel: 44 }); };
  const uscita = (id, esce, cade, pesca, salta, sale) => {
    S.fx('whoosh', R(id, esce), { dur: 1.6 });
    for (let k = 0; k < 14; k++) S.fx('pop', R(id, cade[0] + k * (cade[1] - cade[0]) / 14), { vel: 24 + (k % 3) * 6 });
    if (pesca !== undefined) { S.fx('sparkle', R(id, pesca), { vel: 44 }); S.fx('chime', R(id, pesca + 0.3)); }
    if (salta !== undefined) { S.fx('boing', R(id, salta), { vel: 38 }); for (let k = 0; k < 4; k++) S.fx('woodblock', R(id, salta + 0.4 + k * 0.18), { vel: 22 }); }
    if (sale !== undefined) S.fx('ding', R(id, sale), { vel: 36 });
  };
  // La domanda.
  scrive('domanda', 1.0, 4.8, 5.0);
  S.fx('whoosh', R('domanda', 6.2), { dur: 1.8 }); S.fx('pop', R('domanda', 8.0), { vel: 34 });
  [8.8, 9.4, 10.0].forEach(c => { S.fx('click', R('domanda', c), { vel: 52 }); S.fx('doubleclick', R('domanda', c + 0.05), { vel: 34 }); });
  for (let k = 0; k < 5; k++) S.fx('woodblock', R('domanda', 11.2 + k * 0.5), { vel: 16 });
  S.fx('pop', R('domanda', 14.6), { vel: 40 });
  S.fx('thud', R('domanda', 15.9), { vel: 26 });
  // Il Bruco: i passi, la lanterna, le luci.
  for (let k = 0; k < 10; k++) S.fx('woodblock', R('bruco', 0.6 + k * 0.48), { vel: 14 });
  S.fx('sparkle', R('bruco', 6.4), { vel: 40 }); S.fx('chime', R('bruco', 6.8));
  // Rosso.
  bruco('rosso', 0.8, 0.9, 3, 5.0, 6.0, [9.4, 10.8]);
  for (let k = 0; k < 6; k++) S.fx('tick', R('rosso', 12.5 + k * 0.36), { vel: 24 });
  clonc('rosso', 15.2);
  S.fx('whoosh', R('rosso', 16.0), { dur: 0.4, vel: 22 });
  S.fx('whoosh', R('rosso', 17.8), { dur: 2.6, vel: 30 });
  S.fx('whoosh', R('rosso', 19.4), { dur: 2.0, vel: 24 });
  // Non l'ha mai vista.
  S.fx('whoosh', R('grande', 1.4), { dur: 2.6, vel: 22 });
  S.fx('thud', R('grande', 9.4), { vel: 24 });
  // Verde, e il treno grande parte.
  for (let k = 0; k < 4; k++) S.fx('click', R('verde', 0.6 + k * 0.2), { vel: 26 });
  bruco('verde', 1.9, 0.55, 3, 3.8, 5.0, [7.0, 8.4]);
  S.fx('whoosh', R('verde', 10.4), { dur: 0.8, vel: 24 });
  [12.5, 13.0, 13.4].forEach(c => { S.fx('click', R('verde', c), { vel: 40 }); S.fx('sparkle', R('verde', c + 0.05), { vel: 28 }); });
  for (let i = 0; i < 9; i++) { const c = 15.0 + i * 0.42; S.fx('click', R('verde', c), { vel: 50 }); S.fx('pop', R('verde', c + 0.1), { vel: 34 }); S.fx('ding', R('verde', c + 1.3), { vel: 18 }); }
  for (let k = 0; k < 9; k++) S.fx('click', R('verde', 20.6 + k * 0.06), { vel: 28 });
  S.fx('whoosh', R('verde', 21.4), { dur: 2.0 });
  // Dentro.
  [1.6, 2.4, 3.4].forEach(c => S.fx('sparkle', R('finestre', c), { vel: 30 }));
  [[6.2, 0.16], [16.6, 0.13], [26.0, 0.13]].forEach(([a, p]) => { for (let i = 0; i < 9; i++) S.fx('doubleclick', R('finestre', a + i * p - 0.35), { vel: 44 }); });
  [13.0, 22.4, 31.8].forEach((c, k) => { S.fx('chime', R('finestre', c - 0.4)); S.note('vib', ['E3', 'G3', 'C4'][k], { t: R('finestre', c), dur: 2.4, vel: 30 }); });
  S.fx('whoosh', R('finestre', 38.6), { dur: 2.4 });
  // Anche la risposta.
  uscita('risposta', 0.4, [2.4, 4.2], 5.4, 6.2, 7.4);
  for (let k = 0; k < 6; k++) S.fx('woodblock', R('risposta', 8.6 + k * 0.36), { vel: 14 });
  bruco('risposta', 11.0, 0.5, 4, 13.2, 4.6, [15.8, 17.0]);
  S.fx('whoosh', R('risposta', 20.2), { dur: 2.0, vel: 28 });
  S.fx('pop', R('risposta', 23.2), { vel: 40 });
  // Il lupo.
  scrive('lupo', 0.8, 5.0, 5.2);
  bruco('lupo', 6.8, 0.5, 5, 10.0, 5.0, [13.2, 14.6]);
  clonc('lupo', 16.0);
  S.fx('pop', R('lupo', 18.0), { vel: 40 });
  S.fx('whoosh', R('lupo', 18.8), { dur: 0.6, vel: 20 });
  for (let k = 0; k < 4; k++) S.fx('tick', R('lupo', 20.0 + k * 0.2), { vel: 22 });
  S.fx('boing', R('lupo', 21.8), { vel: 22 });
  // Tutti i colori.
  bruco('piove', 0.3, 0.3, 3, 1.4, 3.2, [3.4, 4.4]);
  uscita('piove', 5.6, [7.6, 9.6]);
  S.note('vib', 'A3', { t: R('piove', 11.6), dur: 2.4, vel: 28 });
  // La matita della coda: un tratto ogni mezzo secondo, per ogni schizzo.
  [[1.4, 3], [11.6, 2], [22.2, 2], [31.6, 2]].forEach(([a, n]) => { for (let k = 0; k < n * 2; k++) S.fx('tick', R('coda', a + k * 0.25), { vel: 14 }); });
});
