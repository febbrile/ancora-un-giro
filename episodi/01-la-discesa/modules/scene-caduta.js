const { seg, eo, ei, eio, lerp } = kit;
const CAD_PER = 184;
kit.scene('caduta', {
  init(kit) {
    const P = window.PZ;
    let blocchi = '';
    for (let r = 0; r < 14; r++) for (let side = 0; side < 2; side++) {
      const x0 = side ? 1560 : 0;
      for (let c = 0; c < 3; c++) {
        const w = 120, x = x0 + c * 124 - (r % 2 ? 60 : 0);
        blocchi += '<rect x="' + x + '" y="' + (r * 92) + '" width="' + w + '" height="88" rx="10" fill="#3E4A66" stroke="#2A3350" stroke-width="4"/>';
      }
    }
    let luci = '';
    ['#D586DD', '#8FB6FF', '#FFD978', '#8787FE'].forEach((c, i) => { luci += '<ellipse class="caduta-luce" cx="960" rx="420" ry="60" fill="' + c + '" opacity=".14" filter="url(#pz-soft)"/>'; });
    kit.stage.append(kit.h('<div class="ground">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><radialGradient id="caduta-buio" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#1C2450"/><stop offset="1" stop-color="#070912"/></radialGradient>' +
      '<clipPath id="caduta-clip"><rect width="1920" height="1080"/></clipPath></defs>' +
      '<rect width="1920" height="1080" fill="url(#caduta-buio)"/>' + luci +
      '<g clip-path="url(#caduta-clip)"><g class="caduta-muri">' + blocchi + '</g></g>' +
      '<g class="caduta-al">' + '<g transform="translate(-100 -120)">' + P.al() + '</g></g>' +
      '<g class="caduta-mare">' + '<g transform="translate(-100 -120)">' + P.mare() + '</g></g>' +
      '<g class="caduta-emma">' + '<g transform="translate(-100 -160)">' + P.emmaCade('#FE8787') + '</g></g>' +
      '</svg>' +
      P.sott('NARRATORE', 'Il fondo dell’armadio si aprì, ed Emma cadde, cadde, cadde: giù, sempre più giù, insieme ai suoi compagni.') + '</div>'));
    const q = s => kit.stage.querySelector(s);
    this.muri = q('.caduta-muri');
    this.luci = [...kit.stage.querySelectorAll('.caduta-luce')];
    this.pers = [['.caduta-emma', 0, 1.0, 0], ['.caduta-al', 2.1, 0.7, 140], ['.caduta-mare', 4.2, 0.75, -110]].map(([s, ph, sc, spin]) => ({ g: q(s), ph, sc, spin }));
    this.sub = window.PZ.subs(kit, [[0.6, 8.2]]);
  },
  render(t) {
    const speed = lerp(300, 900, eio(seg(t, 0, 1.5)));
    const dist = t < 1.5 ? 300 * t + 200 * t * t : 300 * 1.5 + 200 * 2.25 + 900 * (t - 1.5);
    this.muri.setAttribute('transform', 'translate(0 ' + (-(dist % CAD_PER)).toFixed(1) + ')');
    this.luci.forEach((l, i) => {
      const y = 1300 - ((dist * 0.9 + i * 420) % 1700);
      l.setAttribute('cy', y.toFixed(1));
    });
    const yIn = lerp(-760, 0, eo(seg(t, 0, 1.5)));
    const yOut = lerp(0, 1000, ei(seg(t, 7.8, 9)));
    this.pers.forEach(P => {
      const th = 1.5 * t + P.ph;
      const depth = Math.sin(th);
      const x = 960 + 250 * Math.cos(th), y = 470 + 70 * depth + yIn + yOut;
      const s = P.sc * (0.85 + 0.2 * depth);
      const rot = P.spin ? P.spin * t : 10 * Math.sin(t * 1.3);
      P.g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + rot.toFixed(1) + ') scale(' + s.toFixed(3) + ')');
      P.g.setAttribute('opacity', (0.75 + 0.25 * (depth + 1) / 2).toFixed(2));
    });
    this.sub(t);
  },
});
