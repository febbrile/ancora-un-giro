// Il motore di «Ancora un giro»: le funzioni del kit che usano le nostre scene.
// Le scene (episodi/NN-titolo/modules) restano identiche: qui si caricano, si montano e si disegnano al tempo t.
(function () {
  'use strict';

  // ── Tempo e curve: le stesse formule che usano le scene ─────────────────────────────────────────────
  const clamp01 = x => x < 0 ? 0 : x > 1 ? 1 : x;
  const clamp = (x, a, b) => x < a ? a : x > b ? b : x;
  const seg = (t, a, b) => clamp01((t - a) / (b - a));
  const lerp = (a, b, p) => a + (b - a) * p;
  const eo = x => 1 - Math.pow(1 - clamp01(x), 3);
  const ei = x => Math.pow(clamp01(x), 3);
  const eio = x => { x = clamp01(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  const eoq = x => 1 - Math.pow(1 - clamp01(x), 4);
  const eox = x => 1 - Math.pow(2, -10 * clamp01(x));
  // Uscita con rimbalzo: supera 1 e torna indietro (c1 regola quanto).
  const eob = (x, c1 = 1.4) => { x = clamp01(x); const c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
  const spring = (x, damp = 6, freq = 2.2) => { x = clamp01(x); return 1 - Math.exp(-damp * x) * Math.cos(freq * Math.PI * 2 * x) * (1 - x); };

  // Numeri pseudo-casuali ripetibili (generatore congruenziale lineare): stesso seme, stessa sequenza.
  function rng(seed) {
    let s = seed >>> 0;
    return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  // Scrittura a macchina: a ogni lettera il suo istante, con piccole irregolarità.
  function typist(text, t0, cps, seed = 7) {
    const r = rng(seed), times = [];
    let t = t0;
    for (let i = 0; i < text.length; i++) {
      let d = (1 / cps) * (0.55 + 0.9 * r());
      if (text[i] === ' ') d += 0.035;
      if (text[i - 1] === '.' || text[i - 1] === '!') d += 0.16;
      t += d; times.push(t);
    }
    return {
      text, times, end: t,
      count(now) { let n = 0; while (n < times.length && times[n] <= now) n++; return n; },
      at(now) { return text.slice(0, this.count(now)); },
    };
  }

  // Testo che entra parola per parola da destra.
  const TextFx = {
    split(el) {
      if (el.__parole) return el.__parole;
      const pezzi = el.textContent.split(/(\s+)/), spans = [];
      el.textContent = '';
      for (const w of pezzi) {
        if (!w) continue;
        if (/^\s+$/.test(w)) { el.appendChild(document.createTextNode(w)); continue; }
        const s = document.createElement('span');
        s.textContent = w; s.style.display = 'inline-block';
        el.appendChild(s); spans.push(s);
      }
      el.__parole = spans;
      return spans;
    },
    fadeFromRight(el, t, t0, o = {}) {
      const { stagger = 0.11, dur = 0.5, dx = 26 } = o, ws = TextFx.split(el);
      ws.forEach((s, i) => {
        const p = eo(seg(t, t0 + i * stagger, t0 + i * stagger + dur));
        s.style.opacity = p; s.style.transform = 'translateX(' + ((1 - p) * dx).toFixed(1) + 'px)';
      });
      return t0 + (ws.length - 1) * stagger + dur;
    },
    fadeOutLeft(el, t, t0, o = {}) {
      const { stagger = 0.07, dur = 0.35, dx = 22 } = o, ws = TextFx.split(el);
      ws.forEach((s, i) => {
        const p = ei(seg(t, t0 + i * stagger, t0 + i * stagger + dur));
        if (t >= t0) { s.style.opacity = 1 - p; s.style.transform = 'translateX(' + (-p * dx).toFixed(1) + 'px)'; }
      });
    },
    inOut(el, t, tIn, tOut, o) { if (tOut !== undefined && t >= tOut) TextFx.fadeOutLeft(el, t, tOut, o); else TextFx.fadeFromRight(el, t, tIn, o); },
  };

  // Dal testo HTML al primo elemento.
  function h(html) { const t = document.createElement('template'); t.innerHTML = String(html).trim(); return t.content.firstElementChild; }

  // ── La partitura: i comandi di score.js (S.chord, S.pattern, …) diventano una lista di eventi ──
  const NOTA = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  function midi(p) {
    if (typeof p === 'number') return Math.round(p);
    const m = /^([A-Ga-g])([#b♯♭]?)(-?\d)$/.exec(String(p).trim());
    if (!m) { console.warn('partitura: nota illeggibile', p); return null; }
    return 12 * (Number(m[3]) + 1) + NOTA[m[1].toUpperCase()] + (/[#♯]/.test(m[2]) ? 1 : m[2] ? -1 : 0);
  }
  const num = (x, d) => typeof x === 'number' && isFinite(x) ? x : d;
  const VOCE = ['pan', 'gain', 'rev', 'detune', 'bright'];

  function componiPartitura(fn, T) {
    const eventi = [], tracce = {}, griglia = { bpm: 120, t0: 0 };
    let caso = rng(7), master = { gain: -6, fadeOut: 1 };
    const spb = () => 60 / griglia.bpm, b2t = b => griglia.t0 + b * spb();
    const quando = (o, dur) => {
      o = o || {};
      const t = o.t !== undefined ? num(o.t, 0) : b2t(num(o.beat, 0));
      const d = o.dur !== undefined ? num(o.dur, dur) : o.beats !== undefined ? num(o.beats, 1) * spb() : dur;
      return [t, Math.max(0.01, d)];
    };
    const unisci = (base, o, chiavi) => {
      const out = Object.assign({}, base || {});
      chiavi.forEach(k => { if (o && typeof o[k] === 'number') out[k] = o[k]; });
      return out;
    };
    const metti = (tipo, patch, m, t, dur, vel, params) => {
      if (m === null) return;
      if (t < 0 && t > -0.1) t = 0;
      if (!(t >= 0) || t > 600) return;
      eventi.push({ t, dur, tipo, patch: String(patch), midi: m, vel: clamp(Math.round(num(vel, 64)), 1, 127), params: params || {} });
    };
    const note = (patch, p, t, dur, vel, params) => (Array.isArray(p) ? p : [p]).forEach(x => metti('nota', patch, midi(x), t, dur, vel, params));
    const traccia = nome => tracce[nome] || { patch: String(nome), params: {} };
    const S = {
      tempo(bpm, o) { griglia.bpm = clamp(num(bpm, 120), 20, 300); griglia.t0 = num(o && o.t0, 0); return S; },
      beat: b => b2t(b),
      toBeat: t => (t - griglia.t0) / spb(),
      seed(s) { caso = rng(num(s, 7) | 0); return S; },
      rand: () => caso(),
      program(nome, patch, o) { tracce[nome] = { patch: String(patch || nome), params: unisci(null, o, VOCE) }; return S; },
      note(nome, p, o) { const tr = traccia(nome), w = quando(o, 0.3); note(tr.patch, p, w[0], w[1], o && o.vel, unisci(tr.params, o, VOCE)); return S; },
      chord(nome, ps, o) {
        const tr = traccia(nome), w = quando(o, 1), spread = num(o && o.spread, 0);
        (ps || []).forEach((p, i) => note(tr.patch, p, w[0] + i * spread, Math.max(0.02, w[1] - i * spread), o && o.vel, unisci(tr.params, o, VOCE)));
        return S;
      },
      // 'x.x.X...': x = colpo (le altezze girano), X = accento, . = pausa; un passo = mezzo battito.
      pattern(nome, pat, o) {
        o = o || {};
        const tr = traccia(nome), step = num(o.step, 0.5), from = num(o.from, 0), reps = Math.max(1, num(o.repeat, 1));
        const ps = Array.isArray(o.pitch) ? o.pitch : [o.pitch !== undefined ? o.pitch : 'C4'];
        const vel = num(o.vel, 64), umano = num(o.humanize, 0.004);
        let colpo = 0;
        for (let r = 0; r < reps; r++) for (let i = 0; i < pat.length; i++) {
          const c = pat.charAt(i);
          if (c !== 'x' && c !== 'X') continue;
          const b = from + (r * pat.length + i) * step;
          note(tr.patch, ps[colpo % ps.length], b2t(b) + (caso() * 2 - 1) * umano, num(o.dur, step * spb() * 0.9),
            vel + (c === 'X' ? 12 : 0) + Math.round((caso() * 2 - 1) * num(o.velJitter, 4)), unisci(tr.params, o, VOCE));
          colpo++;
        }
        return S;
      },
      run(nome, ps, o) {
        o = o || {};
        const tr = traccia(nome), t = num(o.t, 0), step = num(o.step, 0.1);
        (ps || []).forEach((p, i) => note(tr.patch, p, t + i * step, num(o.dur, 0.3), num(o.vel, 64) + num(o.cresc, 0) * i, unisci(tr.params, o, VOCE)));
        return S;
      },
      drum(nome, o) { const w = quando(o, 0.1); metti('batteria', nome, 0, w[0], w[1], o && o.vel, unisci(null, o, VOCE)); return S; },
      drums(kit, o) {
        o = o || {};
        const step = num(o.step, 0.5), from = num(o.from, 0), reps = Math.max(1, num(o.repeat, 1));
        Object.keys(kit).forEach(nome => {
          const pat = String(kit[nome]);
          for (let r = 0; r < reps; r++) for (let i = 0; i < pat.length; i++) {
            const c = pat.charAt(i);
            if (c === 'x' || c === 'X' || c === 'o') metti('batteria', nome, 0, b2t(from + (r * pat.length + i) * step), 0.1,
              num(o.vel, 70) + (c === 'X' ? 16 : c === 'o' ? -22 : 0) + Math.round((caso() * 2 - 1) * 4), unisci(null, o, VOCE));
          }
        });
        return S;
      },
      fx(nome, t, o) {
        o = o || {};
        metti('rumore', nome, o.pitch !== undefined ? midi(o.pitch) : 0, num(t, 0), Math.max(0.01, num(o.dur, 0.25)), num(o.vel, 64), unisci(null, o, VOCE));
        return S;
      },
      ticks(tempi, o) {
        o = o || {};
        tempi.forEach(t => S.fx(o.name || 'tick', t, { vel: num(o.vel, 36) + Math.round((caso() * 2 - 1) * num(o.jitter, 6)), pan: o.pan }));
        return S;
      },
      master(o) { master = { gain: clamp(num(o && o.gain, -6), -40, 6), fadeOut: clamp(num(o && o.fadeOut, 1), 0, 10) }; return S; },
    };
    try { fn(S, T); } catch (e) { console.error('score.js:', e); }
    eventi.sort((a, b) => a.t - b.t);
    return { eventi, master, griglia: { bpm: griglia.bpm, t0: griglia.t0 } };
  }

  // ── Il film: carica i moduli di un episodio e li monta ──────────────────────────────────────────────
  async function testo(url) {
    const r = await fetch(url, { cache: 'no-cache' });
    if (!r.ok) throw new Error('Non trovo ' + url + ' (' + r.status + ')');
    return r.text();
  }

  // Esegue un modulo con `kit` a portata di mano.
  function esegui(kit, nome, codice) {
    try { new Function('kit', codice + '\n//# sourceURL=giro/' + nome)(kit); }
    catch (e) { console.error(nome + ':', e); throw new Error('Errore nel modulo ' + nome + ': ' + e.message); }
  }

  async function carica(cartella, stage) {
    const base = cartella.replace(/\/$/, '') + '/';
    const elenco = JSON.parse(await testo(base + 'modules/scenes.json'));
    const scene = elenco.scenes;
    // shared.js e base.css sono uguali per tutti gli episodi: stanno in episodi/comune/.
    const comune = base + '../comune/';
    const nomi = ['shared.js'].concat(scene.map(s => 'scene-' + s.id + '.js'), ['score.js']);
    const dove = n => n === 'shared.js' ? comune + n : base + 'modules/' + n;
    const [css, ...codici] = await Promise.all([testo(comune + 'base.css')].concat(nomi.map(n => testo(dove(n)).catch(() => null))));

    const defs = {};
    let partitura = null;
    const kit = {
      clamp01, clamp, seg, lerp, eo, ei, eio, eoq, eox, eob, spring, rng, typist, TextFx, h,
      smoothstep: (a, b, x) => { const p = clamp01((x - a) / (b - a)); return p * p * (3 - 2 * p); },
      step: (t, a) => t >= a ? 1 : 0,
      pulse: (t, a, b) => (t >= a && t < b) ? 1 : 0,
      stage: stage,
      scene(id, def) { if (def && typeof def.render === 'function') defs[id] = def; },
      score(fn) { if (typeof fn === 'function') partitura = fn; },
      narration() {},
      scenes() { return film; },
    };

    // Il foglio di stile dell'episodio vale solo dentro il palco.
    const stile = document.createElement('style');
    stile.textContent = css;
    stage.appendChild(stile);
    stage.style.background = elenco.background || '#000';

    nomi.forEach((n, i) => { if (codici[i] !== null) esegui(kit, n, codici[i]); });

    const T = Object.create(null);
    let fine = 0;
    const lista = scene.map(s => { const a = fine; T[s.id] = a; fine += s.dur; return { id: s.id, nome: s.name, durata: s.dur, inizio: a, def: defs[s.id] }; });
    T.END = fine;
    const film = {
      larghezza: elenco.width || 1920, altezza: elenco.height || 1080, durata: fine, sfondo: elenco.background,
      capitoli: lista.map(s => ({ t: s.inizio, nome: s.nome })),
      scene: lista,
    };

    // Ogni scena ha la sua scatola sul palco; si vede solo quella del momento.
    for (const s of lista) {
      s.box = document.createElement('div');
      s.box.className = 'scena';
      s.box.dataset.scena = s.id;
      stage.appendChild(s.box);
      kit.stage = s.box;
      if (!s.def) { s.box.textContent = 'Scena mancante: ' + s.id; continue; }
      try { if (s.def.init) await s.def.init.call(s.def, kit); }
      catch (e) { console.error('scene-' + s.id + '.js init:', e); s.errore = e; }
    }

    film.partitura = partitura ? componiPartitura(partitura, T) : { eventi: [], master: { gain: -6, fadeOut: 1 }, griglia: { bpm: 120, t0: 0 } };

    let attiva = null;
    film.disegna = function (t) {
      t = clamp(t, 0, fine - 1e-3);
      let i = 0;
      while (i + 1 < lista.length && t >= lista[i + 1].inizio) i++;
      const s = lista[i];
      if (attiva !== s) { if (attiva) attiva.box.classList.remove('attiva'); s.box.classList.add('attiva'); attiva = s; }
      if (!s.def || s.errore) return s;
      kit.stage = s.box;
      try { s.def.render.call(s.def, t - s.inizio, kit); }
      catch (e) { if (!s.erroreRender) console.error('scene-' + s.id + '.js render:', e); s.erroreRender = e; }
      return s;
    };
    return film;
  }

  window.Giro = Object.assign(window.Giro || {}, { carica, rng, componiPartitura });
})();
