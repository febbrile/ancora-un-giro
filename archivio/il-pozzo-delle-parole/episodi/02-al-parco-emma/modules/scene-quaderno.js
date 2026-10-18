const { seg, eo, ei, eio, eob, lerp, TextFx } = kit;
// 2.1 · Il quaderno di Ada: la pagina di ieri, una parola cambiata, e lo Spezzaparole fa uscire Al, Parco ed Emma.
const QD_X = [1190, 1450, 1710];
const QD_CUT = [13.4, 13.8], QD_POP = [13.6, 14.0, 14.4];
kit.scene('quaderno', {
  init(kit) {
    const P = window.PZ;
    let s = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<rect x="0" y="820" width="1920" height="260" fill="#A9744F"/><rect x="0" y="800" width="1920" height="30" fill="#8A5A3C"/>' +
      // Il quaderno: la pagina di ieri e quella di oggi.
      '<g class="qd-q"><rect x="250" y="190" width="680" height="600" rx="14" fill="#E2D6BF"/>' +
      '<g class="qd-p1" style="transform-origin:260px 490px"><rect x="260" y="180" width="660" height="600" rx="10" fill="#FFFDF6" stroke="#E2D6BF" stroke-width="3"/>' +
      '<path d="M300 300 L880 300 M300 380 L880 380 M300 460 L880 460 M300 540 L880 540 M300 620 L880 620 M300 700 L880 700" stroke="#E8DFCB" stroke-width="2"/>' +
      '<text x="310" y="270" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="#2E2A26">Esperimento 1</text>' +
      '<text x="310" y="365" font-family="Fredoka, sans-serif" font-size="46" fill="#2E2A26">Al mare Emma nuota.</text>' +
      '<path d="M360 640 C420 600 470 560 520 520 C580 470 640 470 720 430" stroke="#2864DC" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="360" cy="640" r="12" fill="#BC937F"/><circle cx="720" cy="430" r="12" fill="#2864DC"/></g>' +
      '<g class="qd-p2" style="transform-origin:260px 490px"><rect x="260" y="180" width="660" height="600" rx="10" fill="#FFFDF6" stroke="#E2D6BF" stroke-width="3"/>' +
      '<path d="M300 300 L880 300 M300 380 L880 380 M300 460 L880 460 M300 540 L880 540 M300 620 L880 620 M300 700 L880 700" stroke="#E8DFCB" stroke-width="2"/>' +
      '<text x="310" y="270" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="#2E2A26">Esperimento 2</text>' +
      '<text class="qd-scritto" x="310" y="365" font-family="Fredoka, sans-serif" font-size="46" fill="#2E2A26"></text>' +
      '<rect class="qd-cur" x="310" y="328" width="5" height="44" fill="#2E2A26"/></g></g>' +
      // Lo Spezzaparole, piccolo, a destra.
      '<g class="qd-nastro"><rect x="0" y="-26" width="300" height="52" rx="6" fill="#F6E7C8" stroke="#C8B48F" stroke-width="2"/><text x="20" y="10" font-family="JetBrains Mono, monospace" font-size="28" fill="#5C5348">Al parco Emma</text></g>' +
      '<g class="qd-mac" style="transform-origin:1450px 420px"><g transform="translate(1250 190) scale(1.3)"><rect x="40" y="62" width="120" height="100" rx="16" fill="#6D7A8F" stroke="#3E4A66" stroke-width="4"/><rect x="34" y="98" width="12" height="30" rx="4" fill="#3E4A66"/>' +
      '<circle cx="82" cy="98" r="11" fill="#FFFFFF"/><circle cx="118" cy="98" r="11" fill="#FFFFFF"/><circle cx="84" cy="100" r="5" fill="#2E2A26"/><circle cx="120" cy="100" r="5" fill="#2E2A26"/>' +
      '<path d="M78 132 L122 132 M78 140 L122 140" stroke="#3E4A66" stroke-width="4" stroke-linecap="round"/><circle cx="140" cy="40" r="11" fill="none" stroke="#E8743B" stroke-width="6"/><circle cx="140" cy="76" r="11" fill="none" stroke="#E8743B" stroke-width="6"/>' +
      '<path class="qd-l1" d="M150 46 L222 74" stroke="#D9DDE6" stroke-width="7" stroke-linecap="round"/><path class="qd-l2" d="M150 70 L222 42" stroke="#D9DDE6" stroke-width="7" stroke-linecap="round"/><circle cx="181" cy="58" r="4" fill="#3E4A66"/></g></g>';
    QD_X.forEach((x, j) => {
      const nome = ['Al', 'parco', 'Emma'][j], tw = 36 + nome.length * 21;
      const pers = j === 0 ? '<g transform="translate(' + (x - 80) + ' 687) scale(.8)">' + P.al() + '</g>' : j === 1 ? '<g transform="translate(' + (x - 80) + ' 659) scale(.8)">' + P.parco() + '</g>' : '<g transform="translate(' + (x - 60) + ' 620) scale(.65)">' + P.emma('#C9C2D6') + '</g>';
      s += '<g class="qd-pers" style="transform-origin:' + x + 'px 820px">' + pers + '</g>' +
        '<g class="qd-tile"><rect x="' + (-tw / 2) + '" y="-31" width="' + tw + '" height="62" rx="8" fill="#F6E7C8" stroke="#C8B48F" stroke-width="2"/><text x="0" y="12" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="34" fill="#2E2A26">' + nome + '</text></g>';
    });
    s += '</svg>';
    kit.stage.append(kit.h('<div class="ground"><div class="carta"></div>' + s +
      '<div class="words qd-tit" style="left:0;top:380px;width:1920px;align-items:center;text-align:center"><h1 class="line" style="font-size:112px">Il pozzo delle parole</h1><p class="sub">Episodio 2 · Al parco Emma</p></div>' +
      P.sott('ADA', 'Ieri: «Al mare Emma nuota». Oggi cambio una parola sola.') +
      P.sott('NARRATORE', 'Stessa bambina, stesso pozzo. Solo una parola diversa.') + '</div>'));
    const q = c => kit.stage.querySelector(c), all = c => [...kit.stage.querySelectorAll(c)];
    this.tit = q('.qd-tit').style; this.line = q('.qd-tit .line'); this.qq = q('.qd-q');
    this.p1 = q('.qd-p1').style; this.p2 = q('.qd-p2').style; this.scritto = q('.qd-scritto'); this.cur = q('.qd-cur');
    this.nastro = q('.qd-nastro'); this.mac = q('.qd-mac').style; this.l1 = q('.qd-l1'); this.l2 = q('.qd-l2');
    this.tile = all('.qd-tile'); this.pers = all('.qd-pers');
    this.typed = kit.typist('Al parco Emma', 9.8, 8);
    this.sub = window.PZ.subs(kit, [[3.8, 8.8], [14.6, 19.4]]);
  },
  render(t) {
    TextFx.fadeFromRight(this.line, t, -0.6);
    this.tit.opacity = 1 - eio(seg(t, 3.0, 3.6));
    this.qq.setAttribute('opacity', eo(seg(t, 3.2, 3.9)).toFixed(2));
    // La pagina si gira.
    const f1 = seg(t, 8.8, 9.2), f2 = seg(t, 9.2, 9.6);
    this.p1.transform = 'scaleX(' + (1 - eio(f1)).toFixed(3) + ')'; this.p1.opacity = f1 >= 1 ? 0 : 1;
    this.p2.transform = 'scaleX(' + eio(f2).toFixed(3) + ')'; this.p2.opacity = f2 > 0 ? 1 : 0;
    const txt = this.typed.at(t);
    this.scritto.textContent = txt;
    this.cur.setAttribute('x', (316 + txt.length * 23.5).toFixed(1));
    this.cur.setAttribute('opacity', t < 9.6 || t > 13 ? 0 : (Math.floor(t / 0.5) % 2 ? 0.2 : 1));
    // Il nastro va nello Spezzaparole, tre pezzi prendono vita.
    this.nastro.setAttribute('transform', 'translate(' + lerp(600, 1160, eio(seg(t, 11.6, 13.2))).toFixed(1) + ' ' + lerp(560, 330, eio(seg(t, 11.6, 13.2))).toFixed(1) + ')');
    this.nastro.setAttribute('opacity', (seg(t, 11.5, 11.8) * (1 - seg(t, 13.1, 13.3))).toFixed(2));
    let snip = 0;
    QD_CUT.forEach(c => { snip = Math.max(snip, Math.sin(Math.PI * seg(t, c - 0.15, c + 0.25))); });
    this.l1.setAttribute('transform', 'rotate(' + (-14 * snip).toFixed(2) + ' 181 58)');
    this.l2.setAttribute('transform', 'rotate(' + (14 * snip).toFixed(2) + ' 181 58)');
    this.mac.transform = 'scale(' + (1 + 0.02 * snip) + ',' + (1 - 0.03 * snip) + ')';
    QD_X.forEach((X, j) => {
      const p = seg(t, QD_POP[j], QD_POP[j] + 0.55), vive = seg(t, 15.0 + j * 0.15, 15.6 + j * 0.15);
      const x = lerp(1450, X, eo(p)), y = lerp(470, 700, eo(p)) - 70 * Math.sin(Math.PI * p);
      this.tile[j].setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + ((p <= 0 ? 0 : eob(p, 1.7)) * (1 - eo(vive))).toFixed(3) + ')');
      this.pers[j].style.transform = 'scale(' + (eob(seg(t, 15.2 + j * 0.15, 16.0 + j * 0.15), 1.6) * (1 + 0.01 * Math.sin(t * 2 + j))).toFixed(3) + ')';
    });
    this.sub(t);
  },
});
