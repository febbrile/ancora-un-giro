kit.score(function (S, T) {
  // Musica originale: il valzerino del luna park fuori dalla montagna, un tema più raccolto quando il treno resta vuoto
  // e quando i biglietti restano giù; dentro, il tema sospeso che si apre piano.
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
  // I tempi dentro una scena sono interni: R li porta al tempo vero (vedi il ritmo in shared.js).
  const R = (id, x) => T[id] + window.G.reale('04', id, x);
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
  const giro = ['C', 'Am', 'F', 'G'], vuoto = ['Am', 'F', 'Dm', 'G'];
  // Il treno vuoto: arriva col valzerino, poi il tema raccolto; il titolo.
  sez(T.vuoto, R('vuoto', 4.2), giro, { pad: 28, mallet: 'x...x.x.', mv: 34 });
  sez(R('vuoto', 4.2), R('vuoto', 9.2), ['F', 'C', 'Am', 'G'], { pad: 26, keys: 24 });
  sez(R('vuoto', 9.2), R('vuoto', 21.6), vuoto, { pad: 28, vib: 22 });
  // La striscia: il salotto, il cielo, la stazione.
  sez(T.striscia, R('striscia', 5.6), ['F', 'C', 'Am', 'G'], { pad: 26, vib: 24 });
  sez(R('striscia', 5.6), R('striscia', 11.6), ['F', 'G', 'Em', 'Am'], { pad: 30, box: 'x.x.x.x.', bv: 28 });
  sez(R('striscia', 11.6), T.banchina, giro, { pad: 28, mallet: 'x...x.x.', mv: 36, bass: 46 });
  // Risalgono tutti: il valzerino pieno; la banchina.
  sez(T.banchina, R('banchina', 19.6), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 42, bass: 52 });
  sez(R('banchina', 19.6), T.fili, ['F', 'C', 'Dm', 'G'], { pad: 28, keys: 26 });
  // La partenza, poi dentro: sospeso, sempre più aperto.
  sez(T.fili, R('fili', 9.4), ['Am', 'Am', 'F', 'G'], { pad: 30, bass: 44 });
  sez(R('fili', 9.4), R('fili', 19.8), ['Em', 'C', 'Am', 'G'], { pad: 28, vib: 26 });
  sez(R('fili', 19.8), T.finestre, ['Em', 'C', 'F', 'G'], { pad: 30, vib: 28 });
  sez(T.finestre, R('finestre', 38.8), ['F', 'G', 'C', 'Am'], { pad: 30, box: 'x.x.x.x.', bv: 30, mallet: 'x...x...', mv: 32, bass: 42 });
  sez(R('finestre', 38.8), T.pesca, ['F', 'G', 'C', 'C'], { pad: 36, keys: 32 });
  // Fuori: la vasca, la pesca, l'ultimo posto; il telefono.
  sez(T.pesca, R('pesca', 10.2), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 40, bass: 50 });
  sez(R('pesca', 10.2), R('pesca', 20.0), ['F', 'C', 'Dm', 'G'], { pad: 28, keys: 28, box: 'x...x...', bv: 28 });
  sez(R('pesca', 20.0), T.giu, ['Am', 'Em', 'F', 'G'], { pad: 30, vib: 24 });
  // Troppo lunga: il vento, il salotto, la striscia, i due biglietti che restano giù.
  sez(T.giu, R('giu', 5.4), vuoto, { pad: 28, vib: 22 });
  sez(R('giu', 5.4), R('giu', 10.6), ['F', 'C', 'Am', 'G'], { pad: 26, keys: 24 });
  sez(R('giu', 10.6), R('giu', 23.4), giro, { pad: 28, box: 'x.x.x.x.', bv: 30, bass: 48 });
  sez(R('giu', 23.4), T.pista, vuoto, { pad: 30, keys: 26 });
  // La pista: Ada e i due biglietti, il treno nella montagna, la domanda; la fine.
  sez(T.pista, R('pista', 19.8), ['Am', 'F', 'C', 'G'], { pad: 28, vib: 24 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('banchina', 1.2))), repeat: 4, vel: 30 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('pesca', 1.0))), repeat: 3, vel: 28 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('giu', 16.0))), repeat: 3, vel: 28 });
  // I due cartelli: il titolo e la fine.
  [R('vuoto', 21.6), R('pista', 19.8)].forEach((a, k) => {
    S.fx('revswell', a - 0.6, { dur: 1.2 });
    S.chord('pad', C.C, { t: a, dur: 3.8, vel: 42 });
    S.chord('keys', ['C4', 'E4', 'G4', 'C5'], { t: a, dur: 3.4, vel: 44 });
    S.note('bass', 'C2', { t: a, dur: 2.6, vel: 58 });
    S.run('box', k ? ['C5', 'E5', 'G5', 'C6', 'E6', 'G6'] : ['C5', 'E5', 'G5', 'C6'], { t: a - 0.2, step: 0.12, vel: 44, cresc: 8 });
    S.fx('chime', a + 0.9);
  });

  // ── Rumori ─────────────────────────────────────────────────────────────────────────────────────────
  // Il treno vuoto: arriva, la risposta sul telefono, le sbarre, i biglietti di carta e il vento, i passi di Ada.
  for (let k = 0; k < 10; k++) S.fx('tick', R('vuoto', 0.2 + k * 0.38), { vel: 22 - k });
  S.fx('ding', R('vuoto', 5.0), { vel: 30 });
  for (let k = 0; k < 4; k++) S.fx('click', R('vuoto', 9.5 + k * 0.15), { vel: 34 });
  for (let k = 0; k < 4; k++) { S.fx('pop', R('vuoto', 10.4 + k * 0.3), { vel: 32 }); S.fx('sparkle', R('vuoto', 10.5 + k * 0.3), { vel: 22 }); }
  [11.4, 12.2].forEach(c => S.fx('whoosh', R('vuoto', c), { dur: 2.6 }));
  for (let k = 0; k < 12; k++) S.fx('woodblock', R('vuoto', 14.9 + k * 0.31), { vel: 16 });
  // La striscia: si scrive, invio; la striscia vola via, scende alla stazione; Ada la prende e legge.
  for (let k = 0; k < 8; k++) S.fx('tick', R('striscia', 1.0 + k * 0.26), { vel: 18 });
  S.fx('click', R('striscia', 3.5), { vel: 46 });
  S.fx('sparkle', R('striscia', 4.0), { vel: 34 });
  [5.6, 8.2].forEach(c => S.fx('whoosh', R('striscia', c), { dur: 2.8 }));
  S.fx('whoosh', R('striscia', 11.8), { dur: 2.6 });
  S.fx('boing', R('striscia', 14.3), { vel: 38 });
  for (let k = 0; k < 14; k++) S.fx('woodblock', R('striscia', 15.3 + k * 0.31), { vel: 16 });
  for (let k = 0; k < 6; k++) S.fx('ding', R('striscia', 15.6 + k * 0.72), { vel: 16, pitch: ['C6', 'D6', 'E6', 'G6', 'A6', 'C7'][k] });
  // Risalgono tutti: la striscia nella fessura, zac zac, i biglietti, i passeggeri, le sbarre della banchina.
  S.fx('whoosh', R('banchina', 0.4), { dur: 0.8 });
  [0.7, 1.0].forEach(c => S.fx('sparkle', R('banchina', c), { vel: 36 }));
  for (let k = 0; k < 8; k++) S.fx('tick', R('banchina', 1.1 + k * 0.1), { vel: 20 });
  [1.9, 2.85, 3.8, 4.75, 5.7, 6.65].forEach(c => {
    S.fx('click', R('banchina', c), { vel: 56 }); S.fx('doubleclick', R('banchina', c + 0.05), { vel: 38 });
    S.fx('pop', R('banchina', c + 0.1), { vel: 42 }); S.fx('sparkle', R('banchina', c + 1.45), { vel: 32 }); S.fx('ding', R('banchina', c + 1.6), { vel: 24 });
  });
  for (let k = 0; k < 4; k++) S.fx('woodblock', R('banchina', 7.4 + k * 0.08), { vel: 22 });
  S.fx('boing', R('banchina', 3.8), { vel: 34 });
  S.fx('boing', R('banchina', 8.8), { vel: 34 });
  [6.9, 7.4].forEach(c => S.fx('ding', R('banchina', c), { vel: 28, pitch: 'E6' }));
  S.fx('whoosh', R('banchina', 20.4), { dur: 2.4 });
  [20.4, 22.8].forEach(c => S.fx('ding', R('banchina', c), { vel: 30, pitch: 'G6' }));
  S.fx('chime', R('banchina', 22.8));
  // La partenza: le sbarre, la catena della salita, la montagna; dentro, i fili si accendono.
  for (let k = 0; k < 6; k++) S.fx('click', R('fili', 0.5 + k * 0.12), { vel: 34 });
  for (let k = 0; k < 26; k++) S.fx('tick', R('fili', 1.8 + k * 0.26), { vel: 28 });
  S.fx('whoosh', R('fili', 7.6), { dur: 2.6 });
  [11.8, 12.4, 13.0, 16.8, 17.2, 17.5, 17.9, 18.2, 18.6].forEach(c => S.fx('sparkle', R('fili', c), { vel: 30 }));
  S.fx('chime', R('fili', 19.8)); S.fx('ding', R('fili', 20.0), { vel: 34, pitch: 'C7' });
  S.fx('chime', R('fili', 27.0));
  // Le finestre: gli scambi (clac, per ogni vagone), i fili, le paperelle di luce, l'uscita.
  [2.2, 17.2, 28.4].forEach(a => { for (let i = 0; i < 6; i++) S.fx('doubleclick', R('finestre', a + i * 0.24 - 0.35), { vel: 46 }); });
  [15.2, 26.6].forEach(c => S.fx('sparkle', R('finestre', c), { vel: 30 }));
  [9.6, 22.0, 33.6].forEach(c => S.fx('chime', R('finestre', c - 0.4)));
  S.fx('whoosh', R('finestre', 38.8), { dur: 2.6 });
  // L'ultimo posto: l'uscita, le paperelle che cadono, la pesca, la corsa, il vagone nuovo, il telefono.
  S.fx('whoosh', R('pesca', 1.0), { dur: 1.6 });
  for (let k = 0; k < 18; k++) S.fx('pop', R('pesca', 4.4 + k * 0.16), { vel: 28 + (k % 3) * 6 });
  S.fx('sparkle', R('pesca', 13.1), { vel: 50 }); S.fx('chime', R('pesca', 13.4));
  S.fx('whoosh', R('pesca', 14.4), { dur: 1.8 });
  S.fx('boing', R('pesca', 15.2), { vel: 42 });
  for (let k = 0; k < 4; k++) S.fx('woodblock', R('pesca', 15.9 + k * 0.24), { vel: 26 });
  S.fx('sparkle', R('pesca', 16.6), { vel: 44 }); S.fx('boing', R('pesca', 16.8), { vel: 30 }); S.fx('ding', R('pesca', 17.4), { vel: 40 });
  S.fx('ding', R('pesca', 17.9), { vel: 34, pitch: 'G6' });
  S.fx('pop', R('pesca', 21.0), { vel: 40 });
  // Troppo lunga: i biglietti di carta e il vento, il salotto, il rotolo, zac zac, i due che restano giù, la partenza.
  for (let k = 0; k < 7; k++) S.fx('click', R('giu', 0.5 + k * 0.12), { vel: 30 });
  for (let k = 0; k < 7; k++) S.fx('pop', R('giu', 1.4 + k * 0.2), { vel: 30 });
  [2.2, 3.2].forEach(c => S.fx('whoosh', R('giu', c), { dur: 2.6 }));
  for (let k = 0; k < 8; k++) S.fx('tick', R('giu', 6.5 + k * 0.26), { vel: 18 });
  S.fx('click', R('giu', 8.6), { vel: 46 });
  S.fx('whoosh', R('giu', 10.8), { dur: 1.4 });
  S.fx('boing', R('giu', 12.2), { vel: 36 });
  S.fx('whoosh', R('giu', 12.6), { dur: 3.0 });
  [16.4, 17.25, 18.1, 18.95, 19.8, 20.65, 21.5, 22.35, 23.2].forEach((c, j) => {
    S.fx('click', R('giu', c), { vel: 56 }); S.fx('doubleclick', R('giu', c + 0.05), { vel: 38 }); S.fx('pop', R('giu', c + 0.1), { vel: 40 });
    if (j < 7) { S.fx('sparkle', R('giu', c + 1.45), { vel: 30 }); S.fx('ding', R('giu', c + 1.6), { vel: 22 }); }
    else { S.fx('revswell', R('giu', c + 1.6), { dur: 1.6, vel: 26 }); S.fx('tick', R('giu', c + 5.6), { vel: 26 }); }
  });
  for (let k = 0; k < 7; k++) S.fx('click', R('giu', 27.6 + k * 0.1), { vel: 34 });
  for (let k = 0; k < 18; k++) S.fx('tick', R('giu', 28.9 + k * 0.26), { vel: 26 });
  // La pista: la catena, i biglietti raccolti, il quaderno, i clac dal buio della montagna.
  for (let k = 0; k < 30; k++) S.fx('tick', R('pista', 0.1 + k * 0.3), { vel: 22 - Math.floor(k / 3) });
  for (let k = 0; k < 9; k++) S.fx('woodblock', R('pista', 0.3 + k * 0.28), { vel: 16 });
  [3.4, 4.4].forEach(c => S.fx('pop', R('pista', c), { vel: 30 }));
  S.fx('sparkle', R('pista', 6.2), { vel: 26 });
  S.fx('whoosh', R('pista', 10.6), { dur: 1.6 });
  [11.8, 12.2, 12.5, 12.9, 13.6].forEach(c => S.fx('doubleclick', R('pista', c), { vel: 30 }));
});
