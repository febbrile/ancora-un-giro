// La musica «anni 90»: la stessa partitura di score.js, riarrangiata come la colonna sonora di un videogioco.
// Gli accordi, i cambi di scena e i rumori restano quelli; cambiano i timbri (onde quadre e triangolari)
// e sugli accordi nascono arpeggi veloci, un basso che salta d'ottava, una batteria e una melodia.
(function () {
  'use strict';

  // Le parti della partitura che l'arrangiamento sostituisce, e i timbri da console per le altre.
  const TOGLI = { marimba: 1, mallet: 1, xylophone: 1, vibes: 1, vibraphone: 1, bass: 1, sub: 1 };
  const TIMBRO = { pad: 'chip-pad', strings: 'chip-pad', ep: 'chip-pad', rhodes: 'chip-pad', piano: 'chip-pad', keys: 'chip-pad',
    glock: 'chip-bell', bell: 'chip-bell', bells: 'chip-bell', celesta: 'chip-bell', pluck: 'chip-bell', kalimba: 'chip-bell' };
  const BATTERIA = { kick: 'chip-kick', bd: 'chip-kick', tom: 'chip-kick', snare: 'chip-snare', sd: 'chip-snare', clap: 'chip-snare',
    sidestick: 'chip-snare', rim: 'chip-snare', stick: 'chip-snare', woodblock: 'chip-snare' };
  // Ritmi della melodia: una battuta, otto crome.
  const RITMI = ['x.x.x.xx', 'x..x..x.', 'x.xxx.x.', 'xx.x.x..', 'x.x..xx.', 'x...x.x.', 'x.x.xx..'];

  const unici = a => [...new Set(a)].sort((x, y) => x - y);
  const dentro = (m, lo, hi) => { while (m < lo) m += 12; while (m > hi) m -= 12; return m; };

  function anni90(partitura) {
    const ev = partitura.eventi, spb = 60 / partitura.griglia.bpm;
    const ab = spb / 2;                  // il battito anni 90 va al doppio della partitura
    const caso = Pozzo.rng(90);
    const out = [];
    const metti = (t, dur, tipo, patch, midi, vel) => out.push({ t, dur, tipo, patch, midi, vel: Math.max(1, Math.min(127, Math.round(vel))), params: {} });

    // 1 · La partitura originale, con i timbri da console.
    ev.forEach(e => {
      if (e.tipo === 'rumore') { out.push(e); return; }
      if (e.tipo === 'batteria') { out.push(Object.assign({}, e, { patch: BATTERIA[e.patch] || 'chip-hat', params: {} })); return; }
      if (TOGLI[e.patch]) return;
      const p = TIMBRO[e.patch] || 'chip-bell';
      out.push(Object.assign({}, e, { patch: p, params: {}, vel: p === 'chip-pad' ? e.vel * 0.8 : e.vel }));
    });

    // 2 · Gli accordi del pad: ognuno è un pezzo da arrangiare.
    const pezzi = [];
    ev.filter(e => e.tipo === 'nota' && (e.patch === 'pad' || e.patch === 'strings')).forEach(e => {
      let s = pezzi.find(x => Math.abs(x.t - e.t) < 1e-3);
      if (!s) pezzi.push(s = { t: e.t, dur: e.dur, note: [] });
      s.note.push(e.midi); s.dur = Math.max(s.dur, e.dur);
    });
    pezzi.sort((a, b) => a.t - b.t);
    // Vivace dove la partitura originale ha basso o marimba; altrove l'arrangiamento resta leggero.
    pezzi.forEach(s => { s.vivo = ev.some(e => (e.patch === 'bass' || e.patch === 'marimba') && e.t >= s.t - 0.05 && e.t < s.t + s.dur); });

    let k = 0, prima = null;
    pezzi.forEach(s => {
      k = prima && s.t <= prima.t + prima.dur + 0.3 ? k + 1 : 0;   // posizione nella sezione
      prima = s;
      const radice = dentro(Math.min(...s.note), 33, 44);
      const toni = unici(s.note.map(m => m % 12));
      const croma = ab / 2, semi = ab / 4;
      const nCrome = Math.floor(s.dur / croma + 1e-6);

      // Basso: crome che saltano d'ottava (nelle parti leggere, solo sui battiti).
      for (let i = 0; i < nCrome; i++) {
        if (!s.vivo && i % 2) continue;
        metti(s.t + i * croma, croma * (s.vivo ? 0.75 : 1.6), 'nota', 'chip-bass', radice + (s.vivo && i % 2 ? 12 : 0), s.vivo ? 74 : 58);
      }

      // Arpeggio: su e giù per l'accordo, a semicrome dove è vivace, a crome altrove.
      const arp = unici(s.note.map(m => dentro(m, 64, 75))).concat(unici(s.note.map(m => dentro(m, 64, 75))).map(m => m + 12)).slice(0, 4);
      const giro = [0, 1, 2, 3, 2, 1];
      const passo = s.vivo ? semi : croma, nArp = Math.floor(s.dur / passo + 1e-6);
      for (let i = 0; i < nArp; i++) metti(s.t + i * passo, passo * 0.9, 'nota', 'chip-arp', arp[giro[i % giro.length] % arp.length], s.vivo ? 56 : 46);

      // Batteria: cassa sull'uno e sul tre, rullante sul due e sul quattro, charleston a crome.
      for (let i = 0; i < nCrome; i++) {
        const t = s.t + i * croma, battito = i / 2;
        if (s.vivo) {
          if (i % 2 === 0 && battito % 2 === 0) metti(t, 0.1, 'batteria', 'chip-kick', 0, 90);
          if (i % 2 === 0 && battito % 2 === 1) metti(t, 0.1, 'batteria', 'chip-snare', 0, 80);
          metti(t, 0.05, 'batteria', 'chip-hat', 0, i % 2 ? 50 : 66);
        } else if (i % 4 === 0) metti(t, 0.05, 'batteria', 'chip-hat', 0, 42);
      }

      // Melodia: due accordi sì e due no, frasi costruite sulle note dell'accordo.
      if (k % 4 < 2 && s.dur >= 2 * spb - 1e-6) {
        const pool = [];
        for (let m = 72; m <= 88; m++) if (toni.indexOf(m % 12) >= 0) pool.push(m);
        let j = Math.floor(pool.length / 2);
        const battute = Math.floor(s.dur / (4 * ab) + 1e-6), colpi = [];
        for (let b = 0; b < battute; b++) {
          const r = RITMI[Math.floor(caso() * RITMI.length)];
          for (let i = 0; i < 8; i++) if (r[i] === 'x') colpi.push(s.t + (b * 8 + i) * croma);
        }
        colpi.forEach((t, i) => {
          j = Math.max(0, Math.min(pool.length - 1, j + [-1, 0, 1, 1, 2, -2][Math.floor(caso() * 6)]));
          const fine = i + 1 < colpi.length ? colpi[i + 1] : s.t + s.dur;
          metti(t, Math.max(croma * 0.6, (fine - t) * 0.85), 'nota', 'chip-lead', pool[j], s.vivo ? 84 : 72);
        });
      }
    });

    out.sort((a, b) => a.t - b.t);
    return out;
  }

  window.Pozzo = Object.assign(window.Pozzo || {}, { anni90 });
})();
