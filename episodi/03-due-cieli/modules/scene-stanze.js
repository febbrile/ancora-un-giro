const { seg, eo, ei, eio, eob, lerp } = kit;
kit.scene('stanze', {
  init(kit) {
    const P = window.PZ;
    const r = kit.rng(21);
    let foglie = '';
    for (let k = 0; k < 16; k++) foglie += '<ellipse class="st-f" rx="14" ry="7" fill="' + ['#87FE87', '#5FC27A', '#ADF29E'][k % 3] + '" data-x="' + (200 + r() * 1500).toFixed(0) + '" data-ph="' + r().toFixed(3) + '"/>';
    const trio = (cls, dress) => '<g class="' + cls + '"><g transform="translate(-230 -125) scale(.75)">' + P.al() + '</g><g transform="translate(-130 -141) scale(.8)">' + P.parco() + '</g><g transform="translate(-10 -201) scale(.75)">' + P.emma(dress) + '</g></g>';
    kit.stage.append(kit.h('<div class="ground">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<g class="st-a"><rect width="1920" height="1080" fill="#1B2A44"/><rect y="760" width="1920" height="320" fill="#5E9A55"/><path d="M0 760 C480 740 1440 780 1920 756" stroke="#87C46E" stroke-width="8" fill="none"/>' +
      '<rect x="490" y="300" width="40" height="470" fill="#8A5A3C"/><path d="M510 360 C600 330 700 330 780 350" stroke="#8A5A3C" stroke-width="22" stroke-linecap="round" fill="none"/><circle cx="510" cy="280" r="110" fill="#5FC27A"/><circle cx="420" cy="320" r="70" fill="#87FE87" opacity=".8"/>' +
      '<path d="M650 345 L640 420 M730 348 L740 420" stroke="#C8B48F" stroke-width="3"/>' +
      '<g transform="translate(690 500) rotate(4) scale(.62)"><rect x="-110" y="-140" width="220" height="280" rx="10" fill="#C9973F" stroke="#7A5A24" stroke-width="6"/><rect x="-90" y="-120" width="180" height="240" rx="4" fill="#3B2F4A"/><path d="M-72 120 C-62 44 62 44 72 120 Z" fill="#2F4F46"/><ellipse cx="0" cy="-8" rx="34" ry="42" fill="#F1D3BE"/><path d="M-38 -14 C-42 -58 42 -58 38 -14 C32 -40 -32 -40 -38 -14 Z" fill="#3A2418"/><circle cx="0" cy="-58" r="16" fill="#3A2418"/><rect x="-52" y="146" width="104" height="28" rx="4" fill="#E9D7A6"/><text x="0" y="166" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="18" fill="#3A2418">Bovary</text></g>' +
      '<g class="st-alt"><path d="M1560 0 L1560 620 M1680 0 L1680 620" stroke="#C8B48F" stroke-width="4"/><rect x="1540" y="620" width="160" height="18" rx="6" fill="#ADF29E" stroke="#7FB88A" stroke-width="3"/></g>' +
      '<text x="1620" y="700" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="32" fill="#DFF7D8">altalena</text>' +
      '<g transform="translate(120 600)"><path d="M20 160 L150 20 L176 20 L46 160 Z" fill="#ADF29E"/><rect x="150" y="20" width="12" height="140" fill="#7FB88A"/></g><text x="200" y="590" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="32" fill="#DFF7D8">scivolo</text>' +
      '<text x="1000" y="140" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="34" fill="#DFF7D8">foglie</text>' + foglie + trio('st-trioA', '#D5DD86') + '</g>' +
      '<g class="st-b"><rect width="1920" height="1080" fill="#0B0E1C"/>' +
      '<rect x="60" y="100" width="920" height="360" rx="24" fill="#24452E" stroke="#2A3466" stroke-width="4"/><rect x="60" y="380" width="920" height="80" fill="#5E9A55"/>' +
      '<g transform="translate(220 300)"><path d="M-60 30 Q-60 -10 -20 -10 L20 -10 Q40 10 70 14 Q90 18 90 30 Z" fill="#E5484D" stroke="#FFFFFF" stroke-width="4"/><text y="80" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="34" fill="#FFD978">corre</text></g>' +
      '<text x="560" y="240" font-family="Fredoka, sans-serif" font-size="30" fill="#DFF7D8">foglie · altalena</text><text x="940" y="140" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="22" fill="#8B93B8">piano 2</text>' +
      '<rect x="60" y="530" width="920" height="360" rx="24" fill="#123A2A" stroke="#2A3466" stroke-width="4"/><ellipse cx="520" cy="700" rx="380" ry="130" fill="#39E98B" opacity=".22" filter="url(#pz-soft)"/>' +
      '<text class="st-corre" x="280" y="660" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="78" fill="#8EF0B0">corre</text><text x="780" y="640" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="48" fill="#5FD0D0">gioca</text>' +
      '<text x="940" y="570" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="22" fill="#8B93B8">piano 3 · fondo</text>' + trio('st-trioB', '#D5DD86') +
      '<rect x="1170" y="110" width="700" height="360" rx="20" fill="#0F2A2A" stroke="#C9973F" stroke-width="8"/>' +
      '<text x="1200" y="160" font-family="JetBrains Mono, monospace" font-size="18" letter-spacing="1.5" fill="#5FB89A">MONITOR DI ADA · AL PARCO</text>' +
      '<text x="1200" y="215" font-family="JetBrains Mono, monospace" font-size="22" fill="#E6FFF4">piano 1: foglie 0.70 · altalena 0.68</text>' +
      '<text x="1200" y="255" font-family="JetBrains Mono, monospace" font-size="22" fill="#E6FFF4">piano 2: corre 1.28 · foglie 1.09</text>' +
      '<text x="1200" y="295" font-family="JetBrains Mono, monospace" font-size="22" fill="#E6FFF4">piano 3: corre 3.28 · gioca 2.45</text>' +
      '<text x="1200" y="360" font-family="JetBrains Mono, monospace" font-size="24" fill="#9BE7C4">x₃ = [0.30, 2.75, −1.80]</text>' +
      '<text x="1200" y="410" font-family="JetBrains Mono, monospace" font-size="18" fill="#5FB89A">al mare era [2.75, 0.30, −1.80]</text></g>' +
      '</svg>' +
      P.sott('NARRATORE', 'Al parco, la prima stanza era un prato… dentro una stanza. Foglie dal soffitto, un’altalena, uno scivolo. E Bovary, appeso a un ramo.') +
      P.sott('ADA', 'Piano due: compare «corre». In fondo: «corre» in testa, «gioca» dietro. Il vestito è verde come il prato.') + '</div>'));
    const q = c => kit.stage.querySelector(c);
    this.a = q('.st-a'); this.b = q('.st-b'); this.f = [...kit.stage.querySelectorAll('.st-f')];
    this.tA = q('.st-trioA'); this.tB = q('.st-trioB'); this.vB = this.tB.lastElementChild.firstElementChild; this.alt = q('.st-alt'); this.corre = q('.st-corre');
    this.sub = window.PZ.subs(kit, [[0.4, 5.9], [6.3, 13.7]]);
  },
  render(t) {
    const P = window.PZ;
    const x = eio(seg(t, 5.6, 6.2));
    this.a.setAttribute('opacity', (1 - x).toFixed(2)); this.b.setAttribute('opacity', x.toFixed(2));
    this.f.forEach(f => { const ph = ((t * 0.18 + +f.getAttribute('data-ph')) % 1); const fx = +f.getAttribute('data-x') + 40 * Math.sin(t * 1.5 + ph * 9); f.setAttribute('cx', fx.toFixed(1)); f.setAttribute('cy', (ph * 820 - 40).toFixed(1)); f.setAttribute('transform', 'rotate(' + (40 * Math.sin(t * 2 + ph * 7)).toFixed(1) + ' ' + fx.toFixed(1) + ' ' + (ph * 820 - 40).toFixed(1) + ')'); });
    this.alt.setAttribute('transform', 'rotate(' + (6 * Math.sin(t * 1.6)).toFixed(2) + ' 1620 0)');
    const land = seg(t, 0, 0.9);
    this.tA.setAttribute('transform', 'translate(1180 ' + lerp(-200, 790, ei(land)).toFixed(1) + ') scale(1,' + (1 - 0.08 * Math.sin(Math.PI * seg(t, 0.9, 1.2))).toFixed(3) + ')');
    const down = seg(t, 8.6, 9.6);
    this.tB.setAttribute('transform', 'translate(560 ' + lerp(440, 860, eio(down)).toFixed(1) + ')');
    const c1 = eio(seg(t, 6.6, 7.4)), c2 = eio(seg(t, 9.0, 9.8));
    this.vB.style.color = c2 > 0 ? P.mix('#6EFD88', '#39E98B', c2) : P.mix('#D5DD86', '#6EFD88', c1);
    this.corre.setAttribute('opacity', (eo(seg(t, 9.4, 10.0)) * (0.85 + 0.15 * Math.sin(t * 2.4))).toFixed(2));
    this.sub(t);
  },
});
