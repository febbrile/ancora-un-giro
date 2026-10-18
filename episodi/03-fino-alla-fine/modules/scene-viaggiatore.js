const { seg, eo, ei, eio, eob, lerp } = kit;
// 3.3 · Un viaggiatore in più: la pallina «corre» prende vita, si mette in fila con il numero 4, e cadono in quattro.
const VI_X = [520, 740, 960, 1180];
function viPrato(P) {
  return '<defs><linearGradient id="vi-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#26306A"/></linearGradient></defs>' +
    '<rect width="1920" height="1080" fill="url(#vi-cielo)"/><circle cx="1640" cy="170" r="52" fill="#FFF1C9"/>' +
    '<path d="M0 800 C380 760 760 780 1100 772 C1450 762 1700 780 1920 796 L1920 1080 L0 1080 Z" fill="#1F3B2C"/>' +
    '<g transform="translate(-300 120)"><rect x="560" y="720" width="280" height="110" rx="10" fill="#5B6B8C" stroke="#3E4A66" stroke-width="4"/><ellipse cx="700" cy="722" rx="146" ry="26" fill="#5B6B8C" stroke="#3E4A66" stroke-width="4"/><ellipse cx="700" cy="722" rx="120" ry="16" fill="#070912"/></g>';
}
kit.scene('viaggiatore', {
  init(kit) {
    const P = window.PZ;
    this.dis = P.discesa({ id: 'vi-d', chi: ['Al', 'Parco', 'Emma', 'Corre'], open: [13.4, 16.4, 19.4], scelta: [2, 0, 3], parole: [[], [], [], [['felice', '#FFD978'], ['.', '#C8CEE8']]], vestito: P.VESTITO.parco[3] });
    let fila = '';
    ['Al', 'Parco', 'Emma'].forEach((nome, j) => {
      fila += '<g transform="translate(' + VI_X[j] + ' 800)">' + P.viaggiatore(nome, P.VESTITO.parco[3]) + '<g transform="translate(70 -40)"><circle r="20" fill="#F6E7C8" stroke="#2B2350" stroke-width="1.6" stroke-dasharray="3 2.5"/><text y="7" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="20" fill="#2B2350">' + (j + 1) + '</text></g></g>';
    });
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<g class="vi-A">' + P.lab() + '<g transform="translate(1100 300) scale(1.5)">' + P.ada('mani', 'sorpresa') + '</g>' +
      '<g class="vi-palla"><circle r="22" fill="#2E9E4F"/><ellipse cx="-7" cy="-7" rx="7" ry="4" fill="#FFFFFF" opacity=".4"/></g>' +
      '<g class="vi-corre1">' + P.viaggiatore('Corre') + '</g><g class="vi-luce"><circle r="70" fill="#FFF4E0" opacity=".6" filter="url(#pz-soft)"/></g></g>' +
      '<g class="vi-B">' + viPrato(P) + fila +
      '<g class="vi-corre2">' + P.viaggiatore('Corre') + '</g>' +
      '<g class="vi-carta"><g transform="scale(.36) translate(-110 -150)"><rect width="220" height="300" rx="18" fill="#FFFDF6" stroke="#2E9E4F" stroke-width="7"/><text x="18" y="42" font-family="Fredoka, sans-serif" font-weight="600" font-size="27" fill="#2E9E4F">Corre</text>' + P.seme(0, 110, 110, 1.4) + P.seme(1, 110, 170, 1.4) + P.seme(2, 110, 230, 1.4) + '</g></g>' +
      '<g class="vi-num"><circle r="20" fill="#F6E7C8" stroke="#2B2350" stroke-width="1.6" stroke-dasharray="3 2.5"/><text y="7" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="20" fill="#2B2350">4</text></g></g>' +
      '<g class="vi-C">' + this.dis.svg + '</g>' +
      '<g class="vi-mon"><rect x="360" y="40" width="1200" height="84" rx="16" fill="#0F2A2A" stroke="#C9973F" stroke-width="5"/>' +
      '<text x="960" y="94" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="30" fill="#9BE7C4">Token scelto → aggiunto al testo → di nuovo nel modello</text></g></svg>' +
      P.sott('NARRATORE', 'La pallina pescata prese vita, tornò dallo Spezzaparole e si mise in fila. Ora a cadere nel pozzo erano in quattro.') +
      P.sott('ADA', 'Stesso pozzo, stesse pietre. Solo una riga in più.') + '</div>'));
    const q = c => kit.stage.querySelector(c);
    this.A = q('.vi-A'); this.B = q('.vi-B'); this.C = q('.vi-C');
    this.palla = q('.vi-palla'); this.c1 = q('.vi-corre1'); this.luce = q('.vi-luce'); this.c2 = q('.vi-corre2'); this.carta = q('.vi-carta'); this.num = q('.vi-num'); this.mon = q('.vi-mon');
    this.dis.init(kit.stage);
    this.sub = window.PZ.subs(kit, [[0.4, 10.8], [12.0, 16.6]]);
  },
  render(t) {
    const ab = eio(seg(t, 3.6, 4.2)), bc = eio(seg(t, 11.4, 12.0));
    this.A.setAttribute('opacity', (1 - ab).toFixed(3)); this.B.setAttribute('opacity', (ab * (1 - bc)).toFixed(3)); this.C.setAttribute('opacity', bc.toFixed(3));
    // A: la pallina sul bancone prende vita.
    const vive = seg(t, 1.6, 2.4);
    this.palla.setAttribute('transform', 'translate(1000 ' + (680 - 14 * Math.abs(Math.sin(t * 6)) * (1 - vive)).toFixed(1) + ') scale(' + (1 - eio(vive)).toFixed(3) + ')');
    const corre = seg(t, 2.6, 3.8);
    this.c1.setAttribute('transform', 'translate(' + lerp(1000, 2100, ei(corre)).toFixed(1) + ' 700) scale(' + (0.8 * eob(vive, 1.6)).toFixed(3) + ')');
    this.luce.setAttribute('transform', 'translate(1000 640)'); this.luce.setAttribute('opacity', Math.sin(Math.PI * vive).toFixed(2));
    // B: Corre arriva in fondo alla fila, riceve la sua carta e il numero 4.
    const arr = seg(t, 4.4, 6.6), hop = Math.abs(Math.sin(t * 9)) * 14 * (arr > 0 && arr < 1 ? 1 : 0);
    this.c2.setAttribute('transform', 'translate(' + lerp(2100, VI_X[3], eo(arr)).toFixed(1) + ' ' + (800 - hop).toFixed(1) + ')');
    const ca = seg(t, 7.0, 8.0);
    this.carta.setAttribute('transform', 'translate(' + VI_X[3] + ' ' + lerp(-120, 560, eo(ca)).toFixed(1) + ') rotate(' + (6 * Math.sin(t * 2)).toFixed(1) + ') scale(' + (ca <= 0 ? 0 : 1) + ')');
    this.num.setAttribute('transform', 'translate(' + (VI_X[3] + 70) + ' 760) scale(' + eob(seg(t, 8.6, 9.0), 1.8).toFixed(3) + ')');
    // C: giù in quattro, di botola in botola.
    this.dis.render(t);
    this.mon.setAttribute('opacity', eo(seg(t, 23.6, 24.2)).toFixed(2));
    this.sub(t);
  },
});
