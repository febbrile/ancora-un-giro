const { seg, eo, eio, eob, lerp } = kit;
const FORBICE = [
  { id: 'a', frase: 'Al mare Emma', tok: ['Al', 'mare', 'Emma'], etichetta: 'frase 1' },
  { id: 'b', frase: 'Al parco Emma', tok: ['Al', 'parco', 'Emma'], etichetta: 'frase 2' },
];
const F_CUT = [3.0, 3.55];
const F_POP = [3.25, 3.8, 4.3];
const F_X = [230, 480, 730];
function forbiceMetà(h) {
  const wN = 44 + h.frase.length * 18;
  let tiles = '';
  h.tok.forEach((w, i) => {
    const tw = 36 + w.length * 21;
    tiles += '<g class="forbice-tok"><rect x="' + (-tw / 2) + '" y="-31" width="' + tw + '" height="62" rx="8" fill="#F6E7C8" stroke="#C8B48F" stroke-width="2"/>' +
      '<rect class="forbice-hl" x="' + (-tw / 2 - 6) + '" y="-37" width="' + (tw + 12) + '" height="74" rx="12" fill="none" stroke="#E8743B" stroke-width="4" opacity="0"/>' +
      '<text x="0" y="12" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="34" fill="#2E2A26">' + w + '</text></g>';
  });
  return '<text x="480" y="150" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="24" fill="#7A6F60">' + h.etichetta + '</text>' +
    '<g class="forbice-nastro"><rect x="0" y="-28" width="' + wN + '" height="56" rx="6" fill="#F6E7C8" stroke="#C8B48F" stroke-width="2"/>' +
    '<text x="22" y="11" font-family="JetBrains Mono, monospace" font-size="30" fill="#5C5348">' + h.frase + '</text></g>' +
    '<g class="forbice-mac" style="transform-origin:480px 500px"><g transform="translate(288 222) scale(1.6)">' +
    '<rect x="40" y="62" width="120" height="100" rx="16" fill="#6D7A8F" stroke="#3E4A66" stroke-width="4"/>' +
    '<rect x="34" y="98" width="12" height="30" rx="4" fill="#3E4A66"/>' +
    '<circle cx="82" cy="98" r="11" fill="#FFFFFF"/><circle cx="118" cy="98" r="11" fill="#FFFFFF"/>' +
    '<circle class="forbice-occhio" cx="84" cy="100" r="5" fill="#2E2A26"/><circle class="forbice-occhio" cx="120" cy="100" r="5" fill="#2E2A26"/>' +
    '<path d="M78 132 L122 132 M78 140 L122 140" stroke="#3E4A66" stroke-width="4" stroke-linecap="round"/>' +
    '<circle cx="140" cy="40" r="11" fill="none" stroke="#E8743B" stroke-width="6"/><circle cx="140" cy="76" r="11" fill="none" stroke="#E8743B" stroke-width="6"/>' +
    '<path class="forbice-l1" d="M150 46 L222 74" stroke="#D9DDE6" stroke-width="7" stroke-linecap="round"/>' +
    '<path class="forbice-l2" d="M150 70 L222 42" stroke="#D9DDE6" stroke-width="7" stroke-linecap="round"/>' +
    '<circle cx="181" cy="58" r="4" fill="#3E4A66"/></g></g>' + tiles;
}
kit.scene('forbice', {
  init(kit) {
    const P = window.PZ;
    let svg = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect x="0" y="760" width="1920" height="320" fill="#CFE3B0"/><path d="M0 760 C480 740 1440 780 1920 756" stroke="#9CC27A" stroke-width="6" fill="none"/>';
    FORBICE.forEach((h, i) => { svg += '<g class="forbice-half" transform="translate(' + (i * 960) + ' 0)">' + forbiceMetà(h) + '</g>'; });
    svg += '<path d="M960 90 L960 1000" stroke="#C8B48F" stroke-width="4" stroke-dasharray="14 12"/></svg>';
    kit.stage.append(kit.h('<div class="ground"><div class="carta"></div>' + svg +
      P.sott('NARRATORE', 'Prima di entrare nel pozzo, le frasi passano dallo Spezzaparole, che le taglia in pezzi chiamati token. Le parole comuni restano intere; quelle rare finiscono in pezzettini.') + '</div>'));
    this.halves = [...kit.stage.querySelectorAll('.forbice-half')].map(g => ({
      nastro: g.querySelector('.forbice-nastro'),
      mac: g.querySelector('.forbice-mac').style,
      l1: g.querySelector('.forbice-l1'), l2: g.querySelector('.forbice-l2'),
      occhi: [...g.querySelectorAll('.forbice-occhio')],
      tok: [...g.querySelectorAll('.forbice-tok')],
      hl: [...g.querySelectorAll('.forbice-hl')],
    }));
    this.sub = window.PZ.subs(kit, [[1.0, 12.6]]);
  },
  render(t) {
    let snip = 0, squash = 0;
    F_CUT.forEach(c => { const p = seg(t, c - 0.15, c + 0.25); snip = Math.max(snip, Math.sin(Math.PI * p)); squash = Math.max(squash, Math.sin(Math.PI * seg(t, c, c + 0.3))); });
    this.halves.forEach(h => {
      const nx = lerp(-340, 262, eio(seg(t, 0.7, 2.9)));
      h.nastro.setAttribute('transform', 'translate(' + nx.toFixed(1) + ' 400)');
      h.nastro.setAttribute('opacity', 1 - seg(t, 2.85, 3.0));
      h.l1.setAttribute('transform', 'rotate(' + (-14 * snip).toFixed(2) + ' 181 58)');
      h.l2.setAttribute('transform', 'rotate(' + (14 * snip).toFixed(2) + ' 181 58)');
      h.mac.transform = 'scale(' + (1 + 0.025 * squash) + ',' + (1 - 0.04 * squash) + ')';
      const look = lerp(-3, 3, eio(seg(t, 3.2, 4.6)));
      h.occhi.forEach((o, i) => o.setAttribute('cx', (i ? 120 : 84) + look));
      h.tok.forEach((g, i) => {
        const p = seg(t, F_POP[i], F_POP[i] + 0.55);
        const x = lerp(480, F_X[i], eo(p)), y = lerp(500, 640, eo(p)) - 60 * Math.sin(Math.PI * p);
        const s = p <= 0 ? 0 : eob(p, 1.7);
        const bob = 3 * Math.sin(t * 2 + i);
        g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + (y + bob * seg(t, 5, 6)).toFixed(1) + ') scale(' + s.toFixed(3) + ')');
      });
      h.hl[1].setAttribute('opacity', eo(seg(t, 7.0, 7.5)).toFixed(2));
    });
    this.sub(t);
  },
});
