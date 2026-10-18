const { seg, eo, ei, eio, eob, lerp } = kit;
const LETTERE = [
  [{ nome: 'Al', num: '1204', ch: 'al' }, { nome: 'mare', num: '8812', ch: 'mare' }, { nome: 'Emma', num: '22741', ch: 'emma' }],
  [{ nome: 'Al', num: '1204', ch: 'al' }, { nome: 'parco', num: '15530', ch: 'parco' }, { nome: 'Emma', num: '22741', ch: 'emma' }],
];
const L_X = [230, 480, 730];
function letterePersonaggio(P, ch, x) {
  if (ch === 'emma') return '<g transform="translate(' + (x - 55) + ' 615) scale(.55)">' + P.emma(P.CORALLO.replace('#FE8787', '#C9C2D6')) + '</g>';
  if (ch === 'al') return '<g transform="translate(' + (x - 75) + ' 655) scale(.75)">' + P.al() + '</g>';
  if (ch === 'mare') return '<g transform="translate(' + (x - 80) + ' 633) scale(.8)">' + P.mare() + '</g>';
  return '<g transform="translate(' + (x - 80) + ' 639) scale(.8)">' + P.parco() + '</g>';
}
kit.scene('lettere', {
  init(kit) {
    const P = window.PZ;
    let svg = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect x="0" y="760" width="1920" height="320" fill="#CFE3B0"/><path d="M0 760 C480 740 1440 780 1920 756" stroke="#9CC27A" stroke-width="6" fill="none"/>' +
      '<rect x="40" y="772" width="1840" height="30" rx="10" fill="#5B6B8C" stroke="#3E4A66" stroke-width="3"/>';
    LETTERE.forEach((riga, i) => {
      svg += '<g transform="translate(' + (i * 960) + ' 0)">';
      riga.forEach((k, j) => {
        const x = L_X[j], tw = 36 + k.nome.length * 21;
        svg += '<g class="lettere-tile" transform="translate(' + x + ' 640)"><rect x="' + (-tw / 2) + '" y="-31" width="' + tw + '" height="62" rx="8" fill="#F6E7C8" stroke="#C8B48F" stroke-width="2"/>' +
          '<text x="0" y="12" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="34" fill="#2E2A26">' + k.nome + '</text></g>' +
          '<g class="lettere-pers" data-x="' + x + '" style="transform-origin:' + x + 'px 780px">' + letterePersonaggio(P, k.ch, x) + '</g>' +
          '<g class="lettere-bigl" transform="translate(' + x + ' 520)"><rect x="-62" y="-20" width="124" height="40" rx="6" fill="#FFFDF6" stroke="#C8B48F" stroke-width="2"/><circle cx="-46" cy="0" r="5" fill="#C8B48F"/>' +
          '<text x="8" y="8" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="22" fill="#2E2A26">' + k.num + '</text></g>' +
          '<g class="lettere-nome" data-nome="' + k.nome + '" data-x="' + x + '"></g>';
      });
      svg += '</g>';
    });
    svg += '<path d="M960 300 L960 1000" stroke="#C8B48F" stroke-width="4" stroke-dasharray="14 12"/></svg>';
    kit.stage.append(kit.h('<div class="ground"><div class="carta"></div>' + svg +
      P.sott('NARRATORE', 'I pezzi prendono vita, e ognuno riceve un biglietto con un numero.') +
      P.sott('NARRATORE', 'E c’è un segreto: nel pozzo le lettere non possono entrare. Restano sul prato. Laggiù esistono solo numeri.') + '</div>'));
    const r = kit.rng(11);
    this.letters = [];
    kit.stage.querySelectorAll('.lettere-nome').forEach((g, idx) => {
      const nome = g.getAttribute('data-nome'), x0 = +g.getAttribute('data-x');
      const j = idx % 3;
      const mis = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      mis.textContent = nome; mis.setAttribute('x', x0); mis.setAttribute('y', 578); mis.setAttribute('text-anchor', 'middle');
      mis.setAttribute('font-family', 'Fredoka, sans-serif'); mis.setAttribute('font-weight', '600'); mis.setAttribute('font-size', '40');
      g.appendChild(mis);
      let pos = nome.split('').map((c, k) => x0 + (k - (nome.length - 1) / 2) * 24);
      try { pos = nome.split('').map((c, k) => (mis.getStartPositionOfChar(k).x + mis.getEndPositionOfChar(k).x) / 2); } catch (e) {}
      g.removeChild(mis);
      nome.split('').forEach((c, k) => {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        el.textContent = c;
        el.setAttribute('text-anchor', 'middle');
        el.setAttribute('font-family', 'Fredoka, sans-serif');
        el.setAttribute('font-weight', '600');
        el.setAttribute('font-size', '40');
        el.setAttribute('fill', '#2E2A26');
        g.appendChild(el);
        this.letters.push({ el, x: pos[k], ts: 5.0 + j * 0.55 + k * 0.13, dx: (r() - 0.5) * 70, rot: (r() - 0.5) * 160, yl: 880 + r() * 120 });
      });
    });
    this.tiles = [...kit.stage.querySelectorAll('.lettere-tile')];
    this.pers = [...kit.stage.querySelectorAll('.lettere-pers')];
    this.bigl = [...kit.stage.querySelectorAll('.lettere-bigl')];
    kit.stage.querySelectorAll('.sott').forEach(e => { e.style.top = '48px'; e.style.bottom = 'auto'; });
    this.sub = window.PZ.subs(kit, [[0.6, 4.2], [4.6, 11.7]]);
  },
  render(t) {
    this.tiles.forEach((g, i) => {
      const j = i % 3, p = seg(t, 0.2 + j * 0.15, 0.8 + j * 0.15);
      g.setAttribute('transform', 'translate(' + L_X[j] + ' ' + lerp(640, 660, p) + ') scale(' + (1 - eo(p)).toFixed(3) + ')');
    });
    this.pers.forEach((g, i) => {
      const j = i % 3, p = seg(t, 0.4 + j * 0.15, 1.2 + j * 0.15);
      const hop = j === 2 ? 0.05 * Math.max(0, Math.sin(Math.PI * seg(t, 9.4, 10.2))) : 0;
      g.style.transform = 'scale(' + (eob(p, 1.6) * (1 + 0.01 * Math.sin(t * 2 + j)) + hop).toFixed(3) + ')';
      g.style.opacity = j === 2 ? 1 : lerp(1, 0.55, eio(seg(t, 9.2, 9.8)));
    });
    this.bigl.forEach((g, i) => {
      const j = i % 3, p = seg(t, 2.0 + j * 0.25, 2.5 + j * 0.25);
      g.setAttribute('transform', 'translate(' + L_X[j] + ' ' + (520 - 2 * Math.sin(t * 1.6 + j)).toFixed(1) + ') scale(' + eob(p, 1.8).toFixed(3) + ')');
    });
    this.letters.forEach(L => {
      const p = seg(t, L.ts, L.ts + 0.9), f = ei(p);
      const y = lerp(578, L.yl, f);
      L.el.setAttribute('x', (L.x + L.dx * p).toFixed(1));
      L.el.setAttribute('y', y.toFixed(1));
      L.el.setAttribute('transform', 'rotate(' + (L.rot * eo(p)).toFixed(1) + ' ' + (L.x + L.dx * p).toFixed(1) + ' ' + y.toFixed(1) + ')');
      L.el.setAttribute('fill', p >= 1 ? '#7FA25E' : '#2E2A26');
    });
    this.sub(t);
  },
});
