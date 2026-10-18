const { seg, eo, ei, eio, eob, lerp } = kit;
const SEC_B = [[88,162,'#3379E5'],[104,162,'#3379E5'],[120,162,'#28C1C1'],[136,162,'#3379E5'],[152,162,'#AB70F6'],[80,146,'#3379E5'],[96,146,'#28C1C1'],[112,146,'#3379E5'],[128,146,'#B09FF0'],[144,146,'#3379E5'],[160,146,'#33E57F'],[78,130,'#28C1C1'],[94,130,'#3379E5'],[110,130,'#B57FF3'],[126,130,'#3379E5'],[142,130,'#8A90A8'],[158,130,'#28C1C1'],[100,114,'#AB70F6'],[116,114,'#3379E5'],[132,114,'#8A90A8']];
const SEC_BAR = [['nuota', 45, '#3379E5'], ['gioca', 20, '#28C1C1'], ['onde', 9, '#AB70F6'], ['sabbia', 7, '#B09FF0'], ['conchiglie', 7, '#B57FF3'], ['corre', 6, '#33E57F'], ['stira', 0.4, '#C98A6B']];
kit.scene('secchio', {
  init(kit) {
    const P = window.PZ;
    let palle = '';
    SEC_B.forEach(b => { palle += '<circle class="sec-p" r="8" fill="' + b[2] + '"/>'; });
    let barre = '';
    SEC_BAR.forEach(([w, v, c], i) => {
      const y = 400 + i * 46;
      barre += '<text x="1330" y="' + (y + 16) + '" font-family="JetBrains Mono, monospace" font-size="20" fill="#9BE7C4">' + w + '</text>' +
        '<rect class="sec-bar" x="1470" y="' + y + '" width="' + Math.max(4, v * 6.4).toFixed(0) + '" height="22" rx="4" fill="' + c + '"/>' +
        '<text class="sec-v" x="' + (1480 + Math.max(4, v * 6.4)).toFixed(0) + '" y="' + (y + 17) + '" font-family="JetBrains Mono, monospace" font-size="18" fill="#E6FFF4">' + v + '%</text>';
    });
    let gocce = '';
    for (let k = 0; k < 14; k++) gocce += '<circle class="sec-g" r="6" fill="#8FB6FF"/>';
    kit.stage.append(kit.h('<div class="ground">' +
      '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><radialGradient id="sec-buio" cx=".5" cy=".2" r=".8"><stop offset="0" stop-color="#16306A"/><stop offset="1" stop-color="#070912"/></radialGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#sec-buio)"/><rect y="860" width="1920" height="220" fill="#0F1A3A"/>' +
      '<ellipse cx="960" cy="60" rx="700" ry="120" fill="#398BE9" opacity=".25" filter="url(#pz-soft)"/>' + gocce +
      '<line class="sec-corda" x1="960" y1="-20" x2="960" y2="360" stroke="#C9973F" stroke-width="5"/>' +
      '<g class="sec-secchio"><g transform="translate(720 380) scale(2)"><path d="M60 52 Q120 -6 180 52" stroke="#8C8F99" stroke-width="4" fill="none"/>' +
      '<g class="sec-palle">' + palle + '</g>' +
      '<path d="M60 52 L180 52 L168 172 Q120 182 72 172 Z" fill="#BFD7FF" fill-opacity=".14" stroke="#CFE0FF" stroke-width="3"/><path d="M70 62 L80 164" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity=".3"/></g></g>' +
      '<g class="sec-mon"><rect x="1300" y="300" width="580" height="440" rx="18" fill="#0F2A2A" stroke="#C9973F" stroke-width="7"/>' +
      '<text x="1330" y="350" font-family="JetBrains Mono, monospace" font-size="18" letter-spacing="1.5" fill="#5FB89A">SECCHIO · SOFTMAX · T = 1</text>' + barre + '</g>' +
      '</svg>' +
      P.sott('NARRATORE', 'Il suono delle campane diventò una pioggia di palline: più una campana suonava, più palline metteva nel secchio. Il pozzo aveva finito. Non aveva scelto nessuna parola: aveva riempito un secchio.') +
      P.sott('ADA', 'Nuota quarantacinque per cento, gioca venti. Le altre si dividono il resto. Tira su!') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.p = all('.sec-p'); this.g = all('.sec-g'); this.sec = q('.sec-secchio'); this.corda = q('.sec-corda'); this.mon = q('.sec-mon');
    this.bar = all('.sec-bar'); this.v = all('.sec-v');
    this.r = kit.rng(4); this.gx = this.g.map(() => 860 + this.r() * 200);
    this.sub = window.PZ.subs(kit, [[0.4, 8.0], [8.2, 11.7]]);
  },
  render(t) {
    SEC_B.forEach((b, k) => {
      const t0 = 0.8 + k * 0.17, p = seg(t, t0, t0 + 0.55);
      const y = lerp(-260, b[1], ei(p)) - (p >= 1 ? 4 * Math.sin(Math.PI * seg(t, t0 + 0.55, t0 + 0.75)) : 0);
      this.p[k].setAttribute('cx', b[0]); this.p[k].setAttribute('cy', y.toFixed(1));
      this.p[k].setAttribute('opacity', p > 0 ? 1 : 0);
    });
    this.g.forEach((c, k) => {
      const ph = ((t * 0.9 + k * 0.37) % 1.2) / 1.2, on = seg(t, 0.4, 0.8) * (1 - seg(t, 4.4, 5.0));
      c.setAttribute('cx', this.gx[k].toFixed(1)); c.setAttribute('cy', (80 + ph * 420).toFixed(1));
      c.setAttribute('opacity', (on * (1 - ph) * 0.8).toFixed(2));
    });
    const up = ei(seg(t, 8.6, 10.6));
    this.sec.setAttribute('transform', 'translate(0 ' + (-up * 900).toFixed(1) + ') rotate(' + (2 * Math.sin(t * 2.2) * seg(t, 8.6, 9.0)).toFixed(2) + ' 960 480)');
    this.corda.setAttribute('y2', (360 - up * 900).toFixed(1));
    this.corda.setAttribute('opacity', eo(seg(t, 7.8, 8.4)).toFixed(2));
    this.mon.setAttribute('opacity', eo(seg(t, 5.0, 5.6)).toFixed(2));
    this.bar.forEach((b, i) => { b.setAttribute('transform', 'translate(1470 0) scale(' + eo(seg(t, 5.4 + i * 0.12, 6.0 + i * 0.12)).toFixed(3) + ' 1) translate(-1470 0)'); });
    this.v.forEach((v, i) => v.setAttribute('opacity', eo(seg(t, 5.9 + i * 0.12, 6.3 + i * 0.12)).toFixed(2)));
    this.sub(t);
  },
});
