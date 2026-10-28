const { seg, eo, eio } = kit;
// Sotto il luna park: dopo il cartello Fine, il quaderno di Ada a tutto schermo. Gli schizzi dell'episodio, a matita,
// e accanto a ognuno il suo nome vero, scritto a mano mentre il narratore lo dice. Le scritte stanno sul quaderno,
// mai nel luna park: è l'unico posto del film con parole vere a schermo.
// La coda nomina solo il token di fine: tutto il resto l'ha già detto la storia.
kit.scene('coda', {
  init(kit) {
    const G = window.G, C = G.C, M = '#3A3570', SCURA = '#46465a', GRIGIA = '#9696a0', GIALLA = '#f5c84c';
    const box = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w) + ' ' + (y + h) + ' L' + x + ' ' + (y + h) + ' Z';
    const tondo = (x, y, r) => 'M' + (x - r) + ' ' + y + ' a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0 a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0';
    const vasca = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w - 0.06 * w) + ' ' + (y + h) + ' Q' + (x + w / 2) + ' ' + (y + h + 0.3 * h) + ' ' + (x + 0.06 * w) + ' ' + (y + h) + ' Z';
    const vaschette = [230, 360, 490, 620, 750];
    let treno = '';
    for (let i = 0; i < 6; i++) treno += box(1060 + i * 100, 460, 100, 56);
    // Gli schizzi, nell'ordine in cui la matita li disegna: [quando, tratti…]; ogni tratto dura mezzo secondo.
    const SCHIZZI = [
      [1.4, vasca(300, 300, 540, 100)],
      [10.0, vaschette.map(x => vasca(x, 700, 110, 40)).join('')],
      [19.4, treno, tondo(1050, 488, 10)],
    ];
    // Le parole, a mano: [quando, x, y, testo]. Compaiono quando il narratore le dice.
    const SCRITTE = [[5.0, 570, 490, 'token di fine']];
    let tratti = '', k = 0;
    SCHIZZI.forEach(s => s.slice(1).forEach((d, i) => { tratti += '<path class="co-tratto" data-a="' + (s[0] + i * 0.5).toFixed(1) + '" d="' + d + '"/>'; k++; }));
    const duck = (t, x, y, s, col) => '<g class="co-appare" data-t="' + t.toFixed(1) + '" opacity="0" transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + G.paperella(col) + '</g>';
    let colori = '';
    // La vasca grande: nove paperelle, sette scure, una grigia, una gialla.
    const grande = [SCURA, SCURA, SCURA, GRIGIA, SCURA, SCURA, SCURA, SCURA, GIALLA];
    grande.forEach((c, i) => { colori += duck(2.0 + i * 0.1, 345 + i * 54, 328 + (i % 2) * 14, .4, c); });
    // Le cinque vaschette: 1, 1, 1, 2 e 4 paperelle scure su cinque.
    const CH = ['#2864dc', '#28aaaa', '#f08c78', GRIGIA];
    const piccole = [
      [CH[0], SCURA, CH[1], CH[2], CH[3]],
      [CH[2], CH[3], SCURA, CH[0], CH[1]],
      [CH[1], CH[0], CH[3], SCURA, CH[2]],
      [SCURA, CH[1], CH[2], SCURA, CH[0]],
      [SCURA, SCURA, GRIGIA, SCURA, SCURA],
    ];
    let n = 0;
    piccole.forEach((v, j) => v.forEach((c, i) => { colori += duck(11.0 + n * 0.1, vaschette[j] + 8 + i * 17, 705 + (i % 2) * 4, .22, c); n++; }));
    // Il treno fermo: la paperella scura sta davanti, a terra, e non sale.
    colori += duck(20.6, 990, 560, .5, SCURA);
    const scritte = SCRITTE.map(s => '<text class="co-appare" data-t="' + s[0] + '" x="' + s[1] + '" y="' + s[2] + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="54" fill="' + M + '" opacity="0" transform="rotate(-2 ' + s[1] + ' ' + s[2] + ')">' + s[3] + '</text>').join('');
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<g class="co-pagine" opacity="0"><rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="' + M + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' + tratti + '</g>' + colori + scritte +
      '<g class="co-matita" opacity="0"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="' + M + '" transform="rotate(28)"/></g></g>';
    const html = G.sottotitolo('NARRATORE', 'Quello che hai visto ha un nome. La paperella scura, del colore della notte, è il token di fine.') +
      G.sottotitolo('NARRATORE', 'È una paperella come le altre: nella vasca c’è sempre stata, una sola la prima sera, poi sempre di più.') +
      G.sottotitolo('NARRATORE', 'Quando viene pescata, nessuno sale sul treno: il giro si ferma lì, e la risposta è finita.') +
      G.sottotitolo('NARRATORE', 'E per la tua chat vuol dire questo: la risposta finisce perché è uscita una paperella scura, non perché la macchina ha finito di pensare.');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + pagine + '</svg>' + html + '</div>', 'coda')));
    const q = sel => kit.stage.querySelector(sel), qa = sel => [...kit.stage.querySelectorAll(sel)];
    this.pagine = q('.co-pagine'); this.tratti = qa('.co-tratto'); this.appare = qa('.co-appare'); this.matita = q('.co-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.tratti.forEach((p, i) => p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1)));
    this.sub = G.subs(kit, [[1.0, 9.4], [10.0, 18.8], [19.4, 27.4], [28.0, 39.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('07', 'coda', t);
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
    // Paperelle e parole compaiono al loro momento.
    this.appare.forEach(e => { const a = +e.dataset.t; e.setAttribute('opacity', eo(seg(t, a, a + 0.5)).toFixed(3)); });
    this.sub(t);
  },
});
