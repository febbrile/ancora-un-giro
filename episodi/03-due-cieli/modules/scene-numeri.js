const { seg, eo, ei, eio, eob, lerp } = kit;
const NU_BANDE = [['E · il Grande Armadio', 90, 4], ['strati · lenti e macchine', 360, 8], ['U · le campane', 760, 4]];
kit.scene('numeri', {
  init(kit) {
    const P = window.PZ, r = kit.rng(31);
    let num = '', lab = '';
    NU_BANDE.forEach(([nome, y0, righe], b) => {
      lab += '<text x="1400" y="' + (y0 + 24) + '" font-family="Fredoka, sans-serif" font-weight="600" font-size="28" fill="#C8CEE8">' + nome + '</text>';
      for (let rr = 0; rr < righe; rr++) {
        let riga = '';
        for (let c = 0; c < 9; c++) { const v = (r() * 2.4 - 1.2); riga += (v < 0 ? '−' : ' ') + Math.abs(v).toFixed(2) + '  '; }
        num += '<text class="nu-r" x="590" y="' + (y0 + 30 + rr * 34) + '" font-family="JetBrains Mono, monospace" font-size="20" fill="#8FB6FF" xml:space="preserve">' + riga + '</text>';
      }
    });
    kit.stage.append(kit.h('<div class="ground" style="background:#070A18">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect x="560" y="0" width="800" height="1080" fill="#0B0E1C"/>' +
      '<g class="nu-muri"><rect x="520" y="0" width="40" height="1080" fill="#3E4A66"/><rect x="1360" y="0" width="40" height="1080" fill="#3E4A66"/>' +
      '<rect x="560" y="0" width="800" height="1080" fill="#2A3350"/></g>' + num + lab +
      '<polygon class="nu-luce" points="420,430 560,300 560,760" fill="#FFE9A8" opacity=".18"/>' +
      '<g transform="translate(170 330) scale(1.5)">' + P.ada('mani', 'calma') + '</g>' +
      '<rect x="360" y="410" width="70" height="34" rx="8" fill="#5B6B8C" transform="rotate(-20 395 427)"/>' +
      '<g class="nu-lente"><circle r="118" fill="#FFF4E0" fill-opacity=".1" stroke="#C9973F" stroke-width="12"/><path d="M84 84 L160 160" stroke="#7A5A24" stroke-width="22" stroke-linecap="round"/>' +
      '<text class="nu-big" y="-12" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="40" font-weight="600" fill="#FFF4E0"></text><text class="nu-big2" y="38" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="40" font-weight="600" fill="#FFF4E0"></text>' +
      '<text y="88" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="26" fill="#FFD978">?</text></g></svg>' +
      P.sott('NARRATORE', 'Il pozzo non pensa e non sogna. È fatto solo di numeri, sistemati uno per uno durante un lunghissimo allenamento.') +
      P.sott('ADA', 'Posso seguire ogni conto che fa. Ma se mi chiedi perché proprio questi numeri funzionano… non lo so dire a parole. Nessuno lo sa ancora davvero.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.muri = q('.nu-muri'); this.r = all('.nu-r'); this.lente = q('.nu-lente'); this.big = q('.nu-big'); this.big2 = q('.nu-big2'); this.luce = q('.nu-luce');
    this.rng = kit.rng(77); this.vals = Array.from({ length: 24 }, () => (this.rng() * 2.4 - 1.2));
    this.sub = window.PZ.subs(kit, [[0.4, 6.4], [6.8, 14.7]]);
  },
  render(t) {
    const tr = eio(seg(t, 1.0, 3.0));
    this.muri.setAttribute('opacity', (1 - 0.85 * tr).toFixed(2));
    this.r.forEach((e, i) => e.setAttribute('opacity', (0.15 + 0.55 * eo(seg(t, 1.2 + i * 0.08, 1.8 + i * 0.08))).toFixed(2)));
    this.luce.setAttribute('opacity', (0.14 + 0.05 * Math.sin(t * 3)).toFixed(2));
    const lp = seg(t, 6.0, 13.5);
    const lx = lerp(700, 1220, eio(lp)), ly = 300 + 380 * Math.sin(Math.PI * lp * 1.0) * 0.8 + 120 * lp;
    this.lente.setAttribute('transform', 'translate(' + lx.toFixed(1) + ' ' + ly.toFixed(1) + ') scale(' + (lp <= 0 ? 0 : eob(seg(t, 6.0, 6.5), 1.6)).toFixed(3) + ')');
    const k = Math.floor(lp * 11) % 12;
    const f = v => (v < 0 ? '−' : '') + Math.abs(v).toFixed(2);
    this.big.textContent = f(this.vals[k * 2]) + ' ' + f(this.vals[k * 2 + 1]);
    this.big2.textContent = f(this.vals[(k * 2 + 5) % 24]) + ' ' + f(this.vals[(k * 2 + 9) % 24]);
    this.sub(t);
  },
});
