const { seg, eo, ei, eio, eob, lerp } = kit;
const CAM = [['corre', 1.32], ['stira', -1.44], ['sabbia', 1.44], ['nuota', 3.27], ['gioca', 2.45], ['onde', 1.63], ['Bovary', -1.65], ['conchiglie', 1.43]];
const CAM_LCOL = ['#6E9BFF', '#6FD38A', '#FF8C8C'];
const CAM_E = [2.75, 0.30, -1.80], CAM_U = [0.80, -0.05, -0.60];
const CAM_P = [2.20, -0.01, 1.08], CAM_TC = [8.4, 9.6, 10.8], CAM_RY = [92, 162, 232].map(y => 555 + (y - 150) * 0.9);
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
    s += '<g class="cam-emma"><g transform="translate(-75 -268) scale(.75)">' + P.emma('#398BE9', { dy: -4 }) + '</g></g>' +
      '<g class="cam-tir"><g transform="rotate(-62)"><g transform="translate(-130 -200) scale(.85)">' + P.emmaTirata('#398BE9') + '</g></g></g>' +
      '<g class="cam-pan"><rect x="545" y="330" width="830" height="450" rx="22" fill="#10152B" stroke="#C9973F" stroke-width="5"/>' +
      '<g transform="translate(720 555) scale(.9) translate(-110 -150)">' + P.carta({ v: CAM_E, col: '#E0475B', titolo: 'Emma', sotto: 'in fondo al pozzo' }) + '</g>' +
      '<g transform="translate(1200 555) scale(.9) translate(-110 -150)">' + P.carta({ v: CAM_U, col: '#3379E5', titolo: 'nuota', sotto: 'campana' }) + '</g>';
    CAM_RY.forEach((y, i) => {
      s += '<rect class="cam-hl" x="611" y="' + (y - 30) + '" width="218" height="60" rx="12" fill="none" stroke="#FFD978" stroke-width="5"/><rect class="cam-hl" x="1091" y="' + (y - 30) + '" width="218" height="60" rx="12" fill="none" stroke="#FFD978" stroke-width="5"/>' +
        '<g class="cam-sp">' + P.pill(CAM_P[i]) + '</g>';
    });
    s += '<g class="cam-gt">' + P.gettone(3.27) + '</g>';
    s += '<text class="cam-somma" x="960" y="392" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="34" font-weight="600" fill="#9BE7C4">2.20 − 0.01 + 1.08 = 3.27</text></g></svg>';
    kit.stage.append(kit.h('<div class="ground">' + s +
      P.sott('NARRATORE', 'Sul fondo del pozzo arrivò solo Emma. Al e Mare la salutavano da un gradino più su. Intorno a lei, un anello di campane: una per ogni parola.') +
      P.sott('ADA', 'Stessa partita di prima: la carta di Emma contro la carta della campana. Due virgola venti, quasi zero, e meno per meno: più uno virgola zero otto. Tre virgola ventisette!') +
      P.sott('NARRATORE', 'Ogni campana suona tanto più forte quanto più guarda dove guarda Emma. Ma Emma non è diventata «nuota»: viene tirata verso laggiù, dove abitano le parole che vanno d’accordo con il mare.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.glow = all('.cam-glow'); this.luce = all('.cam-luce'); this.onde = all('.cam-onde'); this.lv = all('.cam-lv'); this.bell = all('.cam-bell');
    this.emma = q('.cam-emma'); this.tir = q('.cam-tir'); this.pan = q('.cam-pan');
    this.hl = all('.cam-hl'); this.sp = all('.cam-sp'); this.gt = q('.cam-gt'); this.somma = q('.cam-somma');
    this.sub = window.PZ.subs(kit, [[0.4, 6.8], [7.1, 13.5], [13.9, 19.7]]);
  },
  render(t) {
    const panA = eo(seg(t, 7.0, 7.5)) * (1 - eio(seg(t, 13.2, 13.7)));
    this.pan.setAttribute('opacity', panA.toFixed(2));
    CAM_RY.forEach((y, i) => {
      const tc = CAM_TC[i], h = seg(t, tc - 0.7, tc - 0.4) * (1 - seg(t, tc + 0.6, tc + 0.9));
      this.hl[i * 2].setAttribute('opacity', (h * panA).toFixed(2)); this.hl[i * 2 + 1].setAttribute('opacity', (h * panA).toFixed(2));
      const sp = seg(t, tc, tc + 0.4), m = eio(seg(t, 11.6, 12.1));
      this.sp[i].setAttribute('transform', 'translate(960 ' + lerp(y, 700, m).toFixed(1) + ') scale(' + (sp <= 0 || m >= 1 ? 0 : eob(sp, 1.7) * (1 - 0.5 * m)).toFixed(3) + ')');
    });
    const gp = seg(t, 12.0, 12.4), fl = eio(seg(t, 12.5, 13.1));
    this.gt.setAttribute('transform', 'translate(' + lerp(960, 860, fl).toFixed(1) + ' ' + lerp(700, 250, fl).toFixed(1) + ') scale(' + (gp <= 0 || fl >= 1 ? 0 : eob(gp, 1.8) * (1 - 0.6 * fl)).toFixed(3) + ')');
    this.somma.setAttribute('opacity', (eo(seg(t, 11.4, 11.9))).toFixed(2));
    const ring = eo(seg(t, 14.2, 15.2));
    CAM.forEach(([w, v], i) => {
      let k = (v + 1.65) / (3.27 + 1.65);
      k = Math.max(0, k * k * k);
      const nuotaEarly = i === 3 ? eo(seg(t, 12.8, 13.3)) : 0;
      const lvl = Math.max(nuotaEarly, ring * k);
      const wob = 0.6 + 0.4 * Math.sin(t * 6 + i);
      this.glow[i].setAttribute('opacity', (0.85 * lvl * wob).toFixed(2));
      this.luce[i].setAttribute('opacity', (0.75 * lvl).toFixed(2));
      this.onde[i].setAttribute('opacity', (lvl > 0.5 ? (lvl - 0.5) * 2 * wob : 0).toFixed(2));
      this.lv[i].setAttribute('opacity', ring.toFixed(2));
      const [x, y] = camXY(i);
      this.bell[i].setAttribute('transform', 'translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') rotate(' + (lvl * 6 * Math.sin(t * 7 + i)).toFixed(2) + ')');
    });
    const pull = seg(t, 15.0, 18.5);
    const pp = ei(pull) * 0.3 + eo(pull) * 0.7;
    this.emma.setAttribute('transform', 'translate(960 ' + (850 + 6 * Math.sin(t * 2)).toFixed(1) + ')');
    this.emma.setAttribute('opacity', pull > 0 ? 0 : 1);
    this.tir.setAttribute('transform', 'translate(' + lerp(960, 930, pp).toFixed(1) + ' ' + lerp(720, 520, pp).toFixed(1) + ')');
    this.tir.setAttribute('opacity', pull > 0 ? 1 : 0);
    this.sub(t);
  },
});
