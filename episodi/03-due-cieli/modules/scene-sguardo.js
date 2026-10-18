const { seg, eo, ei, eio, eob, lerp } = kit;
const SG_RY = [92, 162, 232].map(y => 420 + (y - 150) * 0.9);
const SG_Q = [0.90, 0.20, -0.50], SG_K = [0.55, 1.25, -1.20], SG_P = [0.50, 0.25, 0.60], SG_T = [9.5, 10.7, 11.9];
kit.scene('sguardo', {
  init(kit) {
    const P = window.PZ;
    let lanes = '<g class="sg-cq">' + P.carta({ v: SG_Q, col: '#E0475B', titolo: 'Emma', sotto: 'lanterna (la stessa)' }) + '</g>' +
      '<g class="sg-ck">' + P.carta({ v: SG_K, col: '#2E9E55', titolo: 'Parco', sotto: 'cartello' }) + '</g>';
    SG_RY.forEach((y, i) => {
      lanes += '<rect class="sg-hl" x="231" y="' + (y - 30) + '" width="218" height="60" rx="12" fill="none" stroke="#FFD978" stroke-width="5"/><rect class="sg-hl" x="681" y="' + (y - 30) + '" width="218" height="60" rx="12" fill="none" stroke="#FFD978" stroke-width="5"/>' +
        '<g class="sg-sp">' + P.pill(SG_P[i]) + '</g>';
    });
    lanes += '<g class="sg-gt">' + P.gettone(1.35) + '</g>';
    kit.stage.append(kit.h('<div class="ground">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><linearGradient id="sg-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#262F60"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#sg-muro)"/><rect y="860" width="1920" height="220" fill="#1B2244"/>' +
      '<g class="sg-a"><rect width="1920" height="1080" fill="#2C2A57"/><ellipse cx="960" cy="900" rx="620" ry="80" fill="#6E3347"/>' +
      '<g transform="translate(520 380) rotate(-3) scale(1.1)"><rect x="-110" y="-140" width="220" height="280" rx="10" fill="#C9973F" stroke="#7A5A24" stroke-width="6"/><rect x="-90" y="-120" width="180" height="240" rx="4" fill="#3B2F4A"/><path d="M-72 120 C-62 44 62 44 72 120 Z" fill="#2F4F46"/><ellipse cx="0" cy="-8" rx="34" ry="42" fill="#F1D3BE"/><path d="M-38 -14 C-42 -58 42 -58 38 -14 C32 -40 -32 -40 -38 -14 Z" fill="#3A2418"/><circle cx="0" cy="-58" r="16" fill="#3A2418"/>' +
      '<rect x="-52" y="146" width="104" height="28" rx="4" fill="#E9D7A6" stroke="#7A5A24" stroke-width="2"/><text x="0" y="166" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="18" fill="#3A2418">Bovary</text></g>' +
      '<text x="1560" y="760" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="170" fill="#C9A27A" stroke="#8A5A3C" stroke-width="4">e</text>' +
      '<g transform="translate(1078 676) scale(.8)">' + P.emma('#FE8787', { dx: -4 }) + '</g>' +
      '<g class="sg-stamp"><g transform="rotate(-6)"><rect x="-200" y="-42" width="400" height="84" rx="12" fill="#10152B" stroke="#E8743B" stroke-width="6"/><text y="16" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="#E8743B">come al mare</text></g></g></g>' +
      '<g class="sg-b">' + lanes +
      '<text class="sg-tot" x="560" y="800" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="48" fill="#FFD978">1.35 → 70%</text>' +
      '<g transform="translate(1180 676)">' + P.parco() + '</g>' +
      '<path class="sg-getto" d="M1330 700 C1440 560 1500 560 1560 700" stroke="#87FE87" stroke-width="40" stroke-linecap="round" fill="none" stroke-dasharray="420" stroke-dashoffset="420"/>' +
      '<g class="sg-emma" style="transform-origin:1640px 860px"><g transform="translate(1560 646) scale(.8)">' + P.emma('#FE8787', { dx: -4 }) + '</g></g></g>' +
      '</svg>' +
      P.sott('ADA', 'Piano zero: identico al mare. Il contesto non è ancora entrato.') +
      P.sott('ADA', 'Primo sguardo. La carta-lanterna di Emma è la stessa di prima, ma ora incontra la carta di Parco. Più zero cinquanta, più zero venticinque, più zero sessanta: uno virgola trentacinque. Settanta per cento… di verde.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.a = q('.sg-a'); this.b = q('.sg-b'); this.stamp = q('.sg-stamp');
    this.cq = q('.sg-cq'); this.ck = q('.sg-ck'); this.hl = all('.sg-hl'); this.sp = all('.sg-sp'); this.gt = q('.sg-gt');
    this.tot = q('.sg-tot'); this.getto = q('.sg-getto');
    this.emma = q('.sg-emma'); this.vest = this.emma.firstElementChild.firstElementChild;
    this.sub = window.PZ.subs(kit, [[0.4, 3.8], [4.4, 15.7]]);
  },
  render(t) {
    const P = window.PZ;
    const x = eio(seg(t, 3.8, 4.4));
    this.a.setAttribute('opacity', (1 - x).toFixed(2)); this.b.setAttribute('opacity', x.toFixed(2));
    const st = seg(t, 1.0, 1.4);
    this.stamp.setAttribute('transform', 'translate(1300 300) scale(' + (st <= 0 ? 0 : lerp(1.5, 1, eob(st, 1.5))).toFixed(3) + ')');
    const ca = eob(seg(t, 7.2, 7.8), 1.4), cb = eob(seg(t, 7.5, 8.1), 1.4);
    this.cq.setAttribute('transform', 'translate(' + lerp(-200, 330, ca).toFixed(1) + ' 420) rotate(-2) scale(.9) translate(-110 -150)');
    this.ck.setAttribute('transform', 'translate(' + lerp(1100, 790, cb).toFixed(1) + ' 420) rotate(2) scale(' + (0.9 * Math.min(1, cb * 1.2)).toFixed(3) + ') translate(-110 -150)');
    SG_RY.forEach((y, i) => {
      const tc = SG_T[i], h = seg(t, tc - 0.7, tc - 0.4) * (1 - seg(t, tc + 0.6, tc + 0.9));
      this.hl[i * 2].setAttribute('opacity', h.toFixed(2)); this.hl[i * 2 + 1].setAttribute('opacity', h.toFixed(2));
      const sp = seg(t, tc, tc + 0.4), m = eio(seg(t, 12.3 + i * 0.15, 12.8 + i * 0.15));
      this.sp[i].setAttribute('transform', 'translate(560 ' + lerp(y, 680, m).toFixed(1) + ') scale(' + (sp <= 0 || m >= 1 ? 0 : 0.85 * eob(sp, 1.7) * (1 - 0.5 * m)).toFixed(3) + ')');
    });
    const gp = seg(t, 12.8, 13.2);
    this.gt.setAttribute('transform', 'translate(560 680) scale(' + (gp <= 0 ? 0 : eob(gp, 1.8)).toFixed(3) + ') rotate(' + (6 * Math.sin(t * 1.3)).toFixed(2) + ')');
    this.tot.setAttribute('opacity', eo(seg(t, 13.0, 13.5)).toFixed(2));
    this.getto.setAttribute('stroke-dashoffset', (420 * (1 - eo(seg(t, 14.0, 14.9)))).toFixed(1));
    this.getto.setAttribute('opacity', (1 - seg(t, 15.4, 15.9)).toFixed(2));
    this.vest.style.color = P.mix('#FE8787', '#D5DD86', eio(seg(t, 14.5, 15.4)));
    this.emma.style.transform = 'scale(' + (1 + 0.05 * Math.sin(Math.PI * seg(t, 14.5, 15.1)) + 0.01 * Math.sin(t * 2)) + ')';
    this.sub(t);
  },
});
