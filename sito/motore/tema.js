// Il tema dell'episodio: un giro di accordi che si ripete uguale dall'inizio alla fine, senza seguire le scene.
// Le frasi si scrivono in episodi/NN-titolo/audio/tracce.json; accordi e timbri sono quelli di score.js.
// Il tema si scrive con gli stessi comandi della partitura (S.chord, S.pattern, …), così anni90.js lo sa riarrangiare.
(function () {
  'use strict';

  const C = { D: ['D3', 'F#3', 'A3', 'D4'], Bm: ['B2', 'D3', 'F#3', 'B3'], G: ['G2', 'B2', 'D3', 'G3'], A: ['A2', 'C#3', 'E3', 'A3'], Em: ['E3', 'G3', 'B3', 'E4'], Fm: ['F#2', 'A2', 'C#3', 'F#3'] };
  const ROOT = { D: 'D2', Bm: 'B1', G: 'G1', A: 'A1', Em: 'E2', Fm: 'F#2' };
  const ARP = { D: ['D5', 'A4', 'F#4', 'A4'], Bm: ['B4', 'F#4', 'D4', 'F#4'], G: ['B4', 'G4', 'D4', 'G4'], A: ['C#5', 'A4', 'E4', 'A4'], Em: ['B4', 'G4', 'E4', 'G4'], Fm: ['C#5', 'A4', 'F#4', 'A4'] };

  // Un giro del tema: { eventi, griglia, durata }. Ogni accordo dura una battuta da quattro battiti.
  // Carattere «leggero»: pad e vibrafono. «vivace»: pad, marimba e basso (in stile anni 90 diventa la parte con la batteria).
  function tema(def, griglia) {
    const bpm = (def && def.bpm) || (griglia && griglia.bpm) || 76;
    let battito = 0;
    const p = Pozzo.componiPartitura(S => {
      S.tempo(bpm, { t0: 0 });
      S.seed((def && def.seme) || 7);
      S.program('pad', 'pad', { rev: 0.65, gain: -2 });
      S.program('mallet', 'marimba', { rev: 0.3, gain: -4, pan: -0.15 });
      S.program('bass', 'bass', { gain: -4 });
      S.program('vib', 'vibes', { rev: 0.6, gain: -6 });
      ((def && def.frasi) || []).forEach(f => (f.accordi || []).forEach(c => {
        if (!C[c]) { console.warn('tema: accordo sconosciuto', c); return; }
        S.chord('pad', C[c], { beat: battito, beats: 4, vel: 30 });
        if (f.carattere === 'vivace') {
          S.pattern('mallet', 'x...x...', { from: battito, pitch: ARP[c], vel: 38 });
          S.note('bass', ROOT[c], { beat: battito, beats: 3, vel: 46 });
        } else S.pattern('vib', 'x..x..x.', { from: battito, pitch: ARP[c], vel: 26 });
        battito += 4;
      }));
    }, {});
    return { eventi: p.eventi, griglia: p.griglia, durata: battito * 60 / bpm };
  }

  // Ripete un giro fino alla fine del film.
  function ripeti(eventi, giro, durata) {
    const out = [];
    if (!(giro > 0)) return out;
    for (let k = 0; k * giro < durata; k++) eventi.forEach(e => { const t = e.t + k * giro; if (t < durata) out.push(Object.assign({}, e, { t })); });
    return out.sort((a, b) => a.t - b.t);
  }

  window.Pozzo = Object.assign(window.Pozzo || {}, { tema, ripeti });
})();
