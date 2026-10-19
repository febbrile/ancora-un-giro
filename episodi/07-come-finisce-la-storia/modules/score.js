kit.score(function (S, T) {
  // Musica originale: la ninna nanna del salotto; fuori, il valzerino del luna park, sempre più svelto giro dopo giro;
  // dentro, il tema sospeso che a ogni finestra si fa più scuro. Quando la stazione si spegne la musica si chiude;
  // alla fine riparte piano, per il quaderno e la striscia nuova. Gli accordi stanno sul pad (per lo stile «anni 90»).
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
  const R = (id, x) => T[id] + window.G.reale('07', id, x);
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
  // La domanda: il salotto, poi il luna park.
  sez(T.domanda, R('domanda', 7.4), ['Am', 'F', 'C', 'G'], { pad: 26, keys: 24 });
  sez(R('domanda', 7.4), R('domanda', 17.0), giro, { pad: 28, mallet: 'x...x.x.', mv: 34, bass: 44 });
  // Giro dopo giro: il valzerino si fa più svelto.
  sez(T.giri, R('giri', 15.4), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 40, bass: 50 });
  sez(R('giri', 15.4), T.quaderno, giro, { pad: 30, mallet: 'xxx.X.x.', mv: 42, box: 'x.x.x.x.', bv: 28, bass: 54 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('giri', 0.4))), repeat: 4, vel: 30 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('giri', 15.4))), repeat: 7, vel: 34 });
  // Il quaderno: piano, sfogliando all'indietro.
  sez(T.quaderno, T.punto, ['Dm', 'Am', 'F', 'G'], { pad: 26, vib: 24 });
  // Il punto.
  sez(T.punto, T.finestre, ['C', 'Am', 'Dm', 'G'], { pad: 28, mallet: 'x.x.X.x.', mv: 38, bass: 48 });
  // Dentro: sospeso, e a ogni finestra più scuro.
  sez(T.finestre, R('finestre', 15.0), ['Em', 'C', 'Am', 'G'], { pad: 28, vib: 26 });
  sez(R('finestre', 15.0), R('finestre', 24.4), ['Am', 'F', 'Em', 'Am'], { pad: 28, box: 'x...x...', bv: 26 });
  sez(R('finestre', 24.4), T.vasca, ['Dm', 'Am', 'Em', 'Am'], { pad: 30, vib: 22, bass: 40 });
  // La vasca scura.
  sez(T.vasca, T.pesca, ['Am', 'Dm', 'Am', 'Em'], { pad: 26, keys: 22 });
  // L'ultima pesca: la musica si assottiglia, e quando la stazione è spenta si chiude.
  sez(T.pesca, R('pesca', 11.0), ['Am', 'F', 'Dm', 'G'], { pad: 26, vib: 20 });
  sez(R('pesca', 11.0), R('pesca', 15.6), ['F', 'Dm'], { pad: 22 });
  S.chord('pad', C.C, { t: R('pesca', 15.8), dur: 3.2, vel: 30 });
  S.chord('keys', ['C4', 'E4', 'G4', 'C5'], { t: R('pesca', 15.8), dur: 2.6, vel: 26 });
  S.note('bass', 'C2', { t: R('pesca', 15.8), dur: 2.4, vel: 40 });
  // Come finisce: riparte piano.
  sez(R('fine', 1.0), R('fine', 24.2), ['F', 'C', 'Am', 'G'], { pad: 24, vib: 22 });
  // I due cartelli: il titolo e la fine.
  [R('domanda', 17.0), R('fine', 24.2)].forEach((a, k) => {
    S.fx('revswell', a - 0.6, { dur: 1.2 });
    S.chord('pad', C.C, { t: a, dur: 3.8, vel: 42 });
    S.chord('keys', ['C4', 'E4', 'G4', 'C5'], { t: a, dur: 3.4, vel: 44 });
    S.note('bass', 'C2', { t: a, dur: 2.6, vel: 58 });
    S.run('box', k ? ['C5', 'E5', 'G5', 'C6', 'E6', 'G6'] : ['C5', 'E5', 'G5', 'C6'], { t: a - 0.2, step: 0.12, vel: 44, cresc: 8 });
    S.fx('chime', a + 0.9);
  });

  // ── Rumori ─────────────────────────────────────────────────────────────────────────────────────────
  // La domanda: i puntini che pulsano; il treno sul cielo che sparisce nella montagna.
  for (let k = 0; k < 5; k++) S.fx('tick', R('domanda', 0.6 + k * 1.26), { vel: 10 });
  S.fx('whoosh', R('domanda', 7.4), { dur: 2.4 });
  S.fx('whoosh', R('domanda', 10.6), { dur: 1.6 });
  // Un giro dopo l'altro: l'uscita, le paperelle, la pesca, la corsa al vagone nuovo, il telefono, la partenza.
  const uscita = (id, esce, cade, pesca, salta, vagone, sale, tel) => {
    S.fx('whoosh', R(id, esce), { dur: 1.6 });
    for (let k = 0; k < 14; k++) S.fx('pop', R(id, cade[0] + k * (cade[1] - cade[0]) / 14), { vel: 26 + (k % 3) * 6 });
    S.fx('sparkle', R(id, pesca), { vel: 46 }); S.fx('chime', R(id, pesca + 0.3));
    S.fx('boing', R(id, salta), { vel: 40 });
    for (let k = 0; k < 5; k++) S.fx('woodblock', R(id, salta + 0.6 + k * 0.2), { vel: 24 });
    S.fx('sparkle', R(id, vagone), { vel: 40 }); S.fx('ding', R(id, sale), { vel: 38 });
    S.fx('pop', R(id, tel), { vel: 40 });
  };
  uscita('giri', 0.4, [2.1, 3.9], 6.4, 7.4, 8.4, 9.0, 9.9);
  for (let k = 0; k < 10; k++) S.fx('tick', R('giri', 11.0 + k * 0.22), { vel: 24 });
  S.fx('whoosh', R('giri', 13.4), { dur: 1.8 });
  uscita('giri', 15.4, [17.5, 19.6], 24.8, 26.0, 26.8, 27.4, 30.7);
  // La paperella scura, nell'angolo: e poi scivola via.
  S.note('vib', 'A3', { t: R('giri', 21.0), dur: 1.6, vel: 30 });
  S.run('box', ['E5', 'C5', 'A4'], { t: R('giri', 27.0), step: 0.22, vel: 26 });
  for (let k = 0; k < 8; k++) S.fx('tick', R('giri', 31.8 + k * 0.24), { vel: 22 });
  // Il quaderno: il treno se ne va; le pagine che si girano.
  S.fx('whoosh', R('quaderno', 0.2), { dur: 1.4 });
  [2.2, 3.0, 3.8, 4.8].forEach(c => S.fx('whoosh', R('quaderno', c), { dur: 0.5, vel: 30 }));
  S.note('vib', 'A3', { t: R('quaderno', 9.0), dur: 2.0, vel: 30 });
  // Il punto: l'uscita, Ada che indica, la pesca, il telefono, la partenza.
  uscita('punto', 0.6, [2.9, 4.8], 9.8, 10.8, 11.4, 11.9, 14.0);
  for (let k = 0; k < 4; k++) S.fx('woodblock', R('punto', 5.4 + k * 0.75), { vel: 20 });
  for (let k = 0; k < 6; k++) S.fx('tick', R('punto', 15.0 + k * 0.2), { vel: 22 });
  // Dentro: i fili, i clac degli scambi, le finestre.
  [1.6, 2.4, 3.2, 15.0, 24.4].forEach(c => S.fx('sparkle', R('finestre', c), { vel: 30 }));
  [[6.2, 0.2], [16.6, 0.16], [26.0, 0.16]].forEach(([a, p]) => { for (let i = 0; i < 7; i++) S.fx('doubleclick', R('finestre', a + i * p - 0.35), { vel: 44 }); });
  [13.0, 22.4, 31.8].forEach((c, k) => { S.fx('chime', R('finestre', c - 0.4)); S.note('vib', ['E3', 'D3', 'A2'][k], { t: R('finestre', c), dur: 2.4, vel: 30 }); });
  S.fx('whoosh', R('finestre', 38.6), { dur: 2.4 });
  // La vasca scura: passano gli altri vagoni, e niente; poi le paperelle.
  S.fx('whoosh', R('vasca', 0.6), { dur: 1.6 });
  for (let k = 0; k < 20; k++) S.fx('pop', R('vasca', 6.0 + k * 0.1), { vel: 22 + (k % 3) * 6 });
  S.fx('whoosh', R('vasca', 13.5), { dur: 0.5, vel: 26 });
  // L'ultima pesca: la paperella scura resta in mano; il fanale, le lampadine; il salotto, la lampada.
  S.fx('sparkle', R('pesca', 3.2), { vel: 30 });
  S.note('vib', 'A2', { t: R('pesca', 3.6), dur: 2.4, vel: 34 });
  S.fx('click', R('pesca', 11.2), { vel: 40 });
  for (let k = 0; k < 15; k++) S.fx('tick', R('pesca', 13.0 + k * 0.2), { vel: 22 - k });
  S.fx('doubleclick', R('pesca', 20.8), { vel: 42 });
  // Come finisce: la matita, la paperella che scivola via, la striscia nuova.
  for (let k = 0; k < 12; k++) S.fx('tick', R('fine', 2.9 + k * 0.17), { vel: 14 });
  S.fx('pop', R('fine', 11.8), { vel: 30 });
  S.fx('whoosh', R('fine', 12.4), { dur: 1.4, vel: 30 });
  S.fx('whoosh', R('fine', 15.0), { dur: 3.0 });
  S.fx('pop', R('fine', 18.0), { vel: 40 });
});
