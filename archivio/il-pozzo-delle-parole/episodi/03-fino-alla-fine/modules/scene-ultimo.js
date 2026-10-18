const { seg, eo, ei, eio, eob, lerp } = kit;
// 3.4 · L'ultimo della fila: in fondo arriva Corre, e le campane suonano per lui. Ada pesca «felice».
const UL_CAM = [['corre', -2.61], ['Fine', 0.02], ['e', 1.21], ['felice', 2.75], ['.', 2.10], ['Bovary', 0.53], ['onde', -0.09], ['nuota', -1.59]];
const UL_MIN = -2.61, UL_MAX = 2.75;
const UL_Y = '#F5C84C', UL_P = '#4A4B5E', UL_E = '#F0A6B8', UL_B = '#E3A58E', UL_X = '#8A90A8';
const UL_PALLE = [UL_Y, UL_Y, UL_P, UL_Y, UL_E, UL_Y, UL_P, UL_Y, UL_P, UL_Y, UL_B, UL_P, UL_Y, UL_X, UL_Y, UL_P, UL_Y, UL_E, UL_Y, UL_X];
function ulXY(i) { const x = 260 + i * 200; return [x, 190 + Math.pow((x - 960) / 700, 2) * 130]; }
kit.scene('ultimo', {
  init(kit) {
    const P = window.PZ;
    let a = '<g class="ul-A"><defs><radialGradient id="ul-buio" cx=".5" cy=".7" r=".7"><stop offset="0" stop-color="#3A3A20"/><stop offset="1" stop-color="#070912"/></radialGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#ul-buio)"/><rect y="860" width="1920" height="220" fill="#1A1A10"/><rect x="0" y="600" width="560" height="26" rx="6" fill="#3E4A66"/>' +
      '<g transform="translate(110 600) scale(.7)">' + P.viaggiatore('Al') + '</g><g transform="translate(260 600) scale(.7)">' + P.viaggiatore('Parco') + '</g><g transform="translate(410 600) scale(.7)">' + P.viaggiatore('Emma', P.VESTITO.parco[3]) + '</g>';
    UL_CAM.forEach(([w, v], i) => {
      const [x, y] = ulXY(i);
      a += '<g class="ul-bell" transform="translate(' + x + ' ' + y + ')"><ellipse class="ul-glow" cx="0" cy="30" rx="90" ry="80" fill="#F5C84C" opacity="0" filter="url(#pz-soft)"/>' +
        '<path d="M0 -46 L0 -20" stroke="#8B93B8" stroke-width="3"/><path d="M-34 64 L-27 8 C-24 -20 24 -20 27 8 L34 64 Q0 76 -34 64 Z" fill="#5B6B8C" stroke="#3E4A66" stroke-width="3"/>' +
        '<path class="ul-luce" d="M-34 64 L-27 8 C-24 -20 24 -20 27 8 L34 64 Q0 76 -34 64 Z" fill="#F5C84C" opacity="0"/><circle cx="0" cy="72" r="7" fill="#3E4A66"/>' +
        '<text y="112" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="28" fill="#F4EEE2">' + w + '</text>' +
        '<text class="ul-lv" y="142" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="20" fill="#9BE7C4" opacity="0">' + P.fmt(v) + '</text></g>';
    });
    a += '<g class="ul-corre">' + P.viaggiatore('Corre') + '</g></g>';
    const b = '<g class="ul-B">' + P.lab({ luce: ['#F5C84C', '#F5C84C', '#F5C84C'] }) +
      '<g class="ul-mon"><rect x="1250" y="110" width="630" height="100" rx="16" fill="#0F2A2A" stroke="#C9973F" stroke-width="6"/>' +
      '<text x="1565" y="172" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="22" fill="#9BE7C4">Si usa l’ultima riga: quella dell’ultimo token</text></g>' +
      '<g transform="rotate(-3 1545 400)"><rect x="1380" y="300" width="360" height="140" rx="4" fill="#FFFDF6" stroke="#E2D6BF" stroke-width="2"/><circle cx="1560" cy="312" r="6" fill="#E8743B"/>' +
      '<text x="1400" y="350" font-family="Fredoka, sans-serif" font-weight="600" font-size="20" fill="#2E2A26">Quaderno di Ada</text><text class="ul-nota" x="1400" y="392" font-family="Fredoka, sans-serif" font-size="23" fill="#2E2A26">Al parco Emma corre ___</text></g>' +
      '<g transform="translate(1060 300) scale(1.5)">' + P.ada('mani', 'felice') + '</g>' +
      '<g class="ul-sb">' + P.secchio('ul-s', UL_PALLE, 1.4) + '</g>' + P.palla('ul-palla', UL_Y, 'felice') + '</g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + P.defs + a + b + '</svg>' +
      P.sott('NARRATORE', 'Questa volta in fondo non arrivò Emma, ma Corre, l’ultimo arrivato. Le campane suonano sempre per l’ultimo della fila.') +
      P.sott('ADA', '«Felice»: quarantasei per cento. Pesco… «felice».') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.A = q('.ul-A'); this.B = q('.ul-B');
    this.bell = all('.ul-bell'); this.glow = all('.ul-glow'); this.luce = all('.ul-luce'); this.lv = all('.ul-lv'); this.corre = q('.ul-corre');
    this.sb = q('.ul-sb'); this.palla = q('.ul-palla'); this.nota = q('.ul-nota'); this.mon = q('.ul-mon');
    this.sub = window.PZ.subs(kit, [[0.4, 10.8], [12.8, 18.4]]);
  },
  render(t) {
    const ab = eio(seg(t, 11.6, 12.2));
    this.A.setAttribute('opacity', (1 - ab).toFixed(3)); this.B.setAttribute('opacity', ab.toFixed(3));
    // A: Corre cammina fino alle campane, che suonano per lui.
    const w = seg(t, 0.6, 3.4), hop = Math.abs(Math.sin(t * 9)) * 12 * (w > 0 && w < 1 ? 1 : 0);
    this.corre.setAttribute('transform', 'translate(' + lerp(300, 960, eio(w)).toFixed(1) + ' ' + (lerp(600, 860, eio(w)) - hop).toFixed(1) + ')');
    const ring = eo(seg(t, 4.6, 6.0));
    UL_CAM.forEach(([word, v], i) => {
      let k = (v - UL_MIN) / (UL_MAX - UL_MIN); k = k * k * k;
      const lvl = ring * k, wob = 0.6 + 0.4 * Math.sin(t * 6 + i);
      this.glow[i].setAttribute('opacity', (0.85 * lvl * wob).toFixed(2));
      this.luce[i].setAttribute('opacity', (0.75 * lvl).toFixed(2));
      this.lv[i].setAttribute('opacity', ring.toFixed(2));
      const [x, y] = ulXY(i);
      this.bell[i].setAttribute('transform', 'translate(' + x + ' ' + y + ') rotate(' + (lvl * 6 * Math.sin(t * 7 + i)).toFixed(2) + ')');
    });
    // B: il secchio risale; Ada pesca la pallina gialla.
    this.sb.setAttribute('transform', 'translate(800 ' + lerp(-300, 456, eo(seg(t, 12.2, 13.4))).toFixed(1) + ')');
    const p = seg(t, 16.2, 16.9);
    this.palla.setAttribute('transform', 'translate(' + lerp(970, 1110, eo(p)).toFixed(1) + ' ' + (lerp(600, 560, eo(p)) - 120 * Math.sin(Math.PI * p)).toFixed(1) + ') scale(' + (p <= 0 ? 0 : eob(p, 1.6)).toFixed(3) + ')');
    this.nota.textContent = t >= 18.0 ? 'Al parco Emma corre felice' : 'Al parco Emma corre ___';
    this.mon.setAttribute('opacity', eo(seg(t, 19.4, 20.0)).toFixed(2));
    this.sub(t);
  },
});
