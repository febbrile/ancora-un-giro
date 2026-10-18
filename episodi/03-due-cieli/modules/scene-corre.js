const { seg, eo, ei, eio, eob, lerp } = kit;
const CO_BELL = [['nuota', 1.18], ['foglie', 1.63], ['corre', 3.28], ['gioca', 2.45], ['altalena', 1.58], ['Bovary', -1.65]];
const CO_SLOT = [[88,162],[104,162],[120,162],[136,162],[152,162],[80,146],[96,146],[112,146],[128,146],[144,146],[160,146],[78,130],[94,130],[110,130],[126,130],[142,130],[158,130],[100,114],[116,114],[132,114]];
const Gr = '#33E57F', Gi = '#28C1C1', Fo = '#ABF670', Al = '#ADF29E', Nu = '#3379E5', Xx = '#8A90A8';
const CO_COL = [Gr,Gr,Gi,Gr,Fo, Gr,Gi,Gr,Al,Gr,Nu, Gi,Gr,Fo,Gr,Xx,Gi, Al,Gr,Xx];
const CO_BARS = [['corre', 45, Gr], ['gioca', 20, Gi], ['foglie', 9, Fo], ['altalena', 8, Al], ['nuota', 5, Nu]];
kit.scene('corre', {
  init(kit) {
    const P = window.PZ;
    let bells = '';
    CO_BELL.forEach(([w, v], i) => {
      const x = 360 + i * 240, y = 200 + Math.pow((x - 960) / 700, 2) * 120;
      bells += '<g transform="translate(' + x + ' ' + y.toFixed(0) + ')"><ellipse class="co-glow" cy="30" rx="90" ry="80" fill="#39E98B" opacity="0" filter="url(#pz-soft)"/>' +
        '<path d="M-34 64 L-27 8 C-24 -20 24 -20 27 8 L34 64 Q0 76 -34 64 Z" fill="#5B6B8C" stroke="#3E4A66" stroke-width="3"/><path class="co-luce" d="M-34 64 L-27 8 C-24 -20 24 -20 27 8 L34 64 Q0 76 -34 64 Z" fill="#39E98B" opacity="0"/>' +
        '<text y="112" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="28" fill="#F4EEE2">' + w + '</text><text y="142" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="20" fill="#9BE7C4">' + v.toFixed(2) + '</text></g>';
    });
    let palle = ''; CO_SLOT.forEach((s, i) => { palle += '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="8" fill="' + CO_COL[i] + '"/>'; });
    let barre = '';
    CO_BARS.forEach(([w, v, c], i) => { const y = 200 + i * 40; barre += '<text x="1524" y="' + (y + 15) + '" font-family="JetBrains Mono, monospace" font-size="16" fill="#9BE7C4">' + w + '</text><rect class="co-bar" x="1640" y="' + y + '" width="' + (v * 4.4).toFixed(0) + '" height="20" rx="4" fill="' + c + '"/><text x="' + (1648 + v * 4.4).toFixed(0) + '" y="' + (y + 15) + '" font-family="JetBrains Mono, monospace" font-size="14" fill="#E6FFF4">' + v + '%</text>'; });
    kit.stage.append(kit.h('<div class="ground">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<g class="co-a"><rect width="1920" height="1080" fill="#08160F"/><ellipse cx="960" cy="760" rx="900" ry="400" fill="#1E5A3A" opacity=".5" filter="url(#pz-soft)"/><rect y="860" width="1920" height="220" fill="#0F2A1E"/>' + bells +
      '<g class="co-tir"><g transform="rotate(-75)"><g transform="translate(-130 -200) scale(.85)">' + P.emmaTirata('#39E98B') + '</g></g></g></g>' +
      '<g class="co-b"><rect width="1920" height="1080" fill="#F3EADB"/><rect y="760" width="1920" height="320" fill="#C9A27A"/>' +
      '<rect x="1500" y="120" width="380" height="300" rx="16" fill="#0F2A2A" stroke="#2F6F73" stroke-width="6"/><text x="1524" y="160" font-family="JetBrains Mono, monospace" font-size="17" fill="#5FB89A">SECCHIO · AL PARCO</text>' + barre +
      '<g transform="rotate(-3 1335 220)"><rect x="1230" y="150" width="240" height="160" rx="4" fill="#FFFDF6" stroke="#E2D6BF" stroke-width="2"/><circle cx="1350" cy="162" r="6" fill="#E8743B"/>' +
      '<text x="1250" y="200" font-family="Fredoka, sans-serif" font-weight="600" font-size="20" fill="#2E2A26">Esperimento 2</text><text class="co-nota" x="1250" y="240" font-family="Fredoka, sans-serif" font-size="21" fill="#2E2A26">Al parco Emma ___</text>' +
      '<text x="1250" y="280" font-family="Fredoka, sans-serif" font-size="18" fill="#7A6F60">(al mare: nuota)</text></g>' +
      '<g transform="translate(1000 270) scale(1.5)">' + P.ada('mani', 'felice') + '</g>' +
      '<rect x="780" y="700" width="1120" height="34" rx="4" fill="#8A5A3C"/><rect x="800" y="734" width="1080" height="300" fill="#A9744F"/>' +
      '<g transform="translate(800 456) scale(1.4)"><path d="M60 52 Q120 -6 180 52" stroke="#8C8F99" stroke-width="4" fill="none"/>' + palle + '<path d="M60 52 L180 52 L168 172 Q120 182 72 172 Z" fill="#BFD7FF" fill-opacity=".2" stroke="#7C9CC9" stroke-width="3"/></g>' +
      '<g class="co-palla"><circle r="16" fill="#33E57F"/><text x="0" y="-30" text-anchor="middle" stroke="#FFFDF6" stroke-width="7" paint-order="stroke" font-family="Fredoka, sans-serif" font-weight="600" font-size="30" fill="#2E2A26">corre</text></g></g>' +
      '</svg>' +
      P.sott('NARRATORE', 'Sul fondo, questa volta, suona più forte la campana «corre».') +
      P.sott('ADA', 'Corre quarantacinque per cento, gioca venti: come al mare, ma al posto di «nuota». Pesco… «corre». Al parco Emma corre.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.a = q('.co-a'); this.b = q('.co-b'); this.glow = all('.co-glow'); this.luce = all('.co-luce'); this.tir = q('.co-tir');
    this.palla = q('.co-palla'); this.nota = q('.co-nota'); this.bar = all('.co-bar');
    this.sub = window.PZ.subs(kit, [[0.4, 4.8], [5.2, 11.7]]);
  },
  render(t) {
    const x = eio(seg(t, 4.6, 5.2));
    this.a.setAttribute('opacity', (1 - x).toFixed(2)); this.b.setAttribute('opacity', x.toFixed(2));
    const ring = eo(seg(t, 0.6, 1.6));
    CO_BELL.forEach(([w, v], i) => { let k = Math.max(0, (v + 1.65) / (3.28 + 1.65)); k *= k; const lvl = ring * k * (0.7 + 0.3 * Math.sin(t * 6 + i)); this.glow[i].setAttribute('opacity', (0.9 * lvl).toFixed(2)); this.luce[i].setAttribute('opacity', (0.75 * ring * k).toFixed(2)); });
    const pull = seg(t, 1.6, 4.4), pp = ei(pull) * 0.3 + eo(pull) * 0.7;
    this.tir.setAttribute('transform', 'translate(' + lerp(960, 900, pp).toFixed(1) + ' ' + lerp(860, 560, pp).toFixed(1) + ')');
    this.bar.forEach((b, i) => b.setAttribute('transform', 'translate(1640 0) scale(' + eo(seg(t, 5.6 + i * 0.12, 6.2 + i * 0.12)).toFixed(3) + ' 1) translate(-1640 0)'));
    const p = seg(t, 8.4, 9.2);
    this.palla.setAttribute('transform', 'translate(' + lerp(970, 1070, eo(p)).toFixed(1) + ' ' + (lerp(600, 400, eo(p)) - 60 * Math.sin(Math.PI * p)).toFixed(1) + ') scale(' + (p <= 0 ? 0 : eob(p, 1.6)).toFixed(3) + ')');
    this.nota.textContent = t >= 9.6 ? 'Al parco Emma corre.' : 'Al parco Emma ___';
    this.sub(t);
  },
});
