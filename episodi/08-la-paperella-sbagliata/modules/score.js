kit.score(function (S, T) {
  // Musica originale: il valzerino del luna park fuori; un carillon sbiadito per i treni di prova; dentro la montagna il
  // tema sospeso che si scalda finestra dopo finestra; alla fine, un respiro largo verso le luci lontane.
  // Gli accordi stanno sul pad (servono anche allo stile «anni 90» del sito).
  const BPM = 84, B = 60 / BPM;
  S.tempo(BPM, { t0: 0 });
  S.program('pad', 'pad', { rev: 0.6, gain: -3 });
  S.program('keys', 'ep', { rev: 0.4, gain: -7 });
  S.program('box', 'glock', { rev: 0.5, gain: -7, pan: 0.2 });
  S.program('mallet', 'marimba', { rev: 0.3, gain: -5, pan: -0.15 });
  S.program('vib', 'vibes', { rev: 0.6, gain: -7 });
  S.program('bass', 'bass', { gain: -5 });
  const C = { C: ['C3', 'E3', 'G3', 'C4'], Am: ['A2', 'C3', 'E3', 'A3'], F: ['F2', 'A2', 'C3', 'F3'], G: ['G2', 'B2', 'D3', 'G3'], Em: ['E3', 'G3', 'B3', 'E4'], Dm: ['D3', 'F3', 'A3', 'D4'], E: ['E3', 'G#3', 'B3', 'E4'] };
  const ROOT = { C: 'C2', Am: 'A1', F: 'F1', G: 'G1', Em: 'E2', Dm: 'D2', E: 'E2' };
  const ARP = { C: ['C5', 'G4', 'E4', 'G4'], Am: ['A4', 'E4', 'C4', 'E4'], F: ['A4', 'F4', 'C4', 'F4'], G: ['B4', 'G4', 'D4', 'G4'], Em: ['B4', 'G4', 'E4', 'G4'], Dm: ['A4', 'F4', 'D4', 'F4'], E: ['B4', 'G#4', 'E4', 'G#4'] };
  const bt = t => t / B;
  // I tempi dentro una scena sono interni: R li porta al tempo vero (vedi il ritmo in shared.js).
  const R = (id, x) => T[id] + window.G.reale('08', id, x);
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
  // Fuori: i treni che dormono, la domanda, la frase nuova.
  sez(T.domanda, R('domanda', 17.6), ['Am', 'F', 'Dm', 'E'], { pad: 26, keys: 24 });
  sez(R('domanda', 17.6), T.frase, ['C'], { pad: 30 });
  sez(T.frase, R('frase', 3.4), ['F', 'C', 'Am', 'G'], { pad: 26, vib: 22 });
  sez(R('frase', 3.4), R('frase', 11.0), ['C', 'Am', 'F', 'G'], { pad: 26, keys: 26 });
  sez(R('frase', 11.0), R('frase', 15.0), ['F', 'G'], { pad: 28, vib: 26 });
  sez(R('frase', 15.0), T.prima, ['Am', 'Dm', 'Am', 'E'], { pad: 26, keys: 22 });
  // Il passato, come una vecchia fotografia: un carillon lento, sbiadito.
  sez(T.prima, R('prima', 3.0), ['Am'], { pad: 22 });
  sez(R('prima', 3.0), R('prima', 20.6), ['Am', 'F', 'C', 'E'], { pad: 22, box: 'x...x.x.', bv: 24 });
  sez(R('prima', 20.6), T.biglietti, ['Dm', 'Am'], { pad: 26, keys: 22 });
  // Di nuovo oggi: i sei biglietti, la partenza.
  sez(T.biglietti, R('biglietti', 6.0), ['C', 'G'], { pad: 28, mallet: 'x...x...', mv: 34 });
  sez(R('biglietti', 6.0), T.partenza, giro, { pad: 28, mallet: 'x.x.X.x.', mv: 40, bass: 50 });
  sez(T.partenza, T.finestre, ['Am', 'Am', 'F', 'G'], { pad: 30, bass: 44 });
  // Dentro: sospeso; poi, finestra dopo finestra, sempre più caldo.
  sez(T.finestre, R('finestre', 15.0), ['Em', 'C', 'Am', 'G'], { pad: 28, vib: 26 });
  sez(R('finestre', 15.0), R('finestre', 33.0), ['F', 'G', 'Em', 'Am'], { pad: 28, box: 'x.x.x.x.', bv: 28, mallet: 'x...x...', mv: 30, bass: 40 });
  sez(R('finestre', 33.0), T.vasca, ['F', 'G', 'C', 'C'], { pad: 34, keys: 30 });
  // Fuori di nuovo: la vasca piena, la pesca, la risposta.
  sez(T.vasca, T.pesca, giro, { pad: 28, mallet: 'x.x.X.x.', mv: 40, bass: 50 });
  sez(T.pesca, R('pesca', 6.4), ['Am', 'F'], { pad: 28, vib: 22 });
  sez(R('pesca', 6.4), R('pesca', 16.2), ['F', 'C', 'Dm', 'G'], { pad: 26, keys: 26 });
  sez(R('pesca', 16.2), T.telefono, giro, { pad: 28, box: 'x.x.x.x.', bv: 30, bass: 46 });
  sez(T.telefono, R('telefono', 6.0), ['F', 'C'], { pad: 26, keys: 28 });
  sez(R('telefono', 6.0), T['laggiu'], ['Am', 'F', 'Dm', 'G'], { pad: 28, vib: 22 });
  sez(T['laggiu'], R('laggiu', 8.0), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 38, bass: 46 });
  sez(R('laggiu', 8.0), R('laggiu', 15.8), ['F', 'G', 'Em', 'Am'], { pad: 30, keys: 26, vib: 24 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('vasca', 2))), repeat: 4, vel: 28 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('biglietti', 6.2))), repeat: 4, vel: 26 });
  // La coda sul quaderno: solo il pad, piano, sotto la voce.
  sez(R('coda', 1.0), R('coda', 42.0), ['C', 'Am', 'F', 'G'], { pad: 22, keys: 18 });
  // I due cartelli: il titolo e la fine.
  [R('domanda', 17.6), R('laggiu', 15.8)].forEach((a, k) => {
    S.fx('revswell', a - 0.6, { dur: 1.2 });
    S.chord('pad', C.C, { t: a, dur: 3.8, vel: 42 });
    S.chord('keys', ['C4', 'E4', 'G4', 'C5'], { t: a, dur: 3.4, vel: 44 });
    S.note('bass', 'C2', { t: a, dur: 2.6, vel: 58 });
    S.run('box', k ? ['C5', 'E5', 'G5', 'C6', 'E6', 'G6'] : ['C5', 'E5', 'G5', 'C6'], { t: a - 0.2, step: 0.12, vel: 44, cresc: 8 });
    S.fx('chime', a + 0.9);
  });

  // ── Rumori ─────────────────────────────────────────────────────────────────────────────────────────
  // La domanda: Ada si gira verso la montagna.
  S.fx('woodblock', R('domanda', 11.1), { vel: 20 });
  // La frase: si scrive, invio; la striscia vola; Ada la srotola, la legge, sfoglia il quaderno, fa di no.
  for (let k = 0; k < 24; k++) S.fx('tick', R('frase', 4.6 + k * 0.18), { vel: 18 });
  S.fx('click', R('frase', 9.2), { vel: 46 });
  S.fx('pop', R('frase', 9.5), { vel: 30 });
  S.fx('whoosh', R('frase', 11.0), { dur: 2.6 });
  S.fx('whoosh', R('frase', 15.6), { dur: 1.2, vel: 30 });
  [16.0, 16.4, 16.8].forEach(c => S.fx('tick', R('frase', c), { vel: 22 }));
  S.fx('woodblock', R('frase', 19.0), { vel: 26 });
  S.fx('pop', R('frase', 19.8), { vel: 26 });
  [21.4, 22.9].forEach(c => S.fx('whoosh', R('frase', c - 0.2), { dur: 0.5, vel: 34 }));
  for (let k = 0; k < 4; k++) S.fx('woodblock', R('frase', 27.0 + k * 0.28), { vel: 22 });
  // Il passato: le strisce che scendono, i treni di prova, le lanterne, i brividi (clic, clic, clic).
  S.fx('revswell', R('prima', 2.2), { dur: 1.6 });
  for (let k = 0; k < 7; k++) S.fx('whoosh', R('prima', 2.8 + k * 0.85), { dur: 1.2, vel: 18 });
  [6.8, 10.8, 14.8].forEach(c => S.fx('whoosh', R('prima', c + 0.3), { dur: 1.6, vel: 26 }));
  [11.0, 15.0, 18.4].forEach(c => {
    S.fx('chime', R('prima', c));
    S.fx('revswell', R('prima', c + 0.8), { dur: 1.1, vel: 30 });
    [1.4, 1.55, 1.7].forEach(d => S.fx('tick', R('prima', c + d), { vel: 26 }));
  });
  S.fx('revswell', R('prima', 20.2), { dur: 1.6 });
  // I biglietti: Ada corre, la striscia nella fessura, sei colpi di forbice, sei passeggeri; Chiama suona; le sbarre.
  for (let k = 0; k < 10; k++) S.fx('woodblock', R('biglietti', 0.5 + k * 0.27), { vel: 22 });
  S.fx('whoosh', R('biglietti', 4.2), { dur: 0.6 });
  for (let k = 0; k < 6; k++) S.fx('tick', R('biglietti', 5.9 + k * 0.12), { vel: 22 });
  [6.6, 7.1, 7.6, 8.1, 8.6, 9.1].forEach(c => {
    S.fx('click', R('biglietti', c), { vel: 56 }); S.fx('doubleclick', R('biglietti', c + 0.05), { vel: 36 });
    S.fx('pop', R('biglietti', c + 0.3), { vel: 40 });
    S.fx('sparkle', R('biglietti', c + 1.75), { vel: 30 }); S.fx('ding', R('biglietti', c + 1.9), { vel: 24 });
  });
  S.fx('boing', R('biglietti', 14.8), { vel: 34 });
  [20.7, 21.15, 21.6, 22.05].forEach((c, k) => S.fx('ding', R('biglietti', c), { vel: 44 - k * 6, pitch: 'E6' }));
  for (let k = 0; k < 4; k++) S.fx('woodblock', R('biglietti', 26.7 + k * 0.26), { vel: 20 });
  for (let k = 0; k < 6; k++) S.fx('click', R('biglietti', 27.3 + k * 0.12), { vel: 34 });
  // La partenza: la catena della salita, la discesa, i clac dal buio; Ada si siede.
  for (let k = 0; k < 24; k++) S.fx('tick', R('partenza', 2.6 + k * 0.22), { vel: 28 });
  S.fx('whoosh', R('partenza', 8.4), { dur: 3.0 });
  [8.9, 9.6].forEach(c => S.fx('pop', R('partenza', c), { vel: 26 }));
  [11.6, 12.0, 12.4, 12.8, 13.2].forEach(c => S.fx('doubleclick', R('partenza', c), { vel: 26 }));
  S.fx('tick', R('partenza', 13.4), { vel: 20 });
  // Dentro: i fili si accendono; il nocciola scorre; clac a ogni scambio; alle finestre, le paperelle di luce.
  [2.2, 2.8, 3.4, 4.0, 4.8, 5.4, 6.0].forEach(c => S.fx('sparkle', R('finestre', c), { vel: 30 }));
  S.fx('chime', R('finestre', 9.0));
  [14.8, 24.6, 33.4].forEach(t0 => { for (let i = 0; i < 6; i++) S.fx('doubleclick', R('finestre', t0 + i * 0.3 - 0.35), { vel: 46 }); });
  [23.8, 32.6].forEach(c => S.fx('sparkle', R('finestre', c), { vel: 30 }));
  [21.4, 30.8, 39.4].forEach(c => S.fx('chime', R('finestre', c - 0.4)));
  S.fx('whoosh', R('finestre', 45.2), { dur: 2.4 });
  // La vasca: il treno esce; le paperelle cadono; la matita cade; il treno si ferma, le sbarre si alzano.
  S.fx('whoosh', R('vasca', 1.0), { dur: 1.6 });
  for (let k = 0; k < 16; k++) S.fx('pop', R('vasca', 6.9 + k * 0.16), { vel: 28 + (k % 3) * 6 });
  S.fx('woodblock', R('vasca', 10.4), { vel: 30 }); S.fx('woodblock', R('vasca', 10.7), { vel: 18 });
  for (let k = 0; k < 6; k++) S.fx('click', R('vasca', 13.6 + k * 0.1), { vel: 26 });
  // La pesca: presa; la paperella si gira; il quaderno; due luccichii; lo scarico; il salto, la corsa, il vagone nuovo.
  S.fx('sparkle', R('pesca', 4.2), { vel: 50 }); S.fx('chime', R('pesca', 4.5));
  S.fx('whoosh', R('pesca', 5.1), { dur: 0.6, vel: 26 });
  S.fx('pop', R('pesca', 6.6), { vel: 26 });
  S.fx('whoosh', R('pesca', 8.9), { dur: 0.6, vel: 26 });
  S.fx('sparkle', R('pesca', 12.4), { vel: 40 }); S.fx('chime', R('pesca', 12.8));
  S.fx('whoosh', R('pesca', 16.2), { dur: 1.8 });
  S.fx('boing', R('pesca', 18.6), { vel: 42 });
  for (let k = 0; k < 5; k++) S.fx('woodblock', R('pesca', 19.2 + k * 0.2), { vel: 26 });
  S.fx('sparkle', R('pesca', 19.6), { vel: 44 }); S.fx('ding', R('pesca', 20.6), { vel: 40 });
  // La risposta: i puntini, «Briciola», il sorriso; la stazione; il quaderno.
  for (let k = 0; k < 4; k++) S.fx('tick', R('telefono', 0.7 + k * 0.3), { vel: 14 });
  S.fx('ding', R('telefono', 1.9), { vel: 40 });
  S.fx('chime', R('telefono', 2.6));
  S.fx('whoosh', R('telefono', 5.8), { dur: 0.8, vel: 24 });
  S.fx('pop', R('telefono', 12.0), { vel: 24 });
  S.fx('revswell', R('telefono', 17.0), { dur: 1.6, vel: 26 });
  // Laggiù: le sbarre, la catena, le luci lontane che si accendono, Ada in punta di piedi.
  for (let k = 0; k < 7; k++) S.fx('click', R('laggiu', 0.8 + k * 0.12), { vel: 34 });
  for (let k = 0; k < 25; k++) S.fx('tick', R('laggiu', 3.6 + k * 0.24), { vel: 22 });
  S.fx('whoosh', R('laggiu', 9.2), { dur: 2.0, vel: 28 });
  S.fx('revswell', R('laggiu', 8.0), { dur: 3.0 });
  for (let k = 0; k < 6; k++) S.fx('sparkle', R('laggiu', 8.4 + k * 0.55), { vel: 24 + k * 3 });
  S.fx('tick', R('laggiu', 12.6), { vel: 26 }); S.fx('tick', R('laggiu', 12.9), { vel: 20 });
  // La matita della coda: un tratto ogni mezzo secondo, per ogni schizzo.
  [[1.4, 1], [12.8, 2], [31.4, 2]].forEach(([a, n]) => { for (let k = 0; k < n * 2; k++) S.fx('tick', R('coda', a + k * 0.25), { vel: 14 }); });
});
