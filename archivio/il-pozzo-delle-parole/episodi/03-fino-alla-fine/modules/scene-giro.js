const { seg, eo, ei, eio, eob, lerp } = kit;
// 3.5 · Ancora un giro: Felice si mette in fila, cadono in cinque; in fondo arriva Felice e dal secchio esce Punto.
const PAROLA_COL = { foglie: '#CDEFB0', altalena: '#FFE9A8', corre: '#8EE8A8', felice: '#FFD978', '.': '#C8CEE8', e: '#F7C6D9', Bovary: '#E3A58E', Fine: '#E6E6F0', nuota: '#8FB6FF' };
const GI_K = '#1E1F2E', GI_E = '#F0A6B8', GI_B = '#E3A58E', GI_Y = '#F5C84C', GI_X = '#8A90A8';
const GI_PALLE = [GI_K, GI_K, GI_E, GI_K, GI_K, GI_K, GI_Y, GI_K, GI_E, GI_K, GI_K, GI_B, GI_K, GI_K, GI_X, GI_K, GI_K, GI_K, GI_E, GI_K];
kit.scene('giro', {
  init(kit) {
    const P = window.PZ;
    this.dis = P.discesa({ id: 'gi-d', chi: ['Al', 'Parco', 'Emma', 'Corre', 'Felice'], open: [4.4, 6.8, 9.2], scelta: [3, 1, 2], parole: [[], [['felice', PAROLA_COL['felice']], ['.', PAROLA_COL['.']], ['e', PAROLA_COL['e']]], [['.', PAROLA_COL['.']], ['e', PAROLA_COL['e']], ['felice', PAROLA_COL['felice']]], [['.', PAROLA_COL['.']], ['e', PAROLA_COL['e']], ['Bovary', PAROLA_COL['Bovary']]]], vestito: P.VESTITO.parco[3] });
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<g class="gi-A">' + this.dis.svg + '<g class="gi-carta"><g transform="scale(.42) translate(-110 -150)">' + P.carta({ v: [-0.38, -0.12, -0.52], col: '#C9973F', titolo: 'Felice' }) + '</g></g>' + '<g class="gi-luce"><circle r="90" fill="#FFF4E0" opacity=".6" filter="url(#pz-soft)"/></g></g>' +
      '<g class="gi-B">' + P.lab({ luce: ['#8E96C8', '#4A4B5E', '#1E1F2E'] }) +
      '<g class="gi-mon"><rect x="1250" y="110" width="630" height="100" rx="16" fill="#0F2A2A" stroke="#C9973F" stroke-width="6"/>' +
      '<text x="1565" y="172" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="22" fill="#9BE7C4">Al parco Emma corre felice ___ → «.» 69%</text></g>' +
      '<g transform="translate(1060 300) scale(1.5)">' + P.ada('mani', 'felice') + '</g>' +
      '<g class="gi-sb">' + P.secchio('gi-s', GI_PALLE, 1.4) + '</g>' + P.palla('gi-palla', GI_K, '«.»') + '</g></svg>' +
      P.sott('NARRATORE', 'E poi un altro giro, con un viaggiatore in più. In fondo arrivò Felice, e dal secchio uscì un puntino.') + '</div>'));
    const q = c => kit.stage.querySelector(c);
    this.A = q('.gi-A'); this.carta = q('.gi-carta'); this.B = q('.gi-B'); this.luce = q('.gi-luce'); this.sb = q('.gi-sb'); this.palla = q('.gi-palla'); this.mon = q('.gi-mon');
    this.fel = [...kit.stage.querySelectorAll('.gi-d-p')][4];
    this.dis.init(kit.stage);
    this.sub = window.PZ.subs(kit, [[0.4, 9.6]]);
  },
  render(t) {
    const ab = eio(seg(t, 11.4, 12.0));
    this.A.setAttribute('opacity', (1 - ab).toFixed(3)); this.B.setAttribute('opacity', ab.toFixed(3));
    this.dis.render(t);
    // Felice arriva in fila con un piccolo lampo.
    const nasce = seg(t, 0.6, 1.4);
    if (t < 4.4) this.fel.setAttribute('transform', this.fel.getAttribute('transform') + ' scale(' + eob(nasce, 1.6).toFixed(3) + ')');
    const ca = seg(t, 1.0, 1.8);
    this.carta.setAttribute('transform', 'translate(' + (960 + 2 * 190) + ' ' + lerp(-160, 560, eo(ca)).toFixed(1) + ') scale(' + (ca <= 0 ? 0 : 1) + ')');
    this.carta.setAttribute('opacity', (1 - seg(t, 3.6, 4.2)).toFixed(2));
    this.luce.setAttribute('transform', 'translate(' + (960 + 2 * 190) + ' 800)'); this.luce.setAttribute('opacity', Math.sin(Math.PI * nasce).toFixed(2));
    this.sb.setAttribute('transform', 'translate(800 ' + lerp(-300, 456, eo(seg(t, 12.0, 13.2))).toFixed(1) + ')');
    const p = seg(t, 14.6, 15.3);
    this.palla.setAttribute('transform', 'translate(' + lerp(970, 1110, eo(p)).toFixed(1) + ' ' + (lerp(600, 560, eo(p)) - 120 * Math.sin(Math.PI * p)).toFixed(1) + ') scale(' + (p <= 0 ? 0 : eob(p, 1.6)).toFixed(3) + ')');
    this.mon.setAttribute('opacity', eo(seg(t, 13.0, 13.6)).toFixed(2));
    this.sub(t);
  },
});
