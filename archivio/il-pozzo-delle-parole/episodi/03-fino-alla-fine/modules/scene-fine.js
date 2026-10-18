const { seg, eo, ei, eio, eob, lerp } = kit;
// 3.6 · La pallina della Fine: ultimo giro con Punto; nel secchio quasi solo Fine. Ada la pesca e spegne la lampada.
const PAROLA_COL = { foglie: '#CDEFB0', altalena: '#FFE9A8', corre: '#8EE8A8', felice: '#FFD978', '.': '#C8CEE8', e: '#F7C6D9', Bovary: '#E3A58E', Fine: '#E6E6F0', nuota: '#8FB6FF' };
const FI_F = '#1E1F2E', FI_X = '#8A90A8';
const FI_PALLE = [FI_F, FI_F, FI_F, FI_F, FI_F, FI_F, FI_F, FI_F, FI_F, FI_F, FI_F, FI_F, FI_X, FI_F, FI_F, FI_F, FI_F, FI_F, FI_F, FI_F];
kit.scene('fine', {
  init(kit) {
    const P = window.PZ;
    this.dis = P.discesa({ id: 'fi-d', chi: ['Al', 'Parco', 'Emma', 'Corre', 'Felice', 'Punto'], open: [3.6, 5.8, 8.0], scelta: [1, 3, 2], parole: [[], [['.', PAROLA_COL['.']], ['Fine', PAROLA_COL['Fine']], ['e', PAROLA_COL['e']]], [['Fine', PAROLA_COL['Fine']], ['.', PAROLA_COL['.']], ['corre', PAROLA_COL['corre']]], [['Fine', PAROLA_COL['Fine']], ['.', PAROLA_COL['.']], ['nuota', PAROLA_COL['nuota']]]], vestito: P.VESTITO.parco[3] });
    let puntini = ''; P.SLOT.forEach(sl => { puntini += '<circle cx="' + sl[0] + '" cy="' + sl[1] + '" r="2.6" fill="#FFFFFF"/>'; });
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<g class="fi-A">' + this.dis.svg + '<g class="fi-carta"><g transform="scale(.42) translate(-110 -150)">' + P.carta({ v: [0.47, -0.41, 0.08], col: '#4A4B5E', titolo: 'Punto' }) + '</g></g></g>' +
      '<g class="fi-B">' + P.lab({ luce: ['#8E96C8', '#8E96C8', '#C8CEE8'] }) +
      '<g class="fi-mon"><rect x="1250" y="110" width="630" height="100" rx="16" fill="#0F2A2A" stroke="#C9973F" stroke-width="6"/>' +
      '<text x="1565" y="158" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="20" fill="#9BE7C4">EOS: un token come gli altri.</text>' +
      '<text x="1565" y="188" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="20" fill="#9BE7C4">Il codice lo riconosce e si ferma.</text></g>' +
      '<g transform="translate(1060 300) scale(1.5)"><g class="fi-ada1">' + P.ada('mani', 'calma') + '</g><g class="fi-ada2" opacity="0">' + P.ada('mani', 'felice') + '</g></g>' +
      '<g class="fi-sb">' + P.secchio('fi-s', FI_PALLE, 1.4).replace('</g></g>', '<g fill="#FFFFFF">' + puntini + '</g></g></g>') + '</g>' + P.palla('fi-palla', FI_F, 'Fine') +
      '<rect class="fi-buio" x="0" y="300" width="760" height="780" fill="#000000" opacity="0"/></g></svg>' +
      P.sott('NARRATORE', 'All’ultimo giro, nel secchio salì una pallina speciale: Fine. Non è un ordine. È una pallina come le altre, che il pozzo ha imparato a mettere nel secchio quando una frase è finita.') +
      P.sott('ADA', 'Fine. Spengo la lampada.') + '</div>'));
    const q = c => kit.stage.querySelector(c);
    this.A = q('.fi-A'); this.carta = q('.fi-carta'); this.B = q('.fi-B'); this.sb = q('.fi-sb'); this.palla = q('.fi-palla'); this.mon = q('.fi-mon');
    this.a1 = q('.fi-ada1'); this.a2 = q('.fi-ada2'); this.buio = q('.fi-buio'); this.luce = q('.fi-B .lab-luce');
    this.dis.init(kit.stage);
    this.sub = window.PZ.subs(kit, [[0.3, 16.3], [18.0, 20.6]]);
  },
  render(t) {
    const ab = eio(seg(t, 10.2, 10.8));
    this.A.setAttribute('opacity', (1 - ab).toFixed(3)); this.B.setAttribute('opacity', ab.toFixed(3));
    this.dis.render(t);
    const ca = seg(t, 0.4, 1.2);
    this.carta.setAttribute('transform', 'translate(' + (960 + 2.5 * 190) + ' ' + lerp(-160, 560, eo(ca)).toFixed(1) + ') scale(' + (ca <= 0 ? 0 : 1) + ')');
    this.carta.setAttribute('opacity', (1 - seg(t, 2.9, 3.4)).toFixed(2));
    this.sb.setAttribute('transform', 'translate(800 ' + lerp(-300, 456, eo(seg(t, 10.8, 12.2))).toFixed(1) + ')');
    const p = seg(t, 17.2, 17.9);
    this.palla.setAttribute('transform', 'translate(' + lerp(970, 1110, eo(p)).toFixed(1) + ' ' + (lerp(600, 560, eo(p)) - 120 * Math.sin(Math.PI * p)).toFixed(1) + ') scale(' + (p <= 0 ? 0 : eob(p, 1.6)).toFixed(3) + ')');
    const sorr = t > 18.4;
    this.a1.setAttribute('opacity', sorr ? 0 : 1); this.a2.setAttribute('opacity', sorr ? 1 : 0);
    // Ada spegne la lampada: il pozzo si oscura.
    const spento = eio(seg(t, 20.6, 22.0));
    this.luce.setAttribute('opacity', (1 - spento).toFixed(2));
    this.buio.setAttribute('opacity', (0.55 * spento).toFixed(2));
    this.mon.setAttribute('opacity', eo(seg(t, 22.4, 23.0)).toFixed(2));
    this.sub(t);
  },
});
