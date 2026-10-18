const { seg, eo, ei, eio, eob, lerp } = kit;
// 4.6 · Le righe senza nome: nessun seme vuol dire qualcosa da solo; conta quanto due carte si somigliano.
// I rotoli di Mare e Onde sono quelli di strumenti/numeri.py (seed 13 e 17).
const SN_K = 12, SN_X0 = 330, SN_W = 116;
kit.scene('senzanome', {
  init(kit) {
    const P = window.PZ;
    const M = P.rotolo(13, SN_K, 60), O = P.sommaRot(M, P.rotolo(17, SN_K, 15));
    const striscia = (nome, col, v, y) => {
      let s = '<g class="sn-str"><text x="' + (SN_X0 - 24) + '" y="' + (y + 12) + '" text-anchor="end" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="' + col + '">' + nome + '</text>' +
        '<rect x="' + (SN_X0 - 8) + '" y="' + (y - 70) + '" width="' + (SN_K * SN_W + 16) + '" height="140" rx="14" fill="#FFFDF6" stroke="' + col + '" stroke-width="6"/>';
      v.forEach((x, i) => {
        const cx = SN_X0 + i * SN_W + SN_W / 2;
        s += P.semeN(i, cx, y - 30, 1.0) + '<text x="' + cx + '" y="' + (y + 40) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="600" font-size="26" fill="' + (x < 0 ? '#B8332E' : '#2E2A26') + '">' + P.fmt(x) + '</text>';
      });
      return s + '<text x="' + (SN_X0 + SN_K * SN_W + 24) + '" y="' + (y + 12) + '" font-family="Fredoka, sans-serif" font-size="40" fill="#C8CEE8">…</text></g>';
    };
    let pills = '';
    M.forEach((x, i) => { const v = Math.round(Math.round(x * 100) * Math.round(O[i] * 100) / 100) / 100; pills += '<g class="sn-p">' + P.pill(v) + '</g>'; });
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect width="1920" height="1080" fill="#8A5A3C"/><rect x="60" y="150" width="1800" height="700" rx="30" fill="#1E5A3A" opacity=".85"/>' +
      striscia('Mare', '#6E6EE6', M, 330) + striscia('Onde', '#3379E5', O, 690) + pills + '</svg>' +
      P.sott('ADA', 'Che cosa vuol dire ogni seme? Preso da solo, nessuno lo sa. Conta quanto due carte si somigliano.') +
      P.sott('NARRATORE', 'Le parole del mare hanno carte simili. Per questo stanno vicine.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)];
    this.str = all('.sn-str'); this.p = all('.sn-p');
    this.sub = window.PZ.subs(kit, [[1.0, 10.6], [13.0, 18.6]]);
  },
  render(t) {
    this.str.forEach((s, i) => s.setAttribute('transform', 'translate(' + lerp(i ? 1920 : -1920, 0, eo(seg(t, 0.2 + i * 0.5, 1.4 + i * 0.5))).toFixed(1) + ' 0)'));
    // Seme per seme: le pastiglie sono tutte dorate.
    this.p.forEach((p, i) => {
      const s = seg(t, 4.0 + i * 0.45, 4.4 + i * 0.45);
      p.setAttribute('transform', 'translate(' + (SN_X0 + i * SN_W + SN_W / 2) + ' 510) scale(' + (s <= 0 ? 0 : 0.78 * eob(s, 1.7)).toFixed(3) + ')');
    });
    this.sub(t);
  },
});
