const { seg, eo, eio } = kit;
// Sotto il luna park: dopo il cartello Fine, il quaderno di Ada a tutto schermo. Gli schizzi dell'episodio, a matita,
// e accanto a ognuno il suo nome vero, scritto a mano mentre il narratore lo dice. Le scritte stanno sul quaderno,
// mai nel luna park: è l'unico posto del film con parole vere a schermo.
// La coda nomina solo classificatore e filtro: quello che l'episodio ha mostrato col Bruco e la sbarra.
kit.scene('coda', {
  init(kit) {
    const G = window.G, C = G.C, M = '#3A3570';
    const box = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w) + ' ' + (y + h) + ' L' + x + ' ' + (y + h) + ' Z';
    const rbox = (x, y, w, h, r) => 'M' + (x + r) + ' ' + y + ' L' + (x + w - r) + ' ' + y + ' Q' + (x + w) + ' ' + y + ' ' + (x + w) + ' ' + (y + r) + ' L' + (x + w) + ' ' + (y + h - r) + ' Q' + (x + w) + ' ' + (y + h) + ' ' + (x + w - r) + ' ' + (y + h) + ' L' + (x + r) + ' ' + (y + h) + ' Q' + x + ' ' + (y + h) + ' ' + x + ' ' + (y + h - r) + ' L' + x + ' ' + (y + r) + ' Q' + x + ' ' + y + ' ' + (x + r) + ' ' + y + ' Z';
    const tondo = (x, y, r) => 'M' + (x - r) + ' ' + y + ' a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0 a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0';
    const vasca = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w - 0.06 * w) + ' ' + (y + h) + ' Q' + (x + w / 2) + ' ' + (y + h + 0.3 * h) + ' ' + (x + 0.06 * w) + ' ' + (y + h) + ' Z';
    const ROSSO = '#d04040';
    // Gli schizzi, nell'ordine in cui la matita li disegna: [quando, tratti…]; ogni tratto dura mezzo secondo.
    const SCHIZZI = [
      // Il Bruco: cinque segmenti, la piccola montagna a mela, la vasca piccola.
      [1.4, [280, 336, 392, 448, 504].map(x => tondo(x, 330, 26)).join(' '), tondo(640, 300, 60) + ' M640 240 L650 215', vasca(720, 330, 180, 50)],
      // La sbarra a righe, abbassata.
      [11.6, 'M300 820 L300 660 M300 690 L860 690', 'M380 680 L395 700 M470 680 L485 700 M560 680 L575 700 M650 680 L665 700 M740 680 L755 700 M830 680 L845 700'],
      // Il treno grande, con la sbarra alzata davanti.
      [22.2, [0, 1, 2, 3, 4, 5, 6].map(i => box(1120 + i * 76, 250, 70, 46)).join(' '), 'M1060 300 L1060 190 M1060 190 L1010 150'],
      // Il telefono, e il biglietto già pronto che gli vola incontro.
      [31.6, rbox(1250, 480, 240, 400, 24), box(1040, 620, 110, 60) + ' M1060 650 L1130 650'],
    ];
    // Le parole, a mano: [quando, x, y, testo]. Compaiono quando il narratore le dice.
    const SCRITTE = [[7.5, 560, 470, 'classificatore'], [17.0, 580, 790, 'filtro']];
    let tratti = '';
    SCHIZZI.forEach(s => s.slice(1).forEach((d, i) => { tratti += '<path class="co-tratto" data-a="' + (s[0] + i * 0.5).toFixed(1) + '" d="' + d + '"/>'; }));
    // Le sei paperelle del Bruco (cinque rosse e una verde) e le righe della sbarra ripassate in rosso.
    let colori = '';
    for (let i = 0; i < 6; i++) colori += '<g class="co-appare" data-t="' + (3.2 + i * 0.1).toFixed(1) + '" opacity="0" transform="translate(' + (733 + i * 25) + ' 335) scale(.28)">' + G.paperella(i === 3 ? '#3cb45a' : '#dc3c32') + '</g>';
    colori += '<path class="co-appare" data-t="12.8" opacity="0" fill="none" stroke="' + ROSSO + '" stroke-width="7" d="M380 680 L395 700 M470 680 L485 700 M560 680 L575 700 M650 680 L665 700 M740 680 L755 700 M830 680 L845 700"/>';
    const scritte = SCRITTE.map(s => '<text class="co-appare" data-t="' + s[0] + '" x="' + s[1] + '" y="' + s[2] + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="54" fill="' + M + '" opacity="0" transform="rotate(-2 ' + s[1] + ' ' + s[2] + ')">' + s[3] + '</text>').join('');
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<g class="co-pagine" opacity="0"><rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="' + M + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' + tratti + '</g>' + colori + scritte +
      '<g class="co-matita" opacity="0"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="' + M + '" transform="rotate(28)"/></g></g>';
    const html = G.sottotitolo('NARRATORE', 'Quello che hai visto ha dei nomi. Il Bruco, una giostra piccola con due colori soli nella vasca, è un classificatore.') +
      G.sottotitolo('NARRATORE', 'Il custode che conta le rosse e abbassa la sbarra è un filtro: una regola fuori dalla montagna, che conta e non legge.') +
      G.sottotitolo('NARRATORE', 'Il treno grande certe frasi non le vede mai. E anche la risposta, prima del telefono, passa dal Bruco.') +
      G.sottotitolo('NARRATORE', 'E per la tua chat vuol dire questo: quando ti arriva una risposta già pronta, non l’ha scritta il treno. L’ha fermata una sbarra, che può sbagliare.');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + pagine + '</svg>' + html + '</div>', 'coda')));
    const q = sel => kit.stage.querySelector(sel), qa = sel => [...kit.stage.querySelectorAll(sel)];
    this.pagine = q('.co-pagine'); this.tratti = qa('.co-tratto'); this.appare = qa('.co-appare'); this.matita = q('.co-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.tratti.forEach((p, i) => p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1)));
    this.sub = G.subs(kit, [[1.0, 11.0], [11.6, 21.6], [22.2, 31.0], [31.6, 44.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('11', 'coda', t);
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
