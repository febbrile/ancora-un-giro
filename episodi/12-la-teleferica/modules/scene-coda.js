const { seg, eo, eio } = kit;
// Sotto il luna park: dopo il cartello Fine, il quaderno di Ada a tutto schermo. Gli schizzi dell'episodio, a matita,
// e accanto a ognuno il suo nome vero, scritto a mano mentre il narratore lo dice. Le scritte stanno sul quaderno,
// mai nel luna park: è l'unico posto del film con parole vere a schermo.
// La coda nomina solo strumento e chiamata di funzione.
kit.scene('coda', {
  init(kit) {
    const G = window.G, C = G.C, M = '#3A3570';
    const box = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w) + ' ' + (y + h) + ' L' + x + ' ' + (y + h) + ' Z';
    let vagoni = '';
    for (let i = 0; i < 8; i++) vagoni += box(1060 + i * 72, 460, 66, 44);
    // Gli schizzi, nell'ordine in cui la matita li disegna: [quando, tratti…]; ogni tratto dura mezzo secondo,
    // salvo [tratto, durata].
    const SCHIZZI = [
      [1.4, 'M300 420 L300 220 M270 230 L330 230', ['M300 230 Q520 150 700 190 Q820 215 900 300', 1.5], box(585, 180, 50, 44) + 'M610 180 L610 160'],
      [12.8, box(430, 700, 170, 50) + 'M460 725 L570 725', 'M680 720 L780 640 M740 640 L780 640 L780 680'],
      [23.8, vagoni, 'M1530 455 L1530 395 M1530 395 L1566 408 L1530 421'],
    ];
    // Le parole, a mano: [quando, x, y, testo, grandezza]. Compaiono quando il narratore le dice.
    const SCRITTE = [[8.0, 560, 500, 'strumento'], [17.5, 560, 850, 'chiamata di funzione', 46]];
    let tratti = '';
    SCHIZZI.forEach(s => { let a = s[0]; s.slice(1).forEach(d => { const [p, dur] = Array.isArray(d) ? d : [d, 0.5]; tratti += '<path class="co-tratto" data-a="' + a.toFixed(1) + '" data-d="' + dur + '" d="' + p + '"/>'; a += dur; }); });
    // I colori, a pennarello: compaiono quando il narratore li nomina.
    let colori = '<path class="co-appare" data-t="3.6" opacity="0" d="' + box(585, 180, 50, 44) + '" fill="#a064d7" fill-opacity=".6"/>';
    colori += '<g class="co-appare" data-t="13.2" opacity="0" transform="translate(365 690) scale(.5)">' + G.paperella('#a064d7') + '</g>';
    colori += '<g class="co-appare" data-t="13.6" opacity="0" transform="translate(620 690) scale(.5)">' + G.paperella('#5a328c') + '</g>';
    colori += '<path class="co-appare" data-t="25.2" opacity="0" d="M1530 395 L1566 408 L1530 421 Z" fill="#2e95a0"/>';
    colori += '<path class="co-appare" data-t="25.2" opacity="0" d="' + box(1564, 460, 66, 44) + '" fill="#3d7ad6" fill-opacity=".55"/>';
    const scritte = SCRITTE.map(s => '<text class="co-appare" data-t="' + s[0] + '" x="' + s[1] + '" y="' + s[2] + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="' + (s[4] || 54) + '" fill="' + M + '" opacity="0" transform="rotate(-2 ' + s[1] + ' ' + s[2] + ')">' + s[3] + '</text>').join('');
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<g class="co-pagine" opacity="0"><rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      colori + '<g stroke="' + M + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' + tratti + '</g>' + scritte +
      '<g class="co-matita" opacity="0"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="' + M + '" transform="rotate(28)"/></g></g>';
    const html = G.sottotitolo('NARRATORE', 'Quello che hai visto ha dei nomi. La teleferica, che porta una richiesta fuori dal parco e torna con una striscia, è uno strumento.') +
      G.sottotitolo('NARRATORE', 'Le paperelle viola, la richiesta tra l’una e l’altra, e la cabina che parte: tutto questo si chiama chiamata di funzione.') +
      G.sottotitolo('NARRATORE', 'La striscia che torna sale sul treno come un passeggero qualunque: il treno non sa se è vera.') +
      G.sottotitolo('NARRATORE', 'E per la tua chat vuol dire questo: quando cerca o calcola fuori, il risultato lo porta come qualunque altra parola. Con la stessa calma, anche se è sbagliato.');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + pagine + '</svg>' + html + '</div>', 'coda')));
    const q = sel => kit.stage.querySelector(sel), qa = sel => [...kit.stage.querySelectorAll(sel)];
    this.pagine = q('.co-pagine'); this.tratti = qa('.co-tratto'); this.appare = qa('.co-appare'); this.matita = q('.co-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.tratti.forEach((p, i) => p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1)));
    this.sub = G.subs(kit, [[1.0, 12.2], [12.8, 23.2], [23.8, 31.8], [32.4, 46.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('12', 'coda', t);
    this.pagine.setAttribute('opacity', eo(seg(t, 0, 1.0)).toFixed(3));
    // La matita: un tratto dopo l'altro, e segue il tratto che sta disegnando.
    let punta = null;
    this.tratti.forEach((p, i) => {
      const a = +p.dataset.a, u = eio(seg(t, a, a + +p.dataset.d));
      p.setAttribute('stroke-dashoffset', ((1 - u) * this.lung[i]).toFixed(1));
      p.setAttribute('opacity', u > 0 ? 1 : 0);  // a lunghezza zero la punta tonda farebbe un puntino
      if (u > 0 && u < 1) punta = p.getPointAtLength(u * this.lung[i]);
    });
    this.matita.setAttribute('opacity', punta ? 1 : 0);
    if (punta) this.matita.setAttribute('transform', 'translate(' + punta.x.toFixed(1) + ' ' + punta.y.toFixed(1) + ')');
    // Colori e parole compaiono al loro momento.
    this.appare.forEach(e => { const a = +e.dataset.t; e.setAttribute('opacity', eo(seg(t, a, a + 0.5)).toFixed(3)); });
    this.sub(t);
  },
});
