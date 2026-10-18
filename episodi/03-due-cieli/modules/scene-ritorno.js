const { seg, eo, eio, eob, lerp, TextFx } = kit;
kit.scene('ritorno', {
  init(kit) {
    const P = window.PZ;
    kit.stage.append(kit.h('<div class="ground"><div class="carta"></div>' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect y="820" width="1920" height="260" fill="#C9A27A"/><path d="M0 820 L1920 820" stroke="#A9744F" stroke-width="4"/>' +
      '<g class="rit-q" style="transform-origin:1440px 420px"><rect x="1160" y="190" width="560" height="460" rx="10" fill="#2F6F73" stroke="#1E4A4D" stroke-width="6"/>' +
      '<rect x="1186" y="214" width="508" height="412" rx="6" fill="#FFFDF6"/>' +
      '<g class="rit-p1"><text x="1220" y="290" font-family="Fredoka, sans-serif" font-weight="600" font-size="44" fill="#2E2A26">Esperimento 1</text>' +
      '<text x="1220" y="370" font-family="Fredoka, sans-serif" font-size="36" fill="#2E2A26">Al mare Emma nuota.</text>' +
      '<path d="M1230 450 L1260 480 L1320 410" stroke="#3B8F5C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>' +
      '<g class="rit-p2"><text x="1220" y="290" font-family="Fredoka, sans-serif" font-weight="600" font-size="44" fill="#2E2A26">Esperimento 2</text>' +
      '<text x="1220" y="370" font-family="Fredoka, sans-serif" font-size="36" fill="#2E2A26">Al parco Emma ___</text>' +
      '<text x="1220" y="440" font-family="Fredoka, sans-serif" font-size="26" fill="#7A6F60">stessa Emma, stesso pozzo,</text><text x="1220" y="476" font-family="Fredoka, sans-serif" font-size="26" fill="#7A6F60">una sola parola diversa</text></g></g>' +
      '<g class="rit-cornice"><rect x="-180" y="-200" width="360" height="400" rx="24" fill="#1B2244" stroke="#C9973F" stroke-width="10"/>' +
      '<g class="rit-trio"><g transform="translate(-160 46) scale(.5)">' + P.al() + '</g><g transform="translate(-70 36) scale(.55)">' + P.parco() + '</g><g transform="translate(48 -14) scale(.45)">' + P.emma('#FE8787') + '</g></g></g>' +
      '</svg>' +
      '<div class="words rit-tit" style="left:120px;top:160px;width:1300px"><h1 class="line" style="font-size:104px;color:#2E2A26">Il pozzo delle parole</h1><p class="sub" style="color:#5C5348">Episodio 3 · Due cieli</p></div>' +
      P.sott('ADA', 'Esperimento numero due. Stessa Emma, stesso pozzo: cambia solo una parola. Emma del parco, tocca a te!') + '</div>'));
    const q = c => kit.stage.querySelector(c);
    this.tit = q('.rit-tit').style; this.line = q('.rit-tit .line'); this.st = q('.rit-tit .sub').style;
    this.qd = q('.rit-q').style; this.p1 = q('.rit-p1'); this.p2 = q('.rit-p2');
    this.cor = q('.rit-cornice'); this.trio = q('.rit-trio');
    this.sub = window.PZ.subs(kit, [[4.4, 8.8]]);
  },
  render(t) {
    TextFx.fadeFromRight(this.line, t, -0.6);
    this.st.opacity = eo(seg(t, -0.6, 0));
    this.tit.opacity = 1 - eio(seg(t, 3.2, 3.8));
    const f = seg(t, 2.8, 3.6);
    this.qd.transform = 'scaleX(' + Math.abs(Math.cos(Math.PI * f)).toFixed(3) + ')';
    this.p1.setAttribute('opacity', f < 0.5 ? 1 : 0); this.p2.setAttribute('opacity', f < 0.5 ? 0 : 1);
    const g = eio(seg(t, 4.0, 5.6));
    this.cor.setAttribute('transform', 'translate(' + lerp(1720, 560, g).toFixed(1) + ' ' + lerp(860, 520, g).toFixed(1) + ') scale(' + lerp(0.5, 1.4, g).toFixed(3) + ')');
    const col = eio(seg(t, 5.8, 6.8));
    this.trio.style.filter = 'grayscale(' + (0.85 * (1 - col)).toFixed(2) + ') brightness(' + (0.75 + 0.25 * col).toFixed(2) + ')';
    this.trio.setAttribute('transform', 'translate(0 ' + (-8 * Math.max(0, Math.sin(Math.PI * seg(t, 6.8, 7.3)))).toFixed(1) + ')');
    this.sub(t);
  },
});
