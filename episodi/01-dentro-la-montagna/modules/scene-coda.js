const { seg, eo, eio } = kit;
// Sotto il luna park: dopo il cartello Fine, il quaderno di Ada a tutto schermo. Gli schizzi dell'episodio, a matita,
// e accanto a ognuno il suo nome vero, scritto a mano mentre il narratore lo dice. Le scritte stanno sul quaderno,
// mai nel luna park: è l'unico posto del film con parole vere a schermo.
// La coda nomina solo attenzione e strati: «modello di linguaggio» e «probabilità» sono del prologo.
kit.scene('coda', {
  init(kit) {
    const G = window.G, C = G.C, D = G.MOD.mare, blu = D.passeggeri.Emma.tratti[2], M = '#3A3570';
    const box = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w) + ' ' + (y + h) + ' L' + x + ' ' + (y + h) + ' Z';
    const tondo = (x, y, r) => 'M' + (x - r) + ' ' + y + ' a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0 a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0';
    const vasca = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w - 0.06 * w) + ' ' + (y + h) + ' Q' + (x + w / 2) + ' ' + (y + h + 0.3 * h) + ' ' + (x + 0.06 * w) + ' ' + (y + h) + ' Z';
    // Gli schizzi, nell'ordine in cui la matita li disegna: [quando, tratti…]; ogni tratto dura mezzo secondo.
    const SCHIZZI = [
      [1.4, box(290, 330, 130, 64) + box(470, 330, 130, 64) + box(650, 330, 130, 64), tondo(355, 296, 22) + tondo(535, 296, 22) + tondo(715, 296, 22), 'M715 270 Q625 180 535 270', 'M715 270 Q535 120 355 270'],
      [13.8, 'M260 620 L880 620 M260 690 L880 690 M260 760 L880 760', 'M470 690 Q560 690 600 620', box(510, 640, 70, 36)],
      [22.6, box(1040, 260, 620, 190), vasca(1080, 300, 540, 100)],
    ];
    // Le parole, a mano: [quando, x, y, testo]. Compaiono quando il narratore le dice.
    const SCRITTE = [[8.6, 535, 490, 'attenzione'], [17.0, 570, 840, 'strati']];
    let tratti = '', k = 0;
    SCHIZZI.forEach(s => s.slice(1).forEach((d, i) => { tratti += '<path class="co-tratto" data-a="' + (s[0] + i * 0.5).toFixed(1) + '" d="' + d + '"/>'; k++; }));
    let colori = '';
    for (let i = 0; i < 9; i++) colori += '<g class="co-appare" data-t="' + (24.0 + i * 0.1).toFixed(1) + '" opacity="0" transform="translate(' + (1130 + i * 54) + ' ' + (335 + (i % 2) * 16) + ') scale(.4)">' + G.paperella(i === 3 ? '#28AAAA' : i === 6 ? '#5FA05F' : blu) + '</g>';
    // Tre vestitini in fila: il colore del biglietto di Emma e due tappe del suo viaggio.
    [D.passeggeri.Emma.biglietto, D.passeggeri.Emma.tratti[1], D.passeggeri.Emma.tratti[2]].forEach((c, i) => {
      colori += '<path class="co-appare" data-t="' + (36.4 + i * 0.4).toFixed(1) + '" opacity="0" d="M-26 0 L26 0 L40 90 L-40 90 Z" fill="' + c + '" transform="translate(' + (1150 + i * 150) + ' 700)"/>';
    });
    const scritte = SCRITTE.map(s => '<text class="co-appare" data-t="' + s[0] + '" x="' + s[1] + '" y="' + s[2] + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="54" fill="' + M + '" opacity="0" transform="rotate(-2 ' + s[1] + ' ' + s[2] + ')">' + s[3] + '</text>').join('');
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<g class="co-pagine" opacity="0"><rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="' + M + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' + tratti + '</g>' + colori + scritte +
      '<g class="co-matita" opacity="0"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="' + M + '" transform="rotate(28)"/></g></g>';
    const html = G.sottotitolo('NARRATORE', 'Quello che hai visto dentro la montagna ha dei nomi. I fili di luce si chiamano attenzione: ogni parola guarda quelle che vengono prima di lei.') +
      G.sottotitolo('NARRATORE', 'Gli scambi sono gli strati: tappe uguali per tutte le frasi, che spostano un poco alla volta.') +
      G.sottotitolo('NARRATORE', 'Le finestre mostrano le probabilità che cambiano a ogni strato: la risposta si costruisce a tappe.') +
      G.sottotitolo('NARRATORE', 'E per la tua chat vuol dire questo: non c’è un momento in cui la macchina capisce. C’è un giro, e un vestito che cambia colore.');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + pagine + '</svg>' + html + '</div>', 'coda')));
    const q = sel => kit.stage.querySelector(sel), qa = sel => [...kit.stage.querySelectorAll(sel)];
    this.pagine = q('.co-pagine'); this.tratti = qa('.co-tratto'); this.appare = qa('.co-appare'); this.matita = q('.co-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.tratti.forEach((p, i) => p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1)));
    this.sub = G.subs(kit, [[1.0, 13.0], [13.8, 21.8], [22.6, 31.0], [31.8, 42.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('01', 'coda', t);
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
