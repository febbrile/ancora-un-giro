const { seg, eo, eio } = kit;
// Sotto il luna park: dopo il cartello Fine, il quaderno di Ada a tutto schermo. Gli schizzi dell'episodio, a matita,
// e accanto a ognuno il suo nome vero, scritto a mano mentre il narratore lo dice. Le scritte stanno sul quaderno,
// mai nel luna park: è l'unico posto del film con parole vere a schermo.
// La coda nomina solo l'allucinazione: gli altri nomi (modello, probabilità, temperatura) sono già stati detti.
kit.scene('coda', {
  init(kit) {
    const G = window.G, C = G.C, M = '#3A3570';
    const rbox = (x, y, w, h, r) => 'M' + (x + r) + ' ' + y + ' L' + (x + w - r) + ' ' + y + ' Q' + (x + w) + ' ' + y + ' ' + (x + w) + ' ' + (y + r) + ' L' + (x + w) + ' ' + (y + h - r) + ' Q' + (x + w) + ' ' + (y + h) + ' ' + (x + w - r) + ' ' + (y + h) + ' L' + (x + r) + ' ' + (y + h) + ' Q' + x + ' ' + (y + h) + ' ' + x + ' ' + (y + h - r) + ' L' + x + ' ' + (y + r) + ' Q' + x + ' ' + y + ' ' + (x + r) + ' ' + y + ' Z';
    const vasca = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w - 0.06 * w) + ' ' + (y + h) + ' Q' + (x + w / 2) + ' ' + (y + h + 0.3 * h) + ' ' + (x + 0.06 * w) + ' ' + (y + h) + ' Z';
    // Gli schizzi, nell'ordine in cui la matita li disegna: [quando, tratti…]; ogni tratto dura mezzo secondo.
    // La montagna è vuota: la pista non porta nessun elenco di cose vere. Le due paperelle in fila non si disegnano a matita.
    const SCHIZZI = [
      [1.4, vasca(300, 280, 540, 100)],
      [12.8, 'M280 820 L470 580 L660 820', 'M330 790 L610 790 M350 740 L590 740 M380 690 L560 690'],
      [31.4, rbox(1180, 220, 300, 520, 24), 'M1230 330 L1430 330 M1230 420 L1330 420'],
    ];
    // Le parole, a mano: [quando, x, y, testo]. Compaiono quando il narratore le dice.
    const SCRITTE = [[7.0, 570, 470, 'allucinazione']];
    let tratti = '';
    SCHIZZI.forEach(s => s.slice(1).forEach((d, i) => { tratti += '<path class="co-tratto" data-a="' + (s[0] + i * 0.5).toFixed(1) + '" d="' + d + '"/>'; }));
    const CALDI = ['#d6965c', '#b0764c', '#e8b660', '#cc8068', '#9e7054', '#e2a276', '#d6965c', '#b0764c', '#e8b660'];
    let colori = '';
    CALDI.forEach((c, i) => { colori += '<g class="co-appare" data-t="' + (2.0 + i * 0.1).toFixed(1) + '" opacity="0" transform="translate(' + (340 + i * 50) + ' ' + (315 + (i % 2) * 16) + ') scale(.4)">' + G.paperella(c) + '</g>'; });
    // Due paperelle in fila, fatte allo stesso modo: una blu e una caramello.
    [['#2864dc', 700, 24.4], ['#c38959', 800, 24.8]].forEach(p => { colori += '<g class="co-appare" data-t="' + p[2] + '" opacity="0" transform="translate(' + p[1] + ' 690) scale(.7)">' + G.paperella(p[0]) + '</g>'; });
    const scritte = SCRITTE.map(s => '<text class="co-appare" data-t="' + s[0] + '" x="' + s[1] + '" y="' + s[2] + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="54" fill="' + M + '" opacity="0" transform="rotate(-2 ' + s[1] + ' ' + s[2] + ')">' + s[3] + '</text>').join('');
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<g class="co-pagine" opacity="0"><rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="' + M + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' + tratti + '</g>' + colori + scritte +
      '<g class="co-matita" opacity="0"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="' + M + '" transform="rotate(28)"/></g></g>';
    const html = G.sottotitolo('NARRATORE', 'Quello che hai visto ha un nome. Una risposta su una cosa che non c’è, detta tranquilla come tutte le altre, si chiama allucinazione.') +
      G.sottotitolo('NARRATORE', 'Dentro la montagna non c’è un elenco di cose vere: c’è una pista piegata dai treni di prova, e la vasca si riempie sempre.') +
      G.sottotitolo('NARRATORE', 'La paperella pescata è fatta come tutte le altre: non porta scritto se è vera.') +
      G.sottotitolo('NARRATORE', 'E per la tua chat vuol dire questo: una risposta sicura non è per questo vera. Quando chiedi una cosa che non esiste, ti risponde lo stesso.');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + pagine + '</svg>' + html + '</div>', 'coda')));
    const q = sel => kit.stage.querySelector(sel), qa = sel => [...kit.stage.querySelectorAll(sel)];
    this.pagine = q('.co-pagine'); this.tratti = qa('.co-tratto'); this.appare = qa('.co-appare'); this.matita = q('.co-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.tratti.forEach((p, i) => p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1)));
    this.sub = G.subs(kit, [[1.0, 12.2], [12.8, 23.2], [23.8, 30.8], [31.4, 43.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('08', 'coda', t);
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
