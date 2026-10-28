const { seg, eo, eio } = kit;
// Sotto il luna park: dopo il cartello Fine, il quaderno di Ada a tutto schermo. Gli schizzi dell'episodio, a matita,
// e accanto a ognuno il suo nome vero, scritto a mano mentre il narratore lo dice. Le scritte stanno sul quaderno,
// mai nel luna park: è l'unico posto del film con parole vere a schermo.
// La coda nomina solo campionamento e temperatura.
kit.scene('coda', {
  init(kit) {
    const G = window.G, C = G.C, D = G.MOD.mare, blu = D.passeggeri.Emma.tratti[2], M = '#3A3570', TURCHESE = '#28AAAA', VERDE = '#28AA50';
    const tondo = (x, y, r) => 'M' + (x - r) + ' ' + y + ' a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0 a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0';
    const vasca = (x, y, w, h) => 'M' + x + ' ' + y + ' L' + (x + w) + ' ' + y + ' L' + (x + w - 0.06 * w) + ' ' + (y + h) + ' Q' + (x + w / 2) + ' ' + (y + h + 0.3 * h) + ' ' + (x + 0.06 * w) + ' ' + (y + h) + ' Z';
    // La manopola: cerchio, freccia verso l'alto e, sopra, l'arco delle lucine (a sinistra una grande, a destra cinque piccole).
    const my = 730;  // altezza del centro della manopola
    const manopola = [tondo(500, my, 70), 'M500 ' + (my + 40) + ' L500 ' + (my - 30) + ' M480 ' + (my - 10) + ' L500 ' + (my - 30) + ' L520 ' + (my - 10), 'M370 ' + (my - 30) + ' A150 150 0 0 1 630 ' + (my - 30)];
    // Gli schizzi, nell'ordine in cui la matita li disegna: [quando, tratti…]; ogni tratto dura mezzo secondo.
    const SCHIZZI = [
      [1.4, vasca(300, 330, 540, 100)],
      [13.2].concat(manopola),
      [24.2, vasca(1080, 300, 540, 100), vasca(1080, 640, 540, 100)],
    ];
    // Le parole, a mano: [quando, x, y, testo]. Compaiono quando il narratore le dice.
    const SCRITTE = [[7.5, 570, 530, 'campionamento'], [16.0, 755, 780, 'temperatura']];
    let tratti = '';
    SCHIZZI.forEach(s => s.slice(1).forEach((d, i) => { tratti += '<path class="co-tratto" data-a="' + (s[0] + i * 0.5).toFixed(1) + '" d="' + d + '"/>'; }));
    const ap = (t, tr, inner) => '<g class="co-appare" data-t="' + t.toFixed(1) + '" opacity="0" transform="' + tr + '">' + inner + '</g>';
    const fila = (x, y, t0, cols, p = 54) => cols.map((c, i) => ap(t0 + i * 0.1, 'translate(' + (x + i * p) + ' ' + (y + (i % 2) * 12) + ') scale(.4)', G.paperella(c))).join('');
    let colori = '';
    // La vasca della pesca: nove paperelle, quasi tutte blu; sopra, le tre pescate a occhi chiusi.
    colori += fila(345, 360, 2.0, [blu, blu, blu, TURCHESE, blu, blu, VERDE, blu, blu]);
    [blu, TURCHESE, VERDE].forEach((c, i) => { colori += ap(3.2 + i * 0.4, 'translate(' + (450 + i * 120) + ' 250) scale(.6)', G.paperella(c)); });
    // La lucina grande e le cinque piccole lungo l'arco.
    const punto = th => { const a = th * Math.PI / 180; return [500 + 150 * Math.sin(a), my - 30 + 75 - 150 * Math.cos(a)]; };
    let luci = (p => '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="14" fill="' + C.oro + '"/>')(punto(-45));
    ['#2864dc', TURCHESE, VERDE, '#f5c84c', '#f07064'].forEach((c, i) => { const p = punto(6 + i * 12); luci += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="6" fill="' + c + '"/>'; });
    colori += '<g class="co-appare" data-t="14.8" opacity="0">' + luci + '</g>';
    // Le due vasche piccole: quella di prima, quasi tutta blu, e quella con la manopola girata, tutta di colori diversi.
    colori += fila(1135, 335, 26.2, [blu, blu, blu, TURCHESE, blu, blu, blu, blu, blu], 50);
    colori += fila(1135, 675, 26.2, G.MOD.manopola.vasche.larga.slice(0, 9).map(v => v[2]), 50);
    const scritte = SCRITTE.map(s => '<text class="co-appare" data-t="' + s[0] + '" x="' + s[1] + '" y="' + s[2] + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="54" fill="' + M + '" opacity="0" transform="rotate(-2 ' + s[1] + ' ' + s[2] + ')">' + s[3] + '</text>').join('');
    const pagine = '<rect x="-200" y="-200" width="2320" height="1480" fill="#0B1030"/>' +
      '<g class="co-pagine" opacity="0"><rect x="150" y="60" width="1620" height="880" rx="26" fill="#2F6F73"/><rect x="176" y="86" width="1568" height="828" rx="12" fill="' + C.crema + '"/>' +
      '<path d="M960 86 L960 914" stroke="' + C.cremaScura + '" stroke-width="4"/>' +
      '<g stroke="' + M + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">' + tratti + '</g>' + colori + scritte +
      '<g class="co-matita" opacity="0"><rect x="-6" y="-120" width="14" height="120" rx="4" fill="' + C.oro + '" transform="rotate(28)"/><path d="M-6 0 L8 0 L1 18 Z" fill="' + M + '" transform="rotate(28)"/></g></g>';
    const html = G.sottotitolo('NARRATORE', 'Quello che hai visto ha dei nomi. La pesca a occhi chiusi si chiama campionamento: le paperelle più numerose escono spesso, non sempre.') +
      G.sottotitolo('NARRATORE', 'La manopola si chiama temperatura. Sta fuori dalla montagna: non cambia il giro, cambia solo quello che cade nella vasca.') +
      G.sottotitolo('NARRATORE', 'Girata da un lato, quasi solo la paperella più numerosa. Dall’altro, i colori si pareggiano, ed escono anche le rare.') +
      G.sottotitolo('NARRATORE', 'E per la tua chat vuol dire questo: la stessa domanda, due volte, può avere due risposte. E con la manopola girata, risposte più strane.');
    kit.stage.append(kit.h(G.unico('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + G.defs + pagine + '</svg>' + html + '</div>', 'coda')));
    const q = sel => kit.stage.querySelector(sel), qa = sel => [...kit.stage.querySelectorAll(sel)];
    this.pagine = q('.co-pagine'); this.tratti = qa('.co-tratto'); this.appare = qa('.co-appare'); this.matita = q('.co-matita');
    this.lung = this.tratti.map(p => p.getTotalLength());
    this.tratti.forEach((p, i) => p.setAttribute('stroke-dasharray', this.lung[i].toFixed(1)));
    this.sub = G.subs(kit, [[1.0, 12.6], [13.2, 23.6], [24.2, 34.2], [34.8, 46.6]]);
  },
  render(t, kit) {
    t = window.G.tempo('03', 'coda', t);
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
