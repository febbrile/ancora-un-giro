const { seg, eo, ei, eio, eob, lerp } = kit;
// 2.7 · Il secchio e la pesca: un secchio di palline verdi; Ada pesca «corre»; Emma corre sul prato.
const PE_SLOT = [[88,162],[104,162],[120,162],[136,162],[152,162],[80,146],[96,146],[112,146],[128,146],[144,146],[160,146],[78,130],[94,130],[110,130],[126,130],[142,130],[158,130],[100,114],[116,114],[132,114]];
const PE_B = '#2E9E4F', PE_G = '#28C1C1', PE_O = '#7BC96F', PE_S = '#9BD39B', PE_C = '#6FBF8A', PE_R = '#3379E5', PE_X = '#8A90A8';
const PE_PALLE = [PE_B, PE_B, PE_G, PE_B, PE_O, PE_B, PE_G, PE_B, PE_S, PE_B, PE_R, PE_G, PE_B, PE_C, PE_B, PE_X, PE_G, PE_O, PE_B, PE_X];
const PE_BAR = [['corre', 44, PE_B], ['gioca', 19, PE_G], ['foglie', 9, PE_O], ['altalena', 8, PE_S], ['scivolo', 6, PE_C], ['nuota', 5, PE_R], ['Bovary', 1.0, '#E3A58E']];
function peSecchio(cls, palle, k) {
  return '<g class="' + cls + '"><g transform="scale(' + k + ')"><path d="M60 52 Q120 -6 180 52" stroke="#8C8F99" stroke-width="4" fill="none"/>' + palle +
    '<path d="M60 52 L180 52 L168 172 Q120 182 72 172 Z" fill="#BFD7FF" fill-opacity=".16" stroke="#CFE0FF" stroke-width="3"/><path d="M70 62 L80 164" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity=".3"/></g></g>';
}
const PE_ONDA = 'M-200 0 C-120 -34 -40 -34 40 0 S200 34 280 0 S440 -34 520 0 S680 34 760 0 S920 -34 1000 0 S1160 34 1240 0 S1400 -34 1480 0 S1640 34 1720 0 S1880 -34 1960 0 S2120 34 2200 0 S2360 -34 2440 0 S2600 34 2680 0 L2680 400 L-200 400 Z';
kit.scene('pesca', {
  init(kit) {
    const P = window.PZ;
    // A · la pioggia di palline e il secchio che risale.
    let palle = ''; PE_SLOT.forEach(() => { palle += '<circle class="pe-p" r="8"/>'; });
    let barre = '';
    PE_BAR.forEach(([w, v, c], i) => {
      const y = 400 + i * 46;
      barre += '<text x="1330" y="' + (y + 16) + '" font-family="JetBrains Mono, monospace" font-size="20" fill="#9BE7C4">' + w + '</text>' +
        '<rect class="pe-bar" x="1470" y="' + y + '" width="' + Math.max(4, v * 6.4).toFixed(0) + '" height="22" rx="4" fill="' + c + '"/>' +
        '<text class="pe-v" x="' + (1480 + Math.max(4, v * 6.4)).toFixed(0) + '" y="' + (y + 17) + '" font-family="JetBrains Mono, monospace" font-size="18" fill="#E6FFF4">' + v + '%</text>';
    });
    let gocce = ''; for (let k = 0; k < 14; k++) gocce += '<circle class="pe-g" r="6" fill="#8FB6FF"/>';
    const a = '<g class="pe-A"><defs><radialGradient id="pe-buio" cx=".5" cy=".2" r=".8"><stop offset="0" stop-color="#16306A"/><stop offset="1" stop-color="#070912"/></radialGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#pe-buio)"/><rect y="860" width="1920" height="220" fill="#0F1A3A"/>' +
      '<ellipse cx="960" cy="60" rx="700" ry="120" fill="#398BE9" opacity=".25" filter="url(#pz-soft)"/>' + gocce +
      '<line class="pe-corda" x1="960" y1="-20" x2="960" y2="360" stroke="#C9973F" stroke-width="5"/>' +
      '<g class="pe-sa"><g transform="translate(720 380)">' + peSecchio('pe-s1', '<g class="pe-palle">' + palle + '</g>', 2) + '</g></g>' +
      '<g class="pe-mon"><rect x="1300" y="300" width="580" height="440" rx="18" fill="#0F2A2A" stroke="#C9973F" stroke-width="7"/>' +
      '<text x="1330" y="350" font-family="JetBrains Mono, monospace" font-size="18" letter-spacing="1.5" fill="#5FB89A">SECCHIO · SOFTMAX · T = 1</text>' + barre + '</g></g>';
    // B · il laboratorio: il confine del modello e la pesca.
    let palle2 = ''; PE_SLOT.forEach((s, i) => { palle2 += '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="8" fill="' + PE_PALLE[i] + '"/>'; });
    const b = '<g class="pe-B"><rect width="1920" height="1080" fill="#F3EADB"/>' +
      '<rect x="0" y="0" width="760" height="300" fill="#141A33"/><circle cx="660" cy="58" r="26" fill="#FFF1C9"/><circle cx="670" cy="52" r="24" fill="#141A33"/>' +
      '<rect x="0" y="300" width="760" height="780" fill="#2A211C"/><path d="M0 300 Q190 290 380 300 T760 300 L760 314 L0 314 Z" fill="#2F5D3A"/>' +
      '<rect x="230" y="300" width="300" height="780" fill="#0B0E1C"/><rect x="200" y="300" width="30" height="780" fill="#3E4A66"/><rect x="530" y="300" width="30" height="780" fill="#3E4A66"/>' +
      '<ellipse cx="380" cy="520" rx="110" ry="26" fill="#67A96F" opacity=".3" filter="url(#pz-soft)"/><ellipse cx="380" cy="720" rx="120" ry="28" fill="#2FAD57" opacity=".32" filter="url(#pz-soft)"/><ellipse cx="380" cy="1060" rx="180" ry="70" fill="#28AA50" opacity=".6" filter="url(#pz-soft)"/>' +
      '<rect x="180" y="272" width="400" height="40" rx="10" fill="#5B6B8C" stroke="#3E4A66" stroke-width="4"/><rect x="196" y="110" width="16" height="164" fill="#8A5A3C"/><rect x="548" y="110" width="16" height="164" fill="#8A5A3C"/><rect x="180" y="98" width="400" height="22" rx="4" fill="#8A5A3C"/><circle cx="380" cy="146" r="26" fill="#C9973F" stroke="#7A5A24" stroke-width="4"/>' +
      '<rect x="760" y="760" width="1160" height="320" fill="#C9A27A"/>' +
      '<g class="pe-mon2"><rect x="1250" y="110" width="630" height="150" rx="16" fill="#0F2A2A" stroke="#2F6F73" stroke-width="6"/>' +
      '<text x="1300" y="195" font-family="JetBrains Mono, monospace" font-size="28" fill="#E6FFF4">corre 44% · gioca 19% · foglie 9%</text></g>' +
      '<g transform="rotate(-3 1545 400)"><rect x="1420" y="330" width="280" height="140" rx="4" fill="#FFFDF6" stroke="#E2D6BF" stroke-width="2"/><circle cx="1560" cy="342" r="6" fill="#E8743B"/>' +
      '<text x="1440" y="380" font-family="Fredoka, sans-serif" font-weight="600" font-size="20" fill="#2E2A26">Quaderno di Ada</text><text class="pe-nota" x="1440" y="420" font-family="Fredoka, sans-serif" font-size="23" fill="#2E2A26">Al parco Emma ___</text></g>' +
      '<g transform="translate(1100 300) scale(1.5)">' + P.ada('mani', 'felice') + '</g>' +
      '<rect x="780" y="700" width="1120" height="34" rx="4" fill="#8A5A3C"/><rect x="800" y="734" width="1080" height="300" fill="#A9744F"/>' +
      '<path d="M404 140 C560 128 800 300 968 466" stroke="#C9973F" stroke-width="4" fill="none"/>' +
      '<g class="pe-sb">' + peSecchio('pe-s2', palle2, 1.4) + '</g>' +
      '<g class="pe-palla"><circle r="16" fill="' + PE_B + '"/><ellipse cx="-5" cy="-5" rx="5" ry="3" fill="#FFFFFF" opacity=".4"/><text x="0" y="-30" text-anchor="middle" stroke="#FFFDF6" stroke-width="7" paint-order="stroke" font-family="Fredoka, sans-serif" font-weight="600" font-size="30" fill="#2E2A26">corre</text></g>' +
      '<path d="M760 0 L760 1080" stroke="#E8743B" stroke-width="4" stroke-dasharray="18 12"/>' +
      '<g transform="translate(760 54)"><rect x="-150" y="-26" width="300" height="52" rx="26" fill="#E8743B"/><text y="9" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="18" fill="#F4EEE2">← modello · fine · codice →</text></g></g>';
    // C · Emma corre sul prato.
    let alberi = '';
    for (let k = 0; k < 7; k++) { const x = 120 + k * 300; alberi += '<g transform="translate(' + x + ' 640)"><rect x="-14" y="0" width="28" height="140" fill="#5A3E2E"/><circle cx="0" cy="-30" r="90" fill="' + (k % 2 ? '#2E7A45' : '#3B8F52') + '"/></g>'; }
    const c = '<g class="pe-C"><defs><linearGradient id="pe-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1A2D5A"/><stop offset="1" stop-color="#5A7FB0"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#pe-cielo)"/><circle cx="1500" cy="200" r="54" fill="#FFF1C9"/>' +
      '<g class="pe-alberi">' + alberi + alberi.replace(/translate\((\d+) 640\)/g, (m, x) => 'translate(' + (+x + 2100) + ' 640)') + '</g>' +
      '<path d="M0 780 C500 760 1400 790 1920 770 L1920 1080 L0 1080 Z" fill="#5FA05A"/><path d="M0 840 L1920 840" stroke="#4C8F4A" stroke-width="6" stroke-dasharray="40 60" class="pe-erba"/>' +
      '<g class="pe-emma"><path d="M-160 -120 L-110 -120 M-170 -80 L-120 -80 M-160 -40 L-110 -40" stroke="#FFF4E0" stroke-width="5" stroke-linecap="round" opacity=".5"/><g transform="translate(-100 -270)">' + P.emma(P.VESTITO.parco[3], { mouth: 'o' }) + '</g></g></g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + P.defs + a + b + c + '</svg>' +
      P.sott('NARRATORE', 'Risalì un secchio pieno di palline verdi.') +
      P.sott('ADA', '«Corre», quarantaquattro per cento. Pesco… «corre». Al parco Emma corre.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.A = q('.pe-A'); this.B = q('.pe-B'); this.C = q('.pe-C');
    this.p = all('.pe-p'); this.g = all('.pe-g'); this.sa = q('.pe-sa'); this.corda = q('.pe-corda'); this.mon = q('.pe-mon');
    this.bar = all('.pe-bar'); this.v = all('.pe-v');
    this.r = kit.rng(4); this.gx = this.g.map(() => 860 + this.r() * 200);
    this.sb = q('.pe-sb'); this.palla = q('.pe-palla'); this.nota = q('.pe-nota'); this.mon2 = q('.pe-mon2');
    this.emma = q('.pe-emma'); this.alberi = q('.pe-alberi'); this.erba = q('.pe-erba');
    this.sub = window.PZ.subs(kit, [[0.3, 3.9], [8.4, 15.2]]);
  },
  render(t) {
    const ab = eio(seg(t, 4.4, 5.0)), bc = eio(seg(t, 16.4, 17.0));
    this.A.setAttribute('opacity', (1 - ab).toFixed(3));
    this.B.setAttribute('opacity', (ab * (1 - bc)).toFixed(3));
    this.C.setAttribute('opacity', bc.toFixed(3));
    // A
    PE_SLOT.forEach((b, k) => {
      const t0 = 0.3 + k * 0.1, p = seg(t, t0, t0 + 0.45);
      const y = lerp(-260, b[1], ei(p)) - (p >= 1 ? 4 * Math.sin(Math.PI * seg(t, t0 + 0.55, t0 + 0.75)) : 0);
      this.p[k].setAttribute('cx', b[0]); this.p[k].setAttribute('cy', y.toFixed(1));
      this.p[k].setAttribute('fill', PE_PALLE[k]);
      this.p[k].setAttribute('opacity', p > 0 ? 1 : 0);
    });
    this.g.forEach((c, k) => {
      const ph = ((t * 0.9 + k * 0.37) % 1.2) / 1.2, on = seg(t, 0.4, 0.8) * (1 - seg(t, 4.4, 5.0));
      c.setAttribute('cx', this.gx[k].toFixed(1)); c.setAttribute('cy', (80 + ph * 420).toFixed(1));
      c.setAttribute('opacity', (on * (1 - ph) * 0.8).toFixed(2));
    });
    const up = ei(seg(t, 3.0, 4.6));
    this.sa.setAttribute('transform', 'translate(0 ' + (-up * 900).toFixed(1) + ') rotate(' + (2 * Math.sin(t * 2.2) * seg(t, 7.0, 7.4)).toFixed(2) + ' 960 480)');
    this.corda.setAttribute('y2', (360 - up * 900).toFixed(1));
    this.corda.setAttribute('opacity', eo(seg(t, 2.6, 3.0)).toFixed(2));
    this.mon.setAttribute('opacity', eo(seg(t, 1.6, 2.0)).toFixed(2));
    this.bar.forEach((b, i) => { b.setAttribute('transform', 'translate(1470 0) scale(' + eo(seg(t, 1.8 + i * 0.1, 2.3 + i * 0.1)).toFixed(3) + ' 1) translate(-1470 0)'); });
    this.v.forEach((v, i) => v.setAttribute('opacity', eo(seg(t, 2.2 + i * 0.1, 2.6 + i * 0.1)).toFixed(2)));
    // B
    const arr = eo(seg(t, 5.0, 6.2));
    this.sb.setAttribute('transform', 'translate(800 ' + lerp(-300, 456, arr).toFixed(1) + ')');
    this.mon2.setAttribute('opacity', eo(seg(t, 6.4, 7.0)).toFixed(2));
    const pp = seg(t, 12.0, 12.8), back = seg(t, 15.6, 16.1);
    const x = lerp(970, 1150, eo(pp)), y = lerp(600, 560, eo(pp)) - 120 * Math.sin(Math.PI * pp);
    this.palla.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (pp <= 0 ? 0 : eob(pp, 1.6) * (1 - back)).toFixed(3) + ')');
    this.nota.textContent = t >= 14.4 ? 'Al parco Emma corre.' : 'Al parco Emma ___';
    // C: il prato scorre, Emma corre.
    this.alberi.setAttribute('transform', 'translate(' + (-((t * 160) % 2100)).toFixed(1) + ' 0)');
    this.erba.setAttribute('stroke-dashoffset', (t * 300 % 100).toFixed(1));
    const run = Math.abs(Math.sin(t * 7));
    this.emma.setAttribute('transform', 'translate(' + (960 + 40 * Math.sin(t * 0.7)).toFixed(1) + ' ' + (800 - 26 * run).toFixed(1) + ') rotate(' + (6 - 4 * run).toFixed(2) + ')');
    this.sub(t);
  },
});
