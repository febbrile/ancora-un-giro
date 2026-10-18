const { seg, eo, eio, eob, lerp } = kit;
const SALA = [
  { x: 520, cy: 330, v: [-0.40, 0.30, 0.60], col: '#139A9A', nome: 'Al', t0: 4.0, raggio: 'M520 640 L520 560' },
  { x: 960, cy: 330, v: [1.00, -0.30, -1.02], col: '#6E6EE6', nome: 'Mare', t0: 4.6, raggio: 'M960 640 L960 560' },
  { x: 1400, cy: 330, v: [0.20, 0.20, 0.24], col: '#E0475B', nome: 'Emma', t0: 5.2, raggio: 'M1400 600 L1400 560' },
  { x: 1700, cy: 330, v: [0.90, 0.20, -0.50], col: '#E0475B', nome: 'Emma', t0: 8.0, raggio: 'M1460 640 C1560 620 1640 600 1700 560', lanterna: true },
];
kit.scene('sala', {
  init(kit) {
    const P = window.PZ;
    let s = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><linearGradient id="sala-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#262F60"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#sala-muro)"/>' +
      '<path d="M140 1080 L340 120 M1780 1080 L1580 120" stroke="#2A3466" stroke-width="6"/>' +
      '<ellipse cx="960" cy="860" rx="840" ry="120" fill="#1B2244" stroke="#2A3466" stroke-width="4"/>';
    SALA.forEach(c => {
      const ly = c.lanterna ? 600 : 545, lx = c.lanterna ? 1640 : c.x;
      s += '<path class="sala-raggio" d="' + c.raggio + '" stroke="#FFE9A8" stroke-width="6" stroke-linecap="round" fill="none" opacity="0"/>' +
        '<g class="sala-lente" style="transform-origin:' + lx + 'px ' + ly + 'px"><circle cx="' + lx + '" cy="' + ly + '" r="24" fill="#5B6B8C" stroke="#3E4A66" stroke-width="4"/><ellipse cx="' + (lx - 7) + '" cy="' + (ly - 7) + '" rx="8" ry="5" fill="#FFFFFF" opacity=".3"/></g>' +
        '<g class="sala-carta">' + P.carta({ v: c.v, col: c.col, titolo: c.nome, sotto: c.lanterna ? 'lanterna · query' : 'cartello · key' }) + '</g>';
    });
    s += '<g transform="translate(445 695.5) scale(.75)">' + P.al() + '</g>' +
      '<g transform="translate(860 636)">' + P.mare() + '</g>' +
      '<g class="sala-emma" style="transform-origin:1400px 860px"><g transform="translate(1320 642) scale(.8)">' + P.emma('#FE8787', { dy: -2 }) + '</g></g></svg>';
    kit.stage.append(kit.h('<div class="ground">' + s +
      P.sott('NARRATORE', 'Al primo piano c’è la Sala degli Sguardi. Lenti di pietra trasformano il vestito di ognuno in una carta: il cartello, ciò che offre. Il vestito di Emma diventa anche una seconda carta, la lanterna: ciò che cerca. Ogni carta ha tre semi: acqua, verde e nome.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)];
    this.lenti = all('.sala-lente').map(e => e.style); this.raggi = all('.sala-raggio'); this.carte = all('.sala-carta');
    this.emma = kit.stage.querySelector('.sala-emma').style;
    this.sub = window.PZ.subs(kit, [[0.4, 12.7]]);
  },
  render(t) {
    SALA.forEach((c, i) => {
      this.lenti[i].transform = 'scale(' + eob(seg(t, c.t0 - 2.6 + (c.lanterna ? 2.2 : 0), c.t0 - 2.1 + (c.lanterna ? 2.2 : 0)), 1.7).toFixed(3) + ')';
      const r = seg(t, c.t0, c.t0 + 0.4);
      this.raggi[i].setAttribute('opacity', (r * (1 - seg(t, c.t0 + 0.8, c.t0 + 1.4)) * 0.9).toFixed(2));
      const k = seg(t, c.t0 + 0.3, c.t0 + 0.8);
      const s = 0.62 * (k <= 0 ? 0 : eob(k, 1.6));
      const bob = 4 * Math.sin(t * 1.5 + i), tilt = (c.lanterna ? 4 : 0) + 2 * Math.sin(t * 1.1 + i);
      this.carte[i].setAttribute('transform', 'translate(' + c.x + ' ' + (c.cy + bob).toFixed(1) + ') rotate(' + tilt.toFixed(2) + ') scale(' + s.toFixed(3) + ') translate(-110 -150)');
    });
    this.emma.transform = 'scale(' + (1 + 0.012 * Math.sin(t * 2 * Math.PI / 3)) + ')';
    this.sub(t);
  },
});
