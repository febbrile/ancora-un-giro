const { seg, eo, ei, eio, eob, lerp } = kit;
const QU = [
  { x: 480, nome: 'Al', s: -0.60, e: 0.55, p: 10, c: '#17B3B3' },
  { x: 960, nome: 'Mare', s: 1.35, e: 3.86, p: 70, c: '#8787FE' },
  { x: 1440, nome: 'Emma', s: 0.10, e: 1.11, p: 20, c: '#FE8787' },
];
kit.scene('rubinetti', {
  init(kit) {
    const P = window.PZ;
    let s = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><linearGradient id="qu-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#262F60"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#qu-muro)"/><rect x="160" y="150" width="1600" height="640" rx="60" fill="#1E5A3A" opacity=".45"/>' +
      '<text class="qu-cap" x="960" y="100" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="30" fill="#9BE7C4"></text>';
    QU.forEach(q => {
      s += '<text x="' + q.x + '" y="220" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="38" fill="' + q.c + '">' + q.nome + '</text>' +
        '<g class="qu-g" transform="translate(' + q.x + ' 400)"><circle class="qu-c" r="52" stroke-width="7"/><circle class="qu-c2" r="40" fill="none" stroke="#FFFFFF" stroke-opacity=".6" stroke-width="2" stroke-dasharray="6 5"/>' +
        '<text class="qu-t" y="12" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="600" font-size="32" fill="#2E2A26"></text></g>';
    });
    let x0 = 360;
    QU.forEach(q => { const w = 1200 * q.p / 100; s += '<g class="qu-seg"><rect x="' + x0 + '" y="620" width="' + w + '" height="80" fill="' + q.c + '"/><text x="' + (x0 + w / 2) + '" y="672" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="34" fill="#141A33">' + q.p + '%</text></g>'; x0 += w; });
    s += '<rect class="qu-bord" x="360" y="620" width="1200" height="80" rx="8" fill="none" stroke="#F4EEE2" stroke-width="4"/></svg>';
    kit.stage.append(kit.h('<div class="ground">' + s +
      P.sott('ADA', 'Prima le differenze si allargano: il gettone più grande diventa ancora più grande, quello negativo diventa piccolino. Poi si divide tutto in cento parti: dieci, settanta, venti per cento. Non l’ha deciso nessuno: viene dal conto.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)];
    this.g = all('.qu-g'); this.c = all('.qu-c'); this.c2 = all('.qu-c2'); this.t = all('.qu-t'); this.seg = all('.qu-seg'); this.bord = kit.stage.querySelector('.qu-bord');
    this.cap = kit.stage.querySelector('.qu-cap');
    this.sub = window.PZ.subs(kit, [[0.4, 12.6]]);
  },
  render(t) {
    const P = window.PZ;
    const a = eio(seg(t, 3.4, 5.0));
    const ph = t < 4.2 ? 0 : (t < 7.4 ? 1 : 2);
    const dip = Math.min(1, Math.abs(t - 4.2) / 0.15, Math.abs(t - 7.4) / 0.15);
    QU.forEach((q, i) => {
      const r0 = 52, r1 = 34 * Math.sqrt(q.e) + 12, r = lerp(r0, r1, a);
      this.c[i].setAttribute('r', r.toFixed(1)); this.c2[i].setAttribute('r', (r - 12).toFixed(1));
      const neg = q.s < 0 ? 1 - a : 0;
      this.c[i].setAttribute('fill', P.mix('#F5C84C', '#8A90A8', neg)); this.c[i].setAttribute('stroke', P.mix('#C9973F', '#5B6B8C', neg));
      this.t[i].textContent = ph === 0 ? P.fmt(q.s) : ph === 1 ? q.e.toFixed(2) : q.p + '%';
      this.t[i].setAttribute('opacity', dip.toFixed(2));
      const fly = eio(seg(t, 7.6 + i * 0.2, 8.6 + i * 0.2));
      this.g[i].setAttribute('transform', 'translate(' + q.x + ' ' + (400 + 6 * Math.sin(t * 1.4 + i)).toFixed(1) + ') scale(' + (1 - 0.15 * fly).toFixed(3) + ')');
      const sg = eo(seg(t, 8.0 + i * 0.3, 8.7 + i * 0.3));
      this.seg[i].setAttribute('opacity', sg.toFixed(2));
    });
    this.bord.setAttribute('opacity', eo(seg(t, 7.8, 8.2)).toFixed(2));
    this.cap.textContent = ph === 0 ? 'tre gettoni: i punteggi' : ph === 1 ? 'e^punteggio: le differenze si allargano' : 'softmax: quote che sommano a 100%';
    this.cap.setAttribute('opacity', dip.toFixed(2));
    this.sub(t);
  },
});
