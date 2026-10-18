const { seg, eo, ei, eio, eob, lerp } = kit;
// 3.2 · Stesso secchio, pesca diversa: la stessa frase dà sempre lo stesso secchio, ma due pescate possono dare palline diverse.
const SS_G = '#2E9E4F', SS_T = '#28C1C1', SS_F = '#7BC96F', SS_A = '#9BD39B', SS_S = '#6FBF8A', SS_N = '#3379E5', SS_X = '#8A90A8';
const SS_CFG = [SS_G, SS_G, SS_T, SS_G, SS_F, SS_G, SS_T, SS_G, SS_A, SS_G, SS_S, SS_T, SS_G, SS_N, SS_G, SS_X, SS_T, SS_F, SS_G, SS_X];
kit.scene('stessosecchio', {
  init(kit) {
    const P = window.PZ;
    const timbro = (cls, txt, col) => '<g class="' + cls + '"><g transform="rotate(-6)"><rect x="-170" y="-40" width="340" height="80" rx="12" fill="#FFFDF6" stroke="' + col + '" stroke-width="7"/><text y="16" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="46" letter-spacing="3" fill="' + col + '">' + txt + '</text></g></g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + P.defs + P.lab() +
      '<g class="ss-nastro"><rect x="0" y="-24" width="260" height="48" rx="6" fill="#F6E7C8" stroke="#C8B48F" stroke-width="2"/><text x="18" y="9" font-family="JetBrains Mono, monospace" font-size="26" fill="#5C5348">Al parco Emma</text></g>' +
      '<g transform="translate(1250 300) scale(1.5)">' + P.ada('mani', 'felice') + '</g>' +
      '<g transform="translate(800 456)">' + P.secchio('ss-s1', SS_CFG, 1.4) + '</g>' +
      '<g class="ss-s2w">' + P.secchio('ss-s2', SS_CFG, 1.4) + '</g>' +
      P.palla('ss-p1', SS_G, 'corre') + P.palla('ss-p2', SS_T, 'gioca') +
      timbro('ss-t1', 'IDENTICO', '#2F6F73') + timbro('ss-t2', 'DIVERSO', '#E8743B') +
      '<g class="ss-mon"><rect x="1220" y="60" width="660" height="100" rx="16" fill="#0F2A2A" stroke="#C9973F" stroke-width="6"/>' +
      '<text x="1550" y="122" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="21" fill="#9BE7C4">Deterministico: il secchio. Variabile: la pesca.</text></g></svg>' +
      P.sott('ADA', 'Stessa frase, stesso secchio: sempre. Ma se pesco due volte, posso tirare fuori palline diverse.') +
      P.sott('NARRATORE', 'Per questo la stessa domanda può avere risposte diverse.') + '</div>'));
    const q = c => kit.stage.querySelector(c);
    this.nastro = q('.ss-nastro'); this.s2 = q('.ss-s2w'); this.p1 = q('.ss-p1'); this.p2 = q('.ss-p2'); this.t1 = q('.ss-t1'); this.t2 = q('.ss-t2'); this.mon = q('.ss-mon');
    this.sub = window.PZ.subs(kit, [[0.4, 8.8], [10.0, 15.0]]);
  },
  render(t) {
    // La stessa frase scende di nuovo nel pozzo, e risale un secchio identico.
    const n = seg(t, 0.6, 2.2);
    this.nastro.setAttribute('transform', 'translate(' + lerp(980, 250, eio(n)).toFixed(1) + ' ' + lerp(640, 330, eio(n)).toFixed(1) + ') scale(' + (1 - 0.6 * eio(n)).toFixed(3) + ')');
    this.nastro.setAttribute('opacity', (1 - seg(t, 2.1, 2.4)).toFixed(2));
    const up = eo(seg(t, 2.4, 3.8));
    this.s2.setAttribute('transform', 'translate(' + lerp(250, 1060, eio(seg(t, 3.0, 3.8))).toFixed(1) + ' ' + lerp(1100, 456, up).toFixed(1) + ')');
    const st1 = seg(t, 4.0, 4.4);
    this.t1.setAttribute('transform', 'translate(1040 860) scale(' + (st1 <= 0 ? 0 : lerp(1.2, 0.9, eob(st1, 1.5))).toFixed(3) + ')');
    this.t1.setAttribute('opacity', (1 - seg(t, 6.8, 7.2)).toFixed(2));
    // Due pescate, due palline diverse.
    const pesca = (g, t0, x0, x1) => { const p = seg(t, t0, t0 + 0.7); g.setAttribute('transform', 'translate(' + lerp(x0, x1, eo(p)).toFixed(1) + ' ' + (lerp(600, 500, eo(p)) - 110 * Math.sin(Math.PI * p)).toFixed(1) + ') scale(' + (p <= 0 ? 0 : eob(p, 1.6)).toFixed(3) + ')'); };
    pesca(this.p1, 7.2, 970, 940); pesca(this.p2, 8.4, 1230, 1260);
    const st2 = seg(t, 9.2, 9.6);
    this.t2.setAttribute('transform', 'translate(1100 860) scale(' + (st2 <= 0 ? 0 : lerp(1.2, 0.9, eob(st2, 1.5))).toFixed(3) + ')');
    this.mon.setAttribute('opacity', eo(seg(t, 15.6, 16.2)).toFixed(2));
    this.sub(t);
  },
});
