const { seg, eo, eio } = kit;
// Sotto il luna park: dopo il cartello Fine, il quaderno di Ada a tutto schermo. Gli schizzi dell'episodio, a matita,
// e accanto a ognuno il suo nome vero, scritto a mano mentre il narratore lo dice. Le scritte stanno sul quaderno,
// mai nel luna park: è l'unico posto del film con parole vere a schermo.
// La coda nomina solo tokenizzazione e sottoparole: «token» è del prologo, «attenzione» dell'episodio 1.
kit.scene('coda', {
  init(kit) {
    const G = window.G, C = G.C, M = '#3A3570';
    const box = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w) + ' ' + (y + h) + ' L' + x + ' ' + (y + h) + ' Z';
    const tondo = (x, y, r) => 'M' + (x - r) + ' ' + y + ' a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0 a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0';
    // Tre pezzi strappati, affiancati: i lati verticali interni sono a zig-zag e i bordi combaciano.
    const zig = (x, y, h, giu) => { const p = [[x, y], [x + 7, y + h / 4], [x, y + h / 2], [x + 7, y + 3 * h / 4], [x, y + h]]; return (giu ? p.reverse() : p).map(q => 'L' + q[0] + ' ' + q[1]).join(' '); };
    const pezzi = (x, y, w, h, gap) => [0, 1, 2].map(i => { const a = x + i * (w + gap), b = a + w; return 'M' + a + ' ' + y + ' L' + b + ' ' + y + ' ' + (i < 2 ? zig(b, y, h, false) : 'L' + b + ' ' + (y + h)) + ' L' + a + ' ' + (y + h) + ' ' + (i > 0 ? zig(a, y, h, true) : '') + ' Z'; });
    const P1 = pezzi(580, 260, 70, 40, 15), P2 = pezzi(520, 640, 110, 80, 10);
    // Gli schizzi, nell'ordine in cui la matita li disegna: [quando, tratti…]; ogni tratto dura mezzo secondo.
    const SCHIZZI = [
      [1.4, box(270, 200, 200, 160) + 'M490 240 L540 200 M490 200 L540 240', 'M190 280 L270 280', P1.join(' ')],
      [12.2, box(280, 640, 150, 80), P2.join(' ')],
      [22.6, box(1090, 430, 130, 64) + box(1270, 430, 130, 64) + box(1450, 430, 130, 64), tondo(1155, 396, 22) + tondo(1335, 396, 22) + tondo(1515, 396, 22), 'M1515 370 Q1425 280 1335 370 M1515 370 Q1335 220 1155 370'],
    ];
    // Le parole, a mano: [quando, x, y, testo]. Compaiono quando il narratore le dice.
    const SCRITTE = [[8.5, 560, 440, 'tokenizzazione'], [18.5, 580, 820, 'sottoparole']];
    let tratti = '', k = 0;
    SCHIZZI.forEach(s => s.slice(1).forEach((d, i) => { tratti += '<path class="co-tratto" data-a="' + (s[0] + i * 0.5).toFixed(1) + '" d="' + d + '"/>'; k++; }));
    // I colori dei biglietti: giallo, corallo e grigio argento, nell'ordine in cui li ha mostrati l'episodio.
    const COL = ['#eec552', '#cd8d7c', '#949f9c'];
    let colori = '';
    P2.forEach((d, i) => { colori += '<path class="co-appare" data-t="' + (13.4 + i * 0.3).toFixed(1) + '" opacity="0" d="' + d + '" fill="' + COL[i] + '" fill-opacity=".6" stroke="none"/>'; });
    [1155, 1335, 1515].forEach((x, i) => { colori += '<path class="co-appare" data-t="' + (24.4 + i * 0.3).toFixed(1) + '" opacity="0" d="' + tondo(x, 396, 22) + '" fill="' + COL[i] + '" fill-opacity=".6" stroke="none"/>'; });
    const scritte = SCRITTE.map(s => '<text class="co-appare" data-t="' + s[0] + '" x="' + s[1] + '" y="' + s[2] + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="54" fill="' + M + '" opacity="0" transform="rotate(-2 ' + s[1] + ' ' + s[2] + ')">' + s[3] + '</text>').join('');
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<g class="co-pagine" opacity="0"><rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="' + M + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' + tratti + '</g>' + colori + scritte +
      '<g class="co-matita" opacity="0"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="' + M + '" transform="rotate(28)"/></g></g>';
    const html = G.sottotitolo('NARRATORE', 'Quello che hai visto ha dei nomi. Il lavoro dello Spezzaparole, che taglia ogni frase in biglietti, si chiama tokenizzazione.') +
      G.sottotitolo('NARRATORE', 'I biglietti sono i token. Una parola che non ha il suo biglietto intero sale a pezzi: i pezzi si chiamano sottoparole.') +
      G.sottotitolo('NARRATORE', 'Dentro la montagna la parola intera non c’è: ci sono i suoi pezzi, e i fili di luce li tengono insieme.') +
      G.sottotitolo('NARRATORE', 'E per la tua chat vuol dire questo: le parole di tutti i giorni le vede intere; i nomi rari e inventati, a pezzi.');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + pagine + '</svg>' + html + '</div>', 'coda')));
    const q = sel => kit.stage.querySelector(sel), qa = sel => [...kit.stage.querySelectorAll(sel)];
    this.pagine = q('.co-pagine'); this.tratti = qa('.co-tratto'); this.appare = qa('.co-appare'); this.matita = q('.co-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.tratti.forEach((p, i) => p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1)));
    this.sub = G.subs(kit, [[1.0, 11.6], [12.2, 22.5], [22.6, 31.6], [32.2, 42.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('06', 'coda', t);
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
