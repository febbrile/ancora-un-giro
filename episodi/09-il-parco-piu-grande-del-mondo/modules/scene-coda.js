const { seg, eo, eio } = kit;
// Coda dell'episodio 9, «Sotto il luna park»: dopo il cartello Fine, il quaderno di Ada a tutto schermo. Gli schizzi a matita
// della montagna immensa, dei binari con gli scambi e del lago, e accanto a ognuno il suo nome vero, scritto a mano mentre il
// narratore lo dice. Le scritte stanno sul quaderno, mai nel luna park.
// La coda nomina solo LLM («modello di grandi dimensioni») e vocabolario: parametri e addestramento sono delle puntate loro.
kit.scene('coda', {
  init(kit) {
    const G = window.G, C = G.C, M = '#3A3570';
    const vasca = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w - 0.06 * w) + ' ' + (y + h) + ' Q' + (x + w / 2) + ' ' + (y + h + 0.3 * h) + ' ' + (x + 0.06 * w) + ' ' + (y + h) + ' Z';
    // Gli schizzi, nell'ordine in cui la matita li disegna: [quando, tratti…]; ogni tratto dura mezzo secondo,
    // salvo quelli scritti come [path, durata].
    const SCHIZZI = [
      [1.4, ['M250 400 L330 260 L400 360 L470 200 L540 330 L610 230 L680 350 L750 250 L820 380 L880 300 L920 400', 1.5], 'M230 440 Q260 300 300 330'],
      [12.6, 'M260 720 L880 720 M260 780 L880 780 M260 840 L880 840', 'M300 780 Q350 780 370 720 M420 840 Q470 840 490 780 M540 780 Q590 780 610 720 M640 840 Q690 840 710 780 M740 780 Q790 780 810 720 M560 720 Q600 720 620 680'],
      [23.0, vasca(1010, 330, 700, 160)],
    ];
    // Le parole, a mano: [quando, x, y, testo, corpo]. Compaiono quando il narratore le dice.
    const SCRITTE = [[8.0, 570, 520, 'LLM', 72], [8.0, 570, 566, 'modello di grandi dimensioni', 34], [29.0, 1360, 600, 'vocabolario', 54]];
    let tratti = '';
    SCHIZZI.forEach(s => {
      let a = s[0];
      s.slice(1).forEach(d => {
        const lungo = Array.isArray(d), dur = lungo ? d[1] : 0.5;
        tratti += '<path class="co-tratto" data-a="' + a.toFixed(1) + '" data-d="' + dur + '" d="' + (lungo ? d[0] : d) + '"/>';
        a += dur;
      });
    });
    let colori = '';
    // Una manciata di stelle sopra i binari.
    const r = G.rng(909);
    for (let i = 0; i < 12; i++) colori += '<circle class="co-appare" data-t="14.6" opacity="0" cx="' + Math.round(280 + r() * 600) + '" cy="' + Math.round(600 + r() * 80) + '" r="4" fill="' + C.oro + '"/>';
    // Le paperelle del lago: due file da dodici, ognuna del suo colore.
    const lago = G.MOD.grande.lago.slice(0, 24).map(p => p[2]);
    while (lago.length < 24) lago.push('#8246d2');
    lago.forEach((c, i) => {
      colori += '<g class="co-appare" data-t="' + (24.5 + i * 0.08).toFixed(2) + '" opacity="0" transform="translate(' + (1078 + (i % 12) * 50) + ' ' + (i < 12 ? 380 : 430) + ') scale(.35)">' + G.paperella(c) + '</g>';
    });
    const scritte = SCRITTE.map(s => '<text class="co-appare" data-t="' + s[0] + '" x="' + s[1] + '" y="' + s[2] + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="' + s[4] + '" fill="' + M + '" opacity="0" transform="rotate(-2 ' + s[1] + ' ' + s[2] + ')">' + s[3] + '</text>').join('');
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<g class="co-pagine" opacity="0"><rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="' + M + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' + tratti + '</g>' + colori + scritte +
      '<g class="co-matita" opacity="0"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="' + M + '" transform="rotate(28)"/></g></g>';
    const html = G.sottotitolo('NARRATORE', 'Quello che hai visto ha dei nomi. La montagna immensa, con tutti i suoi scambi, è un modello di grandi dimensioni: si dice LLM.') +
      G.sottotitolo('NARRATORE', 'Grande vuol dire questo: più parametri delle stelle in cielo, e una pista piegata da file e file di treni di prova.') +
      G.sottotitolo('NARRATORE', 'Tutti i colori che possono cadere nel lago, tutti i biglietti che lo Spezzaparole conosce, sono il vocabolario.') +
      G.sottotitolo('NARRATORE', 'E per la tua chat vuol dire questo: fa il giro in un parco così. Lo stesso giro del parco di Ada, in grande.');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + pagine + '</svg>' + html + '</div>', 'coda')));
    const q = sel => kit.stage.querySelector(sel), qa = sel => [...kit.stage.querySelectorAll(sel)];
    this.pagine = q('.co-pagine'); this.tratti = qa('.co-tratto'); this.appare = qa('.co-appare'); this.matita = q('.co-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.tratti.forEach((p, i) => p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1)));
    this.sub = G.subs(kit, [[1.0, 12.0], [12.6, 22.4], [23.0, 32.4], [33.0, 42.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('09', 'coda', t);
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
