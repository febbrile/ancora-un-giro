const { seg, eo, eio } = kit;
// Sotto il luna park: dopo il cartello Fine, il quaderno di Ada a tutto schermo. Gli schizzi dell'episodio, a matita,
// e accanto a ognuno il suo nome vero, scritto a mano mentre il narratore lo dice. Le scritte stanno sul quaderno,
// mai nel luna park: è l'unico posto del film con parole vere a schermo.
// La coda nomina solo addestramento e parametri: la pista fissata e la chat che non impara si dicono con le stesse immagini.
kit.scene('coda', {
  init(kit) {
    const G = window.G, C = G.C, M = '#3A3570';
    const box = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w) + ' ' + (y + h) + ' L' + x + ' ' + (y + h) + ' Z';
    const tondo = (x, y, r) => 'M' + (x - r) + ' ' + y + ' a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0 a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0';
    const vasca = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w - 0.06 * w) + ' ' + (y + h) + ' Q' + (x + w / 2) + ' ' + (y + h + 0.3 * h) + ' ' + (x + 0.06 * w) + ' ' + (y + h) + ' Z';
    // Gli schizzi, nell'ordine in cui la matita li disegna: [quando, tratti…]; ogni tratto dura mezzo secondo,
    // salvo quelli scritti come [path, durata] (con un terzo valore, il tratto è sottile).
    const SCHIZZI = [
      [1.4, box(280, 200, 110, 56) + box(395, 200, 110, 56) + box(510, 200, 110, 56), vasca(640, 330, 260, 70), tondo(770, 270, 22),
        ['M700 330 Q650 290 600 300 Q540 310 500 270 Q460 230 430 260', 1.5, 5]],
      [11.6, 'M260 640 L880 640 M260 710 L880 710 M260 780 L880 780', 'M400 710 Q470 710 500 640 M620 780 Q690 780 720 710', 'M300 640 Q340 640 360 600'],
      [21.4, ['M1020 820 Q1150 300 1300 500 Q1400 640 1500 420', 1.5], 'M1480 420 L1600 240 L1720 420'],
    ];
    // Le parole, a mano: [quando, x, y, testo]. Compaiono quando il narratore le dice.
    const SCRITTE = [[7.5, 560, 500, 'addestramento'], [16.5, 570, 870, 'parametri']];
    let tratti = '';
    SCHIZZI.forEach(s => {
      let a = s[0];
      s.slice(1).forEach(d => {
        const lungo = Array.isArray(d), dur = lungo ? d[1] : 0.5;
        tratti += '<path class="co-tratto" data-a="' + a.toFixed(1) + '" data-d="' + dur + '" d="' + (lungo ? d[0] : d) + '"' + (lungo && d[2] ? ' stroke-width="' + d[2] + '"' : '') + '/>';
        a += dur;
      });
    });
    // Il brivido arriva alla lanterna: il cerchio si colora di blu e nella vasca compaiono le paperelle, due blu e cinque di altri colori.
    let colori = '<path class="co-appare" data-t="3.8" opacity="0" d="' + tondo(770, 270, 22) + '" fill="#2f73d4" fill-opacity=".7" stroke="none"/>';
    ['#f07064', '#2864dc', '#f5c84c', '#3cb45a', '#2864dc', '#508ceb', '#9696a0'].forEach((c, i) => {
      colori += '<g class="co-appare" data-t="' + (3.8 + i * 0.1).toFixed(1) + '" opacity="0" transform="translate(' + (660 + i * 31) + ' ' + (345 + (i % 2) * 8) + ') scale(.3)">' + G.paperella(c) + '</g>';
    });
    const scritte = SCRITTE.map(s => '<text class="co-appare" data-t="' + s[0] + '" x="' + s[1] + '" y="' + s[2] + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="54" fill="' + M + '" opacity="0" transform="rotate(-2 ' + s[1] + ' ' + s[2] + ')">' + s[3] + '</text>').join('');
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<g class="co-pagine" opacity="0"><rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="' + M + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' + tratti + '</g>' + colori + scritte +
      '<g class="co-matita" opacity="0"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="' + M + '" transform="rotate(28)"/></g></g>';
    const html = G.sottotitolo('NARRATORE', 'Quello che hai visto ha dei nomi. Le notti dei treni di prova, prima che il parco aprisse, si chiamano addestramento.') +
      G.sottotitolo('NARRATORE', 'Gli scambi piegati, un pochino alla volta, sono i parametri: tutto quello che resta delle frasi di prova.') +
      G.sottotitolo('NARRATORE', 'Il brivido non c’è più: la pista è stata fissata così com’era l’ultima notte.') +
      G.sottotitolo('NARRATORE', 'E per la tua chat vuol dire questo: non impara da te mentre ci parli. Quello che le scrivi fa il giro, e la pista non si piega.');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + pagine + '</svg>' + html + '</div>', 'coda')));
    const q = sel => kit.stage.querySelector(sel), qa = sel => [...kit.stage.querySelectorAll(sel)];
    this.pagine = q('.co-pagine'); this.tratti = qa('.co-tratto'); this.appare = qa('.co-appare'); this.matita = q('.co-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.tratti.forEach((p, i) => p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1)));
    this.sub = G.subs(kit, [[1.0, 11.0], [11.6, 20.8], [21.4, 28.4], [29.0, 40.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('05', 'coda', t);
    this.pagine.setAttribute('opacity', eo(seg(t, 0, 1.0)).toFixed(3));
    // La matita: un tratto dopo l'altro, e segue il tratto che sta disegnando.
    let punta = null;
    this.tratti.forEach((p, i) => {
      const a = +p.dataset.a, d = +(p.dataset.d || 0.5), u = eio(seg(t, a, a + d));
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
