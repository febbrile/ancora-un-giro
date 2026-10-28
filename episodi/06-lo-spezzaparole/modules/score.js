kit.score(function (S, T) {
  // Musica originale: il valzerino del luna park fuori dalla montagna, un carillon curioso per la prova di Ada; dentro,
  // il tema sospeso che si apre piano. Gli accordi stanno sul pad (servono anche allo stile «anni 90» del sito).
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
  const R = (id, x) => T[id] + window.G.reale('06', id, x);
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
  // Fuori: la cameretta, il nome, lo Spezzaparole, la partenza.
  sez(T.nome, R('nome', 11.0), ['F', 'C', 'Dm', 'G'], { pad: 26, vib: 22 });
  sez(R('nome', 11.0), T.zac, ['Am', 'F', 'Dm', 'E'], { pad: 28, keys: 24 });
  sez(T.zac, R('zac', 11.0), giro, { pad: 28, mallet: 'x...x.x.', mv: 36, bass: 46 });
  sez(R('zac', 11.0), R('zac', 24.0), ['C', 'Am', 'Dm', 'G'], { pad: 28, mallet: 'x.x.X.x.', mv: 40, bass: 50 });
  sez(T.partenza, T.prova, ['Am', 'Am', 'F', 'G'], { pad: 30, bass: 44 });
  // La prova: un carillon curioso, poi allegro quando i biglietti escono a cascata.
  sez(T.prova, R('prova', 13.0), ['C', 'F', 'C', 'G'], { pad: 24, box: 'x...x.x.', bv: 30 });
  sez(R('prova', 13.0), R('prova', 18.6), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 44, bass: 50 });
  sez(R('prova', 18.6), T.fili, ['F', 'C', 'Dm', 'G'], { pad: 28, keys: 26, box: 'x...x...', bv: 28 });
  // Dentro: sospeso, poi sempre più aperto.
  sez(T.fili, T.finestre, ['Em', 'C', 'Am', 'G'], { pad: 28, vib: 26 });
  sez(T.finestre, R('finestre', 38.4), ['F', 'G', 'C', 'Am'], { pad: 30, box: 'x.x.x.x.', bv: 30, mallet: 'x...x...', mv: 32, bass: 42 });
  sez(R('finestre', 38.4), T.vasca, ['F', 'G', 'C', 'C'], { pad: 36, keys: 32 });
  // Fuori di nuovo: la vasca, la pesca, ancora un giro.
  sez(T.vasca, T.pesca, ['C', 'Am', 'F', 'G'], { pad: 28, mallet: 'x.x.X.x.', mv: 40, bass: 50 });
  sez(T.pesca, R('pesca', 14.2), ['F', 'C', 'Dm', 'G'], { pad: 28, keys: 26 });
  sez(R('pesca', 14.2), T.ancora, ['Am', 'Em', 'F', 'G'], { pad: 30, vib: 24 });
  sez(T.ancora, R('ancora', 15.0), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 38, bass: 48 });
  sez(R('ancora', 15.0), R('ancora', 21.2), ['Am', 'F', 'Dm', 'G'], { pad: 28, keys: 26 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('zac', 1))), repeat: 4, vel: 28 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('vasca', 2))), repeat: 4, vel: 30 });
  // La coda sul quaderno: solo il pad, piano, sotto la voce.
  sez(R('coda', 1.0), R('coda', 41.0), ['C', 'Am', 'F', 'G'], { pad: 22, keys: 18 });
  // I due cartelli: il titolo e la fine.
  [R('zac', 24.0), R('ancora', 21.2)].forEach((a, k) => {
    S.fx('revswell', a - 0.6, { dur: 1.2 });
    S.chord('pad', C.C, { t: a, dur: 3.8, vel: 42 });
    S.chord('keys', ['C4', 'E4', 'G4', 'C5'], { t: a, dur: 3.4, vel: 44 });
    S.note('bass', 'C2', { t: a, dur: 2.6, vel: 58 });
    S.run('box', k ? ['C5', 'E5', 'G5', 'C6', 'E6', 'G6'] : ['C5', 'E5', 'G5', 'C6'], { t: a - 0.2, step: 0.12, vel: 44, cresc: 8 });
    S.fx('chime', a + 0.9);
  });

  // ── Rumori ─────────────────────────────────────────────────────────────────────────────────────────
  // Il nome: le mani piccole scrivono, invio; la striscia vola via e scende in mano ad Ada.
  kit.typist('Al mare Zampirù', 3.0, 3.6, 6).times.forEach(c => S.fx('tick', R('nome', c), { vel: 18 }));
  S.fx('click', R('nome', 8.0), { vel: 46 });
  S.fx('whoosh', R('nome', 8.4), { dur: 2.6 });
  S.fx('whoosh', R('nome', 11.4), { dur: 3.6 });
  S.fx('pop', R('nome', 15.4), { vel: 40 });
  // Zac: la striscia entra; «Al», «mare», poi tre colpi per una parola sola.
  S.fx('whoosh', R('zac', 1.2), { dur: 0.6 });
  for (let k = 0; k < 6; k++) S.fx('tick', R('zac', 2.3 + k * 0.12), { vel: 22 });
  for (let k = 0; k < 6; k++) S.fx('tick', R('zac', 6.6 + k * 0.1), { vel: 22 });
  [3.0, 4.2, 7.2, 7.55, 7.9].forEach(c => { S.fx('click', R('zac', c), { vel: 56 }); S.fx('doubleclick', R('zac', c + 0.05), { vel: 38 }); });
  [3.3, 4.5, 8.3].forEach(c => S.fx('pop', R('zac', c), { vel: 44 }));
  [4.75, 5.95].forEach(c => { S.fx('sparkle', R('zac', c), { vel: 34 }); S.fx('ding', R('zac', c + 0.15), { vel: 26 }); });
  [9.2, 9.32, 9.44].forEach(c => S.fx('pop', R('zac', c), { vel: 30 }));
  S.fx('whoosh', R('zac', 9.9), { dur: 1.2 });
  [11.37, 11.49, 11.61].forEach(c => { S.fx('sparkle', R('zac', c), { vel: 32 }); S.fx('ding', R('zac', c + 0.15), { vel: 24 }); });
  S.fx('boing', R('zac', 14.6), { vel: 34 });
  for (let k = 0; k < 5; k++) S.fx('click', R('zac', 16.8 + k * 0.15), { vel: 36 });
  [18.0, 18.5, 19.0, 19.5, 20.0].forEach(c => S.fx('woodblock', R('zac', c), { vel: 30 }));
  // La partenza: la catena della salita, la discesa, i clac dal buio; Ada strappa un foglio.
  for (let k = 0; k < 16; k++) S.fx('tick', R('partenza', 2.6 + k * 0.2), { vel: 28 });
  S.fx('whoosh', R('partenza', 6.0), { dur: 3.0 });
  [9.4, 9.7, 10.0, 10.3, 10.6].forEach(c => S.fx('doubleclick', R('partenza', c), { vel: 22 }));
  S.fx('whoosh', R('partenza', 11.0), { dur: 0.4 }); S.fx('click', R('partenza', 11.05), { vel: 30 });
  // La prova: Ada scrive, la forbice taglia, i biglietti cadono, si mettono in fila, combaciano, finiscono in tasca.
  kit.typist('gelato', 1.3, 4.2, 3).times.forEach(c => S.fx('tick', R('prova', c), { vel: 16 }));
  kit.typist('precipitevolissimevolmente', 7.9, 9.5, 4).times.forEach(c => S.fx('tick', R('prova', c), { vel: 14 }));
  S.fx('whoosh', R('prova', 3.0), { dur: 0.6 });
  [4.5, 14.2, 14.65, 15.1, 15.55, 16.0, 16.45].forEach(c => { S.fx('click', R('prova', c), { vel: 54 }); S.fx('doubleclick', R('prova', c + 0.05), { vel: 34 }); S.fx('pop', R('prova', c + 0.25), { vel: 34 }); });
  [5.4, 5.9].forEach(c => S.fx('woodblock', R('prova', c), { vel: 24 }));
  S.fx('whoosh', R('prova', 11.9), { dur: 1.0 });
  S.fx('whoosh', R('prova', 13.2), { dur: 0.6 });
  S.fx('boing', R('prova', 16.9), { vel: 34 });
  [18.8, 19.2, 19.6, 20.0, 20.4, 20.8, 21.2].forEach(c => S.fx('woodblock', R('prova', c + 0.5), { vel: 26 }));
  S.fx('sparkle', R('prova', 21.8), { vel: 36 });
  S.fx('click', R('prova', 23.5), { vel: 34 }); S.fx('chime', R('prova', 23.7));
  for (let k = 0; k < 16; k++) S.fx('tick', R('prova', 24.9 + k * 0.18), { vel: 12 });
  S.fx('whoosh', R('prova', 28.8), { dur: 0.8 });
  for (let k = 0; k < 8; k++) S.fx('woodblock', R('prova', 29.9 + k * 0.26), { vel: 22 });
  // I fili: si accendono con un tintinnio; il vestito dell'ultimo pezzo cambia.
  [2.4, 3.0, 3.6, 4.2, 4.8].forEach(c => S.fx('sparkle', R('fili', c), { vel: 30 }));
  [12.8, 17.0].forEach(c => S.fx('chime', R('fili', c)));
  // Gli scambi: clac, a ogni tratto, uno per vagone; i fili; le finestre; la luce dell'uscita.
  [3.0, 19.6, 32.0].forEach(a => { for (let i = 0; i < 5; i++) S.fx('doubleclick', R('finestre', a + 0.3 * i - 0.35), { vel: 46 }); });
  [17.2, 29.4].forEach(c => S.fx('sparkle', R('finestre', c), { vel: 30 }));
  [12.4, 25.4, 37.6].forEach(c => S.fx('chime', R('finestre', c - 0.4)));
  S.fx('whoosh', R('finestre', 40.8), { dur: 2.0 });
  // La vasca: le paperelle cadono sotto l'ultimo pezzo.
  S.fx('whoosh', R('vasca', 1.0), { dur: 1.6 });
  for (let k = 0; k < 18; k++) S.fx('pop', R('vasca', 7.3 + k * 0.18), { vel: 26 + (k % 3) * 6 });
  S.fx('sparkle', R('vasca', 14.4), { vel: 28 });
  // La pesca: nuota; la corsa al vagone nuovo; la cameretta.
  S.fx('sparkle', R('pesca', 6.7), { vel: 50 }); S.fx('chime', R('pesca', 7.0));
  S.fx('whoosh', R('pesca', 9.4), { dur: 1.8 });
  S.fx('boing', R('pesca', 10.6), { vel: 42 });
  for (let k = 0; k < 8; k++) S.fx('woodblock', R('pesca', 11.3 + k * 0.24), { vel: 26 });
  S.fx('sparkle', R('pesca', 12.6), { vel: 44 }); S.fx('ding', R('pesca', 13.4), { vel: 40 });
  S.fx('pop', R('pesca', 15.2), { vel: 40 });
  // Ancora un giro: le sbarre, la partenza, la storia che si allunga, l'ultima paperella, di nuovo via.
  for (let k = 0; k < 6; k++) S.fx('click', R('ancora', 0.2 + k * 0.12), { vel: 32 });
  for (let k = 0; k < 8; k++) S.fx('tick', R('ancora', 1.5 + k * 0.2), { vel: 24 });
  S.fx('whoosh', R('ancora', 3.0), { dur: 2.0 });
  for (let k = 0; k < 6; k++) S.fx('tick', R('ancora', 5.9 + k * 0.45), { vel: 12 });
  S.fx('boing', R('ancora', 9.0), { vel: 36 });
  for (let k = 0; k < 4; k++) S.fx('woodblock', R('ancora', 9.5 + k * 0.2), { vel: 24 });
  S.fx('sparkle', R('ancora', 9.6), { vel: 40 }); S.fx('ding', R('ancora', 10.4), { vel: 36 });
  for (let k = 0; k < 18; k++) S.fx('tick', R('ancora', 11.0 + k * 0.13), { vel: 12 });
  S.fx('click', R('ancora', 13.7), { vel: 32 });
  for (let k = 0; k < 14; k++) S.fx('tick', R('ancora', 15.2 + k * 0.24), { vel: 22 });
  S.fx('whoosh', R('ancora', 20.4), { dur: 1.8 });
  // La matita della coda: un tratto ogni mezzo secondo, per ogni schizzo.
  [[1.4, 3], [12.2, 2], [22.6, 3]].forEach(([a, n]) => { for (let k = 0; k < n * 2; k++) S.fx('tick', R('coda', a + k * 0.25), { vel: 14 }); });
});
