kit.score(function (S, T) {
  // Musica originale. Fuori, il valzerino del luna park; quando c'è il custode, il suo tema: lento, in minore, sul pianoforte
  // elettrico e sul vibrafono, come il passo di chi fa sempre lo stesso giro. Dentro la montagna il tema sospeso, che a
  // ogni finestra si fa più blu. Il montaggio di «Al parco!» accelera; il regolamento torna al tema del custode; la
  // giostrina finisce piano, nel buio. Gli accordi stanno sul pad (per lo stile «anni 90»).
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
  const R = (id, x) => T[id] + window.G.reale('10', id, x);
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
  // La domanda.
  sez(T.domanda, R('domanda', 7.4), ['F', 'C', 'Dm', 'G'], { pad: 26, vib: 22 });
  sez(R('domanda', 7.4), R('domanda', 15.6), suo, { pad: 28, keys: 22, bass: 40 });
  custode(R('domanda', 9.8));
  sez(R('domanda', 15.6), R('domanda', 28.4), giro, { pad: 28, mallet: 'x...x.x.', mv: 34, bass: 44 });
  // La pesca; la casa.
  sez(T.pesca, R('pesca', 5.8), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 38, bass: 46 });
  sez(R('pesca', 5.8), T.pagina, ['Am', 'F', 'C', 'G'], { pad: 24, keys: 22 });
  // La pagina nuova: il tema del custode.
  sez(T.pagina, R('pagina', 6.0), giro, { pad: 28, mallet: 'x...x...', mv: 32 });
  sez(R('pagina', 6.0), T.salgono, suo, { pad: 28, keys: 24, bass: 42, vib: 20 });
  custode(R('pagina', 5.4)); custode(R('pagina', 17.0));
  // Le bandierine salgono.
  sez(T.salgono, T.fili, giro, { pad: 30, mallet: 'x.x.X.x.', mv: 40, box: 'x...x...', bv: 26, bass: 50 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('salgono', 1.6))), repeat: 6, vel: 30 });
  // Dentro: sospeso; a ogni finestra più blu.
  sez(T.fili, R('fili', 4.0), giro, { pad: 30, mallet: 'xxx.X.x.', mv: 42, bass: 52 });
  sez(R('fili', 4.0), T.finestre, ['Em', 'C', 'Am', 'G'], { pad: 28, vib: 26 });
  sez(T.finestre, R('finestre', 15.0), ['Em', 'C', 'Am', 'G'], { pad: 28, vib: 24 });
  sez(R('finestre', 15.0), R('finestre', 24.4), ['C', 'Am', 'F', 'G'], { pad: 28, box: 'x...x...', bv: 26 });
  sez(R('finestre', 24.4), T.insiste, ['F', 'C', 'G', 'C'], { pad: 30, vib: 22, bass: 40 });
  // Al parco!: il montaggio accelera, messaggio dopo messaggio.
  sez(T.insiste, R('insiste', 14.0), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 38, bass: 48 });
  sez(R('insiste', 14.0), R('insiste', 29.6), giro, { pad: 30, mallet: 'xxx.X.x.', mv: 42, box: 'x.x.x.x.', bv: 28, bass: 52 });
  sez(R('insiste', 29.6), T.custode, ['F', 'G', 'C', 'C'], { pad: 32, mallet: 'xxxxX.x.', mv: 44, box: 'x.x.x.x.', bv: 30, bass: 56 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('insiste', 14.0))), repeat: 8, vel: 32 });
  // Il regolamento.
  sez(T.custode, R('custode', 17.2), suo, { pad: 28, keys: 24, bass: 42 });
  custode(R('custode', 9.0));
  sez(R('custode', 17.2), T.giostrina, giro, { pad: 28, mallet: 'x...x.x.', mv: 34, bass: 44 });
  // La giostrina: il tema del custode che se ne va, e il buio.
  sez(T.giostrina, R('giostrina', 16.4), ['Am', 'Dm', 'Em', 'Am'], { pad: 24, vib: 20 });
  custode(R('giostrina', 3.4));
  // La coda sul quaderno: solo il pad, piano, sotto la voce.
  sez(R('coda', 1.0), R('coda', 39.0), ['C', 'Am', 'F', 'G'], { pad: 22, keys: 18 });
  // I due cartelli: il titolo e la fine.
  [R('domanda', 28.4), R('giostrina', 16.4)].forEach((a, k) => {
    S.fx('revswell', a - 0.6, { dur: 1.2 });
    S.chord('pad', C.C, { t: a, dur: 3.8, vel: 42 });
    S.chord('keys', ['C4', 'E4', 'G4', 'C5'], { t: a, dur: 3.4, vel: 44 });
    S.note('bass', 'C2', { t: a, dur: 2.6, vel: 58 });
    S.run('box', k ? ['C5', 'E5', 'G5', 'C6', 'E6', 'G6'] : ['C5', 'E5', 'G5', 'C6'], { t: a - 0.2, step: 0.12, vel: 44, cresc: 8 });
    S.fx('chime', a + 0.9);
  });

  // ── Rumori ─────────────────────────────────────────────────────────────────────────────────────────
  // Una striscia che arriva in volo, e la mano del custode che la prende.
  const volo = (id, a, b) => { S.fx('whoosh', R(id, a), { dur: b - a }); S.fx('pop', R(id, b), { vel: 34 }); };
  // Il custode che attacca un pezzo alla striscia.
  const attacca = (id, c) => { S.fx('click', R(id, c), { vel: 40 }); S.fx('sparkle', R(id, c + 0.05), { vel: 30 }); };
  // Un'uscita sopra la vasca: il treno, le paperelle che cadono, la pesca, la corsa al vagone nuovo.
  const uscita = (id, esce, cade, pesca, salta, sale) => {
    S.fx('whoosh', R(id, esce), { dur: 1.6 });
    for (let k = 0; k < 14; k++) S.fx('pop', R(id, cade[0] + k * (cade[1] - cade[0]) / 14), { vel: 24 + (k % 3) * 6 });
    if (pesca !== undefined) { S.fx('sparkle', R(id, pesca), { vel: 44 }); S.fx('chime', R(id, pesca + 0.3)); }
    if (salta !== undefined) { S.fx('boing', R(id, salta), { vel: 38 }); for (let k = 0; k < 4; k++) S.fx('woodblock', R(id, salta + 0.4 + k * 0.18), { vel: 22 }); }
    if (sale !== undefined) S.fx('ding', R(id, sale), { vel: 36 });
  };
  // Un messaggio scritto: i tasti, l'invio.
  const scrive = (id, a, b, invio) => { for (let t = a; t < b; t += 0.22) S.fx('tick', R(id, t), { vel: 14 }); S.fx('click', R(id, invio), { vel: 40 }); S.fx('whoosh', R(id, invio + 0.15), { dur: 0.6, vel: 30 }); };
  // La domanda.
  [2.0, 7.0].forEach(c => S.fx('whoosh', R('domanda', c), { dur: 0.5, vel: 26 }));
  volo('domanda', 7.4, 10.0);
  attacca('domanda', 11.6);
  S.fx('woodblock', R('domanda', 13.4), { vel: 26 });
  [16.1, 16.4, 16.7].forEach(c => { S.fx('click', R('domanda', c), { vel: 44 }); S.fx('doubleclick', R('domanda', c + 0.05), { vel: 30 }); });
  uscita('domanda', 15.6, [19.6, 22.4]);
  // Al parco, nuota.
  S.fx('sparkle', R('pesca', 2.4), { vel: 44 }); S.fx('chime', R('pesca', 2.7));
  S.fx('boing', R('pesca', 3.4), { vel: 38 }); for (let k = 0; k < 4; k++) S.fx('woodblock', R('pesca', 3.8 + k * 0.18), { vel: 22 });
  S.fx('ding', R('pesca', 4.8), { vel: 36 });
  S.fx('pop', R('pesca', 7.4), { vel: 40 });
  // La pagina nuova.
  volo('pagina', 2.6, 5.0);
  [6.0, 6.8].forEach(c => S.fx('whoosh', R('pagina', c), { dur: 0.4, vel: 24 }));
  S.fx('whoosh', R('pagina', 11.0), { dur: 0.5, vel: 22 });
  [13.4, 14.8, 16.0].forEach(c => attacca('pagina', c));
  // Le bandierine: la striscia nella fessura, zac zac, i biglietti, i passeggeri; le sbarre, la partenza.
  [1.8, 2.75, 3.7, 4.65, 5.6, 6.55, 7.5, 8.45, 9.4].forEach(c => {
    S.fx('click', R('salgono', c), { vel: 56 }); S.fx('doubleclick', R('salgono', c + 0.05), { vel: 38 });
    S.fx('pop', R('salgono', c + 0.1), { vel: 40 }); S.fx('sparkle', R('salgono', c + 1.45), { vel: 30 }); S.fx('ding', R('salgono', c + 1.6), { vel: 22 });
  });
  S.fx('boing', R('salgono', 21.0), { vel: 30 });
  for (let k = 0; k < 9; k++) S.fx('click', R('salgono', 23.2 + k * 0.06), { vel: 30 });
  S.fx('whoosh', R('salgono', 24.0), { dur: 2.0 });
  // Fino in testa: la corsa nella montagna; i fili; la lampadina.
  for (let k = 0; k < 10; k++) S.fx('tick', R('fili', 0.2 + k * 0.2), { vel: 20 });
  S.fx('whoosh', R('fili', 2.6), { dur: 1.4 });
  [5.0, 10.4, 11.1, 11.8].forEach(c => S.fx('sparkle', R('fili', c), { vel: 30 }));
  S.note('vib', 'E5', { t: R('fili', 15.6), dur: 2.4, vel: 32 });
  // Le finestre: i clac degli scambi, le paperelle di luce.
  [[6.2, 0.16], [16.6, 0.13], [26.0, 0.13]].forEach(([a, p]) => { for (let i = 0; i < 9; i++) S.fx('doubleclick', R('finestre', a + i * p - 0.35), { vel: 44 }); });
  [13.0, 22.4, 31.8].forEach((c, k) => { S.fx('chime', R('finestre', c - 0.4)); S.note('vib', ['E3', 'G3', 'C4'][k], { t: R('finestre', c), dur: 2.4, vel: 30 }); });
  S.fx('whoosh', R('finestre', 38.6), { dur: 2.4 });
  // Al parco!: tre uscite, due messaggi, la striscia lunga, il treno coi tre Parco.
  uscita('insiste', 0.4, [2.4, 4.6], 6.2, 7.0, 8.0);
  S.fx('pop', R('insiste', 8.6), { vel: 36 });
  for (let k = 0; k < 6; k++) S.fx('woodblock', R('insiste', 9.6 + k * 0.2), { vel: 14 });
  scrive('insiste', 11.0, 12.8, 13.2);
  S.fx('whoosh', R('insiste', 14.0), { dur: 1.2 });
  attacca('insiste', 15.6);
  uscita('insiste', 17.8, [20.6, 23.0], 24.5, 25.3, 26.2);
  scrive('insiste', 27.2, 28.8, 29.0);
  [29.8, 30.4, 31.0].forEach(c => S.fx('ding', R('insiste', c), { vel: 22, pitch: 'G6' }));
  uscita('insiste', 31.4, [35.0, 37.2], 38.3);
  S.fx('pop', R('insiste', 40.2), { vel: 40 });
  S.fx('boing', R('insiste', 40.8), { vel: 30 });
  // Il regolamento: il quaderno, il libro, il dito, la partenza.
  [2.0, 7.4].forEach(c => S.fx('whoosh', R('custode', c), { dur: 0.5, vel: 26 }));
  S.fx('whoosh', R('custode', 9.0), { dur: 0.4, vel: 22 });
  for (let k = 0; k < 6; k++) S.fx('woodblock', R('custode', 11.3 + k * 0.63), { vel: 26 });
  for (let k = 0; k < 19; k++) S.fx('click', R('custode', 16.4 + k * 0.04), { vel: 22 });
  S.fx('whoosh', R('custode', 17.4), { dur: 2.6 });
  // La giostrina: la striscia, i passi del custode che se ne va.
  volo('giostrina', 0.4, 2.6);
  for (let k = 0; k < 14; k++) S.fx('woodblock', R('giostrina', 3.6 + k * 0.52), { vel: 14 - Math.round(k / 2) });
  // La matita della coda: un tratto ogni mezzo secondo, per ogni schizzo.
  [[1.4, 2], [12.0, 3], [21.8, 2]].forEach(([a, n]) => { for (let k = 0; k < n * 2; k++) S.fx('tick', R('coda', a + k * 0.25), { vel: 14 }); });
});
