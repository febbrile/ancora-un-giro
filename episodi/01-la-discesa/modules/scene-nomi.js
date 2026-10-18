const { seg, eo, ei, eio, eob, lerp } = kit;
function nomiRitratto(x, y, s, rot, viso, abito) {
  return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ') scale(' + s + ')"><rect x="-70" y="-90" width="140" height="180" rx="8" fill="#C9973F" stroke="#7A5A24" stroke-width="5"/><rect x="-56" y="-76" width="112" height="152" rx="3" fill="#3B2F4A"/>' +
    '<path d="M-46 76 C-40 30 40 30 46 76 Z" fill="' + abito + '"/><ellipse cx="0" cy="-6" rx="22" ry="27" fill="' + viso + '"/><path d="M-24 -10 C-26 -40 26 -40 24 -10 C20 -28 -20 -28 -24 -10 Z" fill="#3A2418"/></g>';
}
kit.scene('nomi', {
  init(kit) {
    const P = window.PZ;
    kit.stage.append(kit.h('<div class="ground"><div class="nomi-cam" style="position:absolute;inset:0;transform-origin:960px 600px">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><linearGradient id="nomi-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151A36"/><stop offset="1" stop-color="#2C2A57"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#nomi-muro)"/>' +
      '<ellipse cx="480" cy="330" rx="330" ry="260" fill="#FFD978" opacity=".10" filter="url(#pz-soft)"/><ellipse cx="1650" cy="700" rx="260" ry="200" fill="#FFD978" opacity=".08" filter="url(#pz-soft)"/>' +
      '<rect y="800" width="1920" height="280" fill="#1B2244"/><path d="M0 800 L1920 800" stroke="#2A3466" stroke-width="4"/>' +
      '<ellipse cx="1000" cy="900" rx="620" ry="80" fill="#6E3347"/><ellipse cx="1000" cy="900" rx="560" ry="62" fill="none" stroke="#C9973F" stroke-width="3" stroke-dasharray="10 8"/>' +
      nomiRitratto(170, 300, 0.9, -4, '#E8C3A8', '#5A3E6E') + nomiRitratto(1060, 400, 0.75, 3, '#C98B63', '#2F6F73') + nomiRitratto(1740, 290, 0.85, 5, '#F1D3BE', '#8A5A3C') +
      '<g class="nomi-bov" transform="translate(480 380) rotate(-3) scale(1.3)">' +
      '<rect x="-110" y="-140" width="220" height="280" rx="10" fill="#C9973F" stroke="#7A5A24" stroke-width="6"/><rect x="-90" y="-120" width="180" height="240" rx="4" fill="#3B2F4A"/>' +
      '<path d="M-72 120 C-62 44 62 44 72 120 Z" fill="#2F4F46"/><ellipse cx="0" cy="-8" rx="34" ry="42" fill="#F1D3BE"/><path d="M-38 -14 C-42 -58 42 -58 38 -14 C32 -40 -32 -40 -38 -14 Z" fill="#3A2418"/><circle cx="0" cy="-58" r="16" fill="#3A2418"/>' +
      '<path class="nomi-occhi" d="M-18 -6 Q-12 -2 -6 -6 M6 -6 Q12 -2 18 -6" stroke="#3A2418" stroke-width="2.5" stroke-linecap="round" fill="none"/><path d="M-8 16 Q0 20 8 16" stroke="#9C5B4A" stroke-width="2.5" stroke-linecap="round" fill="none"/>' +
      '<rect x="-52" y="146" width="104" height="28" rx="4" fill="#E9D7A6" stroke="#7A5A24" stroke-width="2"/><text x="0" y="166" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="18" fill="#3A2418">Bovary</text></g>' +
      '<rect x="1560" y="760" width="190" height="16" rx="4" fill="#8A5A3C"/><rect x="1580" y="776" width="12" height="100" fill="#6E4A33"/><rect x="1718" y="776" width="12" height="100" fill="#6E4A33"/>' +
      '<text x="1655" y="752" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="170" fill="#C9A27A" stroke="#8A5A3C" stroke-width="4">e</text>' +
      '<g transform="translate(60 680)" opacity=".9"><path d="M20 160 L150 20 L176 20 L46 160 Z" fill="#ADF29E"/><rect x="150" y="20" width="12" height="140" fill="#7FB88A"/><path d="M146 20 L186 20" stroke="#7FB88A" stroke-width="8" stroke-linecap="round"/></g>' +
      '<path d="M1400 930 Q1416 906 1432 930 Q1416 940 1400 930 Z M1460 950 Q1474 930 1488 950 Q1474 958 1460 950 Z" fill="#F7C6D9" stroke="#E79CB8" stroke-width="2"/>' +
      '<g class="nomi-al"><g transform="translate(-100 -166)">' + P.al() + '</g></g>' +
      '<g class="nomi-mare"><g transform="translate(-100 -184)">' + P.mare() + '</g></g>' +
      '<g class="nomi-emma"><g transform="translate(-100 -272)">' + P.emma('#FE8787', { dx: -4, dy: -2 }) + '</g></g>' +
      '<text class="nomi-q" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="80" fill="#FFD978">?</text>' +
      '</svg></div>' +
      P.sott('NARRATORE', 'Emma atterrò in una stanza piena di ritratti. Nessuno sapeva niente del mare: era la stanza delle cose che vengono dopo «Emma», quando di Emma non si sa nient’altro.') + '</div>'));
    const q = s => kit.stage.querySelector(s);
    this.cam = q('.nomi-cam').style;
    this.p = [['.nomi-emma', 1260, 0.5, 0.82], ['.nomi-al', 780, 0.8, 0.7], ['.nomi-mare', 1010, 1.0, 0.75]].map(([s, x, t0, sc]) => ({ g: q(s), x, t0, sc }));
    this.q = q('.nomi-q');
    q('.sott').style.top = '40px'; q('.sott').style.bottom = 'auto';
    this.sub = window.PZ.subs(kit, [[1.9, 11.7]]);
  },
  render(t) {
    this.cam.transform = 'scale(' + (1 + 0.006 * t) + ')';
    const floor = 900;
    this.p.forEach(P => {
      const p = seg(t, P.t0, P.t0 + 0.8);
      const y = lerp(-300, floor, ei(p));
      const sq = Math.sin(Math.PI * seg(t, P.t0 + 0.8, P.t0 + 1.2));
      const br = 1 + 0.01 * Math.sin(t * 2 + P.x);
      P.g.setAttribute('transform', 'translate(' + P.x + ' ' + y.toFixed(1) + ') scale(' + (P.sc * (1 + 0.12 * sq) * br).toFixed(3) + ',' + (P.sc * (1 - 0.14 * sq) * br).toFixed(3) + ')');
    });
    const qs = seg(t, 2.6, 3.0) <= 0 ? 0 : lerp(0.6, 1, eob(seg(t, 2.6, 3.0), 1.7)) * lerp(1, 1.5, eio(seg(t, 6.5, 8.0)));
    this.q.setAttribute('transform', 'translate(1258 ' + (600 - 6 * Math.sin(t * 2)).toFixed(1) + ') scale(' + qs.toFixed(3) + ')');
    this.sub(t);
  },
});
