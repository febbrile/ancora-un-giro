const { seg, eo, eio } = kit;
// Sotto il luna park: dopo il cartello Fine, il quaderno di Ada a tutto schermo. Gli schizzi dell'episodio, a matita,
// e accanto a ognuno il suo nome vero, scritto a mano mentre il narratore lo dice. Le scritte stanno sul quaderno,
// mai nel luna park: è l'unico posto del film con parole vere a schermo.
kit.scene('coda', {
  init(kit) {
    const G = window.G, C = G.C, D = G.MOD.mare, blu = D.passeggeri.Emma.tratti[2], M = '#3A3570';
    const box = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w) + ' ' + (y + h) + ' L' + x + ' ' + (y + h) + ' Z';
    const tondo = (x, y, r) => 'M' + (x - r) + ' ' + y + ' a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0 a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0';
    const vasca = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w - 0.06 * w) + ' ' + (y + h) + ' Q' + (x + w / 2) + ' ' + (y + h + 0.3 * h) + ' ' + (x + 0.06 * w) + ' ' + (y + h) + ' Z';
    // Gli schizzi, nell'ordine in cui la matita li disegna: [quando, tratti…]; ogni tratto dura mezzo secondo.
    const SCHIZZI = [
      [11.4, box(290, 330, 130, 64) + box(470, 330, 130, 64) + box(650, 330, 130, 64), tondo(355, 296, 22) + tondo(535, 296, 22) + tondo(715, 296, 22), 'M715 270 Q625 180 535 270', 'M715 270 Q535 120 355 270'],
      [19.8, 'M260 620 L880 620 M260 690 L880 690 M260 760 L880 760', 'M470 690 Q560 690 600 620', box(510, 640, 70, 36)],
      [28.4, vasca(1080, 300, 540, 100)],
      [36.2, vasca(1040, 700, 260, 60), box(1440, 650, 140, 50)],
    ];
    // Le parole, a mano: [quando, x, y, testo]. Compaiono quando il narratore le dice.
    const SCRITTE = [[5.6, 568, 170, 'modello di linguaggio'], [14.2, 535, 490, 'attenzione'], [21.9, 570, 840, 'strati'], [32.1, 1350, 480, 'probabilità'], [40.8, 1350, 850, 'scelta']];
    let tratti = '', k = 0;
    SCHIZZI.forEach(s => s.slice(1).forEach((d, i) => { tratti += '<path class="co-tratto" data-a="' + (s[0] + i * 0.5).toFixed(1) + '" d="' + d + '"/>'; k++; }));
    let colori = '';
    for (let i = 0; i < 9; i++) colori += '<g class="co-appare" data-t="' + (30.0 + i * 0.1).toFixed(1) + '" opacity="0" transform="translate(' + (1130 + i * 54) + ' ' + (335 + (i % 2) * 16) + ') scale(.4)">' + G.paperella(i === 3 ? '#28AAAA' : i === 6 ? '#5FA05F' : blu) + '</g>';
    colori += '<path class="co-appare" data-t="38.0" opacity="0" d="M1170 690 Q1320 540 1480 650" fill="none" stroke="' + M + '" stroke-width="6" stroke-linecap="round" stroke-dasharray="14 16"/>' +
      '<g class="co-appare" data-t="38.4" opacity="0" transform="translate(1510 648) scale(.55)">' + G.paperella(blu) + '</g>';
    const scritte = SCRITTE.map(s => '<text class="co-appare" data-t="' + s[0] + '" x="' + s[1] + '" y="' + s[2] + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="54" fill="' + M + '" opacity="0" transform="rotate(-2 ' + s[1] + ' ' + s[2] + ')">' + s[3] + '</text>').join('');
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<g class="co-pagine" opacity="0"><rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="' + M + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' + tratti + '</g>' + colori + scritte +
      '<g class="co-matita" opacity="0"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="' + M + '" transform="rotate(28)"/></g></g>';
    const html = G.sottotitolo('NARRATORE', 'Quello che hai visto ha dei nomi. Il luna park è un modello di linguaggio: una macchina che calcola, non che pensa.') +
      G.sottotitolo('NARRATORE', 'I fili di luce si chiamano attenzione: ogni parola guarda quelle che vengono prima di lei.') +
      G.sottotitolo('NARRATORE', 'Gli scambi sono gli strati: tappe uguali per tutte le frasi, che spostano un poco alla volta.') +
      G.sottotitolo('NARRATORE', 'Le paperelle nella vasca sono le probabilità, una per ogni parola che può venire dopo.') +
      G.sottotitolo('NARRATORE', 'E la pesca di Ada sta fuori dalla macchina: è la scelta di una parola tra quelle possibili.');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + pagine + '</svg>' + html + '</div>', 'coda')));
    const q = sel => kit.stage.querySelector(sel), qa = sel => [...kit.stage.querySelectorAll(sel)];
    this.pagine = q('.co-pagine'); this.tratti = qa('.co-tratto'); this.appare = qa('.co-appare'); this.matita = q('.co-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.tratti.forEach((p, i) => p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1)));
    this.sub = G.subs(kit, [[1.0, 10.6], [11.4, 19.0], [19.8, 27.6], [28.4, 35.6], [36.2, 43.8]]);
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
