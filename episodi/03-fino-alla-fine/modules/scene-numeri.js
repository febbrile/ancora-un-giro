const { seg, eo, ei, eio, eob, lerp } = kit;
// 3.9 · Il pozzo è fatto di numeri: le pareti del pozzo spento diventano colonne di numeri fermi.
kit.scene('numeri', {
  init(kit) {
    const P = window.PZ;
    const r = kit.rng(21);
    const num = () => ((r() < 0.45 ? '−' : '') + (r() * 1.2).toFixed(2));
    let colonne = '';
    [[0, 'armadio', 200], [1, 'ingranaggi', 520], [2, 'campane', 840]].forEach(([k, nome, y0]) => {
      colonne += '<text x="960" y="' + (y0 - 36) + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="34" fill="#C9973F">' + nome + '</text>';
      for (let row = 0; row < 4; row++) {
        let riga = '';
        for (let c = 0; c < 9; c++) riga += num() + '  ';
        colonne += '<text x="960" y="' + (y0 + row * 46) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="30" fill="#9BE7C4" opacity=".85">' + riga + '</text>';
      }
    });
    kit.stage.append(kit.h('<div class="ground" style="background:#070912"><svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect x="240" y="0" width="1440" height="1080" fill="#0B0E1C"/><rect x="200" y="0" width="40" height="1080" fill="#3E4A66"/><rect x="1680" y="0" width="40" height="1080" fill="#3E4A66"/>' +
      '<g class="nu-pietra"><rect x="240" y="0" width="1440" height="1080" fill="#3E4A66"/>' +
      '<path d="M240 270 L1680 270 M240 540 L1680 540 M240 810 L1680 810" stroke="#2A3350" stroke-width="8"/></g>' +
      '<g class="nu-num">' + colonne + '</g>' +
      '<g class="nu-lente"><circle r="130" fill="#FFF4E0" opacity=".14"/><circle r="130" fill="none" stroke="#C9973F" stroke-width="12"/><path d="M92 92 L170 170" stroke="#7A5A24" stroke-width="22" stroke-linecap="round"/></g>' +
      '<g class="nu-torcia"><path d="M0 0 L-500 820 L500 820 Z" fill="#FFF4E0" opacity=".08"/></g>' +
      '<g transform="translate(1690 60) scale(1.1)">' + P.adaHead('calma') + '</g></svg>' +
      P.sott('NARRATORE', 'Il pozzo non pensa e non sogna. È fatto solo di numeri, sistemati uno per uno durante un lunghissimo allenamento.') +
      P.sott('ADA', 'Posso seguire ogni conto. Ma perché proprio questi numeri funzionano… nessuno lo sa ancora dire a parole.') + '</div>'));
    const q = c => kit.stage.querySelector(c);
    this.pietra = q('.nu-pietra'); this.num = q('.nu-num'); this.lente = q('.nu-lente'); this.torcia = q('.nu-torcia');
    this.sub = window.PZ.subs(kit, [[0.4, 10.4], [12.4, 21.8]]);
  },
  render(t) {
    // Le pareti diventano trasparenti: dietro la pietra ci sono solo numeri, fermi.
    const tr = eio(seg(t, 2.0, 5.0));
    this.pietra.setAttribute('opacity', (1 - 0.92 * tr).toFixed(2));
    this.num.setAttribute('opacity', tr.toFixed(2));
    this.torcia.setAttribute('transform', 'translate(1760 160) rotate(' + (40 + 12 * Math.sin(t * 0.6)).toFixed(1) + ')');
    const lx = 960 + 520 * Math.sin(t * 0.32), ly = 560 + 300 * Math.sin(t * 0.21 + 1);
    this.lente.setAttribute('transform', 'translate(' + lx.toFixed(1) + ' ' + ly.toFixed(1) + ')');
    this.lente.setAttribute('opacity', eo(seg(t, 11.0, 11.8)).toFixed(2));
    this.sub(t);
  },
});
