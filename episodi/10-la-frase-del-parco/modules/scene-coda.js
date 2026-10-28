const { seg, eo, eio } = kit;
// Sotto il luna park: dopo il cartello Fine, il quaderno di Ada a tutto schermo. Gli schizzi dell'episodio, a matita,
// e accanto a ognuno il suo nome vero, scritto a mano mentre il narratore lo dice. Le scritte stanno sul quaderno,
// mai nel luna park: è l'unico posto del film con parole vere a schermo.
// La coda nomina solo prompt di sistema e ruoli: l'attenzione è dell'episodio 1.
kit.scene('coda', {
  init(kit) {
    const G = window.G, C = G.C, M = '#3A3570';
    const box = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w) + ' ' + (y + h) + ' L' + x + ' ' + (y + h) + ' Z';
    const bandierina = x => 'M' + x + ' 760 L' + x + ' 670 M' + x + ' 670 L' + (x + 46) + ' 686 L' + x + ' 702';
    // Gli schizzi, nell'ordine in cui la matita li disegna: [quando, tratti…]; ogni tratto dura mezzo secondo,
    // salvo quelli scritti come [path, durata].
    const SCHIZZI = [
      [1.4, box(240, 280, 640, 60), 'M400 280 L400 340 M262 270 L262 215 M262 215 L300 228 L262 241'],
      [12.0, bandierina(380), bandierina(560), bandierina(740)],
      [21.8, (() => { let d = ''; for (let i = 0; i < 9; i++) d += box(1030 + i * 72, 480, 66, 44); return d; })(), ['M1639 470 Q1430 230 1279 470', 1.0]],
    ];
    // Le parole, a mano: [quando, x, y, testo]. Compaiono quando il narratore le dice.
    const SCRITTE = [[7.5, 560, 430, 'prompt di sistema'], [16.5, 570, 850, 'ruoli']];
    let tratti = '';
    SCHIZZI.forEach(s => {
      let a = s[0];
      s.slice(1).forEach(d => {
        const lungo = Array.isArray(d), dur = lungo ? d[1] : 0.5;
        tratti += '<path class="co-tratto" data-a="' + a.toFixed(1) + '" data-d="' + dur + '" d="' + (lungo ? d[0] : d) + '"' + (lungo ? ' stroke-width="5" stroke-opacity=".7"' : '') + '/>';
        a += dur;
      });
    });
    // I colori: la frase del parco e la bandierina d'oro; le tre bandierine; il quarto vagone (blu) e l'ultimo (ottone).
    let colori = '<rect class="co-appare" data-t="3.0" opacity="0" x="240" y="280" width="160" height="60" fill="' + C.oro + '" fill-opacity=".35"/>' +
      '<path class="co-appare" data-t="3.0" opacity="0" d="M262 215 L300 228 L262 241 Z" fill="#f3c74e"/>';
    ['#f3c74e', '#98969f', '#b2a17f'].forEach((c, i) => {
      const x = 380 + i * 180;
      colori += '<path class="co-appare" data-t="' + (13.8 + i * 0.4).toFixed(1) + '" opacity="0" d="M' + x + ' 670 L' + (x + 46) + ' 686 L' + x + ' 702 Z" fill="' + c + '" fill-opacity=".8"/>';
    });
    colori += '<rect class="co-appare" data-t="23.6" opacity="0" x="1246" y="480" width="66" height="44" fill="#4681d7" fill-opacity=".55"/>' +
      '<rect class="co-appare" data-t="23.6" opacity="0" x="1606" y="480" width="66" height="44" fill="#b2a17f" fill-opacity=".55"/>';
    const scritte = SCRITTE.map(s => '<text class="co-appare" data-t="' + s[0] + '" x="' + s[1] + '" y="' + s[2] + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="54" fill="' + M + '" opacity="0" transform="rotate(-2 ' + s[1] + ' ' + s[2] + ')">' + s[3] + '</text>').join('');
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<g class="co-pagine" opacity="0"><rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="' + M + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' + tratti + '</g>' + colori + scritte +
      '<g class="co-matita" opacity="0"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="' + M + '" transform="rotate(28)"/></g></g>';
    const html = G.sottotitolo('NARRATORE', 'Quello che hai visto ha dei nomi. La frase del parco, che il custode attacca in testa a ogni striscia, è il prompt di sistema.') +
      G.sottotitolo('NARRATORE', 'Le bandierine segnano i ruoli: d’oro per il parco, d’argento per chi scrive, d’ottone per la risposta.') +
      G.sottotitolo('NARRATORE', 'Siede davanti a tutto, e il blu arriva lungo i fili. Ma non guida: è un passeggero come gli altri.') +
      G.sottotitolo('NARRATORE', 'E per la tua chat vuol dire questo: prima del tuo messaggio ce n’è uno che non vedi. Pesa, ma non comanda.');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + pagine + '</svg>' + html + '</div>', 'coda')));
    const q = sel => kit.stage.querySelector(sel), qa = sel => [...kit.stage.querySelectorAll(sel)];
    this.pagine = q('.co-pagine'); this.tratti = qa('.co-tratto'); this.appare = qa('.co-appare'); this.matita = q('.co-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.tratti.forEach((p, i) => p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1)));
    this.sub = G.subs(kit, [[1.0, 11.5], [12.0, 21.2], [21.8, 30.4], [31.0, 40.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('10', 'coda', t);
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
