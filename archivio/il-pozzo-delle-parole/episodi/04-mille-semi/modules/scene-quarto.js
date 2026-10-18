const { seg, eo, ei, eio, eob, lerp } = kit;
// 4.3 · Il quarto seme: la quarta freccia non ci sta sul foglio; la partita a carte invece funziona uguale.
const QU_Q = [0.90, 0.20, -0.50, 0.40], QU_K = [1.00, -0.30, -1.02, 0.50], QU_P = [0.90, -0.06, 0.51, 0.20];
const QU_TC = [15.6, 16.8, 18.0, 19.2];
const QU_F = ['q · k = 0.90', 'q · k = 0.90 − 0.06', 'q · k = 0.90 − 0.06 + 0.51', 'q · k = 0.90 − 0.06 + 0.51 + 0.20', '0.90 − 0.06 + 0.51 + 0.20 = 1.55'];
const QU_O = [900, 560], QU_S = 300, QU_DIR = [[1, 0], [0.55, -0.38], [0, -1]];
function quVal(v) {
  return '<g><rect x="-52" y="-22" width="104" height="44" rx="10" fill="#FFFDF6" stroke="#C8B48F" stroke-width="3"/><text y="9" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="600" font-size="24" fill="' + (v < 0 ? '#B8332E' : '#2E2A26') + '">' + window.PZ.fmt(v) + '</text></g>';
}
kit.scene('quarto', {
  init(kit) {
    const P = window.PZ;
    // A · il quaderno e la quarta freccia.
    let frecce = '';
    QU_DIR.forEach((d, i) => {
      const e = [QU_O[0] + QU_S * d[0], QU_O[1] + QU_S * d[1]];
      frecce += '<path d="M' + QU_O[0] + ' ' + QU_O[1] + ' L' + e[0].toFixed(1) + ' ' + e[1].toFixed(1) + '" stroke="#2E2A26" stroke-width="6" stroke-linecap="round"/><circle cx="' + e[0].toFixed(1) + '" cy="' + e[1].toFixed(1) + '" r="9" fill="#2E2A26"/>' + P.seme(i, (e[0] + 36 * d[0] + (i === 2 ? 30 : 6)).toFixed(1), (e[1] + 26 * d[1] - (i === 0 ? 22 : 0)).toFixed(1), 1.0);
    });
    const a = '<g class="qu-A"><rect width="1920" height="1080" fill="#8A5A3C"/>' +
      '<g class="qu-foglio" style="transform-origin:900px 520px"><rect x="380" y="140" width="1040" height="760" rx="10" fill="#FFFDF6" stroke="#E2D6BF" stroke-width="3"/>' + frecce +
      '<g class="qu-quarta"><path d="M0 0 L300 0" stroke="#2E2A26" stroke-width="6" stroke-linecap="round" stroke-dasharray="16 10"/><circle cx="300" cy="0" r="9" fill="#2E2A26"/><g transform="translate(340 0)">' + P.seme(3, 0, 0, 1.0) + '</g></g></g>' +
      '<g transform="translate(1500 160) scale(.9)"><rect x="-10" y="0" width="300" height="190" rx="14" fill="#5B6B8C" stroke="#3E4A66" stroke-width="6"/><ellipse cx="140" cy="0" rx="150" ry="28" fill="#5B6B8C" stroke="#3E4A66" stroke-width="6"/><ellipse cx="140" cy="0" rx="124" ry="17" fill="#070912"/>' +
      '<rect x="60" y="70" width="160" height="56" rx="6" fill="#C9973F" stroke="#7A5A24" stroke-width="3"/><text x="140" y="108" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="30" fill="#3A2418">4 semi</text></g>' +
      '<g transform="translate(130 360) scale(1.35)"><g class="qu-ada1">' + P.ada('mani', 'calma') + '</g><g class="qu-ada2" opacity="0">' + P.ada('mani', 'sorpresa') + '</g></g></g>';
    // B · la partita a quattro semi.
    const Y = P.righeY(4).map(y => 420 + (y - 150) * 1.35);
    let b = '<g class="qu-B"><defs><linearGradient id="qu-muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1226"/><stop offset="1" stop-color="#262F60"/></linearGradient></defs><rect width="1920" height="1080" fill="url(#qu-muro)"/>' +
      '<ellipse cx="960" cy="580" rx="900" ry="330" fill="#1E5A3A" opacity=".55"/><ellipse cx="960" cy="580" rx="900" ry="330" fill="none" stroke="#8A5A3C" stroke-width="14"/>' +
      '<rect x="460" y="34" width="1000" height="84" rx="14" fill="#0F2A2A" stroke="#C9973F" stroke-width="5"/><text class="qu-form" x="960" y="88" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="32" fill="#9BE7C4"></text>' +
      '<g transform="translate(470 420) rotate(-2) scale(1.35) translate(-110 -150)">' + P.carta({ v: QU_Q, col: P.CARTA_COL.Emma, titolo: 'Emma', sotto: 'lanterna · 4 semi' }) + '</g>' +
      '<g transform="translate(1450 420) rotate(2) scale(1.35) translate(-110 -150)">' + P.carta({ v: QU_K, col: P.CARTA_COL.Mare, titolo: 'Mare', sotto: 'cartello · 4 semi' }) + '</g>';
    Y.forEach((y, i) => {
      b += '<g class="qu-vq">' + quVal(QU_Q[i]) + '</g><g class="qu-vk">' + quVal(QU_K[i]) + '</g><text class="qu-x" x="960" y="' + (y + 12) + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="#FFD978">×</text><g class="qu-p">' + P.pill(QU_P[i]) + '</g>';
    });
    b += '<g class="qu-g">' + P.gettone(1.55) + '</g></g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1920 1080">' + P.defs + a + b + '</svg>' +
      P.sott('ADA', 'Un pozzo con quattro semi. Il quarto asse… dove lo metto? Non c’è posto.') +
      P.sott('NARRATORE', 'Il disegno non bastava più. Ma la partita a carte funzionava ancora: un seme in più, una pastiglia in più.') + '</div>'));
    const all = c => [...kit.stage.querySelectorAll(c)], q = c => kit.stage.querySelector(c);
    this.A = q('.qu-A'); this.B = q('.qu-B'); this.foglio = q('.qu-foglio').style; this.quarta = q('.qu-quarta'); this.a1 = q('.qu-ada1'); this.a2 = q('.qu-ada2');
    this.vq = all('.qu-vq'); this.vk = all('.qu-vk'); this.x = all('.qu-x'); this.p = all('.qu-p'); this.g = q('.qu-g'); this.form = q('.qu-form'); this.Y = Y;
    this.sub = window.PZ.subs(kit, [[1.0, 8.0], [14.4, 24.4]]);
  },
  render(t) {
    const ab = eio(seg(t, 13.4, 14.0));
    this.A.setAttribute('opacity', (1 - ab).toFixed(3)); this.B.setAttribute('opacity', ab.toFixed(3));
    // La quarta freccia cerca un posto: gira, il foglio si inclina e si capovolge, la freccia scivola fuori.
    const cerca = seg(t, 3.0, 8.0), fuori = seg(t, 9.0, 10.6);
    const ang = -40 + 400 * eio(cerca);
    this.quarta.setAttribute('transform', 'translate(' + (900 + 900 * ei(fuori)).toFixed(1) + ' ' + (560 + 420 * ei(fuori)).toFixed(1) + ') rotate(' + (ang + 60 * fuori).toFixed(1) + ')');
    this.quarta.setAttribute('opacity', eo(seg(t, 2.4, 3.0)).toFixed(2));
    const tilt = 10 * Math.sin(Math.PI * 2 * seg(t, 4.0, 7.0)), flip = Math.cos(Math.PI * seg(t, 7.0, 8.4));
    this.foglio.transform = 'rotate(' + tilt.toFixed(2) + 'deg) scaleY(' + (Math.abs(flip) < 0.05 ? 0.05 : flip).toFixed(3) + ')';
    const sorpresa = t > 9.6 && t < 13.4;
    this.a1.setAttribute('opacity', sorpresa ? 0 : 1); this.a2.setAttribute('opacity', sorpresa ? 1 : 0);
    // La partita a quattro semi.
    this.Y.forEach((y, i) => {
      const tc = QU_TC[i], m = eio(seg(t, tc - 0.7, tc)), gone = seg(t, tc, tc + 0.15);
      this.vq[i].setAttribute('transform', 'translate(' + lerp(580, 880, m).toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (m <= 0 ? 0 : (1 - gone)).toFixed(3) + ')');
      this.vk[i].setAttribute('transform', 'translate(' + lerp(1340, 1040, m).toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (m <= 0 ? 0 : (1 - gone)).toFixed(3) + ')');
      this.x[i].setAttribute('opacity', (m > 0.2 && gone < 1 ? 1 : 0));
      const sp = seg(t, tc, tc + 0.4), fly = seg(t, 20.4 + i * 0.15, 21.0 + i * 0.15);
      this.p[i].setAttribute('transform', 'translate(960 ' + lerp(y, 800, eio(fly)).toFixed(1) + ') scale(' + (sp <= 0 || fly >= 1 ? 0 : eob(sp, 1.7) * (1 - 0.5 * fly)).toFixed(3) + ')');
    });
    const g = seg(t, 21.2, 21.7);
    this.g.setAttribute('transform', 'translate(960 800) scale(' + (g <= 0 ? 0 : 1.3 * eob(g, 1.8)).toFixed(3) + ') rotate(' + (8 * Math.sin(t * 1.5)).toFixed(2) + ')');
    let f = -1; QU_TC.forEach((tc, i) => { if (t >= tc + 0.2) f = i; }); if (t >= 21.6) f = 4;
    this.form.textContent = f < 0 ? 'q · k = ?' : QU_F[f];
    this.sub(t);
  },
});
