// Ancora un giro · il modulo comune delle pagine del sito: l'elenco degli episodi (per stagioni) e i volti dei personaggi.
// I personaggi sono gli stessi dei film: li disegna episodi/comune/shared.js (window.G), da caricare prima di questo file.
// Il file si può eseguire anche in Node (strumenti/controlla.mjs): al caricamento non tocca la pagina.
(function () {
  'use strict';
  const G = window.G;

  // I volti che una scheda può mostrare. Il colore viene dal modellino o dai colori del mondo, mai inventato qui.
  // ritratto: il riquadro (viewBox, quadrato) per l'oblò; intero: il riquadro con tutto il personaggio.
  const mare = () => G.MOD.mare.passeggeri, parco = () => G.MOD.parco.passeggeri;
  const VOLTI = {
    spezzaparole: { colore: () => G.C.oro, ritratto: '-30 6 290 290', intero: '6 14 240 290', disegno: () => G.spezzaparole({ forbice: 0.7 }) },
    emma: { colore: () => mare().Emma.tratti.at(-1), ritratto: '22 24 156 156', intero: '6 26 188 254', disegno: c => G.emma(c, { mouth: 'o' }) },
    parco: { colore: () => parco().parco.biglietto, ritratto: '-12 -16 224 224', intero: '0 18 200 166', disegno: c => G.parco(c, { ciao: -14 }) },
    al: { colore: () => mare().Al.biglietto, ritratto: '18 35 168 168', intero: '10 50 184 138', disegno: c => G.al(c) },
    mare: { colore: () => mare().mare.biglietto, ritratto: '10 25 184 184', intero: '8 52 186 136', disegno: c => G.mare(c) },
    ada: { colore: () => G.C.crema, ritratto: '28 10 144 144', intero: '20 0 160 312', disegno: () => G.ada('quaderno', 'felice') },
    paperella: { colore: () => '#FFD23F', ritratto: '-16 -18 132 132', intero: '0 10 104 86', disegno: c => G.paperella(c) },
  };
  const PERSONAGGI = Object.keys(VOLTI);

  const colore = nome => (VOLTI[nome] || VOLTI.paperella).colore();
  // Un personaggio in un <svg> a sé, con i filtri del mondo (la luce morbida intorno a Emma, Al, Mare e Parco).
  // o.intero: tutto il personaggio invece del ritratto; o.etichetta: il nome da leggere (senza, è decorativo).
  function volto(nome, o) {
    o = o || {};
    const v = VOLTI[nome] || VOLTI.paperella;
    const alt = o.etichetta ? ' role="img" aria-label="' + o.etichetta + '"' : ' aria-hidden="true"';
    return '<svg viewBox="' + (o.intero ? v.intero : v.ritratto) + '"' + alt + '>' + G.defs + v.disegno(v.colore()) + '</svg>';
  }

  // L'elenco degli episodi: sito/episodi.json è una lista di stagioni, ognuna con i suoi episodi in ordine.
  // tutti: gli episodi in fila, di stagione in stagione, ognuno con la sua stagione (s) e il suo posto (i).
  async function episodi() {
    const stagioni = await (await fetch('episodi.json', { cache: 'no-cache' })).json();
    const tutti = [];
    stagioni.forEach(s => s.episodi.forEach(e => { e.s = s; e.i = tutti.length; tutti.push(e); }));
    return { stagioni, tutti };
  }
  const etichetta = e => e.etichetta || 'Episodio ' + e.n;
  const nomeStagione = s => s.titolo || 'Stagione ' + s.n;

  // La durata di un episodio: la somma delle scene in scenes.json (la stessa che usa il player).
  async function durata(cartella) {
    try {
      const j = await (await fetch('../episodi/' + cartella + '/modules/scenes.json', { cache: 'no-cache' })).json();
      return j.scenes.reduce((a, s) => a + s.dur, 0);
    } catch (e) { return null; }
  }
  const mmss = t => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');

  window.Sito = { VOLTI, PERSONAGGI, colore, volto, episodi, etichetta, nomeStagione, durata, mmss };
})();
