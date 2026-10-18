// Il suono di «Ancora un giro»: un piccolo sintetizzatore Web Audio che suona la partitura di score.js.
// Strumenti e rumori sono fatti da noi: somigliano a quelli di Motion, ma non sono identici.
// Due stili: «calma» suona la partitura com'è; «anni 90» la suona riarrangiata da anni90.js, con voci da console.
(function () {
  'use strict';

  const hz = m => 440 * Math.pow(2, (m - 69) / 12);
  const db = g => Math.pow(10, g / 20);

  // Volume, panorama e riverbero di partenza di ogni strumento (si sommano a quelli della partitura).
  const BASE = {
    marimba: { pan: -0.1, rev: 0.35, gain: 0 }, ep: { pan: 0.25, rev: 0.45, gain: -2 }, bass: { pan: 0, rev: 0.05, gain: -3 },
    pad: { pan: 0, rev: 0.6, gain: -6 }, vibes: { pan: -0.3, rev: 0.55, gain: -2 }, glock: { pan: 0.4, rev: 0.55, gain: -6 },
    pluck: { pan: -0.15, rev: 0.35, gain: -1 }, keys: { pan: 0.1, rev: 0.3, gain: -5 },
    kick: { pan: 0, rev: 0.05, gain: 0 }, snare: { pan: 0.05, rev: 0.25, gain: -2 }, hat: { pan: 0.3, rev: 0.1, gain: -8 },
    shaker: { pan: -0.35, rev: 0.1, gain: -10 }, sidestick: { pan: 0.1, rev: 0.25, gain: -4 }, woodblock: { pan: -0.2, rev: 0.2, gain: -4 },
    tick: { pan: 0, rev: 0.12, gain: 2 }, click: { pan: 0, rev: 0.18, gain: 0 }, pop: { pan: 0, rev: 0.25, gain: -4 },
    ding: { pan: 0.15, rev: 0.5, gain: -5 }, chime: { pan: 0.15, rev: 0.55, gain: -6 }, whoosh: { pan: 0, rev: 0.3, gain: -8 },
    boing: { pan: 0, rev: 0.3, gain: -4 }, revswell: { pan: 0, rev: 0.45, gain: -8 }, roll: { pan: 0, rev: 0.2, gain: -6 },
    thud: { pan: 0, rev: 0.2, gain: -2 }, sparkle: { pan: 0.2, rev: 0.6, gain: -8 },
    // Le voci da console dello stile anni 90.
    'chip-lead': { pan: 0.1, rev: 0.2, gain: -7 }, 'chip-arp': { pan: -0.25, rev: 0.15, gain: -13 }, 'chip-bass': { pan: 0, rev: 0.03, gain: -4 },
    'chip-pad': { pan: 0, rev: 0.3, gain: -15 }, 'chip-bell': { pan: 0.2, rev: 0.3, gain: -8 },
    'chip-kick': { pan: 0, rev: 0.03, gain: -3 }, 'chip-snare': { pan: 0.05, rev: 0.12, gain: -8 }, 'chip-hat': { pan: 0.25, rev: 0.05, gain: -15 },
  };
  const ALIAS = { rhodes: 'ep', piano: 'ep', strings: 'pad', bell: 'glock', bells: 'glock', vibraphone: 'vibes', mallet: 'marimba',
    swoosh: 'whoosh', swell: 'revswell', bubble: 'pop', drop: 'thud', twinkle: 'sparkle', tap: 'click', rim: 'sidestick', stick: 'sidestick' };
  const LIVELLO = 2.0;             // volume generale prima del master (misurato: circa −18 dB RMS, come i film di Motion)
  const SOSTENUTI = { pad: 1, ep: 1, vibes: 1, keys: 1, bass: 1, 'chip-pad': 1 };   // note lunghe da riprendere a metà se si salta nel tempo

  function creaSuono(partitura, durata, stileIniziale) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    const ctx = new AC();
    const master = partitura.master;
    const versioni = { calma: partitura.eventi };
    let stile = 'calma', eventi = partitura.eventi;
    function scegli(s) {
      if (s === 'anni90' && !versioni.anni90) versioni.anni90 = Giro.anni90 ? Giro.anni90(partitura) : partitura.eventi;
      stile = versioni[s] ? s : 'calma'; eventi = versioni[stile];
    }
    scegli(stileIniziale || 'calma');

    // Catena finale: master → compressore → uscita, con un riverbero condiviso.
    const uscita = ctx.createGain(); uscita.gain.value = db(master.gain + 6);
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -8; comp.knee.value = 6; comp.ratio.value = 8; comp.attack.value = 0.003; comp.release.value = 0.2;
    uscita.connect(comp).connect(ctx.destination);
    const riverbero = ctx.createConvolver(); riverbero.buffer = risposta(ctx, 2.6);
    const ritorno = ctx.createGain(); ritorno.gain.value = 0.55;
    riverbero.connect(ritorno).connect(uscita);
    const muto = ctx.createGain(); muto.connect(uscita);
    const rumoreBianco = rumore(ctx, 2);

    let sessione = null;
    let caso = Giro.rng(11);

    function risposta(ctx, sec) {
      const n = Math.floor(ctx.sampleRate * sec), b = ctx.createBuffer(2, n, ctx.sampleRate), r = Giro.rng(5);
      for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); for (let i = 0; i < n; i++) d[i] = (r() * 2 - 1) * Math.pow(1 - i / n, 2.6); }
      return b;
    }
    function rumore(ctx, sec) {
      const n = Math.floor(ctx.sampleRate * sec), b = ctx.createBuffer(1, n, ctx.sampleRate), r = Giro.rng(3), d = b.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = r() * 2 - 1;
      return b;
    }

    // Una voce: panorama, mandata al riverbero, e il bus della sessione (che si zittisce quando si ferma).
    function voce(p, amp, fine) {
      const g = ctx.createGain(); g.gain.value = amp;
      const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      const entra = pan || g;
      if (pan) { pan.pan.value = Math.max(-1, Math.min(1, p.pan || 0)); pan.connect(g); }
      g.connect(sessione.secco);
      const mand = ctx.createGain(); mand.gain.value = Math.max(0, Math.min(1, p.rev || 0)); g.connect(mand).connect(sessione.bagnato);
      setTimeout(() => { try { g.disconnect(); mand.disconnect(); if (pan) pan.disconnect(); } catch (e) {} }, Math.max(0, (fine - ctx.currentTime) * 1000 + 3000));
      return entra;
    }
    // Onda a impulso (quadra quando duty = 0.5): il suono delle console.
    const onde = {};
    function impulso(duty) {
      if (onde[duty]) return onde[duty];
      const n = 40, re = new Float32Array(n), im = new Float32Array(n);
      for (let k = 1; k < n; k++) re[k] = 2 / (k * Math.PI) * Math.sin(k * Math.PI * duty);
      return (onde[duty] = ctx.createPeriodicWave(re, im));
    }
    function chip(duty, f, t, fine, out) { const o = ctx.createOscillator(); o.setPeriodicWave(impulso(duty)); o.frequency.value = f; o.connect(out); o.start(t); o.stop(fine); return o; }
    function porta(t, d, out, livello, rilascio) {   // nota tenuta: sale, resta, si chiude
      const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t + 0.004);
      g.gain.setTargetAtTime(livello, t + 0.004, 0.06); g.gain.setValueAtTime(livello, t + d); g.gain.linearRampToValueAtTime(0, t + d + rilascio);
      g.connect(out); return g;
    }
    function osc(tipo, f, t, fine, out) { const o = ctx.createOscillator(); o.type = tipo; o.frequency.value = f; o.connect(out); o.start(t); o.stop(fine); return o; }
    function inv(t, out, a, picco, tau, fine) {   // attacco, poi coda esponenziale
      const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(picco, t + a);
      g.gain.setTargetAtTime(0, t + a, tau); g.gain.setValueAtTime(0, fine); g.connect(out); return g;
    }
    function soffio(t, fine, out, tipo, f, q) {
      const s = ctx.createBufferSource(); s.buffer = rumoreBianco; s.loop = true;
      const fl = ctx.createBiquadFilter(); fl.type = tipo; fl.frequency.value = f; fl.Q.value = q || 0.7;
      s.connect(fl).connect(out); s.start(t, caso() * 1.5); s.stop(fine); return fl;
    }

    // ── Strumenti ────────────────────────────────────────────────────────────────────────────────
    function nota(patch, m, t, d, amp, p) {
      const f = hz(m);
      if (patch === 'chip-lead') {
        const fine = t + d + 0.08, out = voce(p, amp * 0.5, fine), o = chip(0.25, f, t, fine, porta(t, d, out, 0.75, 0.04));
        if (d > 0.22) {   // vibrato che arriva dopo un attimo, come nei giochi
          const lfo = ctx.createOscillator(), pr = ctx.createGain(); lfo.frequency.value = 6;
          pr.gain.setValueAtTime(0, t); pr.gain.linearRampToValueAtTime(0, t + 0.14); pr.gain.linearRampToValueAtTime(18, t + 0.3);
          lfo.connect(pr).connect(o.detune); lfo.start(t); lfo.stop(fine);
        }
      } else if (patch === 'chip-arp') {
        const fine = t + 0.22, out = voce(p, amp * 0.45, fine);
        chip(0.125, f, t, fine, inv(t, out, 0.002, 1, 0.045, fine));
      } else if (patch === 'chip-bass') {
        const fine = t + d + 0.04, out = voce(p, amp * 0.9, fine);
        osc('triangle', f, t, fine, porta(t, d, out, 0.85, 0.02));
      } else if (patch === 'chip-pad') {
        const fine = t + d + 0.5, out = voce(p, amp * 0.35, fine);
        const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t + 0.08);
        g.gain.setTargetAtTime(0.7, t + 0.08, 0.3); g.gain.setValueAtTime(0.7, t + d); g.gain.setTargetAtTime(0, t + d, 0.1);
        const fl = ctx.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = 2200; g.connect(fl).connect(out);
        [-8, 8].forEach(c => { chip(0.5, f, t, fine, g).detune.value = c; });
      } else if (patch === 'chip-bell') {
        const fine = t + Math.max(d, 0.6) + 0.2, out = voce(p, amp * 0.5, fine);
        chip(0.25, f, t, fine, inv(t, out, 0.002, 1, 0.18, fine));
        osc('triangle', f * 2, t, fine, inv(t, out, 0.002, 0.3, 0.08, fine));
      } else if (patch === 'pad') {
        const fine = t + d + 1.4, out = voce(p, amp * 0.42, fine);
        const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t + 0.45);
        g.gain.setValueAtTime(1, t + d); g.gain.setTargetAtTime(0, t + d, 0.4);
        const fl = ctx.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = 1300; fl.Q.value = 0.4;
        g.connect(fl).connect(out);
        [-7, 7].forEach(c => { const o = osc('sawtooth', f, t, fine, g); o.detune.value = c; });
        osc('triangle', f / 2, t, fine, g);
      } else if (patch === 'glock') {
        const fine = t + Math.max(d, 2.2), out = voce(p, amp * 0.5, fine);
        osc('sine', f, t, fine, inv(t, out, 0.002, 1, 0.55, fine));
        osc('sine', f * 2.76, t, fine, inv(t, out, 0.002, 0.3, 0.18, fine));
        osc('sine', f * 5.4, t, fine, inv(t, out, 0.002, 0.12, 0.07, fine));
      } else if (patch === 'marimba') {
        const fine = t + 1.2, out = voce(p, amp * 0.7, fine);
        osc('sine', f, t, fine, inv(t, out, 0.003, 1, 0.22, fine));
        osc('sine', f * 4, t, fine, inv(t, out, 0.002, 0.25, 0.04, fine));
      } else if (patch === 'vibes') {
        const fine = t + Math.max(d, 1) + 2, out = voce(p, amp * 0.5, fine);
        const trem = ctx.createGain(); trem.connect(out);
        const lfo = ctx.createOscillator(), prof = ctx.createGain(); lfo.frequency.value = 5.2; prof.gain.value = 0.22;
        lfo.connect(prof).connect(trem.gain); trem.gain.value = 0.78; lfo.start(t); lfo.stop(fine);
        osc('sine', f, t, fine, inv(t, trem, 0.004, 1, 0.9, fine));
        osc('sine', f * 4, t, fine, inv(t, trem, 0.002, 0.12, 0.15, fine));
      } else if (patch === 'ep' || patch === 'keys') {
        const fine = t + d + 0.8, out = voce(p, amp * 0.45, fine);
        const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t + 0.006);
        g.gain.setTargetAtTime(0.35, t + 0.006, 0.6); g.gain.setValueAtTime(0.35, t + d); g.gain.setTargetAtTime(0, t + d, 0.2); g.connect(out);
        const c = osc('sine', f, t, fine, g);
        const mod = ctx.createOscillator(), ind = ctx.createGain(); mod.frequency.value = f;
        ind.gain.setValueAtTime(f * 1.4, t); ind.gain.setTargetAtTime(f * 0.15, t, 0.35);
        mod.connect(ind).connect(c.frequency); mod.start(t); mod.stop(fine);
        osc('sine', f * 2, t, fine, inv(t, out, 0.004, 0.08, 0.3, fine));
      } else if (patch === 'bass') {
        const fine = t + d + 0.4, out = voce(p, amp * 0.8, fine);
        const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t + 0.012);
        g.gain.setTargetAtTime(0.6, t + 0.012, 0.25); g.gain.setValueAtTime(0.6, t + d); g.gain.setTargetAtTime(0, t + d, 0.08);
        const fl = ctx.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = 520; g.connect(fl).connect(out);
        osc('triangle', f, t, fine, g); osc('sine', f, t, fine, g);
      } else {   // pluck e tutto il resto
        const fine = t + 1, out = voce(p, amp * 0.6, fine);
        osc('triangle', f, t, fine, inv(t, out, 0.003, 1, 0.2, fine));
      }
    }

    function batteria(nome, t, amp, p) {
      if (nome === 'chip-kick') {
        const fine = t + 0.22, out = voce(p, amp, fine), o = osc('triangle', 180, t, fine, inv(t, out, 0.001, 1, 0.06, fine));
        o.frequency.setValueAtTime(190, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.08);
      } else if (nome === 'chip-snare') {
        const fine = t + 0.22, out = voce(p, amp * 0.8, fine);
        soffio(t, fine, inv(t, out, 0.001, 1, 0.045, fine), 'bandpass', 3200, 0.8);
        osc('triangle', 240, t, fine, inv(t, out, 0.001, 0.5, 0.025, fine));
      } else if (nome === 'chip-hat') {
        const fine = t + 0.08, out = voce(p, amp * 0.5, fine);
        soffio(t, fine, inv(t, out, 0.0005, 1, 0.012, fine), 'highpass', 8000, 0.7);
      } else if (nome === 'kick') {
        const fine = t + 0.45, out = voce(p, amp, fine), o = osc('sine', 120, t, fine, inv(t, out, 0.002, 1, 0.12, fine));
        o.frequency.setValueAtTime(130, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
      } else if (nome === 'sidestick' || nome === 'woodblock') {
        const fine = t + 0.15, out = voce(p, amp * 0.7, fine);
        soffio(t, fine, inv(t, out, 0.001, 0.8, 0.02, fine), 'bandpass', 1900, 3);
        osc('sine', nome === 'woodblock' ? 1200 : 820, t, fine, inv(t, out, 0.001, 0.5, 0.02, fine));
      } else if (nome === 'shaker' || nome === 'hat' || nome === 'tamb') {
        const fine = t + 0.15, out = voce(p, amp * 0.6, fine);
        soffio(t, fine, inv(t, out, 0.008, 1, 0.03, fine), 'highpass', 6000, 0.7);
      } else {
        const fine = t + 0.3, out = voce(p, amp * 0.7, fine);
        soffio(t, fine, inv(t, out, 0.002, 1, 0.07, fine), 'bandpass', 1500, 0.8);
      }
    }

    function effetto(nome, t, d, amp, p) {
      if (nome === 'tick') {
        const fine = t + 0.06, out = voce(p, amp * 0.5, fine);
        soffio(t, fine, inv(t, out, 0.0008, 1, 0.006, fine), 'highpass', 3500, 0.7);
      } else if (nome === 'click' || nome === 'doubleclick') {
        [0].concat(nome === 'doubleclick' ? [0.09] : []).forEach(dt => {
          const a = t + dt, fine = a + 0.08, out = voce(p, amp * 0.6, fine);
          soffio(a, fine, inv(a, out, 0.001, 0.8, 0.012, fine), 'bandpass', 2600, 2);
          osc('sine', 1700, a, fine, inv(a, out, 0.001, 0.4, 0.01, fine));
        });
      } else if (nome === 'pop') {
        const fine = t + 0.25, out = voce(p, amp * 0.7, fine), o = osc('sine', 380, t, fine, inv(t, out, 0.002, 1, 0.05, fine));
        o.frequency.setValueAtTime(380, t); o.frequency.exponentialRampToValueAtTime(950, t + 0.07);
      } else if (nome === 'ding') {
        const fine = t + 2.5, out = voce(p, amp * 0.5, fine);
        osc('sine', 1318.5, t, fine, inv(t, out, 0.002, 1, 0.6, fine));
        osc('sine', 1318.5 * 2.4, t, fine, inv(t, out, 0.002, 0.25, 0.2, fine));
      } else if (nome === 'chime') {
        [1567.98, 1975.53, 2349.32].forEach((f, i) => {
          const a = t + i * 0.08, fine = a + 2.4, out = voce(p, amp * 0.36, fine);
          osc('sine', f, a, fine, inv(a, out, 0.002, 1, 0.7, fine));
          osc('sine', f * 2.76, a, fine, inv(a, out, 0.002, 0.15, 0.15, fine));
        });
      } else if (nome === 'whoosh') {
        const fine = t + d + 0.2, out = voce(p, amp * 0.9, fine);
        const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t + d * 0.45); g.gain.linearRampToValueAtTime(0, t + d); g.connect(out);
        const fl = soffio(t, fine, g, 'bandpass', 300, 1.2);
        fl.frequency.setValueAtTime(300, t); fl.frequency.exponentialRampToValueAtTime(2600, t + d * 0.5); fl.frequency.exponentialRampToValueAtTime(500, t + d);
      } else if (nome === 'boing') {
        const fine = t + 0.6, out = voce(p, amp * 0.55, fine), o = osc('sine', 300, t, fine, inv(t, out, 0.003, 1, 0.14, fine));
        o.frequency.setValueAtTime(320, t); o.frequency.exponentialRampToValueAtTime(170, t + 0.35);
        const lfo = ctx.createOscillator(), pr = ctx.createGain(); lfo.frequency.value = 13; pr.gain.value = 22;
        lfo.connect(pr).connect(o.frequency); lfo.start(t); lfo.stop(fine);
      } else if (nome === 'revswell') {
        const fine = t + d + 0.1, out = voce(p, amp * 0.8, fine);
        const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(1, t + d); g.gain.setValueAtTime(0, t + d + 0.02); g.connect(out);
        const fl = soffio(t, fine, g, 'lowpass', 400, 0.7); fl.frequency.setValueAtTime(400, t); fl.frequency.exponentialRampToValueAtTime(6000, t + d);
        osc('sine', 587.33, t, fine, g).detune.value = 0;
      } else if (nome === 'roll') {
        const fine = t + d + 0.2, out = voce(p, amp * 0.6, fine);
        const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t + 0.08); g.gain.setValueAtTime(1, t + d); g.gain.linearRampToValueAtTime(0, t + d + 0.15); g.connect(out);
        const trem = ctx.createGain(); trem.gain.value = 0.5; trem.connect(g);
        const lfo = ctx.createOscillator(), pr = ctx.createGain(); lfo.frequency.value = 17; pr.gain.value = 0.5; lfo.connect(pr).connect(trem.gain); lfo.start(t); lfo.stop(fine);
        soffio(t, fine, trem, 'bandpass', 900, 1.5);
      } else if (nome === 'thud') {
        const fine = t + 0.5, out = voce(p, amp, fine), o = osc('sine', 95, t, fine, inv(t, out, 0.002, 1, 0.12, fine));
        o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(48, t + 0.2);
        soffio(t, fine, inv(t, out, 0.002, 0.4, 0.04, fine), 'lowpass', 500, 0.7);
      } else if (nome === 'sparkle') {
        for (let i = 0; i < 5; i++) {
          const a = t + i * 0.045, fine = a + 0.5, out = voce(p, amp * 0.3, fine);
          osc('sine', 2200 + caso() * 2200, a, fine, inv(a, out, 0.001, 1, 0.07, fine));
        }
      } else {
        const fine = t + 0.3, out = voce(p, amp * 0.5, fine);
        osc('sine', 880, t, fine, inv(t, out, 0.002, 1, 0.08, fine));
      }
    }

    function suona(ev, t, d) {
      const nome = ALIAS[ev.patch] || ev.patch;
      const p = Object.assign({}, BASE[nome] || { pan: 0, rev: 0.3, gain: -4 }, ev.params);
      const amp = LIVELLO * db(p.gain || 0) * Math.pow(ev.vel / 127, 1.5);
      if (ev.tipo === 'nota') nota(nome, ev.midi, t, d, amp, p);
      else if (ev.tipo === 'batteria') batteria(nome, t, amp, p);
      else effetto(nome, t, d, amp, p);
    }

    // ── Trasporto: si suona da un punto del film, guardando poco avanti ─────────────────────────────
    function avvia(da) {
      ferma();
      const secco = ctx.createGain(), bagnato = ctx.createGain();
      secco.connect(muto); bagnato.connect(riverbero);
      const t0 = ctx.currentTime + 0.06;
      sessione = { secco, bagnato, da, t0, i: 0 };
      // Le note lunghe già iniziate ripartono da qui.
      eventi.forEach(ev => {
        if (ev.t < da && ev.tipo === 'nota' && SOSTENUTI[ALIAS[ev.patch] || ev.patch] && ev.t + ev.dur > da + 0.1) suona(ev, t0, ev.t + ev.dur - da);
      });
      while (sessione.i < eventi.length && eventi[sessione.i].t < da) sessione.i++;
      // Dissolvenza finale del master.
      const fineFilm = t0 + (durata - da), fo = master.fadeOut || 0;
      if (fo > 0 && durata - da > 0) {
        [secco, bagnato].forEach(g => { g.gain.setValueAtTime(1, Math.max(t0, fineFilm - fo)); g.gain.linearRampToValueAtTime(0, fineFilm); });
      }
      programma();
      sessione.timer = setInterval(programma, 50);
      if (ctx.state === 'suspended') ctx.resume();
    }
    function programma() {
      const s = sessione;
      if (!s) return;
      const ora = ctx.currentTime - s.t0 + s.da;
      while (s.i < eventi.length && eventi[s.i].t < ora + 0.3) {
        const ev = eventi[s.i++];
        if (ev.t >= durata) continue;
        suona(ev, s.t0 + ev.t - s.da, ev.dur);
      }
    }
    function ferma() {
      const s = sessione;
      if (!s) return;
      clearInterval(s.timer);
      const ora = ctx.currentTime;
      [s.secco, s.bagnato].forEach(g => { g.gain.cancelScheduledValues(ora); g.gain.setValueAtTime(g.gain.value, ora); g.gain.linearRampToValueAtTime(0, ora + 0.06); });
      setTimeout(() => { try { s.secco.disconnect(); s.bagnato.disconnect(); } catch (e) {} }, 200);
      sessione = null;
    }

    return {
      ctx,
      avvia,
      ferma,
      // Cambia stile; se sta suonando, riparte da dove si trova.
      stile(s) { const ora = this.tempo(); scegli(s); if (ora !== null) avvia(ora); return stile; },
      // Il tempo del film secondo l'orologio dell'audio (null se non sta suonando).
      tempo() { return sessione ? sessione.da + Math.max(0, ctx.currentTime - sessione.t0) : null; },
      muto(si) { muto.gain.setTargetAtTime(si ? 0 : 1, ctx.currentTime, 0.02); ritorno.gain.setTargetAtTime(si ? 0 : 0.55, ctx.currentTime, 0.02); },
    };
  }

  window.Giro = Object.assign(window.Giro || {}, { creaSuono });
})();
