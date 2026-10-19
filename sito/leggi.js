// Le lezioni da leggere: carica una lezione (?l=01-dal-testo-alla-distribuzione) da sito/lezioni/ e la impagina.
// Le lezioni sono in Markdown: titoli, paragrafi, elenchi, tabelle, blocchi di codice e una formula in ```latex.
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const scelta = (new URLSearchParams(location.search).get('l') || '').replace(/[^a-z0-9-]/gi, '');
  const articolo = $('articolo');

  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  // Dentro una riga: **grassetto**, `codice`, [testo](indirizzo) e i caratteri protetti con \ (\_ \[ \]).
  function riga(s) {
    const protetti = [];
    s = s.replace(/\\([\\`*_\[\]()#|-])/g, (m, c) => '\u0000' + (protetti.push(c) - 1) + '\u0000');
    s = esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2">$1</a>');
    return s.replace(/\u0000(\d+)\u0000/g, (m, i) => esc(protetti[i]));
  }

  const ancora = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const celle = r => r.trim().replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map(c => c.trim());

  function markdown(testo) {
    const righe = testo.replace(/\r/g, '').split('\n'), html = [], indice = [];
    let i = 0;
    while (i < righe.length) {
      const r = righe[i];
      if (!r.trim()) { i++; continue; }
      let m;
      if ((m = r.match(/^```(\w*)/))) {
        const lingua = m[1], corpo = [];
        for (i++; i < righe.length && !righe[i].startsWith('```'); i++) corpo.push(righe[i]);
        i++;
        if (lingua === 'latex') html.push('<div class="formula" data-tex="' + esc(corpo.join('\n')) + '"><code>' + esc(corpo.join('\n')) + '</code></div>');
        else html.push('<pre class="codice"><code>' + esc(corpo.join('\n')) + '</code></pre>');
        continue;
      }
      if ((m = r.match(/^(#{1,3}) (.*)/))) {
        const liv = m[1].length, id = ancora(m[2]);
        if (liv === 2) indice.push({ id, testo: m[2] });
        html.push('<h' + liv + (liv > 1 ? ' id="' + id + '"' : '') + '>' + riga(m[2]) + '</h' + liv + '>');
        i++; continue;
      }
      if (r.trim().startsWith('|') && /^\s*\|[\s:|-]+\|\s*$/.test(righe[i + 1] || '')) {
        const testa = celle(r);
        let t = '<div class="tabella"><table><thead><tr>' + testa.map(c => '<th>' + riga(c) + '</th>').join('') + '</tr></thead><tbody>';
        for (i += 2; i < righe.length && righe[i].trim().startsWith('|'); i++)
          t += '<tr>' + celle(righe[i]).map(c => '<td>' + riga(c) + '</td>').join('') + '</tr>';
        html.push(t + '</tbody></table></div>');
        continue;
      }
      if (/^(\d+\.|-) /.test(r)) {
        const ordinato = /^\d/.test(r), voci = [];
        for (; i < righe.length && /^(\d+\.|-) /.test(righe[i]); i++) voci.push(righe[i].replace(/^(\d+\.|-) /, ''));
        const tag = ordinato ? 'ol' : 'ul';
        html.push('<' + tag + '>' + voci.map(v => '<li>' + riga(v) + '</li>').join('') + '</' + tag + '>');
        continue;
      }
      const par = [];
      for (; i < righe.length && righe[i].trim() && !/^(```|#{1,3} |\||(\d+\.|-) )/.test(righe[i]); i++) par.push(righe[i]);
      html.push('<p>' + riga(par.join(' ')) + '</p>');
    }
    return { html: html.join('\n'), indice };
  }

  // Le formule si disegnano con KaTeX, caricato solo se la lezione ne ha; senza rete resta il testo TeX.
  function formule() {
    const blocchi = articolo.querySelectorAll('.formula');
    if (!blocchi.length) return;
    const base = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/';
    const css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = base + 'katex.min.css';
    document.head.appendChild(css);
    const js = document.createElement('script');
    js.src = base + 'katex.min.js';
    js.onload = () => blocchi.forEach(b => {
      try { window.katex.render(b.dataset.tex, b, { displayMode: true, throwOnError: true }); } catch (e) {}
    });
    document.head.appendChild(js);
  }

  function vicini(elenco, k) {
    const nav = $('vicini');
    const link = (e, testo) => { const a = document.createElement('a'); a.href = 'leggi.html?l=' + e.file; a.textContent = testo; return a; };
    nav.appendChild(k > 0 ? link(elenco[k - 1], '← ' + elenco[k - 1].titolo) : Object.assign(document.createElement('a'), { href: './#lezioni', textContent: '← Tutte le lezioni' }));
    if (k < elenco.length - 1) nav.appendChild(link(elenco[k + 1], elenco[k + 1].titolo + ' →'));
  }

  // Nel margine: tutte le lezioni, con quella aperta segnata.
  function altre(elenco, k) {
    if (elenco.length < 2) return;
    $('altre').innerHTML = '<p>Le lezioni</p><ol>' + elenco.map((e, i) => '<li><a href="leggi.html?l=' + e.file + '"' +
      (i === k ? ' aria-current="page"' : '') + '>' + esc(e.titolo) + '</a></li>').join('') + '</ol>';
  }

  // L'indice della lezione sta nel margine (sul computer) e sotto il titolo (sul telefono);
  // nel margine si accende la sezione che si sta leggendo.
  function sommario(indice) {
    if (indice.length < 2) return;
    const voci = '<p>In questa lezione</p><ol>' + indice.map(v => '<li><a href="#' + v.id + '">' + riga(v.testo) + '</a></li>').join('') + '</ol>';
    $('sommario').innerHTML = voci;
    const breve = document.createElement('nav');
    breve.className = 'sommario sommario-breve';
    breve.setAttribute('aria-label', 'In questa lezione');
    breve.innerHTML = voci;
    articolo.querySelector('h1').after(breve);
    const link = [...$('sommario').querySelectorAll('a')], titoli = indice.map(v => document.getElementById(v.id));
    const segna = () => {
      let k = 0;
      titoli.forEach((t, i) => { if (t.getBoundingClientRect().top < 140) k = i; });
      link.forEach((a, i) => a.classList.toggle('qui', i === k));
    };
    addEventListener('scroll', segna, { passive: true });
    segna();
  }

  document.querySelectorAll('[data-figura]').forEach(v => { v.innerHTML = Sito.volto(v.dataset.figura, { intero: true }); });

  (async function () {
    let elenco;
    try { elenco = await (await fetch('lezioni.json', { cache: 'no-cache' })).json(); }
    catch (e) { articolo.innerHTML = '<p>Non riesco a leggere l’elenco delle lezioni.</p>'; return; }
    const k = Math.max(0, elenco.findIndex(e => e.file === scelta));
    const lezione = elenco[k];
    let testo;
    try {
      const r = await fetch('lezioni/' + lezione.file + '.md', { cache: 'no-cache' });
      if (!r.ok) throw new Error(r.status);
      testo = await r.text();
    } catch (e) { articolo.innerHTML = '<p>Non riesco a leggere la lezione.</p>'; return; }

    const { html, indice } = markdown(testo);
    articolo.innerHTML = '<p class="num etichetta">' + esc((lezione.etichetta || 'Lezione ' + lezione.n).toUpperCase()) + '</p>' + html;
    sommario(indice);
    altre(elenco, k);
    document.title = lezione.titolo + ' · Come funziona un LLM · Ancora un giro';
    $('dove').textContent = 'Come funziona un LLM · ' + (lezione.etichetta || 'Lezione ' + lezione.n);
    formule();
    vicini(elenco, k);
    if (location.hash) { const el = document.getElementById(location.hash.slice(1)); if (el) el.scrollIntoView(); }
  })();
})();
