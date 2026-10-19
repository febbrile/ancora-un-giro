kit.score(function (S, T) {
  // Musica originale. Oggi: il valzerino del luna park. Il passato (i treni di prova) ha un colore suo, più sospeso:
  // accordi minori e senza fondamentale, vibrafono lento, niente batteria; si apre in maggiore quando il parco si accende.
  // Gli accordi stanno sul pad (servono anche allo stile «anni 90» del sito).
  const BPM = 84, B = 60 / BPM;
  S.tempo(BPM, { t0: 0 });
  S.program('pad', 'pad', { rev: 0.6, gain: -3 });
  S.program('keys', 'ep', { rev: 0.4, gain: -7 });
  S.program('box', 'glock', { rev: 0.5, gain: -7, pan: 0.2 });
  S.program('mallet', 'marimba', { rev: 0.3, gain: -5, pan: -0.15 });
  S.program('vib', 'vibes', { rev: 0.7, gain: -7 });
  S.program('bass', 'bass', { gain: -5 });
  const C = {
    C: ['C3', 'E3', 'G3', 'C4'], Am: ['A2', 'C3', 'E3', 'A3'], F: ['F2', 'A2', 'C3', 'F3'], G: ['G2', 'B2', 'D3', 'G3'], Em: ['E3', 'G3', 'B3', 'E4'], Dm: ['D3', 'F3', 'A3', 'D4'],
    // Il passato: accordi sospesi.
    Asus: ['A2', 'D3', 'E3', 'A3'], Esus: ['E3', 'A3', 'B3', 'E4'], Dsus: ['D3', 'G3', 'A3', 'D4'], Fmaj7: ['F2', 'A2', 'C3', 'E3'],
  };
  const ROOT = { C: 'C2', Am: 'A1', F: 'F1', G: 'G1', Em: 'E2', Dm: 'D2', Asus: 'A1', Esus: 'E2', Dsus: 'D2', Fmaj7: 'F1' };
  const ARP = { C: ['C5', 'G4', 'E4', 'G4'], Am: ['A4', 'E4', 'C4', 'E4'], F: ['A4', 'F4', 'C4', 'F4'], G: ['B4', 'G4', 'D4', 'G4'], Em: ['B4', 'G4', 'E4', 'G4'], Dm: ['A4', 'F4', 'D4', 'F4'],
    Asus: ['A4', 'E4', 'D4', 'E4'], Esus: ['B4', 'A4', 'E4', 'A4'], Dsus: ['A4', 'G4', 'D4', 'G4'], Fmaj7: ['E5', 'C5', 'A4', 'C5'] };
  const bt = t => t / B;
  // I tempi dentro una scena sono interni: R li porta al tempo vero (vedi il ritmo in shared.js).
  const R = (id, x) => T[id] + window.G.reale('05', id, x);
  const su = n => n.replace(/(\d)$/, d => String(+d + 1));
  function sez(a, b, seq, o) {
    o = o || {};
    const b0 = Math.ceil(bt(a)), b1 = Math.floor(bt(b));
    for (let x = b0, i = 0; x + 1 < b1; x += 4, i++) {
      const c = seq[i % seq.length], len = Math.min(4, b1 - x);
      S.chord('pad', C[c], { beat: x, beats: len, vel: o.pad || 30 });
      if (o.keys) S.chord('keys', C[c].map(su), { beat: x, beats: Math.min(3.5, len), vel: o.keys });
      if (o.mallet && len >= 4) S.pattern('mallet', o.mallet, { from: x, pitch: ARP[c], vel: o.mv || 42 });
      if (o.box && len >= 4) S.pattern('box', o.box, { from: x, pitch: ARP[c].map(su), vel: o.bv || 34 });
      if (o.vib && len >= 4) S.pattern('vib', o.vibp || 'x..x..x.', { from: x, pitch: ARP[c], vel: o.vib });
      if (o.bass) { S.note('bass', ROOT[c], { beat: x, beats: 1.5, vel: o.bass }); if (len >= 4) S.note('bass', su(ROOT[c]), { beat: x + 2, beats: 1.5, vel: o.bass - 8 }); }
    }
  }
  const giro = ['C', 'Am', 'F', 'G'], passato = ['Asus', 'Fmaj7', 'Dsus', 'Esus'];
  // Oggi: la domanda.
  sez(T.domanda, R('domanda', 21.4), ['Am', 'F', 'C', 'G'], { pad: 28, keys: 26, mallet: 'x...x...', mv: 30 });
  // Indietro: il tempo si riavvolge, poi il parco è chiuso.
  sez(T.indietro, R('indietro', 11), ['Am', 'G', 'F', 'Em'], { pad: 26, vib: 22, vibp: 'x.x.x.x.' });
  sez(R('indietro', 11), T.prova, ['Asus'], { pad: 24 });
  // Il passato: sospeso.
  sez(T.prova, R('prova', 15), passato, { pad: 26, vib: 24 });
  sez(R('prova', 15), T.dritta, passato, { pad: 28, vib: 26, mallet: 'x.....x.', mv: 30 });
  sez(T.dritta, R('dritta', 31), ['Esus', 'Esus', 'Asus', 'Asus'], { pad: 24, vib: 22 });
  sez(R('dritta', 31), T.brivido, ['Fmaj7', 'Dsus', 'Asus'], { pad: 28, mallet: 'x...x...', mv: 30 });
  sez(T.brivido, R('brivido', 21.6), ['Asus', 'Esus', 'Dsus', 'Esus'], { pad: 30, vib: 24, vibp: 'x...x...' });
  sez(R('brivido', 21.6), T.notti, ['Fmaj7', 'Dsus', 'Asus', 'Asus'], { pad: 26, keys: 22 });
  // Notti e notti: il montaggio prende passo, e si avvicina al maggiore.
  sez(T.notti, R('notti', 11), passato, { pad: 28, box: 'x.x.x.x.', bv: 26, bass: 40 });
  sez(R('notti', 11), T.finestre, ['Am', 'F', 'Dm', 'G'], { pad: 28, box: 'x.x.x.x.', bv: 28, bass: 44 });
  // Le ultime notti: come dentro la montagna di oggi.
  sez(T.finestre, R('finestre', 29.6), ['F', 'G', 'C', 'Am'], { pad: 30, vib: 24, mallet: 'x...x...', mv: 32, bass: 40 });
  sez(R('finestre', 29.6), T.apre, ['F', 'G', 'C', 'C'], { pad: 34, keys: 30 });
  // Il parco apre.
  sez(T.apre, R('apre', 14.2), ['Am', 'F', 'Dsus', 'G'], { pad: 28, vib: 24 });
  sez(R('apre', 14.2), T.oggi, giro, { pad: 32, keys: 30, box: 'x.x.x.x.', bv: 30, bass: 46 });
  // Di nuovo oggi.
  sez(T.oggi, R('oggi', 17), giro, { pad: 28, mallet: 'x.x.X.x.', mv: 40, bass: 50 });
  sez(R('oggi', 17), T.fine, ['F', 'C', 'Dm', 'G'], { pad: 28, keys: 28 });
  sez(T.fine, R('fine', 15), ['Am', 'F', 'Dm', 'G'], { pad: 28, keys: 26, vib: 22 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('oggi', 0.6))), repeat: 5, vel: 30 });
  S.drums({ kick: 'x...x...', shaker: 'oxoxoxox' }, { from: Math.ceil(bt(R('apre', 14.2))), repeat: 3, vel: 28 });
  // I due cartelli: il titolo e la fine.
  [R('domanda', 21.4), R('fine', 15.0)].forEach((a, k) => {
    S.fx('revswell', a - 0.6, { dur: 1.2 });
    S.chord('pad', C.C, { t: a, dur: 3.8, vel: 42 });
    S.chord('keys', ['C4', 'E4', 'G4', 'C5'], { t: a, dur: 3.4, vel: 44 });
    S.note('bass', 'C2', { t: a, dur: 2.6, vel: 58 });
    S.run('box', k ? ['C5', 'E5', 'G5', 'C6', 'E6', 'G6'] : ['C5', 'E5', 'G5', 'C6'], { t: a - 0.2, step: 0.12, vel: 44, cresc: 8 });
    S.fx('chime', a + 0.9);
  });

  // ── Rumori ─────────────────────────────────────────────────────────────────────────────────────────
  // La domanda: il trenino sparisce nella montagna; un riflesso sui binari; i treni che dormono.
  for (let k = 0; k < 10; k++) S.fx('tick', R('domanda', 0.1 + k * 0.3), { vel: 22 });
  S.fx('whoosh', R('domanda', 2.6), { dur: 1.6 });
  S.fx('sparkle', R('domanda', 6.6), { vel: 26 });
  S.fx('woodblock', R('domanda', 11.4), { vel: 18 }); S.fx('woodblock', R('domanda', 11.9), { vel: 14 });
  // Indietro: il tempo si riavvolge, le notti tornano indietro, le luci si spengono, arrivano i treni grigi.
  S.fx('revswell', R('indietro', 2.6), { dur: 2.4 });
  for (let k = 0; k < 22; k++) { const x = 3.2 + 7.4 * Math.pow(k / 22, 0.7); S.fx('woodblock', R('indietro', x), { vel: 18 + k }); }
  [6.0, 7.4, 8.6, 9.6].forEach(c => S.fx('click', R('indietro', c), { vel: 24 }));
  S.fx('revswell', R('indietro', 8.4), { dur: 2.2 });
  [10.2, 10.6].forEach(c => S.fx('sparkle', R('indietro', c), { vel: 30 }));
  // I treni di prova: il treno sale, la città, la nevicata di strisce, lo Spezzaparole, i biglietti, la lanterna.
  for (let k = 0; k < 16; k++) S.fx('tick', R('prova', 0.3 + k * 0.32), { vel: 20 });
  S.fx('whoosh', R('prova', 5.6), { dur: 1.6 });
  S.fx('sparkle', R('prova', 8.0), { vel: 26 });
  [8.6, 10.0, 11.4].forEach(c => S.fx('whoosh', R('prova', c), { dur: 1.8, vel: 30 }));
  for (let k = 0; k < 8; k++) S.fx('tick', R('prova', 15.2 + k * 0.4), { vel: 16 });
  S.fx('whoosh', R('prova', 15.0), { dur: 2.2 });
  for (let k = 0; k < 6; k++) S.fx('tick', R('prova', 17.8 + k * 0.12), { vel: 22 });
  [18.6, 19.1, 19.6].forEach(c => { S.fx('click', R('prova', c), { vel: 56 }); S.fx('doubleclick', R('prova', c + 0.05), { vel: 38 }); });
  [20.2, 20.6, 21.0, 21.4].forEach(c => S.fx('pop', R('prova', c), { vel: 44 }));
  [20.2, 20.6, 21.0].forEach(c => { S.fx('sparkle', R('prova', c + 1.45), { vel: 34 }); S.fx('ding', R('prova', c + 1.6), { vel: 26 }); });
  S.fx('chime', R('prova', 22.7)); S.fx('sparkle', R('prova', 22.8), { vel: 36 });
  for (let k = 0; k < 3; k++) S.fx('click', R('prova', 26.4 + k * 0.15), { vel: 36 });
  // La pista dritta: la partenza, i fili che si accendono (senza colori), nessun clac; le finestre; l'uscita.
  for (let k = 0; k < 10; k++) S.fx('tick', R('dritta', 0.8 + k * 0.26), { vel: 24 });
  S.fx('whoosh', R('dritta', 3.4), { dur: 1.6 });
  [6.4, 15.8, 22.6].forEach(c => S.fx('sparkle', R('dritta', c), { vel: 18 }));
  [13.4, 20.4, 27.2].forEach(c => S.fx('chime', R('dritta', c - 0.4), { vel: 40 }));
  S.fx('whoosh', R('dritta', 30.2), { dur: 2.0 });
  for (let k = 0; k < 14; k++) S.fx('pop', R('dritta', 32.4 + k * 0.12), { vel: 24 + (k % 3) * 6 });
  for (let k = 0; k < 10; k++) S.fx('tick', R('dritta', 35.0 + k * 0.3), { vel: 18 });
  // Il brivido: la lanterna, l'acqua che trema, l'onda; dentro, clic, clic, clic; fuori, tutto si spegne.
  S.fx('chime', R('brivido', 1.6), { vel: 34 });
  [2.6, 3.4].forEach(c => S.fx('ding', R('brivido', c), { vel: 22 }));
  S.fx('revswell', R('brivido', 4.2), { dur: 1.2 });
  S.fx('whoosh', R('brivido', 5.8), { dur: 2.6, vel: 40 });
  S.fx('whoosh', R('brivido', 9.4), { dur: 1.4, vel: 30 });
  [1300, 1420, 1540, 2500, 2620, 2740, 3700, 3820, 3940].forEach(x => S.fx('click', R('brivido', 10.4 + (x - 95 - 410) / 420), { vel: 44 }));
  [22.4, 23.0, 23.6].forEach(c => S.fx('sparkle', R('brivido', c), { vel: 32 }));
  S.fx('revswell', R('brivido', 24.4), { dur: 1.4, vel: 28 });
  S.fx('whoosh', R('brivido', 25.6), { dur: 1.8 });
  // Notti e notti: a ogni treno la partenza e il brivido; per «Al mare Emma», le paperelle.
  [[0, null, 3.0], [6.4, null, 8.4], [11.0, 12.8, 16.2], [18.0, 19.4, 23.0]].forEach(([s, v, b]) => {
    for (let k = 0; k < 5; k++) S.fx('tick', R('notti', s + 0.8 + k * 0.24), { vel: 20 });
    if (v !== null) { for (let k = 0; k < 10; k++) S.fx('pop', R('notti', v + 0.4 + k * 0.15), { vel: 24 + (k % 3) * 6 }); S.fx('revswell', R('notti', v + 2.2), { dur: 0.8 }); }
    S.fx('whoosh', R('notti', b + 0.3), { dur: 1.6, vel: 34 });
    [0.8, 1.2, 1.6].forEach(c => S.fx('click', R('notti', b + c), { vel: 22 }));
  });
  // Le finestre: fili, clac, finestre, uscita, il brivido piccolo.
  S.fx('whoosh', R('finestre', 0.6), { dur: 1.6 });
  [3.2, 3.9, 4.6].forEach(c => S.fx('sparkle', R('finestre', c), { vel: 32 }));
  S.fx('chime', R('finestre', 4.8));
  [8.6, 8.9, 9.2, 15.4, 15.7, 16.0, 22.8, 23.1, 23.4].forEach(c => S.fx('doubleclick', R('finestre', c - 0.35), { vel: 48 }));
  [13.4, 20.8].forEach(c => S.fx('sparkle', R('finestre', c), { vel: 28 }));
  [11.0, 18.4, 25.8].forEach(c => S.fx('chime', R('finestre', c - 0.4)));
  S.fx('whoosh', R('finestre', 28.8), { dur: 2.0 });
  for (let k = 0; k < 16; k++) S.fx('pop', R('finestre', 31.0 + k * 0.12), { vel: 26 + (k % 3) * 6 });
  S.fx('whoosh', R('finestre', 34.4), { dur: 1.2, vel: 20 });
  // Il parco apre: gli ultimi brividi, i treni grigi a dormire, il trenino crema, le luci, la città, il telefono.
  [0.4, 1.7, 3.0, 4.3].forEach((c, k) => S.fx('whoosh', R('apre', c), { dur: 1.2, vel: 30 - k * 5 }));
  S.fx('sparkle', R('apre', 5.2), { vel: 24 });
  [6.6, 8.0, 9.4].forEach(c => { for (let k = 0; k < 6; k++) S.fx('tick', R('apre', c + k * 0.4), { vel: 18 }); S.fx('click', R('apre', c + 2.9), { vel: 30 }); });
  for (let k = 0; k < 8; k++) S.fx('tick', R('apre', 11.8 + k * 0.28), { vel: 20 });
  S.fx('sparkle', R('apre', 14.2), { vel: 54 }); S.fx('chime', R('apre', 14.25), { vel: 60 });
  S.chord('keys', ['C4', 'E4', 'G4', 'C5', 'E5'], { t: R('apre', 14.2), dur: 2.4, vel: 50, spread: 0.04 });
  [18.0, 18.5, 18.9, 19.3].forEach(c => S.fx('ding', R('apre', c), { vel: 18 }));
  S.fx('click', R('apre', 20.4), { vel: 30 });
  // Oggi: Emma blu, la pesca, la paperella sale, la stessa frase, lo stesso giro, Ada sui binari.
  S.fx('whoosh', R('oggi', 0.6), { dur: 1.6 });
  for (let k = 0; k < 16; k++) S.fx('pop', R('oggi', 3.2 + k * 0.16), { vel: 28 + (k % 3) * 6 });
  S.fx('sparkle', R('oggi', 7.3), { vel: 50 }); S.fx('chime', R('oggi', 7.6));
  S.fx('whoosh', R('oggi', 8.6), { dur: 1.6 });
  S.fx('boing', R('oggi', 9.0), { vel: 40 });
  for (let k = 0; k < 6; k++) S.fx('woodblock', R('oggi', 9.6 + k * 0.22), { vel: 26 });
  S.fx('sparkle', R('oggi', 10.2), { vel: 40 }); S.fx('ding', R('oggi', 11.0), { vel: 38 });
  S.fx('whoosh', R('oggi', 10.6), { dur: 1.4 }); S.fx('pop', R('oggi', 12.2), { vel: 36 });
  S.fx('whoosh', R('oggi', 13.0), { dur: 1.6 });
  for (let k = 0; k < 16; k++) S.fx('pop', R('oggi', 14.0 + k * 0.1), { vel: 26 + (k % 3) * 6 });
  for (let k = 0; k < 5; k++) S.fx('woodblock', R('oggi', 17.5 + k * 0.2), { vel: 22 });
  S.fx('sparkle', R('oggi', 19.2), { vel: 26 });
  S.fx('ding', R('oggi', 21.2), { vel: 34 });
  // La fine: Ada torna sulla banchina, la striscia nuova, la fronte aggrottata, lo Spezzaparole.
  for (let k = 0; k < 6; k++) S.fx('pop', R('fine', 0.7 + k * 0.25), { vel: 20 });
  for (let k = 0; k < 4; k++) S.fx('woodblock', R('fine', 0.7 + k * 0.32), { vel: 24 });
  S.fx('whoosh', R('fine', 2.0), { dur: 3.0 });
  S.fx('pop', R('fine', 5.0), { vel: 40 });
  S.fx('boing', R('fine', 7.0), { vel: 30 });
  for (let k = 0; k < 8; k++) S.fx('tick', R('fine', 9.6 + k * 0.4), { vel: 18 });
});
