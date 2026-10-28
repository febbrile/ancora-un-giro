const { seg, eo, eio } = kit;
// Sotto il luna park: dopo il cartello Fine, il quaderno di Ada a tutto schermo. Gli schizzi dell'episodio, a matita,
// e accanto a ognuno il suo nome vero, scritto a mano mentre il narratore lo dice. Le scritte stanno sul quaderno,
// mai nel luna park: è l'unico posto del film con parole vere a schermo.
// La coda nomina solo la finestra di contesto: striscia e biglietti restano quelli della storia.
kit.scene('coda', {
  init(kit) {
    const G = window.G, C = G.C, H = G.MOD.chat, M = '#3A3570';
    const box = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w) + ' ' + (y + h) + ' L' + x + ' ' + (y + h) + ' Z';
    const fila = (n, x, y, passo, w, h) => { let d = ''; for (let i = 0; i < n; i++) d += box(x + i * passo, y, w, h); return d; };
    // Un biglietto un po' storto: il bordo alto è inclinato di poco.
    const storto = (x, y, w, h, s) => 'M' + x + ' ' + (y + s) + ' L' + (x + w) + ' ' + y + ' L' + (x + w) + ' ' + (y + h) + ' L' + x + ' ' + (y + h + s) + ' Z';
    // I due pali a righe della banchina, ai capi: palo verticale e sbarra obliqua in cima.
    const pali = y => 'M265 ' + y + ' L265 ' + (y - 100) + ' M865 ' + y + ' L865 ' + (y - 100) + ' M265 ' + (y - 100) + ' L310 ' + (y - 120) + ' M865 ' + (y - 100) + ' L820 ' + (y - 120);
    // Gli schizzi, nell'ordine in cui la matita li disegna: [quando, tratti…]; ogni tratto dura mezzo secondo,
    // salvo quelli scritti come [path, durata].
    const SCHIZZI = [
      [1.4, 'M250 400 L880 400', pali(400), fila(3, 510, 340, 114, 110, 56)],
      [10.6, ['M1700 110 Q1600 250 1350 230 Q1100 210 1060 380', 1.5], fila(6, 1040, 430, 100, 90, 50)],
      [21.2, 'M250 760 L880 760' + pali(760), fila(7, 285, 700, 80, 80, 50), storto(200, 790, 56, 34, 0) + storto(270, 800, 56, 34, 6)],
    ];
    // Le parole, a mano: [quando, x, y, testo, dimensione]. Compaiono quando il narratore le dice.
    const SCRITTE = [[6.0, 565, 500, 'finestra di contesto', 54]];
    let tratti = '';
    SCHIZZI.forEach(s => {
      let a = s[0];
      s.slice(1).forEach(d => {
        const lungo = Array.isArray(d), dur = lungo ? d[1] : 0.5;
        tratti += '<path class="co-tratto" data-a="' + a.toFixed(1) + '" data-d="' + dur + '" d="' + (lungo ? d[0] : d) + '"' + (lungo ? ' stroke-width="5" stroke-opacity=".7"' : '') + '/>';
        a += dur;
      });
    });
    // Le righe rosse sui due pali; i due biglietti per terra colorati col loro biglietto.
    let colori = '';
    [265, 865].forEach(x => { for (let y = 320; y < 400; y += 22) colori += '<path class="co-appare" data-t="3.2" opacity="0" d="M' + (x - 12) + ' ' + (y + 6) + ' L' + (x + 12) + ' ' + (y - 6) + '" stroke="#d04040" stroke-width="6" stroke-linecap="round"/>'; });
    [[0, 0], [1, 6]].forEach(([i, s]) => {
      colori += '<path class="co-appare" data-t="23.0" opacity="0" d="' + storto(200 + i * 70, 790 + i * 10, 56, 34, s) + '" fill="' + H.messaggi[0].biglietti[i] + '" fill-opacity=".55"/>';
    });
    const scritte = SCRITTE.map(s => '<text class="co-appare" data-t="' + s[0] + '" x="' + s[1] + '" y="' + s[2] + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="' + s[4] + '" fill="' + M + '" opacity="0" transform="rotate(-2 ' + s[1] + ' ' + s[2] + ')">' + s[3] + '</text>').join('');
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<g class="co-pagine" opacity="0"><rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="' + M + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' + tratti + '</g>' + colori + scritte +
      '<g class="co-matita" opacity="0"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="' + M + '" transform="rotate(28)"/></g></g>';
    const html = G.sottotitolo('NARRATORE', 'Quello che hai visto ha dei nomi. La banchina, con i suoi posti contati, si chiama finestra di contesto.') +
      G.sottotitolo('NARRATORE', 'Il treno non ricorda niente: a ogni messaggio la striscia porta tutta la chat, e i biglietti risalgono dal principio.') +
      G.sottotitolo('NARRATORE', 'Quando la chat è più lunga della banchina, i primi biglietti restano giù, e il treno parte senza di loro.') +
      G.sottotitolo('NARRATORE', 'E per la tua chat vuol dire questo: se diventa lunga, le prime cose che hai scritto non salgono più. Non le ha dimenticate: non le ha mai tenute.');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + pagine + '</svg>' + html + '</div>', 'coda')));
    const q = sel => kit.stage.querySelector(sel), qa = sel => [...kit.stage.querySelectorAll(sel)];
    this.pagine = q('.co-pagine'); this.tratti = qa('.co-tratto'); this.appare = qa('.co-appare'); this.matita = q('.co-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.tratti.forEach((p, i) => p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1)));
    this.sub = G.subs(kit, [[1.0, 10.0], [10.6, 20.6], [21.2, 30.2], [30.8, 43.4]]);
  },
  render(t, kit) {
    t = window.G.tempo('04', 'coda', t);
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
