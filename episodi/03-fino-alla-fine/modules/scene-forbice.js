const { seg, eo, ei, eio, eob, lerp } = kit;
// 3.7 · La forbice dell'orologio: una frase tagliata a metà è opera di un limite di parole, fuori dal pozzo.
kit.scene('forbice', {
  init(kit) {
    const P = window.PZ;
    kit.stage.append(kit.h('<div class="ground"><div class="carta"></div><svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect x="0" y="820" width="1920" height="260" fill="#A9744F"/><rect x="0" y="800" width="1920" height="30" fill="#8A5A3C"/>' +
      '<g transform="translate(1560 250)"><circle r="120" fill="#FBF6EC" stroke="#7A5A24" stroke-width="10"/><path d="M0 0 L0 -80 M0 0 L56 30" stroke="#2E2A26" stroke-width="8" stroke-linecap="round"/><circle r="10" fill="#2E2A26"/>' +
      '<text y="-92" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="18" fill="#7A6F60">max</text></g>' +
      '<path d="M1560 370 L1560 420" stroke="#7A5A24" stroke-width="4"/>' +
      '<g class="fo-forbice"><circle cx="-14" cy="-30" r="14" fill="none" stroke="#E8743B" stroke-width="7"/><circle cx="14" cy="-30" r="14" fill="none" stroke="#E8743B" stroke-width="7"/>' +
      '<path class="fo-l1" d="M-6 -18 L22 60" stroke="#D9DDE6" stroke-width="9" stroke-linecap="round"/><path class="fo-l2" d="M6 -18 L-22 60" stroke="#D9DDE6" stroke-width="9" stroke-linecap="round"/><circle cx="0" cy="0" r="5" fill="#3E4A66"/></g>' +
      '<g class="fo-a"><rect x="120" y="470" width="0" height="80" rx="8" fill="#F6E7C8" stroke="#C8B48F" stroke-width="3" class="fo-ra"/><text class="fo-ta" x="150" y="522" font-family="JetBrains Mono, monospace" font-size="36" fill="#2E2A26"></text></g>' +
      '<g class="fo-b"><text class="fo-tb" x="0" y="522" font-family="JetBrains Mono, monospace" font-size="36" fill="#2E2A26"></text></g>' +
      '<g class="fo-nota" transform="rotate(-4 700 700)"><rect x="520" y="640" width="440" height="110" rx="6" fill="#FFFDF6" stroke="#E2D6BF" stroke-width="3"/><circle cx="740" cy="652" r="7" fill="#E8743B"/>' +
      '<text x="740" y="712" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="30" fill="#2E2A26">è stata la forbice, non il pozzo</text></g>' +
      '<g class="fo-mon"><rect x="120" y="80" width="720" height="90" rx="16" fill="#0F2A2A" stroke="#C9973F" stroke-width="6"/>' +
      '<text x="480" y="138" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="30" fill="#9BE7C4">max_tokens: un limite esterno.</text></g></svg>' +
      P.sott('ADA', 'E se una frase si interrompe a metà? È la mia forbice: un limite di parole. Il pozzo non c’entra.') + '</div>'));
    const q = c => kit.stage.querySelector(c);
    this.f = q('.fo-forbice'); this.l1 = q('.fo-l1'); this.l2 = q('.fo-l2'); this.ra = q('.fo-ra'); this.ta = q('.fo-ta'); this.tb = q('.fo-tb'); this.b = q('.fo-b');
    this.nota = q('.fo-nota'); this.mon = q('.fo-mon');
    this.typed = kit.typist('Al parco Emma corre felice e poi va verso l’alta', 0.8, 11);
    this.sub = window.PZ.subs(kit, [[6.4, 14.6]]);
  },
  render(t) {
    const CW = 21.6, txt = this.typed.at(t), w = 60 + txt.length * CW;
    this.ra.setAttribute('width', Math.min(w, 1500).toFixed(1));
    // Il taglio: la forbice scende dall'orologio e taglia il nastro; il pezzo finale cade.
    const giu = seg(t, 4.6, 5.3), taglio = Math.sin(Math.PI * seg(t, 5.3, 5.7));
    const fx = lerp(1560, 150 + 41 * CW + 4, eio(giu)), fy = lerp(470, 512, eio(giu));
    this.f.setAttribute('transform', 'translate(' + fx.toFixed(1) + ' ' + fy.toFixed(1) + ') rotate(' + lerp(0, 90, eio(giu)).toFixed(1) + ')');
    this.l1.setAttribute('transform', 'rotate(' + (-12 * taglio).toFixed(1) + ')'); this.l2.setAttribute('transform', 'rotate(' + (12 * taglio).toFixed(1) + ')');
    const cut = t >= 5.5, cade = seg(t, 5.6, 6.8);
    const keep = 'Al parco Emma corre felice e poi va verso', rest = ' l’alta—';
    this.ta.textContent = cut ? keep : txt;
    this.tb.textContent = cut ? rest : '';
    this.ra.setAttribute('width', cut ? (30 + keep.length * CW).toFixed(1) : Math.min(w, 1500).toFixed(1));
    this.b.setAttribute('transform', 'translate(' + (150 + keep.length * CW).toFixed(1) + ' ' + (320 * ei(cade)).toFixed(1) + ') rotate(' + (25 * cade).toFixed(1) + ')');
    this.b.setAttribute('opacity', (1 - seg(t, 6.6, 7.0)).toFixed(2));
    this.nota.setAttribute('opacity', eo(seg(t, 7.0, 7.6)).toFixed(2));
    this.mon.setAttribute('opacity', eo(seg(t, 15.0, 15.6)).toFixed(2));
    this.sub(t);
  },
});
