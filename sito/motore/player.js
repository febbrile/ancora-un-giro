// Il player: carica un episodio (?ep=00-premi-invio), lo adatta allo schermo e lo fa scorrere col suono.
// ?t=12.5 apre il film fermo a quel secondo (comodo per controllare un fotogramma).
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const parametri = new URLSearchParams(location.search);
  const cartella = (parametri.get('ep') || '00-premi-invio').replace(/[^a-z0-9-]/gi, '');
  const ICONA_SUONA = 'M7 4.5v15l12.5-7.5z', ICONA_PAUSA = 'M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z';

  const stage = $('stage'), schermo = $('schermo'), velo = $('velo'), messaggio = $('messaggio'), grande = $('grande');
  const barra = $('barra'), fatto = $('fatto'), pomello = $('pomello'), etichetta = $('etichetta'), orologio = $('orologio');

  let film = null, suono = null, tempo = 0, inCorso = false, partenza = 0, origine = 0, muto = false, trascina = false;
  // Lo stile della musica: «anni 90» (riarrangiata) o «calma» (la partitura com'è). Si ricorda tra una visita e l'altra.
  const STILI = { anni90: 'Anni 90', calma: 'Calma' };
  let stile = 'anni90';
  try { const s = localStorage.getItem('giro-stile'); if (STILI[s]) stile = s; } catch (e) {}

  const mmss = s => { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

  // Il palco è sempre 1920×1080: si scala per stare nello schermo.
  function adatta() {
    const r = schermo.getBoundingClientRect();
    stage.style.transform = 'scale(' + (r.width / 1920) + ')';
  }
  new ResizeObserver(adatta).observe(schermo);

  function caratteri() {
    const prove = ['400 40px Fredoka', '600 40px Fredoka', '400 20px "JetBrains Mono"', '600 20px "JetBrains Mono"', '400 20px "Atkinson Hyperlegible"'];
    const tutte = Promise.all(prove.map(f => document.fonts.load(f).catch(() => null)));
    return Promise.race([tutte, new Promise(r => setTimeout(r, 4000))]);
  }

  async function avvio() {
    let elenco = [];
    try { elenco = await (await fetch('episodi.json', { cache: 'no-cache' })).json(); } catch (e) {}
    const io = elenco.find(e => e.cartella === cartella);
    const titolo = io ? (io.etichetta || 'Episodio ' + io.n) + ' · ' + io.titolo : cartella;
    document.title = titolo + ' · Ancora un giro';
    $('dove').textContent = titolo;
    vicini(elenco, io);

    try {
      await caratteri();
      film = await Giro.carica('../episodi/' + cartella, stage);
    } catch (e) {
      console.error(e);
      messaggio.textContent = 'Non riesco a caricare l’episodio: ' + e.message;
      messaggio.classList.add('errore');
      return;
    }
    barra.setAttribute('aria-valuemax', String(Math.round(film.durata)));
    disegnaCapitoli();
    adatta();
    const t0 = parseFloat(parametri.get('t'));
    vai(isFinite(t0) ? t0 : 0);
    messaggio.textContent = '';
    grande.hidden = false;
    if (isFinite(t0)) velo.classList.add('via');
    requestAnimationFrame(giro);
  }

  function vicini(elenco, io) {
    const nav = $('vicini');
    if (!io) return;
    const prima = elenco.find(e => e.n === io.n - 1), dopo = elenco.find(e => e.n === io.n + 1);
    nav.innerHTML = '';
    const link = (e, testo) => { const a = document.createElement('a'); a.href = 'guarda.html?ep=' + e.cartella; a.textContent = testo; return a; };
    nav.appendChild(prima ? link(prima, '← ' + (prima.etichetta || 'Episodio ' + prima.n) + ': ' + prima.titolo) : document.createElement('span'));
    if (dopo) nav.appendChild(link(dopo, (dopo.etichetta || 'Episodio ' + dopo.n) + ': ' + dopo.titolo + ' →'));
  }

  function disegnaCapitoli() {
    const ol = $('capitoli'), tacche = $('tacche');
    ol.innerHTML = ''; tacche.innerHTML = '';
    film.capitoli.forEach((c, i) => {
      const li = document.createElement('li'), b = document.createElement('button');
      b.innerHTML = '<span class="quando">' + mmss(c.t) + '</span><span></span>';
      b.lastChild.textContent = c.nome;
      b.addEventListener('click', () => { vai(c.t); if (!inCorso) suona(); });
      li.appendChild(b); ol.appendChild(li);
      if (i > 0) { const tk = document.createElement('div'); tk.className = 'tacca'; tk.style.left = (100 * c.t / film.durata) + '%'; tacche.appendChild(tk); }
    });
  }

  function capitoloA(t) { let k = 0; film.capitoli.forEach((c, i) => { if (t >= c.t) k = i; }); return k; }

  let ultimoCapitolo = -1, ultimoSecondo = -1;
  function aggiornaComandi() {
    const p = film.durata ? tempo / film.durata : 0;
    fatto.style.width = (100 * p) + '%';
    pomello.style.left = (100 * p) + '%';
    const s = Math.floor(tempo);
    if (s !== ultimoSecondo) {
      ultimoSecondo = s;
      orologio.textContent = mmss(tempo) + ' / ' + mmss(film.durata);
      barra.setAttribute('aria-valuenow', String(s));
      barra.setAttribute('aria-valuetext', mmss(tempo));
    }
    const k = capitoloA(tempo);
    if (k !== ultimoCapitolo) {
      ultimoCapitolo = k;
      [...$('capitoli').querySelectorAll('button')].forEach((b, i) => b.classList.toggle('qui', i === k));
    }
  }

  function vai(t) {
    tempo = Math.max(0, Math.min(film.durata - 0.01, t));
    if (inCorso) { origine = tempo; partenza = performance.now(); if (suono) suono.avvia(tempo); }
    film.disegna(tempo);
    aggiornaComandi();
  }

  function suona() {
    if (!film) return;
    if (tempo >= film.durata - 0.05) tempo = 0;
    if (!suono) { try { suono = Giro.creaSuono(film.partitura, film.durata, stile); if (suono) suono.muto(muto); } catch (e) { console.error(e); suono = null; } }
    inCorso = true;
    origine = tempo; partenza = performance.now();
    if (suono) suono.avvia(tempo);
    velo.classList.add('via');
    $('icona-suona').setAttribute('d', ICONA_PAUSA);
    $('suona').setAttribute('aria-label', 'Pausa');
  }
  function pausa() {
    inCorso = false;
    if (suono) suono.ferma();
    $('icona-suona').setAttribute('d', ICONA_SUONA);
    $('suona').setAttribute('aria-label', 'Riproduci');
  }
  const alterna = () => inCorso ? pausa() : suona();

  function giro() {
    if (film && inCorso && !trascina) {
      const dalSuono = suono && suono.tempo();
      tempo = dalSuono !== null && dalSuono !== undefined ? dalSuono : origine + (performance.now() - partenza) / 1000;
      if (tempo >= film.durata) { tempo = film.durata - 0.01; pausa(); }
      film.disegna(tempo);
      aggiornaComandi();
    }
    requestAnimationFrame(giro);
  }

  // ── Barra del tempo ──────────────────────────────────────────────────────────────────────────────
  function tempoDa(ev) { const r = barra.getBoundingClientRect(); return film.durata * Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width)); }
  function mostraEtichetta(ev) {
    if (!film) return;
    const t = tempoDa(ev), r = barra.getBoundingClientRect();
    etichetta.textContent = mmss(t) + ' · ' + film.capitoli[capitoloA(t)].nome;
    etichetta.style.left = Math.max(60, Math.min(r.width - 60, ev.clientX - r.left)) + 'px';
  }
  let riprendi = false;
  barra.addEventListener('pointerdown', ev => {
    if (!film) return;
    trascina = true; barra.classList.add('trascina'); barra.setPointerCapture(ev.pointerId);
    riprendi = inCorso; if (inCorso) pausa();
    vai(tempoDa(ev)); mostraEtichetta(ev);
  });
  barra.addEventListener('pointermove', ev => { mostraEtichetta(ev); if (trascina) vai(tempoDa(ev)); });
  const lascia = () => { if (!trascina) return; trascina = false; barra.classList.remove('trascina'); if (riprendi) suona(); };
  barra.addEventListener('pointerup', lascia);
  barra.addEventListener('pointercancel', lascia);
  barra.addEventListener('keydown', ev => {
    if (!film) return;
    if (ev.key === 'Home') { vai(0); ev.preventDefault(); }
    if (ev.key === 'End') { vai(film.durata); ev.preventDefault(); }
  });

  // ── Pulsanti e tastiera ──────────────────────────────────────────────────────────────────────────
  $('suona').addEventListener('click', alterna);
  grande.addEventListener('click', ev => { ev.stopPropagation(); suona(); });
  schermo.addEventListener('click', () => { if (film) alterna(); });
  $('audio').addEventListener('click', () => {
    muto = !muto;
    if (suono) suono.muto(muto);
    $('onde-audio').setAttribute('d', muto ? 'M16 9l5 6M21 9l-5 6' : 'M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12');
    $('audio').setAttribute('aria-label', muto ? 'Rimetti l’audio' : 'Togli l’audio');
  });
  function mostraStile() {
    $('stile').textContent = '♪ ' + STILI[stile];
    $('stile').setAttribute('aria-label', 'Musica: ' + STILI[stile] + '. Cambia stile');
  }
  mostraStile();
  $('stile').addEventListener('click', () => {
    stile = stile === 'anni90' ? 'calma' : 'anni90';
    try { localStorage.setItem('giro-stile', stile); } catch (e) {}
    if (suono) suono.stile(stile);
    mostraStile();
  });
  $('intero').addEventListener('click', () => {
    const el = $('lettore');
    if (document.fullscreenElement) document.exitFullscreen();
    else if (el.requestFullscreen) el.requestFullscreen();
  });
  document.addEventListener('keydown', ev => {
    if (!film || ev.metaKey || ev.ctrlKey || ev.altKey) return;
    const tag = (ev.target && ev.target.tagName) || '';
    if (ev.key === ' ' || ev.key === 'k') { if (tag === 'BUTTON' && ev.key === ' ') return; alterna(); ev.preventDefault(); }
    else if (ev.key === 'ArrowLeft') { vai(tempo - 5); ev.preventDefault(); }
    else if (ev.key === 'ArrowRight') { vai(tempo + 5); ev.preventDefault(); }
    else if (ev.key === 'm' || ev.key === 'M') $('audio').click();
    else if (ev.key === 's' || ev.key === 'S') $('stile').click();
    else if (ev.key === 'f' || ev.key === 'F') $('intero').click();
  });

  // Per i controlli automatici: window.giro.vai(12.5) disegna quel fotogramma.
  window.giro = { vai: t => vai(t), suona, pausa, get film() { return film; }, get tempo() { return tempo; } };

  avvio();
})();
