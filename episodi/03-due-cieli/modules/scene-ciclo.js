const { seg, eo, ei, eio, eob, lerp } = kit;
const CIC_R = [['Al', '#17B3B3', -1], ['mare', '#8787FE', -1], ['Emma', '#FE8787', -1], ['nuota', '#3379E5', 3.0], ['felice', '#F5C84C', 7.0], ['.', '#8A90A8', 10.0]];
const CIC_TILE = [['nuota', 0.6], ['felice', 4.8], ['.', 8.0]];
const CIC_FR = [[0, 'Al mare Emma'], [3.0, 'Al mare Emma nuota'], [7.0, 'Al mare Emma nuota felice'], [10.0, 'Al mare Emma nuota felice.']];
kit.scene('ciclo', {
  init(kit) {
    const P = window.PZ;
    let righe = '';
    CIC_R.forEach(([w, c], i) => {
      const y = 330 + i * 70;
      righe += '<g class="cic-r"><text x="1140" y="' + (y + 34) + '" font-family="Fredoka, sans-serif" font-weight="600" font-size="32" fill="' + c + '">' + w + '</text>' +
        [0, 1, 2].map(k => '<rect x="' + (1340 + k * 150) + '" y="' + (y + 6) + '" width="130" height="40" rx="8" fill="' + c + '" opacity="' + (0.9 - k * 0.2).toFixed(1) + '"/>').join('') + '</g>';
    });
    let tiles = '';
    CIC_TILE.forEach(([w]) => { const tw = 40 + w.length * 21; tiles += '<g class="cic-t"><rect x="' + (-tw / 2) + '" y="-31" width="' + tw + '" height="62" rx="8" fill="#F6E7C8" stroke="#C8B48F" stroke-width="2"/><text y="12" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="34" fill="#2E2A26">' + w + '</text></g>'; });
    kit.stage.append(kit.h('<div class="ground"><div class="carta"></div>' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect x="160" y="50" width="1600" height="110" rx="16" fill="#0F2A2A" stroke="#C9973F" stroke-width="6"/>' +
      '<text class="cic-fr" x="960" y="124" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="50" fill="#E6FFF4"></text>' +
      '<g transform="translate(160 250) scale(1.7)"><rect x="40" y="62" width="120" height="100" rx="16" fill="#6D7A8F" stroke="#3E4A66" stroke-width="4"/><circle cx="82" cy="98" r="11" fill="#FFFFFF"/><circle cx="118" cy="98" r="11" fill="#FFFFFF"/><circle cx="84" cy="100" r="5" fill="#2E2A26"/><circle cx="120" cy="100" r="5" fill="#2E2A26"/>' +
      '<circle cx="140" cy="40" r="11" fill="none" stroke="#E8743B" stroke-width="6"/><circle cx="140" cy="76" r="11" fill="none" stroke="#E8743B" stroke-width="6"/><path class="cic-l1" d="M150 46 L222 74" stroke="#D9DDE6" stroke-width="7" stroke-linecap="round"/><path class="cic-l2" d="M150 70 L222 42" stroke="#D9DDE6" stroke-width="7" stroke-linecap="round"/></g>' +
      '<ellipse cx="410" cy="900" rx="200" ry="40" fill="#0B0E1C" stroke="#5B6B8C" stroke-width="10"/><text x="410" y="980" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="26" fill="#7A6F60">il pozzo</text>' +
      '<rect x="1100" y="260" width="760" height="560" rx="20" fill="#FFFDF6" stroke="#E2D6BF" stroke-width="3"/>' +
      '<text x="1140" y="306" font-family="JetBrains Mono, monospace" font-size="20" fill="#7A6F60">la griglia: una riga per token</text>' + righe + tiles +
      '<text class="cic-giro" x="700" y="760" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="#E8743B"></text></svg>' +
      P.sott('NARRATORE', 'La parola pescata torna in fila, e il viaggio ricomincia: ogni volta con un viaggiatore in più. E ricomincia. E ricomincia, una parola alla volta.') +
      P.sott('ADA', 'Una parola in più, una riga in più nella griglia. Le pietre del pozzo restano le stesse.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.r = all('.cic-r'); this.t = all('.cic-t'); this.fr = q('.cic-fr'); this.giro = q('.cic-giro');
    this.l1 = q('.cic-l1'); this.l2 = q('.cic-l2');
    this.sub = window.PZ.subs(kit, [[0.4, 8.6], [9.0, 13.7]]);
  },
  render(t) {
    let f = CIC_FR[0][1]; CIC_FR.forEach(x => { if (t >= x[0]) f = x[1]; });
    this.fr.textContent = f;
    let snip = 0;
    CIC_TILE.forEach(([w, t0], i) => {
      const m = eio(seg(t, t0, t0 + 1.6)), fall = ei(seg(t, t0 + 1.9, t0 + 2.5));
      const x = lerp(1000, 520, m), y = lerp(560, 900, fall);
      this.t[i].setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + ((t < t0 ? 0 : 1) * (1 - 0.7 * fall)).toFixed(3) + ')');
      this.t[i].setAttribute('opacity', fall >= 1 ? 0 : 1);
      snip = Math.max(snip, Math.sin(Math.PI * seg(t, t0 + 1.5, t0 + 1.9)));
    });
    this.l1.setAttribute('transform', 'rotate(' + (-14 * snip).toFixed(2) + ' 181 58)'); this.l2.setAttribute('transform', 'rotate(' + (14 * snip).toFixed(2) + ' 181 58)');
    CIC_R.forEach(([w, c, t0], i) => {
      const p = t0 < 0 ? 1 : seg(t, t0, t0 + 0.4);
      this.r[i].setAttribute('opacity', eo(p).toFixed(2));
      this.r[i].setAttribute('transform', 'translate(' + (30 * (1 - eo(p))).toFixed(1) + ' 0)');
    });
    const g = t < 3 ? '' : (t < 7 ? 'giro 2' : (t < 10 ? 'giro 3' : 'giro 4'));
    this.giro.textContent = g;
    this.sub(t);
  },
});
