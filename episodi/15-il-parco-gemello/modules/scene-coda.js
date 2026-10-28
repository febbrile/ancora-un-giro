const { seg, eo, eio } = kit;
// Sotto il luna park: dopo il cartello Fine, il quaderno di Ada a tutto schermo. Gli schizzi dell'episodio, a matita,
// e accanto a ognuno il suo nome vero, scritto a mano mentre il narratore lo dice. Le scritte stanno sul quaderno,
// mai nel luna park: è l'unico posto del film con parole vere a schermo.
// La coda nomina solo stesso modello e applicazione: «prompt di sistema», «classificatore» e «strumento» sono di altre puntate.
kit.scene('coda', {
  init(kit) {
    const G = window.G, C = G.C, M = '#3A3570';
    const box = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w) + ' ' + (y + h) + ' L' + x + ' ' + (y + h) + ' Z';
    const tondo = (x, y, r) => 'M' + (x - r) + ' ' + y + ' a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0 a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0';
    const rbox = (x, y, w, h, r) => 'M' + (x + r) + ' ' + y + ' L' + (x + w - r) + ' ' + y + ' Q' + (x + w) + ' ' + y + ' ' + (x + w) + ' ' + (y + r) + ' L' + (x + w) + ' ' + (y + h - r) + ' Q' + (x + w) + ' ' + (y + h) + ' ' + (x + w - r) + ' ' + (y + h) + ' L' + (x + r) + ' ' + (y + h) + ' Q' + x + ' ' + (y + h) + ' ' + x + ' ' + (y + h - r) + ' L' + x + ' ' + (y + r) + ' Q' + x + ' ' + y + ' ' + (x + r) + ' ' + y + ' Z';
    const fila = (n, x0, y, w, h, passo) => Array.from({ length: n }, (_, i) => box(x0 + i * passo, y, w, h)).join('');
    // Gli schizzi, nell'ordine in cui la matita li disegna: [quando, tratti…]; ogni tratto dura mezzo secondo.
    const SCHIZZI = [
      [1.4, 'M230 350 L360 140 L490 350', 'M640 350 L770 140 L900 350', 'M255 335 Q330 255 420 320 M665 335 Q740 255 830 320', 'M565 120 Q540 210 565 290 Q590 370 565 420'],
      [10.3, tondo(565, 700, 145), 'M515 745 L565 665 L615 745', rbox(445, 685, 24, 34, 4) + box(615, 615, 70, 20) + tondo(455, 765, 9) + tondo(475, 765, 9) + tondo(495, 765, 9) + 'M655 805 L655 755 M635 755 L675 755'],
      [21.1, rbox(1060, 200, 220, 380, 24) + rbox(1400, 200, 220, 380, 24), box(1090, 260, 160, 30) + box(1430, 260, 160, 30)],
    ];
    // Le parole, a mano: [quando, x, y, testo]. Compaiono quando il narratore le dice.
    const SCRITTE = [[8.4, 565, 470, 'stesso modello'], [19.4, 565, 895, 'applicazione']];
    let tratti = '';
    SCHIZZI.forEach(s => s.slice(1).forEach((d, i) => { tratti += '<path class="co-tratto" data-a="' + (s[0] + i * 0.5).toFixed(1) + '" d="' + d + '"/>'; }));
    // Le due paperelle colorate, una sotto ogni telefono (la paperella è larga 100, centro a x = 52: a scala .8 la traslazione è centro − 42).
    const colori = [[1128, '#2864dc', 31.6], [1468, '#28aaaa', 32.0]].map(c => '<g class="co-appare" data-t="' + c[2] + '" opacity="0" transform="translate(' + c[0] + ' 650) scale(.8)">' + G.paperella(c[1]) + '</g>').join('');
    const scritte = SCRITTE.map(s => '<text class="co-appare" data-t="' + s[0] + '" x="' + s[1] + '" y="' + s[2] + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="54" fill="' + M + '" opacity="0" transform="rotate(-2 ' + s[1] + ' ' + s[2] + ')">' + s[3] + '</text>').join('');
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<g class="co-pagine" opacity="0"><rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="' + M + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' + tratti + '</g>' + colori + scritte +
      '<g class="co-matita" opacity="0"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="' + M + '" transform="rotate(28)"/></g></g>';
    const html = G.sottotitolo('NARRATORE', 'Quello che hai visto ha dei nomi. Due montagne identiche, con la stessa pista, sono lo stesso modello.') +
      G.sottotitolo('NARRATORE', 'Il parco intorno, con il custode, il regolamento, la frase del parco, il Bruco e la teleferica, si chiama applicazione.') +
      G.sottotitolo('NARRATORE', 'Tutto quello che hai visto in questa stagione sta nel parco, non nella montagna. E ogni parco ha il suo.') +
      G.sottotitolo('NARRATORE', 'E per la tua chat vuol dire questo: due chat con lo stesso modello dentro possono rispondere diverse. Cambia il parco intorno, non la montagna.');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + pagine + '</svg>' + html + '</div>', 'coda')));
    const q = sel => kit.stage.querySelector(sel), qa = sel => [...kit.stage.querySelectorAll(sel)];
    this.pagine = q('.co-pagine'); this.tratti = qa('.co-tratto'); this.appare = qa('.co-appare'); this.matita = q('.co-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.tratti.forEach((p, i) => p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1)));
    this.sub = G.subs(kit, [[1.0, 9.7], [10.3, 20.5], [21.1, 30.0], [30.6, 43.0]]);
  },
  render(t, kit) {
    t = window.G.tempo('15', 'coda', t);
    this.pagine.setAttribute('opacity', eo(seg(t, 0, 1.0)).toFixed(3));
    // La matita: un tratto dopo l'altro, e segue il tratto che sta disegnando.
    let punta = null;
    this.tratti.forEach((p, i) => {
      const a = +p.dataset.a, u = eio(seg(t, a, a + 0.5));
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
