const { seg, eo, ei, eio, eob, lerp } = kit;
// 1.9 · Le campane del fondo: la forza tira Emma verso le parole del mare; la partita con la campana «nuota».
const CAM = [['corre', 1.20], ['e', -1.74], ['sabbia', 1.30], ['nuota', 3.28], ['gioca', 2.41], ['onde', 1.65], ['Bovary', -0.40], ['conchiglie', 1.47]];
const CAM_MIN = -1.74, CAM_MAX = 3.28;
const CAM_LCOL = ['#6E9BFF', '#6FD38A', '#FF8C8C'];
const CAM_E = [-2.47, 2.19, 0.14], CAM_U = [-0.80, 0.60, -0.05];
const CAM_P = [1.98, 1.31, -0.01], CAM_TC = [17.2, 18.9, 20.6], CAM_RY = [92, 162, 232].map(y => 555 + (y - 150) * 0.9);
function camXY(i) { const x = 260 + i * 200; return [x, 190 + Math.pow((x - 960) / 700, 2) * 130]; }
kit.scene('campane', {
  init(kit) {
    const P = window.PZ;
    let s = '<svg class="art" viewBox="0 0 1920 1080">' + P.defs +
      '<defs><radialGradient id="cam-buio" cx=".5" cy=".7" r=".7"><stop offset="0" stop-color="#16306A"/><stop offset="1" stop-color="#070912"/></radialGradient></defs>' +
      '<rect width="1920" height="1080" fill="url(#cam-buio)"/><rect y="860" width="1920" height="220" fill="#0F1A3A"/>' +
      '<rect x="0" y="560" width="360" height="26" rx="6" fill="#3E4A66"/>' +
      '<g transform="translate(70 465) scale(.6)">' + P.al() + '</g><g transform="translate(200 450) scale(.6)">' + P.mare() + '</g>';
    CAM.forEach(([w, v], i) => {
      const [x, y] = camXY(i);
      s += '<g class="cam-bell" transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ')"><ellipse class="cam-glow" cx="0" cy="30" rx="90" ry="80" fill="#398BE9" opacity="0" filter="url(#pz-soft)"/>' +
        '<path d="M0 -46 L0 -20" stroke="#8B93B8" stroke-width="3"/><path d="M-34 64 L-27 8 C-24 -20 24 -20 27 8 L34 64 Q0 76 -34 64 Z" fill="#5B6B8C" stroke="#3E4A66" stroke-width="3"/>' +
        '<path class="cam-luce" d="M-34 64 L-27 8 C-24 -20 24 -20 27 8 L34 64 Q0 76 -34 64 Z" fill="#398BE9" opacity="0"/><circle cx="0" cy="72" r="7" fill="#3E4A66"/>' +
        '<path class="cam-onde" d="M-52 0 Q-64 30 -52 60 M52 0 Q64 30 52 60 M-70 -10 Q-86 30 -70 70 M70 -10 Q86 30 70 70" stroke="#8FB6FF" stroke-width="3" stroke-linecap="round" fill="none" opacity="0"/>' +
        '<text y="112" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="28" fill="#F4EEE2">' + w + '</text>' +
        '<text class="cam-lv" y="142" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="20" fill="#9BE7C4" opacity="0">' + v.toFixed(2) + '</text></g>';
    });
    s += '<g class="cam-emma"><g transform="translate(-75 -268) scale(.75)">' + P.emma(P.VESTITO.mare[3], { dy: -4 }) + '</g></g>' +
      '<g class="cam-tir"><g transform="rotate(-62)"><g transform="translate(-130 -200) scale(.85)">' + P.emmaTirata(P.VESTITO.mare[3]) + '</g></g></g>' +
      '<g class="cam-pan"><rect x="545" y="330" width="830" height="450" rx="22" fill="#10152B" stroke="#C9973F" stroke-width="5"/>' +
      '<g transform="translate(720 555) scale(.9) translate(-110 -150)">' + P.carta({ v: CAM_E, col: P.CARTA_COL.Emma, titolo: 'Emma', sotto: 'in fondo al pozzo' }) + '</g>' +
      '<g transform="translate(1200 555) scale(.9) translate(-110 -150)">' + P.carta({ v: CAM_U, col: '#3379E5', titolo: 'nuota', sotto: 'campana' }) + '</g>';
    CAM_RY.forEach((y, i) => {
      s += '<rect class="cam-hl" x="611" y="' + (y - 30) + '" width="218" height="60" rx="12" fill="none" stroke="#FFD978" stroke-width="5"/><rect class="cam-hl" x="1091" y="' + (y - 30) + '" width="218" height="60" rx="12" fill="none" stroke="#FFD978" stroke-width="5"/>' +
        '<g class="cam-sp">' + P.pill(CAM_P[i]) + '</g>';
    });
    s += '<g class="cam-gt">' + P.gettone(3.28) + '</g>';
    s += '<text class="cam-somma" x="960" y="392" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="34" font-weight="600" fill="#9BE7C4">1.98 + 1.31 − 0.01 = 3.28</text></g>' +
      '<g class="cam-mon"><rect x="500" y="830" width="920" height="150" rx="18" fill="#0F2A2A" stroke="#C9973F" stroke-width="6"/>' +
      '<text x="540" y="890" font-family="JetBrains Mono, monospace" font-size="30" fill="#9BE7C4">Solo l’ultima riga · campane = U</text>' +
      '<text x="540" y="940" font-family="JetBrains Mono, monospace" font-size="30" fill="#E6FFF4">nuota: 1.98 + 1.31 − 0.01 = 3.28</text></g></svg>';
    kit.stage.append(kit.h('<div class="ground">' + s +
      P.sott('NARRATORE', 'In fondo al pozzo arrivò solo Emma. Intorno a lei c’era un anello di campane, una per ogni parola. Emma non diventò «nuota»: fu tirata verso le parole del mare.') +
      P.sott('ADA', 'Con ogni campana, la stessa partita a carte. Il gettone più grande è di «nuota»: tre virgola ventotto.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.glow = all('.cam-glow'); this.luce = all('.cam-luce'); this.onde = all('.cam-onde'); this.lv = all('.cam-lv'); this.bell = all('.cam-bell');
    this.emma = q('.cam-emma'); this.tir = q('.cam-tir'); this.pan = q('.cam-pan');
    this.hl = all('.cam-hl'); this.sp = all('.cam-sp'); this.gt = q('.cam-gt'); this.somma = q('.cam-somma');
    this.mon = q('.cam-mon');
    this.sub = window.PZ.subs(kit, [[0.4, 14.6], [15.6, 25.4]]);
  },
  render(t) {
    const panA = eo(seg(t, 15.0, 15.5)) * (1 - eio(seg(t, 26.2, 26.7)));
    this.mon.setAttribute('opacity', eo(seg(t, 27.0, 27.6)).toFixed(2));
    this.pan.setAttribute('opacity', panA.toFixed(2));
    CAM_RY.forEach((y, i) => {
      const tc = CAM_TC[i], h = seg(t, tc - 0.7, tc - 0.4) * (1 - seg(t, tc + 0.6, tc + 0.9));
      this.hl[i * 2].setAttribute('opacity', (h * panA).toFixed(2)); this.hl[i * 2 + 1].setAttribute('opacity', (h * panA).toFixed(2));
      const sp = seg(t, tc, tc + 0.4), m = eio(seg(t, 21.4, 21.9));
      this.sp[i].setAttribute('transform', 'translate(960 ' + lerp(y, 700, m).toFixed(1) + ') scale(' + (sp <= 0 || m >= 1 ? 0 : eob(sp, 1.7) * (1 - 0.5 * m)).toFixed(3) + ')');
    });
    const gp = seg(t, 21.8, 22.2), fl = eio(seg(t, 23.0, 23.6));
    this.gt.setAttribute('transform', 'translate(' + lerp(960, 860, fl).toFixed(1) + ' ' + lerp(700, 250, fl).toFixed(1) + ') scale(' + (gp <= 0 || fl >= 1 ? 0 : eob(gp, 1.8) * (1 - 0.6 * fl)).toFixed(3) + ')');
    this.somma.setAttribute('opacity', (eo(seg(t, 21.2, 21.7))).toFixed(2));
    const ring = eo(seg(t, 6.4, 7.6));
    CAM.forEach(([w, v], i) => {
      let k = (v - CAM_MIN) / (CAM_MAX - CAM_MIN);
      k = Math.max(0, k * k * k);
      const nuotaEarly = i === 3 ? eo(seg(t, 22.8, 23.4)) : 0;
      const lvl = Math.max(nuotaEarly, ring * k);
      const wob = 0.6 + 0.4 * Math.sin(t * 6 + i);
      this.glow[i].setAttribute('opacity', (0.85 * lvl * wob).toFixed(2));
      this.luce[i].setAttribute('opacity', (0.75 * lvl).toFixed(2));
      this.onde[i].setAttribute('opacity', (lvl > 0.5 ? (lvl - 0.5) * 2 * wob : 0).toFixed(2));
      this.lv[i].setAttribute('opacity', ring.toFixed(2));
      const [x, y] = camXY(i);
      this.bell[i].setAttribute('transform', 'translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') rotate(' + (lvl * 6 * Math.sin(t * 7 + i)).toFixed(2) + ')');
    });
    const pull = seg(t, 10.4, 14.0);
    const pp = ei(pull) * 0.3 + eo(pull) * 0.7;
    this.emma.setAttribute('transform', 'translate(960 ' + (850 + 6 * Math.sin(t * 2)).toFixed(1) + ')');
    this.emma.setAttribute('opacity', pull > 0 ? 0 : 1);
    this.tir.setAttribute('transform', 'translate(' + lerp(960, 930, pp).toFixed(1) + ' ' + lerp(720, 520, pp).toFixed(1) + ')');
    this.tir.setAttribute('opacity', pull > 0 ? 1 : 0);
    this.sub(t);
  },
});
