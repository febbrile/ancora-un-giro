kit.score(function (S, T) {
  // Musica originale. La vasca sparsa, piano; il tema del custode quando apre il regolamento; la teleferica ha il suo
  // motivo, che sale (glockenspiel e vibrafono) quando la cabina parte e scende quando torna, con la pioggia. Dentro la
  // montagna il tema sospeso di sempre, che si fa chiaro come il bianco del «sì». La storia a metà resta sospesa.
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
  const R = (id, x) => T[id] + window.G.reale('12', id, x);
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
  // Il motivo della teleferica: sale (andata) o scende (ritorno).
  const filo = (a, b, su) => { const n = ['C5', 'D5', 'E5', 'G5', 'A5', 'C6', 'D6', 'E6']; const k = Math.max(2, Math.floor((b - a) / 0.3)); for (let i = 0; i < k; i++) S.note('box', n[Math.round((su ? i : k - 1 - i) * (n.length - 1) / (k - 1))], { t: a + i * (b - a) / k, dur: 0.25, vel: 26 }); };
  const carillon = (a, b) => { for (let t = a; t < b - 0.2; t += 0.24) S.note('box', ['C6', 'E6', 'G6', 'E6'][Math.round((t - a) / 0.24) % 4], { t, dur: 0.2, vel: 26 }); };
  // La domanda.
  sez(T.domanda, R('domanda', 20.4), ['Am', 'F', 'C', 'G'], { pad: 26, mallet: 'x...x...', mv: 30, bass: 40 });
  sez(R('domanda', 20.4), R('domanda', 25.0), ['Dm', 'Am', 'F', 'G'], { pad: 24, vib: 22 });
  // La teleferica: il tema del custode; poi il pilone si accende.
  sez(T.pagina, R('pagina', 9.0), suo, { pad: 26, keys: 22, bass: 38 });
  custode(R('pagina', 3.0));
  sez(R('pagina', 9.0), R('pagina', 16.0), ['C', 'G', 'Am', 'F'], { pad: 30, vib: 26, box: 'x.x.x.x.', bv: 24 });
  filo(R('pagina', 9.4), R('pagina', 12.6), true);
  sez(R('pagina', 16.0), T.viola, suo, { pad: 26, keys: 22, bass: 38 });
  custode(R('pagina', 16.4));
  // Le paperelle viola: il valzerino, giro dopo giro.
  carillon(R('viola', 0.9), R('viola', 3.1));
  sez(T.viola, R('viola', 17.6), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 38, bass: 46 });
  sez(R('viola', 17.6), T.cabina, giro, { pad: 30, mallet: 'xxx.X.x.', mv: 42, box: 'x...x...', bv: 26, bass: 50 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('viola', 17.6))), repeat: 4, vel: 30 });
  // La cabina: va, sparisce nella pioggia, torna.
  sez(T.cabina, R('cabina', 5.8), suo, { pad: 26, keys: 22 });
  sez(R('cabina', 5.8), R('cabina', 14.6), ['Am', 'F', 'Dm', 'Em'], { pad: 28, vib: 24 });
  filo(R('cabina', 5.8), R('cabina', 11.6), true);
  sez(R('cabina', 14.6), T.finestre, giro, { pad: 28, mallet: 'x...x.x.', mv: 34, bass: 44 });
  filo(R('cabina', 14.6), R('cabina', 19.4), false);
  // Dentro.
  sez(T.finestre, R('finestre', 15.0), ['Em', 'C', 'Am', 'G'], { pad: 28, vib: 24 });
  sez(R('finestre', 15.0), R('finestre', 24.4), ['C', 'Am', 'F', 'G'], { pad: 28, box: 'x...x...', bv: 26 });
  sez(R('finestre', 24.4), T.si, ['F', 'C', 'G', 'C'], { pad: 30, vib: 22, bass: 40 });
  // Sì.
  sez(T.si, R('si', 17.8), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 38, bass: 46 });
  sez(R('si', 17.8), T.sole, ['C', 'F', 'G', 'C'], { pad: 26, keys: 22 });
  // Il sole bagnato: la stessa musica, e la stessa calma.
  sez(T.sole, R('sole', 10.0), giro, { pad: 28, mallet: 'xxx.X.x.', mv: 40, bass: 48 });
  filo(R('sole', 10.0), R('sole', 12.4), true); filo(R('sole', 12.6), R('sole', 15.0), false);
  sez(R('sole', 10.0), R('sole', 22.6), ['Am', 'F', 'Dm', 'G'], { pad: 28, vib: 22 });
  sez(R('sole', 22.6), R('sole', 30.8), giro, { pad: 28, mallet: 'x...x.x.', mv: 34, bass: 44 });
  sez(R('sole', 30.8), T.storia, ['Am', 'Dm', 'F', 'Em'], { pad: 24, keys: 20 });
  // Mezza riga: la storia cresce, poi si ferma.
  sez(T.storia, R('storia', 10.0), giro, { pad: 26, box: 'x.x.x.x.', bv: 22, bass: 40 });
  sez(R('storia', 10.0), R('storia', 18.2), ['Dm', 'Am', 'Dm', 'Em'], { pad: 22, vib: 20 });
  // La coda sul quaderno: solo il pad, piano, sotto la voce.
  sez(R('coda', 1.0), R('coda', 45.0), ['C', 'Am', 'F', 'G'], { pad: 22, keys: 18 });
  // I due cartelli: il titolo e la fine.
  [R('domanda', 25.0), R('storia', 18.2)].forEach((a, k) => {
    S.fx('revswell', a - 0.6, { dur: 1.2 });
    S.chord('pad', C.C, { t: a, dur: 3.8, vel: 42 });
    S.chord('keys', ['C4', 'E4', 'G4', 'C5'], { t: a, dur: 3.4, vel: 44 });
    S.note('bass', 'C2', { t: a, dur: 2.6, vel: 58 });
    S.run('box', k ? ['C5', 'E5', 'G5', 'C6', 'E6', 'G6'] : ['C5', 'E5', 'G5', 'C6'], { t: a - 0.2, step: 0.12, vel: 44, cresc: 8 });
    S.fx('chime', a + 0.9);
  });

  // ── Rumori ─────────────────────────────────────────────────────────────────────────────────────────
  const uscita = (id, esce, cade, pesca, salta, sale) => {
    S.fx('whoosh', R(id, esce), { dur: 1.6 });
    for (let k = 0; k < 14; k++) S.fx('pop', R(id, cade[0] + k * (cade[1] - cade[0]) / 14), { vel: 24 + (k % 3) * 6 });
    if (pesca !== undefined) { S.fx('sparkle', R(id, pesca), { vel: 44 }); S.fx('chime', R(id, pesca + 0.3)); }
    if (salta !== undefined) { S.fx('boing', R(id, salta), { vel: 38 }); for (let k = 0; k < 4; k++) S.fx('woodblock', R(id, salta + 0.4 + k * 0.18), { vel: 22 }); }
    if (sale !== undefined) S.fx('ding', R(id, sale), { vel: 36 });
  };
  const zac = (id, tagli, bocca) => tagli.forEach(c => { S.fx('click', R(id, c), { vel: 52 }); S.fx('doubleclick', R(id, c + 0.05), { vel: 34 }); S.fx('pop', R(id, c + 0.1), { vel: 36 }); S.fx('sparkle', R(id, c + 1.2), { vel: 28 }); });
  const pioggia = (id, a, b) => { for (let t = a; t < b; t += 0.11) S.fx('tick', R(id, t), { vel: 8 + Math.round(4 * Math.sin(t * 7)) }); };
  // La domanda.
  S.fx('sparkle', R('domanda', 2.4), { vel: 44 }); S.fx('chime', R('domanda', 2.7)); S.fx('boing', R('domanda', 3.2), { vel: 36 }); S.fx('ding', R('domanda', 4.4), { vel: 34 });
  S.fx('pop', R('domanda', 6.2), { vel: 40 });
  uscita('domanda', 8.8, [11.0, 12.8], 14.8, 15.6, 16.8);
  S.fx('pop', R('domanda', 18.2), { vel: 40 });
  // La teleferica.
  for (let k = 0; k < 6; k++) S.fx('woodblock', R('pagina', 0.3 + k * 0.4), { vel: 14 });
  [3.0, 4.4, 8.0].forEach(c => S.fx('whoosh', R('pagina', c), { dur: 0.4, vel: 22 }));
  S.fx('click', R('pagina', 9.0), { vel: 44 }); S.fx('sparkle', R('pagina', 9.4), { vel: 36 });
  S.fx('ding', R('pagina', 12.2), { vel: 30, pitch: 'G6' });
  S.fx('click', R('pagina', 21.6), { vel: 30 }); S.fx('sparkle', R('pagina', 24.0), { vel: 34 });
  // Le paperelle viola.
  for (let k = 0; k < 3; k++) S.fx('pop', R('viola', 1.6 + k * 0.4), { vel: 20 });
  uscita('viola', 6.6, [9.0, 10.8], 12.2, 13.0, 14.2);
  for (let k = 0; k < 5; k++) S.fx('tick', R('viola', 14.8 + k * 0.5), { vel: 14 });
  uscita('viola', 17.6, [20.0, 21.4], 22.0, 22.7, 23.6);
  uscita('viola', 24.2, [26.6, 28.0], 28.6, 29.3, 30.2);
  S.fx('chime', R('viola', 30.6));
  // La cabina.
  S.fx('whoosh', R('cabina', 2.8), { dur: 0.6, vel: 22 }); S.fx('pop', R('cabina', 5.4), { vel: 32 });
  S.fx('click', R('cabina', 5.8), { vel: 40 }); S.fx('whoosh', R('cabina', 6.0), { dur: 5.4, vel: 24 });
  pioggia('cabina', 11.0, 14.0);
  S.fx('whoosh', R('cabina', 14.6), { dur: 4.6, vel: 24 }); S.fx('click', R('cabina', 19.4), { vel: 40 });
  zac('cabina', [21.4, 22.0]);
  S.fx('boing', R('cabina', 23.6), { vel: 30 });
  // Dentro.
  [1.6, 2.4, 3.2, 15.0, 24.4].forEach(c => S.fx('sparkle', R('finestre', c), { vel: 30 }));
  [[6.2, 0.1], [16.6, 0.08], [26.0, 0.08]].forEach(([a, p]) => { for (let i = 0; i < 15; i++) S.fx('doubleclick', R('finestre', a + i * p - 0.35), { vel: 40 }); });
  [13.0, 22.4, 31.8].forEach((c, k) => { S.fx('chime', R('finestre', c - 0.4)); S.note('vib', ['E4', 'G4', 'C5'][k], { t: R('finestre', c), dur: 2.4, vel: 30 }); });
  S.fx('whoosh', R('finestre', 38.6), { dur: 2.4 });
  // Sì: la bianca, la Fine, il fanale; la risposta, l'ombrello.
  uscita('si', 0.4, [3.9, 5.9], 7.4, 8.2, 9.4);
  uscita('si', 10.4, [13.7, 15.6], 16.8);
  S.fx('click', R('si', 17.8), { vel: 40 });
  S.fx('pop', R('si', 20.2), { vel: 40 });
  S.fx('whoosh', R('si', 22.6), { dur: 1.6, vel: 26 }); S.fx('woodblock', R('si', 24.2), { vel: 30 });
  // Il sole bagnato.
  [0.2, 3.4, 6.6].forEach(a => { for (let k = 0; k < 6; k++) S.fx('pop', R('sole', a + 0.5 + k * 0.16), { vel: 22 }); S.fx('sparkle', R('sole', a + 2.0), { vel: 34 }); S.fx('boing', R('sole', a + 2.4), { vel: 26 }); });
  S.fx('whoosh', R('sole', 10.0), { dur: 2.4, vel: 24 }); pioggia('sole', 11.6, 13.0); S.fx('whoosh', R('sole', 12.6), { dur: 2.4, vel: 24 });
  pioggia('sole', 15.0, 18.4);
  zac('sole', [19.6, 20.2]);
  uscita('sole', 23.4, [26.0, 28.4], 29.6);
  S.fx('pop', R('sole', 31.6), { vel: 40 }); S.fx('whoosh', R('sole', 32.4), { dur: 1.6, vel: 26 }); S.fx('woodblock', R('sole', 34.0), { vel: 30 });
  // Mezza riga: le parole che arrivano, il treno che gira; poi niente.
  [1.0, 2.6, 7.4, 8.8].forEach(c => S.fx('pop', R('storia', c), { vel: 30 }));
  S.fx('whoosh', R('storia', 3.8), { dur: 2.0, vel: 24 });
  S.fx('thud', R('storia', 10.0), { vel: 18 });
  // La matita della coda: un tratto ogni mezzo secondo, per ogni schizzo.
  [[1.4, 3], [12.8, 2], [23.8, 2]].forEach(([a, n]) => { for (let k = 0; k < n * 2; k++) S.fx('tick', R('coda', a + k * 0.25), { vel: 14 }); });
});
