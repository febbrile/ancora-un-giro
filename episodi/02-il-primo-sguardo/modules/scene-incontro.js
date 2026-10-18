const { seg, eo, ei, eio, eob, lerp } = kit;
const INC_Q = [0.90, 0.20, -0.50], INC_K = [1.00, -0.30, -1.02], INC_P = [0.90, -0.06, 0.51];
const INC_T = [4.8, 8.6, 12.6];
const INC_Y = [92, 162, 232].map(y => 400 + (y - 150) * 1.35);
const INC_F = ['q · k = 0.90', 'q · k = 0.90 − 0.06', 'q · k = 0.90 − 0.06 + 0.51', 'q · k = 0.90 − 0.06 + 0.51 = 1.35'];
function incVal(v) {
  const fm = window.PZ.fmt(v);
  return '<g><rect x="-52" y="-24" width="104" height="48" rx="10" fill="#FFFDF6" stroke="#C8B48F" stroke-width="3"/><text y="10" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="600" font-size="26" fill="' + (v < 0 ? '#B8332E' : '#2E2A26') + '">' + fm + '</text></g>';
}
kit.scene('incontro', {
  init(kit) {
    const P = window.PZ;
    let s = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><linearGradient id="inc-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#262F60"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#inc-muro)"/>' +
      '<ellipse cx="960" cy="560" rx="900" ry="330" fill="#1E5A3A" opacity=".55"/><ellipse cx="960" cy="560" rx="900" ry="330" fill="none" stroke="#8A5A3C" stroke-width="14"/>' +
      '<rect x="560" y="34" width="900" height="84" rx="14" fill="#0F2A2A" stroke="#C9973F" stroke-width="5"/>' +
      '<text class="inc-form" x="1010" y="88" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="34" fill="#9BE7C4"></text>';
    let hlS = '';
    INC_Y.forEach((y, i) => {
      hlS += '<rect class="inc-hl" x="318" y="' + (y - 40) + '" width="304" height="80" rx="14" fill="none" stroke="#FFD978" stroke-width="6"/>' +
        '<rect class="inc-hl" x="1298" y="' + (y - 40) + '" width="304" height="80" rx="14" fill="none" stroke="#FFD978" stroke-width="6"/>';
    });
    s += '<g class="inc-cq">' + P.carta({ v: INC_Q, col: '#E0475B', titolo: 'Emma', sotto: 'lanterna · query' }) + '</g>' +
      '<g class="inc-ck">' + P.carta({ v: INC_K, col: '#6E6EE6', titolo: 'Mare', sotto: 'cartello · key' }) + '</g>' + hlS;
    INC_Y.forEach((y, i) => {
      s += '<g class="inc-vq">' + incVal(INC_Q[i]) + '</g><g class="inc-vk">' + incVal(INC_K[i]) + '</g>' +
        '<text class="inc-x" x="960" y="' + (y + 14) + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="44" fill="#FFD978">×</text>' +
        '<g class="inc-p">' + P.pill(INC_P[i]) + '</g>';
    });
    s += '<text class="inc-mm" x="960" y="620" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="#FFD978">meno × meno = più!</text>' +
      '<g class="inc-g">' + P.gettone(1.35) + '</g>' +
      '<text class="inc-gl" x="960" y="860" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="28" fill="#C8CEE8">il gettone: quanto Emma si intende con Mare</text></svg>';
    kit.stage.append(kit.h('<div class="ground">' + s +
      P.sott('NARRATORE', 'Emma mette sul tavolo la sua carta-lanterna, Mare la sua carta-cartello. Si confrontano seme per seme.') +
      P.sott('ADA', 'Zero virgola nove per uno: più zero novanta. Zero virgola due per meno zero tre: un piccolo meno. E meno per meno… fa più! Totale: uno virgola trentacinque. Ecco quanto Emma si intende con Mare.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.cq = q('.inc-cq'); this.ck = q('.inc-ck'); this.hl = all('.inc-hl');
    this.vq = all('.inc-vq'); this.vk = all('.inc-vk'); this.x = all('.inc-x'); this.p = all('.inc-p');
    this.mm = q('.inc-mm'); this.g = q('.inc-g'); this.gl = q('.inc-gl'); this.form = q('.inc-form');
    this.sub = window.PZ.subs(kit, [[0.4, 4.3], [4.5, 21.6]]);
  },
  render(t) {
    const a = eob(seg(t, 0.3, 1.0), 1.4), b = eob(seg(t, 1.0, 1.7), 1.4);
    this.cq.setAttribute('transform', 'translate(' + lerp(-200, 470, a).toFixed(1) + ' 400) rotate(' + lerp(-14, -2, a).toFixed(2) + ') scale(1.35) translate(-110 -150)');
    this.ck.setAttribute('transform', 'translate(' + lerp(2120, 1450, b).toFixed(1) + ' 400) rotate(' + lerp(14, 2, b).toFixed(2) + ') scale(1.35) translate(-110 -150)');
    INC_Y.forEach((y, i) => {
      const tc = INC_T[i];
      const h = seg(t, tc - 1.0, tc - 0.7) * (1 - seg(t, tc + 0.6, tc + 1.0));
      this.hl[i * 2].setAttribute('opacity', h.toFixed(2)); this.hl[i * 2 + 1].setAttribute('opacity', h.toFixed(2));
      const m = eio(seg(t, tc - 0.8, tc)), gone = seg(t, tc, tc + 0.15);
      this.vq[i].setAttribute('transform', 'translate(' + lerp(560, 880, m).toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (m <= 0 ? 0 : (1 - gone)).toFixed(3) + ')');
      this.vk[i].setAttribute('transform', 'translate(' + lerp(1360, 1040, m).toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (m <= 0 ? 0 : (1 - gone)).toFixed(3) + ')');
      this.x[i].setAttribute('opacity', (m > 0.2 && gone < 1 ? 1 : 0));
      const sp = seg(t, tc, tc + 0.4), fly = seg(t, 15.0 + i * 0.25, 15.6 + i * 0.25);
      const py = lerp(y, 740, eio(fly));
      this.p[i].setAttribute('transform', 'translate(960 ' + py.toFixed(1) + ') scale(' + (sp <= 0 || fly >= 1 ? 0 : eob(sp, 1.7) * (1 - 0.5 * fly)).toFixed(3) + ')');
    });
    const mm = seg(t, 12.9, 13.3);
    this.mm.setAttribute('opacity', (eo(mm) * (1 - seg(t, 14.8, 15.2))).toFixed(2));
    const g = seg(t, 16.2, 16.7);
    this.g.setAttribute('transform', 'translate(960 740) scale(' + (g <= 0 ? 0 : 1.3 * eob(g, 1.8)).toFixed(3) + ') rotate(' + (8 * Math.sin(t * 1.5)).toFixed(2) + ')');
    this.gl.setAttribute('opacity', eo(seg(t, 17.0, 17.6)).toFixed(2));
    let f = -1; INC_T.forEach((tc, i) => { if (t >= tc + 0.2) f = i; }); if (t >= 16.6) f = 3;
    this.form.textContent = f < 0 ? 'q · k = ?' : INC_F[f];
    this.sub(t);
  },
});
