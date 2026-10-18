const { seg, eo, eio, eob, lerp, TextFx } = kit;
kit.scene('riassunto', {
  init(kit) {
    const P = window.PZ;
    let blocchi = '';
    for (let r = 0; r < 14; r++) for (let side = 0; side < 2; side++) for (let c = 0; c < 2; c++) {
      const x = (side ? 1660 : 0) + c * 124 - (r % 2 ? 60 : 0);
      blocchi += '<rect x="' + x + '" y="' + (r * 92) + '" width="120" height="88" rx="10" fill="#3E4A66" stroke="#2A3350" stroke-width="4"/>';
    }
    const carta = (x, txt) => '<g transform="translate(' + x + ' 300)"><rect x="-170" y="-34" width="340" height="68" rx="8" fill="#F6E7C8" stroke="#C8B48F" stroke-width="2"/>' +
      '<text x="0" y="12" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="32" fill="#5C5348">' + txt + '</text></g>';
    kit.stage.append(kit.h('<div class="ground">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><radialGradient id="rias-buio" cx=".5" cy=".5" r=".65"><stop offset="0" stop-color="#1C2450"/><stop offset="1" stop-color="#070912"/></radialGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#rias-buio)"/><g class="rias-muri">' + blocchi + '</g>' +
      '<g class="rias-cade"><g transform="translate(-100 -160)">' + P.emmaCade('#FE8787') + '</g></g>' +
      '<g class="rias-carte">' + carta(620, 'Al mare Emma') + carta(1300, 'Al parco Emma') +
      '<text x="960" y="590" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="90" fill="#FFD978">=</text>' +
      '<g transform="translate(565 430) scale(.55)">' + P.emma('#FE8787') + '</g>' +
      '<g class="rias-dx" transform="translate(1245 430) scale(.55)">' + P.emma('#FE8787') + '</g>' +
      '<text class="rias-att" x="1300" y="640" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="22" fill="#C8CEE8">in attesa</text></g>' +
      '</svg>' +
      '<div class="words rias-tit" style="left:150px;top:330px;width:1100px"><h1 class="line" style="font-size:104px">Il pozzo delle parole</h1><p class="sub">Episodio 2 · Il primo sguardo</p></div>' +
      P.sott('NARRATORE', 'Nella puntata precedente: due frasi, una sola parola diversa. In tutte e due Emma ha lo stesso vestito, ed è caduta nel pozzo. Adesso inizia il primo piano.') + '</div>'));
    const q = s => kit.stage.querySelector(s);
    this.muri = q('.rias-muri'); this.cade = q('.rias-cade');
    this.tit = q('.rias-tit').style; this.line = q('.rias-tit .line'); this.subt = q('.rias-tit .sub').style;
    this.carte = q('.rias-carte'); this.dx = q('.rias-dx'); this.att = q('.rias-att');
    this.sub = window.PZ.subs(kit, [[3.6, 8.8]]);
  },
  render(t) {
    this.muri.setAttribute('transform', 'translate(0 ' + (-((t * 160) % 184)).toFixed(1) + ')');
    const out = eio(seg(t, 3.0, 3.6));
    TextFx.fadeFromRight(this.line, t, -0.6);
    this.subt.opacity = eo(seg(t, -0.6, 0));
    this.tit.opacity = 1 - out;
    this.cade.setAttribute('transform', 'translate(' + (1380 + 20 * Math.sin(t * 1.2)).toFixed(1) + ' ' + (520 + 12 * Math.sin(t * 2)).toFixed(1) + ') rotate(' + (6 * Math.sin(t * 1.4)).toFixed(1) + ') scale(.95)');
    this.cade.setAttribute('opacity', (1 - out).toFixed(2));
    const c = eo(seg(t, 3.5, 4.2));
    this.carte.setAttribute('opacity', c.toFixed(2));
    this.carte.setAttribute('transform', 'translate(0 ' + lerp(30, 0, c).toFixed(1) + ')');
    const d = eio(seg(t, 6.6, 7.2));
    this.dx.setAttribute('opacity', lerp(1, 0.4, d).toFixed(2));
    this.att.setAttribute('opacity', d.toFixed(2));
    this.sub(t);
  },
});
