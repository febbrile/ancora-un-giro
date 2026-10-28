const { seg, eo, eio } = kit;
// Sotto il luna park: dopo il cartello Fine, il quaderno di Ada a tutto schermo. Gli schizzi dell'episodio, a matita,
// e accanto a ognuno il suo nome vero, scritto a mano mentre il narratore lo dice. Le scritte stanno sul quaderno,
// mai nel luna park: è l'unico posto del film con parole vere a schermo.
// La coda nomina solo contesto ed embedding: il resto è già stato nominato.
kit.scene('coda', {
  init(kit) {
    const G = window.G, C = G.C, Dm = G.MOD.mare, Dp = G.MOD.parco, M = '#3A3570';
    const rosa = Dm.passeggeri.Emma.biglietto, bluMare = Dm.passeggeri.mare.biglietto, verdeParco = Dp.passeggeri.parco.biglietto;
    const bluV = Dm.passeggeri.Emma.tratti[2], verdeV = Dp.passeggeri.Emma.tratti[2];
    const box = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w) + ' ' + (y + h) + ' L' + x + ' ' + (y + h) + ' Z';
    const vasca = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w - 0.06 * w) + ' ' + (y + h) + ' Q' + (x + w / 2) + ' ' + (y + h + 0.3 * h) + ' ' + (x + 0.06 * w) + ' ' + (y + h) + ' Z';
    const treno = y => box(290, y, 130, 64) + box(470, y, 130, 64) + box(650, y, 130, 64);
    const filo = y => 'M715 ' + y + ' Q625 ' + (y - 90) + ' 535 ' + y;
    // Gli schizzi, nell'ordine in cui la matita li disegna: [quando, tratti…]; ogni tratto dura mezzo secondo.
    const SCHIZZI = [
      [1.4, treno(240), treno(400), filo(240), filo(400)],
      [12.0, box(300, 700, 150, 90) + 'M325 730 L425 730 M325 760 L400 760', 'M-26 0 L26 0 L40 90 L-40 90 Z'.replace(/(-?\d+) (-?\d+)/g, (m, a, b) => (+a + 620) + ' ' + (+b + 700))],
      [22.0, vasca(1080, 300, 540, 100), vasca(1080, 640, 540, 100)],
    ];
    // Le parole, a mano: [quando, x, y, testo]. Compaiono quando il narratore le dice.
    const SCRITTE = [[8.4, 535, 560, 'contesto'], [18.6, 640, 850, 'embedding']];
    let tratti = '';
    SCHIZZI.forEach(s => s.slice(1).forEach((d, i) => { tratti += '<path class="co-tratto" data-a="' + (s[0] + i * 0.5).toFixed(1) + '" d="' + d + '"/>'; }));
    // Vagoni riempiti, ad appare insieme: il biglietto di Emma (rosa) è sempre l'ultimo vagone, il compagno è quello di mezzo.
    let colori = '';
    [[240, bluMare], [400, verdeParco]].forEach(([y, c]) => {
      colori += '<path class="co-appare" data-t="3.6" opacity="0" d="' + box(470, y, 130, 64) + '" fill="' + c + '" fill-opacity=".55"/>' +
        '<path class="co-appare" data-t="3.6" opacity="0" d="' + box(650, y, 130, 64) + '" fill="' + rosa + '" fill-opacity=".55"/>';
    });
    colori += '<path class="co-appare" data-t="13.2" opacity="0" d="M-26 0 L26 0 L40 90 L-40 90 Z" fill="' + rosa + '" transform="translate(620 700)"/>';
    [[300, bluV, '#5FA05F'], [640, verdeV, bluV]].forEach(([y, c, altro]) => {
      for (let i = 0; i < 9; i++) colori += '<g class="co-appare" data-t="' + (24.0 + i * 0.1).toFixed(1) + '" opacity="0" transform="translate(' + (1130 + i * 54) + ' ' + (y + 35 + (i % 2) * 16) + ') scale(.4)">' + G.paperella(i === 3 ? '#28AAAA' : i === 6 ? altro : c) + '</g>';
    });
    const scritte = SCRITTE.map(s => '<text class="co-appare" data-t="' + s[0] + '" x="' + s[1] + '" y="' + s[2] + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="54" fill="' + M + '" opacity="0" transform="rotate(-2 ' + s[1] + ' ' + s[2] + ')">' + s[3] + '</text>').join('');
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<g class="co-pagine" opacity="0"><rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' + colori +
      '<g stroke="' + M + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' + tratti + '</g>' + scritte +
      '<g class="co-matita" opacity="0"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="' + M + '" transform="rotate(28)"/></g></g>';
    const html = G.sottotitolo('NARRATORE', 'Quello che hai visto ha dei nomi. I compagni di viaggio di una parola, tutto il treno intorno a lei, si chiamano contesto.') +
      G.sottotitolo('NARRATORE', 'Il vestito con cui un biglietto sale sul treno, sempre lo stesso per la stessa parola, si chiama embedding.') +
      G.sottotitolo('NARRATORE', 'Il contesto entra solo dai fili: è da lì che a Emma arriva l’azzurro o il verde, e la vasca cambia.') +
      G.sottotitolo('NARRATORE', 'E per la tua chat vuol dire questo: la stessa domanda, con altre parole intorno, dà un’altra risposta.');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + pagine + '</svg>' + html + '</div>', 'coda')));
    const q = sel => kit.stage.querySelector(sel), qa = sel => [...kit.stage.querySelectorAll(sel)];
    this.pagine = q('.co-pagine'); this.tratti = qa('.co-tratto'); this.appare = qa('.co-appare'); this.matita = q('.co-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.tratti.forEach((p, i) => p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1)));
    this.sub = G.subs(kit, [[1.0, 11.4], [12.0, 21.4], [22.0, 30.8], [31.4, 40.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('02', 'coda', t);
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
