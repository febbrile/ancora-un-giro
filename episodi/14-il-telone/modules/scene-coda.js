const { seg, eo, eio } = kit;
// Sotto il luna park: dopo il cartello Fine, il quaderno di Ada a tutto schermo. Gli schizzi dell'episodio, a matita,
// e accanto a ognuno il suo nome vero, scritto a mano mentre il narratore lo dice. Le scritte stanno sul quaderno,
// mai nel luna park: è l'unico posto del film con parole vere a schermo.
// La coda nomina solo ragionamento nascosto e catena di pensiero: «limite di token» e «campanella» sono di altre puntate.
kit.scene('coda', {
  init(kit) {
    const G = window.G, C = G.C, M = '#3A3570';
    const box = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w) + ' ' + (y + h) + ' L' + x + ' ' + (y + h) + ' Z';
    const tondo = (x, y, r) => 'M' + (x - r) + ' ' + y + ' a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0 a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0';
    const rbox = (x, y, w, h, r) => 'M' + (x + r) + ' ' + y + ' L' + (x + w - r) + ' ' + y + ' Q' + (x + w) + ' ' + y + ' ' + (x + w) + ' ' + (y + r) + ' L' + (x + w) + ' ' + (y + h - r) + ' Q' + (x + w) + ' ' + (y + h) + ' ' + (x + w - r) + ' ' + (y + h) + ' L' + (x + r) + ' ' + (y + h) + ' Q' + x + ' ' + (y + h) + ' ' + x + ' ' + (y + h - r) + ' L' + x + ' ' + (y + r) + ' Q' + x + ' ' + y + ' ' + (x + r) + ' ' + y + ' Z';
    const fila = (n, x0, y, w, h, passo) => Array.from({ length: n }, (_, i) => box(x0 + i * passo, y, w, h)).join('');
    // Gli schizzi, nell'ordine in cui la matita li disegna: [quando, tratti…]; ogni tratto dura mezzo secondo.
    const SCHIZZI = [
      [1.4, fila(5, 260, 250, 80, 50, 90), 'M425 305 L425 235 Q470 190 515 235 Q555 190 595 235 Q635 190 680 235 L680 305', 'M505 205 L520 238 M612 203 L598 238'],
      [11.9, 'M420 610 L470 610 M456 598 L470 610 L456 622', 'M630 610 L680 610 M666 598 L680 610 L666 622'],
      [21.6, rbox(1230, 150, 240, 400, 24), tondo(1310, 350, 10) + tondo(1350, 350, 10) + tondo(1390, 350, 10)],
      [32.5, [1120, 1200, 1280, 1360, 1440, 1520].map(x => tondo(x, 720, 18)).join('')],
    ];
    // Le parole, a mano: [quando, x, y, testo]. Compaiono quando il narratore le dice.
    const SCRITTE = [[9.4, 560, 400, 'ragionamento nascosto'], [19.4, 560, 780, 'catena di pensiero']];
    let tratti = '';
    SCHIZZI.forEach(s => s.slice(1).forEach((d, i) => { tratti += '<path class="co-tratto" data-a="' + (s[0] + i * 0.5).toFixed(1) + '" d="' + d + '"/>'; }));
    // Le paperelle della catena, tra le frecce: compaiono una dopo l'altra.
    let colori = [[313, '#78736a', 13.0], [525, '#b4c85a', 13.4], [733, '#a04b14', 13.8]].map(p => '<g class="co-appare" data-t="' + p[2] + '" opacity="0" transform="translate(' + p[0] + ' 583) scale(.55)">' + G.paperella(p[1]) + '</g>').join('');
    const scritte = SCRITTE.map(s => '<text class="co-appare" data-t="' + s[0] + '" x="' + s[1] + '" y="' + s[2] + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="54" fill="' + M + '" opacity="0" transform="rotate(-2 ' + s[1] + ' ' + s[2] + ')">' + s[3] + '</text>').join('');
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<g class="co-pagine" opacity="0"><rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="' + M + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' + tratti + '</g>' + colori + scritte +
      '<g class="co-matita" opacity="0"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="' + M + '" transform="rotate(28)"/></g></g>';
    const html = G.sottotitolo('NARRATORE', 'Quello che hai visto ha dei nomi. I giri sotto il telone, quelli che il telefono non vede, sono il ragionamento nascosto.') +
      G.sottotitolo('NARRATORE', 'Le paperelle che salgono lì sotto, una dopo l’altra, prima della risposta, si chiamano catena di pensiero.') +
      G.sottotitolo('NARRATORE', 'Sono giri come gli altri: nessuno li controlla, e una paperella sbagliata lì sotto porta a una risposta sicura lo stesso.') +
      G.sottotitolo('NARRATORE', 'E per la tua chat vuol dire questo: l’attesa prima della risposta sono giri che non vedi. E dentro ci sono parole, come negli altri.');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + pagine + '</svg>' + html + '</div>', 'coda')));
    const q = sel => kit.stage.querySelector(sel), qa = sel => [...kit.stage.querySelectorAll(sel)];
    this.pagine = q('.co-pagine'); this.tratti = qa('.co-tratto'); this.appare = qa('.co-appare'); this.matita = q('.co-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.tratti.forEach((p, i) => p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1)));
    this.sub = G.subs(kit, [[1.0, 11.3], [11.9, 21.0], [21.6, 31.9], [32.5, 43.7]]);
  },
  render(t, kit) {
    t = window.G.tempo('14', 'coda', t);
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
