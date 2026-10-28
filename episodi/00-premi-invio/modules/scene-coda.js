const { seg, eo, eio } = kit;
// Coda del prologo, «Sotto il luna park»: dopo il cartello Fine, il quaderno di Ada a tutto schermo. Gli schizzi a matita
// di quello che il prologo ha mostrato (il telefono, la biglietteria coi biglietti, la montagna con la pista, la vasca,
// il giro) e accanto a ognuno il suo nome vero, scritto a mano mentre il narratore lo dice. Le scritte stanno sul
// quaderno, mai nel luna park. Il tempo interno è il tempo vero: nessun tratto accelerato.
kit.scene('coda', {
  init(kit) {
    const G = window.G, C = G.C, D = G.MOD.mare, blu = D.passeggeri.Emma.tratti[2], M = '#3A3570';
    const box = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w) + ' ' + (y + h) + ' L' + x + ' ' + (y + h) + ' Z';
    const rbox = (x, y, w, h, r) => 'M' + (x + r) + ' ' + y + ' L' + (x + w - r) + ' ' + y + ' Q' + (x + w) + ' ' + y + ' ' + (x + w) + ' ' + (y + r) + ' L' + (x + w) + ' ' + (y + h - r) + ' Q' + (x + w) + ' ' + (y + h) + ' ' + (x + w - r) + ' ' + (y + h) + ' L' + (x + r) + ' ' + (y + h) + ' Q' + x + ' ' + (y + h) + ' ' + x + ' ' + (y + h - r) + ' L' + x + ' ' + (y + r) + ' Q' + x + ' ' + y + ' ' + (x + r) + ' ' + y + ' Z';
    const vasca = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w - 0.06 * w) + ' ' + (y + h) + ' Q' + (x + w / 2) + ' ' + (y + h + 0.3 * h) + ' ' + (x + 0.06 * w) + ' ' + (y + h) + ' Z';
    // Gli schizzi, nell'ordine in cui la matita li disegna: [quando, tratti…]; ogni tratto dura mezzo secondo,
    // salvo quelli scritti come [path, durata].
    const SCHIZZI = [
      [1.4, rbox(280, 170, 150, 260, 20), 'M305 230 L405 230'],
      [9.4, box(270, 560, 200, 160), 'M490 600 L540 560 M490 560 L540 600', box(300, 760, 60, 36) + box(380, 760, 60, 36) + box(460, 760, 60, 36)],
      [18.5, 'M1200 420 L1350 190 L1500 420', 'M1000 470 Q1120 440 1215 400'],
      [27.4, vasca(1080, 680, 540, 100)],
      // Il giro: dalla vasca la freccia torna al telefono lungo il bordo alto delle pagine, senza passare sugli schizzi.
      [37.4, ['M1660 650 Q1730 120 1250 120 L640 120 Q360 120 356 160', 2], 'M330 135 L356 162 L384 137'],
    ];
    // Le parole, a mano: [quando, x, y, testo]. Compaiono quando il narratore le dice.
    const SCRITTE = [[5.8, 640, 310, 'prompt'], [13.0, 690, 690, 'token'], [22.5, 1350, 520, 'modello di linguaggio'], [33.0, 1350, 870, 'probabilità']];
    let tratti = '';
    SCHIZZI.forEach(s => {
      let a = s[0];
      s.slice(1).forEach(d => {
        const lungo = Array.isArray(d), dur = lungo ? d[1] : 0.5;
        tratti += '<path class="co-tratto" data-a="' + a.toFixed(1) + '" data-d="' + dur + '" d="' + (lungo ? d[0] : d) + '"' + (lungo ? ' stroke-width="5" stroke-opacity=".7"' : '') + '/>';
        a += dur;
      });
    });
    let colori = '';
    for (let i = 0; i < 9; i++) colori += '<g class="co-appare" data-t="' + (30.5 + i * 0.1).toFixed(1) + '" opacity="0" transform="translate(' + (1130 + i * 54) + ' 715) scale(.4)">' + G.paperella(i === 3 ? '#28AAAA' : i === 6 ? '#5FA05F' : blu) + '</g>';
    const scritte = SCRITTE.map(s => '<text class="co-appare" data-t="' + s[0] + '" x="' + s[1] + '" y="' + s[2] + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="54" fill="' + M + '" opacity="0" transform="rotate(-2 ' + s[1] + ' ' + s[2] + ')">' + s[3] + '</text>').join('');
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<g class="co-pagine" opacity="0"><rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="' + M + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' + tratti + '</g>' + colori + scritte +
      '<g class="co-matita" opacity="0"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="' + M + '" transform="rotate(28)"/></g></g>';
    const html = G.sottotitolo('NARRATORE', 'Quello che hai visto ha dei nomi. La frase che scrivi, e che fa il giro, si chiama prompt.') +
      G.sottotitolo('NARRATORE', 'I biglietti dello Spezzaparole sono i token: i pezzi in cui ogni frase viene tagliata prima di salire.') +
      G.sottotitolo('NARRATORE', 'La montagna, con la sua pista, è un modello di linguaggio: una macchina che calcola, non che pensa.') +
      G.sottotitolo('NARRATORE', 'Le paperelle nella vasca sono le probabilità: quante ne cadono di un colore è quanto è probabile quella parola.') +
      G.sottotitolo('NARRATORE', 'E la risposta non la scrive nessuno: ogni parola è un giro, pescata tra quelle possibili.');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + pagine + '</svg>' + html + '</div>', 'coda')));
    const q = sel => kit.stage.querySelector(sel), qa = sel => [...kit.stage.querySelectorAll(sel)];
    this.pagine = q('.co-pagine'); this.tratti = qa('.co-tratto'); this.appare = qa('.co-appare'); this.matita = q('.co-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.tratti.forEach((p, i) => p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1)));
    this.sub = G.subs(kit, [[1.0, 8.6], [9.0, 17.6], [18.1, 26.5], [27.0, 36.5], [37.0, 44.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('00', 'coda', t);
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
