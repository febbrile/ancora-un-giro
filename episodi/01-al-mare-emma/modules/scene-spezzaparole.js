const { seg, eo, ei, eio, eob, lerp } = kit;
// 1.2 · Lo Spezzaparole: la frase entra, tre token prendono vita, le lettere restano sul prato. Poi la gag muta della parola rara.
const SP_TOK = [{ nome: 'Al', num: '1204' }, { nome: 'mare', num: '8812' }, { nome: 'Emma', num: '22741' }];
const SP_X = [660, 960, 1260];
const SP_CUT = [4.2, 4.7], SP_POP = [4.4, 4.9, 5.4];
const SP_RARA = 'precipitevolissimevolmente', SP_PEZZI = 'pre cip ite vol issi me vol mente'.split(' ');
const SP_DEST = [[1585, 392], [1650, 380], [1700, 396], [1520, 812], [1610, 830], [1700, 826], [1790, 818], [1470, 836]];
function spMacchina() {
  return '<g class="sp-mac" style="transform-origin:960px 370px"><g transform="translate(768 92) scale(1.6)">' +
    '<rect x="40" y="62" width="120" height="100" rx="16" fill="#6D7A8F" stroke="#3E4A66" stroke-width="4"/>' +
    '<rect x="34" y="98" width="12" height="30" rx="4" fill="#3E4A66"/>' +
    '<circle cx="82" cy="98" r="11" fill="#FFFFFF"/><circle cx="118" cy="98" r="11" fill="#FFFFFF"/>' +
    '<circle class="sp-occhio" cx="84" cy="100" r="5" fill="#2E2A26"/><circle class="sp-occhio" cx="120" cy="100" r="5" fill="#2E2A26"/>' +
    '<path d="M78 132 L122 132 M78 140 L122 140" stroke="#3E4A66" stroke-width="4" stroke-linecap="round"/>' +
    '<circle cx="140" cy="40" r="11" fill="none" stroke="#E8743B" stroke-width="6"/><circle cx="140" cy="76" r="11" fill="none" stroke="#E8743B" stroke-width="6"/>' +
    '<path class="sp-l1" d="M150 46 L222 74" stroke="#D9DDE6" stroke-width="7" stroke-linecap="round"/>' +
    '<path class="sp-l2" d="M150 70 L222 42" stroke="#D9DDE6" stroke-width="7" stroke-linecap="round"/>' +
    '<circle cx="181" cy="58" r="4" fill="#3E4A66"/></g></g>';
}
function spNastro(cls, testo) {
  const w = 44 + testo.length * 18;
  return '<g class="' + cls + '"><rect x="0" y="-28" width="' + w + '" height="56" rx="6" fill="#F6E7C8" stroke="#C8B48F" stroke-width="2"/>' +
    '<text x="22" y="11" font-family="JetBrains Mono, monospace" font-size="30" fill="#5C5348">' + testo + '</text></g>';
}
kit.scene('spezzaparole', {
  init(kit) {
    const P = window.PZ;
    let s = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect x="0" y="760" width="1920" height="320" fill="#CFE3B0"/><path d="M0 760 C480 740 1440 780 1920 756" stroke="#9CC27A" stroke-width="6" fill="none"/>' +
      '<g class="sp-ada"><g transform="translate(1520 414) scale(1.2)"><g class="sp-calma">' + P.ada('mani', 'calma') + '</g><g class="sp-sorpresa" opacity="0">' + P.ada('mani', 'sorpresa') + '</g></g></g>' +
      spNastro('sp-nastro', 'Al mare Emma') + spNastro('sp-nastro2', SP_RARA) + spMacchina();
    SP_TOK.forEach((k, j) => {
      const x = SP_X[j], tw = 36 + k.nome.length * 21;
      let pers;
      if (j === 0) pers = '<g transform="translate(' + (x - 110) + ' 597) scale(1.1)">' + P.al() + '</g>';
      else if (j === 1) pers = '<g transform="translate(' + (x - 120) + ' 559) scale(1.2)">' + P.mare() + '</g>';
      else pers = '<g transform="translate(' + (x - 85) + ' 552) scale(.85)">' + P.emma('#C9C2D6') + '</g>';
      s += '<g class="sp-pers" style="transform-origin:' + x + 'px 780px">' + pers + '</g>' +
        '<g class="sp-tile"><rect x="' + (-tw / 2) + '" y="-31" width="' + tw + '" height="62" rx="8" fill="#F6E7C8" stroke="#C8B48F" stroke-width="2"/>' +
        '<text x="0" y="12" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="34" fill="#2E2A26">' + k.nome + '</text></g>' +
        '<g class="sp-bigl"><rect x="-62" y="-20" width="124" height="40" rx="6" fill="#FFFDF6" stroke="#C8B48F" stroke-width="2"/><circle cx="-46" cy="0" r="5" fill="#C8B48F"/>' +
        '<text x="8" y="8" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="22" fill="#2E2A26">' + k.num + '</text></g>' +
        '<g class="sp-nome" data-nome="' + k.nome + '" data-x="' + x + '" data-j="' + j + '"></g>';
    });
    s += '<g class="sp-pezzi"></g></svg>';
    kit.stage.append(kit.h('<div class="ground"><div class="carta"></div>' + s +
      '<div class="monitor sp-mon" style="left:60px;top:40px;width:640px"><div class="mon-tit">MONITOR DI ADA</div>' +
      '<div style="font-size:24px;color:#E6FFF4">Tokenizer, fuori dal modello:<br>testo → token → numeri</div><div class="sp-rare" style="font-size:24px">Parole rare = più pezzi</div></div>' +
      P.sott('NARRATORE', 'Prima di entrare nel pozzo, la frase passa dallo Spezzaparole, che la taglia in pezzi: i token. Le lettere restano fuori, sul prato. Nel pozzo scendono solo numeri.') + '</div>'));
    const q = c => kit.stage.querySelector(c), all = c => [...kit.stage.querySelectorAll(c)];
    this.nastro = q('.sp-nastro'); this.nastro2 = q('.sp-nastro2'); this.mac = q('.sp-mac').style;
    this.l1 = q('.sp-l1'); this.l2 = q('.sp-l2'); this.occhi = all('.sp-occhio');
    this.tile = all('.sp-tile'); this.pers = all('.sp-pers'); this.bigl = all('.sp-bigl');
    this.calma = q('.sp-calma'); this.sorpr = q('.sp-sorpresa'); this.ada = q('.sp-ada');
    this.mon = q('.sp-mon').style; this.rare = q('.sp-rare').style;
    this.vest = this.pers[2].firstElementChild.firstElementChild;
    // Le lettere dei nomi: misurate una per una, poi cadono sul prato.
    const r = kit.rng(11);
    this.letters = [];
    all('.sp-nome').forEach(g => {
      const nome = g.getAttribute('data-nome'), x0 = +g.getAttribute('data-x'), j = +g.getAttribute('data-j');
      const mis = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      mis.textContent = nome; mis.setAttribute('x', x0); mis.setAttribute('y', 510); mis.setAttribute('text-anchor', 'middle');
      mis.setAttribute('font-family', 'Fredoka, sans-serif'); mis.setAttribute('font-weight', '600'); mis.setAttribute('font-size', '40');
      g.appendChild(mis);
      let pos = nome.split('').map((c, k) => x0 + (k - (nome.length - 1) / 2) * 24);
      try { pos = nome.split('').map((c, k) => (mis.getStartPositionOfChar(k).x + mis.getEndPositionOfChar(k).x) / 2); } catch (e) {}
      g.removeChild(mis);
      nome.split('').forEach((c, k) => {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        el.textContent = c;
        el.setAttribute('text-anchor', 'middle'); el.setAttribute('font-family', 'Fredoka, sans-serif');
        el.setAttribute('font-weight', '600'); el.setAttribute('font-size', '40'); el.setAttribute('fill', '#2E2A26');
        g.appendChild(el);
        this.letters.push({ el, x: pos[k], ts: 10.0 + j * 0.5 + k * 0.13, dx: (r() - 0.5) * 70, rot: (r() - 0.5) * 160, yl: 880 + r() * 120 });
      });
    });
    const box = q('.sp-pezzi');
    this.pezzi = SP_PEZZI.map((w, k) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const tw = 24 + w.length * 15;
      g.innerHTML = '<rect x="' + (-tw / 2) + '" y="-20" width="' + tw + '" height="40" rx="6" fill="#F6E7C8" stroke="#C8B48F" stroke-width="2"/><text x="0" y="8" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="24" fill="#2E2A26">' + w + '</text>';
      box.appendChild(g);
      return { g, ts: 18.2 + k * 0.22, to: SP_DEST[k], rot: (k % 2 ? 1 : -1) * (10 + k * 4) };
    });
    this.sub = window.PZ.subs(kit, [[0.8, 15.4]]);
  },
  render(t) {
    const P = window.PZ;
    // Il nastro della frase entra nella macchina.
    this.nastro.setAttribute('transform', 'translate(' + lerp(-340, 742, eio(seg(t, 1.6, 4.1))).toFixed(1) + ' 270)');
    this.nastro.setAttribute('opacity', 1 - seg(t, 4.0, 4.2));
    let snip = 0, squash = 0;
    SP_CUT.forEach(c => { const p = seg(t, c - 0.15, c + 0.25); snip = Math.max(snip, Math.sin(Math.PI * p)); squash = Math.max(squash, Math.sin(Math.PI * seg(t, c, c + 0.3))); });
    // Gag: la parola rara, tagliata a raffica.
    this.nastro2.setAttribute('transform', 'translate(' + lerp(-560, 742, eio(seg(t, 16.6, 18.0))).toFixed(1) + ' 270)');
    this.nastro2.setAttribute('opacity', 1 - seg(t, 17.9, 18.1));
    const on = seg(t, 18.0, 18.15) * (1 - seg(t, 19.9, 20.1));
    const raffica = on * (0.5 + 0.5 * Math.sin(t * 2 * Math.PI * 2.8));
    snip = Math.max(snip, raffica); squash = Math.max(squash, raffica * 0.7);
    this.l1.setAttribute('transform', 'rotate(' + (-14 * snip).toFixed(2) + ' 181 58)');
    this.l2.setAttribute('transform', 'rotate(' + (14 * snip).toFixed(2) + ' 181 58)');
    this.mac.transform = 'scale(' + (1 + 0.025 * squash) + ',' + (1 - 0.04 * squash) + ')';
    const look = lerp(-3, 3, eio(seg(t, 4.6, 6.0))) + lerp(0, 2, eio(seg(t, 18.0, 18.6)));
    this.occhi.forEach((o, i) => o.setAttribute('cx', (i ? 120 : 84) + look));
    // I tre pezzi saltano fuori, poi diventano personaggi con il loro biglietto.
    SP_X.forEach((X, j) => {
      const p = seg(t, SP_POP[j], SP_POP[j] + 0.55);
      const x = lerp(1000, X, eo(p)), y = lerp(390, 640, eo(p)) - 60 * Math.sin(Math.PI * p);
      const vive = seg(t, 6.2 + j * 0.15, 6.8 + j * 0.15);
      const sc = (p <= 0 ? 0 : eob(p, 1.7)) * (1 - eo(vive));
      this.tile[j].setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + lerp(y, 660, vive).toFixed(1) + ') scale(' + sc.toFixed(3) + ')');
      const pv = seg(t, 6.4 + j * 0.15, 7.2 + j * 0.15);
      const hop = 0.04 * Math.max(0, Math.sin(Math.PI * seg(t, 21.0 + j * 0.2, 21.6 + j * 0.2)));
      this.pers[j].style.transform = 'scale(' + (eob(pv, 1.6) * (1 + 0.01 * Math.sin(t * 2 + j)) + hop).toFixed(3) + ')';
      const pb = seg(t, 7.6 + j * 0.25, 8.1 + j * 0.25);
      this.bigl[j].setAttribute('transform', 'translate(' + X + ' ' + (440 - 2 * Math.sin(t * 1.6 + j)).toFixed(1) + ') scale(' + eob(pb, 1.8).toFixed(3) + ')');
    });
    this.vest.style.color = '#C9C2D6';
    this.letters.forEach(L => {
      const show = seg(t, 8.6, 9.1), p = seg(t, L.ts, L.ts + 0.9), f = ei(p);
      const y = lerp(510, L.yl, f);
      L.el.setAttribute('x', (L.x + L.dx * p).toFixed(1));
      L.el.setAttribute('y', y.toFixed(1));
      L.el.setAttribute('transform', 'rotate(' + (L.rot * eo(p)).toFixed(1) + ' ' + (L.x + L.dx * p).toFixed(1) + ' ' + y.toFixed(1) + ')');
      L.el.setAttribute('fill', p >= 1 ? '#7FA25E' : '#2E2A26');
      L.el.setAttribute('opacity', show.toFixed(2));
    });
    this.pezzi.forEach(Z => {
      const p = seg(t, Z.ts, Z.ts + 0.75);
      const x = lerp(1060, Z.to[0], p), y = lerp(390, Z.to[1], eio(p)) - 230 * Math.sin(Math.PI * p);
      const s = p <= 0 ? 0 : 0.6 + 0.4 * eob(seg(t, Z.ts, Z.ts + 0.3), 1.6);
      Z.g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + (Z.rot * p).toFixed(1) + ') scale(' + s.toFixed(3) + ')');
    });
    const sorpresa = t > 18.9 && t < 24.5;
    this.calma.setAttribute('opacity', sorpresa ? 0 : 1);
    this.sorpr.setAttribute('opacity', sorpresa ? 1 : 0);
    const hit = Math.sin(Math.PI * seg(t, 18.8, 19.2));
    this.ada.setAttribute('transform', 'translate(1640 780) scale(' + (1 + 0.04 * hit).toFixed(3) + ',' + (1 - 0.06 * hit).toFixed(3) + ') translate(-1640 -780)');
    this.mon.opacity = eo(seg(t, 15.6, 16.2));
    this.rare.opacity = eo(seg(t, 20.2, 20.7));
    this.sub(t);
  },
});
