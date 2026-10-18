const { seg, eo, eio, eob, lerp } = kit;
const GAG_PEZZI = 'pre cip ite vol issi me vol mente';
const GAG_DEST = [[1318, 384], [1380, 376], [1240, 820], [1450, 816], [1300, 836], [1180, 838], [1510, 834], [1372, 842]];
kit.scene('gag', {
  init(kit) {
    const P = window.PZ;
    const parola = 'precipitevolissimevolmente';
    const wN = 44 + parola.length * 18;
    kit.stage.append(kit.h('<div class="ground"><div class="carta"></div>' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect x="0" y="800" width="1920" height="280" fill="#CFE3B0"/><path d="M0 800 C480 784 1440 816 1920 796" stroke="#9CC27A" stroke-width="6" fill="none"/>' +
      '<g class="gag-nastro"><rect x="0" y="-28" width="' + wN + '" height="56" rx="6" fill="#F6E7C8" stroke="#C8B48F" stroke-width="2"/><text x="22" y="11" font-family="JetBrains Mono, monospace" font-size="30" fill="#5C5348">' + parola + '</text></g>' +
      '<g class="gag-mac" style="transform-origin:800px 600px"><g transform="translate(560 236) scale(2)">' +
      '<rect x="40" y="62" width="120" height="100" rx="16" fill="#6D7A8F" stroke="#3E4A66" stroke-width="4"/><rect x="34" y="98" width="12" height="30" rx="4" fill="#3E4A66"/>' +
      '<circle cx="82" cy="98" r="11" fill="#FFFFFF"/><circle cx="118" cy="98" r="11" fill="#FFFFFF"/><circle cx="86" cy="100" r="5" fill="#2E2A26"/><circle cx="122" cy="100" r="5" fill="#2E2A26"/>' +
      '<path class="gag-bocca" d="M78 136 Q100 132 122 136" stroke="#3E4A66" stroke-width="4" stroke-linecap="round" fill="none"/>' +
      '<circle cx="140" cy="40" r="11" fill="none" stroke="#E8743B" stroke-width="6"/><circle cx="140" cy="76" r="11" fill="none" stroke="#E8743B" stroke-width="6"/>' +
      '<path class="gag-l1" d="M150 46 L222 74" stroke="#D9DDE6" stroke-width="7" stroke-linecap="round"/><path class="gag-l2" d="M150 70 L222 42" stroke="#D9DDE6" stroke-width="7" stroke-linecap="round"/><circle cx="181" cy="58" r="4" fill="#3E4A66"/></g></g>' +
      '<g class="gag-ada" style="transform-origin:1340px 830px"><g transform="translate(1200 372) scale(1.4)"><g class="gag-calma">' + P.ada('mani', 'calma') + '</g><g class="gag-sorpresa">' + P.ada('mani', 'sorpresa') + '</g></g></g>' +
      '<g class="gag-pezzi"></g></svg>' +
      P.sott('ADA', 'E con una parola rara? Proviamo: precipitevolissimevolmente.') +
      P.sott('ADA', 'Ah! Otto pezzi. Le parole rare costano più token.') + '</div>'));
    const q = s => kit.stage.querySelector(s);
    this.nastro = q('.gag-nastro'); this.mac = q('.gag-mac').style;
    this.l1 = q('.gag-l1'); this.l2 = q('.gag-l2');
    this.calma = q('.gag-calma'); this.sorpr = q('.gag-sorpresa');
    this.ada = q('.gag-ada').style;
    const box = q('.gag-pezzi');
    this.pezzi = GAG_PEZZI.split(' ').map((w, k) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const tw = 24 + w.length * 15;
      g.innerHTML = '<rect x="' + (-tw / 2) + '" y="-20" width="' + tw + '" height="40" rx="6" fill="#F6E7C8" stroke="#C8B48F" stroke-width="2"/><text x="0" y="8" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="24" fill="#2E2A26">' + w + '</text>';
      box.appendChild(g);
      return { g, ts: 2.0 + k * 0.24, to: GAG_DEST[k], rot: (k % 2 ? 1 : -1) * (10 + k * 4) };
    });
    this.sub = window.PZ.subs(kit, [[0.3, 3.5], [3.8, 6.9]]);
  },
  render(t) {
    this.nastro.setAttribute('transform', 'translate(' + lerp(-560, 300, eio(seg(t, 0.3, 1.9))).toFixed(1) + ' 458)');
    this.nastro.setAttribute('opacity', 1 - seg(t, 1.8, 2.0));
    const on = seg(t, 1.9, 2.05) * (1 - seg(t, 3.8, 4.0));
    const snip = on * (0.5 + 0.5 * Math.sin(t * 2 * Math.PI * 2.8));
    this.l1.setAttribute('transform', 'rotate(' + (-14 * snip).toFixed(2) + ' 181 58)');
    this.l2.setAttribute('transform', 'rotate(' + (14 * snip).toFixed(2) + ' 181 58)');
    this.mac.transform = 'scale(' + (1 + 0.02 * snip) + ',' + (1 - 0.03 * snip) + ')';
    this.pezzi.forEach(P => {
      const p = seg(t, P.ts, P.ts + 0.75);
      const x = lerp(1000, P.to[0], p), y = lerp(560, P.to[1], eio(p)) - 230 * Math.sin(Math.PI * p);
      const s = p <= 0 ? 0 : 0.6 + 0.4 * eob(seg(t, P.ts, P.ts + 0.3), 1.6);
      P.g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + (P.rot * p).toFixed(1) + ') scale(' + s.toFixed(3) + ')');
    });
    const sorpresa = t > 2.75;
    this.calma.setAttribute('opacity', sorpresa ? 0 : 1);
    this.sorpr.setAttribute('opacity', sorpresa ? 1 : 0);
    const hit = Math.sin(Math.PI * seg(t, 2.7, 3.1));
    this.ada.transform = 'scale(' + (1 + 0.04 * hit) + ',' + (1 - 0.06 * hit) + ')';
    this.sub(t);
  },
});
