const { seg, eo, ei, eio, eob, lerp } = kit;
// 1.10 · Il secchio e la pesca: le campane diventano palline, il secchio risale, fuori dal pozzo Ada pesca «nuota».
const PE_SLOT = [[88,162],[104,162],[120,162],[136,162],[152,162],[80,146],[96,146],[112,146],[128,146],[144,146],[160,146],[78,130],[94,130],[110,130],[126,130],[142,130],[158,130],[100,114],[116,114],[132,114]];
const PE_B = '#3379E5', PE_G = '#28C1C1', PE_O = '#AB70F6', PE_S = '#B09FF0', PE_C = '#B57FF3', PE_R = '#33E57F', PE_X = '#8A90A8';
const PE_PALLE = [PE_B, PE_B, PE_G, PE_B, PE_O, PE_B, PE_G, PE_B, PE_S, PE_B, PE_R, PE_G, PE_B, PE_C, PE_B, PE_X, PE_G, PE_O, PE_B, PE_X];
const PE_BAR = [['nuota', 45, PE_B], ['gioca', 19, PE_G], ['onde', 9, PE_O], ['conchiglie', 7, PE_C], ['sabbia', 6, PE_S], ['corre', 6, PE_R], ['Bovary', 1.1, '#E3A58E']];
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
      '<ellipse cx="380" cy="520" rx="110" ry="26" fill="#728EBE" opacity=".3" filter="url(#pz-soft)"/><ellipse cx="380" cy="720" rx="120" ry="28" fill="#306EDD" opacity=".32" filter="url(#pz-soft)"/><ellipse cx="380" cy="1060" rx="180" ry="70" fill="#2864DC" opacity=".6" filter="url(#pz-soft)"/>' +
      '<rect x="180" y="272" width="400" height="40" rx="10" fill="#5B6B8C" stroke="#3E4A66" stroke-width="4"/><rect x="196" y="110" width="16" height="164" fill="#8A5A3C"/><rect x="548" y="110" width="16" height="164" fill="#8A5A3C"/><rect x="180" y="98" width="400" height="22" rx="4" fill="#8A5A3C"/><circle cx="380" cy="146" r="26" fill="#C9973F" stroke="#7A5A24" stroke-width="4"/>' +
      '<rect x="760" y="760" width="1160" height="320" fill="#C9A27A"/>' +
      '<g class="pe-mon2"><rect x="1250" y="110" width="630" height="150" rx="16" fill="#0F2A2A" stroke="#2F6F73" stroke-width="6"/>' +
      '<text x="1280" y="168" font-family="JetBrains Mono, monospace" font-size="24" fill="#E6FFF4">softmax: nuota 45% · gioca 19% · onde 9%</text>' +
      '<text x="1280" y="218" font-family="JetBrains Mono, monospace" font-size="24" fill="#9BE7C4">Campionamento: fuori dal modello</text></g>' +
      '<g transform="rotate(-3 1545 400)"><rect x="1420" y="330" width="280" height="140" rx="4" fill="#FFFDF6" stroke="#E2D6BF" stroke-width="2"/><circle cx="1560" cy="342" r="6" fill="#E8743B"/>' +
      '<text x="1440" y="380" font-family="Fredoka, sans-serif" font-weight="600" font-size="20" fill="#2E2A26">Quaderno di Ada</text><text class="pe-nota" x="1440" y="420" font-family="Fredoka, sans-serif" font-size="23" fill="#2E2A26">Al mare Emma ___</text></g>' +
      '<g transform="translate(1100 300) scale(1.5)">' + P.ada('mani', 'felice') + '</g>' +
      '<rect x="780" y="700" width="1120" height="34" rx="4" fill="#8A5A3C"/><rect x="800" y="734" width="1080" height="300" fill="#A9744F"/>' +
      '<path d="M404 140 C560 128 800 300 968 466" stroke="#C9973F" stroke-width="4" fill="none"/>' +
      '<g class="pe-sb">' + peSecchio('pe-s2', palle2, 1.4) + '</g>' +
      '<g class="pe-palla"><circle r="16" fill="' + PE_B + '"/><ellipse cx="-5" cy="-5" rx="5" ry="3" fill="#FFFFFF" opacity=".4"/><text x="0" y="-30" text-anchor="middle" stroke="#FFFDF6" stroke-width="7" paint-order="stroke" font-family="Fredoka, sans-serif" font-weight="600" font-size="30" fill="#2E2A26">nuota</text></g>' +
      '<path d="M760 0 L760 1080" stroke="#E8743B" stroke-width="4" stroke-dasharray="18 12"/>' +
      '<g transform="translate(760 54)"><rect x="-150" y="-26" width="300" height="52" rx="26" fill="#E8743B"/><text y="9" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="18" fill="#F4EEE2">← modello · fine · codice →</text></g></g>';
    // C · Emma nuota tra le onde.
    const c = '<g class="pe-C"><defs><linearGradient id="pe-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#2B3F86"/></linearGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#pe-cielo)"/><circle cx="1500" cy="200" r="120" fill="#FFF1C9" opacity=".18" filter="url(#pz-soft)"/><circle cx="1500" cy="200" r="54" fill="#FFF1C9"/>' +
      '<g class="pe-o1"><path d="' + PE_ONDA + '" transform="translate(0 560)" fill="#2D56B8"/></g>' +
      '<g class="pe-emma"><g transform="translate(-110 -170) scale(1.1)">' + P.emma(P.VESTITO.mare[3], { mouth: 'o' }) + '</g></g>' +
      '<g class="pe-o2"><path d="' + PE_ONDA + '" transform="translate(0 700)" fill="#2864DC" opacity=".92"/><path d="M200 720 Q300 700 400 720 M900 730 Q1000 710 1100 730 M1500 725 Q1600 705 1700 725" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" fill="none" opacity=".5"/></g>' +
      '<g class="pe-o3"><path d="' + PE_ONDA + '" transform="translate(0 860)" fill="#1D45A6"/></g></g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + P.defs + a + b + c + '</svg>' +
      P.sott('NARRATORE', 'Le campane diventarono una pioggia di palline, e un secchio risalì lungo il pozzo. Il pozzo non aveva scelto niente. A pescare è Ada, che sta fuori.') +
      P.sott('ADA', 'Pesco… «nuota». Al mare Emma nuota.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.A = q('.pe-A'); this.B = q('.pe-B'); this.C = q('.pe-C');
    this.p = all('.pe-p'); this.g = all('.pe-g'); this.sa = q('.pe-sa'); this.corda = q('.pe-corda'); this.mon = q('.pe-mon');
    this.bar = all('.pe-bar'); this.v = all('.pe-v');
    this.r = kit.rng(4); this.gx = this.g.map(() => 860 + this.r() * 200);
    this.sb = q('.pe-sb'); this.palla = q('.pe-palla'); this.nota = q('.pe-nota'); this.mon2 = q('.pe-mon2');
    this.emma = q('.pe-emma'); this.o1 = q('.pe-o1'); this.o2 = q('.pe-o2'); this.o3 = q('.pe-o3');
    this.sub = window.PZ.subs(kit, [[0.4, 14.6], [17.8, 22.0]]);
  },
  render(t) {
    const ab = eio(seg(t, 9.4, 10.0)), bc = eio(seg(t, 25.4, 26.2));
    this.A.setAttribute('opacity', (1 - ab).toFixed(3));
    this.B.setAttribute('opacity', (ab * (1 - bc)).toFixed(3));
    this.C.setAttribute('opacity', bc.toFixed(3));
    // A
    PE_SLOT.forEach((b, k) => {
      const t0 = 0.8 + k * 0.17, p = seg(t, t0, t0 + 0.55);
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
    const up = ei(seg(t, 7.0, 9.4));
    this.sa.setAttribute('transform', 'translate(0 ' + (-up * 900).toFixed(1) + ') rotate(' + (2 * Math.sin(t * 2.2) * seg(t, 7.0, 7.4)).toFixed(2) + ' 960 480)');
    this.corda.setAttribute('y2', (360 - up * 900).toFixed(1));
    this.corda.setAttribute('opacity', eo(seg(t, 6.4, 7.0)).toFixed(2));
    this.mon.setAttribute('opacity', eo(seg(t, 3.4, 4.0)).toFixed(2));
    this.bar.forEach((b, i) => { b.setAttribute('transform', 'translate(1470 0) scale(' + eo(seg(t, 3.8 + i * 0.12, 4.4 + i * 0.12)).toFixed(3) + ' 1) translate(-1470 0)'); });
    this.v.forEach((v, i) => v.setAttribute('opacity', eo(seg(t, 4.3 + i * 0.12, 4.7 + i * 0.12)).toFixed(2)));
    // B
    const arr = eo(seg(t, 10.0, 11.4));
    this.sb.setAttribute('transform', 'translate(800 ' + lerp(-300, 456, arr).toFixed(1) + ')');
    this.mon2.setAttribute('opacity', eo(seg(t, 14.8, 15.4)).toFixed(2));
    const pp = seg(t, 18.6, 19.4), back = seg(t, 23.0, 23.5);
    const x = lerp(970, 1150, eo(pp)), y = lerp(600, 560, eo(pp)) - 120 * Math.sin(Math.PI * pp);
    this.palla.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (pp <= 0 ? 0 : eob(pp, 1.6) * (1 - back)).toFixed(3) + ')');
    this.nota.textContent = t >= 21.2 ? 'Al mare Emma nuota.' : 'Al mare Emma ___';
    // C
    this.o1.setAttribute('transform', 'translate(' + (-((t * 60) % 480)).toFixed(1) + ' ' + (6 * Math.sin(t * 1.4)).toFixed(1) + ')');
    this.o2.setAttribute('transform', 'translate(' + (-((t * 90 + 200) % 480)).toFixed(1) + ' ' + (8 * Math.sin(t * 1.7 + 1)).toFixed(1) + ')');
    this.o3.setAttribute('transform', 'translate(' + (-((t * 120 + 100) % 480)).toFixed(1) + ' ' + (6 * Math.sin(t * 2.0 + 2)).toFixed(1) + ')');
    this.emma.setAttribute('transform', 'translate(' + (960 + 30 * Math.sin(t * 0.8)).toFixed(1) + ' ' + (640 + 14 * Math.sin(t * 1.7 + 1)).toFixed(1) + ') rotate(' + (5 * Math.sin(t * 1.3)).toFixed(2) + ')');
    this.sub(t);
  },
});
