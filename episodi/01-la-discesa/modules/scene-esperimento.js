const { seg, eo, eio, lerp } = kit;
kit.scene('esperimento', {
  init(kit) {
    const P = window.PZ;
    kit.stage.append(kit.h('<div class="ground"><div class="carta"></div>' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect x="0" y="700" width="1920" height="380" fill="#C9A27A"/><path d="M0 700 L1920 700" stroke="#A9744F" stroke-width="4"/>' +
      '<g transform="rotate(3 1660 250)"><rect x="1540" y="150" width="250" height="190" rx="4" fill="#FFFDF6" stroke="#E2D6BF" stroke-width="2"/><circle cx="1665" cy="164" r="7" fill="#E8743B"/>' +
      '<text x="1562" y="214" font-family="Fredoka, sans-serif" font-weight="600" font-size="24" fill="#2E2A26">Esperimento 1</text>' +
      '<text x="1562" y="258" font-family="Fredoka, sans-serif" font-size="22" fill="#2E2A26">Al mare Emma ___</text>' +
      '<text x="1562" y="296" font-family="Fredoka, sans-serif" font-size="22" fill="#2E2A26">Al parco Emma ___</text></g>' +
      '<g class="esperimento-ada" style="transform-origin:1370px 820px"><g transform="translate(1180 210) scale(1.9)">' + P.ada('quaderno', 'calma') + '</g></g>' +
      '<rect x="0" y="790" width="1920" height="40" fill="#8A5A3C"/><rect x="0" y="830" width="1920" height="250" fill="#A9744F"/><path d="M0 940 L1920 940" stroke="#8A5A3C" stroke-width="3"/>' +
      '</svg>' +
      '<div class="monitor esperimento-mon" style="left:140px;top:150px;width:840px;height:330px">' +
      '<div class="mon-tit">ESPERIMENTO 1 · DUE FRASI</div>' +
      '<div class="esperimento-r1" style="font-size:50px;margin-top:22px;white-space:pre"></div>' +
      '<div class="esperimento-r2" style="font-size:50px;white-space:pre"></div>' +
      '<div class="esperimento-u1" style="position:absolute;left:114px;top:160px;width:120px;height:6px;border-radius:3px;background:var(--accent);transform-origin:0 50%"></div>' +
      '<div class="esperimento-u2" style="position:absolute;left:114px;top:233px;width:150px;height:6px;border-radius:3px;background:var(--accent);transform-origin:0 50%"></div>' +
      '<div class="esperimento-diff" style="position:absolute;right:26px;bottom:20px;font-size:20px;color:#E6FFF4">1 parola diversa</div>' +
      '</div>' +
      P.sott('ADA', 'Esperimento numero uno. Due frasi, una sola parola diversa: mare, parco. Cosa viene dopo Emma? Non lo so: per questo faccio l’esperimento.') +
      '</div>'));
    const q = s => kit.stage.querySelector(s);
    this.r1 = q('.esperimento-r1'); this.r2 = q('.esperimento-r2');
    this.u1 = q('.esperimento-u1').style; this.u2 = q('.esperimento-u2').style;
    this.diff = q('.esperimento-diff').style;
    this.mon = q('.esperimento-mon').style;
    this.ada = q('.esperimento-ada').style;
    this.sub = window.PZ.subs(kit, [[0.8, 8.8]]);
    this.t1 = kit.typist('Al mare Emma', 0.7, 11);
    this.t2 = kit.typist('Al parco Emma', 2.4, 11);
  },
  render(t) {
    const c1 = this.t1.at(t), c2 = this.t2.at(t);
    const blink = Math.floor(t / 0.53) % 2 ? '' : '▌';
    this.r1.textContent = c1 + (t < this.t1.end + 0.2 && t > 0.4 ? blink : '');
    this.r2.textContent = c2 + (t >= this.t1.end + 0.2 ? blink : '');
    this.u1.transform = 'scaleX(' + eo(seg(t, 4.1, 4.5)) + ')';
    this.u2.transform = 'scaleX(' + eo(seg(t, 4.4, 4.8)) + ')';
    this.diff.opacity = eo(seg(t, 4.8, 5.3));
    this.mon.transform = 'scale(' + lerp(0.97, 1, eo(seg(t, 0, 0.6))) + ') translateY(' + (-2 * t) + 'px)';
    this.ada.transform = 'scale(' + (1 + 0.012 * Math.sin(t * 2 * Math.PI / 3.2)) + ')';
    this.sub(t);
  },
});
