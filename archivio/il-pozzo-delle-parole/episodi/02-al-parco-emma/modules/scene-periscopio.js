const { seg, eo, ei, eio, eob, lerp } = kit;
// 2.3 · Il periscopio: la stanza dei ritratti, prima di ogni piano. Il periscopio legge cosa direbbe il pozzo se finisse qui.
const PS_RITRATTI = [[250, 330, 0.8, '#7A4E6B', '#E9C6A8'], [560, 300, 0.9, '#3F5C7A', '#F1D3BE'], [1240, 300, 0.9, '#6B7A3F', '#E9C6A8'], [1560, 330, 0.8, '#7A3F3F', '#F1D3BE']];
function psRitratto(x, y, k, abito, pelle, nome) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + k + ')"><rect x="-110" y="-140" width="220" height="280" rx="10" fill="#C9973F" stroke="#7A5A24" stroke-width="6"/><rect x="-90" y="-120" width="180" height="240" rx="4" fill="#3B2F4A"/>' +
    '<path d="M-72 120 C-62 44 62 44 72 120 Z" fill="' + abito + '"/><ellipse cx="0" cy="-8" rx="34" ry="42" fill="' + pelle + '"/><path d="M-38 -14 C-42 -58 42 -58 38 -14 C32 -40 -32 -40 -38 -14 Z" fill="#3A2418"/>' +
    '<path d="M-18 -6 Q-12 -2 -6 -6 M6 -6 Q12 -2 18 -6" stroke="#3A2418" stroke-width="2.5" stroke-linecap="round" fill="none"/>' +
    (nome ? '<rect x="-52" y="146" width="104" height="28" rx="4" fill="#E9D7A6" stroke="#7A5A24" stroke-width="2"/><text x="0" y="166" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="18" fill="#3A2418">' + nome + '</text>' : '') + '</g>';
}
kit.scene('periscopio', {
  init(kit) {
    const P = window.PZ;
    let s = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><linearGradient id="ps-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A1F33"/><stop offset="1" stop-color="#4A3550"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#ps-muro)"/><rect y="800" width="1920" height="280" fill="#5A3E2E"/><path d="M0 800 L1920 800" stroke="#7A5A44" stroke-width="6"/>' +
      '<path d="M0 860 L1920 860 M0 930 L1920 930 M0 1010 L1920 1010" stroke="#4A3226" stroke-width="3"/>';
    PS_RITRATTI.forEach(r => { s += psRitratto(r[0], r[1], r[2], r[3], r[4]); });
    s += '<g class="ps-bov">' + psRitratto(900, 320, 1.25, '#2F4F46', '#F1D3BE', 'Bovary') + '</g>' +
      '<ellipse class="ps-lente" cx="900" cy="330" rx="230" ry="260" fill="#FFF4E0" opacity="0" filter="url(#pz-soft)"/>' +
      '<g transform="translate(1500 700)"><rect x="-130" y="0" width="260" height="20" rx="4" fill="#8A5A3C"/><rect x="-110" y="20" width="16" height="80" fill="#6E4A33"/><rect x="94" y="20" width="16" height="80" fill="#6E4A33"/>' +
      '<text x="0" y="-6" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="130" fill="#C9973F" stroke="#7A5A24" stroke-width="4">e</text></g>' +
      '<g class="ps-al"><g transform="translate(-80 -133) scale(.8)">' + P.al() + '</g></g>' +
      '<g class="ps-parco"><g transform="translate(-88 -142) scale(.8)">' + P.parco() + '</g></g>' +
      '<g class="ps-cade"><g transform="translate(-100 -210) scale(.8)">' + P.emmaCade(P.VESTITO.rosa) + '</g></g>' +
      '<g class="ps-emma"><g transform="translate(-85 -233) scale(.85)">' + P.emma(P.VESTITO.rosa, { dy: -3 }) + '</g></g>' +
      '<g class="ps-ins"><rect x="1420" y="50" width="450" height="460" rx="20" fill="#F3EADB" stroke="#C9973F" stroke-width="6"/>' +
      '<rect x="1420" y="420" width="450" height="90" fill="#A9744F"/><g transform="translate(1520 108) scale(1.0)">' + P.ada('periscopio', 'occhio') + '</g></g>' +
      '<g class="ps-mon"><rect x="60" y="840" width="900" height="150" rx="18" fill="#0F2A2A" stroke="#C9973F" stroke-width="6"/>' +
      '<text x="96" y="900" font-family="JetBrains Mono, monospace" font-size="30" fill="#9BE7C4">Periscopio = logit lens</text>' +
      '<text x="96" y="950" font-family="JetBrains Mono, monospace" font-size="30" fill="#E6FFF4">Piano 0: e · Bovary  (uguale a ieri)</text></g></svg>';
    kit.stage.append(kit.h('<div class="ground">' + s +
      P.sott('NARRATORE', 'Cadde in una stanza piena di ritratti.') +
      P.sott('ADA', 'Il mio periscopio non mostra dov’è Emma: mostra cosa direbbe il pozzo se finisse qui. «Al parco Emma… Bovary». Come il romanzo!') + '</div>'));
    const q = c => kit.stage.querySelector(c);
    this.al = q('.ps-al'); this.parco = q('.ps-parco'); this.cade = q('.ps-cade'); this.emma = q('.ps-emma');
    this.ins = q('.ps-ins'); this.lente = q('.ps-lente'); this.bov = q('.ps-bov'); this.mon = q('.ps-mon');
    this.sub = window.PZ.subs(kit, [[0.4, 4.0], [6.0, 17.5]]);
  },
  render(t) {
    const giu = (t0, y) => lerp(-300, y, ei(seg(t, t0, t0 + 0.9)));
    const sq = t0 => Math.sin(Math.PI * seg(t, t0 + 0.9, t0 + 1.25));
    const ca = sq(0.3), cp = sq(0.5), ce = sq(0.7);
    this.al.setAttribute('transform', 'translate(560 ' + giu(0.3, 800).toFixed(1) + ') scale(' + (1 + 0.1 * ca).toFixed(3) + ',' + (1 - 0.12 * ca).toFixed(3) + ')');
    this.parco.setAttribute('transform', 'translate(780 ' + giu(0.5, 800).toFixed(1) + ') scale(' + (1 + 0.1 * cp).toFixed(3) + ',' + (1 - 0.12 * cp).toFixed(3) + ')');
    const ye = giu(0.7, 800), cadendo = t < 1.6;
    this.cade.setAttribute('transform', 'translate(1060 ' + ye.toFixed(1) + ')'); this.cade.setAttribute('opacity', cadendo ? 1 : 0);
    this.emma.setAttribute('transform', 'translate(1060 800) scale(' + (1 + 0.1 * ce).toFixed(3) + ',' + (1 - 0.12 * ce + 0.008 * Math.sin(t * 2)).toFixed(3) + ')');
    this.emma.setAttribute('opacity', cadendo ? 0 : 1);
    this.ins.setAttribute('opacity', eo(seg(t, 5.4, 6.0)).toFixed(2));
    // «...Bovary»: il periscopio illumina il ritratto.
    const lk = seg(t, 12.6, 13.4) * (1 - seg(t, 19.0, 20.0));
    this.lente.setAttribute('opacity', (0.35 * lk * (0.85 + 0.15 * Math.sin(t * 4))).toFixed(2));
    this.bov.setAttribute('transform', 'translate(900 320) scale(' + (1 + 0.04 * lk).toFixed(3) + ') translate(-900 -320)');
    this.mon.setAttribute('opacity', eo(seg(t, 18.0, 18.6)).toFixed(2));
    this.sub(t);
  },
});
