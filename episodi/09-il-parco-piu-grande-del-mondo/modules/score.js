kit.score(function (S, T) {
  // Musica originale: il valzerino del luna park di Ada; oltre la collina lo stesso tema si allarga, più pieno, come il
  // parco immenso; dentro la montagna il tema sospeso, che accelera con le finestre; il finale chiude la stagione.
  // Gli accordi stanno sul pad (servono anche allo stile «anni 90» del sito).
  const BPM = 84, B = 60 / BPM;
  S.tempo(BPM, { t0: 0 });
  S.seed(9);
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
  const R = (id, x) => T[id] + window.G.reale('09', id, x);
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
  // Il parco di Ada: la domanda, la collina.
  sez(T.domanda, R('domanda', 16.4), ['Am', 'F', 'C', 'G'], { pad: 28, keys: 26 });
  sez(R('domanda', 16.4), T.collina, ['C', 'C'], { pad: 30 });
  sez(T.collina, T.immenso, ['F', 'C', 'Am', 'G'], { pad: 26, mallet: 'x...x.x.', mv: 32 });
  // Il parco immenso: lo stesso tema, più grande.
  sez(T.immenso, R('immenso', 8), ['C', 'G', 'Am', 'F'], { pad: 36, keys: 30, vib: 28, bass: 46 });
  sez(R('immenso', 8), R('immenso', 16), giro, { pad: 32, mallet: 'x.x.X.x.', mv: 40, box: 'x.x.x.x.', bv: 30, bass: 52 });
  sez(R('immenso', 16), R('immenso', 28.4), ['Em', 'C', 'Am', 'G'], { pad: 34, vib: 28, bass: 46 });
  sez(R('immenso', 28.4), T.frase, ['F', 'G', 'C', 'C'], { pad: 36, keys: 32 });
  sez(T.frase, R('frase', 20.8), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 38, bass: 48 });
  sez(R('frase', 20.8), T.finestre, ['Am', 'Am', 'F', 'G'], { pad: 30, bass: 44 });
  // Dentro: sospeso, poi sempre più veloce, una cima dopo l'altra; l'ultima finestra si apre.
  sez(T.finestre, R('finestre', 16.6), ['Em', 'C', 'Am', 'G'], { pad: 28, vib: 26 });
  sez(R('finestre', 16.6), R('finestre', 34.8), ['F', 'G', 'C', 'Am'], { pad: 30, box: 'x.x.x.x.', bv: 30, mallet: 'xxxxxxxx', mv: 30, bass: 42 });
  sez(R('finestre', 34.8), T.lago, ['F', 'G', 'C', 'C'], { pad: 36, keys: 32 });
  // Fuori: il lago, la pesca, la casa lontana, il quaderno.
  sez(T.lago, R('lago', 19.4), ['C', 'Am', 'F', 'G'], { pad: 30, mallet: 'x.x.X.x.', mv: 40, bass: 50 });
  sez(R('lago', 19.4), R('lago', 24.4), ['Am', 'Em', 'F', 'G'], { pad: 30, vib: 24 });
  sez(R('lago', 24.4), T.nomi, ['F', 'C', 'Dm', 'G'], { pad: 28, keys: 28, box: 'x...x...', bv: 28 });
  // I nomi veri: piano, come una ninna nanna.
  sez(T.nomi, R('nomi', 20.4), ['C', 'Em', 'F', 'G'], { pad: 28, keys: 24 });
  sez(R('nomi', 20.4), R('nomi', 48.6), ['Am', 'F', 'C', 'G'], { pad: 30, vib: 24, bass: 40 });
  sez(R('nomi', 48.6), T.quaderno, ['C', 'C'], { pad: 30 });
  // Il finale della stagione.
  sez(T.quaderno, R('quaderno', 14.8), ['F', 'G', 'Em', 'Am'], { pad: 30, keys: 28 });
  sez(R('quaderno', 14.8), R('quaderno', 22.0), giro, { pad: 32, mallet: 'x.x.X.x.', mv: 42, box: 'x.x.x.x.', bv: 32, bass: 52 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('immenso', 8))), repeat: 5, vel: 30 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('lago', 2))), repeat: 5, vel: 30 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('quaderno', 15))), repeat: 3, vel: 32 });
  // I due cartelli: il titolo e la fine della stagione (più lunga, più piena).
  [R('domanda', 16.4), R('quaderno', 22.0)].forEach((a, k) => {
    S.fx('revswell', a - 0.6, { dur: 1.2 });
    S.chord('pad', C.C, { t: a, dur: k ? 4.0 : 3.6, vel: k ? 48 : 42 });
    S.chord('keys', ['C4', 'E4', 'G4', 'C5'], { t: a, dur: 3.4, vel: 44 });
    S.note('bass', 'C2', { t: a, dur: 2.6, vel: 58 });
    S.run('box', k ? ['C5', 'E5', 'G5', 'C6', 'E6', 'G6', 'C7'] : ['C5', 'E5', 'G5', 'C6'], { t: a - 0.2, step: 0.12, vel: 44, cresc: 7 });
    S.fx('chime', a + 0.9);
    if (k) { S.fx('sparkle', a + 1.3, { vel: 46 }); S.fx('chime', a + 1.9); }
  });

  // ── Rumori ─────────────────────────────────────────────────────────────────────────────────────────
  // La domanda: le strisce passano, una scende nello Spezzaparole di Ada.
  [1.0, 4.0, 8.0, 12.4].forEach(c => S.fx('whoosh', R('domanda', c), { dur: 2.2, vel: 30 }));
  S.fx('whoosh', R('domanda', 2.4), { dur: 3.0 });
  S.fx('click', R('domanda', 6.8), { vel: 40 }); S.fx('doubleclick', R('domanda', 6.9), { vel: 30 });
  // La collina: i passi, il cancello, il fiato corto.
  for (let k = 0; k < 8; k++) S.fx('woodblock', R('collina', 1.2 + k * 0.42), { vel: 20 });
  S.fx('woodblock', R('collina', 4.8), { vel: 24 }); S.fx('click', R('collina', 5.2), { vel: 30 });
  for (let k = 0; k < 10; k++) S.fx('woodblock', R('collina', 5.6 + k * 0.62), { vel: 18 });
  S.fx('whoosh', R('collina', 12.4), { dur: 2.6 });
  // Il parco immenso: la forbice che non si ferma, i treni che partono, i clac fitti come la pioggia.
  S.fx('revswell', R('immenso', 0.6), { dur: 2.4 });
  S.fx('chime', R('immenso', 3.0));
  for (let k = 0; k < 22; k++) { const c = 8.6 + k * 0.36; S.fx(k % 2 ? 'doubleclick' : 'click', R('immenso', c), { vel: 34 + (k % 3) * 6 }); }
  for (let k = 0; k < 12; k++) S.fx('pop', R('immenso', 9.0 + k * 0.5), { vel: 22 });
  [10.4, 12.6, 14.8].forEach(c => S.fx('whoosh', R('immenso', c), { dur: 2.0, vel: 34 }));
  for (let k = 0; k < 24; k++) S.fx('tick', R('immenso', 12.0 + k * 0.17), { vel: 22 });
  for (let k = 0; k < 120; k++) S.fx('doubleclick', R('immenso', 16.0 + S.rand() * 12.4), { vel: 14 + Math.round(S.rand() * 18), pan: S.rand() * 1.4 - 0.7 });
  S.fx('sparkle', R('immenso', 29.8), { vel: 34 }); S.fx('chime', R('immenso', 30.4));
  // La stessa frase: la striscia di Ada, zac zac, i biglietti, i passeggeri, le sbarre, la partenza.
  S.fx('whoosh', R('frase', 3.2), { dur: 2.6 });
  S.fx('pop', R('frase', 6.0), { vel: 34 });
  S.fx('whoosh', R('frase', 6.4), { dur: 1.6, vel: 30 });
  [8.4, 8.9].forEach(c => { S.fx('click', R('frase', c), { vel: 58 }); S.fx('doubleclick', R('frase', c + 0.05), { vel: 40 }); });
  [9.1, 9.45, 9.8].forEach(c => { S.fx('pop', R('frase', c), { vel: 44 }); S.fx('sparkle', R('frase', c + 1.45), { vel: 34 }); S.fx('ding', R('frase', c + 1.6), { vel: 26 }); });
  S.fx('pop', R('frase', 14.0), { vel: 30 });
  for (let k = 0; k < 3; k++) S.fx('click', R('frase', 19.6 + k * 0.2), { vel: 36 });
  for (let k = 0; k < 20; k++) S.fx('tick', R('frase', 21.0 + k * Math.max(0.12, 0.3 - k * 0.01)), { vel: 26 });
  S.fx('whoosh', R('frase', 27.6), { dur: 3.0 });
  // Dentro: i fili, gli scambi; una finestra dopo l'altra, i clac sempre più fitti.
  [2.4, 3.1, 3.8].forEach(c => S.fx('sparkle', R('finestre', c), { vel: 32 }));
  S.fx('chime', R('finestre', 5.0));
  [10.0, 10.3, 10.6].forEach(c => S.fx('doubleclick', R('finestre', c - 0.35), { vel: 48 }));
  const FS_VEL = [[0, 260], [10.4, 260], [12.2, 50], [15.2, 50], [16.6, 700], [20, 1300], [28, 1900], [31, 1900], [33.6, 700], [34.8, 50], [38.6, 50], [40, 500], [42, 900]];
  const d = t => window.G.percorso(t, 0, FS_VEL), d0 = d(13.6), d1 = d(36.0);
  const quando = dd => { let lo = 0, hi = 42; for (let n = 0; n < 40; n++) { const m = (lo + hi) / 2; if (d(m) < dd) lo = m; else hi = m; } return lo; };
  let prima = 13.6;
  for (let k = 0; k < 24; k++) {
    const tk = quando(d0 + (d1 - d0) * k / 23);
    S.fx(k === 0 || k === 23 ? 'chime' : 'sparkle', R('finestre', tk - 0.2), { vel: k === 0 || k === 23 ? 44 : 24 + k });
    if (k > 0) for (let j = 1; j <= 3; j++) S.fx('doubleclick', R('finestre', prima + (tk - prima) * j / 4), { vel: 26 + Math.round(S.rand() * 10), pan: S.rand() - 0.5 });
    prima = tk;
  }
  S.fx('whoosh', R('finestre', 39.4), { dur: 2.6 });
  // Il lago: le paperelle cadono, la pesca, la corsa al vagone nuovo, lo scarico, il telefono, la risata.
  S.fx('whoosh', R('lago', 1.0), { dur: 1.6 });
  for (let k = 0; k < 34; k++) S.fx('pop', R('lago', 2.2 + k * 0.17), { vel: 22 + (k % 4) * 5, pan: 0.6 - k * 0.035 });
  for (let k = 0; k < 4; k++) S.fx('tick', R('lago', 10.0 + k * 0.2), { vel: 20 });
  S.fx('sparkle', R('lago', 14.2), { vel: 50 }); S.fx('chime', R('lago', 14.5));
  S.fx('boing', R('lago', 15.4), { vel: 42 });
  S.fx('sparkle', R('lago', 16.0), { vel: 44 }); S.fx('ding', R('lago', 16.9), { vel: 40 });
  S.fx('whoosh', R('lago', 16.8), { dur: 1.8 });
  S.fx('pop', R('lago', 20.8), { vel: 40 });
  S.fx('chime', R('lago', 28.8));
  // I nomi veri: un rintocco per ogni nome.
  S.fx('whoosh', R('nomi', 1.8), { dur: 1.4, vel: 28 });
  [19.8, 25.8, 31.8, 40.2].forEach(c => S.fx('whoosh', R('nomi', c), { dur: 1.8, vel: 30 }));
  [21.8, 27.6, 33.6, 41.4].forEach(c => S.fx('chime', R('nomi', c)));
  S.fx('sparkle', R('nomi', 48.8), { vel: 30 });
  // Il finale: le sbarre, il trenino che riparte, il quaderno che si chiude, la corsa giù per la collina.
  for (let k = 0; k < 4; k++) S.fx('click', R('quaderno', 5.4 + k * 0.15), { vel: 34 });
  for (let k = 0; k < 20; k++) S.fx('tick', R('quaderno', 7.0 + k * 0.26), { vel: 22 });
  S.fx('click', R('quaderno', 14.8), { vel: 40 });
  S.fx('boing', R('quaderno', 15.6), { vel: 34 });
  for (let k = 0; k < 14; k++) S.fx('woodblock', R('quaderno', 16.6 + k * 0.32), { vel: 22 });
});
